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

import { NationalEchartsData} from './NationalEchartsData.es6';

let AppData = {};
var {Router, Route, hashHistory,Link} = ReactRouter;

 // 创建React    这个是Location  页面的  组件
export class AllNationnal extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?73:64
        };         
               
         Actions.getAllSleepData();
         Actions.getbedroom();
         Actions.newCity();
         Actions.getScoreLevel();
        
    }

      //加载默认数据
      componentDidMount() {
           // setInterval(function(){
           //  Actions.getOnlineData(1);
           //  console.log('123')
           // },7000);
      
    }    

    // componentWillUpdate(next,two){
    //      console.log("-1",this.state);
       

    // }
    
// shouldComponentUpdate( nextProps,  nextState){
//       console.log("shouldComponentUpdate",nextProps);
//       if(nextProps.renderIf2 != null){
//         return false
//       }
    
      
//        return false
      
// }




  render(){

            //刷新时间
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

            // console.log(this.state);



    

        return (
            <div>
                <div className="headBj">
                  <header  className="headerTop">
                  </header>

                        <div className="headContent">
                          <div className="headContentL">
                              <p><span> {this.state.getScoreLevel} </span>    </p> 
                              <p>刷新时间:<span>{freshen}</span></p>
                          </div>

                          <div className="headContentR">
                               <img src="./../static/img/position.png" />
                               <span>{this.state.setLocation?this.state.setLocation:this.state.setLocation}</span>
                          </div>
                          <div className="headTip">
                            <p>睡眠环境拖累了全国指数,快去改善吧!</p>
                          </div>
                        </div>

                      </div>

                      <NationalEchartsData   renderIf2={this.state.renderIf2}   bedTimeNation={this.state.bedTimeNation}   nationLevel={this.state.nationLevel}  echatTime={this.state.echatTime} echatLevel={this.state.echatLevel}   bedLevelPersonal={this.state.bedLevelPersonal} renderIf2 ={this.state.renderIf2}      />

                      <div className="Nationnal-info">
                          <h6>智慧盒子小提示</h6>
                          <p><span>光亮:</span>人在睡眠时,光亮会造成眼皮刺激是神经,而且一直松果体分泌褪黑素,故睡眠时寝室光线宜暗不宜亮。"静"和"暗"是睡眠的两大要素 </p>
                          <p><span>枕头:</span>不宜太高也不宜太低。以自己的拳头高为宜，硬度适中;其长度和肩宽相等,头凉足热是最舒畅的睡眠方法</p>
                          <p>当前时间： {nowTime}</p>
                      </div>

            </div>
        );
    }

}

// // 开始渲染
het.domReady(()=>{
    // het.setTitle('睡眠环境指数');

});






















