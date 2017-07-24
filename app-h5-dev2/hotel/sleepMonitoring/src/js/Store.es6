'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import Path from './ApiPath.es6';
const AppData = {

};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint: function(data){
        this.trigger(data);
    },
    onGetConnect: function(){
        var _this = this;
        var url = Path.wPath + '/wechat/hotel/mattress/getMonthDateList?deviceId='+devId+'&date='+date;
        var dateList=[];
        $.ajax({
            url: url,
            //url: '../static/js/datadate.json',
            dataType: 'json',
            cache: true,
            async: true,
            success: function(r){
                if(r.code==0){
                    for(var i=0,len=r.data.length;i<len;i++){ 
                        //$('li[data-date="'+r.data[i].dataTime+'"]').addClass('hasdata');
                        dateList.push(r.data[i].dataTime);
                    }
                    //console.log('ddfdfsdfsdfsdfsdfsdfsafsadfsdfds',dateList);
                    var len = dateList.length;
                    var flag = 'list';
                    _this.trigger({dateList: dateList,nextTime: dateList[len-1],flag: flag})
                }
            }
        });
    },

    onGetDateTime: function(devId,date){
        var _this = this;
        var url = Path.wPath + '/wechat/hotel/mattress/getMonthDateList?deviceId='+devId+'&date='+date;
        var dateList=[];
        $.ajax({
            url: url,
            //url: '../static/js/datadate.json',
            dataType: 'json',
            cache: true,
            async: true,
            success: function(r){
                if(r.code==0){
                    for(var i=0,len=r.data.length;i<len;i++){ 
                        //$('li[data-date="'+r.data[i].dataTime+'"]').addClass('hasdata');
                        dateList.push(r.data[i].dataTime);
                    }
                    //console.log('ddfdfsdfsdfsdfsdfsdfsafsadfsdfds',dateList);
                    var len = dateList.length;
                    var flag = 'list';
                    _this.trigger({dateList: dateList,nextTime: dateList[len-1],flag: flag})
                }
            }
        });
    },
    onChangeStatus: function(){
        var mStatus = false;
        this.trigger({mStatus: mStatus});
    },
    onSetWechatId: function(){
        function setCookie(c_name,value,expiredays,path) {
            var exdate=new Date();
            exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
            document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
        };
        function getQueryString(name){
             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if(r!=null) return decodeURI(r[2]);
             return null;
        };
        //setCookie('wechatUserId',10280,0.5,'/'); //10280
        var routerFirst = location.host == 'weixin.clife.cn'? "/clife-wechat": "/clife-wechat-test";
        var _this=this;
         // weixin.clife.cn/clife-wechat-test/wechat/user/login?format=json&type=1&redirect=http://weixin.clife.cn/web-wechat/hotel/v1/wisdomBox/page/index.html#/
         //获取授权wechatId
         // var getCookie = function(name) {
         //        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
         //        if (arr = document.cookie.match(reg)) {
         //            return unescape(arr[2]);
         //        } else {
         //            return null;
         //        }
         //    };
         //获取授权wechatId
               var getCookie = function(name) {
                   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                   if (arr = document.cookie.match(reg)) {
                       return unescape(arr[2]);
                   } else {
                       return null;
                   }
               };
         //微信授权
         var hasCookie = function(name) {
                var wechatId = getCookie(name);
                if (wechatId == "" || wechatId == null || wechatId == undefined) {
                    alert('-------------请求id--')
                    //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
                    var url =  routerFirst + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
                    alert(url)
                    window.location.href = url;
                }else{
                    console.log('设置WeChatUserId成功');
                    $.ajax({
                            url: Path.wPath + '/wechat/hotel/getToken',
                            dataType: 'json',
                            cache:true,
                            async:false,
                            success: function(r){
                                if(r.code==0){
                                        var access = r.data.split('-------')[1];
                                        setCookie('accessToken',access,0.5,'/');
                                        console.log('设置accessToken成功');
                                    } 
                                }
                        });
                }

                
            };
            
            hasCookie('wechatUserId');

    },
    onGetParam: function(){
    	var url = Path.wPath + '/wechat/hotel/getParam';
    	var _this = this;
    	$.ajax({
    	    url: url,
    	    dataType: 'json',
    	    cache:true,
    	    async:true,
    	    success: function(res){
    	        //console.log(res)
    	        if(res.code == 0){
    	            var accessToken = res.data.accessToken,
    	                appId = res.data.appId,
    	                deviceNamesShow = res.data.deviceNamesShow.split('_')[0]||res.data.deviceNamesShow,
    	                deviceId = res.data.deviceId.split('_')[0]||res.data.deviceId;
    	            //console.log([accessToken,appId,deviceNames,deviceId]);
    	            var comData = {
    	                accessToken:accessToken,
    	                appId:appId,
    	                deviceNamesShow:deviceNamesShow,
    	                deviceId:deviceId
    	            };
    	            _this.trigger(comData);
    	        }
    	    }
    	}); 
    },
    onGetDeviceList: function(roomId){
        var _this = this;
        $.ajax({
            url: Path.wPath + '/wechat/hotel/getRoomDevices?roomId='+roomId,
            dataType:'json',
            cache:true,
            async:true,
            success: function(r){
                var dataList=[];
                if(r.code==0){
                    dataList = r.data;
                    // console.log(dataList)
                    _this.trigger({dataList:dataList});
                    //console.log('************',dataList)
                    sessionStorage.setItem("dataList",JSON.stringify(dataList));
                }
            }
        });
    },
    onGetBattery: function(devId){
            var _this = this;
            var url=Path.wPath + '/wechat/hotel/mattress/getBatteryPower?deviceId='+devId;
            $.ajax({
                url: url,
                //url: '../static/js/data3.json',
                cache: true,
                async: true,
                success: function(r){
                    if(r.code==0){
                        var battery = r.data.batteryPower;
                        _this.trigger({battery: battery});
                    }
                }
            })
        }
});