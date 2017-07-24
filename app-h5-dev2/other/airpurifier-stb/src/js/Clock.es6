'use strict';
/**
 * 预约选择组件
 * @prop {integer} bookTime  定时，取值1-24
 * @act  Actions.toggleTimeClock([integer])  选择时间时触发
 */
import {Actions} from './Actions.es6';

export const Clock = React.createClass({
	getInitialState: function(){
        return {bookTime:this.props.bookTime};
	},
	handlerPlusClick: function(e) {
		let bookTime = this.state.bookTime;
		if(bookTime<24){
			++bookTime;
			this.setState({bookTime: bookTime});
			Actions.bookTime(bookTime);

		} 
	},
	handlerMinusClick: function(e) {
		let bookTime = this.state.bookTime;
		if(bookTime>0){
			--bookTime;
			this.setState({bookTime: bookTime});
			Actions.bookTime(bookTime);

		}
 	},
	render: function() {
		let bookTime = this.state.bookTime;
	    return (
	        <section className="clock flex">
	        	<span className="boxtitle flex-cell">预约</span>
	            <span className="flex-cell left-btn"    onTouchEnd={this.handlerMinusClick} ></span>
	            <span className="flex-cell time">
	            	<b>{bookTime>0?bookTime:''}</b>
	            	<span className="svalue">{bookTime>0?'(小时)':'无预约'}</span>
	            </span>
	            <span className="flex-cell right-btn"   onTouchEnd={this.handlerPlusClick} ></span>
	        </section>
	    );
	}
});