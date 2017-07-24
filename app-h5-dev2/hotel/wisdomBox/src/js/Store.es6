'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';

const deviceId = Funs.getUrlParam('deviceId');
const path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
    '/clife-wechat/wechat/hotel'; // 正式环境

const AppData = {
    Citydata:2
}


export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){

        if(AppData.addLocation != undefined){
          data.addLocation = AppData.addLocation;
        }

        data.rendenrIf = 2;
        this.trigger(data);
  },


  //判断设备是否在线
  onCheckOnline(){
    console.log('123');
    let _this = this;
    let url = `${path}/device/checkOnline?deviceId=${deviceId}`;
    het.get(url,{},
      function(Succ){
        let ChangeSucc = JSON.parse(Succ);
        let Msg = ChangeSucc.msg;
         // console.log( '+++++++',ChangeSucc,ChangeSucc.msg);

         if(ChangeSucc.msg == '设备不在线'){
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


      },function(Fail){
        console.log(Fail);
      })

  },





 //获取卧室数据
 onGetbedroom(dev){
      let bed =this;
      let bedWords = this;
      let bedTime = [];    //存储 时间
      let bedLevel = []   //存储 等级
      let bedLevelWords = []  //存储 等级文字


      let SuccList = null;
      let url =  `${path}/wisdombox/dayDataPageList?deviceId=${deviceId}`;
      het.get(url,{},
      function(Succ)
      {           
        // console.log('个人全',Succ);  
        let bedJson = JSON.parse(Succ);
        SuccList = bedJson.data.dataList;
          
      //后台每天10:30进行统计的，10:30之前，昨天的数据应该还没有 （故10:30之前只显示昨天的昨天的 09-28 那只显示09-26的）
  
      var getTime = new Date();
      var getHours   = getTime.getHours();
      var getMinutes = getTime.getMinutes();
      var getSeconds = getTime.getSeconds();
      var nowTime = getHours + getMinutes + getSeconds; 

      //卧室环境--- Echats时间
      for(var i=0;i<SuccList.length;i++){
      var c =SuccList[i].dataTime;
      var d  =c.substr(5).replace(/\//g,'-');
      bedTime.push(d);  
     }

      // 卧室环境--等级         
      for(var i=0;i<SuccList.length;i++){
        var  l = SuccList[i].level;
        bedLevel.push(l);
     }

      //卧室等级--等级文字
      for(var i=0;i<SuccList.length;i++){
          var  w = SuccList[i].level;
          bedLevelWords.push(w);
        }
      // 数据反转
      bedTime = bedTime.reverse();  
      bedLevel = bedLevel.reverse();
      bedLevelWords = bedLevelWords.reverse();

      if(bedTime.length == 1){
          bedTime.push(null,null,null,null,null,null);
      }else if(bedTime.length == 2){
          bedTime.push(null,null,null,null,null);
      }else if(bedTime.length == 3){
          bedTime.push("","","","");
      }else if(bedTime.length == 4){
          bedTime.push("","","");
      }else if(bedTime.length == 5){
          bedTime.push(null ,null );
      }else if (bedTime.length == 6){
          bedTime.push(null);
      }else{
        bedTime= bedTime;
      }

      if(bedLevel.length == 1){
          bedLevel.push(null,null,null,null,null,null);
      }else if(bedLevel.length == 2){
          bedLevel.push(null,null,null,null,null);
      }else if(bedLevel.length == 3){
          bedLevel.push("","","","");
      }else if(bedLevel.length == 4){
          bedLevel.push("","","");
      }else if(bedLevel.length == 5){
          bedLevel.push(null,null);
      }else if(bedLevel.length == 6){
          bedLevel.push(null);
      }else{
          bedLevel = bedLevel;
      } 

  if(bedLevelWords.length==1){
        bedLevelWords.push(null,null,null,null,null,null)
      }else if(bedLevelWords.length == 2){
        bedLevelWords.push(null,null,null,null,null)
      }else if(bedLevelWords.length == 3){
        bedLevelWords.push("","","","")
      }else if(bedLevelWords.length == 4){
        bedLevelWords.push("","","")
      }else if(bedLevelWords.length == 5){
        bedLevelWords.push(null,null)
      }else if(bedLevelWords.length == 6){
        bedLevelWords.push(null)
      }else {
        bedLevelWords = bedLevelWords
      }

      for(var k=0;k<bedLevel.length;k++){
        if(bedLevel[k] == '优'){
          bedLevel[k] = 8;
        }else if(bedLevel[k] == '良'){
           bedLevel[k] = 6;
        }else if(bedLevel[k] == '中'){
           bedLevel[k] = 4;
        }else if(bedLevel[k] == '差'){
           bedLevel[k] = 2;
        }else if(bedLevel[k] == '糟'){
           bedLevel[k] = 0;
        }
      }
         bed.trigger({echatTime:bedTime,echatLevel:bedLevel,echatLevelWords:bedLevelWords}); 
          },
          function(fail){
           console.log('返回错误',fail);
         })
       
         return bedTime;
       
 },



    //请求接口，获取全国城市的列表
onLocations(){
    let thisCitys = this;
    let c = null;
  
    let  pathCh = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat' : // 测试环境
    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat' : // 预发布环境
    '/clife-wechat/wechat'; // 正式环境

    let url =  `${pathCh}/weather/getCityList`;
    het.get(url,'',
    function(dataPos){
      var a  =   JSON.parse(dataPos);
      c = a.data;
      thisCitys.trigger({citys: c});
    },function(data){
     console.log(data,'fail');
     // het.toast('数据请求错误---全国城市列表接口')
    });
},
      
    
      //定位
onPlace(index){
  let  _this = this;
  let  url =  `${path}/wisdombox/getLocation?deviceId=${deviceId}`;
  het.get(url,{},
    function(Succ){
      let obOK= JSON.parse(Succ);
      let obData = obOK.data.onlineLocation.city;
      //新增盒子地理位置--参数
      let dataCode =  obOK.data.onlineLocation.cityCode;
      let urladd =  `${path}/wisdombox/addLocation?deviceId=${deviceId}`;
        het.get(urladd+'&code='+dataCode,{},
          function(Succ){
            // console.log('定位--新增盒子地理位置成功',Succ);
        },function(Fail){
          // console.log("定位--新增盒子地理位置失败",Fail);
       })      

      _this.trigger({positionCity:obData});

  },function(Fail){
    console.log(Fail);
  })

},


      //获取设备运行数据
onGetOnlineData(index){
  let _this = this;
  let url =  `${path}/device/data/get?deviceId=${deviceId}`;
  het.get(url,{},
   function(sucData){
      var alterdata = sucData;
      var newalterdata = JSON.parse(alterdata);
      var dealine  = newalterdata.data.temperature;  
      var humidity = newalterdata.data.humidity;
      let renderIf2;
      if(index == 1){
        renderIf2 = 3;
      }else{
        renderIf2 = null;
      }
      _this.trigger({temperature:dealine,humidity:humidity,renderIf2:renderIf2});

      },function(failData){
         console.log('请求数据-错误参数等原因返回的数据',failData);
     }); 
},

//改变灯开关
onOnoffLight(index){
  console.log(index);
    var a = this.onGetTime();
    let light = this; 

    light.trigger({boxswitch:index,rendenrIf:2}); 
    // 控制设备--先判断设备开关当前状态，  当点击按钮时（开->关，关->开） 控制设备开关灯变化
    let data = {
        deviceId:deviceId,
        source:8,
        json:JSON.stringify({
          boxSwitch:index,
          updateFlag:Math.pow(2, 0),
          controlCode:"0"
        })
    }
     let url =  `${path}/device/config/set`;   //控制设备的接口
     let geturl     = `${path}/device/data/get?deviceId=${deviceId}`;  //获取设备运行状态

     //点击控制开关先判断设备是否连线,连线了则调接口控制开关。离线则alert（totat）弹出提示
     
    het.post(url,data,
      function(enSuccData){         
       let d= JSON.parse(enSuccData);
       if(d.msg==='设备不在线'){
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
        showMsg('设备不在线');  
      }
    },function(enFuaiData){
      console.log("调节开关-失败",enFuaiData)
  });         




},

 onGetTime(){
    var getTime = new Date();
    var nowYear = getTime.getFullYear();
    var nowMonth = getTime.getMonth()+1;
    var nowDate = getTime.getDate();
    if(nowMonth <10){
      nowMonth = '0'+nowMonth;
    }
    var nowTime =  nowYear + '-' + nowMonth + '-' + nowDate;
    return nowTime;
 },

      //获取 优 全国数据
onGetAllSleepData(){
    //修改标题
    var $body = $('body');
    document.title = '睡眠环境指数';
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load',function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);

  //调用全国数据需要参数
  var nowTime = this.onGetTime();
  let nationSleep = this;
  let nationDataList=[];          //存储全国卧室环境

  let bedTimeNation = [];         //存储 对比时间
  let bedLevelPersonal = []       //存储 个人等级


  let SuccList = null;
  //-dayDataPageList-获取最近统计数据--智慧盒子卧室环境
  let url2 =  `${path}/wisdombox/dayDataPageList?deviceId=${deviceId}`;
  het.get(url2,{},
      function(Succ)
      { 
       let bedJson = JSON.parse(Succ);
       SuccList = bedJson.data.dataList;
       //反转后不管是前还是后，再方法里都是反转后的
       SuccList.reverse();
      //判断如果是10:30之前，那就不显示昨天的。
      var getTime = new Date();
      var getHours   = getTime.getHours();
      var getMinutes = getTime.getMinutes();
      var getSeconds = getTime.getSeconds();
      var nowTime2 = getHours+'-' + getMinutes + '-'+ getSeconds; 
   
      if(getHours <=10 && getMinutes <=30 || getHours<=10 && getMinutes >=30) {
          for(var i=0;i<SuccList.length-1;i++){
            var c =SuccList[i].dataTime;
            var d = SuccList[i].level;
            bedTimeNation.push(c);
            bedLevelPersonal.push(d);  
          }
      }else {
         for(var i=0;i<SuccList.length;i++){
            var c =SuccList[i].dataTime;
            var d = SuccList[i].level;
            bedTimeNation.push(c);  
            bedLevelPersonal.push(d);      
           }  
      }

         //截取年份   
       for(var w=0;w<bedTimeNation.length;w++){
        bedTimeNation[w]=bedTimeNation[w].substr(5);
       }
 
      if(bedTimeNation.length == 1){
          bedTimeNation.push(null,null,null,null,null,null);
      }else if(bedTimeNation.length == 2){
          bedTimeNation.push(null,null,null,null,null);
      }else if(bedTimeNation.length == 3){
          bedTimeNation.push("","","","");
      }else if(bedTimeNation.length == 4){
          bedTimeNation.push("","","");
      }else if(bedTimeNation.length == 5){
          bedTimeNation.push(null ,null );
      }else if (bedTimeNation.length == 6){
          bedTimeNation.push(null);
      }else{
        bedTimeNation= bedTimeNation;
      }

      //存储 个人等级
      if(bedLevelPersonal.length == 1){
          bedLevelPersonal.push(null,null,null,null,null,null);
      }else if(bedLevelPersonal.length == 2){
          bedLevelPersonal.push(null,null,null,null,null);
      }else if(bedLevelPersonal.length == 3){
          bedLevelPersonal.push("","","","");
      }else if(bedLevelPersonal.length == 4){
          bedLevelPersonal.push("","","");bedLevelPersonal
      }else if(bedLevelPersonal.length == 5){
          bedLevelPersonal.push(null ,null );
      }else if (bedLevelPersonal.length == 6){
          bedLevelPersonal.push(null);
      }else{
        bedLevelPersonal= bedLevelPersonal;
      }
      //存储 个人等级---转化
      for(var k=0;k<bedLevelPersonal.length;k++){
        if(bedLevelPersonal[k] == '优'){
          bedLevelPersonal[k] = 8;
        }else if(bedLevelPersonal[k] == '良'){
           bedLevelPersonal[k] = 6;
        }else if(bedLevelPersonal[k] == '中'){
           bedLevelPersonal[k] = 4;
        }else if(bedLevelPersonal[k] == '差'){
           bedLevelPersonal[k] = 2;
        }else if(bedLevelPersonal[k] == '糟'){
           bedLevelPersonal[k] = 0;
        }
      }
//这个是全国-个人优的等级（数据）要不同于首页的。因为睡眠环境指数-全国的10:30才更新昨天的。故10:30之前要显示少一天  
      //dayListCountryData-智慧盒子获取指定日期的全国统计记录列表
    let url =  `${path}/wisdombox/dayListCountryData?dataTime=`;
       het.get(url+nowTime,{},
       function(Succ){
        let nationList= JSON.parse(Succ);

        console.log(nationList);

        let getNationData = nationList.data;
        //全国卧室环境---nationDataList-所有的我是环境的等级 Echats level  等级
        //获取的全国环境记录-日期按照新到老
        getNationData.reverse();
        // console.log("反", getNationData);
        let dd =[];
        for(var i=0;i<getNationData.length;i++){
            nationDataList.push(getNationData[i].level);
            dd.push(getNationData[i].dataTime);
        }
        //还有问题是 全国的时间与个人的时间有可能不一致。所以还要做处理
        //获取最近的7天的全国环境指数
        //
          let  aa = [];
          let  bb = [];
          //获取全国日期时间
          
          for(var i=0;i<getNationData.length;i++){
              getNationData[i].dataTime=getNationData[i].dataTime.substr(5)
               aa.push(getNationData[i].dataTime);       
           }


          //通过两次循环 获取了全国与个人相同时间的睡眠数据
          for(var j=0;j<aa.length;j++){
            for(var k=0;k<bedTimeNation.length;k++){
              if(aa[j] == bedTimeNation[k]){
              bb.push(aa[j]);
               }
             }
          }
          // console.log('//通过两次循环 获取了全国与个人相同时间的睡眠数据',bb);
          //然后通过这个数据从全国那里取对应天数的等级
          var real = [];
         //getNationData  全国的数据
         //bb             对比后的天数  

        getNationData.map((data,index)=>{
           bb.map((geta,getb)=>{ 
              if(data.dataTime == geta){
                  real.push(data);
              }        
           })
        })

        // console.log('取真正获取对应到的全国数据',real);

        // real.reverse();
        // console.log('取真正获取对应到的全国数据',real);
        //取真正获取对应到的全国数据的等级
        let getLevel = [];
        for(var i=0;i<real.length;i++){
            getLevel.push(real[i].level);
        }
    
       for(var k=0;k<getLevel.length;k++){
          if(getLevel[k] == '优'){
            getLevel[k] = 8;
          }else if(getLevel[k] == '良'){
             getLevel[k] = 6;
          }else if(getLevel[k] == '中'){
             getLevel[k] = 4;
          }else if(getLevel[k] == '差'){
             getLevel[k] = 2;
          }else if(getLevel[k] == '糟'){
             getLevel[k] = 0;
          }
      }
 
        if(getLevel.length == 1){
            getLevel.push(null,null,null,null,null,null);
        }else if(getLevel.length == 2){
            getLevel.push(null,null,null,null,null);
        }else if(getLevel.length == 3){
            getLevel.push("","","","");
        }else if(getLevel.length == 4){
            getLevel.push("","","");
        }else if(getLevel.length == 5){
            getLevel.push(null ,null );
        }else if (getLevel.length == 6){
            getLevel.push(null);
        }else{
          getLevel= getLevel;
        }

          // console.log('取真正获取对应到的全国数据的等级',getLevel);
          // console.log("trigger出去",getLevel,bedTimeNation,bedLevelPersonal);
           //个人的睡眠时间和等级-bedTimeNation--bedLevelPersonal
            nationSleep.trigger({nationLevel:getLevel,bedTimeNation:bedTimeNation,bedLevelPersonal:bedLevelPersonal});

         },function(Fail){
            console.log("获取盒子卧室环境失败失败",Fail);
      });


   },function(Fail){
      console.log(Fail);
 });

     
},

      //当选择其他城市时
   onOtherCity(selectCity,dataCode){ 
      let _this =this;
      let url =  `${path}/wisdombox/addLocation?deviceId=${deviceId}`;
      het.get(url+'&code='+dataCode,{},
        function(Succ){
          // console.log('选择其他城市时成功',Succ);
       },function(Fail){
          // console.log("选择其他城市时失败",Fail);
      })
 },

      //个人历史数据
   onHistoryData(dev) {
        //修改标题
        var $body = $('body');
        document.title = '所有已记录的数据';
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);

       var nowTime = this.onGetTime();
       let personal =this;
       let bedWords = this;
       let PersonalBedTime = [];    //存储 时间
       let PersonalLevel = []       //存储 等级


       let url =  `${path}/wisdombox/dayDataPageList?deviceId=${deviceId}`;
       het.get( url+'&dataTime='+nowTime+'&pageIndex=1&pageRows=31',{},
        function(Succ)
        { 
         let bedTime = [];
         let bedJson = JSON.parse(Succ);
         let SuccList = bedJson.data.dataList;
         SuccList[1].sty = 1;
         let sty = [];
         for(var i=0;i<SuccList.length;i++){
            sty.push(SuccList[i].level);
         }
         //样式-点
        for(var j=0;j<sty.length;j++){
          if(sty[j] == '优'){
            sty[j]  = 'dataInfo-y';
          }else if(sty[j] == '良'){
            sty[j]  = 'dataInfo-L';
          }else if(sty[j] == '中'){
            sty[j]  = 'dataInfo-z';
          }else if(sty[j] == '差'){
            sty[j]  = 'dataInfo-c';
          }else {
            sty[j]  = 'dataInfo-za';
          }
        }

        for(var k=0;k<SuccList.length;k++){
          SuccList[k].sty = sty[k];
        }

      personal.trigger({PersonalBedList:SuccList});
    },
      function(fail){
       console.log('返回错误',fail);
     })
  },

    
    // 获取某个智慧盒子卧室环境点击的时间
    onGetDetailbed(indexing){
      // document.title = '详细信息';

         //修改标题
        var $body = $('body');
        document.title = '详细信息';
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);

      let detail = this;
      let getLevel = null;
      let url =  `${path}/wisdombox/dayDataDetail?deviceId=${deviceId}`;

      het.get( url+' &dataTime='+indexing,{},
        function(Succ){
          let detailChange = JSON.parse(Succ);
          let detailData = detailChange.data;
          let detailDataTime =  detailData.dataTime
          detailData.ChangedataTime = detailDataTime.substr(5)
          detail.trigger({detailData:detailData});
        },function(Fail){
          console.log('个人详细睡眠记录--请求错误',Fail);
      })
      return getLevel;
  },


