// app注入对象
var VirtualApp = function () {
    // 接收web传送的验证信息
    this.config = function (option) {
        // 延时模拟
        setTimeout(function () {
            // 校验完成
            webInterface.ready({
                //"appId":"10121",
                //"timestamp":+new Date(),
                //"accessToken":"5d9fa6735a0e45199cded517c19edbb0",
                //"deviceId":"unfa1223d",
                //state:1,data:'50.2',
                //img:'',
            });
            // 控制数据模拟
            webInterface.repaint({type: 0, data: {testState: 1}});
            // 运行数据模拟
            webInterface.repaint({
                type: 1,
                data: {
                    //testState: 1,
                    //weight: 50.2,
                    //fatRate: 18.2,
                    //boneWeight: 2.3,
                    //moistureRate: 55.2,
                    //meatRate: 49.2,
                    //metabolismRate: 1805,
                    //memberName:'asd',
                    //nickname:'nick',
                    //img:'http://200.200.200.58:8981/group1/M00/04/A1/yMjIOlehgfiAIAxMAAA6079d8SQ665.jpg',
                    //age:25,
                    //gender:'male',
                    //startDate:'1470585600000',
                    //endDate:'1471190400000'
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
//     webInterface.repaint({type:1,data:{}});
// }, 5200);
