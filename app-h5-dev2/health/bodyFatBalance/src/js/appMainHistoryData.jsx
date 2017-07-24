/**
 * Created by Administrator on 2016-08-06.
 */
//import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SlidedCalendar} from './components/SlidedCalendar.jsx';
import {Echarts} from './components/Echarts.jsx';

var {Router, Route, hashHistory} = ReactRouter;
let endDate = new Date();
let beginDate = new Date();
beginDate.setMonth(beginDate.getMonth() - 2); // 前两个月的数据
het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});

het.ready((data)=> {
    Actions.sendDate(data);
});

// 接收app推送数据
het.repaint((data)=> {
    //Actions.getHisData(data);

});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
        let endDate = new Date();
        let beginDate = new Date();
        beginDate.setMonth(beginDate.getMonth() - 2); // 前两个月的数据
        this.state = {
            headerTop: isAndroid ? 73 : 64,
            slidedCalendarShow: false,
            startDate: beginDate,
            endDate: endDate
        };
        //console.log(this.state.startDate, this.state.endDate)

        this.listenStore(Store); // 监听Store
        //Actions.sendDate(beginDate, endDate);
        //Actions.getCalendarData();
    }

    selectedDate(d) {
        Actions.getHisData(d.startDate, d.endDate);
        Actions.selectedDate(d);
        Actions.getHisData(d.startDate, d.endDate);
    }

    ymd(d) {
        //d = new Date(d);
        return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    }

    clickDate(e) {
        e.preventDefault();
        this.setState({slidedCalendarShow: true});
    }
    stopSlider(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let selDateText = `${this.ymd(this.state.startDate)}~${this.ymd(this.state.endDate)}`;
        //console.log(this.state.data);
        return (
            <div>
                <div>
                    <div className='his-header bg-color'onTouchStart={this.stopSlider} >
                        <div className='his-date bg-color'>
                            <div></div>
                            <a href='health://skip_url/toDataPick' className='wrap-block'
                               onTouchStart={this.clickDate.bind(this)}>
                                <img className='his-date-img' src='./../static/img/data_pic.png'/>
                                {selDateText}
                            </a>
                        </div>
                    </div>
                    <Echarts mydata={this.state.data}/>
                </div>
                <SlidedCalendar show={this.state.slidedCalendarShow} validDates={this.state.validDates}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate} cb={this.selectedDate.bind(this)} id='speSilder'/>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=> {
    het.setTitle('历史数据');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});
