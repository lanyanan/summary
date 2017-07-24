'use strict';

import { Actions } from './Actions';

const RUNMODE = ['模式', '对流烧烤', '对流加热', '静态烘焙', '对流烤', '披萨', '解冻', '烘焙', '烤肉', '云菜谱'];
const PAUSE = ['停止', '启动', '暂停'];
const STATE = {
    networkavailable: 1,
    online: 1,
    power: 2,
    runmode: 2,
    mode: 1,
    modestatus: 1,
    pause: 2,
    PauseStatus: 2,
    childlock: 2,
    ChildLockStatus: 2,
    temperatureset: 160,
    temperaturestatus: 0,
    reservationhour: 0,
    reservationmin: 0,
    remainingworkingtimehour: 0,
    remainingworkingtimemin: 0,
    remainingreservationtimehour: 0,
    remainingreservationtimemin: 0,
    workhour: 0,
    workmin: 30,
    SetWorkTimeMin: 0,
    SetWorkTimeHour: 0,
    LightStatus: 2,
    SetReservationTimeHour: 0,
    SetReservationTimeMin: 0,
    TempSenserShortCircuitError: 0,
    NoTempSenserError: 0,
    HeatingError: 0,
    RapidHeatingState: 2
};
const CHANGEVALUE = [0, 2, 1];
const CHANGEPOWERVALUE = [0, 3, 3, 2];
const MINTEMPERATURE = [0, 50, 50, 50, 50, 50, 50, 50, 50];
const MAXTEMPERATURE = [0, 250, 250, 250, 250, 250, 60, 235, 235];
const DEFAULTTEMPERATURE = [0, 160, 180, 180, 180, 180, 50, 180, 180];
const UPDATEFLAG = {
    'power': 0,
    'pause': 1,
    'rapidheating': 2,
    'temperatureset': 3,
    'workhour': 4,
    'workmin': 5,
    'reservationhour': 6,
    'reservationmin': 7,
    'light': 8,
    'childlock': 9,
    'mode': 10
};
const DATAFILTER = {
    'power': 'runmode',
    'pause': 'PauseStatus',
    'rapidheating': 'RapidHeatingState',
    'temperatureset': 'temperaturestatus',
    'workhour': 'SetWorkTimeHour',
    'workmin': 'SetWorkTimeMin',
    'reservationhour': 'SetReservationTimeHour',
    'reservationmin': 'SetReservationTimeMin',
    'light': 'LightStatus',
    'childlock': 'ChildLockStatus',
    'mode': 'modestatus'
};

const DATAHAND = {
    'temperaturestatus': 'temperatureset',
    'SetWorkTimeHour': 'remainingworkingtimehour',
    'SetWorkTimeMin': 'remainingworkingtimemin',
    'SetReservationTimeHour': 'remainingreservationtimehour',
    'SetReservationTimeMin': 'remainingreservationtimemin',
};

