// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;
// var storage = window.localStorage;//
var speed ;//风速

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
        webDataMap : {
            'OnOffStatus':'OnOffKey', // 1开机 2关机
            'LightStatus':"LightKey",//模式：灯光 1:是 2 ：否
            'SprayStatus':'SprayKey',//模式 喷射 1:是 0 ：否
            'FanSpeedStatus':'FanSpeedKey',//
            'LockStatus':'LockKey',//模式 锁定 1:是 2 ：否
        },
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
        this.state = {speedOff:false};
        this.listenStore(Store); // 监听Store
    }
    startup(e){//开关机
        Actions.startup(this);
    }
    handleLight(index){//灯光处理
        Actions.selectModes('3',index);
    } 
    handleSpray(index,speed){//喷射处理
        Actions.handleSpray(index,speed);
    }
    handleSpeed(speedIndex){//风速处理
        if(this.state.speedOff){
            Actions.selectSpeed(speedIndex);
        }else{
            Actions.selectSpeed(speedIndex+1 > 5 ? 1 : speedIndex+1);
        } 

    }
    componentWillUpdate(nextProps,nextState){
        //console.log(this.state,nextState);
        if(nextState.FanSpeedStatus!=0){
            speed = nextState.FanSpeedStatus;
        }else{
            speed = this.state.FanSpeedStatus;
        }
    }

    render() {
        let isStartup = this.state.OnOffStatus,
        isLight = this.state.LightStatus,
        // speed = this.state.FanSpeedStatus||1,
        isJet = this.state.SprayStatus,
        speedImgPath = '../static/img/btnList/2.png',
        imgPath = '../static/img/btnList/',
        speedName = '自动',
        pm = this.state.PM25 ? +this.state.PM25 : 0,
        online = this.state.online ? +this.state.online : 0,
        OnOffStatus = this.state.OnOffStatus ? +this.state.OnOffStatus : 0,
        modeName ='';
        switch(+speed){
            case 1:speedImgPath = imgPath+'2.png';speedName='自动';break;
            case 2:speedImgPath = imgPath+'3.png';speedName='高风';break;
            case 3:speedImgPath = imgPath+'4.png';speedName='中风';break;
            case 4:speedImgPath = imgPath+'5.png';speedName='低风';break;
            case 5:speedImgPath = imgPath+'6.png';speedName='睡眠';break; 
        }
        if(this.state.speedOff) {
            modeName = '喷射' ;
        }

        return (
            <div>
{/*                {this.state.online==2?<h1 className="btn-title">设备已离线</h1>:<h1 className="btn-title">{modeName!=''?modeName:speedName}PM2.5:{pm}</h1>}
*/}               
                <h1 className="btn-title">
                {
                    online==2?'设备已离线':(OnOffStatus==2?'关机':(modeName!=''?modeName:speedName+"　　PM2.5:"+pm))

                }
                </h1>
                 <section className="flex btnlist">
                    <article className="flex-cell" onTouchEnd={this.startup.bind(isStartup === 1? 2:1)}>
                        <img style={isStartup === 1?{opacity:1}:{opacity:0.5}} src="../static/img/btnList/ic-onoff.png" alt=""/>
                        <p>{isStartup === 1?'开机':"关机"}</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleLight.bind(this,isLight === 1? 2:1)}>
                        <img  style={isLight === 1 && isStartup === 1 ?{opacity:1}:{opacity:0.5}} src="../static/img/btnList/ic-light.png" alt=""/> 
                        <p>灯光</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleSpray.bind(this,isJet === 1? 2:1,speed)}>
                        <img style={isJet === 1 && isStartup === 1?{opacity:1}:{opacity:0.5}} src="../static/img/btnList/ic-spray.png"  alt=""/>
                        <p>喷射</p>
                    </article>
                    <article className="flex-cell" onTouchEnd={this.handleSpeed.bind(this,speed)}>
                        <img  style={ !this.state.speedOff && isStartup === 1?{opacity:1}:{opacity:0.4}} src={speedImgPath} alt=""/> 
                        <p>{speedName}</p>
                    </article>  
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});