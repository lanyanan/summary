import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ResultTable} from './ResultTable.es6';
import {SlidedCalendar} from '../../../common/src/lib/SlidedCalendar.es6';
// import {SlidedCalendar} from './SlidedCalendar.es6';
import {FoodClass} from './FoodClass.es6';
import {MyChart} from './MyChart.es6';
let foodClass = new FoodClass;

var {Router, Route, hashHistory, Link} = ReactRouter;
let endDate = new Date();
let startDate = new Date();
    startDate.setMonth(startDate.getMonth()-1); // 上月今天
let foodClassIds = [1,2,3,4,5,6,7,8,9,10,11,12];

// 日期选择器回调函数
window.datepickerCB = (date)=>{
    endDate = date.endDate;
    startDate = date.startDate;
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
            headerTop: isAndroid?73:64,
            slidedCalendarShow: false,
            foodClassIds: foodClassIds,
            startDate: startDate,
            endDate: endDate,
            validDates: [],
            results: []
        };
        this.myScroll; // 定义iscroll容器
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let _this = this;
        setTimeout(()=>{
            Actions.getHistoryData(startDate, endDate, _this.state.foodClassIds.join(','));
        }, 1000);
        document.body.scrollTop = 0; // 修复从日期选择器返回时滚动高度不对的BUG
    }
    clickFoodClass(e){
        let val = parseInt(e.currentTarget.getAttribute('data-id'));
        let index = this.state.foodClassIds.indexOf(val);
        e.preventDefault();
        if (index > -1){
            foodClassIds.splice(index, 1);
        } else {
            foodClassIds.push(val);
        }
        this.setState({
            foodClassIds: foodClassIds
        });
        Actions.getHistoryData(startDate, endDate, this.state.foodClassIds.join(','));
    }
    // selectedDate(d) {
    //     Actions.selectedDate(d);
    //     Actions.getHistoryData(d.startDate, d.endDate, this.state.foodClassIds.join(','));
    // }
    // 格式化日期为 yyyy.m.d 的格式
    ymd(d) {
        return `${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`;
    }
    render() {
        let selDateText = `${this.ymd(this.state.startDate)}~${this.ymd(this.state.endDate)}`;
        let FC = foodClass.getAll();
        let startDate = Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd', true);
        let endDate = Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd', true);
        let datepickerUrl = `#/datepicker/${startDate}/${endDate}/datepickerCB/${this.state.validDates.join(',')}`;
        return <div className="viewing-area flex-column">
            <section className="condition flex-cell">
                <header style={{paddingTop: this.state.headerTop}}>
                    <a href={datepickerUrl} className="date">{selDateText}</a>
                </header>
                <nav className="flex">
                    {FC.map((it, i)=>{
                        if (i<6) {
                            let className = 'flex-cell ';
                            className += this.state.foodClassIds.indexOf(parseInt(it.foodClassId))>-1?'active':'';
                            return <a key={i} data-id={it.foodClassId} onClick={this.clickFoodClass.bind(this)} className={className}>{it.foodClassName}</a>;
                        }
                    })}
                </nav>
                <nav className="flex">
                    {FC.map((it, i)=>{
                        if (i>=6) return <a key={i} data-id={it.foodClassId} 
                            onClick={this.clickFoodClass.bind(this)}
                            className={'flex-cell' + (this.state.foodClassIds.indexOf(parseInt(it.foodClassId))>-1?' active':'')}>{it.foodClassName}</a>;
                    })}
                </nav>
            </section>
            <section id="history-wrap">
                {this.state.results.map((it, idx)=>{
                    return <div className="chart-wrap" key={idx}>
                        <h2>{foodClass.getClassName(it.key)}(g)</h2>
                        <MyChart data={it.data} />
                    </div>;
                })}
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
            <Route path="/datepicker/:startDate/:endDate/:cbName" component={SlidedCalendar} />
            <Route path="/datepicker/:startDate/:endDate/:cbName/:validDates" component={SlidedCalendar} />
        </Router>
    ), document.getElementById('ROOT'));
});