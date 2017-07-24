// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.es6';
import {Range} from './Range.jsx';
import {RanTime} from './RanTime.jsx';
import {StateModel} from './StateModel.jsx';
import {DialogStyle} from './DialogStyle.jsx';

let stateModel = new StateModel;


// 创建React组件
export class SelectModel extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle:1,title:'模式',setNavRightBtnHiden:1}));
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            TempcWorkSet: 0,
            TempcWorkTime: 0,
            Timehour: 0,
            Timemin: 0,
        };
        this.listenStore(Store); // 监听Store
        this.submitClock = function(h,m){
           //console.log("h"+h+'m'+m);
            Actions.selectTime(h,m);
        };
        const _this = this;
        this.cancelClock = function(){
            //console.log("取消");
            _this.setState({
                selectshow:false

            });
        };
    }
    canceldia(){
        //console.log("canceldia/......");
        this.setState({
            diaErrShow: 1
        });
    }
    submitdia(){
        //console.log("submitdia/......");
        location.href="tel:4007772009";
        //location.href="tel:4006366396";
        this.setState({
            diaErrShow: 1
        });
    }
    startEnd(e){
        let activeIndex = e.target.getAttribute('data-index');
        this.setState({TempcWorkSet:0,TempcWorkTime:0,Timehour:0,Timemin:0,activeIndex:activeIndex});//选择模式
        //console.log('select  activeIndex',activeIndex);
    }
    timeClock(e){
        this.setState({
            selectshow:true
        });
    }
    modeStart(){
        if (parseInt(this.state.online) == 2) return false;
        if (parseInt(this.state.senseError || 0) == 1) {
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        //console.log('modeStart');
        let Hour = parseInt(this.state.hour===undefined?0:this.state.hour);//预约小时
        let Min = parseInt(this.state.minute === undefined?0:this.state.minute);//预约分钟
        let CurWorkMode = this.state.activeIndex || 0;
        //console.log('modeStart' + 'CurWorkMod='+CurWorkMode + 'Hour='+Hour+'Min='+Min);
        let defTemp = parseInt(stateModel.getAll()[parseInt(CurWorkMode)].defTemp) - parseInt(stateModel.getItem(CurWorkMode).mintemp) +1 ;
        let defTime = parseInt(stateModel.getAll()[parseInt(CurWorkMode)].defTime) ;
        let setTemp = parseInt(this.state.TempcWorkSet == 0?defTemp:this.state.TempcWorkSet);//设置温度 如果没有选默认
        let setTime = parseInt(this.state.TempcWorkTime == 0?defTime:this.state.TempcWorkTime);//设置时间 如果没有选默认
        let setHour = parseInt(setTime/60);
        let setmin  = parseInt(setTime%60);
        //console.log('setTemp='+setTemp + 'setTime='+setTime + 'setHour='+setHour+'setmin='+setmin);
        if(setTemp != 0){
            setTemp = setTemp + parseInt(stateModel.getItem(CurWorkMode).mintemp) -1;
        }else {
            setTemp = 0;
        }
        Actions.modeStart(setHour,setmin,setTemp,parseInt(CurWorkMode),Hour,Min);
    }
    setTempSeek(e){
        console.log("e+"+e.toString);
    }
    render(){
        let activeIndex = this.state.activeIndex || 0;
        //console.log('activeIndex',activeIndex);
        let selectshow = this.state.selectshow;
        let senseError = parseInt(this.state.senseError || 0);
        let diaErrShow = this.state.diaErrShow || 0;//0 开 1关
        let selectdiag = (senseError==1 && diaErrShow == 0)?true: false;
        let selectTitle = '预约时间';
        let statusname = '后启动';
        let hour = parseInt(this.state.hour);
        let minute = parseInt(this.state.minute);
        let TempcWorkSet = this.state.TempcWorkSet || 0;//温度设置

        let Timehour = this.state.Timehour || 0;//时长设置  小时
        let Timemin = this.state.Timemin || 0;//时长设置   分钟
        let TempcWorkTime = parseInt(Timehour)*60 + parseInt(Timemin);

        let remainTime = (hour > 0 || minute > 0)?((hour > 0 ? hour + '小时':'') + (minute > 0 ? minute + '分':'' )+ '后开始工作'):'- -';
        let minTemp = parseInt(stateModel.getItem(activeIndex).mintemp) || 35;
        let maxTemp = parseInt(stateModel.getItem(activeIndex).maxtemp) || 230;
        let offeTemp = parseInt(stateModel.getItem(activeIndex).defTemp) || 180;

        let minTime = parseInt(stateModel.getItem(activeIndex).mintime) || 1;
        let maxTime = parseInt(stateModel.getItem(activeIndex).maxtime) || 120;
        let offeTime = parseInt(stateModel.getItem(activeIndex).defTime) || 40;
        if(TempcWorkSet == 0){
            TempcWorkSet = offeTemp - minTemp + 1;
        }
        if(Timehour == 0 && Timemin == 0){
            TempcWorkTime = offeTime - minTime + 1;
        }
        return(<section className="SetMode" >
            <div style={{height:this.state.headerTop + 'px',width:'100%',backgroundColor:'rgb(50,133,255)'}}></div>
            <div className='modeSel '  >
                {stateModel.getAll().map(
                    (item,index)=>{
                        return(
                            <div data-index={index} key={index} onTouchEnd={this.startEnd.bind(this)}>
                                <i  className={item.photo +' '+(index==activeIndex?'active':'')} data-index={index}></i><span data-index={index} className={(index==activeIndex?'active':'')}>{item.name}</span>
                            </div>
                        );
                    })
                }
            </div>

            <div className="selectseek">
                <Range value={TempcWorkSet}   min={0} offe={minTemp} max={maxTemp}  rate={1} rangedisable={false} />
                <RanTime value={TempcWorkTime}  min={0}  offe={minTime} max={maxTime}  rate={1} rangedisable={false} />
            </div>
            <div className="startModel">
                <div className='modeTime'>
                    <div className='timeOrder' onTouchEnd={this.timeClock.bind(this)}>
                        <span>预约时间</span>
                        <span>{remainTime}<i></i></span>
                    </div>
                    <div className='start' onTouchEnd={this.modeStart.bind(this)}>
                        {remainTime == '- -'?'启动':'启动预约'}
                    </div>
                </div>
                <TimeSelect title={selectTitle} minuteshow={true} hourshow={true} hourstep={1}
                            minutestep={1} defaulthour={1} statusname={statusname} cancelClock={this.cancelClock}
                            submitClock={this.submitClock} show={selectshow} hourarray={['00','01','02','03','04','05',
                            '06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23',
                            '24']} minutearr={['00',10,20,30,40,50]} />
            </div>
            <DialogStyle show={selectdiag} cancelClock={this.canceldia.bind(this)}
                         submitClock={this.submitdia.bind(this)} rightpam='联系客服'
                         title='设备故障' content="温度传感器异常"/>

        </section>);
    }
}

