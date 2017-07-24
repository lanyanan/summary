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
	exports.EnterInfo = exports.NewEnterAllData = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _ControlDegree = __webpack_require__(8);

	var _BedroomEnvir = __webpack_require__(9);

	var _DeviceData = __webpack_require__(12);

	var _EchartsData = __webpack_require__(11);

	var _AllData = __webpack_require__(13);

	var _DetailInfo = __webpack_require__(14);

	var _Locations = __webpack_require__(15);

	var _Routersss = __webpack_require__(16);

	var _AllNationnal = __webpack_require__(17);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {

	    console.log('------1---', data);
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	    // Actions.positions(data);
	    // Actions.echartsData(data);
	    // Actions.getOnlineData(data);
	    // // Actions.getbedroom(data);
	    //       Actions.news();
	    _Actions.Actions.gan();
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);

	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };

	        _this.listenStore(_Store.Store); // 监听Store

	        _Actions.Actions.getOnlineData();
	        _Actions.Actions.place();

	        _this.handleSwitchLight = _this.handleSwitchLight.bind(_this);
	        // this.handleLocation    = this.handleLocation.bind(this);
	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.bedClick = _this.bedClick.bind(_this);
	        _this.linkLocation = _this.linkLocation.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            console.log("wodefuck");
	        }

	        //指示灯开关

	    }, {
	        key: 'handleSwitchLight',
	        value: function handleSwitchLight(e) {

	            console.log("指示灯开关指示灯开关966666777888888");

	            // if(this.state.boxswitch==0){

	            //   this.state.boxswitch == 1;
	            // }else{
	            //   this.state.boxswitch == 0;
	            // }

	            // console.log("点击事件里获取state值",this.state);

	            var a = this.state.boxswitch ? this.state.boxswitch : "1";
	            console.log("点击事件里获取state值", a);
	            _Actions.Actions.setChange();
	        }
	    }, {
	        key: 'bedClick',
	        value: function bedClick() {
	            console.log("卧室点击");
	            // Actions.news();
	        }
	    }, {
	        key: 'linkLocation',
	        value: function linkLocation() {
	            console.log("1111111111111111");
	            _Actions.Actions.place();
	        }

	        // componentDidMount(){
	        //   Actions.news();
	        //   console.log("66666666666666666666666666666666666666666666666666666",this.state)
	        // }

	        //加载默认数据
	        // componentDidMount() {
	        //   Actions.getDefaultData();
	        // }

	    }, {
	        key: 'render',
	        value: function render() {
	            //交互
	            var ligntname = this.state.lightname = 1 ? '开' : '关';
	            var nowlight = this.state.boxswitch == 0 ? '开' : '关';
	            console.log("1111111111111111111111111111111111111111111111111111111111", nowlight);
	            var gancao = this.state.lightname;
	            console.log("12321321", this.state);
	            // let city =null;   
	            // this.state = JSON.stringify(this.state.citys);
	            // console.log("this.state:--------------------",JSON.stringify(this.state.citys));

	            // console.log("this is the state citys:",   this.state.citys);
	            // 
	            // 
	            // let city =this.state.citys? this.state.citys:'citys';
	            // console.log("===================this.state.citys=",   city);
	            // aaa ? aaa:2;
	            // aaa.a ? aaa.a :3;
	            // console.log('这是Citys的打印',this.state.citys);
	            // console.log('这是Main的打印',this.state.ddddddd);
	            // console.log('这是State的打印',JSON.stringify(this.state));
	            console.log('这是没修改的state的值', this.state);
	            // var a = this.state.alldata;
	            // var b = a.data;
	            // console.log(b);
	            // console.log("6666666666666666666666666666666666",aaa.a);
	            // var ddddddd = this.state.citys;
	            // console.log(ddddddd);
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'headBj' },
	                    React.createElement(
	                        'header',
	                        { style: { 'paddingTop': this.state.headerTop } },
	                        React.createElement(
	                            'div',
	                            { className: 'headTop' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '<'
	                            ),
	                            React.createElement(
	                                'span',
	                                { onClick: this.handleClick },
	                                '智慧盒子'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '>'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'headContent' },
	                        React.createElement(
	                            'div',
	                            { className: 'headContentL' },
	                            React.createElement(
	                                Link,
	                                { to: '/allNation' },
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '优'
	                                    ),
	                                    React.createElement('span', null)
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '睡眠环境指数'
	                                ),
	                                ' '
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '刷新时间:',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '18.26'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { onClick: this.handleSwitchLight },
	                                React.createElement(
	                                    'span',
	                                    { className: this.state.boxswitch == 0 ? 'openLight' : 'shutLight' },
	                                    '  ',
	                                    nowlight,
	                                    ' 指示灯   '
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headContentR' },
	                            React.createElement(
	                                Link,
	                                { to: '/enterposition', onClick: this.linkLocation },
	                                React.createElement('img', { src: './../static/img/position.png' }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    this.state.positionCity
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_ControlDegree.ControlDegree, { wisdomJson: this.state.wisdomJson }),
	                React.createElement('div', { className: 'Middle-layer' }),
	                React.createElement(
	                    'section',
	                    { className: 'BedroomEnvir-sec' },
	                    React.createElement(
	                        'div',
	                        { className: 'BedroomTitle' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '卧室环境'
	                        ),
	                        React.createElement(
	                            Link,
	                            { to: '/alldata', onClick: this.bedClick },
	                            ' >'
	                        ),
	                        this.props.children
	                    ),
	                    React.createElement(_EchartsData.EchartsData, { echatDDlist: this.state.echatDD, echatDLlist: this.state.echatDL })
	                ),
	                React.createElement('div', { className: 'Middle-layer' }),
	                React.createElement(_DeviceData.DeviceData, null)
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	var NewEnterAllData = exports.NewEnterAllData = React.createClass({
	    displayName: 'NewEnterAllData',

	    //后台传递过来某个用户所有数据            
	    render: function render() {

	        console.log("这是在数据列表获取的data", this.state);

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(_AllData.AllData, null)
	        )
	        //             render: function() {
	        //     var idx = this.props.colorIndex;
	        //     return (
	        //         <section className="colors flex">
	        //             {this.items.map(function(i, k){
	        //                 return <a key={k} href="#" className={(i==idx?"on":"") + " flex-cell"} onClick={this.handlerClick(i)}><b className={"c"+i}>&#8730;</b></a>
	        //             }.bind(this))}
	        //         </section>
	        //     );
	        // }
	        ;
	    }
	});

	var EnterInfo = exports.EnterInfo = React.createClass({
	    displayName: 'EnterInfo',
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(_DetailInfo.DetailInfo, null)
	        );
	    }
	});

	// export const EnterLocations = React.createClass({
	//     // for(var i=0;i<data.length;i++){
	//       // var charu += '<ul>'+<li>'+ {data.[i]} +'</li>+'</ul>';
	//         // document.getElementById('dddddd').innerHTML = charu; 
	//     // }
	//     render(){
	//       return (
	//         <div>
	//            <Locations />
	//         </div>
	//       )
	//     }
	// })

	// 开始渲染
	het.domReady(function () {
	    het.setTitle('智慧盒子');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: 'alldata', component: _AllData.AllData }),
	        React.createElement(Route, { path: 'enterinfo', component: EnterInfo }),
	        React.createElement(Route, { path: 'enterposition', component: _Locations.Locations }),
	        React.createElement(Route, { path: 'allNation', component: _AllNationnal.AllNationnal })
	    ), document.getElementById('ROOT'));
	});

	// import {ControlDegree} from './ControlDegree.es6';
	// import {BedroomEnvir} from './BedroomEnvir.es6';
	// import {DeviceData} from './DeviceData.es6';

	// import {EchartsData} from './EchartsData.es6';
	// import {AllData} from './AllData.es6';
	// import {DetailInfo} from  './DetailInfo.es6';
	// import {Locations} from './Locations.es6';
	// import {Routersss} from './Routersss.es6';

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
	    }
	};
	module.exports = Funs;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(5);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 5 */
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
/* 6 */
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
	'getOnlineData', // 获取运行数据
	'getDefaultData', //获取默认数据
	'onoffLight', //指示灯开关
	'positions', //定位
	'echartsData', //首页数据渲染   
	'getOnlineData', //获取授权 获取设备运行数据
	'getbedroom', //获取卧室数据
	'setChange', 'news', 'place', 'gan']);

