'use strict';

import {Actions} from './Actions.es6';
export const Swicth = React.createClass({
	getInitialState: function(){
        return {
        	modeSwicth:0
        };
	},
	modeSwicth: function(){
		let modelIndex = this.state.mode;
		let target = this.state.modeIndex;
		Actions.modeSwicth(modelIndex,target);
	},
	modeSwi: function(e){
		let target = parseInt(e.currentTarget.getAttribute('data-index'));
		let modelIndex = this.state.mode;
		Actions.modeSwicth(modelIndex,target);
		e.stopPropagation();
		e.preventDefault();
	},
	componentWillReceiveProps: function(next){
		this.setState({
			modeIndex : next.swicthIndex,
			modelSwitchShow: next.switchShow,
			mode:next.mode
		});
	},
	render: function() {
		let modeSwicth = this.state.modeIndex;
		let modeOpen = (this.state.modelSwitchShow ? "modeOpen" :"modeClose");
	    return (
	    	<section className = {modeOpen}>
	    		<section onTouchTap={this.modeSwicth} className = 'canBG'></section>
	    		<section  className = 'modeCon modeOpenBG' >
	    			{[{name:'开'},{name:'关'}].map((item , index) =>{
	    				return(
	    					<span data-index = {index} key = {index} onTouchTap={this.modeSwi} className ='modeSpan'>{item.name}{modeSwicth == index?<i></i>:''}</span>
	    				);
	    			})}

	    		</section>
	    	</section>

	    );
	}
});