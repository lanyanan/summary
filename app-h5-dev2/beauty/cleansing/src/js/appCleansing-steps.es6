var StateMixin = ReactRouter.State;
var CleansingSteps = React.createClass({
	mixins: [StateMixin],
	componentDidUpdate:function () {
		try{
			myscrollersteps.refresh();
		}catch(err){}
	},
	componentDidMount:function (argument) {
		setTimeout(function(){
		   myscrollersteps = new iScroll("panel-scroller-steps", {
		        vScroll:true,
		        vScrollbar:false, 
		        onBeforeScrollStart: function(e) {
		            var target = e.target; 
		            while (target.nodeType != 1) target = target.parentNode; 
		            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
		            e.preventDefault();
		        }
		    });
		},200);
	},
	render:function () {
		return <div className="app-body" id="panel-scroller-steps"> 
		<div style={{paddingBottom:100}}>
		<div className="c-steps-title">请按以下步骤进行洁面</div>
		<div className="c-steps-div1">
			<div className="steps-div1-left"></div>
			<div className="steps-div1-center">
				<div className="steps-div1-center-circle">1</div>
				<div className="steps-div1-hr"></div>
			</div>
			<div className="steps-div1-right">
				<div className="steps-div1-place">额头</div>
				<div className="steps-div1-gears">档位:{this.getParams().gears1}档</div>
				<div className="steps-div1-time">洁面时间:{this.getParams().runtime1}s</div>
			</div> 
		</div> 
		<div className="c-steps-div2">
			<div className="steps-div2-left">
				<div className="steps-div2-place">鼻子</div>
				<div className="steps-div2-gears">档位:{this.getParams().gears2}档</div>
				<div className="steps-div2-time">洁面时间:{this.getParams().runtime2}s</div>
			</div>
			<div className="steps-div2-center">
				<div className="steps-div2-center-circle">2</div>
				<div className="steps-div2-hr"></div>
			</div>
			<div className="steps-div2-right">
				
			</div>
		</div>
		<div className="c-steps-div3">
			<div className="steps-div1-left"></div>
			<div className="steps-div1-center">
				<div className="steps-div1-center-circle">3</div>
				<div className="steps-div1-hr"></div>
			</div>
			<div className="steps-div1-right">
				<div className="steps-div1-place">下巴</div>
				<div className="steps-div1-gears">档位:{this.getParams().gears3}档</div>
				<div className="steps-div1-time">洁面时间:{this.getParams().runtime3}s</div>
			</div>
		</div>
		<div className="c-steps-div2">
			<div className="steps-div2-left">
				<div className="steps-div2-place">左脸</div>
				<div className="steps-div2-gears">档位:{this.getParams().gears4}档</div>
				<div className="steps-div2-time">洁面时间:{this.getParams().runtime4}s</div>
			</div>
			<div className="steps-div2-center">
				<div className="steps-div2-center-circle">4</div>
				<div className="steps-div2-hr"></div>
			</div>
			<div className="steps-div2-right">
				
			</div>
		</div>
		<div className="c-steps-div3">
			<div className="steps-div1-left"></div>
			<div className="steps-div1-center">
				<div className="steps-div1-center-circle">5</div>
			</div>
			<div className="steps-div1-right">
				<div className="steps-div1-place">右脸</div>
				<div className="steps-div1-gears">档位:{this.getParams().gears5}档</div>
				<div className="steps-div1-time">洁面时间:{this.getParams().runtime5}s</div>
			</div>
		</div>
	</div>
	</div>
	}
});
module.exports = CleansingSteps;

 