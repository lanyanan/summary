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

	module.exports = __webpack_require__(9);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _reactRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _MeasurementReport = __webpack_require__(10);

	var _MeasurementReport2 = _interopRequireDefault(_MeasurementReport);

	var _ContentBmi = __webpack_require__(11);

	var _ContentBmi2 = _interopRequireDefault(_ContentBmi);

	var _ContentDateMetal = __webpack_require__(12);

	var _ContentDateMetal2 = _interopRequireDefault(_ContentDateMetal);

	var _ContentFatRate = __webpack_require__(13);

	var _ContentFatRate2 = _interopRequireDefault(_ContentFatRate);

	var _ContentMusclePrc = __webpack_require__(14);

	var _ContentMusclePrc2 = _interopRequireDefault(_ContentMusclePrc);

	var _ContentWaterPrc = __webpack_require__(15);

	var _ContentWaterPrc2 = _interopRequireDefault(_ContentWaterPrc);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 定义页面上的路由


	//comp
	var routes = _react2.default.createElement(
	    _reactRouter.Router,
	    { history: _reactRouter.hashHistory },
	    _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: _MeasurementReport2.default },
	        _react2.default.createElement(_reactRouter.IndexRoute, { component: Home }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'bmi', component: _ContentBmi2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'fatRate', component: _ContentFatRate2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'waterPrc', component: _ContentWaterPrc2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'musclePrc', component: _ContentMusclePrc2.default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'dateMetal', component: _ContentDateMetal2.default })
	    )
	); /**
	    * Created by Administrator on 2016-08-11.
	    */

	(0, _reactDom.render)(routes, document.getElementById('content'));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Administrator on 2016-08-11.
	 */


	var MeasurementReport = _react2.default.createClass({
	    displayName: 'MeasurementReport',
	    constructor: function constructor(props) {
	        //super(props);
	        this.state = {};
	        this.listenStore(Store); // 监听Store
	    },
	    handleSwitch: function handleSwitch() {
	        console.log(JSON.stringify(this.state));
	    },
	    getAttr: function getAttr() {
	        $('.measurementReport-ul').on('touchend', 'li', function () {
	            $(this).addClass('measurementReport-active').siblings().removeClass('measurementReport-active');
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	        window.addEventListener('resize', function () {
	            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	        }, false);
	    },
	    render: function render() {
	        var data = this.state;
	        var newProp = _react2.default.cloneElement(this.props.children, { data: data });
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'header',
	                { className: 'get-no-data-header' },
	                _react2.default.createElement('div', null),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'get-no-data-header-flex' },
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'get-no-data-w' },
	                        '体重'
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'get-no-data-w-data' },
	                        this.state.weightData,
	                        _react2.default.createElement(
	                            'span',
	                            {
	                                className: 'get-no-data-w-data-un' },
	                            'kg'
	                        )
	                    )
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-main' },
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'measurementReport-ul' },
	                    _react2.default.createElement(
	                        'li',
	                        { onTouchEnd: this.getAttr, title: 'bmi', className: 'measurementReport-active' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            'BMI'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { onTouchEnd: this.getAttr, title: 'fatRate' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            '脂肪率'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { onTouchEnd: this.getAttr, title: 'waterPrc' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            '水分比例'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { onTouchEnd: this.getAttr, title: 'musclePrc' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            '肌肉比例'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { onTouchEnd: this.getAttr, title: 'dateMetal' },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/' },
	                            '基础代谢'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { id: 'content' },
	                    newProp
	                )
	            )
	        );
	    }
	});

	exports.default = MeasurementReport;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContentBmi = _react2.default.createClass({
	    displayName: 'ContentBmi',
	    render: function render() {
	        var measurementCans = '../../static/img/measurementCanvas.png';
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'content-bmi' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            this.props.mydata
	                        ),
	                        '%'
	                    ),
	                    _react2.default.createElement('img', { className: 'measurementReport-content-pic', src: measurementCans })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'BMI：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            'BMI是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '主要用于统计用途，当我们需要比较及分析一个人的体重对于不同高度的人所带来的健康影响时，BMI值是一个中立而可靠的指标。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	}); /**
	     * Created by Administrator on 2016-08-11.
	     */


	exports.default = ContentBmi;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContentDateMetal = _react2.default.createClass({
	    displayName: 'ContentDateMetal',
	    render: function render() {
	        var measurementCans = '../../static/img/measurementCanvas.png';
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'content-metal' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            this.props.dataMe
	                        ),
	                        '%'
	                    ),
	                    _react2.default.createElement('img', { className: 'measurementReport-content-pic', src: measurementCans })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '基础代谢率：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '基础代谢率（BMR）是指人体在清醒而又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '婴儿时期，因为身体组织生长旺盛，基础代谢率最高，以后随着年龄的增长而逐渐降低。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	}); /**
	     * Created by Administrator on 2016-08-11.
	     */
	/**
	 * Created by Administrator on 2016-08-11.
	 */


	exports.default = ContentDateMetal;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContentFatRate = _react2.default.createClass({
	    displayName: 'ContentFatRate',
	    render: function render() {
	        var measurementCans = '../../static/img/measurementCanvas.png';
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'content-fatRate' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            this.props.mydata
	                        ),
	                        '%'
	                    ),
	                    _react2.default.createElement('img', { className: 'measurementReport-content-pic', src: measurementCans })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '脂肪率：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '是指身体成分中，脂肪组织所占的比率。'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-ans' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '改善体脂的办法，仅供参考：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '1、少吃零食：每餐的间隔正是燃烧脂肪的大好时机,不要进食零食增进脂肪；'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '2、饭配菜：外食以五谷杂粮、米饭为主食，以蔬菜为主菜、肉类为配菜；'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '3、慎选食品：外食避免点油炸类食品，避免添加大量糖和盐等调味料；'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '4、晚餐外食以蛋白质为主：人在睡觉时,脂肪会不断累积,所以晚餐应以蛋白质为主，不宜吃脂肪含量极高的食品；'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '5、进行有氧运动：每隔一天进行有氧运动1次，每次运动30分钟左右。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	}); /**
	     * Created by Administrator on 2016-08-11.
	     */


	exports.default = ContentFatRate;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContentMusclePrc = _react2.default.createClass({
	    displayName: 'ContentMusclePrc',
	    render: function render() {
	        var measurementCans = '../../static/img/measurementCanvas.png';
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'content-mus' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            this.props.dataMus
	                        ),
	                        '%'
	                    ),
	                    _react2.default.createElement('img', { className: 'measurementReport-content-pic', src: measurementCans })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '肌肉比例：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '肌肉比例是根据人体肌肉总量和人体体重、身高等相结合得到的人体的一个比例值.'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '这个值的范围决定一个人的身体健康状况以及力量的多少。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	}); /**
	     * Created by Administrator on 2016-08-11.
	     */
	/**
	 * Created by Administrator on 2016-08-11.
	 */


	exports.default = ContentMusclePrc;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContentWaterPrc = _react2.default.createClass({
	    displayName: 'ContentWaterPrc',
	    render: function render() {
	        var measurementCans = '../../static/img/measurementCanvas.png';
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'div',
	                { className: 'content-waterPrc' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        _react2.default.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            this.props.dataWa
	                        ),
	                        '%'
	                    ),
	                    _react2.default.createElement('img', { className: 'measurementReport-content-pic', src: measurementCans })
	                )
	            ),
	            _react2.default.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '水分：'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '是指身体水分占体重的百分比。'
	                        ),
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            '一个成年人体内的含水量约占人体重的65%左右。人在自己一生的生命活动过程中,随着年龄的增长,体内的含水分量也逐渐的减少。在婴儿时期,体内含水量可达72%,到了成年时期,水的含水量降到65%左右。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	}); /**
	     * Created by Administrator on 2016-08-11.
	     */


	exports.default = ContentWaterPrc;

/***/ }
/******/ ]);