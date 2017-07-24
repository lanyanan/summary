import {globActions,gameActions,bindActions} from '../actions/actions';


export default class Scene extends React.Component{
		constructor(){
			super();
			this.state={baglight:false}
			/* 
				数组内每个对象对应一个场景，name为场景类名,children为该场景可操作或变化元素的图层
			*/
			this.config = [{
							name:'scene1',
							children:[
								{name:'codedlock',msg:'门被锁住了！去哪里才能找到密码呢？'},
								{name:'phone', msg:'这不是我的手机，是谁打来的电话？'},
								{name:'waterB', msg:'这水已经过期了吧…'},
								{name:'tablelamp', msg:'灯架都已经开始生锈了…'},
								{name:'bag', msg:'袋子里面什么也没有'},
								{name:'CD', msg:'这是我以前收藏的动作片吧…'},
								{name:'file', msg:'上面写着一些奇怪的文字，是谁的恶作剧吗？'},
								{name:'wine',msg:'这瓶水，隔着老远就闻到了一股怪味。'},
								{name:'door',msg:'用力推也打不开，我要被困死在这里了吗？怎么办？！'}
							]
						},{
							name:'scene2',
							children:[
								{name:'phone', msg:'这不是我的手机，是谁打来的电话？'},
								{name:'bulb', msg:'这个灯泡有点蹊跷。', audio:'gold'},	
								{name:'computer', msg:'好像还有工作没有做完…'},
								{name:'keyboard', msg:'键盘上是什么液体？好恶心…'},
								{name:'photoframe', msg:'真怀念曾经帅气的秀发啊…'},
								{name:'book', msg:'好久没静下心来看一本书了…唉，天天拥抱工作，时间都去哪了？'},
								{name:'bookB', msg:'这些书不是用来学习的吧…'},
								{name:'chair', msg:'椅子上有好多灰尘'},
								{name:'ashtray', msg:'抽烟有害健康，还是早点戒了吧…'},
								{name:'CD', msg:'这是我以前收藏的动作片吧…'},
								{name:'tablelamp', msg:'灯架都已经开始生锈了…'},
								{name:'file', msg:'上面写着一些奇怪的文字，是谁的恶作剧吗？'},
								{name:'bottle', msg:'这里面似乎装的是酒精，我可以…'},
								{name:'wine',msg:'这瓶水，隔着老远就闻到了一股怪味。'},
								{name:'glassbox', msg:'奇怪的东西，但好像没有什么用'},
								{name:'glass', msg:'好渴，但是杯子里是空的。'},
								{name:'mouse', msg:'一个鼠标有什么用呢？'},
								{name:'socket', msg:'我还是找找电话里说的智能助眠工具吧。'}

							]
						},{
							name:'scene3',
							children:[
								{name:'aromathMachine', msg:'找到一个香薰灯！传说中的智能睡眠硬件吗！', audio:'gold'},
								{name:'wisdomBox', msg:'低调酷炫的智慧盒子！！好热，我想调一下空调…', audio:'gold'},
								{name:'water', msg:['青藏高原4300米古冰川矿泉水！！我什么时候买过这么贵的矿泉水？','咦！上面好像写着香薰机专用水？'], audio:'gold'},
								{name:'esseOil', msg:'找到一瓶昂贵的香薰精油！', audio:'gold'},
								{name:'lampholder', msg:'里面没有灯泡，四处找找看', audio:'gold'},
								{name:'fleabag', msg:'地毯下藏着一条睡眠监测器！怎么连接手机呢？', audio:'gold'},
								{name:'fleabagBed', msg:''},
								{name:'bed'},
								{name:'socks', msg:'一个月没洗的臭袜子！这房间缺个女主人啊…我在想什么鬼？'},
								{name:'drawer', msg:'里面什么也没有…'},
								{name:'pillow', msg:'明明是单身狗，为什么要放两个枕头呢？'},
								{name:'curtainA', msg:'窗帘上的灰尘很多…'},
								{name:'curtainB', msg:'窗帘上的灰尘很多…'},
								{name:'window', msg:'窗户也被锁住了，看这材质似乎也没办法砸破'},
								{name:'clothes', msg:'这衣服和隔壁老王的好像…'},
								{name:'jeans', msg:'这裤子和隔壁老王的好像…'},
								{name:'sound', msg:'想来一首催眠曲，听听大自然的声音。'},
								{name:'TVbench', msg:'抽屉里面都是杂物，我是多久没有好好打扫房间了。'},
								{name:'slipper', msg:'一双没什么用的臭拖鞋…'},
								{name:'quilt', msg:'好想滚床单…'},
								{name:'TV', msg:'今天是几号来着？电视台今天好像没有播非诚勿扰。'},
								{name:'vase', msg:'要记得给花瓶里加点水…'},
								{name:'magazine', msg:'一堆没用的杂志'},
								{name:'carpet', msg:'地毯下面也没有什么有用的信息。'},
								{name:'littleSound', msg:'这好像前女友送我的音箱，唉…'},
								{name:'paper',msg:'', index:2}

							]
						},{
							name:'scene4',
							children:[
								{name:'aromathMachine', msg:'找到一个香薰灯！传说中的智能睡眠硬件吗！', audio:'gold'},
								{name:'esseOil', msg:'找到一瓶昂贵的香薰精油！', audio:'gold'},
								{name:'lampholder', msg:'找到一个低调奢华有内涵的灯罩！可是里面没有灯泡。', audio:'gold'},
								{name:'fleabag', msg:'地毯下藏着一条睡眠监测器！怎么连接手机呢？', audio:'gold'},
								{name:'mural', msg:''},
								{name:'guitar', msg:'好想唱歌…可惜没人欣赏…'},
								{name:'drawer', msg:'里面什么也没有…'},
								{name:'pillow', msg:'明明是单身狗，为什么要放两个枕头呢？'},
								{name:'chest', msg:'里面全是两周没洗的脏衣服，味道好大，熏得我好难受！'},
								{name:'quilt', msg:'好想滚床单…'},
								{name:'clothes', msg:'这衣服和隔壁老王的好像…'},
								{name:'jeans', msg:'这裤子和隔壁老王的好像…'},
								{name:'bed'},
								{name:'plant', msg:'这株植物打理的不错…'},
								{name:'paper', msg:'',index:1},
								{name:'muralPaper', msg:'',index:9}
							]
						},{
							name:'scene5',
							children:[
								{name:'water', msg:['青藏高原4300米古冰川矿泉水！！我什么时候买过这么贵的矿泉水？','咦！上面好像写着香薰机专用水？'], audio:'gold'},
								{name:'wisdomBox', msg:'低调酷炫的智慧盒子！！好热，我想调一下空调…', audio:'gold'},
								{name:'flamp', msg:'',audio:'switch'},
								{name:'mirror', msg:'没心情照镜子，头发乱糟糟的…'},
								{name:'aircondition', msg:'好热啊，想开空调…'},
								{name:'TV', msg:'今天是几号来着？电视台今天好像没有播非诚勿扰。'},
								{name:'soundA', msg:'想来一首催眠曲，听听大自然的声音。'},
								{name:'soundB', msg:'想来一首催眠曲，听听大自然的声音。'},
								{name:'TVbench', msg:'抽屉里面都是杂物，我是多久没有好好打扫房间了。'},
								{name:'clife', msg:'C-Life是智能家居时代，你的专属生活方式。'},
								{name:'vase', msg:'要记得给花瓶里加点水…'},
								{name:'magazine', msg:'一堆没用的杂志'},
								{name:'littleSound', msg:'这好像前女友送我的音箱，唉…'},
								{name:'paper', msg:'',index:2}
							]
						}];
		}

