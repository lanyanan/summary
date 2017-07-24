// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {CalendarControl1} from './CalendarControl1.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ApiPath} from './ApiPath.es6';
import {App} from './App.es6';
import Path from './ApiPath.es6';


var {Router, Route, hashHistory} = ReactRouter;

//获取当前时间和星期几
function formatDateTime (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
}
function getWeek(index){
        switch(index){
            case 0: 
                return "星期天"
                break;
            case 1: 
                return "星期一"
                break;
            case 2: 
                return "星期二"
                break;
            case 3: 
                return "星期三"
                break;
            case 4: 
                return "星期四"
                break;
            case 5: 
                return "星期五"
            break;
                case 6: 
                return "星期六"
                break;  
                }
    }

let DATASTRING = formatDateTime(new Date()) + " " + getWeek((new Date()).getDay());

// 创建React组件
export class SleepReport extends BaseComponent {
    constructor(props) {
        super(props);
       
        let date = formatDateTime(new Date());
        this.state = {
            days:[],
            date:date,
            accessToken:"",
            appId:"",
            deviceId:"",
            deviceNames:"",
            deviceNamesShow:"",
            queryFlag:1,
            sleepStatusList:[],
            datestr:DATASTRING,
            sleepQuality:"--",
            sleepScope:"--",
            sleepCount:"--",
            sleepTypeName:"--",
            deepSleepDuration:"--:--",
            fallSleepDuration:"--:--",
            lightSleepDuration:"--:--",
            heartAllAverage:"--",
            breathAllAverage:"--",
            trunOverAllAverage:"--",
            heartReferRange:"--",
            breathReferRange:"--",
            getParamIsTrue:true,
            dataLenght:[1]
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let _this = this; 
        Actions.login(2);
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl);
        //让其有滚动
        let body = document.getElementsByTagName('body');
        body[0].style.height='auto';
        Actions.getMonthDateList(_this.formatDateTime(new Date()))
        Actions.getDayReportData(_this.state.queryFlag, _this.state.date, 0);
        window.userSwiper = new Swiper('.swiper-container',{
            direction: 'horizontal',
            pagination: '.swiper-pagination',
            onSlideChangeEnd: function(swiper){
                Actions.getDayReportData(_this.state.queryFlag, _this.state.date, swiper.activeIndex);
            }
        })
        /*setTimeout(function(){
        let url1 = Path.wPath+"/wechat/hotel/getParam"
        //let url1 = "../mock/mock.json"
        het.get(url1,{},(res)=>{
            let data = JSON.parse(res);
            console.log(data)
            if(data.code==0){
                _this.setState({
                    accessToken:data.data.accessToken,
                    appId:data.data.appId,
                    deviceId:data.data.deviceId,
                    deviceNames:data.data.deviceNames,
                    deviceNamesShow:data.data.deviceNamesShow,
                    getParamIsTrue:true,
                });
                //基本参数拿到 再去拿取日报
                Actions.getMonthDateList(_this.state.deviceId,_this.formatDateTime(new Date()))
                Actions.getDayReportData(_this.state.deviceId,_this.state.queryFlag,_this.state.date,_this.state.appId, 0);
                let sleepData = _this.state.sleepStatusList;
            }else{
                if(data.code==103005001){
                    window.NO_DATA_CHART('reportSleepChart0','',150,["深睡","浅睡","清醒"])
                    window.NO_DATA_CHART('reportHeartChart0','心率',150,[50,100,150])
                    window.NO_DATA_CHART('reportBreathingChart0','呼吸',150,[10,20,30])
                    window.NO_DATA_CHART('reportOverChart0','体动',150,[20,40,60])
                }else{
                    alert(data.msg)
                    window.NO_DATA_CHART('reportSleepChart0','',150,["深睡","浅睡","清醒"])
                    window.NO_DATA_CHART('reportHeartChart0','心率',150,[50,100,150])
                    window.NO_DATA_CHART('reportBreathingChart0','呼吸',150,[10,20,30])
                    window.NO_DATA_CHART('reportOverChart0','体动',150,[20,40,60])
                }
                _this.setState({
                    getParamIsTrue:false,
                })
            }  
        },(err)=>{
            console.log("获取参数错误！请稍后重试");
            _this.setState({
                    getParamIsTrue:false,
            })
            window.NO_DATA_CHART('reportSleepChart0','',150,["深睡","浅睡","清醒"])
            window.NO_DATA_CHART('reportHeartChart0','心率',150,[50,100,150])
            window.NO_DATA_CHART('reportBreathingChart0','呼吸',150,[10,20,30])
            window.NO_DATA_CHART('reportOverChart0','体动',150,[20,40,60])
        })
        },300)   
        //设备参数,微信参数*/
        
    }
    componentDidUpdate(){
        
    }
    getWeek(index){
        switch(index){
            case 0: 
                return "星期天"
                break;
            case 1: 
                return "星期一"
                break;
            case 2: 
                return "星期二"
                break;
            case 3: 
                return "星期三"
                break;
            case 4: 
                return "星期四"
                break;
            case 5: 
                return "星期五"
            break;
                case 6: 
                return "星期六"
                break;  
                }
    }
    showCalender(e) {
        let index = e.target.getAttribute('data-key');
        let carlendarBody=document.getElementsByClassName("calendarBorder1")[index],
        _display=carlendarBody.style.display;
        if(_display=="none"||_display==""){
            carlendarBody.style.display="block";
        }else{
            carlendarBody.style.display='none';
        }
    }
    hideCalender() {
        let carlendarBody=document.getElementsByClassName("calendarBorder1");
        for(var i = 0; i < carlendarBody.length; i++){
            carlendarBody[i].style.display = 'none'
        }
    }
    childChanged(curDate){
        //日期控件传递过来的日期
        let _date= new Date(curDate);
        let week = _date.getDay();
        //要显示的日期格式
        let timeStr = arguments[0] + "    " + this.getWeek(week);
        this.setState({
            datestr:timeStr,
        })
        Actions.getDayReportData(0, this.formatDateTime(_date), 0 );  
    }
    getPreDate(e) {
        //对当前时间进行处理
        let index = e.target.getAttribute('data-pre');
        let date = this.state.datestr.substring(0, 10);
        let _date = new Date(date);
        let preDate = this.formatDateTime(new Date(_date.getTime() - 24*60*60*1000))
        if(this.state.getParamIsTrue){
            Actions.getDayReportData( 1, preDate, index);
        }else{
            alert("缺少睡眠设备")
        }   
    }
    getNextDate(e) {
        let index = e.target.getAttribute('data-next');
        let date = this.state.datestr.substring(0, 10);
        let _date = new Date(date);
        let nextDate =  this.formatDateTime(new Date(_date.getTime() + 24*60*60*1000))
        if(this.state.getParamIsTrue){
            Actions.getDayReportData( 2, nextDate, index);
        }else{
            alert("缺少睡眠设备")
        }   
    }
    getDays(year,month){
        let dateString = year + "-" + month + "-" +10;
        Actions.getMonthDateList(dateString)
    }
    formatDateTime (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    substr() {
        let date = this.state.datestr.substring(0, 10);
        return new Date(date.replace(/-/g,"/"));
    }   
    render() {
        let date = this.state.datestr.substring(0, 10);
        let nowDate =  new Date(date.replace(/-/g,"/"));
        return <div id="reportCont" className="report-cont">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {this.state.dataLenght.map((item, index)=>{
                                    if(index<1){
                                        return <div key={index} className="swiper-slide">
                                            <div className='report-title' onTouchEnd={this.hideCalender.bind(this)}>数据报告</div>  
                                            <div className="report-date"> 
                                                <span data-key = {index} className = "dateIpt" onTouchEnd={this.showCalender.bind(this)}>{this.state.datestr}</span>
                                                <span data-pre = {index} className = "dateIpt-left" onTouchEnd = {this.getPreDate.bind(this)}></span>
                                                <span data-next = {index} className = "dateIpt-right" onTouchEnd = {this.getNextDate.bind(this)}></span>
                                            </div>
                                            <CalendarControl1 datakey = {index} callbackParent={this.childChanged.bind(this)} date={nowDate} days={this.state.days} getDays={this.getDays.bind(this)}/> 
                                            <div className="report-sleep" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div className="report-sleep-result">
                                                    <i>质量</i>
                                                    <h3>{this.state.sleepQuality}</h3>
                                                    <span>
                                                        <img src='../static/img/text.png'/>
                                                    </span>
                                                </div>
                                                <div className="report-sleep-time">
                                                    <p>时段<i>{this.state.sleepScope}</i></p>
                                                    <p>时长<i>{this.state.sleepCount}</i></p>
                                                </div>
                                            </div>
                                            <div className='report-sleep-type'>
                                                <h3>睡眠类型:<span>{this.state.sleepTypeName}</span></h3>
                                                <p>{this.state.sleepTypeTips}</p>
                                            </div>
                                            <div className="report-sleep-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div  id = {'reportSleepChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-color-mark'>
                                                        <div className='report-color-red'>
                                                            <i></i>
                                                            <b>深睡</b>
                                                            <span>{this.state.deepSleepDuration}</span>
                                                        </div>
                                                        <div className='report-color-blue'>
                                                            <i></i>
                                                            <b>浅睡</b>
                                                            <span>{this.state.fallSleepDuration}</span>
                                                        </div>
                                                        <div className='report-color-green'>
                                                            <i></i>
                                                            <b>清醒</b>
                                                            <span>{this.state.lightSleepDuration}</span>
                                                        </div>
                                                    </div>                       
                                                </div> 
                                            </div> 
                                            <div className="report-heart-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportHeartChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-charts-bottom-text'>
                                                       正常心率为：{this.state.heartReferRange}
                                                    </div>
                                                    <p className='report-average-value'>平均<i>{this.state.heartAllAverage}</i>次/分</p>
                                                </div> 
                                            </div> 
                                             <div className="report-breathing-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportBreathingChart' + index} className=' report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-charts-bottom-text'>
                                                       正常呼吸率为：{this.state.breathReferRange}
                                                    </div>
                                                    <p className='report-average-value'>平均<i>{this.state.breathAllAverage}</i>次/分</p>
                                                    
                                                </div> 
                                            </div> 
                                             <div className="report-over-chart"  onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportOverChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <p className='report-average-value'>累计<i>{this.state.trunOverAllAverage}</i>次</p>
                                                </div> 
                                            </div>   
                                       </div>
                                    }else{
                                        return <div className="swiper-slide">
                                            <div className='report-title' onTouchEnd={this.hideCalender.bind(this)}>数据报告</div>  
                                            <div className="report-date"> 
                                                <span data-key = {index} className = "dateIpt">{this.state.datestr}</span>
                                                <span data-pre = {index} className = "dateIpt-left"></span>
                                                <span data-next = {index} className = "dateIpt-right"></span>
                                            </div>
                                            <CalendarControl1 datakey = {index} callbackParent={this.childChanged.bind(this)} date={nowDate} days={this.state.days} getDays={this.getDays.bind(this)}/> 
                                            <div className="report-sleep" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div className="report-sleep-result">
                                                    <i>质量</i>
                                                    <h3>{this.state.sleepQuality}</h3>
                                                    <span>
                                                        <img src='../static/img/text.png'/>
                                                    </span>
                                                </div>
                                                <div className="report-sleep-time">
                                                    <p>时段<i>{this.state.sleepScope}</i></p>
                                                    <p>时长<i>{this.state.sleepCount}</i></p>
                                                </div>
                                            </div>
                                            <div className='report-sleep-type'>
                                                <h3>睡眠类型:<span>{this.state.sleepTypeName}</span></h3>
                                                <p>{this.state.sleepTypeTips}</p>
                                            </div>
                                            <div className="report-sleep-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div  id = {'reportSleepChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-color-mark'>
                                                        <div className='report-color-red'>
                                                            <i></i>
                                                            <b>深睡</b>
                                                            <span>{this.state.deepSleepDuration}</span>
                                                        </div>
                                                        <div className='report-color-blue'>
                                                            <i></i>
                                                            <b>浅睡</b>
                                                            <span>{this.state.fallSleepDuration}</span>
                                                        </div>
                                                        <div className='report-color-green'>
                                                            <i></i>
                                                            <b>清醒</b>
                                                            <span>{this.state.lightSleepDuration}</span>
                                                        </div>
                                                    </div>                       
                                                </div> 
                                            </div> 
                                            <div className="report-heart-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportHeartChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-charts-bottom-text'>
                                                       正常心率为：{this.state.heartReferRange}
                                                    </div>
                                                    <p className='report-average-value'>平均<i>{this.state.heartAllAverage}</i>次/分</p>
                                                </div> 
                                            </div> 
                                             <div className="report-breathing-chart" onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportBreathingChart' + index} className=' report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <div className='report-charts-bottom-text'>
                                                       正常呼吸率为：{this.state.breathReferRange}
                                                    </div>
                                                    <p className='report-average-value'>平均<i>{this.state.breathAllAverage}</i>次/分</p>
                                                    
                                                </div> 
                                            </div> 
                                             <div className="report-over-chart"  onTouchEnd={this.hideCalender.bind(this)}>
                                                <div id = {'reportOverChart' + index} className='report-sleep-chart-down' ></div>
                                                <div className='report-sleep-chart-over'>
                                                    <p className='report-average-value'>累计<i>{this.state.trunOverAllAverage}</i>次</p>
                                                </div> 
                                            </div>   
                                       </div>
                                    }
                            })}
                        </div> 
                        <div className="swiper-pagination"></div>   
                    </div>
                    
               </div>;
    }
}