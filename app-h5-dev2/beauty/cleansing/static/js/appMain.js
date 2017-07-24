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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var StateMixin = ReactRouter.State;
	var CleansingSteps = React.createClass({
		displayName: 'CleansingSteps',

		mixins: [StateMixin],
		componentDidUpdate: function componentDidUpdate() {
			try {
				myscrollersteps.refresh();
			} catch (err) {}
		},
		componentDidMount: function componentDidMount(argument) {
			setTimeout(function () {
				myscrollersteps = new iScroll("panel-scroller-steps", {
					vScroll: true,
					vScrollbar: false,
					onBeforeScrollStart: function onBeforeScrollStart(e) {
						var target = e.target;
						while (target.nodeType != 1) {
							target = target.parentNode;
						}if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') e.preventDefault();
					}
				});
			}, 200);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'app-body', id: 'panel-scroller-steps' },
				React.createElement(
					'div',
					{ style: { paddingBottom: 100 } },
					React.createElement(
						'div',
						{ className: 'c-steps-title' },
						'请按以下步骤进行洁面'
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div1' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'1'
							),
							React.createElement('div', { className: 'steps-div1-hr' })
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'额头'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears1,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime1,
								's'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div2' },
						React.createElement(
							'div',
							{ className: 'steps-div2-left' },
							React.createElement(
								'div',
								{ className: 'steps-div2-place' },
								'鼻子'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-gears' },
								'档位:',
								this.getParams().gears2,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-time' },
								'洁面时间:',
								this.getParams().runtime2,
								's'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div2-center' },
							React.createElement(
								'div',
								{ className: 'steps-div2-center-circle' },
								'2'
							),
							React.createElement('div', { className: 'steps-div2-hr' })
						),
						React.createElement('div', { className: 'steps-div2-right' })
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div3' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'3'
							),
							React.createElement('div', { className: 'steps-div1-hr' })
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'下巴'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears3,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime3,
								's'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div2' },
						React.createElement(
							'div',
							{ className: 'steps-div2-left' },
							React.createElement(
								'div',
								{ className: 'steps-div2-place' },
								'左脸'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-gears' },
								'档位:',
								this.getParams().gears4,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div2-time' },
								'洁面时间:',
								this.getParams().runtime4,
								's'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div2-center' },
							React.createElement(
								'div',
								{ className: 'steps-div2-center-circle' },
								'4'
							),
							React.createElement('div', { className: 'steps-div2-hr' })
						),
						React.createElement('div', { className: 'steps-div2-right' })
					),
					React.createElement(
						'div',
						{ className: 'c-steps-div3' },
						React.createElement('div', { className: 'steps-div1-left' }),
						React.createElement(
							'div',
							{ className: 'steps-div1-center' },
							React.createElement(
								'div',
								{ className: 'steps-div1-center-circle' },
								'5'
							)
						),
						React.createElement(
							'div',
							{ className: 'steps-div1-right' },
							React.createElement(
								'div',
								{ className: 'steps-div1-place' },
								'右脸'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-gears' },
								'档位:',
								this.getParams().gears5,
								'档'
							),
							React.createElement(
								'div',
								{ className: 'steps-div1-time' },
								'洁面时间:',
								this.getParams().runtime5,
								's'
							)
						)
					)
				)
			);
		}
	});
	module.exports = CleansingSteps;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fun = __webpack_require__(3);

	window.ReactDOM = React;

	// app数据
	var AppData = {};
	var currentNum = 11; //保存当前的部位
	var gearsCurrent;
	var runTimeCurrent;
	var toast = true; //toast阀门
	var isUpdate = 0; //判断是否需要推数据的变量
	var ElectricityData = {}; //电量信息
	var submitData = {}; //同步手动挡数据对象
	var configSubmitData = {}; //同步自动挡数据对象
	var Route = ReactRouter.Route;
	var RouteHandler = ReactRouter.RouteHandler;
	var Link = ReactRouter.Link;
	submitData.updateFlag = 0; //初始化手动挡updateFlag
	configSubmitData.updateFlag = 0; //初始化自动挡updateFlag
	React.initializeTouchEvents(true); // 开启触摸支持
	var Range = __webpack_require__(5);
	//var Funs = require('../../../common/src/fun.es6');
	var QSlidor = __webpack_require__(6);
	// var Toast = require('../../../common/src/lib/Toast.jsx');
	var CleansingSteps = __webpack_require__(1);
	var SettingButton = __webpack_require__(7);
	// 定义toast函数，以供多次调用
	// var mytoastcenter = function(msg) {
	//     document.getElementById('mytoast').innerHTML = "";
	//     React.render(
	//         <Toast verticalAlign="1" secs="2" block={false}>{msg}</Toast>,
	//         document.getElementById('mytoast'),function () {
	//         	setTimeout(function (argument) {
	//         		document.getElementById('mytoast').innerHTML = "";
	//         	},3000);
	//         }
	//     );
	// };
	window.AppActions = Reflux.createActions(['repaint' // 重绘
	]);
	var AppStore = Reflux.createStore({
		listenables: [AppActions],
		onRepaint: function onRepaint(data) {
			this.trigger(data);
		}
	});
	var Cleansing = React.createClass({
		displayName: 'Cleansing',

		mixins: [Reflux.listenTo(AppStore, 'onStatusChange')],
		getInitialState: function getInitialState() {
			return {
				bgc11: "#6DDBB6", //额头
				bgc15: "#FC84A7", //右脸
				bgc12: "#FC84A7", //鼻子
				bgc14: "#FC84A7", //下颚
				bgc13: "#FC84A7", //左脸
				footerColor: "#b0b0b6", //同步按钮，激活颜色#fb84a6
				placet: "-22%", //中间小圆点的位置
				onlineStatue: "1",
				placer: "0",
				placel: "0",
				placeb: "0"
			};
		},
		componentDidUpdate: function componentDidUpdate() {
			try {
				myscroller.refresh();
			} catch (err) {}
		},
		items: [{ id: "1", text: "一档" }, { id: "2", text: "二档" }, { id: "3", text: "三档" }, { id: "4", text: "四档" }, { id: "5", text: "五档" }],
		onStatusChange: function onStatusChange(model) {
			// model.currentRunMode判断当前的显示模式
			if (model.currentRunMode == "1") {
				//自动模式
				if (toast) {
					// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
					het.toast("当前为智能模式，如需自定义请选择非智能模式！");
					toast = false;
				};
				this.setState({
					qSlidorFlag: true, // 档位选择开关 false开 true关
					rangeFlag: true, //时间选择开关 false开 true关
					gears: model.faceCleanerConfig[0].gears, //档位
					currentRunMode: "1", //模式
					remark: model.faceCleanerConfig[0].remark,
					runTime: model.faceCleanerConfig[0].runTime //洁面时间
				});
			} else if (model.currentRunMode == "0") {
					//手动模式
					if (model.faceCleanerConfig) {
						this.setState({
							remark: model.faceCleanerConfig[currentNum - 11].remark
						});
					};
					//part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
					switch (currentNum) {
						case 11:
							this.setState({
								placet: "-22%", //11-额头
								placer: "0",
								placel: "0",
								placeb: "0"
							});
							break;
						case 12:
							this.setState({
								placet: "5%", //12-鼻子
								placer: "0",
								placel: "0",
								placeb: "0"
							});
							break;
						case 13:
							this.setState({
								placet: "10%", //13-左脸
								placer: "20%",
								placel: "0",
								placeb: "0"
							});
							break;
						case 14:
							this.setState({
								placet: "32%", //14-下颚
								placer: "0",
								placel: "0",
								placeb: "0"
							});
							break;
						case 15:
							this.setState({
								placet: "10%", //15-右脸
								placer: "0",
								placel: "20%",
								placeb: "0"
							});
							break;
					};
					this.setState({
						qSlidorFlag: false, // 档位选择开关 false开 true关
						rangeFlag: false, //时间选择开关 false开 true关
						gears: model.currentRunConfig[currentNum - 11].gears, //档位
						currentRunMode: "0", //模式
						runTime: model.currentRunConfig[currentNum - 11].runTime, //洁面时间
						bgc11: "#FC84A7", //额头
						bgc15: "#FC84A7", //右脸
						bgc12: "#FC84A7", //鼻子
						bgc14: "#FC84A7", //下颚
						bgc13: "#FC84A7" //左脸
					});
					var styleList = {};
					styleList["bgc" + currentNum] = "#6DDBB6";
					this.setState(styleList); //选中的样式设置
				};
			if (model.electricity || model.chargeStatus || model.onlineStatus) {
				//电量判断
				this.setState({
					electricity: typeof model.electricity == "undefined" ? this.state.electricity : model.electricity,
					chargeStatus: typeof model.chargeStatus == "undefined" ? this.state.chargeStatus : model.chargeStatus,
					onlineStatus: typeof model.onlineStatus == "undefined" ? this.state.onlineStatus : model.onlineStatus
				});
			};
		},
		handlerTounch: function handlerTounch(event) {
			if (this.state.currentRunMode == "0") {
				//手动模式转化为自动
				AppData.currentRunMode = 1;
				if (AppData.faceCleanerConfig) {
					// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
					het.toast("当前为智能模式，如需自定义请选择非智能模式！");
					this.setState({
						qSlidorFlag: true, // 档位选择开关 false开 true关
						rangeFlag: true, //时间选择开关 false开 true关
						gears: AppData.faceCleanerConfig[currentNum - 11].gears, //档位
						currentRunMode: "1", //模式
						remark: AppData.faceCleanerConfig[currentNum - 11].remark,
						runTime: AppData.faceCleanerConfig[currentNum - 11].runTime, //洁面时间
						bgc11: "#FC84A7", //额头
						bgc15: "#FC84A7", //右脸
						bgc12: "#FC84A7", //鼻子
						bgc14: "#FC84A7", //下颚
						bgc13: "#FC84A7", //左脸
						footerColor: "#fb84a6"
					});
				} else {
					// mytoastcenter("您还未测试肤质，请先测试肤质！");
					het.toast("您还未测试肤质，请先测试肤质！");
					//没有肤质的用户点击切换档位之后又切回手动挡的动画效果
					this.setState({
						currentRunMode: "1"
					}, function () {
						setTimeout(function () {
							AppData.currentRunMode = 0;
							this.setState({
								currentRunMode: "0"
							});
						}.bind(this), 1000);
					}.bind(this));
				}
			} else if (this.state.currentRunMode == "1") {
				//自动模式转化为手动
				AppData.currentRunMode = 0;
				this.setState({
					qSlidorFlag: false, // 档位选择开关 false开 true关
					rangeFlag: false, //时间选择开关 false开 true关
					gears: gearsCurrent == undefined ? AppData.currentRunConfig[currentNum - 11].gears : gearsCurrent, //档位
					currentRunMode: "0", //模式
					runTime: runTimeCurrent == undefined ? AppData.currentRunConfig[currentNum - 11].runTime : runTimeCurrent, //洁面时间
					bgc11: "#FC84A7", //额头
					bgc15: "#FC84A7", //右脸
					bgc12: "#FC84A7", //鼻子
					bgc14: "#FC84A7", //下颚
					bgc13: "#FC84A7", //左脸
					footerColor: "#fb84a6"
				});
			};
			var styleList = {};
			styleList["bgc" + currentNum] = "#6DDBB6";
			this.setState(styleList); //选中的样式设置
			isUpdate = 1;
		},
		rangeFeedbackFn: function rangeFeedbackFn(value) {
			//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
			//额头  鼻子  下巴  左脸  右脸
			switch (currentNum) {
				case 11:
					submitData.runtime1 = value;
					submitData.updateFlag |= Math.pow(2, 1);
					break;
				case 12:
					submitData.runtime2 = value;
					submitData.updateFlag |= Math.pow(2, 3);
					break;
				case 13:
					submitData.runtime4 = value;
					submitData.updateFlag |= Math.pow(2, 7);
					break;
				case 14:
					submitData.runtime3 = value;
					submitData.updateFlag |= Math.pow(2, 5);
					break;
				case 15:
					submitData.runtime5 = value;
					submitData.updateFlag |= Math.pow(2, 9);
					break;
			};
			this.setState({
				runTime: value,
				footerColor: "#fb84a6"
			}, function () {
				isUpdate = 1;
				runTimeCurrent = this.state.runTime; //保存当前洁面时间
				AppData.currentRunConfig[currentNum - 11].runTime = runTimeCurrent; //保存手动模式下，调节洁面时间后保存
			});
		},
		qslidorFeedbackFn: function qslidorFeedbackFn(value) {
			//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
			//额头  鼻子  下巴  左脸  右脸
			switch (currentNum) {
				case 11:
					submitData.gears1 = value;
					submitData.updateFlag |= Math.pow(2, 0);
					break;
				case 12:
					submitData.gears2 = value;
					submitData.updateFlag |= Math.pow(2, 2);
					break;
				case 13:
					submitData.gears4 = value;
					submitData.updateFlag |= Math.pow(2, 6);
					break;
				case 14:
					submitData.gears3 = value;
					submitData.updateFlag |= Math.pow(2, 4);
					break;
				case 15:
					submitData.gears5 = value;
					submitData.updateFlag |= Math.pow(2, 8);
					break;
			};
			this.setState({
				gears: value,
				footerColor: "#fb84a6"
			}, function () {
				isUpdate = 1;
				gearsCurrent = this.state.gears; //保存当前档位
				AppData.currentRunConfig[currentNum - 11].gears = gearsCurrent; //保存手动模式下，调节档位后保存
			});
		},
		handlerTounchList: function handlerTounchList(num, event) {
			currentNum = num; //保存当前部位
			//part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
			switch (currentNum) {
				case 11:
					this.setState({
						placet: "-22%", //11-额头
						placer: "0",
						placel: "0",
						placeb: "0"
					});
					break;
				case 12:
					this.setState({
						placet: "5%", //12-鼻子
						placer: "0",
						placel: "0",
						placeb: "0"
					});
					break;
				case 13:
					this.setState({
						placet: "10%", //13-左脸
						placer: "20%",
						placel: "0",
						placeb: "0"
					});
					break;
				case 14:
					this.setState({
						placet: "32%", //14-下颚
						placer: "0",
						placel: "0",
						placeb: "0"
					});
					break;
				case 15:
					this.setState({
						placet: "10%", //15-右脸
						placer: "0",
						placel: "20%",
						placeb: "0"
					});
					break;
			};
			if (this.state.currentRunMode == "1") {
				//自动模式
				this.setState({
					qSlidorFlag: true, // 档位选择开关 false开 true关
					rangeFlag: true, //时间选择开关 false开 true关
					gears: AppData.faceCleanerConfig[num - 11].gears,
					currentRunMode: "1",
					runTime: AppData.faceCleanerConfig[num - 11].runTime,
					remark: AppData.faceCleanerConfig[num - 11].remark,
					bgc11: "#FC84A7", //额头
					bgc15: "#FC84A7", //右脸
					bgc12: "#FC84A7", //鼻子
					bgc14: "#FC84A7", //部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
					bgc13: "#FC84A7" //左脸
				}); //复原样式
			} else if (this.state.currentRunMode == "0") {
					//手动模式
					if (AppData.faceCleanerConfig) {
						this.setState({
							remark: AppData.faceCleanerConfig[num - 11].remark
						});
					};
					this.setState({
						qSlidorFlag: false, // 档位选择开关 false开 true关
						rangeFlag: false, //时间选择开关 false开 true关
						gears: AppData.currentRunConfig[num - 11].gears,
						currentRunMode: "0",
						runTime: AppData.currentRunConfig[num - 11].runTime,
						bgc11: "#FC84A7", //额头
						bgc15: "#FC84A7", //右脸
						bgc12: "#FC84A7", //鼻子
						bgc14: "#FC84A7", //下颚
						bgc13: "#FC84A7" //左脸
					}); //复原样式
				};
			isUpdate = 1; //在切换部位的时候也把推入的数据屏蔽
			var styleList = {};
			styleList["bgc" + num] = "#6DDBB6";
			this.setState(styleList); //选中的样式设置
		},
		handlerSubmit: function handlerSubmit() {
			if (this.state.footerColor == "#fb84a6") {
				//当按钮颜色为#fb84a6才可以提交数据
				var currentRunMode = this.state.currentRunMode; //当前的模式
				if (currentRunMode == "1") {
					//自动模式提交
					var configData = AppData.faceCleanerConfig; //自动挡数据
					configSubmitData.gears1 = configData[0].gears;
					configSubmitData.gears2 = configData[1].gears;
					configSubmitData.gears4 = configData[2].gears;
					configSubmitData.gears3 = configData[3].gears;
					configSubmitData.gears5 = configData[4].gears;
					configSubmitData.runtime1 = configData[0].runTime;
					configSubmitData.runtime2 = configData[1].runTime;
					configSubmitData.runtime4 = configData[2].runTime;
					configSubmitData.runtime3 = configData[3].runTime;
					configSubmitData.runtime5 = configData[4].runTime;
					configSubmitData.configMode = "1";
					var currentData = AppData.currentRunConfig; //手动模式的配置数据
					if (configData[0].gears != currentData[0].gears) {
						configSubmitData.updateFlag |= Math.pow(2, 0);
					};
					if (configData[1].gears != currentData[1].gears) {
						configSubmitData.updateFlag |= Math.pow(2, 2);
					};
					if (configData[2].gears != currentData[2].gears) {
						//左脸 gear4
						configSubmitData.updateFlag |= Math.pow(2, 6);
					};
					if (configData[3].gears != currentData[3].gears) {
						//下巴  gear3
						configSubmitData.updateFlag |= Math.pow(2, 4);
					};
					if (configData[4].gears != currentData[4].gears) {
						configSubmitData.updateFlag |= Math.pow(2, 8);
					};
					if (configData[0].runTime != currentData[0].runTime) {
						configSubmitData.updateFlag |= Math.pow(2, 1);
					};
					if (configData[1].runTime != currentData[1].runTime) {
						configSubmitData.updateFlag |= Math.pow(2, 3);
					};
					if (configData[2].runTime != currentData[2].runTime) {
						configSubmitData.updateFlag |= Math.pow(2, 7);
					};
					if (configData[3].runTime != currentData[3].runTime) {
						configSubmitData.updateFlag |= Math.pow(2, 5);
					};
					if (configData[4].runTime != currentData[4].runTime) {
						configSubmitData.updateFlag |= Math.pow(2, 9);
					};
					// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
					het.send(configSubmitData, function (data) {
						het.toast("同步成功！");
						isUpdate = 0; //提交成功重置为0
						configSubmitData.updateFlag = 0; //每次提交重置自动模式的updateFlag
					}, function (data) {
						het.toast("同步失败！"); //同步失败
					});
				} else {
						submitData.configMode = 0; //手动模式提交
						het.send(submitData, function (data) {
							het.toast("同步成功！");
							isUpdate = 0; //提交成功重置为0
							submitData.updateFlag = 0; //每次提交重置手动模式的updateFlag
						}, function (data) {
							het.toast("同步失败！"); //同步失败
						});
					}
				this.setState({ footerColor: "#b0b0b6" }); //重置颜色
			};
		},
		LinkHrefTouch: function LinkHrefTouch() {
			//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
			var currentRunMode = this.state.currentRunMode; //当前的模式
			var stepsData = {}; //二级页面数据对象
			if (currentRunMode == "0") {
				//手动模式提交
				stepsData = submitData;
			} else {
				//自动模式提交
				var configData = AppData.faceCleanerConfig; //自动挡数据
				stepsData.gears1 = configData[0].gears;
				stepsData.gears2 = configData[1].gears;
				stepsData.gears4 = configData[2].gears;
				stepsData.gears3 = configData[3].gears;
				stepsData.gears5 = configData[4].gears;
				stepsData.runtime1 = configData[0].runTime;
				stepsData.runtime2 = configData[1].runTime;
				stepsData.runtime4 = configData[2].runTime;
				stepsData.runtime3 = configData[3].runTime;
				stepsData.runtime5 = configData[4].runTime;
			};
			var a1 = stepsData.gears1;var b1 = stepsData.runtime1; //额头
			var a2 = stepsData.gears2;var b2 = stepsData.runtime2; //鼻子
			var a4 = stepsData.gears4;var b4 = stepsData.runtime4; //左脸
			var a3 = stepsData.gears3;var b3 = stepsData.runtime3; //下颚
			var a5 = stepsData.gears5;var b5 = stepsData.runtime5; //右脸
			location.href = "./cleansing.html#/steps/" + a1 + "/" + b1 + "/" + a2 + "/" + b2 + "/" + a4 + "/" + b4 + "/" + a3 + "/" + b3 + "/" + a5 + "/" + b5;
		},
		render: function render() {
			var onlineStatus = this.state.onlineStatus; //在线状态（1-正常，2-异常）
			var electricity = this.state.electricity; //电量（1-电量低于5%，2-电量低于10%，3-电量低于20%，4-电量正常，5-电池电压过高）
			var chargeStatus = this.state.chargeStatus; //充电状态（1无充电,2-充电电压正常，3-充电电压过低，4-充电电压过高）
			// console.log('state', this.state);
			var footerColor = getSaveFlag(this.state) ? '#fb84a6' : '#b0b0b6';
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'appMain-wrap' },
					React.createElement(
						'div',
						{ style: { paddingBottom: 50 } },
						React.createElement(
							'section',
							{ className: 'pk-header screen' },
							React.createElement(
								'div',
								{ className: 'pic' },
								React.createElement('img', { className: 'pic', src: '../static/img/head.png' }),
								React.createElement('div', { className: 'pic-place', style: { top: this.state.placet, right: this.state.placer, left: this.state.placel, bottom: this.state.placeb } }),
								React.createElement(
									'div',
									{ className: 'circle clc-top', style: { backgroundColor: this.state.bgc11 }, onTouchEnd: this.handlerTounchList.bind(this, 11) },
									'额头'
								),
								React.createElement(
									'div',
									{ className: 'circle clc-left', style: { backgroundColor: this.state.bgc13 }, onTouchEnd: this.handlerTounchList.bind(this, 13) },
									'左脸'
								),
								React.createElement(
									'div',
									{ className: 'circle clc-right', style: { backgroundColor: this.state.bgc15 }, onTouchEnd: this.handlerTounchList.bind(this, 15) },
									'右脸'
								),
								React.createElement(
									'div',
									{ className: 'circle clc-chin', style: { backgroundColor: this.state.bgc14 }, onTouchEnd: this.handlerTounchList.bind(this, 14) },
									'下巴'
								),
								React.createElement(
									'div',
									{ className: 'circle clc-nose', style: { backgroundColor: this.state.bgc12 }, onTouchEnd: this.handlerTounchList.bind(this, 12) },
									'鼻子'
								),
								React.createElement(
									'span',
									{ className: 'offline', style: { display: this.state.onlineStatus == 1 ? "none" : "block" } },
									'您的设备已离线'
								)
							),
							React.createElement(
								'div',
								{ className: 'icon-v' },
								React.createElement('div', { className: 'icon-v-l' }),
								React.createElement(
									'div',
									{ className: 'icon-v-r tr' },
									React.createElement('img', { className: 'right-img', onTouchEnd: this.LinkHrefTouch, src: '../static/img/pic_09.png' })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'gear pk-flex' },
							React.createElement(
								'div',
								{ className: 'gear-left color-00000' },
								'档位选择'
							),
							React.createElement(
								'div',
								{ className: 'gear-right pk-flex-right' },
								this.state.currentRunMode == "1" ? React.createElement(
									'div',
									{ className: 'gear-choose', onTouchEnd: this.handlerTounch },
									React.createElement(
										'div',
										{ className: 'gear-txt' },
										'自动'
									),
									React.createElement('div', { className: 'gear-circle' })
								) : React.createElement(
									'div',
									{ className: 'gear-choose', onTouchEnd: this.handlerTounch },
									React.createElement(
										'div',
										{ className: 'gear-txts' },
										'手动'
									),
									React.createElement('div', { className: 'gear-circle gear-circles' })
								)
							)
						),
						React.createElement(QSlidor, { value: this.state.gears, disabled: this.state.qSlidorFlag, items: this.items, fnFeedback: this.qslidorFeedbackFn }),
						React.createElement(
							'div',
							{ className: 'cleansing-time color-00000' },
							'洁面时间'
						),
						React.createElement(
							'div',
							{ className: 'pk-range' },
							React.createElement(Range, { disabled: this.state.rangeFlag, value: this.state.runTime, max: '40', min: '5', fnFeedback: this.rangeFeedbackFn })
						),
						React.createElement(
							'div',
							{ className: 'pk-range-value pk-flex' },
							React.createElement(
								'div',
								{ className: 'pk-range-lvalue' },
								'5s'
							),
							React.createElement(
								'div',
								{ className: 'pk-range-rvalue tr' },
								'40s'
							)
						),
						React.createElement(
							'div',
							{ className: 'pk-cleansing-ms' },
							this.state.remark ? React.createElement(
								'div',
								{ className: 'pk-cleansing-ms2' },
								this.state.remark
							) : React.createElement(
								'div',
								{ className: 'pk-cleansing-ms3' },
								React.createElement(
									'label',
									null,
									'为使电磁洁面仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...'
								),
								React.createElement(
									'a',
									{ href: 'cbeauty://cbeauty_skintest' },
									'去测试肌肤>>'
								)
							),
							React.createElement(
								'div',
								{ className: 'pk-cleansing-waring', style: { display: this.state.onlineStatus == 1 && this.state.chargeStatus == 1 && this.state.electricity <= 4 ? "block" : "none" } },
								React.createElement('img', { className: 'img-waring', src: '../static/img/waring.png' }),
								'"电量不足，请充电！"'
							)
						)
					)
				),
				React.createElement(
					'div',
					{ id: 'footer', onTouchEnd: this.handlerSubmit },
					React.createElement(SettingButton, { settingStatus: this.state.footerColor == "#fb84a6" ? "on" : "off" })
				),
				React.createElement(RouteHandler, null),
				React.createElement('div', { id: 'mytoast' })
			);
		}
	});
	// 定义路由
	var Routes = React.createElement(
		Route,
		{ path: '/', handler: Cleansing },
		React.createElement(Route, { name: 'steps', path: 'steps/:gears1/:runtime1/:gears2/:runtime2/:gears4/:runtime4/:gears3/:runtime3/:gears5/:runtime5', handler: CleansingSteps })
	);
	// 准备就绪，开始渲染页面
	het.domReady(function () {
		window.addEventListener('hashchange', function () {
			//监听hasn变化后改变页面标题
			var hash = location.hash;
			if (hash == "#/") {
				het.setTitle('电磁洁面仪');
			} else {
				het.setTitle('洁面步骤');
			};
		}, false);
		het.config({
			useUpdateFlag: true,
			onceConfigData: true,
			renderConfigData: false,
			debugMode: "print"
		}); //需要调试数据开启debugMode
		ReactRouter.run(Routes, ReactRouter.HashLocation, function (Root) {
			React.render(React.createElement(Root, null), document.body);
		});
		/*setTimeout(function(){
	 myscroller = new IScroll("panel-scroller", {
	      vScroll:true,
	      vScrollbar:false, 
	      onBeforeScrollStart: function(e) {
	          var target = e.target; 
	          while (target.nodeType != 1) target = target.parentNode; 
	          if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
	          e.preventDefault();
	      }
	  });
	 },200);*/
		document.body.addEventListener('touchstart', function () {}); // 激活IOS设备:active效果
	});
	// 调用iscroll处理页面滚动

	// 接收到repaint请求后将自动执行此操作
	het.repaint(function (data) {
		// alert(JSON.stringify(data));
		// console.log(data);
		// console.log(submitData.updateFlag+","+isUpdate);
		// console.log(!(submitData.updateFlag==0 && isUpdate==0));
		if (!(submitData.updateFlag == 0 && isUpdate == 0) || !(configSubmitData.updateFlag == 0 && isUpdate == 0)) return; // 未同步前忽略新接收到的数据
		if (data.electricity || data.onlineStatus || data.chargeStatus) {
			ElectricityData = data; //获取电量对象
		} else if (data.currentRunMode == "0" || data.currentRunMode == "1") {
				//获取设备数据
				var sortData = {}; //排序数组
				sortData.currentRunMode = data.currentRunMode;
				submitData.configMode = data.currentRunMode; //默认模式
				if (data.faceCleanerConfig) {
					var arrList = data.faceCleanerConfig; //faceCleanerConfig数组推荐模式
					var dataList = []; //排序
					arrList.forEach(function (e) {
						if (e.part == "11") {
							dataList[0] = e;
						} else if (e.part == "12") {
							dataList[1] = e;
						} else if (e.part == "13") {
							dataList[2] = e; //左脸
						} else if (e.part == "14") {
								dataList[3] = e; //下巴
							} else if (e.part == "15") {
									dataList[4] = e;
								};
					});
					sortData.faceCleanerConfig = dataList;
				};
				if (data.currentRunConfig) {
					var arrListc = data.currentRunConfig; //currentRunConfig数组当前运行模式
					var dataListc = []; //排序
					arrListc.forEach(function (e) {
						if (e.part == "11") {
							dataListc[0] = e;
							submitData.gears1 = e.gears;
							submitData.runtime1 = e.runTime;
						} else if (e.part == "12") {
							dataListc[1] = e;
							submitData.gears2 = e.gears;
							submitData.runtime2 = e.runTime;
						} else if (e.part == "13") {
							dataListc[2] = e;
							submitData.gears4 = e.gears;
							submitData.runtime4 = e.runTime;
						} else if (e.part == "14") {
							dataListc[3] = e;
							submitData.gears3 = e.gears;
							submitData.runtime3 = e.runTime;
						} else if (e.part == "15") {
							dataListc[4] = e;
							submitData.gears5 = e.gears;
							submitData.runtime5 = e.runTime;
						};
					});
					sortData.currentRunConfig = dataListc;
				};
				// AppData = sortData;//保存排序对象
				_fun.Funs._extends(AppData, sortData); //保存排序对象
			};
		_fun.Funs._extends(AppData, ElectricityData);
		AppActions.repaint(AppData);
		// AppActions.repaint(ElectricityData);
	});

	/**
	 * 判断是否需要保存
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getSaveFlag(oriData) {
		// return !!Object.keys(het.diff(AppData)).length;
		var count = 0;
		// var data = het.diff(AppData);
		var data = het.diff(oriData);
		for (var k in data) {
			if (k === 'updateFlag') continue;
			count++;
		}
		return !!count;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(4);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 4 */
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
/* 5 */
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
/* 6 */
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