'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Calendar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = exports.Calendar = {
    id: 1003,
    caption: '日历',
    originCaption: '日历',
    fieldType: 'boolean',
    width: 150,
    height: 20,
    cssFile: '../static/widgets/Calendar/style.css',
    icon: '../static/img/widgets/circle-icon.png',
    iconActive: '../static/img/widgets/circle-icon-active.png',
    grid: ['text', 'style', 'interactive', 'size', 'exterior', 'hierarchy'],
    scheme: ['caption', 'show', 'status', 'event', 'multi[0]'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/calendar.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/calendar-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u65E5\u5386'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        handleClick: function(){\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        AppActions.toggle(item);\n                    }\n                });\n            }\n        },\n        render: function(){\n            return (\n                <input {...this.props} ref={this.props.ref} className={this.props.className || "widgetCalendar"} onTouchEnd={this.handleClick} type=\'date\' />\n            );\n        }\n    })'
};