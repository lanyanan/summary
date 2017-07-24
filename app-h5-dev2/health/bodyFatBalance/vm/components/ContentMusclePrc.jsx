/**
 * Created by Administrator on 2016-08-11.
 */
/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';

let ContentMusclePrc = React.createClass({
    render(){
        let measurementCans = '../../static/img/measurementCanvas.png';
        return (
            <div>
                <div className='content-mus'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{this.props.dataMus}</span>%</span>
                        <img className='measurementReport-content-pic' src={measurementCans}/>
                    </div>
                </div>
                <div className='measurementReport-tips'>
                    <div className='measurementReport-tips-wrap'>
                        <dl className='measurementReport-tips-qus'>
                            <dt>肌肉比例：</dt>
                            <dd>肌肉比例是根据人体肌肉总量和人体体重、身高等相结合得到的人体的一个比例值.</dd>
                            <dd>这个值的范围决定一个人的身体健康状况以及力量的多少。</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentMusclePrc;
