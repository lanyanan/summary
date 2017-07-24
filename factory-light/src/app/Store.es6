'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */

import {Actions} from './Actions.es6';
import {Widgets} from '../modules/WidgetsPanel/Widgets.class.es6';
import {MakeHtml} from '../modules/MakeHtml/MakeHtml.es6';
import {URI} from '../config/app.config.es6'; // 配置信息
import Funs from '../../libs/fun.js';

var {Router, Route, hashHistory,Link} = ReactRouter;

// 仓储数据模型
const STORE_DATA = {
    mark:-1,
    title: '',
    operateBtns: {},
    controllerList:[
    ],
    widgetStyleList:{},
    previewUrl: '',
    widgets: {},
    protocolConfigs:[
        {
            typeName: '控制数据',
            type: 2,
            propertyConfigs: null,
        },
        {
            typeName: '运行数据',
            type: 3,
            propertyConfigs: null,
        }
    ],
    ghost: {},
    assets: {},
    phone: {height:800,minHeight:800},
    panelSwitch:{sizePanelSwitch:1,exteriorPanelSwitch:1,propertyPanelSwitch:1,codePanelSwitch:2,snapLineSwitch:1},
    pages: {
        activePage:0,
        activeWidget:-1,
        pageList:[
            {pageName:'主页',pageId:0,layoutImg:{},widgetList:[]}
        ]
    }
};

/**
 * 链接到当前页面的当前选中控件（可读可写）
 * @return   {object}   返回当前选中控件
 */
let linkActiveWidget = ()=>{
    let widget = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage]
        .widgetList[STORE_DATA.pages.activeWidget];
    if(typeof widget !== 'undefined') widget.unsaved = true; // 设置保存状态
    return widget;
};

/**
 * 计算传入的字符真实长度
 * @return {Number} 返回传入的字符的真实长度
 */
let calcRealLength = (caption,fontSize=16)=>{
    let span = document.getElementById("__getwidth");
    if (span == null) {
        span = document.createElement("span");
        span.id = "__getwidth";
        document.body.appendChild(span);
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
    }
    span.innerText = caption;
    span.style.fontSize = fontSize + "px";
    return span.offsetWidth;
};

/**
 * 计算传入的字符真实长度
 * @return {Number} 返回传入的字符的真实长度
 */
let calcRealHeight = (caption,fontSize=16)=>{
    let textarea = document.getElementById("__getheight");
    if (textarea == null) {
        textarea = document.createElement("textarea");
        textarea.id = "__getheight";
        document.body.appendChild(textarea);
        textarea.style.resize = 'none';
        textarea.style.visibility = "hidden";
        textarea.style.boxSizing = 'border-box';
    }
    textarea.value = caption;
    textarea.style.fontSize = fontSize + "px";
    return textarea.scrollHeight;
};

const STOREDATA = {
	loginFlag: false,
    ajaxError: false,
    ajaxErrorTips: false,
    ajaxLoad: false,
    SureAutoCloseTipsShow: false,
    loginName:"",
    pager:{},
    company: {
        companyErrorTips: ""
    },
    area: {
        areaErrorTips: ""
    },
    controller: {

    },
    authority: {

    },
    user: {

    }
}


//*添加store公共方法*/
// export const createStore = function(options,callback){

// 	let store;

//     let defaultOptions = {
// 	 	actionName: "", //方法名
// 	 	apiName: "", //api url
// 	 	method: "get", //请求方式get,post
// 	 	params: {} //请求参数
//     }

//     defaultOptions = Object.assign({},defaultOptions,options);

//     let opts = {
//         listenables: [LoginAction]
//     };

//     opts['on' + defaultOptions.actionName] = function(){

//     	callback&&callback();
//     }
    	
// 	fetch(defaultOptions.apiName, defaultOptions.params).then(response =>response.json()).then((data) =>{
// 		store.trigger(data);
//         callback&&callback();
//     }).catch(e => {
// 	  	STOREDATA.loginFlag = false;
// 	  	store.trigger(STOREDATA);
// 	});     
    
//     store = Reflux.createStore(opts)
//     return store;

// }

// export const LoginStore = createStore({
// 	actionName: "Login",
// 	apiName: "/v1/web/lighting/common/admin/loginCheck",
// 	params: {username: "lee1717",password: 123456}
// },function(){
	
// });


