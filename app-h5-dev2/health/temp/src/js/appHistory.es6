import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
/*import {SimpleCalendar, utils} from 'react-easy-calendar';
*/
import {Echarts} from './Echarts.es6';
import {Clndr} from './Calendar.es6';


var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
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
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {timeArray:["00:00"],
                    tempArray:['37'],
                    changeDate:'',
                    appId:'',
                    deviceId:'',
                    userType:'',
                    memberId:'',
                    headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    render() {
        let data={
                    "appId":this.state.appId,
                    "deviceId":this.state.deviceId,
                    "userType":this.state.userType,
                    "memberId":this.state.memberId,
                };
        return (
            <div className='history'>
            
           <section className='main'>
            {/*  <header className='header'><a className='goback' href='javascript:history.back(-1);'></a><span className='title'>历史数据</span><img src="../static/img/ic-share.png" className='leftIcon share' alt='分享'/></header>
             */}
            <header style={{'paddingTop':this.state.headerTop}}></header>
            <Clndr  getdata={data} />
            </section>
            <Echarts timelist={this.state.timeArray} templist={this.state.tempArray} getdata={data}/>
        </div>
        );
    }
    componentDidMount(){
        let _this=this;
        setTimeout(function(){
            let data={
                    "appId":_this.state.appId,
                    "deviceId":_this.state.deviceId,
                    "userType":_this.state.userType,
                    "memberId":_this.state.memberId,
                },
            today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
            Actions.changeDate(today,data);
        },500);
    }
}
// 开始渲染
het.domReady(()=>{
    het.setTitle('历史数据');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));

   /* // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});