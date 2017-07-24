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
            <h1>暖心小贴士，快速get用秤技巧</h1>
            <ul>
                <li>
                    <h2><i>1</i>打开手机蓝牙</h2>
                </li>
                <li>
                    <h2><i>2</i>把称放在平坦且坚硬的地面上，否则会出现较大误差</h2>
                </li>
                <li>
                    <h2><i>3</i>触摸ON/OFF键，显示屏显示字符3秒后自动清零，进入称重等待状态</h2>
                </li>
                <li>
                    <h2><i>4</i>触摸OFF键，6秒后关机；无任何操作时，60秒后自动关机</h2>
                </li>
            </ul>
        </section>;
    }
};