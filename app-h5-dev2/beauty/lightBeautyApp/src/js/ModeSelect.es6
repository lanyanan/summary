'use strict';

import {Actions} from './Actions.es6';
export const ModeSelect = React.createClass({
	getInitialState: function(){
        return {
        	modeShow : false
        };
	},
	cancelMode: function(){
		let mode = this.state.modelIndex;
		Actions.setMode(mode);
	},
	modeAct: function(e){
		let target = parseInt(e.currentTarget.getAttribute('data-index'));
		Actions.setMode(target);
		e.stopPropagation();
		e.preventDefault();
	},
	componentWillReceiveProps: function(next){
		this.setState({
			modelIndex : next.modelIndex,
			modelShow: next.modeShow
		});
	},
	render: function() {
		let modeAct = this.state.modelIndex;
		let modeShow = (this.state.modelShow? "modeSelect" :"modeShow");
	    return (
	    	<section className={modeShow}>
	    		<section onTouchTap={this.cancelMode} className='canBG'></section>
	    		<section  className = 'modeCon' >
	    			{[{name:'清洁'},{name:'回春'},{name:'滋养'},{name:'美白'},{name:'自定义'}].map((item , index) =>{
	    				return(
	    					<span data-index = {index} key = {index} onTouchTap = {this.modeAct} className ='modeSpan'>{item.name}{modeAct == index?<i></i>:''}</span>
	    				);
	    			})}

	    		</section>
	    	</section>

	    );
	}
});