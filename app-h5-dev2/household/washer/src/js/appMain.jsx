// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {Seting} from './SetingPage.jsx';
import {Working} from './WorkingPage.jsx';
import {CircleAnimation} from './CircleAnimation.jsx';
import {Wave} from './Wave.jsx';
import {WashHistory} from './WashHistory.jsx';
import {WasherWave} from './WasherWave.jsx';
import {setDeviceInfo, getDeviceInfo,hasSetRequest} from './DeviceTokenCache.js';

var {Router, Route, hashHistory} = ReactRouter;


het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});
let isIOS = false;
let screenHeight = 375;
// 创建React组件

let appError = {
    Error1:{
        value:0,
        level:1,
        message:'进水异常'
    },
    Error2:{
        value:0,
        level:2,
        message:'排水异常'
    },
    Error3:{
        value:0,
        level:3,
        message:'脱水异常'
    },
    Error4:{
        value:0,
        level:4,
        message:'开盖异常'
    },
    Error5:{
        value:0,
        level:5,
        message:'水位传感器异常'
    },
    Error6:{
        value:0,
        level:6,
        message:'童锁报警'
    },
    Error7:{
        value:0,
        level:7,
        message:'PCBA温度传感器异常'
    },
    Error8:{
        value:0,
        level:8,
        message:'环境温度传感器异'
    },
    Error9:{
        value:0,
        level:9,
        message:'交流电压过高'
    },
    Error10:{
        value:0,
        level:10,
        message:'交流电压过低'
    },
    Error11:{
        value:0,
        level:11,
        message:'交流过流'
    },
    Error12:{
        value:0,
        level:12,
        message:'功率模块故障'
    },
    Error13:{
        value:0,
        level:13,
        message:'漏电'
    },
    Error14:{
        value:0,
        level:14,
        message:'电机温度过高'
    },
    Error15:{
        value:0,
        level:15,
        message:'进水流量计损坏'
    },
    Error16:{
        value:0,
        level:16,
        message:'出水流量计损坏'
    },
};


