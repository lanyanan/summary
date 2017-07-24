import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';

// 创建React组件
export class RealTimeChart extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            heartOption : [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40],
            breathOption : [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
            trunOverOption : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }
    componentDidMount(){
        this.heartInit(this.state.heartOption);
        this.breathingInit(this.state.breathOption);
        this.turnOverInit(this.state.trunOverOption);
        this.InitData(0,0,false);
        Actions.getRealTimeData(this.getRealTimeData.bind(this));
    	this.tclock = setInterval(()=>{
    		Actions.getRealTimeData(this.getRealTimeData.bind(this));
    	},5000);
        this.heartMax = 0;
        this.breathData = 0;
        let heartLine = this.heartLine || [],
            breathLine = this.breathLine || [],
            turnOverLine = this.turnOverLine || [];
        clearInterval(this.lineClock);
        let time = 0;
        this.lineClock = setInterval(()=>{
            let index = time % 20;
            let trunIndex = time % 48;
            if(heartLine.length == 48){
                heartLine.shift();
                breathLine.shift();
                turnOverLine.shift();
            }
            heartLine.push(this.splineHeartRateList[index]);
            breathLine.push(this.splineBreathRateList[trunIndex]);
            turnOverLine.push(this.splineTrunOverRateList[trunIndex]);
            this.updateChart(this.heartChart,heartLine);
            this.updateChart(this.breathChart,breathLine);
            this.updateChart(this.turnOverChart,turnOverLine);
            time += 1;
        },100);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.turnOverTimes != nextState.turnOverTimes ||
           this.state.heartRate != nextState.heartRate ||
           this.state.breathRate != nextState.breathRate){
            return true;
        }
        return false;
    }
    InitData(breathData,heartMax,trunOverChange = false,overTimes){
        this.splineTrunOverRateList = [
                                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                                    ];
        let calc = (angle)=>{
            return Math.sin(angle*Math.PI/180);
        }
        this.splineBreathRateList = [
            20+breathData*calc(7.5),20+breathData*calc(15),20+breathData*calc(22.5),
            20+breathData*calc(30),20+breathData*calc(37.5),20+breathData*calc(45),
            20+breathData*calc(52.5),20+breathData*calc(60),20+breathData*calc(67.5),
            20+breathData*calc(75),20+breathData*calc(82.5),20+breathData*calc(90),
            20+breathData*calc(97.5),20+breathData*calc(105),20+breathData*calc(112.5),
            20+breathData*calc(120),20+breathData*calc(127.5),20+breathData*calc(135),
            20+breathData*calc(142.5),20+breathData*calc(150),20+breathData*calc(157.5),
            20+breathData*calc(165),20+breathData*calc(172.5),20+breathData*calc(180),
            20+breathData*calc(187.5),20+breathData*calc(195),20+breathData*calc(202.5),
            20+breathData*calc(210),20+breathData*calc(217.5),20+breathData*calc(225),
            20+breathData*calc(232.5),20+breathData*calc(240),20+breathData*calc(247.5),
            20+breathData*calc(255),20+breathData*calc(262.5),20+breathData*calc(270),
            20+breathData*calc(277.5),20+breathData*calc(285),20+breathData*calc(292.5),
            20+breathData*calc(300),20+breathData*calc(307.5),20+breathData*calc(315),
            20+breathData*calc(322.5),20+breathData*calc(330),20+breathData*calc(337.5),
            20+breathData*calc(345),20+breathData*calc(352.5),20+breathData*calc(360)
        ];
        this.splineHeartRateList = [
            40,40,40,40,
            40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,
            40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,
            40,40,40,40,
            40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,
            40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7
        ];
        if(trunOverChange){
            for(let i =0;i<overTimes;i++) {
                this.splineTrunOverRateList[i*4+2]=10;
                this.splineTrunOverRateList[i*4+3]=10;
            }
        }
    }
    getRealTimeData(data){
        //处理数据
        if(typeof this.props.getSleepStatus === 'function'){
            this.props.getSleepStatus(data.sleepStatus || 0);
        }
        if(data.dataTime == null){
            this.InitData(0,0,false);
            // this.setState({
            //     turnOverTimes:0,
            //     heartRate:0,
            //     breathRate:0
            // });
            return;
        }
        let heartMax = 70;
        let breathData = 0;
        let now = (new Date()).getTime();
        let str = data.dataTime.replace(/-/g,"/");
        let resTime = (new Date(str)).getTime()+8*60*60*1000;
        let prevTime = localStorage.getItem("resTime");
        localStorage.setItem("resTime",resTime);
        if(now-resTime<120000){
            this.setState({
                turnOverTimes:Number(this.state.turnOverTimes || 0) + Number(data.turnOverTimes),
                heartRate:data.heartRate,
                breathRate:data.breathRate
            });
            let breathData = data.breathRate>=30 ? 60 : 2*data.breathRate;
            let heartMax = data.heartRate;
            let trunOverChange = false;
            if(data.turnOverTimes==0||data.turnOverTimes==null||prevTime==resTime){

            }else{
                trunOverChange = true;
            }
            this.InitData(breathData,heartMax,trunOverChange,data.turnOverTimes);
            // this.updateChart(this.heartChart,splineHeartRateList);
            // this.updateChart(this.breathChart,splineBreathRateList);
            // this.updateChart(this.turnOverChart,splineTrunOverRateList);
            
        }else{
            this.InitData(0,0,false);
        }
    }
    heartInit(data){
        let dom = document.getElementById("heartBeat");
        this.heartChart = echarts.init(dom);
        let option = null;
        option = {
            animation:false,
            tooltip: {},
            legend: {data:['']},
            grid:{
                show:false,
                left:20,
                top:20,
                bottom:20,
                right:20,
            },
            xAxis: {
                show:false,
                boundaryGap: true,
                data: data
                } ,
            yAxis: {
                show:false,
                type:'value',
                max:150,
            },
            series: {
                symbol:"none",
                name:'',
                type:'line',
                data:data,
                lineStyle:{
                    normal:{
                        width:'3',
                        color:'#41f0bc'
                        }
                    }
                }
        };
        this.heartChart.setOption(option);
    }
    breathingInit(data){
        let dom1 = document.getElementById("breathing");
        this.breathChart = echarts.init(dom1);
        let option = null; 
        option = {
            animation:false,
            grid:{
                show:false,
                left:20,
                top:40,
                bottom:40,
                right:20,
            },
            xAxis: 
                {   show:false,
                    data: data
                },
            yAxis: {
                show:false,
                max:80
                },
            series: 
                {
                    symbol:"none",
                    type:'line',
                    name:'',
                    smooth: true,
                    data:data,
                    lineStyle:{
                        normal:{
                            width:'3',
                            color:'#41f0bc'
                        }
                    }
                }
        };
        this.breathChart.setOption(option);
    }
    turnOverInit(data){
        let dom2 = document.getElementById("trunOver");
        this.turnOverChart = echarts.init(dom2);
        let option2 = null;
        option2 = {
            animation:false,
            tooltip: {},
            legend: {
                data:['']
            },
            grid:{
                show:false,
                left:20,
                top:40,
                bottom:40,
                right:20,
            },
            xAxis: 
                {   show:false,
                    data:data
                    
                }
                
            ,
            yAxis: 
                {
                show:false,
                type:"value",
                max:15,
            }
            ,
            series: 
                {
                    symbol:"none",
                    name:'',
                    type:'line',
                    data:data,
                    step:true,
                    lineStyle:{
                        normal:{
                            width:'3',
                            color:'#41f0bc'
                        }
                    }
                }
        };
        this.turnOverChart.setOption(option2);
    }
    updateChart(chart,data){
        chart.setOption({
            series: [{
                data: data
            }]
        });
    }
    componentWillUnmount(){
    	clearInterval(this.tclock);
        clearInterval(this.lineClock);
    }
    render() {
        return (
            <div className="moniter">
            	<div className="moniter-chart moniter-heart-beat">
                    <div className="chart-left">
                        <div className="data-name">心率</div>
                        <div className="data-number">
                            <h3>{this.state.heartRate || '0'}</h3>
                            <i>次/分</i>
                        </div>
                    </div>
                    <section className="grid">
                        <div id="heartBeat" className="chart-right"></div>
                    </section>
                </div>
                <div className="moniter-chart moniter-breathing">
                    <div className="chart-left">
                        <div className="data-name">呼吸率</div>
                        <div className="data-number">
                            <h3>{this.state.breathRate  || '0'}</h3>
                            <i>次/分</i>
                        </div>
                    </div>
                    <section className="grid">
                        <div id="breathing" className="chart-right"></div>
                    </section>
                </div>
                <div className="moniter-chart moniter-turn-over">
                    <div className="chart-left">
                        <div className="data-name">体动</div>
                        <div className="data-number">
                            <h3>{this.state.turnOverTimes  || '0'}</h3>
                            <i>次</i>
                        </div>
                    </div>
                    <section className="grid">
                        <div id="trunOver" className="chart-right"></div>
                    </section>
                </div>
            {/*<div className="gapLine"></div>*/}
            </div>
        );
    }
}