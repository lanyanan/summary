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
        render: function render() {
            var _this = this;

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
                        'div',
                        { className: 'showproperty', style: { display: rangeNumber === -1 ? 'block' : 'none' } },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u663E\u793A\u6863\u4F4D'
                        ),
                        _react2.default.createElement('input', { type: 'checkbox', 'data-type': 'stallShow', style: { marginLeft: 185 + 'px' }, className: "checkstatus " + (stallShow ? 'on' : 'off'), onChange: this.changeRangeSet, checked: stallShow })
                    )
                ),
                statusSet.map(function (statusSet, i) {
                    var valueType = statusList.propertyConfigs[activestatusfield[i]].valueType;
                    if (i !== 0 && !stallShow) return null;
                    return _react2.default.createElement(
                        'section',
                        { className: 'status', key: i },
                        _react2.default.createElement(
                            'span',
                            { className: 'statustitle' },
                            stallShow ? '档位' : '状态'
                        ),
                        _react2.default.createElement('span', { className: 'toggle ' + (_this.props.showStatus == i ? 'on' : 'off'), 'data-index': i, onClick: _this.toggleStatusDiv }),
                        _react2.default.createElement('span', { className: 'del', 'data-index': i, onClick: _this.delStatus }),
                        _react2.default.createElement(
                            'div',
                            { style: { display: _this.props.showStatus == i ? '' : 'none' } },
                            stallShow ? _react2.default.createElement(_ImageProperty.ImageProperty.getComponent, { item: statusSet, index: i, uploadHidden: true, showStall: stallShow }) : null,
                            _react2.default.createElement(
                                'section',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u5B57\u6BB5'
                                ),
                                _react2.default.createElement(
                                    'select',
                                    { value: statusSet.statusField,
                                        'data-pid': i, 'data-type': j,
                                        onChange: _this.changeField },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                    ),
                                    statusList.propertyConfigs.map(function (O, k) {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: O.propertyName, value: O.property },
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
                                    '\u503C'
                                ),
                                valueType == 'enum' ? _react2.default.createElement(
                                    'select',
                                    { value: statusSet.statusValue,
                                        'data-pid': i, 'data-type': j,
                                        onChange: _this.changeValue },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9\u503C'
                                    ),
                                    statusSet.statusField ? statusList.propertyConfigs[activestatusfield[i]].options.map(function (O, k) {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: O.value, value: O.value },
                                            O.meaning
                                        );
                                    }) : null
                                ) : _react2.default.createElement('input', { type: valueType == 'number' || valueType == 'range' ? 'number' : 'text',
                                    'data-pid': i, 'data-type': j,
                                    'data-min': statusList.propertyConfigs[activestatusfield[i]].minValue,
                                    'data-max': statusList.propertyConfigs[activestatusfield[i]].maxValue,
                                    value: statusSet.statusValue, onChange: _this.changeValue,
                                    placeholder: statusSet.statusValue == '' ? '请输入值' : '' })
                            )
                        ),
                        _this.props.statusSet.length - 1 == i && stallShow ? _react2.default.createElement(
                            'section',
                            { className: 'addstatus', 'data-index': i, onClick: _this.addStatus },
                            '\u6DFB\u52A0\u6863\u4F4D'
                        ) : null
                    );
                })
            );
        }
    })
};