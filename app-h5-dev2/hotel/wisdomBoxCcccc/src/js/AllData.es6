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

import {DetailInfo} from  './DetailInfo.es6';


var {Router, Route, hashHistory,Link} = ReactRouter;



 // 创建React    这个是Location  页面的  组件
export class AllData extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64


        };   
         Actions.news();

        // this.singleClick = this.singleClick.bind(this);
        this.handleSingleClick = this.handleSingleClick.bind(this);
       

    }
      //加载默认数据
      // componentDidMount() {
      //   // Actions.getDefaultData();   
      //   let cao = this.state.gan;
      //    console.log("componentDidMount:",this.state);
      // }      

      handleSingleClick(e){
          e.stopPropagation();
          e.preventDefault();
          // console.log(e);
         // console.log(e.currentTarget.getAttribute("data-in"));
         let gancao     = e.currentTarget.getAttribute('data-in');

         // console.log(gancao);
         Actions.getbedroom(gancao);
         Actions.repaint();
         
         // e.target()
            // var sw = 0;
            // var  flag = "0001";
            // var json = {"boxSwitch":sw,"updateFlag":flag,"controlCode":0};
            // var tjson = JSON.stringify(json);
            // console.log(tjson);
            // console.log( )
      }


      componentWillMount(){
       
         // Actions.news();
         let cao = this.state.gan;
         console.log("componentWillMount:",this.state); 

          // Actions.getbedroom();
      }


    render() {
        console.log("获取所有的卧室数据Alldata页面",this.state);
        // var level    = this.state.kao?this.state.kao:[" "," "," "];
        // console.log("level:::::",level);
        // var datatime = this.state.gan?this.state.gan:[" "," "," "];
        // console.log("level:::::",datatime);
        // var cao = level.push(datatime);
        // console.log(cao);
        let getdata1 = this.state.gan?this.state.gan:[" "," "," "];
        let  getdata = getdata1.reverse();
        console.log(getdata);
        // console.log(getdata);

                  // datatime.map(function(k){
                  //                 return (
                  //                 <li> <i></i><p><span>{i}</span> <span className="dataInfoTime">{k}<b>&gt;</b></span></p>   </li>
                  //                 )
                  //              }.bind(this))
                  //              
                  //                    // <li> <i></i><p><span>优</span> <span className="dataInfoTime">08-15<b>&gt;</b></span></p>   </li>
        return (
            <div>
                <section className="AllData-sec">
                    <div className="AllDataTitle">
                      <span>&lt;</span>
                      <span>所有已记录的数据</span>
                      <span>&gt;</span>



                    </div>
                     <div className="Middle-layer"></div>
                     
                     <div className="dataInfo">
                        <ul>
                          {
                            getdata.map(function(i,k){
                               return (
                               
    <li  onClick={this.handleSingleClick}  data-in={k} > <Link to="/enterinfo">  <i></i><p><span>{i.level}</span> <span className="dataInfoTime">{i.dataTime} <b>&gt;</b> </span></p> </Link></li>
                                    
                            
                                                               
                               )                                                 
                              }.bind(this)) 
                           }
                        
                        </ul>
                     </div>
                </section>

            </div>
        );
    }

        componentWillUpdate() {
            // console.log("componentDidMount的值",this.state);
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



