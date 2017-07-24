/**
 * 按摩配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
var Knead = React.createClass({
    getInitialState: function(){
        return {};
    },
    handlerSwitch : function(e) {
        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 6;
        e.preventDefault();
        this.setState({value:value});
        SelectActions.selected({"knead":value});
    },
    render : function() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-uts">
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">按摩</h2>
                    <span className="popselect-hd-right flex-cell tr" style={{textAlign:'right'}}>
                        <a href="#" onTouchEnd={this.handlerSwitch} className={"qswitch " + (value == 0 ? "off" : "on")}></a>
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = Knead;
