'use strict';
/**
 * 历史数据组件
 * @prop {obj} getdata  请求接口需要传的参数
 * /v1/app/chairdressing/skinMeasure/getAllSkinTestRecord
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Clndr} from './Calendar.jsx';

let measureTime= new Date();
export class History extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {hideStatus:{},showClndr:false,month: (new Date().getMonth()+1)};
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        //请求当日历史数据
        let year = new Date().getFullYear(),
            month = new Date().getMonth()+1,
            //时区参数
            timeZone  = new Date().getTimezoneOffset()/60,
            //历史数据参数
            yesterday = Funs.dateFormat(new Date()-24*60*60*1000,'yyyy-MM-dd')+' 16:00:00',
            today     = Funs.dateFormat(new Date(),'yyyy-MM-dd')+' 16:00:00',
            //有数据日期接口参数
            beginDate = Funs.dateFormat(new Date(year,month-1,1)-24*60*60*1000,'yyyy-MM-dd') + ' 16:00:00',//上月最后一天日期
            endDate   = Funs.dateFormat(new Date(year,month,0),'yyyy-MM-dd') + ' 16:00:00';//本月最后一天

        //请求当天历史数据
        Actions.getHistoryData({ measureDateBeginNew: yesterday, measureDateEndNew: today, timeZone: timeZone});
        //请求当月有测试数据日期，用作渲染日历插件，UTC时间
        Actions.getValidDate({ measureDateBeginNew: beginDate, measureDateEndNew:endDate, timeZone: timeZone}/*,null,month*/);
    }
    handleClndr(){
        //请求月有测试数据的日期
        let year = new Date().getFullYear(),
            month = new Date().getMonth()+1,
            //时区参数
            timeZone  = new Date().getTimezoneOffset()/60,
            //有数据日期接口参数
            beginDate = Funs.dateFormat(new Date(year,month-1,1)-24*60*60*1000,'yyyy-MM-dd') + ' 16:00:00',//上月最后一天日期
            endDate   = Funs.dateFormat(new Date(year,month,0),'yyyy-MM-dd') + ' 16:00:00';//本月最后一天
        //请求当月有测试数据日期，用作渲染日历插件，UTC时间
        Actions.getValidDate({ measureDateBeginNew: beginDate, measureDateEndNew:endDate, timeZone: timeZone});

        let showClndr = this.state.showClndr;
        this.setState({showClndr:!showClndr, month: month})
    }
    getOneDate(index){
        //接口参数格式 2017-02-28 16:00:00 VS 前端渲染格式2017.02.28
        let timeZone = new Date().getTimezoneOffset()/60,
            today,
            yesterday,
            //测量当日时间的时间戳
            timestamp = new Date(Funs.dateFormat(new Date(measureTime),'yyyy-MM-dd')).getTime();

        if(index>0){
            //下一天
            today= Funs.dateFormat(timestamp+24*60*60*1000,'yyyy-MM-dd') +' 16:00:00';
            yesterday= Funs.dateFormat(measureTime,'yyyy-MM-dd')+' 16:00:00';
        }else{
            //上一天
            today= Funs.dateFormat(timestamp-24*60*60*1000,'yyyy-MM-dd')+' 16:00:00';
            yesterday= Funs.dateFormat(timestamp-2*24*60*60*1000,'yyyy-MM-dd')+' 16:00:00';
        }

        Actions.getHistoryData({ measureDateBeginNew: yesterday, measureDateEndNew: today, timeZone: timeZone });
        this.setState({today:Funs.dateFormat(today,'yyyy.MM.dd')});
    }
    handleList(index){
        let hideStatus = this.state.hideStatus;
        hideStatus[index] = !hideStatus[index];
        this.setState({hideStatus:hideStatus});
    }
    render() {
        let today = this.state.today?this.state.today:Funs.dateFormat(new Date(),'yyyy.MM.dd'),
            history = this.state.history?this.state.history:null,
            tagDates = this.state.tagDates?this.state.tagDates:[],
            firstTagDates = this.state.firstTagDates ? this.state.firstTagDates :[],
            hideStatus = this.state.hideStatus;
        //het.toast('------'+tagDates.toString()+'------')
        //全局变量，此处更改后，获取单日数据会用到
        measureTime = history?Funs.dateFormat(history[0].measureTime,'yyyy.MM.dd'):today;
        let partObj = {
            11:"额头",
            12:"鼻子",
            13:"左脸",
            14:"下颚",
            15:"右脸"
        };
        // <aside id="console" style={{top:'330px'}}>
        //     {
        //         ' history:' + (history==null?'数据为空':measureTime) +
        //         ' tagDates:'+ (this.state.tagDates?this.state.tagDates:'数据为空')+
        //         ' firstTagDates:'+ (this.state.firstTagDates?this.state.firstTagDates:'首次数据为空')
        //     }
        // </aside>
        return (
            <main className="history">
                <nav className='header'>
                    <i className='arrow arrow-left' onClick={this.getOneDate.bind(this,-1)}> </i>
                    <span className='clndr-btn' onClick={this.handleClndr.bind(this)}>
                        <img className='clndr-icon' src='../static/img/ic-clndr.png' alt='日历图标'/>
                        <b className="">{measureTime}</b>
                    </span>
                    <i className='arrow arrow-right' onClick={this.getOneDate.bind(this,1)}> </i>
                </nav>
                {
                    this.state.showClndr ?
                        <section>
                            <div className="calendar-ctrl" id="calendar-ctrl" onTouchEnd={this.handleClndr.bind(this)}></div>
                            <Clndr tagDates={tagDates} firstTagDates={firstTagDates} month={this.state.month} />
                        </section>
                        : null
                }
                <section  className='list'>
                    {
                        history ?
                        history.map(function (o,i) {
                            return (
                                <dl key={i}>
                                    <dt ref='ti' className='title' data-value={i} onTouchEnd={this.handleList.bind(this,i)}>
                                        <img className='updown' src={hideStatus[i] ? '../static/img/ic-up.png' : '../static/img/ic-down.png' }  alt='折叠展开'/>
                                        <p className='time'>{Funs.dateFormat(o.measureTime,'hh:mm:ss',true)}</p>
                                        <p className='describe'>{o.skinTypeDesc}</p>
                                    </dt>
                                    <dt className={hideStatus[i] ? "list-detail" : "list-detail hide" }>
                                        <ul className='flex'>
                                            <li className='flex-cell'>部位</li>
                                            <li className='flex-cell'>水分</li>
                                            <li className='flex-cell'>油性</li>
                                            <li className='flex-cell'>弹性</li>
                                            <li className='flex-cell'>状态</li>
                                        </ul>
                                        {o.partMeasureVOs.map(function(it,i2){
                                            return <ul className='flex item' key={i2}>
                                                <li className='flex-cell'>{partObj[it.part]}</li>
                                                <li className='flex-cell'>{it.water}%</li>
                                                <li className='flex-cell'>{it.oil}%</li>
                                                <li className='flex-cell'>{it.elasticity}</li>
                                                <li className='flex-cell'>{it.skinTypeName}</li>
                                            </ul> ;
                                        })}
                                    </dt>
                                </dl>
                            )
                        }.bind(this)) : <h2 className="no-history">今日没有测试数据</h2>
                    }
                </section>

                <div id="mytoast"></div>
            </main>
        );
    }

};
