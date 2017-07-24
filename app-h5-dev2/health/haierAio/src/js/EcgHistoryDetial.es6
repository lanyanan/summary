import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {HeartRateChart} from './HeartRateChart.es6';

// 创建React组件
export class EcgHistoryDetial extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataId: props.params.id,
            appId: props.params.appId,
            memberId: props.params.memberId,
            userType: props.params.userType
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
         let ajaxData={
            'userType': this.state.userType?this.state.userType:1,
            'memberId':this.state.memberId?this.state.memberId:1,
            'appId':this.state.appId?this.state.appId:1,
            'timestamp':new Date().getTime(),
            'dataId':this.state.dataId?this.state.dataId:1
        };
        Actions.getHeartRateDetail(ajaxData);
    }
    render() {
        console.log(this.state);
        let time = this.state.detail ? Funs.utcToLocal(this.state.detail.dataTime):'',
            heartRate = this.state.detail? this.state.detail.heartRate : '';
        
        return (
        <div className=''>
            <section className="heartrate-wrap">
                 <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                 <p className='heartrate'>心率&nbsp;<b>{heartRate}</b>&nbsp;次/分</p>
            </section>
            <section className="chart-wrap">
                <h2>心电图</h2>
                <HeartRateChart data={this.state.detail||[]}/>
            </section>
        </div>);
    }
}
