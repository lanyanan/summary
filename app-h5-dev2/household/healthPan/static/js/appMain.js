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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
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
	'local', //回退不会促发repaint，在constructor里调用该方法，获取到保存在全局变量（缓存姑且叫做缓存吧）里的状态字段
	'slide', //滑出模式选择
	'cancel', //取消按钮
	'cancelSelect', 'submitSelect', 'selectMode', 'changeMode']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 * @modeArray 后台未返回模式数组或对象，建立一个本地数组用作维护
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(4);

	var modeArray = [{ id: 0, name: '模式', fire: false }, { id: 1, name: '火锅', fire: '武火', heatinghour: 0, heatingmin: 15 }, { id: 2, name: '蒸鱼', fire: false, heatinghour: 0, heatingmin: 15 }, { id: 3, name: '蒸蛋', fire: false, heatinghour: 0, heatingmin: 16 }, { id: 4, name: '包子', fire: false, heatinghour: 0, heatingmin: 18 }, { id: 5, name: '馒头', fire: false, heatinghour: 0, heatingmin: 22 }, { id: 6, name: '排骨', fire: false, heatinghour: 0, heatingmin: 24 }, { id: 7, name: '蒸饭', fire: false, heatinghour: 0, heatingmin: 35 }, { id: 8, name: '保温', fire: false, heatinghour: 1, heatingmin: 0 }, { id: 9, name: '自定时', fire: false, heatinghour: 0, heatingmin: 20 }];
	var appData = {
	    timer: null
	};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    YunXingGongZuoMoShi: 0,
	    YunXingHuoLiSheZhi: 0,
	    YuYueShiJianXiaoShi: 0,
	    YuYueShiJianFenZhong: 0,
	    ShengYuShiJianXiaoShi: 0,
	    ShengYuShiJianfenZhong: 0
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

	        //开启数据筛选
	        var data = dataFilter(datas);
	        //缓存数据到appData里，协议定义中文>_<，中转一下字段发送
	        appData.modeArray = modeArray;
	        //控件显隐应该本地维护，不应该在这里设置，会一直导致控件隐藏  if(data.selectshow) appData.selectshow = data.selectshow;
	        //控制数据(选择控件)
	        if (data.GongZuoMoShiSheZhi != undefined) appData.mode = data.GongZuoMoShiSheZhi, appData.modeName = modeArray[data.GongZuoMoShiSheZhi].name;
	        if (data.YuYueShiJianSheZhiXiaoShi != undefined) appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
	        if (data.YuYueShiJianSheZhiFenZhong != undefined) appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
	        if (data.HuoLiSheZhi != undefined) appData.fire = data.HuoLiSheZhi;
	        if (data.JiaReShiJianSheZhiXiaoShi != undefined) appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
	        if (data.JiaReShiJianSheZhiFenZhong != undefined) appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;
	        //运行数据
	        if (data.YunXingGongZuoMoShi != undefined) appData.runningMode = data.YunXingGongZuoMoShi, appData.runningModeName = modeArray[data.YunXingGongZuoMoShi].name; //运行工作模式
	        //运行火力设置
	        if (data.YunXingHuoLiSheZhi != undefined) appData.runningFire = data.YunXingHuoLiSheZhi;
	        //剩余预约时间
	        if (data.YuYueShiJianXiaoShi != undefined) appData.surplusreservehour = data.YuYueShiJianXiaoShi;
	        if (data.YuYueShiJianFenZhong != undefined) appData.surplusreservemin = data.YuYueShiJianFenZhong;
	        //剩余加热时间
	        if (data.ShengYuShiJianXiaoShi != undefined) appData.surplusworkhour = data.ShengYuShiJianXiaoShi;
	        if (data.ShengYuShiJianfenZhong != undefined) appData.surplusworkmin = data.ShengYuShiJianfenZhong;
	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable) appData.networkavailable = data.networkavailable;
	        if (data.GaoWenBaoHu != undefined) appData.hightemperature = data.GaoWenBaoHu;
	        if (data.GanShaoBaoHu != undefined) appData.dryburning = data.GanShaoBaoHu;
	        if (data.ChuanGanQiKaiLuGuZhang != undefined) appData.opencircuit = data.ChuanGanQiKaiLuGuZhang;
	        if (data.ChuanGanQiDuanLuGuZhang != undefined) appData.shortcircuit = data.ChuanGanQiDuanLuGuZhang;
	        this.trigger(appData);
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(appData);
	    },
	    onCancel: function onCancel(data) {
	        data.hideNativeLoading = true;
	        data.updateFlag = het.hexUpFlag(3, 1, 2);
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = 0;
	        appData.modeName = '模式';

	        //控制数据
	        appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
	        appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
	        appData.fire = data.HuoLiSheZhi;
	        appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
	        appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;

	        //开启定时筛选(待机只有这两个字段需要筛选)
	        setDataTimer('YunXingGongZuoMoShi', 'YunXingHuoLiSheZhi');
	        //运行数据
	        appData.runningMode = 0;
	        appData.runningModeName = '模式';
	        appData.runningFire = 1;
	        this.trigger(appData);
	        //console.log('取消',data);
	    },
	    onCancelSelect: function onCancelSelect() {
	        this.trigger({ selectshow: false });
	    },
	    onSubmitSelect: function onSubmitSelect(h, m, where, live) {
	        if (live == true) {
	            var liveSend = {};
	            het.setTitle('{"hideNativeLoading":"true"}');
	            //实时火力设置
	            if (where == 1) {
	                liveSend.updateFlag = het.hexUpFlag(0, 1, 2);
	                liveSend.HuoLiSheZhi = 0;
	                h == '武' && (liveSend.HuoLiSheZhi = 0);
	                h == '文' && (liveSend.HuoLiSheZhi = 1);
	                het.send(liveSend, function (data) {}, function (data) {
	                    het.toast("命令发送失败");
	                });

	                //开启定时筛选
	                setDataTimer('YunXingHuoLiSheZhi');
	                appData.fire = liveSend.HuoLiSheZhi;
	                appData.runningFire = liveSend.HuoLiSheZhi;
	                this.trigger({
	                    fire: liveSend.HuoLiSheZhi,
	                    runningFire: liveSend.HuoLiSheZhi
	                });
	            }
	            //实时加热时间设置
	            if (where == 2) {
	                liveSend.updateFlag = het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2));
	                liveSend.JiaReShiJianSheZhiXiaoShi = 0;
	                liveSend.JiaReShiJianSheZhiFenZhong = parseInt(h);
	                h == 60 && (liveSend.JiaReShiJianSheZhiXiaoShi = 1, liveSend.JiaReShiJianSheZhiFenZhong = 60);
	                het.send(liveSend, function (data) {}, function (data) {
	                    het.toast("命令发送失败");
	                });

	                //开启定时筛选
	                setDataTimer('ShengYuShiJianXiaoShi', 'ShengYuShiJianfenZhong');
	                appData.surplusworkhour = liveSend.JiaReShiJianSheZhiXiaoShi;
	                appData.surplusworkmin = liveSend.JiaReShiJianSheZhiFenZhong;
	                this.trigger({
	                    surplusworkhour: liveSend.JiaReShiJianSheZhiXiaoShi,
	                    surplusworkmin: liveSend.JiaReShiJianSheZhiFenZhong
	                });
	            }
	            //console.log('-h-m-where-live---liveData----加热--------',h,m,where,live,liveSend);
	        } else {
	            //非实时更改
	            var selectArray = {};
	            switch (parseInt(where)) {
	                //预约时间
	                case 0:
	                    selectArray.selectReservehour = h;
	                    selectArray.selectReservemin = m;
	                    if (h == 15) selectArray.selectReservemin = 0;
	                    break;
	                //火力
	                case 1:
	                    if (h == '武') selectArray.selectFire = 0;
	                    if (h == '文') selectArray.selectFire = 1;
	                    if (h == 0) selectArray.selectFire = 0;
	                    break;
	                //加热时间
	                case 2:
	                    //加热时间使用参数h作为分钟数的值
	                    selectArray.selectHeatinghour = 0;
	                    selectArray.selectHeatingmin = parseInt(h);
	                    if (h == 60) selectArray.selectHeatinghour = 1, selectArray.selectHeatingmin = 0;
	                    break;
	            }
	            this.trigger(selectArray);
	        }
	    },
	    onSlide: function onSlide(data) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        this.trigger(appData);
	    },
	    onSelectMode: function onSelectMode(data) {
	        this.trigger(data);
	    },
	    onChangeMode: function onChangeMode(data) {
	        //置位字段加入计算，其他的按协议或约定发送
	        var updateFlag = het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2)))));
	        if (data.GongZuoMoShiSheZhi == 0) updateFlag = het.hexUpFlag(3, 1, 2);
	        if (data.GongZuoMoShiSheZhi == 1) updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(3, 1, 2));
	        if (data.GongZuoMoShiSheZhi == 8) updateFlag = het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2)));
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        //用运行数据渲染，控制数据ios和android数据发送顺序表现不一致，日了狗了，又要发控制数据又要发运行数据
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = data.GongZuoMoShiSheZhi;
	        appData.modeName = modeArray[data.GongZuoMoShiSheZhi].name;

	        //控制数据
	        appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
	        appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
	        appData.fire = data.HuoLiSheZhi;
	        appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
	        appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;

	        //开启定时筛选，并使用运行数据渲染
	        setDataTimer('YunXingGongZuoMoShi', 'YunXingHuoLiSheZhi', 'YuYueShiJianXiaoShi', 'YuYueShiJianFenZhong', 'ShengYuShiJianXiaoShi', 'ShengYuShiJianfenZhong');

	        //运行数据 >>> 模式和模式名 >>> 剩余预约时间 >>> 剩余加热时间 维护运行数据的目的是开启数据筛选
	        appData.runningMode = data.GongZuoMoShiSheZhi;
	        appData.runningModeName = modeArray[data.GongZuoMoShiSheZhi].name;
	        appData.runningFire = data.HuoLiSheZhi;

	        appData.surplusreservehour = data.YuYueShiJianSheZhiXiaoShi;
	        appData.surplusreservemin = data.YuYueShiJianSheZhiFenZhong;

	        appData.surplusworkhour = data.JiaReShiJianSheZhiXiaoShi;
	        appData.surplusworkmin = data.JiaReShiJianSheZhiFenZhong;

	        this.trigger(appData);
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(7);

	var _FirstPage = __webpack_require__(8);

	var _SettingPage = __webpack_require__(10);

	var _Loading = __webpack_require__(9);

	var _Alert = __webpack_require__(11);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {
	    count: 0,
	    lastMode: 0,
	    lastRecordTime: 0,
	    slideClose: true,
	    slideCount: 0,

	    //故障数据计时器，防止一直刷，故障弹窗一直弹
	    counterDryburning: 0,
	    counterHightemperature: 0,
	    counterOpencircuit: 0,
	    counterShortcircuit: 0,

	    counterSurplus: 0,
	    //倒计时实时更改防止数据跳变，显隐定时器
	    timer: null
	};
	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        filter: {}
	    });
	});
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});
	//生命周期函数是否需要注册this，bind之后才能拿到传入的参数的实时值

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            mode: 0,
	            runningMode: 0,

	            online: 1,
	            networkavailable: 1,
	            dryburning: 0,
	            hightemperature: 0,
	            opencircuit: 0,
	            shortcircuit: 0,

	            isShowAlert: false,
	            countdownShow: false
	        };
	        _Actions.Actions.local();
	        _this.listenStore(_Store.Store);
	        _this.slide = _this.slide.bind(_this);
	        _this.cancel = _this.cancel.bind(_this);
	        //基于小时分钟自定义数组的时间选择组件,触发，取消，提交
	        _this.openClock = _this.openClock.bind(_this);
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        //故障&错误
	        _this.liveError = _this.liveError.bind(_this);
	        //子组件更改父组件字段
	        _this.childSetState = _this.childSetState.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle(JSON.stringify({
	                setNavTitle: 0,
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            alert("123123");
	        }
	    }, {
	        key: 'openClock',
	        value: function openClock(e) {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            var where = e.currentTarget.getAttribute('data-seat');
	            this.setState({
	                selectshow: true,
	                boot: where
	            });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            _Actions.Actions.cancelSelect();
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            //传入选择控件选中的小时数组和分钟数组
	            var me = this;
	            var where = this.state.boot;
	            var live = true;
	            _Actions.Actions.submitSelect(h, m, where, live);
	            //隐藏选择控件，调出菊花loading
	            this.setState({
	                loadingShow: true,
	                selectshow: false
	            });
	            //清除定时器，并开启定时器，菊花loading转5秒
	            clearTimeout(appData.timer);
	            appData.timer = setTimeout(function () {
	                me.setState({
	                    loadingShow: false
	                });
	            }, 5000);
	        }
	    }, {
	        key: 'slide',
	        value: function slide() {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            window.location.href = '#/settingPage';
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            var reserveOverIf = parseInt(this.state.surplusreservehour) + parseInt(this.state.surplusreservemin);
	            if (reserveOverIf != 0) {
	                //预约中直接取消
	                _Actions.Actions.cancel({
	                    countdownShow: false,
	                    GongZuoMoShiSheZhi: 0,

	                    YuYueShiJianSheZhiXiaoShi: 0,
	                    YuYueShiJianSheZhiFenZhong: 0,
	                    HuoLiSheZhi: 1,
	                    JiaReShiJianSheZhiXiaoShi: 0,
	                    JiaReShiJianSheZhiFenZhong: 0
	                });
	            } else {
	                //加热中点击取消，弹出取消提示对话框，关闭（取消）对话框逻辑在组件里完成，加热中的确认取消操作在下一个方法里执行
	                this.setState({ isShowAlert: true });
	            }
	        }
	    }, {
	        key: 'childSetState',
	        value: function childSetState(state, fn) {
	            var _this2 = this;

	            //加热中用户点击确认，执行取消命令，并关闭取消提示对话框
	            //0武火，1文火，待机文火
	            setTimeout(function () {
	                _this2.setState({ isShowAlert: state.isShowAlert });
	                state.sure && _Actions.Actions.cancel({
	                    countdownShow: false,
	                    GongZuoMoShiSheZhi: 0,
	                    YuYueShiJianSheZhiXiaoShi: 0,
	                    YuYueShiJianSheZhiFenZhong: 0,
	                    HuoLiSheZhi: 1,
	                    JiaReShiJianSheZhiXiaoShi: 0,
	                    JiaReShiJianSheZhiFenZhong: 0
	                });
	            }, 200);
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
	            if (this.state.dryburning == 1) {
	                return '{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}';
	            }
	            if (this.state.hightemperature == 1) {
	                return '{"title":"高温保护", "content":"高温保护", "button":"我知道了"}';
	            }
	            if (this.state.opencircuit == 1) {
	                return '{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
	            }
	            if (this.state.shortcircuit == 1) {
	                return '{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
	            }
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            //控制数据
	            var mode = this.state.mode != undefined ? this.state.mode : 0; /*this.state.mode!=undefined ?this.state.mode:'';*/
	            var modeName = this.state.modeName != undefined ? this.state.modeName : '模式';
	            var fire = this.state.fire != undefined ? this.state.fire : 0;

	            //控制数据
	            var runningMode = this.state.runningMode != undefined ? this.state.runningMode : 0;
	            var runningModeName = this.state.runningModeName != undefined ? this.state.runningModeName : '模式';
	            var runningFire = this.state.runningFire != undefined ? this.state.runningFire : 0;

	            if (mode != 0 && mode != 1) this.state.countdownShow = true;

	            var operate = {
	                //故障&&离线
	                online: this.state.online,
	                networkavailable: this.state.networkavailable ? this.state.networkavailable : 1,
	                hightemperature: this.state.hightemperature ? this.state.hightemperature : '',
	                dryburning: this.state.dryburning != undefined ? this.state.dryburning : '',
	                opencircuit: this.state.opencircuit != undefined ? this.state.opencircuit : '',
	                shortcircuit: this.state.shortcircuit != undefined ? this.state.shortcircuit : '',

	                //控制数据 全部使用运行数据渲染
	                mode: runningMode,
	                modeName: runningModeName,
	                fire: runningFire,

	                //仅供调试打印
	                runningMode: runningMode,
	                runningModeName: runningModeName,

	                reservehour: this.state.reservehour != undefined ? this.state.reservehour : '',
	                reservemin: this.state.reservemin != undefined ? this.state.reservemin : '',

	                heatinghour: this.state.heatinghour != undefined ? this.state.heatinghour : '',
	                heatingmin: this.state.heatingmin != undefined ? this.state.heatingmin : '',
	                //运行数据
	                workingstatus: this.state.workingstatus != undefined ? this.state.workingstatus : '',
	                surplusreservehour: this.state.surplusreservehour != undefined ? this.state.surplusreservehour : '',
	                surplusreservemin: this.state.surplusreservemin != undefined ? this.state.surplusreservemin : '',
	                surplusworkhour: this.state.surplusworkhour != undefined ? this.state.surplusworkhour : '',
	                surplusworkmin: this.state.surplusworkmin != undefined ? this.state.surplusworkmin : '',
	                //运行倒计时
	                countdownShow: this.state.countdownShow,
	                //菊花
	                loadingShow: this.state.loadingShow
	            };
	            //选择控件参数
	            var boot = this.state.boot !== '' ? this.state.boot : false;
	            var selectshow = this.state.selectshow ? this.state.selectshow : false;
	            var selecttitle = ['预约时间', '火力', '加热时长'][boot];
	            var hourshow = [true, true, true][boot];
	            var minuteshow = [true, false, false][boot];
	            var maxhour = [14, false, 60][boot];
	            var maxmin = [45, false, 0][boot];
	            var minhour = [1, 0, 1][boot];
	            var minminute = [0, 0, 0][boot];
	            var hourstep = [15, false, 1][boot];
	            var minutestep = [15, false, false][boot];
	            var hourunit = ['小时', '火', '分钟'][boot];
	            var minuteunit = '分钟';
	            var defaulthour = 0;
	            var defaultminute = 0;
	            var hourarray = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ['武', '文'], false][boot];
	            var ArrayInit = this.state.selectshow == false ? true : false;

	            //离线&故障数据
	            var online = this.state.online != undefined ? this.state.online : 1;
	            var networkavailable = this.state.networkavailable != undefined ? this.state.networkavailable : 1;
	            var hightemperature = this.state.hightemperature != undefined ? this.state.hightemperature : 1;
	            var dryburning = this.state.dryburning != undefined ? this.state.dryburning : 0;
	            var opencircuit = this.state.opencircuit != undefined ? this.state.opencircuit : 0;
	            var shortcircuit = this.state.shortcircuit != undefined ? this.state.shortcircuit : 0;

	            //设备故障自动弹出(干烧，高温保护，开路，短路)，且只弹一次
	            if (appData.counterDryburning != dryburning) {
	                appData.counterDryburning = dryburning;
	                dryburning == 1 && (selectshow = false, het.toast('{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}'));
	            }
	            if (appData.counterHightemperature != hightemperature) {
	                appData.counterHightemperature = hightemperature;
	                hightemperature == 1 && (selectshow = false, het.toast('{"title":"高温保护", "content":"高温保护", "button":"我知道了"}'));
	            }
	            if (appData.counterOpencircuit != opencircuit) {
	                appData.counterOpencircuit = opencircuit;
	                opencircuit == 1 && (selectshow = false, het.toast('{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'));
	            }
	            if (appData.counterShortcircuit != shortcircuit) {
	                appData.counterShortcircuit = shortcircuit;
	                shortcircuit == 1 && (selectshow = false, het.toast('{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'));
	            }
	            //故障时隐藏选择控件
	            if (dryburning == 1 || hightemperature == 1 || opencircuit == 1 || opencircuit == 1 || online == 2 || networkavailable == 2) _Actions.Actions.cancelSelect();

	            //弹窗控件参数
	            var title = '取消提醒';
	            var message = '主人，停止工作可能会损失食材，确定要这么做吗？';

	            return React.createElement(
	                'main',
	                null,
	                React.createElement(_FirstPage.FirstPage, {
	                    operate: operate,
	                    liveError: this.liveError,
	                    slide: this.slide,
	                    cancel: this.cancel,
	                    openClock: this.openClock
	                }),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { title: title, message: message, childSetState: this.childSetState }) : '',
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: selectshow,
	                    title: selecttitle,

	                    hourshow: hourshow,
	                    hourstep: hourstep,
	                    hourunit: hourunit,
	                    minhour: minhour,
	                    maxhour: maxhour,

	                    minuteshow: minuteshow,
	                    minutestep: minutestep,
	                    minuteunit: minuteunit,
	                    minminute: minminute,
	                    maxmin: maxmin,

	                    defaulthour: defaulthour,
	                    defaultminute: defaultminute,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: hourarray,
	                    ArrayInit: ArrayInit
	                })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('养生锅');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/settingPage', component: _SettingPage.SettingPage })
	    ), document.getElementById('ROOT'));
	});
	// 渲染结束                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

