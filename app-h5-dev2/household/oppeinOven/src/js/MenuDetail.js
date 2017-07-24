'use strict';

import { Funs } from '../../../common/src/fun.es6';
import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { Actions } from './Actions';
import { Store } from './Store';
import Range from './range';
import { DialogStyle } from './DialogStyle';
import { TOPDISTANCE, DOMAIN, MENULIST, MENUDETAIL, RUNMODE, MINTEMPERATURE, MAXTEMPERATURE, CONFIGURATION, PRODUCTID, SETCLOCK, setTitle, addZero, isOwnEmpty, isCloudFinished, isOffline, cancelClock } from './constants';

const source = () => {
    const u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return 4;
    }
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return 3;
    }
};

const transformTem = function (h, l) { // 注意:箭头函数没有arguments对象，所有不能使用
    if (arguments.length == 1) { // 转化为高低位
        return [(parseInt(h / 256)).toString(), (h % 256).toString()];
    } else if (arguments.length == 2) { // 转化为实际温度
        return ((+h) * 256 + (+l));
    }
};

const transformTime = function (h, m) {
    return h * 60 + (+m);
};

const getMenuId = (that) => {
    if (location.href.match(/page\/menuDetail.html/)) {
        return Funs.getUrlParam('menuId');
    }
    return that.props.location.query['menuId'];
};

const callback = (isParam = 0, that, postJson) => {
    return function (response) {
        const responseData = JSON.parse(response);
        if (responseData.code == 0) {
            if (isParam) { // 如果是发送配置数据
                const firstData = postJson.ModeSet[0],
                    menuId = +getMenuId(that);
                Actions.cacheData({
                    'modestatus': 9,
                    'PauseStatus': 2,
                    'recipeworkingnumber': 1,
                    'recipetemperature': firstData.ModeTempHigh * 256 + firstData.ModeTempLow,
                    'reciperemainingworkingtimehour': firstData.ModeTimingHour,
                    'reciperemainingworkingtimemin': firstData.ModeTimingMin,
                    'MenuNumberHigh': parseInt(menuId / 256),
                    'MenuNumberLow': menuId % 256
                });
            }
        }
        else {
            het.toast(responseData.msg);
        }
    };
};

const errCallback = (msg) => {
    het.toast('请求失败，请稍后再试');
};

const postClockList = (that) => { // post 定时器列表
    let { configList, recipeworkingnumber, modestatus } = that.state,
        newConfigList = { ...configList },
        clockList = [], // 存储定时间隔数组
        timeTotal = 0; // 总时长
    for (let k in newConfigList) {
        const item = newConfigList[k],
            modeTime = transformTime(item['ModeTimingHour'], item['ModeTimingMin']),
            steamTime = transformTime(item['SteamTimingHour'], item['SteamTimingMin']),
            stepInterval = (item['SteamSwitch'] == '1') ? Math.max(modeTime, steamTime) : modeTime,// 取最大着计算时间
            isStop = modestatus == 9 ? (recipeworkingnumber <= (+k)) : 1; // 判断是否为中途暂停
        if (item['isRemind'] && isStop) { // 若需要提醒，添加数组
            clockList.push(timeTotal + stepInterval - 1);
        }
        if (isStop) {
            timeTotal += stepInterval; // 时间累加
        }
    }
    if (clockList.length) {
        het.post(SETCLOCK, {
            timestamp: +new Date(),
            menuId: getMenuId(that),
            startTime: Funs.dateFormat(new Date()),
            name: that.state.name,
            clockList: JSON.stringify(clockList),
            bell: '泉水叮咚'
        }, callback(0, that), errCallback);
    }
};

