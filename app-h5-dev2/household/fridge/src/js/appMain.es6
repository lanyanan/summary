// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Temperate} from './Temperate.es6'; // 温度组件
import {ModeButton} from './ModeButton.es6'; // 模式组件
import {ChildLockSurface} from './ChildLockSurface.es6'; // 童锁组件
import {TimeSelect} from '../../../common/src/TimeSelect.es6'; // 时钟组件

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {
            'childLock' : 'lockSet',
            'temp1' : 'freezerTemp', // 冷冻室
            'temp2' : 'refgTemp', // 冷藏室
            'mode'  : 'mode',
            'power' : 'refgSwitch',
            'hour'  : 'freezerSetTime'
        },
        updateFlagMap : {
            'mode' : 9,
            'temp2' : 10,
            'temp1' : 12,
            'hour' : 13,
            'power' : 14,
            'childLock' : 16
        },
        renderConfigData : true,
        filter : {
            'childLock' : 1,
            'temp1' : 0, // 冷冻室
            'temp2' : 0, // 冷藏室
            'mode'  : 1,
            'power' : 1,
            'hour'  : 1
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            showClock : false  // 时间控件开关
        };
        this.listenStore(Store);
    }
    // 童锁控制
    childLock() {
        if(this.state.online==2){het.toast('设备已离线'); return false;}
        if (this.state.childLock==2)
            Actions.lock(1);
        else
            Actions.lock(2);
    }
    // 切换模式
    switchMode(mode) {
        if(this.state.online==2){het.toast('设备已离线'); return false;}
        let index;
        switch (mode) {
            case 'auto': index = 4; break;
            case 'cold': index = 1; break;
            case 'freeze': index = 2; break;
            case 'holiday': index = 3; break;
            case 'exit': index = 5; break;
        }
        Actions.swicthMode(index);
    }
    // 电源键
    switchPower() {
        if(this.state.online==2){het.toast('设备已离线'); return false;}
        if (this.state.power==1)
            Actions.switchPower(2);
        else
            Actions.switchPower(1);
    }
    // 调节冷藏室
    adjustCold(value) {
        if(this.state.online==2){het.toast('设备已离线'); return false;}
        Actions.adjustCold(value);
    }
    // 调节冷冻室
    adjustFreez(value) {
        if(this.state.online==2){het.toast('设备已离线'); return false;}
        Actions.adjustFreez(value);
    }
    // 调节冷冻时间
    adjustTime(value) {
        Actions.adjustTime(value);
        this.showClock();
    }
    showClock() {
        this.setState({showClock:!this.state.showClock});
    }
    render() {
        var clockShow = {visibility: this.state.mode==2 ? 'visible' : 'hidden'};
        var powerShow = {visibility: this.state.mode==1 ? 'hidden' : 'visible'};
        return (<div>
            <section className="flex dev-head" style={{'paddingTop':this.state.headerTop}}>
                <div className="flex-cell dev-name"><b>&lt;</b>{this.state.deviceName}<b>&gt;</b></div>
                <div className="flex-cell online">{this.state.online==1 ? '已连接' : '未连接'}</div>
            </section>
            <section className="flex">
                <div className="main-wrap">
                    <div className="blue-box flex">
                        <dl className="flex-cell">
                            <dt>冷冻室</dt>
                            <dd>{this.state.temp1==255?'-':this.state.temp1}<sup>℃</sup></dd>
                        </dl>
                        <dl className="flex-cell">
                            <dt>冷藏室</dt>
                            <dd>{this.state.temp2==255?'-':this.state.temp2}<sup>℃</sup></dd>
                        </dl>
                    </div>
                </div>
                <div className="flex-cell vice-wrap child-lock">
                    <dl>
                        <dd onTouchStart={this.childLock.bind(this)} className="child-lock-ico"><img src="../static/img/childlock-off@3x.png" /></dd>
                        <dt className="child-lock-txt">儿童锁</dt>
                    </dl>
                </div>
            </section>
            <section className="flex main-panel">
                <div className="main-wrap">
                    <div className="flex">
                        <Temperate className="flex-cell" min='-15' max='-22' minus={true} value={this.state.temp1} cb={this.adjustFreez.bind(this)} />
                        <Temperate className="flex-cell" min='2' max='8' value={this.state.temp2} cb={this.adjustCold.bind(this)} />
                    </div>
                    <div className="flex bottom-buttons">
                        <dl onTouchStart={this.showClock.bind(this)} className="flex-cell b-clock" style={clockShow}>
                            <dd><img src="../static/img/clock@3x.png" /></dd>
                            <dt>{this.state.hour}H</dt>
                        </dl>
                        <dl onTouchStart={this.switchPower.bind(this)} className="flex-cell b-switch" style={powerShow}>
                            <dd><img src={'../static/img/switch-'+(this.state.power==2 ? 'on' : 'off')+'@3x.png'} /></dd>
                        </dl>
                    </div>
                </div>
                <div className="flex-cell vice-wrap mode-panel">
                    <ModeButton mode="auto" text="智能模式" on={this.state.mode==4?true:false} cb={this.switchMode.bind(this)} />
                    <ModeButton mode="cold" text="速冷模式" on={this.state.mode==1?true:false} cb={this.switchMode.bind(this)} />
                    <ModeButton mode="freeze" text="速冻模式" on={this.state.mode==2?true:false} cb={this.switchMode.bind(this)} />
                    <ModeButton mode="holiday" text="假日模式" on={this.state.mode==3?true:false} cb={this.switchMode.bind(this)} />
                </div>
            </section>
            <ChildLockSurface show={!!(this.state.childLock==2)} cb={this.childLock.bind(this)} />
            <TimeSelect title='设置冷冻时间' minuteshow={false} hourshow={true}
                show={this.state.showClock} statusname=' ' hourstep='6' maxhour='30'
                cancelClock={this.showClock.bind(this)} submitClock={this.adjustTime.bind(this)} />
        </div>);
    }
};

// 开始渲染
het.domReady(()=>{
    het.setTitle('惠而浦冰箱');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});