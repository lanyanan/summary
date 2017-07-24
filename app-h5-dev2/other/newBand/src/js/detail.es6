import echarts from 'echarts';
import CalendarControl from './CalendarControl.es6';
import SleepLive2 from './sleepLive2.es6';
import {Link} from 'react-router';
import {sleepStore} from './Stores/sleepStore.es6';
import {sleepAction} from './Actions/sleepAction.es6';

export default class Detail extends React.Component{
    state = {
        date:new Date(+Date.now() - 1*24*3600*1000),
        detectTime: 0,
        calendarStatus: false,
        loading: false
    }

    constructor(props){
        super(props);

        this.removeListener = sleepStore.listen((data)=>this.setState(data))
    }

    componentDidMount(){
        var dom = document.getElementById('loading');
        dom.innerHTML = '加载中...';

        this.setState({loading: true});

        this.getDayReport(this.state.date.Format('yyyy-MM-dd'), 1, true);      
    }

    componentWillUnmount(){
        clearTimeout(this.showTip);
        this.removeListener();
    }

    render(){        
        // 设备名、睡眠数据
        var {deviceName, rawData} = this.props,

            // 在线状态、电池量
            {online, batteryPower} = rawData,

            // 检测时长、日期、是否显示日历、是否加载完成
            {detectTime, date, calendarStatus, loading} = this.state;

        // 电量显示
        var conStatus, batColor, barstyle, batContent;
        conStatus = online == 1 ? '已连接智慧盒子' : (online == 2 || online == null) ? '未连接' : '';

        if(conStatus == '未连接'){
            batContent = '电量获取失败'

        }else if(batteryPower == 255){
            batColor = {color: '#87D151'};
            batContent = <span className='battery-cn' style={batColor}>充电中</span>;

        }else{
            if(batteryPower){
                var wid = 6.5*batteryPower/100+'rem';
                barstyle = parseFloat(batteryPower)/100 < 0.2 ? {background: '#F6571E',width: wid}:{background: '#9178C2',width: wid};
            }
            batContent = <span className='battery-cn'><i><em style={barstyle} id="battery-bar"></em></i>&nbsp;{+batteryPower+'%'}</span>;
        }

        var cItem = null;
        if(calendarStatus){
            cItem = (
                <div className="calendar-ctrl" id="calendar-ctrl" onTouchEnd={this.toggleCalendar.bind(this)} onTouchStart={this.stopScroll}>
                    <CalendarControl callbackParent={this.onChildChanged.bind(this)} date={date} callback={this.onChildChangeCal.bind(this)}/>
                </div>
                )
        }
        return (
                <div className='main'>

                    <div className='m-connect'>
                        <div className='container flex'>
                            <div className='light-logo'>
                                <img src='../static/img/light-logo.png' className='logo1'/>
                                <img src='../static/img/logo2.png' className='logo2' style={{display: 'none'}}/>
                            </div>
                            <div className='showstate'>
                                <h2 className='name'>设备名称&nbsp;&nbsp;&nbsp;<span className='name-cn'>{deviceName}</span></h2>
                                <h2 className='battery'>仪器电量&nbsp;&nbsp;&nbsp;{batContent}</h2>
                                <h2 className='state'>连接情况&nbsp;&nbsp;&nbsp;<span>{conStatus}</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className='m-calendar'>
                        <div className='container'>
                            <div className='m-calendar-bd flex'>
                                <div className="showcalendar flex">
                                    <div className="showcalendar-contain flex" onTouchEnd={this.toggleCalendar.bind(this)}>
                                        <p id="standard-date">{date.Format('yyyy-MM-dd')}</p>
                                        <img src="../static/img/calendar.png"/>
                                    </div>
                                </div>

                                <div className="left-arrow arrow flex" data-type="pre" onTouchEnd={this.turnDay.bind(this,-1)}>
                                    <em data-type="pre"></em>
                                </div>

                                <div className="right-arrow arrow flex" data-type="next" onTouchEnd={this.turnDay.bind(this,1)}>
                                    <em data-type="next"></em>
                                </div>
                            </div>
                        </div>
                        {cItem}
                    </div>

                    <div className='m-timewatch'>
                        <div className='container flex'> 
                            <h2>监测时长:&nbsp;<span className='w-time'>{this.formatSecond(detectTime*60)}</span></h2>
                        </div>   
                    </div>
                    
                    {/* 心率、呼吸、翻身 */}
                    <div className="m-charts">
                        
                        <div className="heart-chart singlechart" id="heart-chart"></div>
                        <div className="breath-chart singlechart" id="breath-chart"></div>
                        <div className="turnover-chart singlechart" id="turnover-chart"></div>

                    </div>

                    <div className="m-dataTip" id="dataTip" style={{display: 'none'}}>
                        暂无数据！
                    </div>
                    <div className="m-statusTip" id="statusTip" style={{display: 'none'}}>
                        设备离线！
                    </div>
                    <div className="m-loading" id="loading" style={loading ? {} : {display: 'none'}}>
                        加载中...
                    </div>

                    <div className='m-btn flex'>                        
                        <div className="m-btn-mn flex" >
                            <Link to="/live" style={{color: '#7748D6'}}>查看实时数据</Link>
                        </div>                   
                    </div>             
                </div>
            )
    } 

