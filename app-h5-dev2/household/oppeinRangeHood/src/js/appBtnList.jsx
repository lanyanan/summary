// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

const appData = {
}
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    console.log("repaint ::: type : "+type+", data : "+data);
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            online:1,
            networkavailable:1,
        };
        this.listenStore(Store); // 监听Store
        this.changeMode = this.changeMode.bind(this);
        this.liveError = this.liveError.bind(this);
        this.getDayHourDesc = this.getDayHourDesc.bind(this);
    }
    changeMode(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        e.preventDefault();
        let where = parseInt(e.currentTarget.getAttribute('data-mode'));
        if ((where === 2 || where === 3 || where === 0) && this.state.runstatus === 7) {
            het.toast("设备已关机");
            return false;
        }
        if (where !== 1 && this.state.runstatus === 3) {
            het.toast("烟机清洗中");
            return false;
        }
        Actions.changeMode(where, this.state.wisdomeye);
    }
    getDayHourDesc(time){
        if (time === undefined || time < 45*24) return false;
        let notCleanTimeStr = "";
        let day = Math.floor(time/24);
        let hour = time%24;
        if (day !== 0) notCleanTimeStr = day + "天";
        if (hour !== 0) notCleanTimeStr = notCleanTimeStr + hour + "小时";
        return notCleanTimeStr;
    }
    liveError(){
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        if(this.state.online==2){
            return '设备与APP已断开连接！'
        }
        if(this.state.water==1){
            return '请补充足够的纯净水!'
        }
        return false;
    }

    render() {
        let changeMode = this.changeMode;

        let online = this.state.online;
        let networkavailable = this.state.networkavailable;
        let runstatus = this.state.runstatus;
        let lightstatus = this.state.lightstatus;
        let water = this.state.water;
        let notcleantime = this.state.notcleantime;

        let statusBar = "";

        if (networkavailable==2){
            statusBar = "当前网络不可用";
        } else if (online==2) {
            statusBar = "设备已离线";
        } else {
            if (lightstatus == 1) statusBar = "照明开";
            if (runstatus == 1){
                statusBar = statusBar + " 模式: 待机中";
            } else if (runstatus == 2){
                statusBar = statusBar+" 模式: 换气工作中";
            } else if (runstatus == 4){
                statusBar = statusBar+" 模式: 电机高速运行中";
            } else if (runstatus== 5){
                statusBar = statusBar+" 模式: 电机中速运行中";
            } else if (runstatus== 6){
                statusBar = statusBar+" 模式: 电机低速运行中";
            } else if (runstatus == 7){
                statusBar = "模式: 已关机";
            } else if (runstatus == 3){
                statusBar = statusBar+" 模式: 清洗中";
                if (water == 1) statusBar = statusBar+" 缺水告警";
            } else {
                statusBar = "--";
            }
        }

        let switchStatus = networkavailable==2 || online==2 || runstatus === 7?"flex-cell  triggered":"flex-cell";
        let lightStatus  = networkavailable==2 || online==2 || lightstatus == 1 || runstatus === 7?"flex-cell  triggered":"flex-cell";
        let breathStatus = networkavailable==2 || online==2 || runstatus === 7 || runstatus == 2?"flex-cell  triggered":"flex-cell";
        // console.log("networkavailable : "+networkavailable+", online : "+online+", statusBar : "+statusBar+", runstatus : "+runstatus+", switchStatus : "+switchStatus+", lightStatus : "+lightStatus+", breathStatus : "+breathStatus);
        let runningOkSwitch = (online==2 || networkavailable==2 || water==1) ? false:true;
        let runningOk = (online==2 || networkavailable==2 || water==1 || runstatus === 3) ? false:true;

        if (runstatus !== 7 && appData.latestRunStatus != undefined && appData.latestRunStatus === 7 && notcleantime > 45*24){//上一次状态是烟机清洗中 现在的状态是不是清洗 给出弹窗提示
            het.toast("您已经"+this.getDayHourDesc(this.state.notcleantime)+"未清洗抽油烟机，请清洗烟机");
        }
        appData.latestRunStatus = runstatus;

        return <aside>
            <h1 className="btn-title">{statusBar}</h1>
            <section className="flex btnlist">
                <article data-mode="1" className={switchStatus} onClick={changeMode} style={runningOkSwitch?{opacity:1}:{opacity:.5}}>
                    <img  src='../static/img/btnlist/1.png' alt=""/>
                    <p>关机</p>
                </article>
                <article data-mode="0" className={lightStatus} onClick={changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                    <img  src='../static/img/btnlist/2.png' alt=""/>
                    <p>照明</p>
                </article>
                <article data-mode="3" className={breathStatus}  onClick={changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                    <img  src='../static/img/btnlist/3.png' alt=""/>
                    <p>换气</p>
                </article>
            </section>
        </aside>;
    }
}

// 开始渲染
het.domReady(()=>{
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