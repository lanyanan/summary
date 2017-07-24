// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        webDataMap: {
            'childLock' : 'lockSet',
            'temp1' : 'freezerTemp',
            'temp2' : 'refgTemp',
            'mode'  : 'mode',
            'power' : 'refgSwitch',
            'hour'  : 'freezerSetTime'
        },
        updateFlagMap: {
            'mode' : 9,
            'temp2' : 10,
            'temp1' : 12,
            'hour' : 13,
            'power' : 14,
            'childLock' : 16
        },
        renderConfigData : true,
        filter : {
            'childLock' : 1,
            'temp1' : 0, // 冷冻室
            'temp2' : 0, // 冷藏室
            'mode'  : 1,
            'power' : 1,
            'hour'  : 1
        } 
    });
}); 

// 接收app推送数据 
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {};
        Store.listen((data)=>this.setState(data)); // 监听Store

        this.handleLock = this.handleLock.bind(this);
        this.handleMode = this.handleMode.bind(this);
        this.handlePower = this.handlePower.bind(this);
    };
    handleLock(e){//处理童锁事件 (1-无，2-有)
        if(this.state.online==2) return false;
        let childLock = this.state.childLock || 1;
        childLock==1?childLock=2:childLock=1;
        Actions.lock(childLock);
    };
    handleMode(e){//出来模式选择
        if(this.state.childLock==2 || this.state.online==2) return false;
        let mode = this.state.mode || 4;
        // if(mode==5) mode =1;
        if(++mode > 5) mode=1;
        Actions.swicthMode(mode);
    };
    handlePower(e){
        if(this.state.childLock==2 || this.state.online==2 || this.state.mode==1) return false;
        let power = this.state.power==1?2:1;
        Actions.switchPower(power);
    };
    render() {
        let mode = this.state.mode || 4, 
            modeImgPath = '../static/img/btnlist/',
            modeName = '智能模式',
            lock = this.state.childLock==2?'开启':'关闭',
            online = this.state.online || 1;//设备是否在线
        switch(+mode){
            case 4:modeImgPath = modeImgPath+'3.png';modeName='智能模式';break;
            case 3:modeImgPath = modeImgPath+'4.png';modeName='假日模式';break;
            case 1:modeImgPath = modeImgPath+'5.png';modeName='速冷模式';break;
            case 2:modeImgPath = modeImgPath+'6.png';modeName='速冻模式';break;
            case 5:modeImgPath = modeImgPath+'9.png';modeName='无模式';break;
        }
        return ( 
            <div>
                {online==2?<h1 className="btn-title">设备已离线</h1>:<h1 className="btn-title">{modeName}&nbsp;儿童锁:{lock}&nbsp;冷藏室:{this.state.temp2==255?'-':this.state.temp2}℃&nbsp;冷冻室:{this.state.temp1==255?'-':this.state.temp1}℃</h1>}
                <section className="flex btnlist">
                    <article className="flex-cell art-1" onTouchEnd={this.handleLock}>
                        <img src={this.state.childLock==2 || this.state.childLock=='undefined'?"../static/img/btnlist/2.png":"../static/img/btnlist/1.png"} alt=""/>
                        <p>儿童锁</p>
                    </article>
                    <article className="flex-cell art-2" onTouchEnd={this.handleMode}>
                        <img style={this.state.childLock==2?{opacity:0.3}:{opacity:1}} src={modeImgPath} alt=""/>
                        <p>{modeName}</p>
                    </article>
                    <article className="flex-cell art-3" onTouchEnd={this.handlePower}>
                        <img style={this.state.childLock==2?{opacity:0.3}:{opacity:1}} src={this.state.power==1?"../static/img/btnlist/8.png":"../static/img/btnlist/7.png"} alt=""/>
                        <p>冷藏室</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式     
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
}); 