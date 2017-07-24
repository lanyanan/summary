'use strict';
/**
 * 自动/标准/速净/省电/睡眠
 * @prop {integer} modeIndex  模式索引，与id对应。取值1-5，超出范围默认为1
 * @act  Actions.selectAny([integer])  切换灯时触发该动作
 */
import {Actions} from './Actions.es6';

export const Modes = React.createClass({
    items : [
        {id:1, name:"自动"},
        {id:2, name:"标准"},
        {id:3, name:"速净"},
        {id:4, name:"省电"},
        {id:5, name:"睡眠"}
    ],
    handlerClick : function(e){
        let index = e.currentTarget.getAttribute('data-value');
        //console.log('index',index,this.props.modeIndex);
        if(index==this.props.modeIndex) return;
        Actions.selectAny(index);
    },
    render : function() {
        let idx = this.props.modeIndex;
        return (
            <section className="modes flex">
                {this.items.map(function(o){
                    return (
                        <dl key={o.id} className={(idx==o.id?"on":"") + " flex-cell"} data-value={o.id} onTouchEnd={this.handlerClick}>
                            <dd><img src={idx==o.id?"../static/img/airPurifier/mode"+o.id+"-on.png":"../static/img/airPurifier/mode"+o.id+"-off.png"} /></dd>
                            <dt>{o.name}</dt>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});