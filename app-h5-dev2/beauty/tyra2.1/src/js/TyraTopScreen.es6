'use strict';
import {Actions} from './Actions.es6';

/**
 * [render description]
 * @param {[Integer]} [smartModeSwitch] [自动/手动模式 1表示智能模式，2表示手动模式]
 * @param {[Integer]} [onlineStatus] [设备离线状态 1表示在线，2表示离线]
 * @param {[Integer]} [electricity] [电量类型（1-电量5%及以下，2-电量10%及以下，3-电量20%及以下，4-电量大于20%小于30%，5-电量大于30%小于40%，6-电量40%小于50%，7-电量大于50%小于60%，8-电量大于60%小于70%，9-电量70%小于80%，10-电量大于80%小于90%，11-电量大于90%小于100%，12-电量100%，16-电池电压过高）]
 * @return {[type]}
 */
export const TyraTopScreen = React.createClass({
	handleBusiSwitch : function() {
        Actions.toggleBusi();
    },
	render : function(){
		let batteryOrLine = (<div></div>); //设备电量低或者离线在线
		if(this.props.electricity <= 3 && this.props.electricity > 0){
            batteryOrLine = (<div className="low-battery"></div>);
        }else if(this.props.onlineStatus == 2){
            batteryOrLine = (<div className="out-line"></div>);
        }else{
            batteryOrLine = (<div></div>);
        }
		return (
			<header>
                <div className = "logo">
                    {batteryOrLine}
                </div>
                <div className = "switchArea">
                    <div className = {this.props.smartModeSwitch === 1 ? "switchOn" : "switchOff"} onTouchEnd ={this.handleBusiSwitch}></div>
                </div>
            </header>
		);
	}
});