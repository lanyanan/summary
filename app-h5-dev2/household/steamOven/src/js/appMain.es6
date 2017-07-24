import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Pattern} from './Pattern.es6';
import {Define} from './Define.es6';
import {TimeSelect} from './TimeSelect.es6'
const {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(() => {
    het.config({
        debugMode: 'print',
        updateFlagMap: {},
        renderConfigData:true,
    });
});
het.repaint((data) => {
    Actions.repaint(data);
});

class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state ={
         Mode:0,//默认为待机模式
         roastIndex:0,//默认为烘焙中
         show:false,//是否显示时间组件
         modelPop : false,//显示高低湿度组件
         currentRunMode:0,//默认当前未选择高低湿度
       	 ovenled:3,//默认卢灯处于关闭状态
         reservationhour:0,//预约剩余小时
         // power:16,
         reservationmin:0, //默认选择剩余分钟为0
         start:1,//默认为启动的
         isShowAlert:false,//默认不弹出取消对话框
         orderAlert:false,//默认不弹出预约取消对话框
         changeDefault:false,//默认改变默认值
		}; 
        this.listenStore(Store);
      
        this.modeSelect=this.modeSelect.bind(this);
        this.cancelclock=this.cancelclock.bind(this);
        this.closePop=this.closePop.bind(this);
        this.changeMode=this.changeMode.bind(this);
        this.setTime=this.setTime.bind(this);
        this.turnHandler=this.turnHandler.bind(this);//设备开关机操作
        this.handLight=this.handLight.bind(this);//卢灯切换操作
       	this.componentWillMount=this.componentWillMount.bind(this);
        this.handStop=this.handStop.bind(this);//暂停按钮操作
        this.componentMount=this.componentMount.bind(this);
        this.cancelWork=this.cancelWork.bind(this);//取消工作模式
        this.control=this.control.bind(this);
        this.resetTime=this.resetTime.bind(this);//重新设置烘焙时间事件

       het.setTitle(JSON.stringify({setNavTitle:0,title:'模式',setNavRightBtnHiden:0}));
    }
    componentWillMount(){

    	Actions.getData();
     
    	
    }
     control(){
       this.setState({changeDefault:false})
     }
    componentMount(){

    }
    setTime(){
      if(this.state.reservationhour||this.state.reservationmin)return;
      this.setState({show:true,changeDefault:true});

    }
    resetTime(minute){
     let hour=parseInt(parseInt(minute)/60);
     let newminute=parseInt(minute)%60;	
     Actions.resetTime(hour,newminute);
		setTimeout((data)=>{
   		Actions.repaint(data);
   	},5000);

    }
    handStop(){
    	if(this.state.reservationhour||this.state.reservationmin)return;
    	if(this.state.Mode){
    	let newstart=this.state.start==16 ? 1 :16;
    	this.setState({start:newstart});
    	Actions.stop(newstart);
    	}
    }
    modeSelect(){
    if(this.state.reservationhour||this.state.reservationmin)return;
    if(this.state.power==16)return;	
    if(this.state.Mode==2||this.state.Mode==3){
     	 this.setState({modelPop:true});

     }        
      return;
    }
   turnHandler(e){
   	e.stopPropagation();
	  e.preventDefault();
	if(this.state.power==0||this.state.power==16||this.state.power===undefined){Actions.turn(1)};
	if(this.state.power===1){Actions.turn(16)}
	}
   handLight(){
   	if(this.state.power==16||this.state.power==undefined)return;
   	let newOvenled=parseInt(this.state.ovenled==3 ? 0: this.state.ovenled)+1;
   	this.setState({ovenled:newOvenled});
   	Actions.turnLight(newOvenled);
   
   }
   cancelclock(){
      this.setState({show:false});
   }
   changeMode(e){         //选择高低湿度
   	    if(this.state.Mode==2||this.state.Mode==3||this.state.mode==2||this.state.mode==3){
        let target = e.currentTarget;
        let currentRunMode = target.getAttribute("data-mode");
        this.setState({currentRunMode:currentRunMode,modelPop : false});
        Actions.sethumidity(currentRunMode);
        
        }
   }
    closePop() {         // 关闭弹窗
        if(this.state.modelPop){
          this.setState({modelPop : false});
        }
    }
    cancelWork(){
      setTimeout((data)=>{
      Actions.repaint(data);
    },5000);
    	if(this.state.Mode==0||this.state.Mode===undefined)return;
    	if(this.state.reservationhour||this.state.reservationmin){this.setState({orderAlert:true});}
    	else{this.setState({isShowAlert:true});}
    }
    btnClose(){
    
     Actions.calWork();
     this.setState({isShowAlert:false,orderAlert:false});
    }
    btnCancel(){
      this.setState({isShowAlert:false,orderAlert:false});
     
    }
    componentWillUpdate(nextProps,nextState){
       let errorMessage='';
       let aLarm1=this.state.alarm1!==nextState.alarm1&&nextState.alarm1==1;
       let aLarm2=this.state.alarm2!==nextState.alarm2&&nextState.alarm2==1;
       let aLarm3=this.state.alarm3!==nextState.alarm3&&nextState.alarm3==1;
       let aLarm4=this.state.alarm4!==nextState.alarm4&&nextState.alarm4==1;
       let aLarm5=this.state.alarm5!==nextState.alarm5&&nextState.alarm5==1;
       let aLarm6=this.state.alarm6!==nextState.alarm6&&nextState.alarm6==1;
       errorMessage=aLarm1 ?'腔体高温保护' :'';
       errorMessage=aLarm2 ?errorMessage+'蒸发盘高温保护' : errorMessage;
       errorMessage=aLarm3 ?errorMessage+'腔体低温保护' : errorMessage;
       errorMessage=aLarm4 ? errorMessage+'蒸发盘低温保护' : errorMessage;
       errorMessage=aLarm5 ?errorMessage+'传感器连接故障' : errorMessage;
       errorMessage=aLarm6 ? errorMessage+'传感器感应故障' : errorMessage;
       if( errorMessage) het.toast(JSON.stringify({contactService:errorMessage,tel:'400-777-2009'}))
      // if(this.state.end==1){Actions.calWork();};
       //设备故障处理
      
    }
    render() {
     
        let is=this.state;
    	  let isTrue=(is.reservationhour||is.reservationmin) ? true:false;//为true时为预约状态
    	  let definepath=this.state.power==16||this.state.power===undefined ? '' :'/define';
    	
 		    let path=this.state.Mode==0&&this.state.power==1 ? "/pattern" : ''; //路由的跳转
        let modelPop=this.state.modelPop;
      	let waitText=['待机中','已关机'][this.state.power==16||this.state.power===undefined||this.state.power==0 ? 1 :0];
        let roastText=['烘焙中','预约中'][isTrue==true ? 1 : 0];
        let popStyle = modelPop ? {display : 'block'} : {display : 'none'};
        let modelPopStyle = modelPop ? {bottom : 0} : {bottom : '-23.75rem'};
        let currentRunMode = this.state.currentRunMode||this.state.humidityControl;
        let workImageArr=['firstMode3.png','firstMode3.png','secondMode3.png','thirdMode3.png','fourMode3.png','fiveMode3.png','sixMode3.png','sevenMode3.png','eightMode3.png','nineMode3.png','tenMode3.png','elevenMode3.png','twelveMode3.png','thirteenMode3.png']
        let workSrc='../static/img/'+workImageArr[this.state.Mode];//模式按钮图标
        let wetImageArr=['lowselected.png','middleselected.png','highselected.png','waternormal.png'];
        let wetSrc1='../static/img/'+ wetImageArr[this.state.humidityControl==undefined||this.state.humidityControl==0 ? 3 :this.state.humidityControl-1];//高低湿按钮
        let wetSrc2='../static/img/waterdis.png';
        let wetSrc=(this.state.Mode==2||this.state.Mode==3)&&isTrue!=true ? wetSrc1 : wetSrc2;
        let wetArr=['低湿','中湿','高湿'];
        let wetText1=wetArr[this.state.humidityControl==undefined||this.state.humidityControl==0 ? 0 :this.state.humidityControl-1];
        let wetText2='低湿';
        let wetText=this.state.Mode==2||this.state.Mode==3 ? wetText1 : wetText2;
        let defineImageArr=['define_normal.png','define_disabled.png'];
        let defineSrc='../static/img/'+defineImageArr[this.state.Mode==0&&(this.state.power==16||this.state.power==undefined||this.state.power==0) ?1 : 0];//自定义模式图标
        let stopImageArr=['control_disabled.png','control_normal.png','start.png'];
        let stopSrc='../static/img/'+stopImageArr[this.state.Mode==0||isTrue==true ? 0 :this.state.start==16 ? 2 :this.state.start];//暂停按钮图标
        let cancelImgeArr=['cancel_disabled .png','cancel_button_normal.png'];
        let cancelSrc='../static/img/'+cancelImgeArr[this.state.Mode==0 ? 0 :1];//取消按钮图标
       	let patterArr=['moshi.png','unmoshi.png'];
       	let patternSrc='../static/img/'+patterArr[this.state.Mode==0&&this.state.power==1 ? 0 :1];//模式按钮图标
       	let lightArr=['light_button_selected.png','light_button_selected.png','light_normal.png','light_disabled.png'];
       	let lightSrc='../static/img/'+lightArr[this.state.power==16||this.state.power===undefined ? 3 : this.state.ovenled===undefined||this.state.ovenled==0 ? 2:this.state.ovenled-1];//卢灯按钮图标
       	let textArr=['短亮','长亮','炉灯关'];
       	let lightText=textArr[this.state.ovenled==0 ? 2 :this.state.ovenled-1];
       	let workingArr=['firstMode4.png','secondMode4.png','thirdMode4.png','fourMode4.png','fiveMode4.png','sixMode4.png','sevenMode4.png','eightMode4.png','nineMode4.png','tenMode4.png','elevenMode4.png','twelveMode4.png','thirteenMode4.png'];
       	let workingSrc='../static/img/'+workingArr[this.state.Mode-1];//正在运行的图标
       	let willworkArr=['firstMode2.png','secondMode2.png','thirdMode2.png','fourMode2.png','fiveMode2.png','sixMode2.png','sevenMode2.png','eightMode2.png','nineMode2.png','tenMode2.png','elevenMode2.png','twelveMode2.png'];
       	let willworkSrc='../static/img/'+willworkArr[this.state.mode1-1];
       	let willworkSrc1='../static/img/'+willworkArr[this.state.mode2-1]
       	let willworkArr1=['firstMode1.png','secondMode1.png','thirdMode1.png','fourMode1.png','fiveMode1.png','sixMode1.png','sevensevenMode1.png','eightMode1.png','nineMode1.png','tenMode1.png','elevenMode1.png','twelveMode1.png']
        let willworkingSrc1='../static/img/'+willworkArr1[this.state.mode2-1];
       	let workTextArr=['蒸汽模式','顶部蒸烤组合','后部热风蒸组合','后部热风','顶部热风','顶部烧烤','顶部单管热风','顶部单管烤','发酵', '保温','解冻','杀菌'];
       	let workingText=workTextArr[this.state.Mode-1];
       	let willworkText=workTextArr[this.state.mode1-1];
       	let willworkText1=workTextArr[this.state.mode2-1]
       	let orderAll=parseInt(this.state.reservationhour-this.state.remainingTimeHour)*60+parseInt(this.state.reservationmin)-parseInt(this.state.remainingTimeMin);
       	let orderHour=parseInt(parseInt(orderAll)/60);
       	let orderMinute=parseInt(orderAll%60);
        let timeStyle=parseInt(parseInt(this.state.remainingTimeHour)*60+parseInt(this.state.remainingTimeMin));
       
        return (
            <div className="app-body">
              <section style={{display:this.state.online==2 ? 'none' :''}}>	
                <section className='banner-bg'>
                  
                {/*待机状态或预约状态下首页的渲染状态*/}
                  <section className='wait-index'  style={{display:this.state.Mode ?'none': ''}}  > 
                    <img src='../static/img/home_image.png' />
                    <p className='work-text' >{waitText}</p>
                    <div className='turn-icon'>
                    <img src='../static/img/home_button_normal.png' onTouchEnd={this.turnHandler} />
                   </div>
                  </section> 
              {/*烘焙或预约状态下首页的渲染状态*/}
                 <section className='roast-index' style={{display:this.state.Mode ?'' : 'none' }}>
                  <img src='../static/img/home_image.png'/>
                  <p className='roast-text'>{roastText}</p>
                {/*烘焙中显示温度和时间*/}
                  <div className='roast-information' style={{display:isTrue ? 'none' :''}}>
                    <span>{this.state.setTemperatureLow}℃</span>
                    <span>|</span>
                    <span>{this.state.remainingTimeHour<10?'0'+this.state.remainingTimeHour:this.state.remainingTimeHour}:{this.state.remainingTimeMin<10 ? '0'+this.state.remainingTimeMin:this.state.remainingTimeMin}</span>
                  </div>
                 {/*预约状态只显示时间*/}
                 <div className='roast-information' style={{display:isTrue ? '' :'none' }}>{ orderHour<10 ?'0'+ orderHour : orderHour}:{orderMinute<10?'0'+orderMinute :orderMinute}</div> 
               <section style={{display:this.state.mode2===undefined||this.state.mode2==0 ?'none' :''}}>
                <div className='roast-pattern'>
                	
                    <span className='first-pattern'><img src={ workingSrc}/></span>
                    <span className='first-line'></span>
                    
                   <span className='second-pattern'><img src={willworkSrc}/></span>
                   <span className='second-line'></span>
                    <span className='second-pattern'><img src={willworkSrc1}/></span>
                 </div>
                 <div className='pattern-text' >
                    <span>{ workingText}</span>
                    <span>{willworkText}</span>
                    <span>{willworkText1}</span>
                 </div>     
               </section>
               <section style={{display:this.state.mode2===undefined||this.state.mode2==0 ?'' :'none'}}>  
                 <div className='roast-pattern ' >

                   
                    <span className='circle1-woking'>
                      <span className='circle2-woking'>
                           <span className='working-pattern'><img src={workingSrc}/></span>
                      </span>
                    </span>
                    <span className='second-line' style={{display:this.state.mode1===undefined||this.state.mode1==0 ?'none':'' }}></span>
                    <span className='second-pattern' style={{display:this.state.mode1===undefined||this.state.mode1==0  ?'none':'' }}><img src={willworkSrc}/></span>
                 </div>
                 <div className='pattern-text' id='twoText'>
                   
                    <span style={{paddingLeft:this.state.mode1===undefined||this.state.mode1==0 ?'23%':'13%',flex:this.state.mode1===undefined||this.state.mode1==0 ?'2' :'1' }}>{workingText}</span>
                    <span style={{display:this.state.mode1===undefined ?'none':'' }}>{willworkText}</span>
                 </div> 
                </section>     
                 </section>

               </section>
               
              
                <div className="app-ctrl" style={{display: modelPop ?'none' :''}} >
                    
                    <div className="flex app-ctrl-list">
                        <Link to={definepath} className="flex-cell"  style={{color:this.state.Mode==0&&(this.state.power==16||this.state.power==0||this.state.power===undefined) ? '#ababab' : '#303030'}}>
                        	<img src={defineSrc}/>
                            自定义
                        </Link>
                        
                        {/*待机状态下模式显示模式页,点击进入烘焙模式选择*/}
                        <div className="flex-cell" style={{display:this.state.Mode?'none':'',color:this.state.Mode==0&&this.state.power==1 ?'#303030' :'#ababab'}}>
                            <Link to={path} style={{color:this.state.Mode==0&&this.state.power==1 ? '#303030' :'#ababab'}}>
                            <img src={patternSrc}/>
                            模式
                            </Link>
                        </div>
                        {/*烘焙状态下点击可修改烘焙时间*/}  
                        <div className="flex-cell" onTouchEnd={this.setTime} style={{display:this.state.Mode?'' : 'none' }}>
                            <img src={workSrc}/>
                           <span style={{color:'#ff7734'}}> {workingText}</span>
                        </div>
                        <div className="flex-cell" style={{color:this.state.Mode==0||isTrue ? '#ababab' :'#303030'}} onTouchEnd={this.handStop}>
                            <img src={stopSrc}/>
                            {this.state.start==16?'启动' :'暂停'}
                        </div>
                     </div>
                    <div className="flex app-ctrl-list" style={{color:this.state.Mode==0&&this.state.power==16 ?'#ababab':'#303030'}}>
                        <div className="flex-cell" style={{color:this.state.Mode==0&&(this.state.power==16||this.state.power==0||this.state.power===undefined) ? '#ababab' : '#303030'}} onTouchEnd={this.handLight}>
                            <img src={lightSrc}/>
                           <span style={{color:(this.state.ovenled==1||this.state.ovenled==2)&&(this.state.power!=16&&this.state.power!=undefined) ? '#ff7734' :''}}> {lightText}</span>
                        </div>
                        <div className="flex-cell" onTouchEnd={this.modeSelect} style={{color:(this.state.Mode==2||this.state.Mode==3)&&this.state.power==1&&isTrue==false ?'#303030' :'#ababab'}}>
                            <img src={wetSrc}/>
                           <span style={{color:this.state.humidityControl==undefined||this.state.humidityControl==0 ?'':'#ff7734'}}> {wetText}</span>
                        </div>
                        <div className="flex-cell" style={{color:this.state.Mode==0 ?'#ababab':'#303030'}} onTouchEnd={this.cancelWork}>
                            <img src={cancelSrc}/>
                            取消
                        </div>
                    </div>
                </div>
              </section>
              <section className='off-line' style={{display:this.state.online==2 ? '' :'none'}}>
                   <div className='banner'>
              		 <img src='../static/img/home_image.png'/>
              		</div>
              		<p>主人,你的烤箱不在线哦~!</p> 
              </section>  
             <TimeSelect show={this.state.show} hourshow={false}  cancelClock={this.cancelclock} resetTime={this.resetTime} title={workingText}  defaultminute={""+timeStyle+""} arrayInit={this.state.changeDefault} control={this.control}/>
              <div id="panel-pop" style={popStyle}>
                    <div className="model-mask" onTouchEnd={this.closePop}></div>
                    <div className="model-pop flex-column" style={modelPopStyle}>
                        <div className='flex-cell choosetem'>设置高低湿</div>
                        <div className="flex-cell" data-mode="1" onTouchEnd={this.changeMode}>
                            <span>低湿</span><i style={+currentRunMode===1?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="2" onTouchEnd={this.changeMode}>
                            <span>中湿</span><i style={+currentRunMode===2?{display:''}:{display:'none'}}></i>
                        </div>
                        <div className="flex-cell" data-mode="3" onTouchEnd={this.changeMode}>
                            <span>高湿</span><i style={+currentRunMode===3?{display:''}:{display:'none'}}></i>
                        </div>
                     </div>
               </div> 
               <div id="alert" style={{display:(this.state.isShowAlert==true ? 'block' :'none')}}>
               		 <div className="model-mask" ></div>
               	     <section className='alert'>	 
                     <div className='innerbox'>
                          <p className="title">温馨提示</p>
                          <p className='text-message'>美食烘焙中，确定取消吗？</p>
                     </div>
                     <div className="two-button">
                          <input type="button" value="取消" onTouchStart={this.btnCancel.bind(this)} className='left'/>
                          <input type="button" value="确定" onTouchStart={this.btnClose.bind(this)} className='right'/>
                     </div>
                    </section> 
                </div>  
                <div id="alert" style={{display:(this.state.orderAlert==true ? 'block' :'none')}}>
               		 <div className="model-mask" ></div>
               	     <section className='alert'>	 
                     <div className='innerbox'>
                          <p className="title">温馨提示</p>
                          <p className='text-message'>美食预约中，确定取消吗？</p>
                     </div>
                     <div className="two-button">
                          <input type="button" value="取消" onTouchStart={this.btnCancel.bind(this)} className='left'/>
                          <input type="button" value="确定" onTouchStart={this.btnClose.bind(this)} className='right'/>
                     </div>
                    </section> 
                </div>  
              
            </div>
        )
    }
}

het.domReady(()=>{
    het.setTitle('荣事达智能蒸汽烤箱');
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Router path="/pattern" component={Pattern} />
            <Router path='/define'  component={Define} />
        </Router>
    ), document.getElementById('ROOT'));
});


