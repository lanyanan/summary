'use strict';
/**
 * 弹窗按钮内容属性类
 * @author  pan
 * @datetime 2017-03-17
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BottonDetailProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BottonDetailProperty = exports.BottonDetailProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        change: function change(e) {
            //修改按钮内容
            var defaultvalue = e.target.value;
            var pid = Number(e.target.getAttribute('data-pid'));

            _Actions.Actions.changeStringProperty(pid, 'bottonDetail', defaultvalue);
        },
        delete: function _delete(e) {
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStringProperty(pid, 'bottonDetail', '');
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            var pid = Number(e.target.getAttribute('data-pid'));

            _Actions.Actions.changeStringProperty(pid, 'bottonDetail', defaultvalue);
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.bottonDetail).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.bottonDetail).focus();
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
            var I = this.props.item,
                i = this.props.index;
            var bottonDetail = I.bottonDetail || this.props.bottonDetail || '';
            return _react2.default.createElement(
                'section',
                { className: 'captionproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6309\u94AE\u5185\u5BB9'
                ),
                _react2.default.createElement('input', { className: 'captiontext', value: bottonDetail, 'data-pid': I.propertyId, onChange: this.showFocus }),
                _react2.default.createElement('input', { className: 'captiontexthidden', type: 'text', 'data-pid': I.propertyId, onChange: this.change,
                    onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                    onKeyDown: this.keydown, defaultValue: bottonDetail, ref: 'bottonDetail' }),
                _react2.default.createElement('span', { className: 'deletecaption', onClick: this.delete })
            );
        }
    })
};