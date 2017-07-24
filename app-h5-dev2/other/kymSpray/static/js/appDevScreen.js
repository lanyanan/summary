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
/***/ function(module, exports) {

	"use strict";

	/**
	 * 主显示组件
	 * @prop {integer} skinDataCode   有无肤质数据
	 * @prop {string}  recommendMode  推荐模式名称
	 * @prop {string}  skinType       肤质
	 * @prop {integer} moisture       水分百分值
	 * @prop {integer} onlineStatus   是否离线状态
	 * <a href="cbeauty://cbeauty_skintest">去测试肌肤&gt;&gt;</a>
	 */

	var DevScreen = React.createClass({
	    displayName: "DevScreen",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    baseData: {
	        modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	        skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	        times: [0, 100, 40, 80, 50, 40]
	    },
	    render: function render() {
	        var tips = [React.createElement(
	            "span",
	            null,
	            "\u4E3A\u4F7F\u667A\u80FD\u8865\u6C34\u55B7\u96FE\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5..."
	        ), React.createElement(
	            "span",
	            null,
	            "\u60A8\u5F53\u524D\u4E3A",
	            this.baseData.skins[this.props.skinType5],
	            "\u80A4\u8D28\uFF0C\u63A8\u8350\u60A8\u4F7F\u7528",
	            this.baseData.modes[this.props.mode],
	            "\uFF01\u7F8E\u4E3D\u5973\u4EBA\u662F\u517B\u51FA\u6765\u7684~"
	        ), React.createElement(
	            "span",
	            null,
	            "\u60A8\u4F7F\u7528\u4E86\u667A\u80FD\u8865\u6C34\u55B7\u96FE\u4EEA\u540E\uFF0C\u8138\u90E8\u76AE\u80A4\u6C34\u5206\u63D0\u5347\u4E86",
	            this.props.waterTrend,
	            "%\uFF0C\u8BF7\u7EE7\u7EED\u4FDD\u6301~"
	        )];

	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement(
	                "div",
	                { className: "pic" },
	                React.createElement("img", { className: "pic", src: "../static/img/ico-10.png" }),
	                this.props.onlineStatus == 2 ? React.createElement(
	                    "span",
	                    { className: "offline" },
	                    "\u60A8\u7684\u8BBE\u5907\u5DF2\u79BB\u7EBF"
	                ) : ""
	            ),
	            React.createElement(
	                "div",
	                { className: "tip" },
	                tips[this.props.skinDataCode]
	            ),
	            this.props.electricity <= 4 && this.props.chargeStatus < 2 && this.props.onlineStatus != 2 ? React.createElement("div", { className: "battery" }) : ""
	        );
	    }
	});

	module.exports = DevScreen;

/***/ }
/******/ ]);