class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.listenStore(Store); // 监听Store
        Actions.appMainViewUpdateState();
        console.log("app constructor");

        this.state={
            showToHisPage: false
        }
    }

    handleToSettingPage(e) {

        let switchLock = this.state.washerSwitchLock || false;
        if(!switchLock){
            return;
        }
        if(!this.childLockCheckAction()){return;}

        let workModeIndex =  this.state.WorkStep || 0;   // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击
        let orderMode = this.state.OrderMode || 0;
        if(orderMode && (workModeIndex == 1) && this.state.isWorking){
            console.log("有预约，不能设置");
            return;
        }

        let isWorking =  this.state.isWorking  ;
        let isStop = this.state.washerIsStop || false;

        if(isWorking && !isStop){
            het.toast("请暂停后修改模式!");
            return;
        }

        window.location.href = '#/seting';
        Actions.setFirstInputSetingPage(true);
    }

    handleToHistoryPage(){
        window.location.href = '#/washhis';
    }
    componentWillMount(){
        console.log("appmain componentWillMount");
        het.setTitle(JSON.stringify({
            setNavTitle:0,
            setNavRightBtnHiden:0
        }))
    }

    componentDidMount() {
        console.log("appmain componentDidMount");
        //导航栏:{ios:73,android:64}
        isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        screenHeight =  window.screen.height ;

    }

    childLockCheckAction(){
        if(this.state.online == '2')  {
            het.toast("设备已离线");
            return false;
        }

        let childLock = this.state.washerChildLock || false;
        if(childLock){
            het.toast("童锁已经打开");
            return false;
        }
        return true;
    }
    stopAction(){

        let workModeIndex =  this.state.WorkStep || 0;   // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击
        let orderMode = this.state.OrderMode || 0;
        if(  orderMode && (workModeIndex == 1) && this.state.isWorking){
            console.log("有预约，不能设置");
            return;
        }
        if(!this.childLockCheckAction()){return;}

        let isStop = this.state.washerIsStop || false;
        Actions.stopAction(!isStop);
    }

    switchAction(){
        // let isWorking = (this.state.isWorking !== undefined) ? !this.state.isWorking : false ;
        // this.setState.isWorking = isWorking;
        //if(!this.childLockCheckAction()){return;}

        let switchData = !this.state.washerSwitchLock;
        Actions.switchAction(switchData);


        // 加快页面切换
        if(switchData == false){
            this.setState({
                isWorking:false
            })
        }
    }



    childLockAction(){

        let childLockData = !this.state.washerChildLock;
        Actions.childLockAction(childLockData);
    }

    handleAlert(){

        let hasError = false;
        let ErrorMessage = '';
        let lastErrorLevel = 17;  // 17最低  最新显示告警级别

        for(let i = 1; i < 17 ; i++){
           let errorNum = 'Error' + i;
            if(this.state[errorNum] != undefined && this.state[errorNum] == 1){  // 有没有告警
                if(this.state[errorNum] !=  appError[errorNum].value ){  // 有没有显示过告警  != ：没有显示过该告警
                    if(appError[errorNum].level < lastErrorLevel){  //
                        lastErrorLevel  =  appError[errorNum].level;
                        appError[errorNum].value = this.state[errorNum];
                        ErrorMessage = appError[errorNum].message;
                        hasError = true;
                    }
                }
            }
        }

        if(hasError){
           // het.toast(JSON.stringify({"title":ErrorMessage, "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}));
            het.toast(JSON.stringify({"contactService":ErrorMessage, "tel":"400-777-2009"}));
        }
    }

    showToWashHisPage(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            showToHisPage: true
        });
    }

    hiddenToWashHisPage(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            showToHisPage: false
        });
    }

    render() {

        let childLock = this.state.washerChildLock || false;
        let switchLock = this.state.washerSwitchLock || false;

        let isWorking =  this.state.isWorking  ;
        let washerTransform = this.state.showToHisPage ? 140 : 0;

        console.log("isWorking :" + isWorking + " count:" + this.state.count + " 暂停： " + this.state.washerIsStop);
        let workstatus = '待机中';
        let workAlert = '点击设置洗衣模式';

        let canToSeting = switchLock;
        if(childLock){
            canToSeting = false;
        }

        if(switchLock == false){
            workstatus = '关机';
        }
        if(this.state.online == '2')  {
            workstatus='设备已离线';
            isWorking = false;
            childLock = false;
            switchLock = false;
        }


        let hasGetDeviceId = hasSetRequest();
        if(isWorking){hasGetDeviceId = false};
        // let hasGetDeviceId = true;
        let canShowWashHis = hasGetDeviceId ? {visibility: 'visible'} : {visibility :'hidden'};


        let toSetingImagePath = canToSeting? '../static/image/washer/wash_mode.png' : '../static/image/washer/wash_mode_off.png' ;
        this.handleAlert();

        return <div className="container" >
            <div className="watingPage">
                <div className="diveceView">
                    <div className="device_nav" > </div>
                    <div className="deviceWasherImage"  >
                        <div className="deviceWashAnimation">
                            <WasherWave className="waterWave"/>
                        </div>
                    </div>
                    <div className="device_control">
                        <div className="device_control_relative">
                            <dl className="wash_children_lock" onTouchStart={this.childLockAction.bind(this)}>
                                <dd ><img src={"../static/image/washer/childerlock_"+ (childLock?"on.png":"off.png")} width='36' height='36'/></dd>
                                <dt>童锁</dt>
                            </dl>
                            <dl className="wash_switch" onTouchStart={this.switchAction.bind(this)}>
                                <dd  ><img src="../static/image/washer/wash_switch.png" width='36' height='36'/></dd>
                                <dt>{switchLock?'关机':'开机'}</dt>
                            </dl>
                        </div>

                    </div>
                </div>
                <div className="ControlPannelUpWave">
                    <Wave waveID="workWave"/>
                </div>
                <div className="diveceSetingView">
                    <div className="deviceSeting_status"><span>{workstatus}</span></div>
                    <div className="deviceSeting_modeImage" onTouchStart={this.handleToSettingPage.bind(this)}><img src={toSetingImagePath} /></div>
                    <div className={"deviceSeting_alert "+ (canToSeting?'':'off')}>{workAlert}</div>
                    <div className="show_wash_his_button" onTouchStart={this.showToWashHisPage.bind(this)} style={canShowWashHis}><img src="../static/image/arrow_up.png"/></div>
                </div>
            </div>
            <Working

                operate = { this.state }
                show={isWorking}
                childLockAction={this.childLockAction.bind(this)}
                switchAction={this.switchAction.bind(this)}å
                setingPageAction={this.handleToSettingPage.bind(this)}
                stopAction={this.stopAction.bind(this)}
            />
            <div className="wash_his_button"  style={{ transform: "translateY(-" + washerTransform +"px)",WebkitTransform: "translateY(-" + washerTransform +"px)", }} >
                <h2 onTouchStart={this.hiddenToWashHisPage.bind(this)}><img src="../static/image/arrow_down.png" /></h2>
                <h1 onTouchStart={this.handleToHistoryPage.bind(this)}>洗涤记录</h1>
            </div>
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/seting" component={Seting} />
            <Route path="/washhis" component={WashHistory}/>
        </Router>
    ), document.getElementById('ROOT'));
});