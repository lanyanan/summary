'use strict';
/**
 * 负离子开关组件
 * @prop {integer} anSwitchValue  负离子开关value值
 * @act  Actions.toggleAnion([integer])  更改负离子开关时触发
 */
import {Actions} from './Actions.es6';

export const Anion = React.createClass({
    getInitialState: function(){
        return {};
    },
    handlerSwitch: function(e) {
    	let value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.anSwitchValue)==1 ? 16 : 1;
        e.preventDefault();
        //this.setState({value:value});
        Actions.toggleAnion(value);
    },
    render: function() {
        let anvalue = typeof this.state.value !== "undefined" ? this.state.value : this.props.anSwitchValue;
        return (
        	<section className="flex anion">
        			<span className="boxtitle flex-cell">负离子</span>
	            <span className="flex-cell ">
	                <a href="javascript:void(0);" onTouchEnd={this.handlerSwitch} className={(anvalue == 1 ? "off" : "on")}></a>
	            </span>
            </section>
        );
    }
});