import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : true

    });
});

het.ready((data)=>{
    Actions.ready(data);
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?50:64,
            // oxygenAlert:95,
            // pulseAlert:'60,100',
        };
        this.listenStore(Store); // 监听Store
    }
    connect(){
        this.setState({goNext:true,failConnect:false});
        // var percent=0;  
        // var loading=setInterval(function(){ 
        //     document.getElementById("left").style.webkitTransform = "rotate("+(18/5)*percent+"deg)";  
        //     document.getElementById('num').innerHTML = percent;  
        //     if(percent>50){  
        //         document.getElementById("circle").className = "circle clip-auto"; 
        //         document.getElementById("right").className = 'percent right';  
        //     }  
        //     if(percent<99) percent++;  

        // },200);  
    }
    render() {
        return (
            <article className='guide-main'>
                <section className={this.state.goNext?'step1 hide':'step1 show'}>
                    <section className='header'>
                        <header style={{'height':this.state.headerTop}}></header>
                        <a href='health://switch_user'>
                            <img className='photo' src={this.state.img?this.state.img:'../static/img/ic-default.png'} alt='头像'/>
                            <img className='switch' src='../static/img/ic-switch.png' alt='切换图标'/>
                            <span className='nikename'>{this.state.nickname}</span>
                        </a>
                    </section>
                    <section className='guide'>
                        <img src='../static/img/ic-device.png' className='guide-img' alt='设备图'/>
                        <ul>
                            <li>第一步：短按“口”键，设备开机。</li>
                            <li>第二步：确认手机蓝牙是否打开，如未打开，请在手机设置选项中打开蓝牙。</li>
                            <li>第三步：蓝牙连接成功，开始测量。</li>
                        </ul>
                        <div className='footer flex'>
                            <a href='health://firstConnect' id='connect' className='btn flex-cell' onClick={this.connect.bind(this)}>开始连接</a>
                        </div>
                    </section>
                </section> 
                <section className={this.state.goNext&& !this.state.failConnect?'step2 show':'step2  hide'}>
                    <img src='../static/img/ic-loading.png' className='guide-img' alt='加载'/>
                   {/* <div className="circle" id='circle'>  
                        <div className="percent left" id='left'></div>  
                        <div className="percent right wth0" id='right'></div>  
                    </div>  
                    <p className="num"><span id='num'>0</span>%</p>*/}
                    <div className='tip'>
                        <p>设备连接中</p>  
                        <p>请耐心等候</p>  
                    </div>

                </section>
                <section className={this.state.failConnect?'failed guide show':'failed hide'}>
                        <img src='../static/img/ic-fail.png' className='guide-img' alt='shibai' style={{marginTop:"78px"}}/>
                        <p>抱歉，连接失败！</p>
                        <p>可点击下方连接设备按钮重新连接。</p>
                        <ul>
                            <li>温馨提示：</li>
                            <li>1.请确保您的设备已经开启。 </li>
                            <li>2.请确保您的设备在您身边一米之内。</li>
                            <li>3.请检查您的手机蓝牙是否打开。</li>
                        </ul>
                        <div className='footer flex'>
                            <a href='health://firstConnect' id='connect' className='btn flex-cell' onClick={this.connect.bind(this)}>连接设备</a>
                        </div>
                </section>
            </article>
            )
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('血氧仪');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});