/***/ },
/* 7 */
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
	 * @prop {number} defaulthour 默认选中的不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * @prop {boolean} ArrayInit 是否更新可选数组
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
				timeDisplay: false,
				resetTimer: null
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || 60;
			var minhour = parseInt(next.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
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
					value = value < 10 ? '0' + value : value;
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
			if (next.defaulthour !== undefined) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 45;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			for (var j = 0; j <= maxlength2; j++) {
				var _value = minminute + j * minutestep;
				_value = _value < 10 ? '0' + _value : _value;
				minutearr.push(_value);
			}
			if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			this.setState({
				minutearr: minutearr,
				minutetime: minminute
			});
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
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 1;
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
			var value = (yvalue - oldy) / 1.72; //获取滑动距离，px为单位，但是要转换为百分比，所以除以1.72当范围大于20的时候，算作一格，负数一样
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
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				var me = this;
				me.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
				/*//不让用户看到重置的过程，呵呵哒
	   this.state.resetTimer && clearTimeout(this.state.resetTimer);
	   this.state.resetTimer = setTimeout(()=>{
	   	me.setState({
	   		hourindex:0,
	   		minuteindex:0
	   	});
	   	console.log('10000');
	   },2000);*/
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var _React$createElement;

			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusshow = this.props.statusshow || false;
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
			var hourunit = this.props.hourunit || '时';
			var minuteunit = this.props.minuteunit || '分';
			minuteindex = hourindex == 14 ? 0 : minuteindex;
			//visibility:this.state.timeDisplay?"initial":"hidden" visibility这个属性在华为某些机型下居然hidden不掉...，呵呵哒
			return React.createElement(
				'section',
				(_React$createElement = { ref: 'selecter', style: { display: this.state.timeDisplay ? 'block' : 'none', opacity: this.state.showOpacity } }, _defineProperty(_React$createElement, 'ref', 'timeSelect'), _defineProperty(_React$createElement, 'className', 'timeSelect'), _React$createElement),
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
								{ style: { left: 4 + '%' }, className: statusshow ? 'status show' : 'status' },
								'养生锅将在'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
								hourunit
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								minuteunit
							),
							React.createElement(
								'span',
								{ className: statusshow ? 'status show' : 'status' },
								'后启动' || statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? 'block' : 'none' } },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? 'block' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DevPicture = exports.FirstPage = undefined;

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _Loading = __webpack_require__(9);

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {
	    count: 0,
	    lastMode: 0,
	    lastRecordTime: 0,
	    slideClose: true,
	    slideCount: 0
	};
	var FirstPage = exports.FirstPage = React.createClass({
	    displayName: 'FirstPage',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {},
	    componentDidMount: function componentDidMount() {},

	    render: function render() {
	        //控制数据
	        var operate = this.props.operate;
	        var mode = operate.mode;
	        var modeName = operate.modeName;
	        var fire = operate.fire;
	        //离线&故障数据
	        var online = operate.online;
	        var networkavailable = operate.networkavailable;
	        var hightemperature = operate.hightemperature;
	        var dryburning = operate.dryburning;
	        var opencircuit = operate.opencircuit;
	        var shortcircuit = operate.shortcircuit;
	        //运行数据
	        var workingstatus = operate.workingstatus;

	        var surplusreservehour = operate.surplusreservehour;
	        var surplusreservemin = operate.surplusreservemin;

	        var surplusworkhour = operate.surplusworkhour;
	        var surplusworkmin = operate.surplusworkmin;

	        //预约，加热倒计时显隐
	        var countdownShow = operate.countdownShow;
	        var reservationShow = false;
	        var heatingShow = false;
	        //运行数据,预约倒计时,加热时间倒计时(正常加热和保温模式都当做是加热时间)
	        if (surplusreservehour != 0 || surplusreservemin != 0) reservationShow = true;
	        if (surplusworkhour != 0 || surplusworkmin != 0) heatingShow = true;
	        if (mode == 0) reservationShow = false, heatingShow = false;
	        var reserveOver = surplusreservehour == 0 && surplusreservemin == 0 ? true : false;
	        //按钮样式
	        var liveMode = "flex-cell live" + (mode == 0 ? ' on' : ' off');
	        var liveHeat = "flex-cell live" + (mode != 0 && reserveOver && mode != 1 && mode != 8 ? ' on' : ' off');
	        var liveFire = "flex-cell live" + (mode == 1 ? ' on' : ' off');
	        var liveModePic = mode == 0 ? 'url(../static/img/mode/m-0-on.png) no-repeat center center' : 'url(../static/img/mode/m-' + mode + '-off.png) no-repeat center center';
	        var liveHeatPic = 'url(../static/img/i-heat-on.png) no-repeat center center';
	        var liveFirePic = mode == 1 ? ['url(../static/img/i-fire-iii.png) no-repeat center center', 'url(../static/img/i-fire-i.png) no-repeat center center'][fire] : 'url(../static/img/i-fire-on.png) no-repeat center center';
	        var liveFireTxt = mode == 1 ? ['武火', '文火'][fire] : '火力';
	        //按钮事件
	        var liveModeSet = mode == 0 ? this.props.slide : '';
	        var liveHeatSet = mode != 0 && mode != 1 && mode != 8 && reserveOver ? this.props.openClock : '';
	        var liveFireSet = mode != 1 ? '' : this.props.openClock;
	        var cancelEvent = mode == 0 ? '' : this.props.cancel;
	        //运行状态(本地维护)
	        if (!workingstatus) {
	            switch (parseInt(mode)) {
	                case 0:
	                    workingstatus = 0;
	                    break;
	                case 1:
	                    workingstatus = 2;
	                    break;
	                case 8:
	                    workingstatus = 3;
	                    break;
	                default:
	                    mode != 0 && mode != 1 && mode != 8 && (workingstatus = reserveOver ? 2 : 1);
	                    break;
	            }
	        }
	        var workingStatusCss = "working-status " + ['green', 'green', 'orange', 'orange'][workingstatus];
	        if (online == 2) workingStatusCss = 'hide';
	        var workingStatusTxt = ['待机中', '预约中', '加热中', '保温中'][workingstatus];
	        //预约倒计时，加热倒计时，显示与否
	        var timeHint = countdownShow == true ? 'flex time on' : 'flex time off';
	        var timeHintSurplus = mode != 1 && mode != 8 ? reservationShow ? surplusreservehour + '小时' + surplusreservemin + '分钟后开始加热' : '' : '';
	        var timeHintHeating = heatingShow ? (mode == 8 ? '保温时长' : '加热时长') + (surplusworkhour == 1 ? 60 : surplusworkmin) + '分钟' : '';
	        //取消&提示
	        var cancel = mode != 0 ? 'cancel on' : 'cancel off';
	        var cancelHint = mode != 0 ? 'cancel-hint on' : 'cancel-hint off';
	        //离线展示
	        var onlineHint = online == 2 ? 'dev-offline slide-up' : 'dev-offline slide-down';
	        //短路故障
	        var deviceErrorTxt = '';
	        if (hightemperature == 1) deviceErrorTxt = '提示:高温保护';
	        if (dryburning == 1) deviceErrorTxt = '提示:干烧故障';
	        if (opencircuit == 1) deviceErrorTxt = '提示:传感器开路故障';
	        if (shortcircuit == 1) deviceErrorTxt = '提示:传感器短路故障';
	        //调试打印
	        //<aside className='console'>
	        //    {' 调试打印: '}
	        //    {' 控制模式: '+operate.mode }
	        //    {' 运行模式: '+operate.runningMode }
	        //    {' 加热时:'+surplusworkhour }
	        //    {' 加热分:'+surplusworkmin }
	        //    {' 预约H:'+surplusreservehour }
	        //    {' 预约M:'+surplusreservemin }
	        //    {' 在线: '+online }
	        //    {' 火力: '+fire }
	        //    {' 倒计时控制: '+operate.countdownShow.toString() }
	        //    {' 干烧: '+operate.dryburning.toString() }
	        //    {' 高温: '+operate.hightemperature.toString() }
	        //    {' 开路: '+operate.opencircuit.toString() }
	        //    {' 短路: '+operate.shortcircuit.toString() }
	        //</aside>
	        return React.createElement(
	            'div',
	            { className: 'first-page' },
	            React.createElement(DevPicture, null),
	            React.createElement(
	                'section',
	                { ref: 'liveBox', className: 'dev-operate' },
	                React.createElement(
	                    'h5',
	                    { className: 'device-error show' },
	                    deviceErrorTxt
	                ),
	                React.createElement(
	                    'h4',
	                    { className: workingStatusCss },
	                    React.createElement(
	                        'span',
	                        { className: 'flex-cell' },
	                        workingStatusTxt
	                    )
	                ),
	                React.createElement(
	                    'h3',
	                    { className: timeHint },
	                    timeHintSurplus + '   ',
	                    timeHintHeating
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'flex operate-live', id: 'operate-live' },
	                    React.createElement(
	                        'span',
	                        { className: liveMode, onClick: liveModeSet },
	                        React.createElement('i', { style: { background: liveModePic } }),
	                        React.createElement(
	                            'h5',
	                            null,
	                            modeName
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: liveHeat, 'data-seat': '2', onClick: liveHeatSet },
	                        React.createElement('i', { style: { background: liveHeatPic } }),
	                        React.createElement(
	                            'h5',
	                            null,
	                            '\u52A0\u70ED\u65F6\u95F4'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: liveFire, 'data-seat': '1', onClick: liveFireSet },
	                        React.createElement('i', { style: { background: liveFirePic } }),
	                        React.createElement(
	                            'h5',
	                            null,
	                            liveFireTxt
	                        )
	                    )
	                ),
	                React.createElement(
	                    'h4',
	                    { className: cancelHint },
	                    '\u70B9\u51FB\u53D6\u6D88\uFF0C\u91CD\u7F6E\u5207\u6362\u5F53\u524D\u6A21\u5F0F'
	                ),
	                React.createElement(
	                    'figure',
	                    { className: cancel, onClick: cancelEvent },
	                    '\u53D6\u6D88'
	                ),
	                React.createElement(
	                    'figure',
	                    { className: onlineHint },
	                    '主人,您的养生锅不在线哦~!'
	                )
	            ),
	            React.createElement(_Loading.Loading, { show: operate.loadingShow, info: '正在启动中' })
	        );
	    }
	});
	var DevPicture = exports.DevPicture = React.createClass({
	    displayName: 'DevPicture',
	    render: function render() {
	        return React.createElement(
	            'section',
	            { className: 'dev-screen' },
	            React.createElement('img', { src: '../static/img/dev-screen.jpg' })
	        );
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 菊花
	 * @prop {boolean} show  是否显示loading动画
	 * @prop {string}  info  显示文案信息，可选
	 * @author   tomy
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Loading = exports.Loading = React.createClass({
		displayName: 'Loading',

		getInitialState: function getInitialState() {
			return {
				show: false,
				info: '请耐心等待，正在联动设备...'
			};
		},
		render: function render() {
			var show = this.props.show;
			var showOpacity = show ? 1 : 0;
			var showInfo = this.props.info || this.state.info;
			return React.createElement(
				'section',
				{ ref: 'loading', className: 'loading', style: { visibility: show ? "initial" : "hidden", opacity: showOpacity } },
				React.createElement('figure', null),
				React.createElement(
					'figure',
					{ className: 'loading-flower' },
					React.createElement(
						'span',
						null,
						showInfo
					)
				)
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPage = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(7);

	var _Loading = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {};

	var SettingPage = exports.SettingPage = function (_BaseComponent) {
	    _inherits(SettingPage, _BaseComponent);

	    function SettingPage(props) {
	        _classCallCheck(this, SettingPage);

	        var _this = _possibleConstructorReturn(this, (SettingPage.__proto__ || Object.getPrototypeOf(SettingPage)).call(this, props));

	        _this.state = {
	            selectMode: 1,
	            selectHeatinghour: 0,
	            selectHeatingmin: 0,
	            selectFire: 0,
	            selectReservehour: 0,
	            selectReservemin: 0
	        };
	        _Actions.Actions.local();
	        _this.listenStore(_Store.Store);
	        _this.openClock = _this.openClock.bind(_this);
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.selectMode = _this.selectMode.bind(_this);
	        _this.changeMode = _this.changeMode.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPage, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle(JSON.stringify({
	                setNavTitle: 1,
	                title: '模式',
	                setNavRightBtnHiden: 1
	            }));
	        }
	    }, {
	        key: 'openClock',
	        value: function openClock(e) {
	            var where = parseInt(e.currentTarget.getAttribute('data-seat'));
	            this.setState({
	                selectshow: true,
	                boot: where });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            _Actions.Actions.cancelSelect();
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            //传入选择控件选中的小时数组和分钟数组
	            var where = this.state.boot;
	            _Actions.Actions.submitSelect(h, m, where);
	            this.setState({
	                selectshow: false
	            });
	        }
	    }, {
	        key: 'selectMode',
	        value: function selectMode(e) {
	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            var modeArray = [{ id: 0, name: '模式', fire: '文火' }, { id: 1, name: '火锅', fire: '武火', heatinghour: 0, heatingmin: 0 }, { id: 2, name: '蒸鱼', fire: '武火', heatinghour: 0, heatingmin: 15 }, { id: 3, name: '蒸蛋', fire: '武火', heatinghour: 0, heatingmin: 16 }, { id: 4, name: '包子', fire: '武火', heatinghour: 0, heatingmin: 18 }, { id: 5, name: '馒头', fire: '武火', heatinghour: 0, heatingmin: 22 }, { id: 6, name: '排骨', fire: '武火', heatinghour: 0, heatingmin: 24 }, { id: 7, name: '蒸饭', fire: '武火', heatinghour: 0, heatingmin: 35 }, { id: 8, name: '保温', fire: '文火', heatinghour: 1, heatingmin: 0 }, { id: 9, name: '自定时', fire: '武火', heatinghour: 0, heatingmin: 20 }];
	            var items = modeArray /*|| this.state.modeArray?this.state.modeArray:[]*/;
	            //火力有坑，单独维护，0x00 武火，0x01 文火，除待机和保温发文火其他都发武火，但不置位，只有火锅模式下才加入置位
	            var selectFire = selectMode != 0 && selectMode != 8 ? 0 : 1;
	            appData.selectArray = {};
	            appData.selectArray = {
	                selectMode: selectMode,
	                selectReservehour: 0,
	                selectReservemin: 0,
	                selectFire: selectFire,
	                selectHeatinghour: items[selectMode].heatinghour,
	                selectHeatingmin: items[selectMode].heatingmin
	            };
	            //选择模式的默认参数用于本地维护，若发送到APP，用对应协议字段维护，会导致控件被不停隐藏，无法选中时间
	            _Actions.Actions.selectMode(appData.selectArray);
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode(e) {
	            var _this2 = this;

	            //方式1 获取存到全局变量state中的选中参数  VS  方式2 获取绑定到dom中的选中参数
	            e.preventDefault();
	            het.setTitle('{"hideNativeLoading":"true"}');
	            appData.sendArray = {
	                GongZuoMoShiSheZhi: this.state.selectMode,
	                YuYueShiJianSheZhiXiaoShi: this.state.selectReservehour,
	                YuYueShiJianSheZhiFenZhong: this.state.selectReservemin,
	                HuoLiSheZhi: this.state.selectFire,
	                JiaReShiJianSheZhiXiaoShi: this.state.selectHeatinghour,
	                JiaReShiJianSheZhiFenZhong: this.state.selectHeatingmin
	            };
	            _Actions.Actions.changeMode(appData.sendArray);
	            this.setState({
	                loadingShow: true
	            });
	            setTimeout(function () {
	                _this2.setState({
	                    loadingShow: false
	                });
	            }, 4000);
	            setTimeout(function () {
	                history.back();
	            }, 5000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //导航栏:{ios:73,android:64}
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? ' ios' : ' android';
	            //模式选择
	            var modeArray = [{ id: 0, name: '模式', fire: false }, { id: 1, name: '火锅', fire: '武火' }, { id: 2, name: '蒸鱼', fire: false, heatinghour: 0, heatingmin: 15 }, { id: 3, name: '蒸蛋', fire: false, heatinghour: 0, heatingmin: 16 }, { id: 4, name: '包子', fire: false, heatinghour: 0, heatingmin: 18 }, { id: 5, name: '馒头', fire: false, heatinghour: 0, heatingmin: 22 }, { id: 6, name: '排骨', fire: false, heatinghour: 0, heatingmin: 24 }, { id: 7, name: '蒸饭', fire: false, heatinghour: 0, heatingmin: 35 }, { id: 8, name: '保温', fire: false, heatinghour: 1, heatingmin: 0 }, { id: 9, name: '自定时', fire: false, heatinghour: 0, heatingmin: 20 }];
	            var items = this.state.modeArray ? this.state.modeArray : []; //拉取刷新第一个icon需要点击才能加载,使用store里传过来的数组不可以
	            items = modeArray;
	            var slide = this.state.slide ? ' slide-up' : ' slide-down';
	            var selectMode = this.state.selectMode ? this.state.selectMode : 1;
	            //选择控件参数
	            var boot = this.state.boot !== '' ? this.state.boot : false;
	            var selectshow = this.state.selectshow ? this.state.selectshow : false;
	            var selecttitle = ['预约时间', '火力', '加热时长'][boot];
	            var statusshow = [1, 0, 0][boot];
	            var hourshow = [true, true, true][boot];
	            var minuteshow = [true, false, false][boot];
	            var maxhour = [14, false, 60][boot];
	            var maxmin = [45, false, 0][boot];
	            var minhour = [1, 0, 1][boot];
	            var minminute = [0, false, false][boot];
	            var hourstep = [15, false, 1][boot];
	            var minutestep = [15, false, false][boot];
	            var hourunit = ['小时', '火', '分钟'][boot];
	            var minuteunit = '分钟';
	            var defaulthour = 0;
	            var defaultminute = 0;
	            var hourarray = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], ['武', '文'], false][boot];
	            var ArrayInit = this.state.selectshow == false ? true : false;

	            //控件样式
	            var selectReserveCss = selectMode != 1 && selectMode != 8 ? 'flex set' : 'flex set disabled';
	            var selectFireCss = selectMode != 1 ? 'flex set disabled' : 'flex set';
	            var selectHeatingCss = selectMode != 1 && selectMode != 8 ? 'flex set' : 'flex set disabled';
	            //选中的值和默认值
	            var selectReservehour = this.state.selectReservehour != undefined ? this.state.selectReservehour : 0;
	            var selectReservemin = this.state.selectReservemin != undefined ? this.state.selectReservemin : 0;

	            var selectHeatinghour = this.state.selectHeatinghour != undefined ? parseInt(this.state.selectHeatinghour) : 0;
	            var selectHeatingmin = this.state.selectHeatingmin != undefined ? parseInt(this.state.selectHeatingmin) : 15;

	            var selectReserveTxt = selectReservehour == 0 ? selectReservemin == 0 ? '0分钟' : selectReservemin + '分钟' : selectReservehour + '小时' + selectReservemin + '分钟';
	            var selectFireTxt = selectMode == 1 ? this.state.selectFire != undefined ? ['武火', '文火'][this.state.selectFire] : '武火' : React.createElement('img', { src: '../static/img/i-no-data.png' });
	            var selectHeatingTxt = selectHeatinghour == 0 ? selectHeatingmin == 0 ? 0 : selectHeatingmin + '分钟' : selectHeatinghour + '小时' + selectHeatingmin + '分钟';

	            if (selectMode == 1) selectReserveTxt = React.createElement('img', { src: '../static/img/i-no-data.png' }), selectHeatingTxt = React.createElement('img', { src: '../static/img/i-no-data.png' });
	            if (selectMode == 8) selectReserveTxt = React.createElement('img', { src: '../static/img/i-no-data.png' });
	            //选择控件事件
	            var openClockReserve = selectMode != 1 && selectMode != 8 ? this.openClock : '';
	            var openClockFire = selectMode != 1 ? '' : this.openClock;
	            var openClockHeating = selectMode != 1 && selectMode != 8 ? this.openClock : '';
	            //离线&故障
	            var online = this.state.online ? this.state.online : 1;
	            var networkavailable = this.state.networkavailable ? this.state.networkavailable : 1;
	            var hightemperature = this.state.hightemperature ? this.state.hightemperature : 0;
	            var dryburning = this.state.dryburning ? this.state.dryburning : 0;
	            var opencircuit = this.state.opencircuit ? this.state.opencircuit : 0;
	            var shortcircuit = this.state.shortcircuit ? this.state.shortcircuit : 0;
	            if (online == 2 || networkavailable == 2 || hightemperature == 1 || dryburning == 1 || opencircuit == 1 || shortcircuit == 1) {
	                if (selectshow == true) this.state.selectshow = false;
	                setTimeout(function () {
	                    history.back();
	                }, 1000);
	            }
	            //菊花
	            var loadingShow = this.state.loadingShow ? this.state.loadingShow : false;
	            //H5导航条
	            //<nav className={navigation}><i className="back" onTouchStart={this.handleBack}></i><span>模式</span></nav>
	            return React.createElement(
	                'section',
	                { className: 'setting-page' + navigation },
	                React.createElement(
	                    'dl',
	                    { className: 'flex mode-items' },
	                    items.map(function (o) {
	                        return React.createElement(
	                            'dd',
	                            { style: { 'display': o.id == 0 ? 'none' : 'auto', 'backgroundImage': 'url(../static/img/mode/m-' + o.id + (o.id == selectMode ? '-on' : '-off') + '.png)' },
	                                className: 'mode' + (o.id == selectMode ? ' on' : ''), key: o.id,
	                                'data-mode': o.id,
	                                onClick: this.selectMode },
	                            o.name
	                        );
	                    }.bind(this))
	                ),
	                React.createElement(
	                    'dl',
	                    { className: selectReserveCss, 'data-seat': '0', onTouchStart: openClockReserve },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u9884\u7EA6\u65F6\u95F4'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            selectReserveTxt
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: selectFireCss, 'data-seat': '1', onTouchStart: openClockFire },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u706B\u529B'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            selectFireTxt
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: selectHeatingCss, 'data-seat': '2', onTouchStart: openClockHeating },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u52A0\u70ED\u65F6\u95F4'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            selectHeatingTxt
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(_Loading.Loading, { show: loadingShow }),
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: selectshow,
	                    title: selecttitle,
	                    statusshow: statusshow,

	                    hourshow: hourshow,
	                    hourstep: hourstep,
	                    hourunit: hourunit,
	                    minhour: minhour,
	                    maxhour: maxhour,

	                    minuteshow: minuteshow,
	                    minutestep: minutestep,
	                    minuteunit: minuteunit,
	                    minminute: minminute,
	                    maxmin: maxmin,

	                    defaulthour: defaulthour,
	                    defaultminute: defaultminute,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: hourarray,
	                    ArrayInit: ArrayInit
	                }),
	                React.createElement(
	                    'h2',
	                    { className: 'toggle-mode', onTouchStart: this.changeMode },
	                    '\u542F\u52A8'
	                )
	            );
	        }
	    }]);

	    return SettingPage;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Alert = React.createClass({
		displayName: 'Alert',

		propTypes: {
			isShowTitle: React.PropTypes.bool, // 是否显示标题
			title: React.PropTypes.string, // 提示对话框上显示的标题内容
			message: React.PropTypes.string, // 提示对话框上显示的内容
			btnCancel: React.PropTypes.string, //提示对话框取消按钮显示的内容
			btnSure: React.PropTypes.string, // 提示对话框上确认按钮显示的内容
			onAnimationLeave: React.PropTypes.func // 提示对话框上关闭后的回调函数
		},
		getInitialState: function getInitialState() {
			return {
				animationClassName: 'animation-alert-enter',
				opacity: 1
			};
		},
		getDefaultProps: function getDefaultProps() {
			return {
				isShowTitle: true,
				title: '提示',
				message: '请添加内容',
				btnCancel: '取消',
				btnSure: '确定',
				onAnimationLeave: function onAnimationLeave() {}
			};
		},

		animationType: 'enter', //自定义对象属性，用以维护动画显隐
		animationEnd: function animationEnd() {
			if (this.animationType == 'enter') {
				this.animationType = 'leave';
				this.setState({ opacity: 1 });
			} else {
				this.animationType = 'enter';
				this.setState({ opacity: 0 } /*,()=>{
	                                this.props.onAnimationLeave()
	                                }*/);
			}
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			//onAnimationEnd react 0.14版本不支持标签上的直接量写法onAnimationEnd={this.animationEnd}
			this.refs['cancel'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false });
			}, false);
			this.refs['sure'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false, sure: true });
			}, false);
			this.refs['wrapper'].addEventListener('webkitAnimationEnd', function () {
				_this.animationEnd();
			}, false);
		},
		btnTouchClose: function btnTouchClose(e) {
			this.setState({ animationClassName: 'animation-alert-leave', close: 1 });
		},
		render: function render() {
			var _innerBox, _style;

			var style = (_style = {
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
				},
				innerBox: (_innerBox = {
					width: '86%',
					maxHeight: '60%',
					borderRadius: '5px',
					boxSizing: 'border-box',
					WebkitBoxSizing: 'border-box',
					background: 'rgba(255,255,255,1)',
					padding: '14px 0 0'
				}, _defineProperty(_innerBox, 'borderRadius', '4px'), _defineProperty(_innerBox, 'boxShadow', '0 0 40px rgba(0,0,0,0.4)'), _innerBox),
				title: {
					padding: '0 17px 5px',
					color: 'black',
					fontSize: '18px',
					fontWeight: 'bold',
					textAlign: 'center'
				},
				message: {
					margin: '0 17px 14px'
				},
				text: {
					margin: 0,
					fontSize: '16px',
					lineHeight: '26px',
					wordBreak: 'break-all',
					color: 'rgba(60,60,60,1)'
				},
				btnWrapperSingle: {
					height: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				},
				btnWrapperAll: {
					height: '48px',
					lingHeight: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				}
			}, _defineProperty(_style, 'btnWrapperAll', {
				before: {
					content: '',
					height: '100%',
					width: '1px'
				}
			}), _defineProperty(_style, 'btnCancel', {
				width: '50%',
				border: '0',
				background: 'rgba(255,255,255,1)',
				borderRadius: '5px',
				color: '#000',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _defineProperty(_style, 'btnSure', {
				width: '50%',
				border: '0',
				borderRadius: '5px',
				background: 'rgba(255,255,255,1)',
				color: '#3285ff',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _style);
			var btnWrapperName = '';
			var animationClassName = this.state.animationClassName;
			var title = this.props.isShowTitle ? React.createElement(
				'h1',
				{ style: style.title },
				this.props.title
			) : null;

			return React.createElement(
				'div',
				{ style: style.wrapper, className: animationClassName, ref: 'wrapper', onAnimationEnd: this.animationEnd },
				React.createElement(
					'div',
					{ style: style.innerBox },
					title,
					React.createElement(
						'div',
						{ style: style.message },
						React.createElement(
							'p',
							{ style: style.text },
							this.props.message
						)
					),
					React.createElement(
						'div',
						{ className: 'two-btn-wrapper' },
						React.createElement('input', { type: 'button', ref: 'cancel', value: this.props.btnCancel, style: style.btnCancel, onTouchStart: this.btnTouchClose }),
						React.createElement('input', { type: 'button', ref: 'sure', value: this.props.btnSure, style: style.btnSure, onTouchStart: this.btnTouchClose })
					)
				)
			);
		}
	});

	exports.default = Alert;
	//                      

/***/ }
/******/ ]);