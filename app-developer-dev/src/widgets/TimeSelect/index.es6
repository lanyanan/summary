import React from 'react';

export let TimeSelect = {
    id: 1011,
    caption: '定时',
    editText:'定时',
    originCaption: '定时',
    fieldType: 'boolean',
    width: 375,
    height: 52,
    cssFile : '../static/widgets/TimeSelect/style.css',
    icon: '../static/img/widgets/clock-icon.png',
    iconActive: '../static/img/widgets/clock-icon-active.png',
    scheme: ['caption', 'show','time', 'multi[0]','widgetStyle','tone'],
    grid: ['text','style','interactive','size','exterior','hierarchy'],
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
                    <img {...this.props} src="../static/img/widgets/calendar.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/calendar-active.png" className="icon-active" />
                    <span>定时</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
            swiperHeight:0,
            swiperTop:0,
            swiperDomStyle:0,
            getInitialState: function(){
                return {
                    hourtime:0,
                    minutetime:0,
                    hourindex:0,
                    hourarr:[],
                    minuteindex:0,
                    switchStatus:2,
                    show:false,
                    minutearr:[],
                    hourShow:true,
                    minShow:true,
                };
            },
            componentDidMount: function() {
                var _state = typeof __props !== 'undefined' ? __props : '';
                var wid = this.props.userWidgetID;
                if(!_state.hiddenArray&&this.props.statusVisibility==2){
                    AppActions.init(wid);
                }
                //初始化时间可选值数组
                this.timearrInit(this.props);
            },
            timearrInit:function(next){
                //设置时间可选值数组
                var maxhour = parseInt(next.maxhour) || 23;
                var minhour = parseInt(next.minhour) || 0;
                var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
                var maxlength = parseInt((maxhour-minhour)/hourstep);
                var hourarr = [];
                if(next.hourarray && next.hourarray instanceof Array){
                    hourarr = next.hourarray;
                    this.setState({
                        hourarr:hourarr,
                        hourtime:minhour
                    });
                }else{
                    for(var i = 0;i<=maxlength;i++){
                        var value = minhour+i*hourstep;
                        value = value<10?'0'+value:value+'';
                        hourarr.push(value);
                    }
                    maxhour = maxhour<10?'0'+maxhour:maxhour;
                    if(hourarr.indexOf(maxhour) == -1 && hourarr.indexOf(maxhour+'') == -1) hourarr.push(maxhour);
                    this.setState({
                        hourarr:hourarr,
                        hourtime:minhour
                    });
                }
                //设置默认小时
                if(next.defaulthour){
                    var index = hourarr.indexOf(next.defaulthour);
                    if(index!=-1){
                        this.setState({
                            hourtime: next.defaulthour,
                            hourindex:index
                        });
                    }
                }
                var maxminute = 59;
                var minminute = 0;
                var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
                var maxlength2 = parseInt((maxminute-minminute)/minutestep);
                var minutearr = [];
                for(var j = 0;j<=maxlength2;j++){
                    var value = minminute+j*minutestep;
                    value = value<10?'0'+value:value+'';
                    minutearr.push(value);
                }
                if(minutearr.indexOf(maxminute) == -1 && minutearr.indexOf(maxminute+'') == -1) minutearr.push(maxminute);
                this.setState({
                    minutearr:minutearr,
                    minutetime:minminute
                });
                //设置默认分钟
                if(next.defaultminute){
                    var mindex = minutearr.indexOf(next.defaultminute);
                    if(mindex!=-1){
                        this.setState({
                            minutetime: next.defaultminute,
                            minuteindex:mindex
                        });
                    }
                }
                if(next.userWidgetID && sessionStorage.getItem(next.userWidgetID)){
                    var seesionValue = sessionStorage.getItem(next.userWidgetID);
                    var sessionState = JSON.parse(seesionValue);
                    this.setState(sessionState);
                }
            },
            componentWillReceiveProps: function(next) {
                //更新时间可选值数组
                if(next.hourstep!=this.props.hourstep || next.minhour!=this.props.minhour
                    || next.maxhour!=this.props.maxhour){
                    this.timearrInit(next);
                }
            },
            startrange:function(e){
                //开始滑动时间刻度 记录初始坐标值
                e.stopPropagation();
                e.preventDefault();
                var yvalue = parseInt(e.touches[0].clientY);
                this.setState({
                    oldy: yvalue
                });
            },
            moverange:function(e){
                //滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
                e.stopPropagation();
                e.preventDefault();
                var yvalue = parseInt(e.touches[0].clientY);
                var oldy = parseInt(this.state.oldy);
                var value = (yvalue-oldy)/1.72;
                if(value>20) value=20;
                if(value<-20) value=-20;
                var type = e.target.getAttribute('data-type');
                if(type=='hour'){
                    this.setState({
                        newy: yvalue,
                        hourtop:value
                    });
                }
                if(type=='minute'){
                    this.setState({
                        newy: yvalue,
                        minutetop:value
                    });
                }
            },
            endrange:function(e){
                //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
                e.stopPropagation();
                e.preventDefault();
                var newy = parseInt(this.state.newy);//滑动结束时的y值
                var oldy = parseInt(this.state.oldy);//滑动开始时的y值
                var hour = parseInt(this.state.hourtime);//上一次选中的小时值
                var hourarr = this.state.hourarr;//小时可选值数组
                var hourindex = parseInt(this.state.hourindex);//上次选中的小时值对应数组中索引
                var minutearr = this.state.minutearr;//分钟可选值数组
                var minuteindex = parseInt(this.state.minuteindex);//上次选中的分钟值对应数组索引
                var minute = parseInt(this.state.minutetime);//上次选中的分钟值
                var hourstep = parseInt(this.props.hourstep) || 1;//小时的间隔
                var minutestep = parseInt(this.props.minutestep) || 1;//分钟的间隔
                var maxhour = parseInt(this.props.maxhour) || 23;//设置的最大小时值
                var minhour = parseInt(this.props.minhour) || 0;//设置的最小小时值
                var type = e.target.getAttribute('data-type');//滑动更改的类型
                //小时减小
                if(newy-oldy>20 && type=='hour'){
                    var rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
                    hourindex = hourindex-rangestep;
                    hourindex = hourindex<0?0:hourindex;
                    hour = hourarr[hourindex];
                    this.setState({
                        hourtime:hour,
                        hourindex:hourindex,
                        hourtop:0
                    });
                };
                //小时增加
                if(newy-oldy<-20 && type=='hour'){
                    var rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
                    hourindex = hourindex+rangestep;
                    hourindex = (hourindex>=hourarr.length)?(hourarr.length-1):hourindex;
                    hour = hourarr[hourindex];
                    this.setState({
                        hourtime:hour,
                        hourindex:hourindex,
                        hourtop:0
                    });
                };
                //分钟减小
                if(newy-oldy>20 && type=='minute'){
                    var rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
                    minuteindex = minuteindex-rangestep;
                    minuteindex = minuteindex<0?0:minuteindex;
                    minute = minutearr[minuteindex];
                    this.setState({
                        minutetime:minute,
                        minuteindex:minuteindex,
                        minutetop:0
                    });
                };
                //分钟增加
                if(newy-oldy<-20 && type=='minute'){
                    var rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
                    minuteindex = minuteindex+rangestep;
                    minuteindex = (minuteindex>=minutearr.length)?(minutearr.length-1):minuteindex;
                    minute = minutearr[minuteindex];
                    this.setState({
                        minutetime:minute,
                        minuteindex:minuteindex,
                        minutetop:0
                    });
                };
                //重置为未拖动状态
                this.setState({
                    hourtop:0,
                    minutetop:0
                });
            },
            componentDidUpdate:function(){
                var sessionValue = JSON.stringify(this.state);
                if(this.props.userWidgetID){
                    sessionStorage.setItem(this.props.userWidgetID,sessionValue);
                }
            },
            endDefault:function(e){
                //阻止IOS上冒泡触发iscroll事件
                e.stopPropagation();
                e.preventDefault();
            },
            cancelclock:function(e){
                e.stopPropagation();
                e.preventDefault();
                //取消选择
                // var wid = this.props.userWidgetID;
                // AppActions.init(wid);
                var switchValue = 2;
                var selectShow = false;
                this.setState({
                    switchStatus:switchValue,
                    show:selectShow
                });
            },
            submitclock:function(e){
                var _this = this;
                var arg={};
                if(this.props.statusSet[0].hourField) arg[this.props.statusSet[0].hourField]=this.state.hourtime;
                if(this.props.statusSet[0].minuteField) arg[this.props.statusSet[0].minuteField]=this.state.minutetime;
                if(this.props.statusSet[0].hourField || this.props.statusSet[0].minuteField){
                    AppActions.repaint(arg);
                }
                //确认提交时间
                if(this.props.eventSet instanceof Array && this.props.eventSet.length>=1){
                    var userWidgetID = this.props.userWidgetID;
                    this.props.eventSet.sort(function(a,b){return a.eventType-b.eventType;}).map(function(item,index){
                        if (item.eventType==1) {
                            item.hourValue = parseInt(this.state.hourtime);
                            item.minuteValue = parseInt(this.state.minutetime);
                            AppActions.submitTime(item);
                        }
                    }.bind(this));
                    this.setState({
                        show:false,
                    });
                }else{
                    console.log('eventSet error');
                }
            },
            handleClick:function(e){
                var swiperDom = document.querySelector('.swiper-wrapper');
                var swiperSlide = document.getElementsByClassName('swiper-slide');
                var swiperContain = document.getElementsByClassName('swiper-container');
                if(swiperSlide.length>0){
                    this.swiperHeight = swiperContain[0].style.height;
                    this.swiperTop = swiperContain[0].style.top;
                    this.swiperDomStyle = swiperDom.style.transform;

                    swiperDom.style.transform = "none";//swiper里面用了transform  导致fixed失效
                    swiperContain[0].style.height = document.body.scrollHeight+'px';
                    swiperContain[0].style.top = "0";
                    for(var i=0 ; i<swiperSlide.length;i++){
                        swiperSlide[i].style.transform = "none";
                        swiperSlide[i].className = swiperSlide[i].className + " swiper-no-swiping";
                    }
                } 
                var switchValue = this.state.switchStatus==1?2:1;
                var selectShow = switchValue==1?true:false;
                this.setState({
                    switchStatus:switchValue,
                    show:selectShow
                });
            },
            render: function() {
                var maxhour = parseInt(this.props.maxhour) || 23;
                var minhour = parseInt(this.props.minhour) || 0;
                var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow)===false ? false : true;
                var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow)===false ? false : true;
                if(!hourshow && !minuteshow) hourshow = true;
                var hourstep = parseInt(this.props.hourstep) || 1;
                var minutestep = parseInt(this.props.minutestep) || 1;
                var selecttitle = this.props.timeTitle || '设置时间';
                var statusname = this.props.statusname || '';
                var hour = this.state.hourtime || '0';
                hour=parseInt(hour)>maxhour?maxhour:parseInt(hour);
                hour=hour<minhour?minhour:hour;
                var minute = this.state.minutetime || '0';
                minute=parseInt(minute)>59?59:parseInt(minute);
                minute=minute<0?0:minute;
                var hourtop = this.state.hourtop || 0;
                var minutetop = this.state.minutetop || 0;
                var hourarr = this.state.hourarr;
                var hourindex = parseInt(this.state.hourindex);
                var minutearr = this.state.minutearr;
                var minuteindex = parseInt(this.state.minuteindex);
                var timeClass = this.state.switchStatus==1?'time-on':'time-off';
                var show = this.state.show;
                var hourstatus = 0,minutestatus = 0;
                var swiperContain = document.getElementsByClassName('swiper-container');
                var _state = typeof __props !== 'undefined' ? __props : '';
                if(_state){//这个计时的没法改 计时完成没有标识,根本无法判断
                    this.props.statusSet.map(function(item,index){
                        if(item.hourField){
                            hourstatus = _state[item.hourField] || 0;
                            if(_state[item.hourField]){
                                console.log("小时")
                            }
                        }
                        if(item.minuteField){
                            minutestatus = _state[item.minuteField] || 0;
                            if(_state[item.minuteField]){
                                console.log("分钟")
                            }
                        }
                    });
                }
                if(!this.state.show){//放入选项卡时 受swiper transform影响bug修复
                    var swiperContain = document.querySelector('.swiper-container');
                    var swiperSlide = document.getElementsByClassName('swiper-slide');
                    var swiperDom = document.querySelector('.swiper-wrapper');
                    if(swiperContain && this.swiperHeight) {
                        swiperContain.style.height = this.swiperHeight;//swiper高度还原
                        swiperContain.style.top = this.swiperTop;
                        swiperDom.style.transform = this.swiperDomStyle;
                        if(swiperSlide){
                            for(var i=0 ; i<swiperSlide.length;i++){
                                swiperSlide[i].className = swiperSlide[i].className.replace(" swiper-no-swiping","") ;
                            }
                        }
                    }
                }
                var widgetInfo = this.props.widgetInfo || {};
                var timeStyle = widgetInfo.timeStyle ? widgetInfo.timeStyle : 0;
                var bgColor = null;
                if(timeClass == 'time-on'){
                    bgColor = this.props.style.color;
                }
                return (
                    <div>
                    <div {...this.props}>
                    <section className='timeInfo flex'>
                        <span className='flex-cell'>{selecttitle||'定时预约'}</span>
                        <span className='flex-cell'>
                            <label>{this.state.switchStatus==1?hourstatus:''}</label>
                            <label>{this.state.switchStatus==1?':':''}</label>
                            <label>{this.state.switchStatus==1?minutestatus:''}</label>
                        </span>
                        <span className='flex-cell'>
                            <div onTouchEnd={this.handleClick} className={"timeSwitch "+timeClass+" timeStyle"+timeStyle}>
                            {timeStyle==0 ?
                                <div className="time-normal">
                                    <span className={timeClass} style={{background:bgColor,borderColor:bgColor}}>
                                        <em></em>
                                    </span>
                                </div>
                                :
                                <div className="time-xi">
                                    <span className={timeClass}>
                                        <em  style={{background:bgColor,borderColor:bgColor}}></em>
                                    </span>
                                </div>
                            }
                            </div>
                        </span>
                    </section>
                    </div>
                    <section className={'timeSelect '+(show?'timeSelect-up':'timeSelect-down')} style={{display:show?'block':'none'}}>
                        <section onTouchEnd={this.cancelclock}></section>
                        <section className="timeselect" onTouchMove={this.endDefault}>
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
                                    <span className='hour' style={{left:minuteshow?33+'%':53+'%',display:hourshow?'inline-block':'none'}}>时</span>
                                    <span className='minute' style={{display:minuteshow?'inline-block':'none',left:hourshow?66+'%':53+'%'}}>分</span>
                                    <span className='status'>{statusname}</span>
                                </section>
                                <section className='hourvalue flex-column' style={{top:hourtop+'%',left:minuteshow?25+'%':45+'%',display:hourshow?'':'none'}}>
                                    <span className={(hourindex-3)<0?'line4':'line1'}>{(hourindex-3)<0?'':hourarr[hourindex-3]}</span>
                                    <span className={(hourindex-2)<0?'line4':'line1'}>{(hourindex-2)<0?'':hourarr[hourindex-2]}</span>
                                    <span className={(hourindex-1)<0?'line4':'line2'}>{(hourindex-1)<0?'':hourarr[hourindex-1]}</span>
                                    <span className='line3'>{hourarr[hourindex]}</span>
                                    <span className={(hourindex+1)>=hourarr.length?'line4':'line2'}>{(hourindex+1)>=hourarr.length?'':hourarr[hourindex+1]}</span>
                                    <span className={(hourindex+2)>=hourarr.length?'line4':'line1'}>{(hourindex+2)>=hourarr.length?'':hourarr[hourindex+2]}</span>
                                    <span className={(hourindex+3)>=hourarr.length?'line4':'line1'}>{(hourindex+3)>=hourarr.length?'':hourarr[hourindex+3]}</span>
                                </section>
                                <section  className='minutevalue flex-column' style={{top:minutetop+'%',display:minuteshow?'':'none',left:hourshow?58+'%':45+'%'}}>
                                    <span className={(minuteindex-3)<0?'line4':'line1'}>{(minuteindex-3)<0?'':minutearr[minuteindex-3]}</span>
                                    <span className={(minuteindex-2)<0?'line4':'line1'}>{(minuteindex-2)<0?'':minutearr[minuteindex-2]}</span>
                                    <span className={(minuteindex-1)<0?'line4':'line2'}>{(minuteindex-1)<0?'':minutearr[minuteindex-1]}</span>
                                    <span className='line3'>{minutearr[minuteindex]}</span>
                                    <span className={(minuteindex+1)>=minutearr.length?'line4':'line2'}>{(minuteindex+1)>=minutearr.length?'':minutearr[minuteindex+1]}</span>
                                    <span className={(minuteindex+2)>=minutearr.length?'line4':'line1'}>{(minuteindex+2)>=minutearr.length?'':minutearr[minuteindex+2]}</span>
                                    <span className={(minuteindex+3)>=minutearr.length?'line4':'line1'}>{(minuteindex+3)>=minutearr.length?'':minutearr[minuteindex+3]}</span>
                                </section>
                            </section>
                            <section className='selectbtn flex'>
                                <span className='flex-cell' onTouchEnd={this.cancelclock}>取消</span>
                                <span className='flex-cell' onTouchEnd={this.submitclock}>确定</span>
                            </section>
                        </section>
                    </section>
                    </div>
                );
            }
    })`
};