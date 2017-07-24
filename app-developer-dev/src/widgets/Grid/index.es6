import React from 'react';

export let Grid = {
    id: 1021,
    caption: '宫格',
    editText:'宫格',
    originCaption: '宫格',
    fieldType: 'boolean',
    width: 50,
    height: 50,
    zIndex: 1,
    successToast: null,
    failToast: null,
    icon: '../static/img/widgets/grid-icon.png',
    iconActive: '../static/img/widgets/grid-icon-active.png',
    cssFile : '../static/widgets/Grid/style.css',
    grid: ['style','text','interactive'],
    scheme: ['widgetStyle','imagechoce','caption','show','text','switch','italic', 'size', 'multi[0]'],
    widgetInfo: {
        dragStatus:{ 
            top: false,
            bottom: false,
            left: false,
            right: false,
            changeWidth: false,
            changeHeight: false
        }
    },
    dom: `React.createClass({
        getInitialState: function(){
            var widgetInfo = this.props.widgetInfo,
                gridIcon = widgetInfo.gridIcon ? widgetInfo.gridIcon : "https://200.200.200.58/group2/M01/0D/B7/yMjIOllLZAeAd56OAAAFY5KJ8q0616.png";

            return {
                icon: gridIcon,
                gridIcon: gridIcon,
            };
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray && this.props.statusVisibility == 2){
                AppActions.init(wid);
            }
            
            var widgetInfo = this.props.widgetInfo,
                gridStyle = widgetInfo.gridStyle ? widgetInfo.gridStyle : 0,
                gridIcon = widgetInfo.gridIcon ? widgetInfo.gridIcon : "https://200.200.200.58/group2/M01/0D/B7/yMjIOllLZAeAd56OAAAFY5KJ8q0616.png";

            if(gridStyle == 0){ //双选项
                console.log('componentDidMount');
                var speeddialColor = widgetInfo.speeddialColor ? widgetInfo.speeddialColor : "#3b96ff";

                if(!sessionStorage.getItem(this.props.userWidgetID)){
                    var value = parseInt(this.props.activeStatus) + 1;
                    var statusvalue = parseInt(this.props.activeStatus) == 1 ? 0 : 1;
                    if(this.props.userWidgetID && !this.props.statusSet[statusvalue].statusField){
                        sessionStorage.setItem(this.props.userWidgetID, value);
                    }

                    var switchClass = this.props.activeStatus == 1 ? 'off' : 'on';
                    var sessionValue = this.props.userWidgetID ? sessionStorage.getItem(this.props.userWidgetID) : '';
                    if(sessionValue){
                        switchClass = sessionValue == 2 ? 'off' : 'on';
                    }
                    if(switchClass == 'on'){
                        this.imgColor(speeddialColor);
                    }else{
                        this.imgColor("#333333");
                    }
                }
                
               
            } 

        },
        imgColor: function(color){
            if(!color) return false;
            
            var widgetInfo = this.props.widgetInfo;


            var newImage = null;
            newImage = new Image();
            newImage.crossOrigin = "anonymous";

            var gridIcon = widgetInfo.gridIcon ? widgetInfo.gridIcon : "https://200.200.200.58/group2/M01/0D/B7/yMjIOllLZAeAd56OAAAFY5KJ8q0616.png";
            newImage.src = gridIcon;

            var _this = this;
            newImage.onload = function(){
                
                var canvas = document.createElement("canvas");
                canvas.width = 56;
                canvas.height = 56;
                
                var ctx = canvas.getContext("2d");
                ctx.drawImage(newImage, 0, 0);
                
                var arr = _this.colorRgb(color);

                var imageData = ctx.getImageData(0, 0, 56, 56);

                for(var i = 0; i<imageData.data.length;i+=4){
                    imageData.data[i] = arr[0];
                    imageData.data[i + 1] = arr[1];
                    imageData.data[i + 2] = arr[2];
                }

                ctx.putImageData(imageData,0,0);
                var id = _this.props.userImgWidgetID ? _this.props.userImgWidgetID : _this.props.userWidgetID;
                sessionStorage.setItem(id + 'image', canvas.toDataURL());

                //组件重复渲染，找不到~
                if(!_this.refs['gridem']){
                    return false;
                }
                var gridEm = _this.refs['gridem'].getDOMNode();
                gridEm.style.backgroundImage = "url("+ sessionStorage.getItem(id + 'image') +")";
            }
        },
        colorRgb: function(color){
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var sColor = color.toLowerCase();
            if(sColor && reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i = 1; i < 4; i += 1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));   
                    }
                    sColor = sColorNew;
                }
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));  
                }
                return sColorChange;
            }else{
                return sColor;  
            }
        },
        handleClick: function(){
            var widgetInfo = this.props.widgetInfo,
                gridStyle = widgetInfo.gridStyle ? widgetInfo.gridStyle : 0;

            if(gridStyle == 0){ //双选项
                var value,statusvalue,eventvalue;
                
                if(sessionStorage.getItem(this.props.userWidgetID)){
                    value = sessionStorage.getItem(this.props.userWidgetID) == 1 ? 2 : 1;
                    eventvalue = value - 1;
                    statusvalue = eventvalue == 1 ? 0 : 1;
                }else{
                    eventvalue = parseInt(this.props.activeStatus);
                    value = eventvalue + 1;
                    statusvalue = eventvalue == 1 ? 0 : 1;
                }
                
                sessionStorage.setItem(this.props.userWidgetID, value);

                var userWidgetID = this.props.userWidgetID;
                var arg = {};
                arg.userWidgetID = userWidgetID;
                arg.eventType = 3;
                arg.showWidgetList = [];
                arg.status = {
                    userWidgetID:{
                        statusField:this.props.statusSet[statusvalue].statusField,
                        statusValue:this.props.statusSet[statusvalue].statusValue
                    }
                };
                AppActions.toggle(arg);

                var item = this.props.eventSet[eventvalue];
                if (item.eventType == 1) {
                    if(item.commandType == 2){
                        AppActions.complexCommand(item.commandConfigList);
                    }else{
                        AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                    }
                } else if (item.eventType == 2) {
                    location.hash = '#/page/' + item.checkedPageId
                }else if (item.eventType == 3 || item.eventType == 4) {
                    item.userWidgetID = userWidgetID;
                    item.status = item['activeStatusField'];
                    AppActions.toggle(item);
                }
                

                var speeddialColor = widgetInfo.speeddialColor ? widgetInfo.speeddialColor : "#3b96ff";
                var value = sessionStorage.getItem(this.props.userWidgetID);

                if(value == 2){
                    this.imgColor(speeddialColor);
                }else{
                    this.imgColor("#333333");
                }

            }
        },
        render: function(){
            var _this = this;
            var widgetInfo = this.props.widgetInfo;

            var text = this.props.text,
                speeddialStyle = widgetInfo.speeddialStyle ? widgetInfo.speeddialStyle : 0,
                speeddialShape = widgetInfo.speeddialShape ? widgetInfo.speeddialShape : 0,
                speeddialColor = widgetInfo.speeddialColor ? widgetInfo.speeddialColor : "#3b96ff",
                gridStyle = widgetInfo.gridStyle ? widgetInfo.gridStyle : 0;
            
            var gridIcon = "https://200.200.200.58/group2/M01/0D/B7/yMjIOllLZAeAd56OAAAFY5KJ8q0616.png";
            if(sessionStorage.getItem(this.props.userImgWidgetID + 'image')){
                gridIcon = sessionStorage.getItem(this.props.userImgWidgetID + 'image');
            }
            
            var switchClass = this.props.activeStatus == 1 ? 'off' : 'on';
            var sessionValue = this.props.userWidgetID ? sessionStorage.getItem(this.props.userWidgetID) : '';
            if(sessionValue){
                switchClass = sessionValue == 2 ? 'off' : 'on';
            }
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusValue && item.statusValue == _state[item.statusField]){
                        if(index == 1){
                            this.imgColor("#333333");
                        }else{
                            this.imgColor(speeddialColor);
                        }
                    }
                });
            }

            if(switchClass == 'on'){
                this.imgColor(speeddialColor);
            }else{
                this.imgColor("#333333");
            }


            
            return (
                <div {...this.props} ref={this.props.ref}  className="grid" >
                    <div className={"grid-content grid-style" + speeddialStyle} onTouchEnd={this.handleClick}>
                        <em className={speeddialShape == 0 ? "gridem" : "gridem circle"} id={this.props.userWidgetID} ref="gridem" style={{backgroundImage: "url("+ gridIcon +")",borderColor: speeddialColor}}></em>
                        <img src={this.state.icon} ref="gridimg" className="gridimg" crossOrigin="anonymous"/>
                        <span>{text}</span>
                    </div>
                </div>
            )
        }
    })`
};