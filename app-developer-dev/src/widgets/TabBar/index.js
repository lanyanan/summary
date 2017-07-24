'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TabBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arr = [],
    arrChild = [];
arr.push(arrChild);
var TabBar = exports.TabBar = {
    id: 1019,
    caption: '选项卡',
    editText: '选项卡',
    originCaption: '选项卡',
    fieldType: 'boolean',
    width: 375,
    height: 375,
    cssFile: '../static/widgets/TabBar/style.css',
    icon: '../static/img/widgets/tab-icon.png',
    iconActive: '../static/img/widgets/tab-icon-active.png',
    widgetListItem: arr,
    scheme: ['caption', 'show', 'select'],
    grid: ['select', 'size', 'exterior', 'hierarchy'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/tabBar.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/tabBar-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u9009\u9879\u5361'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        render: function(){\n            return (\n            <div {...this.props} ref={this.props.ref}  className={this.props.tabEdit > -1? "dash" : \'widgetTabBar\'} ></div>\n            )\n        }\n    })'
};