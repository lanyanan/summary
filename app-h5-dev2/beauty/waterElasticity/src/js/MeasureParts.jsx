'use strict';
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
let iScroll = null;
export const MeasureParts = React.createClass({
	componentDidMount (){
		//let navHeight = this.refs.nav.offsetHeight;
		//this.props.childSetState({navHeight: navHeight})//子组件通过回调函数的方式传参数给父组件
		iScroll = new IScroll('#iScroll', {
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			preventDefault: false
		});
	},
	render:function(){
		let selectPart = this.props.selectPart;
		let part = this.props.part;
		let partArr= this.props.partArr;
		let Btns = partArr.map(function(item,index){
			return(
				index>0 &&
				<li key={index} ref="part" data-part={index} className={(index==part && part!='')?'mode on':'mode'} onClick={selectPart}>
					<img src={'../static/img/btns/i-nav-'+(index)+((index==part && part!='')?'-on.png':'-off.png')}/>
					<span>{item}</span>
				</li>
			)
		}.bind(this));
		return <figure id="iScroll">
					<div id="scroller">
						<ul>{Btns}</ul>
					</div>
		       </figure>
	}
})



