import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.jsx';
import {FirstPage} from './FirstPage.jsx';
import {SettingPage} from './SettingPage.jsx';
import {Loading} from './Loading.jsx';
import Alert from './Alert.jsx';

const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {
    count: 0,
    lastMode: 0,
    lastRecordTime: 0,
    slideClose: true,
    slideCount: 0,

    //故障数据计时器，防止一直刷，故障弹窗一直弹
    counterDryburning:0,
    counterHightemperature:0,
    counterOpencircuit:0,
    counterShortcircuit:0,

    counterSurplus:0,
    //倒计时实时更改防止数据跳变，显隐定时器
    timer:null,
}
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
        filter : {}
    });
});
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});
//生命周期函数是否需要注册this，bind之后才能拿到传入的参数的实时值
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            mode:0,
            runningMode:0,

            online:1,
            networkavailable:1,
            dryburning:0,
            hightemperature:0,
            opencircuit:0,
            shortcircuit:0,

            isShowAlert:false,
            countdownShow:false,
        };
        Actions.local();
        this.listenStore(Store);
        this.slide = this.slide.bind(this);
        this.cancel = this.cancel.bind(this);
        //基于小时分钟自定义数组的时间选择组件,触发，取消，提交
        this.openClock = this.openClock.bind(this);
        this.cancelClock = this.cancelClock.bind(this);
        this.submitClock = this.submitClock.bind(this);
        //故障&错误
        this.liveError = this.liveError.bind(this);
        //子组件更改父组件字段
        this.childSetState = this.childSetState.bind(this);
    }
    componentWillMount(){
        het.setTitle(JSON.stringify({
            setNavTitle:0,
            setNavRightBtnHiden:0
        }))
    }
    componentWillUpdate(){}
    componentDidMount(){
        alert("123123");
    }
    openClock(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        let where = e.currentTarget.getAttribute('data-seat');
        this.setState({
            selectshow:true,
            boot: where,
        })
    }
    cancelClock(){
        Actions.cancelSelect();
    }
    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组
        let me = this;
        let where = this.state.boot;
        let live = true;
        Actions.submitSelect(h,m,where,live);
        //隐藏选择控件，调出菊花loading
        this.setState({
             loadingShow:true,
             selectshow:false,
        });
        //清除定时器，并开启定时器，菊花loading转5秒
        clearTimeout(appData.timer);
        appData.timer = setTimeout(function(){
            me.setState({
                loadingShow:false
            });
        },5000);
    }
    slide(){
        if(this.liveError()){het.toast(this.liveError());return false};
        window.location.href = '#/settingPage';
    }
    cancel(){
        if(this.liveError()){het.toast(this.liveError());return false};
        let reserveOverIf = parseInt(this.state.surplusreservehour)+parseInt(this.state.surplusreservemin);
        if(reserveOverIf != 0){
            //预约中直接取消
            Actions.cancel({
                countdownShow:false,
                GongZuoMoShiSheZhi: 0,

                YuYueShiJianSheZhiXiaoShi: 0,
                YuYueShiJianSheZhiFenZhong: 0,
                HuoLiSheZhi: 1,
                JiaReShiJianSheZhiXiaoShi: 0,
                JiaReShiJianSheZhiFenZhong: 0,
            });
        }else{
            //加热中点击取消，弹出取消提示对话框，关闭（取消）对话框逻辑在组件里完成，加热中的确认取消操作在下一个方法里执行
            this.setState({isShowAlert: true});
        }
    }
    childSetState(state,fn){
        //加热中用户点击确认，执行取消命令，并关闭取消提示对话框
        //0武火，1文火，待机文火
        setTimeout(()=>{
            this.setState({isShowAlert:state.isShowAlert});
            state.sure && Actions.cancel({
                countdownShow:false,
                GongZuoMoShiSheZhi: 0,
                YuYueShiJianSheZhiXiaoShi: 0,
                YuYueShiJianSheZhiFenZhong: 0,
                HuoLiSheZhi: 1,
                JiaReShiJianSheZhiXiaoShi: 0,
                JiaReShiJianSheZhiFenZhong: 0,
             });
        },200);
    }
    liveError(){
        if(this.state.online==2){
            return '设备与APP已断开连接！'
        }
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        if(this.state.dryburning==1){
            return '{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}'
        }
        if(this.state.hightemperature==1){
            return '{"title":"高温保护", "content":"高温保护", "button":"我知道了"}'
        }
        if(this.state.opencircuit==1){
            return '{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'
        }
        if(this.state.shortcircuit==1){
            return '{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'
        }
        return false;
    }
    render() {

        //控制数据
        let mode =  this.state.mode!=undefined ? this.state.mode:0;  /*this.state.mode!=undefined ?this.state.mode:'';*/
        let modeName = this.state.modeName!=undefined ? this.state.modeName:'模式';
        let fire = this.state.fire!=undefined ?this.state.fire:0;

        //控制数据
        let runningMode = this.state.runningMode!=undefined ? this.state.runningMode:0;
        let runningModeName = this.state.runningModeName!=undefined ? this.state.runningModeName:'模式';
        let runningFire = this.state.runningFire!=undefined ? this.state.runningFire:0;

            if(mode!=0 && mode!=1) this.state.countdownShow = true;

        let operate = {
            //故障&&离线
            online: this.state.online,
            networkavailable:this.state.networkavailable ?this.state.networkavailable:1,
            hightemperature:this.state.hightemperature?this.state.hightemperature:'',
            dryburning:this.state.dryburning!=undefined?this.state.dryburning:'',
            opencircuit:this.state.opencircuit!=undefined ?this.state.opencircuit:'',
            shortcircuit:this.state.shortcircuit!=undefined ?this.state.shortcircuit:'',

            //控制数据 全部使用运行数据渲染
            mode: runningMode,
            modeName: runningModeName,
            fire: runningFire,

            //仅供调试打印
            runningMode:runningMode,
            runningModeName:runningModeName,

            reservehour: this.state.reservehour!=undefined ?this.state.reservehour:'',
            reservemin: this.state.reservemin!=undefined ?this.state.reservemin:'',

            heatinghour: this.state.heatinghour!=undefined ?this.state.heatinghour:'',
            heatingmin: this.state.heatingmin!=undefined ?this.state.heatingmin:'',
            //运行数据
            workingstatus: this.state.workingstatus!=undefined?this.state.workingstatus:'',
            surplusreservehour: this.state.surplusreservehour!=undefined ?this.state.surplusreservehour:'',
            surplusreservemin: this.state.surplusreservemin!=undefined ?this.state.surplusreservemin:'',
            surplusworkhour : this.state.surplusworkhour!=undefined ?this.state.surplusworkhour:'',
            surplusworkmin : this.state.surplusworkmin!=undefined ?this.state.surplusworkmin:'',
            //运行倒计时
            countdownShow: this.state.countdownShow,
            //菊花
            loadingShow:this.state.loadingShow,
            //info:this.state.info
        };
        //选择控件参数
        let boot = this.state.boot!==''?this.state.boot:false;
        let selectshow = this.state.selectshow?this.state.selectshow:false;
        let selecttitle = ['预约时间','火力','加热时长'][boot];
        let hourshow = [true,true,true][boot];
        let minuteshow= [true,false,false][boot];
        let maxhour = [14,false,60][boot];
        let maxmin = [45,false,0][boot];
        let minhour = [1,0,1][boot];
        let minminute = [0,0,0][boot];
        let hourstep = [15,false,1][boot];
        let minutestep = [15,false,false][boot];
        let hourunit = ['小时','火','分钟'][boot];
        let minuteunit = '分钟';
        let defaulthour = 0;
        let defaultminute = 0;
        let hourarray = [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],['武','文'],false][boot];
        let ArrayInit = this.state.selectshow == false ? true:false;

        //离线&故障数据
        let online = this.state.online!=undefined?this.state.online:1;
        let networkavailable =this.state.networkavailable!=undefined?this.state.networkavailable:1;
        let hightemperature = this.state.hightemperature!=undefined?this.state.hightemperature:1;
        let dryburning = this.state.dryburning!=undefined?this.state.dryburning:0;
        let opencircuit = this.state.opencircuit!=undefined?this.state.opencircuit:0;
        let shortcircuit = this.state.shortcircuit!=undefined?this.state.shortcircuit:0;

        //设备故障自动弹出(干烧，高温保护，开路，短路)，且只弹一次
        if(appData.counterDryburning!=dryburning){
            appData.counterDryburning = dryburning;
            dryburning==1 && (selectshow=false,het.toast('{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}'));
        }
        if(appData.counterHightemperature!=hightemperature){
            appData.counterHightemperature = hightemperature;
            hightemperature==1 && (selectshow=false,het.toast('{"title":"高温保护", "content":"高温保护", "button":"我知道了"}'));
        }
        if(appData.counterOpencircuit!=opencircuit){
            appData.counterOpencircuit = opencircuit;
            opencircuit==1 && (selectshow=false,het.toast('{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'));
        }
        if(appData.counterShortcircuit!=shortcircuit){
            appData.counterShortcircuit = shortcircuit;
            shortcircuit==1 && (selectshow=false,het.toast('{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}'));
        }
        //故障时隐藏选择控件
        if(dryburning==1 || hightemperature==1 || opencircuit==1 || opencircuit==1 || online==2 || networkavailable==2 ) Actions.cancelSelect();

        //弹窗控件参数
        let title = '取消提醒';
        let message = '主人，停止工作可能会损失食材，确定要这么做吗？';

        return(
            <main>
                <FirstPage
                    operate={operate}
                    liveError={this.liveError}
                    slide={this.slide}
                    cancel={this.cancel}
                    openClock={this.openClock}
                />
                {this.state.isShowAlert ?<Alert  title={title} message={message} childSetState={this.childSetState} />:''}
                <TimeSelect
                    show={selectshow}
                    title={selecttitle}

                    hourshow={hourshow}
                    hourstep={hourstep}
                    hourunit={hourunit}
                    minhour={minhour}
                    maxhour={maxhour}

                    minuteshow={minuteshow}
                    minutestep={minutestep}
                    minuteunit={minuteunit}
                    minminute={minminute}
                    maxmin={maxmin}

                    defaulthour={defaulthour}
                    defaultminute={defaultminute}
                    cancelClock={this.cancelClock}
                    submitClock={this.submitClock}
                    hourarray={hourarray}
                    ArrayInit={ArrayInit}
                />
            </main>
        )
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('养生锅');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/settingPage" component={SettingPage} />
        </Router>
    ), document.getElementById('ROOT'));
});
// 渲染结束                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 