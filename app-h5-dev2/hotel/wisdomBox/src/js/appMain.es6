import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ControlDegree} from './ControlDegree.es6';
import {DeviceData} from './DeviceData.es6';
import {EchartsData} from './EchartsData.es6';
import {AllData} from './AllData.es6';
import {DetailInfo} from  './DetailInfo.es6';
import {Locations} from './Locations.es6';

import {AllNationnal} from './AllNationnal.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

het.ready((data)=>{
     
     
    // console.log('------1---', data);

});
// 接收app推送数据
het.repaint((data)=>{
      
});



// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64
        };

 Actions.checkOnline();
          //获取卧室数据
        Actions.getbedroom();
        //获取设备运行数据
        Actions.getOnlineData();

        Actions.newCity();
        Actions.getScoreLevel();
       
        this.handleSwitchLight = this.handleSwitchLight.bind(this);
        // this.handleLocation    = this.handleLocation.bind(this);
     }

      // componentWillReceiveProps(nextProps){
      //      console.log("componentWillReceiveProps",nextProps);
      //     //   setInterval(function(){
      //     //   Actions.getOnlineData()
      //     // },3000);
      // }
  
      componentWillMount(){
          //判断设备是否在线
          // console.log('456')
        Actions.checkOnline();
      }

      componentDidMount(){
          setInterval(function(){
            Actions.getOnlineData(1)
           },4000);
      }


      //指示灯开关
      handleSwitchLight(e) {
      Actions.getTime();
      var a = this.state.boxswitch;
      let index = this.state.boxswitch==0 ? 1 : 0; //(0:关,1:开);
      Actions.onoffLight(index);
      }

      componentWillMount(){

        Actions.checkOnline();



        //修改标题
        var $body = $('body');
        document.title = '智慧盒子';
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    }


    render() {
        //交互
        //判断当前设备开关，若设备关则显示开，反之.
        let   nowlight = this.state.boxswitch==0?'开':'关';
          
            var getTime = new Date();
            var nowYear = getTime.getFullYear();
            var nowMonth = getTime.getMonth()+1;
            var nowDate = getTime.getDate();
            var nowTime =  nowYear + '-' + nowMonth + '-' + nowDate;
            var time = getTime.toLocaleString();
     
            var nowHour = getTime.getHours();
            var nowMin =  getTime.getMinutes();
            if(nowHour < 10){
              nowHour  = '0'+nowHour;
            }
            if(nowMin < 10){
              nowMin = '0'+nowMin;
            }
            var freshen = nowHour + ':'+ nowMin;
            var kaiguan = this.state.boxswitch;
           //定位---选择其他城市的判断
            let selectCity = this.state.city?this.state.city:'1';
            this.state.echatTime = this.state.echatTime?this.state.echatTime:"1";

        return (
          <div>
            <div className="headBj">
              <header  className="headerTop">
         
              </header>

              <div className="headContent">
                <div className="headContentL">   
                   <p>
                     <Link to="/allNation"><span className="ample">{this.state.getScoreLevel}</span><span className={this.state.LevelColor}></span> </Link>
                   </p> 
                    <p><span>睡眠环境指数</span> </p>
                    <p>刷新时间:<span>{freshen}</span></p>
                    <p onClick={this.handleSwitchLight}>
                      <span className={this.state.boxswitch==0?'openLight':'shutLight'}  >  {nowlight} 指示灯   </span> 
                    </p>
                </div>

                <div className="headContentR">
                   <Link to="/enterposition">
                     <img src="./../static/img/position.png" />
                     <span>{this.state.setLocation?this.state.setLocation:' '}</span>
                   </Link>
                </div>
   
              </div>
            </div>
            <ControlDegree   temperature =  {this.state.temperature}  humidity={this.state.humidity} />
            <div className="Middle-layer"></div>
                <section className="BedroomEnvir-sec">
                    <div className="BedroomTitle">
                      <span>卧室环境</span>
                      <Link to="/alldata"   level={this.state.level} > &gt;</Link>
                      {this.props.children}
                    </div>
                </section>

              <EchartsData   echatTime={this.state.echatTime} echatLevel={this.state.echatLevel} echatLevelWords={this.state.echatLevelWords} renderIf={this.state.renderIf}     renderIf2={this.state.renderIf2}  />
           
            <div className="Middle-layer"></div>
            <DeviceData />
          </div>
        );
    }
}


export const EnterInfo = React.createClass({
    render(){
        return (
            <div>
                <DetailInfo  />
            </div>
            
        )
    }
})

// 开始渲染
het.domReady(()=>{
    het.setTitle('智慧盒子');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="alldata"  component={AllData}  />
            <Route path="enterinfo"  component={EnterInfo}  />
            <Route path="enterposition" component={Locations} />
            <Route path="allNation" component={AllNationnal} />
        </Router>
    ), document.getElementById('ROOT'));
});
