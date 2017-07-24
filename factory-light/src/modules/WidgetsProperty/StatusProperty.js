'use strict';
/**
 * 状态属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatusProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

var _ImageProperty = require('./ImageProperty');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 图像组件

var StatusProperty = exports.StatusProperty = {
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
            _Actions.Actions.changeField(property, pid, type, options);
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
            this.props.toggleDiv(this.props.propertySet.statusSet.length, 'status');
        },
        delStatus: function delStatus(e) {
            //删除指定的状态
            var index = Number(e.target.getAttribute('data-index'));
            _Actions.Actions.delStatus(index);
        },
        toggleDiv: function toggleDiv(e) {
            //切换事件div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'status');
        },
        changeCheck: function changeCheck(e) {
            //更改控件当前状态是否可见
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStringProperty(pid, 'activeStatus', pid);
        },
        render: function render() {
            var I = this.props.item,
                F = this.props.Pitem,
                activestatusfield = this.props.activefield,
                i = this.props.Iindex,
                propertySet = this.props.propertySet || {},
                valueType = F.propertyConfigs[activestatusfield[i]].valueType,
                j = this.props.Jindex;
            //I(item)为状态,F(Pitem)为协议内容,activestatusfield为选中类型
            //i(Iindex)为状态在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return _react2.default.createElement(
                'section',
                { className: 'status' },
                this.props.scheme.indexOf('statusshow') > -1 ? _react2.default.createElement(
                    'section',
                    { key: j },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u72B6\u6001\u663E\u793A'
                    ),
                    _react2.default.createElement(
                        'select',
                        { value: I.statusField, 'data-pid': i, 'data-type': j,
                            onChange: this.changeField },
                        _react2.default.createElement(
                            'option',
                            { value: '' },
                            '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                        ),
                        F.propertyConfigs.map(function (O, k) {
                            return _react2.default.createElement(
                                'option',
                                { key: O.propertyName, 'data-type': O.valueType, 'data-options': JSON.stringify(O.options), value: O.property },
                                O.propertyName
                            );
                        })
                    )
                ) : _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'span',
                        { className: 'statustitle' },
                        '\u72B6\u6001'
                    ),
                    _react2.default.createElement('span', { className: 'toggle ' + (this.props.showStatus == i ? 'on' : 'off'), 'data-index': i, onClick: this.toggleDiv }),
                    _react2.default.createElement('span', { className: 'del', 'data-index': i, onClick: this.delStatus }),
                    _react2.default.createElement(
                        'div',
                        { style: { display: this.props.showStatus == i ? '' : 'none' } },
                        _react2.default.createElement(
                            'div',
                            { className: 'showproperty' },
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u72B6\u6001\u4F18\u5148\u663E\u793A'
                            ),
                            _react2.default.createElement('input', { className: "checkstatus " + (i == propertySet.activeStatus ? 'on' : 'off'), type: 'checkbox',
                                onChange: this.changeCheck, 'data-pid': i,
                                checked: i == propertySet.activeStatus ? 'true' : '' })
                        ),
                        this.props.scheme.indexOf('image') > -1 ? _react2.default.createElement(_ImageProperty.ImageProperty.getComponent, { item: I, index: i }) : null,
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
                                { value: I.statusField,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
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
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u503C'
                            ),
                            valueType == 'enum' ? _react2.default.createElement(
                                'select',
                                { value: I.statusValue,
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeValue },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u503C'
                                ),
                                I.statusField ? F.propertyConfigs[activestatusfield[i]].options.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: O.value, value: O.value },
                                        O.meaning
                                    );
                                }) : null
                            ) : _react2.default.createElement('input', { type: valueType == 'number' || valueType == 'range' ? 'number' : 'text',
                                'data-pid': i, 'data-type': j,
                                'data-min': F.propertyConfigs[activestatusfield[i]].minValue,
                                'data-max': F.propertyConfigs[activestatusfield[i]].maxValue,
                                value: I.statusValue, onChange: this.changeValue,
                                placeholder: I.statusValue == '' ? '请输入值' : '' })
                        )
                    ),
                    this.props.propertySet.statusSet.length - 1 == i ? _react2.default.createElement(
                        'section',
                        { className: 'addstatus', 'data-index': i, onClick: this.addStatus },
                        '\u6DFB\u52A0\u72B6\u6001'
                    ) : null
                )
            );
        }
    })
};