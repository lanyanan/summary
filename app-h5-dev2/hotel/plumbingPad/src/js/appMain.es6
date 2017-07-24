import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from '../../../common/src/TimeSelect.es6';

var {Router, Route, hashHistory} = ReactRouter;

const MODLELIST = ['整机控制','分区控制','睡眠','除螨'];
const TIPS = ['水位过低，请注意加水！','设备温度过高，请确保设备工作正常！','七天不除螨，螨虫陪你睡。请注意除螨！'];

let dataTimer = 0;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            shutDownBtn: false,
            selectTimeBtn: false,
            startUpTimeBtn: false,  //预约开机开关
            closingTimeBtn: false,  //预约关机开关
            disabledSwitch: false, //预约按钮
            bootTimeBtn: false, //关机状态下预约开机
            minuteArr: [0,10,20,30,40,50],
            defaultMinute: 30,
            defaultHour: 0,
            minHour: 0,
            fistRepaint:true,
            appointmentBtn: true, //是否能点击开关机
            totalTemp: 40, //缓存一个整机温度
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        var _this = this;
        Actions.getData(true,function(){
            //初始变量控制
            let disabledSwitch = false;
            if(_this.state.startAppointmentBtn || _this.state.closeAppointmentBtn)
                disabledSwitch = true;
            else 
                disabledSwitch = false;
            //关机状态下的预约
            let bootTimeBtn;
            if(_this.state.startAppointmentBtn) bootTimeBtn = true;
            //除螨模式下不能预约开关机
            let appointmentBtn = true;
            if(_this.state.modeStatus === 4) appointmentBtn = false;

            _this.setState({
                disabledSwitch: disabledSwitch,
                appointmentBtn: appointmentBtn,
                bootTimeBtn: bootTimeBtn
            });


        });
        
        this.reGetData();

    }
    reGetData() {
        clearInterval(dataTimer);
        dataTimer = setInterval(Actions.getData, 6000);
    }
    //切换模式
    handleModle(i) {
        this.state.modeStatus = i;
        let modeObj = {};
        if(i !== 4){
            this.setState({
                appointmentBtn: true
            });
        }else{
            this.setState({
                appointmentBtn: false
            });
        }
        switch(i){
            case 1:
                if( this.state.allHeatTemp > 55){
                    modeObj.allHeatTemp = this.state.totalTemp;
                }else{
                    modeObj.allHeatTemp = this.state.allHeatTemp;
                }
            break;
            case 2:
                modeObj.leftHeatTemp = this.state.leftHeatTemp;
                modeObj.rightHeatTemp = this.state.rightHeatTemp;
            break;
            case 3:
                modeObj.sleepModeUpTemp = this.state.sleepModeUpTemp;
            break;
            case 4:
                modeObj.allHeatTemp = 60;
            break;
        }
        
        Actions.changeMode(i,modeObj);
    }
    //增加整机温度
    addTemperature(position){
        
        if(this.state.size === 2){
            switch(parseInt(this.state.modeStatus)){
                case 1:
                    this.state.allHeatTemp += 1;
                    Actions.changeTotalTemperature(this.state.allHeatTemp);
                    this.setState({
                        totalTemp: this.state.allHeatTemp
                    });
                break;
                case 2:
                    if(position === 'left'){
                        if(this.state.leftHeatTemp === 0) this.state.leftHeatTemp = 30;
                        else this.state.leftHeatTemp += 1;
                        Actions.changePartitionTemperature({leftHeatTemp: this.state.leftHeatTemp ,rightHeatTemp: this.state.rightHeatTemp},'left');
                    }else{
                        if(this.state.rightHeatTemp === 0) this.state.rightHeatTemp = 30;
                        else this.state.rightHeatTemp += 1;
                        Actions.changePartitionTemperature({leftHeatTemp: this.state.leftHeatTemp ,rightHeatTemp: this.state.rightHeatTemp},'right');
                    }
                break;
                case 3:
                    this.state.sleepModeUpTemp += 1;
                    Actions.changeSleepTemperature(this.state.sleepModeUpTemp);
                break;
            } 
        }
    }
    //降低整机温度
    reduceTemperature(position){
        if(this.state.size === 2){
            switch(parseInt(this.state.modeStatus)){
                case 1:
                    this.state.allHeatTemp -= 1;
                    Actions.changeTotalTemperature(this.state.allHeatTemp);
                    this.setState({
                        totalTemp: this.state.allHeatTemp
                    });
                break;
                case 2:
                    if(position === 'left'){
                        if(this.state.leftHeatTemp === this.state.minPartitionTemperature) this.state.leftHeatTemp = 0;
                        else this.state.leftHeatTemp -= 1;
                        
                        Actions.changePartitionTemperature({leftHeatTemp: this.state.leftHeatTemp ,rightHeatTemp: this.state.rightHeatTemp},'left');
                    }else{
                        if(this.state.rightHeatTemp === this.state.minPartitionTemperature) this.state.rightHeatTemp = 0;
                        else this.state.rightHeatTemp -= 1;
                        
                        Actions.changePartitionTemperature({leftHeatTemp: this.state.leftHeatTemp ,rightHeatTemp: this.state.rightHeatTemp},'right');
                    }
                    
                break;
                case 3:
                    this.state.sleepModeUpTemp -= 1;
                    Actions.changeSleepTemperature(this.state.sleepModeUpTemp);
                break;
            } 
        }
    }
    //预约
    handleSwitch(bool){
        if(this.state.appointmentBtn){
            this.setState({
                disabledSwitch: bool
            });
            Actions.changeAppointment(bool);
        }
    }
    //取消时间组件
    cancelClock(){
        this.setState({
            selectTimeBtn: false
        });
    }
    //显示时间组件
    showClock(){
        this.setState({
            selectTimeBtn: true,
        });
    }
    //选择时间
    submitClock(hou,min){
        console.log(hou);
        if(parseInt(hou)===0 && parseInt(min) === 0){
            het.toast('时间不能设为0');
            return false;
        }
        if(this.state.startUpTimeBtn){
            if(parseInt(hou) === this.state.shutdownHour &&  parseInt(min) === this.state.shutdownMin){
                het.toast('启动时间和关闭时间不能设置相同');
                return false;
            }
            let time = {};
            time.startupHour = parseInt(hou) ;
            time.startupMin = parseInt(min);

            
            Actions.changeStartUp(time);

        }else if(this.state.closingTimeBtn){
            if(parseInt(hou) === this.state.startupHour &&  parseInt(min) === this.state.startupMin){
                het.toast('关闭时间和启动时间不能设置相同');
                return false;
            }
            let time = {};

            time.shutdownHour = parseInt(hou);
            time.shutdownMin = parseInt(min);
            
            Actions.changeClosing(time);
        }else if(this.state.bootTimeBtn){
            let time = {};
            time.startupHour = parseInt(hou);
            time.startupMin = parseInt(min);
            
            Actions.bootAppointment(time);
        }
        this.cancelClock();
    }
    handleStart(){
        if(this.state.appointmentBtn){
            this.setState({
                selectTimeBtn: true,
                startUpTimeBtn: true,
                closingTimeBtn: false,
                bootTimeBtn: false,
            });
        }
    }
    handleCloseing(){
        if(this.state.appointmentBtn){
            this.setState({
                selectTimeBtn: true,
                startUpTimeBtn: false,
                closingTimeBtn: true,
                bootTimeBtn: false,
            });
        }
    }
    changeEquipment(i){
        this.state.switchStatus = i;
        if(i===1){
            //开机
            if(this.state.bootTimeBtn){
                this.setState({
                    disabledSwitch: true,
                });
            }
            if( this.state.leftHeatTemp === 0 && this.state.rightHeatTemp === 0){
                
                Actions.changeEquipment(i,true);
                return false;
            }
        }

        Actions.changeEquipment(i);

    }
    handleAppointmentBoot(){

        if(this.state.startAppointmentBtn){
            //关
            this.setState({
                bootTimeBtn: false,
            });
            Actions.bootAppointment({},true);

        }else{
            //开
            this.setState({
                selectTimeBtn: true,
                startUpTimeBtn: false,
                closingTimeBtn: false,
                bootTimeBtn: true
            });
        }
        
    }
    render() {

        //二区
        //整机
        let allHeatTemp = {"defaultTemperature": this.state.allHeatTemp, "maxTemperature": this.state.maxTotalTemperature, "minTemperature": this.state.minTotalTemperature};
        //二区左边
        let leftHeatTemp = {"defaultTemperature": this.state.leftHeatTemp, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature, btn: true};
        //二区右边
        let rightHeatTemp = {"defaultTemperature": this.state.rightHeatTemp, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature, btn: true};
        //睡眠
        let sleepModeDownTemp = {"defaultTemperature": this.state.sleepModeDownTemp, "maxTemperature": this.state.maxSleepTemperature, "minTemperature": this.state.minSleepTemperature};

        //暂无四区
        //四区左上
        let leftUpperHeat = {"defaultTemperature": this.state.leftUpperHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature};
        //四区右上
        let rightUpperHeat = {"defaultTemperature": this.state.rightUpperHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature};
        //四区左下 
        let leftDownHeat = {"defaultTemperature": this.state.leftDownHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature};
        //四区右下
        let rightDownHeat = {"defaultTemperature": this.state.rightDownHeat, "maxTemperature": this.state.maxPartitionTemperature, "minTemperature": this.state.minPartitionTemperature};
        /**
        <header className={this.state.switchStatus === 2 ? "header shut-down-color" : "header"}>
                <div className="header-left">
                    <span className="icon-back"></span>
                </div>
                <div className="header-center">
                    <h1>享睡水暖垫</h1>
                </div>
                <div className="header-right"></div>
        </header>
        **/
        return (
            <div className="content">
                {
                    this.state.errorFlag ? (
                        <div className="error-flag">
                            <h1>{this.state.errorFlag}</h1>
                            <div className="mask"></div>
                        </div>
                    ) : ""
                }
                <div className="slide clear">
                    {
                        this.state.hint === 1 ? (
                            <div className="slide-tips"><i className="icon-litle-white-circle"></i>水位过低，请注意加水！</div>
                        ) : ""
                    }
                    {
                        this.state.hint === 2 || this.state.hint === 3 ? (
                            <div className="slide-tips"><i className="icon-litle-white-circle"></i>设备温度过高，请确保设备工作正常！</div>
                        ) : ""
                    }

                    
                    <div className="slide-blanket">
                        <em>水暖器</em>
                        {
                            this.state.size === 4 ? ( //暂时只有2区
                                <div className="slide-blanket-four">
                                    <div className="slide-blanket-img">
                                        <span>左上A</span>
                                        <span>右上B</span>
                                        <span>左下C</span>
                                        <span>右上D</span>
                                    </div>
                                    <div className="slide-blanket-type">
                                        <span>A区温度<strong>28°C</strong></span>
                                        <span>A区温度<strong>28°C</strong></span>
                                        <br/>
                                        <span>A区温度<strong>28°C</strong></span>
                                        <span>A区温度<strong>28°C</strong></span>
                                    </div>
                                </div>
                            ) : (
                                <div className="slide-blanket-two">
                                    <div className="slide-blanket-img">
                                        <span>左A</span>
                                        <span>右B</span>
                                    </div>
                                    <div className="slide-blanket-type">
                                        {
                                            this.state.modeStatus === 1 ? (
                                                <span>整机温度<strong>{this.state.allHeatTemp}°C</strong></span>
                                            ) : ""
                                        }
                                        {
                                           this.state.modeStatus === 2 ? (
                                                <div>
                                                    <span>A区温度<strong>{this.state.leftHeatTemp}°C</strong></span>
                                                    <span>B区温度<strong>{this.state.rightHeatTemp}°C</strong></span>
                                                </div>
                                            ) : ""
                                        }

                                        {
                                            this.state.modeStatus === 3 ? (
                                                <span>睡眠温度<strong>{this.state.sleepModeDownTemp}°C</strong></span>
                                            ) : ""
                                        }

                                        {
                                            this.state.modeStatus === 4 ? (
                                                <span>除螨温度<strong>60°C</strong></span>
                                            ) : ""
                                        }
                                        
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                    <span className="slide-switch" onTouchTap={this.changeEquipment.bind(this,2)}></span>
                </div>
                <div className="modle">
                    <h4>模式</h4>
                    <ul className="box-hori">
                        {
                            MODLELIST.map((item,index)=>{
                                return <li className={ parseInt(this.state.modeStatus) - 1 ===index ? "box-hori-4 active" : "box-hori-4"} key={index} onTouchTap={this.handleModle.bind(this,index + 1)}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                {
                    parseInt(this.state.modeStatus) === 1 ? (
                        <div className="temperature-content total-content">
                            <h4>整机温度</h4>
                            <div className="total-temperature">
                                <TemperatureBox temperature={allHeatTemp} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)}/>
                            </div>
                        </div> 
                    ): ""
                }
                {
                    parseInt(this.state.modeStatus) === 2 ? (
                        <div className="temperature-content partition-content">
                            <h4>分区温度</h4>
                            {
                              this.state.size === 2 ? (
                                <ul className="partition-temperature box-hori">
                                    <li className="box-hori-2">
                                        <TemperatureBox temperature={leftHeatTemp} handleReduce={this.reduceTemperature.bind(this,'left')} handleAdd={this.addTemperature.bind(this,'left')}/>
                                        <em>左A</em>
                                    </li>
                                    <li className="box-hori-2">
                                        <TemperatureBox temperature={rightHeatTemp} handleReduce={this.reduceTemperature.bind(this,'right')} handleAdd={this.addTemperature.bind(this,'right')}/>
                                        <em>右B</em>
                                    </li>
                                </ul>
                              ) : (
                                <div>
                                    <ul className="partition-temperature partition-temperature-border box-hori">
                                        <li className="box-hori-2">
                                            <TemperatureBox temperature={leftUpperHeat} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)}/>
                                            <em>左上A</em>
                                        </li>
                                        <li className="box-hori-2">
                                            <TemperatureBox temperature={rightUpperHeat} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)}/>
                                            <em>右上B</em>
                                        </li>
                                    </ul>
                                    <ul className="partition-temperature box-hori">
                                        <li className="box-hori-2">
                                            <TemperatureBox temperature={leftDownHeat} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)}/>
                                            <em>左下C</em>
                                        </li>
                                        <li className="box-hori-2">
                                            <TemperatureBox temperature={rightDownHeat} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)}/>
                                            <em>右上D</em>
                                        </li>
                                    </ul>
                                </div>
                              )  
                            }
                            
                        </div>
                    ) : ""
                }
                {   
                    parseInt(this.state.modeStatus) === 3 ? (
                        <div className="temperature-content partition-content">
                            <h4>睡眠温度</h4>
                            <div className="total-temperature">
                                <TemperatureBox temperature={sleepModeDownTemp} handleReduce={this.reduceTemperature.bind(this)} handleAdd={this.addTemperature.bind(this)} />
                            </div> 
                        </div>
                    ) : ""
                }
                {
                    parseInt(this.state.modeStatus) === 4 ? (
                        <div className="temperature-content total-content">
                            <h4>除螨温度</h4>
                            <div className="total-temperature">
                                <TemperatureBox />
                            </div>
                        </div>
                    ) : ""
                }
                <div className="modle-content-list clear appointment">
                    预约 <Switch disabled={this.state.disabledSwitch} fnFeedback={this.handleSwitch.bind(this)}/>
                    {
                        !this.state.appointmentBtn ? (<div className="appointment-mask"></div>) : ""
                    }
                </div>
                {
                    this.state.disabledSwitch ? (
                        <div>
                            <div className="modle-content-list clear start-up-time" onClick={this.handleStart.bind(this)}>
                                启动时间 
                                {
                                    this.state.startAppointmentBtn ? (
                                        <span>{this.state.remainStartupHour}小时{this.state.remainStartupMin}分后开机</span>
                                    ) : (
                                        <i className="icon-arrow"></i>
                                    )
                                }
                                {
                                    !this.state.appointmentBtn ? (<div className="appointment-mask"></div>) : ""
                                }
                            </div>
                            <div className="modle-content-list clear closing-time"  onClick={this.handleCloseing.bind(this)}>
                                关闭时间
                                {
                                    this.state.closeAppointmentBtn ? (
                                        <span>{this.state.remainShutdownHour}小时{this.state.remainShutdownMin}分后关机</span>
                                    ) : (
                                        <i className="icon-arrow"></i>
                                    )
                                }
                                {
                                    !this.state.appointmentBtn ? (<div className="appointment-mask"></div>) : ""
                                }
                            </div>
                        </div>
                    ) : ""
                }
                {
                    this.state.switchStatus === 2 ? (
                        <div className="shut-down fade-in">
                            <span className="shut-down-blanket"></span>
                            {
                                this.state.startAppointmentBtn ? (
                                    <div className="shut-down-time">
                                        <span className="shut-down-time-text">预约{this.state.remainStartupHour}小时{this.state.remainStartupMin}分钟后开机</span>
                                        <span className="shut-down-open" onClick={this.handleAppointmentBoot.bind(this)}>取消预约开机</span>
                                    </div>
                                ) : (
                                    <div className="shut-down-time">
                                        <span className="shut-down-open" onClick={this.handleAppointmentBoot.bind(this)}>设置预约开机</span> 
                                    </div>
                                )
                            }
                            <span className="shut-down-switch" onClick={this.changeEquipment.bind(this,1)}></span>
                        </div>
                    ) : ""
                }
                <TimeSelect show={this.state.selectTimeBtn} arrayInit={false} minutestep={10} minutearr={this.state.minuteArr} defaultminute={this.state.defaultMinute} defaulthour={this.state.defaultHour}  cancelClock={this.cancelClock.bind(this)} submitClock={this.submitClock.bind(this)} />
            </div>
        );
    }
}


