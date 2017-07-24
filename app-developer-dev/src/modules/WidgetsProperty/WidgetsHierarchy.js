'use strict';

/**
 * 组件属性面板类
 * 提供控件各种属性设定
 * @author   xinglin
 * @datetime 2015-12-24
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _Store = require('../../apps/playground/Store');

var _PanelBase2 = require('../../core/PanelBase.class');

var _uploadVerification = require('./uploadVerification');

var _ShowProperty = require('./ShowProperty');

var _commandProperty = require('./commandProperty');

var _CaptionProperty = require('./CaptionProperty');

var _ImageProperty = require('./ImageProperty');

var _TextProperty = require('./TextProperty');

var _SwitchProperty = require('./SwitchProperty');

var _StatusProperty = require('./StatusProperty');

var _EventProperty = require('./EventProperty');

var _ColorProperty = require('./ColorProperty');

var _fontStyleProperty = require('./fontStyleProperty');

var _TimeProperty = require('./TimeProperty');

var _RangeProperty = require('./RangeProperty');

var _ColorPickerProperty = require('./ColorPickerProperty');

var _TitleProperty = require('./TitleProperty');

var _BottonDetailProperty = require('./BottonDetailProperty');

var _ModeProperty = require('./ModeProperty');

var _ProcessProperty = require('./ProcessProperty');

var _OpacityProperty = require('./OpacityProperty');

var _TabProperty = require('./TabProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 图片验证类
// 显隐组件
// 发送指令组件
// 标题组件
// 图像组件
// 文本组件
// 开关按钮组件
// 状态组件
// 事件组件
// 颜色组件
// 字体风格组件
// 定时组件
// 滑块组件
// 颜色盘组件
// 控件头部内容title组件
// 控件弹窗按钮内容组件
// 控件模式选择--状态事件组合
// 过程组件
// 透明度组件


// 选项卡组件

var WidgetsProperty = function (_PanelBase) {
    _inherits(WidgetsProperty, _PanelBase);

    function WidgetsProperty() {
        _classCallCheck(this, WidgetsProperty);

        return _possibleConstructorReturn(this, (WidgetsProperty.__proto__ || Object.getPrototypeOf(WidgetsProperty)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(WidgetsProperty, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        panelSwitch: { propertyPanelSwitch: 1 },
                        protocolConfigs: [],
                        pages: {
                            activePage: 0,
                            activeWidget: -1,
                            activeWidgetChild: -1, //选项卡里的选项index（儿子）
                            activeWidgetGrandchild: -1, //对应选项里的控件index（孙子）
                            pageList: [{
                                pageName: '主页',
                                pageId: 0,
                                widgetList: [{
                                    top: 0,
                                    left: 0,
                                    width: 0,
                                    height: 0
                                }]
                            }]
                        },
                        showStatus: 0,
                        showEvent: 0,
                        showMode: 0, //模式
                        showTab: 0 //选项卡
                    };
                },
                close: function close(e) {
                    //关闭面板
                    e.preventDefault();
                    _Actions.Actions.showPanel('propertyPanel');
                },
                baseData: {
                    commandType: '1',
                    checkedCommandList: [],
                    propertySet: [{
                        propertyId: 1,
                        bgImagePath: '',
                        imageInfo: '',
                        statusVisibility: 1,
                        widgetStatusName: '',
                        switchValue: 1,
                        multipleText: '',
                        eventSet: [{
                            eventType: 1,
                            eventField: '',
                            eventValue: ''
                        }],
                        statusSet: [{
                            statusField: '',
                            statusValue: ''
                        }],
                        fontSize: '',
                        textColor: '',
                        updateFlag: undefined,
                        checkedPageId: ''
                    }],
                    tone: []
                },
                baseProtocolConfigs: [{
                    typeName: "控制数据",
                    type: 2,
                    propertyConfigs: null
                }, {
                    typeName: "运行数据",
                    type: 3,
                    propertyConfigs: null
                }],
                resetPanel: function resetPanel(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var dom = document.querySelector('#property-view');
                    dom.style.top = '40px';
                    dom.style.right = '210px';
                },
                toggleDiv: function toggleDiv(index, type) {
                    if (type === 'status') {
                        var show = this.state.showStatus === index ? -1 : index;
                        this.setState({
                            showStatus: show
                        });
                    } else if (type === 'event') {
                        var _show = this.state.showEvent === index ? -1 : index;
                        this.setState({
                            showEvent: _show
                        });
                    } else if (type === 'mode') {
                        var _show2 = this.state.showMode === index ? -1 : index;
                        this.setState({
                            showMode: _show2
                        });
                    } else if (type === 'tabBar') {
                        var _show3 = this.state.showTab === index ? -1 : index;
                        this.setState({
                            showTab: _show3
                        });
                    }
                },
                colorPick: function colorPick(e) {
                    var colorstyle = e.target.getAttribute('data-value') || e.target.getAttribute('data-symbol');
                    var newcolor = e.target.getAttribute('data-bgcolor');
                    //console.log(/^#[0-9a-fA-F]{3,6}$/.test(newcolor));
                    switch (colorstyle) {
                        case 'foreground':
                            // this.setState({foreground:newcolor});
                            _Actions.Actions.changeFgColor(newcolor);
                            break;
                        case 'bordercolor':
                            // this.setState({bordercolor:newcolor});
                            _Actions.Actions.changeBorderColor(newcolor);
                            break;
                        case 'bgcolor':
                            // this.setState({bgcolor:newcolor});
                            _Actions.Actions.changeBgColor(newcolor);
                            break;
                    }
                },
                getMaxZindex: function getMaxZindex(type) {
                    var activePage = this.state.pages.activePage || 0;
                    var widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                    if (type === 'max') {
                        widgetList.sort(function (x, y) {
                            return (y.zIndex || 0) - (x.zIndex || 0);
                        });
                        return widgetList[0].zIndex || 0;
                    } else if (type === 'min') {
                        widgetList.sort(function (x, y) {
                            return (x.zIndex || 0) - (y.zIndex || 0);
                        });
                        return widgetList[0].zIndex || 0;
                    }
                },
                changeZIndex: function changeZIndex(e) {
                    e.preventDefault();
                    var type = e.target.getAttribute('data-type');
                    var activePage = this.state.pages.activePage || 0;
                    var widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                    switch (type) {
                        case 'top':
                            var max = this.getMaxZindex('max');
                            _Actions.Actions.changeSize('zIndex', max + 1);
                            break;
                        case 'up':
                            _Actions.Actions.upZIndexUserWidget();
                            break;
                        case 'down':
                            _Actions.Actions.downZIndexUserWidget();
                            break;
                        case 'bottom':
                            var min = this.getMaxZindex('min');
                            _Actions.Actions.changeSize('zIndex', min - 1);
                            break;
                        default:
                            ;
                    }
                },
                changeSize: function changeSize(e) {
                    e.preventDefault();
                    var type = e.target.getAttribute('data-typename');
                    var value = Number(e.target.value);
                    if (type == 'width' || type == 'height') value = value || 1;
                    _Actions.Actions.changeSize(type, value);
                },
                changeAlign: function changeAlign() {},
                ZIndexShow: function ZIndexShow(e) {
                    e.preventDefault();
                    this.refs.zIndexContent.getDOMNode().style.display = "block";
                },
                ZIndexHide: function ZIndexHide(e) {
                    this.refs.zIndexContent.getDOMNode().style.display = "none";
                },

                render: function render() {
                    var pageProShow = this.state.pages.activePage != -1 && this.state.pages.activeWidget == -1 ? true : false;
                    var protocolConfigs = this.state.protocolConfigs.length != 0 ? this.state.protocolConfigs : this.baseProtocolConfigs,
                        pages = this.state.pages,
                        activePage = this.state.pages.activePage,
                        activeWidget = this.state.pages.activeWidget,
                        pageList = this.state.pages.pageList,
                        widget = typeof pageList[activePage].widgetList[activeWidget] !== 'undefined' ? pageList[activePage].widgetList[activeWidget] : this.baseData;
                    if (widget.id === 1019 && pages.activeWidgetGrandchild > -1) {
                        //选项卡 指定选项的控件集合
                        widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                    }

                    var scheme = typeof widget.scheme !== 'undefined' ? widget.scheme : ['status', 'event'],
                        propertySet = widget.propertySet.length != 0 ? widget.propertySet : this.baseData.propertySet,
                        panelstyle = {
                        display: this.state.panelSwitch.propertyPanelSwitch == 1 && !pageProShow ? 'block' : 'none'
                    };
                    widget = typeof widget !== 'undefined' ? widget : { top: 0, left: 0, width: 1, height: 1, deg: 0, zIndex: 0 };
                    var grid = typeof widget.grid !== 'undefined' ? widget.grid : [];
                    var xValue = widget.left,
                        yValue = widget.top,
                        widgetWidth = widget.width,
                        widgetHeight = widget.height,
                        deg = widget.deg || 0;

                    var zIndex = widget.zIndex || 0;
                    var hierarchyContent = "";
                    if (grid.indexOf('hierarchy') != -1) {
                        hierarchyContent = _react2.default.createElement(
                            'div',
                            { className: 'property-show-list', style: panelstyle },
                            _react2.default.createElement(_ShowProperty.ShowProperty.getComponent, { item: propertySet[0], index: 0 }),
                            _react2.default.createElement(
                                'section',
                                { className: 'zIndex', ref: 'zIndex', onClick: this.changeZIndex, onMouseOver: this.ZIndexShow, onMouseOut: this.ZIndexHide },
                                _react2.default.createElement('span', { className: 'open' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'zIndex-content', ref: 'zIndexContent', 'data-type': 'zIndex-content' },
                                    _react2.default.createElement('label', { className: 'zIndex-top', 'data-type': 'top' }),
                                    _react2.default.createElement('label', { className: 'zIndex-up', 'data-type': 'up' }),
                                    _react2.default.createElement('label', { className: 'zIndex-down', 'data-type': 'down' }),
                                    _react2.default.createElement('label', { className: 'zIndex-bottom', 'data-type': 'bottom' })
                                )
                            ),
                            _react2.default.createElement('span', { 'data-typename': 'ratio', className: widget.isRatio == 1 ? 'geometric on' : 'geometric off', onClick: this.changeSize })
                        );
                    }
                    return _react2.default.createElement(
                        'div',
                        null,
                        hierarchyContent
                    );
                }
            });
        }
    }]);

    return WidgetsProperty;
}(_PanelBase2.PanelBase);

exports.default = WidgetsProperty;