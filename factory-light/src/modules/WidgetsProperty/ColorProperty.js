'use strict';
/**
 * 文本颜色属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorProperty = exports.ColorProperty = {
    getComponent: _react2.default.createClass({
        colorPick: function colorPick(e) {
            var pid = Number(e.target.getAttribute('data-pid'));
            var newcolor = e.target.value;
            //console.log(/^#[0-9a-fA-F]{3,6}$/.test(newcolor));
            // this.setState({foreground:newcolor});
            _Actions.Actions.changeStringProperty(pid, 'textColor', newcolor);
        },
        render: function render() {
            var I = this.props.item,
                i = this.props.index;
            return _react2.default.createElement(
                'section',
                { className: 'colorproperty' },
                _react2.default.createElement(
                    'span',
                    { className: 'threetext' },
                    '\u6587\u672C\u989C\u8272'
                ),
                _react2.default.createElement('input', { 'data-pid': I.propertyId, value: I.textColor, onChange: this.colorPick }),
                _react2.default.createElement('input', { type: 'color', 'data-pid': I.propertyId, value: '#efefef', onChange: this.colorPick,
                    style: { backgroundColor: I.textColor }, className: 'extendblock' })
            );
        }
    })
};