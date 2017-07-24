// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DialogStyle} from './DialogStyle.jsx';
import {SelectModel} from './SelectModel.jsx';
import {LoadImagModel} from './LoadImagModel.jsx';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data)=> {
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle(JSON.stringify({setNavTitle:0,setNavRightBtnHiden:0}));
        this.listenStore(Store); // 监听Store
        this.canceldia = ()=> {
            //console.log("canceldia/......");
            this.setState({
                selectdiag: false,
            });
        }
        this.submitdia = ()=> {
            //console.log("submitdia/......");
            this.setState({
                selectdiag: false
            });
            if ((this.state.diaId || 1) == 1) {
                this.handleCoff();
            } else if ((this.state.diaId || 1) == 2) {
                this.cancelState();
            } else {
                //其他类型
            }
        }

        this.canceldiaerr = ()=> {
            //console.log("canceldia/......");
            this.setState({
                diaErrShow: 1
            });
        }
        this.submitdiaerr = ()=> {
            //console.log("submitdia/......");
            location.href="tel:4007772009";
            //location.href="tel:4006366396";
            this.setState({
                diaErrShow: 1
            });

        }
        Actions.getData();
    }
    cancelState() {//取消所有状态  变成待机中
        if (!this.iscanCanel() || parseInt(this.state.online || 1) == 2) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({

                diaErrShow: 0
            });
            return false;
        }
        Actions.cancelElm();
    };

    linkSelectModel(e) {
        e.stopPropagation();
        if (parseInt(this.state.cOnoff || 1) == 1 || parseInt(this.state.online || 1)== 2 || parseInt(this.state.workStatus || 0) != 0) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        location.href = "#/SelectModel";
        e.preventDefault();
    }


    handleCoff() {//处理开机事件 (1-关机，2-开机)
        if (parseInt(this.state.online || 1) == 2) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        let childoff = parseInt(this.state.cOnoff) || 1;
        childoff == 1 ? childoff = 2 : childoff = 1;
        Actions.cOnoff(childoff);

    };

    handleHotwind() {//热风选择
        if (parseInt(this.state.workStatus || 0) == 0 || parseInt(this.state.cOnoff || 1) == 1 || parseInt(this.state.online || 1) == 2 || this.ispoll()) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        let cHotWindSw = parseInt(this.state.cHotWindSw) || 1;
        //console.log("cHotWindSw="+cHotWindSw);
        cHotWindSw == 1 ? cHotWindSw = 2 : cHotWindSw = 1;
        Actions.swicthHotWind(cHotWindSw);
    };

    isCoff() {//true 开机  false  关机
        let cOnoff = parseInt(this.state.cOnoff) || 1;//是否开关机
        let onoff = parseInt(this.state.onoff) || 1;//是否开关机
        return onoff == 2 || this.state.onoff == 'undefined' ? true : false;
    }

    ispoll() {//是否是预约状态k
        let workStatus = parseInt(this.state.workStatus) || 0;
        let setBookingTimeHour = this.state.setBookingTimeHour || 0;//预约的时间(小时)
        let setBookingtimeMin = this.state.setBookingtimeMin || 0;//预约时间(分钟)
        let ispoll = 0;
        if (setBookingTimeHour == 0 && setBookingtimeMin == 0) {
            ispoll = 0;//没有预约时间
        } else {
            ispoll = 1;//有预约时间
        }
        if (parseInt(this.state.cOnoff || 1)== 2 && workStatus != 0 && ispoll == 1) {
            return true;
        }
        return false;
    };

    iscanCanel() {
        let workStatus = parseInt(this.state.workStatus) || 0;
        if (parseInt(this.state.cOnoff) == 2 && workStatus != 0) {
            return true;
        }
        return false;
    };

    iswait() {//待机中
        let cOnoff = parseInt(this.state.cOnoff) || 1;
        if (cOnoff == 1) {
            return true;
        }
        return false;
    };

    isopenDevice() {//已开机
        let cOnoff = parseInt(this.state.cOnoff) || 1;
        let workStatus = parseInt(this.state.workStatus) || 0;
        if (cOnoff == 2 && workStatus == 0) {
            return true;
        }
        return false;
    };

    cancelDia() {
        if (!this.iscanCanel() || parseInt(this.state.online ||　1) == 2) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        this.openOffCanelDialog(2);
    }

    handDiacOff() {
        if(parseInt(this.state.online || 1) == 2) return false;
        if (parseInt(this.state.senseError || 0) == 1){
            this.setState({
                diaErrShow: 0
            });
            return false;
        }
        let childoff = parseInt(this.state.cOnoff) || 1;
        if (childoff == 2) {
            this.openOffCanelDialog(1);
        } else {
            this.handleCoff();
        }
    }

    //时间的处理先不管  后面再说
    openOffCanelDialog(id) {//id 1 是关机    id 2是取消 3是其他
        let title = '温馨提示';
        let content = '确认吗?';
        let rightpam = '确定';
        if (this.iswait()) {
            title = "温馨提示";
            content = id == 1 ? "待机中, 确定关机吗?" : "待机中, 确定取消吗?";
            rightpam = id == 1 ? "关机" : "确定";
        } else if (this.isopenDevice()) {
            title = "温馨提示";
            content = id == 1 ? "已开机, 确定关机吗?" : "已开机, 确定取消吗?";
            rightpam = id == 1 ? "关机" : "确定";
        } else if (this.ispoll()) {
            title = "温馨提示";
            content = id == 1 ? "美食预约中, 确定关机吗?" : "美食预约中, 确定取消吗?";
            rightpam = id == 1 ? "关机" : "确定";
        } else {
            title = "温馨提示";
            content = id == 1 ? "美食烘焙中, 确定关机吗?" : "美食烘焙中, 确定取消吗?";
            rightpam = id == 1 ? "关机" : "确定";
        }
        this.setState({
            selectdiag: true,
            diatitles: title,
            diacontents: content,
            diaId: id,
            diaright:rightpam
        });
    }

    initTimeFm(time) {
        return parseInt(time) > 9 ? parseInt(time) : "0" + parseInt(time);
    }

    render() {
        let senseError = parseInt(this.state.senseError || 0);
        let selectdiag = this.state.selectdiag;
        let diaErrShow = this.state.diaErrShow || 0;//0 开 1关
        let selectdiagErro = (senseError==1 && diaErrShow == 0)?true: false;


        let HotWindStatus = parseInt(this.state.HotWindStatus) || 1;//1 关 2开
        let workarry = ['模式', '上烤', '下烤', '上下烤', '发酵',
            '解冻', '消毒', '饼干', '蛋挞', '面包', '烤肉', '披萨', '烤薯'];
        let workTextArry = [{ 'stateName': '待机中', 'modeId': 'stateDev1' }
            , { 'stateName': '已开机', 'modeId': 'stateDev2' },
            { 'stateName': '烘焙中', 'modeId': 'stateDev3' }
            , { 'stateName': '预约中', 'modeId': 'stateDev4' },
            { 'stateName': '离线中', 'modeId': 'stateDev5' }];
        let workText = parseInt(this.state.online)== 2?workTextArry[4]: this.iswait() ? workTextArry[0] : this.isopenDevice() ? workTextArry[1] : this.ispoll() ? workTextArry[3] : workTextArry[2];
        let workStatus = parseInt(this.state.workStatus) || 0;
        let mode =  parseInt(this.state.workStatus) || 0,
            modeImgPath = '../static/img/';
        let online = parseInt(this.state.online) || 1;
        let onoff = parseInt(this.state.onoff) || 1;
        let cOnoff = parseInt(this.state.cOnoff) || 1;
        modeImgPath = modeImgPath + mode + (cOnoff == 1 || online == 2 || workStatus != 0 ? '_1.png' : '_2.png');
        console.log("====>workStatus=" + workStatus);
        let hotText = HotWindStatus == 1?"": "热风 ";

        let TitleText = mode == 0 ? "" : workarry[mode];
        let leftbookingTimeHour = this.state.leftbookingTimeHour || 0;
        let leftBookingtimeMin = this.state.leftBookingtimeMin || 0;
        let bookTime = online == 2? "": <i>{this.initTimeFm(parseInt(leftbookingTimeHour))}<span className="bookTimeDot">:</span>{this.initTimeFm(parseInt(leftBookingtimeMin))}</i>;
        let leftTimeHour = this.state.leftTimeHour || 0;
        let leftTimeMin = this.state.leftTimeMin || 0;
        let leftTime = online == 2? "": <i>{this.initTimeFm(parseInt(leftTimeHour))}<span  className="bookTimeDot">:</span>{this.initTimeFm(parseInt(leftTimeMin))}</i>
        //console.log("leftTime="+leftTime);
        let TitleTextTime = <p>{ online == 2?"" : this.iswait() ? "" : this.isopenDevice() ? "已开机,请选择工作模式" : this.ispoll() ? TitleText + "预约中 " : hotText +  TitleText + "进行中 "}{this.iswait() ? "" : this.isopenDevice() ? "" : this.ispoll() ? bookTime : leftTime}</p>
        return (
            <section className="app_body">
                <section
                    className={online == 2 || onoff == 1 || workStatus == 0 ||this.ispoll() ? "app_bgimg_hg":"app_bgimgHG"}>
                    <p className={"stateDev "+workText.modeId}>{workText.stateName}</p>
                </section>
                <div className="dev_wrokstate">
                    <div className="dev-state appointment">
                        {TitleTextTime}
                    </div>
                </div>
                <section className="dev_select_canel">
                    <div className="flex selectmodel">
                        <article className="flex-cell " onTouchEnd={this.handDiacOff.bind(this)}>
                            <img style={online==2?{opacity:0.3}:{opacity:1}}
                                 src={this.isCoff()?"../static/img/coff.png":"../static/img/coff.png"} alt=""/>
                            <p style={online==2?{opacity:0.3}:{opacity:1}}
                               className={this.isCoff()?"select_p2":"select_p2"}>{this.isCoff() ? '关机' : '开机'}</p>
                        </article>
                        <article className="flex-cell " onTouchEnd={this.handleHotwind.bind(this)}>
                            <img style={online == 2?{opacity:0.3}:this.iscanCanel()?this.ispoll()?{opacity:0.3}:{opacity:1}:{opacity:0.3}}
                                 src={HotWindStatus==1?"../static/img/hot_wind_off.png":"../static/img/hot_wind_on.png"}
                                 alt=""/>
                            <p style={online == 2?{opacity:0.3}: this.iscanCanel()?this.ispoll()?{opacity:0.3}:{opacity:1}:{opacity:0.3}}
                               className={HotWindStatus==1?"select_p2":"select_p1"}>热风</p>
                        </article>
                        <article className="flex-cell " onTouchStart={this.linkSelectModel.bind(this)}>
                            <img
                                style={cOnoff==1 || online==2 || workStatus != 0?{opacity:0.3}:{opacity:1}}
                                src={modeImgPath} alt=""/>
                            <p  style={cOnoff==1 || online==2 || workStatus != 0?{opacity:0.3}:{opacity:1}}
                               className={cOnoff==1 || online==2 || workStatus != 0?"select_p2":"select_p1"}>{workarry[workStatus]}</p>
                        </article>
                    </div>
                    <section className="footer cancel" onTouchStart={this.cancelDia.bind(this)}>
                        <div style={online == 2?{opacity:0.3}: this.iscanCanel()?{opacity:1}:{opacity:0.3}} className="cancelBtn">
                            <p className={this.iscanCanel()?"select_p2":"select_p2"}>取消</p>
                        </div>
                    </section>

                </section>
                <DialogStyle show={selectdiag} cancelClock={this.canceldia}
                             submitClock={this.submitdia}
                             title={this.state.diatitles} content={this.state.diacontents} rightpam={this.state.diaright || '确定'}/>

                <DialogStyle show={selectdiagErro} cancelClock={this.canceldiaerr.bind(this)}
                             submitClock={this.submitdiaerr.bind(this)} rightpam='联系客服'
                             title='设备故障' content="温度传感器异常"/>

                <LoadImagModel showLoad={this.state.loading}/>
            </section>
        );
    }
}

// 开始渲染
het.domReady(()=> {
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/SelectModel" component={SelectModel} />
        </Router>
    ), document.getElementById('ROOT'));
});