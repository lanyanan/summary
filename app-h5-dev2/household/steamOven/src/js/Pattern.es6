'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {OrderTime} from './OrderTime.es6'
import {ModeSelect} from './ModeSelect.es6'
import {ReSet} from './reSet.es6'

het.repaint((data) => {
    Actions.repaint(data);
});
export class  Pattern extends BaseComponent{
    constructor(props) {
       
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
        	 addMode:0,//默认进来没有选中烘焙模式
        	 showTime:false,//默认不显示预约选择时间组件
        	 showMode:false,//默认不显示选择模式组件
           index:3,//默认选中第三种工作模式来改变温度选择的间隔
           deleteIndex:0,//默认不删除模式
           timeList:[],//用来保存设置好的时间
           temList:[],//用来保存设置好的温度
           modeList:[],//用来保存设置好的模式
           showSet:false,//默认不显示重新修改模式的时间和温度组件  
           setMode:0,//默认不重新修改模式的时间和温度
           defaultindex:3,//默认蒸汽模式的温度
           headerTop: isAndroid?73:63,
           changeDefault:false,//默认不更新数组
           rechangeDefault:false,
           saveMode:false,//默认不保存到自定义模式   

            };
       het.setTitle(JSON.stringify({setNavTitle:1,title:'烘焙模式',setNavRightBtnHiden:1})); 
 	     this.listenStore(Store); // 监听Store
  	   this.chooseTime=this.chooseTime.bind(this);//选择预约时间
  	   this.cancelclock=this.cancelclock.bind(this);
       this.cancelclock1=this.cancelclock1.bind(this);
       this.cancelclock2=this.cancelclock2.bind(this);
  	   this.chooseMode=this.chooseMode.bind(this);//选择工作模式
       this.submitIndex=this.submitIndex.bind(this);
       this.modeChoose=this.modeChoose.bind(this);
       this.deleteHandler=this.deleteHandler.bind(this);
       this.setList=this.setList.bind(this);
       this.resetList=this.resetList.bind(this);
       this.orderTime=this.orderTime.bind(this);//预约烘焙时间
       this.changSet=this.changSet.bind(this);//修改温度和时间
       this.startWoking=this.startWoking.bind(this);//启动工作模式
       this.changeDefault=this.changeDefault.bind(this);
       this.savePattern=this.savePattern.bind(this);//保存为自定义模式
       this.writename=this.writename.bind(this);
       this.controlDefault=this.controlDefault.bind(this);
       this.control=this.control.bind(this);
       this.componentWillMount=this.componentWillMount.bind(this);
       
    }
     componentWillMount(){
      Actions.modeData();

     }

     control(){
       this.setState({rechangeDefault:false})
     }
     controlDefault(){
      this.setState({changeDefault:false});
     }
     chooseTime(){
     	this.setState({showTime:true});
     }
     changSet(e){
          e.preventDefault();
         let type = e.currentTarget.getAttribute('data-type');
         // let newTemArr=this.state.temList;
         // let newTimeList=this.state.timeList;
         // newTemArr.splice(type-1,1,this.state.temperature);
         // newTimeList.splice(type-1,1,this.state.time);
        this.setState({setMode:type,showSet:true,rechangeDefault:true});
        
    }
    resetList(temperature,time){
          let newTemArr=this.state.temList;
          let newTimeList=this.state.timeList;
          let index=this.state.setMode-1;
          newTemArr.splice(index,1,temperature);
          newTimeList.splice(index,1,time);
          this.setState({temList:newTemArr,timeList:newTimeList});
          Actions.selectTime(temperature,time);
    }
     cancelclock(){
      this.setState({showTime:false});
   }
     cancelclock1(){
        this.setState({showMode:false});
     }
     cancelclock2(){
         this.setState({showSet:false});
     }
   	 chooseMode(){

   	 	this.setState({showMode:true,deleteIndex:0});

   	 }
     submitIndex(item){
        this.setState({index:item});
       
     }
     workingTime(h,m){
        Actions.selectTime(h,m);
        
        }
    orderTime(h,m){
        Actions.orderTime(h,m);
    }
     modeChoose(value){
        this.setState({addMode:value});

     }
     deleteHandler(e){
         e.preventDefault();
         let type = e.currentTarget.getAttribute('data-type');
         if(type==1){
              if(this.state.modeList.length==1){
              let newModeArr=this.state.modeList;
              let newTemArr=this.state.temList;
              let newTimeList=this.state.timeList;
              newModeArr.splice(0,1);
              newTemArr.splice(0,1);
              newTimeList.splice(0,1);
              this.setState({deleteIndex:0,addMode:0,modeList: newModeArr,temList:newTemArr,timeList:newTimeList});
           }
             if(this.state.modeList.length==2){
                 let newModeArr=this.state.modeList;
                let newTemArr=this.state.temList;
                let newTimeList=this.state.timeList;
                newModeArr.splice(0,1);
               newTemArr.splice(0,1);
               newTimeList.splice(0,1);
              this.setState({deleteIndex:0,addMode:1,modeList: newModeArr,temList:newTemArr,timeList:newTimeList});
             }
           if(this.state.modeList.length==3){
              let newModeArr=this.state.modeList;
              let newTemArr=this.state.temList;
              let newTimeList=this.state.timeList;
              newModeArr.splice(0,1);
              newTemArr.splice(0,1);
              newTimeList.splice(0,1);
              this.setState({deleteIndex:0,addMode:2,modeList: newModeArr,temList:newTemArr,timeList:newTimeList});
           }
           
         }
         
         else {
         let newModeArr=this.state.modeList;
         let newTemArr=this.state.temList;
         let newTimeList=this.state.timeList;
         newModeArr.splice(type-1,1);
         newTemArr.splice(type-1,1);
         newTimeList.splice(type-1,1);
         let mode=this.state.addMode-1;
         this.setState({deleteIndex:type,addMode:mode,modeList: newModeArr,temList:newTemArr,timeList:newTimeList});
         }
     } 
     setList(index,temperature,time){
        let newModeArr=this.state.modeList;
        let newTemArr=this.state.temList;
        let newTimeList=this.state.timeList;
        // if(index==this.state.modeList[this.state.modeList.length-1]){let addMode=this.state.addMode;this.setState({addMode:addMode})};
        newModeArr.push(index);
        newTemArr.push(temperature);
        newTimeList.push(time);
        this.setState({modeList:newModeArr,temList:newTemArr,timeList:newTimeList});
     } 
     startWoking(e){
         e.stopPropagation();
         e.preventDefault();
         let mode1=this.state.modeList[0];
         let mode2=this.state.modeList[1];
         let mode3=this.state.modeList[2];
         let textNode=this.refs.nameValue;
         let value=textNode.value;
        if((mode1==mode2&&(mode1!=0&&mode1!=undefined))||(mode2==mode3&&(mode2!=undefined)&&mode2!=0)){het.toast('不能连续叠加两个相同的模式');return;}

        if(this.state.modeList.length>0&&((mode1!=mode2)||(mode2!=mode3)))
        {
         
         if(this.state.saveMode&&value!=''){
           history.go(-1);
           Actions.saveMode(this.state.modeList,this.state.temList,this.state.timeList,value);
           this.setState({saveMode:false})
          }
          if(this.state.saveMode&&value==''){het.toast('请输入自定义名称')}
          else{ 
           history.go(-1);
           let orderHour=this.state.orderHour===undefined ? 0 :this.state.orderHour;
           let orderMinute=this.state.orderMinute===undefined ? 0 :this.state.orderMinute; 
           Actions.workStyle(this.state.modeList,this.state.temList,this.state.timeList,orderHour,orderMinute);
           } 
         

        }
        
       
     } 
     changeDefault(newindex){
       
      if(newindex!==this.state.defaultindex){this.setState({changeDefault:true})}  
        this.setState({defaultindex:newindex});
     }
     savePattern(){
       if(this.state.modeList.length>0&&this.state.modedata<10){
        let nowSave=!this.state.saveMode;
        this.setState({saveMode:nowSave})
        }
        
     }
     writename(){
       let textNode=this.refs.nameValue;
       let value=textNode.value;
       if(value.length>10){
        het.toast('命名长度不能超过10个字符串') 
       value =value.substring(0,10);
       textNode=value.substring(0,10);
       }
     
     }
 	  render(){
       
        let setMode=this.state.setMode;
        let textIndex=this.state.modeList[setMode-1];
        let timeText=this.state.orderHour==undefined&&this.state.orderMinute==undefined ?'--:--' :this.state.orderHour+':'+this.state.orderMinute;
        let houstepArr=['5','10','10','10','11','11','11','11','11','11','11','11','11'];
        let hourstep=houstepArr[this.state.defaultindex-1];
        let imgArr=['icon1.png','icon4.png','icon2.png','icon5.png','icon3.png','icon6.png'];
        let items=['firstMode4.png','secondMode4.png','thirdMode4.png','fourMode4.png','fiveMode4.png','sixMode4.png','sevenMode4.png','eightMode4.png','nineMode4.png','tenMode4.png','elevenMode4.png','twelveMode4.png'];
        let workArr=['蒸汽模式','顶部蒸烤组合','后部热风蒸组合','后部热风','顶部热风','顶部烧烤','顶部单管热风','顶部单管烤','发酵', '保温','解冻','杀菌'];
        let mode1=this.state.modeList[0];
        let mode2=this.state.modeList[1]
        let mode3=this.state.modeList[2]
        let workText1=workArr[mode1-1];
        let workText2=workArr[mode2-1];
        let workText3=workArr[mode3-1];
        let modeSrc1='../static/img/'+items[mode1-1];
        let modeSrc2='../static/img/'+items[mode2-1];
        let modeSrc3='../static/img/'+items[mode3-1];
        let iconSrc1='../static/img/'+imgArr[1];
        let iconSrc2='../static/img/'+imgArr[3];
        let iconSrc3='../static/img/'+imgArr[5];
        let Hour,Minute;
        let timeLength=this.state.timeList.length;
        let modeText=workArr[textIndex-1];
        let defaulthourArr=[100,180,180,180,180,180,180,180,40,60,60,100];
        let defaulthour=defaulthourArr[this.state.defaultindex-1];
        let hourArr1=[80,85,90,95,100,105,110,115];
        let hourArr2=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        let hourArr3=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        let hourArr4=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        // let hourArr5=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        // let hourArr6=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        // let hourArr7=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        // let hourArr8=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
        let hourArr5=[40,51,62,73,84,95,106,117,128,139,150,161,172,180,183,194,205,216,227,238,249];
        let hourArr6=[40,51,62,73,84,95,106,117,128,139,150,161,172,180,183,194,205,216,227,238,249];
        let hourArr7=[40,51,62,73,84,95,106,117,128,139,150,161,172,180,183,194,205,216,227,238,249];
        let hourArr8=[40,51,62,73,84,95,106,117,128,139,150,161,172,180,183,194,205,216,227,238,249];
        let hourArr9=[40];
        let hourArr10=[60];
        let hourArr11=[60];
        let hourArr12=[100];
        let hourArr=[hourArr1,hourArr2,hourArr3,hourArr4,hourArr5,hourArr6,hourArr7,hourArr8,hourArr9,hourArr10,hourArr11,hourArr12];
        let hourarr=hourArr[this.state.defaultindex-1];
        let firstHourArr=hourArr[this.state.modeList[this.state.setMode-1]-1];
        let addSrc=['button_disabled.png','button_normal.png'];
        let addSrc1=this.state.addMode==0 ?'../static/img/'+addSrc[1] :'../static/img/'+addSrc[0];
        let addSrc2=this.state.addMode==1 ?'../static/img/'+addSrc[1] :'../static/img/'+addSrc[0];
        let addSrc3=this.state.addMode==2 ?'../static/img/'+addSrc[1] :'../static/img/'+addSrc[0];
        let rdefaultminute=this.state.timeList[this.state.setMode-1];
        let rdefaulthour=this.state.temList[this.state.setMode-1];
        let hourarr1=hourArr[this.state.modeList[this.state.setMode-1]-1];
        let buttonArr=['button_off.png','button_on.png'];
        let buttonIndex=this.state.modeList.length>0&&this.state.saveMode==true ? 1 : 0 ;
        let buttonSrc='../static/img/'+buttonArr[buttonIndex];
         
         switch (this.state.timeList.length) {
            case 0:
                Hour=0;
               Minute=0;
                break;
            case 1:
             Hour=parseInt(parseInt(this.state.timeList[0])/60);
             Minute=this.state.timeList[0]%60;
                break;
            case 2:
                 Hour=parseInt((parseInt(this.state.timeList[0])+parseInt(this.state.timeList[1]))/60);
                 Minute=(parseInt(this.state.timeList[0])+parseInt(this.state.timeList[1]))%60;
                break;
             case 3:
                Hour=parseInt((parseInt(this.state.timeList[0])+parseInt(this.state.timeList[1])+parseInt(this.state.timeList[2]))/60);
                Minute=(parseInt(this.state.timeList[0])+parseInt(this.state.timeList[1])+parseInt(this.state.timeList[2]))%60;
                break;
             default:
               
                break; 
            }
       
        return(
        	  <div className='pattenStyle'>
                <div style={{height:this.state.headerTop,width:'100%',backgroundColor:'#2A2C35',position:'fixed',left:0,top:0,zIndex:99999}}></div>
        	  	<section className='modeChoose' style={{marginTop:this.state.headerTop}}>

        	  	  <ul>	
        	  		<li className='modeList'>
                      <section style={{display:this.state.addMode==0||this.state.deleteIndex==1 ? '' :'none'}}>
        	  			<div className='beginChoose'><img src='../static/img/icon1.png'/></div>
        	  			<div className='addButton' >
        	  				<img src={addSrc1} onTouchEnd={this.chooseMode}/>
        	  			</div>
                       </section> 
        	  			<div className='workMode' style={{display:this.state.addMode==0||this.state.deleteIndex==1 ? 'none' : ''}}>
                        
                           <div className='beginChoose'><img src={iconSrc1}/></div>
                           <div className='selectMode' data-type='1'  onTouchEnd={this.changSet}> 
        	  				<img src={modeSrc1}/>
                           </div> 
        	  		  	 	<p>
        	  					<span>{workText1}</span>
        	  					<span>{this.state.temList[0]}℃/{this.state.timeList[0]}分钟 </span>
        	  		   		</p>
                        
                            <div className='delete'  data-type='1' onTouchEnd={this.deleteHandler}><img src='../static/img/button_delete.png'/></div> 	
        	  			</div>	
        	  		</li>
        	  		<li className='modeList'>
                        <section style={{display:(this.state.addMode==2&&this.state.deleteIndex!==2)||(this.state.addMode==3&&this.state.deleteIndex!==2) ? 'none' :''}} >
        	  			<div className='beginChoose'><img src='../static/img/icon2.png'/></div>
        	  			<div className='addButton' >
        	  				<img src={addSrc2} onTouchEnd={this.state.addMode==1?this.chooseMode :''}/>
        	  			</div>
                        </section>
        	  			<div className='workMode' style={{display:(this.state.addMode==2&&this.state.deleteIndex!==2)||(this.state.addMode==3&&this.state.deleteIndex!==2) ? '' : 'none'}} >
                           <div className='beginChoose'><img src={iconSrc2}/></div>
                           <div className='selectMode' data-type='2'  onTouchEnd={this.changSet}> 
                            <img src={modeSrc2}/>
                           </div> 
                            <p>
                                <span>{workText2}</span>
                                <span>{this.state.temList[1]}℃/{this.state.timeList[1]}分钟 </span>
                            </p>
                            <div className='delete' data-type='2' onTouchEnd={this.deleteHandler}><img src='../static/img/button_delete.png'/></div>  
                        </div>  
        	  		</li>
        	  		<li className='modeList'>
                        <section style={{display:(this.state.addMode==3&&this.state.deleteIndex!==3) ? 'none' :''}} >
        	  			<div className='beginChoose'><img src='../static/img/icon3.png'/></div>
        	  			<div className='addButton'>
        	  				<img src={addSrc3}  onTouchEnd={this.state.addMode==2 ?this.chooseMode :''}/>
        	  			</div>
                        </section>
        	  			<div className='workMode' style={{display:(this.state.addMode==3&&this.state.deleteIndex!==3) ? '' : 'none'}} >
                           <div className='beginChoose'><img src={iconSrc3}/></div>
                           <div className='selectMode' data-type='3'  onTouchEnd={this.changSet}> 
                            <img src={modeSrc3}/>
                           </div> 
                            <p>
                                <span>{workText3}</span>
                                <span>{this.state.temList[2]}℃/{this.state.timeList[2]}分钟 </span>
                            </p>
                            <div className='delete' data-type='3' onTouchEnd={this.deleteHandler}><img src='../static/img/button_delete.png'/></div>  
                        </div>  
        	  		</li>
        	  	   </ul>						
        	  
        	  	</section>
              <div className='totalTime'>
              <span className='note'>模式叠加形式不能为'AA'</span>
        	  	<span className='note-information'>总耗时:{Hour}小时{Minute}分钟</span>
              </div>
        	  	<div className='order-text' onTouchEnd={this.chooseTime}>
        	  		<span>预约时间</span>
                    <span>{timeText}</span>
        	  		<img src='../static/img/button_back.png'/>
        	  	</div>
        	  	<div className='savePattern'>
        	  		<p className='saveText'>
        	  	      <span>保存为 "自定义" 模式</span>
        	  	      <span>烘焙结束后自动保存,最多可保存10个</span>
        	  	 	</p>
        	  	 	<img src={buttonSrc} onTouchEnd={this.savePattern}/>
        	  	</div>
             
              <input type='text' placeholder='请输入自定义名称' className='changename' ref='nameValue' maxLength='10' onChange={this.writename} style={{display:this.state.saveMode?'':'none'}}/>
        	  	<div className='blankSpace'></div>
        	  	<div className='startMode' style={{backgroundColor:this.state.modeList.length>0 ?'#f9661d':'#9c9cA1'}}onTouchEnd={this.startWoking}>启动</div>
     	        <OrderTime show={this.state.showTime} hourshow={true} cancelClock={this.cancelclock} submitClock={this.orderTime} maxhour={23} minhour={0} minutestep={5}/>
              <ReSet show={this.state.showSet} hourshow={true} cancelClock={this.cancelclock2}  hourarr={firstHourArr}  hourstep={hourstep}  resetList={this.resetList} title={modeText} defaultminute={rdefaultminute}  defaulthour={rdefaulthour}   arrayInit={this.state.rechangeDefault} control={this.control}/>
        	  	<ModeSelect show={this.state.showMode} hourshow={true} cancelClock={this.cancelclock1} hourarr={hourarr} hourstep={hourstep} submitIndex={this.submitIndex} wokingTime={this.workingTime} addMode={this.state.addMode} modeChoose={this.modeChoose}  setList={this.setList} defaultminute={'20'} changeDefault={this.changeDefault} defaulthour={defaulthour} arrayInit={this.state.changeDefault}  modeList={this.state.modeList} controlDefault={this.controlDefault}/>
        	  </div>
        	)	




 	     }

 
 }