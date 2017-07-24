/**
 * Created by Administrator on 2016-08-11.
 */
/**
 * Created by Administrator on 2016-08-11.
 */

let ContentDateMetal = React.createClass({

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
                    widthLow = '30%',
                        widthNor = '35%',
                        widthHigh = '35%',
                        spanL = 1200,
                        spanN = 2600,
                        spanH = 4000
                    if (num < 1200) {
                        lineColor = '#3c9fe4';
                        pos = (num / 4000 * 100) + '%';

                    } else if (num <= 2600 && num >= 1200) {
                        lineColor = '#40db90';
                        pos = (num / 4000 * 100) + '%';
                    } else if (num > 2600) {
                        lineColor = '#f3ce3c';
                        pos = (num / 4000 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '25.8%',
                        widthNor = '37.1%',
                        widthHigh = '37%',
                        spanL = 1150,
                        spanN = 2800,
                        spanH = 4450
                    if (num < 1150) {
                        lineColor = '#3c9fe4';
                        pos = (num / 4450 * 100) + '%';
                    } else if (num <= 2800 && num >= 1150) {
                        lineColor = '#40db90';
                        pos = (num / 4450 * 100) + '%';
                    } else if (num > 2800) {
                        lineColor = '#f3ce3c';
                        pos = (num / 4450 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '29.7%',
                        widthNor = '35.1%',
                        widthHigh = '35.1%',
                        spanL = 1100,
                        spanN = 2400,
                        spanH = 3700
                    if (num < 1100) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3700 * 100) + '%';
                    } else if (num <= 2400 && num >= 1100) {
                        lineColor = '#40db90';
                        pos = (num / 3700 * 100) + '%';
                    } else if (num > 2400) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3700 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '31.5%',
                        widthNor = '34.2%',
                        widthHigh = '34.2%',
                        spanL = 1030,
                        spanN = 2150,
                        spanH = 3270
                    if (num < 1030) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3270 * 100) + '%';
                    } else if (num <= 2150 && num >= 1030) {
                        lineColor = '#40db90';
                        pos = (num / 3270 * 100) + '%';
                    } else if (num > 2150) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3270 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '31.2%',
                        widthNor = '34.4%',
                        widthHigh = '34.4%',
                        spanL = 980,
                        spanN = 2060 ,
                        spanH = 3140
                    if (num < 980) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3140 * 100) + '%';
                    } else if (num <= 2060 && num >= 980) {
                        lineColor = '#40db90';
                        pos = (num / 3140 * 100) + '%';
                    } else if (num > 2060) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3140 * 100) + '%'
                    }
                }
                if (age >= 60) {
                    widthLow = '25.8%',
                        widthNor = '37.1%',
                        widthHigh = '37.1%',
                        spanL = 720,
                        spanN = 1750 ,
                        spanH = 2780
                    if (num < 720) {
                        lineColor = '#3c9fe4';
                        pos = (num / 2780 * 100) + '%';
                    } else if (num <= 1750 && num >= 720) {
                        lineColor = '#40db90';
                        pos = (num / 2780 * 100) + '%';
                    } else if (num > 1750) {
                        lineColor = '#f3ce3c';
                        pos = (num / 2780 * 100) + '%'
                    }
                }
                break;
            case 'female':
                if (age < 20 && age >= 0) {
                    widthLow = '29.7%',
                        widthNor = '35.1%',
                        widthHigh = '35.1%',
                        spanL = 1100,
                        spanN = 2400,
                        spanH = 3700
                    if (num < 1100) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3700 * 100) + '%';
                    } else if (num <= 2400 && num >= 1100) {
                        lineColor = '#40db90';
                        pos = (num / 3700 * 100) + '%';
                    } else if (num > 2400) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3700 * 100) + '%'
                    }
                }
                if (age <= 30 && age >= 20) {
                    widthLow = '25.3%',
                        widthNor = '37.3%',
                        widthHigh = '37.3%',
                        spanL = 1050,
                        spanN = 2600,
                        spanH = 4150
                    if (num < 1050) {
                        lineColor = '#3c9fe4';
                        pos = (num / 4150 * 100) + '%';
                    } else if (num <= 2600 && num >= 1050) {
                        lineColor = '#40db90';
                        pos = (num / 4150 * 100) + '%';
                    } else if (num > 2600) {
                        lineColor = '#f3ce3c';
                        pos = (num / 4150 * 100) + '%'
                    }
                }
                if (age < 40 && age > 30) {
                    widthLow = '29.7%',
                        widthNor = '35.1%',
                        widthHigh = '35.1%',
                        spanL = 1000,
                        spanN = 2200,
                        spanH = 3400
                    if (num < 1000) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3400 * 100) + '%';
                    } else if (num <= 2200 && num >= 1000) {
                        lineColor = '#40db90';
                        pos = (num / 3400 * 100) + '%';
                    } else if (num > 2200) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3400 * 100) + '%'
                    }
                }
                if (age <= 50 && age >= 40) {
                    widthLow = '30.2%',
                        widthNor = '34.9%',
                        widthHigh = '34.8%',
                        spanL = 950,
                        spanN = 2050,
                        spanH = 3150
                    if (num < 950) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3150 * 100) + '%';
                    } else if (num <= 2050 && num >= 950) {
                        lineColor = '#40db90';
                        pos = (num / 3150 * 100) + '%';
                    } else if (num > 2050) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3150 * 100) + '%'
                    }
                }
                if (age < 60 && age > 50) {
                    widthLow = '31.1%',
                        widthNor = '34.4%',
                        widthHigh = '34.4%',
                        spanL = 950,
                        spanN = 2000,
                        spanH = 3050
                    if (num < 950) {
                        lineColor = '#3c9fe4';
                        pos = (num / 3050 * 100) + '%';
                    } else if (num <= 2000 && num >= 950) {
                        lineColor = '#40db90';
                        pos = (num / 3050 * 100) + '%';
                    } else if (num > 2000) {
                        lineColor = '#f3ce3c';
                        pos = (num / 3050 * 100) + '%'
                    }
                }
                if (age > 60) {
                    widthLow = '25%',
                        widthNor = '37.5%',
                        widthHigh = '37.5%',
                        spanL = 600,
                        spanN = 1500,
                        spanH = 2400
                    if (num < 600) {
                        lineColor = '#3c9fe4';
                        pos = (num / 2400 * 100) + '%';
                    } else if (num <= 1500 && num >= 600) {
                        lineColor = '#40db90';
                        pos = (num / 2400 * 100) + '%';
                    } else if (num > 1500) {
                        lineColor = '#f3ce3c';
                        pos = (num / 2400 * 100) + '%'
                    }
                }
                break;
        }
        return (
            <div>
                <div className='content-metal'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:<span className='measurementReport-txt'>{num}</span><span>kcal</span></span>
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
