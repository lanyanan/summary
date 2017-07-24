import React from 'react';

export let Popups = {
    id: 1016,
    caption: '双按钮弹窗',
    editText:'我是弹窗-双按钮',
    title:'弹窗标题',
    originCaption: '双按钮弹窗',
    fieldType: 'boolean',
    width: 325,
    height:200 ,
    zIndex:999,
    cssFile : '../static/widgets/Popups/style.css',
    icon: '../static/img/widgets/popus-icon.png',
    iconActive: '../static/img/widgets/popus-icon-active.png',
    scheme: ['caption', 'show','title','text','popupButtonTone','event'],
    grid: ['text','interactive','size','exterior','hierarchy'],
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
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/popups.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/popups-active.png" className="icon-active" />
                    <span>双按钮弹窗</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        getInitialState: function(){
            return {
               show:true,
               shadeShow:false
            };
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
            sessionStorage.removeItem('popup_show');
        },
        handleConcel: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.setState({show:false});
            } 
        },
        handleConfirm: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.setState({show:false,shadeShow:false});
            }
            sessionStorage.setItem('popup_show', false);

            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.commandType==2){
                            AppActions.complexCommand(item.commandConfigList);
                        }else{
                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                        }
                    } else if (item.eventType==2) {
                        location.hash = '#/page/' + item.checkedPageId
                    }else if (item.eventType==3 || item.eventType==4) {
                        item.userWidgetID = userWidgetID;
                        item.status = item['activeStatusField'];
                        AppActions.toggle(item);
                    }
                });
            }
        },
        
        render: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            var userWidgetID = this.props.userWidgetID;
            var styleObj = this.props.style;
            var show =  true,shadeShow =this.state.shadeShow;
            var popup_show = sessionStorage.getItem('popup_show');
            if(_state ){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField] && popup_show!='false'){
                        show =true;
                        shadeShow = true;
                    }else{
                        show =false;
                        shadeShow = false;
                    }
                });
            }
            if(!this.state.show || popup_show == 'false' ){
                show =false;
                shadeShow = false;

            }
            var widgetInfo = this.props.widgetInfo;
            var popupButtonBgColor = widgetInfo.popupButtonBgColor ? widgetInfo.popupButtonBgColor : null;

            return (
                <div  ref={this.props.ref}  {...this.props} className='widgetPopups'>
                    <section  className='popups'  
                    style={{
                        display:(!show?"none":"block"),
                        background:styleObj.backgroundColor,
                        border: (styleObj.borderWidth +'px solid '+ styleObj.borderColor).toString(),
                        borderRadius:styleObj.borderRadius
                    }}>
                        <p className='title'>{this.props.title}</p>
                        <textarea disabled="disabled" className='content'  value={this.props.text} ></textarea>
                        <div className='botton-box' style={{backgroundColor:popupButtonBgColor}} ><span onTouchEnd={this.handleConcel} >取消</span><span onTouchEnd={this.handleConfirm}>确定</span></div>
                    </section>
                    <section className='shade' style={{display:(!shadeShow?"none":"block")}}></section>
                </div>            
                )
        }
    })`
};