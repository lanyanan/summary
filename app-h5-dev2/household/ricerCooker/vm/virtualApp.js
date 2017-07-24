// app注入对象
var VirtualApp = function() {
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function() {
            // 校验完成
            webInterface.ready(option);

            // 控制数据模拟
            webInterface.repaint({
                type: 0,
                data: {
                   KouGanSheZhi:null,
                   PresetTimehour:null,
                   PresetTimeMinute:null,
                   FuntionSelect:null,
                   PresetSet:null
                  }
            });
            // 运行数据模拟
            webInterface.repaint({
                type: 1,
                data: {
                  online:1,
                  WorkReturnTimeHour:1,
                  WorkReturnTimeMinute:30,
                  OperationWorkMode:2,
                  // PresetTimeHour:1,
                  // PresetTimeMinute:30,
                  PresetSet:0,
                  TopNTCShort:1,
                  TopNTCOpen:1
                  // BottomNTCShort:1,
                  // BottomNTCOpen:1,
                  // HighTemperature:1
                 }
            });
        }, 90);

    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function() {
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