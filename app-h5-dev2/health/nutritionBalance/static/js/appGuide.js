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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            deviceStatus: 4, // 1-提示打开 2-扫描中 3-无法连接 4-有数据
	            result: 0, // 称重结果
	            foodClassId: 1 // 食材类别ID
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'clickStatus',
	        value: function clickStatus(e) {
	            e.preventDefault();
	            var val = parseInt(e.currentTarget.getAttribute('data-val'));
	            this.setState({ foodClassId: val });
	        }
	    }, {
	        key: 'inputFoodName',
	        value: function inputFoodName(e) {
	            var val = e.currentTarget.value;
	            this.setState({ foodName: val });
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            if (!this.state.foodName) {
	                het.toast('请输入食物名称');
	                ReactDOM.findDOMNode(this.refs.foodname).focus();
	                return;
	            }
	            _Actions.Actions.submitResult(this.state.result, this.state.foodName, this.state.foodClassId);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'main', style: { 'paddingTop': this.state.headerTop } },
	                React.createElement(
	                    'header',
	                    null,
	                    React.createElement(
	                        'figure',
	                        null,
	                        React.createElement('img', { src: this.state.avatar }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '你好，',
	                            this.state.nickname
	                        )
	                    )
	                ),
	                this.state.deviceStatus == 1 ? React.createElement(
	                    'section',
	                    { className: 'sec-0' },
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '请将食物放在秤上 ...'
	                    ),
	                    React.createElement('img', { src: '../static/img/misc1.png' })
	                ) : '',
	                this.state.deviceStatus == 2 ? React.createElement(
	                    'section',
	                    { className: 'sec-1' },
	                    React.createElement('div', { className: 'circle1' }),
	                    React.createElement('div', { className: 'circle2' }),
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '扫描中...'
	                    )
	                ) : '',
	                this.state.deviceStatus == 3 ? React.createElement(
	                    'section',
	                    { className: 'sec-2' },
	                    React.createElement(
	                        'div',
	                        { className: 'msg' },
	                        '抱歉，无法连接到营养秤'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'health://guide_retry', className: 'ft-button' },
	                        '再试一次'
	                    )
	                ) : '',
	                this.state.deviceStatus == 4 ? React.createElement(
	                    'section',
	                    { className: 'sec-3' },
	                    React.createElement(
	                        'div',
	                        { className: 'result' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '称重结果'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'b',
	                                null,
	                                this.state.result
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'unit' },
	                                'g'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'foot' },
	                        React.createElement(
	                            'div',
	                            { className: 'btns-wrap' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '输入食物名称'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement('input', { type: 'text', ref: 'foodname', placeholder: '请输入1到8个字符', maxLength: 8, className: 'foodname', value: this.state.foodName, onChange: this.inputFoodName.bind(this) })
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '选择食物类别'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex' },
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '1', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 1 ? ' active' : '') },
	                                    '谷类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '2', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 2 ? ' active' : '') },
	                                    '蛋类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '3', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 3 ? ' active' : '') },
	                                    '奶类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '5', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 5 ? ' active' : '') },
	                                    '肉类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '6', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 6 ? ' active' : '') },
	                                    '蔬菜类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '7', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 7 ? ' active' : '') },
	                                    '瓜果类'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex' },
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '4', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 4 ? ' active' : '') },
	                                    '豆类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '9', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 9 ? ' active' : '') },
	                                    '鱼虾类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '10', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 10 ? ' active' : '') },
	                                    '贝类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '11', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 11 ? ' active' : '') },
	                                    '干果类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '8', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 8 ? ' active' : '') },
	                                    '根茎类'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '12', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.foodClassId == 12 ? ' active' : '') },
	                                    '调味品'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: '#', className: 'ft-button', onClick: this.submit.bind(this) },
	                            '确定'
	                        )
	                    )
	                ) : ''
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('营养秤');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

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
	var Actions = exports.Actions = Reflux.createActions(['ready', // 接收到ready数据
	'repaint', // 接收到数据，重新渲染
	'getData', // 获取数据
	'getTotals', // 获取今日统计数据
	'getHistoryData', // 获取历史数据
	'getCalendarData', // 获取日历数据
	'selectedDate', // 选择日期
	'submitResult']);

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

	var _fun = __webpack_require__(6);

	var readyData = {
	    'appId': 0,
	    'deviceId': 'F',
	    'memberId': 0,
	    'userType': 3,
	    'avatar': '../static/img/avatar.jpg'
	};

	var detailData = []; // 明细数据缓存（用于分页）

	/**
	 * 数据分组排序
	 * @param    {json}     data     目标数据
	 * @param    {string}   groupKey 分组依据字段
	 * @param    {string}   orderKey 可选，排序依据字段。若省略，将以groupKey做排序依据
	 * @return   {json}              分组排序后的数据
	 */
	function groupData(data, groupKey, orderKey) {
	    var newData = {};
	    var arrData = [];
	    orderKey = orderKey ? orderKey : groupKey;
	    // 分组
	    for (var i in data) {
	        var k = data[i][groupKey].replace(/\s.+$/, '');
	        if (!newData[k]) {
	            newData[k] = [];
	        }
	        newData[k].push(data[i]);
	    }
	    // 排序
	    for (var j in newData) {
	        newData[j].sort(function (a, b) {
	            return a[orderKey] < b[orderKey];
	        });
	        arrData.push({ key: j, data: newData[j] });
	    }
	    arrData.sort(function (a, b) {
	        return a.key < b.key;
	    });
	    return arrData;
	}

	// 格式化日期为 yyyy-MM-dd的形式
	function ymd(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).replace(/(?=\b\d\b)/g, '0');
	}
	// 格式化日期为 yyyy-MM的形式
	function ym(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1)).replace(/(?=\b\d\b)/g, '0');
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onReady: function onReady(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(data);
	    },
	    onGetData: function onGetData(pageIndex) {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            pageIndex: pageIndex || 0,
	            pageRows: 20
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = {};
	            data.data.list = [
	                {            
	                    'recordTime': '2016-06-18 10:21:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '46.4'        // 摄入总量(g)    
	                },
	                {            
	                    'recordTime': '2016-06-08 10:23:14', // 测量时间
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '56.4'        // 摄入总量(g)       
	                },
	                {            
	                    'recordTime': '2016-06-08 10:20:14', // 测量时间
	                    'foodClassId':'4',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '66.4'        // 摄入总量(g)          
	                }     
	            ];*/
	            if (!data.data) return;
	            data = groupData(data.data.list, 'recordTime');
	            detailData = cfg.pageIndex === 0 ? data : detailData.concat(data);
	            _this.trigger({ results: detailData });
	        }, function () {});
	    },
	    onGetTotals: function onGetTotals() {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            memberId: readyData.memberId
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataToDay', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {                      
	                    'foodClassId':'1',          // 食材类别ID
	                    'foodClassName':'谷类',     // 食材类别名称 
	                    'foodWeight': '30'        // 食材重量（g）
	                },
	                {                      
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',      // 食材类别名称    
	                    'foodWeight': '33'         // 食材重量（g）       
	                },
	                {                      
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'奶类',      // 食材类别名称 
	                    'foodWeight': '31'        // 食材重量（g）        
	                }
	            ];*/
	            if (!data.data) return;
	            _this.trigger({ totals: data.data });
	        }, function () {});
	    },
	    onGetHistoryData: function onGetHistoryData(beginDate, endDate, foodClassIds) {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            memberId: readyData.memberId,
	            foodClassIds: foodClassIds,
	            beginDate: ymd(beginDate),
	            endDate: ymd(endDate)
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceMonthData', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {            
	                    'recordTime': '2016-06-15 10:20:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '46.4'        // 摄入总量(g)    
	                },
	                 {            
	                    'recordTime': '2016-06-18 10:20:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '56.4'        // 摄入总量(g)       
	                },
	                {            
	                    'recordTime': '2016-06-09 10:20:14', // 测量时间
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '66.4'        // 摄入总量(g)          
	                }
	            ];*/
	            data = groupData(data.data, 'foodClassId', 'recordTime');
	            _this.trigger({ results: data });
	        }, function () {});
	    },
	    onSelectedDate: function onSelectedDate(dates) {
	        dates.slidedCalendarShow = false;
	        this.trigger(dates);
	    },
	    getCalendarData: function getCalendarData() {
	        var d1 = new Date();
	        var d2 = new Date();
	        d1.setMonth(d2.getMonth() - 11);
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDate', cfg, function (data) {
	            var d = [];
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'date': '2016-06-12'
	                },
	                {
	                    'date': '2016-04-14'
	                },
	                {
	                    'date': '2016-04-16'
	                },
	                {
	                    'date': '2016-04-19'
	                }
	            ];*/
	            if (!data.data) return;
	            data.data.map(function (v) {
	                return d.push(v.date);
	            });
	            _this.trigger({ validDates: d });
	        }, function () {});
	    },
	    onSubmitResult: function onSubmitResult(weight, foodName, foodClassId) {
	        var now = new Date();
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // memberId: readyData.memberId,
	            timestamp: +now
	        };
	        var data = {
	            'userType': readyData.userType, //用户身份（1：医生  3：患者）
	            'memberId': readyData.memberId, //用户编号（切换用户用）
	            'foodClassId': foodClassId, // 食材类别ID
	            'foodName': foodName, // 食材名称
	            'foodWeight': weight, // 食材重量（g）
	            'recordTime': _fun.Funs.dateFormat(now, 'yyyy-MM-dd hh:mm:ss'), //测量时间
	            'timeZone': -now.getTimezoneOffset() // 时区 (10*60 统一传分钟)
	        };
	        cfg.data = JSON.stringify(data);
	        het.post('/v1/device/data/raw/upload', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            location.href = 'health://skip_url/index.html';
	        }, function () {});
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
	     * @param    {string}   format 格式，缺省为：yy-MM-dd hh:mm:ss
	     * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
	     * @return   {string}          按format格式输出日期
	     */
	    dateFormat: function dateFormat(date, format, isUTC) {
	        var timezoneOffset = 0;
	        date = new Date(date);
	        format = format || 'yy-MM-dd hh:mm:ss';
	        if (isUTC) {
	            // 处理utc时间
	            timezoneOffset = new Date().getTimezoneOffset();
	            date.setMinutes(date.getMinutes() - timezoneOffset);
	        }
	        var map = {
	            'M': date.getMonth() + 1, //月份
	            'd': date.getDate(), //日
	            'h': date.getHours(), //小时
	            'm': date.getMinutes(), //分
	            's': date.getSeconds(), //秒
	            'q': Math.floor((date.getMonth() + 3) / 3), //季度
	            'S': date.getMilliseconds() //毫秒
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
	                return (date.getFullYear() + '').substr(4 - all.length);
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
	    }
	};
	module.exports = Funs;

/***/ }
/******/ ]);