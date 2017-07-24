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

	var _getPrototypeOf = __webpack_require__(2);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(33);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(80);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _Actions = __webpack_require__(88);

	var _Store = __webpack_require__(89);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Funs} from '../../../common/src/fun.es6';
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
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);

	    if (AppData.deviceId === undefined && !!data.deviceId) {
	        AppData.deviceId = data.deviceId;
	        _Actions.Actions.getLatestData();
	    }
	});

	// 创建React组件

	var App = function (_React$Component) {
	    (0, _inherits3.default)(App, _React$Component);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _Actions.Actions.local();
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'render',
	        value: function render() {
	            var airlevel = this.state.airlevel || 0;
	            var pm25Value = this.state.pm25Value || 0;
	            var formaldehydeValue = this.state.formaldehydeValue || 0;
	            var TVOCValue = this.state.tvocValue || 0;
	            var CO2Value = this.state.co2Value || 0;
	            var pm25Status = pm25Value < 75 ? 1 : 0;
	            var formaldehydStatus = formaldehydeValue < 100 ? 1 : 0;
	            var tovcStatus = TVOCValue < 600 ? 1 : 0;
	            var co2Status = CO2Value < 450 ? 1 : 0;
	            var airStatus = "空气质量 : " + ["--", "优", "良", "中", "差"][airlevel];
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    airStatus
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: pm25Status ? "../static/img/btnlist/jd_home_icon_pm.png" : "../static/img/btnlist/jd_home_icon_pm2.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            pm25Status ? "正常" : "超标"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: formaldehydStatus ? "../static/img/btnlist/jd_home_icon_jq.png" : "../static/img/btnlist/jd_home_icon_jq2.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            formaldehydStatus ? "正常" : "超标"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: tovcStatus ? "../static/img/btnlist/jd_home_icon_tovc.png" : "../static/img/btnlist/jd_home_icon_tovc2.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            tovcStatus ? "正常" : "超标"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: co2Status ? "../static/img/btnlist/jd_home_icon_co2.png" : "../static/img/btnlist/jd_home_icon_co22.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            co2Status ? "正常" : "超标"
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
	    het.setTitle('德赛空气检测仪');
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

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(5)
	  , $getPrototypeOf = __webpack_require__(7);

	__webpack_require__(13)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(8)
	  , toObject    = __webpack_require__(5)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys')
	  , uid    = __webpack_require__(12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(15)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , core      = __webpack_require__(15)
	  , ctx       = __webpack_require__(16)
	  , hide      = __webpack_require__(18)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(17);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(20)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , toPrimitive    = __webpack_require__(26)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(23) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(21);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(30);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(35);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(38)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(40)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , defined   = __webpack_require__(6);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(41)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(42)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(43)
	  , $iterCreate    = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(57)
	  , getPrototypeOf = __webpack_require__(7)
	  , ITERATOR       = __webpack_require__(58)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(45)
	  , descriptor     = __webpack_require__(27)
	  , setToStringTag = __webpack_require__(57)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(58)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(20)
	  , dPs         = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(55)
	  , IE_PROTO    = __webpack_require__(9)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(25)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(56).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(19)
	  , anObject = __webpack_require__(20)
	  , getKeys  = __webpack_require__(47);

	module.exports = __webpack_require__(23) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(55);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(8)
	  , toIObject    = __webpack_require__(49)
	  , arrayIndexOf = __webpack_require__(52)(false)
	  , IE_PROTO     = __webpack_require__(9)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(51);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(49)
	  , toLength  = __webpack_require__(53)
	  , toIndex   = __webpack_require__(54);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(39)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 55 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(58)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(10)('wks')
	  , uid        = __webpack_require__(12)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(11)
	  , hide          = __webpack_require__(18)
	  , Iterators     = __webpack_require__(43)
	  , TO_STRING_TAG = __webpack_require__(58)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(43)
	  , toIObject        = __webpack_require__(49);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(40)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(58);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(15).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(11)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(23)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(42)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(24)
	  , shared         = __webpack_require__(10)
	  , setToStringTag = __webpack_require__(57)
	  , uid            = __webpack_require__(12)
	  , wks            = __webpack_require__(58)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(73)
	  , anObject       = __webpack_require__(20)
	  , toIObject      = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(26)
	  , createDesc     = __webpack_require__(27)
	  , _create        = __webpack_require__(45)
	  , gOPNExt        = __webpack_require__(74)
	  , $GOPD          = __webpack_require__(76)
	  , $DP            = __webpack_require__(19)
	  , $keys          = __webpack_require__(47)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f  = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(41)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(18)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(12)('meta')
	  , isObject = __webpack_require__(21)
	  , has      = __webpack_require__(8)
	  , setDesc  = __webpack_require__(19).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(24)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(41)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(47)
	  , toIObject = __webpack_require__(49);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(47)
	  , gOPS    = __webpack_require__(71)
	  , pIE     = __webpack_require__(72);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(51);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(49)
	  , gOPN      = __webpack_require__(75).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(48)
	  , hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(72)
	  , createDesc     = __webpack_require__(27)
	  , toIObject      = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(26)
	  , has            = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(22)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(23) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(81);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(85);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(84).set});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(21)
	  , anObject = __webpack_require__(20);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(16)(Function.call, __webpack_require__(76).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(45)});

