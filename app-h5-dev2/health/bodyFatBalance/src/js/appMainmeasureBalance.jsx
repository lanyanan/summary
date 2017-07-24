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
    Actions.repaint(data);
    //console.log(data);
});

// 接收app推送数据
het.repaint((data)=> {
    Actions.repaint(data);

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
        //console.log(this.state)
        let testing = this.state.testState == 1 ? 'switchChang-active' : '',
            scanning = this.state.testState == 2 ? 'switchChang-active' : '',
            suc = this.state.testState == 3 ? 'switchChang-active' : '',
            tryAgain = this.state.testState == 4 ? 'switchChang-active' : '';
        return (
            <div className='mea-user'>
                <a className='mea-header'><img src={this.state.img?this.state.img:'./../static/img/user-mes.png'}/><span>你好，{this.state.nickname}</span></a>
                <ul className='switchChang'>
                    <li className={testing+' mea-fat' }><img src='./../static/img/measure_pic.png'/></li>
                    <li className={scanning+' mea-fat-scanning'}><img src='./../static/img/scanning.png'/></li>
                    <li className={suc+' mea-fat-suc'}><img src='./../static/img/meaSuc.png'/><span
                        className='user-body-data'>{this.state.weight}<span style={{fontSize:'0.36rem'}}>kg</span></span></li>
                    <li className={tryAgain+' mea-fat-t'}>
                        <div className='mea-fat-dis'><span className='mea-fat-again'>抱歉,无法连接到体脂秤</span><a
                            className='mea-fat-button' href={'health://skip_url/measureBalance/tryAgain'}>再试一次</a></div>
                    </li>
                </ul>
            </div>
        )
    }
}
////state 1
//export const Measure = React.createClass({
//
//    render(){
//        return(
//            <a className='mea-fat'><img  src='./../static/img/measure_pic.png'/></a>
//        )
//    }
//})
////2
//export const WorkingMea = React.createClass({
//
//    render(){
//        return(
//            <a className='mea-fat-scanning'><img  src='./../static/img/scanning.png'/></a>
//        )
//    }
//})
////4
//export const TryAgainMea = React.createClass({
//
//    render(){
//        return(
//            <div className='mea-fat-t'>
//                <span className='mea-fat-again'>抱歉,无法连接到体脂秤</span>
//                <a className='mea-fat-button'>再试一次</a>
//            </div>
//        )
//    }
//})
////3
//export const MeaSuc = React.createClass({
//
//    render(){
//        return(
//            <div className='mea-fat-suc'>
//                <img  src='./../static/img/meaSuc.png'/><span className='user-body-data'>55.5kg</span>
//            </div>
//        )
//    }
//})

// 开始渲染
het.domReady(()=> {
    het.setTitle('体脂秤');
// 无路由方式
// ReactDOM.render(<App />, document.getElementById('ROOT'));

// 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});




