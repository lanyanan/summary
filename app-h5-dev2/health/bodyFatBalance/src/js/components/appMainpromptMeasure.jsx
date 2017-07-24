/**
 * Created by Administrator on 2016-08-09.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../../common/src/BaseComponent.class.es6';
import {Actions} from './../Actions.es6';
import {Store} from './../Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
    debugMode: 'print', // 打印调试数据
    updateFlagMap: {}
});
});

het.ready((data)=>{
    //Actions.getData(data);
});

// 接收app推送数据
het.repaint((data)=> {
    // var appData = Funs._extends({}, appData, data);
    //Actions.repaint(data);

});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

    }
    handleSwitch() {
        console.log(JSON.stringify(this.state))
    }

    componentDidMount() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        }, false);


    }

    render() {
        let imgSrc='./../static/img/prompt-tips.png';
        return (

            <div>
                    <header className='mpt-header'>
                        <div></div>
                        <div className='mpt-header-flex'>
                                <img className='user-port' src='./../static/img/user-mes.png'/>
                                <span className='mpt-header-span'>美男子,请上秤测量你的身体指标</span>
                        </div>
                    </header>
                    <div className='mpt-wrap-tips'>
                        <img  className='mpt-wrap-tips-pic' src={imgSrc}/>
                    </div>
                    <a className='mpt-footer ' href={'health://skip_url/promptMeasure'}>上秤</a>
            </div>
    )
    }

}

// 开始渲染
het.domReady(()=> {
    het.setTitle('体脂秤');
// 无路由方式
// ReactDOM.render(<App />, document.getElementById('R  OOT'));

// 路由方式
ReactDOM.render((
    <Router history={hashHistory}>
    <Route path='/' component={App}/>
    </Router>
), document.getElementById('ROOT'));
});

//<span>暖心小贴士,快速get用秤技巧</span>
//<div>
//<img />
//<ul>
//<li>打开手机蓝牙</li>
//<li>把秤放在平坦切坚硬的地面上,否则会出现较大误差</li>
//<li>脱掉袜子,双脚平均踩在上面,才能准确测出各项指标</li>
//<li>设备数据同步到手机上后,可在APP上查看各项身体指标</li>
//</ul>
//</div>