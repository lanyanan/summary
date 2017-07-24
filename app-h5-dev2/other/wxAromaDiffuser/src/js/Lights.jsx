/**
 * 全亮/半亮/关闭 灯
 * @prop {integer} lightIndex  灯索引，与id对应。取值1-3，超出范围将不点亮任何灯
 * @act  AppActions.toggleLight([integer])  切换灯时触发该动作
 */
import {Actions} from './Actions.es6';
export const Lights = React.createClass({
    items : [
        {id:1, name:"全亮灯"},
        {id:2, name:"半亮灯"},
        {id:3, name:"关闭灯"}
    ],
    handlerClick : function(index) {
        return function(){
            Actions.toggleLight(index);
        }
    },
    render : function() {
        var idx = this.props.lightIndex;
        return (
            <section className="lights flex">
                {this.items.map(function(o){
                    return (
                        <dl key={o.id} className={(idx==o.id?"on":"") + " flex-cell"} onClick={this.handlerClick(o.id)}>
                            <dd><img src={idx==o.id?"../static/img/aromaDiffuser/light"+o.id+"-on.png":"../static/img/aromaDiffuser/light"+o.id+"-off.png"} /></dd>
                            <dt>{o.name}</dt>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});
// module.exports = Lights;
