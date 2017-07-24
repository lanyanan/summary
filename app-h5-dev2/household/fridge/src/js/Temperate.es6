/**
 * 温度设置组件
 * @prop {integer}  value 当前温度值
 * @prop {integer}  min   最小温度值
 * @prop {integer}  max   最大温度值
 * @prop {boolean}  minus 是否有负号
 * @prop {function} cb    可选，调节温度后的回调函数
 */
import Range from './../../../common/src/lib/range.jsx';
export class Temperate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp : null,
            last : props.min // 上一次数据
        };
    }
    feedback(value) {
        let val = Math.round(value / 10);
        this.setState({temp: this.props.minus ? -val : val});
    }
    touchEnd(e) {
        let val = this.isNum(this.state.temp) ? this.state.temp : this.state.last; // 防止无效操作
        if (typeof this.props.cb==='function' && this.state.temp != this.state.last) {
            this.props.cb(val);
        }
        this.setState({temp: null, last: val});
    }
    isNum(s) {
        if (s!==null && s!=='') return !isNaN(s);
        return false;
    }
    render() {
        let min = this.props.minus ? -this.props.min : this.props.min;
        let max = this.props.minus ? -this.props.max : this.props.max;
        let value = this.props.minus ? -this.props.value : this.props.value;
        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }
        return <ul className={this.props.className + ' temperate'}>
            <li>{this.props.min}℃</li>
            <li className="t-wrap">
                <div className="t-range" onTouchEnd={this.touchEnd.bind(this)}><Range min={min * 10} max={max * 10} value={value * 10} fnFeedback={this.feedback.bind(this)} /></div>
                <span className="t-value">{this.state.temp===null ? this.props.value : this.state.temp}℃</span>
            </li>
            <li>{this.props.max}℃</li>
        </ul>;
    }
};
