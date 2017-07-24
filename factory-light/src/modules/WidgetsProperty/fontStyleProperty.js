'use strict';
/**
 * 字体大小属性类
 * @author   xinglin
 * @datetime 2016-05-06
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fontStyleProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fontStyleProperty = exports.fontStyleProperty = {
    getComponent: _react2.default.createClass({
        changeFontWeight: function changeFontWeight(e) {
            //更改文本的字体粗细
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeBooleanProperty(pid, 'fontWeight');
        },
        changeFontItalics: function changeFontItalics(e) {
            //更改文本的字体倾斜
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeBooleanProperty(pid, 'fontItalics');
        },
        changeTextSize: function changeTextSize(e) {
            var pid = Number(e.target.getAttribute('data-pid'));
            var newsize = e.target.value;
            _Actions.Actions.changeStringProperty(pid, 'fontSize', newsize);
        },
        render: function render() {
            var I = this.props.item,
                i = this.props.index;
            return _react2.default.createElement(
                'section',
                { className: 'fontstyleproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5B57\u4F53\u5927\u5C0F'
                ),
                _react2.default.createElement('input', { 'data-pid': I.propertyId, value: I.fontSize, type: 'number', onChange: this.changeTextSize }),
                _react2.default.createElement(
                    'span',
                    { style: { backgroundColor: I.fontWeight == 1 ? '#f1f3f6' : '#fff', color: I.fontWeight == 1 ? '#4887f5' : '#999999' }, 'data-pid': I.propertyId, onClick: this.changeFontWeight },
                    'B'
                ),
                _react2.default.createElement(
                    'span',
                    { style: { backgroundColor: I.fontItalics == 1 ? '#f1f3f6' : '#fff', color: I.fontItalics == 1 ? '#4887f5' : '#999999' }, 'data-pid': I.propertyId, onClick: this.changeFontItalics },
                    '/'
                )
            );
        }
    })
};