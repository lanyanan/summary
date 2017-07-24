'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
var {Link} = ReactRouter;

export class  Selector extends BaseComponent{
    constructor(state) {
       
        super(state);
        this.state = {
        status:0,    //默认待机模式下都可选；
        isShowAlert:false, //默认不弹出提示框
        canReSet:false
        };
        this.listenStore(Store); // 监听Store
        this.componentWillMount=this.componentWillMount.bind(this);
       }
     componentWillMount(){
      Actions.getData();
      }
      handerClick(index){

          if(this.state.status==0&&((this.props.OperationWorkMode==null||this.props.OperationWorkMode==0)&&(this.props.FuntionSelect==0||this.props.FuntionSelect==null))){
          this.setState({status:index});
          this.props.changeIndex(index);
            if(index!=1){
          Actions.setPattern(index-1);
             }
           }
           if(this.props.OperationWorkMode==0&&this.props.FuntionSelect==0&&this.state.status!=0){
               this.setState({status:0})
            } 
           //  if(2<this.props.OperationWorkMode&&this.props.OperationWorkMode<17){
           //    this.setState({status:1})
           // }

        }
       resetStatus(index){
         this.setState({status:0});
         let case1=this.props.FuntionSelect==0&&(this.props.OperationWorkMode==0||this.props.OperationWorkMode==null);
         let case2=this.props.contentIndex==2||this.props.contentIndex==3;
         let case3=case1&&case2;
         let case4=(this.props.OperationWorkMode==0||this.props.OperationWorkMode==null)&&this.state.status==0&&this.props.FuntionSelect==0;
        if(case3||case4){
            return '';
           }//防止待机模式下取消按钮可点击
          // this.props.changeIndex(0);
          // Actions.calWork();
        if(2<this.props.OperationWorkMode<17||(this.state.status==1&&this.props.contentIndex==1))
          {
           this.setState({
              isShowAlert:true,
             
            })
           
          }
        if(this.props.OperationWorkMode==1||this.props.OperationWorkMode==2||this.props.contentIndex==2||this.props.contentIndex==3||this.state.PresetSet==1)
          { 
            this.setState({
              isShowAlert:false
            })
          Actions.calWork();
         
          this.props.changeIndex(0);
          }
          
       }
    btnClose(){
     this.props.changeIndex(0);
     Actions.calWork();
     this.setState({isShowAlert:false,status:0});
    }
    btnCancel(){
      this.setState({isShowAlert:false});
     
    }
  
