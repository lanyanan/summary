'use strict';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} windStall  	运行速率，取值0-92
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @act  Actions.selectRate([integer])  切换档位时触发
 */
import {Actions} from './Actions.es6';

export const Range = React.createClass({
	getInitialState: function(){
        return {
        };
	},
	rangechange:function(e){
		//处理滑动更改档位
		if(this.props.rangedisable) return;
        let windStall = parseInt(e.target.value)+parseInt(this.props.rate);
        if(windStall==this.props.windStall*this.props.rate) return;
        windStall = parseInt(windStall/this.props.rate);
        if(windStall==this.props.windStall) return;
        Actions.selectRateValue(windStall);
	},
	changerate:function(e){
		//处理按钮加减更改档位
		if(this.props.rangedisable) return;
		let type = e.target.getAttribute('data-type');
		if(type == 'minus'){
			let value = parseInt(this.props.windStall*this.props.rate)-this.props.rate;
			if(value<=0){
				return;
			}else{
				value = parseInt(value/this.props.rate);
				Actions.selectRate(value);
			}
		}else if(type == 'plus'){
			let value = parseInt(this.props.windStall*this.props.rate)+parseInt(this.props.rate);
			if(value>(92+parseInt(this.props.rate))){
				return;
			}else{
				value = parseInt(value/this.props.rate);
				Actions.selectRate(value);
			}
		}
	},
	rangeTouchEnd(e){
		if(this.props.rangedisable) return;
        let windStall = parseInt(e.target.value)+parseInt(this.props.rate);
        windStall = parseInt(windStall/this.props.rate);
        Actions.selectRate(windStall);
	},
	render: function() {
		let statusId = this.props.rangedisable;
		let rangevalue = (this.props.windStall-1)*this.props.rate || '0';
		let windStall = parseInt(this.props.windStall);
		let fblock = parseInt(rangevalue/0.92)+'%';
	    return (
	        <section className="range">
	        	<a className={statusId?'minus-off':'minus-on'} data-type='minus' onTouchEnd={this.changerate} href="javascript:void(0)"></a>
	        	<section className='rangeblock'>
	        		<section className={statusId?'tips-off':'tips-on'} style={{left:fblock,marginLeft:'-'+rangevalue*0.018-0.48+'rem'}}>
	        			<span className='ratetext'>{windStall}档</span>
	        		</section>
	        		<input type='range' value={rangevalue} min='0' max='92' className='rangevalue' onChange={this.rangechange} onTouchEnd={this.rangeTouchEnd}/>
	        		<span className={'slider-runnable-track '+(statusId?'slider-off':'slider-on')}></span>
	        		<span className={statusId?'rangeblock-off':'rangeblock-on'} style={{left:fblock,marginLeft:'-'+rangevalue*0.018+'rem'}}></span>
	        	</section>
	        	<a className={statusId?'plus-off':'plus-on'} data-type='plus' onTouchEnd={this.changerate} href="javascript:void(0)"></a>
	        </section>
	    );
	}
});