/**
 * 主显示组件
 * @prop {integer} skinDataCode   有无肤质数据
 * @prop {string}  recommendMode  推荐模式名称
 * @prop {string}  skinType       肤质
 * @prop {integer} moisture       水分百分值
 * @prop {integer} onlineStatus   是否离线状态
 */
var DevScreen = React.createClass({
    skins : [],
    render : function() {
        return (
            <section className="screen">
                <div className="pic">
					<img className="pic" src="../static/img/ico-p.png" />
					{this.props.onlineStatus==2 ? (<span className="offline">您的设备已离线</span>) : ""}
				</div>
            </section>
        );
    }
});

module.exports = DevScreen;
