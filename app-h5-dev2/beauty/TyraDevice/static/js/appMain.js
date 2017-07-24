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

	var _fun = __webpack_require__(2);

	// app数据
	var AppData = {};

	// 加载组件
	var Route = ReactRouter.Route;
	var RouteHandler = ReactRouter.RouteHandler;
	var Toast = __webpack_require__(4);

	var TyraTopScreen = __webpack_require__(5);
	var DeviceConfig = __webpack_require__(6);
	var SettingButton = __webpack_require__(7);

	React.initializeTouchEvents(true); // 开户触摸支持
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
	'select', //选择
	'sync' // 同步数据
	]);

	var AppTempValue = {
	    tempMode1: 0,
	    tempGear1: 0,
	    tempMode2: 0,
	    tempGear2: 0,
	    tempBusi: 0,
	    tempType: 0
	};

	// 定义store
	var AppStore = Reflux.createStore({
	    listenables: [AppActions],
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onToggleBusi: function onToggleBusi() {
	        if (AppData.busiSwitch != 1 && AppData.type <= 1) {
	            het.toast("您还未测试肤质，请先测试肤质！");
	            return;
	        }
	        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
	        AppData.updateFlag = 3;
	        if (AppData.busiSwitch) {
	            // 自动模式
	            AppTempValue.tempMode1 = AppData.mode;
	            AppTempValue.tempGear1 = AppData.gear;
	            AppData.mode = AppData.recommendMode;
	            AppData.gear = AppData.recommendGear;
	        } else {
	            // 切回手动模式
	            AppData.mode = AppTempValue.tempMode1;
	            AppData.gear = AppTempValue.tempGear1;
	        }
	        if (AppData.mode != AppData.currentMode || AppData.gear != AppData.currentGear || AppData.busiSwitch != AppTempValue.tempBusi) {
	            AppData.needSave = true;
	        } else {
	            AppData.needSave = false;
	        }
	        this.trigger(AppData);
	    },
	    onSelect: function onSelect(data) {
	        // updateFlag映射表
	        var flagMap = {
	            "gear": 0x01, // 档位
	            "mode": 0x02 // 模式
	        };
	        for (var k in data) {
	            AppData.updateFlag |= flagMap[k]; // 设置标记位
	            AppData[k] = data[k]; // 设置修改数据
	        }
	        if (AppData.mode != AppData.currentMode || AppData.gear != AppData.currentGear) {
	            AppData.needSave = true;
	        } else {
	            AppData.needSave = false;
	        }
	        data.updateFlag = AppData.updateFlag;
	        this.trigger(data);
	    },
	    onSync: function onSync() {
	        if (AppData.needSave) {
	            // 同步数据至app
	            AppTempValue.tempMode2 = AppData.recommendMode;
	            AppTempValue.tempGear2 = AppData.recommendGear;
	            AppData.recommendMode = AppData.mode;
	            AppData.recommendGear = AppData.gear;
	            $this = this;
	            het.send(AppData, function (data) {
	                AppData.currentMode = AppData.mode;
	                AppData.currentGear = AppData.gear;
	                AppTempValue.tempBusi = AppData.busiSwitch;
	                het.toast("同步成功！");
	                $this.trigger({ needSave: false, updateFlag: 0, currentMode: AppData.mode, currentGear: AppData.gear, tempBusi: AppData.busiSwitch });
	                mytoast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
	            }, function (data) {
	                het.toast("同步失败！");
	            });
	            AppData.recommendMode = AppTempValue.tempMode2;
	            AppData.recommendGear = AppTempValue.tempGear2;
	            AppData.updateFlag = 0;
	            AppData.needSave = false; // 重置
	            this.trigger({ updateFlag: 0, needSave: false });
	        }
	    }
	});

	// 定义app对象
	var App = React.createClass({
	    displayName: 'App',

	    mixins: [Reflux.connect(AppStore)],
	    getInitialState: function getInitialState() {
	        return {
	            type: 0,
	            offline: 0,
	            mode: 0,
	            gear: 0,
	            recommendMode: 0,
	            recommendGear: 0,
	            currentMode: 0,
	            currentGear: 0,
	            battery: 5,
	            needSave: false,
	            busiSwitch: 0
	        };
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        try {
	            myscroller.refresh();
	        } catch (err) {}
	    },
	    componentDidMount: function componentDidMount() {
	        mytoast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
	    },
	    render: function render() {
	        var tempType = this.state.type;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(TyraTopScreen, { offline: this.state.offline, busiSwitch: this.state.busiSwitch, toggleBusiSwitch: AppActions.toggleBusi }),
	                    React.createElement(DeviceConfig, { busiSwitch: this.state.busiSwitch, type: this.state.type, offline: this.state.offline, result: this.state.result, mode: this.state.mode - 1, gear: this.state.gear - 1, battery: this.state.battery })
	                )
	            ),
	            React.createElement(
	                'div',
	                { onClick: AppData.needSave ? AppActions.sync : "", id: 'footer' },
	                React.createElement(SettingButton, { settingStatus: AppData.needSave ? "on" : "off", callback: AppActions.sync })
	            ),
	            React.createElement('div', { id: 'mytoast' })
	        );
	    }
	});

	// 配置sdk
	het.config({
	    debugMode: "print", // 打印调试数据
	    useUpdateFlag: true, // 自动添加updateFlag标记
	    // 模板数据与接口数据映射表
	    webDataMap: {
	        "type": "type", //当前类型
	        "recommendMode": "mode", // 推荐模式
	        "recommendGear": "gears", //推荐档位
	        "currentMode": "currentMode", //当前模式
	        "currentGear": "currentGears", //当前档位
	        "busiSwitch": "busiSwitch", //自动手动切换
	        "offline": "onlineStatus", //当前设备状态
	        "battery": "electricity", //当前设备电量
	        "result": "des" //描述当前结果
	    }
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    React.render(React.createElement(App, null), document.body);
	    // 调用iscroll处理页面滚动
	    /*setTimeout(function(){
	        myscroller = new IScroll("panel-scroller", {
	            vScroll:true,
	            vScrollbar:false, 
	            onBeforeScrollStart: function(e) {
	                var target = e.target; 
	                while (target.nodeType != 1) target = target.parentNode; 
	                if (target.className.indexOf("tap") == -1 && target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
	                e.preventDefault();
	            }
	        });
	    },200);*/
	    document.body.addEventListener('touchstart', function () {}); // 激活IOS设备:active效果
	});

	// 接收到repaint请求后执行此操作
	het.repaint(function (data) {
	    if (AppData.needSave) return; // 未同步前忽略新接收到的数据
	    AppData = _fun.Funs._extends({}, AppData, data);
	    AppTempValue.tempMode1 = AppData.currentMode;
	    AppTempValue.tempGear1 = AppData.currentGear;
	    AppTempValue.tempBusi = AppData.busiSwitch;
	    if (!AppData.busiSwitch) {
	        // 手动模式
	        AppData.mode = AppData.currentMode;
	        AppData.gear = AppData.currentGear;
	    } else {
	        AppData.mode = AppData.recommendMode;
	        AppData.gear = AppData.recommendGear;
	    }
	    AppActions.repaint(AppData);
	});

