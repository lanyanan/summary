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

let dataList = [];
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data, type){
        this.trigger(data);
    },
    onGetStrategy(strategyId){
    	let url = 'http://200.200.200.50/v1/app/chairdressing/strategy/details';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: '7957003df5b149539c9d6d135a7932c3',
                appId: 10101,
                appType: 3,
                strategyId:strategyId,
                timestamp : (new Date()).getTime()
            },
            async: true,
            success: function(res){
                if(res.code==0){
                	let data = res.data;
                    let triggerData = {};
                    let devicesArr = [];
                    let stepsArr = [];
                    triggerData.strategyId = data.strategyId;//方案ID
                    triggerData.title = data.title; //方案title
                    triggerData.descs = data.descs; //方案描述
                    triggerData.pic = data.pic; //方案图片
                    triggerData.tags = data.tags; //方案标签
                    //过滤提拉设备
                	data.devices.map((item,index)=>{
                		if(item.deviceTypeId == 35 && item.deviceSubtypeId == 1){
                			//
                		}else{
                			devicesArr.push(item)
                		}
                	});
                	data.steps.map((item,index)=>{
                		if(!/提拉/.test(item.stepTitle)){
                			stepsArr.push(item);
                		}
                	});
                    triggerData.devices = devicesArr; //方案设备列表
                    triggerData.steps = stepsArr; //方案步骤
                    _this.trigger(triggerData);
                }
            }
        });
    },
    onGetStep(stepId){
    	let url = 'http://200.200.200.50/v1/app/chairdressing/strategy/stepInfo';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: '7957003df5b149539c9d6d135a7932c3',
                appId: 10101,
                appType: 3,
                stepId:stepId,
                timestamp : (new Date()).getTime()
            },
            async: true,
            success: function(res){
                if(res.code==0){
                	let data = res.data;
                	het.setTitle(data.title);
                    _this.trigger(data);
                }
            }
        });
    },
    onUseMode(deviceTypeId,deviceSubtypeId,stepId) {
    	console.log(deviceTypeId,deviceSubtypeId,stepId);
    	let url = 'http://200.200.200.50/v1/app/chairdressing/strategy/activateMode';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: '7957003df5b149539c9d6d135a7932c3',
                appId: 10101,
                appType: 3,
                timestamp : (new Date()).getTime(),
                deviceTypeId:deviceTypeId,
                deviceSubtypeId: deviceSubtypeId,
                source:2,
                stepId:stepId
            },
            async: true,
            success: function(res){
                if(res.code==0){
                	_this.trigger({successShow:true});
                }else{
                	_this.trigger({failShow:true});
                }
            }
        });
    },
    onGetSceneList(pageIndex){
        let url = 'http://200.200.200.50/v1/app/chairdressing/strategy/list';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                accessToken: '7957003df5b149539c9d6d135a7932c3',
                appId: 10101,
                appType: 3,
                pageIndex: pageIndex,
                pageRows: 10,
                timestamp : (new Date()).getTime()
            },
            async: true,
            success: function(res){
                if(res.code==0){
                    pullDown.style.display = 'none';
                    pullDownLabel.innerHTML = '下拉刷新';
                    pullUp.style.display = 'none';
                    pullUpLabel.innerHTML = '上拉加载更多...';
                    if(pageIndex==1){
                        dataList = res.data.list.concat([]);
                    }else{
                        dataList = dataList.concat(res.data.list);
                        if(res.data.list.length===0){
                            _this.trigger({pageIndex:pageIndex-1});
                        }
                    }
                    _this.trigger({list: dataList});
                }
            }
        })
    }
});