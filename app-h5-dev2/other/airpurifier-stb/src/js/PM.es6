'use strict';
/**
 * 主界面组件
 * @prop {integer} airIndoorValue  室内空气质量值
 * @prop {integer} marker  机型 2
 * @prop {integer} PMIndoorValue  室内PM2.5值
 * @prop {integer} PMOutdoorValue  室外PM2.5值
 * @act  Actions.switch([event])  更改开机开关时触发
 * @act  Actions.childLock([event])  更改童锁开关时触发
 */
import {Actions} from './Actions.es6';

function indoorPMLevel(marker,pmLow,pmHigh){
    if (marker == 2) {
        switch(pmLow){
            case 1:
                return "优";
                break;
            case 2:
                return "良";
                break;
            case 3:
                return "中";
                break;
            case 4:
                return "差";
                break;
        }
    } else {
        return pmHigh+pmLow;
    }
}
function outdoorPMLevel(pm){
        let  str = "";
        if (pm < 35) {
            str = "优";
        } else if (pm < 75) {
            str = "良";
        } else if (pm < 115) {
            str = "中";
        } else if (pm < 150) {
            str = "差";
        } else {
            str = "严重";
        }
        return str;
}

export const PM = React.createClass({
	items : [
        {id:1, name:"优",value:"bg-y"},
        {id:2, name:"良",value:"bg-l"},
        {id:3, name:"中",value:"bg-z"},
        {id:4, name:"差",value:"bg-c"},
        {id:5, name:"---",value:"bg-y"},
        {id:6, name:"故障",value:"bg-w"}
    ],
    handlerSwitch: function(e) {
		return Actions.switch(e);
    },
    handlerChildLock: function() {
        Actions.childLock(this.props.lock==1?2:1);
    },
    render: function() {
        let lock = this.props.lock,
        marker = this.props.marker;


        return (
        	<section className="mainscreen bg-l">
        		<section className="devscreen">
    				<ul className="screenul">
    					<li className="titleli">室内空气质量</li>
    					<li className="airli">{indoorPMLevel(marker, this.props.pmLow,this.props.pmHigh)}</li>
    					<li className="templi">温度：{this.props.indoorTemp}&#8451;  |  湿度：{this.props.humidity}%</li>
                        <li className="pmli">PM2.5值：{indoorPMLevel(marker,this.props.pmLow,this.props.pmHigh)}</li>
    					<li className={this.props.thirstWarn==1?"pmli":'pmli warn'}>{this.props.thirstWarn==1?'正常':'缺水'}</li>
    				</ul>
        		</section>
        		<section className="flex outdoorscreen">
        			<div className="flex-cell divl"><img src="../static/img/airPurifier/location.png" />{this.props.location}<span className="inforspacing">{this.props.weather}</span>{this.props.outdoorTemp}&#8451;</div>
        			<div className="flex-cell divr">室外PM2.5 : {this.props.PMOutdoor} ({outdoorPMLevel(this.props.PMOutdoor) })</div>
        		</section>
        		<a href="javascript:void(0)" className="pos-a al"><img src={"../static/img/airPurifier/mood"+(lock==2?"-on":"")+".png"} onTouchEnd={this.handlerChildLock}  /></a>
        		<a href="javascript:void(0)" className="pos-a ar"><img src="../static/img/airPurifier/switch.png" onTouchEnd={this.handlerSwitch} /></a>
            </section>
        );
    }
});