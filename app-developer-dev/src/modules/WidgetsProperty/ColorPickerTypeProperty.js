'use strict';
/**
 * 颜色盘选择的种类
 * @author   lan
 * @datetime 2017-06-08
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorPickerTypeProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPickerTypeProperty = exports.ColorPickerTypeProperty = {
    getComponent: _react2.default.createClass({
        changeWidth: function changeWidth(e) {
            e.preventDefault();
            e.stopPropagation();
            var type = e.target.value;

            if (type == 0) {
                _Actions.Actions.changeSize('width', '225');
                _Actions.Actions.changeSize('height', '225');
            } else {
                _Actions.Actions.changeSize('width', '375');
                _Actions.Actions.changeSize('height', '30');
            }
            _Actions.Actions.changeColorPickerType(type);
            _Actions.Actions.changeSize('width', '375');
            _Actions.Actions.changeSize('height', '30');
        },

        render: function render() {
            var colorType = ['样式1', '样式2', '样式3'];

            var defaultSelectType = this.props.colorType ? parseInt(this.props.colorType) : 0;
            console.log(defaultSelectType);
            return _react2.default.createElement(
                'section',
                { className: 'property-width' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6837\u5F0F'
                ),
                _react2.default.createElement(
                    'select',
                    { ref: 'propertyWidth', value: defaultSelectType, onChange: this.changeWidth },
                    colorType.map(function (item, index) {
                        return _react2.default.createElement(
                            'option',
                            { value: index, key: index },
                            item
                        );
                    })
                )
            );
        }
    })
};