'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedDial = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpeedDial = exports.SpeedDial = {
    id: 1020,
    caption: '九宫格',
    originCaption: '九宫格',
    fieldType: 'boolean',
    width: 375,
    height: 184,
    cssFile: '../static/widgets/SpeedDial/style.css',
    icon: '../static/img/widgets/grid-icon.png',
    iconActive: '../static/img/widgets/grid-icon-active.png',
    scheme: ['ranks', 'widgetStyle', 'speeddialShape', 'tone', 'caption', 'eValue', 'multi[0]'], // ranks：行列,speeddialShape:形状,speeddialStyle:样式,speeddialTone:色调
    grid: ['style', 'hierarchy', 'size', 'exterior'],
    widgetInfo: {
        dragStatus: { //判断能不能拖拽拉伸
            top: true,
            bottom: true,
            left: false,
            right: true,
            changeWidth: false,
            changeHeight: false
        },
        row: 1, //1行
        column: 2, //2列
        speedDialStyle: 0 },
    gridChildList: [],
    s: {
        tabName: '父亲1',
        childWidgetItem: [{
            tabName: '儿子1',
            grandchild: [{
                tabName: '孙子1'
            }, {
                tabName: '孙子2'
            }]
        }, {
            tabName: '儿子2',
            grandchild: [{
                tabName: '孙子1'
            }, {
                tabName: '孙子2'
            }]
        }]
    },
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-left' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/tab.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/tab-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u4E5D\u5BAB\u683C'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        getInitialState: function(){\n            return {\n            };\n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        componentWillReceiveProps: function(nextProps){\n            \n        },\n        render: function(){\n\n            var speeddialList = [],\n                widgetInfo = this.props.widgetInfo,\n                row = widgetInfo.row ? widgetInfo.row : 1,\n                column = widgetInfo.column ? widgetInfo.column : 2,\n                speeddialStyle = widgetInfo.speeddialStyle ? widgetInfo.speeddialStyle : 0,\n                speeddialShape = widgetInfo.speeddialShape ? widgetInfo.speeddialShape : 0,\n                speeddialColor = widgetInfo.speeddialColor ? widgetInfo.speeddialColor : "transparent",\n                num = row * column;\n            \n            for(var i=0; i<num; i++){\n                speeddialList.push({\n                    icon: \'../static/img/grid0.png\',\n                    text: i\n                });\n            }\n\n\n            return (\n                <div {...this.props}  className=\'speeddial\'>\n                    <ul className={"speeddial-wrap speeddial-style" + num}>\n                        {\n                            speeddialList.map(function(item,index){\n                                return (\n                                    <li key={index} style={{width: 100/parseInt(column) + \'%\'}}>\n                                        \n                                    </li>\n                                )\n                            })\n                        }\n                    </ul>\n                </div>\n            )\n        }\n    })'
};