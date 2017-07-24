'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Switch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switch = exports.Switch = {
    id: 10018,
    caption: '开关',
    originCaption: '开关',
    fieldType: 'Switch',
    width: 51,
    height: 30,
    cssFile: '../static/widgets/Switch/style.css',
    icon: '../static/img/widgets/switch-icon.png',
    iconActive: '../static/img/widgets/switch-icon-active.png',
    scheme: ['caption', 'widgetStyle', 'tone', 'show', 'switch', 'style', 'multi[0]'],
    grid: ['style', 'interactive', 'size', 'hierarchy'],
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
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/switch.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/switch-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5F00\u5173'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility == 2){\n                AppActions.init(wid);\n            }\n            console.log(this.props.userWidgetID);\n            if(!sessionStorage.getItem(this.props.userWidgetID)){\n                var value = parseInt(this.props.activeStatus) + 1;\n                var statusvalue = parseInt(this.props.activeStatus) == 1 ? 0 : 1;\n                if(this.props.userWidgetID && !this.props.statusSet[statusvalue].statusField){\n                    sessionStorage.setItem(this.props.userWidgetID,value);\n                }\n            }\n        },\n        handleClick: function(){\n            var value,statusvalue,eventvalue;\n            if(sessionStorage.getItem(this.props.userWidgetID)){\n                value = sessionStorage.getItem(this.props.userWidgetID) == 1 ? 2 : 1;\n                eventvalue = value - 1;\n                statusvalue = eventvalue == 1 ? 0 : 1;\n            }else{\n                eventvalue = parseInt(this.props.activeStatus);\n                value = eventvalue + 1;\n                statusvalue = eventvalue == 1 ? 0 : 1;\n            }\n            sessionStorage.setItem(this.props.userWidgetID,value);\n            var userWidgetID = this.props.userWidgetID;\n            var arg = {};\n            arg.userWidgetID = userWidgetID;\n            arg.eventType = 3;\n            arg.showWidgetList = [];\n            arg.status = {\n                userWidgetID:{\n                    statusField:this.props.statusSet[statusvalue].statusField,\n                    statusValue:this.props.statusSet[statusvalue].statusValue\n                }\n            };\n            AppActions.toggle(arg);\n            var item = this.props.eventSet[eventvalue];\n            if (item.eventType == 1) {\n                if(item.commandType == 2){\n                    AppActions.complexCommand(item.commandConfigList);\n                }else{\n                    AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                }\n            } else if (item.eventType == 2) {\n                location.hash = \'#/page/\' + item.checkedPageId\n            }else if (item.eventType == 3 || item.eventType == 4) {\n                item.userWidgetID = userWidgetID;\n                item.status = item[\'activeStatusField\'];\n                AppActions.toggle(item);\n            }\n        },\n        render: function(){\n            var switchClass = this.props.activeStatus == 1 ? \'switch-off\' : \'switch-on\';\n            var sessionValue = this.props.userWidgetID ? sessionStorage.getItem(this.props.userWidgetID) : \'\';\n            if(sessionValue){\n                switchClass = sessionValue == 2 ? \'switch-off\' : \'switch-on\';\n            }\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusValue && item.statusValue == _state[item.statusField]){\n                        switchClass = index == 1 ? \'switch-off\' : \'switch-on\';\n                    }\n                });\n            }\n\n            var widgetInfo = this.props.widgetInfo;\n            var switchStyle = widgetInfo.switchStyle ? widgetInfo.switchStyle : 0;\n            var bgColor = null;\n            if(switchClass == \'switch-on\'){\n                bgColor = this.props.style.backgroundColor;\n            }\n            return (\n                <div {...this.props} ref={this.props.ref} style={Object.assign({}, this.props.style, {"backgroundColor" : "none"})} onTouchEnd={this.handleClick} className={(this.props.className || "widgetSwitch" +" "+ "switchStyle" + switchStyle)}>\n                    <div className="switch-normal">\n                        <span className={switchClass} style={{background:bgColor,borderColor:bgColor}}>\n                            <em></em>\n                        </span>\n                    </div>\n                    <div className="switch-xi">\n                        <span className={switchClass}>\n                            <em  style={{background:bgColor,borderColor:bgColor}}></em>\n                        </span>\n                    </div>\n                </div>\n            );\n        }\n    })'
};