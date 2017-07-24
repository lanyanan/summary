import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class Guider extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        Actions.pushGuiderData(); // 请求推送向导数据
    }
    componentDidMount() {
        document.body.scrollTop = 0;
    }
    componentWillUpdate() {
        
    }
    render() {
        return (<div>
            <div className="mark">
                <img className="light" src="../static/img/light.png" />
                <div className="content">
                    <p>1.请在关机状态下,长按按键3秒</p>
                    <p>2.听到<span className="highlight">滴滴滴</span>响,且蓝灯快闪</p>
                </div>
            </div>
            <div className="footer">
                <button>蓝灯快速闪烁了</button>
            </div>
        </div>);
    }
}
