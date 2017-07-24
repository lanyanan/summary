'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import { DataAction,StateAction } from './Actions.es6';
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () { };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data) {
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(JSON.parse(xmlHttp.responseText));
        }
    };
};
function getHuaweiToken(sucCallback, errCallback) {
    if (!window.AppJsBridge) return typeof errCallback === 'function' && errCallback('未检测到华为SDK');
    AppJsBridge.service.applicationService.doAction({
        "applicationName": "com.huawei.smarthome.clife.ClifeApplication",
        "serviceName": "getAccessToken",
        "parameters": {},
        "action": "getAccessToken",
        "success": function (data) {
            if (data != null && data.Status != null) {
                if (data.Status == "0") {
                    let result = data.result;
                    return typeof sucCallback === 'function' && sucCallback(result);
                } else {
                    return typeof errCallback === 'function' && errCallback('获取token失败,driver返回' + data.Status);
                }
            } else {
                return typeof errCallback === 'function' && errCallback('获取token失败,driver未响应');
            }
        },
        "error": function (data) {
            return typeof errCallback === 'function' && errCallback('获取token失败,APP代理token请求失败');
        }
    })
};
function getToken(sucCallback, errCallback) {
    //sucCallback('f523a77afc394682aab441ae9e66e30c');return;
    var callback = function (data) {
        return typeof data === 'object' ? data.accessToken : data;
    }
    var sucFun = function (data) {
        let token = data.accessToken;
        return typeof sucCallback === 'function' ? sucCallback(token) : null;
    }
    return getHuaweiToken(sucFun || callback, errCallback || callback);
};
const appId=30590;
const appType=!!(navigator.userAgent.indexOf('Android')+1)?3:4;
let DataStore = Reflux.createStore({
    listenables: [DataAction],
    onGetCatgory(typeId, pageIndex, pageRows=20) {
        let self=this,
            url='https://test.api.clife.cn/v1/app/chairdressing/news/list';
        let dataSuccFunc=function(res){
            self.trigger({index:pageIndex,list:res.data.list});
        };
        let tokenSuccFunc=function(token){
            ajax({
                method:'GET',
                url:url,
                data:{
                 appId,
                 timestamp:new Date().getTime(),
                 accessToken:token,
                 appType,
                 typeId,
                 pageIndex,
                 pageRows
                },
                async:true,
                success:function(res){
                    if(res.code==0){
                        dataSuccFunc(res);
                    }
                }
            });
        }
        let tokenErrorFunc=(tip)=>{alert('没有获取到token'+tip)};
        getToken(tokenSuccFunc,tokenErrorFunc);
    },
    onGetStep(newsId){
        let self=this,
            url='https://test.api.clife.cn/v1/app/chairdressing/news/details';
        let dataSuccFunc=function(res){
            console.log(res);
            self.trigger(res.data);
        };
        let tokenSuccFunc=function(token){
            ajax({
                method:'GET',
                url:url,
                data:{
                 appId,
                 timestamp:new Date().getTime(),
                 //accessToken:token,
                 appType,
                 newsId
                },
                async:true,
                success:function(res){
                    if(res.code==0){
                        dataSuccFunc(res);
                    }
                }
            });
        }
        let tokenErrorFunc=(tip)=>{alert('没有获取到token'+tip)};
        getToken(tokenSuccFunc,tokenErrorFunc);
    }
});
export {DataStore};