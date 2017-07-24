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
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        var video = document.getElementById('video'),
            play  = document.getElementById('play');
            play.addEventListener("click", function(){
                video.play();
            }, false);
            video.addEventListener('canplay',function(arg){
                setTimeout(function(){$(play).fadeOut(0)},0);
                video.addEventListener('play',function(arg){
                    setTimeout(function(){$(play).fadeOut(0)},0);
                });
            });
            video.addEventListener('canplaythrough',function(arg){
                setTimeout(function(){$(play).fadeOut(0)},0);
            });
            video.addEventListener('ended',function(){
                $(play).fadeIn(0);
            })
    }
    render() {
        let deviceWidth = document.body.clientWidth;
        let fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size']);
        return (
            <div className='app-understand'>
                <section className="s s-1">
                    <div id="tv" className="tv" style={{width:(deviceWidth-fontSize*2.26)+'px'}}>
                        <video id="video" className="video" width="100%" height="100%" preload="none" controls="true">
                            <source src="../static/img/cbeauty-intro.mp4" type="video/mp4">
                            </source>
                            您的浏览器不支持HTML5视频播放,请使用更先进的Chrome浏览器，或者IE 10以上的浏览器播放视频
                        </video>
                        <i id="play" className="play"></i>
                    </div>
                </section>
                {/*style={{height:(deviceWidth/1.8)+'px'}}*/}
                <section className="s s-2"></section>
                <section className="s s-3"></section>
                <section className="s s-4"></section>
                <section className="s s-5"></section>
                <section className="s s-6"></section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         <Route path="/" component={App} />
    //     </Router>
    // ), document.getElementById('ROOT'));
});