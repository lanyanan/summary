// import {Funs} from '../../../common/src/fun.es6';

import {Actions} from './Actions.es6';
import App from './App.es6';
import SleepLive2 from './sleepLive2.es6';
// import NoData from './NoData.es6';
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
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});



// 开始渲染
het.domReady(()=>{
    het.setTitle('睡眠监测器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/live" component={SleepLive2}/>
        </Router>
    ), document.getElementById('ROOT'));
});

