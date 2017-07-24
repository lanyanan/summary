import {gameActions} from '../actions/actions';
import {bindStore} from '../stores/bindStore';


/* 壁画 */
export default class PromptLine extends React.Component{
		componentWillMount(){
			this.state = {shake:'',msg:''};
			this.index = 0;
		}

		componentDidMount(){
			this.arrowInterval = setInterval(()=>{
				if(this.isMsgList(this.props.msg)){
					this.setState({
						isHide:!this.state.isHide,
					})
				}
			},500);

			this.removeListener = bindStore.listen(this.accept.bind(this));
		}

		componentWillUnmount(){
			clearInterval(this.arrowInterval);
			this.removeListener();
		}

		componentWillReceiveProps(nextProps){
			if(this.props.msg != nextProps.msg){
				clearInterval(this.fontInterval);
				this.index = 0;

				if(this.isMsgList(nextProps.msg)){
					this.msg = nextProps.msg[0];
					this.state = {index:0};

				}else{
					this.msg = nextProps.msg;
					this.state = {index:undefined};
				}

				this.fontInterval = window.setInterval(()=>{
					if(this.index < this.msg.length)
						this.setState({msg: this.msg.substring(0,++this.index)})
					else 
						clearInterval(this.fontInterval);

				},50);

			}
		}

		render(){
			var hasNext = this.state.index != undefined &&  this.state.index < (this.props.msg.length - 1) && this.index == this.msg.length;
			return (
					<div className='prompt_line' onTouchEnd={this.next.bind(this)}>
						<div className='opa_bg'></div>
						<p>{this.state.msg}{hasNext ? <i className={'next_icon ' + (this.state.isHide ? 'hidden' : '')} ></i> : ''}</p>
						<i className={'chests ' + (this.props.isOpened ? 'open ' : 'close ') + this.state.shake} onTouchEnd={this.toggleEquip.bind(this)}></i>
					</div>
				)
		}

		accept(data){
			if(data && data.action === 'boxShake'){
				this.setState({shake:'shake'})
			}
		}

		isMsgList(msg){
			return msg && Object.prototype.toString.apply(msg) === '[object Array]';
		}

		next(msg){
			var index = this.state.index + 1,
				msg = this.props.msg[index];

			if(!msg) return;

			this.fontInterval && clearInterval(this.fontInterval);

			this.msg = msg;

			this.setState({index: index},()=>{
				this.index = 0;
				this.fontInterval = setInterval(()=>{
					this.setState({msg: this.msg.substring(0,++this.index)})
				},50);
			});
		}

		// 切换工具栏
		toggleEquip(e){

			// 有大图显示时不允许切换工具栏
			if(this.props.bigIcon) return;

			gameActions.toggleEquip({
				showMaskLayer: false,
				isOpened:!this.props.isOpened
			})

			e.stopPropagation();
		}
	}