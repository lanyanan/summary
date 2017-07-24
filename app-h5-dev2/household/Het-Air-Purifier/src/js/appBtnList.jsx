// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';

var {Router, Route, hashHistory} = ReactRouter;


het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
    });
}); 

// 接收app推送数据
het.repaint((data)=>{
    //console.log("repaint ::: type : "+type+", data : "+data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent { 
    constructor(props) {
        super(props);
        this.listenStore(Store); // 监听Store
        // this.handleTouchTap = this.handleTouchTap.bind(this);
        this.changeSwitch = this.changeSwitch.bind(this);

        this.changeMode = this.changeMode.bind(this);
        this.changeWindSpeed = this.changeWindSpeed.bind(this);
    }

    changeSwitch(){

        if(this.liveError()){het.toast(this.liveError());return false};
        if(this.state.childLock==2){
            het.toast('童锁已经开启，不能操作');
            return false;
        }
        let onoff;
        if(this.state.powerOn==undefined){
            onoff =1;
        }else if(this.state.powerOn==1){
            onoff =2;
        }else if(this.state.powerOn==2){
            onoff =1;
        }
        //console.log("onoff == "+onoff)
        Actions.controllSwitch(onoff);
    }
    changeMode(){
        if(this.liveError()){het.toast(this.liveError());return false};
        if(this.state.childLock==2){
            het.toast('童锁已经开启，不能操作');
            return false;
        }
        //"智能0","标准1","速净2","节能3","睡眠4","假日5","手动6"
        //"停0","低档1","中档2","高档4","超高档8"
        if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
        let mode = this.state.workMode;
        let fanGear = this.state.motorGear;
        let uvSw = this.state.uvSw;
        let anionSw = this.state.anionSw;
        let ozoneSw = this.state.ozoneSw;
        if(mode==undefined){
            mode=0;//智能
            fanGear=2;
            anionSw=1;
        }else if(mode==0){
            mode=1;
            fanGear=4;
            uvSw = 1;
            anionSw =1;
        }else if(mode==1){
            mode=2;
            fanGear=8;
            uvSw = 1;
            anionSw =1;
        }else if(mode==2){
            mode=3;
            fanGear=2;
            uvSw = 1;
            anionSw =1;
        }else if(mode==3){
            mode=4;
            fanGear=1;
            uvSw = 1;
            anionSw =1;
        }else if(mode==4){
            mode=5;
            fanGear=1;
        }else if(mode==5){
            mode=6;
            fanGear=0;
        }else if(mode==6){
            mode=0;
            fanGear=2;
        }
        //console.log("mode == "+mode)
        Actions.controllMode(mode,fanGear,uvSw,anionSw,ozoneSw);
    }
    changeWindSpeed(){
        if(this.liveError()){
            het.toast(this.liveError());
            return false
        };
        if(this.state.childLock==2){
            het.toast('童锁已经开启，不能操作');
            return false;
        }
        if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
        let fanGear = this.state.motorGear;
        let mode = this.state.workMode;

        if( this.state.motorGear== undefined){
            this.state.motorGear = 0;
            fanGear=0;
            if(mode != 6){
                mode=6;
            }
        }else if(fanGear==0){
            fanGear=1;
            if(mode != 4){
                mode=6;
            }
        }else if(fanGear==1){
            fanGear=2;
            if(mode != 0){
                mode=6;
            }
        }else if(fanGear==2){
            fanGear=4;
            if(mode != 1){
                mode=6;
            }
        }else if(fanGear==4){
            fanGear=8;
            if(mode != 2){
                mode=6;
            }
        }else if(fanGear==8){
            fanGear=0;
            if(mode != 6){
                mode=6;
            }
        }
        //console.log("fanGear == "+fanGear)
        Actions.controllMode2(mode,fanGear);
    }

    liveError(){
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        if(this.state.online==2){
            return '设备与APP已断开连接！'
        }
        return false;
    }

    render() {
        let online;
        if(this.state.online==undefined){
            online = 1;
        }else {
            online = this.state.online;
        }

        let networkavailable;
        if(this.state.networkavailable==undefined){
            networkavailable = 1;
        }else {
            networkavailable = this.state.networkavailable;
        }

        let onoff;
        if(this.state.powerOn==undefined){
            // this.state.powerOn =2;
            onoff = 2;
        }else{
            onoff = this.state.powerOn;
        }
        // let statusBar="开机";
        // if (networkavailable==2){
        //     statusBar = "当前网络不可用";
        // } else if (online==2) {
        //     statusBar = "设备已离线";
        // }else if (onoff == 2){
        //     statusBar = "关机";
        // }


        let textMode="";
        if(this.state.workMode==undefined){
            textMode="无";
        }else if(this.state.workMode==0){
            textMode="智能";
        }else if(this.state.workMode==1){
            textMode="标准";
        }else if(this.state.workMode==2){
            textMode="速净";
        }else if(this.state.workMode==3){
            textMode="节能";
        }else if(this.state.workMode==4){
            textMode="睡眠";
        }else if(this.state.workMode==5){
            textMode="假日";
        }else if(this.state.workMode==6){
            textMode="手动";
        }
        //console.log("Mode= "+this.state.mode);

        let textOnOff="";
        if(onoff==undefined || onoff==1){
            textOnOff="开机";
        }else{
            textOnOff="关机";
        }
        //console.log("Onoff= "+this.state.onoff);

        let textFanGear="";
        // let fanGear;
        if(this.state.motorGear==undefined ){
            textFanGear="停"
            this.state.fanGear = 0
        }else if(this.state.motorGear==0){
            textFanGear="停"
        }else if( this.state.motorGear==1){
            textFanGear="低风速"
        }else if(this.state.motorGear==2){
            textFanGear="中风速"
        }else if(this.state.motorGear==4){
            textFanGear="高风速"
        }else if(this.state.motorGear==8){
            textFanGear="超高风速"
        }
        //console.log("FanGear= "+textFanGear);
        let childlock = this.state.childLock;

        let switchStatus = networkavailable===2 || online==2 || onoff === 2?"flex-cell  triggered":"flex-cell";
        let device_mode  = networkavailable===2 || online==2 || onoff === 2 ?"flex-cell  triggered":"flex-cell";
        let device_speed = networkavailable===2 || online==2 || onoff === 2 ?"flex-cell  triggered":"flex-cell";
        //let device_child_lock = networkavailable===2 || online==2 || onoff === 2 ?"flex-cell  triggered":"flex-cell";

        //console.log("fanGear== "+ textFanGear +" textMode= "+textMode);

        let runningOk = (online==2 || networkavailable==2 || onoff === 2 || childlock ==2) ? false:true;
        let title="";
        if(networkavailable==2){
            // title="工作中 模式："+textMode
            title = "当前网络不可用";
        }else  if(online==2){
            title = "设备已离线";
        }else  if(onoff==2){
            title = "设备已经关机";
        }else if(onoff==1){
            if(childlock==2){
                title =title +" 童锁开 "
            }
            if(this.state.RemainTime != 255 && this.state.RemainTime!=0 && this.state.RemainTime!=undefined){
                title= title +""+this.state.RemainTime+"小时后关机 "
            }
            title=title+" "+textMode+" "+textFanGear
        }

        return(
            <div>
                <h1 className="btn-title">{title}</h1>
                <section className="btnlist flex">
                    <article data-mode="1" className={switchStatus} onClick={this.changeSwitch} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/device_switch.png' alt=""/>
                        <p>{textOnOff}</p>
                    </article>
                    <article  data-mode="2" className={device_mode} onClick={this.changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/device_mode.png' alt=""/>
                        <p>{textMode}</p>
                    </article>
                    <article  data-mode="3" className={device_speed}  onClick={this.changeWindSpeed} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/device_speed.png' alt=""/>
                        <p>{textFanGear}</p>
                    </article>

                </section>
            </div>
        );
    }
}


//
//




// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});