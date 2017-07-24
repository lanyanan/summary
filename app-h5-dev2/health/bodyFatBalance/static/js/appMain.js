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

	var _LoadMainData = __webpack_require__(8);

	var _LoadMainData2 = _interopRequireDefault(_LoadMainData);

	var _PromptMeasure = __webpack_require__(10);

	var _PromptMeasure2 = _interopRequireDefault(_PromptMeasure);

	var _MeasureMesList = __webpack_require__(9);

	var _MeasureMesList2 = _interopRequireDefault(_MeasureMesList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch() {
	            console.log(JSON.stringify(this.state));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //Actions.getData();
	            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            window.addEventListener('resize', function () {
	                document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            }, false);
	            //let dataJson = {
	            //    "data": {
	            //        "pager": {
	            //            "totalRows": 0,
	            //            "pageRows": 20,
	            //            "pageIndex": 1,
	            //            "paged": false,
	            //            "pageEndRow": 19,
	            //            "totalPages": 0,
	            //            "hasNextPage": false,
	            //            "hasPrevPage": false,
	            //            "pageStartRow": 0,
	            //            "currPageRows": 0,
	            //            "defaultPageRows": 20
	            //        },
	            //        "list": [
	            //            {
	            //                "dataId": "1",//数据唯一标识
	            //                "dataTime": "2016-06-15 10:20:14", //测量时间
	            //                "weight": "46.4",  // 体重（公斤）
	            //                "fatRate": "10.4",  // 脂肪率
	            //                "boneWeight": "16.3",  // 骨量
	            //                "meatRate": "6.4",  // 肌肉比例
	            //                "metabolismRate": "3.4",  // 基础代谢率
	            //                "moistureRate": "5.6"//水分比例
	            //            },
	            //            {
	            //                "dataTime": "2016-06-06 12:22:09", //测量时间
	            //                "weight": "46.4",  // 体重（公斤）
	            //                "fatRate": "10.4",  // 脂肪率
	            //                "boneWeight": "16.3",  // 骨量
	            //                "meatRate": "6.4",  // 肌肉比例
	            //                "metabolismRate": "3.4",  // 基础代谢率
	            //                "moistureRate": "5.6"  //水分比例
	            //            },
	            //            {
	            //                "dataTime": "2016-06-11 15:10:23", //测量时间
	            //                "weight": "46.4",  // 体重（公斤）
	            //                "fatRate": "10.4",  // 脂肪率
	            //                "boneWeight": "16.3",  // 骨量
	            //                "meatRate": "6.4",  // 肌肉比例
	            //                "metabolismRate": "3.4",  // 基础代谢率
	            //                "moistureRate": "5.6"//水分比例
	            //            },
	            //            {
	            //                "dataTime": "2016-06-15 15:22:44", //测量时间
	            //                "weight": "46.4",  // 体重（公斤）
	            //                "fatRate": "10.4",  // 脂肪率
	            //                "boneWeight": "16.3",  // 骨量
	            //                "meatRate": "6.4",  // 肌肉比例
	            //                "metabolismRate": "3.4",  // 基础代谢率
	            //                "moistureRate": "5.6"//水分比例
	            //            }
	            //        ]
	            //    },
	            //    "code": 0
	            //}
	            //function groupData(data) {
	            //    var newData = {};
	            //    var arrData = [];
	            //    // 分组
	            //    data = data.data.list;
	            //    for (var i in data) {
	            //        var key = data[i].dataTime.replace(/\s.+$/, '');
	            //        if (!newData[key]) {
	            //            newData[key] = [];
	            //        }
	            //        newData[key].push(data[i]);
	            //    }
	            //    // 排序
	            //    for (var j in newData) {
	            //        newData[j].sort(function (a, b) {
	            //            return a.dataTime > b.dataTime;
	            //        });
	            //        arrData.push(newData[j]);
	            //    }
	            //    arrData.sort(function (a, b) {
	            //        return a[0].dataTime < b[0].dataTime;
	            //    });
	            //    return arrData;
	            //}
	            ////console.log(groupData(dataJson));
	            //function sucCallback(data) {
	            //    let user_str = '',
	            //        len = data.length,
	            //        str_ul = '',
	            //        str = '',
	            //        weight = data[0][0].weight,
	            //        fatRate = data[0][0].fatRate,
	            //        boneWeight = data[0][0].boneWeight;
	            //    user_str += '<li><img class="user-port" src="./../static/img/user-mes.png"/></li>' +
	            //        ' <li><span>体重</span><span class="bigger-date">' + weight + 'kg</span></li>' +
	            //        '<li><span>脂肪率</span><span class="bigger-date">' + fatRate + '%</span></li>' +
	            //        '<li><span>BMI</span><span class="bigger-date">' + boneWeight + '</span></li>';
	            //
	            //    for (var i = 0; i < len; i++) {
	            //        let len_j = data[i].length,
	            //            dataTime_d = data[i][0].dataTime.split(' ')[0].substring(5).replace('-', '月');
	            //        str_ul = '';
	            //        for (var j = 0; j < len_j; j++) {
	            //            let dataTime_h = data[i][j].dataTime.split(' ')[1].substring(3),
	            //                weight = data[i][j].weight,
	            //                fatRate = data[i][j].fatRate,
	            //                data_Id = data[i][j].dataId;
	            //
	            //            str_ul +=
	            //                '<li class="c-info-li" data_id="' + data_Id + '" weight=' + data[i][j].weight + '   fatRate= ' + data[i][j].fatRate + ' waterPrc =' + data[i][j].metabolismRate + ' musclePrc=' + data[i][j].meatRate + '  dateMetal=' + data[i][j].metabolismRate + ' >' +
	            //                '<div class="c-date-l">' +
	            //                '<span class="c-date-l-span-l">' +
	            //                '<img class="c-date-l-span-l-pic" src="./../static/img/cricle-left.png"/>' + dataTime_h + '</span><span>weight:' + weight + '</span><span>fat%:' + fatRate + '</span>' +
	            //                '<a title="del" class="c-date-r"><img class="c-date-r-pic" src="./../static/img/delete-pic.png"/></a>' +
	            //                '</div>' +
	            //                '</li>';
	            //        }
	            //        str += '<span class="c-client-date">' + dataTime_d + '日</span>'
	            //            + '<ul class="c-info-ul">'
	            //            + str_ul +
	            //            '</ul>';
	            //    }
	            //    document.getElementById('client-information').innerHTML = '';
	            //    document.getElementsByClassName('user-message-ul')[0].innerHTML = '';
	            //
	            //    document.getElementById('client-information').innerHTML = str;
	            //    document.getElementsByClassName('user-message-ul')[0].innerHTML = user_str;
	            //}
	            //sucCallback(groupData(dataJson));
	            //function GetSlideAngle(dx, dy) {
	            //    return Math.atan2(dy, dx) * 180 / Math.PI;
	            //}
	            ////根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
	            //function GetSlideDirection(startX, startY, endX, endY) {
	            //    var dy = startY - endY;
	            //    var dx = endX - startX;
	            //    var result = 0;
	            //
	            //    //如果滑动距离太短
	            //    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	            //        return result;
	            //    }
	            //
	            //    var angle = GetSlideAngle(dx, dy);
	            //    if (angle >= -45 && angle < 45) {
	            //        result = 4;
	            //    } else if (angle >= 45 && angle < 135) {
	            //        result = 1;
	            //    } else if (angle >= -135 && angle < -45) {
	            //        result = 2;
	            //    }
	            //    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	            //        result = 3;
	            //    }
	            //
	            //    return result;
	            //}
	            ////滑动处理
	            //let startX, startY;
	            //$('.c-info-li').on('touchstart', function (ev) {
	            //    startX = ev.touches[0].pageX;
	            //    startY = ev.touches[0].pageY;
	            //}, false);
	            //$('.c-info-li').on('touchend', function (ev) {
	            //    let endX, endY, data = {};
	            //    data.weight = ev.currentTarget.getAttribute('weight'),
	            //    data.fatRate = ev.currentTarget.getAttribute('fatRate'),
	            //    data.waterPrc = ev.currentTarget.getAttribute('waterPrc'),
	            //    data.musclePrc = ev.currentTarget.getAttribute('musclePrc'),
	            //    data.dateMetal = ev.currentTarget.getAttribute('dateMetal');
	            //    endX = ev.changedTouches[0].pageX;
	            //    endY = ev.changedTouches[0].pageY;
	            //    var direction = GetSlideDirection(startX, startY, endX, endY);
	            //    switch (direction) {
	            //        case 0:
	            //            //console.log("没滑动", data);
	            //            het.send(data, function () {
	            //                console.log('send suc');
	            //            }, function () {
	            //                console.log('send fail');
	            //            });
	            //            break;
	            //        case 1:
	            //            //console.log("向上");
	            //
	            //            break;
	            //        case 2:
	            //            //console.log("向下")
	            //
	            //            break;
	            //        case 3:
	            //            //console.log("向左");
	            //            $(this).addClass('selected').parent().siblings().find(".c-info-li").removeClass('selected');
	            //            break;
	            //        case 4:
	            //            //console.log("向右");
	            //            $(this).removeClass('selected').siblings().find(".c-info-li").removeClass('selected');
	            //            break;
	            //        default:
	            //    }
	            //
	            //    if(ev.currentTarget.getAttribute('title')=='del'){
	            //        if ($(this).parent().parent().parent().find('ul li').length == 1) {
	            //            //信息框
	            //            layer.open({
	            //                title: 'ps:温馨提示',
	            //                content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
	            //                btn: ['我知道了']
	            //            });
	            //            $('.c-info-li').removeClass('selected');
	            //        } else {
	            //            //回传删除数据
	            //            let dataId_ = $(this).parent().parent().attr('data_id');
	            //            Actions.postData(dataId_);
	            //            $(this).parent().parent().remove();
	            //        }
	            //    }
	            //}, false);
	            //$('.c-date-r').on('touchend', function(e){
	            //        e.preventDefault();
	            //        e.stopPropagation();
	            //});
	            //$('.c-date-r').on('touchstart', function (e) {
	            //    e.preventDefault();
	            //    e.stopPropagation();
	            //    if ($(this).parent().parent().parent().find('ul li').length == 1) {
	            //        //信息框
	            //        layer.open({
	            //            title: 'ps:温馨提示',
	            //            content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
	            //            btn: ['我知道了']
	            //        });
	            //        $('.c-info-li').removeClass('selected');
	            //    } else {
	            //        //回传删除数据
	            //        let dataId_ = $(this).parent().parent().attr('data_id');
	            //        Actions.postData(dataId_);
	            //        $(this).parent().parent().remove();
	            //    }
	            //});
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log(this.state, this.state.img, this.state.nickname);
	            return React.createElement(
	                'div',
	                { id: 'confirmData' },
	                this.state.data ? React.createElement(_LoadMainData2.default, { mydata: this.state.data, myuserMes: this.state.img, myname: this.state.nickname }) : React.createElement(_PromptMeasure2.default, { userdata: this.state.img, myname: this.state.nickname })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('体脂秤');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('R  OOT'));

	    // 路由方式0
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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染'
	'ready', 'readyData', 'getData', 'postHisData', 'readyHisData', 'getHisData', 'getNoData', 'sendDate', 'postDate', 'getCalendarData', // 获取日历数据
	//App
	'getAppHisData', 'selectedDate' // 选择日期
	]);

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

	var _BaseComponentClass = __webpack_require__(2);

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var options = {};
	var data = [];
	// 格式化日期为 yyyy-MM-dd的形式
	function ymd(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).replace(/(?=\b\d\b)/g, '0');
	}
	// 格式化日期为 yyyy-MM的形式
	function ym(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1)).replace(/(?=\b\d\b)/g, '0');
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onReady: function onReady(data) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatDataList';
	        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken
	        options.appId = data.appId ? data.appId : options.appId;
	        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
	        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
	        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
	        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
	        options.img = data.img;
	        options.nickname = data.nickname;
	        //data.timestamp = +new Date();
	        //options.timestamp = +new Date();
	        //console.log(data, options, 'from stores1');
	        //this.trigger(data);
	        het.get(url, data, function (data) {
	            //console.log(data, '1');
	            data = JSON.parse(data).data.list;
	            function groupData(data) {
	                var newData = {};
	                var arrData = [];
	                // 分组
	                for (var i in data) {
	                    //data[i].dataTime=Funs.dateFormat( data[i].dataTime, 'yyyy-MM-dd hh:mm:ss', true);
	                    var k = (data[i].dataTime || '').replace(/\s.+$/, '');

	                    if (!newData[k]) {
	                        newData[k] = [];
	                    }
	                    newData[k].push(data[i]);
	                }
	                // 排序
	                for (var j in newData) {
	                    newData[j].sort(function (a, b) {
	                        return a[j] < b[j + 1];
	                    });
	                    arrData.push(newData[j]);
	                }
	                return arrData;
	            };
	            data = groupData(data);
	            //console.log(data, '2');
	            _this.trigger({ 'data': data });
	            //console.log(data, 'suc from readyData1');
	        }, function (data) {
	            console.log('fail sendData', data);
	            het.toast('获取数据失败');
	        });
	    },
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	        console.log(data, 'from repaint');
	    },
	    onSendDate: function onSendDate(data) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken;
	        options.appId = data.appId ? data.appId : options.appId;
	        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
	        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
	        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
	        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
	        options.img = data.img;
	        options.nickname = data.nickname;
	        //console.log(data,'from app ready');
	        //this.trigger(options);
	        het.get(url, data, function (data) {
	            data = JSON.parse(data);
	            //console.log(data,'parse')
	            function classifyFn(data) {
	                data = data.data;
	                var len = data.length,
	                    newArr = {},
	                    _weight = [],
	                    _fatRate = [],
	                    _bmiRate = [],
	                    _meatRate = [],
	                    _dataTime = [],
	                    _boneWeight = [],
	                    _metabolismRate = [],
	                    _moistureRate = [];
	                for (var i = 0; i < len; i++) {
	                    if (data[i].dataTime[5] == 0) {
	                        if (data[i].dataTime[8] == 0) {
	                            _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                        } else {
	                            _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                        }
	                    } else {
	                        if (data[i].dataTime[8] == 0) {
	                            _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                        } else {
	                            _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                        }
	                    }
	                    _weight.push(data[i].weight);
	                    _fatRate.push(data[i].fatRate);
	                    _bmiRate.push(data[i].bmiRate);
	                    _meatRate.push(data[i].meatRate);
	                    _boneWeight.push(data[i].boneWeight);
	                    _metabolismRate.push(data[i].metabolismRate);
	                    _moistureRate.push(data[i].moistureRate);
	                }
	                return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	            };
	            data = classifyFn(data);
	            _this.trigger({ "data": data });
	        }, function () {
	            console.log('fail sendData');
	            het.toast('获取数据失败');
	        });
	    },
	    onGetHisData: function onGetHisData(beginDate, endDate) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        options.beginDate = ymd(beginDate);
	        options.endDate = ymd(endDate);
	        console.log(options);
	        if (options.appId) {
	            het.get(url, options, function (data) {
	                data = JSON.parse(data);
	                function classifyFn(data) {
	                    data = data.data;
	                    var len = data.length,
	                        newArr = {},
	                        _weight = [],
	                        _fatRate = [],
	                        _bmiRate = [],
	                        _meatRate = [],
	                        _dataTime = [],
	                        _boneWeight = [],
	                        _metabolismRate = [],
	                        _moistureRate = [];
	                    for (var i = 0; i < len; i++) {
	                        if (data[i].dataTime[5] == 0) {
	                            if (data[i].dataTime[8] == 0) {
	                                _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                            } else {
	                                _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                            }
	                        } else {
	                            if (data[i].dataTime[8] == 0) {
	                                _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                            } else {
	                                _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                            }
	                        }
	                        _weight.push(data[i].weight);
	                        _fatRate.push(data[i].fatRate);
	                        _bmiRate.push(data[i].bmiRate);
	                        _meatRate.push(data[i].meatRate);
	                        _boneWeight.push(data[i].boneWeight);
	                        _metabolismRate.push(data[i].metabolismRate);
	                        _moistureRate.push(data[i].moistureRate);
	                    }
	                    return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	                };
	                data = classifyFn(data);
	                _this.trigger({ "data": data });
	            }, function () {
	                console.log('fail sendData');
	                //het.toast('数据请求错误')
	            });
	        }
	    },
	    onPostDate: function onPostDate(data_id) {
	        var data = options,
	            url = '/v1/app/chealth/bodyfat/getBodyFatDataList',
	            _this = this;
	        var reload = options;
	        data.dataId = data_id;
	        het.post('/v1/app/chealth/bodyfat/deleteBodyFatDataById', data, function (data) {
	            //console.log(data, 'suc post');
	            //het.toast('post suc');
	            het.get(url, reload, function (data) {
	                data = JSON.parse(data).data.list;
	                function groupData(data) {
	                    var newData = {};
	                    var arrData = [];

	                    // 分组
	                    for (var i in data) {
	                        var k = (data[i].dataTime || '').replace(/\s.+$/, '');
	                        if (!newData[k]) {
	                            newData[k] = [];
	                        }
	                        newData[k].push(data[i]);
	                    }
	                    // 排序
	                    for (var j in newData) {
	                        newData[j].sort(function (a, b) {
	                            return a[j] < b[j + 1];
	                        });
	                        arrData.push(newData[j]);
	                    }
	                    return arrData;
	                };
	                data = groupData(data);
	                _this.trigger({ 'data': data });
	                console.log(data, 'suc from reload data');
	            }, function (data) {
	                console.log(data, 'err from readyData');
	                //het.toast('数据请求错误')
	            });
	        }, function (data) {
	            console.log(data, 'fail post');
	            het.toast('删除数据失败');
	        });
	    },
	    onSelectedDate: function onSelectedDate(dates) {
	        dates.slidedCalendarShow = false;
	        this.trigger(dates);
	    },
	    groupData: function groupData(data) {
	        var newData = {};
	        var arrData = [];
	        // 分组
	        data = data.data.list;
	        for (var i in data) {
	            var key = data[i].dataTime.replace(/\s.+$/, '');
	            if (!newData[key]) {
	                newData[key] = [];
	            }
	            newData[key].push(data[i]);
	        }
	        // 排序
	        for (var j in newData) {
	            newData[j].sort(function (a, b) {
	                return a.dataTime > b.dataTime;
	            });
	            arrData.push(newData[j]);
	        }
	        arrData.sort(function (a, b) {
	            return a[0].dataTime < b[0].dataTime;
	        });
	        return arrData;
	    },
	    onReadyHisData: function onReadyHisData(data) {
	        this.trigger(data);
	    },
	    onGetNoData: function onGetNoData(data) {
	        this.trigger(data);
	    },
	    onGetAppHisData: function onGetAppHisData(beginDate, endDate) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        options.beginDate = ymd(beginDate);
	        options.endDate = ymd(endDate);
	        //console.log(options,'*************************');
	        if (options.appId) {
	            het.get(url, options, function (data) {
	                data = JSON.parse(data);
	                function classifyFn(data) {
	                    data = data.data;
	                    var len = data.length,
	                        newArr = {},
	                        _weight = [],
	                        _fatRate = [],
	                        _bmiRate = [],
	                        _meatRate = [],
	                        _dataTime = [],
	                        _boneWeight = [],
	                        _metabolismRate = [],
	                        _moistureRate = [];
	                    for (var i = 0; i < len; i++) {
	                        if (data[i].dataTime[5] == 0) {
	                            if (data[i].dataTime[8] == 0) {
	                                _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                            } else {
	                                _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                            }
	                        } else {
	                            if (data[i].dataTime[8] == 0) {
	                                _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                            } else {
	                                _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                            }
	                        }
	                        _weight.push(data[i].weight);
	                        _fatRate.push(data[i].fatRate);
	                        _bmiRate.push(data[i].bmiRate);
	                        _meatRate.push(data[i].meatRate);
	                        _boneWeight.push(data[i].boneWeight);
	                        _metabolismRate.push(data[i].metabolismRate);
	                        _moistureRate.push(data[i].moistureRate);
	                    }
	                    return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	                };
	                data = classifyFn(data);
	                //console.log(data);
	                _this.trigger({ "data": data });
	            }, function (data) {
	                console.log('fail sendData', data);
	                het.toast('获取数据失败');
	            });
	        }
	    },
	    getCalendarData: function getCalendarData(beginDate, endDate) {
	        //let d1 = new Date();
	        //let d2 = new Date();
	        //d1.setMonth(d2.getMonth()-11);
	        options.beginDate = beginDate;
	        options.endDate = endDate;
	        console.log(options, '*************from 22');
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        het.get(url, options, function (data) {
	            data = JSON.parse(data);
	            function classifyFn(data) {
	                data = data.data;
	                var len = data.length,
	                    newArr = {},
	                    _weight = [],
	                    _fatRate = [],
	                    _bmiRate = [],
	                    _meatRate = [],
	                    _dataTime = [];
	                for (var i = 0; i < len; i++) {
	                    if (data[i].dataTime[5] == 0) {
	                        if (data[i].dataTime[8] == 0) {
	                            _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                        } else {
	                            _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                        }
	                    } else {
	                        if (data[i].dataTime[8] == 0) {
	                            _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                        } else {
	                            _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                        }
	                    }
	                    _weight.push(data[i].weight);
	                    _fatRate.push(data[i].fatRate);
	                    _bmiRate.push(data[i].bmiRate);
	                    _meatRate.push(data[i].meatRate);
	                }
	                return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate };
	            };
	            data = classifyFn(data);
	            _this.trigger({ "data": data });
	        }, function () {
	            console.log('fail sendData');
	            //het.toast('数据请求错误')
	        });
	    }
	});

	//onDelete(id) {
	//    let newData = [];
	//    data.map((it)=> {
	//        if (it.dataId !== id) {
	//            newData.push(it);
	//        }
	//    });
	//    data = newData;
	//    this.trigger(newData)
	//},
	//appId	    是	Integer	应用标识
	//deviceId	是	string	设备id
	//timestamp	是	number	时间戳
	//memberId	是	string	用户编号（切换用户用）
	//userType	是	string	用户身份（1：医生 3：患者）

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
	    }
	};
	module.exports = Funs;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _MeasureMesList = __webpack_require__(9);

	var _Actions = __webpack_require__(4);

	//het.ready((data)=> {
	//    Actions.ready(data);
	//});

	/**
	 * Created by Administrator on 2016-08-12.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	var LoadMainData = React.createClass({
	    displayName: 'LoadMainData',
	    stopSlider: function stopSlider(e) {
	        e.preventDefault();
	        e.stopPropagation();
	    },
	    locationHref: function locationHref() {
	        //window.location.href='health://skip_url/membersList';
	        //alert(window.location.href);
	    },
	    render: function render() {
	        var _weight = this.props.mydata[0][0].weight ? this.props.mydata[0][0].weight : '--.--',
	            _fatRate = this.props.mydata[0][0].fatRate ? this.props.mydata[0][0].fatRate : '--.--',
	            _bmiRate = this.props.mydata[0][0].bmiRate ? this.props.mydata[0][0].bmiRate : '--.--';
	        var mesData = this.props.mydata,
	            imgSrC = this.props.myuserMes ? this.props.myuserMes : './../static/img/user-mes.png',
	            nickName = this.props.myname;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'header',
	                { className: 'index-header', onTouchStart: this.stopSlider },
	                React.createElement('div', null),
	                React.createElement(
	                    'div',
	                    { className: 'user-message' },
	                    React.createElement(
	                        'div',
	                        { style: { float: 'left', display: 'flex', flexDirection: 'column', textAlign: 'center', marginLeft: '0.6rem' } },
	                        React.createElement(
	                            'a',
	                            { href: 'health://skip_url/membersList', onTouchEnd: function onTouchEnd() {
	                                    return window.location.href = 'health://skip_url/membersList';
	                                } },
	                            React.createElement('img', { className: 'mpt-header-user-img', src: imgSrC })
	                        ),
	                        React.createElement(
	                            'span',
	                            { style: { fontSize: '0.22rem', color: '#eee' } },
	                            this.props.myname
	                        )
	                    ),
	                    '+',
	                    React.createElement(
	                        'ul',
	                        { className: 'user-message-ul' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                '体重'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'bigger-date' },
	                                _weight,
	                                React.createElement(
	                                    'span',
	                                    {
	                                        style: { fontSize: '0.26rem' } },
	                                    'kg'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                '脂肪率'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'bigger-date' },
	                                _fatRate,
	                                React.createElement(
	                                    'span',
	                                    {
	                                        style: { fontSize: '0.26rem' } },
	                                    '%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                'BMI'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'bigger-date' },
	                                _bmiRate
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'section',
	                { id: 'client-information' },
	                mesData.map(function (it, idx) {
	                    return React.createElement(_MeasureMesList.MeasureMesList, { mesData: it, key: idx });
	                })
	            ),
	            React.createElement(
	                'footer',
	                { className: 'operation' },
	                React.createElement(
	                    'a',
	                    { className: 'op-footer-l', href: 'health://skip_url/measureBalance' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '上秤'
	                    )
	                ),
	                React.createElement(
	                    'a',
	                    { style: { height: '0.8rem', width: '0.2rem' } },
	                    '|'
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'op-footer-r', href: 'health://skip_url/historicalData' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '历史数据'
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = LoadMainData;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MeasureMesList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _fun = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016-08-18.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var startX = void 0,
	    startY = void 0;

	// 创建React组件

	var MeasureMesList = exports.MeasureMesList = function (_BaseComponent) {
	    _inherits(MeasureMesList, _BaseComponent);

	    function MeasureMesList(props) {
	        _classCallCheck(this, MeasureMesList);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MeasureMesList).call(this, props));
	    }

	    _createClass(MeasureMesList, [{
	        key: 'touchSendStart',
	        value: function touchSendStart(e) {
	            startX = e.touches[0].pageX;
	            startY = e.touches[0].pageY;
	            var userAgent = navigator.userAgent;
	            var index = userAgent.indexOf("Android");
	            if (index >= 0) {
	                var androidVersion = parseFloat(userAgent.slice(index + 8));
	                if (androidVersion < 5) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                }
	            } else {
	                //e.preventDefault();
	                e.stopPropagation();
	            }
	        }
	    }, {
	        key: 'touchSendEnd',
	        value: function touchSendEnd(ev) {
	            //ev.preventDefault();
	            //ev.stopPropagation();
	            function GetSlideAngle(dx, dy) {
	                return Math.atan2(dy, dx) * 180 / Math.PI;
	            }

	            function GetSlideDirection(startX, startY, endX, endY) {
	                var dy = startY - endY;
	                var dx = endX - startX;
	                var result = 0;
	                //如果滑动距离太短
	                if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
	                    return result;
	                }
	                var angle = GetSlideAngle(dx, dy);
	                if (angle >= -45 && angle < 45) {
	                    result = 4;
	                } else if (angle >= 45 && angle < 135) {
	                    result = 1;
	                } else if (angle >= -135 && angle < -45) {
	                    result = 2;
	                } else if (angle >= 135 && angle <= 180 || angle >= -180 && angle < -135) {
	                    result = 3;
	                }
	                return result;
	            }

	            function Siblings(elem) {
	                var a = [];
	                var b = elem.parentNode.children;
	                for (var i = 0; i < b.length; i++) {
	                    if (b[i] !== elem) a.push(b[i]);
	                }
	                return a;
	            };
	            var browser = {
	                versions: function () {
	                    var u = navigator.userAgent,
	                        app = navigator.appVersion;
	                    return { //移动终端浏览器版本信息
	                        trident: u.indexOf('Trident') > -1, //IE内核
	                        presto: u.indexOf('Presto') > -1, //opera内核
	                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	                        iPad: u.indexOf('iPad') > -1, //是否iPad
	                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	                    };
	                }(),
	                language: (navigator.browserLanguage || navigator.language).toLowerCase()
	            };
	            var endX = void 0,
	                endY = void 0,
	                e = ev.currentTarget.getAttribute('title');
	            endX = ev.changedTouches[0].pageX;
	            endY = ev.changedTouches[0].pageY;
	            var direction = GetSlideDirection(startX, startY, endX, endY);
	            var userAgent = navigator.userAgent;
	            var index = userAgent.indexOf("Android");
	            switch (direction) {
	                case 0:
	                    //console.log("没滑动");
	                    var event = ev.currentTarget.getAttribute('name');
	                    console.log('health://skip_url/userMes/' + event);
	                    window.location.href = 'health://skip_url/userMes/' + event;
	                    break;
	                case 1:
	                    console.log('up');

	                    if (index >= 0) {
	                        var androidVersion = parseFloat(userAgent.slice(index + 8));
	                        if (androidVersion < 5) {
	                            document.body.scrollTop += 190;
	                        }
	                    }
	                    break;
	                case 2:
	                    console.log("down");

	                    if (index >= 0) {
	                        var _androidVersion = parseFloat(userAgent.slice(index + 8));
	                        if (_androidVersion < 5) {
	                            document.body.scrollTop -= 220;
	                        }
	                    }
	                    break;
	                case 3:
	                    ev.currentTarget.classList.toggle('selected');
	                    for (var i = 0; i < Siblings(ev.currentTarget).length; i++) {
	                        Siblings(ev.currentTarget)[i].classList.remove('selected');
	                    }
	                    //for (var k = 0; k < Siblings(ev.currentTarget.parentNode).length; k++) {
	                    //    console.log(Siblings(ev.currentTarget).length);
	                    //    //console.log(Siblings(ev.currentTarget.parentNode.children).length);
	                    //    for (var j=0;j<Siblings(ev.currentTarget.parentNode)[k].children.length;j++){
	                    //        //console.log(Siblings(ev.currentTarget.parentNode)[k].children.length,Siblings(ev.currentTarget.parentNode)[k].children)
	                    //        Siblings(ev.currentTarget.parentNode)[k].children[j].classList.remove('selected');
	                    //    }
	                    //}
	                    break;
	                case 4:
	                    ev.currentTarget.classList.remove('selected');
	                    break;
	                default:
	            }
	        }
	    }, {
	        key: 'touchDel',
	        value: function touchDel(eve) {
	            //eve.preventDefault();
	            eve.stopPropagation();
	            var event = eve.currentTarget.getAttribute('title');
	            var eLen = eve.currentTarget.getAttribute('name');
	            //Actions.onDelete(event);
	            if (eLen == 1) {
	                layer.open({
	                    title: '温馨提示',
	                    content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
	                    btn: ['我知道了']
	                });
	            } else {
	                _Actions.Actions.postDate(event);
	                console.log(event, 'del');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var items = this.props.mesData;

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'c-client-date' },
	                    (items[0].dataTime || '').split(' ')[0].substring(5).replace('-', '月'),
	                    '日'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'c-info-ul' },
	                    items.map(function (it, idx) {
	                        var lens = items.length;
	                        var its = '&' + it.bmiRate + '&' + it.weight + '&' + it.fatRate + '&' + it.meatRate + '&' + it.metabolismRate + '&' + it.moistureRate + '&' + it.boneWeight;
	                        var dataTime = _fun.Funs.dateFormat(it.dataTime, 'yyyy-MM-dd hh:mm:ss', true);
	                        return React.createElement(
	                            'li',
	                            { onTouchStart: this.touchSendStart.bind(this),
	                                onTouchEnd: this.touchSendEnd.bind(this),
	                                className: 'c-info-li', key: idx, title: it.dataId, name: its },
	                            React.createElement(
	                                'div',
	                                { className: 'c-date-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'c-date-l-span-l' },
	                                    React.createElement('img', { className: 'c-date-l-span-l-pic', src: './../static/img/cricle-left.png' }),
	                                    dataTime.substring(11, 16)
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'weight:',
	                                    it.weight,
	                                    'kg'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'fat:',
	                                    it.fatRate,
	                                    '%'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { className: 'c-date-r', onTouchStart: this.touchDel.bind(this), name: lens,
	                                        title: it.dataId },
	                                    React.createElement('img', { className: 'c-date-r-pic', src: './../static/img/delete-pic.png' }),
	                                    ' '
	                                )
	                            )
	                        );
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return MeasureMesList;
	}(_BaseComponentClass.BaseComponent);

	;
	exports.default = MeasureMesList;
	//componentWillUpdate() {
	//    function GetSlideAngle(dx, dy) {
	//        return Math.atan2(dy, dx) * 180 / Math.PI;
	//    };
	//    //根据起点和终点返回方向s 1：向上，2：向下，3：向左，4：向右,0：未滑动
	//    function GetSlideDirection(startX, startY, endX, endY) {
	//        var dy = startY - endY;
	//        var dx = endX - startX;
	//        var result = 0;
	//
	//        //如果滑动距离太短
	//        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	//            return result;
	//        }
	//
	//        var angle = GetSlideAngle(dx, dy);
	//        if (angle >= -45 && angle < 45) {
	//            result = 4;
	//        } else if (angle >= 45 && angle < 135) {
	//            result = 1;
	//        } else if (angle >= -135 && angle < -45) {
	//            result = 2;
	//        }
	//        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	//            result = 3;
	//        }
	//
	//        return result;
	//    };
	//    //滑动处理
	//    let startX, startY;
	//}
	//$('.c-info-li').on('touchstart', function (ev) {
	//    startX = ev.touches[0].pageX;
	//    startY = ev.touches[0].pageY;
	//}, false);
	//$('.c-info-li').on('touchend', function (ev) {
	//    let endX, endY, data = {};
	//    endX = ev.changedTouches[0].pageX;
	//    endY = ev.changedTouches[0].pageY;
	//    var direction = GetSlideDirection(startX, startY, endX, endY);
	//    switch (direction) {
	//        case 0:
	//            //console.log("没滑动", data);
	//            let dataId_ = $(this).parent().parent().attr('title');
	//            het.send(dataId_, function () {
	//                console.log('send suc');
	//            }, function () {
	//                console.log('send fail');
	//            });
	//            break;
	//        case 1:
	//            //console.log("向上");
	//
	//            break;
	//        case 2:
	//            //console.log("向下")
	//
	//            break;
	//        case 3:
	//            //console.log("向左");
	//            $(this).addClass('selected').parent().siblings().find(".c-info-li").removeClass('selected');
	//            break;
	//        case 4:
	//            //console.log("向右");
	//            $(this).removeClass('selected').siblings().find(".c-info-li").removeClass('selected');
	//            break;
	//        default:
	//    }
	//
	//}, false);
	//$('.c-date-r').on('touchend', function (e) {
	//    e.preventDefault();
	//    e.stopPropagation();
	//});
	//$('.c-date-r').on('touchstart', function (e) {
	//    e.preventDefault();
	//    e.stopPropagation();
	//    if ($(this).parent().parent().parent().find('ul li').length == 1) {
	//        //信息框
	//        layer.open({
	//            title: 'ps:温馨提示',
	//            content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
	//            btn: ['我知道了']
	//        });
	//        $('.c-info-li').removeClass('selected');
	//    } else {
	//        //回传删除数据
	//        //let dataId_ = $(this).parent().parent().attr('data_id');
	//        $(this).parent().parent().remove();
	//    }
	//});

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-12.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	//<a href={'health://skip_url/membersList'} className='mpt-header-user-img'>
	//    <img className='user-port' src={this.props.userdata?this.props.userdata:'./../static/img/user-mes.png'}/>
	//
	//</a>
	var PromptMeasure = React.createClass({
	    displayName: 'PromptMeasure',
	    render: function render() {
	        //let userName = this.props.userdata.nickname ? this.props.userdata.nickname : '美男子',
	        //console.log(this.props.userdata);
	        var userdata = this.props.userdata ? this.props.userdata : './../static/img/user-mes.png',
	            nickName = this.props.myname ? this.props.myname : '';
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'header',
	                { className: 'mpt-header' },
	                React.createElement('div', null),
	                React.createElement(
	                    'div',
	                    { className: 'mpt-header-flex' },
	                    React.createElement(
	                        'div',
	                        { style: { float: 'left', display: 'flex', flexDirection: 'column', textAlign: 'center', marginLeft: '0.3rem' } },
	                        React.createElement(
	                            'a',
	                            { href: 'health://skip_url/membersList', onTouchEnd: function onTouchEnd() {
	                                    return window.location.href = 'health://skip_url/membersList';
	                                } },
	                            React.createElement('img', { className: 'mpt-header-user-img', src: userdata })
	                        ),
	                        React.createElement(
	                            'span',
	                            { style: { fontSize: '0.2rem', color: '#eee' } },
	                            nickName
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'mpt-header-span' },
	                        '请上秤测量你的身体指标'
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'mpt-wrap-tips' },
	                React.createElement(
	                    'div',
	                    { style: { marginLeft: '0.3rem' } },
	                    React.createElement(
	                        'span',
	                        { className: 'mpt-tips-title' },
	                        '暖心小贴士,快速get用秤技巧'
	                    ),
	                    React.createElement(
	                        'div',
	                        { style: { display: 'flex', justifyContent: 'space-around' } },
	                        React.createElement('img', { src: './../static/img/tips-bg.png', className: 'tips-r' }),
	                        React.createElement(
	                            'ul',
	                            { className: 'mpt-tips-ul' },
	                            React.createElement(
	                                'li',
	                                { style: { flexGrow: 1 } },
	                                '打开手机蓝牙'
	                            ),
	                            React.createElement(
	                                'li',
	                                { style: { flexGrow: 2 } },
	                                '把秤放在平坦且坚硬的地面上,否则会出现较大误差'
	                            ),
	                            React.createElement(
	                                'li',
	                                { style: { flexGrow: 2 } },
	                                '脱掉袜子,双脚平均踩在上面,才能准确测出各项指标'
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                '设备同步到手机后,可在APP上查看各项身体指标'
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'a',
	                { className: 'mpt-footer ', href: 'health://skip_url/measureBalance' },
	                '上秤'
	            )
	        );
	    }
	});

	exports.default = PromptMeasure;
	//<img className='mpt-wrap-tips-pic' src='./../static/img/prompt-tips.png'/>

/***/ }
/******/ ]);