		componentDidMount(){
			setInterval(()=>{
				this.setState({baglight: !this.state.baglight})
			},400)
		}

		render(){
			var arr = [],
				opts = this.props.opts;

			this.config.forEach((obj, i)=>{
				var arr2 = [];

				// 图层生成
				obj.children.forEach((item, j)=>{
					var name = item.name, o = opts.equips[name], msg = item.msg;

					// 捡起来的纸团不显示
					if((name === 'paper' || name === 'muralPaper') && opts.paperPicked.indexOf(item.index)>-1) return;

					// 显示装饰品、没被捡起的道具(灯罩除外)图层
					if(!o || (o && o.status === 0) || name==='lampholder'){
						var extrClass = "";

						// 显示床上睡眠袋安装位置
						if(name==='fleabagBed'){
							if(opts.overstep===1 && this.state.baglight) extrClass = 'fleabagBed-xu';
							if(opts.overstep>=2) extrClass = 'fleabagBed-shi';
						}

						if(name==='phone' && this.state && this.state.phoneShake){
							extrClass += ' phoneShake';
						}

						// 落地灯亮灭
						if(name==='flamp'){
							var src = opts.flampOpen ? '../static/images/icon/flamp-open.png' : '../static/images/icon/flamp-close.png';
							arr2.push(<div key={j} className={name + (i + 1)} onTouchEnd={this.touch.bind(this,item)}><img className='flamp5-img' src={src} /></div>);
						}else{

							// 添加图层
							arr2.push(<div key={j} className={name + (i + 1)+ ' ' + extrClass}><div className='ope_wrap' onTouchEnd={this.touch.bind(this,item)}></div></div>)
						}
					}
				})

				// 添加场景
				arr.push(<div key={i} className={'scene_item '+ obj.name +(opts.curScenseIndex === (i + 1) ? ' show' : '')}>{arr2}</div>)
			})

			return (
				<div className='scene' onTouchEnd={this.touchVoice.bind(this)}>
					{arr}
					{this.state && this.state.fly ? <img className={'ani-fly '+ this.state.flyObj} src={'../static/images/icon/'+ this.state.flyObj +'.png'} /> : ''}
				</div>
			)
		}

