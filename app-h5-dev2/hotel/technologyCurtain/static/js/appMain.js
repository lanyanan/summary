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

	var _range = __webpack_require__(8);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
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
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 75 : 40,
	            drag: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store

	        _this.changeClose = _this.changeClose.bind(_this);
	        _this.allOpen = _this.allOpen.bind(_this);
	        _this.allClose = _this.allClose.bind(_this);
	        // this.pauseOpenClose = this.pauseOpenClose(this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getdata();
	            // Actions.test();
	            // Actions.setWechatId();
	        }
	    }, {
	        key: 'changeClose',
	        value: function changeClose() {}
	    }, {
	        key: 'allOpen',
	        value: function allOpen() {
	            _Actions.Actions.allOpen();
	        }
	    }, {
	        key: 'allClose',
	        value: function allClose() {
	            _Actions.Actions.allClose();
	        }
	    }, {
	        key: 'pauseOpenClose',
	        value: function pauseOpenClose() {
	            _Actions.Actions.pauseOpenClose();
	            ///*<img src="../static/img/halfOpen.png" />*/
	        }

	        //窗帘控制

	    }, {
	        key: 'render',
	        value: function render() {

	            console.log("Main--Data", this.state);
	            return React.createElement(
	                'div',
	                { className: 'main' },
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'header',
	                        { style: { paddingTop: this.state.headerTop } },
	                        React.createElement(
	                            'div',
	                            { className: 'head' },
	                            React.createElement('span', { className: 'statusBar' }),
	                            React.createElement(
	                                'span',
	                                { className: 'stateTitle' },
	                                '\u667A\u80FD\u7A97\u5E18'
	                            ),
	                            React.createElement('span', null)
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'Pic' },
	                            React.createElement('div', { className: 'Pic-left', id: 'PicLeft', style: { width: this.state.selectRange2 } }),
	                            React.createElement('div', { className: 'Pic-right', id: 'PicRight', style: { width: this.state.selectRange2 } }),
	                            React.createElement('div', { className: 'Pic-mid' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headerContent' },
	                            React.createElement('i', null),
	                            React.createElement(
	                                'span',
	                                { className: 'headerInfo' },
	                                '\u5F53\u524D\u5F00\u5408\u7A0B\u5EA6',
	                                React.createElement(
	                                    'span',
	                                    { className: 'degree' },
	                                    this.state.slide
	                                ),
	                                '%'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'curTainControl' },
	                        React.createElement('div', { className: 'layer', style: { display: this.state.ifctramLayer ? 'block' : 'none' } }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7A97\u5E18\u63A7\u5236'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'Control-precent', style: { visibility: this.state.drag ? 'visible' : 'hidden' } },
	                            this.state.slide,
	                            '%'
	                        ),
	                        React.createElement('i', { className: 'low' }),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell' },
	                            React.createElement(_range2.default, { value: this.state.light, min: '0', max: '100', fnFeedback: this.changeClose })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'Belowflex' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '0%'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '100%'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'select' },
	                        React.createElement(
	                            'div',
	                            { onClick: this.allOpen },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u5168\u5F00'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { onClick: this.allClose },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u5168\u5173'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'stopOpenClose', onClick: this.pauseOpenClose.bind(this) },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u505C\u6B62\u5F00\u5408'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'deviceTips' },
	                        '\u8BBE\u5907\u4E0D\u5728\u7EBF'
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('智能窗帘');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
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
	'slide', //滑动数据
	'getdata', //获取设备运行数据
	'consoleData', //发送控制命令
	'allOpen', //全开
	'allClose', //全关
	'stopOpenClose', //停止开合
	'test', 'selectRange', //发送滑动命令
	'pauseOpenClose' //新停止开合
	]);

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

	var _fun = __webpack_require__(6);

	// import Path from './ApiPath.es6';


	var deviceId = _fun.Funs.getUrlParam('deviceId');
	var test = false;
	var path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境
	// 数据过滤计时器
	var dataFilterTimers = {
	    control: 0,
	    ctramL: 0
	};

	// 返回过滤后的数据
	function dataFilter(data) {
	    // console.log("dataFilterTimers===========",dataFilterTimers);
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        // console.log("####",data);
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	                // console.log('$$$$$',result[k] );
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    // console.log('123',result);
	    return result;
	}

	// 设置过滤器过期时间
	function setDataTimer() {
	    // console.log("dataFilterTimers",dataFilterTimers,keys);
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
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },


	    //滑动组件拖动值
	    onSlide: function onSlide(value) {
	        var _this = this;
	        _this.trigger({ slide: value, drag: true });
	    },


	    // 获取设备运行数据
	    onGetdata: function onGetdata() {
	        var _this2 = this;

	        console.log("get----方法");
	        if (test) {
	            var _this;

	            var getCookie;
	            var hasCookie;

	            (function () {
	                var setCookie = function setCookie(c_name, value, expiredays, path) {
	                    var exdate = new Date();
	                    exdate.setTime(exdate.getTime() + expiredays * 24 * 60 * 60 * 1000);
	                    document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString()) + ";" + (path == null ? "" : "path=" + escape(path));
	                };

	                ;
	                setCookie('wechatUserId', 10277, 0.5, '/');
	                _this = _this2;
	                // weixin.clife.cn/clife-wechat-test/wechat/user/login?format=json&type=1&redirect=http://weixin.clife.cn/web-wechat/hotel/v1/wisdomBox/page/index.html#/
	                //获取授权wechatId

	                getCookie = function getCookie(name) {
	                    var arr,
	                        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	                    if (arr = document.cookie.match(reg)) {
	                        return unescape(arr[2]);
	                    } else {
	                        return null;
	                    }
	                };
	                //微信授权


	                hasCookie = function hasCookie(name) {
	                    var wechatId = getCookie(name);
	                    if (wechatId == "" || wechatId == null || wechatId == undefined) {
	                        //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
	                        // var url =  routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
	                        //console.log(url)
	                        window.location.href = url;
	                    } else {
	                        // console.log('设置WeChatUserId成功');
	                        var _deviceId = '7B58CF5661B4E4128D4E93803A144B07';
	                        $.ajax({
	                            url: '' + path + '/getToken',
	                            dataType: 'json',
	                            cache: true,
	                            async: true,
	                            success: function success(r) {
	                                if (r.code == 0) {
	                                    console.log('访问token-种token成功');
	                                    var access = r.data;
	                                    setCookie('accessToken', access, 0.5, '/');
	                                    // let url = `${path}/device/data/get?deviceId=`+deviceId;
	                                    var _url = '/clife-wechat-test/wechat/hotel/device/data/get?deviceId=7B58CF5661B4E4128D4E93803A144B07';
	                                    //console.log("token成功下--url",url);
	                                    // het.get(url, {}, (succ)=>{
	                                    //     console.log("succ",succ);
	                                    //     let succChange = JSON.parse(succ);
	                                    //     let succData =   succChange.data;
	                                    //     // $.extend(true,AppData,json.data);
	                                    //     console.log( 'ifctram-状态是否可以调赋值1可调',succChange.msg); 
	                                    //     console.log('succData----12434',succData);
	                                    //     _this.trigger({succDate:succData});
	                                    // });   


	                                    var _deviceId2 = '7B58CF5661B4E4128D4E93803A144B07';
	                                    var postUrl = path + '/device/data/get?deviceId=' + _deviceId2;
	                                    console.log("定时器，每隔六秒获取设备数据");

	                                    //一进来就获取设备的运行状态，做一次相应的处理

	                                    het.post(postUrl, {}, function (res) {
	                                        //--判断是否授权？--->判断设备是否在线？-->请求成功--是否需要重置？
	                                        var resChange = JSON.parse(res);

	                                        if (resChange.code == 103005001) {
	                                            // 未授权，跳转授权页面
	                                            location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	                                        }

	                                        if (resChange.msg == "设备不在线") {
	                                            //无按钮弹窗
	                                            var showMsg = function showMsg(msg) {
	                                                var msgWrap = $("#msg-warning");
	                                                var msgBox = $('<div class="msg-content"></div>');
	                                                if (msgWrap.length === 0) {
	                                                    msgWrap = $('<div id="msg-warning"></div>');
	                                                    $("body").append(msgWrap);
	                                                }
	                                                msgWrap.empty();
	                                                msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
	                                            };

	                                            ;
	                                            showMsg('设备离线状态');
	                                        }

	                                        if (resChange.data) {
	                                            if (ifctram == 0) {
	                                                //还是要根据 确定/取消.确定的话进行一次全关或全开操作
	                                                // het.toast('窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?');
	                                                var resetTip = confirm("窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?");
	                                                if (resetTip == true) {
	                                                    var _postUrl = '' + path + '/device/config/set?';
	                                                    var data = {
	                                                        deviceId: "7B58CF5661B4E4128D4E93803A144B07",
	                                                        source: 8,
	                                                        json: JSON.stringify({
	                                                            control: 2, //1~3    控制
	                                                            ctramL: 70, //0~100  控制幅度
	                                                            updateFlag: "0001" })
	                                                    };
	                                                    het.post(_postUrl, data, function (res) {
	                                                        console.log("全关成功--", res);
	                                                        _this.getClock = setInterval(function () {
	                                                            _this.onGetdata();
	                                                        }, 10000);
	                                                        _this.trigger({ ifctramLayer: false });
	                                                    }, function (fail) {
	                                                        console.log('全关失败--', fail);
	                                                        var picLeft = document.getElementById('PicLeft');
	                                                        picLeft.style.width = "130px";
	                                                        $('#PicLeft').addClass('PicAnimate');

	                                                        var PicRight = document.getElementById('PicRight');
	                                                        PicRight.style.width = "130px";
	                                                        $('#PicRight').addClass('PicAnimate');
	                                                    });
	                                                } else {
	                                                    _this.trigger({ ifctramLayer: true });
	                                                    clearInterval(_this.getClock);
	                                                }
	                                            } else {
	                                                _this.trigger({ ifctramLayer: false });
	                                                if (!_this.getClock) {
	                                                    _this.getClock = setInterval(function () {
	                                                        _this.onGetdata();
	                                                    }, 6000);
	                                                }
	                                            }
	                                        }
	                                    }, function (fial) {
	                                        console.log("获取设备数据失败--", fail);
	                                    }); //post 结束符
	                                }
	                            }
	                        });
	                    } //elese结束符
	                };

	                hasCookie('wechatUserId');
	            })();
	        } else {
	            var postUrl = path + '/device/data/get?deviceId=' + deviceId;
	            het.post(postUrl, {}, function (res) {
	                //--判断是否授权？--->判断设备是否在线？-->请求成功--是否需要重置？
	                var resChange = JSON.parse(res);

	                if (resChange.code == 103005001) {
	                    // 未授权，跳转授权页面
	                    location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	                }

	                if (resChange.msg == "设备不在线") {
	                    //无按钮弹窗
	                    var showMsg = function showMsg(msg) {
	                        var msgWrap = $("#msg-warning");
	                        var msgBox = $('<div class="msg-content"></div>');
	                        if (msgWrap.length === 0) {
	                            msgWrap = $('<div id="msg-warning"></div>');
	                            $("body").append(msgWrap);
	                        }
	                        msgWrap.empty();
	                        msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
	                    };

	                    ;
	                    showMsg('设备离线状态');
	                }

	                if (resChange.data) {
	                    if (ifctram == 0) {
	                        //还是要根据 确定/取消.确定的话进行一次全关或全开操作
	                        // het.toast('窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?');
	                        var resetTip = confirm("窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?");
	                        if (resetTip == true) {
	                            var _postUrl2 = '' + path + '/device/config/set?';
	                            var data = {
	                                deviceId: "7B58CF5661B4E4128D4E93803A144B07",
	                                source: 8,
	                                json: JSON.stringify({
	                                    control: 2, //1~3    控制
	                                    ctramL: 70, //0~100  控制幅度
	                                    updateFlag: "0001" })
	                            };
	                            het.post(_postUrl2, data, function (res) {
	                                console.log("全关成功--", res);
	                                _this.getClock = setInterval(function () {
	                                    _this.onGetdata();
	                                }, 10000);
	                                _this.trigger({ ifctramLayer: false });
	                            }, function (fail) {
	                                console.log('全关失败--', fail);
	                                var picLeft = document.getElementById('PicLeft');
	                                picLeft.style.width = "130px";
	                                $('#PicLeft').addClass('PicAnimate');

	                                var PicRight = document.getElementById('PicRight');
	                                PicRight.style.width = "130px";
	                                $('#PicRight').addClass('PicAnimate');
	                            });
	                        } else {
	                            _this.trigger({ ifctramLayer: true });
	                            clearInterval(_this.getClock);
	                        }
	                    } else {
	                        _this.trigger({ ifctramLayer: false });
	                        if (!_this.getClock) {
	                            _this.getClock = setInterval(function () {
	                                _this.onGetdata();
	                            }, 6000);
	                        }
	                    }
	                }
	            }, function (fail) {
	                console.log("获取设备数据失败--", fail);
	            }); //post 结束符
	        }
	    },


	    //全开
	    onAllOpen: function onAllOpen() {

	        //测试--------
	        //     if(this.getClock) {clearInterval(this.getClock)};
	        //     let _this = this;
	        //     let deviceId='7B58CF5661B4E4128D4E93803A144B07';
	        //     let postUrl = `${path}`+'/device/config/set?';
	        // 	 let data = {
	        // 	        deviceId:deviceId,
	        // 	        source:8,
	        // 	        json:JSON.stringify({
	        // 	          control:1,      		//1~3    控制
	        // 	          ctramL:70,       		//0~100  控制幅度
	        // 	          updateFlag:"0001",      	//0~100  功能变更
	        // 	        })
	        // 	    }
	        // het.post(postUrl,data,(res)=>{
	        //        console.log("全开成功--",res);
	        //        let picLeft = document.getElementById('PicLeft');
	        //        picLeft.style.width="0px";

	        // },(fail)=>{
	        //        console.log('全开失败--',fail);
	        //             let picLeft = document.getElementById('PicLeft');
	        //             picLeft.style.width="20px";
	        //             $('#PicLeft').addClass('PicAnimate');

	        //             let PicRight = document.getElementById('PicRight');
	        //             PicRight.style.width="20px";
	        //             $('#PicRight').addClass('PicAnimate');
	        // });

	        //正式
	        // setTimeout('control');
	        if (this.getClock) {
	            clearInterval(this.getClock);
	        };
	        var _this = this;
	        var url = '' + path + '/device/config/set?deviceId=' + deviceId;
	        var data = {
	            source: 8,
	            json: JSON.stringify({
	                control: 1, //1~3    控制
	                ctramL: 70, //0~100  控制幅度
	                updateFlag: "0001" })
	        };
	        het.post(url, data, function (res) {
	            console.log("全开成功--", res);
	        }, function (fail) {
	            console.log('全开失败--', fail);
	        });
	    },


	    //全关
	    onAllClose: function onAllClose() {
	        // if(this.getClock) {clearInterval(this.getClock)};
	        // // setTimeout('control');
	        // let _this = this;
	        // clearInterval(_this.getClock);
	        // let postUrl = `${path}`+'/device/config/set?';
	        // let data = {
	        //     deviceId:"7B58CF5661B4E4128D4E93803A144B07",
	        //     source:8,
	        //     json:JSON.stringify({
	        //         control:2,              //1~3    控制
	        //         ctramL:70,              //0~100  控制幅度
	        //         updateFlag:"0001",        //0~100  功能变更
	        //     })
	        // }
	        // het.post(postUrl,data,(res)=>{
	        //     console.log("全关成功--",res);
	        //         _this.getClock = setInterval(function(){
	        //             _this.onGetdata();
	        //         },10000);
	        //         _this.trigger({ifctramLayer:false});

	        // },(fail)=>{
	        //     console.log('全关失败--',fail);
	        //          let picLeft = document.getElementById('PicLeft');
	        //          picLeft.style.width="130px";
	        //          $('#PicLeft').addClass('PicAnimate');

	        //          let PicRight = document.getElementById('PicRight');
	        //          PicRight.style.width="130px";
	        //          $('#PicRight').addClass('PicAnimate');
	        // });


	        //正式
	        var _this = this;
	        var url = '' + path + '/device/config/set?deviceId=' + deviceId;
	        var data = {
	            source: 8,
	            json: JSON.stringify({
	                control: 2, //1~3    控制
	                ctramL: 70, //0~100  控制幅度
	                updateFlag: "0001" })
	        };
	        het.post(url, data, function (res) {
	            console.log("全关成功--", res);
	            _this.getClock = setInterval(function () {
	                _this.onGetdata();
	            }, 10000);
	            _this.trigger({ ifctramLayer: false });
	        }, function (fail) {
	            console.log('全关失败--', fail);
	        });
	    },


	    //暂停
	    onPauseOpenClose: function onPauseOpenClose() {

	        // setTimeout('control');
	        //  let deviceId='7B58CF5661B4E4128D4E93803A144B07';
	        //  let postUrl = `${path}`+'/device/config/set?';
	        //  let data = {
	        //     deviceId:deviceId,
	        //     source:8,
	        //     json:JSON.stringify({
	        //         control:3,              //1~3    控制
	        //         ctramL:70,              //0~100  控制幅度
	        //         updateFlag:"0001",        //0~100  功能变更
	        //     })
	        // }
	        // het.post(postUrl,data,(res)=>{
	        //     console.log("暂停成功--",res);

	        // },(fail)=>{
	        //     console.log('暂停失败--',fail);
	        //          let PicLeft = document.getElementById('PicLeft');
	        //          let  getLeftWidth =  PicLeft.offsetWidth;
	        //          console.log(getLeftWidth);
	        //          PicLeft.style.width= getLeftWidth+'px'; 
	        //          console.log(PicLeft.offsetWidth);

	        //          let PicRight = document.getElementById('PicRight');
	        //          let getRightWidth = PicRight.offsetWidth;
	        //          PicRight.style.width = getRightWidth+'px';


	        // });


	        //正式
	        var _this = this;
	        var url = '' + path + '/device/config/set?deviceId=' + deviceId;
	        var data = {
	            source: 8,
	            json: JSON.stringify({
	                control: 3, //1~3    控制
	                ctramL: 70, //0~100  控制幅度
	                updateFlag: "0001" })
	        };
	        het.post(url, data, function (res) {
	            console.log("暂停成功--", res);
	            _this.getClock = setInterval(function () {
	                _this.onGetdata();
	            }, 10000);
	            _this.trigger({ ifctramLayer: false });
	        }, function (fail) {
	            console.log('暂停失败--', fail);
	        });
	    },


	    //发送滑动数据命令
	    onSelectRange: function onSelectRange(value) {
	        // let _this=this;
	        // let selectRange=value;
	        // // console.log("selectRange---",value);
	        // let deviceId='7B58CF5661B4E4128D4E93803A144B07';
	        // let postUrl = `${path}`+'/device/config/set?';
	        // // let url=`${path}`+'/device/config/set?deviceId='+deviceId;
	        // //幅度显示--手指抬起即隐藏幅度值
	        // _this.trigger({drag:false});
	        // let data = {
	        //     deviceId:deviceId,
	        //     source:8,
	        //     json:JSON.stringify({
	        //         control:1,              //1~3    控制
	        //         ctramL:selectRange,              //0~100  控制幅度
	        //         updateFlag:"0002",        //0~100  功能变更
	        //     })
	        // }
	        // het.post(postUrl,data,(res)=>{
	        //     console.log("控制幅度成功--",res);
	        //     setDataTimer(selectRange);
	        //     console.log('-----',selectRange);

	        //     let selectRange2 = (selectRange/2)+'%';
	        //     console.log('----',selectRange2);
	        //     _this.trigger({selectRange2:selectRange2});
	        //     // let picLeft = document.getElementById('PicLeft');
	        //     // picLeft.setAttribute('class','PicAnimate');
	        //     $('#PicLeft').addClass('PicAnimate');


	        // if(selectRange<10 || selectRange==10){
	        //     $('.Pic-left').animate({width:"125px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"125px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<20 || selectRange==20){
	        //     $('.Pic-left').animate({width:"112.5px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"112.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<30 || selectRange==30){
	        //     $('.Pic-left').animate({width:"110px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"110px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<40 || selectRange==40){
	        //     $('.Pic-left').animate({width:"97.5px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"97.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<50 || selectRange==50){
	        //     $('.Pic-left').animate({width:"85px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"85px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<60 || selectRange==60){
	        //     $('.Pic-left').animate({width:"62.5px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"62.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<70 || selectRange==70){
	        //     $('.Pic-left').animate({width:"50px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"50px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<80 || selectRange==80){
	        //     $('.Pic-left').animate({width:"37.5px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"37.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<90 || selectRange==90){
	        //     $('.Pic-left').animate({width:"25px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"25px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<100 || selectRange==100){
	        //     $('.Pic-left').animate({width:"12.5px"},{duration:3000,easing:"linear"});
	        //     $('.Pic-right').animate({width:"12.5px"},{duration:3000,easing:"linear"});
	        // }


	        // },(fail)=>{

	        //      let selectRange2 = (selectRange/2)+'%';
	        //     console.log('----',selectRange2);
	        //     _this.trigger({selectRange2:selectRange2});
	        //     // let picLeft = document.getElementById('PicLeft');
	        //     // picLeft.setAttribute('class','PicAnimate');
	        //     $('#PicLeft').addClass('PicAnimate');
	        //     $('#PicRight').addClass('PicAnimate');

	        // console.log('控制幅度失败--',fail);
	        // if(selectRange<10 || selectRange==10){
	        //         $('.Pic-left').animate({width:"125px"},{duration:3000,easing:"linear"});
	        //        $('.Pic-right').animate({width:"125px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<20 || selectRange==20){
	        //         $('.Pic-left').animate({width:"112.5px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"112.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<30 || selectRange==30){
	        //         $('.Pic-left').animate({width:"110px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"110px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<40 || selectRange==40){
	        //         $('.Pic-left').animate({width:"97.5px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"97.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<50 || selectRange==50){
	        //         $('.Pic-left').animate({width:"85px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"85px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<60 || selectRange==60){
	        //        $('.Pic-left').animate({width:"62.5px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"62.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<70 || selectRange==70){
	        //         $('.Pic-left').animate({width:"50px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"50px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<80 || selectRange==80){
	        //         $('.Pic-left').animate({width:"37.5px"},{duration:3000,easing:"linear"});
	        //        $('.Pic-right').animate({width:"37.5px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<90 || selectRange==90){
	        //         $('.Pic-left').animate({width:"25px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"25px"},{duration:3000,easing:"linear"});
	        // }else if(selectRange<100 || selectRange==100){
	        //         $('.Pic-left').animate({width:"12.5px"},{duration:3000,easing:"linear"});
	        //         $('.Pic-right').animate({width:"12.5px"},{duration:3000,easing:"linear"});
	        // }
	        //    }
	        // );


	        //正式---------
	        var _this = this;
	        var selectRange = value;
	        var url = '' + path + '/device/config/set?deviceId=' + deviceId;
	        // 幅度显示--手指抬起即隐藏幅度值
	        _this.trigger({ drag: false });
	        var data = {
	            source: 8,
	            json: JSON.stringify({
	                control: 1, //1~3    控制
	                ctramL: selectRange, //0~100  控制幅度
	                updateFlag: "0002" })
	        };
	        het.post(url, data, function (res) {
	            console.log("控制幅度成功--", res);
	            setDataTimer(selectRange);
	            var selectRange2 = selectRange / 2 + '%';
	            console.log('----', selectRange2);
	            _this.trigger({ selectRange2: selectRange2 });
	            // let picLeft = document.getElementById('PicLeft');
	            // picLeft.setAttribute('class','PicAnimate');
	            $('#PicLeft').addClass('PicAnimate');
	        }, function (fail) {
	            console.log("fail--", fail);
	            var selectRange2 = selectRange / 2 + '%';
	            console.log('----', selectRange2);
	        });
	    },


	    // {"level":1,"mist":2,"updateFlag":1}
	    onTest: function onTest() {
	        var _this = this;
	        // let url=`${pathTwo}`+'/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629';
	        //let url ='http://weixin.clife.cn/clife-wechat-test/wechat/hotel/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629';
	        var url = path + '/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629';
	        het.get(url, {}, function (succ) {
	            console.log("succ-----------------------------", succ);
	            var succChange = JSON.parse(succ);
	            var succData = succChange.data;
	            // $.extend(true,AppData,json.data);
	            // console.log('succData----',succData);
	            _this.trigger({ succDate: succData });
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Actions = __webpack_require__(4);

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
	        _Actions.Actions.slide(value);
	    },
	    selectRange: function selectRange(e) {
	        console.log('鼠标放开---', e.target.value);
	        var range = parseInt(e.target.value);
	        _Actions.Actions.selectRange(range);
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
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onTouchEnd: this.selectRange, onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor", ondragenter: "return false" },
	                    value
	                )
	            )
	        );
	    }
	}); /**
	     * 滑动选择器组件
	     * @prop {integer}  value       传入初始值
	     * @prop {function} fnFeedback  用于接收处理结果的函数
	     * @prop {integer}  min         可选，最小值，缺省为0
	     * @prop {integer}  max         可选，最大值，缺省为100
	     * @prop {boolean}  disabled    可选，是否可以点击
	     */


	module.exports = Range;

/***/ }
/******/ ]);