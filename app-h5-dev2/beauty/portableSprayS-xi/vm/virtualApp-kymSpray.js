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
  

             }});
            //运行数据模拟
            webInterface.repaint({type:1, data:{
                 //   private int mode;//推荐模式类型（1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式）
				//	private int currentRunMode;//当前运行模式类型类型（0-非智能，1-智能）
				//	private int busiSwitch;//业务开关（0：关 1：开） 不用标记
				//	private int skinType5;//综合肤质 1-干性肤质，2-中性偏干，3-中性肤质，4-混合型偏干，5-混合性，6-混合性偏油，7-油性皮肤
				//	private float waterTrend;//水分提升
				//	private int skinDataCode;//有无肤质数据（0-无 1-有）
				//	private int runTime;//推荐运行时间（秒）
				//	private int currentRunTime;//当前设备运行时间（秒）
					  
					"busiSwitch":0,
					"mode":2,
					"currentRunMode":4,
					"skinType5":3,
					"waterTrend":-13.84,
					"skinDataCode":1,
					"runTime":40,
					"currentRunTime":50

             
            }});  

            setTimeout(function(){
                webInterface.repaint({type:1, data:{

                        "busiSwitch": 0,
						"currentRunMode": 4,
						"currentRunTime": 50
                }});  
            },500)

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