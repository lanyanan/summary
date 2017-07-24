'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rectangle = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rectangle = exports.Rectangle = {
    id: 1006,
    caption: '矩形',
    originCaption: '矩形',
    fieldType: 'boolean',
    width: 200,
    height: 100,
    cssFile: '../static/widgets/Rectangle/style.css',
    icon: '../static/img/widgets/rectangle-icon.png',
    iconActive: '../static/img/widgets/rectangle-icon-active.png',
    scheme: ['caption', 'show', 'multi[0]'],
    grid: ['size', 'exterior', 'hierarchy'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-left' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/rectangle.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/rectangle-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u77E9\u5F62'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        render: function(){\n            return (\n                <div {...this.props} ref={this.props.ref} className={this.props.className || "widgetRectangle"}  ></div>\n            );\n        }\n    })'
};