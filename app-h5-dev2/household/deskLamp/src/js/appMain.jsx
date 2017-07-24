// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.es6';
import {Modes} from  './Modes.jsx';
import Range from './../../../common/src/lib/range.jsx';
import {TopAlert} from './TopAlert.jsx';
import {YYScale} from './YYScale.jsx';
import {Loading} from './Loading.jsx';

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


// 关机的时候需要的
const clearlightStatus = () => {
    this.setState({
        lightIndex: 0,
        sitStatus: true,
        alertShow: false,
        loadingShow:true,
    });
};

var hasShowSitingDectAlert = false;
var alertContent = "";

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            Humidity: 20,
            temperature: 25,
            sittingstatus: true,    // 坐姿
            switchStatue: false, //开关
            lightValue: 8,      //亮度
            lightIndex: 0,      // 模式
            sittingdetection: false,
            loadingShow: true
        };

        Store.listen((data)=>{
             if(!this.isMounted(this)) return;
            this.setState(data);
        }); // 监听Store
        this.modeButtonAction = this.modeButtonAction.bind(this);
        this.switchAction = this.switchAction.bind(this);

        hasShowSitingDectAlert = false;

    }



    isMounted(component){
        try {
            ReactDOM.findDOMNode(component);
            return true;
        }catch (e){
            return false;
        }
    }



    // componentDidMount() {
    //
    //     let url = "/v1/web/env/weather/clife/now";
    //     let data = {"city":"ip"};
    //     let sucCallback = function(data){
    //         console.log("success data:", data);
    //         let code = data.code;
    //         if(code == 0){
    //             let weatherData = data.data;
    //             let temp = weatherData["temp"];
    //             this.setState({
    //                 temperature:temp,
    //             });
    //         }
    //     }
    //     let errCallback = function(data){
    //         console.log("error data:", data);
    //     }
    //     let needSign = false;
    //
    //     het.get(url, data, sucCallback, errCallback, needSign);
    //
    //     console.log("i have call weather");
    // }

    //关闭坐姿不正确
    closeAlertAction(){
        console.log("close action");

        this.setState({
           alertShow: false,
            site: false
        });
        Actions.closeAlert();
    }
    //滑动条
    feedback(value){
        let val = Math.round(value / 10);
        this.setState(
            {lightValue: val}
        );
    }
    //滑动条滑动完毕
    rangTouchEnd(){
        let value = this.state.lightValue;
        console.log("touch end " + value);
        Actions.lightValueAction(value);
    }

    // 模式切换
    modeButtonAction(index){
        console.log('modeButtonAction' + index);
        Actions.modeAction(index);

    }

    // 开关
    switchAction(){
        //console.log("loglogloogggggggg");
        Actions.closeLightAction();
    }

    // 坐姿jiance
    siteCheckAction(){
        Actions.siteCheckAction();
    }

    render() {

        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        let navClassName =  isAndroid?"android":"ios";

        let temp = this.state.temperature + "°C";
        let humidy  =  this.state.Humidity + "%";

        let switchStatus = this.state.switchStatue || false;
        let switchImaPath = switchStatus? "../static/img/pic_switch_on.png" :"../static/img/pic_switch_off.png";
        let switchClass = switchStatus? " on" :" off";
        let switchTitle =  switchStatus? "关机" : "开机";

            //button index  1 2 3
        let lightIndex = parseInt(this.state.lightIndex);

        // 坐姿检测 是否开启
        let siteStatusDec = this.state.sittingdetection || false;
        // 是否有标准坐姿
        let standSittingPosture = (this.state.standardsittingstatus != undefined) ? this.state.standardsittingstatus : true ;


        let showAlert  = this.state.alertShow || false;


        if(!switchStatus){
            lightIndex = 0;
            siteStatusDec = false;
            standSittingPosture = true;
            showAlert = false;
        }

        // 坐姿状态
        let siteStatus = siteStatusDec ? this.state.sittingstatus : true ;
        // 坐姿检测
        let siteCheck  = siteStatusDec ? "../static/img/pic_site_check_on.png" : "../static/img/pic_site_check_off.png"
        let siteCheckClass =  siteStatusDec? " on" : " off";

        // 坐姿检测下，没有录入标准坐姿，开启提示
        // 接受到坐姿报警
        let siteAlert = (this.state.site != undefined ) ? this.state.site : false;
        // 接受到光太强报警
        let lightAlert =  (this.state.light != undefined ) ? this.state.light : false;
        // 接受到超声波太强报警
        let UltrasonicAlert =  (this.state.Ultrasonic != undefined ) ? this.state.Ultrasonic : false;


        //console.log("siteStatusDec: " + siteStatusDec + " standSittingDec: " + standSittingPosture + " siteStatus: " + siteStatus + " siteAlert: " + siteAlert) ;


        if(!(siteStatusDec && standSittingPosture)){
            siteStatus = true;
        }


        if(siteStatusDec && !standSittingPosture && !hasShowSitingDectAlert){
            let alertContentStr = {
                title:"",
                content:"请录入标准坐姿",
                button:"我知道了"
            }
            het.toast(JSON.stringify(alertContentStr));
            hasShowSitingDectAlert = true;
        }

        if(siteStatusDec && standSittingPosture && (!siteStatus || siteAlert )){

            console.log("请注意保持正确的坐姿");
            alertContent = "请注意保持正确的坐姿";
            showAlert = true;
        }

        if(switchStatus && UltrasonicAlert){
            alertContent = "超声波测距模块告警";
            showAlert = true;
        }

        if(switchStatus && lightAlert){
            console.log("亮度传感器告警");
            alertContent = "亮度传感器告警";
            showAlert = true;
        }

        let showLoading = this.state.loadingShow;
        console.log("坐姿检测: " + siteStatusDec + " 标准坐姿: " + standSittingPosture + " 坐姿状态: " + siteStatus + " 告警显示: " + showAlert  + 'showLoading:' + showLoading ) ;

        return (<div  className="mainView">
                <nav className={navClassName}></nav>
                {/*<div className="devepView">*/}
                    {/*<span>mode: {this.state.lightIndex} </span>*/}
                    {/*<span>开关: {} </span>*/}
                {/*</div>*/}
                <section className="status-area">
                    <TopAlert show={showAlert} closeAction={this.closeAlertAction.bind(this)} alertContent={alertContent} />
                    <div className="status-img" style={{background:'url(../static/img/pic_site'+ ( siteStatus == true ? '_right':'_error')+'.png) no-repeat center center' }}>

                    </div>
                    {/*<div className="status-weather">*/}
                        {/*/!*<p>湿度：{humidy} 温度：{temp}</p>*!/*/}
                    {/*</div>*/}
                    <div className={siteStatus == true ? "status right":"status error"}>
                        <p>{siteStatus == true ? "坐姿正常":"坐姿不正常"}</p>
                    </div>
                    <dl className="switch" onTouchStart={this.switchAction}>
                        <dd><img src={switchImaPath}/></dd>
                        <dt className={switchClass}>{switchTitle}</dt>
                    </dl>
                    <dl className="siteCheck" onTouchStart={this.siteCheckAction}>
                        <dd><img src={siteCheck}/></dd>
                        <dt className={siteCheckClass}>坐姿检测</dt>
                    </dl>
                </section>
                <section className="control-area">
                    <Modes touchAction={this.modeButtonAction } lightIndex={lightIndex} />
                    <div className="flex slide-controller" >
                        <div className="slide_img image_setting_one"><img src="../static/img/Brightness-Icon---Min.png" height="18" width="18" /></div>
                        <div className="t-range flex-cell"  onTouchEnd={this.rangTouchEnd.bind(this)}>
                            <YYScale min="0" max="90" value={this.state.lightValue*10} fnFeedback={this.feedback.bind(this)} />

                        </div>
                        <div className="slide_img image_setting_two"><img src="../static/img/Brightness-Icon---Max.png" height="24" width="24"/></div>
                    </div>
                </section>
                {/*<div className="YYScale">*/}
                    {/*/!*<YYScale min="0" max="90" value={this.state.lightValue*10} fnFeedback={this.feedback.bind(this)} />*!/*/}
                {/*</div>*/}
                <Loading show={this.state.loadingShow} info={''} />
        </div>);
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});