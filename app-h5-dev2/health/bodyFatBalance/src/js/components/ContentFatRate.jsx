/**
 * Created by Administrator on 2016-08-11.
 */
//value={0<(this.props.mydata) <16 ?this.props.mydata:''}
//value={16<=(this.props.mydata) <=22 ?this.props.mydata:''}
//value={22<(this.props.mydata) <=30 ?this.props.mydata:''}
//value={30<(this.props.mydata) <=50 ?this.props.mydata:''}
let ContentFatRate = React.createClass({

    render(){
        let num = this.props.mydata, show,
            age = this.props.myage,
            gender = this.props.mygender,
            widthLow = '32%', widthNor = '32%', widthHigh = '32%',
            spanL, spanN, spanH, lineColor, pos;
        show = gender ? ' ' : 'hiding';
        switch (gender) {
            case 'male':
                if (age < 20 && age >= 0) {
                    widthLow = '17.5%',
                        widthNor = '20%',
                        widthHigh = '62.4%',
                        spanL = 12,
                        spanN = 20,
                        spanH = 45
                    if (num < 12) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';

                    } else if (num <= 20 && num >= 12) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 20) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '20%',
                        widthNor = '20%',
                        widthHigh = '59.9%',
                        spanL = 13,
                        spanN = 21 ,
                        spanH = 45
                    if (num < 13) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';

                    } else if (num <= 21 && num >= 13) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 21) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '25%',
                        widthNor = '20%',
                        widthHigh = '54.9%',
                        spanL = 15,
                        spanN = 23 ,
                        spanH = 45
                    if (num < 15) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 23 && num >= 15) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 23) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '27.5%',
                        widthNor = '20%',
                        widthHigh = '52.4%',
                        spanL = 16,
                        spanN = 24,
                        spanH = 45
                    if (num < 16) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 24 && num >= 16) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 24) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '30%',
                        widthNor = '20%',
                        widthHigh = '49.9%',
                        spanL = 17,
                        spanN = 25,
                        spanH = 45
                    if (num < 17) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 25 && num >= 17) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 25) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age >= 60) {
                    widthLow = '32.5%',
                        widthNor = '20%',
                        widthHigh = '47.4%',
                        spanL = 18,
                        spanN = 26,
                        spanH = 45
                    if (num < 189) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 26 && num >= 18) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 34) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                break;
            case 'female':
                if (age < 30 && age >= 0) {
                    widthLow = '30%',
                        widthNor = '20%',
                        widthHigh = '49.9%',
                        spanL = 17,
                        spanN = 25,
                        spanH = 45
                    if (num < 17) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 25 && num >= 17) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 25) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age < 40 && age >= 30) {
                    widthLow = '35%',
                        widthNor = '20%',
                        widthHigh = '44.9%',
                        spanL = 19,
                        spanN = 27 ,
                        spanH = 45
                    if (num < 19) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 27 && num >= 19) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 27) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '37.5%',
                        widthNor = '20%',
                        widthHigh = '42.4%',
                        spanL = 20,
                        spanN = 28,
                        spanH = 45
                    if (num < 20) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 28 && num >= 20) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 28) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                if (age > 50) {
                    widthLow = '40%',
                        widthNor = '20%',
                        widthHigh = '39.9%',
                        spanL = 21,
                        spanN = 29 ,
                        spanH = 45
                    if (num < 21) {
                        lineColor = '#3c9fe4';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num <= 29 && num >= 21) {
                        lineColor = '#40db90';
                        pos = ((num - 5) / 40 * 100) + '%';
                    } else if (num > 29) {
                        lineColor = '#f3ce3c';
                        pos = ((num - 5) / 40 * 100) + '%'
                    }
                }
                break;
        }
        return (
            <div>
                <div className='content-fatRate'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{num}</span><span>%</span></span>
                        <div className={"measurementReport-content-pic "+ show}>
                            <div className='range-flex-style input-low' style={{width:widthLow}}>
                                <span style={{color:'#3c9fe4'}}>偏低</span>
                                <input className='range-low ' type='range' min='0' max='20'/>
                                <div className='input-l'><span className='input-l-l'>5</span><span
                                    className='input-l-r'>{spanL}</span></div>
                            </div>
                            <div className='range-flex-style input-normal' style={{width:widthNor}}>
                                <span style={{color:'#40db90'}}>正常</span>
                                <input className='range-normal' type='range' min='20' max='40'/>
                                <div className='inputBottom'><span className='input-nor-span'>{spanN}</span></div>
                            </div>
                            <div className='range-flex-style input-high' style={{width:widthHigh}}>
                                <span style={{color:'#f3ce3c'}}>偏高</span>
                                <input className='range-high' type='range' min='40' max='60'/>
                                <div className='inputBottom'><span className='input-high-span'>{spanH}</span></div>
                            </div>
                            <div id='fixLine' style={{background:lineColor,left:pos}}></div>
                        </div>
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
