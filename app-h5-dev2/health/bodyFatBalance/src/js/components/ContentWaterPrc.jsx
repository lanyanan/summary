/**
 * Created by Administrator on 2016-08-11.
 */


let ContentWaterPrc = React.createClass({
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
                    widthLow = '50%',
                        widthNor = '25%',
                        widthHigh = '25%',
                        spanL = 46,
                        spanN = 69,
                        spanH = 92
                    if (num < 46) {
                        lineColor = '#3c9fe4';
                        pos = (num / 92 * 100) + '%';

                    } else if (num <= 69 && num >= 46) {
                        lineColor = '#40db90';
                        pos = (num / 92 * 100) + '%';
                    } else if (num > 69) {
                        lineColor = '#f3ce3c';
                        pos = (num / 92 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '53.3%',
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
                if (age < 40 && age > 30) {
                    widthLow = '49.5%',
                        widthNor = '25.2%',
                        widthHigh = '25.2%',
                        spanL = 45,
                        spanN = 68,
                        spanH = 91
                    if (num < 45) {
                        lineColor = '#3c9fe4';
                        pos = (num / 91 * 100) + '%';
                    } else if (num <= 68 && num >= 45) {
                        lineColor = '#40db90';
                        pos = (num / 91 * 100) + '%';
                    } else if (num > 68) {
                        lineColor = '#f3ce3c';
                        pos = (num / 91 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '45.1%',
                        widthNor = '27.4%',
                        widthHigh = '27.4%',
                        spanL = 43,
                        spanN = 69,
                        spanH = 95
                    if (num < 43) {
                        lineColor = '#3c9fe4';
                        pos = (num / 95 * 100) + '%';
                    } else if (num <= 69 && num >= 43) {
                        lineColor = '#40db90';
                        pos = (num / 95 * 100) + '%';
                    } else if (num > 69) {
                        lineColor = '#f3ce3c';
                        pos = (num / 95 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '49.4%',
                        widthNor = '25.3%',
                        widthHigh = '25.3%',
                        spanL = 43,
                        spanN = 65,
                        spanH = 87
                    if (num < 43) {
                        lineColor = '#3c9fe4';
                        pos = (num / 87 * 100) + '%';
                    } else if (num <= 65 && num >= 43) {
                        lineColor = '#40db90';
                        pos = (num / 87 * 100) + '%';
                    } else if (num > 65) {
                        lineColor = '#f3ce3c';
                        pos = (num / 87 * 100) + '%'
                    }
                }
                if (age >= 60) {
                    widthLow = '45.7%',
                        widthNor = '26.1%',
                        widthHigh = '26.1%',
                        spanL = 42,
                        spanN = 68,
                        spanH = 92
                    if (num < 42) {
                        lineColor = '#3c9fe4';
                        pos = (num / 92 * 100) + '%';
                    } else if (num <= 68 && num >= 42) {
                        lineColor = '#40db90';
                        pos = (num / 92 * 100) + '%';
                    } else if (num > 68) {
                        lineColor = '#f3ce3c';
                        pos = (num / 92 * 100) + '%'
                    }
                }
                break;
            case 'female':
                if (age < 20 && age >= 0) {
                    widthLow = '46.1%',
                        widthNor = '26.9%',
                        widthHigh = '26.9%',
                        spanL = 43,
                        spanN = 68,
                        spanH = 93
                    if (num < 43) {
                        lineColor = '#3c9fe4';
                        pos = (num / 93 * 100) + '%';
                    } else if (num <= 68 && num >= 43) {
                        lineColor = '#40db90';
                        pos = (num / 93 * 100) + '%';
                    } else if (num > 68) {
                        lineColor = '#f3ce3c';
                        pos = (num / 93 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '47.1%',
                        widthNor = '26.4%',
                        widthHigh = '26.4%',
                        spanL = 43,
                        spanN = 67,
                        spanH = 91;
                    if (num < 43) {
                        lineColor = '#3c9fe4';
                        pos = (num / 91 * 100) + '%';
                    } else if (num <= 67 && num >= 43) {
                        lineColor = '#40db90';
                        pos = (num / 91 * 100) + '%';
                    } else if (num > 67) {
                        lineColor = '#f3ce3c';
                        pos = (num / 91 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '40.7%',
                        widthNor = '29.6%',
                        widthHigh = '29.6%',
                        spanL = 40,
                        spanN = 69,
                        spanH = 98
                    if (num < 40) {
                        lineColor = '#3c9fe4';
                        pos = (num / 98 * 100) + '%';
                    } else if (num <= 69 && num >= 40) {
                        lineColor = '#40db90';
                        pos = (num / 98 * 100) + '%';
                    } else if (num > 69) {
                        lineColor = '#f3ce3c';
                        pos = (num / 98 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '44.5%',
                        widthNor = '27.7%',
                        widthHigh = '27.7%',
                        spanL = 42,
                        spanN = 68,
                        spanH = 94
                    if (num < 42) {
                        lineColor = '#3c9fe4';
                        pos = (num / 94 * 100) + '%';
                    } else if (num <= 68 && num >= 42) {
                        lineColor = '#40db90';
                        pos = (num / 94 * 100) + '%';
                    } else if (num > 68) {
                        lineColor = '#f3ce3c';
                        pos = (num / 94 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '47.7%',
                        widthNor = '26.1%',
                        widthHigh = '26.1%',
                        spanL = 42,
                        spanN = 65,
                        spanH = 88
                    if (num < 42) {
                        lineColor = '#3c9fe4';
                        pos = (num / 88 * 100) + '%';
                    } else if (num <= 65 && num >= 42) {
                        lineColor = '#40db90';
                        pos = (num / 88 * 100) + '%';
                    } else if (num > 65) {
                        lineColor = '#f3ce3c';
                        pos = (num / 88 * 100) + '%'
                    }
                }
                if (age > 60) {
                    widthLow = '47.1%',
                        widthNor = '26.4%',
                        widthHigh = '26.4%',
                        spanL = 41,
                        spanN = 64,
                        spanH = 87
                    if (num < 41) {
                        lineColor = '#3c9fe4';
                        pos = (num / 87 * 100) + '%';
                    } else if (num <= 64 && num >= 41) {
                        lineColor = '#40db90';
                        pos = (num / 87 * 100) + '%';
                    } else if (num > 64) {
                        lineColor = '#f3ce3c';
                        pos = (num / 87 * 100) + '%'
                    }
                }
                break;
        }
        return (
            <div>
                <div className='content-waterPrc'>
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
