/**
 * 选择模式组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
var Modes = React.createClass({
    getInitialState: function(){
        return {};
    },
    items : [
        {id:"1", text:"清洁", data:{
            ut : 3,
            imp : 0,
            exp : 3,
            knead : 6,
            light : 8,
            time : 15,
            configMode : 1
        }},
        {id:"2", text:"回春", data:{
            ut : 0,
            imp : 3,
            exp : 0,
            knead : 6,
            light : 9,
            time : 10,
            configMode : 2
        }},
        {id:"3", text:"滋养", data:{
            ut : 0,
            imp : 3,
            exp : 0,
            knead : 6,
            light : 7,
            time : 15,
            configMode : 3
        }},
        {id:"4", text:"美白", data:{
            ut : 3,
            imp : 0,
            exp : 3,
            knead : 6,
            light : 9,
            time : 13,
            configMode : 4
        }},
        {id:"5", text:"自定义", data:{
            ut : 0,
            imp : 0,
            exp : 0,
            knead : 0,
            light : 0,
            time : 5,
            configMode : 5
        }}
    ],
    handlerClick : function(e) {
        var value = e.target.getAttribute("data-value");
        var data;
        for (var i in this.items) {
            if (this.items[i].id===value) {
                data = this.items[i].data;
                break;
            }
        }
        this.setState({value:value});
        data.currentRunMode = value;
        SelectActions.selected(data);
    },
    render : function() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-modes">
                <h2>模式选择</h2>
                <menu>
                    {this.items.map(function(item){
                        return <input className={item.id == value ? "active" : ""} type="button" value={item.text} data-value={item.id} onTouchEnd={this.handlerClick} />;
                    }.bind(this))}
                </menu>
            </div>
        );
    }
});

module.exports = Modes;
