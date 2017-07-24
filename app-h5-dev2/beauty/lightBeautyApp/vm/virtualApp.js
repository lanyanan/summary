// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:1, data:{
                    "mode":2,
                    "currentRunMode":4,
                    "busiSwitch":0,
                    "skinType5":1,
                    "skinTypeName":"干性肤质",
                    "waterTrend":20,
                    "skinDataCode":1,
                    "importExportConfig":{
                        "function1": 2,
                        "gears1" :3,
                        "function2": 2,
                        "gears2" :3,
                        "function3": 2,
                        "gears3":0,
                        "function4": 2,
                        "gears4":6,
                        "function5": 2,
                        "gears5":8,
                        "runTime":15                                                
                    },
                    "currentRunConfig":{
                        "function1": 2,
                        "gears1":2,
                        "function2":2,
                        "gears2":0,
                        "function3": 2,
                        "gears3":2,
                        "function4": 2,
                        "gears4":6,
                        "function5": 2,
                        "gears5":7,
                        "runTime":10                                                
                    }
                }
            });
            // 运行数据模拟
            setTimeout(function(){
                webInterface.repaint({type:1, data:{
                    "gears2" : 3,
                    "skinType5" : 3,
                    "gears1" : 3,
                    "waterTrend" : -1.46,
                    "function1" : 1,
                    "skinDataCode" : 1,
                    "function4" : 4,
                    "function5" : 5,
                    "mode" : 4,
                    "busiSwitch" : 0,
                    "gears5" : 9,
                    "gears4" : 6,
                    "function2" : 2,
                    "currentRunMode" : 5,
                    "runTime" : 13,
                    "gears3" : 0,
                    "function3" : 3
                }});
            },100);

            setTimeout(function(){
                webInterface.repaint({type:1, data:{
                    "electricity":1,
                    "onlineStatus" :1
                }});
            },200);

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