import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {PickerTime} from './PickerTime.es6';
import {Toast} from './toast.es6';
import Range from './../../../common/src/lib/range.jsx';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class Timing extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            timingBtnIsOn:0,
            timingBtnBgClassName:"trunOffBgColor",
            timingBtnClassName:"timing-awaken-off",
            hours:"00",
            minutes:"00",
            tips:"",
            tipsClassName:"toast-hide",
            btnCont:"保存",
            hoursIndex:0,
            minIndex:0,
            state:"",
            daySelect:"none",
            work:"selected",
            week:"",
            repeat:"工作日",
            music:"timing-setting-music-right-on",
            light:"timing-setting-light-right-on",
            later:"timing-remind-right-on",
            mark:0
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let id = this.props.location.query.id;
        Actions.getData(id)
        this.reGetData();
    }
    componentWillUnmount() {
    }
    reGetData() {//
        clearInterval(window.dataTimer);
        window.dataTimer = setInterval(Actions.getData, 6000);
    }
    changeState(){
        if(this.state.timingBtnIsOn==1){
            this.setState({
            timingBtnIsOn:0,
            timingBtnBgClassName:"trunOffBgColor",
            timingBtnClassName:"timing-awaken-off",
           }) 
        }else{
            this.setState({
            timingBtnIsOn:1,
            timingBtnBgClassName:"trunOnBgColor",
            timingBtnClassName:"timing-awaken-on",
           }) 
        }
    }
    setTime(){
        this.setState({
            hours:parseInt(arguments[0]),
            minutes:parseInt(arguments[1])
        })
    }
    submitTime(){
        console.log(0);
       
    }
    formatDateTime(){
        let h = this.state.hours;
        let m = this.state.minutes;
        let s = "00";
        m = m =="0"? '00' : m;//这是处理来自时间控件的数据
        let time = (new Date()).getTime();
        let newDate =time + 1 * 24 * 60 * 60 * 1000;
        let day = new Date(newDate);
        let setTime = this.formatDate(new Date())+' '+h+':'+m+':'+s;
        let setTimeString = setTime.replace(/-/g,"/");
        let Timing = (new Date(setTimeString)).getTime();
        console.log(Timing-time)
        if(Timing>time){
            return setTime;
        }else{
            return this.formatDate(day)+' '+h+':'+m+':'+s;
        }      
    }
    formatDate(day){ 
        let y = day.getFullYear();
        let m = day.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = day.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    changeDay(e) { 
        e.preventDefault();
        e.stopPropagation();
        if(this.state.daySelect == "none") {
            this.setState({
                daySelect:"block"
            })  
        } else {
            this.setState({
                daySelect:"none"
            }) 
        }           
    }
    selectWork(e) {
        this.setState({
            work:"selected",
            week:"",
            repeat:"工作日",
        }) 
        console.log(this.state.work)    
    }
    selectWeek(e) {
        this.setState({
            work:"",
            week:"selected",
            repeat:"周末",
        })
    }
    setTiming() {
        if(this.state.music=="timing-setting-music-right-on"){
            this.setState({
                music:'timing-setting-music-right-off'
            })
        }else{
            this.setState({
                music:'timing-setting-music-right-on'
            })
        }
    }
    setLight() {
        if(this.state.light=="timing-setting-light-right-on"){
            this.setState({
                light:'timing-setting-light-right-off'
            })
        }else{
            this.setState({
                light:'timing-setting-light-right-on'
            })
        }
    }
    later() {
        if(this.state.later=="timing-remind-right-on"){
            this.setState({
                later:'timing-remind-right-off'
            })
        }else{
            this.setState({
                later:'timing-remind-right-on'
            })
        }
    }
    submitClock() {
        console.log(this.state)
        let id = this.props.location.query.id;
        if(id==1) {
            let repeat = this.state.repeat=="周末"?192:126;
            let light = this.state.light=="timing-setting-light-right-on"?1:0;
            let later = this.state.later=="timing-remind-right-on"?1:0;
            let hours = this.state.hours;
            let minutes = this.state.minutes;
            let dataJson = {
                id:1,
                alarmClock1Bell:later,
                alarmClock1Hour:hours,
                alarmClock1Light:this.state.alarmClock1Light,
                alarmClock1LightMode:light,
                alarmClock1Minute:minutes,
                alarmClock1Nap:later,
                alarmClock1Repeat:repeat,
                alarmClock1Ring:this.state.alarmClock1Ring,
                alarmClock1Switch:this.state.alarmClock1Switch,
                alarmClock2Bell:this.state.alarmClock2Bell,
                alarmClock2Hour:this.state.alarmClock2Hour,
                alarmClock2Light:this.state.alarmClock2Light,
                alarmClock2LightMode:this.state.alarmClock2LightMode,
                alarmClock2Minute:this.state.alarmClock2Minute,
                alarmClock2Nap:this.state.alarmClock2Nap,
                alarmClock2Repeat:this.state.alarmClock2Repeat,
                alarmClock2Ring:this.state.alarmClock2Ring,
                alarmClock2Switch:this.state.alarmClock2Switch,
                controlNumber:0x03
            }
            Actions.saveClock(dataJson)
            console.log(dataJson)
        }else {
            //console.log(0x40|0x80) 周末 192;
            //console.log(0x02|0x04|0x08|0x010|0x20) 工作日 62;
            let repeat = this.state.repeat=="周末"?192:62;
            let light = this.state.light=="timing-setting-light-right-on"?1:0;
            let later = this.state.later=="timing-remind-right-on"?1:0;
            let hours = this.state.hours;
            let minutes = this.state.minutes;
            let dataJson = {
                id:0,
                alarmClock1Bell:this.state.alarmClock1Bell,
                alarmClock1Hour:this.state.alarmClock1Hour,
                alarmClock1Light:100,
                alarmClock1LightMode:this.state.alarmClock1LightMode,
                alarmClock1Minute:this.state.alarmClock1Minute,
                alarmClock1Nap:this.state.alarmClock1Nap,
                alarmClock1Repeat:this.state.alarmClock1Repeat,
                alarmClock1Ring:this.state.alarmClock1Ring,
                alarmClock1Switch:this.state.alarmClock1Switch,
                alarmClock2Bell:later,
                alarmClock2Hour:hours,
                alarmClock2Light:100,
                alarmClock2LightMode:light,
                alarmClock2Minute:minutes,
                alarmClock2Nap:later,
                alarmClock2Repeat:repeat,
                alarmClock2Ring:this.state.alarmClock2Ring,
                alarmClock2Switch:this.state.alarmClock2Switch,
                controlNumber:0x03
            }
            Actions.saveClock(dataJson)
        }
    }
    render() {
        return  <div className="timing" >
                    <div className="timing-select">
                        <div className="timing-space"></div>
                        <PickerTime submitClock={this.setTime.bind(this)} hoursIndex={this.state.hoursIndex} minIndex={this.state.minIndex} state={this.state.state}/>
                    </div>
                    <div className="timing-setting">
                        <div className="timing-setting-list timing-setting-day" onTouchStart={this.changeDay.bind(this)}>
                            <span>重复</span>
                            <i className="timing-setting-day-right">{this.state.repeat}</i>
                        </div>
                        <div className="timing-setting-music timing-setting-list">
                                <span>铃声</span>
                                <i className="timing-setting-day-right">欢快跳跃</i>
                        </div>  
                        <div className="timing-light-remind timing-setting-list">
                            <span>灯光唤醒</span>
                            <i className={this.state.light} onTouchStart={this.setLight.bind(this)}></i>
                        </div>
                        <div className="timing-remind timing-setting-list">
                            <span>铃声唤醒</span>
                            <i className={this.state.later} onTouchStart={this.later.bind(this)}></i>
                        </div>
                    </div>
                    <div className="timing-submit" onTouchEnd={this.submitClock.bind(this)}><span >{this.state.btnCont}</span></div>
                    <div  className="select-day" style={{display:this.state.daySelect}} onTouchStart={this.changeDay.bind(this)}>
                        <div className="select-list">
                            <div id="workDays" onTouchStart={this.selectWork.bind(this)}>
                                <span>工作日</span>
                                <i className={this.state.work} ></i>
                            </div>
                            <div id="week" onTouchStart={this.selectWeek.bind(this)}>
                                <span>周末</span>
                                <i className={this.state.week} ></i>
                            </div>
                        </div>    
                    </div>
                    <Toast show={this.state.toastShow} tips={this.state.tips}/>
                </div>;
    }
}