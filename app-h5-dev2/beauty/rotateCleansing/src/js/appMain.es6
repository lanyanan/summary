import {App} from './baseApp.es6';
import {Guider} from './Guider.es6';
import {Help} from './Help.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

class MyApp extends App {
    constructor(props) {
        super(props);
        het.setTitle('智能旋转洁面仪');
    }
}

// 开始渲染
het.domReady(()=>{

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={MyApp} />
            <Route path="/guider" component={Guider} />
            <Route path="/help" component={Help} />
        </Router>
    ), document.getElementById('ROOT'));
});