// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {RunUI} from './RunUI.jsx';
import {ConfigUI} from './ConfigUI.jsx';
import {Wave} from './Wave.jsx';

import {ControlFilter} from './ControlFilter.jsx';
import {TimeSelect} from "./TimeSelect.jsx";
import {DialogStyle} from "./DialogStyle.jsx";
import {TipsDialogStyle} from "./TipsDialogStyle.jsx";


// <div className="main_box_top">
//     <RunUI/>
// </div>
// <div className="main_box_bottom">
//     <Wave/>
//     <ConfigUI/>
//     <ControlFilter/>
//     <TimeSelect title={selectTitle} minuteshow={true} hourshow={false} timeLeftTitle={timeLeftTitle}
// minutestep={1} statusname={statusname} cancelClock={this.handleClickCancel}
// submitClock={this.handleClickSure} show={selectshow} minutearr={tempArray} />
//     </div>



var {Router, Route, hashHistory} = ReactRouter;


het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : false,
        torporTime:10000,
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // console.log("---------------------------  "+data);
    Actions.repaint(data);
});

// 创建React组件 mom349253356
class App extends BaseComponent {
    constructor(props) {
        super(props);

        this.listenStore(Store); // 监听Store

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickSure = this.handleClickSure.bind(this);

        this.canceldia = this.canceldia.bind(this);
        this.submitdia = this.submitdia.bind(this);

        this.handleFilterBtnCancel= this.handleFilterBtnCancel.bind(this);
        this.handleFilterBtnSure= this.handleFilterBtnSure.bind(this);

        this.closeLifeTips = this.closeLifeTips.bind(this);
    }
    handleFilterBtnCancel(){
        this.setState({
            filterRemainTime:2000
        });
    }
    handleFilterBtnSure(){
        this.setState({
            filterRemainTime:2000
        });
    }

    handleClickCancel(){
        this.setState({
            selectshow:false
        });
    }
    handleClickSure(h,m){

        if(m=="智能"){
            //uvSw:uv,anionSw:anion,ozoneSw:ozone
            Actions.controllMode(0,2,this.state.uvSw,1);//紫外线，负离子，臭氧,
        }else if(m=="标准"){
            Actions.controllMode(1,4,1,1,this.state.ozoneSw);
        }else if(m=="速净"){
            Actions.controllMode(2,8,1,1,this.state.ozoneSw);

        }else if(m=="节能"){
            Actions.controllMode(3,2,1,1,this.state.ozoneSw);
        }else if(m=="睡眠"){
            Actions.controllMode(4,1,this.state.uvSw,this.state.anionSw,this.state.ozoneSw);
        }else if(m=="假日"){
            Actions.controllMode(5,1,this.state.uvSw,this.state.anionSw,this.state.ozoneSw);

        }else if(m=="手动"){
            Actions.controllMode(6,this.state.uvSw,this.state.anionSw,this.state.ozoneSw);

        }else if(m=="停"){
            if(this.state.workMode==0){
                Actions.controllMode2(6,0);
            }else {
                Actions.controllWindSpeed(0);
            }
        }else if(m=="低档"){
            if(this.state.workMode!=5 || this.state.workMode!=6){
                Actions.controllMode2(6,1);
            }else{
                Actions.controllWindSpeed(1);
            }
        }else if(m=="中档"){
            if(this.state.workMode!=0 || this.state.workMode!=3 ){
                Actions.controllMode2(6,2);
            }else{
                Actions.controllWindSpeed(2);
            }

        }else if(m=="高档"){
            if(this.state.workMode!=1){
                Actions.controllMode2(6,4);
            }else{
                Actions.controllWindSpeed(4);
            }
        }else if(m=="超高档"){
            if(this.state.workMode!=2){
                Actions.controllMode2(6,8);
            }else{
                Actions.controllWindSpeed(8);
            }


        }else if(m==1){
            Actions.controllTime(1);

        }else if(m==2){
            Actions.controllTime(2);

        }else if(m==4){
            Actions.controllTime(4);

        }else if(m==8){
            Actions.controllTime(8);

        }else if(m=="关闭"){
            Actions.controllTime(255);
        }
        this.setState({
            selectshow:false

        });
    }
    canceldia(){
        this.setState({
            isShowAlert:false,
            PM25SnrErr:0,
            NTCSnrErr:0,
            AirQtyErr:0,
            DCVoltageErr:0,
            LeakCurrentErr:0,
            FLASHErr:0
        });
    }
    submitdia(){
        this.setState({
            isShowAlert:false,
            PM25SnrErr:0,
            NTCSnrErr:0,
            AirQtyErr:0,
            DCVoltageErr:0,
            LeakCurrentErr:0,
            FLASHErr:0
        });
        location.href="tel:0755-26727188";
    }
    closeLifeTips(){
        this.setState({
            lifeShow:false,
            filterRemainTime:2000
        });
    }

