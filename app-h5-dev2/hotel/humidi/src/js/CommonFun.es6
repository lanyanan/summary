
import {Macro} from './DefinMarco.es6'

export const CommonFun = Object.create({
    timestamp: function(){
        return new Date().getTime();
    },

    urlStr:function(method,url,params){
        params["appId"] = Macro.kHETAppId;
        params["timestamp"] = this.timestamp();

        method = method.toUpperCase();
        let paramsStr = "";
        if(params){
            let keys = Object.keys(params);
            keys.sort();
            for (var index in keys) {
                paramsStr += keys[index];
                paramsStr += "=";
                paramsStr += params[keys[index]];
                paramsStr += "&";
            }
            if(keys.length > 0){
                paramsStr = paramsStr.substring(0,paramsStr.length-1);
            }
        }
        let md5 = require('./md5.js');
        if (method === "GET"){
            let urlStr = "GET" + url + paramsStr;
            return url+ "?" +paramsStr+"&sign="+md5(urlStr);
        }else if(method === "POST"){
            let urlStr = "POST" + url + paramsStr;
            return url+ "?" +paramsStr+"&sign="+md5(urlStr);
        }else {
            return "";
        }

    }
});
