/**
 * Created by Administrator on 2016-08-11.
 */
/**
 * Created by Administrator on 2016-08-11.
 */


let ContentMusclePrc = React.createClass({
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
                    widthLow = '51.3%',
                        widthNor = '24.3%',
                        widthHigh = '24.3%',
                        spanL = 38,
                        spanN = 56,
                        spanH = 74
                    if (num < 38) {
                        lineColor = '#3c9fe4';
                        pos = (num / 74 * 100) + '%';

                    } else if (num <= 56 && num >= 38) {
                        lineColor = '#40db90';
                        pos = (num / 74 * 100) + '%';
                    } else if (num > 56) {
                        lineColor = '#f3ce3c';
                        pos = (num / 74 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '48.7%',
                        widthNor = '25.6%',
                        widthHigh = '25.6%',
                        spanL = 43,
                        spanN = 64,
                        spanH = 85
                    if (num < 43) {
                        lineColor = '#3c9fe4';
                        pos = (num / 85 * 100) + '%';
                    } else if (num <= 64 && num >= 43) {
                        lineColor = '#40db90';
                        pos = (num / 85 * 100) + '%';
                    } else if (num > 64) {
                        lineColor = '#f3ce3c';
                        pos = (num / 85 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '53.3%',
                        widthNor = '23.3%',
                        widthHigh = '23.2%',
                        spanL = 48,
                        spanN = 69,
                        spanH = 90
                    if (num < 42) {
                        lineColor = '#3c9fe4';
                        pos = (num / 74 * 100) + '%';
                    } else if (num <= 58 && num >= 42) {
                        lineColor = '#40db90';
                        pos = (num / 74 * 100) + '%';
                    } else if (num > 58) {
                        lineColor = '#f3ce3c';
                        pos = (num / 74 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '59%',
                        widthNor = '20.5%',
                        widthHigh = '20.5%',
                        spanL = 46,
                        spanN = 62,
                        spanH = 78
                    if (num < 46) {
                        lineColor = '#3c9fe4';
                        pos = (num / 78 * 100) + '%';
                    } else if (num <= 62 && num >= 46) {
                        lineColor = '#40db90';
                        pos = (num / 78 * 100) + '%';
                    } else if (num > 62) {
                        lineColor = '#f3ce3c';
                        pos = (num / 78 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '54.9%',
                        widthNor = '22.5%',
                        widthHigh = '22.5%',
                        spanL = 39,
                        spanN = 55,
                        spanH = 71
                    if (num < 39) {
                        lineColor = '#3c9fe4';
                        pos = (num / 71 * 100) + '%';
                    } else if (num <= 55 && num >= 39) {
                        lineColor = '#40db90';
                        pos = (num / 71 * 100) + '%';
                    } else if (num > 55) {
                        lineColor = '#f3ce3c';
                        pos = (num / 71 * 100) + '%'
                    }
                }
                if (age >= 60) {
                    widthLow = '54.6%',
                        widthNor = '22.6%',
                        widthHigh = '22.7%',
                        spanL = 41,
                        spanN = 58,
                        spanH = 75
                    if (num < 41) {
                        lineColor = '#3c9fe4';
                        pos = (num / 75 * 100) + '%';
                    } else if (num <= 58 && num >= 41) {
                        lineColor = '#40db90';
                        pos = (num / 75 * 100) + '%';
                    } else if (num > 58) {
                        lineColor = '#f3ce3c';
                        pos = (num / 75 * 100) + '%'
                    }
                }
                break;
            case 'female':
                if (age < 20 && age >= 0) {
                    widthLow = '45.3%',
                        widthNor = '27.3%',
                        widthHigh = '27.3%',
                        spanL = 35,
                        spanN = 56,
                        spanH = 77
                    if (num < 35) {
                        lineColor = '#3c9fe4';
                        pos = (num / 77 * 100) + '%';
                    } else if (num <= 56 && num >= 35) {
                        lineColor = '#40db90';
                        pos = (num / 77 * 100) + '%';
                    } else if (num > 56) {
                        lineColor = '#f3ce3c';
                        pos = (num / 77 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '47.1%',
                        widthNor = '26.4%',
                        widthHigh = '26.4%',
                        spanL = 38,
                        spanN = 58,
                        spanH = 78
                    if (num < 38) {
                        lineColor = '#3c9fe4';
                        pos = (num / 78 * 100) + '%';
                    } else if (num <= 58 && num >= 38) {
                        lineColor = '#40db90';
                        pos = (num / 78 * 100) + '%';
                    } else if (num > 58) {
                        lineColor = '#f3ce3c';
                        pos = (num / 78 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '53.2%',
                        widthNor = '23.3%',
                        widthHigh = '23.3%',
                        spanL = 48,
                        spanN = 69,
                        spanH = 90
                    if (num < 48) {
                        lineColor = '#3c9fe4';
                        pos = (num / 90 * 100) + '%';
                    } else if (num <= 69 && num >= 48) {
                        lineColor = '#40db90';
                        pos = (num / 90 * 100) + '%';
                    } else if (num > 69) {
                        lineColor = '#f3ce3c';
                        pos = (num / 90 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '55.5%',
                        widthNor = '22.2%',
                        widthHigh = '22.2%',
                        spanL = 40,
                        spanN = 56,
                        spanH = 72
                    if (num < 40) {
                        lineColor = '#3c9fe4';
                        pos = (num / 72 * 100) + '%';
                    } else if (num <= 56 && num >= 40) {
                        lineColor = '#40db90';
                        pos = (num / 72 * 100) + '%';
                    } else if (num > 56) {
                        lineColor = '#f3ce3c';
                        pos = (num / 72 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '54.8%',
                        widthNor = '22.5%',
                        widthHigh = '22.5%',
                        spanL = 39,
                        spanN = 55,
                        spanH = 71
                    if (num < 39) {
                        lineColor = '#3c9fe4';
                        pos = (num / 71 * 100) + '%';
                    } else if (num <= 55 && num >= 39) {
                        lineColor = '#40db90';
                        pos = (num / 71 * 100) + '%';
                    } else if (num > 55) {
                        lineColor = '#f3ce3c';
                        pos = (num / 71 * 100) + '%'
                    }
                }
                if (age > 60) {
                    widthLow = '52%',
                        widthNor = '23.9%',
                        widthHigh = '23.9%',
                        spanL = 35,
                        spanN = 51,
                        spanH = 67
                    if (num < 35) {
                        lineColor = '#3c9fe4';
                        pos = (num / 67 * 100) + '%';
                    } else if (num <= 51 && num >= 35) {
                        lineColor = '#40db90';
                        pos = (num / 67 * 100) + '%';
                    } else if (num > 51) {
                        lineColor = '#f3ce3c';
                        pos = (num / 67 * 100) + '%'
                    }
                }
                break;
        }
        return (
            <div>
                <div className='content-mus'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{num}</span><span>%</span></span>
                        <div className={"measurementReport-content-pic "+show}>
                            <div className='range-flex-style input-low' style={{width:widthLow}}>
                                <span style={{color:'#3c9fe4'}}>偏低</span>
                                <input className='range-low ' type='range' min='0' max='20'/>
                                <div className='input-l'><span className='input-l-l'>0</span><span
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
                            <dt>肌肉比例：</dt>
                            <dd>肌肉比例是根据人体肌肉总量和人体体重、身高等相结合得到的人体的一个比例值。</dd>
                            <dd>这个值的范围决定一个人的身体健康状况以及力量的多少。</dd>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
});

export default ContentMusclePrc;
