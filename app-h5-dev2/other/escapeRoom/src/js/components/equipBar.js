import {globActions,gameActions} from '../actions/actions';
import Equip from '../components/equip';
import Phone from '../components/phone';
import {bindStore} from '../stores/bindStore';

export default class EquipBar extends React.Component{
		constructor(){
			super();
			this.selectedEquips = [];
			this.lastIndex = 0;
		}

		componentWillReceiveProps(nextProps){
			if(this.props.hide !== nextProps.hide){
				this.resetAttr();
			}
		}

		componentDidMount(){
			this.removeListener = bindStore.listen(this.accept.bind(this));
		}

		accept(data){
			if(data && data.action === 'placeFleabag'){
				if(this.curEquip === 'fleabag')
					gameActions.setOverStep(2);
			}
		}

		componentWillUnmount(){
			this.removeListener();
		}

		render(){
			var arr = [], 
				arr2 = [],
				eqs = this.props.equips,	// 道具信息集
				se = this.selectedEquips;	// 当前选择的道具名

			arr.push(<div key={-1} className='close_bar' onTouchEnd={this.closeBar.bind(this)}></div>)

			// 渲染工具栏
			this.props.opts.picked.forEach((name, i)=>{
				let item = eqs[name],
					//i = item.index,									// 在道具栏中的索引
					selected = (name === se[0] || name === se[1]);		// 是否选中;
				
				// 添加道具
				if(item.status > 0){

					arr.push(
						<div key={i} className={'equip_cell eqc' + i + (selected ? ' selected' : '')} onTouchEnd={this.selectCell.bind(this,name)}>
							{
								item.status === 1 ? <i className='bar_comb_icon'></i> : 
								item.status === 3 || (name === 'phone' && (this.props.overstep == 2 || this.props.overstep == 4)) ? <i className='bar_excl_icon'></i> :
								item.status === 4 ? <i className='bar_hook_icon'></i> : ''
							}
							<div className='equip_div'>
								<img src={'../static/images/icon/' + name + '.png'} />
							</div>
						</div>
					)
				}
			})

			// 渲染大图层
			if(se.length === 1){
				var equipInfo=this.getEquipInfo(se[0]);

				if(equipInfo.combNum || this.props.opts.picked.indexOf('phone')==-1){
					arr2.push(<div key='1' className='equip_box box0'><img src={'../static/images/icon/' + se[0] + '.png'}/></div>);
				}else{
					if((equipInfo.status === 4 && this.isopen) || equipInfo.status === 2 || equipInfo.status === 3){
						arr2.push(<Equip key='2' name={se[0]} info={equipInfo} />);
						arr2.push(<Phone key='3' name={se[0]} info={equipInfo} />);
						this.isopen = true;
					}else{
						this.isopen = false;
					}
					this.curEquip = se[0];
				}

				if(equipInfo.status === 5){
					var phoneIndex;
					if(this.props.overstep < 2) phoneIndex = 14;
					if(this.props.overstep === 2) phoneIndex = 12;
					if(this.props.overstep === 3) phoneIndex = 14;
					if(this.props.overstep === 4) phoneIndex = 13;
					arr2.push(<Phone key='7' index={phoneIndex}/>);
				}
			}
			if(se.length === 2){
				arr2.push(<div key='4' className='equip_box box1'><img src={'../static/images/icon/' + se[0] + '.png'}/></div>);
				arr2.push(<div key='5' className='equip_box box2'><img src={'../static/images/icon/' + se[1] + '.png'}/></div>);
				arr2.push(<div key='6' className='equip_box box3'><input className='combine_btn' type='button'   onTouchEnd={this.combine.bind(this)} /></div>)
			}


			return (
				<div className={'equips_wrap' + (this.props.hide ? ' hidden' : '')}>
					{arr2}
					<div className='equip_bar'>
						{arr}
					</div>
				</div>
			)
		}

