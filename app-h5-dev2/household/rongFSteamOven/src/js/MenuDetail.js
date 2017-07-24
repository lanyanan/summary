'use strict';

import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Range} from './Range.jsx';
import {DialogStyle} from './DialogStyle.jsx';
import {
    HEADERTOP,
    RUNMODE,
    MINTEMPERATURE,
    MAXTEMPERATURE,
    setTitle,
    initDataFm,
    isOwnEmpty,
    isCloudFinished,
    isFinish,
    cancelClock
} from './constants';

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

const getMenuId = (_this) => {
    if (location.href.match(/page\/menuDetail.html/)) {
        return Funs.getUrlParam('menuId');
    }
    return _this.props.location.query['menuId'];
};

const callback = (isParam = 0, _this, postJson) => {
    return function (response) {
        const responseData = JSON.parse(response);
        if (responseData.code == 0) {
            if (isParam) { // 如果是发送配置数据
                const firstData = postJson.ModeSet[0],
                    menuId = +getMenuId(_this);
                Actions.cacheData({
                    'CurrentWorkMode': 9,
                    'CookBookCurIsPause': 0,
                    'CookBookCurStep': 1,
                    'CookBookCurTempH8b': firstData.ModeTempHigh,
                    'CookBookCurTempL8b': firstData.ModeTempLow,
                    'CookBookCurTimeRemainMin': firstData.ModeTimingHour,
                    'CookBookCurTimeRemainSec': firstData.ModeTimingMin,
                    'CookBookHight8b': parseInt(menuId / 256),
                    'CookBookLow8b': menuId % 256
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

const postClockList = (_this) => { // post 定时器列表
    let {configList, CookBookCurStep, CurrentWorkMode} = _this.state,
        newConfigList = {...configList},
        clockList = [], // 存储定时间隔数组
        timeTotal = 0; // 总时长
    for (let k in newConfigList) {
        const item = newConfigList[k],
            modeTime = transformTime(item['ModeTimingHour'], item['ModeTimingMin']),
            steamTime = transformTime(item['SteamTimingHour'], item['SteamTimingMin']),
            stepInterval = (item['SteamSwitch'] == '1') ? Math.max(modeTime, steamTime) : modeTime,// 取最大着计算时间
            isStop = CurrentWorkMode == 9 ? (CookBookCurStep <= (+k)) : 1; // 判断是否为中途暂停
        if (item['isRemind'] && isStop) { // 若需要提醒，添加数组
            clockList.push(timeTotal + stepInterval - 1);
        }
        if (isStop) {
            timeTotal += stepInterval; // 时间累加
        }
    }
    if (clockList.length) {
        het.post('/v1/app/customization/cookbook/user/setClockList', {
            timestamp: +new Date(),
            menuId: getMenuId(_this),
            startTime: Funs.dateFormat(new Date()),
            name: _this.state.name,
            clockList: JSON.stringify(clockList),
            bell: '泉水叮咚'
        }, callback(0, _this), errCallback);
    }
};

export class MenuDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            clockList: [], // 定时数组
            CookBookHight8b: 0,
            CookBookLow8: 0,
            CookBookTotalSteps: 0,
            configList: {}, // 配置数据
            cancelShow: false,
            setShow: false,
            selectedStep: 1,
            tempShow: true,
            stopShow: false, // 暂停提示
            name: '' // "菜单名称",
        };
        this.listenStore(Store); // 监听Store
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
        Actions.getData();
    }

    componentDidMount() {
        const _this = this;
        het.get('/v1/app/customization/cookbook/menu/getMenuByMenuId', {
            timestamp: +new Date(),
            menuId: getMenuId(_this),
            productId: _this.state.productId
        }, (response) => {
            const responseData = JSON.parse(response);
            if (responseData.code != 0) return false;
            const name = responseData.data.name; // 获取菜单名称，定时接口需要
            setTitle(name);
            _this.setState({name});
            const configList = responseData.data.menuPropertyConfigList[0].stepConfigList.slice(0);
            let newConfig = {};
            if (configList.length) {
                configList.forEach(function (item) {
                    let temObj = {
                        'Step': '0',
                        'SteamOnTime': '0',
                        'WorkTimeHour': '0',
                        'WorkTimeMin': '0',
                        'TempHight8b': '0',
                        'TempLow8b': '50',
                        'FunctionByte': '0',

                        'Stages': '0',
                        'StageMode': '1',
                        'ModeTimingHour': '0',
                        'ModeTimingMin': '0',
                        'ModeTempHigh': '0',
                        'ModeTempLow': '50',
                        'SteamSwitch': '0',
                        'SteamTimingHour': '0',
                        'SteamTimingMin': '0'
                    };
                    temObj.Step = item.step;
                    temObj.isRemind = item.isRemind;
                    item['propertyConfigList'].forEach(function (k) {
                        temObj[k.property] = k.value;
                    });
                    newConfig[temObj.Stages] = temObj;
                });
                _this.setState({
                    'configList': newConfig,
                    'CookBookHight8b': (parseInt(getMenuId(this) / 256)).toString(),
                    'CookBookLow8b': (getMenuId(this) % 256).toString(),
                    'CookBookTotalSteps': configList.length
                });
            }
        });
    }

    componentWillMount() {
        setTitle('云菜谱');
    }

    handleCancelCook() {
        cancelClock(this.state);
        Actions.cancel();
        this.handleHideDialog();
    }

    handleHideDialog() {
        this.setState({'cancelShow': false});
    }

    handleTemperatureSet(value) {
        this.setState({'changeTemperature': value});
    }

    handleTimeSet(value) {
        this.setState({'changeTimeHour': parseInt(value / 60), 'changeTimeMin': value % 60});
    }

    handleSwitch(on, stepsNum) {
        const state = {...this.state};
        state.configList[stepsNum]['isRemind'] = !(on);
        this.setState({configList: state.configList});
    }

    handleConfirm() {
        const {changeTemperature, selectedStep, changeTimeHour, changeTimeMin, tempShow} = this.state,
            state = {...this.state},
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
        this.setState({
            configList: state.configList,
            'changeTemperature': undefined,
            'changeTimeHour': undefined,
            'changeTimeMin': undefined,
            setShow: false,
        });
        document.body.className = '';
    }

    handleCancel() {
        this.setState({
            'changeTemperature': undefined,
            'changeTimeHour': undefined,
            'changeTimeMin': undefined,
            'setShow': false
        });
        document.body.className = '';
    }

    handleSetParam(stepsNum, tempShow) {
        document.body.className = 'ovh';
        this.setState({setShow: true, selectedStep: stepsNum, tempShow: tempShow});
    }

    handleStart() {
        const {CurrentWorkMode} = this.state;
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (CurrentWorkMode == 9 && !(this._isMenuIdEq())) { // 如果运行的是云菜谱，id不相等
            het.toast('请先取消正在烹饪的云菜谱！');
            return;
        }
        Actions.menuMode(() => {
            this._postJson();
        });
    }

    handleTemperatureSet(value) {
        this.setState({'temperatureset': value});
    }

    _postJson() {
        let {configList, deviceId, CookBookHight8b, CookBookLow8b, CookBookTotalSteps} = this.state,
            newConfigList = {...configList},
            postJson = {
                ModeSet: [],
                ConfigType: 1,
                ForceExecuteCookBook: 1,
                CookBookHight8b: parseInt(getMenuId(this) / 256),
                CookBookLow8b: parseInt(getMenuId(this) % 256),
                CookBookTotalSteps: +CookBookTotalSteps
            },
            _this = this;

        for (let k in newConfigList) {
            let item = {...newConfigList[k]};
            item.WorkTimeHour = item.ModeTimingHour;
            item.WorkTimeMin = item.ModeTimingMin;
            item.SteamOnTime = (parseInt(item.SteamTimingHour) * 60 + parseInt(item.SteamTimingMin)) * 120;
            item.TempHight8b = item.ModeTempHigh;
            item.TempLow8b = item.ModeTempLow;
            let s = item.isRemind ? het.hexUpFlag(0, 1, 1, het.hexUpFlag(2, 1, 1)) : het.hexUpFlag(2, 1, 1);
            s = item.StageMode == 1 ? het.hexUpFlag(3, 1, 1, s) : item.StageMode == 2 ? het.hexUpFlag(4, 1, 1, s) : het.hexUpFlag(3, 2, 1, s);
            item.FunctionByte = parseInt(s, 16);
            delete item['isRemind'];
            delete item['StageMode'];
            delete item['ModeTimingHour'];
            delete item['ModeTimingMin'];
            delete item['ModeTempHigh'];
            delete item['ModeTempLow'];
            delete item['SteamSwitch'];
            delete item['SteamTimingHour'];
            delete item['SteamTimingMin'];

            delete item['ConfigType'];
            delete item['ForceExecuteCookBook'];
            delete item['CookBookHight8b'];
            delete item['CookBookLow8b'];
            delete item['CookBookTotalSteps'];
            for (let m in item) {
                item[m] = +item[m];
            }
            postJson.ModeSet[k - 1] = item;
        }
        postJson.CookBookTotalSteps = postJson.ModeSet.length;
        het.post('/v1/device/config/configurationData', { // 发送配置数据
            json: JSON.stringify(postJson),
            source: source(),
            deviceId: deviceId,
            isSentDown: 0
        }, callback(1, _this, postJson), errCallback, 1);
        postClockList(_this);
    }

    handleStop() {
        this.setState({cancelShow: true});
    }

    handleNextStep() {
        postClockList(this);
        Actions.nextStep(1);
    }

    handleCancelMode() {
        cancelClock(this.state);
        Actions.cancel();
    }

    renderParamListDOM(items, stepsNum) {
        const {StageMode, ModeTimingHour, ModeTimingMin, ModeTempHigh, ModeTempLow, SteamSwitch, SteamTimingHour, SteamTimingMin} = items;
        return (
            <div >
                <div className="step-items-param" onTouchTap={() => {
                    this.handleSetParam(stepsNum, 1);
                }}>
                    <div className="step-name">{RUNMODE[StageMode]}</div>
                    <div className="step-time">
                        <p>温度：{transformTem(ModeTempHigh, ModeTempLow)}°C</p>
                        <p>时间：{initDataFm(+ModeTimingHour)}:{initDataFm(+ModeTimingMin)}</p>
                    </div>
                    <div className="step-status"></div>
                </div>
                {
                    SteamSwitch == '1' ? (
                        <div className="step-items-param" onTouchTap={() => {
                            this.handleSetParam(stepsNum, 0);
                        }}>
                            <div className="step-name">蒸汽</div>
                            <div className="step-time">
                                <p>时间：{initDataFm(+SteamTimingHour)}:{initDataFm(+SteamTimingMin)}</p>
                            </div>
                            <div className="step-status"></div>
                        </div>
                    ) : null
                }
            </div >
        );
    }

    renderParamDOM(item, stepsNum) {
        return (
            <div className="step-items-list">
                {this.renderParamListDOM(item, stepsNum)}
                <div className="step-warn">
                    <p>完成前1分钟提醒</p>
                    <div className="warn-switch" onClick={() => {
                        this.handleSwitch(item.isRemind, stepsNum);
                    }}>
                        <span className={item.isRemind ? '' : 'off'}></span>
                    </div>
                </div>
            </div>
        );
    }

    renderStepDOM() {
        let {configList, CookBookCurStep, CurrentWorkMode} = this.state,
            online = parseInt(this.state.online || 1),
            newConfigList = [];

        for (let k in configList) {
            newConfigList[k - 1] = configList[k];
        }

        const showClassName = (stage) => {
            if (CurrentWorkMode != 9 || (CurrentWorkMode == 9 && !this._isMenuIdEq()) || online == 2) {
                return '';
            }
            if (isCloudFinished(this.state)) {
                return 'step-actived';
            }
            else {
                if (CookBookCurStep == stage) {
                    return 'step-active';
                }
                if (CookBookCurStep > stage) {
                    return 'step-actived';
                }
            }
            return '';
        };
        const maxStep = Math.max(...Object.keys(configList));
        return (
            <div
                className={`${(online == 1 && CurrentWorkMode == 9 && this._isMenuIdEq()) ? 'cloudMenuDoing' : ''}`}>
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
                <div className={`step-list step-finish ${isFinish(this.state) && 'step-active'}`}>
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
        const {CookBookHight8b, CookBookLow8b} = this.state,
            menuId = CookBookHight8b * 256 + CookBookLow8b;
        return menuId == getMenuId(this);
    }

    renderButton() {
        const {CurrentWorkMode} = this.state;
        let online = parseInt(this.state.online || 1);
        if (CurrentWorkMode == 0 || CurrentWorkMode == void 0 || (CurrentWorkMode == 9 && !this._isMenuIdEq())) { // 非云菜谱模式 或者 云菜谱id不相等
            return (<span className="cacel" onTouchTap={this.handleStart}>启动</span>);
        }
        if (CurrentWorkMode != 9 && CurrentWorkMode != 0 || isCloudFinished(this.state) || online == 2) {
            return;
        }
        return (<span onTouchTap={this.handleStop}>取消</span>);
    }

    renderTopDOM() {
        const {networkavailable, online, CurrentWorkMode, configList, CookBookCurStep, CookBookCurTempH8b, CookBookCurTempL8b, CookBookCurTimeRemainMin, CookBookCurTimeRemainSec, CookBookCurIsPause} = this.state;
        if (isFinish(this.state)) {
            return (<span className="wait">烘焙完成</span>);
        }
        if (networkavailable == 2) {
            return (<span className="wait">网络已断开</span>);
        }
        if (online == 2) {
            return (<span className="wait">设备已离线</span>);
        }

        return (CurrentWorkMode != 9 || (CurrentWorkMode == 9 && (!this._isMenuIdEq()))
            ?
            <span className="wait">等待烹饪</span>
            :
            <div className="cooking">
                <p className="cook-mode">{RUNMODE[configList[String(CookBookCurStep)].StageMode]}</p>
                <p className="temperature">{CookBookCurTempH8b * 256 + CookBookCurTempL8b}<span>°C</span></p>
                <p className="time">{initDataFm(parseInt(CookBookCurTimeRemainMin / 60))}:{initDataFm(parseInt(CookBookCurTimeRemainMin % 60))}:{initDataFm(CookBookCurTimeRemainSec)}</p>
                <span className={`${(CookBookCurIsPause == 1) ? 'stop-rotate' : 'rotate'}`}></span>
            </div>);
    }

    render() {
        let {cancelShow, CookBookCurIsPause, setShow, changeTemperature, selectedStep, tempShow, configList, changeTimeHour, changeTimeMin, CurrentWorkMode} = this.state;
        if (isOwnEmpty(configList)) {
            return (
                <div>
                    <div className="menu-bar" style={{height: HEADERTOP}}></div>
                    <div className="menu-detail">
                        <div>数据加载中..</div>
                    </div>
                </div>
            );
        }
        // console.log("---------selectedStep-----" + selectedStep);
        // console.log("--------------" + JSON.stringify(configList));
        const {ModeTempHigh, ModeTempLow, ModeTimingHour, ModeTimingMin, SteamTimingHour, SteamTimingMin} = configList[selectedStep],
            showHour = tempShow ? ModeTimingHour : SteamTimingHour,
            showMin = tempShow ? ModeTimingMin : SteamTimingMin,
            showRangTime = (changeTimeHour != undefined && changeTimeMin != undefined) ? (changeTimeHour * 60 + changeTimeMin) : (showHour * 60 + (+showMin)),
            showTimeTxt = (changeTimeHour != undefined && changeTimeMin != undefined) ? `${initDataFm(changeTimeHour)} : ${initDataFm(changeTimeMin)}` : (`${initDataFm(+showHour)} : ${initDataFm(+showMin)}`),
            showTemp = changeTemperature === undefined ? transformTem(ModeTempHigh, ModeTempLow) : changeTemperature;
        return (
            <div>
                <div className="menu-detail">
                    <div className="menu-bar" style={{height: HEADERTOP}}></div>
                    <div className="menu-top" style={{marginTop: HEADERTOP}}>
                        <div className="menu-top-con">
                            {this.renderTopDOM()}
                        </div>
                    </div>
                    <div className="menu-step">
                        <h3>烹饪步骤</h3>
                        {this.renderStepDOM()}
                    </div>
                </div>
                <div className="run-set"
                     style={setShow ? {'opacity': 1, 'display': 'block'} : {'opacity': 0, 'display': 'none'}}>
                    <div className="run-set-content">
                        <div className="run-set-btn flex">
                            <span className="flex-cell cancel" onTouchTap={this.handleCancel}>取消</span>
                            <span className="flex-cell confirm" onTouchTap={this.handleConfirm}>确定</span>
                        </div>
                        <div className="run-set-contrl">
                            {tempShow ?
                                <div>
                                    <p className="selectTime">烘培温度 {showTemp}℃</p>
                                    <Range module='dialog' value={showTemp} min={40}
                                           max={250} fnFeedback={this.handleTemperatureSet}/>
                                </div>
                                :
                                null
                            }
                            <p className="selectTime">时间 {showTimeTxt}</p>
                            <Range module='dialog' value={showRangTime} min={1} max={299} type='time'
                                   fnFeedback={this.handleTimeSet}/>
                        </div>
                    </div>
                </div>
                <div className="menu-btn">
                    {this.renderButton()}
                </div>
                <DialogStyle
                    show={CookBookCurIsPause == 1 && CurrentWorkMode == 9 && !isCloudFinished(this.state) && (this._isMenuIdEq())}
                    content='当前步骤已完成，请执行下一步' leftpam='取消烹饪' rightpam='下一步' submitClock={this.handleNextStep}
                    cancelClock={this.handleCancelMode}/>
                <DialogStyle show={cancelShow} content='美食烹饪中，确定取消吗？' submitClock={this.handleCancelCook}
                             cancelClock={this.handleHideDialog}/>
            </div>
        );
    }
}
