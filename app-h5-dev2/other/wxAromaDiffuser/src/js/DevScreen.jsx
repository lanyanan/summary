/**
 * 主显示组件
 * @prop {integer} colorIndex   颜色索引，设置不同颜色，取值1-7，超出范围将显示白色
 * @act  AppActions.switch() 点击开/关机按钮时触发
 */
import {Actions} from './Actions.es6';
export const DevScreen = React.createClass({
    handlerClick : function(e) {
        return Actions.switch(e);
    },
    render : function() {
        var idx = this.props.colorIndex;
        return (
            <section className="screen">
                <div className="pic">
                    {(idx>=1 && idx<=8) ? (<img src={"../static/img/aromaDiffuser/aroma-c"+idx+".png"} />) : ""}
                </div>
                <a href="javascript:" onClick={this.handlerClick} className="switch"></a>
            </section>
        );
    }
});

// module.exports = DevScreen;
