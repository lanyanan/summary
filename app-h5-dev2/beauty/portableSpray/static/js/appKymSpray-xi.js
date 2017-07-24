/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fun = __webpack_require__(2);

	// app数据
	var AppData = {};

	// 加载组件
	var Toast = __webpack_require__(4);
	var SettingButton = __webpack_require__(5);
	var DevScreen = __webpack_require__(6);


	React.initializeTouchEvents(true); // 开启触摸支持
	var myscroller; // iscroll滚动容器

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    React.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	// 定义事件
	window.AppActions = Reflux.createActions(['repaint', // 重绘
	'sync' // 同步数据
	]);

	// 定义store
	var AppStore = Reflux.createStore({
	    listenables: [AppActions],
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onSync: function onSync() {
	        // 同步数据至app
	        if (AppData.updateFlag > 0) {
	            het.send(AppData, function (data) {
	                // console.log(data)
	                het.toast("同步成功！");
	            }, function (data) {
	                het.toast("同步失败! ");
	            });
	            AppData.updateFlag = 0; // 重置标记位
	            this.trigger({ updateFlag: 0 });
	            mytoast("使用完康茵美便携喷雾仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }
	});

	// 定义app对象
	var App = React.createClass({
	    displayName: 'App',

	    mixins: [Reflux.connect(AppStore)],
	    // 基本数据
	    baseData: {
	        modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	        skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	        times: [0, 100, 40, 80, 50, 40],
	        gears: ['', 1, 3, 1, 2]
	    },
	    getInitialState: function getInitialState() {
	        return {
	            modelPop: false,
	            chargeStatus: 1, // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
	            electricity: 19, // 电量
	            currentRunMode: 1, // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
	            currentRunTime: 100, // 当前运行时间
	            onlineStatus: 2, // 在线状态（1-正常, 2-异常）
	            skinDataCode: 0, // 有无肤质数据(0-无, 1-有)
	            busiSwitch: 0, // 业务开关（0：关 1：开） 0-手动 1-自动
	            sprayGrade: 1, // 喷雾大小 3：低 2：中 1：开
	            runTime: 11 // 自动模式下的运行时间
	        };
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        try {
	            myscroller.refresh();
	        } catch (err) {}
	    },
	    componentDidMount: function componentDidMount() {
	        mytoast("为使康茵美便携喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...");
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        if (e.target.type !== "range") {
	            e.preventDefault(); // 修复touchmove无效的BUG
	        }
	    },
	    handlerTounch: function handlerTounch(e) {
	        // 切换智能推荐模式
	        var skinDataCode = this.state.skinDataCode;
	        var oldmode = this.state.currentRunMode;
	        var oldRunTime = this.state.currentRunTime;
	        var oldSprayGear = this.state.currentSprayGrade;
	        if (! +skinDataCode) {
	            het.toast("您还未测试肤质，请先测试肤质！");
	            return;
	        }

	        var target = e.target;
	        var value = target.getAttribute("data-busi");
	        var mode = value == 1 && this.state.oldCurrentRunMode ? this.state.oldCurrentRunMode : this.state.mode; // 推荐模式或上次模式
	        var runTime = value == 1 && this.state.oldRunTime ? this.state.oldRunTime : this.state.runTime;
	        if (mode == 5) {
	            var sprayGear = value == 1 && this.state.oldSprayGear ? this.state.oldSprayGear : this.state.sprayGrade;
	        } else {
	            var sprayGear = value == 1 ? this.baseData.gears[mode] : this.state.sprayGrade;
	        }
	        var busiSwitch = +value > 0 ? 0 : 1;
	        // console.log('busiSwitch',busiSwitch);
	        var changeStatus = getSaveFlag({ busiSwitch: busiSwitch });
	        if (changeStatus) {
	            // 更改发送App数据
	            AppData.updateFlag |= 0x100;
	        } else {
	            AppData.updateFlag &= 0x011;
	        }

	        this.setState({
	            busiSwitch: busiSwitch,
	            currentRunTime: runTime,
	            currentRunMode: mode,
	            currentSprayGrade: sprayGear,
	            oldCurrentRunMode: oldmode,
	            oldRunTime: oldRunTime,
	            oldSprayGear: oldSprayGear,
	            updateFlag: AppData.updateFlag
	        });
	    },
	    chooseModel: function chooseModel(e) {
	        // 模式选择
	        // 自动模式下不做操作
	        var busiSwitch = this.state.busiSwitch;
	        if (+busiSwitch === 1) {
	            e.preventDefault();
	            return;
	        }

	        this.setState({ modelPop: true });
	    },
	    closePop: function closePop() {
	        // 关闭弹窗
	        if (this.state.modelPop) {
	            this.setState({ modelPop: false });
	        }
	    },
	    changeMode: function changeMode(e) {
	        // 改变模式
	        var target = e.currentTarget;
	        var currentRunMode = target.getAttribute("data-mode");
	        var currentRunTime = this.baseData.times[currentRunMode];
	        var currentSprayGrade = currentRunMode != 5 ? this.baseData.gears[currentRunMode] : this.state.currentSprayGrade;
	        var changeStatus = getSaveFlag({ currentRunMode: +currentRunMode, currentRunTime: currentRunTime, sprayGrade: currentSprayGrade });
	        if (changeStatus) {
	            // 更改发送App数据
	            AppData.updateFlag |= 0x011;
	        } else {
	            AppData.updateFlag &= 0x100;
	        }
	        this.setState({ currentRunMode: +currentRunMode, currentRunTime: currentRunTime, currentSprayGrade: currentSprayGrade, updateFlag: AppData.updateFlag });
	    },
	    changeGear: function changeGear(e) {
	        // 改变档位
	        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
	        var currentRunMode = this.state.currentRunMode;
	        var busiSwitch = this.state.busiSwitch;
	        if (!(currentRunMode == 5 && +busiSwitch === 0)) {
	            return;
	        }

	        var flag = +e.currentTarget.getAttribute("data-flag");
	        var seed = Boolean(flag) ? +1 : -1;
	        var currentSprayGrade = this.state.currentSprayGrade ? parseInt(this.state.currentSprayGrade) + seed : 1 + seed;
	        if (currentSprayGrade > 3) {
	            currentSprayGrade = 3;
	        } else if (currentSprayGrade < 1) {
	            currentSprayGrade = 1;
	        }
	        // 判断标识是否改变
	        var changeStatus = getSaveFlag({ currentSprayGrade: currentSprayGrade });
	        if (changeStatus) {
	            // 更改发送App数据
	            var gearFlag = 0x010; // 运行时间标识
	            AppData.updateFlag |= gearFlag;
	        } else {
	            AppData.updateFlag &= 0x101;
	        }
	        this.setState({ currentSprayGrade: currentSprayGrade, updateFlag: AppData.updateFlag });
	    },
	    autoChangeTime: function autoChangeTime(flag) {
	        //自动更改时间函数 用于定时器调用触发
	        var currentRunMode = this.state.currentRunMode;
	        var busiSwitch = this.state.busiSwitch;
	        if (!(currentRunMode == 5 && +busiSwitch === 0)) {
	            return;
	        }
	        var seed = Boolean(flag) ? +10 : -10;
	        var currentRunTime = parseInt(this.state.currentRunTime) + seed;
	        if (currentRunTime > 120) {
	            currentRunTime = 120;
	        } else if (currentRunTime < 10) {
	            currentRunTime = 10;
	        }
	        // 判断标识是否改变
	        var changeStatus = getSaveFlag({ currentRunMode: currentRunMode, currentRunTime: currentRunTime });
	        if (changeStatus) {
	            // 更改发送App数据
	            var timeFlag = 0x001; // 运行时间标识
	            AppData.updateFlag |= timeFlag;
	        } else {
	            AppData.updateFlag &= 0x110;
	        }

	        this.baseData.times[currentRunMode] = currentRunTime;
	        this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	    },
	    startChangeTime: function startChangeTime(e) {
	        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
	        var currentRunMode = this.state.currentRunMode;
	        var busiSwitch = this.state.busiSwitch;
	        if (!(currentRunMode == 5 && +busiSwitch === 0)) {
	            return;
	        }
	        var flag = +e.currentTarget.getAttribute("data-flag");
	        var _this = this;
	        this.retime = setTimeout(function () {
	            _this.tclock = setInterval(function () {
	                _this.autoChangeTime(flag);
	            }, 500);
	        }, 2000);
	    },
	    changeTime: function changeTime(e) {
	        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
	        var currentRunMode = this.state.currentRunMode;
	        var busiSwitch = this.state.busiSwitch;
	        if (!(currentRunMode == 5 && +busiSwitch === 0)) {
	            return;
	        }
	        clearTimeout(this.retime);
	        clearInterval(this.tclock);
	        var flag = +e.currentTarget.getAttribute("data-flag");
	        var seed = Boolean(flag) ? +10 : -10;
	        var currentRunTime = parseInt(this.state.currentRunTime) + seed;
	        if (currentRunTime > 120) {
	            currentRunTime = 120;
	        } else if (currentRunTime < 10) {
	            currentRunTime = 10;
	        }

	        // 判断标识是否改变
	        var changeStatus = getSaveFlag({ currentRunMode: currentRunMode, currentRunTime: currentRunTime });
	        if (changeStatus) {
	            // 更改发送App数据
	            var timeFlag = 0x001; // 运行时间标识
	            AppData.updateFlag |= timeFlag;
	        } else {
	            AppData.updateFlag &= 0x110;
	        }

	        this.baseData.times[currentRunMode] = currentRunTime;
	        this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	    },
	    syncData: function syncData() {
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
	    },
	    render: function render() {
	        var modelPop = this.state.modelPop;
	        var busiSwitch = this.state.busiSwitch;
	        var currentRunMode = this.state.currentRunMode;
	        var mode = +busiSwitch ? this.state.mode : this.state.currentRunMode;
	        var currentRunTime = this.state.currentRunTime;
	        var sprayGrade = +busiSwitch ? this.state.sprayGrade : this.state.currentSprayGrade;
	        var runTime = this.state.runTime;
	        // 智能推荐按钮样式
	        var smartStyle = +busiSwitch ? { display: '' } : { display: 'none' };
	        var nonSmartStyle = +busiSwitch ? { display: 'none' } : { display: '' };
	        var chooseModelStyle = +busiSwitch ? { color: '#d1d1d1' } : { color: '#777' };
	        var chooseModelClass = +busiSwitch ? 'off' : 'on';
	        // 弹窗控制样式
	        var popStyle = modelPop ? { display: 'block' } : { display: 'none' };
	        var modelPopStyle = modelPop ? { bottom: 0 } : { bottom: '-23.75rem' };
	        // 时间加减样式 && 档位加减样式
	        var leftTimeStyle, rightTimeStyle, leftGearStyle, rightGearStyle;
	        if (!(currentRunMode == 5 && +busiSwitch == 0)) {
	            leftTimeStyle = rightTimeStyle = { "opacity": 0.5 };
	            leftGearStyle = rightGearStyle = { "opacity": 0.5 };
	        } else {
	            leftTimeStyle = currentRunTime <= 10 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	            rightTimeStyle = currentRunTime >= 120 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	            leftGearStyle = sprayGrade <= 1 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	            rightGearStyle = sprayGrade >= 3 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	        }
	        var gearBgStyle; // 档位背景
	        switch (sprayGrade) {
	            case 1:
	                gearBgStyle = { "backgroundImage": 'url(../static/img/ico-gears1.png)' };
	                break;
	            case 2:
	                gearBgStyle = { "backgroundImage": 'url(../static/img/ico-gears2.png)' };
	                break;
	            case 3:
	                gearBgStyle = { "backgroundImage": 'url(../static/img/ico-gears3.png)' };
	                break;
	            default:
	                gearBgStyle = { "backgroundImage": 'url(../static/img/ico-gears1.png)' };
	                break;
	        }

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'padding_div' },
	                React.createElement(
	                    'section',
	                    { className: 'screen-ctn' },
	                    React.createElement(DevScreen, this.state),
	                    React.createElement(
	                        'div',
	                        { className: 'smart-rec clearfix' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '智能推荐'
	                        ),
	                        React.createElement('img', { src: '../static/img/ico-left-switch.png', style: nonSmartStyle, 'data-busi': '0', onTouchEnd: this.handlerTounch }),
	                        React.createElement('img', { src: '../static/img/ico-right-switch.png', style: smartStyle, 'data-busi': '1', onTouchEnd: this.handlerTounch })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'model-info' },
	                        React.createElement(
	                            'div',
	                            { className: 'model-name' },
	                            React.createElement(
	                                'span',
	                                null,
	                                this.baseData.modes[mode]
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'model-choose' },
	                            React.createElement(
	                                'span',
	                                { className: chooseModelClass, style: chooseModelStyle },
	                                '模式选择'
	                            )
	                        ),
	                        React.createElement('div', { onTouchEnd: this.chooseModel, className: 'chooseModel' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'gear-time flex' },
	                        React.createElement(
	                            'div',
	                            { className: 'model-gear flex-cell' },
	                            React.createElement(
	                                'div',
	                                { className: 'model-title' },
	                                '档位'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'model-icon' },
	                                React.createElement('div', { className: 'ico-gear', style: gearBgStyle })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'model-opt flex' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'ico-add flex-cell', 'data-flag': '1', onTouchEnd: this.changeGear },
	                                    React.createElement('img', { src: '../static/img/ico-minus.png', style: rightGearStyle })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'ico-minus flex-cell', 'data-flag': '0', onTouchEnd: this.changeGear },
	                                    React.createElement('img', { src: '../static/img/ico-add.png', style: leftGearStyle })
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'model-time flex-cell' },
	                            React.createElement(
	                                'div',
	                                { className: 'model-title' },
	                                '时长'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'model-icon' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'ico-time' },
	                                    +busiSwitch == 0 ? currentRunTime : runTime,
	                                    's'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'model-opt flex' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'ico-add flex-cell', 'data-flag': '0', onTouchStart: this.startChangeTime, onTouchEnd: this.changeTime },
	                                    React.createElement('img', { src: '../static/img/ico-minus.png', style: leftTimeStyle })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'ico-minus flex-cell', 'data-flag': '1', onTouchStart: this.startChangeTime, onTouchEnd: this.changeTime },
	                                    React.createElement('img', { src: '../static/img/ico-add.png', style: rightTimeStyle })
	                                )
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { id: 'panel-pop', style: popStyle },
	                React.createElement('div', { className: 'model-mask', onTouchEnd: this.closePop }),
	                React.createElement(
	                    'div',
	                    { className: 'model-pop flex-column', style: modelPopStyle },
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell', 'data-mode': '1', onTouchEnd: this.changeMode },
	                        React.createElement(
	                            'span',
	                            null,
	                            '补水模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '适合干性肤质'
	                        ),
	                        React.createElement('i', { style: +currentRunMode === 1 ? { display: '' } : { display: 'none' } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell', 'data-mode': '2', onTouchEnd: this.changeMode },
	                        React.createElement(
	                            'span',
	                            null,
	                            '舒缓模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '适合中性肤质'
	                        ),
	                        React.createElement('i', { style: +currentRunMode === 2 ? { display: '' } : { display: 'none' } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell', 'data-mode': '3', onTouchEnd: this.changeMode },
	                        React.createElement(
	                            'span',
	                            null,
	                            '清爽模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '适合油性肤质'
	                        ),
	                        React.createElement('i', { style: +currentRunMode === 3 ? { display: '' } : { display: 'none' } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell', 'data-mode': '4', onTouchEnd: this.changeMode },
	                        React.createElement(
	                            'span',
	                            null,
	                            '滋养模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '适合混合性肤质'
	                        ),
	                        React.createElement('i', { style: +currentRunMode === 4 ? { display: '' } : { display: 'none' } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell', 'data-mode': '5', onTouchEnd: this.changeMode },
	                        React.createElement(
	                            'span',
	                            null,
	                            '自定义'
	                        ),
	                        React.createElement('i', { style: +currentRunMode === 5 ? { display: '' } : { display: 'none' } })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell pop-btn', onTouchEnd: this.closePop },
	                        React.createElement(
	                            'em',
	                            null,
	                            '确定'
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { id: 'footer' },
	                React.createElement(SettingButton, { settingStatus: this.state.updateFlag ? "on" : "off", callback: this.syncData })
	            ),
	            React.createElement('div', { id: 'mytoast' })
	        );
	    }
	});

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        renderConfigData: false,
	        debugMode: "print"
	    });
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    React.render(React.createElement(App, null), document.body);

	    // 调用iscroll处理页面滚动
	    /*setTimeout(function(){
	        myscroller = new iScroll("panel-scroller", {
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
	    document.body.addEventListener('touchstart', function () {}); // 激活IOS设备:active效果
	});

	// 接收到repaint请求后将自动执行此操作
	het.repaint(function (data) {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(3);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Funs = {
	    /*
	        * 获取url参数
	        * sName ：参数名
	        * return : 返回参数值（没有的时候返回空）
	        */
	    getUrlParam: function getUrlParam(sName) {
	        var reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return decodeURIComponent(r[2]); // (r[2]);
	        return "";
	    },

	    /**
	     * 合并对象
	     * target  target 对象
	     * return 合并后对象 
	     */
	    _extends: function _extends(target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];
	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }
	        return target;
	    } // 公共函数模块

	};
	module.exports = Funs;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * toast组件，用于弹出提示信息
	 * 使用该组件时，需导入toast.css文件
	 * @prop {integer} verticalAlign  垂直对齐，缺省为1，取值0-2，对应top、middle、bottom
	 * @prop {boolean} block          是否宽幅，缺省为false
	 * @prop {integer} secs           显示时间，缺省为2s
	 */
	var Toast = React.createClass({
	    displayName: "Toast",

	    aligns: [{ top: 0 }, { bottom: 100 }, { bottom: 0 }],
	    anim: ["toastD", "toastN", "toastU"],
	    render: function render() {
	        var va = typeof this.props.verticalAlign === "undefined" ? 1 : this.props.verticalAlign;
	        var secs = typeof this.props.secs !== "undefined" ? this.props.secs : 2;
	        var css = this.aligns[va];
	        css.animation = this.anim[va] + " " + (+secs + 2) + "s";
	        // 兼容旧版
	        css["-webkit-animation"] = css.animation;
	        css["-moz-animation"] = css.animation;
	        css["-o-animation"] = css.animation;
	        return React.createElement(
	            "section",
	            { style: css, className: "toast" },
	            React.createElement(
	                "div",
	                { className: this.props.block ? "block" : "span" },
	                this.props.children
	            )
	        );
	    }
	});

	module.exports = Toast;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 保存设置按钮组件
	 * @prop {string} settingStatus  设置按钮状态
	 * @act  {function} this.props.callback 点击保存时触发
	 */
	var SettingButton = React.createClass({
	    displayName: 'SettingButton',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            settingBtnStatus: nextProps.settingStatus
	        });
	    },
	    TouchStart: function TouchStart(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var status = this.state.settingBtnStatus == 'active' ? 'on' : 'active';
	        this.setState({
	            settingBtnStatus: status
	        });
	    },
	    TouchEnd: function TouchEnd(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        if (typeof this.props.callback === 'function') {
	            this.props.callback();
	        }
	    },
	    render: function render() {
	        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        return React.createElement(
	            'section',
	            { onTouchStart: this.TouchStart, onTouchEnd: this.TouchEnd, className: "settingbtn-" + idx },
	            React.createElement(
	                'em',
	                null,
	                '保存设置'
	            )
	        );
	    }
	});
	module.exports = SettingButton;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 主显示组件
	 * @prop {integer} skinDataCode   有无肤质数据
	 * @prop {string}  recommendMode  推荐模式名称
	 * @prop {string}  skinType       肤质
	 * @prop {integer} moisture       水分百分值
	 * @prop {integer} onlineStatus   是否离线状态
	 */
	var DevScreen = React.createClass({
	    displayName: "DevScreen",

	    skins: [],
	    render: function render() {
	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement("img", { className: "logo-xi", src: "../static/img/logo@2x.png" }),
	            React.createElement(
	                "div",
	                { className: "pic" },
	                React.createElement("img", { className: "pic", src: "../static/img/ico-p.png" }),
	                this.props.onlineStatus == 2 ? React.createElement(
	                    "span",
	                    { className: "offline" },
	                    "您的设备已离线"
	                ) : ""
	            )
	        );
	    }
	});

	module.exports = DevScreen;

/***/ }
/******/ ]);