'use strict';
/**
 * 颜色盘控件属性类
 * @author   xinglin
 * @datetime 2016-10-27
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorPickerProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPickerProperty = exports.ColorPickerProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {};
        },
        changeField: function changeField(e) {
            //更改选中的字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength);
        },
        changeColorType: function changeColorType(e) {
            //更改选中的类型
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            _Actions.Actions.changeField(property, pid, type, 0, 0, 'colortype');
        },
        changeRField: function changeRField(e) {
            //更改选中的R字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength, 'r');
        },
        changeGField: function changeGField(e) {
            //更改选中的G字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength, 'g');
        },
        changeBField: function changeBField(e) {
            //更改选中的B字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength, 'b');
        },
        toggleDiv: function toggleDiv(e) {
            //切换事件div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'event');
        },
        render: function render() {
            var propertySet = this.props.propertySet;
            var I = this.props.item,
                F = this.props.Pitem,
                i = this.props.Iindex,
                j = this.props.Jindex;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'event' },
                    _react2.default.createElement(
                        'span',
                        { className: 'eventtitle' },
                        '\u70B9\u51FB\u4E8B\u4EF6'
                    ),
                    _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u4F20\u503C\u7C7B\u578B'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: I.colorType ? I.colorType : '1',
                                'data-pid': i, 'data-type': j,
                                onChange: this.changeColorType },
                            _react2.default.createElement(
                                'option',
                                { value: '1' },
                                'RGB\u7C7B\u578B'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: '2' },
                                '\u5341\u516D\u8FDB\u5236'
                            )
                        )
                    ),
                    I.colorType != '2' ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u7EA2\u8272\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: I.rSet ? I.rSet.field : '',
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeRField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { 'data-findex': O.index, 'data-blength': O.byteLength, key: O.propertyName, value: O.property },
                                            O.propertyName
                                        );
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u7EFF\u8272\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: I.gSet ? I.gSet.field : '',
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeGField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { 'data-findex': O.index, 'data-blength': O.byteLength, key: O.propertyName, value: O.property },
                                            O.propertyName
                                        );
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u84DD\u8272\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: I.bSet ? I.bSet.field : '',
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeBField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { 'data-findex': O.index, 'data-blength': O.byteLength, key: O.propertyName, value: O.property },
                                            O.propertyName
                                        );
                                    }
                                })
                            )
                        )
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u989C\u8272\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: I.eventField ? I.eventField : '',
                                    'data-pid': i, 'data-type': j,
                                    onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                F.propertyConfigs.map(function (O, k) {
                                    if (O.property !== 'updateFlag') {
                                        return _react2.default.createElement(
                                            'option',
                                            { 'data-findex': O.index, 'data-blength': O.byteLength, key: O.propertyName, value: O.property },
                                            O.propertyName
                                        );
                                    }
                                })
                            )
                        )
                    )
                )
            );
        }
    })
};