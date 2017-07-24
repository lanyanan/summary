/**
 * 体温组件
 * @prop {string}   text 该项名称
 * /v1/app/chealth/thermometer/getThermometerByDate
 */

import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TempRange} from '../components/TempRange.es6';
import {Funs} from '../../../common/src/fun.es6';


export class Temp extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        	noData:true,
            latestTemp:'',
            latestdataTime:''
        };
        //Store.listen((data)=>this.setState(data)); // 监听Store
    }
    componentDidMount() {
        let _this = this ,url ='/v1/app/chealth/thermometer/getLatestThermometer';
        setTimeout(function(){ 
            let ajaxData={
                'userType': _this.props.total.userType?_this.props.total.userType:1,
                'memberId':_this.props.total.memberId?_this.props.total.memberId:1,
                'appId':_this.props.total.appId?_this.props.total.appId:'10121',
                'deviceId':_this.props.total.deviceId?_this.props.total.deviceId:'',
                'timestamp':new Date().getTime()
            };
            function sucCallback(d){
                let data = typeof d==='string' ? JSON.parse(d) : d;
                if (!data.data || data.data[0].key ==undefined ) return;
                    _this.setState({noData:false,latestTemp:data.data[0].value,latestdataTime:data.data[0].key});
            }
            het.get(url,ajaxData,sucCallback,function(e){alert(e)});  
        },500);
    }
    render() {
        let tempData = this.props.total.tempData!=''?this.props.total.tempData:false,
            time = tempData?Funs.dateFormatFull((tempData.dataTime)/1000,'full'):(this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):''),
            temp = tempData?tempData.temp:this.state.latestTemp,
            color = '';
        if(temp<36){
            color = '#FF4045';
        }else if(temp<37.1){
            color = '#40DA91';
        }else{
            color = '#F2CE3C';
        }
            
    	return(
            <article className="temp">
            {
                (tempData || this.state.noData === false ) ? (
                    <section>
                        <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                        <p className='measure-data flex'>
                            <span className='flex-cell'>体温</span>
                            <span className='flex-cell' style={{color:color}}>{temp}</span>
                            <span className='flex-cell'>°C</span>
                        </p>  
                        <TempRange  temp={temp} />
                        <a className='flex hsty-btn'  href='health://skip_url/temphistory.html' style={{position: 'absolute',bottom:'0'}}>历史数据</a>
           
                    </section>
                    ) :  (
                        <section className='dev-info'>
                            <img className='' src='../static/img/bg-temp.png' alt='体温' /> 
                            <span>将感温枪的插头与检测仪的“</span>
                            <span className='cor-green'>TEMP</span>
                            <span>”接口相连接，让感温头接触皮肤并按下测量键，即可开始测量体温。</span>
                        </section>                    
                    )
            }            
            </article>);
    
    }
};

