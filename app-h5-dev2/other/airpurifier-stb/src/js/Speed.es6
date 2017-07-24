'use strict';
/**
 * 自动/静音/低档/中档/强档/
 * 
 * @prop {integer} speedIndex  模式索引，与id对应。取值1-5，超出范围默认为1
 * @act  Actions.selectSpeed([integer])  切换风速时触发该动作
 */
import {Actions} from './Actions.es6';

export const Speed = React.createClass({
    items : [
        {id:1, name:"自动"},
        {id:2, name:"静音"},
        {id:3, name:"低档"},
        {id:4, name:"中档"},
        {id:5, name:"强档"}
    ],
    handlerClick : function(e){
        let index = e.currentTarget.getAttribute('data-value');
        //console.log('index',index,this.props.speedIndex);
        if(index==this.props.speedIndex) return;
        Actions.selectSpeed(index);
    },
    render : function() {
        let idx = this.props.speedIndex,
        isStartup = this.props.isStartup,
        online = this.props.online;
        return (
            <section className="speed flex">
            <span >风速</span>
                {this.items.map(function(o){
                    return (
                        <dl key={o.id} className="flex-cell" data-value={o.id} onTouchEnd={this.handlerClick}>
                            <dd className={idx==o.id?"on":"off"}>{o.name}</dd>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});