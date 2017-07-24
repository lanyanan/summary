// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            // webInterface.repaint({type:0, data:{
            //     "skinType": null,
            //     "cleanSwitch": 0,
            //     "foreheadGears": 2,
            //     "foreheadRuntime": 10,
            //     "foreheadRotation": 1,
            //     "noseGears": 2,
            //     "noseRuntime":10,
            //     "noseRotation": 3,
            //     "chinGears": 2,
            //     "chinRuntime":10,
            //     "chinRotation": 2,
            //     "leftfaceGears": 1,
            //     "leftfaceRuntime": 10,
            //     "leftfaceRotation": 2,
            //     "rightfaceGears": 1,
            //     "rightfaceRuntime": 10,
            //     "rightfaceRotation": 2,
            //     "smartModeSwitch": 0,
            // }});
            //运行数据模拟
            webInterface.repaint({type:1, data:{
                "currentConfig": {
                    "leftfaceGears" : 1,
                      "noseGears" : 1,
                      "noseRotation" : 1,
                      "foreheadRotation" : 1,
                      "smartModeSwitch" : 0,
                      "foreheadRuntime" : 10,
                      "chinRotation" : 1,
                      "noseRuntime" : 1,
                      "cleanSwitch" : 2,
                      "chinRuntime" : 2,
                      "leftfaceRotation" : 1,
                      "rightfaceRuntime" : 4,
                      "rightfaceGears" : 1,
                      "foreheadGears" : 1,
                      "chinGears" : 1,
                      "leftfaceRuntime" : 3,
                      "rightfaceRotation" : 1
                },
                "recommendConfig": {
                    "smartModeSwitch" : null,
                      "foreheadRotation" : 1,
                      "rightfaceRuntime" : 10,
                      "cleanSwitch" : null,
                      "noseRemarks" : "您的肤质为：干性肤质，鼻子推荐使用双向3次、中速、界面时间10s",
                      "chinGears" : 2,
                      "leftfaceRotation" : 2,
                      "rightfaceRotation" : 2,
                      "chinRemarks" : "您的肤质为：干性肤质，下巴推荐使用双向2次、中速、界面时间10s",
                      "noseRuntime" : 10,
                      "leftfaceRuntime" : 10,
                      "leftfaceRemarks" : "您的肤质为：干性肤质，左脸推荐使用双向2次、低速、界面时间10s",
                      "rightfaceRemarks" : "您的肤质为：干性肤质，右脸推荐使用双向2次、低速、界面时间10s",
                      "chinRuntime" : 10,
                      "rightfaceGears" : 1,
                      "foreheadGears" : 3,
                      "foreheadRuntime" : 20,
                      "foreheadRemarks" : "您的肤质为：干性肤质，额头推荐使用双向2次、中速、界面时间20s",
                      "chinRotation" : 2,
                      "noseRotation" : 3,
                      "leftfaceGears" : 1,
                      "noseGears" : 2
                },
                "skinType": null
            }});  

            setTimeout(function(){
                webInterface.repaint({type:1, data:{
                    "leftfaceGears" : 1,
                      "noseGears" : 1,
                      "noseRotation" : 1,
                      "foreheadRotation" : 1,
                      "smartModeSwitch" : 0,
                      "foreheadRuntime" : 5,
                      "chinRotation" : 1,
                      "noseRuntime" : 1,
                      "cleanSwitch" : 2,
                      "chinRuntime" : 2,
                      "leftfaceRotation" : 1,
                      "rightfaceRuntime" : 4,
                      "rightfaceGears" : 1,
                      "foreheadGears" : 1,
                      "chinGears" : 1,
                      "leftfaceRuntime" : 3,
                      "rightfaceRotation" : 1,
                      "onlineStatus" : 2
                }});  
            },500)

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