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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _SleepReport = __webpack_require__(95);

	var _RealTimeData = __webpack_require__(100);

	var _selectDevice = __webpack_require__(103);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Funs} from '../../../common/src/fun.es6';
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	// 创建React组件

	var App = function (_BaseComponent) {
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this.state = {
	            btnActive: false,
	            qrcodeInvaild: false,
	            qrcodeScaned: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.keyDownEvent = _this.keyDownEvent.bind(_this);
	        _Actions.Actions.confirmLogin('login');
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('keydown', this.keyDownEvent);
	            _Actions.Actions.getQrcode();
	        }
	    }, {
	        key: 'keyDownEvent',
	        value: function keyDownEvent(e) {
	            if (!this.state.qrcodeInvaild && !this.state.qrcodeScaned) return;
	            if (e.keyCode == 38 || e.keyCode == 40) {
	                this.setState({
	                    btnActive: true
	                });
	            } else if (e.keyCode == 13 && this.state.btnActive) {
	                this.reacquireQrcode();
	            }
	        }
	    }, {
	        key: 'reacquireQrcode',
	        value: function reacquireQrcode() {
	            _Actions.Actions.getQrcode();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'bg-img' },
	                React.createElement(
	                    'section',
	                    { className: 'centerBox' },
	                    React.createElement(
	                        'label',
	                        null,
	                        'C-Life\u7761\u7720APP\u626B\u7801,'
	                    ),
	                    React.createElement(
	                        'label',
	                        null,
	                        '\u5B89\u5168\u767B\u5F55'
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'qrcodeBox' },
	                        this.state.qrcodeInvaild ? React.createElement(
	                            'section',
	                            { className: 'qrcodeInvaild' },
	                            React.createElement(
	                                'span',
	                                { className: 'invaildText' },
	                                '\u4E8C\u7EF4\u7801\u5DF2\u5931\u6548'
	                            ),
	                            React.createElement(
	                                'label',
	                                { onClick: this.reacquireQrcode,
	                                    className: this.state.btnActive ? "activeBtn" : "invaildBtn" },
	                                '\u8BF7\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6'
	                            )
	                        ) : this.state.qrcodeScaned ? React.createElement(
	                            'section',
	                            { className: 'qrcodeInvaild' },
	                            React.createElement(
	                                'span',
	                                { className: 'invaildText', style: { marginTop: "50px", marginBottom: "28px" } },
	                                '\u626B\u7801\u6210\u529F'
	                            ),
	                            React.createElement(
	                                'i',
	                                { className: 'tipsText' },
	                                '\u8BF7\u5728\u624B\u673A\u4E0A\u70B9\u51FB\u767B\u5F55'
	                            ),
	                            React.createElement(
	                                'label',
	                                { onClick: this.reacquireQrcode,
	                                    className: this.state.btnActive ? "activeBtn" : "invaildBtn" },
	                                '\u8FD4\u56DE\u4E8C\u7EF4\u7801\u767B\u5F55'
	                            )
	                        ) : React.createElement(
	                            'section',
	                            null,
	                            React.createElement('img', { className: 'qrcode', src: this.state.qrcodeUrl || "" })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'description' },
	                        React.createElement('span', { className: 'codeIcon' }),
	                        React.createElement(
	                            'i',
	                            { className: 'detail' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u8BF7\u6253\u5F00'
	                            ),
	                            React.createElement(
	                                'i',
	                                null,
	                                'C-Life\u7761\u7720 APP'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'lineTwo' },
	                                '\u5DE6\u4FA7\u529F\u80FD\u680F\u7684\u201C\u626B\u7801\u767B\u5F55\u201D'
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
	    het.setTitle('睡眠监测器TV版');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: _SleepReport.SleepReport }),
	        React.createElement(Route, { path: '/select', component: _selectDevice.selectDevice }),
	        React.createElement(Route, { path: '/login', component: App }),
	        React.createElement(Route, { path: '/time', component: _RealTimeData.RealTimeData })
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(89);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaseComponent = undefined;

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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BaseComponent = exports.BaseComponent = function (_React$Component) {
	    (0, _inherits3.default)(BaseComponent, _React$Component);

	    function BaseComponent(props) {
	        (0, _classCallCheck3.default)(this, BaseComponent);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseComponent.__proto__ || (0, _getPrototypeOf2.default)(BaseComponent)).call(this, props));

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


	    (0, _createClass3.default)(BaseComponent, [{
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
/* 90 */
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
	'getData', //get请求获取数据
	'postData', //post请求获取数据
	'getRecentDateList', //获取最近有汇总数据的日期列表
	'getDayReportData', //获取日报告数据
	'getDayReportTotal', //获取日报告心率、呼吸率、翻身、打鼾、咳嗽、呼吸暂停统计数据
	'getQrcode', //获取用户扫描登录的二维码
	'getToken', //查询用户是否已扫描登录并获取token
	'getWeather', //获取天气信息
	'getUserInfo', //获取用户信息
	'getRealTimeData', //获取实时数据信息
	'confirmLogin', //确认用户是否已登录
	'refreshToken', //刷新token
	'selectDevice' //选择设备
	]);

/***/ },
/* 91 */
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

	var _stringify = __webpack_require__(92);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _Actions = __webpack_require__(90);

	var _drawChartFuns = __webpack_require__(94);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var appId = 30635;
	var appSecret = "013e6ba2a0ce456e900c097e53721dde";
	var deviceId = void 0,
	    uuid = void 0,
	    path = void 0;
	var accessToken = void 0;
	var productArray = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 136, 138, 139, 147, 1122, 1688, 1689, 1725, 2123, 2249];
	var FlagData = {
	    initReportChart: false,
	    initHeartChart: false
	};
	if (location.host === "cms.clife.cn") path = "https://api.clife.cn";
	if (location.host === "test.cms.clife.cn") path = "https://test.api.clife.cn";
	if (!path) path = "https://200.200.200.50";
	// if(!path) path = "https://test.api.clife.cn";
	var ajax = function ajax(url, data, type, sucCallback, errCallback) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	            if (xhr.status === 200 || xhr.status === 304) {
	                sucCallback(xhr.responseText);
	            } else {
	                errCallback('Request failed! Status code: ' + xhr.status);
	            }
	        }
	    };
	    xhr.open(type, url, true);
	    // xhr.withCredentials = true;
	    if (type === 'POST') {
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    }
	    xhr.send(data);
	};
	var calcSign = function calcSign(type, url, data) {
	    if (!data || (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') return;
	    var arr = [];
	    for (var key in data) {
	        arr.push(key);
	    }
	    arr.sort();
	    var str1 = type === 'GET' || type === "get" ? "GET" : "POST";
	    var signStr = str1 + url;
	    arr.forEach(function (item, index) {
	        if (index === 0) {
	            signStr = signStr + item + '=' + data[item];
	        } else {
	            signStr = signStr + "&" + item + '=' + data[item];
	        }
	    });
	    signStr = signStr + "&" + appSecret;
	    return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(signStr));
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data, type) {
	        this.trigger(data);
	    },
	    onGetData: function onGetData(url, success, error) {
	        ajax(url, "", "GET", success, error);
	    },
	    onPostData: function onPostData(url, data, success, error) {
	        ajax(url, data, "POST", success, error);
	    },
	    onGetRecentDateList: function onGetRecentDateList() {
	        var _this = this;

	        if (!accessToken) return;
	        var url = path + "/v1/app/csleep/summary/getRecentDateList";
	        var token = accessToken;
	        var timestamp = +new Date();
	        url = url + "?accessToken=" + token + "&timestamp=" + timestamp + "&appId=" + appId;
	        if (deviceId) url = url + "&deviceId=" + deviceId;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                if (!deviceId) deviceId = result.data.deviceId;
	                var dateList = result.data.dateList || [{}];
	                if (dateList[0].dataTime) _this.onGetDayReportData(dateList[0].dataTime);
	                _this.trigger({
	                    deviceId: result.data.deviceId,
	                    reportDateList: result.data.dateList
	                });
	            } else if (result.code == 100021006) {
	                accessToken = null;
	                localStorage.clear('user');
	                location.hash = "login";
	            } else if (result.code == 100021603) {
	                _this.trigger({
	                    deviceId: '',
	                    reportDateList: null
	                });
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetDayReportData: function onGetDayReportData(date) {
	        var _this2 = this;

	        if (!accessToken) return;
	        this.trigger({
	            reportChartGet: false
	        });
	        var url = path + "/v1/app/csleep/summary/getDayGradeReport";
	        var timestamp = +new Date();
	        url = url + "?accessToken=" + accessToken + "&timestamp=" + timestamp + "&appId=" + appId + "&queryFlag=0" + "&dataTime=" + date;
	        if (deviceId) url = url + "&relateDeviceIds=" + deviceId;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                _this2.onGetDayReportTotal(date);
	                var sleepTypeList = result.data.sleepTypeList || [{}];
	                _this2.trigger({
	                    sleepQuality: result.data.sleepQuality,
	                    sleepType: sleepTypeList[0].sleepTypeName,
	                    analysisDetail: sleepTypeList[0].sleepTypeTips,
	                    sleepRank: result.data.beatPercent,
	                    sleepScope: result.data.sleepScope,
	                    asleepDuration: result.data.asleepDuration,
	                    fallSleepDuration: result.data.fallSleepDuration,
	                    lightSleepDuration: result.data.lightSleepDuration,
	                    deepSleepDuration: result.data.deepSleepDuration,
	                    reportChartGet: true
	                });
	                if (!FlagData.initReportChart) {
	                    _drawChartFuns.DrawChart.initReportChart(result.data);
	                    FlagData.initReportChart = true;
	                } else {
	                    _drawChartFuns.DrawChart.updateReportChart(result.data);
	                }
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetDayReportTotal: function onGetDayReportTotal(date) {
	        var _this3 = this;

	        if (!accessToken) return;
	        this.trigger({
	            threeChartGet: false
	        });
	        var url = path + "/v1/app/csleep/summary/getDayReportTotal";
	        var timestamp = +new Date();
	        url = url + "?accessToken=" + accessToken + "&timestamp=" + timestamp + "&appId=" + appId + "&queryFlag=0" + "&dataTime=" + date;
	        if (deviceId) url = url + "&relateDeviceIds=" + deviceId;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                //平均值
	                var heartAllAverage = result.data.heartRateAnalysis ? result.data.heartRateAnalysis.statisticalData : "--";
	                var breathAllAverage = result.data.breathRateAnalysis ? result.data.breathRateAnalysis.statisticalData : "--";
	                var trunOverAllAverage = result.data.turnOverAnalysis ? result.data.turnOverAnalysis.statisticalData : "--";
	                _this3.trigger({
	                    heartRate: heartAllAverage,
	                    respirationRate: breathAllAverage,
	                    bodyMovement: trunOverAllAverage,
	                    threeChartGet: true
	                });
	                if (!FlagData.initHeartChart) {
	                    _drawChartFuns.DrawChart.initHeartChart(result.data);
	                    FlagData.initHeartChart = true;
	                } else {
	                    _drawChartFuns.DrawChart.updateHeartChart(result.data);
	                }
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetQrcode: function onGetQrcode() {
	        var _this4 = this;

	        FlagData.initHeartChart = false;
	        FlagData.initReportChart = false;
	        var userData = JSON.parse(localStorage.getItem('user'));
	        if (userData && userData.accessToken) {
	            accessToken = null;
	            return;
	        }
	        var url = path + "/v1/account/scanLogin/getQrcode";
	        var timestamp = +new Date();
	        var obj = {
	            appId: appId,
	            timestamp: timestamp
	        };
	        var sign = calcSign("POST", url, obj);
	        var str = "sign=" + sign + "&timestamp=" + timestamp + "&appId=" + appId;
	        this.onPostData(url, str, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                uuid = result.data.uuid;
	                _this4.onGetToken();
	                _this4.trigger({
	                    qrcodeUrl: result.data.qrcode,
	                    qrcodeInvaild: false,
	                    qrcodeScaned: false,
	                    btnActive: false
	                });
	            }
	        }, function (data) {
	            console.log('fail' + (0, _stringify2.default)(data));
	        });
	    },
	    onGetToken: function onGetToken() {
	        var _this5 = this;

	        var url = path + "/v1/account/scanLogin/scanStatus";
	        var timestamp = +new Date();
	        var obj = {
	            appId: appId,
	            timestamp: timestamp,
	            uuid: uuid
	        };
	        var sign = calcSign("POST", url, obj);
	        var str = "sign=" + sign + "&timestamp=" + timestamp + "&appId=" + appId + "&uuid=" + uuid;
	        this.onPostData(url, str, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 100022900) _this5.onGetToken();
	            if (result.code == 100022901) _this5.trigger({ qrcodeInvaild: true, qrcodeScaned: false });
	            if (result.code == 100022902) {
	                _this5.trigger({ qrcodeScaned: true });
	                _this5.onGetToken();
	            }
	            if (result.code == 100022903 || result.code == 0) {
	                accessToken = result.data.accessToken;
	                result.data.getTime = +new Date();
	                localStorage.setItem('user', (0, _stringify2.default)(result.data));
	                location.hash = "";
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetWeather: function onGetWeather() {
	        var _this6 = this;

	        if (!accessToken) return;
	        if (FlagData.weather) {
	            this.trigger({
	                pm25: FlagData.weather.pm25,
	                temp1: FlagData.weather.temp1,
	                temp2: FlagData.weather.temp2,
	                cityName: FlagData.weather.cityName,
	                wtext: FlagData.weather.wtext
	            });
	            return;
	        }
	        var url = path + "/v1/web/env/weather/clife/now";
	        var city = "ip";
	        url = url + "?city=" + city;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                FlagData.weather = result.data;
	                _this6.trigger({
	                    pm25: result.data.pm25,
	                    temp1: result.data.temp1,
	                    temp2: result.data.temp2,
	                    cityName: result.data.cityName,
	                    wtext: result.data.wtext
	                });
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetUserInfo: function onGetUserInfo() {
	        var _this7 = this;

	        if (!accessToken) return;
	        if (FlagData.userInfo) {
	            this.trigger({
	                userName: FlagData.userInfo.userName,
	                avatar: FlagData.userInfo.avatar
	            });
	            return;
	        }
	        var url = path + "/v1/user/get";
	        var token = accessToken;
	        var timestamp = +new Date();
	        url = url + "?appId=" + appId + "&accessToken=" + token + "&timestamp=" + timestamp;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                FlagData.userInfo = result.data;
	                _this7.trigger({
	                    userName: result.data.userName,
	                    avatar: result.data.avatar
	                });
	            } else if (result.code == 100021006) {
	                accessToken = null;
	                localStorage.clear('user');
	                location.hash = "login";
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onGetRealTimeData: function onGetRealTimeData(sucCallback) {
	        FlagData.initReportChart = false;
	        FlagData.initHeartChart = false;
	        if (!accessToken) return;
	        var url = path + "/v1/app/csleep/summary/getRawDataAndStatus";
	        var token = accessToken;
	        var timestamp = +new Date();
	        if (deviceId) {
	            url = url + "?appId=" + appId + "&accessToken=" + token + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	        } else {
	            url = url + "?appId=" + appId + "&accessToken=" + token + "&timestamp=" + timestamp;
	        }
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                sucCallback(result.data);
	            } else if (result.code == 100021006) {
	                accessToken = null;
	                localStorage.clear('user');
	                location.hash = "login";
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    onConfirmLogin: function onConfirmLogin(type) {
	        // localStorage.clear();
	        // if(type === 'report') this.onGetRecentDateList();
	        var timestamp = +new Date();
	        var userData = JSON.parse(localStorage.getItem("user"));
	        if (!userData) {
	            deviceId = null;
	            accessToken = null;
	            location.hash = "login";
	            return;
	        }
	        var getTime = Number(userData.getTime);
	        var refreshTime = Number(userData.refreshTokenExpires) * 1000;
	        var accessTokenExpires = Number(userData.accessTokenExpires) * 1000;
	        if (timestamp > getTime + refreshTime) {
	            if (type !== 'login') {
	                accessToken = null;
	                localStorage.clear('user');
	                location.hash = 'login';
	            }
	        } else if (timestamp > getTime + accessTokenExpires) {
	            accessToken = null;
	            this.onRefreshToken(userData.refreshToken, type);
	        } else {
	            accessToken = userData.accessToken;
	            if (type === 'login') location.hash = '';
	            if (type === 'report' && deviceId) this.onGetRecentDateList();
	            if (type === 'select' && FlagData.deviceList) {
	                this.trigger({ deviceList: FlagData.deviceList });
	                return;
	            }
	            if (deviceId) return;
	            this.getBind(type);
	        }
	    },
	    onRefreshToken: function onRefreshToken(refreshToken, type) {
	        var _this8 = this;

	        var url = path + "/v1/account/token/refresh";
	        var timestamp = +new Date();
	        url = url + "?appId=" + appId + "&refreshToken=" + refreshToken + "&timestamp=" + timestamp;
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                accessToken = result.data.accessToken;
	                result.data.getTime = +new Date();
	                localStorage.setItem('user', (0, _stringify2.default)(result.data));
	                _this8.onGetWeather(); //刷新token时重新获取天气信息
	                _this8.onGetUserInfo(); //刷新token时重新获取用户信息
	                if (type === 'login') location.hash = '';
	                if (type === 'report' && deviceId) _this8.onGetRecentDateList();
	                if (type === 'select' && FlagData.deviceList) {
	                    _this8.trigger({ deviceList: FlagData.deviceList });
	                    return;
	                }
	                if (deviceId) return;
	                _this8.getBind(type);
	            } else if (type !== 'login') {
	                accessToken = null;
	                localStorage.clear('user');
	                location.hash = 'login';
	            }
	        }, function (data) {
	            console.log('fail', data);
	        });
	    },
	    getBind: function getBind(type) {
	        var _this9 = this;

	        var url = path + "/v1/device/getBind";
	        var timestamp = +new Date();
	        url = url + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp;
	        url = url + "&version=1.2" + "&appType=" + (navigator.userAgent.indexOf('Android') > -1 ? 1 : 1);
	        this.onGetData(url, function (data) {
	            var result = JSON.parse(data);
	            if (result.code == 0) {
	                var len = result.data.length,
	                    deviceArr = [],
	                    i = 0;
	                for (i; i < len; i++) {
	                    if (productArray.indexOf(result.data[i].productId) > -1 && result.data[i].share !== 1) {
	                        // 1){
	                        deviceArr.push(result.data[i]);
	                    }
	                }
	                if (deviceArr.length > 1) {
	                    FlagData.initReportChart = false;
	                    FlagData.initHeartChart = false;
	                    FlagData.deviceList = deviceArr;
	                    if (type === 'select') {
	                        _this9.trigger({ deviceList: deviceArr });
	                        return;
	                    }
	                    location.hash = "select";
	                    return;
	                } else {
	                    deviceId = deviceArr[0] ? deviceArr[0].deviceId : null;
	                    if (type === 'report') _this9.onGetRecentDateList();
	                    return;
	                }
	            }
	            if (type === 'report') _this9.onGetRecentDateList();
	        }, function (data) {
	            if (type === 'report') _this9.onGetRecentDateList();
	        });
	    },
	    onSelectDevice: function onSelectDevice(value) {
	        FlagData.initReportChart = false;
	        FlagData.initHeartChart = false;
	        deviceId = value;
	        location.hash = "";
	    }
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
					value: true
	});
	var DrawChart = {};

	/*工具函数*/
	var tools = {
					label: function label(index) {
									switch (index) {
													case 1:
																	return 3;
																	break;
													case 2:
																	return 2;
																	break;
													case 3:
																	return 1.5;
																	break;
													case 4:
																	return 0.5;
																	break;
													case 5:
																	return 3;
																	break;
													case 6:
																	return 3;
																	break;
													case 7:
																	return 3;
																	break;
													case 8:
																	return 3;
																	break;
													case 9:
																	return 3;
																	break;
													case "-":
																	return "-";
																	break;
									}
					},
					pickerColor: function pickerColor(arr) {
									var color = [{
													offset: 1,
													color: '#30d2ba' // 0% 处的颜色
									}];
									for (var i = 0; i < arr.length; i++) {
													if (arr[i] == 2 || arr[i] == 3) {
																	color = [{
																					offset: 0,
																					color: '#30d2ba' // 0% 处的颜色
																	}, {
																					offset: 1,
																					color: '#6175fc' // 0% 处的颜色
																	}];
													}
									}
									for (var _i = 0; _i < arr.length; _i++) {
													if (arr[_i] == 4) {
																	color = [{
																					offset: 0,
																					color: '#30d2ba' // 0% 处的颜色
																	}, {
																					offset: 0.6,
																					color: '#6175fc' // 0% 处的颜色
																	}, {
																					offset: 1,
																					color: '#cf3cfc' // 100% 处的颜色
																	}];
													}
									};
									return color;
					},
					toHours: function toHours(time) {
									var h = new Date(time).getHours();
									if (h > 12) h = h - 12;
									h = h < 10 ? "0" + h : h;
									var m = new Date(time).getMinutes();
									m = m < 10 ? "0" + m : m;
									return h + ":" + m;
					},
					sleepHours: function sleepHours(time) {
									var h = parseInt(time / 60);
									var m = parseInt(time % 60);
									return h + "小时" + m + "分";
					},
					formatDateTime: function formatDateTime(date) {
									var y = date.getFullYear();
									var m = date.getMonth() + 1;
									m = m < 10 ? '0' + m : m;
									var d = date.getDate();
									d = d < 10 ? '0' + d : d;
									var index = date.getDay();
									return y + '-' + m + '-' + d + ' ' + tools.getweek(index);
					},
					getweek: function getweek(index) {
									switch (index) {
													case 0:
																	return "星期天";
																	break;
													case 1:
																	return "星期一";
																	break;
													case 2:
																	return "星期二";
																	break;
													case 3:
																	return "星期三";
																	break;
													case 4:
																	return "星期四";
																	break;
													case 5:
																	return "星期五";
																	break;
													case 6:
																	return "星期六";
																	break;
									}
					},
					toHoursString: function toHoursString(time) {
									var h = parseInt(time / 3600000);
									h = h < 10 ? "0" + h : h;
									var m = parseInt(time % 3600000 / 60000);
									m = m < 10 ? "0" + m : m;
									return h + "小时" + m + "分";
					},
					changeData: function changeData(data) {
									var _this = undefined,
									    tempData = [];
									for (var i in data) {
													if (Number(data[i].value) >= 0 && data[i].value != null) {
																	tempData.push([Number(data[i].value)]);
													} else if (Number(data[i].key) && data[i].key != null) {
																	tempData.push(Number(data[i].key));
													} else {
																	//睡眠状态（1-上床，2-入睡，3-浅睡，4-深睡，5-觉醒，6-懒床，7-起床，8-再次上床，9-中途起床)
																	switch (Number(data[i].status)) {
																					case 1:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																									break;
																					case 2:
																									tempData.push({
																													y: 2,
																													time: data[i].startTime
																									});
																									break;
																					case 3:
																									tempData.push({
																													y: 1.5,
																													time: data[i].startTime
																									});
																									break;
																					case 4:
																									tempData.push({
																													y: 0.5,
																													time: data[i].startTime
																									});
																									break;
																					case 5:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																									break;
																					case 6:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																									break;
																					case 7:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																									break;
																					case 8:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																									break;
																					default:
																									tempData.push({
																													y: 3,
																													time: data[i].startTime
																									});
																	};
													}
									}
									return tempData;
					}
	};

	/*睡眠报告报表曲线函数*/
	var reportSleepCommon = function reportSleepCommon(data, callBack) {
					var color = [{ color: '#30d2ba' }];
					var sleepState = [];
					data.sleepStatusList.map(function (items, index) {
									sleepState.push(items.status);
					});
					var arr = tools.changeData(data.sleepStatusList);
					var arrData = [];
					sleepState.map(function (item) {
									arrData.push(tools.label(item));
					});
					var arrTime = [];
					var arrTimeString = [];
					arr.map(function (items, index) {
									var timeStr = items.time.split(" ");
									var timeSt = items.time;
									var utcTime = new Date(timeSt.replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000;
									arrTime.push(utcTime);
									arrTimeString.push(timeSt);
					});
					var n = 1;
					sleepState.map(function (item, index) {
									if (sleepState[index] == 7 && sleepState[index + 1] == 1) {
													sleepState.splice(index + n, 0, "-");
													arrTime.splice(index + n, 0, "");
													n++;
									}
					});
					arrData = sleepState.map(function (item, index) {
									return tools.label(item);
					});
					//处理颜色的变化
					tools.pickerColor(sleepState);
					//处理时间数据
					var arrTimeStr = data.sleepScope.split("~");
					var startTime = new Date(arrTimeStr[0].replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000;
					var endTime = new Date(arrTimeStr[1].replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000;
					//时段
					var sleepScopeTime = tools.toHours(startTime) + " " + toString(startTime) + "-" + tools.toHours(endTime) + " " + toString(endTime);
					//深睡、浅睡、清醒
					var lightSleepDuration = tools.sleepHours(data.wakeDuration);
					var fallSleepDuration = tools.sleepHours(data.lightSleepDuration);
					var deepSleepDuration = tools.sleepHours(data.deepSleepDuration);
					//时长
					var timeCount = parseInt(data.deepSleepDuration) + parseInt(data.lightSleepDuration);
					var count = tools.toHoursString(timeCount * 60 * 1000);
					//处理数据的时间
					var timeStr = tools.formatDateTime(new Date(data.dataTime));
					callBack(arrTime, arrData, sleepState, true, tools.pickerColor(sleepState));
	};
	var reportSleepDOM = void 0,
	    reportSleepChart = void 0;
	DrawChart.initReportChart = function (data) {
					var Chart = function Chart(x, y, state, data, color) {
									var dataArr = [];
									x.map(function (item, index) {
													if (item == "") {
																	x[index] = (x[index - 1] + x[index + 1]) / 2;
													}
									});
									var minDate = new Date(x[0]);
									var minString = minDate.getMinutes();
									var count = minString < 10 ? minString : minString - parseInt(minString.toString()[0] + "0");
									window.min = x[0] - count * 60 * 1000;
									var maxDate = new Date(x[x.length - 1]);
									var maxString = maxDate.getMinutes();
									var countMax = minString > 50 ? 60 - maxString : maxString < 10 ? 10 - maxString : parseInt(maxString.toString()[0] + "0") + 10 - maxString;
									window.max = x[x.length - 1] + countMax * 60 * 1000;
									window.interval = (max - min) / 5;
									y.map(function (item, index) {
													var list = [x[index], item];
													dataArr.push(list);
									});
									reportSleepDOM = document.getElementById("reportSleepChart");
									reportSleepChart = echarts.init(reportSleepDOM);
									var option = null;
									option = {
													animation: true,
													xAxis: {
																	type: 'time',
																	min: window.min,
																	max: window.max,
																	splitNumber: 5,
																	interval: window.interval,
																	splitLine: {
																					show: false
																	},
																	axisTick: {
																					show: true,
																					alignWithLabel: true,
																					inside: true,
																					lineStyle: {
																									color: '#3f316c'
																					},
																					interval: 1
																	},
																	axisLine: {
																					show: true,
																					onZero: true,
																					lineStyle: {
																									color: '#3f316c'
																					}
																	},
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var time = new Date(value);
																									var timeStr = (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
																									return timeStr;
																					},
																					textStyle: {
																									fontSize: '12px',
																									color: '#716790'
																					}

																	}
													},
													yAxis: {
																	type: 'value',
																	max: 4,
																	splitNumber: '4',
																	name: "睡眠曲线",
																	nameTextStyle: {
																					color: "#fff",
																					fontSize: "16"
																	},
																	nameGap: 30,
																	boundaryGap: [0, '20%'],
																	axisTick: {
																					show: false,
																					alignWithLabel: false,
																					inside: true,
																					interval: 5
																	},
																	splitLine: {
																					show: true,
																					interval: true,
																					lineStyle: {
																									color: '#3f316c'
																					}

																	},
																	axisLine: {
																					show: true,
																					lineStyle: {
																									color: '#3f316c'
																					}
																	},
																	data: [0, 20, 30, 40],
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var texts = [];
																									if (index === 0) {
																													texts = '';
																									} else if (index === 1) {
																													texts = '深睡';
																									} else if (index === 2) {
																													texts = '浅睡';
																									} else if (index === 3) {
																													texts = '清醒';
																									}
																									return texts;
																					},
																					textStyle: {
																									fontSize: '12',
																									color: function color(val) {
																													var color = '#30d2b9';
																													if (val == 1) color = "#d03bfb";
																													if (val == 2) color = "#6275ff";
																													return color;
																									}
																					}
																	}
													},
													series: {
																	show: false,
																	name: ['清醒'],
																	symbol: "none",
																	type: 'line',
																	smooth: true,
																	data: dataArr,
																	lineStyle: {
																					normal: {
																									width: '3',
																									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, color, false),
																									smoothMonotone: 'y'
																					}
																	},
																	lable: {
																					show: true
																	}
													}
									};
									reportSleepChart.setOption(option);
					};
					reportSleepCommon(data, Chart);
	};

	DrawChart.updateReportChart = function (data) {
					var update = function update(x, y, state, data, color) {
									var dataArr = [];
									x.map(function (item, index) {
													if (item == "") {
																	x[index] = (x[index - 1] + x[index + 1]) / 2;
													}
									});
									var minDate = new Date(x[0]);
									var minString = minDate.getMinutes();
									var count = minString < 10 ? minString : minString - parseInt(minString.toString()[0] + "0");
									window.min = x[0] - count * 60 * 1000;
									var maxDate = new Date(x[x.length - 1]);
									var maxString = maxDate.getMinutes();
									var countMax = minString > 50 ? 60 - maxString : maxString < 10 ? 10 - maxString : parseInt(maxString.toString()[0] + "0") + 10 - maxString;
									window.max = x[x.length - 1] + countMax * 60 * 1000;
									window.interval = (max - min) / 5;
									y.map(function (item, index) {
													var list = [x[index], item];
													dataArr.push(list);
									});
									var option = {
													xAxis: {
																	min: window.min,
																	max: window.max,
																	interval: window.interval,
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var time = new Date(value);
																									var timeStr = (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
																									return timeStr;
																					}
																	}
													},
													series: {
																	data: dataArr,
																	lineStyle: {
																					normal: {
																									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, color, false)
																					}
																	}
													}
									};
									reportSleepChart.setOption(option);
					};
					reportSleepCommon(data, update);
	};

	/*睡眠报告心率呼吸率体动报表曲线函数*/
	var heartChartCommon = function heartChartCommon(data, callBack) {
					//心跳
					var heartData = data.heartRateList;
					var breathData = data.breathRateList;
					var turnOverData = data.turnOverList;
					//正常范围
					var heartReferRange = data.heartRateAnalysis ? data.heartRateAnalysis.referRange : "--";
					var breathReferRange = data.breathRateAnalysis ? data.breathRateAnalysis.referRange : "--";
					//平均值
					var heartAllAverage = data.heartRateAnalysis ? data.heartRateAnalysis.statisticalData : "--";
					var breathAllAverage = data.breathRateAnalysis ? data.breathRateAnalysis.statisticalData : "--";
					var trunOverAllAverage = data.turnOverAnalysis ? data.turnOverAnalysis.statisticalData : "--";
					//截取x轴坐标
					var heartXTime = []; //用来比较时间
					var heartX = heartData.map(function (items, index) {
									var time = items.key;
									var timeString = new Date(time.replace(/-/g, "/")).getTime() + 8 * 60 * 60 * 1000;
									heartXTime.push(timeString);
									return timeString;
					});
					//这是y轴坐标
					var heartY = heartData.map(function (items, index) {
									return items.value;
					});
					var heartYMin = heartData.map(function (items, index) {
									return items.value;
					});
					var breathY = breathData.map(function (items, index) {
									return items.value;
					});
					var breathYMin = breathData.map(function (items, index) {
									return items.value;
					});
					var trunOverY = turnOverData.map(function (items, index) {
									return items.value;
					});
					//这是处理xy轴数据时差大于15min时断点显示
					var k = 1;
					var m = 1;
					for (var i = 0; i < heartXTime.length; i++) {
									//处理大于15min断点蛋都碎了
									if (parseInt(heartXTime[i + 1] - heartXTime[i]) > 15 * 60 * 1000) {
													heartYMin.splice(i + m, 0, "-");
													breathYMin.splice(i + m, 0, "-");
													heartY.splice(i + k, 0, "0");
													heartY.splice(i + k + 1, 0, "-");
													heartY.splice(i + k + 2, 0, "0");
													breathY.splice(i + k, 0, "0");
													breathY.splice(i + k + 1, 0, "-");
													breathY.splice(i + k + 2, 0, "0");
													trunOverY.splice(i + k, 0, "0");
													trunOverY.splice(i + k + 1, 0, "-");
													trunOverY.splice(i + k + 2, 0, "0");
													heartX.splice(i + m, 0, "-");
													k = k + 3;
													m = m + 1;
									}
					}
					//这是取得x的index数组
					var heartXX = [];
					for (var _i2 = 0; _i2 < heartX.length; _i2++) {
									heartXX[_i2] = heartX[_i2];
					}
					//这是为了获得x轴下标数组
					var j = 0;
					for (var _i3 = 0; _i3 < heartX.length; _i3++) {
									if (heartX[_i3] == "-") {
													heartXX.splice(_i3 + j, 0, heartX[_i3 - 1]);
													heartXX.splice(_i3 + j + 2, 0, heartX[_i3 + 1]);
													j = j + 2;
									}
					}
					//这是要获得心跳的数据二维数组
					var heartXY = [];
					for (var _i4 = 0; _i4 < heartY.length; _i4++) {
									heartXY[_i4] = [heartXX[_i4], heartY[_i4]];
					}
					var breathXY = [];
					for (var _i5 = 0; _i5 < heartY.length; _i5++) {
									breathXY[_i5] = [heartXX[_i5], breathY[_i5]];
					}
					var trunOverXY = [];
					for (var _i6 = 0; _i6 < heartY.length; _i6++) {
									trunOverXY[_i6] = [heartXX[_i6], trunOverY[_i6]];
					}
					//找出二维数组的y最小 并获得心跳的最小值
					var heartMinString = "" + Math.min.apply(null, heartY);
					var heartMinIndex = heartX[heartYMin.indexOf(heartMinString)];
					var heartMin = [heartMinIndex, heartMinString];
					var isHeartMin = heartData.map(function (items, index) {
									return items.value;
					});
					isHeartMin.map(function (item, index) {
									if (item == 0) {
													heartMin = [];
									}
					});
					var breathMinString = "" + Math.min.apply(null, breathY);
					var breathMinIndex = heartX[breathYMin.indexOf(breathMinString)];
					var breathMin = [breathMinIndex, breathMinString];
					var isBreathMin = breathData.map(function (items, index) {
									return items.value;
					});
					isBreathMin.map(function (item, index) {
									if (item == 0) {
													breathMin = [];
									}
					});

					var mark = function mark(arr) {
									return [{ type: 'max', name: '最大值' }, { coord: arr }];
					};
					if (data.heartRateList.length <= 0) {
									callBack(reportHeartChart, ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"], [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300], 200, "心率", ["50", "100", "150"], mark([100, 100]));
									callBack(reportBreathingChart, ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"], [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300], 40, "呼吸率", ["10", "20", "30"], mark([100, 100]));
									callBack(reportOverChart, ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00"], [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300], 70, "体动", ["20", "40", "60"], mark([100, 100]));
					} else {
									callBack(reportHeartChart, heartX, heartXY, 200, "心率", ["50", "100", "150"], mark(heartMin));
									callBack(reportBreathingChart, heartX, breathXY, 40, "呼吸率", ["10", "20", "30"], mark(breathMin));
									callBack(reportOverChart, heartX, trunOverXY, 40, "体动", ["10", "20", "30"], []);
					}
	};
	var reportHeartDOM = void 0,
	    reportHeartChart = void 0,
	    reportBreathingDOM = void 0,
	    reportBreathingChart = void 0,
	    reportOverDOM = void 0,
	    reportOverChart = void 0;
	DrawChart.initHeartChart = function (data) {
					reportHeartDOM = document.getElementById("reportHeartChart");
					reportHeartChart = echarts.init(reportHeartDOM);
					reportBreathingDOM = document.getElementById("reportBreathingChart");
					reportBreathingChart = echarts.init(reportBreathingDOM);
					reportOverDOM = document.getElementById("reportOverChart");
					reportOverChart = echarts.init(reportOverDOM);
					function Chart(id, X, Y, max, title, lable, mark) {
									var option1 = null;
									Y.map(function (item, index) {
													if (item[0] == "-") {
																	Y[index][0] = (Y[index - 1][0] + Y[index + 1][0]) / 2;
													}
									});
									option1 = {
													animation: true,
													tooltip: {},
													legend: {},
													dataZoom: {
																	show: false,
																	start: 0,
																	end: 100
													},
													calculable: true,
													xAxis: {
																	type: "time",
																	min: window.min,
																	max: window.max,
																	splitNumber: 5,
																	interval: window.interval,
																	splitLine: {
																					show: false
																	},
																	axisTick: {
																					show: true,
																					alignWithLabel: true,
																					inside: true,
																					lineStyle: {
																									color: '#3f316c'
																					},
																					interval: 0
																	},
																	axisLine: {
																					show: true,
																					onZero: false,
																					lineStyle: {
																									color: '#3f316c'
																					}
																	},
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var time = new Date(value);
																									var timeStr = (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
																									return timeStr;
																					},
																					textStyle: {
																									fontSize: '12px',
																									color: '#716790'
																					}
																	}
													},
													yAxis: {
																	type: 'value',
																	name: title,
																	nameTextStyle: {
																					color: '#fff',
																					fontSize: '16'
																	},
																	nameGap: 30,
																	max: max,
																	splitNumber: 4,
																	boundaryGap: [0, '20%'],
																	axisTick: {
																					show: false,
																					alignWithLabel: false,
																					inside: true,
																					interval: 0
																	},
																	splitLine: {
																					show: true,
																					interval: 3,
																					lineStyle: {
																									color: '#3e316b'
																					}
																	},
																	axisLine: {
																					show: true,
																					lineStyle: {
																									color: '#3e316b',
																									fontSize: '12'
																					}
																	},
																	data: [0, 50, 100, 150],
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var texts = [];
																									if (index === 0) {
																													texts = '';
																									} else if (index === 1) {
																													texts = lable[0];
																									} else if (index === 2) {
																													texts = lable[1];
																									} else if (index === 3) {
																													texts = lable[2];
																									} else {
																													texts = '';
																									}
																									return texts;
																					},
																					textStyle: {
																									fontSize: '12',
																									color: '#716790'
																					}
																	}
													},
													series: {
																	name: ['清醒'],
																	symbol: "none",
																	type: 'line',
																	data: Y,
																	lineStyle: {
																					normal: {
																									width: '2',
																									color: '#41f0bc'
																					}
																	},
																	lable: {
																					show: true
																	},
																	markPoint: {
																					data: mark,
																					symbol: "circle",
																					symbolRotate: -30,
																					symbolSize: [7, 7],
																					symbolOffset: [0, 0],
																					label: {
																									normal: {
																													show: true,
																													offset: [0, -15],
																													formatter: function formatter(obj) {
																																	if (obj.value) {
																																					return obj.value;
																																	} else {
																																					return obj.data.coord[1];
																																	}
																													},
																													textStyle: {
																																	color: "#e95d5d",
																																	fontSize: "20px"
																													}
																									},
																									itemStyle: {
																													normal: {
																																	color: "#e95d5d"
																													}
																									}
																					}
																	}
													}
									};
									id.setOption(option1);
					}
					heartChartCommon(data, Chart);
	};

	DrawChart.updateHeartChart = function (data) {
					var update = function update(id, X, Y, max, title, lable, mark) {
									var option1 = null;
									Y.map(function (item, index) {
													if (item[0] == "-") {
																	Y[index][0] = (Y[index - 1][0] + Y[index + 1][0]) / 2;
													}
									});
									option1 = {
													xAxis: {
																	min: window.min,
																	max: window.max,
																	interval: window.interval,
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var time = new Date(value);
																									var timeStr = (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" + (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
																									return timeStr;
																					}
																	}
													},
													yAxis: {
																	name: title,
																	max: max,
																	axisLabel: {
																					formatter: function formatter(value, index) {
																									var texts = [];
																									if (index === 0) {
																													texts = '';
																									} else if (index === 1) {
																													texts = lable[0];
																									} else if (index === 2) {
																													texts = lable[1];
																									} else if (index === 3) {
																													texts = lable[2];
																									} else {
																													texts = '';
																									}
																									return texts;
																					}
																	}
													},
													series: {
																	data: Y,
																	markPoint: {
																					data: mark,
																					label: {
																									normal: {
																													show: true,
																													formatter: function formatter(obj) {
																																	if (obj.value) {
																																					return obj.value;
																																	} else {
																																					return obj.data.coord[1];
																																	}
																													}
																									}
																					}
																	}
													}
									};
									id.setOption(option1);
					};
					heartChartCommon(data, update);
	};
	exports.DrawChart = DrawChart;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SleepReport = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _HeaderTab = __webpack_require__(96);

	var _leftTab = __webpack_require__(97);

	var _ReportDetail = __webpack_require__(98);

	var _chartsTab = __webpack_require__(99);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var SleepReport = exports.SleepReport = function (_BaseComponent) {
	    (0, _inherits3.default)(SleepReport, _BaseComponent);

	    function SleepReport(props) {
	        (0, _classCallCheck3.default)(this, SleepReport);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (SleepReport.__proto__ || (0, _getPrototypeOf2.default)(SleepReport)).call(this, props));

	        var date = _this.formatDateTime(new Date());
	        _this.state = {
	            propHash: "report",
	            reportDateList: [{ dataTime: date + "", sleepQuality: "暂无数据" }]
	        };
	        _this.keyDownEvent = _this.keyDownEvent.bind(_this);
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.hashFlag = "report";
	        return _this;
	    }

	    (0, _createClass3.default)(SleepReport, [{
	        key: 'formatDateTime',
	        value: function formatDateTime(date) {
	            var y = date.getFullYear();
	            var m = date.getMonth() + 1;
	            m = m < 10 ? '0' + m : m;
	            var d = date.getDate();
	            d = d < 10 ? '0' + d : d;
	            return y + '-' + m + '-' + d;
	        }
	    }, {
	        key: 'keyDownEvent',
	        value: function keyDownEvent(e) {
	            if (e.keyCode == 38 || e.keyCode == 40) {
	                this.isHeader = false;
	            } else if (e.keyCode == 37) {
	                if (this.state.propHash == 'out') return;
	                if (this.state.propHash == 'report') {
	                    this.setState({
	                        propHash: "out"
	                    });
	                } else if (this.state.propHash == 'time') {
	                    this.setState({
	                        propHash: "report"
	                    });
	                }
	                this.isHeader = true;
	            } else if (e.keyCode == 39) {
	                if (this.state.propHash == 'time') return;
	                if (this.state.propHash == 'report') {
	                    this.setState({
	                        propHash: "time"
	                    });
	                } else if (this.state.propHash == 'out') {
	                    this.setState({
	                        propHash: "report"
	                    });
	                }
	                this.isHeader = true;
	            } else if (e.keyCode == 13 && this.isHeader && this.hashFlag.indexOf(this.state.propHash) == -1) {
	                if (this.state.propHash == "time") {
	                    location.hash = "time";
	                } else if (this.state.propHash == "out") {
	                    localStorage.clear();
	                    location.hash = "login";
	                }
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('keydown', this.keyDownEvent);
	            // Actions.getRecentDateList();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.confirmLogin('report');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var reportDateList = this.state.reportDateList;
	            return React.createElement(
	                'div',
	                { className: 'bg-img' },
	                React.createElement(_HeaderTab.HeaderTab, { hash: this.state.propHash }),
	                !reportDateList || reportDateList.length === 0 ? React.createElement(
	                    'section',
	                    { className: 'noData' },
	                    '\u6682\u65E0\u6570\u636E',
	                    React.createElement(
	                        'label',
	                        null,
	                        '\u8BBE\u5907\u672A\u4F7F\u7528\u6216\u6570\u636E\u4E0D\u80FD\u6EE1\u8DB3\u751F\u6210\u62A5\u544A\uFF01'
	                    )
	                ) : React.createElement(
	                    'section',
	                    { className: 'reportMain' },
	                    React.createElement(_leftTab.LeftTab, { dateList: reportDateList }),
	                    React.createElement(_ReportDetail.ReportDetail, { heartRate: this.state.heartRate, respirationRate: this.state.respirationRate,
	                        bodyMovement: this.state.bodyMovement, sleepQuality: this.state.sleepQuality,
	                        sleepType: this.state.sleepType, analysisDetail: this.state.analysisDetail,
	                        sleepRank: this.state.sleepRank, fallTime: this.state.fallSleepDuration,
	                        shallowTime: this.state.lightSleepDuration, deepTime: this.state.deepSleepDuration }),
	                    React.createElement(_chartsTab.ChartsTab, { sleepScope: this.state.sleepScope, sleepCount: this.state.asleepDuration,
	                        heartRate: this.state.heartRate, respirationRate: this.state.respirationRate,
	                        bodyMovement: this.state.bodyMovement, reportLoaded: this.state.reportChartGet,
	                        threeLoaded: this.state.threeChartGet })
	                )
	            );
	        }
	    }]);
	    return SleepReport;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeaderTab = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var HeaderTab = exports.HeaderTab = function (_BaseComponent) {
	    (0, _inherits3.default)(HeaderTab, _BaseComponent);

	    function HeaderTab(props) {
	        (0, _classCallCheck3.default)(this, HeaderTab);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderTab.__proto__ || (0, _getPrototypeOf2.default)(HeaderTab)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(HeaderTab, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getWeather();
	            _Actions.Actions.getUserInfo();
	        }
	    }, {
	        key: 'changeHash',
	        value: function changeHash(e) {
	            var hash = e.target.getAttribute("data-hash");
	            if (hash === this.props.hash) return;
	            location.hash = hash;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            if (prevState.userName !== this.state.userName) {
	                var dom = ReactDOM.findDOMNode(this.refs.userName);
	                if (dom.offsetWidth >= 134) {
	                    dom.classList.add('running');
	                } else {
	                    dom.classList.remove('running');
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var hash = this.props.hash;
	            var temp1 = this.state.temp1 === undefined ? "-" : this.state.temp1;
	            var temp2 = this.state.temp2 === undefined ? "-" : this.state.temp2;
	            var tempRange = temp1 + "-" + temp2 + "℃";
	            var wtext = this.state.wtext || "-";
	            var imgUrl = this.state.wtext ? "../static/img/" + wtext + ".png" : "";
	            if (this.state.wtext == '雨') imgUrl = "../static/img/大雨.png";
	            return React.createElement(
	                'div',
	                { className: 'headerTab' },
	                this.state.avatar ? React.createElement('img', { className: 'userIcon', src: this.state.avatar }) : React.createElement('img', { className: 'userIcon' }),
	                React.createElement(
	                    'section',
	                    { className: 'userName' },
	                    React.createElement(
	                        'section',
	                        { className: 'name', ref: 'userName' },
	                        this.state.userName
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: "loginOut " + (hash === "out" ? "active" : "") },
	                        '\u9000\u51FA\u767B\u5F55'
	                    )
	                ),
	                React.createElement(
	                    'label',
	                    { className: "tab " + (hash === "report" ? "active" : ""),
	                        'data-hash': '',
	                        onClick: this.changeHash.bind(this) },
	                    '\u7761\u7720\u62A5\u544A'
	                ),
	                React.createElement(
	                    'label',
	                    { className: "tab " + (hash === "time" ? "active" : ""),
	                        'data-hash': 'time',
	                        onClick: this.changeHash.bind(this) },
	                    '\u5B9E\u65F6\u6570\u636E'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'weather' },
	                    React.createElement(
	                        'li',
	                        { className: 'cityName' },
	                        this.state.cityName || "深圳"
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'weatherIcon' },
	                        React.createElement('img', { src: imgUrl })
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'twoFloor' },
	                        React.createElement(
	                            'span',
	                            { className: 'upText' },
	                            wtext
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'downText' },
	                            tempRange || "-/-℃"
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'twoFloor' },
	                        React.createElement(
	                            'span',
	                            { className: 'upText' },
	                            this.state.pm25 || "--"
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'downText' },
	                            'PM2.5'
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return HeaderTab;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LeftTab = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var LeftTab = exports.LeftTab = function (_BaseComponent) {
	    (0, _inherits3.default)(LeftTab, _BaseComponent);

	    function LeftTab(props) {
	        (0, _classCallCheck3.default)(this, LeftTab);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (LeftTab.__proto__ || (0, _getPrototypeOf2.default)(LeftTab)).call(this, props));

	        _this.state = {
	            activeIndex: 0,
	            selectIndex: 0
	        };
	        _this.keyDownEvent = _this.keyDownEvent.bind(_this);
	        var date = _this.formatDateTime(new Date());
	        _this.items = [{ dataTime: date + "", sleepQuality: "暂无数据" }];
	        return _this;
	    }

	    (0, _createClass3.default)(LeftTab, [{
	        key: 'keyDownEvent',
	        value: function keyDownEvent(e) {
	            if (!this.props.dateList || this.props.dateList.length == 0) return;
	            if (e.keyCode == 37 || e.keyCode == 39) {
	                this.isLeft = false;
	            } else if (e.keyCode == 38 && this.state.selectIndex >= 1) {
	                var value = this.state.selectIndex - 1;
	                this.setState({
	                    selectIndex: value
	                });
	                this.isLeft = true;
	            } else if (e.keyCode == 40 && this.state.selectIndex < this.props.dateList.length - 1) {
	                var _value = Number(this.state.selectIndex) + 1;
	                this.setState({
	                    selectIndex: _value
	                });
	                this.isLeft = true;
	            } else if (e.keyCode == 13 && this.isLeft) {
	                if (this.state.selectIndex == this.state.activeIndex) return;
	                var date = this.props.dateList[this.state.selectIndex].dataTime;
	                this.setState({
	                    activeIndex: this.state.selectIndex
	                });
	                _Actions.Actions.getDayReportData(date);
	                this.isLeft = false;
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'formatDateTime',
	        value: function formatDateTime(date) {
	            var y = date.getFullYear();
	            var m = date.getMonth() + 1;
	            m = m < 10 ? '0' + m : m;
	            var d = date.getDate();
	            d = d < 10 ? '0' + d : d;
	            return y + '-' + m + '-' + d;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var items = this.props.dateList || this.items;
	            if (items.length > 10) items = items.slice(0, 10);
	            var activeIndex = this.state.activeIndex || 0;
	            var selectIndex = this.state.selectIndex || 0;
	            return React.createElement(
	                'ul',
	                { className: 'leftTab scale' },
	                items.map(function (item, index) {
	                    var time = void 0;
	                    if (item.dataTime) {
	                        var arr = item.dataTime.split('-');
	                        time = arr[1] + "-" + arr[2];
	                    }
	                    var defaultClass = index == _this2.state.selectIndex && selectIndex != activeIndex ? "dateSelect selected " : "dateSelect ";
	                    return React.createElement(
	                        'li',
	                        { key: index, className: defaultClass + (index == activeIndex ? "active" : ""),
	                            'data-index': index, 'data-time': item.dataTime },
	                        React.createElement(
	                            'span',
	                            { className: 'sleepDate' },
	                            time
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'sleepStatus' },
	                            item.sleepQuality
	                        )
	                    );
	                })
	            );
	        }
	    }]);
	    return LeftTab;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ReportDetail = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var ReportDetail = exports.ReportDetail = function (_BaseComponent) {
	    (0, _inherits3.default)(ReportDetail, _BaseComponent);

	    function ReportDetail(props) {
	        (0, _classCallCheck3.default)(this, ReportDetail);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (ReportDetail.__proto__ || (0, _getPrototypeOf2.default)(ReportDetail)).call(this, props));

	        _this.state = {};
	        _this.componentDidMount = _this.componentDidMount.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(ReportDetail, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var theCanvas = ReactDOM.findDOMNode(this.refs.radialGradient);
	            this.ctx = theCanvas.getContext("2d");
	            var bgCanvas = ReactDOM.findDOMNode(this.refs.radialBg);
	            this.bgctx = bgCanvas.getContext("2d");
	            //初始化背景圆弧
	            this.drawCicrle(this.bgctx, 135, 405, "#281e49", 35);
	            //初始化圆弧
	            this.initCicrle(this.props.fallTime, this.props.shallowTime, this.props.deepTime);
	        }
	    }, {
	        key: 'clacLoction',
	        value: function clacLoction(angle) {
	            //圆弧半径及圆心坐标
	            var radius = 166;
	            var originX = 300;
	            var originY = 220;
	            var PI = Math.PI;
	            var obj = {
	                x: originX - radius * Math.sin(angle * PI / 180),
	                y: originY + radius * Math.cos(angle * PI / 180)
	            };
	            return obj;
	        }
	    }, {
	        key: 'initCicrle',
	        value: function initCicrle() {
	            var fall = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	            var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
	            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

	            //清除以前绘制的
	            this.ctx.clearRect(0, 0, 1000, 1000);
	            var sum = Math.ceil(fall) + Math.ceil(shallow) + Math.ceil(deep);
	            //计算分段端点角度及端点坐标
	            var fallAngle = 45 + Math.floor(fall * 270 / sum);
	            var fallLocation = this.clacLoction(fallAngle);
	            var fallX = fallLocation.x;
	            var fallY = fallLocation.y;
	            var shallowAngle = fallAngle + Math.floor(shallow * 270 / sum);
	            var shallowLocation = this.clacLoction(shallowAngle);
	            var shallowX = shallowLocation.x;
	            var shallowY = shallowLocation.y;
	            //添加分段颜色渐变
	            var grd = this.ctx.createLinearGradient(84.5, 284.5, fallX, fallY);
	            grd.addColorStop(0, "#30d2b9");
	            grd.addColorStop(1, "#3e55ff");
	            var grd2 = this.ctx.createLinearGradient(fallX, fallY, shallowX, shallowY);
	            grd2.addColorStop(0, "#3e55ff");
	            grd2.addColorStop(1, "#3e55ff");
	            var grd3 = this.ctx.createLinearGradient(shallowX, shallowY, 303.5, 284.5);
	            grd3.addColorStop(0, "#3e55ff");
	            grd3.addColorStop(1, "#c52ff0");
	            //设置背景透明
	            this.ctx.beginPath();
	            this.ctx.strokeStyle = "transparent";
	            this.ctx.fillStyle = "transparent";
	            this.ctx.lineWidth = 0.1;
	            this.ctx.lineCap = 'round';
	            this.ctx.arc(300, 220, 165, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
	            this.ctx.closePath();
	            this.ctx.stroke();
	            this.ctx.fill();
	            this.ctx.closePath();
	            //分段画圆弧
	            this.drawCicrle(this.ctx, 135, fallAngle + 90, grd);
	            this.drawCicrle(this.ctx, fallAngle + 90, shallowAngle + 90, grd2);
	            this.drawCicrle(this.ctx, shallowAngle + 90, 405, grd3);
	            //画标线
	            var line1Loction = this.clacLoction(45 + Math.floor(fall * 270 / sum) / 2);
	            var line2Loction = this.clacLoction(fallAngle + Math.floor(shallow * 270 / sum) / 2);
	            var line3Loction = this.clacLoction(shallowAngle + Math.floor(deep * 270 / sum) / 2);
	            this.drawLine(this.ctx, line1Loction.x, line1Loction.y, 45 + Math.floor(fall * 270 / sum) / 2, "#30d2b9", fall);
	            this.drawLine(this.ctx, line2Loction.x, line2Loction.y, fallAngle + Math.floor(shallow * 270 / sum) / 2, "#6275ff", shallow);
	            this.drawLine(this.ctx, line3Loction.x, line3Loction.y, shallowAngle + Math.floor(deep * 270 / sum) / 2, "#d03bfb", deep);
	        }
	    }, {
	        key: 'drawCicrle',
	        value: function drawCicrle(ctx, startAngle, endAngle, linerStyle) {
	            var lineWidth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;

	            ctx.beginPath();
	            ctx.arc(300, 220, 155, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, false); //这里的圆心坐标要和cirle的保持一致
	            ctx.lineWidth = lineWidth;
	            ctx.strokeStyle = linerStyle;
	            ctx.lineCap = "round";
	            ctx.stroke();
	            ctx.closePath();
	        }
	    }, {
	        key: 'drawLine',
	        value: function drawLine(ctx, x, y, angle, color, value) {
	            if (value == 0) return;
	            //根据角度设置方向便宜
	            var offsetX = void 0,
	                //X轴偏转
	            offsetY = void 0,
	                //Y轴偏转
	            textX = void 0,
	                //文字X位置
	            textY = void 0; //文字Y位置
	            ctx.font = "normal 20px sans-serif";
	            if (angle < 135) {
	                offsetX = -20;
	                offsetY = 20;
	                textX = x + 6 * offsetX;
	                textY = y + offsetY - offsetY / 4;
	            } else if (angle < 180) {
	                offsetX = -20;
	                offsetY = -20;
	                textX = x + 6 * offsetX;
	                textY = y + offsetY + offsetY / 4;
	            } else if (angle < 225) {
	                offsetX = 20;
	                offsetY = -20;
	                textX = x + offsetX;
	                textY = y + offsetY + offsetY / 4;
	            } else {
	                offsetX = 20;
	                offsetY = 20;
	                textX = x + offsetX;
	                textY = y + offsetY - offsetY / 4;
	            }
	            //开始一个新的绘制路径
	            ctx.beginPath();
	            ctx.lineWidth = 1;
	            //设置线条颜色为蓝色
	            ctx.strokeStyle = color;
	            //设置路径起点坐标
	            ctx.moveTo(x, y);
	            //定义中间点坐标1
	            ctx.lineTo(x + offsetX, y + offsetY);
	            //定义中间点坐标2
	            ctx.lineTo(x + 6 * offsetX, y + offsetY);
	            //按照绘制路径顺序连接各个坐标点
	            ctx.stroke();
	            //关闭绘制路径
	            ctx.closePath();
	            //添加文字
	            ctx.fillStyle = color;
	            ctx.strokeText(this.transTime(value), textX, textY);
	            ctx.fillText(this.transTime(value), textX, textY);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            //在时间有变化时更新圆环
	            if (nextProps.fallTime !== this.props.fallTime || nextProps.shallowTime !== this.props.shallowTime || nextProps.deepTime !== this.props.deepTime) {
	                this.initCicrle(nextProps.fallTime, nextProps.shallowTime, nextProps.deepTime);
	            }
	        }
	    }, {
	        key: 'transTime',
	        value: function transTime(time) {
	            //格式化时间
	            var hour = Math.floor(time / 60);
	            var minute = time - hour * 60;
	            hour = hour >= 24 ? hour - 24 : hour;
	            hour = hour < 10 ? "0" + hour : hour;
	            minute = minute < 10 ? "0" + minute : minute;
	            return hour + "h" + minute + "min";
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'section',
	                { className: 'reportDetail' },
	                React.createElement(
	                    'section',
	                    { className: 'radialGradient' },
	                    React.createElement('canvas', { ref: 'radialGradient', className: 'radial', width: '600', height: '420' }),
	                    React.createElement('canvas', { ref: 'radialBg', className: 'radialBg', width: '600', height: '420' }),
	                    React.createElement(
	                        'section',
	                        { className: 'message' },
	                        React.createElement(
	                            'label',
	                            { className: 'sleepQuality' },
	                            this.props.sleepQuality || '良好'
	                        ),
	                        React.createElement(
	                            'label',
	                            { className: 'sleepType' },
	                            this.props.sleepType || '健康型睡眠'
	                        ),
	                        React.createElement(
	                            'label',
	                            { className: 'sleepRank' },
	                            '超过' + (this.props.sleepRank || 65) + '%用户'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'sleepIcon flex' },
	                    React.createElement(
	                        'li',
	                        { className: 'fallAsleep flex-cell' },
	                        React.createElement('span', null),
	                        React.createElement(
	                            'label',
	                            null,
	                            '\u6E05\u9192'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'shallowSleep flex-cell' },
	                        React.createElement('span', null),
	                        React.createElement(
	                            'label',
	                            null,
	                            '\u6D45\u7761'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'deepSleep flex-cell' },
	                        React.createElement('span', null),
	                        React.createElement(
	                            'label',
	                            null,
	                            '\u6DF1\u7761'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'sleepData flex' },
	                    React.createElement(
	                        'li',
	                        { className: 'dataDetail flex-cell' },
	                        React.createElement(
	                            'section',
	                            null,
	                            this.props.heartRate || 0
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'label',
	                                { className: 'bigText' },
	                                '\u5FC3\u7387'
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'smallText' },
	                                '(\u6B21/\u5206\u949F)'
	                            )
	                        )
	                    ),
	                    React.createElement('li', { className: 'gap' }),
	                    React.createElement(
	                        'li',
	                        { className: 'dataDetail flex-cell' },
	                        React.createElement(
	                            'section',
	                            null,
	                            this.props.respirationRate || 0
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'label',
	                                { className: 'bigText' },
	                                '\u547C\u5438\u7387'
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'smallText' },
	                                '(\u6B21/\u5206\u949F)'
	                            )
	                        )
	                    ),
	                    React.createElement('li', { className: 'gap' }),
	                    React.createElement(
	                        'li',
	                        { className: 'dataDetail flex-cell' },
	                        React.createElement(
	                            'section',
	                            null,
	                            this.props.bodyMovement || 0
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'label',
	                                { className: 'bigText' },
	                                '\u4F53\u52A8'
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'smallText' },
	                                '(\u6B21)'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'sleepAnalysis' },
	                    React.createElement(
	                        'section',
	                        { className: 'analysisHeader' },
	                        React.createElement('span', { className: 'starIcon' }),
	                        React.createElement(
	                            'span',
	                            { className: 'analysisTitle' },
	                            '\u7761\u7720\u5206\u6790'
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'analysisDetail' },
	                        this.props.analysisDetail || "睡眠质量良好，偶有心率不齐症状，可定期观察。请继续保持良好的睡眠作息。"
	                    )
	                )
	            );
	        }
	    }]);
	    return ReportDetail;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChartsTab = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var ChartsTab = exports.ChartsTab = function (_BaseComponent) {
	    (0, _inherits3.default)(ChartsTab, _BaseComponent);

	    function ChartsTab(props) {
	        (0, _classCallCheck3.default)(this, ChartsTab);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (ChartsTab.__proto__ || (0, _getPrototypeOf2.default)(ChartsTab)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    (0, _createClass3.default)(ChartsTab, [{
	        key: 'render',
	        value: function render() {
	            var sleepScope = this.props.sleepScope || '2017-03-13 00:00:00~2017-03-14 00:00:00';
	            var arr = sleepScope.split('~');
	            var hour1 = Number(arr[0].split(' ')[1].split(':')[0]) + 8;
	            var hour2 = Number(arr[1].split(' ')[1].split(':')[0]) + 8;
	            var minute1 = arr[0].split(' ')[1].split(':')[1];
	            var minute2 = arr[1].split(' ')[1].split(':')[1];
	            hour1 = hour1 >= 24 ? hour1 - 24 : hour1;
	            hour2 = hour2 >= 24 ? hour2 - 24 : hour2;
	            hour1 = hour1 < 10 ? "0" + hour1 : hour1;
	            hour2 = hour2 < 10 ? "0" + hour2 : hour2;
	            sleepScope = hour1 + ":" + minute1 + "-" + hour2 + ":" + minute2;
	            var sleepCount = this.props.sleepCount || 0;
	            var hour = Math.floor(sleepCount / 60);
	            var minute = sleepCount - hour * 60;
	            hour = hour < 10 ? "0" + hour : hour;
	            minute = minute < 10 ? "0" + minute : minute;
	            sleepCount = hour + "h" + minute + "min";
	            return React.createElement(
	                'section',
	                { className: 'chartsTab', id: 'reportCont' },
	                React.createElement(
	                    'div',
	                    { className: 'reportTime' },
	                    React.createElement(
	                        'label',
	                        null,
	                        '\u5728\u5E8A\u65F6\u6BB5'
	                    ),
	                    React.createElement(
	                        'i',
	                        null,
	                        sleepScope || "22:12-10:21"
	                    ),
	                    React.createElement(
	                        'label',
	                        null,
	                        '\u7761\u7720\u65F6\u957F'
	                    ),
	                    React.createElement(
	                        'i',
	                        null,
	                        sleepCount || "16小时15分钟"
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reportChart' },
	                    React.createElement('div', { style: { visibility: this.props.reportLoaded ? "visible" : "hidden" },
	                        id: 'reportSleepChart', className: 'report-sleep-chart-down' }),
	                    React.createElement(
	                        'div',
	                        { className: 'loading', style: { display: this.props.reportLoaded ? "none" : "block" } },
	                        React.createElement('img', { src: '../static/img/loading.gif' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reportChart' },
	                    React.createElement('div', { style: { visibility: this.props.threeLoaded ? "visible" : "hidden" },
	                        id: 'reportHeartChart', className: 'report-sleep-chart-down' }),
	                    React.createElement(
	                        'label',
	                        { className: 'averageValue' },
	                        '\u5E73\u5747',
	                        React.createElement(
	                            'span',
	                            null,
	                            ' ',
	                            this.props.heartRate
	                        ),
	                        '\u6B21/\u5206'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'loading', style: { display: this.props.threeLoaded ? "none" : "block" } },
	                        React.createElement('img', { src: '../static/img/loading.gif' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reportChart' },
	                    React.createElement('div', { style: { visibility: this.props.threeLoaded ? "visible" : "hidden" },
	                        id: 'reportBreathingChart', className: 'report-sleep-chart-down' }),
	                    React.createElement(
	                        'label',
	                        { className: 'averageValue breathAverage' },
	                        '\u5E73\u5747',
	                        React.createElement(
	                            'span',
	                            null,
	                            ' ',
	                            this.props.respirationRate
	                        ),
	                        '\u6B21/\u5206'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'loading', style: { display: this.props.threeLoaded ? "none" : "block" } },
	                        React.createElement('img', { src: '../static/img/loading.gif' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reportChart' },
	                    React.createElement('div', { style: { visibility: this.props.threeLoaded ? "visible" : "hidden" },
	                        id: 'reportOverChart', className: 'report-sleep-chart-down' }),
	                    React.createElement(
	                        'label',
	                        { className: 'averageValue trunAverage' },
	                        '\u7D2F\u8BA1',
	                        React.createElement(
	                            'span',
	                            null,
	                            ' ',
	                            this.props.bodyMovement
	                        ),
	                        '\u6B21'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'loading', style: { display: this.props.threeLoaded ? "none" : "block" } },
	                        React.createElement('img', { src: '../static/img/loading.gif' })
	                    )
	                )
	            );
	        }
	    }]);
	    return ChartsTab;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RealTimeData = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _HeaderTab = __webpack_require__(96);

	var _realTimeChart = __webpack_require__(101);

	var _leftSide = __webpack_require__(102);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var RealTimeData = exports.RealTimeData = function (_BaseComponent) {
	    (0, _inherits3.default)(RealTimeData, _BaseComponent);

	    function RealTimeData(props) {
	        (0, _classCallCheck3.default)(this, RealTimeData);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (RealTimeData.__proto__ || (0, _getPrototypeOf2.default)(RealTimeData)).call(this, props));

	        _this.state = {
	            sleepStatus: 0,
	            propHash: "time"
	        };
	        _this.keyDownEvent = _this.keyDownEvent.bind(_this);
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.hashFlag = "time";
	        return _this;
	    }

	    (0, _createClass3.default)(RealTimeData, [{
	        key: 'keyDownEvent',
	        value: function keyDownEvent(e) {
	            if (e.keyCode == 38 || e.keyCode == 40) {
	                this.isHeader = false;
	            } else if (e.keyCode == 37) {
	                if (this.state.propHash == 'out') return;
	                if (this.state.propHash == 'report') {
	                    this.setState({
	                        propHash: "out"
	                    });
	                } else if (this.state.propHash == 'time') {
	                    this.setState({
	                        propHash: "report"
	                    });
	                }
	                this.isHeader = true;
	            } else if (e.keyCode == 39) {
	                if (this.state.propHash == 'time') return;
	                if (this.state.propHash == 'report') {
	                    this.setState({
	                        propHash: "time"
	                    });
	                } else if (this.state.propHash == 'out') {
	                    this.setState({
	                        propHash: "report"
	                    });
	                }
	                this.isHeader = true;
	            } else if (e.keyCode == 13 && this.isHeader && this.hashFlag.indexOf(this.state.propHash) == -1) {
	                if (this.state.propHash == "report") {
	                    location.hash = "";
	                } else if (this.state.propHash == "out") {
	                    localStorage.clear();
	                    location.hash = "login";
	                }
	            }
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.confirmLogin();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'getSleepStatus',
	        value: function getSleepStatus(status) {
	            if (status == this.state.sleepStatus) return;
	            this.setState({
	                sleepStatus: status
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'time bg-img' },
	                React.createElement(_HeaderTab.HeaderTab, { hash: this.state.propHash }),
	                React.createElement(_leftSide.LeftSide, { sleepStatus: this.state.sleepStatus }),
	                React.createElement(
	                    'section',
	                    { className: 'rightSide' },
	                    React.createElement(_realTimeChart.RealTimeChart, { getSleepStatus: this.getSleepStatus.bind(this) })
	                )
	            );
	        }
	    }]);
	    return RealTimeData;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RealTimeChart = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 创建React组件
	var RealTimeChart = exports.RealTimeChart = function (_BaseComponent) {
	    (0, _inherits3.default)(RealTimeChart, _BaseComponent);

	    function RealTimeChart(props) {
	        (0, _classCallCheck3.default)(this, RealTimeChart);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (RealTimeChart.__proto__ || (0, _getPrototypeOf2.default)(RealTimeChart)).call(this, props));

	        _this.state = {
	            heartOption: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
	            breathOption: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
	            trunOverOption: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	        };
	        _this.componentDidMount = _this.componentDidMount.bind(_this);
	        _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(RealTimeChart, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            this.heartInit(this.state.heartOption);
	            this.breathingInit(this.state.breathOption);
	            this.turnOverInit(this.state.trunOverOption);
	            this.InitData(0, 0, false);
	            _Actions.Actions.getRealTimeData(this.getRealTimeData.bind(this));
	            this.tclock = setInterval(function () {
	                _Actions.Actions.getRealTimeData(_this2.getRealTimeData.bind(_this2));
	            }, 5000);
	            this.heartMax = 0;
	            this.breathData = 0;
	            var heartLine = this.heartLine || [],
	                breathLine = this.breathLine || [],
	                turnOverLine = this.turnOverLine || [];
	            clearInterval(this.lineClock);
	            var time = 0;
	            this.lineClock = setInterval(function () {
	                var index = time % 20;
	                var trunIndex = time % 48;
	                if (heartLine.length == 48) {
	                    heartLine.shift();
	                    breathLine.shift();
	                    turnOverLine.shift();
	                }
	                heartLine.push(_this2.splineHeartRateList[index]);
	                breathLine.push(_this2.splineBreathRateList[trunIndex]);
	                turnOverLine.push(_this2.splineTrunOverRateList[trunIndex]);
	                _this2.updateChart(_this2.heartChart, heartLine);
	                _this2.updateChart(_this2.breathChart, breathLine);
	                _this2.updateChart(_this2.turnOverChart, turnOverLine);
	                time += 1;
	            }, 100);
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (this.state.turnOverTimes != nextState.turnOverTimes || this.state.heartRate != nextState.heartRate || this.state.breathRate != nextState.breathRate) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'InitData',
	        value: function InitData(breathData, heartMax) {
	            var trunOverChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var overTimes = arguments[3];

	            this.splineTrunOverRateList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	            var calc = function calc(angle) {
	                return Math.sin(angle * Math.PI / 180);
	            };
	            this.splineBreathRateList = [20 + breathData * calc(7.5), 20 + breathData * calc(15), 20 + breathData * calc(22.5), 20 + breathData * calc(30), 20 + breathData * calc(37.5), 20 + breathData * calc(45), 20 + breathData * calc(52.5), 20 + breathData * calc(60), 20 + breathData * calc(67.5), 20 + breathData * calc(75), 20 + breathData * calc(82.5), 20 + breathData * calc(90), 20 + breathData * calc(97.5), 20 + breathData * calc(105), 20 + breathData * calc(112.5), 20 + breathData * calc(120), 20 + breathData * calc(127.5), 20 + breathData * calc(135), 20 + breathData * calc(142.5), 20 + breathData * calc(150), 20 + breathData * calc(157.5), 20 + breathData * calc(165), 20 + breathData * calc(172.5), 20 + breathData * calc(180), 20 + breathData * calc(187.5), 20 + breathData * calc(195), 20 + breathData * calc(202.5), 20 + breathData * calc(210), 20 + breathData * calc(217.5), 20 + breathData * calc(225), 20 + breathData * calc(232.5), 20 + breathData * calc(240), 20 + breathData * calc(247.5), 20 + breathData * calc(255), 20 + breathData * calc(262.5), 20 + breathData * calc(270), 20 + breathData * calc(277.5), 20 + breathData * calc(285), 20 + breathData * calc(292.5), 20 + breathData * calc(300), 20 + breathData * calc(307.5), 20 + breathData * calc(315), 20 + breathData * calc(322.5), 20 + breathData * calc(330), 20 + breathData * calc(337.5), 20 + breathData * calc(345), 20 + breathData * calc(352.5), 20 + breathData * calc(360)];
	            this.splineHeartRateList = [40, 40, 40, 40, 40 + 6 * heartMax / 7, 40 - 6 * heartMax / 7, 40 - heartMax / 7, 40 - heartMax / 7, 40 + 1 * heartMax / 7, 40 - 6 * heartMax / 7, 40, 40, 40, 40, 40 + 6 * heartMax / 7, 40 - 6 * heartMax / 7, 40 - heartMax / 7, 40 - heartMax / 7, 40 + 1 * heartMax / 7, 40 - 6 * heartMax / 7];
	            if (trunOverChange) {
	                for (var i = 0; i < overTimes; i++) {
	                    this.splineTrunOverRateList[i * 4 + 2] = 10;
	                    this.splineTrunOverRateList[i * 4 + 3] = 10;
	                }
	            }
	        }
	    }, {
	        key: 'getRealTimeData',
	        value: function getRealTimeData(data) {
	            //处理数据
	            if (typeof this.props.getSleepStatus === 'function') {
	                this.props.getSleepStatus(data.sleepStatus || 0);
	            }
	            if (data.dataTime == null) {
	                this.InitData(0, 0, false);
	                // this.setState({
	                //     turnOverTimes:0,
	                //     heartRate:0,
	                //     breathRate:0
	                // });
	                return;
	            }
	            var heartMax = 70;
	            var breathData = 0;
	            var now = new Date().getTime();
	            var str = data.dataTime.replace(/-/g, "/");
	            var resTime = new Date(str).getTime() + 8 * 60 * 60 * 1000;
	            var prevTime = localStorage.getItem("resTime");
	            localStorage.setItem("resTime", resTime);
	            if (now - resTime < 120000) {
	                this.setState({
	                    turnOverTimes: Number(this.state.turnOverTimes || 0) + Number(data.turnOverTimes),
	                    heartRate: data.heartRate,
	                    breathRate: data.breathRate
	                });
	                var _breathData = data.breathRate >= 30 ? 60 : 2 * data.breathRate;
	                var _heartMax = data.heartRate;
	                var trunOverChange = false;
	                if (data.turnOverTimes == 0 || data.turnOverTimes == null || prevTime == resTime) {} else {
	                    trunOverChange = true;
	                }
	                this.InitData(_breathData, _heartMax, trunOverChange, data.turnOverTimes);
	                // this.updateChart(this.heartChart,splineHeartRateList);
	                // this.updateChart(this.breathChart,splineBreathRateList);
	                // this.updateChart(this.turnOverChart,splineTrunOverRateList);
	            } else {
	                this.InitData(0, 0, false);
	            }
	        }
	    }, {
	        key: 'heartInit',
	        value: function heartInit(data) {
	            var dom = document.getElementById("heartBeat");
	            this.heartChart = echarts.init(dom);
	            var option = null;
	            option = {
	                animation: false,
	                tooltip: {},
	                legend: { data: [''] },
	                grid: {
	                    show: false,
	                    left: 20,
	                    top: 20,
	                    bottom: 20,
	                    right: 20
	                },
	                xAxis: {
	                    show: false,
	                    boundaryGap: true,
	                    data: data
	                },
	                yAxis: {
	                    show: false,
	                    type: 'value',
	                    max: 150
	                },
	                series: {
	                    symbol: "none",
	                    name: '',
	                    type: 'line',
	                    data: data,
	                    lineStyle: {
	                        normal: {
	                            width: '3',
	                            color: '#41f0bc'
	                        }
	                    }
	                }
	            };
	            this.heartChart.setOption(option);
	        }
	    }, {
	        key: 'breathingInit',
	        value: function breathingInit(data) {
	            var dom1 = document.getElementById("breathing");
	            this.breathChart = echarts.init(dom1);
	            var option = null;
	            option = {
	                animation: false,
	                grid: {
	                    show: false,
	                    left: 20,
	                    top: 40,
	                    bottom: 40,
	                    right: 20
	                },
	                xAxis: { show: false,
	                    data: data
	                },
	                yAxis: {
	                    show: false,
	                    max: 80
	                },
	                series: {
	                    symbol: "none",
	                    type: 'line',
	                    name: '',
	                    smooth: true,
	                    data: data,
	                    lineStyle: {
	                        normal: {
	                            width: '3',
	                            color: '#41f0bc'
	                        }
	                    }
	                }
	            };
	            this.breathChart.setOption(option);
	        }
	    }, {
	        key: 'turnOverInit',
	        value: function turnOverInit(data) {
	            var dom2 = document.getElementById("trunOver");
	            this.turnOverChart = echarts.init(dom2);
	            var option2 = null;
	            option2 = {
	                animation: false,
	                tooltip: {},
	                legend: {
	                    data: ['']
	                },
	                grid: {
	                    show: false,
	                    left: 20,
	                    top: 40,
	                    bottom: 40,
	                    right: 20
	                },
	                xAxis: { show: false,
	                    data: data

	                },

	                yAxis: {
	                    show: false,
	                    type: "value",
	                    max: 15
	                },

	                series: {
	                    symbol: "none",
	                    name: '',
	                    type: 'line',
	                    data: data,
	                    step: true,
	                    lineStyle: {
	                        normal: {
	                            width: '3',
	                            color: '#41f0bc'
	                        }
	                    }
	                }
	            };
	            this.turnOverChart.setOption(option2);
	        }
	    }, {
	        key: 'updateChart',
	        value: function updateChart(chart, data) {
	            chart.setOption({
	                series: [{
	                    data: data
	                }]
	            });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.tclock);
	            clearInterval(this.lineClock);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'moniter' },
	                React.createElement(
	                    'div',
	                    { className: 'moniter-chart moniter-heart-beat' },
	                    React.createElement(
	                        'div',
	                        { className: 'chart-left' },
	                        React.createElement(
	                            'div',
	                            { className: 'data-name' },
	                            '\u5FC3\u7387'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'data-number' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                this.state.heartRate || '0'
	                            ),
	                            React.createElement(
	                                'i',
	                                null,
	                                '\u6B21/\u5206'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'grid' },
	                        React.createElement('div', { id: 'heartBeat', className: 'chart-right' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'moniter-chart moniter-breathing' },
	                    React.createElement(
	                        'div',
	                        { className: 'chart-left' },
	                        React.createElement(
	                            'div',
	                            { className: 'data-name' },
	                            '\u547C\u5438\u7387'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'data-number' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                this.state.breathRate || '0'
	                            ),
	                            React.createElement(
	                                'i',
	                                null,
	                                '\u6B21/\u5206'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'grid' },
	                        React.createElement('div', { id: 'breathing', className: 'chart-right' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'moniter-chart moniter-turn-over' },
	                    React.createElement(
	                        'div',
	                        { className: 'chart-left' },
	                        React.createElement(
	                            'div',
	                            { className: 'data-name' },
	                            '\u4F53\u52A8'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'data-number' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                this.state.turnOverTimes || '0'
	                            ),
	                            React.createElement(
	                                'i',
	                                null,
	                                '\u6B21'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'grid' },
	                        React.createElement('div', { id: 'trunOver', className: 'chart-right' })
	                    )
	                )
	            );
	        }
	    }]);
	    return RealTimeChart;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LeftSide = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LeftSide = exports.LeftSide = function (_BaseComponent) {
	    (0, _inherits3.default)(LeftSide, _BaseComponent);

	    function LeftSide(props) {
	        (0, _classCallCheck3.default)(this, LeftSide);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (LeftSide.__proto__ || (0, _getPrototypeOf2.default)(LeftSide)).call(this, props));

	        _this.state = {
	            duration: 0
	        };
	        _this.componentDidMount = _this.componentDidMount.bind(_this);
	        _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
	        _this.items = ['--', "在床", "在床", "在床", "在床", "在床", "在床", "离床", "在床", "离床", "离床", "离床", "在床", "在床", "在床", "--"];
	        return _this;
	    }

	    (0, _createClass3.default)(LeftSide, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            this.timeClock = setInterval(function () {
	                _this2.setState({
	                    duration: Number(_this2.state.duration) + 1
	                });
	            }, 1000);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.timeClock);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var duration = this.state.duration || "00:00:00";
	            if (this.state.duration) {
	                var hour = Math.floor(duration / 3600);
	                var minute = Math.floor((duration - hour * 3600) / 60);
	                var secend = Math.floor(duration - hour * 3600 - minute * 60);
	                hour = hour < 10 ? "0" + hour : hour;
	                minute = minute < 10 ? "0" + minute : minute;
	                secend = secend < 10 ? "0" + secend : secend;
	                duration = hour + ":" + minute + ":" + secend;
	            }
	            var sleepStatus = this.props.sleepStatus || 0;
	            return React.createElement(
	                'section',
	                { className: 'leftSide' },
	                React.createElement(
	                    'section',
	                    { className: 'sleepStatus' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u7761\u7720\u72B6\u6001'
	                    ),
	                    React.createElement(
	                        'label',
	                        null,
	                        this.items[sleepStatus]
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'monitoringTime' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u76D1\u6D4B\u65F6\u957F'
	                    ),
	                    React.createElement(
	                        'label',
	                        null,
	                        duration
	                    )
	                )
	            );
	        }
	    }]);
	    return LeftSide;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.selectDevice = undefined;

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

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var selectDevice = exports.selectDevice = function (_BaseComponent) {
	    (0, _inherits3.default)(selectDevice, _BaseComponent);

	    function selectDevice(props) {
	        (0, _classCallCheck3.default)(this, selectDevice);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (selectDevice.__proto__ || (0, _getPrototypeOf2.default)(selectDevice)).call(this, props));

	        _this.state = {
	            activeIndex: 0
	        };
	        _this.keyDownEvent = _this.keyDownEvent.bind(_this);
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(selectDevice, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.confirmLogin('select');
	        }
	    }, {
	        key: 'keyDownEvent',
	        value: function keyDownEvent(e) {
	            if (this.running) return;
	            if (e.keyCode == 37) {
	                if (this.state.activeIndex == 0) return;
	                // this.runningFuc(this.state.activeIndex == 1 ? 32 : 45.7);
	                this.setState({
	                    activeIndex: this.state.activeIndex - 1
	                });
	                this.isHeader = true;
	            } else if (e.keyCode == 39) {
	                if (this.state.activeIndex == this.state.deviceList.length - 1) return;
	                // this.runningFuc(this.state.activeIndex == 0 ? -32 :-45.7);
	                this.setState({
	                    activeIndex: Number(this.state.activeIndex) + 1
	                });
	            } else if (e.keyCode == 13) {
	                if (!this.state.deviceList) return;
	                _Actions.Actions.selectDevice(this.state.deviceList[this.state.activeIndex].deviceId);
	            }
	        }
	    }, {
	        key: 'runningFuc',
	        value: function runningFuc(value) {
	            // clearInterval(this.running);
	            // let originValue = parseInt(this.listDom.style.marginLeft),
	            // 	i = 0,
	            // 	index = value>0?-1:1;
	            // this.running = setInterval(()=>{
	            // 	this.listDom.style.marginLeft = originValue + i*value + "px";
	            // 	console.log(originValue,this.listDom.style.marginLeft);
	            // 	i += 1;
	            // 	if(i>10){
	            // 		clearInterval(this.running);
	            // 		console.log(this.running);
	            // 		this.setState({
	            //     		activeIndex : Number(this.state.activeIndex)+index
	            //     	});
	            // 	}
	            // },100);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener('keydown', this.keyDownEvent);
	            //    this.listDom = ReactDOM.findDOMNode(this.refs.deviceList);
	            //    let items = this.state.deviceList || [],
	            // 	baseWidth = document.body.clientWidth > 1350 ? -762 : -457,
	            // 	baseLeft = document.body.clientWidth > 1350 ? -543 : -320;
	            // let len = items.length;
	            //    this.listDom.style.marginLeft = (len>3 ? (this.state.activeIndex-1)*baseWidth+baseLeft+"px" : 0);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener('keydown', this.keyDownEvent);
	        }
	    }, {
	        key: 'formatDate',
	        value: function formatDate(date) {
	            var Date = date.split(" ")[0];
	            var Arr = Date.split("-");
	            return Arr[0] + "年" + Arr[1] + "月" + Arr[2] + "日";
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var items = this.state.deviceList || [],
	                baseWidth = document.body.clientWidth > 1350 ? -762 : -457,
	                baseLeft = document.body.clientWidth > 1350 ? -543 : -320;
	            // if(items.length>0 && items.length < 5) items.push(items[0]);
	            var len = items.length;
	            return React.createElement(
	                'div',
	                { className: 'bg-img' },
	                React.createElement(
	                    'label',
	                    { className: 'selectTitle' },
	                    '\u8BF7\u9009\u62E9\u8BBE\u5907'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'deviceList', ref: 'deviceList', style: { width: 8 + len * 768 + "px",
	                            marginLeft: len > 3 ? (this.state.activeIndex - 1) * baseWidth + baseLeft + "px" : 0 } },
	                    React.createElement('li', { className: "bandDevice " + (len > 3 ? "hiddenLi" : "showLi") }),
	                    items.map(function (item, index) {
	                        return React.createElement(
	                            'li',
	                            { className: "bandDevice " + (index === _this2.state.activeIndex ? "active" : ""),
	                                key: index, style: { opacity: len > 2 && (index == _this2.state.activeIndex - 1 || index == _this2.state.activeIndex + 2) ? "0.6" : "1" } },
	                            React.createElement(
	                                'section',
	                                { className: 'bandIcon' },
	                                React.createElement('img', { src: '../static/img/band.png' })
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'bandInfo' },
	                                React.createElement(
	                                    'label',
	                                    { className: 'deviceName' },
	                                    item.deviceName
	                                ),
	                                React.createElement(
	                                    'label',
	                                    { className: 'roomName' },
	                                    "位置: " + item.roomName
	                                ),
	                                React.createElement(
	                                    'label',
	                                    { className: 'bindTime' },
	                                    "绑定: " + _this2.formatDate(item.bindTime)
	                                )
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	    return selectDevice;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);