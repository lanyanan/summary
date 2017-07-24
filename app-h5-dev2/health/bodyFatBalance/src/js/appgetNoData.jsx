/**
 * Created by Administrator on 2016-08-18.
 */
/**
 * Created by Administrator on 2016-08-08.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});

het.ready((data)=> {
    Actions.getNoData(data);
});

// 接收app推送数据
het.repaint((data)=> {
    // var appData = Funs._extends({}, appData, data);
    Actions.getNoData(data);
});


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {testState: 1, nickname: ' '};
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
        let dataWeight = this.state.weight?this.state.weight:'';
        return (
            <div>
                <header className='get-no-data-header'>
                    <div ></div>
                    <div className='get-no-data-header-flex'><span className='get-no-data-w'
                    >体重</span><span
                        className='get-no-data-w-data'><span className='get-no-data-w-data-un'
                    >{dataWeight}</span><span style={{fontSize:'0.3rem'}}>kg</span></span>
                    </div>
                </header>
                <div className='get-no-data-content'>
                    <div className='get-no-data-content-h'>
                        <img className='get-no-data-content-pic' src='./../static/img/get-no-data-warn.png'/>
                        <span>未获得数据</span>
                    </div>
                    <div className='get-no-data-content-f'>
                        <dl className='get-no-data-content-dl'>
                            <dt>如何获取到准确的数据</dt>
                            <dd>1.应该赤足测量;脚必须与电极有良好的接触</dd>
                            <dd>2.把秤放在平坦且坚硬的地面上,否则会出现较大误差</dd>
                            <dd >3.脚底不要沾有泥土。如果您的脚底干硬或有厚茧，可能导致错误的测量结果。</dd>
                            <dd >4.确保电池电量充足。</dd>
                        </dl>
                        <a href='health://skip_url/getNoData' className='get-no-data-content-f-a'>我知道了</a>
                    </div>
                </div>
            </div>
        )
    }
}

// 开始渲染
het.domReady(()=> {
    het.setTitle('测量报告');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('R  OOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});






