// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Modes} from './Modes.es6';
import {Speed} from './Speed.es6';
import {TimeSelect} from './TimeSelect.es6'; // 时钟组件


var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
        webDataMap : {
            'city':'cityName',
            'weather':'wtext',
            'indoorTemp':'Temperature',
            'outdoorTemp':'temp',
            'indoorPM25':'PM25',
            'outdoorPM25':'pm25',
            'humidity':'Humidity',//湿度
            'lifetime':'WorkeTime',// 滤芯使用寿命百分比(worktime/360 * 10) 距下次清洁滤网还剩多少小时(360-worktime)
            'OnOffStatus':'OnOffKey', // 1开机 2关机
            'LockStatus':'LockKey',//模式 锁定 1:是 2 ：否
            'OffElapseTime':'TimerOffKey',//模式：定时 大于等于1:是 0 ：否
            'LightStatus':"LightKey",//模式：灯光 1:是 2 ：否
            'SprayStatus':'SprayKey',//模式 喷射 1:是 0 ：否
            'FanSpeedStatus':'FanSpeedKey',//
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    console.log(data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {timeSelect:false,headerTop:isAndroid?55:64,speed:'',OffElapseTime:''};
        this.listenStore(Store); // 监听Store
    }
    pmLevel(pmValue){
        let level = '优';
        if(0 < pmValue && pmValue <= 35  ){
            level = '优';
        }else if( 35 < pmValue && pmValue <= 75){
            level = '良';
        }else if(75 < pmValue && pmValue <= 115){
            level = '轻度污染';
        }else if(115 < pmValue && pmValue <= 150){
            level = '中度污染';
        }else if(150 < pmValue && pmValue <= 250){
            level = '重度污染';
        }else if(250 < pmValue && pmValue <= 500){
            level = '严重污染';
        }
        return level;
    }
    startup(e){
       // let  isStartup = this.state.isStartup||this.state.OnOffStatus;
        Actions.startup(this);
    }
    cancelTime(){
        //this.setState({timeSelect:false,isSettime:0});
        Actions.cancelTime();
    }
    setTime(value){
        Actions.setTime(value);
    }
    componentWillUpdate(nextProps,nextState){
        //console.log(this.state,nextState)
        //故障判断 
        let isUpdate = false,alarmStr='';
        if(this.state.PM25SensorAlarm != nextState.PM25SensorAlarm){
            isUpdate = true;
        }
        if(this.state.TempratureSensorAlarm != nextState.TempratureSensorAlarm){
            isUpdate = true;
        }
        if(this.state.HumiditySensorAlarm != nextState.HumiditySensorAlarm){
            isUpdate = true;
        }
        if(this.state.LightSensorAlarm != nextState.LightSensorAlarm){
            isUpdate = true;
        }
        if(isUpdate){
            let index = 0;
            if(nextState.PM25SensorAlarm == 1){
                index++;
                alarmStr = index +" "+'PM2.5传感器故障'+'\n';
            }
            if(nextState.TempratureSensorAlarm == 1){
                index++;
                alarmStr += index +" "+'温度传感器故障'+'\n';
            }
            if(nextState.HumiditySensorAlarm == 1){
                index++;
                alarmStr += index +" "+'湿度传感器故障'+'\n';
            }
            if(nextState.LightSensorAlarm == 1){
                index++;
                alarmStr += index +" "+'光线传感器故障'+'\n';
            }
            if(alarmStr!=''){
                //alert('8888888'+alarmStr);
                het.toast('xuesheng:'+alarmStr);
            }
        }
    }
    render() {
        let  outdoorPM25 = this.state.outdoorPM25?this.state.outdoorPM25:0,
        indoorPM25 = this.state.indoorPM25?this.state.indoorPM25:0,
        isStartup = this.state.OnOffStatus,
        isLocked = this.state.LockStatus,
        isLight = this.state.LightStatus,
        OffElapseTime = this.state.OffElapseTime,
        speed = this.state.FanSpeedStatus,
        isJet = this.state.SprayStatus;

        //console.log(isSettime);
        return(
            <article className='airPurifier'>
                <section className='status-area'>
                    <header style={{'paddingTop':this.state.headerTop}}></header>
                    <ul className='statusline'>
                        <li><img src='../static/img/ic-locate.png' className='locate' alt='城市'/>{this.state.city?this.state.city:''}</li>
                        <li>{(this.state.weather?this.state.weather:'')+(this.state.outdoorTemp?this.state.outdoorTemp:0)}℃</li> 
                        <li>室外PM2.5：{outdoorPM25}（{this.pmLevel(outdoorPM25)}）</li>
                    </ul>
                    <div className='circleInfo'>
                        <ul>
                            <li>室内PM2.5值</li>
                            <li>{this.state.indoorPM25}</li>
                            <li>温度：{this.state.indoorTemp}℃ | 湿度：{this.state.humidity}%</li>
                            <li>{this.pmLevel(indoorPM25)}</li>
                        </ul>
                        <img src='../static/img/ic-dot.png' className='dot' alt='圆圈'/>
                        <img src='../static/img/bg-dots.png' className='bg-dots' alt='圆圈'/>
                    </div>
                    <dl className='startup'>
                        <dd onTouchEnd={this.startup.bind(isStartup === 1? 2:1)}><img src='../static/img/ic-startup.png' alt='关机'/></dd>
                        <dt>{isStartup === 1?'开机':"关机"}</dt>
                    </dl>
                </section>
                <section className='control-area'>{/* online ios为int型 大循环为string*/}
                    <Modes isLocked={isLocked} isSettime={OffElapseTime} isLight={isLight} isJet={isJet} isStartup={isStartup} online={(this.state.online?this.state.online:'').toString()} />
                    <Speed speedIndex={speed} isStartup={isStartup} online={(this.state.online?this.state.online:'').toString()}/>
                    <div className='filter'>
                        <dl>
                            <dt>清洁滤网</dt>
                            <dd>距离下次清洁滤网还剩{600-(this.state.lifetime?this.state.lifetime:600)}小时</dd>
                        </dl>
                        <span className='percent'>{parseInt((this.state.lifetime?this.state.lifetime:0)/600*100)}<b>﹪</b></span>
                    </div>
                   
                </section>
                <TimeSelect title='' minuteshow={false} hourshow={true}
                    show={this.state.timeSelect} statusname=' ' minhour='1' hourstep='1' maxhour='12' 
                    cancelClock={this.cancelTime.bind(this)}  submitClock={this.setTime.bind(this)}/>
            </article>

            );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={App} />
    //     </Router>
    // ), document.getElementById('ROOT'));
});