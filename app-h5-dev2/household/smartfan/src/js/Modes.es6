'use strict';
/**
 * 标准风/自然风/睡眠风/智能风/采集风
 * @prop {integer} windType  模式索引，与id对应。取值1-5，超出范围默认为6
 * @act  Actions.selectMode([integer])  切换模式时触发该动作
 */
import {Actions} from './Actions.es6';

export const Modes = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    items : [
        {id:1, name:"标准风"},
        {id:2, name:"自然风"},
        {id:3, name:"睡眠风"},
        {id:4, name:"智能风"},
        {id:5, name:"采集风"}
    ],
    handlerClick : function(e){
        let index = e.currentTarget.getAttribute('data-value');
        if(index==this.props.windType) return;
        Actions.selectMode(index);
    },
    render : function() {
        let idx = this.props.windType || 6;
        return (
            <section className="modes flex">
                {this.items.map(function(o){
                    if(this.props.modedisable){
                        return (
                            <dl className="flex-cell" key={o.id}>
                                <dd><img src={"../static/img/smartFan/mode"+o.id+"-disable.png"} /></dd>
                                <dt>{o.name}</dt>
                            </dl>
                        );
                    }
                    else{
                        return (
                            <dl className="flex-cell" key={o.id} data-value={o.id} onTouchEnd={this.handlerClick}>
                                <dd><img src={(idx==o.id)?"../static/img/smartFan/mode"+o.id+"-on.png":"../static/img/smartFan/mode"+o.id+"-off.png"} /></dd>
                                <dt>{o.name}</dt>
                            </dl>
                        );
                    }
                }.bind(this))}
            </section>
        );
    }
});