//import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {WaterLines} from './WaterLines.jsx';
import {WaterPlate} from './WaterPlate.jsx';//水质曲线父组件
import {SettingAnchor } from './SettingAnchor.jsx';
import {SettingPanelPP1 } from './SettingPanelPP1.jsx';
import {SettingPanelCO1 } from './SettingPanelCO1.jsx';
import {SettingPanelPP2 } from './SettingPanelPP2.jsx';
import {SettingPanelCO2 } from './SettingPanelCO2.jsx';
import {SettingPanelRO } from './SettingPanelRO.jsx';
const  {Router, Route, hashHistory, Link } = ReactRouter;
const  appData = {
    //故障数据计时器,计数器的初始值与故障值不相等，当故障数据数据进入时触发，且将两个值置为相等，防止重复触发故障弹窗
    networkavailible:0,
    online:0,
    counterK1State:0,
    counterK2State:0,
    counterBoosterPumpState:0,
    counterNTCState:0,
    counterFlowMeter1State:0,
    counterFlowMeter2State:0,
    counterMakeWaterOverTime:0,
    counterLackWater:0,
};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
    });
});

het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

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

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        //构造器里的state组件并未加载完所以取不到最后的值
        this.state = {
            networkavailable:1,
            online:1,
            K1State: '00',
            K2State: '00',
            BoosterPumpState:'00',
            NTCState:'00',
            FlowMeter1State:'00',
            FlowMeter2State:'00',
            MakeWaterOverTime:'00',
            LackWater:'00',

            ManualWash :  '00',
            washStart: 0,
            slide: 2,
            washOver:0,
            ManualWash : '00',
            SourceWaterTdsValue: '00',
            PureWaterTdsValue : '00',
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
            CO2ClearControl:'00',
        };
        this.hello = ()=>{
            return 'hello'
        }
        // 接收app推送数据
        Actions.back();
        this.listenStore(Store); // 监听Store
        this.showQualityList = this.showQualityList.bind(this);
        this.washDevice = this.washDevice.bind(this);
        this.liveError = this.liveError.bind(this);
        this.washWaterlines = this.washWaterlines.bind(this);
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
    showQualityList(e){
        e.preventDefault();
        let slide = this.state.slide===2? 1:2;
        Actions.slide({slide:slide});
    }
    washDevice(e){
        //appData.online = this.state.online;
        //appData.networkavailable = this.state.networkavailable;
        //if(isFault()){het.toast(isFault());return false};
        if(this.liveError()){het.toast(this.liveError());return false};

        if(parseInt(this.state.MachineOperationState,16)!=1){
            Actions.washDevice({'ManualWash':'01',MachineOperationState:'01',slide:2});
            this.setState({
                MachineOperationState:'01',
                slide:2
            })
        }else{
            het.toast('设备冲洗中...');
        }
    }
    washWaterlines(){
        if(this.liveError()){het.toast(this.liveError());return false}
        window.location.href = '#/waterlines'
    }
    render() {
        //设备冲洗
        let washData = {
            washStart: this.state.washStart,
            slide: this.state.slide,
            washOver: this.state.washOver,

            networkavailable: this.state.networkavailable,
            online: this.state.online,
            K1State: this.state.K1State,
            K2State:  this.state.K2State,
            BoosterPumpState: this.state.BoosterPumpState,
            NTCState: this.state.NTCState,
            FlowMeter1State: this.state.FlowMeter1State,
            FlowMeter2State: this.state.FlowMeter2State,
            MakeWaterOverTime: this.state.MakeWaterOverTime,
            LackWater: this.state.LackWater,

            ManualWash : parseInt(this.state.ManualWash, 16),
            SourceWaterTdsValue: parseInt(this.state.SourceWaterTdsValue, 16),
            PureWaterTdsValue: parseInt(this.state.PureWaterTdsValue, 16),
            MachineOperationState: parseInt(this.state.MachineOperationState, 16),
        };
        //重置滤芯
        let settingData = {
            slide: this.state.slide,
            SourceWaterTdsValue: parseInt(this.state.SourceWaterTdsValue, 16),
            PureWaterTdsValue: parseInt(this.state.PureWaterTdsValue, 16),
            PP1Life: parseInt(this.state.PP1Life, 16),
            CO1Life: parseInt(this.state.CO1Life, 16),
            PP2Life: parseInt(this.state.PP2Life, 16),
            ROLife:  parseInt(this.state.ROLife, 16),
            CO2Life: parseInt(this.state.CO2Life, 16),
            PP1LifeRemain: parseInt(this.state.PP1LifeRemain, 16),
            CO1LifeRemain: parseInt(this.state.CO1LifeRemain, 16),
            PP2LifeRemain: parseInt(this.state.PP2LifeRemain, 16),
            ROLifeRemain:  parseInt(this.state.ROLifeRemain, 16),
            CO2LifeRemain: parseInt(this.state.CO2LifeRemain, 16),
        }; //console.log('状态---',this.state.MachineOperationState)
        //导航栏判断安卓73，苹果64 ~
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'app-body ios':'app-body android';
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
        return(
            <main className={navigation}>
                <WaterPlate washDevice={this.washDevice} washWaterlines={this.washWaterlines} washData={washData} MachineOperationState={this.state.MachineOperationState} />
                <SettingAnchor showQualityList={this.showQualityList} settingData={settingData} />
            </main>
        )
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('净水器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/waterLines" component={WaterLines} />
            <Route path="/SettingPanelPP1" component={SettingPanelPP1} />
            <Route path="/SettingPanelCO1" component={SettingPanelCO1} />
            <Route path="/SettingPanelPP2" component={SettingPanelPP2} />
            <Route path="/SettingPanelCO2" component={SettingPanelCO2} />
            <Route path="/SettingPanelRO"  component={SettingPanelRO} />
        </Router>
    ), document.getElementById('ROOT'));
})
////////////////////////////  
// ////////////////////////////
// ////////////////////////////
// ///                               
// /////                                                                                                                                                                                                                                                                                                                                          