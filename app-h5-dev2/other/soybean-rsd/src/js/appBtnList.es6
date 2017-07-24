// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;
var appData = {};

/*het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
        updateFlagMap: {
        }
    });
}); */

/*// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
    Actions.repaint(data); 
});*/

// 创建React组件
class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {};
        Store.listen((data)=>this.setState(data)); // 监听Store

        this.handleShakeSwitch = this.handleShakeSwitch.bind(this);

    };  
    handleShakeSwitch(e){ 
     
        if(this.state.online==2){het.toast('设备已离线');return false;}
        let type = e.currentTarget.getAttribute('data-type');
        let WorkCompSta = parseInt(this.state.WorkCompSta);
        let CurWorkMode = parseInt(this.state.CurWorkMode);
        this.setState({CurWorkMode:parseInt(type)});
        console.log('type,WorkCompSta',type,WorkCompSta);
        Actions.handleShakeSwitch(type,WorkCompSta);
    };

    render() {
        console.log('state',this.state);
        let WorkCompSta = parseInt(this.state.WorkCompSta || 0);
        let workText = ['待机中', '工作中', '已完成'][WorkCompSta];
        let CurWorkMode = parseInt(this.state.CurWorkMode || 0);
        let workMode = [' ','五谷豆浆','干/湿豆','米糊','绿豆沙','婴儿辅食','云菜谱','果汁搅拌','轻松洗'][CurWorkMode];

        let status = this.state.WorkCompSta ? this.state.WorkCompSta:0;
        let mode  = this.state.CurWorkMode ? this.state.CurWorkMode:0;
        // console.log('iiiiiiii',WorkCompSta);
        if(WorkCompSta==0){
            mode=0;
        }
        let fastBtnEvent =  mode == 0 ? this.handleShakeSwitch:'';
        let btnCss = mode == 0 ? '':'';
        // console.log('mode1111111111111111',mode);
        return (
            <div>
                {this.state.online==2?<h1 className="btn-title">设备已离线</h1>:
                    <h1 className="btn-title">
                        {workText+' '}{CurWorkMode!=0?'模式：'+workMode:workMode+'模式：无'}
                    </h1>
                }
                <section className="flex btnlist">
                    {/*<article className="flex-cell" onTouchStart={this.handleSwitch}>
                        <img src={this.state.S0=='01'?"../static/img/btnlist/kaiji1.png":"../static/img/btnlist/kaiji2.png"} alt=""/>
                        <p>{this.state.S0=='01' && this.state.boot!='undefined'?'开机':'关机'}</p>
                    </article> */}
                    <article data-type='2' className={(mode==0||mode==2)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/btnlist/ganshi1.png"}/>
                        <p>干/湿豆</p>
                    </article>
                    <article data-type='1' className={(mode==0||mode==1)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/btnlist/wugu1.png"}/>
                        <p>五谷豆浆</p>
                    </article>
                    <article data-type='3' className={(mode==0||mode==3)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/btnlist/mizhou1.png"}/>
                        <p>米糊</p>
                    </article>
                    <article data-type='4' className={(mode==0||mode==4)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/btnlist/lvdou1.png"}/>
                        <p>绿豆沙</p>
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

{/*<article data-type='2' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/ganshi1.png":"../static/img/btnlist/ganshi2.png"} alt=""/>
                        
                        <p>干/湿豆</p>
                    </article>
                    <article data-type='1' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/wugu1.png":"../static/img/btnlist/wugu2.png"} alt=""/>
                        <p>五谷豆浆</p>
                    </article>
                    <article data-type='3' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/mizhou1.png":"../static/img/btnlist/mizhou2.png"} alt=""/>
                        <p>米糊</p>
                    </article>
                    <article data-type='4' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
                        <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/lvdou1.png":"../static/img/btnlist/lvdou2.png"} alt=""/>
                        <p>绿豆沙</p>
                    </article>*/}