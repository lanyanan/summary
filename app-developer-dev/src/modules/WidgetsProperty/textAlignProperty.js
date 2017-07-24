'use strict';
/**
 * 文本属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextAlignProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextAlignProperty = exports.TextAlignProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {};
        },
        changeAlign: function changeAlign(e) {
            var textAlign = e.target.getAttribute('data-value');
            _Actions.Actions.changeExterior('textAlign', textAlign);
        },

        render: function render() {
            var textAlign = this.props.textAlign;
            return _react2.default.createElement(
                'section',
                { className: 'textalign', onClick: this.changeAlign },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5BF9\u9F50\u65B9\u5F0F'
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('label', { 'data-value': 'left', className: textAlign == 'left' ? 'left active' : 'left', title: '\u5DE6\u5BF9\u9F50' }),
                    _react2.default.createElement('label', { 'data-value': 'center', className: textAlign == 'center' ? 'center active' : 'center', title: '\u5C45\u4E2D' }),
                    _react2.default.createElement('label', { 'data-value': 'right', className: textAlign == 'right' ? 'right active' : 'right', title: '\u53F3\u5BF9\u9F50' })
                )
            );
        }
    })
};