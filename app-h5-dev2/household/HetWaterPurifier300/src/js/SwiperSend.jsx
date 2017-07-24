'use strict';
/**
 * 滤芯详情页
 */
import {Wave} from './Wave.jsx';
export class SwiperSend extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            activeIndex:0,
        }
    }
    handle2dig(e){
        let activeIndex = this.state.activeIndex || 0;
        let filters = this.props.filters;
        let filter;
        if(filters.length > 0 ) filter = filters[activeIndex];
        if(filter == undefined && activeIndex != 0) {activeIndex = 0; filter = filters[activeIndex];}
        e.preventDefault();
        if (typeof this.props.changeflr==='function') {
            this.props.changeflr(filters[activeIndex]);
        }
        e.stopPropagation();//取消冒泡
    }
    handleItem(e){
        let activeIndex = e.target.getAttribute('data-index');
        this.setState({activeIndex:activeIndex});
    }
    render() {
        let activeIndex = this.state.activeIndex || 0;
        let filters = this.props.filters;
        let filter;
        if(filters.length > 0 ) filter = filters[activeIndex];
        if(filter == undefined && activeIndex != 0) {activeIndex = 0; filter = filters[activeIndex];}
        let items = [];
        for(var index in filters){
            if(index > 4) break;
            let item = filters[index];
            items.push(<article className={index == activeIndex? "flex-cell activ":"flex-cell"} data-index={index} key={index} onTouchEnd={this.handleItem.bind(this)}>
                <i data-index={index} style={{display:parseInt(item.lifeTime) <= 10 ? "" : "none"}}></i>
                <p data-index={index}>{item.lifeTime + '%'}</p>
                <p data-index={index}>{item.nameFilter}</p>
                <p style={{visibility:"hidden"}}  data-index={index}>{item.JdFilter}</p>
            </article>);
        }

        let TextTimeDef = filter != undefined?filter.nameFilter + "寿命剩余":"没有发现设备滤芯数据";
        let TextTime = filter != undefined ?filter.lifeTime + "%":"";
        let Textday = filter != undefined ?parseInt(filter.lifeTime) * filter.coefficient + "天":"";
        return  (
            <section className="index_Swp">
                <section className="tds_cir">
                    <section className="sd_1">
                        <img src="../static/img/ic_dev.png"/>
                        <p>{TextTimeDef}<span>{TextTime}</span></p>
                        <p>{Textday}</p>
                        <p style={{display:filter != undefined?"":"none"}}onTouchEnd={this.handle2dig.bind(this)}>滤芯数据重置</p>
                    </section>
                </section>
                <section className="sd_swp">
                    <section className="flex art">
                        {items}
                    </section>
                </section>
            </section>);
    }
}