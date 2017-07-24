'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 * param  connect  0 失败，1 连接中，2连接成功,开始同步，3同步成功
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {frontAjax,reduceKey,isEmptyObject,arrayMax,arrayMin,arrayAvg } from './LocalFuns.jsx';

const docker = {
    appId:        '10121',
    appType:     !!(navigator.userAgent.indexOf('Android')+1) ? 1:2,
    appSecret:    '33c9f8898fbd409a9fe110d8f25cc764',
    accessToken:  '4680ac7d2e2f4679b60ae06b001eb6e1',
    host:        'https://200.200.200.50' || 'https://api.clife.cn' || 'https://test.api.clife.cn' ,
    locker: true,
    clearLocker: true,
    iSwitch: true,
    timer: null,
    cacheArr: [],
    isProxy: true//是否由app代理接口请求,PC调试改为false拿token后可以请求到数据
};
let appData = {
    showClndr: false
};
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data, type){
        if(data.heartrate!=undefined) {
            docker.cacheArr.push(data.heartrate);
            if(docker.cacheArr.length==60){

                //.log('开始计算');心率平均值计算
                appData.heartratemin=arrayMin(docker.cacheArr);
                appData.heartratemax=arrayMax(docker.cacheArr);
                appData.heartrateavg=parseInt(arrayAvg(docker.cacheArr));
                docker.cacheArr=[];
            }
        }
        Funs._extends(appData,data);
        if(data.networkavailable!=undefined ) appData.networkavailable = data.networkavailable;
        this.trigger(appData);
    },
    onLocal(data){
        this.trigger(appData);
    },
    onGetHistoryData(data) {
        //console.log('history request params',data);
        let self = this,
            url =  '/v1/app/chealth/smartBracelet/getBraceletByDate',
            params = {
                accessToken: docker.accessToken,
                appId: 10121,
                timestamp: +new Date().getTime(),
                date: data.date || '2017-03-01',
            },
            suc =(xhr)=> {
                typeof xhr === 'string' && (xhr=JSON.parse(xhr));
                //模拟数据
                // xhr.data= {
                //     "movement": {
                //         "calories": 3.6,//消耗的卡路里（单位：千卡）
                //         "stepCount": 2000,//所走步数（单位：步）
                //         "kilometer": 0.8,//所走公里数（单位：kl）
                //     },
                //     "sleep":{
                //         "deepSleep": "03时05分", //深睡时间
                //         "shallowSleep": "02时05分", //浅睡时间
                //         "sleepQuality": "不好",//睡眠质量
                //     }
                // };
                if(xhr.code == 0 && xhr.data){
                    let res = xhr.data;
                    //真实数据
                    if(!isEmptyObject(res)){
                        //het.toast('ok');
                        let renderData = {
                            viewDate: data.date,
                            calories: res.movement.calories,
                            stepCount: res.movement.stepCount,
                            kilometer: res.movement.kilometer,
                            deepSleep: res.sleep ? res.sleep.deepSleep : '',
                            shallowSleep:  res.sleep ? res.sleep.shallowSleep :'',
                            sleepQuality: res.sleep ? res.sleep.sleepQuality:'',
                            showClndr: data.showClndr
                        };
                        Funs._extends(appData,renderData);
                        self.trigger(renderData);
                    }else{
                        let renderData = {
                            viewDate: data.date,
                            showClndr:  data.showClndr
                        };
                        Funs._extends(appData,renderData);
                        self.trigger(renderData);
                    }
                }
            },
            err =(err)=>{

            };

        if(docker.isProxy){
            //App proxy ajax
            reduceKey(['accessToken','appId','timestamp'],params);
            het.post(url,params,suc,err);
        }else{
            //自测试请求
            frontAjax(url, params, suc, err);
        }
    },
    onGetValidDate(data,dateObj){
        //console.log('valid dates param',data,dateObj);
        let self = this,
            url = '/v1/app/chealth/smartBracelet/getBraceletDate',
            params = {
                accessToken:docker.accessToken,
                appId: docker.appId,
                timestamp: +new Date().getTime(),
                beginDate: data.beginDate ||'2017-03-01',
                endDate: data.endDate || '2017-03-22',
                type: 0,
            },
            suc = (xhr)=>{
                //console.log(xhr);
                typeof xhr === 'string' && (xhr=JSON.parse(xhr));
                //console.log(typeof xhr,xhr);

                //console.log('-------日历数据---------',xhr);
                //模拟数据
                xhr.data= xhr.data || [
                    {
                        "date": "2016-04-12"
                    },
                    {
                        "date": "2016-04-14"
                    },
                    {
                        "date": "2016-04-16"
                    },
                    {
                        "date": "2016-04-19"
                    }
                ];
                if(xhr.code == 0 && xhr.data.length>0){

                    //真实数据
                    let validDates = [];
                    xhr.data.map((o)=>{
                        validDates.push(Number(o.date.substring(8,10)));
                    });

                    //重绘日历，日期对象函数返回方法tag(),在日历插件里
                    if(dateObj) dateObj.tag(validDates);

                    //缓存第一次请求月所有可用日期数组，用作每次日历打开时候渲染
                    if(docker.iSwitch /*&& month!='undefined' && month == (new Date().getMonth()+1)*/){
                        docker.iSwitch = false;
                        appData.firstValidDates = validDates;
                        self.trigger({firstValidDates:validDates});
                    }
                    appData.validDates = validDates;
                    self.trigger({ validDates: validDates });

                    //console.log(validDates,'---');
                }else{
                    //有数据的日期数组
                    let validDates = [];
                    if(dateObj) dateObj.tag(validDates);
                }
            },
            err = (xhr)=>{
                console.log(xhr,'err');
            };

        if(docker.isProxy){
            //App proxy ajax
            reduceKey(['accessToken','appId','timestamp'],params);
            het.post(url,params,suc,err);
        }else{
            //自测试请求
            frontAjax(url, params, suc, err);
        }
    },
    onReqHistory(data){
        //console.log('history data request params',data);
        let self = this,
            url = '/v1/app/chealth/smartBracelet/'+ (data.type === 'sport' ? 'getMovementByDate': 'getSleepByDate'),
            params = {
                accessToken: docker.accessToken,
                appId: 10121,
                timestamp: +new Date().getTime(),
                beginDate: data.beginDate,
                endDate: data.endDate,
            },
            suc =(xhr)=> {
                typeof xhr === 'string' && (xhr=JSON.parse(xhr));
                //模拟数据

                // xhr = xhr || {
                //     code:0,
                //     data:
                //     {
                //
                //         //by weekly
                //         "caloriesList": [
                //             {
                //                 "dateTime": "2017-04-02",
                //                 "calories": 0
                //             },
                //             {
                //                 "dateTime": "2017-04-03",
                //                 "calories": 0
                //             },
                //             {
                //                 "dateTime": "2017-04-04",
                //                 "calories": 0
                //             },
                //             {
                //                 "dateTime": "2017-04-05",
                //                 "calories": 37.2
                //             },
                //             {
                //                 "dateTime": "2017-04-06",
                //                 "calories": 26
                //             },
                //             {
                //                 "dateTime": "2017-04-07",
                //                 "calories": 2.4
                //             }
                //         ],
                //         "stepList": [
                //             {
                //                 "stepCount": 0,
                //                 "dateTime": "2017-04-02"
                //             },
                //             {
                //                 "stepCount": 0,
                //                 "dateTime": "2017-04-03"
                //             },
                //             {
                //                 "stepCount": 0,
                //                 "dateTime": "2017-04-04"
                //             },
                //             {
                //                 "stepCount": 810,
                //                 "dateTime": "2017-04-05"
                //             },
                //             {
                //                 "stepCount": 567,
                //                 "dateTime": "2017-04-06"
                //             },
                //             {
                //                 "stepCount": 52,
                //                 "dateTime": "2017-04-07"
                //             }
                //         ]
                //         //by daily
                //         // "movement": {
                //         //     "calories": 3.6,//消耗的卡路里（单位：千卡）
                //         //     "stepCount": 1800,//所走步数（单位：步）
                //         //     "kilometer": 0.8,//所走公里数（单位：kl）
                //         // },
                //     }
                // };

                if(xhr.code == 0 && xhr.data && data.type==='sleep'){
                    let res = xhr.data;
                    //真实数据
                    if(!isEmptyObject(res)){
                        //alert('数据不为空')
                        const result = {
                            isEmpty: false,
                            timestamp:+new Date().getTime(),
                        };

                        if(res.list) result.list  = res.list;
                        if(res.sleep) result.sleep = res.sleep;

                        // if(res.sleep){
                        //     if(res.sleep.deepSleep)
                        // };

                        Funs._extends(appData,result);
                        self.trigger(result);
                        //console.log('sleep history data-------',xhr);
                    }else{
                        //console.log('数据为空');
                        const result = { isEmpty: true, timestamp:+new Date().getTime(), };
                        result.list  = [];
                        result.sleep = {};
                        Funs._extends(appData,result);
                        self.trigger(result);
                    }
                }
                //运动历史数据逻辑，有时间放到view里处理，解耦
                if(xhr.code == 0 && xhr.data && data.type==='sport'){
                    let res = xhr.data;
                    //真实数据
                    if(!isEmptyObject(res)){
                        //alert('数据不为空')
                        const result = {
                            isEmpty: false,
                            timestamp:+new Date().getTime(),
                        };
                        if(res.movement){
                            //result.viewDate=data.date,
                            //result.showClndr=false,
                            result.calories  = res.movement.calories;
                            result.stepCount = res.movement.stepCount;
                            result.kilometer = res.movement.kilometer;
                        }

                        //虚拟数据
                        // res.caloriesList  =   [
                        //     {
                        //         "dateTime": "2017-04-09",
                        //         "calories": 0
                        //     },
                        //     {
                        //         "dateTime": "2017-04-10",
                        //         "calories": 162
                        //     },
                        //     {
                        //         "dateTime": "2017-04-11",
                        //         "calories": 54.2
                        //     },
                        //     {
                        //         "dateTime": "2017-04-12",
                        //         "calories": 153.3
                        //     },
                        //     {
                        //         "dateTime": "2017-04-13",
                        //         "calories": 201
                        //     }
                        // ];
                        // res.stepList = [
                        //     {
                        //         "stepCount": 0,
                        //         "dateTime": "2017-04-09"
                        //     },
                        //     {
                        //         "stepCount": 1679,
                        //         "dateTime": "2017-04-10"
                        //     },
                        //     {
                        //         "stepCount": 1719,
                        //         "dateTime": "2017-04-11"
                        //     },
                        //     {
                        //         "stepCount": 4865,
                        //         "dateTime": "2017-04-12"
                        //     },
                        //     {
                        //         "stepCount": 11100,
                        //         "dateTime": "2017-04-13"
                        //     }
                        // ];

                        if(res.stepList) result.stepList = res.stepList;
                        if(res.caloriesList) result.caloriesList = res.caloriesList;
                        //是否有必要缓存起来
                        Funs._extends(appData,result);
                        self.trigger(result);
                        //console.log(result,'resultresultresultresultresult');
                    }else{
                        //console.log('数据为空');
                        const result = { isEmpty: true, timestamp:+new Date().getTime(), };
                        result.calories  = '--';
                        result.stepCount = '--';
                        result.kilometer = '--';
                        result.stepList = [];
                        result.caloriesList = [];
                        Funs._extends(appData,result);
                        self.trigger(result);
                    }
                }
            },
            err =(err)=>{
                typeof xhr === 'string' && (err=JSON.parse(err));
                const result = { isEmpty: true,timestamp:+new Date().getTime() };
                Funs._extends(appData,result);
                self.trigger(result);
            };

        if(docker.isProxy){
            //App proxy ajax
            reduceKey(['accessToken','appId','timestamp'],params);
            het.post(url,params,suc,err);
        }else{
            //自测试请求
            frontAjax(url, params, suc, err);
        }
    },
    onGetHeart(data){
        appData.measurestatus = data.measurestatus;
        this.trigger({ measurestatus: data.measurestatus });
    },
    onShowCalendar(data){
        appData.showClndr = data.showClndr;
        this.trigger({showClndr:data.showClndr});
    },
});