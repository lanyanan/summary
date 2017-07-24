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

	module.exports = __webpack_require__(92);


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

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(93);

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

	var _SwiperIndex = __webpack_require__(97);

	var _SwiperHistory = __webpack_require__(100);

	var _TimeSelect = __webpack_require__(102);

	var _LoadImagModel = __webpack_require__(103);

	var _OuterIAQPage = __webpack_require__(104);

	var _DialogButtonOne = __webpack_require__(105);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory; // import {Funs} from '../../../common/src/fun.es6';

	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	//       (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	Date.prototype.Format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	    }return fmt;
	};

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	    if (appData.deviceId == undefined && !!data.deviceId) {

	        appData.deviceId = data.deviceId;
	        _Actions.Actions.getAllData();
	        _Actions.Actions.getLatestData();
	    }
	    if (appData.cityName == undefined && !!data.cityName) {
	        appData.cityName = data.cityName;
	        console.log("==getWeather== repaint AppData.cityName : " + appData.cityName);
	        _Actions.Actions.getWeather();
	    }
	    if (!!data.airlevel) {
	        var createTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
	        _Actions.Actions.refreshCreateTime(createTime);
	    }
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    (0, _inherits3.default)(App, _BaseComponent);

	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

	        _this.state = {
	            showTimeSelectView: false,
	            loading: 2,
	            currentHistoryTab: 0,
	            pm25Value: 0,
	            pm10Value: 0,
	            formaldehydeValue: 0,
	            tvocValue: 0,
	            co2Value: 0,
	            temperature: 0,
	            humidity: 0
	        };
	        _Actions.Actions.local();

	        _this.listenStore(_Store.Store); // 监听Store
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.get7Day = _this.get7Day.bind(_this);
	        _this.showTimeSelect = _this.showTimeSelect.bind(_this);
	        _this.powerDevice = _this.powerDevice.bind(_this);
	        _this.toOuterIAQPage = _this.toOuterIAQPage.bind(_this);
	        _this.liveError = _this.liveError.bind(_this);
	        _this.switchHistoryTab = _this.switchHistoryTab.bind(_this);
	        _this.submitDialogButtonOne = _this.submitDialogButtonOne.bind(_this);
	        _this.emptyViewClick = _this.emptyViewClick.bind(_this);
	        _this.hintOffLineTip = _this.hintOffLineTip.bind(_this);
	        _this.dealIOSShadow = _this.dealIOSShadow.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle((0, _stringify2.default)({
	                setNavTitle: 0,
	                title: '德赛空气检测仪',
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'submitDialogButtonOne',
	        value: function submitDialogButtonOne(e) {
	            _Actions.Actions.submitDialogButtonOne();
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            _Actions.Actions.cancelSelect();
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(date) {
	            console.log("submitClock-->start");
	            _Actions.Actions.submitSelect(date);
	            _Actions.Actions.getAllData();
	        }
	    }, {
	        key: 'showTimeSelect',
	        value: function showTimeSelect() {
	            console.log("showTimeSelect-->start");
	            _Actions.Actions.showTimeSelect();
	        }
	    }, {
	        key: 'powerDevice',
	        value: function powerDevice() {
	            // het.toast("点击了开关机的按钮 powerDevice start 1");
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            }
	            // het.toast("点击了开关机的按钮 powerDevice start 2");
	            var power = this.state.powerstatus == undefined || this.state.powerstatus == 2 ? 1 : 2;
	            // console.log("==click== powerDevice-->start,,, online : " + (this.state.online) + ", networkavailable : " + (this.state.networkavailable)+",,,power : "+power);
	            _Actions.Actions.powerDevice({
	                power: power
	            });
	        }
	    }, {
	        key: 'toOuterIAQPage',
	        value: function toOuterIAQPage() {
	            // if(this.liveError()){het.toast(this.liveError());return false};
	            window.location.href = '#/outerIAQPage';
	        }
	    }, {
	        key: 'switchHistoryTab',
	        value: function switchHistoryTab(where) {

	            _Actions.Actions.switchHistoryTab(where);
	        }
	    }, {
	        key: 'emptyViewClick',
	        value: function emptyViewClick() {
	            if (this.state.loadAllDataSuccess != undefined || this.state.loadAllDataSuccess) return;
	            _Actions.Actions.getAllData();
	        }
	    }, {
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.online == 2) {
	                return '设备与APP已断开连接！';
	            }
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            return false;
	        }
	    }, {
	        key: 'get7Day',
	        value: function get7Day() {
	            //设置日期，当前日期的前七天
	            var myDate = new Date(); //获取今天日期
	            // myDate.setDate(myDate.getDate());
	            var dateArray = [];
	            var dateTemp = void 0;
	            var flag = 1;
	            for (var i = 0; i < 7; i++) {
	                dateTemp = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日";
	                dateArray.push(dateTemp);
	                myDate.setDate(myDate.getDate() - flag);
	            }
	            return dateArray;
	        }
	    }, {
	        key: 'hintOffLineTip',
	        value: function hintOffLineTip(e) {
	            e.preventDefault();
	            _Actions.Actions.hintOffLineTip();
	            e.stopPropagation(); //取消冒泡
	        }
	    }, {
	        key: 'dealIOSShadow',
	        value: function dealIOSShadow(e) {
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            if (!!navigator.userAgent.match(/iPad|iPhone|iPod/)) {
	                e.preventDefault();
	                e.stopPropagation();
	            }
	            console.log("isIOS-->" + isIOS);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var swiper = new Swiper('.swiper-container', {
	                direction: 'vertical',
	                simulateTouch: true,
	                loop: false,
	                stopPropagation: false
	            });
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);

	            var cityName = this.state.cityName;
	            var powerstatus = this.state.powerstatus;
	            var airlevel = this.state.airlevel || 0;
	            var pm25Value = this.state.pm25Value;
	            var pm10Value = this.state.pm10Value;
	            var formaldehydeValue = this.state.formaldehydeValue;
	            var tvocValue = this.state.tvocValue;
	            var co2Value = this.state.co2Value;
	            var temperature = this.state.temperature;
	            var humidity = this.state.humidity;
	            var qualityOuter = this.state.qualityOuter;
	            var createTime = this.state.createTime;
	            var dataList = this.state.dataList;

	            var swiperIndexData = {
	                cityName: cityName,
	                powerstatus: powerstatus,
	                airlevel: airlevel,
	                pm25Value: pm25Value,
	                pm10Value: pm10Value,
	                formaldehydeValue: formaldehydeValue,
	                tvocValue: tvocValue,
	                co2Value: co2Value,
	                temperature: temperature,
	                humidity: humidity,
	                qualityOuter: qualityOuter,
	                createTime: createTime
	            };

	            if (appData.days == undefined) appData.days = this.get7Day();
	            var days = appData.days;
	            var controlTimeSelectView = {
	                show: this.state.showTimeSelectView,
	                days: days
	            };

	            var currentDate = this.state.currentDate || days[0];
	            var currentHistoryTab = this.state.currentHistoryTab;
	            var loadAllDataSuccess = this.state.loadAllDataSuccess;

	            var swiperHistoryData = {
	                currentDate: currentDate,
	                currentHistoryTab: currentHistoryTab,
	                dataList: dataList,
	                loadAllDataSuccess: loadAllDataSuccess
	            };
	            var showOffLineTip = this.state.online == 2 && !this.state.hasShowOffLineTip;

	            // console.log("showOffLineTip->"+showOffLineTip+", online -> "+this.state.online+", hasShowOffLineTip -> "+this.state.hasShowOffLineTip);

	            return React.createElement(
	                'section',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { className: 'swiper-container' },
	                    React.createElement(
	                        'section',
	                        { className: 'swiper-wrapper' },
	                        React.createElement(
	                            'section',
	                            { className: 'swiper-slide', onTouchStart: this.dealIOSShadow },
	                            React.createElement(_SwiperIndex.SwiperIndex, { className: 'index_Swp', powerDevice: this.powerDevice,
	                                toOuterIAQPage: this.toOuterIAQPage,
	                                swiperIndexData: swiperIndexData })
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'swiper-slide' },
	                            React.createElement(_SwiperHistory.SwiperHistory, { className: 'index_Swp', showTimeSelect: this.showTimeSelect,
	                                swiperHistoryData: swiperHistoryData,
	                                switchHistoryTab: this.switchHistoryTab, emptyViewClick: this.emptyViewClick, dealIOSShadow: this.dealIOSShadow })
	                        )
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: controlTimeSelectView.show,
	                    title: controlTimeSelectView.title,
	                    statusshow: false,
	                    hourshow: false,
	                    minuteshow: true,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    minutearr: controlTimeSelectView.days,
	                    defaultminute: days[0] }),
	                React.createElement(_LoadImagModel.LoadImagModel, { showLoad: this.state.loading }),
	                React.createElement(_DialogButtonOne.DialogButtonOne, { show: this.state.isShowDialogButtonOne,
	                    submitClock: this.submitDialogButtonOne,
	                    title: this.state.titleButtonOne,
	                    content: this.state.contentButtonOne,
	                    button_content: '\u6211\u77E5\u9053\u4E86' }),
	                React.createElement(
	                    'section',
	                    { className: "offline-tip " + (isIOS ? "margin-iOS" : "margin-Android"), style: { display: showOffLineTip ? "block" : "none" } },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u60A8\u7684\u68C0\u6D4B\u4EEA\u5904\u4E8E\u79BB\u7EBF\u72B6\u6001'
	                    ),
	                    React.createElement('img', { src: '../static/img/icon_delete.png', alt: '', onTouchEnd: this.hintOffLineTip })
	                )
	            );
	        }
	    }]);
	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/outerIAQPage', component: _OuterIAQPage.OuterIAQPage })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(15)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

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
	exports.SwiperIndex = undefined;

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

	var _CircleProgress = __webpack_require__(98);

	var _DashboardView = __webpack_require__(99);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var colorValue = ["#3fb57d", "#3f9f7d", "#3e887b", "#3e7179", "#3d5a77", "#3d4375"];

	var AirValueArr = [[0, 50, 100, 150, 200, 300], [0, 35, 75, 115, 150, 250], [0, 100, 200, 700, 1200, 3400], [0, 50, 100, 200, 300, 400], [0, 300, 600, 3000, 10000, 25000], [0, 350, 450, 1000, 2000, 5000]];

	var SwiperIndex = exports.SwiperIndex = function (_React$Component) {
	    (0, _inherits3.default)(SwiperIndex, _React$Component);

	    function SwiperIndex(props) {
	        (0, _classCallCheck3.default)(this, SwiperIndex);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (SwiperIndex.__proto__ || (0, _getPrototypeOf2.default)(SwiperIndex)).call(this, props));

	        _this.calculateAqi = _this.calculateAqi.bind(_this);
	        _this.getAqi = _this.getAqi.bind(_this);
	        _this.dealPowerDevice = _this.dealPowerDevice.bind(_this);
	        _this.binarySearch = _this.binarySearch.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(SwiperIndex, [{
	        key: 'binarySearch',
	        value: function binarySearch(array, x) {
	            if (x === array[0]) return 1;
	            var lowPoint = 0;
	            var higPoint = array.length - 1;
	            var returnValue = -1;
	            var midPoint = void 0;
	            var found = false;
	            while (lowPoint <= higPoint && !found) {
	                midPoint = Math.ceil((lowPoint + higPoint) / 2);
	                if (x > array[midPoint - 1]) {
	                    lowPoint = midPoint + 1;
	                } else if (x < array[midPoint - 1]) {
	                    higPoint = midPoint - 1;
	                } else if (x = array[midPoint - 1]) {
	                    found = true;
	                }
	            }
	            if (found) {
	                returnValue = midPoint;
	            } else if (!found && higPoint == lowPoint - 1) {
	                returnValue = higPoint;
	            }
	            // console.log("----->array2  x : " + x + ",  lowPoint : " + lowPoint + ", higPoint : " + higPoint);
	            return returnValue;
	        }
	    }, {
	        key: 'calculateAqi',
	        value: function calculateAqi(Cp, IAQh, IAQl, BPh, BPl) {
	            return (IAQh - IAQl) / (BPh - BPl) * (Cp - BPl) + IAQl;
	        }
	    }, {
	        key: 'calAQI',
	        value: function calAQI(arr, value) {
	            if (value === undefined || value === NaN) return 0;
	            var position = this.binarySearch(arr, value);
	            if (position === arr.length) return AirValueArr[0][position - 1];
	            var aqi = this.calculateAqi(value, AirValueArr[0][position], AirValueArr[0][position - 1], arr[position], arr[position - 1]);
	            return aqi;
	        }
	    }, {
	        key: 'getAqi',
	        value: function getAqi(pm25Value, pm10Value, formaldehydeValue, tvocValue, co2Value) {
	            if (pm25Value > AirValueArr[1][AirValueArr[1].length - 1] || pm10Value > AirValueArr[2][AirValueArr[2].length - 1] || formaldehydeValue > AirValueArr[3][AirValueArr[3].length - 1] || tvocValue > AirValueArr[4][AirValueArr[4].length - 1] || co2Value > AirValueArr[5][AirValueArr[5].length - 1]) return 300;
	            var pm25Aqii = this.calAQI(AirValueArr[1], pm25Value);
	            var pm10Aqii = this.calAQI(AirValueArr[2], pm10Value);
	            var formaldehydeAqii = this.calAQI(AirValueArr[3], formaldehydeValue);
	            var tvocAqii = this.calAQI(AirValueArr[4], tvocValue);
	            var co2Aqii = this.calAQI(AirValueArr[5], co2Value);
	            var aqii = Math.max(pm25Aqii, pm10Aqii, formaldehydeAqii, tvocAqii, co2Aqii);
	            // console.log("aqiLevel -->----->array2 aqii : "+aqii+", pm25Aqii : "+pm25Aqii+", pm10Aqii : "+pm10Aqii+", formaldehydeAqii : "+formaldehydeAqii+", tovcAqii : "+tvocAqii+", co2Aqii : "+co2Aqii);
	            return aqii;
	        }
	    }, {
	        key: 'dealPowerDevice',
	        value: function dealPowerDevice(e) {
	            // het.toast("点击了开关机的按钮");
	            e.preventDefault();
	            this.props.powerDevice();
	            e.stopPropagation(); //取消冒泡
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var dealPowerDevice = this.dealPowerDevice;
	            var toOuterIAQPage = this.props.toOuterIAQPage;
	            var swiperIndexData = this.props.swiperIndexData;
	            var cityName = swiperIndexData.cityName;
	            var powerstatus = swiperIndexData.powerstatus;
	            var pm25Value = swiperIndexData.pm25Value;
	            var PM10Value = swiperIndexData.pm10Value || 0;
	            var formaldehydeValue = swiperIndexData.formaldehydeValue || 0;
	            var TVOCValue = swiperIndexData.tvocValue || 0;
	            var CO2Value = swiperIndexData.co2Value || 0;
	            var temperature = swiperIndexData.temperature || 0;
	            var humidity = swiperIndexData.humidity || 0;

	            var qualityOuter = swiperIndexData.qualityOuter;
	            var createTime = swiperIndexData.createTime;
	            createTime = createTime == undefined ? "未知" : (createTime + "").toString().replace("-", "/").replace("-", "/");

	            var isNormalPm25 = pm25Value < 75;
	            var isNormalPm10 = PM10Value < 200;
	            var isNormalFormaldehyde = formaldehydeValue < 100;
	            var isNormalTvoc = TVOCValue < 600;
	            var isNormalCo2 = CO2Value < 450;
	            var isNormalTemp = 1;

	            var pm25Progress = pm25Value > 250 ? 100 : pm25Value / 250 * 100;
	            var pm10Progress = PM10Value > 3400 ? 100 : PM10Value / 3400 * 100;
	            var formaldehydeProgress = formaldehydeValue > 400 ? 100 : formaldehydeValue / 400 * 100;
	            var tovcProgress = TVOCValue > 25000 ? 100 : TVOCValue / 25000 * 100;
	            var co2Progress = CO2Value > 5000 ? 100 : CO2Value / 5000 * 100;
	            var tempHumidityProgress = 100;
	            // console.log("pm25Progress : "+pm25Progress+", pm10Progress : "+pm10Progress+", formaldehydeProgress : "+formaldehydeProgress+", tovcProgress : "+tovcProgress+", co2Progress : "+co2Progress);
	            var powerText = powerstatus == 2 ? "开机" : "关机";
	            // console.log("set--> SwiperIndex powerstatus : "+powerstatus+", powerText : "+powerText);
	            var currentIAQ = this.getAqi(pm25Value, PM10Value, formaldehydeValue, TVOCValue, CO2Value);
	            var aqiLevel = this.binarySearch(AirValueArr[0], currentIAQ) - 1;
	            // console.log("aqiLevel --> "+aqiLevel+",,,,aqiiLevel --> "+aqiiLevel);
	            var airStatusDesc = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"][aqiLevel];
	            var airStatusTip = ["可打开门窗,或多出去走动,呼吸新鲜空气", "可以正常在户外活动,极少敏感人群应减少外出", "需减少高强度户外锻炼,外出时做好防护措施", "需减少户外活动,外出时佩戴口罩,敏感人群应尽量避免外出", "需减少户外活动,外出时佩戴口罩,敏感人群、老幼及呼吸道患者应留在室内", "请紧闭门窗,并避免外出及运动"][aqiLevel];
	            return React.createElement(
	                'section',
	                { className: 'index_Swp' },
	                React.createElement(
	                    'section',
	                    { className: 'body_index', style: { background: colorValue[aqiLevel] } },
	                    React.createElement(
	                        'section',
	                        { className: 'body_dashboard' },
	                        React.createElement(_DashboardView.DashboardView, { currentIAQ: currentIAQ })
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'body_index_info_power', onTouchEnd: dealPowerDevice },
	                        React.createElement('img', { src: '../static/img/home_power.png' }),
	                        React.createElement(
	                            'h5',
	                            null,
	                            powerText
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'body_index_info' },
	                    React.createElement(
	                        'h5',
	                        { className: 'body_index_info_name' },
	                        '\u7A7A\u6C14\u8D28\u91CF'
	                    ),
	                    React.createElement(
	                        'h5',
	                        { className: 'body_index_info_status' },
	                        airStatusDesc
	                    ),
	                    React.createElement(
	                        'h5',
	                        { className: 'body_index_info_time' },
	                        createTime
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'body_index_info_place' },
	                        React.createElement('img', { className: 'place_img', src: '../static/img/home_location.png' }),
	                        React.createElement(
	                            'span',
	                            { className: 'place_text' },
	                            cityName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'body_index_info_iaq', onTouchEnd: toOuterIAQPage },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u5BA4\u5916AQI: ',
	                            qualityOuter
	                        ),
	                        React.createElement('img', { src: '../static/img/home_arrow.png' })
	                    ),
	                    React.createElement(
	                        'h5',
	                        { className: 'body_index_info_desc' },
	                        airStatusTip
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'app-btns' },
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: pm25Progress,
	                                    circleProgressId: 'circleProgress_pm25',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalPm25 ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalPm25 ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalPm25 ? "../static/img/home_icon_PM2.5.png" : "../static/img/home_icon_PM2.5_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalPm25 ? " myGreen" : " myRed") },
	                                'pm2.5'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalPm25 ? " myGreen" : " myRed") },
	                                isNormalPm25 ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_value" + (isNormalPm25 ? " myGreen" : " myRed") },
	                            pm25Value
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_unit" + (isNormalPm25 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5") },
	                            'ug/m\xB3'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: pm10Progress,
	                                    circleProgressId: 'circleProgress_pm10',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalPm10 ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalPm10 ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalPm10 ? "../static/img/home_icon_PM10.png" : "../static/img/home_icon_PM10_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalPm10 ? " myGreen" : " myRed") },
	                                'pm10'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalPm10 ? " myGreen" : " myRed") },
	                                isNormalPm10 ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_value" + (isNormalPm10 ? " myGreen" : " myRed") },
	                            PM10Value
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_unit" + (isNormalPm10 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5") },
	                            'ug/m\xB3'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: formaldehydeProgress,
	                                    circleProgressId: 'circleProgress_formaldehyde',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalFormaldehyde ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalFormaldehyde ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalFormaldehyde ? "../static/img/home_icon_jq.png" : "../static/img/home_icon_jq_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalFormaldehyde ? " myGreen" : " myRed") },
	                                '\u7532\u919B'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalFormaldehyde ? " myGreen" : " myRed") },
	                                isNormalFormaldehyde ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_value" + (isNormalFormaldehyde ? " myGreen" : " myRed") },
	                            TVOCValue == undefined || TVOCValue == NaN ? 0 : formaldehydeValue / 1000
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_unit" + (isNormalFormaldehyde ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5") },
	                            'mg/m\xB3'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: tovcProgress,
	                                    circleProgressId: 'circleProgress_tvoc',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalTvoc ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalTvoc ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalTvoc ? "../static/img/home_icon_tovc.png" : "../static/img/home_icon_tovc_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalTvoc ? " myGreen" : " myRed") },
	                                'Tvoc'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalTvoc ? " myGreen" : " myRed") },
	                                isNormalTvoc ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_value" + (isNormalTvoc ? " myGreen" : " myRed") },
	                            TVOCValue == undefined || TVOCValue == NaN ? 0 : TVOCValue / 1000
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_unit" + (isNormalTvoc ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5") },
	                            'mg/m\xB3'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: co2Progress,
	                                    circleProgressId: 'circleProgress_co2',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalCo2 ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalCo2 ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalCo2 ? "../static/img/home_icon_co2.png" : "../static/img/home_icon_co2_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalCo2 ? " myGreen" : " myRed") },
	                                'CO2'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalCo2 ? " myGreen" : " myRed") },
	                                isNormalCo2 ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_value" + (isNormalCo2 ? " myGreen" : " myRed") },
	                            CO2Value
	                        ),
	                        React.createElement(
	                            'h5',
	                            { className: "app_btn_child_unit" + (isNormalCo2 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5") },
	                            'ppm'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'item_progress' },
	                            React.createElement(
	                                'div',
	                                { className: 'circleProgress' },
	                                React.createElement(_CircleProgress.CircleProgress, { percent: tempHumidityProgress,
	                                    circleProgressId: 'circleProgress_temp',
	                                    lineWidth: '0.1',
	                                    lineColor: isNormalTemp ? "#3fb57d" : "#e66039",
	                                    lineColorBg: isNormalTemp ? "#C5E9D8" : "#FBE2DB",
	                                    alt: '', diameter: '3.3rem' })
	                            ),
	                            React.createElement('img', { className: 'item_progress_img',
	                                src: isNormalTemp ? "../static/img/home_icon_wsd.png" : "../static/img/home_icon_wsd_2.png" })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app_btn_child_desc' },
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_name" + (isNormalTemp ? " myGreen" : " myRed") },
	                                '\u6E29\u6E7F\u5EA6'
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "app_btn_child_status" + (isNormalTemp ? " myGreen" : " myRed") },
	                                isNormalTemp ? "正常" : "超标"
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'app_btn_child_values' },
	                            React.createElement(
	                                'span',
	                                {
	                                    className: "temp_values_value" + (isNormalTemp ? " myGreen" : " myRed") },
	                                temperature
	                            ),
	                            React.createElement(
	                                'span',
	                                {
	                                    className: "temp_values_unit" + (isNormalTemp ? " myGreen" : " myRed") + (isIOS ? " fts_5" : " fts_3") },
	                                '\u2103'
	                            ),
	                            React.createElement(
	                                'span',
	                                {
	                                    className: "temp_values_value" + (isNormalTemp ? " myGreen" : " myRed") },
	                                '/',
	                                humidity
	                            ),
	                            React.createElement(
	                                'span',
	                                {
	                                    className: "temp_values_unit" + (isNormalTemp ? " myGreen" : " myRed") + (isIOS ? " fts_5" : " fts_3") },
	                                '%'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return SwiperIndex;
	}(React.Component);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CircleProgress = undefined;

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

	var AppData = {
	    arrIds: [],
	    arrPers: []
	};

	var CircleProgress = exports.CircleProgress = function (_React$Component) {
	    (0, _inherits3.default)(CircleProgress, _React$Component);

	    function CircleProgress(props) {
	        (0, _classCallCheck3.default)(this, CircleProgress);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (CircleProgress.__proto__ || (0, _getPrototypeOf2.default)(CircleProgress)).call(this, props));

	        _this.drawCircleProgress = _this.drawCircleProgress.bind(_this);
	        _this.drawBg = _this.drawBg.bind(_this);
	        _this.drawProgress = _this.drawProgress.bind(_this);
	        _this.drawInnerCircle = _this.drawInnerCircle.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(CircleProgress, [{
	        key: 'drawCircleProgress',
	        value: function drawCircleProgress() {
	            // console.log("View--> 绘制CircleProgress-->drawCircleProgress");
	            // let c = ReactDOM.findDOMNode(this.refs.process);
	            var id = this.props.circleProgressId;
	            var c = document.getElementById(id);
	            var process = this.props.percent;
	            var position = AppData.arrIds.indexOf(id);
	            if (position != -1) {
	                AppData.arrIds.splice(position, 1);
	                AppData.arrPers.splice(position, 1);
	            }
	            AppData.arrIds.push(id);
	            AppData.arrPers.push(process);
	            // console.log("View--> 绘制CircleProgress-->drawCircleProgress, process : "+process+",, id : "+id);
	            var width = c.getAttribute('width');
	            var height = c.getAttribute('height');
	            var lineColor = c.getAttribute('data-linecolor');
	            var lineColorBg = c.getAttribute('data-linecolorbg');
	            var lineWidth = c.getAttribute('data-linewidth');
	            var ctx = c.getContext('2d');

	            this.drawBg(ctx, width, lineColorBg);
	            this.drawProgress(ctx, width, process, lineColor);
	            this.drawInnerCircle(ctx, width, lineWidth);
	        }
	    }, {
	        key: 'drawBg',
	        value: function drawBg(ctx, width, lineColorBg) {
	            ctx.beginPath();
	            ctx.arc(width / 2, width / 2, width * 0.5, 0, Math.PI * 2);
	            ctx.closePath();
	            ctx.fillStyle = lineColorBg;
	            ctx.fill();
	        }
	    }, {
	        key: 'drawProgress',
	        value: function drawProgress(ctx, width, process, lineColor) {
	            // 画进度环
	            ctx.beginPath();
	            ctx.moveTo(width * 0.5, width * 0.5);
	            ctx.arc(width * 0.5, width * 0.5, width * 0.5, Math.PI * 1.5, Math.PI * (1.5 + 2 * process / 100));
	            ctx.closePath();
	            ctx.fillStyle = lineColor;
	            ctx.fill();
	        }
	    }, {
	        key: 'drawInnerCircle',
	        value: function drawInnerCircle(ctx, width, lineWidth) {
	            // 画内填充圆
	            ctx.beginPath();
	            ctx.arc(width * 0.5, width * 0.5, width * 0.5 * (1 - lineWidth), 0, Math.PI * 2);
	            ctx.closePath();
	            ctx.fillStyle = '#fff';
	            ctx.fill();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // console.log("View--> 绘制CircleProgress-->componentDidMount");
	            this.drawCircleProgress();
	        }

	        // shouldComponentUpdate(){
	        //     // console.log("View--> 绘制CircleProgress-->shouldComponentUpdate");
	        //     let percent = this.props.percent;
	        //     let id = this.props.circleProgressId;
	        //     let position = AppData.arrIds.indexOf(id);
	        //     if (position != -1 && AppData.arrPers[position] == percent) {
	        //         console.log("View--> 绘制CircleProgress, shouldComponentUpdate,   don't need to refresh : " + position + ", savePer : " + AppData.arrPers[position] + ", percent : " + percent + ", id : " + id);
	        //         return false;
	        //     }
	        //     // this.drawCircleProgress();
	        //     // console.log("View--> 绘制CircleProgress-->shouldComponentUpdate, start to refresh : id->"+id+", percent->"+percent);
	        //     return true;
	        // }

	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            var percent = this.props.percent;
	            var id = this.props.circleProgressId;
	            var position = AppData.arrIds.indexOf(id);
	            if (position != -1 && AppData.arrPers[position] == percent) {
	                // console.log("View--> 绘制CircleProgress-->componentDidUpdate, don't need to refresh : " + position + ", savePer : " + AppData.arrPers[position] + ", percent : " + percent + ", id : " + id);
	                return;
	            }
	            // console.log("View--> 绘制CircleProgress-->componentDidUpdate");
	            this.drawCircleProgress();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var percent = this.props.percent;
	            var lineColor = this.props.lineColor;
	            var lineColorBg = this.props.lineColorBg;
	            var diameter = this.props.diameter;
	            var lineWidth = this.props.lineWidth;
	            var id = this.props.circleProgressId;

	            return React.createElement('canvas', { id: id, ref: 'process', width: '600', height: '600', 'data-process': percent,
	                'data-linecolor': lineColor, 'data-linecolorbg': lineColorBg,
	                'data-linewidth': lineWidth,
	                style: { width: diameter, height: diameter } });
	        }
	    }]);
	    return CircleProgress;
	}(React.Component);

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 仪表盘
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DashboardView = undefined;

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

	var AppData = {};

	var DashboardView = exports.DashboardView = function (_React$Component) {
	    (0, _inherits3.default)(DashboardView, _React$Component);

	    function DashboardView(props) {
	        (0, _classCallCheck3.default)(this, DashboardView);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DashboardView.__proto__ || (0, _getPrototypeOf2.default)(DashboardView)).call(this, props));

	        _this.drawDashboardView = _this.drawDashboardView.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(DashboardView, [{
	        key: 'drawDashboardView',
	        value: function drawDashboardView() {
	            // console.log("View--> 绘制DashboardView-->drawDashboardView");
	            // var canvas = ReactDOM.findDOMNode(this.refs.dashboard)

	            var canvas = document.getElementById("dashboard");
	            var currentIAQ = canvas.getAttribute('data-currentIAQ');
	            var context = canvas.getContext("2d");

	            AppData.currentIAQ = currentIAQ;
	            context.clearRect(0, 0, canvas.width, canvas.height);

	            var perIAQ = 3,
	                maxIAQ = 360;

	            var critical = 75 + currentIAQ / perIAQ;

	            var TICK_WIDTH = 15,
	                TICK_LONG_STROKE_STYLE = "rgba(255,255,255,1.0)",
	                TICK_SHORT_STROKE_STYLE = "rgba(235,255,246,0.3)",
	                TICK_NO_STROKE_STYLE = "rgba(235,55,246,0)";

	            var diameter = canvas.width > canvas.height ? canvas.height : canvas.width;
	            var circle = {
	                x: canvas.width * 0.5,
	                y: canvas.height * 0.5,
	                radius: diameter * 0.35
	            };

	            //Functions------------------------------------------------
	            //绘制仪表刻度（包括长刻度，短刻度）
	            function drawTicks() {
	                var radius = circle.radius,
	                    ANGLE_MAX = Math.PI * 2,
	                    ANGLE_DELTA = Math.PI / 90,
	                    //每个2°
	                tickWidth;
	                //利用度数做循环
	                //cnt用于计算数目
	                for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle = angle + ANGLE_DELTA, cnt++) {
	                    drawTick(angle, radius, cnt);
	                }
	                //利用半径与半径与x轴夹角绘制单个刻度
	                function drawTick(angle, radius, cnt) {
	                    var tickWidth;
	                    context.save();

	                    var isLongLine = (cnt - 15) % 30 === 0;

	                    tickWidth = isLongLine ? TICK_WIDTH : TICK_WIDTH * 0.8;

	                    if (cnt > 23 && cnt < 68) {
	                        //正下方的不显示部分
	                        context.strokeStyle = TICK_NO_STROKE_STYLE;
	                    } else if (currentIAQ < 50) {
	                        perIAQ = 50 / 7.0;
	                        critical = 68 + currentIAQ / perIAQ;
	                        context.strokeStyle = cnt > 67 && cnt < critical || (cnt - 15) % 30 === 0 ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
	                    } else if (currentIAQ < 200) {
	                        perIAQ = 150 / 90.0;
	                        critical = 75 + (currentIAQ - 50) / perIAQ;
	                        context.strokeStyle = cnt > 67 && cnt < critical || (cnt - 15) % 30 === 0 ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
	                    } else if (currentIAQ < 300) {
	                        perIAQ = 100 / 30.0;
	                        critical = 165 + (currentIAQ - 200) / perIAQ;
	                        context.strokeStyle = cnt > 67 && cnt < critical || (cnt - 15) % 30 === 0 ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
	                        if (currentIAQ > 249 && cnt < 23) {
	                            var current = (currentIAQ - 249) / perIAQ;
	                            context.strokeStyle = cnt < current || (cnt - 15) % 30 === 0 ? TICK_LONG_STROKE_STYLE : TICK_SHORT_STROKE_STYLE;
	                        }
	                    } else if (currentIAQ < 450) {
	                        perIAQ = 150 / 7.0;
	                        context.strokeStyle = TICK_SHORT_STROKE_STYLE;
	                        critical = 15 + (currentIAQ - 300) / perIAQ;
	                        if (cnt > 67 || cnt < critical) context.strokeStyle = TICK_LONG_STROKE_STYLE;
	                    } else {
	                        critical = 23;
	                        context.strokeStyle = TICK_LONG_STROKE_STYLE;
	                    }
	                    context.beginPath();
	                    context.moveTo(circle.x + Math.cos(angle) * (radius + tickWidth), circle.y + Math.sin(angle) * (radius + tickWidth));
	                    context.lineTo(circle.x + Math.cos(angle) * (radius + tickWidth * (isLongLine ? 0 : 0.2)), circle.y + Math.sin(angle) * (radius + tickWidth * (isLongLine ? 0 : 0.2)));
	                    context.stroke();
	                    context.restore();
	                }
	            }

	            //画三角形
	            function drawTriangle() {
	                context.save();
	                context.beginPath();
	                var sideLength = 10;
	                var angle = Math.PI * (360 - critical * 2) / 180;
	                var firstAngle = Math.PI * (60 / 2) / 180;
	                var startPoint = {
	                    x: circle.x + Math.cos(angle) * (circle.radius - 5),
	                    y: circle.y - Math.sin(angle) * (circle.radius - 5)
	                };
	                var leftPoint = {
	                    x: startPoint.x - sideLength * Math.cos(firstAngle - angle),
	                    y: startPoint.y - sideLength * Math.sin(firstAngle - angle)
	                };
	                var rightPoint = {
	                    x: startPoint.x - sideLength * Math.cos(firstAngle + angle),
	                    y: startPoint.y + sideLength * Math.sin(firstAngle + angle)
	                };
	                context.moveTo(startPoint.x, startPoint.y);
	                context.lineTo(leftPoint.x, leftPoint.y);
	                context.lineTo(rightPoint.x, rightPoint.y);
	                context.closePath();
	                context.fillStyle = "white";
	                context.fill();
	                context.restore();
	            }
	            //Init-----------------------------------------------------
	            drawTicks();
	            drawTriangle();
	        }
	        // shouldComponentUpdate(){
	        //     // console.log("View--> 绘制DashboardView-->shouldComponentUpdate");
	        //     let currentIAQ = this.props.currentIAQ;
	        //     if (AppData.currentIAQ != undefined && AppData.currentIAQ == currentIAQ){
	        //         console.log("View--> 绘制DashboardView-->shouldComponentUpdate, don't need to refresh : currentIAQ : "+currentIAQ+", AppData.currentIAQ : "+AppData.currentIAQ);
	        //         return false;
	        //     }
	        //     // console.log("View--> 绘制DashboardView-->shouldComponentUpdate, need to refresh : currentIAQ : "+currentIAQ+", AppData.currentIAQ : "+AppData.currentIAQ)
	        //     return true;
	        // }

	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // console.log("View--> 绘制DashboardView-->componentDidMount");
	            var currentIAQ = this.props.currentIAQ;
	            if (AppData.currentIAQ != undefined && AppData.currentIAQ == currentIAQ) {
	                console.log("View--> 绘制DashboardView-->componentDidMount, don't need to refresh : currentIAQ : " + currentIAQ + ", AppData.currentIAQ : " + AppData.currentIAQ);
	                return;
	            }
	            this.drawDashboardView();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            // console.log("View--> 绘制DashboardView-->componentDidUpdate");
	            this.drawDashboardView();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var currentIAQ = this.props.currentIAQ;

	            return React.createElement('canvas', { ref: 'dashboard', id: 'dashboard', width: '400', height: '400', 'data-currentIAQ': currentIAQ,
	                style: { width: 100 + "%", height: 100 + "%" } });
	        }
	    }]);
	    return DashboardView;
	}(React.Component);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SwiperHistory = undefined;

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

	var _ChartView = __webpack_require__(101);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppData = {
	    tabDataLists: []
	}; /**
	    *
	    */

	var SwiperHistory = exports.SwiperHistory = function (_React$Component) {
	    (0, _inherits3.default)(SwiperHistory, _React$Component);

	    function SwiperHistory(props) {
	        (0, _classCallCheck3.default)(this, SwiperHistory);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (SwiperHistory.__proto__ || (0, _getPrototypeOf2.default)(SwiperHistory)).call(this, props));

	        _this.getTabClassName = _this.getTabClassName.bind(_this);
	        _this.switchTab = _this.switchTab.bind(_this);
	        _this.getTabDataList = _this.getTabDataList.bind(_this);
	        _this.emptyViewClick = _this.emptyViewClick.bind(_this);
	        _this.showTimeSelect = _this.showTimeSelect.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(SwiperHistory, [{
	        key: 'switchTab',
	        value: function switchTab(e) {
	            e.preventDefault();
	            var where = parseInt(e.currentTarget.getAttribute('data-mode'));
	            // console.log("where : "+where);
	            this.props.switchHistoryTab(where);
	        }
	    }, {
	        key: 'emptyViewClick',
	        value: function emptyViewClick(e) {
	            e.preventDefault();
	            this.props.emptyViewClick();
	            e.stopPropagation(); //取消冒泡
	        }
	    }, {
	        key: 'getTabClassName',
	        value: function getTabClassName(where) {
	            return where == this.props.swiperHistoryData.currentHistoryTab ? "tab_select" : "tab_default";
	        }
	    }, {
	        key: 'getTabDataList',
	        value: function getTabDataList(dataList) {
	            var pm25Data = [];
	            var pm10Data = [];
	            var hchoData = [];
	            var tvocData = [];
	            var co2Data = [];
	            var tempData = [];
	            var humidityData = [];
	            for (var index in dataList) {
	                var item = dataList[index];
	                var timeStr = item.createTime;
	                timeStr = timeStr.toString().replace(" ", "T");
	                timeStr = timeStr + ".000+00:00";
	                var date = Date.parse(timeStr);
	                pm25Data.push([date, item.pm25]);
	                pm10Data.push([date, item.pm10]);
	                hchoData.push([date, item.hcho / 1000]);
	                tvocData.push([date, item.tvoc / 1000]);
	                co2Data.push([date, item.co2]);
	                tempData.push([date, item.temp]);
	                humidityData.push([date, item.humidity]);
	            }
	            AppData.tabDataLists = [];
	            if (pm25Data.length > 0) {
	                AppData.tabDataLists.push(pm25Data);
	                AppData.tabDataLists.push(pm10Data);
	                AppData.tabDataLists.push(hchoData);
	                AppData.tabDataLists.push(tvocData);
	                AppData.tabDataLists.push(co2Data);
	                AppData.tabDataLists.push(tempData);
	                AppData.tabDataLists.push(humidityData);
	            }
	            AppData.dataList = dataList;
	        }
	    }, {
	        key: 'isChangeDataList',
	        value: function isChangeDataList(dataList, dataListSave) {
	            if (dataList == undefined || dataListSave == undefined) return true;
	            if (dataList.length == 0 && dataListSave.length == 0) return false;
	            if (dataList.length == 0 || dataListSave.length == 0) return true;
	            return !(dataList[0].createTime.toString() == dataListSave[0].createTime.toString());
	        }
	    }, {
	        key: 'showTimeSelect',
	        value: function showTimeSelect(e) {
	            e.preventDefault();
	            this.props.showTimeSelect();
	            e.stopPropagation(); //取消冒泡
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //导航栏:{ios:73,android:64}
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? ' ios' : ' android';
	            var showTimeSelect = this.showTimeSelect;
	            var swiperHistoryData = this.props.swiperHistoryData;
	            var currentDate = swiperHistoryData.currentDate;
	            var currentHistoryTab = swiperHistoryData.currentHistoryTab;
	            var dataList = swiperHistoryData.dataList;
	            if (this.isChangeDataList(dataList, AppData.dataList)) this.getTabDataList(dataList);
	            var tabDataList = AppData.tabDataLists[currentHistoryTab];
	            var criticalValue = [75, 200, 0.10, 0.60, 450, 1000000, 1000000][currentHistoryTab];
	            var loadAllDataSuccess = swiperHistoryData.loadAllDataSuccess;
	            var showEmpty = dataList == undefined || dataList.length == 0;
	            var emptyText = showEmpty ? loadAllDataSuccess ? "没有数据哟!" : "获取数据失败!" : "没有数据哟!";
	            var chartUnit = ["ug/m³", "ug/m³", "mg/m³", "mg/m³", "ppm", "℃", "%"][currentHistoryTab];
	            var chartTitleName = ["PM2.5", "PM10", "甲醛", "TVOC", "CO2", "温度", "湿度"][currentHistoryTab];
	            return React.createElement(
	                'section',
	                { className: 'index_Swp' },
	                React.createElement(
	                    'section',
	                    { className: 'body_history' },
	                    React.createElement('section', { className: "body_history_title" + navigation,
	                        onTouchStart: this.props.dealIOSShadow }),
	                    React.createElement(
	                        'section',
	                        { className: 'body_history_data', style: { display: showEmpty ? "none" : "block" } },
	                        React.createElement('section', { className: "tab_padding_top", onTouchStart: this.props.dealIOSShadow }),
	                        React.createElement(
	                            'section',
	                            { className: 'body_history_tabs' },
	                            React.createElement(
	                                'ul',
	                                { className: 'body_history_tabs_ul' },
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(0), onTouchEnd: this.switchTab, 'data-mode': '0' },
	                                    'PM2.5'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(1), onTouchEnd: this.switchTab, 'data-mode': '1' },
	                                    'PM10'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(2), onTouchEnd: this.switchTab, 'data-mode': '2' },
	                                    '\u7532\u919B'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(3), onTouchEnd: this.switchTab, 'data-mode': '3' },
	                                    'TVOC'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(4), onTouchEnd: this.switchTab, 'data-mode': '4' },
	                                    'CO2'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(5), onTouchEnd: this.switchTab, 'data-mode': '5' },
	                                    '\u6E29\u5EA6'
	                                ),
	                                React.createElement(
	                                    'li',
	                                    { className: this.getTabClassName(6), onTouchEnd: this.switchTab, 'data-mode': '6' },
	                                    '\u6E7F\u5EA6'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_history_info', onTouchStart: this.props.dealIOSShadow },
	                            React.createElement(
	                                'section',
	                                { className: 'body_history_info_value' },
	                                React.createElement('span', { className: 'body_history_info_num' }),
	                                React.createElement('span', { className: 'body_history_info_unit' })
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'body_history_info_time' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'body_history_info_time' },
	                                    '\u65F6\u95F4: '
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'body_history_info_time_value' },
	                                    '14:00'
	                                )
	                            )
	                        ),
	                        React.createElement('section', { className: "tab_padding_top1", onTouchStart: this.props.dealIOSShadow }),
	                        React.createElement(
	                            'section',
	                            { className: 'body_history_chart', onTouchStart: this.props.dealIOSShadow },
	                            React.createElement(_ChartView.ChartView, { tabDataList: tabDataList, criticalValue: criticalValue, chartUnit: chartUnit })
	                        ),
	                        React.createElement('section', { className: "tab_padding_top", onTouchStart: this.props.dealIOSShadow })
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'body_history_nodata', style: { display: !showEmpty ? "none" : "block" },
	                            onTouchEnd: this.emptyViewClick },
	                        React.createElement('img', { className: 'body_history_nodata_img', src: '../static/img/emptys.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            emptyText
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'body_history_time', onTouchStart: this.props.dealIOSShadow },
	                        React.createElement('section', { className: 'body_history_time_line' }),
	                        React.createElement(
	                            'section',
	                            { className: 'body_history_clock', onTouchEnd: showTimeSelect },
	                            React.createElement('img', { className: 'img_clock', src: '../static/img/home_clock.png' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                currentDate
	                            ),
	                            React.createElement('img', { className: 'img_arrow', src: '../static/img/bottom_arrow.png' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return SwiperHistory;
	}(React.Component);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ChartView = undefined;

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

	var AppData = {};

	var ChartView = exports.ChartView = function (_React$Component) {
	    (0, _inherits3.default)(ChartView, _React$Component);

	    function ChartView(props) {
	        (0, _classCallCheck3.default)(this, ChartView);

	        // console.log("View--> 绘制ChartView constructor");
	        var _this = (0, _possibleConstructorReturn3.default)(this, (ChartView.__proto__ || (0, _getPrototypeOf2.default)(ChartView)).call(this, props));

	        _this.initChart = _this.initChart.bind(_this);
	        _this.setOption = _this.setOption.bind(_this);
	        _this.isMiddleValue = _this.isMiddleValue.bind(_this);
	        return _this;
	    }

	    (0, _createClass3.default)(ChartView, [{
	        key: 'initChart',
	        value: function initChart() {
	            // console.log("View--> 绘制ChartView initChart");
	            var tabDataList = this.props.tabDataList;
	            if (tabDataList === undefined || tabDataList.length === 0) {
	                // console.log("View--> 绘制ChartView initChart, 没有数据,,,tabDataList : "+tabDataList);
	                return;
	            }

	            var myChart = echarts.init(this.refs.chart); //初始化echarts
	            myChart.setOption(this.setOption());
	            // 显示 tooltip
	            myChart.dispatchAction({
	                type: 'showTip',
	                seriesIndex: 0,
	                dataIndex: 0
	            });
	        }
	    }, {
	        key: 'getDate',
	        value: function getDate(timeStr) {
	            timeStr = timeStr.toString().replace(" ", "T");
	            timeStr = timeStr + ".000+08:00";
	            var date = Date.parse(timeStr);
	            return date;
	        }
	    }, {
	        key: 'getFormatTime',
	        value: function getFormatTime(time) {
	            time = time + "";
	            time = time.length == 1 ? "0" + time : time;
	            return time;
	        }
	    }, {
	        key: 'getAnchorData',
	        value: function getAnchorData(tabDataList) {
	            var anchor = [];
	            if (tabDataList != undefined && tabDataList.length > 0 && tabDataList.length < 3) {
	                var date = new Date(tabDataList[0][0]);
	                var dayStr = date.getFullYear() + '-' + this.getFormatTime(date.getMonth() + 1) + '-' + this.getFormatTime(date.getDate());

	                anchor.push([this.getDate(dayStr + ' 00:00:00'), 0]);
	                anchor.push([this.getDate(dayStr + ' 23:59:59'), 0]);
	            }
	            return anchor;
	        }
	    }, {
	        key: 'setOption',
	        value: function setOption() {
	            var tabDataList = this.props.tabDataList;
	            var criticalValue = this.props.criticalValue;
	            var chartUnit = this.props.chartUnit;
	            AppData.tabDataList = tabDataList;
	            AppData.criticalValue = criticalValue;
	            var isMiddleValue = false;
	            var markAreaName = "";
	            var markAreaTop = criticalValue;
	            if (tabDataList != undefined) {
	                var max = tabDataList.reduce(function (a, b) {
	                    return a[1] > b[1] ? a : b;
	                })[1];
	                var min = tabDataList.reduce(function (a, b) {
	                    return a[1] > b[1] ? b : a;
	                })[1];

	                isMiddleValue = tabDataList != undefined && tabDataList.length !== 0 && criticalValue <= max && criticalValue >= min;
	                markAreaName = isMiddleValue ? criticalValue : "";
	                markAreaTop = isMiddleValue ? criticalValue + (max - min) * 0.005 : criticalValue;
	            }
	            // console.log("isMiddleValue : "+isMiddleValue+", markAreaName : "+markAreaName+", markAreaTop : "+markAreaTop);
	            var anchor = this.getAnchorData(tabDataList);

	            return {
	                title: {},
	                tooltip: {
	                    show: true,
	                    showContent: true,
	                    axisPointer: {
	                        type: "line",
	                        lineStyle: {
	                            width: 0
	                        }
	                    },
	                    trigger: 'axis',
	                    position: ['32%', '-20%'],
	                    confine: false,
	                    alwaysShowContent: true,
	                    backgroundColor: '#ffffff',
	                    padding: 20,
	                    formatter: function formatter(params, ticket, callback) {
	                        params = params[0];
	                        var value = params.value[1];
	                        var time = new Date(params.value[0]).Format("hh:mm");
	                        return '<span  style="font-family: mywebfont;font-size: 5rem;color: #646464;">' + value + '</span> ' + '<span  style="font-size: 1.2rem;margin-left: 3px;color: #646464;">' + chartUnit + '</span>' + '<br/>' + '<span style="font-size: 1.0rem;margin-left: 3px;color: #969696;text-align: center;">时间: ' + time + '</span>';
	                    }
	                },
	                toolbox: {
	                    show: false,
	                    feature: {
	                        saveAsImage: {}
	                    }
	                },
	                grid: {
	                    left: '15%'

	                },
	                xAxis: {
	                    // type: 'category',
	                    type: 'time',
	                    boundaryGap: false,
	                    // data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
	                    splitNumber: 7,
	                    splitLine: {
	                        show: false
	                    },
	                    axisLine: {
	                        show: false
	                    },
	                    lineStyle: {
	                        color: '#ffffff',
	                        width: 1
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#969696'
	                        },
	                        // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
	                        formatter: function formatter(value, index) {
	                            // 格式化成月/日，只在第一个刻度显示年份
	                            var date = new Date(value);
	                            var hours = date.getHours();
	                            var minutes = date.getMinutes();
	                            return (hours.toString().length == 1 ? "0" + hours : hours) + ":" + (minutes.toString().length == 1 ? "0" + minutes : minutes);
	                        }
	                    }
	                },
	                yAxis: {
	                    type: 'value',
	                    axisLine: { //坐标轴线
	                        show: false
	                    },
	                    lineStyle: {
	                        color: '#ffffff',
	                        width: 1
	                    },
	                    axisTick: { //坐标轴刻度线
	                        show: false
	                    },
	                    axisLabel: { //坐标轴刻度线对应的文本
	                        show: true,
	                        textStyle: {
	                            color: '#969696'
	                        }
	                    }
	                },
	                series: [{
	                    name: chartUnit,
	                    type: 'line',
	                    smooth: true,
	                    data: tabDataList,
	                    markArea: {
	                        itemStyle: {
	                            normal: {
	                                color: '#EB6E4A'
	                            }
	                        },
	                        label: {
	                            normal: {
	                                show: true,
	                                position: 'right',
	                                textStyle: {
	                                    color: '#EB6E4A'
	                                }
	                            }
	                        },
	                        data: [[{
	                            name: markAreaName,
	                            yAxis: criticalValue
	                        }, {
	                            yAxis: markAreaTop
	                        }]]
	                    },
	                    lineStyle: {
	                        normal: {
	                            color: '#3fb57d'
	                        }
	                    },
	                    symbol: 'emptyCircle',
	                    itemStyle: { //折现拐点样式
	                        normal: {
	                            color: function color(params) {
	                                return params.value[1] < criticalValue ? '#3fb57d' : '#ff0000';
	                            }
	                        }
	                    }
	                }, {
	                    name: '.anchor',
	                    type: 'line',
	                    showSymbol: false,
	                    data: anchor,
	                    itemStyle: { normal: { opacity: 0 } },
	                    lineStyle: { normal: { opacity: 0 } }
	                }]
	            };
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // console.log("View--> 绘制ChartView componentDidMount");
	            this.initChart();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            // console.log("View--> 绘制ChartView componentDidUpdate");
	            var tabDataList = this.props.tabDataList;
	            var criticalValue = this.props.criticalValue;
	            if (AppData.criticalValue != undefined && AppData.criticalValue == criticalValue && AppData.tabDataList != undefined && AppData.tabDataList == tabDataList) {
	                // console.log("View--> 绘制ChartView componentDidUpdate, data don't change, don't need to refresh UI");
	                return;
	            }
	            this.initChart();
	        }
	    }, {
	        key: 'isMiddleValue',
	        value: function isMiddleValue(tabDataList, criticalValue) {
	            if (tabDataList == undefined || tabDataList.length == 0) return false;
	            var min = 0;
	            var max = 0;
	            for (var item in tabDataList) {
	                if (tabDataList[item][1] < min) {
	                    min = tabDataList[item][1];
	                }
	                if (tabDataList[item][1] > max) {
	                    max = tabDataList[item][1];
	                }
	            }
	            // console.log("criticalValue : "+criticalValue+", min : "+min+", max : "+max);
	            return min < criticalValue && max > criticalValue;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // console.log("View--> 绘制ChartView render");
	            return React.createElement(
	                'section',
	                { className: 'StastiBody' },
	                React.createElement('div', { className: 'charts', ref: 'chart' })
	            );
	        }
	    }]);
	    return ChartView;
	}(React.Component);

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;
				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'\u786E\u5B9A'
						)
					),
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: 0 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 加载圈
	 */
	var LoadImagModel = exports.LoadImagModel = React.createClass({
	    displayName: "LoadImagModel",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        var show = this.props.showLoad || 1; //1: 显示, 其他: 隐藏
	        return React.createElement(
	            "section",
	            { className: "fade_c_section", style: { display: show == 1 ? "" : "none" } },
	            React.createElement("div", { className: "fade_c" }),
	            React.createElement(
	                "div",
	                { className: "spinner" },
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container1" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container2" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container3" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                )
	            )
	        );
	    }
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OuterIAQPage = undefined;

	var _stringify = __webpack_require__(93);

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

	var _CircleProgress = __webpack_require__(98);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	var OuterIAQPage = exports.OuterIAQPage = function (_BaseComponent) {
	    (0, _inherits3.default)(OuterIAQPage, _BaseComponent);

	    function OuterIAQPage(props) {
	        (0, _classCallCheck3.default)(this, OuterIAQPage);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (OuterIAQPage.__proto__ || (0, _getPrototypeOf2.default)(OuterIAQPage)).call(this, props));

	        _this.state = {};
	        _Actions.Actions.local();
	        _this.listenStore(_Store.Store);
	        return _this;
	    }

	    (0, _createClass3.default)(OuterIAQPage, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle((0, _stringify2.default)({
	                setNavTitle: 1,
	                title: '室外空气AQI',
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //导航栏:{ios:73,android:64}
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? ' ios' : ' android';
	            var aqiOuter = this.state.aqiOuter || 0;
	            var coOuter = this.state.coOuter || 0;
	            var no2Outer = this.state.no2Outer || 0;
	            var o3Outer = this.state.o3Outer || 0;
	            var pm10Outer = this.state.pm10Outer || 0;
	            var pm25Outer = this.state.pm25Outer || 0;
	            var so2Outer = this.state.so2Outer || 0;
	            var qualityOuter = this.state.qualityOuter || "未知";

	            var isNormalIAQ = aqiOuter < 100; //IAQ是否正常, true: 正常, false: 超标
	            var isNormalNo2 = no2Outer < 80; //Co2是否正常, true: 正常, false: 超标
	            var isNormalSo2 = so2Outer < 150; //So2是否正常, true: 正常, false: 超标
	            var isNormalPm25 = pm25Outer < 75; //Pm2.5是否正常, true: 正常, false: 超标
	            var isNormalPm10 = pm10Outer < 200; //Pm10是否正常, true: 正常, false: 超标
	            var isNormalO3 = o3Outer < 160; //O3是否正常, true: 正常, false: 超标
	            var isNormalCo = coOuter < 4; //Co是否正常, true: 正常, false: 超标

	            var aqiOuterProgress = aqiOuter > 300 ? 100 : aqiOuter / 3;

	            var no2Progress = (no2Outer > 565 ? 100 : no2Outer / 565 * 100) + "%";
	            var so2Progress = (so2Outer > 1600 ? 100 : so2Outer / 1600 * 100) + "%";
	            var pm25Progress = (pm25Outer > 250 ? 100 : pm25Outer / 250 * 100) + "%";
	            var pm10Progress = (pm10Outer > 3400 ? 100 : pm10Outer / 3400 * 100) + "%";
	            var o3Progress = (o3Outer > 800 ? 100 : o3Outer / 800 * 100) + "%";
	            var coProgress = (coOuter > 36 ? 100 : coOuter / 36 * 100) + "%";
	            return React.createElement(
	                'section',
	                { className: 'body_root' + navigation },
	                React.createElement(
	                    'section',
	                    { className: 'body_root_top' },
	                    React.createElement(
	                        'section',
	                        { className: 'body_outer_progress' },
	                        React.createElement(_CircleProgress.CircleProgress, { percent: aqiOuterProgress,
	                            circleProgressId: 'circleProgress_outer',
	                            lineWidth: '0.045',
	                            lineColor: isNormalIAQ ? "#3fb57d" : "#e66039",
	                            lineColorBg: isNormalIAQ ? "#ededed" : "#ededed",
	                            alt: '', diameter: '18rem' }),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_info' },
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_progress_value" + (isNormalIAQ ? " myGreen" : " myRed") },
	                                aqiOuter
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_progress_status" + (isNormalIAQ ? " myGreen" : " myRed") },
	                                qualityOuter
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'body_root_pros' },
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'NO2'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'ug/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalNo2 ? " myGreen" : " myRed") },
	                                isNormalNo2 ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalNo2 ? " myGreen" : " myRed") },
	                                no2Outer
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalNo2 ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: no2Progress, background: isNormalNo2 ? "#3fb57d" : "#e66039" } })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'SO2'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'ug/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalSo2 ? " myGreen" : " myRed") },
	                                isNormalSo2 ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalSo2 ? " myGreen" : " myRed") },
	                                so2Outer
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalSo2 ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: so2Progress, background: isNormalSo2 ? "#3fb57d" : "#e66039" } })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'PM2.5'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'ug/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalPm25 ? " myGreen" : " myRed") },
	                                isNormalPm25 ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalPm25 ? " myGreen" : " myRed") },
	                                pm25Outer
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalPm25 ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: pm25Progress, background: isNormalPm25 ? "#3fb57d" : "#e66039" } })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'PM10'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'ug/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalPm10 ? " myGreen" : " myRed") },
	                                isNormalPm10 ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalPm10 ? " myGreen" : " myRed") },
	                                pm10Outer
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalPm10 ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: pm10Progress, background: isNormalPm10 ? "#3fb57d" : "#e66039" } })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'O3'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'ug/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalO3 ? " myGreen" : " myRed") },
	                                isNormalO3 ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalO3 ? " myGreen" : " myRed") },
	                                o3Outer
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalO3 ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: o3Progress, background: isNormalO3 ? "#3fb57d" : "#e66039" } })
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'app-btns-child' },
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_info' },
	                            React.createElement(
	                                'section',
	                                { className: 'body_outer_info_name_unit' },
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_name' },
	                                    'CO'
	                                ),
	                                React.createElement(
	                                    'h5',
	                                    { className: 'body_outer_info_unit' },
	                                    'mg/m\xB3'
	                                )
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_status" + (isNormalCo ? " myGreen" : " myRed") },
	                                isNormalCo ? "正常" : "超标"
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: "body_outer_info_value" + (isNormalCo ? " myGreen" : " myRed") },
	                                coOuter
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'body_outer_progress_line' },
	                            React.createElement('h5', { className: 'body_outer_progress_bg', style: { width: "100%", background: isNormalCo ? "#C5E9D8" : "#FBE2DB" } }),
	                            React.createElement('h5', { className: 'body_outer_progress_pro', style: { width: coProgress, background: isNormalCo ? "#3fb57d" : "#e66039" } })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return OuterIAQPage;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DialogButtonOne = undefined;

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
	 * @prop {string}   button_content 左边点击框文字
	 * @prop {boolean}   show 是否显示
	 * @prop {function}  cancelClock   取消，点击后的回调函数
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
	 */
	var DialogButtonOne = exports.DialogButtonOne = function (_React$Component) {
	    (0, _inherits3.default)(DialogButtonOne, _React$Component);

	    function DialogButtonOne(props) {
	        (0, _classCallCheck3.default)(this, DialogButtonOne);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (DialogButtonOne.__proto__ || (0, _getPrototypeOf2.default)(DialogButtonOne)).call(this, props));

	        _this.state = {
	            showOpacity: 0,
	            timeDisplay: false
	        };
	        return _this;
	    }

	    (0, _createClass3.default)(DialogButtonOne, [{
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
	            e.preventDefault();
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.preventDefault();
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var style = {
	                wrapper: {
	                    position: 'fixed',
	                    top: 0,
	                    left: 0,
	                    width: '100%',
	                    height: '100%',
	                    display: '-webkit-box',
	                    WebkitBoxAlign: 'center',
	                    WebkitBoxPack: 'center',
	                    background: 'rgba(0,0,0,0.5)',
	                    opacity: this.state.opacity
	                }
	            };

	            var title = this.props.title == undefined ? "默认标题" : this.props.title;
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var buttonContent = this.props.button_content == undefined ? "我知道了" : this.props.button_content;
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
	                                    { className: 'flex-cell', onTouchEnd: this.touchconform.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        buttonContent
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	    return DialogButtonOne;
	}(React.Component);

/***/ }
/******/ ]);