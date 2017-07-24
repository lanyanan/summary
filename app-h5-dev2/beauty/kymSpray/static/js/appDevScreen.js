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
	                "\u4E3A\u4F7F\u5EB7\u8335\u7F8E\u4FBF\u643A\u55B7\u96FE\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5...",
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
	                "\u60A8\u4F7F\u7528\u4E86\u5EB7\u8335\u7F8E\u4FBF\u643A\u55B7\u96FE\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86",
	                this.props.waterTrend,
	                "%\uFF0C\u8BF7\u7EE7\u7EED\u4FDD\u6301~"
	            )];

	            return React.createElement(
	                "section",
	                { className: "screen" },
	                React.createElement(
	                    "div",
	                    { className: "pic" },
	                    React.createElement("img", { className: "pic", src: "../static/img/ico-bg.png" }),
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

/***/ }
/******/ ]);