/***/ },
/* 7 */
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

	var _Reflux$createStore;

	var _Actions = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(4);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var AppData = {
	  Citydata: 2
	};

	//获取授权wechatId
	// let getCookie = function(name){

	//                 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

	//                 if(arr=document.cookie.match(reg)){
	//                     return unescape(arr[2]);

	//                 }else{
	//                     // console.log("!!!!!!!!!!!!!!!!!!!",arr);
	//                     return null;
	//                 }
	// };

	var Store = exports.Store = Reflux.createStore((_Reflux$createStore = {
	  listenables: [_Actions.Actions],
	  onRepaint: function onRepaint(data) {
	    this.trigger(data);
	  }
	}, _defineProperty(_Reflux$createStore, 'onRepaint', function onRepaint() {

	  // console.log("通过onGetOnlineData方法点击过来的");
	  // console.log("123");
	  //   let me = this;
	  //   let c = null;
	  //   console.log('123');
	  //   het.get('https://api.clife.cn/v1/web/env/weather/city/getCityList','',
	  //    function(dataPos){
	  //        /*console.log(dataPos,'su----------------------------c');
	  //        // datas =dataPos;*/
	  //        console.log(dataPos);
	  //        var a  =    JSON.parse(dataPos);
	  //        console.log("aaaaaa",a);
	  //        c = a.data;

	  //   console.log('========222222222222',c);
	  //          me.trigger({citys: c});
	  //   console.log('========',c);
	  //    },function(data){
	  //        console.log(data,'fail');
	  //        het.toast('数据请求错误')
	  //        });

	}), _defineProperty(_Reflux$createStore, 'onGan', function onGan() {
	  console.log("通过onGetOnlineData方法点击过来的");
	  console.log("123");
	  var me = this;
	  var c = null;
	  console.log('123');
	  het.get('http://weixin.clife.cn/clife-wechat-test/wechat/weather/getCityList', '', function (dataPos) {
	    /*console.log(dataPos,'su----------------------------c');
	    // datas =dataPos;*/
	    console.log(dataPos);
	    var a = JSON.parse(dataPos);
	    console.log("aaaaaa", a);
	    c = a.data;

	    console.log('========222222222222', c);
	    me.trigger({ citys: c });
	    console.log('========', c);
	  }, function (data) {
	    console.log(data, 'fail');
	    het.toast('数据请求错误');
	  });

	  var a = { "name": "tom", "sex": "男", "age": "24" };

	  var b = '{"name":"Mike","sex":"女","age":"29"}';

	  var aToStr = JSON.stringify(a);

	  var bToObj = JSON.parse(b);

	  // alert(typeof(aToStr));  //string

	  // alert(typeof(bToObj));//object
	  console.log(aToStr);
	  console.log(bToObj);
	}), _defineProperty(_Reflux$createStore, 'onGetOnlineData', function onGetOnlineData() {
	  console.log("测试！！");

	  var trig = this;
	  var a = null;
	  var dd = []; //存储Echat时间
	  var dl = []; //存储Echat 等级

	  het.get('../static/js/bed.json', '', function (s) {
	    var ss = s;
	    // console.log('--------------------------',ss);

	    a = JSON.parse(ss);
	    var b = a.data;
	    // console.log(a.data);

	    //Echats时间
	    for (var i = 0; i < b.length; i++) {
	      var c = b[i].dataTime;
	      var d = c.substr(5).replace(/-/g, '/');
	      // console.log(c); 
	      dd.push(d);
	      // console.log(dd); 
	    }

	    //Echats 优良中一般差
	    for (var i = 0; i < b.length; i++) {
	      var l = b[i].level;
	      dl.push(l);
	      // console.log("Echat的等级",dl);
	    }

	    // var a= "2016-09-06"; console.log(a.substr(5).replace(/-/g,'-'))

	    trig.trigger({ echatDD: dd, echatDL: dl });
	  }, function (f) {
	    console.log("b");
	  });

	  // var ac={"name":"tom","sex":"男","age":"24"};

	  // var bc='{"name":"Mike","sex":"女","age":"29"}';

	  // var aToStr=JSON.stringify(ac);

	  // var bToObj=JSON.parse(bc);
	  //  console.log(aToStr);
	  //  console.log(bToObj);

	  // alert(typeof(aToStr));  //string

	  // alert(typeof(bToObj));//object
	}), _defineProperty(_Reflux$createStore, 'onGetbedroom', function onGetbedroom(indexing) {

	  console.log("onGetbedroom--Store", indexing);

	  var bed = this;

	  bed.trigger({ bedroom: indexing });
	}), _defineProperty(_Reflux$createStore, 'onNews', function onNews() {
	  console.log("这是城市页面！onnews");
	  var gan = this;
	  var a = null;
	  var dd = []; //存储Echat时间
	  var dl = []; //存储Echat 等级

	  het.get('../static/js/bed.json', '', function (s) {
	    var ss = s;
	    // console.log('--------------------------',ss);
	    a = JSON.parse(ss);
	    var b = a.data;

	    //Echats时间
	    for (var i = 0; i < b.length; i++) {
	      console.log(b[i]);
	      console.log(b[i].dataTime.substr(5));
	      console.log(b[i].dataTime.substr(5).replace(/-/g, '/'));
	      // var d  =b[i].dataTime.substr(5).replace(/-/g,'/');
	      var d = b[i].dataTime.substr(5);
	      console.log("cccccccccccccccccccccccccccccccccccccccccccccccccc", d);
	      b[i].dataTime = d;
	      // console.log("ddddddddddddddddddddddddddddddddddddddddd",b[i]); 
	    }
	    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", b);

	    gan.trigger({ gan: b });
	  }, function (f) {
	    console.log("b");
	  });
	}), _defineProperty(_Reflux$createStore, 'onPlace', function onPlace() {
	  console.log("Place");

	  var psi = this;

	  var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	  $.getJSON(url, function (data) {
	    // alert(data.Ip); 
	    console.log(data.Ip);
	    var dataIP = {
	      city: data.Ip
	    };
	    // console.log('123')
	    het.get('http://weixin.clife.cn/clife-wechat-test/wechat/location/get', dataIP, function (OK) {
	      var obOK = JSON.parse(OK);
	      var obData = obOK.data.city;
	      console.log(obData);
	      psi.trigger({ positionCity: obData });
	      // console.log(this.state);
	      // gan.trigger({gan:b});
	    }, function (KO) {
	      console.log(KO);
	    });
	  });
	}), _Reflux$createStore));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	        value: true
	});
	exports.ControlDegree = undefined;

	var _Actions = __webpack_require__(6);

	var ControlDegree = exports.ControlDegree = React.createClass({
	        displayName: 'ControlDegree',

	        getInitialState: function getInitialState() {
	                return {};
	        },
	        render: function render() {

	                var getwisdom = this.props.wisdomJson;
	                // console.log("gggggggggggggggggggggggggggggggggggggggggg",getwisdom);

	                // var  changeData =  JSON.stringify(getwisdom);
	                var getD = getwisdom;
	                // let changeData2 = JSON.parse(getD);
	                // var getddd = getD.data;
	                // console.log("changeData:",changeData);
	                // console.log("现获取传过来的值先----:",getD);
	                // console.log("changeData222222222:",getddd);

	                //由于第一次没值，故先判断，否则报错。
	                // var chdata= getD.data ?getD.data:'';
	                // console.log("修改获取过来的值",chdata);

	                // let OutTem = this.state.wisdomSingle.data ?this.state.wisdomSingle.data:'2';
	                var getdd = this.props.wisdomJson ? this.props.wisdomJson : '36';
	                if (getdd === '36') {
	                        console.log('未取到值');
	                } else {
	                        console.log('取到值了', getdd.recordTime);
	                        // var wd = getD.temperature;

	                        // var sd = getD.humidity;
	                        // console.log("wd+sd",wd,sd);
	                }

	                var wd = getD ? getD.temperature : '';
	                var sd = getD ? getD.humidity : '';
	                var boxSwitch = getD ? getD.boxSwitch : '';

	                console.log("这是controlDegree页面", getdd);
	                console.log("这是看开关的", boxSwitch);

	                // for(var i=0;i<getD.length;i++){
	                //     console.log(getD[i]);
	                // }

	                // console.log(getwisdom.boxSwitch);
	                // console.log(getwisdom.humidity);
	                // console.log(getwisdom.lightSensation);
	                // console.log(getwisdom.noise);
	                // console.log(getwisdom.recordTime);
	                // console.log(getwisdom.temperature);

	                // let bb = this.state.wisdomAlter;
	                // let temperature = OutTem.temperature;
	                // var wd = getD.temperature;
	                // console.log("wd",wd);
	                // var sd = getD.humidity;

	                // console.log("这里是defree页面:getdd",getdd);
	                // console.log("-contorll页面：",bb);
	                // console.log('这是controlDegree页面---this.state',this.state);
	                // console.log("这里是defree页面:temperature",temperature);

	                return React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                                'section',
	                                { className: 'ControlDegree-sec' },
	                                React.createElement(
	                                        'div',
	                                        { className: 'temperature' },
	                                        React.createElement('img', { className: 'temImg', src: './../static/img/temperature.png' }),
	                                        React.createElement(
	                                                'span',
	                                                { className: 'temtrue' },
	                                                '温度'
	                                        ),
	                                        React.createElement(
	                                                'span',
	                                                null,
	                                                wd,
	                                                React.createElement(
	                                                        'b',
	                                                        null,
	                                                        '°c'
	                                                )
	                                        ),
	                                        React.createElement('img', { className: 'arrowImg', src: './../static/img/arrow.png' })
	                                ),
	                                React.createElement(
	                                        'div',
	                                        { className: 'dampness' },
	                                        React.createElement('img', { className: 'temImg', src: './../static/img/dampness.png' }),
	                                        React.createElement(
	                                                'span',
	                                                { className: 'temtrue' },
	                                                '湿度'
	                                        ),
	                                        React.createElement(
	                                                'span',
	                                                null,
	                                                sd,
	                                                React.createElement(
	                                                        'b',
	                                                        null,
	                                                        '%'
	                                                )
	                                        ),
	                                        React.createElement('img', { className: 'arrowImg', src: './../static/img/arrow.png' })
	                                )
	                        )
	                );
	        }

	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BedroomEnvir = undefined;

	var _Actions = __webpack_require__(6);

	var _HistoryData = __webpack_require__(10);

	var _EchartsData = __webpack_require__(11);

	var BedroomEnvir = exports.BedroomEnvir = React.createClass({
	    displayName: 'BedroomEnvir',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                { className: 'BedroomEnvir-sec' },
	                React.createElement(
	                    'div',
	                    { className: 'BedroomTitle' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '卧室环境'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'History.html', id: 'test' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '>'
	                        )
	                    )
	                ),
	                React.createElement(_EchartsData.EchartsData, null)
	            )
	        );
	    }

	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BedroomEnvir = undefined;

	var _Actions = __webpack_require__(6);

	var BedroomEnvir = exports.BedroomEnvir = React.createClass({
	    displayName: 'BedroomEnvir',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                { className: 'BedroomEnvir-sec' },
	                React.createElement(
	                    'div',
	                    { className: 'BedroomTitle' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '卧室环境'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'https://www.baidu.com' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '>'
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'echarts' })
	            )
	        );
	    }

	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *智慧盒子图表
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsData = undefined;

	var _Actions = __webpack_require__(6);

	var EchartsData = exports.EchartsData = React.createClass({
	    displayName: 'EchartsData',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {

	        var ad = this.props.echatDLlist ? this.props.echatDLlist : [" ", " ", " "];
	        var aa = ["a", "b", "c"];
	        console.log('oooooooooooooooooooo', ad);

	        // var a = this.props.ectData;
	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);
	        // var b = a.code;

	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',b);

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'ul',
	                { className: 'echat' },
	                ad.map(function (kk) {
	                    return React.createElement(
	                        'li',
	                        { className: 'echat-li' },
	                        kk,
	                        ' '
	                    );
	                }.bind(this))
	            ),
	            React.createElement(
	                'div',
	                { className: 'echarts', ref: 'chart', id: 'refs' },
	                ' '
	            )
	        );
	    },

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', nextProps);
	        var dpush = nextProps.echatDDlist;
	        var lpush = nextProps.echatDLlist;
	        var kk = [];
	        console.log("dddddddd", dpush);
	        console.log("LLLLLLLL", lpush);
	        // for(var k=0;k<lpush.length;k++){
	        //   if(lpush[k] == '优' ){
	        //      lpush[k] = 1000;
	        //       console.log('gggggggggggggggggggggggggg',lpush);
	        //   }
	        // }

	        // let a = (this.props.ectData?this.props.ectData:' ');
	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);

	        // 基于准备好的dom，初始化echarts实例

	        var chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
	        // var myChart = echarts.init(document.getElementById('main'));
	        var myChart = echarts.init(chartDom);
	        // console.log("nextProps++++++++++",nextProps);
	        // console.log("nextState++++++++++",nextState);

	        // 指定图表的配置项和数据
	        var option = {

	            color: ['#fcad3d'],

	            title: {
	                text: '',
	                link: "http://www.baidu.com"
	            },
	            tooltip: {
	                trigger: 'axis'
	            },
	            // legend:{
	            //  data:['销量'],  
	            // },

	            grid: {
	                left: '0%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true,
	                backgroundColor: '#dedede',
	                borderColor: '#458B00',
	                borderWidth: 22
	            },

	            xAxis: {
	                type: 'category',
	                boundaryGap: false,
	                data: dpush
	            },
	            yAxis: {
	                type: 'category',
	                data: ["", ""]
	            },
	            series: [{
	                name: '销量',
	                type: 'line',
	                stack: '总量',
	                data: [820, 932, 901, 934,,,]
	            }]

	        };
	        // 没有取到值得时候，会显示图表数据正在努力加载 
	        // myChart.showLoading({
	        //   text: "图表数据正在努力加载..."
	        // });

	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	    }

	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DeviceData = undefined;

	var _Actions = __webpack_require__(6);

	var DeviceData = exports.DeviceData = React.createClass({
	    displayName: 'DeviceData',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                { className: 'DeviceData-sec' },
	                React.createElement(
	                    'div',
	                    { className: 'DeviceDataTitle' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '设备指数'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'DeviceInfo' },
	                    React.createElement(
	                        'div',
	                        { className: 'DeviceInfo-t' },
	                        React.createElement(
	                            'div',
	                            { className: 'air-condition' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '空调'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '26',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '°c'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'sound' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '音响'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '助眠音乐'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'DeviceInfo-b' },
	                        React.createElement(
	                            'div',
	                            { className: 'sleep' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '助眠灯'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '弱红光'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'curtain' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '窗帘'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '关闭'
	                            )
	                        )
	                    )
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
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AllData = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _DetailInfo = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var AllData = exports.AllData = function (_BaseComponent) {
	    _inherits(AllData, _BaseComponent);

	    function AllData(props) {
	        _classCallCheck(this, AllData);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AllData).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64

	        };
	        _Actions.Actions.news();

	        // this.singleClick = this.singleClick.bind(this);
	        _this.handleSingleClick = _this.handleSingleClick.bind(_this);

	        return _this;
	    }
	    //加载默认数据
	    // componentDidMount() {
	    //   // Actions.getDefaultData();   
	    //   let cao = this.state.gan;
	    //    console.log("componentDidMount:",this.state);
	    // }      

	    _createClass(AllData, [{
	        key: 'handleSingleClick',
	        value: function handleSingleClick(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            // console.log(e);
	            // console.log(e.currentTarget.getAttribute("data-in"));
	            var gancao = e.currentTarget.getAttribute('data-in');

	            // console.log(gancao);
	            _Actions.Actions.getbedroom(gancao);
	            _Actions.Actions.repaint();

	            // e.target()
	            // var sw = 0;
	            // var  flag = "0001";
	            // var json = {"boxSwitch":sw,"updateFlag":flag,"controlCode":0};
	            // var tjson = JSON.stringify(json);
	            // console.log(tjson);
	            // console.log( )
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {

	            // Actions.news();
	            var cao = this.state.gan;
	            console.log("componentWillMount:", this.state);

	            // Actions.getbedroom();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log("获取所有的卧室数据Alldata页面", this.state);
	            // var level    = this.state.kao?this.state.kao:[" "," "," "];
	            // console.log("level:::::",level);
	            // var datatime = this.state.gan?this.state.gan:[" "," "," "];
	            // console.log("level:::::",datatime);
	            // var cao = level.push(datatime);
	            // console.log(cao);
	            var getdata1 = this.state.gan ? this.state.gan : [" ", " ", " "];
	            var getdata = getdata1.reverse();
	            console.log(getdata);
	            // console.log(getdata);

	            // datatime.map(function(k){
	            //                 return (
	            //                 <li> <i></i><p><span>{i}</span> <span className="dataInfoTime">{k}<b>&gt;</b></span></p>   </li>
	            //                 )
	            //              }.bind(this))
	            //              
	            //                    // <li> <i></i><p><span>优</span> <span className="dataInfoTime">08-15<b>&gt;</b></span></p>   </li>
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'AllData-sec' },
	                    React.createElement(
	                        'div',
	                        { className: 'AllDataTitle' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '<'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '所有已记录的数据'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '>'
	                        )
	                    ),
	                    React.createElement('div', { className: 'Middle-layer' }),
	                    React.createElement(
	                        'div',
	                        { className: 'dataInfo' },
	                        React.createElement(
	                            'ul',
	                            null,
	                            getdata.map(function (i, k) {
	                                return React.createElement(
	                                    'li',
	                                    { onClick: this.handleSingleClick, 'data-in': k },
	                                    ' ',
	                                    React.createElement(
	                                        Link,
	                                        { to: '/enterinfo' },
	                                        '  ',
	                                        React.createElement('i', null),
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            React.createElement(
	                                                'span',
	                                                null,
	                                                i.level
	                                            ),
	                                            ' ',
	                                            React.createElement(
	                                                'span',
	                                                { className: 'dataInfoTime' },
	                                                i.dataTime,
	                                                ' ',
	                                                React.createElement(
	                                                    'b',
	                                                    null,
	                                                    '>'
	                                                ),
	                                                ' '
	                                            )
	                                        ),
	                                        ' '
	                                    )
	                                );
	                            }.bind(this))
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {
	            // console.log("componentDidMount的值",this.state);
	        }
	    }]);

	    return AllData;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	    het.setTitle('智慧盒子');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    // ReactDOM.render((
	    //     <Router history={hashHistory}>
	    //         // <Route path="/" component={Appcity} />

	    //     </Router>
	    // ), document.getElementById('ROOT'));
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DetailInfo = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var DetailInfo = exports.DetailInfo = function (_BaseComponent) {
	    _inherits(DetailInfo, _BaseComponent);

	    function DetailInfo(props) {
	        _classCallCheck(this, DetailInfo);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DetailInfo).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64

	        };
	        // Actions.getbedroom();
	        // Actions.news();

	        // this.singleClick = this.singleClick.bind(this);
	        // this.handleSingleClick = this.handleSingleClick.bind(this);

	        return _this;
	    }
	    //加载默认数据


	    _createClass(DetailInfo, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            // Actions.getDefaultData(); 
	            // Actions.getbedroom(); 
	            _Actions.Actions.news();
	            console.log("componentWillMount");
	        }
	        // componentDidMount() {
	        //   // Actions.getDefaultData(); 
	        //    // Actions.getbedroom(); 
	        //    // Actions.news(); 
	        //    console.log("这个是componentDidMount");
	        // }

	    }, {
	        key: 'render',
	        value: function render() {

	            var setdata = [];
	            var shijian = null,
	                level = null,
	                wendu = null,
	                shidu = null,
	                source = null;
	            console.log("获取所有的卧室数据“---------详细数据页面---------------”", this.state);
	            var getInfo = this.state.bedroom ? this.state.bedroom : "gan";
	            console.log("这个是点击后获取的索引值", getInfo);
	            // // console.log(this.state.)
	            // var gandata = this.state.gan?this.state.gan:["",""];
	            // var gandata = this.state.gan;
	            var getdata1 = this.state.gan ? this.state.gan : [" ", " ", " "];
	            var getdata = getdata1.reverse();
	            console.log("这个是全部的数据", getdata);
	            for (var i = 0; i < getdata.length; i++) {
	                // console.log(i);
	                //   console.log("点击的索引值",getInfo);
	                if (getInfo == i) {
	                    console.log("2");
	                    // let zz = JSON.stringify(gandata[i]);
	                    // console.log(zz);
	                    // let yy = zz[1];
	                    var zz = getdata[i];
	                    console.log(zz);
	                    shijian = zz.dataTime;
	                    level = zz.level;
	                    wendu = zz.temperature;
	                    shidu = zz.humidity;
	                    source = zz.dataSource;
	                    console.log(shijian);
	                    // for(var k=0;k<zz.length;k++){
	                    //   console.log(zz[0]);
	                    // }

	                    // console.log("setdata的数据数据数据数据数据",yy);
	                }
	            }

	            // console.log(  setdata);
	            // let shijian = setdata;
	            console.log("时间", shijian);
	            // let shijian2 = shijian[0];
	            // console.log(shijian2);

	            // let shijian3 = JSON.parse(shijian2);
	            // let shijian4 = shijian3.dataTime;
	            // console.log("时间的时间",shijian4);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'DetailInfo-sec' },
	                    React.createElement(
	                        'div',
	                        { className: 'AllDataTitle  DetailInfoTitle' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '<'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '详细信息'
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '>'
	                        )
	                    ),
	                    React.createElement('div', { className: 'Middle-layer' }),
	                    React.createElement(
	                        'div',
	                        { className: 'detailInfoData' },
	                        React.createElement(
	                            'ul',
	                            null,
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '环境等级'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'detailInfo-r' },
	                                    level
	                                )
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '记录日期'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'detailInfo-r' },
	                                    shijian
	                                )
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '数据来源'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'detailInfo-r' },
	                                    source
	                                )
	                            ),
	                            React.createElement('div', { className: 'Middle-layer' }),
	                            React.createElement(
	                                'li',
	                                null,
	                                '指数详情'
	                            ),
	                            React.createElement(
	                                'li',
	                                { className: 'detailInfo-b' },
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '温度 '
	                                    ),
	                                    ' ',
	                                    React.createElement(
	                                        'span',
	                                        { className: 'detailInfo-r' },
	                                        wendu
	                                    )
	                                ),
	                                React.createElement('b', null),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '湿度 '
	                                    ),
	                                    ' ',
	                                    React.createElement(
	                                        'span',
	                                        { className: 'detailInfo-r' },
	                                        shidu
	                                    ),
	                                    ' '
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return DetailInfo;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	    het.setTitle('智慧盒子');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    // ReactDOM.render((
	    //     <Router history={hashHistory}>
	    //         // <Route path="/" component={Appcity} />

	    //     </Router>
	    // ), document.getElementById('ROOT'));
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Locations = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var Locations = exports.Locations = function (_BaseComponent) {
	  _inherits(Locations, _BaseComponent);

	  function Locations(props) {
	    _classCallCheck(this, Locations);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Locations).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      headerTop: isAndroid ? 73 : 64
	    };

	    // Actions.place();
	    _Actions.Actions.gan();

	    return _this;
	  }
	  //加载默认数据


	  _createClass(Locations, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Actions.getDefaultData();   
	    }
	  }, {
	    key: 'positionClick',
	    value: function positionClick() {
	      _Actions.Actions.place();
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var sss = this.state;
	      console.log(sss);

	      //交互       
	      var citys = this.state.citys ? this.state.citys : '';
	      //经常选择的城市
	      var citysList = [];
	      //a-z的遍历
	      var allCitys = [];
	      var str = void 0;
	      var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'];
	      var ff = [];
	      var cityA = [],
	          cityB = [],
	          cityC = [],
	          cityD = [],
	          cityE = [],
	          cityF = [],
	          cityG = [],
	          cityH = [],
	          cityJ = [],
	          cityK = [],
	          cityL = [],
	          cityM = [],
	          cityN = [],
	          cityP = [],
	          cityQ = [],
	          cityR = [],
	          cityS = [],
	          cityT = [],
	          cityW = [],
	          cityX = [],
	          cityY = [],
	          cityZ = [];
	      if (citys) {
	        //经常选择的城市
	        citysList = citys.hostCityList;
	        console.log("######################", citys);
	        // 所有城市
	        // allCitys = citys;
	        cityA = citys.a;
	        cityB = citys.b;
	        cityC = citys.c;
	        cityD = citys.d;
	        cityE = citys.e, cityF = citys.f, cityG = citys.g, cityH = citys.h, cityJ = citys.j, cityK = citys.k, cityL = citys.l, cityM = citys.m, cityN = citys.n, cityP = citys.p, cityQ = citys.q, cityR = citys.r, cityS = citys.s, cityT = citys.t, cityW = citys.w, cityX = citys.x, cityY = citys.y, cityZ = citys.z;

	        for (var i = 0; i < arr.length; i++) {
	          var index = arr[i];
	          // console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee",index);
	          // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',citys[index]);
	          ff.push(citys[index]);
	        }
	      }

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'section',
	          { className: 'locations-sec' },
	          React.createElement(
	            'div',
	            { className: 'RightSide' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#Jing' },
	                  '#'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#Xing' },
	                  '☆'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#AA' },
	                  'A'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#BB' },
	                  'B'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#CC' },
	                  'C'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#DD' },
	                  'D'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#EE' },
	                  'E'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#FF' },
	                  'F'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#GG' },
	                  'G'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#HH' },
	                  'H'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#JJ' },
	                  'J'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#KK' },
	                  'K'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#LL' },
	                  'L'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#MM' },
	                  'M'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#NN' },
	                  'N'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#PP' },
	                  'P'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#QQ' },
	                  'Q'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#RR' },
	                  'R'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#SS' },
	                  'S'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#TT' },
	                  'T'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#WW' },
	                  'W'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#XX' },
	                  'X'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#YY' },
	                  'Y'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#ZZ' },
	                  'Z'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'Locations-top' },
	            React.createElement(
	              'span',
	              null,
	              '<'
	            ),
	            React.createElement(
	              'span',
	              null,
	              '选择城市'
	            ),
	            React.createElement(
	              'span',
	              null,
	              '>'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'allCitys-title' },
	            '你当前的位置可能是'
	          ),
	          React.createElement(
	            'div',
	            { className: 'Current-loc  allCitys-often-nvg' },
	            React.createElement(
	              'span',
	              { className: 'Current-loc-left' },
	              ' ',
	              this.state.positionCity,
	              '   '
	            ),
	            React.createElement(
	              'span',
	              { className: 'Current-loc-right', onClick: this.positionClick },
	              '定位'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'AlsoSelect' },
	            React.createElement(
	              'p',
	              { className: 'allCitys-title' },
	              '经常选择的城市'
	            ),
	            React.createElement(
	              'span',
	              null,
	              '得到经常选择的城市，然后遍历出来'
	            ),
	            React.createElement(
	              'ul',
	              null,

	              //方法1
	              citysList.map(function (dd) {
	                var ddd = dd.cityName;
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg' },
	                  ddd
	                );
	              }.bind(this))
	              //方法2
	              //    citysList.map((i,k)=>{
	              //     let dd = i.cityName;
	              //     // console.log("dd",dd);
	              //      return  <li>{dd}</li>;
	              // })

	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'allCitys' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'Jing' },
	                React.createElement(
	                  'p',
	                  null,
	                  'A'
	                )
	              ),


	              // ff.map((item,k)=>{
	              //   // console.log(item);
	              //     // return <li>{jj.cityName}</li>
	              //   item.map((jj,kk)=>{---->   ff[k].map --> ff[k] = item
	              //     console.log(jj.cityName);
	              //     var po = jj.cityName
	              //        return <li>{po}</li>
	              //   })
	              // })
	              cityA.map(function (i, k) {
	                // var  = i.cityName;    
	                // console.log(i);
	                return React.createElement(
	                  'li',
	                  null,
	                  React.createElement(
	                    'a',
	                    null,
	                    ' ',
	                    i.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'BB' },
	                React.createElement(
	                  'p',
	                  null,
	                  'B'
	                )
	              ),
	              cityB.map(function (b) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    b.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'CC' },
	                React.createElement(
	                  'p',
	                  null,
	                  'C'
	                )
	              ),
	              cityC.map(function (v, i) {
	                return React.createElement(
	                  'li',
	                  null,
	                  React.createElement(
	                    'a',
	                    null,
	                    v.cityName,
	                    ' '
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'DD' },
	                React.createElement(
	                  'p',
	                  null,
	                  'D'
	                )
	              ),
	              cityD.map(function (d) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    d.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'EE' },
	                React.createElement(
	                  'p',
	                  null,
	                  'E'
	                )
	              ),
	              cityE.map(function (e) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    e.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'FF' },
	                React.createElement(
	                  'p',
	                  null,
	                  'F'
	                )
	              ),
	              cityF.map(function (f) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    f.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'GG' },
	                React.createElement(
	                  'p',
	                  null,
	                  'G'
	                )
	              ),
	              cityG.map(function (g) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    g.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'HH' },
	                React.createElement(
	                  'p',
	                  null,
	                  'H'
	                )
	              ),
	              cityH.map(function (h) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    h.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'JJ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'J'
	                )
	              ),
	              cityJ.map(function (j) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    j.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'KK' },
	                React.createElement(
	                  'p',
	                  null,
	                  'K'
	                )
	              ),
	              cityK.map(function (k) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    k.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'LL' },
	                React.createElement(
	                  'p',
	                  null,
	                  'L'
	                )
	              ),
	              cityL.map(function (l) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    l.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'MM' },
	                React.createElement(
	                  'p',
	                  null,
	                  'M'
	                )
	              ),
	              cityM.map(function (m) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    m.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'NN' },
	                React.createElement(
	                  'p',
	                  null,
	                  'N'
	                )
	              ),
	              cityN.map(function (n) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    n.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'PP' },
	                React.createElement(
	                  'p',
	                  null,
	                  'P'
	                )
	              ),
	              cityP.map(function (p) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    p.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'QQ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Q'
	                )
	              ),
	              cityQ.map(function (q) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    q.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'RR' },
	                React.createElement(
	                  'p',
	                  null,
	                  'R'
	                )
	              ),
	              cityR.map(function (r) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    r.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'SS' },
	                React.createElement(
	                  'p',
	                  null,
	                  'S'
	                )
	              ),
	              cityS.map(function (s) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    s.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'TT' },
	                React.createElement(
	                  'p',
	                  null,
	                  'T'
	                )
	              ),
	              cityT.map(function (t) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    t.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'WW' },
	                React.createElement(
	                  'p',
	                  null,
	                  'W'
	                )
	              ),
	              cityW.map(function (w) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    w.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'SS' },
	                React.createElement(
	                  'p',
	                  null,
	                  'S'
	                )
	              ),
	              cityS.map(function (s) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    s.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'YY' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Y'
	                )
	              ),
	              cityY.map(function (y) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    y.cityName
	                  ),
	                  ' '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'ZZ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Z'
	                )
	              ),
	              cityZ.map(function (z) {
	                return React.createElement(
	                  'li',
	                  null,
	                  ' ',
	                  React.createElement(
	                    'a',
	                    null,
	                    z.cityName
	                  ),
	                  ' '
	                );
	              })
	            )
	          )
	        )
	      );
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      // console.log("componentDidMount的值",this.state);
	    }
	  }]);

	  return Locations;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	  het.setTitle('智慧盒子');
	  // 无路由方式
	  // ReactDOM.render(<App />, document.getElementById('ROOT'));

	  // 路由方式
	  // ReactDOM.render((
	  //     <Router history={hashHistory}>
	  //         // <Route path="/" component={Appcity} />

	  //     </Router>
	  // ), document.getElementById('ROOT'));
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *全国智慧盒子图表
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Route = undefined;

	var _Actions = __webpack_require__(6);

	var Route = exports.Route = React.createClass({
	    displayName: 'Route',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {

	        var ad = this.props.echatDLlist ? this.props.echatDLlist : [" ", " ", " "];
	        var aa = ["a", "b", "c"];
	        console.log('oooooooooooooooooooo', ad);

	        // var a = this.props.ectData;
	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);
	        // var b = a.code;

	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',b);

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'ul',
	                { className: 'echat' },
	                ad.map(function (kk) {
	                    return React.createElement(
	                        'li',
	                        { className: 'echat-li' },
	                        kk,
	                        ' '
	                    );
	                }.bind(this))
	            ),
	            React.createElement(
	                'div',
	                { className: 'echarts', ref: 'chart', id: 'refs' },
	                ' '
	            )
	        );
	    },

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn', nextProps);
	        var dpush = nextProps.echatDDlist;
	        var lpush = nextProps.echatDLlist;
	        var kk = [];
	        console.log("dddddddd", dpush);
	        console.log("LLLLLLLL", lpush);
	        // for(var k=0;k<lpush.length;k++){
	        //   if(lpush[k] == '优' ){
	        //      lpush[k] = 1000;
	        //       console.log('gggggggggggggggggggggggggg',lpush);
	        //   }
	        // }

	        // let a = (this.props.ectData?this.props.ectData:' ');
	        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);

	        // 基于准备好的dom，初始化echarts实例

	        var chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
	        // var myChart = echarts.init(document.getElementById('main'));
	        var myChart = echarts.init(chartDom);
	        // console.log("nextProps++++++++++",nextProps);
	        // console.log("nextState++++++++++",nextState);

	        // 指定图表的配置项和数据
	        var option = {

	            color: ['#fcad3d'],

	            title: {
	                text: '',
	                link: "http://www.baidu.com"
	            },
	            tooltip: {
	                trigger: 'axis'
	            },
	            // legend:{
	            //  data:['销量'],  
	            // },

	            grid: {
	                left: '0%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true,
	                backgroundColor: '#dedede',
	                borderColor: '#458B00',
	                borderWidth: 22
	            },

	            xAxis: {
	                type: 'category',
	                boundaryGap: false,
	                data: dpush
	            },
	            yAxis: {
	                type: ''
	            },
	            series: [{
	                name: '销量',
	                type: 'line',
	                stack: '总量',
	                data: [820, 932, 901, 934,,,]
	            }]

	        };
	        // 没有取到值得时候，会显示图表数据正在努力加载 
	        // myChart.showLoading({
	        //   text: "图表数据正在努力加载..."
	        // });

	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	    }

	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AllNationnal = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _NationalEchartsData = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var AllNationnal = exports.AllNationnal = function (_BaseComponent) {
	    _inherits(AllNationnal, _BaseComponent);

	    function AllNationnal(props) {
	        _classCallCheck(this, AllNationnal);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AllNationnal).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64

	        };
	        // Actions.getbedroom();
	        // Actions.news();

	        // this.singleClick = this.singleClick.bind(this);
	        // this.handleSingleClick = this.handleSingleClick.bind(this);

	        return _this;
	    }
	    //加载默认数据


	    _createClass(AllNationnal, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            // Actions.getDefaultData(); 
	            // Actions.getbedroom(); 
	            _Actions.Actions.news();
	            console.log("componentWillMount");
	        }
	        // componentDidMount() {
	        //   // Actions.getDefaultData(); 
	        //    // Actions.getbedroom(); 
	        //    // Actions.news(); 
	        //    console.log("这个是componentDidMount");
	        // }

	    }, {
	        key: 'render',
	        value: function render() {

	            var getTime = new Date();
	            var nowYear = getTime.getFullYear();
	            var nowMonth = getTime.getMonth() + 1;
	            var nowDate = getTime.getDate();
	            var nowTime = nowYear + '-' + nowMonth + '-' + nowDate;
	            var time = getTime.toLocaleString();
	            var ddtime = getTime.toLocaleTimeString();
	            console.log(nowYear);
	            console.log(nowMonth);

	            console.log(nowDate);
	            console.log(nowTime);
	            console.log(ddtime);

	            var nowHour = getTime.getHours();
	            var nowMin = getTime.getMinutes();
	            if (nowHour < 10) {
	                nowHour = '0' + nowHour;
	            }
	            var freshen = nowHour + '-' + nowMin;
	            console.log(freshen);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'headBj' },
	                    React.createElement(
	                        'header',
	                        { style: { 'paddingTop': this.state.headerTop } },
	                        React.createElement(
	                            'div',
	                            { className: 'headTop' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '<'
	                            ),
	                            React.createElement(
	                                'span',
	                                { onClick: this.handleClick },
	                                '睡眠环境指数'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '>'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'headContent' },
	                        React.createElement(
	                            'div',
	                            { className: 'headContentL' },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '优'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '刷新时间:',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    freshen
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headContentR' },
	                            React.createElement('img', { src: './../static/img/position.png' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                '深圳'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headTip' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '睡眠环境拖累了全国指数,快去改善吧!'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_NationalEchartsData.NationalEchartsData, null),
	                React.createElement(
	                    'div',
	                    { className: 'Nationnal-info' },
	                    React.createElement(
	                        'h6',
	                        null,
	                        '智慧盒子小提示'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '光亮:'
	                        ),
	                        '人在睡眠时,光亮会造成眼皮刺激是神经,而且一直松果体分泌褪黑素,故睡眠时寝室光线宜暗不宜亮。"静"和"暗"是睡眠的两大要素 '
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '枕头:'
	                        ),
	                        '不宜太高也不宜太低。以自己的拳头高为宜，硬度适中;其长度和肩宽相等,头凉足热是最舒畅的睡眠方法'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '当前时间： ',
	                        nowTime
	                    )
	                )
	            );
	        }
	    }]);

	    return AllNationnal;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	    het.setTitle('智慧盒子');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    // ReactDOM.render((
	    //     <Router history={hashHistory}>
	    //         // <Route path="/" component={Appcity} />

	    //     </Router>
	    // ), document.getElementById('ROOT'));
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *智慧盒子图表
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NationalEchartsData = undefined;

	var _Actions = __webpack_require__(6);

	het.ready(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.getOnlineData(data);
	});

	var NationalEchartsData = exports.NationalEchartsData = React.createClass({
	    displayName: 'NationalEchartsData',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            'section',
	            { className: 'nationGan' },
	            React.createElement(
	                'div',
	                { className: 'echarts', ref: 'chart', id: 'mainChart' },
	                ' '
	            ),
	            React.createElement(
	                'div',
	                { className: 'sleepTip' },
	                React.createElement(
	                    'p',
	                    null,
	                    '睡眠环境对比图'
	                )
	            )
	        );
	    },

	    componentDidMount: function componentDidMount(nextProps, nextState) {
	        // 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(document.getElementById('mainChart'));
	        // console.log("nextProps++++++++++",nextProps);
	        // console.log("nextState++++++++++",nextState);

	        // 指定图表的配置项和数据
	        var option = {

	            color: ['#fcad3d'],

	            title: {
	                text: '',
	                link: "http://www.baidu.com"
	            },
	            tooltip: {
	                trigger: 'axis'
	            },

	            grid: {
	                left: '-7%',
	                bottom: '3%',
	                containLabel: true,
	                backgroundColor: '#dedede',
	                borderColor: '#458B00',
	                borderWidth: 22
	            },

	            xAxis: {
	                type: 'category',

	                data: ['08/15', '08/16', '08/17', '08/18', '08/19', '08/20', '08/21']

	            },
	            yAxis: {

	                type: 'category',
	                // boundaryGap: true,
	                // axisLine:{   //y轴竖线
	                //   show:false
	                // },
	                axisTick: { // y轴一横一横的
	                    show: true
	                },
	                data: ["a", "b", "c", "d", "e", "f"]
	            },
	            series: [{
	                name: '销量',
	                type: 'line',
	                stack: '总量',
	                data: [820, 932, 901, 934, 1290, 1330, 1320]
	            }]

	        };
	        // 没有取到值得时候，会显示图表数据正在努力加载 
	        // myChart.showLoading({
	        //   text: "图表数据正在努力加载..."
	        // });

	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	    }

	});

/***/ }
/******/ ]);