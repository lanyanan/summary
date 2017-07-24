'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';


const AppData = {
    a:1,
    b:2,
    accessToken:null,
    numbers:null,
}


export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        //AppData = data;

        this.trigger(AppData);
    },

    //第一页一开始就调用,trigger出去AppData(过渡)
    onTest(data){
       console.log("Test方法");
       this.trigger(AppData);
    },


    //倒计时提示
    onAction(){
    	let  _this = this;
        setTimeout(function() {
            _this.trigger({tipShow:true});
        },1000);

    	   // _this.trigger({shareBtn:true});
    },




    //判断标题的长度来做蒙版对应的高度
    onJudgeTitleLength(){

    },

    //第二页返回第一页---去掉蒙版
    onLocalTwo(){
        AppData.closeLayer =false;
    },


    //解梦能量次数
    // onDreamEnergy(){
    // 	let _this = this;
    //     // alert("666666");
    // 	_this.trigger({DreamEnergy:false});

    // },

    //APP 返回分享成功
    onShareReturn(returnResult){
        console.log("APP分享结果---"+returnResult);
        let  _this = this;
        AppData.clearTime=true;
        AppData.token=returnResult;
        //如果分享成功，则显示详细信息 ++ 取消那个定时器自动返回上一页的
        _this.trigger({show:true,ScanCode:true,returnError:true,AppData});
    },

    //APP分享失败--载体
    onReturnError(){
        let _this = this;
         // alert("分享失败");

        //获取倒计时的时间
        var getTipsTime = document.getElementById('times').innerHTML;
        console.log("getTipsTime-----------",getTipsTime);
        var getTime  = document.getElementById('times');
        clearInterval(this.restartTime);
         this.restartTime=setInterval(function(){
             getTime.innerHTML = getTipsTime;
             getTipsTime--;
             console.log(getTipsTime);
             if(getTipsTime == -1){
               clearInterval(this.restartTime);
                Actions.localTwo();
                history.back();
                _this.trigger({AppData});
             }
     }.bind(this),1000);

        _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true});


    },

    onMoniResult(a,b){
        let _this = this;
        let oldTime; 
        if(a ===1){
            oldTime = true;
        }
        let countdown = b;
        console.log("countdown",countdown);
        _this.trigger({oldTime:oldTime,show:false,time2:countdown,restart:true});

 },


    //分享取消倒计时
    onShareClick(titleValue){
        

         //获取倒计时的时间
        var getTipsTime = document.getElementById('times').innerHTML;
        var getTime  = document.getElementById('times');
        

        let _this = this;     //tipShow:false----中间大图片+倒计时提示   ScanCode:true, ---//二维码 div
        let stopTime2=getTipsTime; 

        //当点击分享时，分享按钮消失 二维码出现
        _this.trigger({tipShow:false,shareBtn:false,ScanCode:false});

        setTimeout(function(){
            //调用app注入接口，将分享数据传给app-----既弹出分享框
            if(window.clife && window.clife.share){
                // alert("调用share成功！-window.clife");
                window.clife.share(JSON.stringify({
                    "title":'123456',
                }));

                let  _this = this;
                AppData.clearTime=true;
                //如果分享成功，则显示详细信息 ++ 取消那个定时器自动返回上一页的
                _this.trigger({show:true,ScanCode:true,returnError:true,AppData});
           

            } else {   
                 // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true});
                   // _this.trigger({tipShow:false,shareBtn:false,ScanCode:false});
                 // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true,stopTime:stopTime2});
                 // _this.trigger({returnError:true,tipShow:true,shareBtn:true,show:false,ScanCode:true});
                 // alert("app注入接口--share失败");

                 // clearInterval(this.restartTime);
                 // this.restartTime=setInterval(function(){
                 //   // console.log("123");
                 //         getTime.innerHTML = getTipsTime;
                 //         getTipsTime--;
                 //         console.log(getTipsTime);
                 //         if(getTipsTime == -1){
                 //           clearInterval(this.restartTime);
                 //            Actions.localTwo();
                 //            history.back();
                 //            _this.trigger({AppData});
                 //         }
                 // }.bind(this),1000);

            }

        },400);
  
    },

    //蒙版
    onCloseLayer(){
        let _this = this;
        console.log('蒙版');
        _this.trigger({closeLayer:false});
    },



    //获取到的Token
    onToken(t){
        console.log("onToken",t);
        let _this = this;
        let token = t;
        AppData.token = t;
        AppData.accessToken=t;
        _this.trigger({token:token,AppData});
    },
    onNumbers(token){

    var myDate=new Date();


    // 日期兼容ipod
    let last;
    var formatDate2 = function (Date) { 
    console.log("@@@@@@@@@",Date) 
    var y = Date.getFullYear();  
    var m = Date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = Date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    last =  y + '-' + m + '-' + d;  
    return last;  

};  

        var ff = formatDate2(myDate);
        let _this=this;
        var token = token;
        var timer  = new Date();
        var timestamp = timer.getTime();
        var dataTime = timer.toLocaleDateString();
        var dataTimeNew = dataTime.toString();
        dataTime = dataTime.replace(/\//g,'-');
        dataTimeNew = dataTimeNew.replace(/\//g,'-');
// let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken=28b6da1eba04425dbb60b43a55da2c4b&appId=10014&timestamp='+timestamp;
// let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken='+token+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';
// let url = 'http://test.api.clife.cn/v1/app/csleep/dream/getDreamDetail'+'?accessToken='+token+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';
        
       let getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail';//开发，本地，没有预发布环境 
       if(window.location.host=='test.api.clife.cn' || window.location.host=='test.cms.clife.cn') {getUrl='/v1/app/csleep/dream/getDreamDetail';}//测试
       if(window.location.host=='api.clife.cn' || window.location.host=='cms.clife.cn') {getUrl='/v1/app/csleep/dream/getDreamDetail';}//正式


         let url = getUrl+'?accessToken='+token+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputEmoji=8&inputStyle=1&inputKey=d&inputName=d';
         het.get(url,{},function(succ){
            alert('返回按钮--'+succ);
            alert('返回按钮--'+url);
            let ChangeSucc = JSON.parse(succ);
              if(ChangeSucc.msg=="失败"){
                console.log('失败失败失败失败失败');
                AppData.numbers= true;
                let numbers3 = true;
                  _this.trigger({AppData,numbers3:numbers3});
             }

         },function(fail){ 
            alert("返回按钮----"+fail);
            alert("返回按钮----"+url);
            console.log(" onNumbers---fail",fail);
        })

    },

 
    //提交数据--打开潘多拉魔盒
    onOpenBox(e,s,k,n,t,t2){
        // 情绪，风格，关键字，姓名
        var emotion = e;
        var Dstyle  = s;
        var keyword = k;
        var name    = n;
        var token   = t;
        var token2  = t2;

        var timer  = new Date();
        var timestamp = timer.getTime();
        var dataTime = timer.toLocaleDateString();
        let _this = this;
        console.log("this.is the openBox!----这个是传给后台的值：",dataTime,emotion,Dstyle,keyword,name,token,token2);
    // let url = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail?accessToken=b2cbee21308847b5afa1255f03420326&appId=10014&timestamp='+timestamp+'&dataTime='+dataTime;
         //trigger出来AppData 是因为接口返回错误的话，点击返回获取不到AppData.accessToken。故这边trigger   
        _this.trigger({AppData});


        //兼容ipod
        var myDate=new Date();
        let last;
        var formatDate2 = function (Date) { 
        console.log("@@@@@@@@@",Date) 
        var y = Date.getFullYear();  
        var m = Date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = Date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        last =  y + '-' + m + '-' + d;  
        // alert("lastTime"+last);
        return last;  

        };  

        var ff = formatDate2(myDate);

       let getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getDreamDetail';//开发，本地，没有预发布环境 
       if(window.location.host=='test.api.clife.cn' || window.location.host=='test.cms.clife.cn') {getUrl='/v1/app/csleep/dream/getDreamDetail';}//测试
       if(window.location.host=='api.clife.cn' || window.location.host=='cms.clife.cn') {getUrl='/v1/app/csleep/dream/getDreamDetail';}//正式

       let url = getUrl+'?accessToken='+token2+'&appId=10014&timestamp='+timestamp+'&dataTime='+last+'&inputName='+name+'&inputKey='+keyword+'&inputEmoji='+emotion+'&inputStyle='+Dstyle;
        het.get(url,{},(succ)=>{
                alert('访问--'+succ);
                alert('访问--'+url);

                let ChangeSucc = JSON.parse(succ);
                if(ChangeSucc.msg=="失败"){
                console.log('失败失败失败失败失败');
                AppData.numbers= true;
                let numbers3 = true;
                  _this.trigger({AppData,numbers3:numbers3});
             }

                let data = ChangeSucc.data;
                let username = data.username;
                let key1  = data.key;
                let key = key1.replace(/^\s*/g,'');

                let title = data.title;
          
                let fragment1Address = data.fragment1Address;
                let fragment1Infor = data.fragment1Infor;
                let fragment1Name =  data.fragment1Name;

                let fragment2Address = data.fragment2Address;
                let fragment2Infor = data.fragment2Infor;
                let fragment2Name = data.fragment2Name;

                let fragment3Address = data.fragment3Address;
                let fragment3Infor = data.fragment3Infor;
                let fragment3Name = data.fragment3Name;

                let fragment4Address = data.fragment4Address;
                let fragment4Infor = data.fragment4Infor;
                let fragment4Name = data.fragment4Name;

                let photoInfor = data.photoInfor;
                let photoTitle = data.photoTitle;
                let photoName  = data.photoName;
                let photoAddress = data.photoAddress;
                let similarity = data.similarity;

    

                //根据字体的长度，来居中
                if(title.length<20 || title.length==20){
                    let Middle = document.getElementById('DreamTipsMiddle');
                    Middle.style.textAlign = "center";
                }

          
                
                let DreamTipsMiddle = document.getElementById('DreamTipsMiddle');
                //为了设配Iphone5 +标题少的话居中-->分享按钮向上移动
                let DreamShare2 = document.getElementById('DreamShare');
                let showMargin = document.getElementById('showMargin');

                if(title.length <20){
                    DreamTipsMiddle.style.paddingTop = "20px";
                    DreamTipsMiddle.style.height="48px"; 
                    DreamShare2.style.paddingTop="0px"  
                }else if(title.length <30 || title.length>20){
                    DreamTipsMiddle.style.paddingTop = "10px";
                    DreamTipsMiddle.style.height="58px";  
                    DreamShare2.style.paddingTop="10px"
                }else if(title.length <40 || title.length >30){
                    DreamTipsMiddle.style.paddingTop = "5px";
                    DreamTipsMiddle.style.height="63px";
                    DreamShare2.style.paddingTop="15px";  
                }

                if(title.length>40){
                    showMargin.style.marginTop='10px';
                }

                var DreamShare = document.getElementById('DreamShare');
                var tuTop = DreamShare.offsetTop;
                var tuTop2 = DreamShare.clientHeight;


                _this.trigger({username:username,key:key,title:title,fragment1Address:fragment1Address,
                    fragment1Infor:fragment1Infor,fragment1Name:fragment1Name,fragment2Address:fragment2Address,
                    fragment2Infor:fragment2Infor,fragment2Name:fragment2Name,fragment3Address:fragment3Address,
                    fragment3Infor:fragment3Infor,fragment3Name:fragment3Name,fragment4Address:fragment4Address,               //这边trigger-AppData 是因为首页到时需要用到AppData.accessToken
                    fragment4Infor:fragment4Infor,fragment4Name:fragment4Name,photoInfor:photoInfor,photoTitle:photoTitle,photoName:photoName,similarity:similarity,photoAddress:photoAddress,kuang:true,AppData});                

        },(fail)=>{ 
            var DreamMapTips = document.getElementById('DreamMapTips');
            DreamMapTips.style.display="block";
            var dd= setTimeout(function(){
                DreamMapTips.style.display="none";
            },2000);
            alert("请求接口----"+fail);
            alert("请求接口----"+url);
            _this.trigger({dzj:'dzj'});
        })


    },
    onPanduan(){
        let _this = this;
        $(".panduan").each(function(){
            console.log($(this).text().length );
            var maxwidth = 6;
            if($(this).text().length > maxwidth){
                $(this).text($(this).text().substring(0,maxwidth));
                $(this).html($(this).html()+'...');
            }
        });
    },


//客户端新手介绍页面，只有第一次才显示
    onMeng(token){

        var timer  = new Date();
        var timestamp = timer.getTime();
        var token=token;
        let _this=this;


       let getUrl = 'http://200.200.200.50/v1/app/csleep/dream/getTimes';//开发，本地，没有预发布环境 
       if(window.location.host=='test.api.clife.cn' || window.location.host=='test.cms.clife.cn') {getUrl='/v1/app/csleep/dream/getTimes';}//测试
       if(window.location.host=='api.clife.cn' || window.location.host=='cms.clife.cn') {getUrl='/v1/app/csleep/dream/getTimes';}//正式


        let   url= getUrl+'?accessToken='+token+'&appId=10014&timestamp='+timestamp;
        het.get(url,{},function(ss){
          // alert('meng--'+ss);
          // toast('meng--'+url);
         let ChangeSucc = JSON.parse(ss);
          if(ChangeSucc.code==0){   //如果返回成功 0代表需要加新手指导
            console.log("是第一次登陆,need蒙版");
              _this.trigger({meng:false});
          }else{
            console.log("不是第一次登陆,不需要蒙版");
            _this.trigger({meng:true});
          }
        },function(ff){
          // console.log("ffffffffffffffff",ff);
          // het.toast('Meng--访问接口失败----'+ff);
          // het.toast('Meng--访问接口失败-----'+url);
      })

    },



    //点击情绪选项
    onSelectEmotion(getIndex){
        let _this = this;
        var getIndex = getIndex;

        _this.trigger({emotionIndex:getIndex});
    },
    //点击风格按钮
    onSelectStyle(getIndex){
        let _this= this;
        var getIndex = getIndex;
        _this.trigger({styleIndex:getIndex});
    },



    //定时器暂停时间
    onSetTimer(timeValue){
         console.log('定时器暂停时间-',timeValue);
        let _this = this;
        _this.trigger({timeValue:timeValue});
    },


    //解梦次数
    // onLocal(numbers){
    //     let _this = this;
    //     console.log('numbers-onLocal',numbers);
    //     let num =numbers;
    //     if(numbers==2 || numbers >2){
    //         // console.log("onLocal",numbers);
    //         // alert("11111111111-----"+numbers);
    //          _this.trigger({DreamEnergy:true});
    //     }
    // }




});