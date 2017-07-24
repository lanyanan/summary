/**
 * Created by yuanyunlong on 2016/12/27.
 */
'use strict';
/**
 * 菊花
 * @prop {boolean} show  是否显示loading动画
 * @prop {string}  info  显示文案信息，可选
 * @author   tomy
 */

export const Loading = React.createClass({
    getInitialState: function(){
        return {
            show: false,
            info: '',
        };
    },
    render: function() {
        let show = this.props.show;
        let showOpacity = show ? 1:0;
        let showInfo = this.props.info || this.state.info;
        return (
            <section ref="loading" className="loading" style={{visibility:show?"initial":"hidden",opacity:showOpacity}} >
                <figure></figure>
                <figure className="loading-flower">
                    <span>{showInfo}</span>
                </figure>
            </section>
        );
    }
});