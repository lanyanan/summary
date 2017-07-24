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

var _textAlignProperty = require('./textAlignProperty');

var _solidProperty = require('./solidProperty');

var _widthProperty = require('./widthProperty');

var _toneProperty = require('./toneProperty');

var _rangeStatusProperty = require('./rangeStatusProperty');

var _rangeVariableProperty = require('./rangeVariableProperty');

var _widgetStyleProperty = require('./widgetStyleProperty');

var _processVariableProperty = require('./processVariableProperty');

var _ColorPickerTypeProperty = require('./ColorPickerTypeProperty');

var _RanksProperty = require('./RanksProperty');

var _imageChoce = require('./imageChoce');

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
//文字文字组件
//实心空心组件
//通栏组件
//按钮颜色选择器
//滑块关联数据
//滑块变量组件
//控件样式组件
//过程变量组件
//顏色样式组件
//九宫格行列样式组件


//宫格图标

var WidgetsProperty = function (_PanelBase) {
    _inherits(WidgetsProperty, _PanelBase);

    function WidgetsProperty() {
        _classCallCheck(this, WidgetsProperty);

        return _possibleConstructorReturn(this, (WidgetsProperty.__proto__ || Object.getPrototypeOf(WidgetsProperty)).call(this));
    }

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
                            pageList: [{ pageName: '主页', pageId: 0, widgetList: [] }]
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
                    widgetInfo: {
                        rangeType: "continuity", //滑块类型
                        rangeStyle: 0, //滑块样式
                        rangeNowd: 1, //滑块当前档位
                        rangePercent: false, //滑块百分比
                        switchStyle: 0, //开关样式,
                        popupButtonBgColor: null, //弹窗按钮颜色
                        processNowd: 1, //当前过程，
                        row: 1,
                        column: 2
                    }
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
                toggleView: function toggleView(e) {
                    if (e.target.className == "close") {
                        e.target.parentNode.nextElementSibling.style.display = "none";
                        e.target.className = "open";
                    } else if (e.target.className == "open") {
                        e.target.parentNode.nextElementSibling.style.display = "block";
                        e.target.className = "close";
                    }
                },


                addEvent: function addEvent(length, e) {
                    //添加一个点击事件
                    var index = Number(e.target.getAttribute('data-index'));
                    _Actions.Actions.addEvent(index);
                    this.toggleDiv(length, 'event');
                },
                addStatus: function addStatus(length, e) {
                    //添加一个状态
                    var index = Number(e.target.getAttribute('data-index'));
                    _Actions.Actions.addStatus(index);
                    this.toggleDiv(length, 'status');
                },
                addMode: function addMode(length1, length2, e) {
                    //添加模式  即添加一个点击事件跟一个状态
                    var index = Number(e.target.getAttribute('data-index'));
                    _Actions.Actions.addEvent(index);
                    _Actions.Actions.addStatus(index);
                    this.toggleDiv(length1, 'event');
                    this.toggleDiv(length2, 'status');
                },
                render: function render() {
                    var _this2 = this;

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
                    if (widget.id === 1020 && pages.activeWidgetGridChild > -1) {
                        //九宫格
                        widget = widget.gridChildList[pages.activeWidgetGridChild];
                    }

                    var scheme = typeof widget.scheme !== 'undefined' ? widget.scheme : ['status', 'event'],
                        grid = typeof widget.grid !== 'undefined' ? widget.grid : [],
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
                        showMode = this.state.showMode || 0,
                        showTab = this.state.showTab || 0,
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

                    console.log(widget);
                    var widgetInfo = widget.widgetInfo ? widget.widgetInfo : {}; //组件属性，辅助
                    var styleContent = ""; //样式内容
                    if (grid.indexOf('style') != -1) {
                        styleContent = _react2.default.createElement(
                            'div',
                            { className: 'property-style-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u6837\u5F0F ',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                scheme.map(function (comp, c) {
                                    switch (comp) {
                                        case 'buttonWidth':
                                            return _react2.default.createElement(_widthProperty.WidthProperty.getComponent, { key: comp, widgetWidth: widget.width });
                                            break;
                                        case 'buttonSolid':
                                            return _react2.default.createElement(_solidProperty.SolidProperty.getComponent, { key: comp, bgColor: widget.bgColor, borderColor: widget.borderColor, pid: propertySet[0].propertyId });
                                            break;
                                        case 'tone':
                                            return _react2.default.createElement(_toneProperty.ToneProperty.getComponent, { key: comp, widget: widget, propertySet: propertySet[0] });
                                            break;
                                        case 'widgetStyle':
                                            return _react2.default.createElement(_widgetStyleProperty.WidgetStyleProperty.getComponent, { key: comp, widget: widget, propertySet: propertySet[0] });
                                            break;
                                        case 'rangeType':
                                            return _react2.default.createElement(_widgetStyleProperty.WidgetStyleProperty.getComponent, { key: comp, widget: widget, propertySet: propertySet[0], rangeTypeWidget: true });
                                            break;
                                        case 'colorType':
                                            return _react2.default.createElement(_ColorPickerTypeProperty.ColorPickerTypeProperty.getComponent, { key: comp, item: propertySet[0], colorType: widget.activeType });
                                            break;
                                        case 'ranks':
                                            return _react2.default.createElement(_RanksProperty.RanksProperty.getComponent, { key: comp, column: widgetInfo.column, row: widgetInfo.row });
                                            break;
                                        case 'speeddialShape':
                                            return _react2.default.createElement(_widgetStyleProperty.WidgetStyleProperty.getComponent, { key: comp, widget: widget, propertySet: propertySet[0], speedDialShape: true });
                                            break;
                                        default:
                                            ;
                                    }
                                })
                            )
                        );
                    }

                    var processVariable = ""; //过程内容
                    if (widget.id == 1018) {
                        processVariable = _react2.default.createElement(
                            'div',
                            { className: 'property-scope-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u8FC7\u7A0B',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(_processVariableProperty.ProcessVariableProperty.getComponent, { statusSet: propertySet[0].statusSet, statusList: statusList, propertySet: propertySet[0],
                                    activefield: activestatusfield, Jindex: statusIndex, showStatus: showStatus, processColorArr: widgetInfo.processColorArr, processNowd: widgetInfo.processNowd })
                            )
                        );
                    }

                    var scopeContent = ""; //范围内容
                    if (grid.indexOf('scope') != -1) {
                        //范围,只有滑块连续型有和数字加减有，
                        var scopeShow = true;
                        if (widget.id == 1007 && widgetInfo.rangeType) {
                            if (widgetInfo.rangeType != 'continuity') {
                                scopeShow = false;
                            }
                        };
                        scopeContent = _react2.default.createElement(
                            'div',
                            { className: 'property-scope-list', style: { display: scopeShow ? 'block' : 'none' }, onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u8303\u56F4 ',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                scheme.map(function (comp, c) {
                                    switch (comp) {
                                        case 'range':
                                            return _react2.default.createElement(_RangeProperty.RangeProperty.getComponent, { key: comp, id: widget.id, widget: widget, statusSet: propertySet[0].statusSet, rangePercent: widgetInfo.rangePercent, statusList: statusList, toggleDiv: _this2.toggleDiv, propertySet: propertySet[0],
                                                activefield: activestatusfield, Jindex: statusIndex, showStatus: showStatus, scheme: scheme });
                                            break;
                                        default:
                                            ;
                                    }
                                })
                            )
                        );
                    }

                    var rangeVariable = ""; //变量内容 ，只有滑块离散型有
                    if (widget.id == 1007 && widgetInfo.rangeType && widgetInfo.rangeType == 'dispersed') {
                        rangeVariable = _react2.default.createElement(
                            'div',
                            { className: 'property-scope-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u53D8\u91CF',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(_rangeVariableProperty.RangeVariableProperty.getComponent, { statusSet: propertySet[0].statusSet, rangePercent: widget.rangePercent, statusList: statusList, toggleDiv: this.toggleDiv, propertySet: propertySet[0],
                                    activefield: activestatusfield, Jindex: statusIndex, showStatus: showStatus, scheme: scheme, rangeNowd: widgetInfo.rangeNowd })
                            )
                        );
                    }

                    var selectContent = ""; //选项内容
                    if (grid.indexOf('select') != -1) {
                        selectContent = _react2.default.createElement(
                            'div',
                            { className: 'property-scope-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u9009\u9879',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                scheme.map(function (comp, c) {
                                    switch (comp) {
                                        case 'select':
                                            return _react2.default.createElement(_TabProperty.TabProperty.getComponent, { key: comp, index: 0, activeTabIndex: _this2.state.pages.activeWidgetChild, activeWidget: activeWidget,
                                                priority: widget.priority ? widget.priority : '', widgetListItem: widget.widgetListItem, toggleDiv: _this2.toggleDiv, showTab: showTab, Iindex: 0 });
                                            break;
                                        default:
                                            ;
                                    }
                                })
                            )
                        );
                    }
                    var textContent = []; //文本内容
                    if (grid.indexOf('text') != -1) {
                        textContent = _react2.default.createElement(
                            'div',
                            { className: 'property-text-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u6587\u672C ',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { 'data-show': 'true' },
                                scheme.map(function (comp, c) {
                                    switch (comp) {
                                        case 'text':
                                            return _react2.default.createElement(_TextProperty.TextProperty.getComponent, { key: comp, item: propertySet[0], id: widget.id, editText: widget.editText, index: 0 });
                                            break;
                                        case 'title':
                                            return _react2.default.createElement(_TitleProperty.TitleProperty.getComponent, { key: comp, title: widget.title, index: 0, item: propertySet[0] });
                                            break;
                                        case 'bottonDetail':
                                            return _react2.default.createElement(_BottonDetailProperty.BottonDetailProperty.getComponent, { key: comp, bottonDetail: widget.bottonDetail, index: 0, item: propertySet[0] });
                                            break;
                                        case 'color':
                                            return _react2.default.createElement(_ColorProperty.ColorProperty.getComponent, { key: comp, item: propertySet[0], index: 0, scheme: scheme });
                                            break;
                                        case 'fontStyle':
                                            return _react2.default.createElement(_fontStyleProperty.fontStyleProperty.getComponent, { key: comp, item: propertySet[0], index: 0 });
                                            break;
                                        case 'opacity':
                                            return _react2.default.createElement(_OpacityProperty.OpacityProperty.getComponent, { key: comp, item: propertySet[0], index: 0 });
                                            break;
                                        case 'time':
                                            return _react2.default.createElement(_TimeProperty.TimeProperty.getComponent, { key: comp, propertySet: propertySet[0], item: propertySet[0].eventSet[0], Pitem: eventList, scheme: scheme,
                                                statusList: statusList, activestatusfield: activestatusfield, showEvent: showEvent, Iindex: 0, activefield: activeeventfield,
                                                widget: widget, isText: true, toggleDiv: _this2.toggleDiv, statusIndex: statusIndex, Jindex: eventIndex });
                                            break;
                                        case 'colorPicker':
                                            return _react2.default.createElement(_ColorPickerProperty.ColorPickerProperty.getComponent, { key: comp, propertySet: propertySet[0], item: propertySet[0].eventSet[0], Pitem: eventList, scheme: scheme, activefield: activeeventfield,
                                                widget: widget, toggleDiv: _this2.toggleDiv, Jindex: eventIndex, showEvent: showEvent, Iindex: 0 });
                                            break;
                                        case 'textalign':
                                            return _react2.default.createElement(_textAlignProperty.TextAlignProperty.getComponent, { key: comp, textAlign: widget.textAlign });
                                            break;
                                        case 'popupButtonTone':
                                            return _react2.default.createElement(_toneProperty.ToneProperty.getComponent, { key: comp, item: propertySet[0], toneType: comp });
                                            break;
                                        case 'imagechoce':
                                            return _react2.default.createElement(_imageChoce.ImageChoce.getComponent, { key: comp, widget: widget });
                                            break;

                                        default:
                                            ;
                                    }
                                })
                            )
                        );
                    }

                    var interactiveContent = ""; //交互内容
                    if (grid.indexOf('interactive') != -1) {
                        interactiveContent = _react2.default.createElement(
                            'div',
                            { className: 'property-interactive-list', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u4EA4\u4E92',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                scheme.map(function (comp, c) {
                                    switch (comp) {
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
                                        case 'colorPicker':
                                            return _react2.default.createElement(_ColorPickerProperty.ColorPickerProperty.getComponent, { key: comp, propertySet: propertySet[0], item: propertySet[0].eventSet[0], Pitem: eventList, scheme: scheme, activefield: activeeventfield,
                                                widget: widget, toggleDiv: _this2.toggleDiv, Jindex: eventIndex, showEvent: showEvent, Iindex: 0 });
                                            break;
                                        default:
                                            ;
                                    }
                                }),
                                scheme.map(function (comp, c) {
                                    switch (comp) {
                                        case 'scopeStatus':
                                            return _react2.default.createElement(_rangeStatusProperty.RangeStatusProperty.getComponent, { key: comp, rangeNowd: widgetInfo.rangeNowd, statusSet: propertySet[0].statusSet, rangePercent: widgetInfo.rangePercent, statusList: statusList, toggleDiv: _this2.toggleDiv, propertySet: propertySet[0],
                                                activefield: activestatusfield, Jindex: statusIndex, showStatus: showStatus, scheme: scheme });
                                            break;
                                        default:
                                            ;
                                    }
                                }),
                                protocolConfigs.sort(function (a, b) {
                                    return b.type - a.type;
                                }).map(function (F, j) {
                                    if (F.type == '2' && scheme.indexOf('event') > -1) {
                                        return _react2.default.createElement(
                                            'section',
                                            { key: j },
                                            _react2.default.createElement(
                                                'section',
                                                { className: 'addevent', 'data-index': widget.propertySet[0].eventSet.length - 1, onClick: _this2.addEvent.bind(_this2, widget.propertySet[0].eventSet.length) },
                                                _react2.default.createElement(
                                                    'em',
                                                    null,
                                                    '+'
                                                ),
                                                '\u6DFB\u52A0\u70B9\u51FB\u4E8B\u4EF6'
                                            ),
                                            propertySet[0].eventSet.map(function (event, index) {
                                                return _react2.default.createElement(_EventProperty.EventProperty.getComponent, { key: index, item: event, Pitem: F, pageList: pageList, activePage: activePage, showEvent: showEvent,
                                                    Iindex: index, activefield: activeeventfield, widget: widget, widgetList: pageList[activePage].widgetList, toggleDiv: _this2.toggleDiv,
                                                    dataList: dataList, Jindex: j, scheme: scheme });
                                            })
                                        );
                                    } else if (F.type == '3' && (scheme.indexOf('status') > -1 || scheme.indexOf('statusshow') > -1)) {
                                        return _react2.default.createElement(
                                            'section',
                                            { key: j },
                                            widget.id == 1001 || widget.id == 1002 ? null : _react2.default.createElement(
                                                'section',
                                                { className: 'addstatus', 'data-index': widget.propertySet[0].eventSet.length - 1, onClick: _this2.addStatus },
                                                _react2.default.createElement(
                                                    'em',
                                                    null,
                                                    '+'
                                                ),
                                                '\u6DFB\u52A0\u72B6\u6001'
                                            ),
                                            propertySet[0].statusSet.map(function (status, index) {
                                                return _react2.default.createElement(_StatusProperty.StatusProperty.getComponent, { key: index, item: status, Pitem: F, scheme: scheme, showStatus: showStatus,
                                                    Iindex: index, activefield: activestatusfield, propertySet: propertySet[0], Jindex: j, toggleDiv: _this2.toggleDiv });
                                            })
                                        );
                                    } else if (F.type == '2' && scheme.indexOf('mode') > -1) {
                                        return _react2.default.createElement(
                                            'section',
                                            { key: j },
                                            _react2.default.createElement(
                                                'section',
                                                { className: 'addmode', 'data-index': widget.propertySet[0].statusSet.length - 1, onClick: _this2.addMode.bind(_this2, propertySet[0].eventSet.length, propertySet[0].statusSet.length) },
                                                _react2.default.createElement(
                                                    'em',
                                                    null,
                                                    '+'
                                                ),
                                                '\u6DFB\u52A0\u6A21\u5F0F'
                                            ),
                                            propertySet[0].statusSet.map(function (status, index) {
                                                return _react2.default.createElement(_ModeProperty.ModeProperty.getComponent, { key: index, propertySet: propertySet[0], eventSet: propertySet[0].eventSet, eventList: eventList, scheme: scheme,
                                                    statusSet: propertySet[0].statusSet, statusList: statusList, activestatusfield: activestatusfield, showMode: showMode, Iindex: index, activeeventfield: activeeventfield,
                                                    widget: widget, toggleDiv: _this2.toggleDiv, statusIndex: statusIndex, eventIndex: eventIndex, activefield: activestatusfield,
                                                    widgetList: pageList[activePage].widgetList, dataList: dataList, pageList: pageList, activePage: activePage });
                                            })
                                        );
                                    } else if (F.type == '2' && scheme.indexOf('process') > -1) {
                                        return _react2.default.createElement(
                                            'section',
                                            { key: j },
                                            _react2.default.createElement(_ProcessProperty.ProcessProperty.getComponent, { processNowd: widgetInfo.processNowd, propertySet: propertySet[0], scheme: scheme, Pitem: F, Jindex: j,
                                                statusSet: propertySet[0].statusSet, statusList: statusList, activestatusfield: activestatusfield, showStatus: showStatus,
                                                widget: widget, toggleDiv: _this2.toggleDiv, statusIndex: statusIndex, activefield: activestatusfield })
                                        );
                                    }
                                })
                            )
                        );
                    }

                    return _react2.default.createElement(
                        'div',
                        { ref: 'propertyArea', style: panelstyle, className: 'propertyArea' },
                        _react2.default.createElement(
                            'header',
                            null,
                            _react2.default.createElement(
                                'em',
                                null,
                                '\u9875\u9762\xA0/\xA0'
                            ),
                            widget.originCaption || '控件'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'propertybody' },
                            _react2.default.createElement(_CaptionProperty.CaptionProperty.getComponent, { item: widget.caption }),
                            styleContent,
                            selectContent,
                            processVariable,
                            scopeContent,
                            rangeVariable,
                            textContent,
                            interactiveContent
                        )
                    );
                }
            });
        }
    }]);

    return WidgetsProperty;
}(_PanelBase2.PanelBase);

exports.default = WidgetsProperty;