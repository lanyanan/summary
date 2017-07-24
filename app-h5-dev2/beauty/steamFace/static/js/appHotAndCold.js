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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount();
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount();
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
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
			if (this.props.show == true) {
				this.setState({ timeDisplay: true });
				clearInterval(this.timr);
				var showOpacity = 0;
				this.timr = setInterval(function () {
					showOpacity += 0.1;
					if (showOpacity >= 1) {
						clearInterval(this.timr);
						this.setState({ showOpacity: showOpacity });
					}
				}.bind(this), 10);
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (this.props.hourarray && this.props.hourarray instanceof Array) {
				hourarr = this.props.hourarray;
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
			if (next.defaulthour) {
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
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour) {
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
				this.props.submitClock(this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
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
			var minute = this.state.minute || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'时'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'分'
							),
							React.createElement(
								'span',
								{ className: 'status' },
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
					),
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'取消'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'确定'
						)
					)
				)
			);
		}
	});

/***/ },
/* 5 */
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
	'switchMode', 'switchModeHand', 'addMinue', 'setTimeFromApp', 'selectTimeArr', 'opeenOrClose', 'changeDeviceStatus']);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(5);

	var _fun = __webpack_require__(7);

	var AppData = {
	    smartModeSwitch: 1,
	    index: -1,
	    timeArr: [0, 0, 0, 0, 0, 0],
	    modeName: 1,
	    deviceStatus: 0,
	    //模式名称时间数组
	    modeNameArrs: [{ hotSpray1: 13, coldSpray1: 2, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //弹力修护
	    { hotSpray1: 6, coldSpray1: 1.5, hotSpray2: 3, coldSpray2: 1.5, hotSpray3: 3, coldSpray3: 0 }, //皮肤清洁
	    { hotSpray1: 6, coldSpray1: 1, hotSpray2: 3, coldSpray2: 1, hotSpray3: 3, coldSpray3: 1 }, //控油护理
	    { hotSpray1: 6, coldSpray1: 0.5, hotSpray2: 2.25, coldSpray2: 0.41, hotSpray3: 3, coldSpray3: 45 }, //醒肤模式
	    { hotSpray1: 6, coldSpray1: 1, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 } //快速温热

	    ],
	    //设备模式时间数组
	    deviceModeItems: [{ hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //我的模式                  
	    { hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //日常
	    { hotSpray1: 0, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //加强
	    { hotSpray1: 6, coldSpray1: 1, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //温热 
	    { hotSpray1: 15, coldSpray1: 0, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 }, //热雾 
	    { hotSpray1: 0, coldSpray1: 3, hotSpray2: 0, coldSpray2: 0, hotSpray3: 0, coldSpray3: 0 } //冷雾
	    ]
	};

	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        AppData.timeArr[0] = data.hotSpray1;
	        AppData.timeArr[1] = data.coldSpray1;
	        AppData.timeArr[2] = data.hotSpray2;
	        AppData.timeArr[3] = data.coldSpray2;
	        AppData.timeArr[4] = data.hotSpray3;
	        AppData.timeArr[5] = data.coldSpray3;
	        data.modeNameArrs = AppData.modeNameArrs;
	        data.deviceModeItems = AppData.deviceModeItems;
	        // AppData.updateFlag = het.calcUpdateFlag(18)+het.calcUpdateFlag(19)+het.calcUpdateFlag(20)+het.calcUpdateFlag(21)+het.calcUpdateFlag(22)+het.calcUpdateFlag(23);
	        this.trigger(data);
	    },
	    onRefreshData: function onRefreshData() {
	        this.trigger(AppData);
	    },
	    onClockSwitch: function onClockSwitch() {
	        this.trigger({ timeshow: false });
	    },
	    onSelectTime: function onSelectTime(minute) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var remaintime = parseInt(minute);
	        AppData.remaintime = remaintime;
	        AppData.updateFlag = het.calcUpdateFlag(12) + het.calcUpdateFlag(3) + het.calcUpdateFlag(4);
	        AppData.timeArr[AppData.index] = minute;
	        this.trigger({ remainTime: remaintime, timeArr: AppData.timeArr });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger({ timeshow: false });
	    },
	    onSwitchMode: function onSwitchMode() {
	        AppData.smartModeSwitch = AppData.smartModeSwitch = 1; //改变变量的值控制dom元素显示与隐藏
	        this.trigger({ smartModeSwitch: AppData.smartModeSwitch });
	        AppData.updateFlag = het.calcUpdateFlag(12);
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwitchModeHand: function onSwitchModeHand() {
	        AppData.smartModeSwitch = AppData.smartModeSwitch = 0; //改变变量的值控制dom元素显示与隐藏
	        this.trigger({ smartModeSwitch: AppData.smartModeSwitch });
	        AppData.updateFlag = het.calcUpdateFlag(12);
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAddMinue: function onAddMinue(index) {
	        AppData.index = index;
	    },
	    onSetTimeFromApp: function onSetTimeFromApp() {
	        AppData.hotSpray1 = AppData.timeArr[0];
	        AppData.coldSpray1 = AppData.timeArr[1];
	        AppData.hotSpray2 = AppData.timeArr[2];
	        AppData.coldSpray2 = AppData.timeArr[3];
	        AppData.hotSpray3 = AppData.timeArr[4];
	        AppData.coldSpray3 = AppData.timeArr[5];
	        AppData.updateFlag = het.calcUpdateFlag(18) + het.calcUpdateFlag(19) + het.calcUpdateFlag(20) + het.calcUpdateFlag(21) + het.calcUpdateFlag(22) + het.calcUpdateFlag(23);
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSelectTimeArr: function onSelectTimeArr(index, type) {
	        AppData.modeName = index;
	        AppData.updateFlag = het.calcUpdateFlag(17);
	        this.trigger(AppData);
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    //主页面的开关
	    onOpeenOrClose: function onOpeenOrClose(state) {
	        AppData.onOff = state.onOff = 2;
	        AppData.updateFlag = het.calcUpdateFlag(10);
	        this.trigger(AppData);
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        // AppData = Funs._extends(AppData,state);
	        // if(state.deviceClick==1){

	        //     AppData.deviceClick=2;
	        //     this.trigger({deviceClick:2});

	        // }
	        // else if(state.deviceClick==2){

	        //     AppData.deviceClick=1;
	        //      this.trigger({deviceClick:1});
	        // }

	        // sessionStorage.setItem('onOff',AppData.onOff);
	        /*//这里需要修改
	         AppData.updateFlag =het.calcUpdateFlag(11);
	        het.send(AppData, function(data){
	            // console.log(data)
	        },function(data){
	            het.toast("命令发送失败");
	        });*/
	    },
	    //工作页面的开关
	    onChangeDeviceStatus: function onChangeDeviceStatus(deviceStatus) {
	        if (deviceStatus == 2) {
	            AppData.deviceStatus = deviceStatus = 2;
	        }
	        AppData.onOff = 1;
	        this.trigger(AppData);
	        AppData.updateFlag = het.calcUpdateFlag(10) + het.calcUpdateFlag(7);
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }

	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(8);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _TimeSelect = __webpack_require__(4);

	var _Actions = __webpack_require__(5);

	var _Store = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        //roundIndex 当前选择模式名称的index
	        //Xvalue  value 是滑动的刻度值
	        //smartModeSwitch  智能模式开关 0手动 1自动
	        //deviceMode 智能推荐时传的数据
	        //deviceModeIndex 手动模式时设备模式
	        //modeName app传过来的模式名称index 在智能模式下使用
	        //deviceType 用来区分是点击模式名称或者是设备模式
	        //hotSpray1Leave ,coldSpary1Leave 热敷冷敷的时间值
	        //onOff 1关机  2 开机 用户点击改变设备工作状态 只点击开关按钮时才能改变值1 or 2 其它情况下下发 0 给app
	        //deviceStatus 工作状态 0: 上电 1: 睡眠 2: 关机 3: 待机 4: 工作

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this2.state = { roundIndex: -1, Xvalue: 0, value: 0, smartModeSwitch: 1, deviceMode: 3, deviceModeIndex: 1, modeName: 1, deviceType: 'deviceMode', hotSpray1Leave: 2, hotSpray2Leave: 2, hotSpray3Leave: 2, coldSpary1Leave: 0, coldSpary2Leave: 0, coldSpary3Leave: 0, onOff: 2, deviceStatus: 4 };
	        _this2.listenStore(_Store.Store); // 监听Store
	        //头部的扩散
	        if (_this2.state.border === undefined && _this2.state.opacity === undefined) {
	            var _this = _this2;
	            /* setInterval(()=>{
	                 let border=_this.state.border || 15.76;
	                 let opacity= _this.state.opacity || 0.18;
	                border+=0.5;
	                opacity-=0.005; 
	                if(opacity<=0.06){opacity=0.18;}
	                 if(border>=24){border=15.76;}
	                 _this.setState({
	                     border:border,
	                     opacity:opacity
	                 });
	             },100)*/
	        }
	        //模式名称 15我的模式可以编辑时间  当modeName为16时要显示App传我的设备模式
	        _this2.modeNameItems = [{ modeName: 1, name: "弹力修护", explain: "富有活力的弹力肌肤，抵御干燥" }, { modeName: 2, name: "皮肤清洁", explain: "肌肤更加洁净透亮" }, { modeName: 3, name: "快速温热", explain: "细致毛孔，调节水油平衡" }, { modeName: 24, name: "醒肤模式", explain: "肌肤光滑清爽" }, { modeName: 5, name: "控油护理", explain: "快速温热护理，促进护肤品吸收" }, { modeName: 6, name: "快速温热", explain: "细致毛孔，调节水油平衡" }, { modeName: 15, name: "我的模式", explain: "根据用户自身需求，手动设置" }, { modeName: 16, name: " ", explain: " " }];
	        //设备模式
	        _this2.deviceModeItems = [{ deviceMode: 1, name: "日常", explain: " " }, { deviceMode: 2, name: "加强", explain: " " }, { deviceMode: 3, name: "温热", explain: "快速温热护理，促进护肤品吸收" }, { deviceMode: 4, name: "热雾", explain: "热蒸打开毛孔，高效补水，促进循环" }, { deviceMode: 5, name: "冷雾", explain: "冷喷镇定肌肤，改善敏感肤质" }];

	        return _this2;
	    }
	    //页面一进来改变onOff的值
	    /*componentDidMount(){
	        //Actions.changeDeviceStatus('hotApp');
	        Actions.opeenOrClose();     
	      }*/
	    //点击模式小圈时改变为选中样式


	    _createClass(App, [{
	        key: 'maxSelect',
	        value: function maxSelect(e) {
	            var index = e.target.getAttribute('data-index');
	            var type = e.target.getAttribute('data-type');
	            console.log("index-" + index, "roundIndex-" + this.state.roundIndex);
	            this.setState({
	                roundIndex: index,
	                deviceType: type,
	                deviceModeIndex: index
	            });
	            if (index != 0 && type === 'deviceMode') return; //判断index和type用来阻止设备模式下除“我的模式”以外其它模式的点击事件
	            _Actions.Actions.selectTimeArr(index, type);
	        }
	        //开始触摸位置

	    }, {
	        key: 'startrange',
	        value: function startrange(e) {
	            //开始滑动时间刻度 记录初始坐标值
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientX);
	            this.setState({
	                oldX: Xvalue
	            });

	            _Actions.Actions.opeenOrClose({ onOff: 0 });
	        }
	        //滑动

	    }, {
	        key: 'moverange',
	        value: function moverange(e) {
	            //滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
	            e.stopPropagation();
	            e.preventDefault();
	            var Xvalue = parseInt(e.touches[0].clientX);
	            var oldX = parseInt(this.state.oldX);
	            var value = Xvalue - oldX;
	            this.setState({
	                value: value,
	                Xvalue: Xvalue
	            });

	            _Actions.Actions.opeenOrClose({ onOff: 0 });
	        }
	        //结束触摸

	    }, {
	        key: 'endrange',
	        value: function endrange(e) {
	            //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
	            e.stopPropagation();
	            e.preventDefault();
	            // let newX = parseInt(this.state.Xvalue);//滑动结束时的y值
	            // let oldX = parseInt(this.state.oldX);//滑动开始时的y值
	            // this.setState({
	            //     value:newX
	            // });

	            _Actions.Actions.opeenOrClose({ onOff: 0 });
	        }
	        //智能模式按钮切换它对应div的显示隐藏

	    }, {
	        key: 'switchMode',
	        value: function switchMode() {
	            _Actions.Actions.switchMode();
	        }
	        //手动模式按钮切换它对应div的显示隐藏

	    }, {
	        key: 'switchModeHand',
	        value: function switchModeHand() {
	            //let divdHinde=this.refs.divHide;
	            //divdHinde.css="display:none";
	            _Actions.Actions.switchModeHand();
	        }
	        //点击开关按钮改变待机状态

	    }, {
	        key: 'changeDeviceStatus',
	        value: function changeDeviceStatus(deviceStatus) {
	            _Actions.Actions.changeDeviceStatus(this.state.deviceStatus);
	            /*Actions.opeenOrClose({onOff:1});*/
	            // var deviceClick = this.state.deviceClick;
	            // var obj ={
	            //     deviceClick:deviceClick
	            // }
	            // Actions.opeenOrClose(obj);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            /* console.log("deviceMode-"+this.state.deviceMode);
	             console.log("roundIndex"+this.state.roundIndex);
	             console.log("deviceModeIndex"+this.state.deviceModeIndex);
	             console.log("deviceType-"+this.state.deviceType);*/
	            {
	                this.state.deviceStatus == 2 ? window.location.href = "./index.html" : "";
	            }
	            var deviceStatus = this.state.deviceStatus;
	            var roundIndex = this.state.roundIndex;
	            //对应两个模式的初始变量
	            var modeNameArrs = this.state.modeNameArrs || [{}, {}, {}, {}, {}, {}, {}];
	            var deviceModeItems = this.state.deviceModeItems || [{}, {}, {}, {}, {}];
	            var modArr = [0, 0, 0, 0, 0, 0];
	            var modeIndex = roundIndex >= 0 ? roundIndex : this.state.deviceMode === 1 ? this.state.deviceMode : this.state.deviceModeIndex;
	            //
	            var modeArrs = this.state.deviceType !== 'deviceMode' ? modeNameArrs : deviceModeItems;

	            var items = this.state.deviceType !== 'deviceMode' ? this.modeNameItems : this.deviceModeItems;
	            //判断不否是设备模式下的第一个模式“手动模式”
	            var styleSetButton = this.state.deviceType == 'deviceMode' && this.state.deviceModeIndex == 0 ? { display: 'inline-block' } : { display: 'none' };
	            var explain = items[modeIndex].explain;
	            if (modeArrs) modArr = [modeArrs[modeIndex].hotSpray1, modeArrs[modeIndex].coldSpray1, modeArrs[modeIndex].hotSpray2, modeArrs[modeIndex].coldSpray2, modeArrs[modeIndex].hotSpray3, modeArrs[modeIndex].coldSpray3];
	            return React.createElement(
	                'div',
	                { className: 'cold_div' },
	                React.createElement(
	                    'div',
	                    { className: 'clod_headr' },
	                    React.createElement(
	                        'div',
	                        { className: 'cilcle_one' },
	                        React.createElement(
	                            'p',
	                            { className: 'time' },
	                            '02:12'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'text' },
	                            '智能模式：热喷'
	                        )
	                    ),
	                    React.createElement('div', { className: 'cllce_two', style: { width: this.state.border + 'rem', height: this.state.border + 'rem', opacity: this.state.opacity } }),
	                    React.createElement('div', { className: 'offOn', onTouchEnd: this.changeDeviceStatus.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'selectMode' },
	                    React.createElement(
	                        'span',
	                        { onTouchStart: this.switchMode.bind(this), className: "auto_div" + (this.state.smartModeSwitch === 1 ? "  c3" : "  e5") },
	                        '智能模式'
	                    ),
	                    React.createElement(
	                        'span',
	                        { onTouchStart: this.switchModeHand.bind(this), className: "operation_div" + (this.state.smartModeSwitch === 0 ? "  c3" : "  e5") },
	                        '手动模式'
	                    )
	                ),
	                React.createElement('div', { className: 'gap' }),
	                React.createElement(
	                    'div',
	                    { className: "selectMode_text" + (this.state.smartModeSwitch === 0 ? "" : " hide") },
	                    React.createElement(
	                        'p',
	                        null,
	                        '模式选择:'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "selectMode_select" + (this.state.smartModeSwitch === 0 ? "" : "  hide"),
	                        onTouchStart: this.startrange.bind(this), onTouchMove: this.moverange.bind(this), onTouchEnd: this.endrange.bind(this) },
	                    React.createElement(
	                        'div',
	                        { style: { marginLeft: this.state.value + 'px' } },
	                        React.createElement(
	                            'div',
	                            { className: "selectMod_select_div " + (this.state.roundIndex >= 0 || this.state.deviceModeIndex >= 0 ? "selectMod_select_div_max" : '') },
	                            this.modeNameItems.map(function (e, index) {
	                                return React.createElement(
	                                    'div',
	                                    { className: "round-div translateY " + (this.state.roundIndex == index && this.state.deviceType == null ? "round-div-max" + this.state.roundIndex : '') },
	                                    React.createElement('span', { 'data-index': index, refs: 'round_span', onTouchStart: this.maxSelect.bind(this), className: "round_span " + (this.state.roundIndex == index ? "round_span-max" : '') })
	                                );
	                            }.bind(this)),
	                            this.deviceModeItems.map(function (e, deviceModeIndex) {
	                                return React.createElement(
	                                    'div',
	                                    { className: "round-div translateY " + (this.state.deviceModeIndex == deviceModeIndex && roundIndex <= 0 && this.state.deviceType == 'deviceMode' ? "round-divOne-max" + this.state.deviceModeIndex : '') },
	                                    React.createElement('span', { 'data-index': deviceModeIndex, 'data-type': 'deviceMode', refs: 'round_span', onTouchStart: this.maxSelect.bind(this),
	                                        className: "round_span " + (roundIndex <= 0 && this.state.deviceModeIndex == deviceModeIndex ? "round_span-max" : '') })
	                                );
	                            }.bind(this)),
	                            React.createElement('div', { className: 'crosswise translateY' })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'selectMode_Combine' },
	                            React.createElement(
	                                'div',
	                                { className: 'selectMode_select_text modeNameItems' },
	                                this.modeNameItems.map(function (e, index) {
	                                    return React.createElement(
	                                        'div',
	                                        { className: 'round-div_text' },
	                                        e.name
	                                    );
	                                }.bind(this))
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'selectMode_select_text deviceModeItems' },
	                                this.deviceModeItems.map(function (e, deviceModeIndex) {
	                                    return React.createElement(
	                                        'div',
	                                        { className: 'round-div_text' },
	                                        e.name
	                                    );
	                                }.bind(this))
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "select_Ok" + (this.state.smartModeSwitch === 0 ? "" : "  hide") },
	                    React.createElement(
	                        'span',
	                        { className: 'span_mode' },
	                        '模式:',
	                        explain
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'span-set', style: styleSetButton },
	                        React.createElement(
	                            'a',
	                            { href: './editing.html' },
	                            '设置'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "cold_Mode_div" + (this.state.smartModeSwitch === 1 ? "" : " hide") },
	                    React.createElement(
	                        'p',
	                        null,
	                        '您的肤质为混合型偏干,为您专属推荐:'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'div_span' },
	                        React.createElement(
	                            'span',
	                            { className: this.state.deviceMode == 1 ? "show" : "hide" },
	                            '日常'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.deviceMode == 2 ? "show" : "hide" },
	                            '加强'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.deviceMode == 3 ? "show" : "hide" },
	                            '温热'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.deviceMode == 4 ? "show" : "hide" },
	                            '热雾'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.deviceMode == 5 ? "show" : "hide" },
	                            '冷雾'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.modeName == 1 ? "show" : "hide" },
	                            '弹力修护'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.modeName == 2 ? "show" : "hide" },
	                            '皮肤清洁'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.modeName == 3 ? "show" : "hide" },
	                            '快速温热'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.modeName == 4 ? "show" : "hide" },
	                            '醒肤模式'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: this.state.modeName == 5 ? "show" : "hide" },
	                            '控油护理'
	                        )
	                    )
	                ),
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
	                        modArr.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { className: "div_operation " + (index == 0 ? 'div_operation0' : "" || index == 5 ? 'div_operation5' : "") },
	                                React.createElement(
	                                    'div',
	                                    { className: 'div_time' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'span_text' },
	                                        index % 2 == 0 ? '热喷' : '冷喷'
	                                    ),
	                                    React.createElement('br', null),
	                                    React.createElement(
	                                        'span',
	                                        { className: 'span_time' },
	                                        item,
	                                        '  min'
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { 'data-index': index, className: 'div_editing' },
	                                    index == 0 ? this.state.hotSpray1Leave <= 0 ? '已完成' : '还剩' + this.state.hotSpray1Leave + 'S' : "",
	                                    index == 1 ? this.state.coldSpary1Leave <= 0 ? '已完成' : '还剩' + this.state.coldSpary1Leave + 'S' : "",
	                                    index == 2 ? this.state.hotSpray2Leave <= 0 ? '已完成' : '还剩' + this.state.hotSpray2Leave + 'S' : "",
	                                    index == 3 ? this.state.coldSpary2Leave <= 0 ? '已完成' : '还剩' + this.state.coldSpary2Leave + 'S' : "",
	                                    index == 4 ? this.state.hotSpray3Leave <= 0 ? '已完成' : '还剩' + this.state.hotSpray3Leave + 'S' : "",
	                                    index == 5 ? this.state.coldSpary3Leave <= 0 ? '已完成' : '还剩' + this.state.coldSpary3Leave + 'S' : ""
	                                )
	                            );
	                        }.bind(this))
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('冷敷');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

/***/ }
/******/ ]);