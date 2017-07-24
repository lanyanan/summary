'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const AppData = {
    'networkavailable': 1,
    'online': 1,
    'showerrordialog': false,
    'isDeviceConnected': false
};

/**
 * 十六进制字符串转字节数组
 * @param    {str}    十六进制字符串
 * @return   {array}  字节数组
 */
function Str2Bytes(str) {
    let pos = 0;
    let len = str.length;
    if (len % 2 != 0) {
        return null;
    }
    len /= 2;
    let hexA = new Array();
    for (let i = 0; i < len; i++) {
        let s = str.substr(pos, 2);
        let v = parseInt(s, 16);
        hexA.push(v);
        pos += 2;
    }
    return hexA;
}

/**
 * 字节数组转十六进制字符串
 * @param    {arr}   字节数组
 * @return   {str}   十六进制字符串
 */
function Bytes2Str(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        let tmp = arr[i].toString(16);
        if (tmp.length == 1) {
            tmp = "0" + tmp;
        }
        str += tmp;
    }
    return str;
}

/**
 * 创建测量数据对象
 */
function ObjStory(uploadTime, toc, cod, chroma, turbidity, tds, temperature, uploadLocation = '', longitude = '', latitude = '') {
    this.uploadTime = uploadTime;
    this.toc = toc;
    this.cod = cod;
    this.chroma = chroma;
    this.turbidity = turbidity;
    this.tds = tds;
    this.temperature = temperature;
    this.uploadLocation = uploadLocation;
    this.longitude = longitude;
    this.latitude = latitude;
    let now = new Date();
    this.timeZone = -now.getTimezoneOffset(); // 时区 (10*60 统一传分钟)
}

function byteToInt(arr, needShift) {
    let targ = (arr[0] & 0xff) | ((arr[1] << 8) & 0xff00) // | 表示安位或
        | ((arr[2] << 24) >>> 8) | (arr[3] << 24);
    if (needShift) {
        targ = targ >>> 0;
    }
    return targ;
}
/**
 * 10进制数组 转 16进制数
 * @param bytes
 * @returns {Number|number}
 */
function bytesToUnxInt(bytes) {
    let str = "";
    for (let i = 0; i < bytes.length; i++) {
        let tmp = bytes[i].toString(16);
        if (tmp.length == 1) {
            tmp = "0" + tmp;
        }
        str += tmp;
    }
    return parseInt(str, 16) || 0;
}


//高位在前，低位在后
function bytes2int(bytes, needShift) {
    let result = 0;
    if (bytes.length == 4) {
        let a = (bytes[0] & 0xff) << 24;//说明二
        let b = (bytes[1] & 0xff) << 16;
        let c = (bytes[2] & 0xff) << 8;
        let d = (bytes[3] & 0xff);
        result = a | b | c | d;
    }
    if (needShift) {
        result = needShift >>> 0;
    }
    return result;
}


Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

