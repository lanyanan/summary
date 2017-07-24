import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
export class Reference extends BaseComponent {
    constructor(props) {
        super(props);
        het.setTitle('血压计标准参考');
    }
    render() {
        return <section className="reference">
            <p>此标准仅供参考，具体请遵医嘱</p>
            <h2>1、血压</h2>
            <table>
                <thead>
                    <tr>
                        <th>分类</th>
                        <th>收缩压</th>
                        <th>舒张压</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>正常血压</td>
                        <td>＜139</td>
                        <td>＜89</td>
                    </tr>
                    <tr>
                        <td>高血压</td>
                        <td>≥140</td>
                        <td>≥90</td>
                    </tr>
                    <tr>
                        <td>低血压</td>
                        <td>≤91</td>
                        <td>≤61</td>
                    </tr>
                </tbody>
            </table>
            <p className="ta-r">单位：mmHg</p>
            <h2>2、心率</h2>
            <table>
                <thead>
                    <tr>
                        <th>分类</th>
                        <th>脉搏</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>正常心率</td>
                        <td>60-100</td>
                    </tr>
                    <tr>
                        <td>心率过快</td>
                        <td>＞100</td>
                    </tr>
                    <tr>
                        <td>心率过慢</td>
                        <td>＜60</td>
                    </tr>
                </tbody>
            </table>
            <p className="ta-r">单位：次/分钟</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>注：此标准为成人安静时测量参考标准。</p>
            <p>&nbsp;</p>
        </section>;
    }
};
