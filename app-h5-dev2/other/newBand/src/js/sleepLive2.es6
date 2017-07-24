import {sleepStore} from './Stores/sleepStore.es6';
import {sleepAction} from './Actions/sleepAction.es6';
import echarts from 'echarts';

export default class SleepLive extends React.Component{
    state = {
        time: 0,            
        heartRate:0,
        breathRate:0,
        turnOverTimes:0,
        dataTime: null,
        sleepStatus: ''
    }

    componentDidMount(){

        // 定时器
        var s = 0;
        this.timer = setInterval(()=>{
            this.setState({time: ++s})
        }, 1000)

        // 获取睡眠状态
        this.getStatus();
        this.caller = setInterval(()=>{
            this.getStatus();
        }, 5000)

        // 动画
        var l = -1;
        this.mover = setInterval(()=>{
            var i = 1, dom;

            l++ > 100 && (l = -1);

            for(; i < 4; i++){
                dom = ReactDOM.findDOMNode(this.refs['move' + i]);
                dom.style.left = l + '%';
            }
        }, 35) 

        this.renderCharts();
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        clearInterval(this.mover);
        clearInterval(this.caller);
    }

    componentWillReceiveProps(nextProps){
        this.renderCharts();
    }

    render(){
        var time = this.formatSecond(this.state.time),
            sleepStatus = this.state.sleepStatus,
            hidden = {display: 'none'},
            status = '离床';

        if(sleepStatus && sleepStatus !==7 && sleepStatus !==9 && sleepStatus !== 11){
            status = '在床';
        }else if(sleepStatus==''){
            status = '--';
        }else{
            hidden = {}
        }

        return (
            <div>
                <div className="sleepLiveWrap">
                    <div className="sleepLiveChartWrap flex">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>心率</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.heartRate}</span>
                                    <span className="sleepUnit">(次/分)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div ref="move1" className="moveBlock"></div>
                                <div id={"heartRateLive-chart"} className="chart"></div>
                            </div>
                        </div>
                    </div>

                    <div className="sleepLiveChartWrap flex s-top">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>呼吸率</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.breathRate}</span>
                                    <span className="sleepUnit">(次/分)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div id="breathRateLive-chart" className="chart"></div>
                                <div ref="move2" className="moveBlock"></div>
                            </div>
                        </div>
                    </div>

                    <div className="sleepLiveChartWrap flex  s-top">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>体动</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.turnOverTimes}</span>
                                    <span className="sleepUnit">(次)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div id={"turnOverLive-chart"} className="chart"></div>
                                <div ref="move3" className="moveBlock moveBlock3"></div>
                            </div>
                        </div>
                    </div>

                    <div className='stateinfo flex' style={hidden}>
                        你已离床
                    </div>
                </div>
              
                <div className='m-monitor flex'>
                    <div className='showtime'>
                        <h4>监测时长</h4>
                        <p id="timer">{time}</p>
                    </div>
                    <div className='sleepstate'>
                        <h4>睡眠状态</h4>
                        <p>{status}</p>
                    </div>
                </div>
            </div>
        )
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

    /* 获取睡眠状态 */
    getStatus(){
        sleepAction.getLastRawStatus((data)=>{
            this.setState({sleepStatus: data.status})
        });
    }

    /* 实例化三个表格 */
    createCharts(heartRateList, breathRateList, turnoverList){
        this.heartChart = this.getChart('heartRateLive', heartRateList, {
            show:false,
            boundaryGap: true,
            data: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
        },{
            show:false,
            type:'value',
            max:150,
        })

        this.breathChart = this.getChart('breathRateLive', breathRateList, {
            show:false,
            data: [0,1,2,3,4,5,1,2,0,1,2,3,4,5,1,2,3,4,5,1,2,1]
        },{
            show:false,
            type:"value",
            max:120,
        })

        this.turnoverChart = this.getChart('turnOverLive', turnoverList, {
            show:false,
            data:[1,2,3,4,5,1,2,3,4,5,1,2,1,2,3,4,5,1,2,3,4,5,1,2]
        },{
            show:false,
            type:"value",
            max:15,
        },true)
    }

    /* 实例化表格 */
    getChart(id, data, xAxis, yAxis,step){
        var chart = id == 'heartRateLive' ? this.heartChart : 
            (id == 'breathRateLive' ? this.breathChart : 
            (id == 'turnOverLive' ? this.turnoverChart : null));

        chart = chart || echarts.init(document.getElementById(id + '-chart'));

        chart.setOption({
            animation:false,
            grid:{ 
                show:false,
                left:20,
                top:20,
                bottom:20,
                right:20
            },
            tooltip:{show:false},
            xAxis: xAxis,
            yAxis: yAxis,
            series: [
            {
                symbol:"none",
                type: 'line',
                name:'',
                smooth: true,
                step: step,
                data: data,
                lineStyle:{
                    normal:{
                        width:1,
                        color:'#fff'
                    }
                }
            }]
        })

        return chart;
    }

    /* 渲染表格数据 */
    renderCharts(){
        var rawData = this.props.rawData,   // 新数据
            dback = this.state;             // 旧数据

        // 默认数据
        var stateData = {heartRate:0, breathRate:0, turnOverTimes:0, _turnOverTimes:0};

        if(rawData && rawData.dataTime){

            var stamp = +new Date(rawData.dataTime.replace(/\-/g,"/")) + 8*3600*1000,
                timeDiff = Date.now() - stamp;

             // 小于两分钟
            if(timeDiff < 2*60*1000 && timeDiff > -2*60*1000){

                var turnOverTimes = dback.dataTime == stamp ? dback.turnOverTimes : (dback.turnOverTimes + rawData.turnOverTimes);

                stateData = {
                    heartRate: rawData.heartRate,
                    breathRate: rawData.breathRate,
                    turnOverTimes: turnOverTimes,
                    dataTime: stamp,
                    _turnOverTimes: rawData.turnOverTimes
                }
            }
        }

        this.setState(stateData);

        var {heartRate, breathRate, _turnOverTimes} = stateData;

        var heartRateList, breathRateList, turnoverList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

        heartRateList = [40,40,40,40+6*heartRate/7,40-6*heartRate/7,40-heartRate/7,40-heartRate/7,40+1*heartRate/7,40-6*heartRate/7,40,40,40,40,40,40,40+6*heartRate/7,40-6*heartRate/7,40-heartRate/7,40-heartRate/7,40+1*heartRate/7,40-6*heartRate/7,40,40,40,40,40,40,40+6*heartRate/7,40-6*heartRate/7,40-heartRate/7,40-heartRate/7,40+1*heartRate/7,40-6*heartRate/7,40,40,40];
        breathRateList = [20,20+3*breathRate/4,20+breathRate,20+3*breathRate/4,20,20-3*breathRate/4,20-breathRate,20-3*breathRate/4,20,20+3*breathRate/4,20+breathRate,20+3*breathRate/4,20,20-3*breathRate/4,20-breathRate,20-3*breathRate/4,20,20+3*breathRate/4,20+breathRate,20+3*breathRate/4,20,20-3*breathRate/4,20-breathRate,20-3*breathRate/4,20];
        for(var i = 0; i < _turnOverTimes; i++) {
            turnoverList[i*4+0] = turnoverList[i*4+1] = 1;
            turnoverList[i*4+2] = turnoverList[i*4+3] = 10;
        }
        
        this.createCharts(heartRateList,breathRateList,turnoverList);
    }
}