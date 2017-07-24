'use strict';
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
export const MeasureResult = React.createClass({
	componetDidMount(){},
	render:function(){
		let data = this.props.resultState,


			dataHeight =  data.dataHeight,

			part = data.part,
			water = data.water,
			oil = data.oil,
			elasticity = data.elasticity,

			skinTypeName = data.skinTypeName,
			skinAreaRank =  `测试结果表明，您当前的肤质优于`+data.skinAreaRank+`%的同龄用户`,
			skinProblem = data.skinProblem,
			skinGuide = data.skinGuide,

			showResult ='data-area'+(data.measureResult == false ? ' hide':''),

			reMeasure = data.reMeasure;
		return (
			<section className={showResult} style={{height:dataHeight}}>
				<section className="test-again">
					<h5>{part}</h5>
					<h4>{skinTypeName}</h4>
					<button ref="history" onTouchTap={reMeasure}>重新测试</button>
				</section>
				<section className="test-data">
					<figure id="water">
						<h5 className="item">水分<b>{water}</b><span>%</span></h5>
						<p className="flex">
							<span className="flex-cell tac">缺水</span>
							<span className="flex-cell tac">正常</span>
							<span className="flex-cell tac">湿润</span>
						</p>
						<p className="flex colorful water">
							<i className="flex-cell"></i><i className="flex-cell"></i><i className="flex-cell"></i>
							<b style={{left:(water+'%')}}></b>
						</p>
						<p className="flex">
							<span className="flex-cell tal">00</span>
							<span className="flex-cell tac" style={{textIndent:'-2.1rem'}}>40%</span>
							<span className="flex-cell tac" style={{textIndent:'2.2rem'}}>60%</span>
							<span className="flex-cell tar">99%</span>
						</p>
					</figure>
					<figure id="oil">
						<h5 className="item">油性<b>{oil}</b><span>%</span></h5>
						<p className="flex">
							<span className="flex-cell tac">缺油</span>
							<span className="flex-cell tac">正常</span>
							<span className="flex-cell tac">偏油</span>
						</p>
						<p className="flex colorful oil">
							<i className="flex-cell"></i><i className="flex-cell"></i><i className="flex-cell"></i>
							<b style={{left:(oil+'%')}}></b>
						</p>
						<p className="flex">
							<span className="flex-cell tal">00</span>
							<span className="flex-cell tac" style={{textIndent:'-2.1rem'}}>40%</span>
							<span className="flex-cell tac" style={{textIndent:'2.2rem'}}>60%</span>
							<span className="flex-cell tar">99%</span>
						</p>
					</figure>

					<figure id="elasticity">
						<h5 className="item">弹性<b>{elasticity}</b></h5>
						<p className="flex">
							<span className="flex-cell tac">易皱纹</span>
							<span className="flex-cell tac"></span>
							<span className="flex-cell tal" style={{textIndent:'-1rem'}}>紧致</span>
						</p>
						<p className="flex colorful elasticity">
							<i className="flex-cell"></i><i className="flex-cell"></i><i className="flex-cell"></i>
							<b style={{left:(elasticity*10+'%')}}></b>
						</p>
						<p className="flex">
							<span className="flex-cell tal">00</span>
							<span className="flex-cell tac" style={{textIndent:'-2.1rem'}}>3.7</span>
							<span className="flex-cell tac"></span>
							<span className="flex-cell tar">9.0</span>
						</p>
					</figure>
					<aside className="test-result">{skinAreaRank}</aside>
					<aside className="test-intro">
						<h4>肤质问题</h4>
						<p>{skinProblem}</p>
					</aside>
					<aside className="test-suggest">
						<h4>护肤指南</h4>
						<p>{skinGuide}</p>
					</aside>
				</section>
			</section>
		)
	}
})



