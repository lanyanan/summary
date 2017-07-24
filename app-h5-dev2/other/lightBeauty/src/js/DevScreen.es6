/**
 * 主显示组件
 * @prop {integer} skinDataCode   有无肤质数据
 * @prop {string}  recommendMode  推荐模式名称
 * @prop {string}  skinType       肤质
 * @prop {integer} moisture       水分百分值
 * @prop {integer} onlineStatus   是否离线状态
 * @prop {integer} busiSwitch     是否自动模式
 * @prop {function} toggleBusiSwitch 切换自动/手动模式
 * <a href="cbeauty://cbeauty_skintest">去测试肤质&gt;&gt;</a>
 */
export const DevScreen = React.createClass({
    skins : [],
    handleBusiSwitch : function() {
        this.props.toggleBusiSwitch();
    },
    render : function() {
        let tips = [
            (<span>为使智能彩光美容仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...</span>),
            (<span>您当前肤质为{this.props.skinType}，推荐您使用{this.props.recommendMode}模式！美丽女人是养出来的~</span>),
            (<span>您使用了智能彩光美容仪后，脸部皮肤水分提升了{this.props.moisture}%，请继续保持~</span>)
        ];
        let index = this.props.skinDataCode;
        return (
            <section className="screen">
                {this.props.busiSwitch=="1"?(
                    <div className="gear-choose" onTouchEnd={this.handleBusiSwitch}>
                        <div className="gear-txt">自动</div>
                        <div className="gear-circle"></div>
                    </div>)
                :
                (
                    <div className="gear-choose" onTouchEnd={this.handleBusiSwitch}>
                        <div className="gear-txts">手动</div>
                        <div className="gear-circle gear-circles"></div>
                    </div>
                )}
                <div className="pic">
                    <img src="../static/img/ico-10.png" />
                    {this.props.onlineStatus==2 ? (<span className="offline">您的设备已离线</span>) : ""}
                </div>
                <div className="tip">{tips[index]}</div>
            </section>
        );
    }
});
