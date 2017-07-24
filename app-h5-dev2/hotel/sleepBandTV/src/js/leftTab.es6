import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class LeftTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex:0,
            selectIndex:0
        };
        this.keyDownEvent = this.keyDownEvent.bind(this);
        let date = this.formatDateTime(new Date());
        this.items = [{dataTime:date+"",sleepQuality:"暂无数据"}];
    }
    keyDownEvent(e){
        if(!this.props.dateList || this.props.dateList.length==0) return;
        if(e.keyCode == 37 || e.keyCode == 39){
            this.isLeft = false;
        }else if(e.keyCode == 38 && this.state.selectIndex >= 1){
            let value = this.state.selectIndex-1;
            this.setState({
                selectIndex: value
            });
            this.isLeft = true;
        }else if(e.keyCode == 40 && this.state.selectIndex < this.props.dateList.length-1){
            let value =  Number(this.state.selectIndex)+1;
            this.setState({
                selectIndex: value
            });
            this.isLeft = true;
        }else if(e.keyCode == 13 && this.isLeft){
            if(this.state.selectIndex == this.state.activeIndex) return;
            let date = this.props.dateList[this.state.selectIndex].dataTime;
            this.setState({
                activeIndex : this.state.selectIndex
            });
            Actions.getDayReportData(date);
            this.isLeft = false;
        }
    }
    componentDidMount() {
        window.addEventListener('keydown',this.keyDownEvent);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown',this.keyDownEvent);
    }
    formatDateTime(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
    }
    render() {
        let items = this.props.dateList || this.items;
        if(items.length>10) items = items.slice(0,10);
        let activeIndex = this.state.activeIndex || 0;
        let selectIndex = this.state.selectIndex || 0;
        return (
            <ul className="leftTab scale">
                {items.map((item,index)=>{
                    let time;
                    if(item.dataTime){
                        let arr = item.dataTime.split('-');
                        time = arr[1]+"-"+arr[2];
                    }
                    let defaultClass = (index == this.state.selectIndex &&
                        selectIndex != activeIndex) ? "dateSelect selected " : "dateSelect "
                    return(
                        <li key={index} className={defaultClass+(index==activeIndex?"active":"")}
                        data-index={index} data-time={item.dataTime}>
                            <span className="sleepDate">{time}</span>
                            <span className="sleepStatus">{item.sleepQuality}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }
}