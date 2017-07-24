import {Store} from './Store.jsx';
import {Actions} from './Actions.jsx';
import {Wave2} from './Wave2.jsx';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
/**
 * Created by mindray on 2017/1/4.
 *
 * 显示室内空气参数的UI部分
 */

// 接收app推送数据
het.repaint((data)=>{
    // console.log(data);
    Actions.repaint(data);
});
export class RunUI extends BaseComponent{
    /**
     * 控件初始化的时候，设置的默认参数
     * */
    constructor(props) {
        super(props);
        this.listenStore(Store); // 监听Store
    }
    render() {
        let ambientTemp;
        if(this.state.ambientTemp== undefined){
            ambientTemp = "- -";
        }else{
            ambientTemp = "温度:"+(this.state.ambientTemp-100)+"℃";
        }
        let pmVal;
        if(this.state.pmVal== undefined){
            pmVal = "- -";
        }else{
            pmVal = "PM2.5:"+this.state.pmVal;
        }
        let str =  pmVal+" | "+ambientTemp;

        let airQty;
        if(this.state.airQty == undefined){
            airQty="未知"
        }else{
            if(this.state.airQty==0){
                airQty="优"
            }else if(this.state.airQty==1){
                airQty="良"
            }else if(this.state.airQty==2){
                airQty="中"
            }else if(this.state.airQty==3){
                airQty="差"
            }
        }
        // let controlShowStype="main_top_center_x"
        let conent1 = "净化器已关闭";
        let conent2 = "点击[开机]开启";
        let close_container = "device_close_container"
        if( this.state.networkavailable==2){
            conent1 = "手机网络异常";
            conent2 = "请查看手机网络是否打开";
            close_container="device_close_container show"
        }else if( this.state.online==2){
            conent1 = "净化器已离线";
            conent2 = "";
            close_container="device_close_container show"
        }else if(this.state.powerOn == undefined){
            //controlShowStype="main_top_center_x hide"
            close_container="device_close_container show"
        }else if(this.state.powerOn ==1){
            //controlShowStype="main_top_center_x show"
            close_container="device_close_container hide"
        }else if(this.state.powerOn ==2){
            //controlShowStype="main_top_center_x hide"
            close_container="device_close_container show"
            conent1 = "净化器已关闭";
            conent2 = "点击[开机]开启";
        }
        // console.log("this.state.isShowAlert message onoff "+this.state.powerOn );
        return(
            <div className="main_top">
                <div className={"main_top_center_x"}>
                    <div className="main_top_center">
                        <div className="main_top_center_inner_1">
                            <Wave2/>
                        </div>
                        <div className="mian_top_show_data">
                            <p className="show_indoor_item">室内</p>
                            <p className="show_indoor_air_quality_item">{airQty}</p>
                            <p className="show_indoor_pm_and_temp_item">{str}</p>
                        </div>
                    </div>
                </div>
                <div className={close_container}>
                    <div className="off_line">
                        <div className="content">{conent1}</div>
                        <div  className="content">{conent2}</div>
                    </div>
                </div>
            </div>
        );
    }
}