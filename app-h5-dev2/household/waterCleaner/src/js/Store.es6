'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
/*import {Funs} from '../../../common/src/fun.es6'*/
;
import {Actions} from './Actions.es6';

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
let appData = {
    weekChart: 1,
    monthChart: 2,
    montChart: 2,
    yearChart: 2,
    sourceWaterTds: 0,//源水TDS
    pureWaterTds: 0,//纯水TDS
    waterTemp: 0,//水温
    flowMeter: 0,//计费流量
    startBillTime: 1462934494379,//计费开始时间
    endBillTime: 1463035595000,//计费结束时间
    chartData: {
        grid: {
            right: 0,
            top: 10,
            left: 18,
            bottom: 40,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [],
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#999',
                    width: 1,
                    type: 'solid'
                }
            },
            axisLabel: {
                interval: 0,
                //rotate: 45
            }
        },
        yAxis: {
            axisLine: false,
            splitLine: {
                lineStyle: {
                    color: ['#ccc'],
                    width: 1,
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#47d5bf',
                    fontSize: 15
                },
                formatter: function (value) {
                    return value + "L";
                }
            },
            axisTick: {
                alignWithLabel: true,
                show: false
            }
        },
        series: [{
            data: [],
            //itemStyle:{
            //    normal:{
            //        barBorderRadius: [20,20, 0, 0], //（顺时针左上，右上，右下，左下
            //        color:'#18dffb'
            //    }
            //},
            //barWidth:10,
            lineStyle: {
                normal: {
                    //barBorderRadius: [20,20, 0, 0], //（顺时针左上，右上，右下，左下
                    color: '#18dffb',
                    width: 4
                }
            },
            smooth: true,
            color: '#18dffb',
            type: 'line',
            //symbol: 'circle',
            symbolSize: 6,
            areaStyle: {
                normal: {
                    color: '#b2f4fe'
                }
            },
        }]
    }
};
let URL = "", options = {};
let DOMIN = "http://" + getQueryString("host");

