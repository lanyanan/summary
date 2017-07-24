// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SleepReport} from './SleepReport.es6';
import {RealTimeData} from './RealTimeData.es6';
import {selectDevice} from './selectDevice.es6';

var {Router, Route, hashHistory} = ReactRouter;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            btnActive : false,
            qrcodeInvaild : false,
            qrcodeScaned : false
        };
        this.listenStore(Store); // 监听Store
        this.keyDownEvent = this.keyDownEvent.bind(this);
        Actions.confirmLogin('login');
    }
    componentDidMount() {
        window.addEventListener('keydown',this.keyDownEvent);
        Actions.getQrcode();
    }
    keyDownEvent(e){
        if(!this.state.qrcodeInvaild && !this.state.qrcodeScaned) return;
        if(e.keyCode == 38 || e.keyCode == 40){
            this.setState({
                btnActive: true
            });
        }else if(e.keyCode == 13 && this.state.btnActive){
            this.reacquireQrcode();
        }
    }
    reacquireQrcode(){
        Actions.getQrcode();
    }
    componentWillUnmount() {
        window.removeEventListener('keydown',this.keyDownEvent);
    }
    render() {
        return (
            <div className="bg-img">
                <section className="centerBox">
                    <label>C-Life睡眠APP扫码,</label>
                    <label>安全登录</label>
                    <section className="qrcodeBox">
                        {this.state.qrcodeInvaild ?
                            <section className="qrcodeInvaild">
                                <span className="invaildText">
                                    二维码已失效
                                </span>
                                <label onClick={this.reacquireQrcode}
                                       className={this.state.btnActive?"activeBtn":"invaildBtn"}>
                                    请点击重新获取
                                </label>
                            </section> :
                            (this.state.qrcodeScaned ?
                                <section className="qrcodeInvaild">
                                    <span className="invaildText" style={{marginTop:"50px",marginBottom:"28px"}}>
                                        扫码成功
                                    </span>
                                    <i className="tipsText">
                                        请在手机上点击登录
                                    </i>
                                    <label onClick={this.reacquireQrcode}
                                           className={this.state.btnActive ? "activeBtn" : "invaildBtn"}>
                                        返回二维码登录
                                    </label>
                                </section>
                                    :
                                <section>
                                    <img className="qrcode" src={this.state.qrcodeUrl || ""} />
                                </section>)
                        }
                    </section>
                    <section className="description">
                        <span className="codeIcon"></span>
                        <i className="detail">
                            <span>请打开</span>
                            <i>C-Life睡眠 APP</i>
                            <span className="lineTwo">左侧功能栏的“扫码登录”</span>
                        </i>
                    </section>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('睡眠监测器TV版');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={SleepReport} />
            <Route path="/select" component={selectDevice} />
            <Route path="/login" component={App} />
            <Route path="/time" component={RealTimeData} />
        </Router>
    ), document.getElementById('ROOT'));
});