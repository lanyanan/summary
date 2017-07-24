import {globActions,gameActions} from '../actions/actions';
import {gameStore} from '../stores/gameStore';

import Scene from '../components/scene';
import CodedLock from '../components/codedlock';
import EquipBar from '../components/equipBar';
import Phone from '../components/phone';
import Mural from '../components/mural';
import Share from '../components/share';
import PromptLine from '../components/promptLine';

var words = [
	['如果你看到了这张纸条，那说明你是和我一样的苦命人，都被困在这个该死的房间。没有食物和水，没有办法和外面联系，甚至因为恐惧都没有办法睡着。有时候我会听到一些恐怖的声音，似乎是房间里某个角落传来的。这里一定有什么机关，找到它就能通往其他地方。','我翻遍了所有角落，发现了一个小隔间，里面却只有一枚戒指…','我太累了，撑了这么久，还是要死在这里…','我不会是第一个，你也不会是最后一个…','在房间里找找看，说不定你就能找到我的尸体。'],
	['你也看到了那张纸条对不对？我果然不是一个人！我仔细观察过，房间里的物品都有被动过的迹象，大门的锁也有打开过的痕迹，说明有人进来并且逃出去过！一定有什么办法可以出去的，一定有什么线索被我遗漏了！我不会放弃的，我一定会活下去！','好心提醒你一下，不要试着去找那个小隔间，你知道那个人为什么会死掉吗？那个发了疯的女人。','对了，那个人的尸体，你想知道在哪里吗？'],
	['今天是第八天了，我饿到连写字的力气都快没有了。','看到了其他人留下来的纸条，反而让我更加恐惧，这个房间是专门用来囚禁我们的吗？我想我是逃不出去了，我把我的戒指藏在了房间里，如果有人找到并且逃了出去，请你把它也带出去吧…','好想念外面的世界啊，该死的潘多拉…','房间里还有一张纸条，上面画满了奇怪的图腾，可是我看不明白。我把它藏在了潘多拉的魔盒里，如果你找到了它，相信它会给你带来好运…']
];


export default class Game extends React.Component{
		constructor(){
			super();
			this.state = gameStore.getData();
			this.start = false;
		}

		componentDidMount(){
			gameStore.listen(this.update.bind(this));
			this.blink = true;
			//setTimeout(gameActions.commitData(),1000)
			
			//setTimeout(gameActions.getRankData.bind(this,function(res){alert(res)}),3000)
		}

		componentWillReceiveProps(nextProps){
			if(this.props.hide !== nextProps.hide && !nextProps.hide){
				if(this.state.overstep === 0){
					this.blink = true;
					setTimeout(()=>{
						this.blink = false;
						this.start = true;
						gameActions.timeStart();
						this.setState({});
						setTimeout(()=>{
							audios['iphone'].loop = true;
							audios['iphone'].play();
							gameActions.showPrompt(['这是什么鬼！！密码门！！？？握草我是不是走错房间了？','鬼知道我经历了什么。手机响了？手机在哪里？快找找…']);
						},300)
					},2500);
				}
				
			}
		}
		
		render(){
			var centerDom, paperWords;
			switch(this.state.bigIcon){
				case 'codedLock':
					centerDom = <CodedLock overstep={this.state.overstep} />;break;
				case 'phone':
					centerDom = <Phone />; break;
				case 'mural':
					centerDom = <Mural flampOpen={this.state.flampOpen} showPaper={this.state.paperPicked.indexOf(9)==-1} />; break;
			}
			var  arr = words[this.state.paperPicked.length-1];
			paperWords = arr && arr.map((val, i)=>{
				return <p >{val}</p>
			})



			return (
				<div className={'game' + (this.props.hide ? ' hidden' : '')}>

					{/* 场景 			z-index:0 */}
					<Scene opts={this.state} />

					{/* 场景切换图标	z-index:5 */}
					{this.state.overstep !== 5 ? <div>
						<div className='left_side'><div className='click_area' onTouchEnd={this.nextScene.bind(this)}></div></div>
						<div className='right_side'><div className='click_area' onTouchEnd={this.prevScene.bind(this)}></div></div>
					</div> : ''}

					{/* 遮罩层 			z-index:10 */}
					<div className={'mask_layer ' + (this.state.showMaskLayer ? 'show' : '')}></div>

					{/* 道具层			z-index:15 */}
					<EquipBar opts={this.state} hide={!this.state.isOpened} overstep={this.state.overstep} equips={this.state.equips} time={this.state.time}/>

					<div className='timer'>{this.formatSecond(this.state.time)}</div>

					{/* 大图层			z-index:20 */}
					<div className={'big_icon_layer ' + (this.state.bigIcon ? 'show' : '')} onTouchEnd={this.state.autoHide ? this.hideBigIcon.bind(this) : null}><div>{centerDom}</div></div>			
					
					{/* 大图层			z-index:20 */}
					<div className={'big_icon_layer ' + (this.state.paper ? 'show' : '')} onTouchEnd={this.hidePaper.bind(this)}><div><div onTouchEnd={this.stopPro} className='paper_wrap'>{paperWords}</div></div></div>
					
					{/* 底部文字提示	z-index:25 */}
					{this.state.overstep !== 5 && this.start ? <PromptLine msg={this.state.msg} isOpened = {this.state.isOpened} bigIcon = {this.state.bigIcon}/> : ''}

					{/* 成功逃脱 		z-index:30 */}
					<Share hide={this.state.overstep!==5} />

					{this.blink ? <div className='blink'><img src='../static/images/cover/blink.gif' /></div> : ''}
				</div>
			)
		}

		update(data){
			this.setState(data);
		}

		/* 隐藏大图层 */
		hideBigIcon(){
			this.setState({
				showMaskLayer: false,
				bigIcon:''
			})
		}

		stopPro(e){
			e.stopPropagation();
			e.nativeEvent.stopImmediatePropagation();
		}

		hidePaper(){
			var opts = {paper:false}

			opts.showMaskLayer = !!this.state.bigIcon

			gameActions.commit(opts);

			var msg = [
				['还有其他人被困在这里过！','他都经历了一些什么？','可能还会有其他纸条，快找找！'],
				['这个房间里还藏着多少秘密？','上一张纸条里的那个人，果然已经死了吗？'],
				['戒指？好像在哪里见过。','那些图腾是什么呢？','潘多拉魔盒？','我越来越好奇了…']
			]
			gameActions.showPrompt(msg[this.state.paperPicked.length-1]);
		}

		/* 前一个场景 */
		prevScene(){
			this.sceneCut(-1);
		}

		/* 后一个场景 */
		nextScene(){
			this.sceneCut(1);
		}

		/* 场景切换 */
		sceneCut(index){
			var newCur = this.state.curScenseIndex + index;
			newCur = newCur < 1 ? 5 : (newCur > 5 ? 1 : newCur);

			gameActions.sceneCut(newCur);

			gameActions.showPrompt('');
		}

		/* 将秒数转化为 hh:mm:ss 格式 */
	    formatSecond(a){
	        if(a < 0) return '';

	        var hh = parseInt(a/3600),
	            mm = parseInt(a%3600/60),
	            ss = parseInt(a%60);  

	        return this.format(hh) + ":" + this.format(mm) + ":" + this.format(ss);  
	    }

    	/* 个位数时，十位补0 */
	    format(d) {
	        return d >= 10 ? d : ("0"+d);
	    }
	}