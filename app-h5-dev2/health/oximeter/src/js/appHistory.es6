import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {OxygenEcharts} from './OxygenEcharts.es6';
import {Clndr} from './Calendar.es6';
/*import {AbnormalDetails} from './AbnormalDetails.es6';*/

var {Router, Route, hashHistory} = ReactRouter;
var selectDate = '',historyResult = {},pickDate='';


// 日期选择器回调函数
window.datepickerCB = (date)=>{
    pickDate = date;
    Actions.selectDate(false,date);
    het.toast('leave_datepicker');
};


function  getValidDate(month,readyData){
    let cfg = {
        appId: readyData.appId,
        memberId: readyData.memberId,
        userType: readyData.userType,
        timestamp: +new Date(),
        date:month
    };
    let _this = this,tagDates=[];
    het.get('/v1/app/chealth/OxygenPulse/getOxygenPulseDateList', cfg, (data)=>{
        data = typeof data==='string' ? JSON.parse(data) : data;
        if(data.data){
            data.data.map(it=>{
                let date = parseInt(Funs.dateFormat(it.date,"dd"));
                tagDates.push(date);
            });
        }
        selectDate =tagDates;
    },()=>{
    });     
};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : true

    });
});

het.ready((data)=>{
    Actions.ready(data);
    Actions.getLastestHistoryData();
    let month = Funs.dateFormat(new Date().getTime(),'yyyy-MM');
    getValidDate(month,data);    
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});
 
