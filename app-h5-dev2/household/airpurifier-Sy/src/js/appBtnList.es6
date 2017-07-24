// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
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
class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {};
        Store.listen((data)=>this.setState(data)); // 监听Store

        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleMode = this.handleMode.bind(this);
        this.handleAnion = this.handleAnion.bind(this);
        this.handleLock = this.handleLock.bind(this);
    };
    handleSwitch(e){//处理开关机事件
        if(this.state.childLockMode==16 || this.state.online==2)return false;
        Actions.switch();
    };
    handleMode(e){//出来模式选择
        if(this.state.online==2 || this.state.childLockMode==16 || this.state.bootMode==16 || this.state.bootMode=='undefined') return false;
        let modeIndex = this.state.pattern || 1;
        if(++modeIndex > 5) modeIndex=1;
        Actions.selectAny(modeIndex);
    };
    handleAnion(e){//负离子功能处理
        if(this.state.online==2 || this.state.childLockMode==16 || this.state.bootMode==16 || this.state.bootMode=='undefined') return false;
        let anion = this.state.negativeIonSetup==1?16:1;
        Actions.toggleAnion(anion);
    };
    handleLock(e){ //童锁功能处理
        if(this.state.online==2 || this.state.bootMode==16 || this.state.bootMode=='undefined') return false;
        let lock = this.state.childLockMode || 1,
            childLockMode = lock==1?16:1;
        Actions.childLock(childLockMode);
    };
    render() {
        let commonMode = this.state.pattern || 1,
            modeImgPath = '../static/img/airPurifier/',
            modeName = '自动',
            voc = this.state.vocGrade || 2,
            pm = !this.state.returnCurrentPmValue ? '50' : this.state.returnCurrentPmValue,
            online = this.state.online ? this.state.online : 1,
            lock = this.state.childLockMode || 1;
        if(this.state.returnAlarmStatus2==1 || this.state.returnAlarmStatus2==3){
            pm = '故障';
        };
        if(this.state.returnAlarmStatus2==2 || this.state.returnAlarmStatus2==3){
            voc = '故障';
        };
        switch(+commonMode){
            case 1:modeImgPath = modeImgPath+'2.png';modeName='自动';break;
            case 2:modeImgPath = modeImgPath+'3.png';modeName='标准';break;
            case 5:modeImgPath = modeImgPath+'4.png';modeName='睡眠';break;
            case 4:modeImgPath = modeImgPath+'5.png';modeName='省电';break;
            case 3:modeImgPath = modeImgPath+'6.png';modeName='速净';break; 
        } 
        return (
            <div>
                {this.state.online==2?<h1 className="btn-title">设备已离线</h1>:<h1 className="btn-title">模式值:{modeName}&nbsp;&nbsp;Voc检测值:{voc}&nbsp;&nbsp;PM2.5值:{pm}</h1>}
                <section className="flex btnlist">
                    <article className="flex-cell" onTouchEnd={this.handleSwitch}>
                        <img style={lock==16?{opacity:0.5}:{opacity:1}} src="../static/img/airPurifier/1.png" alt=""/>
                        <p>{this.state.bootMode==16 ?'开机':'关机'}</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleMode}>
                        <img style={lock==16 || this.state.bootMode==16 || this.state.bootMode=='undefined'?{opacity:0.5}:{opacity:1}} src={modeImgPath} alt=""/> 
                        <p>{modeName}</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleLock}>
                        <img style={this.state.bootMode==16 && this.state.bootMode!='undefined'?{opacity:0.5}:{opacity:1}} src={this.state.childLockMode==16 ?"../static/img/airPurifier/8.png":"../static/img/airPurifier/7.png"} alt=""/>
                        <p>童锁</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleAnion}>
                        <img style={lock==16 || this.state.bootMode==16 || this.state.bootMode=='undefined'?{opacity:0.5}:{opacity:1}} src={this.state.negativeIonSetup==16?"../static/img/airPurifier/9.png":"../static/img/airPurifier/10.png"} alt=""/>
                        <p>负离子</p>
                    </article>  
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('三洋空气净化器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式     
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
}); 