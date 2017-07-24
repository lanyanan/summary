import {CircleProgress} from './CircleProgress.jsx'
import {DashboardView} from './DashboardView.jsx'

const colorValue = ["#3fb57d",
    "#3f9f7d",
    "#3e887b",
    "#3e7179",
    "#3d5a77",
    "#3d4375"];

const AirValueArr = [
    [0, 50, 100, 150, 200, 300],
    [0, 35, 75, 115, 150, 250],
    [0, 100, 200, 700, 1200, 3400],
    [0, 50, 100, 200, 300, 400],
    [0, 300, 600, 3000, 10000, 25000],
    [0, 350, 450, 1000, 2000, 5000]
];

export class SwiperIndex extends React.Component {

    constructor(props) {
        super(props);
        this.calculateAqi = this.calculateAqi.bind(this);
        this.getAqi = this.getAqi.bind(this);
        this.dealPowerDevice = this.dealPowerDevice.bind(this);
        this.binarySearch = this.binarySearch.bind(this);
    }

    binarySearch(array, x) {
        if (x === array[0]) return 1;
        let lowPoint = 0;
        let higPoint = array.length-1;
        let returnValue = -1;
        let midPoint;
        let found = false;
        while ((lowPoint <= higPoint) && (!found)) {
            midPoint = Math.ceil((lowPoint + higPoint) / 2);
            if (x > array[midPoint - 1]) {
                lowPoint = midPoint + 1;
            } else if (x < array[midPoint - 1]) {
                higPoint = midPoint - 1;
            } else if (x = array[midPoint - 1]) {
                found = true;
            }
        }
        if (found) {
            returnValue = midPoint;
        } else if (!found && (higPoint == lowPoint - 1)) {
            returnValue = higPoint;
        }
        // console.log("----->array2  x : " + x + ",  lowPoint : " + lowPoint + ", higPoint : " + higPoint);
        return returnValue;
    }

    calculateAqi(Cp, IAQh, IAQl, BPh, BPl) {
        return (IAQh - IAQl) / (BPh - BPl) * (Cp - BPl) + IAQl;
    }

    calAQI(arr, value) {
        if (value === undefined || value === NaN) return 0;
        let position = this.binarySearch(arr, value);
        if (position === arr.length) return AirValueArr[0][position - 1];
        let aqi = this.calculateAqi(value, AirValueArr[0][position], AirValueArr[0][position - 1], arr[position], arr[position - 1]);
        return aqi;
    }

    getAqi(pm25Value, pm10Value, formaldehydeValue, tvocValue, co2Value) {
        if (pm25Value > AirValueArr[1][AirValueArr[1].length-1] || pm10Value > AirValueArr[2][AirValueArr[2].length-1] || formaldehydeValue > AirValueArr[3][AirValueArr[3].length-1] || tvocValue > AirValueArr[4][AirValueArr[4].length-1] || co2Value > AirValueArr[5][AirValueArr[5].length-1]) return 300;
        let pm25Aqii = this.calAQI(AirValueArr[1], pm25Value);
        let pm10Aqii = this.calAQI(AirValueArr[2], pm10Value);
        let formaldehydeAqii = this.calAQI(AirValueArr[3], formaldehydeValue);
        let tvocAqii = this.calAQI(AirValueArr[4], tvocValue);
        let co2Aqii = this.calAQI(AirValueArr[5], co2Value);
        let aqii = Math.max(pm25Aqii, pm10Aqii, formaldehydeAqii, tvocAqii, co2Aqii);
        // console.log("aqiLevel -->----->array2 aqii : "+aqii+", pm25Aqii : "+pm25Aqii+", pm10Aqii : "+pm10Aqii+", formaldehydeAqii : "+formaldehydeAqii+", tovcAqii : "+tvocAqii+", co2Aqii : "+co2Aqii);
        return aqii;
    }

    dealPowerDevice(e) {
        // het.toast("点击了开关机的按钮");
        e.preventDefault();
        this.props.powerDevice();
        e.stopPropagation();//取消冒泡
    }

