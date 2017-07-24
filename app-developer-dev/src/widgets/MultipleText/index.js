'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultipleText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultipleText = exports.MultipleText = {
    id: 1002,
    caption: '多行文本',
    editText: '多行文本',
    originCaption: '多行文本',
    fieldType: 'boolean',
    width: 375,
    height: 58,
    cssFile: '../static/widgets/MultipleText/style.css',
    icon: '../static/img/widgets/text-icon.png',
    iconActive: '../static/img/widgets/text-icon-active.png',
    grid: ['text', 'style', 'interactive', 'size', 'exterior', 'hierarchy'],
    scheme: ["widgetStyle", "tone", 'caption', 'show', 'text', 'color', 'fontStyle', 'statusshow', 'bold', 'italic', 'size', 'multi[0]'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/multipletext.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/multipletext-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u591A\u884C\u6587\u672C'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        render: function(){\n            var value = this.props.text;\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var widgetStyle = this.props.style;\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusField){\n                        value = _state[item.statusField] || value;\n                    }\n                });\n            }\n            return (\n                <textarea disabled="disabled" ref={this.props.ref} {...this.props} className={this.props.className || "widgetMultipleText"} value={value}>\n                </textarea>\n            );\n        }\n    })'
};
//<textarea {...this.props} className="widgetMultipleText" value={this.props.caption}></textarea>