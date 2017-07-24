// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            temperature: 25,
            airPower: 1,
            windAutoDirect: 1
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        Actions.getData();
    }
    changeSwitch(e) {
        e.preventDefault();
        Actions.changeSwitch();
    }
    reduTemp(e) {
        e.preventDefault();
        if (this.isShutdown() || this.state.airMode==1 || this.state.temperature <= 16) return;
        Actions.changeTemp(-1);
    }
    plusTemp(e) {
        e.preventDefault();
        if (this.isShutdown() || this.state.airMode==1 || this.state.temperature >= 30) return;
        Actions.changeTemp(+1);
    }
    changeMode(e) {
        e.preventDefault();
        if (this.isShutdown()) return;
        let value = parseInt(e.currentTarget.getAttribute('data-val'));
        Actions.changeMode(value);
    }
    changeSpeed(e) {
        e.preventDefault();
        if (this.isShutdown()) return;
        Actions.changeSpeed();
    }
    changeWind(e) {
        e.preventDefault();
        if (this.isShutdown()) return;
        Actions.changeWind();
    }
    changeAutoWind(e) {
        e.preventDefault();
        if (this.isShutdown()) return;
        Actions.changeAutoWind();
    }
    changeSleep(e) {
        e.preventDefault();
        if (this.isShutdown()) return;
        Actions.changeSleep();
    }
    changeOrder(e) {
        e.preventDefault();
        Actions.changeOrder();
    }
    // 检测是否关机状态
    isShutdown() {
        return this.state.airPower; // 0-开机 1-关机
    }
    render() {
        let hTemp = this.state.temperature.toString().substring(0, 1);
        let lTemp = this.state.temperature.toString().substring(1, 2);
        let isShutdown = this.isShutdown();
        let airMode = this.state.airMode;
        let speed = this.state.windSpeed || 0;
        let windDirect = this.state.windDirect || 3;
        let tempReduClass = isShutdown || this.state.airMode==1 || this.state.temperature <= 16 ? 'off':'';
        let tempPlusClass = isShutdown || this.state.airMode==1 || this.state.temperature >= 30 ? 'off':'';
        return <div>
            <section className="ac-screen">
                <div className="ac-screen-air"></div>
                <div id="temperature" className="ac-temp">
                    <i className={'ac-n' + hTemp}></i><i className={'ac-n' + lTemp}></i>
                    <i className="ac-degree"></i>
                </div>
                <a id="switch" href="#" className="ac-switch" onTouchStart={this.changeSwitch.bind(this)}></a>
            </section>
            <section className="ac-control">
                <div className="ac-ctrl-temp">
                    <p><a id="ctrl-reduce" href="#" className={tempReduClass} onTouchStart={this.reduTemp.bind(this)}></a></p>
                    <p><a id="ctrl-plus" href="#" className={tempPlusClass} onTouchStart={this.plusTemp.bind(this)}></a></p>
                </div>
                <div className="ac-ctrl-mode">
                    <p><a className={!isShutdown && airMode===1?'on':''} data-val="1" onTouchStart={this.changeMode.bind(this)} id="ctrl-auto" href="#">自动</a></p>
                    <p><a className={!isShutdown && airMode===2?'on':''} data-val="2" onTouchStart={this.changeMode.bind(this)} id="ctrl-cool" href="#">制冷</a></p>
                    <p><a className={!isShutdown && airMode===3?'on':''} data-val="3" onTouchStart={this.changeMode.bind(this)} id="ctrl-dry" href="#">除湿</a></p>
                    <p><a className={!isShutdown && airMode===4?'on':''} data-val="4" onTouchStart={this.changeMode.bind(this)} id="ctrl-wind" href="#">送风</a></p>
                    <p><a className={!isShutdown && airMode===5?'on':''} data-val="5" onTouchStart={this.changeMode.bind(this)} id="ctrl-hot" href="#">制热</a></p>
                </div>
            </section>
            <section className="ac-windcontrol">
                <dl className="box">
                    <dt>风速选择</dt>
                    <dd><a id="ctrl-windspeed" className={'speed'+speed} onTouchStart={this.changeSpeed.bind(this)} href="#">{['自动','自动','低','中','高'][speed]}</a></dd>
                </dl>
                <dl className="box">
                    <dt>风向选择</dt>
                    <dd><a id="ctrl-windmode" className={'mode'+(windDirect==3?1:2)} onTouchStart={this.changeWind.bind(this)} href="#">{{1:'左右',2:'上下',3:'关闭'}[windDirect]}</a></dd>
                </dl>
            </section>
            <section className="ac-sleepcontrol">
                <ul className="clearfix">
                    <li>
                        <label>自动风向</label>
                        <p><a id="ctrl-sleep-switch" onTouchStart={this.changeAutoWind.bind(this)} href="#" className={'wg-switch ' + (!this.state.windAutoDirect ? 'on':'')}></a></p>
                    </li>
                </ul>
            </section>
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('空调');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});