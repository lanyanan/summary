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
import { SettingPanelRO } from './SettingPanelRO.jsx';
import {Tips} from '../../../common/src/Tips.es6';

const { Router, Route, hashHistory, Link } = ReactRouter;
const appData = {};
const isFault = () => {
    if (appData.networkavailable == 2) {
        return '请检查网络';
    }
    if (appData.online == 2) {
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
            ManualWash :  '00',
            washStart: 0,
            slide: 2,
            washOver:0,
            ManualWash : '00',
            networkavailable:1,
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
            tipsMsg: '',
            showTips: false
        };

        //轮询数据
        this.trainTimer = setInterval(function(){
            Actions.intervalData();
        },5000);
        Actions.intervalData();
        this.listenStore(Store); // 监听Store
        // 获取故障信息
        this.falutTimer = setInterval(function(){
            Actions.getFaultData();
        },5000);


        this.showQualityList = this.showQualityList.bind(this);
        this.washDevice = this.washDevice.bind(this);
        this.errClickTips =this.errClickTips.bind(this);
    }
    componentWillUnmount() {
        clearInterval(this.trainTimer);
        clearInterval(this.falutTimer);
    }
    showQualityList(e) {
        e.preventDefault();
        let slide = this.state.slide === 2 ? 1 : 2;
        Actions.slide({slide: slide});
    }
    errClickTips() {
        this.setState({showTips: false});
    }
    washDevice(e) {
        appData.online = this.state.online;
        appData.networkavailable = this.state.networkavailable;
        if (isFault()) {
            het.toast(isFault());
            return false;
        };
        if (parseInt(this.state.MachineOperationState, 16) != 1) {
            Actions.washDevice({'ManualWash': '01', MachineOperationState: '01', slide: 2});
            this.setState({MachineOperationState: '01', slide: 2});
        } else {
            het.toast('设备冲洗中...');
        }
    }
    render() {
        let washData = {
            washStart: this.state.washStart,
            slide: this.state.slide,
            washOver: this.state.washOver,
            online:this.state.online,
            networkavailable: this.state.networkavailable,
            ManualWash : parseInt(this.state.ManualWash, 16),
            SourceWaterTdsValue: parseInt(this.state.SourceWaterTdsValue, 16),
            PureWaterTdsValue: parseInt(this.state.PureWaterTdsValue, 16),
            MachineOperationState: parseInt(this.state.MachineOperationState, 16),
        };
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
        };
        //console.log('状态---',this.state.MachineOperationState)
        //导航栏判断安卓73，苹果64
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'app-body ios':'app-body android';
        return(
            <main className={navigation}>
                <WaterPlate washDevice={this.washDevice} washData={washData} MachineOperationState={this.state.MachineOperationState}   />
                <SettingAnchor showQualityList={this.showQualityList} settingData={settingData} />
                <div id="mytoast"></div>
                <Tips msg={this.state.tipsMsg} btn1='' btn2='我知道了' show={this.state.showTips}  errCallback={this.errClickTips} />
            </main>
        )
    }
}


het.domReady(() => {

    het.config({
        appId: '30590',
        appSecret:'98889238ed6e441aaf9b0691b017695f'
    });

    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/waterLines" component={WaterLines}/>
            <Route path="/SettingPanelPP1" component={SettingPanelPP1}/>
            <Route path="/SettingPanelCO1" component={SettingPanelCO1}/>
            <Route path="/SettingPanelPP2" component={SettingPanelPP2}/>
            <Route path="/SettingPanelCO2" component={SettingPanelCO2}/>
            <Route path="/SettingPanelRO" component={SettingPanelRO}/>
        </Router>
    ), document.getElementById('ROOT'));
})
