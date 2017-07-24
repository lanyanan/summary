'use strict';
/**
 * 按钮满屏，大按钮，中按钮，小按钮
 * @author   hey
 * @datetime 2017-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidthProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WidthProperty = exports.WidthProperty = {
    getComponent: _react2.default.createClass({
        changeWidth: function changeWidth(e) {
            e.preventDefault();
            e.stopPropagation();
            var type = e.target.value;
            switch (type) {
                case '0':
                    _Actions.Actions.changeSize('x', 0);
                    _Actions.Actions.changeExterior('borderRadius', '0');
                    _Actions.Actions.changeSize('height', '48');
                    _Actions.Actions.changeSize('width', '375');
                    break;
                case '1':
                    _Actions.Actions.changeSize('x', (375 - 343) / 2);
                    _Actions.Actions.changeExterior('borderRadius', '6');
                    _Actions.Actions.changeSize('width', '343');
                    _Actions.Actions.changeSize('height', '44');
                    break;
                case '2':
                    _Actions.Actions.changeSize('x', (375 - 120) / 2);
                    _Actions.Actions.changeSize('width', '120');
                    _Actions.Actions.changeExterior('borderRadius', '6');
                    _Actions.Actions.changeSize('height', '36');
                    break;
                case '3':
                    _Actions.Actions.changeSize('x', (375 - 100) / 2);
                    _Actions.Actions.changeSize('width', '96');
                    _Actions.Actions.changeExterior('borderRadius', '5');
                    _Actions.Actions.changeSize('height', '26');

                    break;
                default:
                    ;
            }
        },

        render: function render() {
            var bgColor = this.props.bgColor,
                pid = this.props.pid;
            var widgetWidth = this.props.widgetWidth;
            //宽度选择
            var buttonWidth = ['375', '343', '120', '80'];
            var defaultSelectWidth = 0;
            var defaultWidth = buttonWidth.map(function (item, index) {
                var widthInfo = ['满屏', '大', '中', '小'];
                if (widgetWidth == item) {
                    defaultSelectWidth = index;
                }
                return _react2.default.createElement(
                    'option',
                    { value: index, key: index },
                    widthInfo[index]
                );
            });
            return _react2.default.createElement(
                'section',
                { className: 'property-width' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5BBD\u5EA6'
                ),
                _react2.default.createElement(
                    'select',
                    { ref: 'propertyWidth', value: defaultSelectWidth, onChange: this.changeWidth },
                    defaultWidth
                )
            );
        }
    })
};