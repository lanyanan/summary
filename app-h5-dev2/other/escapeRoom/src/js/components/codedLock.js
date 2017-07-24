import {globActions,gameActions} from '../actions/actions';


export default class CodedLock extends React.Component{
		constructor(){
			super();

			this.state = {value: '',color:''}
			this.PASSWORD = '88006008';
			this.isCommited = false;
		}

		componentWillUnmount(){
			this.interval && clearInterval(this.interval);
		}

		render(){
			var btns = [], i;

			for(i = 0; i < 12; i++){
				btns.push(<div key={i} className={'btn btn' + i} onTouchEnd={this.setValue.bind(this,i)}></div>)
			}
			
			return (
				<div className='coded_lock_wrap' onTouchEnd={this.stopPro}>
					<input className={'pwd_input ' + this.state.color} type='text' placeholder='请输入8位数密码' value={this.state.value} readOnly />
					<div>{btns}</div>
				</div>
			)
		}

		setValue(i){
			var val = this.state.value, color;

			this.interval && clearInterval(this.interval);
			gameActions.showPrompt('');
			audios['keypress'].currentTime = 0;
			audios['keypress'].play();

			// 删除
			if(i === 10){
				val = val.substring(0, val.length - 1)

			// 确认
			}else if(i === 11){
				this.submit();

			}else{
				val.length < 8 ? val += i : ''; 
			}

			if(val.length === 8 && val === this.PASSWORD && this.props.overstep === 4){
				color = 'green';
				gameActions.showPrompt('恭喜你找到了正确密码，可以逃离这个密室啦');
			}else{
				color = '';
			}

			this.setState({value:val, color:color});
		}	

		stopPro(e){
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
		}

		submit(){
			if(this.state.color === 'green'){
				if(this.isCommited) return;
				gameActions.timeStop();
				gameActions.commitData(function(res){})

				document.querySelector('.timer').style.display = 'none';
				audios['bgm'].pause();

				setTimeout(()=>{
					audios['closedoor'].currentTime = 0;
					audios['closedoor'].play();
					

					setTimeout(()=>{
						gameActions.commit({overstep:5,showMaskLayer:true});
						
						audios['cheer'].currentTime = 0;
						audios['cheer'].play();
						globActions.showRank(true);
					},1800)

				},1000)
				
				
			}else{
				gameActions.showPrompt('密码错误');
				this.setState({color:'red'});
				this.interval = setInterval(()=>{
					var color = this.state.color==='red' ? 'brown' : 'red';
					this.setState({color:color})
				},500)
			}
		}

		
	}