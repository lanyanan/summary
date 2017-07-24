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
            deviceStatus: 1,  // 1-提示打开 2-扫描中 3-无法连接 4-有数据
            result:0,       // 血糖值
            personalStatus:1 // 个人状态
        };
        this.listenStore(Store); // 监听Store
    }
    clickStatus(e){
        e.preventDefault();
        let val = parseInt(e.currentTarget.getAttribute('data-val'));
        this.setState({personalStatus:val});
    }
    submit(e){
        e.preventDefault();
        Actions.submitResult(this.state.personalStatus);
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
                    <div className="text">请确保血糖仪已经打开</div>
                    <img src="../static/img/misc1.png" />
                </section>
            ):''}
            {this.state.deviceStatus==2?(
                <section className="sec-1">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <div className="text">扫描中...</div>
                </section>
            ):''}
            {this.state.deviceStatus==3?(
                <section className="sec-2">
                    <div className="msg">抱歉，无法连接到血糖仪</div>
                    <a href="health://guide_retry" className="ft-button">再试一次</a>
                </section>
            ):''}
            {this.state.deviceStatus==4?(
                <section className="sec-3">
                    <div className="result">
                        <p>测量结果</p>
                        <p><b>{this.state.result}</b>mmol/L</p>
                    </div>
                    <div className="foot">
                        <div className="btns-wrap">
                            <p>请选择您的当前状态</p>
                            <p className="flex">
                                <a href="#" data-val='1' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.personalStatus==1 ? ' active' : '')}>空腹</a>
                                <a href="#" data-val='2' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell m' + (this.state.personalStatus==2 ? ' active' : '')}>餐后1小时</a>
                                <a href="#" data-val='3' onTouchStart={this.clickStatus.bind(this)} className={'flex-cell' + (this.state.personalStatus==3 ? ' active' : '')}>餐后2小时</a>
                            </p>
                        </div>
                        <a href={'health://guide_status/' + this.state.personalStatus} className="ft-button">我选好了</a>
                    </div>
                </section>
            ):''}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('血糖仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});