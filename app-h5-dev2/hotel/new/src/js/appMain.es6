// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Home} from './Home.es6';
import {Lamp} from './Lamp.es6';
import {Reseting} from './Reseting.es6';
import {Music} from './Music.es6';
import {List} from './list.es6';
import {Timing} from './Timing.es6';
import {Toast} from './toast.es6';
import {Switch} from './Switch.es6';

var {Router, Route, hashHistory,IndexRedirect} = ReactRouter;

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
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    render() {
        return <div className="app">{this.props.children}</div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('星月音乐智能灯');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="lamp" />
    			<Route path="lamp" component={Lamp} />
    			<Route path="timing" component={Timing} />
    			<Route path="music" component={Music} />
                <Route path="list" component={List} />
                <Route path="reseting" component={Reseting} />
                <Route path="toast" component={Toast} />
                <Route path="switch" component={Switch} />
            </Route>
        </Router>
    ), document.getElementById('ROOT'));
});