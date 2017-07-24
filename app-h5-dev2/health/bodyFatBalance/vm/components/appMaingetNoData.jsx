/**
 * Created by Administrator on 2016-08-10.
 */
/**
 * Created by Administrator on 2016-08-09.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './../../src/js/Actions.es6';
import {Store} from './../../src/js/Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
    debugMode: 'print', // 打印调试数据
    updateFlagMap: {}
});
});

het.ready((data)=>{
    Actions.ready(data);
});

// 接收app推送数据
het.repaint((data)=> {
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
        let content_pic = './../static/img/get-no-data-warn.png';
        return (
            <div>
                <header className='get-no-data-header'>
                    <div></div>
                    <div className='get-no-data-header-flex'>
                    <span className='get-no-data-w'>体重</span>
                    <span className='get-no-data-w-data'>{this.state.weightData}<span className='get-no-data-w-data-un'>kg</span></span>
                    </div>
                </header>
                <div className='get-no-data-content'>
                        <div className='get-no-data-content-h'>
                            <img className='get-no-data-content-pic' src={content_pic}/>
                            <span>未获得数据</span>
                        </div>
                        <div className='get-no-data-content-f'>
                            <dl className='get-no-data-content-dl'>
                                <dt>如何获取到准确的数据</dt>
                                <dd>1.应该赤足测量;脚必须与电极有良好的接触</dd>
                                <dd>2.把秤放在平坦且坚硬的地面上,否则会出现较大误差</dd>
                                <dd>3.脚底不要沾有泥土。如果您的脚底干硬或有厚茧，可能导致错误的测量结果。</dd>
                                <dd>4.确保电池电量充足。</dd>
                            </dl>
                            <a href={'health://skip_url/getNoData'} className='get-no-data-content-f-a'>我知道了</a>
                        </div>
                </div>
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