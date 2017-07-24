'use strict';
/**
 *
 *梦境图
 */

import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';


var {Router, Route, hashHistory,Link} = ReactRouter;

    

    window.shareStatus = function(code){
        if(code == null){
            alert('缺少参数！');
        }
        //分享成功了就显示解梦提示
        if(code === 1){
            Actions.shareReturn(code);
        }else if(code === 2){
              Actions.returnError();
            // alert('shareStatus分享失败') //---关闭(返回)H5页面
        }  
    }


 // 创建React    这个是Location  页面的  组件
export class DreamMap extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store

         let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
         this.state = {
            headerTop:isAndroid?30:36,
            tipShow:false,      //中间大图片+倒计时提示
            shareBtn:true,      //分享按钮
            ScanCode:true,      //二维码 div
            show:false,         //show大圆- div
        };        
        this.returnImg = this.returnImg.bind(this);
    }


componentDidMount(){

//按钮隔1秒后出现--图片没加载出来分享
             // Actions.btn(); 
    //判断标题的长度来做蒙版对应的高度
    Actions.judgeTitleLength();

    //定时器---
   clearTimeout(this.intervalID); 
   this.intervalID = setTimeout(function(){
       var getTime = document.getElementById('times');

       clearInterval(this.sh);
            Actions.action();
           //显示定时器
           this.sh= setInterval(test,1000); 
           var num=10;
           function test(){
             getTime.innerHTML = num;
             num--;
             console.log(num);
             if(num == -1){
               clearInterval(this.sh);
                Actions.localTwo();
                history.back();
             }
          }        


    }.bind(this), 4000);  



}
  //卸载定时器
  componentWillUnmount(){
    // this.timer && clearTimeout(this.timer);
    console.log("Unmount----Unmount----Unmount",this.intervalID);
    //定时器最外层用this，这样子销毁的话就可以用this  销毁最外层的定时器了  每个每次定时器都有不同id
    clearTimeout(this.intervalID); 
     clearInterval(this.sh);
  }


  //分享按钮
  shareClick(){
        //点击分享时,清除定时器
        clearTimeout(this.intervalID); 
        clearInterval(this.sh);
      
        //获取标题个数的长度
        var getStateTitle = this.state.title;
      
        //点击时获取定时器秒数
       // Actions.setTimer(getTipsTime);
       Actions.shareClick(getStateTitle);

        //模拟App请求
        //Actions.moniResult(1,getTipsTime);
        // 模拟分享失败
        // Actions.returnError();
        //模拟APP分享成功
        // Actions.shareReturn();
      

        //次数限制
        if(localStorage.pagecount){
            localStorage.pagecount = Number(localStorage.pagecount) + 1;
        }else {
            localStorage.pagecount = 1;
        }
  }

  //暂停，----->重启定时器
