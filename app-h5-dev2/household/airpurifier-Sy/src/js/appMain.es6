import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Anion} from './Anion.es6';
import {Clock} from './Clock.es6';
import {FilterLife} from './FilterLife.es6';
import {Modes} from './Modes.es6';
import {PM} from './PM.es6';
import {UV} from './UV.es6';

var {Router, Route, hashHistory} = ReactRouter;
var myscroller;
let appData = {};

function isEmptyObject(obj){
    for(var n in obj){return false}
    return true;
}
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    appData = Funs._extends(appData, data);
    if(isEmptyObject(appData)){return false;} // 忽略接收到的空数据对象
    Actions.repaint(appData);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.baseData={
            airIndoorValue : "未知",
            location : "深圳",
            weather  : "小雨",
            temp : '12',
            timeId : "1",
            PMLevel : ['--',"优","良","中","差",'故障'],
            modeIndex : "1",
            uvSwitch : "1",
            anSwitch : "16"
        };
        this.calcPMLevel=(pmvalue=0)=>{
            let pmlevel;
            if(!Number(pmvalue)) pmvalue=0;
            if(pmvalue>0&&pmvalue<=50) pmlevel = 1;
            if(pmvalue>50&&pmvalue<=100) pmlevel = 2;
            if(pmvalue>100&&pmvalue<=150) pmlevel = 3;
            if(pmvalue>150) pmlevel = 4;
            if(pmvalue<=0) pmlevel = 5;
            return pmlevel;
        }
    }
    render() {
        let airIndoorValue = this.state.returnAlarmStatus2==1 || this.state.returnAlarmStatus2==3 ? this.baseData.airIndoorValue:this.state.returnCurrentPmValue;
        airIndoorValue = airIndoorValue || '未知';
        let pm =this.state.pm25 || '未知';
        let outerPMLevel = this.baseData.PMLevel[this.calcPMLevel(pm)];
        let innerPMLevel = this.baseData.PMLevel[this.calcPMLevel(airIndoorValue)];
        let timeId;
        switch (this.state.timeMode){
            case 25:
                timeId = 1;
                break;
            case 1:
                timeId = 2;
                break;
            case 2:
                timeId = 3;
                break;
            case 4:
                timeId = 4;
                break;
            case 8:
                timeId = 5;
                break;
            default:
                timeId = this.baseData.timeId;
                break;
        }
        timeId = (this.state.online==2)?1:timeId;
        let modeIndex = this.state.pattern ? this.state.pattern : this.baseData.modeIndex;
        let temp = this.state.temp ? this.state.temp : this.baseData.temp;
            if(temp>=50 || temp<=0) temp=12;
        let location = this.state.cityName || this.state.city || this.baseData.location;
        let weather = this.state.wtext?this.state.wtext:this.baseData.weather;
        let voc = this.state.vocGrade ? this.state.vocGrade : 2;
        if(voc>4) voc=2;  
        voc = this.state.returnAlarmStatus2==2 || this.state.returnAlarmStatus2==3 ? 6 : voc;
        let uvSwitch = this.state.uvMode ? this.state.uvMode : this.baseData.uvSwitch;
        let anSwitch = this.state.negativeIonSetup ? this.state.negativeIonSetup : this.baseData.anSwitch;
        let remainTime = (this.state.returnRestTime&&this.state.online!=2&&timeId!=1) ? this.state.returnRestTime : 0;
        let remainTimeH = parseInt(remainTime/60);
        let remainTimeM = parseInt(remainTime-remainTimeH*60);
        let online = this.state.online ? this.state.online : 1;
        let lock = this.state.childLockMode ? this.state.childLockMode : 1;
        return (
            <div className="app-body">
                <div id="panel-scroller" style={{display: (typeof this.state.bootMode === 'undefined' || this.state.bootMode==16)
                     ? "none" : "block"}}>
                    <section>
                        <section className={"startupface " + (
                            (typeof this.state.bootMode === 'undefined' || this.state.bootMode==16)
                             ? "slide-down" : "slide-up")}>
                            <PM airIndoorValue={airIndoorValue}
                                VOCValue={voc} location={location} weather={weather}
                                temperature={temp} outerPMLevel={outerPMLevel} innerPMLevel={innerPMLevel} PMOutdoor={pm} lock={lock} 
                                headerTop={this.state.headerTop} />
                            <div id='childlock' style={{display:(lock==16?'block':'none')}}></div>
                            <Modes modeIndex={modeIndex} />
                            <Clock timeId={timeId} online={online} remainTime={remainTime}
                                   remainTimeH={remainTimeH} remainTimeM={remainTimeM}  />
                            <UV uvSwitchValue={uvSwitch} />
                            <Anion anSwitchValue={anSwitch} />
                            <FilterLife remainingLife={this.state.screenOneWorkHours} />
                        </section>
                    </section>
                </div>
                <div className={"shutdownface " + (
                    (typeof this.state.bootMode === 'undefined' || this.state.bootMode==16)
                     ? "slide-up" : "slide-down")} style={{'paddingTop':this.state.headerTop}}>
                    <div className="pic"></div>
                    <a href="javascript:" className="power" onTouchEnd={Actions.switch}></a>
                </div>
                <div id="mytoast"></div>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('三洋空气净化器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));

    /*setTimeout(function(){
        myscroller = new IScroll("#panel-scroller",{
            preventDefault:false
        });
        myscroller.on('beforeScrollStart', function() {
            var target = event.target;
            while (target.nodeType != 1) target = target.parentNode;
            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
            event.preventDefault();
        });
    },100);*/
});