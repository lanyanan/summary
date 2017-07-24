/**
 * 定时选择组件
 * @prop {integer} timeValue  定时时间值，取值30分钟的整数倍
 * @act  AppActions.toggleTimeClock([integer])  选择时间时触发
 */
import {Actions} from './Actions.es6';

export class ClockPick extends React.Component{
    constructor() {
        super();
        this.state={
        	value:0,
            toastShow:true,
            opacity:0
        };
        this.items= [
	        {name:"关闭", value:"0"},
	        {name:"20分钟", value:"20"},
	        {name:"40分钟", value:"40"},
	        {name:"60分钟", value:"60"}
	    ];
	    this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
        this.componentWillUpdate=this.componentWillUpdate.bind(this);
        this.componentWillUnmount=this.componentWillUnmount.bind(this);
    }
    componentWillReceiveProps(next){
    	if(next.timeValue!==this.props.timeValue){
    		this.setState({
    			value:next.timeValue
    		});
    	}
    }
    componentWillUnmount(){
        if(this.toastclock) clearInterval(this.toastclock);
        // if(this.shutdownclock) clearTimeout(this.shutdownclock);
    }
    componentWillUpdate(nextProps, nextState){
        if(nextState.toastShow!==this.state.toastShow && nextState.toastShow==true){
            let opacity = 1;
            this.toastclock = setInterval(function(){
                opacity -= 0.1;
                if(opacity<0) {
                    clearInterval(this.toastclock);
                    this.setState({
                        toastclock:false,
                        opacity:0
                    });
                }else{
                    this.setState({
                        opacity:opacity
                    });
                }
            }.bind(this),400);
        }
    }
    rangechange(e){
    	if(this.props.disable) return;
    	let newtime = e.target.value;
    	this.setState({
    		value:newtime,
            toastShow:false,
            opacity:0
    	});
        if(this.toastclock) clearInterval(this.toastclock);
    }
    submitTime(e){
    	// let trueValue = e.target.value==90?120:e.target.value;
        let trueValue = e.target.value;
    	if(this.props.timeValue == trueValue) return;
        // if(this.shutdownclock) clearTimeout(this.shutdownclock);
    	Actions.changeTime(trueValue);
        this.setState({
            toastShow:true
        });
        // let clocktime = parseInt(trueValue)*60*1000;
        // if(clocktime){
        //     this.shutdownclock = setTimeout(function(){
        //         Actions.changeSwitch();
        //     }.bind(this),clocktime);
        // }
    }
    render() {
        let time = this.state.value || this.props.timeValue || 0;
        // time = time==120?90:time;
        let left = 100*time/60+'%';
        let mLeft = '-'+22*time/60+'px';
        return (
        	<section className='clockpick'>
            	<section className="clock">
	                <input  type='range' min='0' max='60' step='1' value={time} onTouchEnd={this.submitTime.bind(this)} onChange={this.rangechange.bind(this)} />
	                <span className='slider-on'></span>
	                <span className='rangeblock-on' style={{left:left,marginLeft:mLeft}}></span>
            		{this.items.map((item,index)=>{
            			return(
            				<label className={'stallName'+index} style={{left:100*index/3+'%'}} key={index}>{item.name}</label>
            			)
            		})}
                    <div className='toast' style={{visibility:this.state.toastShow?'visible':'hidden',opacity:this.state.opacity}}>
                        {'您选择的是'+time+'分钟'}
                    </div>
            	</section>
            </section>
        );
    }
};