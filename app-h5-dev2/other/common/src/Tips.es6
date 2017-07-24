'use strict';
/**
 * tips组件
 * @prop {string} msg  弹框消息
 * @prop {string} btn1  确定按钮文字
 * @prop {string} btn2  取消按钮文字
 * @prop {boolean} show  弹框是否显示
 * @prop {boolean} layerCancel  点击透明遮罩背景部分是否触发取消回调
 * @prop {function} sucCallback  用户点击确定的回调事件
 * @prop {function} errCallback  用户点击取消的回调事件
 */

export const Tips = React.createClass({
	getInitialState(){
		return{show:false};
	},
	componentDidMount() {
		if(this.props.show===true){
			this.setState({
				show:true
			});
		}
	},
	componentWillReceiveProps(nextProps){
		if(!this.props.show && nextProps.show === true){
			this.setState({
				show:true
			});
		}
	},
	boxtouch(e){
		e.preventDefault();
		e.stopPropagation();
		if(this.props.layerCancel && e.target.getAttribute('id') == 'tips'){
			this.noTouch(e);
		}
	},
	yesTouch(e){
		e.preventDefault();
		e.stopPropagation();
		if(typeof this.props.sucCallback === 'function'){
			this.props.sucCallback();
		}
		this.setState({
			show:false
		});
	},
	noTouch(e){
		e.preventDefault();
		e.stopPropagation();
		if(typeof this.props.errCallback === 'function'){
			this.props.errCallback();
		}
		this.setState({
			show:false
		});
	},
	render: function() {
		let msg = this.props.msg || '';
		let show = this.state.show || false;
		let btn1 = this.props.btn1;
		let btn2 = this.props.btn2;
	    return (
	    	<section className='tips' id="tips" onTouchStart={this.boxtouch} style={{display:show?'block':'none'}}>
	        	<section className="tips-main" >
	        		<p className='box-tips'>{msg}</p>
	        		<div className='box-btn' onTouchEnd={this.yesTouch}>{btn1 || '确定'}</div>
	        		<div className='box-btn' onTouchEnd={this.noTouch}>{btn2 || '取消'}</div>
	        	</section>
        	</section>
	    );
	}
});