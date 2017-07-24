/**
 * 基于 swiper的选择器
 * 说明：大多数数据都是写死的而且是基于swiper的所以应用面非常窄
 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
 * @author   Yanan
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

export class PickerTime extends BaseComponent {
    constructor(porps) {
    	super(porps);
    	this.state = {
    		hours:"00",
    		minutes:"00"
    	};
    	this.listenStore(Store) //监听Store
    }
    componentDidMount() {
    	let _this = this;
    	window.mySwiper0 = new Swiper('.pickerTime-hours',{
            direction: 'vertical',
            freeMode : true,
            freeModeSticky : true,
            onInit:function(swiper){
            	if(swiper.activeIndex<10){
            		_this.setState({
            			hours:"0"+swiper.activeIndex
            		})
            	}else{
            		_this.setState({
            			hours:swiper.activeIndex
            		})
            	}
                _this.submitclock()
            },
            onSlideChangeEnd: function(swiper){
            	if(swiper.activeIndex<10){
            		_this.setState({
            			hours:"0"+swiper.activeIndex
            		})
            	}else{
            		_this.setState({
            			hours:swiper.activeIndex
            		})
            	}
            	_this.submitclock()
            },
            onTouchEnd(swiper){
            	if(swiper.activeIndex<10){
            		_this.setState({
            			hours:"0"+swiper.activeIndex
            		})
            	}else{
            		_this.setState({
            			hours:swiper.activeIndex
            		})
            	}
            	_this.submitclock()
            }
        })
        window.mySwiper1 = new Swiper('.pickerTime-min',{
            direction: 'vertical',
            freeMode : true,
            freeModeSticky : true,
            onInit:function(swiper){
                _this.submitclock()
            },
            onSlideChangeEnd: function(swiper){
            	console.log(swiper.activeIndex)
            	if(swiper.activeIndex<10){
            		_this.setState({
            			minutes:"0"+swiper.activeIndex
            		})
            	}else{
            		_this.setState({
            			minutes:swiper.activeIndex
            		})
            	}
            	_this.submitclock()
            },
            onTouchEnd(swiper){
            	console.log(swiper.activeIndex)
            	if(swiper.activeIndex<10){
            		_this.setState({
            			minutes:"0"+swiper.activeIndex
            		})
            	}else{
            		_this.setState({
            			minutes:swiper.activeIndex
            		})
            	}
            	_this.submitclock()
            }
        })
    }
    submitclock(e){
		if(typeof this.props.submitClock === 'function'){
			this.props.submitClock(this.state.hours,this.state.minutes);
		}else{
			console.log('error:the submit callback is not a function');
		}
	}
    stopDefult(e){
    	e.stopPropagation();
        e.preventDefault();
    }
    render() {
    	let _this = this;
    	let list = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
    	let arr = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"]
    	return  <div className="pickerTime">
    				<div className="pickerTime-top" onTouchStart = {this.stopDefult.bind(this)}></div>
    				<div className="pickerTime-center">
    					<span>时</span>
    					<span>分</span>
    				</div>
    				<div className="pickerTime-bottom" onTouchStart = {this.stopDefult.bind(this)}></div>
    				<div className="pickerTime-hours">
    					<div className="swiper-wrapper" >
	                       {list.map((items,index)=>{
    							return  <div key={index} className="swiper-slide">
	                                        {items}
	                                    </div>
    						})}
	                    </div>
    				</div>
    				<div className="pickerTime-min">
    					<div className="swiper-wrapper">
	    					{arr.map((items,index)=>{
    							return  <div key={index} className="swiper-slide">
	                                        {items}
	                                    </div>
    						})}
	                    </div>
    				</div>            
                </div>;              
    }
}