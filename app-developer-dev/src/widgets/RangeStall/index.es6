import React from 'react';

export let RangeStall = {
    id: 1012,
    caption: '数字滑块',
    originCaption: '数字滑块',
    fieldType: 'boolean',
    width: 70,
    height: 306,
    cssFile : '../static/widgets/RangeStall/style.css',
    icon: '../static/img/widgets/stall-icon.png',
    iconActive: '../static/img/widgets/stall-icon-active.png',
    scheme: ['caption', 'show',  'range', 'stall' , 'event','eValue', 'multi[0]'],
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/srange.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/srange-active.png" className="icon-active" />
                    <span>数字滑块</span>
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
                        rangeValue = _state[item.statusField] || rangeValue;
                    }
                });
            }
            rangeValue = this.state.rangeValue || rangeValue || sessionValue || minValue || 0;
            var fblock = (this.props.style.height/2-this.props.style.width/2-parseInt(this.props.style.height)*(rangeValue-minValue)/(maxValue-minValue));
            fblock = fblock>0?'-'+fblock+'px':Math.abs(fblock)+'px';
            var mLeft = 4.5-(16*rangeValue-16*minValue)/(maxValue-minValue)+'px';
            var thumburl,trackurl;
            if(this.props.styleList && this.props.styleList.rangeNumber instanceof Array){
                this.props.styleList.rangeNumber.map(function(item,index){
                    if(item.name=='slider-thumb'){
                        thumburl = JSON.parse(item.url).pictureUrl;
                    }else if(item.name=='runnable-track'){
                        trackurl = JSON.parse(item.url).pictureUrl;
                    }
                });
            }
            var rangeStyle={
                width:this.props.style.height,
                height:this.props.style.width,
                left:'-'+(this.props.style.height/2-this.props.style.width/2)+'px',
                top:this.props.style.height/2-this.props.style.width/2+11+'px'
            };
            var trackStyle = {
                left:this.props.style.width/2+'px',
                top:'22px',
                backgroundImage:'url('+trackurl+')'
            };
            return (
                <div className ='hide'  {...this.props} ref={this.props.ref}>
                    <section className='rangeNumber'>
                        <section className='tips-on' style={{left:fblock,marginLeft:mLeft,top:this.props.style.height/2-this.props.style.width/2+11+'px'}}>
                            <span className='ratetext'>{rangeValue}</span>
                        </section>
                        <input type='range' style={rangeStyle} min={minValue} max={maxValue} value = {rangeValue} onChange={this.rangechange}
                        onTouchEnd={this.handleClick} step={rateValue}  className={"widgetNumberChange "+this.props.className} />
                        <span className='slider-on' style={trackStyle}></span>
                        <span className='rangeblock-on' style={{left:fblock,marginLeft:mLeft,backgroundImage:'url('+thumburl+')'}}></span>
                    </section>
                </div>
            );
        }
    })`
};