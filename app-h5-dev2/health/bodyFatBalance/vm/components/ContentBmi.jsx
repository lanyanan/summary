/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';

let ContentBmi = React.createClass({
    render(){
        let measurementCans = '../../static/img/measurementCanvas.png';
        return (
            <div>
                <div className='content-bmi'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{this.props.mydata}</span>%</span>
                        <img className='measurementReport-content-pic' src={measurementCans}/>
                    </div>
                </div>
                <div className='measurementReport-tips'>
                    <div className='measurementReport-tips-wrap'>
                        <dl className='measurementReport-tips-qus'>
                            <dt>BMI：</dt>
                            <dd>BMI是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</dd>
                            <dd>主要用于统计用途，当我们需要比较及分析一个人的体重对于不同高度的人所带来的健康影响时，BMI值是一个中立而可靠的指标。
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentBmi;
