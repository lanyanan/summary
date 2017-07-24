import {globActions,gameActions} from '../actions/actions';
import IScro from '../iscroll5';
export default class RankList extends React.Component{
	constructor(){
		super();
		this.state = {list:[]}
	}

	componentWillReceiveProps(nextProps){
		this.setState({list:[]});

		if(nextProps.hide != this.props.hide && !nextProps.hide){
			gameActions.getRankData((text)=>{
				var data = JSON.parse(text);
				if(data.code == 0){
					data = data.data;
					this.setState({list:data.rankingList,personalRank:data.personalRank})
				}
			})
		}
	}

	componentDidUpdate(){
		var myScroll = new IScroll('#rankUl', {  
		    mouseWheel: true,  
		});
	}

	render(){
		var pr = this.state.personalRank;
		var html = this.state.list.map((item, i)=>{
			var headImg = item.wechatIcon || "../static/images/rank/02.png";
			return (<li key={i} className={'rank_item '+ (i<3&&'red_item')}>
						<span className='column1'><i>{i+1}</i></span>
						<span className='column2'>
							<div className='head_wrap'><img className='head_img' src={headImg} /></div>
						</span>
						<span className='nickname column3'>{item.wechatName}</span>
						<span className='totalTime column4'>{item.challengeDuration}秒</span>
				</li>)
		})
		if(!html.length) html = <div className='rank_empty_tip'>正在获取，请等待。。。</div>

		var personalRank = (pr&&pr>50) ? <div className='personalRank'>我的排名：{pr}</div> : '';

		return (<div className={'rank_page'+ (this.props.hide ? ' hidden' : '')}>
					<div className='layer'></div>
					<div className='rank_content'>
						<div className='header'>{personalRank}<i><div className='click_area' onTouchEnd={this.close.bind(this)}></div></i></div>
						<div id='rankUl' className='rank_ul'>
							<ul id='rankList' className='rank_list swiper-wrapper' >{html}</ul>
						</div>
					</div>
			</div>)
	}

	close(){
		globActions.showRank(false);
	}
}