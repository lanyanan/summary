// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

const  AppData = {

}

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
    Actions.repaint(data);

    if (AppData.deviceId === undefined && !!data.deviceId) {
        AppData.deviceId = data.deviceId;
        Actions.getLatestData();
    }
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        Actions.local();
    };
    render() {
        let airlevel = this.state.airlevel||0;
        let pm25Value = this.state.pm25Value||0;
        let formaldehydeValue = this.state.formaldehydeValue||0;
        let TVOCValue = this.state.tvocValue||0;
        let CO2Value = this.state.co2Value||0;
        let pm25Status = pm25Value<75?1:0;
        let formaldehydStatus = formaldehydeValue<100?1:0;
        let tovcStatus = TVOCValue<600?1:0;
        let co2Status = CO2Value<450?1:0;
        let airStatus = "空气质量 : "+["--","优", "良", "中", "差"][airlevel];
        return (
            <div>
                <h1 className="btn-title">{airStatus}</h1>
                <section className="flex btnlist">
                    <article className="flex-cell">
                        <img src={pm25Status?"../static/img/btnlist/jd_home_icon_pm.png":"../static/img/btnlist/jd_home_icon_pm2.png"} alt=""/>
                        <p>{pm25Status?"正常":"超标"}</p>
                    </article>

                    <article className="flex-cell">
                        <img src={formaldehydStatus?"../static/img/btnlist/jd_home_icon_jq.png":"../static/img/btnlist/jd_home_icon_jq2.png"} alt=""/>
                        <p>{formaldehydStatus?"正常":"超标"}</p>
                    </article>

                    <article className="flex-cell">
                        <img src={tovcStatus?"../static/img/btnlist/jd_home_icon_tovc.png":"../static/img/btnlist/jd_home_icon_tovc2.png"} alt=""/>
                        <p>{tovcStatus?"正常":"超标"}</p>
                    </article>
                    <article className="flex-cell">
                        <img src={co2Status?"../static/img/btnlist/jd_home_icon_co2.png":"../static/img/btnlist/jd_home_icon_co22.png"} alt=""/>
                        <p>{co2Status?"正常":"超标"}</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('德赛空气检测仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});

