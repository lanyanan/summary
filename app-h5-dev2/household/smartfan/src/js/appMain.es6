import {Funs} from '../../../common/src/fun.es6';
import {TimeSelect} from '../../../common/src/TimeSelect.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {FanMain} from './FanMain.es6';
import {WaveCloud} from './WaveCloud.es6';
import {Range} from './Range.es6';
import {Modes} from './Modes.es6';

var {Router, Route, hashHistory} = ReactRouter;
var myscroller; // iscroll滚动容器
var appData = {};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染 
        torporTime:1,
        updateFlagMap: {
        },
        filter:{
            windStall:function(type,data){
                if(type==0 && data.boot == 1){//关机的时候，全部取运行数据
                    return false
                }
                if(type==0 && data.wind == 4){//智能风的时候，取运行数据
                    return false;
                }
                return true;
            },
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    appData = Funs._extends(appData, data);
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
        Store.listen((data)=>{
            //处理倒计时回显跳变问题
            if(data.clockId && data.clockId==3){
                appData.remainTime = 0;
                appData.remainTimeH = 0;
                appData.remainTimeL = 0;
            }else{
                appData.remainTime = data.remainTime;
            };
            //处理档位跳变问题
            if(data.windStall){
                appData.windStall = data.windStall;
            }
            this.setState(data,()=>{
                // console.log('data-2',appData);
            })
        }); // 监听Store
        this.items =  [
            {id:1, name:"标准风",rate:4},
            {id:2, name:"自然风",rate:46},
            {id:3, name:"睡眠风",rate:46},
            {id:4, name:"智能风"},
            {id:5, name:"采集风"},
            {id:6, name:""}
        ];
        this.submitClock = function(h,m){
            Actions.selectTime(h,m);
        };
        this.cancelClock = function(){
            Actions.clockSwitch(3,'cancel');
        };
    }
    render() {
        let selectshow = (this.state.clockShow==1||this.state.clockShow==2)? true : false;
        let windType = this.state.wind || 6;
        let modeName = '';
        let rate = 40;
        if(this.items[windType-1]){
            modeName = this.items[windType-1]['name'] || '';
            rate = this.items[windType-1]['rate'] || 40; 
        }
        let disable = this.state.boot==2? false : true;
        let rangedisable = (this.state.boot==2 && windType>0 && windType<4)? false : true;
        let windStall = this.state.windStall || 1;
        // windStall = windStall*rate>120 ? parseInt(120/rate) : windStall;
        let shookHeadStatus = this.state.shookHead || 1;
        let boot = this.state.boot || 1;
        let clockId = this.state.remainTime > 0 ? (this.state.clockId || 3) : 3;
        let remainTime = this.state.remainTime || 0;
        let humidity = this.state.humidity || '80'; 
        let temp = this.state.temp || '20';
        let selectTitle = boot==2?'设置关闭时间':'设置开启时间';
        let statusname = boot==2?'后关闭':'后开启';
        return <div style={selectshow?{"overflow-y":"hidden"}:{"overflow-y":"auto"}} className="app-body"> 
                <div id="panel-scroller">
                    <section >
                        <section className='mainbg' style={{'paddingTop':this.state.headerTop}}>
                            <FanMain shookHeadStatus={shookHeadStatus} windStall={windStall}
                                     clockId={clockId} modeName={modeName} remainTime={remainTime}
                                     temp={temp} humidity={humidity} devStatus={boot} />
                            <WaveCloud />
                        </section>
                        <Range windStall={windStall} rate={rate} rangedisable={selectshow?true:rangedisable} />
                        <Modes windType={windType} modedisable={disable} />
                    </section>
                </div> 
                <TimeSelect title={selectTitle} minuteshow={false} hourshow={true} hourstep={1}
                    minutestep={1} defaulthour={1} statusname={statusname} cancelClock={this.cancelClock}
                    submitClock={this.submitClock} show={selectshow} hourarray={[1,2,4,8]} />
                <div id="mytoast"></div>
            </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('智能风扇');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));

    // setTimeout(function(){
    //     myscroller = new IScroll("#panel-scroller",{
    //         preventDefault:false
    //     });
    //     myscroller.on('beforeScrollStart', function() {
    //         var target = event.target;
    //         while (target.nodeType != 1) target = target.parentNode;
    //         if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
    //         event.preventDefault();
    //     });
    // },100);
});