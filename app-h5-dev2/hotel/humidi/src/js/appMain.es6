import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TipView,TipState} from './TipView.es6';
import {ModeState, AromaSegView} from './AromaSegView.es6';
import {ColorSelectView} from './ColorSelectView.es6';
import {ColorRingView}  from './ColorRingView.es6';
import {Slider} from './Slider.es6';
import {AromaMistAndTimeView} from './AromaMistAndTimeView.es6';
import {TimeShowView} from './TimeShowView.es6';
import {CloseView} from './CloseView.es6';
import {PlanSettingMain} from './PlanSettingMain.es6';
import Path from './ApiPath.es6';


require("../../../common/static/jquery+Addition.js");

var {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(()=>{
    // 轮询获取运行数据
    Actions.getRunData();
    setInterval(()=>{
        Actions.getRunData();
    },5000)
})

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSelectingColor: false,
            isShow: false
        }

        this._color = '';

        this.mistArr = ["关闭","大雾","小雾","睡眠"];

        // 获取默认数据
        $.extend(this.state, Store.getData());
    }

    componentDidMount(){
        het.setTitle('香薰机');

        this.initCanvas();

        this.removeListen = Store.listen(this.setState.bind(this));
        
        //初始化关机的view
        //很麻烦，第一次加载视图的时候，并没有渲染closeView,
        //在显示关机界面时才渲染，但是closeView上的信息传递又要放到render函数中，
        this.closeViewHeight = window.screen.height - $(".upView").height() + 'px';
    }


    componentWillUnmount(){
        this.removeListen();
    }

    render() {
        
        var {isSelectingColor, isShow, orderState, currState} = this.state,
            {mode, color, brightness, mist, timeClose, timeRemain, switchState} = currState;
            
        if(!isSelectingColor) this._color = color; 

        // 香薰机颜色填充
        if(this.refs.aromaCanvas&&!this.state.isSelectingColor){
            this.ctx.fillStyle = this._color;
            this.ctx.fill();
        }

        var orderState2 = orderState ? $.extend({},orderState,{mist:this.mistArr[orderState.mist]}) : null;

        let colorDom ;
        if(mode===ModeState.ModeState3){
            
            colorDom = <section>
                <h2 style={{fontSize:'16px',padding:'15px',paddingBottom:'0px',color:'#9693b2'}}>颜色</h2>
                <ColorSelectView currentColor={this._color} changeColorHandle={this.changeColorHandle.bind(this)}/>
                <Slider min="0" max="100" changeValue={this.changValueHandle.bind(this)} value={brightness}
                    showText={Boolean(true)}></Slider>
            </section>;
        }

        return <div>
            <section className="upView">
                <TipView tipState={this.state.tipState} disMiss={this.disMiss.bind(this)}/>
                <div className="aromaContent">
                    <canvas ref="aromaCanvas"  className="aromaCanvas" width="250px" height="250px"></canvas>
                    <div className="opacityAroma"></div>
                </div>
                <a className="switch" onTouchEnd={this.switchHandle.bind(this)}></a>
            </section>
            <section className="downView">
                <AromaSegView modeState={mode} changeMode={this.changeModeHandle.bind(this)} />
                {colorDom}
                <section>
                    <AromaMistAndTimeView mist={mist} time={timeRemain}
                        changeMist={this.changeMistHandle.bind(this)}
                        changCloseTime={this.changeCloseTimeHandle.bind(this)} ></AromaMistAndTimeView>
                </section>
                <Link to="/PlanSettingMain">
                    <TimeShowView planInfo={orderState2}></TimeShowView>
                </Link>

            </section>

            <ColorRingView isShow={isShow} disMissRingView={this.disMissRingView.bind(this)} colorBar={this._color} selectColor={this.selectColorHandle.bind(this)} submitColor={this.submitColorHandle.bind(this)}/>

            <ReactCSSTransitionGroup
                        transitionName="closeView"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {switchState&&(
                            <section key="closeViewKey" className="closeViewContainer" style={{position:'fixed','width':'100%',height:`${this.closeViewHeight}`,left:'0px',bottom:'0px'}}>
                            <Link to="/PlanSettingMain" style={{display:'inline-block',height:'100%', width:'100%'}}>
                                <CloseView planInfo={orderState2}></CloseView>
                            </Link>
                        </section>
                    )}
                    </ReactCSSTransitionGroup>
        </div>;
    }

    // 初始化cancas轨迹
    initCanvas(){
        let factor = 2,
            ctx = this.ctx = this.refs.aromaCanvas.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(236/factor,12/factor);
        ctx.lineTo(276/factor,35/factor);
        ctx.quadraticCurveTo(276/factor, 180/factor, 350/factor, 230/factor);
        ctx.quadraticCurveTo(385/factor, 260/factor, 390/factor, 310/factor);
        ctx.quadraticCurveTo(280/factor, 360/factor, 110/factor, 315/factor);
        ctx.quadraticCurveTo(110/factor, 255/factor, 169/factor, 180/factor);
        ctx.quadraticCurveTo(240/factor, 65/factor, 236/factor, 12/factor);
    }

    scrolldisableHandle(e){
        e.preventDefault();
        e.stopPropagation();
    }
    
    // 隐藏提示
    disMiss(){
        this.setState({tipState:TipState.TipStateClose});
    }

    // 改变模式
    changeModeHandle(index){
        if(index === 0 && this.state.modeState != ModeState.ModeState1){
            Actions.changeMode(ModeState.ModeState1);
        }else if(this.state.modeState != ModeState.ModeState3){
            Actions.changeMode(ModeState.ModeState3);
        }
    }

    // 通过颜色方块选择颜色
    changeColorHandle(color){
        if(color === 'tapRingEvent'){
            this.setState({isSelectingColor:true, isShow:!this.state.isShow})
        }else{
            Actions.changeColor(color);
        }
    }

    // 只是改变，并没有发送给设备
    selectColorHandle(color){
        this.setState({color:color});
    }

    // 将颜色值发送给设备
    submitColorHandle(color){
        this.setState({isSelectingColor:false})
        Actions.changeColor(color);
    }

    changValueHandle(value){
        Actions.changeBrightness(value);
    }

    // 雾化
    changeMistHandle(value){
        Actions.changeMist(value);
    }

    // 开启关闭
    switchHandle(e){
        var {switchState} =  this.state.currState;
        Actions.changeSwitch(!switchState);

        if(switchState){
            document.removeEventListener("touchmove",this.scrolldisableHandle);
            $(".upView > .switch").css("background-image","url(../static/img/switch-off.png)");
        }else{
            // zepto貌似不支持animate的scrollTop动画，自己简单实现下
            ;(function(time, delay){
                delay = delay || 30;

                var timer,
                    curTop = $("body").scrollTop(),
                    num = parseInt(curTop/time) || 1;

                timer = setInterval(()=>{
                    curTop-=num*delay;
                    curTop<=0 && clearInterval(timer);
                    
                    $("body").scrollTop(curTop);
                },delay)
            }(500));

            //并且禁止页面滑动
            document.addEventListener("touchmove",this.scrolldisableHandle);
            $(".upView > .switch").css("background-image","url(../static/img/switch-on.png)");
        }
    }

    //改变定时关闭时间
    changeCloseTimeHandle(mins){
        this.userSetTime = true;
        clearTimeout(window.timer);
        window.timer = setTimeout(()=>{
            this.userSetTime = false;
        },60000);
        Actions.changeCloseTime(mins);
    }

    disMissRingView(){
        this.setState({isSelectingColor: false, isShow:!this.state.isShow});
    }
}

