'use strict';
/**
 * 滑动式日期区间选择器
 * @prop {boolean}  show       是否显示该组件，缺省为false
 * @prop {array}    validDates 有数据的日期数组，格式：['2016-1-1', '2016-1-2', ...]
 * @prop {date}     startDate  开始时间，可选。格式：'2016-1-1'
 * @prop {date}     endDate    结束时间，可选。格式：'2016-1-1'
 * @prop {integer}  months     可选月数，缺省为12个月
 * @prop {function} cb         点确定的回调函数，返回date对象，格式：{startDate: Date1, endDate: Date2}
 */
import {BaseComponent} from '../../../../common/src/BaseComponent.class.es6';

// 创建React组件
export class SlidedCalendar extends BaseComponent {
    constructor(props) {
        super(props);
        let _this = this;
        this.top = this.props.top ? this.props.top : 0;
        this.calendar = this.createCalendarData(this.props.months || 12);
        this.shouldScroll = false; // 是否应滚动到底部
        this.state = {
            show : props.show ? props.show : false,
            validDates : (props.validDates || []).map((d)=>this.zeroTimestamp(d)),
            startDate : props.startDate ? _this.zeroTimestamp(props.startDate) : Infinity,
            endDate : props.endDate ? _this.zeroTimestamp(props.endDate) : 0
        };
        this.touchCounter = 0; // 点击计数器
        this.selectDate = this.selectDate.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount(){
        this.shouldScroll = true;
    }
    componentWillReceiveProps(props){
        let _this = this;
        this.setState({
            show : props.show ? props.show : false,
            validDates : (props.validDates || []).map((d)=>this.zeroTimestamp(d)),
            startDate : props.startDate ? _this.zeroTimestamp(props.startDate) : Infinity,
            endDate : props.endDate ? _this.zeroTimestamp(props.endDate) : 0
        });
        this.shouldScroll = true;
    }
    componentDidUpdate(){
        if (this.shouldScroll) {
            let main = ReactDOM.findDOMNode(this.refs.main);
            main.scrollTop = main.scrollHeight;
            this.shouldScroll = false;
        }
    }
    // 生成0点时间戳，用于对比
    zeroTimestamp(date){
        let time = new Date(date.toString());
        time.setHours(0);
        time.setMinutes(0);
        time.setSeconds(0);
        return time.getTime();
    }
    // 生成日历数据
    createCalendarData(forwardMonth){
        forwardMonth = parseInt(forwardMonth);
        let cData = [];
        let cursor = new Date();
        cursor.setMonth(cursor.getMonth() - forwardMonth);
        for (let i=forwardMonth; i>0; i--) {
            cursor.setMonth(cursor.getMonth() + 1);
            cData.push({
                year:cursor.getFullYear(),
                month:cursor.getMonth(),
                data:monthData(cursor)
            });
        }
        function monthData(date){
            let d = new Date(date);
            let wData = []; // 周数据
            let mData=[]; // 月数据
            let m = d.getMonth();
            d.setDate(1);
            for (var h=0; h<d.getDay(); h++) {
                wData.push(0);
            }
            for (let i=0; i<6; i++) {
                for (let j=i===0?h:0; j<7; j++) {
                    if (d.getMonth()-m===0) {
                        wData.push(d.getDate());
                    } else {
                        if ((i>=4)&& j===0) { // 排除最后一周全空的情况
                            break;
                        }
                        wData.push(0);
                    }
                    d.setDate(d.getDate()+1);
                }
                mData.push(wData);
                wData = [];
            }
            return mData;
        }
        return cData;
    }
    selectDate(e){
        let date = parseInt(e.currentTarget.getAttribute('data-date'));
        this.touchCounter ++;
        if (this.touchCounter % 2) {
            this.setState({startDate: date, endDate: 0});
        } else if(this.state.startDate>date) {
            this.touchCounter --;
            this.setState({startDate: date, endDate: 0});
            // alert('结束时间不能小于开始时间');
        } else {
            this.setState({endDate: date});
        }
    }
    submit(){
        let _this = this;
        if (typeof this.props.cb==='function') {
            this.props.cb({
                startDate : new Date(_this.state.startDate),
                endDate : new Date(_this.state.endDate)
            });
        }
        this.setState({show:false});
    }
    render(){
        let today = this.zeroTimestamp((new Date).toString());
        return <div ref='main' className="slided-calendar" style={{top:'-9rem',position:'fixed',bottom:0, display:this.state.show?'block':'none'}}>
            <ul className="sc-row head" style={{top:this.top}}>
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
            {this.calendar.map((m, idx1)=>{ // 遍历月份
                return <section key={idx1}>
                    <h2>{m.year}年{m.month+1}月</h2>
                    {m.data.map((w, idx2)=>{ // 遍历周
                        return <ul key={idx2} className="sc-row">
                            {w.map((d, idx3)=>{ // 遍历天
                                if (d!==0) {
                                    let theDay = this.zeroTimestamp(`${m.year}-${m.month+1}-${d}`);
                                    let txt = theDay===today ? '今' : d;
                                    let classNames = '';
                                    // 当天0时时间戳
                                    // 有效日期样式
                                    classNames += this.state.validDates.indexOf(theDay)>-1 ? ' sc-vali' : '';
                                    // 今天样式
                                    classNames += theDay===today ? ' sc-today' : '';
                                    // 开始样式
                                    classNames += theDay===this.state.startDate ? ' sc-start' : '';
                                    // 结束样式
                                    classNames += theDay===this.state.endDate ? ' sc-end' : '';
                                    // 区间样式
                                    classNames += (theDay>this.state.startDate && theDay<this.state.endDate) ? ' sc-among' : '';
                                    return <li key={idx3} className={classNames} data-date={theDay} onClick={this.selectDate}><i>{txt}</i></li>;
                                } else {
                                    return <li key={idx3} className="sc-e">&nbsp;</li>;
                                }
                            })}
                        </ul>;
                    })}
                </section>;
            })}
            <footer className="sc-footer">
                <a href="#" onTouchEnd={this.submit} style={{position: 'fixed',bottom: 0,width:'100%'}}>确定</a>
            </footer>
        </div>;
    }
};