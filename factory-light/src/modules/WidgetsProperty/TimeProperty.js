'use strict';
/**
 * 定时控件属性类
 * @author   xinglin
 * @datetime 2016-07-07
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeProperty = exports.TimeProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        changeTimeTitle: function changeTimeTitle(e) {
            var newsize = e.target.value;
            _Actions.Actions.changeStringProperty(0, 'timeTitle', newsize);
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.timeTitle).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.timeTitle).focus();
            });
        },
        hiddenBlur: function hiddenBlur(e) {
            this.setState({ hidden: true });
        },
        keydown: function keydown(e) {
            //回车快捷键 提交命名结束
            e.stopPropagation();
            if (e.keyCode == 13) {
                this.setState({ hidden: true });
            } else {
                return;
            }
        },
        changeField: function changeField(e) {
            //更改选中的字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var datatype = e.currentTarget.getAttribute('data-timetype');
            var options = null;
            if (e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum') {
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            _Actions.Actions.changeField(property, pid, type, options, 0, datatype);
        },
        changeHourField: function changeHourField(e) {
            //更改选中的小时字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength, 'hour');
        },
        changeMinuteField: function changeMinuteField(e) {
            //更改选中的分钟字段
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            var byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            _Actions.Actions.changeField(property, pid, type, fieldIndex, byteLength, 'minute');
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
            var scheme = JSON.parse(JSON.stringify(this.props.scheme));
            if (scheme instanceof Array) scheme.push('statusshow');
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'sizeproperty' },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5185\u5BB9'
                    ),
                    _react2.default.createElement('input', { value: propertySet.timeTitle || '设置时间', onChange: this.showFocus, onFocus: this.showFocus }),
                    _react2.default.createElement('input', { type: 'text', onChange: this.changeTimeTitle,
                        onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                        onKeyDown: this.keydown, defaultValue: propertySet.timeTitle || '设置时间', ref: 'timeTitle' })
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'span',
                        { className: 'statustitle' },
                        '\u72B6\u6001'
                    ),
                    _react2.default.createElement(
                        'section',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u5C0F\u65F6\u5B57\u6BB5'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: propertySet.statusSet[0].hourField,
                                'data-pid': 0, 'data-type': this.props.statusIndex,
                                'data-timetype': 'hour', onChange: this.changeField },
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                            ),
                            this.props.statusList.propertyConfigs.map(function (O, k) {
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
                            '\u5206\u949F\u5B57\u6BB5'
                        ),
                        _react2.default.createElement(
                            'select',
                            { value: propertySet.statusSet[0].minuteField,
                                'data-pid': 0, 'data-type': this.props.statusIndex,
                                'data-timetype': 'minute', onChange: this.changeField },
                            _react2.default.createElement(
                                'option',
                                { value: '' },
                                '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                            ),
                            this.props.statusList.propertyConfigs.map(function (O, k) {
                                return _react2.default.createElement(
                                    'option',
                                    { key: O.propertyName, value: O.property },
                                    O.propertyName
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'section',
                    { className: 'event' },
                    _react2.default.createElement(
                        'span',
                        { className: 'eventtitle' },
                        '\u70B9\u51FB\u4E8B\u4EF6'
                    ),
                    _react2.default.createElement('span', { className: 'toggle ' + (this.props.showEvent == i ? 'on' : 'off'), 'data-index': i, onClick: this.toggleDiv }),
                    _react2.default.createElement(
                        'div',
                        { style: { display: this.props.showEvent == i ? '' : 'none' } },
                        _react2.default.createElement(
                            'section',
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u70B9\u51FB'
                            ),
                            _react2.default.createElement(
                                'select',
                                { 'data-pid': i, value: I.eventType, 'data-type': j, onChange: this.changeEvent },
                                _react2.default.createElement(
                                    'option',
                                    { value: '1' },
                                    '\u70B9\u51FB\u89E6\u53D1'
                                )
                            )
                        ),
                        I.eventType == '1' ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'section',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u5C0F\u65F6\u5B57\u6BB5'
                                ),
                                _react2.default.createElement(
                                    'select',
                                    { value: I.hourSet ? I.hourSet.field : '',
                                        'data-pid': i, 'data-type': j,
                                        onChange: this.changeHourField },
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
                                    '\u5206\u949F\u5B57\u6BB5'
                                ),
                                _react2.default.createElement(
                                    'select',
                                    { value: I.minuteSet ? I.minuteSet.field : '',
                                        'data-pid': i, 'data-type': j,
                                        onChange: this.changeMinuteField },
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
                        ) : null
                    )
                )
            );
        }
    })
};