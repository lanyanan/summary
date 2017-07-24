'use strict';

import {Actions} from './Actions.es6';
export const Export = React.createClass({
	getInitialState: function(){
        return {
        	
        };
	},
	modeSwicth: function(){
		let modeSwicth = this.state.modeSwicth;
		Actions.modeExt(modeSwicth);
	},
	modeSwi: function(e){
		let target = e.currentTarget.getAttribute('data-index');
		this.setState({modeSwicth:target});
	},
	subSwi: function(){
		let modeSwicth = this.state.modeSwicth;
		
		Actions.showExt(modeSwicth);
	},
	render: function() {
		let modeSwicth = this.state.modeSwicth || 1;
		let extOpen = (this.props.extOpen == 'extOpen' ? "extOpen" :"extClose");
	    return (
	    	<section className = {extOpen}>
	    		<section onTouchEnd={this.modeSwicth} className = 'canBG modeBG modeExt'></section>
	    		<section  className = 'modeCon modeOpenBG modeExport' >
	    			{[{name:'确定'},{name:'导入'},{name:'导出'}].map((item , index) =>{
	    				return(
	    					<span data-index = {index} key = {index} onTouchEnd = {index == 0 ? this.subSwi : this.modeSwi} className ={index == 0?('modeSpan'+' '+'extSpan'):'modeSpan'}>
	    					{item.name}{(modeSwicth == index && index != 0)?<i></i>:''}</span>
	    				);
	    			})}

	    		</section>
	    	</section>

	    );
	}
});