'use strict';
export const MeasureParts = React.createClass({
	componentDidMount (){},
	componentWillReceiveProps(nextProps){},
	render:function(){
		let data = this.props.selectState;
		let onlineStatus = data.onlineStatus;
		let battery = data.battery;
		let selectPart = data.selectPart;
		let selectPartName = data.selectPartName;
		let measureStatus = data.measureStatus;
		let measureDataArray = data.measureDataArray;
		let skinMeasure = onlineStatus==2 ? data.skinMeasure: data.skinMeasure;
		let min = data.min;
		//进度条
		let progress = 0;
			measureDataArray.map((o,i)=>{ o.isMeasured && progress++;});
			progress = progress*20;
		//电量
		battery<4 && het.toast('battery'+battery)
		//状态动画提示文案
		let measureStatusTxt =
			[
				'请选择一个部位',
				'设备初始化中...',
				'请将设备贴近'+selectPartName,
				'正在测试'+selectPartName+'...',
				'测试成功,请选择下一个部位',
				'测试失败，请重新测试',
				'初始化失败',
				'',//请求汇总结果成功
				'',//请求汇总结果失败
				'五点设备全部测试完成',
				''//offline不在这里维护
			][measureStatus];
		let offline = <p className="offline"><span>设备不在线</span><span>请开启设备，并确保网络连接正常</span></p>;

		//测试过程动画
		let measureAnima = null;
		if(measureStatus == 0) measureAnima = <div className="pulse"></div>
		if(measureStatus == 1) measureAnima = <div className="initialize"></div>
		if(measureStatus == 2) measureAnima = <div className="measuring"></div>
		if(measureStatus == 3) measureAnima = <div className="measuring"></div>
		let partArr= ['额头','右脸' ,'鼻子', '下巴',' 左脸'];
		let Btns = measureDataArray.map(function(item,index){
			return(
				<dd className={item.isMeasured?'part measured':'part'} onTouchStart={skinMeasure} data-part={index} data-partname={item.name} key={index}>
					{(index==min && onlineStatus!=2)?<div className="pulse"><div className="un-measuring"><i></i><i></i><i></i></div></div>:null}
					{index==selectPart? measureAnima:null}
					<span className="txt">{item.name}</span>
					{
						item.isMeasured &&
						<aside className="measure-tips">
							<p><span>水:{item.water}%</span><span> 油:{item.oil}%</span></p>
							<p>弹:{item.elasticity} </p>
						</aside>
					}
					{true}
				</dd>
			)
		}.bind(this));


		return <figure className={(measureStatus==7 || measureStatus==8)?(measureStatus==7?"action-area special-suc":'action-area special-err'):'action-area'}>
					<aside className="progress-bar" style={{width:progress+'%'}}> </aside>
					<dl    className="measure-parts">{ Btns }</dl>
					<aside className={(measureStatus!=7 && measureStatus!=8 )?"measure-status":""}>
						{ onlineStatus==2 ? offline:<p className="status-txt">{measureStatusTxt}</p>}
						{ battery < 4 ? <p className="battery">设备电量低，请及时充电</p>:null}
					</aside>
		       </figure>
	}
})



