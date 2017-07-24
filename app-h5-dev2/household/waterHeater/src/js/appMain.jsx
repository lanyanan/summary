// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {Seting} from './SetingPage.jsx';
import {Working} from './WorkingPage.jsx';
import {CircleAnimation} from './CircleAnimation.jsx';
import {Wave} from './Wave.jsx';
import {WaveAnimation} from './WaveAnimation.jsx';
import {WasherWave} from './WasherWave.jsx';
import {washerModeS, waterTempArray} from  './WasherCommonData.js';
import {ModeSetingPage} from  './ModeSetingPage.jsx';

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


let isIOS = false;
let screenHeight = 375;
let deviceNaveClassName = 'device_nav';
let showWorkingPannelImage = false;
let appError = {
    BK1:{
        value:0,
        level:1,
        message:'低温保护'
    },
    BK2:{
        value:0,
        level:2,
        message:'漏电保护'
    },
    BK3:{
        value:0,
        level:3,
        message:'超温保护'
    },
    BK4:{
        value:0,
        level:4,
        message:'漏水保护'
    },
    BK5:{
        value:0,
        level:5,
        message:'超时保护'
    },
    BK6:{
        value:0,
        level:6,
        message:'水压低保护'
    },
    BK7:{
        value:0,
        level:7,
        message:'干烧保护'
    },
    BK8:{
        value:0,
        level:8,
        message:'自动泄压保护'
    },
    BK9:{
        value:0,
        level:9,
        message:'进水口传感器故障'
    },
    BK10:{
        value:0,
        level:10,
        message:'出水口传感器故障'
    },
    BK11:{
        value:0,
        level:11,
        message:'进水口镁棒更换'
    },
    BK12:{
        value:0,
        level:12,
        message:'出水口镁棒更换'
    },
    BK13:{
        value:0,
        level:13,
        message:'银离子部件更换'
    },
    BK14:{
        value:0,
        level:14,
        message:'直流母线电压过高'
    },
    BK15:{
        value:0,
        level:15,
        message:'直流母线电压过低'
    },
    BK16:{
        value:0,
        level:16,
        message:'MCU读写错误'
    },
    BK17:{
        value:0,
        level:17,
        message:'WIFI读写错误'
    },
    BK18:{
        value:0,
        level:18,
        message:'通讯故障'
    },
};
// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.listenStore(Store); // 监听Store
        Actions.appMainViewUpdateState();
        console.log("app constructor");
        this.state = {
            showWaterPannel:false,
            showModeSetingPage:false
        };

    }
    componentWillMount(){ 
        het.setTitle(JSON.stringify({ 
            setNavTitle:0, 
            setNavRightBtnHiden:0 
        })) 
    }

    componentDidMount() {
        //导航栏:{ios:73,android:64}
        isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));

    }

    handleToSettingPage(e) {
        let onlineStatus = (this.state.online != '2'&&this.state.onlineStatus) || false;
        let childrenLockOn =  this.state.set_childerLockOn !==undefined ? this.state.set_childerLockOn : false;
        let switchLockOn =  this.state.set_switchLockOn !==undefined ? this.state.set_switchLockOn : false;
        let netWorkStatus = (this.state.networkavailable ==2);
        if(netWorkStatus){
            het.toast("当前网络不可用");
            return ;
        }
        if(!onlineStatus){
            het.toast("设备已离线");
            return;
        }
        // else if(!switchLockOn){
        //     het.toast("请开机");
        //     return;
        // }
       else  if(childrenLockOn){
            het.toast("童锁已打开");
            return;
        }

        if(onlineStatus
            // && switchLockOn
            && !childrenLockOn){
            console.log('jinlaile进来了222');
            // Actions.setingPageSet(true);
            // window.location.href = '#/seting';
            this.setState({
                showModeSetingPage:true,
            });
        }

    }

    handleSetingPageHandle(modeIndex){
        this.setState({
            showModeSetingPage:false,
        });

        console.log("handleSetingPageHandle  "  + modeIndex);
        if(modeIndex > 0){
            let data = {
                set_waterTempIndex:0,
                set_waterMode:modeIndex,
            };
            Actions.startWataerAction(data);
        }
    }

    handleToWorkingPage(){

        this.setState({
            showWaterPannel:!this.state.showWaterPannel,
        });
    }

    switchAction(){
        Actions.setWaterHeaterPowerOn();
    }

    childerLockon(){
        Actions.setWaterHeaterChildOn();
    }

    addTempAction(){
        if(!showWorkingPannelImage){
            return;
        }

        Actions.addTempAction();
    }

    subTempAction(){
        if(!showWorkingPannelImage){
            return;
        }
        Actions.subTempAction();
    }

    handleAlert(){

        let hasError = false;
        let ErrorMessage = '';
        let lastErrorLevel = 18;  // 17最低  最新显示告警级别

        for(let i = 1; i < 19 ; i++){
            let errorNum = 'BK' + i;
            if(this.state[errorNum] != undefined && this.state[errorNum] == 1){  // 有没有告警
                if(this.state[errorNum] !=  appError[errorNum].value){  // 有没有显示过告警  != ：没有显示过该告警
                    // if(appError[errorNum].level < lastErrorLevel)
                    {  //
                        lastErrorLevel  =  appError[errorNum].level;
                        appError[errorNum].value = this.state[errorNum];
                        ErrorMessage = ErrorMessage + appError[errorNum].message+'  ';
                        hasError = true;
                    }
                }
            }
        }

        if(hasError){
            het.toast(JSON.stringify({"contactService":ErrorMessage, "tel":"075526727188"}));
        }
    }
    render() {
        this.handleAlert();
        screenHeight =  window.screen.height ;
        deviceNaveClassName =  screenHeight > 600 ? 'device_nav_2' :  'device_nav';
        console.log("className:" + deviceNaveClassName + "   screenHeight:" + screenHeight);
        if(!isIOS){
            deviceNaveClassName  = 'device_nav_0';
        }

        let onlineStatus = (this.state.online != '2'&&this.state.onlineStatus) || false; // 在线状态 true 在线
        let childrenLockOn =  this.state.set_childerLockOn || false;
        let switchLockOn =  this.state.set_switchLockOn !==undefined ? this.state.set_switchLockOn : false;
        let waterHeaterTemp = this.state.waterHeaterTemp !==undefined ? this.state.waterHeaterTemp : 25;

        let isWorking =  (onlineStatus&&!childrenLockOn)||this.state.isWorking  ;
        let workMode = this.state.waterHeaterWorkMode !== undefined ? this.state.waterHeaterWorkMode : 0  ;

        console.log('APPmainMode: ' + workMode + ' set_switchLockOn: ' + this.state.set_switchLockOn + ' waterHeaterTemp: ' + this.state.waterHeaterTemp);
        let workModeImage = isWorking ? '../static/image/mode/m-'+ workMode + '-on.png' : "../static/image/heater/main_mode_image.png";

        let waterTemp =   waterHeaterTemp +'℃';
        console.log("######################waterHeaterTemp:"+waterHeaterTemp+"this.state.waterHeaterTemp"+this.state.waterHeaterTemp);
        let worksts = this.state.worksts || 1;
        let workstatus = '';
        let workAlert = '点击更换模式';
        if (onlineStatus&&switchLockOn){
            // workstatus = '运行中';
            if (isWorking){
                workstatus =washerModeS[workMode].name+'模式运行中';
                showWorkingPannelImage = true;
            }
            if(worksts == 3){
                workstatus = '设备故障';
            }
        }else{
            if(worksts == 1){
                workstatus = '待机中';
            }


            if (isWorking){
                showWorkingPannelImage = true;
            }
            else {
                showWorkingPannelImage = false;
            }

            if(!onlineStatus){
                workstatus = '设备已离线';
                switchLockOn = false;
                childrenLockOn = false;
                this.state.showWaterPannel = false;
            }
            else if(!switchLockOn){
                workstatus = '待机中';
                workAlert = '点击设置加热模式';
            }
        }



        return <div className="container" >
            <div className="watingPage">
                <div className={deviceNaveClassName}></div>
                <div className="diveceView">
                    <div className="device_padding">   </div>
                    <div className="deviceHeaterImage">
                        <div className="flex tempControl" style={{'opacity':(showWorkingPannelImage?'1':'0')}} >
                            <div className="flex-cell" onTouchStart={this.subTempAction.bind(this)}><img src="../static/image/heater/tempSub.png" width='20' height='20'/></div>
                            <div className="flex-cell"><p>{waterTemp}</p></div>
                            <div className="flex-cell" onTouchStart={this.addTempAction.bind(this)}><img src="../static/image/heater/tempAdd.png" width='20' height='20'/></div>
                        </div>
                        <div className="device_image">
                            <img src="../static/image/heater/heater_main.png" />
                        </div>
                    </div>
                    <div className="device_control">
                        <dl className={"wash_children_lock " + (switchLockOn?' ':'off') } onTouchStart={this.childerLockon.bind(this)}>
                            <dd ><img src={"../static/image/washer/childerlock_"+(childrenLockOn?"on.png":"off.png")} /></dd>
                            <dt>童锁</dt>
                        </dl>
                        <dl className={"wash_switch " + (switchLockOn?' ':'off') } onTouchStart={this.switchAction.bind(this)}>
                            <dd  ><img src="../static/image/washer/wash_switch.png" /></dd>
                            <dt>{switchLockOn?'待机':'运行'}</dt>
                        </dl>
                    </div>
                </div>
                <Wave waveID="workWave"/>
                <div className="diveceSetingView">
                    <div className="deviceSeting_status"><span>{workstatus}</span></div>
                    <div className="deviceSeting_modeImage" onTouchStart={this.handleToSettingPage.bind(this)}><img src={workModeImage} /></div>
                    <div className="deviceSeting_alert" style={{'opacity':(childrenLockOn?'1':'0.5')}}>{workAlert}</div>
                    <div className="device_showStatusView" style={{'display':(showWorkingPannelImage?'block':'none')}} onTouchStart={this.handleToWorkingPage.bind(this)}><img src="../static/image/heater/arrow_up.png" width='20' height='20'/></div>
                </div>
            </div>
            <Working
                show={this.state.showWaterPannel}
                handeleAction={this.handleToWorkingPage.bind(this) }
                intemp = {this.state.intemp}
                outtemp = {this.state.outtemp}
                showertm = {this.state.showertm}
                waterspd = {this.state.waterspd}
                devicetm = {this.state.devicetm}
                waterall = {this.state.waterall}

                />
            <ModeSetingPage
                show     = {this.state.showModeSetingPage}
                workMode = {this.state.set_waterMode}
                setingModeFunction = {this.handleSetingPageHandle.bind(this)}
            />
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
        </Router>
    ), document.getElementById('ROOT'));
});