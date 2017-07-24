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

	var _reactMixin = __webpack_require__(88);

	var _reactMixin2 = _interopRequireDefault(_reactMixin);

	var _globStore = __webpack_require__(91);

	var _loader = __webpack_require__(93);

	var _loader2 = _interopRequireDefault(_loader);

	var _cartoon = __webpack_require__(94);

	var _cartoon2 = _interopRequireDefault(_cartoon);

	var _game = __webpack_require__(111);

	var _game2 = _interopRequireDefault(_game);

	var _rankList = __webpack_require__(123);

	var _rankList2 = _interopRequireDefault(_rankList);

	var _config = __webpack_require__(113);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function (_React$Component) {
	    (0, _inherits3.default)(App, _React$Component);

	    function App() {
	        (0, _classCallCheck3.default)(this, App);
	        return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this));
	    }

	    (0, _createClass3.default)(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            if (window.orientation == 90 || window.orientation == -90) {
	                window.ver = false;
	            } else {
	                window.ver = true;
	            }
	            window.addEventListener('orientationchange', function (event) {
	                if (window.orientation == 90 || window.orientation == -90) {
	                    window.ver = false;
	                } else {
	                    window.ver = true;
	                }
	                // 横竖屏切换
	                autoSize();
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state$app = this.state.app;
	            var step = _state$app.step;
	            var loaded = _state$app.loaded;
	            var cindex = _state$app.cindex;
	            var showRank = _state$app.showRank;


	            return React.createElement(
	                'div',
	                { className: 'page' },
	                step === 1 && React.createElement(_loader2.default, null),
	                loaded && React.createElement(_cartoon2.default, { hide: step !== 2, cindex: cindex }),
	                loaded && React.createElement(_game2.default, { hide: step !== 3 }),
	                loaded && React.createElement(_rankList2.default, { hide: !showRank })
	            );
	        }
	    }]);
	    return App;
	}(React.Component);

	_reactMixin2.default.onClass(App, Reflux.connect(_globStore.globStore, 'app'));

	window.onload = function () {

	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 禁止滑动事件
	    document.addEventListener('touchmove', function (event) {
	        event.preventDefault();
	    });

	    // 初始化可视区域
	    autoSize();

	    // 获取微信签名
	    Ajax.get(_config2.default.env.apiPath + 'wechat/jssdk/sign', function (text) {
	        var data = JSON.parse(text);
	        data = data && data.data;
	        window.appId = data.appId;

	        wx.config({
	            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	            appId: data.appId, // 必填，公众号的唯一标识
	            timestamp: data.timestamp, // 必填，生成签名的时间戳
	            nonceStr: data.nonceStr, // 必填，生成签名的随机串
	            signature: data.signature, // 必填，签名，见附录1
	            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
	        });

	        var title = '全球仅3人能在60秒内通关!',
	            link = _config2.default.env.frontPath + 'escapeRoom/page/index.html',
	            desc = '通关有好礼，70秒内通关还能申领神秘大礼',
	            imgUrl = _config2.default.env.frontPath + 'escapeRoom/static/images/share2.png';

	        wx.ready(function () {
	            wx.onMenuShareTimeline({
	                title: title,
	                link: link, // 分享链接
	                imgUrl: imgUrl // 分享图标
	            });

	            wx.onMenuShareAppMessage({
	                title: title, // 分享标题
	                desc: desc, // 分享描述
	                link: link, // 分享链接
	                imgUrl: imgUrl // 分享图标
	            });

	            wx.onMenuShareQQ({
	                title: title, // 分享标题
	                desc: desc, // 分享描述
	                link: link, // 分享链接
	                imgUrl: imgUrl // 分享图标
	            });

	            wx.onMenuShareWeibo({
	                title: title, // 分享标题
	                desc: desc, // 分享描述
	                link: link, // 分享链接
	                imgUrl: imgUrl // 分享图标
	            });

	            wx.onMenuShareQZone({
	                title: title, // 分享标题
	                desc: desc, // 分享描述
	                link: link, // 分享链接
	                imgUrl: imgUrl // 分享图标
	            });
	        });
	    });

	    // 获取用户信息
	    Ajax.get(_config2.default.env.apiPath + 'wechat/user/get?wechatId=' + _config2.default.wechatId, function (res) {
	        res = JSON.parse(res);
	        _config2.default.userInfo = res.data;
	    });
	};

	// 根据屏幕大小（屏幕转动）调整可视区域大小及样式
	function autoSize() {
	    var root = document.getElementById('ROOT');
	    var dom = document.querySelector('.tip_icon');
	    var scale = 750 / 1334,
	        height,
	        width,
	        marginTop = 0,
	        marginLeft = 0,
	        chei = document.documentElement.clientHeight,
	        cwid = document.documentElement.clientWidth;

	    if (cwid > chei) {
	        window.isRotate = false;
	        if (dom) {
	            dom.style.left = 'initial';
	            dom.style.right = 0;
	            dom.src = '../static/images/cover/12.png';
	        }

	        root.style.transform = 'rotate(0deg)';

	        if (chei / cwid > scale) {
	            width = cwid;
	            height = cwid * scale;
	            marginTop = (chei - height) / 2;
	        } else {
	            height = chei;
	            width = chei / scale;
	            marginLeft = (cwid - width) / 2;
	        }

	        mediaQue(height);

	        root.style.height = height + 'px';
	        root.style.width = width + 'px';

	        root.style.paddingTop = marginTop + 'px';
	        root.style.paddingBottom = marginTop + 'px';
	        root.style.paddingLeft = marginLeft + 'px';
	        root.style.paddingRight = marginLeft + 'px';
	        root.style.top = 0;
	        root.style.left = 0;
	    } else {

	        window.isRotate = true;
	        if (dom) {
	            dom.style.left = 0;
	            dom.style.right = 'initial';
	            dom.src = '../static/images/cover/11.png';
	        }

	        root.style.transform = 'rotate(90deg)';

	        if (chei / cwid > scale) {
	            width = chei;
	            height = chei * scale;
	            marginTop = (cwid - height) / 2;
	        } else {
	            height = chei;
	            width = chei / scale;
	            marginLeft = (cwid - width) / 2;
	        }

	        mediaQue(height);

	        root.style.height = height + 'px';
	        root.style.width = width + 'px';

	        root.style.paddingTop = marginTop + 'px';
	        root.style.paddingBottom = marginTop + 'px';
	        root.style.paddingLeft = marginLeft + 'px';
	        root.style.paddingRight = marginLeft + 'px';
	        root.style.top = 1 / 2 * (chei - cwid) + 'px';
	        root.style.left = -1 / 2 * (chei - cwid) + 'px';
	    }
	}

	// js媒体查询（根据屏幕大小设置html字体大小）
	function mediaQue(s) {
	    var body = document.getElementsByTagName('html')[0],
	        size = '100%';

	    switch (true) {
	        case s <= 320:
	            size = '60%';break;
	        case s <= 350:
	            size = '68%';break;
	        case s <= 380:
	            size = '75%';break;
	        case s <= 410:
	            size = '83%';break;
	        case s <= 440:
	            size = '89%';break;
	        case s <= 470:
	            size = '95%';break;
	        case s <= 500:
	            size = '102%';break;
	        case s <= 539:
	            size = '108%';break;
	        case s > 539:
	            size = '115%';break;
	    }

	    body.style.fontSize = size;
	}

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

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
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

	var mixin = __webpack_require__(89);
	var assign = __webpack_require__(90);

	var mixinProto = mixin({
	  // lifecycle stuff is as you'd expect
	  componentDidMount: mixin.MANY,
	  componentWillMount: mixin.MANY,
	  componentWillReceiveProps: mixin.MANY,
	  shouldComponentUpdate: mixin.ONCE,
	  componentWillUpdate: mixin.MANY,
	  componentDidUpdate: mixin.MANY,
	  componentWillUnmount: mixin.MANY,
	  getChildContext: mixin.MANY_MERGED
	});

	function setDefaultProps(reactMixin) {
	  var getDefaultProps = reactMixin.getDefaultProps;

	  if (getDefaultProps) {
	    reactMixin.defaultProps = getDefaultProps();

	    delete reactMixin.getDefaultProps;
	  }
	}

	function setInitialState(reactMixin) {
	  var getInitialState = reactMixin.getInitialState;
	  var componentWillMount = reactMixin.componentWillMount;

	  function applyInitialState(instance) {
	    var state = instance.state || {};
	    assign(state, getInitialState.call(instance));
	    instance.state = state;
	  }

	  if (getInitialState) {
	    if (!componentWillMount) {
	      reactMixin.componentWillMount = function() {
	        applyInitialState(this);
	      };
	    } else {
	      reactMixin.componentWillMount = function() {
	        applyInitialState(this);
	        componentWillMount.call(this);
	      };
	    }

	    delete reactMixin.getInitialState;
	  }
	}

	function mixinClass(reactClass, reactMixin) {
	  setDefaultProps(reactMixin);
	  setInitialState(reactMixin);

	  var prototypeMethods = {};
	  var staticProps = {};

	  Object.keys(reactMixin).forEach(function(key) {
	    if (key === 'mixins') {
	      return; // Handled below to ensure proper order regardless of property iteration order
	    }
	    if (key === 'statics') {
	      return; // gets special handling
	    } else if (typeof reactMixin[key] === 'function') {
	      prototypeMethods[key] = reactMixin[key];
	    } else {
	      staticProps[key] = reactMixin[key];
	    }
	  });

	  mixinProto(reactClass.prototype, prototypeMethods);

	  var mergePropTypes = function(left, right, key) {
	    if (!left) return right;
	    if (!right) return left;

	    var result = {};
	    Object.keys(left).forEach(function(leftKey) {
	      if (!right[leftKey]) {
	        result[leftKey] = left[leftKey];
	      }
	    });

	    Object.keys(right).forEach(function(rightKey) {
	      if (left[rightKey]) {
	        result[rightKey] = function checkBothContextTypes() {
	          return right[rightKey].apply(this, arguments) && left[rightKey].apply(this, arguments);
	        };
	      } else {
	        result[rightKey] = right[rightKey];
	      }
	    });

	    return result;
	  };

	  mixin({
	    childContextTypes: mergePropTypes,
	    contextTypes: mergePropTypes,
	    propTypes: mixin.MANY_MERGED_LOOSE,
	    defaultProps: mixin.MANY_MERGED_LOOSE
	  })(reactClass, staticProps);

	  // statics is a special case because it merges directly onto the class
	  if (reactMixin.statics) {
	    Object.getOwnPropertyNames(reactMixin.statics).forEach(function(key) {
	      var left = reactClass[key];
	      var right = reactMixin.statics[key];

	      if (left !== undefined && right !== undefined) {
	        throw new TypeError('Cannot mixin statics because statics.' + key + ' and Component.' + key + ' are defined.');
	      }

	      reactClass[key] = left !== undefined ? left : right;
	    });
	  }

	  // If more mixins are defined, they need to run. This emulate's react's behavior.
	  // See behavior in code at:
	  // https://github.com/facebook/react/blob/41aa3496aa632634f650edbe10d617799922d265/src/isomorphic/classic/class/ReactClass.js#L468
	  // Note the .reverse(). In React, a fresh constructor is created, then all mixins are mixed in recursively,
	  // then the actual spec is mixed in last.
	  //
	  // With ES6 classes, the properties are already there, so smart-mixin mixes functions (a, b) -> b()a(), which is
	  // the opposite of how React does it. If we reverse this array, we basically do the whole logic in reverse,
	  // which makes the result the same. See the test for more.
	  // See also:
	  // https://github.com/facebook/react/blob/41aa3496aa632634f650edbe10d617799922d265/src/isomorphic/classic/class/ReactClass.js#L853
	  if (reactMixin.mixins) {
	    reactMixin.mixins.reverse().forEach(mixinClass.bind(null, reactClass));
	  }

	  return reactClass;
	}

	module.exports = (function() {
	  var reactMixin = mixinProto;

	  reactMixin.onClass = function(reactClass, mixin) {
	    // we mutate the mixin so let's clone it
	    mixin = assign({}, mixin);
	    return mixinClass(reactClass, mixin);
	  };

	  reactMixin.decorate = function(mixin) {
	    return function(reactClass) {
	      return reactMixin.onClass(reactClass, mixin);
	    };
	  };

	  return reactMixin;
	})();


