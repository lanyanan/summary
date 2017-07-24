import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {isIOS,fillZero } from'./LocalFuns.jsx';
import {EchartsSleep } from './EchartsSleep.jsx';
const {Router, Route, hashHistory} = ReactRouter;

const appData =  {
    year:　new Date().getFullYear(),
    month: new Date().getMonth()+1,//请勿修改这里
    sDay: new Date().getDate(),
    eDay: new Date().getDate(),
    sWeek: '',
    eWeek: '',
    viewType: 0,
    getMonthDays:(y,m)=>{
        y = y || new Date().getFullYear();
        m = m || new Date().getMonth()+1;
        //new Date(2017,2,0).getDate()   获取当前月有多少天 month需要加1，因为0会往后减一个月
        return new Date(y,m,0).getDate();
    },
    Get_Monday_Date:(y,m,d)=>{
        //m从0开始
        //获取自然周第一天的日期，默认周日是第一天 //2007,0,6
        y ? y : new Date().getFullYear();
        m ? m : new Date().getMonth();
        d ? d : new Date().getDate();
        let year = new Date(y,m,d).getFullYear(),
            month = new Date(y,m,d).getMonth(),
            date = new Date(y,m,d).getDate(),
            day = new Date(y,m,d).getDay(),
            sunDate = date-day;//当前日期减去当前星期几得到该自然周星期日的date
        //获取自然周 ,如果今天就是周日,如果今天不是周日
        let sunDateUTC =  new Date(year,month,sunDate),
            sunYear  = sunDateUTC.getFullYear(),
            sunMonth = sunDateUTC.getMonth()+1,
            sun = sunDateUTC.getDate();
        // console.log(year,month,date,day,sunDate,sunDateUTC);
        return sunYear +'-' + fillZero(sunMonth)+'-'+ fillZero(sun);

    }
};
export class PageSleep extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            networkavailable: 1,
            title:'睡眠',
            sleepQuality: '暂无数据',
            weeklyQuality: '',
            monthlyQuality: '',
            viewType: 0,
            isLine: 1,
            dateRange:'',
            isEmpty: true,
            list: [],
            sleep: {
                //多日数据
                goodStatus:'--',
                normalStatus:'--',
                badStatus: '--',
                //单日数据
                deepSleep: null,
                sleepTime: null,
                shallowSleep: null,
                sleepQuality: '--',
            }
        };
        this.listenStore(Store);
        this.timer = null;
        this.sendParams = function (sDay,eDay) {
            Actions.reqHistory({
                beginDate:sDay,
                endDate: eDay,
                type: 'sleep'
            })
        };
        this.changeView = this.changeView.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }
    liveError(){
        if(this.state.networkavailable==2){
            return '当前网络不可用！'
        }
        return false;
    }
    componentDidMount(){
        appData.viewType = 0;
        appData.year=　new Date().getFullYear();
        appData.month= new Date().getMonth()+1;//谨慎修改这里
        appData.sDay= new Date().getDate();
        appData.eDay=new Date().getDate();
        appData.sWeek= '';
        appData.eWeek='';
        let beginDate = appData.year +'-' +(appData.month<10?'0'+appData.month:appData.month) + '-'+(appData.sDay<10?'0'+appData.sDay:appData.sDay),
            endDate = beginDate;
        //console.log(beginDate,'----------------beginDate');//
        this.sendParams(beginDate,endDate);
        this.setState({
            dateRange: appData.year+'.'+appData.month+'.'+appData.sDay
        });
        let nav = document.querySelector('#nav').offsetHeight,
            arrow = document.querySelector('#arrow-date').offsetHeight,
            viewHeight= window.screen.height,
            chartWrapperHeight = viewHeight-arrow-nav;
        this.setState({
            wrapperHeight : chartWrapperHeight+'px'
        });
        console.log('xxxxxxxxx',appData.year+'.'+appData.month+'.'+appData.sDay)
    }
    changeDate(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        clearTimeout(this.timer);
        let self = this,
            date = (i)=>{ if(i) { return new Date(i) } else{ return new Date() } },
            nowDay =   date().getDate(),
            nowMonth = date().getMonth()+1,
            nowYear =  date().getFullYear(),
            //点击事件获取到的当前模块的对应索引，日周月索引和测试部位索引共用一个
            index = e.currentTarget.getAttribute('data-index');

        //按日/周/月减少 >>>  点击选择时间范围
        if(e.currentTarget.getAttribute('data-type')==='minus') {
            //按日减少
            if(appData.viewType == 0) {
                //1月1日再减判断
                if(appData.month== 1 && appData.eDay ==1 ){
                    --appData.year;
                    console.log('appData.year------------',appData.year)
                    appData.month = 12;
                    appData.sDay  = 31;
                }else{
                    if(appData.sDay==1){
                        --appData.month;
                        //其实这里用了0值递减月的规律， new Date(2017,2,0).getDate() 2其实传入的3月，但是日期初始值是1，所以0，会递减一个月，得到2月的最后天
                        appData.sDay  = new Date(appData.year,appData.month,0).getDate();
                    }else{
                        --appData.sDay
                    }
                }
                //按天减少时,开始和结束都是一天,只是时刻不同
                appData.eDay = appData.sDay;
                console.log('----------------appData.year------appData.month- sDay--',appData.year,appData.month,appData.sDay);
                self.setState({
                    dateRange: appData.year+'.'+appData.month+'.'+appData.sDay
                })


                let beginDate =  appData.year+'-'+fillZero(appData.month)+'-'+fillZero(appData.sDay);

                self.timer = setTimeout(function () {
                    self.sendParams(beginDate,beginDate);
                },1000);
            }
            //按周减少
            if(appData.viewType == 1) {
                console.log(appData.sWeek,appData.eWeek,'init values');
                let sYear =  new Date(appData.sWeek).getFullYear(),
                    sMonth = new Date(appData.sWeek).getMonth(),
                    sDate = new Date(appData.sWeek).getDate(),
                    newEDate = sDate-1;
                //特殊情况处理
                if(newEDate==0) {
                    let newEDateUTC = new Date(sYear, sMonth, 0);
                    sYear = new Date(newEDateUTC).getFullYear();
                    sMonth = new Date(newEDateUTC).getMonth();
                    newEDate = new Date(newEDateUTC).getDate();
                }
                //根据计算出的newEDate计算newSDate
                appData.sWeek = appData.Get_Monday_Date(sYear,sMonth,newEDate);
                appData.eWeek = sYear + '-' + ((sMonth+1<10) ? '0'+ (sMonth+1):(sMonth+1)) + '-' + (newEDate<10?('0'+newEDate):newEDate);
                console.log(newEDate,'newEDate',appData.sWeek,appData.eWeek,'appData.sWeek,appData.eWeek');

                this.setState({
                    dateRange: appData.sWeek+'~'+appData.eWeek
                })
                self.timer = setTimeout(function () {
                    self.sendParams(appData.sWeek,appData.eWeek);
                },1000);
                //console.log('-----appData.year--appData.month---------appData.sDay----appData.eDay----',appData.year,appData.month,appData.sDay,appData.eDay)
            }
            //按月减少
            if(appData.viewType == 2){
                if(appData.month == 1) {
                    --appData.year, appData.month = 12, appData.eDay  = 31;
                }else{
                    --appData.month;
                    appData.eDay = appData.getMonthDays(appData.year,appData.month);
                }
                appData.sDay  = 1;

                this.setState({
                    dateRange: appData.year+'年'+appData.month+'月'
                })

                let beginDate = appData.year +'-'+ fillZero(appData.month) +'-' + '01',
                    endDate = appData.year +'-'+ fillZero(appData.month) +'-'+  fillZero(appData.eDay);
                self.timer = setTimeout(function () {
                    self.sendParams(beginDate,endDate);
                },1000);
            }
        }
        //按日/周/月增加 >>>  点击选择时间范围
        if(e.currentTarget.getAttribute('data-type')==='plus') {
            //console.log('------nowYear--nowMonth--nowDay-----',nowYear,nowMonth,nowDay);
            //console.log('--appData.sWeek,appData.eWeek',appData.sWeek,appData.eWeek)
            //按日增加
            if(appData.viewType == 0) {
                if(appData.month==nowMonth && appData.year==nowYear &&  appData.eDay == nowDay){
                    console.log('今天以后还没有数据');
                    het.toast('未来日期没有数据');
                    return false;
                }
                //每个月中最大的一天
                let maxDay = new Date(appData.year,appData.month,0).getDate();
                ++appData.eDay;
                console.log('appData.eDay',appData.eDay,'appData.eDay',appData.eDay);
                if(appData.eDay>maxDay) {
                    appData.month !=12 ? ++appData.month: (++appData.year,appData.month = 1);
                    appData.eDay = 1;
                };
                appData.sDay = appData.eDay;
                console.log('----------------appData.year------appData.month-eDay--',appData.year,appData.month,appData.eDay)
                this.setState({
                    dateRange: appData.year+'.'+appData.month+'.'+appData.eDay
                });

                let beginDate =  appData.year+'-'+fillZero(appData.month)+'-'+ fillZero(appData.eDay);

                self.timer = setTimeout(function () {
                    self.sendParams(beginDate,beginDate);
                },1000);//
            }
            //按周增加
            if(appData.viewType == 1) {
                console.log(appData.sWeek,appData.eWeek,'init values');
                let eYear =  new Date(appData.eWeek).getFullYear(),
                    eMonth = new Date(appData.eWeek).getMonth(),
                    eDate = new Date(appData.eWeek).getDate(),
                    cDate = new Date().getDate(),
                    cMonth = new Date().getMonth(),
                    cYear = new Date().getFullYear();

                if(eDate>=cDate && eMonth>=cMonth && eYear>=cYear){
                    console.log('今天以后的数据还没有测量哦!');
                    het.toast('未来日期没有数据');
                    return false
                }

                let nSUTC = new Date(eYear,eMonth,eDate + 1),
                    nEUTC = new Date(eYear,eMonth,eDate + 7),

                    nSYear = new Date(nSUTC).getFullYear(),
                    nSMonth = new Date(nSUTC).getMonth()+1,
                    nSDate = new Date(nSUTC).getDate(),

                    nEYear = new Date(nEUTC).getFullYear(),
                    nEMonth = new Date(nEUTC).getMonth()+1,
                    nEDate=  new Date(nEUTC).getDate();



                appData.sWeek = nSYear+'-'+  fillZero(nSMonth) +'-'+ fillZero(nSDate);
                appData.eWeek = nEYear+'-'+ fillZero(nEMonth) +'-'+ fillZero(nEDate);
                //如果超过今天强置为今天
                if(nEYear>=cYear && nEMonth-1>=cMonth && nEDate>=cDate){

                    appData.eWeek = cYear+'-'+  fillZero(cMonth+1) +'-'+ fillZero(cDate);
                }
                this.setState({
                    dateRange: appData.sWeek+'~'+appData.eWeek
                });

                self.timer = setTimeout(function () {
                    self.sendParams(appData.sWeek,appData.eWeek);
                },1000);

                console.log('nSUTC',nSUTC,'nEUTC',nEUTC,'appData.sWeek',appData.sWeek,'appData.eWeek',appData.eWeek)
            }
            //按月增加
            if(appData.viewType == 2){
                if(appData.year == new Date().getFullYear() && appData.month == (new Date().getMonth()+1) ){
                    het.toast('未来日期没有数据');
                    return false
                };
                appData.sDay = 1;
                //当前年就不用递增了
                if(appData.year<nowYear){
                    if(appData.month==12){
                        ++appData.year;
                        appData.month = 1;
                        appData.eDay = appData.getMonthDays(appData.year,appData.month);
                    }else{
                        ++appData.month;
                        appData.eDay = appData.getMonthDays(appData.year,appData.month);
                    }
                }else{
                    if(appData.month < nowMonth){
                        ++appData.month;
                        appData.eDay = appData.getMonthDays(appData.year,appData.month);
                    }
                    if(appData.month == nowMonth){
                        //如果等于了当前月，则重置当前月的结束时间为今天的时间
                        appData.eDay = new Date().getDate();
                    }
                }
                this.setState({
                    dateRange: appData.year+'年'+appData.month+'月'
                })

                let beginDate = appData.year +'-'+ fillZero(appData.month) +'-' + '01',
                    endDate = appData.year +'-'+ fillZero(appData.month)+'-'+  fillZero(appData.eDay);
                self.timer = setTimeout(function () {
                    self.sendParams(beginDate,endDate);
                },1000);
                //console.log('-------year--month---sDay--eDay-----',appData.year,appData.month,appData.sDay,appData.eDay)
            };
        }
        console.log('选择的日月年',appData.eDay,appData.month,appData.year,/*'当前的日月年',nowDay,nowMonth,nowYear*/);
    }
    changeView(e){
        if(this.liveError()){het.toast(this.liveError());return false};
        if(e.currentTarget['className']=='flex-cell active') return;
        clearTimeout(this.timer);
        let self = this,
            viewType = e.currentTarget.getAttribute('data-i');
        if(viewType==0) {
            appData.sDay = new Date().getDate();
            appData.eDay = appData.sDay;
            appData.month = new Date().getMonth()+1;
            appData.eWeek = '';
            appData.sWeek = '';

            this.setState({
                dateRange: appData.year+'.'+appData.month+'.'+appData.sDay
            });

            let beginDate =  appData.year+'-'+ fillZero(appData.month) +'-'+ fillZero(appData.sDay);

            self.timer = setTimeout(function () {
                self.sendParams(beginDate,beginDate);
            },1000);
        }
        if(viewType==1) {
            //获取当前时间
            let eYear = new Date().getFullYear(),
                eMonth = new Date().getMonth(),
                eDay = new Date().getDate();

            appData.eWeek = eYear+'-' + fillZero(eMonth+1) +'-'+ fillZero(eDay);
            appData.sWeek = appData.Get_Monday_Date(eYear,eMonth,eDay);

            this.setState({
                dateRange: appData.sWeek+'~'+appData.eWeek
            })

            self.timer = setTimeout(function () {
                self.sendParams(appData.sWeek,appData.eWeek);
            },1000);
            console.log('appData.eWeek',appData.eWeek,'appData.sWeek',appData.sWeek);
        }
        if(viewType==2) {
            appData.year = new Date().getFullYear();
            appData.month = new Date().getMonth()+1;
            appData.eDay = new Date().getDate();
            this.setState({
                dateRange: appData.year+'年'+appData.month+'月'
            });
            let beginDate = appData.year +'-'+fillZero(appData.month) +'-' + '01',
                endDate = appData.year +'-'+ fillZero(appData.month) +'-'+ fillZero(appData.eDay);
            self.timer = setTimeout(function () {
                self.sendParams(beginDate,endDate);
            },1000);
        }
        appData.viewType = viewType;
        this.setState({
            viewType: viewType
        });
    }
    render() {
        let sleepTime = '--', deepSleep='--', shallowSleep='--', sleepQuality = '--',badStatus  = '--', goodStatus = '--', normalStatus = '--',
            viewType = this.state.viewType!==undefined?this.state.viewType:0,
            config = {
                isLine: this.state.isLine!=undefined ? this.state.isLine : 0,
                viewType: this.state.viewType,
                list: this.state.list!=undefined ? this.state.list:[],
                timestamp: this.state.timestamp
            };
        if(this.state.sleep){
            badStatus  = this.state.sleep.badStatus!=undefined ?  this.state.sleep.badStatus :'--',
            goodStatus = this.state.sleep.goodStatus!=undefined ?  this.state.sleep.goodStatus :'--',
            normalStatus = this.state.sleep.normalStatus!=undefined ?  this.state.sleep.normalStatus :'--';
            if(this.state.sleep.sleepTime){
                sleepTime = this.state.sleep.sleepTime.slice(0,2)+':'+this.state.sleep.sleepTime.slice(3,5)
            }
            if(this.state.sleep.deepSleep){
                deepSleep = this.state.sleep.deepSleep.slice(0,2)+':'+this.state.sleep.deepSleep.slice(3,5)
            }
            if(this.state.sleep.shallowSleep){
                shallowSleep = this.state.sleep.shallowSleep.slice(0,2)+':'+this.state.sleep.shallowSleep.slice(3,5)
            }
            if(this.state.sleep){
                sleepQuality = this.state.sleep.sleepQuality!=undefined?this.state.sleep.sleepQuality:'--'
            }
            console.log('sleepTime---------.state.sleep.sleepTime--',sleepTime,1/*this.state.sleep.sleepTime*/);
        };
        return (
            <main className={'page-heart' +isIOS}>
                <nav id="nav" className={'nav' + isIOS}>
                    <a onClick={()=>{window.location.href = '#/'}}> </a>
                    <a>睡眠</a>
                    <a className="none"> </a>
                </nav>
                <figure id="arrow-date" className="date-select" >
                    <i data-type="minus" onClick={this.changeDate}></i>
                    <i>{this.state.dateRange}</i>
                    <i data-type="plus" onClick={this.changeDate}></i>
                </figure>
                <section style={{height:this.state.wrapperHeight?this.state.wrapperHeight:'auto',overflowY:'scroll'}}>
                    <section className={viewType==0?'module-a sleep-a':'hide'}>
                        <h2>{sleepQuality}</h2>
                        <div>睡眠质量</div>
                    </section>
                    <section className={"mileage flex"}>
                        <aside className="flex-cell">
                            <h2 className={viewType==0?'':'blue'}>{ viewType==0 ? sleepTime:goodStatus }</h2>
                            <h5 className="dark-gray">{viewType==0?'睡眠时长':'很好'}</h5>
                        </aside>
                        <aside className="flex-cell">
                            <h2 className={viewType==0?'':'blue'}>{ viewType==0 ? deepSleep : normalStatus }</h2>
                            <h5 className="dark-gray"><b className={viewType==0?"purple":'hide'}>&bull;&nbsp;</b>{viewType==0?'深睡':'正常'}</h5>
                        </aside>
                        <aside className="flex-cell">
                            <h2 className={viewType==0?'':'blue'}>{ viewType==0 ? shallowSleep : badStatus }</h2>
                            <h5 className="dark-gray"><b className={viewType==0?"blue":'hide'}>&bull;&nbsp;</b>{viewType==0?'浅睡':'不好'}</h5>
                        </aside>
                    </section>
                    <EchartsSleep config={config}  />
                </section>
                <section className={"module-footer flex"}>
                {
                    ['日','周','月'].map(
                        function(o,i){
                            return (
                                <span className={"flex-cell"+(this.state.viewType==i?' active':'')}
                                      key={i} data-i={i} onTouchTap={this.changeView}>{o}</span>
                            )
                        }.bind(this)
                    )
                }
                </section>
            </main>
        )
    }
}