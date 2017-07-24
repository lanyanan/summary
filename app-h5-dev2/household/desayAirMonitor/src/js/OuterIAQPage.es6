import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {CircleProgress} from './CircleProgress.jsx'


const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};
export class OuterIAQPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        Actions.local();
        this.listenStore(Store);
    }

    componentWillMount() {
        het.setTitle(JSON.stringify({
            setNavTitle: 1,
            title: '室外空气AQI',
            setNavRightBtnHiden: 0
        }));
    }
    render() {
        //导航栏:{ios:73,android:64}
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ? ' ios' : ' android';
        let aqiOuter = this.state.aqiOuter||0;
        let coOuter = this.state.coOuter||0;
        let no2Outer = this.state.no2Outer||0;
        let o3Outer = this.state.o3Outer||0;
        let pm10Outer = this.state.pm10Outer||0;
        let pm25Outer = this.state.pm25Outer||0;
        let so2Outer = this.state.so2Outer||0;
        let qualityOuter = this.state.qualityOuter||"未知";

        let isNormalIAQ = aqiOuter < 100;//IAQ是否正常, true: 正常, false: 超标
        let isNormalNo2 = no2Outer<80;//Co2是否正常, true: 正常, false: 超标
        let isNormalSo2 = so2Outer<150;//So2是否正常, true: 正常, false: 超标
        let isNormalPm25 = pm25Outer<75;//Pm2.5是否正常, true: 正常, false: 超标
        let isNormalPm10 = pm10Outer<200;//Pm10是否正常, true: 正常, false: 超标
        let isNormalO3 = o3Outer<160;//O3是否正常, true: 正常, false: 超标
        let isNormalCo = coOuter<4;//Co是否正常, true: 正常, false: 超标

        let aqiOuterProgress = aqiOuter>300?100:(aqiOuter/3);

        let no2Progress = (no2Outer>565?100:(no2Outer/565*100))+"%";
        let so2Progress = (so2Outer>1600?100:(so2Outer/1600*100))+"%";
        let pm25Progress = (pm25Outer>250?100:(pm25Outer/250*100))+"%";
        let pm10Progress = (pm10Outer>3400?100:(pm10Outer/3400*100))+"%";
        let o3Progress = (o3Outer>800?100:(o3Outer/800*100))+"%";
        let coProgress = (coOuter>36?100:(coOuter/36*100))+"%";
        return (
            <section className={'body_root' + navigation}>
                <section className="body_root_top">
                    <section className="body_outer_progress">
                        <CircleProgress percent={aqiOuterProgress}
                                        circleProgressId="circleProgress_outer"
                                        lineWidth="0.045"
                                        lineColor={isNormalIAQ?"#3fb57d":"#e66039"}
                                        lineColorBg={isNormalIAQ?"#ededed":"#ededed"}
                                        alt="" diameter="18rem"/>
                        <section className="body_outer_progress_info">
                            <h5 className={"body_outer_progress_value"+(isNormalIAQ?" myGreen":" myRed")}>{aqiOuter}</h5>
                            <h5 className={"body_outer_progress_status"+(isNormalIAQ?" myGreen":" myRed")}>{qualityOuter}</h5>
                        </section>
                    </section>
                </section>
                <section className="body_root_pros">
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">NO2</h5>
                                <h5 className="body_outer_info_unit">ug/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalNo2?" myGreen":" myRed")}>{isNormalNo2?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalNo2?" myGreen":" myRed")}>{no2Outer}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalNo2?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: no2Progress, background:isNormalNo2?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">SO2</h5>
                                <h5 className="body_outer_info_unit">ug/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalSo2?" myGreen":" myRed")}>{isNormalSo2?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalSo2?" myGreen":" myRed")}>{so2Outer}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalSo2?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: so2Progress, background:isNormalSo2?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">PM2.5</h5>
                                <h5 className="body_outer_info_unit">ug/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalPm25?" myGreen":" myRed")}>{isNormalPm25?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalPm25?" myGreen":" myRed")}>{pm25Outer}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalPm25?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: pm25Progress, background:isNormalPm25?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">PM10</h5>
                                <h5 className="body_outer_info_unit">ug/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalPm10?" myGreen":" myRed")}>{isNormalPm10?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalPm10?" myGreen":" myRed")}>{pm10Outer}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalPm10?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: pm10Progress, background:isNormalPm10?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">O3</h5>
                                <h5 className="body_outer_info_unit">ug/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalO3?" myGreen":" myRed")}>{isNormalO3?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalO3?" myGreen":" myRed")}>{o3Outer}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalO3?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: o3Progress, background:isNormalO3?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                    <section className="app-btns-child">
                        <section className="body_outer_info">
                            <section className="body_outer_info_name_unit">
                                <h5 className="body_outer_info_name">CO</h5>
                                <h5 className="body_outer_info_unit">mg/m³</h5>
                            </section>
                            <h5 className={"body_outer_info_status"+(isNormalCo?" myGreen":" myRed")}>{isNormalCo?"正常":"超标"}</h5>
                            <h5 className={"body_outer_info_value"+(isNormalCo?" myGreen":" myRed")}>{coOuter}</h5>
                        </section>
                        <section className="body_outer_progress_line">
                            <h5 className="body_outer_progress_bg" style={{width: "100%", background:isNormalCo?"#C5E9D8":"#FBE2DB"}}></h5>
                            <h5 className="body_outer_progress_pro" style={{width: coProgress, background:isNormalCo?"#3fb57d":"#e66039"}}></h5>
                        </section>
                    </section>
                </section>
            </section>
        )
    }
}