// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({
                type:0,
                data:{
                    'OnOffKey':1, // 1开机 2关机
                    'LockKey':2,//模式 锁定 1:是 2：否
                    'OffTime':5,//模式：定时 大于等于1:是 2：否
                    'TimerOffKey':1,//关机剩余时间
                    'LightKey':1,//模式：灯光 1:是 2 ：否
                    'SprayKey':1,//模式 喷射 1:是 2 ：否
                    'FanSpeedKey':2,//风速 1-5自动/睡眠/低/中/高
                    'updateFlag':0}
            });
            // 运行数据模拟
            webInterface.repaint({
                type:1,
                data:{
                    'cityName':'深圳',
                    'wtext':'阴天',
                    'Temperature':'22',
                    'temp':'30',
                    'PM25':'20',
                    'pm25':'66',
                    'Humidity':'23',//湿度
                    'WorkeTime':'130',//距下次清洁滤网还剩多少小时
                    'OnOffStatus':1, // 1开机 2关机
                    'online':1,//设备在线
                    'networkavailable':1//联网

                }
            });
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function(){
            if (data) { // 指令发送成功
                webInterface.success(data, successCallbackId);
            } else { // 指令发送失败
                webInterface.error('error - ' + new Date(), errorCallbackId);
            }
        }, 200);
    };
};

var bindJavaScript = new VirtualApp();

// 模拟定时推送运行数据
// setInterval(function(){
//     webInterface.repaint({type:1,data:{}});
// }, 5200);