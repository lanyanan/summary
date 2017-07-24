import React from 'react';

export let Calendar = {
    id: 1003,
    caption: '日历',
    originCaption: '日历',
    fieldType: 'boolean',
    width: 150,
    height: 20,
    cssFile : '../static/widgets/Calendar/style.css',
    icon: '../static/img/widgets/circle-icon.png',
    iconActive: '../static/img/widgets/circle-icon-active.png',
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    scheme: ['caption', 'show',  'status', 'event', 'multi[0]'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/calendar.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/calendar-active.png" className="icon-active" />
                    <span>日历</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        handleClick: function(){
            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.commandType==2){
                            AppActions.complexCommand(item.commandConfigList);
                        }else{
                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                        }
                    } else if (item.eventType==2) {
                        location.hash = '#/page/' + item.checkedPageId
                    }else if (item.eventType==3 || item.eventType==4) {
                        item.userWidgetID = userWidgetID;
                        AppActions.toggle(item);
                    }
                });
            }
        },
        render: function(){
            return (
                <input {...this.props} ref={this.props.ref} className={this.props.className || "widgetCalendar"} onTouchEnd={this.handleClick} type='date' />
            );
        }
    })`
};