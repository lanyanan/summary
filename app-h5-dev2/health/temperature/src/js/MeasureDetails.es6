'use strict';
/**
 * 帮助中心
 */
import {Actions} from './Actions.es6';
import {MeasureNurse} from './MeasureNurse.es6';


export const MeasureDetails = React.createClass({
    getInitialState: function(){
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        return {
          headerTop: isAndroid?50:64
        };
    },
    componentWillMount: function() {
       het.toast('knowDetails');
    },
    items:[
        {title:"宝宝低热怎么办？",step:[
            "1、不建议用药。多给宝宝喝开水，多休息。",
            "2、采用物理降温。洗温水澡、贴温湿敷、退热贴等",
            "3、不要给宝宝穿太多衣服或盖太厚的被子。",
            "4、采用“小珂体温仪”监测体温，密切注意病情变化。",
            "5、禁止用酒精给婴儿擦浴。"
            ]},
        {title:"宝宝中热怎么办？",step:[
            "1、宝宝体温在38.5℃以上，需要及时服用退烧。",
            "2、多给宝宝喝开水，采用物理降温，洗温水澡或贴退热贴等。",
            "3、不要给宝宝穿太多衣服或盖太厚的被子。",
            "4、采用“小珂体温仪”监测体温，密切注意病情变化。",
            "5、禁止用酒精给婴儿擦浴。",
            "6、如果宝宝体温在38.5℃以上，伴有精神不好，建议去医院"
            ]},
        {title:"宝宝高热、超高热怎么办？",step:[
            "1、必须马上去医院就医诊断。",
            "2、立即服用退烧药。",
            "3、不要给宝宝穿太多衣服或盖太厚的被子。",
            "4、采用“小珂体温仪”监测体温，密切注意病情变化。",
            "5、禁止用酒精给婴儿擦浴。"
            ]},
        {title:"宝宝体温特点有哪些？",step:[
            "由于宝宝的新陈代谢比成人旺盛，每个人的体温一天之内有波动，早晨相对低一些，下午略高，但是不能相差1℃。",
            "体温也随着孩子的活动过度、穿衣过多、环境温度过高，以及吃饭哭闹造成体温暂时升高。但是宝宝年龄越小，中枢神经系统体温调节的功能越差，皮肤汗腺发育不健全，所以孩子的体温很容易波动。"
            ]},
        {title:"宝宝发热护理要点有哪些？",step:[
            "1、充分休息：对于感冒，良好的休息是至关重要的，尽量让孩子多睡一会，适当减少户外活动。",
            "2、多喝白开水：由于患儿身体发热、呼吸增快、咳嗽多及气管中分泌物增多等原因，使体液丢失较多，因此需要多补充体液，最好的体液是白开水。",
            "3、多吃蔬菜水果：由于患儿身体发热、呼吸增快、咳嗽多及气管中分泌物增多等原因，使体液丢失较多，因此需要多补充体液，最好的体液是白开水。",
            "4、进食易消化的食物：患感冒的儿童，由于胃中消化酶的活力受到影响，一般会出现食欲不佳的现象，甚而伴有呕吐、腹泻和便秘等症状。所以，给患儿进食的食物要容易消化，不宜过咸或过甜，不进食油腻或刺激性食物。",
            ]}
    ],
    render: function() {
    	let index = this.props.params.Id || 0;
        let items = this.items;
        return (
            <div>
            <header style={{'paddingTop':this.state.headerTop}}></header>
        	<div className="low-grade">
                <h1>{items[index].title}</h1>
                <ul>
                    <li>
                        {items[index].step.map((item,i)=>{
                            return <p key = {i}><span style={{opacity:0,display:index==3?"inline":'none'}}>ada</span>{item}</p>
                        })}
                    </li>
                </ul>
            </div>
            </div>
        );
    }
});