    render() {
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let dealPowerDevice = this.dealPowerDevice;
        let toOuterIAQPage = this.props.toOuterIAQPage;
        let swiperIndexData = this.props.swiperIndexData;
        let cityName = swiperIndexData.cityName;
        let powerstatus = swiperIndexData.powerstatus;
        let pm25Value = swiperIndexData.pm25Value;
        let PM10Value = swiperIndexData.pm10Value || 0;
        let formaldehydeValue = swiperIndexData.formaldehydeValue || 0;
        let TVOCValue = swiperIndexData.tvocValue || 0;
        let CO2Value = swiperIndexData.co2Value || 0;
        let temperature = swiperIndexData.temperature || 0;
        let humidity = swiperIndexData.humidity || 0;

        let qualityOuter = swiperIndexData.qualityOuter;
        let createTime = swiperIndexData.createTime;
        createTime = createTime == undefined ? "未知" : ((createTime + "").toString().replace("-", "/").replace("-", "/"));

        let isNormalPm25 = pm25Value < 75;
        let isNormalPm10 = PM10Value < 200;
        let isNormalFormaldehyde = formaldehydeValue < 100;
        let isNormalTvoc = TVOCValue < 600;
        let isNormalCo2 = CO2Value < 450;
        let isNormalTemp = 1;

        let pm25Progress = pm25Value > 250 ? 100 : (pm25Value / 250 * 100);
        let pm10Progress = PM10Value > 3400 ? 100 : PM10Value / 3400 * 100;
        let formaldehydeProgress = formaldehydeValue > 400 ? 100 : formaldehydeValue / 400 * 100;
        let tovcProgress = TVOCValue > 25000 ? 100 : TVOCValue / 25000 * 100;
        let co2Progress = CO2Value > 5000 ? 100 : CO2Value / 5000 * 100;
        let tempHumidityProgress = 100;
        // console.log("pm25Progress : "+pm25Progress+", pm10Progress : "+pm10Progress+", formaldehydeProgress : "+formaldehydeProgress+", tovcProgress : "+tovcProgress+", co2Progress : "+co2Progress);
        let powerText = powerstatus == 2 ? "开机" : "关机";
        // console.log("set--> SwiperIndex powerstatus : "+powerstatus+", powerText : "+powerText);
        let currentIAQ = this.getAqi(pm25Value, PM10Value, formaldehydeValue, TVOCValue, CO2Value);
        let aqiLevel = this.binarySearch(AirValueArr[0], currentIAQ)-1;
        // console.log("aqiLevel --> "+aqiLevel+",,,,aqiiLevel --> "+aqiiLevel);
        let airStatusDesc = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染"][aqiLevel];
        let airStatusTip = ["可打开门窗,或多出去走动,呼吸新鲜空气", "可以正常在户外活动,极少敏感人群应减少外出", "需减少高强度户外锻炼,外出时做好防护措施", "需减少户外活动,外出时佩戴口罩,敏感人群应尽量避免外出", "需减少户外活动,外出时佩戴口罩,敏感人群、老幼及呼吸道患者应留在室内", "请紧闭门窗,并避免外出及运动"][aqiLevel];
        return (
            <section className="index_Swp">
                <section className="body_index" style={{background: colorValue[aqiLevel]}}>
                    <section className="body_dashboard">
                        <DashboardView currentIAQ={currentIAQ}/>
                    </section>
                    <section className="body_index_info_power" onTouchEnd={dealPowerDevice}>
                        <img src='../static/img/home_power.png'/>
                        <h5>{powerText}</h5>
                    </section>
                </section>
                <section className="body_index_info">
                    <h5 className="body_index_info_name">空气质量</h5>
                    <h5 className="body_index_info_status">{airStatusDesc}</h5>
                    <h5 className="body_index_info_time">{createTime}</h5>
                    <section className="body_index_info_place">
                        <img className="place_img" src="../static/img/home_location.png"></img>
                        <span className="place_text">{cityName}</span>
                    </section>
                    <section className="body_index_info_iaq" onTouchEnd={toOuterIAQPage}>
                        <span >室外AQI: {qualityOuter}</span>
                        <img src="../static/img/home_arrow.png"/>
                    </section>
                    <h5 className="body_index_info_desc">{airStatusTip}</h5>
                </section>
                <div className="app-btns">
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={pm25Progress}
                                                circleProgressId="circleProgress_pm25"
                                                lineWidth="0.1"
                                                lineColor={isNormalPm25 ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalPm25 ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalPm25 ? "../static/img/home_icon_PM2.5.png" : "../static/img/home_icon_PM2.5_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalPm25 ? " myGreen" : " myRed")}>pm2.5</h5>
                            <h5 className={"app_btn_child_status" + (isNormalPm25 ? " myGreen" : " myRed")}>{isNormalPm25 ? "正常" : "超标"}</h5>
                        </div>
                        <h5 className={"app_btn_child_value" + (isNormalPm25 ? " myGreen" : " myRed")}>{pm25Value}</h5>
                        <h5 className={"app_btn_child_unit" + (isNormalPm25 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5")}>
                            ug/m³</h5>
                    </div>
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={pm10Progress}
                                                circleProgressId="circleProgress_pm10"
                                                lineWidth="0.1"
                                                lineColor={isNormalPm10 ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalPm10 ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalPm10 ? "../static/img/home_icon_PM10.png" : "../static/img/home_icon_PM10_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalPm10 ? " myGreen" : " myRed")}>pm10</h5>
                            <h5 className={"app_btn_child_status" + (isNormalPm10 ? " myGreen" : " myRed")}>{isNormalPm10 ? "正常" : "超标"}</h5>
                        </div>
                        <h5 className={"app_btn_child_value" + (isNormalPm10 ? " myGreen" : " myRed")}>{PM10Value}</h5>
                        <h5 className={"app_btn_child_unit" + (isNormalPm10 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5")}>
                            ug/m³</h5>
                    </div>
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={formaldehydeProgress}
                                                circleProgressId="circleProgress_formaldehyde"
                                                lineWidth="0.1"
                                                lineColor={isNormalFormaldehyde ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalFormaldehyde ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalFormaldehyde ? "../static/img/home_icon_jq.png" : "../static/img/home_icon_jq_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalFormaldehyde ? " myGreen" : " myRed")}>
                                甲醛</h5>
                            <h5 className={"app_btn_child_status" + (isNormalFormaldehyde ? " myGreen" : " myRed")}>{isNormalFormaldehyde ? "正常" : "超标"}</h5>
                        </div>
                        <h5 className={"app_btn_child_value" + (isNormalFormaldehyde ? " myGreen" : " myRed")}>{TVOCValue == undefined || TVOCValue == NaN ? 0 : (formaldehydeValue / 1000)}</h5>
                        <h5 className={"app_btn_child_unit" + (isNormalFormaldehyde ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5")}>
                            mg/m³</h5>
                    </div>
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={tovcProgress}
                                                circleProgressId="circleProgress_tvoc"
                                                lineWidth="0.1"
                                                lineColor={isNormalTvoc ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalTvoc ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalTvoc ? "../static/img/home_icon_tovc.png" : "../static/img/home_icon_tovc_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalTvoc ? " myGreen" : " myRed")}>Tvoc</h5>
                            <h5 className={"app_btn_child_status" + (isNormalTvoc ? " myGreen" : " myRed")}>{isNormalTvoc ? "正常" : "超标"}</h5>
                        </div>
                        <h5 className={"app_btn_child_value" + (isNormalTvoc ? " myGreen" : " myRed")}>{TVOCValue == undefined || TVOCValue == NaN ? 0 : (TVOCValue / 1000)}</h5>
                        <h5 className={"app_btn_child_unit" + (isNormalTvoc ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5")}>
                            mg/m³</h5>
                    </div>
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={co2Progress}
                                                circleProgressId="circleProgress_co2"
                                                lineWidth="0.1"
                                                lineColor={isNormalCo2 ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalCo2 ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalCo2 ? "../static/img/home_icon_co2.png" : "../static/img/home_icon_co2_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalCo2 ? " myGreen" : " myRed")}>CO2</h5>
                            <h5 className={"app_btn_child_status" + (isNormalCo2 ? " myGreen" : " myRed")}>{isNormalCo2 ? "正常" : "超标"}</h5>
                        </div>
                        <h5 className={"app_btn_child_value" + (isNormalCo2 ? " myGreen" : " myRed")}>{CO2Value}</h5>
                        <h5 className={"app_btn_child_unit" + (isNormalCo2 ? " myGreen" : " myRed") + (isIOS ? " fts_8" : " fts_5")}>
                            ppm</h5>
                    </div>
                    <div className="app-btns-child">
                        <section className="item_progress">
                            <div className="circleProgress">
                                <CircleProgress percent={tempHumidityProgress}
                                                circleProgressId="circleProgress_temp"
                                                lineWidth="0.1"
                                                lineColor={isNormalTemp ? "#3fb57d" : "#e66039"}
                                                lineColorBg={isNormalTemp ? "#C5E9D8" : "#FBE2DB"}
                                                alt="" diameter="3.3rem"/>
                            </div>
                            <img className="item_progress_img"
                                 src={isNormalTemp ? "../static/img/home_icon_wsd.png" : "../static/img/home_icon_wsd_2.png"}/>
                        </section>
                        <div className="app_btn_child_desc">
                            <h5 className={"app_btn_child_name" + (isNormalTemp ? " myGreen" : " myRed")}>温湿度</h5>
                            <h5 className={"app_btn_child_status" + (isNormalTemp ? " myGreen" : " myRed")}>{isNormalTemp ? "正常" : "超标"}</h5>
                        </div>
                        <section className="app_btn_child_values">
                            <span
                                className={"temp_values_value" + (isNormalTemp ? " myGreen" : " myRed")}>{temperature}</span>
                            <span
                                className={"temp_values_unit" + (isNormalTemp ? " myGreen" : " myRed") + (isIOS ? " fts_5" : " fts_3")}>℃</span>
                            <span
                                className={"temp_values_value" + (isNormalTemp ? " myGreen" : " myRed")}>/{humidity}</span>
                            <span
                                className={"temp_values_unit" + (isNormalTemp ? " myGreen" : " myRed") + (isIOS ? " fts_5" : " fts_3")}>%</span>
                        </section>
                    </div>
                </div>
            </section>);
    }
}