export const Store = Reflux.createStore({
    listenables: [Actions],
    onInitData(){
        STOREDATA.ajaxError = false;
        STOREDATA.ajaxErrorTips = false;
        STOREDATA.SureAutoCloseTipsShow = false;
        Store.trigger(STOREDATA);
    },
    onGetData(){
        Store.trigger(STOREDATA);
    },
    onLoginCheck(username,password){
        $.ajax({
            type: "POST",
            url: URI.loginCheck,
            data: {username:username,password:password},
            success: function(data){
                if(data.code === 0){
                    STOREDATA.loginName = data.data.userName;
                    Funs.setCookie("loginName",STOREDATA.loginName);
                    window.location = "#/company/companyinfo/1";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onLogout(){
        $.ajax({
            type: "POST",
            url: URI.logout,
            data: {},
            success: function(data){
                
                if(data.code === 0){
                    STOREDATA.loginName = "";
                    Funs.setCookie("loginName","");
                    window.location = "#";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetCompanyPageList(pageIndex = 1,pageRows = 10){
        $.ajax({
            type: "GET",
            url: URI.getCompanyPageList,
            data: {"pageIndex": pageIndex,"pageRows": pageRows},
            success: function(data){
                STOREDATA.ajaxLoad = true;
                if(data.code === 0){
                    STOREDATA.pager = data.data.pager;
                    STOREDATA.company.companyInfo =  data.data.list;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxLoad = true;
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetCompanyList(fn){
        $.ajax({
            type: "GET",
            url: URI.getCompanyList,
            data: {},
            success: function(data){
                if(data.code === 0){
                    STOREDATA.company.companyInfo =  data.data;
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
                if(fn)fn();
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onAddCompany(companyName,status){
        $.ajax({
            type: "GET",
            url: URI.addCompany,
            data: {"companyName":companyName,"status":status},
            success: function(data){
                if(data.code === 0){
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1000);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onDeleteCompany(companyId){
        $.ajax({
            type: "GET",
            url: URI.deleteCompany,
            data: {"companyId":companyId},
            success: function(data){
                if(data.code === 0){
                    console.log("删除成功");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onUpdateCompany(companyId,companyName,status){
        $.ajax({
            type: "GET",
            url: URI.updateCompany,
            data: {"companyId":companyId, "companyName": companyName, "status": status},
            success: function(data){
                if(data.code === 0){
                    console.log("更新成功");
                    hashHistory.goBack();
                    STOREDATA.ajaxErrorTips = false;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                    Store.trigger(STOREDATA);
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onGetRegionPageList(pageIndex = 1,pageRows = 10){
        $.ajax({
            type: "GET",
            url: URI.getRegionPageList,
            data: {"pageIndex": pageIndex,"pageRows": pageRows},
            success: function(data){
               
                STOREDATA.ajaxLoad = true;
                if(data.code === 0){
                    STOREDATA.pager = data.data.pager;
                    STOREDATA.area.areaInfo =  data.data.list;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxLoad = true;
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetRegionList(){
        $.ajax({
            type: "GET",
            url: URI.getRegionList,
            data: {},
            success: function(data){
                
                if(data.code === 0){
                    STOREDATA.area.areaInfo =  data.data;
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onAddRegion(companyId,areaName,status){
        $.ajax({
            type: "GET",
            url: URI.addRegion,
            data: {"companyId": companyId, "regionName": areaName, status: status},
            success: function(data){
                
                if(data.code === 0){
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1000);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onUpdateRegion(regionId,companyId,areaName,status){
        $.ajax({
            type: "GET",
            url: URI.updateRegion,
            data: {regionId: regionId, "companyId": companyId, "regionName": areaName, status: status},
            success: function(data){
               
                if(data.code === 0){
                    console.log("更新成功");
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1200);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onDeleteRegion(regionId){
        $.ajax({
            type: "GET",
            url: URI.deleteRegion,
            data: {regionId: regionId},
            success: function(data){
                if(data.code === 0){
                    console.log("删除成功");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onGetPageController(pageIndex = 1,pageRows = 10){
        $.ajax({
            type: "GET",
            url: URI.getPageController,
            data: {"pageIndex": pageIndex,"pageRows": pageRows},
            success: function(data){
                
                STOREDATA.ajaxLoad = true;
                if(data.code === 0){
                    STOREDATA.pager = data.data.pager;
                    STOREDATA.controller.controllerInfo =  data.data.list;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                
                STOREDATA.ajaxLoad = true;
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetController(){
        $.ajax({
            type: "GET",
            url: URI.getController,
            data: {},
            success: function(data){
                
                if(data.code === 0){
                    STOREDATA.controller.controllerInfo =  data.data;
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetAuthorityPageList(pageIndex = 1,pageRows = 10){
        $.ajax({
            type: "GET",
            url: URI.getAuthorityPageList,
            data: {"pageIndex": pageIndex,"pageRows": pageRows},
            success: function(data){
               
                STOREDATA.ajaxLoad = true;
                if(data.code === 0){
                    STOREDATA.pager = data.data.pager;
                    STOREDATA.authority.authorityInfo =  data.data.list;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxLoad = true;
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetAuthorityList(fn){
        $.ajax({
            type: "GET",
            url: URI.getAuthorityList,
            data: {},
            success: function(data){
                
                if(data.code === 0){
                    STOREDATA.authority.authorityInfo =  data.data;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
                if(fn)fn();
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onAddAuthority(companyId,authorityName,status){
        $.ajax({
            type: "GET",
            url: URI.addAuthority,
            data: {"companyId": companyId, "authorityName": authorityName, status: status},
            success: function(data){
                if(data.code === 0){
                    console.log('增加成功');
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1000);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onUpdateAuthority(authorityId,companyId,authorityName,status){
        $.ajax({
            type: "GET",
            url: URI.updateAuthority,
            data: {authorityId: authorityId, "companyId": companyId, "authorityName": authorityName, status: status},
            success: function(data){
                
                if(data.code === 0){
                    console.log("更新成功");
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1200);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onDeleteAuthority(authorityId){
        $.ajax({
            type: "GET",
            url: URI.deleteAuthority,
            data: {authorityId: authorityId},
            success: function(data){
                if(data.code === 0){
                    console.log("删除成功");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onGetUserPageList(pageIndex = 1,pageRows = 10){
        $.ajax({
            type: "GET",
            url: URI.getUserPageList,
            data: {"pageIndex": pageIndex,"pageRows": pageRows},
            success: function(data){
                
                STOREDATA.ajaxLoad = true;
                if(data.code === 0){
                    STOREDATA.pager = data.data.pager;
                    STOREDATA.user.userInfo =  data.data.list;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxLoad = true;
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onGetUserList(){
        $.ajax({
            type: "GET",
            url: URI.getUserList,
            data: {},
            success: function(data){
                
                if(data.code === 0){
                    STOREDATA.user.userInfo =  data.data;
                }else{
                    STOREDATA.ajaxError = true;
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
                STOREDATA.ajaxError = true;
                STOREDATA.ajaxErrorTips = "ajax错误";
                Store.trigger(STOREDATA);
            }
        });
    },
    onAddUser(opt){
        $.ajax({
            type: "POST",
            url: URI.addUser,
            data: opt,
            success: function(data){
                if(data.code === 0){
                    console.log('增加用户成功');
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1000);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onUpdateUser(opt){
        $.ajax({
            type: "GET",
            url: URI.updateUser,
            data: opt,
            success: function(data){
                
                if(data.code === 0){
                    console.log("更新成功");
                    setTimeout(function(){
                        hashHistory.goBack();
                    },1200);
                    STOREDATA.ajaxErrorTips = false;
                    STOREDATA.SureAutoCloseTipsShow = true;
                }else if(data.code === 100010110){
                    window.location = "#/";
                }else{
                    STOREDATA.ajaxErrorTips = data.msg;
                }
                Store.trigger(STOREDATA);
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onDeleteUser(userId){
        $.ajax({
            type: "GET",
            url: URI.deleteUser,
            data: {userId: userId},
            success: function(data){
                if(data.code === 0){
                    console.log("删除成功");
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    },
    onLoadStoreData(regionId){
        let _this = this;
        STORE_DATA.regionId = regionId;
        STORE_DATA.layoutUiId = '';
        STORE_DATA.status = 1;
        STORE_DATA.pages.pageList[0].widgetList = []
        STORE_DATA.pages.pageList[0].layoutImg = {};
        $.ajax({
            type: 'POST',
            url: URI.getProject,
            data: {
                regionId:regionId
            },
            dataType: 'json',
            success: function(data){
                if(data.code==0){
                    if(data.data!=null){
                        STORE_DATA.regionId = data.data.regionId;
                        STORE_DATA.layoutUiId = data.data.layoutUiId;
                        STORE_DATA.status = data.data.status;
                        (data.data.layoutUiDetailVOs || []).forEach(widget=>{try{
                        STORE_DATA.pages.pageList[widget.pageNo || 0]
                            .widgetList.push(Widgets.parseUserWidget(widget));
                        }catch(e){}})
                        STORE_DATA.pages.pageList[0].layoutImg = data.data.pageConfigs.length>200?(JSON.parse(data.data.pageConfigs)).layoutImg:{};
                        _this.trigger(STORE_DATA);        
                    }else {
                        STORE_DATA.layoutUiId = '';
                        STORE_DATA.pages.pageList[0].widgetList = []
                        STORE_DATA.pages.pageList[0].layoutImg = {};
                        _this.trigger(STORE_DATA);     
                    }
                   
                }else{
                    alert("请求出错")
                }
            }
        });

        $.ajax({
            type: 'POST',
            url: URI.getControllerList,
            data: {
                regionId:regionId
            },
            dataType: 'json',
            success: function(data){
                if(data.code==0){
                    STORE_DATA.controllerList = data.data
                    _this.trigger(STORE_DATA);
                }else{
                    alert("请求出错")
                }
            }
        });
        //拉取控制器列表
        this.onGetRelatedSwitch(regionId)
        //拉取控制器列表
        $.ajax({
            type: 'POST',
            url: URI.getWidgetStyleList,
            data: {
            },
            dataType: 'json',
            success: function(data){
                let obj = STORE_DATA.widgetStyleList;
                if(data.code==0 && data.data instanceof Array){
                    data.data.map((item,index)=>{
                        if(item.htmlWidgetId==25){
                            obj.light = item.styleList;
                        }else if(item.htmlWidgetId==26){
                            obj.people = item.styleList;
                        }
                    })
                    _this.trigger(STORE_DATA);
                    sessionStorage.setItem('styleList',JSON.stringify(obj));
                }
            }
        })

        $.ajax({
            type: 'GET',
            url: URI.getProtoConfig +'?productId='+ 2147,
            data: {
            },
            dataType: 'json',
            success: function(data){
                STORE_DATA.protocolConfigs = data.protocolConfigs;
                _this.trigger(STORE_DATA);
            }
        })
        /*fetch(URI.getProject, {credentials:'include'}).then(response=>response.json()).then(({data})=>{
            console.log(data)
            productId = productId ? productId : data.productId;
            STORE_DATA.projectId = projectId;
            STORE_DATA.title = data.projectName;
            STORE_DATA.remark = data.remark;
            STORE_DATA.productId = data.productId;
            STORE_DATA.pages.pageList = JSON.parse(data.pageConfigs) || [{pageName:'主页',pageId:0,widgetList:[]}];
            
           ;
            return fetch(URI.getProtoConfig+'?productId='+productId, {credentials:'include'});
        }).then(response=>response.json()).then(({data})=>{
            STORE_DATA.protocolConfigs = data.protocolConfigs;
            document.querySelector('#systemTitle').innerText=data.productName;
            OH.push(STORE_DATA);
            this.trigger(STORE_DATA);
            return fetch(URI.getWidgetStyleList,{credentials:'include'}).then(response=>response.json()).then((data)=>{
                STORE_DATA.widgetStyleList = {};
                let obj = STORE_DATA.widgetStyleList;
                if(data.code==0 && data.data instanceof Array){
                    data.data.map((item,index)=>{
                        obj[item.code] = item.styleList;
                    })
                    this.trigger(STORE_DATA);
                    sessionStorage.setItem('styleList',JSON.stringify(obj));
                }else{
                    console.log('请求控件样式列表数据错误');
                }
            });
        });*/
    },
    onGetRelatedSwitch(regionId){
        let _this = this;
        $.ajax({
            type: 'POST',
            url: URI.relatedSwitch,
            data: {
                regionId:regionId
            },
            dataType: 'json',
            success: function(data){
                if(data.code==0){
                    STORE_DATA.relatedSwitchList = data.data
                    _this.trigger(STORE_DATA);
                }else{
                    alert("请求出错")
                }
            }
        });
    },
    onSaveProject(regionId, status){
        let html = "<html></html>";
        let pageConfigs = STORE_DATA.pages.pageList.map(page=>{
            return {pageName:page.pageName, pageId:page.pageId, widgetList:[],pageColor:page.pageColor};
        });
      /*  if (STORE_DATA.projectId) { // 编辑模式需提交projectId
            formData.append('layoutUiId', STORE_DATA.projectId);
        }*/
        let data = {
            regionId:STORE_DATA.regionId,
            status:STORE_DATA.status,
            htmlText:html,
            pageConfigs:JSON.stringify(pageConfigs)
        }
        $.ajax({
          type: 'POST',
          url: URI.saveProject,
          data: data,
          success: function(data){
            STORE_DATA.layoutUiId = data.data.layoutUiId
            
          },
          dataType: 'json'
        });
       /* fetch(URI.saveProject, {method:'post', body:formData, credentials:'include'}).then(response=>response.json())
            .then(({data})=>STORE_DATA.projectId = data.data.layoutUiId);
        this.onSaveWidgets();*/
    },
    onMakeHtml(preview=false){
        let _this = this;
        let html = new MakeHtml(STORE_DATA);
        let pageData = {
            pageName:'主页',pageId:0,layoutImg:STORE_DATA.pages.pageList[0].layoutImg,widgetList:[]
        };
        let pageConfigs = pageData;
      /*  if (STORE_DATA.projectId) { // 编辑模式需提交projectId
            formData.append('layoutUiId', STORE_DATA.projectId);
        }*/
        let data = {
            regionId:STORE_DATA.regionId,
            layoutUiId:STORE_DATA.layoutUiId?STORE_DATA.layoutUiId:'',
            status:STORE_DATA.status,
            htmlText:html.getHtml(),
            pageConfigs:JSON.stringify(pageConfigs)
        }
        $.ajax({
          type: 'POST',
          url: URI.saveProject,
          data: data,
          success: function(data){
            if(data.code==0){
                
                if(data.data!=null){
                    STORE_DATA.layoutUiId = data.data;
                    alert('布局保存成功')
                }
            }else{
                alert(data.msg)
            }
          },
          dataType: 'json'
        });
    },
    onPublishProject(title, remark){
        STORE_DATA.title = title;
        STORE_DATA.remark = remark;
        this.onMakeHtml();
    },
    onSaveWidgets(){
        let widgetIndex = 1;
        STORE_DATA.pages.pageList.forEach((page, index)=>page.widgetList.forEach(w=>{
            if (w.unsaved) {
                if(w.bindDeviceId){
                    
                }
                this.onSaveWidget(w, index, widgetIndex);
                widgetIndex+=1;
            }
        }));
        this.onMakeHtml();
        this.onGetRelatedSwitch(STORE_DATA.regionId);
    },
    onSaveWidget(widget, pageIndex=0, widgetIndex=1){
        let formData = {
            uiDetailId: widget.uiDetailId || '',
            layoutUiId:STORE_DATA.layoutUiId,
            lightDeviceId:widget.lightDeviceId,
            pageNo:pageIndex,
            widgetIndex:widgetIndex,
            widgetProperties:Widgets.stringifyUserWidget(widget),
            widgetName:widget.caption,
            css:widget.cssCode || '',
            html:widget.htmlCode || '',
            js:widget.jsCode || '',
            abscissaX:parseInt(widget.left),
            ordinaryY:parseInt(widget.top),
            deviceName:widget.caption,
            deviceId:widget.bindDeviceId || '',
            isSwitch:'',
            deviceCode:widget.code || 0
        }
        if(widget.id==1001){
            formData.isSwitch = 1;
        }else if(widget.id==1002) {
            let text = '';
            if(widget.switchIds){
                    widget.switchIds.map((item, index)=>{
                    text = text + item.lightDeviceId +","
                }) 
            }
            formData.switchIds = text || []
            formData.isSwitch = 0;
        }
        
        $.ajax({
          type: 'POST',
          url: URI.saveWidget,
          data: formData,
          success: function(data){
            if(data.code==0){
                widget.uiDetailId = data.data.uiDetailId;
                widget.lightDeviceId = data.data.lightDeviceId;
                widget.unsaved = false;
                STORE_DATA.mark = 1;
            }else{
                alert(widget.caption+data.msg)
            }
          },
          dataType: 'json'
        });
        //let formData = new FormData();
       /* widget.unsaved = false;
        formData.append('projectId', STORE_DATA.projectId);
        widget.widgetId && formData.append('widgetId', widget.widgetId);
        formData.append('widgetName', widget.caption);
        formData.append('widgetProperties', Widgets.stringifyUserWidget(widget));
        formData.append('html', widget.htmlCode || '');
        formData.append('js', widget.jsCode || '');
        formData.append('css', widget.cssCode || '');
        formData.append('widgetIndex',widgetIndex);
        formData.append('pageNo', pageIndex);
        fetch(URI.saveWidget, {method:'post', body:formData, credentials:'include'}).then(response=>response.json())
            .then(({data})=> widget.widgetId=data.widgetId);*/
    },
    onChangePage(index){
        if(index==0) STORE_DATA.pages.pageList[index].pageId = 0;
        STORE_DATA.pages.activePage = index;
        STORE_DATA.pages.activeWidget = -1;
        STORE_DATA.ghost.display = false;
        this.trigger(STORE_DATA);
    },
    onDeletePage(index){
        if(STORE_DATA.pages.pageList.length<=1) return;
        if(STORE_DATA.pages.pageList[index].widgetList instanceof Array){
            let widgetDelId = '';
            let arrLength = STORE_DATA.pages.pageList[index].widgetList.length;
            STORE_DATA.pages.pageList[index].widgetList.map((item,i)=>{
                if(i==arrLength-1){
                    widgetDelId =  widgetDelId+item.widgetId;
                }else{
                    widgetDelId =  widgetDelId+item.widgetId+',';
                }
            })
            if(widgetDelId){
                fetch(URI.delWidgetList+'?widgetId='+widgetDelId, {credentials:'include'})
                .then(response=>response.json())
                .then((data)=>{});
            }
        }
        STORE_DATA.pages.pageList.splice(index,1);
        STORE_DATA.pages.activePage = 0;
        this.trigger(STORE_DATA);
    },
    onCreatePage(index,page,type){
        if(STORE_DATA.pages.pageList[index+1] !== page && type!=='copy'){
            STORE_DATA.pages.pageList.splice(index+1,0,page);
        }else if(type==='copy'){
            STORE_DATA.pages.pageList.push(page);
        }
        STORE_DATA.pages.activePage = index+1;
        this.trigger(STORE_DATA);
    },
    onRenamePage(index,name){
        STORE_DATA.pages.pageList[index].pageName = name;
        STORE_DATA.pages.activePage = index;
        this.trigger(STORE_DATA);
    },
    onChangePageColor(index,color){
        STORE_DATA.pages.pageList[index].pageColor = color;
        this.trigger(STORE_DATA);
    },
    onAddUserWidget(item){
        let list = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList;
        if(item.width==800 || item.left<0) item.left=0;
        if((Number(item.left)+Number(item.width))>800) item.left = 800-item.width;
        if(Number(item.top)+Number(item.height)>STORE_DATA.phone.height) STORE_DATA.phone.height=Number(item.top)+Number(item.height);
        list.push(item);
        this.onSelectUserWidget(list.length-1, {top: item.top, left: item.left});
    },
    onSelectUserWidget(index, data=null){
        STORE_DATA.pages.activeWidget = index;
        let widget = linkActiveWidget();
        sessionStorage.setItem('activeWidget',widget?widget.userWidgetID:'');
        if (data) {
            if(widget.id==1002){
                widget.propertySet[0].statusVisibility = 2;
            }
            STORE_DATA.ghost = Object.assign({display:true, width:widget.width, height:widget.height,rotate:widget.rotate}, data);
            STORE_DATA.ghost.dragable = (widget.id===1008 || widget.id===1014)?false:true;
        } else {
            STORE_DATA.ghost.display = false;
        }
        this.trigger(STORE_DATA);
        //if(data) document.querySelector('.main-view').scrollTop = widget.top;//用于修复笔记本高度不够选中未显示控件问题
    },
    onMoveUserWidget(x, y){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.left = STORE_DATA.ghost.left = Number(STORE_DATA.ghost.left)+x;
        widget.top = STORE_DATA.ghost.top = Number(STORE_DATA.ghost.top)+y;
        this.trigger(STORE_DATA);
    },
    onResizeUserWidget(offsetTop, offsetLeft, offsetWidth, offsetHeight){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined' || widget.id===1008 || widget.id===1014) return;
        if (widget.width+offsetWidth>1) {
            widget.left = STORE_DATA.ghost.left += offsetLeft;
            if(widget.isRatio==1){
                widget.height=STORE_DATA.ghost.height=Number(widget.width+offsetWidth)*Number(widget.height)/Number(widget.width);
            }
            widget.width = STORE_DATA.ghost.width += offsetWidth;
        }
        if(widget.height+offsetHeight>1) {
            widget.top = STORE_DATA.ghost.top += offsetTop;
            if(widget.isRatio==1){
                widget.width=STORE_DATA.ghost.width=Number(widget.height+offsetHeight)*Number(widget.width)/Number(widget.height);
            }
            widget.height = STORE_DATA.ghost.height += offsetHeight;
        }
        this.trigger(STORE_DATA);
    },
    onRotateUserWidget(rotate, rotateWidth, rotateHeight){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined' || widget.id===1008 || widget.id===1014) return;
        widget.rotate = STORE_DATA.ghost.rotate = rotate;
        widget.rotateWidth = STORE_DATA.ghost.rotateWidth = rotateWidth;
        widget.rotateHeight = STORE_DATA.ghost.rotateHeight = rotateHeight;
        this.trigger(STORE_DATA);
    },
    onChangeFgColor(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.fgColor = value;
        this.trigger(STORE_DATA);
    },
    onChangeBorderColor(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.borderColor = value;
        this.trigger(STORE_DATA);
    },
    onChangeBgColor(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.bgColor = value;
        this.trigger(STORE_DATA);
    },
    onChangeWidgetOpacity(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.widgetOpacity = value;
        this.trigger(STORE_DATA);
    },
    onChangeBorderWidth(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.borderWidth = value;
        this.trigger(STORE_DATA);

    },
    onChangeExterior(type,value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget[type] = value;
        this.trigger(STORE_DATA);
    },
    onShowPanel(type){
        switch(type){
            case 'sizePanel':
                 STORE_DATA.panelSwitch.sizePanelSwitch  = STORE_DATA.panelSwitch.sizePanelSwitch==1?2:1;
            break;
            case 'exteriorPanel':
                STORE_DATA.panelSwitch.exteriorPanelSwitch  = STORE_DATA.panelSwitch.exteriorPanelSwitch==1?2:1;
            break;
            case 'propertyPanel':
                STORE_DATA.panelSwitch.propertyPanelSwitch  = STORE_DATA.panelSwitch.propertyPanelSwitch==1?2:1;
            break;
            case 'codePanel':
                STORE_DATA.panelSwitch.codePanelSwitch  = STORE_DATA.panelSwitch.codePanelSwitch==1?2:1;
            break;
            case 'snapLine':
                STORE_DATA.panelSwitch.snapLineSwitch  = STORE_DATA.panelSwitch.snapLineSwitch==1?2:1;
            break;
            case 'rightPanel':
                STORE_DATA.panelSwitch.sizePanelSwitch  = STORE_DATA.panelSwitch.sizePanelSwitch==1?2:1;
                STORE_DATA.panelSwitch.exteriorPanelSwitch  = STORE_DATA.panelSwitch.exteriorPanelSwitch==1?2:1;
                STORE_DATA.panelSwitch.propertyPanelSwitch  = STORE_DATA.panelSwitch.propertyPanelSwitch==1?2:1;
            break;
            default:;
        }
        this.trigger(STORE_DATA);
    },
    onResizeCanvas(value){
        STORE_DATA.phone.height = (STORE_DATA.phone.height + value) > STORE_DATA.phone.minHeight ? (STORE_DATA.phone.height + value) : STORE_DATA.phone.minHeight;
        this.trigger(STORE_DATA);
    },
    drawSelectCover(display, top, left, width, height){
        STORE_DATA.selectCover = {display, top, left, width, height};
        this.trigger(STORE_DATA);
    },
    onDelUserWidget(index=-1){
        let widget = linkActiveWidget();
        index = index===-1 ? STORE_DATA.pages.activeWidget : index;
        if (index<0) return; // 当前无控件被选中
        widget.uiDetailId && fetch(URI.delWidget+'?uiDetailId='+widget.uiDetailId, {credentials:'include'}).then(response=>response.json()).then((data)=>{
            if(data.code==0){
                this.onGetRelatedSwitch(STORE_DATA.regionId);
            }
        }); // 从服务器删除
        
        STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList.splice(index,1);
        STORE_DATA.pages.activeWidget = -1;
        STORE_DATA.ghost.display = false;
        this.trigger(STORE_DATA);
    },
    onAddProperty(){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        let multi = typeof widget.scheme !== 'undefined' ? widget.scheme.find((s)=>/^multi/.test(s)) : '';
        let len = multi.indexOf('multi')>-1 ? multi.match(/\[(\d+)\]/)[1] : 0;
        if(len==0 || widget.propertySet.length<len){
            let newId = widget.propertySet.length+1;
            let newproperty = JSON.parse(JSON.stringify(widget.propertySet[0]));
                newproperty.propertyId = newId;
                newproperty.statusVisibility = 2;
                widget.propertySet.push(newproperty);
        }else{
            return;
        }
        this.trigger(STORE_DATA);
    },
    onUploadPageBgImage(formData,imgSrc,imgWidth,imgHeight){
        STORE_DATA.pages.pageList[0].layoutImg.src = imgSrc;
        STORE_DATA.pages.pageList[0].layoutImg.height = imgHeight;
        STORE_DATA.pages.pageList[0].layoutImg.width = imgWidth;
        this.trigger(STORE_DATA);
    },
    onUploadBgImage(pid,formData,imgWidth,imgHeight){
        let widget = linkActiveWidget();
            if(typeof widget === 'undefined') return;
        fetch(URI.uploadFile, {method:'post', body:formData, credentials:'include'}).then(response=>response.json())
            .then(({data})=>{
                widget.bgImagePath = data.fileUrl;
                widget.propertySet[0].statusSet[pid].bgImagePath = data.fileUrl;
                if(widget.propertySet[0].activeStatus === pid){
                    widget.height = STORE_DATA.ghost.height= Number(imgHeight);
                    widget.width = STORE_DATA.ghost.width= Number(imgWidth);
                }
                this.trigger(STORE_DATA);
            });
    },
    onChangeBooleanProperty(pid,typefield){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.propertySet[0][typefield] = widget.propertySet[0][typefield]==1?2:1;
        this.trigger(STORE_DATA);
    },
    onChangeStringProperty(pid,typefield,newvalue){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(typefield=='multipleText'){
            if(widget.id == 1001 || widget.id == 1005){
                let fontSize = widget.id == 1001?40:20;
                fontSize = widget.propertySet[0].fontSize || fontSize;
                let nowLength = calcRealLength(newvalue,fontSize);
                // let nowLength = calcRealLength(newvalue,16);
                // nowLength = nowLength>288 ? 288 :nowLength;
                //nowLength = (nowLength+2*fontSize)<widget.width ? widget.width : nowLength+2*fontSize;
                // nowLength = nowLength<widget.width ? widget.width : nowLength;
                //widget.width = STORE_DATA.ghost.width = nowLength;
                widget.propertySet[0].multipleText = newvalue;
            }
            if(widget.id == 1002){
                let fontSize = widget.propertySet[0].fontSize || 16;
                let nowLength = calcRealHeight(newvalue,fontSize);
                nowLength = nowLength<42 ? 58 :nowLength+fontSize;
                nowLength = nowLength<widget.height ? widget.height : nowLength;
                widget.height = STORE_DATA.ghost.height = nowLength;
                widget.propertySet[0].multipleText = newvalue;
            }
            widget.editText = newvalue;
        }
        widget.propertySet[0][typefield] = newvalue;
        this.trigger(STORE_DATA);
    },
    onChangeEventType(pid,eventType){
        //pid为属性id(用于多个属性时区分),eventType为被选中的事件类型
        let widget = linkActiveWidget();
            if(typeof widget === 'undefined') return;
            widget.propertySet[0].eventSet[pid].eventType = eventType;
            widget.propertySet[0].eventSet[pid].updateFlag = undefined;
            widget.propertySet[0].eventSet[pid].eventField = '';
            widget.propertySet[0].eventSet[pid].eventValue = '';
         this.trigger(STORE_DATA);
    },
    onChangeField(property,pid,typeid,options,byteLength,timetype){
        //property为被选中的字段属性 pid为属性id(用于多个属性时区分) typeid为相应type(控制/运行/故障/设备数据)
        let widget = linkActiveWidget(),
            type = STORE_DATA.protocolConfigs.sort((a,b)=>{return b.type-a.type})[typeid].type;
            if(typeof widget === 'undefined') return;
            switch(type){
                case 2:
                    if(widget.id==1014 && timetype=='colortype'){
                         widget.propertySet[0].eventSet[pid].colorType = property;
                         this.trigger(STORE_DATA);
                         return;
                    }
                    if((widget.id==1011||widget.id==1014) && timetype){
                        widget.propertySet[0].eventSet[pid][timetype+'Set'] = {
                            field:property,
                            updateFlag:options===null?undefined:options,
                            byteLength:byteLength || 0,
                            eventValue:''
                        };
                    }else{
                        widget.propertySet[0].eventSet[pid].eventField = property;
                        widget.propertySet[0].eventSet[pid].updateFlag = options===null?undefined:options;
                        widget.propertySet[0].eventSet[pid].byteLength = byteLength || 0;
                        widget.propertySet[0].eventSet[pid].eventValue = '';
                    }
                break;
                case 3:
                    if(timetype==='hour') widget.propertySet[0].statusSet[pid].hourField = property;
                    if(timetype==='minute') widget.propertySet[0].statusSet[pid].minuteField = property;
                    widget.propertySet[0].statusSet[pid].statusField = property;
                    widget.propertySet[0].statusSet[pid].statusValue = options || '';
                break;
                default:;
            }
         this.trigger(STORE_DATA);
    },
    onChangeValue(pid,typeid,svalue){
        //pid,typeid同上 svalue为用户选中/输入值
        let widget = linkActiveWidget(),
            type = STORE_DATA.protocolConfigs.sort((a,b)=>{return b.type-a.type})[typeid].type;
            if(typeof widget === 'undefined') return;
            switch(type){
                case 2:
                    if(!widget.propertySet[0].eventSet[pid].eventField) return;
                    widget.propertySet[0].eventSet[pid].eventValue = svalue;
                break;
                case 3:
                    if(!widget.propertySet[0].statusSet[pid].statusField) return;
                    widget.propertySet[0].statusSet[pid].statusValue = svalue;
                break;
                default:;
            }
         this.trigger(STORE_DATA);
    },
    onChangeCheckedPage(pid,pageId){
        //pid为属性id(用于多个属性时区分),pageId为被选中的页面的Id
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
            widget.propertySet[0].eventSet[pid].checkedPageId = pageId;
         this.trigger(STORE_DATA);
    },
    onChangeSize(type,value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        switch(type){
            case 'x':
                widget.left=STORE_DATA.ghost.left=value;
            break;
            case 'y':
                widget.top=STORE_DATA.ghost.top=value;
            break;
            case 'caption':
                widget.caption=STORE_DATA.ghost.caption=value;
            break;
            default:;
        }
        this.trigger(STORE_DATA);
    },
    onMarkCopyingUserWidget(){ // copy标记
        let widget = linkActiveWidget();
        widget._copying = true; // 准备复制
    },
    onPasteUserWidget(){ // 粘贴操作
        let list = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage].widgetList,
            widget = linkActiveWidget(),
            newWidget = {};
        if (typeof widget === 'undefined' || !widget._copying) return; // 没有复制
        //widget._copying = false;
        //Object.assign(newWidget, widget);
        newWidget = JSON.parse(JSON.stringify(widget));
        newWidget.userWidgetID = Widgets.newUserWidgetID();
        newWidget.widgetId = null;
        newWidget.top += 10;
        newWidget.left += 10;
        this.onAddUserWidget(newWidget);
    },
    onUpZIndexUserWidget(){
        let widget = linkActiveWidget();
        widget.zIndex = widget.zIndex ? widget.zIndex+1 : 1;
        this.trigger(STORE_DATA);
    },
    onDownZIndexUserWidget(){
        let widget = linkActiveWidget();
        widget.zIndex = widget.zIndex!==undefined ? widget.zIndex-1 : 0;
        this.trigger(STORE_DATA);
    },
    onHistoryGo(index){
        OH.go(index).then((data)=>{
            Object.assign(STORE_DATA, data);
            this.trigger(STORE_DATA);
        });
    },
    onHistoryBack(){
        OH.back().then((data)=>{
            Object.assign(STORE_DATA, data);
            this.trigger(STORE_DATA);
        });
    },
    onHistoryForward(){
        OH.forward().then((data)=>{
            Object.assign(STORE_DATA, data);
            this.trigger(STORE_DATA);
        });
    },
    onHistoryPush(){// 存储一条历史记录 非特殊情况不建议使用，建议写OH.push(STORE_DATA)
    },
    onRefreshState(){
        this.trigger(STORE_DATA);
    },
    onChangeWidgetCode (type, code , activeWidget=-1){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined'){
            widget = STORE_DATA.pages.pageList[STORE_DATA.pages.activePage]
                .widgetList[activeWidget];
            if(typeof widget === 'undefined') return;
        }
        switch(type){
            case 'css':
            let copycode = code;
            if(code.indexOf(widget.userWidgetID)===-1){
                copycode = code.replace(/\.(.*)\{/,(match,match2)=>{
                //给css代码加上唯一的userWidgetID标识
                widget.className = match2.replace(/\s/g,'')+widget.userWidgetID;
                return '.'+widget.className+'{'});
            }
            widget.cssCode = copycode;
            break;
        }
        // OH.push(STORE_DATA);
        this.trigger(STORE_DATA);
    },
    onChangeCommandType (pid,type){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.propertySet[0].eventSet[pid].commandType = type;
        widget.propertySet[0].eventSet[pid].checkedCommandList = [];
        widget.propertySet[0].eventSet[pid].commandConfigList = [];
        this.trigger(STORE_DATA);
    },
    onAddCheckedCommand (pid,property,updateFlag,byteLength){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        let event = widget.propertySet[0].eventSet[pid];
        widget.propertySet[0].eventSet[pid].checkedCommandList = typeof event.checkedCommandList==='undefined'?[]:event.checkedCommandList;
        widget.propertySet[0].eventSet[pid].commandConfigList = typeof event.commandConfigList==='undefined'?[]:event.commandConfigList;
        let obj={};
        obj.field = property;
        obj.byteLength = byteLength;
        obj.updateFlag = updateFlag;
        widget.propertySet[0].eventSet[pid].checkedCommandList.push(property);
        widget.propertySet[0].eventSet[pid].commandConfigList.push(obj);
        this.trigger(STORE_DATA);
    },
    onDelCheckedCommand(pid,property){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        let index = Number(widget.propertySet[0].eventSet[pid].checkedCommandList.indexOf(property));
        widget.propertySet[0].eventSet[pid].checkedCommandList.splice(index,1);
        widget.propertySet[0].eventSet[pid].commandConfigList.splice(index,1);
        this.trigger(STORE_DATA);
    },
    onChangeWidgetCaption(caption){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.caption = caption;
        this.trigger(STORE_DATA);
    },
    onAddCheckedWidget(property,type,pid,wid){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined' || !property) return;
        if(type=='show'){
            widget.propertySet[0].eventSet[pid].showWidgetList =typeof widget.propertySet[0].eventSet[pid].showWidgetList==='undefined'?
            []:widget.propertySet[0].eventSet[pid].showWidgetList;
            widget.propertySet[0].eventSet[pid].showWidgetList.push(property);
            let set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
            set['index'] = 0;
            widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        }else if(type=='hidden'){
            widget.propertySet[0].eventSet[pid].hiddenWidgetList =typeof widget.propertySet[0].eventSet[pid].hiddenWidgetList==='undefined'?
            []:widget.propertySet[0].eventSet[pid].hiddenWidgetList;
            widget.propertySet[0].eventSet[pid].hiddenWidgetList.push(property);
        }
        this.trigger(STORE_DATA);
    },
    onDelCheckedWidget(property,type,pid,wid){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(type=='show'){
            let index = Number(widget.propertySet[0].eventSet[pid].showWidgetList.indexOf(property));
            widget.propertySet[0].eventSet[pid].showWidgetList.splice(index,1);
            let set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
            set['index'] = -1;
            widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        }else if(type=='hidden'){
            let index = Number(widget.propertySet[0].eventSet[pid].hiddenWidgetList.indexOf(property));
            widget.propertySet[0].eventSet[pid].hiddenWidgetList.splice(index,1);
        }
        this.trigger(STORE_DATA);
    },
    onChangeWidgetText(editText){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(widget.id == 1001 || widget.id == 1005){
            let fontSize = widget.id == 1001?40:20;
            fontSize = widget.propertySet[0].fontSize || fontSize;
            let nowLength = calcRealLength(editText,fontSize);
            nowLength = (nowLength+1*fontSize)<widget.width ? widget.width : nowLength+0*fontSize;
            widget.width = STORE_DATA.ghost.width = nowLength;
            widget.propertySet[0].multipleText = editText;
        }
        if(widget.id == 1002){
            let fontSize = widget.propertySet[0].fontSize || 16;
            let nowLength = calcRealHeight(editText,fontSize);
            nowLength = nowLength<42 ? 58 :nowLength+fontSize;
            nowLength = nowLength<widget.height ? widget.height : nowLength;
            widget.height = STORE_DATA.ghost.height = nowLength;
            widget.propertySet[0].multipleText = editText;
        }
        widget.editText = editText;
        this.trigger(STORE_DATA);
    },
    onAddEvent(index,status){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        let newEvent = {eventType:1,eventValue:'',activeStatusField:{},
            eventField:'',checkedPageId:'',hiddenWidgetList:[],showWidgetList:[]};
        widget.propertySet[0].eventSet.splice(index+1,0,newEvent);
        this.trigger(STORE_DATA);
        if(status === "false"){
        }else{}
    },
    onDelEvent(index){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(widget.propertySet[0].eventSet.length<=1) return;
        widget.propertySet[0].eventSet.splice(index,1);
        this.trigger(STORE_DATA);
    },
    onAddStatus(index,status){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(widget.id==1008 && widget.propertySet[0].statusSet.length>=2) return;
        let newStatus = {statusValue:'',statusField:'',bgImagePath:'',statusName:''};
        widget.propertySet[0].statusSet.splice(index+1,0,newStatus);
        this.trigger(STORE_DATA);
        if(status === "false"){
        }else{}
    },
    onDelStatus(index){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(widget.propertySet[0].statusSet.length<=1) return;
        if(index === widget.propertySet[0].activeStatus) widget.propertySet[0].activeStatus=0;
        widget.propertySet[0].statusSet.splice(index,1);
        this.trigger(STORE_DATA);
    },
    onChangeStatusName(pid,value,status,type='statusName'){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.propertySet[0].statusSet[pid][type] = value;
        this.trigger(STORE_DATA);
        if(status === "false"){
        }else{}
    },
    onChangeStatusValue(pid,value,wid,statusField,statusValue){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        let set = widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] || {};
        set['index'] = value;
        set['statusField'] = statusField;
        set['statusValue'] = statusValue;
        widget.propertySet[0].eventSet[pid]['activeStatusField'][wid] = set;
        if(widget.propertySet[0].eventSet[pid].showWidgetList.indexOf(wid)<0){
            widget.propertySet[0].eventSet[pid].showWidgetList.push(wid);
        }
        this.trigger(STORE_DATA);
    },
    onChangeCode(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        widget.code = value;
        this.trigger(STORE_DATA);
    },
    onChangeDeviceId(value){
        let widget = linkActiveWidget();
        if(typeof widget === 'undefined') return;
        if(widget.lightDeviceVOs){
            widget.bindDeviceId = widget.lightDeviceVOs[0].deviceId = value;
        }else{
            widget.bindDeviceId = value;
        }
        this.trigger(STORE_DATA);
    },
    onChangeLight(key, name, mac, checked){
        let widget = linkActiveWidget();
        let data = {};
        data.lightDeviceId = key;
        widget.switchIds = widget.switchIds?widget.switchIds:[];
        if(checked){
            widget.switchIds.push(data);
        }else{
            let arr = widget.switchIds;
            widget.switchIds.map((item, index)=>{
                if(item.lightDeviceId == key){
                    arr.splice(index,1)
                }
            })
            widget.switchIds = arr;
        }
        this.trigger(STORE_DATA)
    }
});

