import React from 'react';

export let Button = {
    id: 1005,
    caption: '按钮',
    editText:'按钮',
    originCaption: '按钮',
    fieldType: 'boolean',
    width: 375,
    height: 49,
    successToast: null,
    failToast: null,
    icon: '../static/img/widgets/button-icon.png',
    iconActive: '../static/img/widgets/button-icon-active.png',
    cssFile : '../static/widgets/Button/style.css',
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    scheme: ['buttonWidth','buttonSolid','tone','caption','show','text','textalign','color','fontStyle','event','bold', 'italic', 'size', 'multi[0]'],
    widgetInfo:{
        dragStatus: { 
            top: true,
            bottom: true,
            left: false,
            right: true,
            changeWidth: false,
            changeHeight: false
        }
    },
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-left">
                    <img {...this.props} src="../static/img/widgets/button.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/button-active.png" className="icon-active" />
                    <span>按钮</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        colorRgb: function(color){
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
            if(sColor && reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));  
                }
                return sColorChange;
            }else{
                return sColor;  
            }
        },
        handleClick: function(e){
            e.preventDefault(); 
            var bgc16 = this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a7ff5";
            var bgcRGB = this.colorRgb(bgc16);
            e.target.style.background = 'rgba('+ bgcRGB[0] +','+ bgcRGB[1] +','+ bgcRGB[2] +',1)'
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
            }else{
                console.log('eventSet error');
            }
        },
        handleTouchStart(e){
            e.preventDefault(); 
            var bgc16 = this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a7ff5";
            e.target.style.background = 'rgba('+ (parseInt(bgcRGB[0]) -20) +','+ bgcRGB[1] +','+ bgcRGB[2] +',1)';
        },
        render: function(){
            return (
                <input {...this.props} ref={this.props.ref} onTouchStart={this.handleTouchStart} onTouchEnd={this.handleClick} className={this.props.className || "widgetButton"} value={this.props.text} type="button" />
            )
        }
    })`
};