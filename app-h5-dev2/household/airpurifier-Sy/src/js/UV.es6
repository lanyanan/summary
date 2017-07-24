'use strict';
/**
 * 紫外线开关组件
 * @prop {integer} uvSwitchValue  开关value值
 * @act  Actions.toggleUV([integer])  更改紫外线开关时触发
 */
import {Actions} from './Actions.es6';

export const UV = React.createClass({
    getInitialState: function(){
        return {};
    },
    handlerSwitch: function(e) {
    	let value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.uvSwitchValue)==1 ? 16 : 1;
        e.preventDefault();
        //this.setState({value:value});
        Actions.toggleUV(value);

    },
    render: function() {
        let uvvalue = typeof this.state.value !== "undefined" ? this.state.value : this.props.uvSwitchValue;
        return (
        	<section className="flex uv">
        			<span className="boxtitle flex-cell">紫外线</span>
	            <span className="flex-cell ">
	                <a href="javascript:void(0);" onTouchEnd={this.handlerSwitch} className={(uvvalue == 1 ? "off" : "on")}></a>
	            </span>
            </section>
        );
    }
});