import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ResultTable} from './ResultTable.es6';
import {Help} from './Help.es6';
import {Reference} from './Reference.es6';
import {LazyImg} from '../../../common/src/lib/LazyImg.es6';

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
    Actions.getData();
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
    Actions.getData();
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            results : [],
            isInitialization : true
        };
        this.listenStore(Store); // 监听Store
        het.setTitle('血糖仪');
    }
    render() {
        if (this.state.isInitialization) return <div></div>;
        let latestData = this.state.results[0] || {resultName:'',recordTime:''};
        let currentDate = Funs.dateFormat(latestData.recordTime, 'M月d日', true);
        let resClass = (latestData.resultName||'').indexOf('高')>-1 ? 'bg-high' : ((latestData.resultName||'').indexOf('低')>-1 ? 'bg-low' : 'bg-normal');
        return <div>
            <header style={{'paddingTop':this.state.headerTop}}>
            {this.state.results.length ? (
                <figure>
                    <dl className="user-info">
                        <dd>
                            <a href="health://switch_user" className="avatar"><LazyImg src={this.state.avatar} default="../static/img/avatar.jpg" /></a>
                        </dd>
                        <dt>{this.state.nickname}</dt>
                    </dl>
                    <p>血糖值</p>
                    <p><span className="num">{latestData.bloodGlucoseValue}</span>mmol/L <i className={resClass}>{latestData.resultName}</i></p>
                    <p className="time">{Funs.dateFormat(latestData.recordTime, 'yyyy/M/d hh:mm', true)}获取</p>
                </figure>
            ) : (
                <figure>
                    <dl className="user-info">
                        <dd>
                            <a href="health://switch_user" className="avatar"><LazyImg src={this.state.avatar} default="../static/img/avatar.jpg" /></a>
                        </dd>
                        <dt>{this.state.nickname}</dt>
                    </dl>
                    <p>&nbsp;</p>
                    <p className="s">您还没有用过血糖仪</p>
                </figure>
            )}
            </header>
            {this.state.results.length ? (
                <section>
                    <div className="hd-record">
                        {currentDate}
                        <a href="health://skip_url/reference.html"><i className="h"></i> 血糖标准参考</a>
                    </div>
                    <ResultTable date={currentDate} results={this.state.results} showRefer={true} />
                </section>
            ) : (
                <Help />
            )}
            {this.state.results.length ? (
                <footer className="ft-buttons">
                    <a href="health://skip_url/guide.html">同步数据</a>
                    <i className="vline"></i>
                    <a href="health://skip_url/history.html">历史数据</a>
                </footer>
            ) : (
                <footer className="ft-buttons">
                    <a href="health://skip_url/guide.html">同步数据</a>
                </footer>
            )}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/reference" component={Reference} />
        </Router>
    ), document.getElementById('ROOT'));
});