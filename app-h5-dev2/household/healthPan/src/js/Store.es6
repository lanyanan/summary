'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 * @modeArray 后台未返回模式数组或对象，建立一个本地数组用作维护
 */
import {Actions} from './Actions.es6';
let modeArray = [
    {id:0,name:'模式',fire:false,},
    {id:1,name:'火锅',fire:'武火',heatinghour:0,heatingmin:15},
    {id:2,name:'蒸鱼',fire:false,heatinghour:0,heatingmin:15},
    {id:3,name:'蒸蛋',fire:false,heatinghour:0,heatingmin:16},
    {id:4,name:'包子',fire:false,heatinghour:0,heatingmin:18},
    {id:5,name:'馒头',fire:false,heatinghour:0,heatingmin:22},
    {id:6,name:'排骨',fire:false,heatinghour:0,heatingmin:24},
    {id:7,name:'蒸饭',fire:false,heatinghour:0,heatingmin:35},
    {id:8,name:'保温',fire:false,heatinghour:1,heatingmin:0},
    {id:9,name:'自定时',fire:false,heatinghour:0,heatingmin:20},
];
const appData = {
    timer:null,
};
const isFault = () => {
    if(appData.networkavailable==2){
        console.log('请检查网络');
        return '请检查网络';
    }
    if(appData.online==2){
        console.log('设备与APP已断开连接!');
        return '设备与APP已断开连接!';
    }
    return false;
}
// 数据过滤计时器
let dataFilterTimers = {
    YunXingGongZuoMoShi:0,
    YunXingHuoLiSheZhi:0,
    YuYueShiJianXiaoShi : 0,
    YuYueShiJianFenZhong: 0,
    ShengYuShiJianXiaoShi : 0,
    ShengYuShiJianfenZhong: 0,
};
// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}
// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas){

        //开启数据筛选
        let data = dataFilter(datas);
        //缓存数据到appData里，协议定义中文>_<，中转一下字段发送
        appData.modeArray = modeArray;
        //控件显隐应该本地维护，不应该在这里设置，会一直导致控件隐藏  if(data.selectshow) appData.selectshow = data.selectshow;
        //控制数据(选择控件)
        if(data.GongZuoMoShiSheZhi!=undefined)         appData.mode = data.GongZuoMoShiSheZhi,appData.modeName = modeArray[data.GongZuoMoShiSheZhi].name;
        if(data.YuYueShiJianSheZhiXiaoShi!=undefined)  appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
        if(data.YuYueShiJianSheZhiFenZhong!=undefined) appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
        if(data.HuoLiSheZhi!=undefined)                appData.fire = data.HuoLiSheZhi;
        if(data.JiaReShiJianSheZhiXiaoShi!=undefined)  appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
        if(data.JiaReShiJianSheZhiFenZhong!=undefined) appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;
        //运行数据
        if(data.YunXingGongZuoMoShi!=undefined) appData.runningMode = data.YunXingGongZuoMoShi,appData.runningModeName = modeArray[data.YunXingGongZuoMoShi].name;//运行工作模式
        //运行火力设置
        if(data.YunXingHuoLiSheZhi!=undefined) appData.runningFire = data.YunXingHuoLiSheZhi;
        //剩余预约时间
        if(data.YuYueShiJianXiaoShi!=undefined)      appData.surplusreservehour = data.YuYueShiJianXiaoShi;
        if(data.YuYueShiJianFenZhong!=undefined)     appData.surplusreservemin = data.YuYueShiJianFenZhong;
        //剩余加热时间
        if(data.ShengYuShiJianXiaoShi!=undefined)    appData.surplusworkhour = data.ShengYuShiJianXiaoShi;
        if(data.ShengYuShiJianfenZhong!=undefined)   appData.surplusworkmin = data.ShengYuShiJianfenZhong;
        //离线&故障
        if(data.online)                             appData.online = data.online;
        if(data.networkavailable)                   appData.networkavailable = data.networkavailable;
        if(data.GaoWenBaoHu!=undefined)             appData.hightemperature = data.GaoWenBaoHu;
        if(data.GanShaoBaoHu!=undefined)            appData.dryburning = data.GanShaoBaoHu;
        if(data.ChuanGanQiKaiLuGuZhang!=undefined)  appData.opencircuit = data.ChuanGanQiKaiLuGuZhang;
        if(data.ChuanGanQiDuanLuGuZhang!=undefined) appData.shortcircuit = data.ChuanGanQiDuanLuGuZhang;
        this.trigger(appData);
    },
    onLocal(data){
        this.trigger(appData);
    },
    onCancel(data){
        data.hideNativeLoading=true;
        data.updateFlag = het.hexUpFlag(3,1,2);
        het.send(data, function(data){},function(data){het.toast("命令发送失败")});
        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
        appData.mode = 0;
        appData.modeName = '模式';

        //控制数据
        appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
        appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
        appData.fire = data.HuoLiSheZhi;
        appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
        appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;

        //开启定时筛选(待机只有这两个字段需要筛选)
        setDataTimer('YunXingGongZuoMoShi','YunXingHuoLiSheZhi');
        //运行数据
        appData.runningMode = 0;
        appData.runningModeName = '模式';
        appData.runningFire = 1;
        this.trigger(appData);
        //console.log('取消',data);
    },
    onCancelSelect(){
        this.trigger({selectshow:false});
    },
    onSubmitSelect(h,m,where,live){
        if(live == true){
            let liveSend = {};
            het.setTitle('{"hideNativeLoading":"true"}');
            //实时火力设置
            if(where==1) {
                liveSend.updateFlag = het.hexUpFlag(0, 1, 2);
                liveSend.HuoLiSheZhi = 0;
                h == '武' && (liveSend.HuoLiSheZhi = 0);
                h == '文' && (liveSend.HuoLiSheZhi = 1);
                het.send(liveSend, (data)=>{}, (data)=>{het.toast("命令发送失败")});

                //开启定时筛选
                setDataTimer('YunXingHuoLiSheZhi');
                appData.fire = liveSend.HuoLiSheZhi;
                appData.runningFire = liveSend.HuoLiSheZhi;
                this.trigger({
                    fire:liveSend.HuoLiSheZhi,
                    runningFire:liveSend.HuoLiSheZhi
                });
            }
            //实时加热时间设置
            if(where==2) {
                liveSend.updateFlag = het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2));
                liveSend.JiaReShiJianSheZhiXiaoShi = 0;
                liveSend.JiaReShiJianSheZhiFenZhong = parseInt(h);
                h == 60 && (liveSend.JiaReShiJianSheZhiXiaoShi = 1,liveSend.JiaReShiJianSheZhiFenZhong = 60);
                het.send(liveSend, (data)=>{}, (data)=>{het.toast("命令发送失败")});

                //开启定时筛选
                setDataTimer('ShengYuShiJianXiaoShi','ShengYuShiJianfenZhong');
                appData.surplusworkhour = liveSend.JiaReShiJianSheZhiXiaoShi;
                appData.surplusworkmin = liveSend.JiaReShiJianSheZhiFenZhong;
                this.trigger({
                    surplusworkhour:liveSend.JiaReShiJianSheZhiXiaoShi,
                    surplusworkmin:liveSend.JiaReShiJianSheZhiFenZhong
                });
            }
            //console.log('-h-m-where-live---liveData----加热--------',h,m,where,live,liveSend);
        }else{
            //非实时更改
            let selectArray = {};
            switch(parseInt(where)){
                //预约时间
                case 0:
                    selectArray.selectReservehour=h;
                    selectArray.selectReservemin=m;
                    if(h==15) selectArray.selectReservemin=0;
                    break;
                //火力
                case 1:
                    if(h=='武') selectArray.selectFire=0;
                    if(h=='文') selectArray.selectFire=1;
                    if(h== 0)   selectArray.selectFire=0;
                    break;
                //加热时间
                case 2:
                    //加热时间使用参数h作为分钟数的值
                    selectArray.selectHeatinghour=0;
                    selectArray.selectHeatingmin=parseInt(h);
                    if(h==60) selectArray.selectHeatinghour=1,selectArray.selectHeatingmin=0;
                    break;
            }
            this.trigger(selectArray);
        }
    },
    onSlide(data){
        if(isFault()){het.toast(isFault());return false};
        this.trigger(appData);
    },
    onSelectMode(data){
        this.trigger(data);
    },
    onChangeMode(data){
        //置位字段加入计算，其他的按协议或约定发送
        let updateFlag = het.hexUpFlag(1, 1, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)))));
            if(data.GongZuoMoShiSheZhi == 0) updateFlag = het.hexUpFlag(3, 1, 2);
            if(data.GongZuoMoShiSheZhi == 1) updateFlag = het.hexUpFlag(0, 1, 2,het.hexUpFlag(3, 1, 2));
            if(data.GongZuoMoShiSheZhi == 8) updateFlag = het.hexUpFlag(3, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)));
        data.updateFlag = updateFlag;
        het.send(data, (data)=>{},(data)=>{het.toast("命令发送失败")});
        //用运行数据渲染，控制数据ios和android数据发送顺序表现不一致，日了狗了，又要发控制数据又要发运行数据
        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
        appData.mode = data.GongZuoMoShiSheZhi;
        appData.modeName = modeArray[data.GongZuoMoShiSheZhi].name;

        //控制数据
        appData.reservehour = data.YuYueShiJianSheZhiXiaoShi;
        appData.reservemin = data.YuYueShiJianSheZhiFenZhong;
        appData.fire = data.HuoLiSheZhi;
        appData.heatinghour = data.JiaReShiJianSheZhiXiaoShi;
        appData.heatingmin = data.JiaReShiJianSheZhiFenZhong;

        //开启定时筛选，并使用运行数据渲染
        setDataTimer('YunXingGongZuoMoShi','YunXingHuoLiSheZhi','YuYueShiJianXiaoShi','YuYueShiJianFenZhong','ShengYuShiJianXiaoShi','ShengYuShiJianfenZhong');

        //运行数据 >>> 模式和模式名 >>> 剩余预约时间 >>> 剩余加热时间 维护运行数据的目的是开启数据筛选
        appData.runningMode = data.GongZuoMoShiSheZhi;
        appData.runningModeName = modeArray[data.GongZuoMoShiSheZhi].name;
        appData.runningFire = data.HuoLiSheZhi;

        appData.surplusreservehour = data.YuYueShiJianSheZhiXiaoShi;
        appData.surplusreservemin = data.YuYueShiJianSheZhiFenZhong;

        appData.surplusworkhour = data.JiaReShiJianSheZhiXiaoShi;
        appData.surplusworkmin = data.JiaReShiJianSheZhiFenZhong;

        this.trigger(appData);
    }
});