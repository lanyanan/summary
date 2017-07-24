// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{'UpdateFlag1':'01','UpdateFlag2':'00','S0':'02','S1':'02','S8':'02','S7':60,'S3':0,'S4':0,'S2':'2'}});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{'hello':'当你看到这条信息，表明种子项目已成功运行！','S0':'02','S1':'02','S8':"02",'S7':60,'cityName':'北流','pm25':'60','S2':'2','online':1,'networkavailable':1,'deviceName':'\U5fb7\U8d5b02'}});
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