'use strict';
/**
 * 日历组件
 * @prop {obj} getdata  请求接口需要传的参数
 * 1、根据月份查询当月有数据日期

http请求方式: GET
http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getOxygenPulseDateList
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Funs} from '../../../common/src/fun.es6';


export class Clndr extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {datelist:[],tagDates:[],selectDate:'',historyResult:''};
        this.listenStore(Store); // 监听Store
    }
    submit(e){
        e.preventDefault();
        if(this.state.selectDate!=''){
            window.datepickerCB(this.state.selectDate);
            setTimeout(()=>history.back(), 100);
        } 
    }
    render() {
        return (
            <article className='clndrMain'>
                <section  className='clndr'>
                    <div className="calendar-wrap" ref='calendar'></div>
                </section>
                <a href='#' className={this.state.selectDate!=''?'confirmBtn on':'confirmBtn off'}   onTouchTap={this.submit.bind(this)}>确定</a>
            </article>
           
        );
    }
    componentDidMount(){
        let _this = this,
        tag=this.props.params.tagDates,
        arr=[];
        arr.push(tag);
        let tagDates=tag?(tag.indexOf(',')>0?tag.split(','):arr):[1];
        //Actions.getValidDate(month);
        //console.log(this.props.params,tag,tagDates);
        setTimeout(function(){
        // console.log('rili',_this.state.tagDates)
            new Calendar({
                target:'.calendar-wrap',
                className: 'cal',
                tagDates:tagDates,
                onSelect: _this.selectDate.bind(_this),
                onChangeMonthBefore: function (dateObj) {
                    _this.getTagDates(dateObj);
                }
            });     
        },500);
    }
    selectDate(dateObj,e){
        let day=dateObj.date>9?dateObj.date:'0'+dateObj.date,
            month=dateObj.month>9?dateObj.month:'0'+dateObj.month,
            newdate=dateObj.year+'-'+month+'-'+day;
        this.setState({selectDate:newdate})
         //Actions.changeDate(newdate,data);
    }
    getTagDates(dateObj){
        let _this = this;
        let type=dateObj.type,
            month=dateObj.month,
            year=dateObj.year,
            newMonth=type==='pre'?month-1:(type==='today'?month:month+1),
            trueMonth=newMonth>9?newMonth:'0'+newMonth;
            if(newMonth>12){
                trueMonth = "01";
                year ++;
            }else if(newMonth<1){
                trueMonth = 12;
                year--;
            }
        let date = year+'-'+trueMonth;    
        //console.log(dateObj,date);
        Actions.getValidDate(date,dateObj);
    }
      
};