      render(){
        console.log(this.props.PresetSet+'预约');
      console.log(this.props.OperationWorkMode+'工作模式')
      console.log(this.props.FuntionSelect+'控制数据');
       let selectArr=[{
              src1:'unselected-pattern.png',
              src2:'pattern.png',
              src3:'selected-pattern.png'
            },{
              src1:'unselected-warm.png',
              src2:'warm.png',
              src3:'selected-warm.png',
              text:'保温中'
            },{
              src1:'unselected-wash.png',
              src2:'wash.png',
              src3:'selected-wash.png',
              text:'清洗中'
            }];

        let selectImage=[{
            src:'selected-pattern.png',
            text:'模式'
         },{
            src:'selected-fan.png',
            text:"蒸饭"
           },{
            src:'selected-meat.png',
            text:"蒸肉"
          },{src:'selected-fishing.png',
            text:"蒸鱼"
          },{
            src:'selected-tudou.png',
            text:"蒸土豆"
          },{
            src:'selected-ricer.png',
            text:"热饭"
          },{
            src:'selected-baozi.png',
            text:'蒸包子'
          },{
            src:'selected-mantou.png',
            text:"蒸馒头"
          },{
            src:'selected-corn.png',
            text:"玉米"
          },{
            src:'selected-potato.png',
            text:'红薯'
          },{
            src:'selected-cake.png',
            text:"糕点"
          },{
            src:'selected-xie.png',
            text:"蟹类"
          },{
            src:'selected-fish.png',
            text:"虾类"
          },{
            src:'selected-shell.png',
            text:"贝类"
          },{
            src:'selected-egg.png',
            text:"蒸蛋"
        }];
       let runImage=[{},{},{},
          {
            src:'selected-fishing.png',
            text:"蒸鱼"
          },{
            src:'selected-meat.png',
            text:"蒸肉"
          },{
            src:'selected-fan.png',
            text:"蒸饭"
           },{
            src:'selected-tudou.png',
            text:"蒸土豆"
          },{
            src:'selected-ricer.png',
            text:"热饭"
          },{
            src:'selected-baozi.png',
            text:'蒸包子'
          },{
            src:'selected-mantou.png',
            text:"蒸馒头"
          },{
            src:'selected-corn.png',
            text:"蒸玉米"
          },{
            src:'selected-potato.png',
            text:'蒸红薯'
          },{
            src:'selected-cake.png',
            text:"蒸糕点"
          },{
            src:'selected-xie.png',
            text:"蒸蟹类"
          },{
            src:'selected-fish.png',
            text:"虾类"
          },{
            src:'selected-shell.png',
            text:"贝类"
          },{
            src:'selected-egg.png',
            text:"蒸蛋"
          }];         
      let imgSrc1,imgSrc2,imgSrc3,Style1,Style2,Style3,Style4,imgUrl,textMessage;
      let Contion1=2<this.props.OperationWorkMode&&this.props.OperationWorkMode<17;
      let Contion2=2<this.props.FuntionSelect&&this.props.FuntionSelect<17;
      let path = (this.state.status==1&&(!Contion1&&!Contion2)) ? "/pattern" :'' ;
       if((this.props.PresetSet==0||this.props.PresetSet==undefined)&&this.props.OperationWorkMode==5&&this.props.FuntionSelect==0){
            textMessage='模式';
           imgSrc1 = '../static/img/'+selectArr[0].src2 ;
           imgSrc2 = '../static/img/'+selectArr[1].src2 ;
           imgSrc3 = '../static/img/'+selectArr[2].src2 ;
           Style1=Style2=Style3={color:'#848484'};
       }////防止从APP首页进入index页造成UI渲染混乱
      if(this.state.status==1){
           if(this.props.status==0){
           imgUrl= selectImage[this.state.workIndex==undefined ? 0 :this.state.workIndex].src ;
           //imgUrl=selectImage[this.state.workIndex].src;
           imgSrc1='../static/img/'+imgUrl ;
           textMessage= selectImage[this.state.workIndex==undefined ? 0 :this.state.workIndex].text ; 
          //workMessage= messageArr2[this.state.workIndex];
           Style1={color:'#4c91fc'};
           imgSrc2 = this.state.status ==2 ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
           Style2=this.state.status==2 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           imgSrc3 = this.state.status ==3 ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
           Style3=this.state.status==3 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           Style4={color:'#848484'};
          }
        if(this.props.status==1&&(this.props.OperationWorkMode!=0||this.props.FuntionSelect!=0)){
            imgUrl= selectImage[this.state.workIndex==undefined ? 1 :this.state.workIndex+1].src ;
           //imgUrl=selectImage[this.state.workIndex].src;
           imgSrc1='../static/img/'+imgUrl ;
           textMessage= selectImage[this.state.workIndex==undefined ? 1 :this.state.workIndex+1].text ; 
          //workMessage= messageArr2[this.state.workIndex];
           Style1={color:'#4c91fc'};
           imgSrc2 = this.state.status ==2 ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
           Style2=this.state.status==2 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           imgSrc3 = this.state.status ==3 ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
           Style3=this.state.status==3 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           Style4={color:'#848484'};

          }
        if(this.props.status==1&&this.props.OperationWorkMode==0&&this.props.FuntionSelect==0){
           textMessage='模式';
           imgSrc1 = '../static/img/'+selectArr[0].src2 ;
           imgSrc2 = '../static/img/'+selectArr[1].src2 ;
           imgSrc3 = '../static/img/'+selectArr[2].src2 ;
           Style1=Style2=Style3={color:'#848484'};
          }
        }
       if(this.state.status == 0){
           if(this.props.OperationWorkMode==null||this.props.OperationWorkMode==0||this.props.FuntionSelect==0){
           textMessage='模式';
           imgSrc1 = '../static/img/'+selectArr[0].src2 ;
           imgSrc2 = '../static/img/'+selectArr[1].src2 ;
           imgSrc3 = '../static/img/'+selectArr[2].src2 ;
           Style1=Style2=Style3={color:'#848484'};
          }
        if(2<this.props.OperationWorkMode&&this.props.OperationWorkMode<17||(2<this.props.FuntionSelect&&this.props.FuntionSelect<17)) {
           imgUrl= runImage[this.props.OperationWorkMode||this.props.FuntionSelect].src ;
           imgSrc1='../static/img/'+imgUrl;
           textMessage= runImage[this.props.OperationWorkMode||this.props.FuntionSelect].text ; 
          //workMessage= messageArr2[this.state.workIndex];
           Style1={color:'#4c91fc'};
           imgSrc2 = this.state.status ==2 ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
           Style2=this.state.status==2 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           imgSrc3 = this.state.status ==3 ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
           Style3=this.state.status==3 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           Style4={color:'#848484'};
          }
        else if(this.props.OperationWorkMode==1||this.props.OperationWorkMode==2||this.props.FuntionSelect==1||this.props.FuntionSelect==2){

            textMessage='模式';
            imgSrc1 =  '../static/img/'+selectArr[0].src1 ;
            Style1= {color:'#c7c7c7'};
            imgSrc2 = (this.props.OperationWorkMode ==1||this.props.FuntionSelect==1) ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
            Style2=(this.props.OperationWorkMode ==1||this.props.FuntionSelect==1) ? {color:'#4c91fc'} : {color:'#c7c7c7'};
            imgSrc3 = (this.props.OperationWorkMode ==2 ||this.props.FuntionSelect==2) ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
            Style3=(this.props.OperationWorkMode ==2 ||this.props.FuntionSelect==2) ? {color:'#4c91fc'} : {color:'#c7c7c7'};
            Style4={color:'#848484'};
          }
         
       }
       else if(this.state.status!=0&&this.state.status!=1){
          if((this.props.contentIndex==2||this.props.contentIndex==3)&&(this.props.OperationWorkMode==0||this.props.OperationWorkMode==null)&&(this.props.FuntionSelect==1||this.props.FuntionSelect==2)){
           textMessage='模式';
           imgSrc1 =  '../static/img/'+selectArr[0].src1 ;
           Style1= {color:'#c7c7c7'};
           imgSrc2 = this.props.contentIndex ==2 ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
           Style2=this.props.contentIndex==2 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           imgSrc3 = this.props.contentIndex ==3 ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
           Style3=this.props.contentIndex==3 ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           Style4={color:'#848484'};

           }
          if(((2<this.props.FuntionSelect&&this.props.FuntionSelect<17)||(2<this.props.OperationWorkMode&&this.props.OperationWorkMode<17))&&(this.props.contentIndex==2||this.props.contentIndex==3)){
           imgUrl= runImage[this.props.OperationWorkMode||this.props.FuntionSelect].src ;
           imgSrc1='../static/img/'+imgUrl;
           textMessage= runImage[this.props.OperationWorkMode||this.props.FuntionSelect].text ; 
          //workMessage= messageArr2[this.state.workIndex];
           Style1={color:'#4c91fc'};
           imgSrc2 = '../static/img/'+selectArr[1].src1;
           Style2={color:'#c7c7c7'};
           imgSrc3 ='../static/img/'+selectArr[2].src1;
           Style3={color:'#c7c7c7'};
           Style4={color:'#848484'};

          }
          if(this.props.OperationWorkMode==1||this.props.OperationWorkMode==2||this.props.FuntionSelect==1||this.props.FuntionSelect==2){
           textMessage='模式';
           imgSrc1 =  '../static/img/'+selectArr[0].src1 ;
           Style1= {color:'#c7c7c7'};
           imgSrc2 = (this.props.OperationWorkMode ==1||this.props.FuntionSelect==1 ) ?'../static/img/'+selectArr[1].src3 : '../static/img/'+selectArr[1].src1;
           Style2=(this.props.OperationWorkMode ==1||this.props.FuntionSelect==1 ) ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           imgSrc3 = (this.props.OperationWorkMode ==2||this.props.FuntionSelect==2) ?'../static/img/'+selectArr[2].src3 : '../static/img/'+selectArr[2].src1;
           Style3=(this.props.OperationWorkMode ==2||this.props.FuntionSelect==2) ? {color:'#4c91fc'} : {color:'#c7c7c7'};
           Style4={color:'#848484'};
          }
          if(this.props.OperationWorkMode==0&&this.props.FuntionSelect==0){
           
           textMessage='模式';
           imgSrc1 = '../static/img/'+selectArr[0].src2 ;
           imgSrc2 = '../static/img/'+selectArr[1].src2 ;
           imgSrc3 = '../static/img/'+selectArr[2].src2 ;
           Style1=Style2=Style3={color:'#848484'};
          } 
      }
        if((this.props.PresetSet==0||this.props.PresetSet==undefined)&&this.props.OperationWorkMode==5&&this.props.FuntionSelect==0){
            textMessage='模式';
           imgSrc1 = '../static/img/'+selectArr[0].src2 ;
           imgSrc2 = '../static/img/'+selectArr[1].src2 ;
           imgSrc3 = '../static/img/'+selectArr[2].src2 ;
           Style1=Style2=Style3={color:'#848484'};
       }//防止从APP首页进入index页造成UI渲染混乱
         
      
        return(
           
            <section className="work-pattern">
              <div style={{opacity:(this.state.isShowAlert==true ? 0.5 : 1)}}>
                <section className="select-section">
                  <dl onTouchEnd={this.handerClick.bind(this,1)} >
                  <Link to={path}>
                    <dt><img src={imgSrc1} /></dt>  
                    <dd style={Style1}>{textMessage}</dd>
                  </Link> 
                  </dl>
                  <dl onTouchEnd={this.handerClick.bind(this,2)} >
                    <dt><img src={imgSrc2} /></dt>  
                    <dd style={Style2}>保温</dd>
                  </dl>
                  <dl onTouchEnd={this.handerClick.bind(this,3)} >
                    <dt><img src={imgSrc3} /></dt>  
                    <dd style={Style3}>清洗</dd>
                  </dl>
                  </section>
                  <div className="message"></div>
                  <div className="footer">
                  <a className="cancel" onTouchEnd={this.resetStatus.bind(this)} style={Style4}>取消</a>
                  </div>
                </div>
                  <div className="alert" style={{display:(this.state.isShowAlert==true ? 'block' :'none')}}>
                     <div className='innerbox'>
                          <p className="title">温馨提示</p>
                          <p className='text-message'>确定要取消烹饪吗？</p>
                     </div>
                     <div className="two-button">
                          <input type="button" value="取消" onTouchStart={this.btnCancel.bind(this)} className='left'/>
                          <input type="button" value="确定" onTouchStart={this.btnClose.bind(this)} className='right'/>
                     </div>
                </div>
        </section>
          ) 
        }
}