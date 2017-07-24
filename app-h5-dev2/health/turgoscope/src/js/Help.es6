import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class Help extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render(){
        return <section className="help">
            <h1>使用帮助</h1>
            <ul>
                <li>
                    <h2><i>1</i>测量准备</h2>
                    <p>测量时，请在安静环境下测量，脱去外套、毛衣等较厚的衣服，裸露上臂或穿较薄的衣服进行测量。</p>
                </li>
                <li>
                    <h2><i>2</i>使用臂带</h2>
                    <p>将臂带的空气插头插入血压计本体的空气管接口，插入后将臂带缠绕在手臂上（最好左臂），空气管的出口应在中指的延长线上，臂带与心脏齐平。</p>
                </li>
                <li>
                    <h2><i>3</i>打开血压计</h2>
                    <p>按下『开/关』键，液晶显示屏内的符号全部被点亮显示约1s。</p>
                </li>
                <li>
                    <h2><i>4</i>开始测量</h2>
                    <p>长按记忆按钮，低压位置『0』闪动，则开始充气，压力逐渐上升，低压位置动态显示当前压力。</p>
                </li>
                <li>
                    <h2><i>5</i>测量完成</h2>
                    <p>测量完成后，显示高压、低压、脉搏、单位，并自动保存结果，若检测到心率不齐，脉搏符号将闪烁。</p>
                </li>
            </ul>
        </section>;
    }
};