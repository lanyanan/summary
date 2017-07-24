'use strict';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} windStall  	运行速率，取值0-92
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @act  Actions.selectRate([integer])  切换档位时触发
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.es6';
var {Link} = ReactRouter;

export class SetMode extends BaseComponent{
    constructor(props) {
       
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        //Actions.pushGuiderData(); // 请求推送向导数据
        Actions.getData();
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64
        };
        this.submitClock = function(h,m){
            Actions.selectTime(h,m);
        };
        this.cancelClock = function(){
            Actions.clockSwitch(3,'cancel');
        };
        het.setTitle('模式');
    }
	
 startEnd(e){
  let activeIndex = e.target.getAttribute('data-index');
  this.setState({activeIndex:activeIndex});
 }
 timeClock(e){
    this.setState({
      selectshow:true
    });
 }
 setting(){
    // console.log('tttttttttttttt');
    let BespeakHour = parseInt(this.state.hour===undefined?0:this.state.hour);
    let BespeakMin = parseInt(this.state.minute === undefined?0:this.state.minute);
    // console.log(this.state.hour,'mmmmmmm');
    //let CurWorkMode = this.state.CurWorkMode?parseInt(this.state.CurWorkMode)-1: 0 ;
    let CurWorkMode = this.state.activeIndex || 0;

    Actions.setting(BespeakHour,BespeakMin,CurWorkMode);
 }
	render() {
    //let CurWorkMode = this.state.CurWorkMode?parseInt(this.state.CurWorkMode)-1: 0 ;
    let activeIndex = this.state.activeIndex || 0;
    activeIndex>6?activeIndex=0:activeIndex;
    // console.log('activeIndex',activeIndex);
    let selectshow = this.state.selectshow;

    let rate = 40;
    this.state.online==2?(history.go(-1)):null;
    let rangedisable =  true;

    let selectTitle = '预约时间';
    let statusname = '后开启';
    let hour = parseInt(this.state.hour);
    let minute = parseInt(this.state.minute);
    let remainTime = (hour > 0 || minute > 0)?((hour > 0 ? hour + '小时':'') + (minute > 0 ? minute + '分':'' )+ '后开始工作'):'- -';
    let arrObj = [{name:'五谷豆浆',photo:'photo0'},{name:'干/湿豆',photo:'photo1'},{name:'米糊',photo:'photo4'},
              {name:'绿豆沙',photo:'photo5'},{name:'婴儿辅食',photo:'photo6'},{name:'果汁搅拌',photo:'photo7'},{name:'轻松洗',photo:'photo8'}];
	    return (
	        <section className="SetMode" >
             <div style={{height:this.state.headerTop,width:'100%',backgroundColor:'rgb(50,133,255)'}}></div>
             <div className='modeSel ' onTouchEnd={this.startEnd.bind(this)} >
              {arrObj.map(
                (item,index)=>{
                return(
                  <div data-index={index} key={index} >
                    <i  className={item.photo +' '+(index==activeIndex?'active':'')} data-index={index}></i><span data-index={index} className={(index==activeIndex?'active':'')}>{item.name}</span>
                  </div>
                );
              })}                
             </div>
             <div className='modeTime'>
               <div className='timeOrder' onTouchEnd={this.timeClock.bind(this)}>
                  <span>预约时间</span>
                  <span rangedisable={selectshow?true:rangedisable} >{remainTime}<i></i></span>
               </div>
               <div className='start' onTouchEnd={this.setting.bind(this)}>
                  启动
               </div>
             </div>
             <TimeSelect title={selectTitle} minuteshow={true} hourshow={true} hourstep={1}
                minutestep={1} defaulthour={1} statusname={statusname} cancelClock={this.cancelClock}
                submitClock={this.submitClock} show={selectshow} minutearr={['00',10,20,30,40,50]} />
            <div id="mytoast"></div>
	        </section>
	    );
	}
};