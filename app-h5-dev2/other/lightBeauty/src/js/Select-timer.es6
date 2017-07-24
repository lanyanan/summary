/**
 * 时间配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  时间
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
var Timer = React.createClass({
    getInitialState: function(){
        return {};
    },
    feedback : function(value) {
        SelectActions.selected({"time":value});
    },
    handlerClick : function(e){
        e.preventDefault(); // 修复ios点透bug
    },
    render : function() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-time" onClick={this.handlerClick}>
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">时长</h2>
                </div>
                <Range min="1" max="19" value={value} fnFeedback={this.feedback} />
                <ul className="flex">
                    <li className="flex-cell tl">1min</li>
                    <li className="flex-cell tr">19min</li>
                </ul>
            </div>
        );
    }
});

var Range = require("../../../common/src/lib/range.jsx");

module.exports = Timer;
