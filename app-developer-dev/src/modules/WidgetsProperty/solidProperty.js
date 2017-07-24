'use strict';
/**
 * 状态可见性属性类
 * @author   hey
 * @datetime 2016-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SolidProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SolidProperty = exports.SolidProperty = {
    getComponent: _react2.default.createClass({
        changeBac: function changeBac(e) {
            e.preventDefault();
            e.stopPropagation();

            var bgcolor = e.target.getAttribute('data-bgcolor');
            var borderColor = e.target.getAttribute('data-bordercolor');
            var pid = Number(e.target.getAttribute('data-pid'));
            var type = e.target.value;
            switch (type) {
                case '0':
                    //实心 背景和边框,文字白色
                    _Actions.Actions.changeStringProperty(pid, 'textColor', '#ffffff');
                    if (bgcolor == "transparent") {
                        _Actions.Actions.changeBorderColor(borderColor);
                        _Actions.Actions.changeExterior('bgColor', borderColor);
                    } else {
                        _Actions.Actions.changeBorderColor(bgcolor);
                        _Actions.Actions.changeExterior('bgColor', bgcolor);
                    }
                    break;
                case '1':
                    //空心，文字和边框，背景透明
                    _Actions.Actions.changeStringProperty(pid, 'textColor', bgcolor);
                    _Actions.Actions.changeBorderColor(bgcolor);
                    _Actions.Actions.changeExterior('bgColor', 'transparent');
                    break;
                default:
                    ;
            }
        },

        render: function render() {
            var bgColor = this.props.bgColor,
                borderColor = this.props.borderColor,
                pid = this.props.pid;
            return _react2.default.createElement(
                'section',
                { className: 'property-solid' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6837\u5F0F'
                ),
                _react2.default.createElement(
                    'select',
                    { value: bgColor == "transparent" ? 1 : 0, 'data-bgcolor': bgColor ? bgColor : "#3b96ff", 'data-bordercolor': borderColor ? borderColor : "#3b96ff", 'data-pid': pid, onChange: this.changeBac },
                    _react2.default.createElement(
                        'option',
                        { value: '0' },
                        '\u5B9E\u5FC3'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: '1' },
                        '\u7A7A\u5FC3'
                    )
                )
            );
        }
    })
};