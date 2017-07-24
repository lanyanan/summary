/**
 * Created by yuanyunlong on 2017/1/6.
 */
import React from 'react'

export class WorkingLoadingAnimation extends React.Component {
    constructor(props) {
        super(props);

    }



    render(){

        let workName = '浸泡';
        let leftTime = '01:30';
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