		/* 点击选择道具 */
		selectCell(val){
			var selects = this.selectedEquips,
				fun = this.getEquipInfo.bind(this),
				newInfo = fun(val),						// 要选择的最新道具信息
				curr1 = fun(selects[0] || ''),			// 当前第一个道具的信息
				curr2 = fun(selects[1] || '');			// 当前第二个道具的信息

			if(val === selects[0] || val === selects[1]) return;

			this.isopen = false;

			switch(newInfo.status){

				// 不可组合项
				case 5: case 4: case 3: case 2:
					selects.length = 0;
					selects.push(val);
					if(this.props.opts.picked.indexOf('phone')===-1){
						gameActions.showPrompt('似乎需要一个手机才能进行绑定，快四处找找');
						gameActions.showMaskLayer(true);
						return;
					}
					break;

				// 可组合
				case 1:
					if(!curr1 || (curr1 && curr1.combNum && !curr2)){
						// 都没有或则只有一个可组合的
						this.lastIndex = curr1 ? 1 : 0;
						selects.push(val);

					}else if(curr1.combNum){
						// 有两个可组合的时候替换掉先添加的那一个
						this.lastIndex = +!this.lastIndex;
						selects[this.lastIndex] = val;

					}else{
						// 不可组合的清空
						selects.length = 0;
						selects.push(val);
					}
					break;

				case 0: case -1:
					// 尚未获取、合成消失项目
					return;
			}

			this.showPrompt(val, newInfo);

			// 绑定并且设置正确的四件套不显示遮罩层
			gameActions.showMaskLayer(selects.length && newInfo.status != 4);
		}

		/* 提示 */
		showPrompt(name, info){
			var msg = '';

			switch(name){
				case 'aromathMachine':
					if(info.combNum === 2){
						msg = '智能香薰灯！还需要找到水和精油'
					}else if(info.status === 2){
						msg = '按住喷雾键3秒，wifi灯闪烁后可以进入绑定状态。'
					}
					break;

				case 'water': msg = '昂贵的古冰川矿泉水；倒进香薰机看看！';break;

				case 'fleabag': 
					info.status === 2 && (msg = ['这是一条可以实时监测睡眠数据的带子！好像是在床单下使用的。','可是，该怎么绑定手机呢？二维码在哪里？']); break;

				case 'bulb': msg = ['小灯泡有大能量。','需要一个能通电的东西。']; break;

				case 'lampholder': 
					if(info.combNum){
						msg = '里面没有灯泡，四处找找看';
					}else if(info.status === 2){
						msg = '连续开关4次可绑定手机。'
					}
					break;

				case 'wisdomBox': 
					info.status === 2 && (msg = ['这是一个神秘的黑盒子，好像可以控制空调','屁股上有个小白点！快速地戳3下试试！！']);break;

				case 'esseOil': msg = '这香薰的味道让我昏昏欲睡…'; break;

				case 'phone': break;

				default: break;
			}

			if(this.selectedEquips.length === 2) msg = '这样似乎行不通，得想想其他的办法';

			this.isAWcombine() && (msg = '把矿泉水倒进去看看。');

			this.isAEcombine() && (msg = '把香薰精油倒进去看看。');

			this.isBLcombine() && (msg = '这两个应该可以组合起来，试试看');

			gameActions.showPrompt(msg);
		}

		/* 获取道具的详细信息 */
		getEquipInfo(name){
			return this.props.equips[name];
		}

		closeBar(){
			gameActions.toggleEquip({
				showMaskLayer: false,
				isOpened:false
			})
		}

		/* 道具合成 */
		combine(){
			var equip, material, msg;

			// 选择的是香薰机和水
			this.isAWcombine() && (material = 'water') && (equip = 'aromathMachine') && (msg = '香薰机发生了一点变化');

			// 选择的是香薰机和精油
			this.isAEcombine() && (material = 'esseOil') && (equip = 'aromathMachine') && (msg = '香薰机发生了一点变化');

			// 选择的是灯泡和灯罩
			this.isBLcombine() && (material = 'bulb') && (equip = 'lampholder') && (msg = '太好了，台灯能够用了');
			
			material ? (this.resetAttr() && gameActions.combEquip(equip, material)) : '';

			msg && gameActions.showPrompt(msg);
		}

		/* 当前是否为香薰机和水的组合 */
		isAWcombine(){
			var s = this.selectedEquips.toString();
			return (s === 'aromathMachine,water' || s === 'water,aromathMachine');
		}

		/* 当前是否为香薰机和精油的组合 */
		isAEcombine(){
			var s = this.selectedEquips.toString();
			return (s === 'aromathMachine,esseOil' || s === 'esseOil,aromathMachine');
		}

		/* 当前是否为灯罩和灯泡的组合 */
		isBLcombine(){
			var s = this.selectedEquips.toString();
			return (s === 'bulb,lampholder' || s === 'lampholder,bulb');
		}

		resetAttr(){
			this.selectedEquips = [];
			this.lastIndex = 0;
			this.isopen=false;
			this.curEquip=null;
			return true;
		}

	}
