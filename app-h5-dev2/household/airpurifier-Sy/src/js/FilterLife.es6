'use strict';
/**
 * 滤网寿命提示组件
 * @prop {integer} remainingLife  剩余寿命值
 * @act  Actions.toggleFilterLife([integer])  滤网寿命有更改时触发
 */
import {Actions} from './Actions.es6';

export const FilterLife = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
    	let value = Math.abs(Math.round((2000-this.props.remainingLife)/2000*10000)/100.00);
			value = value>100?"100%":value+"%";
        let remainingLife = isNaN(parseInt(2000-this.props.remainingLife, 10)) ? "" : parseInt(2000-this.props.remainingLife, 10);
        return (
        	<div className="flex filterlife">
        		<span className=" boxtitle">滤网寿命</span>
        		<span className="flex-cell rangespan">
		            {/*<input  type="range"  />*/}
					{/*<input style={{width:value}} type="range" />*/}
                    <div id='fa' ></div>
                    <div style={{width:value}}  id='fb'></div>
				</span>
				<span className="smalltitle">(剩余:{remainingLife}小时)</span>
            </div>
        );
    }
});