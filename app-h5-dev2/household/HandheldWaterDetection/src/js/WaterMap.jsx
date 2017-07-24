'use strict';
/**
 * 水质地图页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DataInfo} from './DataInfo.jsx';

// 创建React组件
export class WaterMap extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            longVal: "",
            latVal: "",
            info: {},
            listData: [],
            showInfo: false,
        };
        this.listenStore(Store); // 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '水质地图', setNavRightBtnHiden: 1}));
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

    componentDidMount() {
        let mp = new BMap.Map("allmap");
        mp.centerAndZoom(new BMap.Point(105.881905, 32.657434), 15);
        mp.enableScrollWheelZoom();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ((this.state.lng != nextState.lng || nextState.lng == undefined) && this.state.longVal == "") {
            let _this = this;
            let map = new BMap.Map("allmap");
            let point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 15);

            //noinspection JSAnnotator
            function ComplexCustomOverlay(point) {
                this._point = point;
            }

            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function (map) {
                this._map = map;
                var div = this._div = document.createElement("div");
                div.style.position = "relative";
                div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                div.style.background = "rgba(75, 162, 255, 0.2) no-repeat content-box";
                div.style.border = "1px solid rgba(75, 162, 255, 0.4)";
                div.style.backgroundSize = "100% 100%";
                div.style.width = "133px";
                div.style.height = "133px";
                div.style.webkitBorderRadius = "50%";
                div.style.orderRadius = "50%";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.MozUserSelect = "none";

                var div1 = document.createElement("div");
                div.appendChild(div1);
                div1.style.background = "url('../static/img/dotbig.png') no-repeat content-box";
                div1.style.backgroundSize = "100% 100%";
                div1.style.width = "20.5px";
                div1.style.height = "18px";
                div1.style.position = "absolute";
                div1.style.top = "50%";
                div1.style.left = "50%";
                div1.style.transform = "translate(-50%, -50%)";

                map.getPanes().labelPane.appendChild(div);
                return div;
            }
            ComplexCustomOverlay.prototype.draw = function () {
                var map = this._map;
                var pixel = map.pointToOverlayPixel(this._point);
                this._div.style.left = pixel.x - 133 / 2 + "px";
                this._div.style.top = pixel.y - 133 / 2 + "px";
            }

            if (nextState.lng) {
                point = new BMap.Point(nextState.lng, nextState.lat);
                _this.getNearestDistanceT10Data(nextState.lng, nextState.lat);
                map.centerAndZoom(point, 15);
                var myCompOverlay = new ComplexCustomOverlay(point);
                map.addOverlay(myCompOverlay);
            } else {
                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        point = new BMap.Point(r.point.lng, r.point.lat);
                        _this.getNearestDistanceT10Data(r.point.lng, r.point.lat);
                        map.centerAndZoom(point, 15);
                        var myCompOverlay = new ComplexCustomOverlay(point);
                        map.addOverlay(myCompOverlay);
                    }
                }, {enableHighAccuracy: true})
            }
        }
        let mydata = nextState.results || [];
        if (this.state.results !== nextState.results && mydata.length > 0) {
            let _this = this;

            console.log("------------mydata---" + JSON.stringify(mydata));
            // 百度地图API功能
            let mp = new BMap.Map("allmap");
            mp.centerAndZoom(new BMap.Point(_this.state.longVal, _this.state.latVal), 15);
            mp.enableScrollWheelZoom();
            //noinspection JSAnnotator
            function ComplexCustomOverlay1(point) {
                this._point = point;
            }

            ComplexCustomOverlay1.prototype = new BMap.Overlay();
            ComplexCustomOverlay1.prototype.initialize = function (map) {
                this._map = map;
                var div = this._div = document.createElement("div");
                div.style.position = "relative";
                div.style.zIndex = BMap.Overlay.getZIndex(_this.state.latVal);
                div.style.background = "rgba(75, 162, 255, 0.2) no-repeat content-box";
                div.style.border = "1px solid rgba(75, 162, 255, 0.4)";
                div.style.backgroundSize = "100% 100%";
                div.style.width = "133px";
                div.style.height = "133px";
                div.style.webkitBorderRadius = "50%";
                div.style.orderRadius = "50%";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.MozUserSelect = "none";

                var div1 = document.createElement("div");
                div.appendChild(div1);
                div1.style.background = "url('../static/img/dotbig.png') no-repeat content-box";
                div1.style.backgroundSize = "100% 100%";
                div1.style.width = "20.5px";
                div1.style.height = "18px";
                div1.style.position = "absolute";
                div1.style.top = "50%";
                div1.style.left = "50%";
                div1.style.transform = "translate(-50%, -50%)";

                mp.getPanes().labelPane.appendChild(div);
                return div;
            }
            ComplexCustomOverlay1.prototype.draw = function () {
                var map = this._map;
                var pixel = map.pointToOverlayPixel(new BMap.Point(_this.state.longVal, _this.state.latVal));
                this._div.style.left = pixel.x - 133 / 2 + "px";
                this._div.style.top = pixel.y - 133 / 2 + "px";
            }

            var myCompOverlay1 = new ComplexCustomOverlay1(_this.state.longVal, _this.state.latVal);
            mp.addOverlay(myCompOverlay1);

            // 复杂的自定义覆盖物
            //noinspection JSAnnotator
            function ComplexCustomOverlay(point, dataItem) {
                this._dataItem = dataItem;
                this._point = point;
            }

            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function (map) {
                this._map = map;
                let wqiVal = this._dataItem.wqi;
                let grade = _this.getGrade(wqiVal);
                let __this = this;
                var div = this._div = document.createElement("div");
                div.style.position = "absolute";
                div.style.zIndex = BMap.Overlay.getZIndex(this._dataItem.latitude);
                div.style.background = "url('../static/img/marker-icon.png') no-repeat content-box";
                div.style.backgroundSize = "100% 100%";
                if (wqiVal <= 60) {
                    div.style.color = "#ff6969";
                } else if (wqiVal > 60 && wqiVal < 80) {
                    div.style.color = "#FFCB6E";
                } else if (wqiVal >= 80 && wqiVal < 90) {
                    div.style.color = "#7BB8FF";
                } else {
                    div.style.color = "#59d691";
                }
                div.style.width = "3.11rem";
                div.style.height = "4.58rem";
                div.style.textAlign = "center";
                div.style.lineHeight = "2.91rem";
                div.style.whiteSpace = "nowrap";
                div.style.MozUserSelect = "none";
                div.style.fontSize = "12px";
                var span = this._span = document.createElement("span");
                div.appendChild(span);
                span.appendChild(document.createTextNode(grade));

                let tmpfun = map.onclick;
                map.onclick = null;
                div.addEventListener("touchstart", function () {
                    map.onclick = tmpfun;
                    if (__this._dataItem == _this.state.info) {
                        _this.setState({
                            showInfo: false,
                            info: {}
                        });
                    } else {
                        _this.setState({
                            showInfo: true,
                            info: __this._dataItem
                        });
                    }
                });

                mp.getPanes().labelPane.appendChild(div);
                return div;
            }
            ComplexCustomOverlay.prototype.draw = function () {
                var map = this._map;
                var pixel = map.pointToOverlayPixel(this._point);
                this._div.style.left = pixel.x / 12 - 1.472 + "rem";
                this._div.style.top = pixel.y / 12 - 4.025 + "rem";
            }
            for (var x in mydata) {
                let dadt = mydata[x];
                var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(dadt.longitude, dadt.latitude), dadt);
                mp.addOverlay(myCompOverlay);
            }
        }
        return true;
    }

    getNearestDistanceT10Data(longitude, latitude) {
        this.setState({
            longVal: longitude,
            latVal: latitude
        });
        Actions.getNearestDistanceT10Data(longitude, latitude);
    }

    render() {
        let showInfo = this.state.showInfo;
        let info = this.state.info;
        let grade = this.getGrade(info.wqi);
        return (
            <div className="waterdetection-body">
                <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
                <div className="watermap-content" style={{height: window.innerHeight - this.state.headerTop}}>
                    <div id="allmap"></div>
                    <div className="watermap-top-container" style={{display: showInfo ? "" : "none"}}>
                        <div className='watermap-info'>
                            <span>{info.uploadLocation}</span>
                            <span>{"水质" + grade}</span>
                        </div>
                        <DataInfo
                            styleMode="1"
                            myData={info}
                        />
                    </div>
                </div>
            </div>);
    }
}