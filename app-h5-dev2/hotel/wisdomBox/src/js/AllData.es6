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

        Actions.historyData();

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
         // let gancao     = e.currentTarget.getAttribute('data-in');
           let dataTime     = e.currentTarget.getAttribute('data-time');
         // console.log('------++++++-----',dataTime);

         // var getDeviceId = getUrlParam('deviceId');

         Actions.getDetailbed(dataTime);

         // e.target()
            // var sw = 0;
            // var  flag = "0001";
            // var json = {"boxSwitch":sw,"updateFlag":flag,"controlCode":0};
            // var tjson = JSON.stringify(json);
            // console.log(tjson);
            // console.log( )
      }


      componentWillMount(){
  
        // document.title="所有已记录的数据";
      }


    render() {
        let   PersonalBedList = this.state.PersonalBedList?this.state.PersonalBedList:[];
        console.log(this.state.PersonalBedList);
        return (
            <div>
                <section className="AllData-sec">
                     <div className="dataInfo">
                        <ul>
                          {
                            PersonalBedList.map(function(i,k){
                             return (
                               
    <li  onClick={this.handleSingleClick}  data-time={i.dataTime}    key={'mykey'+k}   > <Link to="/enterinfo">  <i className={i.sty}>  </i><p><span>{i.level}</span> <span className="dataInfoTime">{( i.dataTime?i.dataTime.substr(5):'' )} <b>&gt;</b> </span></p> </Link></li>
                               )                                                 
                              }.bind(this)) 
                           }
                        
                        </ul>
                     </div>
                </section>

            </div>
        );
    }



}

// // 开始渲染
het.domReady(()=>{
    // het.setTitle('所有已记录的数据');
    
});



