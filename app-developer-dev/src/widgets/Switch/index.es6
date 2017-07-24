import React from 'react';

export let Switch = {
    id: 10018,
    caption: '开关',
    originCaption: '开关',
    fieldType: 'Switch',
    width: 51,
    height: 30,
    cssFile : '../static/widgets/Switch/style.css',
    icon: '../static/img/widgets/switch-icon.png',
    iconActive: '../static/img/widgets/switch-icon-active.png',
    scheme: ['caption','widgetStyle','tone', 'show', 'switch', 'style','multi[0]'],
    grid: ['style','interactive','size','hierarchy'],
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
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/switch.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/switch-active.png" className="icon-active" />
                    <span>开关</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility == 2){
                AppActions.init(wid);
            }
            console.log(this.props.userWidgetID);
            if(!sessionStorage.getItem(this.props.userWidgetID)){
                var value = parseInt(this.props.activeStatus) + 1;
                var statusvalue = parseInt(this.props.activeStatus) == 1 ? 0 : 1;
                if(this.props.userWidgetID && !this.props.statusSet[statusvalue].statusField){
                    sessionStorage.setItem(this.props.userWidgetID,value);
                }
            }
        },
        handleClick: function(){
            var value,statusvalue,eventvalue;
            if(sessionStorage.getItem(this.props.userWidgetID)){
                value = sessionStorage.getItem(this.props.userWidgetID) == 1 ? 2 : 1;
                eventvalue = value - 1;
                statusvalue = eventvalue == 1 ? 0 : 1;
            }else{
                eventvalue = parseInt(this.props.activeStatus);
                value = eventvalue + 1;
                statusvalue = eventvalue == 1 ? 0 : 1;
            }
            sessionStorage.setItem(this.props.userWidgetID,value);
            var userWidgetID = this.props.userWidgetID;
            var arg = {};
            arg.userWidgetID = userWidgetID;
            arg.eventType = 3;
            arg.showWidgetList = [];
            arg.status = {
                userWidgetID:{
                    statusField:this.props.statusSet[statusvalue].statusField,
                    statusValue:this.props.statusSet[statusvalue].statusValue
                }
            };
            AppActions.toggle(arg);
            var item = this.props.eventSet[eventvalue];
            if (item.eventType == 1) {
                if(item.commandType == 2){
                    AppActions.complexCommand(item.commandConfigList);
                }else{
                    AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                }
            } else if (item.eventType == 2) {
                location.hash = '#/page/' + item.checkedPageId
            }else if (item.eventType == 3 || item.eventType == 4) {
                item.userWidgetID = userWidgetID;
                item.status = item['activeStatusField'];
                AppActions.toggle(item);
            }
        },
        render: function(){
            var switchClass = this.props.activeStatus == 1 ? 'switch-off' : 'switch-on';
            var sessionValue = this.props.userWidgetID ? sessionStorage.getItem(this.props.userWidgetID) : '';
            if(sessionValue){
                switchClass = sessionValue == 2 ? 'switch-off' : 'switch-on';
            }
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField]){
                        switchClass = index == 1 ? 'switch-off' : 'switch-on';
                    }
                });
            }

            var widgetInfo = this.props.widgetInfo;
            var switchStyle = widgetInfo.switchStyle ? widgetInfo.switchStyle : 0;
            var bgColor = null;
            if(switchClass == 'switch-on'){
                bgColor = this.props.style.backgroundColor;
            }
            return (
                <div {...this.props} ref={this.props.ref} style={Object.assign({}, this.props.style, {"backgroundColor" : "none"})} onTouchEnd={this.handleClick} className={(this.props.className || "widgetSwitch" +" "+ "switchStyle" + switchStyle)}>
                    <div className="switch-normal">
                        <span className={switchClass} style={{background:bgColor,borderColor:bgColor}}>
                            <em></em>
                        </span>
                    </div>
                    <div className="switch-xi">
                        <span className={switchClass}>
                            <em  style={{background:bgColor,borderColor:bgColor}}></em>
                        </span>
                    </div>
                </div>
            );
        }
    })`
};