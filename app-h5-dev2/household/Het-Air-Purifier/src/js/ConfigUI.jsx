/**
 * Created by mindray on 2017/1/4.
 */
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';


var {Router, Route, hashHistory} = ReactRouter;
// 接收app推送数据
het.repaint((data)=>{
    // console.log('1111111111111111111111111111111 repaint  data ');
    Actions.repaint(data);
});
//创建 ConfigUI React组件
export class ConfigUI extends BaseComponent{

    // 构造函数，传入按钮的标题和状态
    constructor(props) {
        super(props);

        this.listenStore(Store); // 监听Store

        this.handleArrowUp = this.handleArrowUp.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);

        this.handleStandard = this.handleStandard.bind(this);
        this.handleSpeedWind = this.handleSpeedWind.bind(this);

        this.handleTiming = this.handleTiming.bind(this);
        this.handleUV = this.handleUV.bind(this);

        this.handleAnion = this.handleAnion.bind(this);
        this.handleOzone = this.handleOzone.bind(this);

        this.handleChildLock = this.handleChildLock.bind(this);

    }
    liveError(){
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        if(this.state.online==2){
            return '设备与APP已断开连接！'
        }
        return false;
    }

    handleSwitch(){
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };

            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==1){  //如果当前是1-开机
                Actions.controllSwitch(2);//就触发关机事件
            }else{
                Actions.controllSwitch(1);
            }
            // het.hexUpFlag(9, 1, 2);//功能指示，功能所占的字节数，updataFlag
        }
        //处理模式
        handleStandard(){
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            //显示模式选择对话框
            Actions.controllShowModeDialog(1);
        }
        //处理风速
        handleSpeedWind(){
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            Actions.controllShowModeDialog(2);
        }
        //处理定时
        handleTiming(){
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            //if(this.state.mode==5){het.toast('假期的模式,不能操作定时'); return false;}
            Actions.controllShowModeDialog(3);
        }
        //处理UV
        handleUV(){
            //console.log("-- online -- "+this.state.online+" -- onoff -- "+this.state.onoff)
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            if(this.state.uvSw==1){
                Actions.controllUV(2);
            }else{
                Actions.controllUV(1);
            }
            // het.hexUpFlag(6, 1, 2);//功能指示，功能所占的字节数，updataFlag
        }
        handleAnion(){//处理负离子
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            if(this.state.anionSw==1){
                Actions.controllAnion(2);
            }else{
                Actions.controllAnion(1);
            }

        }
        handleOzone(){//处理臭氧
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.childLock==2){het.toast('童锁开启，不能点击其他按钮'); return false;}
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            if(this.state.ozoneSw==1){
                Actions.controllOzone(2);
            }else{
                Actions.controllOzone(1);
            }
            // het.hexUpFlag(5, 1, 2);//功能指示，功能所占的字节数，updataFlag
        }
        handleChildLock(){//处理童锁
            if(this.liveError()){
                het.toast(this.liveError());
                return false
            };
            if(this.state.powerOn==2){het.toast('设备已关机'); return false;}
            if(this.state.childLock==1){
                Actions.controllChildLock(2);
            }else{
                Actions.controllChildLock(1);
            }
            // het.hexUpFlag(3, 1, 2);//功能指示，功能所占的字节数，updataFlag
        }
        handleArrowUp(){//处理箭头
            //如果开始是隐藏的，就显示出来
            if(this.state.modeWindowState==1){
                Actions.controllShowOrModeOrFilterUI(2,1);
            }

        }
        render(){
            let switchImg="../static/img/home_button_kaiguan_disabled.png";
            let switchText="开机";
            let switchTextStyle="text_switch"

            // 模式设置
            let modeImg = "../static/img/home_button_moshi_selected.png";
            let modeText="智能";
            let modeTextStyle="text_switch"

            //风速
            let windSpeedImg="../static/img/home_button_fefengsu_selected.png";
            let windSpeedText="停止";
            let windSpeedTextStyle="text_switch"

            //定时部分
            let timeImg="../static/img/home_button_time_normal.png";
            let timeTextStyle="text_switch"
            let timeText="定时";
            let llStype = "item_value_hide";
            let settimer=255;


            let uvImg = "../static/img/home_button_UV_normal.png"
            let uvTextStyle="text_switch"
            let uvText="UV";
            //负离子
            let anionImg="../static/img/home_button_fulizi_normal.png"
            let anionTextStyle="text_switch"
            let anionText="负离子";
            //臭氧
            let OzoneImg = "../static/img/home_button_chouyang_normal.png"
            let ozoneTextStyle="text_switch"
            let ozoneText="臭氧";

            //童锁
            let childLockImg="../static/img/home_button_tongsuo_normal.png";
            let childLockText="童锁关";
            let childLockTextStyle="text_switch"

            //如果开关没获取到状态值，那么所以的控制设置为不可用
            if(this.state.powerOn==undefined || this.state.networkavailable==2 || this.state.online==2){
                //console.log("llStype= onoff ==networkavailable "+llStype);
                switchImg="../static/img/home_button_kaiguan_disabled.png";
                modeImg = "../static/img/home_button_moshi_disabled.png";
                windSpeedImg="../static/img/home_button_fefengsu_disabled.png";
                timeImg="../static/img/home_button_time_disabled.png";
                uvImg = "../static/img/home_button_UV_disabled.png"
                anionImg="../static/img/home_button_fulizi_disabled.png"
                OzoneImg = "../static/img/home_button_chouyang_disabled.png"
                childLockImg="../static/img/home_button_tongsuo_disabled.png";

                switchTextStyle = "text_switch_disable"
                modeTextStyle= "text_switch_disable"
                windSpeedTextStyle= "text_switch_disable"

                timeTextStyle= "text_switch_disable"
                uvTextStyle= "text_switch_disable"
                anionTextStyle= "text_switch_disable"
                ozoneTextStyle= "text_switch_disable"
                childLockTextStyle= "text_switch_disable"
                llStype = "item_value_hide";
            }else if(this.state.powerOn==1){
                //console.log("llStype= onoff == "+llStype);

                switchImg = "../static/img/home_button_kaiguan_normal.png";
                switchText = "关机"
                if(this.state.workMode==undefined){
                    modeImg = "../static/img/home_button_moshi_disabled.png";
                    modeTextStyle = "text_switch_disable"
                }else if(this.state.workMode==0){
                    modeText="智能";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==1){
                    modeText="标准";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==2){
                    modeText="速净";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==3){
                    modeText="节能";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==4){
                    modeText="睡眠";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==5){
                    modeText="假日";
                    modeTextStyle="text_switch";
                }else if(this.state.workMode==6){
                    modeText="手动";
                    modeTextStyle="text_switch";
                }

                if(this.state.motorGear==undefined){
                    windSpeedImg="../static/img/home_button_fefengsu_disabled.png";
                    windSpeedTextStyle= "text_switch_disable"
                }else if(this.state.motorGear==0) {
                    windSpeedImg="../static/img/home_button_fefengsu_normal.png";
                    windSpeedText="停止";
                    windSpeedTextStyle= "text_switch"
                }else  if(this.state.motorGear==1) {
                    windSpeedText="低档";
                    windSpeedTextStyle= "text_switch"
                }else  if(this.state.motorGear==2) {
                    windSpeedText="中档";
                    windSpeedTextStyle= "text_switch"
                }else  if(this.state.motorGear==4) {
                    windSpeedText="高档";
                    windSpeedTextStyle= "text_switch"
                }else  if(this.state.motorGear==8) {
                    windSpeedText="超高档";
                    windSpeedTextStyle= "text_switch"
                }

                if(this.state.RemainTime==undefined){
                    timeImg="../static/img/home_button_time_disabled.png";
                    timeTextStyle= "text_switch_disable"
                    llStype = "item_value_hide";
                }else if(this.state.RemainTime>0 && this.state.RemainTime<=8){//==1 || this.state.RemainTime==2|| this.state.RemainTime==4|| this.state.RemainTime==8
                    timeImg="../static/img/home_button_time_selected.png";
                    timeTextStyle= "text_switch"
                    llStype = "item_value";
                    settimer = this.state.RemainTime;
                }else if(this.state.RemainTime==255){
                    timeImg="../static/img/home_button_time_normal.png";
                    timeTextStyle= "text_switch"
                    llStype = "item_value_hide";
                }
                //uv 1开启 ，2 关闭
                if(this.state.uvSw==undefined){
                    uvImg = "../static/img/home_button_UV_disabled.png"
                    uvTextStyle= "text_switch_disable"
                }else if(this.state.uvSw==1){
                    uvImg = "../static/img/home_button_UV_selected.png"
                    uvTextStyle= "text_switch"
                }else if(this.state.uvSw==2){
                    uvImg = "../static/img/home_button_UV_normal.png"
                    uvTextStyle= "text_switch"
                }
                //anion 1开启 ，2 关闭
                if(this.state.anionSw==undefined){
                    anionImg="../static/img/home_button_fulizi_disabled.png"
                    anionTextStyle= "text_switch_disable"
                }else if(this.state.anionSw==1){
                    anionImg="../static/img/home_button_fulizi_selected.png"
                    anionTextStyle= "text_switch"
                }else if(this.state.anionSw==2){
                    anionImg="../static/img/home_button_fulizi_normal.png"
                    anionTextStyle= "text_switch"
                }


                if(this.state.ozoneSw==undefined){
                    OzoneImg = "../static/img/home_button_chouyang_disabled.png"
                    ozoneTextStyle= "text_switch_disable"
                }else if(this.state.ozoneSw == 1){
                    OzoneImg =  "../static/img/home_button_chouyang_selected.png";
                    ozoneTextStyle= "text_switch"
                }else if(this.state.ozoneSw == 2){
                    OzoneImg =  "../static/img/home_button_chouyang_normal.png";
                    ozoneTextStyle= "text_switch"
                }

                if(this.state.childLock==undefined){
                    childLockImg = "../static/img/home_button_tongsuo_disabled.png"
                    childLockTextStyle= "text_switch_disable"
                }else if(this.state.childLock ==1){
                    childLockImg = "../static/img/home_button_tongsuo_normal.png"
                    childLockText = "童锁关"
                    childLockTextStyle= "text_switch"
                }else if(this.state.childLock==2){
                    childLockImg = "../static/img/home_button_tongsuo_selected.png"
                    childLockText = "童锁开"
                    childLockTextStyle= "text_switch"

                    switchImg="../static/img/home_button_kaiguan_disabled.png";
                    modeImg = "../static/img/home_button_moshi_disabled.png";
                    windSpeedImg="../static/img/home_button_fefengsu_disabled.png";
                    timeImg="../static/img/home_button_time_disabled.png";
                    uvImg = "../static/img/home_button_UV_disabled.png"
                    anionImg="../static/img/home_button_fulizi_disabled.png"
                    OzoneImg = "../static/img/home_button_chouyang_disabled.png"

                    switchTextStyle = "text_switch_disable"
                    modeTextStyle= "text_switch_disable"
                    windSpeedTextStyle= "text_switch_disable"

                    timeTextStyle= "text_switch_disable"
                    uvTextStyle= "text_switch_disable"
                    anionTextStyle= "text_switch_disable"
                    ozoneTextStyle= "text_switch_disable"
                }

            }else if(this.state.powerOn==2){
                switchImg ="../static/img/home_button_kaiguan_normal.png";
                switchText = "开机"

               //如果关机，把其他的控制按钮全部重置为不可用状态
                modeImg = "../static/img/home_button_moshi_disabled.png";
                windSpeedImg="../static/img/home_button_fefengsu_disabled.png";
                timeImg="../static/img/home_button_time_disabled.png";
                uvImg = "../static/img/home_button_UV_disabled.png"
                anionImg="../static/img/home_button_fulizi_disabled.png"
                OzoneImg = "../static/img/home_button_chouyang_disabled.png"
                childLockImg="../static/img/home_button_tongsuo_disabled.png";

                modeTextStyle= "text_switch_disable"
                windSpeedTextStyle= "text_switch_disable"
                timeTextStyle= "text_switch_disable"
                uvTextStyle= "text_switch_disable"
                anionTextStyle= "text_switch_disable"
                ozoneTextStyle= "text_switch_disable"
                childLockTextStyle= "text_switch_disable"
                //timerState
                if(this.state.RemainTime<=0 || this.state.RemainTime==undefined || this.state.RemainTime>8){
                    llStype = "item_value_hide";
                }else{
                    llStype = "item_value";
                    settimer = this.state.RemainTime;
                }
            }
            let colorStyle="control_mode";
            if(this.state.modeWindowState==undefined){
                this.state.modeWindowState=1;
                colorStyle = "control_mode slide-up"
                if(this.state.RemainTime<=0  || this.state.RemainTime==undefined || this.state.RemainTime>8){
                    llStype = "item_value_hide";
                }else{
                    llStype = "item_value";
                    settimer = this.state.RemainTime;
                }
            }else if(this.state.modeWindowState==1){
                colorStyle = "control_mode slide-up"
                if( this.state.RemainTime<=0  || this.state.RemainTime==undefined || this.state.RemainTime>8){
                    llStype = "item_value_hide";
                }else{
                    llStype = "item_value";
                    settimer = this.state.RemainTime;
                }

            }else{
                colorStyle = "control_mode slide-down";
                llStype = "item_value_hide";
            }
            return (
                    <div className={colorStyle}>
                        <div className="control_layout_1">
                            <div className="control_mode_btn" onClick={this.handleSwitch}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={switchImg}/>
                                </div>
                                <div className={switchTextStyle}>{switchText}</div>
                            </div>
                            <div className="control_mode_btn" onClick={this.handleStandard}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={modeImg}/>
                                </div>
                                <div className={modeTextStyle}>{modeText}</div>
                            </div>

                            <div className="control_mode_btn" onClick={this.handleSpeedWind}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={windSpeedImg}/>
                                </div>
                                <div className={windSpeedTextStyle}>{windSpeedText}</div>
                            </div>

                            <div className="control_mode_btn" onClick={this.handleTiming}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={timeImg}/>
                                    <span className={llStype}>{settimer}</span>
                                </div>
                                <div className={timeTextStyle}>{timeText}</div>
                            </div>
                        </div>
                        <div className="control_layout_2">
                            <div className="control_mode_btn" onClick={this.handleUV}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={uvImg}/>
                                </div>
                                <div className={uvTextStyle}>{uvText}</div>
                            </div>
                            <div className="control_mode_btn" onClick={this.handleAnion}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={anionImg}/>
                                </div>
                                <div className={anionTextStyle}>{anionText}</div>
                            </div>
                            <div className="control_mode_btn" onClick={this.handleOzone}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={OzoneImg}/>
                                </div>
                                <div className={ozoneTextStyle}>{ozoneText}</div>
                            </div>
                            <div className="control_mode_btn" onClick={this.handleChildLock}>
                                <div className="mode_btn_icon_or_num">
                                    <img className="my_icon" src={childLockImg}/>
                                </div>
                                <div className={childLockTextStyle}>{childLockText}</div>
                            </div>
                        </div>
                        <div className="arrow_layout_control"><img src="../static/img/home_button_up.png" onClick={this.handleArrowUp}/></div>
                    </div>
            )
        }
}