'use strict';
/**
 * 倒计时显示组件
 * @prop    time 传入一个十进制的时间参数，如120min
 * @author  tomy
 */
export const Timer = React.createClass({
	getInitialState: function(){
		return {
			time:0,
			timer: null
		};
	},
	componentDidMount: function() {
		//初始化时间
		this.timerInit(this.props);
	},
	componentWillUnmount:function(next){
		//console.log('卸载定时器状态'+this.state.timer)
		//需要路由才能触发
		//clearInterval(this.state.timer)
	},
	timerInit:function(next){
		//console.log('当前定时器状态'+this.state.timer)
		let t = parseInt(next.time);
		t=t*60;
		let time= ()=>{
			if(t>0){
				t--;
				let rest=0;
				let h = Math.floor(t/3600);
				rest=t%3600;
				let m = Math.floor( rest/60);
				rest=rest%60;
				let s =  Math.floor(rest);
				h=h<10?'0'+h:h;
				m=m<10?'0'+m:m;
				s=s<10?'0'+s:s;
				this.setState({h:h,m:m,s:s,t:t});
			}else if(t<=0){
				clearInterval(this.state.timer);
				this.setState({h:'',m:'',s:'',t:0});
				het.toast('预约完成');
				//if(callback){callback()}
			}
		};

		if(t==0 ||t==false){
			clearInterval(this.state.timer);
			this.setState({h:'',m:'',s:'',t:0});
		}else{
			this.state.timer = setInterval(time,1000);
		}
	},
	componentWillReceiveProps: function(next) {
		//next.time!=this.props.time
		if(next.time==0){
			clearInterval(this.state.timer);
			this.setState({h:'',m:'',s:'',t:0});
		}
		if(next.time!=this.props.time){
			clearInterval(this.state.timer);
			this.timerInit(next);
		}
		if(next.change==true){
			clearInterval(this.state.timer);
			this.timerInit(next);
		}
	},
	render: function() {
		return (
			<div className="timer">
				<span>{this.state.h}</span>
				{this.state.t===0 || this.state.t==null ?'': <span>:</span> }
				<span>{this.state.m}</span>
				{this.state.t===0 || this.state.t==null ?'': <span>:</span> }
				<span>{this.state.s}</span>
			</div>
		);
	}
});
