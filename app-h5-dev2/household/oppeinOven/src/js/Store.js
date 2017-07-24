'use strict';

import { Actions } from './Actions';
import { UPDATEFLAG, DATAFILTER, DATAHAND } from './constants';

const dataFilterTimers = { ...UPDATEFLAG };

const dataFilter = (data) => {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
};
const setDataTimer = (...keys) => {
    let time = (new Date).getTime() + 10e3;
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
};
const calcFlag = function () { // 递归计算updateFlag的值
    return [...arguments].reduce(function (pre, el) {
        return het.hexUpFlag(el, 1, 2, pre);
    }, 0);
};

let productId = 0,
    deviceId = 0; // 设置全局，由于子路由跳转获取不到productId，deviceId
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data, type) {
        if (data.productId) {
            productId = data.productId;
        }
        if (data.deviceId) {
            deviceId = data.deviceId;
        }
        this.trigger({ ...dataFilter(data) });
    },
    onSendData(json) {
        const updateArray = [],
            filterArray = [];
        Object.keys(json).forEach(function (el) {
            updateArray.push(UPDATEFLAG[el]);
            filterArray.push(DATAFILTER[el]);
        });

        het.send({ ...json, 'updateFlag': calcFlag(...updateArray) }, (data) => {
            const cacheData = {};
            for (let k in json) {
                cacheData[DATAFILTER[k]] = json[k];
            }
            Object.keys(DATAHAND).forEach((el) => { // 手动设置过滤的数据
                if (el in cacheData) {
                    cacheData[DATAHAND[el]] = cacheData[el];
                    filterArray.push(DATAHAND[el]);
                }
            });
            setDataTimer(...filterArray);
            this.trigger(cacheData);
        }, (data) => {
            het.toast('命令发送失败');
        });
    },
    onCacheData(json) { // 只过滤，不发送
        setDataTimer(...Object.keys(json));
        this.trigger(json);
    },
    onGetParam() {
        if (deviceId) {
            this.trigger({ deviceId });
        }
    }
});