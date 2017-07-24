/**
 * Created by yuanyunlong on 2017/1/6.
 */
import React from 'react'

export class WorkingLoadingAnimation extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){

        let workName = this.props.name ;
        let leftTimeALLMinte = this.props.leftTime || '90';
        let leftTimeHour =parseInt(parseInt(leftTimeALLMinte)/60) ;
        if(leftTimeHour<10){
            leftTimeHour = "0"+ String(leftTimeHour) ;
        }
        let leftTimeMinte = parseInt(leftTimeALLMinte)%60;
        if(leftTimeMinte<10){
            leftTimeMinte = "0"+ String(leftTimeMinte);
        }
        let leftTime = leftTimeHour + ':' + leftTimeMinte;
        let leftAlertTile = '剩余时间';
        let width = window.screen.width * 0.285;

        return (<div className="WorkingLoading flex" >
            <img src="../static/image/work/workingQuanquan.png" />
                <div className="workName">{workName}</div>
                <div className="leftTime">{leftTime}</div>
                <div className="leftalert">{leftAlertTile}</div>
        </div>);
    }
};