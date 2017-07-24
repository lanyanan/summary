// app注入对象
var appData = {};
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{'updateFlag':0}});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{
                'hello':'当你看到这条信息，表明种子项目已成功运行！',
                steps: 99999,
                connect: 'syncOk',//0未连接，1连接中，2连接完成同步中  3同步成功

                deepSleep: '',
                shallowSleep:'',
                sleepQuality: '',
                calories: 3.6,//消耗的卡路里（单位：千卡）
                stepCount: 2000,//所走步数（单位：步）
                walkTarget: 9000,
                kilometer: 0.8,//所走公里数（单位：kl）
                measurestatus: 1,
                renderline: true,
                heartrate: Math.ceil(Math.random()*120),
            }});
        }, 1000);


        // setInterval(function () {
        //
        // },1000)
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


var now = +new Date(1997, 9, 3),
    oneDay = 24 * 3600 * 1000,
    value = Math.random() * 1000,
    randomData = function(heartrate) {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        var obj = {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                /*nextProps.heartrate ||*/ Math.ceil(Math.random()*120)
            ]
        };

        console.log(obj,'---虚拟数据---');
        //debugger
        appData.arr = obj;
        //return obj;
    };

// // 模拟定时推送运行数据
// setInterval(function(){
//     randomData();
//     webInterface.repaint({type:1, data:{
//         'hello':'当你看到这条信息，表明种子项目已成功运行！',
//         steps: 99999,
//         connect: 3,//0未连接，1连接中，2连接完成
//
//         deepSleep: '03时08分',
//         shallowSleep:'12时58分',
//         sleepQuality:'不好',
//         calories: 3.6,//消耗的卡路里（单位：千卡）
//         stepCount: 2000,//所走步数（单位：步）
//         walkTarget: 9000,
//         kilometer: 0.8,//所走公里数（单位：kl）
//         measurestatus: 1,
//         renderline: true,
//         heartrate: Math.ceil(Math.random()*120),
//     }});
// }, 1000);