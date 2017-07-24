// import {Funs} from '../../../common/src/fun.es6';
import App from './App.es6';
import {Actions} from './Actions.es6';

// tab
import DeviceList from './DeviceList.es6';
import SleepLive from './sleepLive2.es6';
import DayPort from './DayPort.es6';
import Scene from './Scene.es6';
import NoMatch from './NoMatch.es6';

var {Router, Route, hashHistory, IndexRoute, IndexRedirect} = ReactRouter;

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

let routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="list" />
            <Route path="list" component={DeviceList} />
            <Route path="data" component={SleepLive} />
            <Route path="sleep" component={DayPort} />
            <Route path="scene" component={Scene} />
            <Route path="*" component={NoMatch} />
        </Route>
    </Router>
);  

let rootDom = document.getElementById('ROOT');

// 开始渲染
het.domReady(()=>{
    het.setTitle('智能酒店');

    // 路由方式
    ReactDOM.render(routes, rootDom);
});