/**
 * 按摩配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  模式id
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
export class kneads extends BaseComponent{
    constructor(props) {
            super(props);
            this.state = {};

    }
    handlerSwitch(e) {
        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.value) ? 0 : 1;
        e.preventDefault();
        this.setState({value:value});
        SelectActions.selected({"knead":value});
    }
    render() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-uts">
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">按摩</h2>
                    <span className="popselect-hd-right flex-cell tr">
                        <a href="#" onTouchEnd={this.handlerSwitch.bind(this)} className={"qswitch " + (value == 0 ? "off" : "on")}></a>
                    </span>
                </div>
            </div>
        );
    }
};