/***/ },
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
	 * [render description]
	 * @param  {Integer} 设备离线状态 1表示在线，2表示离线
	 * @param  {Integer} toggleBusiSwitch 切换自动/手动模式
	 * @return {[type]}
	 */
	var TyraTopScreen = React.createClass({
		displayName: "TyraTopScreen",

		handleBusiSwitch: function handleBusiSwitch() {
			this.props.toggleBusiSwitch();
		},
		render: function render() {
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
					React.createElement("img", { className: "icon", src: "../static/img/tyra_icon.png" }),
					this.props.offline != 1 ? React.createElement("img", { className: "offline", src: "../static/img/tyra_offline_icon.png" }) : "",
					this.props.offline != 1 ? React.createElement(
						"p",
						{ className: "offlineText" },
						"您的设备已离线"
					) : ""
				)
			);
		}
	});

	module.exports = TyraTopScreen;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * @param {[String]} [result] [测试结果]
	 * @param {[Integer]} [mode] [选择模式索引]
	 * @param {[Integer]} [gear] [选择档位索引]
	 * @param {[Integer]} [type] [当前类型]
	 * @param {[Integer]} [offline] [设备离线状态 1表示在线，2表示离线]
	 * @param {[Integer]} [battery] [电量类型（1-电量5%及以下，2-电量10%及以下，3-电量20%及以下，4-电量大于20%小于30%，5-电量大于30%小于40%，6-电量40%小于50%，7-电量大于50%小于60%，8-电量大于60%小于70%，9-电量70%小于80%，10-电量大于80%小于90%，11-电量大于90%小于100%，12-电量100%，16-电池电压过高）]
	 * @return {[html]}
	 */
	var DeviceConfig = React.createClass({
	    displayName: "DeviceConfig",

	    // 基本数据
	    baseData: {
	        modes: ["C提拉紧致模式", "M粉刺导出模式", "N营养导入模式", "L轻松按摩模式"],
	        gears: ["低", "高"]
	    },
	    componentDidMount: function componentDidMount() {},
	    handlerTouchMove: function handlerTouchMove(e) {
	        if (e.target.type !== "range") {
	            e.preventDefault(); // 修复touchmove无效的BUG
	        }
	    },
	    handleClick: function handleClick(e) {
	        e.preventDefault();
	    },
	    handlerMode: function handlerMode(e) {
	        var value = this.props.mode;
	        value = (value + 1) % this.baseData.modes.length;
	        this.setState({ mode: value + 1 });
	        AppActions.select({ mode: value + 1 });
	    },
	    handlerGear: function handlerGear(e) {
	        var value = this.props.gear;
	        value = (value + 1) % this.baseData.gears.length;
	        this.setState({ gear: value + 1 });
	        AppActions.select({ gear: value + 1 });
	    },
	    render: function render() {
	        var type = this.props.type; //取得类型
	        var mode = this.props.mode; // 取得模式
	        var gear = this.props.gear; //取得档位
	        var battery = this.props.battery; //取得电量
	        var offline = this.props.offline; //取得设备状态
	        return React.createElement(
	            "section",
	            null,
	            React.createElement(
	                "div",
	                { className: "config" },
	                type <= 1 ? React.createElement(
	                    "div",
	                    { className: "prompt" },
	                    React.createElement(
	                        "label",
	                        null,
	                        "为使提拉嫩肤仪的使用效果更好，推荐您先使用测肤仪进行肤质测试..."
	                    ),
	                    React.createElement(
	                        "a",
	                        { href: "cbeauty://cbeauty_skintest" },
	                        "去测试肌肤>>"
	                    )
	                ) : React.createElement(
	                    "div",
	                    { className: "prompt" },
	                    React.createElement(
	                        "label",
	                        null,
	                        this.props.result
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "select-wrap flex", onTouchMove: this.handlerTouchMove },
	                React.createElement(
	                    "div",
	                    { onTouchEnd: this.props.busiSwitch == 0 ? this.handlerMode : "", onTouchStart: this.props.busiSwitch == 1 ? this.handleClick : "", className: "tap config flex-cell" },
	                    React.createElement(
	                        "div",
	                        { className: "tap describe flex-column" },
	                        this.baseData.modes[mode]
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "tap prompt flex-column" },
	                        "模式选择"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { onTouchEnd: this.props.busiSwitch == 0 ? this.handlerGear : "", onTouchStart: this.props.busiSwitch == 1 ? this.handleClick : "", className: "tap config flex-cell" },
	                    React.createElement(
	                        "div",
	                        { className: "tap describe flex-column" },
	                        this.baseData.gears[gear]
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "tap prompt flex-column" },
	                        "档位选择"
	                    )
	                )
	            ),
	            battery <= 4 && offline == 1 ? React.createElement(
	                "div",
	                { className: "config battery" },
	                React.createElement(
	                    "label",
	                    null,
	                    "电量不足，请充电！"
	                )
	            ) : ""
	        );
	    }
	});

	module.exports = DeviceConfig;

/***/ },
/* 7 */
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

/***/ }
/******/ ]);