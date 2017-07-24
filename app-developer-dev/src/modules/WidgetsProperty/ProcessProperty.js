'use strict';
/**
 * 过程控件属性类
 * @author   pan
 * @datetime 20170331
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProcessProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProcessProperty = exports.ProcessProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {};
        },
        changeField: function changeField(e) {
            e.stopPropagation();
            var property = e.target.value;
            var pid = Number(e.currentTarget.getAttribute('data-pid'));
            var type = Number(e.currentTarget.getAttribute('data-type'));
            var datatype = e.currentTarget.getAttribute('data-timetype');
            var options = null;
            if (e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum') {
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            console.log(pid, type, datatype);
            _Actions.Actions.changeField(property, pid, type, options, 0, datatype);
        },
        toggleDiv: function toggleDiv(e) {
            //切换事件div的显示隐藏
            var index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'status');
        },

        render: function render() {
            var propertySet = this.props.propertySet,
                i = this.props.processNowd ? this.props.processNowd : 0;
            var hourField = propertySet.statusSet[i].hourField ? propertySet.statusSet[i].hourField : " ",
                minuteField = propertySet.statusSet[i].minuteField ? propertySet.statusSet[i].minuteField : " ";
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'section',
                    { className: 'status' },
                    _react2.default.createElement(
                        'span',
                        { className: 'statustitle' },
                        '\u72B6\u6001\u6570\u636E\u663E\u793A'
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
                                '\u5C0F\u65F6\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: hourField,
                                    'data-pid': i, 'data-type': this.props.statusIndex,
                                    'data-timetype': 'hour', onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                this.props.statusList.propertyConfigs.map(function (O, k) {
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
                            null,
                            _react2.default.createElement(
                                'span',
                                null,
                                '\u5206\u949F\u5B57\u6BB5'
                            ),
                            _react2.default.createElement(
                                'select',
                                { value: minuteField,
                                    'data-pid': i, 'data-type': this.props.statusIndex,
                                    'data-timetype': 'minute', onChange: this.changeField },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    '\u8BF7\u9009\u62E9\u5B57\u6BB5'
                                ),
                                this.props.statusList.propertyConfigs.map(function (O, k) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: k, value: O.property },
                                        O.propertyName
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    })
};