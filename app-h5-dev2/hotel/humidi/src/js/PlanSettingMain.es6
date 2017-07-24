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

        this.state = {
            showRing:false,
            showBright:false,
            showMist:false,
            showRun:false
        };

        this.defaults = {
            hour:new Date().getHours(),
            minute:new Date().getMinutes(),
            color:'rgb(255,0,0)',
            brightness:50,
            mist:MistState.MistStateHigh,
            runTime:0
        };

        $.extend(this.state, this.defaults, Store.getOrder());

        this.mistArr = ["关闭","大雾","小雾","睡眠"];
        this.runTimeArr = ["不限时",5,10,30,60,120];
    }

    componentDidMount(){
        //this.removeListen = Store.listen(this.setState.bind(this));
        het.setTitle('定时开启');
    }

    componentWillUnmount(){
        //this.removeListen();
    }

    dateChangeHandle(presetOpenH,presetOpenM){
        this.setState({hour:+presetOpenH, minute:+presetOpenM});
    }

    dismiss(){
        this.setState({showRing:false,showBright:false,showMist:false,showRun:false});
    }

    submitColorHandle(color){
        this.dismiss();
        this.setState({color:color});
    }

    submitBright(value){
        this.dismiss();
        this.setState({brightness:+value});
    }

    submitMist(index){
        this.dismiss();
        this.setState({mist:+index});
    }

    submitRunTime(index){
        this.dismiss();
        this.setState({runTime:this.runTimeArr[index]||0});
    }

    setOrderComplete(e){
        e.preventDefault();
        e.stopPropagation();
        Actions.changeOrderInfo(this.state);
        window.location.hash = '';
    }

    render(){
        let showMaskView = this.state.showRing || this.state.showBright || this.state.showMist || this.state.showRun;

        var {hour, minute, color, brightness, mist, runTime} = this.state;


        return(
                <section style={{height:window.screen.height+"px", width:window.screen.width+"px"}} className="planSetting">
                    <DatePickView1 dateChange={this.dateChangeHandle.bind(this)} hour={hour} min={minute}/>
                    <div style={{width:'100%',height:'32px',backgroundColor:'#1c1b28'}}></div>
                    <section className="table">
                        <div className="flex" onTouchEnd={(e)=>{this.setState({showRing:true});}}>
                            <dd className="flex-cell tl">颜色</dd>
                            <dd className="flex-cell tr">
                                <div className="orderColor" style={{backgroundColor:color}}></div>
                                <i></i>
                            </dd>
                        </div>

                        <div className="flex" onTouchEnd={(e)=>{this.setState({showBright:true})}}>
                            <dd className="flex-cell tl">亮度</dd>
                            <dd className="flex-cell tr">
                                <span>{brightness}</span>
                                <i></i>
                            </dd>
                        </div>

                        <div className="flex" onTouchEnd={(e)=>{this.setState({showMist:true})}}>
                            <dd className="flex-cell tl">雾化</dd>
                            <dd className="flex-cell tr">
                                <span>{this.mistArr[mist]}</span>
                                <i></i>
                            </dd>
                        </div>
                        <div className="flex"onTouchEnd={(e)=>{this.setState({showRun:true})}}>
                            <dd className="flex-cell tl">开启时长</dd>
                            <dd className="flex-cell tr">
                                <span>{runTime||'不限时'}</span>
                                <i></i>
                            </dd>
                        </div>
                    </section>

                    <div className="comfirmBtn" onTouchEnd={this.setOrderComplete.bind(this)}>确认</div>

                    {/* 遮罩层 */}
                    <ReactCSSTransitionGroup
                                transitionName="maskView-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {showMaskView && (<MaskView  touchMaskView={this.dismiss.bind(this)}/>)}
                    </ReactCSSTransitionGroup>

                    {/* 颜色选项 */}
                    <ReactCSSTransitionGroup
                                transitionName="comfirmBaranimate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {this.state.showRing && (<SetColorRing cancleHandle={this.dismiss.bind(this)}
                        comfirmHandle={this.submitColorHandle.bind(this)}
                    currentColor={color}/>)}
                    </ReactCSSTransitionGroup>

                    {/* 亮度选项 */}
                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                        {this.state.showBright && (<SetBrightness  value={brightness}
                        cancleHandle={this.dismiss.bind(this)}
                        comfirmHandle={this.submitBright.bind(this)}/>)}
                    </ReactCSSTransitionGroup>

                    {/* 雾化选项 */}
                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                     {this.state.showMist && <SetMistAndRunTime data={this.mistArr} cancleHandle={this.dismiss.bind(this)}
                     comfirmHandle={this.submitMist.bind(this)}/>}
                    </ReactCSSTransitionGroup>

                    {/* 开启时长选项 */}
                    <ReactCSSTransitionGroup
                                transitionName="setBright-animate"
                                transitionEnterTimeout={300}
                                transitionLeaveTimeout={300}>
                     {this.state.showRun && <SetMistAndRunTime data={this.runTimeArr} cancleHandle={this.dismiss.bind(this)}
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
        this.props.comfirmHandle((this.state.currentBright));
    }
    changValueHandle(value){
        this.setState({currentBright:parseInt(value)});
    }
    render(){
        return (
            <div className="setBrightness" key="setBrightnessKey">
                <ComfirmBar touchBtn1={this.touchBtn1.bind(this)} touchBtn2={this.touchBtn2.bind(this)}/>
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
        this.data = props.data || ["请传入数据"];
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
    shouldComponentUpdate(props){
        return false;
    }
    changIndexHandle(index){
        this.index = index;
    }
    render(){
        return (
            <div className="setBrightness" key="setBrightnessKey">
                <ComfirmBar touchBtn1={this.touchBtn1.bind(this)} touchBtn2={this.touchBtn2.bind(this)}/>
                <PickView style={{height:'176px',width:'100%'}} data={this.data} selectIndex={this.changIndexHandle.bind(this)}></PickView>
            </div>
        )
    }
}
