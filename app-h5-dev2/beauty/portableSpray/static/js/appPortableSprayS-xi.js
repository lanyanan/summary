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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// app数据
	var AppData = {};

	// 加载组件
	var Toast = __webpack_require__(2);
	var DevScreen = __webpack_require__(6);

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
	'sync' // 同步数据
	]);

	// 定义store
	var AppStore = Reflux.createStore({
	    listenables: [AppActions],
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onSync: function onSync() {
	        // 同步数据至app
	        if (AppData.updateFlag > 0) {
	            het.send(AppData, function (data) {
	                // console.log(data)
	                het.toast("同步成功！");
	            }, function (data) {
	                het.toast("同步失败! ");
	            });
	            AppData.updateFlag = 0; // 重置标记位
	            this.trigger({ updateFlag: 0 });
	            mytoast("使用完喷雾仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }
	});

	// 定义app对象
	var App = React.createClass({
	    displayName: 'App',

	    mixins: [Reflux.connect(AppStore)],
	    // 基本数据
	    baseData: {
	        modes: ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	        skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	        times: [0, 100, 40, 80, 50, 40]
	    },
	    getInitialState: function getInitialState() {
	        return {
	            chargeStatus: 1, // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
	            electricity: 19, // 电量
	            currentRunMode: 1, // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
	            currentRunTime: 100, // 当前运行时间
	            onlineStatus: 2, // 在线状态（1-正常, 2-异常）
	            skinDataCode: 0, // 有无肤质数据(0-无, 1-有)
	            busiSwitch: 0, // 业务开关（0：关 1：开） 0-手动 1-自动
	            runTime: 11 // 自动模式下的运行时间
	        };
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        try {
	            myscroller.refresh();
	        } catch (err) {}
	    },
	    componentDidMount: function componentDidMount() {
	        mytoast("为使便携喷雾仪S的使用效果更好，请先使用测肤仪进行肤质测试...");
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        if (e.target.type !== "range") {
	            e.preventDefault(); // 修复touchmove无效的BUG
	        }
	    },
	    handlerTounch: function handlerTounch(e) {
	        // 自动和手动模式切换
	        var skinDataCode = this.state.skinDataCode;
	        var mode, runTime;
	        var mode = this.state.mode;
	        var runTime = this.state.runTime;

	        if (! +skinDataCode) {
	            het.toast("您还未测试肤质，请先测试肤质！");
	            return;
	        }

	        var value = e.currentTarget.getAttribute('data-busi');
	        var busiSwitch = +value > 0 ? 0 : 1;

	        var changeStatus = getSaveFlag({ busiSwitch: busiSwitch });
	        if (changeStatus) {
	            // 更改发送App数据
	            AppData.updateFlag |= 0x10;
	        } else {
	            AppData.updateFlag &= 0x01;
	        }

	        this.setState({
	            busiSwitch: busiSwitch,
	            mode: mode,
	            runTime: runTime,
	            updateFlag: AppData.updateFlag
	        });
	    },
	    changeMode: function changeMode(e) {
	        // 自动模式下不做操作
	        var busiSwitch = this.state.busiSwitch;
	        if (+busiSwitch === 1) {
	            e.preventDefault();
	            return;
	        }

	        var currentRunMode = this.state.currentRunMode;

	        this.setState({ currentRunMode: currentRunMode === 5 ? 1 : ++currentRunMode }, function () {
	            var currentRunMode = this.state.currentRunMode;
	            var currentRunTime = this.baseData.times[currentRunMode];
	            var changeStatus = getSaveFlag({ currentRunMode: currentRunMode, currentRunTime: currentRunTime });
	            if (changeStatus) {
	                // 更改发送App数据
	                AppData.updateFlag |= 0x01;
	            } else {
	                AppData.updateFlag &= 0x10;
	            }
	            this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	        }.bind(this));
	    },
	    timeUpAndDown: function timeUpAndDown(flag) {
	        // 自动模式以及不是手动模式下的自定义都不做操作
	        // 当前模式为自定义模式(currentRunMode=5),可以自定义时间
	        var currentRunMode = this.state.currentRunMode;
	        var busiSwitch = this.state.busiSwitch;
	        if (!(currentRunMode == 5 && +busiSwitch === 0)) {
	            return;
	        }

	        var seed = Boolean(flag) ? +10 : -10;
	        var currentRunTime = parseInt(this.state.currentRunTime) + seed;
	        if (currentRunTime > 120) {
	            currentRunTime = 120;
	        } else if (currentRunTime < 10) {
	            currentRunTime = 10;
	        }

	        // 判断标识是否改变
	        var changeStatus = getSaveFlag({ currentRunMode: currentRunMode, currentRunTime: currentRunTime });
	        if (changeStatus) {
	            // 更改发送App数据
	            var timeFlag = 0x01; // 运行时间标识
	            AppData.updateFlag |= timeFlag;
	        } else {
	            AppData.updateFlag &= 0x10;
	        }

	        this.baseData.times[currentRunMode] = currentRunTime;
	        this.setState({ currentRunTime: currentRunTime, updateFlag: AppData.updateFlag });
	    },
	    syncData: function syncData() {
	        var configMode, runTime;
	        // var configMode = this.state.currentRunMode;
	        // var runTime = this.state.currentRunTime;
	        var busiSwitch = this.state.busiSwitch;
	        if (+busiSwitch) {
	            configMode = this.state.mode;
	            runTime = this.state.runTime;
	        } else {
	            configMode = this.state.currentRunMode;
	            runTime = this.state.currentRunTime;
	        }

	        // 更改发送App数据
	        AppData.currentRunMode = configMode;
	        AppData.currentRunTime = runTime;
	        AppData.configMode = configMode;
	        AppData.runTime = runTime;
	        AppData.busiSwitch = busiSwitch;

	        AppActions.sync();
	    },
	    render: function render() {
	        var currentRunMode = parseInt(this.state.currentRunMode);
	        var mode = parseInt(this.state.mode); // 自动模式下的模式
	        var busiSwitch = this.state.busiSwitch; //　模式开关(0-手动模式，1-自动模式)
	        var skinDataCode = this.state.skinDataCode;
	        var currentRunTime = this.state.currentRunTime;
	        var runTime = this.state.runTime; // 自动模式下时间设置
	        var skinType = this.state.skinType5;
	        var recommendMode = this.state.mode;
	        var waterTrend = this.state.waterTrend;

	        var slideStyle = {
	            position: 'absolute',
	            zIndex: 11,
	            top: '2.8rem',
	            right: '1.8rem',
	            fontSize: '16px'
	        };

	        var activeStyle = +busiSwitch === 1 ? { display: 'none' } : { display: 'block' };
	        var nonActiveStyle = +busiSwitch === 1 ? { display: 'block' } : { display: 'none' };

	        // 处理手动模式下的时间图标隐藏以及显示
	        var icoLeftDisplay, icoRightDisplay;
	        if (!(currentRunMode == 5 && +busiSwitch == 0)) {
	            icoLeftDisplay = icoRightDisplay = { "opacity": 0 };
	        } else {
	            icoLeftDisplay = currentRunTime <= 10 ? { 'opacity': 0 } : { 'opacity': 1 };
	            icoRightDisplay = currentRunTime >= 120 ? { 'opacity': 0 } : { 'opacity': 1 };
	        }

	        var tips = [React.createElement(
	            'span',
	            null,
	            '为使便携喷雾仪S的使用效果更好，推荐您先使用测肤仪进行肤质测试...',
	            React.createElement(
	                'a',
	                { href: 'cbeauty://cbeauty_skintest' },
	                '去测试肌肤>>'
	            )
	        ), React.createElement(
	            'span',
	            null,
	            '您当前为',
	            this.baseData.skins[skinType],
	            '肤质，推荐您使用',
	            this.baseData.modes[recommendMode],
	            '！美丽女人是养出来的~'
	        ), React.createElement(
	            'span',
	            null,
	            '您使用了喷雾仪后，脸部皮肤水分提升了',
	            waterTrend,
	            '%，请继续保持~'
	        )];

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'screen' },
	                    React.createElement(DevScreen, { onlineStatus: this.state.onlineStatus }),
	                    React.createElement(
	                        'div',
	                        { className: 'tip' },
	                        tips[skinDataCode]
	                    ),
	                    +busiSwitch == 1 ? React.createElement(
	                        'div',
	                        { className: 'gear-choose', style: slideStyle, 'data-busi': '1', onTouchEnd: this.handlerTounch },
	                        React.createElement(
	                            'div',
	                            { className: 'gear-txt' },
	                            '自动'
	                        ),
	                        React.createElement('div', { className: 'gear-circle' })
	                    ) : React.createElement(
	                        'div',
	                        { className: 'gear-choose', style: slideStyle, 'data-busi': '0', onTouchEnd: this.handlerTounch },
	                        React.createElement(
	                            'div',
	                            { className: 'gear-txts' },
	                            '手动'
	                        ),
	                        React.createElement('div', { className: 'gear-circle gear-circles' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'model-info clearfix' },
	                        React.createElement(
	                            'div',
	                            { className: 'model-info', onTouchEnd: this.changeMode },
	                            React.createElement(
	                                'p',
	                                { className: 'font-b', style: activeStyle },
	                                React.createElement(
	                                    'a',
	                                    { href: 'javascript:' },
	                                    +busiSwitch == 0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode]
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'font-b', style: nonActiveStyle },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    +busiSwitch == 0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode]
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'font-s' },
	                                '模式选择'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'info' },
	                            React.createElement(
	                                'p',
	                                { className: 'font-b' },
	                                React.createElement('a', { className: 'ico-left', style: icoLeftDisplay, href: 'javascript:void(0);', onTouchEnd: this.timeUpAndDown.bind(this, 0) }),
	                                +busiSwitch == 0 ? currentRunTime : runTime,
	                                'S',
	                                React.createElement('a', { className: 'ico-right', style: icoRightDisplay, href: 'javascript:void(0);', onTouchEnd: this.timeUpAndDown.bind(this, 1) })
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'font-s' },
	                                '补水时间'
	                            )
	                        )
	                    ),
	                    this.state.electricity <= 4 && this.state.chargeStatus < 2 && this.state.onlineStatus != 2 ? React.createElement(
	                        'div',
	                        { className: 'battery' },
	                        '电量不足，请充电'
	                    ) : ""
	                )
	            ),
	            React.createElement(
	                'div',
	                { id: 'footer' },
	                React.createElement(
	                    'a',
	                    { href: 'javascript:', className: "sync-btn " + (this.state.updateFlag ? "on" : ""), onTouchEnd: this.syncData },
	                    '保存设置'
	                )
	            ),
	            React.createElement('div', { id: 'mytoast' })
	        );
	    }
	});

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        renderConfigData: false,
	        debugMode: "print"
	    });
	});

	// 准备就绪，开始渲染页面
	het.domReady(function () {
	    React.render(React.createElement(App, null), document.body);

	    // 调用iscroll处理页面滚动
	    /*setTimeout(function(){
	        myscroller = new iScroll("panel-scroller", {
	            vScroll:true,
	            vScrollbar:false,
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
	    if (AppData.updateFlag) return; // 未同步前忽略新接收到的数据
	    AppData = data;
	    AppActions.repaint(AppData);
	});

	/**
	 * 判断是否需要保存
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getSaveFlag(changeObj) {
	    var count = 0;

	    for (var k in changeObj) {
	        if (changeObj[k] !== AppData[k]) count++;
	    }

	    return !!count;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 主显示组件
	 * @prop {integer} skinDataCode   有无肤质数据
	 * @prop {string}  recommendMode  推荐模式名称
	 * @prop {string}  skinType       肤质
	 * @prop {integer} moisture       水分百分值
	 * @prop {integer} onlineStatus   是否离线状态
	 */
	var DevScreen = React.createClass({
	    displayName: "DevScreen",

	    skins: [],
	    render: function render() {
	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement("img", { className: "logo-xi", src: "../static/img/logo@2x.png" }),
	            React.createElement(
	                "div",
	                { className: "pic" },
	                React.createElement("img", { className: "pic", src: "../static/img/ico-p.png" }),
	                this.props.onlineStatus == 2 ? React.createElement(
	                    "span",
	                    { className: "offline" },
	                    "您的设备已离线"
	                ) : ""
	            )
	        );
	    }
	});

	module.exports = DevScreen;

/***/ }
/******/ ]);