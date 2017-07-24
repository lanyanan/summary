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

	var _DreamMap = __webpack_require__(8);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	//获取Token

	window.setAccessToken = function (tok) {
	    alert(tok);
	    // het.toast(tok);
	    _Actions.Actions.token(tok);
	    //App 调用token时 就判断是否是第一次登陆
	    _Actions.Actions.meng(tok);
	    // Actions.numbers(tok);  
	};
	setAccessToken('eec0483ccf934a3a9443063f3cd5d2f1');

	// function share(){
	//     window.webkit.messageHandlers.share.postMessage('想要传的信息');
	// }
	// function back(){
	//     console.log('back------log');
	//     window.webkit.messageHandlers.back.postMessage();
	// }


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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.test();

	        _this.state = {
	            headerTop: isAndroid ? 30 : 36,
	            DreamEnergy: false, //能量次数
	            closeLayer: true };

	        _this.selectEmotion = _this.selectEmotion.bind(_this);
	        _this.returnImg = _this.returnImg.bind(_this);
	        _this.clearKey = _this.clearKey.bind(_this);
	        _this.clearName = _this.clearName.bind(_this);
	        _this.judgwNull = _this.judgwNull.bind(_this);
	        _this.numbers = _this.numbers.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.test();
	            console.log("Will-Mount", this.state);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            //能量次数
	            // Actions.DreamEnergy();
	            // Actions.shareReturn();  
	            // Actions.closeLayer();
	            // Actions.token();  


	            //一加载就判断次数
	            console.log("did", this.state);
	            // Actions.numbers();
	        }

	        //点击时--关键字为空

	    }, {
	        key: 'clearKey',
	        value: function clearKey(event) {}
	        // this.setState({keyWordValue:' '});

	        //点击时--姓名为空

	    }, {
	        key: 'clearName',
	        value: function clearName() {}
	        // this.setState({keyNameValue:' '});


	        //输入关键字时

	    }, {
	        key: 'keyWord',
	        value: function keyWord(event) {
	            var param = event.target.value;
	            var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	            if (param.match(regRule)) {
	                param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
	                // alert("不支持表情");
	                this.setState({ keyWordValue: '' });

	                var expression = document.getElementById('expression');
	                expression.style.display = "block";
	                var dd = setTimeout(function () {
	                    expression.style.display = "none";
	                }, 2000);
	            }

	            this.setState({ keyWordValue: event.target.value.substr(0, 10) });
	        }

	        //输入姓名时

	    }, {
	        key: 'keyName',
	        value: function keyName(event) {
	            var param = event.target.value;
	            var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	            if (param.match(regRule)) {
	                param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "-");
	                // console.log("----",param);
	                // alert("不支持表情");
	                this.setState({ keyNameValue: '' });

	                var expression = document.getElementById('expression');
	                expression.style.display = "block";
	                var dd = setTimeout(function () {
	                    expression.style.display = "none";
	                }, 2000);
	            }

	            this.setState({ keyNameValue: event.target.value.substr(0, 6) });
	        }

	        //蒙版

	    }, {
	        key: 'closeLayer',
	        value: function closeLayer() {
	            _Actions.Actions.closeLayer();
	        }

	        //返回按钮

	    }, {
	        key: 'returnImg',
	        value: function returnImg() {
	            clife.back();
	        }
	        //次数提示

	    }, {
	        key: 'numbers',
	        value: function numbers() {
	            clearTimeout(dd);
	            var numbersTip = document.getElementById('numbersTip');
	            numbersTip.style.display = "block";
	            var dd = setTimeout(function () {
	                numbersTip.style.display = "none";
	            }, 2000);
	        }

	        //信息为空时--提示

	    }, {
	        key: 'judgwNull',
	        value: function judgwNull() {
	            var toastId = document.getElementById('toastId');
	            toastId.style.display = "block";
	            var dd = setTimeout(function () {
	                toastId.style.display = "none";
	            }, 2000);
	        }

	        //点击潘多拉魔盒

	    }, {
	        key: 'openBox',
	        value: function openBox() {
	            console.log("点击潘多拉魔盒", this.state);

	            //埋点
	            try {
	                if (window.clife && window.clife.eventTypeAndContent) {
	                    window.clife.eventTypeAndContent(1, "enterPandora");
	                }
	            } catch (err) {
	                console.log(err);
	            }

	            var gainEmotionValue = this.state.emotionIndex ? this.state.emotionIndex : null;
	            var gainStyle = this.state.styleIndex ? this.state.styleIndex : null;
	            var gainkeyWordValue = this.state.keyWordValue ? this.state.keyWordValue : null;
	            var gainkeyNameValue = this.state.keyNameValue ? this.state.keyNameValue : null;
	            var token = this.state.token ? this.state.token : '无';
	            var token2 = this.state.accessToken ? this.state.accessToken : this.state.AppData.accessToken;
	            // console.log('gainkeyWordValue----------------------',gainkeyWordValue,gainkeyNameValue);
	            // 判断首页-选择不能为空
	            if (gainEmotionValue == null || gainStyle == null || gainkeyWordValue == null || gainkeyNameValue == null) {
	                var toastId = document.getElementById('toastId');
	                toastId.style.display = "block";
	                var dd = setTimeout(function () {
	                    toastId.style.display = "none";
	                }, 2000);
	            } else {
	                _Actions.Actions.openBox(gainEmotionValue, gainStyle, gainkeyWordValue, gainkeyNameValue, token, token2);
	            }
	        }
	        //选择情绪

	    }, {
	        key: 'selectEmotion',
	        value: function selectEmotion(e) {
	            //         window.addEventListener('load', function() {
	            //         var expression = document.getElementById("expression");
	            //         function updateOnlineStatus(event) {
	            //         var condition = navigator.onLine ? "online" : "offline";

	            //         if(condition == 'onLine'){
	            //             // expression
	            //         }
	            //     }
	            //     window.addEventListener('online',  updateOnlineStatus);
	            //     window.addEventListener('offline', updateOnlineStatus);
	            // }); 

	            var getEmotion = e.currentTarget.getAttribute('data-value');
	            // console.log("selectEmotion",getEmotion);
	            _Actions.Actions.selectEmotion(getEmotion);
	        }

	        //选择风格

	    }, {
	        key: 'selectStyle',
	        value: function selectStyle(e) {
	            var getStyle = e.currentTarget.getAttribute('data-value');
	            //console.log("getStyle",getStyle);
	            _Actions.Actions.selectStyle(getStyle);

	            // var token2 = this.state.AppData.token?this.state.AppData.token:'无';
	            // console.log("token----------------------------------",token2);
	            // Actions.numbers(token2);
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(preProps, preState) {
	            console.log("首页---componentDidUpdate", preState);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var items = [1, 2, 3, 4];
	            var content1 = ['愤怒', '悲伤', '恐惧', '快乐'];
	            var items2 = [5, 6, 7, 8];
	            var content2 = ['爱', '惊讶', '厌恶', '羞耻'];
	            var Dreamsty = [1, 2, 3];
	            var DreamstyCon = ['梦幻', '超能力', '现实'];

	            var selectemotionIndex = this.state.emotionIndex;
	            var selectstyleIndex = this.state.styleIndex;

	            var gainEmotionValue = this.state.emotionIndex ? this.state.emotionIndex : null;
	            var gainStyle = this.state.styleIndex ? this.state.styleIndex : null;
	            var gainkeyWordValue = this.state.keyWordValue ? this.state.keyWordValue : null;
	            var gainkeyNameValue = this.state.keyNameValue ? this.state.keyNameValue : null;

	            console.log('首页', this.state);

	            return React.createElement(
	                'div',
	                { className: 'main', id: 'main' },
	                React.createElement('img', { className: 'returnImg', src: '../static/img/return.png', onClick: this.returnImg }),
	                React.createElement(
	                    'header',
	                    { style: { paddingTop: this.state.headerTop } },
	                    React.createElement(
	                        'h2',
	                        null,
	                        '\u8FD8\u539F\u4F60\u7684\u68A6\u5883'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u795E\u79D8\u7684\u6F58\u591A\u62C9\u89E3\u68A6\u9B54\u76D2'
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'emotion' },
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement('img', { src: '../static/img/emotion.png ' })
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'emotionU1' },
	                        items.map(function (item, index) {
	                            // console.log("item",item,selectemotionIndex,index);
	                            return React.createElement(
	                                'li',
	                                { key: index, className: 'flexUl', 'data-value': item, onTouchStart: _this2.selectEmotion.bind(_this2) },
	                                React.createElement(
	                                    'button',
	                                    null,
	                                    ' ',
	                                    React.createElement('img', { src: selectemotionIndex - 1 == index ? './../static/img/picture' + item + item + '.png' : './../static/img/picture' + item + '.png', alt: "../static/img/picture" + item + item + ".png" })
	                                )
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'emotionCon' },
	                        content1.map(function (con, index) {
	                            return React.createElement(
	                                'span',
	                                { key: index },
	                                con
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'emotionU2' },
	                        items2.map(function (item, index) {
	                            // console.log("item",item,selectemotionIndex,index);
	                            return React.createElement(
	                                'li',
	                                { key: index, className: 'flexUl', 'data-value': item, onTouchEnd: _this2.selectEmotion },
	                                React.createElement(
	                                    'button',
	                                    null,
	                                    ' ',
	                                    React.createElement('img', { src: selectemotionIndex - 5 == index ? './../static/img/picture' + item + item + '.png' : './../static/img/picture' + item + '.png' })
	                                )
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'emotionCon' },
	                        content2.map(function (con, index) {
	                            return React.createElement(
	                                'span',
	                                { key: index },
	                                con
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'MStyle' },
	                    React.createElement(
	                        'p',
	                        { className: 'MStyle-p' },
	                        React.createElement('img', { src: '../static/img/MStyle.png' }),
	                        ' '
	                    ),
	                    React.createElement(
	                        'ul',
	                        { className: 'emotionU3' },
	                        Dreamsty.map(function (item, index) {
	                            return React.createElement(
	                                'li',
	                                { key: index, className: 'flexUl', 'data-value': item, onTouchEnd: _this2.selectStyle.bind(_this2) },
	                                React.createElement(
	                                    'button',
	                                    null,
	                                    ' ',
	                                    React.createElement('img', { src: selectstyleIndex - 1 == index ? './../static/img/dreamSty' + item + '' + item + '.jpg' : './../static/img/dreamSty' + item + '.jpg' })
	                                )
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'emotionCon' },
	                        DreamstyCon.map(function (con, index) {
	                            return React.createElement(
	                                'span',
	                                { key: index },
	                                con
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'Mkey' },
	                    React.createElement(
	                        'label',
	                        { className: 'MkeyWord' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u68A6\u5883\u5173\u952E\u8BCD'
	                        ),
	                        React.createElement('input', { type: 'text', id: 'field2', placeholder: '\u5982\u6625\u6696\u82B1\u5F00', value: this.state.keyWordValue, onChange: this.keyWord.bind(this), onClick: this.clearKey })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'Yname' },
	                    React.createElement(
	                        'label',
	                        { className: 'MName' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u4F60\u7684\u59D3\u540D'
	                        ),
	                        React.createElement('input', _defineProperty({ type: 'text', id: 'field3', placeholder: '\u5982\u6F58\u591A\u62C9', value: this.state.keyNameValue, onChange: this.keyName.bind(this), onClick: this.clearName }, 'id', 'nameValue'))
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'clickBox' },
	                    this.state.numbers3 ? React.createElement(
	                        'div',
	                        { onClick: this.numbers },
	                        React.createElement('span', null)
	                    ) : React.createElement(
	                        'div',
	                        { onClick: this.openBox.bind(this) },
	                        React.createElement(
	                            Link,
	                            { to: '/dreammap' },
	                            React.createElement('span', null)
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'gan', id: 'layerGan', style: { visibility: this.state.meng ? 'hidden' : this.state.closeLayer ? 'visible' : 'hidden' }, onClick: this.closeLayer }),
	                React.createElement(
	                    'div',
	                    { className: 'DreamEnergy', style: { visibility: this.state.DreamEnergy ? 'visible' : 'hidden' } },
	                    '\u4F60\u7684\u68A6\u5883\u80FD\u91CF\u5DF2\u7528\u5B8C\uFF0C\u8BF7\u4E0B\u6B21\u68A6\u9192\u540E\u518D\u6253\u5F00\u9B54\u76D2'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'toastTip', id: 'toastId' },
	                    '\u60A8\u7684\u4FE1\u606F\u8F93\u5165\u4E0D\u5B8C\u6574'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'toastTip  numbersTip', id: 'numbersTip' },
	                    '\u4F60\u7684\u89E3\u68A6\u80FD\u91CF\u5DF2\u7528\u5B8C\uFF0C\u8BF7\u660E\u5929\u68A6\u9192\u518D\u8BD5'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'expression', id: 'expression' },
	                    '\u4E0D\u652F\u6301\u8868\u60C5'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'dddddd' },
	                    ' ',
	                    React.createElement('img', { src: '../static/img/shi.jpg' }),
	                    ' '
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: 'dreammap', component: _DreamMap.DreamMap })
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
	'action', //倒计时提示
	'share', //分享到朋友圈之后
	'DreamEnergy', 'emotionLayerLayer', 'MStyleLayer', 'PdlBoxLayer', 'panduan', 'closeLayer', //蒙版点击取消
	'openBox', //打开(提交)潘多拉魔盒
	'shareClick', //分享取消倒计时
	'selectEmotion', //选择情绪
	'selectStyle', //选择风格
	'shareReturn', //分享返回方法
	'token', //app调用函数获取token
	'setTimer', //定时器时间
	'moniResult', //模拟分享返回结果
	'returnError', //分享返回失败
	'judgeTitleLength', //判断标题的长度
	'test', //过渡(首页)
	'localTwo', 'numbers', //判断次数
	'meng', //蒙版判断
	'btn' //按钮隔1秒后出现--图片没加载出来分享
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

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	var AppData = {
	    a: 1,
	    b: 2,
	    accessToken: null,
	    numbers: null
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        //AppData = data;

	        this.trigger(AppData);
	    },


	    //第一页一开始就调用,trigger出去AppData(过渡)
	    onTest: function onTest(data) {
	        console.log("Test方法");
	        this.trigger(AppData);
	    },


	    //倒计时提示
	    onAction: function onAction() {
	        var _this = this;
	        setTimeout(function () {
	            _this.trigger({ tipShow: true });
	        }, 1000);

	        // _this.trigger({shareBtn:true});
	    },


	    //判断标题的长度来做蒙版对应的高度
	    onJudgeTitleLength: function onJudgeTitleLength() {},


	    //第二页返回第一页---去掉蒙版
	    onLocalTwo: function onLocalTwo() {
	        AppData.closeLayer = false;
	    },


	    //解梦能量次数
	    // onDreamEnergy(){
	    // 	let _this = this;
	    //     // alert("666666");
	    // 	_this.trigger({DreamEnergy:false});

	    // },

	    //APP 返回分享成功
	    onShareReturn: function onShareReturn(returnResult) {
	        console.log("APP分享结果---" + returnResult);
	        var _this = this;
	        AppData.clearTime = true;
	        AppData.token = returnResult;
	        //如果分享成功，则显示详细信息 ++ 取消那个定时器自动返回上一页的
	        _this.trigger({ show: true, ScanCode: true, returnError: true, AppData: AppData });
	    },


	    //APP分享失败--载体
	    onReturnError: function onReturnError() {
	        var _this = this;
	        // alert("分享失败");

	        //获取倒计时的时间
	        var getTipsTime = document.getElementById('times').innerHTML;
	        console.log("getTipsTime-----------", getTipsTime);
	        var getTime = document.getElementById('times');
	        clearInterval(this.restartTime);
	        this.restartTime = setInterval(function () {
	            getTime.innerHTML = getTipsTime;
	            getTipsTime--;
	            console.log(getTipsTime);
	            if (getTipsTime == -1) {
	                clearInterval(this.restartTime);
	                _Actions.Actions.localTwo();
	                history.back();
	                _this.trigger({ AppData: AppData });
	            }
	        }.bind(this), 1000);

	        _this.trigger({ returnError: true, tipShow: true, shareBtn: true, show: false, ScanCode: true });
	    },
	    onMoniResult: function onMoniResult(a, b) {
	        var _this = this;
	        var oldTime = void 0;
	        if (a === 1) {
	            oldTime = true;
	        }
	        var countdown = b;
	        console.log("countdown", countdown);
	        _this.trigger({ oldTime: oldTime, show: false, time2: countdown, restart: true });
	    },


	    //分享取消倒计时
	    onShareClick: function onShareClick(titleValue) {

	        //获取倒计时的时间
	        var getTipsTime = document.getElementById('times').innerHTML;
	        var getTime = document.getElementById('times');

	        var _this = this; //tipShow:false----中间大图片+倒计时提示   ScanCode:true, ---//二维码 div
	        var stopTime2 = getTipsTime;

	        //当点击分享时，分享按钮消失 二维码出现
	        _this.trigger({ tipShow: false, shareBtn: false, ScanCode: false });

	        setTimeout(function () {
	            //调用app注入接口，将分享数据传给app-----既弹出分享框
	            if (window.clife && window.clife.share) {
	                // alert("调用share成功！-window.clife");
	                window.clife.share(JSON.stringify({
	                    "title": '123456'
	                }));

	                var _this2 = this;
	                AppData.clearTime = true;
	                //如果分享成功，则显示详细信息 ++ 取消那个定时器自动返回上一页的
	                _this2.trigger({ show: true, ScanCode: true, returnError: true, AppData: AppData });
	            } else {
	                // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true});
	                // _this.trigger({tipShow:false,shareBtn:false,ScanCode:false});
	                // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true,stopTime:stopTime2});
	                // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true});
	                // alert("app注入接口--share失败");

	                // clearInterval(this.restartTime);
	                // this.restartTime=setInterval(function(){
	                //   // console.log("123");
	                //         getTime.innerHTML = getTipsTime;
	                //         getTipsTime--;
	                //         console.log(getTipsTime);
	                //         if(getTipsTime == -1){
	                //           clearInterval(this.restartTime);
	                //            Actions.localTwo();
	                //            history.back();
	                //            _this.trigger({AppData});
	                //         }
	                // }.bind(this),1000);

	            }
	        }, 400);
	    },


	    //蒙版
	    onCloseLayer: function onCloseLayer() {
	        var _this = this;
	        console.log('蒙版');
	        _this.trigger({ closeLayer: false });
	    },


	    //获取到的Token
	    onToken: function onToken(t) {
	        console.log("onToken", t);
	        var _this = this;
	        var token = t;
	        AppData.token = t;
	        AppData.accessToken = t;
	        _this.trigger({ token: token, AppData: AppData });
	    },
	    onNumbers: function onNumbers(token) {

	        var myDate = new Date();

	        // 日期兼容ipod
	        var last = void 0;
	        var formatDate2 = function formatDate2(Date) {
	            console.log("@@@@@@@@@", Date);
	            var y = Date.getFullYear();
	            var m = Date.getMonth() + 1;
	            m = m < 10 ? '0' + m : m;
	            var d = Date.getDate();
	            d = d < 10 ? '0' + d : d;
	            last = y + '-' + m + '-' + d;
	            return last;
	        };

	        var ff = formatDate2(myDate);
	        var _this = this;
	        var token = token;
	        var timer = new Date();
	        var timestamp = timer.getTime();
	        var dataTime = timer.toLocaleDateString();
	        var dataTimeNew = dataTime.toString();
	        dataTime = dataTime.replace(/\//g, '-');
	        dataTimeNew = dataTimeNew.replace(/\//g, '-');
	        // let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken=28b6da1eba04425dbb60b43a55da2c4b&appId=10014&timestamp='+timestamp;
	        // let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken='+token+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';
	        // let url = 'http://test.api.clife.cn/v1/app/csleep/dream/getDreamDetail'+'?accessToken='+token+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';

	        var getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail'; //开发，本地，没有预发布环境 
	        if (window.location.host == 'test.api.clife.cn' || window.location.host == 'test.cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getDreamDetail';
	        } //测试
	        if (window.location.host == 'api.clife.cn' || window.location.host == 'cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getDreamDetail';
	        } //正式


	        var url = getUrl + '?accessToken=' + token + '&appId=10014&timestamp=' + timestamp + '&dataTime=' + last + '&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';
	        het.get(url, {}, function (succ) {
	            alert('返回按钮--' + succ);
	            alert('返回按钮--' + url);
	            var ChangeSucc = JSON.parse(succ);
	            if (ChangeSucc.msg == "失败") {
	                console.log('失败失败失败失败失败');
	                AppData.numbers = true;
	                var numbers3 = true;
	                _this.trigger({ AppData: AppData, numbers3: numbers3 });
	            }
	        }, function (fail) {
	            alert("返回按钮----" + fail);
	            alert("返回按钮----" + url);
	            console.log(" onNumbers---fail", fail);
	        });
	    },


	    //提交数据--打开潘多拉魔盒
	    onOpenBox: function onOpenBox(e, s, k, n, t, t2) {
	        // 情绪，风格，关键字，姓名
	        var emotion = e;
	        var Dstyle = s;
	        var keyword = k;
	        var name = n;
	        var token = t;
	        var token2 = t2;

	        var timer = new Date();
	        var timestamp = timer.getTime();
	        var dataTime = timer.toLocaleDateString();
	        var _this = this;
	        console.log("this.is the openBox!----这个是传给后台的值：", dataTime, emotion, Dstyle, keyword, name, token, token2);
	        // let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken=b2cbee21308847b5afa1255f03420326&appId=10014&timestamp='+timestamp+'&dataTime='+dataTime;
	        //trigger出来AppData 是因为接口返回错误的话，点击返回获取不到AppData.accessToken。故这边trigger   
	        _this.trigger({ AppData: AppData });

	        //兼容ipod
	        var myDate = new Date();
	        var last = void 0;
	        var formatDate2 = function formatDate2(Date) {
	            console.log("@@@@@@@@@", Date);
	            var y = Date.getFullYear();
	            var m = Date.getMonth() + 1;
	            m = m < 10 ? '0' + m : m;
	            var d = Date.getDate();
	            d = d < 10 ? '0' + d : d;
	            last = y + '-' + m + '-' + d;
	            // alert("lastTime"+last);
	            return last;
	        };

	        var ff = formatDate2(myDate);

	        var getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail'; //开发，本地，没有预发布环境 
	        if (window.location.host == 'test.api.clife.cn' || window.location.host == 'test.cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getDreamDetail';
	        } //测试
	        if (window.location.host == 'api.clife.cn' || window.location.host == 'cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getDreamDetail';
	        } //正式

	        var url = getUrl + '?accessToken=' + token2 + '&appId=10014&timestamp=' + timestamp + '&dataTime=' + last + '&inputName=' + name + '&inputKey=' + keyword + '&inputEmoji=' + emotion + '&inputStyle=' + Dstyle;
	        het.get(url, {}, function (succ) {
	            alert('访问--' + succ);
	            alert('访问--' + url);

	            var ChangeSucc = JSON.parse(succ);
	            if (ChangeSucc.msg == "失败") {
	                console.log('失败失败失败失败失败');
	                AppData.numbers = true;
	                var numbers3 = true;
	                _this.trigger({ AppData: AppData, numbers3: numbers3 });
	            }

	            var data = ChangeSucc.data;
	            var username = data.username;
	            var key1 = data.key;
	            var key = key1.replace(/^\s*/g, '');

	            var title = data.title;

	            var fragment1Address = data.fragment1Address;
	            var fragment1Infor = data.fragment1Infor;
	            var fragment1Name = data.fragment1Name;

	            var fragment2Address = data.fragment2Address;
	            var fragment2Infor = data.fragment2Infor;
	            var fragment2Name = data.fragment2Name;

	            var fragment3Address = data.fragment3Address;
	            var fragment3Infor = data.fragment3Infor;
	            var fragment3Name = data.fragment3Name;

	            var fragment4Address = data.fragment4Address;
	            var fragment4Infor = data.fragment4Infor;
	            var fragment4Name = data.fragment4Name;

	            var photoInfor = data.photoInfor;
	            var photoTitle = data.photoTitle;
	            var photoName = data.photoName;
	            var photoAddress = data.photoAddress;
	            var similarity = data.similarity;

	            //根据字体的长度，来居中
	            if (title.length < 20 || title.length == 20) {
	                var Middle = document.getElementById('DreamTipsMiddle');
	                Middle.style.textAlign = "center";
	            }

	            var DreamTipsMiddle = document.getElementById('DreamTipsMiddle');
	            //为了设配Iphone5 +标题少的话居中-->分享按钮向上移动
	            var DreamShare2 = document.getElementById('DreamShare');
	            var showMargin = document.getElementById('showMargin');

	            if (title.length < 20) {
	                DreamTipsMiddle.style.paddingTop = "20px";
	                DreamTipsMiddle.style.height = "48px";
	                DreamShare2.style.paddingTop = "0px";
	            } else if (title.length < 30 || title.length > 20) {
	                DreamTipsMiddle.style.paddingTop = "10px";
	                DreamTipsMiddle.style.height = "58px";
	                DreamShare2.style.paddingTop = "10px";
	            } else if (title.length < 40 || title.length > 30) {
	                DreamTipsMiddle.style.paddingTop = "5px";
	                DreamTipsMiddle.style.height = "63px";
	                DreamShare2.style.paddingTop = "15px";
	            }

	            if (title.length > 40) {
	                showMargin.style.marginTop = '10px';
	            }

	            var DreamShare = document.getElementById('DreamShare');
	            var tuTop = DreamShare.offsetTop;
	            var tuTop2 = DreamShare.clientHeight;

	            _this.trigger({ username: username, key: key, title: title, fragment1Address: fragment1Address,
	                fragment1Infor: fragment1Infor, fragment1Name: fragment1Name, fragment2Address: fragment2Address,
	                fragment2Infor: fragment2Infor, fragment2Name: fragment2Name, fragment3Address: fragment3Address,
	                fragment3Infor: fragment3Infor, fragment3Name: fragment3Name, fragment4Address: fragment4Address, //这边trigger-AppData 是因为首页到时需要用到AppData.accessToken
	                fragment4Infor: fragment4Infor, fragment4Name: fragment4Name, photoInfor: photoInfor, photoTitle: photoTitle, photoName: photoName, similarity: similarity, photoAddress: photoAddress, kuang: true, AppData: AppData });
	        }, function (fail) {
	            var DreamMapTips = document.getElementById('DreamMapTips');
	            DreamMapTips.style.display = "block";
	            var dd = setTimeout(function () {
	                DreamMapTips.style.display = "none";
	            }, 2000);
	            alert("请求接口----" + fail);
	            alert("请求接口----" + url);
	            _this.trigger({ dzj: 'dzj' });
	        });
	    },
	    onPanduan: function onPanduan() {
	        var _this = this;
	        $(".panduan").each(function () {
	            console.log($(this).text().length);
	            var maxwidth = 6;
	            if ($(this).text().length > maxwidth) {
	                $(this).text($(this).text().substring(0, maxwidth));
	                $(this).html($(this).html() + '...');
	            }
	        });
	    },


	    //客户端新手介绍页面，只有第一次才显示
	    onMeng: function onMeng(token) {

	        var timer = new Date();
	        var timestamp = timer.getTime();
	        var token = token;
	        var _this = this;

	        var getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getTimes'; //开发，本地，没有预发布环境 
	        if (window.location.host == 'test.api.clife.cn' || window.location.host == 'test.cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getTimes';
	        } //测试
	        if (window.location.host == 'api.clife.cn' || window.location.host == 'cms.clife.cn') {
	            getUrl = '/v1/app/csleep/dream/getTimes';
	        } //正式


	        var url = getUrl + '?accessToken=' + token + '&appId=10014&timestamp=' + timestamp;
	        het.get(url, {}, function (ss) {
	            // alert('meng--'+ss);
	            // toast('meng--'+url);
	            var ChangeSucc = JSON.parse(ss);
	            if (ChangeSucc.code == 0) {
	                //如果返回成功 0代表需要加新手指导
	                console.log("是第一次登陆,need蒙版");
	                _this.trigger({ meng: false });
	            } else {
	                console.log("不是第一次登陆,不需要蒙版");
	                _this.trigger({ meng: true });
	            }
	        }, function (ff) {
	            // console.log("ffffffffffffffff",ff);
	            // het.toast('Meng--访问接口失败----'+ff);
	            // het.toast('Meng--访问接口失败-----'+url);
	        });
	    },


	    //点击情绪选项
	    onSelectEmotion: function onSelectEmotion(getIndex) {
	        var _this = this;
	        var getIndex = getIndex;

	        _this.trigger({ emotionIndex: getIndex });
	    },

	    //点击风格按钮
	    onSelectStyle: function onSelectStyle(getIndex) {
	        var _this = this;
	        var getIndex = getIndex;
	        _this.trigger({ styleIndex: getIndex });
	    },


	    //定时器暂停时间
	    onSetTimer: function onSetTimer(timeValue) {
	        console.log('定时器暂停时间-', timeValue);
	        var _this = this;
	        _this.trigger({ timeValue: timeValue });
	    }
	});

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *
	 *梦境图
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DreamMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	window.shareStatus = function (code) {
	  if (code == null) {
	    alert('缺少参数！');
	  }
	  //分享成功了就显示解梦提示
	  if (code === 1) {
	    _Actions.Actions.shareReturn(code);
	  } else if (code === 2) {
	    _Actions.Actions.returnError();
	    // alert('shareStatus分享失败') //---关闭(返回)H5页面
	  }
	};

	// 创建React    这个是Location  页面的  组件

	var DreamMap = exports.DreamMap = function (_BaseComponent) {
	  _inherits(DreamMap, _BaseComponent);

	  function DreamMap(props) {
	    _classCallCheck(this, DreamMap);

	    var _this = _possibleConstructorReturn(this, (DreamMap.__proto__ || Object.getPrototypeOf(DreamMap)).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      headerTop: isAndroid ? 30 : 36,
	      tipShow: false, //中间大图片+倒计时提示
	      shareBtn: true, //分享按钮
	      ScanCode: true, //二维码 div
	      show: false };
	    _this.returnImg = _this.returnImg.bind(_this);
	    return _this;
	  }

	  _createClass(DreamMap, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {

	      //按钮隔1秒后出现--图片没加载出来分享
	      // Actions.btn(); 
	      //判断标题的长度来做蒙版对应的高度
	      _Actions.Actions.judgeTitleLength();

	      //定时器---
	      clearTimeout(this.intervalID);
	      this.intervalID = setTimeout(function () {
	        var getTime = document.getElementById('times');

	        clearInterval(this.sh);
	        _Actions.Actions.action();
	        //显示定时器
	        this.sh = setInterval(test, 1000);
	        var num = 10;
	        function test() {
	          getTime.innerHTML = num;
	          num--;
	          console.log(num);
	          if (num == -1) {
	            clearInterval(this.sh);
	            _Actions.Actions.localTwo();
	            history.back();
	          }
	        }
	      }.bind(this), 4000);
	    }
	    //卸载定时器

	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // this.timer && clearTimeout(this.timer);
	      console.log("Unmount----Unmount----Unmount", this.intervalID);
	      //定时器最外层用this，这样子销毁的话就可以用this  销毁最外层的定时器了  每个每次定时器都有不同id
	      clearTimeout(this.intervalID);
	      clearInterval(this.sh);
	    }

	    //分享按钮

	  }, {
	    key: 'shareClick',
	    value: function shareClick() {
	      //点击分享时,清除定时器
	      clearTimeout(this.intervalID);
	      clearInterval(this.sh);

	      //获取标题个数的长度
	      var getStateTitle = this.state.title;

	      //点击时获取定时器秒数
	      // Actions.setTimer(getTipsTime);
	      _Actions.Actions.shareClick(getStateTitle);

	      //模拟App请求
	      //Actions.moniResult(1,getTipsTime);
	      // 模拟分享失败
	      // Actions.returnError();
	      //模拟APP分享成功
	      // Actions.shareReturn();


	      //次数限制
	      if (localStorage.pagecount) {
	        localStorage.pagecount = Number(localStorage.pagecount) + 1;
	      } else {
	        localStorage.pagecount = 1;
	      }
	    }

	    //暂停，----->重启定时器

	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {} //完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
	    // console.log("第二页Update----",prevState);

	    //返回按钮

	  }, {
	    key: 'returnImg',
	    value: function returnImg() {

	      //clearInterval(this.re);

	      // 一加载就判断次数
	      console.log("干干干", this.state);
	      //Actions.numbers();
	      var returnAccessToken = this.state.AppData.accessToken ? this.state.AppData.accessToken : '无';
	      // console.log("草草草",returnAccessToken);
	      _Actions.Actions.numbers(returnAccessToken);
	      // 返回调用蒙版
	      _Actions.Actions.localTwo();
	      history.back();
	      clearTimeout(this.intervalID);
	      clearInterval(this.sh);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var getTime = new Date();
	      var year = getTime.getFullYear();
	      var month = getTime.getMonth() + 1;
	      var day = getTime.getDate();
	      if (day < 10) {
	        day = '0' + day;
	      }
	      var nowTime = year + '年' + month + '月' + day + '日';

	      var address1 = this.state.fragment1Address;
	      var address2 = this.state.fragment2Address;
	      var address3 = this.state.fragment3Address;
	      var address4 = this.state.fragment4Address;
	      var photoAddress = this.state.photoAddress;

	      console.log("第二页", this.state);
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'Dream' },
	          React.createElement('div', { className: 'headerTop' }),
	          React.createElement(
	            'header',
	            { className: 'headerDream' },
	            React.createElement('img', { className: 'returnImg', src: '../static/img/return.png', onClick: this.returnImg }),
	            React.createElement(
	              'p',
	              null,
	              '\u300A',
	              this.state.key,
	              '\u300B'
	            )
	          ),
	          React.createElement(
	            'p',
	            { className: 'Dream-header-P' },
	            React.createElement(
	              'span',
	              null,
	              this.state.username
	            ),
	            '\u5728',
	            nowTime,
	            '\u505A\u7684\u68A6 '
	          ),
	          React.createElement(
	            'section',
	            { className: 'fragment' },
	            React.createElement(
	              'span',
	              { className: 'fragment-s1' },
	              React.createElement(
	                'p',
	                null,
	                '\u89E3\u68A6'
	              ),
	              React.createElement(
	                'p',
	                null,
	                '\u788E\u7247'
	              )
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'fragment-Li', style: { 'background-image': this.state.fragment1Address ? 'url(' + this.state.fragment1Address + ')' : 'url("../static/img/title1.png")' } },
	                ' '
	              ),
	              React.createElement(
	                'li',
	                { className: 'fragment-Li', style: { 'background-image': this.state.fragment2Address ? 'url(' + this.state.fragment2Address + ')' : 'url("../static/img/title2.png")' } },
	                ' '
	              ),
	              React.createElement(
	                'li',
	                { className: 'fragment-Li', style: { 'background-image': this.state.fragment3Address ? 'url(' + this.state.fragment3Address + ')' : 'url("../static/img/title3.png")' } },
	                ' '
	              ),
	              React.createElement(
	                'li',
	                { className: 'fragment-Li', style: { 'background-image': this.state.fragment4Address ? 'url(' + this.state.fragment4Address + ')' : 'url("../static/img/title4.png")' } },
	                ' '
	              )
	            ),
	            React.createElement(
	              'span',
	              { className: 'fragment-s1' },
	              React.createElement(
	                'p',
	                null,
	                '\u6DF1\u5EA6'
	              ),
	              React.createElement(
	                'p',
	                null,
	                '\u5256\u6790'
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'DreamTips', id: 'aa' },
	            ' ',
	            React.createElement(
	              'div',
	              { className: 'DreamTips-s' },
	              '\u201C'
	            ),
	            ' ',
	            React.createElement(
	              'div',
	              { id: 'DreamTipsMiddle' },
	              ' \xA0\xA0',
	              this.state.title,
	              ' ',
	              React.createElement(
	                'span',
	                { className: 'DreamTipRight' },
	                '\u201D'
	              ),
	              ' '
	            ),
	            '  '
	          ),
	          React.createElement(
	            'div',
	            { className: 'show', id: 'showMargin', style: { display: this.state.show ? 'none' : 'block' } },
	            React.createElement(
	              'div',
	              { className: 'DreamImg', id: 'DreamImg' },
	              React.createElement('img', { id: 'DreamPicture', src: this.state.photoAddress ? this.state.photoAddress : '../static/img/circle.png', style: { opacity: this.state.tipShow ? '.5' : '1' } })
	            ),
	            React.createElement(
	              'div',
	              { id: 'DreamShare', className: 'DreamShare', onClick: this.shareClick.bind(this), style: { display: this.state.shareBtn ? 'block' : 'none' } },
	              '      '
	            ),
	            React.createElement(
	              'div',
	              { className: 'CountDown', id: 'CountDownId', style: { visibility: this.state.tipShow ? 'visible' : 'hidden' } },
	              React.createElement(
	                'div',
	                { className: 'content' },
	                React.createElement(
	                  'p',
	                  null,
	                  '\u68A6\u5883\u7A0D\u7EB5\u5373\u901D'
	                ),
	                React.createElement(
	                  'p',
	                  { className: 'contentP1' },
	                  ' ',
	                  React.createElement('i', { id: 'times', style: { display: this.state.oldTime ? 'none' : 'inline-block' } }),
	                  '  ',
	                  React.createElement('i', { id: 't2', style: { visibility: this.state.restart ? 'visible' : 'hidden' } }),
	                  ' \u79D2\u540E'
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  '\u6F58\u591A\u62C9\u9B54\u76D2\u5373\u5C06\u5173\u95ED'
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'i',
	                    null,
	                    '\u5206\u4EAB'
	                  ),
	                  '\u9080\u8BF7\u597D\u53CB\u89E3\u68A6\uFF01'
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'i',
	                    null,
	                    '\u5206\u4EAB'
	                  ),
	                  ' \u53EF\u83B7\u5F97',
	                  React.createElement(
	                    'i',
	                    null,
	                    '\u89E3\u68A6\u63D0\u793A'
	                  )
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'DreamLayer', id: 'getDiv', style: { display: this.state.show ? 'block' : 'none' } },
	            React.createElement(
	              'div',
	              { className: 'DreamOut' },
	              '\u6F58\u591A\u62C9\u9B54\u76D2:',
	              this.state.photoTitle
	            ),
	            React.createElement(
	              'div',
	              { className: 'DreamContent' },
	              React.createElement(
	                'p',
	                null,
	                React.createElement(
	                  'i',
	                  null,
	                  this.state.photoName,
	                  '\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  this.state.photoInfor
	                ),
	                '  '
	              ),
	              React.createElement(
	                'p',
	                null,
	                React.createElement(
	                  'i',
	                  null,
	                  this.state.fragment1Name,
	                  '\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  this.state.fragment1Infor
	                ),
	                '  '
	              ),
	              React.createElement(
	                'p',
	                null,
	                React.createElement(
	                  'i',
	                  null,
	                  this.state.fragment2Name,
	                  '\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  this.state.fragment2Infor
	                ),
	                '  '
	              ),
	              React.createElement(
	                'p',
	                null,
	                React.createElement(
	                  'i',
	                  null,
	                  this.state.fragment3Name,
	                  '\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  this.state.fragment3Infor
	                ),
	                '  '
	              ),
	              React.createElement(
	                'p',
	                null,
	                React.createElement(
	                  'i',
	                  null,
	                  this.state.fragment4Name,
	                  '\uFF1A'
	                ),
	                React.createElement(
	                  'span',
	                  null,
	                  this.state.fragment4Infor
	                ),
	                '  '
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'DreamInfo' },
	            React.createElement(
	              'p',
	              { className: 'DreamInfoP1' },
	              React.createElement(
	                'span',
	                null,
	                ' \u68A6\u5883\u8FD8\u539F\u5EA6:',
	                React.createElement(
	                  'i',
	                  null,
	                  ' ',
	                  this.state.similarity
	                )
	              ),
	              React.createElement(
	                'span',
	                null,
	                '\u914D\u5408',
	                React.createElement(
	                  'i',
	                  null,
	                  '\u7761\u7720\u76D1\u6D4B\u5668'
	                ),
	                ','
	              ),
	              React.createElement(
	                'span',
	                null,
	                '\u68A6\u5883\u8FD8\u539F',
	                React.createElement(
	                  'i',
	                  null,
	                  '\u66F4\u51C6\u786E!'
	                )
	              ),
	              ' '
	            ),
	            React.createElement(
	              'div',
	              { className: 'ScanCode', style: { display: this.state.ScanCode ? 'none' : 'block' } },
	              React.createElement('i', null),
	              React.createElement(
	                'div',
	                null,
	                React.createElement('i', { className: 'sleepicon' }),
	                React.createElement(
	                  'p',
	                  null,
	                  '\u626B\u7801\u4E0B\u8F7D',
	                  React.createElement(
	                    'b',
	                    null,
	                    'C-life\u7761\u7720'
	                  ),
	                  '\uFF0C\u8FD8\u539F\u4F60\u7684\u771F\u5B9E\u68A6\u5883\uFF0C',
	                  React.createElement(
	                    'b',
	                    null,
	                    '\u6709\u673A\u4F1A\u514D\u8D39\u9886\u53D6\u667A\u80FD\u7761\u7720\u76D1\u6D4B\u5668'
	                  ),
	                  '\uFF01'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'ddd' },
	            React.createElement('img', { src: '../static/img/1.png' }),
	            '  '
	          ),
	          React.createElement(
	            'div',
	            { id: 'DreamMapTips' },
	            '\u7F51\u7EDC\u65AD\u5F00,\u8BBF\u95EE\u5931\u8D25'
	          )
	        )
	      );
	    }
	  }]);

	  return DreamMap;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	  // het.setTitle('所有已记录的数据');

	});

/***/ }
/******/ ]);