		/* 获取道具的详细信息 */
		getEquipInfo(name){
			return this.props.opts.equips[name];
		}

		touchVoice(){
			audios['touch'].currentTime = 0;
			audios['touch'].play();
		}

		touch(item,e){
			var {name, msg, audio} = item,
				info = this.getEquipInfo(name);

			// 灯罩捡起一次后不再显示提示信息
			if(name === 'lampholder'){
				
				if(info.status !== 0) msg = '';
				if(info.status === 2) msg = '什么颜色的光线适合睡觉？';
			}

			if(name === 'bed' && this.props.overstep === 4){
				msg = '感觉焕然一新！';
			}

			if(name === 'aircondition'){
				var obj = this.getEquipInfo('wisdomBox');

				msg = obj.temperature === 26 ? '温度终于降下来了，凉快多了…' : '好热啊，想开空调…';
			}

			// 显示提示信息
			msg && gameActions.showPrompt(msg);
			if(!info || (!info.status || info.status === 0)){
				audio = (audio && audios[audio]) || null;
				audio && (audio.currentTime = 0);
				audio && audio.play();
			}
			

			switch(name){
				// 可收藏的道具
				case 'phone': case 'bulb': case 'aromathMachine': case 'wisdomBox': case 'water': 
				case 'esseOil': case 'lampholder': case 'fleabag':
					gameActions.getEquip(name);

					// 手机弹出手机大图
					if(name === 'phone'){
						gameActions.magnify({
							bigIcon:'phone',
							showMaskLayer:false,
							autoHide:false
						});
					}

					if(name !== 'phone' && info.status === 0){
						bindActions.send({action:'boxShake'});
						this.setState({fly:false},function(){
							this.setState({fly:true, flyObj:name});
						})
					}

					e.stopPropagation();
					e.nativeEvent.stopImmediatePropagation();

					break;
				
				// 密码锁
				case 'codedlock': gameActions.magnify('codedLock'); break;

				// 安装睡眠带
				case 'fleabagBed':
					if(this.props.opts.overstep === 1){
						bindActions.send({action:'placeFleabag'});
					}
					break;

				// 点击床睡觉
				case 'bed':
					switch(this.props.opts.overstep){
						case 3:
							globActions.sleep();
							gameActions.commit({overstep:4});
							break;

						case 4:
							gameActions.showPrompt('睡了一觉感觉好多了，可是现在要怎么逃出这个密室呢？');
							break;

						default:gameActions.showPrompt('我好困啊，怎么让这助眠产品起作用呢？');break;
					}
					break;

				// 落地灯
				case 'flamp':
					gameActions.commit({flampOpen:!this.props.opts.flampOpen}); 
					if(this.props.opts.flampOpen){
						gameActions.showPrompt('这盏灯好像和其他东西有什么联系，要不去四周找找看？');
					}else{
						gameActions.showPrompt('这盏落地灯好像有什么秘密…');
					}

					e.stopPropagation();
					e.nativeEvent.stopImmediatePropagation();
					break;

				// 壁画
				case 'mural':gameActions.magnify('mural');break;

				// 纸团
				case 'paper':gameActions.showPaper(item.index);break;
			}
		}

	}