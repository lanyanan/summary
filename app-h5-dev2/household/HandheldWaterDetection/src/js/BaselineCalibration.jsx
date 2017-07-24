'use strict';
/**
 * 统计页面
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {LoadImagModel} from './LoadImagModel.jsx';

// 创建React组件
export class BaselineCalibration extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
        };
        this.listenStore(Store); // 监听Store
        het.setTitle(JSON.stringify({setNavTitle: 1, title: '基线校准', setNavRightBtnHiden: 1}));
    }

    startCalibration() {
        Actions.send(2);
    }

    render() {
        let dataText = "请确保检测器已经完全、可靠的浸入水中；基线校准时必须使用合格的蒸馏水或者超纯水，且在室温约为25°C时进行";
        return (<section >
            <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
            <div className="calibration-container">
                <figure className="calibration-top">
                    <img src="../static/img/baseline-calibration-icon.png" alt=""/>
                    <p>{dataText}</p>
                </figure>
                <div className='bottom-btn' onTouchEnd={this.startCalibration.bind(this)}>
                    开始校准
                </div>
            </div>
            <LoadImagModel showLoad={this.state.loading}/>
        </section>);
    }
}