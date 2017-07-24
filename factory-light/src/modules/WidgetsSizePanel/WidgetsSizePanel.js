'use strict';

/**
 * 组件位置尺寸面板类
 * 提供控件各种位置尺寸设定
 * @author   xinglin
 * @datetime 2015-12-11
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

var WidgetsSizePanel = function (_PanelBase) {
    _inherits(WidgetsSizePanel, _PanelBase);

    function WidgetsSizePanel() {
        _classCallCheck(this, WidgetsSizePanel);

        return _possibleConstructorReturn(this, (WidgetsSizePanel.__proto__ || Object.getPrototypeOf(WidgetsSizePanel)).call(this));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */


    _createClass(WidgetsSizePanel, [{
        key: 'getComponent',
        value: function getComponent() {
            return _react2.default.createClass({
                mixins: [_reflux2.default.connect(_Store.Store)],
                getInitialState: function getInitialState() {
                    return {
                        panelSwitch: { sizePanelSwitch: 1 },
                        pages: {
                            activePage: 0,
                            activeWidget: -1,
                            pageList: [{
                                widgetList: [{
                                    top: 0,
                                    left: 0,
                                    width: 0,
                                    height: 0
                                }]
                            }]
                        }
                    };
                },
                close: function close(e) {
                    e.preventDefault();
                    _Actions.Actions.showPanel('sizePanel');
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
                    // let activeWidget = this.state.pages.activeWidget || 0;
                    // let activeIndex = widgetList[activeWidget].zIndex;
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
                render: function render() {
                    var pageProShow = this.state.pages.activePage != -1 && this.state.pages.activeWidget == -1 ? true : false;
                    var panelstyle = {
                        display: this.state.panelSwitch.sizePanelSwitch == 1 && !pageProShow ? 'block' : 'none'
                    },
                        activePage = this.state.pages.activePage,
                        activeWidget = this.state.pages.activeWidget,
                        widget = this.state.pages.pageList[activePage].widgetList[activeWidget];
                    widget = typeof widget !== 'undefined' ? widget : { top: 0, left: 0, width: 1, height: 1, deg: 0, zIndex: 0 };
                    var xValue = widget.left,
                        yValue = widget.top,
                        widgetWidth = widget.width,
                        widgetHeight = widget.height,
                        deg = widget.deg || 0,
                        zIndex = widget.zIndex || 0;
                    return _react2.default.createElement(
                        'div',
                        { style: panelstyle, className: 'sizeArea' },
                        _react2.default.createElement(
                            'header',
                            null,
                            '\u4F4D\u7F6E+\u5C3A\u5BF8'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sizebody' },
                            _react2.default.createElement(
                                'div',
                                { className: 'position' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u4F4D\u7F6E'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'row1' },
                                    'X'
                                ),
                                _react2.default.createElement('input', { className: 'row1', type: 'number', value: xValue, 'data-typename': 'x', onChange: this.changeSize }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'row2' },
                                    'Y'
                                ),
                                _react2.default.createElement('input', { className: 'row2', type: 'number', value: yValue, 'data-typename': 'y', onChange: this.changeSize })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'position' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u5C3A\u5BF8'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'row1' },
                                    '\u5BBD'
                                ),
                                _react2.default.createElement('input', { className: 'row1', type: 'number', value: widgetWidth, 'data-typename': 'width', onChange: this.changeSize, min: '1' }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'row2' },
                                    '\u9AD8'
                                ),
                                _react2.default.createElement('input', { className: 'row2', type: 'number', value: widgetHeight, 'data-typename': 'height', onChange: this.changeSize, min: '1' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'position' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u65CB\u8F6C'
                                ),
                                _react2.default.createElement('input', { 'data-typename': 'deg', value: deg, onChange: this.changeSize, type: 'number' })
                            ),
                            _react2.default.createElement(
                                'section',
                                { className: 'zIndex', onClick: this.changeZIndex },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u5C42\u7EA7'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { 'data-type': 'top' },
                                    '\u7F6E\u9876'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { 'data-type': 'up' },
                                    '\u7F6E\u4E0A'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { 'data-type': 'down' },
                                    '\u7F6E\u4E0B'
                                ),
                                _react2.default.createElement(
                                    'label',
                                    { 'data-type': 'bottom' },
                                    '\u7F6E\u5E95'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'position' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u7B49\u6BD4\u7F29\u653E'
                                ),
                                _react2.default.createElement('input', { 'data-typename': 'ratio', className: widget.isRatio == 1 ? 'on' : 'off', checked: widget.isRatio == 1 ? 'true' : '', onChange: this.changeSize, type: 'checkbox' })
                            )
                        )
                    );
                }
            });
        }
    }]);

    return WidgetsSizePanel;
}(_PanelBase2.PanelBase);

exports.default = WidgetsSizePanel;