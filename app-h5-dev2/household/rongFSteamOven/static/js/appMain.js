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

	module.exports = __webpack_require__(94);


/***/ },
/* 1 */,
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
	'getData', // 获取页面状态
	'onOff', // //处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
	'swicthMode', // //切换直接开始烘焙模式
	'swicthStove', // 炉灯开关事件
	'cancel', //取消状态
	'modeStart', //模式选择
	'changeTampTime', //修改烘培温度及时间
	'menuMode', 'nextStep', 'getMenuList']);

/***/ },
/* 89 */
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

	var _stringify = __webpack_require__(90);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _Actions = __webpack_require__(88);

	var _StateModel = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var stateModel = new _StateModel.StateModel();

	var AppData = {
	    'networkavailable': 1,
	    'online': 1
	};
	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};

	//判断手机是否断网
	var isNetOff = function isNetOff() {
	    return AppData.networkavailable == 2;
	};

	// 数据过滤计时器
	var dataFilterTimers = {
	    MachineOperationState: 0
	};

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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas) {
	        var data = dataFilter(datas);
	        console.log("onRepaint data====>" + (0, _stringify2.default)(data));
	        //console.log('data',data);
	        //产品id
	        if (!!data.productId) AppData.productId = data.productId;
	        //设备id
	        if (!!data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (!!data.online) {
	            AppData.online = data.online;
	        }
	        if (!!data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;
	        }

	        //回退数据重渲缓存
	        if (data.DeviceSwitch != undefined) {
	            AppData.DeviceSwitch = data.DeviceSwitch;
	        } //开关设置
	        if (data.StoveSwitch != undefined) AppData.StoveSwitch = data.StoveSwitch; //炉灯开关设置
	        if (data.FunctionSelect != undefined) AppData.FunctionSelect = data.FunctionSelect; //功能选择
	        if (data.WorkTempSetHight8b != undefined) AppData.WorkTempSetHight8b = data.WorkTempSetHight8b; //工作温度设置（高位）
	        if (data.WorkTempSetLow8b != undefined) AppData.WorkTempSetLow8b = data.WorkTempSetLow8b; //工作温度设置（低位）
	        if (data.WorkTimeSetHour != undefined) AppData.WorkTimeSetHour = data.WorkTimeSetHour; //工作时间设置(小时)：
	        if (data.WorkTimeSetMinute != undefined) AppData.WorkTimeSetMinute = data.WorkTimeSetMinute; //工作时间设置(分钟)

	        //运行数据字段
	        if (data.HadSetTotalTimeHour != undefined) AppData.HadSetTotalTimeHour = data.HadSetTotalTimeHour;
	        if (data.HadSetTotalTimeMinute != undefined) AppData.HadSetTotalTimeMinute = data.HadSetTotalTimeMinute;
	        if (data.CurrentTimeRemainHour != undefined) AppData.CurrentTimeRemainHour = data.CurrentTimeRemainHour;
	        if (data.CurrentTimeRemainMinute != undefined) AppData.CurrentTimeRemainMinute = data.CurrentTimeRemainMinute;
	        if (data.HadSetTempHight8b != undefined) AppData.HadSetTempHight8b = data.HadSetTempHight8b;
	        if (data.HadSetTempLow8b != undefined) AppData.HadSetTempLow8b = data.HadSetTempLow8b;
	        if (data.CurrentTempHight8b != undefined) AppData.CurrentTempHight8b = data.CurrentTempHight8b;
	        if (data.CurrentTempLow8b != undefined) AppData.CurrentTempLow8b = data.CurrentTempLow8b;
	        if (data.WaterBoxStatus != undefined) AppData.WaterBoxStatus = data.WaterBoxStatus;
	        if (data.StoveStatus != undefined) AppData.StoveStatus = data.StoveStatus;
	        if (data.CurrentWorkMode != undefined) AppData.CurrentWorkMode = data.CurrentWorkMode;
	        if (data.SysStatus != undefined && (parseInt(data.SysStatus) < 3 || parseInt(data.SysStatus) == 5)) {
	            //(0-无操作，1-关机，2-待机，3-运行)   (0-关机，1-待机，2-运行)
	            if (parseInt(data.SysStatus) == 5) {
	                if (parseInt(data.CurrentWorkMode) != 0) {
	                    AppData.DeviceSwitch = 3;
	                    data.DeviceSwitch = 3;
	                } else {
	                    AppData.DeviceSwitch = 2;
	                    data.DeviceSwitch = 2;
	                }
	            } else {
	                AppData.DeviceSwitch = parseInt(data.SysStatus + 1);
	                data.DeviceSwitch = parseInt(data.SysStatus + 1);
	            }
	            AppData.SysStatus = data.SysStatus;
	        }
	        if (data.CookBookTotalSteps != undefined) AppData.CookBookTotalSteps = data.CookBookTotalSteps;
	        if (data.CookBookCurStep != undefined) AppData.CookBookCurStep = data.CookBookCurStep;
	        if (data.CookBookCurTempH8b != undefined) AppData.CookBookCurTempH8b = data.CookBookCurTempH8b;
	        if (data.CookBookCurTempL8b != undefined) AppData.CookBookCurTempL8b = data.CookBookCurTempL8b;
	        if (data.CookBookCurTimeRemainHour != undefined) AppData.CookBookCurTimeRemainHour = data.CookBookCurTimeRemainHour;
	        if (data.CookBookCurTimeRemainMin != undefined) AppData.CookBookCurTimeRemainMin = data.CookBookCurTimeRemainMin;
	        if (data.CookBookCurIsPause != undefined) AppData.CookBookCurIsPause = data.CookBookCurIsPause;
	        if (data.CookBookHight8b != undefined) AppData.CookBookHight8b = data.CookBookHight8b;
	        if (data.CookBookLow8b != undefined) AppData.CookBookLow8b = data.CookBookLow8b;

	        //故障数据字段
	        if (data.ErrorStatus != undefined) {
	            AppData.ErrorStatus = data.ErrorStatus; //传感器错误
	        }
	        console.log("onRepaint AppData====>" + (0, _stringify2.default)(AppData));
	        this.trigger(data);
	    },
	    onGetData: function onGetData() {
	        console.log("AppData=" + (0, _stringify2.default)(AppData));
	        this.trigger(AppData);
	    },
	    onOnOff: function onOnOff(value) {
	        var _this2 = this;

	        //处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.DeviceSwitch = value;
	        AppData.StoveSwitch = 0;
	        AppData.FunctionSelect = 0;
	        AppData.StoveStatus = 0;
	        AppData.workStatus = 0;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 4);
	        het.send({ DeviceSwitch: AppData.DeviceSwitch, updateFlag: AppData.updateFlag }, function (data) {
	            AppData.SysStatus = parseInt(value - 1);
	            setDataTimer('SysStatus');
	            console.log('成功');
	            _this2.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwicthMode: function onSwicthMode(mode) {
	        //直接启动的模式
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        var defTime = parseInt(stateModel.getAll()[parseInt(mode - 1)].defTime); //设置时间 如果没有选默认
	        var defTemp = parseInt(stateModel.getAll()[parseInt(mode - 1)].defTemp); //设置温度 如果没有选默认


	        AppData.DeviceSwitch = 3;
	        AppData.FunctionSelect = mode;
	        AppData.WorkTempSetHight8b = 0;
	        AppData.WorkTempSetLow8b = defTemp;
	        AppData.WorkTimeSetHour = parseInt(defTime / 60);
	        AppData.WorkTimeSetMinute = parseInt(defTime % 60);
	        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 5, 4));
	        het.send(AppData, function (data) {
	            console.log('成功');
	            AppData.CurrentWorkMode = AppData.FunctionSelect;
	            AppData.SysStatus = 2;
	            setDataTimer('CurrentWorkMode', 'SysStatus');
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger({
	            DeviceSwitch: AppData.DeviceSwitch,
	            FunctionSelect: AppData.FunctionSelect,
	            selectModel: 0,
	            CurrentWorkMode: AppData.FunctionSelect
	        });
	    },
	    onSwicthStove: function onSwicthStove(stoveSwitch) {
	        var _this3 = this;

	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.StoveSwitch = stoveSwitch;
	        AppData.updateFlag = het.hexUpFlag(1, 1, 4);
	        het.send(AppData, function (data) {
	            console.log('成功');
	            AppData.StoveStatus = stoveSwitch - 1;
	            setDataTimer('StoveStatus');
	            _this3.trigger({ StoveSwitch: AppData.StoveSwitch, StoveStatus: AppData.StoveStatus });
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onCancel: function onCancel() {
	        var _this4 = this;

	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.DeviceSwitch = 2;
	        AppData.FunctionSelect = 0;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 1, 4));

	        het.send(AppData, function (data) {
	            //取消之后手动恢复所有运行工作状态
	            AppData.HadSetTotalTimeHour = 0;
	            AppData.HadSetTotalTimeMinute = 0;
	            AppData.CurrentTimeRemainHour = 0;
	            AppData.CurrentTimeRemainMinute = 0;
	            AppData.HadSetTempHight8b = 0;
	            AppData.HadSetTempLow8b = 0;
	            AppData.CurrentTempHight8b = 0;
	            AppData.CurrentTempLow8b = 0;
	            AppData.CurrentWorkMode = 0;

	            AppData.WorkTempSetHight8b = 0;
	            AppData.WorkTempSetLow8b = 0;
	            AppData.WorkTimeSetHour = 0;
	            AppData.WorkTimeSetMinute = 0;

	            AppData.CookBookTotalSteps = 0;
	            AppData.CookBookCurStep = 0;
	            AppData.CookBookCurTempH8b = 0;
	            AppData.CookBookCurTempL8b = 0;
	            AppData.CookBookCurTimeRemainHour = 0;
	            AppData.CookBookCurTimeRemainMin = 0;
	            AppData.CookBookCurIsPause = 0;
	            AppData.CookBookHight8b = 0;
	            AppData.CookBookLow8b = 0;

	            AppData.SysStatus = 1;
	            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b', 'CurrentWorkMode', 'SysStatus');
	            _this4.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onChangeTampTime: function onChangeTampTime(setTemp, setTime) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        AppData.WorkTempSetHight8b = 0;
	        AppData.WorkTempSetLow8b = setTemp;
	        AppData.WorkTimeSetHour = parseInt(setTime / 60);
	        AppData.WorkTimeSetMinute = parseInt(setTime % 60);
	        AppData.updateFlag = het.hexUpFlag(3, 4, 4);
	        console.log('send mode', AppData);
	        het.send(AppData, function (data) {
	            console.log('onstart succee');
	            AppData.HadSetTotalTimeHour = AppData.WorkTimeSetHour;
	            AppData.HadSetTotalTimeMinute = AppData.WorkTimeSetMinute;
	            AppData.CurrentTimeRemainHour = AppData.WorkTimeSetHour;
	            AppData.CurrentTimeRemainMinute = AppData.WorkTimeSetMinute;
	            AppData.HadSetTempHight8b = 0;
	            AppData.HadSetTempLow8b = AppData.WorkTempSetLow8b;
	            AppData.CurrentTempHight8b = 0;
	            AppData.CurrentTempLow8b = AppData.WorkTempSetLow8b;

	            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b');
	            _this.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onModeStart: function onModeStart(mode, setTemp, setTime) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        AppData.DeviceSwitch = 3;
	        AppData.FunctionSelect = mode;
	        AppData.WorkTempSetHight8b = 0;
	        AppData.WorkTempSetLow8b = setTemp;
	        AppData.WorkTimeSetHour = parseInt(setTime / 60);
	        AppData.WorkTimeSetMinute = parseInt(setTime % 60);
	        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 5, 4));
	        console.log('send mode', AppData);
	        het.send(AppData, function (data) {
	            console.log('onstart succee');
	            AppData.HadSetTotalTimeHour = AppData.WorkTimeSetHour;
	            AppData.HadSetTotalTimeMinute = AppData.WorkTimeSetMinute;
	            AppData.CurrentTimeRemainHour = AppData.WorkTimeSetHour;
	            AppData.CurrentTimeRemainMinute = AppData.WorkTimeSetMinute;
	            AppData.HadSetTempHight8b = 0;
	            AppData.HadSetTempLow8b = AppData.WorkTempSetLow8b;
	            AppData.CurrentTempHight8b = 0;
	            AppData.CurrentTempLow8b = AppData.WorkTempSetLow8b;
	            AppData.CurrentWorkMode = AppData.FunctionSelect;

	            AppData.SysStatus = 2;
	            setDataTimer('HadSetTotalTimeHour', 'HadSetTotalTimeMinute', 'HadSetTempHight8b', 'HadSetTempLow8b', 'CurrentWorkMode', 'SysStatus');
	            _this.trigger(AppData);
	            history.back();
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onMenuMode: function onMenuMode(zfff) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        AppData.DeviceSwitch = 2;
	        AppData.FunctionSelect = 9;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 4, het.hexUpFlag(2, 1, 4));
	        console.log('send mode', AppData);
	        het.send(AppData, function (data) {
	            console.log('send mode succee');
	            AppData.CurrentWorkMode = AppData.FunctionSelect;
	            AppData.SysStatus = 1;
	            setDataTimer('CurrentWorkMode', 'SysStatus');
	            zfff();
	            _this.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onNextStep: function onNextStep(cookBookPauseStart) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        AppData.CookBookPauseStart = cookBookPauseStart;
	        AppData.updateFlag = het.hexUpFlag(7, 1, 4);
	        console.log('Next Step', AppData);
	        het.send(AppData, function (data) {
	            console.log('Next Step succee');
	            AppData.CookBookCurIsPause = 0;
	            _this.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onGetMenuList: function onGetMenuList(pageIndex) {
	        var cfg = {
	            pageIndex: pageIndex || 1,
	            productId: AppData.productId
	        };
	        var _this = this;
	        var url = '/v1/app/customization/cookbook/menu/menuList';
	        het.get(url, cfg, function (data) {
	            _this.trigger({ response: data });
	        }, function (data) {
	            console.log('fail sendData');
	            het.toast('请求失败，请稍后重试');
	        });
	    }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StateModel = undefined;

	var _classCallCheck2 = __webpack_require__(28);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(29);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Administrator on 2016-11-14.
	 */
	var StateModel = exports.StateModel = function () {
	    function StateModel() {
	        (0, _classCallCheck3.default)(this, StateModel);

	        this.items = [{ 'modelId': '0', 'name': '上烤', 'defTemp': '180', 'defTime': '5', 'mintemp': '120', 'maxtemp': '250', 'mintime': '5', 'maxtime': '180', photo: 'photo0' }, { 'modelId': '1', 'name': '下烤', 'defTemp': '180', 'defTime': '5', 'mintemp': '120', 'maxtemp': '250', 'mintime': '5', 'maxtime': '180', photo: 'photo1' }, { 'modelId': '2', 'name': '上下烤', 'defTemp': '180', 'defTime': '5', 'mintemp': '120', 'maxtemp': '250', 'mintime': '5', 'maxtime': '180', photo: 'photo2' }, { 'modelId': '3', 'name': '蒸煮', 'defTemp': '100', 'defTime': '5', 'mintemp': '80', 'maxtemp': '115', 'mintime': '5', 'maxtime': '180', photo: 'photo3' }, { 'modelId': '4', 'name': '高温蒸烤', 'defTemp': '180', 'defTime': '5', 'mintemp': '120', 'maxtemp': '250', 'mintime': '5', 'maxtime': '180', photo: 'photo4' }, { 'modelId': '5', 'name': '消毒', 'defTemp': '100', 'defTime': '20', 'mintemp': '100', 'maxtemp': '100', 'mintime': '20', 'maxtime': '20', photo: 'photo5' }, { 'modelId': '6', 'name': '解冻', 'defTemp': '60', 'defTime': '20', 'mintemp': '60', 'maxtemp': '60', 'mintime': '5', 'maxtime': '180', photo: 'photo6' }, { 'modelId': '7', 'name': '发酵', 'defTemp': '40', 'defTime': '20', 'mintemp': '40', 'maxtemp': '40', 'mintime': '5', 'maxtime': '180', photo: 'photo7' }];
	    }

	    (0, _createClass3.default)(StateModel, [{
	        key: 'getAll',
	        value: function getAll() {
	            return this.items;
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(index) {
	            return this.items[index];
	        }
	    }, {
	        key: 'getClassName',
	        value: function getClassName(id) {
	            for (var i in this.items) {
	                if (this.items[i].name == id) {
	                    return this.items[i];
	                }
	            }
	        }
	    }, {
	        key: 'getClassID',
	        value: function getClassID(id) {
	            for (var i in this.items) {
	                if (this.items[i].modelId == id) {
	                    return this.items[i];
	                }
	            }
	        }
	    }]);
	    return StateModel;
	}();

	;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cancelClock = exports.isCloudFinished = exports.isFinish = exports.isOwnEmpty = exports.initDataFm = exports.setTitle = exports.MAXTEMPERATURE = exports.MINTEMPERATURE = exports.RUNMODE = exports.HEADERTOP = undefined;

	var _stringify = __webpack_require__(90);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HEADERTOP = !!(navigator.userAgent.indexOf('Android') + 1) ? 73 : 64;

	var initDataFm = function initDataFm() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    //控制数据格式
	    return parseInt(value) > 9 ? parseInt(value) : "0" + parseInt(value);
	};

	var RUNMODE = ['模式', '上加热', '下加热', '上下加热'];
	var MINTEMPERATURE = [0, 50, 50, 50, 50, 50, 50, 50, 50];
	var MAXTEMPERATURE = [0, 250, 250, 250, 250, 250, 60, 235, 235];
	var CANCELCLOCK = '/v1/app/customization/cookbook/user/cancelClock';

	var setTitle = function setTitle(value) {
	    return het.setTitle((0, _stringify2.default)({
	        setNavTitle: 1,
	        title: value,
	        setNavRightBtnHiden: 1
	    }));
	};

	var isOwnEmpty = function isOwnEmpty(obj) {
	    for (var name in obj) {
	        if (obj.hasOwnProperty(name)) {
	            return false;
	        }
	    }
	    return true;
	};

	var isFinish = function isFinish(state) {
	    //判断是否烘焙完成
	    var online = state.online,
	        DeviceSwitch = state.DeviceSwitch,
	        CurrentWorkMode = state.CurrentWorkMode,
	        CookBookCurTimeRemainHour = state.CookBookCurTimeRemainHour,
	        CookBookCurTimeRemainMin = state.CookBookCurTimeRemainMin,
	        CookBookTotalSteps = state.CookBookTotalSteps,
	        CookBookCurStep = state.CookBookCurStep;

	    return online == 1 && DeviceSwitch == 3 && CurrentWorkMode == 9 && CookBookCurTimeRemainHour == 0 && CookBookCurTimeRemainMin == 0 && CookBookTotalSteps == CookBookCurStep;
	};

	var isCloudFinished = function isCloudFinished(state) {
	    var CurrentWorkMode = state.CurrentWorkMode,
	        CookBookCurTimeRemainHour = state.CookBookCurTimeRemainHour,
	        CookBookCurTimeRemainMin = state.CookBookCurTimeRemainMin,
	        CookBookTotalSteps = state.CookBookTotalSteps,
	        CookBookCurStep = state.CookBookCurStep;

	    if (CurrentWorkMode == 9 && CookBookCurTimeRemainHour == 0 && CookBookCurTimeRemainMin == 0 && CookBookTotalSteps == CookBookCurStep) {
	        return true;
	    }
	    return false;
	};

	var cancelClock = function cancelClock(state) {
	    var CookBookHight8b = state.CookBookHight8b,
	        CookBookLow8b = state.CookBookLow8b,
	        menuId = CookBookHight8b * 256 + CookBookLow8b;

	    if (menuId) {
	        het.post(CANCELCLOCK, {
	            menuId: CookBookHight8b * 256 + CookBookLow8b
	        });
	    }
	};

	exports.HEADERTOP = HEADERTOP;
	exports.RUNMODE = RUNMODE;
	exports.MINTEMPERATURE = MINTEMPERATURE;
	exports.MAXTEMPERATURE = MAXTEMPERATURE;
	exports.setTitle = setTitle;
	exports.initDataFm = initDataFm;
	exports.isOwnEmpty = isOwnEmpty;
	exports.isFinish = isFinish;
	exports.isCloudFinished = isCloudFinished;
	exports.cancelClock = cancelClock;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(90);

	var _stringify2 = _interopRequireDefault(_stringify);

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

	var _BaseComponentClass = __webpack_require__(95);

	var _Actions = __webpack_require__(88);

	var _Store = __webpack_require__(89);

	var _SelectModel = __webpack_require__(97);

	var _MenuList = __webpack_require__(99);

	var _MenuDetail = __webpack_require__(132);

	var _Range = __webpack_require__(98);

	var _StateModel = __webpack_require__(92);

	var _DialogStyle = __webpack_require__(160);

	var _constants = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Funs} from '../../../common/src/fun.es6';
	var stateModel = new _StateModel.StateModel();

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        het.setTitle((0, _stringify2.default)({ setNavTitle: 0, setNavRightBtnHiden: 0 }));
	        _this.state = {
	            showChangeView: false,
	            tempVal: 0,
	            timeVal: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store

	        _this.cancelTipsDialog = function () {
	            _this.setState({
	                showTipsDialog: false
	            });
	        };
	        _this.submitTipsDialog = function () {
	            _this.setState({
	                showTipsDialog: false
	            });
	            _this.modelCancel();
	        };

	        _this.cancelErrorDialog = function () {
	            _this.setState({
	                showErrorDialog: false
	            });
	        };
	        _this.submitErrorDialog = function () {
	            location.href = "tel:4008110168";
	            _this.setState({
	                showErrorDialog: false
	            });
	        };
	        _Actions.Actions.getData();
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            //故障判断
	            var errorContent = '';
	            var curErrorStatus = parseInt(this.state.ErrorStatus) || 0;
	            var nextErrorStatus = parseInt(nextState.ErrorStatus) || 0;
	            if (curErrorStatus != nextErrorStatus) {
	                switch (nextErrorStatus) {
	                    case 0:
	                        errorContent = '';
	                        break;
	                    case 1:
	                        errorContent = '炉腔高温保护装置启动';
	                        break;
	                    case 2:
	                        errorContent = '蒸发盘高温保护装置启动';
	                        break;
	                    case 3:
	                        errorContent = '炉腔高低温保护装置启动';
	                        break;
	                    case 4:
	                        errorContent = '蒸发盘低温保护装置启动';
	                        break;
	                    case 5:
	                        errorContent = '温度传感器连接发生故障';
	                        break;
	                    case 6:
	                        errorContent = '温度传感器发生故障';
	                        break;
	                    case 7:
	                        errorContent = '电路板故障';
	                        break;2;
	                }
	                if (errorContent.length > 0) {
	                    this.setState({
	                        showTipsDialog: false,
	                        showErrorDialog: true,
	                        errorContent: errorContent
	                    });
	                } else {
	                    this.setState({
	                        showErrorDialog: false,
	                        errorContent: errorContent
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'handleOnOff',
	        value: function handleOnOff() {
	            //处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (this.haveError()) return false;
	            var deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
	            deviceSwitch == 1 ? deviceSwitch = 2 : deviceSwitch = 1;
	            _Actions.Actions.onOff(deviceSwitch);
	        }
	    }, {
	        key: 'handleSelectModel',
	        value: function handleSelectModel(e) {
	            e.stopPropagation();
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            var curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
	            if (parseInt(this.state.DeviceSwitch || 1) == 1 || curWorkMode == 9) return false;
	            if (this.haveError()) return false;
	            if (curWorkMode == 9 || curWorkMode == 6) return false;
	            if (curWorkMode == 0) {
	                location.href = "#/SelectModel";
	            } else {
	                this.setState({ 'showChangeView': true });
	            }
	            e.preventDefault();
	        }
	    }, {
	        key: 'handleStove',
	        value: function handleStove() {
	            //炉灯开关
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (parseInt(this.state.DeviceSwitch || 1) == 1) return false;
	            if (this.haveError()) return false;
	            var stoveSwitch = parseInt(this.state.StoveSwitch) || 1;
	            stoveSwitch == 1 ? stoveSwitch = 2 : stoveSwitch = 1;
	            _Actions.Actions.swicthStove(stoveSwitch);
	        }
	    }, {
	        key: 'handleMenu',
	        value: function handleMenu() {
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (parseInt(this.state.DeviceSwitch || 1) == 1) return false;
	            if (this.haveError()) return false;
	            // het.toast("敬请期待");
	            var curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
	            var _state = this.state,
	                CookBookHight8b = _state.CookBookHight8b,
	                CookBookLow8b = _state.CookBookLow8b;

	            var menuId = CookBookHight8b * 256 + CookBookLow8b;
	            location.href = '#/' + (menuId && curWorkMode == 9 ? 'MenuDetail?menuId=' + menuId : 'MenuList');
	        }
	    }, {
	        key: 'handleCancel',
	        value: function handleCancel() {
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (!this.isCanCancel() || this.haveError()) return false;
	            this.setState({
	                showTipsDialog: true
	            });
	        }
	    }, {
	        key: 'modelCancel',
	        value: function modelCancel() {
	            //取消所有状态  变成待机中
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (!this.isCanCancel() || this.haveError()) return false;
	            _Actions.Actions.cancel();
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({
	                'tempVal': value
	            });
	        }
	    }, {
	        key: 'handleWorkTimeSet',
	        value: function handleWorkTimeSet(value) {
	            this.setState({
	                'timeVal': value
	            });
	        }
	    }, {
	        key: 'handleDialogCancel',
	        value: function handleDialogCancel() {
	            var curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
	            var curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
	            var curTempHight8b = this.state.CurrentTempHight8b || 0;
	            var curTempLow8b = this.state.CurrentTempLow8b || 0;
	            this.setState({
	                'tempVal': +curTempHight8b * 256 + +curTempLow8b,
	                'timeVal': curTimeRemainHour * 60 + curTimeRemainMinute,
	                'showChangeView': false
	            });
	        }
	    }, {
	        key: 'handleDialogConfirm',
	        value: function handleDialogConfirm() {
	            var curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
	            var curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
	            var curTempHight8b = this.state.CurrentTempHight8b || 0;
	            var curTempLow8b = this.state.CurrentTempLow8b || 0;
	            var curTempVal = +curTempHight8b * 256 + +curTempLow8b;
	            var tempVal = this.state.tempVal || curTempVal;
	            var timeVal = this.state.timeVal || curTimeRemainHour * 60 + curTimeRemainMinute;
	            _Actions.Actions.changeTampTime(tempVal, timeVal);
	            this.setState({
	                'showChangeView': false
	            });
	        }
	    }, {
	        key: 'haveError',
	        value: function haveError() {
	            if (parseInt(this.state.ErrorStatus || 0) != 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'isCanCancel',
	        value: function isCanCancel() {
	            var online = parseInt(this.state.online) || 2;
	            var curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
	            var deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
	            if (online == 1 && deviceSwitch == 3 && curWorkMode != 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'isWait',
	        value: function isWait() {
	            //待机中
	            var deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
	            if (deviceSwitch == 2) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var showTipsDialog = this.state.showTipsDialog;
	            var showErrorDialog = this.state.showErrorDialog;
	            var showChangeView = this.state.showChangeView; //修改温度时间对话框显示与否

	            var deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
	            var stoveStatus = parseInt(this.state.StoveStatus) || 0; //0关 1开
	            var curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
	            var curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
	            var curTempHight8b = this.state.CurrentTempHight8b || 0;
	            var curTempLow8b = this.state.CurrentTempLow8b || 0;
	            var curTempVal = +curTempHight8b * 256 + +curTempLow8b;
	            var curWorkMode = this.state.CurrentWorkMode || 0;

	            var cookBookTotalSteps = this.state.CookBookTotalSteps || 0;
	            var cookBookCurStep = this.state.CookBookCurStep || 0;
	            var cookBookCurTimeRemainHour = this.state.CookBookCurTimeRemainHour || 0;
	            var cookBookCurTimeRemainMin = this.state.CookBookCurTimeRemainMin || 0;
	            var cookBookCurTempH8b = this.state.CookBookCurTempH8b || 0;
	            var cookBookCurTempL8b = this.state.CookBookCurTempL8b || 0;
	            var cookBookCurIsPause = this.state.CookBookCurIsPause || 0;
	            var cookBookCurTempVal = +cookBookCurTempH8b * 256 + +cookBookCurTempL8b;

	            var tempVal = this.state.tempVal || curTempVal;
	            var timeVal = this.state.timeVal || curTimeRemainHour * 60 + curTimeRemainMinute;

	            var textTime = (0, _constants.initDataFm)(parseInt(timeVal / 60)) + ":" + (0, _constants.initDataFm)(timeVal % 60);

	            var modeName = '模式',
	                minTemp = 40,
	                maxTemp = 250,
	                minTime = 5,
	                maxTime = 180;
	            if (deviceSwitch == 3 && curWorkMode != 0 && curWorkMode != 9) {
	                var modeIndex = curWorkMode - 1;
	                modeName = stateModel.getItem(modeIndex).name || '模式';
	                minTemp = parseInt(stateModel.getItem(modeIndex).mintemp) || 40;
	                maxTemp = parseInt(stateModel.getItem(modeIndex).maxtemp) || 250;
	                minTime = parseInt(stateModel.getItem(modeIndex).mintime) || 5;
	                maxTime = parseInt(stateModel.getItem(modeIndex).maxtime) || 180;
	            }

	            var statusArry = ['待机中', '烘焙中', '已关机', '离线中', '暂停', '烘培完成'];
	            var workText = parseInt(this.state.online) == 2 ? statusArry[3] : deviceSwitch == 1 ? statusArry[2] : this.isWait() ? statusArry[0] : (0, _constants.isFinish)(this.state) ? statusArry[5] : cookBookCurIsPause == 1 ? statusArry[4] : statusArry[1];
	            if (deviceSwitch == 3 && curWorkMode == 9 && cookBookCurStep != 0 && cookBookTotalSteps != 0) {
	                workText = workText + ' ' + cookBookCurStep + "/" + cookBookTotalSteps;
	            }
	            var modeImgPath = '../static/img/';
	            var online = parseInt(this.state.online) || 1;
	            if (deviceSwitch == 3 && curWorkMode != 0 && curWorkMode != 9) {
	                modeImgPath = modeImgPath + "icon-mode" + (curWorkMode - 1) + '-selected.png';
	            } else {
	                modeImgPath = modeImgPath + 'icon-mode-normal.png';
	            }
	            var isNotNperate = online == 2 || deviceSwitch == 1;
	            console.log("====>curWorkMode=" + curWorkMode);

	            var errorContent = this.state.errorContent || '';
	            return React.createElement(
	                'section',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    {
	                        className: 'app-top-container' },
	                    React.createElement(
	                        'article',
	                        { className: 'onoff-art', onTouchEnd: this.handleOnOff.bind(this) },
	                        React.createElement('img', { style: { display: this.isCanCancel() ? "none" : "", opacity: online == 2 ? 0.3 : 1 },
	                            src: '../static/img/icon-onoff.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            { style: {
	                                    display: this.isCanCancel() ? "none" : "",
	                                    opacity: online == 2 ? 0.3 : 1
	                                } },
	                            deviceSwitch == 1 ? "开机" : "关机"
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-run-data' },
	                        React.createElement(
	                            'p',
	                            { className: 'stateDev' },
	                            workText
	                        ),
	                        React.createElement(
	                            'div',
	                            { style: { display: this.isCanCancel() ? "" : "none" }, className: 'app-temp-time' },
	                            online == 1 ? React.createElement(
	                                'div',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'temp-num' },
	                                    curWorkMode == 9 ? cookBookCurTempVal ? cookBookCurTempVal + '\u2103' : '--' : curTempVal ? curTempVal + '\u2103' : '--'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'time-num' },
	                                    curWorkMode == 9 ? (0, _constants.initDataFm)(cookBookCurTimeRemainHour) + ":" + (0, _constants.initDataFm)(cookBookCurTimeRemainMin) : (0, _constants.initDataFm)(curTimeRemainHour) + ":" + (0, _constants.initDataFm)(curTimeRemainMinute)
	                                )
	                            ) : '-- : --'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'dev-operate-container' },
	                    React.createElement(
	                        'div',
	                        { className: 'flex dev-control-container' },
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell', onTouchStart: this.handleSelectModel.bind(this) },
	                            React.createElement('img', {
	                                style: { opacity: isNotNperate || curWorkMode == 9 ? 0.3 : 1 },
	                                src: modeImgPath, alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: { opacity: isNotNperate || curWorkMode == 9 ? 0.3 : 1 },
	                                    className: modeName == '模式' ? "select_p2 model" : "select_p1" },
	                                modeName,
	                                React.createElement('i', null)
	                            )
	                        ),
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell', onTouchEnd: this.handleStove.bind(this) },
	                            React.createElement('img', { style: { opacity: isNotNperate ? 0.3 : 1 },
	                                src: stoveStatus == 0 ? "../static/img/icon-lamp-normal.png" : "../static/img/icon-lamp-selected.png",
	                                alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: { opacity: isNotNperate ? 0.3 : 1 },
	                                    className: stoveStatus == 0 ? "select_p2" : "select_p1" },
	                                '\u7089\u706F'
	                            )
	                        ),
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell', onTouchEnd: this.handleMenu.bind(this) },
	                            React.createElement('img', { style: { opacity: isNotNperate ? 0.3 : 1 },
	                                src: curWorkMode != 9 || isNotNperate ? "../static/img/icon-menu-normal.png" : "../static/img/icon-menu-selected.png",
	                                alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: { opacity: isNotNperate ? 0.3 : 1 },
	                                    className: curWorkMode != 9 || isNotNperate ? "select_p2" : "select_p1" },
	                                '\u4E91\u83DC\u8C31'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'footer cancelBtn', onTouchStart: this.handleCancel.bind(this) },
	                        React.createElement(
	                            'div',
	                            { style: { opacity: online == 2 || !this.isCanCancel() ? 0.3 : 1 } },
	                            React.createElement(
	                                'p',
	                                { className: 'select_p2' },
	                                '\u53D6\u6D88'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'run-set',
	                        style: showChangeView ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'run-set-content' },
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-btn flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell cancel', onTouchEnd: this.handleDialogCancel.bind(this) },
	                                '\u53D6\u6D88'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell confirm',
	                                    onTouchEnd: this.handleDialogConfirm.bind(this) },
	                                '\u786E\u5B9A'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-contrl' },
	                            React.createElement(
	                                'p',
	                                { className: 'change-title' },
	                                '修改温度时间（' + modeName + '）'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'selectTime' },
	                                '\u70D8\u7119\u6E29\u5EA6 ',
	                                tempVal,
	                                '\u2103'
	                            ),
	                            React.createElement(_Range.Range, { module: 'dialog', value: tempVal, min: minTemp, max: maxTemp, rate: 5,
	                                fnFeedback: this.handleTemperatureSet.bind(this) }),
	                            React.createElement(
	                                'p',
	                                { className: 'selectTime' },
	                                '\u65F6\u95F4 ',
	                                textTime
	                            ),
	                            React.createElement(_Range.Range, { module: 'dialog', value: timeVal, min: minTime, max: maxTime, type: 'time', rate: 1,
	                                fnFeedback: this.handleWorkTimeSet.bind(this) })
	                        )
	                    )
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: showTipsDialog, cancelClock: this.cancelTipsDialog.bind(this),
	                    submitClock: this.submitTipsDialog.bind(this), title: '\u6E29\u99A8\u63D0\u793A',
	                    content: '\u7F8E\u98DF\u70D8\u7119\u4E2D, \u786E\u5B9A\u53D6\u6D88\u5417\uFF1F', rightpam: '\u786E\u5B9A' }),
	                React.createElement(_DialogStyle.DialogStyle, { show: showErrorDialog, cancelClock: this.cancelErrorDialog.bind(this),
	                    submitClock: this.submitErrorDialog.bind(this), title: '\u8BBE\u5907\u6545\u969C',
	                    content: errorContent, rightpam: '\u8054\u7CFB\u5BA2\u670D' })
	            );
	        }
	    }]);
	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    if (location.href.match(/page\/menuDetail.html/)) {
	        // 菜单详情页面需单独选择，供app从外部跳转到项目
	        ReactDOM.render(React.createElement(_MenuDetail.MenuDetail, null), document.getElementById('ROOT'));
	    } else {
	        ReactDOM.render(React.createElement(
	            Router,
	            { history: hashHistory },
	            React.createElement(Route, { path: '/', component: App }),
	            React.createElement(Route, { path: '/SelectModel', component: _SelectModel.SelectModel }),
	            React.createElement(Route, { path: '/MenuList', component: _MenuList.MenuList }),
	            React.createElement(Route, { path: '/MenuDetail', component: _MenuDetail.MenuDetail })
	        ), document.getElementById('ROOT'));
	    }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(96);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 96 */
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectModel = undefined;

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

	var _BaseComponentClass = __webpack_require__(95);

	var _Actions = __webpack_require__(88);

	var _Store = __webpack_require__(89);

	var _Range = __webpack_require__(98);

	var _StateModel = __webpack_require__(92);

	var _constants = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import {Funs} from '../../../common/src/fun.es6';
	var stateModel = new _StateModel.StateModel();

	// 创建React组件

	var SelectModel = exports.SelectModel = function (_BaseComponent) {
	    (0, _inherits3.default)(SelectModel, _BaseComponent);

	    function SelectModel(props) {
	        (0, _classCallCheck3.default)(this, SelectModel);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (SelectModel.__proto__ || (0, _getPrototypeOf2.default)(SelectModel)).call(this, props));

	        (0, _constants.setTitle)('烘培模式');
	        _this.state = {
	            tempSet: 0,
	            timeSet: 0,
	            index: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    (0, _createClass3.default)(SelectModel, [{
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'tempSet': value });
	        }
	    }, {
	        key: 'handleWorkTimeSet',
	        value: function handleWorkTimeSet(value) {
	            this.setState({
	                'timeSet': value
	            });
	        }
	    }, {
	        key: 'startEnd',
	        value: function startEnd(e) {
	            var activeIndex = e.target.getAttribute('data-mode');
	            if (activeIndex != this.state.index) {
	                this.setState({ 'index': activeIndex, 'tempSet': 0, 'timeSet': 0, activeIndex: activeIndex });
	            }
	            //console.log('select  activeIndex',activeIndex);
	        }
	    }, {
	        key: 'modeStart',
	        value: function modeStart() {
	            if (parseInt(this.state.online) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            var curWorkMode = this.state.activeIndex || 0;
	            var defTemp = parseInt(stateModel.getAll()[parseInt(curWorkMode)].defTemp);
	            var defTime = parseInt(stateModel.getAll()[parseInt(curWorkMode)].defTime);
	            var setTemp = parseInt(this.state.tempSet == 0 ? defTemp : this.state.tempSet); //设置温度 如果没有选默认
	            var setTime = parseInt(this.state.timeSet == 0 ? defTime : this.state.timeSet); //设置时间 如果没有选默认
	            _Actions.Actions.modeStart(parseInt(curWorkMode) + 1, setTemp, setTime);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var activeIndex = this.state.activeIndex || 0;
	            var tempSet = this.state.tempSet || 0; //温度设置
	            var timeSet = this.state.timeSet || 0; //时长设置

	            var minTemp = parseInt(stateModel.getItem(activeIndex).mintemp) || 40;
	            var maxTemp = parseInt(stateModel.getItem(activeIndex).maxtemp) || 250;
	            var offeTemp = parseInt(stateModel.getItem(activeIndex).defTemp) || 120;

	            var minTime = parseInt(stateModel.getItem(activeIndex).mintime) || 5;
	            var maxTime = parseInt(stateModel.getItem(activeIndex).maxtime) || 180;
	            var offeTime = parseInt(stateModel.getItem(activeIndex).defTime) || 5;
	            if (tempSet == 0) {
	                tempSet = offeTemp;
	            }
	            if (timeSet == 0) {
	                timeSet = offeTime;
	            }
	            var textTime = (0, _constants.initDataFm)(parseInt(timeSet / 60)) + ":" + (0, _constants.initDataFm)(timeSet % 60);
	            return React.createElement(
	                'section',
	                { className: 'SetMode' },
	                React.createElement('div', { style: { height: _constants.HEADERTOP + 'px', width: '100%', backgroundColor: 'rgb(76,145,252)' } }),
	                React.createElement(
	                    'div',
	                    { className: 'modeSel' },
	                    stateModel.getAll().map(function (item, index) {
	                        return React.createElement(
	                            'div',
	                            { 'data-index': index, 'data-mode': index, key: index, onTouchEnd: _this2.startEnd.bind(_this2) },
	                            React.createElement('i', { className: item.photo + ' ' + (index == activeIndex ? 'active' : ''),
	                                'data-mode': index }),
	                            React.createElement(
	                                'span',
	                                { 'data-mode': index,
	                                    className: index == activeIndex ? 'active' : '' },
	                                item.name
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'mode-ctrl' },
	                    React.createElement(
	                        'p',
	                        { className: 'selectTime' },
	                        '\u70D8\u7119\u6E29\u5EA6: ',
	                        tempSet,
	                        '\u2103'
	                    ),
	                    React.createElement(_Range.Range, { value: tempSet, min: minTemp, max: maxTemp, rate: 5, fnFeedback: this.handleTemperatureSet.bind(this) }),
	                    React.createElement(
	                        'p',
	                        { className: 'selectTime' },
	                        '\u70D8\u7119\u65F6\u957F: ',
	                        textTime
	                    ),
	                    React.createElement(_Range.Range, { value: timeSet, min: minTime, max: maxTime, type: 'time', rate: 1,
	                        fnFeedback: this.handleWorkTimeSet.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'start', onTouchEnd: this.modeStart.bind(this) },
	                    '\u542F\u52A8'
	                )
	            );
	        }
	    }]);
	    return SelectModel;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Range = undefined;

	var _constants = __webpack_require__(93);

	var Range = exports.Range = React.createClass({
	    displayName: 'Range',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        var minVal = this.props.min || 0,
	            maxVal = this.props.max || 0;
	        if (minVal == maxVal) {
	            minVal = 5;
	        }
	        return minVal;
	    },
	    max: function max() {
	        var minVal = this.props.min || 0,
	            maxVal = this.props.max || 0;
	        if (minVal == maxVal) {
	            if (this.props.type == 'time') {
	                maxVal = 180;
	            } else {
	                maxVal = 250;
	            }
	        }
	        return maxVal;
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var cursor2 = ReactDOM.findDOMNode(this.refs["cursor2"]);
	        var rate = (value < this.min() ? 0 : value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	        cursor2.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.target.value);
	        //this.setState({value:value});
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	        this.props.fnFeedback(value);

	        //Actions.slide(value);
	    },
	    selectRange: function selectRange(e) {

	        var range = parseInt(e.target.value);
	        // console.log(range);
	        // this.props.fnFeedback(range);
	        //Actions.selectRange(range);
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
	        var minTimeText = (0, _constants.initDataFm)(parseInt(this.min() / 60)) + ":" + (0, _constants.initDataFm)(this.min() % 60);
	        var maxTimeText = (0, _constants.initDataFm)(parseInt(this.max() / 60)) + ":" + (0, _constants.initDataFm)(this.max() % 60);
	        var minVal = this.min(),
	            maxVal = this.max();
	        if (minVal == maxVal) {
	            if (this.props.type == 'time') {
	                minVal = 5;
	                maxVal = 180;
	            } else {
	                minVal = 5;
	                maxVal = 250;
	            }
	        }
	        return React.createElement(
	            'div',
	            { className: this.props.module == 'dialog' ? "range dialog-range" : "range" },
	            React.createElement(
	                'span',
	                null,
	                this.props.type == 'time' ? minTimeText : this.min()
	            ),
	            React.createElement(
	                'label',
	                { ref: 'wrap' },
	                React.createElement('input', { type: 'range', step: this.props.rate, min: minVal, max: maxVal,
	                    onTouchEnd: this.selectRange, onChange: this.handlerChange, value: value || 0,
	                    disabled: this.props.min == this.props.max ? "disabled" : "" }),
	                React.createElement(
	                    'i',
	                    { ref: 'cursor', className: this.props.min == this.props.max ? "cursor" : "", id: 'glide' },
	                    value
	                ),
	                React.createElement('i', { style: { display: this.props.min == this.props.max ? "" : "none" }, ref: 'cursor2',
	                    className: 'cursor2' })
	            ),
	            React.createElement(
	                'span',
	                null,
	                this.props.type == 'time' ? maxTimeText : this.max()
	            )
	        );
	    }
	}); /**
	     * 滑动选择器组件
	     * @prop {integer}  value       传入初始值
	     * @prop {function} fnFeedback  用于接收处理结果的函数
	     * @prop {integer}  min         可选，最小值，缺省为0
	     * @prop {integer}  max         可选，最大值，缺省为100
	     */

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuList = undefined;

	var _stringify = __webpack_require__(90);

	var _stringify2 = _interopRequireDefault(_stringify);

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

	var _BaseComponentClass = __webpack_require__(95);

	var _reactInfiniteScrollComponent = __webpack_require__(100);

	var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

	var _Actions = __webpack_require__(88);

	var _Store = __webpack_require__(89);

	var _constants = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MenuList = exports.MenuList = function (_BaseComponent) {
	    (0, _inherits3.default)(MenuList, _BaseComponent);

	    function MenuList(props) {
	        (0, _classCallCheck3.default)(this, MenuList);

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (MenuList.__proto__ || (0, _getPrototypeOf2.default)(MenuList)).call(this, props));

	        (0, _constants.setTitle)('云菜谱');
	        _this2.state = {
	            menuItems: [],
	            pageIndex: 1,
	            hasNextPage: true
	        };
	        _this2.listenStore(_Store.Store);
	        _this2.handleLoad = _this2.handleLoad.bind(_this2);
	        _this2.handleClick = _this2.handleClick.bind(_this2);
	        _this2.handleJumpDetail = _this2.handleJumpDetail.bind(_this2);
	        return _this2;
	    }

	    (0, _createClass3.default)(MenuList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getMenuList(this.state.pageIndex);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var curResponse = this.state.response || [];
	            var nextResponse = nextState.response || [];
	            var _this = this;
	            if (curResponse != nextResponse) {
	                var responseData = JSON.parse(nextResponse);
	                if (responseData.code == 0 && responseData.data.list.length) {
	                    var pager = responseData.data.pager,
	                        hasNextPage = pager.hasNextPage,
	                        pageIndex = pager.pageIndex;
	                    var menuItems = _this.setState.menuItems || [];
	                    _this.setState({
	                        menuItems: menuItems.concat(responseData.data.list),
	                        hasNextPage: hasNextPage,
	                        pageIndex: pageIndex + 1
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'handleLoad',
	        value: function handleLoad() {
	            _Actions.Actions.getMenuList(this.state.pageIndex);
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(id) {
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            het.toast((0, _stringify2.default)({ menuId: id }));
	        }
	    }, {
	        key: 'handleJumpDetail',
	        value: function handleJumpDetail(id) {
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            var _state = this.state,
	                CookBookHight8b = _state.CookBookHight8b,
	                CookBookLow8b = _state.CookBookLow8b,
	                menuId = CookBookHight8b * 256 + CookBookLow8b;

	            if (menuId != id && menuId != 0 && !isNaN(menuId)) {
	                het.toast('当前已有云菜谱正在烹饪，无法切换菜谱');
	                return;
	            }
	            ReactRouter.hashHistory.push('/MenuDetail?menuId=' + id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            return React.createElement(
	                'div',
	                { className: 'menu-list' },
	                React.createElement('div', { className: 'menu-bar', style: { height: _constants.HEADERTOP } }),
	                React.createElement(
	                    _reactInfiniteScrollComponent2.default,
	                    { next: this.handleLoad, hasMore: this.state.hasNextPage,
	                        endMessage: React.createElement('div', { className: 'loading fade-out' }),
	                        loader: React.createElement(
	                            'div',
	                            { className: 'loading' },
	                            '\u52A0\u8F7D\u4E2D...'
	                        ), style: { marginTop: _constants.HEADERTOP } },
	                    this.state.menuItems.map(function (item) {
	                        return React.createElement(
	                            'div',
	                            { className: 'menu-item', key: item.menuId },
	                            React.createElement('img', { src: item.cover, onClick: function onClick(e) {
	                                    _this3.handleClick(item.menuId);
	                                }, alt: '' }),
	                            React.createElement(
	                                'div',
	                                { className: 'menu-con' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'menu-context' },
	                                    React.createElement(
	                                        'p',
	                                        { className: 'menu-name' },
	                                        item.name
	                                    ),
	                                    React.createElement(
	                                        'p',
	                                        { className: 'cooking-time' },
	                                        '\u5236\u4F5C\u65F6\u95F4\uFF1A',
	                                        item.cookingTime
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'menu-start', onTouchTap: function onTouchTap() {
	                                            _this3.handleJumpDetail(item.menuId);
	                                        } },
	                                    '\u4E00\u952E\u70F9\u996A'
	                                )
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);
	    return MenuList;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(101));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["InfiniteScroll"] = factory(require("react"));
		else
			root["InfiniteScroll"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
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

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

		function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

		var _react = __webpack_require__(2);

		var _react2 = _interopRequireDefault(_react);

		var _utilsThrottle = __webpack_require__(1);

		var _utilsThrottle2 = _interopRequireDefault(_utilsThrottle);

		var InfiniteScroll = (function (_Component) {
		  _inherits(InfiniteScroll, _Component);

		  function InfiniteScroll(props) {
		    _classCallCheck(this, InfiniteScroll);

		    _get(Object.getPrototypeOf(InfiniteScroll.prototype), 'constructor', this).call(this);
		    this.state = {
		      showLoader: false,
		      lastScrollTop: 0,
		      actionTriggered: false,
		      pullToRefreshThresholdBreached: false
		    };
		    // variables to keep track of pull down behaviour
		    this.startY = 0;
		    this.currentY = 0;
		    this.dragging = false;
		    // will be populated in componentDidMount
		    // based on the height of the pull down element
		    this.maxPullDownDistance = 0;

		    this.onScrollListener = this.onScrollListener.bind(this);
		    this.throttledOnScrollListener = (0, _utilsThrottle2['default'])(this.onScrollListener, 150).bind(this);
		    this.onStart = this.onStart.bind(this);
		    this.onMove = this.onMove.bind(this);
		    this.onEnd = this.onEnd.bind(this);
		  }

		  _createClass(InfiniteScroll, [{
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      this.el = this.props.height ? this._infScroll : window;
		      this.el.addEventListener('scroll', this.throttledOnScrollListener);

		      if (this.props.pullDownToRefresh) {
		        document.addEventListener('touchstart', this.onStart);
		        document.addEventListener('touchmove', this.onMove);
		        document.addEventListener('touchend', this.onEnd);

		        document.addEventListener('mousedown', this.onStart);
		        document.addEventListener('mousemove', this.onMove);
		        document.addEventListener('mouseup', this.onEnd);

		        // get BCR of pullDown element to position it above
		        this.maxPullDownDistance = this._pullDown.firstChild.getBoundingClientRect().height;
		        this.forceUpdate();

		        if (typeof this.props.refreshFunction !== 'function') {
		          throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'');
		        }
		      }
		    }
		  }, {
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      this.el.removeEventListener('scroll', this.throttledOnScrollListener);

		      if (this.props.pullDownToRefresh) {
		        document.removeEventListener('touchstart', this.onStart);
		        document.removeEventListener('touchmove', this.onMove);
		        document.removeEventListener('touchend', this.onEnd);

		        document.removeEventListener('mousedown', this.onStart);
		        document.removeEventListener('mousemove', this.onMove);
		        document.removeEventListener('mouseup', this.onEnd);
		      }
		    }
		  }, {
		    key: 'componentWillReceiveProps',
		    value: function componentWillReceiveProps(props) {
		      // new data was sent in
		      this.setState({
		        showLoader: false,
		        actionTriggered: false,
		        pullToRefreshThresholdBreached: false
		      });
		    }
		  }, {
		    key: 'onStart',
		    value: function onStart(evt) {
		      if (this.state.lastScrollTop) return;

		      this.dragging = true;
		      this.startY = evt.pageY || evt.touches[0].pageY;
		      this.currentY = this.startY;

		      this._infScroll.style.willChange = 'transform';
		      this._infScroll.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)';
		    }
		  }, {
		    key: 'onMove',
		    value: function onMove(evt) {
		      if (!this.dragging) return;
		      this.currentY = evt.pageY || evt.touches[0].pageY;

		      // user is scrolling down to up
		      if (this.currentY < this.startY) return;

		      if (this.currentY - this.startY >= this.props.pullDownToRefreshThreshold) {
		        this.setState({
		          pullToRefreshThresholdBreached: true
		        });
		      }

		      // so you can drag upto 1.5 times of the maxPullDownDistance
		      if (this.currentY - this.startY > this.maxPullDownDistance * 1.5) return;

		      this._infScroll.style.overflow = 'visible';
		      this._infScroll.style.transform = 'translate3d(0px, ' + (this.currentY - this.startY) + 'px, 0px)';
		    }
		  }, {
		    key: 'onEnd',
		    value: function onEnd(evt) {
		      var _this = this;

		      this.startY = 0;
		      this.currentY = 0;

		      this.dragging = false;

		      if (this.state.pullToRefreshThresholdBreached) {
		        this.props.refreshFunction && this.props.refreshFunction();
		      }

		      requestAnimationFrame(function () {
		        _this._infScroll.style.overflow = 'auto';
		        _this._infScroll.style.transform = 'none';
		        _this._infScroll.style.willChange = 'none';
		      });
		    }
		  }, {
		    key: 'isElementAtBottom',
		    value: function isElementAtBottom(target) {
		      var scrollThreshold = arguments.length <= 1 || arguments[1] === undefined ? 0.8 : arguments[1];

		      var clientHeight = target === document.body || target === document.documentElement ? window.screen.availHeight : target.clientHeight;

		      var scrolled = scrollThreshold * (target.scrollHeight - target.scrollTop);
		      return scrolled <= clientHeight;
		    }
		  }, {
		    key: 'onScrollListener',
		    value: function onScrollListener(event) {
		      var target = this.props.height ? event.target : document.documentElement.scrollTop ? document.documentElement : document.body;

		      // if user scrolls up, remove action trigger lock
		      if (target.scrollTop < this.state.lastScrollTop) {
		        this.setState({
		          actionTriggered: false,
		          lastScrollTop: target.scrollTop
		        });
		        return; // user's going up, we don't care
		      }

		      // return immediately if the action has already been triggered,
		      // prevents multiple triggers.
		      if (this.state.actionTriggered) return;

		      var atBottom = this.isElementAtBottom(target, this.props.scrollThreshold);

		      // call the `next` function in the props to trigger the next data fetch
		      if (atBottom && this.props.hasMore) {
		        this.props.next();
		        this.setState({ actionTriggered: true, showLoader: true });
		      }
		      this.setState({ lastScrollTop: target.scrollTop });
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      var _this2 = this;

		      var style = _extends({
		        height: this.props.height || 'auto',
		        overflow: 'auto',
		        WebkitOverflowScrolling: 'touch'
		      }, this.props.style);
		      var hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children.length);

		      // because heighted infiniteScroll visualy breaks
		      // on drag down as overflow becomes visible
		      var outerDivStyle = this.props.pullDownToRefresh && this.props.height ? { overflow: 'auto' } : {};
		      return _react2['default'].createElement(
		        'div',
		        { style: outerDivStyle },
		        _react2['default'].createElement(
		          'div',
		          {
		            className: 'infinite-scroll-component',
		            ref: function (infScroll) {
		              return _this2._infScroll = infScroll;
		            },
		            style: style
		          },
		          this.props.pullDownToRefresh && _react2['default'].createElement(
		            'div',
		            {
		              style: { position: 'relative' },
		              ref: function (pullDown) {
		                return _this2._pullDown = pullDown;
		              }
		            },
		            _react2['default'].createElement(
		              'div',
		              { style: {
		                  position: 'absolute',
		                  left: 0,
		                  right: 0,
		                  top: -1 * this.maxPullDownDistance
		                } },
		              !this.state.pullToRefreshThresholdBreached && this.props.pullDownToRefreshContent,
		              this.state.pullToRefreshThresholdBreached && this.props.releaseToRefreshContent
		            )
		          ),
		          this.props.children,
		          !this.state.showLoader && !hasChildren && this.props.hasMore && this.props.loader,
		          this.state.showLoader && this.props.loader,
		          !this.props.hasMore && _react2['default'].createElement(
		            'p',
		            { style: { textAlign: 'center' } },
		            this.props.endMessage || _react2['default'].createElement(
		              'b',
		              null,
		              'Yay! You have seen it all'
		            )
		          )
		        )
		      );
		    }
		  }]);

		  return InfiniteScroll;
		})(_react.Component);

		exports['default'] = InfiniteScroll;

		InfiniteScroll.defaultProps = {
		  pullDownToRefreshContent: _react2['default'].createElement(
		    'h3',
		    null,
		    'Pull down to refresh'
		  ),
		  releaseToRefreshContent: _react2['default'].createElement(
		    'h3',
		    null,
		    'Release to refresh'
		  ),
		  pullDownToRefreshThreshold: 100,
		  disableBrowserPullToRefresh: true
		};

		InfiniteScroll.propTypes = {
		  next: _react.PropTypes.func,
		  hasMore: _react.PropTypes.bool,
		  children: _react.PropTypes.node,
		  loader: _react.PropTypes.node.isRequired,
		  scrollThreshold: _react.PropTypes.number,
		  endMessage: _react.PropTypes.node,
		  style: _react.PropTypes.object,
		  height: _react.PropTypes.number,
		  hasChildren: _react.PropTypes.bool,
		  pullDownToRefresh: _react.PropTypes.bool,
		  pullDownToRefreshContent: _react.PropTypes.node,
		  releaseToRefreshContent: _react.PropTypes.node,
		  pullDownToRefreshThreshold: _react.PropTypes.number,
		  refreshFunction: _react.PropTypes.func
		};
		module.exports = exports['default'];

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		// https://remysharp.com/2010/07/21/throttling-function-calls
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = throttle;

		function throttle(fn, threshhold, scope) {
		  threshhold || (threshhold = 250);
		  var last, deferTimer;
		  return function () {
		    var context = scope || this;

		    var now = +new Date(),
		        args = arguments;
		    if (last && now < last + threshhold) {
		      // hold on to it
		      clearTimeout(deferTimer);
		      deferTimer = setTimeout(function () {
		        last = now;
		        fn.apply(context, args);
		      }, threshhold);
		    } else {
		      last = now;
		      fn.apply(context, args);
		    }
		  };
		}

		module.exports = exports["default"];

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(102);


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(104);

	var ReactChildren = __webpack_require__(105);
	var ReactComponent = __webpack_require__(118);
	var ReactPureComponent = __webpack_require__(121);
	var ReactClass = __webpack_require__(122);
	var ReactDOMFactories = __webpack_require__(124);
	var ReactElement = __webpack_require__(109);
	var ReactPropTypes = __webpack_require__(129);
	var ReactVersion = __webpack_require__(130);

	var onlyChild = __webpack_require__(131);
	var warning = __webpack_require__(111);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(125);
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,
	  PureComponent: ReactPureComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 103 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 104 */
/***/ function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var PooledClass = __webpack_require__(106);
	var ReactElement = __webpack_require__(109);

	var emptyFunction = __webpack_require__(112);
	var traverseAllChildren = __webpack_require__(115);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var invariant = __webpack_require__(108);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(104);

	var ReactCurrentOwner = __webpack_require__(110);

	var warning = __webpack_require__(111);
	var canDefineProperty = __webpack_require__(113);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var REACT_ELEMENT_TYPE = __webpack_require__(114);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	function hasValidRef(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(112);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 112 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    // $FlowFixMe https://github.com/facebook/flow/issues/285
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.

	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	module.exports = REACT_ELEMENT_TYPE;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var ReactCurrentOwner = __webpack_require__(110);
	var REACT_ELEMENT_TYPE = __webpack_require__(114);

	var getIteratorFn = __webpack_require__(116);
	var invariant = __webpack_require__(108);
	var KeyEscapeUtils = __webpack_require__(117);
	var warning = __webpack_require__(111);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * This is inlined from ReactElement since this file is shared between
	 * isomorphic and renderers. We could extract this to a
	 *
	 */

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' ||
	  // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 116 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var ReactNoopUpdateQueue = __webpack_require__(119);

	var canDefineProperty = __webpack_require__(113);
	var emptyObject = __webpack_require__(120);
	var invariant = __webpack_require__(108);
	var warning = __webpack_require__(111);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var warning = __webpack_require__(111);

	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(104);

	var ReactComponent = __webpack_require__(118);
	var ReactNoopUpdateQueue = __webpack_require__(119);

	var emptyObject = __webpack_require__(120);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	function ComponentDummy() {}
	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(ReactPureComponent.prototype, ReactComponent.prototype);
	ReactPureComponent.prototype.isPureReactComponent = true;

	module.exports = ReactPureComponent;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107),
	    _assign = __webpack_require__(104);

	var ReactComponent = __webpack_require__(118);
	var ReactElement = __webpack_require__(109);
	var ReactPropTypeLocationNames = __webpack_require__(123);
	var ReactNoopUpdateQueue = __webpack_require__(119);

	var emptyObject = __webpack_require__(120);
	var invariant = __webpack_require__(108);
	var warning = __webpack_require__(111);

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */


	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or host components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: 'DEFINE_MANY',

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: 'DEFINE_MANY',

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: 'DEFINE_MANY',

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: 'DEFINE_MANY_MERGED',

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: 'DEFINE_MANY_MERGED',

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: 'DEFINE_MANY_MERGED',

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: 'DEFINE_ONCE',

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: 'DEFINE_MANY',

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: 'DEFINE_MANY',

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: 'DEFINE_MANY',

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: 'DEFINE_ONCE',

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: 'DEFINE_MANY',

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: 'OVERRIDE_BASE'

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, 'childContext');
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, 'context');
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, 'prop');
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    if (process.env.NODE_ENV !== 'production') {
	      var typeofSpec = typeof spec;
	      var isMixinValid = typeofSpec === 'object' && spec !== null;

	      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
	    }

	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === 'DEFINE_MANY_MERGED') {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === 'DEFINE_MANY') {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var ReactElement = __webpack_require__(109);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(125);
	  createDOMFactory = ReactElementValidator.createFactory;
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),

	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(110);
	var ReactComponentTreeHook = __webpack_require__(126);
	var ReactElement = __webpack_require__(109);

	var checkReactTypeSpec = __webpack_require__(127);

	var canDefineProperty = __webpack_require__(113);
	var getIteratorFn = __webpack_require__(116);
	var warning = __webpack_require__(111);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (memoizer[currentComponentErrorInfo]) {
	    return;
	  }
	  memoizer[currentComponentErrorInfo] = true;

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    if (!validType) {
	      if (typeof type !== 'function' && typeof type !== 'string') {
	        var info = '';
	        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
	        }
	        info += getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
	      }
	    }

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var ReactCurrentOwner = __webpack_require__(110);

	var invariant = __webpack_require__(108);
	var warning = __webpack_require__(111);

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty)
	  // Strip regex characters so we can use it for regex
	  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  // Remove hasOwnProperty from the template to make it generic
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	var setItem;
	var getItem;
	var removeItem;
	var getItemIDs;
	var addRoot;
	var removeRoot;
	var getRootIDs;

	if (canUseCollections) {
	  var itemMap = new Map();
	  var rootIDSet = new Set();

	  setItem = function (id, item) {
	    itemMap.set(id, item);
	  };
	  getItem = function (id) {
	    return itemMap.get(id);
	  };
	  removeItem = function (id) {
	    itemMap['delete'](id);
	  };
	  getItemIDs = function () {
	    return Array.from(itemMap.keys());
	  };

	  addRoot = function (id) {
	    rootIDSet.add(id);
	  };
	  removeRoot = function (id) {
	    rootIDSet['delete'](id);
	  };
	  getRootIDs = function () {
	    return Array.from(rootIDSet.keys());
	  };
	} else {
	  var itemByKey = {};
	  var rootByKey = {};

	  // Use non-numeric keys to prevent V8 performance issues:
	  // https://github.com/facebook/react/pull/7232
	  var getKeyFromID = function (id) {
	    return '.' + id;
	  };
	  var getIDFromKey = function (key) {
	    return parseInt(key.substr(1), 10);
	  };

	  setItem = function (id, item) {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  };
	  getItem = function (id) {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  };
	  removeItem = function (id) {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  };
	  getItemIDs = function () {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  };

	  addRoot = function (id) {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  };
	  removeRoot = function (id) {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  };
	  getRootIDs = function () {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  };
	}

	var unmountedIDs = [];

	function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}

	function getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}

	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}

	var ReactComponentTreeHook = {
	  onSetChildren: function (id, nextChildIDs) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = getItem(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent id is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    var item = {
	      element: element,
	      parentID: parentID,
	      text: null,
	      childIDs: [],
	      isMounted: false,
	      updateCount: 0
	    };
	    setItem(id, item);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = getItem(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function (id) {
	    var item = getItem(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var name = getDisplayName(topElement);
	      var owner = topElement._owner;
	      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
	    }

	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;

	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function (id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function (id) {
	    var item = getItem(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return getDisplayName(element);
	  },
	  getElement: function (id) {
	    var item = getItem(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function (id) {
	    var item = getItem(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = getItem(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function (id) {
	    var item = getItem(id);
	    return item ? item.updateCount : 0;
	  },


	  getRootIDs: getRootIDs,
	  getRegisteredIDs: getItemIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var ReactPropTypeLocationNames = __webpack_require__(123);
	var ReactPropTypesSecret = __webpack_require__(128);

	var invariant = __webpack_require__(108);
	var warning = __webpack_require__(111);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(126);
	}

	var loggedTypeFailures = {};

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var componentStackInfo = '';

	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(126);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }

	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}

	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var ReactElement = __webpack_require__(109);
	var ReactPropTypeLocationNames = __webpack_require__(123);
	var ReactPropTypesSecret = __webpack_require__(128);

	var emptyFunction = __webpack_require__(112);
	var getIteratorFn = __webpack_require__(116);
	var warning = __webpack_require__(111);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	  symbol: createPrimitiveTypeChecker('symbol'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */
	function PropTypeError(message) {
	  this.message = message;
	  this.stack = '';
	}
	// Make `instanceof Error` still work for returned errors.
	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
	  if (process.env.NODE_ENV !== 'production') {
	    var manualPropTypeCallCache = {};
	  }
	  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (process.env.NODE_ENV !== 'production') {
	      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
	        var cacheKey = componentName + ':' + propName;
	        if (!manualPropTypeCallCache[cacheKey]) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
	          manualPropTypeCallCache[cacheKey] = true;
	        }
	      }
	    }
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        if (props[propName] === null) {
	          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	        }
	        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName, secret) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    if (!ReactElement.isValidElement(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 130 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	module.exports = '15.4.2';

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	'use strict';

	var _prodInvariant = __webpack_require__(107);

	var ReactElement = __webpack_require__(109);

	var invariant = __webpack_require__(108);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(103)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuDetail = undefined;

	var _keys = __webpack_require__(133);

	var _keys2 = _interopRequireDefault(_keys);

	var _toConsumableArray2 = __webpack_require__(136);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _slicedToArray2 = __webpack_require__(146);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

	var _stringify = __webpack_require__(90);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _extends2 = __webpack_require__(153);

	var _extends3 = _interopRequireDefault(_extends2);

	var _fun = __webpack_require__(158);

	var _BaseComponentClass = __webpack_require__(95);

	var _Actions = __webpack_require__(88);

	var _Store = __webpack_require__(89);

	var _Range = __webpack_require__(98);

	var _DialogStyle = __webpack_require__(160);

	var _constants = __webpack_require__(93);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var source = function source() {
	    var u = navigator.userAgent;
	    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
	        return 4;
	    }
	    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
	        return 3;
	    }
	};

	var transformTem = function transformTem(h, l) {
	    // 注意:箭头函数没有arguments对象，所有不能使用
	    if (arguments.length == 1) {
	        // 转化为高低位
	        return [parseInt(h / 256).toString(), (h % 256).toString()];
	    } else if (arguments.length == 2) {
	        // 转化为实际温度
	        return +h * 256 + +l;
	    }
	};

	var transformTime = function transformTime(h, m) {
	    return h * 60 + +m;
	};

	var getMenuId = function getMenuId(_this) {
	    if (location.href.match(/page\/menuDetail.html/)) {
	        return _fun.Funs.getUrlParam('menuId');
	    }
	    return _this.props.location.query['menuId'];
	};

	var callback = function callback() {
	    var isParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var _this = arguments[1];
	    var postJson = arguments[2];

	    return function (response) {
	        var responseData = JSON.parse(response);
	        if (responseData.code == 0) {
	            if (isParam) {
	                // 如果是发送配置数据
	                var firstData = postJson.ModeSet[0],
	                    menuId = +getMenuId(_this);
	                _Actions.Actions.cacheData({
	                    'CurrentWorkMode': 9,
	                    'CookBookCurIsPause': 0,
	                    'CookBookCurStep': 1,
	                    'CookBookCurTempH8b': firstData.ModeTempHigh,
	                    'CookBookCurTempL8b': firstData.ModeTempLow,
	                    'CookBookCurTimeRemainMin': firstData.ModeTimingHour,
	                    'CookBookCurTimeRemainSec': firstData.ModeTimingMin,
	                    'CookBookHight8b': parseInt(menuId / 256),
	                    'CookBookLow8b': menuId % 256
	                });
	            }
	        } else {
	            het.toast(responseData.msg);
	        }
	    };
	};

	var errCallback = function errCallback(msg) {
	    het.toast('请求失败，请稍后再试');
	};

	var postClockList = function postClockList(_this) {
	    // post 定时器列表
	    var _this$state = _this.state,
	        configList = _this$state.configList,
	        CookBookCurStep = _this$state.CookBookCurStep,
	        CurrentWorkMode = _this$state.CurrentWorkMode,
	        newConfigList = (0, _extends3.default)({}, configList),
	        clockList = [],
	        timeTotal = 0; // 总时长

	    for (var k in newConfigList) {
	        var item = newConfigList[k],
	            modeTime = transformTime(item['ModeTimingHour'], item['ModeTimingMin']),
	            steamTime = transformTime(item['SteamTimingHour'], item['SteamTimingMin']),
	            stepInterval = item['SteamSwitch'] == '1' ? Math.max(modeTime, steamTime) : modeTime,
	            // 取最大着计算时间
	        isStop = CurrentWorkMode == 9 ? CookBookCurStep <= +k : 1; // 判断是否为中途暂停
	        if (item['isRemind'] && isStop) {
	            // 若需要提醒，添加数组
	            clockList.push(timeTotal + stepInterval - 1);
	        }
	        if (isStop) {
	            timeTotal += stepInterval; // 时间累加
	        }
	    }
	    if (clockList.length) {
	        het.post('/v1/app/customization/cookbook/user/setClockList', {
	            timestamp: +new Date(),
	            menuId: getMenuId(_this),
	            startTime: _fun.Funs.dateFormat(new Date()),
	            name: _this.state.name,
	            clockList: (0, _stringify2.default)(clockList),
	            bell: '泉水叮咚'
	        }, callback(0, _this), errCallback);
	    }
	};

	var MenuDetail = exports.MenuDetail = function (_BaseComponent) {
	    (0, _inherits3.default)(MenuDetail, _BaseComponent);

	    function MenuDetail(props) {
	        (0, _classCallCheck3.default)(this, MenuDetail);

	        var _this2 = (0, _possibleConstructorReturn3.default)(this, (MenuDetail.__proto__ || (0, _getPrototypeOf2.default)(MenuDetail)).call(this, props));

	        _this2.state = {
	            clockList: [], // 定时数组
	            CookBookHight8b: 0,
	            CookBookLow8: 0,
	            CookBookTotalSteps: 0,
	            configList: {}, // 配置数据
	            cancelShow: false,
	            setShow: false,
	            selectedStep: 1,
	            tempShow: true,
	            stopShow: false, // 暂停提示
	            name: '' // "菜单名称",
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        _this2.handleSwitch = _this2.handleSwitch.bind(_this2);
	        _this2.handleConfirm = _this2.handleConfirm.bind(_this2);
	        _this2.handleCancel = _this2.handleCancel.bind(_this2);
	        _this2.handleSetParam = _this2.handleSetParam.bind(_this2);
	        _this2.handleTemperatureSet = _this2.handleTemperatureSet.bind(_this2);
	        _this2.handleTimeSet = _this2.handleTimeSet.bind(_this2);
	        _this2.handleStart = _this2.handleStart.bind(_this2);
	        _this2.handleStop = _this2.handleStop.bind(_this2);
	        _this2.handleNextStep = _this2.handleNextStep.bind(_this2);
	        _this2.handleCancelMode = _this2.handleCancelMode.bind(_this2);
	        _this2.handleCancelCook = _this2.handleCancelCook.bind(_this2);
	        _this2.handleHideDialog = _this2.handleHideDialog.bind(_this2);
	        _Actions.Actions.getData();
	        return _this2;
	    }

	    (0, _createClass3.default)(MenuDetail, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this3 = this;

	            var _this = this;
	            het.get('/v1/app/customization/cookbook/menu/getMenuByMenuId', {
	                timestamp: +new Date(),
	                menuId: getMenuId(_this),
	                productId: _this.state.productId
	            }, function (response) {
	                var responseData = JSON.parse(response);
	                if (responseData.code != 0) return false;
	                var name = responseData.data.name; // 获取菜单名称，定时接口需要
	                (0, _constants.setTitle)(name);
	                _this.setState({ name: name });
	                var configList = responseData.data.menuPropertyConfigList[0].stepConfigList.slice(0);
	                var newConfig = {};
	                if (configList.length) {
	                    configList.forEach(function (item) {
	                        var temObj = {
	                            'Step': '0',
	                            'SteamOnTime': '0',
	                            'WorkTimeHour': '0',
	                            'WorkTimeMin': '0',
	                            'TempHight8b': '0',
	                            'TempLow8b': '50',
	                            'FunctionByte': '0',

	                            'Stages': '0',
	                            'StageMode': '1',
	                            'ModeTimingHour': '0',
	                            'ModeTimingMin': '0',
	                            'ModeTempHigh': '0',
	                            'ModeTempLow': '50',
	                            'SteamSwitch': '0',
	                            'SteamTimingHour': '0',
	                            'SteamTimingMin': '0'
	                        };
	                        temObj.Step = item.step;
	                        temObj.isRemind = item.isRemind;
	                        item['propertyConfigList'].forEach(function (k) {
	                            temObj[k.property] = k.value;
	                        });
	                        newConfig[temObj.Stages] = temObj;
	                    });
	                    _this.setState({
	                        'configList': newConfig,
	                        'CookBookHight8b': parseInt(getMenuId(_this3) / 256).toString(),
	                        'CookBookLow8b': (getMenuId(_this3) % 256).toString(),
	                        'CookBookTotalSteps': configList.length
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            (0, _constants.setTitle)('云菜谱');
	        }
	    }, {
	        key: 'handleCancelCook',
	        value: function handleCancelCook() {
	            (0, _constants.cancelClock)(this.state);
	            _Actions.Actions.cancel();
	            this.handleHideDialog();
	        }
	    }, {
	        key: 'handleHideDialog',
	        value: function handleHideDialog() {
	            this.setState({ 'cancelShow': false });
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'changeTemperature': value });
	        }
	    }, {
	        key: 'handleTimeSet',
	        value: function handleTimeSet(value) {
	            this.setState({ 'changeTimeHour': parseInt(value / 60), 'changeTimeMin': value % 60 });
	        }
	    }, {
	        key: 'handleSwitch',
	        value: function handleSwitch(on, stepsNum) {
	            var state = (0, _extends3.default)({}, this.state);
	            state.configList[stepsNum]['isRemind'] = !on;
	            this.setState({ configList: state.configList });
	        }
	    }, {
	        key: 'handleConfirm',
	        value: function handleConfirm() {
	            var _state = this.state,
	                changeTemperature = _state.changeTemperature,
	                selectedStep = _state.selectedStep,
	                changeTimeHour = _state.changeTimeHour,
	                changeTimeMin = _state.changeTimeMin,
	                tempShow = _state.tempShow,
	                state = (0, _extends3.default)({}, this.state),
	                stepParam = state.configList[selectedStep];

	            if (changeTemperature != undefined) {
	                var _transformTem = transformTem(changeTemperature),
	                    _transformTem2 = (0, _slicedToArray3.default)(_transformTem, 2),
	                    ModeTempHigh = _transformTem2[0],
	                    ModeTempLow = _transformTem2[1];

	                stepParam['ModeTempHigh'] = ModeTempHigh;
	                stepParam['ModeTempLow'] = ModeTempLow;
	            }
	            if (changeTimeHour != undefined && changeTimeMin != undefined) {
	                if (tempShow) {
	                    stepParam['ModeTimingHour'] = changeTimeHour + '';
	                    stepParam['ModeTimingMin'] = changeTimeMin + '';
	                } else {
	                    stepParam['SteamTimingHour'] = changeTimeHour + '';
	                    stepParam['SteamTimingMin'] = changeTimeMin + '';
	                }
	            }
	            this.setState({
	                configList: state.configList,
	                'changeTemperature': undefined,
	                'changeTimeHour': undefined,
	                'changeTimeMin': undefined,
	                setShow: false
	            });
	            document.body.className = '';
	        }
	    }, {
	        key: 'handleCancel',
	        value: function handleCancel() {
	            this.setState({
	                'changeTemperature': undefined,
	                'changeTimeHour': undefined,
	                'changeTimeMin': undefined,
	                'setShow': false
	            });
	            document.body.className = '';
	        }
	    }, {
	        key: 'handleSetParam',
	        value: function handleSetParam(stepsNum, tempShow) {
	            document.body.className = 'ovh';
	            this.setState({ setShow: true, selectedStep: stepsNum, tempShow: tempShow });
	        }
	    }, {
	        key: 'handleStart',
	        value: function handleStart() {
	            var _this4 = this;

	            var CurrentWorkMode = this.state.CurrentWorkMode;

	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast("设备已离线");
	                return false;
	            }
	            if (CurrentWorkMode == 9 && !this._isMenuIdEq()) {
	                // 如果运行的是云菜谱，id不相等
	                het.toast('请先取消正在烹饪的云菜谱！');
	                return;
	            }
	            _Actions.Actions.menuMode(function () {
	                _this4._postJson();
	            });
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'temperatureset': value });
	        }
	    }, {
	        key: '_postJson',
	        value: function _postJson() {
	            var _state2 = this.state,
	                configList = _state2.configList,
	                deviceId = _state2.deviceId,
	                CookBookHight8b = _state2.CookBookHight8b,
	                CookBookLow8b = _state2.CookBookLow8b,
	                CookBookTotalSteps = _state2.CookBookTotalSteps,
	                newConfigList = (0, _extends3.default)({}, configList),
	                postJson = {
	                ModeSet: [],
	                ConfigType: 1,
	                ForceExecuteCookBook: 1,
	                CookBookHight8b: parseInt(getMenuId(this) / 256),
	                CookBookLow8b: parseInt(getMenuId(this) % 256),
	                CookBookTotalSteps: +CookBookTotalSteps
	            },
	                _this = this;

	            for (var k in newConfigList) {
	                var item = (0, _extends3.default)({}, newConfigList[k]);
	                item.WorkTimeHour = item.ModeTimingHour;
	                item.WorkTimeMin = item.ModeTimingMin;
	                item.SteamOnTime = (parseInt(item.SteamTimingHour) * 60 + parseInt(item.SteamTimingMin)) * 120;
	                item.TempHight8b = item.ModeTempHigh;
	                item.TempLow8b = item.ModeTempLow;
	                var s = item.isRemind ? het.hexUpFlag(0, 1, 1, het.hexUpFlag(2, 1, 1)) : het.hexUpFlag(2, 1, 1);
	                s = item.StageMode == 1 ? het.hexUpFlag(3, 1, 1, s) : item.StageMode == 2 ? het.hexUpFlag(4, 1, 1, s) : het.hexUpFlag(3, 2, 1, s);
	                item.FunctionByte = parseInt(s, 16);
	                delete item['isRemind'];
	                delete item['StageMode'];
	                delete item['ModeTimingHour'];
	                delete item['ModeTimingMin'];
	                delete item['ModeTempHigh'];
	                delete item['ModeTempLow'];
	                delete item['SteamSwitch'];
	                delete item['SteamTimingHour'];
	                delete item['SteamTimingMin'];

	                delete item['ConfigType'];
	                delete item['ForceExecuteCookBook'];
	                delete item['CookBookHight8b'];
	                delete item['CookBookLow8b'];
	                delete item['CookBookTotalSteps'];
	                for (var m in item) {
	                    item[m] = +item[m];
	                }
	                postJson.ModeSet[k - 1] = item;
	            }
	            postJson.CookBookTotalSteps = postJson.ModeSet.length;
	            het.post('/v1/device/config/configurationData', { // 发送配置数据
	                json: (0, _stringify2.default)(postJson),
	                source: source(),
	                deviceId: deviceId,
	                isSentDown: 0
	            }, callback(1, _this, postJson), errCallback, 1);
	            postClockList(_this);
	        }
	    }, {
	        key: 'handleStop',
	        value: function handleStop() {
	            this.setState({ cancelShow: true });
	        }
	    }, {
	        key: 'handleNextStep',
	        value: function handleNextStep() {
	            postClockList(this);
	            _Actions.Actions.nextStep(1);
	        }
	    }, {
	        key: 'handleCancelMode',
	        value: function handleCancelMode() {
	            (0, _constants.cancelClock)(this.state);
	            _Actions.Actions.cancel();
	        }
	    }, {
	        key: 'renderParamListDOM',
	        value: function renderParamListDOM(items, stepsNum) {
	            var _this5 = this;

	            var StageMode = items.StageMode,
	                ModeTimingHour = items.ModeTimingHour,
	                ModeTimingMin = items.ModeTimingMin,
	                ModeTempHigh = items.ModeTempHigh,
	                ModeTempLow = items.ModeTempLow,
	                SteamSwitch = items.SteamSwitch,
	                SteamTimingHour = items.SteamTimingHour,
	                SteamTimingMin = items.SteamTimingMin;

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'step-items-param', onTouchTap: function onTouchTap() {
	                            _this5.handleSetParam(stepsNum, 1);
	                        } },
	                    React.createElement(
	                        'div',
	                        { className: 'step-name' },
	                        _constants.RUNMODE[StageMode]
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-time' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6E29\u5EA6\uFF1A',
	                            transformTem(ModeTempHigh, ModeTempLow),
	                            '\xB0C'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u65F6\u95F4\uFF1A',
	                            (0, _constants.initDataFm)(+ModeTimingHour),
	                            ':',
	                            (0, _constants.initDataFm)(+ModeTimingMin)
	                        )
	                    ),
	                    React.createElement('div', { className: 'step-status' })
	                ),
	                SteamSwitch == '1' ? React.createElement(
	                    'div',
	                    { className: 'step-items-param', onTouchTap: function onTouchTap() {
	                            _this5.handleSetParam(stepsNum, 0);
	                        } },
	                    React.createElement(
	                        'div',
	                        { className: 'step-name' },
	                        '\u84B8\u6C7D'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-time' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u65F6\u95F4\uFF1A',
	                            (0, _constants.initDataFm)(+SteamTimingHour),
	                            ':',
	                            (0, _constants.initDataFm)(+SteamTimingMin)
	                        )
	                    ),
	                    React.createElement('div', { className: 'step-status' })
	                ) : null
	            );
	        }
	    }, {
	        key: 'renderParamDOM',
	        value: function renderParamDOM(item, stepsNum) {
	            var _this6 = this;

	            return React.createElement(
	                'div',
	                { className: 'step-items-list' },
	                this.renderParamListDOM(item, stepsNum),
	                React.createElement(
	                    'div',
	                    { className: 'step-warn' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5B8C\u6210\u524D1\u5206\u949F\u63D0\u9192'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'warn-switch', onClick: function onClick() {
	                                _this6.handleSwitch(item.isRemind, stepsNum);
	                            } },
	                        React.createElement('span', { className: item.isRemind ? '' : 'off' })
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'renderStepDOM',
	        value: function renderStepDOM() {
	            var _this7 = this;

	            var _state3 = this.state,
	                configList = _state3.configList,
	                CookBookCurStep = _state3.CookBookCurStep,
	                CurrentWorkMode = _state3.CurrentWorkMode,
	                online = parseInt(this.state.online || 1),
	                newConfigList = [];


	            for (var k in configList) {
	                newConfigList[k - 1] = configList[k];
	            }

	            var showClassName = function showClassName(stage) {
	                if (CurrentWorkMode != 9 || CurrentWorkMode == 9 && !_this7._isMenuIdEq() || online == 2) {
	                    return '';
	                }
	                if ((0, _constants.isCloudFinished)(_this7.state)) {
	                    return 'step-actived';
	                } else {
	                    if (CookBookCurStep == stage) {
	                        return 'step-active';
	                    }
	                    if (CookBookCurStep > stage) {
	                        return 'step-actived';
	                    }
	                }
	                return '';
	            };
	            var maxStep = Math.max.apply(Math, (0, _toConsumableArray3.default)((0, _keys2.default)(configList)));
	            return React.createElement(
	                'div',
	                {
	                    className: '' + (online == 1 && CurrentWorkMode == 9 && this._isMenuIdEq() ? 'cloudMenuDoing' : '') },
	                newConfigList.map(function (item, index) {
	                    return React.createElement(
	                        'div',
	                        { className: 'step-list ' + showClassName(item.Stages), key: item.Stages },
	                        React.createElement(
	                            'div',
	                            { className: 'step-num' },
	                            item.Stages
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'step-items' },
	                            _this7.renderParamDOM(item, item.Stages)
	                        )
	                    );
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'step-list step-finish ' + ((0, _constants.isFinish)(this.state) && 'step-active') },
	                    React.createElement(
	                        'div',
	                        { className: 'step-num' },
	                        maxStep + 1
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-items' },
	                        React.createElement(
	                            'div',
	                            { className: 'step-finish-txt' },
	                            '\u70F9\u996A\u5B8C\u6210'
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: '_isMenuIdEq',
	        value: function _isMenuIdEq() {
	            var _state4 = this.state,
	                CookBookHight8b = _state4.CookBookHight8b,
	                CookBookLow8b = _state4.CookBookLow8b,
	                menuId = CookBookHight8b * 256 + CookBookLow8b;

	            return menuId == getMenuId(this);
	        }
	    }, {
	        key: 'renderButton',
	        value: function renderButton() {
	            var CurrentWorkMode = this.state.CurrentWorkMode;

	            var online = parseInt(this.state.online || 1);
	            if (CurrentWorkMode == 0 || CurrentWorkMode == void 0 || CurrentWorkMode == 9 && !this._isMenuIdEq()) {
	                // 非云菜谱模式 或者 云菜谱id不相等
	                return React.createElement(
	                    'span',
	                    { className: 'cacel', onTouchTap: this.handleStart },
	                    '\u542F\u52A8'
	                );
	            }
	            if (CurrentWorkMode != 9 && CurrentWorkMode != 0 || (0, _constants.isCloudFinished)(this.state) || online == 2) {
	                return;
	            }
	            return React.createElement(
	                'span',
	                { onTouchTap: this.handleStop },
	                '\u53D6\u6D88'
	            );
	        }
	    }, {
	        key: 'renderTopDOM',
	        value: function renderTopDOM() {
	            var _state5 = this.state,
	                networkavailable = _state5.networkavailable,
	                online = _state5.online,
	                CurrentWorkMode = _state5.CurrentWorkMode,
	                configList = _state5.configList,
	                CookBookCurStep = _state5.CookBookCurStep,
	                CookBookCurTempH8b = _state5.CookBookCurTempH8b,
	                CookBookCurTempL8b = _state5.CookBookCurTempL8b,
	                CookBookCurTimeRemainMin = _state5.CookBookCurTimeRemainMin,
	                CookBookCurTimeRemainSec = _state5.CookBookCurTimeRemainSec,
	                CookBookCurIsPause = _state5.CookBookCurIsPause;

	            if ((0, _constants.isFinish)(this.state)) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u70D8\u7119\u5B8C\u6210'
	                );
	            }
	            if (networkavailable == 2) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u7F51\u7EDC\u5DF2\u65AD\u5F00'
	                );
	            }
	            if (online == 2) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                );
	            }

	            return CurrentWorkMode != 9 || CurrentWorkMode == 9 && !this._isMenuIdEq() ? React.createElement(
	                'span',
	                { className: 'wait' },
	                '\u7B49\u5F85\u70F9\u996A'
	            ) : React.createElement(
	                'div',
	                { className: 'cooking' },
	                React.createElement(
	                    'p',
	                    { className: 'cook-mode' },
	                    _constants.RUNMODE[configList[String(CookBookCurStep)].StageMode]
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'temperature' },
	                    CookBookCurTempH8b * 256 + CookBookCurTempL8b,
	                    React.createElement(
	                        'span',
	                        null,
	                        '\xB0C'
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'time' },
	                    (0, _constants.initDataFm)(parseInt(CookBookCurTimeRemainMin / 60)),
	                    ':',
	                    (0, _constants.initDataFm)(parseInt(CookBookCurTimeRemainMin % 60)),
	                    ':',
	                    (0, _constants.initDataFm)(CookBookCurTimeRemainSec)
	                ),
	                React.createElement('span', { className: '' + (CookBookCurIsPause == 1 ? 'stop-rotate' : 'rotate') })
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state6 = this.state,
	                cancelShow = _state6.cancelShow,
	                CookBookCurIsPause = _state6.CookBookCurIsPause,
	                setShow = _state6.setShow,
	                changeTemperature = _state6.changeTemperature,
	                selectedStep = _state6.selectedStep,
	                tempShow = _state6.tempShow,
	                configList = _state6.configList,
	                changeTimeHour = _state6.changeTimeHour,
	                changeTimeMin = _state6.changeTimeMin,
	                CurrentWorkMode = _state6.CurrentWorkMode;

	            if ((0, _constants.isOwnEmpty)(configList)) {
	                return React.createElement(
	                    'div',
	                    null,
	                    React.createElement('div', { className: 'menu-bar', style: { height: _constants.HEADERTOP } }),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-detail' },
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u6570\u636E\u52A0\u8F7D\u4E2D..'
	                        )
	                    )
	                );
	            }
	            // console.log("---------selectedStep-----" + selectedStep);
	            // console.log("--------------" + JSON.stringify(configList));
	            var _configList$selectedS = configList[selectedStep],
	                ModeTempHigh = _configList$selectedS.ModeTempHigh,
	                ModeTempLow = _configList$selectedS.ModeTempLow,
	                ModeTimingHour = _configList$selectedS.ModeTimingHour,
	                ModeTimingMin = _configList$selectedS.ModeTimingMin,
	                SteamTimingHour = _configList$selectedS.SteamTimingHour,
	                SteamTimingMin = _configList$selectedS.SteamTimingMin,
	                showHour = tempShow ? ModeTimingHour : SteamTimingHour,
	                showMin = tempShow ? ModeTimingMin : SteamTimingMin,
	                showRangTime = changeTimeHour != undefined && changeTimeMin != undefined ? changeTimeHour * 60 + changeTimeMin : showHour * 60 + +showMin,
	                showTimeTxt = changeTimeHour != undefined && changeTimeMin != undefined ? (0, _constants.initDataFm)(changeTimeHour) + ' : ' + (0, _constants.initDataFm)(changeTimeMin) : (0, _constants.initDataFm)(+showHour) + ' : ' + (0, _constants.initDataFm)(+showMin),
	                showTemp = changeTemperature === undefined ? transformTem(ModeTempHigh, ModeTempLow) : changeTemperature;

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'menu-detail' },
	                    React.createElement('div', { className: 'menu-bar', style: { height: _constants.HEADERTOP } }),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-top', style: { marginTop: _constants.HEADERTOP } },
	                        React.createElement(
	                            'div',
	                            { className: 'menu-top-con' },
	                            this.renderTopDOM()
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-step' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '\u70F9\u996A\u6B65\u9AA4'
	                        ),
	                        this.renderStepDOM()
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'run-set',
	                        style: setShow ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'run-set-content' },
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-btn flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell cancel', onTouchTap: this.handleCancel },
	                                '\u53D6\u6D88'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell confirm', onTouchTap: this.handleConfirm },
	                                '\u786E\u5B9A'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-contrl' },
	                            tempShow ? React.createElement(
	                                'div',
	                                null,
	                                React.createElement(
	                                    'p',
	                                    { className: 'selectTime' },
	                                    '\u70D8\u57F9\u6E29\u5EA6 ',
	                                    showTemp,
	                                    '\u2103'
	                                ),
	                                React.createElement(_Range.Range, { module: 'dialog', value: showTemp, min: 40,
	                                    max: 250, fnFeedback: this.handleTemperatureSet })
	                            ) : null,
	                            React.createElement(
	                                'p',
	                                { className: 'selectTime' },
	                                '\u65F6\u95F4 ',
	                                showTimeTxt
	                            ),
	                            React.createElement(_Range.Range, { module: 'dialog', value: showRangTime, min: 1, max: 299, type: 'time',
	                                fnFeedback: this.handleTimeSet })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'menu-btn' },
	                    this.renderButton()
	                ),
	                React.createElement(_DialogStyle.DialogStyle, {
	                    show: CookBookCurIsPause == 1 && CurrentWorkMode == 9 && !(0, _constants.isCloudFinished)(this.state) && this._isMenuIdEq(),
	                    content: '\u5F53\u524D\u6B65\u9AA4\u5DF2\u5B8C\u6210\uFF0C\u8BF7\u6267\u884C\u4E0B\u4E00\u6B65', leftpam: '\u53D6\u6D88\u70F9\u996A', rightpam: '\u4E0B\u4E00\u6B65', submitClock: this.handleNextStep,
	                    cancelClock: this.handleCancelMode }),
	                React.createElement(_DialogStyle.DialogStyle, { show: cancelShow, content: '\u7F8E\u98DF\u70F9\u996A\u4E2D\uFF0C\u786E\u5B9A\u53D6\u6D88\u5417\uFF1F', submitClock: this.handleCancelCook,
	                    cancelClock: this.handleHideDialog })
	            );
	        }
	    }]);
	    return MenuDetail;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(135);
	module.exports = __webpack_require__(15).Object.keys;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(5)
	  , $keys    = __webpack_require__(47);

	__webpack_require__(13)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(137);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(139);
	module.exports = __webpack_require__(15).Array.from;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(16)
	  , $export        = __webpack_require__(14)
	  , toObject       = __webpack_require__(5)
	  , call           = __webpack_require__(140)
	  , isArrayIter    = __webpack_require__(141)
	  , toLength       = __webpack_require__(53)
	  , createProperty = __webpack_require__(142)
	  , getIterFn      = __webpack_require__(143);

	$export($export.S + $export.F * !__webpack_require__(145)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(20);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(43)
	  , ITERATOR   = __webpack_require__(58)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(19)
	  , createDesc      = __webpack_require__(27);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(144)
	  , ITERATOR  = __webpack_require__(58)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(51)
	  , TAG = __webpack_require__(58)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(58)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(147);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(150);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(37);
	module.exports = __webpack_require__(149);

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(144)
	  , ITERATOR  = __webpack_require__(58)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(15).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(37);
	module.exports = __webpack_require__(152);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(20)
	  , get      = __webpack_require__(143);
	module.exports = __webpack_require__(15).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(154);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(156);
	module.exports = __webpack_require__(15).Object.assign;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(14);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(157)});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(47)
	  , gOPS     = __webpack_require__(71)
	  , pIE      = __webpack_require__(72)
	  , toObject = __webpack_require__(5)
	  , IObject  = __webpack_require__(50)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(24)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(159);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 159 */
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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DialogStyle = undefined;

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

	/**
	 * 弹出框组件
	 * @prop {string}   title 标题
	 * @prop {string}   leftpam 左边点击框文字
	 * @prop {string}   rightpam 左边点击框文字
	 * @prop {boolean}   show 是否显示
	 * @prop {function}  cancelClock   取消，点击后的回调函数
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
	 */
	var DialogStyle = exports.DialogStyle = function (_React$Component) {
	    (0, _inherits3.default)(DialogStyle, _React$Component);

	    function DialogStyle(props) {
	        (0, _classCallCheck3.default)(this, DialogStyle);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DialogStyle.__proto__ || (0, _getPrototypeOf2.default)(DialogStyle)).call(this, props));

	        _this.state = {
	            showOpacity: 0,
	            timeDisplay: false
	        };
	        return _this;
	    }

	    (0, _createClass3.default)(DialogStyle, [{
	        key: 'endDefault',
	        value: function endDefault(e) {
	            //阻止touchend事件向上冒泡
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    }, {
	        key: 'touchconform',
	        value: function touchconform(e) {
	            e.stopPropagation();
	            if (typeof this.props.submitClock === 'function') {
	                this.props.submitClock();
	            }
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.props.title == undefined ? "默认标题" : this.props.title;
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "取消" : this.props.leftpam;
	            var rightpam = this.props.rightpam == undefined ? "确定" : this.props.rightpam;
	            var show = this.props.show;
	            return React.createElement(
	                'section',
	                { style: { display: show ? "" : "none" }, className: 'fade_c_section' },
	                React.createElement(
	                    'section',
	                    { className: 'fade_c_section', onTouchEnd: this.touchcanle.bind(this) },
	                    React.createElement(
	                        'section',
	                        { onTouchMove: this.endDefault },
	                        React.createElement('div', { className: 'fade_c' }),
	                        React.createElement(
	                            'div',
	                            { className: 'succ-pop' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                title
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'pop_div' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'pop_content' },
	                                    content
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchcanle.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        leftpam
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchconform.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        rightpam
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return DialogStyle;
	}(React.Component);

/***/ }
/******/ ]);