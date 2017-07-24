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

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _measureSkin = __webpack_require__(6);

	var _proMeasureSkin = __webpack_require__(9);

	var _afterProMeasureSkin = __webpack_require__(10);

	var _analysis = __webpack_require__(11);

	var _proResult = __webpack_require__(12);

	var _App = __webpack_require__(13);

	var _skinCareTest = __webpack_require__(14);

	var _brandShow = __webpack_require__(15);

	var _deviceList = __webpack_require__(16);

	var _userView = __webpack_require__(17);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory; // import {Funs} from '../../../common/src/fun.es6';

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}
	// 开始渲染
	het.domReady(function () {
	    het.setTitle('测肤仪');
	    var oid = getQueryString('openid');
	    _Actions.Actions.configWx(oid);
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 我也不想传这么多值，是后台逼我的，要找就找后台！
	    // AfterProMeasureSkin /部位/产品ID/上一次测肤的ID/护肤前水/护肤前油/护肤前弹性
	    // Analysis /部位/护肤前水/护肤前油/护肤前弹性/护肤后水/护肤后油/护肤后弹性/肤质描述
	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: _App.App }),
	        React.createElement(Route, { path: '/skinCareTest', component: _skinCareTest.skinCareTest }),
	        React.createElement(Route, { path: '/brandShow', component: _brandShow.brandShow }),
	        React.createElement(Route, { path: '/deviceList', component: _deviceList.deviceList }),
	        React.createElement(Route, { path: '/userView', component: _userView.userView }),
	        React.createElement(Route, { path: '/measureSkin', component: _measureSkin.MeasureSkin }),
	        React.createElement(Route, { path: '/protest/:part/:productId', component: _proMeasureSkin.ProMeasureSkin }),
	        React.createElement(Route, { path: '/afterprotest/:part/:productId/:lastPartMeasureId/:beforeWater/:beforeOil/:beforeElasticity', component: _afterProMeasureSkin.AfterProMeasureSkin }),
	        React.createElement(Route, { path: '/analysis/:part/:beforeWater/:beforeOil/:beforeElasticity/:afterWater/:afterOil/:afterElasticity/:skinTypeName', component: _analysis.Analysis }),
	        React.createElement(Route, { path: '/proResult', component: _proResult.ProResult })
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
	var Actions = exports.Actions = Reflux.createActions(['deviceInfo', // 获取设备信息
	'setPart', //选择部位进行测试
	'getData', //轮询获取测试数据
	'getResult', //获取水油弹分析报告
	'location', //获取位置信息
	'clearTest', //页面跳转时，清空测试信息
	'initTest', //测肤页面退出时清空信息
	'clearProTest', //退出护肤品测试页面清空测试肤质信息
	'getContrastData', //获取护肤品测试前后的对比数据
	'getBrandList', //获取品牌列表
	'confirmLogin', //登录
	'getDeviceList', //获取设备列表
	'getSkinDevice', //获取测肤仪列表
	'getPosition', //获取省市列表
	'getproductinfo', //获取护肤品信息
	'configWx', //配置微信
	'getBrandLogo', //获得品牌logo
	'getSingleResult', //单点测试用户结果
	'saveUseInfo', //保存用户信息
	'uploadProcuctInfo', //上传护肤品信息
	'hideShareMenu', //批量隐藏分享菜单
	'showShareMenu', //批量显示分享菜单
	'setShareInfo']);

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

	/* 封装ajax函数
	 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
	 * @param {string}opt.url 发送请求的url
	 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
	 * @param {object}opt.data 发送的参数，格式为对象类型
	 * @param {function}opt.success ajax发送并接收成功调用的回调函数
	 */
	function ajax(opt) {
	    opt = opt || {};
	    opt.method = opt.method.toUpperCase() || 'POST';
	    opt.url = opt.url || '';
	    opt.async = opt.async || true;
	    opt.data = opt.data || null;
	    opt.success = opt.success || function () {};
	    opt.error = opt.error || function () {};
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
	        } else {
	            opt.error();
	        }
	    };
	}

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

	/**
	 * Toast提示
	 * @param    {String}      msg提示信息
	 */
	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	function setCookie(c_name, value, expireSeconds, path) {
	    var exdate = new Date();
	    exdate.setTime(exdate.getTime() + expireSeconds * 1000);
	    document.cookie = c_name + "=" + escape(value) + (expireSeconds == null ? "" : ";expires=" + exdate.toGMTString()) + ";" + (path == null ? "" : "path=" + escape(path));
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function delCookie(name) {
	    var date = new Date();
	    date.setTime(date.getTime() - 10000);
	    document.cookie = name + "=a;expires=" + date.toGMTString() + ";path=/";
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	/**
	 * 部位转换
	 * @param    {String}      part
	 */
	function changePart(part) {
	    //1:额头 2:左脸 3:右脸 4:鼻子 5:眼周 6:手部
	    //11:额头 13:左脸 15:右脸 12:鼻子 2:眼周 3:手部
	    var val = 0;
	    switch (part) {
	        case 1:
	            val = 11;break;
	        case 2:
	            val = 13;break;
	        case 3:
	            val = 15;break;
	        case 4:
	            val = 12;break;
	        case 5:
	            val = 2;break;
	        case 6:
	            val = 3;break;
	    }
	    return val;
	}

	function refreshToken(sucFun) {
	    var token = getCookie('accessToken');
	    var refreshToken = getCookie('refreshToken');
	    if (token) {
	        sucFun();
	    } else if (refreshToken && !token) {
	        var _url2 = docker.host + '/v1/account/token/refresh';
	        ajax({
	            method: 'GET',
	            url: _url2,
	            data: {
	                appId: docker.appId,
	                refreshToken: getCookie('refreshToken'),
	                timestamp: new Date().getTime()
	            },
	            async: true,
	            success: function success(res) {
	                if (res.code == 0) {
	                    setCookie('openid', res.data.openId, res.data.refreshTokenExpires, '/');
	                    setCookie('accessToken', res.data.accessToken, res.data.accessTokenExpires, '/');
	                    setCookie('refreshToken', res.data.accessToken, res.data.refreshTokenExpires, '/');
	                    sucFuc();
	                } else if (res.code == 100010102) {
	                    delCookie('openid');
	                    delCookie('accessToken');
	                    delCookie('refreshToken');
	                    var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                    window.location.replace(loginUrl);
	                }
	            }
	        });
	    } else {
	        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	        window.location.replace(loginUrl);
	    }
	}

	/**
	 * 微信分享配置
	 * @param    {String}    title   分享标题 
	 * @param    {String}    desc    分享描述
	 * @param    {String}    link    分享链接
	 * @param    {String}    imgUrl  分享图标
	 * @param    {String}    type    分享类型,music、video或link，不填默认为link
	 * @param    {String}    dataUrl 如果type是music或video，则要提供数据链接，默认为空
	 * @param    {function}  success 用户确认分享后执行的回调函数
	 * @param    {function}  error   用户取消分享后执行的回调函数
	 */
	function wxShareConfig(data) {
	    // alert(JSON.stringify(data));
	    var title = data.title || ''; // 分享标题
	    var title1 = data.title1 || data.title; // 分享到朋友圈
	    var desc = data.desc || ''; // 分享描述
	    var link = data.link || ''; // 分享链接
	    var imgUrl = data.imgUrl || ''; // 分享图标
	    var type = data.type || ''; // 分享类型,music、video或link，不填默认为link
	    var dataUrl = data.dataUrl || ''; // 如果type是music或video，则要提供数据链接，默认为空
	    //分享给微信朋友
	    wx.onMenuShareAppMessage({
	        title: title,
	        desc: desc,
	        link: link,
	        imgUrl: imgUrl,
	        type: type,
	        dataUrl: dataUrl,
	        success: function success() {
	            // // 用户确认分享后执行的回调函数

	            data.success && data.success();
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            data.error && data.error();
	        }
	    });
	    //分享给朋友圈
	    wx.onMenuShareTimeline({
	        title: title1, // 分享标题
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function success() {
	            // 用户确认分享后执行的回调函数

	            data.success && data.success();
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            data.error && data.error();
	        },
	        fail: function fail(res) {
	            alert(JSON.stringify(res));
	        }
	    });
	    //分享到QQ
	    wx.onMenuShareQQ({
	        title: title, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function success() {
	            // 用户确认分享后执行的回调函数

	            data.success && data.success();
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            data.error && data.error();
	        }
	    });
	    //分享到腾讯微博
	    wx.onMenuShareWeibo({
	        title: title, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function success() {
	            // 用户确认分享后执行的回调函数

	            data.success && data.success();
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            data.error && data.error();
	        }
	    });
	    //分享到QQ空间
	    wx.onMenuShareQZone({
	        title: title, // 分享标题
	        desc: desc, // 分享描述
	        link: link, // 分享链接
	        imgUrl: imgUrl, // 分享图标
	        success: function success() {
	            // 用户确认分享后执行的回调函数

	            data.success && data.success();
	        },
	        cancel: function cancel() {
	            // 用户取消分享后执行的回调函数
	            data.error && data.error();
	        }
	    });
	}

	var docker = {
	    appId: '10101',
	    appSecret: "afd55f877bad4aaeab45fb4ca567d234", //唯一
	    appType: !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2,
	    host: 'https://dp.clife.net',
	    location: '101280601',
	    src: '/manages/mobile/cBeauty/wxMeasureSkin/page/'
	};
	var url = docker.host + '/v1/app/chairdressing/elasticskinmeter/config/set';
	var appId = docker.appId;
	var source = 2;
	var timestamp = new Date().getTime();
	var appSecret = docker.appSecret;
	var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "&appId=" + appId + "&timestamp=" + timestamp + "&" + appSecret));
	var AppData = {};
	window.dataTimer = null;
	window.deviceTimer = null;
	var setPartAjax = null;

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onDeviceInfo: function onDeviceInfo() {
	        clearInterval(window.deviceTimer);
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            function getDeviceInfo() {
	                var url = docker.host + '/v1/device/getDeviceInfo';
	                ajax({
	                    method: 'GET',
	                    url: url,
	                    data: {
	                        accessToken: getCookie('accessToken'),
	                        appId: docker.appId,
	                        appType: docker.appType,
	                        deviceId: getCookie('deviceId'),
	                        timestamp: new Date().getTime()
	                    },
	                    async: true,
	                    success: function success(res) {
	                        if (res.code == 0) {
	                            AppData.onlineStatus = res.data.onlineStatus;
	                        } else if (res.code == 100010101 || res.code == 100021006) {
	                            delCookie('openid');
	                            delCookie('accessToken');
	                            delCookie('refreshToken');
	                            var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                            window.location.replace(loginUrl);
	                        } else {
	                            AppData.onlineStatus = 2;
	                        }
	                        _this.trigger(AppData);
	                    }
	                });
	            }
	            getDeviceInfo();
	            window.deviceTimer = setInterval(getDeviceInfo, 5000);
	        };
	        refreshToken(sucFuc);
	    },
	    onSetPart: function onSetPart(part, pro, qrcode, lastId) {
	        //设备初始化清零接口
	        clearInterval(window.dataTimer);
	        setPartAjax && setPartAjax.abort();
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            AppData.part = part;
	            AppData.status = 2;
	            AppData.btnStatus = false;
	            var url = docker.host + '/v1/app/chairdressing/elasticskinmeter/config/set';
	            var part1 = pro ? part : changePart(part);
	            var accessToken = getCookie('accessToken');
	            var appId = docker.appId;
	            var deviceId = getCookie('deviceId');
	            var source = 2;
	            var timestamp = new Date().getTime();
	            var appSecret = docker.appSecret;
	            var json = JSON.stringify({ "part": part1, "updateFlag": 1 });
	            var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	            var data = {
	                appId: docker.appId,
	                timestamp: timestamp,
	                accessToken: accessToken,
	                deviceId: deviceId,
	                source: source,
	                json: json,
	                sign: sign
	            };
	            //设备初始化 超过5000ms 直接回到初始状态并提示设备初始化失败
	            setTimeout(function () {
	                if (AppData.optTimestamp) {
	                    console.log(setPartAjax);
	                    setPartAjax && setPartAjax.abort();
	                    // showToast('初始化失败');
	                }
	            }, 5000);

	            setPartAjax = $.ajax({
	                type: 'POST',
	                url: url,
	                data: data,
	                success: function success(res) {
	                    if (res.code == 0) {
	                        AppData.optTimestamp = res.data.optTimestamp;
	                        AppData.status = 3;
	                        _this.trigger(AppData);
	                        _this.onGetData(part1, pro, qrcode, lastId);
	                    } else if (res.code == 100010101 || res.code == 100021006) {
	                        delCookie('openid');
	                        delCookie('accessToken');
	                        delCookie('refreshToken');
	                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(loginUrl);
	                    } else {
	                        if (pro) {
	                            AppData.status = 1;
	                            AppData.btnStatus = true;
	                        } else {
	                            AppData.status = 1;
	                            AppData.part = 0;
	                            showToast('初始化失败');
	                        }
	                        _this.trigger(AppData);
	                    }
	                },
	                error: function error(res) {
	                    if (pro) {
	                        AppData.status = 1;
	                        AppData.btnStatus = true;
	                    } else {
	                        AppData.status = 1;
	                        AppData.part = 0;
	                        showToast('初始化失败');
	                    }
	                    _this.trigger(AppData);
	                    // showToast('初始化失败');
	                }
	            });
	        };
	        refreshToken(sucFuc);
	    },
	    onGetData: function onGetData(part, pro, qrcode, lastId) {
	        //获取运行数据（测试状态，水油弹）接口
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/app/chairdressing/elasticskinmeter/data/get';
	            var accessToken = getCookie('accessToken');
	            var appId = docker.appId;
	            var deviceId = getCookie('deviceId');
	            var timestamp = new Date().getTime();
	            var optTimestamp = AppData.optTimestamp;
	            var requestNum = 0;
	            var tempStatus = 0;
	            function getWotData() {
	                ajax({
	                    method: 'GET',
	                    url: url,
	                    data: {
	                        appId: appId,
	                        accessToken: accessToken,
	                        timestamp: timestamp,
	                        deviceId: deviceId,
	                        part: part,
	                        optTimestamp: optTimestamp
	                    },
	                    async: true,
	                    success: function success(res) {
	                        AppData.optTimestamp = null;
	                        requestNum++;
	                        if (requestNum > 20) {
	                            clearInterval(window.dataTimer);
	                            AppData.status = 1;
	                            AppData.btnStatus = true;
	                            if (!pro) {
	                                AppData.part = 0;
	                                showToast('测试失败');
	                            } else {
	                                AppData.status = 0;
	                            }
	                            _this.trigger(AppData);
	                            return;
	                        }
	                        if (res.code == 0) {
	                            AppData.cleanStatus = res.data.cleanStatus;
	                            AppData.testStatus = res.data.testStatus;
	                            AppData.elasticityStatus = res.data.elasticityStatus;
	                            AppData.water = res.data.water;
	                            AppData.oil = res.data.oil;
	                            AppData.elasticity = res.data.elasticity;
	                            AppData.electricity = res.data.electricity;
	                            if (res.data.testStatus == 1) {
	                                //清零成功，但没有测试数据
	                                if (tempStatus < 1) {
	                                    tempStatus++;
	                                } else {
	                                    AppData.status = 4;
	                                }
	                            } else if (res.data.testStatus == 0 && res.data.water && res.data.oil && res.data.elasticity) {
	                                //测试成功
	                                AppData.status = 5;
	                                AppData.btnStatus = true;
	                                clearInterval(window.dataTimer);
	                                _this.onGetResult(part, pro, qrcode, lastId);
	                            }
	                            if (res.data.testFailDescrip) {
	                                AppData.status = 1;
	                                AppData.btnStatus = true;
	                                if (!pro) {
	                                    AppData.part = 0;
	                                    showToast('测试失败');
	                                } else {
	                                    AppData.status = 0;
	                                }
	                                clearInterval(window.dataTimer);
	                                _this.trigger(AppData);
	                                return;
	                            }
	                            _this.trigger(AppData);
	                        } else if (res.code == 100010101 || res.code == 100021006) {
	                            delCookie('openid');
	                            delCookie('accessToken');
	                            delCookie('refreshToken');
	                            var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                            window.location.replace(loginUrl);
	                        } else {
	                            clearInterval(window.dataTimer);
	                            AppData.status = 1;
	                            if (!pro) {
	                                AppData.part = 0;
	                                showToast('测试失败');
	                            } else {
	                                AppData.status = 0;
	                            }
	                            AppData.btnStatus = true;
	                            _this.trigger(AppData);
	                        }
	                    }
	                });
	            }
	            getWotData();
	            window.dataTimer = setInterval(getWotData, 2000);
	        };
	        refreshToken(sucFuc);
	    },
	    onGetResult: function onGetResult(part, pro, qrcode, lastId) {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/partmeasure/uploadpartskintestresult';
	            var accessToken = getCookie('accessToken');
	            var appId = docker.appId;
	            var timestamp = new Date().getTime();
	            var isNeedQR = qrcode ? 1 : 0;
	            var data = {
	                appId: docker.appId,
	                timestamp: timestamp,
	                accessToken: accessToken,
	                part: part,
	                water: AppData.water,
	                oil: AppData.oil,
	                elasticity: AppData.elasticity,
	                measureTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
	                skinMeterId: getCookie('deviceId'),
	                isNeedQR: isNeedQR,
	                location: docker.location
	            };
	            if (pro && lastId) {
	                data.lastPartMeasureId = lastId;
	                data.productId = pro;
	            }
	            ajax({
	                method: 'POST',
	                url: url,
	                data: data,
	                async: true,
	                success: function success(res) {
	                    if (res.code == 0) {
	                        var _data = {};
	                        _data.qrUrl = res.data.qrUrl;
	                        window.qrUrl = res.data.qrUrl;
	                        _data.skinTypeName = res.data.skinTypeName;
	                        _data.lastInsertId = res.data.lastInsertId;
	                        _this.trigger(_data);
	                    } else if (res.code == 100010101 || res.code == 100021006) {
	                        delCookie('openid');
	                        delCookie('accessToken');
	                        delCookie('refreshToken');
	                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(loginUrl);
	                    } else {
	                        AppData.status = 1;
	                        AppData.btnStatus = true;
	                        AppData.part = 0;
	                        _this.trigger(AppData);
	                    }
	                }
	            });
	        };
	        refreshToken(sucFuc);
	    },
	    onLocation: function onLocation() {
	        var url = docker.host + '/v1/web/env/location/get?city=ip';
	        ajax({
	            method: 'GET',
	            url: url,
	            async: true,
	            success: function success(res) {
	                if (res.code == 0) {
	                    docker.location = res.data.cityCode;
	                }
	            }
	        });
	    },
	    onClearTest: function onClearTest(part) {
	        AppData.part = part;
	        AppData.status = 2;
	        AppData.btnStatus = false;
	        this.trigger(AppData);
	    },
	    onInitTest: function onInitTest() {
	        AppData.status = 1;
	        // AppData.part = 0;
	        setPartAjax && setPartAjax.abort();
	        this.trigger(AppData);
	    },
	    onClearProTest: function onClearProTest() {
	        AppData.status = 1;
	        AppData.part = 0;
	        setPartAjax && setPartAjax.abort();
	        this.trigger(AppData);
	    },
	    onGetContrastData: function onGetContrastData(openid, lastInsertId, lastPartMeasureId) {
	        //护肤品测肤扫码
	        var _this = this;
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/partmeasure/getuserskintestdatas';
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	                openid: openid,
	                lastInsertId: lastInsertId,
	                lastPartMeasureId: lastPartMeasureId
	            },
	            async: true,
	            success: function success(res) {
	                if (res.code == 0) {
	                    console.log(res);
	                    var value = res.data;
	                    var data = {};
	                    data.part = value.skinTestAfter.part;
	                    data.skinTypeName = value.skinTestAfter.skinTypeName;
	                    data.productName = value.productName;
	                    data.imgUrl = value.imgUrl;
	                    data.beforeWater = value.skinTestBefore.water;
	                    data.beforeOil = value.skinTestBefore.oil;
	                    data.beforeElasticity = value.skinTestBefore.elasticity;
	                    data.afterWater = value.skinTestAfter.water;
	                    data.afterOil = value.skinTestAfter.oil;
	                    data.afterElasticity = value.skinTestAfter.elasticity;
	                    _this.trigger(data);
	                }
	            }
	        });
	    },

	    onGetBrandList: function onGetBrandList() {
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/dropList';
	        var _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {},
	            async: true,
	            success: function success(res) {
	                if (res.code === 0) {
	                    _this.trigger({ list: res.data });
	                }
	            }
	        });
	    },
	    onConfirmLogin: function onConfirmLogin(account, password, access, brandId, openid) {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/login';
	            var paw = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(CryptoJS.MD5(password).toString(CryptoJS.enc.Base64) + appSecret));
	            ajax({
	                method: 'POST',
	                url: url,
	                data: {
	                    appId: docker.appId,
	                    timestamp: new Date().getTime(),
	                    account: account,
	                    password: paw,
	                    sign: sign,
	                    brandIdentify: brandId,
	                    authCode: access,
	                    openId: openid
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code === 0) {
	                        setCookie('openid', res.data.openId, res.data.refreshTokenExpires, '/');
	                        setCookie('accessToken', res.data.accessToken, res.data.accessTokenExpires, '/');
	                        setCookie('refreshToken', res.data.accessToken, res.data.refreshTokenExpires, '/');
	                        var _url3 = '#/brandShow?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(_url3);
	                    } else if (res.code === '100021001') {
	                        showToast('账号未注册');
	                    } else if (res.code === '100021500') {
	                        showToast('密码错误');
	                    } else if (res.code === '100010201') {
	                        showToast('参数错误');
	                    } else {
	                        showToast(res.msg);
	                    }
	                }
	            });
	        };
	        sucFuc();
	    },
	    onGetDeviceList: function onGetDeviceList() {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/device/getBind';
	            ajax({
	                method: 'GET',
	                url: url,
	                data: {
	                    appId: docker.appId,
	                    timestamp: new Date().getTime(),
	                    accessToken: getCookie('accessToken'),
	                    appType: docker.appType
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code === 0) {
	                        console.log(res);
	                        var list = [];
	                        if (res.data.length > 0) {
	                            for (var i = 0; i < res.data.length; i++) {
	                                if (res.data[i].deviceTypeId === 31) {
	                                    list.push(res.data[i]);
	                                }
	                            }
	                        }
	                        if (list.length === 1) {
	                            setCookie('deviceId', list[0].deviceId);
	                        }
	                        _this.trigger({ deviceList: list });
	                    } else if (res.code == 100010101 || res.code == 100021006) {
	                        delCookie('openid');
	                        delCookie('accessToken');
	                        delCookie('refreshToken');
	                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(loginUrl);
	                    }
	                }
	            });
	        };
	        refreshToken(sucFuc);
	    },
	    onGetSkinDevice: function onGetSkinDevice() {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/device/getBind';
	            ajax({
	                method: 'GET',
	                url: url,
	                data: {
	                    appId: docker.appId,
	                    timestamp: new Date().getTime(),
	                    accessToken: getCookie('accessToken'),
	                    appType: docker.appType
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code === 0) {
	                        console.log('getBind', res);
	                        var list = [];
	                        if (res.data.length > 0) {
	                            for (var i = 0; i < res.data.length; i++) {
	                                if (res.data[i].deviceTypeId === 31) {
	                                    list.push(res.data[i]);
	                                }
	                            }
	                        }
	                        if (list.length === 1) {
	                            setCookie('deviceId', list[0].deviceId);
	                        }
	                        _this.trigger({ deviceList: list });
	                    } else if (res.code == 100010101 || res.code == 100021006) {
	                        delCookie('openid');
	                        delCookie('accessToken');
	                        delCookie('refreshToken');
	                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(loginUrl);
	                    }
	                }
	            });
	        };
	        refreshToken(sucFuc);
	    },
	    onGetPosition: function onGetPosition(area) {
	        var _this = this;
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/allRegion';
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {},
	            async: true,
	            success: function success(res) {
	                console.log(res.data);
	                if (res.code === 0) {
	                    new MultiPicker({
	                        input: 'area-picker',
	                        container: 'area-con',
	                        jsonData: res.data,
	                        success: function success(arr) {
	                            console.log(arr);
	                            area.innerHTML = arr[0].regionName + arr[1].regionName;
	                            _this.trigger({ proId: arr[0].regionId, cityId: arr[1].regionId });
	                        }
	                    });
	                    //_this.trigger({posList: res.data});
	                }
	            }
	        });
	    },
	    onGetproductinfo: function onGetproductinfo() {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/getproductinfo';
	            ajax({
	                method: 'GET',
	                url: url,
	                data: {
	                    accessToken: getCookie('accessToken'),
	                    appId: docker.appId,
	                    timestamp: new Date().getTime()
	                },
	                async: true,
	                success: function success(res) {
	                    if (res.code === 0) {
	                        _this.trigger({ proList: res.data });
	                    } else if (res.code == 100010101 || res.code == 100021006) {
	                        delCookie('openid');
	                        delCookie('accessToken');
	                        delCookie('refreshToken');
	                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                        window.location.replace(loginUrl);
	                    }
	                }
	            });
	        };
	        refreshToken(sucFuc);
	    },
	    onConfigWx: function onConfigWx(oid) {
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/sign';
	        var _url = window.location.href;
	        var config = {};
	        var _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	                url: _url
	            },
	            async: true,
	            success: function success(r) {
	                //console.log(r)
	                if (r.code == 0) {
	                    config.nonceStr = r.data.nonceStr;
	                    config.signature = r.data.signature;
	                    config.appId = r.data.appId;
	                    config.timestamp = r.data.timestamp;
	                    wx.config({
	                        debug: false,
	                        appId: config.appId,
	                        timestamp: config.timestamp,
	                        nonceStr: config.nonceStr,
	                        signature: config.signature,
	                        jsApiList: ['checkJsApi', 'chooseImage', 'hideMenuItems', 'showMenuItems', 'uploadImage', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
	                    });
	                    wx.ready(function () {
	                        if (window.location.href.indexOf('userView') != -1 || window.location.href.indexOf('proResult') != -1) {
	                            var _url4 = window.location.href;
	                            wxShareConfig({
	                                title: '微信测肤仪',
	                                desc: '我刚刚测试了自己俊俏小脸蛋的肤质，小伙伴们快来围观吧！',
	                                link: _url4,
	                                imgUrl: '',
	                                type: '',
	                                dataUrl: ''
	                            });
	                        } else {
	                            wx.hideMenuItems({
	                                menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	                            });
	                        }
	                    });
	                } else {
	                    showToast('访问异常！');
	                }
	            }
	        });
	    },
	    getBrandLogo: function getBrandLogo(oid) {
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/brandInfo';
	        var _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	                sellerId: oid
	            },
	            async: true,
	            success: function success(res) {
	                if (res.code === 0) {
	                    _this.trigger({ logoSrc: res.data.logoUrl });
	                }
	            }
	        });
	    },
	    onGetSingleResult: function onGetSingleResult(oid, lastInsertId) {
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/partmeasure/getuserskintestdata';
	        var _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	                openid: oid,
	                lastInsertId: lastInsertId
	            },
	            async: true,
	            success: function success(res) {
	                console.log(res);
	                if (res.code === 0) {
	                    _this.trigger(res.data);
	                }
	            }
	        });
	    },
	    onSaveUseInfo: function onSaveUseInfo(oid, birthday, sex, province, city) {
	        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/userinfo/saveuserinfo';
	        var _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	                consumerOpenid: oid,
	                birthday: birthday,
	                sex: sex,
	                province: province,
	                city: city
	            },
	            async: true,
	            success: function success(res) {
	                if (res.code === 0) {
	                    _this.trigger({ userInfoStatus: 1 });
	                }
	            }
	        });
	    },
	    onUploadProcuctInfo: function onUploadProcuctInfo(productName, img, part, productId, flag1, flag2) {
	        var _this = this;
	        var sucFuc = function sucFuc() {
	            if (productId === '') {
	                wx.uploadImage({
	                    localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
	                    isShowProgressTips: 1, // 默认为1，显示进度提示
	                    success: function success(res) {
	                        var serverId = res.serverId; // 返回图片的服务器端ID
	                        //alert(serverId+'      这是serverID');
	                        var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
	                        ajax({
	                            method: 'POST',
	                            url: url,
	                            data: {
	                                accessToken: getCookie('accessToken'),
	                                appId: docker.appId,
	                                timestamp: new Date().getTime(),
	                                productId: '',
	                                isBase64: false,
	                                productName: productName,
	                                imageBase64: serverId,
	                                imageSuffix: 'png'
	                            },
	                            async: true,
	                            success: function success(res) {
	                                if (res.code === 0) {
	                                    var _url5 = 'https://' + window.location.host + docker.src + '#/protest/' + part + '/' + res.data.productId + '?openid=' + getQueryString('openid') || getCookie('openid');
	                                    //alert(url+'    产品名和图片都变了');
	                                    window.location.href = _url5;
	                                } else if (res.code == 100010101 || res.code == 100021006) {
	                                    delCookie('openid');
	                                    delCookie('accessToken');
	                                    delCookie('refreshToken');

	                                    var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                                    window.location.replace(loginUrl);
	                                }
	                            }
	                        });
	                    }
	                });
	            } else {
	                if (flag1 && flag2) {
	                    var _url6 = 'https://' + window.location.host + docker.src + '#/protest/' + part + '/' + productId + '?openid=' + getQueryString('openid') || getCookie('openid');
	                    //alert(url + '    无需上传东西');
	                    window.location.href = _url6;
	                } else if (!flag1 && flag2) {
	                    var _url7 = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
	                    ajax({
	                        method: 'POST',
	                        url: _url7,
	                        data: {
	                            accessToken: getCookie('accessToken'),
	                            appId: docker.appId,
	                            timestamp: new Date().getTime(),
	                            productId: '',
	                            isBase64: false,
	                            productName: productName,
	                            imageBase64: img,
	                            imageSuffix: 'png'
	                        },
	                        async: true,
	                        success: function success(res) {
	                            if (res.code === 0) {
	                                var _url8 = 'https://' + window.location.host + docker.src + '#/protest/' + part + '/' + res.data.productId + '?openid=' + getQueryString('openid') || getCookie('openid');
	                                //alert(url+'    产品名变了图片不变');
	                                window.location.href = _url8;
	                            } else if (res.code == 100010101 || res.code == 100021006) {
	                                delCookie('openid');
	                                delCookie('accessToken');
	                                delCookie('refreshToken');

	                                var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                                window.location.replace(loginUrl);
	                            }
	                        }
	                    });
	                } else {
	                    wx.uploadImage({
	                        localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
	                        isShowProgressTips: 1, // 默认为1，显示进度提示
	                        success: function success(res) {
	                            var serverId = res.serverId; // 返回图片的服务器端ID
	                            //alert(serverId+'      这是serverID');
	                            var url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
	                            ajax({
	                                method: 'POST',
	                                url: url,
	                                data: {
	                                    accessToken: getCookie('accessToken'),
	                                    appId: docker.appId,
	                                    timestamp: new Date().getTime(),
	                                    productId: '',
	                                    isBase64: false,
	                                    productName: productName,
	                                    imageBase64: serverId,
	                                    imageSuffix: 'png'
	                                },
	                                async: true,
	                                success: function success(res) {
	                                    if (res.code === 0) {
	                                        var _url9 = 'https://' + window.location.host + docker.src + '#/protest/' + part + '/' + res.data.productId + '?openid=' + getQueryString('openid') || getCookie('openid');
	                                        //alert(url+'    产品名和图片都变了');
	                                        window.location.href = _url9;
	                                    } else if (res.code == 100010101 || res.code == 100021006) {
	                                        delCookie('openid');
	                                        delCookie('accessToken');
	                                        delCookie('refreshToken');

	                                        var loginUrl = 'https://' + window.location.host + docker.src + '#/?openid=' + getQueryString('openid') || getCookie('openid');
	                                        window.location.replace(loginUrl);
	                                    }
	                                }
	                            });
	                        }
	                    });
	                }
	            }
	        };
	        refreshToken(sucFuc);
	    },
	    onHideShareMenu: function onHideShareMenu() {
	        wx.hideMenuItems({
	            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	        });
	    },
	    onShowShareMenu: function onShowShareMenu() {
	        wx.showMenuItems({
	            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	        });
	    },
	    onSetShareInfo: function onSetShareInfo() {
	        wxShareConfig({
	            title: '微信测肤仪',
	            desc: '我刚刚测试了自己俊俏小脸蛋的肤质，小伙伴们快来围观吧！',
	            link: '',
	            imgUrl: '',
	            type: '',
	            dataUrl: ''
	        });
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MeasureSkin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

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

	/**
	 * Toast提示
	 * @param    {String}      msg提示信息
	 */

	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件

	var MeasureSkin = exports.MeasureSkin = function (_BaseComponent) {
	    _inherits(MeasureSkin, _BaseComponent);

	    function MeasureSkin(props) {
	        _classCallCheck(this, MeasureSkin);

	        var _this = _possibleConstructorReturn(this, (MeasureSkin.__proto__ || Object.getPrototypeOf(MeasureSkin)).call(this, props));

	        _this.state = {
	            part: 0,
	            status: 1
	        };
	        het.setTitle('水油弹性测试');
	        setDocumentTitle('水油弹性测试');
	        _this.myScroll = null;
	        _this.partArr = ['额头', '左脸', '右脸', '鼻子', '眼周', '手部'];
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.clearProTest();
	        _Actions.Actions.deviceInfo();
	        return _this;
	    }

	    _createClass(MeasureSkin, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.myScroll = new IScroll('#wrapper', {
	                eventPassthrough: true,
	                scrollX: true,
	                scrollY: false,
	                preventDefault: false
	            });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _Actions.Actions.initTest();
	            clearInterval(window.deviceTimer);
	            clearInterval(window.dataTimer);
	        }
	    }, {
	        key: 'choosePart',
	        value: function choosePart(e) {
	            if (this.state.onlineStatus == 2) {
	                showToast('设备不在线');
	                return;
	            }
	            var part = parseInt(e.currentTarget.getAttribute('data-part'));
	            this.setState({
	                part: part,
	                status: 2,
	                water: 0,
	                oil: 0,
	                elasticity: 0,
	                qrUrl: '',
	                skinTypeName: ''
	            });
	            _Actions.Actions.setPart(part, '', 'qrcode');
	        }
	    }, {
	        key: 'reTest',
	        value: function reTest(e) {
	            e.preventDefault();
	            this.setState({
	                status: 2,
	                water: 0,
	                oil: 0,
	                elasticity: 0,
	                qrUrl: '',
	                skinTypeName: ''
	            });
	            _Actions.Actions.setPart(this.state.part, '', 'qrcode');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('最终数据:', JSON.stringify(this.state));
	            //data-status 1:请选择部位 2:设备初始化 3:请将设备贴近部位 4:正在测试 5:展示测试结果
	            var part = this.state.part || 0;
	            var status = this.state.status;
	            var lowBattry = '';
	            var outline = '';
	            var desc = '';
	            if (this.state.onlineStatus == 2) {
	                outline = React.createElement(
	                    'div',
	                    { className: 'outline' },
	                    React.createElement('img', { src: '../static/img/outline.png' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BBE\u5907\u4E0D\u5728\u7EBF'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BF7\u5F00\u542F\u8BBE\u5907\u5E76\u786E\u4FDD\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38'
	                    )
	                );
	            }
	            if (this.state.onlineStatus != 2) {
	                desc = React.createElement(
	                    'span',
	                    null,
	                    '\u8BF7\u9009\u62E9\u4E00\u4E2A\u90E8\u4F4D'
	                );
	            }
	            if (this.state.electricity && this.state.electricity <= 3 && !outline) {
	                lowBattry = React.createElement(
	                    'p',
	                    { className: 'low-battery' },
	                    React.createElement('img', { src: '../static/img/power.png' }),
	                    '\u8BBE\u5907\u7535\u91CF\u4F4E\uFF0C\u8BF7\u53CA\u65F6\u5145\u7535'
	                );
	            }
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { id: 'wrapper', className: 'partSection' },
	                    React.createElement(
	                        'section',
	                        { id: 'scroller' },
	                        React.createElement(
	                            'dl',
	                            { className: part == 1 ? 'dl active' : 'dl', 'data-part': 1, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 1 ? '../static/img/forehead-r.png' : '../static/img/forehead.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u989D\u5934'
	                            )
	                        ),
	                        React.createElement(
	                            'dl',
	                            { className: part == 2 ? 'dl active' : 'dl', 'data-part': 2, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 2 ? '../static/img/left-r.png' : '../static/img/left.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u5DE6\u8138'
	                            )
	                        ),
	                        React.createElement(
	                            'dl',
	                            { className: part == 3 ? 'dl active' : 'dl', 'data-part': 3, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 3 ? '../static/img/right-r.png' : '../static/img/right.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u53F3\u8138'
	                            )
	                        ),
	                        React.createElement(
	                            'dl',
	                            { className: part == 4 ? 'dl active' : 'dl', 'data-part': 4, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 4 ? '../static/img/nose-r.png' : '../static/img/nose.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u9F3B\u5B50'
	                            )
	                        ),
	                        React.createElement(
	                            'dl',
	                            { className: part == 5 ? 'dl active' : 'dl', 'data-part': 5, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 5 ? '../static/img/eye-r.png' : '../static/img/eye.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u773C\u5468'
	                            )
	                        ),
	                        React.createElement(
	                            'dl',
	                            { className: part == 6 ? 'dl active' : 'dl', 'data-part': 6, onTouchTap: this.choosePart.bind(this) },
	                            React.createElement(
	                                'dt',
	                                null,
	                                React.createElement('img', { src: part == 6 ? '../static/img/hand-r.png' : '../static/img/hand.png' })
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u624B\u90E8'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'measure-status', 'data-status': 1, style: { display: status == 1 ? '' : 'none' } },
	                    desc,
	                    lowBattry,
	                    outline
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'measure-status', 'data-status': 2, style: { display: status == 2 ? '' : 'none' } },
	                    React.createElement('img', { className: 'init', src: '../static/img/init.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BBE\u5907\u521D\u59CB\u5316\u4E2D...'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'measure-status', 'data-status': 3, style: { display: status == 3 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '请将设备贴近' + (this.partArr[part - 1] || '')
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'measure-status', 'data-status': 4, style: { display: status == 4 ? '' : 'none' } },
	                    React.createElement('div', { className: 'measuring' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '正在测试' + (this.partArr[part - 1] || '')
	                    ),
	                    lowBattry
	                ),
	                React.createElement('div', { className: 'border1', style: { display: status == 5 ? '' : 'none' } }),
	                React.createElement(
	                    'section',
	                    { className: 'measure-result', 'data-status': 5, style: { display: status == 5 ? '' : 'none' } },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            (this.partArr[part - 1] || '') + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: '##', className: 're-test', onTouchTap: this.reTest.bind(this) },
	                            '\u91CD\u65B0\u6D4B\u8BD5'
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.water
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { style: { left: this.state.water + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.oil
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { style: { left: this.state.oil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.elasticity
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { style: { left: this.state.elasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.9'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement('div', { className: 'border' }),
	                    React.createElement(
	                        'section',
	                        { className: 'r-bottom' },
	                        React.createElement('img', { src: this.state.qrUrl }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5728\u5176\u4ED6\u624B\u673A\u4E0A\u67E5\u770B\u6D4B\u8BD5\u7ED3\u679C\uFF0C\u8FD8\u53EF\u4EE5\u83B7\u53D6\u66F4\u8BE6\u7EC6\u7684\u80A4\u8D28\u5206\u6790\u54E6\uFF01'
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return MeasureSkin;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(8);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ProMeasureSkin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	/**
	 * Toast提示
	 * @param    {String}      msg提示信息
	 */

	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	/**
	 * 部位id--name
	 * @param    {String}      部位id
	 */
	function proPart(partId) {
	    var val = '';
	    switch (partId) {
	        case 6:
	            val = '脸部';break;
	        case 2:
	            val = '眼周';break;
	        case 3:
	            val = '手部';break;
	    }
	    return val;
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	// 创建React组件

	var ProMeasureSkin = exports.ProMeasureSkin = function (_BaseComponent) {
	    _inherits(ProMeasureSkin, _BaseComponent);

	    function ProMeasureSkin(props) {
	        _classCallCheck(this, ProMeasureSkin);

	        var _this = _possibleConstructorReturn(this, (ProMeasureSkin.__proto__ || Object.getPrototypeOf(ProMeasureSkin)).call(this, props));

	        _this.state = {
	            part: parseInt(_this.props.params.part) || '',
	            productId: parseInt(_this.props.params.productId) || '',
	            status: 2,
	            btnStatus: false
	        };
	        het.setTitle('护肤品测试');
	        setDocumentTitle('护肤品测试');
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.clearTest(_this.state.part); //初始化测试状态
	        _Actions.Actions.deviceInfo();
	        setTimeout(function () {
	            _Actions.Actions.setPart(this.state.part, 'pro');
	        }.bind(_this), 1000);
	        return _this;
	    }

	    _createClass(ProMeasureSkin, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _Actions.Actions.initTest();
	            clearInterval(window.deviceTimer);
	            clearInterval(window.dataTimer);
	        }
	    }, {
	        key: 'reTest',
	        value: function reTest(e) {
	            //重新测试
	            var status = parseInt(this.state.status);
	            if (status != 5 && !this.state.btnStatus) {
	                e.preventDefault();
	                return;
	            }
	            e.preventDefault();
	            this.setState({
	                status: 2,
	                water: 0,
	                oil: 0,
	                elasticity: 0,
	                qrUrl: '',
	                skinTypeName: '',
	                btnStatus: false
	            });
	            _Actions.Actions.setPart(this.state.part, 'pro');
	        }
	    }, {
	        key: 'useProTest',
	        value: function useProTest(e) {
	            //护肤后测试
	            var status = parseInt(this.state.status);
	            if (status != 5) {
	                e.preventDefault();
	                return;
	            }
	            e.preventDefault();
	            var afterPro = ReactDOM.findDOMNode(this.refs.afterPro);
	            afterPro.click();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('最终数据:', JSON.stringify(this.state));
	            //data-status 1:请选择部位 2:设备初始化 3:请将设备贴近部位 4:正在测试 5:展示测试结果
	            var part = this.state.part;
	            var status = this.state.status;
	            var btnStatus = this.state.btnStatus;
	            var lowBattry = '';
	            var outline = '';
	            if (this.state.onlineStatus == 2) {
	                outline = React.createElement(
	                    'div',
	                    { className: 'outline' },
	                    React.createElement('img', { src: '../static/img/outline.png' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BBE\u5907\u4E0D\u5728\u7EBF'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BF7\u5F00\u542F\u8BBE\u5907\u5E76\u786E\u4FDD\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38'
	                    )
	                );
	            }
	            if (this.state.electricity && this.state.electricity <= 3 && !outline) {
	                lowBattry = React.createElement(
	                    'p',
	                    { className: 'pro-low-battery' },
	                    React.createElement('img', { src: '../static/img/power.png' }),
	                    '\u8BBE\u5907\u7535\u91CF\u4F4E\uFF0C\u8BF7\u53CA\u65F6\u5145\u7535'
	                );
	            }
	            return React.createElement(
	                'div',
	                { className: 'padding50' },
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 0, style: { display: status == 0 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u6D4B\u8BD5\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 1, style: { display: status == 1 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BBE\u5907\u521D\u59CB\u5316\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 2, style: { display: status == 2 ? '' : 'none' } },
	                    React.createElement('img', { className: 'init', src: '../static/img/init.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BBE\u5907\u521D\u59CB\u5316\u4E2D...'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 3, style: { display: status == 3 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '请将设备贴近' + proPart(part)
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 4, style: { display: status == 4 ? '' : 'none' } },
	                    React.createElement('div', { className: 'measuring' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '正在测试' + proPart(part)
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-result', 'data-status': 5, style: { display: status == 5 ? '' : 'none' } },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            proPart(part) + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.water
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { style: { left: this.state.water + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.oil
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { style: { left: this.state.oil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.elasticity
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { style: { left: this.state.elasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.9'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'footer' },
	                    React.createElement(
	                        'a',
	                        { href: '##', onTouchTap: this.reTest.bind(this), className: status == 5 || btnStatus ? '' : 'btn-active' },
	                        '\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: '##', onTouchTap: this.useProTest.bind(this), className: status == 5 ? '' : 'btn-active' },
	                        '\u62A4\u80A4\u540E\u6D4B\u8BD5'
	                    )
	                ),
	                React.createElement(Link, { ref: 'afterPro', to: '/afterprotest/' + part + '/' + this.state.productId + '/' + this.state.lastInsertId + '/' + this.state.water + '/' + this.state.oil + '/' + this.state.elasticity + '?openid=' + getQueryString('openid') || getCookie('openid') }),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return ProMeasureSkin;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AfterProMeasureSkin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	/**
	 * Toast提示
	 * @param    {String}      msg提示信息
	 */

	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	/**
	 * 部位id--name
	 * @param    {String}      部位id
	 */
	function proPart(partId) {
	    var val = '';
	    switch (partId) {
	        case 6:
	            val = '脸部';break;
	        case 2:
	            val = '眼周';break;
	        case 3:
	            val = '手部';break;
	    }
	    return val;
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	// 创建React组件
	// /:part/:productId/:lastPartMeasureId/:beforeWater/:beforeOil/:beforeElasticity

	var AfterProMeasureSkin = exports.AfterProMeasureSkin = function (_BaseComponent) {
	    _inherits(AfterProMeasureSkin, _BaseComponent);

	    function AfterProMeasureSkin(props) {
	        _classCallCheck(this, AfterProMeasureSkin);

	        var _this = _possibleConstructorReturn(this, (AfterProMeasureSkin.__proto__ || Object.getPrototypeOf(AfterProMeasureSkin)).call(this, props));

	        _this.state = {
	            part: parseInt(_this.props.params.part) || '',
	            productId: parseInt(_this.props.params.productId) || '',
	            lastPartMeasureId: parseInt(_this.props.params.lastPartMeasureId) || '',
	            beforeWater: parseFloat(_this.props.params.beforeWater) || 1,
	            beforeOil: parseFloat(_this.props.params.beforeOil) || 1,
	            beforeElasticity: parseFloat(_this.props.params.beforeElasticity) || 1,
	            status: 2,
	            btnStatus: false
	        };
	        het.setTitle('护肤品测试');
	        setDocumentTitle('护肤品测试');
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.clearTest(_this.state.part);
	        _Actions.Actions.deviceInfo();
	        setTimeout(function () {
	            _Actions.Actions.setPart(this.state.part, this.state.productId, 'qrcode', this.state.lastPartMeasureId);
	        }.bind(_this), 1000);
	        return _this;
	    }

	    _createClass(AfterProMeasureSkin, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(window.deviceTimer);
	            clearInterval(window.dataTimer);
	        }
	    }, {
	        key: 'reTest',
	        value: function reTest(e) {
	            var status = parseInt(this.state.status);
	            if (status != 5 && !this.state.btnStatus) {
	                e.preventDefault();
	                return;
	            }
	            e.preventDefault();
	            this.setState({
	                status: 2,
	                water: 0,
	                oil: 0,
	                elasticity: 0,
	                qrUrl: '',
	                skinTypeName: '',
	                btnStatus: false
	            });
	            _Actions.Actions.setPart(this.state.part, this.state.productId, 'qrcode', this.state.lastPartMeasureId);
	        }
	    }, {
	        key: 'analysis',
	        value: function analysis(e) {
	            e.preventDefault();
	            var analysis = ReactDOM.findDOMNode(this.refs.analysis);
	            analysis.click();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('最终数据:', JSON.stringify(this.state));
	            //data-status 1:请选择部位 2:设备初始化 3:请将设备贴近部位 4:正在测试 5:展示测试结果
	            var part = this.state.part;
	            var status = this.state.status;
	            var btnStatus = this.state.btnStatus;
	            var lowBattry = '';
	            var outline = '';
	            if (this.state.onlineStatus == 2) {
	                outline = React.createElement(
	                    'div',
	                    { className: 'outline' },
	                    React.createElement('img', { src: '../static/img/outline.png' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BBE\u5907\u4E0D\u5728\u7EBF'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u8BF7\u5F00\u542F\u8BBE\u5907\u5E76\u786E\u4FDD\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38'
	                    )
	                );
	            }
	            if (this.state.electricity && this.state.electricity <= 3 && !outline) {
	                lowBattry = React.createElement(
	                    'p',
	                    { className: 'pro-low-battery' },
	                    React.createElement('img', { src: '../static/img/power.png' }),
	                    '\u8BBE\u5907\u7535\u91CF\u4F4E\uFF0C\u8BF7\u53CA\u65F6\u5145\u7535'
	                );
	            }
	            return React.createElement(
	                'div',
	                { className: 'padding50' },
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 0, style: { display: status == 0 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u6D4B\u8BD5\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 1, style: { display: status == 1 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BBE\u5907\u521D\u59CB\u5316\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 2, style: { display: status == 2 ? '' : 'none' } },
	                    React.createElement('img', { className: 'init', src: '../static/img/init.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u8BBE\u5907\u521D\u59CB\u5316\u4E2D...'
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 3, style: { display: status == 3 ? '' : 'none' } },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u62A4\u80A4\u5B8C\u6210\u540E'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        '请将设备贴近' + proPart(part)
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-status', 'data-status': 4, style: { display: status == 4 ? '' : 'none' } },
	                    React.createElement('div', { className: 'measuring' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '正在测试' + proPart(part)
	                    ),
	                    lowBattry
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-result', 'data-status': 5, style: { display: status == 5 ? '' : 'none' } },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '护肤后' + proPart(part) + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.water
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { style: { left: this.state.water + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.oil
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { style: { left: this.state.oil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.elasticity
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { style: { left: this.state.elasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.9'
	                                )
	                            )
	                        ),
	                        React.createElement('div', null)
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'footer' },
	                    React.createElement(
	                        'a',
	                        { href: '##', onTouchTap: this.reTest.bind(this), className: status == 5 || btnStatus ? '' : 'btn-active' },
	                        '\u91CD\u65B0\u6D4B\u8BD5'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: '##', onTouchTap: this.analysis.bind(this), className: status == 5 ? '' : 'btn-active' },
	                        '\u67E5\u770B\u5206\u6790\u7ED3\u679C'
	                    )
	                ),
	                React.createElement(Link, { to: '/analysis/' + part + '/' + this.state.beforeWater + '/' + this.state.beforeOil + '/' + this.state.beforeElasticity + '/' + this.state.water + '/' + this.state.oil + '/' + this.state.elasticity + '/' + this.state.skinTypeName + '?openid=' + getQueryString('openid') || getCookie('openid'), ref: 'analysis' }),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return AfterProMeasureSkin;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Analysis = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

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

	/**
	 * 部位id--name
	 * @param    {String}      部位id
	 */

	function proPart(partId) {
	    var val = '';
	    switch (partId) {
	        case 6:
	            val = '脸部';break;
	        case 2:
	            val = '眼周';break;
	        case 3:
	            val = '手部';break;
	    }
	    return val;
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}

	// 创建React组件
	// /:part/:beforeWater/:beforeOil/:beforeElasticity/:afterWater/:afterOil/:afterElasticity

	var Analysis = exports.Analysis = function (_BaseComponent) {
	    _inherits(Analysis, _BaseComponent);

	    function Analysis(props) {
	        _classCallCheck(this, Analysis);

	        var _this = _possibleConstructorReturn(this, (Analysis.__proto__ || Object.getPrototypeOf(Analysis)).call(this, props));

	        _this.state = {
	            part: parseInt(_this.props.params.part) || '',
	            beforeWater: parseFloat(_this.props.params.beforeWater) || '',
	            beforeOil: parseFloat(_this.props.params.beforeOil) || '',
	            beforeElasticity: parseFloat(_this.props.params.beforeElasticity) || '',
	            afterWater: parseFloat(_this.props.params.afterWater) || '',
	            afterOil: parseFloat(_this.props.params.afterOil) || '',
	            afterElasticity: parseFloat(_this.props.params.afterElasticity) || '',
	            skinTypeName: _this.props.params.skinTypeName || '',
	            status: 5
	        };
	        het.setTitle('护肤品测试');
	        setDocumentTitle('护肤品测试');
	        // let oid = 'oTjGfwC7f5RQpBr3fcUzATglMFnY';
	        // Actions.getContrastData(oid,this.state.lastInsertId,this.state.lastPartMeasureId);
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(Analysis, [{
	        key: 'render',
	        value: function render() {
	            console.log('最终数据:', JSON.stringify(this.state));
	            var part = this.state.part;
	            var status = this.state.status;
	            var beforeWater = this.state.beforeWater;
	            var beforeOil = this.state.beforeOil;
	            var beforeElasticity = this.state.beforeElasticity;
	            var afterWater = this.state.afterWater;
	            var afterOil = this.state.afterOil;
	            var afterElasticity = this.state.afterElasticity;
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-result', 'data-status': 5 },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '护肤后' + proPart(part) + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeWater + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterWater + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterWater - beforeWater >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterWater - beforeWater).toFixed(1) + '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeWater + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterWater + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeOil + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterOil + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterOil - beforeOil >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterOil - beforeOil).toFixed(1) + '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeOil + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterOil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeElasticity
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterElasticity
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterElasticity - beforeElasticity >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterElasticity - beforeElasticity).toFixed(1)
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeElasticity * 10 + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterElasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.0'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'area' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u62A4\u80A4\u524D'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u62A4\u80A4\u540E'
	                            )
	                        ),
	                        React.createElement('div', { className: 'border' }),
	                        React.createElement(
	                            'section',
	                            { className: 'r-bottom' },
	                            React.createElement('img', { src: window.qrUrl }),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u626B\u63CF\u4E8C\u7EF4\u7801\uFF0C\u5728\u5176\u4ED6\u624B\u673A\u4E0A\u67E5\u770B\u6D4B\u8BD5\u7ED3\u679C\uFF0C\u8FD8\u53EF\u4EE5\u83B7\u53D6\u66F4\u8BE6\u7EC6\u7684\u80A4\u8D28\u5206\u6790\u54E6\uFF01'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Analysis;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ProResult = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

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

	/**
	 * 部位id--name
	 * @param    {String}      部位id
	 */

	function proPart(partId) {
	    var val = '';
	    switch (partId) {
	        case 6:
	            val = '脸部';break;
	        case 2:
	            val = '眼周';break;
	        case 3:
	            val = '手部';break;
	    }
	    return val;
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件
	// /:part/:beforeWater/:beforeOil/:beforeElasticity/:afterWater/:afterOil/:afterElasticity

	var ProResult = exports.ProResult = function (_BaseComponent) {
	    _inherits(ProResult, _BaseComponent);

	    function ProResult(props) {
	        _classCallCheck(this, ProResult);

	        var _this = _possibleConstructorReturn(this, (ProResult.__proto__ || Object.getPrototypeOf(ProResult)).call(this, props));

	        _this.state = {
	            status: 5
	        };
	        het.setTitle('护肤品测试');
	        setDocumentTitle('护肤品测试');
	        // let oid = 'oTjGfwC7f5RQpBr3fcUzATglMFnY';
	        var oid = _this.GetQueryString('openid');
	        var lastInsertId = parseInt(_this.GetQueryString('lastInsertId'));
	        var lastPartMeasureId = parseInt(_this.GetQueryString('lastPartMeasureId'));
	        _Actions.Actions.getContrastData(oid, lastInsertId, lastPartMeasureId);
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(ProResult, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _Actions.Actions.hideShareMenu();
	        }
	    }, {
	        key: 'GetQueryString',
	        value: function GetQueryString(name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var hash = window.location.hash;
	            var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	            if (r != null) return decodeURI(r[2]);
	            return null;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('最终数据:', JSON.stringify(this.state));
	            var part = this.state.part || 6;
	            var skinTypeName = this.state.skinTypeName || '';
	            var status = this.state.status || '';
	            var beforeWater = this.state.beforeWater || '';
	            var beforeOil = this.state.beforeOil || '';
	            var beforeElasticity = this.state.beforeElasticity || '';
	            var afterWater = this.state.afterWater || '';
	            var afterOil = this.state.afterOil || '';
	            var afterElasticity = this.state.afterElasticity || '';
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'qr-top' },
	                    React.createElement(
	                        'div',
	                        { className: 'qr-wrap' },
	                        React.createElement('img', { src: this.state.imgUrl }),
	                        React.createElement(
	                            'span',
	                            null,
	                            this.state.productName
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'pro-measure-result', 'data-status': 5 },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '护肤后' + proPart(part) + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeWater + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterWater + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterWater - beforeWater >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterWater - beforeWater).toFixed(1) + '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeWater + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterWater + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeOil + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterOil + '%'
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterOil - beforeOil >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterOil - beforeOil).toFixed(1) + '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeOil + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterOil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'contrast' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u524D',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        beforeElasticity
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '\u62A4\u80A4\u540E',
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        afterElasticity
	                                    )
	                                ),
	                                React.createElement(
	                                    'em',
	                                    { className: afterElasticity - beforeElasticity >= 0 ? 'up' : 'down' },
	                                    Math.abs(afterElasticity - beforeElasticity).toFixed(1)
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { className: 'before', style: { left: beforeElasticity * 10 + '%' } }),
	                                React.createElement('b', { className: 'after', style: { left: afterElasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.9'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'area' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u62A4\u80A4\u524D'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u62A4\u80A4\u540E'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return ProResult;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* 
	 判断是否为数组
	 */
	function isArrayFn(value) {
	    if (typeof Array.isArray === "function") {
	        return Array.isArray(value);
	    } else {
	        return Object.prototype.toString.call(value) === "[object Array]";
	    }
	}

	/**
	 * Toast提示
	 * @param    {String}      msg提示信息
	 */
	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function getUrlParam(sName) {
	    var reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return decodeURIComponent(r[2]); // (r[2]);
	    return "";
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件

	var App = exports.App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            brandName: '',
	            brandIdentify: '',
	            changeColor: false
	        };
	        het.setTitle('测肤仪');
	        setDocumentTitle('测肤仪');
	        _this.listenStore(_Store.Store); // 监听Store 
	        if (getCookie('refreshToken')) {
	            var url = '#/brandShow?openid=' + getCookie('openid') || getQueryString('openid');
	            window.location.replace(url);
	        }
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getBrandList();
	        }
	    }, {
	        key: 'selectBrand',
	        value: function selectBrand(e) {
	            var value1 = ReactDOM.findDOMNode(this.refs._access);
	            var value2 = ReactDOM.findDOMNode(this.refs._account);
	            var value3 = ReactDOM.findDOMNode(this.refs._password);
	            value1.blur();
	            value2.blur();
	            value3.blur();
	            this.setState({ showBrand: true });
	        }
	    }, {
	        key: 'cancelSelect',
	        value: function cancelSelect(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.setState({ showBrand: false });
	        }
	    }, {
	        key: 'confirmBrand',
	        value: function confirmBrand(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var name = e.currentTarget.getAttribute('data-name');
	            var id = e.currentTarget.getAttribute('data-id');
	            this.setState({
	                showBrand: false,
	                brandName: name,
	                brandIdentify: id
	            });
	        }
	    }, {
	        key: 'handleFoucs',
	        value: function handleFoucs(e) {
	            var value = e.currentTarget.value;
	            var id = e.currentTarget.getAttribute('data-ipt');
	            var btn = ReactDOM.findDOMNode(this.refs[id]);
	            if (value !== '') {
	                btn.style.display = 'block';
	            }
	        }
	    }, {
	        key: 'hideCloseBtn',
	        value: function hideCloseBtn(e) {
	            var id = e.currentTarget.getAttribute('data-ipt');
	            var btn = ReactDOM.findDOMNode(this.refs[id]);
	            btn.style.display = 'none';
	        }
	    }, {
	        key: 'clearValue',
	        value: function clearValue(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var img = e.currentTarget.getAttribute('data-img');
	            var ipt = ReactDOM.findDOMNode(this.refs[img]);
	            ipt.value = '';
	            e.currentTarget.style.display = 'none';
	            var value1 = ReactDOM.findDOMNode(this.refs._access).value;
	            var value2 = ReactDOM.findDOMNode(this.refs._account).value;
	            var value3 = ReactDOM.findDOMNode(this.refs._password).value;
	            if (value1 !== '' && value2 !== '' && value3 !== '') {
	                this.setState({ changeColor: true });
	            } else {
	                this.setState({ changeColor: false });
	            }
	        }
	    }, {
	        key: 'handleKeyUp',
	        value: function handleKeyUp(e) {
	            var value = e.currentTarget.value;
	            var id = e.currentTarget.getAttribute('data-ipt');
	            var btn = ReactDOM.findDOMNode(this.refs[id]);
	            if (value === '') {
	                btn.style.display = 'none';
	            } else {
	                btn.style.display = 'block';
	            }
	            var value1 = ReactDOM.findDOMNode(this.refs._access).value;
	            var value2 = ReactDOM.findDOMNode(this.refs._account).value;
	            var value3 = ReactDOM.findDOMNode(this.refs._password).value;
	            if (value1 !== '' && value2 !== '' && value3 !== '') {
	                this.setState({ changeColor: true });
	            } else {
	                this.setState({ changeColor: false });
	            }
	        }
	    }, {
	        key: 'confirmLogin',
	        value: function confirmLogin() {
	            if (this.state.changeColor) {
	                var access = ReactDOM.findDOMNode(this.refs._access).value;
	                var account = ReactDOM.findDOMNode(this.refs._account).value;
	                var password = ReactDOM.findDOMNode(this.refs._password).value;
	                var brandId = this.state.brandIdentify;
	                var reg1 = /^[0-9A-Za-z]{6,10}$/;
	                var reg2 = /(^1[0-9]{10}$)|(^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
	                if (this.state.brandName === '') {
	                    showToast('请选择一个品牌');
	                    return;
	                } else if (!reg1.test(access)) {
	                    showToast('授权码为6~10位数字或字母');
	                    return;
	                } else if (!reg2.test(account)) {
	                    showToast('账号为11位手机号或邮箱');
	                    return;
	                }
	                var openid = getUrlParam('openid') || getQueryString('openid');
	                _Actions.Actions.confirmLogin(account, password, access, brandId, openid);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var list = this.state.list;
	            var items = null;
	            if (isArrayFn(list)) {
	                items = list.map(function (item, index) {

	                    return React.createElement(
	                        'li',
	                        { key: index, 'data-id': item.brandIdentify, 'data-name': item.brandName, onTouchTap: _this2.confirmBrand.bind(_this2) },
	                        React.createElement(
	                            'span',
	                            null,
	                            item.brandName
	                        ),
	                        React.createElement('img', { src: '../static/img/gou.png', style: { display: '' + (_this2.state.brandName === item.brandName ? '' : 'none') } })
	                    );
	                });
	            }
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'm-logo flex' },
	                    React.createElement('img', { src: '../static/img/logo.png' })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'm-main flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'main-con' },
	                        React.createElement(
	                            'div',
	                            { className: 'u-ipt flex first' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u54C1\u724C'
	                            ),
	                            React.createElement(
	                                'p',
	                                { onTouchTap: this.selectBrand.bind(this) },
	                                this.state.brandName || '请选择护肤品品牌'
	                            ),
	                            React.createElement('img', { src: '../static/img/right1.png' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'u-ipt flex' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u6388\u6743\u7801'
	                            ),
	                            React.createElement('input', { type: 'text', placeholder: '\u8BF7\u8F93\u5165\u6388\u6743\u7801', 'data-ipt': 'access', ref: '_access', onFocus: this.handleFoucs.bind(this), onBlur: this.hideCloseBtn.bind(this), onKeyUp: this.handleKeyUp.bind(this) }),
	                            React.createElement('img', { src: '../static/img/close.png', style: { display: 'none' }, ref: 'access', 'data-img': '_access', onTouchTap: this.clearValue.bind(this) })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'u-ipt flex' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u8D26\u53F7'
	                            ),
	                            React.createElement('input', { type: 'text', placeholder: '\u8BF7\u8F93\u5165C-Life\u8D26\u53F7', 'data-ipt': 'account', ref: '_account', onFocus: this.handleFoucs.bind(this), onBlur: this.hideCloseBtn.bind(this), onKeyUp: this.handleKeyUp.bind(this) }),
	                            React.createElement('img', { src: '../static/img/close.png', style: { display: 'none' }, ref: 'account', 'data-img': '_account', onTouchTap: this.clearValue.bind(this) })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'u-ipt flex' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u5BC6\u7801'
	                            ),
	                            React.createElement('input', { type: 'password', placeholder: '\u8BF7\u8F93\u5165C-Life\u5BC6\u7801', 'data-ipt': 'password', ref: '_password', onFocus: this.handleFoucs.bind(this), onBlur: this.hideCloseBtn.bind(this), onKeyUp: this.handleKeyUp.bind(this) }),
	                            React.createElement('img', { src: '../static/img/close.png', style: { display: 'none' }, ref: 'password', 'data-img': '_password', onTouchTap: this.clearValue.bind(this) })
	                        ),
	                        React.createElement(
	                            'button',
	                            { style: { color: '' + (this.state.changeColor ? '#fff' : '#ffa6a0') }, onTouchTap: this.confirmLogin.bind(this) },
	                            '\u767B\u5F55'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'brand-select', style: { display: '' + (this.state.showBrand ? '' : 'none') } },
	                    React.createElement('div', { className: 'brand-shade', onTouchStart: this.cancelSelect.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'brand-item', style: { bottom: this.state.showBrand ? 0 : "-24rem" } },
	                        items
	                    )
	                ),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.skinCareTest = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件

	var skinCareTest = exports.skinCareTest = function (_BaseComponent) {
	    _inherits(skinCareTest, _BaseComponent);

	    function skinCareTest(props) {
	        _classCallCheck(this, skinCareTest);

	        var _this2 = _possibleConstructorReturn(this, (skinCareTest.__proto__ || Object.getPrototypeOf(skinCareTest)).call(this, props));

	        _this2.state = {
	            productShow: false,
	            face: false,
	            eye: false,
	            hand: false,
	            proList: [],
	            productId: '',
	            imgShow: '../static/img/careSkin.png'
	        };
	        het.setTitle('护肤品测试');
	        setDocumentTitle('护肤品测试');
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(skinCareTest, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            _Actions.Actions.getproductinfo();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            //处理图片压缩变形
	            // function handlePic($img){
	            //     let width = $img.width();
	            //     let height = $img.height();
	            //     if(width>=height){
	            //         $img.css({'height': '100%'}); 
	            //     }
	            //     if(height>width){
	            //         $img.css({'width': '100%'});
	            //     }
	            // }
	            // $('.scale-pic').each(function(i){

	            //         $('.scale-pic').on('load',function(){
	            //             handlePic($(this));
	            //         })

	            // })
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            // Actions.clearProTest();
	        }
	    }, {
	        key: 'selectTag',
	        value: function selectTag(e) {
	            var part = e.currentTarget.getAttribute('data-part');
	            if (part === 'face') {
	                this.setState({ face: !this.state.face, eye: false, hand: false, part: 6 });
	            } else if (part === 'eye') {
	                this.setState({ eye: !this.state.eye, face: false, hand: false, part: 2 });
	            } else if (part === 'hand') {
	                this.setState({ hand: !this.state.hand, face: false, eye: false, part: 3 });
	            }
	        }
	    }, {
	        key: 'selectProduct',
	        value: function selectProduct(e) {
	            if (this.state.proList.length === 0) {
	                return;
	            }
	            ReactDOM.findDOMNode(this.refs.productName).blur();
	            this.setState({ productShow: true });
	        }
	    }, {
	        key: 'confirmProduct',
	        value: function confirmProduct(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var productId = parseInt(e.currentTarget.getAttribute('data-productId'));
	            var productName = e.currentTarget.getAttribute('data-productName');
	            var img = e.currentTarget.getAttribute('data-img');
	            var ipt = ReactDOM.findDOMNode(this.refs.productName);
	            ipt.value = productName;
	            this.setState({ productShow: false, productId: productId, imgShow: img });
	        }
	    }, {
	        key: 'cancelPop',
	        value: function cancelPop(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.setState({ productShow: false });
	        }
	    }, {
	        key: 'selectImg',
	        value: function selectImg(e) {
	            var _this = this;
	            wx.chooseImage({
	                count: 1, // 默认9
	                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
	                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	                success: function success(res) {
	                    var localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	                    _this.setState({ imgShow: localId });
	                }
	            });
	        }
	    }, {
	        key: 'startTest',
	        value: function startTest(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var img = this.state.imgShow;
	            if (img === '../static/img/careSkin.png') {
	                showToast('请选择护肤品照片');
	                return false;
	            }
	            var productName = ReactDOM.findDOMNode(this.refs.productName).value;
	            if (productName === '') {
	                showToast('请选择护肤品名称');
	                return false;
	            }
	            if (!this.state.eye && !this.state.hand && !this.state.face) {
	                showToast('请选择测试部位');
	                return false;
	            }
	            var productId = this.state.productId;
	            var flag1 = false;
	            var flag2 = false;
	            var proList = this.state.proList;
	            if (productId !== '') {
	                for (var i = 0; i < proList.length; i++) {
	                    if (proList[i].productName === productName && proList[i].productId === productId) {
	                        flag1 = true;
	                    }
	                }
	                if (img.indexOf('http://') !== -1) {
	                    flag2 = true;
	                }
	            }

	            var part = this.state.part;

	            _Actions.Actions.uploadProcuctInfo(productName, img, part, productId, flag1, flag2);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var item = null;
	            var proList = this.state.proList;
	            item = proList.map(function (item, index) {

	                return React.createElement(
	                    'li',
	                    { className: 'flex', key: index, 'data-productId': item.productId, 'data-productName': item.productName, 'data-img': item.imgUrl, onTouchTap: _this3.confirmProduct.bind(_this3) },
	                    React.createElement(
	                        'div',
	                        { className: 'item-logo' },
	                        React.createElement('img', { src: item.imgUrl, className: 'scale-pic' })
	                    ),
	                    React.createElement('img', { src: '../static/img/gou.png', style: _this3.state.productId === item.productId ? { display: '' } : { display: 'none' } }),
	                    React.createElement(
	                        'p',
	                        null,
	                        item.productName
	                    )
	                );
	            });
	            return React.createElement(
	                'div',
	                { className: '_frontCare' },
	                React.createElement(
	                    'div',
	                    { className: 'skinCare-tip flex' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u901A\u8FC7\u6D4B\u8BD5\u62A4\u80A4\u54C1\u4F7F\u7528\u524D\u540E\u76AE\u80A4\u7684\u6C34\u6CB9\u5F39\u542B\u91CF\uFF0C\u79D1\u5B66\u68C0\u6D4B\u62A4\u80A4\u54C1\u7684\u529F\u6548\u3002'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'skinCare-photo flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'photo-con', onTouchTap: this.selectImg.bind(this) },
	                        React.createElement('img', { src: this.state.imgShow, className: 'scale-pic' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'skinCare-info flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'info-con' },
	                        React.createElement(
	                            'div',
	                            { className: 'productName flex' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u4EA7\u54C1\u540D\u79F0'
	                            ),
	                            React.createElement('input', { type: 'text', placeholder: '\u8F93\u5165\u62A4\u80A4\u54C1\u540D\u79F0', ref: 'productName' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'testPart flex' },
	                            React.createElement(
	                                'h2',
	                                null,
	                                '\u6D4B\u8BD5\u90E8\u4F4D'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'parts flex' },
	                                React.createElement(
	                                    'span',
	                                    { onTouchTap: this.selectTag.bind(this), 'data-part': 'face', style: this.state.face ? { background: '#949DA9', color: '#FCFCFC' } : {} },
	                                    '\u8138\u90E8'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { onTouchTap: this.selectTag.bind(this), 'data-part': 'eye', style: this.state.eye ? { background: '#949DA9', color: '#FCFCFC' } : {} },
	                                    '\u773C\u5468'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { onTouchTap: this.selectTag.bind(this), 'data-part': 'hand', style: this.state.hand ? { background: '#949DA9', color: '#FCFCFC' } : {} },
	                                    '\u624B\u90E8'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'skinProduct', onTouchTap: this.selectProduct.bind(this), style: this.state.proList.length > 0 ? { color: '#0F80FD' } : { color: '#e5e5e5' } },
	                            '\u9009\u62E9\u6D4B\u8BD5\u8FC7\u7684\u62A4\u80A4\u54C1>'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'button',
	                    { onTouchTap: this.startTest.bind(this) },
	                    '\u62A4\u80A4\u524D\u6D4B\u8BD5'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'skinProductSelect', style: { display: '' + (this.state.productShow ? '' : 'none') } },
	                    React.createElement('div', { className: 'product-shade', onTouchStart: this.cancelPop.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'product-item', style: { bottom: this.state.productShow ? 0 : "-29rem" } },
	                        item
	                    )
	                ),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return skinCareTest;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.brandShow = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* 
	 判断是否为数组
	 */
	function isArrayFn(value) {
	    if (typeof Array.isArray === "function") {
	        return Array.isArray(value);
	    } else {
	        return Object.prototype.toString.call(value) === "[object Array]";
	    }
	}

	function showToast(msg) {
	    clearTimeout(st);
	    var toast = document.getElementById('toast');
	    toast.style.display = 'block';
	    toast.innerHTML = msg;
	    var st = setTimeout(function () {
	        toast.style.display = 'none';
	    }, 3000);
	}

	function getCookie(c_name) {
	    if (document.cookie.length > 0) {
	        var c_start = document.cookie.indexOf(c_name + "=");
	        if (c_start != -1) {
	            c_start = c_start + c_name.length + 1;
	            var c_end = document.cookie.indexOf(";", c_start);
	            if (c_end == -1) c_end = document.cookie.length;
	            return unescape(document.cookie.substring(c_start, c_end));
	        }
	    }
	    return "";
	}

	function setCookie(c_name, value, expireSeconds, path) {
	    var exdate = new Date();
	    exdate.setTime(exdate.getTime() + expireSeconds * 1000);
	    document.cookie = c_name + "=" + escape(value) + (expireSeconds == null ? "" : ";expires=" + exdate.toGMTString()) + ";" + (path == null ? "" : "path=" + escape(path));
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件

	var brandShow = exports.brandShow = function (_BaseComponent) {
	    _inherits(brandShow, _BaseComponent);

	    function brandShow(props) {
	        _classCallCheck(this, brandShow);

	        var _this2 = _possibleConstructorReturn(this, (brandShow.__proto__ || Object.getPrototypeOf(brandShow)).call(this, props));

	        _this2.state = {
	            showPop: false,
	            showPop2: false,
	            deviceList: null
	        };
	        het.setTitle('测肤仪');
	        setDocumentTitle('测肤仪');
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(brandShow, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var oid = getCookie('openid');
	            _Actions.Actions.getSkinDevice();
	            _Actions.Actions.getBrandLogo(oid);
	        }
	    }, {
	        key: 'handleTap',
	        value: function handleTap(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var type = e.currentTarget.getAttribute('data-type');
	            if (type === 'singleTest') {
	                if (this.state.deviceList === null) return false;
	                if (isArrayFn(this.state.deviceList) && this.state.deviceList.length === 0) {
	                    showToast('暂无设备！');
	                    return false;
	                }
	                if (isArrayFn(this.state.deviceList) && this.state.deviceList.length > 1) {
	                    this.setState({ showPop: true });
	                    return false;
	                }
	                window.location.href = '#/measureSkin?openid=' + getQueryString('openid') || getCookie('openid');
	            } else if (type === 'careTest') {
	                if (this.state.deviceList === null) return false;
	                if (isArrayFn(this.state.deviceList) && this.state.deviceList.length === 0) {
	                    showToast('暂无设备！');
	                    return false;
	                }
	                if (isArrayFn(this.state.deviceList) && this.state.deviceList.length > 1) {
	                    this.setState({ showPop2: true });
	                    return false;
	                }
	                window.location.href = '#/skinCareTest?openid=' + getQueryString('openid') || getCookie('openid');
	            } else if (type === 'deviceList') {
	                window.location.hash = '/deviceList?openid=' + getQueryString('openid') || getCookie('openid');
	            }
	        }
	    }, {
	        key: 'cancelSelect',
	        value: function cancelSelect(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.setState({ showPop: false });
	        }
	    }, {
	        key: 'cancelSelect2',
	        value: function cancelSelect2(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.setState({ showPop2: false });
	        }
	    }, {
	        key: 'toDevice',
	        value: function toDevice(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var id = e.currentTarget.getAttribute('data-id');
	            setCookie('deviceId', id);
	            this.setState({ showPop: false });
	            window.location.href = '#/measureSkin?openid=' + getQueryString('openid') || getCookie('openid');
	        }
	    }, {
	        key: 'toDevice2',
	        value: function toDevice2(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var id = e.currentTarget.getAttribute('data-id');
	            setCookie('deviceId', id);
	            this.setState({ showPop2: false });
	            window.location.href = '#/skinCareTest?openid=' + getQueryString('openid') || getCookie('openid');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var list = this.state.deviceList;
	            var item = null;
	            var item2 = null;
	            var _this = this;
	            if (isArrayFn(list)) {
	                item = list.map(function (item, index) {
	                    var colorStyle = {};
	                    if (item.onlineStatus === 2) colorStyle = { color: '#F78D85' };
	                    return React.createElement(
	                        'div',
	                        { className: 'deviceItem flex', key: index, 'data-id': item.deviceId, onTouchTap: _this.toDevice.bind(_this3) },
	                        React.createElement(
	                            'div',
	                            { className: 'device-logo flex' },
	                            React.createElement('img', { src: item.deviceIcon })
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-title flex' },
	                            item.deviceName
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-status flex', style: colorStyle },
	                            item.onlineStatus - 1 ? '离线' : '在线'
	                        ),
	                        React.createElement('img', { src: '../static/img/right1.png' })
	                    );
	                });
	            }
	            if (isArrayFn(list)) {
	                item2 = list.map(function (item, index) {
	                    var colorStyle = {};
	                    if (item.onlineStatus === 2) colorStyle = { color: '#F78D85' };
	                    return React.createElement(
	                        'div',
	                        { className: 'deviceItem flex', key: index, 'data-id': item.deviceId, onTouchTap: _this.toDevice2.bind(_this3) },
	                        React.createElement(
	                            'div',
	                            { className: 'device-logo flex' },
	                            React.createElement('img', { src: item.deviceIcon })
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-title flex' },
	                            item.deviceName
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-status flex', style: colorStyle },
	                            item.onlineStatus - 1 ? '离线' : '在线'
	                        ),
	                        React.createElement('img', { src: '../static/img/right1.png' })
	                    );
	                });
	            }
	            return React.createElement(
	                'div',
	                { className: 'm-brandShow' },
	                React.createElement(
	                    'div',
	                    { className: 'brand-logo flex' },
	                    React.createElement('img', { src: this.state.logoSrc || '' })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'brand-btn' },
	                    React.createElement(
	                        'div',
	                        { className: 'single-test flex img-con' },
	                        React.createElement('div', { className: 'tapShade', 'data-type': 'singleTest', onTouchTap: this.handleTap.bind(this) })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'care-test flex img-con' },
	                        React.createElement('div', { className: 'tapShade', 'data-type': 'careTest', onTouchTap: this.handleTap.bind(this) })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'device-list flex img-con' },
	                        React.createElement('div', { className: 'tapShade', 'data-type': 'deviceList', onTouchTap: this.handleTap.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'brand-device', style: { display: '' + (this.state.showPop ? '' : 'none') } },
	                    React.createElement('div', { className: 'device-shade', onTouchStart: this.cancelSelect.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'device-items', style: { bottom: this.state.showPop ? 0 : "-31rem" } },
	                        item
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'brand-device', style: { display: '' + (this.state.showPop2 ? '' : 'none') } },
	                    React.createElement('div', { className: 'device-shade', onTouchStart: this.cancelSelect2.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'device-items', style: { bottom: this.state.showPop2 ? 0 : "-31rem" } },
	                        item2
	                    )
	                ),
	                React.createElement('div', { className: 'm-toast', id: 'toast', style: { display: 'none' } })
	            );
	        }
	    }]);

	    return brandShow;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.deviceList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* 
	 判断是否为数组
	 */
	function isArrayFn(value) {
	    if (typeof Array.isArray === "function") {
	        return Array.isArray(value);
	    } else {
	        return Object.prototype.toString.call(value) === "[object Array]";
	    }
	}

	function setCookie(c_name, value, expireSeconds, path) {
	    var exdate = new Date();
	    exdate.setTime(exdate.getTime() + expireSeconds);
	    document.cookie = c_name + "=" + escape(value) + (expireSeconds == null ? "" : ";expires=" + exdate.toGMTString()) + ";" + (path == null ? "" : "path=" + escape(path));
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}

	// 创建React组件

	var deviceList = exports.deviceList = function (_BaseComponent) {
	    _inherits(deviceList, _BaseComponent);

	    function deviceList(props) {
	        _classCallCheck(this, deviceList);

	        var _this = _possibleConstructorReturn(this, (deviceList.__proto__ || Object.getPrototypeOf(deviceList)).call(this, props));

	        _this.state = {};
	        het.setTitle('设备');
	        setDocumentTitle('设备');
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(deviceList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getDeviceList();
	        }
	    }, {
	        key: 'handleTap',
	        value: function handleTap(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var deviceId = e.currentTarget.getAttribute('data-deviceId');
	            setCookie('deviceId', deviceId);
	            window.location.href = '#/measureSkin';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var list = this.state.deviceList;
	            var item = null;
	            if (isArrayFn(list)) {
	                item = list.map(function (item, index) {
	                    var colorStyle = {};
	                    if (item.onlineStatus === 2) colorStyle = { color: '#F78D85' };
	                    return React.createElement(
	                        'div',
	                        { className: 'deviceItem flex', key: index, onTouchTap: _this2.handleTap.bind(_this2), 'data-deviceId': item.deviceId },
	                        React.createElement(
	                            'div',
	                            { className: 'device-logo flex' },
	                            React.createElement('img', { src: item.deviceIcon })
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-title flex' },
	                            item.deviceName
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'device-status flex', style: colorStyle },
	                            item.onlineStatus - 1 ? '离线' : '在线'
	                        ),
	                        React.createElement('img', { src: '../static/img/right1.png' })
	                    );
	                });
	            }
	            return React.createElement(
	                'div',
	                { className: 'm-deviceList' },
	                item,
	                React.createElement(
	                    'div',
	                    { className: 'downloadApp flex' },
	                    React.createElement('div', { className: 'erweima' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4E0B\u8F7D',
	                        React.createElement(
	                            'strong',
	                            null,
	                            'C-Life\u7F8E\u5BB9'
	                        ),
	                        '\u7ED1\u5B9A\u8BBE\u5907'
	                    )
	                )
	            );
	        }
	    }]);

	    return deviceList;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.userView = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* 
	 判断是否为数组
	 */
	function isArrayFn(value) {
	    if (typeof Array.isArray === "function") {
	        return Array.isArray(value);
	    } else {
	        return Object.prototype.toString.call(value) === "[object Array]";
	    }
	}

	function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var hash = window.location.hash;
	    var r = hash.substr(hash.indexOf('?') + 1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return '';
	}

	function changePart(part) {
	    //1:额头 2:左脸 3:右脸 4:鼻子 5:眼周 6:手部
	    //11:额头 13:左脸 15:右脸 12:鼻子 2:眼周 3:手部
	    var val = 0;
	    switch (part) {
	        case 11:
	            val = 1;break;
	        case 13:
	            val = 2;break;
	        case 15:
	            val = 3;break;
	        case 12:
	            val = 4;break;
	        case 2:
	            val = 5;break;
	        case 3:
	            val = 6;break;
	    }
	    return val;
	}

	function setDocumentTitle(title) {
	    document.title = title;
	    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
	        var i = document.createElement('iframe');
	        i.src = '/favicon.ico';
	        i.style.display = 'none';
	        i.onload = function () {
	            setTimeout(function () {
	                i.remove();
	            }, 9);
	        };
	        document.body.appendChild(i);
	    }
	}
	// 创建React组件

	var userView = exports.userView = function (_BaseComponent) {
	    _inherits(userView, _BaseComponent);

	    function userView(props) {
	        _classCallCheck(this, userView);

	        var _this2 = _possibleConstructorReturn(this, (userView.__proto__ || Object.getPrototypeOf(userView)).call(this, props));

	        _this2.state = {
	            showSex: false,
	            sex: '女',
	            part: 0,
	            skinTypeName: '',
	            skinAreaRank: '',
	            proId: 6,
	            cityId: 77,
	            date: '1990/1/1'
	        };
	        het.setTitle('水油弹性测试');
	        setDocumentTitle('水油弹性测试');
	        _this2.partArr = ['额头', '左脸', '右脸', '鼻子', '眼周', '手部'];
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(userView, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            _Actions.Actions.hideShareMenu();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            new DateSelector({
	                input: 'date-picker',
	                container: 'date-con',
	                type: 0,
	                param: [1, 1, 1],
	                beginTime: [1950, 1, 1],
	                endTime: [2017, 2, 28],
	                recentTime: [1990, 1, 1],
	                success: function success(arr) {
	                    var date = arr[0] + '/' + arr[1] + '/' + arr[2];
	                    _this.setState({ date: date });
	                }
	            });
	            var area = ReactDOM.findDOMNode(_this.refs['area']);
	            _Actions.Actions.getPosition(area);
	            var oid = getQueryString('openid');
	            var lastInsertId = getQueryString('lastInsertId');
	            _Actions.Actions.getSingleResult(oid, lastInsertId);
	        }
	    }, {
	        key: 'handleTap',
	        value: function handleTap(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'confirmSex',
	        value: function confirmSex(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var name = e.currentTarget.getAttribute('data-name');
	            this.setState({
	                showSex: false,
	                sex: name
	            });
	        }
	    }, {
	        key: 'cancelSelect',
	        value: function cancelSelect(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            this.setState({ showSex: false });
	        }
	    }, {
	        key: 'selectSex',
	        value: function selectSex(e) {
	            this.setState({ showSex: true });
	        }
	    }, {
	        key: 'getResult',
	        value: function getResult(e) {
	            var sex = this.state.sex === '女' ? 2 : 1;
	            var oid = getQueryString('openid');
	            var birthday = this.state.date.replace(/\//g, '-');
	            var province = this.state.proId;
	            var city = this.state.cityId;
	            _Actions.Actions.saveUseInfo(oid, birthday, sex, province, city);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var list = ['男', '女'];
	            var items = null;
	            items = list.map(function (item, index) {

	                return React.createElement(
	                    'li',
	                    { key: index, 'data-name': item, onTouchTap: _this3.confirmSex.bind(_this3) },
	                    React.createElement(
	                        'span',
	                        null,
	                        item
	                    ),
	                    React.createElement('img', { src: '../static/img/gou.png', style: { display: '' + (_this3.state.sex === item ? '' : 'none') } })
	                );
	            });
	            var part = this.state.part || 0;
	            return React.createElement(
	                'div',
	                { className: 'm-userView' },
	                React.createElement(
	                    'section',
	                    { className: 'measure-result' },
	                    React.createElement(
	                        'section',
	                        { className: 'r-top' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            (this.partArr[changePart(part) - 1] || '') + '的肤质为'
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            this.state.skinTypeName
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'r-middle' },
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item water-item' },
	                                '\u6C34\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.water
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u7F3A\u6C34'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w20 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w40 tac' },
	                                    '\u6E7F\u6DA6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful water-color' },
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('i', { className: 'w20' }),
	                                React.createElement('i', { className: 'w40' }),
	                                React.createElement('b', { style: { left: this.state.water + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '1.4rem' } },
	                                    '40%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.8rem' } },
	                                    '60%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item oil-item' },
	                                '\u6CB9\u4EFD',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.oil
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '%'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w15 tac' },
	                                    '\u7F3A\u6CB9'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w10 tac' },
	                                    '\u6B63\u5E38'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w75 tac' },
	                                    '\u504F\u6CB9'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful oil-color' },
	                                React.createElement('i', { className: 'w15' }),
	                                React.createElement('i', { className: 'w10' }),
	                                React.createElement('i', { className: 'w75' }),
	                                React.createElement('b', { style: { left: this.state.oil + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal', style: { textIndent: '-0.8rem' } },
	                                    '15%'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-4.9rem' } },
	                                    '25%'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement('span', { className: 'flex-cell tal' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '99.9%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'woe-data' },
	                            React.createElement(
	                                'h5',
	                                { className: 'item tx-item' },
	                                '\u5F39\u6027',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    this.state.elasticity
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'w37 tac' },
	                                    '\u6613\u76B1\u7EB9'
	                                ),
	                                React.createElement('span', { className: 'w00 tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'w63 tac', style: { textIndent: '-1rem' } },
	                                    '\u7D27\u81F4'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex colorful tx-color' },
	                                React.createElement('i', { className: 'w37' }),
	                                React.createElement('i', { className: 'w00' }),
	                                React.createElement('i', { className: 'w63' }),
	                                React.createElement('b', { style: { left: this.state.elasticity * 10 + '%' } })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex desc' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tal' },
	                                    '00'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tac', style: { textIndent: '-0.1rem' } },
	                                    '3.7'
	                                ),
	                                React.createElement('span', { className: 'flex-cell tac' }),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell tar' },
	                                    '9.9'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'changeInfo', style: _typeof(this.state.userInfoStatus) !== undefined && this.state.userInfoStatus === 0 ? {} : { display: 'none' } },
	                    React.createElement('div', { className: 'color-block', style: this.state.userInfoStatus ? { display: 'none' } : { display: '' } }),
	                    React.createElement(
	                        'div',
	                        { className: 'user-info flex', style: this.state.userInfoStatus ? { display: 'none' } : { display: '' } },
	                        React.createElement(
	                            'div',
	                            { className: 'info-con' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u8F93\u5165\u4E2A\u4EBA\u6570\u636E\uFF0C\u5C31\u53EF\u4EE5\u751F\u6210\u60A8\u7684\u80A4\u8D28\u5206\u6790\u4E86\uFF01'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'user-select flex' },
	                                React.createElement(
	                                    'h2',
	                                    null,
	                                    '\u6027\u522B'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { onTouchTap: this.selectSex.bind(this), ref: 'sex' },
	                                    this.state.sex
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'user-select flex' },
	                                React.createElement(
	                                    'h2',
	                                    null,
	                                    '\u751F\u65E5'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'date-picker', id: 'date-picker', ref: 'date' },
	                                    this.state.date
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'user-select flex' },
	                                React.createElement(
	                                    'h2',
	                                    null,
	                                    '\u5730\u533A'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'area-picker', id: 'area-picker', ref: 'area' },
	                                    '\u5E7F\u4E1C\u6DF1\u5733'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'skinRank', style: this.state.userInfoStatus ? {} : { display: 'none' } },
	                    '结果表明,您当前眼周肤质优于' + this.state.skinAreaRank + '％同龄用户！'
	                ),
	                React.createElement('div', { className: 'color-block', style: this.state.userInfoStatus ? {} : { display: 'none' } }),
	                React.createElement(
	                    'div',
	                    { className: 'result-info', style: this.state.userInfoStatus ? {} : { display: 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'result-item' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            '\u80A4\u8D28\u5206\u6790'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.skinProblem
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'result-item' },
	                        React.createElement(
	                            'h2',
	                            { className: 'introduce' },
	                            '\u62A4\u80A4\u6307\u5357'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.skinGuide
	                        )
	                    )
	                ),
	                React.createElement(
	                    'button',
	                    { className: 'get-btn', onTouchTap: this.getResult.bind(this), style: _typeof(this.state.userInfoStatus) !== undefined && this.state.userInfoStatus === 0 ? {} : { display: 'none' } },
	                    '\u751F\u6210\u6D4B\u8BD5\u5206\u6790'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'sex-select', style: { display: '' + (this.state.showSex ? '' : 'none') } },
	                    React.createElement('div', { className: 'sex-shade', onTouchTap: this.cancelSelect.bind(this) }),
	                    React.createElement(
	                        'div',
	                        { className: 'sex-item', style: { bottom: this.state.showSex ? 0 : "-24rem" } },
	                        items
	                    )
	                ),
	                React.createElement('div', { className: 'date-con', id: 'date-con' }),
	                React.createElement('div', { className: 'area-con', id: 'area-con' })
	            );
	        }
	    }]);

	    return userView;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);