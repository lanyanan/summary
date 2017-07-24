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
        this.handleShakeSwitch = this.handleShakeSwitch.bind(this);

    };
    handleSwitch(e){//处理开关机事件
        if(this.state.online==2){het.toast('设备已离线');return false;}
        let S0 = this.state.S0;
        console.log('2222222222222',S0);
        Actions.switch(S0);
    };

    handleShakeSwitch(e){ 
        if(this.state.online==2){het.toast('设备已离线');return false;}
        let type = e.currentTarget.getAttribute('data-type');
        let S0 = this.state.S0;
        let S1 = this.state.S1;
        if(type != S1){Actions.handleShakeSwitch(type);}
        
    };
   
    render() {
        let S0 = this.state.S0;
        let S1 = this.state.S1;
        let online = this.state.online;
        console.log(S0,S1);
        return (
            
            <div>
                {online==2?<h1 className="btn-title">设备已离线</h1>:
                <h1 className="btn-title">
                    {S0=='01' ?'开机':'关机  ' +'   当前无模式'}
                    {(S1=='01' && S0=='01')?'  快速模式':((S1=='02' && S0=='01')?'  标准模式':(S1=='03' && S0=='01')?'  智能模式':'')}
                </h1>
            }
                <section className="flex btnlist">
                    <article className="flex-cell" onTouchStart={this.handleSwitch}>
                        <img src={S0=='01'?"../static/img/btnlist/kaiji1.png":"../static/img/btnlist/kaiji2.png"} alt=""/>
                        <p>{S0=='01' ?'开机':'关机'}</p>
                    </article> 
                    <article data-type='01' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={(S1=='01' || S0=='02')?"../static/img/btnlist/kuaisu2.png":"../static/img/btnlist/kuaisu1.png"} alt=""/>
                        <p>快速</p>
                    </article>
                    <article data-type='02' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={(S1=='02' || S0=='02')?"../static/img/btnlist/biaozhun2.png":"../static/img/btnlist/biaozhun1.png"} alt=""/>
                        <p>标准</p>
                    </article>
                    <article data-type='03' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={(S1=='03' || S0=='02')?"../static/img/btnlist/zhineng2.png":"../static/img/btnlist/zhineng1.png"} alt=""/>
                        <p>智能</p>
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