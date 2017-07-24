// app数据
let AppData = {};

// 加载组件
let Toast = require('../../../common/src/lib/Toast.jsx');
let SettingButton = require('../../../common/src/lib/SettingButton.jsx');
let DevScreen = require('./appDevScreen.es6');
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
// import {DevScreen} from './DevScreen.es6';

React.initializeTouchEvents(true); // 开启触摸支持
let myscroller; // iscroll滚动容器

// 定义toast函数，以供多次调用
let mytoast = function(msg) {
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
            modelPop : false,
            chargeStatus : 1,       // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
            electricity : 19,       // 电量
            currentRunMode : 1,     // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
            currentRunTime : 100,   // 当前运行时间
            onlineStatus : 1,       // 在线状态（1-正常, 2-异常）
            skinDataCode : 0,       // 有无肤质数据(0-无, 1-有)
            busiSwitch : 0,         // 业务开关（0：关 1：开） 0-手动 1-自动
            sprayGrade : 1,         // 喷雾大小 3：低 2：中 1：开
            runTime : 11            // 自动模式下的运行时间
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this. baseData = {
            modes : ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
            skins : ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
            times : [0, 100, 40, 80, 50, 40],
            gears : ['',1,3,1,2]
        };
    }
    componentDidUpdate(){
        try {
            myscroller.refresh();
        } catch (err) {}
    }
    componentDidMount(){
        this.lxClock = setInterval(function(){
            Actions.intervalData();
        },5000);
        Actions.intervalData();
        mytoast("为使智能补水喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...");
    }
    handlerTouchMove(e){
        if (e.target.type!=="range") {
            e.preventDefault(); // 修复touchmove无效的BUG
        }
    }
    handlerTounch(e){   // 切换智能推荐模式
        let skinDataCode = this.state.skinDataCode;
        let oldmode = this.state.currentRunMode;
        let oldRunTime = this.state.currentRunTime;
        let oldSprayGear = this.state.currentSprayGrade;
        if(!+skinDataCode) {
            mytoast("您还未测试肤质，请先测试肤质！");
            return;
        }

        let target = e.target;
        let value = target.getAttribute("data-busi");
        let mode = (value == 1 && this.state.oldCurrentRunMode) ? this.state.oldCurrentRunMode : this.state.mode;// 推荐模式或上次模式
        let runTime = (value == 1 && this.state.oldRunTime) ? this.state.oldRunTime : this.state.runTime;
        if(mode==5){
            var sprayGear = (value == 1 && this.state.oldSprayGear) ? this.state.oldSprayGear : this.state.sprayGrade;
        }else{
            var sprayGear =  value == 1 ? this.baseData.gears[mode] : this.state.sprayGrade;
        }
        let busiSwitch = +value>0?0:1;
        // console.log('busiSwitch',busiSwitch);
        let changeStatus = getSaveFlag({busiSwitch : busiSwitch});
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
        Actions.changeUpdateFlag(AppData.updateFlag);
    }
    chooseModel(e){     // 模式选择
        // 自动模式下不做操作
        let busiSwitch = this.state.busiSwitch;
        if(+busiSwitch === 1) {
			e.preventDefault();
            return;
        }

        this.setState({modelPop : true});
    }
    closePop(){         // 关闭弹窗
        if(this.state.modelPop){
            this.setState({modelPop : false});
        }
    }
    changeMode(e){       // 改变模式
        let target = e.currentTarget;
        let currentRunMode = target.getAttribute("data-mode");
        let currentRunTime = this.baseData.times[currentRunMode];
        let currentSprayGrade = currentRunMode != 5 ? this.baseData.gears[currentRunMode] :this.state.currentSprayGrade;
        let changeStatus = getSaveFlag({currentRunMode : +currentRunMode, currentRunTime : currentRunTime,sprayGrade:currentSprayGrade});
        if(changeStatus) {
            // 更改发送App数据
            AppData.updateFlag |= 0x011;
        } else {
            AppData.updateFlag &= 0x100;
        }
        this.setState({currentRunMode : +currentRunMode, currentRunTime : currentRunTime,currentSprayGrade:currentSprayGrade, updateFlag : AppData.updateFlag});
        Actions.changeUpdateFlag(AppData.updateFlag);
    }
    changeGear(e){      // 改变档位
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        let currentRunMode = this.state.currentRunMode;
        let busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }

        let flag = +e.currentTarget.getAttribute("data-flag");
        let seed = Boolean(flag) ? +1 : -1;
        let currentSprayGrade = this.state.currentSprayGrade ? parseInt(this.state.currentSprayGrade) + seed : 1 + seed;
        if(currentSprayGrade > 3) {
            currentSprayGrade = 3;
        } else if(currentSprayGrade < 1) {
            currentSprayGrade = 1;
        }
        // 判断标识是否改变
        let changeStatus = getSaveFlag({currentSprayGrade : currentSprayGrade});
        if(changeStatus) {
            // 更改发送App数据
            let gearFlag = 0x010;    // 运行时间标识
            AppData.updateFlag |= gearFlag;
        } else {
            AppData.updateFlag &= 0x101;
        }
        this.setState({currentSprayGrade : currentSprayGrade, updateFlag : AppData.updateFlag});
        Actions.changeUpdateFlag(AppData.updateFlag);
    }
    autoChangeTime(flag){
        //自动更改时间函数 用于定时器调用触发
        let currentRunMode = this.state.currentRunMode;
        let busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        let seed = Boolean(flag) ? +10 : -10;
        let currentRunTime = parseInt(this.state.currentRunTime) + seed;
        if(currentRunTime > 120) {
            currentRunTime = 120;
        } else if(currentRunTime < 10) {
            currentRunTime = 10;
        }
        // 判断标识是否改变
        let changeStatus = getSaveFlag({currentRunMode : currentRunMode, currentRunTime : currentRunTime});
        if(changeStatus) {
            // 更改发送App数据
            let timeFlag = 0x001;    // 运行时间标识
            AppData.updateFlag |= timeFlag;
        } else {
            AppData.updateFlag &= 0x110;
        }

        this.baseData.times[currentRunMode] = currentRunTime;
        this.setState({currentRunTime : currentRunTime, updateFlag : AppData.updateFlag});
        Actions.changeUpdateFlag(AppData.updateFlag);
    }
    startChangeTime(e){
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        let currentRunMode = this.state.currentRunMode;
        let busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        let flag = +e.currentTarget.getAttribute("data-flag");
        let _this = this;
        this.retime = setTimeout(function(){
            _this.tclock = setInterval(function(){_this.autoChangeTime(flag)},500);
        }, 2000);
    }
    changeTime(e){
        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
        let currentRunMode = this.state.currentRunMode;
        let busiSwitch = this.state.busiSwitch;
        if(!(currentRunMode == 5 && +busiSwitch === 0)) {
            return;
        }
        clearTimeout(this.retime);
        clearInterval(this.tclock);
        let flag = +e.currentTarget.getAttribute("data-flag");
        let seed = Boolean(flag) ? +10 : -10;
    	let currentRunTime = parseInt(this.state.currentRunTime) + seed;
    	if(currentRunTime > 120) {
            currentRunTime = 120;
    	} else if(currentRunTime < 10) {
            currentRunTime = 10;
    	}

        // 判断标识是否改变
        let changeStatus = getSaveFlag({currentRunMode : currentRunMode, currentRunTime : currentRunTime});
        if(changeStatus) {
            // 更改发送App数据
            let timeFlag = 0x001;    // 运行时间标识
            AppData.updateFlag |= timeFlag;
        } else {
            AppData.updateFlag &= 0x110;
        }

        this.baseData.times[currentRunMode] = currentRunTime;
		this.setState({currentRunTime : currentRunTime, updateFlag : AppData.updateFlag});
        Actions.changeUpdateFlag(AppData.updateFlag);
    }
    syncData(){
        if (AppData.updateFlag > 0){
            clearInterval(this.lxClock);
            let _this = this;
            setTimeout(function(){
                _this.lxClock = setInterval(function(){
                    Actions.intervalData();
                },5000);
            },12000);
            let configMode = this.state.currentRunMode;
            let runTime = this.state.currentRunTime;
            let busiSwitch = this.state.busiSwitch;
            let sprayGrade = this.state.currentSprayGrade;

            // 更改发送App数据
            AppData.currentRunMode = configMode;
            AppData.currentRunTime = runTime;
            AppData.configMode = configMode;
            AppData.runTime = runTime;
            AppData.busiSwitch = busiSwitch;
            AppData.sprayGrade = sprayGrade;
            AppData.configType = 'commonConfig';

            Actions.sync(AppData);
        }
    }
    render(){
        let modelPop = this.state.modelPop;
        let busiSwitch = this.state.busiSwitch;
        let currentRunMode = this.state.currentRunMode;
        let mode = +busiSwitch ?  this.state.mode : this.state.currentRunMode;
        let currentRunTime = this.state.currentRunTime;
        let sprayGrade = +busiSwitch ? this.state.sprayGrade : this.state.currentSprayGrade;
        let runTime = this.state.runTime;
        // 智能推荐按钮样式
        let smartStyle = +busiSwitch ? {display : ''} : {display : 'none'};
        let nonSmartStyle = +busiSwitch ? {display : 'none'} : {display : ''};
        let chooseModelStyle = +busiSwitch ? {color : '#d1d1d1'} : {color : '#777'};
        let chooseModelClass = +busiSwitch ? 'off' : 'on';
        // 弹窗控制样式
        let popStyle = modelPop ? {display : 'block'} : {display : 'none'};
        let modelPopStyle = modelPop ? {bottom : 0} : {bottom : '-23.75rem'};
        // 时间加减样式 && 档位加减样式
        let leftTimeStyle, rightTimeStyle, leftGearStyle, rightGearStyle;
        if(!(currentRunMode == 5 && +busiSwitch == 0)) {
            leftTimeStyle = rightTimeStyle = {"opacity" : 0.5};
            leftGearStyle = rightGearStyle = {"opacity" : 0.5};
        } else {
            leftTimeStyle = (currentRunTime <= 10) ? {'opacity' : 0.5} : {'opacity' : 1};
        	rightTimeStyle = (currentRunTime >= 120) ? {'opacity' : 0.5} : {'opacity' : 1};
            leftGearStyle = (sprayGrade <= 1) ? {'opacity' : 0.5} : {'opacity' : 1};
            rightGearStyle = (sprayGrade >= 3) ? {'opacity' : 0.5} : {'opacity' : 1};
        }
        let gearBgStyle;    // 档位背景
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
}

// 准备就绪，开始渲染页面
document.addEventListener('DOMContentLoaded',function(){
    React.render(<App />, document.body);

    // 调用iscroll处理页面滚动
    /*setTimeout(function(){
        myscroller = new IScroll("panel-scroller", {
            vScroll:true,
            vScrollbar:false,
            onBeforeScrollStart: function(e) {
                let target = e.target;
                while (target.nodeType != 1) target = target.parentNode;
                if (target.tagName != "A" && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
            }
        });
    },200);*/
    document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
},false);

/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag(changeObj) {
    let count = 0;

    for (let k in changeObj) {
        if (changeObj[k] !== AppData[k]) count++;
    }

    return !!count;
}
