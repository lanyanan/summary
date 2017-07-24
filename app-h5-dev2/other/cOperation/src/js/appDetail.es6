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

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    componentWillMount() {
        let url = window.location.href;
        let search = url.substring(url.lastIndexOf("?") + 1);
        let obj = {};
        let reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, function (rs, $1, $2) {
            let name = decodeURIComponent($1);
            let val = decodeURIComponent($2);
            val = String(val);
            obj[name] = val;
            return rs;
        });
        let stepId = Number(obj.stepId);
        let getUrl = "/v1/app/chairdressing/strategy/stepInfo?appId=10101&stepId="+stepId+"&timestamp="+new Date().getTime();
        Actions.getData(getUrl);
    }
    componentDidUpdate(){
        if(this.state.title){
            het.setTitle(this.state.title);
        }
        if(this.state.content){
            document.querySelector('#details').innerHTML = this.state.content;
        }
    }
    render() {
        return (
            <div className='app-detail'>
                <header>
                    {this.state.descs || ""}
                </header>
                <div className='backgroundGap'></div>
                <section className='details' id="details"></section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    //het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={App} />
    //     </Router>
    // ), document.getElementById('ROOT'));
});