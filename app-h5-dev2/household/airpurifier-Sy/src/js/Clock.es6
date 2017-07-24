'use strict';
/**
 * 定时选择组件
 * @prop {integer} timeId  定时id，取值1-5
 * @act  Actions.toggleTimeClock([integer])  选择时间时触发
 */
import {Actions} from './Actions.es6';

export const Clock = React.createClass({
	getInitialState: function(){
        return {};
	},
	items: [
		{id:1, value:"0",data:25},
	    {id:2, value:"1",data:0x01},
	    {id:3, value:"2",data:0x02},
	    {id:4, value:"4",data:0x04},
	    {id:5, value:"8",data:0x08}
	],
	timeclock : function(){
		if(this.state.remaintimem || this.state.remaintimeh){
			if(this.state.remaintimem == 0){
				this.setState({remaintimem:59});
				let remaintimeh = this.state.remaintimeh -1;
				this.setState({remaintimeh:remaintimeh});
			}else{
				let remaintimem = this.state.remaintimem -1;
				this.setState({remaintimem:remaintimem});
			}
		}else if(this.props.remainTimeM || this.props.remainTimeH){
			if(this.props.remainTimeM == 0){
				this.setState({remaintimem:59});
				let remaintimeh = this.props.remainTimeH -1;
				this.setState({remaintimeh:remaintimeh});
			}else{
				let remaintimem = this.props.remainTimeM -1;
				this.setState({remaintimem:remaintimem});
			}
		}
	},
	componentDidMount: function() {
		this.setState({remainvalue:2});
		let _this = this;
		this.tclock = setInterval(function(){_this.timeclock()},60000);
	},
	componentWillReceiveProps: function(nextProps) {//获取设备预约剩余时间，保持和设备时间一致
		if(this.props.remainTime !== nextProps.remainTime){
			this.setState({
				remainvalue: nextProps.remainTime,
				remaintimeh: nextProps.remainTimeH,
				remaintimem: nextProps.remainTimeM
			});
		}
	},
	handlerPlusClick: function(e) {
		if(this.props.online==2) {
			Actions.toggleTimeClock(0);
			return;
		}
		let oid = parseInt(this.props.timeId);
		if(oid>0 && oid<5){
			oid+=1;
			this.setState({remainvalue:0});
			clearTimeout(this.retime);
			clearInterval(this.tclock);
		}
		else{
			return false;
		}
		e.preventDefault();
		let value = this.items[oid-1].data;
		Actions.toggleTimeId(value);
		let _this = this;
		this.retime = setTimeout(function(){
			_this.setState({remainvalue:1});
			_this.setState({remaintimeh:value});
			_this.setState({remaintimem:0});
			_this.tclock = setInterval(function(){_this.timeclock()},60000);
			Actions.toggleTimeClock(value);
		}, 5000);
	},
	handlerMinusClick: function(e) {
		if(this.props.online==2) {
			Actions.toggleTimeClock(0);
			return;
		}
		this.setState({remainvalue:0});
		clearTimeout(this.retime);
		clearInterval(this.tclock);
		let oid = parseInt(this.props.timeId);
		if(oid>1 && oid<6){
			oid-=1;
		}
		else{
			// console.log(this.props.remainTime,typeof this.props.remainTime);
			// Actions.toggleTimeClock(this.items[oid-1].data);
			return false;
		}
		e.preventDefault();
		let _this = this;
		let value = this.items[oid-1].data;
		Actions.toggleTimeId(value);//用于回显
        if(oid !== 1){
        	_this.retime = setTimeout(function(){
					        	_this.setState({remainvalue:1});
								_this.setState({remaintimeh:value});
								_this.setState({remaintimem:0});
								_this.tclock = setInterval(function(){_this.timeclock()},60000);
					        	Actions.toggleTimeClock(value);
								}, 5000);
        }else{
        	_this.setState({remainvalue:0});
        	Actions.toggleTimeClock(value);
        }
	},
	render: function() {
	    let tid = parseInt(this.props.timeId);
	    let remainvalue = (typeof this.state.remainvalue !== "undefined" && this.state.remainvalue!=2 && this.props.online!=2 &&this.props.timeId!=1) ? this.state.remainvalue : this.props.remainTime;
	    let remaintimeh = (typeof this.state.remaintimeh !== "undefined" && this.props.online!=2 &&this.props.timeId!=1) ? '0'+this.state.remaintimeh : '0'+this.props.remainTimeH;
	    let remaintimem = (typeof this.state.remaintimem !== "undefined" && this.props.online!=2 &&this.props.timeId!=1) ? this.state.remaintimem : this.props.remainTimeM;
	    	remaintimem = remaintimem<10 ? '0'+remaintimem : remaintimem;
	    return (
	        <section className="clock flex">
	        	<span className="boxtitle flex-cell">定时</span>
	            <span className="flex-cell left-btn"    onTouchEnd={this.handlerMinusClick} ></span>
	            <span className={"center-cell "+(remainvalue?"mvalue-off":"mvalue-on")}>{this.items[tid-1].value}<span className="svalue">(小时)</span></span>
	            <span className={"center-cell "+(remainvalue?"remain-on":"remain-off")}><span className="svalue">(剩余)</span>{remaintimeh}:{remaintimem}</span>
	            <span className="flex-cell right-btn"   onTouchEnd={this.handlerPlusClick} ></span>
	        </section>
	    );
	}
});