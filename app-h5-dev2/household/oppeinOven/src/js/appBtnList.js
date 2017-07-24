'use strict';

import { Actions } from './Actions';
import { Store } from './Store';
import { RUNMODE, PAUSE, STATE, CHANGEVALUE, CHANGEPOWERVALUE, DEFAULTTEMPERATURE, showStateTxt, isRun, showPowerTxt, isRapidheat, showPowerIcon, showOverlayer, hideOverlayer, sendPowerData, sendPauseData, sendRapidheatData, isFinish } from './constants';

var { Router, Route, hashHistory, Link } = ReactRouter;

het.domReady(() => {
    het.config({
        renderConfigData: true
    });
});
het.repaint((data) => {
    Actions.repaint(data);
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = STATE;
        Store.listen((data) => this.setState(data));
        this.handleMode = this.handleMode.bind(this);
    }
    componentWillMount() {
        this.sendTimer = null;
    }
    handleMode() {
        const { modestatus, ChildLockStatus, runmode, online } = this.state;
        const nextMode = modestatus == 8 ? 1 : modestatus + 1;
        this.setState({ 'modestatus': nextMode, 'changeMode': true });
        Actions.cacheData({'nextMode' : nextMode});
        clearTimeout(this.sendTimer);
        this.sendTimer = setTimeout(() => {
            this.setState({ 'changeMode': false });
            Actions.sendData({ 'mode': nextMode, 'power': 1, 'pause': 2, 'reservationhour': 0, 'reservationmin': 0, 'workhour': 0, 'workmin': 30, 'temperatureset': DEFAULTTEMPERATURE[nextMode] });
        }, 3000);

    }
    renderTopDOM() {
        const { networkavailable, online, modestatus, RapidHeatingState, runmode, changeMode } = this.state;
        let text = '';
        if (networkavailable == 2) {
            return '网络已断开';
        }
        if (online == 2) {
            return '设备已离线';
        }
        if (runmode == 2) {
            return '设备已关机';
        }
        if (runmode == 3) {
            return '待机中';
        }
        return `${showStateTxt(this.state)}  ${modestatus ? `模式：${RUNMODE[modestatus]}` : ''} ${RapidHeatingState === 1 ? '快速加热' : ''}`;
    }
    renderModeDOM() {
        const { online, ChildLockStatus, modestatus, runmode } = this.state;
        return (<article className={hideOverlayer(ChildLockStatus == 2 && runmode == 3 && online == 1)} >
            <div onTouchTap={this.handleMode}>
                <img src={`../static/img/btnlist/mode${modestatus}.png`} alt="" />
                <p>{RUNMODE[modestatus]}</p>
            </div>
        </article>);
    }
    render() {
        const { online, networkavailable, modestatus, ChildLockStatus, temperature, PauseStatus, RapidHeatingState, runmode } = this.state;
        
        return (
            <div>
                <h1 className="btn-title">{this.renderTopDOM()}</h1>
                <section className="flex btnlist">
                    <article className={hideOverlayer(online == 1 && networkavailable == 1)}>
                        <div onTouchTap={(e) => { sendPowerData(this.state); }}>
                            {showPowerIcon(this.state, 1)}
                            <p>{showPowerTxt(this.state)}</p>
                        </div>
                    </article>
                    {this.renderModeDOM()}
                    <article className={hideOverlayer(modestatus != 9 && isRapidheat(this.state) && ChildLockStatus == 2 && online == 1 && networkavailable == 1 && !isFinish(this.state))}>
                        <div onTouchTap={(e) => { sendRapidheatData(this.state); }}>
                            <img src="../static/img/btnlist/rapidheating.png" alt="" />
                            <p>快速加热</p>
                        </div>
                    </article>
                    <article className={hideOverlayer(modestatus != 9 && isRun(this.state) && ChildLockStatus == 2 && online == 1 && networkavailable == 1 && !isFinish(this.state))}>
                        <div onTouchTap={(e) => { sendPauseData(this.state); }}>
                            <img src={`../static/img/btnlist/pause${PauseStatus}.png`} alt="" />
                            <p>{PAUSE[PauseStatus]}</p>
                        </div>
                    </article>
                </section>
            </div>
        );
    }
}

het.domReady(() => {
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});