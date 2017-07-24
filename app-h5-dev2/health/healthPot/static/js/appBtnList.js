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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var AppData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        filter: {
	            'workingmode': 1, //工作模式取控制数据type:0
	            'power': 1 }
	    });
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
	            workingmode: 0
	        };
	        AppData.networkavailable = _this.state.networkavailable ? _this.state.networkavailable : '';
	        AppData.online = _this.state.online ? _this.state.online : '';
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.handleMode = _this.handleMode.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch(e) {
	            //故障提示
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用');return false;
	            }
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            //冷水注入仅仅提示，仍可以操控设备
	            if (this.state.coldwater == 1) het.toast('冷水注入');
	            //设备干烧和壶坐分离仅仅给提示，只仅仅可以开关机
	            if (this.state.dryalarm == 1) het.toast('设备干烧');
	            if (this.state.separation == 1) het.toast('壶坐分离');
	            //处理开关机事件
	            var boots = this.state.boots == 1 ? 1 : 2;
	            _Actions.Actions.switch(boots);
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode(e) {
	            //故障提示
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用');return false;
	            }
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            if (this.state.dryalarm == 1) {
	                het.toast('设备干烧');return false;
	            }
	            if (this.state.separation == 1) {
	                het.toast('壶坐分离');return false;
	            }
	            if (this.state.coldwater == 1) {
	                het.toast('冷水注入');
	            } //冷水注入仅仅提示，仍可以操控设备
	            //出来操作
	            if (e.currentTarget.className != 'flex-cell item triggered') {
	                //document.querySelectorAll('.item').className='flex-cell item';
	                //$('.item').removeClass('triggered');
	                //e.currentTarget.className ='flex-cell item triggered';
	                if (this.state.boots == 2 || typeof this.state.boots == 'undefined') return false;
	                var modeId = e.currentTarget.getAttribute('data-mode');
	                console.log(modeId);
	                var mode = modeId;
	                var power = 800;
	                var heating = 0;
	                var reservation = 0;
	                var hideModeSet = true;
	                switch (modeId) {
	                    case 2:
	                        mode = 2;
	                        break; //烧水
	                    case 10:
	                        mode = 10;
	                        break; //煮蛋
	                    case 14:
	                        mode = 14;
	                        break; //花茶
	                }
	                if (mode == 10) power = 300;
	                _Actions.Actions.toggleModeChange(mode, power, heating, reservation, hideModeSet);
	                //appData.current = e.currentTarget.getAttribute('data-mode');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('-state-', JSON.stringify(this.state));
	            var power = this.state.power ? this.state.power : '2';
	            //console.log('--------------开关机转态',power);
	            var modeNameArray = {
	                0: { name: '模式', pic: 0, value: 0, mode: 0, powerTemperature: 0, heating: 0, reservation: 0 },
	                1: { name: '保温', live: 'on', pic: 9, value: 9, mode: 1, powerTemperature: 60, heating: 90, reservation: 0 },
	                2: { name: '烧水', pic: 6, value: 6, mode: 2, powerTemperature: 800, heating: 5, reservation: 0 },
	                3: { name: '纤体瘦身' },
	                4: { name: '祛斑美白' },
	                5: { name: '排毒养颜' },
	                6: { name: '滋补安神' },
	                7: { name: '调经四物汤' },
	                8: { name: '清新果茶' },
	                9: { name: '青春靓颜茶' },
	                10: { name: '花茶', live: 'on', pic: 1, value: 1, mode: 10, powerTemperature: 300, heating: 5, reservation: 0 },
	                11: { name: '水果茶', pic: 9 },
	                12: { name: '药膳', live: 'on', pic: 5, value: 5, mode: 12, powerTemperature: 200, heating: 40, reservation: 0 },
	                13: { name: '酸奶', pic: 4, value: 4, mode: 13, powerTemperature: 300, heating: 18, reservation: 0 },
	                14: { name: '煮蛋', pic: 2, value: 2, powerTemperature: 800, heating: 5, reservation: 0 },
	                15: { name: '煮面', live: 'on', pic: 3, value: 3, mode: 15, powerTemperature: 800, heating: 10, reservation: 0 },
	                16: { name: '滋补汤' },
	                17: { name: '银耳羹', pic: 10 },
	                18: { name: '火锅', live: 'on', pic: 8, value: 8, mode: 18, powerTemperature: 300, heating: 115, reservation: 0 },
	                19: { name: '煲汤', live: 'on', pic: 7, value: 7, mode: 19, powerTemperature: 300, heating: 115, reservation: 0 },
	                20: { name: '果茶' },
	                21: { name: '营养粥' },
	                22: { name: '婴儿用水' },
	                23: { name: '调奶' },
	                24: { name: '温奶' },
	                25: { name: '花草茶' },
	                26: { name: '百草茶' },
	                27: { name: '养颜茶' },
	                28: { name: '滋补茶' },
	                29: { name: '红茶' },
	                30: { name: '绿茶' },
	                31: { name: '煮酒' },
	                32: { name: '煮咖啡' },
	                33: { name: '蒸水蛋' },
	                34: { name: '养生汤' },
	                35: { name: '雪梨汤' },
	                36: { name: '隔水炖' },
	                37: { name: '甜品' },
	                38: { name: '炖燕窝' },
	                39: { name: '炖虫草' },
	                40: { name: '武火' },
	                41: { name: '文火' },
	                42: { name: '凉茶' },
	                43: { name: '宝宝粥' },
	                44: { name: '五谷粥' },
	                45: { name: '泡奶粉' },
	                46: { name: '热奶' },
	                47: { name: '消毒' }
	            };
	            var powerIdName = this.state.boots == 2 ? '关机' : '开机';
	            var modeId = this.state.workingmode ? this.state.workingmode : 0;
	            var modeOtherTxt = this.state.boots == 2 ? '未选择' : modeNameArray[modeId].name;
	            if (modeId == 0) modeOtherTxt = '--';
	            var modeName = modeId == 2 || modeId == 10 || modeId == 14 ? modeNameArray[modeId].name : modeOtherTxt;
	            var handleMode = power == 2 ? '' : this.handleMode;
	            var powerCss = power == 2 ? 'flex btnlist outer-close' : 'flex btnlist';
	            var btnTitle = this.state.online == 2 || this.state.networkavailable == 2 ? React.createElement(
	                'h1',
	                { className: 'btn-title' },
	                '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	            ) : React.createElement(
	                'h1',
	                { className: 'btn-title' },
	                '\xA0\xA0',
	                powerIdName,
	                '\xA0\xA0\u6A21\u5F0F:',
	                modeName,
	                '\xA0\xA0'
	            );
	            return React.createElement(
	                'figure',
	                null,
	                btnTitle,
	                React.createElement(
	                    'section',
	                    { className: powerCss },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSwitch },
	                        React.createElement('img', { src: '../static/img/btnlist/1.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.boots == 1 && this.state.boots != 'undefined' ? '关机' : '开机'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: modeId == 2 ? 'flex-cell item triggered' : 'flex-cell item', 'data-mode': '2', onTouchEnd: handleMode },
	                        React.createElement('img', { style: this.state.boots == 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnlist/2.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u70E7\u6C34'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: modeId == 10 ? 'flex-cell item triggered' : 'flex-cell item', 'data-mode': '10', onTouchEnd: handleMode },
	                        React.createElement('img', { style: this.state.boots == 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnlist/4.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u82B1\u8336'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: modeId == 14 ? 'flex-cell item triggered' : 'flex-cell item', 'data-mode': '14', onTouchEnd: handleMode },
	                        React.createElement('img', { style: this.state.boots == 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnlist/3.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u716E\u86CB'
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
	    het.setTitle('C-Life 设备控制');
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
	'switch', //开关机
	'getDefaultData', 'submitSelect', //提交选择
	'cancleSelect', //取消选择
	'toggleSelectShow', 'toggleMode', //
	'toggleModeShow', //展开模式设置面板
	'toggleModeSelect', //选择模式
	'toggleModeChange', //切换工作模式
	'toggleBack', //返回按钮,
	'toggleOuter' //快捷按钮
	]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {onRepaint} 获取运行数据渲染
	 * @type {onSwitch} 开关机
	 * @type {onSubmitSelect} 提交选择数据
	 * @type {onCancleSelect} 隐藏选择插件
	 * @type {onToggleModeShow} 显隐模式面板
	 * @type {onToggleModeSelect} 设置模式面板
	 * @type {toggleModeSet} 切换工作模式
	 * @params data默认取运行数据（type:1）渲染页面，该设备需要同时用到控制数据和运行数据渲染页面,
	 * @params data字段 if判断，开启数据渲染判断筛选，因为渲染同时使用了控制数据（设备配置）和运行数据（故障数据也在type:1的运行数据里）
	 * @params 但故障数据（也放到运行数据里发送）不包含power等开关机字段，需要先判断故障数据过来是否有该字段，防止缺少字段的故障数据过来冲掉正常运行数据里的字段
	 */
	//~_~ My first react page is so ugly,any problem please email to 576478636@qq.com,i won't be back to you

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isClose = exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var AppData = {
	    count: 0,
	    fold: false,
	    dryalarm: 0,
	    coldwater: 0,
	    separation: 0,
	    record_time: 0,
	    dryalarm_hint: 0,
	    separation_hint: 0
	};
	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.online) AppData.online = data.online;
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.workingmode) {
	            AppData.workingmode = data.workingmode;
	        }
	        //防止故障数据的少字段传入导致先前的字段被冲刷
	        if (data.power) {
	            AppData.power = data.power;
	            AppData.boots = data.power;
	            data.boots = data.power;
	        }
	        //计数器，H5两次点击同一模式，设置同样的预约时间启动，视为不同模式
	        if (data.count) {
	            AppData.count = data.count;
	        }
	        //故障数据缓存
	        data.dryalarm != undefined ? AppData.dryalarm = data.dryalarm : data.dryalarm = AppData.dryalarm;
	        data.coldwater != undefined ? AppData.coldwater = data.coldwater : data.coldwater = AppData.coldwater;
	        data.separation != undefined ? AppData.separation = data.separation : data.separation = AppData.separation;

	        if (data.power == 2) {
	            data.coldwater = 0;
	            data.dryalarm = 0;
	            data.separation = 0;
	        }
	        //离线online=2 离线
	        if (data.online == 2) {
	            AppData.dryalarm = 0;
	            AppData.coldwater = 0;
	            AppData.separation = 0;
	            data.coldwater = 0;
	            data.dryalarm = 0;
	            data.separation = 0;
	        }

	        ////当前加热时间
	        //if(data.timehour!=undefined){
	        //    AppData.timehour = data.timehour;
	        //}
	        //if(data.timemin!=undefined){
	        //    AppData.timemin = data.timemin;
	        //}
	        ////当前预约时间
	        //if(data.reservation){
	        //    AppData.reservation = data.reservation;
	        //};
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        if (isClose() || value == 2) {
	            // 关机状态，开机
	            AppData.power = 1;
	            AppData.boots = 1;
	            AppData.status = 0;
	            AppData.selectMode = 0;
	            AppData.slide = 2;
	            AppData.selectShow = 0;
	        } else {
	            // 开机状态，关机
	            AppData.power = 2;
	            AppData.boots = 2;
	            AppData.status = 1;
	            AppData.slide = 2;
	            AppData.selectShow = 0;
	        }
	        AppData.workingmode = 0;
	        AppData.reservation = 0;
	        //关机不再人为重置故障状态，跟随设备返回的数据执行故障提示
	        //AppData.dryalarm = 0;
	        //AppData.coldwater = 0;
	        //AppData.separation = 0;
	        var u0 = het.hexUpFlag(0, 1, 2); //开关机 标志位0
	        AppData.updateFlag = u0;
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger(AppData);
	    },
	    onSubmitSelect: function onSubmitSelect(hour, minute, slide, whereSet) {
	        if (isFault()) {
	            this.trigger(AppData);het.toast(isFault());return false;
	        };
	        var AppDataLive = {
	            //power: 1,
	            //reservation: AppData.reservation,
	            //timehour: AppData.timehour,
	            //timemin: AppData.timemin
	        };
	        //仅仅A实时发送，且只是有些模式可以实时发送,外部功率设置
	        if (whereSet == 'A') {
	            var u2u3Live = '';
	            if (AppData.workingmode == 1) {
	                AppDataLive.heatpreservation = hour;
	                AppData.heatpreservation = hour;
	                u2u3Live = het.hexUpFlag(2, 1, 2); //保温-标志位2
	            } else {
	                AppDataLive.heatingpower = hour / 100;
	                AppData.heatingpower = hour / 100;
	                u2u3Live = het.hexUpFlag(3, 1, 2); //功率-标志位3
	            }
	            AppDataLive.updateFlag = u2u3Live;
	            het.send(AppDataLive, function (data) {}, function (data) {
	                het.toast("命令发送失败");
	            });

	            AppData.powerTemperature = hour;
	            //console.log('实时切换功率or保温温度'+hour,minute,'实时提交字段'+JSON.stringify(AppDataLive));
	        } else if (whereSet == 'B') {
	            AppData.selectPower = hour;
	        } else if (whereSet == 'C') {
	            AppData.selectHeating = hour;
	        } else if (whereSet == 'D') {
	            //预约时间计算
	            var sendTime = parseInt(hour) * 60 + minute;
	            if (minute == 59) {
	                minute = 0;
	                hour = parseInt(hour) + 1;
	            }
	            sendTime = parseInt(hour) * 60 + parseInt(minute);
	            AppData.selectReservation = sendTime;
	        }
	        AppData.selectShow = 0;
	        AppData.slide = slide;

	        this.trigger(AppData);
	    },
	    onCancleSelect: function onCancleSelect(value, type) {
	        this.trigger({ selectShow: 0 });
	    },
	    onToggleModeShow: function onToggleModeShow(slideData) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.slide = slideData.slide;
	        AppData.fold = slideData.fold;
	        this.trigger(slideData);
	    },
	    onToggleSelectShow: function onToggleSelectShow() {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	    },
	    onToggleModeSelect: function onToggleModeSelect(selectMode, selectPower, selectHeating, selectReservation) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.selectMode = selectMode;
	        AppData.selectPower = selectPower;
	        AppData.selectHeating = selectHeating;
	        AppData.selectReservation = selectReservation;
	        AppData.slide = 1;
	        AppData.fold = true;
	        this.trigger(AppData);
	    },
	    onToggleModeChange: function onToggleModeChange(mode, power, heating, reservation, hideModeSet, status) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.slide = 2;
	        AppData.modeShow = hideModeSet;
	        AppData.status = status || 2;
	        //updateFlag校验位开始
	        reservation === undefined && (reservation = 0);
	        AppData.reservation = reservation / 10; //预约时间(必须)除以10传给设备
	        //加热功率or保温温度
	        if (mode == 1) {
	            AppData.heatpreservation = power; //保温温度(二选一);
	        } else {
	            delete AppData.heatpreservation;
	            AppData.heatingpower = power / 100; //加热功率(二选一)
	        }
	        AppData.workingmode = mode; //工作模式(必须)
	        //console.log('--模式--',mode)
	        //工作时间，酸奶模式为13
	        if (mode == 13) {
	            AppData.timehour = heating; //酸奶4-18H
	            AppData.timemin = 0; //酸奶没有加热分钟设置
	            AppData.heatingTime = AppData.timehour;
	        } else {
	            AppData.timehour = 0;
	            AppData.timemin = 0;
	            AppData.heatingTime = 0;
	        }
	        var u1 = het.hexUpFlag(1, 1, 2); //预约时间-标志位1O
	        var u2u3 = 0; //保温温度-标志位2//加热功率-标志位3
	        mode == 1 ? u2u3 = het.hexUpFlag(2, 1, 2, u1) : u2u3 = het.hexUpFlag(3, 1, 2, u1);
	        var u4 = het.hexUpFlag(4, 1, 2, u2u3); //工作模式-标志位4
	        if (mode == 13) {
	            var u5 = het.hexUpFlag(5, 1, 2, u4); //工作时间-标志位5高位
	            var u6 = het.hexUpFlag(6, 1, 2, u5); //工作时间-标志位6低位
	            AppData.updateFlag = u6;
	        } else {
	            AppData.updateFlag = u4;
	        }
	        //发送规则，不置位字段需要发送0，否则框架会合并上一次字段到发送对象中,切记
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        AppData.powerTemperature = power;
	        AppData.count = AppData.count + 1;

	        //数据延迟，清空倒计时，温度，状态，
	        AppData.surplusreservationtimehour = 0;
	        AppData.surplusreservationtimemin = 0;
	        AppData.surplusworktimehour = 0;
	        AppData.surplusworktimemin = 0;
	        AppData.surplusheatpreservationhour = 0;
	        AppData.surplusheatpreservationmin = 0;

	        this.trigger(AppData);
	        //console.log('--启动--',AppData.count,mode,power,heating,reservation,hideModeSet,JSON.stringify(AppData));
	    }
	});

	// 判断是否关机状态1开机2关机
	var isClose = exports.isClose = function isClose() {
	    return AppData.power == 2 || AppData.power === undefined;
	};
	// 判断是否关

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

/***/ }
/******/ ]);