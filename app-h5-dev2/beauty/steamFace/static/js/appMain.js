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

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'refreshData', 'clockSwitch', //定时开关
	'selectTime', //选取定时时间
	'switchMode', 'switchModeHand', 'addMinue', 'setTimeFromApp', 'selectTimeArr', 'opeenOrClose', 'changeDeviceStatus', 'setEditing', 'showMaxminute']);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _TimeSelect = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(7);

	var _closePage = __webpack_require__(10);

	var _editing = __webpack_require__(12);

	var _diffusionTwo = __webpack_require__(13);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {},
	        renderConfigData: true, //开启控制数据渲染
	        filter: {
	            'deviceStatus': 0, //仅取控制数据
	            'hotSpray1': 1,
	            'hotSpray2': 1,
	            'hotSpray3': 1,
	            'coldSpray1': 1,
	            'coldSpray2': 1,
	            'coldSpray3': 1,
	            'hotSpray1Leave': 1,
	            'hotSpray2Leave': 1,
	            'hotSpray3Leave': 1,
	            'coldSpray1Leave': 1,
	            'coldSpray2Leave': 1,
	            'coldSpray3Leave': 1,
	            'workMinutes': 1,
	            'workSeconds': 1,
	            'smartModeSwitch': 1,
	            'modeName': 1,
	            'deviceMode': 1,
	            'power': function power(type, data) {
	                if (type === 0 && data.workMinutes === 0 && data.workSeconds === 0) {
	                    return false;
	                } else {
	                    return true;
	                }
	            }
	        }
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        var _this$state;

	        _classCallCheck(this, App);

	        //roundIndex 当前选择模式名称的index
	        //Xvalue  value 是滑动的刻度值
	        //smartModeSwitch  智能模式开关 0手动 1自动
	        //deviceMode 智能推荐时传的数据 和手动模式时使用的数据
	        //deviceModeIndex 手动模式时设备模式
	        //modeName app传过来的模式名称
	        //deviceType 用来区分是点击模式名称或者是设备模式
	        //hotSpray1Leave ,coldSpary1Leave 热敷冷敷的时间值
	        //onOff 1关机  2 开机 用户点击改变设备工作状态 只点击开关按钮时才能改变值1 or 2 其它情况下下发 0 给app
	        //deviceStatus 工作状态 0: 上电 1: 睡眠 2: 关机 3: 待机 4: 工作
	        //cbeauty_steamFace_save 保存按钮
	        //cbeauty_steamFace_set 设置按钮
	        //handTimeArr 用于保存时间值传编辑页面
	        //modArr 判断时间组件中选择时间是显示还是隐藏
	        //hotAndCold 用于判断显示热喷或冷喷
	        //hotTure 切换模式时用来显示热喷的值

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = (_this$state = { roundIndex: -1, Xvalue: 0, value: 0, oldValue: 0, valueM: 0, valueH: 0, disableEvent: false, smartModeSwitch: 0, deviceMode: 0, deviceModeIndex: 1, modeName: 10, deviceType: null, hotSpray1Leave: 0, hotSpray2Leave: 0, hotSpray3Leave: 0, coldSpray1Leave: 0, coldSpray2Leave: 0, coldSpray3Leave: 0, workMinutes: 0, workSeconds: 0, deviceModeIndexThree: 7, cbeauty_steamFace_save: 0, cbeauty_steamFace_set: "set", modArr: null, myAllTime: null, timeshow: false, deviceStatus: 4, onlineStatus: 1, skinTypeName: null, hotTure: false, smartModeSwitch_text: null, recomondConfig: { modeName: 0, deviceMode: 0, hotSpray1: 0, hotSpray2: 0, hotSpray3: 0, coldSpray1: 0, coldSpray2: 0, coldSpray3: 0 }, skinDataCode: 0 }, _defineProperty(_this$state, 'skinTypeName', null), _defineProperty(_this$state, 'hotSpray1', 0), _defineProperty(_this$state, 'hotSpray2', 0), _defineProperty(_this$state, 'hotSpray3', 0), _defineProperty(_this$state, 'coldSpray1', 0), _defineProperty(_this$state, 'coldSpray2', 0), _defineProperty(_this$state, 'coldSpray3', 0), _this$state);

	        _this.listenStore(_Store.Store); // 监听Store

	        //模式名称 10我的模式可以编辑时间  当modeName为16时要显示App传我的设备模式
	        _this.modeNameItems = [{ modeName: 1, name: "弹力修护", explain: "富有活力的弹力肌肤，抵御干燥" }, { modeName: 2, name: "皮肤清洁", explain: "肌肤更加洁净透亮" }, { modeName: 3, name: "快速温热", explain: "快速温热护理，促进护肤品吸收" }, //快速温热1 手动模式下才会显示
	        { modeName: 4, name: "醒肤模式", explain: "肌肤光滑清爽" }, { modeName: 5, name: "控油护理", explain: "细致毛孔，调节水油平衡" }, { modeName: 6, name: "快速温热", explain: " " }, //显示快速温热2  推荐数据给
	        { modeName: 10, name: "我的模式", explain: "根据用户自身需求，手动设置" }, { modeName: 16, name: " ", explain: " " }];
	        //设备模式
	        _this.deviceModeItems = [{ deviceMode: 1, name: "日常", explain: "设备同步中" }, { deviceMode: 2, name: "加强", explain: "设备同步中" }, { deviceMode: 3, name: "温热", explain: "快速温热护理，促进护肤品吸收" }, { deviceMode: 4, name: "热雾", explain: "热蒸打开毛孔，高效补水，促进循环" }, { deviceMode: 5, name: "冷雾", explain: "冷喷镇定肌肤，改善敏感肤质" }];
	        //this.componentDidMount = this.componentDidMount.bind(this);
	        _this.componentWillMount = _this.componentWillMount.bind(_this);
	        _this.haveDone = 0;

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            //this.state.deviceStatus=4;
	            _Actions.Actions.setEditing();
	        }
	        //页面一进来改变onOff的值
	        // componentDidMount(){
	        //      Actions.setEditing();
	        // }
	        //点击模式名称小圈时改变为选中样式

	    }, {
	        key: 'maxSelect',
	        value: function maxSelect(e) {
	            e.stopPropagation();
	            var index = e.target.getAttribute('data-index');
	            if (parseInt(index) + 1 == this.state.modeName && index != 5) return;
	            if (this.state.modeName == 10 && parseInt(index) + 1 == 6) return;
	            if (this.state.modeName == 6 && parseInt(index) + 1 == 3) return;
	            var type = e.target.getAttribute('data-type');
	            //if(index!=0 && type==='deviceMode') return; //判断index和type用来阻止设备模式下除“我的模式”以外其它模式的点击事件
	            _Actions.Actions.selectTimeArr(index, type, this.state.deviceMode, parseInt(index) + 1, this.state.smartModeSwitch, this.state.modeName);
	        }
	        //..........................................................模式选择区域滑动.................................................................................
	        //开始触摸位置

	    }, {
	        key: 'startrange',
	        value: function startrange(e) {
	            //开始滑动时间刻度 记录初始坐标值
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientX);
	            var oldValue = parseInt(this.state.value);
	            this.setState({
	                oldX: Xvalue,
	                oldValue: oldValue
	            });
	        }
	        //滑动

	    }, {
	        key: 'moverange',
	        value: function moverange(e) {
	            //滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientX);
	            var oldX = parseInt(this.state.oldX);
	            var value = parseInt(this.state.oldValue) + Xvalue - oldX;
	            if (screen.availWidth <= 320) {
	                value = value < -400 ? -400 : value;
	            } else {
	                value = value < -500 ? -500 : value;
	            }

	            value = value > 0 ? 0 : value;
	            this.setState({
	                value: value,
	                Xvalue: Xvalue
	            });
	        }
	        //结束触摸

	    }, {
	        key: 'endrange',
	        value: function endrange(e) {
	            //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
	            e.stopPropagation();
	            e.preventDefault();
	            var newX = parseInt(this.state.Xvalue); //滑动结束时的y值
	            var oldX = parseInt(this.state.oldX); //滑动开始时的y值
	            var offsetValue = parseInt(this.state.oldValue);
	            var oldValue = parseInt(this.state.value);
	            var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	            if (e.target.nodeName === 'SECTION' && offset <= 10) {
	                this.maxSelect(e);
	            };
	            var deviceModeIndexThree = e.target.getAttribute('data-index');
	            var type = e.target.getAttribute('data-type');
	            var deviceStatus = this.state.deviceStatus;
	            this.setState({
	                oldValue: oldValue,
	                disableEvent: false
	            });
	        }
	        //..............................................................智能的移动判断............................................................................

	    }, {
	        key: 'switchModeStart',
	        value: function switchModeStart(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientY);
	            var oldValue = parseInt(this.state.valueM);
	            this.setState({
	                oldX: Xvalue,
	                oldValue: oldValue
	            });
	        }
	    }, {
	        key: 'switchModeMove',
	        value: function switchModeMove(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientY);
	            var oldX = parseInt(this.state.oldX);
	            var valueM = parseInt(this.state.oldValue) + Xvalue - oldX;
	            this.setState({
	                valueM: valueM,
	                Xvalue: Xvalue
	            });
	        }
	    }, {
	        key: 'switchModeEnd',
	        value: function switchModeEnd(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var newX = parseInt(this.state.Xvalue); //滑动结束时的y值
	            var oldX = parseInt(this.state.oldX); //滑动开始时的y值
	            var offsetValue = parseInt(this.state.oldValue);
	            var oldValue = parseInt(this.state.valueM);
	            var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	            if (offset <= 10) {
	                this.switchMode(e);
	            };
	        }
	        //..............................................................手动的移动判断.....................................................................

	    }, {
	        key: 'switchModeStartHand',
	        value: function switchModeStartHand(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientY);
	            var oldValue = parseInt(this.state.valueH);
	            this.setState({
	                oldX: Xvalue,
	                oldValue: oldValue
	            });
	        }
	    }, {
	        key: 'switchModeMoveHand',
	        value: function switchModeMoveHand(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientY);
	            var oldX = parseInt(this.state.oldX);
	            var valueH = parseInt(this.state.oldValue) + Xvalue - oldX;
	            //value = value<-600?-600:value;
	            //value = value>0?0:value;
	            this.setState({
	                valueH: valueH,
	                Xvalue: Xvalue
	            });
	        }
	    }, {
	        key: 'switchModeEndHand',
	        value: function switchModeEndHand(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            var newX = parseInt(this.state.Xvalue); //滑动结束时的y值
	            var oldX = parseInt(this.state.oldX); //滑动开始时的y值
	            var offsetValue = parseInt(this.state.oldValue);
	            var oldValue = parseInt(this.state.valueH);
	            var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	            if (offset <= 10) {
	                this.switchModeHand(e);
	            };
	        }

	        //智能模式按钮切换它对应div的显示隐藏,方法在智能移动end时调用

	    }, {
	        key: 'switchMode',
	        value: function switchMode(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return;
	            } else {
	                //参数值              设备模式             模式名称              app开关值          智能手动开关           设备状态
	                _Actions.Actions.switchMode(this.state.recomondConfig.deviceMode, this.state.recomondConfig.modeName, this.state.onOff, this.state.smartModeSwitch, this.state.deviceStatus);
	            }
	        }
	        //手动模式按钮切换它对应div的显示隐藏,方法在手动移动end时调用

	    }, {
	        key: 'switchModeHand',
	        value: function switchModeHand(e) {
	            if (this.state.smartModeSwitch == 0) {
	                return;
	            } else {
	                var type = e.target.getAttribute('data-type');
	                //参数值                   设备模式              模式名称            app开关值          智能手动开关               设备状态          
	                _Actions.Actions.switchModeHand(this.state.deviceMode, this.state.modeName, this.state.onOff, this.state.smartModeSwitch, this.state.deviceStatus, type, this.state.deviceModeIndexThree);
	            }
	        }
	        //手动模式  我的模式 设置按钮

	    }, {
	        key: 'setEditing',
	        value: function setEditing() {
	            var deviceModeIndexThree = this.state.deviceModeIndexThree;
	            _Actions.Actions.setEditing(deviceModeIndexThree);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var roundIndex = this.state.roundIndex;
	            //对应两个模式时间的初始变量
	            var modeNameArrs = this.state.modeNameArrs || [{}, {}, {}, {}, {}, {}, {}];
	            var deviceModeItems = this.state.deviceModeItems || [{}, {}, {}, {}, {}];
	            var modArr = [0, 0, 0, 0, 0, 0, 0, 0];
	            var myAllTime = [0, 0, 0, 0, 0, 0, 0, 0];
	            //模式名称modeName值来取以对应的时间的数组下标
	            var modeNameIndex = 0; //modeName对应的时间数组下标
	            var deviceModeIndexTwo = 0; //deviceMode对应的时间数组下标
	            if (this.state.smartModeSwitch == 1) {
	                switch (this.state.recomondConfig.modeName) {//根据modeName调整对应的时间下标值
	                    case 1:
	                        modeNameIndex = 0;
	                        break;
	                    case 2:
	                        modeNameIndex = 1;
	                        break;
	                    case 3:
	                        modeNameIndex = 8;
	                        break;
	                    case 4:
	                        modeNameIndex = 3;
	                        break;
	                    case 5:
	                        modeNameIndex = 4;
	                        break;
	                    case 6:
	                        modeNameIndex = 2;
	                        break;
	                    case 10:
	                        modeNameIndex = 6;
	                        break;
	                    case 16:
	                        modeNameIndex = 7;
	                        break;
	                }
	                switch (this.state.recomondConfig.deviceMode) {//根据deviceMode调整对应的时间下标值
	                    case 1:
	                        deviceModeIndexTwo = 0;
	                        break;
	                    case 2:
	                        deviceModeIndexTwo = 1;
	                        break;
	                    case 3:
	                        deviceModeIndexTwo = 2;
	                        break;
	                    case 4:
	                        deviceModeIndexTwo = 3;
	                        break;
	                    case 5:
	                        deviceModeIndexTwo = 4;
	                        break;
	                }
	            } else {
	                switch (this.state.modeName) {//根据modeName调整对应的时间下标值
	                    case 1:
	                        modeNameIndex = 0;
	                        break;
	                    case 2:
	                        modeNameIndex = 1;
	                        break;
	                    case 3:
	                        modeNameIndex = 8;
	                        break;
	                    case 4:
	                        modeNameIndex = 3;
	                        break;
	                    case 5:
	                        modeNameIndex = 4;
	                        break;
	                    case 6:
	                        modeNameIndex = 2;
	                        break;
	                    case 10:
	                        modeNameIndex = 6;
	                        break;
	                    case 16:
	                        modeNameIndex = 7;
	                        break;
	                }
	                switch (this.state.deviceMode) {//根据deviceMode调整对应的时间下标值
	                    case 1:
	                        deviceModeIndexTwo = 0;
	                        break;
	                    case 2:
	                        deviceModeIndexTwo = 1;
	                        break;
	                    case 3:
	                        deviceModeIndexTwo = 2;
	                        break;
	                    case 4:
	                        deviceModeIndexTwo = 3;
	                        break;
	                    case 5:
	                        deviceModeIndexTwo = 4;
	                        break;
	                }
	            }

	            var deviceType = this.state.modeName == 16 ? 'deviceMode' : null;
	            // smartModeSwitch  智能模式开关 0手动 1自动
	            var modeArrs = this.state.smartModeSwitch == 1 ? modeNameArrs : this.state.modeName == 16 ? deviceModeItems : modeNameArrs;
	            //当有设备模式并且为手动显示设备模式的信息
	            var items = deviceType == null && this.state.smartModeSwitch == 0 ? this.modeNameItems : this.deviceModeItems;
	            //判断用哪个时间数组的 smartModeSwitch=1 自动
	            var deviceModeIndexThree = this.state.smartModeSwitch == 1 ? modeNameIndex : this.state.modeName == 16 ? deviceModeIndexTwo : modeNameIndex;

	            //deviceModeIndexThree = (deviceType=="deviceMode" && this.state.modeName==16 && this.state.smartModeSwitch==0) ? deviceModeIndexTwo : this.state.deviceModeIndexThree;
	            items = modeNameIndex == 6 ? this.modeNameItems : items;
	            //判断是否是设备模式下的第一个模式“手动模式”
	            if (this.state.returnModeSwitch) deviceModeIndexThree = 0;
	            if (this.state.returnModeSwitch && this.state.smartModeSwitch == 0) deviceModeIndexThree = 7;
	            if (this.state.modeName == 0 && this.state.deviceMode == 0) deviceModeIndexThree = 7;
	            if (this.state.modeName > 16 && this.state.deviceMode > 5) deviceModeIndexThree = 7;
	            if (this.state.modeName == undefined && this.state.deviceMode == undefined) deviceModeIndexThree = 7;
	            var styleSetButton = deviceType == null && deviceModeIndexThree == 6 ? { display: 'inline-block' } : { display: 'none' };
	            var explain = deviceModeIndexThree == 8 ? null : items[deviceModeIndexThree].explain;
	            if (modeArrs) {
	                modArr = [modeArrs[deviceModeIndexThree].hotSpray1, modeArrs[deviceModeIndexThree].coldSpray1, modeArrs[deviceModeIndexThree].hotSpray2, modeArrs[deviceModeIndexThree].coldSpray2, modeArrs[deviceModeIndexThree].hotSpray3, modeArrs[deviceModeIndexThree].coldSpray3, modeArrs[deviceModeIndexThree].workMinutes, modeArrs[deviceModeIndexThree].workSeconds];
	            }
	            if (this.state.smartModeSwitch == 1) {
	                modArr = modArr;
	                //我的模式 下用户冷热喷时间
	            } else if (this.state.modeName == 10 && this.state.smartModeSwitch == 0) {
	                    modArr = this.state.myAllTime ? this.state.myAllTime : [12, 0, 0, 0, 0, 0, 1, 0];
	                    if (this.state.hotSpray1 + this.state.hotSpray2 + this.state.hotSpray3 + this.state.coldSpray1 + this.state.coldSpray2 + this.state.coldSpray3) {
	                        modArr = this.state.myAllTime ? this.state.myAllTime : [this.state.hotSpray1, this.state.coldSpray1, this.state.hotSpray2, this.state.coldSpray2, this.state.hotSpray3, this.state.coldSpray3, this.state.workMinutes, this.state.workSeconds];
	                    }
	                } else {
	                    modArr = this.state.modArr ? this.state.modArr : modArr;
	                };
	            var smartModeSwitch_text = null;
	            //判断显示模式名称和设备模式
	            if (this.state.smartModeSwitch == 0) {
	                if (this.state.modeName == 1) {
	                    smartModeSwitch_text = "弹力修护";
	                } else if (this.state.modeName == 2) {
	                    smartModeSwitch_text = "皮肤清洁";
	                } else if (this.state.modeName == 3) {
	                    smartModeSwitch_text = "快速温热";
	                } else if (this.state.modeName == 4) {
	                    smartModeSwitch_text = "醒肤模式";
	                } else if (this.state.modeName == 5) {
	                    smartModeSwitch_text = "控油护理";
	                } else if (this.state.modeName == 6) {
	                    smartModeSwitch_text = "快速温热";
	                } else if (this.state.modeName == 10) {
	                    smartModeSwitch_text = "我的模式";
	                } else if (this.state.modeName == 16) {
	                    smartModeSwitch_text = "设备模式";
	                    switch (this.state.deviceMode) {
	                        case 1:
	                            explain = "设备模式同步中";
	                            break;
	                        case 2:
	                            explain = "设备模式同步中";
	                            break;
	                        case 3:
	                            explain = "快速温热护理，促进护肤品吸收";
	                            break;
	                        case 4:
	                            explain = "热蒸打开毛孔，高效补水，促进循环";
	                            break;
	                        case 5:
	                            explain = "冷喷镇定肌肤，改善敏感肤质";
	                            break;
	                    }
	                }
	            }
	            //判断是手动模式下 的 设备模式 显示运行数据传来的冷热喷时间
	            if (this.state.smartModeSwitch == 0 && this.state.modeName == 16) {
	                modArr = [this.state.hotSpray1, this.state.coldSpray1, this.state.hotSpray2, this.state.coldSpray2, this.state.hotSpray3, this.state.coldSpray3, this.state.workMinutes, this.state.workSeconds];
	            }

	            //判断剩余时间  用来冷热喷切换
	            var b = 7;
	            b = this.state.hotSpray1Leave <= modArr[0] && this.state.hotSpray1Leave > 0 ? 1 : b;
	            b = this.state.hotSpray2Leave <= modArr[2] && this.state.hotSpray2Leave > 0 && this.state.coldSpray1Leave <= 0 && this.state.hotSpray1Leave <= 0 ? 3 : b;
	            b = this.state.hotSpray3Leave <= modArr[4] && this.state.hotSpray3Leave > 0 && this.state.coldSpray2Leave <= 0 && this.state.hotSpray1Leave <= 0 && this.state.coldSpary1Leave <= 0 && this.state.hotSpray2Leave <= 0 ? 5 : b;
	            b = this.state.coldSpray1Leave <= modArr[1] && this.state.coldSpray1Leave > 0 && this.state.hotSpray1Leave <= 0 ? 2 : b;
	            b = this.state.coldSpray2Leave <= modArr[3] && this.state.coldSpray2Leave > 0 && this.state.hotSpray1Leave <= 0 && this.state.coldSpary1Leave <= 0 && this.state.hotSpray2Leave <= 0 ? 4 : b;
	            b = this.state.coldSpray3Leave <= modArr[5] && this.state.coldSpray3Leave > 0 && this.state.hotSpray1Leave <= 0 && this.state.coldSpary1Leave <= 0 && this.state.hotSpray2Leave <= 0 && this.state.coldSpray2Leave <= 0 && this.state.hotSpray3Leave <= 0 ? 6 : b;

	            //用来切换冷热喷小图标背景图
	            var hotOneF = this.state.hotSpray1Leave <= 0 ? true : false;
	            var coldOneF = this.state.coldSpray1Leave + this.state.hotSpray1Leave <= 0 ? true : false;
	            var hotTwoF = this.state.coldSpray1Leave + this.state.hotSpray1Leave + this.state.hotSpray2Leave <= 0 ? true : false;
	            var coldTwoF = this.state.coldSpray1Leave + this.state.hotSpray1Leave + this.state.hotSpray2Leave + this.state.coldSpray2Leave <= 0 ? true : false;
	            var hotThreeF = this.state.coldSpray1Leave + this.state.hotSpray1Leave + this.state.hotSpray2Leave + this.state.coldSpray2Leave + this.state.hotSpray3Leave <= 0 ? true : false;
	            var coldThreeF = this.state.coldSpray1Leave + this.state.hotSpray1Leave + this.state.hotSpray2Leave + this.state.coldSpray2Leave + this.state.hotSpray3Leave + this.state.coldSpray3Leave <= 0 ? true : false;

	            var tipsText = false;
	            if (b === 7 && this.haveDone == 6) {
	                tipsText = true;
	            }
	            if (b != 7) {
	                this.haveDone = b;
	            };
	            if (this.state.hiddenText) {
	                b = 7;
	                tipsText = false;
	                this.haveDone = 0;
	            }
	            return React.createElement(
	                'div',
	                null,
	                this.state.deviceStatus != 4 || this.state.onlineStatus == 2 ? React.createElement(_closePage.ClosePage, { stateItems: this.state, modArr: modArr }) : null,
	                React.createElement(
	                    'div',
	                    { className: 'cold_div', style: { display: this.state.deviceStatus == 4 && this.state.onlineStatus != 2 ? 'block' : 'none' } },
	                    React.createElement(_diffusionTwo.DiffusionTwo, { b: b, smartModeSwitch: this.state.smartModeSwitch, modeName: this.state.modeName, deviceMode: this.state.deviceMode, hotSpray1: this.state.hotSpray1, hotSpray2: this.state.hotSpray2, hotSpray3: this.state.hotSpray3, coldSpray1: this.state.coldSpray1, coldSpray2: this.state.coldSpray2, coldSpray3: this.state.coldSpray3, workMinutes: this.state.workMinutes, workSeconds: this.state.workSeconds, modArr: modArr }),
	                    React.createElement(
	                        'div',
	                        { className: 'selectMode' },
	                        React.createElement(
	                            'span',
	                            { onTouchStart: this.switchModeStart.bind(this), onTouchMove: this.switchModeMove.bind(this), onTouchEnd: this.switchModeEnd.bind(this), className: "auto_div" + (this.state.smartModeSwitch == 1 ? "  c3" : "  e5") },
	                            '智能模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            { onTouchStart: this.switchModeStartHand.bind(this), onTouchMove: this.switchModeMoveHand.bind(this), onTouchEnd: this.switchModeEndHand.bind(this), className: "operation_div" + (this.state.smartModeSwitch == 0 ? "  c3" : "  e5") },
	                            '手动模式'
	                        )
	                    ),
	                    React.createElement('div', { className: 'gap' }),
	                    React.createElement(
	                        'div',
	                        { className: "selectMode_text" + (this.state.smartModeSwitch == 0 ? "" : " hide") },
	                        React.createElement(
	                            'p',
	                            null,
	                            '模式选择:'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { marginBottom: smartModeSwitch_text == null ? "2rem" : "0px" }, className: "selectMode_select" + (this.state.smartModeSwitch == 0 ? "" : "  hide"),
	                            onTouchStart: this.startrange.bind(this), onTouchMove: this.moverange.bind(this), onTouchEnd: this.endrange.bind(this) },
	                        React.createElement(
	                            'div',
	                            { style: { marginLeft: this.state.value + 'px' } },
	                            React.createElement(
	                                'div',
	                                { className: "selectMod_select_div " + (this.state.roundIndex >= 0 || this.state.deviceModeIndex >= 0 ? "selectMod_select_div_max " : '') + (this.state.deviceMode == 5 ? 'fiveDeviceMode' : ' ') },
	                                this.modeNameItems.map(function (e, index) {
	                                    return React.createElement(
	                                        'div',
	                                        { className: "round-div translateY " + ((deviceModeIndexThree == index || deviceModeIndexThree == 6 && index == 5) && deviceType == null ? "round-div-max" + deviceModeIndexThree : '') },
	                                        React.createElement('span', { 'data-index': index, refs: 'round_span', className: "round_span " + (deviceModeIndexThree == index || deviceModeIndexThree == 6 && index == 5 ? "round_span-max" : '') }),
	                                        React.createElement('section', { 'data-index': index, style: { position: 'absolute', width: '40px', height: '40px', top: '-15px', left: index === 0 ? '30px' : '-10px', zIndex: 9999 } })
	                                    );
	                                }.bind(this)),
	                                this.deviceModeItems.map(function (e, deviceMode) {
	                                    return React.createElement(
	                                        'div',
	                                        { className: "round-div translateY " + (this.state.deviceMode == deviceMode + 1 && deviceType == 'deviceMode' ? "round-divOne-max" + this.state.deviceMode : '') },
	                                        React.createElement('span', { 'data-index': deviceMode + 1, 'data-type': 'deviceMode', refs: 'round_span',
	                                            className: "round_span " + (roundIndex <= 0 && this.state.deviceMode == deviceMode + 1 ? "round_span-max" : '') })
	                                    );
	                                }.bind(this)),
	                                React.createElement('div', { className: 'crosswise translateY' })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'selectMode_Combine' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'selectMode_select_text modeNameItems' },
	                                    this.modeNameItems.map(function (e, index) {
	                                        return React.createElement(
	                                            'div',
	                                            { className: 'round-div_text' },
	                                            e.name
	                                        );
	                                    }.bind(this))
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'selectMode_select_text deviceModeItems' },
	                                    this.deviceModeItems.map(function (e, deviceModeIndex) {
	                                        return React.createElement(
	                                            'div',
	                                            { className: 'round-div_text' },
	                                            e.name
	                                        );
	                                    }.bind(this))
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "select_Ok" + (this.state.smartModeSwitch === 1 || smartModeSwitch_text == null ? "  hide" : "") },
	                        React.createElement(
	                            'span',
	                            { className: 'span_mode', style: { display: deviceModeIndexThree == 7 ? 'none' : 'block' } },
	                            smartModeSwitch_text ? React.createElement(
	                                'label',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    { className: 'span_modeName' },
	                                    smartModeSwitch_text
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    ':' + explain
	                                )
	                            ) : null,
	                            React.createElement(
	                                'span',
	                                { className: 'span-set', style: styleSetButton },
	                                React.createElement(
	                                    Link,
	                                    { className: 'set_span', to: 'editing' },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '设置'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "cold_Mode_div" + (this.state.smartModeSwitch === 1 ? "" : " hide") },
	                        this.state.skinDataCode == 1 ? React.createElement(
	                            'p',
	                            null,
	                            '您的肤质为',
	                            this.state.skinTypeName,
	                            ',为您专属推荐:'
	                        ) : React.createElement(
	                            'p',
	                            null,
	                            '无法获取您的肤质，建议您去',
	                            React.createElement(
	                                'a',
	                                { href: 'cbeauty://cbeauty_single_skintest' },
	                                '测试肤质'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'div_span' },
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.deviceMode == 1 ? "show" : "hide" },
	                                '日常'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.deviceMode == 2 ? "show" : "hide" },
	                                '加强'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.deviceMode == 3 ? "show" : "hide" },
	                                '温热'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.deviceMode == 4 ? "show" : "hide" },
	                                '热雾'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.deviceMode == 5 ? "show" : "hide" },
	                                '冷雾'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.modeName == 1 ? "show" : "hide" },
	                                '弹力修护'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.modeName == 2 ? "show" : "hide" },
	                                '皮肤清洁'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.modeName == 3 ? "show" : "hide" },
	                                '快速温热2'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.modeName == 4 ? "show" : "hide" },
	                                '醒肤模式'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: this.state.recomondConfig.modeName == 5 ? "show" : "hide" },
	                                '控油护理'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'div-info' },
	                        React.createElement(
	                            'div',
	                            { className: 'div_box_lef' },
	                            React.createElement('div', { className: hotOneF ? "div_hotF_img" : "div_hot_img" }),
	                            React.createElement('div', { className: 'vertical' }),
	                            React.createElement('div', { className: coldOneF ? "div_coldF_img" : "div_cold_img" }),
	                            React.createElement('div', { className: 'vertical' }),
	                            React.createElement('div', { className: hotTwoF ? "div_hotF_img" : "div_hot_img" }),
	                            React.createElement('div', { className: 'vertical' }),
	                            React.createElement('div', { className: coldTwoF ? "div_coldF_img" : "div_cold_img" }),
	                            React.createElement('div', { className: 'vertical' }),
	                            React.createElement('div', { className: hotThreeF ? "div_hotF_img" : "div_hot_img" }),
	                            React.createElement('div', { className: 'vertical' }),
	                            React.createElement('div', { className: coldThreeF ? "div_coldF_img" : "div_cold_img" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'div_box_right' },
	                            modArr.map(function (item, index) {
	                                var m = parseInt(item / 12);
	                                var s = (item / 12 - parseInt(item / 12)) * 60;
	                                return React.createElement(
	                                    'div',
	                                    { style: { display: index == 6 || index == 7 ? 'none' : 'inline-block' }, className: "div_operation " + (index == 0 ? 'div_operation0' : "" || index == 5 ? 'div_operation5' : "") },
	                                    React.createElement(
	                                        'div',
	                                        { className: 'div_time' },
	                                        React.createElement(
	                                            'span',
	                                            { className: 'span_text' },
	                                            index % 2 == 0 ? '热喷' : '冷喷'
	                                        ),
	                                        React.createElement('br', null),
	                                        React.createElement(
	                                            'span',
	                                            { className: 'span_time' },
	                                            m > 0 ? m + " min " : null,
	                                            s > 0 ? s + " s" : null
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { 'data-index': index, className: 'div_editing' },
	                                        b == 7 ? tipsText ? '已完成' : null : b == index + 1 ? React.createElement(
	                                            'span',
	                                            { className: 'serviceIng' },
	                                            '运行中'
	                                        ) : b > index + 1 ? '已完成' : ''
	                                    )
	                                );
	                            }.bind(this))
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/editing', component: _editing.Editing })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(5);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 5 */
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount();
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount();
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
/* 6 */
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
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.state.hourtime) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
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
					value = value < 10 ? '0' + value : value;
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
			if (next.defaulthour || this.state.hourtime) {
				var _value = next.defaulthour === undefined ? this.state.hourtime : next.defaulthour;
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: _value,
						hourindex: index
					});
				}
			}
			var maxminute = parseInt(next.maxminute) || 59;
			var minminute = parseInt(next.minminute) || 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			for (var j = 0; j <= maxlength2; j++) {
				var _value2 = minminute + j * minutestep;
				_value2 = _value2 < 10 ? '0' + _value2 : _value2;
				minutearr.push(_value2);
			}
			if (maxminute < 10) maxminute = '0' + maxminute;
			if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			this.setState({
				minutearr: minutearr,
				minutetime: minminute
			});
			//设置默认分钟
			if (next.defaultminute || this.state.minutetime) {
				var _value3 = next.defaultminute === undefined ? this.state.minutetime : next.defaultminute;
				var mindex = minutearr.indexOf(_value3);
				if (mindex != -1) {
					this.setState({
						minutetime: _value3,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.ArrayInit === true || next.maxhour != this.props.maxhour || next.maxminute != this.props.maxminute) {
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
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
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
								'时'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'分'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
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
							'取消'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'确定'
						)
					)
				)
			);
		}
	});

