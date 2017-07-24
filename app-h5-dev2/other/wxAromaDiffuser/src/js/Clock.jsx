/**
 * 定时选择组件
 * @prop {integer} timeValue  定时时间值，取值30分钟的整数倍
 * @act  AppActions.toggleTimeClock([integer])  选择时间时触发
 */
export const Clock = React.createClass({
    items: [
        {name:"关闭", value:"0"},
        {name:"30分钟", value:"30"},
        {name:"60分钟", value:"60"},
        {name:"120分钟", value:"120"}
    ],
    handlerClick: function(value) {
        return function(){
            AppActions.toggleTimeClock(value);
        }
    },
    render: function() {
        var time = this.props.timeValue;
        return (
            <section className="clock flex">
                {this.items.map(function(o, idx){
                    return (
                        <dl key={idx} className={(o.value==time?"on":"")+ " flex-cell"} onClick={this.handlerClick(o.value)}>
                            <dd></dd>
                            <dt>{o.name}</dt>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});
// module.exports = Clock;