/***/ },
/* 88 */
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
	'cancelSelect', // 取消时间选择控件
	'submitSelect', // 选择时间选择控件
	'showTimeSelect', // 显示时间选择控件
	'powerDevice', // 开关机
	'switchHistoryTab', //切换列表ul->li的选中位置
	'getAllData', //获取某一天的数据
	'getLatestData', //获取最近一条运行数据
	'getWeather', //获取天气信息
	'refreshCreateTime', //刷新时间
	'submitDialogButtonOne', //弹窗按钮 我知道了 点击事件
	'local', //回退不会促发repaint，在constructor里调用该方法，获取到保存在全局变量（缓存姑且叫做缓存吧）里的状态字段
	'hintOffLineTip']);

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _fun = __webpack_require__(90);

	var _Actions = __webpack_require__(88);

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 */


	var AppData = {};

	// 数据过滤计时器
	var dataFilterTimers = {};

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
	    var time = new Date().getTime() + 10e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	function myFormatDate(date) {
	    return date.replace("年", "-").replace("月", "-").replace("日", "");
	}
	/**
	 * 把UTC的"yyyy-MM-dd hh:mm:ss"转换成北京时间的"yyyy-MM-dd hh:mm:ss"
	 * @param utcTime
	 */
	function transTimeFromUTC2Current(utcTime) {
	    utcTime = utcTime.toString().replace(" ", "T");
	    utcTime = utcTime + ".000+00:00";
	    return _fun.Funs.dateFormat(utcTime, "yyyy-MM-dd hh:mm:ss", false);
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        //type:0 控制数据;1: 运行数据

	        var data = dataFilter(datas);
	        //设备id
	        if (!!data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (!!data.online) {
	            AppData.online = data.online;
	            if (data.online == 1) {
	                AppData.hasShowOffLineTip = false;
	            }
	            // het.toast("online--> : "+AppData.online);
	            //console.log("Store-->online--> : "+AppData.online);
	        }
	        if (!!data.networkavailable) {
	            // het.toast('networkavailable--> : '+data.networkavailable);
	            // if (AppData.networkavailable != 2 && !data.networkavailable && data.networkavailable == 2) het.toast('当前网络不可用，请检查你的网络');
	            AppData.networkavailable = data.networkavailable;
	            //console.log("Store-->networkavailable--> : "+AppData.networkavailable);
	        }
	        //位置信息
	        if (data.cityName != undefined) AppData.cityName = data.cityName; //城市位置

	        //运行数据
	        if (data.powerstatus != undefined) AppData.powerstatus = data.powerstatus; //开关机状态 0x01：开机;0x02：关机; 0x03：待机;

	        if (data.airlevel != undefined) AppData.airlevel = data.airlevel; //空气质量指数状态
	        if (data.pm25high != undefined) AppData.pm25high = data.pm25high; //PM25高字节
	        if (data.pm25low != undefined) AppData.pm25low = data.pm25low;
	        if (data.PM10high != undefined) AppData.PM10high = data.PM10high; //PM10高位
	        if (data.PM10low != undefined) AppData.PM10low = data.PM10low;
	        if (data.formaldehydehigh != undefined) AppData.formaldehydehigh = data.formaldehydehigh; //甲醛值高字节
	        if (data.formaldehydelow != undefined) AppData.formaldehydelow = data.formaldehydelow;
	        if (data.TVOChigh != undefined) AppData.TVOChigh = data.TVOChigh; //TVOChigh
	        if (data.TVOClow != undefined) AppData.TVOClow = data.TVOClow;
	        if (data.CO2high != undefined) AppData.CO2high = data.CO2high; //CO2high
	        if (data.CO2low != undefined) AppData.CO2low = data.CO2low;
	        if (data.temperature != undefined) AppData.temperature = data.temperature; //温度值
	        if (data.humidity != undefined) AppData.humidity = data.humidity; //湿度值

	        if (AppData.pm25high != undefined && AppData.pm25low != undefined) {
	            AppData.pm25Value = AppData.pm25high * 256 + AppData.pm25low;
	        }
	        if (AppData.PM10high != undefined && AppData.PM10low != undefined) {
	            AppData.pm10Value = AppData.PM10high * 256 + AppData.PM10low;
	        }
	        if (AppData.formaldehydehigh != undefined && AppData.formaldehydelow != undefined) {
	            AppData.formaldehydeValue = AppData.formaldehydehigh * 256 + AppData.formaldehydelow;
	        }
	        if (AppData.TVOChigh != undefined && AppData.TVOClow != undefined) {
	            AppData.tvocValue = AppData.TVOChigh * 256 + AppData.TVOClow;
	        }
	        if (AppData.CO2high != undefined && AppData.CO2low != undefined) {
	            AppData.co2Value = AppData.CO2high * 256 + AppData.CO2low;
	        }
	        //控制数据
	        if (data.power != undefined) AppData.power = data.power; //开关机设置
	        // if (data.buzzer != undefined) AppData.buzzer = data.buzzer;//蜂鸣器设置
	        // if (data.displaycycle != undefined) AppData.displaycycle = data.displaycycle;//显示屏切换周期设置
	        if (data.updateFlag != undefined) AppData.updateFlag = data.updateFlag; //功能变更
	        //故障数据
	        if (data.lowvoltage != undefined) AppData.lowvoltage = data.lowvoltage; //低电量报警
	        if (data.air != undefined) AppData.air = data.air; //空气质量指数超标
	        if (data.PM25 != undefined) AppData.PM25 = data.PM25; //PM25指数状态
	        if (data.PM10 != undefined) AppData.PM10 = data.PM10; //PM10指数状态
	        if (data.formaldehyde != undefined) AppData.formaldehyde = data.formaldehyde; //甲醛指数状态
	        if (data.TVOC != undefined) AppData.TVOC = data.TVOC; //TVOC指数状态
	        if (data.CO2 != undefined) AppData.CO2 = data.CO2; //二氧化碳指数状态

	        if (AppData.lowvoltage == 1 && (AppData.showDialogStatusLowVoltage == undefined || AppData.showDialogStatusLowVoltage == 0)) {
	            //如果AppData.lowvoltage == 1(故障) 且 之前没有
	            //显示弹窗
	            AppData.showDialogStatusLowVoltage = 1;
	            AppData.titleButtonOne = "电量提醒";
	            AppData.contentButtonOne = "电量已少于25%, 请及时充电";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.lowvoltage == 0) {
	            AppData.showDialogStatusLowVoltage = 0;
	        }
	        if (AppData.air == 1 && (AppData.showDialogStatusair == undefined || AppData.showDialogStatusair == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusair = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "空气质量指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.air == 0) {
	            AppData.showDialogStatusair = 0;
	        }
	        if (AppData.PM25 == 1 && (AppData.showDialogStatusPM25 == undefined || AppData.showDialogStatusPM25 == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusPM25 = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "PM2.5指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.PM25 == 0) {
	            AppData.showDialogStatusPM25 = 0;
	        }
	        if (AppData.PM10 == 1 && (AppData.showDialogStatusPM10 == undefined || AppData.showDialogStatusPM10 == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusPM10 = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "PM10指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.PM10 == 0) {
	            AppData.showDialogStatusPM10 = 0;
	        }
	        if (AppData.formaldehyde == 1 && (AppData.showDialogStatusformaldehyde == undefined || AppData.showDialogStatusformaldehyde == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusformaldehyde = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "甲醛指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.formaldehyde == 0) {
	            AppData.showDialogStatusformaldehyde = 0;
	        }
	        if (AppData.TVOC == 1 && (AppData.showDialogStatusTVOC == undefined || AppData.showDialogStatusTVOC == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusTVOC = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "TVOC指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.TVOC == 0) {
	            AppData.showDialogStatusTVOC = 0;
	        }
	        if (AppData.CO2 == 1 && (AppData.showDialogStatusCO2 == undefined || AppData.showDialogStatusCO2 == 0)) {
	            //
	            //显示弹窗
	            AppData.showDialogStatusCO2 = 1;
	            AppData.titleButtonOne = "告警";
	            AppData.contentButtonOne = "CO2指数超标";
	            AppData.isShowDialogButtonOne = true;
	        } else if (AppData.CO2 == 0) {
	            AppData.showDialogStatusCO2 = 0;
	        }

	        if (data.aqiOuter != undefined) AppData.aqiOuter = data.aqiOuter;
	        if (data.coOuter != undefined) AppData.coOuter = data.coOuter;
	        if (data.no2Outer != undefined) AppData.no2Outer = data.no2Outer;
	        if (data.o3Outer != undefined) AppData.o3Outer = data.o3Outer;
	        if (data.pm10Outer != undefined) AppData.pm10Outer = data.pm10Outer;
	        if (data.pm25Outer != undefined) AppData.pm25Outer = data.pm25Outer;
	        if (data.so2Outer != undefined) AppData.so2Outer = data.so2Outer;
	        if (data.tempOuter != undefined) AppData.tempOuter = data.tempOuter;
	        if (data.updateTimeOuter != undefined) AppData.updateTimeOuter = data.updateTimeOuter;
	        if (data.qualityOuter != undefined) AppData.qualityOuter = data.qualityOuter;

	        if (data.createTime != undefined) AppData.createTime = data.createTime; //

	        if (data.dataList != undefined) AppData.dataList = data.dataList; //
	        if (data.loading != undefined) AppData.loading = data.loading; //
	        this.trigger(AppData);
	    },
	    onCancelSelect: function onCancelSelect() {
	        AppData.showTimeSelectView = false;
	        this.trigger(AppData);
	    },
	    onSubmitSelect: function onSubmitSelect(date) {
	        AppData.showTimeSelectView = false;
	        AppData.currentDate = date;
	        this.trigger(AppData);
	    },
	    onGetAllData: function onGetAllData() {
	        // console.log("Store-->loading==> onGetAllData-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	        var _this = this;
	        var date = AppData.currentDate;
	        if (date === undefined) {
	            var myDate = new Date();
	            date = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
	        }
	        AppData.currentDate = date;
	        var dateStr = myFormatDate(date);
	        var url = '/v1/app/customization/desay/airDetector/getDataList';

	        if (!AppData.networkavailable && AppData.networkavailable == 2) {
	            AppData.isLoadingGetAllData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            het.toast('获取数据失败~');
	            AppData.loadAllDataSuccess = false;
	            // console.log("Store-->loading==> onGetAllData-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            _this.trigger(AppData);
	            return;
	        }

	        var params = {
	            "deviceId": AppData.deviceId,
	            "timeZone": '8',
	            "date": dateStr
	        };
	        var time = undefined;
	        var sucCallBack = function sucCallBack(success) {
	            var successParse = JSON.parse(success);
	            //console.log('data =' + JSON.stringify(successParse.data));
	            if (successParse.code == 0) {
	                AppData.isLoadingGetAllData = 0;
	                AppData.dataList = successParse.data;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                AppData.loadAllDataSuccess = true;
	                //console.log("Store-->loading==> onGetAllData-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	            } else {
	                AppData.isLoadingGetAllData = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                het.toast('请求异常');
	                AppData.loadAllDataSuccess = false;
	                //console.log("Store-->loading==> onGetAllData-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	            }
	        };
	        var errCallback = function errCallback(fail) {
	            AppData.isLoadingGetAllData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            het.toast('获取数据失败~');
	            AppData.loadAllDataSuccess = false;
	            //console.log("Store-->loading==> onGetAllData-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        };
	        if (AppData.deviceId == undefined) {
	            AppData.isLoadingGetAllData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetAllData-->deviceId == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        } else {
	            het.get(url, params, sucCallBack, errCallback);
	            AppData.isLoadingGetAllData = 1;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetAllData-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            time = setTimeout(function () {
	                AppData.isLoadingGetAllData = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetAllData-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                // het.toast('请求历史数据超时~');
	                if (AppData.loading === 2) het.toast('请求数据超时~');
	                _this.trigger(AppData);
	            }, 30 * 1000);
	            _this.trigger(AppData);
	        }
	    },
	    onGetLatestData: function onGetLatestData() {
	        if (AppData.airlevel !== undefined) {
	            //console.log("==het.get== onGetLatestData start , there is have run data");
	            return;
	        }
	        //console.log("Store-->loading==> onGetLatestData-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	        var _this = this;
	        var time = undefined;

	        if (!AppData.networkavailable && AppData.networkavailable == 2) {
	            het.toast('获取最近的数据失败~');
	            AppData.isLoadingLatestData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetLatestData-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            _this.trigger(AppData);
	            return;
	        }

	        var url = '/v1/app/customization/desay/airDetector/getLatestData';
	        var params = {
	            "deviceId": AppData.deviceId
	        };
	        var sucCallBack = function sucCallBack(success) {
	            var successParse = JSON.parse(success);
	            if (successParse.code == 0) {
	                if (AppData.airlevel === undefined) {
	                    AppData.pm25Value = successParse.data.pm25;
	                    AppData.pm10Value = successParse.data.pm10;
	                    AppData.formaldehydeValue = successParse.data.hcho;
	                    AppData.tvocValue = successParse.data.tvoc;
	                    AppData.co2Value = successParse.data.co2;
	                    AppData.temperature = successParse.data.temp;
	                    AppData.humidity = successParse.data.humidity;
	                    AppData.airlevel = successParse.data.aqi;
	                    AppData.createTime = transTimeFromUTC2Current(successParse.data.createTime);
	                }
	                AppData.isLoadingLatestData = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetLatestData-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	            } else {
	                AppData.isLoadingLatestData = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	                //console.log("Store-->loading==> onGetLatestData-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                het.toast('请求异常');
	            }
	        };
	        var errCallback = function errCallback(fail) {
	            het.toast('获取最近的数据失败~');
	            AppData.isLoadingLatestData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetLatestData-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        };
	        if (AppData.deviceId == undefined) {
	            AppData.isLoadingLatestData = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetLatestData-->deviceId == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        } else if (AppData.airlevel == undefined) {
	            het.get(url, params, sucCallBack, errCallback);
	            AppData.isLoadingLatestData = 1;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetLatestData-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            time = setTimeout(function () {
	                AppData.isLoadingLatestData = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetLatestData-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                // het.toast('请求最新的数据超时~');
	                if (AppData.loading === 2) het.toast('请求数据超时~');
	                _this.trigger(AppData);
	            }, 30 * 1000);
	            _this.trigger(AppData);
	        }
	    },
	    onGetWeather: function onGetWeather() {
	        //console.log("Store-->loading==> onGetWeather-->start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	        var _this = this;

	        if (!AppData.networkavailable && AppData.networkavailable == 2) {
	            het.toast('获取城市空气信息失败');
	            AppData.isLoadingGetWeather = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetWeather-->networkavailable is 2|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            _this.trigger(AppData);
	            return;
	        }

	        var cityName = AppData.cityName;
	        var url = '/v1/web/env/weather/clife/now';
	        var params = {
	            "city": cityName
	        };
	        var time = undefined;
	        var sucCallBack = function sucCallBack(success) {
	            var successParse = JSON.parse(success);
	            if (successParse.code == 0) {
	                AppData.aqiOuter = successParse.data.aqi;
	                AppData.coOuter = successParse.data.co;
	                AppData.no2Outer = successParse.data.no2;
	                AppData.o3Outer = successParse.data.o3;
	                AppData.pm10Outer = successParse.data.pm10;
	                AppData.pm25Outer = successParse.data.pm25;
	                AppData.so2Outer = successParse.data.so2;
	                AppData.tempOuter = successParse.data.temp;
	                AppData.updateTimeOuter = successParse.data.updateTime;
	                AppData.qualityOuter = successParse.data.quality;
	                AppData.isLoadingGetWeather = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetWeather-->sucCallBack code == 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	            } else {
	                het.toast('请求异常');
	                AppData.isLoadingGetWeather = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetWeather-->sucCallBack code != 0|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                if (time) clearTimeout(time);
	                _this.trigger(AppData);
	            }
	        };
	        var errCallback = function errCallback(fail) {
	            het.toast('获取城市空气信息失败');
	            AppData.isLoadingGetWeather = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetWeather-->errCallback|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        };
	        if (AppData.cityName == undefined) {
	            AppData.isLoadingGetWeather = 0;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetWeather-->cityName == undefined|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	            if (time) clearTimeout(time);
	            _this.trigger(AppData);
	        } else {
	            het.get(url, params, sucCallBack, errCallback);
	            AppData.isLoadingGetWeather = 1;
	            AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	            //console.log("Store-->loading==> onGetWeather-->het.get start|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);

	            time = setTimeout(function () {
	                AppData.isLoadingGetWeather = 0;
	                AppData.loading = AppData.isLoadingGetAllData == 1 || AppData.isLoadingLatestData == 1 || AppData.isLoadingGetWeather == 1 ? 1 : 2;
	                //console.log("Store-->loading==> onGetWeather-->setTimeout|||, loading : "+AppData.loading+", isLoadingGetAllData : "+AppData.isLoadingGetAllData+", isLoadingLatestData : "+AppData.isLoadingLatestData+", isLoadingGetWeather : "+AppData.isLoadingGetWeather);
	                // het.toast('请求天气数据超时~');
	                if (AppData.loading === 2) het.toast('请求数据超时~');
	                _this.trigger(AppData);
	            }, 30 * 1000);
	            _this.trigger(AppData);
	        }
	    },
	    onShowTimeSelect: function onShowTimeSelect() {
	        AppData.showTimeSelectView = true;
	        this.trigger(AppData);
	    },
	    onPowerDevice: function onPowerDevice(powerData) {
	        //开关机
	        // het.toast("onPowerDevice start");
	        var _this = this;
	        // console.log("set--> powerstatus : "+(AppData.powerstatus));
	        // AppData.power = AppData.powerstatus == undefined || AppData.powerstatus == 2 ? 1 : 2;//
	        powerData.updateFlag = het.hexUpFlag(0, 1, 2);
	        het.send(powerData, function (data) {
	            AppData.powerstatus = powerData.power == 1 ? 3 : 2; //直接修改运行数据, 渲染UI
	            // console.log("set--> success powerstatus : "+(AppData.powerstatus));
	            if (powerData.power == 2) {
	                AppData.pm25high = 0;
	                AppData.pm25low = 0;
	                AppData.PM10high = 0;
	                AppData.PM10low = 0;
	                AppData.formaldehydehigh = 0;
	                AppData.formaldehydelow = 0;
	                AppData.TVOChigh = 0;
	                AppData.TVOClow = 0;
	                AppData.CO2high = 0;
	                AppData.CO2low = 0;
	                AppData.temperature = 0;
	                AppData.humidity = 0;
	                AppData.pm25Value = 0;
	                AppData.pm10Value = 0;
	                AppData.formaldehydeValue = 0;
	                AppData.tvocValue = 0;
	                AppData.co2Value = 0;
	                setDataTimer('powerstatus', 'pm25high', 'pm25low', 'PM10high', 'PM10low', 'formaldehydehigh', 'formaldehydelow', 'TVOChigh', 'TVOClow', 'CO2high', 'CO2low', 'temperature', 'humidity');
	            } else {
	                setDataTimer('powerstatus');
	            }

	            _this.trigger(AppData);
	        }, function (AppData) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwitchHistoryTab: function onSwitchHistoryTab(where) {
	        if (where == AppData.currentHistoryTab) return;
	        AppData.currentHistoryTab = where;
	        this.trigger(AppData);
	    },
	    onRefreshCreateTime: function onRefreshCreateTime(createTime) {
	        AppData.createTime = createTime;
	        AppData.online = 1;
	        this.trigger(AppData);
	    },
	    onSubmitDialogButtonOne: function onSubmitDialogButtonOne() {
	        AppData.isShowDialogButtonOne = false;
	        this.trigger(AppData);
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(AppData);
	    },
	    onHintOffLineTip: function onHintOffLineTip() {
	        AppData.hasShowOffLineTip = true;
	        this.trigger(AppData);
	    }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(91);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 91 */
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