// 开始渲染
het.domReady(()=>{
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path='/PlanSettingMain' component={PlanSettingMain} />
        </Router>
    ), document.getElementById('ROOT'));
});










/* 本地环境在浏览器下运行 */
/*(function(){
    function setCookie(c_name,value,expiredays,path) {
        var exdate=new Date();
        exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
        document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
    };
    var getCookie = function(name) {
       var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
       if (arr = document.cookie.match(reg)) {
           return unescape(arr[2]);
       } else {
           return null;
       }
   };

    function getQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    };

    var routerFirst =  Path.wPath;
    var _this=this;

     //微信授权
     var hasCookie = function(name) {
        var wechatId = getCookie(name);
        if (wechatId == "" || wechatId == null || wechatId == undefined) {
            //console.log('-------------请求id--')
            //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
            var url =  routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
            //console.log(url)
            window.location.href = url;
        }else{
            //console.log('设置WeChatUserId成功');
            $.ajax({
                url: Path.wPath+'/wechat/hotel/getToken',
                dataType: 'json',
                cache:true,
                async:false,
                success: function(r){
                    if(r.code==0){
                            var access = r.data;
                            setCookie('accessToken',access,0.5,'/');
                        } 
                    }
            });
        }
    };
    setCookie('wechatUserId',10328,0.5,'/');
    hasCookie('wechatUserId');
}());*/
        