// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {LightMist} from './LightMist.es6';
import {ColorPick} from './ColorPick.es6';
import {ClockPick} from './ClockPick.es6';

var {Router, Route, hashHistory} = ReactRouter;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?53:44,
            tipShow:false,
            light:3,
            mist:3,
            getDOM:0,
            offHeight:'100%'
        };
        this.listenStore(Store); // 监听Store
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        Actions.getData();
    }

    // componentWillUpdate(){
    //     Actions.getData();
    //     console.log("willUpdata",this.state);
    // }

    domLoad() {
        if(this.state.getDOM>10) return;
        let offHeight = document.querySelector('#ROOT').offsetHeight;
        let getDOM = this.state.getDOM+1;
        this.setState({
            offHeight:offHeight,
            getDOM:getDOM
        });
    }
    hiddenTips(){
        this.setState({
            tipShow:false
        });

    }
    changeSwitch(){
        Actions.changeSwitch();
    }
    getRunning() {
        return !((this.state.light==3) && (this.state.mist==3));
    }
    closeTips() {
        this.setState({tipsShow: false});
    }
    render() {
        let isRunning = this.getRunning();
        let activeColor = this.state.color || 0;

        // console.log("render",this.state);

        // if(this.state.warningStatus == 1){
        //     console.log("加湿机已经因为停水自动暂停了，注意加水不能超过最高刻度线");

        // }


        return (
            <div id='main' onLoad={this.domLoad.bind(this)}>
                <header style={{paddingTop:this.state.headerTop}}>
                  <p className="tips" style={{visibility: this.state.tips && this.state.tipsShow ? 'visible' : 'hidden'}} onTouchStart={this.closeTips.bind(this)}>{this.state.tips}<i className="close"></i></p>

                    <p style={{visibility: this.state.warningStatus==1?(this.state.tipShow?'hidden':'hidden'):(this.state.tipShow?'visible':'hidden') }}   >
                        <i className='tips-icon'></i>
                        主人及时清理雾化网，可以延长我的寿命哦~
                        <label className='ignore-btn' onTouchEnd={this.hiddenTips.bind(this)}>忽略</label>
                       
                    </p>
                   <p className={this.state.warningStatus==1?'warning-on':'warning-off'}>加湿机已经因为缺水自动暂停了，注意加水不能超过最高刻度线</p>
                    <figure>
                        <img src={"../static/img/humidifier_icon"+activeColor+".png"} />
                    </figure>
                    <span onTouchEnd={this.changeSwitch.bind(this)} className={isRunning?'switch-on':'switch-off'}></span>
                </header>
                <LightMist light={this.state.light==100?3:this.state.light} mist={this.state.mist} />
                <h2>颜色</h2>
                <ColorPick color={this.state.color}   light={this.state.light} />
                <h2>定时</h2>
                <ClockPick timeValue={this.state.timeValue} disable={!this.getRunning()} />
                <div className={isRunning?'':'all-off'} style={{height:(isRunning?'0':this.state.offHeight)}}></div>
                
            </div>);
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('加湿器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});