export class MenuDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            clockList: [], // 定时数组
            MenuNumber: 0,
            TotalNumberOfStages: 0,
            configList: {}, // 配置数据
            cancelShow: false,
            setShow: false,
            selectedStep: 1,
            tempShow: true,
            stopShow: false, // 暂停提示
            name: '' // "菜单名称",
        };
        this.listenStore(Store);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSetParam = this.handleSetParam.bind(this);
        this.handleTemperatureSet = this.handleTemperatureSet.bind(this);
        this.handleTimeSet = this.handleTimeSet.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleNextStep = this.handleNextStep.bind(this);
        this.handleCancelMode = this.handleCancelMode.bind(this);
        this.handleCancelCook = this.handleCancelCook.bind(this);
        this.handleHideDialog = this.handleHideDialog.bind(this);

    }
    componentDidMount() {
        const that = this;
        het.get(MENUDETAIL, { timestamp: +new Date(), menuId: getMenuId(that), productId: PRODUCTID }, (response) => {
            const responseData = JSON.parse(response);
            if (responseData.code != 0) return false;
            const name = responseData.data.name; // 获取菜单名称，定时接口需要
            setTitle(name);
            that.setState({ name });
            const configList = responseData.data.menuPropertyConfigList[0].stepConfigList.slice(0);
            let newConfig = {}, MenuNumber = 0, TotalNumberOfStages = 0;
            if (configList.length) {
                configList.forEach(function(item) {
                    let temObj = {
                        'Stages': '0',
                        'Pause': '1',
                        'TriggerSignal': '2',
                        'StageMode': '1',
                        'ModeTimingHour': '0',
                        'ModeTimingMin': '0',
                        'ModeTempHigh': '0',
                        'ModeTempLow': '50',
                        'SteamSwitch': '0',
                        'SteamTimingHour': '0',
                        'SteamTimingMin': '0'
                    };
                    temObj.isRemind = item.isRemind;
                    temObj.Stages = item.step;
                    item['propertyConfigList'].forEach(function(k){
                        temObj[k.property] = k.value;
                    });
                    newConfig[temObj.Stages] = temObj;
                });
                that.setState({ 'configList': newConfig, 'MenuNumber': getMenuId(that), 'TotalNumberOfStages': configList.length });
            }
        });
        Actions.getParam();
    }
    componentWillMount() {
        setTitle('云菜谱');
    }
    handleCancelCook() {
        cancelClock(this.state);
        Actions.sendData({ mode: 0, rapidheating: 2, light: 2, power: 3 });
        this.handleHideDialog();
    }
    handleHideDialog() {
        this.setState({ 'cancelShow': false});
    }

    handleTemperatureSet(value) {
        this.setState({ 'changeTemperature': value });
    }
    handleTimeSet(value) {
        this.setState({ 'changeTimeHour': parseInt(value / 60), 'changeTimeMin': value % 60 });
    }
    handleSwitch(on, stepsNum) {
        const state = { ...this.state };
        state.configList[stepsNum]['isRemind'] = !(on);
        this.setState({ configList: state.configList });
    }
    handleConfirm() {
        const { changeTemperature, selectedStep, changeTimeHour, changeTimeMin, tempShow } = this.state,
            state = { ...this.state },
            stepParam = state.configList[selectedStep];
        if (changeTemperature != undefined) {
            const [ModeTempHigh, ModeTempLow] = transformTem(changeTemperature);
            stepParam['ModeTempHigh'] = ModeTempHigh;
            stepParam['ModeTempLow'] = ModeTempLow;
        }
        if (changeTimeHour != undefined && changeTimeMin != undefined) {
            if (tempShow) {
                stepParam['ModeTimingHour'] = changeTimeHour + '';
                stepParam['ModeTimingMin'] = changeTimeMin + '';
            }
            else {
                stepParam['SteamTimingHour'] = changeTimeHour + '';
                stepParam['SteamTimingMin'] = changeTimeMin + '';
            }
        }
        this.setState({ configList: state.configList, 'changeTemperature': undefined, 'changeTimeHour': undefined, 'changeTimeMin': undefined, setShow: false, });
        document.body.className = '';
    }
    handleCancel() {
        this.setState({ 'changeTemperature': undefined, 'changeTimeHour': undefined, 'changeTimeMin': undefined, 'setShow': false });
        document.body.className = '';
    }
    handleSetParam(stepsNum, tempShow) {
        document.body.className = 'ovh';
        this.setState({ setShow: true, selectedStep: stepsNum, tempShow: tempShow });
    }
    handleStart() {
        const { modestatus } = this.state;
        if (!isOffline(this.state)) return;
        if (modestatus == 9 && !(this._isMenuIdEq())) { // 如果运行的是云菜谱，id不相等
            het.toast('请先取消正在烹饪的云菜谱！');
            return;
        }
        this._postJson();
    }
    _postJson() {

        let { configList, deviceId, MenuNumber, TotalNumberOfStages, modestatus, MenuNumberHigh, MenuNumberLow } = this.state,
            newConfigList = { ...configList },
            postJson = {
                ModeSet: [],
                ConfigurationType: 1,
                MenuNumber: getMenuId(this),
                TotalNumberOfStages: +TotalNumberOfStages
            },
            that = this;

        for (let k in newConfigList) {
            let item = { ...newConfigList[k] };
            delete item['isRemind'];
            delete item['ConfigurationType'];
            delete item['MenuNumber'];
            delete item['TotalNumberOfStages'];
            for (let m in item) {
                item[m] = +item[m];
            }
            postJson.ModeSet[k - 1] = item;
        }
        het.post(CONFIGURATION, { // 发送配置数据
            json: JSON.stringify(postJson),
            source: source(),
            deviceId: deviceId,
            isSentDown: 0
        }, callback(1, that, postJson), errCallback, 1);
        postClockList(that);
    }
    handleStop() {
        this.setState({ cancelShow: true });
    }
    handleNextStep() {
        postClockList(this);
        Actions.sendData({ 'pause': 2 });
    }
    handleCancelMode() {
        cancelClock(this.state);
        Actions.sendData({ mode: 0, rapidheating: 2, light: 2, power: 3 });
    }
    renderParamListDOM(items, stepsNum) {
        const { StageMode, ModeTimingHour, ModeTimingMin, ModeTempHigh, ModeTempLow, SteamSwitch, SteamTimingHour, SteamTimingMin } = items;
        return (
            <div >
                <div className="step-items-param" onTouchTap={() => { this.handleSetParam(stepsNum, 1); }}>
                    <div className="step-name">{RUNMODE[StageMode]}</div>
                    <div className="step-time">
                        <p>温度：{transformTem(ModeTempHigh, ModeTempLow)}°C</p>
                        <p>时间：{addZero(+ModeTimingHour)}:{addZero(+ModeTimingMin)}</p>
                    </div>
                    <div className="step-status"></div>
                </div>
                {
                    SteamSwitch == '1' ? (
                        <div className="step-items-param" onTouchTap={() => { this.handleSetParam(stepsNum, 0); }}>
                            <div className="step-name">蒸汽</div>
                            <div className="step-time">
                                <p>时间：{addZero(+SteamTimingHour)}:{addZero(+SteamTimingMin)}</p>
                            </div>
                            <div className="step-status"></div>
                        </div>
                    ) : null
                }
            </div >
        );
    }
    renderParamDOM(item, stepsNum) {
        const { recipeworkingnumber, modestatus } = this.state;
        return (
            <div className="step-items-list">
                {this.renderParamListDOM(item, stepsNum)}
                <div className="step-warn">
                    <p>完成前1分钟提醒</p>
                    <div className="warn-switch" onClick={() => { this.handleSwitch(item.isRemind, stepsNum); }}>
                        <span className={item.isRemind ? '' : 'off'}></span>
                    </div>
                </div>
            </div>
        );
    }
    renderStepDOM() {
        let { configList, recipeworkingnumber, modestatus } = this.state,
            newConfigList = [];

        for (let k in configList) {
            newConfigList[k - 1] = configList[k];
        }

        const showClassName = (stage) => {
            if (modestatus != 9 || (modestatus == 9 && !this._isMenuIdEq())) {
                return '';
            }
            if (isCloudFinished(this.state)) {
                return 'step-actived';
            }
            else {
                if (recipeworkingnumber == stage) {
                    return 'step-active';
                }
                if (recipeworkingnumber > stage) {
                    return 'step-actived';
                }
            }
            return '';
        };
        const maxStep = Math.max(...Object.keys(configList));
        return (
            <div className={`${(modestatus == 9 && this._isMenuIdEq()) ? 'cloudMenuDoing' : ''}`}>
                {
                    newConfigList.map((item, index) => {
                        return (
                            <div className={`step-list ${showClassName(item.Stages)}`} key={item.Stages}>
                                <div className="step-num">{item.Stages}</div>
                                <div className="step-items">
                                    {this.renderParamDOM(item, item.Stages)}
                                </div>
                            </div>
                        );
                    })
                }
                <div className={`step-list step-finish ${isCloudFinished(this.state) && 'step-active'}`}>
                    <div className="step-num">{maxStep + 1}</div>
                    <div className="step-items">
                        <div className="step-finish-txt">
                            烹饪完成
                         </div>
                    </div>
                </div>
            </div>
        );
    }
    _isMenuIdEq() {
        const { MenuNumberHigh, MenuNumberLow } = this.state,
            menuId = MenuNumberHigh * 256 + MenuNumberLow;
        return menuId == getMenuId(this);
    }
    renderButton() {
        const { modestatus } = this.state;
        if (modestatus == 0 || modestatus == void 0 || (modestatus == 9 && !this._isMenuIdEq())) { // 非云菜谱模式 或者 云菜谱id不相等
            return (<span className="cacel" onTouchTap={this.handleStart}>启动</span>);
        }
        if (modestatus != 9 && modestatus != 0 || isCloudFinished(this.state)) {
            return;
        }
        return (<span onTouchTap={this.handleStop}>取消</span>);
    }
    renderTopDOM() {
        const { networkavailable, online, modestatus, configList, recipeworkingnumber, recipetemperature, reciperemainingworkingtimehour, reciperemainingworkingtimemin, PauseStatus } = this.state;
        if (isCloudFinished(this.state)) {
            return (<span className="wait">烘焙完成</span>);
        }
        if (networkavailable == 2) {
            return (<span className="wait">网络已断开</span>);
        }
        if (online == 2) {
            return (<span className="wait">设备已离线</span>);
        }
        return (modestatus != 9 || (modestatus == 9 && (!this._isMenuIdEq()))
            ?
            <span className="wait">等待烹饪</span>
            :
            <div className="cooking">
                <p className="cook-mode">{RUNMODE[configList[String(recipeworkingnumber)].StageMode]}</p>
                <p className="temperature">{recipetemperature}<span>°C</span></p>
                <p className="time">{addZero(parseInt(reciperemainingworkingtimehour))}:{addZero(reciperemainingworkingtimemin)}</p>
                <span className={`${(PauseStatus == 1) ? 'stop-rotate' : 'rotate'}`}></span>
            </div>);
    }
    render() {
        let { cancelShow, stopShow, PauseStatus, setShow, changeTemperature, selectedStep, tempShow, configList, changeTimeHour, changeTimeMin, modestatus, recipetemperature, reciperemainingworkingtimehour, reciperemainingworkingtimemin, recipeworkingnumber } = this.state;
        if (isOwnEmpty(configList)) {
            return (
                <div>
                    <div className="menu-bar" style={{ height: TOPDISTANCE }}></div>
                    <div className="menu-detail">
                        <div>数据加载中..</div>
                    </div>
                </div>
            );
        }
        const { StageMode, ModeTempHigh, ModeTempLow, ModeTimingHour, ModeTimingMin, SteamSwitch, SteamTimingHour, SteamTimingMin } = configList[selectedStep],
            showHour = tempShow ? ModeTimingHour : SteamTimingHour,
            showMin = tempShow ? ModeTimingMin : SteamTimingMin,
            showRangTime = (changeTimeHour != undefined && changeTimeMin != undefined) ? (changeTimeHour * 60 + changeTimeMin) : (showHour * 60 + (+showMin)),
            showTimeTxt = (changeTimeHour != undefined && changeTimeMin != undefined) ? `${addZero(changeTimeHour)} : ${addZero(changeTimeMin)}` : (`${addZero(+showHour)} : ${addZero(+showMin)}`),
            showTemp = changeTemperature === undefined ? transformTem(ModeTempHigh, ModeTempLow) : changeTemperature,
            nofinished = isCloudFinished(this.state);
        return (
            <div>
                <div className="menu-detail">
                    <div className="menu-bar" style={{ height: TOPDISTANCE }}></div>
                    <div className="menu-top" style={{ marginTop: TOPDISTANCE }}>
                        <div className="menu-top-con">
                            {this.renderTopDOM()}
                        </div>
                    </div>
                    <div className="menu-step">
                        <h3>烹饪步骤</h3>
                        {this.renderStepDOM()}
                    </div>
                </div>
                <div className="run-set" style={setShow ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' }}>
                    <div className="run-set-con">
                        <div className="run-set-bt flex">
                            <span className="flex-cell cancel" onTouchTap={this.handleCancel}>取消</span>
                            <span className="flex-cell confirm" onTouchTap={this.handleConfirm}>确定</span>
                        </div>
                        <div className="mode-ctrl">
                            {tempShow ?
                                <div>
                                    <h3>温度  {showTemp}℃</h3>
                                    <Range value={showTemp} min={MINTEMPERATURE[+StageMode]} max={MAXTEMPERATURE[+StageMode]} fnFeedback={this.handleTemperatureSet} />
                                </div>
                                :
                                null
                            }
                            <h3>时间  {showTimeTxt} <span>(小时)</span></h3>
                            <Range value={showRangTime} min={1} max={599} type='time' fnFeedback={this.handleTimeSet} />
                        </div>
                    </div>
                </div>
                <div className="menu-btn">
                    {this.renderButton()}
                </div>
                <DialogStyle show={PauseStatus == 1 && modestatus == 9 && !isCloudFinished(this.state) && (this._isMenuIdEq())} content='当前步骤已完成，请执行下一步' leftpam='取消烹饪' rightpam='下一步' submitClock={this.handleNextStep} cancelClock={this.handleCancelMode} />
                <DialogStyle show={cancelShow} content='美食烹饪中，确定取消吗？' submitClock={this.handleCancelCook} cancelClock={this.handleHideDialog} />
            </div>
        );
    }
}
