import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
//import {Bind} from './Bind.es6';
//import {Bound} from './Bound.es6';
import {Graph} from './Graph.es6';
var {Router, Route, hashHistory,RouterContext} = ReactRouter;
var appData={};
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        // debugMode: 'print', // 打印调试数据
        webDataMap: {},
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data)=>{
    appData = Funs._extends({}, appData, data);
    Actions.repaint(appData);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        Store.listen((data)=>{
            if(!this.isMounted(this)) return;
            this.setState(data)
        }); // 监听Store
    }
    isMounted(component){
      try {
        ReactDOM.findDOMNode(component);
        return true;
      } catch (e) {
        return false;
      } 
    }
    render() {
        return <Graph chartData={this.state.chartData}/>;
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