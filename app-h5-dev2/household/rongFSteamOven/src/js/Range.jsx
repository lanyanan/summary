/**
 * 滑动选择器组件
 * @prop {integer}  value       传入初始值
 * @prop {function} fnFeedback  用于接收处理结果的函数
 * @prop {integer}  min         可选，最小值，缺省为0
 * @prop {integer}  max         可选，最大值，缺省为100
 */
import {initDataFm} from './constants';

export const Range = React.createClass({
    getInitialState: function () {
        return {};
    },
    min: function () {
        let minVal = this.props.min || 0, maxVal = this.props.max || 0;
        if (minVal == maxVal) {
            minVal = 5
        }
        return minVal;
    },
    max: function () {
        let minVal = this.props.min || 0, maxVal = this.props.max || 0;
        if (minVal == maxVal) {
            if (this.props.type == 'time') {
                maxVal = 180;
            } else {
                maxVal = 250;
            }
        }
        return maxVal;
    },
    // 定位
    pos: function (value) {
        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
        var cursor2 = ReactDOM.findDOMNode(this.refs["cursor2"]);
        var rate = (value < this.min() ? 0 : value - this.min()) / (this.max() - this.min()); // 比率
        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
        cursor.style.left = left + "px";
        cursor2.style.left = left + "px";
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
        let minTimeText = initDataFm(parseInt(this.min() / 60)) + ":" + initDataFm(this.min() % 60);
        let maxTimeText = initDataFm(parseInt(this.max() / 60)) + ":" + initDataFm(this.max() % 60);
        let minVal = this.min(), maxVal = this.max();
        if (minVal == maxVal) {
            if (this.props.type == 'time') {
                minVal = 5;
                maxVal = 180;
            } else {
                minVal = 5;
                maxVal = 250;
            }
        }
        return (
            <div className={this.props.module == 'dialog' ? "range dialog-range" : "range"}>
                <span>{this.props.type == 'time' ? minTimeText : this.min()}</span>
                <label ref="wrap">
                    <input type="range" step={this.props.rate} min={minVal} max={maxVal}
                           onTouchEnd={this.selectRange} onChange={this.handlerChange} value={value || 0}
                           disabled={this.props.min == this.props.max ? "disabled" : ""}/>
                    <i ref="cursor" className={this.props.min == this.props.max ? "cursor" : ""} id="glide">{value}</i>
                    <i style={{display: this.props.min == this.props.max ? "" : "none"}} ref="cursor2"
                       className="cursor2"></i>
                </label>
                <span>{this.props.type == 'time' ? maxTimeText : this.max()}</span>
            </div>
        );
    }
});
