'use strict';

import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { Actions } from './Actions';
import { Store } from './Store';
import { ModeSelect } from './ModeSelect';
import { DialogStyle } from './DialogStyle';
import { MenuList } from './MenuList';
import { MenuDetail } from './MenuDetail';
import Range from './range';
import { RUNMODE, STATE, PAUSE, CHANGEVALUE, CHANGEPOWERVALUE, MINTEMPERATURE, DEFAULTTEMPERATURE, MAXTEMPERATURE, addZero, showStateTxt, showPowerTxt, isRun, isRapidheat, showPowerIcon, showOverlayer, hideOverlayer, sendPowerData, sendPauseData, sendRapidheatData, isFinish } from './constants';

const { Router, Route, hashHistory, Link } = ReactRouter;

het.domReady(() => {
    het.config({
        // debugMode:'print',
        renderConfigData: true
    });
});
het.repaint((data) => {
    Actions.repaint(data);
});


class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { ...STATE, setShow: false, err: false, confirmShow: false, errorContent: '' };
        this.listenStore(Store);
        this.handleLight = this.handleLight.bind(this);
        this.handlePower = this.handlePower.bind(this);
        this.handleSet = this.handleSet.bind(this);
        this.handleTemperatureSet = this.handleTemperatureSet.bind(this);
        this.handleWorkTimeSet = this.handleWorkTimeSet.bind(this);
        this.handleRunCancel = this.handleRunCancel.bind(this);
        this.handleRunConfirm = this.handleRunConfirm.bind(this);
        this.handleCancelError = this.handleCancelError.bind(this);
        this.handleContact = this.handleContact.bind(this);
        this.handlePowerConfirm = this.handlePowerConfirm.bind(this);
        this.handlePoweCancel = this.handlePoweCancel.bind(this);
        this.handleConfirmCancel = this.handleConfirmCancel.bind(this);
    }
    componentWillMount() {
        het.setTitle(JSON.stringify({
            setNavTitle: 0,
            title: '欧派烤箱',
            setNavRightBtnHiden: 0
        }));
    }
    showAppointTime() { // 动态显示预约时间 
        const { runmode, remainingreservationtimemin, remainingreservationtimehour, online, modestatus, recipeworkingnumber, recipenumber } = this.state;
        if (online == 1 && runmode == 1) {
            if (modestatus == 9) {
                return <span>{recipeworkingnumber}/{recipenumber}</span>;
            }
            if ((remainingreservationtimehour || remainingreservationtimemin)) {
                return <span>{`${addZero(remainingreservationtimehour)}:${addZero(remainingreservationtimemin)}`}</span>;
            }
        }
    }
    showPowerIcon() { // 动态显示电源图标
        const { runmode, ChildLockStatus, modestatus } = this.state;
        let powIcon = 'icon-power2';
        if (runmode == 1) {
            if (ChildLockStatus == 1) {
                powIcon = 'childlock2';
            } else {
                powIcon = modestatus ? 'cancel' : 'icon-power1';
            }
        } else if (runmode == 3) {
            powIcon = 'icon-power1';
        }
        return <img src={`../static/img/${powIcon}.png`} />;
    }
    showTime() {
        const { SetWorkTimeHour, SetWorkTimeMin, remainingworkingtimehour, remainingworkingtimemin, reciperemainingworkingtimemin, reciperemainingworkingtimehour, modestatus } = this.state;
        if (modestatus == 9) {
            return (<span>{addZero(parseInt(reciperemainingworkingtimehour))} : {addZero(reciperemainingworkingtimemin)}</span>);
        }
        return isRun(this.state) ? (<span>{addZero(remainingworkingtimehour)}:{addZero(remainingworkingtimemin)}</span>) : (<span>{addZero(SetWorkTimeHour)}:{addZero(SetWorkTimeMin)}</span>);
    }
    showTemperature() { // 如果是烘焙中
        const { temperaturestatus, temperatureset, recipetemperature, modestatus } = this.state;
        if (modestatus == 9) {
            return <span className="temperature-num">{recipetemperature}℃</span>;
        }
        return isRun(this.state) ? (<span className="temperature-num">{temperaturestatus ? `${temperaturestatus}℃` : '--'}</span>) : (<span className="temperature-num">{temperatureset ? `${temperatureset}℃` : '--'}</span>);
    }
    handleLight() {
        Actions.sendData({ 'light': CHANGEVALUE[this.state.LightStatus] });
    }
    handlePower() {
        sendPowerData(this.state);
    }
    handleSet() {
        this.setState({ 'setShow': true });
    }
    handleTemperatureSet(value) {
        this.setState({ 'changeTemperature': value });
    }

    handleWorkTimeSet(value) {
        this.setState({ 'chWorkhour': parseInt(value / 60), 'chWorkmin': value % 60 });
    }
    handleRunCancel() {
        this.setState({ 'changeTemperature': undefined, 'chWorkhour': undefined, 'chWorkmin': undefined, 'setShow': false });
    }
    handleRunConfirm() {
        const { temperatureset, changeTemperature, SetWorkTimeHour, chWorkhour, SetWorkTimeMin, chWorkmin } = this.state,
            t = changeTemperature === undefined ? temperatureset : changeTemperature,
            h = chWorkhour == undefined ? SetWorkTimeHour : chWorkhour,
            m = chWorkmin == undefined ? SetWorkTimeMin : chWorkmin;
        Actions.sendData({ 'temperatureset': t, 'workhour': h, 'workmin': m });
        this.setState({ 'setShow': false });
    }
    handleCancelError() {
        this.setState({ 'err': true });
    }
    handleContact() {
        location.href = 'tel:4007772009';
        this.setState({ 'err': true });
    }
    handlePowerConfirm() {
        sendPowerData(this.state);
        this.setState({ 'confirmShow': false });
    }
    handlePoweCancel() {
        this.setState({ 'confirmShow': false });
    }
    handleConfirmCancel() {
        this.setState({ 'confirmShow': true });
    }
    renderModeDOM() {
        const { modestatus, runmode, ChildLockStatus } = this.state;
        if (runmode == 2) {
            return <div><div className="app-ctrl-con"><img src={`../static/img/icon-mode${modestatus}-off.png`} />{RUNMODE[modestatus]}</div></div>;
        }
        if (runmode == 3) {
            return <div className="hidden"><Link to='/ModeSelect'><div className="app-ctrl-con"><img src='../static/img/icon-mode0.png' />模式</div></Link></div>;
        }

        if (runmode == 1) {
            return (<div className={showOverlayer(modestatus == 9 || ChildLockStatus == 1 || isFinish(this.state))}>
                <div className="app-ctrl-con" onTouchTap={this.handleSet}>
                    <img src={`../static/img/icon-mode${modestatus}.png`} />
                    { modestatus == 9 ? '模式' : RUNMODE[modestatus]}
                </div>
            </div>);
        }
    }

    render() {
        const {
            online,
            temperatureset,
            temperaturestatus,
            changeTemperature,
            reservationhour,
            reservationmin,
            SetWorkTimeHour,
            chWorkhour,
            SetWorkTimeMin,
            chWorkmin,
            mode,
            modestatus,
            ChildLockStatus,
            LightStatus,
            runmode,
            RapidHeatingState,
            PauseStatus,
            setShow,
            confirmShow,
            NoTempSenserError,
            TempSenserShortCircuitError,
            HeatingError,
            err,
            errorContent,
            networkavailable,
            MenuNumberHigh,
            MenuNumberLow
        } = this.state,
            showWorkhour = chWorkhour === undefined ? SetWorkTimeHour : chWorkhour,
            showWorkmin = chWorkmin === undefined ? SetWorkTimeMin : chWorkmin,
            errorShow = ((parseInt(NoTempSenserError) || parseInt(TempSenserShortCircuitError) || parseInt(HeatingError)) && (!err)) ? 1 : 0,
            errNum = parseInt(NoTempSenserError) + parseInt(TempSenserShortCircuitError) + parseInt(HeatingError),
            showErrorContent = `${errNum > 1 ? '<ol>' : '<ul>'}${parseInt(NoTempSenserError) ? '<li>无温度传感器故障</li>' : ''}${parseInt(TempSenserShortCircuitError) ? '<li>温度传感器短路故障</li>' : ''}${parseInt(HeatingError) ? '<li>加热故障</li>' : ''}${errNum > 1 ? '</ol>' : '</ul>'}`;
        if (networkavailable == 2) {
            het.toast('网络断开连接');
        }
        const menuId = MenuNumberHigh *256 + MenuNumberLow;
        return (
            <div className="app-body">
                <div className={`app-bg ${isRun(this.state) ? 'app-run-bg' : ''}`}>
                    <div className="app-txt">
                        <div className="app-state">{showStateTxt(this.state)} {this.showAppointTime()}</div>
                        <div className="app-temper">
                            {modestatus && runmode == 1 && online == 1 ?
                                (<div>
                                    {this.showTemperature()}
                                    {this.showTime()}
                                </div>)
                                : '-- : --'
                            }
                        </div>
                    </div>
                </div>
                <div className="app-ctrl">
                    {online == 2 ?
                        <div className="off-line">
                            <img src="../static/img/off-line.png" />
                            <p>主人，您的烤箱不在线哦~！</p>
                        </div>
                        : ''
                    }
                    <div className="flex app-ctrl-list">
                        <div className="hidden">
                            <div className="app-ctrl-con" onTouchTap={isRun(this.state) && ChildLockStatus == 2 ? this.handleConfirmCancel : this.handlePower}>
                                {showPowerIcon(this.state)}
                                {showPowerTxt(this.state)}
                            </div>
                        </div>
                        {this.renderModeDOM()}
                        <div className={hideOverlayer(runmode != 2 && ChildLockStatus === 2 && (modestatus == 0 || modestatus == 9))}>
                            <Link to={`/${(menuId && modestatus == 9) ? `MenuDetail?menuId=${menuId}` : 'MenuList'}`}>
                                <div className="app-ctrl-con">
                                    <img src={`../static/img/menu${modestatus == 9 ? '' : '-off'}.png`} />
                                    云菜谱
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex app-ctrl-list">
                        <div className={hideOverlayer(modestatus != 9 && ChildLockStatus == 2 && isRun(this.state) && !isFinish(this.state))}>
                            <div className="app-ctrl-con" onTouchTap={(e) => { sendPauseData(this.state); }}>
                                <img src={`../static/img/pause${PauseStatus}${isRun(this.state) ? '' : '-off'}.png`} />
                                {PAUSE[PauseStatus]}
                            </div>
                        </div>
                        <div className={showOverlayer(runmode == 2)}>
                            <div className="app-ctrl-con" onTouchTap={this.handleLight}>
                                <img src={`../static/img/light${LightStatus}.png`} />
                                照明
                            </div>
                        </div>
                        <div className={hideOverlayer(modestatus != 9 && isRapidheat(this.state) && ChildLockStatus === 2 && !isFinish(this.state))}>
                            <div className="app-ctrl-con" onTouchTap={(e) => { sendRapidheatData(this.state); }}>
                                <img src={`../static/img/rapidheat${RapidHeatingState}.png`} />
                                快速加热
                            </div>
                        </div>
                    </div>
                </div>
                <div className="run-set" style={setShow ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' }}>
                    <div className="run-set-con">
                        <div className="run-set-bt flex">
                            <span className="flex-cell cancel" onTouchTap={this.handleRunCancel}>取消</span>
                            <span className="flex-cell confirm" onTouchTap={this.handleRunConfirm}>确定</span>
                        </div>
                        <div className="mode-ctrl">
                            <h3>烘焙温度  {changeTemperature === undefined ? DEFAULTTEMPERATURE[modestatus] : changeTemperature}℃</h3>
                            <Range value={changeTemperature === undefined ? DEFAULTTEMPERATURE[modestatus] : changeTemperature} min={MINTEMPERATURE[modestatus]} max={MAXTEMPERATURE[modestatus]} fnFeedback={this.handleTemperatureSet} />
                            <h3>烘焙时长  {addZero(showWorkhour)} : {addZero(showWorkmin)}<span>(小时)</span></h3>
                            <Range value={showWorkhour * 60 + showWorkmin} min={1} max={599} type='time' fnFeedback={this.handleWorkTimeSet} />
                        </div>
                    </div>
                </div>
                <DialogStyle show={errorShow} title='设备故障' content={showErrorContent} rightpam='联系客服' submitClock={this.handleContact} cancelClock={this.handleCancelError} />
                <DialogStyle show={confirmShow} title='温馨提示' content='美食烘焙中，确定取消吗？' submitClock={this.handlePowerConfirm} cancelClock={this.handlePoweCancel} />
            </div>
        );
    }
}

het.domReady(() => {
    if (location.href.match(/page\/menuDetail.html/)) { // 菜单详情页面需单独选择，供app从外部跳转到项目
        ReactDOM.render(<MenuDetail />, document.getElementById('ROOT'));
    } else {
        ReactDOM.render((
            <Router history={hashHistory}>
                <Route path="/" component={App} />
                <Route path="/ModeSelect" component={ModeSelect} />
                <Route path="/MenuList" component={MenuList} />
                <Route path="/MenuDetail" component={MenuDetail} />
            </Router>
        ), document.getElementById('ROOT'));
    }

});