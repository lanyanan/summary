import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class Help extends BaseComponent {
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
            <div className="h-box">
                <img className="h-light" src="../static/img/light2.png" />
            </div>
            <section className="section-1">
                <div className="label-1">01</div>
                <div className="text">如果觉得力度和方向让你感觉不舒服，按下按钮，任意切换成手动模式！</div>
            </section>
            <section className="section-1 margin-t-30">
                <div className="label-2">02</div>
                <div className="text">时间到了之后，洁面仪会自动停止，以防止过度清洁。</div>
            </section>
        </div>);
    }
}