const DATEARRAY = ['00', '05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const TOPDISTANCE = !!(navigator.userAgent.indexOf('Android') + 1) ? 73 : 64;

const DOMAIN = '';
const MENULIST = `/v1/app/customization/cookbook/menu/menuList`;
const MENUDETAIL = `/v1/app/customization/cookbook/menu/getMenuByMenuId`;
const CONFIGURATION = `/v1/device/config/configurationData`;
const SETCLOCK = `/v1/app/customization/cookbook/user/setClockList`;
const CANCELCLOCK = `/v1/app/customization/cookbook/user/cancelClock`;
const PRODUCTID = 1932;



const showStateTxt = (state) => { // 状态显示文字
    const { online, runmode, remainingreservationtimehour, remainingreservationtimemin, remainingworkingtimehour, remainingworkingtimemin, SetWorkTimeHour, SetWorkTimeMin, PauseStatus } = state;
    let modetxt = '';
    if (online == 2) {
        modetxt = '设备已离线';
    } else {
        if (runmode === 2) {
            modetxt = '设备已关机';
        } else if (runmode == 3) {
            modetxt = '待机中';
        } else {
            if (remainingreservationtimehour || remainingreservationtimemin) { //
                modetxt = '预约中';
            } else {
                if (remainingworkingtimehour == 0 && remainingworkingtimemin == 0 && (SetWorkTimeHour != 0 || SetWorkTimeMin != 0)) { // 设置工作时间不为0，剩余工作时间为0
                    modetxt = '烘焙完成';
                } else {
                    if (PauseStatus == 1) {
                        modetxt = '暂停';
                    } else {
                        modetxt = '烘焙中';
                    }
                }
            }
        }
    }
    return modetxt;
};
const isFinish = (state) => { //判断是否烘焙完成
    const { online, runmode, remainingworkingtimehour, remainingworkingtimemin, SetWorkTimeHour, SetWorkTimeMin } = state;
    return online == 1 && runmode == 1 && remainingworkingtimehour == 0 && remainingworkingtimemin == 0 && (SetWorkTimeHour || SetWorkTimeMin);
};
const isRun = (state) => { // 判断是否为烘焙中状态
    const { runmode, remainingreservationtimehour, remainingreservationtimemin } = state;
    return runmode == 1 && remainingreservationtimehour == 0 && remainingreservationtimemin == 0;
};
const isOffline = (state) => {
    const { networkavailable, online } = state;
    if (networkavailable == 2) {
        het.toast('网络已断开');
        return false;
    }
    if (online == 2) {
        het.toast('设备已离线');
        return false;
    }
    return true;
};
const showPowerTxt = (state) => {
    const { ChildLockStatus, runmode } = state;
    let powertxt = '电源';
    if (ChildLockStatus === 1) {
        powertxt = '解锁';
    } else if (ChildLockStatus == 2 && runmode == 1) {
        powertxt = '取消';
    }
    return powertxt;
};
const addZero = (num = 0) => {
    var num = num;
    const str = num.toString();
    return new Array(3 - str.length).join('0') + str;
};
const isRapidheat = (state) => {
    const { temperatureset, ChildLockStatus, runmode, modestatus, remainingreservationtimehour, remainingreservationtimemin } = state;
    return runmode == 1 && temperatureset >= 100 && ChildLockStatus == 2 && modestatus > 0 && modestatus < 4 && remainingreservationtimehour == 0 && remainingreservationtimemin == 0;
};
const isCloudFinished = (state) => {
    const { modestatus, reciperemainingworkingtimehour, reciperemainingworkingtimemin, recipenumber, recipeworkingnumber } = state;
    if (modestatus == 9 && reciperemainingworkingtimehour == 0 && reciperemainingworkingtimemin == 0 && recipenumber == recipeworkingnumber) {
        return true;
    }
    return false;
};
const showPowerIcon = (state, isBt) => {
    const { runmode, ChildLockStatus, modestatus, online } = state;
    let powIcon = '';
    if (runmode == 1) {
        if (ChildLockStatus == 1) {
            powIcon = 'childlock';
        } else {
            powIcon = modestatus ? 'cancel' : 'icon-power1';
        }
    } else {
        powIcon = `icon-power${runmode}`;
    }
    return <img src={`../static/img/${isBt ? 'btnlist/' : ''}${powIcon}.png`} />;
};
const showOverlayer = (show) => {
    return show ? '' : 'hidden';
};
const hideOverlayer = (hide) => {
    return hide ? 'hidden' : '';
};
const cancelClock = (state) => {
    const { MenuNumberHigh, MenuNumberLow } = state,
        menuId = MenuNumberHigh * 256 + MenuNumberLow;
    if (menuId) {
        het.post(CANCELCLOCK, {
            menuId: MenuNumberHigh * 256 + MenuNumberLow,
        });
    }
};
const sendPowerData = (state) => {
    const { ChildLockStatus, runmode } = state;
    if (ChildLockStatus == 1) {
        Actions.sendData({ 'childlock': 2 });
        return false;
    }

    const postPower = CHANGEPOWERVALUE[runmode],
        postPowerJson = { 'power': postPower };
    let addJson = {};
    if (postPower == 3) {
        addJson = { 'mode': 0, 'rapidheating': 2 };  //待机手动初始化mode
        cancelClock(state);
    } else if (postPower == 2) {
        addJson = { 'light': 2 }; // 关机手动初始化关灯状态
    }
    Actions.sendData({ ...postPowerJson, ...addJson });
};
const sendPauseData = (state) => {
    Actions.sendData({ 'pause': CHANGEVALUE[state.PauseStatus] });
};
const sendRapidheatData = (state) => {
    Actions.sendData({ 'rapidheating': CHANGEVALUE[state.RapidHeatingState] });
};
const setTitle = (value) => {
    return het.setTitle(JSON.stringify({
        setNavTitle: 1,
        title: value,
        setNavRightBtnHiden: 0
    }));
};
const isOwnEmpty = (obj) => {
    for (let name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false;
        }
    }
    return true;
};

export {
    RUNMODE,
    PAUSE,
    STATE,
    CHANGEVALUE,
    CHANGEPOWERVALUE,
    MINTEMPERATURE,
    MAXTEMPERATURE,
    DEFAULTTEMPERATURE,
    UPDATEFLAG,
    DATEARRAY,
    DATAFILTER,
    DATAHAND,
    TOPDISTANCE,
    DOMAIN,
    MENULIST,
    MENUDETAIL,
    CONFIGURATION,
    SETCLOCK,
    PRODUCTID,
    showStateTxt,
    isRun,
    isOffline,
    showPowerTxt,
    addZero,
    isRapidheat,
    showPowerIcon,
    showOverlayer,
    hideOverlayer,
    sendPowerData,
    sendPauseData,
    sendRapidheatData,
    isFinish,
    isCloudFinished,
    setTitle,
    isOwnEmpty,
    cancelClock
};