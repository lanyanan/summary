import {gameStore} from '../stores/gameStore';
import {globActions} from '../actions/actions';
import gMain from '../config';

export default class Share extends React.Component{
	componentWillMount(){
		this.state = {hide:true, time:0};
		this.unlock = false;
	}

	componentWillReceiveProps(nextProps){
		if(this.props.hide == nextProps.hide) return;
		this.state.time = gameStore.getTime();
		if(this.state.time){
			var title = '我用'+ this.timeformat(this.state.time) +'逃出了密室，还抽到了大奖，大家快来挑战我！——全球仅3人能在60秒内通关！',
	            link = gMain.env.frontPath + 'escapeRoom/page/index.html',
	            desc = '通关有好礼，70秒内通关还能申领神秘大礼',
	            imgUrl = gMain.env.frontPath + '/escapeRoom/static/images/share2.png';

	        wx.onMenuShareTimeline({
                title: title,
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            })
		}
		this.unlock = (this.state.time && this.state.time <= 70);
	}

	showRank(){
        globActions.showRank(true);
    }

	render(){
		var {hide, time} = this.state,
			challenge = time > 70 ? '挑战70秒' : (time > 60 ? '挑战60秒' : '挑战极限');

		return (
			<div className={'share ' + (this.props.hide ? 'hidden' : '')} >
				

				<div className='img_wrap'>
					<div className='rank_icon'>查看排名<div className='click_area' onTouchEnd={this.showRank}></div></div>
					<div className='pass_award'>
						<div className='flex'>
							<div className='flex1 flex-cell'><img className='qr_code' src='../static/images/cover/qr-code.jpg' /></div>
							<div className='flex3 flex-cell'>
								<p>你使用<span className='red'>{time}秒</span>逃出了密室</p>
								{this.unlock ? <p>已为你解锁千元神秘大奖</p> : ''}
								{/*<p>{this.unlock ? '并' : ''}获得一张真人密室逃脱体验券</p>
								<div>长按识别二维码，进入公众号点击“领奖”，即可免费领取全国主流密室逃脱门店体验券！</div>*/}
								<div className='prize_desc'>排名前十的玩家有机会将价值20000元的智能卧室套装带回家！扫码关注公众号了解详情吧！</div>
								{this.unlock ? '' : <p className='tips_70'><span className='red'>70秒</span>内通关，可解锁千元神秘大奖</p>}
							</div>
						</div>
					</div>
					
					{/* 再玩一次 */}
					<a className='again_btn' onTouchEnd={this.reload}><span>{challenge}</span></a>

					{/* 神秘大奖 */}
					<a id='acceptBtn' className={this.unlock ? 'accept_btn' : 'lock_btn'} onTouchEnd = {this.tongji.bind(this)} href={this.unlock ? 'http://wj.qq.com/s/849672/7634?from=singlemessage&isappinstalled=0' : 'javascript:void(0)'}>
						<span>填写问卷申领神秘大奖</span>
					</a>

					{/* 去炫耀 */}
					<div className='share_btn' onTouchEnd={this.showDim.bind(this,true)} ><span>智商超群</span></div>
				</div>
				
				<div className={'dim_layer ' + (hide ? 'hidden' : '')} onTouchEnd={this.showDim.bind(this,false)}></div>

				<img className={'tip_icon ' + (hide ? 'hidden' : '')} src='../static/images/cover/12.png' />

			</div>	
		)
	}

	showDim(flag){
		var dom = document.querySelector('.tip_icon');
		if(window.isRotate){
			dom.style.left = 0;
            dom.style.right = 'initial';
            dom.src = '../static/images/cover/11.png';
		}else{
			dom.style.left = 'initial'
            dom.style.right = 0;
            dom.src = '../static/images/cover/12.png';
		}
		this.setState({
			hide: !flag
		});
	}

	timeformat(sec){
		if(sec <= 100) return sec + '秒';

		var h = parseInt(sec/3600),
			m = parseInt((sec%3600)/60),
			s = parseInt((sec%3600)%60);
		return (h ? (h + '小时') : '') + (h || m ? (m + '分') : '') + s + '秒';
	}

	tongji(e){
		if(this.unlock){
			_hmt.push(['_trackEvent', 'research', 'click', 'charles']);
		}else{
			e.preventDefault();
		}
		
	}

	stopPro(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}

	reload(){
		var href = location.href.split('?')[0];

		location.href = href + '?' + (+Date.now()) + Math.random();
	}
}