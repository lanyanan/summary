import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ResultTable} from './ResultTable.es6';
import {Help} from './Help.es6';
import {Reference} from './Reference.es6';

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
    Actions.getTotals();
    Actions.getData();
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
    Actions.getTotals();
    Actions.getData();
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            results : []
        };
        this.listenStore(Store); // 监听Store
        het.setTitle('营养秤');
    }
    render() {
        return <div>
            <header style={{'paddingTop':this.state.headerTop}}>
            {this.state.results.length ? (
                this.state.totals ? (
                    <figure>
                        <a href="health://switch_user" className="avatar"><img src={this.state.avatar} /></a>
                        <h2>今日摄入食物统计</h2>
                        <div className="flex">
                            <dl className="flex-cell">
                                <dt>{(this.state.totals[0]||{}).foodClassName}</dt>
                                <dd><span className="num">{(this.state.totals[0]||{}).foodWeight}</span>g</dd>
                            </dl>
                            <b className="vline2"></b>
                            <dl className="flex-cell">
                                <dt>{(this.state.totals[1]||{}).foodClassName}</dt>
                                <dd><span className="num">{(this.state.totals[1]||{}).foodWeight}</span>g</dd>
                            </dl>
                            <b className="vline2"></b>
                            <dl className="flex-cell">
                                <dt>{(this.state.totals[2]||{}).foodClassName}</dt>
                                <dd><span className="num">{(this.state.totals[2]||{}).foodWeight}</span>g</dd>
                            </dl>
                        </div>
                    </figure>
                ) : (
                    <figure>
                        <a href="health://switch_user" className="avatar"><img src={this.state.avatar} /></a>
                        <p>&nbsp;</p>
                        <p className="s">今日还没有摄入食物统计</p>
                    </figure>
                )
            ) : (
                <figure>
                    <a href="health://switch_user" className="avatar"><img src={this.state.avatar} /></a>
                    <p>&nbsp;</p>
                    <p className="s">您还没有用过营养秤哦~</p>
                </figure>
            )}
            </header>
            {this.state.results.length ? (
                this.state.results.map((it, idx)=>{
                    return <ResultTable key={idx} date={Funs.dateFormat(it.key, 'M月d日')} results={it.data} />;
                })
            ) : (
                <Help />
            )}
            {this.state.results.length ? (
                <footer className="ft-buttons">
                    <a href="health://skip_url/guide.html">称重</a>
                    <i className="vline"></i>
                    <a href="health://skip_url/history.html">历史数据</a>
                </footer>
            ) : (
                <footer className="ft-buttons">
                    <a href="health://skip_url/guide.html">称重</a>
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