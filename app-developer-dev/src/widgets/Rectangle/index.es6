import React from 'react';

export let Rectangle = {
    id: 1006,
    caption: '矩形',
    originCaption: '矩形',
    fieldType: 'boolean',
    width: 200,
    height: 100,
    cssFile : '../static/widgets/Rectangle/style.css',
    icon: '../static/img/widgets/rectangle-icon.png',
    iconActive: '../static/img/widgets/rectangle-icon-active.png',
    scheme: ['caption', 'show', 'multi[0]'],
    grid: ['size','exterior','hierarchy'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/rectangle.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/rectangle-active.png" className="icon-active" />
                    <span>矩形</span>
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
                <div {...this.props} ref={this.props.ref} className={this.props.className || "widgetRectangle"}  ></div>
            );
        }
    })`
};