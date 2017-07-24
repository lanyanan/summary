'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

const AppData = {
    Citydata:2
}

        //获取授权wechatId
// let getCookie = function(name){

//                 var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                
//                 if(arr=document.cookie.match(reg)){
//                     return unescape(arr[2]);

//                 }else{
//                     // console.log("!!!!!!!!!!!!!!!!!!!",arr);
//                     return null;
//                 }
// };


export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        this.trigger(data);
    },




    //获取城市列表
    onRepaint(){

      // console.log("通过onGetOnlineData方法点击过来的");
      // console.log("123");
      //   let me = this;
      //   let c = null;
      //   console.log('123');
      //   het.get('https://api.clife.cn/v1/web/env/weather/city/getCityList','',
      //    function(dataPos){
      //        /*console.log(dataPos,'su----------------------------c');
      //        // datas =dataPos;*/
      //        console.log(dataPos);
      //        var a  =    JSON.parse(dataPos);
      //        console.log("aaaaaa",a);
      //        c = a.data;

      //   console.log('========222222222222',c);
      //          me.trigger({citys: c});
      //   console.log('========',c);
      //    },function(data){
      //        console.log(data,'fail');
      //        het.toast('数据请求错误')
      //        });
      
    

    },



onGan(){
  console.log("通过onGetOnlineData方法点击过来的");
      console.log("123");
        let me = this;
        let c = null;
        console.log('123');
        het.get('http://weixin.clife.cn/clife-wechat-test/wechat/weather/getCityList','',
         function(dataPos){
             /*console.log(dataPos,'su----------------------------c');
             // datas =dataPos;*/
             console.log(dataPos);
             var a  =    JSON.parse(dataPos);
             console.log("aaaaaa",a);
             c = a.data;

        console.log('========222222222222',c);
               me.trigger({citys: c});
        console.log('========',c);
         },function(data){
             console.log(data,'fail');
             het.toast('数据请求错误')
             });





          var a={"name":"tom","sex":"男","age":"24"};
   
          var b='{"name":"Mike","sex":"女","age":"29"}';
           
          var aToStr=JSON.stringify(a);
           
          var bToObj=JSON.parse(b);
           
          // alert(typeof(aToStr));  //string
           
          // alert(typeof(bToObj));//object
          console.log(aToStr);
          console.log(bToObj);

      
      },


    //请求接口
     onGetOnlineData(){
             console.log("测试！！")

             let trig = this;
             let a = null;
             let dd=[];   //存储Echat时间
             let dl = [];   //存储Echat 等级

             het.get('../static/js/bed.json','',
             function(s){
              var ss = s;
              // console.log('--------------------------',ss);

              a = JSON.parse(ss);
              var b = a.data;
              // console.log(a.data);

              //Echats时间
              for(var i=0;i<b.length;i++){
                var c =b[i].dataTime;
                var d  =c.substr(5).replace(/-/g,'/')
                // console.log(c); 
                dd.push(d);
                // console.log(dd); 
              }

              //Echats 优良中一般差
              for(var i=0;i<b.length;i++){
                var  l = b[i].level;
                dl.push(l);
                // console.log("Echat的等级",dl);
              }

              // var a= "2016-09-06"; console.log(a.substr(5).replace(/-/g,'-'))

              trig.trigger({echatDD:dd,echatDL:dl});

            },function(f){
              console.log("b");
            
          });




              // var ac={"name":"tom","sex":"男","age":"24"};
 
              // var bc='{"name":"Mike","sex":"女","age":"29"}';
               
              // var aToStr=JSON.stringify(ac);
               
              // var bToObj=JSON.parse(bc);
              //  console.log(aToStr);
              //  console.log(bToObj);

              // alert(typeof(aToStr));  //string
               
              // alert(typeof(bToObj));//object

},

// 获取智慧盒子卧室环境点击的索引
    
          onGetbedroom(indexing){

            console.log("onGetbedroom--Store",indexing);

            let bed = this;

            bed.trigger({bedroom:indexing})


          },





              onNews() {
                      console.log("这是城市页面！onnews");
                           let gan = this;
                           let a = null;
                           let dd=[];   //存储Echat时间
                           let dl = [];   //存储Echat 等级

                        het.get('../static/js/bed.json','',
                           function(s){
                            var ss = s;
                            // console.log('--------------------------',ss);
                            a = JSON.parse(ss);        
                            var b = a.data;
                      
                            //Echats时间
                            for(var i=0;i<b.length;i++){
                              console.log(b[i])
                              console.log(b[i].dataTime.substr(5));
                              console.log(b[i].dataTime.substr(5).replace(/-/g,'/'))
                              // var d  =b[i].dataTime.substr(5).replace(/-/g,'/');
                                 var d = b[i].dataTime.substr(5)
                              console.log("cccccccccccccccccccccccccccccccccccccccccccccccccc",d);
                              b[i].dataTime = d;                           
                              // console.log("ddddddddddddddddddddddddddddddddddddddddd",b[i]); 
                            }
                            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",b);
             
                            gan.trigger({gan:b});

                          },function(f){
                            console.log("b");
                          
                        });
              },


      onPlace(){
        console.log("Place");

  


      let  psi = this;

                 var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='+Math.random(); 
            $.getJSON(url, function(data){ 
            // alert(data.Ip); 
            console.log(data.Ip);
            let dataIP = {
                           city:data.Ip
                         };
              // console.log('123')
              het.get('http://weixin.clife.cn/clife-wechat-test/wechat/location/get',dataIP,
                function(OK){
                    let obOK= JSON.parse(OK);
                    let obData = obOK.data.city;
                    console.log(obData);
                    psi.trigger({positionCity:obData});
                    // console.log(this.state);
                    // gan.trigger({gan:b});

              },function(KO){
                console.log(KO);
              })


            }); 


          

      
      }

    





  


 



    

});