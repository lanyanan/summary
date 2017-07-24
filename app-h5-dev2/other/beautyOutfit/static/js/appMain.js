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

	var _waterFull = __webpack_require__(6);

	var _stepDetail = __webpack_require__(8);

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

	var types = { beauty: 2, dress: 3 };
	var pageSize = 7;
	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            beautyList: null,
	            beautyIndex: 1,
	            dressList: null,
	            dressIndex: 1,
	            currentType: types.beauty,
	            message: null
	        };
	        _this.unBindDataStore = _Store.DataStore.listen(_this.onGetResult.bind(_this)); // 监听DataStore
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getBeautyCatgory('refresh');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.unBindDataStore();
	        }
	    }, {
	        key: 'changeTab',
	        value: function changeTab(type, e) {
	            e.preventDefault();
	            e.stopPropagation();
	            if (this.state.currentType == type) return;
	            this.setState({ currentType: type });
	            if ((this.state.beautyList == null || this.state.beautyList.length <= 0) && type == types.beauty) {
	                this.getBeautyCatgory('refresh');
	            } else if ((this.state.dressList == null || this.state.dressList.length <= 0) && type == types.dress) {
	                this.getDressCategory('refresh');
	            }
	        }
	    }, {
	        key: 'onGetResult',
	        value: function onGetResult(data) {
	            if (this.state.currentType == types.beauty) {
	                if (data.index == 1) {
	                    this.setState({ beautyList: data.list });
	                } else if (this.state.beautyList) {
	                    if (data.list.length <= 0) {
	                        this.showToast('没有数据了');
	                    }
	                    this.setState({ beautyList: this.state.beautyList.concat(data.list) });
	                }
	            } else {
	                if (data.index == 1) {
	                    this.setState({ dressList: data.list });
	                } else if (this.state.beautyList) {
	                    if (data.list.length <= 0) {
	                        this.showToast('没有数据了');
	                    }
	                    this.setState({ dressList: this.state.dressList.concat(data.list) });
	                }
	            }
	        }
	    }, {
	        key: 'getBeautyCatgory',
	        value: function getBeautyCatgory(state) {
	            if (state == 'refresh') {
	                this.state.beautyIndex = 1;
	                this.setState({ beautyList: null });
	            } else {
	                this.state.beautyIndex++;
	            }
	            _Actions.DataAction.getCatgory(types.beauty, this.state.beautyIndex, pageSize);
	        }
	    }, {
	        key: 'getDressCategory',
	        value: function getDressCategory(state) {
	            if (state == 'refresh') {
	                this.state.dressIndex = 1;
	                this.setState({ dressList: null });
	            } else {
	                this.state.dressIndex++;
	            }
	            _Actions.DataAction.getCatgory(types.dress, this.state.dressIndex, pageSize);
	        }
	    }, {
	        key: 'showToast',
	        value: function showToast(text) {
	            var self = this;
	            this.setState({ message: text });
	            setTimeout(function () {
	                self.setState({ message: null });
	            }, 2000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'full' },
	                React.createElement(
	                    'div',
	                    { className: 'tab-host' },
	                    React.createElement(
	                        'div',
	                        { onTouchTap: this.changeTab.bind(this, types.beauty), className: this.state.currentType == types.beauty ? 'tab-btn active' : 'tab-btn' },
	                        '\u5F69\u5986'
	                    ),
	                    React.createElement(
	                        'div',
	                        { onTouchTap: this.changeTab.bind(this, types.dress), className: this.state.currentType == types.dress ? 'tab-btn active' : 'tab-btn' },
	                        '\u7A7F\u642D'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'tab', style: { display: this.state.currentType == types.beauty ? 'block' : 'none' } },
	                    React.createElement(_waterFull.WaterFull, { column: 2, datas: this.state.beautyList, dataMethod: this.getBeautyCatgory.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'tab', style: { display: this.state.currentType == types.dress ? 'block' : 'none' } },
	                    React.createElement(_waterFull.WaterFull, { column: 2, datas: this.state.dressList, dataMethod: this.getDressCategory.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { style: { display: this.state.message == null ? 'none' : 'block' } },
	                    React.createElement('div', { className: 'cover-layout' }),
	                    React.createElement(
	                        'div',
	                        { className: 'message' },
	                        this.state.message
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('美容穿搭');
	    // 无路由方式
	    //ReactDOM.render(<App></App>, document.getElementById('ROOT'));
	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/detail/:setpId', component: _stepDetail.StepDetail })
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
	var DataAction = Reflux.createActions(['getCatgory', //获取数据列表
	'getStep']);
	exports.DataAction = DataAction;

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
	exports.DataStore = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Actions = __webpack_require__(4);

	function ajax(opt) {
	    opt = opt || {};
	    opt.method = opt.method.toUpperCase() || 'POST';
	    opt.url = opt.url || '';
	    opt.async = opt.async || true;
	    opt.data = opt.data || null;
	    opt.success = opt.success || function () {};
	    var xmlHttp = null;
	    if (XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    } else {
	        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	    }
	    var params = [];
	    for (var key in opt.data) {
	        params.push(key + '=' + opt.data[key]);
	    }
	    var postData = params.join('&');
	    if (opt.method.toUpperCase() === 'POST') {
	        xmlHttp.open(opt.method, opt.url, opt.async);
	        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
	        xmlHttp.send(postData);
	    } else if (opt.method.toUpperCase() === 'GET') {
	        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
	        xmlHttp.send(null);
	    }
	    xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	            opt.success(JSON.parse(xmlHttp.responseText));
	        }
	    };
	};
	function getHuaweiToken(sucCallback, errCallback) {
	    if (!window.AppJsBridge) return typeof errCallback === 'function' && errCallback('未检测到华为SDK');
	    AppJsBridge.service.applicationService.doAction({
	        "applicationName": "com.huawei.smarthome.clife.ClifeApplication",
	        "serviceName": "getAccessToken",
	        "parameters": {},
	        "action": "getAccessToken",
	        "success": function success(data) {
	            if (data != null && data.Status != null) {
	                if (data.Status == "0") {
	                    var result = data.result;
	                    return typeof sucCallback === 'function' && sucCallback(result);
	                } else {
	                    return typeof errCallback === 'function' && errCallback('获取token失败,driver返回' + data.Status);
	                }
	            } else {
	                return typeof errCallback === 'function' && errCallback('获取token失败,driver未响应');
	            }
	        },
	        "error": function error(data) {
	            return typeof errCallback === 'function' && errCallback('获取token失败,APP代理token请求失败');
	        }
	    });
	};
	function getToken(sucCallback, errCallback) {
	    //sucCallback('f523a77afc394682aab441ae9e66e30c');return;
	    var callback = function callback(data) {
	        return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data.accessToken : data;
	    };
	    var sucFun = function sucFun(data) {
	        var token = data.accessToken;
	        return typeof sucCallback === 'function' ? sucCallback(token) : null;
	    };
	    return getHuaweiToken(sucFun || callback, errCallback || callback);
	};
	var appId = 30590;
	var appType = !!(navigator.userAgent.indexOf('Android') + 1) ? 3 : 4;
	var DataStore = Reflux.createStore({
	    listenables: [_Actions.DataAction],
	    onGetCatgory: function onGetCatgory(typeId, pageIndex) {
	        var pageRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

	        var self = this,
	            url = 'https://test.api.clife.cn/v1/app/chairdressing/news/list';
	        var dataSuccFunc = function dataSuccFunc(res) {
	            self.trigger({ index: pageIndex, list: res.data.list });
	        };
	        var tokenSuccFunc = function tokenSuccFunc(token) {
	            ajax({
	                method: 'GET',
	                url: url,
	                data: {
	                    appId: appId,
	                    timestamp: new Date().getTime(),
	                    accessToken: token,
	                    appType: appType,
	                    typeId: typeId,
	                    pageIndex: pageIndex,
	                    pageRows: pageRows
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code == 0) {
	                        dataSuccFunc(res);
	                    }
	                }
	            });
	        };
	        var tokenErrorFunc = function tokenErrorFunc(tip) {
	            alert('没有获取到token' + tip);
	        };
	        getToken(tokenSuccFunc, tokenErrorFunc);
	    },
	    onGetStep: function onGetStep(newsId) {
	        var self = this,
	            url = 'https://test.api.clife.cn/v1/app/chairdressing/news/details';
	        var dataSuccFunc = function dataSuccFunc(res) {
	            console.log(res);
	            self.trigger(res.data);
	        };
	        var tokenSuccFunc = function tokenSuccFunc(token) {
	            ajax({
	                method: 'GET',
	                url: url,
	                data: {
	                    appId: appId,
	                    timestamp: new Date().getTime(),
	                    //accessToken:token,
	                    appType: appType,
	                    newsId: newsId
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code == 0) {
	                        dataSuccFunc(res);
	                    }
	                }
	            });
	        };
	        var tokenErrorFunc = function tokenErrorFunc(tip) {
	            alert('没有获取到token' + tip);
	        };
	        getToken(tokenSuccFunc, tokenErrorFunc);
	    }
	});
	exports.DataStore = DataStore;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WaterFull = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Card = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaterFull = function (_BaseComponent) {
	    _inherits(WaterFull, _BaseComponent);

	    function WaterFull(props) {
	        _classCallCheck(this, WaterFull);

	        var _this2 = _possibleConstructorReturn(this, (WaterFull.__proto__ || Object.getPrototypeOf(WaterFull)).call(this, props));

	        _this2.state = {};
	        _this2.state.listData = props.datas || [];
	        _this2.state.columnCount = props.column;
	        _this2.state.imgCount = _this2.state.listData.length;
	        _this2.state.imgComIndex = 0;
	        _this2.state.pageIndex = 1;
	        return _this2;
	    }
	    // CreateList() {
	    //     return [
	    //         { imgUrl: 'http://img2.imgtn.bdimg.com/it/u=1876038905,3897565663&fm=21&gp=0.jpg', title: '用了喷雾仪脸还干,补水还是没有什么效果,究竟是什么...', badges: ['漂亮', '21岁', '大陆人'] },
	    //         { imgUrl: 'http://img3.imgtn.bdimg.com/it/u=2116432478,692805493&fm=21&gp=0.jpg', title: '跑车跑车跑车', badges: ['A380', '747', '大飞机', '国行', '大陆', '到处飞'] },
	    //         { imgUrl: 'http://img4.imgtn.bdimg.com/it/u=2973782313,1308926371&fm=21&gp=0.jpg', title: '路飞路飞路飞路飞路飞路飞路飞', badges: [] },
	    //         { imgUrl: 'http://img3.redocn.com/20100320/Redocn_2010031716352583.jpg', title: '企鹅企鹅企鹅企鹅企鹅', badges: ['南极', '北极', '鸟'] },
	    //         { imgUrl: 'http://img5.imgtn.bdimg.com/it/u=1383231899,2215646628&fm=21&gp=0.jpg', title: '妹子妹子妹子妹子', badges: ['漂亮', '21岁', '大陆人'] },
	    //         { imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1127553013,3735062896&fm=21&gp=0.jpg', title: '橙子橙子橙子橙子橙子橙子橙子', badges: ['宣传照片'] },
	    //         { imgUrl: 'http://img5.imgtn.bdimg.com/it/u=715530332,997477173&fm=21&gp=0.jpg', title: '猫咪猫咪猫咪猫咪猫咪', badges: ['短毛', '可爱', '猫'] },
	    //         { imgUrl: 'http://travel.mangocity.com/images/plane/74M.jpg', title: '飞机飞机飞机', badges: ['波音', '747', '大飞机', '国行', '大陆', '到处飞'] },
	    //     ]
	    // }


	    _createClass(WaterFull, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var scroller = this.refs.scroll,
	                pullDown = this.refs.pullDown,
	                pullDownLabel = this.refs.pullDownLabel,
	                pullUp = this.refs.pullUp,
	                pullUpLabel = this.refs.pullUpLabel,
	                goTop = this.refs.goTop,
	                _this = this,
	                step = 0; //加载状态：默认0,1为加载状态，2为执行加载
	            this.myScroll = new IScroll(this.refs.scroll, {
	                probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
	                scrollbars: false, //有滚动条  
	                mouseWheel: true, //允许滑轮滚动  
	                fadeScrollbars: false, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
	                bounce: true, //边界反弹  
	                interactiveScrollbars: false, //滚动条可以拖动  
	                shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
	                click: false, // 允许点击事件  
	                keyBindings: false, //允许使用按键控制  
	                momentum: true });
	            this.myScroll.on('scroll', function () {
	                if (step == 0 && this.y > 20 && this.y <= 40) {
	                    pullDown.style.display = 'block';
	                    this.refresh();
	                    step = 1;
	                } else if (step == 1 && this.y > 40) {
	                    pullDownLabel.innerHTML = '松手马上刷新...';
	                    pullDown.className = 'flip';
	                    step = 2;
	                }
	                if (step == 0 && this.y < this.maxScrollY - 50) {
	                    pullUp.style.display = 'block';
	                    this.refresh();
	                    step = 1;
	                } else if (step == 1 && this.y < this.maxScrollY - 30) {
	                    pullUpLabel.innerHTML = '松手马上加载...';
	                    pullUp.className = 'flip';
	                    step = 2;
	                } else if (step == 2 && this.y < this.maxScrollY && this.pointY < 1) {
	                    this.scrollTo(0, this.maxScrollY, 400);
	                    return;
	                }
	            });
	            this.myScroll.on('scrollEnd', function () {
	                if (step == 1) {
	                    pullDown.style.display = 'none';
	                    pullUp.style.display = 'none';
	                    step = 0;
	                    this.refresh();
	                }
	                if (step == 2) {
	                    if (pullDown.className == 'flip') {
	                        pullDownLabel.innerHTML = '正在刷新...';
	                        pullDown.className = 'pull-tips';
	                        step = 0;
	                        _this.props.dataMethod('refresh');
	                    }
	                    if (pullUp.className == 'flip') {
	                        pullUpLabel.innerHTML = '正在加载...';
	                        pullUp.className = 'pull-tips';
	                        step = 0;
	                        _this.props.dataMethod('load');
	                    }
	                }
	                if (this.y < -250) {
	                    goTop.style.display = 'block';
	                } else {
	                    goTop.style.display = 'none';
	                }
	            });
	        }
	    }, {
	        key: 'handleImgComplate',
	        value: function handleImgComplate() {
	            this.state.imgComIndex++;
	            if (this.state.imgComIndex == this.state.imgCount) {
	                this.myScroll.refresh();
	            }
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(props) {
	            this.state.listData = props.datas || [];
	            this.state.columnCount = props.column;
	            this.state.imgCount = this.state.listData.length;
	            this.state.imgComIndex = 1;
	            this.state.pullDownLoading = false;
	            this.state.pullUpLoading = false;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.refs.pullDown.style.display = this.state.pullDownLoading ? 'block' : 'none';
	            if (!this.state.pullDownLoading) this.refs.pullDownLabel.innerText = '下拉刷新';
	            this.refs.pullUp.style.display = this.state.pullUpLoading ? 'block' : 'none';
	            if (!this.state.pullUpLoading) this.refs.pullUpLabel.innerText = '上拉加载更多...';
	        }
	    }, {
	        key: 'handleBackTop',
	        value: function handleBackTop(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.myScroll.scrollTo(0, 0, 400);
	            //this.refs.goTop.style.display='none';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var self = this;
	            var count = this.state.columnCount,
	                i = 0,
	                len = this.state.listData.length,
	                listViews = [],
	                columnWith = Math.floor(100 / count);
	            var createItemView = function createItemView(item, index) {
	                var badges = [];
	                for (var _i = 0; _i < item.tags.length; _i++) {
	                    badges.push(item.tags[_i].tagName);
	                }
	                return React.createElement(_Card.Card, { key: item.newsId, option: { imgUrl: item.smallPic, title: item.title, badges: badges, newsId: item.newsId }, onImgCompalte: self.handleImgComplate.bind(self) });
	            };
	            for (; i < count; i++) {
	                listViews[i] = [];
	            }
	            i = 0;
	            for (; i < len; i++) {
	                var index = i % count;
	                listViews[index].push(createItemView(this.state.listData[i], i));
	            }
	            return React.createElement(
	                'div',
	                { className: 'scroll', ref: 'scroll' },
	                React.createElement(
	                    'div',
	                    { style: { display: len > 0 ? 'block' : 'none' } },
	                    React.createElement(
	                        'div',
	                        { ref: 'pullDown', className: 'pull-tips' },
	                        React.createElement(
	                            'span',
	                            { ref: 'pullDownLabel' },
	                            '\u4E0B\u62C9\u5237\u65B0'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'water-full' },
	                        listViews.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { className: 'column', key: index, style: { width: columnWith + '%' } },
	                                item
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { ref: 'pullUp', className: 'pull-tips' },
	                        React.createElement(
	                            'span',
	                            { ref: 'pullUpLabel' },
	                            '\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A...'
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'go-top', onTouchTap: this.handleBackTop.bind(this), ref: 'goTop', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return WaterFull;
	}(_BaseComponentClass.BaseComponent);

	;

	exports.WaterFull = WaterFull;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Card = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    hashHistory = _ReactRouter.hashHistory;

	var Card = function (_BaseComponent) {
	    _inherits(Card, _BaseComponent);

	    function Card(props) {
	        _classCallCheck(this, Card);

	        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

	        _this.state = {};
	        _this.state.option = props.option;
	        _this.state.titleHeight = 18;
	        _this.state.mutLine = 2;
	        return _this;
	    }

	    _createClass(Card, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var title = this.refs.titleText;
	            this.formatTitle(title);
	        }
	    }, {
	        key: 'formatTitle',
	        value: function formatTitle(title) {
	            if (title.offsetHeight > this.state.titleHeight * this.state.mutLine) {
	                title.isFormat = true;
	                title.innerText = title.innerText.substr(0, title.innerText.length - 1);
	                this.formatTitle(title);
	            } else if (title.isFormat) {
	                title.innerText = title.innerText.substr(0, title.innerText.length - 1) + '...';
	                title.isFormat = false;
	                return;
	            };
	        }
	    }, {
	        key: 'handleLoad',
	        value: function handleLoad(e) {
	            this.refs.thisItem.style.opacity = '1';
	            this.props.onImgCompalte();
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var newsId = this.state.option.newsId;
	            hashHistory.push('/detail/' + newsId);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var option = this.state.option;
	            var badgeViews = [];
	            var len = option.badges.length >= 5 ? 2 : option.badges.length;
	            for (var i = 0; i < len; i++) {
	                badgeViews.push(React.createElement(
	                    'span',
	                    { key: i, className: 'badge' },
	                    option.badges[i]
	                ));
	            }
	            return React.createElement(
	                'div',
	                { className: 'item', ref: 'thisItem', onTouchTap: this.handleClick.bind(this) },
	                React.createElement(
	                    'div',
	                    { className: 'photo' },
	                    React.createElement('img', { src: option.imgUrl, onLoad: this.handleLoad.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'title', style: { lineHeight: this.state.titleHeight + 'px' } },
	                    React.createElement(
	                        'p',
	                        { ref: 'titleText' },
	                        option.title
	                    )
	                ),
	                badgeViews.length <= 0 ? null : React.createElement(
	                    'div',
	                    { className: 'badge-view' },
	                    badgeViews
	                )
	            );
	        }
	    }]);

	    return Card;
	}(_BaseComponentClass.BaseComponent);

	exports.Card = Card;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StepDetail = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	// 创建React组件

	var StepDetail = exports.StepDetail = function (_BaseComponent) {
	    _inherits(StepDetail, _BaseComponent);

	    function StepDetail(props) {
	        _classCallCheck(this, StepDetail);

	        var _this = _possibleConstructorReturn(this, (StepDetail.__proto__ || Object.getPrototypeOf(StepDetail)).call(this, props));

	        _this.state = {
	            stepId: _this.props.params.setpId
	        };
	        _this.listenStore(_Store.DataStore); // 监听Store
	        _Actions.DataAction.getStep(_this.state.stepId);
	        return _this;
	    }

	    _createClass(StepDetail, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            if (this.state.title) {
	                het.setTitle(this.state.title);
	            }
	            if (this.state.content) {
	                this.refs.articleContent.innerHTML = this.state.content;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var tags = this.state.tags || [];
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'header',
	                    null,
	                    this.state.title || ""
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'labelNav' },
	                    tags.map(function (item, index) {
	                        return React.createElement(
	                            'label',
	                            { className: 'labelName', key: index },
	                            item.tagName
	                        );
	                    })
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'articleDate' },
	                    this.state.addTime || ""
	                ),
	                React.createElement('section', { className: 'articleContent', ref: 'articleContent' })
	            );
	        }
	    }]);

	    return StepDetail;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);