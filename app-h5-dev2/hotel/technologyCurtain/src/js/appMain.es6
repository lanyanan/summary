// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import Range from './range.jsx';

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
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop:isAndroid?75:40,
            drag:false,
        };
        this.listenStore(Store); // 监听Store

        this.changeClose = this.changeClose.bind(this);
        this.allOpen = this.allOpen.bind(this);
        this.allClose = this.allClose.bind(this);
        // this.pauseOpenClose = this.pauseOpenClose(this);
    }


    componentDidMount(){
        Actions.getdata();
        // Actions.test();
        // Actions.setWechatId();
    }

    changeClose(){
    
    }
    allOpen(){
        Actions.allOpen();
    }
    allClose(){
        Actions.allClose();
    }
    pauseOpenClose(){
        Actions.pauseOpenClose();
        ///*<img src="../static/img/halfOpen.png" />*/
    }

    //窗帘控制

    render() {

        console.log("Main--Data",this.state);
        return(
            <div className="main">
       
            <div>
                <header  style={{paddingTop:this.state.headerTop}}>
                    <div className="head">
                        <span className="statusBar"></span>
                        <span className="stateTitle">智能窗帘</span>
                        <span></span>
                    </div>
                    
                    <div className="Pic">
                      <div className="Pic-left" id="PicLeft"  style={{width:this.state.selectRange2}}></div>
                      
                      <div className="Pic-right" id="PicRight"  style={{width:this.state.selectRange2}} ></div>
                      <div className="Pic-mid"></div>
                    </div>
                    <div className="headerContent">
                        <i></i>
                        <span className="headerInfo">
                            当前开合程度<span className="degree">{this.state.slide}</span>%
                        </span>
                    </div>
                </header>
                {/*窗帘控制*/}
                <section className="curTainControl">
                    <div className="layer"    style={{display:this.state.ifctramLayer?'block':'none'}}  ></div>
                    <p>窗帘控制</p>
                    <div className="Control-precent" style={{visibility:this.state.drag?'visible':'hidden'}}  >{this.state.slide}%</div>
                     <i className="low"></i>
                     <div className="flex-cell">
                        <Range  value={this.state.light} min="0" max="100" fnFeedback={this.changeClose} />
                    </div>
                    <div className="Belowflex">
                        <span>0%</span>
                        <span>100%</span>
                    </div>
                </section>
                <section className="select">
                    
                    <div onClick={this.allOpen}><span>全开</span></div>
                    <div onClick={this.allClose}><span>全关</span></div>
                   
                </section>
                <section className="stopOpenClose"  onClick={this.pauseOpenClose.bind(this)} >
                     <div><span>停止开合</span></div>
                </section>
                <div className="deviceTips">设备不在线</div>

            </div>
        </div>
        )
    }

}

// 开始渲染
het.domReady(()=>{
    het.setTitle('智能窗帘');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});