//var URL="../static/data/data2.json";
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        //appData = Funs._extends(appData,data);
        this.trigger(data);
    },
    onRefresh(){
        this.trigger(appData);
    },
    fillArray(ary, n){
        var res = [];
        for (var i = 0; i < ary.length; i++) {
            ary[i] = n;
            res.push(ary[i]);
        }
        return res;
    },
    onChange(type){
        let rigOne = document.getElementById("rigOne");
        let rigTwo = document.getElementById("rigTwo");
        let rigThree = document.getElementById("rigThree");
        //let canvasRight = document.getElementById("canRight");
        //let canvasLeft = document.getElementById("canLeft");

        switch (type) {
            case 'week':
                appData.weekChart = 1;
                appData.yearChart = 2;
                appData.monthChart = 2;
                appData.montChart = 2;
                rigOne.className = "rigo";
                rigTwo.className = "rigt";
                rigThree.className = "rigt";
                //canvasRight.style.display = "none";
                //canvasLeft.style.display = "none";
                URL = this.getURL(1);
                break;
            case 'month':
                appData.weekChart = 2;
                appData.yearChart = 2;
                appData.monthChart = 1;
                appData.montChart = 2;
                rigOne.className = "rigt";
                rigTwo.className = "rigo";
                rigThree.className = "rigt";
                //canvasRight.style.display = "none";
                //canvasLeft.style.display = "none";
                URL = this.getURL(2);
                break;
            //case 'mont':
            //    appData.montChart = 1;
            //    appData.weekChart = 2;
            //    appData.yearChart = 2;
            //    appData.monthChart = 2;
            //    //canvasRight.style.display = "none";
            //    //canvasLeft.style.display = "block";
            //    URL=this.getURL(3);
            //    break;
            case 'year':
                appData.weekChart = 2;
                appData.yearChart = 1;
                appData.monthChart = 2;
                appData.montChart = 2;
                rigOne.className = "rigt";
                rigTwo.className = "rigt";
                rigThree.className = "rigo";
                //canvasRight.style.display = "block";
                //canvasLeft.style.display = "none";
                URL = this.getURL(3);
                break;
        }
        this.trigger(appData);
    },
    changeData(type, length, data){
        var seriesData = new Array(length), waterYield = 0;
        this.fillArray(seriesData, 0);
        for (var i = 0; i < data.length; i++) {
            waterYield = data[i].waterYield >= 0 ? data[i].waterYield : 0;
            if (type == 'mont') {
                if (Number(data[i].waterDateText) > 6) {
                    seriesData[Number(data[i].waterDateText) - 7] = waterYield;
                }
            } else if (type == 'day') {
                if (Number(data[i].waterDateText) <= 7) {
                    seriesData[Number(data[i].waterDateText) - 1] = waterYield;
                }
            } else {
                if (Number(data[i].waterDateText) <= 6) {
                    seriesData[Number(data[i].waterDateText) - 1] = waterYield;
                }
            }
        }
        return seriesData;
    },
    getURL(type){
        return DOMIN + "/v1/app/clife/exten/water/getWaterList?&appId=10130&deviceId=" + getQueryString("deviceId") + "&mac=" + getQueryString("mac") + "&date=" + this.getDate() + "&type=" + type;
        //mac="+ getQueryString("mac")+"
    },
    format(d){
        return d >= 10 ? d : ("0" + d);
    },
    getDate(){
        var now = new Date(),
            year = now.getFullYear(),
            month = this.format(now.getMonth() + 1),
            date = this.format(now.getDate()),
            dayStr = year + "-" + month + "-" + date;
        return dayStr;
    },
    getData(type, xData){
        let _this = this;
        let cover = document.getElementById("cover");
        let loading = document.getElementById("loading");
        let warning = document.getElementById("warning");
        warning.style.display = "none";
        loading.style.display = "block";
        URL = URL == '' ? DOMIN + "/v1/app/clife/exten/water/getWaterList?appId=10130&deviceId=" + getQueryString("deviceId") + "&mac=" + getQueryString("mac") + "&date=" + this.getDate() + "&type=1" : URL;
        $.ajax({
            url: URL,
            //url:"../static/data/data2.json",
            dataType: 'json',
            cache: true,
            success: function (data) {
                //console.log(data);
                appData.chartData.xAxis.data = xData;
                appData.chartData.series[0].data = _this.changeData(type, xData.length, data.data.ExtenWater);
                appData.macFilter = data.data.macFilter;
                cover.style.display = "none";
                //console.log(appData, data);
                _this.trigger(appData);
            }.bind(this),
            error: function (xhr, status, err) {
                loading.style.display = "none";
                warning.style.display = "block";
                console.log(data, 'fail mes')
                //het.toast("图表请求数据失败啦!");
            }.bind(this)
        });
    },
    onGetWeekLogData(){
        let xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        this.getData('day', xData);
    },
    onGetMonthLogData(){
        let xData = ["第一周", "第二周", "第三周", "第四周", "第五周"];
        this.getData('week', xData);
    },
    onGetYearLogData(){
        let xData = ["第一季度", "第二季度", "第三季度", "第四季度"];
        this.getData('month', xData);
    },
    //onGetMoreMonthLogData(){
    //    let xData=["7月","8月","9月","10月","11月","12月"];
    //    this.getData('mont',xData);
    //}
    onGetTypeData(data){
        let _this = this, length, type;
        URL = "/v1/app/clife/exten/water/getWaterList";
        //?appId=10130&deviceId=" + getQueryString("deviceId") +"&mac=" + getQueryString("mac") + "&date=" + this.getDate() + "&type=" + data
        //安卓用的post发送请求  ios未用二代框架  挖坑时间：2016-09-21，祝好运。.
        //URL = URL == '' ? DOMIN + "/v1/app/clife/exten/water/getWaterList?appId=10130&deviceId=" + getQueryString("deviceId") + "&mac=" + getQueryString("mac") + "&date=" + this.getDate() + "&type=" + data : URL;
        options.appId = 10130,
            options.deviceId = getQueryString("deviceId"),
            options.mac = getQueryString("mac"),
            options.date = this.getDate(),
            options.type = data;
        if (data == '2') {
            length = 5;
        } else {
            length = data == '1' ? 7 : 4;
        }
        type = data;
        het.post(URL, options, function (data) {
            //console.log(data);
            data = JSON.parse(data).data.ExtenWater;
            console.log(data.length);
            function fillArray(ary, n) {
                var res = [];
                for (var i = 0; i < ary.length; i++) {
                    ary[i] = n;
                    res.push(ary[i]);
                }
                return res;
            }

            function changeData(type, length, data) {
                var seriesData = new Array(length), waterYield = 0;
                _this.fillArray(seriesData, 0);
                for (var i = 0; i < data.length; i++) {
                    waterYield = data[i].waterYield >= 0 ? data[i].waterYield : 0;
                    if (type == '4') {
                        if (Number(data[i].waterDateText) > 6) {
                            seriesData[Number(data[i].waterDateText) - 7] = waterYield;
                        }
                    } else if (type == '1') {
                        if (Number(data[i].waterDateText) <= 7) {
                            seriesData[Number(data[i].waterDateText) - 1] = waterYield;
                        }
                    } else {
                        if (Number(data[i].waterDateText) <= 6) {
                            seriesData[Number(data[i].waterDateText) - 1] = waterYield;
                        }
                    }
                }
                return seriesData;
            }

            data.data = changeData(type, length, data);
            _this.trigger(data);
            //console.log(data);
        }, function (data) {
            console.log(data, 'fail mes')
        })

        //To ios
        //het.get(URL, {}, function (data) {
        //    //console.log(data);
        //    data = JSON.parse(data).data.ExtenWater;
        //    console.log(data.length);
        //    //if (type == '2') {
        //    //    length = data.length == 4 ? 4 : 5;
        //    //    console.log('five weeks')
        //    //}
        //    function fillArray(ary, n) {
        //        var res = [];
        //        for (var i = 0; i < ary.length; i++) {
        //            ary[i] = n;
        //            res.push(ary[i]);
        //        }
        //        return res;
        //    }
        //
        //    function changeData(type, length, data) {
        //        var seriesData = new Array(length), waterYield = 0;
        //        _this.fillArray(seriesData, 0);
        //        for (var i = 0; i < data.length; i++) {
        //            waterYield = data[i].waterYield >= 0 ? data[i].waterYield : 0;
        //            if (type == '4') {
        //                if (Number(data[i].waterDateText) > 6) {
        //                    seriesData[Number(data[i].waterDateText) - 7] = waterYield;
        //                }
        //            } else if (type == '1') {
        //                if (Number(data[i].waterDateText) <= 7) {
        //                    seriesData[Number(data[i].waterDateText) - 1] = waterYield;
        //                }
        //            } else {
        //                if (Number(data[i].waterDateText) <= 6) {
        //                    seriesData[Number(data[i].waterDateText) - 1] = waterYield;
        //                }
        //            }
        //        }
        //        return seriesData;
        //    }
        //
        //    data.data = changeData(type, length, data);
        //    _this.trigger(data);
        //    //console.log(data);
        //}, function (data) {
        //    console.log(data, 'fail mes')
        //})
    }
});
//URL = getQueryString("host")