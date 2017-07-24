// app注入对象
var APP = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            webInterface.ready(option); // 验证完成
            webInterface.repaint({type:0,data:{type: 2, currentMode:3, currentGears:2, mode:3, gears:2, updateFlag:0}});
            webInterface.repaint({type:1,data:{busiSwitch: 1,type: 0, currentMode:2, currentGears:1, mode:4, gears:2, onlineStatus:2, electricity:4, des:"您使用设备后，脸部肌肤水分提升了80%！"}});
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function(){
            if (data) { // 成功
                console.log(data);
                webInterface.success(data, successCallbackId);
            } else { // 失败
                webInterface.error("error - " + new Date(), errorCallbackId);
            }
        }, 200);
    };
};

var bindJavaScript = new APP();