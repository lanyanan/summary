'use strict';
/**
 * 控件头部title属性类
 * @author  pan
 * @datetime 2017-03-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TitleProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TitleProperty = exports.TitleProperty = {
    getComponent: _react2.default.createClass({
        getInitialState: function getInitialState() {
            return {
                hidden: true
            };
        },
        changeTitle: function changeTitle(e) {
            //修改控件头部标题
            var nvalue = e.target.value;
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStringProperty(pid, 'title', nvalue);
        },
        delTitle: function delTitle(e) {
            var pid = Number(e.target.getAttribute('data-pid'));
            _Actions.Actions.changeStringProperty(pid, 'title', '');
        },
        showFocus: function showFocus(e) {
            var _this = this;

            var defaultvalue = e.target.value;
            // let pid = Number(e.target.getAttribute('data-pid'));
            // Actions.changeStringProperty(pid,'title',defaultvalue);
            this.setState({ hidden: false }, function () {
                _react2.default.findDOMNode(_this.refs.titletext).value = defaultvalue;
                _react2.default.findDOMNode(_this.refs.titletext).focus();
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
            var titletext = I.title || this.props.title || '';
            return _react2.default.createElement(
                'section',
                { className: 'captionproperty' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6807\u9898'
                ),
                _react2.default.createElement('input', { className: 'captiontext', value: titletext, 'data-pid': I.propertyId, onChange: this.showFocus, onFocus: this.showFocus }),
                _react2.default.createElement('input', { className: 'captiontexthidden', type: 'text', 'data-pid': I.propertyId, onChange: this.changeTitle,
                    onBlur: this.hiddenBlur, style: { display: this.state.hidden ? "none" : "" },
                    onKeyDown: this.keydown, defaultValue: titletext, ref: 'titletext' }),
                _react2.default.createElement('span', { className: 'deletecaption', onClick: this.delTitle })
            );
        }
    })
};