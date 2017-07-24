// app数据
var AppData = {};

// 加载组件
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import Toast from '../../../common/src/lib/Toast.jsx';
import SettingButton from '../../../common/src/lib/SettingButton.jsx';
import {DevScreen} from './DevScreen-kym.es6';
import {Selects} from './Selects-kym.es6';

var {Router, Route, hashHistory} = ReactRouter;
//let myscroller; // iscroll滚动容器

// 定义toast函数，以供多次调用
let mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};

// 定义事件
window.AppActions = Reflux.createActions([
    'repaint', // 重绘
    'toggleBusi', // 自动/手动模式切换
    'selectAny', // 选择模式
    'sync' // 同步数据
]);

// 智能模式（展会版本使用）
let AppModes = {
    1:{ //清洁
        ut : 3,
        imp : 0,
        exp : 3,
        knead : 1,
        light : 1,
        time : 15,
        configMode : 1
    },
    2:{ // 回春
        ut : 0,
        imp : 3,
        exp : 0,
        knead : 1,
        light : 2,
        time : 10,
        configMode : 2
    },
    3:{ // 滋养
        ut : 0,
        imp : 3,
        exp : 0,
        knead : 1,
        light : 3,
        time : 15,
        configMode : 3
    },
    4:{ // 美白
        ut : 3,
        imp : 0,
        exp : 3,
        knead : 1,
        light : 2,
        time : 13,
        configMode : 4
    },
    5:{ // 自定义
        ut : 0,
        imp : 0,
        exp : 0,
        knead : 0,
        light : 0,
        time : 5,
        configMode : 5
    }
};

// 定义store
const AppStore = Reflux.createStore({
    listenables: [AppActions],
    onRepaint: function(data) {
        if (AppData.busiSwitch) { // 展会版本添加
            AppModes[5].ut = typeof data.ut!=='undefined' ? data.ut : AppModes[5].ut;
            AppModes[5].imp = typeof data.imp!=='undefined' ? data.imp : AppModes[5].imp;
            AppModes[5].exp = typeof data.exp!=='undefined' ? data.exp : AppModes[5].exp;
            AppModes[5].knead = typeof data.knead!=='undefined' ? data.knead : AppModes[5].knead;
            AppModes[5].light = typeof data.light!=='undefined' ? data.light : AppModes[5].light;
            AppModes[5].time = typeof data.time!=='undefined' ? data.time : AppModes[5].time;
            AppModes[5].configMode = typeof data.configMode!=='undefined' ? data.configMode : AppModes[5].configMode;
            data = Funs._extends({}, data, getBusiData(AppData));
        }
        this.trigger(data);
    },
    onToggleBusi: function() {
        if (AppData.skinDataCode==0) {
            het.toast('您还未测试肤质，请先测试肤质！');
            return;
        }
        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
        if (AppData.busiSwitch) { // 自动模式
            AppModes[5].ut = AppData.ut;
            AppModes[5].imp = AppData.imp;
            AppModes[5].exp = AppData.exp;
            AppModes[5].knead = AppData.knead;
            AppModes[5].light = AppData.light;
            AppModes[5].time = AppData.time;
            AppModes[5].configMode = AppData.configMode;
            Funs._extends(AppData, getBusiData(AppData));
        } else { // 切回手动模式
            AppData.ut = AppModes[5].ut;
            AppData.imp = AppModes[5].imp;
            AppData.exp = AppModes[5].exp;
            AppData.knead = AppModes[5].knead;
            AppData.light = AppModes[5].light;
            AppData.time = AppModes[5].time;
            AppData.configMode = AppModes[5].configMode;
        }
        AppData.needSave = getSaveFlag();
        this.trigger(AppData);
    },
    onSelectAny: function(data) {
        // updateFlag映射表
        /*var flagMap = {
            "ut" : 0x01, // 超声波标记位
            "exp" : 0x02, // 导出标记位
            "imp" : 0x04, // 导入标记位
            "knead" : 0x08, // 按摩标记位
            "light" : 0x10, // 采光标记位
            "time" : 0x20 // 运行时间标记位
        };*/
        for (var k in data) {
            // AppData.updateFlag |= flagMap[k]; // 设置标记位
            AppData[k] = data[k]; // 设置修改数据
        }
        AppData.needSave = getSaveFlag();
        // data.updateFlag = AppData.updateFlag;
        this.trigger(data);
    },
    onSync: function() {
        // 同步数据至app
        var sendData = Funs._extends({}, AppData);
        if (AppData.needSave) {
            // if (AppData.light==8) {
            //     sendData.light = 9;
            // }
            // if (AppData.light==9) {
            //     sendData.light = 8;
            // }
            sendData.configMode = AppData.currentRunMode;
            het.send(sendData, function(data){
                het.toast("同步成功！");
            }, function(data){
                het.toast("同步失败！");
            });
            AppData.needSave = false; // 重置标记位
            this.trigger({needSave: false});
            mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
        }
    }
});

