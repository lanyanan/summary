import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {DatePickView1,PickView} from './DatePickView1.es6';
import {MistState} from './AromaMistAndTimeView.es6';
import {MaskView,ComfirmBar} from './CommonView.es6';
import {SetColorRing} from './SetColorRing.es6';
import {Slider} from './Slider.es6';

var {hashHistory} = ReactRouter;
export class PlanSettingMain extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {orderColor:"#ff0000",
                    orderBrightness:"50%",
                    oderMist:"大雾",
                    presetRunTime:"不限时",
                    showRing:false,showBright:false,showMist:false,showRun:false};
        this.planInfo = {presetOpenH:9,
        presetOpenM:30,orderColor:"#ff0000",orderBrightness:50,orderMist:MistState.MistStateHigh,presetRunTime:0};
        this.mistArr = ["关闭","大雾","小雾","睡眠"];
        this.runTimeArr = ["不限时","5","10","30","60","120"];
    }
    componentDidMount(){
        this.removeListen = Store.listen(this.listenHandle.bind(this));
        het.setTitle('定时开启');
        //获取最近使用的颜色
        Actions.getRecentlyColor();
    }
    componentWillUnmount(){
        if(typeof this.removeListen === "function"){
            this.removeListen();
        }
    }
    listenHandle(dic){
        if(dic["colorStr"] !== "#000000"){
            this.setState({orderColor:dic["colorStr"]});
            $.extend(this.planInfo,{orderColor:dic["colorStr"]});
        }
    }
    dateChangeHandle(presetOpenH,presetOpenM){
        $.extend(this.planInfo,{presetOpenH:presetOpenH,
        presetOpenM:presetOpenM});

    }
    dismiss(){
        this.setState({showRing:false,showBright:false,showMist:false,showRun:false});
    }
    submitColorHandle(color){
        this.dismiss();
        this.setState({orderColor:color});
        $.extend(this.planInfo,{orderColor:color});
    }
    submitBright(value){
        this.dismiss();
        this.setState({orderBrightness:value});
        $.extend(this.planInfo,{orderBrightness:parseInt(value)});
    }
    submitMist(index){
        this.dismiss();
        this.setState({oderMist:this.mistArr[index]});
        $.extend(this.planInfo,{orderMist:index});
    }
    submitRunTime(index){
        this.dismiss();
        this.setState({presetRunTime:this.runTimeArr[index]});
        let value = $.parseIntInvalidToZero(this.runTimeArr[index]);
        $.extend(this.planInfo,{presetRunTime:value});
    }

    setOrderComplete(e){
        e.preventDefault();
        e.stopPropagation();
        Actions.changeOrderInfo(this.planInfo);
        window.history.back();
    }
    render(){
        let showMaskView = this.state.showRing || this.state.showBright || this.state.showMist || this.state.showRun;
        return(
                <section style={{height:`${window.screen.height+"px"}`,width:`${window.screen.width+"px"}`}} className="planSetting">
                    <DatePickView1 dateChange={this.dateChangeHandle.bind(this)}
                    hour={this.planInfo["presetOpenH"]}
                    min={this.planInfo["presetOpenM"]}/>
                    <div style={{width:'100%',height:'32px',backgroundColor:'#1c1b28'}}></div>
                    <section className="table">
                        <div className="flex" onTouchEnd={(e)=>{this.setState({showRing:true});}}>
                            <dd className="flex-cell tl">颜色</dd>
                            <dd className="flex-cell tr">
                                <div className="orderColor" style={{backgroundColor:`${this.state.orderColor}`}}>
                                </div>
                                <i></i>
                            </dd>
                        </div>
                        <div className="flex" onTouchEnd={(e)=>{this.setState({showBright:true})}}>
                            <dd className="flex-cell tl">亮度</dd>
                            <dd className="flex-cell tr">
                                <span>{this.state.orderBrightness}</span>
                                <i></i>
                            </dd>
                        </div>
                        <div className="flex" onTouchEnd={(e)=>{this.setState({showMist:true})}}>
                            <dd className="flex-cell tl">雾化</dd>
                            <dd className="flex-cell tr">
                                <span>{this.state.oderMist}</span>
                                <i></i>
                            </dd>
                        </div>
                        <div className="flex"onTouchEnd={(e)=>{this.setState({showRun:true})}}>
                            <dd className="flex-cell tl">开启时长</dd>
                            <dd className="flex-cell tr">
                                <span>{this.state.presetRunTime}</span>
                                <i></i>
                            </dd>
                        </div>
                    </section>
                    <div className="comfirmBtn" onTouchEnd={this.setOrderComplete.bind(this)}>确认</div>
                    <ReactCSSTransitionGroup
                                transitionName="maskView-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {showMaskView && (<MaskView  touchMaskView={this.dismiss.bind(this)}/>)}
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup
                                transitionName="comfirmBaranimate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {this.state.showRing && (<SetColorRing cancleHandle={this.dismiss.bind(this)}
                        comfirmHandle={this.submitColorHandle.bind(this)}
                    currentColor={this.state.orderColor}/>)}
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {this.state.showBright && (<SetBrightness  value={this.state.orderBrightness}
                        cancleHandle={this.dismiss.bind(this)}
                        comfirmHandle={this.submitBright.bind(this)}/>)}
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                     {this.state.showMist && <SetMistAndRunTime data={["关闭","大雾","小雾","睡眠"]} cancleHandle={this.dismiss.bind(this)}
                     comfirmHandle={this.submitMist.bind(this)}/>}
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                     {this.state.showRun && <SetMistAndRunTime data={["不限时","5","10","30","60","120"]} cancleHandle={this.dismiss.bind(this)}
                     comfirmHandle={this.submitRunTime.bind(this)}/>}
                    </ReactCSSTransitionGroup>

                </section>

        );
    }
}

//没有重新新建一个亮度设置的es6
class SetBrightness extends React.Component{
    constructor(props){
        super(props);
        let value = parseInt(props.value) || "50";
        this.state={currentBright:value};
    }
    touchBtn1(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.cancleHandle();
    }
    touchBtn2(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.comfirmHandle((this.state.currentBright+"%"));
    }
    changValueHandle(value){
        this.setState({currentBright:parseInt(value)});
    }
    render(){
        return (
            <div className="setBrightness" key="setBrightnessKey">
                <ComfirmBar touchBtn1={this.touchBtn1.bind(this)}
                touchBtn2={this.touchBtn2.bind(this)}/>
                <div style={{width:'100%',height:'20px'}}></div>
                <Slider min="0" max="100" changeValue={this.changValueHandle.bind(this)} value={this.state.currentBright}
                    showText={Boolean(true)}></Slider>
            </div>
        )
    }
}

class SetMistAndRunTime extends React.Component{
    constructor(props){
        super(props);
        this.data = props.data || ["1","2","3"];
        this.index = props.index || 0;
    }
    touchBtn1(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.cancleHandle();
    }
    touchBtn2(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.comfirmHandle(parseInt(this.index));
    }
    changIndexHandle(index){
        this.index = index;
    }
    render(){
        return (
            <div className="setBrightness" key="setBrightnessKey">
                <ComfirmBar touchBtn1={this.touchBtn1.bind(this)}
                touchBtn2={this.touchBtn2.bind(this)}/>
                {/* <div style={{width:'100%',height:'20px'}}></div> */}
                <PickView style={{height:'176px',width:'100%'}} data={this.data} selectIndex={this.changIndexHandle.bind(this)}></PickView>
            </div>
        )
    }
}
