// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DialogStyle} from './DialogStyle.jsx';
import {SelectModel} from './SelectModel.jsx';
import {LoadImagModel} from './LoadImagModel.jsx';
import {LoadImagSmall} from './LoadImagSmall.jsx';

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
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle: 0, setNavRightBtnHiden: 0}));
        this.listenStore(Store); // 监听Store
        this.canceldia = () => {
            //console.log("canceldia/......");
            this.setState({
                selectdiag: false,
            });
        };
        this.submitdia = () => {
            //console.log("submitdia/......");
            this.setState({
                selectdiag: false
            });
            this.modelCancel();
        };

        this.canceldiaerr = () => {
            //console.log("canceldia/......");
            this.setState({
                selectdiagErro: false
            });
        };
        this.submitdiaerr = () => {
            //console.log("submitdia/......");
            location.href = "tel:0755-26727188";
            this.setState({
                selectdiagErro: false
            });
        };
        Actions.getData();
    }

    componentWillUpdate(nextProps, nextState) {
        //故障判断
        let isUpdate = false;
        let ErrItems = [];
        if(this.state.BottomNTCFault != nextState.BottomNTCFault){
            isUpdate = true;
        }
        if(this.state.TopNTCFault != nextState.TopNTCFault){
            isUpdate = true;
        }
        if(this.state.PCBANTCFault != nextState.PCBANTCFault){
            isUpdate = true;
        }
        if(this.state.CircuitFault != nextState.CircuitFault){
            isUpdate = true;
        }
        if(this.state.EEPROMFault != nextState.EEPROMFault){
            isUpdate = true;
        }
        if(this.state.LeakageFault != nextState.LeakageFault){
            isUpdate = true;
        }
        if(isUpdate) {
            if (nextState.BottomNTCFault == 1 || nextState.TopNTCFault == 1 || nextState.PCBANTCFault == 1) {
                ErrItems.push('传感器开路');
            }
            if (nextState.BottomNTCFault == 2 || nextState.TopNTCFault == 2 || nextState.PCBANTCFault == 2) {
                ErrItems.push('传感器短路');
            }
            if (nextState.BottomNTCFault == 3) {
                ErrItems.push('底盘超温');
            }
            if (nextState.TopNTCFault == 3) {
                ErrItems.push('上盖超温');
            }
            if (nextState.PCBANTCFault == 3) {
                ErrItems.push('传感器异常');
            }
            if (nextState.CircuitFault == 1) {
                ErrItems.push('主加热电路故障');
            }
            if (nextState.EEPROMFault == 1) {
                ErrItems.push('存储器件故障');
            }
            if (nextState.LeakageFault == 1) {
                ErrItems.push('机器漏电异常');
            }
            if (ErrItems.length > 0) {
                this.setState({
                    selectdiag: false,
                    selectdiagErro: true,
                    errorcontents: ErrItems
                });
            } else {
                this.setState({
                    selectdiagErro: false,
                    errorcontents: []
                });
            }
        }
    }

    handleKeep() {//处理保温事件 (7-保温)
        if (parseInt(this.state.online || 1) == 2) {
            het.toast('设备已离线');
            return false;
        }
        let ErrItems = this.state.errorcontents || [];
        if(ErrItems.length > 0) {
            this.setState({
                selectdiagErro: true
            });
            return false;
        }
        if (parseInt(this.state.model || 0) != 0) {
            return false;
        }
        Actions.keep();
    };

    linkSelectModel(e) {
        e.stopPropagation();
        if (parseInt(this.state.online || 1) == 2) {
            het.toast('设备已离线');
            return false;
        }
        let ErrItems = this.state.errorcontents || [];
        if(ErrItems.length > 0) {
            this.setState({
                selectdiagErro: true
            });
            return false;
        }
        if (parseInt(this.state.model || 0) != 0) return false;
        location.href = "#/SelectModel";
        e.preventDefault();
    }

    modelCancel() {//取消所有状态  变成待机中
        if (parseInt(this.state.online || 1) == 2) {
            het.toast('设备已离线');
            return false;
        }
        let ErrItems = this.state.errorcontents || [];
        if(ErrItems.length > 0) {
            this.setState({
                selectdiagErro: true
            });
            return false;
        }
        if (!this.isCanCancel()) return false;
        Actions.modelCancel();
    };

    isPoll() {//是否是预约状态
        let online = this.state.online || 1;//设备是否在线
        let model = this.state.model || 0;
        let prehour = this.state.prehour || 0;//预约的时间(小时)
        let premin = this.state.premin || 0;//预约时间(分钟)
        let isPoll = 0;
        if (prehour == 0 && premin == 0) {
            isPoll = 0;//没有预约时间
        } else {
            isPoll = 1;//有预约时间
        }
        if (online == 1 && model != 0 && model != 7 && isPoll == 1) {
            return true;
        }
        return false;
    };

    isCanCancel() {
        let online = this.state.online || 1;//设备是否在线
        let model = parseInt(this.state.model) || 0;
        if (online == 1 && model != 0) {
            return true;
        }
        return false;
    };

    cancelDia() {
        if (parseInt(this.state.online || 1) == 2) {
            het.toast('设备已离线');
            return false;
        }
        let ErrItems = this.state.errorcontents || [];
        if(ErrItems.length > 0) {
            this.setState({
                selectdiagErro: true
            });
            return false;
        }
        if (!this.isCanCancel()) return false;
        this.openCancelDialog();
    }

    //时间的处理先不管  后面再说
    openCancelDialog() {
        let title = '温馨提示';
        let content = '确认吗?';
        let rightpam = '确定';
        let model = parseInt(this.state.model) || 0;
        if (this.isPoll()) {
            content = "美食预约中, 确定取消吗?";
        } else if (model == 7) {
            content = "美食保温中, 确定取消吗?";
        } else {
            content = "美食烹饪中, 确定取消吗?";
        }
        this.setState({
            selectdiag: true,
            diatitles: title,
            diacontents: content,
            diaright: rightpam
        });
    }

    initTimeFm(time) {
        return parseInt(time) > 9 ? parseInt(time) : "0" + parseInt(time);
    }

    render() {
        let selectdiag = this.state.selectdiag;
        let selectdiagErro = this.state.selectdiagErro;

        let workarry = ['模式', '标准', '快煮', '稀饭',
            '粥/汤', '蒸煮', '热饭'];
        let workTextArry = [{'stateName': '待机中', 'modelId': 'stateDev1'}
            , {'stateName': '保温中', 'modelId': 'stateDev2'},
            {'stateName': '烹饪中', 'modelId': 'stateDev2'}
            , {'stateName': '预约中', 'modelId': 'stateDev2'},
            {'stateName': '离线中', 'modelId': 'stateDev3'}];
        let model = parseInt(this.state.model) || 0,
            modelImgPath = '../static/img/';
        let online = parseInt(this.state.online) || 1;
        let workText = online == 2 ? workTextArry[4] :
            model != 0 ? (model == 7 ? workTextArry[1] : (this.isPoll() ? workTextArry[3] : workTextArry[2])) : workTextArry[0];
        if (online == 2 || model == 0 || model == 7) {
            modelImgPath = modelImgPath + "model" + (online == 1 ? (model != 0 ? model != 7 ? "_selected.png" : "_disable.png" : "_normal.png") : "_disable.png");
        } else {
            modelImgPath = modelImgPath + model + (online == 1 ? (model != 0 ? model != 7 ? "_selected.png" : "_disable.png" : "_normal.png") : "_disable.png");
        }
        console.log("====>model=" + model);

        let prehour = parseInt(this.state.prehour, 16) || 0;
        let premin = parseInt(this.state.premin, 16) || 0;
        let bookTime = online == 2 ? "" : <i>{this.initTimeFm(parseInt(prehour))}<span
            className="bookTimeDot">:</span>{this.initTimeFm(parseInt(premin))}</i>;
        //console.log("leftTime="+leftTime);
        let TitleTextTime =
            <p>{online == 1 && this.isPoll() ? "预约时长" : ""}
                {online == 1 && this.isPoll() ? bookTime : ""}</p>

        let ErrItems = this.state.errorcontents || [];
        return (
            <section className="app_body">
                <section className={"app_bgimg_hg"}>
                </section>
                <div className="dev_wrokstate">
                    <p className={"stateDev " + workText.modelId}>{workText.stateName}</p>
                    <div className="dev-state appointment">
                        {TitleTextTime}
                    </div>
                    <LoadImagSmall showLoad={(online == 1 && (model != 0 && !this.isPoll())) ? 1 : 2} showSmall={true}/>
                </div>
                <section className="dev_select_canel">
                    <div className="flex selectmodel">
                        <article onTouchEnd={this.handleKeep.bind(this)}>
                            <div>
                                <img
                                    src={online == 1 ?
                                        (model != 0 ?
                                            (model == 7 ? "../static/img/keep_selected.png" : "../static/img/keep_disable.png")
                                            : "../static/img/keep.png") : "../static/img/keep_disable.png"}
                                    alt=""/>
                                <p className={online == 1 ? (model != 0 ? (model == 7 ? "select_p1" : "select_p3") : "select_p2") : "select_p3"}>
                                    保温</p>
                            </div>
                        </article>
                        <article onTouchStart={this.linkSelectModel.bind(this)}>
                            <div>
                                <img src={modelImgPath} alt=""/>
                                <p className={online == 1 ? (model != 0 ? (model != 7 ? "select_p1" : "select_p3") : "select_p2") : "select_p3"}>
                                    {model == 7 ? workarry[0] : workarry[model]}</p>
                            </div>
                        </article>
                    </div>
                    <section className="footer cancel" onTouchStart={this.cancelDia.bind(this)}>
                        <div className="cancelBtn">
                            <p className={this.isCanCancel() ? "select_p1" : "select_p3"}>取消</p>
                        </div>
                    </section>

                </section>
                <DialogStyle show={selectdiag} cancelClock={this.canceldia}
                             submitClock={this.submitdia}
                             title={this.state.diatitles} canCel = {false} content={this.state.diacontents} rightpam={this.state.diaright || '确定'}/>

                <DialogStyle show={selectdiagErro} cancelClock={this.canceldiaerr.bind(this)}
                             submitClock={this.submitdiaerr.bind(this)} rightpam='联系客服'
                             title='设备故障' canCel = {false} errs = {ErrItems}/>

                <LoadImagModel showLoad={this.state.loading}/>
            </section>
        );
    }
}

// 开始渲染
het.domReady(() => {
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/SelectModel" component={SelectModel}/>
        </Router>
    ), document.getElementById('ROOT'));
});