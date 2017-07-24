'use strict';
/**
 *@{DevClose} 设备关闭
 */
import {Store,isClose} from './Store.jsx';
import {Actions} from './Actions.es6';
export const SettingClose = React.createClass({
	render:function(){
		return(
			<section className={'dev-close '+ (isClose() ? 'slide-up':'slide-down')}>
				<div className="setting-screen">
					<img src="../static/img/dev-screen.jpg"/>
				</div>
				<div className="setting-show">
					<dl className="flex">
						<dd className="flex-cell tal">
							<div>&nbsp;</div>
							<div>温度：--</div>
						</dd>
						<dd className="flex-cell tac">
							<div className="flex-cell time"></div>
							<div className="flex-cell status">待机中</div>
						</dd>
						<dd className="flex-cell tar" >
							<div className="switch" onTouchStart={this.props.handleSwitch}>
								<i></i>
								<span>开机</span>
							</div>
						</dd>
					</dl>
				</div>
				<div className="setting-act">
					<dl className="act-show">
						<dd className="set mode" id="mode">
							<span className="act-icon"></span>
							<h5><span>模式</span></h5>
						</dd>
						<dd className="set power" id="power">
                                <span className="act-icon">
                                    <strong></strong><i></i>
                                </span>
							<h5><span>功率</span></h5>
						</dd>
						<dd className="set heating" id="heating">
                                <span className="act-icon">
                                    <strong></strong><i></i>
                                </span>
							<h5><span>加热时长</span></h5>
						</dd>
						<dd className="set reservation" id="reservation">
                                <span className="act-icon">
                                    <strong></strong><i></i>
                                </span>
							<h5><span>预约时间</span></h5>
						</dd>
					</dl>
				</div>
			</section>
		)
	}
})
