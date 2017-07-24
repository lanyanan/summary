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
            }});
            // 运行数据模拟
            webInterface.repaint({type:1, data:{
                hello:'运行数据',
                slide:2,
                deviceId:'E10A5226860FDC0517F00CDBEC20759B',
                MachineOperationState:'0',
                ManualWash:'0',
                PureWaterTdsValue:'7c4',
                SourceWaterTdsValue:'1f4',

                PP1ClearControl: '0',
                CO1ClearControl:'0',
                PP2ClearControl:'0',
                ROClearControl:'0',
                CO2ClearControl:'0',

                PP1Life:'1f4',
                CO1Life:'3e8',
                PP2Life:'3e8',
                ROLife:'3e8',
                CO2Life:'3e8',

                PP1LifeRemain:'1c2',
                CO1LifeRemain:'5a',
                PP2LifeRemain:'46',
                ROLifeRemain:'1e',
                CO2LifeRemain:'32',
                waterlines:[
                    //月
                    /*{
                        "timeDesc": "1月",
                        "pureWaterTdsValue": 12,
                        "sourceWaterTdsValue": 12,
                        "pureWaterTotal": 11,
                        "sourceWaterTotal": 13
                    },
                    {
                        "timeDesc": "2月",
                        "pureWaterTdsValue": 12,
                        "sourceWaterTdsValue": 12,
                        "pureWaterTotal": 11,
                        "sourceWaterTotal": 12
                    },
                    {
                        "timeDesc": "3月",
                        "pureWaterTdsValue": 22,
                        "sourceWaterTdsValue": 33,
                        "pureWaterTotal": 23,
                        "sourceWaterTotal": 10
                    },
                    {
                        "timeDesc": "4月",
                        "pureWaterTdsValue": 10,
                        "sourceWaterTdsValue": 40,
                        "pureWaterTotal": 20,
                        "sourceWaterTotal": 0
                    },
                    {
                        "timeDesc": "5月",
                        "pureWaterTdsValue": 10,
                        "sourceWaterTdsValue": 20,
                        "pureWaterTotal": 30,
                        "sourceWaterTotal": 60
                    },
                    {
                        "timeDesc": "6月",
                        "pureWaterTdsValue": 20,
                        "sourceWaterTdsValue": 30,
                        "pureWaterTotal": 40,
                        "sourceWaterTotal": 50
                    },
                    {
                        "timeDesc": "7月",
                        "pureWaterTdsValue": 60,
                        "sourceWaterTdsValue": 20,
                        "pureWaterTotal": 10,
                        "sourceWaterTotal":10
                    },
                    {
                        "timeDesc": "8月",
                        "pureWaterTdsValue": 20,
                        "sourceWaterTdsValue": 30,
                        "pureWaterTotal": 40,
                        "sourceWaterTotal": 50
                    },
                    {
                        "timeDesc": "9月",
                        "pureWaterTdsValue": 103,
                        "sourceWaterTdsValue": 103,
                        "pureWaterTotal": 286,
                        "sourceWaterTotal": 290
                    }*/
                    //周
                    /* {
                     "timeDesc": "第1周",
                     "pureWaterTdsValue": 0,
                     "sourceWaterTdsValue": 0,
                     "pureWaterTotal": 0,
                     "sourceWaterTotal": 0
                     },
                     {
                     "timeDesc": "第2周",
                     "pureWaterTdsValue": 12,
                     "sourceWaterTdsValue": 13,
                     "pureWaterTotal": 197,
                     "sourceWaterTotal": 9074
                     },
                     {
                     "timeDesc": "第3周",
                     "pureWaterTdsValue": 12,
                     "sourceWaterTdsValue": 13,
                     "pureWaterTotal": 0,
                     "sourceWaterTotal": 38557
                     },
                     {
                     "timeDesc": "第4周",
                     "pureWaterTdsValue": 12,
                     "sourceWaterTdsValue": 13,
                     "pureWaterTotal": 0,
                     "sourceWaterTotal": 19558
                     },
                     {
                     "timeDesc": "第5周",
                     "pureWaterTdsValue": 63,
                     "sourceWaterTdsValue": 63,
                     "pureWaterTotal": 0,
                     "sourceWaterTotal": 0
                     }*/
                    //日
                    {
                     "timeDesc": "9.26",
                     "pureWaterTdsValue": 12,
                     "sourceWaterTdsValue": 13,
                     "pureWaterTotal": 10,
                     "sourceWaterTotal": 265
                     },
                     {
                     "timeDesc": "9.27",
                     "pureWaterTdsValue": 18,
                     "sourceWaterTdsValue": 19,
                     "pureWaterTotal": 22,
                     "sourceWaterTotal": 300
                     },
                     {
                     "timeDesc": "9.28",
                     "pureWaterTdsValue": 191,
                     "sourceWaterTdsValue": 593,
                     "pureWaterTotal": 233,
                     "sourceWaterTotal":333
                     },
                     {
                     "timeDesc": "9.29",
                     "pureWaterTdsValue": 102,
                     "sourceWaterTdsValue": 102,
                     "pureWaterTotal": 420,
                     "sourceWaterTotal": 20
                     },
                     {
                     "timeDesc": "9.30",
                     "pureWaterTdsValue": 20,
                     "sourceWaterTdsValue": 10,
                     "pureWaterTotal": 430,
                     "sourceWaterTotal": 20
                     },
                     {
                     "timeDesc": "10.01",
                     "pureWaterTdsValue": 10,
                     "sourceWaterTdsValue": 30,
                     "pureWaterTotal": 320,
                     "sourceWaterTotal": 50
                     },
                     {
                     "timeDesc": "10.02",
                     "pureWaterTdsValue": 10,
                     "sourceWaterTdsValue": 30,
                     "pureWaterTotal": 120,
                     "sourceWaterTotal": 40
                     }
                ]
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
setInterval(function(){
    webInterface.repaint({type:1,data:{
        hello:'运行数据',
        slide:2,
        MachineOperationState:'0',
        ManualWash:'0',
        PureWaterTdsValue:'7c4',
        SourceWaterTdsValue:'1f4',

        PP1ClearControl: '0',
        CO1ClearControl:'0',
        PP2ClearControl:'0',
        ROClearControl:'0',
        CO2ClearControl:'0',

        PP1Life:'1f4',
        CO1Life:'3e8',
        PP2Life:'3e8',
        ROLife:'3e8',
        CO2Life:'3e8',

        PP1LifeRemain:'1c2',
        CO1LifeRemain:'5a',
        PP2LifeRemain:'46',
        ROLifeRemain:'1e',
        CO2LifeRemain:'32',
    }});
}, 5200);





/*webInterface.repaint({type:1,


    /!*data:{
        hello:'运行数据',
        slide:2,
        MachineOperationState:'0',
        ManualWash:'0',
        PureWaterTdsValue:'7c4',
        SourceWaterTdsValue:'1f4',

        PP1ClearControl: '0',
        CO1ClearControl:'0',
        PP2ClearControl:'0',
        ROClearControl:'0',
        CO2ClearControl:'0',

        PP1Life:'1f4',
        CO1Life:'3e8',
        PP2Life:'3e8',
        ROLife:'3e8',
        CO2Life:'3e8',

        PP1LifeRemain:'1c2',
        CO1LifeRemain:'5a',
        PP2LifeRemain:'46',
        ROLifeRemain:'1e',
        CO2LifeRemain:'32',
    },*!/


    "data" : {
        "PP2Life" : "59",
        "ROLife" : "62",
        "K2Current" : "0000",
        "networkavailable" : "1",
        "PureWaterTdsValue" : "0000",
        "CO1Life" : "59",
        "deviceName" : "AMOS亚摩斯净水机",
        "K1Current" : "0000",
        "_bindUserId" : 1445,
        "CO1LifeRemain" : "009F",
        "PP2LifeRemain" : "009F",
        "PP1LifeRemain" : "0045",
        "PP1Life" : "4E",
        "WaterTemperature" : "19",
        "SourceWaterTotal" : "00014491",
        "PureWaterTotal" : "00000115",
        "BoosterCurent" : "0000",
        "ROLifeRemain" : "02BB",
        "MachineOperationState" : "03",
        "CO2Life" : "5F",
        "SourceWaterTdsValue" : "0000",
        "CO2LifeRemain" : "0153",
        "online" : "1"
    }


});*/

/*webInterface.repaint({
    type:1,
    "data" : {
        "PP2Life" : "59",
        "ROLife" : "62",
        "K2Current" : "0000",
        "networkavailable" : "1",
        "PureWaterTdsValue" : "10",
        "CO1Life" : "59",
        "deviceName" : "AMOS亚摩斯净水机",
        "K1Current" : "0000",
        "_bindUserId" : 1445,
        "CO1LifeRemain" : "009F",
        "PP2LifeRemain" : "009F",
        "PP1LifeRemain" : "0003",
        "PP1Life" : "12",
        "WaterTemperature" : "19",
        "SourceWaterTotal" : "00014491",
        "PureWaterTotal" : "00000115",
        "BoosterCurent" : "0000",
        "ROLifeRemain" : "02BB",
        "MachineOperationState" : "03",
        "CO2Life" : "5F",
        "SourceWaterTdsValue" : "0012",
        "CO2LifeRemain" : "0153",
        "online" : "1"
    }
});*/


/*if(base.length==1){
 return base*10;
 }else if(base.length==2){
 if(base>9){
 return base;
 }else{
 return parseInt(base);
 }
 }else if(base.length>3){
 if(parseInt(base)>=100){
 return base.substr(0,2);
 }else if(10<=parseInt(base)<100){
 return base.substr(1,1);
 }else{
 return 1;
 }
 }else{
 let c = base.substr(0,3);
 if(parseInt(c)>=100){
 return base.substr(0,2);
 }else if(10<=parseInt(c)<100){
 return base.substr(1,1);
 }else{
 return 1;
 }
 }*/


/*
switch (base.length){
    case 1:
        //0.6 60%
        return base*10;
        break;
    case 2:
        //0.06 60%
        if(base>9){
            return base;
        }else{
            return parseInt(base);
        }
        break;
    case 3:
        //0.001/0.039/0.139

        if(parseInt(base)>=100){
            return base.substr(0,2);
        }else if(9<parseInt(base)<100){
            return base.substr(1,1);
        }else{
            return 1;
        }
        /!*if (parseInt(base.match(/[^0].*!/)[0])<10){
         return '0.'+ base;
         }*!/
        break;
    default:
        let c = base.substr(0,3);
        if(parseInt(c)==0){
            return 1;
        }
        if(parseInt(c)>=100){
            return base.substr(0,2);
        }else if(9<parseInt(c)<100){
            return base.substr(1,1);
        }else{
            return 1;
        }
        break;
    /!*if(parseInt(base)>=100){
     return base.substr(0,2);
     }else if(10<=parseInt(base)<100){
     return base.substr(1,1);
     }else{
     return 1;
     }*!/
}

*/
