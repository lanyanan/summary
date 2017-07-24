'use strict';
/**
 * 文本属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TextProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextProperty = exports.TextProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        changeMultipleText: function changeMultipleText(e) {
            e.preventDefault();
            e.stopPropagation();
            var pid = Number(e.target.getAttribute('data-pid'));
            var nvalue = e.target.value;
            console.log(e.target.value);
            _Actions.Actions.changeStringProperty(pid, 'multipleText', nvalue);
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.textareavalue).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.textareavalue).select();
            });
        },

        hiddenBlur: function hiddenBlur(e) {
            this.setState({ hidden: true });
        },
        keydown: function keydown(e) {
            //回车快捷键 提交命名结束
            if (e.keyCode == 13) {
                this.setState({ hidden: true });
            } else {
                return;
            }
        },
        render: function render() {
            var I = this.props.item,
                i = this.props.index;
            var id = this.props.id,
                multipleText = I.multipleText || this.props.editText || '',
                show = true;
            if (id == 1002 || id == 1015 || id == 1016) {
                show = false;
            }
            return _react2.default.createElement(
                'section',
                { className: show ? 'textproperty' : "textproperty textproperty-area" },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5185\u5BB9'
                ),
                _react2.default.createElement('input', { placeholder: '\u63A7\u4EF6\u8BF4\u660E', value: multipleText, style: { "display": show ? 'block' : 'none' },
                    onChange: this.showFocus, onFocus: this.showFocus }),
                !show && _react2.default.createElement('textarea', { 'data-pid': I.propertyId, onChange: this.changeMultipleText, value: multipleText }),
                _react2.default.createElement('input', { className: 'texthidden', type: 'text', onChange: this.changeMultipleText,
                    onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                    onKeyDown: this.keydown,
                    'data-pid': I.propertyId, defaultValue: multipleText, ref: 'textareavalue' })
            );
        }
    })
};