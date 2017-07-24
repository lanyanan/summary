'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
// import Path from './ApiPath.es6';



const deviceId = Funs.getUrlParam('deviceId');
const test=false;
const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境
// 数据过滤计时器
let dataFilterTimers = {
    control : 0,
    ctramL: 0,
};

// 返回过滤后的数据
function dataFilter(data) {
    // console.log("dataFilterTimers===========",dataFilterTimers);
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        // console.log("####",data);
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
                // console.log('$$$$$',result[k] );
            }
        } else {
            result[k] = data[k];
        }
    }
     // console.log('123',result);
    return result;
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    // console.log("dataFilterTimers",dataFilterTimers,keys);
    let time = (new Date).getTime() + 20e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}






export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        this.trigger(data);
    },

    //滑动组件拖动值
    onSlide(value){
    	let _this=this;
    	_this.trigger({slide:value,drag:true});
    },

   // 获取设备运行数据
    onGetdata(){
        console.log("get----方法");
        if(test){
            function setCookie(c_name,value,expiredays,path) {
            var exdate=new Date();
            exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
            document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
          };
          setCookie('wechatUserId',10277,0.5,'/');
          var _this=this;
         // weixin.clife.cn/clife-wechat-test/wechat/user/login?format=json&type=1&redirect=http://weixin.clife.cn/web-wechat/hotel/v1/wisdomBox/page/index.html#/
         //获取授权wechatId
           var getCookie = function(name) {
               var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
               if (arr = document.cookie.match(reg)) {
                   return unescape(arr[2]);
               } else {
                   return null;
               }
           };
         //微信授权
         var hasCookie = function(name) {
                var wechatId = getCookie(name);
                if (wechatId == "" || wechatId == null || wechatId == undefined) {
                    //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
                    // var url =  routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
                    //console.log(url)
                    window.location.href = url;
                }else{
                    // console.log('设置WeChatUserId成功');
                    let deviceId='7B58CF5661B4E4128D4E93803A144B07';
                    $.ajax({
                            url: `${path}`+ '/getToken',
                            dataType: 'json',
                            cache:true,
                            async:true,
                            success: function(r){
                                if(r.code==0){
                                    console.log('访问token-种token成功');
                                    var access = r.data;
                                    setCookie('accessToken',access,0.5,'/')
                                    // let url = `${path}/device/data/get?deviceId=`+deviceId;
                                    let url = '/clife-wechat-test/wechat/hotel/device/data/get?deviceId=7B58CF5661B4E4128D4E93803A144B07';
                                    //console.log("token成功下--url",url);
                                    // het.get(url, {}, (succ)=>{
                                    //     console.log("succ",succ);
                                    //     let succChange = JSON.parse(succ);
                                    //     let succData =   succChange.data;
                                    //     // $.extend(true,AppData,json.data);
                                    //     console.log( 'ifctram-状态是否可以调赋值1可调',succChange.msg); 
                                    //     console.log('succData----12434',succData);
                                    //     _this.trigger({succDate:succData});
                                    // });   


                                       let deviceId='7B58CF5661B4E4128D4E93803A144B07';
                                       let postUrl=`${path}/device/data/get?deviceId=`+deviceId;
                                       console.log("定时器，每隔六秒获取设备数据");
                                        
                                        //一进来就获取设备的运行状态，做一次相应的处理

                                        het.post(postUrl,{},(res)=>{     //--判断是否授权？--->判断设备是否在线？-->请求成功--是否需要重置？
                                                let resChange = JSON.parse(res);

                                                if (resChange.code == 103005001) { // 未授权，跳转授权页面
                                                    location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
                                                }

                                                if(resChange.msg=="设备不在线"){
                                                         //无按钮弹窗
                                                         function  showMsg(msg) {
                                                            var msgWrap = $("#msg-warning");
                                                            var msgBox = $('<div class="msg-content"></div>');
                                                            if (msgWrap.length===0) {
                                                                msgWrap = $('<div id="msg-warning"></div>');
                                                                $("body").append(msgWrap);
                                                             }
                                                            msgWrap.empty();
                                                            msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
                                                       
                                                          };  
                                                          showMsg('设备离线状态'); 
                                                }

                                                if(resChange.data){
                                                      if(ifctram==0){
                                                                //还是要根据 确定/取消.确定的话进行一次全关或全开操作
                                                                // het.toast('窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?');
                                                                let resetTip = confirm("窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?");
                                                                if(resetTip==true){
                                                                          let postUrl = `${path}`+'/device/config/set?';
                                                                          let data = {
                                                                              deviceId:"7B58CF5661B4E4128D4E93803A144B07",
                                                                              source:8,
                                                                              json:JSON.stringify({
                                                                                  control:2,              //1~3    控制
                                                                                  ctramL:70,              //0~100  控制幅度
                                                                                  updateFlag:"0001",        //0~100  功能变更
                                                                              })
                                                                          }
                                                                          het.post(postUrl,data,(res)=>{
                                                                              console.log("全关成功--",res);
                                                                                  _this.getClock = setInterval(function(){
                                                                                      _this.onGetdata();
                                                                                  },10000);
                                                                                  _this.trigger({ifctramLayer:false});

                                                                          },(fail)=>{
                                                                              console.log('全关失败--',fail);
                                                                                   let picLeft = document.getElementById('PicLeft');
                                                                                   picLeft.style.width="130px";
                                                                                   $('#PicLeft').addClass('PicAnimate');

                                                                                   let PicRight = document.getElementById('PicRight');
                                                                                   PicRight.style.width="130px";
                                                                                   $('#PicRight').addClass('PicAnimate');
                                                                          });
                                                                  }else{
                                                                          _this.trigger({ifctramLayer:true});
                                                                          clearInterval(_this.getClock);
                                                                  }


                                                            }else{
                                                                _this.trigger({ifctramLayer:false});
                                                                if(!_this.getClock){
                                                                    _this.getClock = setInterval(function(){
                                                                        _this.onGetdata();
                                                                    },6000);
                                                                }
                                                            }   
                                                       }

                                                },(fial)=>{
                                                     console.log("获取设备数据失败--",fail);
                                                });  //post 结束符

                                }
                              }
                        });
                    }//elese结束符
            };
            
            hasCookie('wechatUserId');
        }else{
                  let postUrl=`${path}/device/data/get?deviceId=`+deviceId;
                  het.post(postUrl,{},(res)=>{     //--判断是否授权？--->判断设备是否在线？-->请求成功--是否需要重置？
                  let resChange = JSON.parse(res);

                  if (resChange.code == 103005001) { // 未授权，跳转授权页面
                      location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
                  }

                  if(resChange.msg=="设备不在线"){
                           //无按钮弹窗
                           function  showMsg(msg) {
                              var msgWrap = $("#msg-warning");
                              var msgBox = $('<div class="msg-content"></div>');
                              if (msgWrap.length===0) {
                                  msgWrap = $('<div id="msg-warning"></div>');
                                  $("body").append(msgWrap);
                               }
                              msgWrap.empty();
                              msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
                         
                            };  
                            showMsg('设备离线状态'); 
                  }

                  if(resChange.data){
                        if(ifctram==0){
                                  //还是要根据 确定/取消.确定的话进行一次全关或全开操作
                                  // het.toast('窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?');
                                  let resetTip = confirm("窗帘重新加电后，需要进行重置(对窗帘进行全关)才能进行拖拉操作,确定重置?");
                                    if(resetTip==true){
                                              let postUrl = `${path}`+'/device/config/set?';
                                              let data = {
                                                  deviceId:"7B58CF5661B4E4128D4E93803A144B07",
                                                  source:8,
                                                  json:JSON.stringify({
                                                      control:2,              //1~3    控制
                                                      ctramL:70,              //0~100  控制幅度
                                                      updateFlag:"0001",        //0~100  功能变更
                                                  })
                                              }
                                              het.post(postUrl,data,(res)=>{
                                                  console.log("全关成功--",res);
                                                      _this.getClock = setInterval(function(){
                                                          _this.onGetdata();
                                                      },10000);
                                                      _this.trigger({ifctramLayer:false});

                                              },(fail)=>{
                                                  console.log('全关失败--',fail);
                                                       let picLeft = document.getElementById('PicLeft');
                                                       picLeft.style.width="130px";
                                                       $('#PicLeft').addClass('PicAnimate');

                                                       let PicRight = document.getElementById('PicRight');
                                                       PicRight.style.width="130px";
                                                       $('#PicRight').addClass('PicAnimate');
                                              });
                                      }else{
                                              _this.trigger({ifctramLayer:true});
                                              clearInterval(_this.getClock);
                                      }

                              }else{
                                  _this.trigger({ifctramLayer:false});
                                  if(!_this.getClock){
                                      _this.getClock = setInterval(function(){
                                          _this.onGetdata();
                                      },6000);
                                  }

                              }   

                         }

                  },(fail)=>{
                       console.log("获取设备数据失败--",fail);
                  });  //post 结束符
            
        }

 		



    },

    //全开
    onAllOpen(){

         //测试--------
     //     if(this.getClock) {clearInterval(this.getClock)};
     //     let _this = this;
     //     let deviceId='7B58CF5661B4E4128D4E93803A144B07';
     //     let postUrl = `${path}`+'/device/config/set?';
    	// 	 let data = {
    	// 	        deviceId:deviceId,
    	// 	        source:8,
    	// 	        json:JSON.stringify({
    	// 	          control:1,      		//1~3    控制
    	// 	          ctramL:70,       		//0~100  控制幅度
    	// 	          updateFlag:"0001",      	//0~100  功能变更
    	// 	        })
    	// 	    }
    	// het.post(postUrl,data,(res)=>{
     //        console.log("全开成功--",res);
     //        let picLeft = document.getElementById('PicLeft');
     //        picLeft.style.width="0px";

    	// },(fail)=>{
     //        console.log('全开失败--',fail);
     //             let picLeft = document.getElementById('PicLeft');
     //             picLeft.style.width="20px";
     //             $('#PicLeft').addClass('PicAnimate');

     //             let PicRight = document.getElementById('PicRight');
     //             PicRight.style.width="20px";
     //             $('#PicRight').addClass('PicAnimate');
    	// });

        //正式
         // setTimeout('control');
         if(this.getClock) {clearInterval(this.getClock)};
         let _this = this;
         let url=`${path}`+'/device/config/set?deviceId='+deviceId;
         let data = {
              source:8,
              json:JSON.stringify({
                control:1,            //1~3    控制
                 ctramL:70,            //0~100  控制幅度
                updateFlag:"0001",        //0~100  功能变更
               })
           }  
           het.post(url,data,(res)=>{
               console.log("全开成功--",res);
               let resChange = JSON.parse(res);
               
                if(resChange.msg !="设备不在线"){
                  let picLeft = document.getElementById('PicLeft');
                  picLeft.style.width="20px";

                  let PicRight = document.getElementById('PicRight');
                  PicRight.style.width="20px";
               }

                _this.getClock = setInterval(function(){
                    _this.onGetdata();
                },10000);
                _this.trigger({ifctramLayer:false});

                //滑轮滚动
                let glide = document.getElementById('glide');
                glide.style.left="92%";
         
           },(fail)=>{
                 console.log('全开失败--',fail);

                 let picLeft = document.getElementById('PicLeft');
                 picLeft.style.width="20px";
                 $('#PicLeft').addClass('PicAnimate');

                 let PicRight = document.getElementById('PicRight');
                 PicRight.style.width="20px";
                 $('#PicRight').addClass('PicAnimate');
           }); 


    },

    //全关
    onAllClose(){
        // if(this.getClock) {clearInterval(this.getClock)};
        // // setTimeout('control');
        // let _this = this;
        // clearInterval(_this.getClock);
        // let postUrl = `${path}`+'/device/config/set?';
        // let data = {
        //     deviceId:"7B58CF5661B4E4128D4E93803A144B07",
        //     source:8,
        //     json:JSON.stringify({
        //         control:2,              //1~3    控制
        //         ctramL:70,              //0~100  控制幅度
        //         updateFlag:"0001",        //0~100  功能变更
        //     })
        // }
        // het.post(postUrl,data,(res)=>{
        //     console.log("全关成功--",res);
        //         _this.getClock = setInterval(function(){
        //             _this.onGetdata();
        //         },10000);
        //         _this.trigger({ifctramLayer:false});

        // },(fail)=>{
        //     console.log('全关失败--',fail);
        //          let picLeft = document.getElementById('PicLeft');
        //          picLeft.style.width="130px";
        //          $('#PicLeft').addClass('PicAnimate');

        //          let PicRight = document.getElementById('PicRight');
        //          PicRight.style.width="130px";
        //          $('#PicRight').addClass('PicAnimate');
        // });


        //正式
         let _this = this;
         let url=`${path}`+'/device/config/set?deviceId='+deviceId;
           let data = {
               source:8,
               json:JSON.stringify({
                   control:2,              //1~3    控制
                   ctramL:70,              //0~100  控制幅度
                   updateFlag:"0001",        //0~100  功能变更
              })
           }
           het.post(url,data,(res)=>{
               console.log("全关成功--",res);
             let resChange = JSON.parse(res);

            if(resChange.msg !="设备不在线"){
                  let picLeft = document.getElementById('PicLeft');
                  picLeft.style.width="130px";

                  let PicRight = document.getElementById('PicRight');
                  PicRight.style.width="130px";
             }
             _this.getClock = setInterval(function(){
                 _this.onGetdata();
             },10000);
             _this.trigger({ifctramLayer:false});


                //滑轮滚动
                let glide = document.getElementById('glide');
                glide.style.left="0%";
        
           },(fail)=>{
               console.log('全关失败--',fail);

                 let picLeft = document.getElementById('PicLeft');
                 picLeft.style.width="130px";
                 $('#PicLeft').addClass('PicAnimate');

                 let PicRight = document.getElementById('PicRight');
                 PicRight.style.width="130px";
                 $('#PicRight').addClass('PicAnimate');
           });


    },


    //暂停
    onPauseOpenClose(){

        // setTimeout('control');
        //  let deviceId='7B58CF5661B4E4128D4E93803A144B07';
        //  let postUrl = `${path}`+'/device/config/set?';
        //  let data = {
        //     deviceId:deviceId,
        //     source:8,
        //     json:JSON.stringify({
        //         control:3,              //1~3    控制
        //         ctramL:70,              //0~100  控制幅度
        //         updateFlag:"0001",        //0~100  功能变更
        //     })
        // }
        // het.post(postUrl,data,(res)=>{
        //     console.log("暂停成功--",res);

        // },(fail)=>{
        //     console.log('暂停失败--',fail);
        //          let PicLeft = document.getElementById('PicLeft');
        //          let  getLeftWidth =  PicLeft.offsetWidth;
        //          console.log(getLeftWidth);
        //          PicLeft.style.width= getLeftWidth+'px'; 
        //          console.log(PicLeft.offsetWidth);

        //          let PicRight = document.getElementById('PicRight');
        //          let getRightWidth = PicRight.offsetWidth;
        //          PicRight.style.width = getRightWidth+'px';

                 

        // });


        //正式
         let _this = this;
         let url=`${path}`+'/device/config/set?deviceId='+deviceId;
           let data = {
               source:8,
               json:JSON.stringify({
                   control:3,              //1~3    控制
                   ctramL:70,              //0~100  控制幅度
                   updateFlag:"0001",        //0~100  功能变更
              })
           }
           het.post(url,data,(res)=>{
               console.log("暂停成功--",res);
               //窗帘变化
                 let PicLeft = document.getElementById('PicLeft');
                 let  getLeftWidth =  PicLeft.offsetWidth;
                 console.log(getLeftWidth);
                 PicLeft.style.width= getLeftWidth+'px'; 
                 console.log(PicLeft.offsetWidth);

                 let PicRight = document.getElementById('PicRight');
                 let getRightWidth = PicRight.offsetWidth;
                 PicRight.style.width = getRightWidth+'px';


                   _this.getClock = setInterval(function(){
                       _this.onGetdata();
                   },10000);
                   _this.trigger({ifctramLayer:false});
        
           },(fail)=>{
               console.log('暂停失败--',fail);

                 let PicLeft = document.getElementById('PicLeft');
                 let  getLeftWidth =  PicLeft.offsetWidth;
                 console.log(getLeftWidth);
                 PicLeft.style.width= getLeftWidth+'px'; 
                 console.log(PicLeft.offsetWidth);

                 let PicRight = document.getElementById('PicRight');
                 let getRightWidth = PicRight.offsetWidth;
                 PicRight.style.width = getRightWidth+'px';
           });
 
    },


    //发送滑动数据命令
    onSelectRange(value){
        // let _this=this;
        // let selectRange=value;
        // // console.log("selectRange---",value);
        // let deviceId='7B58CF5661B4E4128D4E93803A144B07';
        // let postUrl = `${path}`+'/device/config/set?';
        // // let url=`${path}`+'/device/config/set?deviceId='+deviceId;
        // //幅度显示--手指抬起即隐藏幅度值
        // _this.trigger({drag:false});
        // let data = {
        //     deviceId:deviceId,
        //     source:8,
        //     json:JSON.stringify({
        //         control:1,              //1~3    控制
        //         ctramL:selectRange,              //0~100  控制幅度
        //         updateFlag:"0002",        //0~100  功能变更
        //     })
        // }
        // het.post(postUrl,data,(res)=>{
        //     console.log("控制幅度成功--",res);
        //     setDataTimer(selectRange);
        //     console.log('-----',selectRange);

        //     let selectRange2 = (selectRange/2)+'%';
        //     console.log('----',selectRange2);
        //     _this.trigger({selectRange2:selectRange2});
        //     // let picLeft = document.getElementById('PicLeft');
        //     // picLeft.setAttribute('class','PicAnimate');
        //     $('#PicLeft').addClass('PicAnimate');


        // if(selectRange<10 || selectRange==10){
        //     $('.Pic-left').animate({width:"125px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"125px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<20 || selectRange==20){
        //     $('.Pic-left').animate({width:"112.5px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"112.5px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<30 || selectRange==30){
        //     $('.Pic-left').animate({width:"110px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"110px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<40 || selectRange==40){
        //     $('.Pic-left').animate({width:"97.5px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"97.5px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<50 || selectRange==50){
        //     $('.Pic-left').animate({width:"85px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"85px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<60 || selectRange==60){
        //     $('.Pic-left').animate({width:"62.5px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"62.5px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<70 || selectRange==70){
        //     $('.Pic-left').animate({width:"50px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"50px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<80 || selectRange==80){
        //     $('.Pic-left').animate({width:"37.5px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"37.5px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<90 || selectRange==90){
        //     $('.Pic-left').animate({width:"25px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"25px"},{duration:3000,easing:"linear"});
        // }else if(selectRange<100 || selectRange==100){
        //     $('.Pic-left').animate({width:"12.5px"},{duration:3000,easing:"linear"});
        //     $('.Pic-right').animate({width:"12.5px"},{duration:3000,easing:"linear"});
        // }


        // },(fail)=>{

        //     let selectRange2 = (selectRange/2)+'%';
        //     console.log('----',selectRange2);
        //     _this.trigger({selectRange2:selectRange2});
        //     // let picLeft = document.getElementById('PicLeft');
        //     // picLeft.setAttribute('class','PicAnimate');
        //     $('#PicLeft').addClass('PicAnimate');
        //     $('#PicRight').addClass('PicAnimate');

               // console.log('控制幅度失败--',fail);
               // if(selectRange<10 || selectRange==10){
               //         $('.Pic-left').animate({width:"125px"},{duration:3000,easing:"linear"});
               //        $('.Pic-right').animate({width:"125px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<20 || selectRange==20){
               //         $('.Pic-left').animate({width:"112.5px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"112.5px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<30 || selectRange==30){
               //         $('.Pic-left').animate({width:"110px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"110px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<40 || selectRange==40){
               //         $('.Pic-left').animate({width:"97.5px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"97.5px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<50 || selectRange==50){
               //         $('.Pic-left').animate({width:"85px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"85px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<60 || selectRange==60){
               //        $('.Pic-left').animate({width:"62.5px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"62.5px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<70 || selectRange==70){
               //         $('.Pic-left').animate({width:"50px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"50px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<80 || selectRange==80){
               //         $('.Pic-left').animate({width:"37.5px"},{duration:3000,easing:"linear"});
               //        $('.Pic-right').animate({width:"37.5px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<90 || selectRange==90){
               //         $('.Pic-left').animate({width:"25px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"25px"},{duration:3000,easing:"linear"});
               // }else if(selectRange<100 || selectRange==100){
               //         $('.Pic-left').animate({width:"12.5px"},{duration:3000,easing:"linear"});
               //         $('.Pic-right').animate({width:"12.5px"},{duration:3000,easing:"linear"});
               // }
        //    }
        // );


        //正式---------
        let _this=this;
        let selectRange=value;
        let url=`${path}`+'/device/config/set?deviceId='+deviceId;
        // 幅度显示--手指抬起即隐藏幅度值
        _this.trigger({drag:false});
        let data = {
           source:8,
           json:JSON.stringify({
               control:1,              //1~3    控制
               ctramL:selectRange,              //0~100  控制幅度
               updateFlag:"0002",        //0~100  功能变更
            })
        }
        het.post(url,data,(res)=>{
           console.log("控制幅度成功--",res);
           setDataTimer(selectRange);

           let selectRange2 = (selectRange/2)+'%';
           console.log('----',selectRange2);
           _this.trigger({selectRange2:selectRange2});

           $('#PicLeft').addClass('PicAnimate');
           $('#PicRight').addClass('PicAnimate');

          _this.getClock = setInterval(function(){
            console.log("滑动定时器");
             _this.onGetdata();
          }.bind(this),5000);

        },(fail)=>{
          console.log("fail--",fail);
           let selectRange2 = (selectRange/2)+'%';
           console.log('----',selectRange2);
        });

      





    },


// {"level":1,"mist":2,"updateFlag":1}
		onTest(){
			let _this = this;
			// let url=`${pathTwo}`+'/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629';
			//let url ='http://weixin.clife.cn/clife-wechat-test/wechat/hotel/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629';
            let url = `${path}/device/data/get?deviceId=8BF370021EE465774C82E06C877D1629`;
           het.get(url, {}, (succ)=>{
                    	console.log("succ-----------------------------",succ);
                        let succChange = JSON.parse(succ);
                        let succData = succChange.data;
                        // $.extend(true,AppData,json.data);
                        // console.log('succData----',succData);
                        _this.trigger({succDate:succData});
                    }); 
		}

});