    /* 查看前后的睡眠数据 */
    turnDay(num){
        var curDate = new Date(+this.state.date),
            newDate = new Date(curDate.setDate(curDate.getDate() + num));

        this.getDayReport(newDate.Format('yyyy-MM-dd'), num > 0 ? 2 : 1);

        var dom = document.getElementById('loading');
        dom.innerHTML = '加载中...';
        this.setState({loading: true});
    }

    /* 显示隐藏日历 */
    toggleCalendar(e){
        e.preventDefault();
        e.stopPropagation();
        var status = this.state.calendarStatus
        if(!status || (e.target.className =='calendar-ctrl')){
            this.setState({calendarStatus: !status});
        }
    }

    /* 
        将后台获取数据转化成表格格式数据 
        @data   要转化的数据
        @flag   第一个最大最小值是否添加样式   true：不添加   false：添加
    */
    formatData(data, flag){
        var i = 0, list = data.list, len = list.length, arr = [], H = 3600*1000;

        var maxflag = 0, minflag = 0;

        for(i = 0; i < len; i++){

            var item = list[i], next = list[i+1], stamp, nextStamp

            // 时间转化为时间戳再加8小时
            stamp = +new Date(item.key.replace(/\-/g,'/')) + 8*H;

            // 第一个最大最小值时添加样式
            if(((item.value == data.maxValue && !maxflag++) || (item.value == data.minValue && !minflag++)) && !flag){
                arr.push(this.getMaximinStyle(stamp, +item.value));
            }else{
                arr.push([stamp, +item.value]);
            }
            
            // 前后相差15分钟
            next && (nextStamp = +new Date(next.key.replace(/\-/g,'/')) + 8*H);
            if(next && (nextStamp - stamp > 15*60*1000)) arr.push([stamp + 1, null]);
        }

        len = arr.length;

        var timeStart = Math.floor((arr[0][0]||arr[0].value[0])/H)*H,
            timeEnd = Math.ceil(arr[len-1][0]/H)*H,
            sectionTime = (timeEnd - timeStart)/H,
            tick = Math.ceil(sectionTime/6);

        return {
            suMax: data.sleepAnalysisVO.maxValue,
            max: data.maxValue,
            suMin: data.sleepAnalysisVO.minValue,
            aveVal: data.avgValue,
            timeStart: timeStart,
            timeEnd: timeEnd,
            sectionTime: sectionTime,
            tick: tick,
            arr: arr
        }
    }

    getMaximinStyle(x,y){
        return {
            value:[x,y],
            label:{
                normal:{
                    show: true,
                    textStyle:{
                        color:"green"
                    }
                }
            },
            itemStyle:{
                normal:{
                    color:'green',
                    borderWidth:1,
                    borderType:'solid',
                    opacity:1
                }
            }
        }
    }

