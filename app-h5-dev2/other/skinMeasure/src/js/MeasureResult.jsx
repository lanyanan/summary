'use strict';
export const MeasureResult = React.createClass({
	componetDidMount(){},
	render:function(){
		let data = this.props.resultState,
			onlineStatus = data.onlineStatus,
			measureStatus = data.measureStatus,
			skinTypeName = data.skinTypeName,
			skinTypeDesc = data.skinTypeDesc,
			skinProblem =data.skinProblem,
			skinGuide =data.skinGuide,

			reSubmit = data.reSubmit,
			clearAll = data.clearAll;

		let resultArea =
			<section className={"measure-data"}>
				<aside className="measure-intro">
					<h4>肤质类型说明</h4>
					<p>{skinTypeDesc.tightTypeDesc}</p>
					<p>{skinTypeDesc.dryOilTypeDesc}</p>
				</aside>
				<aside className="measure-problem">
					<h4>肤质问题</h4>
					<p>{skinProblem}</p>
				</aside>
				<aside className="measure-suggest">
					<h4>护肤指南</h4>
					<p>{skinGuide}</p>
				</aside>
			</section>


		return (
			<figure className={ (measureStatus==7||measureStatus==8) ?(measureStatus==8?'result-area err':'result-area suc'):'result-area hide'}>
				<section className="measure-again">
					{
						measureStatus == 8 ?
							<div className="getting-failed">
								<p className="failed-txt">获取肤质分析结果失败，请检查网络连接</p>
								<h3 className="failed-btn" onTouchStart={reSubmit}>
									<span><i src="../static/img/i-refresh.png"/><b>刷新重试</b></span>
								</h3>
							</div>
							:
							<div className="getting-success">
								<h5>{'您的肤质为'}</h5><h4>{skinTypeName}</h4>
							</div>
					}
					<h3 ref="history" onTouchStart={clearAll}><span>重新测试</span></h3>
				</section>
				{ measureStatus == 7 ? resultArea:null }
			</figure>
		)
	}
})


