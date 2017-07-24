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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ben on 2016/12/5.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	// import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print' });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});
	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            mode: 0,
	            isShowAlert: false
	        };
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.changeMode = _this.changeMode.bind(_this);
	        _this.liveError = _this.liveError.bind(_this);
	        _this.isSelect = _this.isSelect.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'changeMode',
	        value: function changeMode(e) {
	            //出来操作
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            }
	            e.preventDefault();
	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            console.log('-----selectMode---' + selectMode);
	            //let modeConfig = [
	            //    {mode:1,name:'大骨汤',fire:1,heatinghour:0,heatingmin:35},
	            //    {mode:2,name:'婴儿粥',fire:1,heatinghour:0,heatingmin:22},
	            //    {mode:3,name:'煲仔饭',fire:1,heatinghour:0,heatingmin:24},
	            //    {mode:4,name:'营养饭',fire:1,heatinghour:0,heatingmin:18},
	            //];
	            switch (selectMode) {
	                case 1:
	                    appData.selectMode = 14, appData.functimeset = 90;break;
	                case 2:
	                    appData.selectMode = 15, appData.functimeset = 60;break;
	                case 3:
	                    appData.selectMode = 16, appData.functimeset = 45;break;
	                case 4:
	                    appData.selectMode = 17, appData.functimeset = 35;break;
	            };
	            appData.sendArray = {
	                function: appData.selectMode,
	                //预约时间
	                ordertimehour: 0,
	                ordertimemin: 0,
	                //工作时间
	                runtime: appData.functimeset
	            };
	            _Actions.Actions.launchMode(appData.sendArray);
	            this.setState({
	                modeName: 'adsa' /*modeConfig[selectMode].name*/
	            });
	            console.log('-----快捷模式--------------', appData.sendArray);
	        }
	    }, {
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.online == 2) {
	                return '设备与APP已断开连接！';
	            }
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            if (this.state.opencircuit == 1) {
	                return '主人，请与售后联系，电话：400-777-2009';
	            }
	            if (this.state.shortcircuit == 1) {
	                return '主人，请与售后联系，电话：400-777-2009';
	            }
	            return false;
	        }
	    }, {
	        key: 'isSelect',
	        value: function isSelect() {
	            //let workStatus = this.state.mode!=undefined ? this.state.mode:0;
	            //let online = this.state.online!=undefined?this.state.online:1;//是否在线  1在线  2离线
	            //let networkavailable =this.state.networkavailable!=undefined?this.state.networkavailable:1;
	            //let sensorflag = this.state.sensorflag!=undefined?this.state.sensorflag:1;
	            //let runningOk = (online!=2 && networkavailable!=2 && sensorflag!=1) ? true:false;
	            //if(runningOk && workStatus == 0 ){
	            //    return true;
	            //}
	            //return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //离线&故障
	            var online = this.state.online != undefined ? this.state.online : 1; //是否在线  1在线  2离线
	            var networkavailable = this.state.networkavailable != undefined ? this.state.networkavailable : 1;
	            var sensorflag = this.state.sensorflag != undefined ? this.state.sensorflag : 1;
	            //故障时样式
	            var runningOk = online != 2 && networkavailable != 2 && sensorflag == 1 ? true : false;
	            //状态和模式
	            var mode = this.state.mode != undefined ? this.state.mode : 0;
	            var modeName = this.state.modeName ? this.state.modeName == '待机' ? '无' : this.state.modeName : '无';
	            var surplusreservehour = this.state.surplusreservehour != undefined ? this.state.surplusreservehour : '';
	            var surplusreservemin = this.state.surplusreservemin != undefined ? this.state.surplusreservemin : '';
	            var reserveEnd = surplusreservehour == 0 && surplusreservemin == 0 ? false : true;
	            var AppointmentOrHeat = this.state.AppointmentOrHeat != undefined ? this.state.AppointmentOrHeat : 0;
	            //console.log(online,networkavailable,sensorflag,runningOk.toString())

	            //模式判断
	            var workingStatusTxt = void 0;
	            var workingTotalText = void 0;

	            if (runningOk) {
	                //if(mode ==1||mode==0){
	                //    workingStatusTxt= '待机中';
	                //    workingTotalText = workingStatusTxt;
	                //}else if(mode ==18){
	                //    workingStatusTxt = '保温中';
	                //    workingTotalText = workingStatusTxt;
	                //}else{
	                //    if(reserveEnd){
	                //        workingStatusTxt= '预约中';
	                //    }else{
	                //        workingStatusTxt = '加热中';
	                //    }
	                //    workingTotalText = workingStatusTxt+"  模式: "+modeName;
	                //}

	                if (AppointmentOrHeat == 1) {
	                    workingStatusTxt = '预约中';
	                    workingTotalText = workingStatusTxt + "  模式: " + modeName;
	                } else if (AppointmentOrHeat == 2) {
	                    workingStatusTxt = '加热中';
	                    workingTotalText = workingStatusTxt + "  模式: " + modeName;
	                } else {
	                    if (mode == 18) {
	                        workingTotalText = '保温中';
	                    } else {
	                        workingTotalText = '待机中';
	                    }
	                }
	            } else {
	                workingTotalText = '设备已离线';
	            }
	            var modeArray = [{ id: 14, select: true }, { id: 15, select: true }, { id: 16, select: true }, { id: 17, select: true }];
	            if (mode != 0 && mode != 1) {
	                modeArray.map(function (o) {
	                    if (o.id == mode) {
	                        o.select = true;
	                    } else {
	                        o.select = false;
	                    }
	                });
	            }

	            //console.log('modeArray',modeArray,mode);

	            return React.createElement(
	                'aside',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workingTotalText
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '1', className: modeArray[0].select && runningOk ? 'flex-cell' : 'flex-cell triggered', onClick: mode != 0 && mode != 1 && runningOk ? '' : this.changeMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/chopSoup.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5927\u9AA8\u6C64'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '2', className: modeArray[1].select && runningOk ? 'flex-cell' : 'flex-cell triggered', onClick: mode != 0 && mode != 1 && runningOk ? '' : this.changeMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/babyPorridge.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5A74\u513F\u7CA5'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '3', className: modeArray[2].select && runningOk ? 'flex-cell' : 'flex-cell triggered', onClick: mode != 0 && mode != 1 && runningOk ? '' : this.changeMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/soupRice.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7172\u4ED4\u996D'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '4', className: modeArray[3].select && runningOk ? 'flex-cell' : 'flex-cell triggered', onClick: mode != 0 && mode != 1 && runningOk ? '' : this.changeMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/nutritionRice.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8425\u517B\u996D'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 快捷方式');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'local', 'selectMode', 'cancelSelect', 'submitSelect', 'launchMode', 'cancel']);

/***/ },
/* 5 */
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

	var _Actions = __webpack_require__(4);

	var appData = {};
	//    {id:0,name:'待机'},
	//{id:1,name:'大骨汤'},
	//{id:2,name:'婴儿粥'},
	//{id:3,name:'煲仔饭',heatinghour:0,heatingmin:15},
	//{id:4,name:'营养饭',heatinghour:0,heatingmin:16},
	//{id:5,name:'营养汤',heatinghour:0,heatingmin:18},
	//{id:6,name:'老火汤',heatinghour:0,heatingmin:22},
	//{id:7,name:'乌鸡汤',heatinghour:0,heatingmin:24},
	//{id:8,name:'老鸭汤',heatinghour:0,heatingmin:35},
	//{id:9,name:'八宝粥',heatinghour:1,heatingmin:0},
	//{id:10,name:'五谷粥',heatinghour:0,heatingmin:20},
	//{id:11,name:'砂锅粥',heatinghour:0,heatingmin:20},
	//{id:12,name:'隔水炖',heatinghour:0,heatingmin:20},
	//{id:13,name:'药膳',heatinghour:0,heatingmin:20},
	//{id:14,name:'甜品',heatinghour:0,heatingmin:20},
	//{id:15,name:'盐焗',heatinghour:0,heatingmin:20},
	//{id:16,name:'焖烧',heatinghour:0,heatingmin:20},
	//{id:17,name:'保温',heatinghour:0,heatingmin:20},
	//{id:18,name:'云菜单',heatinghour:0,heatingmin:20},
	var modeArray = [{ id: 0, name: '待机' }, { id: 1, name: '待机' }, { id: 2, name: '营养汤', functimeset: 70, minTime: 45, maxTime: 120 }, { id: 3, name: '八宝粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 4, name: '药膳', functimeset: 60, minTime: 45, maxTime: 300 }, { id: 5, name: '老火汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 6, name: '五谷粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 7, name: '甜品', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 8, name: '乌鸡汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 9, name: '砂锅粥', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 10, name: '盐焗', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 11, name: '老鸭汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 12, name: '隔水炖', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 13, name: '焖烧', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 14, name: '大骨汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 15, name: '婴儿粥', functimeset: 60, minTime: 60, maxTime: 120 }, { id: 16, name: '煲仔饭', functimeset: 45, minTime: 0, maxTime: 0 }, { id: 17, name: '营养饭', functimeset: 35, minTime: 0, maxTime: 0 }, { id: 18, name: '保温', functimeset: 0, minTime: 0, maxTime: 0 }];

	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    AppointmentOrHeat: 0
	};

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
	    var time = new Date().getTime() + 20e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        //缓存数据到appData里，协议定义中文>_<，中转一下字段发送
	        //console.log('appData data:',data);
	        var data = dataFilter(datas);
	        //console.log("onRepaint data====>"+JSON.stringify(data));
	        appData.modeArray = modeArray;
	        //运行数据
	        //当前模式
	        if (data.function != undefined) appData.mode = data.function, appData.modeName = modeArray[data.function].name;
	        //预约设定时间
	        if (data.ordertimehour != undefined) appData.reservehour = data.ordertimehour;
	        if (data.ordertimemin != undefined) appData.reservemin = data.ordertimemin;
	        //预约剩余时间
	        if (data.orderfreehour != undefined) appData.surplusreservehour = data.orderfreehour;
	        if (data.orderfreemin != undefined) appData.surplusreservemin = data.orderfreemin;
	        //功能设定时间
	        if (data.functimeset != undefined) appData.heatingTime = data.functimeset;
	        //功能剩余时间
	        if (data.functimefree != undefined) appData.surplusHeatingTime = data.functimefree;
	        //当前温度
	        if (data.temperature != undefined) appData.curTemp = data.temperature;
	        //离线&故障
	        if (data.online) appData.online = data.online; //1在线 2 离线
	        if (data.networkavailable) appData.networkavailable = data.networkavailable; //1可用 2不可用
	        if (data.soaktimehour) appData.soaktimehour = data.soaktimehour; //保温时间（小时）
	        if (data.soaktimeminute) appData.soaktimeminute = data.soaktimeminute; //保温时间（分钟）
	        //传感器故障
	        if (data.sensorflag != undefined) appData.error = data.sensorflag;
	        //烹饪阶段  1预约  2加热
	        if (data.AppointmentOrHeat != undefined) appData.AppointmentOrHeat = data.AppointmentOrHeat;
	        //console.log('appData',appData);
	        this.trigger(appData);
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(appData);
	    },
	    onSelectMode: function onSelectMode(data) {
	        console.log('onSelectMode------------', data);
	        this.trigger(data);
	    },

	    //时间控件的取消
	    onCancelSelect: function onCancelSelect(data) {
	        this.trigger({ selectshow: false });
	        this.trigger({ openSubscribeClock: false });
	    },
	    onSubmitSelect: function onSubmitSelect(h, m, where, selectMode) {
	        console.log('onSubmitSelect------------', h, m, where, selectMode);
	        var selectArray = {};
	        switch (parseInt(where)) {
	            //预约时间
	            case 0:

	                if (parseInt(m) % 60 == 0) {
	                    selectArray.ordertimehour = parseInt(h) + parseInt(m) / 60;
	                    selectArray.ordertimemin = 0;
	                } else {
	                    selectArray.ordertimehour = parseInt(h);
	                    selectArray.ordertimemin = parseInt(m);
	                }

	                if (selectArray.ordertimehour >= 24) {
	                    selectArray.ordertimehour = 24;
	                    selectArray.ordertimemin = 0;
	                } else if (selectArray.ordertimehour == 0 && selectArray.ordertimemin == 30) {
	                    selectArray.ordertimehour = 1;
	                    selectArray.ordertimemin = 0;
	                }

	                break;
	            //加热时间
	            case 1:
	                //加热时间选择h为分钟数的值

	                selectArray.runtime = parseInt(h) * 60 + parseInt(m);
	                if (selectArray.runtime > modeArray[selectMode].maxTime) {
	                    selectArray.runtime = modeArray[selectMode].maxTime;
	                }

	                break;
	        }
	        this.trigger(selectArray);
	        console.log('selectArray------------', selectArray, modeArray[selectMode].maxTime);
	    },
	    onLaunchMode: function onLaunchMode(data) {
	        //置位字段加入计算，其他的按协议或约定发送
	        //let updateFlag = het.hexUpFlag(1, 2, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 1, 2)));

	        //硬件预约时间的概念是 所有工作完成时间,app的预约概念是  等待工作开始的时间.
	        //所以处理传给硬件的预约时间   预约时间+加热时间
	        //console.log('ordertimehour,ordertimemin,runtime',typeof(data.ordertimehour),typeof(data.ordertimemin),data.runtime);

	        //let _surplusreservehour = data.ordertimehour;
	        //let _surplusreservemin = data.ordertimemin;
	        //if(data.ordertimehour!=0||data.ordertimemin!=0){
	        //    console.log('&1111');
	        //    if(data.runtime>=60){
	        //        data.ordertimehour=data.ordertimehour +parseInt(data.runtime/60);
	        //        data.ordertimemin = data.ordertimemin+ data.runtime%60;
	        //        console.log('&&&&&&&&&&&&&',data.ordertimehour,data.ordertimemin);
	        //    }else{
	        //        console.log('&2222');
	        //        data.ordertimemin = data.ordertimemin+ data.runtime;
	        //    }
	        //}

	        var updateFlag = void 0;
	        if (data.ordertimehour == 0 && data.ordertimemin == 0) {
	            updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2));
	        } else {
	            updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2))));
	        }
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        setDataTimer('AppointmentOrHeat');
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = data.function;
	        appData.modeName = modeArray[data.function].name;
	        ////预约剩余时间
	        appData.surplusreservehour = data.ordertimehour;
	        appData.surplusreservemin = data.ordertimemin;
	        ////功能剩余时间
	        appData.surplusHeatingTime = data.runtime;
	        if (appData.mode != 1 && appData.mode != 0 && appData.mode != 18) {
	            if (appData.surplusreservehour != 0 || appData.surplusreservemin != 0) {
	                appData.AppointmentOrHeat = 1;
	            } else {
	                appData.AppointmentOrHeat = 2;
	            }
	        } else {
	            appData.AppointmentOrHeat = 0;
	        }
	        this.trigger(appData);
	        this.trigger({ selectshow: false });
	        this.trigger({ openSubscribeClock: false });
	        console.log("appDataappDataappDataappDataappDataappData", data, appData);
	        console.log("Store/// surplusreservehour,surplusreservemin,AppointmentOrHeat", appData.surplusreservehour, pData.surplusreservemin, appData.AppointmentOrHeat);
	    },
	    //取消之前选择的模式
	    onCancel: function onCancel(data) {
	        var updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2))));
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        console.log('取消', data);
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = data.function;
	        appData.modeName = '模式';
	        appData.AppointmentOrHeat = 0;
	        appData.reservehour = data.ordertimehour;
	        appData.reservemin = data.ordertimemin;
	        appData.surplusreservehour = data.ordertimehour;
	        appData.surplusreservemin = data.ordertimemin;
	        appData.heatingTime = data.runtime;
	        this.trigger(appData);
	    }
	});

/***/ }
/******/ ]);