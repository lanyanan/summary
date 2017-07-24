'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeStatusProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _ImageProperty = require('./ImageProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 图像组件(有档位滑块状态设置与图像类似,固套用)

var RangeStatusProperty = exports.RangeStatusProperty = {
    getComponent: _react2.default.createClass({
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
            _Actions.Actions.changeExterior('rangePercent', percent);
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
            var rangeNowd = this.props.rangeNowd ? this.props.rangeNowd : 1;
            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            if (!statusList.propertyConfigs[activestatusfield[rangeNowd - 1]]) return false;
            var valueType = statusList.propertyConfigs[activestatusfield[rangeNowd - 1]].valueType;
            if (rangeNowd - 1 !== 0 && !stallShow) return null;
            return _react2.default.createElement(
                'div',
                { className: 'rangeproperty' },
                _react2.default.createElement(
                    'section',
                    { className: 'status', key: rangeNowd - 1 },
                    _react2.default.createElement(
                        'span',
                        { className: 'statustitle' },
                        stallShow ? '变量数据显示' : '状态数据显示'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u5173\u8054\u6570\u636E'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: statusSet[rangeNowd - 1].statusField,
                                    'data-pid': rangeNowd - 1, 'data-type': j,
                                    onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u6570\u636E'
                                ),
                                statusList.propertyConfigs.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: k, value: O.property },
                                        O.propertyName
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'section',
                            { style: { display: stallShow ? 'block' : 'none' } },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u53C2\u6570'
                            ),
                            valueType == 'enum' ? _react2.default.createElement(
                                'select',
                                { value: statusSet.statusValue,
                                    'data-pid': rangeNowd - 1, 'data-type': j,
                                    onChange: this.changeValue },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u503C'
                                ),
                                statusSet.statusField ? statusList.propertyConfigs[activestatusfield[rangeNowd - 1]].options.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: k, value: O.value },
                                        O.meaning
                                    );
                                }) : null
                            ) : _react2.default.createElement('input', { type: valueType == 'number' || valueType == 'range' ? 'number' : 'text',
                                'data-pid': rangeNowd - 1, 'data-type': j,
                                'data-min': statusList.propertyConfigs[activestatusfield[rangeNowd - 1]].minValue,
                                'data-max': statusList.propertyConfigs[activestatusfield[rangeNowd - 1]].maxValue,
                                value: statusSet.statusValue, onChange: this.changeValue,
                                placeholder: statusSet.statusValue == '' ? '请输入值' : '' })
                        )
                    )
                )
            );
        }
    })
};