/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';

let ContentFatRate = React.createClass({
    render(){
        let measurementCans = '../../static/img/measurementCanvas.png';
        return (
            <div>
                <div className='content-fatRate'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{this.props.mydata}</span>%</span>
                        <img className='measurementReport-content-pic' src={measurementCans}/>
                    </div>
                </div>
                <div className='measurementReport-tips'>
                    <div className='measurementReport-tips-wrap'>
                        <dl className='measurementReport-tips-qus'>
                            <dt>脂肪率：</dt>
                            <dd>是指身体成分中，脂肪组织所占的比率。</dd>
                        </dl>
                        <dl className='measurementReport-tips-ans'>
                            <dt>改善体脂的办法，仅供参考：</dt>
                            <dd>1、少吃零食：每餐的间隔正是燃烧脂肪的大好时机,不要进食零食增进脂肪；</dd>
                            <dd>2、饭配菜：外食以五谷杂粮、米饭为主食，以蔬菜为主菜、肉类为配菜；</dd>
                            <dd>3、慎选食品：外食避免点油炸类食品，避免添加大量糖和盐等调味料；</dd>
                            <dd>4、晚餐外食以蛋白质为主：人在睡觉时,脂肪会不断累积,所以晚餐应以蛋白质为主，不宜吃脂肪含量极高的食品；</dd>
                            <dd>5、进行有氧运动：每隔一天进行有氧运动1次，每次运动30分钟左右。</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentFatRate;
