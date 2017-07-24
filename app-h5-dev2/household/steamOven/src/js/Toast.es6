'use strict';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
var {Link} = ReactRouter;

export class  Toast extends BaseComponent{
    constructor(state) {
       
        super(state);
        this.state = {
          modelName:this.props.deletText
        };
        this.listenStore(Store); // 监听Store
        this.componentDidMount=this.componentDidMount.bind(this);
        this.change=this.change.bind(this);
        this.cancelDelete=this.cancelDelete.bind(this);
        this.submitDelete=this.submitDelete.bind(this);
        this.rechange=this.rechange.bind(this);
        this.rechange=this.rechange.bind(this);
       }
     componentDidMount(){
      
     }
     componentWillReceiveProps(nextProps){
        if(this.props.deletText!=nextProps.deletText)
        {
         this.setState({modelName:nextProps.deletText}) 
        }
     }
    rechange(e){
      let changeevent= e||window.event;
      let val=changeevent.target.value;
      this.setState({modelName:val});

    }
    change(){
      // let textNode=this.refs.nameValue;
      // let value=textNode.value=="" ?this.props.deletText :textNode.value;
      let modeId=this.props.modeId;
      // textNode.setAttribute('placeholder', this.props.deletText)
      let value=this.state.modelName;
      // Actions.rename(value);
      Actions.redefine(modeId,value);
      this.props.closeToast();
      
       setTimeout((data)=>{
        Actions.pullData();
      },200);
      // this.props.rename(value);
     
    }
   cancelDelete(){
      this.props.closeToast();
    }
   submitDelete(){
    let mode=this.props.deleteMode;
     this.props.closeToast();
     Actions.deleteMode(mode);
     // if(this.state.rePull==0){Actions.pullData();alert(重新获取)};
   }
      render(){
      let text=this.props.deletText;
     
      return(
            <div>
              <section className='nameToast' style={{display:this.props.showToast ?'' :'none'}}>
                 <section className='top'> 
                 <input type='text'   className='change' ref='nameValue' maxLength='10' onChange={this.rechange} value={this.state.modelName} />
                 </section> 
                  <div className='deleteButton_top' >
                  <span onTouchEnd={this.cancelDelete}>取消</span>
                  <span onTouchEnd={this.change} >确定</span>
                </div>
              </section>
            <section className='deletToast' style={{display:this.props.showDelete ?'' :'none'}}>
                <section className='topText'>
                   <p className='title'>温馨提示</p>
                   <p className='text'>确定要删除当前"{text}"模式吗</p>
                </section>
                <div className='deleteButton' >
                  <span onTouchEnd={this.cancelDelete}>取消</span>
                  <span onTouchEnd={this.submitDelete}>确定</span>
                </div>
            </section>
          </div>  
          )
        }
    }
