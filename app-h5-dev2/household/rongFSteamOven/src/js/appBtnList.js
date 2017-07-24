// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {isFinish} from './constants';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染
        updateFlagMap: {}
    });
});
// 接收app推送数据
het.repaint((data, type) => {
    Actions.repaint(data, type);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectModel: 0
        };
        Store.listen((data) => this.setState(data)); // 监听Store
        this.startTime = this.startTime.bind(this);
        this.isCanCancel = this.isCanCancel.bind(this);
        this.isWait = this.isWait.bind(this);
    };

    componentWillUnmount() {
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
    }

    startTime(selectModel) {
        this.timer = setTimeout(() => {
            if (selectModel != 0) {
                Actions.swicthMode(selectModel);
            }
        }, 3000);
    };

    handleOnOff() {//处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        deviceSwitch == 1 ? deviceSwitch = 2 : deviceSwitch = 1;
        Actions.onOff(deviceSwitch);
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
    };

    handleStove() {//炉灯开关
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        if (deviceSwitch == 1) return false;
        let stoveSwitch = parseInt(this.state.StoveSwitch) || 1;
        stoveSwitch == 1 ? stoveSwitch = 2 : stoveSwitch = 1;
        Actions.swicthStove(stoveSwitch);
    };

    handleMode() {//模式选择 (0-等待模式，1-上烧烤模式，2-下烧烤模式，3-上下烧烤模式，
        // 4-蒸煮模式，5-高温蒸烤模式，6-消毒模式，7-解冻模式，8-发酵模式，9-菜谱模式)
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        if (deviceSwitch == 1 || parseInt(this.state.CurrentWorkMode) != 0) return false;
        let selectModel = this.state.selectModel || 0;
        if (++selectModel > 8) selectModel = 1;

        this.setState({'selectModel': selectModel});
        if (this.timer != undefined) {
            clearTimeout(this.timer);
        }
        this.startTime(selectModel);
    };

    handleCancel() {
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (!this.isCanCancel()) return false;
        Actions.cancel();
    }

    isCanCancel() {
        let curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        if (deviceSwitch != 1 && curWorkMode != 0) {
            return true;
        }
        return false;
    };

    isWait() {//待机中
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        if (deviceSwitch == 2) {
            return true;
        }
        return false;
    };

    render() {
        let cookBookCurIsPause = this.state.CookBookCurIsPause || 0;

        let modeArry = ['模式', '上烤', '下烤', '上下烤', '蒸煮',
            '高温蒸烤', '消毒', '解冻', '发酵'];
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        let stoveStatus = parseInt(this.state.StoveStatus) || 0;//0关  1开
        let selectModel = this.state.selectModel || 0;
        let curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;

        let statusArry = ['待机中', '烘焙中', '已关机', '暂停', '烘培完成'];
        let workText = deviceSwitch == 1 ? statusArry[2] : this.isWait() ? statusArry[0] : isFinish(this.state) ? statusArry[4] :
                cookBookCurIsPause == 1 ? statusArry[3] : statusArry[1];
        let mode = parseInt(this.state.CurrentWorkMode) || 0,
            modeImgPath = '../static/img/btnlist/',
            modeName = '无模式',
            online = this.state.online || 2;//设备是否在线

        // console.log("mode=" + mode);
        if (deviceSwitch == 3 && curWorkMode != 0 && curWorkMode != 9) {
            modeImgPath = modeImgPath + 'mode-' + curWorkMode + '.png';
            modeName = modeArry[curWorkMode];
        } else if (deviceSwitch != 1 && curWorkMode == 9) {
            modeImgPath = modeImgPath + 'mode-' + curWorkMode + '.png';
            modeName = '云菜谱';
        } else {
            modeImgPath = modeImgPath + ((selectModel == 0) ? 'mode.png' : 'mode-' + selectModel + '.png');
            modeName = modeArry[selectModel];
        }
        return (
            <div>
                {online == 2 ? <h1 className="btn-title">设备已离线</h1> :
                    <h1 className="btn-title">
                        {workText + ' '}{modeName == '模式' ? '模式：无' : '模式：' + modeName}
                    </h1>
                }
                <section className="flex btnlist">
                    <article className="flex-cell" onTouchEnd={this.handleOnOff.bind(this)}>
                        <img style={{opacity: (online == 2) ? 0.3 : 1}}
                             src={"../static/img/btnlist/onoff.png"} alt=""/>
                        <p>{deviceSwitch == 1 ? "开机" : "关机"}</p>
                    </article>

                    <article className="flex-cell" onTouchEnd={this.handleStove.bind(this)}>
                        <img style={{opacity: stoveStatus == 1 ? 1 : 0.3}}
                             src={"../static/img/btnlist/lamp.png"} alt=""/>
                        <p>炉灯</p>
                    </article>

                    <article className="flex-cell" onTouchEnd={this.handleMode.bind(this)}>
                        <img
                            style={{opacity: (online == 1 && deviceSwitch != 1 && curWorkMode != 0) ? 1 : 0.3}}
                            src={modeImgPath} alt=""/>
                        <p>{modeName}</p>
                    </article>

                    <article className="flex-cell" onTouchEnd={this.handleCancel.bind(this)}>
                        <img style={{opacity: this.isCanCancel() ? 1 : 0.3}}
                             src={"../static/img/btnlist/cancel.png"} alt=""/>
                        <p>取消</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('融方蒸汽烤箱');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});