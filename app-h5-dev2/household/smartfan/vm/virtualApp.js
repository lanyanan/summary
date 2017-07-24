// app注入对象
var VirtualApp = function() {
    var tip = null;
    var timingMode = 0;
    var remainTimeL = 33
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
                    timingMode: 2,
                    tip: null,
                    wind: 89,
                    windStall: 1,
                    shookHead: 1,
                    updateFlag: 0
                }
            });
            // 运行数据模拟
            webInterface.repaint({
                type: 1,
                data: {
                    workMode: 2,
                    runStatus: 1,
                    windType: 1,
                    windStall: 1,
                    shookHeadStatus: 1,
                    boot: 2,
                    temp: 20,
                    humidity: 80,
                    remainTimeH: 0,
                    remainTimeL: 0,
                    online:1,
                    networkavailable:1, //1有网 2没网
                    standardWindStall:1,
                    naturalWindStall:1,
                    sleepWindStall:1
                }
            });
            // remainTimeL = remainTimeL-1;
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function() {
            if (data) { // 指令发送成功
                var dataType = JSON.parse(data);
                //模拟风类型切换
                if(dataType.updateFlag == 2048){
                    webInterface.repaint({
                        type:0,
                        data: {
                            wind:dataType.wind,
                            windStall:1,
                        }
                    });
                    webInterface.repaint({
                        type: 1,
                        data: {
                            windStall:1
                        }
                    });
                }
                //模拟关闭定时
                if(dataType.updateFlag == 512){
                    webInterface.repaint({
                        type: 1,
                        data: {
                            timingMode:3
                        }
                    });
                    clearInterval(this.timr);
                }
                //模拟定时器效果，供演示使用
                if(dataType.updateFlag == 1536){
                    tip = dataType.tip*60;
                    timingMode = dataType.timingMode;
                    if(dataType.boot == 1){
                        timingMode = 2;
                    }else if(dataType.boot == 2){
                        timingMode = 1;
                    }
                    var state = null;
                    state = timingMode==1?2:1;
                    //模拟定时器效果，供演示使用
                    clearInterval(this.timr);
                    this.timr = setInterval(function(){
                        if(tip==1){
                            if(timingMode==1){
                                state = 1;
                            }else if(timingMode==2){
                                state = 2;
                            }
                            clearInterval(this.timr);
                            webInterface.repaint({
                                type: 1,
                                data: {
                                    workMode: 2,
                                    runStatus: 1,
                                    windType: 1,
                                    windStall: 1,
                                    shookHeadStatus: 1,
                                    boot: state,
                                    temp: 20,
                                    humidity: 80,
                                    remainTimeH: 0,
                                    remainTimeL: 0,
                                    timingMode:3
                                }
                            });
                        }else{
                            --tip;
                            var remainTimeH = parseInt(tip/256);
                            var remainTimeL = tip-parseInt(tip/256)*256;
                            webInterface.repaint({
                                type: 1,
                                data: {
                                    workMode: 2,
                                    runStatus: 1,
                                    windType: 1,
                                    windStall: 1,
                                    shookHeadStatus: 1,
                                    boot: state,
                                    temp: 20,
                                    humidity: 80,
                                    remainTimeH: remainTimeH,
                                    remainTimeL: remainTimeL,
                                    timingMode:state
                                }
                            });
                        }
                    },60000);
                }
                webInterface.success(data, successCallbackId);
            } else { // 指令发送失败
                webInterface.error('error - ' + new Date(), errorCallbackId);
            }
        }, 90);
    };
};

var bindJavaScript = new VirtualApp();

// 模拟定时推送运行数据
// setInterval(function(){
//     webInterface.repaint({type:1,data:{}});
// }, 5200);