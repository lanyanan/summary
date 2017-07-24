// app注入对象
var APP = function() {
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function() {
            webInterfaceSDK.ready(option); // 验证完成
            webInterfaceSDK.repaint({
                    type: 0,
                    data: {
                        "busiSwitch": 0,
                        "configMode": 0,
                        "function1": 1,
                        "function2": 2,
                        "function3": 3,
                        "function4": 4,
                        "function5": 5,
                        "gears1": 3,
                        "gears2": 3,
                        "gears3": 0,
                        "gears4": 6,
                        "gears5": 8,
                        "runTime": 13
                    }
                })
                // webInterfaceSDK.repaint({type:1,data:{busiSwitch:0, currentRunMode: 5, configMode:0, mode:1, onlineStatus:2, skinDataCode:1, skinType5:2, waterTrend:85, gears1:3,gears2:4,gears3:3, gears4:0, gears5:3, runTime:8, electricity:4, chargeStatus:1, updateFlag:0,
                //     "importExportConfig":{
                //                         "function1" : 2,
                //                         "gears1" : 2,
                //                         "function2" : 2,
                //                         "gears2" : 2,
                //                         "function3" : 2,
                //                         "gears3" : 2,
                //                         "function4" : 2,
                //                         "gears4" : 2,
                //                         "function5" : 2,
                //                         "gears5" : 2,
                //                         "runTime" : 11
                //                     }
                // }});
                // webInterfaceSDK.repaint({"data":{"des":"您使用了提拉嫩肤仪后，脸部皮肤水分提升了-31.00%，请继续保持~","gears":2,"mode":4,"type":3},"type":0});
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function() {
            if (data) { // 成功
                webInterfaceSDK.success(data, successCallbackId);
            } else { // 失败
                webInterfaceSDK.error("error - " + new Date(), errorCallbackId);
            }
        }, 200);
    };
};

var bindJavaScriptSDK = new APP();

// setInterval(function(){
//     webInterface.repaint({type:1,data:{currentRunMode: 2, configMode:0, mode:4, onlineStatus:1, skinDataCode:1, skinType5:2, waterTrend:85, gears1:2,gears2:4,gears3:3, gears4:0, gears5:9, runTime:8, electricity:4, chargeStatus:1, updateFlag:0}});
// }, 5200);