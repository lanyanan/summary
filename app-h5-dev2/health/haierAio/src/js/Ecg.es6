/**
 * 心电组件
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Funs} from '../../../common/src/fun.es6';
import {HeartRateChart} from './HeartRateChart.es6';


export class Ecg extends BaseComponent {
	constructor(props) {
        super(props);
        this.state = {    
            noData:true
        };
        this.listenStore(Store); // 监听Store

    }
    componentDidMount() {
        let _this = this ;
        setTimeout(function(){
            let ajaxData={
                'userType': _this.props.total.userType?_this.props.total.userType:'',
                'memberId':_this.props.total.memberId?_this.props.total.memberId:'',
                'appId':_this.props.total.appId?_this.props.total.appId:'10121',
                'timestamp':new Date().getTime()
            };
            Actions.lastECG(ajaxData);
        },500);
    }
    render() {
        console.log(this.state,this.props);
        let ecgData = this.props.total.ecgData!=''?this.props.total.ecgData:false,
            time = ecgData?Funs.dateFormatFull((ecgData.dataTime)/1000,'full'):(this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):''),//安卓传的毫秒。。。
            heartRate = ecgData?ecgData.heartRate:this.state.latestHeartRate,
            heartEcg = ecgData?ecgData.heartEcg:this.state.latestHeartEcg;
        return(
            <article className="blood-glucose">
            {
                (ecgData || this.state.noData === false ) ? (
                    <div>
                    <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                    <div className='measure-data' style={{marginBottom:'30px'}}>
                        <p className='flex'>
                            <span className='flex-cell'>心率</span>
                            <span className='flex-cell' style={{color:'#5D5D5D'}}>{heartRate}</span>
                            <span className='flex-cell'>次/分</span>
                        </p>
                    </div>
                    <p className='line'></p>
                    <HeartRateChart data={ecgData?ecgData:[]}/>
                    <a className='flex hsty-btn' id='hsty-btn' href='health://skip_url/ecghistory.html'>历史数据</a>
                </div>
                ) : (
                    <div className="dev-info">
                        <img className='bg-img' src='../static/img/bg-xd1.png' alt='心电1' />
                        <p>将快速心电检测仪的插头与检测仪的“ECG”接口相 连接，按心电仪“开始”按钮，即可开始测量心电</p>
                    </div>
                )
            }
            </article> );
    
    }
};

