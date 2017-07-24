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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EQUIPMENTLIST = [{ name: '香薰机', decribe: '香薰机自动调节为舒缓模式' }, { name: '睡眠带子', decribe: '睡眠带子实时监测心率、呼吸率、体动' }, { name: '加湿器', decribe: '加湿器自动开启，清新自然' }, { name: '空调', decribe: '室内环境监测，自动调节为最佳温度' }, { name: '窗帘', decribe: '窗帘自动关闭，营造舒适美容睡眠氛围' }, { name: '智能灯', decribe: '智能灯自动调节为助眠模式' }];

	//图表数据
	var CHARTDATA = [{
	    id: "heartChart", name: 'heart', decribe: "心率", behavior: '次/分',
	    data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
	    option: {
	        animation: false,
	        tooltip: {},
	        legend: { data: [''] },
	        grid: {
	            show: false,
	            left: 0,
	            top: 0,
	            bottom: 0,
	            right: 0
	        },
	        xAxis: {
	            show: false,
	            boundaryGap: true,
	            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
	        },
	        yAxis: {
	            show: false,
	            type: 'value',
	            max: 180
	        },
	        series: {
	            smooth: true,
	            symbol: "none",
	            name: '',
	            type: 'line',
	            data: [],
	            lineStyle: {
	                normal: {
	                    width: '2',
	                    color: '#fff'
	                }
	            }
	        }
	    }
	}, {
	    id: "breatChart", name: 'breat', decribe: "呼吸率", behavior: '次/分',
	    data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
	    option: {
	        animation: false,
	        grid: {
	            show: false,
	            left: 0,
	            top: 0,
	            bottom: 0,
	            right: 0
	        },
	        xAxis: {
	            show: false,
	            data: [1, 2, 3, 4, 5, 1, 2, 0, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 1]
	        },
	        yAxis: {
	            show: false,
	            max: 60
	        },
	        series: {
	            symbol: "none",
	            type: 'line',
	            name: '',
	            smooth: true,
	            data: [],
	            lineStyle: {
	                normal: {
	                    width: '2',
	                    color: '#fff'
	                }
	            }
	        }
	    }
	}, {
	    id: "bodiesChart", name: 'bodies', decribe: "体动", behavior: '次',
	    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	    option: {
	        animation: false,
	        tooltip: {},
	        legend: {
	            data: ['']
	        },
	        grid: {
	            show: false,
	            top: 0,
	            left: 0,
	            bottom: "25%",
	            right: 0
	        },
	        xAxis: {
	            type: 'category',
	            show: false,
	            data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 1, 2, 3, 4, 5, 1, 2, 3, 4]
	        },
	        yAxis: {
	            show: false,
	            type: "value",
	            max: 15
	        },
	        series: {
	            symbol: "none",
	            name: '',
	            type: 'line',
	            data: [],
	            step: true,
	            lineStyle: {
	                normal: {
	                    width: '2',
	                    color: '#fff'
	                }
	            }
	        }
	    }
	}];

	var dataTimer = 0;

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {
	            oldpage: null,
	            equipment: { name: '香薰机1', decribe: '香薰机自动调节为坑头疼香味' }
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            _Actions.Actions.getData(function () {
	                if (!_this.state.pageBtn) {
	                    _this.imgAnimation();
	                } else {
	                    _this.scrollAnimation();
	                }
	                _this.setState({
	                    oldpage: _this.state.pageBtn
	                });
	            });

	            this.reGetData();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            var _this = this;
	            if (!_this.state.pageBtn && _this.state.oldpage != _this.state.pageBtn) {
	                _this.setState({
	                    oldpage: _this.state.pageBtn
	                });
	                _this.imgAnimation();
	            } else if (_this.state.pageBtn && _this.state.oldpage != _this.state.pageBtn) {
	                _this.setState({
	                    oldpage: _this.state.pageBtn
	                });
	                _this.scrollAnimation();
	            }
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            clearInterval(dataTimer);
	            dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'scrollAnimation',
	        value: function scrollAnimation() {
	            var _this = this;
	            var swiper = new Swiper('.swiper-container', {
	                pagination: '.swiper-pagination',
	                paginationClickable: true,
	                autoplay: 5000,
	                onSlideChangeStart: function onSlideChangeStart(swiper) {
	                    var name = EQUIPMENTLIST[parseInt(swiper.activeIndex)]["name"],
	                        decribe = EQUIPMENTLIST[parseInt(swiper.activeIndex)]["decribe"];
	                    _this.setState({
	                        equipment: { name: name, decribe: decribe }
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'imgAnimation',
	        value: function imgAnimation() {
	            var mySwiper = new Swiper('.scroll-img-container2', {
	                autoplay: 5000
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement('div', { className: 'wrap' }),
	                React.createElement(
	                    'div',
	                    { className: 'content' },
	                    this.state.pageBtn ? React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'div',
	                            { className: 'life-box' },
	                            React.createElement(
	                                'h1',
	                                null,
	                                '\u7761\u7720\u72B6\u6001\u4E2D\u8EAB\u4F53\u4F53\u5F81\u6570\u636E\u5448\u73B0\uFF1A'
	                            ),
	                            React.createElement(ChartBox, { parameter: CHARTDATA[0], behaviorData: this.state.heartRate, data: this.state.chartHeartData }),
	                            React.createElement(ChartBox, { parameter: CHARTDATA[1], behaviorData: this.state.breathRate, data: this.state.chartBreathData }),
	                            React.createElement(ChartBox, { parameter: CHARTDATA[2], behaviorData: this.state.turnOverTimes, data: this.state.chartBodiesData })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'scroll-img' },
	                            React.createElement(
	                                'div',
	                                { className: 'swiper-container scroll-img-container' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'swiper-wrapper' },
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_5.png' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_2.png' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_3.png' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_4.png' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_1.png' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-slide' },
	                                        React.createElement('img', { src: '../static/img/pic_6.png' })
	                                    )
	                                ),
	                                React.createElement('div', { className: 'swiper-pagination' })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'scroll-img-txt' },
	                                React.createElement(
	                                    'ul',
	                                    null,
	                                    React.createElement(
	                                        'li',
	                                        null,
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            this.state.equipment.name
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            this.state.equipment.decribe
	                                        )
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'equipment-box' },
	                            React.createElement(
	                                'span',
	                                { className: 'equipment1' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u661F\u6708\u706F'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment2' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u9999\u85B0\u673A'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment3' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u7761\u7720\u5E26'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment4' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u667A\u6167\u76D2\u5B50'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment5' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u7A7A\u8C03'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment6' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u7A97\u5E18'
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'equipment7' },
	                                React.createElement(
	                                    'em',
	                                    null,
	                                    '\u7A7A\u6C14\u51C0\u5316\u5668'
	                                )
	                            )
	                        )
	                    ) : React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'div',
	                            { className: 'life-box' },
	                            React.createElement(
	                                'h1',
	                                null,
	                                '\u7761\u7720\u573A\u666F\u8054\u52A8\u6570\u636E\u5448\u73B0'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'line-box' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'line-map line1-box' },
	                                    React.createElement('span', { className: 'line line1' }),
	                                    React.createElement('em', { className: 'line line1' })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'line-map line2-box' },
	                                    React.createElement('span', { className: 'line line2' }),
	                                    React.createElement('em', { className: 'line line2' })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'line-map line3-box' },
	                                    React.createElement('span', { className: 'line line3' }),
	                                    React.createElement('em', { className: 'line line3' })
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'line-map line4-box' },
	                                    React.createElement('span', { className: 'line line4' }),
	                                    React.createElement('em', { className: 'line line4' })
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'text-box' },
	                                React.createElement(
	                                    'h5',
	                                    null,
	                                    '\u7761\u7720\u6539\u5584'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '\u6839\u636E\u8EAB\u4F53\u5065\u5EB7\u6570\u636E\uFF0C\u4E3A\u4F60\u81EA\u52A8\u8C03\u6574\u706F\u5149\u3001\u6E29\u5EA6\u3001\u9999\u85B0\u2026\u52A9\u4F60\u6539\u5584\u7761\u7720\u8D28\u91CF\u3001\u4EAB\u53D7\u667A\u80FD\u79D1\u6280\u751F\u6D3B\u7684\u4FBF\u5229\u548C\u8212\u9002\u3002'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'scroll-img2' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'swiper-container2 scroll-img-container2' },
	                                    React.createElement(
	                                        'div',
	                                        { className: 'swiper-wrapper' },
	                                        React.createElement(
	                                            'div',
	                                            { className: 'swiper-slide' },
	                                            React.createElement('img', { src: '../static/img/f1.png' })
	                                        ),
	                                        React.createElement(
	                                            'div',
	                                            { className: 'swiper-slide' },
	                                            React.createElement('img', { src: '../static/img/f2.png' })
	                                        ),
	                                        React.createElement(
	                                            'div',
	                                            { className: 'swiper-slide' },
	                                            React.createElement('img', { src: '../static/img/f3.png' })
	                                        ),
	                                        React.createElement(
	                                            'div',
	                                            { className: 'swiper-slide' },
	                                            React.createElement('img', { src: '../static/img/f4.png' })
	                                        )
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	var ChartBox = function (_BaseComponent2) {
	    _inherits(ChartBox, _BaseComponent2);

	    function ChartBox(props) {
	        _classCallCheck(this, ChartBox);

	        var _this3 = _possibleConstructorReturn(this, (ChartBox.__proto__ || Object.getPrototypeOf(ChartBox)).call(this, props));

	        _this3.state = {
	            lastBehaviorData: 0,
	            data: 0,
	            first: true,
	            behaviorData: 0,
	            turnOverTimesNum: 0
	        };
	        return _this3;
	    }

	    _createClass(ChartBox, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.myChart = null;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // let parameter = this.props.parameter,
	            //     data = this.props.data;
	            //     console.log(data);
	            // if(data){
	            //     let id = parameter.id,
	            //         option = parameter.option;
	            //     //option.series.data = [1,1,10,10,1,1,1,1,10,10,1,10,10,1,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	            //     //option.series.data = [20,20,30,20,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
	            //     option.series.data = data; 
	            //     this.handleChart(id,option);
	            // }
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (!nextProps.data) {
	                return false;
	            }

	            var id = nextProps.parameter.id,
	                option = nextProps.parameter.option;

	            //option.series.data = [1,1,10,10,1,1,1,1,10,10,1,10,10,1,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	            //option.series.data = [20,20,30,20,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];

	            if (nextProps.parameter.id === "bodiesChart") {
	                this.bodyDataAnalysis(nextProps, id, option);
	            } else {
	                option.series.data = nextProps.data;
	                this.handleChart(id, option);
	            }
	        }
	    }, {
	        key: 'bodyDataAnalysis',
	        value: function bodyDataAnalysis(nextProps, id, option) {
	            if (this.state.first) {
	                for (var i = 0; i < nextProps.behaviorData; i++) {
	                    nextProps.parameter.data.splice(-4);
	                    nextProps.parameter.data.unshift(1, 1, 10, 10);
	                };
	                this.setState({
	                    turnOverTimesNum: nextProps.behaviorData,
	                    lastBehaviorData: nextProps.behaviorData,
	                    data: nextProps.parameter.data,
	                    first: false
	                }, function () {
	                    option.series.data = this.state.data;
	                    this.handleChart(id, option);
	                });
	            } else {
	                //console.log(this.state.lastBehaviorData +":"+ nextProps.behaviorData);
	                var newData = this.state.data;
	                var turnOverTimesNum = this.state.turnOverTimesNum;
	                if (this.state.lastBehaviorData !== nextProps.behaviorData) {
	                    if (nextProps.behaviorData === 0) {
	                        newData.splice(-4);
	                        newData.unshift(1, 1, 1, 1);
	                    } else {
	                        turnOverTimesNum += nextProps.behaviorData;
	                        for (var _i = 0; _i < nextProps.behaviorData; _i++) {
	                            newData.splice(-4);
	                            newData.unshift(1, 1, 10, 10);
	                        };
	                    }
	                } else {
	                    newData.splice(-4);
	                    newData.unshift(1, 1, 1, 1);
	                }

	                this.setState({
	                    turnOverTimesNum: turnOverTimesNum,
	                    lastBehaviorData: nextProps.behaviorData,
	                    data: newData
	                }, function () {
	                    option.series.data = this.state.data;
	                    this.handleChart(id, option);
	                });
	            }
	        }
	    }, {
	        key: 'handleChart',
	        value: function handleChart(id, option) {
	            this.myChart = null;
	            this.myChart = echarts.init(document.getElementById(id));
	            this.myChart.setOption(option);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var parameter = this.props.parameter,
	                behaviorData = this.props.behaviorData ? this.props.behaviorData : 0;

	            return React.createElement(
	                'div',
	                { className: 'box-list clear' },
	                React.createElement(
	                    'div',
	                    { className: 'box-list-left fl' },
	                    React.createElement(
	                        'span',
	                        { className: parameter.name },
	                        '[',
	                        parameter.decribe,
	                        ']'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        parameter.id === "bodiesChart" ? this.state.turnOverTimesNum : behaviorData,
	                        React.createElement(
	                            'i',
	                            null,
	                            parameter.behavior
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'box-list-temp', id: parameter.id }),
	                React.createElement('div', { id: 'line', className: 'line', style: { left: '32%' } })
	            );
	        }
	    }]);

	    return ChartBox;
	}(_BaseComponentClass.BaseComponent);

	ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

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
	var Actions = exports.Actions = Reflux.createActions(['getData']);

