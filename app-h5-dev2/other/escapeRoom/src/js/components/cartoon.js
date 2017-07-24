import {globActions,gameActions,bindActions} from '../actions/actions';

var audio1 = [{name:'bgm',path:'bgm.mp3'},{name:'closedoor',path:'closedoor.mp3'},{name:'iphone',path:'iphone.mp3'},{name:'cheer',path:'cheer.wav'}];


export default class Cartoon extends React.Component{

	static defaultProps={
		cindex: 0,		// 要显示的动画的索引值
		hide: false		// 是否隐藏该组件
	};

	/*要显示的动漫，总共有10张。
		text: 要显示的文本	default: ''
		bgi:  背景图		default: 'text'
		audio 背景音乐		defalut: null
	*/
	cartInfo = [
		{text:'又加了好几天的班', bgi:1},
		{text:'身体快要吃不消'},
		{bgi:3},
		{bgi:4},
		{bgi:5},
		{bgi:6, audio:'snore'},
		{text:'这是什么声音？是谁的电话吗？'},
		{text:'等等…我的头好晕…'},
		{text:'我应该…在家休息才对…可是，这是哪里？'},
		{text:'难道是因为那个手机吗？'},
		{text:'我被困在这里了！要怎么样才能出去…'},
		{text:'谁快来帮帮我…'},
		{text:'我太累了，好想睡上一觉'},
		{text:'这个密室的秘密  再与我无关...'},
		{text:'也许梦醒了 我就能逃出这个密室了...'}
	];
	
	// 放弃捡手机后要显示的动漫											
	giveupArr = [['为什么我一直在加班','感觉身体轻飘飘'],['这么晚了…加了好几天的班','感觉身体被掏空…'],'好了，别闹，捡一下手机呗','不要闹了哈，再不捡手机你又要加班了','老板在看着你呢','你到底捡不捡？'];

	constructor(props){
		super(props);
		
		this.events = this.fevent();
		this.state = {hideText:''};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.cindex !== nextProps.cindex){
			this.locked = false;
			this.closeAudio(this.props.cindex-1);
			this.openAudio(nextProps.cindex-1);
		}
	}

	componentDidMount(){
		this.openAudio(this.props.cindex);
	}

	componentWillUnmount(){
		this.closeAudio(this.props.cindex);
	}

	render(){	
		var arr = [],
			evs = this.events,
			self = this,
			{hideText, showSence, shadow} = this.state;

		return (
			<div className={'cartoon' + (this.props.hide ? ' hidden' : '')}>

				{this.cartInfo.map((item, index)=>{
					let i = index + 1,
						style = {backgroundImage: 'url(../static/images/H5-'+ (item.bgi || 'text') +'.png)'}

					return (
						<div className={'cartoon_img '+ (this.props.cindex === i ? 'show' : '')} style={style} onTouchEnd={evs.next}  key={index}>
							
							{i === 6 && shadow && <div className='shadow'></div>}

							{do{
								// 添加是否捡手机选项按钮
								if(i === 4){
									<div>
										<div className='pickup_btn' onTouchEnd={evs.pickup}></div>
										<div className='nopickup_btn' onTouchEnd={evs.unpickup}></div>
									</div>
								}

								else if(i === 7){
									<div className={'cartoon_text '+ hideText}>{item.text}
										{showSence && <div className='shadow7'></div>}
									</div>
								}else{
									item.text && <div className={i ===1 ? 'cartoon1_text' : 'cartoon_text'}>{item.text}</div>
								}
							}}
						</div>
					)
				})}
			</div>
		)
	}

	/* 事件 */
	fevent(){
		var self = this,

			// 放弃捡手机的次数
			loops = 0;

		return{
			// 下一个要显示的动漫
			next(){
				var cindex = self.props.cindex;

				if(cindex === 1 && loops === 0) {
					self.fixAudioIOSbug(audio1);
					//setTimeout(()=>audios['bgm'].play(),2500);
				}

				if(self.locked) return;
				
				switch(cindex){

					case 2: loops > 2 ? self.jump(4) : self.jump(3); break;

					case 4: return;

					case 6:
						self.setState({shadow:true});

						self.locked = true;

						setTimeout(()=>{
							self.jump(cindex + 1)
						},1500);
						return;

					case 12: globActions.nextStep();
						break;

					default: self.jump(cindex + 1);break;
				}
			},

			// 捡手机
			pickup(){
				self.jump(5);

				audios['iphone'].loop = true;
				audios['iphone'].play();
				audios['iphone'].pause();
			},

			// 不捡手机
			unpickup(){
				var s = self.giveupArr[loops++];
				if(!s){
					self.jump(2);
				}else if(typeof s=== 'string'){
					self.cartInfo[1].text = s;
					self.jump(2);
				}else{
					self.cartInfo[0].text = s[0];
					self.cartInfo[1].text = s[1];
					self.jump(1);
				}
			}
		}
	}

	/* 跳转到指定页 */
	jump(index){
		var self = this;
		switch(index){

/*			case 13:
				const play = async () => {
				
					await self.sleep(500);
					
				};
				play();
				break;*/

			case 16:
				globActions.bB();
				bindActions.send({action:'boxShake'});
				gameActions.showPrompt('睡了一觉感觉好多了，可是现在要怎么逃出这个密室呢？');
				return;

			default:break;
		}

		globActions.setCartoonIndex(index);
	}

	sleep(t){
		return new Promise((resolve, reject) => {
    		setTimeout(() => {
      			resolve();
    		}, t);
  		});
	}

	/* 开启音频 */
	openAudio(i){
		var name = this.cartInfo[i].audio;
		if(name && audios[name] ){
			audios[name].currentTime = 0;
			audios[name].loop = true;
			audios[name].play();
		}
	}

	/* 关闭音频 */
	closeAudio(i){
		var name = this.cartInfo[i].audio;
		name && audios[name] && audios[name].pause();
	}

	// ios在第一次play(需要播放一定时间)时会影响正在播放的音频（卡顿）
	// 解决方案：加载后静音状态下播放3秒
	fixAudioIOSbug(arr){
		var j = 0, len = arr.length;
		arr.forEach((item, i)=>{
			var audio = window.audios[item.name];
			audio.play();
			audio.muted = true;
			setTimeout(()=>{
				audio.pause();
				audio.muted = false;

				if(++j === len){
					window.audios['bgm'].currentTime = 0;
					window.audios['bgm'].loop = true;
					window.audios['bgm'].play();
				}
			},1000)
		})
		
	}
}