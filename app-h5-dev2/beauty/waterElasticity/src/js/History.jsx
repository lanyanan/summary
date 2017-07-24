import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {EchartsDay } from './EchartsDay.jsx';
import {EchartsDays } from './EchartsDays.jsx';
let Toast = require('../../../common/src/lib/Toast.jsx');
let iToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {
    type:0,
    part:1,
    range: 1,
    start: new Date().getDate(),
    over: new Date().getDate(),
    month: new Date().getMonth()+1,
    year:　new Date().getFullYear(),
    thisMonthDays:(year,month)=>{
        let y = year||new Date(/*'2016/3/1'*/).getFullYear();let m = month||new Date('2016/3/1').getMonth()+1;return new Date(y,m,0).getDate();
    },
    //初始的星期一
    Mark_Week_Start: (()=>{
        //~_~,请忽视不会写正则的家伙~~~
        let thisMonthDays =(year,month)=>{
            let y = year||new Date(/*'2016/3/1'*/).getFullYear();let m = month||new Date(/*'2016/3/1'*/).getMonth()+1;return new Date(y,m,0).getDate();
        };
        let today = new Date(/*'2016/3/1'*/).getDate();
        let todayMonth = new Date(/*'2016/3/1'*/).getMonth()+1;
        let todayYear = new Date(/*'2016/3/1'*/).getFullYear();
        //获得当前的星期几的的对应数字减去1获得当前时间和星期一之间的范围，然后再用当前星期几的对应日期几号减去这个范围就得到当前的这个星期了
        //老外定的星期日等于0而不是7，直接减去7,但是多减了一天，所以等于6
        //今天的星期几和当前星期一之间的天数间距，比如3月19日== 周六  那么  range = 当前星期六 6 - 1，这里比较混淆，星期一和星期日之间相差是6天，而不是7天，
        let range = new Date(/*'2016/3/1'*/).getDay()-1;
            range == 0 && (range==6);
        //计算规则 >>> 获取时间范围 >>> (当前结束日期，今天的日期数) - 时间范围  = (星期一 ~ 星期X)
        let Mark_Week_Start = today - range;//1-1 = 0
        //console.log('-------range-----初始的Mark_Week_Start-----',range,Mark_Week_Start);
        if(Mark_Week_Start<1){
            //如果当前是一月，就要退到上一年的12月，不是一月的情况下直接当前月份自减1，然后用获得计算出来的月份的天数减去负数的天数就得到开始的时间是上一个月的几号
            todayMonth == 1 ?  (--todayYear,todayMonth = 12) :(--todayMonth);
            Mark_Week_Start = thisMonthDays(todayYear,todayMonth) + Mark_Week_Start;
        }
        //console.log('---时间范围-Mark_Week_Start--thisMonthDays(todayYear,todayMonth)-------------',range,Mark_Week_Start,thisMonthDays(todayYear,todayMonth));
        return Mark_Week_Start
    })(),
    //初始的星期几
    Mark_Week_Over: new Date(/*'2016/3/1'*/).getDate(),
    reqStart: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' 00:00:00',
    reqOver: new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' 23:59:59',
};

