'use strict';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {TimeSelect} from '../../../common/src/TimeSelect.es6';
import {Store} from './Store.es6';

export class Editing extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {timeshow:false,divIndex:-1,modArr:[12,0,0,0,0,0,1,0],deviceStatus:4,deviceModeIndexThree:5,cbeauty_steamFace_set:'set',smartModeSwitch:0,maxminute:1,textShow:"none",};
        this.listenStore(Store); // 监听Store
        //Actions.pushGuiderData(); // 请求推送向导数据
    }
    componentDidMount(){
        het.toast('cbeauty_steamFace_set');
        //document.querySelector("#set_nav").click();
        document.body.scrollTop = 0;
        Actions.setEditing('return');
    }
    componentWillUnmount(){
        het.toast('cbeauty_steamFace_save');
        //document.querySelector("#set_nav_save").click();
    }
    componentDidUpdate(){
        if(this.state.onlineStatus==2 || this.state.deviceStatus==2){
            // document.querySelector("#set_nav_save").click();
            history.back();
            het.toast('cbeauty_steamFace_save');
        }
    }
    //时间组件中 取消提交按钮
    cancelClock(){
        this.setState({
            timeshow:false
        });
        // Actions.clockSwitch();
    }
    //时间组件中 编辑提交按钮
    submitClock(h,m){      
        let items = this.state.myAllTime || [12,0,0,0,0,0,1,0];
        let index = this.state.divIndex;
        items = JSON.parse(JSON.stringify(items));
        items[index] = m*12;
        items[6] = parseInt((items[0]+items[1]+items[2]+items[3]+items[4]+items[5])/12);
        items[7] = (items[0]+items[1]+items[2]+items[3]+items[4]+items[5])*5-items[6]*60; 
        let totalminute = items[6]-m;
        if(m>15-totalminute){
            Actions.showMaxminute(-1);
            return;
        }else{
            this.setState({
                timeshow:false,
                myAllTime:items,
                maxminute:items[6],
            });
        }
    }
    //编辑页面中 编辑按钮
    divTouchShow(e){        
        let index = e.target.getAttribute('data-index');
        if(15-this.state.maxminute<=0 && this.state.myAllTime[index]<=0){
            Actions.showMaxminute(15-this.state.maxminute);
        }else{
            this.setState({
                timeshow:true,
                divIndex:index
            });
        }
    }
    //选择好全部时间后的 确定 按钮
    SetTimeFromApp(){
        let items = this.state.myAllTime || [12,0,0,0,0,0,1,0];      
        Actions.setTimeFromApp(items);
    }
 render(){
    let  items =  this.state.myAllTime || [12,0,0,0,0,0,1,0];
    //总时间
    let  allTime = (items[0]+items[1]+items[2]+items[3]+items[4]+items[5])/12;
    let deviceModeIndexThree = this.state.deviceModeIndexThree;
    return(
           <div className="div_box">
                    {/*<div style={{width:'100%',height:'64px',backgroundColor:'red',marginBottom:'64px'}}></div>*/}
                    <div className="div-info">
                         {/*....................................left图标位置begin..............................................*/}
                        <div className="div_box_lef">
                            <div className="div_hot_img"></div>
                            <div className="vertical"></div>
                            <div className="div_cold_img"></div>
                            <div className="vertical"></div>
                            <div className="div_hot_img"></div>
                            <div className="vertical"></div>
                            <div className="div_cold_img"></div>
                            <div className="vertical"></div>
                            <div className="div_hot_img"></div>
                            <div className="vertical"></div>
                            <div className="div_cold_img"></div>
                        </div>
                         {/*....................................left图标位置end..............................................*/}
                        {/*......................................right文字begin............................................*/}
                        <div className="div_box_right">
                            {items.map(function(item,index){
                               return(
                                        <div style={{display:index==6 ||  index==7 ?'none':'inline-block'}} className={"div_operation "+(index===0?'div_operation0':"" || index===5?'div_operation5':"") }>
                                            <div className="div_time">
                                                <span className="span_text" >{index%2==0 ? '热喷' : '冷喷'}</span><br/>
                                                <span className="span_time"  >{(item/12).toFixed(1)}  min</span>
                                            </div>
                                            <div data-index={index} className="div_editing" onTouchEnd={this.divTouchShow.bind(this)}>编辑</div>
                                        </div>
                                    );

                            }.bind(this))}
                        </div>
                         {/*.....................................right文字begin.............................................*/}
                    </div>
                     <div className="duration">
                        <span className="span_6">总时长:{allTime}&nbsp;min</span><br/>
                        <span className="span_9">提示：总时长在1-15min之间</span>
                        <span className="p_ok" onTouchEnd={this.SetTimeFromApp.bind(this)}>确定</span>
                     </div>
                    {/*.................................................编辑时间................................................*/}
                    <a id='set_nav' style={{opacity:0,width:0,height:0,display:'block'}} href="cbeauty://cbeauty_steamFace_set"></a>
                   <TimeSelect title="设置时间" hourshow={false} minuteshow={true} cancelClock={this.cancelClock.bind(this)} ArrayInit={true}
                                      submitClock={this.submitClock.bind(this)}  statusname=" " show={this.state.timeshow} maxminute={15} />
        </div>
        );
 }

}




