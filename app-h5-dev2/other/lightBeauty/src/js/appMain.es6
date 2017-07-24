window.ReactDOM = React;
// app数据
let AppData = {};

// 加载组件
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Toast = require('../../../common/src/lib/Toast.jsx');
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DevScreen} from './DevScreen.es6';
import {Selects} from './Selects.es6';
var SettingButton = require('../../../common/src/lib/SettingButton.jsx');

React.initializeTouchEvents(true); // 开启触摸支持
hetsdk.domReady(function(){
    // 配置sdk
    hetsdk.config({
        // 模板数据与接口数据映射表
        debugMode : "print", // 打印调试数据
        useUpdateFlag : true, // 自动添加updateFlag标记
        webDataMap: {
            "recommendMode" : "mode", // 推荐模式
            "currentRunMode": "currentRunMode", // 当前模式
            "skinDataCode"  : "skinDataCode", // 有无肤质数据
            "skinType"      : "skinType5", // 肤质
            "configMode"    : "configMode", // 是否智能模式
            "moisture"      : "waterTrend", // 水分提升
            "ut"            : "gears1", // 超声波
            "exp"           : "gears2", // 导出
            "imp"           : "gears3", // 导入
            "knead"         : "gears4", // 按摩
            "light"         : "gears5", // 采光
            "time"          : "runTime",  // 时长
            "battery"       : "electricity", // 电量
            "chargeStatus"  : "chargeStatus" // 充电状态
        },
        updateFlagMap : {
            "ut" : 1, // 超声波标记位
            "exp" : 2, // 导出标记位
            "imp" : 3, // 导入标记位
            "knead" : 4, // 按摩标记位
            "light" : 5, // 采光标记位
            "time" : 6 // 运行时间标记位
        }
    });
});
function getCurrentDeviceSn(){
    return window.AppJsBridge.service.deviceService.getCurrentDeviceSn();
}

// 接收app推送数据
hetsdk.repaint((data)=>{
    AppData = Funs._extends(AppData, data);
    Actions.repaint(AppData);
});
// 定义toast函数，以供多次调用
var mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    React.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
class App extends React.Component {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            currentRunMode : 0,
            ut : 0,
            imp : 0,
            exp : 0,
            knead : 0,
            light : 0,
            time : 0,
            skinDataCode : 0,
            busiSwitch : 0
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.baseData={
            modes : {0: "请选择", 1:"清洁", 2:"回春", 3:"滋养", 4:"美白", 5:"自定义"},
            skins : ["综合肤质", "干性肤质", "中性偏干", "中性肤质", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
            lights : {0: "关闭", 1:"黄光", 2:"蓝光", 3:"红光",7:"黄光", 8:"蓝光", 9:"红光"},
            uts : ["关闭", "一档", "二档", "三档", "四档", "五档"]
        };
    }
    componentDidMount(){
        this.tclock = setInterval(function(){
            Actions.intervalData();
        },5000);
        Actions.intervalData();
        mytoast("使用完智能彩光美容仪，建议进行肤质测试，以得到更好的效果...");
    }
    handlerTouchMove(e){
        if (e.target.type!=="range") {
            e.preventDefault(); // 修复touchmove无效的BUG
        }
    }
    handleClick(e){
        if (AppData.busiSwitch || this.state.busiSwitch) { // 自动模式，不允许点击
            e.preventDefault();
        }
    }
    handleSave(){
        clearInterval(this.tclock);
        let _this = this;
        setTimeout(function(){
            _this.tclock = setInterval(function(){
                Actions.intervalData();
            },5000);
        },12000);
        Actions.sync();
    }
    render(){
        let mode = this.state.busiSwitch ? this.state.recommendMode : this.state.currentRunMode; // 取得当前模式
        let cusMode = mode==5 ? true : false; // 自定义模式
        let modeClass = cusMode ? "active" : "";
        let ie = this.state.exp || this.state.imp; // 导出/导入档位
        return (
            <div onClick={this.handleClick.bind(this)}>
                <div className="padding_div">
                    <section>
                        <DevScreen moisture={this.state.moisture} skinDataCode={this.state.skinDataCode}
                            recommendMode={this.baseData.modes[this.state.recommendMode]}
                            skinType={this.baseData.skins[this.state.skinType]}
                            onlineStatus={this.state.onlineStatus}
                            busiSwitch={this.state.busiSwitch} toggleBusiSwitch={Actions.toggleBusi} />
                        <div className="pselect flex">
                            <label>当前模式</label>
                            <a id="test1" href={"#/select/mode/" + mode} className="val flex-cell">{this.baseData.modes[mode]}</a>
                        </div>
                        <div className="select-wrap flex">
                            <div className={modeClass + " qselect flex-cell flex"}>
                                <label>超声波</label>
                                <a href={cusMode ? "#/select/ut/" + this.state.ut : "javascript:"} className="val flex-cell">{this.baseData.uts[this.state.ut]}</a>
                            </div>
                            <div className={modeClass + " qselect flex-cell flex"}>
                                <label>导入/导出</label>
                                <a href={cusMode ? "#/select/ie/" + ie + "/" + (this.state.exp ? "exp" : "imp") : "javascript:"} className="val flex-cell">{(ie ? (this.state.exp ? "导出" : "导入") : "") + this.baseData.uts[ie]}</a>
                            </div>
                        </div>
                        <div className="select-wrap flex">
                            <div className={modeClass + " qselect flex-cell flex"}>
                                <label>按摩</label>
                                <a href={cusMode ? "#/select/knead/" + this.state.knead : "javascript:"} className="val flex-cell">{this.state.knead!=0?"开启":"关闭"}</a>
                            </div>
                            <div className={modeClass + " qselect flex-cell flex"}>
                                <label>彩光</label>
                                <a href={cusMode ? "#/select/light/" + this.state.light : "javascript:"} className="val flex-cell">{this.baseData.lights[this.state.light]}</a>
                            </div>
                        </div>
                        <div className={modeClass + " qselect flex-cell timelen flex"}>
                            <label className="flex-cell time-label">总时长：</label>
                            <a href={cusMode ? "#/select/time/" + this.state.time : "javascript:"} className="val flex-cell">{this.state.time}min</a>
                        </div>
                        {this.state.battery < 5 && this.state.chargeStatus<2 && this.state.onlineStatus==1 ? (<div className="battery">电量不足，请充电</div>) : ""}
                    </section>
                </div>
                <div id="footer">
                    <SettingButton settingStatus={this.state.needSave ? "on" : "off"} callback={this.handleSave.bind(this)} />
                </div>
                <RouteHandler />
                <div id="mytoast"></div>
            </div>
        );
    }
}

// 定义路由
var Routes = (
    <Route path="/" handler={App}>
        <Route path="/select/:component/:initValue" handler={Selects}/>
        <Route path="/select/:component/:initValue/:other" handler={Selects}/>
    </Route>
);



// 准备就绪，开始渲染页面
document.addEventListener('DOMContentLoaded',function(){
    ReactRouter.run(Routes, ReactRouter.HashLocation, function(Root){  
        React.render(<Root />, document.body);
    });
    document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
},false);
// hetsdk.domReady(function(){
//     ReactRouter.run(Routes, ReactRouter.HashLocation, function(Root){  
//         React.render(<Root />, document.body);
//     });
//     document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
// });

