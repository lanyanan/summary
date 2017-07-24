// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready({"nickname":"你是谁","img":"","userType":"1","memberId":"2","appId":"10121"});
            // 控制数据模拟
            webInterface.repaint({
                type:0, 
                data:{
                    oxygen:'100',
                    pulse:"116",
                    dataTime: "2016-06-06 14:12:12", //测量时间
                    uploadDone:true,// app同步成功，请求最新历史数据
                 //disconnect:true,//true:设备断开
                 //isBluConnect:false//蓝牙断开false
                }
            });
            // 运行数据模拟
            webInterface.repaint({type:1, data:{'hello':'当你看到这条信息，表明种子项目已成功运行！'}});
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