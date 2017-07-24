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

	module.exports = __webpack_require__(5);


/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';
	/**
	 * 滑动式日期区间选择器
	 * !! 因为需要跳转页面，所以需要配置路由来调用。配置方法参见eg
	 * @route {string}  :cbName     点确定时的回调函数名。该回调须登记于window下，否则将无法调用。
	 *                              该回调返回date对象，格式：{startDate: Date1, endDate: Date2}
	 * @route {date}    :startDate  开始时间，可选。格式：'2016-1-1'
	 * @route {date}    :endDate    结束时间，可选。格式：'2016-1-1'
	 * @route {integer} :months     可选月数，缺省为12个月
	 * @route {string}  :validDates 有数据的日期数组，格式：'2016-1-1, 2016-1-2, ...'
	 * @route {string}  :top        距离顶部的距离，默认为0
	 * @eg.   <Route path="/datepicker/:startDate/:endDate/:cbName/:validDates" component={SlidedCalendar} />
	 */

	// 创建React组件

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SlidedCalendar = exports.SlidedCalendar = function (_React$Component) {
	    _inherits(SlidedCalendar, _React$Component);

	    function SlidedCalendar(props) {
	        _classCallCheck(this, SlidedCalendar);

	        var _this2 = _possibleConstructorReturn(this, (SlidedCalendar.__proto__ || Object.getPrototypeOf(SlidedCalendar)).call(this, props));

	        var _this = _this2;
	        _this2.top = props.params.top ? props.params.top : 0;
	        _this2.calendar = _this2.createCalendarData(_this2.props.months || 12);
	        _this2.state = {
	            validDates: (props.params.validDates || '').split(',').map(function (d) {
	                return _this2.zeroTimestamp(d);
	            }),
	            startDate: props.params.startDate ? _this.zeroTimestamp(props.params.startDate) : Infinity,
	            endDate: props.params.endDate ? _this.zeroTimestamp(props.params.endDate) : 0
	        };
	        _this2.touchCounter = 0; // 点击计数器
	        _this2.selectDate = _this2.selectDate.bind(_this2);
	        _this2.submit = _this2.submit.bind(_this2);
	        return _this2;
	    }

	    _createClass(SlidedCalendar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var main = ReactDOM.findDOMNode(this.refs.main);
	            document.body.scrollTop = main.scrollHeight;
	        }
	        // 生成0点时间戳，用于对比

	    }, {
	        key: 'zeroTimestamp',
	        value: function zeroTimestamp(date) {
	            var time = new Date(date.toString().replace(/(?=\b\d\b)/g, '0'));
	            time.setHours(0);
	            time.setMinutes(0);
	            time.setSeconds(0);
	            return time.getTime();
	        }
	        // 生成日历数据

	    }, {
	        key: 'createCalendarData',
	        value: function createCalendarData(forwardMonth) {
	            forwardMonth = parseInt(forwardMonth);
	            var cData = [];
	            var cursor = new Date();
	            cursor.setMonth(cursor.getMonth() - forwardMonth);
	            for (var i = forwardMonth; i > 0; i--) {
	                cursor.setMonth(cursor.getMonth() + 1);
	                cData.push({
	                    year: cursor.getFullYear(),
	                    month: cursor.getMonth(),
	                    data: monthData(cursor)
	                });
	            }
	            function monthData(date) {
	                var d = new Date(date);
	                var wData = []; // 周数据
	                var mData = []; // 月数据
	                var m = d.getMonth();
	                d.setDate(1);
	                for (var h = 0; h < d.getDay(); h++) {
	                    wData.push(0);
	                }
	                for (var _i = 0; _i < 6; _i++) {
	                    for (var j = _i === 0 ? h : 0; j < 7; j++) {
	                        if (d.getMonth() - m === 0) {
	                            wData.push(d.getDate());
	                        } else {
	                            if (_i >= 4 && j === 0) {
	                                // 排除最后一周全空的情况
	                                break;
	                            }
	                            wData.push(0);
	                        }
	                        d.setDate(d.getDate() + 1);
	                    }
	                    mData.push(wData);
	                    wData = [];
	                }
	                return mData;
	            }
	            return cData;
	        }
	    }, {
	        key: 'selectDate',
	        value: function selectDate(e) {
	            var date = parseInt(e.currentTarget.getAttribute('data-date'));
	            if (date > new Date().getTime()) return; // 不允许选择超过当天的时间
	            this.touchCounter++;
	            if (this.touchCounter % 2) {
	                this.setState({ startDate: date, endDate: 0 });
	            } else if (this.state.startDate > date) {
	                this.touchCounter--;
	                this.setState({ startDate: date, endDate: 0 });
	                // alert('结束时间不能小于开始时间');
	            } else {
	                this.setState({ endDate: date });
	            }
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            var _this = this;
	            var cb = window[this.props.params.cbName];
	            if (!this.state.endDate) return;
	            if (typeof cb === 'function') {
	                cb({
	                    startDate: new Date(_this.state.startDate),
	                    endDate: new Date(_this.state.endDate)
	                });
	            }
	            setTimeout(function () {
	                return history.back();
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var today = this.zeroTimestamp(new Date().toString());
	            return React.createElement(
	                'div',
	                { ref: 'main', className: 'slided-calendar', style: { top: this.top } },
	                React.createElement(
	                    'ul',
	                    { className: 'sc-row head', style: { top: this.top } },
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u65E5'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E00'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E8C'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E09'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u56DB'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E94'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u516D'
	                    )
	                ),
	                this.calendar.map(function (m, idx1) {
	                    // 遍历月份
	                    return React.createElement(
	                        'section',
	                        { key: idx1 },
	                        React.createElement(
	                            'h2',
	                            null,
	                            m.year,
	                            '\u5E74',
	                            m.month + 1,
	                            '\u6708'
	                        ),
	                        m.data.map(function (w, idx2) {
	                            // 遍历周
	                            return React.createElement(
	                                'ul',
	                                { key: idx2, className: 'sc-row' },
	                                w.map(function (d, idx3) {
	                                    // 遍历天
	                                    if (d !== 0) {
	                                        var theDay = _this3.zeroTimestamp(m.year + '-' + (m.month + 1) + '-' + d);
	                                        var txt = theDay === today ? '今' : d;
	                                        var classNames = '';
	                                        // 当天0时时间戳
	                                        // 有效日期样式
	                                        classNames += _this3.state.validDates.indexOf(theDay) > -1 ? ' sc-vali' : '';
	                                        // 今天样式
	                                        classNames += theDay === today ? ' sc-today' : '';
	                                        // 开始样式
	                                        classNames += theDay === _this3.state.startDate ? ' sc-start' : '';
	                                        // 结束样式
	                                        classNames += theDay === _this3.state.endDate ? ' sc-end' : '';
	                                        // 区间样式
	                                        classNames += theDay > _this3.state.startDate && theDay < _this3.state.endDate ? ' sc-among' : '';
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: classNames, 'data-date': theDay, onClick: _this3.selectDate },
	                                            React.createElement(
	                                                'i',
	                                                null,
	                                                txt
	                                            )
	                                        );
	                                    } else {
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: 'sc-e' },
	                                            '\xA0'
	                                        );
	                                    }
	                                })
	                            );
	                        })
	                    );
	                }),
	                React.createElement(
	                    'footer',
	                    { className: 'sc-footer' },
	                    React.createElement(
	                        'a',
	                        { href: '#', onTouchEnd: this.submit, className: this.state.endDate ? 'enable' : '' },
	                        '\u786E\u5B9A'
	                    )
	                )
	            );
	        }
	    }]);

	    return SlidedCalendar;
	}(React.Component);

	;

/***/ }

/******/ });