// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Colors} from './Colors.es6';
import {SimpleSelect} from './SimpleSelect.es6';
import Range from './../../../common/src/lib/range.jsx';
import {TimeSelect} from '../../../common/src/TimeSelect.es6';

var {Router, Route, hashHistory} = ReactRouter;

let dataTimer = 0;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            colorR: 255,
            colorG: 255,
            colorB: 255,
            light: 0,
            mist: 3,
            tipsShow: true,
            timeCloseH: 0,
            timeCloseM: 0
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.getData();
        this.reGetData();
    }
    reGetData() {
        clearInterval(dataTimer);
        dataTimer = setInterval(Actions.getData, 6000);
    }
    changeSwitch(e) {
        e.preventDefault();
        clearInterval(dataTimer);
        setTimeout(this.reGetData, 5000);
        Actions.changeSwitch();
    }
    changeColor(color, index) {
        if (!this.getRunning()) return;
        this.reGetData();
        Actions.changeColor(color, index);
    }
    changeLight(value) {
        if (!this.getRunning()) return;
        this.reGetData();
        Actions.changeLight(value);
    }
    changeMist(value) {
        if (!this.getRunning()) return;
        this.reGetData();
        Actions.changeMist(value);
    }
    showMistSelect() {
        if (!this.getRunning()) return;
        this.setState({mistSelectShow: true});
    }
    showClock() {
        if (!this.getRunning()) return;
        this.setState({clockShow: true});
    }
    closeTips() {
        this.setState({tipsShow: false});
    }
    changeClock(h, m) {
        Actions.changeClock(m);
        this.setState({clockShow: false});
    }
    cancelClock() {
        this.setState({clockShow: false});
    }
    getRunning() {
        return !((this.state.light==0) && (this.state.mist==3));
    }
    render() {
        let isRunning = this.getRunning();
        let cssColor = isRunning ? `rgba(${this.state.colorR}, ${this.state.colorG}, ${this.state.colorB}, 1)` : 'rgba(255, 255, 255, 0)';
        // let time = (isRunning ? this.state.presetShutdownTime : this.state.presetStartupTime) || 0;
        let time = this.state.timeCloseH * 60 + this.state.timeCloseM;
        let mistStrs = {
            3: '关闭',
            2: '一档',
            1: '二档'
        };
        let mistOptions = [
            {label: '关闭', value: 3},
            {label: '一档', value: 2},
            {label: '二档', value: 1}
        ];
        return <div className={isRunning?'':'all-off'}>
            <header>
                {/*<p className="tips" style={{visibility: this.state.tips && this.state.tipsShow ? 'visible' : 'hidden'}} onTouchStart={this.closeTips.bind(this)}>{this.state.tips}<i className="close"></i></p>*/}
                <p className="tips" style={{visibility: this.state.tips && this.state.tipsShow ? 'visible' : 'hidden'}} onTouchStart={this.closeTips.bind(this)}>{this.state.tips}</p>
                <figure>
                    <img src="../static/img/pic-07.png" style={{WebkitFilter: `drop-shadow(0px -5px 5px ${cssColor})`}} />
                </figure>
                <a href="#" onTouchStart={this.changeSwitch.bind(this)} className="switch"></a>
            </header>
            <h2>颜色</h2>
            <Colors colorIndex={this.state.colorIndex} disabled={!isRunning} cb={this.changeColor.bind(this)} />
            <div className="light-percent">{this.state.light}%</div>
            <section className="flex light-range-wrap">
                <i className="l-low"></i>
                <div className="flex-cell">
                    <Range disabled={!isRunning} value={this.state.light} min="0" max="100" fnFeedback={this.changeLight.bind(this)} />
                </div>
                <i className="l-high"></i>
            </section>
            <section className="flex fn-wrap">
                <dl className="flex-cell" onTouchStart={this.showMistSelect.bind(this)}>
                    <dd>{mistStrs[this.state.mist]}</dd>
                    <dt>雾化</dt>
                </dl>
                <dl className="flex-cell" onTouchStart={this.showClock.bind(this)}>
                    <dd>{time}<sub>min</sub></dd>
                    <dt>定时关闭</dt>
                </dl>
            </section>
            <SimpleSelect show={this.state.mistSelectShow} options={mistOptions} value={this.state.mist} cb={this.changeMist.bind(this)} />
            <TimeSelect title='设置时间' defaultminute={time || 5} minuteshow={true} hourshow={false} minutestep={1} statusname=' ' show={this.state.clockShow}
                cancelClock={this.cancelClock.bind(this)} minutearr={[5, 10, 30, 60, 120]} submitClock={this.changeClock.bind(this)} />
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('香薰机');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});
