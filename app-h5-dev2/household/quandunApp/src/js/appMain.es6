// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
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
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        Actions.healthy();
    }
    render() {
        var swiper = new Swiper('.swiper-container', {
        
            direction: 'vertical',
            simulateTouch :true,
        
        }); 

        let sharePage = this.state.sharePage || ['','','','',''];
        let shareTopic = this.state.shareTopic || ['','','',''];
        let number = this.state.number || ['','','',''];
        let Arr = [{
                        src:sharePage[0],
                        text:shareTopic[0],
                        text2:'天',
                        id:'quan-day',
                        data:number[0],
                        class:'',
                        cla:''
                    },
                    {
                        src:sharePage[1],
                        text:shareTopic[1],
                        text2:'升水',
                        id:'purifiedWater',
                        data:number[1],
                        class:'quandun-threes',
                        cla:'quandun-fours'

                    },
                    {
                        src:sharePage[2],
                        text:shareTopic[2],
                        text2:'g 垃圾',
                        id:'clear',
                        data:number[2],
                        class:'quandun-three3',
                        cla:'quandun-four3'
                    },
                    {
                        src:sharePage[3],
                        text:shareTopic[3],
                        text2:'元',
                        id:'money',
                        data:number[3],
                        class:'quandun-three4',
                        cla:'quandun-four4'
                    }];
        return  <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {Arr.map((item,index)=>{
                            return(
                                <div key={index} className="swiper-slide ">
                                    <p className="quandun-first"><span></span></p>
                                    <p className="qdImg"><img src={item.src}/></p>
                                    <p className={"quandun-three "+item.class}>{item.text}</p>
                                    <p className={"quandun-four "+item.cla}><a id={item.id}>{item.data}</a>{item.text2}</p>
                                </div>
                            )
                        })}
                        <div className="swiper-slide">
                            <p className="quandun-first"><span></span></p>
                            <p className="qdImg"><img src={sharePage[4]}/></p>
                            <p className="quandun-three5">好水看得见</p>
                            <p className="quandun-four5"><span>|</span><span>400G大通量</span><span>|</span><span>分体式设计</span><span>|</span><span>自清洁系统</span><span>|</span></p>
                            <p className="quandun-four5"><span>|</span><span>水质实时监测</span><span>|</span><span>终身维护</span><span>|</span></p>
                            <p className="quandun-five5">我也要喝好水</p>
                            <p className="quandun-six5"><a href="http://www.collday.com" target="_self">www.collday.com</a></p>
                        </div>
                     
                    </div>   
                </div>
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('泉盾净水分享');
    // 无路由方式
     ReactDOM.render(<App />, document.getElementById('ROOT'));

   /* // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});