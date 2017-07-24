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
        let newsId = Number(obj.newsId);
        let appType = navigator.userAgent.indexOf('Android')>-1?3:4;
        let getUrl = "/v1/app/chairdressing/news/details?appId=10101&newsId="+newsId+"&appType="+appType+"&timestamp="+new Date().getTime();
        Actions.getData(getUrl);
    }
    componentDidUpdate(){
        if(this.state.title){
            het.setTitle(this.state.title);
        }
        if(this.state.content){
            document.querySelector('#articleContent').innerHTML = this.state.content;
        }
    }
    render() {
        let tags = this.state.tags || [];
        return (
            <div className='app-body'>
                <header>
                    {this.state.title || ""}
                </header>
                <section className='labelNav'>
                    {tags.map((item,index)=>{
                        return(
                            <label className='labelName' key={index}>{item.tagName}</label>
                        )
                    })}
                </section>
                <section className='articleDate'>
                    {this.state.addTime || ""}
                </section>
                <section className='articleContent' id='articleContent'>
                </section>
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