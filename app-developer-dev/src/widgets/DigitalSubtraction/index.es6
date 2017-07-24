import React from 'react';

export let DigitalSubtraction = {
    id: 1013,
    caption: '数字加减',
    originCaption: '数字加减',
    fieldType: 'Switch',
    width: 375,
    height: 80,
    icon: '../static/img/widgets/stall-icon.png',
    iconActive: '../static/img/widgets/stall-icon-active.png',
    cssFile : '../static/widgets/DigitalSubtraction/style.css',
    grid: ['style','interactive','size','exterior','hierarchy','originCaptionRange','scope'],
    scheme: ['tone','caption', 'show','range','stall' ,'subtraction','event','scopeStatus','eValue', 'multi[0]'],
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
                    <img {...this.props} src="../static/img/widgets/sadd.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/sadd-active.png" className="icon-active" />
                    <span>数字加减</span>
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
        handleClick: function(e){
            clearTimeout(window[this.props.userWidgetID]);
            var value= parseInt(e.target.getAttribute('data-value')) || 0;
            var type = e.target.getAttribute('data-type');
            var minValue = parseInt(this.props.minValue) || 0;
            var maxValue = parseInt(this.props.maxValue) || 100;
            var rateValue = parseInt(this.props.rateValue) || 1;
            if(type==='plus'&&(value+rateValue)>maxValue) return;
            if(type==='minus'&&(value-rateValue)<minValue) return;
            if(type==='plus') value = (value+rateValue)>maxValue?value:value+rateValue;
            if(type==='minus') value = (value-rateValue)<minValue?value:value-rateValue;
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
            if(value>maxValue || value<minValue) return;
            window[this.props.userWidgetID] = setTimeout(function(){
                if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                    var userWidgetID = this.props.userWidgetID;
                    this.props.eventSet.map(function(item,index){
                        if (item.eventType==1) {
                            if(item.commandType==2){
                                AppActions.complexCommand(item.commandConfigList);
                            }else{
                                AppActions.trigger(item.eventField, value, item.updateFlag,item.byteLength);
                            }
                        } else if (item.eventType==2) {
                            location.hash = '#/page/' + item.checkedPageId
                        }else if (item.eventType==3 || item.eventType==4) {
                            item.userWidgetID = userWidgetID;
                            AppActions.toggle(item);
                        }
                    });
                }
            }.bind(this), 2000);
        },
        render: function(){
            var sessionValue = this.props.userWidgetID?sessionStorage.getItem(this.props.userWidgetID):'';
            var minValue = parseInt(this.props.minValue) || 0;
            var maxValue = parseInt(this.props.maxValue) || 100;
            var rateValue = parseInt(this.props.rateValue) || 1;
            var rangeValue = sessionValue || rangeValue || minValue || 0;;
            var _state = typeof __props !== 'undefined' ? __props : '';
            if(_state){
                this.props.statusSet.map(function(item,index){
                    if(item.statusField && !item.statusValue){
                        rangeValue = _state[item.statusField] || rangeValue;
                    }
                });
            }
            var widgetInfo = this.props.widgetInfo;
            var account = widgetInfo.account ? widgetInfo.account : "";
            var color = widgetInfo.color ? widgetInfo.color : "#3285ff";
            return (
                <div {...this.props} ref={this.props.ref} className={'widgetSubtraction flex '+this.props.className}>
                    <section className='flex-cell'>
                        <a className='minus-on' style={{color:color}} data-value={rangeValue} data-type='minus' onTouchEnd={this.handleClick} href="javascript:void(0)">-</a>
                    </section>
                    <section className='flex-cell'>
                        <span style={{color:color}} >{rangeValue + account}</span>
                    </section>
                    <section className='flex-cell'>
                        <a className='plus-on' style={{color:color}} data-value={rangeValue} data-type='plus' onTouchEnd={this.handleClick} href="javascript:void(0)">+</a>
                    </section>
                </div>
            );
        }
    })`
};