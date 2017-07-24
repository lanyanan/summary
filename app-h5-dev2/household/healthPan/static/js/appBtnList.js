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

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {};

	het.domReady(function () {
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        filter: {}
	    });
	});
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            online: 1,
	            networkavailable: 1,
	            fuck: 2
	        };
	        _Actions.Actions.local();
	        _this.listenStore(_Store.Store);
	        //Store.listen((data)=>this.setState(data));
	        _this.changeMode = _this.changeMode.bind(_this);
	        _this.liveError = _this.liveError.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'changeMode',
	        value: function changeMode(e) {
	            //出来操作
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            }
	            e.preventDefault();
	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            var modeConfig = [{ mode: 7, name: '蒸饭', fire: 1, heatinghour: 0, heatingmin: 35 }, { mode: 5, name: '馒头', fire: 1, heatinghour: 0, heatingmin: 22 }, { mode: 6, name: '排骨', fire: 1, heatinghour: 0, heatingmin: 24 }, { mode: 4, name: '包子', fire: 1, heatinghour: 0, heatingmin: 18 }];
	            switch (selectMode) {
	                case 4:
	                    appData.selectMode = 4, appData.heatingmin = 18;break;
	                case 5:
	                    appData.selectMode = 5, appData.heatingmin = 22;break;
	                case 6:
	                    appData.selectMode = 6, appData.heatingmin = 24;break;
	                case 7:
	                    appData.selectMode = 7, appData.heatingmin = 35;break;
	            };
	            appData.sendArray = {
	                GongZuoMoShiSheZhi: appData.selectMode,
	                YuYueShiJianSheZhiXiaoShi: 0,
	                YuYueShiJianSheZhiFenZhong: 0,
	                HuoLiSheZhi: 1,
	                JiaReShiJianSheZhiXiaoShi: 0,
	                JiaReShiJianSheZhiFenZhong: appData.heatingmin
	            };
	            _Actions.Actions.changeMode(appData.sendArray);
	            this.setState({
	                mode: appData.selectMode,
	                runningMode: appData.selectMode
	            });
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
	            //出来操作不用故障提示
	            //if(this.state.dryburning==1){
	            //    return '{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}'
	            //}
	            //if(this.state.hightemperature==1){
	            //    return '{"title":"高温保护", "content":"高温保护", "button":"我知道了"}';
	            //}
	            //if(this.state.opencircuit==1){
	            //    return '{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
	            //}
	            //if(this.state.shortcircuit==1){
	            //    return '{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
	            //}
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //状态和模式
	            var mode = this.state.mode != undefined ? this.state.mode : 0;
	            var modeName = mode == 0 ? '无' : this.state.modeName != undefined ? this.state.modeName : '无';

	            //运行数据相对较慢并未用于渲染
	            var runningMode = this.state.runningMode != undefined ? this.state.runningMode : '';
	            var runningModeName = this.state.runningModeName != undefined ? this.state.runningModeName : '无';

	            //使用运行数据渲染
	            mode = runningMode;
	            modeName = mode == 0 ? '无' : runningModeName;

	            //离线&故障
	            var online = this.state.online != undefined ? this.state.online : 1;
	            var networkavailable = this.state.networkavailable != undefined ? this.state.networkavailable : 1;
	            var hightemperature = this.state.hightemperature != undefined ? this.state.hightemperature : 0;
	            var dryburning = this.state.dryburning != undefined ? this.state.dryburning : 0;
	            var opencircuit = this.state.opencircuit != undefined ? this.state.opencircuit : 0;
	            var shortcircuit = this.state.shortcircuit != undefined ? this.state.shortcircuit : 0;
	            var runningOk = online == 2 || networkavailable == 2 || hightemperature == 1 || dryburning == 1 || opencircuit == 1 || shortcircuit == 1 ? false : true;

	            //故障时样式
	            var surplusreservehour = this.state.surplusreservehour != undefined ? this.state.surplusreservehour : '';
	            var surplusreservemin = this.state.surplusreservemin != undefined ? this.state.surplusreservemin : '';
	            var reserveEnd = surplusreservehour == 0 && surplusreservemin == 0 ? true : false;
	            var workingstatus = this.state.workingstatus ? this.state.workingstatus : '';
	            //运行状态字段未返回，本地维护计算
	            if (!workingstatus) {
	                switch (parseInt(mode)) {
	                    case 0:
	                        workingstatus = 0;break;
	                    case 1:
	                        workingstatus = 2;break;
	                    case 8:
	                        workingstatus = 3;break;
	                    default:
	                        mode != 0 && mode != 1 && mode != 8 && (workingstatus = reserveEnd ? 2 : 1);break;
	                }
	            }
	            var workingStatusTxt = ['待机中', '预约中', '加热中', '保温中'][workingstatus] || '待机中';
	            if (hightemperature == 1) workingStatusTxt = '高温保护';
	            if (dryburning == 1) workingStatusTxt = '干烧保护';
	            if (opencircuit == 1) workingStatusTxt = '开路故障';
	            if (shortcircuit == 1) workingStatusTxt = '短路故障';

	            var changMode = mode == 0 ? this.changeMode : '';
	            //设备故障时，置灰，点击不需要提示
	            if (hightemperature == 1 || dryburning == 1 || opencircuit == 1 || shortcircuit == 1) changMode = '';
	            //离线断网时，置灰，点击需要提示
	            if (online == 2 || networkavailable == 2) changMode = this.changeMode;

	            var statusBar = workingStatusTxt + '  模式:' + modeName;
	            if (online == 2) statusBar = '设备已离线';
	            if (networkavailable == 2) statusBar = '当前网络不可用';

	            return React.createElement(
	                'aside',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    statusBar
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '7', className: mode != 0 && runningOk ? 'flex-cell triggered' : 'flex-cell', onClick: changMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/1.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u84B8\u996D'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '5', className: mode != 0 && runningOk ? 'flex-cell triggered' : 'flex-cell', onClick: changMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/2.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9992\u5934'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '6', className: mode != 0 && runningOk ? 'flex-cell triggered' : 'flex-cell', onClick: changMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/3.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6392\u9AA8'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '4', className: mode != 0 && runningOk ? 'flex-cell triggered' : 'flex-cell', onClick: changMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/btnlist/4.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5305\u5B50'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {
	    het.setTitle('C-Life 快捷方式');
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
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

/***/ }
/******/ ]);