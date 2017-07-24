// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Funs} from '../../../common/src/fun.es6';

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
        this.downLoads = this.downLoads.bind(this);
        this.closed = this.closed.bind(this);
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

        let appSchemes = obj.appSchemes;//显示隐藏下载栏字段名
        if(appSchemes){this.setState({'appSchemes':appSchemes})}
        let newsId = Number(obj.newsId);
        let accessToken = obj.accessToken || '';
        let appType = navigator.userAgent.indexOf('Android')>-1?3:4;
         //let getUrl = 'http://200.200.200.50/v1/app/cms/news/getNews?newsId=137&appId=10120&accessToken=9d0061b8f00d4e9480ee2675204544fb&timestamp='+new Date().getTime();
        let getUrl = '/v1/app/cms/news/getNews?appId=10120&newsId='+newsId+'&accessToken='+accessToken+'&timestamp='+new Date().getTime();
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
    downLoads(){
        window.open('http://ab.hetyj.com/CAppliances/CAppliances.html');
    }
    closed(){
        this.setState({'appSchemes':''});
    }
    render() {
        let tags = this.state.tags || [];
        let pubTime = Funs.dateFormat(this.state.pubTime || ''  ,'yyyy-MM-dd hh:mm:ss', true);
        let collectCount = this.state.collectCount || 0;
        let viewsCount = this.state.viewsCount || 0;
        let downLoad = this.state.appSchemes ? 'downLoad':'hide';
        return (
            <div className='app-body'>
                <header>
                    <h1>  {this.state.title || ""}</h1>
                    <div className='headerCon'>
                        <span className='spanLeft'>{pubTime}</span>
                        <span className='spanRight'>
                            <p>
                                <i className='i2'></i>
                                <label>{collectCount}</label>
                                <i className='i1'></i>
                                <label>{viewsCount}</label>
                            </p>
                        </span>
                    </div> 
                </header>
                <section className='labelNav'>
                    {tags.map((item,index)=>{
                        return(
                            <label className='labelName' key={index}>{item.tagName}</label>
                        )
                    })}
                </section>
                {/*<section className='articleDate'>
                    {this.state.addTime || ""}
                </section>*/}
                <section className='articleContent' id='articleContent'> </section>
                <section className = {downLoad}>
                    <div className = 'downLoadL'><i></i><span>C家—您的智慧管家!</span></div>
                    <div className = 'downLoadR'>
                        <span onTouchEnd = {this.downLoads}>下载应用</span><i onTouchStart = {this.closed}></i>
                    </div>
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