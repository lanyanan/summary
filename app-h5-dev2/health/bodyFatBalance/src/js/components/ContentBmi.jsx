/**
 * Created by Administrator on 2016-08-11.
 */

//体重过低 <18.5 —— —— ——
//体重正常 18.5～23.9 —— 增加 危险高
//超重 24.0～27.9 增加 危险高 极高
//肥胖 ≥28 危险高 危险极高 危险极高
let ContentBmi = React.createClass({

    render(){
        let num = this.props.mydata, show,
            age = this.props.myage,
            gender = this.props.mygender,
            widthLow = '32%', widthNor = '33%', widthHigh = '32%',
            spanL, spanN, spanH, lineColor, pos;

        show = gender ? ' ' : 'hiding';
        if (age < 24 && age >= 0) {
            widthLow = '16%',
                widthNor = '20%',
                widthHigh = '63.9%',
                spanL = 19,
                spanN = 24 ,
                spanH = 40;
            if (num < 19) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num <= 24 && num >= 19) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }
        if (age <= 34 && age >= 24) {
            widthLow = '20%',
                widthNor = '20%',
                widthHigh = '59.9%',
                spanL = 20,
                spanN = 25 ,
                spanH = 40
            if (num < 20) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';

            } else if (num <= 25 && num >= 20) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }
        if (age < 44 && age >= 35) {
            widthLow = '24%',
                widthNor = '20%',
                widthHigh = '55.9%',
                spanL = 21,
                spanN = 26,
                spanH = 40
            if (num < 21) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';

            } else if (num <= 26 && num >= 21) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num > 26) {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }
        if (age <= 54 && age >= 44) {
            widthLow = '28%',
                widthNor = '20%',
                widthHigh = '51.9%',
                spanL = 22,
                spanN = 27,
                spanH = 40
            if (num < 22) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num <= 27 && num >= 22) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num > 27) {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }
        if (age <= 64 && age >= 55) {
            widthLow = '32%',
                widthNor = '20%',
                widthHigh = '47.9%',
                spanL = 23,
                spanN = 28,
                spanH = 40
            if (num < 23) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num <= 28 && num >= 23) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num > 28) {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }
        if (age > 64) {
            widthLow = '36%',
                widthNor = '20%',
                widthHigh = '43.9%',
                spanL = 24,
                spanN = 29,
                spanH = 40
            if (num < 24) {
                lineColor = '#3c9fe4';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num <= 29 && num >= 24) {
                lineColor = '#40db90';
                pos = ((num - 15) / 25 * 100) + '%';
            } else if (num > 29) {
                lineColor = '#f3ce3c';
                pos = ((num - 15) / 25 * 100) + '%'
            }
        }


        return (
            <div>
                <div className='content-bmi'>
                    <div className='measurementReport-content-show'>
                        <span >本次测量值:
                            <span className='measurementReport-txt'>{num}</span></span>
                        <div className={"measurementReport-content-pic " + show}>
                            <div className='range-flex-style input-low' style={{width:widthLow}}>
                                <span style={{color:'#3c9fe4'}}>偏低</span>
                                <input className='range-low ' type='range' min='0' max='20'/>
                                <div className='input-l'><span className='input-l-l'>15</span><span
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
//switch (gender) {
//    case 'male':
//        if (age < 24 && age >= 0) {
//            widthLow = '16%',
//                widthNor = '20%',
//                widthHigh = '63.9%',
//                spanL = 19,
//                spanN = 24 ,
//                spanH = 40;
//            if (num < 19) {
//                lineColor = '#3c9fe4';
//                pos = (num-15 / 25 * 100) + '%';
//            } else if (num <= 24 && num >= 19) {
//                lineColor = '#40db90';
//                pos = (num-15 / 25 * 100) + '%';
//            } else {
//                lineColor = '#f3ce3c';
//                pos = (num-15 / 25 * 100) + '%'
//            }
//        }
//        if (age >= 24 && age <= 34) {
//            widthLow = '20%',
//                widthNor = '20%',
//                widthHigh = '59.9%',
//                spanL = 20,
//                spanN = 25 ,
//                spanH = 40
//            if (num < 20) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//
//            } else if (num <= 25 && num >= 20) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 35 && age < 44) {
//            widthLow = '24%',
//                widthNor = '20%',
//                widthHigh = '55.9%',
//                spanL = 21,
//                spanN = 26,
//                spanH = 40
//            if (num < 21) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//
//            } else if (num <= 26 && num >= 21) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 26) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 44 && age <= 54) {
//            widthLow = '28%',
//                widthNor = '20%',
//                widthHigh = '51.9%',
//                spanL = 22,
//                spanN = 27,
//                spanH = 40
//            if (num < 22) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 27 && num >= 22) {
//                lineColor = '#40db90';
//                pos = (num / 40* 100) + '%';
//            } else if (num > 27) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 55 && age <= 64) {
//            widthLow = '32%',
//                widthNor = '20%',
//                widthHigh = '47.9%',
//                spanL = 23,
//                spanN = 28,
//                spanH = 40
//            if (num < 23) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 28 && num >= 23) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 28) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age > 64) {
//            widthLow = '36%',
//                widthNor = '20%',
//                widthHigh = '43.9%',
//                spanL = 24,
//                spanN = 29,
//                spanH = 40
//            if (num < 24) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 29&& num >= 24) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 29) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        break;
//    case 'female':
//        if (age < 24 && age >= 0) {
//            widthLow = '16%',
//                widthNor = '20%',
//                widthHigh = '63.9%',
//                spanL = 19,
//                spanN = 24 ,
//                spanH = 40;
//            if (num < 19) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 24 && num >= 19) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 24 && age <= 34) {
//            widthLow = '20%',
//                widthNor = '20%',
//                widthHigh = '59.9%',
//                spanL = 20,
//                spanN = 25 ,
//                spanH = 40
//            if (num < 20) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//
//            } else if (num <= 25 && num >= 20) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 35 && age < 44) {
//            widthLow = '24%',
//                widthNor = '20%',
//                widthHigh = '55.9%',
//                spanL = 21,
//                spanN = 26,
//                spanH = 40
//            if (num < 21) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//
//            } else if (num <= 26 && num >= 21) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 26) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 44 && age <= 54) {
//            widthLow = '28%',
//                widthNor = '20%',
//                widthHigh = '51.9%',
//                spanL = 22,
//                spanN = 27,
//                spanH = 40
//            if (num < 22) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 27 && num >= 22) {
//                lineColor = '#40db90';
//                pos = (num / 40* 100) + '%';
//            } else if (num > 27) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age >= 55 && age <= 64) {
//            widthLow = '32%',
//                widthNor = '20%',
//                widthHigh = '47.9%',
//                spanL = 23,
//                spanN = 28,
//                spanH = 40
//            if (num < 23) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 28 && num >= 23) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 28) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        if (age > 64) {
//            widthLow = '36%',
//                widthNor = '20%',
//                widthHigh = '43.9%',
//                spanL = 24,
//                spanN = 29,
//                spanH = 40
//            if (num < 24) {
//                lineColor = '#3c9fe4';
//                pos = (num / 40 * 100) + '%';
//            } else if (num <= 29&& num >= 24) {
//                lineColor = '#40db90';
//                pos = (num / 40 * 100) + '%';
//            } else if (num > 29) {
//                lineColor = '#f3ce3c';
//                pos = (num / 40 * 100) + '%'
//            }
//        }
//        break;
//}