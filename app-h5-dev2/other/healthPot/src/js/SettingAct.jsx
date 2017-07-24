'use strict';
/**
 * @props 主页控制数据展示
 */
export const SettingAct = React.createClass({
	render: function(){
		let Act = this.props.settingAct;
		let modeId = Act.modeId;
		let modeKeepImg = Act.modeKeepImg;
		let modeActName = Act.modeActName;
		let handleModeShow = Act.handleModeShow;

		let modeLive = Act.modeLive;
		let modeChange = Act.modeChange;
		let modeRunPower = Act.modeRunPower;
		let modeUnit = Act.modeUnit;

		let modeKeep = Act.modeKeep;
		let handleSelectSet = Act.handleSelectSet;

		let modeHeatTime = modeId===0 ?'':Act.modeHeatTime;
		let modeHeatTimeUnit = Act.modeHeatTimeUnit;
		let modeReserveTime = Act.modeReserveTime;

		let actWorkTimeStyle = "act-icon"+(modeChange?' change':'');

		//数据延迟，工作时间未拉取到时展示横线
		if(modeHeatTime==='--'){
			actWorkTimeStyle="act-icon";
			modeHeatTimeUnit='';
			if(modeId!=0){
				modeHeatTime=''
			}
		}

		return (
			<div className="setting-act">
				<dl className="act-show">

					<dd className={"set mode"+(modeId!==0?' on':'')} id="mode" onTouchStart={handleModeShow} >
						<span className='act-icon' style={modeKeepImg}></span>
						<h5><span>{modeActName}</span><i></i></h5>
					</dd>

					<dd className={"set power" +(modeLive==='on'?' on':'')}
						data-value={modeLive==='on'?0:''}
						data-current = 'A'
						onTouchStart={handleSelectSet}>
						<span className={"act-icon"+(modeChange?' change':'')}>
                        	<strong>{modeId===0 ?'':modeRunPower}</strong><i>{modeUnit}</i>
                        </span>
						<h5>{modeKeep? <span>保温温度</span>:<span>功率</span>}
							{modeLive?<i></i>:''}
						</h5>
					</dd>

					<dd className="set heating" id="heating">
                        <span className={actWorkTimeStyle}>
                        	<strong>{modeHeatTime}</strong><i>{modeHeatTimeUnit}</i>
                        </span>
						<h5><span>加热时长</span>{modeKeep?'':''}</h5>
					</dd>

					<dd className="set reservation" id="reservation">
                        <span className={"act-icon"+(modeChange?' change':'')}>
                        	<strong>{modeId===0 ?'':modeReserveTime}</strong><i>{modeId===0 ?'':'min'}</i>
                        </span>
						<h5><span>预约时间</span></h5>
					</dd>
				</dl>
			</div>
		)
	}
});
