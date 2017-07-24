'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SinglePopup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SinglePopup = exports.SinglePopup = {
    id: 1015,
    caption: '单按钮弹窗',
    editText: '我是弹窗',
    title: '弹窗标题',
    bottonDetail: '弹窗按钮内容',
    originCaption: '单按钮弹窗',
    fieldType: 'boolean',
    width: 325,
    height: 200,
    zIndex: 999,
    cssFile: '../static/widgets/SinglePopup/style.css',
    icon: '../static/img/widgets/h1-icon.png',
    iconActive: '../static/img/widgets/h1-icon-active.png',
    grid: ['text', 'interactive', 'size', 'exterior', 'hierarchy'],
    scheme: ['caption', 'show', 'title', 'status', 'no-priority', 'text', 'bottonDetail', 'popupButtonTone', 'multi[0]'],
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
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/singlepopup.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/singlepopup-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u5355\u6309\u94AE\u5F39\u7A97'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        getInitialState: function(){\n            return {\n                firstShow: true,\n                show:true,\n                shadeShow:false\n            };\n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var userWidgetID = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(userWidgetID);\n            }\n        },\n        handleClick: function(){\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var userWidgetID = this.props.userWidgetID;\n            console.log(_state);\n            if(_state){\n                this.setState({\n                    show:false,\n                    shadeShow:false\n                });\n            } \n        },\n        render: function(){\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var userWidgetID = this.props.userWidgetID;\n            var styleObj = this.props.style;\n            var show =  true,shadeShow = this.state.shadeShow;\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusValue && item.statusValue == _state[item.statusField]){\n                        show = true;\n                        shadeShow = true;\n                    }else{\n                        show = false;\n                        shadeShow = false;\n                    }\n                });\n            }\n            if(!this.state.show){\n                show = false;\n                shadeShow = false;\n            }\n            var widgetInfo = this.props.widgetInfo;\n            var popupButtonBgColor = widgetInfo.popupButtonBgColor ? widgetInfo.popupButtonBgColor : null;\n            \n            return (\n                <div {...this.props} ref={this.props.ref} className=\'widgetSinglePopup\'>\n                    <section  className=\'singlePopup\'  \n                    style={{\n                        display:(!show?"none":"block"),\n                        background:styleObj.backgroundColor,\n                        border: (styleObj.borderWidth +\'px solid \'+ styleObj.borderColor).toString(),\n                        borderRadius:styleObj.borderRadius\n                    }}>\n                        <p className=\'title\'>{this.props.title}</p>\n                        <textarea disabled="disabled" className=\'content\'  value={this.props.text}></textarea>\n                        <div className=\'botton\' onTouchEnd={this.handleClick} style={{backgroundColor:popupButtonBgColor}}>{this.props.bottonDetail}</div>\n                    </section>\n                    <section className=\'shade\'  style={{display:(!shadeShow?"none":"block")}}></section>\n                </div>            \n                )\n        }\n    })'
};