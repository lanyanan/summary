'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
let appData = {

};
function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf("?") + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);                
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

let paramObj = getQueryObject();


let URL="/v1/app/waterpurifier/qd/deviceinfo/getSharePageInfo?productId="+paramObj.productId;
let Url = "/v1/app/waterpurifier/qd/deviceData/getShareData?userId="+paramObj.userId+"&appId=10105";
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        if(data.productId){
            appData.productId = data.productId;
            URL = "/v1/app/waterpurifier/qd/deviceinfo/getSharePageInfo?productId="+data.productId
        };
        this.trigger(data);
    },
    onHealthy(){
    	let _this=this;
        $.ajax({
    		url:URL,
    		dataType:'json',
    		success:function(data){
             appData.sharePage = [];
             appData.shareTopic = [];
             $.each(data.data,function(idx,item){
                    let sharePage = item.sharePage || 0;  //默认sharePage为0         
                    appData.sharePage.push(sharePage);
                    appData.shareTopic.push(item.shareTopic);
                } )
    			_this.trigger(appData);
    		}.bind(this)
    	});

        $.ajax({
            url:Url,
            dataType:'json',
            success:function(data){
             appData.number = [];
             $.each(data.data,function(idx,item){            
                    appData.number.push(item);
                } )
                _this.trigger(appData);
            }.bind(this)
        });
    }
});