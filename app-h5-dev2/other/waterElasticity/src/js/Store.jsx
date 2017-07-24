'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @Funs._extends(o1,o2) let o1 = {name:'hello'},o2={age:'998'};let o3 = Funs._extends(o1,o2); //o1 = { name:'hello',age:'998'},o2={age:'998'},o3==o1
 * @onGetToken 获取accessToken，所有接口请求都需要accessToken
 * @onMeasureStatus 没有测试进度状态值，本地维护请选择，初始化，测试中等测试动画进度
 * @onlineStatus 1在线，2不在线
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.jsx';
let Toast = require('../../../common/src/lib/Toast.jsx');
let iToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
const AppData = {};
const docker = {
    //华为
    appId:        '30590',//30590 华为 10101 和而泰
    appSecret:    '98889238ed6e441aaf9b0691b017695f' ,//988华为，afd 和而泰
    deviceId:     het.getDeviceId(),
    accessToken:  (()=>{
        let sucCallback = (result)=>{

        }
        let errCallback = (data)=>{
            return data
        }
        return het.getToken(sucCallback(),errCallback())
    })(),
    //和而泰本地
    //appId:        '10101',//30590 华为 10101 和而泰
    //appSecret:    'afd55f877bad4aaeab45fb4ca567d234' ,//988华为，afd 和而泰
    //deviceId:     '82625BED837FD474C60E6FC3F6FF13C4' || '5E39AD1E6EBAAC45E37D6AC243B49641', //'5E39AD1E6EBAAC45E37D6AC243B49641' 我的设备
    //accessToken:  '09f6c841e02240c889ecf44982cc748f',

    appType:     !!(navigator.userAgent.indexOf('Android')+1) ? 1:2,
    //请求主机
    host:        'https://200.200.200.50',
    //历史数据接口路由
    routerGetDay : '/v1/app/chairdressing/partMeasure/getByday',
    routerGetDays: '/v1/app/chairdressing/partMeasure/getBydays',
    //重构历史数据
    refactorArr: (data,key)=>{
        let arr = [];
        data.map((item,index)=>{
            arr[index] = item[key];
        });
        return arr;
    },
    timer: null,
    timerMeasure: null,
    cityCode: '101010100' || '101280601'
}
//const isOffline = ()=>{return (AppData.onlineStatus==2)}
//const isShutdown = ()=>{return (AppData.bootMode==16)}
//const isNetOff = ()=>{return (AppData.networkavailable==2)}

