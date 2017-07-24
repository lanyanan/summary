import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Clock} from './Clock.es6';
import {Modes} from './Modes.es6';
import {PM} from './PM.es6';
import {Alarm} from './Alarm.es6';
import {Speed} from './Speed.es6';



var {Router, Route, hashHistory} = ReactRouter;
const domain = het.getHost();
// const domain = 'http://api.clife.cn';


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let weatherUrl = `${domain}/v1/web/env/weather/clife/now?city=ip`,//天气
             getRunUrl = `${domain}/v1/device/data/get`, // 获取设备运行数据接口 
            getCtrlUrl = `${domain}/v1/device/config/get`,// 获取设备控制数据接口 
          getOnlineUrl = `${domain}/v1/device/getDeviceInfo`,// 获取设备基本信息 
             isAndroid = !!(navigator.userAgent.indexOf('Android')+1),
                  data = {appType:isAndroid?1:2}; 
        this.lxClock = setInterval(function(){
            Actions.getData(getRunUrl);
            //Actions.getData(getCtrlUrl);//不刷控制数据 减少跳变的频率
        },5000);



        Actions.getData(getOnlineUrl,0,data);
        Actions.getData(getRunUrl,0);
        Actions.getData(getCtrlUrl,0); 
        Actions.getData(weatherUrl,1);
    
    }
    childlock(){
        het.toast('童锁状态下无法控制设备');
    }

    render() {
        let modeIndex = this.state.work ? this.state.work :'';
        let location = this.state.cityName ? this.state.cityName:'' ;
        let weather = this.state.wtext?this.state.wtext:'';
        let online = this.state.online ? this.state.online : 1;
        let lock = this.state.childLock ? this.state.childLock : 1;



        let indoorTemp = this.state.currentTemp?this.state.currentTemp:'',//室内温度
        outdoorTemp = this.state.temp?this.state.temp:'',//室外温度
        currentHumidity = this.state.currentHumidity?this.state.currentHumidity:'',//运行数据当前湿度
        thirstWarn = this.state.thirstWarn?this.state.thirstWarn:'',//运行数据缺水状态
        thirstVoice = this.state.thirstVoice?this.state.thirstVoice:'',//缺水报警开关
        strong = this.state.leave?this.state.leave:'',//强效状态
        wind = this.state.wind?this.state.wind:'',//风速状态
        pmLow =this.state.pmLow || '未知',//室内pm低位
        pmHigh = this.state.pmHigh ,//室内pm高位
        pmOut =this.state.pm25 || '未知',//室外pm
        bookTime = this.state.reservationTime?this.state.reservationTime:'';//预约时间


        return (
            <div className="app-body">
                <div id="panel-scroller" style={{display: (typeof this.state.boot === 'undefined' || this.state.boot==1)
                     ? "none" : "block"}}>
                    <section>
                        <section className={"startupface " + (
                            (typeof this.state.boot === 'undefined' || this.state.boot==1)
                             ? "slide-down" : "slide-up")}>
                            <PM location={location} weather={weather} outdoorTemp={outdoorTemp} thirstWarn={thirstWarn} 
                                humidity={currentHumidity} marker={this.state.marker}
                                indoorTemp={indoorTemp}   PMOutdoor={pmOut} pmLow={pmLow} pmHigh={pmHigh} lock={lock} />
                            <div id='childlock' style={{display:(lock==2?'block':'none')}} onTouchEnd={this.childlock.bind(this)}></div>
                            <Modes modeIndex={modeIndex}  strong={strong}/>
                            <Speed speedIndex={wind} />
                            <Alarm thirstVoice={thirstVoice} />
                            <Clock  online={online} bookTime={bookTime}/>
                        </section>
                    </section>
                </div>
                <section  style={{display:  this.state.boot==1? "block" : "none"}}>
                    <div className={"shutdownface " + (
                        (typeof this.state.boot === 'undefined' || this.state.boot==1)
                         ? "slide-up" : "slide-down")} style={{'paddingTop':this.state.headerTop}}>
                        <div className="pic"></div>
                        <a href="javascript:" className="power" onTouchEnd={Actions.switch}></a>
                    </div>
                </section>
                
                <div id="mytoast"></div>
            </div>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('生泰宝空气净化器');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    het.config({
        debugMode : 'print', // 打印调试数据
        appId: '30590',//用华为openlife的appid跟secret
        appSecret:'98889238ed6e441aaf9b0691b017695f'
    });
});