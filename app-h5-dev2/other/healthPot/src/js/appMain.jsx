//~_~ My first react page is so ugly
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store,isClose} from './Store.jsx';
import {TimeSelect} from './TimeSelect.jsx';
import {SettingShow } from './SettingShow.jsx';
import {SettingAct } from './SettingAct.jsx';
import {SettingMode } from './SettingMode.jsx';
import {SettingClose } from './SettingClose.jsx';
import {Tips} from '../../../common/src/Tips.es6';

const {Router, Route, hashHistory, Link} = ReactRouter;
const AppData = {
    timer:null,
    change: false,
    count: 0,
    lastMode: 0,
    lastRecordTime: 0,
    slideClose: true,
    slideCount: 0,
    lastDryalarm: 0,
    lastColdwater: 0,
    lastSeparation: 0
}
// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            whereSet:null,
            timer: null,
            t: 7200,
            power:2,
            selectMode:0,
            powerTemperature:0,
            heatingTime:0,
            change:true,
            count:0,
            fold:false,
            dryalarm: 0,
            tipsMsg: '',
            showTips: false

        };

        window.trainTimer = setInterval(function(){
            Actions.intervalData();
        },5000);

        Actions.intervalData();
        // 获取故障信息
        this.falutTimer = setInterval(function(){
            Actions.getFaultData();
        },5000);

        // 获取控制数据
        this.contrlTimer = setInterval(function(){
            Actions.getCtrlData();
        },5000);

        Store.listen((data)=>{
            this.setState(data,()=>{})
        });

        this.handleErrorHint = this.handleErrorHint.bind(this);
        this.handleSelectSet = this.handleSelectSet.bind(this);
        this.handleModeShow = this.handleModeShow.bind(this);
        this.handleSwitch= this.handleSwitch.bind(this);
        this.submitClock =this.submitClock.bind(this);
        this.errClickTips =this.errClickTips.bind(this);
        this.cancelClock = function(){
            Actions.cancleSelect(3,'cancel');
        };
    }

    componentWillUnmount() {
        clearInterval(window.trainTimer);
        clearInterval(this.falutTimer);
        clearInterval(this.contrlTimer);
    }
    submitClock(h,m){
        let whereSet = null;
        if(this.state.whereSet=='A') {
            whereSet = 'A';
        }else if(this.state.whereSet=='B'){
            whereSet = 'B'
        }else if(this.state.whereSet=='C'){
            whereSet = 'C'
        }else if(this.state.whereSet=='D'){
            whereSet = 'D'
        }
        let slide=  this.state.slide;
        Actions.submitSelect(h,m,slide,whereSet);
    }
    //开关机
    handleSwitch(e){
        Actions.switch({slide:2});
    }
    //显示隐藏设置面板
    handleModeShow(e){

        e.preventDefault();
        //故障提示
        //if( this.state.networkavailable==2 ) {het.toast('当前网络不可用');return false;}
        //if( this.state.online==2 ) {het.toast('设备已离线');return false;}
        //if( this.state.dryalarm==1 ) {het.toast('设备干烧');return false;}
        //if( this.state.separation==1 ) {het.toast('壶坐分离');return false;}
        //if(this.state.coldwater==1) {het.toast('冷水注入');}//冷水注入仅仅提示，仍可以操控设备
        AppData.slideCount +=1;
        //slide:2为折叠，1为展开
        Actions.toggleModeShow({slide:1,fold:true});
        this.state.online!= 2 && this.state.networkavailable!=2

        // 动态设置华为app的导航的显示隐藏
         const applicationService = window.AppJsBridge.service.applicationService;
         this.state.slide === 1 ? applicationService.hideTitleBar() : applicationService.showTitleBar()

    }
    //选择控件设置
    handleSelectSet(e){
        //故障提示
        if( this.state.networkavailable==2 ) {het.toast('当前网络不可用');return false;}
        if( this.state.online==2 ) {het.toast('设备已离线');return false;}
        if( this.state.dryalarm==1 ) {het.toast('设备干烧');return false;}
        if( this.state.separation==1 ) {het.toast('壶坐分离');return false;}
        if(this.state.coldwater==1) {het.toast('冷水注入');}//冷水注入仅仅提示，仍可以操控设备

        Actions.toggleSelectShow();
        //选择控件的数据提交在submitClock函数里
        let idx = e.currentTarget.getAttribute('data-value');//获取当前设置项并展开
        let current = e.currentTarget.getAttribute('data-current');
        let keepIf = e.currentTarget.getAttribute('data-keep');
        this.state.whereSet = current;
        //let selectShow = 1;
        //  if(this.state.slide==2){
        //  selectShow:false
        //}
        this.setState({
            boot:idx,
            keep:keepIf,
            selectShow:1,
            current:current,
            recordReservation:0
        })
    }
    //故障回调
    handleErrorHint(){
        let msg = this.state.dryalarm==1? '设备干烧，请立即断电！':'壶坐分离';
        het.toast(msg);
    }

    errClickTips() {
        this.setState({showTips: false});
    }

    render() {
        let statusId = this.state.workstatus? this.state.workstatus:1;
        let modeId = this.state.workingmode ?this.state.workingmode:0;

        let forbid = false;
        //boot 0 温度功率设置，1加热设置 2 预约时间
        let boot = this.state.boot!==''?this.state.boot:false;
        let selectshow = (boot && this.state.selectShow ===1) ? true : false;
        //标题
        let selectTitle =['功率','加热时长','预约启动时间'][boot];
            //保温模式选择控件标题有变
            modeId == 1 && (selectTitle='温度');
            this.state.keep=='保温' ?selectTitle='保温':selectTitle;
        //显隐
        let hourshow =[true,true,true][boot];
        let minuteshow =[false,false,true][boot];
        //功率选项只有保温显示为温度设置，需要显示不同，此处为保温选择数组传入
        let bootKeep  ='';
        if(this.state.current==='A'){
            //实时设置功率(保温温度)按钮处的单位，不随内部模式选择但只提交到本地的改变，而切换模式单位，只有提交切换模式后才切换，workingmode是提交到APP后的模式
            bootKeep = this.state.workingmode ==1 ?true:false;
        }else{
            //内部选中不实时，不可以更改实时设置功率（保温温度）按钮的单位，selectMode是本地选中模式
            bootKeep = this.state.selectMode ==9 ?true:false;
        }
        let modeKeepArray= bootKeep? [40,45,50,55,60,65,70,75,80,85,90]:[100,200,300,400,500,600,700,800];
        let modeKeepHourstep = bootKeep? 5:100;
        let modeKeepMinhour = bootKeep? 40:100;
        let modeKeepMaxhour = bootKeep? 90:800;
        let modeKeepHourunit = bootKeep? '°C':'w';
        let modeKeepDefaulthour=  bootKeep?40:100;
        //间隔
        let hourstep = [
            modeKeepHourstep,//最小功率100瓦
            2,//只有酸奶可设置，最小时长4小时
            1//默认间隔
        ][boot];
        let minutestep = ['','',10][boot];
        //范围
        let minhour = [
            modeKeepMinhour,//最小功率100瓦或40度
            4,//只有酸奶可设置，默认起始时间4小时
            0//预约最小时长，默认起始时间
        ][boot];
        //范围
        let minminute = [
            0,//最小功率100瓦或40度
            0,//只有酸奶可设置，默认起始时间4小时
            0//预约最小时长，默认起始时间
        ][boot];
        let maxhour = [
            modeKeepMaxhour,//加热功率最大800瓦
            18,//只有酸奶可设置，最大时长
            23//预约时长，最大24小时
        ][boot];
        //单位
        let hourunit =[modeKeepHourunit,'',''][boot];
        let minuteunit = ['','',''][boot];
        //重置选项为默认初始值
        let defaulthour= [modeKeepDefaulthour,4,0][boot];
        let defaultminute= [false,false,0][boot];
        //选项
        let hourarray= [modeKeepArray, [4,6,8,10,12,14,16,18], false][boot];

        //设置面板抽屉
        let showModeSet = this.state.slide==2?false:true;
        //设置面板安卓返回（物理返回键）操作
        if(AppData.slideCount!=0 && this.state.fold ==true && this.state.slide==2){
            Actions.toggleModeShow({slide:2,fold:false,selectShow:0});//,selectshow:0
        }
        //状态设置
        let ArrayInit= null;
        if(this.state.selectShow==0 || this.state.selectShow==false){
            ArrayInit= [true, true, true][boot];
        }else{
            ArrayInit= [false, false, false][boot];
        }
        //workingmode与改modeArray键值一一对应
        let modeArray = {
            0:{name:'模式',pic:0,value:0,mode:0,powerTemperature:0,heating:0,reservation:0},
            1:{name:'保温',live:'on',pic:9,value:9,mode:1,powerTemperature:60,heating:90,reservation:0},
            2:{name:'烧水',pic:6,value:6,mode:2,powerTemperature:800,heating:5,reservation:0},
            3:{name:'纤体瘦身'},
            4:{name:'祛斑美白'},
            5:{name:'排毒养颜'},
            6:{name:'滋补安神'},
            7:{name:'调经四物汤'},
            8:{name:'清新果茶'},
            9:{name:'青春靓颜茶'},
            10:{name:'花茶',live:'on',pic:1,value:1,mode:10, powerTemperature:300,heating:5,reservation:0},
            11:{name:'水果茶',pic:9},
            12:{name:'药膳',live:'on',pic:5,value:5,mode:12,powerTemperature:200,heating:40,reservation:0},
            13:{name:'酸奶',pic:4,value:4,mode:13,powerTemperature:300,heating:18,reservation:0},
            14:{name:'煮蛋',pic:2,value:2,powerTemperature:800,heating:5,reservation:0},
            15:{name:'煮面',live:'on',pic:3,value:3,mode:15,powerTemperature:800,heating:10,reservation:0},
            16:{name:'滋补汤'},
            17:{name:'银耳羹',pic:10},
            18:{name:'火锅',live:'on',pic:8,value:8,mode:18,powerTemperature:300,heating:115,reservation:0},
            19:{name:'煲汤',live:'on',pic:7,value:7,mode:19,powerTemperature:300,heating:115,reservation:0},
            20:{name:'果茶'},
            21:{name:'营养粥'},
            22:{name:'婴儿用水'},
            23:{name:'调奶'},
            24:{name:'温奶'},
            25:{name:'花草茶'},
            26:{name:'百草茶'},
            27:{name:'养颜茶'},
            28:{name:'滋补茶'},
            29:{name:'红茶'},
            30:{name:'绿茶'},
            31:{name:'煮酒'},
            32:{name:'煮咖啡'},
            33:{name:'蒸水蛋'},
            34:{name:'养生汤'},
            35:{name:'雪梨汤'},
            36:{name:'隔水炖'},
            37:{name:'甜品'},
            38:{name:'炖燕窝'},
            39:{name:'炖虫草'},
            40:{name:'武火'},
            41:{name:'文火'},
            42:{name:'凉茶'},
            43:{name:'宝宝粥'},
            44:{name:'五谷粥'},
            45:{name:'泡奶粉'},
            46:{name:'热奶'},
            47:{name:'消毒'}
        };
        let modeStatusArray = [
            {value:'0',status:'待机中'},
            {value:'1',status:'空闲中'},
            {value:'2',status:'预约中'},
            {value:'3',status:'加热中'},
            {value:'4',status:'保温中'},
            {value:'5',status:'大火续沸'},
            {value:'6',status:'中火熬煮'},
            {value:'7',status:'小火慢炖'},
            {value:'8',status:'工作完成'}
        ];


        let modeYogurt= this.state.workingmode ==13 ? true:false;
        let modeDefault= modeId===0;
        let modeChange = modeId!==0;
        let modeName = modeId===0?'--': modeArray[modeId].name;
        let modeActName = modeArray[modeId].name;
        let modeStatus = modeStatusArray[statusId].status;
        let modeTemp = this.state.temperature? this.state.temperature:false;
        //功率or保温判断
        modeId== 1 ?
            this.state.powerTemperature = this.state.heatpreservation ://（保温模式为温度，其他为功率）
            this.state.powerTemperature = this.state.heatingpower*100;
        //显示数据
        let modeRunPower = parseInt(this.state.powerTemperature) ? this.state.powerTemperature:'--';//功率或温度
        if(this.state.workingmode== 2){
            //烧水没回，手动设置为800
            modeRunPower = 800
        }
        this.state.powershow = this.state.workingpower*100;
        let modeCtrlPower = this.state.powershow ? this.state.powershow:'--';//运行功率，原始字段是workingpower
        let modeUnit =  modeDefault ? '':(modeId==1 ?'°C':'W');
        //工作时间设置
        modeId== 13  ?
            this.state.heatingTime = this.state.timehour:
            this.state.heatingTime = parseInt(this.state.timehour)*60+ this.state.timemin;

        let modeHeatTime =  this.state.heatingTime ?  this.state.heatingTime:'--';
        let modeHeatTimeUnit = modeDefault?'':(modeYogurt ?'H':'min');//先判断是否显示单位，再判断酸奶单位加热时长以小时计
        let modeReserveTime =  this.state.reservation ?  this.state.reservation*10 :0;

        let modeLive = modeArray[modeId].live;
        //保温模式
        let modeKeep = modeId ==1;
        let modeKeepImg= {'backgroundImage': 'url(../static/img/m-'+modeArray[modeId].pic+'-on.png)'};

        //设备端模式更改，收起设置选择面板
        if(AppData.lastMode!==this.state.workingmode){
            AppData.lastMode = this.state.workingmode;
            if(this.state.slide==1){
                //设备控制数据，切换模式关闭设置面板
                showModeSet = false;
                Actions.toggleModeShow({slide:2});
            }
            if(selectshow==true){
                //切换模式关闭选择控件
                selectshow = false;
                this.state.selectShow = 0;
            }
        }

        //预约时间和工作时间和保温倒计时(保温有所不同)
        let timerHour = null;
        let timerMin = null;
        let timerSplit = null;
        let timerFormat= (t)=>(parseInt(t)<10?'0'+t:t);
        let surplusReservationHour = timerFormat(this.state.surplusreservationtimehour);
        let surplusReservationMin  = timerFormat(this.state.surplusreservationtimemin);
        let surplusWorkTimeHour    = timerFormat(this.state.surplusworktimehour);
        let surplusWorkTimeMin     = timerFormat(this.state.surplusworktimemin);
        let surplusHeatPreservationHour = timerFormat(this.state.surplusheatpreservationhour);
        let surplusHeatPreservationMin  = timerFormat(this.state.surplusheatpreservationmin);
        if(modeId!=0) {
            //初始不设置
            if (modeId != 1) {
                if(surplusReservationHour != 0 || surplusReservationMin != 0){
                    //开始预约倒计时
                    timerHour = surplusReservationHour;
                    timerMin = surplusReservationMin;
                    if (timerHour == 0 && timerMin == 0) {
                        timerHour = '';
                        timerMin = '';
                    }
                }else if(surplusWorkTimeHour != 0 || surplusWorkTimeMin != 0){
                    //加热中不显示倒计时，倒计时从小火中火大火才开始更改
                    if(statusId==3){
                        timerHour = '';
                        timerMin = '';
                    }else{
                        timerHour = surplusWorkTimeHour;
                        timerMin = surplusWorkTimeMin;
                        if (timerHour == 0 && timerMin == 0) {
                            timerHour = '';
                            timerMin = '';
                        }
                    }
                }
            } else {

                if (surplusReservationHour != 0 || surplusReservationMin != 0) {
                    //开始预约倒计时
                    timerHour = surplusReservationHour;
                    timerMin = surplusReservationMin;
                    if (timerHour == 0 && timerMin == 0) {
                        timerHour = '';
                        timerMin = '';
                    }
                }else{
                    //进入保温模式倒计时
                    timerHour = surplusHeatPreservationHour;
                    timerMin = surplusHeatPreservationMin;
                    if (timerHour == 0 && timerMin == 0) {
                        timerHour = '';
                        timerMin = '';
                    }
                }

            }
        }
        timerSplit = !timerHour && !timerMin ? '':':';//时间都为空则冒号隐藏

        //故障数据
        let slide = this.state.slide;
        let recodeTime = this.state.record_time;
        //设备干烧
        let dryalarm = this.state.dryalarm==1 ? 1: 0;
        //壶坐分离
        let separation = this.state.separation==1 ? 1:0;
        //冷水注入
        let coldwater = this.state.coldwater==1 ? 1: 0;
        let hideSlide = ()=>{
            if(slide==1 && coldwater!=1){
                Actions.toggleModeShow({slide:2});
            }
            if(selectshow==true){
                //切换模式关闭选择控件
                selectshow = false;
                this.state.selectShow = 0;
            }
        };
        //故障数据连续发送，本地计数器和运行故障数据对比，不等更新本地字段，弹窗提示，收起模式设置面板，直到返回故障正常字段解除提示
        if(AppData.lastDryalarm!=dryalarm){
            AppData.lastDryalarm=dryalarm;
            dryalarm==1 && (het.toast("dryalarm"),hideSlide(),console.log('干烧'));
        }
        if(AppData.lastColdwater!=coldwater){
            AppData.lastColdwater=coldwater;
            coldwater==1 && (het.toast("coldwater"),console.log('冷水注入'));
        }
        if(AppData.lastSeparation!=separation){
            AppData.lastSeparation=separation;
            separation==1 && (het.toast("separation"),hideSlide(),console.log('分离'));
        }
        (dryalarm==1||separation==1) && (forbid = true);

        let handleSelectSet = forbid ? this.handleErrorHint:this.handleSelectSet;
        let handleModeShow = forbid ? this.handleErrorHint:this.handleModeShow;
        let handleSwitch = forbid ? this.handleSwitch:this.handleSwitch;
        if(separation==1){
            handleSwitch = this.handleSwitch;
        }
        //设备离线
        if(this.state.online==2 || this.state.networkavailable==2){
            if(showModeSet==true){
                showModeSet = false;
                het.toast('chealth_potmode_save');
            }
            selectshow==true && (selectshow = false);
            showModeSet==true && (showModeSet = false);
        }
        //关机重置计时器
        if(this.state.power==2){
            if(this.state.slide ==1){
            }
            this.state.slide =2;
            AppData.slideCount =0;
            showModeSet = false;
            selectshow = false;//关机收起选择控件
            //关机也要提示故障，关机并不等于断电
            //AppData.lastRecordTime = 0;
            //AppData.lastDryalarm = 0;
            //AppData.lastColdwater = 0;
            //AppData.lastSeparation = 0;
        }
        //展示运行数据
        const settingShow = {
            power: this.state.power,
            statusId: statusId,
            modeTemp: modeTemp,
            modeName: modeName,

            modeStatus: modeStatus,
            timerHour: timerHour,
            timerSplit: timerSplit,
            timerMin: timerMin,
            handleSwitch: handleSwitch,
        };
        //展示控制数据
        const settingAct = {
            slide: this.state.slide,
            modeId:modeId,
            modeKeepImg:modeKeepImg,
            modeActName:modeActName,
            handleModeShow:handleModeShow,

            modeLive:modeLive,
            modeChange:modeChange,
            modeRunPower:modeRunPower,
            modeUnit:modeUnit,
            modeKeep:modeKeep,
            handleSelectSet:handleSelectSet,

            modeHeatTime:modeHeatTime,
            modeHeatTimeUnit:modeHeatTimeUnit,
            modeReserveTime:modeReserveTime,
        }
        //设置模式更改
        const settingMode = {
            slide: this.state.slide,
            showModeSet:showModeSet,

            selectMode:this.state.selectMode,
            selectPower :this.state.selectPower,
            selectHeating:this.state.selectHeating,
            selectReservation:this.state.selectReservation,

            handleSelectSet:handleSelectSet,
        }
        return (
            <main className="app-body">

                <section  className={'dev-open '+ (isClose() ? 'slide-down':'slide-up')}>
                    <SettingScreen />
                    <SettingMode settingMode =  {settingMode}/>
                    <SettingShow settingShow =  {settingShow}/>
                    <SettingAct  settingAct  =  {settingAct}/>
                </section>
                <SettingClose  handleSwitch = {handleSwitch}/>
                <TimeSelect title={selectTitle}
                            minuteshow={minuteshow}
                            hourshow={hourshow}
                            minutestep={minutestep}
                            hourstep ={hourstep}
                            minminute ={minminute}
                            minhour={minhour}
                            maxhour={maxhour}
                            minuteunit={minuteunit}
                            hourunit={hourunit}
                            defaulthour={defaulthour}
                            defaultminute={defaultminute}
                            cancelClock={this.cancelClock}
                            submitClock={this.submitClock}
                            show={selectshow}
                            hourarray={hourarray}
                            ArrayInit={ArrayInit}/>
                        <Tips msg={this.state.tipsMsg} btn1='' btn2='我知道了' show={this.state.showTips}  errCallback={this.errClickTips} />
                        <div id="mytoast"></div>
            </main>
        )
    }
}
//主页背景
export const SettingScreen = React.createClass({
    render(){
        return(
            <div className="setting-screen">
                <img src="../static/img/dev-screen.jpg"/>
            </div>
        )
    }
})

het.domReady(() => {
    het.config({
        appId: '30590',
        appSecret:'98889238ed6e441aaf9b0691b017695f'
    });
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
})
