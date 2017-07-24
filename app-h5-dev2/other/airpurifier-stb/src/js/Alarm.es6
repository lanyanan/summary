'use strict';
/**
 * 报警声开关组件
 * @prop {integer} thirstVoice  开关value值
 * @act  Actions.toggleUV([integer])  更改报警声开关时触发
 */
import {Actions} from './Actions.es6';

export const Alarm = React.createClass({
    getInitialState: function(){
        return {};
    },
    handlerSwitch: function(e) {
    	let thirstVoice = this.props.thirstVoice;
        Actions.toggleAlarm(thirstVoice==1?2:1);
    },
    render: function() {
        let thirstVoice =  this.props.thirstVoice;
        return (
        	<section className="flex uv">
        			<span className="boxtitle flex-cell">报警声</span>
	            <span className="flex-cell ">
	                <a href="javascript:void(0);" onTouchEnd={this.handlerSwitch} className={(thirstVoice == 1 ? "off" : "on")}></a>
	            </span>
            </section>
        );
    }
});