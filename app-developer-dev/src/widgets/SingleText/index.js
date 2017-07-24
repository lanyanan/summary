'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SingleText = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleText = exports.SingleText = {
    id: 1001,
    caption: '文本',
    editText: '文本',
    originCaption: '文本',
    fieldType: 'string',
    width: 375,
    height: 50,
    cssFile: '../static/widgets/SingleText/style.css',
    icon: '../static/img/widgets/text-icon.png',
    iconActive: '../static/img/widgets/text-icon-active.png',
    grid: ['text', 'style', 'interactive', 'size', 'exterior', 'hierarchy'],
    scheme: ['widgetStyle', 'tone', 'caption', 'show', 'text', 'textalign', 'color', 'fontStyle', 'statusshow', 'bold', 'italic', 'size', 'multi[0]'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-left' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/singletext.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/singletext-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6587\u672C'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        render: function(){\n            var value = this.props.text;\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var widgetStyle = this.props.style;\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusField && !item.statusValue){\n                        value = _state[item.statusField] || value;\n                        value = (_state[item.statusField]===0 || _state[item.statusField]===\'0\') ? 0 : value;\n                    }else if(item.statusField && item.statusValue instanceof Array){\n                        item.statusValue.map(function(option,j){\n                            if(option.value == _state[item.statusField]){\n                                value = option.meaning || value;\n                            }\n                        });\n                    }\n                });\n            }\n            return (\n                <input {...this.props} ref={this.props.ref} className={this.props.className || "widgetSingleText"} disabled="disabled" value={value} />\n            );\n        }\n    })'
};
//<input {...this.props} className="widgetSingleText" type="text" defaultValue="文字"/>