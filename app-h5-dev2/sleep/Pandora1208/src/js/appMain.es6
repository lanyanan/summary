// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

import {DreamMap} from './DreamMap.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;
    
    //获取Token
    window.setAccessToken=function(tok){
            alert(tok);
            // het.toast(tok);
            Actions.token(tok);
            //App 调用token时 就判断是否是第一次登陆
            Actions.meng(tok); 
            // Actions.numbers(tok);  
        }
setAccessToken('eec0483ccf934a3a9443063f3cd5d2f1');

    // function share(){
    //     window.webkit.messageHandlers.share.postMessage('想要传的信息');
    // }
    // function back(){
    //     console.log('back------log');
    //     window.webkit.messageHandlers.back.postMessage();
    // }


het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});



// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.listenStore(Store); // 监听Store
        Actions.test();
        
        this.state = {
            headerTop:isAndroid?30:36,
            DreamEnergy:false,                               //能量次数
            closeLayer:true,                                //蒙版
            // keyWordValue:'大海山太阳阳光白杨树...',     //关键字
            // keyNameValue:'小马驹',                      //姓名  
            
        }

           this.selectEmotion = this.selectEmotion.bind(this);
           this.returnImg = this.returnImg.bind(this);
           this.clearKey  = this.clearKey.bind(this);
           this.clearName = this.clearName.bind(this);  
           this.judgwNull = this.judgwNull.bind(this); 
           this.numbers = this.numbers.bind(this); 
    }



    componentWillMount(){
      Actions.test();
      console.log("Will-Mount",this.state);
         
    }

    componentDidMount(){


     //能量次数
     // Actions.DreamEnergy();
     // Actions.shareReturn();  
     // Actions.closeLayer();
     // Actions.token();  


        //一加载就判断次数
        console.log("did",this.state);
        // Actions.numbers();

    }


    //点击时--关键字为空
    clearKey(event){
      // this.setState({keyWordValue:' '});
    }
    //点击时--姓名为空
    clearName(){
      // this.setState({keyNameValue:' '});
    }

    //输入关键字时
    keyWord(event){
        var param=event.target.value;
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if(param.match(regRule)) {
            param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            // alert("不支持表情");
            this.setState({keyWordValue:''});

            var expression = document.getElementById('expression');
            expression.style.display="block";
               var dd= setTimeout(function(){
                    expression.style.display="none";
               },2000);
        }

        this.setState({keyWordValue: event.target.value.substr(0,10)});

    }

    //输入姓名时
    keyName(event){
        var param=event.target.value;
        var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
        if(param.match(regRule)) {
            param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "-");
            // console.log("----",param);
            // alert("不支持表情");
            this.setState({keyNameValue:''});

            var expression = document.getElementById('expression');
            expression.style.display="block";
               var dd= setTimeout(function(){
                    expression.style.display="none";
               },2000);
        }

       this.setState({keyNameValue:event.target.value.substr(0,6)});



    }

    //蒙版
    closeLayer(){
        Actions.closeLayer();
    }

    //返回按钮
    returnImg(){
       clife.back();
    }
    //次数提示
    numbers(){
            clearTimeout(dd); 
     var numbersTip = document.getElementById('numbersTip');
        numbersTip.style.display="block";
           var dd= setTimeout(function(){
                numbersTip.style.display="none";
           },2000);


    }

    //信息为空时--提示
    judgwNull(){
          var toastId = document.getElementById('toastId');
            toastId.style.display="block";
               var dd= setTimeout(function(){
                    toastId.style.display="none";
               },2000);

    }


    //点击潘多拉魔盒
    openBox(){
        console.log("点击潘多拉魔盒",this.state);

        //埋点
        try{
            if(window.clife && window.clife.eventTypeAndContent){
                window.clife.eventTypeAndContent(1,"enterPandora");
            } 
        }catch(err){
            console.log(err);
        }
        
        var gainEmotionValue = this.state.emotionIndex?this.state.emotionIndex:null;
        var gainStyle =this.state.styleIndex?this.state.styleIndex:null;
        var gainkeyWordValue = this.state.keyWordValue?this.state.keyWordValue:null;
        var gainkeyNameValue = this.state.keyNameValue?this.state.keyNameValue:null;  
        var token = this.state.token?this.state.token:'无';
        var token2 = this.state.accessToken?this.state.accessToken:this.state.AppData.accessToken;
        // console.log('gainkeyWordValue----------------------',gainkeyWordValue,gainkeyNameValue);
        // 判断首页-选择不能为空
        if(gainEmotionValue==null || gainStyle==null || gainkeyWordValue==null || gainkeyNameValue==null){
            var toastId = document.getElementById('toastId');
            toastId.style.display="block";
               var dd= setTimeout(function(){
                    toastId.style.display="none";
               },2000);
        }else{
              Actions.openBox(gainEmotionValue,gainStyle,gainkeyWordValue,gainkeyNameValue,token,token2);
        }
    }
    //选择情绪
    selectEmotion(e){
//         window.addEventListener('load', function() {
//         var expression = document.getElementById("expression");
//         function updateOnlineStatus(event) {
//         var condition = navigator.onLine ? "online" : "offline";

//         if(condition == 'onLine'){
//             // expression
//         }
//     }
//     window.addEventListener('online',  updateOnlineStatus);
//     window.addEventListener('offline', updateOnlineStatus);
// }); 
        
       var getEmotion = e.currentTarget.getAttribute('data-value');
       // console.log("selectEmotion",getEmotion);
       Actions.selectEmotion(getEmotion);
    }

    //选择风格
    selectStyle(e){
        var getStyle = e.currentTarget.getAttribute('data-value');
        //console.log("getStyle",getStyle);
        Actions.selectStyle(getStyle);

        // var token2 = this.state.AppData.token?this.state.AppData.token:'无';
        // console.log("token----------------------------------",token2);
        // Actions.numbers(token2);
     
    }

    componentDidUpdate(preProps,preState){
        console.log("首页---componentDidUpdate",preState);
    }

    render() {
        let items =  [1,2,3,4];
        let content1 = ['愤怒','悲伤','恐惧','快乐'];
        let items2 = [5,6,7,8];
        let content2 = ['爱','惊讶','厌恶','羞耻'];
        let Dreamsty = [1,2,3];
        let DreamstyCon = ['梦幻','超能力','现实'];

        let selectemotionIndex = this.state.emotionIndex;
        let selectstyleIndex   = this.state.styleIndex;

        var gainEmotionValue = this.state.emotionIndex?this.state.emotionIndex:null;
        var gainStyle =this.state.styleIndex?this.state.styleIndex:null;
        var gainkeyWordValue = this.state.keyWordValue?this.state.keyWordValue:null;
        var gainkeyNameValue = this.state.keyNameValue?this.state.keyNameValue:null;  
    
        console.log('首页',this.state);

        return(
        <div className="main"  id="main">
            <img className="returnImg"   src="../static/img/return.png"   onClick={this.returnImg} />
            <header  style={{paddingTop:this.state.headerTop}}>
                <h2>还原你的梦境</h2>
                <p>神秘的潘多拉解梦魔盒</p>
            </header>

            <section　className="emotion">
                <p><img src="../static/img/emotion.png " /></p>
             
                <ul className="emotionU1">
                    {items.map((item,index)=>{
                        // console.log("item",item,selectemotionIndex,index);
                        return(
                           
                            <li key={index} className='flexUl' data-value={item} onTouchStart={this.selectEmotion.bind(this)}>
                                <button> <img src={selectemotionIndex-1==index?'./../static/img/picture'+item+item+'.png':'./../static/img/picture'+item+'.png'}    alt={"../static/img/picture"+item+item+".png" }/></button>
                            </li>
                        )
                    })}
                </ul>
                <div  className="emotionCon">
                        {content1.map((con,index)=>{
                            return (
                                <span key={index} >{con}</span>
                            )
                        })}
                </div>

                <ul className="emotionU2">
                    {items2.map((item,index)=>{
                        // console.log("item",item,selectemotionIndex,index);
                        return(
                            <li key={index} className='flexUl' data-value={item}   onTouchEnd={this.selectEmotion} >
                                <button> <img src={selectemotionIndex-5==index?'./../static/img/picture'+item+item+'.png':'./../static/img/picture'+item+'.png' }/></button>
                            </li>
                        )
                    })}
                </ul>
                <div  className="emotionCon">
                        {content2.map((con,index)=>{
                            return (
                                <span  key={index}>{con}</span>
                            )
                        })}
                </div>

            </section>
            <section className="MStyle">
                <p className="MStyle-p"><img src="../static/img/MStyle.png"  /> </p>
                <ul className="emotionU3" >
                    {Dreamsty.map((item,index)=>{
                        return(
                            <li key={index} className='flexUl' data-value={item} onTouchEnd={this.selectStyle.bind(this)}>
                                <button> <img src={selectstyleIndex-1==index?'./../static/img/dreamSty'+item+''+item+'.jpg':'./../static/img/dreamSty'+item+'.jpg' }/></button>
                            </li>
                        )
                    })}
                </ul>
                <div  className="emotionCon">
                        {DreamstyCon.map((con,index)=>{
                            return (
                                <span  key={index}>{con}</span>
                            )
                        })}
                </div>
            </section>

            <section className="Mkey">
                <label className="MkeyWord">
                    <span>梦境关键词</span>
                    <input type="text"  id="field2"   placeholder="如春暖花开"   value={this.state.keyWordValue}   onChange ={this.keyWord.bind(this)}  onClick={this.clearKey} />
                </label>
            </section>
            <section className="Yname">  
                    <label className="MName">
                      <span>你的姓名</span> 
                      <input type="text"    id="field3"  placeholder="如潘多拉"    value={this.state.keyNameValue}   onChange={this.keyName.bind(this)}  onClick={this.clearName}  id="nameValue" />
                    </label>
                    
            </section>

            <div className="clickBox"   >
                {


    (this.state.numbers3? (<div onClick={this.numbers}><span></span></div>):(<div onClick={this.openBox.bind(this)}><Link to="/dreammap"><span></span></Link></div>) )                                                                                                                          
               }
               
            </div>

            <div className="gan"  id="layerGan"  style={{visibility:this.state.meng?'hidden':(this.state.closeLayer?'visible':'hidden')}}   onClick={this.closeLayer}>
            </div>
             <div className="DreamEnergy" style={{visibility:this.state.DreamEnergy?'visible':'hidden'}}   >
                你的梦境能量已用完，请下次梦醒后再打开魔盒
             </div>
             <div className="toastTip" id="toastId">您的信息输入不完整</div>
             <div className="toastTip  numbersTip"  id="numbersTip"   >你的解梦能量已用完，请明天梦醒再试</div>
             <div className="expression" id="expression">不支持表情</div>
             <div className="dddddd"> <img src="../static/img/shi.jpg" /> </div>

         </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="dreammap" component={DreamMap} />
        </Router>
    ), document.getElementById('ROOT'));
});