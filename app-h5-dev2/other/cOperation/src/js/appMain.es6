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

        let appSchemes = obj.appSchemes;//获取地址栏参数，判断显示隐藏下载栏
            appSchemes && this.setState({'appSchemes':appSchemes});

        let messageId = Number(obj.messageId);
        let accessToken = obj.accessToken || '';
        let appType = navigator.userAgent.indexOf('Android')>-1?3:4;
        //let getUrl = 'http://200.200.200.50/v1/app/cms/message/get?appId=10120&messageId=43368&accessToken=ceec29e12986419c9013f6a16c0ee004&timestamp='+new Date().getTime();
        let getUrl = '/v1/app/cms/message/get?appId=10120&messageId='+messageId+'&accessToken='+accessToken+'&timestamp='+new Date().getTime();
        Actions.getData(getUrl);
    }
    componentDidUpdate(){
        if(this.state.title){
            het.setTitle(this.state.title);
        }
        if(this.state.description){
            document.querySelector('#articleContent').innerHTML = this.state.description;
        }
    }
    downLoads(){
        window.open('http://ab.hetyj.com/CAppliances/CAppliances.html');
    }
    closed(){
        this.setState({'appSchemes':''});//
    }
    render() {
        let tags = this.state.tags || [];
        let createTime = Funs.dateFormat(this.state.createTime || ''  ,'yyyy-MM-dd hh:mm:ss', true);
  
        return (
            <div className='app-body'>
                <aside className = {this.state.appSchemes?'download':'hide'}>
                    <div className='download-left'><i></i><span>C家—您的智慧管家!</span></div>
                    <div className='download-right'>
                        <span onTouchEnd = {this.downLoads.bind(this)}>下载应用</span>
                        <i onTouchStart = {this.closed.bind(this)}></i>
                    </div>
                </aside>
                <header>
                    <h1>  {this.state.title || ""}</h1>
                    <div className='headerCon'>
                        <span className='spanLeft'>{createTime}</span>
                        {/*<span className='spanRight'>
                            <p>
                                <i className='i2'></i>
                                <label>{collectCount}</label>
                                <i className='i1'></i>
                                <label>{viewsCount}</label>
                            </p>
                            
                            
                        </span>*/}
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