import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Toast} from './toast.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

let dataTimer = 0;

export class Reseting extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
           music:"timing-setting-music-right-on",
           resettingHidden:false
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.getData();
        this.reGetData();
    }
    reGetData() {//
        clearInterval(window.dataTimer);
        window.dataTimer = setInterval(Actions.getData, 6000);
    }
    resettingLight() {//智能灯控开关
        Actions.controlLight(this.state.deviceSettingsSmartLight)
    }
    isShow() {
        let isShow = this.state.resettingHidden==false?true:false;
        this.setState({
            resettingHidden:isShow
        })
    }
    resetFactory() {//恢复出厂
        Actions.resetFactory();
    }
    render() {
        let className = this.state.deviceSettingsSmartLight==1?"timing-setting-music-right-on":"timing-setting-music-right-off"
        return  <div className='resetting'>
                    <div className="resetting-control">
                        <div className="resetting-control-light">
                            <span>智能灯光控制</span>
                            <i className={className} onTouchStart={this.resettingLight.bind(this)}></i>
                        </div>
                    </div>
                    <div className="music-control" onTouchStart={this.isShow.bind(this)}>
                        <b>恢复出厂设置</b>
                    </div>
                    <div className="resetting-hidden" style={{display:this.state.resettingHidden==false?"none":"block"}}>
                        <div className="resetting-space" onTouchStart={this.isShow.bind(this)}></div>
                        <div className="resetting-confirm">
                            <div className="resetting-hidden-top">恢复出厂设置将会清除用户设置及网络连接,确定要恢复？</div>
                            <div className="resetting-hidden-bottom">
                                <span onTouchStart={this.isShow.bind(this)}>取消</span>
                                <i onTouchStart={this.resetFactory.bind(this)}>确定</i>
                            </div>
                        </div>  
                    </div>
                    <Toast show={this.state.toastShow} tips={this.state.tips}/>
                </div>;
    }
}