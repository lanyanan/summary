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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Toast = __webpack_require__(4);

	var _Toast2 = _interopRequireDefault(_Toast);

	var _SettingButton = __webpack_require__(5);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	var _DevScreenXi = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// app数据
	var AppData = {};

	// 加载组件

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        _Toast2.default,
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

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {
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
	        // 基本数据
	        _this2.baseData = {
	            modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	            skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            times: [0, 100, 40, 80, 50, 40],
	            gears: ['', 1, 3, 1, 2]
	        };
	        _this2.listenStore(AppStore); // 监听Store 
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            mytoast("为使康茵美便携喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...");
	        }
	    }, {
	        key: 'handlerTouchMove',
	        value: function handlerTouchMove(e) {
	            // if (e.target.type!=="range") {
	            //     e.preventDefault(); // 修复touchmove无效的BUG
	            // }
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
	        }
	    }, {
	        key: 'syncData',
	        value: function syncData() {
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
	            var modelPopStyle = modelPop ? { bottom: 0 } : { bottom: '-23.76rem' };
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
	                { className: 'app-body flex-column', onTouchMove: this.handlerTouchMove.bind(this) },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller', className: 'flex-cell' },
	                    React.createElement(
	                        'section',
	                        { className: 'screen-ctn' },
	                        React.createElement(_DevScreenXi.DevScreen, this.state),
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
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.updateFlag ? "on" : "off", callback: this.syncData.bind(this) })
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	;

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        renderConfigData: false,
	        debugMode: "print"
	    });
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
	    // ReactDOM.render((
	    //     <Router history={hashHistory}>
	    //         <Route path="/" component={App} />
	    //     </Router>
	    // ), document.getElementById('ROOT'));
	    // 调用iscroll处理页面滚动
	    // setTimeout(function(){
	    //     myscroller = new iScroll("panel-scroller", {
	    //         vScroll:true,
	    //         vScrollbar:false,
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

	var _BaseComponentClass = __webpack_require__(3);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseComponent = exports.BaseComponent = function (_React$Component) {
	    _inherits(BaseComponent, _React$Component);

	    function BaseComponent(props) {
	        _classCallCheck(this, BaseComponent);

	        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount.call(_this);
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount.call(_this);
	            }
	        };
	        return _this;
	    }

	    /**
	     * 监听Store通用方法
	     * @param    {object}   store   Reflux之Store对象
	     */


	    _createClass(BaseComponent, [{
	        key: 'listenStore',
	        value: function listenStore(store) {
	            var _this2 = this;

	            store.listen(function (data) {
	                if (_this2.isMounted()) {
	                    _this2.setState(data);
	                }
	            });
	        }
	        // 基类DidMount方法

	    }, {
	        key: 'superComponentDidMount',
	        value: function superComponentDidMount() {
	            this._isMounted = true;
	        }
	        // 基类WillUnmount方法

	    }, {
	        key: 'superComponentWillUnmount',
	        value: function superComponentWillUnmount() {
	            this._isMounted = false;
	        }
	        // 判断组件是否已挂载

	    }, {
	        key: 'isMounted',
	        value: function isMounted() {
	            return this._isMounted;
	            // exceptions for flow control :(
	            /*if (!this._isMounted) {
	                try {
	                    ReactDOM.findDOMNode(this);
	                    this._isMounted = true;
	                } catch (e) {
	                    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
	                    this._isMounted = false;
	                } 
	            }
	            return this._isMounted;*/
	        }
	    }]);

	    return BaseComponent;
	}(React.Component);

	;

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

	    aligns: [{ top: 0, left: 0 }, { bottom: 100, left: 0 }, { bottom: 0, left: 0 }],
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DevScreen = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 主显示组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} skinDataCode   有无肤质数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {string}  recommendMode  推荐模式名称
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {string}  skinType       肤质
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} moisture       水分百分值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} onlineStatus   是否离线状态
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var DevScreen = exports.DevScreen = function (_BaseComponent) {
	    _inherits(DevScreen, _BaseComponent);

	    function DevScreen(props) {
	        _classCallCheck(this, DevScreen);

	        var _this = _possibleConstructorReturn(this, (DevScreen.__proto__ || Object.getPrototypeOf(DevScreen)).call(this, props));

	        _this.state = {};
	        _this.baseData = {
	            modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	            skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            times: [0, 100, 40, 80, 50, 40]
	        };
	        return _this;
	    }

	    _createClass(DevScreen, [{
	        key: "render",
	        value: function render() {
	            var tips = [React.createElement(
	                "span",
	                null,
	                "\u4E3A\u4F7F\u8865\u6C34\u55B7\u96FE\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5...",
	                React.createElement(
	                    "a",
	                    { href: "cbeauty://cbeauty_skintest" },
	                    "\u53BB\u6D4B\u8BD5\u808C\u80A4>>"
	                )
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
	                "\u60A8\u4F7F\u7528\u4E86\u8865\u6C34\u55B7\u96FE\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86",
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
	    }]);

	    return DevScreen;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);