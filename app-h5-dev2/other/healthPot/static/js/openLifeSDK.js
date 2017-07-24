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

	module.exports = __webpack_require__(16);


/***/ },

/***/ 7:
/***/ function(module, exports) {

	'use strict';
	/**
	 * toast组件
	 * @prop {string} msg  消息
	 * @prop {number} sec  存在秒数
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Toast = exports.Toast = React.createClass({
		displayName: 'Toast',
		componentDidMount: function componentDidMount() {
			var sec = this.props.sec || 5;
			var dom = document.querySelector('#box-toast');
			dom.style.display = 'flex';
			setTimeout(function () {
				dom.style.display = 'none';
			}, sec * 1000);
		},
		render: function render() {
			var msg = this.props.msg || '指令下发成功';
			var sec = this.props.sec || 5;
			var css = { bottom: 100 };
			css.animation = "toastN " + sec + "s";
			// 兼容旧版
			css["WebkitAnimation"] = css.animation;
			css["MozAnimation"] = css.animation;
			css["OAnimation"] = css.animation;
			return React.createElement(
				'section',
				{ id: 'box-toast', style: css, className: 'box-toast flex-column' },
				React.createElement(
					'section',
					{ className: 'toast-main' },
					msg
				)
			);
		}
	});

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * openLifeSDK v1.0
	                                                                                                                                                                                                                                                                               * Copyright: Shenzhen H&T Intelligent Control Co., Ltd.
	                                                                                                                                                                                                                                                                               * Date: 2016-12-16
	                                                                                                                                                                                                                                                                               */


	var _Toast = __webpack_require__(7);

	window.het = function () {
	    'use strict';

	    function HET() {
	        // 默认配置
	        var settings = {
	            debugMode: '', // 开启debug，缺省不开启，目前可选模式为print
	            appId: '', //接口所需appId参数
	            appSecret: '' };
	        var $this = this;

	        /**
	         * 登记网页加载完成时调用的函数
	         * @param {Function} callback 欲登记的回调函数
	         */
	        $this.domReady = function (callback) {
	            document.addEventListener('DOMContentLoaded', callback);
	        };

	        /**
	         * 获取accessToken的方法
	         * @param  {function} sucCallback 必须，成功时的回调函数
	         * @param  {function} errCallback 必须，失败时的回调函数
	         * @return {string} accessToken 返回获取到的accessToken
	         */
	        $this.getToken = function (sucCallback, errCallback) {
	            var callback = function callback(data) {
	                return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data.accessToken : data;
	            };
	            var sucFun = function sucFun(data) {
	                var token = data.accessToken;
	                return typeof sucCallback === 'function' ? sucCallback(token) : null;
	            };
	            return getToken(sucFun || callback, errCallback || callback);
	        };

	        /**
	         * 获取deviceId的方法
	         * @return {string} deviceId 返回获取到的deviceId
	         */
	        $this.getDeviceId = function () {
	            return getCurrentDeviceSn();
	        };

	        /**
	         * 自动隐藏浮层方法
	         * @param  {string} msg 展示的消息
	         * @param  {number} sec 展示消息时长
	         */
	        $this.toast = function (msg, sec) {
	            var dom = document.getElementById('mytoast');
	            if (!dom) return;
	            dom.innerHTML = "";
	            if (typeof ReactDOM === 'undefined') {
	                var ReactDOM = React;
	            }
	            ReactDOM.render(React.createElement(_Toast.Toast, { sec: sec || "5", msg: msg }), document.getElementById('mytoast'));
	        };

	        /**
	         * 初始化配置
	         * @param  {json}     options 配置信息
	         */
	        $this.config = function (options) {
	            var data = {};
	            for (var k in options) {
	                if (typeof settings[k] !== 'undefined') {
	                    settings[k] = options[k]; // 检出本地配置信息
	                }
	            }
	        };

	        /**
	         * 请求app代理get方式的http请求
	         * @param    {string}   url         请求地址
	         * @param    {json}     data        可选，发送的数据，要求json格式
	         * @param    {function} sucCallback 可选，成功时的回调函数
	         * @param    {function} errCallback 可选，失败时的回调函数
	         * @param    {integer}  needArg    可选，接口是否需要SDK拼接参数
	         */
	        $this.get = function (url, data, sucCallback, errCallback, needArg) {
	            proxyHttp(url, data, 'GET', sucCallback, errCallback, needArg);
	        };

	        /**
	         * 请求app代理post方式的http请求
	         * 参数说明同$this.get
	         */
	        $this.post = function (url, data, sucCallback, errCallback, needArg) {
	            proxyHttp(url, data, 'POST', sucCallback, errCallback, needArg);
	        };

	        /**
	         * 设置页面标题
	         * @param {string} title 标题
	         */
	        $this.setTitle = function (title) {
	            document.title = title;
	            if (!window.AppJsBridge) return;
	            window.AppJsBridge.service.applicationService.setTitleBar(title);
	        };

	        /**
	         * 计算updateFlag值
	         * @param  {Integer} offset 偏移量（二进制位）
	         * @return {Integer}        返回十进制计算结果
	         */
	        $this.calcUpdateFlag = function (offset) {
	            return Math.pow(2, offset - 1);
	        };

	        /**
	         * 计算16进制updateFlag值
	         * @param    {integer}   index        功能位索引值
	         * @param    {integer}   length       功能字节长度
	         * @param    {integer}   upLength     upFlag字节长度
	         * @param    {string}    originUpFlag 可选，原始updateFlag值
	         * @return   {string}                 16进制字符串
	         */
	        $this.hexUpFlag = function (index, length, upLength, originUpFlag) {
	            var upHex = (originUpFlag || 0).toString(16).replace(/(?=\b\w\b)/, '0'); // 确保upFlag为16进制
	            var upArr = []; // 原始upFlag的decArray表达
	            var orBin = ''; // 用于或运算的二进制字符串
	            var orArr; // orBin的decArray表达
	            var reArr = []; // 计算结果的decArray表达
	            length = length || 1;
	            upLength = upLength || 4;
	            // 计算原始upFlag的decArray表达
	            for (var h = 0; h < upHex.length; h += 2) {
	                upArr.push(parseInt(upHex.substring(h, h + 2), 16));
	            }
	            // 移位
	            for (var i = 0; i < index; i++) {
	                orBin = '0' + orBin;
	            }
	            // 填1
	            for (var j = 0; j < length; j++) {
	                orBin = '1' + orBin;
	            }
	            orArr = bin2DecArray(orBin);
	            // 开始计算
	            for (var k = 0; k < upArr.length || k < orArr.length || k < upLength; k++) {
	                reArr.push((upArr[k] || 0) | (orArr[k] || 0));
	            }
	            return decArray2Hex(reArr);
	        };

	        /**
	         * 调用华为SDK方法获取deviceID
	         * @return {string}   返回获取的deviceID
	         */
	        function getCurrentDeviceSn() {
	            if (!window.AppJsBridge) return "";
	            return window.AppJsBridge.service.deviceService.getCurrentDeviceSn();
	        }

	        /**
	         * 调用华为SDK方法获取accessToken
	         * @param  {function} sucCallback 获取成功的回调函数
	         * @param  {function} errCallback 获取失败的回调函数
	         * @return {Function} 调用回调函数返回结果
	         */
	        function getToken(sucCallback, errCallback) {
	            if (!window.AppJsBridge) return typeof errCallback === 'function' && errCallback('未检测到华为SDK');
	            window.AppJsBridge.service.deviceService.doAction({
	                "sn": getCurrentDeviceSn(),
	                "deviceClass": "generalSwitch",
	                "action": 'getAccessToken',
	                "success": function success(data) {
	                    if (data != null && data.Status != null) {
	                        if (data.Status == "0") {
	                            var result = data.result;
	                            return typeof sucCallback === 'function' && sucCallback(result);
	                        } else {
	                            return typeof errCallback === 'function' && errCallback('获取token失败,driver返回' + data.Status);
	                        }
	                    } else {
	                        return typeof errCallback === 'function' && errCallback('获取token失败,driver未响应');
	                    }
	                },
	                "error": function error(data) {
	                    return typeof errCallback === 'function' && errCallback('获取token失败,APP代理token请求失败');
	                }
	            });
	        }

	        /**
	         * app代理发起http请求
	         * @param    {string}   url         请求地址
	         * @param    {json}     data        发送的数据，要求json格式
	         * @param    {string}   type        请求类型，GET / POST
	         * @param    {function} sucCallback 成功时的回调函数
	         * @param    {function} errCallback 失败时的回调函数
	         * @param    {integer}  needArg    接口是否需要参数拼接，0-需要，1-不需要
	         */
	        function proxyHttp(url, data, type, sucCallback, errCallback, needArg) {
	            var isRelativePath = url.indexOf('/') === 0 ? true : false; // 仅当“/”开头时，做为相对地址发起请求
	            if (needArg == 1) {
	                ajax(url, data, type, sucCallback, errCallback); // 无app代理，调用ajax执行请求
	                return;
	            }
	            if (type === 'GET') {
	                // GET方式
	                var callback = function callback(data) {
	                    var statusUrl = url;
	                    var appId = settings.appId;
	                    var timestamp = +new Date();
	                    var accessToken = data.accessToken;
	                    var deviceId = getCurrentDeviceSn();
	                    if (!deviceId) return;
	                    statusUrl = statusUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	                    ajax(statusUrl, '', type, sucCallback, errCallback); // 无app代理，调用ajax执行请求
	                };
	                getToken(callback, errCallback);
	            } else {
	                var callback = function callback(tokendata) {
	                    var accessToken = tokendata.accessToken;
	                    var appId = settings.appId;
	                    var appSecret = settings.appSecret;
	                    var timestamp = +new Date();
	                    var deviceId = getCurrentDeviceSn();
	                    var source = 2;
	                    var json = JSON.stringify(data);
	                    var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	                    var obj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	                    ajax(url, obj, type, sucCallback, errCallback); // 无app代理，调用ajax执行请求
	                };
	                getToken(callback, errCallback);
	            }
	        }

	        /**
	         * ajax请求函数
	         * @param    {string}   url         请求地址
	         * @param    {string}   data        发送的数据，格式为：name=张三&age=21
	         * @param    {string}   type        请求类型，GET / POST
	         * @param    {function} sucCallbackId 成功时的回调函数id
	         * @param    {function} errCallbackId 失败时的回调函数id
	         */
	        function ajax(url, data, type, sucCallback, errCallback) {
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
	        }

	        /**
	         * 二进制字符串转为10进制数组
	         * @param    {string}   binString 二进制字符串
	         * @return   {array}              以字节为单位的10进制数组
	         */
	        function bin2DecArray(binString) {
	            var arr = [],
	                matt = /^(\d*)(\d{8})$|^\d{1,7}$/,
	                str = binString.replace(/[^01]/g, '');
	            while (str.length) {
	                str = str.replace(matt, pd);
	            }

	            function pd(a, b, c) {
	                var dec = parseInt(typeof c === 'undefined' ? a : c, 2);
	                arr.push(dec);
	                return typeof b !== 'undefined' ? b : '';
	            }
	            return arr;
	        }

	        /**
	         * 10进制数组转为16进制字符串
	         * @param    {array}   decArr 以字节为单位的10进制数组
	         * @return   {string}         16进制字符串
	         */
	        function decArray2Hex(decArr) {
	            var hex = '';
	            for (var i = 0; i < decArr.length; i++) {
	                hex += decArr[i].toString(16).replace(/(?=\b\w\b)/, '0');
	            }
	            return hex;
	        }

	        /**
	         * 判断对象是否为空
	         * @param    {object}   obj 对象或数组
	         * @return   {Boolean}      为空返回true
	         */
	        function isEmpty(obj) {
	            var n = 0;
	            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	                return false;
	            }
	            for (var i in obj) {
	                n++;
	            }
	            return !n;
	        }

	        /**
	         * 打印日志，调用console.log方法
	         */
	        function print() {
	            var d = new Date(),
	                t = (d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds()).replace(/(?=\b\d\b)|(?=\b\d\d$)/g, '0'),
	                args = [].slice.call(arguments);
	            if (!/%c/.test(args[0])) {
	                [].splice.call(args, 0, 0, '[' + t + ']');
	            }
	            if (typeof console !== 'undefined') {
	                console.log.apply(console, args);
	            }
	        }
	    }
	    return new HET();
	}();

/***/ }

/******/ });
