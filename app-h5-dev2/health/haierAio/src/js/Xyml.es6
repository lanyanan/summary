/**
 * 血氧脉率组件
 * @prop {object}   ajaxData 请求接口所需参数
 * /v1/app/chealth/haieraio/getLatestOxygenPulse    获取最新血氧脉率数据
 */

import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Funs} from '../../../common/src/fun.es6';
import {OxygenRange} from '../components/OxygenRange.es6';
import {PulseRange} from '../components/PulseRange.es6';

export default class Xyml extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	noData:true,
            latestOxygen:'',
            latestPulse:'',
            latestdataTime:''
        };
        //Store.listen((data)=>this.setState(data)); // 监听Store
    }
    componentDidMount() {
        //Actions.lastXyml(ajaxData);
        let _this = this ,
            url ='/v1/app/chealth/haieraio/getLatestOxygenPulse';
        setTimeout(function(){ 
            let ajaxData={
                'userType': _this.props.total.userType?_this.props.total.userType:'3',
                'memberId':_this.props.total.memberId?_this.props.total.memberId:'0',
                'appId':_this.props.total.appId?_this.props.total.appId:'10121',
                'timestamp':new Date().getTime()
            };
            function sucCallback(d){
                let data = typeof d==='string' ? JSON.parse(d) : d;
                if (!data.data || data.data.dataTime ==undefined ) return;
                 _this.setState({noData:false,latestOxygen:data.data.oxygen,latestPulse:data.data.pulse,latestdataTime:data.data.dataTime});
  
            }
            het.get(url,ajaxData,sucCallback,function(e){alert(e)});  
        },100);
  	}
    render() {
        // console.log(this.props);
        let xymlData = this.props.total.xymlData!='' && this.props.total.xymlData.oxygen !="0"?this.props.total.xymlData:false,
            time = xymlData?Funs.dateFormatFull((xymlData.dataTime)/1000,'full'):(this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):''),
            pulse = xymlData?xymlData.pulse:this.state.latestPulse,
            oxygen = xymlData?xymlData.oxygen:this.state.latestOxygen;
            return(
            <article className="xyml">
            {
                (xymlData || this.state.noData === false ) ? (
                    <section>
                        <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                        <p className='measure-data flex'>
                            <span className='flex-cell'>血氧</span>
                            <span className='flex-cell' >{oxygen}</span>
                            <span className='flex-cell'>%</span>
                        </p>
                        <OxygenRange  oxygen={oxygen}/>
                        <p className='line'></p>
                        <p className='measure-data flex'>
                            <span className='flex-cell'>脉率</span>
                            <span className='flex-cell'>{pulse}</span>
                            <span className='flex-cell'>次/分</span>
                        </p>
                        <PulseRange  pulse={pulse}/>
                         {/*<a className='flex hsty-btn' id='hsty-btn' href='health://skip_url/xymlhistory.html'>历史数据</a>*/}
                        <a className='flex hsty-btn' id='hsty-btn' href='./xymlhistory.html'>历史数据</a>
                    </section>
                    ) : (
                    <section className='dev-info'>
                            <img className='' src='../static/img/bg-xyml.png' alt='血氧脉率' /> 
                            <span>将智能血氧探头的插头与检测仪的“Sp02”接口相连 接后，手指（建议使用食指）伸入探头内，即可开始测量血氧和脉率。</span>
                        </section>
                    )
                    // { this.props.total.isXymlOn==false ? (
                    //     <section className='dev-info'>
                    //         <img className='' src='../static/img/bg-xyml.png' alt='血氧脉率' /> 
                    //         <span>将智能血氧探头的插头与检测仪的“Sp02”接口相连 接后，手指（建议使用食指）伸入探头内，即可开始测量血氧和脉率。</span>
                    //     </section>
                    // ) : (
                    //     <section className='is-on'> 
                    //          <div className="circle-img"></div>
                    //         <span className='circle-text'>测量中</span>
                    //     </section>
                    // )}
            }
            </article> );
    }
};
