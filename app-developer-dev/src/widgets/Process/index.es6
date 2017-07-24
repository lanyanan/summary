import React from 'react';

export let Process = {
    id: 1018,
    caption: '过程控件',
    editText:'过程控件',
    originCaption: '过程控件',
    fieldType: 'boolean',
    width: 375,
    height: 49,
    trans:80,
    cssFile : '../static/widgets/Process/style.css',
    icon: '../static/img/widgets/process-icon.png',
    iconActive: '../static/img/widgets/process-icon-active.png',
    scheme: ['caption', 'show','process','tone','color','opacity'],
    grid: ['style','interactive','size','exterior','hierarchy'],
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
                    <img {...this.props} src="../static/img/widgets/process.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/process-active.png" className="icon-active" />
                    <span>过程控件</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
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
                return  sColorChange;  
            }else{  
                return sColor;    
            }  
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        handleClick: function(){
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
        render: function(){
            console.log(this.props);
            var _state = typeof __props !== 'undefined' ? __props : '';
            var userWidgetID = this.props.userWidgetID;
            var color = this.props.textColor || this.props.style.color || '#68a5ff',
                opacity = this.props.trans?(this.props.trans)/100:0.7,
                rgbArr = this.colorRgb(color),
                rgbaStr ='rgba(' + rgbArr[0] + ',' + rgbArr[1] +','+ rgbArr[2] + ',' + opacity + ')',
                statusLen = this.props.statusSet.length;
            if(userWidgetID) var statusIndex = sessionStorage.getItem(userWidgetID) || 'a';

            this.props.statusSet.map(function(item,index){
                if((_state[item.hourField] && _state[item.hourField] !=0) ||(_state[item.minuteField] && _state[item.minuteField] !=0) ){
                    if(isNaN(statusIndex)) statusIndex = index;
                    if(statusIndex < index) {
                        statusIndex = index;
                    }
                    sessionStorage.setItem(userWidgetID,statusIndex);
                }

            });
            var widgetInfo = this.props.widgetInfo;
            var processColor = widgetInfo.processColor ? widgetInfo.processColor : "";
            var processNowd = widgetInfo.processNowd ? widgetInfo.processNowd : 0;
            return (
                <section {...this.props} ref={this.props.ref} onTouchEnd={this.handleClick} className={this.props.className || "widgetProcess"}>
                    <ul className='processUl'>
                    {
                        this.props.statusSet.map(function(item,index){
                            var styleObj ={
                                color:color,
                                background:processColor ? processColor : rgbaStr
                            };
                            var lineTop = '22px',
                                lineRight = '-20px',
                                lineColor = rgbaStr;
                            if(statusIndex > index) {
                                styleObj.color = '#fff';
                                styleObj.background = '#EDEDED';
                                lineColor = '#EDEDED';
                            }else if(statusIndex == index){
                                styleObj.background = 'transparent';
                                styleObj.color = color;
                                styleObj.width = '64px';
                                styleObj.height = '64px'; 
                                styleObj.borderTop = '3px solid ' + rgbaStr;
                                styleObj.borderLeft = '3px solid ' + color;
                                styleObj.borderRight = '3px solid ' + rgbaStr;
                                styleObj.borderBottom = '3px solid ' + rgbaStr;
                                styleObj.marginTop = '-15px';
                                styleObj.marginBottom = '0px';
                                lineTop = '33px';
                                lineRight = '-23px';
                            }
                            return (
                                <li key={index}  style={styleObj}>
                                    <span>{item.statusName}</span>
                                    <p style={{display:statusIndex == index?'':'none',marginTop: '-25px'}}>{_state[item.hourField] + ':' + _state[item.minuteField]}</p>
                                    <span style={{display:index<statusLen-1?'':'none',background:lineColor,top:lineTop,right:lineRight}} className='line'></span>
                                </li>
                            )
                        })
                    }
                    </ul>
                </section>      
            )
        }
    })`
};