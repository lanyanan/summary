// app注入对象
var VirtualApp = function () {
    // 接收web传送的验证信息
    this.config = function (option) {
        // 延时模拟
        setTimeout(function () {
            // 校验完成
            webInterface.ready({
                appId: 2123,
                productId: 23232,
                deviceId: 2323
            });
            // 控制数据模拟
            webInterface.repaint({ type: 0, data: { 'updateFlag': 0 } });
            // 运行数据模拟
            webInterface.repaint({
                type: 1, data: {
                    online: 1,
                    networkavailable: 1,
                    modestatus: 9,
                    childlock: 2,
                    ChildLockStatus: 2,
                    temperature: 190,
                    temperaturestatus: 190,
                    pause: 2,
                    power: 2,
                    runmode: 1,
                    reservationhour: 0,
                    reservationmin: 0,
                    remainingreservationtimehour: 23,
                    remainingreservationtimemin: 0,
                    rapidheating: 2,
                    workmin: 30,
                    workhour: 4,
                    light: 2,
                    temperatureerror: 0,
                    HeatingError: 0,
                    recipeworkingnumber: 1,
                    recipenumber: 3,
                    recipetemperature: 55,
                    reciperemainingworkingtimemin: 23,
                    reciperemainingworkingtimehour: 0,
                    PauseStatus: 2,
                    MenuNumberHigh: 0,
                    MenuNumberLow: 23,
                }
            });
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function (data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function () {
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
//     webInterface.repaint({type:1,data:{'online':1}});
// }, 5200);