    /* 实例化echart表格 */
    createChart(id, data){
        var _this = this,
            title = [{
                text:'心率',
                textAlign: 'left',
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                    fontWeight:'normal'
                }     
            },{
                text:'成人的正常心率范围为:'+ data.suMin + '-' + data.suMax,
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                    fontWeight:'normal'
                },
                bottom:0
            },{
                text:data.aveVal+'次/分',
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                    fontWeight:'normal'
                },
                right:0
            }],
            xAxis = {
                type: 'time',
                axisLine:{
                    lineStyle:{
                        color:'#D8D8D8'
                    }
                },
                interval:data.tick*3600*1000,
                minInterval:1*3600*1000,
                axisTick:{
                    length:0
                },
                axisLabel: {
                    show:true,
                    formatter: function(value){
                        return (_this.format(new Date(value).getHours())+':'+_this.format(new Date(value).getMinutes()))
                    },
                    textStyle:{
                        color:'#333'
                    }
                },
                splitNumber:5,
                splitLine: {
                    show: false
                },
                min: data.timeStart,
                max: data.timeEnd
            },
            yAxis = {
                splitLine: {
                    lineStyle:{color:'#ddd'}
                },
                axisLabel:{
                    interval:2,
                    margin:12
                },
                axisLine:{
                    show:false,
                },
                axisTick:{
                    length:0
                },
                interval :40
            },
            series = [
            {
                name:'心率',
                type: 'line',
                data: data.arr,
                markLine:{
                    silent: true,
                    symbolSize:0,
                    lineStyle:{
                        normal:{
                            color:'#49BA83',
                            type:'solid'
                        }
                    },
                    data:[
                        {yAxis:data.suMin},
                        {yAxis:data.suMax}
                    ]
                },
                lineStyle:{
                    normal:{
                        width:1,
                        color:'#ffe26e'
                    }
                },
                itemStyle:{
                    normal:{
                        borderWidth:0,
                        opacity:0
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0, color: '#ffe26e' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'white' // 100% 处的颜色
                        }], false)
                    }
                },
            }];
            
        if(id=='heart'){
            if(data.max < 120) yAxis.max = 120;
        }else if(id=='breath'){
            title[0].text = '呼吸率';
            title[1].text = '成人的正常呼吸率范围为:'+ data.suMin + '-' + data.suMax;
            yAxis.interval = 10;
           if(data.max < 30) yAxis.max = 30;
            series[0].name='呼吸率';
        }else if(id == 'turnover'){
            title[0].text = '体动';
            title[1] = {}
            title[2].text = data.aveVal+'次'
            yAxis.interval = 10;
            if(data.max < 30) yAxis.max = 30;
            series[0].name='体动';
            series[0].markLine = {};
        }
        ;(function(){
            var yls = [90,80,70,60,50,40,30,20,10,0];

            if(id == 'heart') yls = [240,220,200,180,160,140,120,80,40,0];

            yAxis.axisLabel.formatter = function(value){
                var v = value;
                switch(true){
                    case v > yls[0]: return void 0;
                    case v > yls[1]: return yls[0];
                    case v > yls[2]: return yls[1];
                    case v > yls[3]: return yls[2];
                    case v > yls[4]: return yls[3];
                    case v > yls[5]: return yls[4];
                    case v > yls[6]: return yls[5];
                    case v > yls[7]: return yls[6];
                    case v > yls[8]: return yls[7];
                    case v > yls[9]: return yls[8];
                    case v == yls[9]: return yls[9];
                }
            }
        }());
        
        var chart = echarts.init(document.getElementById(id + '-chart'));
        chart.setOption({
            title:title,
            tooltip:{
                show:false
            },
            xAxis: xAxis,
            yAxis: yAxis,
            legend: {
                show: false
            },
            series: series,
            grid:{height:140,top:36}
        })
    }

    /*
        获取睡眠数据详细记录
        @date  要查询的时间
        @flag  查询标记(0-当前，1-往前，2-往后)
        @bl    是否显示默认数据
    */
    getDayReport(date,flag,bl){

        var _this = this, cc = this.createChart.bind(this),
            opts = {date: date, queryFlag: flag, paramId: 0};

        sleepAction.getMattressDetailData(opts, (data)=>{
            var {detectionDuration, dateTime} = data;

            _this.setState({
                loading: false
            });

            if(data.heartRate.list.length && data.breathRate.list.length && data.turnOverTimes.list.length){
                _this.setState({
                    detectTime: detectionDuration,
                    date: new Date(dateTime.replace(/\-/g,'/'))
                })
                cc('heart', _this.formatData(data.heartRate));
                cc('breath', _this.formatData(data.breathRate));
                cc('turnover', _this.formatData(data.turnOverTimes, true));
            }else{
                if(bl){
                    var defData = {suMin:50, suMax:100, aveVal:'--', sectionTime:10*3600*1000, tick:2, arr:[[1451656800000,0],[1451656898750,0]],max:0};
                    
                    cc('heart', defData);
                    defData.suMin = 12; defData.suMax = 20;

                    cc('breath', defData);
                    cc('turnover', defData);

                }else{
                    var dom = document.getElementById('dataTip');
                    dom.style.display = 'block'

                    _this.showTip = setTimeout(function(){
                        dom.style.display = 'none'
                    },1000);
                } 
            }
        },()=>{
            var dom = document.getElementById('loading');
            dom.innerHTML = '加载失败';
            this.setTimeout(()=>{
                this.setState({loading: false});
            },2000)
        })
    }

    /* 将秒数转化为 hh:mm:ss 格式 */
    formatSecond(a){
        if(a < 0) return '';

        var hh = parseInt(a/3600),
            mm = parseInt((a-hh*3600)/60),
            ss = parseInt((a-hh*3600)%60);  

        return this.format(hh) + ":" + this.format(mm) + ":" + this.format(ss);  
    }

    /* 个位数时，十位补0 */
    format(d) {
        return d >= 10 ? d : ("0"+d);
    }

    stopScroll(e){
        e.preventDefault();
        e.stopPropagation();
    }

    onChildChanged(curDate){
        var dom = document.getElementById('loading');
        dom.innerHTML = '加载中...';
        this.setState({loading: true});
        this.getDayReport(curDate,0);
    }

    onChildChangeCal(status){
        this.setState({calendarStatus:status});
    }
}