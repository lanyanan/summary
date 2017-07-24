// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready({"nickname":"gfgf","img":"","userType":"1","memberId":"2","appId":"10121","deviceId":"F6014C913E479B5F0AC5D6F58133B234"});
            // 控制数据模拟
            webInterface.repaint({
                "type":0,
                "data":{
                    "xymlData":{
                        "oxygen": "0.97",   //血氧
                        "pulse": "83",  //脉率
                        "oxygenStandard": "正常", //血氧标准状态
                        "oxygenStandardFlag": "0",  //血氧标准状态标识
                        "pulseStandard": "正常",  //脉率标准状态
                        "oxygenStandardFlag": "0",  //脉率标准状态标识
                        "dataTime": "1471853910", //测量时间（时间戳）
                    }, 
                    "tempData":{
                        "temp": "38",   //温度
                        "dataTime": "1471856696", //测量时间（时间戳）
                    },
                    "bloodPressureData":{
                        "systolicPressure": "132",  //收缩压
                        "diastolicPressure": "83",  //舒张压
                        "bloodPressureStandard": "正常",  //血压标准状态
                        "bloodPressureStandardFlag": "0",
                        "dataTime": "1471853910", //测量时间
                    },
                    "bloodGlucoseData":{
                        "bloodGlucose": "2.3", //血糖值
                        "bloodGlucoseStandard": "正常",   //血糖标准状态
                        "bloodGlucoseStandardFlag": "0",    //血糖标准状态标识
                        "dataTime": "1471853910", //测量时间
                    },
                    "ecgData":{
                        "heartRate": "86",  //心率
                        "dataTime": "1471853910", //测量时间
                        "heartEcg":"12:22:34:21:0:8:4", //心电   数量不定
                    },
                    "updateFlag":0}
                });
            // 运行数据模拟
            webInterface.repaint({type:1, data:{"hello":"当你看到这条信息，表明种子项目已成功运行！"}});
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