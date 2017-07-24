'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DigitalSubtraction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DigitalSubtraction = exports.DigitalSubtraction = {
    id: 1013,
    caption: '数字加减',
    originCaption: '数字加减',
    fieldType: 'Switch',
    width: 375,
    height: 80,
    icon: '../static/img/widgets/stall-icon.png',
    iconActive: '../static/img/widgets/stall-icon-active.png',
    cssFile: '../static/widgets/DigitalSubtraction/style.css',
    grid: ['style', 'interactive', 'size', 'exterior', 'hierarchy', 'originCaptionRange', 'scope'],
    scheme: ['tone', 'caption', 'show', 'range', 'stall', 'subtraction', 'event', 'scopeStatus', 'eValue', 'multi[0]'],
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
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/sadd.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/sadd-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6570\u5B57\u52A0\u51CF'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        handleClick: function(e){\n            clearTimeout(window[this.props.userWidgetID]);\n            var value= parseInt(e.target.getAttribute(\'data-value\')) || 0;\n            var type = e.target.getAttribute(\'data-type\');\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            var rateValue = parseInt(this.props.rateValue) || 1;\n            if(type===\'plus\'&&(value+rateValue)>maxValue) return;\n            if(type===\'minus\'&&(value-rateValue)<minValue) return;\n            if(type===\'plus\') value = (value+rateValue)>maxValue?value:value+rateValue;\n            if(type===\'minus\') value = (value-rateValue)<minValue?value:value-rateValue;\n            sessionStorage.setItem(this.props.userWidgetID,value);\n            var userWidgetID = this.props.userWidgetID;\n            var arg = {};\n            arg.userWidgetID = userWidgetID;\n            arg.eventType=3;\n            arg.showWidgetList=[];\n            arg.status = {\n                userWidgetID:{\n                    statusField:this.props.statusSet[0].statusField,\n                    statusValue:value\n                }\n            };\n            AppActions.toggle(arg);\n            if(value>maxValue || value<minValue) return;\n            window[this.props.userWidgetID] = setTimeout(function(){\n                if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                    var userWidgetID = this.props.userWidgetID;\n                    this.props.eventSet.map(function(item,index){\n                        if (item.eventType==1) {\n                            if(item.commandType==2){\n                                AppActions.complexCommand(item.commandConfigList);\n                            }else{\n                                AppActions.trigger(item.eventField, value, item.updateFlag,item.byteLength);\n                            }\n                        } else if (item.eventType==2) {\n                            location.hash = \'#/page/\' + item.checkedPageId\n                        }else if (item.eventType==3 || item.eventType==4) {\n                            item.userWidgetID = userWidgetID;\n                            AppActions.toggle(item);\n                        }\n                    });\n                }\n            }.bind(this), 2000);\n        },\n        render: function(){\n            var sessionValue = this.props.userWidgetID?sessionStorage.getItem(this.props.userWidgetID):\'\';\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            var rateValue = parseInt(this.props.rateValue) || 1;\n            var rangeValue = sessionValue || rangeValue || minValue || 0;;\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusField && !item.statusValue){\n                        rangeValue = _state[item.statusField] || rangeValue;\n                    }\n                });\n            }\n            var widgetInfo = this.props.widgetInfo;\n            var account = widgetInfo.account ? widgetInfo.account : "";\n            var color = widgetInfo.color ? widgetInfo.color : "#3285ff";\n            return (\n                <div {...this.props} ref={this.props.ref} className={\'widgetSubtraction flex \'+this.props.className}>\n                    <section className=\'flex-cell\'>\n                        <a className=\'minus-on\' style={{color:color}} data-value={rangeValue} data-type=\'minus\' onTouchEnd={this.handleClick} href="javascript:void(0)">-</a>\n                    </section>\n                    <section className=\'flex-cell\'>\n                        <span style={{color:color}} >{rangeValue + account}</span>\n                    </section>\n                    <section className=\'flex-cell\'>\n                        <a className=\'plus-on\' style={{color:color}} data-value={rangeValue} data-type=\'plus\' onTouchEnd={this.handleClick} href="javascript:void(0)">+</a>\n                    </section>\n                </div>\n            );\n        }\n    })'
};