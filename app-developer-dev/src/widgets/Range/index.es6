import React from 'react';

export let Range = {
    id: 1007,
    caption: '滑块',
    originCaption: '滑块',
    fieldType: 'boolean',
    width: 306,
    height: 70,
    cssFile : '../static/widgets/Range/style.css',
    icon: '../static/img/widgets/range-icon.png',
    iconActive: '../static/img/widgets/range-icon-active.png',
    scheme: ['rangeType','widgetStyle','tone','caption', 'show','range','scopeStatus', 'event','eValue', 'multi[0]'],
    grid: ['style','interactive','size','hierarchy','scope'],
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
                    <img {...this.props} src="../static/img/widgets/range.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/range-active.png" className="icon-active" />
                    <span>滑块</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
        getInitialState:function(){
            return {}
        },
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        rangechange:function(e){
            //处理滑动更改档位
            if(!this.props.userWidgetID) return;
            var windStall = e.target.value;
            var minValue = parseInt(this.props.minValue) || 0;
            var maxValue = parseInt(this.props.maxValue) || 100;
            windStall = windStall>maxValue?maxValue:windStall;
            windStall = windStall<minValue?minValue:windStall;
            this.setState({
                rangeValue:windStall
            });
        },
        handleClick: function(e){
            //处理滑动完成触发事件
            var value=e.target.value;
            sessionStorage.setItem(this.props.userWidgetID,value);
            var userWidgetID = this.props.userWidgetID;
            var arg = {};
            arg.userWidgetID = userWidgetID;
            arg.eventType=3;
            arg.showWidgetList=[];
            arg.status = {
                userWidgetID:{
                    statusField:this.props.statusSet[0].statusField,
                    statusValue:value
                }
            };
            AppActions.toggle(arg);
            if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                var userWidgetID = this.props.userWidgetID;
                this.props.eventSet.map(function(item,index){
                    if (item.eventType==1) {
                        if(item.commandType==2){
                            AppActions.complexCommand(item.commandConfigList);
                        }else{
                            item.eventValue = e.target.value;
                            AppActions.trigger(item.eventField, item.eventValue, item.updateFlag,item.byteLength);
                        }
                    } else if (item.eventType==2) {
                        location.hash = '#/page/' + item.checkedPageId
                    }else if (item.eventType==3 || item.eventType==4) {
                        item.userWidgetID = userWidgetID;
                        AppActions.toggle(item);
                    }
                });
            }
        },
        render: function(){
            var sessionValue = this.props.userWidgetID?sessionStorage.getItem(this.props.userWidgetID):'';
            var minValue = parseInt(this.props.minValue) || 0;
            var maxValue = parseInt(this.props.maxValue) || 100;
            var rateValue = parseInt(this.props.rateValue) || 1;
            var rangeValue;
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusField && !item.statusValue){
                        //对应无档位情况
                        rangeValue = _state[item.statusField] || rangeValue;
                    }else if(item.statusField && _state[item.statusField]==item.statusValue){
                        //对应有档位情况
                        rangeValue = _state[item.statusField] || rangeValue;
                    }
                });
            }
            rangeValue = this.state.rangeValue || rangeValue || sessionValue || minValue || 0;
            var windStall = parseInt((rangeValue-minValue)/rateValue);
            if(this.props.stallShow===true && this.props.statusSet){
                var arrLength = this.props.statusSet.length-1;
            }
            var fblock = parseInt(100*(rangeValue-minValue)/(maxValue-minValue))+'%';
            var fbLeft = '-'+parseInt(11*(rangeValue-minValue)/(maxValue-minValue))+'px';
            var sunImg = [];
            if(this.props.styleList && this.props.styleList.range instanceof Array){
                this.props.styleList.range.map(function(item,index){
                    sunImg.push(JSON.parse(item.url).pictureUrl);
                });
            }

            var widgetInfo = this.props.widgetInfo;
            var rangeStyle = widgetInfo.rangeStyle ? widgetInfo.rangeStyle : 0;
            var rangePercent = widgetInfo.rangePercent ? widgetInfo.rangePercent : false;
            return (
                <div {...this.props} style={Object.assign({},this.props.style,{"backgroundColor":"none"})} ref={this.props.ref}>
                    <section className={rangeStyle?'rangeblock range-style'+rangeStyle : "rangeblock range-style0"} >
                        <input type='range'  min={minValue} max={maxValue} value = {rangeValue} onChange={this.rangechange}
                        onTouchEnd={this.handleClick} step={rateValue}  className={this.props.className || "widgetRange"} />
                        <span className='slider-on'></span>
                        <span className='slider-on-active' style={{width:fblock,background:this.props.style.backgroundColor ? this.props.style.backgroundColor : "#3a96ff"}}></span>
                        <span className='rangeblock-on' style={{left:fblock,marginLeft:fbLeft}}>
                            <em style={{display:rangePercent ? "block" : "none",color: this.props.style.backgroundColor}}>{fblock}</em>
                        </span>
                        
                        <div className="range-num">
                            <span>0%</span>
                            <i>100%</i>
                        </div>
                        <div className="range-sun">
                            <span style={{backgroundImage:'url('+sunImg[0]+')'}}></span>
                            <i  style={{backgroundImage:'url('+sunImg[1]+')'}}></i>
                        </div>
                        {
                            this.props.statusSet&&this.props.stallShow?this.props.statusSet.map(function(item,index){
                            return(
                                <div key={index}>
                                    <span className='stallName' style={{left:(100*index/arrLength)+'%',marginLeft:'-'+(13*index/arrLength)-14+'px'}}>
                                        {item.statusName}
                                    </span>
                                    <i className='stallPoint' style={{left:(100*index/arrLength)+'%',marginLeft:0-(13*index/arrLength)+8+'px'}}></i>
                                </div>
                            )
                        }):null}
                    </section>
                </div>
            );
        }
    })`
};