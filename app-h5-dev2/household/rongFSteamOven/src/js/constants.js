'use strict';

const HEADERTOP = !!(navigator.userAgent.indexOf('Android') + 1) ? 73 : 64;

const initDataFm = (value = 0) => { //控制数据格式
    return parseInt(value) > 9 ? parseInt(value) : "0" + parseInt(value);
};

const RUNMODE = ['模式', '上加热', '下加热', '上下加热'];
const MINTEMPERATURE = [0, 50, 50, 50, 50, 50, 50, 50, 50];
const MAXTEMPERATURE = [0, 250, 250, 250, 250, 250, 60, 235, 235];
const CANCELCLOCK = `/v1/app/customization/cookbook/user/cancelClock`;

const setTitle = (value) => {
    return het.setTitle(JSON.stringify({
        setNavTitle: 1,
        title: value,
        setNavRightBtnHiden: 1
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

const isFinish = (state) => { //判断是否烘焙完成
    const {online, DeviceSwitch, CurrentWorkMode, CookBookCurTimeRemainHour, CookBookCurTimeRemainMin, CookBookTotalSteps, CookBookCurStep} = state;
    return online == 1 && DeviceSwitch == 3 && CurrentWorkMode == 9 && CookBookCurTimeRemainHour == 0 && CookBookCurTimeRemainMin == 0 && (CookBookTotalSteps == CookBookCurStep);
};

const isCloudFinished = (state) => {
    const {CurrentWorkMode, CookBookCurTimeRemainHour, CookBookCurTimeRemainMin, CookBookTotalSteps, CookBookCurStep} = state;
    if (CurrentWorkMode == 9 && CookBookCurTimeRemainHour == 0 && CookBookCurTimeRemainMin == 0 && CookBookTotalSteps == CookBookCurStep) {
        return true;
    }
    return false;
};

const cancelClock = (state) => {
    const { CookBookHight8b, CookBookLow8b } = state,
        menuId = CookBookHight8b * 256 + CookBookLow8b;
    if (menuId) {
        het.post(CANCELCLOCK, {
            menuId: CookBookHight8b * 256 + CookBookLow8b,
        });
    }
};

export {
    HEADERTOP,
    RUNMODE,
    MINTEMPERATURE,
    MAXTEMPERATURE,
    setTitle,
    initDataFm,
    isOwnEmpty,
    isFinish,
    isCloudFinished,
    cancelClock
}
