'use strict';
/**
 * 水质地图页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class SelectAddress extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            longVal: props.params.longVal ? props.params.longVal : " ",
            latVal: props.params.latVal ? props.params.latVal : " ",
            havaLng: false,
            address: props.params.address ? props.params.address : " ",
            selectIndex: props.params.selectIndex ? props.params.selectIndex : -1
        };
        this.listenStore(Store); // 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '地图选点', setNavRightBtnHiden: 1}));
        Actions.getTrigger();
    }

    componentDidMount() {
        let mp = new BMap.Map("allmap");
        mp.centerAndZoom(new BMap.Point(this.state.longVal != " " ? (this.state.longVal, this.state.latVal) : (116.404, 39.915)), 15);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.lng != nextState.lng || !this.state.havaLng) {
            // 百度地图API功能
            let _this = this;
            let map = new BMap.Map("allmap");
            let point = new BMap.Point(_this.state.longVal != " " ? (_this.state.longVal, _this.state.latVal) : (116.404, 39.915));
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

            map.addEventListener("dragend", function () {
                let pt = map.getCenter();       //获取marker的位置
                _this.getAddressVal(pt);
            });

            if (_this.state.longVal != " ") {
                point = new BMap.Point(_this.state.longVal, _this.state.latVal);
                _this.getAddressVal(point);
                map.centerAndZoom(point, 15);
            }
            if (nextState.lng) {
                point = new BMap.Point(nextState.lng, nextState.lat);
                _this.getAddressVal(point);
                if (_this.state.longVal == " ") {
                    map.centerAndZoom(point, 15);
                }
                var myCompOverlay = new ComplexCustomOverlay(point);
                map.addOverlay(myCompOverlay);
            } else {
                let geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        point = new BMap.Point(r.point.lng, r.point.lat);
                        _this.getAddressVal(point);
                        if (_this.state.longVal == " ") {
                            map.centerAndZoom(point, 15);
                        }
                        var myCompOverlay = new ComplexCustomOverlay(point);
                        map.addOverlay(myCompOverlay);
                    }
                }, {enableHighAccuracy: true})
            }
            _this.setState({
                havaLng: true,
            });
        }
        return true;
    }

    getAddressVal(point) {
        let _this = this;
        let myGeo = new BMap.Geocoder();
        myGeo.getLocation(point, function (rs) {
            let addComp = rs.addressComponents;
            let address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            _this.setState({
                address: address,
                longVal: point.lng,
                latVal: point.lat
            });
            console.log("-----address----------" + address);
        });
    }

    submit(e) {
        e.preventDefault();
        let _this = this;
        let addressVal = _this.refs.address.innerHTML;
        Actions.changeAddress(_this.state.selectIndex, addressVal, _this.state.longVal, _this.state.latVal);
        setTimeout(() => history.back(), 100);
    }

    render() {
        let address = this.state.address;
        return (<div className="waterdetection-body">
            <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
            <div className="watermap-content" style={{height: window.innerHeight - this.state.headerTop}}>
                    <div id="allmap"></div>
                    <div className="watermap-top-container">
                        <div className='watermap-info'>
                            <span ref="address">{address}</span>
                        </div>
                    </div>
                    <img className="map-center" src="../static/img/mylocation-icon.png" alt=""/>
                    <div className='bottom-btn' onTouchEnd={this.submit.bind(this)}>
                        确定
                    </div>
            </div>
        </div>);
    }
}