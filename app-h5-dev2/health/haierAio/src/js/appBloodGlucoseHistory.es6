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
            latestBloodGlucose:'',
            lastStatus:'',
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
            console.log('setTimeout',_this.state);
            let ajaxData={
                'userType': _this.state.userType?_this.state.userType:'3',
                'memberId':_this.state.memberId?_this.state.memberId:"0",
                'appId':_this.state.appId?_this.state.appId:'10121',
                'timestamp':new Date().getTime()
            };
            Actions.lastBloodGlucose(ajaxData);
        },500);        
    }
    render() {
        let color = ['#4BDD96'],
            text = ['血糖'];
         //console.log(this.state)
        let time = this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):'' ;


        return (
        <div className='xyml-history'>
        <section>
             <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
             <div className='flex' style={{width:'80%',margin:"0 auto",marginTop:'-25px'}}>
                <div className='measure-data flex-cell' >
                <p className='flex'>
                    <span className='flex-cell'>血糖</span>
                    <span className='flex-cell'>{this.state.latestBloodGlucose}</span>
                    <span className='flex-cell'>mmol/L</span>
                </p> 
                </div> 
             </div>
        </section>
        <HistoryEcharts type='bg' text={text} color={color}/>   
        </div>);
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('海尔一体机-血糖');
    // 无路由方式
     // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});