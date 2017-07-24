'use strict';
import {Actions} from './Actions.es6';





export const editing = React.createClass({
    //初始变量
    getInitialState: function(){
        return {
            timeshow:false,
            deviceStatus:2,
            onOff:1,
            smartModeSwitch:1,
            deviceMode:3,
            modeName:2,
            timeshow:false,
            divIndex:-1
        };
    },

    cancelClock(){
            Actions.clockSwitch();
    },

    submitClock(m){
            Actions.selectTime(m);
        },

     divTouchShow(e){
        this.setState({
            timeshow:true
        });
        let index = e.target.getAttribute('data-index');
        Actions.addMinue(index);
    },

    SetTimeFromApp(){
        Actions.setTimeFromApp();
    },
 render(){
    let items = [1,2,3,4,5,6,];
    return(
           <div className="div_box">
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
                            {this.items.map(function(e,index){
                                return(
                                        <div className={"div_operation "+(index===0?'div_operation0':"" || index===5?'div_operation5':"") }>
                                            <div className="div_time"><span className="span_text">热喷</span><br/><span className="span_time">{timeArr[index]} min</span></div>
                                            <div data-index={index} className="div_editing" onTouchStart={this.divTouchShow}>编辑</div>
                                        </div>
                                    );

                            }.bind(this))}
                        </div>
                         {/*.....................................right文字begin.............................................*/}
                    </div>
                     <div className="duration">
                        <span className="span_6">总时长：13min</span><br/>
                        <span className="span_9">提示：总时长在1-15min之间</span>
                        <span className="p_ok" onTouchEnd={this.SetTimeFromApp}>确定</span>
                     </div>
                    {/*.................................................编辑时间................................................*/}
                    
                    <TimeSelect title="设置时间" hourshow={false} minuteshow={true} cancelClock={this.cancelClock}
                    submitClock={this.submitClock}  statusname=" " show={timeshow}/> 
                    
        </div> 
        );
 }

});




