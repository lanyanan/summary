// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store,isClose} from './Store.jsx';
const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
        filter : {
            'ManualWash' : 0,//工作模式取控制数据type:0
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
    Actions.repaint(data); 
});
// 创建React组件
class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            MachineOperationState:'00'
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.handleWash = this.handleWash.bind(this);
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
    handleWash(e){//出来操作
        if(this.liveError()){het.toast(this.liveError());return false}
        e.preventDefault();
        parseInt(this.state.MachineOperationState,16)!=1 && Actions.washDevice({'ManualWash':'01',MachineOperationState:'01',slide:2});
        //立即更改状态
        //this.setState({
        //     ManualWash:'01',
        //     MachineOperationState:'01'
        //     slide:2
        //})
    }
    render() {
        let online = this.state.online;
        let networkavailable = this.state.networkavailable;
        let washStatusTxt = '--';
        let MachineOperationState = this.state.MachineOperationState ? this.state.MachineOperationState:'';
            MachineOperationState = parseInt(this.state.MachineOperationState,16);
        (MachineOperationState ==1) && (washStatusTxt='');
        let washStatusArray = ['待机','冲洗','制水','水满'];
        if(MachineOperationState!=undefined || MachineOperationState!=''){
            washStatusTxt = washStatusArray[MachineOperationState];
        };
        let handleWash = MachineOperationState==1 ?'':this.handleWash;
        let btnStyle = (online==2|| networkavailable==2||MachineOperationState ==1)?'flex-cell triggered':'flex-cell';
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
            <figure>
                {
                    <h1 className="btn-title">&nbsp;&nbsp;状态:{washStatusTxt}&nbsp;&nbsp;</h1>
                }
                <section className={'flex btnlist'}>
                    <article className={btnStyle}
                             onTouchStart={handleWash}
                             style={(online==2|| networkavailable==2||MachineOperationState ==1)?{opacity:0.5}:{opacity:1}}>
                        <img  src='../static/img/btnlist/4.png'/>
                        <p>冲洗</p>
                    </article>
                </section>
            </figure>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});