/***/ },
/* 7 */
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _Actions = __webpack_require__(2);

	var _fun = __webpack_require__(8);

	var AppData = {
	    deviceStatus: 4,
	    timeArr: [0, 0, 0, 0, 0, 0],
	    onceConfigData: true,
	    //模式名称时间数组
	    modeNameArrs: [{ hotSpray1: 156, coldSpray1: 24, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 15, workSeconds: 0 }, //弹力修护
	    { hotSpray1: 72, coldSpray1: 18, hotSpray2: 36, coldSpray2: 18, hotSpray3: 36, coldSpray3: 0, workMinutes: 15, workSeconds: 0 }, //皮肤清洁
	    { hotSpray1: 72, coldSpray1: 12, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 7, workSeconds: 0 }, //快速温热1         
	    { hotSpray1: 72, coldSpray1: 6, hotSpray2: 27, coldSpray2: 5, hotSpray3: 36, coldSpray3: 9, workMinutes: 12, workSeconds: 55 }, //醒肤模式
	    { hotSpray1: 72, coldSpray1: 12, hotSpray2: 36, coldSpray2: 12, hotSpray3: 36, coldSpray3: 12, workMinutes: 15, workSeconds: 0 }, //控油护理
	    { hotSpray1: 12, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 1, workSeconds: 0 }, //我的模式
	    { hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 0, workSeconds: 0 }, //空数据只用于显示
	    { hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 0, workSeconds: 0 }, //空数据只用于显示
	    { hotSpray1: 108, coldSpray1: 12, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 10, workSeconds: 0 } //快速温热2
	    ],
	    //设备模式时间数组
	    deviceModeItems: [{ hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 0, workSeconds: 0 }, //日常
	    { hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 0, workSeconds: 0 }, //加强
	    { hotSpray1: 72, coldSpray1: 12, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 7, workSeconds: 0 }, //温热 
	    { hotSpray1: 180, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 15, workSeconds: 0 }, //热雾 
	    { hotSpray1: 0, coldSpray1: 36, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0, workMinutes: 3, workSeconds: 0 } //冷雾
	    ]
	};

	var isOffline = function isOffline() {
	    return AppData.onlineStatus == 2;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (AppData.a) return;
	        if (_typeof(data.steamfaceConfig) === 'object' && AppData.onceConfigData) {
	            AppData = _fun.Funs._extends(AppData, data.steamfaceConfig);
	            AppData.onceConfigData = false;
	        }
	        if (_typeof(data.recomondConfig) === 'object') {
	            AppData.recomondConfig = data.recomondConfig;
	        }
	        if (AppData.returnModeSwitch) {
	            data.smartModeSwitch = AppData.smartModeSwitch;
	            data.modeName = AppData.modeName;
	            data.deviceMode = AppData.deviceMode;
	        }
	        if (AppData.smartModeSwitch == 0 && AppData.modeName == 16) {
	            AppData.hotSpray1 = data.hotSpray1;
	            AppData.hotSpray2 = data.hotSpray2;
	            AppData.hotSpray3 = data.hotSpray3;
	            AppData.coldSpray1 = data.coldSpray1;
	            AppData.coldSpray2 = data.coldSpray2;
	            AppData.coldSpray3 = data.coldSpray3;
	            AppData.workMinutes = data.workMinutes;
	            AppData.workSeconds = data.workSeconds;
	        }
	        //智能模式下  当用户切换至设备模式时，把剩余时间都置为0
	        if (AppData.smartModeSwitch == 1 && AppData.modeName == 16) {
	            AppData.hotSpray1Leave = 0;
	            AppData.hotSpray2Leave = 0;
	            AppData.hotSpray3Leave = 0;
	            AppData.coldSpray1Leave = 0;
	            AppData.coldSpray2Leave = 0;
	            AppData.coldSpray3Leave = 0;
	        }
	        AppData.skinDataCode = data.skinDataCode ? data.skinDataCode : AppData.skinDataCode;
	        AppData.skinTypeName = data.skinTypeName ? data.skinTypeName : AppData.skinTypeName;
	        AppData.onlineStatus = data.onlineStatus;
	        data.deviceStatus = data.steamfaceConfig == null ? data.deviceStatus : data.steamfaceConfig.deviceStatus == null ? data.deviceStatus : data.steamfaceConfig.deviceStatus;

	        data.deviceStatus = data.deviceStatus >= 1 && data.deviceStatus <= 4 ? data.deviceStatus : AppData.deviceStatus;
	        AppData.deviceStatus = data.deviceStatus;
	        data.modeNameArrs = AppData.modeNameArrs;
	        data.deviceModeItems = AppData.deviceModeItems;
	        data.onOff = data.onOff ? data.onOff : AppData.oldOnOff;
	        this.trigger(data);
	    },
	    onRefreshData: function onRefreshData() {
	        AppData.onOff = 0;
	        this.trigger(AppData);
	    },
	    onClockSwitch: function onClockSwitch() {
	        AppData.onOff = 0;
	        this.trigger({ timeshow: false });
	    },
	    onSelectTime: function onSelectTime(minute, modArr) {
	        AppData.onOff = 0;
	        var remaintime = parseInt(minute);
	        AppData.remaintime = remaintime;
	        AppData.timeshow = false;
	        AppData.updateFlag = het.calcUpdateFlag(12) + het.calcUpdateFlag(3) + het.calcUpdateFlag(4);
	        AppData.modArr[AppData.index] = remaintime;
	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        this.trigger({ remainTime: AppData.remaintime, modArr: AppData.modArr, timeshow: AppData.timeshow });
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            AppData.a = false;
	            het.toast("同步成功");
	        }, function (data) {
	            het.toast("同步失败");
	        });
	    },
	    //智能模式点击
	    //参数值            设备模式    模式名称  app开关值  智能手动开关 设备状态
	    onSwitchMode: function onSwitchMode(deviceMode, modeName, onOff, smartModeSwitch, deviceStatus) {
	        AppData.onOff = 0;
	        AppData = _fun.Funs._extends(AppData, AppData.recomondConfig);
	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        AppData.smartModeSwitch = 1;
	        AppData.recomondConfig.modeName = modeName;
	        AppData.recomondConfig.deviceMode = deviceMode;
	        AppData.returnModeSwitch = false;
	        this.trigger({ smartModeSwitch: AppData.smartModeSwitch, deviceMode: deviceMode, modeName: modeName, hiddenText: false,
	            returnModeSwitch: AppData.returnModeSwitch });

	        AppData.updateFlag = het.calcUpdateFlag(10) + het.calcUpdateFlag(11) + het.calcUpdateFlag(10) + het.calcUpdateFlag(8) + het.calcUpdateFlag(12);

	        if (AppData.returnModeSwitch) return;
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            AppData.a = false;
	            het.toast("同步成功");
	        }, function (data) {
	            het.toast("同步失败");
	        });
	    },
	    //手动模式点击   参数值   设备模式    模式名称  app开关值  智能手动开关     设备状态
	    onSwitchModeHand: function onSwitchModeHand(deviceMode, modeName, onOff, smartModeSwitch, deviceStatus, type, deviceModeIndexThree) {
	        AppData.smartModeSwitch = 0;
	        AppData.deviceMode = 0;
	        AppData.modeName = 0; //智能模式点击手动模式时改变modeName的值，但是不下发
	        if (AppData.returnModeSwitch === undefined) {
	            AppData.returnModeSwitch = true;
	            this.trigger({ smartModeSwitch: 0, returnModeSwitch: AppData.returnModeSwitch, deviceMode: AppData.deviceMode, modeName: AppData.modeName, hiddenText: true });
	        } else {
	            AppData.returnModeSwitch = true;
	            this.trigger({ smartModeSwitch: 0, deviceMode: AppData.deviceMode, modeName: AppData.modeName, returnModeSwitch: AppData.returnModeSwitch, hiddenText: true });
	        }
	    },
	    onAddMinue: function onAddMinue(index) {
	        AppData.onOff = 0;
	        AppData.index = index;
	    },
	    onSetTimeFromApp: function onSetTimeFromApp(items) {
	        AppData.onOff = 0;
	        AppData.hotSpray1 = items[0];
	        AppData.coldSpray1 = items[1];
	        AppData.hotSpray2 = items[2];
	        AppData.coldSpray2 = items[3];
	        AppData.hotSpray3 = items[4];
	        AppData.coldSpray3 = items[5];
	        AppData.deviceStatus = 4;
	        AppData.refresh = true;
	        AppData.myAllTime = items;
	        AppData.workMinutes = items[6];
	        AppData.workSeconds = items[7];
	        AppData.modeName = 10;
	        AppData.hotSpray1Leave = items[0];
	        AppData.coldSpray1Leave = items[1];
	        AppData.hotSpray2Leave = items[2];
	        AppData.coldSpray2Leave = items[3];
	        AppData.hotSpray3Leave = items[4];
	        AppData.coldSpray3Leave = items[5];
	        AppData.updateFlag = het.calcUpdateFlag(18) + het.calcUpdateFlag(19) + het.calcUpdateFlag(20) + het.calcUpdateFlag(21) + het.calcUpdateFlag(22) + het.calcUpdateFlag(23) + het.calcUpdateFlag(24) + het.calcUpdateFlag(25);
	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        if (AppData.hotSpray1 + AppData.hotSpray2 + AppData.hotSpray3 + AppData.coldSpray1 + AppData.coldSpray2 + AppData.coldSpray3 <= 0) {
	            het.toast("您未选择时间，请选择");
	            return;
	        }

	        this.trigger({ myAllTime: items, modeName: AppData.modeName, deviceStatus: AppData.deviceStatus, hotSpray3: AppData.hotSpray3, hotSpray1: AppData.hotSpray1, coldSpray1: AppData.coldSpray1, hotSpray2: AppData.hotSpray2, coldSpray2: AppData.coldSpray2, coldSpray3: AppData.coldSpray3, hotSpray1Leave: AppData.hotSpray1, hotSpray2Leave: AppData.hotSpray2, hotSpray3Leave: AppData.hotSpray3, coldSpray1Leave: AppData.coldSpray1, coldSpray2Leave: AppData.coldSpray2, coldSpray3Leave: AppData.coldSpray3, workMinutes: AppData.workMinutes, workSeconds: AppData.workSeconds });
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            this.trigger({ hotSpray1Leave: AppData.hotSpray1, hotSpray2Leave: AppData.hotSpray2, hotSpray3Leave: AppData.hotSpray3, coldSpray1Leave: AppData.coldSpray1, coldSpray2Leave: AppData.coldSpray2, coldSpray3Leave: AppData.coldSpray3, myAllTime: items, workMinutes: AppData.workMinutes, workSeconds: AppData.workSeconds, deviceStatus: 4 });
	            AppData.a = false;
	            het.toast("同步成功");
	        }.bind(this), function (data) {
	            het.toast("同步失败");
	        });
	        history.back();
	    },
	    onSelectTimeArr: function onSelectTimeArr(deviceModeIndexThree, type, deviceMode, modeName, smartModeSwitch, timearray, onOff) {
	        AppData.deviceModeIndexThree = parseInt(deviceModeIndexThree);
	        AppData.smartModeSwitch = smartModeSwitch;
	        AppData.deviceType = type;
	        AppData.onOff = 0;
	        AppData.deviceMode = smartModeSwitch == 0 ? 0 : deviceMode;
	        AppData.modeName = modeName;
	        if (modeName == 3) AppData.modeName = 6;
	        AppData.hotSpray1 = parseInt(AppData.modeNameArrs[modeName - 1].hotSpray1);
	        AppData.hotSpray2 = parseInt(AppData.modeNameArrs[modeName - 1].hotSpray2);
	        AppData.hotSpray3 = parseInt(AppData.modeNameArrs[modeName - 1].hotSpray3);
	        AppData.coldSpray1 = parseInt(AppData.modeNameArrs[modeName - 1].coldSpray1);
	        AppData.coldSpray2 = parseInt(AppData.modeNameArrs[modeName - 1].coldSpray2);
	        AppData.coldSpray3 = parseInt(AppData.modeNameArrs[modeName - 1].coldSpray3);
	        AppData.workMinutes = parseInt(AppData.modeNameArrs[modeName - 1].workMinutes);
	        AppData.workSeconds = parseInt(AppData.modeNameArrs[modeName - 1].workSeconds);

	        if (modeName == 6) {
	            AppData.modeName = 10;
	            if (AppData.myAllTime) {
	                AppData.hotSpray1 = parseInt(AppData.myAllTime[0]);
	                AppData.hotSpray2 = parseInt(AppData.myAllTime[2]);
	                AppData.hotSpray3 = parseInt(AppData.myAllTime[4]);
	                AppData.coldSpray1 = parseInt(AppData.myAllTime[1]);
	                AppData.coldSpray2 = parseInt(AppData.myAllTime[3]);
	                AppData.coldSpray3 = parseInt(AppData.myAllTime[5]);
	                AppData.workMinutes = parseInt(AppData.myAllTime[6]);
	                AppData.workSeconds = parseInt(AppData.myAllTime[7]);
	            } else {
	                AppData.myAllTime = [12, 0, 0, 0, 0, 0, 1, 0];
	                this.trigger({ myAllTime: AppData.myAllTime });
	            }
	        } else {
	            AppData.modArr = [AppData.hotSpray1, AppData.coldSpray1, AppData.hotSpray2, AppData.coldSpray2, AppData.hotSpray3, AppData.coldSpray3, AppData.workMinutes, AppData.workSeconds];
	        };

	        AppData.updateFlag = het.calcUpdateFlag(10) + het.calcUpdateFlag(17) + het.calcUpdateFlag(12) + het.calcUpdateFlag(16) + het.calcUpdateFlag(18) + het.calcUpdateFlag(19) + het.calcUpdateFlag(20) + het.calcUpdateFlag(21) + het.calcUpdateFlag(22) + het.calcUpdateFlag(23);
	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        this.trigger({ deviceModeIndexThree: AppData.deviceModeIndexThree, type: AppData.deviceType, smartModeSwitch: AppData.smartModeSwitch, deviceMode: AppData.deviceMode, modeName: AppData.modeName, returnModeSwitch: false,
	            hotSpray3: AppData.hotSpray3, coldSpray1: AppData.coldSpray1, hotSpray2: AppData.hotSpray2, coldSpray2: AppData.coldSpray2, coldSpray3: AppData.coldSpray3, hotSpray1: AppData.hotSpray1, onOff: AppData.oldOnOff, hotSpray1Leave: AppData.hotSpray1, hotSpray2Leave: AppData.hotSpray2, hotSpray3Leave: AppData.hotSpray3, coldSpray1Leave: AppData.coldSpray1, coldSpray2Leave: AppData.coldSpray2, coldSpray3Leave: AppData.coldSpray3, workMinutes: AppData.workMinutes, workSeconds: AppData.workSeconds, modArr: AppData.modArr });
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            AppData.returnModeSwitch = false;
	            if (AppData.modeName == 10) {
	                this.trigger({ hiddenText: false, hotSpray1Leave: AppData.hotSpray1, hotSpray2Leave: AppData.hotSpray2, hotSpray3Leave: AppData.hotSpray3, coldSpray1Leave: AppData.coldSpray1, coldSpray2Leave: AppData.coldSpray2, coldSpray3Leave: AppData.coldSpray3, workMinutes: AppData.workMinutes, workSeconds: AppData.workSeconds });
	            } else {
	                this.trigger({ hiddenText: false, hotSpray1Leave: AppData.hotSpray1, hotSpray2Leave: AppData.hotSpray2, hotSpray3Leave: AppData.hotSpray3, coldSpray1Leave: AppData.coldSpray1, coldSpray2Leave: AppData.coldSpray2, coldSpray3Leave: AppData.coldSpray3, workMinutes: AppData.workMinutes, workSeconds: AppData.workSeconds });
	            }
	            AppData.a = false;
	            het.toast("同步成功");
	        }.bind(this), function (data) {
	            het.toast("同步失败");
	        });
	    },
	    //主页面的开关
	    onOpeenOrClose: function onOpeenOrClose(state, modArr) {
	        AppData = _fun.Funs._extends(AppData, state);
	        AppData.onOff = state.onOff = 2;
	        AppData.oldOnOff = 2;
	        AppData.smartModeSwitch = state.smartModeSwitch; //智能手动开关
	        AppData.deviceModeIndexThree = parseInt(state.deviceModeIndexThree);
	        AppData.deviceType = state.deviceType;
	        AppData.deviceStatus = 4;
	        AppData.requestType = 2;
	        AppData.hotSpray1 = modArr[0];
	        AppData.coldSpray1 = modArr[1];
	        AppData.hotSpray2 = modArr[2];
	        AppData.coldSpray2 = modArr[3];
	        AppData.hotSpray3 = modArr[4];
	        AppData.coldSpray3 = modArr[5];
	        AppData.workMinutes = modArr[6];
	        AppData.workSeconds = modArr[7];
	        // AppData.hotSpray1Leave=modArr[0],
	        // AppData.coldSpray1Leave=modArr[1],
	        // AppData.hotSpray2Leave=modArr[2],
	        // AppData.coldSpray2Leave=modArr[3],
	        // AppData.hotSpray3Leave=modArr[4],
	        // AppData.coldSpray3Leave=modArr[5]
	        var modeName = void 0;
	        AppData.modeName = state.modeName;
	        if (state.smartModeSwitch == 1) {
	            AppData.workMinutes = state.recomondConfig.workMinutes;
	            AppData.workSeconds = state.recomondConfig.workSeconds;
	        } else {
	            if (state.modeName == 10) {
	                var myAllTime = modArr;
	                AppData.workMinutes = modArr[6];
	                AppData.workSeconds = modArr[7];
	            }
	        }
	        AppData.deviceMode = state.smartModeSwitch == 0 ? state.deviceMode : state.recomondConfig.deviceMode;
	        AppData.updateFlag = het.calcUpdateFlag(10) + het.calcUpdateFlag(8) + het.calcUpdateFlag(7) + het.calcUpdateFlag(16) + het.calcUpdateFlag(17) + het.calcUpdateFlag(11) + het.calcUpdateFlag(18) + het.calcUpdateFlag(19) + het.calcUpdateFlag(20) + het.calcUpdateFlag(21) + het.calcUpdateFlag(22) + het.calcUpdateFlag(23) + het.calcUpdateFlag(24) + het.calcUpdateFlag(25);

	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        this.trigger({ deviceMode: AppData.deviceMode, modeName: AppData.modeName });
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            this.trigger({ hotSpray1Leave: modArr[0], hotSpray2Leave: modArr[2], hotSpray3Leave: modArr[4], coldSpray1Leave: modArr[1], coldSpray2Leave: modArr[3], coldSpray3Leave: modArr[5], workMinutes: modArr[6], workSeconds: modArr[7], onOff: 2 });
	            AppData.a = false;
	            het.toast("同步成功");
	            this.trigger({ deviceStatus: 4 });
	        }.bind(this), function (data) {
	            het.toast("同步失败");
	        });
	    },
	    onShowMaxminute: function onShowMaxminute(maxminute) {
	        if (maxminute <= 0) {
	            het.toast("您选择的时间足够15min，已不能选择");
	        } else if (maxminute >= 15) {
	            het.toast("请编辑、选择时间");
	        }
	    },
	    //工作页面的开关
	    onChangeDeviceStatus: function onChangeDeviceStatus(deviceStatus, deviceMode, modeName, onOff, smartModeSwitch, type, deviceModeIndexThree, hotSpray1, hotSpray2, hotSpray3, coldSpray1, coldSpray2, coldSpray3, workMinutes, workSeconds, modArr) {
	        if (hotSpray1 + hotSpray2 + hotSpray3 + coldSpray1 + coldSpray2 + coldSpray3 <= 0 || modeName == 0 && deviceMode == 0) {
	            AppData.hotSpray1 = modArr[0];
	            AppData.coldSpray1 = modArr[1];
	            AppData.hotSpray2 = modArr[2];
	            AppData.coldSpray2 = modArr[3];
	            AppData.hotSpray3 = modArr[4];
	            AppData.coldSpray3 = modArr[5];
	            AppData.workMinutes = modArr[6];
	            AppData.workSeconds = modArr[7];
	        }
	        AppData.onOff = 1;
	        AppData.oldOnOff = 1;
	        AppData.deviceStatus = 2;
	        AppData.modeName = modeName;
	        if (AppData.returnModeSwitch) {
	            AppData.smartModeSwitch = 1;
	        }
	        if (smartModeSwitch == 0 && modeName == 16) {
	            AppData.deviceMode = deviceMode;
	            AppData.modeName = modeName;
	            AppData.hotSpray1 = hotSpray1;
	            AppData.hotSpray2 = hotSpray2;
	            AppData.hotSpray3 = hotSpray3;
	            AppData.coldSpray1 = coldSpray1;
	            AppData.coldSpray2 = coldSpray2;
	            AppData.coldSpray3 = coldSpray3;
	            AppData.workMinutes = workMinutes;
	            AppData.workSeconds = workSeconds;
	        } else if (smartModeSwitch == 0) {
	            AppData.deviceMode = 0;
	        } else if (smartModeSwitch == 1) {
	            AppData.deviceMode = deviceMode;
	        }
	        AppData.updateFlag = het.calcUpdateFlag(10) + het.calcUpdateFlag(7) + het.calcUpdateFlag(16);

	        if (isOffline()) {
	            het.toast("设备已离线!");
	            return;
	        }
	        this.trigger(AppData);
	        AppData.a = true;
	        het.send(AppData, function (data) {
	            AppData.a = false;
	            het.toast("同步成功");
	            this.trigger({ deviceStatus: 2 });
	        }.bind(this), function (data) {
	            het.toast("同步失败");
	        });
	    },
	    //手动模式 我的模式 的设置按钮
	    onSetEditing: function onSetEditing(name) {
	        if (!name && AppData.refresh) {
	            AppData.refresh = false;
	            AppData.onOff = AppData.oldOnOff;
	            this.trigger(AppData);
	        }
	        if (name === 'return') {
	            AppData.refresh = true;
	            AppData.deviceStatus = 4;
	            this.trigger({ myAllTime: AppData.myAllTime });
	        }
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(9);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ClosePage = undefined;

	var _Actions = __webpack_require__(2);

	var _diffusion = __webpack_require__(11);

	var ClosePage = exports.ClosePage = React.createClass({
	    displayName: 'ClosePage',

	    getInitialState: function getInitialState() {
	        return {
	            timeshow: false,
	            deviceStatus: 0,
	            onOff: 1,
	            smartModeSwitch: 1,
	            deviceMode: 3,
	            modeName: 2
	        };
	    },

	    //改变开关机状态

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'index_div' },
	            React.createElement(
	                'div',
	                { className: 'div_img' },
	                React.createElement('img', { src: '../static/img/open.png', alt: '' }),
	                React.createElement(_diffusion.Diffusion, { stateItems: this.props.stateItems, modArr: this.props.modArr })
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Diffusion = undefined;

	var _Actions = __webpack_require__(2);

	var Diffusion = exports.Diffusion = React.createClass({
	    displayName: 'Diffusion',

	    getInitialState: function getInitialState() {
	        return {
	            border: 12.6,
	            opacity: 0.8,
	            onOff: 1,
	            timeId: null
	        };
	    },
	    //页面加载渲染
	    componentDidMount: function componentDidMount() {
	        //扩散样式
	        var _this = this;
	        this.state.timeId = setInterval( /*()=>{
	                                         let border=_this.state.border || 12.6;
	                                         let opacity= _this.state.opacity || 0.8;
	                                         border+=0.5;
	                                         opacity-=0.04; 
	                                         //if(opacity<=0.06){opacity=0.8;}
	                                         if(border>=12.6){border=4.6;opacity=0.8}
	                                         _this.state.border=border;
	                                         _this.state.opacity=opacity;
	                                         _this.setState({
	                                         border:border,
	                                         opacity:opacity
	                                         });
	                                         },*/100);
	    },

	    //页面卸载执行
	    componentWillUnmount: function componentWillUnmount() {
	        clearInterval(this.state.timeId);
	    },
	    opeenOrClose: function opeenOrClose(e) {
	        _Actions.Actions.opeenOrClose(this.props.stateItems, this.props.modArr);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'div_open' },
	            React.createElement(
	                'div',
	                { className: 'div_open_one' },
	                React.createElement('span', { onTouchEnd: this.opeenOrClose })
	            ),
	            React.createElement('div', { className: 'div_open_two' }),
	            React.createElement('div', { className: 'div_open_two1' })
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Editing = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _TimeSelect = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Editing = exports.Editing = function (_BaseComponent) {
	    _inherits(Editing, _BaseComponent);

	    function Editing(props) {
	        _classCallCheck(this, Editing);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editing).call(this, props));

	        _this.state = { timeshow: false, divIndex: -1, modArr: [12, 0, 0, 0, 0, 0, 1, 0], deviceStatus: 4, deviceModeIndexThree: 5, cbeauty_steamFace_set: 'set', smartModeSwitch: 0, maxminute: 1, textShow: "none" };
	        _this.listenStore(_Store.Store); // 监听Store
	        //Actions.pushGuiderData(); // 请求推送向导数据
	        return _this;
	    }

	    _createClass(Editing, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            het.toast('cbeauty_steamFace_set');
	            //document.querySelector("#set_nav").click();
	            document.body.scrollTop = 0;
	            _Actions.Actions.setEditing('return');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            het.toast('cbeauty_steamFace_save');
	            //document.querySelector("#set_nav_save").click();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            if (this.state.onlineStatus == 2 || this.state.deviceStatus == 2) {
	                // document.querySelector("#set_nav_save").click();
	                history.back();
	                het.toast('cbeauty_steamFace_save');
	            }
	        }
	        //时间组件中 取消提交按钮

	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({
	                timeshow: false
	            });
	            // Actions.clockSwitch();
	        }
	        //时间组件中 编辑提交按钮

	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            var items = this.state.myAllTime || [12, 0, 0, 0, 0, 0, 1, 0];
	            var index = this.state.divIndex;
	            items = JSON.parse(JSON.stringify(items));
	            items[index] = m * 12;
	            items[6] = parseInt((items[0] + items[1] + items[2] + items[3] + items[4] + items[5]) / 12);
	            items[7] = (items[0] + items[1] + items[2] + items[3] + items[4] + items[5]) * 5 - items[6] * 60;
	            var totalminute = items[6] - m;
	            if (m > 15 - totalminute) {
	                _Actions.Actions.showMaxminute(-1);
	                return;
	            } else {
	                this.setState({
	                    timeshow: false,
	                    myAllTime: items,
	                    maxminute: items[6]
	                });
	            }
	        }
	        //编辑页面中 编辑按钮

	    }, {
	        key: 'divTouchShow',
	        value: function divTouchShow(e) {
	            var index = e.target.getAttribute('data-index');
	            if (15 - this.state.maxminute <= 0 && this.state.myAllTime[index] <= 0) {
	                _Actions.Actions.showMaxminute(15 - this.state.maxminute);
	            } else {
	                this.setState({
	                    timeshow: true,
	                    divIndex: index
	                });
	            }
	        }
	        //选择好全部时间后的 确定 按钮

	    }, {
	        key: 'SetTimeFromApp',
	        value: function SetTimeFromApp() {
	            var items = this.state.myAllTime || [12, 0, 0, 0, 0, 0, 1, 0];
	            _Actions.Actions.setTimeFromApp(items);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var items = this.state.myAllTime || [12, 0, 0, 0, 0, 0, 1, 0];
	            //总时间
	            var allTime = (items[0] + items[1] + items[2] + items[3] + items[4] + items[5]) / 12;
	            var deviceModeIndexThree = this.state.deviceModeIndexThree;
	            return React.createElement(
	                'div',
	                { className: 'div_box' },
	                React.createElement(
	                    'div',
	                    { className: 'div-info' },
	                    React.createElement(
	                        'div',
	                        { className: 'div_box_lef' },
	                        React.createElement('div', { className: 'div_hot_img' }),
	                        React.createElement('div', { className: 'vertical' }),
	                        React.createElement('div', { className: 'div_cold_img' }),
	                        React.createElement('div', { className: 'vertical' }),
	                        React.createElement('div', { className: 'div_hot_img' }),
	                        React.createElement('div', { className: 'vertical' }),
	                        React.createElement('div', { className: 'div_cold_img' }),
	                        React.createElement('div', { className: 'vertical' }),
	                        React.createElement('div', { className: 'div_hot_img' }),
	                        React.createElement('div', { className: 'vertical' }),
	                        React.createElement('div', { className: 'div_cold_img' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'div_box_right' },
	                        items.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { style: { display: index == 6 || index == 7 ? 'none' : 'inline-block' }, className: "div_operation " + (index === 0 ? 'div_operation0' : "" || index === 5 ? 'div_operation5' : "") },
	                                React.createElement(
	                                    'div',
	                                    { className: 'div_time' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'span_text' },
	                                        index % 2 == 0 ? '热喷' : '冷喷'
	                                    ),
	                                    React.createElement('br', null),
	                                    React.createElement(
	                                        'span',
	                                        { className: 'span_time' },
	                                        (item / 12).toFixed(1),
	                                        '  min'
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { 'data-index': index, className: 'div_editing', onTouchEnd: this.divTouchShow.bind(this) },
	                                    '编辑'
	                                )
	                            );
	                        }.bind(this))
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'duration' },
	                    React.createElement(
	                        'span',
	                        { className: 'span_6' },
	                        '总时长:',
	                        allTime,
	                        ' min'
	                    ),
	                    React.createElement('br', null),
	                    React.createElement(
	                        'span',
	                        { className: 'span_9' },
	                        '提示：总时长在1-15min之间'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'p_ok', onTouchEnd: this.SetTimeFromApp.bind(this) },
	                        '确定'
	                    )
	                ),
	                React.createElement('a', { id: 'set_nav', style: { opacity: 0, width: 0, height: 0, display: 'block' }, href: 'cbeauty://cbeauty_steamFace_set' }),
	                React.createElement(_TimeSelect.TimeSelect, { title: '设置时间', hourshow: false, minuteshow: true, cancelClock: this.cancelClock.bind(this), ArrayInit: true,
	                    submitClock: this.submitClock.bind(this), statusname: ' ', show: this.state.timeshow, maxminute: 15 })
	            );
	        }
	    }]);

	    return Editing;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DiffusionTwo = undefined;

	var _Actions = __webpack_require__(2);

	var DiffusionTwo = exports.DiffusionTwo = React.createClass({
	    displayName: 'DiffusionTwo',

	    getInitialState: function getInitialState() {
	        return {
	            timeIdTwo: null
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        //扩散样式
	        var _this = this;
	        this.state.timeIdTwo = setInterval( /*()=>{
	                                            let border=_this.state.border || 15.76;
	                                            let opacity= _this.state.opacity || 0.18;
	                                            border+=0.5;
	                                            opacity-=0.005; 
	                                            //if(opacity<=0.06){opacity=0.18;}
	                                            if(border>=24){border=15.76; opacity=0.18;}
	                                            _this.setState({
	                                            border:border,
	                                            opacity:opacity
	                                            });
	                                            },*/100);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearInterval(this.state.timeIdTwo);
	    },


	    //点击开关按钮改变待机状态
	    changeDeviceStatus: function changeDeviceStatus(e) {
	        var type = e.target.getAttribute('data-type');
	        _Actions.Actions.changeDeviceStatus(this.state.deviceStatus, this.props.deviceMode, this.props.modeName, this.state.onOff, this.props.smartModeSwitch, type, this.state.deviceModeIndexThree, this.props.hotSpray1, this.props.hotSpray2, this.props.hotSpray3, this.props.coldSpray1, this.props.coldSpray2, this.props.coldSpray3, this.props.workMinutes, this.props.workSeconds, this.props.modArr);
	    },
	    render: function render() {
	        var remainMinute = this.props.remainMinute;
	        var remainSecond = this.props.remainSecond;
	        //冷热喷交互
	        var b = this.props.b;
	        var hot_cold = b % 2 == 0 ? "clod_header" : "hot_header";
	        var hot_cold_test = b % 2 == 0 ? "冷喷" : "热喷";
	        var smartModeSwitch = this.props.smartModeSwitch;
	        //
	        var modeName = this.props.modeName;
	        switch (modeName) {}
	        var smartModeSwitch_text = void 0;
	        if (smartModeSwitch == 0) {
	            switch (modeName) {
	                case 1:
	                    smartModeSwitch_text = "弹力修护";
	                    break;
	                case 2:
	                    smartModeSwitch_text = "皮肤清洁";
	                    break;
	                case 4:
	                    smartModeSwitch_text = "醒肤模式";
	                    break;
	                case 5:
	                    smartModeSwitch_text = "控油护理";
	                    break;
	                case 6:
	                    smartModeSwitch_text = "快速温热";
	                    break;
	                case 10:
	                    smartModeSwitch_text = "我的模式";
	                    break;
	                case 16:
	                    smartModeSwitch_text = "设备模式";
	                    break;
	            }
	        } else {
	            smartModeSwitch_text = "智能模式";
	        }
	        return React.createElement(
	            'div',
	            { className: hot_cold },
	            React.createElement(
	                'div',
	                { className: 'cilcle_one' },
	                React.createElement(
	                    'label',
	                    { className: 'text1' },
	                    hot_cold_test
	                ),
	                React.createElement(
	                    'label',
	                    { className: 'text2' },
	                    smartModeSwitch_text
	                )
	            ),
	            React.createElement('div', { className: 'cllce_two' }),
	            React.createElement('div', { className: 'cllce_two1' }),
	            React.createElement('div', { className: 'cllce_two2' }),
	            React.createElement('div', { className: 'offOn', onTouchEnd: this.changeDeviceStatus })
	        );
	    }
	});

/***/ }
/******/ ]);