// 定义app对象
class App extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
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
        // 基本数据
        this.baseData = {
            modes : {0: "请选择", 1:"清洁", 2:"回春", 3:"滋养", 4:"美白", 5:"自定义"},
            skins : ["综合肤质", "干性肤质", "中性偏干", "中性肤质", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
            lights : {0: "关闭", 1:"黄光", 2:"蓝光", 3:"红光"},
            uts : ["关闭", "一档", "二档", "三档", "四档", "五档"]
        }
        this.listenStore(AppStore);
    }
    // componentDidUpdate(){
    //     try {
    //         myscroller.refresh();
    //     } catch (err) {}
    // }
    componentDidMount(){
        mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
    }
    handlerTouchMove(e){
        // if (e.target.type!=="range") {
        //     e.preventDefault(); // 修复touchmove无效的BUG
        // }
    }
    handleClick(e){
        if (AppData.busiSwitch) { // 自动模式，不允许点击
            e.preventDefault();
        }
    }
    render() {
        var mode = this.state.busiSwitch ? this.state.recommendMode : this.state.currentRunMode; // 取得当前模式
        var cusMode = mode==5 ? true : false; // 自定义模式
        var modeClass = cusMode ? "active" : "";
        var ie = this.state.exp || this.state.imp; // 导出/导入档位
        return (
            <div className="app-body flex-column" onClick={this.handleClick.bind(this)} onTouchMove={this.handlerTouchMove.bind(this)}>
                <div id="panel-scroller" className="flex-cell">
                    <section>
                        <DevScreen moisture={this.state.moisture} skinDataCode={this.state.skinDataCode}
                            recommendMode={this.baseData.modes[this.state.recommendMode]}
                            skinType={this.baseData.skins[this.state.skinType]}
                            onlineStatus={this.state.onlineStatus}
                            busiSwitch={this.state.busiSwitch} toggleBusiSwitch={AppActions.toggleBusi} />
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
                    <SettingButton settingStatus={AppData.needSave ? "on" : "off"} callback={AppActions.sync.bind(this)} />
                </div>
                { this.props.children }
                <div id="mytoast"></div>
            </div>
        );
    }
};

// 定义路由
let Routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App} >
            <Route path="/select/:component/:initValue" component={Selects}/>
            <Route path="/select/:component/:initValue/:other" component={Selects}/>
        </Route>
    </Router>
);

het.domReady(function(){
    // 配置sdk
    het.config({
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

// 准备就绪，开始渲染页面
het.domReady(function(){
    ReactDOM.render(Routes,document.getElementById('ROOT'));

    // 调用iscroll处理页面滚动
    // setTimeout(function(){
    //     myscroller = new IScroll("#panel-scroller", {
    //         vScroll:true,
    //         vScrollbar:false, 
    //         //bounce:false,
    //         onBeforeScrollStart: function(e) {
    //             var target = e.target; 
    //             while (target.nodeType != 1) target = target.parentNode; 
    //             if (target.tagName != "A" && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
    //             e.preventDefault();
    //         }
    //     });
    // },200);
    // document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
});

// 接收到repaint请求后将自动执行此操作
het.repaint(function(data){
    // alert(JSON.stringify(data));
    // console.log(data);
    if (AppData.needSave) return; // 未同步前忽略新接收到的数据
    Funs._extends(AppData, data);
    // if (data.busiSwitch) { // 自动模式
    //     Fun._extends(AppData, getBusiData(data));
    // }
    AppActions.repaint(AppData);
});

/**
 * 获取自动模式数据
 * ! 该方法为展会版本专用
 * @param    {json}   data 原始数据
 * @return   {json}        提取到的自动模式数据
 */
function getBusiData(data){
    // var tmp = data.importExportConfig;
    // var busiData = {};
    // for (var i in AppModes) {
    //     if (AppModes[i].id==AppData.recommendMode) {
    //         busiData = AppModes[i].data;
    //         break;
    //     }
    // }
    // if (tmp) {
    //     busiData["ut"] = tmp["gears1"], // 超声波
    //     busiData["exp"] = tmp["gears2"]; // 导出
    //     busiData["imp"] = tmp["gears3"]; // 导入
    //     busiData["knead"] = tmp["gears4"]; // 按摩
    //     busiData["light"] = tmp["gears5"]; // 采光
    //     busiData["time"] = tmp["runTime"];  // 时长
    // }
    // return busiData;
    return AppModes[AppData.recommendMode];
}

/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag() {
    // return !!Object.keys(het.diff(AppData)).length;
    var count = 0;
    var data = het.diff(AppData);
    for (var k in data) {
        if (k==='updateFlag' || typeof data[k]==='undefined') continue;
        count ++;
    }
    return !!count;
}