/***/ },
/* 89 */
/***/ function(module, exports) {

	function objToStr(x){ return Object.prototype.toString.call(x); };

	function returner(x) { return x; }

	function wrapIfFunction(thing){
	    return typeof thing !== "function" ? thing
	    : function(){
	        return thing.apply(this, arguments);
	    };
	}

	function setNonEnumerable(target, key, value){
	    if (key in target){
	        target[key] = value;
	    }
	    else {
	        Object.defineProperty(target, key, {
	            value: value,
	            writable: true,
	            configurable: true
	        });
	    }
	}

	function defaultNonFunctionProperty(left, right, key){
	    if (left !== undefined && right !== undefined) {
	        var getTypeName = function(obj){
	            if (obj && obj.constructor && obj.constructor.name) {
	                return obj.constructor.name;
	            }
	            else {
	                return objToStr(obj).slice(8, -1);
	            }
	        };
	        throw new TypeError('Cannot mixin key ' + key + ' because it is provided by multiple sources, '
	                + 'and the types are ' + getTypeName(left) + ' and ' + getTypeName(right));
	    }
	    return left === undefined ? right : left;
	};

	function assertObject(obj, obj2){
	    var type = objToStr(obj);
	    if (type !== '[object Object]') {
	        var displayType = obj.constructor ? obj.constructor.name : 'Unknown';
	        var displayType2 = obj2.constructor ? obj2.constructor.name : 'Unknown';
	        throw new Error('cannot merge returned value of type ' + displayType + ' with an ' + displayType2);
	    }
	};


	var mixins = module.exports = function makeMixinFunction(rules, _opts){
	    var opts = _opts || {};

	    if (!opts.unknownFunction) {
	        opts.unknownFunction = mixins.ONCE;
	    }

	    if (!opts.nonFunctionProperty) {
	        opts.nonFunctionProperty = defaultNonFunctionProperty;
	    }

	    return function applyMixin(source, mixin){
	        Object.keys(mixin).forEach(function(key){
	            var left = source[key], right = mixin[key], rule = rules[key];

	            // this is just a weird case where the key was defined, but there's no value
	            // behave like the key wasn't defined
	            if (left === undefined && right === undefined) return;

	            // do we have a rule for this key?
	            if (rule) {
	                // may throw here
	                var fn = rule(left, right, key);
	                setNonEnumerable(source, key, wrapIfFunction(fn));
	                return;
	            }

	            var leftIsFn = typeof left === "function";
	            var rightIsFn = typeof right === "function";

	            // check to see if they're some combination of functions or undefined
	            // we already know there's no rule, so use the unknown function behavior
	            if (leftIsFn && right === undefined
	             || rightIsFn && left === undefined
	             || leftIsFn && rightIsFn) {
	                // may throw, the default is ONCE so if both are functions
	                // the default is to throw
	                setNonEnumerable(source, key, wrapIfFunction(opts.unknownFunction(left, right, key)));
	                return;
	            }

	            // we have no rule for them, one may be a function but one or both aren't
	            // our default is MANY_MERGED_LOOSE which will merge objects, concat arrays
	            // and throw if there's a type mismatch or both are primitives (how do you merge 3, and "foo"?)
	            source[key] = opts.nonFunctionProperty(left, right, key);
	        });
	    };
	};

	mixins._mergeObjects = function(obj1, obj2) {
	    if (Array.isArray(obj1) && Array.isArray(obj2)) {
	        return obj1.concat(obj2);
	    }

	    assertObject(obj1, obj2);
	    assertObject(obj2, obj1);

	    var result = {};
	    Object.keys(obj1).forEach(function(k){
	        if (Object.prototype.hasOwnProperty.call(obj2, k)) {
	            throw new Error('cannot merge returns because both have the ' + JSON.stringify(k) + ' key');
	        }
	        result[k] = obj1[k];
	    });

	    Object.keys(obj2).forEach(function(k){
	        // we can skip the conflict check because all conflicts would already be found
	        result[k] = obj2[k];
	    });
	    return result;
	};

	// define our built-in mixin types
	mixins.ONCE = function(left, right, key){
	    if (left && right) {
	        throw new TypeError('Cannot mixin ' + key + ' because it has a unique constraint.');
	    }
	    return left || right;
	};

	mixins.MANY = function(left, right, key){
	    return function(){
	        if (right) right.apply(this, arguments);
	        return left ? left.apply(this, arguments) : undefined;
	    };
	};

	mixins.MANY_MERGED_LOOSE = function(left, right, key) {
	    if (left && right) {
	        return mixins._mergeObjects(left, right);
	    }
	    return left || right;
	};

	mixins.MANY_MERGED = function(left, right, key){
	    return function(){
	        var res1 = right && right.apply(this, arguments);
	        var res2 = left && left.apply(this, arguments);
	        if (res1 && res2) {
	            return mixins._mergeObjects(res1, res2)
	        }
	        return res2 || res1;
	    };
	};

	mixins.REDUCE_LEFT = function(_left, _right, key){
	    var left = _left || returner;
	    var right = _right || returner;
	    return function(){
	        return right.call(this, left.apply(this, arguments));
	    };
	};

	mixins.REDUCE_RIGHT = function(_left, _right, key){
	    var left = _left || returner;
	    var right = _right || returner;
	    return function(){
	        return left.call(this, right.apply(this, arguments));
	    };
	};



/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
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
			var test1 = new String('abc');  // eslint-disable-line
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
		} catch (e) {
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

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.globStore = undefined;

	var _actions = __webpack_require__(92);

	var data = {
	    step: 1,
	    loaded: false,
	    cindex: 1,
	    showRank: false
	};

	var globStore = exports.globStore = Reflux.createStore({
	    listenables: [_actions.globActions],

	    getInitialState: function getInitialState() {
	        return data;
	    },
	    onNextStep: function onNextStep() {
	        data.step++;
	        this.trigger(data);
	    },
	    onLoaded: function onLoaded() {
	        data.loaded = true;
	        this.trigger(data);
	    },
	    onSetCartoonIndex: function onSetCartoonIndex(index) {
	        data.cindex = index;
	        this.trigger(data);
	    },
	    onBB: function onBB() {
	        data.step = 3;

	        this.trigger(data);
	    },
	    onSleep: function onSleep() {
	        data.step = 2;
	        data.cindex = 13;
	        this.trigger(data);
	    },
	    onShowRank: function onShowRank(isShow) {
	        data.showRank = isShow;
	        this.trigger(data);
	    }
	});

/***/ },
/* 92 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var globActions = exports.globActions = Reflux.createActions(['nextStep', 'loaded', 'setCartoonIndex', 'bB', 'sleep', 'showRank']);

	var bindActions = exports.bindActions = Reflux.createActions(['send']);

	var gameActions = exports.gameActions = Reflux.createActions(['showPrompt', 'magnify', 'combEquip', 'showMaskLayer', 'toggleEquip', 'sceneCut', 'getEquip', 'setEquipOptions', 'setOverStep', 'commit', 'timeStart', 'timeStop', 'showPaper', 'commitData', 'getRankData']);

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* 图片加载，数组里可以是字符串，数组，对象。
			对象字段
			path: images目录后的路径	default: ''
			prefix	名称前缀			default: ''
			names 	名称				defalut: undefined
			suffix	后缀				default:'.png'
		*/
	var resource = [['equip-bar.png', 'cover/blink.gif', 'cover/qr-code.jpg'], {
		prefix: 'H5-',
		names: [1, 3, 4, 5, 6, 'text']
	}, {
		path: 'bigImg',
		names: ['codedLock', 'mural1', 'paper-open', 'paper-small']
	}, {
		path: 'bigImg',
		prefix: 'phone-',
		names: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10-1', 11, '11-1', '11-2', 12, 13, 14]
	}, {
		path: 'cover',
		names: ['bg', 12, 13, 14, 15, '15-lock', 16]
	}, {
		path: 'scene',
		names: [1, 2, 3, 4, 5]
	}, {
		path: 'icon',
		prefix: 'aromathMachine',
		names: ['', 3, 4, '-green', '-yellow', '-variation']
	}, {
		path: 'icon',
		prefix: 'lampholder',
		names: ['', 3, 4, '-blue', '-pink', '-variation']
	}, {
		path: 'icon',
		prefix: 'wisdomBox',
		names: ['', 3, 5, '-variation']
	}, {
		path: 'icon',
		prefix: 'fleabag',
		names: ['', 3, 4, '-variation', '-xu', '-shi']
	}, {
		path: 'icon',
		names: ['bulb', 'bulb2', 'esseOil', 'esseOil3', 'esseOil4', 'water', 'water3', 'water5', 'phone', 'phone2']
	}, {
		path: 'icon',
		names: ['box-closed', 'box-opened', 'comb_icon', 'curr-equip-border', 'flamp-close', 'flamp-open', 'hook', 'icon-left', 'icon-right', 'down-arrow']
	}, {
		path: 'icon',
		names: ['paperA', 'paperB', 'fog']
	}, {
		path: 'rank',
		names: ['01', '02', '03', '04', '05', '06', '07', '08']
	}];

	var audioResource = [{ name: 'snore', path: 'snore.mp3' }, // 鼾声
	{ name: 'gold', path: 'gold.mp3' }, // 金币声
	{ name: 'touch', path: 'touch.mp3' }, // 开关按钮1
	{ name: 'closedoor', path: 'closedoor.mp3' }, // 开关按钮2
	{ name: 'iphone', path: 'iphone.mp3' }, // 电话铃声
	{ name: 'cheer', path: 'cheer.wav' }, // 欢呼声
	{ name: 'speak', path: 'speak.mp3' }, // 接电话说话声
	{ name: 'keypress', path: 'keypress.mp3' }, // 按钮声
	{ name: 'switch', path: 'switch.wav' }, // 开关按钮1
	{ name: 'bgm', path: 'bgm.mp3' }]; // 背景声
	var audio1 = [{ name: 'snore', path: 'snore.mp3' }, { name: 'gold', path: 'gold.mp3' }, { name: 'touch', path: 'touch.mp3' }, { name: 'speak', path: 'speak.mp3' }, { name: 'keypress', path: 'keypress.mp3' }, { name: 'switch', path: 'switch.wav' }];

	window.audios = [];

	function getResources() {
		var arr = [];
		resource.forEach(function (item) {
			if (typeof item === 'string') {
				arr.push(item);
			} else if (Object.prototype.toString.call(item) === '[object Array]') {
				arr = arr.concat(item);
			} else {
				var path = item.path ? item.path + '/' : '',
				    prefix = item.prefix || '',
				    suffix = item.suffix ? item.suffix : '.png';

				item.names && item.names.forEach(function (name) {
					arr.push(path + prefix + name + suffix);
				});
			}
		});

		return arr;
	}

	var Loader = function (_React$Component) {
		(0, _inherits3.default)(Loader, _React$Component);

		function Loader(props) {
			(0, _classCallCheck3.default)(this, Loader);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Loader.__proto__ || (0, _getPrototypeOf2.default)(Loader)).call(this, props));

			_this.imgArr = getResources();
			_this.audioArr = audioResource;
			return _this;
		}

		(0, _createClass3.default)(Loader, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.index = 0;
				this.progress = 0;
				this.state = { steps: 1 };
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				setTimeout(function () {
					_this2.preload();
				}, 1000);
			}
		}, {
			key: 'render',
			value: function render() {
				var style = {
					width: this.progress * 14 + 'rem'
				};

				this.resArr = getResources();

				return React.createElement(
					'div',
					{ className: 'hei100' },
					React.createElement(
						'div',
						{ className: 'table progress_page ' },
						React.createElement(
							'div',
							{ className: 'table-cell' },
							React.createElement(
								'div',
								{ className: 'progress flex' },
								React.createElement(
									'div',
									{ className: 'progress_img flex-column' },
									React.createElement(
										'div',
										{ className: 'progress_total' },
										React.createElement('span', { className: 'progress_loaded', style: style }),
										React.createElement(
											'span',
											{ className: 'fireworks' },
											React.createElement('img', { src: '../static/images/cover/fireworks.gif' })
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'flex-column progress_right' },
									React.createElement(
										'p',
										{ className: 'progress_num' },
										React.createElement(
											'span',
											null,
											(this.progress * 100).toFixed(0)
										),
										'%'
									),
									React.createElement(
										'p',
										null,
										'\u6B63\u5728\u8FDB\u5165\u6DF1\u5EA6\u7761\u7720\u72B6\u6001'
									)
								)
							)
						)
					)
				);
			}
		}, {
			key: 'preload',
			value: function preload() {

				this.loadImgs(this.imgArr);

				this.loadAudio(this.audioArr);
			}
		}, {
			key: 'loadImgs',
			value: function loadImgs(arr, flag) {
				var t = this;

				var num = arr.length / 50;

				for (var i = 0; i < num; i++) {
					!function (i) {
						setTimeout(function () {
							for (var j = 0; j < 50; j++) {
								var src = arr[i * 50 + j];
								if (!src) break;
								var img = new Image();
								img.onload = function () {
									if (!flag) t.processing();
								};

								img.onerror = function () {
									if (!flag) t.processing();
								};

								img.src = '../static/images/' + src;
							}
						}, 2000 * i);
					}(i);
				}

				if (!flag) this.setState({ steps: this.state.steps + 1 });
			}
		}, {
			key: 'loadAudio',
			value: function loadAudio(arr) {
				var t = this,
				    j = 0;

				arr && arr.forEach(function (item, i) {
					var audio = new Audio('../static/audio/' + item.path);

					audio.onloadedmetadata = function () {
						t.processing();
						// 全部音频加载完成
						if (++j === arr.length) {
							//t.fixAudioIOSbug(arr);
						}
					};

					window.audios[item.name] = audio;
				});
			}
		}, {
			key: 'processing',
			value: function processing() {
				var resLen = this.imgArr.length + this.audioArr.length;

				// 处理进度条加载
				this.index++;

				this.progress = (this.index / resLen).toFixed(2);
				this.setState({ steps: this.state.steps });

				// 加载完成后实例化动漫和游戏界面，1s后跳转到动漫界面
				if (parseInt(this.index / resLen) == 1) {
					this.fixAudioIOSbug(audio1);
					_actions.globActions.loaded();
					setTimeout(function () {
						_actions.globActions.nextStep();
					}, 2000);
				}
			}

			// ios在第一次play(需要播放一定时间)时会影响正在播放的音频（卡顿）
			// 解决方案：加载后静音状态下播放3秒

		}, {
			key: 'fixAudioIOSbug',
			value: function fixAudioIOSbug(arr) {
				var j = 0,
				    len = arr.length;
				arr.forEach(function (item, i) {
					var audio = window.audios[item.name];
					if (!audio) return;
					audio.play();
					audio.muted = true;
					setTimeout(function () {
						audio.pause();
						audio.muted = false;
					}, 1000);
				});
			}
		}]);
		return Loader;
	}(React.Component);

	exports.default = Loader;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(95);

	var _promise2 = _interopRequireDefault(_promise);

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var audio1 = [{ name: 'bgm', path: 'bgm.mp3' }, { name: 'closedoor', path: 'closedoor.mp3' }, { name: 'iphone', path: 'iphone.mp3' }, { name: 'cheer', path: 'cheer.wav' }];

	var Cartoon = function (_React$Component) {
		(0, _inherits3.default)(Cartoon, _React$Component);

		/*要显示的动漫，总共有10张。
	 	text: 要显示的文本	default: ''
	 	bgi:  背景图		default: 'text'
	 	audio 背景音乐		defalut: null
	 */
		function Cartoon(props) {
			(0, _classCallCheck3.default)(this, Cartoon);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Cartoon.__proto__ || (0, _getPrototypeOf2.default)(Cartoon)).call(this, props));

			_this.cartInfo = [{ text: '又加了好几天的班', bgi: 1 }, { text: '身体快要吃不消' }, { bgi: 3 }, { bgi: 4 }, { bgi: 5 }, { bgi: 6, audio: 'snore' }, { text: '这是什么声音？是谁的电话吗？' }, { text: '等等…我的头好晕…' }, { text: '我应该…在家休息才对…可是，这是哪里？' }, { text: '难道是因为那个手机吗？' }, { text: '我被困在这里了！要怎么样才能出去…' }, { text: '谁快来帮帮我…' }, { text: '我太累了，好想睡上一觉' }, { text: '这个密室的秘密  再与我无关...' }, { text: '也许梦醒了 我就能逃出这个密室了...' }];
			_this.giveupArr = [['为什么我一直在加班', '感觉身体轻飘飘'], ['这么晚了…加了好几天的班', '感觉身体被掏空…'], '好了，别闹，捡一下手机呗', '不要闹了哈，再不捡手机你又要加班了', '老板在看着你呢', '你到底捡不捡？'];


			_this.events = _this.fevent();
			_this.state = { hideText: '' };
			return _this;
		}

		// 放弃捡手机后要显示的动漫											


		(0, _createClass3.default)(Cartoon, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.props.cindex !== nextProps.cindex) {
					this.locked = false;
					this.closeAudio(this.props.cindex - 1);
					this.openAudio(nextProps.cindex - 1);
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.openAudio(this.props.cindex);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.closeAudio(this.props.cindex);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var arr = [];
				var evs = this.events;
				var self = this;
				var _state = this.state;
				var hideText = _state.hideText;
				var showSence = _state.showSence;
				var shadow = _state.shadow;


				return React.createElement(
					'div',
					{ className: 'cartoon' + (this.props.hide ? ' hidden' : '') },
					this.cartInfo.map(function (item, index) {
						var i = index + 1,
						    style = { backgroundImage: 'url(../static/images/H5-' + (item.bgi || 'text') + '.png)' };

						return React.createElement(
							'div',
							{ className: 'cartoon_img ' + (_this2.props.cindex === i ? 'show' : ''), style: style, onTouchEnd: evs.next, key: index },
							i === 6 && shadow && React.createElement('div', { className: 'shadow' }),
							i === 4 ? React.createElement(
								'div',
								null,
								React.createElement('div', { className: 'pickup_btn', onTouchEnd: evs.pickup }),
								React.createElement('div', { className: 'nopickup_btn', onTouchEnd: evs.unpickup })
							) : i === 7 ? React.createElement(
								'div',
								{ className: 'cartoon_text ' + hideText },
								item.text,
								showSence && React.createElement('div', { className: 'shadow7' })
							) : item.text && React.createElement(
								'div',
								{ className: i === 1 ? 'cartoon1_text' : 'cartoon_text' },
								item.text
							)
						);
					})
				);
			}

			/* 事件 */

		}, {
			key: 'fevent',
			value: function fevent() {
				var self = this,


				// 放弃捡手机的次数
				loops = 0;

				return {
					// 下一个要显示的动漫
					next: function next() {
						var cindex = self.props.cindex;

						if (cindex === 1 && loops === 0) {
							self.fixAudioIOSbug(audio1);
							//setTimeout(()=>audios['bgm'].play(),2500);
						}

						if (self.locked) return;

						switch (cindex) {

							case 2:
								loops > 2 ? self.jump(4) : self.jump(3);break;

							case 4:
								return;

							case 6:
								self.setState({ shadow: true });

								self.locked = true;

								setTimeout(function () {
									self.jump(cindex + 1);
								}, 1500);
								return;

							case 12:
								_actions.globActions.nextStep();
								break;

							default:
								self.jump(cindex + 1);break;
						}
					},


					// 捡手机
					pickup: function pickup() {
						self.jump(5);

						audios['iphone'].loop = true;
						audios['iphone'].play();
						audios['iphone'].pause();
					},


					// 不捡手机
					unpickup: function unpickup() {
						var s = self.giveupArr[loops++];
						if (!s) {
							self.jump(2);
						} else if (typeof s === 'string') {
							self.cartInfo[1].text = s;
							self.jump(2);
						} else {
							self.cartInfo[0].text = s[0];
							self.cartInfo[1].text = s[1];
							self.jump(1);
						}
					}
				};
			}

			/* 跳转到指定页 */

		}, {
			key: 'jump',
			value: function jump(index) {
				var self = this;
				switch (index) {

					/*			case 13:
	    				const play = async () => {
	    				
	    					await self.sleep(500);
	    					
	    				};
	    				play();
	    				break;*/

					case 16:
						_actions.globActions.bB();
						_actions.bindActions.send({ action: 'boxShake' });
						_actions.gameActions.showPrompt('睡了一觉感觉好多了，可是现在要怎么逃出这个密室呢？');
						return;

					default:
						break;
				}

				_actions.globActions.setCartoonIndex(index);
			}
		}, {
			key: 'sleep',
			value: function sleep(t) {
				return new _promise2.default(function (resolve, reject) {
					setTimeout(function () {
						resolve();
					}, t);
				});
			}

			/* 开启音频 */

		}, {
			key: 'openAudio',
			value: function openAudio(i) {
				var name = this.cartInfo[i].audio;
				if (name && audios[name]) {
					audios[name].currentTime = 0;
					audios[name].loop = true;
					audios[name].play();
				}
			}

			/* 关闭音频 */

		}, {
			key: 'closeAudio',
			value: function closeAudio(i) {
				var name = this.cartInfo[i].audio;
				name && audios[name] && audios[name].pause();
			}

			// ios在第一次play(需要播放一定时间)时会影响正在播放的音频（卡顿）
			// 解决方案：加载后静音状态下播放3秒

		}, {
			key: 'fixAudioIOSbug',
			value: function fixAudioIOSbug(arr) {
				var j = 0,
				    len = arr.length;
				arr.forEach(function (item, i) {
					var audio = window.audios[item.name];
					audio.play();
					audio.muted = true;
					setTimeout(function () {
						audio.pause();
						audio.muted = false;

						if (++j === len) {
							window.audios['bgm'].currentTime = 0;
							window.audios['bgm'].loop = true;
							window.audios['bgm'].play();
						}
					}, 1000);
				});
			}
		}]);
		return Cartoon;
	}(React.Component);

	Cartoon.defaultProps = {
		cindex: 0, // 要显示的动画的索引值
		hide: false // 是否隐藏该组件
	};
	exports.default = Cartoon;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	__webpack_require__(37);
	__webpack_require__(59);
	__webpack_require__(97);
	module.exports = __webpack_require__(15).Promise;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(41)
	  , global             = __webpack_require__(11)
	  , ctx                = __webpack_require__(16)
	  , classof            = __webpack_require__(98)
	  , $export            = __webpack_require__(14)
	  , isObject           = __webpack_require__(21)
	  , aFunction          = __webpack_require__(17)
	  , anInstance         = __webpack_require__(99)
	  , forOf              = __webpack_require__(100)
	  , speciesConstructor = __webpack_require__(104)
	  , task               = __webpack_require__(105).set
	  , microtask          = __webpack_require__(107)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(58)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(108)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(57)($Promise, PROMISE);
	__webpack_require__(109)(PROMISE);
	Wrapper = __webpack_require__(15)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(110)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 98 */
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
/* 99 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(16)
	  , call        = __webpack_require__(101)
	  , isArrayIter = __webpack_require__(102)
	  , anObject    = __webpack_require__(20)
	  , toLength    = __webpack_require__(53)
	  , getIterFn   = __webpack_require__(103)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 101 */
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(43)
	  , ITERATOR   = __webpack_require__(58)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(98)
	  , ITERATOR  = __webpack_require__(58)('iterator')
	  , Iterators = __webpack_require__(43);
	module.exports = __webpack_require__(15).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(20)
	  , aFunction = __webpack_require__(17)
	  , SPECIES   = __webpack_require__(58)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(16)
	  , invoke             = __webpack_require__(106)
	  , html               = __webpack_require__(56)
	  , cel                = __webpack_require__(25)
	  , global             = __webpack_require__(11)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(51)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(11)
	  , macrotask = __webpack_require__(105).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(51)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(11)
	  , core        = __webpack_require__(15)
	  , dP          = __webpack_require__(19)
	  , DESCRIPTORS = __webpack_require__(23)
	  , SPECIES     = __webpack_require__(58)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 110 */
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	var _gameStore = __webpack_require__(112);

	var _scene = __webpack_require__(114);

	var _scene2 = _interopRequireDefault(_scene);

	var _codedlock = __webpack_require__(115);

	var _codedlock2 = _interopRequireDefault(_codedlock);

	var _equipBar = __webpack_require__(116);

	var _equipBar2 = _interopRequireDefault(_equipBar);

	var _phone = __webpack_require__(118);

	var _phone2 = _interopRequireDefault(_phone);

	var _mural = __webpack_require__(120);

	var _mural2 = _interopRequireDefault(_mural);

	var _share = __webpack_require__(121);

	var _share2 = _interopRequireDefault(_share);

	var _promptLine = __webpack_require__(122);

	var _promptLine2 = _interopRequireDefault(_promptLine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var words = [['如果你看到了这张纸条，那说明你是和我一样的苦命人，都被困在这个该死的房间。没有食物和水，没有办法和外面联系，甚至因为恐惧都没有办法睡着。有时候我会听到一些恐怖的声音，似乎是房间里某个角落传来的。这里一定有什么机关，找到它就能通往其他地方。', '我翻遍了所有角落，发现了一个小隔间，里面却只有一枚戒指…', '我太累了，撑了这么久，还是要死在这里…', '我不会是第一个，你也不会是最后一个…', '在房间里找找看，说不定你就能找到我的尸体。'], ['你也看到了那张纸条对不对？我果然不是一个人！我仔细观察过，房间里的物品都有被动过的迹象，大门的锁也有打开过的痕迹，说明有人进来并且逃出去过！一定有什么办法可以出去的，一定有什么线索被我遗漏了！我不会放弃的，我一定会活下去！', '好心提醒你一下，不要试着去找那个小隔间，你知道那个人为什么会死掉吗？那个发了疯的女人。', '对了，那个人的尸体，你想知道在哪里吗？'], ['今天是第八天了，我饿到连写字的力气都快没有了。', '看到了其他人留下来的纸条，反而让我更加恐惧，这个房间是专门用来囚禁我们的吗？我想我是逃不出去了，我把我的戒指藏在了房间里，如果有人找到并且逃了出去，请你把它也带出去吧…', '好想念外面的世界啊，该死的潘多拉…', '房间里还有一张纸条，上面画满了奇怪的图腾，可是我看不明白。我把它藏在了潘多拉的魔盒里，如果你找到了它，相信它会给你带来好运…']];

	var Game = function (_React$Component) {
		(0, _inherits3.default)(Game, _React$Component);

		function Game() {
			(0, _classCallCheck3.default)(this, Game);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Game.__proto__ || (0, _getPrototypeOf2.default)(Game)).call(this));

			_this.state = _gameStore.gameStore.getData();
			_this.start = false;
			return _this;
		}

		(0, _createClass3.default)(Game, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				_gameStore.gameStore.listen(this.update.bind(this));
				this.blink = true;
				//setTimeout(gameActions.commitData(),1000)

				//setTimeout(gameActions.getRankData.bind(this,function(res){alert(res)}),3000)
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				if (this.props.hide !== nextProps.hide && !nextProps.hide) {
					if (this.state.overstep === 0) {
						this.blink = true;
						setTimeout(function () {
							_this2.blink = false;
							_this2.start = true;
							_actions.gameActions.timeStart();
							_this2.setState({});
							setTimeout(function () {
								audios['iphone'].loop = true;
								audios['iphone'].play();
								_actions.gameActions.showPrompt(['这是什么鬼！！密码门！！？？握草我是不是走错房间了？', '鬼知道我经历了什么。手机响了？手机在哪里？快找找…']);
							}, 300);
						}, 2500);
					}
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var centerDom, paperWords;
				switch (this.state.bigIcon) {
					case 'codedLock':
						centerDom = React.createElement(_codedlock2.default, { overstep: this.state.overstep });break;
					case 'phone':
						centerDom = React.createElement(_phone2.default, null);break;
					case 'mural':
						centerDom = React.createElement(_mural2.default, { flampOpen: this.state.flampOpen, showPaper: this.state.paperPicked.indexOf(9) == -1 });break;
				}
				var arr = words[this.state.paperPicked.length - 1];
				paperWords = arr && arr.map(function (val, i) {
					return React.createElement(
						'p',
						null,
						val
					);
				});

				return React.createElement(
					'div',
					{ className: 'game' + (this.props.hide ? ' hidden' : '') },
					React.createElement(_scene2.default, { opts: this.state }),
					this.state.overstep !== 5 ? React.createElement(
						'div',
						null,
						React.createElement(
							'div',
							{ className: 'left_side' },
							React.createElement('div', { className: 'click_area', onTouchEnd: this.nextScene.bind(this) })
						),
						React.createElement(
							'div',
							{ className: 'right_side' },
							React.createElement('div', { className: 'click_area', onTouchEnd: this.prevScene.bind(this) })
						)
					) : '',
					React.createElement('div', { className: 'mask_layer ' + (this.state.showMaskLayer ? 'show' : '') }),
					React.createElement(_equipBar2.default, { opts: this.state, hide: !this.state.isOpened, overstep: this.state.overstep, equips: this.state.equips, time: this.state.time }),
					React.createElement(
						'div',
						{ className: 'timer' },
						this.formatSecond(this.state.time)
					),
					React.createElement(
						'div',
						{ className: 'big_icon_layer ' + (this.state.bigIcon ? 'show' : ''), onTouchEnd: this.state.autoHide ? this.hideBigIcon.bind(this) : null },
						React.createElement(
							'div',
							null,
							centerDom
						)
					),
					React.createElement(
						'div',
						{ className: 'big_icon_layer ' + (this.state.paper ? 'show' : ''), onTouchEnd: this.hidePaper.bind(this) },
						React.createElement(
							'div',
							null,
							React.createElement(
								'div',
								{ onTouchEnd: this.stopPro, className: 'paper_wrap' },
								paperWords
							)
						)
					),
					this.state.overstep !== 5 && this.start ? React.createElement(_promptLine2.default, { msg: this.state.msg, isOpened: this.state.isOpened, bigIcon: this.state.bigIcon }) : '',
					React.createElement(_share2.default, { hide: this.state.overstep !== 5 }),
					this.blink ? React.createElement(
						'div',
						{ className: 'blink' },
						React.createElement('img', { src: '../static/images/cover/blink.gif' })
					) : ''
				);
			}
		}, {
			key: 'update',
			value: function update(data) {
				this.setState(data);
			}

			/* 隐藏大图层 */

		}, {
			key: 'hideBigIcon',
			value: function hideBigIcon() {
				this.setState({
					showMaskLayer: false,
					bigIcon: ''
				});
			}
		}, {
			key: 'stopPro',
			value: function stopPro(e) {
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
			}
		}, {
			key: 'hidePaper',
			value: function hidePaper() {
				var opts = { paper: false };

				opts.showMaskLayer = !!this.state.bigIcon;

				_actions.gameActions.commit(opts);

				var msg = [['还有其他人被困在这里过！', '他都经历了一些什么？', '可能还会有其他纸条，快找找！'], ['这个房间里还藏着多少秘密？', '上一张纸条里的那个人，果然已经死了吗？'], ['戒指？好像在哪里见过。', '那些图腾是什么呢？', '潘多拉魔盒？', '我越来越好奇了…']];
				_actions.gameActions.showPrompt(msg[this.state.paperPicked.length - 1]);
			}

			/* 前一个场景 */

		}, {
			key: 'prevScene',
			value: function prevScene() {
				this.sceneCut(-1);
			}

			/* 后一个场景 */

		}, {
			key: 'nextScene',
			value: function nextScene() {
				this.sceneCut(1);
			}

			/* 场景切换 */

		}, {
			key: 'sceneCut',
			value: function sceneCut(index) {
				var newCur = this.state.curScenseIndex + index;
				newCur = newCur < 1 ? 5 : newCur > 5 ? 1 : newCur;

				_actions.gameActions.sceneCut(newCur);

				_actions.gameActions.showPrompt('');
			}

			/* 将秒数转化为 hh:mm:ss 格式 */

		}, {
			key: 'formatSecond',
			value: function formatSecond(a) {
				if (a < 0) return '';

				var hh = parseInt(a / 3600),
				    mm = parseInt(a % 3600 / 60),
				    ss = parseInt(a % 60);

				return this.format(hh) + ":" + this.format(mm) + ":" + this.format(ss);
			}

			/* 个位数时，十位补0 */

		}, {
			key: 'format',
			value: function format(d) {
				return d >= 10 ? d : "0" + d;
			}
		}]);
		return Game;
	}(React.Component);

	exports.default = Game;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.gameStore = undefined;

	var _typeof2 = __webpack_require__(34);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _actions = __webpack_require__(92);

	var _config = __webpack_require__(113);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var data = {
	    showMaskLayer: false,

	    bigIcon: '',

	    // 1：四件套绑定成功并设置正确	2：安装睡眠袋子成功		3：完成启动优质睡眠		4：上床睡觉完成		5：输入密码正确
	    overstep: 0,

	    // 当前场景索引
	    curScenseIndex: 1,

	    // 工具栏是否打开
	    isOpened: false,

	    // 落地灯是否打开
	    flampOpen: true,

	    // 计数器
	    time: 0,

	    // 是否显示纸条大图
	    paper: false,

	    paperPicked: [],

	    // 以获取的道具顺序
	    picked: [],

	    /*	
	    	status   		0:未获取   1:可组合    2：可绑定   3：绑定成功但设置不正确  4：绑定成功且设置正确  5：不可操作
	    	combNum			可合成次数
	    */
	    equips: {
	        phone: { status: 0 },
	        aromathMachine: { status: 0, combNum: 2, color: '', gears: 0 },
	        bulb: { status: 0, combNum: 1 },
	        wisdomBox: { status: 0, temperature: 28 },
	        water: { status: 0, combNum: 1 },
	        esseOil: { status: 0, combNum: 1 },
	        lampholder: { status: 0, combNum: 1, color: '', mode: 0 },
	        fleabag: { status: 0 }
	    }
	};

	var gameStore = exports.gameStore = Reflux.createStore({
	    listenables: [_actions.gameActions],
	    onShowPrompt: function onShowPrompt(msg) {
	        this.trigger({ msg: msg });
	    },
	    onGetEquip: function onGetEquip(name) {
	        var equip = data.equips[name];
	        if (data.picked.indexOf(name) > -1) return;

	        switch (name) {
	            case 'phone':
	                equip.status = 5;break;
	            case 'wisdomBox':
	            case 'fleabag':
	                equip.status = 2;break;
	            case 'lampholder':
	                if (equip.status === 0) equip.status = 1;else return;
	                break;
	            default:
	                equip.status = 1;break;
	        }
	        data.picked.push(name);
	        this.trigger(data);
	    },


	    // 显示大图层
	    onMagnify: function onMagnify(obj) {
	        var opts = {
	            bigIcon: '',
	            showMaskLayer: true,
	            autoHide: true
	        };

	        if (typeof obj === 'string') {
	            opts.bigIcon = obj;
	        } else {
	            opts = obj;
	        }

	        this.trigger(opts);
	    },
	    getData: function getData() {
	        return data;
	    },
	    onSetOverStep: function onSetOverStep(num) {
	        data.overstep = num;
	        if (num === 2) {
	            data.equips.fleabag.status = -1;
	        }
	        this.trigger(data);
	    },
	    onCombEquip: function onCombEquip(name, material) {
	        var info = data.equips[name];

	        // 材料消失
	        data.equips[material].status = -1;

	        // 设备合成完成后变成可绑定状态
	        --info.combNum === 0 ? info.status = 2 : '';

	        data.showMaskLayer = false;

	        this.trigger(data);
	    },
	    onShowMaskLayer: function onShowMaskLayer(flag) {
	        data.showMaskLayer = flag;
	        this.trigger({
	            showMaskLayer: flag
	        });
	    },
	    onToggleEquip: function onToggleEquip(obj) {
	        data.showMaskLayer = false;
	        data.isOpened = obj.isOpened;
	        this.trigger(data);
	    },
	    onSceneCut: function onSceneCut(index) {
	        data.curScenseIndex = index;
	        this.trigger(data);
	    },
	    onCommit: function onCommit(obj) {
	        for (var attr in obj) {
	            data[attr] !== undefined && (data[attr] = obj[attr]);
	        }
	        this.trigger(data);
	    },
	    onSetEquipOptions: function onSetEquipOptions(name, opts) {
	        var obj = data.equips[name];
	        for (var attr in opts) {
	            if (obj[attr] !== undefined) obj[attr] = opts[attr];
	        }

	        switch (name) {
	            case 'aromathMachine':
	                obj.status = obj.color === 'green' && obj.gears > 0 ? 4 : 3;
	                break;
	            case 'fleabag':
	                break;
	            case 'lampholder':
	                obj.status = obj.color === 'pink' && obj.mode === 1 ? 4 : 3;
	                break;
	            case 'wisdomBox':
	                obj.status = obj.temperature === 26 ? 4 : 3;
	                break;
	        }

	        if (data.equips.aromathMachine.status === 4 && data.equips.fleabag.status === 4 && data.equips.lampholder.status === 4 && data.equips.wisdomBox.status === 4) {
	            data.overstep = 1;
	        } else {
	            data.overstep = 0;
	        }

	        this.trigger(data);
	    },
	    onTimeStart: function onTimeStart() {
	        var _this = this;

	        this.timer = setInterval(function () {
	            _this.trigger({ time: ++data.time });
	        }, 1000);
	    },
	    onTimeStop: function onTimeStop() {
	        clearInterval(this.timer);
	    },
	    getTime: function getTime() {
	        if (data.overstep != 5) return null;
	        return data.time;
	    },
	    onShowPaper: function onShowPaper(num) {
	        data.paper = true;
	        data.showMaskLayer = true;
	        data.paperPicked.push(num);
	        this.trigger(data);
	    },
	    onCommitData: function onCommitData(fn) {
	        var now = new Date();var appId = _config2.default.appId;
	        var userInfo = _config2.default.userInfo;
	        var env = _config2.default.env;
	        var wechatId = _config2.default.wechatId;
	        var url = env.frontRoot + 'v1/app/csleep/chamber/addValue';
	        if (wechatId) {
	            var sendData = {
	                wechatId: wechatId,
	                wechatName: userInfo.nickname,
	                wechatIcon: userInfo.headimgurl,
	                challengeDuration: data.time,
	                appId: appId,
	                dataTime: now.Format('yyyy-MM-dd hh:mm:ss'),
	                timestamp: +Date.now()
	            };

	            sendData.sign = this.getSign('post', url, sendData);

	            Ajax.post(url, sendData, fn);
	        }
	    },
	    onGetRankData: function onGetRankData(fn) {
	        var now = new Date();var appId = _config2.default.appId;
	        var userInfo = _config2.default.userInfo;
	        var env = _config2.default.env;
	        var wechatId = _config2.default.wechatId;
	        var url = env.frontRoot + 'v1/app/csleep/chamber/getRank';
	        if (wechatId) {
	            var sendData = {
	                appId: appId,
	                wechatId: wechatId,
	                timestamp: +Date.now()
	            };

	            sendData.sign = this.getSign('get', url, sendData);
	            Ajax.get(url, sendData, fn);
	        }
	    },


	    /**
	     * 计算sign的方法
	     * @param  {string} type 请求的类型("GET"/"POST",默认为POST)
	     * @param  {string} url 请求的地址(绝对路径,"https://"开头)
	     * @param  {object} data 请求的参数对象(包含所有参数key:value对)
	     * @return {string} sign 返回获取到的sign
	     */
	    getSign: function getSign(type, url, data) {
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
	        signStr = signStr + "&" + _config2.default.appSecret;
	        return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(signStr));
	    }
	});

