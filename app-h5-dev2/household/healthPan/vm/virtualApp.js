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
                //故障离线
                "online": 1,
                "networkavailable":1,
                "GanShaoBaoHu":0,
                "GaoWenBaoHu":0,
                "ChuanGanQiKaiLuGuZhang":0,
                "ChuanGanQiDuanLuGuZhang":0,

                //控制数据
                "GongZuoMoShiSheZhi":1,








                "HuoLiSheZhi":1,
                "YuYueShiJianSheZhiXiaoShi":0,
                "YuYueShiJianSheZhiFenZhong":0,


                //运行工作模式
                YunXingGongZuoMoShi:2,
                YunXingHuoLiSheZhi:0,
                //运行数据 预约倒计时，工作倒计时
                "YuYueShiJianXiaoShi":0,
                "YuYueShiJianFenZhong":0,

                "ShengYuShiJianXiaoShi":0,
                "ShengYuShiJianfenZhong":12,//~

                "DangQianGongZuoMoShi":1,

            }});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{'hello':'当你看到这条信息，表明种子项目已成功运行！'}});
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