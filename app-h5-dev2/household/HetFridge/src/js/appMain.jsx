// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TempSelect} from './TempSelect.jsx';
import Alert from './Alert.jsx';
import CheckGraph from './CheckGraph.jsx';
var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 开启控制数据渲染，以便filter能取到控制数
        updateFlagMap: {
        }
    });


});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

var modeArray = [
    {id:1,name:'常规'},
    {id:2,name:'速冷'},
    {id:3,name:'速冻'},
    {id:4,name:'智能'},
    {id:5,name:'节能'},

];
var appData =[
    {value:0,error:'SensorFailureInRefrigeratedRoom',content:'冷藏室传感器故障'},
    {value:0,error:'RefrigeratorEvaporatorSensorFailure',content:'冷藏室蒸发器传感器故障'},
    {value:0,error:'FreezingChamberSensorFailure',content:'冷冻室传感器故障'},
    {value:0,error:'RefrigerationRoomEvaporatorSensorFailure',content:'冷冻室蒸发器传感器故障'},
    {value:0,error:'GreenhouseSensorFailure',content:'变温室传感器故障'},
    {value:0,error:'SensorFailureInGreenhouse',content:'变温室蒸发器传感器故障'},
    {value:0,error:'PCBAenvironmentSensorFault',content:'PCBA环境传感器故障'},
    {value:0,error:'DoorSwitchFailureSwitchHardwareFailure',content:'冷藏室门开关故障（开关硬件故障）'},
    {value:0,error:'CoolDoorSwitchFailureSwitchHardwareFailure',content:'冷冻室门开关故障（开关硬件故障）'},
    {value:0,error:'ChangDoorSwitchFailureSwitchHardwareFailure',content:'变温室门开关故障（开关硬件故障）'},
    {value:0,error:'ACvoltageAbnormalFau',content:'交流电压异常故障'},
    {value:0,error:'CompressorFault',content:'压机过流故障'},
    {value:0,error:'FailureOfRefrigerant',content:'缺少制冷剂故障'},
    {value:0,error:'AgingLayerFault',content:'保温层严重老化（发泡层）'},
    {value:0,error:'LeakageProtectionFault',content:'漏电保护故障'},
    {value:0,error:'CompressorOverTemperatureFault',content:'压机过温故障'},
    {value:0,error:'RefrigeratorDoorIsNotClosedStrict',content:'冷藏室门未关严'},
    {value:0,error:'FrozenDoorIsNotClosedStrict',content:'冷冻室门未关严'},
    {value:0,error:'MCUFLASHReadWriteError',content:'MCU FLASH读写错误'},
    {value:0,error:'WIFIFLASHReadWriteError',content:'WIFI FLASH读写错误'},
    {value:0,error:'WIFIandMCUCommunicationFault',content:'WIFI与MCU通讯故障'},
] ;




// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            ChipSelect:false,
            beforeMode:1,
            workmode:1,
            //请求计数
            requestCount:0,
            isShowAlert:false,
        };
        this.listenStore(Store); // 监听Store
        this.selectMode=this.selectMode.bind(this);
        this.openSelectTemp=this.openSelectTemp.bind(this);
        this.cancelClock=this.cancelClock.bind(this);
        this.submitClock=this.submitClock.bind(this);
        this.selectMode = this.selectMode.bind(this);
        this.childLock = this.childLock.bind(this);
        this.childSetState = this.childSetState.bind(this);
        this.checkGraphClick = this.checkGraphClick.bind(this);
        this.mySwiper;
        het.setTitle(JSON.stringify({setNavTitle:1,title:'HET-风冷双温区冰箱',setNavRightBtnHiden:0}));

    }
    componentDidMount(){
        this.mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
    }
    openSelectTemp(e){
        //data-mode 1冷冻 2冷藏
        console.log('openSelectTemp');
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        this.setState({
            boot:selectMode,
            selectshow:true,
        });
    }
    cancelClock(){
        //未传任何参数，trigger返回一个假值，关闭控件
        Actions.cancelSelect();
        console.log('关闭');
    }
    submitClock(e,boot){
        //传入选择控件选中的小时数组和分钟数组
        //let where = 1;//this.state.boot;
        //let selectMode = 1;//this.state.function;
        ////Actions.submitSelect(h,m,where,selectMode);
        ////console.log('选中的值',h,m);
        let temp = e;
        console.log('temp--------',temp,boot);
        appData.selectArray= {};
        if(boot == 0){
            appData.selectArray  = {
                setTempcolorromm:temp,
            };
            setTimeout(this.setState({
                setTempcolorromm:temp, //冷冻
                selectshow:false,
            }),"2000");



        }else if(boot ==1 ){
            appData.selectArray  = {
                setTempStorage:temp,
            };
            setTimeout(this.setState({
                setstoreTemp:temp, //冷冻
                selectshow:false,
            }),"2000");
        }

        Actions.submitSelect(appData.selectArray,boot);
    }
    childLock(){
        console.log('进入童锁');
        //this.state.ChipSelect = true;
        this.setState({ChipSelect:!this.state.ChipSelect});


    }
    //选择模式
    selectMode(e) {
        console.log('进入模式选择方法');
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log("selectMode",selectMode);
        let ChipSelect = this.state.ChipSelect;
        Actions.launchMode({workmode:selectMode});
    }

    childSetState(e){
        this.setState({isShowAlert:e.isShowAlert});
    }
    checkGraphClick(){
        window.location.href = '#/checkGraph';
    }
    render() {
        //进入的时候调用一遍冰箱用电量接口.
        if(this.state.accessToken!=null
            &&this.state.appId!=null
            && this.state.deviceId!=null
            &&this.state.requestCount==0){
            let getUrl = 'http://200.200.200.50/v1/app/customization/fridge/hetFridge/power?appId='+this.state.appId+'&accessToken='+this.state.accessToken+'&deviceId='+this.state.deviceId+'&timestamp='+new Date().getTime();
            console.log('打印参数 -__________________________ ',getUrl,this.state.deviceId);
            //Actions.getData(getUrl);
            this.state.requestCount=1;
            het.get('/v1/app/customization/fridge/hetFridge/power',{'deviceId':this.state.deviceId}, function(responseText) {
                console.log("成功",responseText);
                let res = JSON.parse(responseText);
                if(res.code==0) {
                    //数组
                    let stateData = res.data;
                    console.log("stateData",stateData);
                    var myDate = new Date();
                    var currentYear = myDate.getFullYear();
                    for (var i = 0; i < stateData.length; i++) {
                        if (stateData[i].checkTime == currentYear) {
                            console.log('用电量告警 ',stateData[i].addRate );
                            if (stateData[i].addRate > 30 && stateData[i].addRate < 50) {
                                //用电量告警
                                console.log('用电量告警 ', stateData[i].addRate);
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标30%', "tel":"400-777-2009"}));
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标30%", "button":"我知道了"}');

                            } else if (stateData[i].addRate > 50 && stateData[i].addRate < 100) {
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标50%', "tel":"400-777-2009"}));
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标50%", "button":"我知道了"}');

                            } else if (stateData[i].addRate > 100 && stateData[i].addRate < 150) {
                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标100%', "tel":"400-777-2009"}))
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标100%", "button":"我知道了"}');
                            }
                            else if (stateData[i].addRate > 150) {
                                //直接报废
                                //het.toast(JSON.stringify({"contactService":'设备故障 能耗超标200%', "tel":"400-777-2009"}))
                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标150% 建议更换整机 ", "button":"我知道了"}');
                            }
                        }
                    }
                }
            }, function(e){
                console.log("失败",e)
            });
        }
//离线&故障
        let online = this.state.online!=undefined?this.state.online:1;//是否在线  1在线  2离线
        //let networkavailable =this.state.networkavailable!=undefined?parseInt(this.state.networkavailable):1;
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let BtnCheckGraph = isIOS ?'Btn-checkGraph ios':'Btn-checkGraph android';
        let indexNum = isIOS ?'indexNum ios':'indexNum android';
        //故障时样式
        let runningOk = (online!=2) ? true:false;

        let items = {};
        items = modeArray;
        let selectMode = this.state.workmode? this.state.workmode:1;

        let boot = this.state.boot||0;
        //冷冻
        let coldT = this.state.coolroomsettemp||0;
        //冷藏
        let powerColdT = this.state.setstoreTemp||0;
        let selectshow = this.state.selectshow?this.state.selectshow:false;
        //累计通电时间
        let totalPowerTime = this.state.TotalPowerTime||0;
        //累计耗电量
        let totalPowerConsumption = this.state.TotalPowerConsumption||0;
        //实时功率
        let powerCurrent = this.state.PowerCurrent||0;

        if(powerColdT>255||coldT>255){
            powerColdT = 255;
            coldT = 255;
            this.state.error = 1;
        }

        let tempMaxArr = [-15,10];
        let tempMinArr = [-24,1];
        let TempSelect_Value = boot==0? coldT:powerColdT;


        let title = '警告';
        let message = this.state.message;

        var errAr = this.state.errorArr;
        if(errAr!=null&&errAr.length>0){
            console.log('收到错误信息',errAr.length,errAr);
            var errorContent=[];
            for(var i = 0; i<errAr.length;i++){
                console.log('收到错误信息',errAr[i]);
                for(var j=0;j<21;j++){
                    if(appData[j].error ==errAr[i]){
                        if(appData[j].value==1){
                            break;
                        }
                        if(this.state.isShowAlert != true){
                            appData[j].value = 1;
                            errorContent.push(appData[j].content);
                        }
                    }
                }

            }
            if(errorContent.length>4){
                errorContent.slice(0,4);
            }
            var vContent='';
            for(var i = 0; i<errorContent.length;i++){
                vContent += (i+1);
                vContent += '.';
                vContent += errorContent[i];
                vContent +='     \n    ';
                console.log('输出的文本',vContent);
            }
            //if(vContent!='') het.toast(JSON.stringify({"contactService":vContent, "tel":"400-777-2009"}));
            if(vContent!=''){
                //this.state.message = vContent;
                this.setState({isShowAlert:true,message:vContent});

            }
        }

        return <div className="app-body">
            <section className="app_bgimghg">
                <div className={'errorDiv'+(runningOk?' off':'')}>设备未连接,请尝试重新连接..</div>
                    <section className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="bgSection swiper-slide flex">
                                <span className="flex-cell">
                                    <i className="bgIndex" onClick={!runningOk||selectMode==3||selectMode==4||selectMode==5||this.state.ChipSelect==true?'':this.openSelectTemp} data-mode={0}>{coldT==255||coldT==-14?'OFF':coldT +' °'} </i>
                                    <h5>冷冻室</h5>
                                </span>
                                <span className="flex-cell">
                                    <i className="bgIndex" onClick={!runningOk||selectMode==2||selectMode==4||selectMode==5||this.state.ChipSelect==true?'':this.openSelectTemp} data-mode={1}>{powerColdT==255||powerColdT==11?'OFF':powerColdT+' °'}</i>
                                    <h5>冷藏室</h5>
                                </span>
                            </div>
                            <div className="swiper-slide flex checkGraph">
                                <span className="flex-cell">
                                    <div className={indexNum}>
                                        <i >{totalPowerTime}</i>
                                        <i style={{fontSize:'2rem'}}>H</i>
                                    </div>
                                    <h5>累计通电时间</h5>
                                </span>
                                <span className="flex-cell">
                                    <div className={indexNum}>
                                        <i >{powerCurrent}</i>
                                        <i style={{fontSize:'2rem'}}>W</i>
                                    </div>
                                    <h5>实时功率</h5>
                                    <div className={BtnCheckGraph} onClick={this.checkGraphClick}>查看实时功率曲线</div>
                                </span>
                                <span className="flex-cell">
                                    <div className={indexNum}>
                                        <i >{totalPowerConsumption}</i>
                                        <i style={{fontSize:'2rem'}}>KWH</i>
                                    </div>
                                    <h5>累计耗电量</h5>
                                </span>
                            </div>
                        </div>
                        <div className="swiper-pagination"></div>
                    </section>

            </section>
            <dl className="flex mode-items">
                <dl className="flex mode-items">
                {items.map(function(o) {
                    return(
                        <dd className={'mode'+ ( o.id == selectMode&&this.state.ChipSelect==false ? ' on':'') }
                            data-mode={o.id}
                            onClick={runningOk&&this.state.ChipSelect==false?this.selectMode:''}
                            style={{'display':o.id==10?'none':'auto','opacity':this.state.ChipSelect?'0.5':'1',
                            'backgroundImage': 'url(../static/img/m-'+o.id+( o.id == selectMode&&this.state.ChipSelect==false ? '-on':'-off')+'.png)'}} key={o.id}>
                            {o.name}
                        </dd>
                    )
                }.bind(this))}
                    <dd className={this.state.ChipSelect?"mode on":'mode'} style ={{'backgroundImage': 'url(../static/img/m-6'+( this.state.ChipSelect? '-on':'-off')+'.png)'}} onClick={runningOk?this.childLock:''}>童锁</dd>
                </dl>
            </dl>
            <TempSelect
                show={selectshow}
                boot={boot}
                cancelClock={this.cancelClock}
                submitClock={this.submitClock} min={tempMinArr[boot]} max={tempMaxArr[boot]} minus={false} value={TempSelect_Value}  />
            {this.state.isShowAlert ?<Alert  title={title} message={message} childSetState={this.childSetState} />:''}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('和而泰冰箱');
    // 无路由方式
    //ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/checkGraph" component={CheckGraph}/>
        </Router>
    ), document.getElementById('ROOT'));
});