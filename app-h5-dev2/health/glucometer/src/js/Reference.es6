import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
export class Reference extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle('血糖仪标准参考');
    }
    render() {
        return <section className="reference">
            <p>此标准仅供参考，具体请遵医嘱</p>
            <table>
                <thead>
                    <tr>
                        <th>个人状态</th>
                        <th>偏低</th>
                        <th>正常</th>
                        <th>偏高</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>空腹</td>
                        <td>x＜3.9</td>
                        <td>3.9≤x≤6.1</td>
                        <td>6.1＜x</td>
                    </tr>
                    <tr>
                        <td>餐后1小时</td>
                        <td>x＜6.7</td>
                        <td>6.7≤x≤9.4</td>
                        <td>9.4＜x</td>
                    </tr>
                    <tr>
                        <td>餐后2小时</td>
                        <td>x＜3.9</td>
                        <td>3.9≤x≤7.8</td>
                        <td>7.8＜x</td>
                    </tr>
                </tbody>
            </table>
            <p className="ta-r">单位：mmol/l</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>备注</p>
            <p>空腹：受检者至少空腹8小时以上</p>
            <p>餐后1小时：从进食第一口开始计算，1小时后</p>
            <p>餐后2小时：从进食第一口开始计算，2小时后</p>
        </section>;
    }
};
