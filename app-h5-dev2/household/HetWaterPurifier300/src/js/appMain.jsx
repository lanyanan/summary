// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SwiperIndex} from './SwiperIndex.jsx';
import {SwiperSend} from './SwiperSend.jsx';
import {Wave} from './Wave.jsx';
import {TdsInfo} from './TdsInfo.jsx';
import {CurveModel} from './CurveModel.jsx';
import {DialogStyle} from './DialogStyle.jsx';
var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle:0,setNavRightBtnHiden:0}));
        this.oldErrItems = [];
        this.state = {
            showdialogC:false,
            showdiaFilter:{}
        };
        this.listenStore(Store);
        this.canceldia = ()=> {
            this.setState({
                showdialogC: false,
            });
        }
        this.submitdia = ()=> {
            this.setState({
                showdialogC: false,
                //diaErrShow: 0
            });
            Actions.sendRst(this.state.showdiaFilter);
        }
        this.canceldiaerr = ()=> {
            this.setState({
                diaErrShow: 1,
            });
        }
        this.submitdiaerr = ()=> {
            location.href="tel:0755-26727188";
            this.setState({
                diaErrShow: 1,
            });
        }
        Actions.getData();
    }

    showDialog(filter){
        //console.log("---this.state.online----" + this.state.online);
        if((parseInt(this.state.online) || 1) == 2){ het.toast('设备未连接'); return;}
        if((parseInt(this.state.networkavailable) || 1) == 2){ het.toast('网络异常,请检查网络是否连接正常!'); return;}
        this.setState({
            showdialogC:true,
            showdiaFilter:filter
        });
        //console.log("send filter===>"+JSON.stringify(filter));
    }

    ischangeErr(){
        let ErrItems = this.state.Errs || [];//故障列表
        let olderrs = this.oldErrItems;
        if(ErrItems.length != olderrs.length) return true;
        for(let index in olderrs){
            let olderr = olderrs[index];
            let newerr = ErrItems[index];
            if(olderr.id != newerr.id){
                return true;
            }
        }
        return false;
    }
    ischangeErr2(olderrs , ErrItems){
        if(ErrItems.length != olderrs.length) return true;
        for(let index in olderrs){
            let olderr = olderrs[index];
            let newerr = ErrItems[index];
            if(olderr.id != newerr.id){
                return true;
            }
        }
        return false;
    }

    componentWillUpdate(nextProps, nextState) {//render 之前可以先判断是否改变了
        let olderrs = this.state.Errs || [];//故障列表
        let  ErrItems= nextState.Errs || [];
        //故障判断
        if (this.ischangeErr2(olderrs,ErrItems)) {
            this.setState({
                diaErrShow : 0,
                showdialogC : false
            });
        }
    }

    render() {
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            simulateTouch :true,
            nextButton:'.arrow2',
            onSlideChangeEnd:function(swiper){
                //console.log("swiper.activeIndex = " + swiper.activeIndex);
                if(swiper.activeIndex == 0){
                    het.setTitle(JSON.stringify({setNavTitle:0,setNavRightBtnHiden:0}));
                }else if(swiper.activeIndex == 1){
                    het.setTitle(JSON.stringify({setNavTitle:1,title:'滤芯详情',setNavRightBtnHiden:0}));
                }
            }
        });
        let SourceWater = {
            SourceWaterTds: parseInt(this.state.SourceWaterTds)  || 0,
            SourceSpectrumTOC: (parseInt(this.state.SourceSpectrumTOC)/100)  || 0,
            SourceSpectrumCOD: (parseInt(this.state.SourceSpectrumCOD)/100)  || 0,
            SourceSpectrumColor: (parseInt(this.state.SourceSpectrumColor)/100)  || 0,
            SourceSpectrumTurbidity: (parseInt(this.state.SourceSpectrumTurbidity)/100)  || 0,
            SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature || 0),
        };
        let PureWater = {
            PureWaterTds: parseInt(this.state.PureWaterTds)  || 0,
            PureSpectrumTOC: (parseInt(this.state.PureSpectrumTOC)/100)  || 0,
            PureSpectrumCOD: (parseInt(this.state.PureSpectrumCOD)/100)  || 0,
            PureSpectrumColor: (parseInt(this.state.PureSpectrumColor)/100)  || 0,
            PureSpectrumTurbidity: (parseInt(this.state.PureSpectrumTurbidity)/100)  || 0,
        };
        let Filters = this.state.FilterLists || [];

        let Waterinfo = {
            SourceWater: SourceWater,
            PureWater: PureWater,
            MachineOperationState: parseInt(this.state.MachineOperationState) || 0,
            online: parseInt(this.state.online) || 0
        }
        let selectdiag = this.state.showdialogC || false;
        let diatitles = "您已经确定更换了滤芯吗？";
        let ErrItems = this.state.Errs || [];//故障列表
        let senseError = parseInt(ErrItems.length || 0);
        let diaErrShow = this.state.diaErrShow || 0;//0 开 1关
        let selectdiagErro = (senseError > 0 && (diaErrShow == 0))?true: false;
        return (
            <section className="app-body">
                <section className="swiper-container sw2">
                    <section className="swiper-wrapper">
                        <section className="swiper-slide">
                            <SwiperIndex waterData={Waterinfo} className="index_swp"/>
                        </section>
                        <section className="arrow2">

                        </section>
                        <section className="swiper-slide">
                            <SwiperSend filters={Filters} changeflr={this.showDialog.bind(this)} className="index_swp"/>
                        </section>
                    </section>
                </section>
                <Wave/>
                <DialogStyle show={selectdiag} cancelClock={this.canceldia}
                             submitClock={this.submitdia}
                             title={" "} canCel = {false} content={diatitles} rightpam={this.state.diaright || '确定'}/>
                <DialogStyle show={selectdiagErro} cancelClock={this.canceldiaerr.bind(this)}
                             submitClock={this.submitdiaerr.bind(this)} rightpam='联系客服'
                             title='设备故障' canCel = {false} errs = {ErrItems}/>
            </section>
            );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('和而泰净水器');
    // 无路由方式
    //ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/TdsInfo" component={TdsInfo} />
            <Route path="/CurveModel" component={CurveModel} />
        </Router>
    ), document.getElementById('ROOT'));
});