/***/ },
/* 5 */
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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Promise = __webpack_require__(6);

	var _Promise2 = _interopRequireDefault(_Promise);

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var path = '/clife-showroom/bedroom'; // 测试环境和正式环境
	// const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-showroom/bedroom' : // 测试环境
	//     location.host === 'weixin.hetyj.com' ? '/clife-showroom/bedroom' : // 预发布环境
	//     '/clife-showroom/bedroom'; // 正式环境


	var AppData = {
					pageBtn: false, //判断是显示第几个页面
					turnOverTimesNum: 0,
					heartRate: 0,
					breathRate: 0,
					turnOverTimes: 0,
					chartHeartData: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
					chartBreathData: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
					chartBodiesData: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	},
	    deviceId = null,
	    dataFilterTimers = {}; //数据过滤计时器

	// 返回过滤后的数据
	var dataFilter = function dataFilter(data) {
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
	};

	// 设置过滤器过期时间
	var setDataTimer = function setDataTimer() {
					for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
									keys[_key] = arguments[_key];
					}

					var time = new Date().getTime() + 20e3; // 20秒内不接收新数据
					for (var i in keys) {
									dataFilterTimers[keys[i]] = time;
					}
	};

	var deepExtend = function deepExtend(out) {
					out = out || {};

					for (var i = 1; i < arguments.length; i++) {
									var obj = arguments[i];

									if (!obj) continue;

									for (var key in obj) {
													if (obj.hasOwnProperty(key)) {
																	if (_typeof(obj[key]) === 'object') out[key] = deepExtend(out[key], obj[key]);else out[key] = obj[key];
													}
									}
					}

					return out;
	};

	var Store = exports.Store = Reflux.createStore({
					listenables: [_Actions.Actions],
					onGetData: function onGetData(fn) {
									var _this = this,
									    macAddress = _fun.Funs.getUrlParam('deviceId');

									_this.trigger(AppData);

									if (!macAddress) {
													console.log('设备id不正确');
													return false;
									}

									var getLastData = function getLastData() {
													$.ajax({
																	type: "POST",
																	url: path + "/mattress/getLastData?mattressId=" + deviceId,
																	dataType: 'json',
																	success: function success(data) {
																					try {
																									var _data = JSON.parse(data);
																									console.log(_data);
																									if (_data.code === 0) {
																													//console.log(_data.data);
																													var now = new Date().getTime(),
																													    str = _data.data.dataTime.replace(/-/g, "/"),
																													    resTime = new Date(str).getTime() + 8 * 60 * 60 * 1000;
																													//判断是第几个页面
																													if (!_data.data.heartRate && !_data.data.breathRate && !_data.data.turnOverTimes) {
																																	AppData.pageBtn = false;
																																	return false;
																													} else {
																																	AppData.pageBtn = true;
																													}

																													if (now - resTime < 2 * 60 * 1000) {
																																	deepExtend(AppData, _data.data);
																																	var heartMax = 2 * _data.data.heartRate,
																																	    breathData = _data.data.breathRate,
																																	    turnOverTimes = _data.data.turnOverTimes;

																																	//心率
																																	AppData.heartRate = _data.data.heartRate;
																																	AppData.chartHeartData = [40, 40, 40, 40 + 6 * heartMax / 7, 40 - 6 * heartMax / 7, 40 - heartMax / 7, 40 - heartMax / 7, 40 + 1 * heartMax / 7, 40 - 6 * heartMax / 7, 40, 40, 40, 40, 40, 40, 40 + 6 * heartMax / 7, 40 - 6 * heartMax / 7, 40 - heartMax / 7, 40 - heartMax / 7, 40 + 1 * heartMax / 7, 40 - 6 * heartMax / 7, 40, 40, 40, 40, 40, 40, 40 + 6 * heartMax / 7, 40 - 6 * heartMax / 7, 40 - heartMax / 7, 40 - heartMax / 7, 40 + 1 * heartMax / 7, 40 - 6 * heartMax / 7, 40, 40, 40];
																																	//呼吸率
																																	AppData.breathRate = _data.data.breathRate;
																																	AppData.chartBreathData = [20, 20 + 3 * breathData / 4, 20 + breathData, 20 + 3 * breathData / 4, 20, 20 - 3 * breathData / 4, 20 - breathData, 20 - 3 * breathData / 4, 20, 20 + 3 * breathData / 4, 20 + breathData, 20 + 3 * breathData / 4, 20, 20 - 3 * breathData / 4, 20 - breathData, 20 - 3 * breathData / 4, 20, 20 + 3 * breathData / 4, 20 + breathData, 20 + 3 * breathData / 4, 20, 20 - 3 * breathData / 4, 20 - breathData, 20 - 3 * breathData / 4, 20];
																																	//翻身
																																	AppData.turnOverTimes = _data.data.turnOverTimes;
																													}
																									} else {
																													console.log(_data.msg);
																									}

																									_this.trigger(AppData);
																									if (fn) fn();
																					} catch (err) {
																									_this.trigger(AppData);
																									console.log(err);
																					}
																	},
																	error: function error(xhr, type) {
																					_this.trigger(AppData);
																					console.log('Ajax error!');
																	}
													});
									};

									if (!deviceId) {
													$.ajax({
																	type: "POST",
																	url: path + "/mac/device/get?macAddress=" + macAddress,
																	dataType: 'json',
																	success: function success(data) {
																					var _data = JSON.parse(data);
																					if (_data.code === 0) {
																									//console.log(_data.data.deviceId);
																									deviceId = _data.data.deviceId;
																									getLastData(deviceId);
																					} else {
																									_this.trigger(AppData);
																									console.log(_data.msg);
																					}
																	},
																	error: function error(xhr, type) {
																					_this.trigger(AppData);
																					console.log('Ajax error!');
																	}
													});
									} else {
													getLastData();
									}
					}
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var state = {
	  awaiting: 0,
	  resolved: 1,
	  rejected: 2
	};

	var Promise = function () {
	  function Promise(cb) {
	    _classCallCheck(this, Promise);

	    this.callbacks = [];
	    this.state = state.awaiting;
	    this.resolvedTo = null;
	    this.rejectedTo = null;
	    this.resolve = this.resolve.bind(this);
	    this.reject = this.reject.bind(this);
	    this._next = this._next.bind(this);
	    this.then = this.then.bind(this);
	    cb(this.resolve, this.reject);
	  }

	  _createClass(Promise, [{
	    key: "resolve",
	    value: function resolve(result) {
	      this.state = state.resolved;
	      this.resolvedTo = result;
	      this._next(result);
	    }
	  }, {
	    key: "reject",
	    value: function reject(err) {
	      this.state = state.rejected;
	      this.rejectedTo = err;
	      this._next(null, err);
	    }
	  }, {
	    key: "_unwrap",
	    value: function _unwrap(promise, resolve) {
	      var _this = this;

	      if (promise instanceof Promise) {
	        promise.then(function (result) {
	          _this._unwrap(result, resolve);
	        });
	        return;
	      }
	      resolve(promise);
	    }
	    //open up all callbacks that were waiting on this given promise. (.thened on it)

	  }, {
	    key: "_next",
	    value: function _next() {
	      var resolution = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	      var rejection = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	      //return a new promise...
	      while (this.callbacks.length > 0) {
	        var deferred = this.callbacks.shift();
	        if (deferred) {
	          var didResolve = deferred.didResolve;
	          var didReject = deferred.didReject;
	          var reject = deferred.reject;
	          var resolve = deferred.resolve;

	          switch (this.state) {
	            case state.resolved:
	              var promise = didResolve(resolution); //TODO: unwrap potential promise promise being returned from cb.
	              this._unwrap(promise, resolve);
	              break;
	            case state.rejected:
	              reject(didReject(rejection));
	              break;
	          }
	        }
	      }
	    }
	  }, {
	    key: "then",
	    value: function then(didResolve, didReject) {
	      var _this2 = this;

	      //only go forward with .then once we've finished up with the previous promise.
	      //the callback inside of .thens can also be async.
	      //if the returned callback has a promise.. we continue down the chain. and provide it as the resolution or rejection to the next then statement.
	      // console.log('about to handle ', didResolve, this.state, this.resolvedTo)
	      return new Promise(function (resolve, reject) {
	        if (_this2.state == state.resolved) {
	          var promise = didResolve(_this2.resolvedTo);
	          _this2._unwrap(promise, resolve);
	        } else if (_this2.state == state.rejected) {
	          // console.log('rejecting')
	          reject(didReject(_this2.rejectedTo)); //TODO: need?
	        } else {
	          //defer this wrapped promise.
	          // console.log('deferring ', didResolve)
	          var defer = {
	            didResolve: didResolve,
	            didReject: didReject,
	            resolve: resolve,
	            reject: reject
	          };
	          _this2.callbacks = [].concat(_toConsumableArray(_this2.callbacks), [defer]);
	        }
	      });
	    }
	  }]);

	  return Promise;
	}();

	exports.default = Promise;

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

/***/ }
/******/ ]);