'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';


import {Store} from './Store.es6';
import {Toast} from './Toast.es6';
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

export class  Define extends BaseComponent{
    constructor(props) {
       
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
        		showToast:false,//默认不显示重名名提示框
        	  showDelete:false,//默认不显示删除提示框
        		headerTop: isAndroid?73:63,
            modeArr:[],
            deleteId:0,//删除或重命名的模式标志
            deleteIndex:0,//删除的模式下标
 	    	};
 	     this.listenStore(Store); // 监听Store
      
  	   this.handerClick=this.handerClick.bind(this);
  	   this.closeToast=this.closeToast.bind(this);
       this.componentWillMount=this.componentWillMount.bind(this);
  	   this.deleteHandler=this.deleteHandler.bind(this);
       // this.deletePattern=this.deletePattern.bind(this);//提交给后台删除自定义模式事件;
       this.begainWork=this.begainWork.bind(this);//启动工作模式
       this.componentWillUpdate=this.componentWillUpdate.bind(this);
  	   het.setTitle(JSON.stringify({setNavTitle:1,title:'自定义模式',setNavRightBtnHiden:1})); 
      }
      componentWillMount() {
           Actions.modeData();
           Actions.pullData();
      }
   componentWillUpdate(nextProps,nextState){
        if(this.state.rePull!=0&&nextState.rePull===0){
          Actions.pullData();
          Actions.modeData();
        };
    }
      handerClick(e){
        e.preventDefault();
        e.stopPropagation();
        let type = e.currentTarget.getAttribute('data-type');
         let type1= e.currentTarget.getAttribute('data-type1');
      	this.setState({showToast:true,deleteId:type,deleteIndex:type1});
       }
      closeToast(){
      	this.setState({showToast:false,showDelete:false});
      }
      deleteHandler(e){
        e.preventDefault();
        e.stopPropagation();
        let type = e.currentTarget.getAttribute('data-type');
        let type1= e.currentTarget.getAttribute('data-type1');
        this.setState({showDelete:true,deleteId:type,deleteIndex:type1});       
      }
      // deletePattern(){
      //   let mode=this.state.deleteId;
      //    Actions.deleteMode(mode);
      //    // Actions.modeData();
      //    // Actions.pullData();
      // }
     
    begainWork(e){
      e.preventDefault();
      if(this.state.Mode===undefined)return;
      if(this.state.Mode)return;
      let type = e.currentTarget.getAttribute('data-type'); 
      let modeArr=this.state.modeArr[type].modeStepList;
      Actions.begainWork(modeArr);
      history.go(-1);
       
     }
 	     render(){
        
        let deleteMode=this.state.modeArr;
        let index=this.state.deleteIndex;
        let deletText = (deleteMode[index] || {modeName:""}).modeName;
        // console.log(index,deletText)
        let imgArr=['firstMode4.png','secondMode4.png','thirdMode4.png','fourMode4.png','fiveMode4.png','sixMode4.png','sevenMode4.png','eightMode4.png','nineMode4.png','tenMode4.png','elevenMode4.png','twelveMode4.png'];
        let workArr=['蒸汽模式','顶部蒸烤组合','后部热风蒸组合','后部热风','顶部热风','顶部烧烤','顶部单管热风','顶部单管烤','发酵', '保温','解冻','杀菌'];
 	  		let imgSrc='../static/img/';
        let startArr=['start.png','un-start.png'];
        let startSrc='../static/img/'+startArr[this.state.Mode==0 ? 0 : 1];
       
        return(

 	     		<div className='defineStyle'>
 	     		     <div style={{height:this.state.headerTop,width:'100%',backgroundColor:'#2A2C35',position:'fixed',left:0,top:0,zIndex:99999}}></div>
        	  	 <div className='noteText' style={{display:this.state.modedata==0?'':'none'}}>你需要到 '烘焙模式' 页面保存 '自定义' 模式哦</div>
               <div style={{display:this.state.modeArr.length==0&&this.state.rePull!=0 ?'':'none',marginTop:this.state.headerTop}} className='loading'>
                  <img src='../static/img/loading.gif'/>
                  <span style={{display:'block',margin:'0 auto',fontSize:'14px'}}>加载中</span>
               </div>
              <section style={{display:this.state.modedata ?'' : 'none',marginTop:(this.state.headerTop+24)+'px'}}  >
        	   {this.state.modeArr.map(function(id,index){
        	  	  return(		
        	  		 <div key={index}>	
        	  			<section className='modeArea'>
        	  				<p className='modeName'>{id.modeName}</p>
                     <div className='modeLine'>
                    {id.modeStepList.map(function(mode,index){
                      return(
                     
                          <div className='modeStyle' key={index}>
                          <p><img src={imgSrc+imgArr[mode.modeType-1]}/></p>
                          <p>
                              <span>{workArr[mode.modeType-1]}</span>
                              <span>{mode.temp}℃/{mode.minutes}分钟</span>
                          </p>
                         
                     </div>)}.bind(this))}
                     </div>
        	  	  </section>
        	  		<div className='controlMode'>
        	  				<div onTouchEnd={this.deleteHandler} data-type={id.modeId} data-type1={index}>
        	  					<img src='../static/img/delete.png'/>
        	  					<span>删除</span>
        	  				</div>
        	  				<div onTouchEnd={this.handerClick} data-type={id.modeId} data-type1={index}>
        	  					<img src='../static/img/rename.png'/>
        	  					<span>重命名</span>
        	  			   </div>
        	  				<div onTouchEnd={this.begainWork} data-type={index} >
        	  					<img src={startSrc}/>
        	  					<span style={{color:this.state.Mode==0? '#303030': '#ababab'}}>启动</span>
        	  				</div>
        	  			</div>
        	  		 <div className='blank'></div>
        	  	  </div>)}.bind(this))}	
              </section>

        	  	<div className='mask' style={{display:this.state.showDelete==true || this.state.showToast==true ? '': 'none'}}></div>
        	  	<Toast closeToast={this.closeToast} showToast={this.state.showToast} showDelete={this.state.showDelete} deletePattern={this.deletePattern} modeId={this.state.deleteId} deleteMode={this.state.deleteId} modeStyle={this.state.modeArr} deletText={deletText}/>
        	  	</div>	
        	)	




 	     }

 
 }