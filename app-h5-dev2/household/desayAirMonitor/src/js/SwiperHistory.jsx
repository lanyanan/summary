/**
 *
 */

import {ChartView} from './ChartView.jsx'
const AppData = {
    tabDataLists: [],
}

export class SwiperHistory extends React.Component {

    constructor(props) {
        super(props);
        this.getTabClassName = this.getTabClassName.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.getTabDataList = this.getTabDataList.bind(this);
        this.emptyViewClick = this.emptyViewClick.bind(this);
        this.showTimeSelect = this.showTimeSelect.bind(this);
    }

    switchTab(e) {
        e.preventDefault();
        let where = parseInt(e.currentTarget.getAttribute('data-mode'));
        // console.log("where : "+where);
        this.props.switchHistoryTab(where);
    }

    emptyViewClick(e) {
        e.preventDefault();
        this.props.emptyViewClick();
        e.stopPropagation();//取消冒泡
    }

    getTabClassName(where) {
        return where == this.props.swiperHistoryData.currentHistoryTab ? "tab_select" : "tab_default";
    }

    getTabDataList(dataList) {
        let pm25Data = [];
        let pm10Data = [];
        let hchoData = [];
        let tvocData = [];
        let co2Data = [];
        let tempData = [];
        let humidityData = [];
        for (let index in dataList) {
            let item = dataList[index];
            let timeStr = item.createTime;
            timeStr = timeStr.toString().replace(" ", "T");
            timeStr = timeStr + ".000+00:00";
            let date = Date.parse(timeStr);
            pm25Data.push([date, item.pm25]);
            pm10Data.push([date, item.pm10]);
            hchoData.push([date, (item.hcho) / 1000]);
            tvocData.push([date, (item.tvoc) / 1000]);
            co2Data.push([date, item.co2]);
            tempData.push([date, item.temp]);
            humidityData.push([date, item.humidity]);
        }
        AppData.tabDataLists = [];
        if (pm25Data.length > 0) {
            AppData.tabDataLists.push(pm25Data);
            AppData.tabDataLists.push(pm10Data);
            AppData.tabDataLists.push(hchoData);
            AppData.tabDataLists.push(tvocData);
            AppData.tabDataLists.push(co2Data);
            AppData.tabDataLists.push(tempData);
            AppData.tabDataLists.push(humidityData);
        }
        AppData.dataList = dataList;
    }

    isChangeDataList(dataList, dataListSave) {
        if (dataList == undefined || dataListSave == undefined) return true;
        if (dataList.length == 0 && dataListSave.length == 0) return false;
        if (dataList.length == 0 || dataListSave.length == 0) return true;
        return !(dataList[0].createTime.toString() == dataListSave[0].createTime.toString());
    }

    showTimeSelect(e) {
        e.preventDefault();
        this.props.showTimeSelect();
        e.stopPropagation();//取消冒泡
    }

    render() {
        //导航栏:{ios:73,android:64}
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ? ' ios' : ' android';
        let showTimeSelect = this.showTimeSelect;
        let swiperHistoryData = this.props.swiperHistoryData;
        let currentDate = swiperHistoryData.currentDate;
        let currentHistoryTab = swiperHistoryData.currentHistoryTab;
        let dataList = swiperHistoryData.dataList;
        if (this.isChangeDataList(dataList, AppData.dataList)) this.getTabDataList(dataList);
        let tabDataList = (AppData.tabDataLists)[currentHistoryTab];
        let criticalValue = [75, 200, 0.10, 0.60, 450, 1000000, 1000000][currentHistoryTab];
        let loadAllDataSuccess = swiperHistoryData.loadAllDataSuccess;
        let showEmpty = dataList == undefined || dataList.length == 0;
        let emptyText = showEmpty ? (loadAllDataSuccess ? "没有数据哟!" : "获取数据失败!") : "没有数据哟!";
        let chartUnit = ["ug/m³", "ug/m³", "mg/m³", "mg/m³", "ppm", "℃", "%"][currentHistoryTab];
        let chartTitleName = ["PM2.5", "PM10", "甲醛", "TVOC", "CO2", "温度", "湿度"][currentHistoryTab];
        return (
            <section className="index_Swp">
                <section className="body_history">
                    <section className={"body_history_title" + navigation}
                             onTouchStart={this.props.dealIOSShadow}></section>
                    <section className="body_history_data" style={{display: showEmpty ? "none" : "block"}}>
                        <section className={"tab_padding_top"} onTouchStart={this.props.dealIOSShadow}></section>
                        <section className="body_history_tabs">
                            <ul className="body_history_tabs_ul">
                                <li className={this.getTabClassName(0)} onTouchEnd={this.switchTab} data-mode="0">
                                    PM2.5
                                </li>
                                <li className={this.getTabClassName(1)} onTouchEnd={this.switchTab} data-mode="1">PM10
                                </li>
                                <li className={this.getTabClassName(2)} onTouchEnd={this.switchTab} data-mode="2">甲醛
                                </li>
                                <li className={this.getTabClassName(3)} onTouchEnd={this.switchTab} data-mode="3">TVOC
                                </li>
                                <li className={this.getTabClassName(4)} onTouchEnd={this.switchTab} data-mode="4">CO2
                                </li>
                                <li className={this.getTabClassName(5)} onTouchEnd={this.switchTab} data-mode="5">温度
                                </li>
                                <li className={this.getTabClassName(6)} onTouchEnd={this.switchTab} data-mode="6">湿度
                                </li>
                            </ul>
                        </section>
                        <section className="body_history_info" onTouchStart={this.props.dealIOSShadow}>
                            <section className="body_history_info_value">
                                <span className="body_history_info_num"></span>
                                <span className="body_history_info_unit"></span>
                            </section>
                            <section className="body_history_info_time">
                                <span className="body_history_info_time">时间: </span>
                                <span className="body_history_info_time_value">14:00</span>
                            </section>
                        </section>
                        <section className={"tab_padding_top1"} onTouchStart={this.props.dealIOSShadow}></section>
                        <section className="body_history_chart" onTouchStart={this.props.dealIOSShadow}>
                            <ChartView tabDataList={tabDataList} criticalValue={criticalValue} chartUnit={chartUnit}/>
                        </section>
                        <section className={"tab_padding_top"} onTouchStart={this.props.dealIOSShadow}></section>
                    </section>
                    <section className="body_history_nodata" style={{display: !showEmpty ? "none" : "block"}}
                             onTouchEnd={this.emptyViewClick}>
                        <img className="body_history_nodata_img" src="../static/img/emptys.png"/>
                        <p>{emptyText}</p>
                    </section>
                    <section className="body_history_time" onTouchStart={this.props.dealIOSShadow}>
                        <section className="body_history_time_line"></section>
                        <section className="body_history_clock" onTouchEnd={showTimeSelect}>
                            <img className="img_clock" src="../static/img/home_clock.png"/>
                            <span >{currentDate}</span>
                            <img className="img_arrow" src="../static/img/bottom_arrow.png"/>
                        </section>
                    </section>
                </section>
            </section>);
    }
}