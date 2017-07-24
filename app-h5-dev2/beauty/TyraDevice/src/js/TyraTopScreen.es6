/**
 * [render description]
 * @param  {Integer} 设备离线状态 1表示在线，2表示离线
 * @param  {Integer} toggleBusiSwitch 切换自动/手动模式
 * @return {[type]}
 */
var TyraTopScreen = React.createClass({
	handleBusiSwitch : function() {
        this.props.toggleBusiSwitch();
    },
	render : function(){
		return (
			<section className="screen">
				{this.props.busiSwitch=="1"?(
                    <div className="gear-choose" onTouchEnd={this.handleBusiSwitch}>
                        <div className="gear-txt">自动</div>
                        <div className="gear-circle"></div>
                    </div>):(
                    <div className="gear-choose" onTouchEnd={this.handleBusiSwitch}>
                        <div className="gear-txts">手动</div>
                        <div className="gear-circle gear-circles"></div>
                    </div>
                )}
				<div className="pic">
					<img className="icon" src="../static/img/tyra_icon.png" />
					{
						(this.props.offline != 1) ? (
							<img className="offline" src="../static/img/tyra_offline_icon.png" />
						) : ""
					}
					{
						(this.props.offline != 1) ? (
							<p className="offlineText">您的设备已离线</p>
						) : ""
					}
				</div>
			</section>
		);
	}
});

module.exports = TyraTopScreen;