export class History extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store);
        this.changeLines = this.changeLines.bind(this);
        this.back = this.back.bind(this)
    }
    componentDidMount(){
        //曲线页面不需要实时刷新，全部被动请求 //Actions.intervalData();
        Actions.echartsLines({type:0,part:1,reqStart:appData.reqStart,reqOver:appData.reqOver});
        let navHeight = this.refs.changeArea.offsetHeight;
        this.setState({
            navHeight: navHeight+1,
            dataHeight: window.screen.height-navHeight
        })
        //console.log('nav',navHeight);
    }
    changeLines(e){
        //选中的不能再选中
        if(e.currentTarget.getAttribute('class')==='flex-cell on') return false;
        if(e.currentTarget.getAttribute('class')==='flex-cell mode on') return false;
        let nowMonth = new Date().getMonth()+1;
        let nowYear = new Date().getFullYear();
        let nowDay = new Date().getDate();
        //点击事件获取到的当前模块的对应索引，日周月索引和测试部位索引共用一个
        let index = e.currentTarget.getAttribute('data-index');
        //按固定时间点击事件
        if(e.currentTarget.getAttribute('data-type')==='date') {
            //@type 日期类型 按日选一个接口，按月和周选共用一个接口
            //1、其实也是和固定时间请求一样使用两个接口，但前端手动计算出开始和结束的时间范围来请求
            //2、若范围为1，则请求，按日请求的接口，若范围为周或月，则按周或月共用的接口请求，只是更改了请求参数的开始和结束时间
            appData.year  = nowYear;
            appData.month = nowMonth;
            appData.type = parseInt(index);
            //按天>>>重置范围选择的开始时间初始值
            if( appData.type == 0 ){
                appData.start = appData.Mark_Week_Over;
                appData.over = appData.start;
            }
            let range = new Date(/*'2016/1/1'*/).getDay()+1;
            //按周>>>重置范围选择的开始时间初始值
            if( appData.type == 1 ){
                appData.start = appData.Mark_Week_Start;
                appData.over = appData.Mark_Week_Over;
            }
            //按月>>>重置范围选择的开始时间初始值
            if(appData.type == 2){
                appData.start = 1;
                appData.over = appData.Mark_Week_Over;
                //appData.over = 30;当前月，只是取到今天so注释掉
            }
            console.log('-----------重置开始时间appData.start--------range-----',appData.start,range);
        }
        //按时间范围点击事件
        if(e.currentTarget.getAttribute('data-type')==='minus') {
            //按天减少
            if(appData.type == 0) {
                //1月
                if(appData.month == 1) {
                    --appData.year;
                    appData.month = 12;
                    appData.start  = new Date(appData.year,12,0).getDate();
                }else{
                    if(appData.start==1){
                        --appData.month;
                        appData.start  = new Date(appData.year,appData.month,0).getDate();
                    }else{
                        --appData.start
                    }
                }
                //按天减少时,开始和结束都是一天,只是时刻不同
                appData.over = appData.start;
                console.log('----------------appData.year------appData.month- start--',appData.year,appData.month,appData.start)
            }
            //按周减少
            if(appData.type == 1) {
                appData.over = appData.start-1;//结束时间直接等于开始时间，但是中间多了一天，所以要再减去一天
                appData.start = appData.start-7;//开始时间直接减去天就好

                //当start-7小于1的情况 0 对应上个月最后一天
                if(appData.start<1){
                    if(appData.month == 1) {
                        --appData.year;
                        appData.month = 12;
                        appData.start  = new Date(appData.year,appData.month,0).getDate()+appData.start;
                    }else{
                        --appData.month;
                        appData.start  = new Date(appData.year,appData.month,0).getDate()+appData.start;
                    }
                }
                //console.log('-----appData.year--appData.month---------appData.start----appData.over----',appData.year,appData.month,appData.start,appData.over)
            }
            //按月减少
            if(appData.type == 2){
                if(appData.month == 1) {
                    --appData.year;
                    appData.month = 12;
                    appData.start  = 1;
                }else{
                    --appData.month;
                }
                appData.over  = new Date(appData.year,appData.month,0).getDate();
                //console.log('-----appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
            }
        }
        if(e.currentTarget.getAttribute('data-type')==='plus') {
            //console.log('--------------nowYear--nowMonth--nowDay-----',nowYear,nowMonth,nowDay);
            if(appData.month==nowMonth && appData.year==nowYear &&  appData.over == nowDay){
                het.toast('亲，只能查看今天以前的数据哦~');
               // console.log('-----appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
                return false;
            }
            //按日增加
            if(appData.type == 0) {
                //每个月中最大的一天
                let maxDay = new Date(appData.year,appData.month,0).getDate();
                ++appData.over;
                if(appData.over>maxDay) {
                    if(appData.month==12){
                        ++appData.year;
                        appData.month= 1;
                    }else{
                        ++appData.month;
                    }
                    appData.over = 1;
                }
                appData.start = appData.over;
                //console.log('----------------appData.year------appData.month-over--',appData.year,appData.month,appData.over)
            }
            //按周增加
            if(appData.type == 1) {
                appData.start = appData.over+1;//结束时间直接等于开始时间，但是中间多了一天，所以要再减去一天
                appData.over = appData.over+7;
                let maxDay = new Date(appData.year,appData.month,0).getDate();
                //console.log('----------------maxDay--',maxDay);
                //当start-7小于1的情况 0 对应上个月最后一天
                if(appData.over>maxDay){
                    if(appData.month == 12){
                        ++appData.year;
                        appData.month = 1;
                    }else{
                        ++appData.month;
                    }
                    appData.over = appData.over - maxDay
                }

                if( appData.month == nowMonth && appData.start == appData.Mark_Week_Start){
                    //console.log('---------------------------本月---Mark_Week_Over--Mark_Week_Start----------------',appData.Mark_Week_Start,appData.Mark_Week_Over);
                    appData.over = appData.Mark_Week_Over;//已经到了最后一周了，但可能今天并不是星期天，所以结束时间要回退到今天的星期值，这里只执行一次
                }
                //console.log('------appData.year--appData.month---------appData.start----appData.over-----',appData.year,appData.month,appData.start,appData.over)
            }
            //按月增加
            if(appData.type == 2){
                appData.start = 1;
                //当前年就不用递增了
                if(appData.year<nowYear){
                    if(appData.month==12){
                        ++appData.year;
                        appData.month = 1;
                        appData.over = appData.thisMonthDays(appData.year,appData.month);
                    }else{
                        ++appData.month;
                        appData.over = appData.thisMonthDays(appData.year,appData.month);
                    }
                }else{
                    if(appData.month < nowMonth){
                        ++appData.month;
                        appData.over = appData.thisMonthDays(appData.year,appData.month);
                    }
                    if(appData.month == nowMonth){
                        //如果等于了当前月，则重置当前月的结束时间为今天的时间
                        appData.over = appData.Mark_Week_Over;
                    }
                }
                //console.log('-------year--month---start--over-----',appData.year,appData.month,appData.start,appData.over)
            };
        }
        //按部位点击事件
        let part =  appData.part;//part对应后台返回的部位顺寻，appData.part对应ui的部位顺序，后台返回的部位顺序并不与ui界面上展示的部位顺序一致，需要中转
        if(e.currentTarget.getAttribute('data-type')==='part') {
            appData.part = parseInt(index);
            if(appData.part==1) part = 11
            if(appData.part==2) part = 13
            if(appData.part==3) part = 15
            if(appData.part==4) part = 12
            if(appData.part==5) part = 3
        }
        //请求的必要参数
        appData.reqStart = appData.year +'-'+ appData.month +'-'+ appData.start + ' 00:00:00';
        appData.reqOver = appData.year +'-'+ appData.month +'-'+ appData.over + ' 23:59:59';
        Actions.echartsLines({
            type:　appData.type,
            part: part,
            reqStart: appData.reqStart,
            reqOver:　appData.reqOver
        });
        this.setState({
            selectType: appData.type,
            selectPart: appData.part
        });
        //console.log('-----------选中模式',e.currentTarget.getAttribute('data-idx'));
    }
    //<aside onTouchTap={this.handleTouchTap.bind(this)} className="console"></aside>
    back(e){
        window.history.back()
    }
    render() {
        console.log(JSON.stringify(this.state))
        //app无法开关机
        let modeArray = [];
        let selectPart = this.state.selectPart!=undefined ? this.state.selectPart:1;
        let selectEvent =  this.selectEvent;
        let selectPartArray=['待机', '额头','左脸','右脸', '鼻子', '眼周', '手部'];
        //选择类型
        let selectType = this.state.selectType!=undefined ?  this.state.selectType: 0;
        //运行状态展示框 >>> 由运行模式和运行状态计算得出
        let runningStatus = this.state.runningStatus ? this.state.runningStatus:'';
        let animationCss = 'initialize-animation';
        //调试打印
        //<aside className='console'>{' 调试打印: '}{' 在线: '+operate.online }</aside>
        let screenHeight = window.screen.height;
        let navHeight = this.state.navHeight+'px';
        let dataHeight = this.state.dataHeight+'px';

        //console.log('----------------------21----navHeight---dataHeight--',screenHeight,navHeight,dataHeight);
        console.log('----按日-按周--按月--appData.type--',appData.start,appData.start+`~`+appData.over,appData.month,appData.type);
        console.log('----年---月---开始--结束---',appData.year,appData.month,appData.start,appData.over);
        let historyDate = appData.year+'.'+appData.month+'.'+appData.start;
        if(appData.type==0) historyDate =appData.year+'.'+appData.month+'.'+appData.start;
        if(appData.type==1) historyDate =appData.year+'.'+appData.month+'.'+appData.start+'~' +appData.year+'.'+appData.month+'.'+appData.over;
        if(appData.type==2) historyDate =appData.year+'.'+appData.month
        //测试曲线图
        let echartsType = this.state.selectType || 0;
        let configs= {
            xAxis: this.state.xAxis || [],
            xAxisLength: this.state.xAxis!='undefined'? 7:0,
            water: this.state.water || [],
            oil: this.state.oil || [],
            elasticity: this.state.elasticity || [],
            type: appData.type,
            month: appData.month,
            year: appData.year
        };
        console.log('------------------configs----------------',configs);
        let EchartsLines = <EchartsDay configs = {configs} />;
            if(echartsType==0)  EchartsLines = <EchartsDay  configs = {configs} />;
            if(echartsType==1)  EchartsLines = <EchartsDays configs = {configs} />;
            if(echartsType==2)  EchartsLines = <EchartsDays configs = {configs} />;
        let NavDate =
            <figure className="flex nav-select">
                {
                    ['日','周','月'].map(function(item,index){
                        return (
                            <i className={index == selectType? "flex-cell on":"flex-cell"} data-index={index} data-type="date" key={index} onClick={this.changeLines}>{item}</i>
                        )
                    }.bind(this))
                }
            </figure>
        let NavRange =
            <figure className="date-select">
                <i data-type="minus" onClick={this.changeLines}></i>
                <i>{historyDate}</i>
                <i data-type="plus" onClick={this.changeLines}></i>
            </figure>
        let NavParts =
            <figure className="flex place-select" ref="nav">
                {
                    selectPartArray.map(function(item,index){
                        return(
                            index>0 &&
                            <div onTouchStart={this.changeLines} className={(index==selectPart )?'flex-cell mode on':'flex-cell mode'}
                                 data-type="part" key={index} data-index={index}>
                                <span><i>{item}</i></span>
                            </div>
                        )
                    }.bind(this))
                }
            </figure>

        return (
            <div className="wrapper">
                <section className="history-change" ref="changeArea">
                    { NavDate }
                    { NavRange }
                    { NavParts }
                </section>
                <section className="history-echarts" style={{height:dataHeight}}>
                    { EchartsLines }
                </section>
                <div id="mytoast"></div>
            </div>
        )
    }
}
