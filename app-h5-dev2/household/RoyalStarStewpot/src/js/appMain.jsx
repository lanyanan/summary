// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import FirstPage from './FirstPage.jsx'
import {SettingPage} from './SettingPage.jsx';
import Alert from './Alert.jsx';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 开启控制数据渲染，以便filter能取到控制数据
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
        this.state ={
            onoff:1,//开关机状态 1关机 2开机
            online:1,//是否在线 1在线 2不在线
            //故障数据计时器，防止一直刷，故障弹窗一直弹
            countErrror:1,
        }
        this.listenStore(Store); // 监听Store
        Actions.local();
        this.slide = this.slide.bind(this);
        this.cancel = this.cancel.bind(this);
        //子组件更改父组件字段
        this.childSetState = this.childSetState.bind(this);
    }
    componentDidMount(){
        het.toast("chealth_potmode_save");
    }
    slide(){
        //alert('slide');
        console.log("进入模式");
        //if(this.state.onoff!=2)return;
        if(this.liveError()){het.toast(this.liveError());return false};
        //het.toast('hide_navigation_bar');
        het.toast("chealth_potmode_set");
        window.location.href = '#/settingPage';
    }
    cancel(){
        if(this.liveError()){het.toast(this.liveError());return false};
        if(this.state.mode!=18&&(this.state.surplusreservehour==0&&this.state.surplusreservemin==0)){
            this.setState({isShowAlert: true});
        }else{
            Actions.cancel({
                function: 1,
                runtime: 0,
                ordertimehour: 0,
                ordertimemin: 0,
            });
        }
    }
    childSetState(state,fn){
        //预约中直接取消
        setTimeout(()=>{
            this.setState({isShowAlert:state.isShowAlert});
            state.sure && Actions.cancel({
                function: 1,
                runtime: 0,
                ordertimehour: 0,
                ordertimemin: 0,
            });
        },200);
    }
    liveError(){
        //console.log("liveError------------------------------------",this.state.online,this.state.networkavailable,this.state.error);
        if(this.state.online==2){
            return '设备与APP已断开连接！';
        }
        if(this.state.networkavailable==2){
            return '当前网络不可用！';
        }
        if(this.state.error==2){
            //传感器开路
            return '传感器开路';
        }
        if(this.state.error==3){
            //传感器短路
            return '传感器短路';
        }
        if(this.state.error==4){
            //传感器温度高温（超过190度）
            return '传感器温度高温（超过190度)';
        }
        return false;
    }
    render() {
        let title = '取消提醒';
        let message = '主人，停止工作可能会损失食材，确定要这么做吗？';
        //设备故障自动弹出(干烧，高温保护，开路，短路)，且只弹一次
        //console.log("进入进入进入进入countErrror",this.state.errtext,this.state.error);
        if(this.state.countErrror!=(this.state.error!=undefined?this.state.error:1)){
            this.state.countErrror = this.state.error;
            let errtext;
            if(this.state.error==2){
                //传感器开路
                errtext= '传感器开路';
            }
            if(this.state.error==3){
                //传感器短路
                errtext= '传感器短路';
            }
            if(this.state.error==4){
                //传感器温度高温（超过190度）
                errtext= '传感器温度高温（超过190度)';
            }

            het.toast('{"title":"'+errtext+'故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}');

        }

        console.log('this.state.online',this.state.online);
        let operate = {
            //故障&&离线
            online: this.state.online!=undefined?this.state.online:1,
            error:this.state.error!=undefined?this.state.error:1,

            ////控制数据
            modeName:this.state.modeName,
            mode :this.state.mode!=undefined?this.state.mode:1,
            reservehour: this.state.reservehour!=undefined ?this.state.reservehour:'',
            reservemin: this.state.reservemin!=undefined ?this.state.reservemin:'',
            heatingTime: this.state.heatingTime!=undefined ?this.state.heatingTime:0,
            surplusreservehour: this.state.surplusreservehour!=undefined ?this.state.surplusreservehour:'',
            surplusreservemin: this.state.surplusreservemin!=undefined ?this.state.surplusreservemin:'',
            surplusHeatingTime : this.state.surplusHeatingTime!=undefined ?this.state.surplusHeatingTime:'',
            soaktimehour:this.state.soaktimehour!=undefined ?this.state.soaktimehour:0,
            soaktimeminute:this.state.soaktimeminute!=undefined ?this.state.soaktimeminute:0,
            AppointmentOrHeat:this.state.AppointmentOrHeat!=undefined?this.state.AppointmentOrHeat:0,

        };
        return(
            <main>
                <FirstPage operate={operate} slide={this.slide} cancel={this.cancel}/>
                {this.state.isShowAlert ?<Alert  title={title} message={message} childSetState={this.childSetState} />:''}
            </main>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('荣事达电炖锅');
    //// 无路由方式
    //ReactDOM.render(<App />, document.getElementById('ROOT'));
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/settingPage" component={SettingPage} />
        </Router>
    ), document.getElementById('ROOT'));
});