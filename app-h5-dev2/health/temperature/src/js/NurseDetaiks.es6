'use strict';
/**
 * 退热治疗
 */
import {Actions} from './Actions.es6';
import {MeasureNurse} from './MeasureNurse.es6';

export const NurseDetaiks = React.createClass({
    getInitialState: function(){
        return {};
    },
   
    render: function() {
    	let index = this.props.index || 0;
        let items = this.items;
        return (

            <div>
            <MeasureNurse timelist={this.state.timeArray} templist={this.state.tempArray}/>
            <div className="nersebox">
            	<h1>宝宝退热药推荐</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>药品名称</th>
                            <th>用量</th>
                            <th>药物作用</th>
                        </tr>
                        <tr>
                            <td>扑热息痛</td>
                            <td>间隔6小时服用一次，一般使用不超过3天</td>
                            <td>大剂量的使用会引起肝脏损伤</td>
                        </tr>
                        <tr>
                            <td>布洛芬（芬必得、异丁苯丙酸）</td>
                            <td>5-10毫克/公斤体重/次，每6-8小时1次</td>
                            <td>退热快，肠道刺激小</td>
                        </tr>
                        <tr>
                            <td>小儿退热栓</td>
                            <td>主要用来塞肛门</td>
                            <td>肠道吸收，退烧快。大剂量使用易造成宝宝体温骤降或者腹泻</td>
                        </tr>
                    </tbody>
                </table>
           </div>
            <h1 className="nurborder">物理降温方法推荐</h1>
            <ul className="nur-list">
                <li>
                    <p>1、洗温水澡，洗后及时裹上浴巾，擦干身体穿上衣服。</p>
                    <p>2、可以使用冷湿毛巾擦浴全身，尤其是大血管走行的位置，如：腋下、腹股沟等部位，擦至皮肤发红为止。</p>
                    <p>3、可以头枕冰袋、冷水袋，用冷水袋或冰袋放置在腋下、颈部两侧、腹股沟以及额头，最好使用冷水袋。</p>
                </li>
            </ul>
           </div>
           
        );
    }
});