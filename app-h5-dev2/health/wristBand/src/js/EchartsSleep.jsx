import {Funs} from '../../../common/src/fun.es6';
import { arrayMax } from'./LocalFuns.jsx';
let echartsDOM=null,
    myChart=null,
    xAxisData = [],
    sleepStatusData = [],
    deepSleepData = [],
    shallowSleepData = [],
    stackSleepData = [],
    data =[],
    //series data format
    // data= [
    //     ["2000-06-05",12],["2000-06-06",10],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73]
    // ];
    // data.map((o)=>{
    //     if(o[1] > 10 )  o[1] = parseInt(Math.random(10)*10)
    // });
    //defaultxAxisData = ['02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','23:59'],
    option={
        grid:{
            left: '15%',
            right: '5%',
            top: '5%',
            bottom:'15%',
        },
        tooltip: {
            show: true,
            trigger: "axis",
        },
        xAxis: {
            data: [],
            axisTick:{
                show:false,
            },
            axisLine:{
                lineStyle:{
                    color:'rgba(106,119,249,0.2)',
                },
            }
        },
        yAxis: {
            type:'category',
            splitLine: {
                show: false
            },
            nameLocation:'middle',
            axisTick:{
                show:false,
            },
            boundaryGap: false,
            margin:20,
            nameGap:0,
            data:(function(){
                let arr = [];
                for(let i=0;i<11;i++){
                    arr[i] = '';
                    if(i==1) {
                        arr[1] = {
                            value:'清醒',
                            textStyle:{
                                color: '#2fcbb3',
                                baseline: 'middle'
                            },
                            splitLine:{
                                show:false
                            }
                        }
                    }
                    if(i==9) {
                        arr[9] = {
                            value:'浅睡',
                            textStyle:{
                                color: '#3f56ff',
                                baseline: 'middle'
                            },
                            splitLine:{
                                show:false
                            }
                        }
                    }
                    if(i==10) {
                        arr[10] ={
                            value:'深睡',
                            textStyle:{
                                color: '#c930f5',
                                baseline: 'middle'
                            },
                            splitLine:{
                                show:false
                            }
                        }
                    }
                }
                return arr;
            }()),
            min: 0,
            max:11,
            interval: 2,
            splitNumber:2,
            onZero:true,
            splitArea:{
                interval:3
            },
            axisLine:{
                show: false
            },

        },
        visualMap: {
            top: 0,
            right: 10,
            show:false,
            textStyle: {
                color: 'red'
            },
            pieces: [
                {
                    gt: 0,
                    lte: 1,
                    color: '#2fcbb3'
                },
                {
                    gt: 1,
                    lte: 9,
                    color: 'blue'
                },
                {
                    gt: 9,
                    lte: 11,
                    color: '#c930f5'
                },
                {
                    gt: 300,
                    color:  '#2fcbb3'
                },
            ],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: '睡眠质量',
            type: 'line',
            smooth: true,
            data: [],
            // itemStyle: {
            //     normal:{
            //         // color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         //     {
            //         //         offset: 0, color:  'green'
            //         //     },{
            //         //         offset: 0.2, color: '#fff'
            //         //     },
            //         //     {
            //         //         offset: 1, color: '#ddd'
            //         //     },
            //         //     {
            //         //         offset: 1, color: 'blue'
            //         //     },
            //         //     {
            //         //         offset: 1, color: 'red'
            //         //     }
            //         //     ], false)
            //     }
            // },
            markLine: {
                silent: true,
                symbolSize:0,
                label:{
                    normal:{
                        show:false
                    }
                },
                lineStyle:{
                    normal:{
                        type:'solid',
                        color: 'rgba(106,119,249,0.2)',
                    }
                },
                data: [{
                    yAxis: 1
                }, {
                    yAxis: 9
                }, {
                    yAxis: 10
                }]
            }
        },
    },
    optionBar = {
        grid:{
            left:'12%',
            right: '5%',
            bottom: '15%',
            top: '15%',
        },
        legend:{
            show: true,
            itemWidth: 8,
            top: 0,
            right: '5%',
            selectedMode:false,
            data:[{
                name:'深睡',
                icon:'circle',
                textStyle:{
                    color:'#b0bac4',
                    fontSize: 13
                }
            },{
                name:'浅睡',
                icon:'circle',
                textStyle:{
                    color:'#b0bac4',
                    fontSize: 13
                }
            }]
        },
        xAxis:{
            type:'category',
            data:[],
            axisTick:{
                show:false
            },
            axisLabel: {
                textStyle: {
                    color: '#6e757b',
                },
            },
        },
        yAxis:{
            type:'value',
            min:0,
            max: 12,
            splitNumber:6,
            interval: 2,
            axisLabel:{
                textStyle: {
                    color: '#6e757b',
                },
                formatter: (v,i)=> { return v == 0 ? '':`${v}h` }
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
        tooltip:{
            show: true,
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                textStyle: {
                    color: "#fff"
                }
            },
            formatter:(param)=>{
                console.log('数据项',param);
                return (
                    param[0].name +'<br/>'+
                    '<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #c52ff0;border-radius: 50%;"></i>' + param[0].seriesName+':'+param[0].data+'h'+'<br/>'+
                    '<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #3e55ff;border-radius: 50%;"></i>' + param[1].seriesName+':'+param[1].data+'h'+'<br/>'
                    //'<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #ffffff;border-radius: 50%;"></i>' + param[2].seriesName+':'+param[2].data+'h'
                )
            }
        },
        dataZoom:[
            {
                "type": "inside",
                "show": true,
                "start": 0,
                "end": 100
            }
        ],
        series:[
            {
                type:'bar',
                name:'深睡',
                stack:'All',
                data:[],
                barWidth:'8',
                barGap:'-100%',
                itemStyle:{
                    normal:{
                        color:'#c52ff0',
                        barBorderRadius:4,
                    }
                },
                markline: {
                    show:false
                },
                z:30,
            },
            {
                type:'bar',
                name:'浅睡',
                stack:'All',
                data:[],
                barGap:'-100%',
                barWidth:'8',
                barCategoryGap:'30%',
                itemStyle:{
                    normal:{
                        color: '#3e55ff',
                        barBorderRadius: 4
                    },
                },
                markline: {
                    show:false
                },
                z:20,
            },
            {
                type:'bar',
                name:'总计',
                data:[],
                barWidth:'8',
                barGap:'-100%',
                itemStyle:{
                    normal:{
                        color:'#3e55ff',
                        barBorderRadius:4,
                    }
                },
                markline: {
                    show:false
                },
                z:10,
            }
        ]
    };

export const EchartsSleep = React.createClass({
    getInitialState(){
        return {};
    },
    componentDidMount(){
        echartsDOM =document.getElementById('echarts-sleep');
        myChart = echarts.init(echartsDOM);

        //周月和日不同的曲线
        this.props.config.viewType==0 ? myChart.setOption(option) : myChart.setOption(optionBar);
    },
    componentWillReceiveProps(nextProps){
        xAxisData = [];
        sleepStatusData = [];
        deepSleepData = [];
        shallowSleepData = [];
        stackSleepData = [];
        //日数据
        let temp = '';

        if(nextProps.config.viewType==0){
            if(nextProps.config.list.length!==0){
                nextProps.config.list.map((o,i)=>{
                    //UTC+8小时，显示 20:33 分类似的格式
                    let formatTime = o.dateTime + ":00";
                    temp = Funs.dateFormat(formatTime,'hh:mm',true);
                    xAxisData.push(temp);
                    if(o.status==null || o.status == -1) o.status=0;
                    sleepStatusData.push(o.status);
                })
            }
            option.xAxis.data = xAxisData;
            option.series.data = sleepStatusData;

            if(nextProps.config.timestamp!=this.props.config.timestamp){
                myChart = echarts.init(echartsDOM);
                myChart.setOption(option);
            }
        }
        //周或月数据
        if(nextProps.config.viewType != 0 ){
           // console.log('切换1周月数据')
            if(nextProps.config.list.length!==0){
                nextProps.config.list.map((o,i)=>{
                    o.dateTime = o.dateTime.slice(-5,o.dateTime.length);
                    o.dateTime = o.dateTime.replace('-','.');
                    xAxisData.push(o.dateTime);
                    if(o.deepSleep==null) {
                        o.deepSleep=0
                    }else{
                        o.deepSleep = parseInt(o.deepSleep/60) == o.deepSleep/60 ? o.deepSleep/60:(o.deepSleep/60).toFixed(2);
                        o.deepSleep > 24 && (o.deepSleep=24);
                    }

                    if(o.shallowSleep==null) {
                        o.shallowSleep = 0;
                    }else{
                        o.shallowSleep = parseInt(o.shallowSleep/60) == o.shallowSleep/60 ? o.shallowSleep/60:(o.shallowSleep/60).toFixed(2);
                        o.shallowSleep > 24 && (o.shallowSleep=24);
                    }
                    let sum = (o.deepSleep*100 + o.shallowSleep*100)/100;
                    deepSleepData.push(parseFloat(o.deepSleep));
                    shallowSleepData.push(parseFloat(o.shallowSleep));
                    stackSleepData.push(sum);
                });

                //月柱显示判断
                if(nextProps.config.viewType == 2 ){
                    if(xAxisData.length<15) optionBar.dataZoom[0].end = 100;
                    if(xAxisData.length>=15 && xAxisData.length<20) optionBar.dataZoom[0].end = 45;
                    if(xAxisData.length>=20)  optionBar.dataZoom[0].end = 15;
                }
                //周柱恢复全显
                if(nextProps.config.viewType == 1) optionBar.dataZoom[0].end = 100;
                optionBar.yAxis.max =  arrayMax(stackSleepData) > 12 ?24:12;
                console.log('optionBar.yAxis.max ',optionBar.yAxis.max,'stackSleepData',stackSleepData);
                if(optionBar.yAxis.max>12) {
                    optionBar.yAxis.interval = 4;
                }else{
                    optionBar.yAxis.interval = 2;
                }
                optionBar.xAxis.data = xAxisData;
                optionBar.series[0].data =  deepSleepData;
                optionBar.series[1].data =  shallowSleepData;
                optionBar.series[2].data =  stackSleepData;
            }

            //假数据
            // xAxisData =        ["03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13"];
            // deepSleepData =    [ 14.3, 11.8,  0,  14.3, 10.5, 0,  14, 0, 0, 10.3, 0, 0, 9.3 ];
            // shallowSleepData = [ 0,     2.3,  0,  0   , 3.5 , 0,   0, 0, 0, 3.8 , 0, 0, 0   ];
            // stackSleepData =   [ 14.3, 14.1,  0,  14.3, 14  , 0,  14, 0, 0, 14.1, 0, 0, 9.3 ];
            if(nextProps.config.timestamp!=this.props.config.timestamp){
                myChart = echarts.init(echartsDOM);

                /*this.props.config.viewType==0 ? myChart.setOption(option) :*/ myChart.setOption(optionBar);
            }

        }
        //console.log(xAxisData,'xAxis----------- xAxisData',deepSleepData,shallowSleepData,stackSleepData);

    },
    componentWillUnmount(){
        xAxisData = [];
        sleepStatusData = [];
        deepSleepData = [];
        shallowSleepData = [];
        stackSleepData = [];


        option.xAxis.data = [];
        optionBar.xAxis.data = [];

        this.props.config.viewType==0 ? myChart.setOption(option) : myChart.setOption(optionBar);

        if(this.props.config.viewType!=0){
            optionBar.series[0].data = [];
            optionBar.series[1].data = [];
            optionBar.series[2].data = [];
            myChart.setOption(optionBar);
        }else{
            myChart.setOption(option);
        }

    },
    render() {
        return (
            <aside className="heart-echarts" style={{paddingBottom:'7rem'}}>
                <div id="echarts-sleep" style={{height:'250px'}}></div>
            </aside>
        )
    }
});


