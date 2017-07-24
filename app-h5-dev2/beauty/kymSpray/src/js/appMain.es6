// app数据
let AppData = {};
  
// 加载组件
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import Toast from '../../../common/src/lib/Toast.jsx';
import SettingButton from '../../../common/src/lib/SettingButton.jsx';
import {DevScreen} from './appDevScreen.es6';
// import {Fun} from '../../../common/src/fun.es6';
// var {Router, Route, hashHistory} = ReactRouter;

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
    'sync' // 同步数据
]);

// 定义store
const AppStore = Reflux.createStore({
    listenables: [AppActions],
    onRepaint: function(data) {
        this.trigger(data);
    },
    onSync: function() {
        // 同步数据至app
        if (AppData.updateFlag > 0) {
            het.send(AppData, function(data){
                // console.log(data)
				het.toast("同步成功！")
            }, function(data) {
				het.toast("同步失败! ");
			});
            AppData.updateFlag = 0; // 重置标记位
            this.trigger({updateFlag: 0});
            mytoast("使用完康茵美便携喷雾仪，建议进行肤质测试，以得到更好的效果...");
        }
    }
});


class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            modelPop : false,
            chargeStatus : 1,       // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
            electricity : 19,       // 电量
            currentRunMode : 1,     // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
            currentRunTime : 100,   // 当前运行时间
            onlineStatus : 2,       // 在线状态（1-正常, 2-异常）
            skinDataCode : 0,       // 有无肤质数据(0-无, 1-有)
            busiSwitch : 0,         // 业务开关（0：关 1：开） 0-手动 1-自动
            sprayGrade : 1,         // 喷雾大小 3：低 2：中 1：开
            runTime : 11            // 自动模式下的运行时间
        };
        // 基本数据
        this.baseData = {
            modes : ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
            skins : ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
            times : [0, 100, 40, 80, 50, 40],
            gears : ['',1,3,1,2]
        };
        this.listenStore(AppStore); // 监听Store 
    } 
    componentDidMount() {
        mytoast("为使康茵美便携喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...");
        
    }
    handlerTouchMove(e) {
        // if (e.target.type!=="range") {
        //     e.preventDefault(); // 修复touchmove无效的BUG
        // }
    }
    handlerTounch(e) {   // 切换智能推荐模式
        var skinDataCode = this.state.skinDataCode;
        var oldmode = this.state.currentRunMode;
        var oldRunTime = this.state.currentRunTime;
        var oldSprayGear = this.state.currentSprayGrade;
        if(!+skinDataCode) {
            het.toast("您还未测试肤质，请先测试肤质！");
            return;
        }

        var target = e.target;
        var value = target.getAttribute("data-busi");
        var mode = (value == 1 && this.state.oldCurrentRunMode) ? this.state.oldCurrentRunMode : this.state.mode;// 推荐模式或上次模式
        var runTime = (value == 1 && this.state.oldRunTime) ? this.state.oldRunTime : this.state.runTime;
        if(mode==5){
            var sprayGear = (value == 1 && this.state.oldSprayGear) ? this.state.oldSprayGear : this.state.sprayGrade;
        }else{
            var sprayGear =  value == 1 ? this.baseData.gears[mode] : this.state.sprayGrade;
        }
        var busiSwitch = +value>0?0:1;
        // console.log('busiSwitch',busiSwitch);
        var changeStatus = getSaveFlag({busiSwitch : busiSwitch});
        if(changeStatus) {
            // 更改发送App数据
            AppData.updateFlag |= 0x100;
        } else {
            AppData.updateFlag &= 0x011;
        }

        this.setState({
            busiSwitch : busiSwitch,
            currentRunTime : runTime,
            currentRunMode : mode,
            currentSprayGrade : sprayGear,
            oldCurrentRunMode : oldmode,
            oldRunTime : oldRunTime,
            oldSprayGear : oldSprayGear,
            updateFlag : AppData.updateFlag
        });
    }
    chooseModel(e) {     // 模式选择
        // 自动模式下不做操作
        var busiSwitch = this.state.busiSwitch;
        if(+busiSwitch === 1) {
            e.preventDefault();
            return;
        }

        this.setState({modelPop : true});
    }
    closePop() {         // 关闭弹窗
        if(this.state.modelPop){
            this.setState({modelPop : false});
        }
    }
    changeMode(e) {       // 改变模式
        var target = e.currentTarget;
        var currentRunMode = target.getAttribute("data-mode");
        var currentRunTime = this.baseData.times[currentRunMode];
        var currentSprayGrade = currentRunMode != 5 ? this.baseData.gears[currentRunMode] :this.state.currentSprayGrade;
        var changeStatus = getSaveFlag({currentRunMode : +currentRunMode, currentRunTime : currentRunTime,sprayGrade:currentSprayGrade});
        if(changeStatus) {
            // 更改发送App数据
            AppData.updateFlag |= 0x011;
        } else {
            AppData.updateFlag &= 0x100;
        }
        this.setState({currentRunMode : +currentRunMode, currentRunTime : currentRunTime,currentSprayGrade:currentSprayGrade, updateFlag : AppData.updateFlag});
    }
    changeGear(e) {      // 改变档位
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        var currentRunMode = this.state.currentRunMode;
        var busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }

        var flag = +e.currentTarget.getAttribute("data-flag");
        var seed = Boolean(flag) ? +1 : -1;
        var currentSprayGrade = this.state.currentSprayGrade ? parseInt(this.state.currentSprayGrade) + seed : 1 + seed;
        if(currentSprayGrade > 3) {
            currentSprayGrade = 3;
        } else if(currentSprayGrade < 1) {
            currentSprayGrade = 1;
        }
        // 判断标识是否改变
        var changeStatus = getSaveFlag({currentSprayGrade : currentSprayGrade});
        if(changeStatus) {
            // 更改发送App数据
            var gearFlag = 0x010;    // 运行时间标识
            AppData.updateFlag |= gearFlag;
        } else {
            AppData.updateFlag &= 0x101;
        }
        this.setState({currentSprayGrade : currentSprayGrade, updateFlag : AppData.updateFlag});
    }
    autoChangeTime(flag){
        //自动更改时间函数 用于定时器调用触发
        var currentRunMode = this.state.currentRunMode;
        var busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        var seed = Boolean(flag) ? +10 : -10;
        var currentRunTime = parseInt(this.state.currentRunTime) + seed;
        if(currentRunTime > 120) {
            currentRunTime = 120;
        } else if(currentRunTime < 10) {
            currentRunTime = 10;
        }
        // 判断标识是否改变
        var changeStatus = getSaveFlag({currentRunMode : currentRunMode, currentRunTime : currentRunTime});
        if(changeStatus) {
            // 更改发送App数据
            var timeFlag = 0x001;    // 运行时间标识
            AppData.updateFlag |= timeFlag;
        } else {
            AppData.updateFlag &= 0x110;
        }

        this.baseData.times[currentRunMode] = currentRunTime;
        this.setState({currentRunTime : currentRunTime, updateFlag : AppData.updateFlag});
    }
    startChangeTime(e){
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        var currentRunMode = this.state.currentRunMode;
        var busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        var flag = +e.currentTarget.getAttribute("data-flag");
        var _this = this;
        this.retime = setTimeout(function(){
            _this.tclock = setInterval(function(){_this.autoChangeTime(flag)},500);
        }, 2000);
    }
    changeTime(e) {
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        var currentRunMode = this.state.currentRunMode;
        var busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        clearTimeout(this.retime);
        clearInterval(this.tclock);
        var flag = +e.currentTarget.getAttribute("data-flag");
        var seed = Boolean(flag) ? +10 : -10;
        var currentRunTime = parseInt(this.state.currentRunTime) + seed;
        if(currentRunTime > 120) {
            currentRunTime = 120;
        } else if(currentRunTime < 10) {
            currentRunTime = 10;
        }

        // 判断标识是否改变
        var changeStatus = getSaveFlag({currentRunMode : currentRunMode, currentRunTime : currentRunTime});
        if(changeStatus) {
            // 更改发送App数据
            var timeFlag = 0x001;    // 运行时间标识
            AppData.updateFlag |= timeFlag;
        } else {
            AppData.updateFlag &= 0x110;
        }

        this.baseData.times[currentRunMode] = currentRunTime;
        this.setState({currentRunTime : currentRunTime, updateFlag : AppData.updateFlag});
    }
    syncData() {
        var configMode = this.state.currentRunMode;
        var runTime = this.state.currentRunTime;
        var busiSwitch = this.state.busiSwitch;
        var sprayGrade = this.state.currentSprayGrade;

        // 更改发送App数据
        AppData.currentRunMode = configMode;
        AppData.currentRunTime = runTime;
        AppData.configMode = configMode;
        AppData.runTime = runTime;
        AppData.busiSwitch = busiSwitch;
        AppData.sprayGrade = sprayGrade;
        AppData.configType = 'commonConfig';

        AppActions.sync();
    }
    render() {
        var modelPop = this.state.modelPop;
        var busiSwitch = this.state.busiSwitch;
        var currentRunMode = this.state.currentRunMode;
        var mode = +busiSwitch ?  this.state.mode : this.state.currentRunMode;
        var currentRunTime = this.state.currentRunTime;
        var sprayGrade = +busiSwitch ? this.state.sprayGrade : this.state.currentSprayGrade;
        var runTime = this.state.runTime;
        // 智能推荐按钮样式
        var smartStyle = +busiSwitch ? {display : ''} : {display : 'none'};
        var nonSmartStyle = +busiSwitch ? {display : 'none'} : {display : ''};
        var chooseModelStyle = +busiSwitch ? {color : '#d1d1d1'} : {color : '#777'};
        var chooseModelClass = +busiSwitch ? 'off' : 'on';
        // 弹窗控制样式
        var popStyle = modelPop ? {display : 'block'} : {display : 'none'};
        var modelPopStyle = modelPop ? {bottom : 0} : {bottom : '-23.76rem'};
        // 时间加减样式 && 档位加减样式
        var leftTimeStyle, rightTimeStyle, leftGearStyle, rightGearStyle;
        if(!(currentRunMode == 5 && +busiSwitch == 0)) {
            leftTimeStyle = rightTimeStyle = {"opacity" : 0.5};
            leftGearStyle = rightGearStyle = {"opacity" : 0.5};
        } else {
            leftTimeStyle = (currentRunTime <= 10) ? {'opacity' : 0.5} : {'opacity' : 1};
            rightTimeStyle = (currentRunTime >= 120) ? {'opacity' : 0.5} : {'opacity' : 1};
            leftGearStyle = (sprayGrade <= 1) ? {'opacity' : 0.5} : {'opacity' : 1};
            rightGearStyle = (sprayGrade >= 3) ? {'opacity' : 0.5} : {'opacity' : 1};
        }
        var gearBgStyle;    // 档位背景
        switch (sprayGrade) {
            case 1:
                gearBgStyle = {"backgroundImage" : 'url(../static/img/ico-gears1.png)'};
                break;
            case 2:
                gearBgStyle = {"backgroundImage" : 'url(../static/img/ico-gears2.png)'};
                break;
            case 3:
                gearBgStyle = {"backgroundImage" : 'url(../static/img/ico-gears3.png)'};
                break;
            default:
                gearBgStyle = {"backgroundImage" : 'url(../static/img/ico-gears1.png)'};
                break;
        }

        return (
            <div>
                <div >
                    <section className="screen-ctn">
                        <DevScreen {...this.state} />
                        <div className="smart-rec clearfix">
                            <span>智能推荐</span>
                            <img src="../static/img/ico-left-switch.png" style={nonSmartStyle} data-busi="0" onTouchEnd={this.handlerTounch.bind(this)}/>
                            <img src="../static/img/ico-right-switch.png" style={smartStyle} data-busi="1" onTouchEnd={this.handlerTounch.bind(this)}/>
                        </div>
                        <div className="model-info">
                            <div className="model-name"><span>{this.baseData.modes[mode]}</span></div>
                            <div className="model-choose"><span className={chooseModelClass} style={chooseModelStyle}>模式选择</span></div>
                            <div onTouchEnd={this.chooseModel.bind(this)} className='chooseModel'></div>
                        </div>
                        <div className="gear-time flex">
                            <div className="model-gear flex-cell">
                                <div className="model-title">档位</div>
                                <div className="model-icon">
                                    <div className="ico-gear" style={gearBgStyle}></div>
                                </div>
                                <div className="model-opt flex">
                                    <div className="ico-add flex-cell" data-flag="1" onTouchEnd={this.changeGear.bind(this)}>
                                        <img src="../static/img/ico-minus.png" style={rightGearStyle} />
                                    </div>
                                    <div className="ico-minus flex-cell" data-flag="0" onTouchEnd={this.changeGear.bind(this)}>
                                        <img src="../static/img/ico-add.png" style={leftGearStyle} />
                                    </div>
                                </div>
                            </div>
                            <div className="model-time flex-cell">
                                <div className="model-title">时长</div>
                                <div className="model-icon">
                                    <div className="ico-time">{+busiSwitch==0 ? currentRunTime : runTime}s</div>
                                </div>
                                <div className="model-opt flex">
                                    <div className="ico-add flex-cell" data-flag="0" onTouchStart={this.startChangeTime.bind(this)} onTouchEnd={this.changeTime.bind(this)}>
                                        <img src="../static/img/ico-minus.png" style={leftTimeStyle} />
                                    </div>
                                    <div className="ico-minus flex-cell" data-flag="1" onTouchStart={this.startChangeTime.bind(this)} onTouchEnd={this.changeTime.bind(this)}>
                                        <img src="../static/img/ico-add.png" style={rightTimeStyle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div id="panel-pop" style={popStyle}>
                    <div className="model-mask" onTouchEnd={this.closePop.bind(this)}></div>
                    <div className="model-pop flex-column" style={modelPopStyle}>
                        <div className="flex-cell" data-mode="1" onTouchEnd={this.changeMode.bind(this)}>
                            <span>补水模式</span><span>适合干性肤质</span><i style={+currentRunMode===1?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="2" onTouchEnd={this.changeMode.bind(this)}>
                            <span>舒缓模式</span><span>适合中性肤质</span><i style={+currentRunMode===2?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="3" onTouchEnd={this.changeMode.bind(this)}>
                            <span>清爽模式</span><span>适合油性肤质</span><i style={+currentRunMode===3?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="4" onTouchEnd={this.changeMode.bind(this)}>
                            <span>滋养模式</span><span>适合混合性肤质</span><i style={+currentRunMode===4?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="5" onTouchEnd={this.changeMode.bind(this)}>
                            <span>自定义</span><i style={+currentRunMode===5?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell pop-btn" onTouchEnd={this.closePop.bind(this)}><em>确定</em></div>
                    </div>
                </div>
                <div id="footer">
                    <SettingButton settingStatus={this.state.updateFlag ? "on" : "off"} callback={this.syncData.bind(this)} />
                    {/*<a href="javascript:" className={"sync-btn " + (this.state.updateFlag ? "on" : "")} onTouchEnd={this.syncData}>保存设置</a>
                */}
                </div>
                <div id="mytoast"></div>
            </div>
        );
    }
};

het.domReady(function(){
    // 配置sdk
    het.config({
    	renderConfigData : false,
        debugMode : "print"
    });
});

// 准备就绪，开始渲染页面
het.domReady(function(){
    ReactDOM.render(<App />, document.getElementById('ROOT'));
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={App} />
    //     </Router>
    // ), document.getElementById('ROOT'));
    // 调用iscroll处理页面滚动
    /*setTimeout(function(){
        myscroller = new IScroll("panel-scroller", {
            vScroll:true,
            vScrollbar:false,
            onBeforeScrollStart: function(e) {
                var target = e.target;
                while (target.nodeType != 1) target = target.parentNode;
                if (target.tagName != "A" && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
            }
        });
    },200);*/
    // document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
});

// 接收到repaint请求后将自动执行此操作
het.repaint(function(data){
    // alert(JSON.stringify(data));
    // console.log('data',data);
    if (AppData.updateFlag) return; // 未同步前忽略新接收到的数据
    AppData = data;
    AppActions.repaint(AppData);
});

/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag(changeObj) {
    var count = 0;

    for (var k in changeObj) {
        if (changeObj[k] !== AppData[k]) count++;
    }

    return !!count;
}
