'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Popups = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Popups = exports.Popups = {
    id: 1016,
    caption: '双按钮弹窗',
    editText: '我是弹窗-双按钮',
    title: '弹窗标题',
    originCaption: '双按钮弹窗',
    fieldType: 'boolean',
    width: 325,
    height: 200,
    zIndex: 999,
    cssFile: '../static/widgets/Popups/style.css',
    icon: '../static/img/widgets/popus-icon.png',
    iconActive: '../static/img/widgets/popus-icon-active.png',
    scheme: ['caption', 'show', 'title', 'text', 'popupButtonTone', 'event'],
    grid: ['text', 'interactive', 'size', 'exterior', 'hierarchy'],
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
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/popups.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/popups-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u53CC\u6309\u94AE\u5F39\u7A97'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        getInitialState: function(){\n            return {\n               show:true,\n               shadeShow:false\n            };\n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n            sessionStorage.removeItem(\'popup_show\');\n        },\n        handleConcel: function(){\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.setState({show:false});\n            } \n        },\n        handleConfirm: function(){\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.setState({show:false,shadeShow:false});\n            }\n            sessionStorage.setItem(\'popup_show\', false);\n\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        item.status = item[\'activeStatusField\'];\n                        AppActions.toggle(item);\n                    }\n                });\n            }\n        },\n        \n        render: function(){\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var userWidgetID = this.props.userWidgetID;\n            var styleObj = this.props.style;\n            var show =  true,shadeShow =this.state.shadeShow;\n            var popup_show = sessionStorage.getItem(\'popup_show\');\n            if(_state ){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusValue && item.statusValue == _state[item.statusField] && popup_show!=\'false\'){\n                        show =true;\n                        shadeShow = true;\n                    }else{\n                        show =false;\n                        shadeShow = false;\n                    }\n                });\n            }\n            if(!this.state.show || popup_show == \'false\' ){\n                show =false;\n                shadeShow = false;\n\n            }\n            var widgetInfo = this.props.widgetInfo;\n            var popupButtonBgColor = widgetInfo.popupButtonBgColor ? widgetInfo.popupButtonBgColor : null;\n\n            return (\n                <div  ref={this.props.ref}  {...this.props} className=\'widgetPopups\'>\n                    <section  className=\'popups\'  \n                    style={{\n                        display:(!show?"none":"block"),\n                        background:styleObj.backgroundColor,\n                        border: (styleObj.borderWidth +\'px solid \'+ styleObj.borderColor).toString(),\n                        borderRadius:styleObj.borderRadius\n                    }}>\n                        <p className=\'title\'>{this.props.title}</p>\n                        <textarea disabled="disabled" className=\'content\'  value={this.props.text} ></textarea>\n                        <div className=\'botton-box\' style={{backgroundColor:popupButtonBgColor}} ><span onTouchEnd={this.handleConcel} >\u53D6\u6D88</span><span onTouchEnd={this.handleConfirm}>\u786E\u5B9A</span></div>\n                    </section>\n                    <section className=\'shade\' style={{display:(!shadeShow?"none":"block")}}></section>\n                </div>            \n                )\n        }\n    })'
};