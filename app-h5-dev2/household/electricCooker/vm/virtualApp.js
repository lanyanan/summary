// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{
                "model":"00",
                "_bindUserId":54192,
                "premin":"00",
                "start":"00",
                "bot":"00000000",
                "preh":"00",
                "cancel":"01",
                "updateFlag":"00C00100",
                "top":"00000000"
            }});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{
                "SUMTIMER":"000000",
                "RH":"00",
                'online':1,
                "model":"00",
                "KWH":"00000000",
                "prehour":"00",
                "A":"0000",
                "WIFI":"0F",
                "TOPTEMP":"00000000",
                "UA":"04B1",
                "_bindUserId":54192,
                "PCBA":"00000000",
                "V":"0000",
                "TOPTSET":"00000000",
                "premin":"00",
                "sumbot":"000000",
                "sumtop":"000000",
                "sumside":"000000",
                "output":"00",
                "BOTTEMP":"00000000",
                "BOTSET":"00000000"
            }});
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