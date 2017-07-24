'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const accessToken = het.getToken();

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

let dataList1 = [],dataList2 = [];
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data, type){
        this.trigger(data);
    },
    onGetSingleClass(planId){//获取单次课程详细信息
    	let url = 'http://200.200.200.50/v1/app/chairdressing/course/once';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
            	appId: 10101,
            	timestamp : (new Date()).getTime(),
                accessToken: accessToken,
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
    },
    onGetWeekClass(planId) {
    	let url = 'http://200.200.200.50/v1/app/chairdressing/course/period';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
            	appId: 10101,
            	timestamp : (new Date()).getTime(),
                accessToken: accessToken,
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
    },
    onJoinClass(planId){//添加课程
    	let url = 'http://200.200.200.50/v1/app/chairdressing/course/join';
        let _this = this;
        ajax({
            method: 'POST',
            url: url,
            data: {
            	appId: 10101,
            	timestamp : (new Date()).getTime(),
                accessToken: accessToken,
                planId:planId,
                appType: 3  
            },
            async: true,
            success: function(res){
                if(res.code==0){
                	_this.onGetSingleClass(planId);
                }
            }
        });
    },
    onStartClass(planId,period,day){
    	if(period == 2){
    		let url = 'http://200.200.200.50/v1/app/chairdressing/course/once';
	        let _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	            	appId: 10101,
	            	timestamp : (new Date()).getTime(),
	                accessToken: accessToken,
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
    		let url = 'http://200.200.200.50/v1/app/chairdressing/course/period';
	        let _this = this;
	        ajax({
	            method: 'GET',
	            url: url,
	            data: {
	            	appId: 10101,
	            	timestamp : (new Date()).getTime(),
	                accessToken: accessToken,
	                planId:planId,
	                appType: 3  
	            },
	            async: true,
	            success: function(res){
	                if(res.code==0){
	                	let data = res.data.taskList[day] ? res.data.taskList[day].detailList:{};
	                	_this.trigger({detailList:data});
	                }
	            }
	        });
    	}
    },
    onGetCourseData: function(){
        let url = 'http://200.200.200.50/v1/app/chairdressing/course/my';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: accessToken,
                appId: 10101,
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
    },
    onGetCourseCount(){
        let url = 'http://200.200.200.50/v1/app/chairdressing/course/general';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: accessToken,
                appId: 10101,
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
    },
    onGetCourseList1(pageIndex){
        let url = 'http://200.200.200.50/v1/app/chairdressing/course/list';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: accessToken,
                appId: 10101,
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
    },
    onGetCourseList2(pageIndex){
        let url = 'http://200.200.200.50/v1/app/chairdressing/course/list';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: accessToken,
                appId: 10101,
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
    },
});