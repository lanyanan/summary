/**
 * Created by yuanyunlong on 2017/1/10.
 */


const  orderDataArray =  [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] ;
const  waterLevelDataArray = ['1档','2档','3档','4档','5档','6档','7档','8档','9档','10档'] ;
const  processDataArray = ['洗涤+漂洗+脱水','浸泡+洗涤+漂洗+脱水','洗涤','洗涤+漂洗','漂洗+脱水','脱水'];
var  specialDataArray = ['无','留水','夜间','洁桶','风干90分钟'];

// totalTime 【洗衣总时间】 SoakTotalTime【浸泡总时间】 WashTotalTime【洗涤总时间】  RinseTotalTime【漂洗总时间】  DehydrationTotalTime【脱水总时间】
const  washerModeS = [
    {id: 0, name:'标准',totalTime:43,SoakTotalTime:12,WashTotalTime:12 ,RinseTotalTime:24,DehydrationTotalTime:5,},
    {id: 1, name:'快速',totalTime:26,SoakTotalTime:12,WashTotalTime:9 ,RinseTotalTime:9,DehydrationTotalTime:3,},
    {id: 2, name:'强力',totalTime:48,SoakTotalTime:12,WashTotalTime:15 ,RinseTotalTime:30,DehydrationTotalTime:7,},
    {id: 3, name:'羊毛',totalTime:31,SoakTotalTime:12,WashTotalTime:9 ,RinseTotalTime:18,DehydrationTotalTime:2,},
    {id: 4, name:'化纤',totalTime:43,SoakTotalTime:12,WashTotalTime:12 ,RinseTotalTime:24,DehydrationTotalTime:5,},
    {id: 5, name:'牛仔',totalTime:59,SoakTotalTime:12,WashTotalTime:15 ,RinseTotalTime:45,DehydrationTotalTime:7,},
    {id: 6, name:'棉麻',totalTime:48,SoakTotalTime:12,WashTotalTime:15 ,RinseTotalTime:30,DehydrationTotalTime:7,},
    {id: 7, name:'仿生',totalTime:43,SoakTotalTime:12,WashTotalTime:12 ,RinseTotalTime:24,DehydrationTotalTime:5,},
    {id: 8, name:'童衣',totalTime:59,SoakTotalTime:12,WashTotalTime:15 ,RinseTotalTime:45,DehydrationTotalTime:7,},
    {id: 9, name:'内衣',totalTime:26,SoakTotalTime:12,WashTotalTime:9 ,RinseTotalTime:9,DehydrationTotalTime:3,}
];
export {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS};

