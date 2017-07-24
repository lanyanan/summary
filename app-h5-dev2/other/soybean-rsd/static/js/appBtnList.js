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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	/*het.domReady(()=>{
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData:true,// 控制数据是否用于页面渲染
	        updateFlagMap: {
	        }
	    });
	}); */

	/*// 接收app推送数据
	het.repaint((data)=>{
	    // appData = Funs._extends({}, appData, data);
	    Actions.repaint(data); 
	});*/

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store

	        _this.handleShakeSwitch = _this.handleShakeSwitch.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleShakeSwitch',
	        value: function handleShakeSwitch(e) {

	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            var type = e.currentTarget.getAttribute('data-type');
	            var WorkCompSta = parseInt(this.state.WorkCompSta);
	            var CurWorkMode = parseInt(this.state.CurWorkMode);
	            this.setState({ CurWorkMode: parseInt(type) });
	            console.log('type,WorkCompSta', type, WorkCompSta);
	            _Actions.Actions.handleShakeSwitch(type, WorkCompSta);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log('state', this.state);
	            var WorkCompSta = parseInt(this.state.WorkCompSta || 0);
	            var workText = ['待机中', '工作中', '已完成'][WorkCompSta];
	            var CurWorkMode = parseInt(this.state.CurWorkMode || 0);
	            var workMode = [' ', '五谷豆浆', '干/湿豆', '米糊', '绿豆沙', '婴儿辅食', '云菜谱', '果汁搅拌', '轻松洗'][CurWorkMode];

	            var status = this.state.WorkCompSta ? this.state.WorkCompSta : 0;
	            var mode = this.state.CurWorkMode ? this.state.CurWorkMode : 0;
	            // console.log('iiiiiiii',WorkCompSta);
	            if (WorkCompSta == 0) {
	                mode = 0;
	            }
	            var fastBtnEvent = mode == 0 ? this.handleShakeSwitch : '';
	            var btnCss = mode == 0 ? '' : '';
	            // console.log('mode1111111111111111',mode);
	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workText + ' ',
	                    CurWorkMode != 0 ? '模式：' + workMode : workMode + '模式：无'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { 'data-type': '2', className: mode == 0 || mode == 2 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/ganshi1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5E72/\u6E7F\u8C46'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '1', className: mode == 0 || mode == 1 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/wugu1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4E94\u8C37\u8C46\u6D46'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '3', className: mode == 0 || mode == 3 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/mizhou1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7C73\u7CCA'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '4', className: mode == 0 || mode == 4 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/lvdou1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7EFF\u8C46\u6C99'
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
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式     
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

	{/*<article data-type='2' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/ganshi1.png":"../static/img/btnlist/ganshi2.png"} alt=""/>
	                           
	                           <p>干/湿豆</p>
	                       </article>
	                       <article data-type='1' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/wugu1.png":"../static/img/btnlist/wugu2.png"} alt=""/>
	                           <p>五谷豆浆</p>
	                       </article>
	                       <article data-type='3' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/mizhou1.png":"../static/img/btnlist/mizhou2.png"} alt=""/>
	                           <p>米糊</p>
	                       </article>
	                       <article data-type='4' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/lvdou1.png":"../static/img/btnlist/lvdou2.png"} alt=""/>
	                           <p>绿豆沙</p>
	                       </article>*/}

/***/ },
/* 2 */
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
	'handleShakeSwitch', //appBtnList选择模式
	'getData', //初始化路由
	'clockSwitch', //定时器取消
	'selectTime', //定时器选择
	'modeStart', //模式启动
	'timeclock', //倒计时
	'modeCancel', //取消的模式
	'modeFinish', //完成模式
	'timeclock', //分钟的变化
	'timeclocker', //时分的变化
	'workCompSta', //工作中
	'getting', //实时拉取运行数据
	'setting']);

