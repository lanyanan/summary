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
    	let temp = this.props.value;
        if(temp>39){
            temp=39;
        }else if(temp<35){
            temp=35;
        }

        let toLeft = (temp-35)*5+"rem",
            offset = Math.abs(temp-37),
            toTop=-1+1.15* offset +'rem';
            if(offset <= 1.5) toTop=-1+0.95*offset+'rem';
		//console.log(temp);
        return (
        	<p className='slide-circle'><span style={{'left':toLeft,'top':toTop}}></span></p>
        );
    }
});