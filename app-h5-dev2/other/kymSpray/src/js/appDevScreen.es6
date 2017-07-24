/**
 * 主显示组件
 * @prop {integer} skinDataCode   有无肤质数据
 * @prop {string}  recommendMode  推荐模式名称
 * @prop {string}  skinType       肤质
 * @prop {integer} moisture       水分百分值
 * @prop {integer} onlineStatus   是否离线状态
 * <a href="cbeauty://cbeauty_skintest">去测试肌肤&gt;&gt;</a>
 */

var DevScreen = React.createClass({
    getInitialState : function() {
        return {}
    },
    baseData: {
        modes : ["", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
        skins : ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
        times : [0, 100, 40, 80, 50, 40]
    },
    render : function() {
        var tips = [
            (<span>为使智能补水喷雾仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...</span>),
            (<span>您当前为{this.baseData.skins[this.props.skinType5]}肤质，推荐您使用{this.baseData.modes[this.props.mode]}！美丽女人是养出来的~</span>),
            (<span>您使用了智能补水喷雾仪后，脸部皮肤水分提升了{this.props.waterTrend}%，请继续保持~</span>)
        ];

        return (
            <section className="screen">
                <div className="pic">
					<img className="pic" src="../static/img/ico-10.png" />
					{this.props.onlineStatus==2 ? (<span className="offline">您的设备已离线</span>) : ""}
				</div>
                <div className="tip">{tips[this.props.skinDataCode]}</div>
                {this.props.electricity <= 4 && this.props.chargeStatus < 2 && this.props.onlineStatus!=2 ? (<div className="battery"></div>) : ""}
            </section>
        );
    }
});

module.exports = DevScreen;
