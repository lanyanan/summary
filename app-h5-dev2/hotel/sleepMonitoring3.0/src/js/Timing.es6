import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Toast} from './Toast.es6';
import {PickerTime} from './PickerTime.es6';

let {Router, Route, hashHistory, Link} = ReactRouter;
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
            divShow:"none",
            openImg:'../static/img/close.png',
            openTitle:'关闭闹铃',
            color:"#000",
            status:"",
            timingId:"",
            clockShow:"hidden"

        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let body = document.getElementsByTagName('body');
        body[0].style.height='100%';
        Actions.login(1);
        let locationUrl = window.location.href;
        console.log(locationUrl);
        localStorage.setItem("locationUrl",locationUrl);
        Actions.submitTime()
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
            hours:arguments[0],
            minutes:arguments[1]
        })
    }
    submitTime(){
        let st = this.state.timingId==""?0:1;
        Actions.saveClock(this.state.timingId,this.state.timingBtnIsOn,this.formatDateTime(),st,this.state.status)
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
    divShow() {
        Actions.saveClock(this.state.timingId,this.state.timingBtnIsOn,this.formatDateTime(),2,this.state.status)
    }
    render() {
        return <div className="timing-page" >
                    <div className="timing-time-select">
                        <PickerTime submitClock={this.setTime.bind(this)} hoursIndex={this.state.hoursIndex} minIndex={this.state.minIndex} state={this.state.state}/>
                    </div>
                    <div className="timing-awaken-set">
                        <h3>灯光唤醒</h3>
                        <div className="timing-awaken-right">
                            <p className={this.state.timingBtnBgClassName} onTouchEnd={this.changeState.bind(this)}>
                                <span className={this.state.timingBtnClassName} ></span>
                            </p>
                        </div>
                    </div>
                    <div className="timing-submit" onTouchEnd={this.submitTime.bind(this)}><span >{this.state.btnCont}</span></div>
                    <Toast tips={this.state.tips} tipsClassName={this.state.tipsClassName}/>
                    <div id="opacityDiv" className="timing-btn-div" style={{display:this.state.divShow}}></div>
                    <div id="timingBtn" className="timing-btn" onTouchEnd={this.divShow.bind(this)} style={{visibility:this.state.clockShow}}>
                        <img src={this.state.openImg}/>
                        <h3 style={{color:this.state.color}}>{this.state.openTitle}</h3>
                    </div>
               </div>;
    }
}