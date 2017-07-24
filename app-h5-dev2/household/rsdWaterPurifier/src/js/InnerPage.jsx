'use strict';
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
export const InnerPage = React.createClass({
	getInitialState: function(){
        return {};
	},
	render: function() {
		let percent = this.props.percent;
		let rightCircle = this.props.rightCircle;
		let leftCircle = this.props.leftCircle;
	    return (
			<div className="setting-percent">
				<div className="circle-progress-wrapper">
					{parseInt(percent)}%
					<div className="wrapper right">
						<div className="circle-progress right-circle" style={{'WebkitTransform': 'rotate('+rightCircle+'deg)'}}></div>
					</div>
					<div className="wrapper left">
						<div className="circle-progress left-circle" style={{'WebkitTransform': 'rotate('+leftCircle+'deg)'}}></div>
					</div>
				</div>
			</div>
	    );
	}
});