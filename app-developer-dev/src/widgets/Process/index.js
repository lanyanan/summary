'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Process = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = exports.Process = {
    id: 1018,
    caption: '过程控件',
    editText: '过程控件',
    originCaption: '过程控件',
    fieldType: 'boolean',
    width: 375,
    height: 49,
    trans: 80,
    cssFile: '../static/widgets/Process/style.css',
    icon: '../static/img/widgets/process-icon.png',
    iconActive: '../static/img/widgets/process-icon-active.png',
    scheme: ['caption', 'show', 'process', 'tone', 'color', 'opacity'],
    grid: ['style', 'interactive', 'size', 'exterior', 'hierarchy'],
    widgetInfo: {
        dragStatus: {
            top: true,
            bottom: true,
            left: true,
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
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/process.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/process-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u8FC7\u7A0B\u63A7\u4EF6'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        colorRgb: function(color){\n            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;  \n            var sColor = color.toLowerCase();  \n            if(sColor && reg.test(sColor)){  \n                if(sColor.length === 4){  \n                    var sColorNew = "#";  \n                    for(var i=1; i<4; i+=1){  \n                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));     \n                    }  \n                    sColor = sColorNew;  \n                }  \n                //\u5904\u7406\u516D\u4F4D\u7684\u989C\u8272\u503C  \n                var sColorChange = [];  \n                for(var i=1; i<7; i+=2){  \n                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    \n                }  \n                return  sColorChange;  \n            }else{  \n                return sColor;    \n            }  \n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        handleClick: function(){\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        item.status = item[\'activeStatusField\'];\n                        AppActions.toggle(item);\n                    }\n                });\n            }else{\n                console.log(\'eventSet error\');\n            }\n        },\n        render: function(){\n            console.log(this.props);\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var userWidgetID = this.props.userWidgetID;\n            var color = this.props.textColor || this.props.style.color || \'#68a5ff\',\n                opacity = this.props.trans?(this.props.trans)/100:0.7,\n                rgbArr = this.colorRgb(color),\n                rgbaStr =\'rgba(\' + rgbArr[0] + \',\' + rgbArr[1] +\',\'+ rgbArr[2] + \',\' + opacity + \')\',\n                statusLen = this.props.statusSet.length;\n            if(userWidgetID) var statusIndex = sessionStorage.getItem(userWidgetID) || \'a\';\n\n            this.props.statusSet.map(function(item,index){\n                if((_state[item.hourField] && _state[item.hourField] !=0) ||(_state[item.minuteField] && _state[item.minuteField] !=0) ){\n                    if(isNaN(statusIndex)) statusIndex = index;\n                    if(statusIndex < index) {\n                        statusIndex = index;\n                    }\n                    sessionStorage.setItem(userWidgetID,statusIndex);\n                }\n\n            });\n            var widgetInfo = this.props.widgetInfo;\n            var processColor = widgetInfo.processColor ? widgetInfo.processColor : "";\n            var processNowd = widgetInfo.processNowd ? widgetInfo.processNowd : 0;\n            return (\n                <section {...this.props} ref={this.props.ref} onTouchEnd={this.handleClick} className={this.props.className || "widgetProcess"}>\n                    <ul className=\'processUl\'>\n                    {\n                        this.props.statusSet.map(function(item,index){\n                            var styleObj ={\n                                color:color,\n                                background:processColor ? processColor : rgbaStr\n                            };\n                            var lineTop = \'22px\',\n                                lineRight = \'-20px\',\n                                lineColor = rgbaStr;\n                            if(statusIndex > index) {\n                                styleObj.color = \'#fff\';\n                                styleObj.background = \'#EDEDED\';\n                                lineColor = \'#EDEDED\';\n                            }else if(statusIndex == index){\n                                styleObj.background = \'transparent\';\n                                styleObj.color = color;\n                                styleObj.width = \'64px\';\n                                styleObj.height = \'64px\'; \n                                styleObj.borderTop = \'3px solid \' + rgbaStr;\n                                styleObj.borderLeft = \'3px solid \' + color;\n                                styleObj.borderRight = \'3px solid \' + rgbaStr;\n                                styleObj.borderBottom = \'3px solid \' + rgbaStr;\n                                styleObj.marginTop = \'-15px\';\n                                styleObj.marginBottom = \'0px\';\n                                lineTop = \'33px\';\n                                lineRight = \'-23px\';\n                            }\n                            return (\n                                <li key={index}  style={styleObj}>\n                                    <span>{item.statusName}</span>\n                                    <p style={{display:statusIndex == index?\'\':\'none\',marginTop: \'-25px\'}}>{_state[item.hourField] + \':\' + _state[item.minuteField]}</p>\n                                    <span style={{display:index<statusLen-1?\'\':\'none\',background:lineColor,top:lineTop,right:lineRight}} className=\'line\'></span>\n                                </li>\n                            )\n                        })\n                    }\n                    </ul>\n                </section>      \n            )\n        }\n    })'
};