function formatSeconds(value,type){
    var result,
    ss = parseInt(value),// 秒
    mm = 0,// 分
    hh = 0;// 小时
    if(ss > 60) {
      mm = parseInt(ss/60);
      ss = parseInt(ss%60);
      if(mm > 60) {
         hh = parseInt(mm/60);
         mm = parseInt(mm%60);
       }
    }
    if(type){
        result = [hh,mm,ss];
    }else{
        result = ss+"秒";
        if(mm > 0) {
            result = mm+"分"+result;
        }
        if(hh > 0) {
            result = hh+"小时"+result;
        }
    } 
    return result;
}


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {headerTop: isAndroid?50:64,tagDates:"",showClndr:false,historyResult:'',seArr:[],peArr:[],nofresh:false};
        this.listenStore(Store); // 监听Store
    }
    changeDay(param){
        let day = this.state.historyResult.recordTime?this.state.historyResult.recordTime:pickDate;
        Actions.changeDay(param,day);
    }
    showClndr(){
        het.toast('enter_datepicker');
       // Actions.selectDate(true);
    }
    render() {
        // console.log('999999999999',this.state);
        let spo2Array=[],prArray=[],timeArray=[],startTime=[],
        result = this.state.historyResult,
        oxygen85 = result.oxygenAbnormal85Num,
        oxygen90 = result.oxygenAbnormal90Num,
        oxygen80 = result.oxygenAbnormal80Num,
        oxygen70 = result.oxygenAbnormal70Num,
        pulseMaxValue = result.pulseMaxValue,
        pulseMinValue = result.pulseMinValue,
        pulseAvgValue = result.pulseAvgValue,
        recordLong = result.recordNum > 0 ? formatSeconds(result.recordNum,1) : 0,
        oxygenLong = result.oxygenAbnormalNum > 0 ? formatSeconds(result.oxygenAbnormalNum,1) : 0,
        pulseLong = result.pulseAbnormalNum > 0 ? formatSeconds(result.pulseAbnormalNum,1) : 0,
        oxygenPulse = result.oxygenPulse,
        peList = result.peList,
        seList = result.seList,
        tagDates = this.state.tagDates?this.state.tagDates:'';

        if(oxygenPulse){
            oxygenPulse.map(it=>{
                spo2Array.push(it.oxygen);
                prArray.push(it.pulse);
                timeArray.push(Funs.dateFormat(it.dataTime,"hh:mm",true));
                startTime.push(Funs.dateFormat(it.dataTime,"hh",true));
            });
        }

        /*echart x轴 y轴参数处理*/
        let hh=0,mm=0,ii=0,dd='',new_spo2Array=[],new_prArray=[],new_timeArray=[];
        for (let mm = 0; mm < 61 && hh < 24; mm++) {
            if (mm == 60) {
                hh++;
                mm = 0;
            }
            dd = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm);
            new_timeArray.push(dd);
        }
        for(let i=0 ;i<24*60;i++){
            new_spo2Array.push("");
            new_prArray.push("");
        }
        for(var s in new_timeArray){
            for(var x in timeArray){
                if(new_timeArray[s]==timeArray[x]){
                    new_spo2Array[s] = spo2Array[x];
                    new_prArray[s] = prArray[x];
                }
            }
        }

        //异常数据 标注处理
        let oMarkPointData=[],pMarkPointData=[];
        for(let i in seList ){
            let seTime = Funs.dateFormat(seList[i].seTime,"hh:mm",true);
            for(var s in new_timeArray){
                if(new_timeArray[s]==seTime){
                    let obj = {
                        name:seList[i].seTitle,
                        xAxis:new_timeArray[s],
                        yAxis:new_spo2Array[s],
                        label:'!',
                    };
                    oMarkPointData.push(obj);
                }
            }
        }
        
        for(let i in peList ){
            let peTime = Funs.dateFormat(peList[i].peTime,"hh:mm",true);
            for(var s in new_timeArray){
                if(new_timeArray[s]==peTime){
                     let obj = {
                        name:peList[i].peTitle,
                        xAxis:new_timeArray[s],
                        yAxis:new_prArray[s],
                        label:'!',
                    };
                    pMarkPointData.push(obj);
                }
            }
        }
        let datepickerUrl =`#/datepicker/${selectDate}`;
        //console.log("datepickerUrl:",selectDate)

        return (
            <article className=''>
                <header style={{'height':this.state.headerTop}}></header>
                <nav className='calendarTitle'>
                    <span className='lastday' onTouchTap={this.changeDay.bind(this,-1)}><img src='../static/img/ic-forward.png' className='clndr-icon'  alt='日期往前'/></span>
                    <img src='../static/img/ic-clndr.png' alt='日历图标'/>
                    <a href={datepickerUrl} className="date" /*onTouchTap={this.showClndr.bind(this)}*/ onClick={()=>het.toast('enter_datepicker')}>{result.recordTime?result.recordTime:pickDate}</a>
                    <span className='nextday' onTouchTap={this.changeDay.bind(this,1)}><img src='../static/img/ic-backwards.png' className='clndr-icon'   alt='日期往后'/></span>
                </nav>
                {
                    this.state.noHistory?<p className="noHistory">抱歉，这里空空的，没有测量数据哦</p>:
                    <section  className='history'>
                        <section className='table'>
                            <h2>数据统计</h2>
                            <div className='flex total'>
                                <ul className='flex-cell'>
                                    <li className='flex-cell cor-gray'>总测量</li>
                                    <li className='flex-cell'>
                                        {recordLong !=0?(recordLong[0] >0? <span><b className='fs24'>{recordLong[0]}</b>小时</span> :''):'无'}
                                        {recordLong[1] >0? <span><b className='fs24'>{recordLong[1]}</b>分</span> :''} 
                                        {recordLong[2] >0? <span><b className='fs24'>{recordLong[2]}</b>秒</span> :''}
                                    </li>
                                </ul>
                                <ul className='flex-cell '>
                                    {oxygenLong !=0? <li className='flex-cell cor-orange'>血氧异常</li>:<p className='cor-gray'>无血氧异常</p> }
                                    <li className='flex-cell cor-orange'>
                                         {oxygenLong[0] >0?<span><b className='fs24'>{oxygenLong[0]}</b>小时</span> :''}
                                         {oxygenLong[1] >0? <span><b className='fs24'>{oxygenLong[1]}</b>分</span> :''} 
                                         {oxygenLong[2] >0? <span><b className='fs24'>{oxygenLong[2]}</b>秒</span> :''}
                                    </li>
                                </ul>
                                <ul className='flex-cell '>
                                    {pulseLong !=0? <li className='flex-cell cor-orange'>脉率异常</li>:<p className='cor-gray'>无脉率异常</p> }
                                    <li className='flex-cell cor-orange'>
                                         {pulseLong[0] >0?<span><b className='fs24'>{pulseLong[0]}</b>小时</span> :''}
                                         {pulseLong[1] >0? <span><b className='fs24'>{pulseLong[1]}</b>分</span> :''} 
                                         {pulseLong[2] >0? <span><b className='fs24'>{pulseLong[2]}</b>秒</span> :''}
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section className='table'>
                            <h2>异常记录</h2>
                            <div className='abnormal'>
                                <ul className=''>
                                    <li>血氧SPO2</li>
                                    <li className='flex'><span className='flex-cell'>﹤90%的时长</span><span className='flex-cell'>{oxygen90>0?formatSeconds(oxygen90):<b className='cor-gray'>无</b>}</span></li>
                                    <li className='flex'><span className='flex-cell'>﹤85%的时长</span><span className='flex-cell'>{oxygen85>0?formatSeconds(oxygen85):<b className='cor-gray'>无</b>}</span></li>
                                    <li className='flex'><span className='flex-cell'>﹤80%的时长</span><span className='flex-cell'>{oxygen80>0?formatSeconds(oxygen80):<b className='cor-gray'>无</b>}</span></li>
                                    <li className='flex'><span className='flex-cell'>﹤70%的时长</span><span className='flex-cell'>{oxygen70>0?formatSeconds(oxygen70):<b className='cor-gray'>无</b>}</span></li>
                                </ul>
                                <ul className=''>
                                    <li>脉率PR</li>
                                    <li className='flex'><span className='flex-cell'>最高值</span><span className='flex-cell'>{pulseMaxValue?pulseMaxValue+'bpm':'无'}</span></li>
                                    <li className='flex'><span className='flex-cell'>最低值</span><span className='flex-cell'>{pulseMinValue?pulseMinValue+'bpm':'无'}</span></li>
                                    <li className='flex'><span className='flex-cell'>平均值</span><span className='flex-cell'>{pulseAvgValue?pulseAvgValue+'bpm':'无'}</span></li>
                                </ul>
                            </div>
                        </section>
                        <OxygenEcharts spo2={new_spo2Array} pr={new_prArray} time={new_timeArray} startTime={startTime!=''?startTime[0]:null} pMarkPointData={pMarkPointData} oMarkPointData={oMarkPointData} peList={peList} seList={seList} nofresh={this.state.nofresh} />
                        {/*<AbnormalDetails seArr={this.state.seArr} peArr={this.state.peArr} />*/}
                    </section>

                }

            </article>

            )
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('历史数据');
    // 无路由方式
    //ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/datepicker/:tagDates" component={Clndr} />
            <Route path="/datepicker" component={Clndr} />

        </Router>
    ), document.getElementById('ROOT'));
});