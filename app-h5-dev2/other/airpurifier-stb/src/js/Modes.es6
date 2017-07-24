'use strict';
/**
 * 自动/标准/速净/省电/睡眠
 * @prop {integer} modeIndex  模式索引，与id对应。取值1-3，超出范围默认为1
 * @prop {integer} strong  强效 为 独立功能 1 非 2真
 * @act  Actions.selectAny([integer])  切换灯时触发该动作
 */
import {Actions} from './Actions.es6';

export const Modes = React.createClass({
    items : [
        {id:3, name:"标准"},
        {id:1, name:"加湿"},
        {id:2, name:"睡眠"}
    ],
    getInitialState: function(){
        return {strong:this.props.strong};
    },
    handlerClick : function(e){
        let index = e.currentTarget.getAttribute('data-value');
        //console.log('index',index,this.props.modeIndex);
        if(index==this.props.modeIndex) return;
        Actions.selectAny(index);
    },
    switchStrong : function(e){
        let strong = this.props.strong;
        Actions.toggleStrong(strong==1?2:1);
    },
    render : function() {
        let idx = this.props.modeIndex,
        strong = this.props.strong;

        return (
            <section className="modes flex">
                {this.items.map(function(o){
                    return (
                        <dl key={o.id} className={(idx==o.id?"on ":"") + "flex-cell"} data-value={o.id} onTouchEnd={this.handlerClick}>
                            <dd><img src={idx==o.id?"../static/img/mode"+o.id+"-on.png":"../static/img/mode"+o.id+"-off.png"} /></dd>
                            <dt>{o.name}</dt>
                        </dl>
                    );
                }.bind(this))}
                <dl key={4} className={(strong==2?"on ":"") + "flex-cell"}  onTouchEnd={this.switchStrong}>
                    <dd><img src={strong==2?"../static/img/mode4-on.png":"../static/img/mode4-off.png"} /></dd>
                    <dt>强效</dt>
                </dl>
            </section>
        );
    }
});