export const Store = Reflux.createStore({
    listenables: [Actions],

    onDeviceInfo(){
        let me = this;
        let tokenSub = (data)=>{
            alert('tokenSub'+data)
            let token = data;
            //获取设备基础信息，仅网络字段onlineStatus有用,,~_~
            let url = docker.host + '/v1/device/getDeviceInfo';
                url += '?accessToken='+token+'&appId='+docker.appId+'&appType='+ docker.appType+'&deviceId='+docker.deviceId+'&timestamp='+(+new Date());
            let scb = (xhr)=>{
                xhr = JSON.parse(xhr)
                if(xhr.code==0){
                    AppData.onlineStatus = xhr.data.onlineStatus;
                }else{
                    AppData.onlineStatus = 2;
                }
                //console.log('onDeviceInfo 200 >>>> onlineStatus',xhr,xhr.data.onlineStatus);
            }
            let ecb = (xhr)=>{
                AppData.onlineStatus = 2;
                iToast('基础信息请求失败~')
            }
            het.get(url,'',scb,ecb,1)
        }
        let tokenErr = (data)=>{
            alert('err'+data)
        }
        het.getToken(tokenSub,tokenErr);
    },
    onGetting(data){
        //获取运行数据
        //1、先获取设备是否在线
        //2、在线则表示设备可以测试
        //3、发送测试命令，若发送成功，再次请求运行数据接口，拿到测试的water,oil,elasticity值再去请求测试结果接口
        //4、返回成功，则显示测试结果页面
        let me = this;
        let url = docker.host+'/v1/device/data/get' || '/v1/app/chairdressing/elasticskinmeter/data/get';

        let sucCallback = function (xhr) {
            xhr = JSON.parse(xhr)
            //console.log('------------xhr-----------',xhr)
            if(xhr.code == 0){
                Funs._extends(AppData,xhr.data),iToast('请求成功')

                setTimeout(()=>{
                    //me.onMeasureResult();
                },2000)
            }else{
                if(xhr.code == 100022000)  AppData.onlineStatus = 2,iToast('设备不在线~~');
                if(xhr.code == 100022800)  iToast('命令发送失败')
                AppData.msg = '获取控制数据失败'
                //AppData.onlineStatus = 1;
                //AppData.code = xhr.code;AppData.msg = xhr.msg;
                iToast(AppData.msg);

               // me.onMeasureResult();
            }
        }
        let errCallback = (xhr)=> { console.log(xhr),iToast('onGetting请求失败') }
        //不需要APP拼接，自己拼接，get函数最后一个字段传1，就不用传入params对象了~
        url  +='?appId='+docker.appId
             +'&accessToken='+ docker.accessToken
             +'&timestamp='+ (+new Date())
             +'&deviceId='+ docker.deviceId
        het.get(url,'',sucCallback,errCallback,1);
        this.onDeviceInfo();
        this.onLocation();
    },
    onSetting(data){
        let me = this;
        let url = docker.host+'/v1/app/chairdressing/elasticskinmeter/config/set';
        let scb = (xhr)=>{
            xhr = JSON.parse(xhr);
            //console.log(xhr);
            if(xhr.code == 0) {
                me.onGetting();
                AppData.onlineStatus = 1,iToast('发送成功');

            }else{
                if(xhr.code == 100022000)  AppData.onlineStatus = 2,iToast('设备不在线~~');
                if(xhr.code == 100022800) iToast('命令发送失败')
                AppData.measureResult = true
            }
        }
        let ecb = ()=>{iToast('请求失败'),AppData.measureResult = false}
        //代理请求
        het.get(url,'',scb,ecb);

        //自己拼接
        let accessToken = docker.accessToken;
        let appId =  docker.appId;
        let deviceId = docker.deviceId;
        let source =  2;
        let timestamp = +new Date();
        let appSecret = docker.appSecret;
        let json = JSON.stringify(data);
        let sign =
            CryptoJS.enc.Hex.stringify(
                CryptoJS.MD5("POST"+url+"accessToken="+accessToken +"&appId="+appId+"&deviceId="+deviceId+"&json="+json
                    +"&source="+source+"&timestamp="+timestamp+"&"+appSecret
                )
            );
        let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
        console.log('---------------------------sendObj',sendObj)

        het.post(url,sendObj,sucCallback,errCallback,1);
    },
    onSelectPart(data){
        this.trigger(data);
        clearInterval(docker.timer);
        AppData.timer = setTimeout(()=>{ this.trigger({measureStatus:2}) },3000)
        // 调用POST接口发送设备控制数据给服务器，走大循环，服务器发送接收到的数据给设备，设备响应
        // 设备接收到数据，响应之后回传数据给服务器
        AppData.part = data.part;
        this.onSetting(data);
    },
    onReMeasure(){this.trigger(data)},
    onMeasureStatus(data){
        //测试动画和状态维护
        let me = this;
        me.trigger({measureStatus:1});
        setTimeout(()=>{
            me.trigger(data);
        },11000)
    },
    onMeasureResult(){
        //测试结果，一些参数需要后台计算后返回
        let part = 1 ||AppData.part,
            water =  AppData.water || 30,
            oil=  AppData.oil || 20,
            elasticity = AppData.elasticity || 10,
            skinType = 0, skinSubType = 0, skinAgeType = 0,
            measureTime = /*new Date().Format('yyyy-MM-dd hh:mm:ss') ||*/ '2016-12-21 1:20:00';

        console.log('----part---water---measureTime',part,water,oil,elasticity,measureTime);
        //肤质算法,根据水油值获取肤质类型、肤质子类型
        if (water>0 && water<20.1 && oil>0 && oil<15.1) {
            skinType = 1;skinSubType = 1;//@"重度干燥";
        } else if (water>0 && water<20.1 && oil>14.9 && oil<25.1) {
            skinType = 1;skinSubType = 2;//@"干燥";
        } else if (water>0 && water<10.1 && oil>24.9 && oil<100) {
            skinType = 1;skinSubType = 9;//@"又干又油";
        } else if (water>19.9 && water<40.1 && oil>14.9 && oil<25.1) {
            skinType = 1;skinSubType = 3;//@"缺水性偏干";
        } else if (water>19.9 && water<40.1 && oil>0 && oil<15.1) {
            skinType = 1;skinSubType = 4;//@"缺油性偏干";
        } else if (water>39.9 && water<100 && oil>0 && oil<25.1) {
            skinType = 2;skinSubType = 5;//@"中性";
        } else if (water>19.9 && water<40.1 && oil>24.9 && oil<100) {
            skinType = 3;skinSubType = 6;//@"缺水性偏油";
        } else if (water>39.9 && water<100 && oil>24.9 && oil<30.1) {
            skinType = 3;skinSubType = 7;//@"轻度偏油";
        } else if (water>39.9 && water<100 && oil>29.9 && oil<100) {
            skinType = 3;skinSubType = 8;//@"重度偏油";
        }
        //肤质算法,根据水分计算肤质年龄
        if (water>55) {// && oil>14.9
            skinAgeType = 1;//@"18~20";
        } else if (water>50 && water<55.1) {// && oil>14.9
            skinAgeType = 2;//@"20~23";
        } else if (water>45 && water<50.1) {// && oil>14.9
            skinAgeType = 3;//@"23~25";
        } else if (water>40 && water<45.1) {// && oil>14.9
            skinAgeType = 4;//@"25~28";
        } else if (water>35 && water<40.1) {// && oil<20.1
            skinAgeType = 5;//@"28~30";
        } else if (water>30 && water<35.1) {// && oil<20.1
            skinAgeType = 6;//@"30~33";
        } else if (water>25 && water<30.1) {// && oil<15
            skinAgeType = 7;//@"33~35";
        } else if (water<25) {// && oil<15
            skinAgeType = 8;//@"35~40";
        }
        //旧接口居然存在跨域问题
        let url = docker.host+'/v1/app/chairdressing/partMeasure/uploadPartSkinTestResult';
        //字符串拼接的时候一定要细心，一错全错
        let sendObj =
             'part='+part
            +'&water='+water
            +'&oil='+ oil
            +"&elasticity="+elasticity

            +'&skinType='+ skinType
            +'&skinSubType='+ skinSubType
            +'&skinAgeType='+ skinAgeType
            +'&skinMeterId='+ docker.deviceId
            +'&measureTime='+ measureTime
            +"&location="+docker.cityCode

            +"&appId=" +docker.appId
            +"&accessToken="+ docker.accessToken
            +'&timestamp='+ (+new Date());

        console.log('sendObj--------------',sendObj)
        let sucCallback = function (xhr) {
            xhr = JSON.parse(xhr);
            xhr.code === 0 && Funs._extends(AppData,xhr.data);
            if(xhr.code === 0){
                AppData.measureResult = true
            }else{
                AppData.measureResult = true
            }
            console.log('---------------200-----------',xhr.code,AppData.skinTypeName)
        }
        let errCallback = function (xhr) {
            iToast('请测试结果失败');
            AppData.measureResult = false

        }
        het.post(url,sendObj,sucCallback,errCallback,1);
    },
    onEchartsLines(data){
        //获取图表历史数据
        //本地模拟数据
        let begin = '2016-12-01 00:00:00';
        let end = '2016-12-01 23:59:59';
        data.type==0 && (begin = '2016-12-01 02:04:00',end = '2016-12-01 23:59:59')//按天
        data.type==1 && (begin ="2016-12-5 00:00:00",end = "2016-12-11 23:59:59")//按周
        data.type==2 && (begin ="2016-11-1 00:00:00",end = "2016-11-30 23:59:59")//按月

        //接口路由地址
        let router = data.type == 0 ? (docker.routerGetDay):(docker.routerGetDays);
        this.onHttpRequest({
            router: router,
            //measureDateBegin: begin,
            //measureDateEnd: end,
            measureDateBegin: data.reqStart,
            measureDateEnd: data.reqOver,
            part: data.part,//此part与首页的part并不能共用，不在store里记忆存储该字段
        });
        console.log('路由地址切换------data.start---data.start',router,data.reqStart,data.reqOver);
    },
    onHttpRequest(config){
        //图标请求数据方法
        //路由和参数配置
        let me = this;
        let url = docker.host+config.router;
        let params = {
            appId: config.appId || docker.appId,
            accessToken: config.accessToken || docker.accessToken,
            timestamp: +new Date(),
        };
        for(let i in config) {
            params[i]!= config[i]  &&　(params[i] = config[i]);
        }
        delete params.router;
        //console.log('params',params);

        //jQuery方式请求数据
        $.ajax({
            url:url,
            type: config.type || 'GET',
            //xhrFields: { withCredentials: true},
            //crossDomain:true,//开启跨域
            //async:false,//关闭异步
            dataType: 'json',
            data: params,
            success: function(xhr){
                //return xhr
                //console.log('请求成功',JSON.stringify(xhr))
                //let data = xhr.code == 0 ?xhr.data:[];
                //日，周，月的接口返回数据格式并不一致
                let len = 0;
                if(xhr.code==0){
                    let dayOrDays = {
                        xAxis: [],
                        xAxisLength : 0,
                        water: [],
                        oil: [],
                        elasticity: []
                    }

                    /*if(xhr.data instanceof Array && xhr.data.length!=0){

                     me.trigger(dayOrDays);
                     return false;
                     }*/
                    if(xhr.data == null || xhr.data.length ==0){
                        console.log('------------万法皆空，阿弥陀福----xhr.data------',xhr.data)
                        me.trigger(dayOrDays);
                        return false;
                    }
                    //按日
                    if(config.router == docker.routerGetDay){
                        let data  = xhr.data[0].measureRec;
                        // console.log('------------按日数据----------',data);
                        let byDay = {
                            xAxis: docker.refactorArr(data,'measureTime'),
                            xAxisLength : 7,
                            water: docker.refactorArr(data,'water'),
                            oil: docker.refactorArr(data,'oil'),
                            elasticity: docker.refactorArr(data,'elasticity')
                        };
                        //console.log('byDay-------------------------------------',byDay)
                        me.trigger(byDay);
                    }
                    //按周，按月
                    if(config.router == docker.routerGetDays){
                        let datas  = xhr.data.measureRec;
                        let byDays = {
                            xAxis: docker.refactorArr(datas,'measureTime'),
                            xAxisLength: 7,
                            water: docker.refactorArr(datas,'water'),
                            oil: docker.refactorArr(datas,'oil'),
                            elasticity: docker.refactorArr(datas,'elasticity')
                        };
                        //console.log('------------按月周数据----------',datas)
                        //console.log('byDays---------byDays-----byDays----------------------',byDays)
                        me.trigger(byDays);
                    }
                }
            },
            error: function (xhr) {
                // return '请求失败';
                het.toast('请求失败'+xhr.code);
                //请求失败就当做离线
                return '404'
            }
        });

        //url += '?accessToken='+docker.accessToken
        //    +'&appId='+docker.appId+
        //    +'&part='+ config.part
        //    +'&measureDateBegin='+ config.measureDateBegin
        //    +'&measureDateEnd='+ config.measureDateEnd
        //    +'&timestamp='+(+new Date())
        //let scb = (xhr)=>{
        //    //日，周，月的接口返回数据格式并不一致
        //    let len = 0;
        //    if(xhr.code==0){
        //        let dayOrDays = {
        //            xAxis: [],
        //            xAxisLength : 0,
        //            water: [],
        //            oil: [],
        //            elasticity: []
        //        }
        //
        //        /*if(xhr.data instanceof Array && xhr.data.length!=0){
        //
        //         me.trigger(dayOrDays);
        //         return false;
        //         }*/
        //        if(xhr.data == null || xhr.data.length ==0){
        //            console.log('------------万法皆空，阿弥陀福----xhr.data------',xhr.data)
        //            me.trigger(dayOrDays);
        //            return false;
        //        }
        //        //按日
        //        if(config.router == docker.routerGetDay){
        //            let data  = xhr.data[0].measureRec;
        //            // console.log('------------按日数据----------',data);
        //            let byDay = {
        //                xAxis: docker.refactorArr(data,'measureTime'),
        //                xAxisLength : xAxis.length,
        //                water: docker.refactorArr(data,'water'),
        //                oil: docker.refactorArr(data,'oil'),
        //                elasticity: docker.refactorArr(data,'elasticity')
        //            };
        //            //console.log('byDay-------------------------------------',byDay)
        //            me.trigger(byDay);
        //        }
        //        //按周，按月
        //        if(config.router == docker.routerGetDays){
        //            let datas  = xhr.data.measureRec;
        //            let byDays = {
        //                xAxis: docker.refactorArr(datas,'measureTime'),
        //                xAxisLength : xAxis.length,
        //                water: docker.refactorArr(datas,'water'),
        //                oil: docker.refactorArr(datas,'oil'),
        //                elasticity: docker.refactorArr(datas,'elasticity')
        //            };
        //            //console.log('------------按月周数据----------',datas)
        //            //console.log('byDays---------byDays-----byDays----------------------',byDays)
        //            me.trigger(byDays);
        //        }
        //    }
        //}
        //let ecb = (xhr)=>{
        //    het.iToast('历史数据请求失败')
        //}
        //het.get(url,'',suc,err,1)



    },
    onRepaint(){
        //console.log('All data',AppData)
        this.trigger(AppData)
    },
    onGetToken(callback) {
        if (!window.AppJsBridge) return '';
        let _this = this;
        window.AppJsBridge.service.deviceService.doAction({
            "sn": getCurrentDeviceSn(),
            "deviceClass": "generalSwitch",
            "action": 'getAccessToken',
            "success": function(data) {
                if (data != null && data.Status != null) {
                    if (data.Status == "0") {
                        var result = data.result;
                        if (AppData.online != 1) {
                            AppData.online = 1;
                            _this.trigger({online: 1});
                        }
                        if (callback) {
                            callback(result)
                        }
                        return result.accessToken;
                    }
                } else {
                    AppData.online = 2;
                    _this.trigger({online: 2});
                }
            },
            "error": function(data) {
                AppData.online = 2;
                _this.trigger({online: 2});
                alert('err')
               // het.toast('error' + JSON.stringify(data));
            }
        });
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
})