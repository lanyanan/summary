/**
 * Created by mindray on 2017/1/4.
 */
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
var {Router, Route, hashHistory} = ReactRouter;


// 接收app推送数据
het.repaint((data)=>{
    Actions.repaint(data);
});
/**
 * 创建 ControlFilter React组件
 * 该组件主要负责滤网的一些基本功能
 *
 */

export  class ControlFilter extends BaseComponent{

    // 构造函数，传入按钮的标题和状态
        constructor(props) {
            super(props);
            this.listenStore(Store); // 监听Store
            this.handleArrowDown =this.handleArrowDown.bind(this);
        }
        handleArrowDown(){
            Actions.controllShowOrModeOrFilterUI(1,2);
        }
        render(){
            let control_filter_state="control_filter";
            if(this.state.filterWindowState==undefined){
                this.state.filterWindowState=2;
                control_filter_state = "control_filter slide-down"
            }else if(this.state.filterWindowState==2){
                control_filter_state = "control_filter slide-down"
            }else{
                control_filter_state = "control_filter slide-up";
            }
            //整机累计耗电量
            let accDeviceKwh;
            if(this.state.accDeviceKwh==undefined){
                accDeviceKwh="- -"
            }else{
                accDeviceKwh = this.state.accDeviceKwh;
            }
            //整机累计运行时间
            let accDeviceRunTime;
            if(this.state.accDeviceRunTime==undefined){
                accDeviceRunTime = "- - "
            }else{
                accDeviceRunTime = this.state.accDeviceRunTime;
            }

            let filterRemainTime;
            let lv;
            if(this.state.filterRemainTime==undefined){
                filterRemainTime="距离下次清洁滤网还剩 - - 天";
                lv="- -"
            }else{
                let day = parseInt(this.state.filterRemainTime/24);
                let htime = this.state.filterRemainTime%24;
                filterRemainTime="距离下次清洁滤网还剩 "+day+"天 "+htime+"小时";
                lv = this.state.filterRemainTime/20+"%";
            }
            return (
                    <div className={control_filter_state}>
                        <div className="arrow_layout_control"><img  src="../static/img/home_button_down.png" onClick={this.handleArrowDown}/></div>
                        <div className="filter_item_layout_1">
                           <div className="layout_1_left">
                               <div className="title_name">清洁滤网</div>
                               <div className="clean_filter_tips">{filterRemainTime}</div>
                           </div>
                            <div className="layout_1_right">
                                <div className="title_name filter_life">{lv}</div>
                            </div>
                        </div>
                        {/*<div className="nav"></div>*/}
                        <div className="filter_item_layout_2">
                            <div className="layout2_item_1">
                                <div className="layout2_item_1_cell">
                                    <p className="runTotalTime">{accDeviceRunTime}<span className="unit">小时</span></p>
                                    <p className="filter_title">累计运行</p>
                                </div>
                                <div className="layout2_item_2_cell">
                                    <div className="total_power_consume">{accDeviceKwh}<span className="unit">KWH</span></div>
                                    <div className="filter_title">累计耗电</div>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }

}