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
    //console.log(data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            latestTemp:'',
            latestdataTime:''
        };
        this.listenStore(Store); // 监听Store
    }
    // componentWillUpdate(){
    //     //console.log(this.state);
    //     Actions.uploadData(this.state);
    // }
    componentDidMount() {
        let _this = this ;
        setTimeout(function(){
            let ajaxData={
                'userType': _this.state.userType?_this.state.userType:'3',
                'memberId':_this.state.memberId?_this.state.memberId:'0',
                'appId':_this.state.appId?_this.state.appId:'10121',
                'deviceId':_this.state.deviceId?_this.state.deviceId:'',
                'timestamp':new Date().getTime()
            };
            Actions.lastTemp(ajaxData);
        },500);
    }
    render() {
        let color = ['#3FDB91'],
            text = ['温度'];
         //console.log(this.state)
        let time = this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):'' ;
        return (
        <div className='xyml-history'>
        <section>
             <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
             <div className='flex' style={{width:'80%',margin:"0 auto",marginTop:'-25px'}}>
                <div className='measure-data flex-cell' >
                <p className='flex'>
                    <span className='flex-cell'>体温</span>
                    <span className='flex-cell'>{this.state.latestTemp}</span>
                    <span className='flex-cell'>°C</span>
                </p> 
                </div> 
             </div>
        </section>
        <HistoryEcharts type='temp' text={text} color={color}/>   
        </div>);
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('海尔一体机-体温');
    // 无路由方式
     // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});