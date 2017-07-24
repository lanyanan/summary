/**
 * 采光配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
var Lights = React.createClass({
    getInitialState: function(){
        return {};
    },
    items : [
        {id:"1", text:"黄光"},
        {id:"2", text:"蓝光"},
        {id:"3", text:"红光"}
    ],
    handlerClick : function(e) {
        var value = e.target.getAttribute("data-value");
        if ((typeof this.state.value !== "undefined" ? this.state.value : this.props.value)==0) {return false;} // 控件关闭状态，不允许点击
        this.setState({value:value});
        SelectActions.selected({"light":value});
    },
    handlerSwitch : function(e) {
        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
        e.preventDefault();
        this.setState({value:value});
        SelectActions.selected({"light":value});
    },
    render : function() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-modes select-lights">
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">彩光</h2>
                    <span className="popselect-hd-right flex-cell tr" style={{textAlign:'right'}}>
                        <a href="#" onTouchEnd={this.handlerSwitch} className={"qswitch " + (value == 0 ? "off" : "on")}></a>
                    </span>
                </div>
                <menu>
                    {this.items.map(function(item,index){
                        return <input key={index} className={item.id == value ? "active" : ""} type="button" value={item.text} data-value={item.id} onTouchEnd={this.handlerClick} />;
                    }.bind(this))}
                </menu>
            </div>
        );
    }
});

module.exports = Lights;
