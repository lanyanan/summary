'use strict';
/**
 * 标题属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CaptionProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaptionProperty = exports.CaptionProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        changeStatusName: function changeStatusName(e) {
            //修改控件当前状态显示名
            var snvalue = e.target.value;
            _Actions.Actions.changeWidgetCaption(snvalue);
        },
        delStatusName: function delStatusName(e) {
            //删除控件当前状态显示名
            _Actions.Actions.changeWidgetCaption('');
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.captiontext).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.captiontext).focus();
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
        render: function render() {
            var widgetCaption = this.props.item;
            return _react2.default.createElement(
                'section',
                { className: 'captionproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u540D\u79F0'
                ),
                _react2.default.createElement('input', { className: 'captiontext', value: widgetCaption, onChange: this.showFocus,
                    onFocus: this.showFocus }),
                _react2.default.createElement('input', { className: 'captiontexthidden', type: 'text', onChange: this.changeStatusName,
                    onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                    onKeyDown: this.keydown, defaultValue: widgetCaption, ref: 'captiontext' }),
                _react2.default.createElement('span', { className: 'deletecaption', onClick: this.delStatusName })
            );
        }
    })
};