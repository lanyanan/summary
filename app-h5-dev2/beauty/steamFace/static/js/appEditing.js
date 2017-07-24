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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.editing = undefined;

	var _Actions = __webpack_require__(2);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var editing = exports.editing = React.createClass({
	    displayName: 'editing',

	    //初始变量
	    getInitialState: function getInitialState() {
	        var _ref;

	        return _ref = {
	            timeshow: false,
	            deviceStatus: 2,
	            onOff: 1,
	            smartModeSwitch: 1,
	            deviceMode: 3,
	            modeName: 2
	        }, _defineProperty(_ref, 'timeshow', false), _defineProperty(_ref, 'divIndex', -1), _ref;
	    },

	    cancelClock: function cancelClock() {
	        _Actions.Actions.clockSwitch();
	    },
	    submitClock: function submitClock(m) {
	        _Actions.Actions.selectTime(m);
	    },
	    divTouchShow: function divTouchShow(e) {
	        this.setState({
	            timeshow: true
	        });
	        var index = e.target.getAttribute('data-index');
	        _Actions.Actions.addMinue(index);
	    },
	    SetTimeFromApp: function SetTimeFromApp() {
	        _Actions.Actions.setTimeFromApp();
	    },
	    render: function render() {
	        var items = [1, 2, 3, 4, 5, 6];
	        return React.createElement(
	            'div',
	            { className: 'div_box' },
	            React.createElement(
	                'div',
	                { className: 'div-info' },
	                React.createElement(
	                    'div',
	                    { className: 'div_box_lef' },
	                    React.createElement('div', { className: 'div_hot_img' }),
	                    React.createElement('div', { className: 'vertical' }),
	                    React.createElement('div', { className: 'div_cold_img' }),
	                    React.createElement('div', { className: 'vertical' }),
	                    React.createElement('div', { className: 'div_hot_img' }),
	                    React.createElement('div', { className: 'vertical' }),
	                    React.createElement('div', { className: 'div_cold_img' }),
	                    React.createElement('div', { className: 'vertical' }),
	                    React.createElement('div', { className: 'div_hot_img' }),
	                    React.createElement('div', { className: 'vertical' }),
	                    React.createElement('div', { className: 'div_cold_img' })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'div_box_right' },
	                    this.items.map(function (e, index) {
	                        return React.createElement(
	                            'div',
	                            { className: "div_operation " + (index === 0 ? 'div_operation0' : "" || index === 5 ? 'div_operation5' : "") },
	                            React.createElement(
	                                'div',
	                                { className: 'div_time' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'span_text' },
	                                    '热喷'
	                                ),
	                                React.createElement('br', null),
	                                React.createElement(
	                                    'span',
	                                    { className: 'span_time' },
	                                    timeArr[index],
	                                    ' min'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { 'data-index': index, className: 'div_editing', onTouchStart: this.divTouchShow },
	                                '编辑'
	                            )
	                        );
	                    }.bind(this))
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'duration' },
	                React.createElement(
	                    'span',
	                    { className: 'span_6' },
	                    '总时长：13min'
	                ),
	                React.createElement('br', null),
	                React.createElement(
	                    'span',
	                    { className: 'span_9' },
	                    '提示：总时长在1-15min之间'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'p_ok', onTouchEnd: this.SetTimeFromApp },
	                    '确定'
	                )
	            ),
	            React.createElement(TimeSelect, { title: '设置时间', hourshow: false, minuteshow: true, cancelClock: this.cancelClock,
	                submitClock: this.submitClock, statusname: ' ', show: timeshow })
	        );
	    }
	});

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
	'refreshData', 'clockSwitch', //定时开关
	'selectTime', //选取定时时间
	'switchMode', 'switchModeHand', 'addMinue', 'setTimeFromApp', 'selectTimeArr', 'opeenOrClose', 'changeDeviceStatus', 'setEditing', 'showMaxminute']);

/***/ }
/******/ ]);