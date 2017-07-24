import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {HistoryEcharts} from '../components/HistoryEcharts.es6';


var {Router, Route, hashHistory } = ReactRouter;

het.domReady(()=>{
    // 配置sdk
     het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {},
        renderConfigData : true
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    //console.log(data);
     Actions.repaint(data);
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            latestSystolicPressure:'',
            lastDiastolicPressure:'',
            latestdataTime:''
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let _this = this ;
        setTimeout(function(){
            let ajaxData={
                'userType': _this.state.userType?_this.state.userType:'3',
                'memberId':_this.state.memberId?_this.state.memberId:'0',
                'appId':_this.state.appId?_this.state.appId:10121,
                'timestamp':new Date().getTime()
            };
            Actions.lastBloodPressure(ajaxData);
        },500);        
    }
    render() {
        let color = ['#FF503D','#FEB179'],
            text = ['收缩压','舒张压'];
        let time = this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):'' ;
         //console.log(this.state)

        return (
        <div className='xyml-history'>
        <section>
             <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
             <div className='flex' style={{marginTop:'-25px'}}>
                <div className='measure-data flex-cell' >
                <p className='flex' >
                    <span className='flex-cell'>收缩压</span>
                    <span className='flex-cell' style={{margin:'0'}}>{this.state.latestSystolicPressure}</span>
                    <span className='flex-cell'>mmHg</span>
                </p> 
                </div> 
                <div className='measure-data flex-cell'>
                    <p className='flex' >
                        <span className='flex-cell'>舒张压</span>
                        <span className='flex-cell' style={{margin:'0'}}>{this.state.lastDiastolicPressure}</span>
                        <span className='flex-cell'>mmHg</span>
                    </p> 
                </div>
             </div>
        </section>
        <HistoryEcharts type='bp' text={text} color={color} oneYAxis={1}/>   
        </div>);
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('海尔一体机-血压');
    // 无路由方式
     // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});