class Switch extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleTap(){
        let disabled = this.props.disabled ? false : true;
        if(this.props.fnFeedback){
            this.props.fnFeedback(disabled); 
        }
    }
    render(){
        return (
            <span className={this.props.disabled ? "het-switch het-switch-on" : "het-switch"} onClick={this.handleTap.bind(this)}>
                <em></em>
            </span>
        )
    }
}


class TemperatureBox extends BaseComponent{
    constructor(props){
        super(props);
    }
    add(){
        let tempData = this.props.temperature;
        if(this.props.handleAdd && tempData){
            tempData.defaultTemperature >= tempData.maxTemperature ? console.log("温度已到最高") : this.props.handleAdd();
        }
    }
    reduce(){
        let tempData = this.props.temperature;
        let btn = tempData.btn ? true : false;
        if(this.props.handleReduce && tempData){
            if(tempData.btn){
                tempData.defaultTemperature === 0 ? console.log("温度已到最低") : this.props.handleReduce();
            }else{
                tempData.defaultTemperature <= tempData.minTemperature ? console.log("温度已到最低") : this.props.handleReduce();
            }
        }
    }
    render(){
        let tempData = this.props.temperature;
        let btn2 = false;
        let defaultTemperature = 60;
        let maxTemperature = 60;
        let minTemperature = 60;
        if(tempData){
            let btn = tempData.btn ? true : false;
            
            if( btn && tempData.defaultTemperature !== 0) btn2 = true;
            defaultTemperature = tempData.defaultTemperature;
            maxTemperature = tempData.maxTemperature;
            minTemperature = tempData.minTemperature;
        }
        
        return (
            <div>
                {
                    !tempData ? (
                        <div>
                            <span className="temperature-reduce no-tap-reduce"></span>
                            <span className="temperature-txt">{defaultTemperature}<i>°C</i></span>
                            <span className="temperature-add  no-tap-add"></span>
                        </div>
                    ) : (
                        <div>
                            <span className={ btn2 || defaultTemperature > minTemperature  ? "temperature-reduce" : "temperature-reduce no-tap-reduce"} onTouchTap={this.reduce.bind(this)}></span>
                            <span className="temperature-txt">{defaultTemperature}<i>°C</i></span>
                            <span className={defaultTemperature >= maxTemperature ? "temperature-add  no-tap-add" : "temperature-add"}  onTouchTap={this.add.bind(this)}></span>
                        </div>
                    ) 
                }
                
            </div>
        )
    }
}

const connnectLocalStorage = () =>{
    return comp => {
        return class connectComponent extends BaseComponent{
            constructor(props){
                super(props);
            }
            render(){
                return (
                     <Comp />
                )
            }
        }
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('享睡水暖垫');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});