/***/ },
/* 113 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var env, gMain;

	!function () {

	    // 预发布环境
	    if (location.host == 'weixin.hetyj.com') {
	        env = {
	            apiPath: 'https://weixin.hetyj.com/clife-wechat-preRelease/',
	            frontPath: 'https://weixin.hetyj.com/pre-wechat/',
	            frontRoot: 'https://weixin.hetyj.com/',
	            backendPath: 'http://test.api.clife.cn/',
	            appId: 'wxc4b9a11ff3f0c8dd' // 微信公众号appid
	        };

	        // 正式环境
	    } else if (location.host == 'wechat.hetyj.com') {
	        env = {
	            apiPath: 'https://wechat.hetyj.com/clife-wechat/',
	            frontPath: 'https://wechat.hetyj.com/web-wechat/',
	            frontRoot: 'https://wechat.hetyj.com/',
	            backendPath: 'http://api.clife.cn/',
	            appId: 'wx206f167ed3db5d27'
	        };

	        // 测试环境
	    } else {
	        env = {
	            apiPath: 'https://weixin.clife.cn/clife-wechat-test/',
	            frontPath: 'https://weixin.clife.cn/web-wechat/',
	            frontRoot: 'https://weixin.clife.cn/',
	            backendPath: 'http://200.200.200.50/',
	            appId: 'wxb5e64ab92b87c80b'
	        };
	    }

	    gMain = {
	        env: env,
	        wechatId: getCookie('wechatUserId'),
	        userInfo: {},
	        appSecret: 'bf1f3ce24b304af3ab7971aaec318135',
	        appId: '10014' // 睡眠产品appid
	    };

	    // 没授权跳转到授权页面
	    if (!gMain.wechatId) {
	        location.href = env.apiPath + 'wechat/user/login?format=json&type=1&redirect=' + env.frontPath + 'escapeRoom/page/index.html' + '?appid=' + env.appId;
	    }
	}();

	window.Ajax = {
	    get: function get(url, data, fn) {
	        if (typeof data === 'function') {
	            fn = data;
	            data = null;
	        }
	        if (data) url += '?' + formatParams(data);

	        var obj = new XMLHttpRequest(); // XMLHttpRequest对象用于在后台与服务器交换数据          
	        obj.open('GET', url, true);
	        obj.onreadystatechange = function () {
	            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
	                // readyState==4说明请求已完成
	                fn && fn.call(this, obj.responseText); //从服务器获得数据
	            }
	        };
	        obj.send(null);
	    },
	    post: function post(url, data, fn) {
	        var obj = new XMLHttpRequest();
	        obj.open("POST", url, true);
	        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
	        obj.onreadystatechange = function () {
	            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {
	                // 304未修改
	                fn && fn.call(this, obj.responseText);
	            }
	        };
	        obj.send(formatParams(data));
	    }
	};

	Date.prototype.Format = function (fmt) {
	    //author: meizz 
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

	function formatParams(data) {
	    if (!data) return null;
	    var arr = [];
	    for (var name in data) {
	        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	    }
	    //设置随机数，防止缓存
	    //arr.push("t="+Math.random());
	    return arr.join("&");
	}

	function getCookie(name) {
	    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	    if (arr != null) return unescape(arr[2]);
	    return null;
	}

	exports.default = gMain;

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Scene = function (_React$Component) {
		(0, _inherits3.default)(Scene, _React$Component);

		function Scene() {
			(0, _classCallCheck3.default)(this, Scene);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Scene.__proto__ || (0, _getPrototypeOf2.default)(Scene)).call(this));

			_this.state = { baglight: false };
			/* 
	  	数组内每个对象对应一个场景，name为场景类名,children为该场景可操作或变化元素的图层
	  */
			_this.config = [{
				name: 'scene1',
				children: [{ name: 'codedlock', msg: '门被锁住了！去哪里才能找到密码呢？' }, { name: 'phone', msg: '这不是我的手机，是谁打来的电话？' }, { name: 'waterB', msg: '这水已经过期了吧…' }, { name: 'tablelamp', msg: '灯架都已经开始生锈了…' }, { name: 'bag', msg: '袋子里面什么也没有' }, { name: 'CD', msg: '这是我以前收藏的动作片吧…' }, { name: 'file', msg: '上面写着一些奇怪的文字，是谁的恶作剧吗？' }, { name: 'wine', msg: '这瓶水，隔着老远就闻到了一股怪味。' }, { name: 'door', msg: '用力推也打不开，我要被困死在这里了吗？怎么办？！' }]
			}, {
				name: 'scene2',
				children: [{ name: 'phone', msg: '这不是我的手机，是谁打来的电话？' }, { name: 'bulb', msg: '这个灯泡有点蹊跷。', audio: 'gold' }, { name: 'computer', msg: '好像还有工作没有做完…' }, { name: 'keyboard', msg: '键盘上是什么液体？好恶心…' }, { name: 'photoframe', msg: '真怀念曾经帅气的秀发啊…' }, { name: 'book', msg: '好久没静下心来看一本书了…唉，天天拥抱工作，时间都去哪了？' }, { name: 'bookB', msg: '这些书不是用来学习的吧…' }, { name: 'chair', msg: '椅子上有好多灰尘' }, { name: 'ashtray', msg: '抽烟有害健康，还是早点戒了吧…' }, { name: 'CD', msg: '这是我以前收藏的动作片吧…' }, { name: 'tablelamp', msg: '灯架都已经开始生锈了…' }, { name: 'file', msg: '上面写着一些奇怪的文字，是谁的恶作剧吗？' }, { name: 'bottle', msg: '这里面似乎装的是酒精，我可以…' }, { name: 'wine', msg: '这瓶水，隔着老远就闻到了一股怪味。' }, { name: 'glassbox', msg: '奇怪的东西，但好像没有什么用' }, { name: 'glass', msg: '好渴，但是杯子里是空的。' }, { name: 'mouse', msg: '一个鼠标有什么用呢？' }, { name: 'socket', msg: '我还是找找电话里说的智能助眠工具吧。' }]
			}, {
				name: 'scene3',
				children: [{ name: 'aromathMachine', msg: '找到一个香薰灯！传说中的智能睡眠硬件吗！', audio: 'gold' }, { name: 'wisdomBox', msg: '低调酷炫的智慧盒子！！好热，我想调一下空调…', audio: 'gold' }, { name: 'water', msg: ['青藏高原4300米古冰川矿泉水！！我什么时候买过这么贵的矿泉水？', '咦！上面好像写着香薰机专用水？'], audio: 'gold' }, { name: 'esseOil', msg: '找到一瓶昂贵的香薰精油！', audio: 'gold' }, { name: 'lampholder', msg: '里面没有灯泡，四处找找看', audio: 'gold' }, { name: 'fleabag', msg: '地毯下藏着一条睡眠监测器！怎么连接手机呢？', audio: 'gold' }, { name: 'fleabagBed', msg: '' }, { name: 'bed' }, { name: 'socks', msg: '一个月没洗的臭袜子！这房间缺个女主人啊…我在想什么鬼？' }, { name: 'drawer', msg: '里面什么也没有…' }, { name: 'pillow', msg: '明明是单身狗，为什么要放两个枕头呢？' }, { name: 'curtainA', msg: '窗帘上的灰尘很多…' }, { name: 'curtainB', msg: '窗帘上的灰尘很多…' }, { name: 'window', msg: '窗户也被锁住了，看这材质似乎也没办法砸破' }, { name: 'clothes', msg: '这衣服和隔壁老王的好像…' }, { name: 'jeans', msg: '这裤子和隔壁老王的好像…' }, { name: 'sound', msg: '想来一首催眠曲，听听大自然的声音。' }, { name: 'TVbench', msg: '抽屉里面都是杂物，我是多久没有好好打扫房间了。' }, { name: 'slipper', msg: '一双没什么用的臭拖鞋…' }, { name: 'quilt', msg: '好想滚床单…' }, { name: 'TV', msg: '今天是几号来着？电视台今天好像没有播非诚勿扰。' }, { name: 'vase', msg: '要记得给花瓶里加点水…' }, { name: 'magazine', msg: '一堆没用的杂志' }, { name: 'carpet', msg: '地毯下面也没有什么有用的信息。' }, { name: 'littleSound', msg: '这好像前女友送我的音箱，唉…' }, { name: 'paper', msg: '', index: 2 }]
			}, {
				name: 'scene4',
				children: [{ name: 'aromathMachine', msg: '找到一个香薰灯！传说中的智能睡眠硬件吗！', audio: 'gold' }, { name: 'esseOil', msg: '找到一瓶昂贵的香薰精油！', audio: 'gold' }, { name: 'lampholder', msg: '找到一个低调奢华有内涵的灯罩！可是里面没有灯泡。', audio: 'gold' }, { name: 'fleabag', msg: '地毯下藏着一条睡眠监测器！怎么连接手机呢？', audio: 'gold' }, { name: 'mural', msg: '' }, { name: 'guitar', msg: '好想唱歌…可惜没人欣赏…' }, { name: 'drawer', msg: '里面什么也没有…' }, { name: 'pillow', msg: '明明是单身狗，为什么要放两个枕头呢？' }, { name: 'chest', msg: '里面全是两周没洗的脏衣服，味道好大，熏得我好难受！' }, { name: 'quilt', msg: '好想滚床单…' }, { name: 'clothes', msg: '这衣服和隔壁老王的好像…' }, { name: 'jeans', msg: '这裤子和隔壁老王的好像…' }, { name: 'bed' }, { name: 'plant', msg: '这株植物打理的不错…' }, { name: 'paper', msg: '', index: 1 }, { name: 'muralPaper', msg: '', index: 9 }]
			}, {
				name: 'scene5',
				children: [{ name: 'water', msg: ['青藏高原4300米古冰川矿泉水！！我什么时候买过这么贵的矿泉水？', '咦！上面好像写着香薰机专用水？'], audio: 'gold' }, { name: 'wisdomBox', msg: '低调酷炫的智慧盒子！！好热，我想调一下空调…', audio: 'gold' }, { name: 'flamp', msg: '', audio: 'switch' }, { name: 'mirror', msg: '没心情照镜子，头发乱糟糟的…' }, { name: 'aircondition', msg: '好热啊，想开空调…' }, { name: 'TV', msg: '今天是几号来着？电视台今天好像没有播非诚勿扰。' }, { name: 'soundA', msg: '想来一首催眠曲，听听大自然的声音。' }, { name: 'soundB', msg: '想来一首催眠曲，听听大自然的声音。' }, { name: 'TVbench', msg: '抽屉里面都是杂物，我是多久没有好好打扫房间了。' }, { name: 'clife', msg: 'C-Life是智能家居时代，你的专属生活方式。' }, { name: 'vase', msg: '要记得给花瓶里加点水…' }, { name: 'magazine', msg: '一堆没用的杂志' }, { name: 'littleSound', msg: '这好像前女友送我的音箱，唉…' }, { name: 'paper', msg: '', index: 2 }]
			}];
			return _this;
		}

		(0, _createClass3.default)(Scene, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				setInterval(function () {
					_this2.setState({ baglight: !_this2.state.baglight });
				}, 400);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var arr = [],
				    opts = this.props.opts;

				this.config.forEach(function (obj, i) {
					var arr2 = [];

					// 图层生成
					obj.children.forEach(function (item, j) {
						var name = item.name,
						    o = opts.equips[name],
						    msg = item.msg;

						// 捡起来的纸团不显示
						if ((name === 'paper' || name === 'muralPaper') && opts.paperPicked.indexOf(item.index) > -1) return;

						// 显示装饰品、没被捡起的道具(灯罩除外)图层
						if (!o || o && o.status === 0 || name === 'lampholder') {
							var extrClass = "";

							// 显示床上睡眠袋安装位置
							if (name === 'fleabagBed') {
								if (opts.overstep === 1 && _this3.state.baglight) extrClass = 'fleabagBed-xu';
								if (opts.overstep >= 2) extrClass = 'fleabagBed-shi';
							}

							if (name === 'phone' && _this3.state && _this3.state.phoneShake) {
								extrClass += ' phoneShake';
							}

							// 落地灯亮灭
							if (name === 'flamp') {
								var src = opts.flampOpen ? '../static/images/icon/flamp-open.png' : '../static/images/icon/flamp-close.png';
								arr2.push(React.createElement(
									'div',
									{ key: j, className: name + (i + 1), onTouchEnd: _this3.touch.bind(_this3, item) },
									React.createElement('img', { className: 'flamp5-img', src: src })
								));
							} else {

								// 添加图层
								arr2.push(React.createElement(
									'div',
									{ key: j, className: name + (i + 1) + ' ' + extrClass },
									React.createElement('div', { className: 'ope_wrap', onTouchEnd: _this3.touch.bind(_this3, item) })
								));
							}
						}
					});

					// 添加场景
					arr.push(React.createElement(
						'div',
						{ key: i, className: 'scene_item ' + obj.name + (opts.curScenseIndex === i + 1 ? ' show' : '') },
						arr2
					));
				});

				return React.createElement(
					'div',
					{ className: 'scene', onTouchEnd: this.touchVoice.bind(this) },
					arr,
					this.state && this.state.fly ? React.createElement('img', { className: 'ani-fly ' + this.state.flyObj, src: '../static/images/icon/' + this.state.flyObj + '.png' }) : ''
				);
			}

			/* 获取道具的详细信息 */

		}, {
			key: 'getEquipInfo',
			value: function getEquipInfo(name) {
				return this.props.opts.equips[name];
			}
		}, {
			key: 'touchVoice',
			value: function touchVoice() {
				audios['touch'].currentTime = 0;
				audios['touch'].play();
			}
		}, {
			key: 'touch',
			value: function touch(item, e) {
				var name = item.name;
				var msg = item.msg;
				var audio = item.audio;
				var info = this.getEquipInfo(name);

				// 灯罩捡起一次后不再显示提示信息
				if (name === 'lampholder') {

					if (info.status !== 0) msg = '';
					if (info.status === 2) msg = '什么颜色的光线适合睡觉？';
				}

				if (name === 'bed' && this.props.overstep === 4) {
					msg = '感觉焕然一新！';
				}

				if (name === 'aircondition') {
					var obj = this.getEquipInfo('wisdomBox');

					msg = obj.temperature === 26 ? '温度终于降下来了，凉快多了…' : '好热啊，想开空调…';
				}

				// 显示提示信息
				msg && _actions.gameActions.showPrompt(msg);
				if (!info || !info.status || info.status === 0) {
					audio = audio && audios[audio] || null;
					audio && (audio.currentTime = 0);
					audio && audio.play();
				}

				switch (name) {
					// 可收藏的道具
					case 'phone':case 'bulb':case 'aromathMachine':case 'wisdomBox':case 'water':
					case 'esseOil':case 'lampholder':case 'fleabag':
						_actions.gameActions.getEquip(name);

						// 手机弹出手机大图
						if (name === 'phone') {
							_actions.gameActions.magnify({
								bigIcon: 'phone',
								showMaskLayer: false,
								autoHide: false
							});
						}

						if (name !== 'phone' && info.status === 0) {
							_actions.bindActions.send({ action: 'boxShake' });
							this.setState({ fly: false }, function () {
								this.setState({ fly: true, flyObj: name });
							});
						}

						e.stopPropagation();
						e.nativeEvent.stopImmediatePropagation();

						break;

					// 密码锁
					case 'codedlock':
						_actions.gameActions.magnify('codedLock');break;

					// 安装睡眠带
					case 'fleabagBed':
						if (this.props.opts.overstep === 1) {
							_actions.bindActions.send({ action: 'placeFleabag' });
						}
						break;

					// 点击床睡觉
					case 'bed':
						switch (this.props.opts.overstep) {
							case 3:
								_actions.globActions.sleep();
								_actions.gameActions.commit({ overstep: 4 });
								break;

							case 4:
								_actions.gameActions.showPrompt('睡了一觉感觉好多了，可是现在要怎么逃出这个密室呢？');
								break;

							default:
								_actions.gameActions.showPrompt('我好困啊，怎么让这助眠产品起作用呢？');break;
						}
						break;

					// 落地灯
					case 'flamp':
						_actions.gameActions.commit({ flampOpen: !this.props.opts.flampOpen });
						if (this.props.opts.flampOpen) {
							_actions.gameActions.showPrompt('这盏灯好像和其他东西有什么联系，要不去四周找找看？');
						} else {
							_actions.gameActions.showPrompt('这盏落地灯好像有什么秘密…');
						}

						e.stopPropagation();
						e.nativeEvent.stopImmediatePropagation();
						break;

					// 壁画
					case 'mural':
						_actions.gameActions.magnify('mural');break;

					// 纸团
					case 'paper':
						_actions.gameActions.showPaper(item.index);break;
				}
			}
		}]);
		return Scene;
	}(React.Component);

	exports.default = Scene;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CodedLock = function (_React$Component) {
		(0, _inherits3.default)(CodedLock, _React$Component);

		function CodedLock() {
			(0, _classCallCheck3.default)(this, CodedLock);

			var _this = (0, _possibleConstructorReturn3.default)(this, (CodedLock.__proto__ || (0, _getPrototypeOf2.default)(CodedLock)).call(this));

			_this.state = { value: '', color: '' };
			_this.PASSWORD = '88006008';
			_this.isCommited = false;
			return _this;
		}

		(0, _createClass3.default)(CodedLock, [{
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.interval && clearInterval(this.interval);
			}
		}, {
			key: 'render',
			value: function render() {
				var btns = [],
				    i;

				for (i = 0; i < 12; i++) {
					btns.push(React.createElement('div', { key: i, className: 'btn btn' + i, onTouchEnd: this.setValue.bind(this, i) }));
				}

				return React.createElement(
					'div',
					{ className: 'coded_lock_wrap', onTouchEnd: this.stopPro },
					React.createElement('input', { className: 'pwd_input ' + this.state.color, type: 'text', placeholder: '\u8BF7\u8F93\u51658\u4F4D\u6570\u5BC6\u7801', value: this.state.value, readOnly: true }),
					React.createElement(
						'div',
						null,
						btns
					)
				);
			}
		}, {
			key: 'setValue',
			value: function setValue(i) {
				var val = this.state.value,
				    color;

				this.interval && clearInterval(this.interval);
				_actions.gameActions.showPrompt('');
				audios['keypress'].currentTime = 0;
				audios['keypress'].play();

				// 删除
				if (i === 10) {
					val = val.substring(0, val.length - 1);

					// 确认
				} else if (i === 11) {
					this.submit();
				} else {
					val.length < 8 ? val += i : '';
				}

				if (val.length === 8 && val === this.PASSWORD && this.props.overstep === 4) {
					color = 'green';
					_actions.gameActions.showPrompt('恭喜你找到了正确密码，可以逃离这个密室啦');
				} else {
					color = '';
				}

				this.setState({ value: val, color: color });
			}
		}, {
			key: 'stopPro',
			value: function stopPro(e) {
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
			}
		}, {
			key: 'submit',
			value: function submit() {
				var _this2 = this;

				if (this.state.color === 'green') {
					if (this.isCommited) return;
					_actions.gameActions.timeStop();
					_actions.gameActions.commitData(function (res) {});

					document.querySelector('.timer').style.display = 'none';
					audios['bgm'].pause();

					setTimeout(function () {
						audios['closedoor'].currentTime = 0;
						audios['closedoor'].play();

						setTimeout(function () {
							_actions.gameActions.commit({ overstep: 5, showMaskLayer: true });

							audios['cheer'].currentTime = 0;
							audios['cheer'].play();
							_actions.globActions.showRank(true);
						}, 1800);
					}, 1000);
				} else {
					_actions.gameActions.showPrompt('密码错误');
					this.setState({ color: 'red' });
					this.interval = setInterval(function () {
						var color = _this2.state.color === 'red' ? 'brown' : 'red';
						_this2.setState({ color: color });
					}, 500);
				}
			}
		}]);
		return CodedLock;
	}(React.Component);

	exports.default = CodedLock;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	var _equip = __webpack_require__(117);

	var _equip2 = _interopRequireDefault(_equip);

	var _phone = __webpack_require__(118);

	var _phone2 = _interopRequireDefault(_phone);

	var _bindStore = __webpack_require__(119);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EquipBar = function (_React$Component) {
		(0, _inherits3.default)(EquipBar, _React$Component);

		function EquipBar() {
			(0, _classCallCheck3.default)(this, EquipBar);

			var _this = (0, _possibleConstructorReturn3.default)(this, (EquipBar.__proto__ || (0, _getPrototypeOf2.default)(EquipBar)).call(this));

			_this.selectedEquips = [];
			_this.lastIndex = 0;
			return _this;
		}

		(0, _createClass3.default)(EquipBar, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.props.hide !== nextProps.hide) {
					this.resetAttr();
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.removeListener = _bindStore.bindStore.listen(this.accept.bind(this));
			}
		}, {
			key: 'accept',
			value: function accept(data) {
				if (data && data.action === 'placeFleabag') {
					if (this.curEquip === 'fleabag') _actions.gameActions.setOverStep(2);
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.removeListener();
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var arr = [],
				    arr2 = [],
				    eqs = this.props.equips,
				    // 道具信息集
				se = this.selectedEquips; // 当前选择的道具名

				arr.push(React.createElement('div', { key: -1, className: 'close_bar', onTouchEnd: this.closeBar.bind(this) }));

				// 渲染工具栏
				this.props.opts.picked.forEach(function (name, i) {
					var item = eqs[name],

					//i = item.index,									// 在道具栏中的索引
					selected = name === se[0] || name === se[1]; // 是否选中;

					// 添加道具
					if (item.status > 0) {

						arr.push(React.createElement(
							'div',
							{ key: i, className: 'equip_cell eqc' + i + (selected ? ' selected' : ''), onTouchEnd: _this2.selectCell.bind(_this2, name) },
							item.status === 1 ? React.createElement('i', { className: 'bar_comb_icon' }) : item.status === 3 || name === 'phone' && (_this2.props.overstep == 2 || _this2.props.overstep == 4) ? React.createElement('i', { className: 'bar_excl_icon' }) : item.status === 4 ? React.createElement('i', { className: 'bar_hook_icon' }) : '',
							React.createElement(
								'div',
								{ className: 'equip_div' },
								React.createElement('img', { src: '../static/images/icon/' + name + '.png' })
							)
						));
					}
				});

				// 渲染大图层
				if (se.length === 1) {
					var equipInfo = this.getEquipInfo(se[0]);

					if (equipInfo.combNum || this.props.opts.picked.indexOf('phone') == -1) {
						arr2.push(React.createElement(
							'div',
							{ key: '1', className: 'equip_box box0' },
							React.createElement('img', { src: '../static/images/icon/' + se[0] + '.png' })
						));
					} else {
						if (equipInfo.status === 4 && this.isopen || equipInfo.status === 2 || equipInfo.status === 3) {
							arr2.push(React.createElement(_equip2.default, { key: '2', name: se[0], info: equipInfo }));
							arr2.push(React.createElement(_phone2.default, { key: '3', name: se[0], info: equipInfo }));
							this.isopen = true;
						} else {
							this.isopen = false;
						}
						this.curEquip = se[0];
					}

					if (equipInfo.status === 5) {
						var phoneIndex;
						if (this.props.overstep < 2) phoneIndex = 14;
						if (this.props.overstep === 2) phoneIndex = 12;
						if (this.props.overstep === 3) phoneIndex = 14;
						if (this.props.overstep === 4) phoneIndex = 13;
						arr2.push(React.createElement(_phone2.default, { key: '7', index: phoneIndex }));
					}
				}
				if (se.length === 2) {
					arr2.push(React.createElement(
						'div',
						{ key: '4', className: 'equip_box box1' },
						React.createElement('img', { src: '../static/images/icon/' + se[0] + '.png' })
					));
					arr2.push(React.createElement(
						'div',
						{ key: '5', className: 'equip_box box2' },
						React.createElement('img', { src: '../static/images/icon/' + se[1] + '.png' })
					));
					arr2.push(React.createElement(
						'div',
						{ key: '6', className: 'equip_box box3' },
						React.createElement('input', { className: 'combine_btn', type: 'button', onTouchEnd: this.combine.bind(this) })
					));
				}

				return React.createElement(
					'div',
					{ className: 'equips_wrap' + (this.props.hide ? ' hidden' : '') },
					arr2,
					React.createElement(
						'div',
						{ className: 'equip_bar' },
						arr
					)
				);
			}

			/* 点击选择道具 */

		}, {
			key: 'selectCell',
			value: function selectCell(val) {
				var selects = this.selectedEquips,
				    fun = this.getEquipInfo.bind(this),
				    newInfo = fun(val),
				    // 要选择的最新道具信息
				curr1 = fun(selects[0] || ''),
				    // 当前第一个道具的信息
				curr2 = fun(selects[1] || ''); // 当前第二个道具的信息

				if (val === selects[0] || val === selects[1]) return;

				this.isopen = false;

				switch (newInfo.status) {

					// 不可组合项
					case 5:case 4:case 3:case 2:
						selects.length = 0;
						selects.push(val);
						if (this.props.opts.picked.indexOf('phone') === -1) {
							_actions.gameActions.showPrompt('似乎需要一个手机才能进行绑定，快四处找找');
							_actions.gameActions.showMaskLayer(true);
							return;
						}
						break;

					// 可组合
					case 1:
						if (!curr1 || curr1 && curr1.combNum && !curr2) {
							// 都没有或则只有一个可组合的
							this.lastIndex = curr1 ? 1 : 0;
							selects.push(val);
						} else if (curr1.combNum) {
							// 有两个可组合的时候替换掉先添加的那一个
							this.lastIndex = +!this.lastIndex;
							selects[this.lastIndex] = val;
						} else {
							// 不可组合的清空
							selects.length = 0;
							selects.push(val);
						}
						break;

					case 0:case -1:
						// 尚未获取、合成消失项目
						return;
				}

				this.showPrompt(val, newInfo);

				// 绑定并且设置正确的四件套不显示遮罩层
				_actions.gameActions.showMaskLayer(selects.length && newInfo.status != 4);
			}

			/* 提示 */

		}, {
			key: 'showPrompt',
			value: function showPrompt(name, info) {
				var msg = '';

				switch (name) {
					case 'aromathMachine':
						if (info.combNum === 2) {
							msg = '智能香薰灯！还需要找到水和精油';
						} else if (info.status === 2) {
							msg = '按住喷雾键3秒，wifi灯闪烁后可以进入绑定状态。';
						}
						break;

					case 'water':
						msg = '昂贵的古冰川矿泉水；倒进香薰机看看！';break;

					case 'fleabag':
						info.status === 2 && (msg = ['这是一条可以实时监测睡眠数据的带子！好像是在床单下使用的。', '可是，该怎么绑定手机呢？二维码在哪里？']);break;

					case 'bulb':
						msg = ['小灯泡有大能量。', '需要一个能通电的东西。'];break;

					case 'lampholder':
						if (info.combNum) {
							msg = '里面没有灯泡，四处找找看';
						} else if (info.status === 2) {
							msg = '连续开关4次可绑定手机。';
						}
						break;

					case 'wisdomBox':
						info.status === 2 && (msg = ['这是一个神秘的黑盒子，好像可以控制空调', '屁股上有个小白点！快速地戳3下试试！！']);break;

					case 'esseOil':
						msg = '这香薰的味道让我昏昏欲睡…';break;

					case 'phone':
						break;

					default:
						break;
				}

				if (this.selectedEquips.length === 2) msg = '这样似乎行不通，得想想其他的办法';

				this.isAWcombine() && (msg = '把矿泉水倒进去看看。');

				this.isAEcombine() && (msg = '把香薰精油倒进去看看。');

				this.isBLcombine() && (msg = '这两个应该可以组合起来，试试看');

				_actions.gameActions.showPrompt(msg);
			}

			/* 获取道具的详细信息 */

		}, {
			key: 'getEquipInfo',
			value: function getEquipInfo(name) {
				return this.props.equips[name];
			}
		}, {
			key: 'closeBar',
			value: function closeBar() {
				_actions.gameActions.toggleEquip({
					showMaskLayer: false,
					isOpened: false
				});
			}

			/* 道具合成 */

		}, {
			key: 'combine',
			value: function combine() {
				var equip, material, msg;

				// 选择的是香薰机和水
				this.isAWcombine() && (material = 'water') && (equip = 'aromathMachine') && (msg = '香薰机发生了一点变化');

				// 选择的是香薰机和精油
				this.isAEcombine() && (material = 'esseOil') && (equip = 'aromathMachine') && (msg = '香薰机发生了一点变化');

				// 选择的是灯泡和灯罩
				this.isBLcombine() && (material = 'bulb') && (equip = 'lampholder') && (msg = '太好了，台灯能够用了');

				material ? this.resetAttr() && _actions.gameActions.combEquip(equip, material) : '';

				msg && _actions.gameActions.showPrompt(msg);
			}

			/* 当前是否为香薰机和水的组合 */

		}, {
			key: 'isAWcombine',
			value: function isAWcombine() {
				var s = this.selectedEquips.toString();
				return s === 'aromathMachine,water' || s === 'water,aromathMachine';
			}

			/* 当前是否为香薰机和精油的组合 */

		}, {
			key: 'isAEcombine',
			value: function isAEcombine() {
				var s = this.selectedEquips.toString();
				return s === 'aromathMachine,esseOil' || s === 'esseOil,aromathMachine';
			}

			/* 当前是否为灯罩和灯泡的组合 */

		}, {
			key: 'isBLcombine',
			value: function isBLcombine() {
				var s = this.selectedEquips.toString();
				return s === 'bulb,lampholder' || s === 'lampholder,bulb';
			}
		}, {
			key: 'resetAttr',
			value: function resetAttr() {
				this.selectedEquips = [];
				this.lastIndex = 0;
				this.isopen = false;
				this.curEquip = null;
				return true;
			}
		}]);
		return EquipBar;
	}(React.Component);

	exports.default = EquipBar;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Equip = function (_React$Component) {
		(0, _inherits3.default)(Equip, _React$Component);

		function Equip() {
			(0, _classCallCheck3.default)(this, Equip);
			return (0, _possibleConstructorReturn3.default)(this, (Equip.__proto__ || (0, _getPrototypeOf2.default)(Equip)).apply(this, arguments));
		}

		(0, _createClass3.default)(Equip, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.evs = this.events();
				this.resetState();
				this.state = { vari: false };
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.props.name !== nextProps.name) {
					this.resetState();
				}
			}
		}, {
			key: 'resetState',
			value: function resetState() {
				this.interval && clearInterval(this.interval);
				this.state = { vari: false };
				this.status = this.props.info.status;
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.interval && clearInterval(this.interval);
			}
		}, {
			key: 'render',
			value: function render() {
				var arr = [],
				    vice = '',
				    bgi,
				    name = this.props.name,
				    info = this.props.info,
				    evs = this.evs;

				// 绑定阶段操作四件套大图 (如：熏香机智慧盒灯光闪烁、 睡眠袋翻转、开关助眠灯)
				info.status === 2 && this.state.vari && (vice = '-variation');

				// 绑定成功后手机设置四件套 (如：熏香机和助眠灯颜色设置)
				(info.status === 3 || info.status === 4) && info.color && (vice = '-' + info.color);

				bgi = '../static/images/icon/' + name + vice + '.png';

				switch (name) {
					case 'aromathMachine':
						arr.push(React.createElement('div', { className: 'spray_btn', onTouchStart: evs.longPressStart, onTouchEnd: evs.clearLongPress, onTouchMove: evs.clearLongPress }));
						break;
					case 'fleabag':
						arr.push(React.createElement('div', { className: 'turnover_btn', onTouchEnd: evs.turnover }));
						break;
					case 'wisdomBox':
						arr.push(React.createElement('div', { className: 'white_btn', onTouchEnd: evs.clickInaline }));
						break;
					case 'lampholder':
						arr.push(React.createElement('div', { className: 'switch_btn', onTouchEnd: evs.lswitch }));
						break;
				}

				return React.createElement(
					'div',
					{ className: 'equip_wrap' },
					React.createElement('img', { className: 'equip_bg', src: bgi }),
					arr[0],
					name === 'aromathMachine' && info.gears > 0 ? React.createElement('div', { className: 'fog' }) : ''
				);
			}

			/* 事件 */

		}, {
			key: 'events',
			value: function events() {
				var t = this,
				    timeOutEvent,
				    ser,
				    num = 0,
				    num2 = 0;

				return {
					// 开始长按
					longPressStart: function longPressStart() {
						if (t.props.info.status !== 2) return;
						timeOutEvent = setTimeout(t.light.bind(t), 1000);
					},


					// 清除长按
					clearLongPress: function clearLongPress() {
						timeOutEvent && clearTimeout(timeOutEvent);
					},


					// 智慧盒连续点击
					clickInaline: function clickInaline() {
						if (t.props.info.status !== 2) return;

						ser && clearTimeout(ser);
						console.log(num);

						ser = setTimeout(function () {
							num = 0;
						}, 500);

						++num === 3 && t.light();
					},


					// 睡眠袋翻转
					turnover: function turnover() {
						if (t.props.info.status !== 2) return;
						_actions.bindActions.send({ result: 'ok' });
						t.setState({ vari: true });
						_actions.gameActions.showPrompt('原来二维码在背面！');
					},


					// 助眠灯开关
					lswitch: function lswitch() {
						if (t.props.info.status !== 2) return;
						audios['switch'].play();
						t.setState({ vari: !t.state.vari });

						if (++num2 >= 9) {
							if (num2 % 2 === 1) {
								_actions.gameActions.showPrompt('哈哈哈…感觉秘密快要解开了！');
								_actions.bindActions.send({ result: 'ok' });
							} else {
								_actions.bindActions.send({ result: 'error' });
							}
						}
					}
				};
			}

			/* 灯光闪烁 */

		}, {
			key: 'light',
			value: function light() {
				var t = this;

				if (this.props.info.status !== 2) return;
				_actions.gameActions.showPrompt('灯闪了！');
				_actions.bindActions.send({ result: 'ok' });
				t.interval = setInterval(function () {
					t.setState({ vari: !t.state.vari });
				}, 500);
			}
		}]);
		return Equip;
	}(React.Component);

	exports.default = Equip;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	var _bindStore = __webpack_require__(119);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Phone = function (_React$Component) {
		(0, _inherits3.default)(Phone, _React$Component);

		function Phone() {
			(0, _classCallCheck3.default)(this, Phone);
			return (0, _possibleConstructorReturn3.default)(this, (Phone.__proto__ || (0, _getPrototypeOf2.default)(Phone)).apply(this, arguments));
		}

		(0, _createClass3.default)(Phone, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.steps = {
					1: ['hangup', 'answer'],
					2: ['time'],
					3: ['bind'],
					4: [],
					5: ['bind'],
					6: [],
					7: [],
					8: [],
					9: ['up', 'down', 'tempe'],
					10: ['blue', 'pink', 'read', 'rest'],
					11: ['green', 'yellow', 'closedGear', 'firstGear', 'secondGear'],
					12: ['optimal'],
					13: [],
					14: []
				};

				this.events = this.fevents();

				this.resetState(this.props);
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.props.name !== nextProps.name) {
					clearTimeout(this.interval);
					this.resetState(nextProps);
				}
			}
		}, {
			key: 'resetState',
			value: function resetState(props) {
				this.state = { index: 1 };

				// 四件套与手机绑定时显示
				if (props.info) {
					this.state.index = 3;

					// 成功绑定但信息不正确时调到配置页
					if (props.info.status === 3) {
						switch (props.name) {
							case 'aromathMachine':
								this.state.index = 11;break;
							case 'wisdomBox':
								this.state.index = 9;break;
							case 'lampholder':
								this.state.index = 10;break;
							case 'fleabag':
								break;
						}
					}
				}

				// 非绑定时获取props传入的指定页
				if (props.index) this.state.index = props.index;

				this.state.timer = true;

				this.ready = false;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var msg;

				this.removeListener = _bindStore.bindStore.listen(this.accept.bind(this));

				this.props.index === 12 && (msg = '睡眠场景…这就是优质睡眠的秘密了吗？');

				this.props.index === 13 && (msg = '这似乎是一组有用的数字。');

				msg && _actions.gameActions.showPrompt(msg);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.removeListener();
			}

			// 用于接收equip组件穿过来的值

		}, {
			key: 'accept',
			value: function accept(data) {
				if (data.result == 'ok') {
					this.ready = true;
					if (this.props.name === 'fleabag') this.setState({ index: 5 });else this.setState({ index: 3 });
				} else if (data.result == 'error') {
					this.ready = false;
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (this.state.index === 2 && this.state.timer) {
					this.state.timer = false;
					this.startCall();
					this.calling();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var arr = [],
				    vice = '',
				    bgi,
				    posiClass = '',
				    index = this.state.index,
				    obj = this.steps[index],
				    info = this.props.info;

				if (this.state.index === 1 || this.state.index === 2) {
					posiClass = 'screen_center';
				} else if (this.state.index === 12 || this.state.index === 13 || this.state.index === 14) {
					posiClass = 'bar_center';
				} else {
					posiClass = 'bar_right';
				}

				// 助睡灯模式和香薰机雾化档次
				if (index === 11) {
					info && info.gears && (vice = '-' + info.gears);
				} else if (index === 10) {
					info && info.mode && (vice = '-' + info.mode);
				}

				bgi = '../static/images/bigImg/phone-' + index + vice + '.png';

				// 添加手机可操作的图层
				obj && obj.forEach(function (val, i) {
					var e = _this2.getEventName(val);
					var str = '';

					// 智慧盒子温度处理
					if (index === 9 && val === 'tempe') {
						str = info.temperature + '℃';
						if (info.temperature === 26) {
							str = React.createElement(
								'span',
								{ style: { color: '#0ce00c' } },
								str
							);
						}
					}

					// 助眠灯和香薰机颜色处理
					if (info && info.color && val === info.color) {
						str = React.createElement('img', { className: 'hook_icon', src: '../static/images/icon/hook.png' });
					}

					arr.push(React.createElement(
						'div',
						{ key: i, className: val + index, onTouchEnd: _this2.events[e] && _this2.events[e].bind(null, _this2.props.name) },
						str
					));
				});

				return React.createElement(
					'div',
					{ className: 'hei100 phone_wrap ' + posiClass },
					React.createElement('img', { className: 'phone_bg', src: bgi }),
					arr
				);
			}

			// 开始播放电话音频和显示文字

		}, {
			key: 'startCall',
			value: function startCall() {
				_actions.gameActions.showPrompt('你已经多久没有好好睡上一觉了？');
				setTimeout(function () {
					_actions.gameActions.showPrompt('身体是不是已经不受控制了呢？');

					setTimeout(function () {
						_actions.gameActions.showPrompt('马上找到所有智能助眠工具，用手机控制他们');
						setTimeout(function () {
							_actions.gameActions.showPrompt('你才能重新入睡，并逃离生活的噩梦');
							setTimeout(function () {
								audios['speak'].loop = false;
								_actions.gameActions.showPrompt('否则你会越来越虚弱，永远不会再醒来');
							}, 4000);
						}, 4000);
					}, 3000);
				}, 4000);
			}

			// 通话时间记录

		}, {
			key: 'calling',
			value: function calling() {
				var num = 0,
				    t,
				    timeDOM = document.querySelector('.time2'),
				    t = setInterval(function () {
					num = ++num < 10 ? '0' + num : num;
					timeDOM.innerHTML = '00:' + num;

					if (num == 21) {
						clearInterval(t);
						_actions.gameActions.magnify({ bigIcon: '' });
					}
				}, 1000);

				timeDOM.innerHTML = '00:00';
			}
		}, {
			key: 'fevents',
			value: function fevents() {
				var _this3 = this;

				var t = this,
				    f = _actions.gameActions.setEquipOptions,
				    sp = _actions.gameActions.showPrompt,
				    hangupNum = 0;
				return {
					// 挂电话
					onHangup: function onHangup() {
						if (hangupNum++ === 0) {
							sp('还是接一下吧，万一是客户打来的呢？');
						} else {
							sp('要挂掉吗？总感觉会错过什么重要的信息。');
						}
					},

					// 接听电话
					onAnswer: function onAnswer() {
						t.setState({ index: 2 });
						audios['iphone'].pause();
						audios['speak'].currentTime = 0;
						audios['speak'].loop = true;
						audios['speak'].play();
					},

					// 启动优质场景
					onOptimal: function onOptimal(name) {
						_actions.gameActions.commit({ overstep: 3, isOpened: false, showMaskLayer: false });
						sp('好累，终于可以睡会觉了');
					},

					// 香薰机
					onGreen: function onGreen(name) {
						f(name, { color: 'green' });
						sp('哪种颜色适合睡眠呢？');
					},

					onYellow: function onYellow(name) {
						f(name, { color: 'yellow' });
						sp('哪种颜色适合睡眠呢？');
					},

					onClosedGear: function onClosedGear(name) {
						f(name, { gears: 0 });
						sp('');
					},

					onFirstGear: function onFirstGear(name) {
						f(name, { gears: 1 });
						sp('这个味道让我昏昏欲睡。');
					},

					onSecondGear: function onSecondGear(name) {
						f(name, { gears: 2 });
						sp('这个味道让我昏昏欲睡。');
					},

					onUp: function onUp(name) {
						t.attemperation(name, 1);
					},

					onDown: function onDown(name) {
						t.attemperation(name, -1);
					},

					// 助眠灯
					onBlue: function onBlue(name) {
						f(name, { color: 'blue' });
						sp('似乎还是不太对。');
					},

					onPink: function onPink(name) {
						f(name, { color: 'pink' });
						sp('这个灯光好像很适合睡眠');
					},

					onRead: function onRead(name) {
						f(name, { mode: 0 });
					},

					onRest: function onRest(name) {
						f(name, { mode: 1 });
					},

					onBind: function onBind() {
						if (t.ready) {
							var name = t.props.name;
							switch (name) {

								case 'aromathMachine':
									t.setState({ index: 8 });
									f(name, { status: 3 });
									_this3.interval = setTimeout(function () {
										t.setState({ index: 11 }); // 颜色换挡
										_actions.gameActions.showPrompt('怎样才能把设备调节到助眠状态呢？');
									}, 1500);
									break;

								case 'fleabag':
									t.setState({ index: 6 }); // 扫描二维码

									_this3.interval = setTimeout(function () {
										t.setState({ index: 8 });
										f(name, { status: 4 });
										_this3.interval = setTimeout(function () {
											t.setState({ index: 7 }); // 实时监测
											_actions.gameActions.showPrompt(['终于绑定成功了！这是我的身体数据吗？', '心跳、呼吸、体动…难道这些数字和密码有关系？']);
										}, 2000);
									}, 1500);
									break;

								case 'lampholder':
									t.setState({ index: 8 });
									f(name, { status: 3 });
									_this3.interval = setTimeout(function () {
										t.setState({ index: 10 }); // 颜色模式
										_actions.gameActions.showPrompt('什么颜色适合睡眠呢？');
									}, 1500);
									break;

								case 'wisdomBox':
									t.setState({ index: 8 });
									f(name, { status: 4 });
									_this3.interval = setTimeout(function () {
										t.setState({ index: 9 }); // 调节温度
										_actions.gameActions.showPrompt('哪个温度最适合睡觉呢？');
									}, 1500);
									break;
							}
						} else {
							t.setState({ index: 4 }); // 绑定失败
						}
					}
				};
			}
		}, {
			key: 'attemperation',
			value: function attemperation(name, num) {
				var temperature = this.props.info.temperature + num;
				audios['keypress'].currentTime = 0;
				audios['keypress'].play();
				if (temperature <= 30 && temperature >= 16) {
					_actions.gameActions.setEquipOptions(name, { temperature: temperature });
				}
				if (temperature === 26) {
					_actions.gameActions.showPrompt('你已成功调节到最佳温度！');
				} else {
					_actions.gameActions.showPrompt('');
				}
			}
		}, {
			key: 'getEventName',
			value: function getEventName(name) {
				return 'on' + name.substr(0, 1).toUpperCase() + name.substr(1);
			}
		}]);
		return Phone;
	}(React.Component);

	exports.default = Phone;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.bindStore = undefined;

	var _actions = __webpack_require__(92);

	var bindStore = exports.bindStore = Reflux.createStore({
	    listenables: [_actions.bindActions],
	    onShowPrompt: function onShowPrompt(data) {
	        this.trigger(data);
	    },
	    onSend: function onSend(data) {
	        this.trigger(data);
	    }
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* 壁画 */
	var Mural = function (_React$Component) {
		(0, _inherits3.default)(Mural, _React$Component);

		function Mural() {
			(0, _classCallCheck3.default)(this, Mural);

			var _this = (0, _possibleConstructorReturn3.default)(this, (Mural.__proto__ || (0, _getPrototypeOf2.default)(Mural)).call(this));

			_this.state = {
				index: 0
			};
			return _this;
		}

		(0, _createClass3.default)(Mural, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.msg = ['智能睡眠工具包含四个部分，每个部分都需要和手机绑定才能使用。悄悄告诉你，用手机把工具调节到最佳状态，整个房间才会恢复正常。', '赶紧集齐所有工具，在它们的帮助下美美睡上一觉吧。不然，你就真的再也醒不来了…'];
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var msg = this.props.flampOpen ? '看不清楚上面写的什么，是不是灯光的原因呢？' : '这难道是逃脱秘籍？';
				_actions.gameActions.showPrompt(msg);
			}
		}, {
			key: 'render',
			value: function render() {
				var msg = this.msg[this.state.index];
				return React.createElement(
					'div',
					{ className: 'mural_big', src: '', onTouchEnd: this.stopPro },
					!this.props.flampOpen ? React.createElement('div', { className: 'mural_mask' }) : '',
					!this.props.flampOpen ? React.createElement(
						'div',
						{ className: 'mural_msg' },
						this.state.index > 0 ? React.createElement(
							'div',
							{ className: 'prev_page', onTouchEnd: this.prev.bind(this) },
							React.createElement('img', { src: '../static/images/icon/down-arrow.png' })
						) : '',
						React.createElement(
							'div',
							{ style: { textAlign: 'left' } },
							msg
						),
						this.state.index < 1 ? React.createElement(
							'div',
							{ className: 'next_page', onTouchEnd: this.next.bind(this) },
							React.createElement('img', { src: '../static/images/icon/down-arrow.png' })
						) : ''
					) : '',
					this.props.showPaper ? React.createElement('div', { className: 'paper_small', onTouchEnd: this.pickedPaper.bind(this) }) : ''
				);
			}
		}, {
			key: 'prev',
			value: function prev() {
				if (this.state.index > 0) this.setState({ index: this.state.index - 1 });
			}
		}, {
			key: 'next',
			value: function next() {
				if (this.state.index < 1) this.setState({ index: this.state.index + 1 });
			}
		}, {
			key: 'pickedPaper',
			value: function pickedPaper() {
				_actions.gameActions.showPaper(9);
			}
		}, {
			key: 'stopPro',
			value: function stopPro(e) {
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
			}
		}]);
		return Mural;
	}(React.Component);

	exports.default = Mural;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _gameStore = __webpack_require__(112);

	var _actions = __webpack_require__(92);

	var _config = __webpack_require__(113);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Share = function (_React$Component) {
		(0, _inherits3.default)(Share, _React$Component);

		function Share() {
			(0, _classCallCheck3.default)(this, Share);
			return (0, _possibleConstructorReturn3.default)(this, (Share.__proto__ || (0, _getPrototypeOf2.default)(Share)).apply(this, arguments));
		}

		(0, _createClass3.default)(Share, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.state = { hide: true, time: 0 };
				this.unlock = false;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.props.hide == nextProps.hide) return;
				this.state.time = _gameStore.gameStore.getTime();
				if (this.state.time) {
					var title = '我用' + this.timeformat(this.state.time) + '逃出了密室，还抽到了大奖，大家快来挑战我！——全球仅3人能在60秒内通关！',
					    link = _config2.default.env.frontPath + 'escapeRoom/page/index.html',
					    desc = '通关有好礼，70秒内通关还能申领神秘大礼',
					    imgUrl = _config2.default.env.frontPath + '/escapeRoom/static/images/share2.png';

					wx.onMenuShareTimeline({
						title: title,
						link: link, // 分享链接
						imgUrl: imgUrl // 分享图标
					});

					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl // 分享图标
					});

					wx.onMenuShareQQ({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl // 分享图标
					});

					wx.onMenuShareWeibo({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl // 分享图标
					});

					wx.onMenuShareQZone({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl // 分享图标
					});
				}
				this.unlock = this.state.time && this.state.time <= 70;
			}
		}, {
			key: 'showRank',
			value: function showRank() {
				_actions.globActions.showRank(true);
			}
		}, {
			key: 'render',
			value: function render() {
				var _state = this.state;
				var hide = _state.hide;
				var time = _state.time;
				var challenge = time > 70 ? '挑战70秒' : time > 60 ? '挑战60秒' : '挑战极限';

				return React.createElement(
					'div',
					{ className: 'share ' + (this.props.hide ? 'hidden' : '') },
					React.createElement(
						'div',
						{ className: 'img_wrap' },
						React.createElement(
							'div',
							{ className: 'rank_icon' },
							'\u67E5\u770B\u6392\u540D',
							React.createElement('div', { className: 'click_area', onTouchEnd: this.showRank })
						),
						React.createElement(
							'div',
							{ className: 'pass_award' },
							React.createElement(
								'div',
								{ className: 'flex' },
								React.createElement(
									'div',
									{ className: 'flex1 flex-cell' },
									React.createElement('img', { className: 'qr_code', src: '../static/images/cover/qr-code.jpg' })
								),
								React.createElement(
									'div',
									{ className: 'flex3 flex-cell' },
									React.createElement(
										'p',
										null,
										'\u4F60\u4F7F\u7528',
										React.createElement(
											'span',
											{ className: 'red' },
											time,
											'\u79D2'
										),
										'\u9003\u51FA\u4E86\u5BC6\u5BA4'
									),
									this.unlock ? React.createElement(
										'p',
										null,
										'\u5DF2\u4E3A\u4F60\u89E3\u9501\u5343\u5143\u795E\u79D8\u5927\u5956'
									) : '',
									React.createElement(
										'div',
										{ className: 'prize_desc' },
										'\u6392\u540D\u524D\u5341\u7684\u73A9\u5BB6\u6709\u673A\u4F1A\u5C06\u4EF7\u503C20000\u5143\u7684\u667A\u80FD\u5367\u5BA4\u5957\u88C5\u5E26\u56DE\u5BB6\uFF01\u626B\u7801\u5173\u6CE8\u516C\u4F17\u53F7\u4E86\u89E3\u8BE6\u60C5\u5427\uFF01'
									),
									this.unlock ? '' : React.createElement(
										'p',
										{ className: 'tips_70' },
										React.createElement(
											'span',
											{ className: 'red' },
											'70\u79D2'
										),
										'\u5185\u901A\u5173\uFF0C\u53EF\u89E3\u9501\u5343\u5143\u795E\u79D8\u5927\u5956'
									)
								)
							)
						),
						React.createElement(
							'a',
							{ className: 'again_btn', onTouchEnd: this.reload },
							React.createElement(
								'span',
								null,
								challenge
							)
						),
						React.createElement(
							'a',
							{ id: 'acceptBtn', className: this.unlock ? 'accept_btn' : 'lock_btn', onTouchEnd: this.tongji.bind(this), href: this.unlock ? 'http://wj.qq.com/s/849672/7634?from=singlemessage&isappinstalled=0' : 'javascript:void(0)' },
							React.createElement(
								'span',
								null,
								'\u586B\u5199\u95EE\u5377\u7533\u9886\u795E\u79D8\u5927\u5956'
							)
						),
						React.createElement(
							'div',
							{ className: 'share_btn', onTouchEnd: this.showDim.bind(this, true) },
							React.createElement(
								'span',
								null,
								'\u667A\u5546\u8D85\u7FA4'
							)
						)
					),
					React.createElement('div', { className: 'dim_layer ' + (hide ? 'hidden' : ''), onTouchEnd: this.showDim.bind(this, false) }),
					React.createElement('img', { className: 'tip_icon ' + (hide ? 'hidden' : ''), src: '../static/images/cover/12.png' })
				);
			}
		}, {
			key: 'showDim',
			value: function showDim(flag) {
				var dom = document.querySelector('.tip_icon');
				if (window.isRotate) {
					dom.style.left = 0;
					dom.style.right = 'initial';
					dom.src = '../static/images/cover/11.png';
				} else {
					dom.style.left = 'initial';
					dom.style.right = 0;
					dom.src = '../static/images/cover/12.png';
				}
				this.setState({
					hide: !flag
				});
			}
		}, {
			key: 'timeformat',
			value: function timeformat(sec) {
				if (sec <= 100) return sec + '秒';

				var h = parseInt(sec / 3600),
				    m = parseInt(sec % 3600 / 60),
				    s = parseInt(sec % 3600 % 60);
				return (h ? h + '小时' : '') + (h || m ? m + '分' : '') + s + '秒';
			}
		}, {
			key: 'tongji',
			value: function tongji(e) {
				if (this.unlock) {
					_hmt.push(['_trackEvent', 'research', 'click', 'charles']);
				} else {
					e.preventDefault();
				}
			}
		}, {
			key: 'stopPro',
			value: function stopPro(e) {
				e.stopPropagation();
				e.nativeEvent.stopImmediatePropagation();
			}
		}, {
			key: 'reload',
			value: function reload() {
				var href = location.href.split('?')[0];

				location.href = href + '?' + +Date.now() + Math.random();
			}
		}]);
		return Share;
	}(React.Component);

	exports.default = Share;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	var _bindStore = __webpack_require__(119);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* 壁画 */
	var PromptLine = function (_React$Component) {
		(0, _inherits3.default)(PromptLine, _React$Component);

		function PromptLine() {
			(0, _classCallCheck3.default)(this, PromptLine);
			return (0, _possibleConstructorReturn3.default)(this, (PromptLine.__proto__ || (0, _getPrototypeOf2.default)(PromptLine)).apply(this, arguments));
		}

		(0, _createClass3.default)(PromptLine, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.state = { shake: '', msg: '' };
				this.index = 0;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				this.arrowInterval = setInterval(function () {
					if (_this2.isMsgList(_this2.props.msg)) {
						_this2.setState({
							isHide: !_this2.state.isHide
						});
					}
				}, 500);

				this.removeListener = _bindStore.bindStore.listen(this.accept.bind(this));
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				clearInterval(this.arrowInterval);
				this.removeListener();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this3 = this;

				if (this.props.msg != nextProps.msg) {
					clearInterval(this.fontInterval);
					this.index = 0;

					if (this.isMsgList(nextProps.msg)) {
						this.msg = nextProps.msg[0];
						this.state = { index: 0 };
					} else {
						this.msg = nextProps.msg;
						this.state = { index: undefined };
					}

					this.fontInterval = window.setInterval(function () {
						if (_this3.index < _this3.msg.length) _this3.setState({ msg: _this3.msg.substring(0, ++_this3.index) });else clearInterval(_this3.fontInterval);
					}, 50);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var hasNext = this.state.index != undefined && this.state.index < this.props.msg.length - 1 && this.index == this.msg.length;
				return React.createElement(
					'div',
					{ className: 'prompt_line', onTouchEnd: this.next.bind(this) },
					React.createElement('div', { className: 'opa_bg' }),
					React.createElement(
						'p',
						null,
						this.state.msg,
						hasNext ? React.createElement('i', { className: 'next_icon ' + (this.state.isHide ? 'hidden' : '') }) : ''
					),
					React.createElement('i', { className: 'chests ' + (this.props.isOpened ? 'open ' : 'close ') + this.state.shake, onTouchEnd: this.toggleEquip.bind(this) })
				);
			}
		}, {
			key: 'accept',
			value: function accept(data) {
				if (data && data.action === 'boxShake') {
					this.setState({ shake: 'shake' });
				}
			}
		}, {
			key: 'isMsgList',
			value: function isMsgList(msg) {
				return msg && Object.prototype.toString.apply(msg) === '[object Array]';
			}
		}, {
			key: 'next',
			value: function next(msg) {
				var _this4 = this;

				var index = this.state.index + 1,
				    msg = this.props.msg[index];

				if (!msg) return;

				this.fontInterval && clearInterval(this.fontInterval);

				this.msg = msg;

				this.setState({ index: index }, function () {
					_this4.index = 0;
					_this4.fontInterval = setInterval(function () {
						_this4.setState({ msg: _this4.msg.substring(0, ++_this4.index) });
					}, 50);
				});
			}

			// 切换工具栏

		}, {
			key: 'toggleEquip',
			value: function toggleEquip(e) {

				// 有大图显示时不允许切换工具栏
				if (this.props.bigIcon) return;

				_actions.gameActions.toggleEquip({
					showMaskLayer: false,
					isOpened: !this.props.isOpened
				});

				e.stopPropagation();
			}
		}]);
		return PromptLine;
	}(React.Component);

	exports.default = PromptLine;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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

	var _actions = __webpack_require__(92);

	var _iscroll = __webpack_require__(124);

	var _iscroll2 = _interopRequireDefault(_iscroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var RankList = function (_React$Component) {
		(0, _inherits3.default)(RankList, _React$Component);

		function RankList() {
			(0, _classCallCheck3.default)(this, RankList);

			var _this = (0, _possibleConstructorReturn3.default)(this, (RankList.__proto__ || (0, _getPrototypeOf2.default)(RankList)).call(this));

			_this.state = { list: [] };
			return _this;
		}

		(0, _createClass3.default)(RankList, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				this.setState({ list: [] });

				if (nextProps.hide != this.props.hide && !nextProps.hide) {
					_actions.gameActions.getRankData(function (text) {
						var data = JSON.parse(text);
						if (data.code == 0) {
							data = data.data;
							_this2.setState({ list: data.rankingList, personalRank: data.personalRank });
						}
					});
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var myScroll = new IScroll('#rankUl', {
					mouseWheel: true
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var pr = this.state.personalRank;
				var html = this.state.list.map(function (item, i) {
					var headImg = item.wechatIcon || "../static/images/rank/02.png";
					return React.createElement(
						'li',
						{ key: i, className: 'rank_item ' + (i < 3 && 'red_item') },
						React.createElement(
							'span',
							{ className: 'column1' },
							React.createElement(
								'i',
								null,
								i + 1
							)
						),
						React.createElement(
							'span',
							{ className: 'column2' },
							React.createElement(
								'div',
								{ className: 'head_wrap' },
								React.createElement('img', { className: 'head_img', src: headImg })
							)
						),
						React.createElement(
							'span',
							{ className: 'nickname column3' },
							item.wechatName
						),
						React.createElement(
							'span',
							{ className: 'totalTime column4' },
							item.challengeDuration,
							'\u79D2'
						)
					);
				});
				if (!html.length) html = React.createElement(
					'div',
					{ className: 'rank_empty_tip' },
					'\u6B63\u5728\u83B7\u53D6\uFF0C\u8BF7\u7B49\u5F85\u3002\u3002\u3002'
				);

				var personalRank = pr && pr > 50 ? React.createElement(
					'div',
					{ className: 'personalRank' },
					'\u6211\u7684\u6392\u540D\uFF1A',
					pr
				) : '';

				return React.createElement(
					'div',
					{ className: 'rank_page' + (this.props.hide ? ' hidden' : '') },
					React.createElement('div', { className: 'layer' }),
					React.createElement(
						'div',
						{ className: 'rank_content' },
						React.createElement(
							'div',
							{ className: 'header' },
							personalRank,
							React.createElement(
								'i',
								null,
								React.createElement('div', { className: 'click_area', onTouchEnd: this.close.bind(this) })
							)
						),
						React.createElement(
							'div',
							{ id: 'rankUl', className: 'rank_ul' },
							React.createElement(
								'ul',
								{ id: 'rankList', className: 'rank_list swiper-wrapper' },
								html
							)
						)
					)
				);
			}
		}, {
			key: 'close',
			value: function close() {
				_actions.globActions.showRank(false);
			}
		}]);
		return RankList;
	}(React.Component);

	exports.default = RankList;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _iterator = __webpack_require__(35);

	var _iterator2 = _interopRequireDefault2(_iterator);

	var _typeof3 = __webpack_require__(34);

	var _typeof4 = _interopRequireDefault2(_typeof3);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault2(_symbol);

	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/{

		/***/0:
		/***/function _(module, exports, __webpack_require__) {

			module.exports = __webpack_require__(12);

			/***/
		},

		/***/12:
		/***/function _(module, exports, __webpack_require__) {

			'use strict';

			var _iscroll = __webpack_require__(13);

			var _iscroll2 = _interopRequireDefault(_iscroll);

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { default: obj };
			}

			window.IScroll = _iscroll2.default; // require('../../../_public/js/lib/iscroll5.js');

			/***/
		},

		/***/13:
		/***/function _(module, exports) {

			'use strict';

			var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
				return typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
			} : function (obj) {
				return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : (0, _typeof4.default)(obj);
			};

			/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
			(function (window, document, Math) {
				var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};

				var utils = function () {
					var me = {};

					var _elementStyle = document.createElement('div').style;
					var _vendor = function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
						    transform,
						    i = 0,
						    l = vendors.length;

						for (; i < l; i++) {
							transform = vendors[i] + 'ransform';
							if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
						}

						return false;
					}();

					function _prefixStyle(style) {
						if (_vendor === false) return false;
						if (_vendor === '') return style;
						return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
					}

					me.getTime = Date.now || function getTime() {
						return new Date().getTime();
					};

					me.extend = function (target, obj) {
						for (var i in obj) {
							target[i] = obj[i];
						}
					};

					me.addEvent = function (el, type, fn, capture) {
						el.addEventListener(type, fn, !!capture);
					};

					me.removeEvent = function (el, type, fn, capture) {
						el.removeEventListener(type, fn, !!capture);
					};

					me.prefixPointerEvent = function (pointerEvent) {
						return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
					};

					me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
						var distance = current - start,
						    speed = Math.abs(distance) / time,
						    destination,
						    duration;

						deceleration = deceleration === undefined ? 0.0006 : deceleration;

						destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
						duration = speed / deceleration;

						if (destination < lowerMargin) {
							destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
							distance = Math.abs(destination - current);
							duration = distance / speed;
						} else if (destination > 0) {
							destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
							distance = Math.abs(current) + destination;
							duration = distance / speed;
						}

						return {
							destination: Math.round(destination),
							duration: duration
						};
					};

					var _transform = _prefixStyle('transform');

					me.extend(me, {
						hasTransform: _transform !== false,
						hasPerspective: _prefixStyle('perspective') in _elementStyle,
						hasTouch: 'ontouchstart' in window,
						hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
						hasTransition: _prefixStyle('transition') in _elementStyle
					});

					// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
					me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);

					me.extend(me.style = {}, {
						transform: _transform,
						transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
						transitionDuration: _prefixStyle('transitionDuration'),
						transitionDelay: _prefixStyle('transitionDelay'),
						transformOrigin: _prefixStyle('transformOrigin')
					});

					me.hasClass = function (e, c) {
						var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
						return re.test(e.className);
					};

					me.addClass = function (e, c) {
						if (me.hasClass(e, c)) {
							return;
						}

						var newclass = e.className.split(' ');
						newclass.push(c);
						e.className = newclass.join(' ');
					};

					me.removeClass = function (e, c) {
						if (!me.hasClass(e, c)) {
							return;
						}

						var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
						e.className = e.className.replace(re, ' ');
					};

					me.offset = function (el) {
						var left = -el.offsetLeft,
						    top = -el.offsetTop;

						// jshint -W084
						while (el = el.offsetParent) {
							left -= el.offsetLeft;
							top -= el.offsetTop;
						}
						// jshint +W084

						return {
							left: left,
							top: top
						};
					};

					me.preventDefaultException = function (el, exceptions) {
						for (var i in exceptions) {
							if (exceptions[i].test(el[i])) {
								return true;
							}
						}

						return false;
					};

					me.extend(me.eventType = {}, {
						touchstart: 1,
						touchmove: 1,
						touchend: 1,

						mousedown: 2,
						mousemove: 2,
						mouseup: 2,

						pointerdown: 3,
						pointermove: 3,
						pointerup: 3,

						MSPointerDown: 3,
						MSPointerMove: 3,
						MSPointerUp: 3
					});

					me.extend(me.ease = {}, {
						quadratic: {
							style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
							fn: function fn(k) {
								return k * (2 - k);
							}
						},
						circular: {
							style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
							fn: function fn(k) {
								return Math.sqrt(1 - --k * k);
							}
						},
						back: {
							style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
							fn: function fn(k) {
								var b = 4;
								return (k = k - 1) * k * ((b + 1) * k + b) + 1;
							}
						},
						bounce: {
							style: '',
							fn: function fn(k) {
								if ((k /= 1) < 1 / 2.75) {
									return 7.5625 * k * k;
								} else if (k < 2 / 2.75) {
									return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
								} else if (k < 2.5 / 2.75) {
									return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
								} else {
									return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
								}
							}
						},
						elastic: {
							style: '',
							fn: function fn(k) {
								var f = 0.22,
								    e = 0.4;

								if (k === 0) {
									return 0;
								}
								if (k == 1) {
									return 1;
								}

								return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
							}
						}
					});

					me.tap = function (e, eventName) {
						var ev = document.createEvent('Event');
						ev.initEvent(eventName, true, true);
						ev.pageX = e.pageX;
						ev.pageY = e.pageY;
						e.target.dispatchEvent(ev);
					};

					me.click = function (e) {
						var target = e.target,
						    ev;

						if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
							ev = document.createEvent('MouseEvents');
							ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);

							ev._constructed = true;
							target.dispatchEvent(ev);
						}
					};

					return me;
				}();

				function IScroll(el, options) {
					this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
					this.scroller = this.wrapper.children[0];
					this.scrollerStyle = this.scroller.style; // cache style for better performance

					this.options = {

						resizeScrollbars: true,

						mouseWheelSpeed: 20,

						snapThreshold: 0.334,

						// INSERT POINT: OPTIONS 

						startX: 0,
						startY: 0,
						scrollY: true,
						directionLockThreshold: 5,
						momentum: true,

						bounce: true,
						bounceTime: 600,
						bounceEasing: '',

						preventDefault: true,
						preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

						HWCompositing: true,
						useTransition: true,
						useTransform: true
					};

					for (var i in options) {
						this.options[i] = options[i];
					}

					// Normalize options
					this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

					this.options.useTransition = utils.hasTransition && this.options.useTransition;
					this.options.useTransform = utils.hasTransform && this.options.useTransform;

					this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
					this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

					// If you want eventPassthrough I have to lock one of the axes
					this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
					this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

					// With eventPassthrough we also need lockDirection mechanism
					this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
					this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

					this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

					this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

					if (this.options.tap === true) {
						this.options.tap = 'tap';
					}

					if (this.options.shrinkScrollbars == 'scale') {
						this.options.useTransition = false;
					}

					this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

					// INSERT POINT: NORMALIZATION

					// Some defaults	
					this.x = 0;
					this.y = 0;
					this.directionX = 0;
					this.directionY = 0;
					this._events = {};

					// INSERT POINT: DEFAULTS

					this._init();
					this.refresh();

					this.scrollTo(this.options.startX, this.options.startY);
					this.enable();
				}

				IScroll.prototype = {
					version: '5.1.3',

					_init: function _init() {
						this._initEvents();

						if (this.options.scrollbars || this.options.indicators) {
							this._initIndicators();
						}

						if (this.options.mouseWheel) {
							this._initWheel();
						}

						if (this.options.snap) {
							this._initSnap();
						}

						if (this.options.keyBindings) {
							this._initKeys();
						}

						// INSERT POINT: _init
					},

					destroy: function destroy() {
						this._initEvents(true);

						this._execEvent('destroy');
					},

					_transitionEnd: function _transitionEnd(e) {
						if (e.target != this.scroller || !this.isInTransition) {
							return;
						}

						this._transitionTime();
						if (!this.resetPosition(this.options.bounceTime)) {
							this.isInTransition = false;
							this._execEvent('scrollEnd');
						}
					},

					_start: function _start(e) {
						// React to left mouse button only
						if (utils.eventType[e.type] != 1) {
							if (e.button !== 0) {
								return;
							}
						}

						if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
							return;
						}

						if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
							e.preventDefault();
						}

						var point = e.touches ? e.touches[0] : e,
						    pos;

						this.initiated = utils.eventType[e.type];
						this.moved = false;
						this.distX = 0;
						this.distY = 0;
						this.directionX = 0;
						this.directionY = 0;
						this.directionLocked = 0;

						this._transitionTime();

						this.startTime = utils.getTime();

						if (this.options.useTransition && this.isInTransition) {
							this.isInTransition = false;
							pos = this.getComputedPosition();
							this._translate(Math.round(pos.x), Math.round(pos.y));
							this._execEvent('scrollEnd');
						} else if (!this.options.useTransition && this.isAnimating) {
							this.isAnimating = false;
							this._execEvent('scrollEnd');
						}

						this.startX = this.x;
						this.startY = this.y;
						this.absStartX = this.x;
						this.absStartY = this.y;
						this.pointX = point.pageX;
						this.pointY = point.pageY;

						this._execEvent('beforeScrollStart');
					},

					_move: function _move(e) {
						if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
							return;
						}

						if (this.options.preventDefault) {
							// increases performance on Android? TODO: check!
							e.preventDefault();
						}

						var point = e.touches ? e.touches[0] : e,
						    deltaX = 0,
						    deltaY = window.ver ? this.pointX - point.pageX : point.pageY - this.pointY,
						    timestamp = utils.getTime(),
						    newX,
						    newY,
						    absDistX,
						    absDistY;

						this.pointX = point.pageX;
						this.pointY = point.pageY;

						this.distX += deltaX;
						this.distY += deltaY;
						absDistX = Math.abs(this.distX);
						absDistY = Math.abs(this.distY);

						// We need to move at least 10 pixels for the scrolling to initiate
						if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
							return;
						}

						// If you are scrolling in one direction lock the other
						if (!this.directionLocked && !this.options.freeScroll) {
							if (absDistX > absDistY + this.options.directionLockThreshold) {
								this.directionLocked = 'h'; // lock horizontally
							} else if (absDistY >= absDistX + this.options.directionLockThreshold) {
								this.directionLocked = 'v'; // lock vertically
							} else {
								this.directionLocked = 'n'; // no lock
							}
						}

						if (this.directionLocked == 'h') {
							if (this.options.eventPassthrough == 'vertical') {
								e.preventDefault();
							} else if (this.options.eventPassthrough == 'horizontal') {
								this.initiated = false;
								return;
							}

							deltaY = 0;
						} else if (this.directionLocked == 'v') {
							if (this.options.eventPassthrough == 'horizontal') {
								e.preventDefault();
							} else if (this.options.eventPassthrough == 'vertical') {
								this.initiated = false;
								return;
							}

							deltaX = 0;
						}

						deltaX = this.hasHorizontalScroll ? deltaX : 0;
						deltaY = this.hasVerticalScroll ? deltaY : 0;

						newX = this.x + deltaX;
						newY = this.y + deltaY;

						// Slow down if outside of the boundaries
						if (newX > 0 || newX < this.maxScrollX) {
							newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
						}
						if (newY > 0 || newY < this.maxScrollY) {
							newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
						}

						this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
						this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

						if (!this.moved) {
							this._execEvent('scrollStart');
						}

						this.moved = true;

						this._translate(newX, newY);

						/* REPLACE START: _move */

						if (timestamp - this.startTime > 300) {
							this.startTime = timestamp;
							this.startX = this.x;
							this.startY = this.y;
						}

						/* REPLACE END: _move */
					},

					_end: function _end(e) {
						if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
							return;
						}

						if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
							e.preventDefault();
						}

						var point = e.changedTouches ? e.changedTouches[0] : e,
						    momentumX,
						    momentumY,
						    duration = utils.getTime() - this.startTime,
						    newX = Math.round(this.x),
						    newY = Math.round(this.y),
						    distanceX = Math.abs(newX - this.startX),
						    distanceY = Math.abs(newY - this.startY),
						    time = 0,
						    easing = '';

						this.isInTransition = 0;
						this.initiated = 0;
						this.endTime = utils.getTime();

						// reset if we are outside of the boundaries
						if (this.resetPosition(this.options.bounceTime)) {
							return;
						}

						this.scrollTo(newX, newY); // ensures that the last position is rounded

						// we scrolled less than 10 pixels
						if (!this.moved) {
							if (this.options.tap) {
								utils.tap(e, this.options.tap);
							}

							if (this.options.click) {
								utils.click(e);
							}

							this._execEvent('scrollCancel');
							return;
						}

						if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
							this._execEvent('flick');
							return;
						}

						// start momentum animation if needed
						if (this.options.momentum && duration < 300) {
							momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
							momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
							newX = momentumX.destination;
							newY = momentumY.destination;
							time = Math.max(momentumX.duration, momentumY.duration);
							this.isInTransition = 1;
						}

						if (this.options.snap) {
							var snap = this._nearestSnap(newX, newY);
							this.currentPage = snap;
							time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
							newX = snap.x;
							newY = snap.y;

							this.directionX = 0;
							this.directionY = 0;
							easing = this.options.bounceEasing;
						}

						// INSERT POINT: _end

						if (newX != this.x || newY != this.y) {
							// change easing function when scroller goes out of the boundaries
							if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
								easing = utils.ease.quadratic;
							}

							this.scrollTo(newX, newY, time, easing);
							return;
						}

						this._execEvent('scrollEnd');
					},

					_resize: function _resize() {
						var that = this;

						clearTimeout(this.resizeTimeout);

						this.resizeTimeout = setTimeout(function () {
							that.refresh();
						}, this.options.resizePolling);
					},

					resetPosition: function resetPosition(time) {
						var x = this.x,
						    y = this.y;

						time = time || 0;

						if (!this.hasHorizontalScroll || this.x > 0) {
							x = 0;
						} else if (this.x < this.maxScrollX) {
							x = this.maxScrollX;
						}

						if (!this.hasVerticalScroll || this.y > 0) {
							y = 0;
						} else if (this.y < this.maxScrollY) {
							y = this.maxScrollY;
						}

						if (x == this.x && y == this.y) {
							return false;
						}

						this.scrollTo(x, y, time, this.options.bounceEasing);

						return true;
					},

					disable: function disable() {
						this.enabled = false;
					},

					enable: function enable() {
						this.enabled = true;
					},

					refresh: function refresh() {
						var rf = this.wrapper.offsetHeight; // Force reflow

						this.wrapperWidth = this.wrapper.clientWidth;
						this.wrapperHeight = this.wrapper.clientHeight;

						/* REPLACE START: refresh */

						this.scrollerWidth = this.scroller.offsetWidth;
						this.scrollerHeight = this.scroller.offsetHeight;

						this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
						this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

						/* REPLACE END: refresh */

						this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
						this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

						if (!this.hasHorizontalScroll) {
							this.maxScrollX = 0;
							this.scrollerWidth = this.wrapperWidth;
						}

						if (!this.hasVerticalScroll) {
							this.maxScrollY = 0;
							this.scrollerHeight = this.wrapperHeight;
						}

						this.endTime = 0;
						this.directionX = 0;
						this.directionY = 0;

						this.wrapperOffset = utils.offset(this.wrapper);

						this._execEvent('refresh');

						this.resetPosition();

						// INSERT POINT: _refresh
					},

					on: function on(type, fn) {
						if (!this._events[type]) {
							this._events[type] = [];
						}

						this._events[type].push(fn);
					},

					off: function off(type, fn) {
						if (!this._events[type]) {
							return;
						}

						var index = this._events[type].indexOf(fn);

						if (index > -1) {
							this._events[type].splice(index, 1);
						}
					},

					_execEvent: function _execEvent(type) {
						if (!this._events[type]) {
							return;
						}

						var i = 0,
						    l = this._events[type].length;

						if (!l) {
							return;
						}

						for (; i < l; i++) {
							this._events[type][i].apply(this, [].slice.call(arguments, 1));
						}
					},

					scrollBy: function scrollBy(x, y, time, easing) {
						x = this.x + x;
						y = this.y + y;
						time = time || 0;

						this.scrollTo(x, y, time, easing);
					},

					scrollTo: function scrollTo(x, y, time, easing) {
						easing = easing || utils.ease.circular;

						this.isInTransition = this.options.useTransition && time > 0;

						if (!time || this.options.useTransition && easing.style) {
							this._transitionTimingFunction(easing.style);
							this._transitionTime(time);
							this._translate(x, y);
						} else {
							this._animate(x, y, time, easing.fn);
						}
					},

					scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
						el = el.nodeType ? el : this.scroller.querySelector(el);

						if (!el) {
							return;
						}

						var pos = utils.offset(el);

						pos.left -= this.wrapperOffset.left;
						pos.top -= this.wrapperOffset.top;

						// if offsetX/Y are true we center the element to the screen
						if (offsetX === true) {
							offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
						}
						if (offsetY === true) {
							offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
						}

						pos.left -= offsetX || 0;
						pos.top -= offsetY || 0;

						pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
						pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

						time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

						this.scrollTo(pos.left, pos.top, time, easing);
					},

					_transitionTime: function _transitionTime(time) {
						time = time || 0;

						this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

						if (!time && utils.isBadAndroid) {
							this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
						}

						if (this.indicators) {
							for (var i = this.indicators.length; i--;) {
								this.indicators[i].transitionTime(time);
							}
						}

						// INSERT POINT: _transitionTime
					},

					_transitionTimingFunction: function _transitionTimingFunction(easing) {
						this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

						if (this.indicators) {
							for (var i = this.indicators.length; i--;) {
								this.indicators[i].transitionTimingFunction(easing);
							}
						}

						// INSERT POINT: _transitionTimingFunction
					},

					_translate: function _translate(x, y) {
						if (this.options.useTransform) {

							/* REPLACE START: _translate */

							this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

							/* REPLACE END: _translate */
						} else {
							x = Math.round(x);
							y = Math.round(y);
							this.scrollerStyle.left = x + 'px';
							this.scrollerStyle.top = y + 'px';
						}

						this.x = x;
						this.y = y;

						if (this.indicators) {
							for (var i = this.indicators.length; i--;) {
								this.indicators[i].updatePosition();
							}
						}

						// INSERT POINT: _translate
					},

					_initEvents: function _initEvents(remove) {
						var eventType = remove ? utils.removeEvent : utils.addEvent,
						    target = this.options.bindToWrapper ? this.wrapper : window;

						eventType(window, 'orientationchange', this);
						eventType(window, 'resize', this);

						if (this.options.click) {
							eventType(this.wrapper, 'click', this, true);
						}

						if (!this.options.disableMouse) {
							eventType(this.wrapper, 'mousedown', this);
							eventType(target, 'mousemove', this);
							eventType(target, 'mousecancel', this);
							eventType(target, 'mouseup', this);
						}

						if (utils.hasPointer && !this.options.disablePointer) {
							eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
							eventType(target, utils.prefixPointerEvent('pointermove'), this);
							eventType(target, utils.prefixPointerEvent('pointercancel'), this);
							eventType(target, utils.prefixPointerEvent('pointerup'), this);
						}

						if (utils.hasTouch && !this.options.disableTouch) {
							eventType(this.wrapper, 'touchstart', this);
							eventType(target, 'touchmove', this);
							eventType(target, 'touchcancel', this);
							eventType(target, 'touchend', this);
						}

						eventType(this.scroller, 'transitionend', this);
						eventType(this.scroller, 'webkitTransitionEnd', this);
						eventType(this.scroller, 'oTransitionEnd', this);
						eventType(this.scroller, 'MSTransitionEnd', this);
					},

					getComputedPosition: function getComputedPosition() {
						var matrix = window.getComputedStyle(this.scroller, null),
						    x,
						    y;

						if (this.options.useTransform) {
							matrix = matrix[utils.style.transform].split(')')[0].split(', ');
							x = +(matrix[12] || matrix[4]);
							y = +(matrix[13] || matrix[5]);
						} else {
							x = +matrix.left.replace(/[^-\d.]/g, '');
							y = +matrix.top.replace(/[^-\d.]/g, '');
						}

						return { x: x, y: y };
					},

					_initIndicators: function _initIndicators() {
						var interactive = this.options.interactiveScrollbars,
						    customStyle = typeof this.options.scrollbars != 'string',
						    indicators = [],
						    indicator;

						var that = this;

						this.indicators = [];

						if (this.options.scrollbars) {
							// Vertical scrollbar
							if (this.options.scrollY) {
								indicator = {
									el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
									interactive: interactive,
									defaultScrollbars: true,
									customStyle: customStyle,
									resize: this.options.resizeScrollbars,
									shrink: this.options.shrinkScrollbars,
									fade: this.options.fadeScrollbars,
									listenX: false
								};

								this.wrapper.appendChild(indicator.el);
								indicators.push(indicator);
							}

							// Horizontal scrollbar
							if (this.options.scrollX) {
								indicator = {
									el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
									interactive: interactive,
									defaultScrollbars: true,
									customStyle: customStyle,
									resize: this.options.resizeScrollbars,
									shrink: this.options.shrinkScrollbars,
									fade: this.options.fadeScrollbars,
									listenY: false
								};

								this.wrapper.appendChild(indicator.el);
								indicators.push(indicator);
							}
						}

						if (this.options.indicators) {
							// TODO: check concat compatibility
							indicators = indicators.concat(this.options.indicators);
						}

						for (var i = indicators.length; i--;) {
							this.indicators.push(new Indicator(this, indicators[i]));
						}

						// TODO: check if we can use array.map (wide compatibility and performance issues)
						function _indicatorsMap(fn) {
							for (var i = that.indicators.length; i--;) {
								fn.call(that.indicators[i]);
							}
						}

						if (this.options.fadeScrollbars) {
							this.on('scrollEnd', function () {
								_indicatorsMap(function () {
									this.fade();
								});
							});

							this.on('scrollCancel', function () {
								_indicatorsMap(function () {
									this.fade();
								});
							});

							this.on('scrollStart', function () {
								_indicatorsMap(function () {
									this.fade(1);
								});
							});

							this.on('beforeScrollStart', function () {
								_indicatorsMap(function () {
									this.fade(1, true);
								});
							});
						}

						this.on('refresh', function () {
							_indicatorsMap(function () {
								this.refresh();
							});
						});

						this.on('destroy', function () {
							_indicatorsMap(function () {
								this.destroy();
							});

							delete this.indicators;
						});
					},

					_initWheel: function _initWheel() {
						utils.addEvent(this.wrapper, 'wheel', this);
						utils.addEvent(this.wrapper, 'mousewheel', this);
						utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

						this.on('destroy', function () {
							utils.removeEvent(this.wrapper, 'wheel', this);
							utils.removeEvent(this.wrapper, 'mousewheel', this);
							utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
						});
					},

					_wheel: function _wheel(e) {
						if (!this.enabled) {
							return;
						}

						e.preventDefault();
						e.stopPropagation();

						var wheelDeltaX,
						    wheelDeltaY,
						    newX,
						    newY,
						    that = this;

						if (this.wheelTimeout === undefined) {
							that._execEvent('scrollStart');
						}

						// Execute the scrollEnd event after 400ms the wheel stopped scrolling
						clearTimeout(this.wheelTimeout);
						this.wheelTimeout = setTimeout(function () {
							that._execEvent('scrollEnd');
							that.wheelTimeout = undefined;
						}, 400);

						if ('deltaX' in e) {
							if (e.deltaMode === 1) {
								wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
								wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
							} else {
								wheelDeltaX = -e.deltaX;
								wheelDeltaY = -e.deltaY;
							}
						} else if ('wheelDeltaX' in e) {
							wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
							wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
						} else if ('wheelDelta' in e) {
							wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
						} else if ('detail' in e) {
							wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
						} else {
							return;
						}

						wheelDeltaX *= this.options.invertWheelDirection;
						wheelDeltaY *= this.options.invertWheelDirection;

						if (!this.hasVerticalScroll) {
							wheelDeltaX = wheelDeltaY;
							wheelDeltaY = 0;
						}

						if (this.options.snap) {
							newX = this.currentPage.pageX;
							newY = this.currentPage.pageY;

							if (wheelDeltaX > 0) {
								newX--;
							} else if (wheelDeltaX < 0) {
								newX++;
							}

							if (wheelDeltaY > 0) {
								newY--;
							} else if (wheelDeltaY < 0) {
								newY++;
							}

							this.goToPage(newX, newY);

							return;
						}

						newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
						newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

						if (newX > 0) {
							newX = 0;
						} else if (newX < this.maxScrollX) {
							newX = this.maxScrollX;
						}

						if (newY > 0) {
							newY = 0;
						} else if (newY < this.maxScrollY) {
							newY = this.maxScrollY;
						}

						this.scrollTo(newX, newY, 0);

						// INSERT POINT: _wheel
					},

					_initSnap: function _initSnap() {
						this.currentPage = {};

						if (typeof this.options.snap == 'string') {
							this.options.snap = this.scroller.querySelectorAll(this.options.snap);
						}

						this.on('refresh', function () {
							var i = 0,
							    l,
							    m = 0,
							    n,
							    cx,
							    cy,
							    x = 0,
							    y,
							    stepX = this.options.snapStepX || this.wrapperWidth,
							    stepY = this.options.snapStepY || this.wrapperHeight,
							    el;

							this.pages = [];

							if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
								return;
							}

							if (this.options.snap === true) {
								cx = Math.round(stepX / 2);
								cy = Math.round(stepY / 2);

								while (x > -this.scrollerWidth) {
									this.pages[i] = [];
									l = 0;
									y = 0;

									while (y > -this.scrollerHeight) {
										this.pages[i][l] = {
											x: Math.max(x, this.maxScrollX),
											y: Math.max(y, this.maxScrollY),
											width: stepX,
											height: stepY,
											cx: x - cx,
											cy: y - cy
										};

										y -= stepY;
										l++;
									}

									x -= stepX;
									i++;
								}
							} else {
								el = this.options.snap;
								l = el.length;
								n = -1;

								for (; i < l; i++) {
									if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
										m = 0;
										n++;
									}

									if (!this.pages[m]) {
										this.pages[m] = [];
									}

									x = Math.max(-el[i].offsetLeft, this.maxScrollX);
									y = Math.max(-el[i].offsetTop, this.maxScrollY);
									cx = x - Math.round(el[i].offsetWidth / 2);
									cy = y - Math.round(el[i].offsetHeight / 2);

									this.pages[m][n] = {
										x: x,
										y: y,
										width: el[i].offsetWidth,
										height: el[i].offsetHeight,
										cx: cx,
										cy: cy
									};

									if (x > this.maxScrollX) {
										m++;
									}
								}
							}

							this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

							// Update snap threshold if needed
							if (this.options.snapThreshold % 1 === 0) {
								this.snapThresholdX = this.options.snapThreshold;
								this.snapThresholdY = this.options.snapThreshold;
							} else {
								this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
								this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
							}
						});

						this.on('flick', function () {
							var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);

							this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
						});
					},

					_nearestSnap: function _nearestSnap(x, y) {
						if (!this.pages.length) {
							return { x: 0, y: 0, pageX: 0, pageY: 0 };
						}

						var i = 0,
						    l = this.pages.length,
						    m = 0;

						// Check if we exceeded the snap threshold
						if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
							return this.currentPage;
						}

						if (x > 0) {
							x = 0;
						} else if (x < this.maxScrollX) {
							x = this.maxScrollX;
						}

						if (y > 0) {
							y = 0;
						} else if (y < this.maxScrollY) {
							y = this.maxScrollY;
						}

						for (; i < l; i++) {
							if (x >= this.pages[i][0].cx) {
								x = this.pages[i][0].x;
								break;
							}
						}

						l = this.pages[i].length;

						for (; m < l; m++) {
							if (y >= this.pages[0][m].cy) {
								y = this.pages[0][m].y;
								break;
							}
						}

						if (i == this.currentPage.pageX) {
							i += this.directionX;

							if (i < 0) {
								i = 0;
							} else if (i >= this.pages.length) {
								i = this.pages.length - 1;
							}

							x = this.pages[i][0].x;
						}

						if (m == this.currentPage.pageY) {
							m += this.directionY;

							if (m < 0) {
								m = 0;
							} else if (m >= this.pages[0].length) {
								m = this.pages[0].length - 1;
							}

							y = this.pages[0][m].y;
						}

						return {
							x: x,
							y: y,
							pageX: i,
							pageY: m
						};
					},

					goToPage: function goToPage(x, y, time, easing) {
						easing = easing || this.options.bounceEasing;

						if (x >= this.pages.length) {
							x = this.pages.length - 1;
						} else if (x < 0) {
							x = 0;
						}

						if (y >= this.pages[x].length) {
							y = this.pages[x].length - 1;
						} else if (y < 0) {
							y = 0;
						}

						var posX = this.pages[x][y].x,
						    posY = this.pages[x][y].y;

						time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

						this.currentPage = {
							x: posX,
							y: posY,
							pageX: x,
							pageY: y
						};

						this.scrollTo(posX, posY, time, easing);
					},

					next: function next(time, easing) {
						var x = this.currentPage.pageX,
						    y = this.currentPage.pageY;

						x++;

						if (x >= this.pages.length && this.hasVerticalScroll) {
							x = 0;
							y++;
						}

						this.goToPage(x, y, time, easing);
					},

					prev: function prev(time, easing) {
						var x = this.currentPage.pageX,
						    y = this.currentPage.pageY;

						x--;

						if (x < 0 && this.hasVerticalScroll) {
							x = 0;
							y--;
						}

						this.goToPage(x, y, time, easing);
					},

					_initKeys: function _initKeys(e) {
						// default key bindings
						var keys = {
							pageUp: 33,
							pageDown: 34,
							end: 35,
							home: 36,
							left: 37,
							up: 38,
							right: 39,
							down: 40
						};
						var i;

						// if you give me characters I give you keycode
						if (_typeof(this.options.keyBindings) == 'object') {
							for (i in this.options.keyBindings) {
								if (typeof this.options.keyBindings[i] == 'string') {
									this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
								}
							}
						} else {
							this.options.keyBindings = {};
						}

						for (i in keys) {
							this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
						}

						utils.addEvent(window, 'keydown', this);

						this.on('destroy', function () {
							utils.removeEvent(window, 'keydown', this);
						});
					},

					_key: function _key(e) {
						if (!this.enabled) {
							return;
						}

						var snap = this.options.snap,

						// we are using this alot, better to cache it
						newX = snap ? this.currentPage.pageX : this.x,
						    newY = snap ? this.currentPage.pageY : this.y,
						    now = utils.getTime(),
						    prevTime = this.keyTime || 0,
						    acceleration = 0.250,
						    pos;

						if (this.options.useTransition && this.isInTransition) {
							pos = this.getComputedPosition();

							this._translate(Math.round(pos.x), Math.round(pos.y));
							this.isInTransition = false;
						}

						this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

						switch (e.keyCode) {
							case this.options.keyBindings.pageUp:
								if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
									newX += snap ? 1 : this.wrapperWidth;
								} else {
									newY += snap ? 1 : this.wrapperHeight;
								}
								break;
							case this.options.keyBindings.pageDown:
								if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
									newX -= snap ? 1 : this.wrapperWidth;
								} else {
									newY -= snap ? 1 : this.wrapperHeight;
								}
								break;
							case this.options.keyBindings.end:
								newX = snap ? this.pages.length - 1 : this.maxScrollX;
								newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
								break;
							case this.options.keyBindings.home:
								newX = 0;
								newY = 0;
								break;
							case this.options.keyBindings.left:
								newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
								break;
							case this.options.keyBindings.up:
								newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
								break;
							case this.options.keyBindings.right:
								newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
								break;
							case this.options.keyBindings.down:
								newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
								break;
							default:
								return;
						}

						if (snap) {
							this.goToPage(newX, newY);
							return;
						}

						if (newX > 0) {
							newX = 0;
							this.keyAcceleration = 0;
						} else if (newX < this.maxScrollX) {
							newX = this.maxScrollX;
							this.keyAcceleration = 0;
						}

						if (newY > 0) {
							newY = 0;
							this.keyAcceleration = 0;
						} else if (newY < this.maxScrollY) {
							newY = this.maxScrollY;
							this.keyAcceleration = 0;
						}

						this.scrollTo(newX, newY, 0);

						this.keyTime = now;
					},

					_animate: function _animate(destX, destY, duration, easingFn) {
						var that = this,
						    startX = this.x,
						    startY = this.y,
						    startTime = utils.getTime(),
						    destTime = startTime + duration;

						function step() {
							var now = utils.getTime(),
							    newX,
							    newY,
							    easing;

							if (now >= destTime) {
								that.isAnimating = false;
								that._translate(destX, destY);

								if (!that.resetPosition(that.options.bounceTime)) {
									that._execEvent('scrollEnd');
								}

								return;
							}

							now = (now - startTime) / duration;
							easing = easingFn(now);
							newX = (destX - startX) * easing + startX;
							newY = (destY - startY) * easing + startY;
							that._translate(newX, newY);

							if (that.isAnimating) {
								rAF(step);
							}
						}

						this.isAnimating = true;
						step();
					},
					handleEvent: function handleEvent(e) {
						switch (e.type) {
							case 'touchstart':
							case 'pointerdown':
							case 'MSPointerDown':
							case 'mousedown':
								this._start(e);
								break;
							case 'touchmove':
							case 'pointermove':
							case 'MSPointerMove':
							case 'mousemove':
								this._move(e);
								break;
							case 'touchend':
							case 'pointerup':
							case 'MSPointerUp':
							case 'mouseup':
							case 'touchcancel':
							case 'pointercancel':
							case 'MSPointerCancel':
							case 'mousecancel':
								this._end(e);
								break;
							case 'orientationchange':
							case 'resize':
								this._resize();
								break;
							case 'transitionend':
							case 'webkitTransitionEnd':
							case 'oTransitionEnd':
							case 'MSTransitionEnd':
								this._transitionEnd(e);
								break;
							case 'wheel':
							case 'DOMMouseScroll':
							case 'mousewheel':
								this._wheel(e);
								break;
							case 'keydown':
								this._key(e);
								break;
							case 'click':
								if (!e._constructed) {
									e.preventDefault();
									e.stopPropagation();
								}
								break;
						}
					}
				};
				function createDefaultScrollbar(direction, interactive, type) {
					var scrollbar = document.createElement('div'),
					    indicator = document.createElement('div');

					if (type === true) {
						scrollbar.style.cssText = 'position:absolute;z-index:9999';
						indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
					}

					indicator.className = 'iScrollIndicator';

					if (direction == 'h') {
						if (type === true) {
							scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
							indicator.style.height = '100%';
						}
						scrollbar.className = 'iScrollHorizontalScrollbar';
					} else {
						if (type === true) {
							scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
							indicator.style.width = '100%';
						}
						scrollbar.className = 'iScrollVerticalScrollbar';
					}

					scrollbar.style.cssText += ';overflow:hidden';

					if (!interactive) {
						scrollbar.style.pointerEvents = 'none';
					}

					scrollbar.appendChild(indicator);

					return scrollbar;
				}

				function Indicator(scroller, options) {
					this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
					this.wrapperStyle = this.wrapper.style;
					this.indicator = this.wrapper.children[0];
					this.indicatorStyle = this.indicator.style;
					this.scroller = scroller;

					this.options = {
						listenX: true,
						listenY: true,
						interactive: false,
						resize: true,
						defaultScrollbars: false,
						shrink: false,
						fade: false,
						speedRatioX: 0,
						speedRatioY: 0
					};

					for (var i in options) {
						this.options[i] = options[i];
					}

					this.sizeRatioX = 1;
					this.sizeRatioY = 1;
					this.maxPosX = 0;
					this.maxPosY = 0;

					if (this.options.interactive) {
						if (!this.options.disableTouch) {
							utils.addEvent(this.indicator, 'touchstart', this);
							utils.addEvent(window, 'touchend', this);
						}
						if (!this.options.disablePointer) {
							utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
							utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
						}
						if (!this.options.disableMouse) {
							utils.addEvent(this.indicator, 'mousedown', this);
							utils.addEvent(window, 'mouseup', this);
						}
					}

					if (this.options.fade) {
						this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
						this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
						this.wrapperStyle.opacity = '0';
					}
				}

				Indicator.prototype = {
					handleEvent: function handleEvent(e) {
						switch (e.type) {
							case 'touchstart':
							case 'pointerdown':
							case 'MSPointerDown':
							case 'mousedown':
								this._start(e);
								break;
							case 'touchmove':
							case 'pointermove':
							case 'MSPointerMove':
							case 'mousemove':
								this._move(e);
								break;
							case 'touchend':
							case 'pointerup':
							case 'MSPointerUp':
							case 'mouseup':
							case 'touchcancel':
							case 'pointercancel':
							case 'MSPointerCancel':
							case 'mousecancel':
								this._end(e);
								break;
						}
					},

					destroy: function destroy() {
						if (this.options.interactive) {
							utils.removeEvent(this.indicator, 'touchstart', this);
							utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
							utils.removeEvent(this.indicator, 'mousedown', this);

							utils.removeEvent(window, 'touchmove', this);
							utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
							utils.removeEvent(window, 'mousemove', this);

							utils.removeEvent(window, 'touchend', this);
							utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
							utils.removeEvent(window, 'mouseup', this);
						}

						if (this.options.defaultScrollbars) {
							this.wrapper.parentNode.removeChild(this.wrapper);
						}
					},

					_start: function _start(e) {
						var point = e.touches ? e.touches[0] : e;

						e.preventDefault();
						e.stopPropagation();

						this.transitionTime();

						this.initiated = true;
						this.moved = false;
						this.lastPointX = point.pageX;
						this.lastPointY = point.pageY;

						this.startTime = utils.getTime();

						if (!this.options.disableTouch) {
							utils.addEvent(window, 'touchmove', this);
						}
						if (!this.options.disablePointer) {
							utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
						}
						if (!this.options.disableMouse) {
							utils.addEvent(window, 'mousemove', this);
						}

						this.scroller._execEvent('beforeScrollStart');
					},

					_move: function _move(e) {
						var point = e.touches ? e.touches[0] : e,
						    deltaX,
						    deltaY,
						    newX,
						    newY,
						    timestamp = utils.getTime();

						if (!this.moved) {
							this.scroller._execEvent('scrollStart');
						}

						this.moved = true;

						deltaX = point.pageX - this.lastPointX;
						this.lastPointX = point.pageX;

						deltaY = point.pageY - this.lastPointY;
						this.lastPointY = point.pageY;

						newX = this.x + deltaX;
						newY = this.y + deltaY;

						this._pos(newX, newY);

						// INSERT POINT: indicator._move

						e.preventDefault();
						e.stopPropagation();
					},

					_end: function _end(e) {
						if (!this.initiated) {
							return;
						}

						this.initiated = false;

						e.preventDefault();
						e.stopPropagation();

						utils.removeEvent(window, 'touchmove', this);
						utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
						utils.removeEvent(window, 'mousemove', this);

						if (this.scroller.options.snap) {
							var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

							var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);

							if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
								this.scroller.directionX = 0;
								this.scroller.directionY = 0;
								this.scroller.currentPage = snap;
								this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
							}
						}

						if (this.moved) {
							this.scroller._execEvent('scrollEnd');
						}
					},

					transitionTime: function transitionTime(time) {
						time = time || 0;
						this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

						if (!time && utils.isBadAndroid) {
							this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
						}
					},

					transitionTimingFunction: function transitionTimingFunction(easing) {
						this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
					},

					refresh: function refresh() {
						this.transitionTime();

						if (this.options.listenX && !this.options.listenY) {
							this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
						} else if (this.options.listenY && !this.options.listenX) {
							this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
						} else {
							this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
						}

						if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
							utils.addClass(this.wrapper, 'iScrollBothScrollbars');
							utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

							if (this.options.defaultScrollbars && this.options.customStyle) {
								if (this.options.listenX) {
									this.wrapper.style.right = '8px';
								} else {
									this.wrapper.style.bottom = '8px';
								}
							}
						} else {
							utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
							utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

							if (this.options.defaultScrollbars && this.options.customStyle) {
								if (this.options.listenX) {
									this.wrapper.style.right = '2px';
								} else {
									this.wrapper.style.bottom = '2px';
								}
							}
						}

						var r = this.wrapper.offsetHeight; // force refresh

						if (this.options.listenX) {
							this.wrapperWidth = this.wrapper.clientWidth;
							if (this.options.resize) {
								this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
								this.indicatorStyle.width = this.indicatorWidth + 'px';
							} else {
								this.indicatorWidth = this.indicator.clientWidth;
							}

							this.maxPosX = this.wrapperWidth - this.indicatorWidth;

							if (this.options.shrink == 'clip') {
								this.minBoundaryX = -this.indicatorWidth + 8;
								this.maxBoundaryX = this.wrapperWidth - 8;
							} else {
								this.minBoundaryX = 0;
								this.maxBoundaryX = this.maxPosX;
							}

							this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX;
						}

						if (this.options.listenY) {
							this.wrapperHeight = this.wrapper.clientHeight;
							if (this.options.resize) {
								this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
								this.indicatorStyle.height = this.indicatorHeight + 'px';
							} else {
								this.indicatorHeight = this.indicator.clientHeight;
							}

							this.maxPosY = this.wrapperHeight - this.indicatorHeight;

							if (this.options.shrink == 'clip') {
								this.minBoundaryY = -this.indicatorHeight + 8;
								this.maxBoundaryY = this.wrapperHeight - 8;
							} else {
								this.minBoundaryY = 0;
								this.maxBoundaryY = this.maxPosY;
							}

							this.maxPosY = this.wrapperHeight - this.indicatorHeight;
							this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY;
						}

						this.updatePosition();
					},

					updatePosition: function updatePosition() {
						var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
						    y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

						if (!this.options.ignoreBoundaries) {
							if (x < this.minBoundaryX) {
								if (this.options.shrink == 'scale') {
									this.width = Math.max(this.indicatorWidth + x, 8);
									this.indicatorStyle.width = this.width + 'px';
								}
								x = this.minBoundaryX;
							} else if (x > this.maxBoundaryX) {
								if (this.options.shrink == 'scale') {
									this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
									this.indicatorStyle.width = this.width + 'px';
									x = this.maxPosX + this.indicatorWidth - this.width;
								} else {
									x = this.maxBoundaryX;
								}
							} else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
								this.width = this.indicatorWidth;
								this.indicatorStyle.width = this.width + 'px';
							}

							if (y < this.minBoundaryY) {
								if (this.options.shrink == 'scale') {
									this.height = Math.max(this.indicatorHeight + y * 3, 8);
									this.indicatorStyle.height = this.height + 'px';
								}
								y = this.minBoundaryY;
							} else if (y > this.maxBoundaryY) {
								if (this.options.shrink == 'scale') {
									this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
									this.indicatorStyle.height = this.height + 'px';
									y = this.maxPosY + this.indicatorHeight - this.height;
								} else {
									y = this.maxBoundaryY;
								}
							} else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
								this.height = this.indicatorHeight;
								this.indicatorStyle.height = this.height + 'px';
							}
						}

						this.x = x;
						this.y = y;

						if (this.scroller.options.useTransform) {
							this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
						} else {
							this.indicatorStyle.left = x + 'px';
							this.indicatorStyle.top = y + 'px';
						}
					},

					_pos: function _pos(x, y) {
						if (x < 0) {
							x = 0;
						} else if (x > this.maxPosX) {
							x = this.maxPosX;
						}

						if (y < 0) {
							y = 0;
						} else if (y > this.maxPosY) {
							y = this.maxPosY;
						}

						x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
						y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

						this.scroller.scrollTo(x, y);
					},

					fade: function fade(val, hold) {
						if (hold && !this.visible) {
							return;
						}

						clearTimeout(this.fadeTimeout);
						this.fadeTimeout = null;

						var time = val ? 250 : 500,
						    delay = val ? 0 : 300;

						val = val ? '1' : '0';

						this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

						this.fadeTimeout = setTimeout(function (val) {
							this.wrapperStyle.opacity = val;
							this.visible = +val;
						}.bind(this, val), delay);
					}
				};

				IScroll.utils = utils;

				if (typeof module != 'undefined' && module.exports) {
					module.exports = IScroll;
				} else {
					window.IScroll = IScroll;
				}
			})(window, document, Math);

			/***/
		}

		/******/ });

/***/ }
/******/ ]);