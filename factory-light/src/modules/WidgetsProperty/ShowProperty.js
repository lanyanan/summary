'use strict';
/**
 * 状态可见性属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShowProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowProperty = exports.ShowProperty = {
    getComponent: _react2.default.createClass({
        changeCheck: function changeCheck(e) {
            //更改控件当前状态是否可见
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeBooleanProperty(pid, 'statusVisibility');
        },
        render: function render() {
            var I = this.props.item,
                i = this.props.index;
            return _react2.default.createElement(
                'section',
                { className: 'showproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u9690\u85CF'
                ),
                _react2.default.createElement('input', { className: "checkstatus " + (I.statusVisibility == 2 ? 'on' : 'off'), type: 'checkbox',
                    onChange: this.changeCheck, 'data-pid': I.propertyId,
                    checked: I.statusVisibility == 2 ? 'true' : '' })
            );
        }
    })
};