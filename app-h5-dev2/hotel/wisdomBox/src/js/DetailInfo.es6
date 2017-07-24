
'use strict';
/**
 *
 *
 */
//数据详细页
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';




var {Router, Route, hashHistory,Link} = ReactRouter;



 // 创建React    这个是DetailInfo  页面的  组件
export class DetailInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64


        };   
       
    }
      //加载默认数据
      componentWillMount() {
     
      }      


       render(){
          let level= this.state.detailData?this.state.detailData.level:' ';
          let time= this.state.detailData?this.state.detailData.ChangedataTime:' ';
          let dataSource= this.state.detailData?this.state.detailData.dataSource:' ';
          let temperature= this.state.detailData?this.state.detailData.temperature:' ';
          let humidity= this.state.detailData?this.state.detailData.humidity:' ';
      
          return (
              <div>
                  <section className="DetailInfo-sec">
                     <div className="detailInfoData">
                       <ul>
                         <li><span>环境等级</span><span className="detailInfo-r">{level}</span></li>
                         <li><span>记录日期</span><span className="detailInfo-r">{time}</span></li>
                         <li><span>数据来源</span><span className="detailInfo-r">{dataSource}</span></li>
                        <div className="Middle-layer"></div>
                         <li>指数详情</li>
                         <li className="detailInfo-b">
                           <p><span>温度 </span> <span className="detailInfo-r">{temperature}</span></p> 
                           <b></b>
                           <p><span>湿度 </span> <span className="detailInfo-r">{humidity}</span> </p>
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
    // het.setTitle('详细信息');
});


