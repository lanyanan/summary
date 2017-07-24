import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {isIOS } from'./LocalFuns.jsx';
import {CanvasBoard } from './CanvasBoard.jsx';
import {Calendar } from './Calendar.jsx';
import {Mileage } from './Mileage.jsx';
import {Recording } from './Recording.jsx';

const {Router, Route, hashHistory} = ReactRouter;


het.repaint((data, type)=>{
    Actions.repaint(data, type);
});

export class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            showClndr:false,
            month: (new Date().getMonth()+1),
            connect: 'fail',
            connectTxt: 1,
            stepCount: 0,
            walkTarget: 0,
            networkavailable: 1
        };
        this.listenStore(Store);
        Actions.local();
    }
    liveError(){
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        return false;
    }
    handleClndr(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        e.preventDefault();
        //请求月有测试数据的日期
        let year = new Date().getFullYear(),
            month = new Date().getMonth()+1,
            //时区参数
            timeZone  = new Date().getTimezoneOffset()/60,
            //有数据日期接口参数
            beginDate = Funs.dateFormat(new Date(year,month-1,1)-24*60*60*1000,'yyyy-MM-dd'),//上月最后一天日期
            endDate   = Funs.dateFormat(new Date(year,month,0),'yyyy-MM-dd');//本月最后一天
        let showClndr = this.state.showClndr;
        //请求当月有测试数据日期，用作渲染日历插件，UTC时间
        Actions.getValidDate({ beginDate: beginDate, endDate:endDate });
        Actions.showCalendar({ showClndr:!showClndr });
        this.setState({ showClndr:!showClndr, month: month });
    }
    componentDidMount(){
        //请求当日历史数据
        let year = new Date().getFullYear(),
            month = new Date().getMonth()+1,
            //时区参数
            timeZone  = new Date().getTimezoneOffset()/60,
            //历史数据参数
            yesterday = Funs.dateFormat(new Date()-24*60*60*1000,'yyyy-MM-dd')+' 16:00:00',
            today     = Funs.dateFormat(new Date(),'yyyy-MM-dd'),
            //有数据日期接口参数
            beginDate = Funs.dateFormat(new Date(year,month-1,1)-24*60*60*1000,'yyyy-MM-dd'),//上月最后一天日期
            endDate   = Funs.dateFormat(new Date(year,month,0),'yyyy-MM-dd');//本月最后一天

        //请求当天历史数据
        Actions.getHistoryData({ date: today,showClndr: false });
        //请求当月有测试数据日期，用作渲染日历插件，UTC时间
        Actions.getValidDate({ beginDate: beginDate, endDate:endDate });
    }
    componentWillUnmount(){}
    render() {
        let calendar = {
                showClndr: this.state.showClndr,
                viewDate: this.state.viewDate?this.state.viewDate: Funs.dateFormat(new Date(),'yyyy-MM-dd'),
                validDates: this.state.validDates ? this.state.validDates:[],
                firstValidDates: this.state.firstValidDates ? this.state.firstValidDates:[],
                handleClndr: this.handleClndr.bind(this),
            },
            canvasboard = {
                connect : this.state.connect,
                connectTxt: this.state.connectTxt!=undefined ?this.state.connectTxt:1,
                showClndr: this.state.showClndr,
                viewDate: this.state.viewDate?this.state.viewDate: Funs.dateFormat(new Date(),'yyyy-MM-dd'),
                stepCount: this.state.stepCount,
                walkTarget: this.state.walkTarget,
                percent : parseInt(this.state.stepCount/this.state.walkTarget),
                calories: this.state.calories?this.state.calories:0,
                status: 1
            },
            mileage = {
                showClndr: this.state.showClndr,
                kilometer: this.state.kilometer ? this.state.kilometer: 0,
                calories: this.state.calories?this.state.calories:0,
                stepCount: this.state.stepCount?this.state.stepCount:0,
            },
            recording = {
                deepSleep: this.state.deepSleep?this.state.deepSleep:'',
                shallowSleep: this.state.shallowSleep ?this.state.shallowSleep:'',
                sleepQuality: this.state.sleepQuality ?this.state.sleepQuality:'',
            },
            connect = this.state.connect ? this.state.connect : 'fail';
        if(connect=='scan' || connect=='sync') window.location.href = '#/PageConnect';
        // window.state = this.state;
        // console.log('dates',this.state.viewDate);
        return (
            <main className={'main' + isIOS}>
                <nav className={this.state.showClndr?'hide':('nav' + isIOS)}>
                    <a href="request://back"> </a>
                    <a>{this.state.title ? this.state.title:'智能手环'}</a>
                    <a href="request://detail"> </a>
                </nav>
                <Calendar data={calendar} />
                <CanvasBoard data={canvasboard} />
                <Mileage data={mileage} />
                <Recording data={recording} />
            </main>
        )
    }
}