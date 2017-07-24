window.ReactDOM = React;
import {Funs} from '../../../common/src/fun.es6';
// app数据
var AppData = {};
var currentNum = 11;//保存当前的部位
var gearsCurrent;
var runTimeCurrent;
var toast = true;//toast阀门
var isUpdate = 0;//判断是否需要推数据的变量
var ElectricityData = {};//电量信息
var submitData = {};//同步手动挡数据对象
var configSubmitData ={};//同步自动挡数据对象
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
submitData.updateFlag = 0;//初始化手动挡updateFlag
configSubmitData.updateFlag = 0;//初始化自动挡updateFlag
React.initializeTouchEvents(true);// 开启触摸支持
var Range = require('../../../common/src/lib/range.jsx');
//var Funs = require('../../../common/src/fun.es6');
var QSlidor = require('../../../common/src/lib/qslidor.jsx');
// var Toast = require('../../../common/src/lib/Toast.jsx');
var CleansingSteps = require('./appCleansing-steps.es6');
var SettingButton = require('../../../common/src/lib/SettingButton.jsx');
// 定义toast函数，以供多次调用 
// var mytoastcenter = function(msg) {
//     document.getElementById('mytoast').innerHTML = "";
//     React.render(
//         <Toast verticalAlign="1" secs="2" block={false}>{msg}</Toast>,
//         document.getElementById('mytoast'),function () {
//         	setTimeout(function (argument) {
//         		document.getElementById('mytoast').innerHTML = "";
//         	},3000);
//         }
//     );
// };
window.AppActions = Reflux.createActions([
	'repaint' // 重绘
]);
var AppStore = Reflux.createStore({
	listenables: [AppActions],
    onRepaint: function(data) {
    	this.trigger(data);
    }
});
var Cleansing = React.createClass({
	mixins: [Reflux.listenTo(AppStore, 'onStatusChange')],
	getInitialState:function () {
		return{
			bgc11:"#6DDBB6",//额头
			bgc15:"#FC84A7",//右脸
			bgc12:"#FC84A7",//鼻子
			bgc14:"#FC84A7",//下颚
			bgc13:"#FC84A7",//左脸
			footerColor:"#b0b0b6",//同步按钮，激活颜色#fb84a6
			placet:"-22%",//中间小圆点的位置
			onlineStatue:"1",
			placer:"0",
			placel:"0",
			placeb:"0"
		};
	},
	componentDidUpdate:function () {
		try{
			myscroller.refresh();
		}catch(err){}
	},
	items : [
        {id:"1", text:"一档"},
        {id:"2", text:"二档"},
        {id:"3", text:"三档"},
        {id:"4", text:"四档"},
        {id:"5", text:"五档"}
    ],
	onStatusChange:function (model) {
		// model.currentRunMode判断当前的显示模式
		if (model.currentRunMode=="1") {//自动模式
			if (toast) {
				// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
				het.toast("当前为智能模式，如需自定义请选择非智能模式！");
				toast = false;
			};
			this.setState({
				qSlidorFlag:true,// 档位选择开关 false开 true关
				rangeFlag:true,//时间选择开关 false开 true关
				gears:model.faceCleanerConfig[0].gears,//档位
				currentRunMode:"1",//模式
				remark:model.faceCleanerConfig[0].remark,
				runTime:model.faceCleanerConfig[0].runTime//洁面时间
			});
		}else if(model.currentRunMode=="0"){//手动模式
			if (model.faceCleanerConfig) {
				this.setState({
					remark:model.faceCleanerConfig[currentNum-11].remark
				});
			};
			//part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
			switch(currentNum){
				case 11:
				this.setState({
					placet:"-22%",//11-额头
					placer:"0",
					placel:"0",
					placeb:"0"
				});
			    break;
			    case 12:
				this.setState({
					placet:"5%",//12-鼻子
					placer:"0",
					placel:"0",
					placeb:"0"
				});
			    break;
			    case 13:
				this.setState({
					placet:"10%",//13-左脸
					placer:"20%",
					placel:"0",
					placeb:"0"
				});
			    break;
			    case 14:
				this.setState({
					placet:"32%",//14-下颚
					placer:"0",
					placel:"0",
					placeb:"0"
				});
			    break;
			    case 15:
				this.setState({
					placet:"10%",//15-右脸
					placer:"0",
					placel:"20%",
					placeb:"0"
				});
			    break;
			}; 
			this.setState({
				qSlidorFlag:false,// 档位选择开关 false开 true关
				rangeFlag:false,//时间选择开关 false开 true关
				gears:model.currentRunConfig[currentNum-11].gears,//档位
				currentRunMode:"0",//模式
				runTime:model.currentRunConfig[currentNum-11].runTime,//洁面时间
				bgc11:"#FC84A7",//额头
				bgc15:"#FC84A7",//右脸
				bgc12:"#FC84A7",//鼻子
				bgc14:"#FC84A7",//下颚
				bgc13:"#FC84A7"//左脸
			});
			var styleList = {};
			styleList["bgc"+currentNum] = "#6DDBB6";
			this.setState(styleList);//选中的样式设置
		};
		if (model.electricity||model.chargeStatus||model.onlineStatus) {//电量判断
			this.setState({
				electricity:typeof model.electricity == "undefined" ? this.state.electricity : model.electricity,
				chargeStatus:typeof model.chargeStatus == "undefined" ? this.state.chargeStatus : model.chargeStatus,
				onlineStatus:typeof model.onlineStatus == "undefined" ? this.state.onlineStatus : model.onlineStatus
			});
		};
	},
	handlerTounch:function (event) {
		if (this.state.currentRunMode=="0") {//手动模式转化为自动
			AppData.currentRunMode = 1;
			if (AppData.faceCleanerConfig) {
				// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
				het.toast("当前为智能模式，如需自定义请选择非智能模式！");
				this.setState({
					qSlidorFlag:true,// 档位选择开关 false开 true关
					rangeFlag:true,//时间选择开关 false开 true关
					gears:AppData.faceCleanerConfig[currentNum-11].gears,//档位
					currentRunMode:"1",//模式
					remark:AppData.faceCleanerConfig[currentNum-11].remark,
					runTime:AppData.faceCleanerConfig[currentNum-11].runTime,//洁面时间
					bgc11:"#FC84A7",//额头
					bgc15:"#FC84A7",//右脸
					bgc12:"#FC84A7",//鼻子
					bgc14:"#FC84A7",//下颚
					bgc13:"#FC84A7",//左脸
					footerColor:"#fb84a6"
				});
			}else{
				// mytoastcenter("您还未测试肤质，请先测试肤质！");
				het.toast("您还未测试肤质，请先测试肤质！");
				//没有肤质的用户点击切换档位之后又切回手动挡的动画效果
				this.setState({
					currentRunMode:"1"
				},function () {
					setTimeout(function () {
						AppData.currentRunMode = 0;
						this.setState({
							currentRunMode:"0"
						});
					}.bind(this),1000);
				}.bind(this));
			}
		}else if(this.state.currentRunMode=="1"){//自动模式转化为手动
			AppData.currentRunMode = 0;
			this.setState({
				qSlidorFlag:false,// 档位选择开关 false开 true关
				rangeFlag:false,//时间选择开关 false开 true关
				gears:gearsCurrent==undefined?AppData.currentRunConfig[currentNum-11].gears:gearsCurrent,//档位
				currentRunMode:"0",//模式
				runTime:runTimeCurrent==undefined?AppData.currentRunConfig[currentNum-11].runTime:runTimeCurrent,//洁面时间
				bgc11:"#FC84A7",//额头
				bgc15:"#FC84A7",//右脸
				bgc12:"#FC84A7",//鼻子
				bgc14:"#FC84A7",//下颚
				bgc13:"#FC84A7",//左脸
				footerColor:"#fb84a6"
			});
		};
		var styleList = {};
		styleList["bgc"+currentNum] = "#6DDBB6";
		this.setState(styleList);//选中的样式设置
		isUpdate = 1;
	},
	rangeFeedbackFn:function (value) {
		//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
		//额头  鼻子  下巴  左脸  右脸 
		switch(currentNum){
			case 11:
			submitData.runtime1 = value;
		    submitData.updateFlag |= Math.pow(2, 1);
		    break;
		    case 12:
			submitData.runtime2 = value;
		    submitData.updateFlag |= Math.pow(2, 3);
		    break;
		    case 13:
			submitData.runtime4 = value;
		    submitData.updateFlag |= Math.pow(2, 7);
		    break;
		    case 14:
			submitData.runtime3 = value;
		    submitData.updateFlag |= Math.pow(2, 5);
		    break;
		    case 15:
			submitData.runtime5 = value;
		    submitData.updateFlag |= Math.pow(2, 9);
		    break;
		};
		this.setState({
				runTime:value,
				footerColor:"#fb84a6"
			},function () {
			isUpdate = 1;
			runTimeCurrent = this.state.runTime;//保存当前洁面时间
			AppData.currentRunConfig[currentNum-11].runTime=runTimeCurrent;//保存手动模式下，调节洁面时间后保存
		});
	},
	qslidorFeedbackFn:function (value) {
		//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
		//额头  鼻子  下巴  左脸  右脸 
		switch(currentNum){
			case 11:
			submitData.gears1 = value;
		    submitData.updateFlag |= Math.pow(2, 0);
		    break;
		    case 12:
			submitData.gears2 = value;
		    submitData.updateFlag |= Math.pow(2, 2);
		    break;
		    case 13:
			submitData.gears4 = value;
		    submitData.updateFlag |= Math.pow(2, 6);
		    break;
		    case 14:
			submitData.gears3 = value;
		    submitData.updateFlag |= Math.pow(2, 4);
		    break;
		    case 15:
			submitData.gears5 = value;
		    submitData.updateFlag |= Math.pow(2, 8);
		    break;
		};
		this.setState({
			gears:value,
			footerColor:"#fb84a6"
		},function () {
			isUpdate = 1;
			gearsCurrent = this.state.gears;//保存当前档位
			AppData.currentRunConfig[currentNum-11].gears = gearsCurrent;//保存手动模式下，调节档位后保存
		});
	},
	handlerTounchList:function (num,event) {
		currentNum = num;//保存当前部位
		//part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
		switch(currentNum){
			case 11:
			this.setState({
				placet:"-22%",//11-额头
				placer:"0",
				placel:"0",
				placeb:"0"
			});
		    break;
		    case 12:
			this.setState({
				placet:"5%",//12-鼻子
				placer:"0",
				placel:"0",
				placeb:"0"
			});
		    break;
		    case 13:
			this.setState({
				placet:"10%",//13-左脸
				placer:"20%",
				placel:"0",
				placeb:"0"
			});
		    break;
		    case 14:
			this.setState({
				placet:"32%",//14-下颚
				placer:"0",
				placel:"0",
				placeb:"0"
			});
		    break;
		    case 15:
			this.setState({
				placet:"10%",//15-右脸
				placer:"0",
				placel:"20%",
				placeb:"0"
			});
		    break;
		};
		if (this.state.currentRunMode=="1") {//自动模式
			this.setState({
				qSlidorFlag:true,// 档位选择开关 false开 true关
				rangeFlag:true,//时间选择开关 false开 true关
				gears:AppData.faceCleanerConfig[num-11].gears,
				currentRunMode:"1",
				runTime:AppData.faceCleanerConfig[num-11].runTime,
				remark:AppData.faceCleanerConfig[num-11].remark,
				bgc11:"#FC84A7",//额头
				bgc15:"#FC84A7",//右脸
				bgc12:"#FC84A7",//鼻子
				bgc14:"#FC84A7",//部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
				bgc13:"#FC84A7"//左脸
			});//复原样式
		}else if(this.state.currentRunMode=="0"){//手动模式
			if (AppData.faceCleanerConfig) {
				this.setState({
					remark:AppData.faceCleanerConfig[num-11].remark
				});
			};
			this.setState({
				qSlidorFlag:false,// 档位选择开关 false开 true关
				rangeFlag:false,//时间选择开关 false开 true关
				gears:AppData.currentRunConfig[num-11].gears,
				currentRunMode:"0",
				runTime:AppData.currentRunConfig[num-11].runTime,
				bgc11:"#FC84A7",//额头
				bgc15:"#FC84A7",//右脸
				bgc12:"#FC84A7",//鼻子
				bgc14:"#FC84A7",//下颚
				bgc13:"#FC84A7"//左脸
			});//复原样式
		};
		isUpdate = 1;//在切换部位的时候也把推入的数据屏蔽
		var styleList = {};
		styleList["bgc"+num] = "#6DDBB6";
		this.setState(styleList);//选中的样式设置
	},
	handlerSubmit:function () {
		if (this.state.footerColor=="#fb84a6") {//当按钮颜色为#fb84a6才可以提交数据
			var currentRunMode = this.state.currentRunMode;//当前的模式
			if (currentRunMode=="1") {//自动模式提交
				var configData = AppData.faceCleanerConfig;//自动挡数据
				configSubmitData.gears1 = configData[0].gears;
				configSubmitData.gears2 = configData[1].gears;
				configSubmitData.gears4 = configData[2].gears;
				configSubmitData.gears3 = configData[3].gears;
				configSubmitData.gears5 = configData[4].gears;
				configSubmitData.runtime1 = configData[0].runTime;
				configSubmitData.runtime2 = configData[1].runTime;
				configSubmitData.runtime4 = configData[2].runTime;
				configSubmitData.runtime3 = configData[3].runTime;
				configSubmitData.runtime5 = configData[4].runTime;
				configSubmitData.configMode = "1";
				var currentData = AppData.currentRunConfig;//手动模式的配置数据
				if (configData[0].gears!=currentData[0].gears) {
				    configSubmitData.updateFlag |= Math.pow(2, 0);
				};
				if (configData[1].gears!=currentData[1].gears) {
				    configSubmitData.updateFlag |= Math.pow(2, 2);
				};
				if (configData[2].gears!=currentData[2].gears) {//左脸 gear4
				    configSubmitData.updateFlag |= Math.pow(2, 6);
				};
				if (configData[3].gears!=currentData[3].gears) {//下巴  gear3
				    configSubmitData.updateFlag |= Math.pow(2, 4);
				};
				if (configData[4].gears!=currentData[4].gears) {
				    configSubmitData.updateFlag |= Math.pow(2, 8);
				};
				if (configData[0].runTime!=currentData[0].runTime) {
				    configSubmitData.updateFlag |= Math.pow(2, 1);
				};
				if (configData[1].runTime!=currentData[1].runTime) {
				    configSubmitData.updateFlag |= Math.pow(2, 3);
				};
				if (configData[2].runTime!=currentData[2].runTime) {
				    configSubmitData.updateFlag |= Math.pow(2, 7);
				};
				if (configData[3].runTime!=currentData[3].runTime) {
				    configSubmitData.updateFlag |= Math.pow(2, 5);
				};
				if (configData[4].runTime!=currentData[4].runTime) {
				    configSubmitData.updateFlag |= Math.pow(2, 9);
				};
				// mytoastcenter("当前为智能模式，如需自定义请选择非智能模式！");
				het.send(configSubmitData,function(data){
					het.toast("同步成功！");
					isUpdate = 0;//提交成功重置为0
        			configSubmitData.updateFlag = 0;//每次提交重置自动模式的updateFlag
				},function (data){
					het.toast("同步失败！");//同步失败
				});
			}else{
				submitData.configMode = 0;//手动模式提交
				het.send(submitData, function(data){
					het.toast("同步成功！");
					isUpdate = 0;//提交成功重置为0
        			submitData.updateFlag = 0;//每次提交重置手动模式的updateFlag
				},function (data) {
					het.toast("同步失败！");//同步失败
				});
			}
			this.setState({footerColor:"#b0b0b6"});//重置颜色
		};
	},
	LinkHrefTouch:function () {
		//11-额头，12-鼻子，13-左脸，14-下颚，15-右脸
		var currentRunMode = this.state.currentRunMode;//当前的模式
		var stepsData = {}; //二级页面数据对象
		if (currentRunMode=="0") {
			//手动模式提交
			stepsData = submitData;
		}else{
			//自动模式提交
			var configData = AppData.faceCleanerConfig;//自动挡数据
			stepsData.gears1 = configData[0].gears;
			stepsData.gears2 = configData[1].gears;
			stepsData.gears4 = configData[2].gears;
			stepsData.gears3 = configData[3].gears;
			stepsData.gears5 = configData[4].gears;
			stepsData.runtime1 = configData[0].runTime;
			stepsData.runtime2 = configData[1].runTime;
			stepsData.runtime4 = configData[2].runTime;
			stepsData.runtime3 = configData[3].runTime;
			stepsData.runtime5 = configData[4].runTime;
		};
		var a1 = stepsData.gears1;var b1 = stepsData.runtime1;//额头
		var a2 = stepsData.gears2;var b2 = stepsData.runtime2;//鼻子
		var a4 = stepsData.gears4;var b4 = stepsData.runtime4;//左脸
		var a3 = stepsData.gears3;var b3 = stepsData.runtime3;//下颚
		var a5 = stepsData.gears5;var b5 = stepsData.runtime5;//右脸
		location.href = "./cleansing.html#/steps/"+a1+"/"+b1+"/"+a2+"/"+b2+"/"+a4+"/"+b4+"/"+a3+"/"+b3+"/"+a5+"/"+b5;
	},
	render:function (){
		var onlineStatus = this.state.onlineStatus;//在线状态（1-正常，2-异常）
		var electricity = this.state.electricity;//电量（1-电量低于5%，2-电量低于10%，3-电量低于20%，4-电量正常，5-电池电压过高）
		var chargeStatus = this.state.chargeStatus;//充电状态（1无充电,2-充电电压正常，3-充电电压过低，4-充电电压过高）
		// console.log('state', this.state);
		var footerColor = getSaveFlag(this.state) ? '#fb84a6' : '#b0b0b6';
		return(
			<div>
				<div className="appMain-wrap">
					<div style={{paddingBottom:50}}>
					<section className="pk-header screen">
						<div className="pic">
							<img className="pic" src="../static/img/head.png" />
							<div className="pic-place" style={{top:this.state.placet,right:this.state.placer,left:this.state.placel,bottom: this.state.placeb}}></div>
							<div className="circle clc-top" style={{backgroundColor:this.state.bgc11}} onTouchEnd={this.handlerTounchList.bind(this,11)}>额头</div>
							<div className="circle clc-left" style={{backgroundColor:this.state.bgc13}} onTouchEnd={this.handlerTounchList.bind(this,13)}>左脸</div>
							<div className="circle clc-right" style={{backgroundColor:this.state.bgc15}} onTouchEnd={this.handlerTounchList.bind(this,15)}>右脸</div>
							<div className="circle clc-chin" style={{backgroundColor:this.state.bgc14}} onTouchEnd={this.handlerTounchList.bind(this,14)}>下巴</div>
							<div className="circle clc-nose" style={{backgroundColor:this.state.bgc12}} onTouchEnd={this.handlerTounchList.bind(this,12)}>鼻子</div>
							<span className="offline" style={{display: this.state.onlineStatus==1?"none":"block"}}>您的设备已离线</span>
						</div>
						<div className="icon-v">
							<div className="icon-v-l">
								
							</div>
							<div className="icon-v-r tr">
        						<img className="right-img" onTouchEnd={this.LinkHrefTouch} src="../static/img/pic_09.png" />
							</div>
						</div>
					</section>
					<div className="gear pk-flex">
						<div className="gear-left color-00000">档位选择</div>
						<div className="gear-right pk-flex-right">
							{this.state.currentRunMode=="1"?(
								<div className="gear-choose" onTouchEnd={this.handlerTounch}>
									<div className="gear-txt">自动</div>
									<div className="gear-circle"></div>
								</div>):(
								<div className="gear-choose" onTouchEnd={this.handlerTounch}>
									<div className="gear-txts">手动</div>
									<div className="gear-circle gear-circles"></div>
								</div>
							)
						}
						</div>
					</div>
					<QSlidor value={this.state.gears}  disabled={this.state.qSlidorFlag} items={this.items} fnFeedback={this.qslidorFeedbackFn} />
					<div className="cleansing-time color-00000">
						洁面时间
					</div>
					<div className="pk-range">
						<Range disabled={this.state.rangeFlag} value={this.state.runTime} max="40" min="5" fnFeedback={this.rangeFeedbackFn} />
					</div>
					<div className="pk-range-value pk-flex">	
						<div className="pk-range-lvalue">5s</div>
						<div className="pk-range-rvalue tr">40s</div>
					</div>
					<div className="pk-cleansing-ms">
						{this.state.remark?(
								<div className="pk-cleansing-ms2">{this.state.remark}</div>
							):(
							<div className="pk-cleansing-ms3">
								<label>为使电磁洁面仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...</label>
	                            <a href="cbeauty://cbeauty_skintest">去测试肌肤&gt;&gt;</a>
							</div>
						)}
						<div className="pk-cleansing-waring" style={{display:this.state.onlineStatus==1&&this.state.chargeStatus==1&&this.state.electricity<=4?"block":"none"}}><img className="img-waring" src="../static/img/waring.png" />"电量不足，请充电！"</div>
					</div>
					</div>
				</div>
				<div id="footer" onTouchEnd={this.handlerSubmit}>
	                {/*<a href="javascript:void(0)" style={{backgroundColor:this.state.footerColor}}>同步到设备</a>*/}
                    <SettingButton settingStatus={(this.state.footerColor=="#fb84a6") ? "on" : "off"} />
	            </div>
                <RouteHandler />
	            <div id="mytoast"></div>
            </div>
		);
	}
});
// 定义路由
var Routes = (
    <Route path="/" handler={Cleansing}>
        <Route name="steps" path="steps/:gears1/:runtime1/:gears2/:runtime2/:gears4/:runtime4/:gears3/:runtime3/:gears5/:runtime5" handler={CleansingSteps}/>
    </Route>
);
// 准备就绪，开始渲染页面
het.domReady(function(){
	window.addEventListener('hashchange',function () {//监听hasn变化后改变页面标题
	var hash = location.hash;
		if (hash=="#/") {
			het.setTitle('电磁洁面仪'); 
		}else{
			het.setTitle('洁面步骤');
		};
	},false); 
	het.config({
		useUpdateFlag:true,
		onceConfigData:true,
		renderConfigData:false,
		debugMode:"print"
	});//需要调试数据开启debugMode
	ReactRouter.run(Routes, ReactRouter.HashLocation, function(Root){  
        React.render(<Root />, document.body);
    });
    /*setTimeout(function(){
	   myscroller = new IScroll("panel-scroller", {
	        vScroll:true,
	        vScrollbar:false, 
	        onBeforeScrollStart: function(e) {
	            var target = e.target; 
	            while (target.nodeType != 1) target = target.parentNode; 
	            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') 
	            e.preventDefault();
	        }
	    });
	},200);*/
	document.body.addEventListener('touchstart', function(){}); // 激活IOS设备:active效果
});
// 调用iscroll处理页面滚动

