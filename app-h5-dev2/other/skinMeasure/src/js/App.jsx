import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {MeasureParts } from './MeasureParts.jsx';
import {MeasureResult } from './MeasureResult.jsx';
import {measureDataArray } from './localAll.jsx';
const  {Link} = ReactRouter;

export class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            water: 0,
            oil : 0,
            elasticity: 0,
            battery: 10,
            onlineStatus: 1,
            //测试动画维护
            measureStatus: 0,
            isMeasuring: false,
            selectPart: null,
            progress: 0,
            //测试结果展示
            skinGuide:'暂无数据',
            skinTypeName: '暂无数据',
            skinProblem: '暂无数据',
            skinTypeDesc:{
                tightTypeDesc:'暂无数据',
                dryOilTypeDesc:''
            },
        };
        this.listenStore(Store)
        this.skinMeasure = this.skinMeasure.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.reSubmit = this.reSubmit.bind(this);
        this.lxTimer = null;
        Actions.location();
    }
    componentDidMount() {
        clearInterval(this.lxTimer)
        this.lxTimer = setInterval(()=>{
            Actions.repaint();
        },5000)
        Actions.repaint();
        Actions.location();
    }
    skinMeasure(e){
        //测试中不可再测试
        if(this.state.measureStatus!==0) return;
        if(this.state.onlineStatus==2) return;
        //选中不可再选中
        if(e.currentTarget.getAttribute('class') === 'part measured') return;
        //点击测试清零设备
        let selectPart = parseInt(e.currentTarget.getAttribute('data-part'));
        let selectPartName = e.currentTarget.getAttribute('data-partname');
        Actions.setting({
            updateFlag: 0,
            selectPart: selectPart,
            selectPartName: selectPartName,
            measureTime:Funs.dateFormat(new Date())
        })
        this.setState({
            updateFlag: 0, selectPart:selectPart,
            selectPartName: selectPartName,
            measureStatus: 1,
            isMeasuring: true
        })
    }
    clearAll(){
        Actions.reMeasure();//清零重测
    }
    reSubmit(){
        Actions.measureResult();//上传失败再手动上传
    }
    render() {
        let measureDataArray = this.state.measureDataArray || [];
        let min = 5;
        let measureStatus = this.state.measureStatus;
            measureStatus === 0 && measureDataArray.map(function(item,index) {
                //即使遍历五次也还是在开始的位置
                if (!item.isMeasured) {
                    if (index < min) min = index;
                }
            });
        let selectState = {
            onlineStatus: this.state.onlineStatus,
            battery: this.state.battery !== null ? this.state.battery:10,
            progress: this.state.progress,
            selectPart:  this.state.selectPart,
            selectPartName:  this.state.selectPartName,
            measureStatus: this.state.measureStatus,
            measureDataArray: measureDataArray,
            min : min,
            skinMeasure: this.skinMeasure,
        };
        let resultState = {
            onlineStatus: this.state.onlineStatus,
            skinTypeName: this.state.skinTypeName,
            skinTypeDesc: this.state.skinTypeDesc,
            skinProblem: this.state.skinProblem,
            skinGuide: this.state.skinGuide,
            measureStatus: this.state.measureStatus,
            reSubmit: this.reSubmit,
            clearAll: this.clearAll,
        };
        //调试打印
        //<aside id="console">{ 'measureStatus:' + measureStatus }</aside>
        return (
            <section className="container">
                <MeasureParts  selectState = {selectState} />
                <MeasureResult resultState = {resultState} />
                <Link to="/history" className="history-btn"> </Link>
                <aside id="mytoast"> </aside>
            </section>
        )
    }
}