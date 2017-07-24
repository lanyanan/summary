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
                    <h2><i>1</i>消毒</h2>
                    <p>用温水洗手并擦干，用酒精棉球消毒要取血的部位。</p>
                </li>
                <li>
                    <h2><i>2</i>准备采血针</h2>
                    <p>打开采血笔，将采血笔插入笔芯杆中，拧断采血针护帽，然后把笔帽盖好。</p>
                </li>
                <li>
                    <h2><i>3</i>调整采血针</h2>
                    <p>根据手指皮肤情况调整数字环。数字越大，扎的越深。调整完后将拉套往后拉，拉套自动弹回。</p>
                </li>
                <li>
                    <h2><i>4</i>打开血糖仪</h2>
                    <p>打开血糖仪，将试条插入仪器。</p>
                </li>
                <li>
                    <h2><i>5</i>采血</h2>
                    <p>使用采血笔在消毒部位采血，注意：采血前可摩擦手指，增加血液循环；不要反复挤压，以免组织液混入血液，影响测量结果。</p>
                </li>
                <li>
                    <h2><i>6</i>测量</h2>
                    <p>挤出滴状血液，与试条接触。设备检测完成，显示测量结果。</p>
                </li>
            </ul>
        </section>;
    }
};