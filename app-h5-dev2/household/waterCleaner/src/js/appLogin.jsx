// import {Funs} from '../../../common/src/fun.es6';
import {Login} from './Login.jsx';

var {Router, Route, hashHistory,RouterContext} = ReactRouter;


// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Login />;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));
    // 路由方式
/*    ReactDOM.render((
        <Router history={hashHistory} >
            <Route path="/" component={App} />
            <Route path="/bound" component={Bound} />
            <Route path="/graph" component={Graph} />
        </Router>

    ), document.getElementById('ROOT'));*/
    // 调用iscroll处理页面滚动
});