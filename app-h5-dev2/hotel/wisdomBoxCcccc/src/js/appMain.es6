import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ControlDegree} from './ControlDegree.es6';
import {BedroomEnvir} from './BedroomEnvir.es6';
import {DeviceData} from './DeviceData.es6';

import {EchartsData} from './EchartsData.es6';
import {AllData} from './AllData.es6';
import {DetailInfo} from  './DetailInfo.es6';
import {Locations} from './Locations.es6';
import {Routersss} from './Routersss.es6';

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
     
     
    console.log('------1---', data);

});

// 接收app推送数据
het.repaint((data)=>{
      console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
    // var appData = Funs._extends({}, appData, data);
      Actions.repaint(data);
      // Actions.positions(data);
      // Actions.echartsData(data);
      // Actions.getOnlineData(data);
      // // Actions.getbedroom(data);
      //       Actions.news();
      Actions.gan();
      
});




// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);

        this.state = {
            headerTop:isAndroid?73:64
        };

        this.listenStore(Store); // 监听Store

     

          Actions.getOnlineData();
          Actions.place();
    
          this.handleSwitchLight = this.handleSwitchLight.bind(this);
          // this.handleLocation    = this.handleLocation.bind(this);
          this.handleClick    = this.handleClick.bind(this);
          this.bedClick = this.bedClick.bind(this);
          this.linkLocation = this.linkLocation.bind(this);
     }

      handleClick(e) {
        console.log("wodefuck");
      }

      //指示灯开关
      handleSwitchLight(e) {

        console.log("指示灯开关指示灯开关966666777888888");

        // if(this.state.boxswitch==0){

        //   this.state.boxswitch == 1;
        // }else{
        //   this.state.boxswitch == 0;
        // }
          
          // console.log("点击事件里获取state值",this.state);
         
          var a = this.state.boxswitch?this.state.boxswitch:"1";
          console.log("点击事件里获取state值",a);
          Actions.setChange();


      }

      bedClick(){
        console.log("卧室点击");
         // Actions.news();
      }

      linkLocation(){
        console.log("1111111111111111")
         Actions.place();
      }

      // componentDidMount(){
      //   Actions.news();
      //   console.log("66666666666666666666666666666666666666666666666666666",this.state)
      // }


      //加载默认数据
      // componentDidMount() {
      //   Actions.getDefaultData();
      // }
    render() {
        //交互
        let  ligntname = this.state.lightname=1?'开':'关';
        let   nowlight = this.state.boxswitch==0?'开':'关';
        console.log("1111111111111111111111111111111111111111111111111111111111",nowlight);
        var gancao = this.state.lightname;
        console.log("12321321",this.state);
        // let city =null;   
         // this.state = JSON.stringify(this.state.citys);
          // console.log("this.state:--------------------",JSON.stringify(this.state.citys));
        
          // console.log("this is the state citys:",   this.state.citys);
          // 
          // 
          // let city =this.state.citys? this.state.citys:'citys';
// console.log("===================this.state.citys=",   city);
          // aaa ? aaa:2;
          // aaa.a ? aaa.a :3;
          // console.log('这是Citys的打印',this.state.citys);
          // console.log('这是Main的打印',this.state.ddddddd);
          // console.log('这是State的打印',JSON.stringify(this.state));
          console.log('这是没修改的state的值',this.state);
          // var a = this.state.alldata;
          // var b = a.data;
          // console.log(b);
          // console.log("6666666666666666666666666666666666",aaa.a);
            // var ddddddd = this.state.citys;
            // console.log(ddddddd);
        return (
          <div>
            <div className="headBj">
              <header  style={{'paddingTop':this.state.headerTop}}>
                <div className="headTop">
                  <span>&lt;</span>
                  <span onClick={this.handleClick}>智慧盒子</span>
                  <span>&gt;</span>
                </div>
              </header>

              <div className="headContent">
                <div className="headContentL">
                    

                <Link to="/allNation">
                   <p><span>优</span><span></span></p> 
                </Link>
                    <p><span>睡眠环境指数</span> </p>
                    <p>刷新时间:<span>18.26</span></p>
                    <p onClick={this.handleSwitchLight}>
                     
                      <span className={this.state.boxswitch==0?'openLight':'shutLight'}  >  {nowlight} 指示灯   </span> 
                  
                    </p>

                </div>

                <div className="headContentR">
                   <Link to="/enterposition"   onClick={this.linkLocation} >
                     <img src="./../static/img/position.png" />
                     <span>{this.state.positionCity}</span>
                   </Link>
                </div>
   
              </div>


            </div>

            <ControlDegree   wisdomJson =  {this.state.wisdomJson} />

            <div className="Middle-layer"></div>

                <section className="BedroomEnvir-sec">
                    <div className="BedroomTitle">
                      <span>卧室环境</span>
                      <Link to="/alldata"  onClick={this.bedClick}     > &gt;</Link>
                      {this.props.children}
                    </div>
                        <EchartsData   echatDDlist={this.state.echatDD}  echatDLlist={this.state.echatDL} />
                </section>
        
            <div className="Middle-layer"></div>

            <DeviceData />
       
          </div>
        );
    }
}

export const NewEnterAllData = React.createClass({
          //后台传递过来某个用户所有数据            
    render() {


      console.log("这是在数据列表获取的data",this.state);

        return (
            <div>

                <AllData  />

            </div>
    //             render: function() {
    //     var idx = this.props.colorIndex;
    //     return (
    //         <section className="colors flex">
    //             {this.items.map(function(i, k){
    //                 return <a key={k} href="#" className={(i==idx?"on":"") + " flex-cell"} onClick={this.handlerClick(i)}><b className={"c"+i}>&#8730;</b></a>
    //             }.bind(this))}
    //         </section>
    //     );
    // }
        )
   }
})

export const EnterInfo = React.createClass({
    render(){
        return (
            <div>
                <DetailInfo   />
            </div>
            
        )
    }
})

// export const EnterLocations = React.createClass({
//     // for(var i=0;i<data.length;i++){
//       // var charu += '<ul>'+<li>'+ {data.[i]} +'</li>+'</ul>';
//         // document.getElementById('dddddd').innerHTML = charu; 
//     // }
//     render(){
//       return (
//         <div>
//            <Locations />
//         </div>
//       )
//     }
// })

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


// import {ControlDegree} from './ControlDegree.es6';
// import {BedroomEnvir} from './BedroomEnvir.es6';
// import {DeviceData} from './DeviceData.es6';

// import {EchartsData} from './EchartsData.es6';
// import {AllData} from './AllData.es6';
// import {DetailInfo} from  './DetailInfo.es6';
// import {Locations} from './Locations.es6';
// import {Routersss} from './Routersss.es6';