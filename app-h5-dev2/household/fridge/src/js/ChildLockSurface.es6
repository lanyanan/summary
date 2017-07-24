/**
 * 温度设置组件
 * @prop {boolean}  show 是否开启童锁
 * @prop {function} cb   可选，解锁后的回调函数
 */
export class ChildLockSurface extends React.Component {
    constructor(props) {
        super(props);
        this.timer = 0;
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            showClock : false  // 时间控件开关
        };
    }
    startTimer(e){
        e.preventDefault();
        this.timer = setTimeout(()=>{
            if (typeof this.props.cb==='function') {
                this.props.cb();
            }
        }, 3000);
    }
    endTimer(){
        clearTimeout(this.timer);
    }
    render() {
        let headerTop = this.state.headerTop;

        return <div className="childlock" style={{display:this.props.show?'block':'none'}}>
            <div className="flex surface">
                <div className="aux"></div>
                <ul className="flex-cell lock" onTouchStart={this.startTimer.bind(this)} onTouchEnd={this.endTimer.bind(this)}>
                    <li className={'child-lock-ico' + ' ' + (headerTop == 73? 'child-lock-icos' : 'child-lock-icoser')}><img src="../static/img/childlock-on@3x.png" /></li>
                    <li className="s">长按按钮三秒以上可以解锁</li>
                    <li className="b">3S</li>
                </ul>
            </div>
            <div className="mask"></div>
        </div>;
    }
};
