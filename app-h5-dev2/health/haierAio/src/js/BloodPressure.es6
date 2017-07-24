/**
 * 血压组件
 * /v1/app/chealth/haieraio/getLatestBloodPressure
 */

import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {BloodPressureRange} from '../components/BloodPressureRange.es6';
import {Funs} from '../../../common/src/fun.es6';

export class BloodPressure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	noData:true,
            latestSystolicPressure:'',
            latestdataTime:'',
            lastDiastolicPressure:''
        };
        //Store.listen((data)=>this.setState(data)); // 监听Store

    }
    componentDidMount() {
        let _this = this ,
        url ='/v1/app/chealth/haieraio/getLatestBloodPressure';
        setTimeout(function(){ 
            let ajaxData={
                'userType': _this.props.total.userType?_this.props.total.userType:1,
                'memberId':_this.props.total.memberId?_this.props.total.memberId:1,
                'appId':_this.props.total.appId?_this.props.total.appId:'10121',
                'timestamp':new Date().getTime()
            };
            function sucCallback(d){
                let data = typeof d==='string' ? JSON.parse(d) : d;
                if (!data.data || data.data.dataTime ==undefined ) return;
                _this.setState({noData:false,latestSystolicPressure:data.data.systolicPressure,latestdataTime:data.data.dataTime,lastDiastolicPressure:data.data.diastolicPressure});
            }
            het.get(url,ajaxData,sucCallback,function(e){alert(e)});  
        },500);
    }
    render() {
        //console.log(this.state);
        let bloodPressureData = this.props.total.bloodPressureData !='' && this.props.total.bloodPressureData.systolicPressure !='0'?this.props.total.bloodPressureData:false,
            systolic = bloodPressureData?bloodPressureData.systolicPressure:this.state.latestSystolicPressure,
            diastolic = bloodPressureData?bloodPressureData.diastolicPressure:this.state.lastDiastolicPressure,
            time = bloodPressureData?Funs.dateFormatFull((bloodPressureData.dataTime)/1000,'full'):(this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):'');

    	return(
            <article className="blood-pressure">
            {
                (bloodPressureData || this.state.noData === false ) ? (
                    <section>
                        <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                        <div className='measure-data'>
                            <p className='flex'>
                                <span className='flex-cell'>收缩压</span>
                                <span className='flex-cell'>{systolic}</span>
                                <span className='flex-cell'>mmHg</span>
                            </p> 
                            <p className='refer'>参考值 90~139</p>
                        </div> 
                        <div className='measure-data' style={{margin:'40px auto'}}>
                            <p className='flex'>
                                <span className='flex-cell'>舒张压</span>
                                <span className='flex-cell'>{diastolic}</span>
                                <span className='flex-cell'>mmHg</span>
                            </p> 
                            <p className='refer'>参考值 60~89</p>
                        </div>
                        <BloodPressureRange  systolic={systolic} diastolic={diastolic}/>
                        <a className='flex hsty-btn' id='hsty-btn' href='health://skip_url/bloodpressurehistory.html' >历史数据</a>
                 </section>
                    ) : (
                        <section className='dev-info'>
                            <img className='bg-img' src='../static/img/bg-xy.png' alt='血压' /> 
                            <p>将血压袖带插头与检测仪的“NIBP”接口相连接，佩戴袖带，按下血压键，即可开始测量血压。</p>
                        </section>
                    )
                    //   this.props.total.isBloodPressureOn==false ? (
                    //     <section className='dev-info'>
                    //         <img className='bg-img' src='../static/img/bg-xy.png' alt='血压' /> 
                    //         <p>将血压袖带插头与检测仪的“NIBP”接口相连接，佩戴袖带，按下血压键，即可开始测量血压。</p>
                    //     </section>
                    // ) : (
                    //     <section className='is-on'> 
                    //         <div className="circle-img"></div>
                    //         <span className='circle-text'>测量中</span>
                    //     </section>
                    // )
            }            
            </article> 
            );
    
    }
};
