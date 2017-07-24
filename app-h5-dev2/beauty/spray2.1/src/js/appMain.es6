// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import SettingButton from './SettingButton.jsx';
import {TimeSelect} from './TimeSelect.es6';

var Toast = require('../../../common/src/lib/Toast.jsx');
// 定义toast函数，以供多次调用
var topToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(<Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,document.getElementById('mytoast'));
};

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});



// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            mode : 1,
            skinType5 : 1,
            updateFlag:0,
            chargeStatus : 1,       // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
            electricity : 19,       // 电量
            currentRunMode : 1,     // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
            currentRunTime : 100,   // 当前运行时间
            onlineStatus : 1,       // 在线状态（1-正常, 2-异常）
            skinDataCode : 1,       // 有无肤质数据(0-无, 1-有)
            busiSwitch : 0,         // 业务开关（0：关 1：开） 0-手动 1-自动
            runTime : 11,           // 自动模式下的运行时间

            timeshow: false,
            modeshow: false,
            defaultMode: '补水',
            arrayInit: false,
            defaultminute: 100,
        };
        this.baseData = {
            modes : ["补水模式", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
            skins : ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
            times : [0, 100, 40, 80, 50, 40]
        }
        this.maxminute = 120;
        this.minminute = 10;
        this.startY = 0;
        this.newY = 0;
        this.isModeChange = false;
        this.isTimeChange = false;
        this.listenStore(Store); // 监听Store
    }
    componentWillUpdate(nextProps,nextState){
        this.isTimeChange = typeof nextState.isTimeChange!=='undefined' ? nextState.isTimeChange : this.isTimeChange;
        this.isModeChange = typeof nextState.isModeChange!=='undefined' ? nextState.isModeChange : this.isModeChange;
        this.state.mode = typeof nextState.mode!=='undefined' ? nextState.mode : this.state.mode;
        this.state.chargeStatus = typeof nextState.chargeStatus!=='undefined' ? nextState.chargeStatus : this.state.chargeStatus;
        this.state.electricity = typeof nextState.electricity!=='undefined' ? nextState.electricity : this.state.electricity;
        this.state.currentRunMode = typeof nextState.currentRunMode!=='undefined' ? nextState.currentRunMode : this.state.currentRunMode;
        this.state.currentRunTime = typeof nextState.currentRunTime!=='undefined' ? nextState.currentRunTime : this.state.currentRunTime;
        this.state.onlineStatus = typeof nextState.onlineStatus!=='undefined' ? nextState.onlineStatus : this.state.onlineStatus;
        this.state.skinDataCode = typeof nextState.skinDataCode!=='undefined' ? nextState.skinDataCode : this.state.skinDataCode;
        this.state.busiSwitch = typeof nextState.busiSwitch!=='undefined' ? nextState.busiSwitch : this.state.busiSwitch;
        if (typeof nextState.configMode=='undefined') {
             this.state.runTime = typeof nextState.runTime!=='undefined' ? nextState.runTime : this.state.runTime;
        }
    }
    componentDidUpdate(){
        try {
            myscroller.refresh();
        } catch (err) {}
    }
    componentDidMount(){
       topToast("使用完喷雾仪，建议进行肤质测试，以得到更好的效果...");
    }
    handlerTouchMove(e){
        if (e.target.type!=="range") {
            e.preventDefault(); // 修复touchmove无效的BUG
        }
    }
    handlerTounch(e) {        // 自动和手动模式切换
        let skinDataCode = this.state.skinDataCode;
        let mode = this.state.mode;
        let runTime = this.state.runTime;
        let curMode = this.state.currentRunMode;
        let curTime = this.state.currentRunTime;
        let busiSwitch = this.state.busiSwitch;
        if(!+skinDataCode) {
            het.toast("您还未测试肤质，请先测试肤质！");
            return;
        }
        Actions.changeSmart(busiSwitch);
    }
    /**
     * 判断是否需要保存
     * @return   {boolean}   如需保存返回true，否则返回false
     */
    getSaveFlag(changeObj) {
        var count = 0;

        for (var k in changeObj) {
            if (changeObj[k] !== this.state[k]) count++;
        }
        return !!count;
   }
   cancelClock(){
        this.setState({
            timeshow: false,
            arrayInit: true,
        });
    }
    submitClock(h,m,s){
        Actions.chooesTime(m);
        this.setState({timeshow:false,arrayInit: true});
    }
    startTouch(e){
        if(this.state.busiSwitch == 1){
            return false;
        }
        this.newY = 0;
        this.startY = parseInt(e.touches[0].clientY);
    }
    moveTouch(e){
        if(this.state.busiSwitch == 1){
            return false;
        }
        this.newY = parseInt(e.touches[0].clientY);
    }
    endTouch(e){
        if(this.state.busiSwitch == 1){
            return false;
        }
        let disY = this.newY || this.startY - this.startY;
        if(Math.abs(disY)<=20){
            let type = e.currentTarget.getAttribute('data-type');
            switch(type){
                case 'mode':
                    clearTimeout(this.timer1);
                    let mode = ReactDOM.findDOMNode(this.refs.mode);
                    mode.style.background = '#fde7ee';
                    this.timer1 = setTimeout(function(){
                        mode.style.background = '';
                        this.setState({
                            modeshow: true,
                        })
                    }.bind(this),80);
                    break;
                case 'time':
                    if (this.state.currentRunMode != 5) {
                        return false;
                    }
                    clearTimeout(this.timer3);
                    let time = ReactDOM.findDOMNode(this.refs.time);
                    time.style.background = '#fde7ee';
                    this.timer2 = setTimeout(function(){
                        time.style.background = '';
                        this.maxminute = 120;
                        this.minminute = 10;
                        this.setState({defaultminute: this.state.currentRunTime,timeshow:true,arrayInit: false})
                    }.bind(this),80)
            }
        }else{
            return false;
        }
    }
    endDefault(e){
        e.preventDefault();
        e.stopPropagation();
    }
    cancelMode(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            modeshow: false
        });
    }
    changeMode(e){
        let index = e.currentTarget.getAttribute('data-mode');
        this.setState({modeshow: false});
        Actions.changeMode(index);
    }
    syncData() {
        let configMode, runTime;
        let busiSwitch = this.state.busiSwitch;
        let updateFlag = this.state.updateFlag;
        this.isModeChange = false;
        this.isTimeChange = false;
        if (updateFlag <= 0) {
            return;
        }
        if(+busiSwitch) {
            configMode = this.state.mode;
            runTime = this.state.runTime;
        } else {
            configMode = this.state.currentRunMode;
            runTime = this.state.currentRunTime;
        }

        // // 更改发送App数据
        // this.state.currentRunMode = configMode;
        // this.state.currentRunTime = runTime;
        // this.state.configMode = configMode;
        // this.state.runTime = runTime;
        // this.state.busiSwitch = busiSwitch;

        Actions.sync(updateFlag, busiSwitch, configMode, runTime);
    }
    render() {
        let currentRunMode = parseInt(this.state.currentRunMode);
        let mode = parseInt(this.state.mode);                       // 自动模式下的模式
        let busiSwitch = this.state.busiSwitch;                     //　模式开关(0-手动模式，1-自动模式)
        let skinDataCode = this.state.skinDataCode;
        let currentRunTime = this.state.currentRunTime;
        let runTime = this.state.runTime;                           // 自动模式下时间设置
        let skinType = this.state.skinType5;
        let recommendMode = this.state.mode;
        let waterTrend = this.state.waterTrend;

        let slideStyle = {
            position: 'absolute',
            zIndex: 11,
            top: '2.8rem',
            right: '1.8rem',
            fontSize: '16px'
        }
        let mitems = ['补水','舒缓','清爽','滋养','自定义'];  
        let icons = ['../static/img/water.png','../static/img/restful.png','../static/img/refreshing.png','../static/img/nourish.png','../static/img/custom.png'];    

        let activeStyle = +busiSwitch === 1 ? {display : 'none'} : {display : 'block'};
        let nonActiveStyle = +busiSwitch === 1 ? {display : 'block'} : {display : 'none'};
        let batteryOrLine = (<div></div>); //设备电量低或者离线在线
        let description = (<span></span>); //智能推荐描述

        var modeIndex;
        if (+busiSwitch==0) {
            modeIndex = currentRunMode-1;
        }else{
            modeIndex = recommendMode-1;
        }
        if (modeIndex == -1) {modeIndex = 0}
        if(this.state.skinDataCode === null || this.state.skinDataCode == 0){
            description = (<div className="tips"><span>未测肤无法为您智能推荐，以下为设备默认值</span><a style={{color:'#007eff'}} href="cbeauty://cbeauty_single_skintest">赶紧去测肤>></a></div>);
        }else{
            if(this.state.busiSwitch == 0){
                description = (<div className="tips"><span>选择一种模式，设置喷雾时长</span></div>)
            }else{
                description = (<div className="tips"><span>根据您的肤质智能推荐</span></div>);
            }
        }

        if(this.state.electricity <= 3 && this.state.electricity > 0){
            batteryOrLine = (<div className="low-battery"></div>);
        }else if(this.state.onlineStatus == 2){
            batteryOrLine = (<div className="out-line"></div>);
        }

        return (
            <div>
                <header>
                    <div className="logo">
                        {batteryOrLine}
                    </div>
                    <div className="gear">
                        <a className={this.state.busiSwitch === 0 ? 'gear-choose' : 'gear-choose-active'} onTouchEnd={this.handlerTounch.bind(this)}></a>
                    </div>
                </header>

                <section>
                    
                    {description}
                     
                    <div className="btnList flex">
                        <div className="btnSwitch btn1 flex" data-type="mode" ref="mode" onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchEnd={this.endTouch.bind(this)}>
                            <img src={icons[modeIndex]} alt="modeSlect" className={"water"}/>
                            <p><span>{+busiSwitch==0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode]}
                                    <em  className={"em"+((this.isModeChange&&this.state.updateFlag)?"2":"")} style={+busiSwitch==1?{display:'none'}:{}}></em></span></p>
                        </div>
                        <div className="btnSwitch btn1 flex relative" data-type="time" ref="time" onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchEnd={this.endTouch.bind(this)}>
                            <div className="clock">
                                <span className="minute2">{+busiSwitch==0?currentRunTime:runTime}sec</span>
                            </div>
                            <p><span>{"时长"}<em className={"em"+((this.isTimeChange&&this.state.updateFlag)?"2":"")} style={+busiSwitch==0 && currentRunMode==5?{}:{display:'none'}}></em></span></p>
                        </div>
                    </div>
                </section>

                <footer className="setBut">
                    <SettingButton settingStatus={this.state.updateFlag ? 'on' : 'off'} callback={this.syncData.bind(this)}/>
                </footer>
                    
                <section className="modeselect-bd" style={this.state.modeshow?{}:{display:'none'}} onTouchMove={this.endDefault.bind(this)}>
                    <div className="modeselect-shade" onTouchEnd={this.cancelMode.bind(this)} onTouchMove={this.endDefault.bind(this)}></div>
                    <ul className="modeselect-content" style={{bottom:this.state.modeshow? 0 :"-23rem"}}>
                        {mitems.map((its,index)=>{
                            return (
                                <li className="flex" key={index} data-mode={index} onTouchStart={this.endDefault.bind(this)} onTouchMove={this.endDefault.bind(this)} onTouchEnd={this.changeMode.bind(this)}><span>{its}</span><em style={+modeIndex==index?{}:{display:'none'}}></em></li>
                                )
                        })}
                    </ul>
                </section>
                
                <TimeSelect hourshow={false} minuteshow={true} statusname=" " unit="秒" minutestep={10} title={this.state.hottitle}
                    cancelClock={this.cancelClock.bind(this)} submitClock={this.submitClock.bind(this)}
                    defaultminute={this.state.defaultminute} ArrayInit={this.state.arrayInit}
                    show={this.state.timeshow} maxminute={this.maxminute} minminute={this.minminute}/>
                <div id="mytoast"></div>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});