function UtcToLocTime(timestamp) {
    let dateTime = parseInt(timestamp) + 28800;
    let newDate = new Date();
    newDate.setTime(dateTime * 1000);
    return newDate.format('yyyy-MM-dd h:m:s');
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){
        console.log("onRepaint data====>" + JSON.stringify(datas) + "====type=====>" + type);
        if (!!datas.deviceId) {
            AppData.deviceId = datas.deviceId;
            this.onGetData();
        }

        //位置信息  1、uploadLocation  2、longitude  3、latitude
        if (datas.addr != undefined) AppData.addr = datas.addr;//定位地址
        if (datas.lontitude != undefined) AppData.lng = datas.lontitude;//经纬度
        if (datas.latitude != undefined) AppData.lat = datas.latitude;//经纬度

        if (datas.isDeviceConnected != undefined) {
            AppData.loading = 0;
            AppData.isDeviceConnected = datas.isDeviceConnected;//蓝牙链接状态
        }

        AppData.showerrordialog = false;
        if (datas.bleData != undefined) {
            AppData.bleData = datas.bleData.toUpperCase();//数据值
            AppData.cmdType = datas.cmdType;//数据类型

            // let data1;
            let bleDataList = Str2Bytes(AppData.bleData);
            // data1 = data;
            // if (AppData.bleData.toUpperCase().startsWith('3A')) {
            //     data1 = data.slice(6, data.length - 1);
            // }
            // let data2 = Bytes2Str(data1).toUpperCase();

            if (bleDataList.length == 2) {
                if (AppData.bleData == "5306") {
                    AppData.showerrordialog = true;
                } else if (AppData.bleData == "51FE") {
                }
            } else if (bleDataList.length == 3) {
                if (AppData.bleData == "510BFF") {
                    AppData.loading = 2;
                } else if (AppData.bleData == "510B01") {
                    AppData.loading = 0;
                    het.toast("基线校准成功");
                } else if (AppData.bleData == "510B00") {
                    AppData.loading = 0;
                    het.toast("基线校准失败");
                }
            } else {
                let array = [];
                if (AppData.cmdType == 8) {
                    bleDataList = bleDataList.slice(0, 18);
                    // let timeVal = byteToInt(bleDataList.slice(0, 4), true);
                    let timeVal = bytesToUnxInt(bleDataList.slice(0, 4));
                    console.log("-----timeVal-------->>" + timeVal);
                    // let uploadTime = Funs.timestampToUtc(timeVal, '-');
                    let uploadTime = UtcToLocTime(timeVal);// 设备传过来的是UTC时间  这里转成本地时间
                    let toc = (bleDataList[4] * 256 + bleDataList[5]) / 100;
                    let cod = (bleDataList[6] * 256 + bleDataList[7]) / 100;
                    let chroma = (bleDataList[8] * 256 + bleDataList[9]) / 100;
                    let turbidity = (bleDataList[10] * 256 + bleDataList[11]) / 100;
                    // let tds = byteToInt(bleDataList.slice(12, 16), false);
                    let tds = bytesToUnxInt(bleDataList.slice(12, 16));
                    let temperature = (bleDataList[16] * 256 + bleDataList[17]) / 100;
                    array.push(new ObjStory(uploadTime, toc, cod, chroma, turbidity, tds, temperature, AppData.addr, AppData.lng, AppData.lat));
                    this.onPostData(array);
                } else if (AppData.cmdType == 6) {
                    ( bleDataList.length % 18 == 2) && (bleDataList = bleDataList.slice(2, bleDataList.length));//这里排除掉发过来的数据带有2个字节的帧序 去掉2字节的帧序头
                    for (let i = 0; i < bleDataList.length / 18; i++) {
                        let dataItem = bleDataList.slice(i * 18, i * 18 + 18);
                        // let timeVal = byteToInt(dataItem.slice(0, 4), true);
                        let timeVal = bytesToUnxInt(dataItem.slice(0, 4));
                        console.log("-----timeVal-------->>" + timeVal);
                        // let uploadTime = Funs.timestampToUtc(timeVal, '-');
                        let uploadTime = UtcToLocTime(timeVal);
                        let toc = (dataItem[4] * 256 + dataItem[5]) / 100;
                        let cod = (dataItem[6] * 256 + dataItem[7]) / 100;
                        let chroma = (dataItem[8] * 256 + dataItem[9]) / 100;
                        let turbidity = (dataItem[10] * 256 + dataItem[11]) / 100;
                        // let tds = byteToInt(dataItem.slice(12, 16), false);
                        let tds = bytesToUnxInt(dataItem.slice(12, 16));
                        let temperature = (dataItem[16] * 256 + dataItem[17]) / 100;
                        array.push(new ObjStory(uploadTime, toc, cod, chroma, turbidity, tds, temperature));
                    }
                    AppData.array = array;
                    location.href = '#/SyncHisData';
                }
            }
        }
        this.trigger(AppData);
        console.log(AppData, 'from repaint')
    },

    onGetTrigger(){
        this.trigger(AppData);
    },

    onChangeAddress(selectIndex, address, longitude, latitude){
        let mydata = AppData.array || [];
        if (selectIndex != -1 && selectIndex < mydata.length) {
            mydata[selectIndex].uploadLocation = address;
            mydata[selectIndex].longitude = longitude;
            mydata[selectIndex].latitude = latitude;
            AppData.array = mydata;
        }
        this.trigger(AppData);
    },

    onSend(configType){
        //1：水质检测命令    2：基线校准命令    3:关闭错误提示框
        let configContent;
        if (configType == 1) {
            configContent = '03FE';
            AppData.deviceStatus = 1;
            AppData.loading = 2;
        } else if (configType == 2) {
            configContent = '0203';
            AppData.loading = 2;
        } else if (configType == 3) {
            AppData.showerrordialog = false;
        }
        if (configType != 3) {
            het.send({bleData: configContent}, (data) => {
                console.log('成功');
            }, (data) => {
                AppData.loading = 0;
                het.toast("命令发送失败");
                this.trigger(AppData);
            });
        }
        this.trigger(AppData);
    },

    onPostData(dataArr){
        let _this = this;
        let url = '/v1/device/data/raw/upload';
        let cfg = {
            deviceId: AppData.deviceId,
        };
        cfg.data = JSON.stringify(dataArr);
        het.post(url, cfg, (data) => {
            console.log(data, 'suc from post data');
            AppData.array = [];
            _this.trigger(AppData);
            this.onGetData();
        }, (data) => {
            console.log(data, 'err from post data');
        });
    },

    onGetData(){
        let cfg = {
            deviceId: AppData.deviceId
        };
        let _this = this;
        let url = '/v1/app/customization/waterQuailtyDetector/getWaterQuailtyDetectorLatestData';
        het.get(url, cfg, (data) => {
            data = JSON.parse(data).data;
            AppData.data = data;
            AppData.deviceStatus = 2;
            AppData.loading = 0;
            _this.trigger(AppData);
            console.log(AppData, 'from repaint');
        }, (data) => {
            console.log('fail sendData', data);
            // het.toast('获取数据失败')
        });
    },

    onGetHisData(pageIndex){
        let cfg = {
            deviceId: AppData.deviceId,
            pageIndex: pageIndex || 1,
            pageRows: 10
        };
        let _this = this;
        let url = '/v1/app/customization/waterQuailtyDetector/getWaterQuailtyDetectorHistoryData';
        het.get(url, cfg, (data) => {
            data = JSON.parse(data).data.list;
            AppData.index = pageIndex;
            AppData.list = data;
            _this.trigger(AppData);
        }, (data) => {
            console.log('fail sendData');
            // het.toast('获取数据失败')
        });
    },

    onGetNearestDistanceT10Data(longitude, latitude){
        let cfg = {
            longitude: longitude,
            latitude: latitude
        };
        let _this = this, url = '/v1/app/customization/waterQuailtyDetector/getNearestDistanceT10Data';
        het.post(url, cfg, (data) => {
            data = JSON.parse(data).data;
            AppData.results = data;
            _this.trigger(AppData);
        }, (data) => {
        });
    },
});