// app注入对象
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
                hello: '当你看到这条信息，表明种子项目已成功运行！',
                iswicth:1,
                mode: 0,
                runningMode: 0,
                charging:false,
                battery:10,
                sleeping:0,
                measureStatus:0,
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

let data = [
    {
        "avgWater": 31.38,
        "avgOil": 16.68,
        "avgElasticity": 9.87,
        "measureDate": "2016-12-01",
        "measureRec": [
            {
                "measureTime": "2016-12-01 02:04:00",
                "water": 27.76,
                "oil": 15.8,
                "elasticity": 9.74,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-01 02:15:06",
                "water": 30.18,
                "oil": 16.84,
                "elasticity": 9.9,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-01 02:48:10",
                "water": 21,
                "oil": 12.68,
                "elasticity": 9.9,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-01 02:53:32",
                "water": 48.14,
                "oil": 21.4,
                "elasticity": 9.9,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-01 09:00:47",
                "water": 29.8,
                "oil": 16.7,
                "elasticity": 9.9,
                "skinMeterId": null
            }
        ]
    },
    {
        "avgWater": 33.63,
        "avgOil": 17.89,
        "avgElasticity": 8.44,
        "measureDate": "2016-12-02",
        "measureRec": [
            {
                "measureTime": "2016-12-02 01:15:25",
                "water": 30.98,
                "oil": 17.02,
                "elasticity": 7.18,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 01:52:25",
                "water": 51.8,
                "oil": 24,
                "elasticity": 8.68,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 02:40:09",
                "water": 39.56,
                "oil": 19.72,
                "elasticity": 7.58,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 02:53:14",
                "water": 29.1,
                "oil": 16.36,
                "elasticity": 8.68,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 02:57:20",
                "water": 33.28,
                "oil": 17.94,
                "elasticity": 7.24,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 03:04:12",
                "water": 29.34,
                "oil": 16.46,
                "elasticity": 9.36,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 03:09:23",
                "water": 29.28,
                "oil": 16.48,
                "elasticity": 9.3,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-02 05:28:49",
                "water": 25.68,
                "oil": 15.14,
                "elasticity": 9.5,
                "skinMeterId": null
            }
        ]
    },
    {
        "avgWater": 48.47,
        "avgOil": 22.66,
        "avgElasticity": 8.51,
        "measureDate": "2016-12-03",
        "measureRec": [
            {
                "measureTime": "2016-12-03 06:21:47",
                "water": 43.68,
                "oil": 21.06,
                "elasticity": 7.74,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-03 07:30:46",
                "water": 57.28,
                "oil": 25.94,
                "elasticity": 8.98,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-03 07:32:59",
                "water": 44.44,
                "oil": 20.98,
                "elasticity": 8.8,
                "skinMeterId": null
            }
        ]
    },
    {
        "avgWater": 37.35,
        "avgOil": 18.69,
        "avgElasticity": 6.02,
        "measureDate": "2016-12-05",
        "measureRec": [
            {
                "measureTime": "2016-12-05 01:57:21",
                "water": 31.4,
                "oil": 15.4,
                "elasticity": 4.2,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 05:36:53",
                "water": 48.52,
                "oil": 22.78,
                "elasticity": 8.9,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 05:43:25",
                "water": 38.3,
                "oil": 19.88,
                "elasticity": 7.86,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 05:52:11",
                "water": 24.96,
                "oil": 14.48,
                "elasticity": 4.3,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 06:06:37",
                "water": 38.26,
                "oil": 18.72,
                "elasticity": 4.76,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 06:15:17",
                "water": 43.88,
                "oil": 16.14,
                "elasticity": 7.56,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 06:34:07",
                "water": 25.58,
                "oil": 14.84,
                "elasticity": 9.06,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 07:07:20",
                "water": 32.86,
                "oil": 17.66,
                "elasticity": 4.78,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 07:12:02",
                "water": 36.12,
                "oil": 19.14,
                "elasticity": 7.56,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 07:30:54",
                "water": 43.74,
                "oil": 22.12,
                "elasticity": 8.42,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 09:34:02",
                "water": 36.12,
                "oil": 19.02,
                "elasticity": 6.14,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 09:37:27",
                "water": 21.36,
                "oil": 12.82,
                "elasticity": 1.44,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 09:42:45",
                "water": 40.78,
                "oil": 20.52,
                "elasticity": 5.26,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 09:48:39",
                "water": 44.22,
                "oil": 21.44,
                "elasticity": 6.8,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 09:54:58",
                "water": 21.9,
                "oil": 13.04,
                "elasticity": 2.26,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 11:33:14",
                "water": 53.5,
                "oil": 24.6,
                "elasticity": 7.2,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 11:41:01",
                "water": 38.8,
                "oil": 18.9,
                "elasticity": 4.3,
                "skinMeterId": null
            },
            {
                "measureTime": "2016-12-05 12:47:45",
                "water": 52.02,
                "oil": 25,
                "elasticity": 7.58,
                "skinMeterId": null
            }
        ]
    },
    {
        "avgWater": 52.6,
        "avgOil": 23.1,
        "avgElasticity": 0,
        "measureDate": "2016-12-06",
        "measureRec": [
            {
                "measureTime": "2016-12-06 04:07:38",
                "water": 52.6,
                "oil": 23.1,
                "elasticity": 0,
                "skinMeterId": null
            }
        ]
    }
];
let refactorArr = ()=>{
    let arr = [];
    data.map((item,index)=>{
        arr[index] = item.measureDate
        // console.log(item.measureDate)
    });
    return arr;
};

let xAxis = refactorArr(data,data.measureDate)

//let result =(data)=>{
//    let arr = [];
//    arr.push(item);
//
//    for(let i in data) {
//        arr.push(item);
//    }
//    return JSON.stringify(JSON.parse(arr))
//};



//let xAxisArr =result.map((item,index)=>{
//    let arr = [];
//    arr.push(item[index].measureDate);
//    return JSON.stringify(JSON.parse(arr))
//});


