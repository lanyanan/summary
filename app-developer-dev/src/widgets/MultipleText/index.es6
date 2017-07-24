import React from 'react';

export let MultipleText = {
    id: 1002,
    caption: '多行文本',
    editText: '多行文本',
    originCaption: '多行文本',
    fieldType: 'boolean',
    width: 375,
    height: 58,
    cssFile : '../static/widgets/MultipleText/style.css',
    icon: '../static/img/widgets/text-icon.png',
    iconActive: '../static/img/widgets/text-icon-active.png',
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    scheme: ["widgetStyle","tone",'caption', 'show', 'text','color','fontStyle', 'statusshow', 'bold', 'italic', 'size', 'multi[0]'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/multipletext.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/multipletext-active.png" className="icon-active" />
                    <span>多行文本</span>
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
            var value = this.props.text;
            var _state = typeof __props !== 'undefined' ? __props : '';
            var widgetStyle = this.props.style;
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusField){
                        value = _state[item.statusField] || value;
                    }
                });
            }
            return (
                <textarea disabled="disabled" ref={this.props.ref} {...this.props} className={this.props.className || "widgetMultipleText"} value={value}>
                </textarea>
            );
        }
    })`
};
//<textarea {...this.props} className="widgetMultipleText" value={this.props.caption}></textarea>