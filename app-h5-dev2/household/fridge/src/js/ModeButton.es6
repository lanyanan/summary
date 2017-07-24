/**
 * 温度设置组件
 * @prop {string}   mode 模式名称
 * @prop {string}   text 文字描述
 * @prop {boolean}  on   是否开启状态
 * @prop {function} cb   可选，点击后的回调函数
 */
export class ModeButton extends React.Component {
    constructor(props) {
        super(props);
    }
    touchStart() {
        if (typeof this.props.cb==='function') {
            if (this.props.on) { // 当前是开启状态，再点击时进入退出模式
                this.props.cb('exit');
            } else { // 当前是关闭状态，可以被选择
                this.props.cb(this.props.mode);
            }
        }
    }
    render() {
        var src = '../static/img/mode-' + this.props.mode + (this.props.on ? '-on' : '-off') + '@3x.png';
        return <dl className={this.props.className} onTouchStart={this.touchStart.bind(this)}>
            <dd><img src={src} /></dd>
            <dt className={this.props.on?'on':''}>{this.props.text}</dt>
        </dl>;
    }
};
