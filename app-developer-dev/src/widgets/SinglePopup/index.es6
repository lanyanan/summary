
import React from 'react';

export let SinglePopup = {
    id: 1015,
    caption: '单按钮弹窗',
    editText:'我是弹窗',
    title:'弹窗标题',
    bottonDetail:'弹窗按钮内容',
    originCaption: '单按钮弹窗',
    fieldType: 'boolean',
    width: 325,
    height:200 ,
    zIndex:999,
    cssFile : '../static/widgets/SinglePopup/style.css',
    icon: '../static/img/widgets/h1-icon.png',
    iconActive: '../static/img/widgets/h1-icon-active.png',
    grid: ['text','interactive','size','exterior','hierarchy'],
    scheme: ['caption', 'show','title','status','no-priority','text','bottonDetail','popupButtonTone','multi[0]'],
    widgetInfo: {
        dragStatus: { 
            top: true,
            bottom: true,
            left: true,
            right: true,
            changeWidth: false,
            changeHeight: false
        }
    },
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/singlepopup.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/singlepopup-active.png" className="icon-active" />
                    <span>单按钮弹窗</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        getInitialState: function(){
            return {
                firstShow: true,
                show:true,
                shadeShow:false
            };
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var userWidgetID = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(userWidgetID);
            }
        },
        handleClick: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            var userWidgetID = this.props.userWidgetID;
            console.log(_state);
            if(_state){
                this.setState({
                    show:false,
                    shadeShow:false
                });
            } 
        },
        render: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            var userWidgetID = this.props.userWidgetID;
            var styleObj = this.props.style;
            var show =  true,shadeShow = this.state.shadeShow;
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField]){
                        show = true;
                        shadeShow = true;
                    }else{
                        show = false;
                        shadeShow = false;
                    }
                });
            }
            if(!this.state.show){
                show = false;
                shadeShow = false;
            }
            var widgetInfo = this.props.widgetInfo;
            var popupButtonBgColor = widgetInfo.popupButtonBgColor ? widgetInfo.popupButtonBgColor : null;
            
            return (
                <div {...this.props} ref={this.props.ref} className='widgetSinglePopup'>
                    <section  className='singlePopup'  
                    style={{
                        display:(!show?"none":"block"),
                        background:styleObj.backgroundColor,
                        border: (styleObj.borderWidth +'px solid '+ styleObj.borderColor).toString(),
                        borderRadius:styleObj.borderRadius
                    }}>
                        <p className='title'>{this.props.title}</p>
                        <textarea disabled="disabled" className='content'  value={this.props.text}></textarea>
                        <div className='botton' onTouchEnd={this.handleClick} style={{backgroundColor:popupButtonBgColor}}>{this.props.bottonDetail}</div>
                    </section>
                    <section className='shade'  style={{display:(!shadeShow?"none":"block")}}></section>
                </div>            
                )
        }
    })`
};