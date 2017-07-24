/**
 * Created by Administrator on 2016-09-06.
 */
/*页面请求示例：
 http://localhost:3000/waterPurifier/page?deviceId=6c4b63e67e42e33a7ac675167ae01b94&host=200.200.200.50
 deviceId:设备id
 host：主机域名（因为用到ajax接口，为了便于各环境发布调试，这里有后台传接口域名）
 */
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Bound} from './Bound.jsx';
var {Router, Route, hashHistory,RouterContext} = ReactRouter;
var appData = {};
het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        // debugMode: 'print', // 打印调试数据
        webDataMap: {},
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data)=> {
    //appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        Store.listen((data)=> {
            if (!this.isMounted(this)) return;
            this.setState(data)
        }); // 监听Store
    }

    isMounted(component) {
        try {
            ReactDOM.findDOMNode(component);
            return true;
        } catch (e) {
            return false;
        }
    }

    componentDidMount() {
        $('#indicatorContainer').radialIndicator({
            radius: 100,
            fontColor: '#ffffff',
            barColor: '#27c5ff',
            barWidth: 10,
            initValue: 40,
            roundCorner: true,
            //barColor: {
            //    0: '#FF0000',
            //    33: '#FFFF00',
            //    66: '#0066FF',
            //    100: '#33CC33'
            //},
            percentage: true
        });
    }

    render() {
        return <div style={{textAlign:'center'}}>
            <div className='detail-show'>
                <div id="indicatorContainer" className=""><img src='./../static/img/wrapCon.png' id='prgLogo'/></div>
                <span style={{fontSize:'1rem' ,color:'#fff'}}>预计剩余时间120天</span>
            </div>
            <a className='detail-reset' href='xt://xt_reset'>滤芯复位</a>

        </div>
    }
}

// 开始渲染
het.domReady(()=> {
    het.setTitle('C-Life 设备控制');
// 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));
// 路由方式
    /*    ReactDOM.render((
     <Router history={hashHistory} >
     <Route path="/" component={App} />
     <Route path="/" component={Bound} />
     <Route path="/graph" component={Graph} />
     </Router>

     ), document.getElementById('ROOT'));*/
// 调用iscroll处理页面滚动
});