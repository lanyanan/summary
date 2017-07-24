import React from 'react';

export let VerticalLine = {
    id: 1010,
    caption: '竖线',
    originCaption: '竖线',
    fieldType: 'boolean',
    width: 1,
    height: 150,
    cssFile : '../static/widgets/VerticalLine/style.css',
    icon: '../static/img/widgets/vline-icon.png',
    iconActive: '../static/img/widgets/vline-icon-active.png',
    grid: ['size','exterior','hierarchy'],
    scheme: ['caption', 'show', 'multi[0]'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/vline.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/vline-active.png" className="icon-active" />
                    <span>竖线</span>
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
        render: function(){
            return (
                <div {...this.props} ref={this.props.ref} className={this.props.className || "widgetVerticalLine"}></div>
            );
        }
    })`
};