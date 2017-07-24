// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
//import {Tip} from './Tip.es6';
//import {Content} from './Content.es6';
import {Selector} from './Selector.es6';
import {Pattern} from './Pattern.es6';
import {Taste} from './Taste.es6';
import {TimeSelect} from './TimeSelect.es6'
var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData:true
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
        this.state = {
        	contentIndex:0,//默认为待机模式
        	status:0,
        	temperHour:0,
        	temperMinute:0//默认保温的初始时间
        };
        
        this.listenStore(Store); // 监听Store
		this.changeIndex=this.changeIndex.bind(this);
		this.componentWillMount=this.componentWillMount.bind(this);
		het.setTitle(JSON.stringify({setNavTitle:0,title:'模式',setNavRightBtnHiden:0})); 
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.status==1&&this.state.contentIndex!=1&&this.state.contentIndex!=0)//预约烹饪模式的倒计时
    //  	{
    //    	let _this = this;
    //     clearInterval(this.tclock);
    //     this.tclock = setInterval(function(){_this.timeclock()},60000);
    //    }
    // let isTrue=(this.state.status==1&&this.state.contentIndex==1&&(this.state.workIndex==2||this.state.workIndex==undefined))||(this.state.OperationWorkMode==6&&this.state.status==0);
    //  if(isTrue)//蒸饭模式的倒计时
    //    { 
    //     let _this = this;
    //     clearInterval(this.tclock);
    //     this.tclock = setInterval(function(){_this.timeclock1()},500);
    //    }
    //   if(this.state.OperationWorkMode==1||this.state.contentIndex==2)
    //     {
    //     let _this = this;
    //     clearInterval(this.tclock);
    //     this.tclock = setInterval(function(){_this.timeclock2()},100);
    //    }
    
    // } 
    // timeclock(){
    //     let hour=this.state.hour;
    //     let minute=this.state.minute;
    //     let Index1=this.state.workIndex ? this.state.workIndex :2;
    //    let Index=Index1+4;
    //     hour=(0<hour&&hour<10) ? 0+hour:hour;
    //     minute=(0<minute&&minute<10) ? 0+minute:minute;
    //     clearInterval(this.tclock);
    //     if (hour>=0 || minute>0){
    //         minute -= 1;
    //        if(minute<=0){
    //            minute = 59;
    //            hour -=1;
    //            if(hour<0)
    //            {
				// clearInterval(this.tclock);
    //             Actions.workPattern(Index);//预约倒计时完毕自动进入烹饪模式
    //             console.log(Index+'22222')
                
			 //   }
    //         }
    //         this.setState({
    //         	hour:hour,
    //         	minute:minute
    //         })
           
    //       }
    // }
    // timeclock1(){
    //     let hour=this.state.WorkReturnTimeHour==undefined ?'00' :this.state.WorkReturnTimeHour;
    //     let minute=this.state.WorkReturnTimeMinute==undefined ? '40' :this.state.WorkReturnTimeMinute;
    //     clearInterval(this.tclock);
    //     if (hour>=0 || minute>0){
    //         minute -= 1;

    //        if(minute<=0){
    //            minute = 59;
    //            hour -=1;
    //            if(hour<0)
    //            {
    //             clearInterval(this.tclock);
    //             Actions.setTmep();//烹饪倒计时完成后进入保温模式;
               
    //            }
    //         }
    //         this.setState({
    //             WorkReturnTimeHour:hour,
    //             WorkReturnTimeMinute:minute
    //         })
           
    //       }
    // }
    // timeclock2(){
        
    //      let hour3=this.state.temperHour;
    //      let minute3=this.state.temperMinute;
    //      clearInterval(this.tclock);
    //         if(hour3<=23){
    //          minute3 +=1;
    //          if(minute3>59){
    //             minute3=0;
    //             hour3 +=1;
    //          }
    //           if(hour3>23){
    //             clearInterval(this.tclock);
    //             this.setState({
    //                 contentIndex:0
    //             })
    //             }
    //         }
    //         this.setState({
    //         temperMinute: minute3,
    //         temperHour:hour3
    //      });
       
    // }
    changeIndex(index){
        	this.setState({contentIndex:index});
        	//console.log(index);
	}
    
    componentWillMount(){
    	Actions.getData();
    }
    componentWillUpdate(nextProps,nextState){
       let TopShort=this.state.TopNTCShort !== nextState.TopNTCShort && nextState.TopNTCShort==1;
       let TopOpen=this.state.TopNTCOpen !==nextState.TopNTCOpen && nextState.TopNTCOpen==1;
       let BotShort=this.state.BottomNTCShort!==nextState.BottomNTCShort && nextState.BottomNTCShort==1;
       let BotOpen=this.state.BottomNTCOpen!==nextState.BottomNTCOpen && nextState.BottomNTCOpen==1;
       let HiTem=this.state.HighTemperature!==nextState.HighTemperature && nextState.HighTemperature==1;
       if(TopShort&&!TopOpen&&!BotShort&&!BotOpen&&!HiTem) het.toast(JSON.stringify({contactService:'顶部发热丝短路',tel:'400-777-2009'})); 
	   if(TopOpen&&!TopShort&&!BotShort&&!BotOpen&&!HiTem) het.toast(JSON.stringify({contactService:'顶部发热丝开路',tel:'400-777-2009'}));
       if(BotShort&&!TopShort&&!TopOpen&&!BotOpen&&!HiTem)het.toast(JSON.stringify({contactService:'底部发热丝短路',tel:'400-777-2009'}));
       if(BotOpen&&!TopShort&&!TopOpen&&!BotShort&&!HiTem)het.toast(JSON.stringify({contactService:'底部发热丝开路',tel:'400-777-2009'}));
       if(HiTem&&!TopShort&&!TopOpen&&!BotShort&&!BotOpen)het.toast(JSON.stringify({contactService:'高温保护',tel:'400-777-2009'}));
       if(TopShort&&BotShort)het.toast(JSON.stringify({contactService:'1、顶部发热丝短路 2、底部发热丝短路',tel:'400-777-2009'}));
       if(TopShort&&BotOpen)het.toast(JSON.stringify({contactService:'1、顶部发热丝短路 2、底部发热丝开路',tel:'400-777-2009'}));
       if(TopOpen&&BotShort)het.toast(JSON.stringify({contactService:'1、顶部发热丝开路 2、底部发热丝短路',tel:'400-777-2009'}));
       if(TopOpen&&BotOpen)het.toast(JSON.stringify({contactService:'1、顶部发热丝开路 2、底部发热丝开路',tel:'400-777-2009'}));
       if(HiTem&&TopShort)het.toast(JSON.stringify({contactService:'1、顶部发热丝短路 2、高温保护',tel:'400-777-2009'}));
       if(HiTem&&TopOpen)het.toast(JSON.stringify({contactService:'1、顶部发热丝开路 2、高温保护',tel:'400-777-2009'}));
       if(HiTem&&BotShort)het.toast(JSON.stringify({contactService:'1、底部发热丝短路 2、高温保护',tel:'400-777-2009'}));
       if(HiTem&&BotOpen)het.toast(JSON.stringify({contactService:'1、底部发热丝开路 2、高温保护',tel:'400-777-2009'}));
       //设备故障处理

    }
    render() {
		
    	// console.log(this.state.PresetSet+'预约');
    	// console.log(this.state.OperationWorkMode+'工作模式')
    	// console.log(this.state.FuntionSelect+'控制数据');
        // if(this.state. TopNTCShort==1||this.state.HighTemperature==1)het.toast("xuesheng:1、上传感器短路 2、传感器超温");
    	let textMessage,workStyle,bgStyle;//分别显示实时工作模式、预报工作时长
		  let workIndex=this.state.workIndex;
    	let contentArr1=['待机中','烹饪中','保温中','清洗中','预约中'];
      let contentArr2=['待机中','保温中','清洗中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中','烹饪中'];
      let textMessage1=contentArr1[this.state.contentIndex];
      let textMessage2=contentArr2[this.state.OperationWorkMode||this.state.FuntionSelect];
      let textMessage3=((this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)&&(this.state.FuntionSelect!=0))? textMessage1 : textMessage2;
        // let textMessage4=(this.state.OperationWorkMode==0&&this.state.contentIndex!=0) ? textMessage2 : textMessage1;
		  let messageArr1=['','','保温时长',''];
      let messageArr2=['','保温时长','',"蒸鱼","蒸肉","蒸饭","蒸土豆","热饭",'蒸包子',"蒸馒头","蒸玉米",'蒸红薯',"蒸糕点","蟹类","虾类","贝类","蒸蛋"];
      let messageArr3=['',"蒸饭","蒸肉","蒸鱼","蒸土豆","热饭",'蒸包子',"蒸馒头","蒸玉米",'蒸红薯',"蒸糕点","蟹类","虾类","贝类","蒸蛋"];
      let workStyle1=messageArr1[this.state.contentIndex];//控制保温、清洗模式
      let workStyle2=messageArr2[this.state.OperationWorkMode||this.state.FuntionSelect];//根据运行数据的运行模式
      let workStyle3=messageArr3[this.state.workIndex==undefined ? 1 :this.state.workIndex+1];//预约烹饪模式
      let bgcolorArr=[{background:'#59b30f'},{background:'blue'},{background:'#ff9933'},{background:'#3399ff'},{background:'blue'}];
      let runColorArr=[{background:'#59b30f'},{background:'#ff9933'},{background:'#3399ff'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'},{background:'blue'}];
    	let bgStyle1=((this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)&&(this.state.FuntionSelect!=0))? bgcolorArr[this.state.contentIndex]:runColorArr[this.state.OperationWorkMode||this.state.FuntionSelect];//不是预约模式title的背景颜色
    	// let bgStyle2=(this.state.OperationWorkMode==0) ? runColorArr[this.state.OperationWorkMode] : bgcolorArr[this.state.contentIndex];//接受运行进入待机状态
    	//let orderHour1=this.state.hour==0 ? '00' :this.state.hour;
        //let orderMinute1=(this.state.minute>0&&this.state.minute<10) ? '0'+this.state.minute : this.state.minute;
        // let bgStyle1=bgcolorArr[this.state.contentIndex];
        // let bgStyle2=runColorArr[this.state.OperationWorkMode];
        //let orderMinute=(0<this.state.PresetTimeMinute&&this.state.PresetTimeMinute<10)? '0'+this.state.PresetTimeMinute : this.state.PresetTimeMinute;
      let  orderMinute=this.state.PresetTimeMinute==0 ? '00' : this.state.PresetTimeMinute;
        //let orderHour=(0<this.state.PresetTimehour&&this.state.PresetTimehour<10)? '0'+this.state.PresetTimehour : this.state.PresetTimehour;
      let receiveTime=((0<this.state.PresetTimeHour&&this.state.PresetTimeHour<10)||this.state.PresetTimeHour==0)? '0'+this.state.PresetTimeHour :this.state.PresetTimeHour;
      let orderHour1=(this.state.PresetTimeHour!=0&&this.state.PresetTimeHour!=undefined) ? receiveTime : this.state.PresetTimehour;
        //let orderHour=((0<orderHour1||orderHour1==0)&&orderHour1<10&&this.state.PresetTimeHour!=undefined) ? orderHour1 : orderHour1;
    	let workTime1=orderHour1+':'+orderMinute;//设置预约烹饪模式显示的时间
    	//let workTime2=this.state.temperHour+":"+this.state.temperMinute;//设置保温模式显示的时间
      let thour=this.state.WorkReturnTimeHour ? this.state.WorkReturnTimeHour :this.state.temperHour;
      let tminute=this.state.WorkReturnTimeMinute ? this.state.WorkReturnTimeMinute : this.state.temperMinute;
      let workTime2=((thour>=0&&thour<10) ? ('0'+thour) :thour)+':'+((tminute>=0&&tminute<10) ?('0'+tminute):tminute) ;//保温状态显示保温的时间;
      let isTrue=this.state.WorkReturnTimeHour==0&&this.state.WorkReturnTimeMinute==0;
    	let Hour=(this.state.WorkReturnTimeHour==undefined||isTrue) ?'0' :this.state.WorkReturnTimeHour;
    	let Minute=(this.state.WorkReturnTimeMinute==undefined||isTrue) ? '40' :this.state.WorkReturnTimeMinute;
      let workHour=((0<Hour||Hour==0)&&(Hour<10)) ? '0'+Hour :Hour;
      let workMinute=(0<Minute&&Minute<10) ? '0'+Minute : Minute;
      let workTime3= workHour+':'+workMinute;//蒸饭模式下显示的时间
    	//let workTime3=cleanHour+':'+cleanMinute;
    	let workTime4='';//设置清洗模式不显示时间
    	let workTime;

        if(this.state.PresetSet==1)//为预约烹饪模式
        {  if(this.state.status==0&&this.state.OperationWorkMode!=null){workStyle=workStyle2};//为运行数据渲染预约模式
           if(this.state.status==1&&this.state.OperationWorkMode==null){workStyle=workStyle3};//为控制数据渲染预约模式 
           if(this.state.status==1&&this.state.OperationWorkMode==null) {workTime=workTime1};//设置预约烹饪模式显示的时间;
           if(this.state.status==1&&this.state.OperationWorkMode!=null&&this.state.FuntionSelect!=0){workStyle=workStyle3;workTime=workTime1};//
           if(this.state.status==0&&this.state.OperationWorkMode!=null&&this.state.FuntionSelect!=0){workTime=workTime1;workStyle=workStyle3};//接受预约烹饪模式显示的时间
           workTime=workTime1;
           textMessage='预约中';
           bgStyle={background:'blue'};
           
        }
         if(this.state.PresetSet==0&&this.state.OperationWorkMode==5&&(this.state.FuntionSelect==0||this.state.FuntionSelect==undefined)){textMessage='待机';
           bgStyle={background:'#59b30f'};workTime=workTime4;workStyle="";}//防止从APP首页进入index页造成UI渲染混乱
        if(this.state.PresetSet==0||this.state.PresetSet==undefined)//不设置预约烹饪模式
        {  
           if(this.state.status==0&&this.state.OperationWorkMode!=null&&this.state.FuntionSelect!==null){workStyle=workStyle2}//为运行数据渲染工作模式
           if(this.state.status==1&&(this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)&&this.state.FuntionSelect!=0){workStyle=workStyle3;}//为控制数据渲染烹饪工作模式
      	   if(this.state.status==1&&(this.state.OperationWorkMode!=0&&this.state.OperationWorkMode!=null)){workStyle=workStyle2;};	//运行数据渲染烹饪工作模式;
           if(this.state.status==0&&(this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)){workStyle=workStyle1};//选择保温、清洗模式

           if(this.state.status==0&&this.state.OperationWorkMode==5&&this.state.FuntionSelect==5) {workTime=workTime3};//运行蒸饭模式显示的时间；
           if(this.state.status==0&&this.state.OperationWorkMode!=null&&this.state.OperationWorkMode!=5&&this.state.OperationWorkMode!=0&&this.state.OperationWorkMode!=1&&this.state.OperationWorkMode!=2&&this.state.OperationWorkMode!==undefined){workTime=workTime2};//其他运行烹饪模式显示正计时
           if(this.state.status==1&&(this.state.workIndex!=0||this.state.workIndex!=undefined)&&this.state.FuntionSelect!=1&&this.state.FuntionSelect!=2){workTime=workTime2};//控制其他烹饪模式显示的正计时
           if(this.state.status==1&&(this.state.workIndex==0||this.state.workIndex==undefined)){workTime=workTime3};//控制模式下蒸饭模式显示的时间
           textMessage=(this.state.status==0&&this.state.OperationWorkMode==null&&this.state.FuntionSelect==0)? contentArr1[0] : textMessage3;
           bgStyle=bgStyle1;
           if(this.state.FuntionSelect==1||this.state.FuntionSelect==2) textMessage=textMessage2;bgStyle=runColorArr[this.state.OperationWorkMode||this.state.FuntionSelect]
          
		}
	    if(this.state.PresetSet==0&&this.state.OperationWorkMode==5&&(this.state.FuntionSelect==0||this.state.FuntionSelect==undefined)){textMessage='待机';
           bgStyle={background:'#59b30f'};workTime=workTime4;workStyle="";}//防止从APP首页进入index页造成UI渲染混乱
       if(this.state.status==0&&(this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)){workStyle=workStyle2};//选择保温、清洗模式
       if((this.state.contentIndex==2||this.state.contentIndex==3)&&this.state.FuntionSelect!=0&&this.state.OperationWorkMode!=0){
       	  textMessage=(this.state.FuntionSelect==1||this.state.FuntionSelect==2) ? textMessage2 : textMessage3;
       }
       if(this.state.status==0&&this.state.FuntionSelect!=0&&this.state.FuntionSelect!=null&&this.state.FuntionSelect!=2&&this.state.PresetSet!=1){textMessage=textMessage2;workTime=workTime2}//硬件控制APP运行渲染
       if(this.state.status==1&&(this.state.FuntionSelect==1||this.state.FuntionSelect==2)){workStyle=workStyle1};//选择保温、清洗模式
       if(this.state.OperationWorkMode==0&&this.state.FuntionSelect==0){workStyle=workStyle2;bgStyle=bgStyle1;textMessage=textMessage3};//清洗模式完毕后进入待机模式 
       if(this.state.OperationWorkMode==0&&this.state.FuntionSelect==0&&this.state.status==1){workStyle=workStyle2;bgStyle=bgStyle1;textMessage=textMessage3};//避免客户进入pattern模式后回退到首页引起的页面混乱
       if((this.state.OperationWorkMode==1||this.state.FuntionSelect==1)||(this.state.contentIndex==2&&this.state.FuntionSelect==1)) {workTime=workTime2};//保温模式下显示的计时;
       if(this.state.status==1&&this.state.FuntionSelect==1){workTime=workTime2};//保温模式下显示的计时;
       if(this.state.status==1&&this.state.FuntionSelect==2){workTime=workTime4};//清洗模式下不显示计时；
       if(this.state.status==1&&this.state.OperationWorkMode==0&&this.state.FuntionSelect==0) {workTime=workTime4;}//烹饪模式回到待机状态;
       if(this.state.status==1&&this.state.FuntionSelect!=1&&this.state.FuntionSelect!=2&&this.state.FuntionSelect!=0&&this.state.PresetSet==0){textMessage='烹饪中';workStyle=workStyle3; bgStyle={background:'blue'}}//运行清洗完模式后直接控制数据进入烹饪模式

        // if(this.state.OperationWorkMode==null&&this.state.status==0) workStyle=workStyle1;
        // if(this.state.status==0&&this.state.OperationWorkMode!=null) workStyle=workStyle2;
        // if(this.state.status==1&&this.state.OperationWorkMode==null) workStyle=workStyle3; 
    	// if(this.state.status==1&&(this.state.workIndex!=2||this.state.workIndex!=undefined))workTime=workTime3;
     //    if((this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)&&this.state.status==0) workTime='';//待机模式下不显示时间;
     //   if(this.state.status==1&&this.state.contentIndex==1&&(this.state.workIndex!=2&&this.state.workIndex!=undefined))workTime=workTime4;//设置其它烹饪模式不显示烹饪倒计时
     //    if(this.state.status==0&&this.state.OperationWorkMode==5) workTime=workTime3;//运行蒸饭模式显示的时间；
     //    if(this.state.OperationWorkMode==1||this.state.contentIndex==2) workTime=workTime2;//保温模式下显示的计时;
     //    if(this.state.OperationWorkMode==2||this.state.contentIndex==3) workTime=workTime4;//清洗工作模式不显示时间;
     //    if(this.state.OperationWorkMode!=0&&this.state.OperationWorkMode!=5&&this.state.OperationWorkMode!=null&&this.state.status==0&&this.state.OperationWorkMode!=1) workTime=workTime4;
       let Case1=this.state.FuntionSelect==2;
       let Case2=this.state.OperationWorkMode==2;
       let Case=Case1||Case2;
    	
        return (
          <div className="app-body">
            <section className='banner-bg'>
            	<img src='../static/img/cooker-bg.jpg' />
            	 <p className={this.state.online ==2?'tip-titles':'tip-title'} style={bgStyle}>{textMessage}
            	 </p>
            </section>
           <div style={{display:(this.state.online==2 ? 'none' :'block')}}> 
            <div className="content">
            {workStyle}{Case ? <img className='cleaning' src='../static/img/cleaningImage.gif'/> : ''}
            {workTime}</div>	
           	<Selector changeIndex={this.changeIndex} contentIndex={this.state.contentIndex} OperationWorkMode={this.state.OperationWorkMode} FuntionSelect={this.state.FuntionSelect} status={this.state.status}/>
            </div>
            <div className={this.state.online ==2?'unline':'unlines'}>
                    <span className='unline-bg'></span>
                    <p>主人，您的蒸饭煲不在线哦~！</p>
                </div>
           </div>
            )

    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Router path="/pattern" component={Pattern} />
        </Router>
    ), document.getElementById('ROOT'));
});