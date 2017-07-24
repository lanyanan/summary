/**
 * 8颜色选择组件
 * @prop {integer} colorIndex 颜色索引，设置不同颜色，取值1-7
 * @act  AppActions.toggleColor([integer]) 切换颜色时触发
 */
import {Actions} from './Actions.es6';
export const Colors = React.createClass({
    items : [1,2,3,4,5,6,7,8],
    handlerClick : function(index) {
        return function(){
            event.preventDefault();
            Actions.toggleColor(index);
        };
    },
    render: function() {
        var idx = this.props.colorIndex;
        return (
            <section className="colors flex">
                {this.items.map(function(i, k){
                    return <a key={k} href="#" className={(i==idx?"on":"") + " flex-cell"} onClick={this.handlerClick(i)}><b className={"c"+i}>&#8730;</b></a>
                }.bind(this))}
            </section>
        );
    }
});
// module.exports = Colors;
