import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {
        },
        renderConfigData : true
    });
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
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop:isAndroid?50:64,
            stepShow:0,
            chartShow:0
        };
        this.listenStore(Store); // 监听Store
    }
    stepShow(){
        let stepShow = this.state.stepShow ===0 ? 1 :0 ;
        this.setState({stepShow:stepShow});
    }
    chartShow(){
        let chartShow = this.state.chartShow ===0 ? 1 :0 ;
        this.setState({chartShow:chartShow});
    }
    render() {
        let stepArrow = this.state.stepShow ===0? '../static/img/ic-right.png':'../static/img/ic-down.png' ;
        let tempArrow = this.state.chartShow ===0? '../static/img/ic-right.png':'../static/img/ic-down.png' ;
        return (
            <div  className='help'>
                <header style={{'paddingTop':this.state.headerTop}}></header>
                <section className='help-list'>
                    <dl>
                        <dt  onClick={this.stepShow.bind(this)}><span>使用步骤</span><img className='arrow' src={stepArrow}/></dt>
                         {
                            this.state.stepShow === 0 ? '': (
                                <section className='step'>
                                    <p>如何科学的使用体温贴呢?</p>
                                    <img className='helpimg' src='../static/img/ic-helpmain.png' alt='使用帮助'/>
                                </section>         
                                )
                        } 
                        <dt style={{borderTop:'1px solid #FAFAFA'}} onClick={this.chartShow.bind(this)}><span>正常人体体温</span><img className='arrow' src={tempArrow} /></dt>
                        {
                            this.state.chartShow === 0 ? '': (
                                <section className='chart'>
                                    <img className='helpimg' src='../static/img/ic-helpchart.png' alt='体温表'/>
                                </section>     
                                )
                        }
                    </dl>
                </section>
            </div>
            );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('使用帮助');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));

   /* // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});