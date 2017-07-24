// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import App from './App.es6';
import {Timing} from './Timing.es6';
import {Scene} from './Scene.es6';
import {SceneList} from './SceneList.es6';
import {SleepMonitoring} from './SleepMonitoring.es6';
import {SleepReport} from './SleepReport.es6';
import {About} from './About.es6';
import {PickerTime} from './PickerTime.es6';
import {DeviceList} from './DeviceList.es6';
import {NoMatch} from './NoMatch.es6';
import {Scenes} from './Scenes.es6';
import {Log} from './SceneLog.es6';
import {Err} from './Err.es6';
import Path from './ApiPath.es6';

var {Router, Route, hashHistory, IndexRoute, IndexRedirect} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    $.ajax({
            url: Path.wPath+'/wechat/jssdk/sign',
            data: 'format=json&url='+encodeURIComponent(location.href.split('#')[0]),
            async:false,
            success: function(data,status,xhr){
                console.log(data)
                if(typeof data == 'string'){
                    data = JSON.parse(data);
                }
                var code = data.code;
                var jsonData = data.data;
                if(status == "success" && code == 0){   
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: jsonData.appId, // 必填，公众号的唯一标识
                        timestamp: jsonData.timestamp, // 必填，生成签名的时间戳
                        nonceStr: jsonData.nonceStr, // 必填，生成签名的随机串
                        signature: jsonData.signature,// 必填，签名，见附录1
                        jsApiList: ['closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });     
                    sessionStorage.appid = jsonData.appId;          
                    // wx.ready(function(){ 
                    // });
                    // wx.error(function(res){
                    //  alert(res.errMsg);      
                    // });                  
                }       
            }
        });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 开始渲染
het.domReady(()=>{
    het.setTitle('智能酒店');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));
    // 路由方式
    ReactDOM.render((
       <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="list" component={SceneList} />
            <Route path="scene" component={Scene} />
            <Route path="report" component={SleepReport} />
            <Route path="sleep" component={SleepMonitoring} />
            <Route path="about" component={About} />
            <Route path="timing" component={Timing} />
            <Route path="picker" component={PickerTime} />
            <Route path="device" component={DeviceList} />
            <Route path="scenes" component={Scenes} />
            <Route path="log" component={Log} />
            <Route path="error" component={Err} />
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
    ), document.getElementById('ROOT'));
});