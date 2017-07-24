// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{'cOnoff':'01','cBookingTimeHour':'00','cBookingTimeMin':'00','cStoveSel':'00','cFunSel':'00','cWorkSet':'00',
                'cWorkSetHigh':'00','cWorkSetLow':'00','cWorkTimeHour':'00','cWorkTimeMin':'00','cHotWindSw':'01','cCancle':'00',
                'cConfirm':'00','cReserve':'0000','updateFlag':'0030'}});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{'onoff':'01','workMode':'01','workStatus':0,'HotWindStatus':'01','SetTempHigh':'00','setTempLow':'00',
                'curTempHigh':'00','curTempLow':'00','setTimeHour':'00','setTimeMin':'00','leftTimeHour':'00','leftTimeMin':'00',
                'setBookingTimeHour':'00','setBookingtimeMin':'00','leftbookingTimeHour':'00','leftBookingtimeMin':'00','rerverse':'00'}});
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