'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 *
 * @measureStatus 0:请选择 1:初始化 2:请贴近 3:正在测试中 4:测试成功 5:测试失败，请重新测试 6:初始化失败 7:请求‘所谓的’测试结果成功 8:请求汇总结果失败 9:offline
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
const MeasureStatusDescription = {
    0:'请选择一个部位',
    1:'设备初始化中',                        //点击，请求清零接口（set）
    2:'请将设备贴近额头',                     //清零成功（set），请求水油弹数据（get）接口
    3:'正在测试额头...',                     //轮询水油弹(get)21次
    4:'测试成功',                            //获取水油弹成功
    5:'测试失败，请重新测试',                 //获取水油弹失败（轮询21次也未取到数据，或者接口请求失败，回到未选择状态）
    6:'初始化失败',                          //清零失败（set）
    7:'五点测试完成，请求所谓的测试结果成功',   //五点结果接口请求成功
    8:'五点测试完成，请求所谓的测试结果失败',
    9:'五点测试完成，还未请求测试结果接口',
    10:'设备不在线'
}
const AppData = {
    measureDataArray : [
        {
            part: 0,
            name: '额头',
            water: 0,
            oil: 0,
            elasticity: 0,
            isMeasured: false
        },
        {
            part: 1,
            name: '右脸',
            water: 0,
            oil: 0,
            elasticity: 0,
            isMeasured: false
        },
        {
            part: 2,
            name: '鼻子',
            water: 0,
            oil: 0,
            elasticity: 0,
            isMeasured: false
        },
        {
            part: 3,
            name: '下巴',
            water: 0,
            oil: 0,
            elasticity: 0,
            isMeasured: false
        },
        {
            part: 4,
            name: '左脸',
            water: 0,
            oil: 0,
            elasticity: 0,
            isMeasured: false
        }
    ]
};
const docker = {
    //华为         accessToken是一个异步的接口请求
    appId:        '30590',
    appType:     !!(navigator.userAgent.indexOf('Android')+1) ? 1:2,
    appSecret:    '98889238ed6e441aaf9b0691b017695f' ,
    cityCode:   '101010100',
    deviceId:    het.getDeviceId(),
    host:        het.getHost() ||  'https://test.api.clife.cn' || 'https://200.200.200.50',
    progress: 0,
    locker: true,
    clearLocker:true,
    resetStatus:(json)=>{
        json = json || {};
        if(json.measureStatus !== undefined ) AppData.measureStatus = json.measureStatus || 0;
        if(json.selectPart !== undefined ) AppData.selectPart = json.selectPart || 0;
        if(json.online !== undefined ) AppData.selectPart = json.selectPart || 1;
        if(json.progress !== undefined ) AppData.progress = json.progress;
        return json;
    },
    dataTimer:  null,
    step0Timer: null,
    step1Timer: null,
    step2Timer: null,
    step3Timer: null,
    step4Timer: null,
    step5Timer: null,
    step6Timer: null,
    iSwitch: true
}
let measureRec = [
    {
        part: 11,
        water:0,
        oil:0,
        elasticity: 0,
        skinType:1,
        skinSubType:1,
        skinAgeType:1,
        skinMeterId:docker.deviceId,
    },
    {
        part: 15,
        water:0,
        oil:0,
        elasticity: 0,
        skinType:1,
        skinSubType:1,
        skinAgeType:1,
        skinMeterId:docker.deviceId,
        measureTime:"2017-01-01 00:00:00"//每次的测量时间
    },
    {
        part: 12,
        water:0,
        oil:0,
        elasticity: 0,
        skinType:1,
        skinSubType:1,
        skinAgeType:1,
        skinMeterId:docker.deviceId,
        measureTime:"2017-01-01 00:00:00"//每次的测量时间
    },
    {
        part: 14,
        water:0,
        oil:0,
        elasticity: 0,
        skinType:1,
        skinSubType:1,
        skinAgeType:1,
        skinMeterId:docker.deviceId,
        measureTime:"2017-01-01 00:00:00"//每次的测量时间
    },
    {
        part: 13,
        water:0,
        oil:0,
        elasticity: 0,
        skinType:1,
        skinSubType:1,
        skinAgeType:1,
        skinMeterId:docker.deviceId,
        measureTime:"2017-01-01 00:00:00"//每次的测量时间
    },
]

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(){
        // 本地测试五个部位，注释掉华为hw_plugin_public可见
        // AppData.measureDataArray[1].isMeasured  = true;
        // AppData.measureDataArray[2].isMeasured  = true;
        // AppData.measureDataArray[3].isMeasured  = true;
        // AppData.measureDataArray[4].isMeasured  = true;
        // AppData.measureDataArray[0].isMeasured  = true;
        this.onDeviceInfo();
        this.trigger(AppData);
    },
    onSetting(data){
        clearInterval(docker.dataTimer);
        clearTimeout(docker.step0Timer);
        clearTimeout(docker.step3Timer);
        let self = this;
        let url = docker.host+'/v1/app/chairdressing/elasticskinmeter/config/set';
        let sendData = {
                updateFlag : 0,
                //后台顺序 : 11-额头 15-右脸 12-鼻子 14-下巴 13-左脸
                //前端顺序 : 0-额头  1-右脸  2-鼻子  3-下巴  4-左脸
                part: [11,15,12,14,13][data.selectPart]
            };

            //全局变量层层依赖，监听机制
            AppData.selectPart = data.selectPart;
            AppData.isMeasuring = true;
            AppData.measureStatus = 1;
            AppData.measureTime = data.measureTime;

            het.post(url, sendData,
                (xhr)=>{
                    xhr = JSON.parse(xhr);
                    if(xhr.code == 0) {
                        //设备滴一声，并不是清零成功（所以是设备还在初始化中），开始请求水油弹运行数据，呵呵哒，此刻，用户一定是懵逼的
                        docker.clearLocker = true;//设备响应,开启接收数据
                        docker.locker = true;

                        self.onGetting({
                            part: sendData.part,
                            selectPart: data.selectPart,
                            optTimestamp: xhr.data.optTimestamp,
                            measureTime: sendData.measureTime
                        });
                    }else{
                        clearTimeout(docker.step0Timer);
                        //展示4秒初始化失败文案
                        docker.resetStatus({ selectPart: null, measureStatus: 6 });
                        self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
                        //4秒展示完成，跳转到请选择一个部位
                        docker.step0Timer = setTimeout(function () {
                            docker.resetStatus({ selectPart: null, measureStatus: 0 });
                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
                        }, 4000);
                    }
                },
                (xhr)=>{

                    clearTimeout(docker.step0Timer);
                    //展示4秒初始化失败文案
                    docker.resetStatus({ selectPart: null, measureStatus: 6 });
                    self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
                    //4秒展示完成，跳转到请选择一个部位
                    docker.step0Timer = setTimeout(function () {
                        docker.resetStatus({ selectPart: null, measureStatus: 0 });
                        self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
                    }, 4000);
                }
            );
    },
    onGetting(data){

        clearInterval(docker.dataTimer);
        clearTimeout(docker.step3Timer);
        clearTimeout(docker.step4Timer);

        let self = this,
            url =  docker.host+'/v1/app/chairdressing/elasticskinmeter/data/get',
            params = {
                appType: docker.appType,
                part: data.part,
                optTimestamp: data.optTimestamp,
            },
            selectPart = data.selectPart,
            measureTime = data.measureTime;
        let lxNumber=0;
        let lxGetting = function(){
            het.get(url,params,
                (res)=>{
                    res = JSON.parse(res);
                    if(res.code==0) {
                        //电量轮询汇总返回就好，不用即刻返回
                        AppData.battery = res.data.electricity;
                        //轮询21次
                        lxNumber++;
                        if (lxNumber == 20) {
                            clearInterval(docker.dataTimer);
                            clearTimeout(docker.step3Timer);
                            clearTimeout(docker.step5Timer);
                            if (AppData.measureStatus == 1) {
                                //提示初始化失败3秒，然后跳转到位选择状态
                                docker.resetStatus({ selectPart: null, measureStatus: 6 });
                                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
                            } else {
                                //提示测试失败3秒，然后跳转到位选择状态
                                docker.resetStatus({ selectPart: null, measureStatus: 5 });
                                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 5 }));
                            }
                            //跳转到请选择一个部位
                            docker.step5Timer = setTimeout(function () {
                                docker.resetStatus({ selectPart: null, measureStatus: 0 });
                                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
                            }, 3000);
                            return false;
                        }
                        //清零成功
                        if (res.data.cleanStatus == 0 && docker.clearLocker) {
                            clearTimeout(docker.step3Timer);
                            docker.clearLocker = false;
                            //清零成功，提示请将设备贴近测试部位，3秒后跳转到测试中动画
                            docker.resetStatus({ measureStatus: 2 });
                            self.trigger(docker.resetStatus({ measureStatus: 2 }));

                            //进入测试中动画
                            docker.step3Timer = setTimeout(function () {
                                docker.resetStatus({ measureStatus: 3 }), self.trigger(docker.resetStatus({ measureStatus: 3 }));
                            }, 3000);
                        }
                        //设备响应，清零成功，有测试并上传测试数据到服务器
                        if (res.data.testStatus == 0 && res.data.cleanStatus == 0 && res.data.water !== null && res.data.oil !== null && res.data.elasticity !== null && docker.locker) {
                            docker.locker = false;//接收到一条数据后立即，停止接收数据，防止设备重复发送数据过来
                            docker.progress++;//接收到一条数据保存一个进度，知道进度等于5，测试完成
                            // clearInterval(docker.dataTimer);
                            //将获取到的水油弹数据缓存起来
                            AppData.measureDataArray[selectPart].isMeasured = true;
                            AppData.measureDataArray[selectPart].water = res.data.water;
                            AppData.measureDataArray[selectPart].oil = res.data.oil;
                            AppData.measureDataArray[selectPart].elasticity = res.data.elasticity;

                            //请求所谓的测试结果接口的参数对象
                            measureRec[selectPart].water = res.data.water;
                            measureRec[selectPart].oil = res.data.oil;
                            measureRec[selectPart].elasticity = res.data.elasticity;
                            measureRec[selectPart].measureTime = measureTime;

                            //开启计数器，每成功一次记录一次，五次之后请求汇总结果接口
                            //het.toast(docker.progress);

                            if (docker.progress == 5) {
                                //het.toast(docker.progress+'点测试全部完成');
                                //五点测试完成，请求所谓的测试结果还有一点点间隔，这个时候的状态提示文案也需要处理
                                docker.resetStatus({ selectPart: null, measureStatus: 9 });
                                self.trigger(docker.resetStatus({
                                    selectPart: null, measureStatus: 9, measureDataArray: AppData.measureDataArray
                                }));
                                self.onMeasureResult();
                                clearInterval(docker.dataTimer);
                                return false;
                            }
                            if (docker.progress < 5) {
                                clearTimeout(docker.step4Timer);
                                //拉取到水油弹数据，提示测试成功,三秒后跳转到默认状态
                                docker.resetStatus({ selectPart: null, measureStatus: 4 });
                                self.trigger(docker.resetStatus({
                                    selectPart: null, measureStatus: 4,
                                    measureDataArray: AppData.measureDataArray
                                }));
                                //
                                docker.step4Timer = setTimeout(function () {
                                    docker.resetStatus({ selectPart: null, measureStatus: 0 });
                                    self.trigger(docker.resetStatus({
                                        selectPart: null, measureStatus: 0, measureDataArray: AppData.measureDataArray
                                    }));
                                }, 3000);
                            }
                            clearInterval(docker.dataTimer);
                        }
                        //测试出错
                        if (res.data.testFailDescrip) {
                            //提示测试失败3秒，然后跳转到位选择状态
                            docker.resetStatus({ selectPart: null, measureStatus: 5 });
                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 5 }));
                            //
                            clearTimeout(docker.step5Timer);
                            docker.step5Timer = setTimeout(function () {
                                docker.resetStatus({ selectPart: null, measureStatus: 0 });
                                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
                            }, 3000);

                            clearInterval(docker.dataTimer);
                            return;
                        }

                    }
                },
                (res)=>{
                    //het.toast('请检查网络或设备在线情况');
                }
            )
        };
        lxGetting();
        docker.dataTimer = setInterval(lxGetting,2000);
    },
    onMeasureResult(){
        let self = this;
        let url = docker.host+ '/v1/app/chairdressing/skinMeasure/uploadSkinTestResult';

        het.getToken(
            //成功回调
            (xhr)=>{
                let accessToken = xhr;
                //字符串拼接的时候一定要细心，一错全错
                let sendObj = 'skinType5='+1
                    +'&skinAgeType='+ 1
                    +'&avgOil='+ 1
                    +'&avgWater='+ 1
                    +'&avgElasticity='+1

                    +"&location="+docker.cityCode
                    +'&measureTime='+ Funs.dateFormat(new Date())
                    +"&appId=" +docker.appId
                    +"&accessToken="+ accessToken
                    +'&timestamp='+ (+new Date())

                    +'&measureRec='+ JSON.stringify(measureRec);

                //console.log('sendObj--------------',sendObj);
                let sucCallback = function (xhr) {
                    xhr = JSON.parse(xhr);
                    xhr.code === 0 && Funs._extends(AppData,xhr.data);
                    if(xhr.code === 0){
                        //het.toast('上传成功');
                        docker.resetStatus({selectPart:null,measureStatus:7});
                        self.trigger(docker.resetStatus({selectPart:null,measureStatus:7}))
                    }else{
                        //上传成功，但是参数错误等原因导致返回结果不正确，也是上传失败
                        //het.toast('上传失败，请重新上传');
                        docker.resetStatus({selectPart:null,measureStatus:8});
                        self.trigger(docker.resetStatus({selectPart:null,measureStatus:8}))
                    }
                }
                let errCallback = function (xhr) {
                    //token错误，域名或服务器错误，网络延迟等导致的上传失败
                    //het.toast('请检查网络或设备在线情况');
                    docker.resetStatus({selectPart:null,measureStatus:8});
                    self.trigger(docker.resetStatus({selectPart:null,measureStatus:8}))
                }
                het.post(url,sendObj,sucCallback,errCallback,1);
            },
            //失败回调
            (xhr)=>{
                //token错误，域名或服务器错误，网络延迟等导致的上传失败
                //het.toast('请检查网络或设备在线情况');
                docker.resetStatus({selectPart:null,measureStatus:8});
                self.trigger(docker.resetStatus({selectPart:null,measureStatus:8}))
            }
        );
    },
    onReMeasure(){
        AppData.measureDataArray.map(function(item,index) {
            item.water = 0;
            item.oil = 0;
            item.elasticity = 0;
            item.isMeasured = false;
        });
        docker.progress = 0;
        docker.resetStatus({selectPart:null,measureStatus:0});
        self.trigger(docker.resetStatus({selectPart:null,measureStatus:0,measureDataArray:AppData.measureDataArray}));
    },
    onDeviceInfo(){
        let self = this;
        let tokenSuc = (data)=>{
            let accessToken = data;
            //获取设备基础信息，仅网络字段onlineStatus有用,~_~
            let url = docker.host + '/v1/device/getDeviceInfo';
            url += '?accessToken='+accessToken
                +'&appId='+docker.appId
                +'&appType='+ docker.appType
                +'&deviceId='+docker.deviceId
                +'&timestamp='+(+new Date());
            let scb = (xhr)=>{
                xhr = JSON.parse(xhr)
                if(xhr.code==0){
                    AppData.onlineStatus = xhr.data.onlineStatus;
                }else{
                    AppData.onlineStatus = 2;
                    AppData.measureStatus = 0;
                    AppData.selectPart = null;
                    AppData.isMeasuring = false;
                    self.trigger({selectPart: null, measureStatus: 0,isMeasuring: false})
                }
            };
            let ecb = (xhr)=>{
                //接口调用失败，则返回离线状态
                //het.toast('请检查网络或设备在线情况');
                AppData.onlineStatus = 2;
                AppData.measureStatus = 0;
                AppData.selectPart = null;
                AppData.isMeasuring = false;
                self.trigger({selectPart: null, measureStatus: 0,isMeasuring: false})
            };
            het.get(url,'',scb,ecb,1)
        }
        let tokenErr = (data)=>{
            //tokenErr也返回离线状态
            //het.toast('请检查网络或设备在线情况');
            AppData.onlineStatus = 2;
            AppData.measureStatus = 0;
            AppData.selectPart = null;
            AppData.isMeasuring = false;
            self.trigger({selectPart: null, measureStatus: 0,isMeasuring: false})
        }
        het.getToken(tokenSuc,tokenErr);
    },
    onLocation(){
        //获取位置信息，非必须，因为有默认值
        let url = docker.host+'/v1/web/env/location/get?city=ip';
        let scb = (xhr)=>{
            xhr = JSON.parse(xhr);
            if(xhr.code == 0) docker.cityCode = xhr.data.cityCode;
            return
        };
        let ecb = ()=>{return};
        het.get(url,'',scb,ecb,1);
    },
    onGetHistoryData(data) {
        let me = this;
        let url = `${docker.host}/v1/app/chairdressing/skinMeasure/getHistorySkinDataByday`;
        het.get(url,
            (data?data:''),
            function(xhr) {
                let result = JSON.parse(xhr);
                //模拟数据
                // result.data=[
                //     {
                //         "skinMeasureId": 3320,
                //         "measureTime": "2016-11-01 18:18:13",
                //         "skinTypeDesc": "您的肤质为：干性肤质",
                //         "partMeasureVOs": [
                //             {
                //                 "partMeasureId": 22611,
                //                 "part": 14,
                //                 "water": 15.9,
                //                 "oil": 9.5,
                //                 "elasticity": 9.9,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22612,
                //                 "part": 15,
                //                 "water": 50,
                //                 "oil": 24.5,
                //                 "elasticity": 8.7,
                //                 "skinTypeName": "中性"
                //             },
                //             {
                //                 "partMeasureId": 22613,
                //                 "part": 11,
                //                 "water": 20,
                //                 "oil": 12,
                //                 "elasticity": 9.5,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22614,
                //                 "part": 13,
                //                 "water": 19.5,
                //                 "oil": 11.7,
                //                 "elasticity": 9.9,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22615,
                //                 "part": 12,
                //                 "water": 19.6,
                //                 "oil": 11.8,
                //                 "elasticity": 9.3,
                //                 "skinTypeName": "重度干燥"
                //             }
                //         ]
                //     },
                //     {
                //         "skinMeasureId": 3319,
                //         "measureTime": "2016-11-01 10:43:05",
                //         "skinTypeDesc": "您的肤质为：干性肤质.紧致",
                //         "partMeasureVOs": [
                //             {
                //                 "partMeasureId": 22603,
                //                 "part": 14,
                //                 "water": 21.1,
                //                 "oil": 12.1,
                //                 "elasticity": 6.2,
                //                 "skinTypeName": "缺油性偏干"
                //             },
                //             {
                //                 "partMeasureId": 22604,
                //                 "part": 15,
                //                 "water": 19.8,
                //                 "oil": 11.9,
                //                 "elasticity": 7.5,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22605,
                //                 "part": 11,
                //                 "water": 19.9,
                //                 "oil": 11.9,
                //                 "elasticity": 8.2,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22606,
                //                 "part": 13,
                //                 "water": 19.6,
                //                 "oil": 11.8,
                //                 "elasticity": 6.8,
                //                 "skinTypeName": "重度干燥"
                //             },
                //             {
                //                 "partMeasureId": 22607,
                //                 "part": 12,
                //                 "water": 19.2,
                //                 "oil": 11.5,
                //                 "elasticity": 6.3,
                //                 "skinTypeName": "重度干燥"
                //             }
                //         ]
                //     }
                // ];
                //真实数据
                if(result.data.length!=0){
                    me.trigger({history:result.data,showClndr:false});
                }else{
                    me.trigger({history:'',showClndr:false});
                }
            },
            function(response) {
                het.toast('请检查网络或设备在线情况');
            }
        );
    },
    onGetValidDate(data,dateObj,month) {
        //console.log('data',data,'dateObj',dateObj);
        let self = this,
            url = `${docker.host}/v1/app/chairdressing/skinMeasure/getAllSkinTestRecord`;
        het.get(url,
            (data?data:''),
            function(response) {
                const result = JSON.parse(response);
                if(result.code==0){
                    //模拟数据
                    // result.data=[
                    //     {
                    //         "times": "2",
                    //         "measureTime": "2016-11-01 10:18:13"
                    //     },
                    //     {
                    //         "times": "1",
                    //         "measureTime": "2016-11-02 01:03:17"
                    //     },
                    //     {
                    //         "times": "1",
                    //         "measureTime": "2016-11-10 08:00:20"
                    //     },
                    //     {
                    //         "times": "1",
                    //         "measureTime": "2016-11-15 07:06:44"
                    //     },
                    //     {
                    //         "times": "2",
                    //         "measureTime": "2016-11-16 11:05:29"
                    //     },
                    //     {
                    //         "times": "1",
                    //         "measureTime": "2016-11-17 12:07:07"
                    //     },
                    //     {
                    //         "times": "11",
                    //         "measureTime": "2016-11-18 02:40:30"
                    //     },
                    //     {
                    //         "times": "1",
                    //         "measureTime": "2016-11-22 05:27:08"
                    //     }
                    // ];
                    //真实数据
                    let tagArr = [];
                    if(result.data.length>-1) {
                        result.data.map((res)=>{
                            tagArr.push(Number(res.measureTime.substring(8,10)));
                        });
                    }

                    //重绘日历，日期对象函数返回方法tag();
                    if(dateObj){ dateObj.tag(tagArr) };

                    //缓存第一次请求月所有可用日期数组，用作每次日历打开时候渲染
                    if(docker.iSwitch /*&& month!='undefined' && month == (new Date().getMonth()+1)*/){
                        docker.iSwitch = false;
                        self.trigger({
                            firstTagDates:tagArr
                        });
                    }
                    //返回有测试数据的日期数组
                    self.trigger({
                        tagDates:tagArr,
                    });

                };

            },
            function(response) {
                het.toast('请检查网络或设备在线情况');
            }
        );
    },
});