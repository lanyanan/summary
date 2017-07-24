// import {Funs} from '../../../common/src/fun.es6';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.es6';
import {ModeSelect} from './ModeSelect.es6';
import {Strainer} from './Strainer.es6';
import {Timer} from './Timer.jsx';
import Mask from './react-mask.jsx';
var {Router, Route, hashHistory,Link} = ReactRouter;

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
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    
    constructor(props) {
        super(props);
        // het.setTitle('德赛空气净化器');
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            change:false
        };
        

         Store.listen((data)=>{

            this.setState(data,()=>{
                // console.log('data-2',appData);
            })
        }); // 监听Store

        this.switchOpen = this.switchOpen.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.submitClock = function(h,m){ //定时器确定
            // clearInterval(this.tclock);
            Actions.selectTime(h,m);
            let _this = this;
            // this.tclock = setInterval(function(){_this.timeclock()},1000);
        }.bind(this);
        this.cancelClock = function(){ //定时器取消
            Actions.clockSwitch(3,'cancel');
        };

        this.detection = this.detection.bind(this);
        Actions.getData();
 


    }

    switchOpen(e){
        let S0 = this.state.S0;
        // if(S0 == '01') clearInterval(this.tclock);
        // console.log('this.state.S0',this.state.S0);
        S0=='02'?this.setState({open:'01',close:'02'}):this.setState({open:'02',close:'01'});
        
        clearInterval(this.tclocker);
        let _this = this;
        this.tclocker = setInterval(function(){_this.timeclocker()},3000);
      
        Actions.switchOpen(S0);
    }
    timeclocker(){
        clearInterval(this.tclocker);
        
        this.state.open == '01'?this.setState({open:'02'}):this.setState({close:'02'});
        
        
    }
    showMode(){
        
        var ModeSelect = document.getElementById("ModeSelect").getAttribute("class");
        // console.log(ModeSelect);
        (ModeSelect =='Moders')?ModeSelect = 'ModeSelect':ModeSelect='Moders';
        document.getElementById("ModeSelect").setAttribute("class",ModeSelect);

    }
    setswitch(e){
        
        let type = e.currentTarget.getAttribute('data-type');
        let value = 1;
        Actions.clockSwitch(value);
    }
    detection(){
        
        // let oldS8 = this.state.S8;
        this.state.S0 == '01'?this.setState({classNameCheck: 'jiance '}):this.setState({classNameCheck: 'jiance'});
        //setTimeout(function(){this.setState({classNameCheck: '',S8:oldS8})}.bind(this),1200);  

        Actions.detection();
    }


    componentWillMount() {
        Actions.getRemainS0();
    }
    componentDidMount() {

        
        Actions.remainTimer(this.state,'get');
        // let _this = this;
        // this.tclock = setInterval(function(){_this.timeclock()},1000);
        var date = new Date();
        var firstTime = date.getTime();
        Actions.getRemainMin(firstTime);
    }
    // change(){
    //     this.setState({change:true});

    // }
    render() {
        var clockShow = {visibility: this.state.mode==2 ? 'visible' : 'hidden'};
        let selectshow = (this.state.clockShow==1||this.state.clockShow==2)? true : false;
        let windType = this.state.wind || 6;
        let modeName = '';
        let rate = 40;
        
        let disable = this.state.boot==2? false : true;
        let rangedisable = (this.state.boot==2 && windType>0 && windType<4)? false : true;
        let windStall = this.state.windStall || 1;
        // windStall = windStall*rate>120 ? parseInt(120/rate) : windStall;
        let shookHeadStatus = this.state.shookHead || 1;
        let boot = this.state.boot || 1;
        // let remainTime = this.state.remainTime===undefined? this.state.S4 : this.state.remainTime;
        // remainTime =  remainTime　|| '- -';
        // let remainSec = this.state.remainSec==0&&remainTime=='- -'?'-':this.state.remainSec;
        let humidity = this.state.humidity || '80'; 
        let temp = this.state.temp || '20';
        let selectTitle = boot==2?'定时关机设置':'定时关机设置';
        let statusname = boot==2?'':'';
        let classNameCheck =  this.state.classNameCheck;
        let modes =  this.state.modes || 'modes1';
        let S1mode = this.state.S1;
        let modeTitle =  this.state.modeTitle || '快速';
        if(S1mode == '01'){modeTitle = '快速'}
        if(S1mode == '02'){modes = 'modes2';modeTitle = '标准'}
        if(S1mode == '03'){modes = 'modes3';modeTitle = '智能'}
        let grade = this.state.S8 || '01';


        let S7 = this.state.S7 || 0;
         if(S7) {
            if(Number(parseInt(S7,16))<11){
                S7 = 0;
            }else if(Number(parseInt(S7,16))>100){
                S7 = 5;
            }else{
                S7 = Math.ceil(Number(parseInt(S7,16))  / 20);
            }
        }
        let indexShow = this.state.indexShow || 'indexShow';
        let S0 = this.state.S0 || 'shutDown';
        let cityName = this.state.cityName || '深圳';
        let pm25 = this.state.pm25 || '30';
        let graders;
        let rank;
        let S2 = this.state.S2 || '02';
        if(grade == '01'){graders = 'graders1';rank = 'rank1';grade = '良好'}
        if(grade == '02'){graders = 'graders2';rank = 'rank2';grade = '较差'}
        if(grade == '03'){graders = 'graders3';rank = 'rank3';grade = '很差'}
        if(grade == '04' || S2 == '01'){graders = 'graders4';rank = 'rank4';grade = '检测中'}
        het.setTitle(this.state.deviceName);
        let open = this.state.open || '02';
        let close = this.state.close || '02';
        if (grade == '检测中' && S1mode == '01') {modes = 'modes1';}
        if (grade == '检测中' && S1mode == '02') {modes = 'modes2';}
        if (grade == '检测中' && S1mode == '03') {modes = 'modes3';}

        if (grade == '良好' && S1mode == '01') {modes = 'modes4';}
        if (grade == '良好' && S1mode == '02') {modes = 'modes5';}
        if (grade == '良好' && S1mode == '03') {modes = 'modes6';}

        if (grade == '较差' && S1mode == '01') {modes = 'modes7';}
        if (grade == '较差' && S1mode == '02') {modes = 'modes8';}
        if (grade == '较差' && S1mode == '03') {modes = 'modes9';}

        if (grade == '很差' && S1mode == '01') {modes = 'modes10';}
        if (grade == '很差' && S1mode == '02') {modes = 'modes11';}
        if (grade == '很差' && S1mode == '03') {modes = 'modes12';}
        let S3 = this.state.S3;
        // let S4 = parseInt(this.state.S4,16)*60;
        let S4 = parseInt(this.state.CD);
        // console.log('4444444444444444',S4);
        return (
            <div className="app-body">
                <div className={close =='01'?'layer-loading':'layer-loader'}>
                    <div className='icon-loading'><span><img src='../static/img/iconfont-loadc-white.svg' className='waiting-rotation' /></span></div>
                    <Mask />
                </div>
                <div className={indexShow +' ' +'indexMain flexBox'}>

                    <div className={'dshead'+' '+graders} style={{paddingTop:this.state.headerTop}}>
                        <div className='rankTitle'>
                            <div className={'battery'+S7+' '+'rankTitle1'}><i></i>设备电量</div>
                            <div className='rankTitle2'><i></i>{cityName} PM2.5:{pm25} <i>优</i></div>
                        </div>
                        <div className={'rank'+' '+rank}>                           
                            <div className={S2 == '01' ? 'jiance jiance-animation' : ''}></div>
                            <div className='rankCon' >
                                <p><em>当前空气等级</em><br/><span>{grade}</span></p>
                            </div>
                        </div>
                        <div className='powerOff'>
                            <p>关机倒计时</p>
                            {/*<p >{!isNaN(remainTime)?(remainTime =='00'?remainTime:remainTime-1)+':':remainTime}{remainSec<10?'0'+remainSec:(!isNaN(remainSec)?remainSec:' ')}</p>*/}
                            <Timer origin={this.state.originPointTimer} time={S3=='00'?0:(this.state._S4 =='00'?'00:00':parseInt(S4))} change={this.state.change}/>
                        </div>
                        <div className='close' onTouchStart={this.switchOpen}>
                            <i></i>
                            <p>关机</p>
                        </div>
                        
                    </div>
                    <div className='dscontent flexBox'>
                        <div className='grid flexBox'>
                            <div className='flexBox' >
                                <Link to="strainer" >
                                    <span>
                                        <p><i></i></p>
                                        <p>滤网</p>
                                    </span>
                                </Link>
                            </div>
                            <div onTouchStart={this.showMode.bind(this)} className={modes+' flexBox'}>
                                <span>
                                    <p><i></i></p>
                                    <p>{modeTitle}</p>
                                </span>
                            </div>
                        </div>
                        <div className='grid flexBox'>
                            <div onTouchStart={this.detection.bind(this)} className='flexBox'>
                                <span>
                                    <p><i></i></p>
                                    <p>质量检测</p>
                                </span>
                            </div>
                            <div data-type='clock' onTouchStart={this.setswitch.bind(this)} className='flexBox'>
                                <span>
                                    <p><i rangedisable={selectshow?true:rangedisable}></i></p>
                                    <p>定时</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ModeSelect mode={this.state.S1 || 1} grade = {grade}/>
                <TimeSelect title={selectTitle}  hourshow={false} minuteshow={true} hourstep={1}
                    minutestep={20} defaulthour={1} defaultminute={20} minhour={20} statusname={statusname} cancelClock={this.cancelClock}
                    submitClock={this.submitClock} show={selectshow} minutearr={[20,40,60]} />
                <div className={this.state.S0=='01' ?'shutUp':'shutDown'} >
                    <div className="startUp" onTouchStart={this.switchOpen}>
                        <a href="javascript:" ></a>
                        <p>点击开启</p>
                    </div>
                    <div className={open=='01'?'layer-loading':'layer-loader'}>
                        <div className='icon-loading'><span><img src='../static/img/iconfont-loadc-white.svg' className='waiting-rotation' /></span></div>
                        <Mask />
                    </div>
                </div>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/strainer" component={Strainer} />
        </Router>
    ), document.getElementById('ROOT'));
});