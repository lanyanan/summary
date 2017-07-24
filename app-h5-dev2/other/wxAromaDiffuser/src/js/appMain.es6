// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store, isShutdown} from './Store.es6';
// 加载组件
import {DevScreen} from './DevScreen.jsx';
import {Lights} from './Lights.jsx';
import {Clock} from './Clock.jsx';
import {Colors} from './Colors.jsx';
import {Clock2} from './PowerClock.jsx';
import {Mists } from './Mists.jsx';
var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
// het.repaint 接收到的是一个回调函数，当作请求的res就好，然后传入到action的repaint方法里去
// repaint方法监听到数据改变，执行dom diff算法，根据算法结果执行相关页面UI重绘
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});
// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        //setInterval(Actions.getOnlineData, 4000);//4秒刷新
        if(this.state.timer===null || this.state.timer===undefined){
            this.state.timer = setInterval(Actions.getOnlineData, 4000);//4秒刷新
        };
        //setTimeout(()=>{Actions.getOnlineData(); // 获取运行数据}, 4000);
    }
    //加载默认数据
    componentDidMount() {
        Actions.getDefaultData();
    }

    render() {
        return <div className="app-body">
                <div className={"startupface " + (isShutdown(this.state) ? "slide-down" : "slide-up")}>
                    <DevScreen colorIndex={this.state.color} />
                    <div id="panel-scroller">
                        <div>
                            <Lights lightIndex={this.state.light} />
                            {/*
                            <h2>定时</h2>
                            <Clock timeValue={this.state.timerPresetTime} />
                            */}
                            <h2>喷雾</h2>
                            <Mists mistIndex={this.state.mist} />
                            <h2>颜色</h2>
                            <Colors colorIndex={this.state.color} />

                        </div>
                    </div>
                </div>
                <div className={"shutdownface " + (isShutdown(this.state) ? "slide-up" : "slide-down")}>
                    <div className="pic"></div>
                    <a href="javascript:" className="switch" onClick={Actions.switch}></a>
                </div>
            </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('加湿器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});

