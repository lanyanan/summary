import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
let {Link} = ReactRouter;
export const SettingAnchor = React.createClass({
	render() {
        let toFixed = function(s)
        {
            let changenum=(parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
            let index=changenum.indexOf(".");
            if(index<0&&s>0){
                changenum=changenum+".";
                for(let i=0;i<s;i++){
                    changenum=changenum+"0";
                }

            }else {
                index=changenum.length-index;
                for(let i=0;i<(s-index)+1;i++){
                    changenum=changenum+"0";
                }

            }
            return changenum;
        };
        let computePercent=(remain,all)=> {
            let percent = (remain/all)*100;
            if(remain == 0||remain>all) return percent=0;
            if(percent<1){
                return percent=1;
            }
            if(percent>99.5 && percent<100) {
                return percent= 99;
            }else{
                return percent = ((remain/all)*100).toFixed(0);
            }
        };
        let settingData= this.props.settingData;
        let SourceWaterTdsValue = settingData.SourceWaterTdsValue,
            PureWaterTdsValue = settingData.PureWaterTdsValue;
        // console.log('-----------自来水，纯水',SourceWaterTdsValue,PureWaterTdsValue)
        //(1 - 纯水TDS值/ 源水TDS值) * 100  水质排名
        //纯水，源水其中都不能为0，排名计算纯水值越大，水质越好，但需要纯水值小于源水值，否则出现负数，排名计算无效
        let WaterRanking = ((1-PureWaterTdsValue/SourceWaterTdsValue)*100).toFixed(0);
        if(SourceWaterTdsValue==0 || SourceWaterTdsValue<PureWaterTdsValue) WaterRanking=0;
        if((1-PureWaterTdsValue/SourceWaterTdsValue)*100<1) WaterRanking=1;
        //PP1滤芯
        let PP1Life = settingData.PP1Life;
        let PP1LifeRemain = settingData.PP1LifeRemain;
        let PP1LifePercent= computePercent(PP1LifeRemain,PP1Life);
        //CO1滤芯
        let CO1Life = settingData.CO1Life;
        let CO1LifeRemain = settingData.CO1LifeRemain;
        let CO1LifePercent= computePercent(CO1LifeRemain,CO1Life);
        //PP2滤芯
        let PP2Life = settingData.PP2Life;
        let PP2LifeRemain = settingData.PP2LifeRemain;
        let PP2LifePercent= computePercent(PP2LifeRemain,PP2Life);
        //RO滤芯
        let ROLife = settingData.ROLife;
        let ROLifeRemain = settingData.ROLifeRemain;
        let ROLifePercent= computePercent(ROLifeRemain,ROLife);
        //CO2滤芯
        let CO2Life = settingData.CO2Life;
        let CO2LifeRemain = settingData.CO2LifeRemain;
        let CO2LifePercent= computePercent(CO2LifeRemain,CO2Life);

        let slideClass = settingData.slide==2?'index-slide slideDown':'index-slide slideUp';
        //console.log('---------settingData---',settingData);
	    return (
            <section className={slideClass} >
                <figure className="slide-title" id="slide" style={{marginBottom:'0'}}>
                    <p className="slide-rank">您的水质战胜了全国<span className="cut">{WaterRanking}</span>%的地区</p>
                    <span className="slide-arrow" onTouchStart={this.props.showQualityList}></span>
                </figure>
                <figure className="slide-inner" id="slider">
                    <Link to="SettingPanelPP1" className="flex slide-item">
                        <span className="number">
                            <strong>1</strong>
                        </span>
                        <span className="txt">
                           <div>PP棉滤芯</div>
                           <p>预计剩余天数{PP1LifeRemain}天</p>
                        </span>
                        <span className="per"><strong>{PP1Life}</strong><i>%</i></span>
                        <span className="arrow"><i></i></span>
                    </Link>
                    <Link  to="SettingPanelCO1" className="flex slide-item">
                        <span className="number">
                            <strong>2</strong>
                        </span>
                        <span className="txt">
                           <div>颗粒活性炭滤芯</div>
                           <p>预计剩余天数{CO1LifeRemain}天</p>
                        </span>
                        <span className="per"><strong>{CO1Life}</strong><i>%</i></span>
                        <span className="arrow"><i></i></span>
                    </Link>
                    <Link to="SettingPanelPP2" className="flex slide-item">
                        <span className="number">
                            <strong>3</strong>
                        </span>
                        <span className="txt">
                           <div>深度净化PP棉滤芯</div>
                           <p>预计剩余天数{PP2LifeRemain}天</p>
                        </span>
                        <span className="per"><strong>{PP2Life}</strong><i>%</i></span>
                        <span className="arrow"><i></i></span>
                    </Link>
                    <Link to="SettingPanelCO2" className="flex slide-item"  style={{background: '#fff'}}>
                        <span className="number">
                            <strong>4</strong>
                        </span>
                        <span className="txt">
                           <div>后置活性炭滤芯</div>
                           <p>预计剩余天数{CO2LifeRemain}天</p>
                        </span>
                        <span className="per"><strong>{CO2Life}</strong><i>%</i></span>
                        <span className="arrow"><i></i></span>
                    </Link>
                    <Link to="SettingPanelRO" className="flex slide-item" style={{background: '#fff'}}>
                        <span className="number">
                            <strong>5</strong>
                        </span>
                        <span className="txt">
                           <div>RO反渗透膜</div>
                           <p>预计剩余天数{ROLifeRemain}天</p>
                        </span>
                        <span className="per"><strong>{ROLife}</strong><i>%</i></span>
                        <span className="arrow"><i></i></span>
                    </Link>
                </figure>
            </section>
	    );
	}
})
