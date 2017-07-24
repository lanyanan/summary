'use strict';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {InnerPage } from './InnerPage.jsx';
const appData = {}
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

export class SettingPanelCO1 extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            ManualWash :  '00',
            slide: 2,
            washOver:0,
            SourceWaterTdsValue: '00',
            PureWaterTdsValue :  '00',//这里组件并未加载完所以取不到最后的值
            MachineOperationState: '00',
            PP1Life: '00',
            CO1Life: '00',
            PP2Life: '00',
            ROLife: '00',
            CO2Life: '00',
            PP1LifeRemain: '00',
            CO1LifeRemain: '00',
            PP2LifeRemain: '00',
            ROLifeRemain:  '00',
            CO2LifeRemain: '00',

            PP1ClearControl:'00',
            CO1ClearControl:'00',
            PP2ClearControl:'00',
            ROClearControl:'00',
            CO2ClearControl:'00'
        };
        this.listenStore(Store); // 监听Store
        Actions.back();
        this.resetFilter = this.resetFilter.bind(this);
        this.goShoping = this.goShoping.bind(this);
    }
    resetFilter(e){
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if(isFault()){het.toast(isFault());return false};
        let idx = e.currentTarget.getAttribute('data-idx');
        let data = {'CO1ClearControl':'01','updateFlagIdx':idx};
        Actions.resetFilter(data);
    }
    goShoping(){
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if(isFault()){het.toast(isFault());return false};
        //前置碳
        het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87142');
    }
    render() {
        let toFixed = function(s)
        {
            let changenum=(parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
            let index=changenum.indexOf(".");
            if(index<0&&s>0){
                changenum=changenum+".";
                for(let i=0;i<s;i++){
                    changenum=changenum+"0";
                }

            }else {
                index=changenum.length-index;
                for(let i=0;i<(s-index)+1;i++){
                    changenum=changenum+"0";
                }

            }
            return changenum;
        };
        let computePercent=(remain,all)=> {
            let percent = (remain/all)*100;
            if(remain == 0||remain>all) return percent=0;
            if(percent<1){
                return percent=1;
            }
            if(percent>99.5 && percent<100) {
                return percent= 99;
            }else{
                return percent = ((remain/all)*100).toFixed(0);
            }
        };

        //对应规则
        //PP棉：  2160小时；3个月  PP1
        //前置炭：4320小时；6个月  CO1
        //PP棉：  4320小时；6个月  PP2
        //RO膜： 17280小时；2年    RO
        //后置炭：8640小时；12个月  CO2

        //CO1滤芯 CO1Life=设备剩余时间百分比
        let CO1Life = parseInt(this.state.CO1Life,16);
        let CO1LifeRemain = parseInt(this.state.CO1LifeRemain,16);
        let CO1LifePercent= computePercent(CO1LifeRemain,180);

        //圆形进度条
        let percent = CO1Life<=100? CO1Life:100;
        let rightCircle = -135;
        let leftCircle = -135;
        if(percent<=50){
            //初始度数减去135度，0对应-135
            rightCircle = (percent*360)/100-135;
            //console.log('percent----R--------',percent);
        }else{
            rightCircle = 45;
            leftCircle = (percent-50)*360/100-135;
            //console.log('percent-----L-------',percent);
        }
        //导航栏判断安卓73，苹果64
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'ios':'android';

        return (
          <div>
            <section className={navigation}>
                <InnerPage percent={percent} rightCircle={rightCircle} leftCircle={leftCircle} />
                <div className="setting-inner">
                    <h3>预计剩余天数<b>{CO1LifeRemain}</b>天</h3>
                    <p>滤芯说明：滤除水中<span className="blue">余氯</span>、<span className="blue">三氯甲烷</span>、<span className="blue">漂白剂</span>、<span className="blue">农药</span>等化学物质及杂色、异味。</p>
                    <p>建议更换周期：<span>6~9</span>个月</p>
                    <strong data-idx="5" onClick={this.resetFilter}>滤芯数据重置</strong>
                </div>
            </section>
            <div id="mytoast"></div>
            </div>
        );
    }
};
//
