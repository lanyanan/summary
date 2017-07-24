// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SelectModel} from './SelectModel.jsx';
import {MenuList} from './MenuList';
import {MenuDetail} from './MenuDetail';
import {Range} from './Range.jsx';
import {StateModel} from './StateModel.jsx';
import {DialogStyle} from './DialogStyle.jsx';
import {initDataFm, isFinish} from './constants';

let stateModel = new StateModel;

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data, type) => {
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle: 0, setNavRightBtnHiden: 0}));
        this.state = {
            showChangeView: false,
            tempVal: 0,
            timeVal: 0,
        };
        this.listenStore(Store); // 监听Store

        this.cancelTipsDialog = () => {
            this.setState({
                showTipsDialog: false
            });
        };
        this.submitTipsDialog = () => {
            this.setState({
                showTipsDialog: false
            });
            this.modelCancel();
        };

        this.cancelErrorDialog = () => {
            this.setState({
                showErrorDialog: false
            });
        };
        this.submitErrorDialog = () => {
            location.href = "tel:4008110168";
            this.setState({
                showErrorDialog: false
            });
        };
        Actions.getData();
    }

    componentWillUpdate(nextProps, nextState) {
        //故障判断
        let errorContent = '';
        let curErrorStatus = parseInt(this.state.ErrorStatus) || 0;
        let nextErrorStatus = parseInt(nextState.ErrorStatus) || 0;
        if (curErrorStatus != nextErrorStatus) {
            switch (nextErrorStatus) {
                case 0:
                    errorContent = '';
                    break;
                case 1:
                    errorContent = '炉腔高温保护装置启动';
                    break;
                case 2:
                    errorContent = '蒸发盘高温保护装置启动';
                    break;
                case 3:
                    errorContent = '炉腔高低温保护装置启动';
                    break;
                case 4:
                    errorContent = '蒸发盘低温保护装置启动';
                    break;
                case 5:
                    errorContent = '温度传感器连接发生故障';
                    break;
                case 6:
                    errorContent = '温度传感器发生故障';
                    break;
                case 7:
                    errorContent = '电路板故障';
                    break;2
            }
            if (errorContent.length > 0) {
                this.setState({
                    showTipsDialog: false,
                    showErrorDialog: true,
                    errorContent: errorContent
                });
            } else {
                this.setState({
                    showErrorDialog: false,
                    errorContent: errorContent
                });
            }
        }
    }

    handleOnOff() {//处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (this.haveError()) return false;
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        deviceSwitch == 1 ? deviceSwitch = 2 : deviceSwitch = 1;
        Actions.onOff(deviceSwitch);
    };

    handleSelectModel(e) {
        e.stopPropagation();
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        let curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
        if (parseInt(this.state.DeviceSwitch || 1) == 1 || curWorkMode == 9) return false;
        if (this.haveError()) return false;
        if (curWorkMode == 9 || curWorkMode == 6) return false;
        if (curWorkMode == 0) {
            location.href = "#/SelectModel";
        } else {
            this.setState({'showChangeView': true});
        }
        e.preventDefault();
    }

    handleStove() {//炉灯开关
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (parseInt(this.state.DeviceSwitch || 1) == 1) return false;
        if (this.haveError()) return false;
        let stoveSwitch = parseInt(this.state.StoveSwitch) || 1;
        stoveSwitch == 1 ? stoveSwitch = 2 : stoveSwitch = 1;
        Actions.swicthStove(stoveSwitch);
    };

    handleMenu() {
        if (parseInt(this.state.online || 1) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (parseInt(this.state.DeviceSwitch || 1) == 1) return false;
        if (this.haveError()) return false;
        // het.toast("敬请期待");
        let curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
        const {CookBookHight8b, CookBookLow8b} = this.state;
        const menuId = CookBookHight8b * 256 + CookBookLow8b;
        location.href = `#/${(menuId && curWorkMode == 9) ? `MenuDetail?menuId=${menuId}` : 'MenuList'}`;
    }

    handleCancel() {
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (!this.isCanCancel() || this.haveError()) return false;
        this.setState({
            showTipsDialog: true
        });
    }

    modelCancel() {//取消所有状态  变成待机中
        if (parseInt(this.state.online || 2) == 2) {
            het.toast("设备已离线");
            return false;
        }
        if (!this.isCanCancel() || this.haveError()) return false;
        Actions.cancel();
    };

    handleTemperatureSet(value) {
        this.setState({
            'tempVal': value
        });
    }

    handleWorkTimeSet(value) {
        this.setState({
            'timeVal': value
        });
    }

    handleDialogCancel() {
        let curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
        let curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
        let curTempHight8b = this.state.CurrentTempHight8b || 0;
        let curTempLow8b = this.state.CurrentTempLow8b || 0;
        this.setState({
            'tempVal': ((+curTempHight8b) * 256 + (+curTempLow8b)),
            'timeVal': curTimeRemainHour * 60 + curTimeRemainMinute,
            'showChangeView': false
        });
    }

    handleDialogConfirm() {
        let curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
        let curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
        let curTempHight8b = this.state.CurrentTempHight8b || 0;
        let curTempLow8b = this.state.CurrentTempLow8b || 0;
        let curTempVal = ((+curTempHight8b) * 256 + (+curTempLow8b));
        let tempVal = this.state.tempVal || curTempVal;
        let timeVal = this.state.timeVal || curTimeRemainHour * 60 + curTimeRemainMinute;
        Actions.changeTampTime(tempVal, timeVal);
        this.setState({
            'showChangeView': false
        });
    }

    haveError() {
        if (parseInt(this.state.ErrorStatus || 0) != 0) {
            return true;
        }
        return false;
    };

    isCanCancel() {
        let online = parseInt(this.state.online)　|| 2;
        let curWorkMode = parseInt(this.state.CurrentWorkMode) || 0;
        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        if (online == 1　&&　deviceSwitch == 3 && curWorkMode != 0) {
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
        let showTipsDialog = this.state.showTipsDialog;
        let showErrorDialog = this.state.showErrorDialog;
        let showChangeView = this.state.showChangeView;//修改温度时间对话框显示与否

        let deviceSwitch = parseInt(this.state.DeviceSwitch) || 1;
        let stoveStatus = parseInt(this.state.StoveStatus) || 0;//0关 1开
        let curTimeRemainHour = this.state.CurrentTimeRemainHour || 0;
        let curTimeRemainMinute = this.state.CurrentTimeRemainMinute || 0;
        let curTempHight8b = this.state.CurrentTempHight8b || 0;
        let curTempLow8b = this.state.CurrentTempLow8b || 0;
        let curTempVal = ((+curTempHight8b) * 256 + (+curTempLow8b));
        let curWorkMode = this.state.CurrentWorkMode || 0;

        let cookBookTotalSteps = this.state.CookBookTotalSteps || 0;
        let cookBookCurStep = this.state.CookBookCurStep || 0;
        let cookBookCurTimeRemainHour = this.state.CookBookCurTimeRemainHour || 0;
        let cookBookCurTimeRemainMin = this.state.CookBookCurTimeRemainMin || 0;
        let cookBookCurTempH8b = this.state.CookBookCurTempH8b || 0;
        let cookBookCurTempL8b = this.state.CookBookCurTempL8b || 0;
        let cookBookCurIsPause = this.state.CookBookCurIsPause || 0;
        let cookBookCurTempVal = ((+cookBookCurTempH8b) * 256 + (+cookBookCurTempL8b));

        let tempVal = this.state.tempVal || curTempVal;
        let timeVal = this.state.timeVal || curTimeRemainHour * 60 + curTimeRemainMinute;

        let textTime = initDataFm(parseInt(timeVal / 60)) + ":" + initDataFm(timeVal % 60);

        let modeName = '模式',
            minTemp = 40,
            maxTemp = 250,
            minTime = 5,
            maxTime = 180;
        if (deviceSwitch == 3 && curWorkMode != 0 && curWorkMode != 9) {
            let modeIndex = curWorkMode - 1;
            modeName = stateModel.getItem(modeIndex).name || '模式';
            minTemp = parseInt(stateModel.getItem(modeIndex).mintemp) || 40;
            maxTemp = parseInt(stateModel.getItem(modeIndex).maxtemp) || 250;
            minTime = parseInt(stateModel.getItem(modeIndex).mintime) || 5;
            maxTime = parseInt(stateModel.getItem(modeIndex).maxtime) || 180;
        }

        let statusArry = ['待机中', '烘焙中', '已关机', '离线中', '暂停', '烘培完成'];
        let workText = parseInt(this.state.online) == 2 ? statusArry[3] :
            deviceSwitch == 1 ? statusArry[2] : this.isWait() ? statusArry[0] : isFinish(this.state) ? statusArry[5] :
                cookBookCurIsPause == 1 ? statusArry[4] : statusArry[1];
        if (deviceSwitch == 3 && curWorkMode == 9 && cookBookCurStep != 0 && cookBookTotalSteps != 0) {
            workText = workText + ' ' + cookBookCurStep + "/" + cookBookTotalSteps;
        }
        let modeImgPath = '../static/img/';
        let online = parseInt(this.state.online) || 1;
        if (deviceSwitch == 3 && curWorkMode != 0 && curWorkMode != 9) {
            modeImgPath = modeImgPath + "icon-mode" + (curWorkMode - 1) + '-selected.png';
        } else {
            modeImgPath = modeImgPath + 'icon-mode-normal.png';
        }
        let isNotNperate = online == 2 || deviceSwitch == 1;
        console.log("====>curWorkMode=" + curWorkMode);

        let errorContent = this.state.errorContent || '';
        return (
            <section className="app-body">
                <section
                    className="app-top-container">
                    <article className="onoff-art" onTouchEnd={this.handleOnOff.bind(this)}>
                        <img style={{display: this.isCanCancel() ? "none" : "", opacity: online == 2 ? 0.3 : 1}}
                             src="../static/img/icon-onoff.png" alt=""/>
                        <p style={{
                            display: this.isCanCancel() ? "none" : "",
                            opacity: online == 2 ? 0.3 : 1
                        }}>{deviceSwitch == 1 ? "开机" : "关机"}</p>
                    </article>
                    <div className="app-run-data">
                        <p className="stateDev" >{workText}</p>
                    <div style={{display: this.isCanCancel() ? "" : "none"}} className="app-temp-time">
                        {online == 1 ?
                            (<div>
                                    <span
                                        className="temp-num">{curWorkMode == 9 ? (cookBookCurTempVal ? `${cookBookCurTempVal}℃` : '--')
                                        : (curTempVal ? `${curTempVal}℃` : '--')}</span>
                                <span
                                    className="time-num">{curWorkMode == 9 ? ((initDataFm(cookBookCurTimeRemainHour) + ":" + initDataFm(cookBookCurTimeRemainMin)))
                                    : (initDataFm(curTimeRemainHour) + ":" + initDataFm(curTimeRemainMinute))}</span>
                            </div>)
                            : '-- : --'
                        }
                    </div>
                </div>
            </section>
        <section className="dev-operate-container">
            <div className="flex dev-control-container">
                <article className="flex-cell" onTouchStart={this.handleSelectModel.bind(this)}>
                    <img
                        style={{opacity: isNotNperate || curWorkMode == 9 ? 0.3 : 1}}
                        src={modeImgPath} alt=""/>
                    <p style={{opacity: isNotNperate || curWorkMode == 9 ? 0.3 : 1}}
                       className={modeName == '模式' ? "select_p2 model" : "select_p1"}>{modeName}<i></i>
                    </p>
                </article>
                <article className="flex-cell" onTouchEnd={this.handleStove.bind(this)}>
                    <img style={{opacity: isNotNperate ? 0.3 : 1}}
                         src={stoveStatus == 0 ? "../static/img/icon-lamp-normal.png" : "../static/img/icon-lamp-selected.png"}
                         alt=""/>
                    <p style={{opacity: isNotNperate ? 0.3 : 1}}
                       className={stoveStatus == 0 ? "select_p2" : "select_p1"}>炉灯</p>
                </article>
                <article className="flex-cell" onTouchEnd={this.handleMenu.bind(this)}>
                    <img style={{opacity: isNotNperate ? 0.3 : 1}}
                         src={curWorkMode != 9 || isNotNperate ? "../static/img/icon-menu-normal.png" : "../static/img/icon-menu-selected.png"}
                         alt=""/>
                    <p style={{opacity: isNotNperate ? 0.3 : 1}}
                       className={curWorkMode != 9 || isNotNperate ? "select_p2" : "select_p1"}>云菜谱</p>
                </article>
            </div>
            <section className="footer cancelBtn" onTouchStart={this.handleCancel.bind(this)}>
                <div style={{opacity: online == 2 || !this.isCanCancel() ? 0.3 : 1}}>
                    <p className="select_p2">取消</p>
                </div>
            </section>
        </section>
        <div className="run-set"
             style={showChangeView ? {'opacity': 1, 'display': 'block'} : {'opacity': 0, 'display': 'none'}}>
            <div className="run-set-content">
                <div className="run-set-btn flex">
                    <span className="flex-cell cancel" onTouchEnd={this.handleDialogCancel.bind(this)}>取消</span>
                    <span className="flex-cell confirm"
                          onTouchEnd={this.handleDialogConfirm.bind(this)}>确定</span>
                </div>
                <div className="run-set-contrl">
                    <p className="change-title">{'修改温度时间（' + modeName + '）'}</p>
                    <p className="selectTime">烘焙温度 {tempVal}℃</p>
                    <Range module='dialog' value={tempVal} min={minTemp} max={maxTemp} rate={5}
                           fnFeedback={this.handleTemperatureSet.bind(this)}/>
                    <p className="selectTime">时间 {textTime}</p>
                    <Range module='dialog' value={timeVal} min={minTime} max={maxTime} type='time' rate={1}
                           fnFeedback={this.handleWorkTimeSet.bind(this)}/>
                </div>
            </div>
        </div>
        <DialogStyle show={showTipsDialog} cancelClock={this.cancelTipsDialog.bind(this)}
                     submitClock={this.submitTipsDialog.bind(this)} title='温馨提示'
                     content='美食烘焙中, 确定取消吗？' rightpam='确定'/>

        <DialogStyle show={showErrorDialog} cancelClock={this.cancelErrorDialog.bind(this)}
                     submitClock={this.submitErrorDialog.bind(this)} title='设备故障'
                     content={errorContent} rightpam='联系客服'/>

    </section>
    )
        ;
    }
}

// 开始渲染
het.domReady(() => {
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    if (location.href.match(/page\/menuDetail.html/)) { // 菜单详情页面需单独选择，供app从外部跳转到项目
        ReactDOM.render(<MenuDetail />, document.getElementById('ROOT'));
    } else {
        ReactDOM.render((
            <Router history={hashHistory}>
                <Route path="/" component={App}/>
                <Route path="/SelectModel" component={SelectModel}/>
                <Route path="/MenuList" component={MenuList}/>
                <Route path="/MenuDetail" component={MenuDetail}/>
            </Router>
        ), document.getElementById('ROOT'));
    }
});