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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _Home = __webpack_require__(96);

	var _Lamp = __webpack_require__(97);

	var _Reseting = __webpack_require__(103);

	var _Music = __webpack_require__(104);

	var _list = __webpack_require__(105);

	var _Timing = __webpack_require__(106);

	var _toast = __webpack_require__(101);

	var _Switch = __webpack_require__(108);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    IndexRedirect = _ReactRouter.IndexRedirect; // import {Funs} from '../../../common/src/fun.es6';

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
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'app' },
	                this.props.children
	            );
	        }
	    }]);
	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('星月音乐智能灯');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(
	            Route,
	            { path: '/', component: App },
	            React.createElement(IndexRedirect, { to: 'lamp' }),
	            React.createElement(Route, { path: 'lamp', component: _Lamp.Lamp }),
	            React.createElement(Route, { path: 'timing', component: _Timing.Timing }),
	            React.createElement(Route, { path: 'music', component: _Music.Music }),
	            React.createElement(Route, { path: 'list', component: _list.List }),
	            React.createElement(Route, { path: 'reseting', component: _Reseting.Reseting }),
	            React.createElement(Route, { path: 'toast', component: _toast.Toast }),
	            React.createElement(Route, { path: 'switch', component: _Switch.Switch })
	        )
	    ), document.getElementById('ROOT'));
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(15).Object.getPrototypeOf;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(5)
	  , $getPrototypeOf = __webpack_require__(7);

	__webpack_require__(13)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(6);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(10)('keys')
	  , uid    = __webpack_require__(12);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(11)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(19)
	  , createDesc = __webpack_require__(27);
	module.exports = __webpack_require__(23) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(23) && !__webpack_require__(24)(function(){
	  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(24)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(21)
	  , document = __webpack_require__(11).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(32);
	var $Object = __webpack_require__(15).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(23), 'Object', {defineProperty: __webpack_require__(19).f});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	module.exports = true;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(55);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(50)
	  , defined = __webpack_require__(6);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(51);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(39)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(39)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11).document && document.documentElement;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(19).f
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(58)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(10)('wks')
	  , uid        = __webpack_require__(12)
	  , Symbol     = __webpack_require__(11).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(58);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(15).Symbol;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(11)
	  , core           = __webpack_require__(15)
	  , LIBRARY        = __webpack_require__(41)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(19).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(51);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(48)
	  , hiddenKeys = __webpack_require__(55).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	module.exports = __webpack_require__(15).Object.setPrototypeOf;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(14);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(84).set});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(87);
	var $Object = __webpack_require__(15).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(45)});

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'login', 'getData', 'changeSwitch', 'changelightingPatternNumber', //改变模式
	'changeColor', //改变颜色
	'changeLight', //改变亮度
	'controlLight', //设备控制-控制智能灯光开关
	'resetFactory', //设备控制-恢复出厂协议
	'changeClock1Switch', //闹铃1的开关控制
	'changeClock2Switch', //闹铃2的开关控制
	'saveClock', //保存闹铃的设置
	'showData' //在修改闹铃的时候保存数据到store,
	]);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

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

	var _Actions = __webpack_require__(90);

	var _fun = __webpack_require__(94);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link,
	    browserHistory = _ReactRouter.browserHistory;


	var timer = 0;
	var tipsShow = function tipsShow(_this, tips) {
	    console.log("00");
	    _this.trigger({
	        tips: tips,
	        toastShow: true
	    });
	    timer = setTimeout(function () {
	        console.log("00");
	        _this.trigger({
	            toastShow: false
	        });
	    }, 3000);
	};

	var deviceId = _fun.Funs.getUrlParam('deviceId');
	//const deviceId = "2F52061F947B99A04EC7110855BEEA6E";
	var path = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境
	var source = 8; // 来源
	var postUrl = path + '/device/config/set';

	var AppData = {
	    alarmClock1Hour: '--',
	    alarmClock1Minute: '--',
	    alarmClock2Hour: '--',
	    alarmClock2Minute: '--',
	    alarmClock1LightMode: 0,
	    alarmClock2LightMode: 0,
	    alarmClock1Repeat: 0,
	    alarmClock2Repeat: 0
	};

	var isShutdown = function isShutdown() {
	    return AppData.light == 0 && AppData.mist == 3;
	};

	// 数据过滤计时器
	var dataFilterTimers = {
	    lightSwitch: 0,
	    lightness: 0,
	    lightingPatternNumber: 0,
	    lightColorR: 0,
	    lightColorB: 0,
	    lightColorG: 0,
	    colorIndex: 0,
	    deviceSettingsSmartLight: 0,
	    alarmClock1Switch: 0,
	    alarmClock2Switch: 0,
	    alarmClock1Hour: 0,
	    alarmClock2Hour: 0,
	    alarmClock1LightMode: 0,
	    alarmClock2LightMode: 0,
	    alarmClock1Repeat: 0,
	    alarmClock2Repeat: 0,
	    alarmClock1Minute: 0,
	    alarmClock2Minute: 0,
	    alarmClock1Nap: 0,
	    alarmClock2Nap: 0
	};
	var lightTimer = 0; // 亮度计时器，防止操作过频繁

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

	function getRGBColorIndex() {
	    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	    var colors = ['#ff7c7c', '#ffd376', '#a0e674', '#5be6bd', '#88a1fe'];
	    var color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
	    function pad0(hex) {
	        return hex.replace(/^\b(?=.$)/, '0');
	    }
	    return colors.indexOf(color) || 0;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onLogin: function onLogin() {
	        /*setCookie('wechatUserId',10302,0.5,'/');
	        let _this = this;
	        let routerFirst =  path;
	        function setCookie(c_name,value,expiredays,path) {
	            var exdate=new Date();
	            exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
	            document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
	        };
	        function getCookie(name) {
	        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	                   if (arr = document.cookie.match(reg)) {
	                       return unescape(arr[2]);
	                   } else {
	                       return null;
	                   }
	        };
	        function hasCookie(name) {
	        console.log(window.location.href)
	        let wechatId = getCookie(name);
	            if (wechatId == "" || wechatId == null || wechatId == undefined) {
	                console.log('-------------请求id--')
	                //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
	                let url =  routerFirst + "/wechat/user/login?format=json&type=1&redirect=" + window.location.href;
	                console.log(url)
	                //console.log(url)
	                window.location.href = url;
	                //console.log(location.href)
	            }else{
	                console.log('设置WeChatUserId成功');
	                let accessToken = getCookie('accessToken');
	                $.ajax({
	                type: 'GET',
	                url: path+'/getToken',
	                dataType: 'json',
	                async:false,
	                cache:true,
	                timeout: 500,
	                success: function(data){
	                 if(data.code==0){
	                   let accessToken = data.data;
	                   setCookie('accessToken',accessToken,720000,'/');
	                   // Actions.getScene();
	                   } 
	                 },
	                error: function(xhr, type){
	                	console.log(xhr)
	                }
	            })           
	        }         
	        };  
	        hasCookie('wechatUserId');*/
	    },
	    onGetData: function onGetData(clockId) {
	        var _this = this;
	        var timestamp = +new Date();
	        var time = new Date();
	        var url = path + '/device/data/get?deviceId=' + deviceId + '&time=' + time;
	        het.get(url, {}, function (res) {
	            var json = JSON.parse(res);
	            var data = json.data;
	            if (json.code == 103005001) {
	                // 未授权，跳转授权页面
	                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	            }
	            if (data) {
	                data.tips = '';
	                data.toastShow = false;
	                if (data.onlineStatus && data.onlineStatus != 0) {
	                    tipsShow(_this, "设备不在线");
	                }
	                if (clockId == undefined) {//这是处理来自闹铃设置的

	                } else {
	                    data.repeat = clockId == 1 ? data.alarmClock1Repeat == 192 ? "周末" : "工作日" : data.alarmClock2Repeat == 192 ? "周末" : "工作日";
	                    data.light = clockId == 1 ? data.alarmClock1LightMode == 1 ? "timing-setting-light-right-on" : "timing-setting-light-right-off" : data.alarmClock2LightMode == 1 ? "timing-setting-light-right-on" : "timing-setting-light-right-off";
	                    data.later = clockId == 1 ? data.alarmClock1Bell == 1 ? "timing-remind-right-on" : "timing-remind-right-off" : data.alarmClock1Bell == 1 ? "timing-remind-right-on" : "timing-remind-right-off";
	                    data.work = clockId == 1 ? data.alarmClock1Repeat == 192 ? "" : "selected" : data.alarmClock2Repeat == 192 ? "" : "selected";
	                    data.week = clockId == 1 ? data.alarmClock1Repeat == 192 ? "selected" : "" : data.alarmClock2Repeat == 192 ? "selected" : "";
	                    var hoursIndex = clockId == 1 ? data.alarmClock1Hour : data.alarmClock2Hour;
	                    hoursIndex = hoursIndex[0] == 0 ? hoursIndex[1] : hoursIndex;
	                    var minIndex = clockId == 1 ? data.alarmClock1Minute : data.alarmClock2Minute;
	                    minIndex = minIndex[0] == 0 ? minIndex[1] : minIndex;
	                    window.mySwiper0.slideTo(hoursIndex, 1000, true);
	                    window.mySwiper1.slideTo(minIndex, 1000, true);
	                }
	                var dataJson = dataFilter(data);
	                if (dataJson.alarmClock1Hour == undefined || dataJson.alarmClock2Hour == undefined) {
	                    dataJson.alarmClock1Hour = AppData.alarmClock1Hour;
	                    dataJson.alarmClock1Minute = AppData.alarmClock1Minute;
	                    dataJson.alarmClock1LightMode = AppData.alarmClock1LightMode;
	                    dataJson.alarmClock2LightMode = AppData.alarmClock2LightMode;
	                    dataJson.alarmClock1Repeat = AppData.alarmClock1Repeat;
	                    dataJson.alarmClock2Repeat = AppData.alarmClock2Repeat;
	                    dataJson.alarmClock2Hour = AppData.alarmClock2Hour;
	                    dataJson.alarmClock2Minute = AppData.alarmClock2Minute;
	                }
	                _this.trigger(dataJson);
	            } else if (json.msg) {
	                tipsShow(_this, json.msg);
	            }
	        }, function (err) {
	            tipsShow(_this, "网络出错！请稍后再试");
	        });
	    },
	    onChangeSwitch: function onChangeSwitch(S, R, G, B, index, num, P) {
	        var _this = this;
	        setDataTimer('lightSwitch', 'lightness', 'lightingPatternNumber', 'lightColorR', 'lightColorB', 'lightColorG');
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)({
	                lightSwitch: S,
	                lightness: num,
	                lightingPatternNumber: P,
	                lightColorR: R,
	                lightColorB: B,
	                lightColorG: G,
	                controlNumber: 0x01
	            })
	        };
	        if (S == 0) {
	            $(".home-on").css("bottom", "0");
	            $(".lamp-btn").css("height", "30%");
	            _this.trigger({
	                lightSwitch: 0
	            });
	        } else {
	            $(".home-on").css("bottom", "-70%");
	            $(".lamp-btn").css("height", "9.9166666rem");
	            _this.trigger({
	                lightSwitch: 1
	            });
	        }
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节开关成功');
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        }, function (err) {
	            tipsShow(_this, "网络不好请稍后再试！");
	        });
	    },
	    onChangeColor: function onChangeColor(S, R, G, B, index, num, P) {
	        var _this = this;
	        setDataTimer('lightingPatternNumber', 'lightColorR', 'lightColorG', 'lightColorB', 'colorIndex');
	        var colorListShow = P == 0 ? false : true;
	        _this.trigger({
	            lightColorR: parseInt(R),
	            lightColorG: parseInt(G),
	            lightColorB: parseInt(B),
	            colorListShow: colorListShow,
	            colorIndex: index,
	            lightingPatternNumber: P
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)({
	                lightingPatternNumber: P,
	                lightSwitch: 1,
	                lightColorR: parseInt(R),
	                lightColorB: parseInt(B),
	                lightColorG: parseInt(G),
	                lightness: num,
	                controlNumber: 0x01
	            })
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节颜色成功');
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        });
	    },
	    onChangeLight: function onChangeLight(R, G, B, num, index, p) {
	        var _this = this;
	        setDataTimer('lightness');
	        this.trigger({
	            lightness: num
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)({
	                lightSwitch: 1,
	                lightingPatternNumber: p,
	                lightColorR: parseInt(R),
	                lightColorB: parseInt(B),
	                lightColorG: parseInt(G),
	                lightness: num,
	                controlNumber: 0x01
	            })
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节灯光成功');
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        });
	    },
	    onControlLight: function onControlLight(num) {
	        var _this = this;
	        var number = num == 1 ? 0 : 1;
	        setDataTimer('deviceSettingsSmartLight');
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)({
	                deviceSettingsSmartLight: number,
	                controlNumber: 0x07
	            })
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('关闭智能灯成功');
	                var music = num == 1 ? "timing-setting-music-right-off" : "timing-setting-music-right-on";
	                _this.trigger({
	                    music: music,
	                    deviceSettingsSmartLight: number
	                });
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        });
	    },
	    onResetFactory: function onResetFactory() {
	        var _this = this;
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)({
	                deviceSettingsReset: 1,
	                controlNumber: 0x07
	            })
	        };
	        _this.trigger({
	            resettingHidden: false
	        });
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('恢复出厂设备成功');
	            } else {
	                tipsShow(_this, "恢复出厂设备失败");
	            }
	        }, function (err) {
	            tipsShow(_this, "网络不好请稍后再试！");
	        });
	    },
	    onChangeClock1Switch: function onChangeClock1Switch(dataJson) {
	        var _this = this;
	        setDataTimer('alarmClock1Switch');
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)(dataJson)
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('闹铃1开关设置成功');
	                _this.trigger({
	                    alarmClock1Switch: dataJson.alarmClock1Switch
	                });
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        }, function (err) {
	            tipsShow(_this, "网络不好请稍后再试！");
	        });
	    },
	    onChangeClock2Switch: function onChangeClock2Switch(dataJson) {
	        var _this = this;
	        setDataTimer('alarmClock2Switch');
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)(dataJson)
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('闹铃2开关设置成功');
	                _this.trigger({
	                    alarmClock2Switch: dataJson.alarmClock2Switch
	                });
	            } else {
	                tipsShow(_this, d.msg);
	            }
	        }, function (err) {
	            tipsShow(_this, "网络不好请稍后再试！");
	        });
	    },
	    onSaveClock: function onSaveClock(dataJson) {
	        var _this = this;
	        if (dataJson.id == 1) {
	            setDataTimer('alarmClock1Hour', 'alarmClock1LightMode', 'alarmClock1Repeat', 'alarmClock1Minute');
	        } else {
	            setDataTimer('alarmClock2Hour', 'alarmClock2LightMode', 'alarmClock2Repeat', 'alarmClock2Minute');
	        }
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: (0, _stringify2.default)(dataJson)
	        };
	        AppData.alarmClock1Hour = dataJson.alarmClock1Hour;
	        AppData.alarmClock1Minute = dataJson.alarmClock1Minute;
	        AppData.alarmClock1LightMode = dataJson.alarmClock1LightMode;
	        AppData.alarmClock2LightMode = dataJson.alarmClock2LightMode;
	        AppData.alarmClock1Repeat = dataJson.alarmClock1Repeat;
	        AppData.alarmClock2Repeat = dataJson.alarmClock2Repeat;
	        AppData.alarmClock2Hour = dataJson.alarmClock2Hour;
	        AppData.alarmClock2Minute = dataJson.alarmClock2Minute;
	        _this.trigger(AppData);
	        console.log(AppData);
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('闹铃设置成功');
	                _this.trigger({
	                    mark: 1
	                });
	                tipsShow(_this, "闹铃设置成功");
	            } else {
	                tipsShow(_this, "闹铃设置失败");
	            }
	        }, function (err) {
	            tipsShow(_this, "网络不好请稍后再试！");
	        });
	    },
	    onShowData: function onShowData() {
	        this.trigger(AppData);
	    }
	});

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(95);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ }),
/* 95 */
/***/ (function(module, exports) {

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

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Home = undefined;

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

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var Home = exports.Home = function (_BaseComponent) {
		(0, _inherits3.default)(Home, _BaseComponent);

		function Home(props) {
			(0, _classCallCheck3.default)(this, Home);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

			_this.state = {};
			_this.listenStore(_Store.Store); // 监听Store
			return _this;
		}

		(0, _createClass3.default)(Home, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'home' },
					React.createElement(
						'div',
						{ className: 'home-btn' },
						React.createElement(
							'div',
							{ className: 'home-btn-timing' },
							React.createElement(
								Link,
								{ to: '/Timing' },
								React.createElement('img', { src: '../static/img/pic-04xxhdpi.png' }),
								React.createElement(
									'h3',
									null,
									'\u95F9\u94C3'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'home-btn-title' },
							'\u5468\u6770\u4F26\u3002\u3002\u3002\u3002\u3002'
						),
						React.createElement(
							'div',
							{ className: 'home-btn-music' },
							React.createElement('img', { src: '../static/img/pic-05xxhdpi.png' }),
							React.createElement(
								'h3',
								null,
								'\u97F3\u4E50'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'home-on' },
						React.createElement(
							Link,
							{ to: '/Lamp' },
							React.createElement('img', { src: '../static/img/pic-15xxhdpi.png' }),
							React.createElement(
								'h3',
								null,
								'\u5F00\u542F\u667A\u80FD\u706F'
							)
						)
					)
				);
			}
		}]);
		return Home;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Lamp = undefined;

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

	var _ApiPath = __webpack_require__(98);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	var _ColorPicker = __webpack_require__(99);

	var _toast = __webpack_require__(101);

	var _range = __webpack_require__(102);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	window.dataTimer = 0;

	var Lamp = exports.Lamp = function (_BaseComponent) {
	    (0, _inherits3.default)(Lamp, _BaseComponent);

	    function Lamp(props) {
	        (0, _classCallCheck3.default)(this, Lamp);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Lamp.__proto__ || (0, _getPrototypeOf2.default)(Lamp)).call(this, props));

	        _this.state = {
	            lightImg: "../static/img/pic-08xxhdpi.png",
	            sceneImg: "../static/img/pic-13xxhdpi.png",
	            lightColor: "#919191",
	            sceneColor: "#1bb1e4",
	            colorPickerShow: false,
	            rotate: 0,
	            lightColorR: 94,
	            lightColorG: 245,
	            lightColorB: 132,
	            a: 1,
	            colorListShow: true,
	            settingShow: false,
	            abc: -45,
	            lightness: 0,
	            alarmClock1Hour: '--',
	            alarmClock1Minute: '--',
	            titleShow: false,
	            colorArray: ['#ff7c7c', '#ffd376', '#a0e674', '#5be6bd', '#88a1fe'],
	            colorChange: false
	        };
	        _this.listenStore(_Store.Store);
	        return _this;
	    }

	    (0, _createClass3.default)(Lamp, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var btn = document.getElementById("btn");
	            var xingyue = document.getElementById("xingyue");
	            var top = document.getElementById("lampTop");
	            var lampSpace = document.getElementById("lampSpace");
	            var lampTop = top.clientHeight + lampSpace.clientHeight;
	            var xingyueWidth = xingyue.clientHeight;
	            var preLeft = xingyue.offsetLeft;
	            var preTop = xingyue.offsetTop;
	            //圆心坐标
	            window.R = parseInt(xingyueWidth / 2);
	            window.x = preLeft + parseInt(xingyueWidth / 2);
	            window.y = preTop + lampTop + parseInt(xingyueWidth / 2);
	            _Actions.Actions.login();
	            _Actions.Actions.getData();
	            this.reGetData();
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            clearInterval(window.dataTimer);
	            window.dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'startMove',
	        value: function startMove(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.clientX = e.touches[0].clientX;
	            this.clientY = e.touches[0].clientY;
	            console.log(this.clientX);
	        }
	    }, {
	        key: 'moveIng',
	        value: function moveIng(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            console.log(2);
	            var distance = Math.pow(e.touches[0].clientX - window.x, 2) + Math.pow(e.touches[0].clientY - window.y, 2);
	            var radius = Math.pow(window.R, 2);
	            // console.log(distance,radius);
	            if (distance - radius < 6400 && distance - radius > -6400) {
	                var sin = (e.touches[0].clientY - window.y) / Math.sqrt(distance);
	                var rotuer = Math.asin(sin) * 180 / Math.PI;
	                if (e.touches[0].clientX > window.x && e.touches[0].clientY < window.y) rotuer = 180 - Math.abs(rotuer);
	                if (e.touches[0].clientX > window.x && e.touches[0].clientY >= window.y) rotuer = 180 + Math.abs(rotuer);
	                if (e.touches[0].clientX <= window.x && e.touches[0].clientY < window.y) rotuer = Math.abs(rotuer);
	                if (e.touches[0].clientX <= window.x && e.touches[0].clientY >= window.y) rotuer = -Math.abs(rotuer);
	                // console.log(e.touches[0].clientX,e.touches[0].clientY,rotuer)
	                this.setState({
	                    abc: rotuer,
	                    lightness: parseInt((rotuer + 45) / 2.27) < 0 ? 0 : parseInt((rotuer + 45) / 2.27) > 120 ? 120 : parseInt((rotuer + 45) / 2.27)
	                });
	            }
	        }
	    }, {
	        key: 'endMove',
	        value: function endMove(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            if (this.state.lightSwitch == 1) {
	                _Actions.Actions.changeLight(this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, this.state.lightness, this.state.colorIndex, this.state.lightingPatternNumber);
	            }
	        }
	    }, {
	        key: 'startChange',
	        value: function startChange(e) {
	            console.log(3);
	            e.preventDefault();
	            e.stopPropagation();
	            this.initX = e.touches[0].clientX;
	            this.initY = e.touches[0].clientY;
	        }
	    }, {
	        key: 'endChange',
	        value: function endChange(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var distance = Math.pow(this.initX - window.x, 2) + Math.pow(this.initY - window.y, 2);
	            var radius = Math.pow(window.R, 2);
	            // console.log(distance,radius);
	            if (distance - radius < 2500 && distance - radius > -2500) {
	                var sin = (this.initY - window.y) / Math.sqrt(distance);
	                var rotuer = Math.asin(sin) * 180 / Math.PI;
	                if (this.initX > window.x && this.initY < window.y) rotuer = 180 - Math.abs(rotuer);
	                if (this.initX > window.x && this.initY >= window.y) rotuer = 180 + Math.abs(rotuer);
	                if (this.initX <= window.x && this.initY < window.y) rotuer = Math.abs(rotuer);
	                if (this.initX <= window.x && this.initY >= window.y) rotuer = -Math.abs(rotuer);
	                this.setState({
	                    abc: rotuer,
	                    lightness: parseInt((rotuer + 45) / 2.27) < 0 ? 0 : parseInt((rotuer + 45) / 2.27) > 120 ? 120 : parseInt((rotuer + 45) / 2.27)
	                });
	                var lightness = parseInt((rotuer + 45) / 2.27) < 0 ? 0 : parseInt((rotuer + 45) / 2.27) > 120 ? 120 : parseInt((rotuer + 45) / 2.27);
	                if (this.state.lightSwitch == 1) {
	                    _Actions.Actions.changeLight(this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, lightness, this.state.colorIndex, this.state.lightingPatternNumber);
	                }
	            }
	        }
	    }, {
	        key: 'addBackground',
	        value: function addBackground(e) {
	            var colorArr = $(".lamp-color").find("i");
	            var Dom = e.target;
	            var index = colorArr.indexOf(Dom);
	            var DomPre = Dom.parentNode;
	            var computedStyle = document.defaultView.getComputedStyle(DomPre, null);
	            var rgbaString = computedStyle.backgroundColor;
	            var rgbArr = rgbaString.substring(4, rgbaString.length - 1).split(",");
	            _Actions.Actions.changeColor(1, rgbArr[0], rgbArr[1], rgbArr[2], index, this.state.lightness, this.state.lightingPatternNumber);
	            console.log(index);
	        }
	    }, {
	        key: 'changeLightImg',
	        value: function changeLightImg() {
	            _Actions.Actions.changeColor(0, this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, this.state.colorIndex, this.state.lightness, 0);
	        }
	    }, {
	        key: 'changeSceneImg',
	        value: function changeSceneImg() {
	            _Actions.Actions.changeColor(1, this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, this.state.colorIndex, this.state.lightness, 1);
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            if (this.state.lightSwitch == 0) {
	                _Actions.Actions.changeSwitch(1, this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, this.state.colorIndex, this.state.lightness, this.state.lightingPatternNumber);
	            } else {
	                _Actions.Actions.changeSwitch(0, this.state.lightColorR, this.state.lightColorG, this.state.lightColorB, this.state.colorIndex, this.state.lightness, this.state.lightingPatternNumber);
	            }
	        }
	    }, {
	        key: 'selectColor',
	        value: function selectColor() {
	            this.setState({
	                colorPickerShow: true
	            });
	        }
	    }, {
	        key: 'cancleColorPicker',
	        value: function cancleColorPicker() {
	            this.setState({
	                colorPickerShow: false
	            });
	        }
	    }, {
	        key: 'changeLampColor',
	        value: function changeLampColor(data) {
	            _Actions.Actions.changeColor(1, data.r, data.g, data.b, -1, this.state.lightness, this.state.lightingPatternNumber);
	            var colorArr = this.state.colorArray;
	            var item = 'rgb(' + data.r + "," + data.g + "," + data.b + ")";
	            var color = '#' + pad0(data.r.toString(16)) + pad0(data.g.toString(16)) + pad0(data.b.toString(16));
	            function pad0(hex) {
	                return hex.replace(/^\b(?=.$)/, '0');
	            }
	            colorArr.unshift(color);
	            this.setState({
	                colorArray: colorArr
	            });
	        }
	    }, {
	        key: 'settingShow',
	        value: function settingShow() {
	            if (this.state.settingShow == false) {
	                this.setState({
	                    settingShow: true
	                });
	            } else {
	                this.setState({
	                    settingShow: false
	                });
	            }
	        }
	    }, {
	        key: 'getRGBColorIndex',
	        value: function getRGBColorIndex() {
	            var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	            var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	            var colors = this.state.colorArray;
	            var color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
	            function pad0(hex) {
	                return hex.replace(/^\b(?=.$)/, '0');
	            }
	            return colors.indexOf(color) || 0;
	        }
	    }, {
	        key: 'setSt',
	        value: function setSt() {
	            this.setState({
	                toastShow: false
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            console.log(this.state.tips + ":::" + this.state.toastShow);
	            var colorIndex = this.getRGBColorIndex(this.state.lightColorR, this.state.lightColorG, this.state.lightColorB);
	            var titleShow = this.state.alarmClock1Switch == 1 || this.state.alarmClock2Switch == 1 ? "visible" : "hidden";
	            var timing = this.state.alarmClock1Switch == 1 ? this.state.alarmClock1Hour + ":" + this.state.alarmClock1Minute : this.state.alarmClock2Switch == 1 ? this.state.alarmClock2Hour + ":" + this.state.alarmClock2Minute : 0;
	            var lightImg = this.state.lightingPatternNumber == 0 ? "../static/img/pic-09xxhdpi.png" : "../static/img/pic-08xxhdpi.png";
	            var sceneImg = this.state.lightingPatternNumber == 0 ? "../static/img/pic-12xxhdpi.png" : "../static/img/pic-13xxhdpi.png";
	            var lightColor = this.state.lightingPatternNumber == 0 ? "#1bb1e4" : "#919191";
	            var sceneColor = this.state.lightingPatternNumber == 0 ? "#919191" : "#1bb1e4";
	            var rotate = this.state.lightness * 2.27 < 0 ? 0 : this.state.lightness * 2.27;
	            rotate = rotate > 273 ? 273 : rotate;
	            var rotateZ = "rotateZ(" + rotate + "deg)";
	            var lightness = this.state.lightness < 0 ? 0 : parseInt((this.state.lightness > 120 ? 120 : this.state.lightness) / 1.2);
	            var rgba = this.state.lightingPatternNumber == 0 ? 'rgba(210,210,225,1)' : 'rgba(' + this.state.lightColorR + ', ' + this.state.lightColorG + ', ' + this.state.lightColorB + ', ' + this.state.a + ')';
	            var lampColor = [{ pName: "lamp-color-one" }, { pName: "lamp-color-two" }, { pName: "lamp-color-three" }, { pName: "lamp-color-four" }, { pName: "lamp-color-five" }];
	            return React.createElement(
	                'div',
	                { className: 'lamp' },
	                React.createElement(
	                    'div',
	                    { id: 'lampTop', className: 'lamp-btn', style: { height: this.state.lightSwitch == 0 ? "30%" : "9.9166666rem" } },
	                    React.createElement(
	                        'div',
	                        { className: 'home-btn-timing' },
	                        React.createElement(
	                            Link,
	                            { to: '/list' },
	                            React.createElement('img', { src: '../static/img/pic-04xxhdpi.png' }),
	                            React.createElement(
	                                'h3',
	                                null,
	                                '\u95F9\u94C3'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'home-btn-title', style: { visibility: titleShow } },
	                        React.createElement(
	                            'div',
	                            { className: 'timing-title' },
	                            timing
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'home-btn-music' },
	                        React.createElement('img', { src: '../static/img/pic-05xxhdpi.png' }),
	                        React.createElement(
	                            'h3',
	                            null,
	                            '\u97F3\u4E50'
	                        )
	                    )
	                ),
	                React.createElement('div', { id: 'lampSpace', style: { width: "100%", height: "2.666667rem" } }),
	                React.createElement(
	                    'div',
	                    { id: 'lampChart', className: 'lamp-chart' },
	                    React.createElement('img', { className: 'lamp-pic-four', src: '../static/img/pic-2.png' }),
	                    React.createElement('img', { className: 'lamp-pic-one', style: { display: rotate <= 135 ? "block" : "none", transform: rotate <= 135 ? rotateZ : "rotateZ(" + 0 + "deg)" }, src: '../static/img/pic-4.png' }),
	                    React.createElement('img', { className: 'lamp-pic-two', style: { display: rotate >= 0 && rotate <= 225 ? "block" : "none", transform: rotate > 135 && rotate <= 225 ? "rotateZ(" + (rotate - 135) + "deg)" : "rotateZ(" + 0 + "deg)" }, src: '../static/img/pic-5.png' }),
	                    React.createElement('img', { className: 'lamp-pic-three', style: { display: rotate >= 0 && rotate <= 270 ? "block" : "none", transform: rotate > 225 && rotate <= 270 ? "rotateZ(" + (rotate - 225) + "deg)" : "rotateZ(" + 0 + "deg)" }, src: '../static/img/pic-6.png' }),
	                    React.createElement('img', { style: { transform: rotateZ }, className: 'lamp-pic-five', src: '../static/img/pic-3.png' }),
	                    React.createElement(
	                        'div',
	                        { id: 'xingyue', className: 'lamp-xingyue' },
	                        React.createElement(
	                            'div',
	                            { className: 'lamp-xingyue-pic', style: { background: rgba } },
	                            React.createElement('img', { className: 'lamp-xingyue-bg', src: '../static/img/lamp.png' }),
	                            React.createElement('img', { className: 'lamp-xingyue-opacity', src: '../static/img/lamp.png' })
	                        ),
	                        React.createElement(
	                            'h3',
	                            { className: 'lamp-xingyue-tips', style: { color: "#2ccaff" } },
	                            lightness == null ? "--" : lightness
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'lamp-pic', style: { transform: rotateZ } },
	                        React.createElement('div', { className: 'lamp-pic-logo', onTouchStart: this.startChange.bind(this), onTouchEnd: this.endChange.bind(this) }),
	                        React.createElement('span', { id: 'btn', className: 'lamp-pic-btn', onTouchStart: this.startMove.bind(this), onTouchMove: this.moveIng.bind(this), onTouchEnd: this.endMove.bind(this), style: { display: "block", width: "2.5rem", height: "2.5rem", borderRadius: "2.5rem", position: "absolute", left: "50%", bottom: "1.6rem", marginLeft: "-7.0rem" } })
	                    ),
	                    React.createElement('span', { className: 'lamp-hidden' }),
	                    React.createElement('span', { className: 'close-btn', onTouchStart: this.close.bind(this) }),
	                    React.createElement('span', { className: 'setting-btn', onTouchStart: this.settingShow.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'lamp-color', style: { visibility: this.state.lightingPatternNumber == 1 ? "visible" : "hidden" } },
	                    lampColor.map(function (item, index) {
	                        if (index == colorIndex) {
	                            return React.createElement(
	                                'div',
	                                { key: index, className: item.pName, onTouchStart: _this2.addBackground.bind(_this2), style: { background: _this2.state.colorArray[index] } },
	                                React.createElement('i', { className: 'lamp-color-selected' })
	                            );
	                        } else {
	                            return React.createElement(
	                                'div',
	                                { key: index, className: item.pName, onTouchStart: _this2.addBackground.bind(_this2), style: { background: _this2.state.colorArray[index] } },
	                                React.createElement('i', null)
	                            );
	                        }
	                    }),
	                    React.createElement(
	                        'span',
	                        { className: 'lamp-color-select', onTouchStart: this.selectColor.bind(this) },
	                        React.createElement('img', { src: '../static/img/pic-25xxhdpi.png' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'lamp-scene' },
	                    React.createElement(
	                        'div',
	                        { className: 'lamp-scene-light lamp-scene-style', onTouchStart: this.changeLightImg.bind(this) },
	                        React.createElement('img', { src: lightImg }),
	                        React.createElement(
	                            'h3',
	                            { style: { color: lightColor } },
	                            '\u7167\u660E'
	                        )
	                    ),
	                    React.createElement('div', { className: 'lamp-scene-space' }),
	                    React.createElement(
	                        'div',
	                        { className: 'lamp-scene-air lamp-scene-style', onTouchStart: this.changeSceneImg.bind(this) },
	                        React.createElement('img', { src: sceneImg }),
	                        React.createElement(
	                            'h3',
	                            { style: { color: sceneColor } },
	                            '\u6C1B\u56F4'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'home-on', style: { bottom: this.state.lightSwitch == 0 ? "0" : "-70%" } },
	                    React.createElement('img', { src: '../static/img/pic-03xxhdpi.png', onTouchStart: this.close.bind(this) }),
	                    React.createElement(
	                        'h3',
	                        { onTouchStart: this.close.bind(this) },
	                        '\u5F00\u542F\u667A\u80FD\u706F'
	                    )
	                ),
	                React.createElement(_ColorPicker.ColorPicker, { show: this.state.colorPickerShow, cancle: this.cancleColorPicker.bind(this), close: this.changeLampColor.bind(this) }),
	                React.createElement(
	                    'div',
	                    { className: 'lamp-setting', style: { visibility: this.state.settingShow == true ? "visible" : "hidden" } },
	                    React.createElement('div', { className: 'lamp-setting-space', onTouchStart: this.settingShow.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'lamp-setting-lists' },
	                        React.createElement(
	                            Link,
	                            { to: '/reseting' },
	                            React.createElement(
	                                'div',
	                                { className: 'lamp-setting-list' },
	                                '\u8BBE\u5907'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'lamp-setting-list' },
	                            '\u8BBE\u5907\u8BE6\u60C5'
	                        )
	                    )
	                ),
	                React.createElement(_toast.Toast, { show: this.state.toastShow, tips: this.state.tips })
	            );
	        }
	    }]);
	    return Lamp;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 98 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var wPath, aPath;
	switch (location.host) {
	    case 'weixin.clife.cn':
	        wPath = '/clife-wechat-test';
	        aPath = 'http://200.200.200.50';
	        break;
	    case 'weixin.hetyj.com':
	        wPath = '/clife-wechat-preRelease';
	        aPath = 'http://weixin.hetyj.com/';
	        break;
	    case 'wechat.hetyj.com':
	        wPath = '/clife-wechat';
	        aPath = 'http://api.clife.cn';
	        break;
	    default:
	        wPath = '/clife-wechat-test';
	        aPath = 'http://200.200.200.50';
	}
	var Path = {
	    wPath: wPath,
	    aPath: aPath
	};
	exports.default = Path;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ColorPicker = undefined;

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

	var _base64img = __webpack_require__(100);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ColorPicker = exports.ColorPicker = function (_React$Component) {
	    (0, _inherits3.default)(ColorPicker, _React$Component);

	    function ColorPicker() {
	        (0, _classCallCheck3.default)(this, ColorPicker);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (ColorPicker.__proto__ || (0, _getPrototypeOf2.default)(ColorPicker)).call(this));

	        _this.wh = document.body.clientWidth * 0.6;
	        _this.state = {
	            x: _this.wh / 4 - 10,
	            y: _this.wh / 4 - 10,
	            r: 94,
	            g: 245,
	            b: 132,
	            a: 1
	        };
	        return _this;
	    }

	    (0, _createClass3.default)(ColorPicker, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var c = ReactDOM.findDOMNode(this.refs.canvas);
	            var cxt = c.getContext('2d');
	            var img = new Image();
	            img.src = _base64img.Base64Img;
	            img.onload = function () {
	                cxt.drawImage(img, 0, 0, _this2.wh, _this2.wh);
	            };
	        }
	    }, {
	        key: 'selectColor',
	        value: function selectColor(e) {
	            var c = ReactDOM.findDOMNode(this.refs.canvas);
	            var cxt = c.getContext('2d');
	            var offset = this.getOffset(c);
	            console.log(offset);
	            var x = e.targetTouches[0].pageX - offset.x;
	            var y = e.targetTouches[0].pageY - offset.y;
	            var R1 = parseInt(c.clientWidth / 2);
	            var R2 = parseInt(c.clientWidth / 4);
	            //圆心为 R1,R1;
	            if (x < R1 && y <= R1) {
	                if (Math.pow(R1 - x, 2) + Math.pow(R1 - y, 2) < Math.pow(R1, 2) && Math.pow(R1 - x, 2) + Math.pow(R1 - y, 2) > Math.pow(R2, 2)) {
	                    var rgba = cxt.getImageData(x, y, 1, 1).data;
	                    console.log(rgba);
	                    this.setState({
	                        x: x,
	                        y: y,
	                        r: rgba[0],
	                        g: rgba[1],
	                        b: rgba[2],
	                        a: rgba[3] / 255
	                    });
	                }
	            } else if (x >= R1 && y <= R1) {
	                if (Math.pow(x - R1, 2) + Math.pow(R1 - y, 2) < Math.pow(R1, 2) && Math.pow(x - R1, 2) + Math.pow(R1 - y, 2) > Math.pow(R2, 2)) {
	                    var _rgba = cxt.getImageData(x, y, 1, 1).data;
	                    console.log(_rgba);
	                    this.setState({
	                        x: x,
	                        y: y,
	                        r: _rgba[0],
	                        g: _rgba[1],
	                        b: _rgba[2],
	                        a: _rgba[3] / 255
	                    });
	                }
	            } else if (x >= R1 && y > R1) {
	                if (Math.pow(x - R1, 2) + Math.pow(y - R1, 2) < Math.pow(R1, 2) && Math.pow(x - R1, 2) + Math.pow(y - R1, 2) > Math.pow(R2, 2)) {
	                    var _rgba2 = cxt.getImageData(x, y, 1, 1).data;
	                    console.log(_rgba2);
	                    this.setState({
	                        x: x,
	                        y: y,
	                        r: _rgba2[0],
	                        g: _rgba2[1],
	                        b: _rgba2[2],
	                        a: _rgba2[3] / 255
	                    });
	                }
	            } else if (x < R1 && y >= R1) {
	                if (Math.pow(R1 - x, 2) + Math.pow(y - R1, 2) < Math.pow(R1, 2) && Math.pow(R1 - x, 2) + Math.pow(y - R1, 2) > Math.pow(R2, 2)) {
	                    var _rgba3 = cxt.getImageData(x, y, 1, 1).data;
	                    console.log(_rgba3);
	                    this.setState({
	                        x: x,
	                        y: y,
	                        r: _rgba3[0],
	                        g: _rgba3[1],
	                        b: _rgba3[2],
	                        a: _rgba3[3] / 255
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'closePicker',
	        value: function closePicker(e) {
	            e.preventDefault();
	            if (typeof this.props.close === 'function') {
	                this.props.close({
	                    r: this.state.r,
	                    g: this.state.g,
	                    b: this.state.b,
	                    a: this.state.a
	                });
	            }
	            if (typeof this.props.cancle === 'function') {
	                this.props.cancle();
	            }
	        }
	    }, {
	        key: 'cancelPicker',
	        value: function cancelPicker(e) {
	            e.preventDefault();
	            if (typeof this.props.cancle === 'function') {
	                this.props.cancle();
	            }
	        }
	    }, {
	        key: 'submitColor',
	        value: function submitColor(e) {
	            if (typeof this.props.cb === 'function') {
	                this.props.cb({
	                    r: this.state.r,
	                    g: this.state.g,
	                    b: this.state.b,
	                    a: this.state.a
	                });
	            }
	        }
	    }, {
	        key: 'getOffset',
	        value: function getOffset(dom) {
	            var xy = { x: 0, y: 0 };
	            while (dom.className != 'colorpicker' && dom.tagName != 'BODY' && dom.tagName != 'HTML') {
	                xy.x += dom.offsetLeft;
	                xy.y += dom.offsetTop;
	                dom = dom.parentNode;
	            }
	            // xy.y += dom.offsetTop;
	            xy.y += document.body.scrollTop;
	            return xy;
	        }
	        // 阻止页面滚动

	    }, {
	        key: 'stopBodyScroll',
	        value: function stopBodyScroll(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var rgba = 'rgba(' + this.state.r + ', ' + this.state.g + ', ' + this.state.b + ', ' + this.state.a + ')';
	            return React.createElement(
	                'section',
	                { className: 'colorpicker', style: { display: this.props.show ? 'block' : 'none' }, onTouchStart: this.cancelPicker.bind(this) },
	                React.createElement(
	                    'div',
	                    { className: 'cp-wrap', onTouchStart: this.stopBodyScroll },
	                    React.createElement(
	                        'div',
	                        { className: 'cp-hd' },
	                        React.createElement(
	                            'div',
	                            { className: 'cp-preview', onTouchStart: this.cancelPicker.bind(this) },
	                            '\u53D6\u6D88'
	                        ),
	                        React.createElement(
	                            'b',
	                            { onTouchStart: this.closePicker.bind(this), style: { color: "#1bb1e4", fontSize: "16px" } },
	                            '\u786E\u5B9A'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { ref: 'wrap', className: 'canvas-wrap', style: { width: this.wh, height: this.wh }, onTouchMove: this.selectColor.bind(this),
	                            onTouchStart: this.selectColor.bind(this), onTouchEnd: this.submitColor.bind(this) },
	                        React.createElement('canvas', { ref: 'canvas', width: this.wh, height: this.wh }),
	                        React.createElement('i', { style: { top: this.state.y - 10, left: this.state.x - 10 } }),
	                        React.createElement(
	                            'div',
	                            { className: 'cp-lamp', style: { backgroundColor: rgba } },
	                            React.createElement('img', { src: '../static/img/color.png' }),
	                            React.createElement('img', { src: '../static/img/color.png' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return ColorPicker;
	}(React.Component); /**
	                     * 颜色拾取组件
	                     * @prop {boolean}  show    是否显示
	                     * @prop {function} close   关闭按钮回调函数
	                     * @prop {function} cb      选择完成时的回调函数
	                     */


	;

/***/ }),
/* 100 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Base64Img = exports.Base64Img = 'data:image/png;base64,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';

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Toast = undefined;

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

	/*
	 	toast 提示组件
	 	参数：
	 	show： Boolean类型 true为显示false为隐藏；
	 	tips： string类型 toast的提示文本；
	*/
	var Toast = exports.Toast = function (_React$Component) {
	    (0, _inherits3.default)(Toast, _React$Component);

	    function Toast(props) {
	        (0, _classCallCheck3.default)(this, Toast);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    (0, _createClass3.default)(Toast, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: "toast", style: { width: "100%", height: "5rem", position: "fixed", left: "0", bottom: "0", display: this.props.show ? "block" : "none", textAlign: "center" } },
	                React.createElement(
	                    "span",
	                    { style: { padding: "0.8rem 1.5rem", background: "#000", color: "#fff", borderRadius: "3px", fontSize: "14px" } },
	                    this.props.tips
	                )
	            );
	        }
	    }]);
	    return Toast;
	}(React.Component);

/***/ }),
/* 102 */
/***/ (function(module, exports) {

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

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Reseting = undefined;

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

	var _ApiPath = __webpack_require__(98);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _toast = __webpack_require__(101);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	var dataTimer = 0;

	var Reseting = exports.Reseting = function (_BaseComponent) {
	    (0, _inherits3.default)(Reseting, _BaseComponent);

	    function Reseting(props) {
	        (0, _classCallCheck3.default)(this, Reseting);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Reseting.__proto__ || (0, _getPrototypeOf2.default)(Reseting)).call(this, props));

	        _this.state = {
	            music: "timing-setting-music-right-on",
	            resettingHidden: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(Reseting, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getData();
	            this.reGetData();
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            //
	            clearInterval(window.dataTimer);
	            window.dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'resettingLight',
	        value: function resettingLight() {
	            //智能灯控开关
	            _Actions.Actions.controlLight(this.state.deviceSettingsSmartLight);
	        }
	    }, {
	        key: 'isShow',
	        value: function isShow() {
	            var isShow = this.state.resettingHidden == false ? true : false;
	            this.setState({
	                resettingHidden: isShow
	            });
	        }
	    }, {
	        key: 'resetFactory',
	        value: function resetFactory() {
	            //恢复出厂
	            _Actions.Actions.resetFactory();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var className = this.state.deviceSettingsSmartLight == 1 ? "timing-setting-music-right-on" : "timing-setting-music-right-off";
	            return React.createElement(
	                'div',
	                { className: 'resetting' },
	                React.createElement(
	                    'div',
	                    { className: 'resetting-control' },
	                    React.createElement(
	                        'div',
	                        { className: 'resetting-control-light' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u667A\u80FD\u706F\u5149\u63A7\u5236'
	                        ),
	                        React.createElement('i', { className: className, onTouchStart: this.resettingLight.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'music-control', onTouchStart: this.isShow.bind(this) },
	                    React.createElement(
	                        'b',
	                        null,
	                        '\u6062\u590D\u51FA\u5382\u8BBE\u7F6E'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'resetting-hidden', style: { display: this.state.resettingHidden == false ? "none" : "block" } },
	                    React.createElement('div', { className: 'resetting-space', onTouchStart: this.isShow.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'resetting-confirm' },
	                        React.createElement(
	                            'div',
	                            { className: 'resetting-hidden-top' },
	                            '\u6062\u590D\u51FA\u5382\u8BBE\u7F6E\u5C06\u4F1A\u6E05\u9664\u7528\u6237\u8BBE\u7F6E\u53CA\u7F51\u7EDC\u8FDE\u63A5,\u786E\u5B9A\u8981\u6062\u590D\uFF1F'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'resetting-hidden-bottom' },
	                            React.createElement(
	                                'span',
	                                { onTouchStart: this.isShow.bind(this) },
	                                '\u53D6\u6D88'
	                            ),
	                            React.createElement(
	                                'i',
	                                { onTouchStart: this.resetFactory.bind(this) },
	                                '\u786E\u5B9A'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_toast.Toast, { show: this.state.toastShow, tips: this.state.tips })
	            );
	        }
	    }]);
	    return Reseting;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Music = undefined;

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

	var _ApiPath = __webpack_require__(98);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var Music = exports.Music = function (_BaseComponent) {
	    (0, _inherits3.default)(Music, _BaseComponent);

	    function Music(props) {
	        (0, _classCallCheck3.default)(this, Music);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Music.__proto__ || (0, _getPrototypeOf2.default)(Music)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(Music, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'showHide',
	        value: function showHide() {}
	    }, {
	        key: 'onSwitchUserScene',
	        value: function onSwitchUserScene() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var path = "/timing?musicName=";
	            return React.createElement(
	                'div',
	                { className: 'music' },
	                React.createElement(
	                    Link,
	                    { className: 'music-list', to: path },
	                    React.createElement('div', { className: 'music-list-right music-selected' }),
	                    React.createElement(
	                        'div',
	                        { className: 'music-list-right' },
	                        '\u5170\u4E9A\u6960'
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { className: 'music-list', to: path },
	                    React.createElement('div', { className: 'music-list-left' }),
	                    React.createElement(
	                        'div',
	                        { className: 'music-list-right' },
	                        '\u5170\u4E9A\u6960'
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { className: 'music-list', to: path },
	                    React.createElement('div', { className: 'music-list-left' }),
	                    React.createElement(
	                        'div',
	                        { className: 'music-list-right' },
	                        '\u5170\u4E9A\u6960'
	                    )
	                )
	            );
	        }
	    }]);
	    return Music;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.List = undefined;

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

	var _ApiPath = __webpack_require__(98);

	var _BaseComponentClass = __webpack_require__(88);

	var _Actions = __webpack_require__(90);

	var _toast = __webpack_require__(101);

	var _Store = __webpack_require__(91);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var List = exports.List = function (_BaseComponent) {
	    (0, _inherits3.default)(List, _BaseComponent);

	    function List(props) {
	        (0, _classCallCheck3.default)(this, List);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));

	        _this.state = {
	            alarmClock1Hour: '--',
	            alarmClock1Minute: '--',
	            alarmClock2Hour: '--',
	            alarmClock2Minute: '--'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(List, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.showData();
	            _Actions.Actions.getData();
	            this.reGetData();
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            //
	            clearInterval(window.dataTimer);
	            window.dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'clockOneSwitch',
	        value: function clockOneSwitch() {
	            var num = this.state.alarmClock1Switch == 0 ? 1 : 0;
	            var dataJson = {
	                alarmClock1Bell: this.state.alarmClock1Bell,
	                alarmClock1Hour: this.state.alarmClock1Hour,
	                alarmClock1Light: this.state.alarmClock1Light,
	                alarmClock1LightMode: this.state.alarmClock1LightMode,
	                alarmClock1Minute: this.state.alarmClock1Minute,
	                alarmClock1Nap: this.state.alarmClock1Nap,
	                alarmClock1Repeat: this.state.alarmClock1Repeat,
	                alarmClock1Ring: this.state.alarmClock1Ring,
	                alarmClock1Switch: num,
	                alarmClock2Bell: this.state.alarmClock2Bell,
	                alarmClock2Hour: this.state.alarmClock2Hour,
	                alarmClock2Light: this.state.alarmClock2Light,
	                alarmClock2LightMode: this.state.alarmClock2LightMode,
	                alarmClock2Minute: this.state.alarmClock2Minute,
	                alarmClock2Nap: this.state.alarmClock2Nap,
	                alarmClock2Repeat: this.state.alarmClock2Repeat,
	                alarmClock2Ring: this.state.alarmClock2Ring,
	                alarmClock2Switch: this.state.alarmClock2Switch,
	                controlNumber: 0x03
	            };
	            _Actions.Actions.changeClock1Switch(dataJson);
	        }
	    }, {
	        key: 'clockTwoSwitch',
	        value: function clockTwoSwitch() {
	            var num = this.state.alarmClock2Switch == 0 ? 1 : 0;
	            var dataJson = {
	                alarmClock2Bell: this.state.alarmClock2Bell,
	                alarmClock2Hour: this.state.alarmClock2Hour,
	                alarmClock2Light: this.state.alarmClock2Light,
	                alarmClock2LightMode: this.state.alarmClock2LightMode,
	                alarmClock2Minute: this.state.alarmClock2Minute,
	                alarmClock2Nap: this.state.alarmClock2Nap,
	                alarmClock2Repeat: this.state.alarmClock2Repeat,
	                alarmClock2Ring: this.state.alarmClock2Ring,
	                alarmClock2Switch: num,
	                alarmClock1Bell: this.state.alarmClock1Bell,
	                alarmClock1Hour: this.state.alarmClock1Hour,
	                alarmClock1Light: this.state.alarmClock1Light,
	                alarmClock1LightMode: this.state.alarmClock1LightMode,
	                alarmClock1Minute: this.state.alarmClock1Minute,
	                alarmClock1Nap: this.state.alarmClock1Nap,
	                alarmClock1Repeat: this.state.alarmClock1Repeat,
	                alarmClock1Ring: this.state.alarmClock1Ring,
	                alarmClock1Switch: this.state.alarmClock1Switch,
	                controlNumber: 0x03
	            };
	            _Actions.Actions.changeClock2Switch(dataJson);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var clockOneSwitch = this.state.alarmClock1Switch == 0 ? "timing-remind-right-off" : "timing-remind-right-on";
	            var clockTwoSwitch = this.state.alarmClock2Switch == 0 ? "timing-remind-right-off" : "timing-remind-right-on";
	            var repeat1 = this.state.alarmClock1Repeat == 0 ? "仅一次" : this.state.alarmClock1Repeat == 192 ? "周末" : "工作日";
	            var repeat2 = this.state.alarmClock2Repeat == 0 ? "仅一次" : this.state.alarmClock2Repeat == 192 ? "周末" : "工作日";
	            var clockOneHour = this.state.alarmClock1Hour == "--" ? this.state.alarmClock1Hour : parseInt(this.state.alarmClock1Hour) < 10 ? "0" + parseInt(this.state.alarmClock1Hour) : parseInt(this.state.alarmClock1Hour);
	            var clockOneMin = this.state.alarmClock1Minute == "--" ? this.state.alarmClock1Minute : parseInt(this.state.alarmClock1Minute) < 10 ? "0" + parseInt(this.state.alarmClock1Minute) : parseInt(this.state.alarmClock1Minute);
	            var clockTwoHour = this.state.alarmClock2Hour == "--" ? this.state.alarmClock2Hour : parseInt(this.state.alarmClock2Hour) < 10 ? "0" + parseInt(this.state.alarmClock2Hour) : parseInt(this.state.alarmClock2Hour);
	            var clockTwoMin = this.state.alarmClock2Minute == "--" ? this.state.alarmClock2Minute : parseInt(this.state.alarmClock2Minute) < 10 ? "0" + parseInt(this.state.alarmClock2Minute) : parseInt(this.state.alarmClock2Minute);
	            var colockOne = clockOneHour + ":" + clockOneMin;
	            var colockTwo = clockTwoHour + ":" + clockTwoMin;
	            return React.createElement(
	                'div',
	                { className: 'lists' },
	                React.createElement(
	                    'div',
	                    { className: 'list-timing' },
	                    React.createElement(
	                        Link,
	                        { to: '/Timing?id=1' },
	                        React.createElement(
	                            'div',
	                            { className: 'list-timing-left' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                colockOne
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                repeat1
	                            )
	                        )
	                    ),
	                    React.createElement('i', { className: clockOneSwitch, onTouchStart: this.clockOneSwitch.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'list-timing' },
	                    React.createElement(
	                        Link,
	                        { to: '/Timing?id=2' },
	                        React.createElement(
	                            'div',
	                            { className: 'list-timing-left' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                colockTwo
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                repeat2
	                            )
	                        )
	                    ),
	                    React.createElement('i', { className: clockTwoSwitch, onTouchStart: this.clockTwoSwitch.bind(this) })
	                ),
	                React.createElement(_toast.Toast, { show: this.state.toastShow, tips: this.state.tips })
	            );
	        }
	    }]);
	    return List;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Timing = undefined;

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

	var _PickerTime = __webpack_require__(107);

	var _toast = __webpack_require__(101);

	var _range = __webpack_require__(102);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var Timing = exports.Timing = function (_BaseComponent) {
	    (0, _inherits3.default)(Timing, _BaseComponent);

	    function Timing(props) {
	        (0, _classCallCheck3.default)(this, Timing);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Timing.__proto__ || (0, _getPrototypeOf2.default)(Timing)).call(this, props));

	        _this.state = {
	            timingBtnIsOn: 0,
	            timingBtnBgClassName: "trunOffBgColor",
	            timingBtnClassName: "timing-awaken-off",
	            hours: "00",
	            minutes: "00",
	            tips: "",
	            tipsClassName: "toast-hide",
	            btnCont: "保存",
	            hoursIndex: 0,
	            minIndex: 0,
	            state: "",
	            daySelect: "none",
	            work: "selected",
	            week: "",
	            repeat: "工作日",
	            music: "timing-setting-music-right-on",
	            light: "timing-setting-light-right-on",
	            later: "timing-remind-right-on",
	            mark: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(Timing, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var id = this.props.location.query.id;
	            _Actions.Actions.getData(id);
	            this.reGetData();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {}
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            //
	            clearInterval(window.dataTimer);
	            window.dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'changeState',
	        value: function changeState() {
	            if (this.state.timingBtnIsOn == 1) {
	                this.setState({
	                    timingBtnIsOn: 0,
	                    timingBtnBgClassName: "trunOffBgColor",
	                    timingBtnClassName: "timing-awaken-off"
	                });
	            } else {
	                this.setState({
	                    timingBtnIsOn: 1,
	                    timingBtnBgClassName: "trunOnBgColor",
	                    timingBtnClassName: "timing-awaken-on"
	                });
	            }
	        }
	    }, {
	        key: 'setTime',
	        value: function setTime() {
	            this.setState({
	                hours: parseInt(arguments[0]),
	                minutes: parseInt(arguments[1])
	            });
	        }
	    }, {
	        key: 'submitTime',
	        value: function submitTime() {
	            console.log(0);
	        }
	    }, {
	        key: 'formatDateTime',
	        value: function formatDateTime() {
	            var h = this.state.hours;
	            var m = this.state.minutes;
	            var s = "00";
	            m = m == "0" ? '00' : m; //这是处理来自时间控件的数据
	            var time = new Date().getTime();
	            var newDate = time + 1 * 24 * 60 * 60 * 1000;
	            var day = new Date(newDate);
	            var setTime = this.formatDate(new Date()) + ' ' + h + ':' + m + ':' + s;
	            var setTimeString = setTime.replace(/-/g, "/");
	            var Timing = new Date(setTimeString).getTime();
	            console.log(Timing - time);
	            if (Timing > time) {
	                return setTime;
	            } else {
	                return this.formatDate(day) + ' ' + h + ':' + m + ':' + s;
	            }
	        }
	    }, {
	        key: 'formatDate',
	        value: function formatDate(day) {
	            var y = day.getFullYear();
	            var m = day.getMonth() + 1;
	            m = m < 10 ? '0' + m : m;
	            var d = day.getDate();
	            d = d < 10 ? '0' + d : d;
	            return y + '-' + m + '-' + d;
	        }
	    }, {
	        key: 'changeDay',
	        value: function changeDay(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            if (this.state.daySelect == "none") {
	                this.setState({
	                    daySelect: "block"
	                });
	            } else {
	                this.setState({
	                    daySelect: "none"
	                });
	            }
	        }
	    }, {
	        key: 'selectWork',
	        value: function selectWork(e) {
	            this.setState({
	                work: "selected",
	                week: "",
	                repeat: "工作日"
	            });
	            console.log(this.state.work);
	        }
	    }, {
	        key: 'selectWeek',
	        value: function selectWeek(e) {
	            this.setState({
	                work: "",
	                week: "selected",
	                repeat: "周末"
	            });
	        }
	    }, {
	        key: 'setTiming',
	        value: function setTiming() {
	            if (this.state.music == "timing-setting-music-right-on") {
	                this.setState({
	                    music: 'timing-setting-music-right-off'
	                });
	            } else {
	                this.setState({
	                    music: 'timing-setting-music-right-on'
	                });
	            }
	        }
	    }, {
	        key: 'setLight',
	        value: function setLight() {
	            if (this.state.light == "timing-setting-light-right-on") {
	                this.setState({
	                    light: 'timing-setting-light-right-off'
	                });
	            } else {
	                this.setState({
	                    light: 'timing-setting-light-right-on'
	                });
	            }
	        }
	    }, {
	        key: 'later',
	        value: function later() {
	            if (this.state.later == "timing-remind-right-on") {
	                this.setState({
	                    later: 'timing-remind-right-off'
	                });
	            } else {
	                this.setState({
	                    later: 'timing-remind-right-on'
	                });
	            }
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock() {
	            console.log(this.state);
	            var id = this.props.location.query.id;
	            if (id == 1) {
	                var repeat = this.state.repeat == "周末" ? 192 : 126;
	                var light = this.state.light == "timing-setting-light-right-on" ? 1 : 0;
	                var later = this.state.later == "timing-remind-right-on" ? 1 : 0;
	                var hours = this.state.hours;
	                var minutes = this.state.minutes;
	                var dataJson = {
	                    id: 1,
	                    alarmClock1Bell: later,
	                    alarmClock1Hour: hours,
	                    alarmClock1Light: this.state.alarmClock1Light,
	                    alarmClock1LightMode: light,
	                    alarmClock1Minute: minutes,
	                    alarmClock1Nap: later,
	                    alarmClock1Repeat: repeat,
	                    alarmClock1Ring: this.state.alarmClock1Ring,
	                    alarmClock1Switch: this.state.alarmClock1Switch,
	                    alarmClock2Bell: this.state.alarmClock2Bell,
	                    alarmClock2Hour: this.state.alarmClock2Hour,
	                    alarmClock2Light: this.state.alarmClock2Light,
	                    alarmClock2LightMode: this.state.alarmClock2LightMode,
	                    alarmClock2Minute: this.state.alarmClock2Minute,
	                    alarmClock2Nap: this.state.alarmClock2Nap,
	                    alarmClock2Repeat: this.state.alarmClock2Repeat,
	                    alarmClock2Ring: this.state.alarmClock2Ring,
	                    alarmClock2Switch: this.state.alarmClock2Switch,
	                    controlNumber: 0x03
	                };
	                _Actions.Actions.saveClock(dataJson);
	                console.log(dataJson);
	            } else {
	                //console.log(0x40|0x80) 周末 192;
	                //console.log(0x02|0x04|0x08|0x010|0x20) 工作日 62;
	                var _repeat = this.state.repeat == "周末" ? 192 : 62;
	                var _light = this.state.light == "timing-setting-light-right-on" ? 1 : 0;
	                var _later = this.state.later == "timing-remind-right-on" ? 1 : 0;
	                var _hours = this.state.hours;
	                var _minutes = this.state.minutes;
	                var _dataJson = {
	                    id: 0,
	                    alarmClock1Bell: this.state.alarmClock1Bell,
	                    alarmClock1Hour: this.state.alarmClock1Hour,
	                    alarmClock1Light: 100,
	                    alarmClock1LightMode: this.state.alarmClock1LightMode,
	                    alarmClock1Minute: this.state.alarmClock1Minute,
	                    alarmClock1Nap: this.state.alarmClock1Nap,
	                    alarmClock1Repeat: this.state.alarmClock1Repeat,
	                    alarmClock1Ring: this.state.alarmClock1Ring,
	                    alarmClock1Switch: this.state.alarmClock1Switch,
	                    alarmClock2Bell: _later,
	                    alarmClock2Hour: _hours,
	                    alarmClock2Light: 100,
	                    alarmClock2LightMode: _light,
	                    alarmClock2Minute: _minutes,
	                    alarmClock2Nap: _later,
	                    alarmClock2Repeat: _repeat,
	                    alarmClock2Ring: this.state.alarmClock2Ring,
	                    alarmClock2Switch: this.state.alarmClock2Switch,
	                    controlNumber: 0x03
	                };
	                _Actions.Actions.saveClock(_dataJson);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'timing' },
	                React.createElement(
	                    'div',
	                    { className: 'timing-select' },
	                    React.createElement('div', { className: 'timing-space' }),
	                    React.createElement(_PickerTime.PickerTime, { submitClock: this.setTime.bind(this), hoursIndex: this.state.hoursIndex, minIndex: this.state.minIndex, state: this.state.state })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'timing-setting' },
	                    React.createElement(
	                        'div',
	                        { className: 'timing-setting-list timing-setting-day', onTouchStart: this.changeDay.bind(this) },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u91CD\u590D'
	                        ),
	                        React.createElement(
	                            'i',
	                            { className: 'timing-setting-day-right' },
	                            this.state.repeat
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'timing-setting-music timing-setting-list' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u94C3\u58F0'
	                        ),
	                        React.createElement(
	                            'i',
	                            { className: 'timing-setting-day-right' },
	                            '\u6B22\u5FEB\u8DF3\u8DC3'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'timing-light-remind timing-setting-list' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u706F\u5149\u5524\u9192'
	                        ),
	                        React.createElement('i', { className: this.state.light, onTouchStart: this.setLight.bind(this) })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'timing-remind timing-setting-list' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u94C3\u58F0\u5524\u9192'
	                        ),
	                        React.createElement('i', { className: this.state.later, onTouchStart: this.later.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'timing-submit', onTouchEnd: this.submitClock.bind(this) },
	                    React.createElement(
	                        'span',
	                        null,
	                        this.state.btnCont
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'select-day', style: { display: this.state.daySelect }, onTouchStart: this.changeDay.bind(this) },
	                    React.createElement(
	                        'div',
	                        { className: 'select-list' },
	                        React.createElement(
	                            'div',
	                            { id: 'workDays', onTouchStart: this.selectWork.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u5DE5\u4F5C\u65E5'
	                            ),
	                            React.createElement('i', { className: this.state.work })
	                        ),
	                        React.createElement(
	                            'div',
	                            { id: 'week', onTouchStart: this.selectWeek.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u5468\u672B'
	                            ),
	                            React.createElement('i', { className: this.state.week })
	                        )
	                    )
	                ),
	                React.createElement(_toast.Toast, { show: this.state.toastShow, tips: this.state.tips })
	            );
	        }
	    }]);
	    return Timing;
	}(_BaseComponentClass.BaseComponent);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.PickerTime = undefined;

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

	var PickerTime = exports.PickerTime = function (_BaseComponent) {
	   (0, _inherits3.default)(PickerTime, _BaseComponent);

	   function PickerTime(porps) {
	      (0, _classCallCheck3.default)(this, PickerTime);

	      var _this2 = (0, _possibleConstructorReturn3.default)(this, (PickerTime.__proto__ || (0, _getPrototypeOf2.default)(PickerTime)).call(this, porps));

	      _this2.state = {
	         hours: "00",
	         minutes: "00"
	      };
	      _this2.listenStore(_Store.Store); //监听Store
	      return _this2;
	   }

	   (0, _createClass3.default)(PickerTime, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	         var _this = this;
	         window.mySwiper0 = new Swiper('.pickerTime-hours', {
	            direction: 'vertical',
	            freeMode: true,
	            freeModeSticky: true,
	            onInit: function onInit(swiper) {
	               if (swiper.activeIndex < 10) {
	                  _this.setState({
	                     hours: "0" + swiper.activeIndex
	                  });
	               } else {
	                  _this.setState({
	                     hours: swiper.activeIndex
	                  });
	               }
	               _this.submitclock();
	            },
	            onSlideChangeEnd: function onSlideChangeEnd(swiper) {
	               if (swiper.activeIndex < 10) {
	                  _this.setState({
	                     hours: "0" + swiper.activeIndex
	                  });
	               } else {
	                  _this.setState({
	                     hours: swiper.activeIndex
	                  });
	               }
	               _this.submitclock();
	            },
	            onTouchEnd: function onTouchEnd(swiper) {
	               if (swiper.activeIndex < 10) {
	                  _this.setState({
	                     hours: "0" + swiper.activeIndex
	                  });
	               } else {
	                  _this.setState({
	                     hours: swiper.activeIndex
	                  });
	               }
	               _this.submitclock();
	            }
	         });
	         window.mySwiper1 = new Swiper('.pickerTime-min', {
	            direction: 'vertical',
	            freeMode: true,
	            freeModeSticky: true,
	            onInit: function onInit(swiper) {
	               _this.submitclock();
	            },
	            onSlideChangeEnd: function onSlideChangeEnd(swiper) {
	               console.log(swiper.activeIndex);
	               if (swiper.activeIndex < 10) {
	                  _this.setState({
	                     minutes: "0" + swiper.activeIndex
	                  });
	               } else {
	                  _this.setState({
	                     minutes: swiper.activeIndex
	                  });
	               }
	               _this.submitclock();
	            },
	            onTouchEnd: function onTouchEnd(swiper) {
	               console.log(swiper.activeIndex);
	               if (swiper.activeIndex < 10) {
	                  _this.setState({
	                     minutes: "0" + swiper.activeIndex
	                  });
	               } else {
	                  _this.setState({
	                     minutes: swiper.activeIndex
	                  });
	               }
	               _this.submitclock();
	            }
	         });
	      }
	   }, {
	      key: 'submitclock',
	      value: function submitclock(e) {
	         if (typeof this.props.submitClock === 'function') {
	            this.props.submitClock(this.state.hours, this.state.minutes);
	         } else {
	            console.log('error:the submit callback is not a function');
	         }
	      }
	   }, {
	      key: 'stopDefult',
	      value: function stopDefult(e) {
	         e.stopPropagation();
	         e.preventDefault();
	      }
	   }, {
	      key: 'render',
	      value: function render() {
	         var _this = this;
	         var list = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
	         var arr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	         return React.createElement(
	            'div',
	            { className: 'pickerTime' },
	            React.createElement('div', { className: 'pickerTime-top', onTouchStart: this.stopDefult.bind(this) }),
	            React.createElement(
	               'div',
	               { className: 'pickerTime-center' },
	               React.createElement(
	                  'span',
	                  null,
	                  '\u65F6'
	               ),
	               React.createElement(
	                  'span',
	                  null,
	                  '\u5206'
	               )
	            ),
	            React.createElement('div', { className: 'pickerTime-bottom', onTouchStart: this.stopDefult.bind(this) }),
	            React.createElement(
	               'div',
	               { className: 'pickerTime-hours' },
	               React.createElement(
	                  'div',
	                  { className: 'swiper-wrapper' },
	                  list.map(function (items, index) {
	                     return React.createElement(
	                        'div',
	                        { key: index, className: 'swiper-slide' },
	                        items
	                     );
	                  })
	               )
	            ),
	            React.createElement(
	               'div',
	               { className: 'pickerTime-min' },
	               React.createElement(
	                  'div',
	                  { className: 'swiper-wrapper' },
	                  arr.map(function (items, index) {
	                     return React.createElement(
	                        'div',
	                        { key: index, className: 'swiper-slide' },
	                        items
	                     );
	                  })
	               )
	            )
	         );
	      }
	   }]);
	   return PickerTime;
	}(_BaseComponentClass.BaseComponent); /**
	                                       * 基于 swiper的选择器
	                                       * 说明：大多数数据都是写死的而且是基于swiper的所以应用面非常窄
	                                       * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	                                       * @author   Yanan
	                                       */

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Switch = undefined;

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

	/*
	 	表单控件  开关
	 	参数：
	 	changeState： function类型  点击开关的回调函数；
	*/

	//定义样式表

	var styleAll = {
	    timingAwakenRight: {
	        width: "4.25rem",
	        height: "2.5rem"
	    },
	    trunOffBgColor: {
	        width: " 4.25rem",
	        height: "2.5rem",
	        border: "1px solid #e2e2e2",
	        borderRadius: " 2.5rem ",
	        position: " relative",
	        background: " #F3F3F3"
	    },
	    timingAwakenOff: {
	        position: " absolute",
	        left: " -1px",
	        top: "0px",
	        display: " block",
	        width: " 2.4rem",
	        height: "2.4rem",
	        border: "1px solid #e2e2e2",
	        borderRadius: " 2.5rem",
	        background: " #fff"
	    },
	    trunOnBgColor: {
	        width: " 4.25rem",
	        height: "2.5rem",
	        border: "1px solid #e2e2e2",
	        borderRadius: " 2.5rem ",
	        position: " relative",
	        background: " #9C7BDF"
	    },
	    timingAwakenOn: {
	        position: " absolute",
	        right: " -1px",
	        top: "0px",
	        display: " block",
	        width: " 2.4rem",
	        height: "2.4rem",
	        border: "1px solid #e2e2e2",
	        borderRadius: " 2.5rem",
	        background: " #fff"
	    }
	};

	var Switch = exports.Switch = function (_React$Component) {
	    (0, _inherits3.default)(Switch, _React$Component);

	    function Switch(props) {
	        (0, _classCallCheck3.default)(this, Switch);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || (0, _getPrototypeOf2.default)(Switch)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    (0, _createClass3.default)(Switch, [{
	        key: "changeState",
	        value: function changeState() {
	            if (typeof this.props.changeState === 'function') {
	                this.props.changeState();
	            } else {
	                console.log('error:the changeState callback is not a function');
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var openPClass = this.props.on == true ? styleAll.trunOnBgColor : styleAll.trunOffBgColor;
	            var openSClass = this.props.on == true ? styleAll.timingAwakenOn : styleAll.timingAwakenOff;
	            return React.createElement(
	                "div",
	                { style: styleAll.timingAwakenRight },
	                React.createElement(
	                    "p",
	                    { style: openPClass, onTouchEnd: this.changeState.bind(this) },
	                    React.createElement("span", { style: openSClass })
	                )
	            );
	        }
	    }]);
	    return Switch;
	}(React.Component);

/***/ })
/******/ ]);