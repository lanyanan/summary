'use strict';
/**
 * 主界面组件
 * @prop {integer} airIndoorValue  室内空气质量值
 * @prop {integer} PMIndoorValue  室内PM2.5值
 * @prop {integer} PMOutdoorValue  室外PM2.5值
 * @prop {integer} VOCValue VOC等级
 * @prop {integer} headerTop 顶部距离
 * @act  Actions.switch([event])  更改开机开关时触发
 * @act  Actions.childLock([event])  更改童锁开关时触发
 */
import {Actions} from './Actions.es6';

export const PM = React.createClass({
	items : [
        {id:1, name:"优",value:"bg-y"},
        {id:2, name:"良",value:"bg-l"},
        {id:3, name:"中",value:"bg-z"},
        {id:4, name:"差",value:"bg-c"},
        {id:5, name:"---",value:"bg-y"},
        {id:6, name:"故障",value:"bg-w"}
    ],
    getInitialState: function(){
        return {};
    },
    handlerSwitch: function(e) {
		return Actions.switch(e);
    },
    handlerChildLock: function() {
        let value = this.props.lock==1?16:1;
        Actions.childLock(value);
    },
    render: function() {
    	let vocid = this.props.VOCValue ? this.props.VOCValue : 2;
    	let vocvalue = this.items[vocid-1].name;
    	let bglevel = this.items[vocid-1].value;
        let lock = this.props.lock;
        return (
        	<section className={"mainscreen "+(bglevel)} style={{'paddingTop':this.props.headerTop}}>
        		<section className="devscreen">
	    				<ul className="screenul">
	    					<li className="titleli">室内空气质量</li>
	    					<li className="airli">{this.props.airIndoorValue}</li>
	    					<li className="pmli">PM2.5值:{this.props.innerPMLevel}</li>
	    					<li className="vocli">VOC:{vocvalue}</li>
	    				</ul>
        		</section>
        		<section className="flex outdoorscreen">
        			<div className="flex-cell divl"><img src="../static/img/airPurifier/location.png" />  {this.props.location}<span className="inforspacing">{this.props.weather}</span>  {this.props.temperature}&#8451;</div>
        			<div className="flex-cell divr">室外PM2.5 : {this.props.PMOutdoor} ( {this.props.outerPMLevel} )</div>
        		</section>
        		<a href="javascript:void(0)" className="pos-a al"><img src={"../static/img/airPurifier/mood"+(lock==16?"-on":"")+".png"} onTouchEnd={this.handlerChildLock}  /></a>
        		<a href="javascript:void(0)" className="pos-a ar"><img src="../static/img/airPurifier/switch.png" onTouchEnd={this.handlerSwitch} /></a>
            </section>
        );
    }
});