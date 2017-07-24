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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(145);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	'use strict';
	/**
	 *波浪动画组件
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Wave = exports.Wave = React.createClass({
	    displayName: 'Wave',
	    componentDidMount: function componentDidMount() {
	        var canvas = document.getElementById('waveCanvas');
	        var ctx = canvas.getContext('2d');
	        var leaf = new Image();
	        leaf.src = "../static/img/leaf.png";
	        canvas.width = canvas.parentNode.offsetWidth;
	        canvas.height = canvas.parentNode.offsetHeight / 4;
	        window.requestAnimFrame = function () {
	            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };
	        }();
	        var step = 0;
	        var lines = ["rgba(1,208,255, 1)", "rgba(1,208,255,0.2)", "rgba(1,208,255, 0.4)", "rgba(1,208,255, 0.25)"];
	        function loop() {
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	            step++;
	            //画3个不同颜色的矩形
	            for (var j = lines.length - 1; j >= 0; j--) {
	                if (j === 0) {
	                    var imageY = canvas.height / 2 + deltaHeight - 75;
	                    imageY = imageY < 10 ? Math.abs(imageY) : imageY;
	                    ctx.drawImage(leaf, canvas.width / 4, imageY, 180, 95);
	                }
	                //每个矩形的角度都不同，每个之间相差45度
	                var angle = (step + j * 45) * Math.PI / 180;
	                var deltaHeight = Math.sin(angle) * 20;
	                var deltaHeightRight = Math.cos(angle) * 20;
	                ctx.beginPath();
	                ctx.fillStyle = lines[j];
	                ctx.moveTo(0, canvas.height / 2 + deltaHeight);
	                ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 20, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 20, canvas.width, canvas.height / 2 + deltaHeightRight);
	                ctx.lineTo(canvas.width, canvas.height);
	                ctx.lineTo(0, canvas.height);
	                ctx.lineTo(0, canvas.height / 2 + deltaHeight);
	                ctx.closePath();
	                ctx.fill();
	            }
	            requestAnimFrame(loop);
	        }
	        loop();
	    },
	    render: function render() {
	        return React.createElement('canvas', { id: 'waveCanvas' });
	    }
	});

/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Login = __webpack_require__(146);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var RouterContext = _ReactRouter.RouterContext;

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(_Login.Login, null);
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
	    // 路由方式
	    /*    ReactDOM.render((
	            <Router history={hashHistory} >
	                <Route path="/" component={App} />
	                <Route path="/bound" component={Bound} />
	                <Route path="/graph" component={Graph} />
	            </Router>
	    
	        ), document.getElementById('ROOT'));*/
	    // 调用iscroll处理页面滚动
	});

/***/ },

/***/ 146:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Login = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Wave = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 绑定设备组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {} 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {}
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Login = exports.Login = function (_React$Component) {
	    _inherits(Login, _React$Component);

	    function Login(props) {
	        _classCallCheck(this, Login);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));
	    }

	    _createClass(Login, [{
	        key: "touchStart",
	        value: function touchStart(e) {
	            e.preventDefault();
	            location.href = "xt://xt_login";
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "main" },
	                React.createElement(
	                    "div",
	                    { className: "nameArea" },
	                    React.createElement(
	                        "p",
	                        null,
	                        "向拓净水云平台"
	                    )
	                ),
	                React.createElement(_Wave.Wave, null),
	                React.createElement("div", { className: "nameBackg" }),
	                React.createElement(
	                    "button",
	                    { className: "bindBtn", onTouchStart: this.touchStart.bind(this) },
	                    "登录"
	                ),
	                React.createElement("div", { className: "loadingBigImg" })
	            );
	        }
	    }]);

	    return Login;
	}(React.Component);

	;

/***/ }

/******/ });