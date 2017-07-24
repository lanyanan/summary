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
export class SettingPanelCO2 extends BaseComponent{
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
        let data = {'CO2ClearControl':'01','updateFlagIdx':idx};
        Actions.resetFilter(data);
    }
    goShoping(){
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if(isFault()){het.toast(isFault());return false};
        //后置碳
        het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87138');
    }
    render() {
        //CO2滤芯 CO2Life=剩余时间百分比
        let CO2Life = parseInt(this.state.CO2Life,16);
        let CO2LifeRemain = parseInt(this.state.CO2LifeRemain,16);
        //let CO2LifePercent= computePercent(CO2LifeRemain,CO2Life);

        //圆形进度条
        let percent =  CO2Life <=100?CO2Life:100;
        let rightCircle = -135;
        let leftCircle = -135;
        if(percent<=50){
            //初始度数减去135度，0对应-135
            rightCircle = (percent*360)/100-135;
        }else{
            rightCircle = 45;
            leftCircle = (percent-50)*360/100-135;
        }
        //导航栏判断安卓73，苹果64
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'ios':'android';

        return (
            <section className={navigation}>
                <InnerPage percent={percent} rightCircle={rightCircle} leftCircle={leftCircle} />
                <div className="setting-inner">
                    <h3>预计剩余天数 <b>{CO2LifeRemain}</b>天</h3>
                    <p>滤芯说明：调节水质、改善口感、吸附异味。</p>
                    <p>建议更换周期：<span>6~9</span>个月</p>
                    <strong data-idx="8" onClick={this.resetFilter}>滤芯数据重置</strong>
                </div>
                <div id="mytoast"></div>
            </section>
        );
    }
};
