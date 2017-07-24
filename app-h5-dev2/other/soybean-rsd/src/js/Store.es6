'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
let AppData = {};
const docker = {
    appId: '10120',
    appSecret: "3cbea951ccb14de3a7acd04c0b64a22f" ,
    deviceId: '410BF8E4A3DD1403536211486B08A23A' || 'BAE827106FF8DED3634B4831A7D0306D' ||het.getDeviceId(), //'5E39AD1E6EBAAC45E37D6AC243B49641' 我的设备
    accessToken: '37c880c1667b4ff7b9952d11a90bee3f',
    //历史数据接口路由
    routerGetDay : '/v1/app/chairdressing/partMeasure/getByday',
    routerGetDays: '/v1/app/chairdressing/partMeasure/getBydays',
    //控制,运行,故障数据接口路由
    routerDevCtrl: '/v1/device/config/set',
    routerDevRun:  '/v1/device/data/get',
    routerDevErr:  '/v1/device/data/getErrorData',
    //重构历史数据
    refactorArr: (data,key)=>{
        let arr = [];
        data.map((item,index)=>{
            arr[index] = item[key];
        });
        return arr;
    },
}

const decToHex = (dec)=> {
    let hex = parseInt(dec).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};
// 数据过滤计时器
let dataFilterTimers = {
    WorkCompSta : 0,
    WorkStartStop : 0,
    BespeakSet : 0,
    BespeakMode : 0,
    BespeakHour : 0,
    BespeakMin : 0,
    CurWorkMode : 0

};

