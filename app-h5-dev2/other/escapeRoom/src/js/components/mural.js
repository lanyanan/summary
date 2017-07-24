import {gameActions} from '../actions/actions';


/* 壁画 */
export default class Mural extends React.Component{
		constructor(){
			super();
			this.state = {
				index: 0
			}
		}

		componentWillMount(){
			this.msg = [
				'智能睡眠工具包含四个部分，每个部分都需要和手机绑定才能使用。悄悄告诉你，用手机把工具调节到最佳状态，整个房间才会恢复正常。',
				'赶紧集齐所有工具，在它们的帮助下美美睡上一觉吧。不然，你就真的再也醒不来了…'
			]
		}

		componentDidMount(){
			var msg = this.props.flampOpen ? '看不清楚上面写的什么，是不是灯光的原因呢？' : '这难道是逃脱秘籍？';
			gameActions.showPrompt(msg);
		}	

		render(){
			var msg = this.msg[this.state.index];
			return (
					<div className='mural_big' src='' onTouchEnd={this.stopPro} >
						{!this.props.flampOpen ? <div className='mural_mask'></div> : ''}
						{!this.props.flampOpen ? <div className='mural_msg'>
							{this.state.index > 0 ? <div className='prev_page' onTouchEnd={this.prev.bind(this)}><img src='../static/images/icon/down-arrow.png' /></div> : ''}
							<div style={{textAlign:'left'}}>{msg}</div>
							{this.state.index < 1 ? <div className='next_page' onTouchEnd={this.next.bind(this)}><img src='../static/images/icon/down-arrow.png' /></div> : ''}
						</div>
						: ''}
						{this.props.showPaper ? <div className='paper_small' onTouchEnd={this.pickedPaper.bind(this)}></div> : ''}
					</div>
				)
		}

		prev(){
			if(this.state.index > 0) this.setState({index: this.state.index - 1})
		}

		next(){
			if(this.state.index < 1) this.setState({index: this.state.index + 1})
		}

		pickedPaper(){
			gameActions.showPaper(9);
		}

		stopPro(e){
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
		}
		
	}