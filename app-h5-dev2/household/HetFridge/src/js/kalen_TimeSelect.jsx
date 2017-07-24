/**
 * Created by ben on 2017/2/28.
 */
'use strict';

export const TimeSelect = React.createClass({
    getInitialState: function(){
        return {
            hourtime:0,
            minutetime:0,
            hourindex:0,
            hourarr:[],
            minuteindex:0,
            minutearr:[],
            showOpacity:0,
            timeDisplay:false,
            resetTimer:null,
        };
    },
    componentDidMount: function() {
        //初始化时间可选值数组
        this.timearrInit(this.props);
    },
    timearrInit:function(next){


    },
    componentWillReceiveProps: function(next) {
        var showOpacity = this.state.showOpacity;
        if(next.show != this.props.show){
            if(next.show == true){
                this.setState({timeDisplay:true});
                clearInterval(this.timr);
                this.timr = setInterval(function(){
                    showOpacity += 1;
                    if(showOpacity>=1){
                        clearInterval(this.timr);
                        this.setState({showOpacity:showOpacity});
                    }
                }.bind(this),10)
            }else if(next.show == false){
                clearInterval(this.timr);
                this.timr = setInterval(function(){
                    showOpacity -= 1;
                    // console.log('1',showOpacity,parseInt(showOpacity));
                    if(showOpacity<=0){
                        clearInterval(this.timr);
                        this.setState({timeDisplay:false});
                        this.setState({showOpacity:showOpacity});
                    }
                }.bind(this),30)
            }
        }
    },
    cancelclock:function(e){
        //取消选择
        if(typeof this.props.cancelClock === 'function'){
            this.props.cancelClock();
            let hourValue = this.state.hourarr[0];
            let minuteValue = this.state.minutearr[0];
            let me = this;
            me.setState({
                hourtime:hourValue,
                minutetime:minuteValue,
                hourindex:0,
                minuteindex:0
            });
        }else{
            console.log('error:the cancel callback is not a function');
        }
    },
    render: function() {
        let selecttitle = '事件选择';
        let minuteshow = true;
        let hourshow = true;
        let statusshow = true;

        let hourtop = this.state.hourtop || 0;
        let minutetop = this.state.minutetop || 0;

        let hourarr = this.state.hourarr;
        let hourindex = parseInt(this.state.hourindex);
        let minutearr = this.state.minutearr;
        let minuteindex = parseInt(this.state.minuteindex);
        let hourunit = this.props.hourunit || '时';
        let minuteunit = this.props.minuteunit || '分';
        minuteindex = hourindex ==14 ? 0:minuteindex;
        return (
            <section ref="selecter" style={{display:this.state.timeDisplay?'block':'none',opacity:this.state.showOpacity}} ref='timeSelect' className='timeSelect'>
                <section onTouchEnd={this.cancelclock}></section>
                <section className="timeselect" onTouchMove={this.endDefault}>
                    <section className='selectbtn flex'>
                        <span className='flex-cell' onTouchEnd={this.cancelclock}>取消</span>
                        <span className='flex-cell' onTouchEnd={this.submitclock}>确定</span>
                    </section>
                    <section className='selecttitle'>
                        <span className='title'>{selecttitle}</span>
                    </section>
                    <section className='time'>
                        <section data-type='hour' style={{width:minuteshow?'50%':'100%',display:hourshow?'inline-block':'none'}}
                                 onTouchStart={this.startrange} onTouchMove={this.moverange}
                                 onTouchEnd={this.endrange}  className='hour'>
                        </section>
                        <section  data-type='minute' style={{display:minuteshow?'inline-block':'none',width:hourshow?'50%':'100%',left:hourshow?'50%':'0%'}}
                                  onTouchStart={this.startrange} onTouchMove={this.moverange}
                                  onTouchEnd={this.endrange} className='minute'>
                        </section>
                        <section className='timetext'>
                            <span style={{left:4+'%'}} className={statusshow?'status show':'status'}>{'电炖锅将在'}</span>
                            <span className='hour' style={{left:minuteshow?38+'%':56+'%',display:hourshow?'inline-block':'none'}}>{hourunit}</span>
                            <span className='minute' style={{display:minuteshow?'inline-block':'none',left:hourshow?66+'%':53+'%'}}>{minuteunit}</span>
                            <span className={statusshow?'status show':'status'}>{'后结束'||statusname}</span>
                        </section>
                        <section className='hourvalue flex-column' style={{top:hourtop+'%',left:minuteshow?30+'%':45+'%',display:hourshow?'block':'none'}}>
                            <span className={(hourindex-3)<0?'line4':'line1'}>{(hourindex-3)<0?'':hourarr[hourindex-3]}</span>
                            <span className={(hourindex-2)<0?'line4':'line1'}>{(hourindex-2)<0?'':hourarr[hourindex-2]}</span>
                            <span className={(hourindex-1)<0?'line4':'line2'}>{(hourindex-1)<0?'':hourarr[hourindex-1]}</span>
                            <span className='line3'>{hourarr[hourindex]}</span>
                            <span className={(hourindex+1)>=hourarr.length?'line4':'line2'}>{(hourindex+1)>=hourarr.length?'':hourarr[hourindex+1]}</span>
                            <span className={(hourindex+2)>=hourarr.length?'line4':'line1'}>{(hourindex+2)>=hourarr.length?'':hourarr[hourindex+2]}</span>
                            <span className={(hourindex+3)>=hourarr.length?'line4':'line1'}>{(hourindex+3)>=hourarr.length?'':hourarr[hourindex+3]}</span>
                        </section>
                        <section  className='minutevalue flex-column' style={{top:minutetop+'%',display:minuteshow?'block':'none',left:hourshow?58+'%':40+'%'}}>
                            <span className={(minuteindex-3)<0?'line4':'line1'}>{(minuteindex-3)<0?'':minutearr[minuteindex-3]}</span>
                            <span className={(minuteindex-2)<0?'line4':'line1'}>{(minuteindex-2)<0?'':minutearr[minuteindex-2]}</span>
                            <span className={(minuteindex-1)<0?'line4':'line2'}>{(minuteindex-1)<0?'':minutearr[minuteindex-1]}</span>
                            <span className='line3'>{minutearr[minuteindex]}</span>
                            <span className={(minuteindex+1)>=minutearr.length?'line4':'line2'}>{(minuteindex+1)>=minutearr.length?'':minutearr[minuteindex+1]}</span>
                            <span className={(minuteindex+2)>=minutearr.length?'line4':'line1'}>{(minuteindex+2)>=minutearr.length?'':minutearr[minuteindex+2]}</span>
                            <span className={(minuteindex+3)>=minutearr.length?'line4':'line1'}>{(minuteindex+3)>=minutearr.length?'':minutearr[minuteindex+3]}</span>
                        </section>
                    </section>
                </section>
            </section>
        );
    }
});