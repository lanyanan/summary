// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SetMode} from './SetMode.es6';
import Mask from './react-mask.jsx';
var {Router, Route, hashHistory,Link} = ReactRouter;

/*het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,
        updateFlagMap: {
        }
    });
});
*//*
// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});*/

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        Actions.getData();
        het.setTitle('荣事达豆浆机');

        
    }
    componentDidMount(){
        this.lxClock = setInterval(function(){
            Actions.getting();
        },5000);
        Actions.getting();
    }
    componentDidUpdate(prevProps, prevState) {
        let WorkCompSta = this.state.WorkCompSta;
        if(WorkCompSta ==3){
            let _this = this;
            clearInterval(this.tclock);
            this.tclock = setInterval(function(){_this.timeclock()},60000);
        }
    }
    timeclock(){
        //console.log('tttttttttttttttttt',this.state.BespeakHour,this.state.BespeakMin);
        let date = new Date();
        let hour = parseInt(this.state.BespeakHour, 16)-date.getHours() - 1;
        let minute = parseInt(this.state.BespeakMin, 16)-date.getMinutes() + 60;
        hour = hour < 0 ? hour + 24 : hour;
        let minutes = hour * 60 + minute;
        let BespeakHour = parseInt(minutes / 60);
        let BespeakMin = minutes % 60;
        // let BespeakMin = minute<0?minute+60:minute;
        // let BespeakHour = minute<0?hour-1:hour;
        clearInterval(this.tclock);
        if (BespeakHour>=0 || BespeakMin>0) {
            BespeakMin -= 1;
            // Actions.timeclock(BespeakMin);
            //this.setState({BespeakMin:BespeakMin});
            if(BespeakMin<=0){
                BespeakMin = 59;
                BespeakHour -=1;
                //this.setState({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
                // Actions.timeclocker(BespeakHour, BespeakMin);
                if(BespeakHour<0){

                    clearInterval(this.tclock);
                    let  CurWorkMode= this.state.CurWorkMode;
                    Actions.workCompSta(CurWorkMode);
                    //this.setState({WorkCompSta:1});
                }
            }
            Actions.timeclocker(BespeakHour, BespeakMin);
        }
    }
    modeCancel(){
        let KeyFlagSta = this.state.KeyFlagSta;
        if(KeyFlagSta =='01'){
            return false;
        }
        clearInterval(this.tclock);
        let WorkCompSta = this.state.WorkCompSta;
        let CurWorkMode = this.state.CurWorkMode;
        if(WorkCompSta==3){this.setState({WorkCompSta:0})}

        Actions.modeCancel(WorkCompSta,CurWorkMode);

    }
    modeFinish(){
        this.setState({WorkCompSta:0});
        Actions.modeFinish();
    }
    modeLink(e){
        clearInterval(this.tclock);
        let WorkCompSta = this.state.WorkCompSta;
        let BespeakSta = this.state.BespeakSta;
        
        if(WorkCompSta =='00' && BespeakSta =='00'){location.href="#/setMode";}
    }
    open(e){
        e.stopPropagation();
        e.preventDefault();
    }
    render() {
        let BespeakSta = parseInt(this.state.BespeakSta || 0);
        let BespeakMode = parseInt(this.state.BespeakMode || 0);
        let WorkCompSta = parseInt(this.state.WorkCompSta || 0);
        let CurWorkMode = parseInt(this.state.CurWorkMode !=undefined?this.state.CurWorkMode:9);
        (BespeakSta ==1&&WorkCompSta ==0)?(WorkCompSta=3,CurWorkMode = BespeakMode):WorkCompSta;
        let stateMode =['待机中', '工作中', '工作完成','预约中'][WorkCompSta];
        let cirCon = ['设置模式','五谷豆浆','干/湿豆','米糊','绿豆沙','婴儿辅食',' ','果汁搅拌','轻松洗'][CurWorkMode]
        let stateTitle = this.state.KeyError == '01'?'提示：按键故障':' ';
        

        let date = new Date();
        let hour = parseInt(this.state.BespeakHour, 16)-date.getHours() - 1;
        hour = hour < 0 ? hour + 24 : hour;
        let minute = parseInt(this.state.BespeakMin, 16)-date.getMinutes() + 60;
        let minutes = hour * 60 + minute;
        let BespeakHour = parseInt(minutes / 60);
        let BespeakMin = minutes % 60;

        // console.log('aaaaaaa',BespeakHour,BespeakMin);
        BespeakHour = BespeakHour < 0 ? (BespeakMin < 0?BespeakHour+23: BespeakHour+24) : ((BespeakHour == 0 && BespeakMin < 0)?23:BespeakHour);
        BespeakHour == 24 ? BespeakHour=0 : BespeakHour;
        BespeakMin = BespeakMin < 0 ? BespeakMin+60 : BespeakMin;
        // let BespeakMin = minute<0?minute+60:minute;
        // let BespeakHour = (minute<0?hour-1:hour)<0?0:(minute<0?hour-1:hour);
        let online = parseInt(this.state.online) || 1;
        let KeyFlagSta = this.state.KeyFlagSta;
        let open = (this.state.WorkCompSta ? '02' : '01') ;

        return( 
        <div className='app-body'>
            <div className='indexTop'></div>
            <div className='indexCon'>
                <div className={online !=2 ?'stateCon':'stateCons'}>
                    <p className='stateTitle'>{stateTitle}</p>
                    <p className={'stateMode'+' '+'stateMode'+WorkCompSta}><span>{stateMode}</span></p>
                    <p className='currState'>{this.state.WorkCompSta ==0? ' ':'当前模式'}</p>
                    <div className={'stateCir'+' '+'stateCir'+(WorkCompSta ==0?0:CurWorkMode)} onTouchStart={this.modeLink.bind(this)}>
                       {/* <Link to='setMode' >*/}
                            <p><i></i></p>
                            <p>{WorkCompSta ==0?'设置模式':cirCon}</p>
                       {/* </Link>*/}
                    </div>
                    <p className='stateDao'>{WorkCompSta==3?('预计'+BespeakHour+'小时'+((BespeakMin<10 && BespeakMin>0)?('0'+BespeakMin):BespeakMin)+'分后开始'):' '}</p>
                    <div className={WorkCompSta == 1|| WorkCompSta==3 ? (KeyFlagSta =='01'?'KeyFlagSta':'cancel'):'cancels'} onTouchEnd={this.modeCancel.bind(this)}>
                        取消
                    </div>
                    {/*<div className={WorkCompSta == 2 ?'finish' :'finishs'} onTouchEnd = {this.modeFinish.bind(this)}>
                        完成
                    </div>*/}
                </div>
                <div className={online ==2?'unline':'unlines'}>
                    <span className='unline-bg'></span>
                    <p>主人，您的豆浆机不在线哦~！</p>
                </div>
            </div>
           <div className={open=='01'?'layer-loading':'layer-loader'} onTouchStart={this.open}>
                <div className='icon-loading'><span><img src='../static/img/iconfont-loadc-white.svg' className='waiting-rotation' /></span></div>
                <Mask />
            </div>
        </div>
    );}
}

// 开始渲染
het.domReady(()=>{
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));
    het.config({
        appId: '30590',
        appSecret:'98889238ed6e441aaf9b0691b017695f'
    });
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/setMode" component={SetMode} />
        </Router>
    ), document.getElementById('ROOT'));
});