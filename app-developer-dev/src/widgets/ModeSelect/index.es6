import React from 'react';

export let ModeSelect = {
    id: 1017,
    caption: '模式选择',
    editText:'模式选择标题',
    originCaption: '模式选择',
    fieldType: 'boolean',
    width: 120,
    height: 120,
    cssFile : '../static/widgets/ModeSelect/style.css',
    icon: '../static/img/widgets/mode-icon.png',
    iconActive: '../static/img/widgets/mode-icon-active.png',
    grid: ['text','style','interactive','size','exterior','hierarchy'],
    scheme: ['caption', 'text','show','image','multi[0]','mode'],
    prev: React.createClass({
        render: function(){
            return (
                <li className="widget widget-right">
                    <img {...this.props} src="../static/img/widgets/modeSelect.png" className="icon" />
                    <img {...this.props} src="../static/img/widgets/modeSelect-active.png" className="icon-active" />
                    <span>模式选择</span>
                </li>
            );
        }
    }),
    dom: `React.createClass({
            swiperHeight:0,
            swiperTop:0,
            swiperDomStyle:0,
            getInitialState: function(){
                var modeName = this.props.statusSet[0]?this.props.statusSet[0].statusName:'';
                return {
                    modeName:modeName,
                    modeIndex:0,
                    modeArr:[],
                    switchStatus:2,
                    show:false,
                };
            },
            componentDidMount: function() {
                var _state = typeof __props !== 'undefined' ? __props : '';
                var wid = this.props.userWidgetID,modeArr = this.state.modeArr;
                if(!_state.hiddenArray&&this.props.statusVisibility==2){
                    AppActions.init(wid);
                }
                //初始化模式数组
                if(_state){
                    this.props.statusSet.map(function(item,index){
                        if(item.statusName){
                            modeArr.push(item.statusName);
                        }
                    });
                }
                if(wid && sessionStorage.getItem(wid)){
                    var seesionValue = sessionStorage.getItem(wid);
                    var sessionState = JSON.parse(seesionValue);
                    this.setState(sessionState);
                }
                this.setState({modeArr:modeArr});
            },
            componentDidUpdate:function(){
                var sessionValue = JSON.stringify(this.state);
                if(this.props.userWidgetID){
                    sessionStorage.setItem(this.props.userWidgetID,sessionValue);
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
                this.setState({
                        newy: yvalue,
                        modetop:value
                });
            },
            endrange:function(e){
                //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
                e.stopPropagation();
                e.preventDefault();
                var newy = parseInt(this.state.newy);//滑动结束时的y值
                var oldy = parseInt(this.state.oldy);//滑动开始时的y值
                var modeName = parseInt(this.state.modeName);//上一次选中的模式名称
                var modeArr = this.state.modeArr;//可选模式数组
                var modeIndex = parseInt(this.state.modeIndex);//上次选中的模式对应数组中索引
                //向上滑
                if(newy-oldy>20){
                    var rangestep = parseInt((newy-oldy)/50)>0 ? parseInt((newy-oldy)/50) : 1;
                    modeIndex = modeIndex-rangestep;
                    modeIndex = modeIndex<0?0:modeIndex;
                    modeName = modeArr[modeIndex];
                    this.setState({
                        modeName:modeName,
                        modeIndex:modeIndex,
                        modetop:0
                    });
                };
                //向下滑
                if(newy-oldy<-20){
                    var rangestep = parseInt((oldy-newy)/50)>0 ? parseInt((oldy-newy)/50) : 1;
                    modeIndex = modeIndex+rangestep;
                    modeIndex = (modeIndex>=modeArr.length)?(modeArr.length-1):modeIndex;
                    modeName = modeArr[modeIndex];
                    this.setState({
                        modeName:modeName,
                        modeIndex:modeIndex,
                        modetop:0
                    });
                };
                this.setState({modetop:0});//重置为未拖动状态
            },
            endDefault:function(e){
                //阻止IOS上冒泡触发iscroll事件
                e.stopPropagation();
                e.preventDefault();
            },
            cancelMode:function(e){
                e.stopPropagation();
                e.preventDefault();
                //取消选择
                var switchValue = 2;
                var selectShow = false;
                this.setState({
                    switchStatus:switchValue,
                    show:selectShow
                });
            },
            submitMode:function(e){
                var modeIndex = this.state.modeIndex,
                    modeName = this.state.modeName;
                var item = this.props.eventSet[modeIndex];
                this.setState({
                    statusName:modeName,
                    show:false
                });
                var sessionValue = JSON.stringify(this.state);
                if(this.props.userWidgetID){
                    sessionStorage.setItem(this.props.userWidgetID,sessionValue);
                }
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

                // var sessionValue = JSON.stringify(this.state);
                // if(this.props.userWidgetID){
                //     sessionStorage.setItem(this.props.userWidgetID,sessionValue);
                // }
            },
            render: function() {
                var modetop = this.state.modetop || 0;
                var modeArr = this.state.modeArr;
                var modeIndex = parseInt(this.state.modeIndex);
                var switchClass = this.state.switchStatus==1?'switch-on':'switch-off';
                var show = this.state.show;

                var sessionStr = sessionStorage.getItem(this.props.userWidgetID);
                var sessionValue = sessionStr?JSON.parse(sessionStr):'';


                 var path = typeof this.props.imagePath !== 'undefined' ?
                        this.props.imagePath : 
                        sessionValue ? this.props.statusSet[sessionValue.modeIndex].bgImagePath : 
                        this.props.statusSet[0].bgImagePath;
                var _state = typeof __props !== 'undefined' ? __props : '';
                var statusName = sessionValue?sessionValue.modeName:this.props.statusSet[0].statusName;
                if(_state){
                    this.props.statusSet.map(function(item,index){
                        if(item.statusValue && item.statusValue == _state[item.statusField]){
                            path = item.bgImagePath || '';
                            statusName = item.statusName;
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
                if(this.props.styleList && this.props.styleList.image instanceof Array && !path){
                    this.props.styleList.image.map(function(item,index){
                        if(item.name=='noimage'){
                            path = JSON.parse(item.url).pictureUrl;
                        }
                    });
                }

                return (
                    <div>
                    <section {...this.props} className='widgetMode' ref={this.props.ref} onTouchEnd={this.handleClick}>
                        <img    src={path} className="widgetPic"/>
                        <p className='modeName'>{statusName}</p>
                        <span   className='triangle-bottomright'></span>
                    </section>
                       
                        <section className={'widgetModeSelect '+(show?'modeSelect-up':'modeSelect-down')} style={{display:show?'block':'none'}}>
                            <section onTouchEnd={this.cancelclock}></section>
                            <section className="modeSelect" onTouchMove={this.endDefault}>
                                <section className='selectbtn flex'>
                                    <span className='flex-cell' onTouchEnd={this.cancelMode}>取消</span>
                                    <span className='flex-cell' onTouchEnd={this.submitMode}>确定</span>
                                </section>
                                <section className='mode'>
                                    <section onTouchStart={this.startrange} onTouchMove={this.moverange} 
                                        onTouchEnd={this.endrange}  className='modeList'>
                                    </section>
                                    <p className='titleName'>{this.props.text}</p>
                                    <section className='listvalue flex-column' style={{top:modetop+'%'}}>
                                        <span className={(modeIndex-3)<0?'line4':'line1'}>{(modeIndex-3)<0?'':modeArr[modeIndex-3]}</span>
                                        <span className={(modeIndex-2)<0?'line4':'line1'}>{(modeIndex-2)<0?'':modeArr[modeIndex-2]}</span>
                                        <span className={(modeIndex-1)<0?'line4':'line2'}>{(modeIndex-1)<0?'':modeArr[modeIndex-1]}</span>
                                        <span className='line3'>{modeArr[modeIndex]}</span>
                                        <span className={(modeIndex+1)>=modeArr.length?'line4':'line2'}>{(modeIndex+1)>=modeArr.length?'':modeArr[modeIndex+1]}</span>
                                        <span className={(modeIndex+2)>=modeArr.length?'line4':'line1'}>{(modeIndex+2)>=modeArr.length?'':modeArr[modeIndex+2]}</span>
                                        <span className={(modeIndex+3)>=modeArr.length?'line4':'line1'}>{(modeIndex+3)>=modeArr.length?'':modeArr[modeIndex+3]}</span>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </div>
                );
            }
    })`
};