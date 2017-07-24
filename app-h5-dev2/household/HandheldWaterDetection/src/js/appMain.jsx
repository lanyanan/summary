import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {LoadMainData} from './LoadMainData.jsx';
import {PromptDetection} from './PromptDetection.jsx';
import {WaterDetection} from './WaterDetection.jsx';
import {WaterMap} from './WaterMap.jsx';
import {Statistics} from './Statistics.jsx';
import {BaselineCalibration} from './BaselineCalibration.jsx';
import {SyncHisData} from './SyncHisData.jsx';
import {SelectAddress} from './SelectAddress.jsx';
import {DialogStyle} from './DialogStyle.jsx';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
        torporTime: 0,
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data, type) => {
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {

    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        this.state = {
            headerTop: isAndroid ? 73 : 64,
        };
        het.setTitle(JSON.stringify({setNavTitle: 0, setNavRightBtnHiden: 0}));
        this.listenStore(Store); // 监听Store
        this.closeDialog = () => {
            Actions.send(3);
        };
        Actions.getTrigger();
    }

    render() {
        let errorTip = '检测到汲取的水量不足或未浸入水中';
        return (
            <section className="app-body">
                <div style={{height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF'}}></div>
                <div className="app-content">
                    {this.state.data ? <LoadMainData mydata={this.state.data}/> : <PromptDetection />}
                </div>
                <DialogStyle show={this.state.showerrordialog} submitClock={this.closeDialog.bind(this)}
                             content={errorTip} canCel={false}/>
            </section>
        )
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('手持式水质检测仪');
    // 无路由方式
    //ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/WaterDetection" component={WaterDetection}/>
            <Route path="/WaterMap" component={WaterMap}/>
            <Route path="/Statistics" component={Statistics}/>
            <Route path="/BaselineCalibration" component={BaselineCalibration}/>
            <Route path="/SyncHisData" component={SyncHisData}/>
            <Route path="/SelectAddress/:address/:longVal/:latVal/:selectIndex/" component={SelectAddress}/>
        </Router>
    ), document.getElementById('ROOT'));
});