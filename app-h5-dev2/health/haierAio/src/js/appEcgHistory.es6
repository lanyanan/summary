import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {EcgHistoryDetial} from './EcgHistoryDetial.es6';

var {Router, Route, hashHistory } = ReactRouter;

het.domReady(()=>{
    // 配置sdk
     het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {
        },
        renderConfigData : true
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    //console.log(data);
     Actions.repaint(data);
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
        this.state = {
            history:[]
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        let _this = this ;
        setTimeout(function(){
            let ajaxData={
                'userType': _this.state.userType?_this.state.userType:1,
                'memberId':_this.state.memberId?_this.state.memberId:1,
                'appId':_this.state.appId?_this.state.appId:1,
                'timestamp':new Date().getTime()
            };
            Actions.getECGHistoryData(ajaxData);
        },100);
    }
    render() {
        return (
        <div className='ecg-history flex-column'>
            <section className="flex-cell history-list">
                {this.state.history.map((mItem, i1)=>{
                    let date = ((mItem.data[0]||{}).data[0]||{}).dataTime;
                    return <ul key={i1}>
                        <li><h2>{Funs.dateFormat(date, 'M月', true)}</h2></li>
                        {mItem.data.map((dItem, i2)=>{
                            let date = (dItem.data[0]||{}).dataTime;
                            return <li key={i2}>
                                <h3>{Funs.dateFormat(date, 'd日', true)}</h3>
                                {dItem.data.map((it, i3)=>{
                                    let url = '#/detail/' + this.state.appId + '/' + this.state.memberId + '/' + this.state.userType + '/' + it.dataId;
                                    return <dl key={i3} onClick={()=>location.href=url}>
                                        <dt>{Funs.dateFormat(it.dataTime, 'hh:mm', true)}</dt>
                                        <dd>心率 {it.heartRate}次/分</dd>
                                    </dl>;
                                })}
                            </li>;
                        })}
                    </ul>;
                })}
            </section>
        </div>);
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('海尔一体机-心电');
    // 无路由方式
     // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/detail/:appId/:memberId/:userType/:id" component={EcgHistoryDetial} />
        </Router>
    ), document.getElementById('ROOT'));
});