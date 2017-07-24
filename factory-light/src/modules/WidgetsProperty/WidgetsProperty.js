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
                            pageList: [{ pageName: '主页', pageId: 0, widgetList: [] }]
                        },
                        showStatus: 0,
                        showEvent: 0
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
                    }]
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
                    }
                },
                render: function render() {
                    var _this2 = this;

                    var pageProShow = this.state.pages.activePage != -1 && this.state.pages.activeWidget == -1 ? true : false;
                    var protocolConfigs = this.state.protocolConfigs.length != 0 ? this.state.protocolConfigs : this.baseProtocolConfigs,
                        activePage = this.state.pages.activePage,
                        activeWidget = this.state.pages.activeWidget,
                        pageList = this.state.pages.pageList,
                        widget = typeof pageList[activePage].widgetList[activeWidget] !== 'undefined' ? pageList[activePage].widgetList[activeWidget] : this.baseData,
                        scheme = typeof widget.scheme !== 'undefined' ? widget.scheme : ['status', 'event'],
                        propertySet = widget.propertySet.length != 0 ? widget.propertySet : this.baseData.propertySet,
                        activestatusfield = [],
                        activeeventfield = [],
                        dataList = [],
                        statusList = [],
                        statusIndex = void 0,
                        eventList = [],
                        eventIndex = void 0,
                        showStatus = this.state.showStatus || 0,
                        showEvent = this.state.showEvent || 0,
                        panelstyle = {
                        display: this.state.panelSwitch.propertyPanelSwitch == 1 && !pageProShow ? 'block' : 'none'
                    };
                    var isStatusData = false; //防止协议不完整(缺少运行数据)时组件被过滤
                    var isEventData = false; //防止协议不完整(缺少控制数据)时组件被过滤
                    protocolConfigs.map(function (P, i) {
                        if (P.type == 3) isStatusData = true;
                        if (P.type == 2) isEventData = true;
                    });
                    if (!isStatusData) protocolConfigs.push({
                        typeName: "运行数据",
                        type: 3,
                        propertyConfigs: null
                    });
                    if (!isEventData) protocolConfigs.push({
                        typeName: "控制数据",
                        type: 2,
                        propertyConfigs: null
                    });
                    protocolConfigs.sort(function (a, b) {
                        return b.type - a.type;
                    }).map(function (P, i) {
                        if (P.type == 2) {
                            dataList = P.propertyConfigs; //控制数据字段给到复合指令面板
                            eventList = P;
                            eventIndex = i;
                        }
                        if (P.type == 3) {
                            statusList = P;
                            statusIndex = i;
                        }
                        P.propertyConfigs = P.propertyConfigs instanceof Array ? P.propertyConfigs : [{
                            propertyName: null,
                            unit: null,
                            minValue: null,
                            property: null,
                            valueType: 'text',
                            index: null,
                            defaultValue: null,
                            maxValue: null,
                            options: null
                        }]; //过滤掉非法协议
                        P.propertyConfigs.map(function (Q, j) {
                            propertySet[0].statusSet.map(function (R, k) {
                                P.type == 3 && Q.property == R.statusField ? activestatusfield[k] = j : '';
                                P.type == 3 && !R.statusField ? activestatusfield[k] = 0 : '';
                            }); //遍历确定以前被选中的状态字段以及值
                            propertySet[0].eventSet.map(function (S, h) {
                                P.type == 2 && Q.property == S.eventField ? activeeventfield[h] = j : '';
                                P.type == 2 && !S.eventField ? activeeventfield[h] = 0 : '';
                            }); //遍历确定以前被选中的事件字段以及值
                        }); //遍历来确定以前被选中的字段以及值
                    });
                    return _react2.default.createElement(
                        'div',
                        { ref: 'propertyArea', style: panelstyle, className: 'propertyArea' },
                        _react2.default.createElement(
                            'header',
                            null,
                            widget.originCaption || '控件'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'propertybody' },
                            _react2.default.createElement(_ShowProperty.ShowProperty.getComponent, { item: propertySet[0], index: 0 }),
                            scheme.map(function (comp, c) {
                                switch (comp) {
                                    case 'caption':
                                        return _react2.default.createElement(_CaptionProperty.CaptionProperty.getComponent, { key: comp, item: widget.caption });
                                        break;
                                    case 'text':
                                        return _react2.default.createElement(_TextProperty.TextProperty.getComponent, { key: comp, item: propertySet[0], editText: widget.editText, index: 0 });
                                        break;
                                    case 'color':
                                        return _react2.default.createElement(_ColorProperty.ColorProperty.getComponent, { key: comp, item: propertySet[0], index: 0 });
                                        break;
                                    case 'fontStyle':
                                        return _react2.default.createElement(_fontStyleProperty.fontStyleProperty.getComponent, { key: comp, item: propertySet[0], index: 0 });
                                        break;
                                    case 'switch':
                                        return _react2.default.createElement(_SwitchProperty.SwitchProperty.getComponent, { key: comp, statusSet: propertySet[0].statusSet, eventSet: propertySet[0].eventSet, statusList: statusList,
                                            scheme: scheme, showStatus: showStatus, eventList: eventList, eventIndex: eventIndex, activeeventfield: activeeventfield,
                                            activefield: activestatusfield, propertySet: propertySet[0], Jindex: statusIndex, toggleDiv: _this2.toggleDiv, showEvent: showEvent,
                                            widget: widget, widgetList: pageList[activePage].widgetList, dataList: dataList, pageList: pageList, activePage: activePage });
                                        break;
                                    case 'time':
                                        return _react2.default.createElement(_TimeProperty.TimeProperty.getComponent, { key: comp, propertySet: propertySet[0], item: propertySet[0].eventSet[0], Pitem: eventList, scheme: scheme,
                                            statusList: statusList, activestatusfield: activestatusfield, showEvent: showEvent, Iindex: 0, activefield: activeeventfield,
                                            widget: widget, toggleDiv: _this2.toggleDiv, statusIndex: statusIndex, Jindex: eventIndex });
                                        break;
                                    case 'range':
                                        return _react2.default.createElement(_RangeProperty.RangeProperty.getComponent, { key: comp, statusSet: propertySet[0].statusSet, statusList: statusList, toggleDiv: _this2.toggleDiv, propertySet: propertySet[0],
                                            activefield: activestatusfield, Jindex: statusIndex, showStatus: showStatus, scheme: scheme });
                                        break;
                                    case 'colorPicker':
                                        return _react2.default.createElement(_ColorPickerProperty.ColorPickerProperty.getComponent, { key: comp, propertySet: propertySet[0], item: propertySet[0].eventSet[0], Pitem: eventList, scheme: scheme, activefield: activeeventfield,
                                            widget: widget, toggleDiv: _this2.toggleDiv, Jindex: eventIndex, showEvent: showEvent, Iindex: 0 });
                                        break;
                                    default:
                                        ;
                                }
                            }),
                            protocolConfigs.sort(function (a, b) {
                                return b.type - a.type;
                            }).map(function (F, j) {
                                if (F.type == '3' && (scheme.indexOf('status') > -1 || scheme.indexOf('statusshow') > -1)) {
                                    return _react2.default.createElement(
                                        'section',
                                        { key: j },
                                        propertySet[0].statusSet.map(function (status, index) {
                                            return _react2.default.createElement(_StatusProperty.StatusProperty.getComponent, { key: index, item: status, Pitem: F, scheme: scheme, showStatus: showStatus,
                                                Iindex: index, activefield: activestatusfield, propertySet: propertySet[0], Jindex: j, toggleDiv: _this2.toggleDiv });
                                        })
                                    );
                                } else if (F.type == '2' && scheme.indexOf('event') > -1) {
                                    return _react2.default.createElement(
                                        'section',
                                        { key: j },
                                        propertySet[0].eventSet.map(function (event, index) {
                                            return _react2.default.createElement(_EventProperty.EventProperty.getComponent, { key: index, item: event, Pitem: F, pageList: pageList, activePage: activePage, showEvent: showEvent,
                                                Iindex: index, activefield: activeeventfield, widget: widget, widgetList: pageList[activePage].widgetList, toggleDiv: _this2.toggleDiv,
                                                dataList: dataList, Jindex: j, scheme: scheme });
                                        })
                                    );
                                }
                            })
                        )
                    );
                }
            });
        }
    }]);

    return WidgetsProperty;
}(_PanelBase2.PanelBase);

exports.default = WidgetsProperty;