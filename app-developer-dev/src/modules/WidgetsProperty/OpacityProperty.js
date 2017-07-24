'use strict';
/**
 * 透明度属性类
 * @author   pan
 * @datetime 2017-03-31
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OpacityProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpacityProperty = exports.OpacityProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                widgetOpacity: 80
            };
        },
        changeOpacity: function changeOpacity(e) {
            var pid = Number(e.target.getAttribute('data-pid'));
            var opacity = Number(e.target.value);
            this.setState({ widgetOpacity: opacity });
            _Actions.Actions.changeStringProperty(pid, 'trans', opacity);
        },
        render: function render() {
            var I = this.props.item,
                opacity = I.trans || this.state.widgetOpacity,
                i = this.props.index;

            return _react2.default.createElement(
                'section',
                { className: 'transproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u900F\u660E\u5EA6'
                ),
                _react2.default.createElement('input', { type: 'number', value: opacity, onChange: this.changeOpacity, min: '0', max: '100', 'data-pid': I.propertyId })
            );
        }
    })
};