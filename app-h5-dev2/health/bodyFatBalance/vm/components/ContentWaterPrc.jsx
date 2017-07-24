/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';

let ContentWaterPrc = React.createClass({
    render(){
        let measurementCans = '../../static/img/measurementCanvas.png';
        return (
            <div>
                <div className='content-waterPrc'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{this.props.dataWa}</span>%</span>
                        <img className='measurementReport-content-pic' src={measurementCans}/>
                    </div>
                </div>
                <div className='measurementReport-tips'>
                    <div className='measurementReport-tips-wrap'>
                        <dl className='measurementReport-tips-qus'>
                            <dt>水分：</dt>
                            <dd>是指身体水分占体重的百分比。</dd>
                            <dd>
                                一个成年人体内的含水量约占人体重的65%左右。人在自己一生的生命活动过程中,随着年龄的增长,体内的含水分量也逐渐的减少。在婴儿时期,体内含水量可达72%,到了成年时期,水的含水量降到65%左右。
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentWaterPrc;
