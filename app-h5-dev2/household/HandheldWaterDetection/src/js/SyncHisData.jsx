'use strict';
/**
 * 同步数据列表页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

let address = " ";
let longVal = " ";
let latVal = " ";
let selectIndex = -1;

// 创建React组件
export class SyncHisData extends BaseComponent {

    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            showDialog: false,
            address: address,
            longVal: longVal,
            latVal: latVal,
            selectIndex: selectIndex,
        };
        this.listenStore(Store);// 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '水质检测器', setNavRightBtnHiden: 1}));
        Actions.getTrigger();
    }

    getGrade(wqiVal) {
        let gradeVal;
        if (wqiVal <= 60) {
            gradeVal = "差";
        } else if (wqiVal > 60 && wqiVal < 80) {
            gradeVal = "中";
        } else if (wqiVal >= 80 && wqiVal < 90) {
            gradeVal = "良";
        } else {
            gradeVal = "优";
        }
        return gradeVal;
    };

    getGradeColor(wqiVal) {
        let gradeColor;
        if (wqiVal <= 60) {
            gradeColor = "red-color";
        } else if (wqiVal > 60 && wqiVal < 80) {
            gradeColor = "yellow-color";
        } else if (wqiVal >= 80 && wqiVal < 90) {
            gradeColor = "blue-color";
        } else {
            gradeColor = "green-color";
        }
        return gradeColor;
    };

    handleItem(e) {
        let mydata = this.state.array || [];
        let index = e.target.getAttribute('data-index');
        if (mydata.length > 0 && index < mydata.length) {
            let address = mydata[index].uploadLocation ? mydata[index].uploadLocation : " ";
            let longVal = mydata[index].longitude ? mydata[index].longitude : " ";
            let latVal = mydata[index].latitude ? mydata[index].latitude : " ";
            location.href = `#/SelectAddress/${address}/${longVal}/${latVal}/${index}/`;
        }
    }

    getWqiVal(toc, cod, chroma, turbidity, tds) {
        let tocVal, codVal, chromaVal, turbidityVal, tdsVal, wqiVal;
        if (toc <= 10) {
            tocVal = this.getValue(99.83217, -2.16162, 0.2634, -0.04584, toc);
        } else {
            tocVal = this.getValue(105.54348, -5.5088, 0.09213, -4.34783e-4, toc);
        }
        if (cod <= 10) {
            codVal = this.getValue(99.83217, -2.16162, 0.2634, -0.04584, cod);
        } else {
            codVal = this.getValue(105.54348, -5.5088, 0.09213, -4.34783e-4, cod);
        }
        if (chroma <= 15) {
            chromaVal = this.getValue(99.6998, 0.6071, -0.15363, 0.00466, chroma);
        } else {
            chromaVal = this.getValue(133.7001, 3.54933, 0.04674, -2.7218E-4, chroma);
        }
        if (turbidity <= 10) {
            turbidityVal = this.getValue(99.83217, 0.17483, -1.58042, 0.07692, turbidity);
        } else {
            turbidityVal = this.getValue(27.28261, -0.41315, -0.03971, 8.4058E-4, turbidity);
        }
        if (tds <= 400) {
            tdsVal = this.getValue(99.80276, -0.04722, 1.23839E-4, -1.67599E-7, tds);
        } else {
            tdsVal = this.getValue(110, -0.05, 3.32491E-19, -1.01761E-22, tds);
        }

        let isHave = false;
        if (tocVal <= 60) {
            isHave = true;
        } else if (chromaVal <= 60) {
            isHave = true;
        } else if (turbidityVal <= 60) {
            isHave = true;
        } else if (tdsVal <= 60) {
            isHave = true;
        }
        if (isHave) {
            wqiVal = Math.min(tocVal, codVal, chromaVal, turbidityVal, tdsVal);
        } else {
            wqiVal = tocVal * 0.4 + codVal * 0.2 + chromaVal * 0.2 + turbidityVal * 0.15 + tdsVal * 0.05;
        }
        wqiVal = Math.round(wqiVal);
        return wqiVal;
    }

    getValue(intercept, b1, b2, b3, value) {
        return intercept + (b1) * value + (b2) * value + (b3) * value;
    }

    syncData() {
        let mydata = this.state.array || [];
        console.log("-----syncData---------" + JSON.stringify(mydata));
        if (mydata.length > 0) {
            Actions.postData(mydata);
            history.back();
        }
    }

    render() {
        let mydata = this.state.array || [];
        return (
            <div className="waterdetection-body">
                <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
                <div className="waterdetection-content">
                    <ul className="syncdata-ul">
                        {mydata.map(function (item, index) {
                            let wqiVal = this.getWqiVal(item.toc, item.cod, item.chroma, item.turbidity, item.tds);
                            return <li
                                className="statistics-li" key={index}>
                                <article className='statistics-li-parent'>
                                    <div>
                                        <p className={item.uploadLocation ? "" : "data-no-address"}>{item.uploadLocation ? item.uploadLocation : '请同步检测地址'}</p>
                                        <p>{item.uploadTime}</p>
                                    </div>
                                    <a onTouchEnd={this.handleItem.bind(this)} className="syncdata-grade-container">
                                    <span data-index={index}
                                          className={"syncdata-grade " + this.getGradeColor(wqiVal)}>{this.getGrade(wqiVal)}</span>
                                    </a>
                                </article>
                            </li>
                        }.bind(this))}
                    </ul>
                    <div className='bottom-btn' onTouchEnd={this.syncData.bind(this)}>
                        确定
                    </div>
                </div>
            </div>
        );
    }
}