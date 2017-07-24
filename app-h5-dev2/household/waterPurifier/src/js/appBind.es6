import {Bind} from './Bind.es6';
var {Router, Route, hashHistory,RouterContext} = ReactRouter;

// 接收app推送数据

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Bind />;
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