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

	module.exports = __webpack_require__(6);


/***/ },

/***/ 6:
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

/***/ }

/******/ });