/***/ },
/* 3 */
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

	var _fun = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var AppData = {};
	var docker = {
	    appId: '10120',
	    appSecret: "3cbea951ccb14de3a7acd04c0b64a22f",
	    deviceId: '410BF8E4A3DD1403536211486B08A23A' || 'BAE827106FF8DED3634B4831A7D0306D' || het.getDeviceId(), //'5E39AD1E6EBAAC45E37D6AC243B49641' 我的设备
	    accessToken: '37c880c1667b4ff7b9952d11a90bee3f',
	    //历史数据接口路由
	    routerGetDay: '/v1/app/chairdressing/partMeasure/getByday',
	    routerGetDays: '/v1/app/chairdressing/partMeasure/getBydays',
	    //控制,运行,故障数据接口路由
	    routerDevCtrl: '/v1/device/config/set',
	    routerDevRun: '/v1/device/data/get',
	    routerDevErr: '/v1/device/data/getErrorData',
	    //重构历史数据
	    refactorArr: function refactorArr(data, key) {
	        var arr = [];
	        data.map(function (item, index) {
	            arr[index] = item[key];
	        });
	        return arr;
	    }
	};

	var decToHex = function decToHex(dec) {
	    var hex = parseInt(dec).toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    WorkCompSta: 0,
	    WorkStartStop: 0,
	    BespeakSet: 0,
	    BespeakMode: 0,
	    BespeakHour: 0,
	    BespeakMin: 0,
	    CurWorkMode: 0

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
	    var time = new Date().getTime() + 10e3 * 2; // 10秒内不接收新数据

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

	        if (data.CurWorkMode) AppData.CurWorkMode = data.CurWorkMode;
	        if (data.WorkMode) AppData.WorkMode = data.WorkMode;
	        if (data.WorkCompSta) {
	            AppData.WorkCompSta = data.WorkCompSta;data.open = '02';AppData.open = '02';
	        }
	        if (data.online) {
	            AppData.online = data.online;if (data.online == 2) {
	                data.open = '02';
	            }
	        }
	        if (data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;if (data.networkavailable == 2) {
	                data.open = '02';
	            }
	        }
	        if (data.KeyError) AppData.KeyError = data.KeyError;
	        if (data.BespeakHour) AppData.BespeakHour = data.BespeakHour;
	        if (data.BespeakMin) AppData.BespeakMin = data.BespeakMin;
	        if (data.WorkStartStop) AppData.WorkStartStop = data.WorkStartStop;
	        if (data.deviceName) AppData.deviceName = data.deviceName;
	        if (data.KeyFlagSta) AppData.KeyFlagSta = data.KeyFlagSta;
	        if (data.BespeakSta) AppData.BespeakSta = data.BespeakSta;
	        if (data.BespeakMode) AppData.BespeakMode = data.BespeakMode;
	        this.trigger(data);
	    },
	    onGetting: function onGetting(data) {
	        var _this = this;
	        var getRunUrl = 'https://200.200.200.50/v1/device/data/get';
	        // 直接应用openlifeSDK
	        het.get(getRunUrl, '', function (response) {
	            var result = JSON.parse(response);
	            result.code === 0 && _this.onRepaint(result.data);
	            if (result.code === 100022006) {
	                _this.trigger({ 'online': '02' });
	            }
	        }, function (response) {
	            het.toast(response);
	        });

	        //本地调试请求
	        //this.onAjax(url,params,'GET',sucCallback,errCallback)
	    },
	    onSetting: function onSetting(BespeakHour, BespeakMin, CurWorkMode) {
	        // alert(BespeakHour,BespeakMin,CurWorkMode);
	        var postCtrlUrl = 'https://200.200.200.50/v1/device/config/set';
	        var accessToken = docker.accessToken;
	        var appId = docker.appId;
	        var deviceId = docker.deviceId;
	        var source = 2;
	        var timestamp = +new Date();
	        var appSecret = docker.appSecret;
	        var _this = this;

	        setDataTimer('WorkCompSta', 'WorkStartStop', 'BespeakSet', 'BespeakMode', 'BespeakHour', 'BespeakMin', 'CurWorkMode');
	        !isNaN(BespeakHour) ? '00' : BespeakHour;
	        !isNaN(BespeakMin) ? '00' : BespeakMin;
	        AppData.CurWorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	        var date = new Date();
	        var hour = date.getHours() + BespeakHour;
	        var minute = date.getMinutes() + BespeakMin;
	        //this.trigger({BespeakHour:hour,BespeakMin:minute,open:'02'});
	        var CurWorkModes = {};
	        AppData.BespeakHour == '00' && AppData.BespeakMin == '00' ? AppData.WorkCompSta = 1 : AppData.WorkCompSta = 3;
	        if (BespeakHour == 0 && BespeakMin == 0) {

	            AppData.WorkStartStop = '01';
	            AppData.WorkCompSta = '01';
	            AppData.WorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	            console.log('11111111111111111111111111111', AppData);
	            _this.trigger({ 'WorkMode': AppData.WorkMode, 'WorkCompSta': AppData.WorkCompSta, 'WorkStartStop': AppData.WorkStartStop, 'open': '02' });
	            CurWorkModes = { 'WorkStartStop': AppData.WorkStartStop, 'WorkMode': AppData.WorkMode, 'updateFlag': AppData.updateFlag };
	            //AppData.updateFlag = het.hexUpFlag(0,2,2);
	        } else {

	            AppData.BespeakSet = '01';
	            AppData.WorkCompSta = '03';
	            // AppData.WorkStartStop = '01';
	            AppData.SetBespeakMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.SetBespeakMin = decToHex(minute > 59 ? minute - 60 : minute);
	            AppData.SetBespeakHour = decToHex((minute > 59 ? hour + 1 : hour) % 24);
	            AppData.BespeakHour = AppData.SetBespeakHour;
	            AppData.BespeakMin = AppData.SetBespeakMin;
	            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2))));
	            console.log('2222222222222222222222222222222222', AppData);
	            _this.trigger({ 'BespeakSta': '03', 'BespeakMode': AppData.SetBespeakMode, 'WorkCompSta': '03',
	                'SetBespeakHour': AppData.SetBespeakHour, 'SetBespeakMin': AppData.SetBespeakMin, 'open': '02' });
	            CurWorkModes = { 'BespeakSet': AppData.BespeakSet, 'SetBespeakMode': AppData.SetBespeakMode,
	                'SetBespeakHour': AppData.SetBespeakHour, 'SetBespeakMin': AppData.SetBespeakMin, 'updateFlag': AppData.updateFlag };
	            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
	        }
	        het.post(postCtrlUrl, CurWorkModes, function (response) {
	            var result = JSON.parse(response);
	            result.code != 0 && het.toast('\u4E0B\u53D1\u5931\u8D25,\u539F\u56E0:' + result.msg);
	            if (BespeakHour == 0 && BespeakMin == 0) {

	                AppData.WorkStartStop = '01';
	                AppData.WorkCompSta = '01';
	                AppData.WorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	                AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	                console.log('11111111111111111111111111111', AppData);
	                _this.trigger({ 'WorkMode': AppData.WorkMode, 'WorkCompSta': AppData.WorkCompSta, 'WorkStartStop': AppData.WorkStartStop, 'open': '02' });
	                CurWorkModes = { 'WorkStartStop': AppData.WorkStartStop, 'WorkMode': AppData.WorkMode, 'updateFlag': AppData.updateFlag };
	                //AppData.updateFlag = het.hexUpFlag(0,2,2);
	            } else {

	                AppData.BespeakSet = '01';
	                AppData.WorkCompSta = '03';
	                // AppData.WorkStartStop = '01';
	                AppData.SetBespeakMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	                AppData.SetBespeakMin = decToHex(minute > 59 ? minute - 60 : minute);
	                AppData.SetBespeakHour = decToHex((minute > 59 ? hour + 1 : hour) % 24);
	                AppData.BespeakHour = AppData.SetBespeakHour;
	                AppData.BespeakMin = AppData.SetBespeakMin;
	                //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
	                AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2))));
	                console.log('2222222222222222222222222222222222', AppData);
	                _this.trigger({ 'BespeakSta': '03', 'BespeakMode': AppData.SetBespeakMode, 'WorkCompSta': '03', 'CurWorkMode': AppData.SetBespeakMode,
	                    'SetBespeakHour': AppData.SetBespeakHour, 'SetBespeakMin': AppData.SetBespeakMin, 'open': '02' });
	                CurWorkModes = { 'BespeakSet': AppData.BespeakSet, 'SetBespeakMode': AppData.SetBespeakMode,
	                    'SetBespeakHour': AppData.SetBespeakHour, 'SetBespeakMin': AppData.SetBespeakMin, 'updateFlag': AppData.updateFlag };
	                //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
	            }
	        }, function (responseTxt) {
	            het.toast(responseTxt);
	        });
	        history.back();
	        /*let CurWorkModes ={"WorkMode":AppData.WorkMode,'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,
	        'updateFlag':AppData.updateFlag,'WorkCompSta':AppData.WorkCompSta};*/
	        // let json = JSON.stringify(CurWorkModes);
	        // let sign =
	        //     CryptoJS.enc.Hex.stringify(
	        //         CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId
	        //             +"&deviceId="+deviceId+"&json="+json
	        //             +"&source="+source+"&timestamp="+timestamp+"&"+appSecret)
	        //     );
	        // let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
	        // let sucCallback = function (xhr) {
	        //     //this.trigger({'WorkCompSta':AppData.WorkCompSta,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin})

	        //     /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
	        //     xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
	        //     xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
	        // }
	        // let errCallback = function (xhr) {/*iToast('请求失败')*/}
	        // //het.post(url,sendObj,sucCallback,errCallback,1);

	        // //本地调试方式
	        // let ajax=(url, data, type, sucCallback, errCallback)=>{

	        //     var xhr = new XMLHttpRequest();
	        //     xhr.onreadystatechange=function(){
	        //         if (xhr.readyState===4) {
	        //             if (xhr.status===200 || xhr.status===304) {
	        //                 sucCallback(xhr.responseText);
	        //             } else {
	        //                 errCallback('Request failed! Status code: ' + xhr.status);
	        //             }
	        //         }
	        //     };
	        //     xhr.open(type, url, true);
	        //     // xhr.withCredentials = true;
	        //     if (type==='POST') { 
	        //         xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	        //     }
	        //     xhr.send(data);
	        // }
	        //     ajax(url, sendObj,'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
	        //$ajax方式
	        //this.onAjax(url,data,'POST',sucCallback,errCallback)
	    },

	    /*onGetData(){
	    	this.trigger({CurWorkMode:AppData.CurWorkonMeasureResultMode,WorkCompSta:AppData.WorkCompSta,
	            online:AppData.online,KeyError:AppData.KeyError,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin});
	    },*/
	    onHandleShakeSwitch: function onHandleShakeSwitch(type, WorkCompSta) {
	        if (type) {
	            this.trigger({ 'CurWorkMode': type });
	            if (WorkCompSta == 0) {
	                AppData.WorkStartStop = '01';
	                AppData.WorkMode = '0' + type;
	                AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	                var me = this;
	                var url = 'https://200.200.200.50/v1/device/config/set';
	                var accessToken = docker.accessToken;
	                var appId = docker.appId;
	                var deviceId = docker.deviceId;
	                var source = 2;
	                var timestamp = +new Date();
	                var appSecret = docker.appSecret;
	                var CurWorkModes = { 'WorkStartStop': AppData.WorkStartStop, 'WorkMode': AppData.WorkMode, 'updateFlag': AppData.updateFlag };
	                var json = JSON.stringify(CurWorkModes);
	                var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	                var sendObj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	                var sucCallback = function sucCallback(xhr) {
	                    //me.trigger({'WorkCompSta':AppData.WorkCompSta,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin})

	                    /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
	                    xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
	                    xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
	                };
	                var errCallback = function errCallback(xhr) {} /*iToast('请求失败')*/
	                //het.post(url,sendObj,sucCallback,errCallback,1);

	                //本地调试方式
	                ;var ajax = function ajax(url, data, type, sucCallback, errCallback) {

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
	                ajax(url, sendObj, 'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
	            }
	        } else {
	            return;
	        }
	    },
	    onClockSwitch: function onClockSwitch(hour, minute) {
	        if (hour == 3 && minute == 'cancel') {
	            this.trigger({ remainTime: hour, clockShow: 3, selectshow: false });
	        }
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        // if(isFault()){het.toast(isFault());return false};
	        //alert('6666666666666',hour,minute);

	        this.trigger({ hour: hour, minute: minute, clockShow: 3, selectshow: false });
	        // het.send(AppData, function(data){
	        //     // console.log(data)
	        // },function(data){
	        //     het.toast("命令发送失败");
	        // });
	        // }
	    },
	    onModeStart: function onModeStart(BespeakHour, BespeakMin, CurWorkMode) {

	        //this.trigger({open:'02'});
	        setDataTimer('WorkCompSta', 'WorkStartStop', 'BespeakSet', 'BespeakMode', 'BespeakHour', 'BespeakMin', 'CurWorkMode');
	        !isNaN(BespeakHour) ? '00' : BespeakHour;
	        !isNaN(BespeakMin) ? '00' : BespeakMin;
	        AppData.CurWorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	        var date = new Date();
	        var hour = date.getHours() + BespeakHour;
	        var minute = date.getMinutes() + BespeakMin;
	        //this.trigger({BespeakHour:hour,BespeakMin:minute,open:'02'});
	        AppData.BespeakHour == '00' && AppData.BespeakMin == '00' ? AppData.WorkCompSta = 1 : AppData.WorkCompSta = 3;
	        console.log('BespeakHour', 'BespeakMin', BespeakMin);
	        if (BespeakHour == 0 && BespeakMin == 0) {
	            AppData.WorkStartStop = '01';
	            AppData.WorkCompSta = '01';
	            AppData.WorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	            //AppData.updateFlag = het.hexUpFlag(0,2,2);
	        } else {

	            AppData.BespeakSet = '01';
	            AppData.WorkCompSta = '03';
	            // AppData.WorkStartStop = '01';
	            AppData.SetBespeakMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.SetBespeakMin = decToHex(minute > 59 ? minute - 60 : minute);
	            AppData.SetBespeakHour = decToHex((minute > 59 ? hour + 1 : hour) % 24);
	            AppData.BespeakHour = AppData.SetBespeakHour;
	            AppData.BespeakMin = AppData.SetBespeakMin;
	            console.log('gggggggggggg', AppData);
	            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2))));
	            this.trigger({ BespeakHour: AppData.BespeakHour, BespeakMin: AppData.BespeakMin, open: '02', 'WorkCompSta': '03', 'BespeakMode': AppData.SetBespeakMode });
	            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
	        }
	        history.back();
	        //console.log(AppData,'kkkkkkkkkkkkkkkkk');
	        /*  let _this = this;
	          het.send(AppData, function(data){
	              // console.log('open222222222222222222222');
	              _this.trigger({open:'02'});
	              // console.log(data)
	          },function(data){
	              het.toast("命令发送失败");
	          });*/

	        //this.trigger({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
	    },
	    onModeCancel: function onModeCancel(WorkCompSta, CurWorkMode) {
	        //setDataTimer('WorkCompSta','WorkStartStop');
	        dataFilterTimers.WorkCompSta = 0;
	        dataFilterTimers.CurWorkMode = 0;
	        var me = this;
	        AppData.WorkCompSta = '0' + parseInt(WorkCompSta);
	        AppData.BespeakHour = '00';
	        AppData.BespeakMin = '00';
	        AppData.CurWorkMode = CurWorkMode;
	        AppData.WorkMode = CurWorkMode;
	        AppData.WorkStartStop = '00';
	        var CurWorkModes = {};
	        if (WorkCompSta == 1) {
	            AppData.WorkStartStop = '00';
	            AppData.WorkMode = '00';
	            if (AppData.KeyFlagSta == '01') {
	                AppData.KeyFlag = '01';
	                me.trigger({ KeyFlagSta: '01' });
	            } else {

	                AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	                //CurWorkModes = {'WorkStartStop':AppData.WorkStartStop,'updateFlag':AppData.updateFlag}
	            }
	        } else {
	            AppData.BespeakSet = '00';
	            AppData.BespeakMode = '00';
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2));
	            // me.trigger({WorkCompSta:});
	            //CurWorkModes = {'BespeakSet':AppData.BespeakSet,'BespeakMode':AppData.BespeakMode,'updateFlag':AppData.updateFlag}
	        }
	        me.trigger({ WorkCompSta: '00' });

	        var postCtrlUrl = 'https://200.200.200.50/v1/device/config/set';
	        var accessToken = docker.accessToken;
	        var appId = docker.appId;
	        var deviceId = docker.deviceId;
	        var source = 2;
	        var timestamp = +new Date();
	        var appSecret = docker.appSecret;

	        setDataTimer('WorkCompSta', 'WorkStartStop', 'BespeakSet', 'BespeakMode', 'BespeakHour', 'BespeakMin', 'CurWorkMode');

	        het.post(postCtrlUrl, AppData, function (response) {
	            var result = JSON.parse(response);
	            result.code != 0 && het.toast('\u4E0B\u53D1\u5931\u8D25,\u539F\u56E0:' + result.msg);
	            _this.trigger({ 'WorkMode': '00', 'WorkCompSta': '00', 'WorkStartStop': '00', 'open': '02' });
	        }, function (responseTxt) {
	            het.toast(responseTxt);
	        });

	        /*let CurWorkModes ={"WorkMode":AppData.WorkMode,'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,
	        'updateFlag':AppData.updateFlag,'WorkCompSta':AppData.WorkCompSta};*/
	        // let json = JSON.stringify(CurWorkModes);
	        // let sign =
	        //     CryptoJS.enc.Hex.stringify(
	        //         CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId
	        //             +"&deviceId="+deviceId+"&json="+json
	        //             +"&source="+source+"&timestamp="+timestamp+"&"+appSecret)
	        //     );
	        // let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
	        // let sucCallback = function (xhr) {


	        //     /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
	        //     xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
	        //     xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
	        // }
	        // let errCallback = function (xhr) {iToast('请求失败')}
	        // //het.post(url,sendObj,sucCallback,errCallback,1);

	        // //本地调试方式
	        // let ajax=(url, data, type, sucCallback, errCallback)=>{

	        //     var xhr = new XMLHttpRequest();
	        //     xhr.onreadystatechange=function(){
	        //         if (xhr.readyState===4) {
	        //             if (xhr.status===200 || xhr.status===304) {
	        //                 sucCallback(xhr.responseText);
	        //             } else {
	        //                 errCallback('Request failed! Status code: ' + xhr.status);
	        //             }
	        //         }
	        //     };
	        //     xhr.open(type, url, true);
	        //     // xhr.withCredentials = true;
	        //     if (type==='POST') { 
	        //         xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	        //     }
	        //     xhr.send(data);
	        // }
	        //     ajax(url, sendObj,'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
	        //$ajax方式
	        //this.onAjax(url,data,'POST',sucCallback,errCallback)
	        //WorkCompSta ==1?(AppData.WorkMode = '01';AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(1,2,2))):(AppData.WorkMode = '03';AppData.BespeakSet ='00';AppData.BespeakMode = '00'; AppData.updateFlag = het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2)));
	        // console.log('AppData.updateFlag',AppData);
	        /*let _this = this;
	        het.send(AppData, function(data){
	            // console.log('suibian');
	           _this.trigger({WorkCompSta:'00',BespeakSta:'00'});
	        },function(data){
	            het.toast("命令发送失败");
	        });*/
	    },
	    onModeFinish: function onModeFinish() {
	        AppData.WorkCompSta = '02';
	        AppData.WorkStartStop = '00';
	        AppData.updateFlag = het.hexUpFlag(0, 1, 1);

	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onTimeclock: function onTimeclock(BespeakMin) {
	        this.trigger({ BespeakMin: BespeakMin });
	    },
	    onTimeclocker: function onTimeclocker(hour, min) {
	        var date = new Date();
	        var BespeakHour = date.getHours() + hour;
	        var BespeakMin = date.getMinutes() + min;
	        if (BespeakMin > 60) {
	            BespeakMin = BespeakMin - 60;
	            BespeakHour++;
	        }
	        AppData.BespeakHour = decToHex(BespeakHour);
	        AppData.BespeakMin = decToHex(BespeakMin);
	        this.trigger({ BespeakHour: AppData.BespeakHour, BespeakMin: AppData.BespeakMin });
	    },
	    onWorkCompSta: function onWorkCompSta(CurWorkMode) {
	        this.trigger({ WorkCompSta: '01' });
	        AppData.WorkMode = CurWorkMode;
	        AppData.WorkStartStop = '01';
	        // console.log(AppData);
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	        het.send(AppData, function (data) {

	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(5);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 5 */
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