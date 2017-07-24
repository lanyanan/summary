import {globActions,gameActions,bindActions} from '../actions/actions';


export default class Equip extends React.Component{

		componentWillMount(){
			this.evs = this.events();
			this.resetState();
			this.state = {vari: false};
		}

		componentWillReceiveProps(nextProps){
			if(this.props.name !== nextProps.name){
				this.resetState();
			}
		}

		resetState(){
			this.interval && clearInterval(this.interval);
			this.state = {vari: false};
			this.status = this.props.info.status;
		}

		componentWillUnmount(){
			this.interval && clearInterval(this.interval);
		}

		render(){
			var arr = [], vice = '', bgi,
				name = this.props.name,
				info = this.props.info,
				evs = this.evs;
			
			// 绑定阶段操作四件套大图 (如：熏香机智慧盒灯光闪烁、 睡眠袋翻转、开关助眠灯)
			info.status === 2 && this.state.vari && (vice = '-variation');

			// 绑定成功后手机设置四件套 (如：熏香机和助眠灯颜色设置)
			(info.status === 3 || info.status === 4) && info.color && (vice = '-' + info.color);

			bgi = '../static/images/icon/'+ name + vice +'.png';
					
			switch(name){
				case 'aromathMachine':
					arr.push(<div className='spray_btn' onTouchStart={evs.longPressStart} onTouchEnd={evs.clearLongPress} onTouchMove={evs.clearLongPress}></div>)
					break;
				case 'fleabag':
					arr.push(<div className='turnover_btn' onTouchEnd={evs.turnover}></div>)
					break;
				case 'wisdomBox':
					arr.push(<div className='white_btn' onTouchEnd={evs.clickInaline}></div>);
					break;
				case 'lampholder':
					arr.push(<div className='switch_btn' onTouchEnd={evs.lswitch}></div>);
					break;
			}

			return (
				<div className='equip_wrap' >
					<img className='equip_bg' src={bgi} />
					{arr[0]}
					{name === 'aromathMachine' && info.gears > 0 ? <div className='fog'></div> : ''}
				</div>
			)
		}

		/* 事件 */
		events(){
			var t = this, timeOutEvent, ser, num = 0, num2 = 0;

			return {
				// 开始长按
				longPressStart(){
					if(t.props.info.status !== 2) return;
					timeOutEvent = setTimeout(t.light.bind(t), 1000);
				},

				// 清除长按
				clearLongPress(){
					timeOutEvent && clearTimeout(timeOutEvent);
				},

				// 智慧盒连续点击
				clickInaline(){
					if(t.props.info.status !== 2) return;

					ser && clearTimeout(ser);
					console.log(num);

					ser = setTimeout(function(){num = 0},500);

					++num === 3 && t.light();
				},

				// 睡眠袋翻转
				turnover(){
					if(t.props.info.status !== 2) return;
					bindActions.send({result:'ok'});
					t.setState({vari:true});
					gameActions.showPrompt('原来二维码在背面！');
				},

				// 助眠灯开关
				lswitch(){
					if(t.props.info.status !== 2) return;
					audios['switch'].play();
					t.setState({vari:!t.state.vari})

					if(++num2>=9){
						if(num2%2===1){
							gameActions.showPrompt('哈哈哈…感觉秘密快要解开了！');
							bindActions.send({result:'ok'});
						}else{
							bindActions.send({result:'error'});
						}	
					}
				}
			}
		}

		/* 灯光闪烁 */
		light(){
			var t = this;

			if(this.props.info.status !== 2) return;
			gameActions.showPrompt('灯闪了！');
			bindActions.send({result:'ok'});
			t.interval = setInterval(()=>{
				t.setState({vari:!t.state.vari})
			},500)	
		}

}