// 返回过滤后的数据
function dataFilter(data) {
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
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 10e3*2; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas){

        let data = dataFilter(datas);
        
    	if(data.CurWorkMode) AppData.CurWorkMode = data.CurWorkMode;
        if(data.WorkMode) AppData.WorkMode = data.WorkMode;
    	if(data.WorkCompSta) {AppData.WorkCompSta = data.WorkCompSta;data.open = '02';AppData.open = '02'}
    	if(data.online) {AppData.online = data.online;if(data.online == 2){data.open = '02';}}
        if(data.networkavailable) {AppData.networkavailable = data.networkavailable;if(data.networkavailable == 2){data.open = '02';}}
    	if(data.KeyError) AppData.KeyError = data.KeyError;
    	if(data.BespeakHour) AppData.BespeakHour = data.BespeakHour;
    	if(data.BespeakMin) AppData.BespeakMin = data.BespeakMin;
        if(data.WorkStartStop) AppData.WorkStartStop = data.WorkStartStop;
        if(data.deviceName) AppData.deviceName = data.deviceName;
        if(data.KeyFlagSta) AppData.KeyFlagSta = data.KeyFlagSta;
        if(data.BespeakSta) AppData.BespeakSta = data.BespeakSta;
        if(data.BespeakMode) AppData.BespeakMode = data.BespeakMode;
        this.trigger(data);
    },
    onGetting(data){
         const _this = this;
         let getRunUrl = 'https://200.200.200.50/v1/device/data/get';
        // 直接应用openlifeSDK
        het.get(getRunUrl, '', function(response) {
            const result = JSON.parse(response);
            result.code === 0 && _this.onRepaint(result.data);
            if(result.code === 100022006 ){_this.trigger({'online':'02'})}
        }, function(response) {
            het.toast(response);
        });

        //本地调试请求
        //this.onAjax(url,params,'GET',sucCallback,errCallback)
    },
    onSetting(BespeakHour,BespeakMin,CurWorkMode){
        // alert(BespeakHour,BespeakMin,CurWorkMode);
        let postCtrlUrl = 'https://200.200.200.50/v1/device/config/set';
        let accessToken = docker.accessToken;
        let appId =  docker.appId;
        let deviceId = docker.deviceId;
        let source =  2;
        let timestamp = +new Date();
        let appSecret = docker.appSecret;
        let _this = this;

        
        setDataTimer('WorkCompSta','WorkStartStop','BespeakSet','BespeakMode','BespeakHour','BespeakMin','CurWorkMode');
        !isNaN(BespeakHour)?'00':BespeakHour;
        !isNaN(BespeakMin)?'00':BespeakMin;
        AppData.CurWorkMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
        let date = new Date();
        let hour = date.getHours()+BespeakHour;
        let minute = date.getMinutes()+BespeakMin;
        //this.trigger({BespeakHour:hour,BespeakMin:minute,open:'02'});
        let CurWorkModes = {};
        (AppData.BespeakHour =='00' && AppData.BespeakMin == '00' )?AppData.WorkCompSta = 1:AppData.WorkCompSta = 3;
        if (BespeakHour== 0&&BespeakMin==0) {
            
            AppData.WorkStartStop = '01';
            AppData.WorkCompSta = '01';
            AppData.WorkMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
            AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
            console.log('11111111111111111111111111111',AppData);
            _this.trigger({'WorkMode':AppData.WorkMode,'WorkCompSta':AppData.WorkCompSta,'WorkStartStop':AppData.WorkStartStop,'open':'02'});
            CurWorkModes = {'WorkStartStop':AppData.WorkStartStop,'WorkMode':AppData.WorkMode,'updateFlag':AppData.updateFlag}
            //AppData.updateFlag = het.hexUpFlag(0,2,2);
        }else{
            
            AppData.BespeakSet = '01';
            AppData.WorkCompSta = '03';
            // AppData.WorkStartStop = '01';
            AppData.SetBespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
            AppData.SetBespeakMin = decToHex(minute>59?(minute-60):minute);
            AppData.SetBespeakHour = decToHex((minute>59?hour+1:hour)%24) ;
            AppData.BespeakHour = AppData.SetBespeakHour;
            AppData.BespeakMin = AppData.SetBespeakMin;
            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
            AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2,het.hexUpFlag(5,1,2))));
            console.log('2222222222222222222222222222222222',AppData);
            _this.trigger({'BespeakSta':'03','BespeakMode':AppData.SetBespeakMode,'WorkCompSta':'03',
            'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,'open':'02'});
            CurWorkModes = {'BespeakSet':AppData.BespeakSet,'SetBespeakMode':AppData.SetBespeakMode,
            'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,'updateFlag':AppData.updateFlag}
            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
        }
        het.post(postCtrlUrl, CurWorkModes, function(response) {
            const result = JSON.parse(response);
            result.code != 0 && het.toast(`下发失败,原因:${result.msg}`);
            if (BespeakHour== 0&&BespeakMin==0) {
            
                AppData.WorkStartStop = '01';
                AppData.WorkCompSta = '01';
                AppData.WorkMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
                AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
                console.log('11111111111111111111111111111',AppData);
                _this.trigger({'WorkMode':AppData.WorkMode,'WorkCompSta':AppData.WorkCompSta,'WorkStartStop':AppData.WorkStartStop,'open':'02'});
                CurWorkModes = {'WorkStartStop':AppData.WorkStartStop,'WorkMode':AppData.WorkMode,'updateFlag':AppData.updateFlag}
                //AppData.updateFlag = het.hexUpFlag(0,2,2);
            }else{
                
                AppData.BespeakSet = '01';
                AppData.WorkCompSta = '03';
                // AppData.WorkStartStop = '01';
                AppData.SetBespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
                AppData.SetBespeakMin = decToHex(minute>59?(minute-60):minute);
                AppData.SetBespeakHour = decToHex((minute>59?hour+1:hour)%24) ;
                AppData.BespeakHour = AppData.SetBespeakHour;
                AppData.BespeakMin = AppData.SetBespeakMin;
                //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
                AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2,het.hexUpFlag(5,1,2))));
                console.log('2222222222222222222222222222222222',AppData);
                _this.trigger({'BespeakSta':'03','BespeakMode':AppData.SetBespeakMode,'WorkCompSta':'03','CurWorkMode':AppData.SetBespeakMode,
                'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,'open':'02'});
                CurWorkModes = {'BespeakSet':AppData.BespeakSet,'SetBespeakMode':AppData.SetBespeakMode,
                'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,'updateFlag':AppData.updateFlag}
                //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
            }
            

        }, function(responseTxt) {
            het.toast(responseTxt);
        });
        history.back();
        /*let CurWorkModes ={"WorkMode":AppData.WorkMode,'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,
        'updateFlag':AppData.updateFlag,'WorkCompSta':AppData.WorkCompSta};*/
        // let json = JSON.stringify(CurWorkModes);
        // let sign =
        //     CryptoJS.enc.Hex.stringify(
        //         CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId
        //             +"&deviceId="+deviceId+"&json="+json
        //             +"&source="+source+"&timestamp="+timestamp+"&"+appSecret)
        //     );
        // let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
        // let sucCallback = function (xhr) {
        //     //this.trigger({'WorkCompSta':AppData.WorkCompSta,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin})
            
        //     /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
        //     xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
        //     xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
        // }
        // let errCallback = function (xhr) {/*iToast('请求失败')*/}
        // //het.post(url,sendObj,sucCallback,errCallback,1);

        // //本地调试方式
        // let ajax=(url, data, type, sucCallback, errCallback)=>{

        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange=function(){
        //         if (xhr.readyState===4) {
        //             if (xhr.status===200 || xhr.status===304) {
        //                 sucCallback(xhr.responseText);
        //             } else {
        //                 errCallback('Request failed! Status code: ' + xhr.status);
        //             }
        //         }
        //     };
        //     xhr.open(type, url, true);
        //     // xhr.withCredentials = true;
        //     if (type==='POST') { 
        //         xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        //     }
        //     xhr.send(data);
        // }
        //     ajax(url, sendObj,'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
        //$ajax方式
        //this.onAjax(url,data,'POST',sucCallback,errCallback)

    },
    /*onGetData(){
    	this.trigger({CurWorkMode:AppData.CurWorkonMeasureResultMode,WorkCompSta:AppData.WorkCompSta,
            online:AppData.online,KeyError:AppData.KeyError,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin});
    },*/
    onHandleShakeSwitch(type,WorkCompSta){
    	if(type){
            this.trigger({'CurWorkMode':type});
            if (WorkCompSta == 0) {
                AppData.WorkStartStop = '01';
                AppData.WorkMode = '0'+type;
                AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
                let me = this;
                let url = 'https://200.200.200.50/v1/device/config/set';
                let accessToken = docker.accessToken;
                let appId =  docker.appId;
                let deviceId = docker.deviceId;
                let source =  2;
                let timestamp = +new Date();
                let appSecret = docker.appSecret;
                let CurWorkModes = {'WorkStartStop':AppData.WorkStartStop,'WorkMode':AppData.WorkMode,'updateFlag':AppData.updateFlag};
                let json = JSON.stringify(CurWorkModes);
                let sign =
                    CryptoJS.enc.Hex.stringify(
                        CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId
                            +"&deviceId="+deviceId+"&json="+json
                            +"&source="+source+"&timestamp="+timestamp+"&"+appSecret)
                    );
                let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
                let sucCallback = function (xhr) {
                    //me.trigger({'WorkCompSta':AppData.WorkCompSta,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin})
                    
                    /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
                    xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
                    xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
                }
                let errCallback = function (xhr) {/*iToast('请求失败')*/}
                //het.post(url,sendObj,sucCallback,errCallback,1);

                //本地调试方式
                let ajax=(url, data, type, sucCallback, errCallback)=>{

                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange=function(){
                        if (xhr.readyState===4) {
                            if (xhr.status===200 || xhr.status===304) {
                                sucCallback(xhr.responseText);
                            } else {
                                errCallback('Request failed! Status code: ' + xhr.status);
                            }
                        }
                    };
                    xhr.open(type, url, true);
                    // xhr.withCredentials = true;
                    if (type==='POST') { 
                        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                    }
                    xhr.send(data);
                }
                    ajax(url, sendObj,'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
                    }
                }else{
                    return ;
                }

    },
    onClockSwitch(hour,minute){
        if(hour==3 && minute== 'cancel'){
        	this.trigger({remainTime:hour,clockShow:3,selectshow:false});

        }
    },
    onSelectTime(hour,minute){
        // if(isFault()){het.toast(isFault());return false};
       //alert('6666666666666',hour,minute);

        this.trigger({hour:hour,minute:minute,clockShow:3,selectshow:false});
        // het.send(AppData, function(data){
        //     // console.log(data)
        // },function(data){
        //     het.toast("命令发送失败");
        // });
        // }
    },
    onModeStart(BespeakHour,BespeakMin,CurWorkMode){
        
        //this.trigger({open:'02'});
        setDataTimer('WorkCompSta','WorkStartStop','BespeakSet','BespeakMode','BespeakHour','BespeakMin','CurWorkMode');
        !isNaN(BespeakHour)?'00':BespeakHour;
        !isNaN(BespeakMin)?'00':BespeakMin;
        AppData.CurWorkMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
        let date = new Date();
        let hour = date.getHours()+BespeakHour;
        let minute = date.getMinutes()+BespeakMin;
        //this.trigger({BespeakHour:hour,BespeakMin:minute,open:'02'});
        (AppData.BespeakHour =='00' && AppData.BespeakMin == '00' )?AppData.WorkCompSta = 1:AppData.WorkCompSta = 3;
        console.log('BespeakHour','BespeakMin',BespeakMin);
        if (BespeakHour== 0&&BespeakMin==0) {
            AppData.WorkStartStop = '01';
            AppData.WorkCompSta = '01';
            AppData.WorkMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
            AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
            //AppData.updateFlag = het.hexUpFlag(0,2,2);
        }else{
            
            AppData.BespeakSet = '01';
            AppData.WorkCompSta = '03';
            // AppData.WorkStartStop = '01';
            AppData.SetBespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));
            AppData.SetBespeakMin = decToHex(minute>59?(minute-60):minute);
            AppData.SetBespeakHour = decToHex((minute>59?hour+1:hour)%24) ;
            AppData.BespeakHour = AppData.SetBespeakHour;
            AppData.BespeakMin = AppData.SetBespeakMin;
            console.log('gggggggggggg',AppData);
            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
            AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2,het.hexUpFlag(5,1,2))));
            this.trigger({BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin,open:'02','WorkCompSta':'03','BespeakMode':AppData.SetBespeakMode});
            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
        }
        history.back();
        //console.log(AppData,'kkkkkkkkkkkkkkkkk');
      /*  let _this = this;
        het.send(AppData, function(data){
            // console.log('open222222222222222222222');
            _this.trigger({open:'02'});
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });*/
        
        //this.trigger({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
        
    },
    onModeCancel(WorkCompSta,CurWorkMode){
        //setDataTimer('WorkCompSta','WorkStartStop');
        dataFilterTimers.WorkCompSta=0;
        dataFilterTimers.CurWorkMode=0;
        let me = this;
        AppData.WorkCompSta = '0'+parseInt(WorkCompSta);
        AppData.BespeakHour = '00';
        AppData.BespeakMin = '00';
        AppData.CurWorkMode = CurWorkMode;
        AppData.WorkMode = CurWorkMode;
        AppData.WorkStartStop = '00';
        let CurWorkModes = {};
        if(WorkCompSta ==1){
            AppData.WorkStartStop = '00';
            AppData.WorkMode = '00';
            if(AppData.KeyFlagSta == '01'){
                AppData.KeyFlag = '01';
                me.trigger({KeyFlagSta:'01'});
            }else{

                AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
                //CurWorkModes = {'WorkStartStop':AppData.WorkStartStop,'updateFlag':AppData.updateFlag}
            }
            

        }else{
            AppData.BespeakSet = '00';
            AppData.BespeakMode ='00';
            AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2));
            // me.trigger({WorkCompSta:});
            //CurWorkModes = {'BespeakSet':AppData.BespeakSet,'BespeakMode':AppData.BespeakMode,'updateFlag':AppData.updateFlag}
        }
        me.trigger({WorkCompSta:'00'});

        let postCtrlUrl = 'https://200.200.200.50/v1/device/config/set';
        let accessToken = docker.accessToken;
        let appId =  docker.appId;
        let deviceId = docker.deviceId;
        let source =  2;
        let timestamp = +new Date();
        let appSecret = docker.appSecret;
        

        setDataTimer('WorkCompSta','WorkStartStop','BespeakSet','BespeakMode','BespeakHour','BespeakMin','CurWorkMode');

        
        het.post(postCtrlUrl, AppData, function(response) {
            const result = JSON.parse(response);
            result.code != 0 && het.toast(`下发失败,原因:${result.msg}`);
            _this.trigger({'WorkMode':'00','WorkCompSta':'00','WorkStartStop':'00','open':'02'});
        }, function(responseTxt) {
            het.toast(responseTxt);
        });

        /*let CurWorkModes ={"WorkMode":AppData.WorkMode,'SetBespeakHour':AppData.SetBespeakHour,'SetBespeakMin':AppData.SetBespeakMin,
        'updateFlag':AppData.updateFlag,'WorkCompSta':AppData.WorkCompSta};*/
        // let json = JSON.stringify(CurWorkModes);
        // let sign =
        //     CryptoJS.enc.Hex.stringify(
        //         CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId
        //             +"&deviceId="+deviceId+"&json="+json
        //             +"&source="+source+"&timestamp="+timestamp+"&"+appSecret)
        //     );
        // let sendObj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
        // let sucCallback = function (xhr) {
            
            
        //     /*xhr.code == 0 && (iToast('发送成功'),console.log('---------发送成功---------'))
        //     xhr.code == 100022006 && (iToast('设备不在线'),console.log('-----------设备不在线---------'))
        //     xhr.code == 100022800 && (iToast('命令发送失败'),console.log('---------命令发送失败---------'))*/
        // }
        // let errCallback = function (xhr) {iToast('请求失败')}
        // //het.post(url,sendObj,sucCallback,errCallback,1);

        // //本地调试方式
        // let ajax=(url, data, type, sucCallback, errCallback)=>{

        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange=function(){
        //         if (xhr.readyState===4) {
        //             if (xhr.status===200 || xhr.status===304) {
        //                 sucCallback(xhr.responseText);
        //             } else {
        //                 errCallback('Request failed! Status code: ' + xhr.status);
        //             }
        //         }
        //     };
        //     xhr.open(type, url, true);
        //     // xhr.withCredentials = true;
        //     if (type==='POST') { 
        //         xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        //     }
        //     xhr.send(data);
        // }
        //     ajax(url, sendObj,'POST', sucCallback, errCallback); // 无app代理，调用ajax执行请求
        //$ajax方式
        //this.onAjax(url,data,'POST',sucCallback,errCallback)
        //WorkCompSta ==1?(AppData.WorkMode = '01';AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(1,2,2))):(AppData.WorkMode = '03';AppData.BespeakSet ='00';AppData.BespeakMode = '00'; AppData.updateFlag = het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2)));
        // console.log('AppData.updateFlag',AppData);
        /*let _this = this;
        het.send(AppData, function(data){
            // console.log('suibian');
           _this.trigger({WorkCompSta:'00',BespeakSta:'00'});
        },function(data){
            het.toast("命令发送失败");
        });*/
    },
    onModeFinish(){
        AppData.WorkCompSta = '02';
        AppData.WorkStartStop = '00';
        AppData.updateFlag = het.hexUpFlag(0,1,1);
        
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onTimeclock(BespeakMin){
        this.trigger({BespeakMin:BespeakMin});
    },
    onTimeclocker(hour, min){
        let date = new Date();
        let BespeakHour = date.getHours() + hour;
        let BespeakMin = date.getMinutes() + min;
        if (BespeakMin > 60) {
            BespeakMin = BespeakMin - 60;
            BespeakHour++;
        }
        AppData.BespeakHour = decToHex(BespeakHour);
        AppData.BespeakMin = decToHex(BespeakMin);
        this.trigger({BespeakHour:AppData.BespeakHour, BespeakMin:AppData.BespeakMin});
    },
    onWorkCompSta(CurWorkMode){
        this.trigger({WorkCompSta:'01'});
        AppData.WorkMode = CurWorkMode;
        AppData.WorkStartStop = '01';
        // console.log(AppData);
        AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
        het.send(AppData, function(data){

            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    }
});




