'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeVariableProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _ImageProperty = require('./ImageProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 图像组件(有档位滑块状态设置与图像类似,固套用)

var RangeVariableProperty = exports.RangeVariableProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {};
        },
        addStatus: function addStatus(e) {
            //添加一个状态
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.addStatus(index - 1);
            _Actions.Actions.changeWidgetInfo('rangeNowd', index + 1);
        },
        delStatus: function delStatus(e) {
            //删除指定的状态
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.delStatus(index - 1);
            _Actions.Actions.changeWidgetInfo('rangeNowd', index - 1);
        },
        statusChange: function statusChange(e) {
            var num = e.target.value;
            _Actions.Actions.changeWidgetInfo('rangeNowd', num);
        },

        render: function render() {
            var statusSet = this.props.statusSet,
                statusList = this.props.statusList,
                activestatusfield = this.props.activefield,
                propertySet = this.props.propertySet || {},
                j = this.props.Jindex;
            var minValue = typeof propertySet.minValue !== 'undefined' ? propertySet.minValue : 0;
            var maxValue = typeof propertySet.maxValue !== 'undefined' ? propertySet.maxValue : 100;
            var rateValue = typeof propertySet.rateValue !== 'undefined' ? propertySet.rateValue : 1;
            var stallShow = typeof propertySet.stallShow !== 'undefined' ? propertySet.stallShow : false;
            var rangeNumber = this.props.scheme.indexOf('stall');
            if (rangeNumber !== -1) stallShow = false;
            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            var rangeNowd = this.props.rangeNowd ? this.props.rangeNowd : 1;
            return _react2.default.createElement(
                'div',
                { className: 'rangeproperty rangeVariable' },
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6570\u91CF'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'rangeVariable-num' },
                        _react2.default.createElement(
                            'em',
                            { className: 'rangeVariable-sub', 'data-index': statusSet.length, onClick: this.delStatus },
                            '-'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            statusSet.length
                        ),
                        _react2.default.createElement(
                            'em',
                            { className: 'rangeVariable-add', 'data-index': statusSet.length, onClick: this.addStatus },
                            '+'
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5F53\u524D\u53D8\u91CF'
                    ),
                    _react2.default.createElement(
                        'select',
                        { onChange: this.statusChange, value: rangeNowd },
                        statusSet.map(function (item, index) {
                            return _react2.default.createElement(
                                'option',
                                { value: index + 1, key: index },
                                index + 1
                            );
                        })
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_ImageProperty.ImageProperty.getComponent, { item: statusSet[rangeNowd - 1] && statusSet[rangeNowd - 1], index: rangeNowd - 1, uploadHidden: true, showStall: stallShow })
                    )
                )
            );
        }
    })
};