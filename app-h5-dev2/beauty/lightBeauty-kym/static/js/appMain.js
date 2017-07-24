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

	var _fun = __webpack_require__(4);

	var _Toast = __webpack_require__(6);

	var _Toast2 = _interopRequireDefault(_Toast);

	var _SettingButton = __webpack_require__(7);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	var _DevScreenKym = __webpack_require__(8);

	var _SelectsKym = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// app数据
	var AppData = {};

	// 加载组件
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;
	//let myscroller; // iscroll滚动容器

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
	'toggleBusi', // 自动/手动模式切换
	'selectAny', // 选择模式
	'sync' // 同步数据
	]);

	// 智能模式（展会版本使用）
	var AppModes = {
	    1: { //清洁
	        ut: 3,
	        imp: 0,
	        exp: 3,
	        knead: 1,
	        light: 1,
	        time: 15,
	        configMode: 1
	    },
	    2: { // 回春
	        ut: 0,
	        imp: 3,
	        exp: 0,
	        knead: 1,
	        light: 2,
	        time: 10,
	        configMode: 2
	    },
	    3: { // 滋养
	        ut: 0,
	        imp: 3,
	        exp: 0,
	        knead: 1,
	        light: 3,
	        time: 15,
	        configMode: 3
	    },
	    4: { // 美白
	        ut: 3,
	        imp: 0,
	        exp: 3,
	        knead: 1,
	        light: 2,
	        time: 13,
	        configMode: 4
	    },
	    5: { // 自定义
	        ut: 0,
	        imp: 0,
	        exp: 0,
	        knead: 0,
	        light: 0,
	        time: 5,
	        configMode: 5
	    }
	};

	// 定义store
	var AppStore = Reflux.createStore({
	    listenables: [AppActions],
	    onRepaint: function onRepaint(data) {
	        if (AppData.busiSwitch) {
	            // 展会版本添加
	            AppModes[5].ut = typeof data.ut !== 'undefined' ? data.ut : AppModes[5].ut;
	            AppModes[5].imp = typeof data.imp !== 'undefined' ? data.imp : AppModes[5].imp;
	            AppModes[5].exp = typeof data.exp !== 'undefined' ? data.exp : AppModes[5].exp;
	            AppModes[5].knead = typeof data.knead !== 'undefined' ? data.knead : AppModes[5].knead;
	            AppModes[5].light = typeof data.light !== 'undefined' ? data.light : AppModes[5].light;
	            AppModes[5].time = typeof data.time !== 'undefined' ? data.time : AppModes[5].time;
	            AppModes[5].configMode = typeof data.configMode !== 'undefined' ? data.configMode : AppModes[5].configMode;
	            data = _fun.Funs._extends({}, data, getBusiData(AppData));
	        }
	        this.trigger(data);
	    },
	    onToggleBusi: function onToggleBusi() {
	        if (AppData.skinDataCode == 0) {
	            het.toast('您还未测试肤质，请先测试肤质！');
	            return;
	        }
	        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
	        if (AppData.busiSwitch) {
	            // 自动模式
	            AppModes[5].ut = AppData.ut;
	            AppModes[5].imp = AppData.imp;
	            AppModes[5].exp = AppData.exp;
	            AppModes[5].knead = AppData.knead;
	            AppModes[5].light = AppData.light;
	            AppModes[5].time = AppData.time;
	            AppModes[5].configMode = AppData.configMode;
	            _fun.Funs._extends(AppData, getBusiData(AppData));
	        } else {
	            // 切回手动模式
	            AppData.ut = AppModes[5].ut;
	            AppData.imp = AppModes[5].imp;
	            AppData.exp = AppModes[5].exp;
	            AppData.knead = AppModes[5].knead;
	            AppData.light = AppModes[5].light;
	            AppData.time = AppModes[5].time;
	            AppData.configMode = AppModes[5].configMode;
	        }
	        AppData.needSave = getSaveFlag();
	        this.trigger(AppData);
	    },
	    onSelectAny: function onSelectAny(data) {
	        // updateFlag映射表
	        /*var flagMap = {
	            "ut" : 0x01, // 超声波标记位
	            "exp" : 0x02, // 导出标记位
	            "imp" : 0x04, // 导入标记位
	            "knead" : 0x08, // 按摩标记位
	            "light" : 0x10, // 采光标记位
	            "time" : 0x20 // 运行时间标记位
	        };*/
	        for (var k in data) {
	            // AppData.updateFlag |= flagMap[k]; // 设置标记位
	            AppData[k] = data[k]; // 设置修改数据
	        }
	        AppData.needSave = getSaveFlag();
	        // data.updateFlag = AppData.updateFlag;
	        this.trigger(data);
	    },
	    onSync: function onSync() {
	        // 同步数据至app
	        var sendData = _fun.Funs._extends({}, AppData);
	        if (AppData.needSave) {
	            // if (AppData.light==8) {
	            //     sendData.light = 9;
	            // }
	            // if (AppData.light==9) {
	            //     sendData.light = 8;
	            // }
	            sendData.configMode = AppData.currentRunMode;
	            het.send(sendData, function (data) {
	                het.toast("同步成功！");
	            }, function (data) {
	                het.toast("同步失败！");
	            });
	            AppData.needSave = false; // 重置标记位
	            this.trigger({ needSave: false });
	            mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }
	});

	// 定义app对象

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            currentRunMode: 0,
	            ut: 0,
	            imp: 0,
	            exp: 0,
	            knead: 0,
	            light: 0,
	            time: 0,
	            skinDataCode: 0,
	            busiSwitch: 0
	        };
	        // 基本数据
	        _this.baseData = {
	            modes: { 0: "请选择", 1: "清洁", 2: "回春", 3: "滋养", 4: "美白", 5: "自定义" },
	            skins: ["综合肤质", "干性肤质", "中性偏干", "中性肤质", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            lights: { 0: "关闭", 1: "黄光", 2: "蓝光", 3: "红光" },
	            uts: ["关闭", "一档", "二档", "三档", "四档", "五档"]
	        };
	        _this.listenStore(AppStore);
	        return _this;
	    }
	    // componentDidUpdate(){
	    //     try {
	    //         myscroller.refresh();
	    //     } catch (err) {}
	    // }


	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }, {
	        key: 'handlerTouchMove',
	        value: function handlerTouchMove(e) {
	            // if (e.target.type!=="range") {
	            //     e.preventDefault(); // 修复touchmove无效的BUG
	            // }
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            if (AppData.busiSwitch) {
	                // 自动模式，不允许点击
	                e.preventDefault();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var mode = this.state.busiSwitch ? this.state.recommendMode : this.state.currentRunMode; // 取得当前模式
	            var cusMode = mode == 5 ? true : false; // 自定义模式
	            var modeClass = cusMode ? "active" : "";
	            var ie = this.state.exp || this.state.imp; // 导出/导入档位
	            return React.createElement(
	                'div',
	                { className: 'app-body flex-column', onClick: this.handleClick.bind(this), onTouchMove: this.handlerTouchMove.bind(this) },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller', className: 'flex-cell' },
	                    React.createElement(
	                        'section',
	                        null,
	                        React.createElement(_DevScreenKym.DevScreen, { moisture: this.state.moisture, skinDataCode: this.state.skinDataCode,
	                            recommendMode: this.baseData.modes[this.state.recommendMode],
	                            skinType: this.baseData.skins[this.state.skinType],
	                            onlineStatus: this.state.onlineStatus,
	                            busiSwitch: this.state.busiSwitch, toggleBusiSwitch: AppActions.toggleBusi }),
	                        React.createElement(
	                            'div',
	                            { className: 'pselect flex' },
	                            React.createElement(
	                                'label',
	                                null,
	                                '\u5F53\u524D\u6A21\u5F0F'
	                            ),
	                            React.createElement(
	                                'a',
	                                { id: 'test1', href: "#/select/mode/" + mode, className: 'val flex-cell' },
	                                this.baseData.modes[mode]
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'select-wrap flex' },
	                            React.createElement(
	                                'div',
	                                { className: modeClass + " qselect flex-cell flex" },
	                                React.createElement(
	                                    'label',
	                                    null,
	                                    '\u8D85\u58F0\u6CE2'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: cusMode ? "#/select/ut/" + this.state.ut : "javascript:", className: 'val flex-cell' },
	                                    this.baseData.uts[this.state.ut]
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: modeClass + " qselect flex-cell flex" },
	                                React.createElement(
	                                    'label',
	                                    null,
	                                    '\u5BFC\u5165/\u5BFC\u51FA'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: cusMode ? "#/select/ie/" + ie + "/" + (this.state.exp ? "exp" : "imp") : "javascript:", className: 'val flex-cell' },
	                                    (ie ? this.state.exp ? "导出" : "导入" : "") + this.baseData.uts[ie]
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'select-wrap flex' },
	                            React.createElement(
	                                'div',
	                                { className: modeClass + " qselect flex-cell flex" },
	                                React.createElement(
	                                    'label',
	                                    null,
	                                    '\u6309\u6469'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: cusMode ? "#/select/knead/" + this.state.knead : "javascript:", className: 'val flex-cell' },
	                                    this.state.knead != 0 ? "开启" : "关闭"
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: modeClass + " qselect flex-cell flex" },
	                                React.createElement(
	                                    'label',
	                                    null,
	                                    '\u5F69\u5149'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: cusMode ? "#/select/light/" + this.state.light : "javascript:", className: 'val flex-cell' },
	                                    this.baseData.lights[this.state.light]
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: modeClass + " qselect flex-cell timelen flex" },
	                            React.createElement(
	                                'label',
	                                { className: 'flex-cell time-label' },
	                                '\u603B\u65F6\u957F\uFF1A'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: cusMode ? "#/select/time/" + this.state.time : "javascript:", className: 'val flex-cell' },
	                                this.state.time,
	                                'min'
	                            )
	                        ),
	                        this.state.battery < 5 && this.state.chargeStatus < 2 && this.state.onlineStatus == 1 ? React.createElement(
	                            'div',
	                            { className: 'battery' },
	                            '\u7535\u91CF\u4E0D\u8DB3\uFF0C\u8BF7\u5145\u7535'
	                        ) : ""
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'footer' },
	                    React.createElement(_SettingButton2.default, { settingStatus: AppData.needSave ? "on" : "off", callback: AppActions.sync.bind(this) })
	                ),
	                this.props.children,
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	;

	// 定义路由
	var Routes = React.createElement(
	    Router,
	    { history: hashHistory },
	    React.createElement(
	        Route,
	        { path: '/', component: App },
	        React.createElement(Route, { path: '/select/:component/:initValue', component: _SelectsKym.Selects }),
	        React.createElement(Route, { path: '/select/:component/:initValue/:other', component: _SelectsKym.Selects })
	    )
	);

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        // 模板数据与接口数据映射表
	        debugMode: "print", // 打印调试数据
	        useUpdateFlag: true, // 自动添加updateFlag标记
	        webDataMap: {
	            "recommendMode": "mode", // 推荐模式
	            "currentRunMode": "currentRunMode", // 当前模式
	            "skinDataCode": "skinDataCode", // 有无肤质数据
	            "skinType": "skinType5", // 肤质
	            "configMode": "configMode", // 是否智能模式
	            "moisture": "waterTrend", // 水分提升
	            "ut": "gears1", // 超声波
	            "exp": "gears2", // 导出
	            "imp": "gears3", // 导入
	            "knead": "gears4", // 按摩
	            "light": "gears5", // 采光
	            "time": "runTime", // 时长
	            "battery": "electricity", // 电量
	            "chargeStatus": "chargeStatus" // 充电状态
	        },
	        updateFlagMap: {
	            "ut": 1, // 超声波标记位
	            "exp": 2, // 导出标记位
	            "imp": 3, // 导入标记位
	            "knead": 4, // 按摩标记位
	            "light": 5, // 采光标记位
	            "time": 6 // 运行时间标记位
	        }
	    });
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    ReactDOM.render(Routes, document.getElementById('ROOT'));

	    // 调用iscroll处理页面滚动
	    // setTimeout(function(){
	    //     myscroller = new IScroll("#panel-scroller", {
	    //         vScroll:true,
	    //         vScrollbar:false, 
	    //         //bounce:false,
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
	    // console.log(data);
	    if (AppData.needSave) return; // 未同步前忽略新接收到的数据
	    _fun.Funs._extends(AppData, data);
	    // if (data.busiSwitch) { // 自动模式
	    //     Fun._extends(AppData, getBusiData(data));
	    // }
	    AppActions.repaint(AppData);
	});

	/**
	 * 获取自动模式数据
	 * ! 该方法为展会版本专用
	 * @param    {json}   data 原始数据
	 * @return   {json}        提取到的自动模式数据
	 */
	function getBusiData(data) {
	    // var tmp = data.importExportConfig;
	    // var busiData = {};
	    // for (var i in AppModes) {
	    //     if (AppModes[i].id==AppData.recommendMode) {
	    //         busiData = AppModes[i].data;
	    //         break;
	    //     }
	    // }
	    // if (tmp) {
	    //     busiData["ut"] = tmp["gears1"], // 超声波
	    //     busiData["exp"] = tmp["gears2"]; // 导出
	    //     busiData["imp"] = tmp["gears3"]; // 导入
	    //     busiData["knead"] = tmp["gears4"]; // 按摩
	    //     busiData["light"] = tmp["gears5"]; // 采光
	    //     busiData["time"] = tmp["runTime"];  // 时长
	    // }
	    // return busiData;
	    return AppModes[AppData.recommendMode];
	}

	/**
	 * 判断是否需要保存
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getSaveFlag() {
	    // return !!Object.keys(het.diff(AppData)).length;
	    var count = 0;
	    var data = het.diff(AppData);
	    for (var k in data) {
	        if (k === 'updateFlag' || typeof data[k] === 'undefined') continue;
	        count++;
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(5);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} busiSwitch     是否自动模式
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} toggleBusiSwitch 切换自动/手动模式
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var DevScreen = exports.DevScreen = function (_BaseComponent) {
	    _inherits(DevScreen, _BaseComponent);

	    function DevScreen(props) {
	        _classCallCheck(this, DevScreen);

	        var _this = _possibleConstructorReturn(this, (DevScreen.__proto__ || Object.getPrototypeOf(DevScreen)).call(this, props));

	        _this.state = {};
	        _this.skins = [];

	        return _this;
	    }

	    _createClass(DevScreen, [{
	        key: "handleBusiSwitch",
	        value: function handleBusiSwitch() {
	            this.props.toggleBusiSwitch();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var tips = [React.createElement(
	                "span",
	                null,
	                "\u4E3A\u4F7F\u5EB7\u8335\u7F8E\u5F69\u5149\u7F8E\u5BB9\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5...",
	                React.createElement(
	                    "a",
	                    { href: "cbeauty://cbeauty_skintest" },
	                    "\u53BB\u6D4B\u8BD5\u80A4\u8D28>>"
	                )
	            ), React.createElement(
	                "span",
	                null,
	                "\u60A8\u5F53\u524D\u80A4\u8D28\u4E3A",
	                this.props.skinType,
	                "\uFF0C\u63A8\u8350\u60A8\u4F7F\u7528",
	                this.props.recommendMode,
	                "\u6A21\u5F0F\uFF01\u7F8E\u4E3D\u5973\u4EBA\u662F\u517B\u51FA\u6765\u7684~"
	            ), React.createElement(
	                "span",
	                null,
	                "\u60A8\u4F7F\u7528\u4E86\u5EB7\u8335\u7F8E\u5F69\u5149\u7F8E\u5BB9\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86",
	                this.props.moisture,
	                "%\uFF0C\u8BF7\u7EE7\u7EED\u4FDD\u6301~"
	            )];
	            var index = this.props.skinDataCode;
	            return React.createElement(
	                "section",
	                { className: "screen" },
	                this.props.busiSwitch == "1" ? React.createElement(
	                    "div",
	                    { className: "gear-choose", onTouchEnd: this.handleBusiSwitch.bind(this) },
	                    React.createElement(
	                        "div",
	                        { className: "gear-txt" },
	                        "\u81EA\u52A8"
	                    ),
	                    React.createElement("div", { className: "gear-circle" })
	                ) : React.createElement(
	                    "div",
	                    { className: "gear-choose", onTouchEnd: this.handleBusiSwitch.bind(this) },
	                    React.createElement(
	                        "div",
	                        { className: "gear-txts" },
	                        "\u624B\u52A8"
	                    ),
	                    React.createElement("div", { className: "gear-circle gear-circles" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "pic" },
	                    React.createElement("img", { src: "../static/img/ico-kym.png" }),
	                    this.props.onlineStatus == 2 ? React.createElement(
	                        "span",
	                        { className: "offline" },
	                        "\u60A8\u7684\u8BBE\u5907\u5DF2\u79BB\u7EBF"
	                    ) : ""
	                ),
	                React.createElement(
	                    "div",
	                    { className: "tip" },
	                    tips[index]
	                )
	            );
	        }
	    }]);

	    return DevScreen;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Selects = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _SelectModesKym = __webpack_require__(10);

	var _SelectUts = __webpack_require__(11);

	var _SelectLightsKym = __webpack_require__(13);

	var _SelectIe = __webpack_require__(14);

	var _SelectKneadKym = __webpack_require__(15);

	var _SelectTimer = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 选择列表组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 当路由/select/:component/:initValue时，将会调用该组件。
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 子组件由:component指定，初始值由:initValue指定
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @variable {object} ReactRouter  需要一个名为ReactRouter的react路由对象以提供State访问服务
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act AppActions.selectAny([json]) 点击确定时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	// 可供调用的组件列表
	// var components = {
	//     "mode" : require('./Select-modes-kym.es6'),
	//     "ut" : require('./Select-uts.es6'),
	//     "light" : require('./Select-lights-kym.es6'),
	//     "ie" : require('./Select-ie.es6'),
	//     "knead" : require('./Select-knead-kym.es6'),
	//     "time" : require('./Select-timer.es6')
	// };
	var components = {
	    "mode": _SelectModesKym.modes,
	    "ut": _SelectUts.uts,
	    "light": _SelectLightsKym.lights,
	    "ie": _SelectIe.ies,
	    "knead": _SelectKneadKym.kneads,
	    "time": _SelectTimer.timers
	};
	window.SelectActions = Reflux.createActions(['selected' // 选定
	]);
	var strikeTimer = void 0; // 处理低版本浏览器tap点透BUG的计时器
	var SelectStore = Reflux.createStore({
	    listenables: [SelectActions],
	    onSelected: function onSelected(data) {
	        this.trigger(data);
	    }
	});

	var Selects = exports.Selects = function (_BaseComponent) {
	    _inherits(Selects, _BaseComponent);

	    function Selects(props) {
	        _classCallCheck(this, Selects);

	        var _this = _possibleConstructorReturn(this, (Selects.__proto__ || Object.getPrototypeOf(Selects)).call(this, props));

	        _this.state = {};
	        _this.listenStore(SelectStore);
	        return _this;
	    }

	    _createClass(Selects, [{
	        key: 'handlerOkClick',
	        value: function handlerOkClick(e) {
	            var selBody = ReactDOM.findDOMNode(this.refs["body"]);
	            // 处理低版本浏览器tap点透BUG
	            if (new Date() - strikeTimer < 600) {
	                return false;
	            }
	            e.preventDefault();
	            AppActions.selectAny(this.state);
	            selBody.className = selBody.className.replace(/ on/g, "");
	            setTimeout(function () {
	                history.go(-1);
	            }, 300);
	        }
	    }, {
	        key: 'handlerNoClick',
	        value: function handlerNoClick(e) {
	            var selBody = ReactDOM.findDOMNode(this.refs["body"]);
	            // 处理低版本浏览器tap点透BUG
	            if (new Date() - strikeTimer < 600) {
	                return false;
	            }
	            e.preventDefault();
	            selBody.className = selBody.className.replace(/ on/g, "");
	            setTimeout(function () {
	                history.go(-1);
	            }, 300);
	        }
	    }, {
	        key: 'handlerBodyClick',
	        value: function handlerBodyClick(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var selBody = ReactDOM.findDOMNode(this.refs["body"]);
	            strikeTimer = new Date();
	            setTimeout(function () {
	                selBody.className += " on";
	            }, 10);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _params = this.props.params;
	            // console.log(_params)
	            var Component = components[_params['component']]; // 取得组件
	            var initValue = _params['initValue']; // 取得组件初始值
	            var other = _params['other'] == undefined ? '' : _params['other']; // 取得组件初始值

	            return React.createElement(
	                'section',
	                { className: 'popselect-wrap', onClick: this.handlerNoClick.bind(this) },
	                React.createElement(
	                    'div',
	                    { ref: 'body', className: 'popselect-body', onClick: this.handlerBodyClick.bind(this) },
	                    React.createElement(
	                        'div',
	                        { className: 'popselect-btns flex' },
	                        React.createElement(
	                            'a',
	                            { href: '#', onClick: this.handlerNoClick.bind(this), className: 'flex-cell popselect-btns-no' },
	                            '\u53D6\u6D88'
	                        ),
	                        React.createElement('span', { className: 'flex-cell' }),
	                        React.createElement(
	                            'a',
	                            { href: '#', onClick: this.handlerOkClick.bind(this), className: 'flex-cell popselect-btns-ok' },
	                            '\u786E\u8BA4'
	                        )
	                    ),
	                    Component ? React.createElement(Component, { value: initValue, other: other }) : ""
	                )
	            );
	        }
	    }]);

	    return Selects;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.modes = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 选择模式组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  模式id
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var modes = exports.modes = function (_BaseComponent) {
	    _inherits(modes, _BaseComponent);

	    function modes(props) {
	        _classCallCheck(this, modes);

	        var _this = _possibleConstructorReturn(this, (modes.__proto__ || Object.getPrototypeOf(modes)).call(this, props));

	        _this.state = {};
	        _this.items = [{ id: "1", text: "清洁", data: {
	                ut: 3,
	                imp: 0,
	                exp: 3,
	                knead: 1,
	                light: 1,
	                time: 15,
	                configMode: 1
	            } }, { id: "2", text: "回春", data: {
	                ut: 0,
	                imp: 3,
	                exp: 0,
	                knead: 1,
	                light: 2,
	                time: 10,
	                configMode: 2
	            } }, { id: "3", text: "滋养", data: {
	                ut: 0,
	                imp: 3,
	                exp: 0,
	                knead: 1,
	                light: 3,
	                time: 15,
	                configMode: 3
	            } }, { id: "4", text: "美白", data: {
	                ut: 3,
	                imp: 0,
	                exp: 3,
	                knead: 1,
	                light: 2,
	                time: 13,
	                configMode: 4
	            } }, { id: "5", text: "自定义", data: {
	                ut: 0,
	                imp: 0,
	                exp: 0,
	                knead: 0,
	                light: 0,
	                time: 5,
	                configMode: 5
	            } }];

	        return _this;
	    }

	    _createClass(modes, [{
	        key: "handlerClick",
	        value: function handlerClick(e) {
	            var value = e.currentTarget.getAttribute("data-value");
	            var data = void 0;
	            for (var i in this.items) {
	                if (this.items[i].id === value) {
	                    data = this.items[i].data;
	                    break;
	                }
	            }
	            this.setState({ value: value });
	            data.currentRunMode = value;
	            SelectActions.selected(data);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            return React.createElement(
	                "div",
	                { className: "select-modes" },
	                React.createElement(
	                    "h2",
	                    null,
	                    "\u6A21\u5F0F\u9009\u62E9"
	                ),
	                React.createElement(
	                    "menu",
	                    null,
	                    this.items.map(function (item, index) {
	                        return React.createElement("input", { key: index, className: item.id == value ? "active" : "", type: "button", value: item.text, "data-value": item.id, onTouchEnd: this.handlerClick.bind(this) });
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return modes;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.uts = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _qslidor = __webpack_require__(12);

	var _qslidor2 = _interopRequireDefault(_qslidor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 超声波配置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  模式id
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var uts = exports.uts = function (_BaseComponent) {
	    _inherits(uts, _BaseComponent);

	    function uts(props) {
	        _classCallCheck(this, uts);

	        var _this = _possibleConstructorReturn(this, (uts.__proto__ || Object.getPrototypeOf(uts)).call(this, props));

	        _this.state = {};
	        _this.items = [{ id: "1", text: "一档" }, { id: "2", text: "二档" }, { id: "3", text: "三档" }, { id: "4", text: "四档" }, { id: "5", text: "五档" }];

	        return _this;
	    }

	    _createClass(uts, [{
	        key: 'handlerSwitch',
	        value: function handlerSwitch(e) {
	            var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	            e.preventDefault();
	            this.setState({ value: value });
	            SelectActions.selected({ "ut": value });
	        }
	    }, {
	        key: 'feedback',
	        value: function feedback(value) {
	            SelectActions.selected({ "ut": value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            return React.createElement(
	                'div',
	                { className: 'select-uts' },
	                React.createElement(
	                    'div',
	                    { className: 'flex popselect-hd' },
	                    React.createElement(
	                        'h2',
	                        { className: 'flex-cell' },
	                        '\u8D85\u58F0\u6CE2'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'popselect-hd-right flex-cell tr' },
	                        React.createElement('a', { href: '#', onTouchEnd: this.handlerSwitch.bind(this), className: "qswitch " + (value == 0 ? "off" : "on") })
	                    )
	                ),
	                React.createElement(_qslidor2.default, { disabled: value == 0 ? true : false, items: this.items, value: value, fnFeedback: this.feedback.bind(this) })
	            );
	        }
	    }]);

	    return uts;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {array}    items       传入组件，格式：[{id:ID,text:TEXT},..]
	 * @prop {integer}  value       传入初始值
	 * @prop {boolean}  disabled    是否可以点击
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 */
	var QSlidor = React.createClass({
	    displayName: "QSlidor",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    slidable: false,
	    XY: { startX: 0, startY: 0, endX: 0, endY: 0 },
	    handlerTouchStart: function handlerTouchStart(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        this.XY.startX = this.XY.endX = touchs[0].pageX;
	        this.XY.startY = this.XY.endY = touchs[0].pageY;
	        // 检测滑动是否有效
	        if (touchs.length === 1 && !this.props.disabled) {
	            cursor.style.marginLeft = 0;
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.startX >= el.offsetLeft && this.XY.startX <= el.offsetLeft + el.offsetWidth) {
	                    // 检测是否位于已激活的选项内开始滑动的。如否，则不允许滑动
	                    // this.slidable = el.className.indexOf("active")>-1; 
	                    this.slidable = true;
	                }
	            }.bind(this));
	        }
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var left = touchs[0].pageX - parent.offsetLeft - cursor.offsetWidth / 2;
	        e.preventDefault();
	        if (this.slidable) {
	            cursor.style.opacity = 1;
	            cursor.style.left = left + "px";
	        }
	    },
	    handlerTouchEnd: function handlerTouchEnd(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.changedTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var ml = 0;
	        this.XY.endX = touchs[0].pageX;
	        this.XY.endY = touchs[0].pageY;
	        if (this.slidable) {
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.endX >= el.offsetLeft && this.XY.endX <= el.offsetLeft + el.offsetWidth) {
	                    ml = el.offsetLeft - (this.XY.endX - parent.offsetLeft - cursor.offsetWidth * 3 / 2);
	                    cursor.style.marginLeft = ml + "px";
	                    cursor.style.opacity = 0;
	                    this.sendResult(item.id);
	                }
	            }.bind(this));
	        }
	        this.slidable = false;
	    },
	    sendResult: function sendResult(value) {
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        return React.createElement(
	            "menu",
	            { ref: "qslider", className: "qslider flex", onTouchStart: this.handlerTouchStart, onTouchEnd: this.handlerTouchEnd, onTouchMove: this.handlerTouchMove },
	            React.createElement("i", { ref: "cursor", className: "qslider-cursor" }),
	            this.props.items.map(function (item, key) {
	                return React.createElement(
	                    "a",
	                    { key: key, ref: "item" + item.id, className: "flex-cell " + (item.id == value ? "active" : "") },
	                    React.createElement("i", null),
	                    item.text
	                );
	            }.bind(this))
	        );
	    }
	});

	module.exports = QSlidor;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.lights = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 采光配置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  模式id
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var lights = exports.lights = function (_BaseComponent) {
	    _inherits(lights, _BaseComponent);

	    function lights(props) {
	        _classCallCheck(this, lights);

	        var _this = _possibleConstructorReturn(this, (lights.__proto__ || Object.getPrototypeOf(lights)).call(this, props));

	        _this.state = {};
	        _this.items = [{ id: "1", text: "黄光" }, { id: "2", text: "蓝光" }, { id: "3", text: "红光" }];

	        return _this;
	    }

	    _createClass(lights, [{
	        key: "handlerClick",
	        value: function handlerClick(e) {
	            var value = e.target.getAttribute("data-value");
	            if ((typeof this.state.value !== "undefined" ? this.state.value : this.props.value) == 0) {
	                return false;
	            } // 控件关闭状态，不允许点击
	            this.setState({ value: value });
	            SelectActions.selected({ "light": value });
	        }
	    }, {
	        key: "handlerSwitch",
	        value: function handlerSwitch(e) {
	            var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	            e.preventDefault();
	            this.setState({ value: value });
	            SelectActions.selected({ "light": value });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            return React.createElement(
	                "div",
	                { className: "select-modes select-lights" },
	                React.createElement(
	                    "div",
	                    { className: "flex popselect-hd" },
	                    React.createElement(
	                        "h2",
	                        { className: "flex-cell" },
	                        "\u5F69\u5149"
	                    ),
	                    React.createElement(
	                        "span",
	                        { className: "popselect-hd-right flex-cell tr" },
	                        React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch.bind(this), className: "qswitch " + (value == 0 ? "off" : "on") })
	                    )
	                ),
	                React.createElement(
	                    "menu",
	                    null,
	                    this.items.map(function (item, index) {
	                        return React.createElement("input", { key: index, className: item.id == value ? "active" : "", type: "button", value: item.text, "data-value": item.id, onTouchEnd: this.handlerClick.bind(this) });
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return lights;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ies = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _qslidor = __webpack_require__(12);

	var _qslidor2 = _interopRequireDefault(_qslidor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 导入导出配置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  模式id
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	//let QSlider = require("../../../common/src/lib/qslidor.jsx");


	var ies = exports.ies = function (_BaseComponent) {
	    _inherits(ies, _BaseComponent);

	    function ies(props) {
	        _classCallCheck(this, ies);

	        var _this = _possibleConstructorReturn(this, (ies.__proto__ || Object.getPrototypeOf(ies)).call(this, props));

	        _this.state = {};
	        _this.items = [{ id: "1", text: "一档" }, { id: "2", text: "二档" }, { id: "3", text: "三档" }, { id: "4", text: "四档" }, { id: "5", text: "五档" }];
	        _this.data = { "exp": 0, "imp": 0 };

	        return _this;
	    }

	    _createClass(ies, [{
	        key: 'handlerSwitch',
	        value: function handlerSwitch(e) {
	            var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	            var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	            e.preventDefault();
	            this.data["imp"] = 0;
	            this.data["exp"] = 0;
	            this.data[mode] = value;
	            this.setState({ "value": value });
	            SelectActions.selected(this.data);
	        }
	        // 导入模式

	    }, {
	        key: 'handlerImport',
	        value: function handlerImport(e) {
	            e.preventDefault();
	            this.setState({ "other": "imp" });
	            this.setState({ "value": 1 });
	            this.data["imp"] = 1;
	            this.data["exp"] = 0;
	            SelectActions.selected(this.data);
	        }
	        // 导出模式

	    }, {
	        key: 'handlerExport',
	        value: function handlerExport(e) {
	            e.preventDefault();
	            this.setState({ "other": "exp" });
	            this.setState({ "value": 1 });
	            this.data["imp"] = 0;
	            this.data["exp"] = 1;
	            SelectActions.selected(this.data);
	        }
	    }, {
	        key: 'feedback',
	        value: function feedback(value) {
	            var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	            this.data[mode] = value;
	            SelectActions.selected(this.data);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            // 导入/导出模式
	            var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	            return React.createElement(
	                'div',
	                { className: 'select-ie' },
	                React.createElement(
	                    'div',
	                    { className: 'flex popselect-hd' },
	                    React.createElement(
	                        'span',
	                        { className: 'select-ie-btns' },
	                        React.createElement(
	                            'a',
	                            { ref: 'imp', href: '#', className: mode === "imp" ? "active" : "", onTouchEnd: this.handlerImport.bind(this) },
	                            '\u5BFC\u5165'
	                        ),
	                        React.createElement(
	                            'a',
	                            { ref: 'exp', href: '#', className: mode === "exp" ? "active" : "", onTouchEnd: this.handlerExport.bind(this) },
	                            '\u5BFC\u51FA'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'popselect-hd-right flex-cell tr' },
	                        React.createElement('a', { href: '#', onTouchEnd: this.handlerSwitch.bind(this), className: "qswitch " + (value == 0 ? "off" : "on") })
	                    )
	                ),
	                React.createElement(_qslidor2.default, { disabled: value == 0 ? true : false, items: this.items, value: value, fnFeedback: this.feedback.bind(this) })
	            );
	        }
	    }]);

	    return ies;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.kneads = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 按摩配置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  模式id
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var kneads = exports.kneads = function (_BaseComponent) {
	    _inherits(kneads, _BaseComponent);

	    function kneads(props) {
	        _classCallCheck(this, kneads);

	        var _this = _possibleConstructorReturn(this, (kneads.__proto__ || Object.getPrototypeOf(kneads)).call(this, props));

	        _this.state = {};

	        return _this;
	    }

	    _createClass(kneads, [{
	        key: "handlerSwitch",
	        value: function handlerSwitch(e) {
	            var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	            e.preventDefault();
	            this.setState({ value: value });
	            SelectActions.selected({ "knead": value });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            return React.createElement(
	                "div",
	                { className: "select-uts" },
	                React.createElement(
	                    "div",
	                    { className: "flex popselect-hd" },
	                    React.createElement(
	                        "h2",
	                        { className: "flex-cell" },
	                        "\u6309\u6469"
	                    ),
	                    React.createElement(
	                        "span",
	                        { className: "popselect-hd-right flex-cell tr" },
	                        React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch.bind(this), className: "qswitch " + (value == 0 ? "off" : "on") })
	                    )
	                )
	            );
	        }
	    }]);

	    return kneads;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.timers = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _range = __webpack_require__(17);

	var _range2 = _interopRequireDefault(_range);

	var _BaseComponentClass = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 时间配置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 该组件为Selects子组件，由Selects.jsx文件调用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} value  时间
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var timers = exports.timers = function (_BaseComponent) {
	    _inherits(timers, _BaseComponent);

	    function timers(props) {
	        _classCallCheck(this, timers);

	        var _this = _possibleConstructorReturn(this, (timers.__proto__ || Object.getPrototypeOf(timers)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(timers, [{
	        key: 'feedback',
	        value: function feedback(value) {
	            SelectActions.selected({ "time": value });
	        }
	    }, {
	        key: 'handlerClick',
	        value: function handlerClick(e) {
	            e.preventDefault(); // 修复ios点透bug
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	            return React.createElement(
	                'div',
	                { className: 'select-time', onClick: this.handlerClick.bind(this) },
	                React.createElement(
	                    'div',
	                    { className: 'flex popselect-hd' },
	                    React.createElement(
	                        'h2',
	                        { className: 'flex-cell' },
	                        '\u65F6\u957F'
	                    )
	                ),
	                React.createElement(_range2.default, { min: '1', max: '19', value: value, fnFeedback: this.feedback.bind(this) }),
	                React.createElement(
	                    'ul',
	                    { className: 'flex' },
	                    React.createElement(
	                        'li',
	                        { className: 'flex-cell tl' },
	                        '1min'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'flex-cell tr' },
	                        '19min'
	                    )
	                )
	            );
	        }
	    }]);

	    return timers;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {integer}  value       传入初始值
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 * @prop {integer}  min         可选，最小值，缺省为0
	 * @prop {integer}  max         可选，最大值，缺省为100
	 * @prop {boolean}  disabled    可选，是否可以点击
	 */
	var Range = React.createClass({
	    displayName: "Range",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        return this.props.min || "0";
	    },
	    max: function max() {
	        return this.props.max || "100";
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.target.value);
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        this.pos(value);
	    },
	    componentDidMount: function componentDidMount() {
	        this.componentDidUpdate();
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor" },
	                    value
	                )
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ }
/******/ ]);