import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
/**
 * 无检测数据页面
 */
export class PromptDetection extends BaseComponent {

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

    handleToWaterDetection() {
        if (!(this.state.isDeviceConnected || false)) {
            het.toast('设备未连接');
            return false;
        }
        location.href = '#/waterDetection'
    }

    render() {
        return (
            <div className="main_top no-data">
                <div className="index_circle_container">
                    <div className="index_circle_center">
                        <p className="no-detection-hint"> 亲，您还没有检测数据哦， 快去使用检测仪检测水质吧。</p>
                        <p className="detection" onTouchEnd={this.handleToWaterDetection.bind(this)}>去检测</p>
                    </div>
                </div>
            </div>
        );
    }
}
