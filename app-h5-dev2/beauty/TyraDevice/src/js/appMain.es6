// app数据
var AppData = {};

// 加载组件
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Toast = require('../../../common/src/lib/Toast.jsx');
import {Funs} from '../../../common/src/fun.es6';
var TyraTopScreen = require('./TyraTopScreen.es6');
var DeviceConfig = require('./DeviceConfig.es6');
var SettingButton = require('../../../common/src/lib/SettingButton.jsx');

React.initializeTouchEvents(true); // 开户触摸支持
var myscroller; // iscroll滚动容器

// 定义toast函数，以供多次调用
var mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    React.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};

// 定义事件
window.AppActions = Reflux.createActions([
    'repaint', // 重绘
    'toggleBusi', // 自动/手动模式切换
    'select',//选择
    'sync' // 同步数据
]);

var AppTempValue = {
    tempMode1 : 0,
    tempGear1 : 0,
    tempMode2 : 0,
    tempGear2 : 0,
    tempBusi : 0,
    tempType : 0
};

// 定义store
var AppStore = Reflux.createStore({
    listenables: [AppActions],
    onRepaint: function(data) {
        this.trigger(data);
    },
    onToggleBusi: function() {
        if(AppData.busiSwitch != 1 && AppData.type <= 1){
            het.toast("您还未测试肤质，请先测试肤质！");
            return;
        }
        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
        AppData.updateFlag = 3;
        if (AppData.busiSwitch) { // 自动模式
            AppTempValue.tempMode1 = AppData.mode;
            AppTempValue.tempGear1 = AppData.gear;
            AppData.mode = AppData.recommendMode;
            AppData.gear = AppData.recommendGear;
        } else { // 切回手动模式
            AppData.mode = AppTempValue.tempMode1;
            AppData.gear = AppTempValue.tempGear1;
        }
        if(AppData.mode != AppData.currentMode || AppData.gear != AppData.currentGear || AppData.busiSwitch != AppTempValue.tempBusi){
            AppData.needSave = true;
        } else{
            AppData.needSave = false;
        }
        this.trigger(AppData);
    },
    onSelect: function(data) {
        // updateFlag映射表
        var flagMap = {
            "gear" : 0x01, // 档位
            "mode" : 0x02 // 模式
        };
        for (var k in data) {
            AppData.updateFlag |= flagMap[k]; // 设置标记位
            AppData[k] = data[k]; // 设置修改数据
        }
        if(AppData.mode != AppData.currentMode || AppData.gear != AppData.currentGear){
            AppData.needSave = true;
        } else{
            AppData.needSave = false;
        }
        data.updateFlag = AppData.updateFlag;
        this.trigger(data);
    },
    onSync: function() {
        if (AppData.needSave) {
            // 同步数据至app
            AppTempValue.tempMode2 = AppData.recommendMode;
            AppTempValue.tempGear2 = AppData.recommendGear;
            AppData.recommendMode = AppData.mode;
            AppData.recommendGear = AppData.gear;            
            $this = this;
            het.send(AppData, function(data){
                AppData.currentMode = AppData.mode;
                AppData.currentGear = AppData.gear;
                AppTempValue.tempBusi = AppData.busiSwitch;
                het.toast("同步成功！");           
                $this.trigger({needSave: false, updateFlag: 0, currentMode: AppData.mode, currentGear: AppData.gear, tempBusi: AppData.busiSwitch});
                mytoast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
            }, function(data){
                het.toast("同步失败！");
            });
            AppData.recommendMode = AppTempValue.tempMode2;
            AppData.recommendGear = AppTempValue.tempGear2; 
            AppData.updateFlag = 0;
            AppData.needSave = false;// 重置
            this.trigger({updateFlag: 0,needSave: false});
            
        }
    }
});

// 定义app对象
var App = React.createClass({
    mixins: [Reflux.connect(AppStore)],
    getInitialState: function(){
        return {
            type:0,
            offline:0,
            mode:0,
            gear:0,
            recommendMode:0,
            recommendGear:0,
            currentMode:0,
            currentGear:0,
            battery:5,
            needSave:false,
            busiSwitch:0
        };
    },
    componentDidUpdate: function(){
        try {
            myscroller.refresh();
        } catch (err) {}
    },
    componentDidMount: function(){
        mytoast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
    },
    render: function() {
       let tempType = this.state.type;
        return (
            <div >
                <div >
                    <div>
                        <TyraTopScreen offline={this.state.offline} busiSwitch={this.state.busiSwitch} toggleBusiSwitch={AppActions.toggleBusi}/>
                        <DeviceConfig busiSwitch={this.state.busiSwitch} type={this.state.type} offline={this.state.offline} result={this.state.result} mode={this.state.mode-1} gear={this.state.gear-1} battery={this.state.battery} />
                    </div>
                </div>
                <div onClick={AppData.needSave ? AppActions.sync : ""} id="footer">
                    <SettingButton settingStatus={AppData.needSave ? "on" : "off"} callback={AppActions.sync} />
                    {/*<a href="javascript:" className={"sync-btn " + (AppData.needSave ? "on " : "")}>保存设置</a>*/}
                </div>
                <div id="mytoast"></div>
            </div>
        );
    }
});

// 配置sdk
het.config({
    debugMode : "print", // 打印调试数据
    useUpdateFlag : true, // 自动添加updateFlag标记
    // 模板数据与接口数据映射表
    webDataMap: {
        "type"          : "type", //当前类型
        "recommendMode" : "mode", // 推荐模式
        "recommendGear" : "gears", //推荐档位
        "currentMode"   : "currentMode", //当前模式
        "currentGear"   : "currentGears", //当前档位
        "busiSwitch"    : "busiSwitch", //自动手动切换
        "offline"       : "onlineStatus", //当前设备状态
        "battery"       : "electricity", //当前设备电量
        "result"        : "des"//描述当前结果
    }
});

// 准备就绪，开始渲染页面
het.domReady(function(){
    React.render(<App />, document.body);
    // 调用iscroll处理页面滚动
    /*setTimeout(function(){
        myscroller = new IScroll("panel-scroller", {
            vScroll:true,
            vScrollbar:false, 
            onBeforeScrollStart: function(e) {
                var target = e.target; 
                while (target.nodeType != 1) target = target.parentNode; 
                if (target.className.indexOf("tap") == -1 && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
                e.preventDefault();
            }
        });
    },200);*/
    document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
});

// 接收到repaint请求后执行此操作
het.repaint(function(data){
    if (AppData.needSave) return; // 未同步前忽略新接收到的数据
    AppData = Funs._extends({}, AppData, data);
    AppTempValue.tempMode1 = AppData.currentMode;
    AppTempValue.tempGear1 = AppData.currentGear;
    AppTempValue.tempBusi = AppData.busiSwitch;
    if (!AppData.busiSwitch) { // 手动模式
        AppData.mode = AppData.currentMode;
        AppData.gear = AppData.currentGear;
    } else{
        AppData.mode = AppData.recommendMode;
        AppData.gear = AppData.recommendGear;
    }
    AppActions.repaint(AppData);
});
