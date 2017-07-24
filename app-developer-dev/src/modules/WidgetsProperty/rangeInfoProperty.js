'use strict';
/**
 * 滑块类型组件
 * @author   hey
 * @datetime 2017-06-05
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeInfoProperty = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflux = require('reflux');

var _reflux2 = _interopRequireDefault(_reflux);

var _Actions = require('../../apps/playground/Actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeInfoProperty = exports.RangeInfoProperty = {
    getComponent: _react2.default.createClass({
        changeRangeType: function changeRangeType(e) {
            var info = {
                "style": 0,
                "type": "continuity"
            };
            info.type = e.target.value;
            _Actions.Actions.changeExterior('rangeInfo', info);
        },

        render: function render() {
            var rangeType = this.props.rangeInfo && this.props.rangeInfo.type;
            return _react2.default.createElement(
                'section',
                { className: 'property-range' },
                _react2.default.createElement(
                    'span',
                    null,
                    '\u7C7B\u578B'
                ),
                _react2.default.createElement(
                    'select',
                    { value: rangeType == 'dispersed' ? "dispersed" : "continuity", onChange: this.changeRangeType },
                    _react2.default.createElement(
                        'option',
                        { value: 'continuity' },
                        '\u8FDE\u7EED\u578B'
                    ),
                    _react2.default.createElement(
                        'option',
                        { value: 'dispersed' },
                        '\u79BB\u6563\u578B'
                    )
                )
            );
        }
    })
};