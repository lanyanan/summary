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

	var _DevScreen = __webpack_require__(6);

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
	            mytoast("使用完喷雾仪，建议进行肤质测试，以得到更好的效果...");
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
	            chargeStatus: 1, // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
	            electricity: 19, // 电量
	            currentRunMode: 1, // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
	            currentRunTime: 100, // 当前运行时间
	            onlineStatus: 2, // 在线状态（1-正常, 2-异常）
	            skinDataCode: 0, // 有无肤质数据(0-无, 1-有)
	            busiSwitch: 0, // 业务开关（0：关 1：开） 0-手动 1-自动
	            runTime: 11 // 自动模式下的运行时间
	        };
	        // 基本数据
	        _this.baseData = {
	            modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	            skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            times: [0, 100, 40, 80, 50, 40]
	        };
	        _this.listenStore(AppStore); // 监听Store 
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            mytoast("为使便携喷雾仪S的使用效果更好，请先使用测肤仪进行肤质测试...");
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
	            // 自动和手动模式切换
	            var skinDataCode = this.state.skinDataCode;
	            var mode, runTime;
	            var mode = this.state.mode;
	            var runTime = this.state.runTime;

	            if (!+skinDataCode) {
	                het.toast("您还未测试肤质，请先测试肤质！");
	                return;
	            }

	            var value = e.currentTarget.getAttribute('data-busi');
	            var busiSwitch = +value > 0 ? 0 : 1;

	            var changeStatus = getSaveFlag({ busiSwitch: busiSwitch });
	            if (changeStatus) {
	                // 更改发送App数据
	                AppData.updateFlag |= 0x10;
	            } else {
	                AppData.updateFlag &= 0x01;
	            }

	            this.setState({
	                busiSwitch: busiSwitch,
	                mode: mode,
	                runTime: runTime,
	                updateFlag: AppData.updateFlag
	            });
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode(e) {
	            // 自动模式下不做操作
	            var busiSwitch = this.state.busiSwitch;
	            if (+busiSwitch === 1) {
	                e.preventDefault();
	                return;
	            }

	            var currentRunMode = this.state.currentRunMode;

	            this.setState({ currentRunMode: currentRunMode === 5 ? 1 : ++currentRunMode }, function () {
	                var currentRunMode = this.state.currentRunMode;
	                var currentRunTime = this.baseData.times[currentRunMode];
	                var changeStatus = getSaveFlag({ currentRunMode: currentRunMode, currentRunTime: currentRunTime });
	                if (changeStatus) {
	                    // 更改发送App数据
	                    AppData.updateFlag |= 0x01;
	                } else {
	                    AppData.updateFlag &= 0x10;
	                }
	                this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	            }.bind(this));
	        }
	    }, {
	        key: 'timeUpAndDown',
	        value: function timeUpAndDown(flag) {
	            // 自动模式以及不是手动模式下的自定义都不做操作
	            // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
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
	                var timeFlag = 0x01; // 运行时间标识
	                AppData.updateFlag |= timeFlag;
	            } else {
	                AppData.updateFlag &= 0x10;
	            }

	            this.baseData.times[currentRunMode] = currentRunTime;
	            this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	        }
	    }, {
	        key: 'syncData',
	        value: function syncData() {
	            var configMode, runTime;
	            // var configMode = this.state.currentRunMode;
	            // var runTime = this.state.currentRunTime;
	            var busiSwitch = this.state.busiSwitch;
	            if (+busiSwitch) {
	                configMode = this.state.mode;
	                runTime = this.state.runTime;
	            } else {
	                configMode = this.state.currentRunMode;
	                runTime = this.state.currentRunTime;
	            }

	            // 更改发送App数据
	            AppData.currentRunMode = configMode;
	            AppData.currentRunTime = runTime;
	            AppData.configMode = configMode;
	            AppData.runTime = runTime;
	            AppData.busiSwitch = busiSwitch;

	            AppActions.sync();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var currentRunMode = parseInt(this.state.currentRunMode);
	            var mode = parseInt(this.state.mode); // 自动模式下的模式
	            var busiSwitch = this.state.busiSwitch; //　模式开关(0-手动模式，1-自动模式)
	            var skinDataCode = this.state.skinDataCode;
	            var currentRunTime = this.state.currentRunTime;
	            var runTime = this.state.runTime; // 自动模式下时间设置
	            var skinType = this.state.skinType5;
	            var recommendMode = this.state.mode;
	            var waterTrend = this.state.waterTrend;

	            var slideStyle = {
	                position: 'absolute',
	                zIndex: 11,
	                top: '2.8rem',
	                right: '1.8rem',
	                fontSize: '16px'
	            };

	            var activeStyle = +busiSwitch === 1 ? { display: 'none' } : { display: 'block' };
	            var nonActiveStyle = +busiSwitch === 1 ? { display: 'block' } : { display: 'none' };

	            // 处理手动模式下的时间图标隐藏以及显示
	            var icoLeftDisplay, icoRightDisplay;
	            if (!(currentRunMode == 5 && +busiSwitch == 0)) {
	                icoLeftDisplay = icoRightDisplay = { "opacity": 0 };
	            } else {
	                icoLeftDisplay = currentRunTime <= 10 ? { 'opacity': 0 } : { 'opacity': 1 };
	                icoRightDisplay = currentRunTime >= 120 ? { 'opacity': 0 } : { 'opacity': 1 };
	            }

	            var tips = [React.createElement(
	                'span',
	                null,
	                '\u4E3A\u4F7F\u4FBF\u643A\u55B7\u96FE\u4EEAS\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5...',
	                React.createElement(
	                    'a',
	                    { href: 'cbeauty://cbeauty_skintest' },
	                    '\u53BB\u6D4B\u8BD5\u808C\u80A4>>'
	                )
	            ), React.createElement(
	                'span',
	                null,
	                '\u60A8\u5F53\u524D\u4E3A',
	                this.baseData.skins[skinType],
	                '\u80A4\u8D28\uFF0C\u63A8\u8350\u60A8\u4F7F\u7528',
	                this.baseData.modes[recommendMode],
	                '\uFF01\u7F8E\u4E3D\u5973\u4EBA\u662F\u517B\u51FA\u6765\u7684~'
	            ), React.createElement(
	                'span',
	                null,
	                '\u60A8\u4F7F\u7528\u4E86\u55B7\u96FE\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86',
	                waterTrend,
	                '%\uFF0C\u8BF7\u7EE7\u7EED\u4FDD\u6301~'
	            )];

	            return React.createElement(
	                'div',
	                { className: 'app-body flex-column', onTouchMove: this.handlerTouchMove.bind(this) },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller', className: 'flex-cell' },
	                    React.createElement(
	                        'section',
	                        { className: 'screen-ctn' },
	                        React.createElement(_DevScreen.DevScreen, { onlineStatus: this.state.onlineStatus }),
	                        React.createElement(
	                            'div',
	                            { className: 'tip' },
	                            tips[skinDataCode]
	                        ),
	                        +busiSwitch == 1 ? React.createElement(
	                            'div',
	                            { className: 'gear-choose', style: slideStyle, 'data-busi': '1', onTouchEnd: this.handlerTounch.bind(this) },
	                            React.createElement(
	                                'div',
	                                { className: 'gear-txt' },
	                                '\u81EA\u52A8'
	                            ),
	                            React.createElement('div', { className: 'gear-circle' })
	                        ) : React.createElement(
	                            'div',
	                            { className: 'gear-choose', style: slideStyle, 'data-busi': '0', onTouchEnd: this.handlerTounch.bind(this) },
	                            React.createElement(
	                                'div',
	                                { className: 'gear-txts' },
	                                '\u624B\u52A8'
	                            ),
	                            React.createElement('div', { className: 'gear-circle gear-circles' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'model-info clearfix' },
	                            React.createElement(
	                                'div',
	                                { className: 'model', onTouchEnd: this.changeMode.bind(this) },
	                                React.createElement(
	                                    'p',
	                                    { className: 'font-b', style: activeStyle },
	                                    React.createElement(
	                                        'a',
	                                        { href: 'javascript:' },
	                                        +busiSwitch == 0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode]
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'font-b', style: nonActiveStyle },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        +busiSwitch == 0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode]
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'font-s' },
	                                    '\u6A21\u5F0F\u9009\u62E9'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'info' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'font-b' },
	                                    React.createElement('a', { className: 'ico-left', style: icoLeftDisplay, href: 'javascript:void(0);', onTouchEnd: this.timeUpAndDown.bind(this, 0) }),
	                                    +busiSwitch == 0 ? currentRunTime : runTime,
	                                    'S',
	                                    React.createElement('a', { className: 'ico-right', style: icoRightDisplay, href: 'javascript:void(0);', onTouchEnd: this.timeUpAndDown.bind(this, 1) })
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'font-s' },
	                                    '\u8865\u6C34\u65F6\u95F4'
	                                )
	                            )
	                        ),
	                        this.state.electricity <= 4 && this.state.chargeStatus < 2 && this.state.onlineStatus != 2 ? React.createElement(
	                            'div',
	                            { className: 'battery' },
	                            '\u7535\u91CF\u4E0D\u8DB3\uFF0C\u8BF7\u5145\u7535'
	                        ) : ""
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
	    // console.log(data);
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
	        _this.skins = [];
	        return _this;
	    }

	    _createClass(DevScreen, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "section",
	                { className: "screen" },
	                React.createElement(
	                    "div",
	                    { className: "pic" },
	                    React.createElement("img", { className: "pic", src: "../static/img/ico-p.png" }),
	                    this.props.onlineStatus == 2 ? React.createElement(
	                        "span",
	                        { className: "offline" },
	                        "\u60A8\u7684\u8BBE\u5907\u5DF2\u79BB\u7EBF"
	                    ) : ""
	                )
	            );
	        }
	    }]);

	    return DevScreen;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);