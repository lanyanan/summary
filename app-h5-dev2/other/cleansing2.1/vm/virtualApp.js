// app注入对象
var APP = function(){
    // 接收web传送的验证信息
    this.config = function(option) {
        // 延时模拟
        //额头  鼻子  下巴  左脸  右脸 
        //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
        //电量判断 chargeStatus（1-无充电，2-正在充电，3-充电满）onlineStatus（1-正常，2-异常）electricity（1-电量低于5%，2-电量低于10%，3-电量低于20%，4-电量正常，5-电池电压过高）
        setTimeout(function(){
            webInterface.ready(option); // 验证完成
            webInterface.repaint({type:0,data:{"configMode":0,"gears1":0,"runtime1":0,"gears2":0,"runtime2":0,"gears3":0,"runtime3":0,"gears4":0,"runtime4":0,"gears5":0,"runtime5":0,"updateFlag":0}});
            webInterface.repaint({type:1,data:{
                          "currentRunMode":1,
                          "faceCleanerConfig":[{
                                  "gears": 1,
                                  "runTime":10,
                                  "part":11,
                                  "remark":"您额头肤质为:缺水性偏干，推荐使用1档，推荐洁面时间：20s",
                                  "skinSubType":"混合性肤质1"
                                },
                                {
                                  "gears": 2,
                                  "runTime":11,
                                  "part":13,
                                  "remark":"您额头肤质为:缺水性偏干，推荐使用2档，推荐洁面时间：21s",
                                  "skinSubType":"混合性肤质2"
                                },
                                {
                                  "gears": 3,
                                  "runTime":12,
                                  "part":12,
                                  "remark":"您额头肤质为:缺水性偏干，推荐使用3档，推荐洁面时间：22s",
                                  "skinSubType":"混合性肤质3"
                                },{
                                  "gears": 4,
                                  "runTime":13,
                                  "part":14,
                                  "remark":"您额头肤质为:缺水性偏干，推荐使用4档，推荐洁面时间：23s",
                                  "skinSubType":"混合性肤质4"
                                },
                                {
                                  "gears": 5,
                                  "runTime":14,
                                  "part":15,
                                  "remark":"您额头肤质为:缺水性偏干，推荐使用5档，推荐洁面时间：24s",
                                  "skinSubType":"混合性肤质5"
                                }],
                          "currentRunConfig":[{
                                   "gears": 5,
                                   "runTime":13,
                                   "part":11//额头
                                },{
                                   "gears": 4,
                                   "runTime":14,
                                   "part":12//鼻子
                                },{
                                   "gears": 3,
                                   "runTime":15,
                                   "part":13//左脸
                                },{
                                   "gears": 2,
                                   "runTime":17,
                                   "part":14//下颚
                                },{
                                   "gears": 1,
                                   "runTime":16,
                                   "part":15//右脸
                                }
                ]}});
                webInterface.repaint({type:1,data:{"electricity":2,"chargeStatus":1,"onlineStatus":0}});
        }, 90);
    };
    // 接收web端传送的数据
    this.send = function(data, successCallbackId, errorCallbackId) {
        // 延时模拟
        setTimeout(function(){
            if (data) { // 成功
                // console.log(data);
                webInterface.success(data, successCallbackId);
            } else { // 失败
                webInterface.error("error -"+ new Date(), errorCallbackId);
            }
        }, 200);
    };
};

var bindJavaScript = new APP();