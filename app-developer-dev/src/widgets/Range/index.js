'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Range = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = exports.Range = {
    id: 1007,
    caption: '滑块',
    originCaption: '滑块',
    fieldType: 'boolean',
    width: 306,
    height: 70,
    cssFile: '../static/widgets/Range/style.css',
    icon: '../static/img/widgets/range-icon.png',
    iconActive: '../static/img/widgets/range-icon-active.png',
    scheme: ['rangeType', 'widgetStyle', 'tone', 'caption', 'show', 'range', 'scopeStatus', 'event', 'eValue', 'multi[0]'],
    grid: ['style', 'interactive', 'size', 'hierarchy', 'scope'],
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
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/range.png', className: 'icon' })),
                _react2.default.createElement('img', _extends({}, this.props, { src: '../static/img/widgets/range-active.png', className: 'icon-active' })),
                _react2.default.createElement(
                    'span',
                    null,
                    '\u6ED1\u5757'
                )
            );
        }
    }),
    dom: 'React.createClass({\n        getInitialState:function(){\n            return {}\n        },\n        componentDidMount: function() {\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            var wid = this.props.userWidgetID;\n            if(!_state.hiddenArray&&this.props.statusVisibility==2){\n                AppActions.init(wid);\n            }\n        },\n        rangechange:function(e){\n            //\u5904\u7406\u6ED1\u52A8\u66F4\u6539\u6863\u4F4D\n            if(!this.props.userWidgetID) return;\n            var windStall = e.target.value;\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            windStall = windStall>maxValue?maxValue:windStall;\n            windStall = windStall<minValue?minValue:windStall;\n            this.setState({\n                rangeValue:windStall\n            });\n        },\n        handleClick: function(e){\n            //\u5904\u7406\u6ED1\u52A8\u5B8C\u6210\u89E6\u53D1\u4E8B\u4EF6\n            var value=e.target.value;\n            sessionStorage.setItem(this.props.userWidgetID,value);\n            var userWidgetID = this.props.userWidgetID;\n            var arg = {};\n            arg.userWidgetID = userWidgetID;\n            arg.eventType=3;\n            arg.showWidgetList=[];\n            arg.status = {\n                userWidgetID:{\n                    statusField:this.props.statusSet[0].statusField,\n                    statusValue:value\n                }\n            };\n            AppActions.toggle(arg);\n            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){\n                var userWidgetID = this.props.userWidgetID;\n                this.props.eventSet.map(function(item,index){\n                    if (item.eventType==1) {\n                        if(item.commandType==2){\n                            AppActions.complexCommand(item.commandConfigList);\n                        }else{\n                            item.eventValue = e.target.value;\n                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);\n                        }\n                    } else if (item.eventType==2) {\n                        location.hash = \'#/page/\' + item.checkedPageId\n                    }else if (item.eventType==3 || item.eventType==4) {\n                        item.userWidgetID = userWidgetID;\n                        AppActions.toggle(item);\n                    }\n                });\n            }\n        },\n        render: function(){\n            var sessionValue = this.props.userWidgetID?sessionStorage.getItem(this.props.userWidgetID):\'\';\n            var minValue = parseInt(this.props.minValue) || 0;\n            var maxValue = parseInt(this.props.maxValue) || 100;\n            var rateValue = parseInt(this.props.rateValue) || 1;\n            var rangeValue;\n            var _state = typeof __props !== \'undefined\' ? __props : \'\';\n            if(_state){\n                this.props.statusSet.map(function(item,index){\n                    if(item.statusField && !item.statusValue){\n                        //\u5BF9\u5E94\u65E0\u6863\u4F4D\u60C5\u51B5\n                        rangeValue = _state[item.statusField] || rangeValue;\n                    }else if(item.statusField && _state[item.statusField]==item.statusValue){\n                        //\u5BF9\u5E94\u6709\u6863\u4F4D\u60C5\u51B5\n                        rangeValue = _state[item.statusField] || rangeValue;\n                    }\n                });\n            }\n            rangeValue = this.state.rangeValue || rangeValue || sessionValue || minValue || 0;\n            var windStall = parseInt((rangeValue-minValue)/rateValue);\n            if(this.props.stallShow===true && this.props.statusSet){\n                var arrLength = this.props.statusSet.length-1;\n            }\n            var fblock = parseInt(100*(rangeValue-minValue)/(maxValue-minValue))+\'%\';\n            var fbLeft = \'-\'+parseInt(11*(rangeValue-minValue)/(maxValue-minValue))+\'px\';\n            var sunImg = [];\n            if(this.props.styleList && this.props.styleList.range instanceof Array){\n                this.props.styleList.range.map(function(item,index){\n                    sunImg.push(JSON.parse(item.url).pictureUrl);\n                });\n            }\n\n            var widgetInfo = this.props.widgetInfo;\n            var rangeStyle = widgetInfo.rangeStyle ? widgetInfo.rangeStyle : 0;\n            var rangePercent = widgetInfo.rangePercent ? widgetInfo.rangePercent : false;\n            return (\n                <div {...this.props} style={Object.assign({},this.props.style,{"backgroundColor":"none"})} ref={this.props.ref}>\n                    <section className={rangeStyle?\'rangeblock range-style\'+rangeStyle : "rangeblock range-style0"} >\n                        <input type=\'range\'  min={minValue} max={maxValue} value = {rangeValue} onChange={this.rangechange}\n                        onTouchEnd={this.handleClick} step={rateValue}  className={this.props.className || "widgetRange"} />\n                        <span className=\'slider-on\'></span>\n                        <span className=\'slider-on-active\' style={{width:fblock,background:this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a96ff"}}></span>\n                        <span className=\'rangeblock-on\' style={{left:fblock,marginLeft:fbLeft}}>\n                            <em style={{display:rangePercent ? "block" : "none",color: this.props.style.backgroundColor}}>{fblock}</em>\n                        </span>\n                        \n                        <div className="range-num">\n                            <span>0%</span>\n                            <i>100%</i>\n                        </div>\n                        <div className="range-sun">\n                            <span style={{backgroundImage:\'url(\'+sunImg[0]+\')\'}}></span>\n                            <i  style={{backgroundImage:\'url(\'+sunImg[1]+\')\'}}></i>\n                        </div>\n                        {\n                            this.props.statusSet&&this.props.stallShow?this.props.statusSet.map(function(item,index){\n                            return(\n                                <div key={index}>\n                                    <span className=\'stallName\' style={{left:(100*index/arrLength)+\'%\',marginLeft:\'-\'+(13*index/arrLength)-14+\'px\'}}>\n                                        {item.statusName}\n                                    </span>\n                                    <i className=\'stallPoint\' style={{left:(100*index/arrLength)+\'%\',marginLeft:0-(13*index/arrLength)+8+\'px\'}}></i>\n                                </div>\n                            )\n                        }):null}\n                    </section>\n                </div>\n            );\n        }\n    })'
};