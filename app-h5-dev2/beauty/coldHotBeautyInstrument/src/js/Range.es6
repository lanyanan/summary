import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} windStall  	运行速率，取值0-100
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @act  Actions.selectRate([integer])  切换档位时触发
 */
import {Actions} from './Actions.es6';

export class Range extends BaseComponent{
	constructor(props) {
	    super(props);
	    let windStall = parseInt(this.props.windStall);
	    let rate = parseInt(this.props.rate);
	    this.state = {
	        windStall: windStall,
	        rate: rate
	    };
	}
	componentDidUpdate(){
		this.offsetLeft = ReactDOM.findDOMNode(this.refs["rangeblock"]).offsetLeft;
		this.offsetWidth = ReactDOM.findDOMNode(this.refs["rangevalue"]).offsetWidth;
		//console.log(this.offsetLeft,this.offsetWidth)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.windStall!==this.state.windStall){
			this.setState({windStall: nextProps.windStall,rate: nextProps.rate})
		}
	}
	rangeChange(e){
		e.preventDefault();
		e.stopPropagation();
		//处理滑动更改档位
        let windStall = parseInt(e.target.value)+this.state.rate;
        windStall = parseInt(windStall/this.state.rate);
        this.setState({windStall: windStall});
	}
	rangeTouchEnd(e){
		e.preventDefault();
		e.stopPropagation();
		// if(this.props.showRange) return;
		let windStall = e.changedTouches[0].clientX - parseInt(this.offsetLeft);
		windStall = windStall>this.offsetWidth?this.offsetWidth:windStall;
		windStall = windStall<0?0:windStall;
        windStall = windStall*100/this.offsetWidth;
        if(windStall>=0&&windStall<12.5){
        	windStall = 1;
        }else if (windStall>=12.5&&windStall<37.5) {
        	windStall = 2;
        }else if (windStall>=37.5&&windStall<62.5) {
        	windStall = 3;
        }else if (windStall>=62.5&&windStall<87.5) {
        	windStall = 4;
        }else if (windStall>=87.5&&windStall<=100) {
        	windStall = 5;
        }
        // windStall = parseInt(windStall/this.props.rate)+1;
        this.setState({windStall: windStall});
	}
	confirmValue(e){
		this.props.callback(this.state.windStall);
	}
	cancelRange(e){
		e.preventDefault();
		e.stopPropagation();
		this.props.cancelback();
	}
	preDefault(e){
		let range = e.target.getAttribute('type');
		if(range!=='range'){
			e.preventDefault();
			e.stopPropagation();
		}
		
	}
	render() {
		// console.log(this.state.windStall)
		let statusId = this.props.showRange;
		let rangevalue = (this.state.windStall-1)*this.state.rate || '0';
		let windStall = parseInt(this.state.windStall);
		let fblock = parseInt(rangevalue)+'%';
	    return (
	        <section className="m-range" style={statusId?{display:''}:{display: 'none'}} onTouchStart={this.preDefault.bind(this)}>
	        	<section className='range-shade' onTouchStart={this.cancelRange.bind(this)}></section>
	        	<section className='range-con' style={{bottom:statusId? 0 :"-15rem"}}>
	        		<section className='confirm-btn flex'>
	        			<span onTouchTap={this.cancelRange.bind(this)}>取消</span>
	        			<span onTouchTap={this.confirmValue.bind(this)}>确认</span>
	        		</section>

	        		<section className='range-detail flex'>
	        			<section className='rangeblock' ref='rangeblock'>
	        				<section className='tip-text' style={{left:fblock,marginLeft:'-'+rangevalue*0.01667-0.48+'rem'}}>
	        					<span className='ratetext'>{windStall}</span>
	        				</section>
	        				<input type='range' ref="rangevalue" value={rangevalue} min='0' max='100' className='rangevalue' onChange={this.rangeChange.bind(this)} onTouchEnd={this.rangeTouchEnd.bind(this)}/>
	        				<span className='color-bar' style={{width: fblock}}></span>
	        				<span className='rangeblock-on' style={{left:fblock,marginLeft:'-'+rangevalue*0.01667+'rem'}}></span>
	        			</section>
	        		</section>
	        		
	        		<section className='range-icon flex'>
	        			<img src={this.props.imgSrc[0]}/>
	        			<img src={this.props.imgSrc[1]}/>
	        		</section>
	        	</section>
	        </section>
	    );
	}
};