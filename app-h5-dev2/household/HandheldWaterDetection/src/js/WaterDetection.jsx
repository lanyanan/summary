'use strict';
/**
 * 水质检测页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DialogStyle} from './DialogStyle.jsx';
import {DataInfo} from './DataInfo.jsx';
import {LoadImagModel} from './LoadImagModel.jsx';

// 创建React组件
export class WaterDetection extends BaseComponent {

    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
        };
        this.listenStore(Store);// 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '水质检测', setNavRightBtnHiden: 1}));
        this.closeDialog = () => {
            Actions.send(3);
        };
        Actions.send(1);
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

    handleToIndex() {
        history.back();
    }

    render() {
        let errorTip = '检测到汲取的水量不足或未浸入水中';

        let deviceStatus = this.state.deviceStatus || 1;
        let mydata = this.state.data || {};

        let wqiVal = this.state.data ? this.state.data.wqi : '0';
        let gradeVal = this.getGrade(wqiVal);

        return (
            <div className="waterdetection-body">
                <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
                <div className="waterdetection-content">
                    {deviceStatus == 1 ? (
                        <section className="waterdetection-parent">
                            <div className="waterdetection-left">
                                <i>1</i>
                                <div className="line"></div>
                                <i>2</i>
                                <div className="line"></div>
                                <i>3</i>
                            </div>
                            <div className="waterdetection-container">
                                <figure>
                                    <img src="../static/img/starting-up.png" alt=""/>
                                    <p>开机</p>
                                </figure>
                                <figure>
                                    <img src="../static/img/bluetooth.png" alt=""/>
                                    <p>请确保蓝牙已连接</p>
                                </figure>
                                <figure>
                                    <img src="../static/img/getting-water.png" alt=""/>
                                    <p>取水</p>
                                </figure>
                            </div>
                        </section>
                    ) : ''}
                    {deviceStatus == 2 ? (
                        <section>
                            <figure className="waterdetection-finish">
                                <img src="../static/img/detection-finish.png" alt=""/>
                                <p>检测完成</p>
                            </figure>
                            <div className="waterdetection-result">
                                <span>您本次水质检测得分为：<span className="score">{wqiVal + "分"}</span></span>
                                <span>等级为：<span className={this.getGradeColor(wqiVal)}>{gradeVal}</span></span>
                            </div>
                            <DataInfo
                                styleMode="2"
                                myData={mydata}
                            />
                            <div className="waterdetection-hint">
                                点击确定完成本次检测前，请确保已将设备退水，以免造成数据误差
                            </div>
                            <div className='bottom-btn' onTouchEnd={this.handleToIndex.bind(this)}>
                                确定
                            </div>
                        </section>
                    ) : ''}
                    <DialogStyle show={this.state.showerrordialog} submitClock={this.closeDialog.bind(this)}
                                 content={errorTip} canCel={false}/>
                </div>
                <LoadImagModel showLoad={this.state.loading}/>
            </div>
        );
    }
}