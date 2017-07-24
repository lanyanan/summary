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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 主显示组件
	 * @prop {integer} skinDataCode   有无肤质数据
	 * @prop {string}  recommendMode  推荐模式名称
	 * @prop {string}  skinType       肤质
	 * @prop {integer} moisture       水分百分值
	 * @prop {integer} onlineStatus   是否离线状态
	 * <a href="cbeauty://cbeauty_skintest">去测试肌肤&gt;&gt;</a>
	 */

	var DevScreen = React.createClass({
	    displayName: "DevScreen",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    baseData: {
	        modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	        skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	        times: [0, 100, 40, 80, 50, 40]
	    },
	    render: function render() {
	        var tips = [React.createElement(
	            "span",
	            null,
	            "\u4E3A\u4F7F\u667A\u80FD\u8865\u6C34\u55B7\u96FE\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5..."
	        ), React.createElement(
	            "span",
	            null,
	            "\u60A8\u5F53\u524D\u4E3A",
	            this.baseData.skins[this.props.skinType5],
	            "\u80A4\u8D28\uFF0C\u63A8\u8350\u60A8\u4F7F\u7528",
	            this.baseData.modes[this.props.mode],
	            "\uFF01\u7F8E\u4E3D\u5973\u4EBA\u662F\u517B\u51FA\u6765\u7684~"
	        ), React.createElement(
	            "span",
	            null,
	            "\u60A8\u4F7F\u7528\u4E86\u667A\u80FD\u8865\u6C34\u55B7\u96FE\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86",
	            this.props.waterTrend,
	            "%\uFF0C\u8BF7\u7EE7\u7EED\u4FDD\u6301~"
	        )];

	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement(
	                "div",
	                { className: "pic" },
	                React.createElement("img", { className: "pic", src: "../static/img/ico-10.png" }),
	                this.props.onlineStatus == 2 ? React.createElement(
	                    "span",
	                    { className: "offline" },
	                    "\u60A8\u7684\u8BBE\u5907\u5DF2\u79BB\u7EBF"
	                ) : ""
	            ),
	            React.createElement(
	                "div",
	                { className: "tip" },
	                tips[this.props.skinDataCode]
	            ),
	            this.props.electricity <= 4 && this.props.chargeStatus < 2 && this.props.onlineStatus != 2 ? React.createElement("div", { className: "battery" }) : ""
	        );
	    }
	});

	module.exports = DevScreen;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(3);

	var _Actions = __webpack_require__(5);

	var _Store = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// app数据
	var AppData = {};

	// 加载组件
	var Toast = __webpack_require__(7);
	var SettingButton = __webpack_require__(8);
	var DevScreen = __webpack_require__(1);

	// import {DevScreen} from './DevScreen.es6';

	React.initializeTouchEvents(true); // 开启触摸支持
	var myscroller = void 0; // iscroll滚动容器

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    React.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            modelPop: false,
	            chargeStatus: 1, // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
	            electricity: 19, // 电量
	            currentRunMode: 1, // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
	            currentRunTime: 100, // 当前运行时间
	            onlineStatus: 1, // 在线状态（1-正常, 2-异常）
	            skinDataCode: 0, // 有无肤质数据(0-无, 1-有)
	            busiSwitch: 0, // 业务开关（0：关 1：开） 0-手动 1-自动
	            sprayGrade: 1, // 喷雾大小 3：低 2：中 1：开
	            runTime: 11 // 自动模式下的运行时间
	        };
	        _Store.Store.listen(function (data) {
	            return _this2.setState(data);
	        }); // 监听Store
	        _this2.baseData = {
	            modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	            skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            times: [0, 100, 40, 80, 50, 40],
	            gears: ['', 1, 3, 1, 2]
	        };
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            try {
	                myscroller.refresh();
	            } catch (err) {}
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.lxClock = setInterval(function () {
	                _Actions.Actions.intervalData();
	            }, 5000);
	            _Actions.Actions.intervalData();
	            mytoast("为使智能补水喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...");
	        }
	    }, {
	        key: 'handlerTouchMove',
	        value: function handlerTouchMove(e) {
	            if (e.target.type !== "range") {
	                e.preventDefault(); // 修复touchmove无效的BUG
	            }
	        }
	    }, {
	        key: 'handlerTounch',
	        value: function handlerTounch(e) {
	            // 切换智能推荐模式
	            var skinDataCode = this.state.skinDataCode;
	            var oldmode = this.state.currentRunMode;
	            var oldRunTime = this.state.currentRunTime;
	            var oldSprayGear = this.state.currentSprayGrade;
	            if (!+skinDataCode) {
	                mytoast("您还未测试肤质，请先测试肤质！");
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
	            _Actions.Actions.changeUpdateFlag(AppData.updateFlag);
	        }
	    }, {
	        key: 'chooseModel',
	        value: function chooseModel(e) {
	            // 模式选择
	            // 自动模式下不做操作
	            var busiSwitch = this.state.busiSwitch;
	            if (+busiSwitch === 1) {
	                e.preventDefault();
	                return;
	            }

	            this.setState({ modelPop: true });
	        }
	    }, {
	        key: 'closePop',
	        value: function closePop() {
	            // 关闭弹窗
	            if (this.state.modelPop) {
	                this.setState({ modelPop: false });
	            }
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode(e) {
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
	            _Actions.Actions.changeUpdateFlag(AppData.updateFlag);
	        }
	    }, {
	        key: 'changeGear',
	        value: function changeGear(e) {
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
	            _Actions.Actions.changeUpdateFlag(AppData.updateFlag);
	        }
	    }, {
	        key: 'autoChangeTime',
	        value: function autoChangeTime(flag) {
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
	            _Actions.Actions.changeUpdateFlag(AppData.updateFlag);
	        }
	    }, {
	        key: 'startChangeTime',
	        value: function startChangeTime(e) {
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
	        }
	    }, {
	        key: 'changeTime',
	        value: function changeTime(e) {
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
	            _Actions.Actions.changeUpdateFlag(AppData.updateFlag);
	        }
	    }, {
	        key: 'syncData',
	        value: function syncData() {
	            var _this3 = this;

	            if (AppData.updateFlag > 0) {
	                (function () {
	                    clearInterval(_this3.lxClock);
	                    var _this = _this3;
	                    setTimeout(function () {
	                        _this.lxClock = setInterval(function () {
	                            _Actions.Actions.intervalData();
	                        }, 5000);
	                    }, 12000);
	                    var configMode = _this3.state.currentRunMode;
	                    var runTime = _this3.state.currentRunTime;
	                    var busiSwitch = _this3.state.busiSwitch;
	                    var sprayGrade = _this3.state.currentSprayGrade;

	                    // 更改发送App数据
	                    AppData.currentRunMode = configMode;
	                    AppData.currentRunTime = runTime;
	                    AppData.configMode = configMode;
	                    AppData.runTime = runTime;
	                    AppData.busiSwitch = busiSwitch;
	                    AppData.sprayGrade = sprayGrade;
	                    AppData.configType = 'commonConfig';

	                    _Actions.Actions.sync(AppData);
	                })();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
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
	            var leftTimeStyle = void 0,
	                rightTimeStyle = void 0,
	                leftGearStyle = void 0,
	                rightGearStyle = void 0;
	            if (!(currentRunMode == 5 && +busiSwitch == 0)) {
	                leftTimeStyle = rightTimeStyle = { "opacity": 0.5 };
	                leftGearStyle = rightGearStyle = { "opacity": 0.5 };
	            } else {
	                leftTimeStyle = currentRunTime <= 10 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	                rightTimeStyle = currentRunTime >= 120 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	                leftGearStyle = sprayGrade <= 1 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	                rightGearStyle = sprayGrade >= 3 ? { 'opacity': 0.5 } : { 'opacity': 1 };
	            }
	            var gearBgStyle = void 0; // 档位背景
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
	                    null,
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
	                                '\u667A\u80FD\u63A8\u8350'
	                            ),
	                            React.createElement('img', { src: '../static/img/ico-left-switch.png', style: nonSmartStyle, 'data-busi': '0', onTouchEnd: this.handlerTounch.bind(this) }),
	                            React.createElement('img', { src: '../static/img/ico-right-switch.png', style: smartStyle, 'data-busi': '1', onTouchEnd: this.handlerTounch.bind(this) })
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
	                                    '\u6A21\u5F0F\u9009\u62E9'
	                                )
	                            ),
	                            React.createElement('div', { onTouchEnd: this.chooseModel.bind(this), className: 'chooseModel' })
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
	                                    '\u6863\u4F4D'
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
	                                        { className: 'ico-add flex-cell', 'data-flag': '1', onTouchEnd: this.changeGear.bind(this) },
	                                        React.createElement('img', { src: '../static/img/ico-minus.png', style: rightGearStyle })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'ico-minus flex-cell', 'data-flag': '0', onTouchEnd: this.changeGear.bind(this) },
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
	                                    '\u65F6\u957F'
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
	                                        { className: 'ico-add flex-cell', 'data-flag': '0', onTouchStart: this.startChangeTime.bind(this), onTouchEnd: this.changeTime.bind(this) },
	                                        React.createElement('img', { src: '../static/img/ico-minus.png', style: leftTimeStyle })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'ico-minus flex-cell', 'data-flag': '1', onTouchStart: this.startChangeTime.bind(this), onTouchEnd: this.changeTime.bind(this) },
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
	                    React.createElement('div', { className: 'model-mask', onTouchEnd: this.closePop.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'model-pop flex-column', style: modelPopStyle },
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '1', onTouchEnd: this.changeMode.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u8865\u6C34\u6A21\u5F0F'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9002\u5408\u5E72\u6027\u80A4\u8D28'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 1 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '2', onTouchEnd: this.changeMode.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u8212\u7F13\u6A21\u5F0F'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9002\u5408\u4E2D\u6027\u80A4\u8D28'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 2 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '3', onTouchEnd: this.changeMode.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u6E05\u723D\u6A21\u5F0F'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9002\u5408\u6CB9\u6027\u80A4\u8D28'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 3 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '4', onTouchEnd: this.changeMode.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u6ECB\u517B\u6A21\u5F0F'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9002\u5408\u6DF7\u5408\u6027\u80A4\u8D28'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 4 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '5', onTouchEnd: this.changeMode.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u81EA\u5B9A\u4E49'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 5 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell pop-btn', onTouchEnd: this.closePop.bind(this) },
	                            React.createElement(
	                                'em',
	                                null,
	                                '\u786E\u5B9A'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'footer' },
	                    React.createElement(SettingButton, { settingStatus: this.state.updateFlag ? "on" : "off", callback: this.syncData.bind(this) })
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 准备就绪，开始渲染页面


	document.addEventListener('DOMContentLoaded', function () {
	    React.render(React.createElement(App, null), document.body);

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
	    document.body.addEventListener('touchstart', function () {}); // 激活IOS设备:active效果
	}, false);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(4);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 4 */
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
	    }, // 公共函数模块
	    /**
	     * 格式化时间函数
	     * @param    {string}   date   日期字符串或时间戳
	     * @param    {string}   format 格式，缺省为：yyyy-MM-dd hh:mm:ss
	     * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
	     * @return   {string}          按format格式输出日期
	     */
	    dateFormat: function dateFormat(date, format, isUTC) {
	        var timezoneOffset = 0;
	        var dateObj = new Date(date);
	        var patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/;
	        var dateArr;
	        var now = new Date();
	        // IOS 解析失败时尝试手动解析
	        if (dateObj.toString() === 'Invalid Date' && typeof date === 'string') {
	            dateArr = date.match(patt) || [];
	            dateObj = new Date(dateArr[1] || now.getFullYear(), dateArr[2] - 1 || now.getMonth(), dateArr[3] || now.getDate(), dateArr[4] || now.getHours(), dateArr[5] || now.getMinutes(), dateArr[6] || now.getSeconds());
	        }
	        format = format || 'yyyy-MM-dd hh:mm:ss';
	        if (isUTC) {
	            // 处理utc时间
	            timezoneOffset = new Date().getTimezoneOffset();
	            dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);
	        }
	        var map = {
	            'M': dateObj.getMonth() + 1, //月份 
	            'd': dateObj.getDate(), //日 
	            'h': dateObj.getHours(), //小时 
	            'm': dateObj.getMinutes(), //分 
	            's': dateObj.getSeconds(), //秒 
	            'q': Math.floor((dateObj.getMonth() + 3) / 3), //季度 
	            'S': dateObj.getMilliseconds() //毫秒 
	        };
	        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
	            var v = map[t];
	            if (v !== undefined) {
	                if (all.length > 1) {
	                    v = '0' + v;
	                    v = v.substr(v.length - 2);
	                }
	                return v;
	            } else if (t === 'y') {
	                return (dateObj.getFullYear() + '').substr(4 - all.length);
	            }
	            return all;
	        });
	        return format;
	    },
	    /**
	     * [dateFormatFull description]
	     * @param  {[type]} dateTime [时间戳]
	     * @param  {[type]} type     [“-”] 返回2016-07-30   [“month”] 返回2016-07    [“day”] 返回 日   
	     * @param  {[type]} flag     [1]  返回12：30
	     * @return {[type]}          [description]
	     */
	    dateFormatFull: function dateFormatFull(dateTime, type, flag) {
	        var d = new Date(dateTime * 1000),
	            y = d.getFullYear(),
	            m = d.getMonth() + 1,
	            day = d.getDate(),
	            h = d.getHours(),
	            mn = d.getMinutes(),
	            s = d.getSeconds(),
	            res;
	        m = m > 9 ? m : '0' + m;
	        day = day > 9 ? day : '0' + day;
	        h = h > 9 ? h : '0' + h;
	        mn = mn > 9 ? mn : '0' + mn;
	        s = s > 9 ? s : '0' + s;
	        if (type === '-') {
	            res = y + '-' + m + '-' + day;
	            if (flag) {
	                res = h + ':' + mn;
	            }
	        } else if (type === 'month') {
	            res = y + '-' + m;
	        } else if (type === 'day') {
	            res = d.getDate();
	        } else if (type === 'full') {
	            res = y + '-' + m + '-' + day + " " + h + ':' + mn;
	        }
	        return res;
	    },
	    /**
	     * [utcToLocal utc时间转换为本地时间]
	     * @param  {[type]} utc [utc 时间 格式为‘2016-06-06 12:12:12’]
	     * @param  {[type]} type [返回格式  1：时+分 ]
	     * @return {[type]}     [description]
	     */
	    utcToLocal: function utcToLocal(utc, type) {
	        var utcDay = utc.split(' '),
	            utcDate = utcDay[0].split('-'),
	            utcTime = utcDay[1].split(':'),
	            timestamp = Math.round(Date.UTC(utcDate[0], utcDate[1] - 1, utcDate[2], utcTime[0], utcTime[1], utcTime[2]) / 1000),
	            time = this.dateFormatFull(timestamp, "full");
	        if (type == 1) {
	            time = this.dateFormatFull(timestamp, "-", 1);
	        }
	        return time;
	    },
	    timestampToUtc: function timestampToUtc(timestamp, type) {
	        var d = new Date(timestamp * 1000),
	            y = d.getUTCFullYear(),
	            m = d.getUTCMonth() + 1,
	            day = d.getUTCDate(),
	            h = d.getUTCHours(),
	            mn = d.getUTCMinutes(),
	            s = d.getUTCSeconds(),
	            res;
	        m = m > 9 ? m : '0' + m;
	        day = day > 9 ? day : '0' + day;
	        h = h > 9 ? h : '0' + h;
	        mn = mn > 9 ? mn : '0' + mn;
	        s = s > 9 ? s : '0' + s;
	        if (type === '-') {
	            res = y + '-' + m + '-' + day + " " + h + ':' + mn + ':' + s;
	        }
	        return res;
	    },
	    // 设置cookies
	    setCookie: function setCookie(name, value) {
	        var Days = 30;
	        var exp = new Date();
	        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	    },
	    // 获取cookies
	    getCookie: function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	    },
	    // 删除cookies
	    delCookie: function delCookie(name) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	    }
	};
	module.exports = Funs;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 重绘
	'changeUpdateFlag', // 更改updateFlag
	'sync', // 同步数据
	'getData', //get请求数据
	'getToken', //获取token
	'postData', //post请求数据
	'intervalData' //轮询获取运行数据
	]);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(5);

	var _fun = __webpack_require__(3);

	var Toast = __webpack_require__(7);

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    React.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	function getCurrentDeviceSn() {
	    return het.getDeviceId();
	    // if(!window.AppJsBridge) return "";
	    // return window.AppJsBridge.service.deviceService.getCurrentDeviceSn();
	}

	var AppData = {};
	var appId = '30590';
	var appSecret = "98889238ed6e441aaf9b0691b017695f";

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onGetData: function onGetData(getUrl, callback) {
	        if (!getUrl) return;
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200 || xhr.status === 304) {
	                    var result = JSON.parse(xhr.responseText);
	                    if (result.code == 0) {
	                        callback(result.data);
	                    } else {
	                        // mytoast(result.msg);
	                    }
	                } else {
	                    mytoast('获取运行数据失败');
	                }
	            }
	        };
	        xhr.open('GET', getUrl, true);
	        xhr.send();
	    },
	    onPostData: function onPostData(POSTUrl) {
	        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	        var callback = arguments[2];

	        if (!POSTUrl) return;
	        var _this = this;
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200 || xhr.status === 304) {
	                    var result = JSON.parse(xhr.responseText);
	                    if (result.code == 0) {
	                        callback(result.data);
	                    } else {
	                        mytoast('同步失败');
	                        _this.trigger({ updateFlag: AppData.updateFlag });
	                    }
	                } else {
	                    mytoast('同步失败');
	                    _this.trigger({ updateFlag: AppData.updateFlag });
	                }
	            }
	        };
	        xhr.open("POST", POSTUrl, true);
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        xhr.send(data);
	    },
	    onIntervalData: function onIntervalData() {
	        var _this = this;
	        var callback = function callback(data) {
	            var onlineUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/device/getDeviceInfo";
	            var timestamp = +new Date();
	            var accessToken = data;
	            var deviceId = getCurrentDeviceSn();
	            if (!deviceId) return;
	            var appType = !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2;
	            //获取在线状态
	            onlineUrl = onlineUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId + "&appType=" + appType;
	            var infoCall = function infoCall(data) {
	                var result = { "onlineStatus": data.onlineStatus };
	                AppData.onlineStatus = data.onlineStatus;
	                _this.trigger({ onlineStatus: data.onlineStatus });
	            };
	            _this.onGetData(onlineUrl, infoCall);
	            //进入页面拉取默认数据
	            if (!AppData.getDefault) {
	                var runUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/app/chairdressing/portablesprayerKym/defaultMode";
	                runUrl = runUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	                _this.onGetData(runUrl, _this.onRepaint);
	                AppData.getDefault = true;
	            }
	            //获取运行数据,若离线状态则不拉取运行数据
	            if (AppData.onlineStatus == 2) return;
	            var statusUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/device/data/get";
	            statusUrl = statusUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	            _this.onGetData(statusUrl, _this.onRepaint);
	        };
	        var errCall = function errCall() {
	            _this.trigger({ updateFlag: AppData.updateFlag });
	            mytoast('请检查网络或设备在线状况');
	        };
	        het.getToken(callback, errCall);
	    },
	    onRepaint: function onRepaint(data) {
	        if (AppData.updateFlag) return; // 未同步前忽略新接收到的数据
	        if (AppData.busiSwitch === undefined && data.busiSwitch == 1) {
	            AppData.updateFlag = data.updateFlag = 256;
	            data.configMode = data.mode;
	            data.configType = "commonConfig";
	            this.onSync(data);
	            delete data.updateFlag;
	            delete data.configMode;
	            delete data.configType;
	        }
	        AppData = _fun.Funs._extends(AppData, data);
	        data.currentSprayGrade = data.currentSprayGrade ? data.currentSprayGrade : data.sprayGrade;
	        data.currentRunTime = data.currentRunTime ? data.currentRunTime : data.timeSet;
	        this.trigger(data);
	    },
	    onChangeUpdateFlag: function onChangeUpdateFlag(value) {
	        AppData.updateFlag = value;
	    },
	    onSync: function onSync(data) {
	        // 同步数据至app
	        var sendData = _fun.Funs._extends(AppData, data);
	        AppData = _fun.Funs._extends(AppData, data);
	        var _this = this;
	        var callback = function callback(data) {
	            var accessToken = data;
	            var url = (het.getHost() || "https://test.api.clife.cn") + "/v1/app/chairdressing/portablesprayerKym/config/set";
	            var timestamp = +new Date();
	            var deviceId = getCurrentDeviceSn();
	            var source = 2;
	            var trigger = function trigger() {
	                AppData.needSave = false; // 重置标记位
	                AppData.updateFlag = 0; //重置updateFlag
	                _this.trigger({ needSave: false, updateFlag: 0 });
	                mytoast("同步成功");
	            };
	            var json = JSON.stringify(sendData);
	            var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	            var obj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	            _this.onPostData(url, obj, trigger);
	        };
	        this.trigger({ updateFlag: 0 });
	        var errCall = function errCall() {
	            _this.trigger({ updateFlag: AppData.updateFlag });
	            mytoast('请检查网络或设备在线状况');
	        };
	        het.getToken(callback, errCall);
	    }
	});