componentDidUpdate(prevProps,prevState){  //完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
  // console.log("第二页Update----",prevState);
          
}

  //返回按钮
  returnImg(){

//clearInterval(this.re);

        // 一加载就判断次数
        console.log("干干干",this.state);
        //Actions.numbers();
        let returnAccessToken = this.state.AppData.accessToken?this.state.AppData.accessToken:'无';
        // console.log("草草草",returnAccessToken);
        Actions.numbers(returnAccessToken);
       // 返回调用蒙版
       Actions.localTwo();
       history.back();
       clearTimeout(this.intervalID); 
       clearInterval(this.sh);

  }



    render() {
      var getTime = new Date();
      var year = getTime.getFullYear();
      var month = getTime.getMonth()+1;
      var day = getTime.getDate();
      if(day<10){
        day = '0'+day;
      }
      var nowTime = year +'年'+ month+'月'+ day+'日';

      var address1 = this.state.fragment1Address; 
      var address2 = this.state.fragment2Address; 
      var address3 = this.state.fragment3Address; 
      var address4 = this.state.fragment4Address; 
      var photoAddress = this.state.photoAddress;

         console.log("第二页",this.state);     
        return (
          <div>
            <div className="Dream">
               <div className="headerTop"></div>

              <header className="headerDream">
                       <img className="returnImg"   src="../static/img/return.png"   onClick={this.returnImg} />      
                        <p>《{this.state.key}》</p>
          
          
              </header>
                    <p className="Dream-header-P"><span>{this.state.username}</span>在{nowTime}做的梦 </p>
              <section className="fragment">
                  <span className="fragment-s1"><p>解梦</p><p>碎片</p></span>
                  <ul>
                    <li className="fragment-Li" style={{'background-image': this.state.fragment1Address?`url(${this.state.fragment1Address})`:'url("../static/img/title1.png")'}}> </li>
                    <li className="fragment-Li" style={{'background-image': this.state.fragment2Address?`url(${this.state.fragment2Address})`:'url("../static/img/title2.png")'}}> </li>
                    <li className="fragment-Li" style={{'background-image': this.state.fragment3Address?`url(${this.state.fragment3Address})`:'url("../static/img/title3.png")'}}> </li>
                    <li className="fragment-Li" style={{'background-image': this.state.fragment4Address?`url(${this.state.fragment4Address})`:'url("../static/img/title4.png")'}}> </li>
                  </ul>
                  <span className="fragment-s1"><p>深度</p><p>剖析</p></span>
                 
              </section>
              <div className="DreamTips" id="aa"> <div className="DreamTips-s">“</div> <div id="DreamTipsMiddle"> &nbsp;&nbsp;{this.state.title} <span className="DreamTipRight">”</span> </div>  </div>
             
              <div className="show"  id="showMargin"  style={{display:this.state.show?'none':'block'}}>
                  <div className="DreamImg"      id="DreamImg" > 
                  
                                          
          
            
                 <img   id="DreamPicture"  src={this.state.photoAddress?this.state.photoAddress:'../static/img/circle.png'}   style={{opacity:this.state.tipShow?'.5':'1'}}    />
                  

                  </div> 
                  <div id="DreamShare"  className="DreamShare" onClick={this.shareClick.bind(this)} style={{display:this.state.shareBtn?'block':'none'}}>      </div>
                  <div className="CountDown"  id="CountDownId" style={{visibility:this.state.tipShow?'visible':'hidden'}}>
                      <div className="content"   >
                         <p>梦境稍纵即逝</p>
                         <p className="contentP1"> <i id="times"  style={{display:this.state.oldTime?'none':'inline-block'}}></i>  <i id="t2" style={{visibility:this.state.restart?'visible':'hidden'}}></i> 秒后</p>  
                         <p>潘多拉魔盒即将关闭</p>
                         <p><i>分享</i>邀请好友解梦！</p>
                         <p><i>分享</i> 可获得<i>解梦提示</i></p>
                      </div>
                  </div>
              </div>



              <div className="DreamLayer"   id="getDiv"  style={{display:this.state.show?'block':'none'}}>
                <div className="DreamOut">潘多拉魔盒:{this.state.photoTitle}</div>
                <div className="DreamContent">
                <p><i>{this.state.photoName}：</i><span>{this.state.photoInfor}</span>  </p>
                <p><i>{this.state.fragment1Name}：</i><span>{this.state.fragment1Infor}</span>  </p>
                <p><i>{this.state.fragment2Name}：</i><span>{this.state.fragment2Infor}</span>  </p>
                <p><i>{this.state.fragment3Name}：</i><span>{this.state.fragment3Infor}</span>  </p>
                <p><i>{this.state.fragment4Name}：</i><span>{this.state.fragment4Infor}</span>  </p>                  
                </div>

              </div>

            
              <div className="DreamInfo">
              <p className="DreamInfoP1" ><span> 梦境还原度:<i> {this.state.similarity}</i></span><span>配合<i>睡眠监测器</i>,</span><span>梦境还原<i>更准确!</i></span> </p>
              <div className="ScanCode"   style={{display:this.state.ScanCode?'none':'block'}}>
                <i></i>
                <div>
                  <i className="sleepicon"></i>
                  <p>扫码下载<b>C-life睡眠</b>，还原你的真实梦境，<b>有机会免费领取智能睡眠监测器</b>！</p>
                </div>
              </div>
              </div>

              <div className="ddd"><img src="../static/img/1.png" />  </div>
              <div id="DreamMapTips" >网络断开,访问失败</div>
            </div>
          </div>
        );
    }



}

// 开始渲染
het.domReady(()=>{
    // het.setTitle('所有已记录的数据');
    
});



