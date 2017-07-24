// import {Funs} from '../../../common/src/fun.es6';

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TipView,TipState} from './TipView.es6';
import Set from './SetingPage.es6';
import {ModeState, AromaSegView} from './AromaSegView.es6';
import {ColorSelectView} from './ColorSelectView.es6';
import {ColorRingView}  from './ColorRingView.es6';
import {YYScale} from './YYSlide.jsx';
import {Slider} from './Slider.es6';
import {MistState,AromaMistAndTimeView} from './AromaMistAndTimeView.es6';
import {TimeShowView} from './TimeShowView.es6';
import {PickerView1} from './PickerView1.es6';
import {CloseView} from './CloseView.es6';
import {PlanSettingMain} from './PlanSettingMain.es6';
/*import ReactCSSTransitionGroup from 'react-addons-css-transition-group';*/


require("../../../common/static/jquery+Addition.js");

window.onerror=function(msg,url,l){
    alert(msg+","+url+","+l);
}
var {Router, Route, hashHistory,Link} = ReactRouter;

var displayDic = {};
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
    // alert(JSON.stringify(data));
});
het.ready(function(data){
    // alert(JSON.stringify(data));
});


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            tipState:TipState.TipStateMistTip,
            modeState:ModeState.ModeState3,
            color:'#ff7b7c',
            isShow:false,
            brightness:Number(50),
            mist:MistState.MistStateHalf,
            timeClose:30,
            //switchState 0是开机，1是关机
            switchState:0,
            showSetTime:false
        }
        // this.listenStore(Store); // 监听Store
        //
        this.isSelectingColor = false;
        this.useSetTime = false;
    }
    handleDisplayData(dic){
        let updateObj = {};
        console.log("handleDisplayData");
        let warn = parseInt(dic["warring1"]);
        //提示控制
        if(warn === 1){
            // this.setState({tipState:TipState.TipStateLackWater});
            $.extend(updateObj,{tipState:TipState.TipStateLackWater});
        }else if(this.state["tipState"] === TipState.TipStateLackWater){
            // this.setState({tipState:TipState.TipStateClose});
            $.extend(updateObj,{tipState:TipState.TipStateClose});
        }
        //mode
        let mode = parseInt(dic["mode"]);
        $.extend(updateObj,{modeState:mode});

        let brightness = parseInt(dic["brightness"]);
        if(mode === ModeState.ModeState3){
            $.extend(updateObj,{brightness:brightness});
            //颜色控制
            if(this.isSelectingColor == false){
                let red = parseInt(dic["red"]);
                let green = parseInt(dic["green"]);
                let blue = parseInt(dic["blue"]);
                let colorStr = "#"+red.toString(16)+green.toString(16)+blue.toString(16);
                $.extend(updateObj,{color:colorStr});
            }
        }

        let mist = parseInt(dic["mist"]);
        $.extend(updateObj,{mist:mist});

        if(this.userSetTime){
            let mins = parseInt(dic["timeCloseH"])*60 + parseInt(dic["timeCloseM"]);
            mins = isNaN(mins)?0:mins;
            $.extend(updateObj,{timeClose:mins});
        }else{
            let mins = parseInt(dic["remainingTimeH"])*60 + parseInt(dic["remainingTimeM"]);
            mins = isNaN(mins)?0:mins;
            $.extend(updateObj,{timeClose:mins});
        }

        let presetHour = $.parseIntInvalidToZero(dic["presetOpenH"]);
        let presetMin = $.parseIntInvalidToZero(dic["presetOpenM"]);
        let orderBrightness = $.parseIntInvalidToZero(dic["orderBrightness"]);
        let orderMist = $.parseIntInvalidToZero(dic["orderMist"]);

        if ((presetHour*60+presetMin) > 0 ||  orderBrightness >0 ||
        orderMist > 0) { //有预约开机设置
        let colorR = dic["orderRed"].toTwoHex();
        let colorG = dic["orderGreen"].toTwoHex();
        let colorB = dic["orderBlue"].toTwoHex();
        let orderColorStr = "#"+colorR + colorG + colorB;
            if (orderColorStr === "#000000") {
                orderColorStr = "#ffffff";
            }
            let mistArr = ["关闭","大雾","小雾","睡眠"];
            this.orderObj = {time:presetHour+":"+presetMin,
             color:orderColorStr,brightness:orderBrightness+"%",
            mist:mistArr[orderMist]};
            $.extend(updateObj,{showSetTime:true});
        }else{
            $.extend(updateObj,{showSetTime:false});
        }
        //开关机
        if((mode === ModeState.ModeState3 && brightness ===0 && mist === MistState.MistStateClose) //单色模式下的关机
         ||(mode === ModeState.ModeState0 && mist === MistState.MistStateClose)){//轮播模式0的关机
            //  alert("close");
             if(this.state.switchState === 0){
                 $.extend(updateObj,{switchState:1});
                 //并且禁止页面滑动
                 $("body").animate({scrollTop:'0px'},500);
                document.addEventListener("touchmove",this.scrolldisableHandle,false);
                $(".upView > .switch").css("background-image","url(../static/img/switch-on.png)");
             }
             //将预约开机时间显示在closeView上

         }else{
             if(this.state.switchState === 1){
                 $.extend(updateObj,{switchState:0});
                document.removeEventListener("touchmove",this.scrolldisableHandle,false);
                $(".upView > .switch").css("background-image","url(../static/img/switch-off.png)");

             }
             //使能界面滑动


         }
         this.setState(updateObj);
    }
    scrolldisableHandle(e){
            e.preventDefault();
            e.stopPropagation();
    }
    componentWillUnmount(){
        if(typeof this.removeListen === "function"){
            this.removeListen();
        }
    }

    isEmptyObject(obj){
        for (var n in obj) {
            return false
        }
        return true;
    }

    componentDidMount(){
        het.setTitle('香薰机');
        this.removeListen = Store.listen(this.handleDisplayData.bind(this));
        // Actions.getDisplayData();
        if(this.isEmptyObject(Store.displayData) === false){
            this.handleDisplayData(Store.displayData);
        }
        let aromaCanvas = this.refs.aromaCanvas;
        let factor = 2;
        let context = aromaCanvas.getContext("2d");
        context.beginPath();
        context.moveTo(236/factor,12/factor);
        context.lineTo(276/factor,35/factor);
        context.quadraticCurveTo(276/factor, 180/factor, 350/factor, 230/factor);
        context.quadraticCurveTo(385/factor, 260/factor, 390/factor, 310/factor);
        context.quadraticCurveTo(280/factor, 360/factor, 110/factor, 315/factor);
        context.quadraticCurveTo(110/factor, 255/factor, 169/factor, 180/factor);
        context.quadraticCurveTo(240/factor, 65/factor, 236/factor, 12/factor);

        context.fillStyle = this.state.color;
        context.fill();

        //初始化关机的view
        let height = window.screen.height - parseInt($(".upView").css("height"));
        height = height + "px"
        //很麻烦，第一次加载视图的时候，并没有渲染closeView,
        //在显示关机界面时才渲染，但是closeView上的信息传递又要放到render函数中，
        this.closeViewHeight = height;
    }

    handleTouchTap(e) {
        // console.log('touchTap事件测试');
    }
    disMiss(){
        this.setState({tipState:TipState.TipStateClose});
    }

    changeModeHandle(index){
        if(index === 0 && this.state.modeState != ModeState.ModeState1){
            Actions.changeMode(ModeState.ModeState1);
        }else if(this.state.modeState != ModeState.ModeState3){
            Actions.changeMode(ModeState.ModeState3);
        }

    }

