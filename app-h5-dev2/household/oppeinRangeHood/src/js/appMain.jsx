// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DialogStyle} from './DialogStyle.jsx';
import {DialogButtonOne} from './DialogButtonOne.jsx';

var {Router, Route, hashHistory} = ReactRouter;

const appData = {

    //故障数据计时器，防止一直刷，故障弹窗一直弹
    counterWatering: 0,
    counterOfflineing: 0,

}

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
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
        this.state = {
            online: 1,
            networkavailable: 1,
            isShowDialog: false,
            isShowAlert: false,
            airStatus: -1,//空气质量的档位
            isShowDialogButtonOne: false,
            titleButtonOne: "清洗完成提醒",
            contentButtonOne: "主人, 已完成清洗操作!",
            buttonContentOne: "我知道了",
        };

        this.canceldia = () => {
            this.setState({
                isShowAlert: false,
            });
            this.cancelDialog();
        }
        this.submitdia = () => {
            this.setState({
                isShowAlert: false
            });
            this.submitDialog();
        }
        this.submitDialogButtonOne = () => {
            //console.log("submitdia/......");
            this.setState({
                isShowDialogButtonOne: false
            });
        }

        this.listenStore(Store); // 监听Store
        this.changeMode = this.changeMode.bind(this);
        this.liveError = this.liveError.bind(this);//故障&错误
        this.clickIKnow = this.clickIKnow.bind(this);
        this.submitDialog = this.submitDialog.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
        this.getDayHourDesc = this.getDayHourDesc.bind(this);
    }

    handleTouchTap(e) {
        // console.log('touchTap事件测试');
    }

    changeMode(e) {
        // console.log("--changeMode-- 点击了changeMode 按钮");
        if (this.liveError()) {
            het.toast(this.liveError());
            return false
        }
        if (this.state.water === 1) {
            this.setState({
                titleButtonOne: "缺水提醒",
                contentButtonOne: "请补充足够的纯净水",
                buttonContentOne: "我知道了",
                isShowDialogButtonOne: true,
            });
            return false;
        }
        e.preventDefault();
        let where = parseInt(e.currentTarget.getAttribute('data-seat'));
        if ((where === 2 || where === 3 || where === 0) && this.state.runstatus === 7) {
            het.toast("设备已关机");
            return false;
        }
        if (where !== 1 && this.state.runstatus === 3) {
            het.toast("烟机清洗中");
            return false;
        }
        if (where === 2 && this.state.odor == 0) {
            het.toast("暂无此功能!");
            return false;
        }
        Actions.changeMode(where, this.state.wisdomeye);
    }

    getDayHourDesc(time) {
        if (time === undefined || time < 45 * 24) return false;
        let notCleanTimeStr = "";
        let day = Math.floor(time / 24);
        let hour = time % 24;
        if (day !== 0) notCleanTimeStr = day + "天";
        if (hour !== 0) notCleanTimeStr = notCleanTimeStr + hour + "小时";
        return notCleanTimeStr;
    }

    liveError() {
        if (this.state.networkavailable == 2) {
            return '当前网络不可用！'
        }
        if (this.state.online == 2) {
            return '设备与APP已断开连接！'
        }
        return false;
    }

    clickIKnow(e) {
        let status = this.state.isShowDialog;
        this.setState({
            isShowDialog: !status,
        });
    }

    submitDialog() {
        // console.log("弹窗 点击确定");
        Actions.startVentilation();//打开换气
    }

    cancelDialog() {
        // console.log("弹窗 点击取消");
        Actions.hideDialog();
    }

    render() {
        let online = this.state.online;
        let networkavailable = this.state.networkavailable;
        let runstatus = this.state.runstatus;
        let lightstatus = this.state.lightstatus;
        let water = this.state.water;
        let odor = this.state.odor;
        let wisdomeye = this.state.wisdomeye;
        let notcleantime = this.state.notcleantime;
        let changeMode = this.changeMode;

        // console.log("===state===online : "+online+", networkavailable : "+networkavailable+", runstatus : "+runstatus+", lightstatus : "+lightstatus+", water : "+water+", odor : "+odor+", wisdomeye : "+wisdomeye+", notcleantime : "+notcleantime);
        let onlineHint = online == 2 ? 'dev-offline slide-up' : 'dev-offline slide-down';
        let onLineHintStatus = online == 2 ? "device-status hide" : "device-status";

        //是否打开了照明
        let isOpenLight = online == 1 && networkavailable == 1 && lightstatus === 1 && runstatus !== 7;
        //是否打开了设备
        let isOpenPower = online == 1 && networkavailable == 1 && runstatus !== 7;
        //是否打开了智慧眼  true:打开;false:关闭
        let isOpenWisdomEye = online == 1 && networkavailable == 1 && runstatus === 1 && wisdomeye === 1 && odor != 0;//设备在线 且有网 且待机状态下 且智慧眼打开 且气味值不为0
        //是否打开了换气
        let isOpenVentilation = online == 1 && networkavailable == 1 && runstatus === 2;

        // console.log("====== isOpenLight : "+isOpenLight+", isOpenWisdomEye : "+isOpenWisdomEye+", isOpenVentilation : "+isOpenVentilation);
        // let airStatusDiv = isOpenWisdomEye || runstatus == 1? "air-status" : "air-status hide";//显示/隐藏空气质量
        let airStatusDiv = online == 2 || networkavailable == 2 || runstatus === 7 || odor === 0 ? "air-status hide" : "air-status";
        let airStatus = odor !== undefined ? (odor < 10 ? 0 : (odor < 20 ? 1 : (odor < 50 ? 2 : (odor < 70 ? 3 : 4)))) : 5;//空气质量档位
        let airStatusImg = ["../static/img/air-status-1.png", "../static/img/air-status-2.png", "../static/img/air-status-3.png", "../static/img/air-status-4.png", "../static/img/air-status-5.png", "../static/img/air-status-3.png"][airStatus];
        let airStatusDesc = ["空气优", "轻度污染", "中度污染", "高度污染", "预警", "未知"][airStatus];
        let workStatus = runstatus === 4 || runstatus === 5 || runstatus === 6 ? (runstatus - 2) : 1;
        let workStatusImg = "../static/img/device-screen-" + workStatus + ".jpg";
        let lightingImg = isOpenLight ? "../static/img/mode-1-on.png" : "../static/img/mode-1-off.png";
        let switchImg = online == 2 || runstatus === 7 ? "../static/img/mode-2-off.png" : "../static/img/mode-2-on.png";
        let smartImg = isOpenWisdomEye ? "../static/img/mode-3-on.png" : "../static/img/mode-3-off.png";
        let breathImg = isOpenVentilation ? "../static/img/mode-4-on.png" : "../static/img/mode-4-off.png";
        let textColorLighting = isOpenLight ? "color-yellow" : "color-black";
        let textColorSwitch = online == 2 || runstatus === 7 ? "color-black" : "color-yellow";
        let textColorSmart = isOpenWisdomEye ? "color-yellow" : "color-black";
        let textColorBreath = isOpenVentilation ? "color-yellow" : "color-black";
        let textColseDesc = runstatus === 7 ? "开机" : "关机";
        let lineStatusDesc = "";
        if (runstatus === undefined) {
            lineStatusDesc = "--";
        } else if (runstatus === 4 || runstatus === 5 || runstatus === 6) {
            lineStatusDesc = ["高速运行", "中速运行", "低速运行"][runstatus - 4];
        } else if (runstatus === 1) {
            lineStatusDesc = "待机中";
        } else if (runstatus === 3) {
            lineStatusDesc = "烟机清洗中";
            if (water == 1) {
                lineStatusDesc = lineStatusDesc + " 缺水告警";
            }
        } else {
            lineStatusDesc = ["待机中", "换气模式工作中", "烟机清洗中", "电机高速运行中", "电机中速运行中", "电机低速运行中", "已关机"][runstatus - 1];
        }
        if (runstatus == 3 && (appData.latestWater === undefined || appData.latestWater == 2) && water == 1) {
            this.state.titleButtonOne = "缺水提醒";
            this.state.contentButtonOne = "请补充足够的纯净水";
            this.state.buttonContentOne = "我知道了";
            this.state.isShowDialogButtonOne = true;
        }
        appData.latestWater = water;
        let title = "智慧眼提醒";
        let message = "厨房空气质量差, 请开启烟机联动换气!";
        // console.log("this.state.isShowAlert : "+this.state.isShowAlert);
        if (online == 2 && appData.latestOnline != undefined && appData.latestOnline == 1) {//上一次状态是在线 现在的状态是离线 给出弹窗提示
            this.state.titleButtonOne = "离线提醒";
            this.state.contentButtonOne = "主人, 设备与app已断开连接!";
            this.state.buttonContentOne = "我知道了";
            this.state.isShowDialogButtonOne = true;
        }
        appData.latestOnline = online;


        if (runstatus !== 7 && appData.latestRunStatus != undefined && appData.latestRunStatus === 7 && notcleantime > 45 * 24) {//上一次状态是烟机清洗中 现在的状态是不是清洗 给出弹窗提示
            this.state.titleButtonOne = "清洗提醒";
            this.state.contentButtonOne = '您已经' + this.getDayHourDesc(notcleantime) + '未清洗抽油烟机，请清洗烟机';
            this.state.buttonContentOne = "我知道了";
            this.state.isShowDialogButtonOne = true;
        }
        if (runstatus !== 3 && appData.latestRunStatus != undefined && appData.latestRunStatus === 3) {//上一次状态是烟机清洗中 现在的状态是不是清洗 给出弹窗提示
            this.state.titleButtonOne = "清洗完成提醒";
            this.state.contentButtonOne = "主人, 已完成清洗操作!";
            this.state.buttonContentOne = "我知道了";
            this.state.isShowDialogButtonOne = true;
        }
        appData.latestRunStatus = runstatus;

        return <div onTouchTap={this.handleTouchTap.bind(this)}>
            <div className="app-body">
                <div className="dev-screen">
                    <img src={workStatusImg} alt=""/>
                    <h5 className={onLineHintStatus}>{lineStatusDesc}</h5>
                    <div className={airStatusDiv}>
                        <img src={airStatusImg} alt=""/>
                        <span>{airStatusDesc}</span>
                    </div>
                </div>
                <div className="app-btns">
                    <div data-seat="0" className="app-btns-child" onClick={changeMode}
                         style={runstatus === 3 ? {opacity: .5} : {opacity: 1}}>
                        <img src={lightingImg} alt=""/>
                        <h5 className={textColorLighting}>照明</h5>
                    </div>
                    <div data-seat="1" className="app-btns-child" onClick={changeMode}>
                        <img src={switchImg} alt=""/>
                        <h5 className={textColorSwitch}>{textColseDesc}</h5>
                    </div>
                    <div data-seat="2" className="app-btns-child" onClick={changeMode}
                         style={runstatus === 3 ? {opacity: .5} : {opacity: 1}}>
                        <img src={smartImg} alt=""
                             style={odor == 0 ? {opacity: .3} : (runstatus === 3 ? {opacity: .5} : {opacity: 1})}/>
                        <h5 className={textColorSmart}
                            style={odor == 0 ? {opacity: .3} : (runstatus === 3 ? {opacity: .5} : {opacity: 1})}>
                            智慧眼</h5>
                    </div>
                    <div data-seat="3" className="app-btns-child" onClick={changeMode}
                         style={runstatus === 3 ? {opacity: .5} : {opacity: 1}}>
                        <img src={breathImg} alt=""/>
                        <h5 className={textColorBreath}>换气</h5>
                    </div>
                    <figure className={onlineHint}>{'主人,您的抽油烟机不在线哦~!'}</figure>
                </div>
                <DialogButtonOne show={this.state.isShowDialogButtonOne}
                                 submitClock={this.submitDialogButtonOne} cancelClock={this.submitDialogButtonOne}
                                 title={this.state.titleButtonOne} content={this.state.contentButtonOne}
                                 button_content={this.state.buttonContentOne}/>
                <DialogStyle show={this.state.isShowAlert} cancelClock={this.canceldia}
                             submitClock={this.submitdia}
                             title={title} content={message}/>
            </div>
        </div>;
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
     <Router history={hashHistory}>
     <Route path="/" component={App} />
     </Router>
     ), document.getElementById('ROOT'));*/
});