'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RangeStall = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeStall = exports.RangeStall = {
    id: 1012,
    caption: '数字滑块',
    originCaption: '数字滑块',
    fieldType: 'boolean',
    width: 70,
    height: 306,
    cssFile: '../static/widgets/RangeStall/style.css',
    icon: '../static/img/widgets/stall-icon.png',
    iconActive: '../static/img/widgets/stall-icon-active.png',
    scheme: ['caption', 'show', 'range', 'stall', 'event', 'eValue', 'multi[0]'],
    grid: ['text', 'style', 'interactive', 'size', 'exterior', 'hierarchy'],
    prev: _react2.default.createClass({
        render: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'widget widget-right' },
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/srange.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/srange-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6570\u5B57\u6ED1\u5757'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        getInitialState:function(){\n            return {}\n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        rangechange:function(e){\n            //\u5904\u7406\u6ED1\u52A8\u66F4\u6539\u6863\u4F4D\n            if(!this.props.userWidgetID) return;\n            var windStall = e.target.value;\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            windStall = windStall>maxValue?maxValue:windStall;\n            windStall = windStall<minValue?minValue:windStall;\n            this.setState({\n                rangeValue:windStall\n            });\n        },\n        handleClick: function(e){\n            var value=e.target.value;\n            sessionStorage.setItem(this.props.userWidgetID,value);\n            var userWidgetID = this.props.userWidgetID;\n            var arg = {};\n            arg.userWidgetID = userWidgetID;\n            arg.eventType=3;\n            arg.showWidgetList=[];\n            arg.status = {\n                userWidgetID:{\n                    statusField:this.props.statusSet[0].statusField,\n                    statusValue:value\n                }\n            };\n            AppActions.toggle(arg);\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            item.eventValue = e.target.value;\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        AppActions.toggle(item);\n                    }\n                });\n            }\n        },\n        render: function(){\n            var sessionValue = this.props.userWidgetID?sessionStorage.getItem(this.props.userWidgetID):\'\';\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            var rateValue = parseInt(this.props.rateValue) || 1;\n            var rangeValue;\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusField && !item.statusValue){\n                        rangeValue = _state[item.statusField] || rangeValue;\n                    }\n                });\n            }\n            rangeValue = this.state.rangeValue || rangeValue || sessionValue || minValue || 0;\n            var fblock = (this.props.style.height/2-this.props.style.width/2-parseInt(this.props.style.height)*(rangeValue-minValue)/(maxValue-minValue));\n            fblock = fblock>0?\'-\'+fblock+\'px\':Math.abs(fblock)+\'px\';\n            var mLeft = 4.5-(16*rangeValue-16*minValue)/(maxValue-minValue)+\'px\';\n            var thumburl,trackurl;\n            if(this.props.styleList && this.props.styleList.rangeNumber instanceof Array){\n                this.props.styleList.rangeNumber.map(function(item,index){\n                    if(item.name==\'slider-thumb\'){\n                        thumburl = JSON.parse(item.url).pictureUrl;\n                    }else if(item.name==\'runnable-track\'){\n                        trackurl = JSON.parse(item.url).pictureUrl;\n                    }\n                });\n            }\n            var rangeStyle={\n                width:this.props.style.height,\n                height:this.props.style.width,\n                left:\'-\'+(this.props.style.height/2-this.props.style.width/2)+\'px\',\n                top:this.props.style.height/2-this.props.style.width/2+11+\'px\'\n            };\n            var trackStyle = {\n                left:this.props.style.width/2+\'px\',\n                top:\'22px\',\n                backgroundImage:\'url(\'+trackurl+\')\'\n            };\n            return (\n                <div className =\'hide\'  {...this.props} ref={this.props.ref}>\n                    <section className=\'rangeNumber\'>\n                        <section className=\'tips-on\' style={{left:fblock,marginLeft:mLeft,top:this.props.style.height/2-this.props.style.width/2+11+\'px\'}}>\n                            <span className=\'ratetext\'>{rangeValue}</span>\n                        </section>\n                        <input type=\'range\' style={rangeStyle} min={minValue} max={maxValue} value = {rangeValue} onChange={this.rangechange}\n                        onTouchEnd={this.handleClick} step={rateValue}  className={"widgetNumberChange "+this.props.className} />\n                        <span className=\'slider-on\' style={trackStyle}></span>\n                        <span className=\'rangeblock-on\' style={{left:fblock,marginLeft:mLeft,backgroundImage:\'url(\'+thumburl+\')\'}}></span>\n                    </section>\n                </div>\n            );\n        }\n    })'
};