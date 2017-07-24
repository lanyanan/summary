import React from 'react';

export let SingleText = {
    id: 1001,
    caption: '文本',
    editText: '文本',
    originCaption: '文本',
    fieldType: 'string',
    width: 375,
    height: 50,
    cssFile : '../static/widgets/SingleText/style.css',
    icon: '../static/img/widgets/text-icon.png',
    iconActive: '../static/img/widgets/text-icon-active.png',
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    scheme: ['widgetStyle','tone','caption', 'show', 'text','textalign','color','fontStyle', 'statusshow',  'bold', 'italic', 'size', 'multi[0]'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/singletext.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/singletext-active.png" className="icon-active" />
                    <span>文本</span>
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
                    if(item.statusField && !item.statusValue){
                        value = _state[item.statusField] || value;
                        value = (_state[item.statusField]===0 || _state[item.statusField]==='0') ? 0 : value;
                    }else if(item.statusField && item.statusValue instanceof Array){
                        item.statusValue.map(function(option,j){
                            if(option.value == _state[item.statusField]){
                                value = option.meaning || value;
                            }
                        });
                    }
                });
            }
            return (
                <input {...this.props} ref={this.props.ref} className={this.props.className || "widgetSingleText"} disabled="disabled" value={value} />
            );
        }
    })`
};
//<input {...this.props} className="widgetSingleText" type="text" defaultValue="文字"/>
