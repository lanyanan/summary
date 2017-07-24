'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';



/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
	function ajax(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data){
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
    }

    /**
     * Toast提示
     * @param    {String}      msg提示信息
     */
    function showToast(msg){
        clearTimeout(st);
        let toast = document.getElementById('toast');
        toast.style.display = 'block';
        toast.innerHTML = msg;
        var st = setTimeout(function(){
            toast.style.display = 'none';
        },3000);
    }

    /**
     * sort函数比较器
     * @param    {String}      需要排序的字段
     */
    function compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    }

        function getHuaweiToken(sucCallback, errCallback) {
            if (!window.AppJsBridge) return typeof errCallback === 'function' && errCallback('未检测到华为SDK');
            AppJsBridge.service.applicationService.doAction({
                    "applicationName" : "com.huawei.smarthome.clife.ClifeApplication",
                    "serviceName" : "getAccessToken",
                    "parameters" : {},
                    "action" : "getAccessToken",
                    "success" : function(data) {
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
                    "error" : function(data) {
                        return typeof errCallback === 'function' && errCallback('获取token失败,APP代理token请求失败');
                    }
            })
        }

        function getToken(sucCallback, errCallback) {
            var callback = function(data) {
                return typeof data === 'object' ? data.accessToken : data;
            }
            var sucFun = function(data) {
                let token = data.accessToken;
                return typeof sucCallback === 'function' ? sucCallback(token) : null;
            }
            return getHuaweiToken(sucFun || callback, errCallback || callback);
        };

let docker = {
    host: 'https://test.api.clife.cn',
    appId: 30590,
}

let dataList1 = [],dataList2 = [];
export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetSingleClass(planId){//获取单次课程详细信息
        let _this = this;
        let sucFuc = (token)=>{
                let url = docker.host+'/v1/app/chairdressing/course/once';
                ajax({
                    method: 'GET',
                    url: url,
                    data: {
                        appId: docker.appId,
                        timestamp : (new Date()).getTime(),
                        accessToken: token,
                        planId:planId,
                        appType: 3  
                    },
                    async: true,
                    success: function(res){
                        if(res.code==0){
                            console.log(res);
                            _this.trigger(res.data);
                        }
                    }
                });
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    	
    },
    onGetWeekClass(planId) {
        let _this = this;
        let sucFuc = (token)=>{
                let url = docker.host+'/v1/app/chairdressing/course/period';
                ajax({
                    method: 'GET',
                    url: url,
                    data: {
                        appId: docker.appId,
                        timestamp : (new Date()).getTime(),
                        accessToken: token,
                        planId:planId,
                        appType: 3  
                    },
                    async: true,
                    success: function(res){
                        if(res.code==0){
                            let value = res.data;
                            value.taskList = value.taskList.sort(compare('taskId')).concat([]);
                            _this.trigger(value);
                        }
                    }
                });
        }
        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    	
    },
    onJoinClass(planId,period){//添加课程
        let _this = this;
        let sucFuc = (token)=>{
                let url = docker.host+'/v1/app/chairdressing/course/join';
                ajax({
                    method: 'POST',
                    url: url,
                    data: {
                        appId: docker.appId,
                        timestamp : (new Date()).getTime(),
                        accessToken: token,
                        planId:planId,
                        appType: 3  
                    },
                    async: true,
                    success: function(res){
                        if(res.code==0){
                            period == 1 ? _this.onGetWeekClass(planId) : _this.onGetSingleClass(planId);
                        }
                    }
                });
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    	
    },
    onStartClass(planId,period,day){
        let _this = this;
        let sucFuc = (token)=>{
                    if(period == 2){
                        let url = docker.host+'/v1/app/chairdressing/course/once';
                        ajax({
                            method: 'GET',
                            url: url,
                            data: {
                                appId: docker.appId,
                                timestamp : (new Date()).getTime(),
                                accessToken: token,
                                planId:planId,
                                appType: 3  
                            },
                            async: true,
                            success: function(res){
                                if(res.code==0){
                                    _this.trigger({detailList:res.data.detailList});
                                }
                            }
                        });
                    }else{
                        let url = docker.host+'/v1/app/chairdressing/course/period';
                        ajax({
                            method: 'GET',
                            url: url,
                            data: {
                                appId: docker.appId,
                                timestamp : (new Date()).getTime(),
                                accessToken: token,
                                planId:planId,
                                appType: 3  
                            },
                            async: true,
                            success: function(res){
                                if(res.code==0){
                                    let data = {};
                                    data.detailList = res.data.taskList[day] ? res.data.taskList[day].detailList:{};
                                    data.taskId = res.data.taskList[day].taskId;
                                    _this.trigger(data);
                                }
                            }
                        });
                    }
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    	
    },
    onGetCourseData(){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/my';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: token,
                    appId: docker.appId,
                    appType: 3,
                    timestamp : (new Date()).getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        _this.trigger({my: res.data.my,recommend: res.data.recommend,hot: res.data.hot});
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
        
    },
    onGetCourseCount(){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/general';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: token,
                    appId: docker.appId,
                    appType: 3,
                    days: 7,
                    timestamp : (new Date()).getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        _this.trigger({count: res.data});
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
        
    },
    onGetCourseList1(pageIndex){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/list';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: token,
                    appId: docker.appId,
                    appType: 3,
                    pageIndex: pageIndex,
                    pageRows: 10,
                    period: 2,
                    timestamp : (new Date()).getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        pullDown.style.display = 'none';
                        pullDownLabel.innerHTML = '下拉刷新';
                        pullUp.style.display = 'none';
                        pullUpLabel.innerHTML = '上拉加载更多...';
                        if(pageIndex===1){
                            dataList1 = res.data.list.concat([]);
                        }else{
                            dataList1 = dataList1.concat(res.data.list);
                            if(res.data.list.length===0){
                                _this.trigger({pageIndex:pageIndex-1});
                                showToast('已加载全部');
                            }
                        }
                        _this.trigger({items: dataList1});

                        
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
        
    },
    onGetCourseList2(pageIndex){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/list';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: token,
                    appId: docker.appId,
                    appType: 3,
                    pageIndex: pageIndex,
                    pageRows: 10,
                    period: 1,
                    timestamp : (new Date()).getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        pullDown.style.display = 'none';
                        pullDownLabel.innerHTML = '下拉刷新';
                        pullUp.style.display = 'none';
                        pullUpLabel.innerHTML = '上拉加载更多...';
                        if(pageIndex===1){
                            dataList2 = res.data.list.concat([]);
                        }else{
                            dataList2 = dataList2.concat(res.data.list);
                            if(res.data.list.length===0){
                                _this.trigger({pageIndex:pageIndex-1});
                                showToast('已加载全部');
                            }
                        }
                        _this.trigger({items: dataList2});

                        
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
        
    },
    onDelCourse(planId){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/exit';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: token,
                    appId: docker.appId,
                    planId: planId,
                    timestamp : (new Date()).getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        _this.onGetCourseData();
                    }else{
                        showToast('退出课程失败');
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    },
    onFinishCourse(planId,taskId,period){
        let _this = this;
        let sucFuc = (token)=>{
            let url = docker.host+'/v1/app/chairdressing/course/finish';
            let data = {};
            data.accessToken = token;
            data.appId = docker.appId;
            data.planId = planId;
            data.period = period;
            data.timestamp = (new Date()).getTime();
            period == 1 ? data.taskId = taskId : null;
            ajax({
                method: 'POST',
                url: url,
                data: data,
                async: true,
                success: function(res){
                    if(res.code===0){
                        _this.trigger({'coverShow':true});
                    }else{
                        
                    }
                }
            })
        }

        let errFuc = (tip)=>{
            alert('没有获取到token'+tip);
        }

        getToken(sucFuc,errFuc);
    }
});