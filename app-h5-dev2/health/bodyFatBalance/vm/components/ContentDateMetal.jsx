/**
 * Created by Administrator on 2016-08-11.
 */
/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';

let ContentDateMetal = React.createClass({
    render(){
        let measurementCans = '../../static/img/measurementCanvas.png';
        return (
            <div>
                <div className='content-metal'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{this.props.dataMe}</span>%</span>
                        <img className='measurementReport-content-pic' src={measurementCans}/>
                    </div>
                </div>
                <div className='measurementReport-tips'>
                    <div className='measurementReport-tips-wrap'>
                        <dl className='measurementReport-tips-qus'>
                            <dt>基础代谢率：</dt>
                            <dd>基础代谢率（BMR）是指人体在清醒而又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。</dd>
                            <dd>婴儿时期，因为身体组织生长旺盛，基础代谢率最高，以后随着年龄的增长而逐渐降低。</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentDateMetal;