/**
 * 通过颜色方块选择颜色
 */
    changeColorHandle(color){
        if(color === 'tapRingEvent'){
            this.isSelectingColor = true;
            this.setState({
                isShow:!this.state.isShow
            })
        }else{
            // this.setState({color:color});
            Actions.changeColor(color);
        }
    }

/**
 * 只是改变，并没有发送给设备
 */
    selectColorHandle(color){
        this.setState({color:color});
    }
    /**
     * 将颜色值发送给设备
     */
    submitColorHandle(color){
        Actions.changeColor(color);
    }
    changValueHandle(value){
        Actions.changeBrightness(value);
    }
    changeMistHandle(value){
        Actions.changeMist(value);
    }
    switchHandle(e){
        this.state.switchState === 0 ? Actions.changeSwitch(1):Actions.changeSwitch(0);
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
        this.isSelectingColor = false;
        this.setState({isShow:!this.state.isShow});
    }
    render() {
        if(this.refs.aromaCanvas){
            let aromaCanvas = this.refs.aromaCanvas;
            let context = aromaCanvas.getContext("2d");
            context.fillStyle = this.state.color;
            context.fill();
        }
        let colorRingViewIsShow = this.state.isShow;
        let colorDom ;
        if(this.state.modeState===ModeState.ModeState3){
            // style={{visibility:this.state.modeState===ModeState.ModeState3?'visible':'hidden',overflow:'hidden',transitionDuration:'1s',transform:this.state.modeState===ModeState.ModeState3?`scaleY(1)`:`scaleY(0)`}}
            colorDom = <section>
                <h2 style={{fontSize:'16px',padding:'15px',paddingBottom:'0px',color:'#9693b2',backgroundColor:this.state.cocolor}}>颜色</h2>
                <ColorSelectView currentColor={this.state.color} changeColorHandle={this.changeColorHandle.bind(this)}/>
                {/* <YYScale></YYScale> */}
                <Slider min="0" max="100" changeValue={this.changValueHandle.bind(this)} value={this.state.brightness}
                    showText={Boolean(true)}></Slider>
            </section>;
        }
        let showOrderSet = this.state.switchState === 0?false:true;
        return <div>
            <section className="upView">
                <TipView tipState={this.state.tipState} disMiss={this.disMiss.bind(this)}/>
                {/* <div className="aromaImg">
                    <img src="../static/img/pic-07.png" style={{WebkitFilter: `drop-shadow(0px -5px 5px ${this.state.color})`}} />
                </div> */}
                <div className="aromaContent">
                    <canvas ref="aromaCanvas"  className="aromaCanvas" width="250px" height="250px"></canvas>
                    <div className="opacityAroma"></div>
                </div>
                <a href="#" className="switch" onTouchEnd={this.switchHandle.bind(this)}></a>
            </section>
            <section className="downView">
                <AromaSegView modeState={this.state.modeState} changeMode={this.changeModeHandle.bind(this)} />
                {colorDom}
                <section>
                    <AromaMistAndTimeView mist={this.state.mist} time={this.state.timeClose}
                        changeMist={this.changeMistHandle.bind(this)}
                        changCloseTime={this.changeCloseTimeHandle.bind(this)} ></AromaMistAndTimeView>
                </section>

                <Link to="/PlanSettingMain">
                    <TimeShowView showPlanSetting={this.state.showSetTime} planInfo={this.orderObj}></TimeShowView>
                </Link>
            </section>

            <ColorRingView isShow={colorRingViewIsShow} disMissRingView={this.disMissRingView.bind(this)} colorBar={this.state.color} selectColor={this.selectColorHandle.bind(this)} submitColor={this.submitColorHandle.bind(this)}/>

            <ReactCSSTransitionGroup
                        transitionName="closeView"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        {showOrderSet&&(
                            <section key="closeViewKey" className="closeViewContainer" style={{position:'fixed','width':'100%',height:`${this.closeViewHeight}`,left:'0px',bottom:'0px'}}>
                            <Link to="/PlanSettingMain">
                            <CloseView showPlanSetting={this.state.showSetTime} planInfo={this.orderObj}></CloseView>
                        </Link>
                        </section>
                    )}
                    </ReactCSSTransitionGroup>
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('香薰机');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path='/PlanSettingMain' component={PlanSettingMain} />
        </Router>
    ), document.getElementById('ROOT'));
});
