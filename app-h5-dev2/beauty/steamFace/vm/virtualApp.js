// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{
                'updateFlag':0,
                 'onOff':1,//app开关机                 
                'smartModeSwitch':0,//    number  智能模式开关 0：手动  1：自动
                'deviceStatus':2,//设备模式
                'deviceMode':2,//设备模式
                'modeName':5,//模式名称
                'hotSpray1':0,//   number  热喷1 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'hotSpray2':0,//   number  热喷2 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'hotSpray3':0,//  number  热喷3 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray1':0,//  number  冷喷1 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray2':0,//  number  冷喷2 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray3':0,//  number  冷喷3 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'workMinutes':0,// number  工作时长分
                'workSeconds':0,// number  工作时长秒
                'cbeauty_steamFace_set':null,
                'hotSpray1Leave':0,
                'hotSpray2Leave':0,
                'hotSpray3Leave':0,
                'coldSpray1Leave':0,
                'coldSpray2Leave':0,
                'coldSpray3Leave':0,

            }});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{
                'deviceStatus':2,//   number  工作状态 0: 上电 1: 睡眠 2: 关机 3: 待机 4: 工作
                'deviceMode':2,//  number  设备模式 1：日常 2: 加强 3：温热 4: 热雾 5: 冷雾
                'modeName':5,//  number  模式名称 1: 弹力修复 2: 皮肤清洁 3: 快速温热 4: 醒肤模式
                'hotSpray1':0,//   number  热喷1 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'hotSpray2':0,//   number  热喷2 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'hotSpray3':0,//  number  热喷3 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray1':0,//  number  冷喷1 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray2':0,//  number  冷喷2 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'coldSpray3':0,//  number  冷喷3 1：5秒 2：10秒 3：15秒 … 200: 1000 秒(5s一个梯次)
                'workMinutes':0,// number  工作时长分
                'workSeconds':0,// number  工作时长秒
                'actualWorkMinutes':0,//   number  实际工作时长分
                'actualWorkSeconds':0,//   number  实际工作时长秒
                'hotSpray1Leave':0,
                'hotSpray2Leave':0,
                'hotSpray3Leave':0,
                'coldSpray1Leave':0,
                'coldSpray1Leave':0,
                'coldSpray3Leave':0,
                'smartModeSwitch':0,
                "recomondConfig" : {"id":58,"hotSpray2":12,"skinType":1, "coldSpray2" : 12,"hotSpray3" :12,"coldSpray1":12,"timeLength":600,"coldSpray3":12,"deviceMode":2,"modeName":3,"hotSpray1":12,"workSeconds" : 0,"workMinutes" : 10},
                "skinDataCode" : 1,//1有测肤，0无测肤
                "skinTypeName" : "干性肤质",
                "steamfaceConfig": {"steamfaceId" : 12352475,"deviceMode":2,"coldSpray3":24,"hotSpray2":24,"workMinutes":10,"coldSpray1":24,"modeName":3,"smartModeSwitch":1,"deviceTime":null,"coldSpray1Leave":null,"hotSpray3" : 24,"deviceStatus" : 4,"hotSpray2Leave" : null,"requestType" : 1,"actualWorkMinutes" : null,"deviceFault" : null,"updateTime" : 1470704612000,"updateFlag" : 4224,"source" : 3,"dataType" : 3,"coldSpray2Leave" : null,"workSeconds" : 0,"status" : 2,"coldSpray2" : 24, "runDataSources" : 6,"hotSpray1Leave" : null,"onOff" : 0,"hotSpray3Leave" : null,"hotSpray1":24,"dataChange" : null,"coldSpray3Leave" : null,"actualWorkSeconds" : null,"userId" : 7500}
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