// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;
var appData = {};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
        updateFlagMap: {
        },
        filter:{
            windStall:function(type,data){
                if(type==0 && data.boot == 1){//关机的时候，全部取运行数据
                    return false
                }
                if(type==0 && data.wind == 4){//智能风的时候，取运行数据
                    return false;
                }
                return true;
            },
        }
    });
}); 

// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
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
        this.handleShakeSwitch = this.handleShakeSwitch.bind(this);
        this.handleSelectRate = this.handleSelectRate.bind(this);

    };
    handleSwitch(e){//处理开关机事件
        // if(this.state.online==2){het.toast('设备已离线');return false;}
        let boot = this.state.boot==1?2:1;
        Actions.switch(boot);
    };
    handleMode(e){//出来模式选择
        // if(this.state.online==2){het.toast('设备已离线');return false;}
        if(this.state.boot==1 || typeof this.state.boot == 'undefined') return false;
        let windType = this.state.wind || 1;
        if(++windType > 5) windType=1;
        Actions.selectMode(windType);
    };
    handleShakeSwitch(e){ 
        // if(this.state.online==2){het.toast('设备已离线');return false;}
        if(this.state.boot==1 || typeof this.state.boot == 'undefined') return false;
        let shookHeadStatus = this.state.shookHead==1?2:1;
        Actions.shakeSwitch(shookHeadStatus);
    };
    /**
     * 标准模式，在1，8，16，24切换，
       自然风和睡眠风在1，2，3切换
       智能风按钮不可用
     */
    handleSelectRate(e){
        // if(this.state.online==2){het.toast('设备已离线');return false;}
        if(this.state.boot==1 || typeof this.state.boot == 'undefined') return false;
        let windType = this.state.wind || 1;
        let windStall = this.state.windStall || 1;
        switch(+windType){
            case 1:{
                if(windStall!=1 && windStall!=8 && windStall!=16 && windStall!=24) windStall = 1;
                if(windStall==1){
                    windStall = 8;
                }else if(windStall>=24){
                    windStall = 1;
                }else{
                    windStall = windStall+8;
                }
                Actions.selectRate(windStall);
                break;
            };
            case 2:
            case 3:{
                if(windStall>=3){
                    windStall = 1;
                }else{
                    windStall = ++windStall;
                }
                Actions.selectRate(windStall);
                break;
            };
            case 4:
            case 5:return false;break;
        }
    };
    render() {
        //模式处理
        let windType = this.state.wind || 1,
            modeImgPathSrc = '../static/img/btnlist/', 
            modeImgPath = '../static/img/btnlist/2.png', 
            modeName = '标准风',
            powerIdName = this.state.boot==2?'开机':'关机',
            shookHeadStatusName = this.state.shookHead==2?'开':'关';
        switch(+windType){
            case 1:modeImgPath = modeImgPathSrc+'2.png';modeName='标准风';break;
            case 2:modeImgPath = modeImgPathSrc+'3.png';modeName='自然风';break;
            case 3:modeImgPath = modeImgPathSrc+'4.png';modeName='睡眠风';break;
            case 4:modeImgPath = modeImgPathSrc+'5.png';modeName='智能风';break;
            case 5:modeImgPath = modeImgPathSrc+'6.png';modeName='采集风';break;
        }
        //档位处理
        let windStall = this.state.windStall || 1,windImg="../static/img/btnlist/9.png";
        if(windType==1){
            switch(+windStall){
                case 1:windImg="../static/img/btnlist/9.png";break;
                case 8:windImg="../static/img/btnlist/10.png";break;
                case 16:windImg="../static/img/btnlist/11.png";break;
                case 24:windImg="../static/img/btnlist/12.png";break;
            }
        }else if(windType==2 || windType==3){
            switch(+windStall){
                case 1:windImg="../static/img/btnlist/9.png";break;
                case 2:windImg="../static/img/btnlist/10.png";break;
                case 3:windImg="../static/img/btnlist/11.png";break;
            }
        };
        //智能风采集风时，档位标志
        let isClick = true;
        if(windType==4 || windType==5){
            isClick = false;
        }else{
            isClick = true;
        }
        return (
            <div>
                {this.state.online==2?<h1 className="btn-title">设备已离线</h1>:<h1 className="btn-title">{powerIdName}&nbsp;&nbsp;{modeName}&nbsp;&nbsp;摇头:{shookHeadStatusName}&nbsp;&nbsp;档数:{windStall}</h1> }
                
                <section className="flex btnlist">
                    <article className="flex-cell" onTouchEnd={this.handleSwitch}>
                        <img src="../static/img/btnlist/1.png" alt=""/>
                        <p>{this.state.boot==1 && this.state.boot!='undefined'?'开机':'关机'}</p>
                    </article> 
                    <article className="flex-cell" onTouchEnd={this.handleMode}>
                        <img style={this.state.boot==1 ?{opacity:0.5}:{opacity:1}} src={modeImgPath} alt=""/>
                        <p>{modeName}</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleShakeSwitch}>
                        <img style={this.state.boot==1 ?{opacity:0.5}:{opacity:1}} src={this.state.shookHead==2?"../static/img/btnlist/7.png":"../static/img/btnlist/8.png"} alt=""/>
                        <p>摇头</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleSelectRate}>
                        <img style={(this.state.boot==1 || !isClick)?{opacity:0.5}:{opacity:1}} src={windImg} alt=""/>
                        <p>档数</p>
                    </article>  
                </section>
            </div>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('智能风扇');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式     
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
}); 