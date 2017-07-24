/**
 * 时间配置组件
 * 该组件为Selects子组件，由Selects.jsx文件调用
 * @prop {integer} value  时间
 * @act  SelectActions.selected([json])  该方法由父组件Selects提供，当选择模式时触发
 */

import Range from '../../../common/src/lib/range.jsx';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
export class timers extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {};
    }
    feedback(value) {
        SelectActions.selected({"time":value});
    }
    handlerClick(e){
        e.preventDefault(); // 修复ios点透bug
    }
    render() {
        var value = typeof this.state.value !== "undefined" ? this.state.value : this.props.value;
        return (
            <div className="select-time" onClick={this.handlerClick.bind(this)}>
                <div className="flex popselect-hd">
                    <h2 className="flex-cell">时长</h2>
                </div>
                <Range min="1" max="19" value={value} fnFeedback={this.feedback.bind(this)} />
                <ul className="flex">
                    <li className="flex-cell tl">1min</li>
                    <li className="flex-cell tr">19min</li>
                </ul>
            </div>
        );
    }
};



