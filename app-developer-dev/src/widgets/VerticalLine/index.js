'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VerticalLine = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalLine = exports.VerticalLine = {
    id: 1010,
    caption: '竖线',
    originCaption: '竖线',
    fieldType: 'boolean',
    width: 1,
    height: 150,
    cssFile: '../static/widgets/VerticalLine/style.css',
    icon: '../static/img/widgets/vline-icon.png',
    iconActive: '../static/img/widgets/vline-icon-active.png',
    grid: ['size', 'exterior', 'hierarchy'],
    scheme: ['caption', 'show', 'multi[0]'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/vline.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/vline-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u7AD6\u7EBF'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        render: function(){\n            return (\n                <div {...this.props} ref={this.props.ref} className={this.props.className || "widgetVerticalLine"}></div>\n            );\n        }\n    })'
};