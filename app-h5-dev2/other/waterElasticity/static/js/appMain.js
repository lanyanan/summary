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
	/**
	 * 圆弧滑动组件
	 * 设备充电中不能使用，拉开关机，合拢待机，APP无法控制开关机，APP无法清零设备数据
	 * APP控制数据只有一个更改测试部位part和updateFlag字段
	 * @measureStatus 本地维护测试状态，请选择，初始化，测试中，测试完成，测试失败
	 */

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _History = __webpack_require__(9);

	var _MeasureParts = __webpack_require__(12);

	var _MeasureStatus = __webpack_require__(13);

	var _MeasureResult = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var appData = {};
	var Toast = __webpack_require__(8);
	var iToast = function iToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: "0", secs: "10", block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        //Actions.runningData();
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _Actions.Actions.deviceInfo();
	        _Actions.Actions.getting();
	        _Actions.Actions.repaint();
	        _this.state = {
	            onlineStatus: 2,
	            water: 66,
	            oil: 15,
	            elasticity: 5.5,
	            battery: 10,
	            measureStatus: 0,
	            measureResult: false,
	            //测试结果
	            skinGuide: '如果你忍不住不洗手，那就经常涂涂乳液或者护手霜吧！洗澡之后用橄榄油或者凡士林厚厚涂一层按摩，戴上厚手套，按摩几分钟能够让你的双手恢复娇嫩。',
	            skinAreaRank: 0,
	            skinTypeName: '重度干燥.皱纹',
	            skinProblem: '这粗糙的手……你是小洁癖么？过度洗手会让皮肤油脂代谢失常，因而会变得干燥，起皮。'
	        };
	        _this.listenStore(_Store.Store);
	        _this.selectPart = _this.selectPart.bind(_this); //选择测试部位
	        _this.reMeasure = _this.reMeasure.bind(_this); //重新测试该部位
	        _this.childSetState = _this.childSetState.bind(_this); //动态计算设置一屏高度
	        _this.history = _this.history.bind(_this); //历史数据
	        _this.back = _this.back.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.PollTimer = setInterval(function () {
	                //Actions.intervalData();
	                console.log('------------------');
	                _Actions.Actions.repaint();
	            }, 5000);
	            //Actions.intervalData();
	            _Actions.Actions.repaint();
	            /*this.iScroll = new IScroll('#iScroll', {
	                eventPassthrough: true,
	                scrollX: true,
	                scrollY: false,
	                preventDefault: false
	            });*/
	        }
	    }, {
	        key: "childSetState",
	        value: function childSetState(childState, fn) {
	            //计算一屏展示，子组件调用父组件方法，并通过该方法的参数或回调函数的方式，把子组件设置的值回传给父组件使用
	            var navHeight = childState.navHeight;
	            this.setState({
	                navHeight: navHeight + 1,
	                dataHeight: window.screen.height - navHeight
	            });
	        }
	    }, {
	        key: "selectPart",
	        value: function selectPart(e) {
	            //if(this.state.onlineStatus==2) {iToast('设备不在线');return}
	            if (e.currentTarget.getAttribute('class') === 'part on') return;
	            var part = e.currentTarget.getAttribute('data-part');
	            //选中不可再选中
	            var measureTime = new Date().Format('yyy-MM-dd hh:mm:ss');

	            _Actions.Actions.selectPart({ "updateFlag": 0, "part": part, "measureTime": measureTime });
	            this.setState({ updateFlag: 0, part: part, measureStatus: 1 });
	        }
	    }, {
	        key: "reMeasure",
	        value: function reMeasure(e) {
	            var part = this.state.part;
	            _Actions.Actions.selectPart({ "updateFlag": 0, "part": part });
	            this.setState({ updateFlag: 0, part: part });
	        }
	    }, {
	        key: "back",
	        value: function back(e) {
	            window.history.back();
	        }
	    }, {
	        key: "history",
	        value: function history(e) {
	            window.location.href = '#/History';
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            //设置一屏展示
	            var screenHeight = window.screen.height;
	            var navHeight = this.state.navHeight + 'px';
	            var dataHeight = this.state.dataHeight + 'px';
	            //console.log('--screenHeight--navHeight---dataHeight---------msg--',screenHeight,navHeight,dataHeight,this.state.msg);
	            //选择部位
	            var part = this.state.part != undefined ? this.state.part : 0;
	            var partArr = ['待机', '额头', '左脸', '右脸', '鼻子', '眼周', '手部'];

	            //测量动画和电量状态
	            var battery = this.state.battery ? this.state.battery : '';
	            var testingCss = 'testing-animation';
	            var testingAnima = /*mode==2*/1 ? React.createElement("b", null) : '';
	            var animationCss = 'initialize-animation'; //注视掉
	            var initAnimaCss = 'initialize-animation';
	            var statusMain = part == 0 ? '请选择一个部位' : '';
	            //测试状态和动画以及电量提示
	            var statusState = {
	                measureResult: this.state.measureResult,
	                part: part,
	                battery: battery,
	                statusMain: statusMain,
	                testingCss: testingCss,
	                testingAnima: testingAnima,
	                initAnimaCss: initAnimaCss,
	                measureStatus: this.state.measureStatus
	            };
	            //console.log('------statusState--------',statusState)
	            //测量结果
	            var resultState = {
	                measureResult: this.state.measureResult,
	                dataHeight: dataHeight,
	                part: part != '' ? partArr[part] + '的肤质为' : '额头的肤质为',
	                water: this.state.water,
	                oil: this.state.oil,
	                elasticity: this.state.elasticity,

	                skinTypeName: this.state.skinTypeName,
	                skinAreaRank: this.state.skinAreaRank,
	                skinProblem: this.state.skinProblem,
	                skinGuide: this.state.skinGuide,

	                reMeasure: this.reMeasure,
	                measureStatus: this.state.measureStatus || 0
	            };
	            //console.log('---------resultState--------------',resultState);
	            {
	                //<aside className='console'>{' 调试打印: '}{'onlineStatus:'+this.state.onlineStatus }</aside>
	                //App自带导航栏
	                //<aside className="navigation">
	                //    <i className="back" onTouchStart={this.back}></i>
	                //    <span className="title">智能肤质检测仪器</span>
	                //    <i className="history" onTouchStart={this.history}></i>
	                //</aside>
	            }
	            return React.createElement(
	                "div",
	                { className: "wrapper" },
	                React.createElement(
	                    "section",
	                    { className: "first-page" },
	                    React.createElement(_MeasureParts.MeasureParts, { part: part, partArr: partArr, selectPart: this.selectPart, childSetState: this.childSetState }),
	                    React.createElement(_MeasureStatus.MeasureStatus, { statusState: statusState }),
	                    React.createElement(_MeasureResult.MeasureResult, { resultState: resultState })
	                ),
	                React.createElement("aside", { id: "history", onTouchStart: this.history }),
	                React.createElement("div", { id: "mytoast" })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	document.addEventListener('DOMContentLoaded', function () {
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: "/", component: App }),
	        React.createElement(Route, { path: "/History", component: _History.History })
	    ), document.getElementById('ROOT'));
	}, false);

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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'deviceInfo', 'getting', 'setting', 'intervalData', //轮询数据
	'runningData', //也许应该合并到intervalData
	'ctrlData', //也许应该合并到intervalData
	'selectMode', //选中模式
	'echartsLines', //曲线数据
	'HttpGet', //store内相互调用，这里注册便于维护
	'selectPart', //选择测试部位
	'reMeasure', //重新测试选中的部位,
	'measureStatus']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @Funs._extends(o1,o2) let o1 = {name:'hello'},o2={age:'998'};let o3 = Funs._extends(o1,o2); //o1 = { name:'hello',age:'998'},o2={age:'998'},o3==o1
	 * @onGetToken 获取accessToken，所有接口请求都需要accessToken
	 * @onMeasureStatus 没有测试进度状态值，本地维护请选择，初始化，测试中等测试动画进度
	 * @onlineStatus 1在线，2不在线
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

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

	var Toast = __webpack_require__(8);
	var iToast = function iToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: "0", secs: "10", block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};
	var AppData = {};
	var docker = {
	    //华为
	    appId: '30590', //30590 华为 10101 和而泰
	    appSecret: '98889238ed6e441aaf9b0691b017695f', //988华为，afd 和而泰
	    deviceId: het.getDeviceId(),
	    accessToken: function () {
	        var sucCallback = function sucCallback(result) {};
	        var errCallback = function errCallback(data) {
	            return data;
	        };
	        return het.getToken(sucCallback(), errCallback());
	    }(),
	    //和而泰本地
	    //appId:        '10101',//30590 华为 10101 和而泰
	    //appSecret:    'afd55f877bad4aaeab45fb4ca567d234' ,//988华为，afd 和而泰
	    //deviceId:     '82625BED837FD474C60E6FC3F6FF13C4' || '5E39AD1E6EBAAC45E37D6AC243B49641', //'5E39AD1E6EBAAC45E37D6AC243B49641' 我的设备
	    //accessToken:  '09f6c841e02240c889ecf44982cc748f',

	    appType: !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2,
	    //请求主机
	    host: 'https://200.200.200.50',
	    //历史数据接口路由
	    routerGetDay: '/v1/app/chairdressing/partMeasure/getByday',
	    routerGetDays: '/v1/app/chairdressing/partMeasure/getBydays',
	    //重构历史数据
	    refactorArr: function refactorArr(data, key) {
	        var arr = [];
	        data.map(function (item, index) {
	            arr[index] = item[key];
	        });
	        return arr;
	    },
	    timer: null,
	    timerMeasure: null,
	    cityCode: '101010100' || '101280601'
	};
	//const isOffline = ()=>{return (AppData.onlineStatus==2)}
	//const isShutdown = ()=>{return (AppData.bootMode==16)}
	//const isNetOff = ()=>{return (AppData.networkavailable==2)}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],

	    onDeviceInfo: function onDeviceInfo() {
	        var me = this;
	        var tokenSub = function tokenSub(data) {
	            alert('tokenSub' + data);
	            var token = data;
	            //获取设备基础信息，仅网络字段onlineStatus有用,,~_~
	            var url = docker.host + '/v1/device/getDeviceInfo';
	            url += '?accessToken=' + token + '&appId=' + docker.appId + '&appType=' + docker.appType + '&deviceId=' + docker.deviceId + '&timestamp=' + +new Date();
	            var scb = function scb(xhr) {
	                xhr = JSON.parse(xhr);
	                if (xhr.code == 0) {
	                    AppData.onlineStatus = xhr.data.onlineStatus;
	                } else {
	                    AppData.onlineStatus = 2;
	                }
	                //console.log('onDeviceInfo 200 >>>> onlineStatus',xhr,xhr.data.onlineStatus);
	            };
	            var ecb = function ecb(xhr) {
	                AppData.onlineStatus = 2;
	                iToast('基础信息请求失败~');
	            };
	            het.get(url, '', scb, ecb, 1);
	        };
	        var tokenErr = function tokenErr(data) {
	            alert('err' + data);
	        };
	        het.getToken(tokenSub, tokenErr);
	    },
	    onGetting: function onGetting(data) {
	        //获取运行数据
	        //1、先获取设备是否在线
	        //2、在线则表示设备可以测试
	        //3、发送测试命令，若发送成功，再次请求运行数据接口，拿到测试的water,oil,elasticity值再去请求测试结果接口
	        //4、返回成功，则显示测试结果页面
	        var me = this;
	        var url = docker.host + '/v1/device/data/get' || '/v1/app/chairdressing/elasticskinmeter/data/get';

	        var sucCallback = function sucCallback(xhr) {
	            xhr = JSON.parse(xhr);
	            //console.log('------------xhr-----------',xhr)
	            if (xhr.code == 0) {
	                _fun.Funs._extends(AppData, xhr.data), iToast('请求成功');

	                setTimeout(function () {
	                    //me.onMeasureResult();
	                }, 2000);
	            } else {
	                if (xhr.code == 100022000) AppData.onlineStatus = 2, iToast('设备不在线~~');
	                if (xhr.code == 100022800) iToast('命令发送失败');
	                AppData.msg = '获取控制数据失败';
	                //AppData.onlineStatus = 1;
	                //AppData.code = xhr.code;AppData.msg = xhr.msg;
	                iToast(AppData.msg);

	                // me.onMeasureResult();
	            }
	        };
	        var errCallback = function errCallback(xhr) {
	            console.log(xhr), iToast('onGetting请求失败');
	        };
	        //不需要APP拼接，自己拼接，get函数最后一个字段传1，就不用传入params对象了~
	        url += '?appId=' + docker.appId + '&accessToken=' + docker.accessToken + '&timestamp=' + +new Date() + '&deviceId=' + docker.deviceId;
	        het.get(url, '', sucCallback, errCallback, 1);
	        this.onDeviceInfo();
	        this.onLocation();
	    },
	    onSetting: function onSetting(data) {
	        var me = this;
	        var url = docker.host + '/v1/app/chairdressing/elasticskinmeter/config/set';
	        var scb = function scb(xhr) {
	            xhr = JSON.parse(xhr);
	            //console.log(xhr);
	            if (xhr.code == 0) {
	                me.onGetting();
	                AppData.onlineStatus = 1, iToast('发送成功');
	            } else {
	                if (xhr.code == 100022000) AppData.onlineStatus = 2, iToast('设备不在线~~');
	                if (xhr.code == 100022800) iToast('命令发送失败');
	                AppData.measureResult = true;
	            }
	        };
	        var ecb = function ecb() {
	            iToast('请求失败'), AppData.measureResult = false;
	        };
	        //代理请求
	        het.get(url, '', scb, ecb);

	        //自己拼接
	        var accessToken = docker.accessToken;
	        var appId = docker.appId;
	        var deviceId = docker.deviceId;
	        var source = 2;
	        var timestamp = +new Date();
	        var appSecret = docker.appSecret;
	        var json = JSON.stringify(data);
	        var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	        var sendObj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	        console.log('---------------------------sendObj', sendObj);

	        het.post(url, sendObj, sucCallback, errCallback, 1);
	    },
	    onSelectPart: function onSelectPart(data) {
	        var _this2 = this;

	        this.trigger(data);
	        clearInterval(docker.timer);
	        AppData.timer = setTimeout(function () {
	            _this2.trigger({ measureStatus: 2 });
	        }, 3000);
	        // 调用POST接口发送设备控制数据给服务器，走大循环，服务器发送接收到的数据给设备，设备响应
	        // 设备接收到数据，响应之后回传数据给服务器
	        AppData.part = data.part;
	        this.onSetting(data);
	    },
	    onReMeasure: function onReMeasure() {
	        this.trigger(data);
	    },
	    onMeasureStatus: function onMeasureStatus(data) {
	        //测试动画和状态维护
	        var me = this;
	        me.trigger({ measureStatus: 1 });
	        setTimeout(function () {
	            me.trigger(data);
	        }, 11000);
	    },
	    onMeasureResult: function onMeasureResult() {
	        //测试结果，一些参数需要后台计算后返回
	        var part = 1 || AppData.part,
	            water = AppData.water || 30,
	            oil = AppData.oil || 20,
	            elasticity = AppData.elasticity || 10,
	            skinType = 0,
	            skinSubType = 0,
	            skinAgeType = 0,
	            measureTime = /*new Date().Format('yyyy-MM-dd hh:mm:ss') ||*/'2016-12-21 1:20:00';

	        console.log('----part---water---measureTime', part, water, oil, elasticity, measureTime);
	        //肤质算法,根据水油值获取肤质类型、肤质子类型
	        if (water > 0 && water < 20.1 && oil > 0 && oil < 15.1) {
	            skinType = 1;skinSubType = 1; //@"重度干燥";
	        } else if (water > 0 && water < 20.1 && oil > 14.9 && oil < 25.1) {
	            skinType = 1;skinSubType = 2; //@"干燥";
	        } else if (water > 0 && water < 10.1 && oil > 24.9 && oil < 100) {
	            skinType = 1;skinSubType = 9; //@"又干又油";
	        } else if (water > 19.9 && water < 40.1 && oil > 14.9 && oil < 25.1) {
	            skinType = 1;skinSubType = 3; //@"缺水性偏干";
	        } else if (water > 19.9 && water < 40.1 && oil > 0 && oil < 15.1) {
	            skinType = 1;skinSubType = 4; //@"缺油性偏干";
	        } else if (water > 39.9 && water < 100 && oil > 0 && oil < 25.1) {
	            skinType = 2;skinSubType = 5; //@"中性";
	        } else if (water > 19.9 && water < 40.1 && oil > 24.9 && oil < 100) {
	            skinType = 3;skinSubType = 6; //@"缺水性偏油";
	        } else if (water > 39.9 && water < 100 && oil > 24.9 && oil < 30.1) {
	            skinType = 3;skinSubType = 7; //@"轻度偏油";
	        } else if (water > 39.9 && water < 100 && oil > 29.9 && oil < 100) {
	            skinType = 3;skinSubType = 8; //@"重度偏油";
	        }
	        //肤质算法,根据水分计算肤质年龄
	        if (water > 55) {
	            // && oil>14.9
	            skinAgeType = 1; //@"18~20";
	        } else if (water > 50 && water < 55.1) {
	            // && oil>14.9
	            skinAgeType = 2; //@"20~23";
	        } else if (water > 45 && water < 50.1) {
	            // && oil>14.9
	            skinAgeType = 3; //@"23~25";
	        } else if (water > 40 && water < 45.1) {
	            // && oil>14.9
	            skinAgeType = 4; //@"25~28";
	        } else if (water > 35 && water < 40.1) {
	            // && oil<20.1
	            skinAgeType = 5; //@"28~30";
	        } else if (water > 30 && water < 35.1) {
	            // && oil<20.1
	            skinAgeType = 6; //@"30~33";
	        } else if (water > 25 && water < 30.1) {
	            // && oil<15
	            skinAgeType = 7; //@"33~35";
	        } else if (water < 25) {
	            // && oil<15
	            skinAgeType = 8; //@"35~40";
	        }
	        //旧接口居然存在跨域问题
	        var url = docker.host + '/v1/app/chairdressing/partMeasure/uploadPartSkinTestResult';
	        //字符串拼接的时候一定要细心，一错全错
	        var sendObj = 'part=' + part + '&water=' + water + '&oil=' + oil + "&elasticity=" + elasticity + '&skinType=' + skinType + '&skinSubType=' + skinSubType + '&skinAgeType=' + skinAgeType + '&skinMeterId=' + docker.deviceId + '&measureTime=' + measureTime + "&location=" + docker.cityCode + "&appId=" + docker.appId + "&accessToken=" + docker.accessToken + '&timestamp=' + +new Date();

	        console.log('sendObj--------------', sendObj);
	        var sucCallback = function sucCallback(xhr) {
	            xhr = JSON.parse(xhr);
	            xhr.code === 0 && _fun.Funs._extends(AppData, xhr.data);
	            if (xhr.code === 0) {
	                AppData.measureResult = true;
	            } else {
	                AppData.measureResult = true;
	            }
	            console.log('---------------200-----------', xhr.code, AppData.skinTypeName);
	        };
	        var errCallback = function errCallback(xhr) {
	            iToast('请测试结果失败');
	            AppData.measureResult = false;
	        };
	        het.post(url, sendObj, sucCallback, errCallback, 1);
	    },
	    onEchartsLines: function onEchartsLines(data) {
	        //获取图表历史数据
	        //本地模拟数据
	        var begin = '2016-12-01 00:00:00';
	        var end = '2016-12-01 23:59:59';
	        data.type == 0 && (begin = '2016-12-01 02:04:00', end = '2016-12-01 23:59:59'); //按天
	        data.type == 1 && (begin = "2016-12-5 00:00:00", end = "2016-12-11 23:59:59"); //按周
	        data.type == 2 && (begin = "2016-11-1 00:00:00", end = "2016-11-30 23:59:59"); //按月

	        //接口路由地址
	        var router = data.type == 0 ? docker.routerGetDay : docker.routerGetDays;
	        this.onHttpRequest({
	            router: router,
	            //measureDateBegin: begin,
	            //measureDateEnd: end,
	            measureDateBegin: data.reqStart,
	            measureDateEnd: data.reqOver,
	            part: data.part });
	        console.log('路由地址切换------data.start---data.start', router, data.reqStart, data.reqOver);
	    },
	    onHttpRequest: function onHttpRequest(config) {
	        //图标请求数据方法
	        //路由和参数配置
	        var me = this;
	        var url = docker.host + config.router;
	        var params = {
	            appId: config.appId || docker.appId,
	            accessToken: config.accessToken || docker.accessToken,
	            timestamp: +new Date()
	        };
	        for (var i in config) {
	            params[i] != config[i] && (params[i] = config[i]);
	        }
	        delete params.router;
	        //console.log('params',params);

	        //jQuery方式请求数据
	        $.ajax({
	            url: url,
	            type: config.type || 'GET',
	            //xhrFields: { withCredentials: true},
	            //crossDomain:true,//开启跨域
	            //async:false,//关闭异步
	            dataType: 'json',
	            data: params,
	            success: function success(xhr) {
	                //return xhr
	                //console.log('请求成功',JSON.stringify(xhr))
	                //let data = xhr.code == 0 ?xhr.data:[];
	                //日，周，月的接口返回数据格式并不一致
	                var len = 0;
	                if (xhr.code == 0) {
	                    var dayOrDays = {
	                        xAxis: [],
	                        xAxisLength: 0,
	                        water: [],
	                        oil: [],
	                        elasticity: []
	                    };

	                    /*if(xhr.data instanceof Array && xhr.data.length!=0){
	                       me.trigger(dayOrDays);
	                     return false;
	                     }*/
	                    if (xhr.data == null || xhr.data.length == 0) {
	                        console.log('------------万法皆空，阿弥陀福----xhr.data------', xhr.data);
	                        me.trigger(dayOrDays);
	                        return false;
	                    }
	                    //按日
	                    if (config.router == docker.routerGetDay) {
	                        var _data = xhr.data[0].measureRec;
	                        // console.log('------------按日数据----------',data);
	                        var byDay = {
	                            xAxis: docker.refactorArr(_data, 'measureTime'),
	                            xAxisLength: 7,
	                            water: docker.refactorArr(_data, 'water'),
	                            oil: docker.refactorArr(_data, 'oil'),
	                            elasticity: docker.refactorArr(_data, 'elasticity')
	                        };
	                        //console.log('byDay-------------------------------------',byDay)
	                        me.trigger(byDay);
	                    }
	                    //按周，按月
	                    if (config.router == docker.routerGetDays) {
	                        var datas = xhr.data.measureRec;
	                        var byDays = {
	                            xAxis: docker.refactorArr(datas, 'measureTime'),
	                            xAxisLength: 7,
	                            water: docker.refactorArr(datas, 'water'),
	                            oil: docker.refactorArr(datas, 'oil'),
	                            elasticity: docker.refactorArr(datas, 'elasticity')
	                        };
	                        //console.log('------------按月周数据----------',datas)
	                        //console.log('byDays---------byDays-----byDays----------------------',byDays)
	                        me.trigger(byDays);
	                    }
	                }
	            },
	            error: function error(xhr) {
	                // return '请求失败';
	                het.toast('请求失败' + xhr.code);
	                //请求失败就当做离线
	                return '404';
	            }
	        });

	        //url += '?accessToken='+docker.accessToken
	        //    +'&appId='+docker.appId+
	        //    +'&part='+ config.part
	        //    +'&measureDateBegin='+ config.measureDateBegin
	        //    +'&measureDateEnd='+ config.measureDateEnd
	        //    +'&timestamp='+(+new Date())
	        //let scb = (xhr)=>{
	        //    //日，周，月的接口返回数据格式并不一致
	        //    let len = 0;
	        //    if(xhr.code==0){
	        //        let dayOrDays = {
	        //            xAxis: [],
	        //            xAxisLength : 0,
	        //            water: [],
	        //            oil: [],
	        //            elasticity: []
	        //        }
	        //
	        //        /*if(xhr.data instanceof Array && xhr.data.length!=0){
	        //
	        //         me.trigger(dayOrDays);
	        //         return false;
	        //         }*/
	        //        if(xhr.data == null || xhr.data.length ==0){
	        //            console.log('------------万法皆空，阿弥陀福----xhr.data------',xhr.data)
	        //            me.trigger(dayOrDays);
	        //            return false;
	        //        }
	        //        //按日
	        //        if(config.router == docker.routerGetDay){
	        //            let data  = xhr.data[0].measureRec;
	        //            // console.log('------------按日数据----------',data);
	        //            let byDay = {
	        //                xAxis: docker.refactorArr(data,'measureTime'),
	        //                xAxisLength : xAxis.length,
	        //                water: docker.refactorArr(data,'water'),
	        //                oil: docker.refactorArr(data,'oil'),
	        //                elasticity: docker.refactorArr(data,'elasticity')
	        //            };
	        //            //console.log('byDay-------------------------------------',byDay)
	        //            me.trigger(byDay);
	        //        }
	        //        //按周，按月
	        //        if(config.router == docker.routerGetDays){
	        //            let datas  = xhr.data.measureRec;
	        //            let byDays = {
	        //                xAxis: docker.refactorArr(datas,'measureTime'),
	        //                xAxisLength : xAxis.length,
	        //                water: docker.refactorArr(datas,'water'),
	        //                oil: docker.refactorArr(datas,'oil'),
	        //                elasticity: docker.refactorArr(datas,'elasticity')
	        //            };
	        //            //console.log('------------按月周数据----------',datas)
	        //            //console.log('byDays---------byDays-----byDays----------------------',byDays)
	        //            me.trigger(byDays);
	        //        }
	        //    }
	        //}
	        //let ecb = (xhr)=>{
	        //    het.iToast('历史数据请求失败')
	        //}
	        //het.get(url,'',suc,err,1)

	    },
	    onRepaint: function onRepaint() {
	        //console.log('All data',AppData)
	        this.trigger(AppData);
	    },
	    onGetToken: function onGetToken(callback) {
	        if (!window.AppJsBridge) return '';
	        var _this = this;
	        window.AppJsBridge.service.deviceService.doAction({
	            "sn": getCurrentDeviceSn(),
	            "deviceClass": "generalSwitch",
	            "action": 'getAccessToken',
	            "success": function success(data) {
	                if (data != null && data.Status != null) {
	                    if (data.Status == "0") {
	                        var result = data.result;
	                        if (AppData.online != 1) {
	                            AppData.online = 1;
	                            _this.trigger({ online: 1 });
	                        }
	                        if (callback) {
	                            callback(result);
	                        }
	                        return result.accessToken;
	                    }
	                } else {
	                    AppData.online = 2;
	                    _this.trigger({ online: 2 });
	                }
	            },
	            "error": function error(data) {
	                AppData.online = 2;
	                _this.trigger({ online: 2 });
	                alert('err');
	                // het.toast('error' + JSON.stringify(data));
	            }
	        });
	    },
	    onLocation: function onLocation() {
	        //获取位置信息，非必须，因为有默认值
	        var url = docker.host + '/v1/web/env/location/get?city=ip';
	        var scb = function scb(xhr) {
	            xhr = JSON.parse(xhr);
	            if (xhr.code == 0) docker.cityCode = xhr.data.cityCode;
	            return;
	        };
	        var ecb = function ecb() {
	            return;
	        };
	        het.get(url, '', scb, ecb, 1);
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(7);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * toast组件，用于弹出提示信息
	 * 使用该组件时，需导入toast.css文件
	 * @prop {integer} verticalAlign  垂直对齐，缺省为1，取值0-2，对应top、middle、bottom
	 * @prop {boolean} block          是否宽幅，缺省为false
	 * @prop {integer} secs           显示时间，缺省为2s
	 */
	var Toast = React.createClass({
	    displayName: "Toast",

	    aligns: [{ top: 0 }, { bottom: 100 }, { bottom: 0 }],
	    anim: ["toastD", "toastN", "toastU"],
	    render: function render() {
	        var va = typeof this.props.verticalAlign === "undefined" ? 1 : this.props.verticalAlign;
	        var secs = typeof this.props.secs !== "undefined" ? this.props.secs : 2;
	        var css = this.aligns[va];
	        css.animation = this.anim[va] + " " + (+secs + 2) + "s";
	        // 兼容旧版
	        css["WebkitAnimation"] = css.animation;
	        css["MozAnimation"] = css.animation;
	        css["OAnimation"] = css.animation;
	        return React.createElement(
	            "section",
	            { style: css, className: "toast" },
	            React.createElement(
	                "div",
	                { className: this.props.block ? "block" : "span" },
	                this.props.children
	            )
	        );
	    }
	});

	module.exports = Toast;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.History = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _EchartsDay = __webpack_require__(10);

	var _EchartsDays = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Toast = __webpack_require__(8);
	var iToast = function iToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var appData = {
	    type: 0,
	    part: 1,
	    range: 1,
	    start: new Date().getDate(),
	    over: new Date().getDate(),
	    month: new Date().getMonth() + 1,
	    year: new Date().getFullYear(),
	    thisMonthDays: function thisMonthDays(year, month) {
	        var y = year || new Date().getFullYear();var m = month || new Date('2016/3/1').getMonth() + 1;return new Date(y, m, 0).getDate();
	    },
	    //初始的星期一
	    Mark_Week_Start: function () {
	        //~_~,请忽视不会写正则的家伙~~~
	        var thisMonthDays = function thisMonthDays(year, month) {
	            var y = year || new Date().getFullYear();var m = month || new Date().getMonth() + 1;return new Date(y, m, 0).getDate();
	        };
	        var today = new Date().getDate();
	        var todayMonth = new Date().getMonth() + 1;
	        var todayYear = new Date().getFullYear();
	        //获得当前的星期几的的对应数字减去1获得当前时间和星期一之间的范围，然后再用当前星期几的对应日期几号减去这个范围就得到当前的这个星期了
	        //老外定的星期日等于0而不是7，直接减去7,但是多减了一天，所以等于6
	        //今天的星期几和当前星期一之间的天数间距，比如3月19日== 周六  那么  range = 当前星期六 6 - 1，这里比较混淆，星期一和星期日之间相差是6天，而不是7天，
	        var range = new Date().getDay() - 1;
	        range == 0 && range == 6;
	        //计算规则 >>> 获取时间范围 >>> (当前结束日期，今天的日期数) - 时间范围  = (星期一 ~ 星期X)
	        var Mark_Week_Start = today - range; //1-1 = 0
	        //console.log('-------range-----初始的Mark_Week_Start-----',range,Mark_Week_Start);
	        if (Mark_Week_Start < 1) {
	            //如果当前是一月，就要退到上一年的12月，不是一月的情况下直接当前月份自减1，然后用获得计算出来的月份的天数减去负数的天数就得到开始的时间是上一个月的几号
	            todayMonth == 1 ? (--todayYear, todayMonth = 12) : --todayMonth;
	            Mark_Week_Start = thisMonthDays(todayYear, todayMonth) + Mark_Week_Start;
	        }
	        //console.log('---时间范围-Mark_Week_Start--thisMonthDays(todayYear,todayMonth)-------------',range,Mark_Week_Start,thisMonthDays(todayYear,todayMonth));
	        return Mark_Week_Start;
	    }(),
	    //初始的星期几
	    Mark_Week_Over: new Date().getDate(),
	    reqStart: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' 00:00:00',
	    reqOver: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' 23:59:59'
	};

	var History = exports.History = function (_BaseComponent) {
	    _inherits(History, _BaseComponent);

	    function History(props) {
	        _classCallCheck(this, History);

	        var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store);
	        _this.changeLines = _this.changeLines.bind(_this);
	        _this.back = _this.back.bind(_this);
	        return _this;
	    }

	    _createClass(History, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //曲线页面不需要实时刷新，全部被动请求 //Actions.intervalData();
	            _Actions.Actions.echartsLines({ type: 0, part: 1, reqStart: appData.reqStart, reqOver: appData.reqOver });
	            var navHeight = this.refs.changeArea.offsetHeight;
	            this.setState({
	                navHeight: navHeight + 1,
	                dataHeight: window.screen.height - navHeight
	            });
	            //console.log('nav',navHeight);
	        }
	    }, {
	        key: 'changeLines',
	        value: function changeLines(e) {
	            //选中的不能再选中
	            if (e.currentTarget.getAttribute('class') === 'flex-cell on') return false;
	            if (e.currentTarget.getAttribute('class') === 'flex-cell mode on') return false;
	            var nowMonth = new Date().getMonth() + 1;
	            var nowYear = new Date().getFullYear();
	            var nowDay = new Date().getDate();
	            //点击事件获取到的当前模块的对应索引，日周月索引和测试部位索引共用一个
	            var index = e.currentTarget.getAttribute('data-index');
	            //按固定时间点击事件
	            if (e.currentTarget.getAttribute('data-type') === 'date') {
	                //@type 日期类型 按日选一个接口，按月和周选共用一个接口
	                //1、其实也是和固定时间请求一样使用两个接口，但前端手动计算出开始和结束的时间范围来请求
	                //2、若范围为1，则请求，按日请求的接口，若范围为周或月，则按周或月共用的接口请求，只是更改了请求参数的开始和结束时间
	                appData.year = nowYear;
	                appData.month = nowMonth;
	                appData.type = parseInt(index);
	                //按天>>>重置范围选择的开始时间初始值
	                if (appData.type == 0) {
	                    appData.start = appData.Mark_Week_Over;
	                    appData.over = appData.start;
	                }
	                var range = new Date().getDay() + 1;
	                //按周>>>重置范围选择的开始时间初始值
	                if (appData.type == 1) {
	                    appData.start = appData.Mark_Week_Start;
	                    appData.over = appData.Mark_Week_Over;
	                }
	                //按月>>>重置范围选择的开始时间初始值
	                if (appData.type == 2) {
	                    appData.start = 1;
	                    appData.over = appData.Mark_Week_Over;
	                    //appData.over = 30;当前月，只是取到今天so注释掉
	                }
	                console.log('-----------重置开始时间appData.start--------range-----', appData.start, range);
	            }
	            //按时间范围点击事件
	            if (e.currentTarget.getAttribute('data-type') === 'minus') {
	                //按天减少
	                if (appData.type == 0) {
	                    //1月
	                    if (appData.month == 1) {
	                        --appData.year;
	                        appData.month = 12;
	                        appData.start = new Date(appData.year, 12, 0).getDate();
	                    } else {
	                        if (appData.start == 1) {
	                            --appData.month;
	                            appData.start = new Date(appData.year, appData.month, 0).getDate();
	                        } else {
	                            --appData.start;
	                        }
	                    }
	                    //按天减少时,开始和结束都是一天,只是时刻不同
	                    appData.over = appData.start;
	                    console.log('----------------appData.year------appData.month- start--', appData.year, appData.month, appData.start);
	                }
	                //按周减少
	                if (appData.type == 1) {
	                    appData.over = appData.start - 1; //结束时间直接等于开始时间，但是中间多了一天，所以要再减去一天
	                    appData.start = appData.start - 7; //开始时间直接减去天就好

	                    //当start-7小于1的情况 0 对应上个月最后一天
	                    if (appData.start < 1) {
	                        if (appData.month == 1) {
	                            --appData.year;
	                            appData.month = 12;
	                            appData.start = new Date(appData.year, appData.month, 0).getDate() + appData.start;
	                        } else {
	                            --appData.month;
	                            appData.start = new Date(appData.year, appData.month, 0).getDate() + appData.start;
	                        }
	                    }
	                    //console.log('-----appData.year--appData.month---------appData.start----appData.over----',appData.year,appData.month,appData.start,appData.over)
	                }
	                //按月减少
	                if (appData.type == 2) {
	                    if (appData.month == 1) {
	                        --appData.year;
	                        appData.month = 12;
	                        appData.start = 1;
	                    } else {
	                        --appData.month;
	                    }
	                    appData.over = new Date(appData.year, appData.month, 0).getDate();
	                    //console.log('-----appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
	                }
	            }
	            if (e.currentTarget.getAttribute('data-type') === 'plus') {
	                //console.log('--------------nowYear--nowMonth--nowDay-----',nowYear,nowMonth,nowDay);
	                if (appData.month == nowMonth && appData.year == nowYear && appData.over == nowDay) {
	                    het.toast('亲，只能查看今天以前的数据哦~');
	                    // console.log('-----appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
	                    return false;
	                }
	                //按日增加
	                if (appData.type == 0) {
	                    //每个月中最大的一天
	                    var maxDay = new Date(appData.year, appData.month, 0).getDate();
	                    ++appData.over;
	                    if (appData.over > maxDay) {
	                        if (appData.month == 12) {
	                            ++appData.year;
	                            appData.month = 1;
	                        } else {
	                            ++appData.month;
	                        }
	                        appData.over = 1;
	                    }
	                    appData.start = appData.over;
	                    //console.log('----------------appData.year------appData.month-over--',appData.year,appData.month,appData.over)
	                }
	                //按周增加
	                if (appData.type == 1) {
	                    appData.start = appData.over + 1; //结束时间直接等于开始时间，但是中间多了一天，所以要再减去一天
	                    appData.over = appData.over + 7;
	                    var _maxDay = new Date(appData.year, appData.month, 0).getDate();
	                    //console.log('----------------maxDay--',maxDay);
	                    //当start-7小于1的情况 0 对应上个月最后一天
	                    if (appData.over > _maxDay) {
	                        if (appData.month == 12) {
	                            ++appData.year;
	                            appData.month = 1;
	                        } else {
	                            ++appData.month;
	                        }
	                        appData.over = appData.over - _maxDay;
	                    }

	                    if (appData.month == nowMonth && appData.start == appData.Mark_Week_Start) {
	                        //console.log('---------------------------本月---Mark_Week_Over--Mark_Week_Start----------------',appData.Mark_Week_Start,appData.Mark_Week_Over);
	                        appData.over = appData.Mark_Week_Over; //已经到了最后一周了，但可能今天并不是星期天，所以结束时间要回退到今天的星期值，这里只执行一次
	                    }
	                    //console.log('------appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
	                }
	                //按月增加
	                if (appData.type == 2) {
	                    appData.start = 1;
	                    //当前年就不用递增了
	                    if (appData.year < nowYear) {
	                        if (appData.month == 12) {
	                            ++appData.year;
	                            appData.month = 1;
	                            appData.over = appData.thisMonthDays(appData.year, appData.month);
	                        } else {
	                            ++appData.month;
	                            appData.over = appData.thisMonthDays(appData.year, appData.month);
	                        }
	                    } else {
	                        if (appData.month < nowMonth) {
	                            ++appData.month;
	                            appData.over = appData.thisMonthDays(appData.year, appData.month);
	                        }
	                        if (appData.month == nowMonth) {
	                            //如果等于了当前月，则重置当前月的结束时间为今天的时间
	                            appData.over = appData.Mark_Week_Over;
	                        }
	                    }
	                    //console.log('-------year--month---start--over-----',appData.year,appData.month,appData.start,appData.over)
	                };
	            }
	            //按部位点击事件
	            var part = appData.part; //part对应后台返回的部位顺寻，appData.part对应ui的部位顺序，后台返回的部位顺序并不与ui界面上展示的部位顺序一致，需要中转
	            if (e.currentTarget.getAttribute('data-type') === 'part') {
	                appData.part = parseInt(index);
	                if (appData.part == 1) part = 11;
	                if (appData.part == 2) part = 13;
	                if (appData.part == 3) part = 15;
	                if (appData.part == 4) part = 12;
	                if (appData.part == 5) part = 3;
	            }
	            //请求的必要参数
	            appData.reqStart = appData.year + '-' + appData.month + '-' + appData.start + ' 00:00:00';
	            appData.reqOver = appData.year + '-' + appData.month + '-' + appData.over + ' 23:59:59';
	            _Actions.Actions.echartsLines({
	                type: appData.type,
	                part: part,
	                reqStart: appData.reqStart,
	                reqOver: appData.reqOver
	            });
	            this.setState({
	                selectType: appData.type,
	                selectPart: appData.part
	            });
	            //console.log('-----------选中模式',e.currentTarget.getAttribute('data-idx'));
	        }
	        //<aside onTouchTap={this.handleTouchTap.bind(this)} className="console"></aside>

	    }, {
	        key: 'back',
	        value: function back(e) {
	            window.history.back();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log(JSON.stringify(this.state));
	            //app无法开关机
	            var modeArray = [];
	            var selectPart = this.state.selectPart != undefined ? this.state.selectPart : 1;
	            var selectEvent = this.selectEvent;
	            var selectPartArray = ['待机', '额头', '左脸', '右脸', '鼻子', '眼周', '手部'];
	            //选择类型
	            var selectType = this.state.selectType != undefined ? this.state.selectType : 0;
	            //运行状态展示框 >>> 由运行模式和运行状态计算得出
	            var runningStatus = this.state.runningStatus ? this.state.runningStatus : '';
	            var animationCss = 'initialize-animation';
	            //调试打印
	            //<aside className='console'>{' 调试打印: '}{' 在线: '+operate.online }</aside>
	            var screenHeight = window.screen.height;
	            var navHeight = this.state.navHeight + 'px';
	            var dataHeight = this.state.dataHeight + 'px';

	            //console.log('----------------------21----navHeight---dataHeight--',screenHeight,navHeight,dataHeight);
	            console.log('----按日-按周--按月--appData.type--', appData.start, appData.start + '~' + appData.over, appData.month, appData.type);
	            console.log('----年---月---开始--结束---', appData.year, appData.month, appData.start, appData.over);
	            var historyDate = appData.year + '.' + appData.month + '.' + appData.start;
	            if (appData.type == 0) historyDate = appData.year + '.' + appData.month + '.' + appData.start;
	            if (appData.type == 1) historyDate = appData.year + '.' + appData.month + '.' + appData.start + '~' + appData.year + '.' + appData.month + '.' + appData.over;
	            if (appData.type == 2) historyDate = appData.year + '.' + appData.month;
	            //测试曲线图
	            var echartsType = this.state.selectType || 0;
	            var configs = {
	                xAxis: this.state.xAxis || [],
	                xAxisLength: this.state.xAxis != 'undefined' ? 7 : 0,
	                water: this.state.water || [],
	                oil: this.state.oil || [],
	                elasticity: this.state.elasticity || [],
	                type: appData.type,
	                month: appData.month,
	                year: appData.year
	            };
	            console.log('------------------configs----------------', configs);
	            var EchartsLines = React.createElement(_EchartsDay.EchartsDay, { configs: configs });
	            if (echartsType == 0) EchartsLines = React.createElement(_EchartsDay.EchartsDay, { configs: configs });
	            if (echartsType == 1) EchartsLines = React.createElement(_EchartsDays.EchartsDays, { configs: configs });
	            if (echartsType == 2) EchartsLines = React.createElement(_EchartsDays.EchartsDays, { configs: configs });
	            var NavDate = React.createElement(
	                'figure',
	                { className: 'flex nav-select' },
	                ['日', '周', '月'].map(function (item, index) {
	                    return React.createElement(
	                        'i',
	                        { className: index == selectType ? "flex-cell on" : "flex-cell", 'data-index': index, 'data-type': 'date', key: index, onClick: this.changeLines },
	                        item
	                    );
	                }.bind(this))
	            );
	            var NavRange = React.createElement(
	                'figure',
	                { className: 'date-select' },
	                React.createElement('i', { 'data-type': 'minus', onClick: this.changeLines }),
	                React.createElement(
	                    'i',
	                    null,
	                    historyDate
	                ),
	                React.createElement('i', { 'data-type': 'plus', onClick: this.changeLines })
	            );
	            var NavParts = React.createElement(
	                'figure',
	                { className: 'flex place-select', ref: 'nav' },
	                selectPartArray.map(function (item, index) {
	                    return index > 0 && React.createElement(
	                        'div',
	                        { onTouchStart: this.changeLines, className: index == selectPart ? 'flex-cell mode on' : 'flex-cell mode',
	                            'data-type': 'part', key: index, 'data-index': index },
	                        React.createElement(
	                            'span',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                item
	                            )
	                        )
	                    );
	                }.bind(this))
	            );

	            return React.createElement(
	                'div',
	                { className: 'wrapper' },
	                React.createElement(
	                    'section',
	                    { className: 'history-change', ref: 'changeArea' },
	                    NavDate,
	                    NavRange,
	                    NavParts
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'history-echarts', style: { height: dataHeight } },
	                    EchartsLines
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return History;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsDay = undefined;

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var appData = {};
	var EchartsDay = exports.EchartsDay = React.createClass({
	    displayName: 'EchartsDay',
	    componentDidMount: function componentDidMount() {},

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        var _this = this;

	        //数据合并传入
	        var configs = nextProps.configs;
	        //构造首尾参数
	        var iWantArr = function iWantArr(a) {
	            a.splice(0, 0, 'first'), a.splice(a.length, 0, 'last');
	            return a;
	        };
	        //构造数据数组
	        var createArray = function createArray(length, type, range) {
	            var arr = [];
	            for (var i = 0; i < length; i++) {
	                if (type !== undefined && typeof range == "number") arr.push(Math.floor(Math.random() * range));else arr.push(i + 1);
	            }
	            return arr;
	        };
	        //动态接口数据
	        var xAxisData = configs.xAxis;
	        var xAxisSize = xAxisData.length;
	        var water = configs.water;
	        var oil = configs.oil;
	        var elasticity = configs.elasticity;
	        var data = [{ value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }, { value: 0, symbol: 'rect', symbolSize: 0 }];
	        //曲线数据重构
	        if (xAxisSize != 0) {
	            var arr0 = [];
	            var arr1 = [];
	            var arr2 = [];
	            var arr3 = [];
	            for (var i = 0; i < xAxisSize; i++) {
	                //曲线x轴参数数组
	                var str = xAxisData[i].substr(11, 5);
	                arr0.push(str);
	                //肌肤水质
	                var waterArr = { value: water[i], symbol: 'rect', symbolSize: 0 };
	                arr1.push(waterArr);
	                //肌肤油性
	                var oilArr = { value: oil[i], symbol: 'rect', symbolSize: 0 };
	                arr2.push(oilArr);
	                //肌肤弹性
	                var elasticityArr = { value: elasticity[i], symbol: 'rect', symbolSize: 0 };
	                arr3.push(elasticityArr);
	            }
	            xAxisData = arr0;
	            water = arr1;
	            oil = arr2;
	            elasticity = arr3;
	        } else {
	            xAxisData = [];
	            water = [];
	            oil = [];
	            elasticity = [];
	        }

	        console.log('-------x轴数据-----water-----oil----elasticity-', xAxisData, water, oil, elasticity);
	        setTimeout(function () {
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            //共用配置项
	            var xAxisDataDefault = ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00'];
	            var markLine = function markLine(size, yAxisValue) {
	                return [{
	                    coord: [0, yAxisValue || 40],
	                    symbol: 'none',
	                    label: {
	                        normal: {
	                            textStyle: {
	                                align: 'right'
	                            }
	                        }
	                    },
	                    lineStyle: {
	                        normal: {
	                            type: 'solid'
	                        }
	                    }
	                }, {
	                    coord: [size - 1 || 7, yAxisValue || 40],
	                    symbol: 'none',
	                    label: {
	                        normal: {
	                            textStyle: {
	                                align: 'right'
	                            }
	                        }
	                    },
	                    lineStyle: {
	                        normal: {
	                            type: 'solid'
	                        }
	                    }
	                }];
	            };
	            //曲线参数
	            var title = { show: false };
	            var grid = { show: false };
	            var tooltip = function tooltip(tipColor) {
	                return {
	                    show: false,
	                    trigger: 'axis',
	                    axisPointer: {
	                        lineStyle: {
	                            color: tipColor || '#65c4fb'
	                        }
	                    }
	                };
	            };
	            var toolbox = {
	                show: true,
	                feature: {
	                    dataZoom: {
	                        yAxisIndex: 'none'
	                    },
	                    dataView: { readOnly: false },
	                    magicType: { type: ['line', 'bar'] },
	                    restore: {},
	                    saveAsImage: {}
	                }
	            };
	            var xAxis = function xAxis(arr) {
	                return {
	                    type: 'category',
	                    boundaryGap: false,
	                    data: arr || xAxisDataDefault,
	                    axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: '#999'
	                        }

	                    },
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            color: '#dedede'
	                        }
	                    },
	                    axisTick: {
	                        show: false,
	                        interval: 0,
	                        alignWithLabel: true
	                    }
	                };
	            };
	            var yAxis = function yAxis(max, reg) {
	                return {
	                    type: 'value',
	                    min: 0,
	                    max: max || 100,
	                    splitNumber: 5, //100/5=20
	                    nameGap: 0,
	                    nameLocation: 'end',
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            color: '#dedede'
	                        }
	                    },
	                    axisLabel: {
	                        //把Y轴的第一个0替换成%或者''
	                        formatter: function formatter(value) {
	                            value = value + '';
	                            value == 0 && (value = reg);
	                            return value;
	                        },
	                        textStyle: {
	                            color: '#999'
	                        }
	                    },
	                    axisTick: {
	                        show: false
	                    }
	                };
	            };
	            var series = function series(config) {
	                return [{
	                    name: config.name || '肌肤水分',
	                    type: 'line',
	                    symbol: 'circle',
	                    symbolSize: 6,
	                    itemStyle: {
	                        normal: {
	                            color: config.markLineColor || 'red' || '#2796ec',
	                            label: {
	                                show: true,
	                                position: 'top',
	                                textStyle: {
	                                    fontWeight: '700',
	                                    fontSize: '12',
	                                    color: 'transparent'
	                                }

	                            },
	                            lineStyle: {
	                                color: config.lineColor || 'blue' || '#65c4fb'
	                            }
	                        }
	                    },
	                    data: config.data || data,
	                    markPoint: {
	                        data: [{
	                            type: 'max',
	                            name: '最大值',
	                            symbol: 'circle',
	                            symbolSize: 5,
	                            itemStyle: {
	                                normal: {
	                                    color: config.markPointColor || 'red' || '#2796ec',
	                                    label: {
	                                        show: true,
	                                        position: 'top',
	                                        textStyle: {
	                                            fontWeight: '700',
	                                            fontSize: '12',
	                                            color: '#e95d5d' //标记点字体颜色
	                                        },
	                                        formatter: function formatter(max) {
	                                            //console.log(max.value);
	                                            return max.value + (config.unit || '');
	                                        }
	                                    },
	                                    lineStyle: {
	                                        color: '#65c4fb'
	                                    }
	                                }
	                            }

	                        }, {
	                            type: 'min',
	                            name: '最小值',
	                            symbol: 'circle',
	                            symbolSize: 5,
	                            itemStyle: {
	                                normal: {
	                                    color: config.markPointColor || '#2796ec',
	                                    label: {
	                                        show: true,
	                                        position: 'top',
	                                        textStyle: {
	                                            fontWeight: '700',
	                                            fontSize: '12',
	                                            color: '#e95d5d' //标记点字体颜色
	                                        },
	                                        formatter: function formatter(min) {
	                                            //console.log(min.value);
	                                            return min.value + (config.unit || '');
	                                        }
	                                    },
	                                    lineStyle: {
	                                        color: '#65c4fb'
	                                    }
	                                }
	                            }
	                        }]
	                    },
	                    markLine: {
	                        silent: true,
	                        data: config.markLine
	                    },
	                    markArea: {
	                        label: {
	                            normal: {
	                                show: true,
	                                textStyle: {
	                                    color: "#788a9a",
	                                    fontSize: 12
	                                },
	                                formatter: function formatter(a, b, c) {
	                                    return c + '%';
	                                }
	                            }
	                        }
	                    }
	                }];
	            };
	            //水分曲线
	            var echartsWaterVdom = ReactDOM.findDOMNode(_this.refs.echartsWater),
	                echartsWaterOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip('#65c4fb'),
	                toolbox: toolbox,
	                xAxis: xAxis(xAxisData),
	                yAxis: yAxis(100, '%'),
	                series: series({
	                    name: '肌肤水质',
	                    markLine: [markLine(xAxisSize, 40)],
	                    markLineColor: '#2796ec',
	                    lineColor: 'yellow' || '#65c4fb',
	                    markPointColor: 'green' || '#2796ec',
	                    unit: '%',
	                    data: water || data
	                })
	            },
	                echartsWater = echarts.init(echartsWaterVdom);
	            echartsWater.setOption(echartsWaterOption);
	            //油性曲线
	            var echartsOilVdom = ReactDOM.findDOMNode(_this.refs.echartsOil),
	                echartsOilOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip('#9bd353'),
	                toolbox: toolbox,
	                xAxis: xAxis(xAxisData),
	                yAxis: yAxis(100, '%'),
	                series: series({
	                    name: '肌肤油性',
	                    markLine: [markLine(xAxisSize, 15), markLine(xAxisSize, 25)],
	                    markLineColor: '#7cba1a',
	                    lineColor: '#7cba1a' || '#65c4fb',
	                    markPointColor: '#74ba1a',
	                    unit: '%',
	                    data: oil || data
	                })
	            },
	                echartsOil = echarts.init(echartsOilVdom);
	            echartsOil.setOption(echartsOilOption);
	            //弹性曲线
	            var echartsElastiVdom = ReactDOM.findDOMNode(_this.refs.echartsElasti),
	                echartsElastiOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip('#ff9ddd'),
	                toolbox: toolbox,
	                xAxis: xAxis(xAxisData),
	                yAxis: yAxis(10, ''),
	                series: series({
	                    name: '肌肤弹性',
	                    markLine: [markLine(xAxisSize, 3.7)],
	                    markLineColor: '#ffcced',
	                    lineColor: '#ec61bc' || '#65c4fb',
	                    markPointColor: '#ec61bc',
	                    unit: '',
	                    data: elasticity || data
	                })
	            },
	                echartsElasti = echarts.init(echartsElastiVdom);
	            echartsElasti.setOption(echartsElastiOption);
	        }, 5000);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'echarts-wrapper' },
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-water.png' }),
	                    '\u6C34\u5206'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '40%\u4EE5\u4E0A\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsWater', ref: 'echartsWater' })
	            ),
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-oil.png' }),
	                    '\u6CB9\u6027'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '15~25%\u4E4B\u95F4\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsOil', ref: 'echartsOil' })
	            ),
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-elasticity.png' }),
	                    '\u5F39\u6027'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '3.7\u4EE5\u4E0A\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsElasti', ref: 'echartsElasti' })
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsDays = undefined;

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var appData = {};
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
	var EchartsDays = exports.EchartsDays = React.createClass({
	    displayName: 'EchartsDays',
	    componentDidMount: function componentDidMount() {
	        //let configs = this.props.configs;
	        //console.log('----------------------------',configs)
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        //console.log('------------nextProps----------------',nextProps)
	        //console.log('------------this.props----------------',this.props)
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        var _this = this;

	        var configs = nextProps.configs;
	        //console.log(configs,'-----------configs');
	        //console.log('------------nextProps----------------',nextProps);
	        //console.log('------------this.props----------------',this.props);
	        //console.log('------------nextState----------------',nextState);
	        //构造首尾参数
	        var iWantArr = function iWantArr(a) {
	            a.splice(0, 0, 'first'), a.splice(a.length, 0, 'last');
	            return a;
	        };
	        //构造数据数组
	        var createArray = function createArray(length, type, range) {
	            var arr = [];
	            for (var i = 0; i < length; i++) {
	                if (type !== undefined && typeof range == "number") arr.push(Math.floor(Math.random() * range));else arr.push(i + 1);
	            }
	            return arr;
	        };
	        //动态接口数据
	        var xAxisData = configs.xAxis;
	        var xAxisLength = configs.xAxisLength;
	        var water = configs.water;
	        var oil = configs.oil;
	        var elasticity = configs.elasticity;
	        var xAxisDataSpecial = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
	        //构造X轴类目值 type:0 按天的时刻，显示折线图，这个展示需求未定，按取到的数据展示,type:1 按周的天数，显示柱状图，最多展示7天的数据,type:2 按月的天数显示柱状图，最多31天的数据
	        if (configs.type == 0) {
	            //if(xAxisData.length!=0){
	            //    xAxisData =  ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
	            //    xAxisDataSpecial = xAxisData;
	            //}else{
	            //    xAxisData = ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
	            //    water = [0,0,0,0,0,0,0];
	            //    oil = water;
	            //    elasticity = water;
	            //}
	        }
	        if (configs.type == 1) {
	            if (xAxisData.length != 0) {
	                (function () {
	                    var arr = [];
	                    xAxisData.map(function (item) {
	                        var str = item.substr(5, 5);
	                        str = str.replace('-', '.');
	                        arr.push(str);
	                    });
	                    //console.log(arr,xAxisData,xAxisDataSpecial,xAxisData.length);
	                    xAxisData = arr;
	                })();
	            } else {
	                xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
	                water = [0, 0, 0, 0, 0, 0, 0];
	                oil = water;
	                elasticity = water;
	            }
	        }
	        if (configs.type == 2) {
	            if (xAxisData.length != 0) {
	                var thisMonthDays = new Date(configs.year, configs.month, 0).getDate();
	                var tempArr = createArray(thisMonthDays);
	                tempArr.splice(0, 1, configs.month + '月1日');
	                console.log(tempArr);
	                xAxisData = tempArr;
	                xAxisDataSpecial = xAxisData;
	            } else {
	                xAxisData = createArray(30);
	                water = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	                oil = water;
	                elasticity = water;
	            }
	        }

	        //曲线基础数据配置，转换
	        var month = configs.month || new Date().getMonth() + 1;
	        var firstDay = month + '月1日';
	        var len = xAxisData.length; //刻度线长度用于，markLine需要用到该参数
	        var Water = createArray(31, 'random', 100);
	        var Oil = createArray(31, 'random', 100);
	        var Elasti = createArray(31, 'random', 10);

	        var dataWater = iWantArr(Water);
	        var dataOil = iWantArr(Oil);
	        var dataElasti = iWantArr(Elasti);
	        //xAxis类目轴日期默认数组
	        var xAxisDataDefault = createArray(30) || 22;
	        xAxisDataDefault = createArray(30);
	        xAxisDataDefault.splice(0, 1, firstDay);
	        xAxisDataDefault = iWantArr(xAxisDataDefault);
	        //console.log('xAxisDataDefault', xAxisDataDefault);
	        setTimeout(function () {
	            var _ref, _ref2;

	            //共用项参数
	            var title = {
	                show: false,
	                text: '净水量(L)',
	                textStyle: {
	                    color: "#949494",
	                    fontSize: 16
	                },
	                icon: "image:/../../static/img/linetitle.png",
	                padding: [10, 0, 7, 55]
	            };
	            var legend = { show: false };
	            var grid = { show: false, x: '10%', top: '27%', width: '86%', height: '58%' };
	            var tooltip = {
	                show: false,
	                trigger: 'axis',
	                textStyle: {
	                    color: '#fff'
	                },
	                axisPointer: {
	                    type: 'shadow'
	                },
	                formatter: function formatter(params) {

	                    console.log('params------------------------------------', params);
	                    var tar = params[0];
	                    // console.log('------------------------------------first---', tar)
	                    if (tar.data != 'first' && tar.data != 'last') {
	                        var obj = '';
	                        /*if((tar.name).indexOf('月')!=-1){
	                         obj = month + tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
	                         }else{
	                         obj = month + '月'+tar.name+'日' + '<br/>' + tar.seriesName + ' : ' + tar.value;
	                         }*/
	                        obj = month + '月' + tar.name + '日' + '<br/>' + tar.seriesName + ' : ' + tar.value;
	                        return obj;
	                    } else {
	                        return '';
	                    }
	                }
	            };
	            var toolbox = {
	                show: false,
	                feature: {
	                    dataZoom: {
	                        yAxisIndex: 'none'
	                    },
	                    dataView: { readOnly: false },
	                    magicType: { type: ['line', 'bar'] }
	                }
	            };
	            var xAxis = [(_ref = {
	                type: 'category',
	                boundaryGap: false,
	                data: xAxisData || xAxisDataDefault,
	                nameLocation: 'end'
	            }, _defineProperty(_ref, 'boundaryGap', false), _defineProperty(_ref, 'axisLabel', {
	                show: true,
	                margin: 8,
	                rotate: 0,
	                textStyle: {
	                    color: '#999'
	                },
	                interval: 9 /*9*/,
	                formatter: function formatter(value) {
	                    //暂不添加本部分逻辑
	                    //value === 'first' && (value = month+'月1日');
	                    //value === 'last' && (value = 30);
	                    return value;
	                }
	            }), _defineProperty(_ref, 'axisLine', {
	                show: true,
	                lineStyle: {
	                    color: '#dedede'
	                }
	            }), _defineProperty(_ref, 'axisTick', {
	                show: false,
	                interval: 0,
	                alignWithLabel: true
	                //length: 20
	            }), _ref)];
	            var xAxisSpecial = [(_ref2 = {
	                type: 'category',
	                boundaryGap: false,
	                data: xAxisDataSpecial || xAxisDataDefault,
	                nameLocation: 'end'
	            }, _defineProperty(_ref2, 'boundaryGap', false), _defineProperty(_ref2, 'axisLabel', {
	                show: true,
	                margin: 8,
	                rotate: 0,
	                textStyle: {
	                    color: '#999'
	                },
	                interval: 9 /*9*/,
	                formatter: function formatter(value) {
	                    value === 'first' && (value = month + '月1日');
	                    value === 'last' && (value = 30);
	                    return value;
	                }
	            }), _defineProperty(_ref2, 'axisLine', {
	                show: true,
	                lineStyle: {
	                    color: '#dedede'
	                }
	            }), _defineProperty(_ref2, 'axisTick', {
	                show: false,
	                interval: 0,
	                alignWithLabel: true
	                //length: 20
	            }), _ref2)];
	            var yAxis = function yAxis(type) {
	                var yAxisData = {
	                    type: 'value',
	                    min: 0,
	                    max: 100,
	                    splitNumber: 5, //分成5份
	                    nameGap: 0,
	                    nameLocation: 'end',
	                    axisLine: {
	                        show: true,
	                        lineStyle: {
	                            color: '#dedede'
	                        }
	                    },
	                    axisLabel: {
	                        formatter: function formatter(value) {
	                            value == 0 && (value = '(%)');
	                            return value;
	                        },
	                        textStyle: {
	                            color: '#999'
	                        }
	                    },
	                    axisTick: {
	                        show: false
	                    },
	                    splitLine: {
	                        show: true,
	                        lineStyle: {
	                            type: 'solid',
	                            opacity: .5
	                        }
	                    }
	                };
	                if (type == 'decimal') {
	                    yAxisData.max = 10;
	                    yAxisData.axisLabel.formatter = function (value) {
	                        value = value + '.0';
	                        value == 0 && (value = '');
	                        return value;
	                    };
	                };
	                //  console.log(yAxisData, '-----------------------------------------')
	                return yAxisData;
	            };
	            var series = function series(config) {
	                return [{
	                    name: config.labelName || '肌肤水分',
	                    type: 'bar',
	                    stack: '总量',
	                    label: {
	                        normal: {
	                            show: false
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            color: config.barColor || '#65c4fb',
	                            barBorderRadius: [4, 4, 4, 4]
	                        }
	                    },
	                    barWidth: 8,
	                    barGap: 10,
	                    barCategoryGap: '20%',
	                    data: config.data || [12, 12, 1, 2, 2, 3, 10],
	                    markLine: {
	                        silent: true,
	                        lineStyle: {
	                            normal: {
	                                type: 'solid',
	                                color: config.markLineColor || '#9bd353',
	                                curveness: 18
	                            },
	                            emphasis: {
	                                width: 12
	                            }
	                        },
	                        symbol: 'none',
	                        label: {},
	                        data: function () {
	                            //传入一个刻度值，传几个刻度值，渲染几条
	                            var arr = [];
	                            config.coord.map(function (value, index) {
	                                var item = [{ coord: [0, value] }, { coord: [len - 1, value] }];
	                                arr.push(item);
	                                // console.log(arr);
	                                return arr;
	                            });
	                            return arr;
	                        }() || [[{ coord: [0, 15] }, { coord: [len - 1, 15] }], [{ coord: [0, 25] }, { coord: [len - 1, 25] }]]
	                    },
	                    markArea: {
	                        label: {
	                            normal: {
	                                show: false,
	                                textStyle: {
	                                    color: "#788a9a",
	                                    fontSize: 12
	                                },
	                                formatter: function formatter(a, b, c) {
	                                    return c + '%';
	                                }
	                            }
	                        }
	                    }
	                }];
	            };
	            if (nextProps) {}
	            //水分曲线
	            var echartsWaterVdom = document.querySelector('#echartsWater') || ReactDOM.findDOMNode(_this.refs.echartsWater),
	                echartsWaterOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip,
	                toolbox: toolbox,
	                legend: legend,
	                xAxis: xAxisSpecial,
	                yAxis: yAxis(),
	                series: series({
	                    labelName: '肌肤',
	                    barColor: '#65c4fb',
	                    data: water || dataWater,
	                    markLineColor: '#65c4fb',
	                    coord: [40] //markLine's yAxis
	                })
	            },
	                echartsWater = echarts.init(echartsWaterVdom);
	            echartsWater.setOption(echartsWaterOption);
	            //油性曲线
	            var echartsOilVdom = document.querySelector('#echartsOil') || ReactDOM.findDOMNode(_this.refs.echartsOil),
	                echartsOilOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip,
	                toolbox: toolbox,
	                legend: legend,
	                xAxis: xAxis,
	                yAxis: yAxis(),
	                series: series({
	                    labelName: '油性',
	                    barColor: '#9bd353',
	                    data: oil || dataOil,
	                    markLineColor: '#9bd353',
	                    coord: [15, 25] //markLine's yAxis
	                })
	            },
	                echartsOil = echarts.init(echartsOilVdom);
	            echartsOil.setOption(echartsOilOption);
	            //弹性曲线
	            var echartsElastiVdom = document.querySelector('#echartsElasti') || ReactDOM.findDOMNode(_this.refs.echartsElasti),
	                echartsElastiOption = {
	                title: title,
	                grid: grid,
	                tooltip: tooltip,
	                toolbox: toolbox,
	                legend: legend,
	                xAxis: xAxis,
	                yAxis: yAxis('decimal'),
	                series: series({
	                    labelName: '油性',
	                    barColor: '#ff9ddd',
	                    data: elasticity || dataElasti,
	                    markLineColor: '#ff9ddd',
	                    coord: [3.7] //markLine's yAxis
	                })
	            },
	                echartsElasti = echarts.init(echartsElastiVdom);
	            echartsElasti.setOption(echartsElastiOption);
	        }, 5);
	    },
	    render: function render() {
	        var configData = this.props.configs;
	        //console.log('--------------&&&&&&&&--------------',configData);

	        return React.createElement(
	            'div',
	            { className: 'echarts-wrapper' },
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-water.png' }),
	                    '\u6C34\u5206'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '40%\u4EE5\u4E0A\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsWater', ref: 'echartsWater' })
	            ),
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-oil.png' }),
	                    '\u6CB9\u6027'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '15~25%\u4E4B\u95F4\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsOil', ref: 'echartsOil' })
	            ),
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('img', { src: '../static/img/i-history-elasticity.png' }),
	                    '\u5F39\u6027'
	                ),
	                React.createElement(
	                    'h4',
	                    null,
	                    '3.7\u4EE5\u4E0A\u4E3A\u6B63\u5E38\u8303\u56F4'
	                ),
	                React.createElement('div', { id: 'echartsElasti', ref: 'echartsElasti' })
	            )
	        );
	    }
	});
	//////////////////////////////////////////
	//////////////////////////////////////////
	//////////////////////////////////////////                          

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MeasureParts = undefined;

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var iScroll = null;
	var MeasureParts = exports.MeasureParts = React.createClass({
		displayName: 'MeasureParts',
		componentDidMount: function componentDidMount() {
			//let navHeight = this.refs.nav.offsetHeight;
			//this.props.childSetState({navHeight: navHeight})//子组件通过回调函数的方式传参数给父组件
			iScroll = new IScroll('#iScroll', {
				eventPassthrough: true,
				scrollX: true,
				scrollY: false,
				preventDefault: false
			});
		},

		render: function render() {
			var selectPart = this.props.selectPart;
			var part = this.props.part;
			var partArr = this.props.partArr;
			var Btns = partArr.map(function (item, index) {
				return index > 0 && React.createElement(
					'li',
					{ key: index, ref: 'part', 'data-part': index, className: index == part && part != '' ? 'mode on' : 'mode', onClick: selectPart },
					React.createElement('img', { src: '../static/img/btns/i-nav-' + index + (index == part && part != '' ? '-on.png' : '-off.png') }),
					React.createElement(
						'span',
						null,
						item
					)
				);
			}.bind(this));
			return React.createElement(
				'figure',
				{ id: 'iScroll' },
				React.createElement(
					'div',
					{ id: 'scroller' },
					React.createElement(
						'ul',
						null,
						Btns
					)
				)
			);
		}
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MeasureStatus = undefined;

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var appData = {
		markNum: 0,
		animaBoxCss: 'status-main'
	};
	var MeasureStatus = exports.MeasureStatus = React.createClass({
		displayName: 'MeasureStatus',
		componetDidMount: function componetDidMount() {},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var measureStatus = nextProps.statusState.measureStatus;
			/*if(part!=0 && appData.markNum==0){
	   appData.markNum = part;
	   Actions.measureStatus({
	   measureStatus: 2
	   })
	   }*/
			console.log(measureStatus, nextProps, '-measureStatus-nextProps');

			if (measureStatus == 1) appData.animaBoxCss = 'status-main initialize';
			if (measureStatus == 2) appData.animaBoxCss = 'status-main measuring';
		},

		render: function render() {
			var config = this.props.statusState;
			var part = config.part;
			var battery = config.battery;
			var statusMain = config.statusMain;
			var testingCss = config.testingCss;
			var testingAnima = config.testingAnima;

			var statusSub = '',
			    statusSubCss = '',
			    Battery = '';
			if (battery < 20) {
				statusSub = '设备电量低，请及时充电', statusSubCss = 'battery-low', Battery = React.createElement(
					'figure',
					{ className: 'status-sub' },
					React.createElement('img', { src: '../static/img/i-battery-low.png' }),
					statusSub
				);
			}
			console.log(config, Battery);

			//进入页面默认状态
			var animaBoxCss = appData.animaBoxCss;
			//初始化，请将设备贴近额头，测试中动画，是一个连续的动画过程，最后一个等到

			var showResult = 'status-area';
			if (config.measureResult == true) showResult = 'status-area hide';
			return React.createElement(
				'section',
				{ className: showResult },
				React.createElement(
					'figure',
					{ className: animaBoxCss },
					React.createElement(
						'i',
						{ ref: 'circle', className: testingCss },
						testingAnima
					),
					React.createElement(
						'p',
						{ className: part == 0 ? 'status-main' : 'hide' },
						statusMain
					)
				),
				Battery
			);
		}
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MeasureResult = undefined;

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var MeasureResult = exports.MeasureResult = React.createClass({
		displayName: 'MeasureResult',
		componetDidMount: function componetDidMount() {},

		render: function render() {
			var data = this.props.resultState,
			    dataHeight = data.dataHeight,
			    part = data.part,
			    water = data.water,
			    oil = data.oil,
			    elasticity = data.elasticity,
			    skinTypeName = data.skinTypeName,
			    skinAreaRank = '\u6D4B\u8BD5\u7ED3\u679C\u8868\u660E\uFF0C\u60A8\u5F53\u524D\u7684\u80A4\u8D28\u4F18\u4E8E' + data.skinAreaRank + '%\u7684\u540C\u9F84\u7528\u6237',
			    skinProblem = data.skinProblem,
			    skinGuide = data.skinGuide,
			    showResult = 'data-area' + (data.measureResult == false ? ' hide' : ''),
			    reMeasure = data.reMeasure;
			return React.createElement(
				'section',
				{ className: showResult, style: { height: dataHeight } },
				React.createElement(
					'section',
					{ className: 'test-again' },
					React.createElement(
						'h5',
						null,
						part
					),
					React.createElement(
						'h4',
						null,
						skinTypeName
					),
					React.createElement(
						'button',
						{ ref: 'history', onTouchTap: reMeasure },
						'\u91CD\u65B0\u6D4B\u8BD5'
					)
				),
				React.createElement(
					'section',
					{ className: 'test-data' },
					React.createElement(
						'figure',
						{ id: 'water' },
						React.createElement(
							'h5',
							{ className: 'item' },
							'\u6C34\u5206',
							React.createElement(
								'b',
								null,
								water
							),
							React.createElement(
								'span',
								null,
								'%'
							)
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u7F3A\u6C34'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u6B63\u5E38'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u6E7F\u6DA6'
							)
						),
						React.createElement(
							'p',
							{ className: 'flex colorful water' },
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('b', { style: { left: water + '%' } })
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tal' },
								'00'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac', style: { textIndent: '-2.1rem' } },
								'40%'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac', style: { textIndent: '2.2rem' } },
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
						{ id: 'oil' },
						React.createElement(
							'h5',
							{ className: 'item' },
							'\u6CB9\u6027',
							React.createElement(
								'b',
								null,
								oil
							),
							React.createElement(
								'span',
								null,
								'%'
							)
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u7F3A\u6CB9'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u6B63\u5E38'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u504F\u6CB9'
							)
						),
						React.createElement(
							'p',
							{ className: 'flex colorful oil' },
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('b', { style: { left: oil + '%' } })
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tal' },
								'00'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac', style: { textIndent: '-2.1rem' } },
								'40%'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac', style: { textIndent: '2.2rem' } },
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
						{ id: 'elasticity' },
						React.createElement(
							'h5',
							{ className: 'item' },
							'\u5F39\u6027',
							React.createElement(
								'b',
								null,
								elasticity
							)
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tac' },
								'\u6613\u76B1\u7EB9'
							),
							React.createElement('span', { className: 'flex-cell tac' }),
							React.createElement(
								'span',
								{ className: 'flex-cell tal', style: { textIndent: '-1rem' } },
								'\u7D27\u81F4'
							)
						),
						React.createElement(
							'p',
							{ className: 'flex colorful elasticity' },
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('i', { className: 'flex-cell' }),
							React.createElement('b', { style: { left: elasticity * 10 + '%' } })
						),
						React.createElement(
							'p',
							{ className: 'flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell tal' },
								'00'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell tac', style: { textIndent: '-2.1rem' } },
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
						'aside',
						{ className: 'test-result' },
						skinAreaRank
					),
					React.createElement(
						'aside',
						{ className: 'test-intro' },
						React.createElement(
							'h4',
							null,
							'\u80A4\u8D28\u95EE\u9898'
						),
						React.createElement(
							'p',
							null,
							skinProblem
						)
					),
					React.createElement(
						'aside',
						{ className: 'test-suggest' },
						React.createElement(
							'h4',
							null,
							'\u62A4\u80A4\u6307\u5357'
						),
						React.createElement(
							'p',
							null,
							skinGuide
						)
					)
				)
			);
		}
	});

/***/ }
/******/ ]);