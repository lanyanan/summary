/**
 * Created by ben on 2016/12/5.
 */
const {Router, Route, hashHistory, Link} = ReactRouter;

export const DevPicture = React.createClass({
    render(){
        return(
            <section className="app_bgimghg">
            </section>
        )
    }
})

    //<img src="../static/img/dev-screen01.jpg"/>  app_bgimgHG  dev-screen  app_bgimgHG
export default class FirstPage extends React.Component{
    constructor(props){
        super(props);
        this.state={};

    }
    render() {
        //传值
        let operate = this.props.operate;
        let mode = operate.mode;
        let online = operate.online;
        //let reservehour = operate.reservehour;
        //let reservemin = operate.reservemin;
        let surplusreservehour = operate.surplusreservehour;
        let surplusreservemin = operate.surplusreservemin;
        let surplusHeatingTime = operate.surplusHeatingTime;
        let reserveEnd = (surplusreservehour==0 && surplusreservemin== 0)?false:true;
        let soaktimehour = operate.soaktimehour;
        let soaktimeminute = operate.soaktimeminute;
        let error = operate.error;
        let AppointmentOrHeat = operate.AppointmentOrHeat

        //故障
        let errorText;
        let errorCss;
        //console.log("error",error);
        if(error !=1){
            errorCss = 'errorLabon';
            if(error==2){
                errorText = '传感器开路';
            }else if(error==3) {
                errorText = '传感器短路';
            }else if(error==4) {
                errorText = '传感器温度高温（超过190度)';
            }
        }else{
            errorCss = 'errorLaboff';
        }

        //工作状态Label
        let workingStatusCss;
        let workingLab;
        //console.log('-----------------------AppointmentOrHeat----------',AppointmentOrHeat);

        //if(mode ==1||mode==0){
        //    workingStatusCss = "working-status green";
        //    workingLab= '待机中';
        //}else if(mode ==18){
        //    workingLab = '保温中';
        //    workingStatusCss = "working-status orange";
        //}else{
        //    if(reserveEnd){
        //        workingLab= '预约中';
        //        workingStatusCss = "working-status green";
        //    }else{
        //        workingLab = '加热中';
        //        workingStatusCss = "working-status orange";
        //    }
        //}

        console.log('FirstPage AppointmentOrHeat',AppointmentOrHeat);
        if(AppointmentOrHeat == 1){
            workingLab= '预约中';
            workingStatusCss = "working-status green";
        }else if(AppointmentOrHeat == 2){
            workingLab = '加热中';
            workingStatusCss = "working-status orange";
        }else{
            if(mode == 18){
                workingLab = '保温中';
                workingStatusCss = "working-status orange";
            }else{
                workingStatusCss = "working-status green";
                workingLab= '待机中';
            }
        }

        //工作状态时长
        let workingTextCss = mode == 0||mode==1?'workingText off':'workingText on';
        let workingTime;
        let workStatusLab;
        if(mode==18){

            if(soaktimehour<10){
                soaktimehour = "0" + soaktimehour;
            }
            if(soaktimeminute<10){
                soaktimeminute = "0" + soaktimeminute;
            }
            console.log('soaktimehoursoaktimehour',soaktimehour,soaktimeminute);
            workStatusLab = '保温时长 '+soaktimehour +":"+soaktimeminute;
        }else{
            workingTime= surplusHeatingTime==0 ? "":surplusHeatingTime+'分钟';
            workStatusLab = "加热剩余时长"+workingTime;
        }


        //圆形按钮
        let roundCss = mode==0||mode==1?"dev-round on":"dev-round";
        let switchModePic = mode == 0||mode==1 ?'url(../static/img/m-1-on.png) no-repeat center center':'url(../static/img/m-'+mode+'-off.png) no-repeat center center';
        let ModeText = mode == 0||mode==1 ?"设置模式": operate.modeName;
        let liveModeSet = mode==0||mode==1 ? this.props.slide:'';
        //预约工作状态时长
        let subscribeTextCss;
        //console.log('surplusreservehour,mode',surplusreservehour,surplusreservemin,mode);
        if(AppointmentOrHeat == 1){
            subscribeTextCss='subscribeText';
            //if(surplusHeatingTime>60){
            //    surplusreservehour=surplusreservehour +parseInt(surplusHeatingTime/60);
            //    surplusreservemin = surplusreservemin+ surplusHeatingTime%60;
            //}else{
            //    surplusreservemin = surplusreservemin+ surplusHeatingTime%60;
            //}
        }else{
            subscribeTextCss='subscribeText off';
        }

        let subscribeTime = surplusreservehour==0 ? (surplusreservemin==0?'':surplusreservemin+'分钟'):(surplusreservemin==0?surplusreservehour+'小时':surplusreservehour+'小时'+surplusreservemin+'分钟');
        //console.log('surplusHeatingTime,surplusreservehour,surplusreservemin,subscribeTime',surplusHeatingTime,surplusreservehour,surplusreservemin,subscribeTime);
        //取消
        let cancelCss = mode!=0&&mode!=1?'cancel on show':'cancel off hide';
        let cancelEvent = mode==0||mode==1 ?'':this.props.cancel;

        //设备不在线
        //let onlineHint = online==2?'dev-offline slide-up':'dev-offline slide-down';
        let onlineHint = online==2?'dev-offline show':'dev-offline hide';

        return <div className="first-page">
            <DevPicture/>
            <section className="dev-operate">
                <h3 className="errorLab"><span className={errorCss}>故障提示:{errorText}</span></h3>
                <h4 className={workingStatusCss}><span>{workingLab}</span></h4>
                <h3 className={workingTextCss} >{workStatusLab}</h3>
                <div className="dev-1">
                    <div className={roundCss} onTouchStart={liveModeSet}>
                        <i style={{background:switchModePic}} ></i>
                        <h5>{ModeText}</h5>
                    </div>
                </div>
                <h3 className={subscribeTextCss}>{subscribeTime}后结束</h3>
                <figure className={cancelCss} onClick={cancelEvent}>取消</figure>
                <figure className={onlineHint}>{'主人您的设备不在线哦~!'}</figure>
            </section>
        </div>;
    }
}
