'use strict';
/**
 * 曲线图表
 */
import {EcharWater} from './EcharWater.jsx';
import {EcharTds} from './EcharTds.jsx';

export const TdsChartModel = React.createClass({
    getInitialState: function(){
        return {
            activeIndex:1,
            showchar:1
        };
    },
    handleTab:function(e){
        let activeIndex = e.target.getAttribute('data-index');
        this.setState({activeIndex:activeIndex,showchar:activeIndex});//选择曲线

    },
    render:function() {

        let activeIndex = this.state.activeIndex || 1;
        let showChars = this.state.showchar || activeIndex;
        let waterlines = this.props.lines || [];

        return  (
            <section className="StastiBody">
               <article className="tabHead flex" >
                   <div data-index={1} className="flex-cell" onTouchEnd={this.handleTab}>
                       <p data-index={1}>水质TDS值</p>
                       <i data-index={1} className={activeIndex == 1?"activt":"unactivt"}></i>
                   </div>
                   <div data-index={2} className="flex-cell" onTouchEnd={this.handleTab}>
                       <p data-index={2}>用水总量</p>
                       <i data-index={2} className={activeIndex == 2?"activt":"unactivt"}></i>
                   </div>
               </article>
                <article className={showChars == 1?'chart1':'chart1'}>
                    {waterlines.length > 0 ? showChars == 1 ?  <EcharTds TdsList={waterlines}/> :  <EcharWater WaterTotal={waterlines}/>:""}
                </article>
            </section>);
    }
});