
'use strict';
/**
 *定位页
 *
 */
//定位路由页面
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';




var {Router, Route, hashHistory,Link} = ReactRouter;



 // 创建React    这个是Location  页面的  组件
export class DetailInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64


        };   
          // Actions.getbedroom();
          // Actions.news();
        
        // this.singleClick = this.singleClick.bind(this);
        // this.handleSingleClick = this.handleSingleClick.bind(this);
       

    }
      //加载默认数据
      componentWillMount() {
        // Actions.getDefaultData(); 
         // Actions.getbedroom(); 
         Actions.news(); 
         console.log("componentWillMount");
      }      
      // componentDidMount() {
      //   // Actions.getDefaultData(); 
      //    // Actions.getbedroom(); 
      //    // Actions.news(); 
      //    console.log("这个是componentDidMount");
      // }


       render(){

          let setdata=[];
          let shijian=null,
              level=null,
              wendu=null,
              shidu=null,
              source=null;
          console.log("获取所有的卧室数据“---------详细数据页面---------------”",this.state);
              var getInfo = this.state.bedroom?this.state.bedroom:"gan";
              console.log("这个是点击后获取的索引值",getInfo);
              // // console.log(this.state.)
              // var gandata = this.state.gan?this.state.gan:["",""];
              // var gandata = this.state.gan;
              let getdata1 = this.state.gan?this.state.gan:[" "," "," "];
               let  getdata = getdata1.reverse();
              console.log("这个是全部的数据",getdata);
              for(var i =0;i<getdata.length;i++){
                // console.log(i);
              //   console.log("点击的索引值",getInfo);
                    if(getInfo == i){
                      console.log("2");
                        // let zz = JSON.stringify(gandata[i]);
                        // console.log(zz);
                        // let yy = zz[1];
                        let zz  = getdata[i];
                        console.log(zz);
                         shijian = zz.dataTime;
                         level = zz.level;
                         wendu = zz.temperature;
                         shidu = zz.humidity;
                         source = zz.dataSource;
                        console.log(shijian);
                        // for(var k=0;k<zz.length;k++){
                        //   console.log(zz[0]);
                        // }

                        // console.log("setdata的数据数据数据数据数据",yy);
                    }
              }



                // console.log(  setdata);
                // let shijian = setdata;
                console.log("时间",  shijian);
                // let shijian2 = shijian[0];
                // console.log(shijian2);

                // let shijian3 = JSON.parse(shijian2);
                // let shijian4 = shijian3.dataTime;
                // console.log("时间的时间",shijian4);

          return (
              <div>
                  <section className="DetailInfo-sec">
                    <div className="AllDataTitle  DetailInfoTitle">
                      <span>&lt;</span>
                      <span>详细信息</span>
                      <span>&gt;</span>

                    </div>
                     <div className="Middle-layer"></div>
                     <div className="detailInfoData">
                       <ul>
                         <li><span>环境等级</span><span className="detailInfo-r">{level}</span></li>
                         <li><span>记录日期</span><span className="detailInfo-r">{shijian}</span></li>
                         <li><span>数据来源</span><span className="detailInfo-r">{source}</span></li>
                        <div className="Middle-layer"></div>
                         <li>指数详情</li>
                         <li className="detailInfo-b">
                           <p><span>温度 </span> <span className="detailInfo-r">{wendu}</span></p> 
                           <b></b>
                           <p><span>湿度 </span> <span className="detailInfo-r">{shidu}</span> </p>
                          </li>
                         
                       </ul>
                     </div>
                       
                       
                  </section>

              </div>
          );
    }

   


}

// // 开始渲染
het.domReady(()=>{
    het.setTitle('智慧盒子');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    // ReactDOM.render((
    //     <Router history={hashHistory}>
    //         // <Route path="/" component={Appcity} />

    //     </Router>
    // ), document.getElementById('ROOT'));
});


