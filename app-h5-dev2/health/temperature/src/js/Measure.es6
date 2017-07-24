'use strict';
/**
 * 测量及护理
 */
import {Actions} from './Actions.es6';
import {MeasureNurse} from './MeasureNurse.es6';
var {Router, Route, hashHistory,Link} = ReactRouter;

export const Measure = React.createClass({
    getInitialState: function(){
        return {index:0};
    },
   componentWillMount: function() {
       het.toast('babyKnow');
   },
   callback:function(value){
        if(value==this.state.index) return;
        this.setState({
           index : value
        });
   },
    render: function() {
    	let index = this.state.index || 0;
        let items = this.items;
        return (

            <div>
            <MeasureNurse active={index} callback={this.callback} />
                {index==0?
                <div>
                    <div className="nersebox">
                    	<h1>宝宝发热程度如何定义</h1>
                        <table>
                            <tbody>

                                <tr>
                                    <th>宝宝腋下温度</th>
                                    <th>发热程度</th>
                                </tr>
                                <tr>
                                    <td>34-36℃</td>
                                    <td>体温偏低</td>
                                </tr>
                                <tr>
                                    <td>37.5~38°C</td>
                                    <td>低热</td>
                                </tr>
                                <tr>
                                    <td>38.1~39°C</td>
                                    <td>中度热</td>
                                </tr>
                                <tr>
                                    <td>39.1~40.4°C</td>
                                    <td>高热</td>
                                </tr>
                                <tr>
                                    <td>>40.5°C</td>
                                    <td>超高热</td>
                                </tr>
                            </tbody>
                        </table>
                        <h1>宝宝睡眠舒适温度</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>温度</th>
                                    <th>被窝舒适度</th>
                                </tr>
                                <tr>
                                    <td>&lt;27°C</td>
                                    <td>偏凉</td>
                                </tr>
                                <tr>
                                    <td>27.1~35°C</td>
                                    <td>舒适</td>
                                </tr>
                                <tr>
                                    <td>&gt;35°C</td>
                                    <td>偏热</td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
                    <ul className="nur-list new-list">
                        <li>
                            <Link className='flex' to="/details/0" >宝宝低热怎么办<i></i></Link>
                        </li>
                        <li>
                            <Link className='flex' to="/details/1" >宝宝中热怎么办<i></i></Link>                                              
                        </li>
                        <li>
                            <Link className='flex' to="/details/2" >宝宝高热、超高热怎么办<i></i></Link>                
                        </li>
                        <li>
                            <Link className='flex' to="/details/3" >宝宝体温特点有哪些<i></i></Link>                                               
                        </li>
                        <li>
                            <Link className='flex' to="/details/4" >宝宝发热护理要点有哪些<i></i></Link>                                                 
                        </li>
                    </ul>
                </div>
                :
                <div>
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
                </div>}
           </div>
           
        );
    }
});