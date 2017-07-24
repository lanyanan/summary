/**
 * Created by Administrator on 2017-02-24.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DataInfo} from './DataInfo.jsx';
import {ActionItem} from './ActionItem.jsx';
import {DialogStyle} from './DialogStyle.jsx';

export class LoadMainData extends BaseComponent {

    constructor(props) {
        super(props);
        this.listenStore(Store); // 监听Store
        this.closeDialog = () => {
            this.setState({
                showhelpdialog: false,
            });
        };
        Actions.getTrigger();
    }

    handleHelp() {
        this.setState({
            showhelpdialog: true,
        });
    }

    closeDialog() {
        this.setState({
            showhelpdialog: false,
        });
    }

    handleToWaterDetection() {
        if (!(this.state.isDeviceConnected || false)) {
            het.toast('设备未连接');
            return false;
        }
        location.href = '#/waterDetection'
    }

    handleToWaterMap() {
        location.href = '#/WaterMap';
    }

    handleToStatistics() {
        location.href = '#/Statistics';
    }

    handleToBaseline() {
        if (!(this.state.isDeviceConnected || false)) {
            het.toast('设备未连接');
            return false;
        }
        location.href = '#/BaselineCalibration';
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

    render() {
        let showhelpdialog = this.state.showhelpdialog;
        let mydata = this.props.mydata || {};

        let gradeVal = this.getGrade(mydata.wqi);
        // let dataTime = Funs.dateFormat(mydata.uploadTime, 'yyyy/MM/dd hh:mm', true);
        let dataTime = mydata.uploadTime || "";//直接传的北京时间获取的也是北京时间不用转
        let contentList = ['总溶解固体量即水中无机物（钠、钙等）含量多少的测定值，但很多对人体有害的致病菌这个测试笔是无法测出来的，矿泉水中的有益物质也无法分辨',
            '总有机碳是用来描述水系统中有机（含碳有机物）污染物的术语。由于有机物是如糖、蔗糖、酒精、石油、PVC、粘结剂、塑料衍生物等化合物，有机污染物有很多来源',
            '水的色度是对天然水或处理后的各种水进行颜色定量测定时的指标，产生颜色的原因是由于溶于水的腐殖质、有机物或无机物质所造成的',
            '水中含有泥土、粉砂、微细有机物、无机物、浮游生物等悬浮物和胶体物都可以使水质变的浑浊而呈现一定浊度',
            '化学需氧量，采用一定的强氧化剂处理水样时，所消耗的氧化剂量。它是表示水中还原性物质多少的一个指标。作为衡量水中有机物质含量多少的指标。化学需氧量越大，说明水体受有机物的污染越严重'];
        return (
            <div>
                <div className="main_top">
                    <div className="index_circle_container">
                        <div className="index_circle_center">
                            <div className="index_data">
                                <p className="index-grade">水质等级</p>
                                <p className="index-grade-value">{gradeVal}</p>
                                <p className="index-score">{mydata.wqi + "分"}</p>
                            </div>
                            <a className="detection" onTouchEnd={this.handleToWaterDetection.bind(this)}>去检测</a>
                        </div>
                    </div>
                    <div className='index-shuizhi'>
                        <span onTouchEnd={this.handleHelp.bind(this)}>水质指标<i>?</i></span>
                        <span>{dataTime}</span>
                    </div>
                    <DataInfo
                        styleMode="0"
                        myData={mydata}
                    />
                </div>
                <div className="index-item-container">
                    <ActionItem textVal="水质地图" touchEnd={this.handleToWaterMap.bind(this)}/>
                    <ActionItem textVal="统计" touchEnd={this.handleToStatistics.bind(this)}/>
                    <ActionItem textVal="基线校准" touchEnd={this.handleToBaseline.bind(this)}/>
                </div>
                <DialogStyle show={showhelpdialog} submitClock={this.closeDialog.bind(this)}
                             contentList={contentList} canCel={false}/>
            </div>
        )
    }
}
