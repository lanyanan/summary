import {sleepAction} from './Actions/sleepAction.es6';
import {sleepStore} from './Stores/sleepStore.es6';
var CalendarHeader = React.createClass({
    getInitialState:function(){
        var year = this.props.year;
        var month = this.props.month;
        return {
            year:year, 
            month:month,
        }
    },
    
    render:function(){
        var month = this.state.month;
        return(
            <div className="headerborder" >
                <p>{this.state.year}-{this.format(month)}</p>
                <div className="triangle-left" onTouchEnd={this.handleLeftClick}> </div>
                <div className="triangle-right" onTouchEnd={this.handleRightClick}> </div>
            </div>
        )
    },

    format: function(d) {
        return d > 12 ? 1 : (d<10?'0'+d:d);
    },

    handleLeftClick:function(){
        this.handleClick(-1);
    },

    handleRightClick:function(){
        this.handleClick(1);
    },

    handleClick: function(num){
        var newMonth = parseInt(this.state.month) + num,
            year = this.state.year;

        if( newMonth > 12 ){
            year ++;
            newMonth = 1;
        }else if(newMonth < 1){
            year --;
            newMonth = 12;
        }
        this.setState({year: year,month: newMonth});
        this.props.updateFilter(year,newMonth); // 执行父组件回调函数，改变父组件状态值
        sleepAction.getDateTime(year+'-'+newMonth+'-1');
    }
});

var CalendarBody = React.createClass({
    /*因为年月状态从父组件传来，因此这里不需要初始化状态值*/
    mixins: [Reflux.listenTo(sleepStore,"onGetDateTime")],
    getInitialState:function(){
     return {
         dateList: []
     }
    },
    onGetDateTime: function(dateTime){
        if(dateTime.flag=='list'){
            this.setState(dateTime);
        }
    },
    getMonthDays:function(){
       //根据月份获取当前天数
        var year = this.props.year,
            month = this.props.month;
        var temp = new Date(year,month,0); 
        return temp.getDate(); 
    },  
    getFirstDayWeek:function(){
        //获取当月第一天是星期几
        var year = this.props.year,
            month = this.props.month;   
        var dt = new Date(year+'/'+month+'/1');
        var Weekdays = dt.getDay();
        return Weekdays;    
    },
    selectDate:function(e){
        if(e.target.tagName=='LI'){
            var curLi = e.target,
                curDate=$(curLi).attr("data-date");
                if(curDate){
                   //$('#standard-date').html(curDate);
                   // var carlendarBody = $('#calendar-ctrl');
                   // var _display= carlendarBody.css('display');
                   // if(_display=="none"||_display==""){
                   //     carlendarBody.css('display','block');
                   //     $('.calendarBorder').addClass('cal-show');
                   // }else{
                   //     carlendarBody.css('display','none');
                   //     $('.calendarBorder').removeClass('cal-show');
                   // }

                   this.props.callbackParent(curDate); 
                   this.props.callback(false);
                }
        }
    },
    format: function(d) {
        return d >= 10 ? d : ("0"+d);
    },

    componentDidMount: function(){
        var year = this.props.year,month = this.format(this.props.month);
        //console.log(year,month)
        var day = this.props.day;
        var dateStr = year+'-'+month+'-'+this.format(day);
        sleepAction.getDateTime(dateStr);
    },  
    render:function(){

        var arry1 = [],arry2 = [];
        var year = this.props.year,month = this.format(this.props.month);
        var dateList = this.state.dateList;
        //console.log(dateList);
        var getDays = this.getMonthDays(),
            FirstDayWeek = this.getFirstDayWeek(),
            _this=this;
            for(var i = 0 ;i < FirstDayWeek; i++ ){
                arry1[i] = i;
            }
            for(var i = 0 ;i < getDays; i++ ){
                arry2[i] = (i+1);
            }
            
        var node1 = arry1.map(function(item,index){
            return <li key={index}></li>
        })
        var node2 = arry2.map(function(item,index){
            var _fItem=_this.format(item);
            var liStyle={};
            if(dateList.length>0){
                for(var i=0,len=dateList.length;i<len;i++){
                    if(dateList[i]==year+"-"+month+"-"+_fItem){
                        liStyle={backgroundColor:'#6DBE45'}
                        // console.log('ddddd')
                    }
                }
            }
            return <li key={index} data-date={year+"-"+month+"-"+_fItem} style={liStyle}>{item}</li>
        })
        return(
            <div>
                <div className="weekday">
                    <ul>        
                        <li style={{color: '#F3021A'}}>日</li>
                        <li>一</li>
                        <li>二</li>
                        <li>三</li>
                        <li>四</li>
                        <li>五</li>
                        <li style={{color: '#F3021A'}}>六</li>
                    </ul>
                </div>
                <div className="CalendarDay" ref="CalendarDay"><ul onTouchEnd={this.selectDate}>{node1}{node2}</ul></div>
            </div>
        )
    }
});
const CalendarControl = React.createClass({
    formatDate:function (date,fmt, flag) {
        /**
         * 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
         * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * eg:
         * Utils.formatDate(new Date(),'yyyy-MM-dd') ==> 2014-03-02
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
         * Utils.formatDate(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
         * Utils.formatDate(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
         */
        if(!date) return;
        var o = {
            "M+" : date.getMonth()+1, //月份
            "d+" : date.getDate(), //日
            "h+" : flag ? date.getHours() : (date.getHours()%12 == 0 ? 12 : date.getHours()%12), //小时
            "H+" : date.getHours(), //小时
            "m+" : date.getMinutes(), //分
            "s+" : date.getSeconds(), //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "\u65e5",
            "1" : "\u4e00",
            "2" : "\u4e8c",
            "3" : "\u4e09",
            "4" : "\u56db",
            "5" : "\u4e94",
            "6" : "\u516d"
        };

        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    },
    getInitialState:function(){
        var newDate =  this.props.date;
        return {
            year:this.formatDate(newDate,'yyyy'),
            month:parseInt(this.formatDate(newDate,'MM')),
            day:parseInt(this.formatDate(newDate,'dd')) 
        };
    },  
    handleFilterUpdate: function(filterYear,filterMonth) {
        this.setState({
            year: filterYear,
            month: filterMonth
        });
    },
    onChildChanged:function(date){
        this.props.callbackParent(date);
    },
    onChildChangeCal: function(status){
        this.props.callback(status);
    },
    render:function(){
        return(
                <div className="calendarBorder" ref="carlendarBody">
                    <CalendarHeader year={this.state.year} month={this.state.month} day={this.state.day} updateFilter={this.handleFilterUpdate}/>
                    <CalendarBody year={this.state.year} month={this.state.month} day={this.state.day} callbackParent={this.onChildChanged} callback={this.onChildChangeCal}/>
                </div>
            
        )
    }
});

export default CalendarControl;