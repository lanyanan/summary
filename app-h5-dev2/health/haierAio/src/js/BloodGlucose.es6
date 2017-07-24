/**
 * 血糖组件
 * /v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose
 *  @prop personalStatus 个人状态（1:空腹，2:餐后一小时，3:餐后二小时）
 */
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {BloodGlucoseRange} from '../components/BloodGlucoseRange.es6';
import {Funs} from '../../../common/src/fun.es6';


export class BloodGlucose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noData:true,
            showFirst:false,
            showNext:false,
            latestBloodGlucose:'',
            lastStatus:'',
            latestdataTime:'',
            myStatus:''
        };
        //Store.listen((data)=>this.setState(data)); // 监听Store

    }
    componentDidMount() {
        let ajaxData=this.props.total.ajaxData;
        //Actions.lastBloodGlucose(ajaxData);
        let _this = this ,
        url ='/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose';
        setTimeout(function(){ 
            let ajaxData={
                'userType': _this.props.total.userType?_this.props.total.userType:'3',
                'memberId':_this.props.total.memberId?_this.props.total.memberId:1,
                'appId':_this.props.total.appId?_this.props.total.appId:'10121',
                'timestamp':new Date().getTime()
            };
            function sucCallback(d){
                let data = typeof d==='string' ? JSON.parse(d) : d;
                if (!data.data || data.data.dataTime ==undefined ) return;
                // if(_this.props.total.bloodGlucoseData){
                //     _this.setState({showFirst:true,showNext:false});
                // }
                _this.setState({noData:false,showNext:true,latestBloodGlucose:data.data.bloodGlucose,latestdataTime:data.data.dataTime,lastStatus:data.data.personalStatus});

            }
            het.get(url,ajaxData,sucCallback,function(e){alert(e)});  
        },500);        
    }
    componentWillReceiveProps(nextProps){
        let bloodGlucoseData = nextProps.total.bloodGlucoseData;
        //console.log(this.props);
        if(bloodGlucoseData!=''){
            this.setState({showFirst:true,showNext:false});
        }
        if(this.props.total.bloodGlucoseData){
            if((this.props.total.bloodGlucoseData.bloodGlucose == bloodGlucoseData.bloodGlucose )&&(this.props.total.bloodGlucoseData.dataTime == bloodGlucoseData.dataTime)){
                this.setState({showFirst:false,showNext:true});
            }  
        }
    }
    goForward(status){
        if (status!='') {
            this.setState({showFirst:false,showNext:true});
        }
    }
    resetGlucoseStatus(status){
        this.setState({myStatus:status});
    }
    render() {
        //console.log('caocaooc',this.props)
        let bloodGlucoseData = this.props.total.bloodGlucoseData!=''?this.props.total.bloodGlucoseData:false,
            status = this.state.myStatus!=''?this.state.myStatus:this.state.lastStatus,
            statusArr = ['空腹','餐后1小时','餐后2小时'],
            time = bloodGlucoseData?Funs.dateFormatFull((bloodGlucoseData.dataTime)/1000,'full'):(this.state.latestdataTime?Funs.utcToLocal(this.state.latestdataTime):''),
            bloodGlucose = bloodGlucoseData?bloodGlucoseData.bloodGlucose:parseFloat(this.state.latestBloodGlucose) ,
            {myStatus} = this.state,
            uploadHref = 'health://guide_status/' + myStatus;//health://guide_status/

        let standard1,standard2,max,min,color;
        switch(status){
            case '1':
                standard1 = '3.9';
                standard2 = '6.1';
            break;
            case '2':
                standard1 = '6.7';
                standard2 = '9.4';
            break;
            case '3':
                standard1 = '3.9';
                standard2 = '7.8';
            break;
        }
        max = (2*standard2 - standard1) * 10;
        min = (standard1 - (standard2 - standard1)) * 10;
        if(bloodGlucose < standard1){
            color = '#FF4045';
        }else if(bloodGlucose < standard2){
             color = '#40DA91';
        }else{
            color = '#F2CE3C';
        }

        return(
            <article className="blood-glucose">
            {
                (bloodGlucoseData || this.state.noData === false ) ? (
                    this.state.showFirst === true ? (
                        <section>
                            <div className='measure-data' style={{marginTop:'40px',width:"14rem"}}>
                                <p className='flex'>
                                    <span className='flex-cell'>血糖</span>
                                    <span className='flex-cell' style={{color:'#5E5E5E'}}>{bloodGlucoseData?bloodGlucoseData.bloodGlucose:''}</span>
                                    <span className='flex-cell'>mmol/L</span>
                                </p>
                            </div>
                            <div className='chose-status'>
                                <p>请选择您的选择状态：</p>
                                <div className='flex'>
                                    <p className={myStatus==="1"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"1")}>空腹</p>
                                    <p className={myStatus==="2"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"2")}>餐后1小时</p>
                                    <p className={myStatus==="3"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"3")}>餐后2小时</p>
                            </div>
                            </div>
                            <a className={myStatus!=''?'flex hsty-btn ':'flex hsty-btn unable'}   style={{position:'absolute',bottom:'0'}} href={uploadHref} onClick={this.goForward.bind(this,myStatus)}>我选好了</a>
                        </section>
                        ) :(
                            <section>
                                <p className='measure-time'><img src='../static/img/ic-time.png' alt='时间'/>测量时间：<span className=''>{time}</span></p>
                                <div className='measure-data' style={{width:"14rem"}}>
                                    <p className='flex'>
                                        <span className='flex-cell'>血糖</span>
                                        <span className='flex-cell' style={{color:color}}>{bloodGlucose}</span>
                                        <span className='flex-cell'>mmol/L</span>
                                    </p>
                                    <p className='glucoseBtn'>{statusArr[status-1]}</p>
                                </div>
                                  
                                <BloodGlucoseRange  glucose={bloodGlucose} status={status} max={max} min={min} standard1={standard1} standard2={standard2} />
                                <a className='flex hsty-btn' id='hsty-btn' href='health://skip_url/bloodglucosehistory.html'>历史数据</a>
                            </section>
                        )
                    ) :  (
                            <section className='dev-info'>
                                <img className='bg-img' src='../static/img/bg-xt.png' alt='血糖' /> 
                                <span>通过USB数据线将血糖仪的接口与检测仪的“</span>
                                <span className='cor-red'>GLU</span>
                                <span>” 接口相连接，使用采血笔采集0.7ul血量后，进行血糖测量。</span>
                            </section>             
                    )
            } 


            </article> );
    
    }
};

