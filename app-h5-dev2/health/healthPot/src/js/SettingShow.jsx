'use strict';
/**
 * @props 主页运行数据展示，关机
 */
export const SettingShow = React.createClass({
	render: function(){
		let Show = this.props.settingShow;
		let modeTemp = Show.modeTemp;
		let modeName = Show.modeName;
		let modeStatus = Show.modeStatus;
		let timerMin = Show.timerMin;
		let timerHour = Show.timerHour;
		let timerSplit = Show.timerSplit;
		let handleSwitch = Show.handleSwitch;
		let statusId = parseInt(Show.statusId)-1;
		let statusCss= "flex-cell status "+(['green','green','red','orange','red','red','red','green'][statusId]);

		return (
			<div className="setting-show">
				<dl className="flex">
					<dd className="flex-cell tal">
						<div>&nbsp;</div>
						{modeTemp? <div className="temperature">温度：{modeTemp }°C</div>:<div>温度：--</div>}
						{/*<div>功率：{modeCtrlPower}{(this.state.workingmode==0)||(this.state.workingmode==undefined)?'':'W'}</div>*/}
					</dd>
					<dd className="flex-cell tac">
						<div className="flex-cell time">模式：{modeName}</div>
						<div className={statusCss}>{modeStatus}</div>
						<div className="timer">
							<span>{timerHour}</span>
							<span>{timerSplit}</span>
							<span>{timerMin}</span>
						</div>
					</dd>
					<dd className="flex-cell tar"  >
						<div className="switch" onTouchStart={handleSwitch}>
							<i></i>
							<span>关机</span>
						</div>
					</dd>
				</dl>
			</div>
		)
	}
});


