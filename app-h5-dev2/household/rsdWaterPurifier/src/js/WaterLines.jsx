import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {EchartsBar } from './EchartsBar.jsx';
import {EchartsLiner } from './EchartsLiner.jsx';
export class WaterLines extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            codes:this.state.codes,
            waterlines:[],
            count: 1
        };
        this.listenStore(Store); // 监听Store
        this.changeType = this.changeType.bind(this);
        this.liveError = this.liveError.bind(this);
    }
    componentDidMount() {
        Actions.waterLines(0);
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
    changeType(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        if(e.currentTarget.getAttribute('class')=='flex-cell active') return false;
        let idx = e.currentTarget.getAttribute('data-idx');
        Actions.waterLines(idx);
        //console.log('-----------选中模式',e.currentTarget.getAttribute('data-idx'));
    }
    render() {
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'ios':'android';
        let changeCycleArray = ['日','月','年'];
        let idx = this.state.type!=undefined ? this.state.type  : 0;
        //let waterlines = this.state.waterlines? this.state.waterlines:[];
        return (
            <main>
                <section className={"charts-area "+navigation}>
                    <div className="liner-box">
                        <i id="liner-title"></i>
                        <EchartsLiner waterlines={this.state.waterlines} renderWaterline={this.state.renderWaterline} />
                    </div>
                    <div className="bar-box">
                        <EchartsBar waterlines={this.state.waterlines} renderWaterline={this.state.renderWaterline} />
                        <i id="bar-title"></i>
                        <div id="change-cycle" className="flex change-type">
                            {changeCycleArray.map(
                                ((element,index)=>{
                                    return(
                                        <span key={index} className={'flex-cell'+( index == idx?' active':'')} data-idx={index} onTouchStart={this.changeType}>{element}</span>
                                    )}).bind(this)
                            )}
                        </div>
                    </div>
                </section>
            </main>
        );
    }
};
