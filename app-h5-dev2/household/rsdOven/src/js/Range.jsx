'use strict';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} value  	初始值
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @prop {integer} min
 * @prop {integer} max
 * @prop {integer} offe
 * @act  Actions.selectRateTemp([integer])  切换档位时触发
 */
import {Actions} from './Actions.es6';

export const Range = React.createClass({
	getInitialState: function(){
        return {
			'showtip':false
        };
	},
	rangechange:function(e){
		//处理滑动更改档位
		//console.log("e--->"+e.target.value);
		if(this.props.rangedisable) return;
		let min = this.props.min;
		let value = (parseInt(e.target.value)-min);
		value = parseInt(value/this.props.rate) + 1;
		this.setState({
			showtip:false
		});
        Actions.selectRateTemp(value);
	},
	rangeTouchEnd(e){
		this.setState({
			showtip:false
		});
		//console.log("rangeTouchEnd e--->"+e.target.value);
		if(this.props.rangedisable) return;
		let min = this.props.min;
        let value = (parseInt(e.target.value)) + parseInt(this.props.rate);
		value = parseInt(value/this.props.rate);
        Actions.selectRateTemp(value);
	},
	render: function() {
		let statusId = this.props.rangedisable;
		let rangevalue = (this.props.value-1)*this.props.rate || '0';
		let value = parseInt(this.props.value);
		let minnub = (parseInt(this.props.max - this.props.offe) - parseInt(this.props.min))/100;
		let fblock = parseInt((rangevalue)/minnub)+'%';
		//console.log("rangeTouchEnd fblock="+fblock);
		let textTemp = parseInt(value -1)*parseInt(this.props.rate)+this.props.min + this.props.offe;
		//console.log("rangeTouchEnd rangevalue="+rangevalue);
	    return (
			<section className="rangSect">
				<p className="selectTime">烘焙温度:{textTemp}°</p>
				<section className="range">
					<i>{this.props.min + this.props.offe}</i>
					<section className='rangeblock'>
						<section className={statusId?'tips-off':'tips-on'} style={{visibility: this.state.showtip?'visible':'hidden', left:fblock,marginLeft:'-'+1*0.018-0.48+'rem'}}>
							<span className='ratetext'>{textTemp}°</span>
						</section>
						<span className={'slider-runnable-track '+(statusId?'slider-off':'slider-on')}></span>
						<span className={'slider-runnable-bg-on'}></span>
						<span className={'slider-runnable-bg'} style={{width:fblock}}></span>
						<span className={statusId?'rangeblock-off':'rangeblock-on'} style={{left:fblock,marginLeft:'-'+1*0.018+'rem'}}></span>
						<input type='range' value={rangevalue} step={this.props.rate} min={this.props.min} max={this.props.max - this.props.offe} className='rangevalue' onChange={this.rangechange} onTouchEnd={this.rangeTouchEnd}/>
					</section>
					<i>{this.props.max}</i>
				</section>
			</section>

	    );
	}
});