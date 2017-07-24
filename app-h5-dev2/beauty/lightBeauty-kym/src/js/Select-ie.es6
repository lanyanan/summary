/**
 * 导入导出配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
//let QSlider = require("../../../common/src/lib/qslidor.jsx");
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import QSlider from '../../../common/src/lib/qslidor.jsx';
export class ies extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {};
        this.items = [
            {id:"1", text:"一档"},
            {id:"2", text:"二档"},
            {id:"3", text:"三档"},
            {id:"4", text:"四档"},
            {id:"5", text:"五档"}
        ];
        this.data = {"exp":0, "imp":0};

    }
    handlerSwitch(e) {
        var mode = typeof (this.state.other) !== "undefined" ? (this.state.other) : (this.props.other);
        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
        e.preventDefault();
        this.data["imp"] = 0;
        this.data["exp"] = 0;
        this.data[mode] = value;
        this.setState({"value": value});
        SelectActions.selected(this.data);
    }
    // 导入模式
    handlerImport(e){
        e.preventDefault();
        this.setState({"other": "imp"})
        this.setState({"value": 1})
        this.data["imp"] = 1;
        this.data["exp"] = 0;
        SelectActions.selected(this.data);
    }
    // 导出模式
    handlerExport(e) {
        e.preventDefault();
        this.setState({"other": "exp"})
        this.setState({"value": 1})
        this.data["imp"] = 0;
        this.data["exp"] = 1;
        SelectActions.selected(this.data);
    }
    feedback(value) {
        var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
        this.data[mode] = value;
        SelectActions.selected(this.data);
    }
    render() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        // 导入/导出模式
        var mode = typeof this.state.other !== "undefined" ? this.state.other : this.props.other;
        return (
            <div className="select-ie">
                <div className="flex popselect-hd">
                    <span className="select-ie-btns">
                        <a ref="imp" href="#" className={mode==="imp" ? "active" :""} onTouchEnd={this.handlerImport.bind(this)}>导入</a>
                        <a ref="exp" href="#" className={mode==="exp" ? "active" :""} onTouchEnd={this.handlerExport.bind(this)}>导出</a>
                    </span>
                    <span className="popselect-hd-right flex-cell tr">
                        <a href="#" onTouchEnd={this.handlerSwitch.bind(this)} className={"qswitch " + (value == 0 ? "off" : "on")}></a>
                    </span>
                </div>
                <QSlider disabled={value==0?true:false} items={this.items} value={value} fnFeedback={this.feedback.bind(this)} />
            </div>
        );
    }
};

