'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
const AppData = {};
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
    onGetData(){
    	this.trigger({CurWorkMode:AppData.CurWorkMode,WorkCompSta:AppData.WorkCompSta,
            online:AppData.online,KeyError:AppData.KeyError,BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin});
    },
    onHandleShakeSwitch(type,WorkCompSta){
        // console.log('type',type,WorkCompSta);
    	if(type){
            this.trigger({'CurWorkMode':type});
            if (WorkCompSta == 0) {
                AppData.WorkStartStop = '01';
                AppData.WorkMode = '0'+type;
                AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
                console.log('22222',AppData);
                het.send(AppData, function(data){

                    // console.log(data)
                },function(data){
                    het.toast("命令发送失败");
                });
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
            
            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
            AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2,het.hexUpFlag(4,1,2,het.hexUpFlag(5,1,2))));
            this.trigger({BespeakHour:AppData.BespeakHour,BespeakMin:AppData.BespeakMin,open:'02'});
            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
        }
        
        //console.log(AppData,'kkkkkkkkkkkkkkkkk');
        let _this = this;
        console.log('gggggggggggg',AppData);
        het.send(AppData, function(data){
            // console.log('open222222222222222222222');
            _this.trigger({open:'02'});
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
        history.back();
        //this.trigger({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
        
    },
    onModeCancel(WorkCompSta,CurWorkMode){
        //setDataTimer('WorkCompSta','WorkStartStop');
        dataFilterTimers.WorkCompSta=0;
        dataFilterTimers.CurWorkMode=0;
        AppData.WorkCompSta = '0'+parseInt(WorkCompSta);
        AppData.BespeakHour = '00';
        AppData.BespeakMin = '00';
        AppData.CurWorkMode = CurWorkMode;
        AppData.WorkMode = CurWorkMode;
        AppData.WorkStartStop = '00';

        if(WorkCompSta ==1){
            AppData.WorkStartStop = '00';
            AppData.WorkMode = '00';
            if(AppData.KeyFlagSta == '01'){
                AppData.KeyFlag = '01';
                this.trigger({KeyFlagSta:'01'});
            }else{
                AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2));
            }
            

        }else{
            AppData.BespeakSet = '00';
            AppData.BespeakMode ='00';
            AppData.updateFlag = het.hexUpFlag(2,1,2,het.hexUpFlag(3,1,2));
            // this.trigger({WorkCompSta:});
        }
        this.trigger({CurWorkMode:AppData.CurWorkMode});
        //WorkCompSta ==1?(AppData.WorkMode = '01';AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(1,2,2))):(AppData.WorkMode = '03';AppData.BespeakSet ='00';AppData.BespeakMode = '00'; AppData.updateFlag = het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2)));
        // console.log('AppData.updateFlag',AppData);
        let _this = this;
        het.send(AppData, function(data){
            // console.log('suibian');
           _this.trigger({WorkCompSta:'00',BespeakSta:'00'});
        },function(data){
            het.toast("命令发送失败");
        });
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