// app数据
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Funs} from '../../../common/src/fun.es6';
import {TyraTopScreen} from './TyraTopScreen.es6';
import {DeviceConfig} from './DeviceConfig.es6';

var Toast = require('../../../common/src/lib/Toast.jsx');
var SettingButton = require('../../../common/src/lib/SettingButton.jsx');
var {Router, Route, hashHistory} = ReactRouter;

// 定义toast函数，以供多次调用
function topToast(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(<Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,document.getElementById('mytoast'));
};

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            type:2,
            onlineStatus:0,
            mode:1,
            gear:1,
            recommendMode:1,
            recommendGear:1,
            currentMode:1,
            currentGear:1,
            electricity:5,
            needSave:false,
            busiSwitch:0,
            modeshow:false,
            gearshow:false,
            modechange:false,
            gearchange:false
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        topToast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
    }
    sync(){
        Actions.sync();
    }
    render() {
       let tempType = this.state.type;
       console.log(this.state);
        return (
            <div className="flex-column" style={{height:'100%'}}>
                <TyraTopScreen onlineStatus={this.state.onlineStatus} electricity={this.state.electricity} smartModeSwitch={this.state.busiSwitch}/>
                <DeviceConfig modechange={this.state.modechange} gearchange={this.state.gearchange} modeshow={this.state.modeshow} gearshow={this.state.gearshow} smartModeSwitch={this.state.busiSwitch} type={this.state.type} mode={this.state.mode-1} gear={this.state.gear-1}/>
                <div className = "footer"><SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={this.sync.bind(this)} /></div>
                <div id="mytoast" style={{fontSize: '12px'}}></div>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('提拉嫩肤仪');
    // 无路由方式
    ReactDOM.render(<App/>, document.getElementById('ROOT'));
    
    // 配置sdk
    het.config({
        debugMode : "print", // 打印调试数据
        useUpdateFlag : true, // 自动添加updateFlag标记
        // 模板数据与接口数据映射表
        webDataMap: {
            "type"          : "type", //当前类型
            "recommendMode" : "mode", // 推荐模式
            "recommendGear" : "gears", //推荐档位
            "currentMode"   : "currentMode", //当前模式
            "currentGear"   : "currentGears", //当前档位
            "busiSwitch"    : "busiSwitch", //自动手动切换
            "onlineStatus"  : "onlineStatus", //当前设备状态
            "electricity"   : "electricity", //当前设备电量
            "des"           : "des"//描述当前结果
        }
    });

    // 路由方式
    //ReactDOM.render((
       //<Router history={hashHistory}>
            //<Route path="/" component={App} />
        //</Router>
    //), document.getElementById('ROOT'));
});

// 接收到repaint请求后执行此操作
het.repaint(function(data){
    Actions.receiveRepaint(data);
});