//个人首页-优-
onGetScoreLevel(){

    let me = this;
    let LevelColor=null;
    //盒子首页环境评分
    let url =  `${path}/wisdombox/getScoreLevel?deviceId=${deviceId}`;
    het.get(url,{},
      function(Succ){
         let detailChange = JSON.parse(Succ);
         let getScoreLevel = detailChange.data.level;
        
         switch(getScoreLevel){
            case '优':
              LevelColor = 'LevelColor-y';
              break;
            case '良':
              LevelColor = 'LevelColor-L';
              break; 
            case '中':
              LevelColor = 'LevelColor-z';
              break; 
            case '差':
              LevelColor = 'LevelColor-c';
              break; 
            case '糟':
              LevelColor = 'LevelColor-za';
              break;                       
            default:
               console.log('盒子首页环境评分错误');                 
         }
         me.trigger({getScoreLevel:getScoreLevel,LevelColor:LevelColor});
    },
    function(Fail){
        console.log('盒子首页环境评分---------->失败',Fail);
    })
},


//首页--获取位置信息
  onNewCity(){
    let _this = this;
    let url =  `${path}/wisdombox/getLocation?deviceId=${deviceId}`;
      het.get(url,{},
          function(Succ){
            let obOK= JSON.parse(Succ);
            let obData = obOK.data.onlineLocation.city;
            let setLocation = obOK.data.setLocation.city;
            _this.trigger({setLocation:setLocation});
        },function(Fail){
          console.log(Fail);
      })
  }






});


