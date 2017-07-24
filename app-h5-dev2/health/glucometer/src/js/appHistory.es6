import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ResultTable} from './ResultTable.es6';
import {SlidedCalendar} from '../../../common/src/lib/SlidedCalendar.es6';

var {Router, Route, hashHistory} = ReactRouter;
let endDate = new Date();
let startDate = new Date();
startDate.setMonth(startDate.getMonth()-1); // 上月今天

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
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?53:64,
            slidedCalendarShow: false,
            startDate: startDate,
            endDate: endDate,
            resultIds: '1,2,3',  // 血糖结果（1,2,3）（1:偏低，2:正常，3：偏高）
            statusIds: '1,2,3', // 个人状态（1,2,3）（1:空腹，2:餐后一小时，3:餐后二小时）
            validDates: [],
            results : []
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
                // Actions.getHistoryData(_this.state.startDate, _this.state.endDate, _this.state.resultIds, _this.state.statusIds);
            }
        }
        setTimeout(()=>{
            Actions.getHistoryData(startDate, endDate, _this.state.resultIds, _this.state.statusIds);
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
    clickSugarResult(e) {
        e.preventDefault();
        let val = e.currentTarget.getAttribute('data-val');
        let ids = this.dealArray(this.state.resultIds.split(','), val);
        this.setState({resultIds:ids});
        Actions.getHistoryData(this.state.startDate, this.state.endDate, ids, this.state.statusIds);
    }
    clickStatus(e) {
        e.preventDefault();
        let val = e.currentTarget.getAttribute('data-val');
        let ids = this.dealArray(this.state.statusIds.split(','), val);
        this.setState({statusIds:ids});
        Actions.getHistoryData(this.state.startDate, this.state.endDate, this.state.resultIds, ids);
    }
    selectedDate(d) {
        Actions.selectedDate(d);
        Actions.getHistoryData(d.startDate, d.endDate, this.state.resultIds, this.state.statusIds);
    }
    // 格式化日期为 yyyy.m.d 的格式
    ymd(d) {
        return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`;
    }
    dealArray(oriArray, value) {
        let result = [];
        if (oriArray.indexOf(value)>-1) { // 存在则删除
            if (oriArray.length<=1) { // length<=1 最后一个不允许点掉
                het.toast('too_few_options');
            }
            oriArray.map(v=>{
                if (v!=value||oriArray.length<=1) {
                    result.push(v);
                }
            });
        } else {
            result = oriArray;
            result.push(value);
            result.sort();
        }
        return result.join(',').replace(/^,/, '');
    }
    render() {
        let selDateText = `${this.ymd(this.state.startDate)}~${this.ymd(this.state.endDate)}`;
        let startDate = Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd');
        let endDate = Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd');
        let datepickerUrl = `#/datepicker/${startDate}/${endDate}/datepickerCB/${this.state.headerTop}/${this.state.validDates.join(',')}`;
        return <div className="viewing-area flex-column">
            <section className="condition" style={{marginTop: this.state.headerTop}}>
                <dl className="flex">
                    <dt>时　　段</dt>
                    <dd className="flex-cell">
                        <a href={datepickerUrl} className="date" onClick={()=>het.toast('enter_datepicker')}>{selDateText}</a>
                    </dd>
                </dl>
                <dl className="flex">
                    <dt>血糖结果</dt>
                    <dd className="flex-cell">
                        <a href="#" data-val='1' onTouchStart={this.clickSugarResult.bind(this)} className={this.state.resultIds.indexOf(1)>-1 ? 'selected' : ''}>偏低</a>
                        <a href="#" data-val='2' onTouchStart={this.clickSugarResult.bind(this)} className={this.state.resultIds.indexOf(2)>-1 ? 'selected' : ''}>正常</a>
                        <a href="#" data-val='3' onTouchStart={this.clickSugarResult.bind(this)} className={this.state.resultIds.indexOf(3)>-1 ? 'selected' : ''}>偏高</a>
                    </dd>
                </dl>
                <dl className="flex">
                    <dt>个人状态</dt>
                    <dd className="flex-cell">
                        <a href="#" data-val='1' onTouchStart={this.clickStatus.bind(this)} className={this.state.statusIds.indexOf(1)>-1 ? 'selected' : ''}>空腹</a>
                        <a href="#" data-val='2' onTouchStart={this.clickStatus.bind(this)} className={this.state.statusIds.indexOf(2)>-1 ? 'selected' : ''}>餐后1小时</a>
                        <a href="#" data-val='3' onTouchStart={this.clickStatus.bind(this)} className={this.state.statusIds.indexOf(3)>-1 ? 'selected' : ''}>餐后2小时</a>
                    </dd>
                </dl>
            </section>
            <section id="history-wrap" className="flex-cell">
                <div>
                {this.state.results.map((it, idx)=>{
                    return <ResultTable key={idx} date={Funs.dateFormat((it.data[0]||{}).recordTime, 'M月d日', true)} results={it.data} />;
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