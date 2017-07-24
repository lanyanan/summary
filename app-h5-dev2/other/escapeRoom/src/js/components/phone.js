import {globActions,gameActions} from '../actions/actions';
import {bindStore} from '../stores/bindStore';


export default class Phone extends React.Component{

		componentWillMount(){
			this.steps = {
				1:['hangup','answer'],
				2:['time'],
				3:['bind'],
				4:[],
				5:['bind'],
				6:[],
				7:[],
				8:[],
				9:['up','down','tempe'],
				10:['blue','pink','read','rest'],
				11:['green','yellow','closedGear','firstGear','secondGear'],
				12:['optimal'],
				13:[],
				14:[]
			}

			this.events = this.fevents();
			
			this.resetState(this.props);
		}
		componentWillReceiveProps(nextProps){
			if(this.props.name !== nextProps.name){
				clearTimeout(this.interval);
				this.resetState(nextProps);
			}
		}

		resetState(props){
			this.state = {index:1};

			// 四件套与手机绑定时显示
			if(props.info){
				this.state.index = 3;

				// 成功绑定但信息不正确时调到配置页
				if(props.info.status === 3 ){
					switch(props.name){
						case 'aromathMachine': this.state.index = 11;break;
						case 'wisdomBox': this.state.index = 9; break;
						case 'lampholder': this.state.index = 10; break;
						case 'fleabag': break;
					}
				}
			}

			// 非绑定时获取props传入的指定页
			if(props.index) this.state.index = props.index;

			this.state.timer = true;

			this.ready = false;
		}

		componentDidMount(){
			var msg;
			
			this.removeListener = bindStore.listen(this.accept.bind(this));

			this.props.index === 12 && (msg = '睡眠场景…这就是优质睡眠的秘密了吗？');

			this.props.index === 13 && (msg = '这似乎是一组有用的数字。');

			msg && gameActions.showPrompt(msg);
		}

		componentWillUnmount(){
			this.removeListener()
		}

		// 用于接收equip组件穿过来的值
		accept(data){
			if(data.result=='ok'){
				this.ready = true;
				if(this.props.name === 'fleabag')
					this.setState({index:5});
				else
					this.setState({index:3});
			}else if(data.result=='error'){
				this.ready = false;
			}
		}

		componentDidUpdate(){
			if(this.state.index === 2 && this.state.timer){
				this.state.timer = false;
				this.startCall();
				this.calling();
			}
		}

		render(){
			var arr = [], vice = '', bgi, posiClass = '',
				index = this.state.index,
				obj = this.steps[index],
				info = this.props.info;

			if(this.state.index === 1 || this.state.index === 2){
				posiClass = 'screen_center';
			}else if(this.state.index === 12 || this.state.index === 13 || this.state.index === 14){
				posiClass = 'bar_center';
			}else{
				posiClass = 'bar_right';
			}

			// 助睡灯模式和香薰机雾化档次
			if(index === 11){
				info && info.gears && (vice = '-' + info.gears);
			}else if(index === 10){
				info && info.mode && (vice = '-' + info.mode);
			}

			bgi = '../static/images/bigImg/phone-'+ index + vice +'.png';

			// 添加手机可操作的图层
			obj && obj.forEach((val,i)=>{
				var e = this.getEventName(val);
				var str='';

				// 智慧盒子温度处理
				if(index === 9 && val === 'tempe'){
					str = info.temperature + '℃';
					if(info.temperature === 26){
						str = <span style={{color:'#0ce00c'}}>{str}</span>
					} 
				}

				// 助眠灯和香薰机颜色处理
				if(info && info.color && val === info.color){
					str = <img className='hook_icon' src='../static/images/icon/hook.png' />;
				}

				arr.push(<div key={i} className={val + index} onTouchEnd={this.events[e] && this.events[e].bind(null,this.props.name)}>
							{str}
						</div>)
			})
			
			return (
				<div className={'hei100 phone_wrap '+ posiClass}>
					<img className='phone_bg' src={bgi} />
					{arr}
				</div>
			)
		}

		// 开始播放电话音频和显示文字
		startCall(){
			gameActions.showPrompt('你已经多久没有好好睡上一觉了？');
			setTimeout(()=>{
				gameActions.showPrompt('身体是不是已经不受控制了呢？');
				
				setTimeout(()=>{
					gameActions.showPrompt('马上找到所有智能助眠工具，用手机控制他们');
						setTimeout(()=>{
							gameActions.showPrompt('你才能重新入睡，并逃离生活的噩梦');
								setTimeout(()=>{
									audios['speak'].loop = false;
									gameActions.showPrompt('否则你会越来越虚弱，永远不会再醒来');
								},4000)
						},4000)
				},3000)
			},4000)
		}

