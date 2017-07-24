'use strict';

import {gameActions} from '../actions/actions';
import gMain from '../config';

var data = {
	showMaskLayer: false,

	bigIcon:'',

	// 1：四件套绑定成功并设置正确	2：安装睡眠袋子成功		3：完成启动优质睡眠		4：上床睡觉完成		5：输入密码正确
	overstep:0,

	// 当前场景索引
	curScenseIndex: 1,

	// 工具栏是否打开
	isOpened:false,

	// 落地灯是否打开
	flampOpen:true,

    // 计数器
    time: 0,

    // 是否显示纸条大图
    paper:false,

    paperPicked:[],

    // 以获取的道具顺序
    picked:[],

	/*	
		status   		0:未获取   1:可组合    2：可绑定   3：绑定成功但设置不正确  4：绑定成功且设置正确  5：不可操作
		combNum			可合成次数
	*/
	equips:{
		phone:{status:0},
		aromathMachine:{status:0, combNum:2, color:'', gears:0},
		bulb:{status:0, combNum:1},
		wisdomBox:{status:0, temperature:28},
		water:{status:0, combNum:1},
		esseOil:{status:0, combNum:1},
		lampholder:{status:0, combNum:1, color:'', mode:0},
		fleabag:{status:0}
	}
}

export const gameStore = Reflux.createStore({
    listenables: [gameActions],
    onShowPrompt(msg){
        this.trigger({msg: msg});
    },

    onGetEquip(name){
    	var equip = data.equips[name];
        if(data.picked.indexOf(name) > -1) return;

    	switch(name){
    		case 'phone': 
    			equip.status = 5;break;
    		case 'wisdomBox':
    		case 'fleabag':
    			equip.status = 2;break;
    		case 'lampholder':
    			if(equip.status === 0)
    				equip.status = 1;
    			else
    				return;
    			break;
    		default:
    			equip.status = 1;break;
    	}
        data.picked.push(name);
        this.trigger(data);
    },

    // 显示大图层
    onMagnify(obj){
    	var opts = {
    		bigIcon:'' ,
    		showMaskLayer:true,
    		autoHide: true
    	}

    	if(typeof obj === 'string'){
    		opts.bigIcon = obj;
    	}else{
    		opts = obj;
    	}

    	this.trigger(opts);
    },

    getData(){
    	return data;
    },

    onSetOverStep(num){
    	data.overstep = num;
        if(num === 2){
            data.equips.fleabag.status = -1;
        }
    	this.trigger(data);
    },

    onCombEquip(name, material){
    	var info = data.equips[name];

    	// 材料消失
    	data.equips[material].status = -1;

    	// 设备合成完成后变成可绑定状态
    	--info.combNum === 0 ? (info.status = 2) : '';

    	data.showMaskLayer = false;

    	this.trigger(data);
    },

    onShowMaskLayer(flag){
    	data.showMaskLayer = flag;
    	this.trigger({
    		showMaskLayer: flag
    	})
    },

    onToggleEquip(obj){
    	data.showMaskLayer = false;
    	data.isOpened = obj.isOpened;
    	this.trigger(data);
    },

    onSceneCut(index){
    	data.curScenseIndex = index;
    	this.trigger(data);
    },

    onCommit(obj){
    	for(var attr in obj){
			data[attr] !== undefined && (data[attr] = obj[attr]);
    	}
    	this.trigger(data);
    },

    onSetEquipOptions(name, opts){
    	var obj = data.equips[name];
    	for(var attr in opts){
    		if(obj[attr] !== undefined) 
    			obj[attr] = opts[attr];
    	}

    	switch(name){
    		case 'aromathMachine':
    			obj.status = (obj.color === 'green' && obj.gears > 0) ? 4 : 3;
    			break;
    		case 'fleabag':
    			break;
    		case 'lampholder':
    			obj.status = (obj.color === 'pink' && obj.mode === 1) ? 4 : 3;
    			break;
    		case 'wisdomBox':
    			obj.status = (obj.temperature === 26) ? 4 : 3;
    			break;
    	}

    	if(data.equips.aromathMachine.status ===4 && 
			data.equips.fleabag.status ===4 && 
			data.equips.lampholder.status ===4 && 
			data.equips.wisdomBox.status ===4)
    	{
    		data.overstep = 1;
    	}else{
    		data.overstep = 0;
    	}

    	this.trigger(data);
    },

    onTimeStart(){
        this.timer = setInterval(()=>{
            this.trigger({time:++data.time});
        },1000)
    },

    onTimeStop(){
        clearInterval(this.timer);
    },

    getTime(){
        if(data.overstep!=5) return null;
        return data.time;
    },

    onShowPaper(num){
        data.paper = true;
        data.showMaskLayer = true;
        data.paperPicked.push(num);
        this.trigger(data);
    },


    onCommitData(fn){
        var now = new Date(), {appId, userInfo, env, wechatId} = gMain,
            url = env.frontRoot + 'v1/app/csleep/chamber/addValue';
        if(wechatId){
            var sendData = {
                wechatId: wechatId,
                wechatName: userInfo.nickname,
                wechatIcon: userInfo.headimgurl,
                challengeDuration: data.time,
                appId: appId,
                dataTime: now.Format('yyyy-MM-dd hh:mm:ss'),
                timestamp: +Date.now()
            }

            sendData.sign = this.getSign('post',url,sendData);

            Ajax.post(url, sendData, fn)
        }
    },

    onGetRankData(fn){
        var now = new Date(), {appId, userInfo, env, wechatId} = gMain,
            url = env.frontRoot + 'v1/app/csleep/chamber/getRank';
        if(wechatId){
            var sendData = {
                appId: appId,
                wechatId: wechatId,
                timestamp: +Date.now()
            }

            sendData.sign = this.getSign('get',url,sendData);
            Ajax.get(url, sendData, fn);
        }
    },


    /**
     * 计算sign的方法
     * @param  {string} type 请求的类型("GET"/"POST",默认为POST)
     * @param  {string} url 请求的地址(绝对路径,"https://"开头)
     * @param  {object} data 请求的参数对象(包含所有参数key:value对)
     * @return {string} sign 返回获取到的sign
     */
    getSign(type, url, data) {
        if (!data || typeof data !== 'object') return;
        var arr = [];
        for (var key in data) {
            arr.push(key);
        }
        arr.sort();
        var str1 = (type === 'GET' || type === "get") ? "GET" : "POST";
        var signStr = str1 + url;
        arr.forEach(function(item, index) {
            if (index === 0) {
                signStr = signStr + item + '=' + data[item];
            } else {
                signStr = signStr + "&" + item + '=' + data[item];
            }
        });
        signStr = signStr + "&" + gMain.appSecret;
        return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(signStr));
    }

    

});