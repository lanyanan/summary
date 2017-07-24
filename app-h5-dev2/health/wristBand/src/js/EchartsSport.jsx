import {arrayMax} from './LocalFuns.jsx';
let stepsChartDOM=null,
    stepsChart=null,
    caloriesChartDOM = null,
    caloriesChart= null,
    xAxisData = [],
    stepsData = [],
    caloriesData = [],
    stepsOption =  {
        grid:{
            left:'12%',
            right: '5%',
            bottom: '15%',
            top: '10%',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            show: false,
        },
        xAxis:  {
            type: 'category',
            axisTick:{
                show:false
            },
            boundaryGap: false,
            data: [],
        },
        yAxis: {
            type:'value',
            min: 0,
            max: 12000,
            interval: 3000,
            axisLabel:{
                textStyle: {
                    color: '#6e757b',
                },
                formatter: (v,i)=> { return v == 0 ? '':`${parseInt(v/1000)}k` }
            },
            axisTick:{
                show:false
            },
            axisLine:{
                show:false
            },
            splitLine:{
                lineStyle:{
                    color:  'rgba(106,119,249,0.2)'
                }
            }
        },
        series: [
            {
                name:'步数',
                type:'line',
                itemStyle:{
                    normal:{
                        color:  '#3dab77'
                    }
                },
                data:  [],
            },
        ]
    },
    caloriesOption = {
        grid: stepsOption.grid,
        tooltip: stepsOption.tooltip,
        legend: stepsOption.legend,
        xAxis: stepsOption.xAxis,
        yAxis: {
            type:'value',
            min: 0,
            max: 120,
            interval: 30,
            axisLabel:{
                formatter: (v,i)=> { return v == 0 ? '':`${parseInt(v)}/k` }
            },
            axisTick:{
                show:false
            },
            axisLine:{
                show:false
            },
            splitLine:{
                lineStyle:{
                    color:  'rgba(106,119,249,0.2)'
                }
            }
        },
        series: [
            {
                name:'卡路里',
                type:'line',
                itemStyle:{
                    normal:{
                        color:  '#3dab77'
                    }
                },
                data: [],
            },
        ]
    };
export const EchartsSport = React.createClass({
    getInitialState(){return {}},
    componentDidMount(){
        let nav = document.querySelector('#nav').offsetHeight,
            arrow = document.querySelector('#arrow-date').offsetHeight,
            viewHeight= window.screen.height,
            chartWrapperHeight = viewHeight-arrow-nav;
        this.setState({
            wrapperHeight : chartWrapperHeight+'px'
        });

        //init calories echart
        caloriesChartDOM = document.getElementById('calories');
        caloriesChart = echarts.init(caloriesChartDOM);
        caloriesChart.setOption(caloriesOption);
        //init steps echart
        stepsChartDOM = document.getElementById('steps');
        stepsChart = echarts.init(stepsChartDOM);
        stepsChart.setOption(stepsOption);
    },
    componentWillReceiveProps(nextProps){
        xAxisData = [];
        stepsData = [];
        caloriesData = [];
        if(nextProps.config.stepList.length!==0) {
            nextProps.config.stepList.map((o,i)=>{

                o.dateTime = o.dateTime.slice(-5,o.dateTime.length);
                o.dateTime = o.dateTime.replace('-','.');
                xAxisData.push(o.dateTime);
                if(o.stepCount==null) o.stepCount=0;
                stepsData.push(o.stepCount);
            })
        }
        if(nextProps.config.caloriesList.length!==0) {
            nextProps.config.caloriesList.map((o,i)=>{
                if(o.calories==null) o.calories=0;
                caloriesData.push(o.calories);
            })
        }
        //console.log(xAxisData,'xAxisData',caloriesData,'caloriesData',stepsData,'stepsData');
        if(arrayMax(caloriesData)>120){
            caloriesOption.yAxis.max = Math.ceil(arrayMax(caloriesData)/4)*4;
            caloriesOption.yAxis.interval = Math.ceil(arrayMax(caloriesData)/4);
        }
        if(arrayMax(stepsData)>12000){
            stepsOption.yAxis.max = Math.ceil(arrayMax(stepsData)/4)*4;
            stepsOption.yAxis.interval = Math.ceil(arrayMax(stepsData)/4);
        }

        caloriesOption.xAxis.data = xAxisData;
        stepsOption.xAxis.data = xAxisData;
        caloriesOption.series[0].data = caloriesData;
        stepsOption.series[0].data = stepsData;

        //console.log('----nextProps.measurestatus,this.props.measurestatus-------',nextProps.measurestatus,this.props.measurestatus);
        if(nextProps.config.timestamp!=this.props.config.timestamp){
            //console.log('timestamp',nextProps.config.timestamp)
            stepsChart.setOption(stepsOption);
            caloriesChart.setOption(caloriesOption);
        }
        //caloriesOption stepsOption
    },
    componentWillUnmount(){
        xAxisData = [];
        stepsData = [];
        caloriesData = [];
        caloriesOption.yAxis.max = 120;
        caloriesOption.yAxis.interval = 30;
        stepsOption.yAxis.max  = 12000;
        stepsOption.yAxis.interval = 3000;

        caloriesOption.xAxis.data = [];
        stepsOption.xAxis.data = [];

        caloriesOption.series[0].data = [];
        stepsOption.series[0].data = [];
        stepsChart.setOption(stepsOption);
        caloriesChart.setOption(caloriesOption);
    },
    render() {
        return (
            <section className="sport-echarts" style={{height: this.state.wrapperHeight?this.state.wrapperHeight:'auto'}}>
                <div id="calories" style={{height:'250px'}}></div>
                <div id="steps" style={{height:'250px',marginBottom:'4rem',marginTop: '1rem'}}></div>
            </section>
        )
    }
});