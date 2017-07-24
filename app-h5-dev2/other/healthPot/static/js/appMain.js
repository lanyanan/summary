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
	exports.SettingScreen = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(9);

	var _SettingShow = __webpack_require__(10);

	var _SettingAct = __webpack_require__(11);

	var _SettingMode = __webpack_require__(12);

	var _SettingClose = __webpack_require__(13);

	var _Tips = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //~_~ My first react page is so ugly


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var AppData = {
	    timer: null,
	    change: false,
	    count: 0,
	    lastMode: 0,
	    lastRecordTime: 0,
	    slideClose: true,
	    slideCount: 0,
	    lastDryalarm: 0,
	    lastColdwater: 0,
	    lastSeparation: 0
	};
	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            whereSet: null,
	            timer: null,
	            t: 7200,
	            power: 2,
	            selectMode: 0,
	            powerTemperature: 0,
	            heatingTime: 0,
	            change: true,
	            count: 0,
	            fold: false,
	            dryalarm: 0,
	            tipsMsg: '',
	            showTips: false

	        };

	        window.trainTimer = setInterval(function () {
	            _Actions.Actions.intervalData();
	        }, 5000);

	        _Actions.Actions.intervalData();
	        // 获取故障信息
	        _this.falutTimer = setInterval(function () {
	            _Actions.Actions.getFaultData();
	        }, 5000);

	        // 获取控制数据
	        _this.contrlTimer = setInterval(function () {
	            _Actions.Actions.getCtrlData();
	        }, 5000);

	        _Store.Store.listen(function (data) {
	            _this.setState(data, function () {});
	        });

	        _this.handleErrorHint = _this.handleErrorHint.bind(_this);
	        _this.handleSelectSet = _this.handleSelectSet.bind(_this);
	        _this.handleModeShow = _this.handleModeShow.bind(_this);
	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.errClickTips = _this.errClickTips.bind(_this);
	        _this.cancelClock = function () {
	            _Actions.Actions.cancleSelect(3, 'cancel');
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(window.trainTimer);
	            clearInterval(this.falutTimer);
	            clearInterval(this.contrlTimer);
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            var whereSet = null;
	            if (this.state.whereSet == 'A') {
	                whereSet = 'A';
	            } else if (this.state.whereSet == 'B') {
	                whereSet = 'B';
	            } else if (this.state.whereSet == 'C') {
	                whereSet = 'C';
	            } else if (this.state.whereSet == 'D') {
	                whereSet = 'D';
	            }
	            var slide = this.state.slide;
	            _Actions.Actions.submitSelect(h, m, slide, whereSet);
	        }
	        //开关机

	    }, {
	        key: 'handleSwitch',
	        value: function handleSwitch(e) {
	            _Actions.Actions.switch({ slide: 2 });
	        }
	        //显示隐藏设置面板

	    }, {
	        key: 'handleModeShow',
	        value: function handleModeShow(e) {

	            e.preventDefault();
	            //故障提示
	            //if( this.state.networkavailable==2 ) {het.toast('当前网络不可用');return false;}
	            //if( this.state.online==2 ) {het.toast('设备已离线');return false;}
	            //if( this.state.dryalarm==1 ) {het.toast('设备干烧');return false;}
	            //if( this.state.separation==1 ) {het.toast('壶坐分离');return false;}
	            //if(this.state.coldwater==1) {het.toast('冷水注入');}//冷水注入仅仅提示，仍可以操控设备
	            AppData.slideCount += 1;
	            //slide:2为折叠，1为展开
	            _Actions.Actions.toggleModeShow({ slide: 1, fold: true });
	            this.state.online != 2 && this.state.networkavailable != 2;

	            // 动态设置华为app的导航的显示隐藏
	            var applicationService = window.AppJsBridge.service.applicationService;
	            this.state.slide === 1 ? applicationService.hideTitleBar() : applicationService.showTitleBar();
	        }
	        //选择控件设置

	    }, {
	        key: 'handleSelectSet',
	        value: function handleSelectSet(e) {
	            //故障提示
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用');return false;
	            }
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            if (this.state.dryalarm == 1) {
	                het.toast('设备干烧');return false;
	            }
	            if (this.state.separation == 1) {
	                het.toast('壶坐分离');return false;
	            }
	            if (this.state.coldwater == 1) {
	                het.toast('冷水注入');
	            } //冷水注入仅仅提示，仍可以操控设备

	            _Actions.Actions.toggleSelectShow();
	            //选择控件的数据提交在submitClock函数里
	            var idx = e.currentTarget.getAttribute('data-value'); //获取当前设置项并展开
	            var current = e.currentTarget.getAttribute('data-current');
	            var keepIf = e.currentTarget.getAttribute('data-keep');
	            this.state.whereSet = current;
	            //let selectShow = 1;
	            //  if(this.state.slide==2){
	            //  selectShow:false
	            //}
	            this.setState({
	                boot: idx,
	                keep: keepIf,
	                selectShow: 1,
	                current: current,
	                recordReservation: 0
	            });
	        }
	        //故障回调

	    }, {
	        key: 'handleErrorHint',
	        value: function handleErrorHint() {
	            var msg = this.state.dryalarm == 1 ? '设备干烧，请立即断电！' : '壶坐分离';
	            het.toast(msg);
	        }
	    }, {
	        key: 'errClickTips',
	        value: function errClickTips() {
	            this.setState({ showTips: false });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var statusId = this.state.workstatus ? this.state.workstatus : 1;
	            var modeId = this.state.workingmode ? this.state.workingmode : 0;

	            var forbid = false;
	            //boot 0 温度功率设置，1加热设置 2 预约时间
	            var boot = this.state.boot !== '' ? this.state.boot : false;
	            var selectshow = boot && this.state.selectShow === 1 ? true : false;
	            //标题
	            var selectTitle = ['功率', '加热时长', '预约启动时间'][boot];
	            //保温模式选择控件标题有变
	            modeId == 1 && (selectTitle = '温度');
	            this.state.keep == '保温' ? selectTitle = '保温' : selectTitle;
	            //显隐
	            var hourshow = [true, true, true][boot];
	            var minuteshow = [false, false, true][boot];
	            //功率选项只有保温显示为温度设置，需要显示不同，此处为保温选择数组传入
	            var bootKeep = '';
	            if (this.state.current === 'A') {
	                //实时设置功率(保温温度)按钮处的单位，不随内部模式选择但只提交到本地的改变，而切换模式单位，只有提交切换模式后才切换，workingmode是提交到APP后的模式
	                bootKeep = this.state.workingmode == 1 ? true : false;
	            } else {
	                //内部选中不实时，不可以更改实时设置功率（保温温度）按钮的单位，selectMode是本地选中模式
	                bootKeep = this.state.selectMode == 9 ? true : false;
	            }
	            var modeKeepArray = bootKeep ? [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90] : [100, 200, 300, 400, 500, 600, 700, 800];
	            var modeKeepHourstep = bootKeep ? 5 : 100;
	            var modeKeepMinhour = bootKeep ? 40 : 100;
	            var modeKeepMaxhour = bootKeep ? 90 : 800;
	            var modeKeepHourunit = bootKeep ? '°C' : 'w';
	            var modeKeepDefaulthour = bootKeep ? 40 : 100;
	            //间隔
	            var hourstep = [modeKeepHourstep, //最小功率100瓦
	            2, //只有酸奶可设置，最小时长4小时
	            1 //默认间隔
	            ][boot];
	            var minutestep = ['', '', 10][boot];
	            //范围
	            var minhour = [modeKeepMinhour, //最小功率100瓦或40度
	            4, //只有酸奶可设置，默认起始时间4小时
	            0 //预约最小时长，默认起始时间
	            ][boot];
	            //范围
	            var minminute = [0, //最小功率100瓦或40度
	            0, //只有酸奶可设置，默认起始时间4小时
	            0 //预约最小时长，默认起始时间
	            ][boot];
	            var maxhour = [modeKeepMaxhour, //加热功率最大800瓦
	            18, //只有酸奶可设置，最大时长
	            23 //预约时长，最大24小时
	            ][boot];
	            //单位
	            var hourunit = [modeKeepHourunit, '', ''][boot];
	            var minuteunit = ['', '', ''][boot];
	            //重置选项为默认初始值
	            var defaulthour = [modeKeepDefaulthour, 4, 0][boot];
	            var defaultminute = [false, false, 0][boot];
	            //选项
	            var hourarray = [modeKeepArray, [4, 6, 8, 10, 12, 14, 16, 18], false][boot];

	            //设置面板抽屉
	            var showModeSet = this.state.slide == 2 ? false : true;
	            //设置面板安卓返回（物理返回键）操作
	            if (AppData.slideCount != 0 && this.state.fold == true && this.state.slide == 2) {
	                _Actions.Actions.toggleModeShow({ slide: 2, fold: false, selectShow: 0 }); //,selectshow:0
	            }
	            //状态设置
	            var ArrayInit = null;
	            if (this.state.selectShow == 0 || this.state.selectShow == false) {
	                ArrayInit = [true, true, true][boot];
	            } else {
	                ArrayInit = [false, false, false][boot];
	            }
	            //workingmode与改modeArray键值一一对应
	            var modeArray = {
	                0: { name: '模式', pic: 0, value: 0, mode: 0, powerTemperature: 0, heating: 0, reservation: 0 },
	                1: { name: '保温', live: 'on', pic: 9, value: 9, mode: 1, powerTemperature: 60, heating: 90, reservation: 0 },
	                2: { name: '烧水', pic: 6, value: 6, mode: 2, powerTemperature: 800, heating: 5, reservation: 0 },
	                3: { name: '纤体瘦身' },
	                4: { name: '祛斑美白' },
	                5: { name: '排毒养颜' },
	                6: { name: '滋补安神' },
	                7: { name: '调经四物汤' },
	                8: { name: '清新果茶' },
	                9: { name: '青春靓颜茶' },
	                10: { name: '花茶', live: 'on', pic: 1, value: 1, mode: 10, powerTemperature: 300, heating: 5, reservation: 0 },
	                11: { name: '水果茶', pic: 9 },
	                12: { name: '药膳', live: 'on', pic: 5, value: 5, mode: 12, powerTemperature: 200, heating: 40, reservation: 0 },
	                13: { name: '酸奶', pic: 4, value: 4, mode: 13, powerTemperature: 300, heating: 18, reservation: 0 },
	                14: { name: '煮蛋', pic: 2, value: 2, powerTemperature: 800, heating: 5, reservation: 0 },
	                15: { name: '煮面', live: 'on', pic: 3, value: 3, mode: 15, powerTemperature: 800, heating: 10, reservation: 0 },
	                16: { name: '滋补汤' },
	                17: { name: '银耳羹', pic: 10 },
	                18: { name: '火锅', live: 'on', pic: 8, value: 8, mode: 18, powerTemperature: 300, heating: 115, reservation: 0 },
	                19: { name: '煲汤', live: 'on', pic: 7, value: 7, mode: 19, powerTemperature: 300, heating: 115, reservation: 0 },
	                20: { name: '果茶' },
	                21: { name: '营养粥' },
	                22: { name: '婴儿用水' },
	                23: { name: '调奶' },
	                24: { name: '温奶' },
	                25: { name: '花草茶' },
	                26: { name: '百草茶' },
	                27: { name: '养颜茶' },
	                28: { name: '滋补茶' },
	                29: { name: '红茶' },
	                30: { name: '绿茶' },
	                31: { name: '煮酒' },
	                32: { name: '煮咖啡' },
	                33: { name: '蒸水蛋' },
	                34: { name: '养生汤' },
	                35: { name: '雪梨汤' },
	                36: { name: '隔水炖' },
	                37: { name: '甜品' },
	                38: { name: '炖燕窝' },
	                39: { name: '炖虫草' },
	                40: { name: '武火' },
	                41: { name: '文火' },
	                42: { name: '凉茶' },
	                43: { name: '宝宝粥' },
	                44: { name: '五谷粥' },
	                45: { name: '泡奶粉' },
	                46: { name: '热奶' },
	                47: { name: '消毒' }
	            };
	            var modeStatusArray = [{ value: '0', status: '待机中' }, { value: '1', status: '空闲中' }, { value: '2', status: '预约中' }, { value: '3', status: '加热中' }, { value: '4', status: '保温中' }, { value: '5', status: '大火续沸' }, { value: '6', status: '中火熬煮' }, { value: '7', status: '小火慢炖' }, { value: '8', status: '工作完成' }];

	            var modeYogurt = this.state.workingmode == 13 ? true : false;
	            var modeDefault = modeId === 0;
	            var modeChange = modeId !== 0;
	            var modeName = modeId === 0 ? '--' : modeArray[modeId].name;
	            var modeActName = modeArray[modeId].name;
	            var modeStatus = modeStatusArray[statusId].status;
	            var modeTemp = this.state.temperature ? this.state.temperature : false;
	            //功率or保温判断
	            modeId == 1 ? this.state.powerTemperature = this.state.heatpreservation : //（保温模式为温度，其他为功率）
	            this.state.powerTemperature = this.state.heatingpower * 100;
	            //显示数据
	            var modeRunPower = parseInt(this.state.powerTemperature) ? this.state.powerTemperature : '--'; //功率或温度
	            if (this.state.workingmode == 2) {
	                //烧水没回，手动设置为800
	                modeRunPower = 800;
	            }
	            this.state.powershow = this.state.workingpower * 100;
	            var modeCtrlPower = this.state.powershow ? this.state.powershow : '--'; //运行功率，原始字段是workingpower
	            var modeUnit = modeDefault ? '' : modeId == 1 ? '°C' : 'W';
	            //工作时间设置
	            modeId == 13 ? this.state.heatingTime = this.state.timehour : this.state.heatingTime = parseInt(this.state.timehour) * 60 + this.state.timemin;

	            var modeHeatTime = this.state.heatingTime ? this.state.heatingTime : '--';
	            var modeHeatTimeUnit = modeDefault ? '' : modeYogurt ? 'H' : 'min'; //先判断是否显示单位，再判断酸奶单位加热时长以小时计
	            var modeReserveTime = this.state.reservation ? this.state.reservation * 10 : 0;

	            var modeLive = modeArray[modeId].live;
	            //保温模式
	            var modeKeep = modeId == 1;
	            var modeKeepImg = { 'backgroundImage': 'url(../static/img/m-' + modeArray[modeId].pic + '-on.png)' };

	            //设备端模式更改，收起设置选择面板
	            if (AppData.lastMode !== this.state.workingmode) {
	                AppData.lastMode = this.state.workingmode;
	                if (this.state.slide == 1) {
	                    //设备控制数据，切换模式关闭设置面板
	                    showModeSet = false;
	                    _Actions.Actions.toggleModeShow({ slide: 2 });
	                }
	                if (selectshow == true) {
	                    //切换模式关闭选择控件
	                    selectshow = false;
	                    this.state.selectShow = 0;
	                }
	            }

	            //预约时间和工作时间和保温倒计时(保温有所不同)
	            var timerHour = null;
	            var timerMin = null;
	            var timerSplit = null;
	            var timerFormat = function timerFormat(t) {
	                return parseInt(t) < 10 ? '0' + t : t;
	            };
	            var surplusReservationHour = timerFormat(this.state.surplusreservationtimehour);
	            var surplusReservationMin = timerFormat(this.state.surplusreservationtimemin);
	            var surplusWorkTimeHour = timerFormat(this.state.surplusworktimehour);
	            var surplusWorkTimeMin = timerFormat(this.state.surplusworktimemin);
	            var surplusHeatPreservationHour = timerFormat(this.state.surplusheatpreservationhour);
	            var surplusHeatPreservationMin = timerFormat(this.state.surplusheatpreservationmin);
	            if (modeId != 0) {
	                //初始不设置
	                if (modeId != 1) {
	                    if (surplusReservationHour != 0 || surplusReservationMin != 0) {
	                        //开始预约倒计时
	                        timerHour = surplusReservationHour;
	                        timerMin = surplusReservationMin;
	                        if (timerHour == 0 && timerMin == 0) {
	                            timerHour = '';
	                            timerMin = '';
	                        }
	                    } else if (surplusWorkTimeHour != 0 || surplusWorkTimeMin != 0) {
	                        //加热中不显示倒计时，倒计时从小火中火大火才开始更改
	                        if (statusId == 3) {
	                            timerHour = '';
	                            timerMin = '';
	                        } else {
	                            timerHour = surplusWorkTimeHour;
	                            timerMin = surplusWorkTimeMin;
	                            if (timerHour == 0 && timerMin == 0) {
	                                timerHour = '';
	                                timerMin = '';
	                            }
	                        }
	                    }
	                } else {

	                    if (surplusReservationHour != 0 || surplusReservationMin != 0) {
	                        //开始预约倒计时
	                        timerHour = surplusReservationHour;
	                        timerMin = surplusReservationMin;
	                        if (timerHour == 0 && timerMin == 0) {
	                            timerHour = '';
	                            timerMin = '';
	                        }
	                    } else {
	                        //进入保温模式倒计时
	                        timerHour = surplusHeatPreservationHour;
	                        timerMin = surplusHeatPreservationMin;
	                        if (timerHour == 0 && timerMin == 0) {
	                            timerHour = '';
	                            timerMin = '';
	                        }
	                    }
	                }
	            }
	            timerSplit = !timerHour && !timerMin ? '' : ':'; //时间都为空则冒号隐藏

	            //故障数据
	            var slide = this.state.slide;
	            var recodeTime = this.state.record_time;
	            //设备干烧
	            var dryalarm = this.state.dryalarm == 1 ? 1 : 0;
	            //壶坐分离
	            var separation = this.state.separation == 1 ? 1 : 0;
	            //冷水注入
	            var coldwater = this.state.coldwater == 1 ? 1 : 0;
	            var hideSlide = function hideSlide() {
	                if (slide == 1 && coldwater != 1) {
	                    _Actions.Actions.toggleModeShow({ slide: 2 });
	                }
	                if (selectshow == true) {
	                    //切换模式关闭选择控件
	                    selectshow = false;
	                    _this2.state.selectShow = 0;
	                }
	            };
	            //故障数据连续发送，本地计数器和运行故障数据对比，不等更新本地字段，弹窗提示，收起模式设置面板，直到返回故障正常字段解除提示
	            if (AppData.lastDryalarm != dryalarm) {
	                AppData.lastDryalarm = dryalarm;
	                dryalarm == 1 && (het.toast("dryalarm"), hideSlide(), console.log('干烧'));
	            }
	            if (AppData.lastColdwater != coldwater) {
	                AppData.lastColdwater = coldwater;
	                coldwater == 1 && (het.toast("coldwater"), console.log('冷水注入'));
	            }
	            if (AppData.lastSeparation != separation) {
	                AppData.lastSeparation = separation;
	                separation == 1 && (het.toast("separation"), hideSlide(), console.log('分离'));
	            }
	            (dryalarm == 1 || separation == 1) && (forbid = true);

	            var handleSelectSet = forbid ? this.handleErrorHint : this.handleSelectSet;
	            var handleModeShow = forbid ? this.handleErrorHint : this.handleModeShow;
	            var handleSwitch = forbid ? this.handleSwitch : this.handleSwitch;
	            if (separation == 1) {
	                handleSwitch = this.handleSwitch;
	            }
	            //设备离线
	            if (this.state.online == 2 || this.state.networkavailable == 2) {
	                if (showModeSet == true) {
	                    showModeSet = false;
	                    het.toast('chealth_potmode_save');
	                }
	                selectshow == true && (selectshow = false);
	                showModeSet == true && (showModeSet = false);
	            }
	            //关机重置计时器
	            if (this.state.power == 2) {
	                if (this.state.slide == 1) {}
	                this.state.slide = 2;
	                AppData.slideCount = 0;
	                showModeSet = false;
	                selectshow = false; //关机收起选择控件
	                //关机也要提示故障，关机并不等于断电
	                //AppData.lastRecordTime = 0;
	                //AppData.lastDryalarm = 0;
	                //AppData.lastColdwater = 0;
	                //AppData.lastSeparation = 0;
	            }
	            //展示运行数据
	            var settingShow = {
	                power: this.state.power,
	                statusId: statusId,
	                modeTemp: modeTemp,
	                modeName: modeName,

	                modeStatus: modeStatus,
	                timerHour: timerHour,
	                timerSplit: timerSplit,
	                timerMin: timerMin,
	                handleSwitch: handleSwitch
	            };
	            //展示控制数据
	            var settingAct = {
	                slide: this.state.slide,
	                modeId: modeId,
	                modeKeepImg: modeKeepImg,
	                modeActName: modeActName,
	                handleModeShow: handleModeShow,

	                modeLive: modeLive,
	                modeChange: modeChange,
	                modeRunPower: modeRunPower,
	                modeUnit: modeUnit,
	                modeKeep: modeKeep,
	                handleSelectSet: handleSelectSet,

	                modeHeatTime: modeHeatTime,
	                modeHeatTimeUnit: modeHeatTimeUnit,
	                modeReserveTime: modeReserveTime
	            };
	            //设置模式更改
	            var settingMode = {
	                slide: this.state.slide,
	                showModeSet: showModeSet,

	                selectMode: this.state.selectMode,
	                selectPower: this.state.selectPower,
	                selectHeating: this.state.selectHeating,
	                selectReservation: this.state.selectReservation,

	                handleSelectSet: handleSelectSet
	            };
	            return React.createElement(
	                'main',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { className: 'dev-open ' + ((0, _Store.isClose)() ? 'slide-down' : 'slide-up') },
	                    React.createElement(SettingScreen, null),
	                    React.createElement(_SettingMode.SettingMode, { settingMode: settingMode }),
	                    React.createElement(_SettingShow.SettingShow, { settingShow: settingShow }),
	                    React.createElement(_SettingAct.SettingAct, { settingAct: settingAct })
	                ),
	                React.createElement(_SettingClose.SettingClose, { handleSwitch: handleSwitch }),
	                React.createElement(_TimeSelect.TimeSelect, { title: selectTitle,
	                    minuteshow: minuteshow,
	                    hourshow: hourshow,
	                    minutestep: minutestep,
	                    hourstep: hourstep,
	                    minminute: minminute,
	                    minhour: minhour,
	                    maxhour: maxhour,
	                    minuteunit: minuteunit,
	                    hourunit: hourunit,
	                    defaulthour: defaulthour,
	                    defaultminute: defaultminute,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    show: selectshow,
	                    hourarray: hourarray,
	                    ArrayInit: ArrayInit }),
	                React.createElement(_Tips.Tips, { msg: this.state.tipsMsg, btn1: '', btn2: '\u6211\u77E5\u9053\u4E86', show: this.state.showTips, errCallback: this.errClickTips }),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);
	//主页背景


	var SettingScreen = exports.SettingScreen = React.createClass({
	    displayName: 'SettingScreen',
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'setting-screen' },
	            React.createElement('img', { src: '../static/img/dev-screen.jpg' })
	        );
	    }
	});

	het.domReady(function () {
	    het.config({
	        appId: '30590',
	        appSecret: '98889238ed6e441aaf9b0691b017695f'
	    });
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
	'switch', //开关机
	'getDefaultData', 'submitSelect', //提交选择
	'cancleSelect', //取消选择
	'toggleSelectShow', 'toggleMode', //
	'toggleModeShow', //展开模式设置面板
	'toggleModeSelect', //选择模式
	'toggleModeChange', //切换工作模式
	'toggleBack', //返回按钮,
	'toggleOuter', //快捷按钮

	'intervalData', //轮询
	'getFaultData', // 获取故障数据,
	'getCtrlData' // 轮询控制数据
	]);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {onRepaint} 获取运行数据渲染
	 * @type {onSwitch} 开关机
	 * @type {onSubmitSelect} 提交选择数据
	 * @type {onCancleSelect} 隐藏选择插件
	 * @type {onToggleModeShow} 显隐模式面板
	 * @type {onToggleModeSelect} 设置模式面板
	 * @type {toggleModeSet} 切换工作模式
	 * @params data默认取运行数据（type:1）渲染页面，该设备需要同时用到控制数据和运行数据渲染页面,
	 * @params data字段 if判断，开启数据渲染判断筛选，因为渲染同时使用了控制数据（设备配置）和运行数据（故障数据也在type:1的运行数据里）
	 * @params 但故障数据（也放到运行数据里发送）不包含power等开关机字段，需要先判断故障数据过来是否有该字段，防止缺少字段的故障数据过来冲掉正常运行数据里的字段
	 */
	//~_~ My first react page is so ugly,any problem please email to 576478636@qq.com,i won't be back to you

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isClose = exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Tips = __webpack_require__(8);

	var _Actions = __webpack_require__(4);

	var host = 'https://test.api.clife.cn';
	var getPath = host + '/v1/device/data/get';
	var setPath = host + '/v1/device/config/set';
	var getFaultPath = host + '/v1/device/data/getErrorData';
	var getCtrlDataPath = host + '/v1/device/config/get';

	var AppData = {
	    count: 0,
	    fold: false,
	    dryalarm: 0,
	    coldwater: 0,
	    separation: 0,
	    record_time: 0,
	    dryalarm_hint: 0,
	    separation_hint: 0

	};
	var deviceId = het.getDeviceId();
	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};
	var dataFilterTimers = {
	    power: 0,
	    boots: 0,
	    status: 0,
	    selectMode: 0,
	    slide: 0,
	    selectShow: 0,
	    reserve: 0,
	    resrve1: 0,
	    surplusworktimehour: 0,
	    surplusworktimemin: 0,
	    surplusreservationtimehour: 0,
	    surplusreservationtimemin: 0,
	    surplusheatpreservationhour: 0,
	    surplusheatpreservationmin: 0,
	    temperature: 0,
	    workingmode: 0,
	    workingpower: 0,
	    menuworkstage: 0,
	    workstatus: 0
	};

	var fnGetParams = function fnGetParams(token) {
	    return {
	        "accessToken": token,
	        "deviceId": deviceId,
	        "appId": '30590',
	        "timestamp": +new Date()
	    };
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

	    onRepaint: function onRepaint(dataOrig) {
	        var data = dataFilter(dataOrig);
	        if (data.online) AppData.online = data.online;
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.workingmode) {
	            AppData.workingmode = data.workingmode;
	        }
	        //防止故障数据的少字段传入导致先前的字段被冲刷
	        if (data.power) {
	            AppData.power = data.power;
	            AppData.boots = data.power;
	            data.boots = data.power;
	        }
	        //计数器，H5两次点击同一模式，设置同样的预约时间启动，视为不同模式
	        if (data.count) {
	            AppData.count = data.count;
	        }
	        //故障数据缓存
	        data.dryalarm != undefined ? AppData.dryalarm = data.dryalarm : data.dryalarm = AppData.dryalarm;
	        data.coldwater != undefined ? AppData.coldwater = data.coldwater : data.coldwater = AppData.coldwater;
	        data.separation != undefined ? AppData.separation = data.separation : data.separation = AppData.separation;

	        if (data.power == 2) {
	            data.coldwater = 0;
	            data.dryalarm = 0;
	            data.separation = 0;
	        }
	        //离线online=2 离线
	        if (data.online == 2) {
	            AppData.dryalarm = 0;
	            AppData.coldwater = 0;
	            AppData.separation = 0;
	            data.coldwater = 0;
	            data.dryalarm = 0;
	            data.separation = 0;
	        }

	        ////当前加热时间
	        //if(data.timehour!=undefined){
	        //    AppData.timehour = data.timehour;
	        //}
	        //if(data.timemin!=undefined){
	        //    AppData.timemin = data.timemin;
	        //}
	        ////当前预约时间
	        //if(data.reservation){
	        //    AppData.reservation = data.reservation;
	        //};
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(value) {
	        //if(isFault()){het.toast(isFault());return false};
	        if (isClose() || value == 2) {
	            // 关机状态，开机
	            AppData.power = 1;
	            AppData.boots = 1;
	            AppData.status = 0;
	            AppData.selectMode = 0;
	            AppData.slide = 2;
	            AppData.selectShow = 0;
	        } else {
	            // 开机状态，关机
	            AppData.power = 2;
	            AppData.boots = 2;
	            AppData.status = 1;
	            AppData.slide = 2;
	            AppData.selectShow = 0;
	        }
	        AppData.workingmode = 0;
	        AppData.reservation = 0;
	        //关机不再人为重置故障状态，跟随设备返回的数据执行故障提示
	        //AppData.dryalarm = 0;
	        //AppData.coldwater = 0;
	        //AppData.separation = 0;
	        var u0 = het.hexUpFlag(0, 1, 2); //开关机 标志位0
	        AppData.updateFlag = u0;
	        /*het.send(AppData, function(data){
	        },function(data){
	            het.toast("命令发送失败");
	        });*/
	        setDataTimer('power', 'boots', 'status', 'selectMode', 'slide', 'selectShow');
	        this.trigger(AppData);
	        this.onPostData(AppData);
	    },
	    onSubmitSelect: function onSubmitSelect(hour, minute, slide, whereSet) {
	        //if(isFault()){this.trigger(AppData);het.toast(isFault());return false};
	        var AppDataLive = {
	            //power: 1,
	            //reservation: AppData.reservation,
	            //timehour: AppData.timehour,
	            //timemin: AppData.timemin
	        };
	        //仅仅A实时发送，且只是有些模式可以实时发送,外部功率设置
	        if (whereSet == 'A') {
	            var u2u3Live = '';
	            if (AppData.workingmode == 1) {
	                AppDataLive.heatpreservation = hour;
	                AppData.heatpreservation = hour;
	                u2u3Live = het.hexUpFlag(2, 1, 2); //保温-标志位2
	            } else {
	                AppDataLive.heatingpower = hour / 100;
	                AppData.heatingpower = hour / 100;
	                u2u3Live = het.hexUpFlag(3, 1, 2); //功率-标志位3
	            }
	            AppDataLive.updateFlag = u2u3Live;
	            /*het.send(AppDataLive, function(data){
	            },function(data){
	                het.toast("命令发送失败");
	            });*/
	            this.onPostData(AppDataLive);

	            AppData.powerTemperature = hour;
	            //console.log('实时切换功率or保温温度'+hour,minute,'实时提交字段'+JSON.stringify(AppDataLive));
	        } else if (whereSet == 'B') {
	            AppData.selectPower = hour;
	        } else if (whereSet == 'C') {
	            AppData.selectHeating = hour;
	        } else if (whereSet == 'D') {
	            //预约时间计算
	            var sendTime = parseInt(hour) * 60 + minute;
	            if (minute == 59) {
	                minute = 0;
	                hour = parseInt(hour) + 1;
	            }
	            sendTime = parseInt(hour) * 60 + parseInt(minute);
	            AppData.selectReservation = sendTime;
	        }
	        AppData.selectShow = 0;
	        AppData.slide = slide;

	        this.trigger(AppData);
	    },
	    onCancleSelect: function onCancleSelect(value, type) {
	        this.trigger({ selectShow: 0 });
	    },
	    onToggleModeShow: function onToggleModeShow(slideData) {
	        //if(isFault()){het.toast(isFault());return false};
	        AppData.slide = slideData.slide;
	        AppData.fold = slideData.fold;
	        this.trigger(slideData);
	    },
	    onToggleSelectShow: function onToggleSelectShow() {
	        //if(isFault()){het.toast(isFault());return false};
	    },
	    onToggleModeSelect: function onToggleModeSelect(selectMode, selectPower, selectHeating, selectReservation) {
	        //if(isFault()){het.toast(isFault());return false};
	        AppData.selectMode = selectMode;
	        AppData.selectPower = selectPower;
	        AppData.selectHeating = selectHeating;
	        AppData.selectReservation = selectReservation;
	        AppData.slide = 1;
	        AppData.fold = true;
	        this.trigger(AppData);
	    },
	    onToggleModeChange: function onToggleModeChange(mode, power, heating, reservation, hideModeSet, status) {
	        //if(isFault()){het.toast(isFault());return false};
	        AppData.slide = 2;
	        AppData.modeShow = hideModeSet;
	        AppData.status = status || 2;
	        //updateFlag校验位开始
	        reservation === undefined && (reservation = 0);
	        AppData.reservation = reservation / 10; //预约时间(必须)除以10传给设备
	        //加热功率or保温温度
	        if (mode == 1) {
	            AppData.heatpreservation = power; //保温温度(二选一);
	        } else {
	            delete AppData.heatpreservation;
	            AppData.heatingpower = power / 100; //加热功率(二选一)
	        }
	        AppData.workingmode = mode; //工作模式(必须)
	        //console.log('--模式--',mode)
	        //工作时间，酸奶模式为13
	        if (mode == 13) {
	            AppData.timehour = heating; //酸奶4-18H
	            AppData.timemin = 0; //酸奶没有加热分钟设置
	            AppData.heatingTime = AppData.timehour;
	        } else {
	            AppData.timehour = 0;
	            AppData.timemin = 0;
	            AppData.heatingTime = 0;
	        }
	        var u1 = het.hexUpFlag(1, 1, 2); //预约时间-标志位1O
	        var u2u3 = 0; //保温温度-标志位2//加热功率-标志位3
	        mode == 1 ? u2u3 = het.hexUpFlag(2, 1, 2, u1) : u2u3 = het.hexUpFlag(3, 1, 2, u1);
	        var u4 = het.hexUpFlag(4, 1, 2, u2u3); //工作模式-标志位4
	        if (mode == 13) {
	            var u5 = het.hexUpFlag(5, 1, 2, u4); //工作时间-标志位5高位
	            var u6 = het.hexUpFlag(6, 1, 2, u5); //工作时间-标志位6低位
	            AppData.updateFlag = u6;
	        } else {
	            AppData.updateFlag = u4;
	        }
	        //发送规则，不置位字段需要发送0，否则框架会合并上一次字段到发送对象中,切记
	        /*het.send(AppData, function(data){
	        },function(data){
	            het.toast("命令发送失败");
	        });*/

	        this.onPostData(AppData);
	        AppData.powerTemperature = power;
	        AppData.count = AppData.count + 1;

	        //数据延迟，清空倒计时，温度，状态，
	        AppData.surplusreservationtimehour = 0;
	        AppData.surplusreservationtimemin = 0;
	        AppData.surplusworktimehour = 0;
	        AppData.surplusworktimemin = 0;
	        AppData.surplusheatpreservationhour = 0;
	        AppData.surplusheatpreservationmin = 0;
	        setDataTimer('workingmode', 'temperature', 'workingpower', 'menuworkstage', 'workstatus', 'surplusreservationtimehour', 'surplusreservationtimemin', 'surplusworktimehour', 'surplusworktimemin', 'surplusheatpreservationhour', 'surplusheatpreservationmin', 'temperature');
	        this.trigger(AppData);
	        //console.log('--启动--',AppData.count,mode,power,heating,reservation,hideModeSet,JSON.stringify(AppData));
	    },
	    onIntervalData: function onIntervalData() {
	        var _this = this;
	        // 直接应用openlifeSDK
	        het.get(getPath, '', function (response) {
	            var result = JSON.parse(response);
	            if (result.code === 0) {
	                _this.onRepaint(result.data);
	            } else if (result.msg) {
	                if (result.msg === '设备不在线') {
	                    result.msg = '主人，养生壶与App已断开连接！';
	                }
	                _this.trigger({ showTips: true, tipsMsg: '请检查网络或者设备在线情况' });
	            }
	        });
	    },
	    onPostData: function onPostData(appData) {
	        var _this = this;
	        // 直接应用openlifeSDK
	        het.post(setPath, appData, function (response) {
	            var result = JSON.parse(response);
	            if (result.code === 0) {
	                het.toast('命令发送成功', '1');
	            } else {
	                het.toast(result.msg);
	            }
	        });
	    },
	    onGetFaultData: function onGetFaultData() {
	        var _this = this;
	        het.getToken(function (token) {
	            var params = fnGetParams(token);
	            $.ajax({
	                type: 'GET',
	                url: getFaultPath,
	                data: params,
	                dataType: 'json',
	                success: function success(response) {
	                    if (response.code === 0) {
	                        if (response.data.dryalarm == 1) {
	                            _this.trigger({ showTips: true, tipsMsg: '主人，需切断电源后将发热盘降温才能正常工作' });
	                        }

	                        if (response.data.separation == 1) {
	                            _this.trigger({ showTips: true, tipsMsg: '主人，30秒可以延续上一程序，30秒后自动断电' });
	                        }

	                        if (response.data.coldwater == 1) {
	                            _this.trigger({ showTips: true, tipsMsg: '主人，主人养生壶里被注入了冷水！' });
	                        }
	                    }
	                }
	            });
	        });
	    },
	    onGetCtrlData: function onGetCtrlData() {
	        var _this = this;
	        het.getToken(function (token) {
	            var params = fnGetParams(token);
	            $.ajax({
	                type: 'GET',
	                url: getCtrlDataPath,
	                data: params,
	                dataType: 'json',
	                success: function success(response) {
	                    response.code === 0 && _this.onRepaint(response.data);
	                }
	            });
	        });
	    }
	});

	// 判断是否关机状态1开机2关机
	var isClose = exports.isClose = function isClose() {
	    return AppData.power == 2 || AppData.power === undefined;
	};
	// 判断是否关

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
	     * @param    {string}   format 格式，缺省为：yyyy-MM-dd hh:mm:ss
	     * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
	     * @return   {string}          按format格式输出日期
	     */
	    dateFormat: function dateFormat(date, format, isUTC) {
	        var timezoneOffset = 0;
	        var dateObj = new Date(date);
	        var patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/;
	        var dateArr;
	        var now = new Date();
	        // IOS 解析失败时尝试手动解析
	        if (dateObj.toString() === 'Invalid Date' && typeof date === 'string') {
	            dateArr = date.match(patt) || [];
	            dateObj = new Date(dateArr[1] || now.getFullYear(), dateArr[2] - 1 || now.getMonth(), dateArr[3] || now.getDate(), dateArr[4] || now.getHours(), dateArr[5] || now.getMinutes(), dateArr[6] || now.getSeconds());
	        }
	        format = format || 'yyyy-MM-dd hh:mm:ss';
	        if (isUTC) {
	            // 处理utc时间
	            timezoneOffset = new Date().getTimezoneOffset();
	            dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);
	        }
	        var map = {
	            'M': dateObj.getMonth() + 1, //月份 
	            'd': dateObj.getDate(), //日 
	            'h': dateObj.getHours(), //小时 
	            'm': dateObj.getMinutes(), //分 
	            's': dateObj.getSeconds(), //秒 
	            'q': Math.floor((dateObj.getMonth() + 3) / 3), //季度 
	            'S': dateObj.getMilliseconds() //毫秒 
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
	                return (dateObj.getFullYear() + '').substr(4 - all.length);
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
	    },
	    // 设置cookies
	    setCookie: function setCookie(name, value) {
	        var Days = 30;
	        var exp = new Date();
	        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	    },
	    // 获取cookies
	    getCookie: function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	    },
	    // 删除cookies
	    delCookie: function delCookie(name) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	    }
	};
	module.exports = Funs;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/{

		/***/0:
		/***/function _(module, exports, __webpack_require__) {

			module.exports = __webpack_require__(7);

			/***/
		},

		/***/7:
		/***/function _(module, exports) {

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
					return React.createElement('section', { className: 'tips', id: 'tips', onTouchStart: this.boxtouch, style: { display: show ? 'block' : 'none' } }, React.createElement('section', { className: 'tips-main' }, React.createElement('p', { className: 'box-tips' }, msg), React.createElement('div', { className: 'box-btn', onTouchEnd: this.yesTouch }, btn1 || '确定'), React.createElement('div', { className: 'box-btn', onTouchEnd: this.noTouch }, btn2 || '取消')));
				}
			});

			/***/
		}

		/******/ });

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * @prop {boolean} ArrayInit 是否更新可选数组
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || 23;
			var minhour = parseInt(next.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour !== undefined) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			for (var j = 0; j <= maxlength2; j++) {
				var _value = minminute + j * minutestep;
				_value = _value < 10 ? '0' + _value : _value;
				minutearr.push(_value);
			}
			if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			this.setState({
				minutearr: minutearr,
				minutetime: minminute
			});
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;
				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				this.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var _React$createElement;

			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			var hourunit = this.props.hourunit || '时';
			var minuteunit = this.props.minuteunit || '分';
			return React.createElement(
				'section',
				(_React$createElement = { ref: 'selecter', style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity } }, _defineProperty(_React$createElement, 'ref', 'timeSelect'), _defineProperty(_React$createElement, 'className', 'timeSelect'), _React$createElement),
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'\u786E\u5B9A'
						)
					),
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
								hourunit
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								minuteunit
							),
							React.createElement(
								'span',
								{ style: { display: 'none' }, className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * @props 主页运行数据展示，关机
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var SettingShow = exports.SettingShow = React.createClass({
		displayName: 'SettingShow',

		render: function render() {
			var Show = this.props.settingShow;
			var modeTemp = Show.modeTemp;
			var modeName = Show.modeName;
			var modeStatus = Show.modeStatus;
			var timerMin = Show.timerMin;
			var timerHour = Show.timerHour;
			var timerSplit = Show.timerSplit;
			var handleSwitch = Show.handleSwitch;
			var statusId = parseInt(Show.statusId) - 1;
			var statusCss = "flex-cell status " + ['green', 'green', 'red', 'orange', 'red', 'red', 'red', 'green'][statusId];

			return React.createElement(
				'div',
				{ className: 'setting-show' },
				React.createElement(
					'dl',
					{ className: 'flex' },
					React.createElement(
						'dd',
						{ className: 'flex-cell tal' },
						React.createElement(
							'div',
							null,
							'\xA0'
						),
						modeTemp ? React.createElement(
							'div',
							{ className: 'temperature' },
							'\u6E29\u5EA6\uFF1A',
							modeTemp,
							'\xB0C'
						) : React.createElement(
							'div',
							null,
							'\u6E29\u5EA6\uFF1A--'
						)
					),
					React.createElement(
						'dd',
						{ className: 'flex-cell tac' },
						React.createElement(
							'div',
							{ className: 'flex-cell time' },
							'\u6A21\u5F0F\uFF1A',
							modeName
						),
						React.createElement(
							'div',
							{ className: statusCss },
							modeStatus
						),
						React.createElement(
							'div',
							{ className: 'timer' },
							React.createElement(
								'span',
								null,
								timerHour
							),
							React.createElement(
								'span',
								null,
								timerSplit
							),
							React.createElement(
								'span',
								null,
								timerMin
							)
						)
					),
					React.createElement(
						'dd',
						{ className: 'flex-cell tar' },
						React.createElement(
							'div',
							{ className: 'switch', onTouchStart: handleSwitch },
							React.createElement('i', null),
							React.createElement(
								'span',
								null,
								'\u5173\u673A'
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * @props 主页控制数据展示
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var SettingAct = exports.SettingAct = React.createClass({
		displayName: 'SettingAct',

		render: function render() {
			var Act = this.props.settingAct;
			var modeId = Act.modeId;
			var modeKeepImg = Act.modeKeepImg;
			var modeActName = Act.modeActName;
			var handleModeShow = Act.handleModeShow;

			var modeLive = Act.modeLive;
			var modeChange = Act.modeChange;
			var modeRunPower = Act.modeRunPower;
			var modeUnit = Act.modeUnit;

			var modeKeep = Act.modeKeep;
			var handleSelectSet = Act.handleSelectSet;

			var modeHeatTime = modeId === 0 ? '' : Act.modeHeatTime;
			var modeHeatTimeUnit = Act.modeHeatTimeUnit;
			var modeReserveTime = Act.modeReserveTime;

			var actWorkTimeStyle = "act-icon" + (modeChange ? ' change' : '');

			//数据延迟，工作时间未拉取到时展示横线
			if (modeHeatTime === '--') {
				actWorkTimeStyle = "act-icon";
				modeHeatTimeUnit = '';
				if (modeId != 0) {
					modeHeatTime = '';
				}
			}

			return React.createElement(
				'div',
				{ className: 'setting-act' },
				React.createElement(
					'dl',
					{ className: 'act-show' },
					React.createElement(
						'dd',
						{ className: "set mode" + (modeId !== 0 ? ' on' : ''), id: 'mode', onTouchStart: handleModeShow },
						React.createElement('span', { className: 'act-icon', style: modeKeepImg }),
						React.createElement(
							'h5',
							null,
							React.createElement(
								'span',
								null,
								modeActName
							),
							React.createElement('i', null)
						)
					),
					React.createElement(
						'dd',
						{ className: "set power" + (modeLive === 'on' ? ' on' : ''),
							'data-value': modeLive === 'on' ? 0 : '',
							'data-current': 'A',
							onTouchStart: handleSelectSet },
						React.createElement(
							'span',
							{ className: "act-icon" + (modeChange ? ' change' : '') },
							React.createElement(
								'strong',
								null,
								modeId === 0 ? '' : modeRunPower
							),
							React.createElement(
								'i',
								null,
								modeUnit
							)
						),
						React.createElement(
							'h5',
							null,
							modeKeep ? React.createElement(
								'span',
								null,
								'\u4FDD\u6E29\u6E29\u5EA6'
							) : React.createElement(
								'span',
								null,
								'\u529F\u7387'
							),
							modeLive ? React.createElement('i', null) : ''
						)
					),
					React.createElement(
						'dd',
						{ className: 'set heating', id: 'heating' },
						React.createElement(
							'span',
							{ className: actWorkTimeStyle },
							React.createElement(
								'strong',
								null,
								modeHeatTime
							),
							React.createElement(
								'i',
								null,
								modeHeatTimeUnit
							)
						),
						React.createElement(
							'h5',
							null,
							React.createElement(
								'span',
								null,
								'\u52A0\u70ED\u65F6\u957F'
							),
							modeKeep ? '' : ''
						)
					),
					React.createElement(
						'dd',
						{ className: 'set reservation', id: 'reservation' },
						React.createElement(
							'span',
							{ className: "act-icon" + (modeChange ? ' change' : '') },
							React.createElement(
								'strong',
								null,
								modeId === 0 ? '' : modeReserveTime
							),
							React.createElement(
								'i',
								null,
								modeId === 0 ? '' : 'min'
							)
						),
						React.createElement(
							'h5',
							null,
							React.createElement(
								'span',
								null,
								'\u9884\u7EA6\u65F6\u95F4'
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @prop 选择模式设置
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SettingMode = undefined;

	var _Actions = __webpack_require__(4);

	var SettingMode = exports.SettingMode = React.createClass({
		displayName: 'SettingMode',

		//模式面板重排模式数组,workingmode与改itemArray的mode一一对应
		itemArray: [{ value: 0, name: '模式', mode: 0, powerTemperature: 800, heating: 5, reservation: 0, live: 'on' }, { value: 1, name: '花茶', mode: 10, powerTemperature: 300, heating: 5, reservation: 0, live: 'on' }, //2
		{ value: 2, name: '煮蛋', mode: 14, powerTemperature: 800, heating: 5, reservation: 0 }, //3
		{ value: 3, name: '煮面', mode: 15, powerTemperature: 800, heating: 10, reservation: 0, live: 'on' }, //4
		{ value: 4, name: '酸奶', mode: 13, powerTemperature: 300, heating: 18, reservation: 0 }, //5
		{ value: 5, name: '药膳', mode: 12, powerTemperature: 200, heating: 40, reservation: 0, live: 'on' }, //6
		{ value: 6, name: '烧水', mode: 2, powerTemperature: 800, heating: 5, reservation: 0 }, //1
		{ value: 7, name: '煲汤', mode: 19, powerTemperature: 300, heating: 115, reservation: 0, live: 'on' }, //7
		{ value: 8, name: '火锅', mode: 18, powerTemperature: 300, heating: 115, reservation: 0, live: 'on' }, //8
		{ value: 9, name: '保温', mode: 1, powerTemperature: 60, heating: 90, reservation: 0, live: 'on' }],
		handleBack: function handleBack() {
			_Actions.Actions.toggleModeShow({ slide: 2, fold: false });
			// 显示华为app的titlebar
			window.AppJsBridge.service.applicationService.applicationService.showTitleBar();
		},
		//选中模式
		handleModeSelect: function handleModeSelect(e, o) {

			//取遍历到当前元素上的索引值提交给store赋值给selectMode，且返回selectMode给handleModeChange操作
			var selectMode = e.currentTarget.getAttribute('data-mode');
			var selectPower = this.itemArray[selectMode].powerTemperature; //功率
			var selectHeating = this.itemArray[selectMode].heating; //加热时间
			var selectReservation = this.itemArray[selectMode].reservation;

			//console.log('根据点击的值获取对应参数>>>'+selectMode,selectPower,selectHeating,selectReservation,this.props.itemArray);
			_Actions.Actions.toggleModeSelect(selectMode, selectPower, selectHeating, selectReservation);
		},
		//启动选中后的模式,并发送到App
		handleModeChange: function handleModeChange(e) {
			e.preventDefault();
			//接收组件传递
			var Mode = this.props.settingMode;
			var selectMode = Mode.selectMode;
			var selectPower = Mode.selectPower;
			var selectHeating = Mode.selectHeating;
			var selectReservation = Mode.selectReservation;

			//this.props.settingMode.selectMode本地选择根据该值来查询对应本地数组中的mode值,
			// 选择模式后会更新转态值为itemArray中的value值or索引值，去查询其对应的mode
			//筛选后的本地数组
			var items = this.itemArray;
			var mapModeArray = 1;
			//当初次拉取运行数据大于本地数组items长度（9）的时候，
			// 选择模式取父组件的mode值，否则取本地维护数组items的mode值
			if (selectMode > items.length) {
				mapModeArray = selectMode;
			} else {
				mapModeArray = items[selectMode].mode;
			}
			var mode = selectMode ? mapModeArray : items[1].mode;
			var power = selectPower ? selectPower : items[1].powerTemperature;
			var heating = selectHeating ? selectHeating : items[1].heating;
			var reservation = selectReservation ? selectReservation : items[1].reservation;
			_Actions.Actions.toggleModeChange(mode, power, heating, reservation);
		},
		render: function render() {
			//接收组件传递
			var Mode = this.props.settingMode;
			var showModeSet = Mode.showModeSet;
			var handleSelectSet = Mode.handleSelectSet;

			var selectMode = Mode.selectMode;
			var selectPower = Mode.selectPower;
			var selectHeating = Mode.selectHeating;
			var selectReservation = Mode.selectReservation;
			//筛选后用作显示的本地数组
			var items = this.itemArray;
			//idx用于本地索引维护，对应数组里的value值，显示设置面板值，
			// this.props.settingMode.selectMode初始值在父组件中设置默认为1选中花茶
			var idx = selectMode ? selectMode : 1;
			selectMode = selectMode ? selectMode : items[idx].value;
			selectPower = selectPower ? selectPower : items[idx].powerTemperature;
			selectHeating = selectHeating ? selectHeating : items[idx].heating; //加热时长仅酸奶可设置
			selectReservation = selectReservation ? selectReservation : items[idx].reservation;

			//加热功率or保温温度设置（烧水和煮蛋不可设置）
			var modePoT = idx == 2 || idx == 6 ? true : false;
			var modePoTSetOk = modePoT ? '(不可设置)' : '';
			//加热时长单位(仅酸奶不同)
			var modeYogurt = idx == 4 ? true : false;
			var heatingTimeUnit = modeYogurt ? '小时' : '分钟';
			var heatingTimeSetOk = modeYogurt ? '' : '(不可设置)';
			if (!modeYogurt) {
				selectHeating = '默认';
				heatingTimeUnit = '';
				heatingTimeSetOk = "";
			}
			//功率or保温温度显示设置（仅保温温度不同）
			var modeKeepTemp = idx == 9 ? true : false;
			var modeSwitchTitle = modeKeepTemp ? '保温温度' : '功率';
			var modeSwitchUnit = modeKeepTemp ? '°C' : '瓦';
			//导航栏判断安卓73，苹果64
			var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
			var navigation = isIOS ? 'ios' : 'android';
			//let xiuxiu = Mode.xiuxiu;
			//选择控件触发按钮
			var handleSettingZ = this.handleModeSelect;
			var handleSettingA = modePoT ? '' : handleSelectSet;
			var handleSettingB = modeYogurt ? handleSelectSet : '';
			var handleSettingC = Mode.handleSelectSet;
			if (Mode.slide == 2) {
				handleSettingZ = handleSettingA = handleSettingB = handleSettingC = '';
			}

			//保温模式选择控件单位
			var selectTitle = selectMode == 9 ? '保温' : '其它';

			return React.createElement(
				'div',
				{ className: 'slide-dialog-inner' + (showModeSet ? ' slide-dialog-up' : ''), 'data-po': showModeSet },
				React.createElement(
					'h3',
					{ className: navigation },
					React.createElement('i', { className: 'back', onTouchStart: this.handleBack }),
					React.createElement(
						'span',
						null,
						'\u6A21\u5F0F'
					)
				),
				React.createElement(
					'dl',
					{ className: 'flex mode-box',
						'data-mode': idx,
						'data-reservation': selectReservation },
					items.map(function (o) {
						return React.createElement(
							'dd',
							{ key: o.value,
								className: 'mod' + (o.value == idx ? ' on' : ''),
								'data-mode': o.value,
								style: {
									'backgroundImage': 'url(../static/img/m-' + o.value + (o.value == idx ? '-on' : '-off') + '.png)',
									'display': o.value == 0 ? 'none' : 'auto'
								},
								onTouchStart: handleSettingZ },
							o.name
						);
					}.bind(this))
				),
				React.createElement(
					'dl',
					{ className: "flex set" + (modePoT ? '' : ' disabled'),
						'data-value': '0',
						'data-current': 'B',
						'data-keep': selectTitle,
						onTouchStart: handleSettingA },
					React.createElement(
						'dd',
						{ className: 'flex-cell tal' },
						modeSwitchTitle
					),
					React.createElement(
						'dd',
						{ className: 'flex-cell tar', 'data-listen': selectPower },
						React.createElement(
							'span',
							null,
							selectPower
						),
						React.createElement(
							'span',
							null,
							modeSwitchUnit,
							modePoTSetOk
						),
						React.createElement('i', null)
					)
				),
				React.createElement(
					'dl',
					{ className: "flex set" + (modeYogurt ? '' : ' disabled'),
						'data-value': '1',
						'data-current': 'C',
						onTouchStart: handleSettingB },
					React.createElement(
						'dd',
						{ className: 'flex-cell tal' },
						'\u52A0\u70ED\u65F6\u957F'
					),
					React.createElement(
						'dd',
						{ className: 'flex-cell tar' },
						React.createElement(
							'span',
							null,
							selectHeating
						),
						React.createElement(
							'span',
							null,
							heatingTimeUnit,
							heatingTimeSetOk
						),
						React.createElement('i', null)
					)
				),
				React.createElement(
					'dl',
					{ className: 'flex set',
						ref: 'set-reservation',
						id: 'reservation',
						'data-value': '2',
						'data-current': 'D',
						onTouchStart: handleSettingC },
					React.createElement(
						'dd',
						{ className: 'flex-cell tal' },
						'\u9884\u7EA6\u65F6\u95F4'
					),
					React.createElement(
						'dd',
						{ className: 'flex-cell tar' },
						selectReservation,
						React.createElement(
							'span',
							null,
							'\u5206\u949F'
						),
						React.createElement('i', null)
					)
				),
				React.createElement(
					'h2',
					{ id: 'modeSend',
						className: 'start-up disables',
						'data-mode': idx,
						'data-power': selectPower,
						'data-heating': selectHeating,
						'data-reservation': selectReservation,
						onTouchEnd: this.handleModeChange },
					React.createElement(
						'span',
						null,
						'\u542F\u52A8'
					)
				)
			);
		}
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *@{DevClose} 设备关闭
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SettingClose = undefined;

	var _Store = __webpack_require__(5);

	var _Actions = __webpack_require__(4);

	var SettingClose = exports.SettingClose = React.createClass({
		displayName: 'SettingClose',

		render: function render() {
			return React.createElement(
				'section',
				{ className: 'dev-close ' + ((0, _Store.isClose)() ? 'slide-up' : 'slide-down') },
				React.createElement(
					'div',
					{ className: 'setting-screen' },
					React.createElement('img', { src: '../static/img/dev-screen.jpg' })
				),
				React.createElement(
					'div',
					{ className: 'setting-show' },
					React.createElement(
						'dl',
						{ className: 'flex' },
						React.createElement(
							'dd',
							{ className: 'flex-cell tal' },
							React.createElement(
								'div',
								null,
								'\xA0'
							),
							React.createElement(
								'div',
								null,
								'\u6E29\u5EA6\uFF1A--'
							)
						),
						React.createElement(
							'dd',
							{ className: 'flex-cell tac' },
							React.createElement('div', { className: 'flex-cell time' }),
							React.createElement(
								'div',
								{ className: 'flex-cell status' },
								'\u5F85\u673A\u4E2D'
							)
						),
						React.createElement(
							'dd',
							{ className: 'flex-cell tar' },
							React.createElement(
								'div',
								{ className: 'switch', onTouchStart: this.props.handleSwitch },
								React.createElement('i', null),
								React.createElement(
									'span',
									null,
									'\u5F00\u673A'
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'setting-act' },
					React.createElement(
						'dl',
						{ className: 'act-show' },
						React.createElement(
							'dd',
							{ className: 'set mode', id: 'mode' },
							React.createElement('span', { className: 'act-icon' }),
							React.createElement(
								'h5',
								null,
								React.createElement(
									'span',
									null,
									'\u6A21\u5F0F'
								)
							)
						),
						React.createElement(
							'dd',
							{ className: 'set power', id: 'power' },
							React.createElement(
								'span',
								{ className: 'act-icon' },
								React.createElement('strong', null),
								React.createElement('i', null)
							),
							React.createElement(
								'h5',
								null,
								React.createElement(
									'span',
									null,
									'\u529F\u7387'
								)
							)
						),
						React.createElement(
							'dd',
							{ className: 'set heating', id: 'heating' },
							React.createElement(
								'span',
								{ className: 'act-icon' },
								React.createElement('strong', null),
								React.createElement('i', null)
							),
							React.createElement(
								'h5',
								null,
								React.createElement(
									'span',
									null,
									'\u52A0\u70ED\u65F6\u957F'
								)
							)
						),
						React.createElement(
							'dd',
							{ className: 'set reservation', id: 'reservation' },
							React.createElement(
								'span',
								{ className: 'act-icon' },
								React.createElement('strong', null),
								React.createElement('i', null)
							),
							React.createElement(
								'h5',
								null,
								React.createElement(
									'span',
									null,
									'\u9884\u7EA6\u65F6\u95F4'
								)
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 14 */
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
/******/ ]);