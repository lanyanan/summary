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

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	var MODLELIST = ['整机控制', '分区控制', '睡眠', '除螨'];
	var TIPS = ['水位过低，请注意加水！', '设备温度过高，请确保设备工作正常！', '七天不除螨，螨虫陪你睡。请注意除螨！'];

	var dataTimer = 0;

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {
	            shutDownBtn: false,
	            selectTimeBtn: false,
	            startUpTimeBtn: false, //预约开机开关
	            closingTimeBtn: false, //预约关机开关
	            disabledSwitch: false, //预约按钮
	            bootTimeBtn: false, //关机状态下预约开机
	            minuteArr: [0, 10, 20, 30, 40, 50],
	            defaultMinute: 30,
	            defaultHour: 0,
	            minHour: 0,
	            fistRepaint: true,
	            appointmentBtn: true, //是否能点击开关机
	            totalTemp: 40 };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            _Actions.Actions.getData(true, function () {
	                //初始变量控制
	                var disabledSwitch = false;
	                if (_this.state.startAppointmentBtn || _this.state.closeAppointmentBtn) disabledSwitch = true;else disabledSwitch = false;
	                //关机状态下的预约
	                var bootTimeBtn = void 0;
	                if (_this.state.startAppointmentBtn) bootTimeBtn = true;
	                //除螨模式下不能预约开关机
	                var appointmentBtn = true;
	                if (_this.state.modeStatus === 4) appointmentBtn = false;

	                _this.setState({
	                    disabledSwitch: disabledSwitch,
	                    appointmentBtn: appointmentBtn,
	                    bootTimeBtn: bootTimeBtn
	                });
	            });

	            this.reGetData();
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            clearInterval(dataTimer);
	            dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	        //切换模式

	    }, {
	        key: 'handleModle',
	        value: function handleModle(i) {
	            this.state.modeStatus = i;
	            var modeObj = {};
	            if (i !== 4) {
	                this.setState({
	                    appointmentBtn: true
	                });
	            } else {
	                this.setState({
	                    appointmentBtn: false
	                });
	            }
	            switch (i) {
	                case 1:
	                    if (this.state.allHeatTemp > 55) {
	                        modeObj.allHeatTemp = this.state.totalTemp;
	                    } else {
	                        modeObj.allHeatTemp = this.state.allHeatTemp;
	                    }
	                    break;
	                case 2:
	                    modeObj.leftHeatTemp = this.state.leftHeatTemp;
	                    modeObj.rightHeatTemp = this.state.rightHeatTemp;
	                    break;
	                case 3:
	                    modeObj.sleepModeUpTemp = this.state.sleepModeUpTemp;
	                    break;
	                case 4:
	                    modeObj.allHeatTemp = 60;
	                    break;
	            }

	            _Actions.Actions.changeMode(i, modeObj);
	        }
	        //增加整机温度

	    }, {
	        key: 'addTemperature',
	        value: function addTemperature(position) {

	            if (this.state.size === 2) {
	                switch (parseInt(this.state.modeStatus)) {
	                    case 1:
	                        this.state.allHeatTemp += 1;
	                        _Actions.Actions.changeTotalTemperature(this.state.allHeatTemp);
	                        this.setState({
	                            totalTemp: this.state.allHeatTemp
	                        });
	                        break;
	                    case 2:
	                        if (position === 'left') {
	                            if (this.state.leftHeatTemp === 0) this.state.leftHeatTemp = 30;else this.state.leftHeatTemp += 1;
	                            _Actions.Actions.changePartitionTemperature({ leftHeatTemp: this.state.leftHeatTemp, rightHeatTemp: this.state.rightHeatTemp }, 'left');
	                        } else {
	                            if (this.state.rightHeatTemp === 0) this.state.rightHeatTemp = 30;else this.state.rightHeatTemp += 1;
	                            _Actions.Actions.changePartitionTemperature({ leftHeatTemp: this.state.leftHeatTemp, rightHeatTemp: this.state.rightHeatTemp }, 'right');
	                        }
	                        break;
	                    case 3:
	                        this.state.sleepModeUpTemp += 1;
	                        _Actions.Actions.changeSleepTemperature(this.state.sleepModeUpTemp);
	                        break;
	                }
	            }
	        }
	        //降低整机温度

	    }, {
	        key: 'reduceTemperature',
	        value: function reduceTemperature(position) {
	            if (this.state.size === 2) {
	                switch (parseInt(this.state.modeStatus)) {
	                    case 1:
	                        this.state.allHeatTemp -= 1;
	                        _Actions.Actions.changeTotalTemperature(this.state.allHeatTemp);
	                        this.setState({
	                            totalTemp: this.state.allHeatTemp
	                        });
	                        break;
	                    case 2:
	                        if (position === 'left') {
	                            if (this.state.leftHeatTemp === this.state.minPartitionTemperature) this.state.leftHeatTemp = 0;else this.state.leftHeatTemp -= 1;

	                            _Actions.Actions.changePartitionTemperature({ leftHeatTemp: this.state.leftHeatTemp, rightHeatTemp: this.state.rightHeatTemp }, 'left');
	                        } else {
	                            if (this.state.rightHeatTemp === this.state.minPartitionTemperature) this.state.rightHeatTemp = 0;else this.state.rightHeatTemp -= 1;

	                            _Actions.Actions.changePartitionTemperature({ leftHeatTemp: this.state.leftHeatTemp, rightHeatTemp: this.state.rightHeatTemp }, 'right');
	                        }

	                        break;
	                    case 3:
	                        this.state.sleepModeUpTemp -= 1;
	                        _Actions.Actions.changeSleepTemperature(this.state.sleepModeUpTemp);
	                        break;
	                }
	            }
	        }
	        //预约

	    }, {
	        key: 'handleSwitch',
	        value: function handleSwitch(bool) {
	            if (this.state.appointmentBtn) {
	                this.setState({
	                    disabledSwitch: bool
	                });
	                _Actions.Actions.changeAppointment(bool);
	            }
	        }
	        //取消时间组件

	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({
	                selectTimeBtn: false
	            });
	        }
	        //显示时间组件

	    }, {
	        key: 'showClock',
	        value: function showClock() {
	            this.setState({
	                selectTimeBtn: true
	            });
	        }
	        //选择时间

	    }, {
	        key: 'submitClock',
	        value: function submitClock(hou, min) {
	            console.log(hou);
	            if (parseInt(hou) === 0 && parseInt(min) === 0) {
	                het.toast('时间不能设为0');
	                return false;
	            }
	            if (this.state.startUpTimeBtn) {
	                if (parseInt(hou) === this.state.shutdownHour && parseInt(min) === this.state.shutdownMin) {
	                    het.toast('启动时间和关闭时间不能设置相同');
	                    return false;
	                }
	                var time = {};
	                time.startupHour = parseInt(hou);
	                time.startupMin = parseInt(min);

	                _Actions.Actions.changeStartUp(time);
	            } else if (this.state.closingTimeBtn) {
	                if (parseInt(hou) === this.state.startupHour && parseInt(min) === this.state.startupMin) {
	                    het.toast('关闭时间和启动时间不能设置相同');
	                    return false;
	                }
	                var _time = {};

	                _time.shutdownHour = parseInt(hou);
	                _time.shutdownMin = parseInt(min);

	                _Actions.Actions.changeClosing(_time);
	            } else if (this.state.bootTimeBtn) {
	                var _time2 = {};
	                _time2.startupHour = parseInt(hou);
	                _time2.startupMin = parseInt(min);

	                _Actions.Actions.bootAppointment(_time2);
	            }
	            this.cancelClock();
	        }
	    }, {
	        key: 'handleStart',
	        value: function handleStart() {
	            if (this.state.appointmentBtn) {
	                this.setState({
	                    selectTimeBtn: true,
	                    startUpTimeBtn: true,
	                    closingTimeBtn: false,
	                    bootTimeBtn: false
	                });
	            }
	        }
	    }, {
	        key: 'handleCloseing',
	        value: function handleCloseing() {
	            if (this.state.appointmentBtn) {
	                this.setState({
	                    selectTimeBtn: true,
	                    startUpTimeBtn: false,
	                    closingTimeBtn: true,
	                    bootTimeBtn: false
	                });
	            }
	        }
	    }, {
	        key: 'changeEquipment',
	        value: function changeEquipment(i) {
	            this.state.switchStatus = i;
	            if (i === 1) {
	                //开机
	                if (this.state.bootTimeBtn) {
	                    this.setState({
	                        disabledSwitch: true
	                    });
	                }
	                if (this.state.leftHeatTemp === 0 && this.state.rightHeatTemp === 0) {

	                    _Actions.Actions.changeEquipment(i, true);
	                    return false;
	                }
	            }

	            _Actions.Actions.changeEquipment(i);
	        }
	    }, {
	        key: 'handleAppointmentBoot',
	        value: function handleAppointmentBoot() {

	            if (this.state.startAppointmentBtn) {
	                //关
	                this.setState({
	                    bootTimeBtn: false
	                });
	                _Actions.Actions.bootAppointment({}, true);
	            } else {
	                //开
	                this.setState({
	                    selectTimeBtn: true,
	                    startUpTimeBtn: false,
	                    closingTimeBtn: false,
	                    bootTimeBtn: true
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            //二区
	            //整机
	            var allHeatTemp = { "defaultTemperature": this.state.allHeatTemp, "maxTemperature": this.state.maxTotalTemperature, "minTemperature": this.state.minTotalTemperature };
	            //二区左边
	            var leftHeatTemp = { "defaultTemperature": this.state.leftHeatTemp, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature, btn: true };
	            //二区右边
	            var rightHeatTemp = { "defaultTemperature": this.state.rightHeatTemp, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature, btn: true };
	            //睡眠
	            var sleepModeDownTemp = { "defaultTemperature": this.state.sleepModeDownTemp, "maxTemperature": this.state.maxSleepTemperature, "minTemperature": this.state.minSleepTemperature };

	            //暂无四区
	            //四区左上
	            var leftUpperHeat = { "defaultTemperature": this.state.leftUpperHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature };
	            //四区右上
	            var rightUpperHeat = { "defaultTemperature": this.state.rightUpperHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature };
	            //四区左下 
	            var leftDownHeat = { "defaultTemperature": this.state.leftDownHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature };
	            //四区右下
	            var rightDownHeat = { "defaultTemperature": this.state.rightDownHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature };
	            /**
	            <header className={this.state.switchStatus === 2 ? "header shut-down-color" : "header"}>
	                    <div className="header-left">
	                        <span className="icon-back"></span>
	                    </div>
	                    <div className="header-center">
	                        <h1>享睡水暖垫</h1>
	                    </div>
	                    <div className="header-right"></div>
	            </header>
	            **/
	            return React.createElement(
	                'div',
	                { className: 'content' },
	                this.state.errorFlag ? React.createElement(
	                    'div',
	                    { className: 'error-flag' },
	                    React.createElement(
	                        'h1',
	                        null,
	                        this.state.errorFlag
	                    ),
	                    React.createElement('div', { className: 'mask' })
	                ) : "",
	                React.createElement(
	                    'div',
	                    { className: 'slide clear' },
	                    this.state.hint === 1 ? React.createElement(
	                        'div',
	                        { className: 'slide-tips' },
	                        React.createElement('i', { className: 'icon-litle-white-circle' }),
	                        '\u6C34\u4F4D\u8FC7\u4F4E\uFF0C\u8BF7\u6CE8\u610F\u52A0\u6C34\uFF01'
	                    ) : "",
	                    this.state.hint === 2 || this.state.hint === 3 ? React.createElement(
	                        'div',
	                        { className: 'slide-tips' },
	                        React.createElement('i', { className: 'icon-litle-white-circle' }),
	                        '\u8BBE\u5907\u6E29\u5EA6\u8FC7\u9AD8\uFF0C\u8BF7\u786E\u4FDD\u8BBE\u5907\u5DE5\u4F5C\u6B63\u5E38\uFF01'
	                    ) : "",
	                    React.createElement(
	                        'div',
	                        { className: 'slide-blanket' },
	                        React.createElement(
	                            'em',
	                            null,
	                            '\u6C34\u6696\u5668'
	                        ),
	                        this.state.size === 4 ? //暂时只有2区
	                        React.createElement(
	                            'div',
	                            { className: 'slide-blanket-four' },
	                            React.createElement(
	                                'div',
	                                { className: 'slide-blanket-img' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u5DE6\u4E0AA'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u53F3\u4E0AB'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u5DE6\u4E0BC'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u53F3\u4E0AD'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'slide-blanket-type' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'A\u533A\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        '28\xB0C'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'A\u533A\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        '28\xB0C'
	                                    )
	                                ),
	                                React.createElement('br', null),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'A\u533A\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        '28\xB0C'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'A\u533A\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        '28\xB0C'
	                                    )
	                                )
	                            )
	                        ) : React.createElement(
	                            'div',
	                            { className: 'slide-blanket-two' },
	                            React.createElement(
	                                'div',
	                                { className: 'slide-blanket-img' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u5DE6A'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u53F3B'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'slide-blanket-type' },
	                                this.state.modeStatus === 1 ? React.createElement(
	                                    'span',
	                                    null,
	                                    '\u6574\u673A\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        this.state.allHeatTemp,
	                                        '\xB0C'
	                                    )
	                                ) : "",
	                                this.state.modeStatus === 2 ? React.createElement(
	                                    'div',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        'A\u533A\u6E29\u5EA6',
	                                        React.createElement(
	                                            'strong',
	                                            null,
	                                            this.state.leftHeatTemp,
	                                            '\xB0C'
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        'B\u533A\u6E29\u5EA6',
	                                        React.createElement(
	                                            'strong',
	                                            null,
	                                            this.state.rightHeatTemp,
	                                            '\xB0C'
	                                        )
	                                    )
	                                ) : "",
	                                this.state.modeStatus === 3 ? React.createElement(
	                                    'span',
	                                    null,
	                                    '\u7761\u7720\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        this.state.sleepModeDownTemp,
	                                        '\xB0C'
	                                    )
	                                ) : "",
	                                this.state.modeStatus === 4 ? React.createElement(
	                                    'span',
	                                    null,
	                                    '\u9664\u87A8\u6E29\u5EA6',
	                                    React.createElement(
	                                        'strong',
	                                        null,
	                                        '60\xB0C'
	                                    )
	                                ) : ""
	                            )
	                        )
	                    ),
	                    React.createElement('span', { className: 'slide-switch', onTouchTap: this.changeEquipment.bind(this, 2) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'modle' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '\u6A21\u5F0F'
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'box-hori' },
	                        MODLELIST.map(function (item, index) {
	                            return React.createElement(
	                                'li',
	                                { className: parseInt(_this3.state.modeStatus) - 1 === index ? "box-hori-4 active" : "box-hori-4", key: index, onTouchTap: _this3.handleModle.bind(_this3, index + 1) },
	                                item
	                            );
	                        })
	                    )
	                ),
	                parseInt(this.state.modeStatus) === 1 ? React.createElement(
	                    'div',
	                    { className: 'temperature-content total-content' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '\u6574\u673A\u6E29\u5EA6'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'total-temperature' },
	                        React.createElement(TemperatureBox, { temperature: allHeatTemp, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) })
	                    )
	                ) : "",
	                parseInt(this.state.modeStatus) === 2 ? React.createElement(
	                    'div',
	                    { className: 'temperature-content partition-content' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '\u5206\u533A\u6E29\u5EA6'
	                    ),
	                    this.state.size === 2 ? React.createElement(
	                        'ul',
	                        { className: 'partition-temperature box-hori' },
	                        React.createElement(
	                            'li',
	                            { className: 'box-hori-2' },
	                            React.createElement(TemperatureBox, { temperature: leftHeatTemp, handleReduce: this.reduceTemperature.bind(this, 'left'), handleAdd: this.addTemperature.bind(this, 'left') }),
	                            React.createElement(
	                                'em',
	                                null,
	                                '\u5DE6A'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'box-hori-2' },
	                            React.createElement(TemperatureBox, { temperature: rightHeatTemp, handleReduce: this.reduceTemperature.bind(this, 'right'), handleAdd: this.addTemperature.bind(this, 'right') }),
	                            React.createElement(
	                                'em',
	                                null,
	                                '\u53F3B'
	                            )
	                        )
	                    ) : React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'ul',
	                            { className: 'partition-temperature partition-temperature-border box-hori' },
	                            React.createElement(
	                                'li',
	                                { className: 'box-hori-2' },
	                                React.createElement(TemperatureBox, { temperature: leftUpperHeat, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) }),
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u5DE6\u4E0AA'
	                                )
	                            ),
	                            React.createElement(
	                                'li',
	                                { className: 'box-hori-2' },
	                                React.createElement(TemperatureBox, { temperature: rightUpperHeat, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) }),
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u53F3\u4E0AB'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'partition-temperature box-hori' },
	                            React.createElement(
	                                'li',
	                                { className: 'box-hori-2' },
	                                React.createElement(TemperatureBox, { temperature: leftDownHeat, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) }),
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u5DE6\u4E0BC'
	                                )
	                            ),
	                            React.createElement(
	                                'li',
	                                { className: 'box-hori-2' },
	                                React.createElement(TemperatureBox, { temperature: rightDownHeat, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) }),
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u53F3\u4E0AD'
	                                )
	                            )
	                        )
	                    )
	                ) : "",
	                parseInt(this.state.modeStatus) === 3 ? React.createElement(
	                    'div',
	                    { className: 'temperature-content partition-content' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '\u7761\u7720\u6E29\u5EA6'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'total-temperature' },
	                        React.createElement(TemperatureBox, { temperature: sleepModeDownTemp, handleReduce: this.reduceTemperature.bind(this), handleAdd: this.addTemperature.bind(this) })
	                    )
	                ) : "",
	                parseInt(this.state.modeStatus) === 4 ? React.createElement(
	                    'div',
	                    { className: 'temperature-content total-content' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '\u9664\u87A8\u6E29\u5EA6'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'total-temperature' },
	                        React.createElement(TemperatureBox, null)
	                    )
	                ) : "",
	                React.createElement(
	                    'div',
	                    { className: 'modle-content-list clear appointment' },
	                    '\u9884\u7EA6 ',
	                    React.createElement(Switch, { disabled: this.state.disabledSwitch, fnFeedback: this.handleSwitch.bind(this) }),
	                    !this.state.appointmentBtn ? React.createElement('div', { className: 'appointment-mask' }) : ""
	                ),
	                this.state.disabledSwitch ? React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'modle-content-list clear start-up-time', onClick: this.handleStart.bind(this) },
	                        '\u542F\u52A8\u65F6\u95F4',
	                        this.state.startAppointmentBtn ? React.createElement(
	                            'span',
	                            null,
	                            this.state.remainStartupHour,
	                            '\u5C0F\u65F6',
	                            this.state.remainStartupMin,
	                            '\u5206\u540E\u5F00\u673A'
	                        ) : React.createElement('i', { className: 'icon-arrow' }),
	                        !this.state.appointmentBtn ? React.createElement('div', { className: 'appointment-mask' }) : ""
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'modle-content-list clear closing-time', onClick: this.handleCloseing.bind(this) },
	                        '\u5173\u95ED\u65F6\u95F4',
	                        this.state.closeAppointmentBtn ? React.createElement(
	                            'span',
	                            null,
	                            this.state.remainShutdownHour,
	                            '\u5C0F\u65F6',
	                            this.state.remainShutdownMin,
	                            '\u5206\u540E\u5173\u673A'
	                        ) : React.createElement('i', { className: 'icon-arrow' }),
	                        !this.state.appointmentBtn ? React.createElement('div', { className: 'appointment-mask' }) : ""
	                    )
	                ) : "",
	                this.state.switchStatus === 2 ? React.createElement(
	                    'div',
	                    { className: 'shut-down fade-in' },
	                    React.createElement('span', { className: 'shut-down-blanket' }),
	                    this.state.startAppointmentBtn ? React.createElement(
	                        'div',
	                        { className: 'shut-down-time' },
	                        React.createElement(
	                            'span',
	                            { className: 'shut-down-time-text' },
	                            '\u9884\u7EA6',
	                            this.state.remainStartupHour,
	                            '\u5C0F\u65F6',
	                            this.state.remainStartupMin,
	                            '\u5206\u949F\u540E\u5F00\u673A'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'shut-down-open', onClick: this.handleAppointmentBoot.bind(this) },
	                            '\u53D6\u6D88\u9884\u7EA6\u5F00\u673A'
	                        )
	                    ) : React.createElement(
	                        'div',
	                        { className: 'shut-down-time' },
	                        React.createElement(
	                            'span',
	                            { className: 'shut-down-open', onClick: this.handleAppointmentBoot.bind(this) },
	                            '\u8BBE\u7F6E\u9884\u7EA6\u5F00\u673A'
	                        )
	                    ),
	                    React.createElement('span', { className: 'shut-down-switch', onClick: this.changeEquipment.bind(this, 1) })
	                ) : "",
	                React.createElement(_TimeSelect.TimeSelect, { show: this.state.selectTimeBtn, arrayInit: false, minutestep: 10, minutearr: this.state.minuteArr, defaultminute: this.state.defaultMinute, defaulthour: this.state.defaultHour, cancelClock: this.cancelClock.bind(this), submitClock: this.submitClock.bind(this) })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	var Switch = function (_BaseComponent2) {
	    _inherits(Switch, _BaseComponent2);

	    function Switch(props) {
	        _classCallCheck(this, Switch);

	        var _this4 = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

	        _this4.state = {};
	        return _this4;
	    }

	    _createClass(Switch, [{
	        key: 'handleTap',
	        value: function handleTap() {
	            var disabled = this.props.disabled ? false : true;
	            if (this.props.fnFeedback) {
	                this.props.fnFeedback(disabled);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'span',
	                { className: this.props.disabled ? "het-switch het-switch-on" : "het-switch", onClick: this.handleTap.bind(this) },
	                React.createElement('em', null)
	            );
	        }
	    }]);

	    return Switch;
	}(_BaseComponentClass.BaseComponent);

	var TemperatureBox = function (_BaseComponent3) {
	    _inherits(TemperatureBox, _BaseComponent3);

	    function TemperatureBox(props) {
	        _classCallCheck(this, TemperatureBox);

	        return _possibleConstructorReturn(this, (TemperatureBox.__proto__ || Object.getPrototypeOf(TemperatureBox)).call(this, props));
	    }

	    _createClass(TemperatureBox, [{
	        key: 'add',
	        value: function add() {
	            var tempData = this.props.temperature;
	            if (this.props.handleAdd && tempData) {
	                tempData.defaultTemperature >= tempData.maxTemperature ? console.log("温度已到最高") : this.props.handleAdd();
	            }
	        }
	    }, {
	        key: 'reduce',
	        value: function reduce() {
	            var tempData = this.props.temperature;
	            var btn = tempData.btn ? true : false;
	            if (this.props.handleReduce && tempData) {
	                if (tempData.btn) {
	                    tempData.defaultTemperature === 0 ? console.log("温度已到最低") : this.props.handleReduce();
	                } else {
	                    tempData.defaultTemperature <= tempData.minTemperature ? console.log("温度已到最低") : this.props.handleReduce();
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var tempData = this.props.temperature;
	            var btn2 = false;
	            var defaultTemperature = 60;
	            var maxTemperature = 60;
	            var minTemperature = 60;
	            if (tempData) {
	                var btn = tempData.btn ? true : false;

	                if (btn && tempData.defaultTemperature !== 0) btn2 = true;
	                defaultTemperature = tempData.defaultTemperature;
	                maxTemperature = tempData.maxTemperature;
	                minTemperature = tempData.minTemperature;
	            }

	            return React.createElement(
	                'div',
	                null,
	                !tempData ? React.createElement(
	                    'div',
	                    null,
	                    React.createElement('span', { className: 'temperature-reduce no-tap-reduce' }),
	                    React.createElement(
	                        'span',
	                        { className: 'temperature-txt' },
	                        defaultTemperature,
	                        React.createElement(
	                            'i',
	                            null,
	                            '\xB0C'
	                        )
	                    ),
	                    React.createElement('span', { className: 'temperature-add  no-tap-add' })
	                ) : React.createElement(
	                    'div',
	                    null,
	                    React.createElement('span', { className: btn2 || defaultTemperature > minTemperature ? "temperature-reduce" : "temperature-reduce no-tap-reduce", onTouchTap: this.reduce.bind(this) }),
	                    React.createElement(
	                        'span',
	                        { className: 'temperature-txt' },
	                        defaultTemperature,
	                        React.createElement(
	                            'i',
	                            null,
	                            '\xB0C'
	                        )
	                    ),
	                    React.createElement('span', { className: defaultTemperature >= maxTemperature ? "temperature-add  no-tap-add" : "temperature-add", onTouchTap: this.add.bind(this) })
	                )
	            );
	        }
	    }]);

	    return TemperatureBox;
	}(_BaseComponentClass.BaseComponent);

	var connnectLocalStorage = function connnectLocalStorage() {
	    return function (comp) {
	        return function (_BaseComponent4) {
	            _inherits(connectComponent, _BaseComponent4);

	            function connectComponent(props) {
	                _classCallCheck(this, connectComponent);

	                return _possibleConstructorReturn(this, (connectComponent.__proto__ || Object.getPrototypeOf(connectComponent)).call(this, props));
	            }

	            _createClass(connectComponent, [{
	                key: 'render',
	                value: function render() {
	                    return React.createElement(Comp, null);
	                }
	            }]);

	            return connectComponent;
	        }(_BaseComponentClass.BaseComponent);
	    };
	};

	// 开始渲染
	het.domReady(function () {
	    het.setTitle('享睡水暖垫');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 路由方式
	    /*ReactDOM.render((
	        <Router history={hashHistory}>
	            <Route path="/" component={App} />
	        </Router>
	    ), document.getElementById('ROOT'));*/
	});

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

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['getData', // 微信授权，接收到数据，重新渲染
	'changeTotalTemperature', //改变整机温度
	'changeSleepTemperature', //改变睡眠温度
	'changePartitionTemperature', //改变2分区温度
	'changeMode', // 调节模式
	'changeStartUp', // 改变开始时间
	'changeClosing', // 改变结束时间
	'changeEquipment', //开关机
	'changeAppointment', //预约
	'bootAppointment']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境

	var source = 8; // 来源
	var postUrl = path + '/device/config/set';

	//定时器变量，用来控制连续下发控制
	var _timer1 = void 0,
	    _timer2 = void 0,
	    _timer3 = void 0;

	var deviceId = void 0,
	    debug = true,
	    //测试标志
	AppData = {
	    size: 2, //二区，四区  暂时只有二区
	    maxTotalTemperature: 55, //最大整机温度
	    minTotalTemperature: 30, //最小整机温度
	    maxPartitionTemperature: 55, //分区最高温度
	    minPartitionTemperature: 30, //分区最低温度
	    defaultPartitionTemperature: 40, //分区默认温度
	    maxSleepTemperature: 45, //睡眠模式最大温度
	    minSleepTemperature: 35, //睡眠模式最小温度
	    defaultSleepTemperature: 38, //睡眠温度默认设置为38°
	    startAppointmentBtn: false, //预约开机时间开关
	    closeAppointmentBtn: false, //预约关机时间开关
	    errorFlag: "", //设备是否在线
	    allHeatTemp: 40,
	    hint: 0,
	    leftHeatTemp: 40,
	    modeStatus: 1
	};

	// 数据过滤计时器
	var dataFilterTimers = {};

	// 返回过滤后的数据
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	}

	// 设置过滤器过期时间
	function setDataTimer() {
	    var time = new Date().getTime() + 20e3; // 20秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	var deepExtend = function deepExtend(out) {
	    out = out || {};

	    for (var i = 1; i < arguments.length; i++) {
	        var obj = arguments[i];

	        if (!obj) continue;

	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                if (_typeof(obj[key]) === 'object') out[key] = deepExtend(out[key], obj[key]);else out[key] = obj[key];
	            }
	        }
	    }

	    return out;
	};

	//ajax
	var ajax = function ajax(method, url, data, success) {
	    var xhr = null;

	    try {
	        xhr = new XMLHttpRequest();
	    } catch (e) {
	        xhr = new ActiveXObject('Microsoft.XMLHTTP');
	    }

	    if (method == 'get' && data) {
	        url += '?' + data;
	    }

	    xhr.open(method, url, true);

	    if (method == 'get') {
	        xhr.send();
	    } else {
	        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	        xhr.send(data);
	    }

	    xhr.onreadystatechange = function () {
	        if (xhr.readyState == 4) {
	            if (xhr.status === 200) {
	                success && success(xhr.responseText);
	            } else {
	                console.log('出错了' + xhr.status);
	            }
	        }
	    };
	};

	var getDeviceId = function getDeviceId(roomId, fn) {
	    ajax('get', path + '/getRoomDevices?roomId=' + roomId, null, function (res) {
	        var resData = JSON.parse(res);
	        if (resData.code == 0) {
	            console.log(res);
	            //console.log("deviceId:" + resData.data[0].deviceId);
	            //deviceId = resData.data[0].deviceId;
	            //固定设备id
	            deviceId = resData.data.deviceId;
	            fn ? fn.call(this, deviceId) : console.log('error callback');
	        } else {
	            console.log(res);
	        }
	    });
	};

	//微信授权
	var setWechat = function setWechat(wechatUserId, roomId, fn) {

	    //设置微信id
	    _fun.Funs.setCookie('wechatUserId', wechatUserId);

	    var wechatId = _fun.Funs.getCookie("wechatUserId");

	    if (wechatId == "" || wechatId == null || wechatId == undefined) {
	        var url = path + "/user/login?format=json&type=1&redirect=" + location.href;
	        window.location.href = url;
	    } else {

	        //设置微信Token
	        ajax('get', path + '/getToken', null, function (res) {
	            var resData = JSON.parse(res);
	            if (resData.code == 0) {
	                var data = resData.data;
	                console.log(data);
	                if (!data) {
	                    het.toast('请重新扫码');
	                }
	                _fun.Funs.setCookie('accessToken', data);
	                getDeviceId(roomId, fn);
	            }
	        });
	    }
	    /**
	     * [获取设备deviceId]
	     * @param  {[type]} roomId [description]
	     * @return {[type]}        [description]
	     * 
	     */
	};
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    //获取数据
	    onGetData: function onGetData(bool, fn) {
	        var _this = this;

	        var analysisData = function analysisData(fn) {
	            deviceId = _fun.Funs.getUrlParam('deviceId');
	            if (!deviceId) {
	                alert('没有设备id');
	                return false;
	            }
	            //let url = `${path}/device/data/get?deviceId=${deviceId}`;

	            het.get(path + "/device/data/get?deviceId=" + deviceId, {}, function (res) {
	                var data = JSON.parse(res);
	                console.log(data);
	                if (data.code === 0) {
	                    if (!data.data) {
	                        het.toast('没有设备');
	                        return false;
	                    }
	                    // Object.assign(AppData,data.data);
	                    deepExtend(AppData, data.data);
	                    //初始变量控制
	                    if (AppData.remainStartupHour === 0 && AppData.remainStartupMin === 0) AppData.startAppointmentBtn = false; //无效时间
	                    else AppData.startAppointmentBtn = true; //有效时间


	                    if (AppData.remainShutdownHour === 0 && AppData.remainShutdownMin === 0) AppData.closeAppointmentBtn = false;else AppData.closeAppointmentBtn = true;

	                    AppData = dataFilter(AppData);

	                    _this.trigger(AppData);

	                    //数据处理
	                    if (fn) fn();
	                } else {
	                    AppData.errorFlag = data.msg;
	                    AppData = dataFilter(AppData);
	                    _this.trigger(AppData);
	                    //数据处理
	                    if (fn) fn();
	                }
	            });
	        };

	        if (debug) {
	            //测试
	            //第一次初始化页面，设置一些初始变量
	            if (bool) {

	                //wechatUserId，accessToken在设备列表页面设置
	                var wechatId = _fun.Funs.getCookie("wechatUserId"),
	                    accessToken = _fun.Funs.getCookie("accessToken");

	                getDeviceId(wechatId, function () {
	                    analysisData.call(this, fn);
	                });
	            } else {
	                analysisData.call(this);
	            }

	            //analysisData.call(this,fn);
	        } else {
	            //开发
	            //第一次初始化页面，设置一些初始变量
	            if (bool) {
	                /**
	                 * [微信授权]
	                 * @param    10333 微信  18672 房间号                     
	                 * @return {[type]}  
	                 */
	                setWechat(10333, 18672, function () {
	                    analysisData.call(this, fn);
	                });
	            } else {
	                analysisData.call(this);
	            }
	        }
	    },

	    //开关机
	    onChangeEquipment: function onChangeEquipment(i, bool) {
	        setDataTimer('switchStatus');

	        var jsonData = void 0;
	        if (bool) {
	            //开机时模式为1,设置温度为默认温度40
	            setDataTimer('leftHeatTemp', "rightHeatTemp", 'modeStatus');
	            this.trigger({ switchStatus: 1, modeStatus: 2, leftHeatTemp: 40, rightHeatTemp: 40 });
	            jsonData = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    switchStatus: 1,
	                    modeStatus: 2,
	                    leftHeatTemp: 40,
	                    rightHeatTemp: 40,
	                    updateFlag: "00000303"
	                })
	            };
	        } else {
	            this.trigger({ switchStatus: i });
	            jsonData = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    switchStatus: i,
	                    updateFlag: "00000001"
	                })
	            };
	        }

	        het.post(postUrl, jsonData, function (res) {
	            var data = JSON.parse(res);
	            if (parseInt(data.code) === 0) {} else {
	                dataFilterTimers['switchStatus'] = 0;
	                if (bool) {
	                    dataFilterTimers['leftHeatTemp'] = 0;
	                    dataFilterTimers['rightHeatTemp'] = 0;
	                    dataFilterTimers['modeStatus'] = 0;
	                }
	            }
	        });
	    },

	    //模式
	    onChangeMode: function onChangeMode(i, obj) {

	        var json = {};
	        switch (i) {
	            case 1:
	                setDataTimer('modeStatus', 'allHeatTemp');
	                json.modeStatus = i;
	                json.allHeatTemp = obj.allHeatTemp;
	                json.updateFlag = "00000002";
	                this.trigger({ "modeStatus": i, allHeatTemp: obj.allHeatTemp });
	                break;
	            case 2:
	                setDataTimer('modeStatus', 'leftHeatTemp', 'rightHeatTemp');
	                json.modeStatus = i;
	                json.leftHeatTemp = obj.leftHeatTemp;
	                json.rightHeatTemp = obj.rightHeatTemp;
	                json.updateFlag = "00000302";
	                this.trigger({ "modeStatus": i, leftHeatTemp: obj.leftHeatTemp, rightHeatTemp: json.rightHeatTemp });
	                break;
	            case 3:
	                setDataTimer('modeStatus', 'sleepModeUpTemp', 'sleepModeDownTemp');
	                json.modeStatus = i;
	                json.sleepModeUpTemp = obj.sleepModeUpTemp;
	                json.sleepModeDownTemp = obj.sleepModeUpTemp;
	                json.updateFlag = "00000C02";
	                this.trigger({ "modeStatus": i, sleepModeUpTemp: obj.sleepModeUpTemp, sleepModeDownTemp: obj.sleepModeUpTemp });

	                break;
	            case 4:
	                setDataTimer('modeStatus', 'allHeatTemp');
	                json.modeStatus = i;
	                json.allHeatTemp = obj.allHeatTemp;
	                json.updateFlag = "00000002";
	                this.trigger({ "modeStatus": i, allHeatTemp: obj.allHeatTemp });
	                break;
	        }

	        var jsonData = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify(json)
	        };

	        het.post(postUrl, jsonData, function (res) {
	            var data = JSON.parse(res);
	            if (parseInt(data.code) === 0) {} else {
	                dataFilterTimers['modeStatus'] = 0;
	                dataFilterTimers['allHeatTemp'] = 0;
	                dataFilterTimers['leftHeatTemp'] = 0;
	                dataFilterTimers['rightHeatTemp'] = 0;
	                dataFilterTimers['sleepModeUpTemp'] = 0;
	                dataFilterTimers['sleepModeDownTemp'] = 0;
	            }
	        });
	    },

	    //改变整机温度
	    onChangeTotalTemperature: function onChangeTotalTemperature(temp) {
	        this.trigger({ allHeatTemp: temp });
	        clearTimeout(_timer1);
	        _timer1 = setTimeout(function () {
	            setDataTimer('allHeatTemp');
	            var data = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    modeStatus: 1,
	                    allHeatTemp: temp,
	                    updateFlag: "00000002"
	                })
	            };

	            het.post(postUrl, data, function (res) {
	                var data = JSON.parse(res);
	                if (parseInt(data.code) === 0) {} else {
	                    dataFilterTimers['allHeatTemp'] = 0;
	                }
	            });
	        }, 2000);
	    },

	    //改变睡眠温度
	    onChangeSleepTemperature: function onChangeSleepTemperature(temp) {

	        this.trigger({ sleepModeUpTemp: temp, sleepModeDownTemp: temp });

	        clearTimeout(_timer2);

	        _timer2 = setTimeout(function () {
	            var dataFilterArr = ['sleepModeUpTemp', 'sleepModeDownTemp'];
	            setDataTimer('sleepModeUpTemp', 'sleepModeDownTemp');

	            var data = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    modeStatus: 3,
	                    sleepModeUpTemp: temp,
	                    sleepModeDownTemp: temp,
	                    updateFlag: "00000C02"
	                })
	            };

	            het.post(postUrl, data, function (res) {
	                var data = JSON.parse(res);
	                if (parseInt(data.code) === 0) {} else {
	                    dataFilterArr.forEach(function (item, index, arr) {
	                        dataFilterTimers[item] = 0;
	                    });
	                }
	            });
	        }, 2000);
	    },

	    //改变分区温度
	    onChangePartitionTemperature: function onChangePartitionTemperature(temp, position) {
	        this.trigger({ leftHeatTemp: temp.leftHeatTemp, rightHeatTemp: temp.rightHeatTemp });

	        clearTimeout(_timer3);
	        _timer3 = setTimeout(function () {
	            var dataFilterArr = ['leftHeatTemp', 'rightHeatTemp'];
	            setDataTimer('leftHeatTemp', 'rightHeatTemp');

	            var jsonData = void 0;
	            if (temp.leftHeatTemp === 0 && temp.rightHeatTemp === 0) {
	                jsonData = {
	                    deviceId: deviceId,
	                    source: source,
	                    json: JSON.stringify({
	                        modeStatus: 2,
	                        leftHeatTemp: 0,
	                        rightHeatTemp: 0,
	                        updateFlag: "00000203"
	                    })
	                };
	            } else if (position === "left") {
	                //左边
	                jsonData = {
	                    deviceId: deviceId,
	                    source: source,
	                    json: JSON.stringify({
	                        modeStatus: 2,
	                        leftHeatTemp: temp.leftHeatTemp,
	                        rightHeatTemp: temp.rightHeatTemp,
	                        updateFlag: "00000102"
	                    })
	                };
	            } else if (position === "right") {
	                jsonData = {
	                    deviceId: deviceId,
	                    source: source,
	                    json: JSON.stringify({
	                        modeStatus: 2,
	                        leftHeatTemp: temp.leftHeatTemp,
	                        rightHeatTemp: temp.rightHeatTemp,
	                        updateFlag: "00000202"
	                    })
	                };
	            }

	            het.post(postUrl, jsonData, function (res) {
	                var data = JSON.parse(res);
	                if (parseInt(data.code) === 0) {} else {
	                    dataFilterArr.forEach(function (item, index, arr) {
	                        dataFilterTimers[item] = 0;
	                    });
	                }
	            });
	        }, 2000);
	    },

	    //开启预约时间
	    onChangeAppointment: function onChangeAppointment(bool) {
	        var _this2 = this;

	        if (!bool) {
	            (function () {
	                var dataFilterArr = ['startAppointmentBtn', 'closeAppointmentBtn', 'startupHour', 'startupMin', 'shutdownHour', 'shutdownMin', 'remainStartupHour', 'remainStartupMin', 'remainShutdownHour', 'remainStartupMin'];

	                setDataTimer('startAppointmentBtn', 'closeAppointmentBtn', 'startupHour', 'startupMin', 'shutdownHour', 'shutdownMin', 'remainStartupHour', 'remainStartupMin', 'remainShutdownHour', 'remainStartupMin');

	                _this2.trigger(_defineProperty({
	                    startAppointmentBtn: false,
	                    closeAppointmentBtn: false,
	                    startupHour: 255,
	                    startupMin: 255,
	                    shutdownHour: 255,
	                    shutdownMin: 255,
	                    remainStartupHour: 0,
	                    remainStartupMin: 0,
	                    remainShutdownHour: 0
	                }, 'remainStartupMin', 0));
	                var data = {
	                    deviceId: deviceId,
	                    source: source,
	                    json: JSON.stringify({
	                        startupHour: 255,
	                        startupMin: 255,
	                        shutdownHour: 255,
	                        shutdownMin: 255,
	                        updateFlag: "000000C0"
	                    })
	                };

	                het.post(postUrl, data, function (res) {
	                    var data = JSON.parse(res);
	                    if (parseInt(data.code) === 0) {} else {
	                        dataFilterArr.forEach(function (item, index, arr) {
	                            dataFilterTimers[item] = 0;
	                        });
	                    }
	                });
	            })();
	        } else {
	            setDataTimer('startAppointmentBtn', 'closeAppointmentBtn');
	            this.trigger({ startAppointmentBtn: false, closeAppointmentBtn: false });
	        }
	    },

	    //关机状态下的启动时间
	    bootAppointment: function bootAppointment(time, bool) {
	        var dataFilterArr = ['startupHour', 'startupMin', 'startAppointmentBtn', 'remainStartupHour', 'remainStartupMin'];
	        setDataTimer('startupHour', 'startupMin', 'startAppointmentBtn', 'remainStartupHour', 'remainStartupMin');
	        var jsonData = void 0;
	        if (bool) {
	            //关
	            this.trigger({ startAppointmentBtn: false, startupHour: 255, startupMin: 255, remainStartupHour: 0, remainStartupMin: 0 });
	            jsonData = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    switchStatus: 2,
	                    startupHour: 255,
	                    startupMin: 255,
	                    updateFlag: "00000041"
	                })
	            };
	        } else {
	            //开
	            this.trigger({
	                startAppointmentBtn: true,
	                startupHour: time.startupHour,
	                startupMin: time.startupMin,
	                remainStartupHour: time.startupHour,
	                remainStartupMin: time.startupMin
	            });
	            jsonData = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    switchStatus: 2,
	                    startupHour: time.startupHour,
	                    startupMin: time.startupMin,
	                    updateFlag: "00000041"
	                })
	            };
	        }

	        het.post(postUrl, jsonData, function (res) {
	            var data = JSON.parse(res);
	            if (parseInt(data.code) === 0) {} else {
	                dataFilterArr.forEach(function (item, index, arr) {
	                    dataFilterTimers[item] = 0;
	                });
	            }
	        });
	    },

	    //预约启动时间
	    onChangeStartUp: function onChangeStartUp(time) {
	        var dataFilterArr = ['startupHour', 'startupMin', 'startAppointmentBtn', 'remainStartupHour', 'remainStartupMin'];
	        setDataTimer('startupHour', 'startupMin', 'startAppointmentBtn', 'remainStartupHour', 'remainStartupMin');
	        this.trigger({
	            startAppointmentBtn: true,
	            remainStartupHour: time.startupHour,
	            remainStartupMin: time.startupMin,
	            startupHour: time.startupHour,
	            startupMin: time.startupMin
	        });
	        var jsonData = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                startupHour: time.startupHour,
	                startupMin: time.startupMin,
	                updateFlag: "00000040"
	            })
	        };

	        het.post(postUrl, jsonData, function (res) {
	            var data = JSON.parse(res);
	            if (parseInt(data.code) === 0) {} else {
	                dataFilterArr.forEach(function (item, index, arr) {
	                    dataFilterTimers[item] = 0;
	                });
	            }
	        });
	    },

	    //预约关闭时间
	    onChangeClosing: function onChangeClosing(time) {
	        var dataFilterArr = ['shutdownHour', 'shutdownMin', 'closeAppointmentBtn', 'remainShutdownHour', 'remainShutdownMin'];
	        setDataTimer('shutdownHour', 'shutdownMin', 'closeAppointmentBtn', 'remainShutdownHour', 'remainShutdownMin');
	        this.trigger({
	            closeAppointmentBtn: true,
	            remainShutdownHour: time.shutdownHour,
	            remainShutdownMin: time.shutdownMin,
	            shutdownHour: time.shutdownHour,
	            shutdownMin: time.shutdownMin
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                shutdownHour: time.shutdownHour,
	                shutdownMin: time.shutdownMin,
	                updateFlag: "00000080"
	            })
	        };

	        het.post(postUrl, data, function (res) {
	            var data = JSON.parse(res);
	            if (parseInt(data.code) === 0) {} else {
	                dataFilterArr.forEach(function (item, index, arr) {
	                    dataFilterTimers[item] = 0;
	                });
	            }
	        });
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(7);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;
				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { display: this.state.timeDisplay ? "block" : "none", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u5C0F\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206\u949F'
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					),
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onClick: this.submitclock },
							'\u786E\u5B9A'
						)
					)
				)
			);
		}
	});

/***/ }
/******/ ]);