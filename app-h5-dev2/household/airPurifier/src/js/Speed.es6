'use strict';
/**
 * 自动/高/中/低/睡眠/
 * 
 * @prop {integer} speedIndex  模式索引，与id对应。取值1-5，超出范围默认为1
 * @act  Actions.selectSpeed([integer])  切换风速时触发该动作
 */
import {Actions} from './Actions.es6';

export const Speed = React.createClass({
    items : [1,2,3,4,5],
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
            <span>风速</span>
                {this.items.map(function(o){
                    return (
                        <dl key={o} className={(idx==o?"on":"") + " flex-cell"} data-value={o} onTouchEnd={this.handlerClick}>
                            <dd><img src={isStartup===1&&online==='1'?(idx==o?"../static/img/speed/ic-"+o+"-on.png":"../static/img/speed/ic-"+o+"-off.png"):"../static/img/speed/ic-"+o+"-disable.png"} /></dd>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});