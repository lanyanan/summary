 var env, gMain;

!(function(){

	// 预发布环境
	if(location.host == 'weixin.hetyj.com'){
	    env = {
	    	apiPath: 'https://weixin.hetyj.com/clife-wechat-preRelease/',
	    	frontPath: 'https://weixin.hetyj.com/pre-wechat/',
            frontRoot: 'https://weixin.hetyj.com/',
	    	backendPath: 'http://test.api.clife.cn/',
	    	appId: 'wxc4b9a11ff3f0c8dd'			// 微信公众号appid
	    }

	// 正式环境
	}else if(location.host == 'wechat.hetyj.com'){
	    env = {
	    	apiPath: 'https://wechat.hetyj.com/clife-wechat/',
	    	frontPath: 'https://wechat.hetyj.com/web-wechat/',
            frontRoot: 'https://wechat.hetyj.com/',
	    	backendPath: 'http://api.clife.cn/',
	    	appId: 'wx206f167ed3db5d27'
	    }

	// 测试环境
	}else{	
	    env = {
	    	apiPath: 'https://weixin.clife.cn/clife-wechat-test/',
	    	frontPath: 'https://weixin.clife.cn/web-wechat/',
            frontRoot: 'https://weixin.clife.cn/',
	    	backendPath: 'http://200.200.200.50/',
	    	appId: 'wxb5e64ab92b87c80b'
	    }
	}

	gMain = {
		env: env,
		wechatId: getCookie('wechatUserId'),
		userInfo: {},
		appSecret:'bf1f3ce24b304af3ab7971aaec318135',
		appId:'10014'		// 睡眠产品appid
	}

	// 没授权跳转到授权页面
    if(!gMain.wechatId){
        location.href = env.apiPath + 'wechat/user/login?format=json&type=1&redirect=' + 
        				env.frontPath + 'escapeRoom/page/index.html' + '?appid=' + env.appId;
    }
}())


window.Ajax={
    get: function (url,data, fn){
        if(typeof data === 'function') {
            fn = data;
            data = null;
        }
        if(data) url += ('?' + formatParams(data));

        var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
        obj.open('GET',url,true);
        obj.onreadystatechange=function(){
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState==4说明请求已完成
                fn&&fn.call(this, obj.responseText);  //从服务器获得数据
            }
        };
        obj.send(null);
    },
    post: function (url, data, fn) {
        var obj = new XMLHttpRequest();
        obj.open("POST", url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // 发送信息至服务器时内容编码类型
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
                fn&&fn.call(this, obj.responseText);
            }
        };
        obj.send(formatParams(data));
    }
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatParams(data){
    if(!data) return null;
     var arr=[];
     for(var name in data){
         arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]));
     }
     //设置随机数，防止缓存
     //arr.push("t="+Math.random());
     return arr.join("&");
 }


function getCookie(name){
　　var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
　　if(arr != null)　　　　
　　　　return unescape(arr[2]);
　　return null;
}

export default gMain;