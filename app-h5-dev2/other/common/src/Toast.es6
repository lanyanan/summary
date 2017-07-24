'use strict';
/**
 * toast组件
 * @prop {string} msg  消息
 * @prop {number} sec  存在秒数
 */

export const Toast = React.createClass({
	componentDidMount() {
		let sec = this.props.sec || 5;
		let dom = document.querySelector('#box-toast');
		dom.style.display = 'flex';
		setTimeout(()=>{
			dom.style.display = 'none';
		},sec*1000);
	},
	render(){
		let msg = this.props.msg || '指令下发成功';
		let sec = this.props.sec || 5;
		let css = {bottom:100};
        css.animation = "toastN " + sec + "s";
        // 兼容旧版
        css["WebkitAnimation"] = css.animation;
        css["MozAnimation"] = css.animation;
        css["OAnimation"] = css.animation;
	    return (
	    	<section id='box-toast' style={css} className='box-toast flex-column'>
	        	<section className="toast-main" >{msg}</section>
        	</section>
	    );
	}
});