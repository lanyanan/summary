/**
 * 滑动选择器组件
 * @prop {integer}  value       传入初始值
 * @prop {function} fnFeedback  用于接收处理结果的函数
 * @prop {integer}  min         可选，最小值，缺省为0
 * @prop {integer}  max         可选，最大值，缺省为100
 * @prop {boolean}  disabled    可选，是否可以点击
 */

var Range = React.createClass({
    getInitialState: function () {
        return {};
    },
    min: function () {
        return this.props.min || "0";
    },
    max: function () {
        return this.props.max || "100";
    },
    // 定位
    pos: function (value) {
        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
        cursor.style.left = left + "px";
    },
    handlerChange: function (e) {
        var value = parseInt(e.target.value);
        //this.setState({value:value});
        if (typeof this.props.fnFeedback === "function") {
            this.props.fnFeedback(value); // 反馈处理结果
        }
        this.props.fnFeedback(value);

        //Actions.slide(value);
    },
    selectRange: function (e) {

        var range = parseInt(e.target.value);
        // console.log(range);
        // this.props.fnFeedback(range);
        //Actions.selectRange(range);

    },
    componentDidUpdate: function () {
        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
        this.state.value = value; // 强行保持state与value同步
        this.pos(value);
    },
    componentDidMount: function () {
        this.componentDidUpdate();
    },
    render: function () {
        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
        var hourtext = parseInt(this.max()/60);
        var mintext = this.max()%60
        return (
            <div className="__range">
                <span>{this.props.type == 'time' ? '00:01' : this.min()}</span>
                <label ref="wrap">
                    <input type="range" min={this.min()} max={this.max()} onTouchEnd={this.selectRange} onChange={this.handlerChange} value={value || 0} disabled={this.props.disabled ? "disabled" : ""} />
                    <i ref="cursor" className="cursor" id="glide"   >{value}</i>
                </label>
                <span>{this.props.type == 'time' ? `${hourtext}:${mintext}` : this.max()}</span>
            </div>
        );
    }
});

module.exports = Range;
