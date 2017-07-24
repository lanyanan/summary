/**
 * 定时开/关机组件
 * @prop {boolean} active      组件激活状态，用于控制组件开关
 * @prop {boolean} beShutdown  设备开/关机状态，用于控制显示“定时开机”或“定时关机”
 * @prop {integer} timeValue   定时开/关机时间
 * @act  AppActions.updateOrderTime([integer])        设置时间时触发该动作
 * @act  AppActions.toggleOrderTimeSwitch([boolean])  拨动开关时触发该动作
 */
export const Clock2 = React.createClass({
    lastSetTime: 0, // 缓存最后一次设置的时间，用于缓冲结束后发送
    sendTimer: 0, // 缓冲发送计时器
    isDelaying: false, // 缓冲标识
    getInitialState: function(){
        return {timeValue:0};
    },
    // 分钟数转换成00:00格式
    timeToValue: function(time) {
        return ("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2);
    },
    // 00:00格式转换成分钟数
    valueToTime: function(value) {
        var t = value.split(":");
        return parseInt(t[0]) * 60 + parseInt(t[1]);
    },
    handlerChange: function(){
        var $this = this;
        if (this.props.active) {
            this.lastSetTime = this.valueToTime(event.target.value);
            this.setState({timeValue:this.lastSetTime});
            this.isDelaying = true;
            clearTimeout(this.sendTimer);
            this.sendTimer = setTimeout(function(){
                // 缓冲1秒才发送数据
                $this.isDelaying = false;
                AppActions.updateOrderTime($this.lastSetTime);
            }, 1000);
        }
    },
    handlerSwitch: function(){
        AppActions.toggleOrderTimeSwitch(!this.props.active);
    },
    render: function() {
        var isShutdown = this.props.beShutdown;
        var time = this.isDelaying ? this.state.timeValue : this.props.timeValue;
        var active = this.props.active;
        time = typeof time==="undefined" ? 0 : time;
        return (
            <section className="clock2 flex">
                <dl className="flex-cell">
                    <dt>{isShutdown ? "定时开启":"定时关机"}</dt>
                    <dd>
                        <input type="time" onChange={this.handlerChange} value={this.timeToValue(time)} />
                    </dd>
                </dl>
                <p className="flex-cell">
                    <b onClick={this.handlerSwitch} className={"wg-switch " + (this.props.active ? "on" : "")}></b>
                </p>
            </section>
        );
    }
});
// module.exports = Clock2;
