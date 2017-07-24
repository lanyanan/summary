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
            webInterface.repaint({
                type: 0, data: {
                    online: 1,
                    networkavailable: 1,
                    DeviceSwitch: 0,
                    StoveSwitch: 0,
                    FunctionSelect: 0,
                    WorkTempSetHight8b: 0,
                    WorkTempSetLow8b: 0,
                    WorkTimeSetHour: 0,
                    WorkTimeSetMinute: 0,
                    updateFlag: 0
                }
            });
            // 运行数据模拟
            webInterface.repaint({
                type: 1, data: {
                    online: 1,
                    networkavailable: 1,
                    HadSetTotalTimeHour: 0,
                    HadSetTotalTimeMinute: 0,
                    CurrentTimeRemainHour: 0,
                    CurrentTimeRemainMinute: 0,
                    HadSetTempHight8b: 0,
                    HadSetTempLow8b: 0,
                    CurrentTempHight8b: 0,
                    CurrentTempLow8b: 0,
                    WaterBoxStatus: 0,
                    StoveStatus: 0,
                    CurrentWorkMode: 0
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