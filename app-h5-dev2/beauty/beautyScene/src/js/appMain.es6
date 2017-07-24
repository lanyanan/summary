import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SceneDetail} from './sceneDetail.es6';
import {StepDetail} from './stepDetail.es6';
import {App} from './App.es6';
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
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

// 开始渲染
het.domReady(()=>{
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/sceneDetail/:strategyId" component={SceneDetail} />
            <Route path="/stepDetail/:stepId" component={StepDetail} />
        </Router>
    ), document.getElementById('ROOT'));
});