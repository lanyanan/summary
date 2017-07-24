'use strict';
/**
 * 水质详情页
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

export class TdsInfo extends BaseComponent{
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
        };
        this.listenStore(Store); // 监听Store
        het.setTitle(JSON.stringify({setNavTitle:1,title:'水资源详情',setNavRightBtnHiden:1}));
        Actions.getData();
    }

    render(){
        //console.log("TdsInfo--->");
        let SourceWater = {
            SourceWaterTds: parseInt(this.state.SourceWaterTds|| 0),
            SourceSpectrumTOC: (parseInt(this.state.SourceSpectrumTOC|| 0)/100)  ,
            SourceSpectrumCOD: (parseInt(this.state.SourceSpectrumCOD || 0)/100) ,
            SourceSpectrumColor: (parseInt(this.state.SourceSpectrumColor || 0)/100),
            SourceSpectrumTurbidity: (parseInt(this.state.SourceSpectrumTurbidity || 0)/100),
            SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature|| 0),
        };
        let PureWater = {
            PureWaterTds: parseInt(this.state.PureWaterTds || 0),
            PureSpectrumTOC: (parseInt(this.state.PureSpectrumTOC || 0)/100),
            PureSpectrumCOD: (parseInt(this.state.PureSpectrumCOD || 0)/100),
            PureSpectrumColor: (parseInt(this.state.PureSpectrumColor || 0)/100),
            PureSpectrumTurbidity: (parseInt(this.state.PureSpectrumTurbidity || 0)/100) ,
        };
        let PureWateritems = [];
        let PureWaterArrayTds = [{id:1,itemName:"TDS",value:PureWater.PureWaterTds,unit:"mg/L",isNerr:PureWater.PureWaterTds> 1000?"#ff632c":""},
            {id:2,itemName:"TOC",value:PureWater.PureSpectrumTOC,unit:"mg/L",isNerr:PureWater.PureSpectrumTOC > 5?"#ff632c":""},
            {id:3,itemName:"COD",value:PureWater.PureSpectrumCOD,unit:"mg/L",isNerr:PureWater.PureSpectrumCOD > 5?"#ff632c":""},
            {id:4,itemName:"色度",value:PureWater.PureSpectrumColor,unit:"铂钴色度",isNerr:PureWater.PureSpectrumColor > 15?"#ff632c":""},
            {id:5,itemName:"浊度",value:PureWater.PureSpectrumTurbidity,unit:"NTU",isNerr:PureWater.PureSpectrumTurbidity > 3?"#ff632c":""}];

        PureWaterArrayTds.forEach(function(item){
            PureWateritems.push(<li className="itemli" style={{color:item.isNerr}} key={item.id}><span>{item.value + item.unit}</span></li>);
        });
        let SourceWateritems = [];

        let SourceWaterArrayTds = [{id:1,itemName:"TDS",value:SourceWater.SourceWaterTds,unit:"mg/L",isNerr:SourceWater.SourceWaterTds > 1000?"#ff632c":""},
            {id:2,itemName:"TOC",value:SourceWater.SourceSpectrumTOC,unit:"mg/L",isNerr:SourceWater.SourceSpectrumTOC > 5?"#ff632c":""},
            {id:3,itemName:"COD",value:SourceWater.SourceSpectrumCOD,unit:"mg/L",isNerr:SourceWater.SourceSpectrumCOD > 5?"#ff632c":""},
            {id:4,itemName:"色度",value:SourceWater.SourceSpectrumColor,unit:"铂钴色度",isNerr:SourceWater.SourceSpectrumColor > 15?"#ff632c":""},
            {id:5,itemName:"浊度",value:SourceWater.SourceSpectrumTurbidity,unit:"NTU",isNerr:SourceWater.SourceSpectrumTurbidity > 3?"#ff632c":""},
            {id:6,itemName:"水温",value:SourceWater.SourceWaterTemprature,unit:"℃",isNerr:(SourceWater.SourceWaterTemprature > 38 || (SourceWater.SourceWaterTemprature != 0 && SourceWater.SourceWaterTemprature< 5))?"#ff632c":""}];
        SourceWaterArrayTds.forEach(function(item){
            SourceWateritems.push(<li className="itemli" style={{color:item.isNerr}} key={item.id}><span>{item.value + item.unit}</span></li>);
        });
        let untList = [];
        SourceWaterArrayTds.forEach(function(item){
            untList.push(<li className="itemli" key={item.id}><span>{item.itemName}</span></li>);
        });
        //items.push(<li><span>{item.itemName+': '+item.value + item.unit}</span></li>);
        return(<section className="Tdsbody">
            <div style={{height:this.state.headerTop + 'px',width:'100%',backgroundColor:'rgb(42,204,250)'}}></div>
                    <figure className="flex">
                        <p className="flex-cell"></p>
                        <p className="flex-cell"><span>源水水质</span></p>
                        <p className="flex-cell"><span>纯水水质</span></p>
                    </figure>
                    <section className="flex Tdslist">
                        <section className="flex-cell arul">
                            <ul className="ul1">
                                {untList}
                            </ul>
                        </section>

                        <section className="flex-cell">
                                <ul className="ul1">
                                    {SourceWateritems}
                                </ul>
                        </section>
                        <section className="flex-cell">
                            <ul className="ul2">
                                {PureWateritems}
                            </ul>
                        </section>
                    </section>
                    <article className="footerArt">
                        <section>
                            <p><i></i>TDS: 总溶解固体量，即水中无机物 (钙、钠等) 含量多少的测定值。</p>
                            <p>TOC: 用来描述水系统中有机 (含碳有机物) 污染物的程度。</p>
                            <p>COD: 化学需氧量越大， 说明水体受有机物的污染越严重。</p>
                            <p>色度: 对天然水或处理后的各种水进行颜色定量测定时的指标。</p>
                            <p>浊度: 指水中悬浮物对光线透过时所发生的阻碍程度。</p>
                        </section>

                    </article>
        </section>);
    }
};

