'use strict';

/**
 * 组件外观面板类
 * 提供控件各种外观设定
 * @author   xinglin
 * @datetime 2015-12-18
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetsExterior = function (_PanelBase) {
    _inherits(WidgetsExterior, _PanelBase);

    function WidgetsExterior() {
        _classCallCheck(this, WidgetsExterior);

        return _possibleConstructorReturn(this, (WidgetsExterior.__proto__ || Object.getPrototypeOf(WidgetsExterior)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(WidgetsExterior, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        panelSwitch: { exteriorPanelSwitch: 1 },
                        pages: {
                            activePage: 0,
                            activeWidget: -1,
                            pageList: [{
                                widgetList: [{
                                    fgColor: '',
                                    borderColor: '',
                                    bgColor: '',
                                    widgetOpacity: 100,
                                    boderWidth: 0
                                }]
                            }]
                        }
                    };
                },
                close: function close(e) {
                    e.preventDefault();
                    _Actions.Actions.showPanel('exteriorPanel');
                },
                colorPick: function colorPick(e) {
                    var colorstyle = e.target.getAttribute('data-value') || e.target.getAttribute('data-symbol');
                    var newcolor = e.target.value;
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
                changeOpacity: function changeOpacity(e) {
                    var opacity = Number(e.target.value);
                    _Actions.Actions.changeWidgetOpacity(opacity);
                },
                borderWidth: function borderWidth(e) {
                    var borderwidth = Number(e.target.value);
                    _Actions.Actions.changeBorderWidth(borderwidth);
                },
                changeRadius: function changeRadius(e) {
                    var borderRadius = Number(e.target.value);
                    _Actions.Actions.changeExterior('borderRadius', borderRadius);
                },
                changeAlign: function changeAlign(e) {
                    var textAlign = e.target.getAttribute('data-value');
                    _Actions.Actions.changeExterior('textAlign', textAlign);
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

                render: function render() {
                    var pages = this.state.pages,
                        activePage = pages.activePage,
                        activeWidget = pages.activeWidget,
                        widget = pages.pageList[activePage].widgetList[activeWidget];
                    if (widget && widget.id === 1019 && pages.activeWidgetGrandchild > -1) {
                        //选项卡 指定选项的控件集合
                        widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                    }

                    if (widget && widget.id === 1020 && pages.activeWidgetGridChild > -1) {
                        //九宫格
                        widget = widget.gridChildList[pages.activeWidgetGridChild];
                    }

                    widget = typeof widget !== 'undefined' ? widget : {
                        fgColor: '',
                        borderColor: '',
                        bgColor: '',
                        borderRadius: 0,
                        widgetOpacity: 100,
                        borderWidth: 0 };
                    var grid = typeof widget.grid !== 'undefined' ? widget.grid : [];
                    var pageProShow = pages.activePage != -1 && pages.activeWidget == -1 ? true : false;
                    var foreground = widget.fgColor,
                        bordercolor = widget.borderColor,
                        bgcolor = widget.bgColor,
                        opacity = widget.widgetOpacity,
                        radius = widget.borderRadius ? widget.borderRadius : 0,
                        borderWidth = widget.borderWidth ? widget.borderWidth : 0,
                        panelstyle = {
                        display: this.state.panelSwitch.exteriorPanelSwitch == 1 && !pageProShow ? 'block' : 'none'
                    };
                    var exteriorContent = ""; //外观内容
                    if (grid.indexOf('exterior') != -1) {
                        exteriorContent = _react2.default.createElement(
                            'div',
                            { ref: 'exteriorArea', style: panelstyle, className: 'exteriorArea', onClick: this.toggleView },
                            _react2.default.createElement(
                                'header',
                                null,
                                '\u5916\u89C2 ',
                                _react2.default.createElement('span', { className: 'close' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'exteriorbody' },
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u80CC\u666F\u989C\u8272'
                                    ),
                                    _react2.default.createElement('input', { 'data-symbol': 'bgcolor', value: bgcolor ? bgcolor : "#3a7ff5", onChange: this.colorPick }),
                                    _react2.default.createElement('input', { type: 'color', value: '#efefef', style: { backgroundColor: bgcolor }, className: 'extendblock', onChange: this.colorPick, 'data-value': 'bgcolor' })
                                ),
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u8FB9\u6846\u989C\u8272'
                                    ),
                                    _react2.default.createElement('input', { 'data-symbol': 'bordercolor', value: bordercolor ? bordercolor : "#3a7ff5", onChange: this.colorPick }),
                                    _react2.default.createElement('input', { type: 'color', value: '#efefef', style: { backgroundColor: bordercolor }, className: 'extendblock', onChange: this.colorPick, 'data-value': 'bordercolor' })
                                ),
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u4E0D\u900F\u660E\u5EA6'
                                    ),
                                    _react2.default.createElement('input', { type: 'number', value: opacity, onChange: this.changeOpacity, min: '0', max: '100' })
                                ),
                                _react2.default.createElement(
                                    'section',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u8FB9\u6846\u5706\u89D2'
                                    ),
                                    _react2.default.createElement('input', { type: 'number', 'data-symbol': 'brradus', value: radius, onChange: this.changeRadius, min: '0', max: '100' }),
                                    _react2.default.createElement('button', { className: 'extendradius' }),
                                    _react2.default.createElement(
                                        'em',
                                        { className: 'pixel' },
                                        'px'
                                    )
                                ),
                                _react2.default.createElement(
                                    'section',
                                    { className: 'clear' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u8FB9\u6846\u5BBD\u5EA6'
                                    ),
                                    _react2.default.createElement('input', { type: 'number', value: borderWidth, onChange: this.borderWidth, min: '0' }),
                                    _react2.default.createElement(
                                        'em',
                                        { className: 'pixel' },
                                        'px'
                                    )
                                )
                            )
                        );
                    }
                    return _react2.default.createElement(
                        'div',
                        null,
                        exteriorContent
                    );
                }
            });
        }
    }]);

    return WidgetsExterior;
}(_PanelBase2.PanelBase);

exports.default = WidgetsExterior;