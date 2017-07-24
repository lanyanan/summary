'use strict';
/**
 * 重置滤芯
 */
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
export class SettingPanelPP1 extends BaseComponent{
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
        this.liveError = this.liveError.bind(this);
    }
    liveError(){
        if(this.state.online==2){
            return '设备与APP已断开连接！'
        }
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        if(this.state.K1State=='01'){
            return 'K1电池阀故障'
        }
        if(this.state.K2State=='01'){
            return 'K2电池阀故障'
        }
        if(this.state.BoosterPumpState=='01'){
            return '增压泵故障'
        }
        if(this.state.NTCState=='01'){
            return 'NTC故障'
        }
        if(this.state.FlowMeter1State=='01'){
            return '流量计1故障'
        }
        if(this.state.FlowMeter2State=='01'){
            return '流量计2故障'
        }
        if(this.state.MakeWaterOverTime=='01'){
            return '制水超时故障'
        }
        if(this.state.LackWater=='01'){
            return '缺水故障'
        }
        return false;
    }
    resetFilter(e){
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if(isFault()){het.toast(isFault());return false};


        if(this.liveError()){het.toast(this.liveError());return false};
        let idx = e.currentTarget.getAttribute('data-idx');
        let data = {'PP1ClearControl':'01','updateFlagIdx':idx};
        Actions.resetFilter(data);
    }
    goShoping(){
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if(isFault()){het.toast(isFault());return false};

        if(this.liveError()){het.toast(this.liveError());return false};
        //PP棉滤芯~
        het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87074');
    }
    render() {
        //PP1滤芯 PP1Life = 剩余时间百分比;
        let PP1Life = parseInt(this.state.PP1Life,16);
        let PP1LifeRemain = parseInt(this.state.PP1LifeRemain,16);
        //let PP1LifePercent= computePercent(PP1LifeRemain,PP1Life);

        //圆形进度条
        let percent = PP1Life <=100?PP1Life:100;
        let rightCircle = -135;
        let leftCircle = -135;
        if(percent<=50){
            //初始度数减去135度，0对应-135
            rightCircle = (percent*360)/100-135;
            //console.log('percent----R--------',percent);
        }else{
            rightCircle = 45;
            leftCircle = (percent-50)*360/100-135;
            //console.log('percent-----L-------',percent);~
        }
        //导航栏判断安卓73，苹果64
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'ios':'android';
        let buyHref = isIOS ? 'http://www.clife.cn':'http://www.clife.cn';
        //<InnerPage percent={percent} rightCircle={rightCircle} leftCircle={leftCircle} />
        //故障处理主动弹出
        let activeHint = (err,msg)=>{if(appData['counter'+err]!=this.state[err]){
            appData['counter'+err] = this.state[err];
            this.state[err] == 1 && (het.toast(msg));
        }};
        activeHint('K1State','K1电池阀故障');
        activeHint('K2State','K2电池阀故障');
        activeHint('BoosterPumpState','增压泵故障');
        activeHint('NTCState','NTC故障');
        activeHint('FlowMeter1State','流量计1故障');
        activeHint('FlowMeter2State','流量计2故障');
        activeHint('MakeWaterOverTime','制水超时故障');
        activeHint('LackWater','缺水故障');
        return (
            <section className={navigation}>

                <div className="setting-percent">
                    <div className="circle-progress-wrapper">
                        {parseInt(percent)}%
                        <div className="wrapper right">
                            <div className="circle-progress right-circle" style={{'WebkitTransform': 'rotate('+rightCircle+'deg)'}}></div>
                        </div>
                        <div className="wrapper left">
                            <div className="circle-progress left-circle" style={{'WebkitTransform': 'rotate('+leftCircle+'deg)'}}></div>
                        </div>
                    </div>
                </div>
                <div className="setting-inner">
                    <h3>预计剩余天数<b>{PP1LifeRemain}</b>天</h3>
                    <p>滤芯说明：滤除水中<span className="blue">铁屑</span>、<span className="blue">淤泥</span>、<span className="blue">毛发</span>、<span className="blue">沙石</span>、<span className="blue">漂浮物</span>等</p>
                    <p>建议更换周期：<span>6~9</span>个月</p>
                    <figure onClick={this.goShoping}>立即购买</figure>
                    <strong data-idx="4" onClick={this.resetFilter}>滤芯数据重置</strong>
                </div>
            </section>
        );
    }
};






