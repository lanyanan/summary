'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';

const options = {};
var data = [];
// 格式化日期为 yyyy-MM-dd的形式
function ymd(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`.replace(/(?=\b\d\b)/g, '0');

}
// 格式化日期为 yyyy-MM的形式
function ym(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}`.replace(/(?=\b\d\b)/g, '0');
}


export const Store = Reflux.createStore({
    listenables: [Actions],
    onReady(data){
        let _this = this, url = '/v1/app/chealth/bodyfat/getBodyFatDataList';
        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken
        options.appId = data.appId ? data.appId : options.appId;
        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
        options.img = data.img;
        options.nickname = data.nickname;
        //data.timestamp = +new Date();
        //options.timestamp = +new Date();
        //console.log(data, options, 'from stores1');
        //this.trigger(data);
        het.get(url, data, function (data) {
            //console.log(data, '1');
            data = JSON.parse(data).data.list;
            function groupData(data) {
                var newData = {};
                var arrData = [];
                // 分组
                for (var i in data) {
                    //data[i].dataTime=Funs.dateFormat( data[i].dataTime, 'yyyy-MM-dd hh:mm:ss', true);
                    var k = (data[i].dataTime || '').replace(/\s.+$/, '');

                    if (!newData[k]) {
                        newData[k] = [];
                    }
                    newData[k].push(data[i]);
                }
                // 排序
                for (var j in newData) {
                    newData[j].sort(function (a, b) {
                        return a[j] < b[j + 1];
                    });
                    arrData.push(newData[j]);
                }
                return arrData;
            };
            data = groupData(data);
            //console.log(data, '2');
            _this.trigger({'data': data});
            //console.log(data, 'suc from readyData1');
        }, function (data) {
            console.log('fail sendData',data);
            het.toast('获取数据失败')
        });

    },


    onRepaint(data){
        this.trigger(data);
        console.log(data,'from repaint')
    },

    onSendDate(data){
        let _this = this, url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken;
        options.appId = data.appId ? data.appId : options.appId;
        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
        options.img = data.img;
        options.nickname = data.nickname;
        //console.log(data,'from app ready');
        //this.trigger(options);
        het.get(url, data, function (data) {
            data = JSON.parse(data);
            //console.log(data,'parse')
            function classifyFn(data) {
                data = data.data;
                let len = data.length, newArr = {}, _weight = [], _fatRate = [], _bmiRate = [], _meatRate = [], _dataTime = [],
                    _boneWeight=[],_metabolismRate=[],_moistureRate=[];
                for (var i = 0; i < len; i++) {
                    if (data[i].dataTime[5] == 0) {
                        if (data[i].dataTime[8] == 0) {
                            _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
                        } else {
                            _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
                        }
                    } else {
                        if (data[i].dataTime[8] == 0) {
                            _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
                        } else {
                            _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
                        }
                    }
                    _weight.push(data[i].weight);
                    _fatRate.push(data[i].fatRate);
                    _bmiRate.push(data[i].bmiRate);
                    _meatRate.push(data[i].meatRate);
                    _boneWeight.push(data[i].boneWeight);
                    _metabolismRate.push(data[i].metabolismRate);
                    _moistureRate.push(data[i].moistureRate);
                }
                return newArr = {_dataTime, _weight, _fatRate, _bmiRate, _meatRate,_boneWeight,_metabolismRate,_moistureRate}
            };
            data = classifyFn(data);
            _this.trigger({"data": data});
        }, function () {
            console.log('fail sendData');
            het.toast('获取数据失败')
        })
    },
    onGetHisData(beginDate, endDate){
        let _this = this, url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
        options.beginDate = ymd(beginDate);
        options.endDate = ymd(endDate);
        console.log(options);
        if (options.appId) {
            het.get(url, options, function (data) {
                data = JSON.parse(data);
                function classifyFn(data) {
                    data = data.data;
                    let len = data.length, newArr = {}, _weight = [], _fatRate = [], _bmiRate = [], _meatRate = [], _dataTime = [],
                        _boneWeight=[],_metabolismRate=[],_moistureRate=[];
                    for (var i = 0; i < len; i++) {
                        if (data[i].dataTime[5] == 0) {
                            if (data[i].dataTime[8] == 0) {
                                _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
                            } else {
                                _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
                            }
                        } else {
                            if (data[i].dataTime[8] == 0) {
                                _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
                            } else {
                                _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
                            }
                        }
                        _weight.push(data[i].weight);
                        _fatRate.push(data[i].fatRate);
                        _bmiRate.push(data[i].bmiRate);
                        _meatRate.push(data[i].meatRate);
                        _boneWeight.push(data[i].boneWeight);
                        _metabolismRate.push(data[i].metabolismRate);
                        _moistureRate.push(data[i].moistureRate);
                    }
                    return newArr = {_dataTime, _weight, _fatRate, _bmiRate, _meatRate,_boneWeight,_metabolismRate,_moistureRate}
                };
                data = classifyFn(data);
                _this.trigger({"data": data});
            }, function () {
                console.log('fail sendData');
                //het.toast('数据请求错误')
            });
        }
    },

    onPostDate(data_id){
        let data = options, url = '/v1/app/chealth/bodyfat/getBodyFatDataList', _this = this;
        let reload = options;
        data.dataId = data_id;
        het.post('/v1/app/chealth/bodyfat/deleteBodyFatDataById', data,
            function (data) {
                //console.log(data, 'suc post');
                //het.toast('post suc');
                het.get(url, reload, function (data) {
                    data = JSON.parse(data).data.list;
                    function groupData(data) {
                        var newData = {};
                        var arrData = [];

                        // 分组
                        for (var i in data) {
                            var k = (data[i].dataTime || '').replace(/\s.+$/, '');
                            if (!newData[k]) {
                                newData[k] = [];
                            }
                            newData[k].push(data[i]);
                        }
                        // 排序
                        for (var j in newData) {
                            newData[j].sort(function (a, b) {
                                return a[j] < b[j + 1];
                            });
                            arrData.push(newData[j]);
                        }
                        return arrData;
                    };
                    data = groupData(data);
                    _this.trigger({'data': data});
                    console.log(data, 'suc from reload data');
                }, function (data) {
                    console.log(data, 'err from readyData');
                    //het.toast('数据请求错误')
                });
            }, function (data) {
                console.log(data, 'fail post')
                het.toast('删除数据失败')
            });


    },

    onSelectedDate(dates){
        dates.slidedCalendarShow = false;
        this.trigger(dates);
    },

    groupData(data) {
        var newData = {};
        var arrData = [];
        // 分组
        data = data.data.list;
        for (var i in data) {
            var key = data[i].dataTime.replace(/\s.+$/, '');
            if (!newData[key]) {
                newData[key] = [];
            }
            newData[key].push(data[i]);
        }
        // 排序
        for (var j in newData) {
            newData[j].sort(function (a, b) {
                return a.dataTime > b.dataTime;
            });
            arrData.push(newData[j]);
        }
        arrData.sort(function (a, b) {
            return a[0].dataTime < b[0].dataTime;
        });
        return arrData;
    },
    onReadyHisData(data){
        this.trigger(data);
    },
    onGetNoData(data){
        this.trigger(data);
    },

    onGetAppHisData(beginDate, endDate){
        let _this = this, url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
        options.beginDate = ymd(beginDate);
        options.endDate = ymd(endDate);
        //console.log(options,'*************************');
        if (options.appId) {
            het.get(url, options, function (data) {
                data = JSON.parse(data);
                function classifyFn(data) {
                    data = data.data;
                    let len = data.length, newArr = {}, _weight = [], _fatRate = [], _bmiRate = [], _meatRate = [], _dataTime = [],
                        _boneWeight=[],_metabolismRate=[],_moistureRate=[];
                    for (var i = 0; i < len; i++) {
                        if (data[i].dataTime[5] == 0) {
                            if (data[i].dataTime[8] == 0) {
                                _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
                            } else {
                                _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
                            }
                        } else {
                            if (data[i].dataTime[8] == 0) {
                                _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
                            } else {
                                _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
                            }
                        }
                        _weight.push(data[i].weight);
                        _fatRate.push(data[i].fatRate);
                        _bmiRate.push(data[i].bmiRate);
                        _meatRate.push(data[i].meatRate);
                        _boneWeight.push(data[i].boneWeight);
                        _metabolismRate.push(data[i].metabolismRate);
                        _moistureRate.push(data[i].moistureRate);
                    }
                    return newArr = {_dataTime, _weight, _fatRate, _bmiRate, _meatRate,_boneWeight,_metabolismRate,_moistureRate}
                };
                data = classifyFn(data);
                //console.log(data);
                _this.trigger({"data": data});
            }, function (data) {
                console.log('fail sendData',data);
                het.toast('获取数据失败')
            });
        }
    },
    getCalendarData(beginDate,endDate){
        //let d1 = new Date();
        //let d2 = new Date();
        //d1.setMonth(d2.getMonth()-11);
        options.beginDate=beginDate;
        options.endDate=endDate;
        console.log(options,'*************from 22');
        let _this = this,url='/v1/app/chealth/bodyfat/getBodyFatMonthData';
        het.get(url, options, function (data) {
            data = JSON.parse(data);
            function classifyFn(data) {
                data = data.data;
                let len = data.length, newArr = {}, _weight = [], _fatRate = [], _bmiRate = [], _meatRate = [], _dataTime = [];
                for (var i = 0; i < len; i++) {
                    if (data[i].dataTime[5] == 0) {
                        if (data[i].dataTime[8] == 0) {
                            _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
                        } else {
                            _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
                        }
                    } else {
                        if (data[i].dataTime[8] == 0) {
                            _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
                        } else {
                            _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
                        }
                    }
                    _weight.push(data[i].weight);
                    _fatRate.push(data[i].fatRate);
                    _bmiRate.push(data[i].bmiRate);
                    _meatRate.push(data[i].meatRate);
                }
                return newArr = {_dataTime, _weight, _fatRate, _bmiRate, _meatRate}
            };
            data = classifyFn(data);
            _this.trigger({"data": data});
        }, function () {
            console.log('fail sendData');
            //het.toast('数据请求错误')
        })
    }
});



//onDelete(id) {
//    let newData = [];
//    data.map((it)=> {
//        if (it.dataId !== id) {
//            newData.push(it);
//        }
//    });
//    data = newData;
//    this.trigger(newData)
//},
//appId	    是	Integer	应用标识
//deviceId	是	string	设备id
//timestamp	是	number	时间戳
//memberId	是	string	用户编号（切换用户用）
//userType	是	string	用户身份（1：医生 3：患者）