// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

het.ready((data)=>{
    Actions.ready(data);
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
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            deviceStatus: 1,  // 1-提示打开 2-扫描中 3-无法连接
            errorMessage: '抱歉，无法连接到血压计'
        };
        this.listenStore(Store); // 监听Store
    }
    render() {
        return <div className="main" style={{'paddingTop':this.state.headerTop}}>
            <header>
                <figure>
                    <img src={this.state.avatar} />
                    <p>你好，{this.state.nickname}</p>
                </figure>
            </header>
            {this.state.deviceStatus==1?(
                <section className="sec-0">
                    <div className="text">请确保血压计已经打开</div>
                    <img src="../static/img/misc1.png" />
                </section>
            ):''}
            {this.state.deviceStatus==2?(
                <section className="sec-1">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="text">正在测量...</div>
                </section>
            ):''}
            {this.state.deviceStatus==3?(
                <section className="sec-2">
                    <div className="msg">{this.state.errorMessage ? this.state.errorMessage : '抱歉，无法连接到血压计'}</div>
                    <a href="health://guide_retry" className="ft-button">再试一次</a>
                </section>
            ):''}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('血压计');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});