'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = exports.Button = {
    id: 1005,
    caption: '按钮',
    editText: '按钮',
    originCaption: '按钮',
    fieldType: 'boolean',
    width: 375,
    height: 49,
    successToast: null,
    failToast: null,
    icon: '../static/img/widgets/button-icon.png',
    iconActive: '../static/img/widgets/button-icon-active.png',
    cssFile: '../static/widgets/Button/style.css',
    grid: ['text', 'style', 'interactive', 'size', 'exterior', 'hierarchy'],
    scheme: ['buttonWidth', 'buttonSolid', 'tone', 'caption', 'show', 'text', 'textalign', 'color', 'fontStyle', 'event', 'bold', 'italic', 'size', 'multi[0]'],
    widgetInfo: {
        dragStatus: {
            top: true,
            bottom: true,
            left: false,
            right: true,
            changeWidth: false,
            changeHeight: false
        }
    },
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-left' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/button.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/button-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6309\u94AE'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        colorRgb: function(color){\n            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;\n            var sColor = color.toLowerCase();\n            if(sColor && reg.test(sColor)){\n                if(sColor.length === 4){\n                    var sColorNew = "#";\n                    for(var i=1; i<4; i+=1){\n                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   \n                    }\n                    sColor = sColorNew;\n                }\n                //\u5904\u7406\u516D\u4F4D\u7684\u989C\u8272\u503C\n                var sColorChange = [];\n                for(var i=1; i<7; i+=2){\n                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  \n                }\n                return sColorChange;\n            }else{\n                return sColor;  \n            }\n        },\n        handleClick: function(e){\n            e.preventDefault(); \n            var bgc16 = this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a7ff5";\n            var bgcRGB = this.colorRgb(bgc16);\n            e.target.style.background = \'rgba(\'+ bgcRGB[0] +\',\'+ bgcRGB[1] +\',\'+ bgcRGB[2] +\',1)\'\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        item.status = item[\'activeStatusField\'];\n                        AppActions.toggle(item);\n                    }\n                });\n            }else{\n                console.log(\'eventSet error\');\n            }\n        },\n        handleTouchStart(e){\n            e.preventDefault(); \n            var bgc16 = this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a7ff5";\n            e.target.style.background = \'rgba(\'+ (parseInt(bgcRGB[0]) -20) +\',\'+ bgcRGB[1] +\',\'+ bgcRGB[2] +\',1)\';\n        },\n        render: function(){\n            return (\n                <input {...this.props} ref={this.props.ref} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleClick} className={this.props.className || "widgetButton"} value={this.props.text} type="button" />\n            )\n        }\n    })'
};