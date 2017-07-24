import React from 'react';

export let HorizontalLine = {
    id: 1009,
    caption: '横线',
    originCaption: '横线',
    fieldType: 'boolean',
    width: 150,
    height: 1,
    cssFile : '../static/widgets/HorizontalLine/style.css',
    icon: '../static/img/widgets/line-icon.png',
    iconActive: '../static/img/widgets/line-icon-active.png',
    grid: ['size','exterior','hierarchy'],
    scheme: ['caption', 'show', 'multi[0]'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/horizontal-line.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/horizontal-line-active.png" className="icon-active" />
                    <span>横线</span>
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
                <div {...this.props} ref={this.props.ref} className={this.props.className || "widgetHorizontalLine"}  ></div>
            );
        }
    })`
};