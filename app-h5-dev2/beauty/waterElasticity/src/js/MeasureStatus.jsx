'use strict';
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const appData = {
	markNum: 0,
	animaBoxCss: 'status-main'
}
export const MeasureStatus = React.createClass({
	componetDidMount(){},
	componentWillReceiveProps(nextProps){
		let measureStatus = nextProps.statusState.measureStatus;
		/*if(part!=0 && appData.markNum==0){
		 appData.markNum = part;
		 Actions.measureStatus({
		 measureStatus: 2
		 })
		 }*/
		console.log(measureStatus,nextProps,'-measureStatus-nextProps')

		if(measureStatus ==1) appData.animaBoxCss = 'status-main initialize'
		if(measureStatus ==2) appData.animaBoxCss = 'status-main measuring'
	},
	render:function(){
		let config = this.props.statusState;
		let part = config.part;
        let battery = config.battery;
		let statusMain = config.statusMain;
		let testingCss = config.testingCss;
		let testingAnima = config.testingAnima;

		let statusSub='',statusSubCss = '',Battery='';
		if(battery<20){
			statusSub='设备电量低，请及时充电',statusSubCss='battery-low',
				Battery = <figure className="status-sub"><img src="../static/img/i-battery-low.png"/>{statusSub}</figure>
		}
		console.log(config,Battery)

		//进入页面默认状态
		let animaBoxCss = appData.animaBoxCss;
		//初始化，请将设备贴近额头，测试中动画，是一个连续的动画过程，最后一个等到

        let showResult = 'status-area';
			if(config.measureResult == true) showResult = 'status-area hide';
		return (
			<section className={showResult}>
				<figure className={animaBoxCss}>
					<i ref="circle" className={testingCss}>{testingAnima}</i>
					<p className={part==0?'status-main':'hide'}>{statusMain}</p>
				</figure>
				{ Battery }
			</section>
		)
	}
})



