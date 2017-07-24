// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SwiperIndex} from './SwiperIndex.jsx'
import {SwiperHistory} from './SwiperHistory.jsx'
import {TimeSelect} from './TimeSelect.es6'
import {LoadImagModel} from './LoadImagModel.jsx'
import {OuterIAQPage} from './OuterIAQPage.es6'
import {DialogButtonOne} from './DialogButtonOne.jsx';

var {Router, Route, hashHistory} = ReactRouter;

const appData = {}

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});

// 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//       (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 接收app推送数据
het.repaint((data, type) => {
    Actions.repaint(data, type);
    if (appData.deviceId == undefined && !!data.deviceId) {
        appData.deviceId = data.deviceId;
        Actions.getAllData();
        Actions.getLatestData();
    }
    if (appData.cityName == undefined && !!data.cityName) {
        appData.cityName = data.cityName;
        // console.log("==getWeather== repaint AppData.cityName : " + appData.cityName);
        Actions.getWeather();
    }
    if (!!data.airlevel) {
        // let createTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
        Actions.refreshCreateTime(new Date().Format("yyyy-MM-dd hh:mm:ss"));
    }
});

// 创建React组件
class App extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            showTimeSelectView: false,
            loading: 2,
            currentHistoryTab: 0,
            pm25Value: 0,
            pm10Value: 0,
            formaldehydeValue: 0,
            tvocValue: 0,
            co2Value: 0,
            temperature: 0,
            humidity: 0,
        };
        Actions.local();

        this.listenStore(Store); // 监听Store
        this.cancelClock = this.cancelClock.bind(this);
        this.submitClock = this.submitClock.bind(this);
        this.get7Day = this.get7Day.bind(this);
        this.showTimeSelect = this.showTimeSelect.bind(this);
        this.powerDevice = this.powerDevice.bind(this);
        this.toOuterIAQPage = this.toOuterIAQPage.bind(this);
        this.liveError = this.liveError.bind(this);
        this.switchHistoryTab = this.switchHistoryTab.bind(this);
        this.submitDialogButtonOne = this.submitDialogButtonOne.bind(this);
        this.emptyViewClick = this.emptyViewClick.bind(this);
        this.hintOffLineTip = this.hintOffLineTip.bind(this);
        this.dealIOSShadow = this.dealIOSShadow.bind(this);
    }

    componentWillMount() {
        het.setTitle(JSON.stringify({
            setNavTitle: 0,
            title: '德赛空气检测仪',
            setNavRightBtnHiden: 0
        }));
    }

    submitDialogButtonOne(e) {
        Actions.submitDialogButtonOne();
    }

    cancelClock() {
        Actions.cancelSelect();
    }

    submitClock(date) {
        console.log("submitClock-->start");
        Actions.submitSelect(date);
        Actions.getAllData();
    }

    showTimeSelect() {
        console.log("showTimeSelect-->start");
        Actions.showTimeSelect();
    }

    powerDevice() {
        // het.toast("点击了开关机的按钮 powerDevice start 1");
        if (this.liveError()) {
            het.toast(this.liveError());
            return false
        }
        // het.toast("点击了开关机的按钮 powerDevice start 2");
        let power = this.state.powerstatus == undefined || this.state.powerstatus == 2 ? 1 : 2;
        // console.log("==click== powerDevice-->start,,, online : " + (this.state.online) + ", networkavailable : " + (this.state.networkavailable)+",,,power : "+power);
        Actions.powerDevice({
            power:power
        });
    }

    toOuterIAQPage() {
        // if(this.liveError()){het.toast(this.liveError());return false};
        window.location.href = '#/outerIAQPage';
    }

    switchHistoryTab(where) {

        Actions.switchHistoryTab(where);
    }
    emptyViewClick(){
        if (this.state.loadAllDataSuccess != undefined || this.state.loadAllDataSuccess) return;
        Actions.getAllData();
    }

    liveError() {
        if (this.state.online == 2) {
            return '设备与APP已断开连接！'
        }
        if (this.state.networkavailable == 2) {
            return '当前网络不可用！'
        }
        return false;
    }

    get7Day() {
        //设置日期，当前日期的前七天
        let myDate = new Date(); //获取今天日期
        // myDate.setDate(myDate.getDate());
        let dateArray = [];
        let dateTemp;
        let flag = 1;
        for (var i = 0; i < 7; i++) {
            dateTemp = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
            dateArray.push(dateTemp);
            myDate.setDate(myDate.getDate() - flag);
        }
        return dateArray;
    }

    hintOffLineTip(e){
        e.preventDefault();
        Actions.hintOffLineTip();
        e.stopPropagation();//取消冒泡
    }

    dealIOSShadow(e){
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        if (!!(navigator.userAgent.match(/iPad|iPhone|iPod/))){
            e.preventDefault();
            e.stopPropagation();
        }
        console.log("isIOS-->"+isIOS);
    }

    render() {
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            simulateTouch: true,
            loop: false,
            stopPropagation:false,
        });
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));

        let cityName = this.state.cityName;
        let powerstatus = this.state.powerstatus;
        let airlevel = this.state.airlevel || 0;
        let pm25Value = this.state.pm25Value;
        let pm10Value = this.state.pm10Value;
        let formaldehydeValue = this.state.formaldehydeValue;
        let tvocValue = this.state.tvocValue;
        let co2Value = this.state.co2Value;
        let temperature = this.state.temperature;
        let humidity = this.state.humidity;
        let qualityOuter = this.state.qualityOuter;
        let createTime = this.state.createTime;
        let dataList = this.state.dataList;

        let swiperIndexData = {
            cityName: cityName,
            powerstatus: powerstatus,
            airlevel: airlevel,
            pm25Value: pm25Value,
            pm10Value: pm10Value,
            formaldehydeValue: formaldehydeValue,
            tvocValue: tvocValue,
            co2Value: co2Value,
            temperature: temperature,
            humidity: humidity,
            qualityOuter: qualityOuter,
            createTime: createTime,
        };

        if (appData.days == undefined) appData.days = this.get7Day();
        let days = appData.days;
        let controlTimeSelectView = {
            show: this.state.showTimeSelectView,
            days: days
        };

        let currentDate = this.state.currentDate || days[0];
        let currentHistoryTab = this.state.currentHistoryTab;
        let loadAllDataSuccess = this.state.loadAllDataSuccess;

        let swiperHistoryData = {
            currentDate: currentDate,
            currentHistoryTab: currentHistoryTab,
            dataList: dataList,
            loadAllDataSuccess: loadAllDataSuccess,
        };
        let showOffLineTip = this.state.online==2 && !this.state.hasShowOffLineTip;

        // console.log("showOffLineTip->"+showOffLineTip+", online -> "+this.state.online+", hasShowOffLineTip -> "+this.state.hasShowOffLineTip);

        return (<section className="app-body">
            <section className="swiper-container">
                <section className="swiper-wrapper">
                    <section className="swiper-slide" onTouchStart={this.dealIOSShadow}>
                        <SwiperIndex className="index_Swp" powerDevice={this.powerDevice}
                                     toOuterIAQPage={this.toOuterIAQPage}
                                     swiperIndexData={swiperIndexData}/>
                    </section>
                    <section className="swiper-slide">
                        <SwiperHistory className="index_Swp" showTimeSelect={this.showTimeSelect}
                                       swiperHistoryData={swiperHistoryData}
                                       switchHistoryTab={this.switchHistoryTab} emptyViewClick={this.emptyViewClick} dealIOSShadow={this.dealIOSShadow}/>
                    </section>
                </section>
            </section>
            <TimeSelect
                show={controlTimeSelectView.show}
                title={controlTimeSelectView.title}
                statusshow={false}
                hourshow={false}
                minuteshow={true}
                cancelClock={this.cancelClock}
                submitClock={this.submitClock}
                minutearr={controlTimeSelectView.days}
                defaultminute={days[0]}/>

            <LoadImagModel showLoad={this.state.loading}/>

            <DialogButtonOne show={this.state.isShowDialogButtonOne}
                             submitClock={this.submitDialogButtonOne}
                             title={this.state.titleButtonOne}
                             content={this.state.contentButtonOne}
                             button_content="我知道了"/>

            <section className={"offline-tip " +(isIOS?"margin-iOS":"margin-Android")} style={{display:showOffLineTip?"block":"none"}} >
                <p>您的检测仪处于离线状态</p>
                <img src="../static/img/icon_delete.png" alt="" onTouchEnd={this.hintOffLineTip}/>
            </section>
        </section>);
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/outerIAQPage" component={OuterIAQPage}/>
        </Router>
    ), document.getElementById('ROOT'));
});