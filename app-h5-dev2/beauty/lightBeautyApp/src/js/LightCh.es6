'use strict';

import {Actions} from './Actions.es6';
export const LightCh = React.createClass({
	getInitialState: function(){
        return {
        	modeLight : 1
        };
	},
	modeSwicth: function(){
		let target = this.state.lightIndex;
		let mode = this.state.mode;
		Actions.setLight(mode,target);
	},
	modeSwi: function(e){
		let target = parseInt(e.currentTarget.getAttribute('data-index'));
		let mode = this.state.mode;
		Actions.setLight(mode,target);
		e.stopPropagation();
		e.preventDefault();
	},
	componentWillReceiveProps:function(next){
		this.setState({
			mode:next.mode,
			lightShow:next.lightShow,
			lightIndex: next.lightIndex
		});
	},
	render: function() {
		let lightIndex = this.state.lightIndex;
		let lightOpen = (this.state.lightShow? "lightOpen" :"lightClose");
	    return (
	    	<section className = {lightOpen}>
	    		<section onTouchTap={this.modeSwicth} className = 'canBG'></section>
	    		<section  className = 'modeCon lightOpenBG' >
	    			{[{name:'红光'},{name:'蓝光'},{name:'绿光'},{name:'关闭'}].map((item , index) =>{
	    				return(
	    					<span data-index = {index} key = {index} onTouchTap = {this.modeSwi} className ='modeSpan'>{item.name}{lightIndex == index?<i></i>:''}</span>
	    				);
	    			})}

	    		</section>
	    	</section>

	    );
	}
});