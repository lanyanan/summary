// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({
                "type":0,
                "data":{
                    'msg':'appData',
                    "power":1,
                    "reservation":1,
                   /* "workingmode":15,*/
                    "heatpreservation":60,
                    "heatingpower":8,

                    "updateFlag":"1C00",
                    "reserve":0,

                }
            });
            // 运行数据模拟
           /* webInterface.repaint({
                type:1,
                data:{
                    'msg':'runData',
                    "status":2,
                    "power":1,
                    "workstatus":2,
                    'temperature': 110,
                    'workingpower':11,
                    'dryalarm':1,
                    'coldwater':0,
                    'separation':0,
                    "workingmode":14,
                    surplusreservationtimehour: 1,
                    surplusreservationtimemin:0,
                    surplusworktimehour: 1,
                    surplusworktimemin: 0,
                    surplusheatpreservationhour:0,
                    surplusheatpreservationmin:0,
                    "reservation":1,
                }
            });*/
            webInterface.repaint({
                "type":1,
                "data":
                {
                    'msg':'appData',
                    "power":2,
                    "reservation":3,
                    "workingmode":2,
                    "heatingpower":8,
                    "workstatus":3,
                    'temperature': 110,
                    timehour:2,
                    timemin:3,

                    "updateFlag":"1C00",
                    surplusreservationtimehour:0,
                    surplusreservationtimemin:0,

                    surplusworktimehour: 2,
                    surplusworktimemin: 2,
                    surplusheatpreservationhour:3,
                    surplusheatpreservationmin:0,
                    reservation:1,
                    online:1,
                    dryalarm_hint:0,
                    dryalarm:0,
                    'coldwater':0,
                    'separation':0,
                }
            });
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