		// 通话时间记录
		calling(){
			var num = 0, t, timeDOM = document.querySelector('.time2'),

			t = setInterval(()=>{
				num = ++num < 10 ? '0' + num : num;
				timeDOM.innerHTML='00:' + num;

				if(num == 21) {
					clearInterval(t);
					gameActions.magnify({bigIcon:''});
				}
			},1000);

			timeDOM.innerHTML='00:00';
		}


		fevents(){
			var t = this, f = gameActions.setEquipOptions, sp = gameActions.showPrompt, hangupNum = 0;
			return{
				// 挂电话
				onHangup: ()=>{
					if(hangupNum++ === 0){
						sp('还是接一下吧，万一是客户打来的呢？')
					}else{
						sp('要挂掉吗？总感觉会错过什么重要的信息。')
					}
				},

				// 接听电话
				onAnswer: ()=>{
					t.setState({index:2})
					audios['iphone'].pause();
					audios['speak'].currentTime = 0;
					audios['speak'].loop = true;
					audios['speak'].play();
				},

				// 启动优质场景
				onOptimal: (name)=>{
					gameActions.commit({overstep: 3, isOpened:false,showMaskLayer:false});
					sp('好累，终于可以睡会觉了');
				},

				// 香薰机
				onGreen: (name)=>{
					f(name,{color:'green'})
					sp('哪种颜色适合睡眠呢？')
				},

				onYellow: (name)=>{
					f(name,{color:'yellow'})
					sp('哪种颜色适合睡眠呢？')
				},

				onClosedGear: (name)=>{
					f(name,{gears:0})
					sp('')
				},

				onFirstGear: (name)=>{
					f(name,{gears:1})
					sp('这个味道让我昏昏欲睡。')
				},

				onSecondGear: (name)=>{
					f(name,{gears:2})
					sp('这个味道让我昏昏欲睡。')
				},

				onUp: (name)=>{
					t.attemperation(name,1);
				},

				onDown: (name)=>{
					t.attemperation(name,-1);
				},

				// 助眠灯
				onBlue: (name)=>{
					f(name,{color:'blue'})
					sp('似乎还是不太对。')
				},

				onPink: (name)=>{
					f(name,{color:'pink'});
					sp('这个灯光好像很适合睡眠');
				},

				onRead: (name)=>{
					f(name,{mode:0})
				},

				onRest: (name)=>{
					f(name,{mode:1})
				},

				onBind: ()=>{
					if(t.ready){
						var name = t.props.name;
						switch(name){

							case 'aromathMachine':
								t.setState({index:8})
								f(name,{status:3})		
								this.interval = setTimeout(()=>{
									t.setState({index:11})							// 颜色换挡
									gameActions.showPrompt('怎样才能把设备调节到助眠状态呢？');
								},1500)		
								break;

							case 'fleabag':
								t.setState({index:6});								// 扫描二维码

								this.interval = setTimeout(()=>{
									t.setState({index:8})
									f(name,{status:4})
									 this.interval = setTimeout(()=>{
										t.setState({index:7})						// 实时监测
										gameActions.showPrompt(['终于绑定成功了！这是我的身体数据吗？','心跳、呼吸、体动…难道这些数字和密码有关系？'])
										},2000)	
								},1500)
								break;

							case 'lampholder':
								t.setState({index:8});
								f(name,{status:3})
								this.interval = setTimeout(()=>{
									t.setState({index:10});							// 颜色模式
									gameActions.showPrompt('什么颜色适合睡眠呢？');
								},1500)		
								break;

							case 'wisdomBox':
								t.setState({index:8})
								f(name,{status:4})
								this.interval = setTimeout(()=>{
									t.setState({index:9})							// 调节温度
									gameActions.showPrompt('哪个温度最适合睡觉呢？');
									},1500)		
								break;
						}
					}else{
						t.setState({index:4});	// 绑定失败
					}
				}
			}
		}

		attemperation(name, num){
			var temperature = this.props.info.temperature + num;
			audios['keypress'].currentTime = 0;
			audios['keypress'].play();
			if(temperature <= 30 && temperature >= 16){
				gameActions.setEquipOptions(name,{temperature:temperature});
			}
			if(temperature===26){
				gameActions.showPrompt('你已成功调节到最佳温度！');
			}else{
				gameActions.showPrompt('');
			}
		}

		getEventName(name){
			return 'on' + name.substr(0,1).toUpperCase() + name.substr(1);
		}
	}