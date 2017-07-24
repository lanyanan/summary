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


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.healthy();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var swiper = new Swiper('.swiper-container', {

	                direction: 'vertical',
	                simulateTouch: true

	            });

	            var sharePage = this.state.sharePage || ['', '', '', '', ''];
	            var shareTopic = this.state.shareTopic || ['', '', '', ''];
	            var number = this.state.number || ['', '', '', ''];
	            var Arr = [{
	                src: sharePage[0],
	                text: shareTopic[0],
	                text2: '天',
	                id: 'quan-day',
	                data: number[0],
	                class: '',
	                cla: ''
	            }, {
	                src: sharePage[1],
	                text: shareTopic[1],
	                text2: '升水',
	                id: 'purifiedWater',
	                data: number[1],
	                class: 'quandun-threes',
	                cla: 'quandun-fours'

	            }, {
	                src: sharePage[2],
	                text: shareTopic[2],
	                text2: 'g 垃圾',
	                id: 'clear',
	                data: number[2],
	                class: 'quandun-three3',
	                cla: 'quandun-four3'
	            }, {
	                src: sharePage[3],
	                text: shareTopic[3],
	                text2: '元',
	                id: 'money',
	                data: number[3],
	                class: 'quandun-three4',
	                cla: 'quandun-four4'
	            }];
	            return React.createElement(
	                'div',
	                { className: 'swiper-container' },
	                React.createElement(
	                    'div',
	                    { className: 'swiper-wrapper' },
	                    Arr.map(function (item, index) {
	                        return React.createElement(
	                            'div',
	                            { key: index, className: 'swiper-slide ' },
	                            React.createElement(
	                                'p',
	                                { className: 'quandun-first' },
	                                React.createElement('span', null)
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'qdImg' },
	                                React.createElement('img', { src: item.src })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: "quandun-three " + item.class },
	                                item.text
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: "quandun-four " + item.cla },
	                                React.createElement(
	                                    'a',
	                                    { id: item.id },
	                                    item.data
	                                ),
	                                item.text2
	                            )
	                        );
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'swiper-slide' },
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-first' },
	                            React.createElement('span', null)
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'qdImg' },
	                            React.createElement('img', { src: sharePage[4] })
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-three5' },
	                            '好水看得见'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-four5' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '400G大通量'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '分体式设计'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '自清洁系统'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-four5' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '水质实时监测'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '终身维护'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '|'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-five5' },
	                            '我也要喝好水'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'quandun-six5' },
	                            React.createElement(
	                                'a',
	                                { href: 'http://www.collday.com', target: '_self' },
	                                'www.collday.com'
	                            )
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
	    het.setTitle('泉盾净水分享');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    /* // 路由方式
	     ReactDOM.render((
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
	'healthy']);

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
	function getQueryObject(url) {
	    url = url == null ? window.location.href : url;
	    var search = url.substring(url.lastIndexOf("?") + 1);
	    var obj = {};
	    var reg = /([^?&=]+)=([^?&=]*)/g;
	    search.replace(reg, function (rs, $1, $2) {
	        var name = decodeURIComponent($1);
	        var val = decodeURIComponent($2);
	        val = String(val);
	        obj[name] = val;
	        return rs;
	    });
	    return obj;
	}

	var paramObj = getQueryObject();

	var URL = "/v1/app/waterpurifier/qd/deviceinfo/getSharePageInfo?productId=" + paramObj.productId;
	var Url = "/v1/app/waterpurifier/qd/deviceData/getShareData?userId=" + paramObj.userId + "&appId=10105";
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.productId) {
	            appData.productId = data.productId;
	            URL = "/v1/app/waterpurifier/qd/deviceinfo/getSharePageInfo?productId=" + data.productId;
	        };
	        this.trigger(data);
	    },
	    onHealthy: function onHealthy() {
	        var _this = this;
	        $.ajax({
	            url: URL,
	            dataType: 'json',
	            success: function (data) {
	                appData.sharePage = [];
	                appData.shareTopic = [];
	                $.each(data.data, function (idx, item) {
	                    var sharePage = item.sharePage || 0; //默认sharePage为0        
	                    appData.sharePage.push(sharePage);
	                    appData.shareTopic.push(item.shareTopic);
	                });
	                _this.trigger(appData);
	            }.bind(this)
	        });

	        $.ajax({
	            url: Url,
	            dataType: 'json',
	            success: function (data) {
	                appData.number = [];
	                $.each(data.data, function (idx, item) {
	                    appData.number.push(item);
	                });
	                _this.trigger(appData);
	            }.bind(this)
	        });
	    }
	});

/***/ }
/******/ ]);