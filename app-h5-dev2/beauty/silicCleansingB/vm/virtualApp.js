// app注入对象
var VirtualApp = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        setTimeout(function(){
            // 校验完成
            webInterface.ready(option);
            // 控制数据模拟
            webInterface.repaint({type:0, data:{'busiSwitch':1, 'gears1':1,'runtime1':1,'gears2':2,'runtime2':10,'gears3':1,'runtime3':1,'gears4':1,'runtime4':4,'gears5':1,'runtime5':45,'massageGears1':2,'massageGears2':2,'massageGears3':2,'massageGears4':2,'massageGears5':2, 'massageRuntime1':15, 'massageRuntime2':15, 'massageRuntime3':15, 'massageRuntime4':15, 'massageRuntime15':15, 'cleanSwitch':2, 'massageSwitch':1}});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{'busiSwitch':1,'electricity':5,'chargeStatus' :1,'gears1':1,'runtime1':1,'gears2':2,'runtime2':10,'gears3':1,'runtime3':1,'gears4':1,'runtime4':4,'gears5':1,'runtime5':45,'massageGears1':2,'massageGears2':2,'massageGears3':2,'massageGears4':2,'massageGears5':2,
'massageRuntime1':15, 'massageRuntime2':15, 'massageRuntime3':15, 'massageRuntime4':15, 'massageRuntime5':15,'commonGears1':2,'commonGears2':2,'commonGears3':2,'commonGears4':2,'commonGears5':5
,'commonRuntime1':2,'commonRuntime2':2,'commonRuntime3':2,'commonRuntime4':2,'commonRuntime5':5, 'onlineStatus':1}});

            // 运行数据2
            webInterface.repaint({type:1, data:{
                        'recomondConfig': {//推荐的配置  number
                            'gears1': 4, //洁面模式 number
                            'runtime1': 40,//洁面模式 number
                            'gears2': 4,//洁面模式 number
                            'runtime2': 20,//洁面模式 number
                            'gears3': 4,//洁面模式 number
                            'runtime3': 20,//洁面模式 number
                            'gears4': 2,//洁面模式 number
                            'runtime4': 20,//洁面模式 number
                            'gears5': 2,//洁面模式 number
                            'runtime5': 20,//洁面模式 number
                            'massageGears1': 2,//按摩模式 number
                            'massageRuntime1': 20,//按摩模式 number
                            'massageGears2': 2,//按摩模式 number
                            'massageRuntime2': 20,//按摩模式 number
                            'massageGears3': 2,//按摩模式 number
                            'massageRuntime3': 20,//按摩模式 number
                            'massageGears4': 1,//按摩模式 number
                            'massageRuntime4': 20,//按摩模式 number
                            'massageGears5': 1,//按摩模式 number
                            'massageRuntime5': 20//按摩模式 number
                        },
                        'forHeadDescribe': '轻度偏油', //额头肤质说明
                        'skinDataCode': 1,//有无测肤 0：无  1 代表：有测过肤
                        'siliconeFacecleannerConfig': {
                            'busiSwitch': 0,//业务开关 0：手动  1：自动
                            'gears1': 3,//洁面模式 number
                            'runtime1': 10,//洁面模式 number
                            'gears2': 3,//洁面模式 number
                            'runtime2': 10,//洁面模式 number
                            'gears3': 3,//洁面模式 number
                            'runtime3': 10,//洁面模式 number
                            'gears4': 3,//洁面模式 number
                            'runtime4': 10,//洁面模式 number
                            'gears5': 3,//洁面模式 number
                            'runtime5': 10,//洁面模式 number
                            'longWashSwitch': 2, // number 长洗模式开关 1：代表开 2：代表关 number
                            'longWashGears': 3, // number  长洗档位
                            'longWashRuntime': 1, // number  长洗模式时间
                            'massageGears1': 3, //按摩模式 number
                            'massageRuntime1': 15, //按摩模式 number
                            'massageGears2': 3, //按摩模式 number
                            'massageRuntime2': 15, //按摩模式 number
                            'massageGears3': 3,//按摩模式 number
                            'massageRuntime3': 15,//按摩模式 number
                            'massageGears4': 3,//按摩模式 number
                            'massageRuntime4': 15,//按摩模式 number
                            'massageGears5': 3,//按摩模式
                            'massageRuntime5': 15,//按摩模式 number
                            'commonGears1': 2,//洁面模式第1档常用档位 number
                            'commonGears2': 0,//洁面模式第2档常用档位 number
                            'commonGears3': 0,//洁面模式第3档常用档位 number
                            'commonGears4': 0,//洁面模式第4档常用档位 number
                            'commonGears5': 0,//洁面模式第5档常用档位 number
                            'commonMassageGears1': 1,//按摩模式第1档常用档位 number
                            'commonMassageGears2': 0,//按摩模式第2档常用档位 number
                            'commonMassageGears3': 0,//按摩模式第3档常用档位 number
                            'commonMassageGears4': 0,//按摩模式第4档常用档位 number
                            'commonMassageGears5': 0,//按摩模式第5档常用档位 number
                            'massageSwitch': 2,//按摩模式 number
                            'cleanSwitch': 2,//洁面模式开关 1：代表开 2：代表关 number
                            'electricity': 1,//电量 number
                            'chargeStatus': 2//充电状态 number
                        },
                        'noseDescribe': '中性', //鼻子肤质说明
                        'leftFaceDescribe': '中性',//左脸肤质说明
                        'chinDescribe': '中性',//下巴肤质说明 
                        'rightFaceDescribe': '中性'//右脸肤质说明
                    }});
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