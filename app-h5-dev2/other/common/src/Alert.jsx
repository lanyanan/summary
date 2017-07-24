let Alert = React.createClass({	
	propTypes: {
		isShowTitle: React.PropTypes.bool,  // 是否显示标题
		title: React.PropTypes.string,  // 提示对话框上显示的标题内容
		message: React.PropTypes.string,  // 提示对话框上显示的内容
		btnCancel: React.PropTypes.string,//提示对话框取消按钮显示的内容
		btnSure: React.PropTypes.string,  // 提示对话框上确认按钮显示的内容
		onAnimationLeave: React.PropTypes.func  // 提示对话框上关闭后的回调函数
	},
	getInitialState () {
		return {
			animationClassName: 'animation-alert-enter',
			opacity: 1
		};
	},
	getDefaultProps () {
		return {
			isShowTitle: true,
			title: '提示',
			message: '请添加内容',
			btnCancel:'取消',
			btnSure: '确定',
			onAnimationLeave: ()=>{}
		};
	},
	animationType: 'enter',//自定义对象属性，用以维护动画显隐
	animationEnd(){
		if(this.animationType == 'enter'){
			this.animationType = 'leave';
			this.setState({opacity: 1});
		}else{
			this.animationType = 'enter';
			this.setState({opacity: 0}/*,()=>{
				this.props.onAnimationLeave()
			}*/);
		}
	},
	componentDidMount(){
		//onAnimationEnd react 0.14版本不支持标签上的直接量写法onAnimationEnd={this.animationEnd}
		this.refs['cancel'].addEventListener('touchstart',()=>{
			this.props.childSetState({isShowAlert: false}); //父组件传入方法，子组件回调传值给父组件
		},false);
		this.refs['sure'].addEventListener('touchstart',()=>{
			this.props.childSetState({isShowAlert: false,sure:true});//父组件传入方法，子组件回调传值给父组件
		},false);
		this.refs['wrapper'].addEventListener('webkitAnimationEnd',()=>{
			this.animationEnd();
		},false);
	},
	btnTouchClose (e){
		this.setState({animationClassName: 'animation-alert-leave',close:1});
	},
	render () {
		let style = {
			wrapper: {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',		
				display: '-webkit-box', 
				WebkitBoxAlign: 'center',
				WebkitBoxPack: 'center',
				background: 'rgba(0,0,0,0.5)',
				opacity: this.state.opacity
			},
			innerBox: {	
				width: '86%',
				maxHeight: '60%',
				borderRadius: '5px',
				boxSizing: 'border-box',
				WebkitBoxSizing: 'border-box',
				background: 'rgba(255,255,255,1)',
				padding: '14px 0 0',
				borderRadius: '4px',
				boxShadow: '0 0 40px rgba(0,0,0,0.4)'
			},
			title: {
				padding: '0 17px 5px',
				color: 'black',
				fontSize: '18px',
				fontWeight:'bold',
				textAlign: 'center'
			},
			message: {
				margin: '0 17px 14px'
			},
			text: {
				margin: 0,
				fontSize: '16px',
				lineHeight: '26px',
				wordBreak: 'break-all',
				color: 'rgba(60,60,60,1)'
			},
			btnWrapperSingle: {
				height: '48px',
				textAlign: 'center',
				borderTop: '1px solid #e2e2e4'
			},
			btnWrapperAll: {
				height: '48px',
				lingHeight: '48px',
				textAlign: 'center',
				borderTop: '1px solid #e2e2e4'
			},
			btnWrapperAll: {
				before:{
					content:'',
					height: '100%',
					width: '1px'
				}
			},
			btnCancel:{
				width:'50%',
				border: '0',
				background: 'rgba(255,255,255,1)',
				borderRadius: '5px',
				color: '#000',
				fontSize: '17px',
				fontWeight: '700',
				outline:'none',
				lineHeight: '48px',
		        verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			},
			btnSure: {
				width:'50%',
				border: '0',
				borderRadius: '5px',
				background: 'rgba(255,255,255,1)',
				color: '#3285ff',
				fontSize: '17px',
				fontWeight: '700',
				outline:'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}

		};
		let btnWrapperName = '';
		let animationClassName = this.state.animationClassName;
		let title = this.props.isShowTitle ? (<h1 style={style.title}>{this.props.title}</h1>): null;

		return (
			<div style={style.wrapper} className={animationClassName} ref='wrapper' onAnimationEnd={this.animationEnd}>
				<div style={style.innerBox}>
					{title}
					<div style={style.message}><p style={style.text}>{this.props.message}</p></div>
					<div className="two-btn-wrapper">
						<input type='button' ref="cancel" value={this.props.btnCancel} style={style.btnCancel} onTouchStart={this.btnTouchClose} />
						<input type='button' ref="sure"   value={this.props.btnSure} style={style.btnSure} onTouchStart={this.btnTouchClose} />
					</div>
				</div>
		    </div>
		);
	}
});

export default Alert;