/***/ },
/* 7 */
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
	        css["WebkitAnimation"] = css.animation;
	        css["MozAnimation"] = css.animation;
	        css["OAnimation"] = css.animation;
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
/* 8 */
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
	        return {
	            valueH: 0
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            settingBtnStatus: nextProps.settingStatus
	        });
	    },
	    TouchStart: function TouchStart(e) {
	        var status = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        if (status == 'off') return;
	        var startY = parseInt(e.touches[0].clientY);
	        var oldValue = parseInt(this.state.valueH);
	        // var status = this.state.settingBtnStatus=='active'?'on':'active';
	        this.setState({
	            startY: startY,
	            oldValue: oldValue
	        });
	    },
	    TouchMove: function TouchMove(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var newY = parseInt(e.touches[0].clientY);
	        var oldY = parseInt(this.state.startY);
	        var valueH = parseInt(this.state.oldValue) + newY - oldY;
	        this.setState({
	            newY: newY,
	            valueH: valueH
	        });
	    },
	    TouchEnd: function TouchEnd(e) {
	        var _this = this;
	        if (_this.state.settingBtnStatus == 'off') return;
	        var newY = _this.state.newY || this.state.startY;
	        var disY = newY - _this.state.startY;
	        var offsetValue = parseInt(_this.state.oldValue);
	        var oldValue = parseInt(_this.state.valueH);
	        var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	        if (offset <= 20) {
	            var status = _this.state.settingBtnStatus == 'active' ? 'on' : 'active';
	            _this.setState({
	                settingBtnStatus: status
	            });
	            clearInterval(_this.timer);
	            _this.timer = setTimeout(function () {
	                if (typeof _this.props.callback === 'function') {
	                    _this.props.callback();
	                }
	            }, 50);
	        } else {
	            return;
	        }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearInterval(this.timer);
	    },
	    render: function render() {
	        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        return React.createElement(
	            'section',
	            { onTouchStart: this.TouchStart, onTouchMove: this.TouchMove, onTouchEnd: this.TouchEnd, className: "settingbtn-" + idx },
	            React.createElement(
	                'em',
	                null,
	                '\u4FDD\u5B58'
	            )
	        );
	    }
	});
	module.exports = SettingButton;

/***/ }
/******/ ]);