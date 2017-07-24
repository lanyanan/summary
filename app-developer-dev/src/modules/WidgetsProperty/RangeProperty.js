'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _ImageProperty = require('./ImageProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 图像组件(有档位滑块状态设置与图像类似,固套用)

var RangeProperty = exports.RangeProperty = {
    getComponent: _react2.default.createClass({
        changeRangeSet: function changeRangeSet(e) {
            //更改滑块设置
            var value = e.target.value;
            var type = e.target.getAttribute('data-type');
            if (type === 'rateValue') {
                if (value > this.props.propertySet.maxValue - this.props.propertySet.minValue) {
                    alert('刻度过大,请不要大于最大最小值之差');
                    return;
                }
            }
            if (type === 'stallShow') {
                value = e.target.checked;
            }
            _Actions.Actions.changeStringProperty(0, type, value);
        },
        changeField: function changeField(e) {
            //更改选中的字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var options = null;
            if (e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum') {
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            if (fieldIndex) options = fieldIndex;
            _Actions.Actions.changeField(property, pid, type, options, byteLength);
        },
        changeValue: function changeValue(e) {
            //更改选中字段相应选中或输入值
            e.stopPropagation();
            var svalue = e.target.value;
            var min = Number(e.target.getAttribute('data-min'));
            var max = Number(e.target.getAttribute('data-max'));
            if (svalue !== '' && (min || max)) {
                svalue = svalue >= max ? max : svalue;
                svalue = svalue <= min ? min : svalue;
                if (svalue > 0) svalue = Number(svalue);
            }
            var pid = Number(e.currentTarget.getAttribute('data-pid')) || Number(e.target.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type')) || Number(e.target.getAttribute('data-type'));
            _Actions.Actions.changeValue(pid, type, svalue);
        },
        addStatus: function addStatus(e) {
            //添加一个状态
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.addStatus(index);
            this.props.toggleDiv(this.props.statusSet.length, 'status');
        },
        delStatus: function delStatus(e) {
            //删除指定的状态
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.delStatus(index);
        },
        toggleStatusDiv: function toggleStatusDiv(e) {
            //切换状态div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'status');
        },
        changeRangePercent: function changeRangePercent(e) {
            var percent = false;
            if (e.target.checked) {
                percent = true;
            }
            _Actions.Actions.changeWidgetInfo('rangePercent', percent);
        },
        changeDigitalSubtraction: function changeDigitalSubtraction(e) {
            e.stopPropagation();
            var account = e.target.value;
            _Actions.Actions.changeWidgetInfo('account', account);
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
            var rangePercent = this.props.rangePercent ? this.props.rangePercent : false;
            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            var id = this.props.id;
            var widget = this.props.widget;
            var account = widget.widgetInfo.account ? widget.widgetInfo.account : "";
            return _react2.default.createElement(
                'div',
                { className: 'rangeproperty' },
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u6700\u5C0F\u503C'
                        ),
                        _react2.default.createElement('input', { type: 'number', 'data-type': 'minValue', onChange: this.changeRangeSet, value: minValue })
                    ),
                    _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u6700\u5927\u503C'
                        ),
                        _react2.default.createElement('input', { type: 'number', 'data-type': 'maxValue', onChange: this.changeRangeSet, value: maxValue })
                    ),
                    _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u523B\u5EA6'
                        ),
                        _react2.default.createElement('input', { type: 'number', 'data-type': 'rateValue', onChange: this.changeRangeSet, value: rateValue })
                    ),
                    _react2.default.createElement(
                        'section',
                        { style: { display: id == 1007 ? "block" : "none" } },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u663E\u793A\u767E\u5206\u6BD4'
                        ),
                        _react2.default.createElement('input', { type: 'checkbox', 'data-type': 'stallShow', className: "checkstatus " + (rangePercent ? 'on' : 'off'), onChange: this.changeRangePercent, checked: rangePercent })
                    ),
                    _react2.default.createElement(
                        'section',
                        { style: { display: id == 1013 ? "block" : "none" } },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5355\u4F4D'
                        ),
                        _react2.default.createElement('input', { type: 'text', defaultValue: account, onChange: this.changeDigitalSubtraction })
                    )
                )
            );
        }
    })
};