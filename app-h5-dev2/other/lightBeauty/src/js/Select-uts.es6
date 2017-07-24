/**
 * 超声波配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
var Uts = React.createClass({
    getInitialState: function(){
        return {};
    },
    items : [
        {id:"1", text:"一档"},
        {id:"2", text:"二档"},
        {id:"3", text:"三档"},
        {id:"4", text:"四档"},
        {id:"5", text:"五档"}
    ],
    handlerSwitch : function(e) {
        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
        e.preventDefault();
        this.setState({value:value});
        SelectActions.selected({"ut":value});
    },
    feedback : function(value) {
        SelectActions.selected({"ut":value});
    },
    render : function() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-uts">
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">超声波</h2>
                    <span className="popselect-hd-right flex-cell tr" style={{textAlign:'right'}}>
                        <a href="#" onTouchEnd={this.handlerSwitch} className={"qswitch " + (value == 0 ? "off" : "on")}></a>
                    </span>
                </div>
                <QSlider disabled={value==0?true:false} items={this.items} value={value} fnFeedback={this.feedback} />
            </div>
        );
    }
});

var QSlider = require("../../../common/src/lib/qslidor.jsx");

module.exports = Uts;
