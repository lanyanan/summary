// import {Funs} from '../../../common/src/fun.es6';
// import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
// import {Store} from './Store.es6';
import {App} from './App.es6';

// import {Helper} from './Helper.es6';
// import {addDevice} from './addDevice.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        callbackExpire: 40000,
        debugMode: 'print', // 打印调试数据
        renderConfigData : true,
        filter : {
            'electricity':1
        },
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// // 创建React组件
// class App extends BaseComponent {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.listenStore(Store); // 监听Store
//     }
//     render() {
//         return <div>receive: {JSON.stringify(this.state)}</div>;
//     }
// }

// 开始渲染
het.domReady(()=>{
    het.setTitle('冷热美颜仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});