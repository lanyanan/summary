'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Taste} from './Taste.es6';
import{TimeSelect} from './TimeSelect.es6';
import {Store} from './Store.es6';

export class  Pattern extends BaseComponent{
    constructor(props) {
       
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
        	status:0,//默认为蒸饭模式	
 	    	bgColor:false, //默认不透明
 	    	timeSlect:false, //默认不弹出时间选择框
 	    	taste:2,
 	    	workIndex:0,
 	    	hourIndex:0,
 	    	minuteIndex:0,
 	    	headerTop: isAndroid?73:63
 	    	};
       this.listenStore(Store); // 监听Store
       this.submitClock = function(h,m){
            Actions.selectTime(h,m);
        };
       // this.cancelClock = function(){
       		 
       //      Actions.clockSwitch(3,'cancel');
       //  };
  //      this.canceltasteClock=function(){
		// 	Actions.tasteSwitch(2);
		// };
	  this.submittasteClock=function(b){
 			Actions.tasteChoose(b);
 		};
 	  het.setTitle(JSON.stringify({setNavTitle:1,title:'模式',setNavRightBtnHiden:1})); 



      }
     changeImage(i){
	       this.setState({status:i})
	       Actions.workStyle(i);
 	    }
 	 changeTaste(index){
 	    	this.setState({taste:index});
	    }

	changeClick(){
		if(this.state.status==0){
 	    	let newSelect=!this.state.timeSlect;
 	    	this.setState({timeSlect:newSelect});
 	    	}
 	    	/*console.log(1111);*/
 	     }
 	changeTime(index1,index2){
	    	this.setState({hourIndex:index1,minuteIndex:index2});
	    }
  	modeStart(){

  		   //location.href="#/";
  		    history.back();
  		   let isTrue=this.state.hour==undefined&&this.state.minute==undefined;
  		 	if(isTrue){
 	    		let workIndex=this.state.workIndex ? this.state.workIndex : 0;
 	    	 		if(this.state.status==0){
 	    	  			let tasteIndex=this.state.tasteIndex==undefined ? 3 : this.state.tasteIndex+1;	
 	    	  			Actions.modeStart(this.state.workIndex+5,tasteIndex);//蒸饭烹饪模式选择口感
 	    				
 	    			   }
 	    			 if(this.state.status==2){
 	    			 	Actions.modeStart(this.state.workIndex+1,0);
 	    			 	
 	    			  } 
 	    			  else if(this.state.status!=0&&this.state.status!=2){
 	    			  		Actions.modeStart(this.state.workIndex+3,0);//其他烹饪模式
 	    			  	}
 	    			} 
 	    	  else{
 	    		let workIndex=this.state.workIndex ? this.state.workIndex : 0;
 	    		let hour=this.state.hour;
 	    		let minute1=(this.state.hour==24) ? '00' : this.state.minute;
 	    		let minute=this.state.minute==undefined ? '00' : minute1;
 	    		let tasteIndex=this.state.tasteIndex==undefined ? 3 : this.state.tasteIndex+1;
 	    		   if(this.state.status==0){
 	    		  	Actions.willStart(hour,minute,workIndex+5,tasteIndex);//蒸饭模式的预约
 	    		  }
 	    		   if(this.state.status==2){
 	    			 	Actions.modeStart(this.state.workIndex+1,0);
 	    			 	
 	    			  } 
 	    			  else if(this.state.status!=0&&this.state.status!=2){
 	    			  		Actions.modeStart(this.state.workIndex+3,0);//其他烹饪模式
 	    			  	}

 	    		}
		}
 	 
	 handlerClick(){
 	    	if(this.state.status==0){ 	    	
 	    	let newColor=!this.state.bgColor; 	    	
 	    	this.setState({bgColor:newColor});//只有蒸饭模式下口感选项及预约时间项才可选
	    	}
 	    }

 	     render(){
 	  
 	     	let items = [{
	    			src1:'fan.png',
	    			src2:'selected-fan.png',
					text:"蒸饭",
					Statue1:true,
					Statue2:false

	    		},{
	    			src1:'meat.png',
	    			src2:'selected-meat.png',
					text:"蒸肉",
					Statue1:true,
					Statue2:false

	    		},{
	    			src1:'fishing.png',
	    			src2:'selected-fishing.png',
	    			text:"蒸鱼",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'tudou.png',
	    			src2:'selected-tudou.png',
	    			text:"蒸土豆",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'ricer.png',
	    			src2:'selected-ricer.png',
	    			text:"热饭",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'baozi.png',
	    			src2:'selected-baozi.png',
	    			text:'蒸包子',
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'mantou.png',
	    			src2:'selected-mantou.png',
	    			text:"蒸馒头",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'corn.png',
	    			src2:'selected-corn.png',
	    			text:"蒸玉米",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'potato.png',
	    			src2:'selected-potato.png',
	    			text:'蒸红薯',
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'cake.png',
	    			src2:'selected-cake.png',
	    			text:"蒸糕点",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'xie.png',
	    			src2:'selected-xie.png',
	    			text:"蟹类",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'fish.png',
	    			src2:'selected-fish.png',
	    			text:"虾类",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'shell.png',
	    			src2:'selected-shell.png',
	    			text:"贝类",
	    			Statue1:true,
	    			Statue2:false
	    		},{
	    			src1:'egg.png',
	    			src2:'selected-egg.png',
	    			text:"蒸蛋",
	    			Statue1:true,
	    			Statue2:false
	    		}];

        	var Items=items.map(function(item,index){
        		    let src =  item.src1; 
        		    let startStatus=item.Statue2;
                    if(index==this.state.status) {
                    	src =  item.src2 ;
                    	startStatus=item.Statue1;
                    };        		    
        		    let imgSrc = '../static/img/'+ src;
        			return(
        					<li className="list-item" onTouchEnd = {this.changeImage.bind(this,index)}>
        					<img src={imgSrc} />
        					<span className={""+(startStatus ? "span-active" : "")}>{item.text}</span>
        					</li>
        				)
        		}.bind(this));
	        let ulStyle = this.state.bgColor?{background:'rgba(0,0,0,0.3)'}:null||this.state.timeSlect ?{background:'rgba(0,0,0,0.3)'}:null ;
        	let taste = ['软','偏软','适中','偏硬','硬'] ;
        	let hour=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
        	let minute=['00','30'];
        	let tasteStyle=this.state.status==0 ? {color:'#555555'} :{color:'#c7c7c7'};
        	let chooseStyle=this.state.status==0 ? {color:'#838383'} :{color:'#c7c7c7'};
        	//let startTime1='-- --';
        	let startTime='立即启动';
        	let HourIndex=this.state.hourIndex;
        	let MinuteIndex=this.state.hourIndex==23 ? 0 :this.state.minuteIndex;
        	//let startTime=(this.state.hour==0&&this.state.minute==0) ? startTime2 : startTime1;
			//let timeInformation='预约'+hour[HourIndex]+'时'+minute[MinuteIndex]+'分';
        	let timeInformation='预约'+this.state.hour+'时'+ (this.state.minute==0 ? '00' : this.state.minute)+'分';
        	let tasteInformation=this.state.tasteIndex===undefined ? '适中': taste[this.state.tasteIndex];


        return(
        	  <div>
        	    <div style={{height:this.state.headerTop,width:'100%',backgroundColor:'rgb(50,133,255)'}}></div>
        		<div className="pattern-page">
             	 <ul className="pattern-list" style={ulStyle} >{Items}</ul>
 				<section style={{display:(this.state.bgColor==true||this.state.timeSlect==true ? 'none' :'block')}}>
             	 <div>
             	 	<a href="javascript:void(0)" onTouchEnd={this.handlerClick.bind(this)} className="taste-choice" >
             	 	<span style={tasteStyle}>口感</span>
             	 	<span style={chooseStyle}>{tasteInformation}</span>
             	 	<img src='../static/img/patten-change.png'/>
             	 	</a>
             	 	</div>
             	 <div>
             	 	<a href="javascript:void(0)" onTouchEnd={this.changeClick.bind(this)} className="taste-choice">
             	 	<span style={tasteStyle}>预约时间</span>
         			<span style={chooseStyle}>
         			 {(this.state.hour===undefined&&this.state.minute===undefined) ? startTime :timeInformation}
         			 </span>
             	 	<img src='../static/img/patten-change.png'/>
             	 	</a>
            	 </div>
             	 <div className="blank-space"></div>
             	 <div className="pattern-footer">
             	 <a className="start-work" onTouchEnd={this.modeStart.bind(this)}>启动</a>
             	 </div>
             	 </section>
             	 	<div style={{display:(this.state.bgColor==true ? 'block' :'none')}}>
            	 	
 						<Taste changeTaste={this.changeTaste.bind(this)} handlerClick={this.handlerClick.bind(this)}  submittasteClock={this.submittasteClock} />
             	 	</div>
             	 	<div style={{display:(this.state.timeSlect==true ? 'block' :'none')}}>
             	 		<TimeSelect changeTime={this.changeTime.bind(this)} changeClick={this.changeClick.bind(this)}  submitClock={this.submitClock} minutearr= {['00','30']} hourIndex={this.state.hourIndex} minuteIndex={this.state.minuteIndex}/>
            	 	</div>             	
            	 </div> 
               </div>


        	)	




 	     }

 
 }