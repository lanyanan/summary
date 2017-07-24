'use strict';
/**
 * 体温高低提示组件
 * @prop {integer} temp  体温值
 * @四个等级>35，36~37.2，37.2~38 ， >39
 */
import {Actions} from './Actions.es6';
export const TempHint = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
    	let maxtemp = Number(Number(this.props.maxtemp).toFixed(2)) || '--';
        return (
        	 <p className="tempOneTime flex">一小时内最高体温<em>{maxtemp}<b>°C</b></em><span className="temp-time"><i></i>{this.props.maxtime}</span></p>
        );
    }
});