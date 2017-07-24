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
                    boot: 2,
                    childLock:1,
                    online:2,
                    reservationTime:2,
                    wind:3,
                    leave:2,
                    thirstVoice:1,
                    work:2,
                    updateFlag:0

                }
            });
            // 运行数据模拟
            webInterface.repaint({
                type: 1,
                data: {
                    boot: 2,
                    childLock:1,
                    currentTemp: 13,
                    currentHumidity: 90,
                    wtext: '晴朗',
                    cityName: '深圳',
                    temp: 25,
                    pm: 1,
                    pm25: 55,//室外
                    online:2,
                    reservationTime:2,
                    wind:3,
                    leave:2,
                    thirstWarn:1,
                    marker:2,
                    thirstVoice:1
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