    componentWillUpdate(nextProps, nextState) {//render 之前可以先判断是否改变了
        // let olderrs = this.state.Errs || [];//故障列表
        // let  ErrItems= nextState.Errs || [];
        // //故障判断
        // if (this.ischangeErr2(olderrs,ErrItems)) {
        //     this.setState({
        //         diaErrShow : 0,
        //         showdialogC : false
        //     });
        // }
    }

    render() {
        if( this.state.modeType==undefined){
            this.state.modeType =1;
        }
        let modeType =  this.state.modeType;
        let statusname = '';
        let tempArray;
        let timeLeftTitle =  "选择模式";
        let defaultIndex=0;
        if(modeType==1){
            timeLeftTitle =  "选择模式";
            tempArray = ["智能","标准","速净","节能","睡眠","假日","手动"];
            if(this.state.workMode==0){
                defaultIndex=tempArray[0]
            }else if(this.state.workMode==1){
                defaultIndex=tempArray[1]
            }else if(this.state.workMode==2){
                defaultIndex=tempArray[2]
            }else if(this.state.workMode==3){
                defaultIndex=tempArray[3]
            }else if(this.state.workMode==4){
                defaultIndex=tempArray[4]
            }else if(this.state.workMode==5){
                defaultIndex=tempArray[5]
            }else if(this.state.workMode==6){
                defaultIndex=tempArray[6]
            }
        }else if(modeType==2){
            timeLeftTitle =  "选择风速";
            tempArray= ["停","低档","中档","高档","超高档"];
            if(this.state.motorGear==0){
                defaultIndex=tempArray[0]
            }else if(this.state.motorGear==1){
                defaultIndex=tempArray[1]
            }else if(this.state.motorGear==2){
                defaultIndex=tempArray[2]
            }else if(this.state.motorGear==4){
                defaultIndex=tempArray[3]
            }else if(this.state.motorGear==8){
                defaultIndex=tempArray[4]
            }


        }else if(modeType==3){
            timeLeftTitle =  "定时关机";
            statusname="小时后关机"
            tempArray =["1","2","4","8","关闭"];
            if(this.state.RemainTime==1){
                defaultIndex=tempArray[0]
            } else if(this.state.RemainTime==2){
                defaultIndex=tempArray[1]
            }else if(this.state.RemainTime==4){
                defaultIndex=tempArray[2]
            }else if(this.state.RemainTime==8){
                defaultIndex=tempArray[3]
            }else if(this.state.RemainTime==255){
                defaultIndex=tempArray[4]
            }
        }
        let selectTitle = '';
        let selectshow = this.state.selectshow;

        let title = "设备故障";
        let myError = [];
        let isShowAlert = false;
        //如果是没出手的，那就去判断是否有异常
        console.log("isShowAlert== "+this.state.isShowAlert);
        if(this.state.isShowAlert == undefined){
            if(this.state.PM25SnrErr == 1){
                myError.push("PM2.5质量传感器");
            }
            if(this.state.NTCSnrErr == 1){
                myError.push("温度传感器")
            }
            if(this.state.AirQtyErr == 1){
                myError.push("空气质量传感器")
            }
            if(this.state.DCVoltageErr == 1){
                myError.push("空气质量传感器故障")
            }
            if(this.state.LeakCurrentErr == 1){
                myError.push("漏电保护异常")
            }
            if(this.state.FLASHErr == 1){
                myError.push("FLASH异常")
            }
            if(myError.length>0){
                isShowAlert = true;
            }else{
                isShowAlert = false;
            }
        }

        let lifeShow=this.state.lifeShow;
        if(lifeShow == undefined){
            if(this.state.filterRemainTime<5){
                lifeShow = true;
            }
        }
        // if(this.state.filterRemainTime!=undefined){
        //     if(this.state.filterRemainTime<5){
        //         lifeShow = true;
        //     }
        // }

        return(
            <div className="app-body">
                <div className="main_box">
                    <RunUI/>
                <div className="main_box_bottom">
                    <Wave/>
                    <ConfigUI/>
                    <ControlFilter/>
                    <TimeSelect title={selectTitle} minuteshow={true} hourshow={false} timeLeftTitle={timeLeftTitle}
                        minutestep={1} statusname={statusname} cancelClock={this.handleClickCancel} defaultminute={defaultIndex}
                        submitClock={this.handleClickSure} show={selectshow} minutearr={tempArray} />
                </div>
                </div>
                <DialogStyle show={isShowAlert} cancelClock={this.canceldia}
                                    submitClock={this.submitdia}
                                    title={title} content={""} errs = {myError} rightpam="联系客服"/>
                <TipsDialogStyle show={lifeShow} closeLifeTips={this.closeLifeTips}/>
            </div>

        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});