// 接收到repaint请求后将自动执行此操作
het.repaint(function(data){
    // alert(JSON.stringify(data));
    // console.log(data);
    // console.log(submitData.updateFlag+","+isUpdate);
    // console.log(!(submitData.updateFlag==0 && isUpdate==0));
    if (!(submitData.updateFlag==0 && isUpdate==0) || !(configSubmitData.updateFlag==0 && isUpdate==0)) return; // 未同步前忽略新接收到的数据
    if (data.electricity || data.onlineStatus || data.chargeStatus) {
    	ElectricityData = data;//获取电量对象
    }else if(data.currentRunMode=="0"||data.currentRunMode=="1"){//获取设备数据
    	var sortData = {};//排序数组
    	sortData.currentRunMode = data.currentRunMode;
    	submitData.configMode = data.currentRunMode;//默认模式
    	if (data.faceCleanerConfig) {
    		var arrList = data.faceCleanerConfig;//faceCleanerConfig数组推荐模式
			var dataList = [];//排序
			arrList.forEach(function(e){   
				  if (e.part=="11") {
				  	 dataList[0] = e;
				  }else if (e.part=="12") {
				  	 dataList[1] = e;
				  }else if (e.part=="13") {
				  	 dataList[2] = e;//左脸
				  }else if (e.part=="14") {
				  	 dataList[3] = e;//下巴
				  }else if (e.part=="15") {
				  	 dataList[4] = e;
				  };
			});
			sortData.faceCleanerConfig = dataList;
    	};
    	if (data.currentRunConfig) {
    		var arrListc = data.currentRunConfig;//currentRunConfig数组当前运行模式
			var dataListc = [];//排序
			arrListc.forEach(function(e){
				  if (e.part=="11") {
				  	 dataListc[0] = e;
				  	 submitData.gears1 = e.gears;
				  	 submitData.runtime1 = e.runTime;
				  }else if (e.part=="12") {
				  	 dataListc[1] = e;
				  	 submitData.gears2 = e.gears;
				  	 submitData.runtime2 = e.runTime;
				  }else if (e.part=="13") {
				  	 dataListc[2] = e;
				  	 submitData.gears4 = e.gears;
				  	 submitData.runtime4 = e.runTime;
				  }else if (e.part=="14") {
				  	 dataListc[3] = e;
				  	 submitData.gears3 = e.gears;
				  	 submitData.runtime3 = e.runTime;
				  }else if (e.part=="15") {
				  	 dataListc[4] = e;
				  	 submitData.gears5 = e.gears;
				  	 submitData.runtime5 = e.runTime;
				  }; 
			});
			sortData.currentRunConfig = dataListc;
    	};
    	// AppData = sortData;//保存排序对象
	    Funs._extends(AppData, sortData);//保存排序对象
    }; 
    Funs._extends(AppData, ElectricityData);
    AppActions.repaint(AppData);
    // AppActions.repaint(ElectricityData);
});

/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag(oriData) {
    // return !!Object.keys(het.diff(AppData)).length;
    var count = 0;
    // var data = het.diff(AppData);
    var data = het.diff(oriData);
    for (var k in data) {
        if (k==='updateFlag') continue;
        count ++;
    }
    return !!count;
}