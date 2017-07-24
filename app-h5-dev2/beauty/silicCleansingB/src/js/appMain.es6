import {App} from './../../../silicCleansing/src/js/baseApp.es6';
import {Guider} from './../../../silicCleansing/src/js/Guider.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

class MyApp extends App {
    constructor(props) {
        super(props);
        het.setTitle('智能硅胶洁面仪(舒适版)');
    }
}

// 开始渲染
het.domReady(()=>{
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={MyApp} />
            <Route path="/guider" component={Guider} />
        </Router>
    ), document.getElementById('ROOT'));
});