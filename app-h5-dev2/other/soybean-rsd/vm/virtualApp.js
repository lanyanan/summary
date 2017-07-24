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
                'WorkCompSta':'00',
                'CurWorkMode':'00',
                'online':'1',
                'KeyError':'0',
                'SetBespeakHour':'00',
                'SetBespeakMin':'00',
                'BespeakSta':'00',
                'BespeakMode':'00',
                'WorkMode':'00',
                'updateFlag':'00',
                'WorkStartStop':'00'
            }});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{
                'WorkCompSta':'00',
                'WorkMode':'00',
                'online':1,
                'KeyError':'0',
                'BespeakHour':'00',
                'BespeakMin':'00',
                'BespeakSet':'00',
                'SetBespeakMode':'00',
                'KeyFlag':'00',
                'WorkMode':'00',
                'updateFlag':'00'
            }});
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function(){
            if (data) { // 指令发送成功
                webInterface.success(data, successCallbackId);
                var dataType = JSON.parse(data);
                console.log(dataType,'kkkkk');
                //模拟风类型切换
                if(dataType.updateFlag == '0300'){
                    // webInterface.repaint({
                    //     type:0,
                    //     data: {
                    //         WorkCompSta:'01',
                    //         WorkMode:dataType.WorkMode
                    //     }
                    // });
                    var WorkMode = dataType.WorkMode;
                    var WorkStartStop = dataType.WorkStartStop;
                    if(WorkStartStop == '00'){
                        WorkMode = '00';
                    }
                    webInterface.repaint({
                        type: 1,
                        data: {
                            WorkCompSta:WorkStartStop,
                            CurWorkMode:WorkMode
                        }
                    });

                }
                if(dataType.updateFlag == '3c00'){
                    console.log('dddddddddddddd');
                    webInterface.repaint({
                        type: 1,
                        data: {
                            WorkCompSta:dataType.WorkCompSta,
                            CurWorkMode:dataType.WorkMode,
                            BespeakHour:dataType.BespeakHour,
                            BespeakMin:dataType.BespeakMin
                        }
                    });
                }
                if(dataType.updateFlag == '0c00'){
                    
                    webInterface.repaint({
                        type: 1,
                        data: {
                            WorkCompSta:dataType.WorkStartStop,
                            CurWorkMode:'00'

                        }
                    });
                }

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

/*webInterface.repaint({
    type:0,
     data: {
     WorkCompSta:'01',
     CurWorkMode:'04',
     online:'1',
     KeyError:'01',
     BespeakHour:'00',
     BespeakMin:'00',
     WorkMode:'03',
     networkavailable:1,
     online:1,
     KeyFlag:'01',
     BespeakSta:'01',
     BespeakMode:'04'
    }
});*/