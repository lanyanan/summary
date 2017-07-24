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

	module.exports = __webpack_require__(7);


/***/ },

/***/ 7:
/***/ function(module, exports) {

	'use strict';
	/**
	 * tips组件
	 * @prop {string} msg  弹框消息
	 * @prop {string} btn1  确定按钮文字
	 * @prop {string} btn2  取消按钮文字
	 * @prop {boolean} show  弹框是否显示
	 * @prop {boolean} layerCancel  点击透明遮罩背景部分是否触发取消回调
	 * @prop {function} sucCallback  用户点击确定的回调事件
	 * @prop {function} errCallback  用户点击取消的回调事件
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Tips = exports.Tips = React.createClass({
		displayName: 'Tips',
		getInitialState: function getInitialState() {
			return { show: false };
		},
		componentDidMount: function componentDidMount() {
			if (this.props.show === true) {
				this.setState({
					show: true
				});
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (!this.props.show && nextProps.show === true) {
				this.setState({
					show: true
				});
			}
		},
		boxtouch: function boxtouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (this.props.layerCancel && e.target.getAttribute('id') == 'tips') {
				this.noTouch(e);
			}
		},
		yesTouch: function yesTouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (typeof this.props.sucCallback === 'function') {
				this.props.sucCallback();
			}
			this.setState({
				show: false
			});
		},
		noTouch: function noTouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (typeof this.props.errCallback === 'function') {
				this.props.errCallback();
			}
			this.setState({
				show: false
			});
		},

		render: function render() {
			var msg = this.props.msg || '';
			var show = this.state.show || false;
			var btn1 = this.props.btn1;
			var btn2 = this.props.btn2;
			return React.createElement(
				'section',
				{ className: 'tips', id: 'tips', onTouchStart: this.boxtouch, style: { display: show ? 'block' : 'none' } },
				React.createElement(
					'section',
					{ className: 'tips-main' },
					React.createElement(
						'p',
						{ className: 'box-tips' },
						msg
					),
					React.createElement(
						'div',
						{ className: 'box-btn', onTouchEnd: this.yesTouch },
						btn1 || '确定'
					),
					React.createElement(
						'div',
						{ className: 'box-btn', onTouchEnd: this.noTouch },
						btn2 || '取消'
					)
				)
			);
		}
	});

/***/ }

/******/ });