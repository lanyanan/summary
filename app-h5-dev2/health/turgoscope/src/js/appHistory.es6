import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ResultTable} from './ResultTable.es6';
import {SlidedCalendar} from '../../../common/src/lib/SlidedCalendar.es6';

var {Router, Route, hashHistory} = ReactRouter;
let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
let endDate = new Date();
let startDate = new Date();
startDate.setDate(startDate.getDate()-7); // 7天以前

// 日期选择器回调函数
window.datepickerCB = (date)=>{
    endDate = date.endDate;
    startDate = date.startDate;
    het.toast('leave_datepicker');
};
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

het.ready((data)=>{
    Actions.ready(data);
    Actions.getCalendarData();
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
    Actions.getCalendarData();
});


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            headerTop: isAndroid?50:0,
            slidedCalendarShow: false,
            startDate: startDate,
            endDate: endDate,
            results : [],
            validDates: [],
            countResult : {}
        };
        this.myScroll; // 定义iscroll容器
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let _this = this;
        this.myScroll = new IScroll('#history-wrap',{
            probeType: 3,
    //        momentum: false,//关闭惯性滑动
            scrollbars: false,//滚动条可见
            useTransform: true,//CSS转化
            useTransition: true,//CSS过渡
            bounce: true,//反弹
            startX: 0,
            startY: 0
        });
        this.myScroll.on('scrollEnd', pullUp);
        function pullUp(){
            if (this.directionY!==1) return; // 上拉
            if (this.y<=this.maxScrollY) {
                Actions.getHistoryData(_this.state.startDate, _this.state.endDate);
            }
        }
        setTimeout(()=>{
            Actions.getHistoryData(startDate, endDate);
        }, 1000);
        document.body.scrollTop = 0; // 修复从日期选择器返回时滚动高度不对的BUG
    }
    componentDidUpdate(){
        this.myScroll.refresh();
    }
    clickDate(e) {
        e.preventDefault();
        het.toast('datepicker_show');
        this.setState({slidedCalendarShow: true});
    }
    selectedDate(d) {
        Actions.selectedDate(d);
        Actions.getHistoryData(d.startDate, d.endDate);
    }
    // 格式化日期为 yyyy.m.d 的格式
    ymd(d) {
        return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`;
    }
    render() {
        let selDateText = `${this.ymd(this.state.startDate)}~${this.ymd(this.state.endDate)}`;
        let bpH = (this.state.countResult.highBloodPressure||'0,0').split(',');
        let bpL = (this.state.countResult.lowBloodPressure||'0,0').split(',');
        let startDate = Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd');
        let endDate = Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd');
        let datepickerUrl = `#/datepicker/${startDate}/${endDate}/datepickerCB/${this.state.headerTop}/${this.state.validDates.join(',')}`;
        return <div className="viewing-area flex-column">
            <section className="condition" style={{marginTop: isAndroid ? 73 : 0}}>
                <table>
                    <tbody>
                        <tr>
                            <td className="title">时　　段</td>
                            <td colSpan="3"><a href={datepickerUrl} className="date" onClick={()=>het.toast('enter_datepicker')}>{selDateText}</a></td>
                        </tr>
                        {!this.state.countResult.highTimes&&!this.state.countResult.lowTimes ? (
                        <tr>
                            <td>血压结果</td>
                            <td className="ta-l diag">正常</td>
                            <td className="ta-r">&nbsp;</td>
                            <td className="rs ta-r red">&nbsp;</td>
                        </tr>
                        ) : null}
                        {this.state.countResult.highTimes ? (
                        <tr>
                            <td>血压结果</td>
                            <td className="ta-l diag">偏高: {this.state.countResult.highTimes + '次'}</td>
                            <td className="ta-r">最高: </td>
                            <td className="rs ta-r red"><b>{bpH[0]}/{bpH[1]}</b>mmHg</td>
                        </tr>
                        ) : null}
                        {this.state.countResult.lowTimes ? (
                        <tr>
                            <td>{this.state.countResult.highTimes ? '' : '血压结果'}</td>
                            <td className="ta-l diag">偏低: {this.state.countResult.lowTimes + '次'}</td>
                            <td className="ta-r">最低: </td>
                            <td className="rs ta-r red"><b>{bpL[0]}/{bpL[1]}</b>mmHg</td>
                        </tr>
                        ):null}
                        {!this.state.countResult.fastTimes&&!this.state.countResult.slowTimes?(
                        <tr>
                            <td>心率结果</td>
                            <td className="ta-l diag">正常</td>
                            <td className="ta-r">&nbsp;</td>
                            <td className="rs ta-r red">&nbsp;</td>
                        </tr>
                        ):null}
                        {this.state.countResult.fastTimes?(
                        <tr>
                            <td>心率结果</td>
                            <td className="ta-l diag">偏快: {this.state.countResult.fastTimes + '次'}</td>
                            <td className="ta-r">最快: </td>
                            <td className="rs ta-r red"><b>{this.state.countResult.fastHeartRate||0}</b>次/分钟</td>
                        </tr>
                        ):null}
                        {this.state.countResult.slowTimes?(
                        <tr>
                            <td>{this.state.countResult.fastTimes ? '' : '心率结果'}</td>
                            <td className="ta-l diag">偏慢: {this.state.countResult.slowTimes ? this.state.countResult.slowTimes + '次' : '正常'}</td>
                            <td className="ta-r">最慢: </td>
                            <td className="rs ta-r blu"><b>{this.state.countResult.slowHeartRate||0}</b>次/分钟</td>
                        </tr>
                        ):null}
                    </tbody>
                </table>
            </section>
            <section id="history-wrap" className="flex-cell">
                <div>
                {this.state.results.map((it, idx)=>{
                    return <ResultTable key={idx} date={it.key} results={it.data} renderMode={2} />;
                })}
                </div>
            </section>
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('历史数据');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/datepicker/:startDate/:endDate/:cbName/:top" component={SlidedCalendar} />
            <Route path="/datepicker/:startDate/:endDate/:cbName/:top/:validDates" component={SlidedCalendar} />
        </Router>
    ), document.getElementById('ROOT'));
});