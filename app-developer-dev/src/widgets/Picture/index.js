'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Picture = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picture = exports.Picture = {
    id: 1004,
    caption: '图像',
    originCaption: '图像',
    fieldType: 'boolean',
    width: 100,
    height: 100,
    scheme: ['caption', 'show', 'image', 'status', 'event', 'multi[0]'],
    cssFile: '../static/widgets/Picture/style.css',
    icon: '../static/img/widgets/img-icon.png',
    iconActive: '../static/img/widgets/img-icon-active.png',
    grid: ['interactive', 'size', 'exterior', 'hierarchy'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/picture.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/picture-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u56FE\u50CF'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        handleClick: function(){\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        item.status = item[\'activeStatusField\'];\n                        AppActions.toggle(item);\n                    }\n                });\n            }\n        },\n        render: function(){\n            var path = typeof this.props.imagePath !== \'undefined\' ?\n                    this.props.imagePath : \'\';\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var widgetStyle = this.props.style;\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusValue && item.statusValue == _state[item.statusField]){\n                        path = item.bgImagePath || \'\';\n                    }\n                });\n            }\n            if(this.props.styleList && this.props.styleList.image instanceof Array && !path){\n                this.props.styleList.image.map(function(item,index){\n                    if(item.name==\'noimage\'){\n                        path = JSON.parse(item.url).pictureUrl;\n                    }\n                });\n            }\n            return (\n                <img ref={this.props.ref} {...this.props} onTouchEnd={this.handleClick} src={path} className={this.props.className || "widgetPicture"}  />\n            );\n        }\n    })'
};