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

	module.exports = __webpack_require__(16);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(3);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 3 */
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
	    } // 公共函数模块

	};
	module.exports = Funs;

/***/ },
/* 4 */
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
	        css["-webkit-animation"] = css.animation;
	        css["-moz-animation"] = css.animation;
	        css["-o-animation"] = css.animation;
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
/* 5 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 主显示组件
	 * @prop {integer} skinDataCode   有无肤质数据
	 * @prop {string}  recommendMode  推荐模式名称
	 * @prop {string}  skinType       肤质
	 * @prop {integer} moisture       水分百分值
	 * @prop {integer} onlineStatus   是否离线状态
	 * @prop {integer} busiSwitch     是否自动模式
	 * @prop {function} toggleBusiSwitch 切换自动/手动模式
	 */
	var DevScreen = React.createClass({
	    displayName: "DevScreen",

	    skins: [],
	    handleBusiSwitch: function handleBusiSwitch() {
	        this.props.toggleBusiSwitch();
	    },
	    render: function render() {
	        var tips = [React.createElement(
	            "span",
	            null,
	            "为使彩光导入仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...",
	            React.createElement(
	                "a",
	                { href: "cbeauty://cbeauty_skintest" },
	                "去测试肤质>>"
	            )
	        ), React.createElement(
	            "span",
	            null,
	            "您当前肤质为",
	            this.props.skinType,
	            "，推荐您使用",
	            this.props.recommendMode,
	            "模式！美丽女人是养出来的~"
	        ), React.createElement(
	            "span",
	            null,
	            "您使用了彩光导入仪后，脸部皮肤水分提升了",
	            this.props.moisture,
	            "%，请继续保持~"
	        )];
	        var index = this.props.skinDataCode;
	        return React.createElement(
	            "section",
	            { className: "screen" },
	            this.props.busiSwitch == "1" ? React.createElement(
	                "div",
	                { className: "gear-choose", onTouchEnd: this.handleBusiSwitch },
	                React.createElement(
	                    "div",
	                    { className: "gear-txt" },
	                    "自动"
	                ),
	                React.createElement("div", { className: "gear-circle" })
	            ) : React.createElement(
	                "div",
	                { className: "gear-choose", onTouchEnd: this.handleBusiSwitch },
	                React.createElement(
	                    "div",
	                    { className: "gear-txts" },
	                    "手动"
	                ),
	                React.createElement("div", { className: "gear-circle gear-circles" })
	            ),
	            React.createElement(
	                "div",
	                { className: "pic" },
	                React.createElement("img", { src: "../static/img/ico-kym.png" }),
	                this.props.onlineStatus == 2 ? React.createElement(
	                    "span",
	                    { className: "offline" },
	                    "您的设备已离线"
	                ) : ""
	            ),
	            React.createElement(
	                "div",
	                { className: "tip" },
	                tips[index]
	            )
	        );
	    }
	});

	module.exports = DevScreen;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 选择列表组件
	 * 当路由/select/:component/:initValue时，将会调用该组件。
	 * 子组件由:component指定，初始值由:initValue指定
	 * @variable {object} ReactRouter  需要一个名为ReactRouter的react路由对象以提供State访问服务
	 * @act AppActions.selectAny([json]) 点击确定时触发
	 */
	window.SelectActions = Reflux.createActions(['selected' // 选定
	]);
	var strikeTimer; // 处理低版本浏览器tap点透BUG的计时器
	var SelectStore = Reflux.createStore({
	    listenables: [SelectActions],
	    onSelected: function onSelected(data) {
	        this.trigger(data);
	    }
	});
	var Selects = React.createClass({
	    displayName: "Selects",

	    mixins: [ReactRouter.State, Reflux.connect(SelectStore)],
	    handlerOkClick: function handlerOkClick(e) {
	        var selBody = React.findDOMNode(this.refs["body"]);
	        // 处理低版本浏览器tap点透BUG
	        if (new Date() - strikeTimer < 600) {
	            return false;
	        }
	        e.preventDefault();
	        AppActions.selectAny(this.state);
	        selBody.className = selBody.className.replace(/ on/g, "");
	        setTimeout(function () {
	            history.go(-1);
	        }, 300);
	    },
	    handlerNoClick: function handlerNoClick(e) {
	        var selBody = React.findDOMNode(this.refs["body"]);
	        // 处理低版本浏览器tap点透BUG
	        if (new Date() - strikeTimer < 600) {
	            return false;
	        }
	        e.preventDefault();
	        selBody.className = selBody.className.replace(/ on/g, "");
	        setTimeout(function () {
	            history.go(-1);
	        }, 300);
	    },
	    handlerBodyClick: function handlerBodyClick(e) {
	        e.preventDefault();
	        e.stopPropagation();
	    },
	    componentDidMount: function componentDidMount() {
	        var selBody = React.findDOMNode(this.refs["body"]);
	        strikeTimer = new Date();
	        setTimeout(function () {
	            selBody.className += " on";
	        }, 10);
	    },
	    render: function render() {
	        var Component = components[this.getParams().component]; // 取得组件
	        var initValue = this.getParams().initValue; // 取得组件初始值
	        var other = this.getParams().other; // 取得组件初始值
	        return React.createElement(
	            "section",
	            { className: "popselect-wrap", onClick: this.handlerNoClick },
	            React.createElement(
	                "div",
	                { ref: "body", className: "popselect-body", onClick: this.handlerBodyClick },
	                React.createElement(
	                    "div",
	                    { className: "popselect-btns flex" },
	                    React.createElement(
	                        "a",
	                        { href: "#", onClick: this.handlerNoClick, className: "flex-cell popselect-btns-no" },
	                        "取消"
	                    ),
	                    React.createElement("span", { className: "flex-cell" }),
	                    React.createElement(
	                        "a",
	                        { href: "#", onClick: this.handlerOkClick, className: "flex-cell popselect-btns-ok" },
	                        "确认"
	                    )
	                ),
	                Component ? React.createElement(Component, { value: initValue, other: other }) : ""
	            )
	        );
	    }
	});
	// 可供调用的组件列表
	var components = {
	    "mode": __webpack_require__(7),
	    "ut": __webpack_require__(8),
	    "light": __webpack_require__(10),
	    "ie": __webpack_require__(11),
	    "knead": __webpack_require__(12),
	    "time": __webpack_require__(13)
	};

	module.exports = Selects;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 选择模式组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  模式id
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var Modes = React.createClass({
	    displayName: "Modes",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    items: [{ id: "1", text: "清洁", data: {
	            ut: 3,
	            imp: 0,
	            exp: 3,
	            knead: 6,
	            light: 8,
	            time: 15,
	            configMode: 1
	        } }, { id: "2", text: "回春", data: {
	            ut: 0,
	            imp: 3,
	            exp: 0,
	            knead: 6,
	            light: 9,
	            time: 10,
	            configMode: 2
	        } }, { id: "3", text: "滋养", data: {
	            ut: 0,
	            imp: 3,
	            exp: 0,
	            knead: 6,
	            light: 7,
	            time: 15,
	            configMode: 3
	        } }, { id: "4", text: "美白", data: {
	            ut: 3,
	            imp: 0,
	            exp: 3,
	            knead: 6,
	            light: 9,
	            time: 13,
	            configMode: 4
	        } }, { id: "5", text: "自定义", data: {
	            ut: 0,
	            imp: 0,
	            exp: 0,
	            knead: 0,
	            light: 0,
	            time: 5,
	            configMode: 5
	        } }],
	    handlerClick: function handlerClick(e) {
	        var value = e.target.getAttribute("data-value");
	        var data;
	        for (var i in this.items) {
	            if (this.items[i].id === value) {
	                data = this.items[i].data;
	                break;
	            }
	        }
	        this.setState({ value: value });
	        data.currentRunMode = value;
	        SelectActions.selected(data);
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "select-modes" },
	            React.createElement(
	                "h2",
	                null,
	                "模式选择"
	            ),
	            React.createElement(
	                "menu",
	                null,
	                this.items.map(function (item) {
	                    return React.createElement("input", { className: item.id == value ? "active" : "", type: "button", value: item.text, "data-value": item.id, onTouchEnd: this.handlerClick });
	                }.bind(this))
	            )
	        );
	    }
	});

	module.exports = Modes;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 超声波配置组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  模式id
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var Uts = React.createClass({
	    displayName: "Uts",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    items: [{ id: "1", text: "一档" }, { id: "2", text: "二档" }, { id: "3", text: "三档" }, { id: "4", text: "四档" }, { id: "5", text: "五档" }],
	    handlerSwitch: function handlerSwitch(e) {
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	        e.preventDefault();
	        this.setState({ value: value });
	        SelectActions.selected({ "ut": value });
	    },
	    feedback: function feedback(value) {
	        SelectActions.selected({ "ut": value });
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "select-uts" },
	            React.createElement(
	                "div",
	                { className: "flex popselect-hd" },
	                React.createElement(
	                    "h2",
	                    { className: "flex-cell" },
	                    "超声波"
	                ),
	                React.createElement(
	                    "span",
	                    { className: "popselect-hd-right flex-cell tr" },
	                    React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch, className: "qswitch " + (value == 0 ? "off" : "on") })
	                )
	            ),
	            React.createElement(QSlider, { disabled: value == 0 ? true : false, items: this.items, value: value, fnFeedback: this.feedback })
	        );
	    }
	});

	var QSlider = __webpack_require__(9);

	module.exports = Uts;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {array}    items       传入组件，格式：[{id:ID,text:TEXT},..]
	 * @prop {integer}  value       传入初始值
	 * @prop {boolean}  disabled    是否可以点击
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 */
	var QSlidor = React.createClass({
	    displayName: "QSlidor",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    slidable: false,
	    XY: { startX: 0, startY: 0, endX: 0, endY: 0 },
	    handlerTouchStart: function handlerTouchStart(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        this.XY.startX = this.XY.endX = touchs[0].pageX;
	        this.XY.startY = this.XY.endY = touchs[0].pageY;
	        // 检测滑动是否有效
	        if (touchs.length === 1 && !this.props.disabled) {
	            cursor.style.marginLeft = 0;
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.startX >= el.offsetLeft && this.XY.startX <= el.offsetLeft + el.offsetWidth) {
	                    // 检测是否位于已激活的选项内开始滑动的。如否，则不允许滑动
	                    // this.slidable = el.className.indexOf("active")>-1;
	                    this.slidable = true;
	                }
	            }.bind(this));
	        }
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var left = touchs[0].pageX - parent.offsetLeft - cursor.offsetWidth / 2;
	        e.preventDefault();
	        if (this.slidable) {
	            cursor.style.opacity = 1;
	            cursor.style.left = left + "px";
	        }
	    },
	    handlerTouchEnd: function handlerTouchEnd(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.changedTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var ml = 0;
	        this.XY.endX = touchs[0].pageX;
	        this.XY.endY = touchs[0].pageY;
	        if (this.slidable) {
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.endX >= el.offsetLeft && this.XY.endX <= el.offsetLeft + el.offsetWidth) {
	                    ml = el.offsetLeft - (this.XY.endX - parent.offsetLeft - cursor.offsetWidth * 3 / 2);
	                    cursor.style.marginLeft = ml + "px";
	                    cursor.style.opacity = 0;
	                    this.sendResult(item.id);
	                }
	            }.bind(this));
	        }
	        this.slidable = false;
	    },
	    sendResult: function sendResult(value) {
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        return React.createElement(
	            "menu",
	            { ref: "qslider", className: "qslider flex", onTouchStart: this.handlerTouchStart, onTouchEnd: this.handlerTouchEnd, onTouchMove: this.handlerTouchMove },
	            React.createElement("i", { ref: "cursor", className: "qslider-cursor" }),
	            this.props.items.map(function (item, key) {
	                return React.createElement(
	                    "a",
	                    { key: key, ref: "item" + item.id, className: "flex-cell " + (item.id == value ? "active" : "") },
	                    React.createElement("i", null),
	                    item.text
	                );
	            }.bind(this))
	        );
	    }
	});

	module.exports = QSlidor;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 采光配置组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  模式id
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var Lights = React.createClass({
	    displayName: "Lights",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    items: [{ id: "7", text: "红光" }, { id: "8", text: "蓝光" }, { id: "9", text: "绿光" }],
	    handlerClick: function handlerClick(e) {
	        var value = e.target.getAttribute("data-value");
	        if ((typeof this.state.value !== "undefined" ? this.state.value : this.props.value) == 0) {
	            return false;
	        } // 控件关闭状态，不允许点击
	        this.setState({ value: value });
	        SelectActions.selected({ "light": value });
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 7;
	        e.preventDefault();
	        this.setState({ value: value });
	        SelectActions.selected({ "light": value });
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "select-modes select-lights" },
	            React.createElement(
	                "div",
	                { className: "flex popselect-hd" },
	                React.createElement(
	                    "h2",
	                    { className: "flex-cell" },
	                    "彩光"
	                ),
	                React.createElement(
	                    "span",
	                    { className: "popselect-hd-right flex-cell tr" },
	                    React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch, className: "qswitch " + (value == 0 ? "off" : "on") })
	                )
	            ),
	            React.createElement(
	                "menu",
	                null,
	                this.items.map(function (item) {
	                    return React.createElement("input", { className: item.id == value ? "active" : "", type: "button", value: item.text, "data-value": item.id, onTouchEnd: this.handlerClick });
	                }.bind(this))
	            )
	        );
	    }
	});

	module.exports = Lights;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 导入导出配置组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  模式id
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var IEs = React.createClass({
	    displayName: "IEs",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    items: [{ id: "1", text: "一档" }, { id: "2", text: "二档" }, { id: "3", text: "三档" }, { id: "4", text: "四档" }, { id: "5", text: "五档" }],
	    data: { "exp": 0, "imp": 0 },
	    handlerSwitch: function handlerSwitch(e) {
	        var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
	        e.preventDefault();
	        this.data["imp"] = 0;
	        this.data["exp"] = 0;
	        this.data[mode] = value;
	        this.setState({ "value": value });
	        SelectActions.selected(this.data);
	    },
	    // 导入模式
	    handlerImport: function handlerImport(e) {
	        e.preventDefault();
	        this.setState({ "other": "imp" });
	        this.setState({ "value": 1 });
	        this.data["imp"] = 1;
	        this.data["exp"] = 0;
	        SelectActions.selected(this.data);
	    },
	    // 导出模式
	    handlerExport: function handlerExport(e) {
	        e.preventDefault();
	        this.setState({ "other": "exp" });
	        this.setState({ "value": 1 });
	        this.data["imp"] = 0;
	        this.data["exp"] = 1;
	        SelectActions.selected(this.data);
	    },
	    feedback: function feedback(value) {
	        var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	        this.data[mode] = value;
	        SelectActions.selected(this.data);
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        // 导入/导出模式
	        var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
	        return React.createElement(
	            "div",
	            { className: "select-ie" },
	            React.createElement(
	                "div",
	                { className: "flex popselect-hd" },
	                React.createElement(
	                    "span",
	                    { className: "select-ie-btns" },
	                    React.createElement(
	                        "a",
	                        { ref: "imp", href: "#", className: mode === "imp" ? "active" : "", onTouchEnd: this.handlerImport },
	                        "导入"
	                    ),
	                    React.createElement(
	                        "a",
	                        { ref: "exp", href: "#", className: mode === "exp" ? "active" : "", onTouchEnd: this.handlerExport },
	                        "导出"
	                    )
	                ),
	                React.createElement(
	                    "span",
	                    { className: "popselect-hd-right flex-cell tr" },
	                    React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch, className: "qswitch " + (value == 0 ? "off" : "on") })
	                )
	            ),
	            React.createElement(QSlider, { disabled: value == 0 ? true : false, items: this.items, value: value, fnFeedback: this.feedback })
	        );
	    }
	});

	var QSlider = __webpack_require__(9);

	module.exports = IEs;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 按摩配置组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  模式id
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var Knead = React.createClass({
	    displayName: "Knead",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 6;
	        e.preventDefault();
	        this.setState({ value: value });
	        SelectActions.selected({ "knead": value });
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "select-uts" },
	            React.createElement(
	                "div",
	                { className: "flex popselect-hd" },
	                React.createElement(
	                    "h2",
	                    { className: "flex-cell" },
	                    "按摩"
	                ),
	                React.createElement(
	                    "span",
	                    { className: "popselect-hd-right flex-cell tr" },
	                    React.createElement("a", { href: "#", onTouchEnd: this.handlerSwitch, className: "qswitch " + (value == 0 ? "off" : "on") })
	                )
	            )
	        );
	    }
	});

	module.exports = Knead;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * 时间配置组件
	 * 该组件为Selects子组件，由Selects.jsx文件调用
	 * @prop {integer} value  时间
	 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
	 */
	var Timer = React.createClass({
	    displayName: "Timer",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    feedback: function feedback(value) {
	        SelectActions.selected({ "time": value });
	    },
	    handlerClick: function handlerClick(e) {
	        e.preventDefault(); // 修复ios点透bug
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "select-time", onClick: this.handlerClick },
	            React.createElement(
	                "div",
	                { className: "flex popselect-hd" },
	                React.createElement(
	                    "h2",
	                    { className: "flex-cell" },
	                    "时长"
	                )
	            ),
	            React.createElement(Range, { min: "1", max: "19", value: value, fnFeedback: this.feedback }),
	            React.createElement(
	                "ul",
	                { className: "flex" },
	                React.createElement(
	                    "li",
	                    { className: "flex-cell tl" },
	                    "1min"
	                ),
	                React.createElement(
	                    "li",
	                    { className: "flex-cell tr" },
	                    "19min"
	                )
	            )
	        );
	    }
	});

	var Range = __webpack_require__(14);

	module.exports = Timer;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {integer}  value       传入初始值
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 * @prop {integer}  min         可选，最小值，缺省为0
	 * @prop {integer}  max         可选，最大值，缺省为100
	 * @prop {boolean}  disabled    可选，是否可以点击
	 */
	var Range = React.createClass({
	    displayName: "Range",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        return this.props.min || "0";
	    },
	    max: function max() {
	        return this.props.max || "100";
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.target.value);
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        this.pos(value);
	    },
	    componentDidMount: function componentDidMount() {
	        this.componentDidUpdate();
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor" },
	                    value
	                )
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 保存设置按钮组件
	 * @prop {string} settingStatus  设置按钮状态
	 * @act  {function} this.props.callback 点击保存时触发
	 */
	var SettingButton = React.createClass({
	    displayName: 'SettingButton',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            settingBtnStatus: nextProps.settingStatus
	        });
	    },
	    TouchStart: function TouchStart(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var status = this.state.settingBtnStatus == 'active' ? 'on' : 'active';
	        this.setState({
	            settingBtnStatus: status
	        });
	    },
	    TouchEnd: function TouchEnd(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        if (typeof this.props.callback === 'function') {
	            this.props.callback();
	        }
	    },
	    render: function render() {
	        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        return React.createElement(
	            'section',
	            { onTouchStart: this.TouchStart, onTouchEnd: this.TouchEnd, className: "settingbtn-" + idx },
	            React.createElement(
	                'em',
	                null,
	                '保存设置'
	            )
	        );
	    }
	});
	module.exports = SettingButton;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fun = __webpack_require__(2);

	// app数据
	var AppData = {};

	// 加载组件
	var Route = ReactRouter.Route;
	var RouteHandler = ReactRouter.RouteHandler;
	var Toast = __webpack_require__(4);

	var DevScreen = __webpack_require__(5);
	var Selects = __webpack_require__(6);
	var SettingButton = __webpack_require__(15);

	React.initializeTouchEvents(true); // 开启触摸支持
	var myscroller; // iscroll滚动容器

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    React.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	// 定义事件
	window.AppActions = Reflux.createActions(['repaint', // 重绘
	'toggleBusi', // 自动/手动模式切换
	'selectAny', // 选择模式
	'sync' // 同步数据
	]);

	// 智能模式（展会版本使用）
	var AppModes = {
	    1: { //清洁
	        ut: 3,
	        imp: 0,
	        exp: 3,
	        knead: 1,
	        light: 1,
	        time: 15,
	        configMode: 1
	    },
	    2: { // 回春
	        ut: 0,
	        imp: 3,
	        exp: 0,
	        knead: 1,
	        light: 2,
	        time: 10,
	        configMode: 2
	    },
	    3: { // 滋养
	        ut: 0,
	        imp: 3,
	        exp: 0,
	        knead: 1,
	        light: 3,
	        time: 15,
	        configMode: 3
	    },
	    4: { // 美白
	        ut: 3,
	        imp: 0,
	        exp: 3,
	        knead: 1,
	        light: 2,
	        time: 13,
	        configMode: 4
	    },
	    5: { // 自定义
	        ut: 0,
	        imp: 0,
	        exp: 0,
	        knead: 0,
	        light: 0,
	        time: 5,
	        configMode: 5
	    }
	};

	// 定义store
	var AppStore = Reflux.createStore({
	    listenables: [AppActions],
	    onRepaint: function onRepaint(data) {
	        if (AppData.busiSwitch) {
	            // 展会版本添加
	            AppModes[5].ut = typeof data.ut !== 'undefined' ? data.ut : AppModes[5].ut;
	            AppModes[5].imp = typeof data.imp !== 'undefined' ? data.imp : AppModes[5].imp;
	            AppModes[5].exp = typeof data.exp !== 'undefined' ? data.exp : AppModes[5].exp;
	            AppModes[5].knead = typeof data.knead !== 'undefined' ? data.knead : AppModes[5].knead;
	            AppModes[5].light = typeof data.light !== 'undefined' ? data.light : AppModes[5].light;
	            AppModes[5].time = typeof data.time !== 'undefined' ? data.time : AppModes[5].time;
	            AppModes[5].configMode = typeof data.configMode !== 'undefined' ? data.configMode : AppModes[5].configMode;
	            data = _fun.Funs._extends({}, data, getBusiData(AppData));
	        }
	        this.trigger(data);
	    },
	    onToggleBusi: function onToggleBusi() {
	        if (AppData.skinDataCode == 0) {
	            het.toast('您还未测试肤质，请先测试肤质！');
	            return;
	        }
	        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
	        if (AppData.busiSwitch) {
	            // 自动模式
	            AppModes[5].ut = AppData.ut;
	            AppModes[5].imp = AppData.imp;
	            AppModes[5].exp = AppData.exp;
	            AppModes[5].knead = AppData.knead;
	            AppModes[5].light = AppData.light;
	            AppModes[5].time = AppData.time;
	            AppModes[5].configMode = AppData.configMode;
	            _fun.Funs._extends(AppData, getBusiData(AppData));
	        } else {
	            // 切回手动模式
	            AppData.ut = AppModes[5].ut;
	            AppData.imp = AppModes[5].imp;
	            AppData.exp = AppModes[5].exp;
	            AppData.knead = AppModes[5].knead;
	            AppData.light = AppModes[5].light;
	            AppData.time = AppModes[5].time;
	            AppData.configMode = AppModes[5].configMode;
	        }
	        AppData.needSave = getSaveFlag();
	        this.trigger(AppData);
	    },
	    onSelectAny: function onSelectAny(data) {
	        // updateFlag映射表
	        /*var flagMap = {
	            "ut" : 0x01, // 超声波标记位
	            "exp" : 0x02, // 导出标记位
	            "imp" : 0x04, // 导入标记位
	            "knead" : 0x08, // 按摩标记位
	            "light" : 0x10, // 采光标记位
	            "time" : 0x20 // 运行时间标记位
	        };*/
	        for (var k in data) {
	            // AppData.updateFlag |= flagMap[k]; // 设置标记位
	            AppData[k] = data[k]; // 设置修改数据
	        }
	        AppData.needSave = getSaveFlag();
	        // data.updateFlag = AppData.updateFlag;
	        this.trigger(data);
	    },
	    onSync: function onSync() {
	        // 同步数据至app
	        var sendData = _fun.Funs._extends({}, AppData);
	        if (AppData.needSave) {
	            // if (AppData.light==8) {
	            //     sendData.light = 9;
	            // }
	            // if (AppData.light==9) {
	            //     sendData.light = 8;
	            // }
	            het.send(sendData, function (data) {
	                het.toast("同步成功！");
	            }, function (data) {
	                het.toast("同步失败！");
	            });
	            AppData.needSave = false; // 重置标记位
	            this.trigger({ needSave: false });
	            mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }
	});

	// 定义app对象
	var App = React.createClass({
	    displayName: 'App',

	    mixins: [Reflux.connect(AppStore)],
	    // 基本数据
	    baseData: {
	        modes: { 0: "请选择", 1: "清洁", 2: "回春", 3: "滋养", 4: "美白", 5: "自定义" },
	        skins: ["综合肤质", "干性肤质", "中性偏干", "中性肤质", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	        lights: { 0: "关闭", 1: "黄光", 2: "蓝光", 3: "红光" },
	        uts: ["关闭", "一档", "二档", "三档", "四档", "五档"]
	    },
	    getInitialState: function getInitialState() {
	        return {
	            currentRunMode: 0,
	            ut: 0,
	            imp: 0,
	            exp: 0,
	            knead: 0,
	            light: 0,
	            time: 0,
	            skinDataCode: 0,
	            busiSwitch: 0
	        };
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        try {
	            myscroller.refresh();
	        } catch (err) {}
	    },
	    componentDidMount: function componentDidMount() {
	        mytoast("使用完彩光美容仪，建议进行肤质测试，以得到更好的效果...");
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        if (e.target.type !== "range") {
	            e.preventDefault(); // 修复touchmove无效的BUG
	        }
	    },
	    handleClick: function handleClick(e) {
	        if (AppData.busiSwitch) {
	            // 自动模式，不允许点击
	            e.preventDefault();
	        }
	    },
	    render: function render() {
	        var mode = this.state.busiSwitch ? this.state.recommendMode : this.state.currentRunMode; // 取得当前模式
	        var cusMode = mode == 5 ? true : false; // 自定义模式
	        var modeClass = cusMode ? "active" : "";
	        var ie = this.state.exp || this.state.imp; // 导出/导入档位
	        return React.createElement(
	            'div',
	            { onClick: this.handleClick },
	            React.createElement(
	                'div',
	                { className: 'padding_div' },
	                React.createElement(
	                    'section',
	                    null,
	                    React.createElement(DevScreen, { moisture: this.state.moisture, skinDataCode: this.state.skinDataCode,
	                        recommendMode: this.baseData.modes[this.state.recommendMode],
	                        skinType: this.baseData.skins[this.state.skinType],
	                        onlineStatus: this.state.onlineStatus,
	                        busiSwitch: this.state.busiSwitch, toggleBusiSwitch: AppActions.toggleBusi }),
	                    React.createElement(
	                        'div',
	                        { className: 'pselect flex' },
	                        React.createElement(
	                            'label',
	                            null,
	                            '当前模式'
	                        ),
	                        React.createElement(
	                            'a',
	                            { id: 'test1', href: "#/select/mode/" + mode, className: 'val flex-cell' },
	                            this.baseData.modes[mode]
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'select-wrap flex' },
	                        React.createElement(
	                            'div',
	                            { className: modeClass + " qselect flex-cell flex" },
	                            React.createElement(
	                                'label',
	                                null,
	                                '超声波'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: cusMode ? "#/select/ut/" + this.state.ut : "javascript:", className: 'val flex-cell' },
	                                this.baseData.uts[this.state.ut]
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: modeClass + " qselect flex-cell flex" },
	                            React.createElement(
	                                'label',
	                                null,
	                                '导入/导出'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: cusMode ? "#/select/ie/" + ie + "/" + (this.state.exp ? "exp" : "imp") : "javascript:", className: 'val flex-cell' },
	                                (ie ? this.state.exp ? "导出" : "导入" : "") + this.baseData.uts[ie]
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'select-wrap flex' },
	                        React.createElement(
	                            'div',
	                            { className: modeClass + " qselect flex-cell flex" },
	                            React.createElement(
	                                'label',
	                                null,
	                                '按摩'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: cusMode ? "#/select/knead/" + this.state.knead : "javascript:", className: 'val flex-cell' },
	                                this.state.knead != 0 ? "开启" : "关闭"
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: modeClass + " qselect flex-cell flex" },
	                            React.createElement(
	                                'label',
	                                null,
	                                '彩光'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: cusMode ? "#/select/light/" + this.state.light : "javascript:", className: 'val flex-cell' },
	                                this.baseData.lights[this.state.light]
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: modeClass + " qselect flex-cell timelen flex" },
	                        React.createElement(
	                            'label',
	                            { className: 'flex-cell time-label' },
	                            '总时长：'
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: cusMode ? "#/select/time/" + this.state.time : "javascript:", className: 'val flex-cell' },
	                            this.state.time,
	                            'min'
	                        )
	                    ),
	                    this.state.battery < 5 && this.state.chargeStatus < 2 && this.state.onlineStatus == 1 ? React.createElement(
	                        'div',
	                        { className: 'battery' },
	                        '电量不足，请充电'
	                    ) : ""
	                )
	            ),
	            React.createElement(
	                'div',
	                { id: 'footer' },
	                React.createElement(SettingButton, { settingStatus: AppData.needSave ? "on" : "off", callback: AppActions.sync })
	            ),
	            React.createElement(RouteHandler, null),
	            React.createElement('div', { id: 'mytoast' })
	        );
	    }
	});

	// 定义路由
	var Routes = React.createElement(
	    Route,
	    { path: '/', handler: App },
	    React.createElement(Route, { path: '/select/:component/:initValue', handler: Selects }),
	    React.createElement(Route, { path: '/select/:component/:initValue/:other', handler: Selects })
	);

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        // 模板数据与接口数据映射表
	        debugMode: "print", // 打印调试数据
	        useUpdateFlag: true, // 自动添加updateFlag标记
	        webDataMap: {
	            "recommendMode": "mode", // 推荐模式
	            "currentRunMode": "currentRunMode", // 当前模式
	            "skinDataCode": "skinDataCode", // 有无肤质数据
	            "skinType": "skinType5", // 肤质
	            "configMode": "configMode", // 是否智能模式
	            "moisture": "waterTrend", // 水分提升
	            "ut": "gears1", // 超声波
	            "exp": "gears2", // 导出
	            "imp": "gears3", // 导入
	            "knead": "gears4", // 按摩
	            "light": "gears5", // 采光
	            "time": "runTime", // 时长
	            "battery": "electricity", // 电量
	            "chargeStatus": "chargeStatus" // 充电状态
	        },
	        updateFlagMap: {
	            "ut": 1, // 超声波标记位
	            "exp": 2, // 导出标记位
	            "imp": 3, // 导入标记位
	            "knead": 4, // 按摩标记位
	            "light": 5, // 采光标记位
	            "time": 6 // 运行时间标记位
	        }
	    });
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    ReactRouter.run(Routes, ReactRouter.HashLocation, function (Root) {
	        React.render(React.createElement(Root, null), document.body);
	    });
	    // 调用iscroll处理页面滚动
	    /* setTimeout(function(){
	         myscroller = new IScroll("panel-scroller", {
	             vScroll:true,
	             vScrollbar:false, 
	             // bounce:false,
	             onBeforeScrollStart: function(e) {
	                 var target = e.target; 
	                 while (target.nodeType != 1) target = target.parentNode; 
	                 if (target.tagName != "A" && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
	                 e.preventDefault();
	             }
	         });
	     },200);*/
	    document.body.addEventListener('touchstart', function () {}); // 激活IOS设备:active效果
	});

	// 接收到repaint请求后将自动执行此操作
	het.repaint(function (data) {
	    // alert(JSON.stringify(data));
	    // console.log(data);
	    if (AppData.needSave) return; // 未同步前忽略新接收到的数据
	    _fun.Funs._extends(AppData, data);
	    // if (data.busiSwitch) { // 自动模式
	    //     Fun._extends(AppData, getBusiData(data));
	    // }
	    AppActions.repaint(AppData);
	});

	/**
	 * 获取自动模式数据
	 * ! 该方法为展会版本专用
	 * @param    {json}   data 原始数据
	 * @return   {json}        提取到的自动模式数据
	 */
	function getBusiData(data) {
	    // var tmp = data.importExportConfig;
	    // var busiData = {};
	    // for (var i in AppModes) {
	    //     if (AppModes[i].id==AppData.recommendMode) {
	    //         busiData = AppModes[i].data;
	    //         break;
	    //     }
	    // }
	    // if (tmp) {
	    //     busiData["ut"] = tmp["gears1"], // 超声波
	    //     busiData["exp"] = tmp["gears2"]; // 导出
	    //     busiData["imp"] = tmp["gears3"]; // 导入
	    //     busiData["knead"] = tmp["gears4"]; // 按摩
	    //     busiData["light"] = tmp["gears5"]; // 采光
	    //     busiData["time"] = tmp["runTime"];  // 时长
	    // }
	    // return busiData;
	    return AppModes[AppData.recommendMode];
	}

	/**
	 * 判断是否需要保存
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getSaveFlag() {
	    // return !!Object.keys(het.diff(AppData)).length;
	    var count = 0;
	    var data = het.diff(AppData);
	    for (var k in data) {
	        if (k === 'updateFlag') continue;
	        count++;
	    }
	    return !!count;
	}

/***/ }
/******/ ]);