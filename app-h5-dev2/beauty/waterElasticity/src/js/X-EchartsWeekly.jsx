import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {};
export const EchartsWeekly =  React.createClass({
    componentDidMount(){},
    componentWillUpdate:function(nextProps,nextState){
        setTimeout(()=>{
            let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
            if(nextProps) {
                let Water = [12,12,1,2,2,99,10];
                let Oil = [12,12,1,2,2,99,10];
                let Elasti = [5,2,1,2,2,3,9];
                let iWantArr = (a)=>{
                    a.splice(0,0,0),a.splice(a.length,0,0);
                    return a;
                };
                //共用项数据
                let timelineArray = ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
                let timelineWeekly = ['hide','周一','周二','周三','周四','周五','周六','周日','hide'];
                let timelineMonthly = ['hide','周一','周二','周三','周四','周五','周六','周日','hide'];
                let borderRadius = [4,4,4,4];
                let dataWater = iWantArr(Water);
                let dataOil = iWantArr(Oil);
                let dataElasti = iWantArr(Elasti);
                //共用项参数
                let title = {
                    show: false,
                    text: '净水量(L)',
                    textStyle: {
                        color: "#949494",
                        fontSize: 16
                    },
                    icon: "image:/../../static/img/linetitle.png",
                    padding: [10, 0, 7,55]
                };
                let legend = { show: false };
                let grid= {
                    show: false, x: '10%', top:'27%',width: '86%',height: '58%'
                };
                let tooltip ={
                    show: true,
                    trigger: 'axis',
                    textStyle: {
                        color: '#fff'
                    },
                    axisPointer:{
                        type: 'shadow',
                    },
                    formatter: (params)=>{
                        console.log('params',params[0]);
                        let tar = params[0];
                        if(tar.name == 'hide')
                            return ''
                        else
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                    }
                };
                let toolbox = {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                    }
                };
                let xAxis =  {
                    type: 'category',
                    boundaryGap: false,
                    data: timelineWeekly,
                    axisLabel: {
                        show: true,
                        margin: 8,
                        rotate: 360,
                        textStyle: {
                            color: '#999'
                        },
                        formatter: function(value){
                            value === 'hide' && (value = '');
                            return value;
                        },
                    },
                    axisLine:{
                        show: true,
                        lineStyle: {
                            color: '#dedede'
                        }
                    },
                    axisTick:{
                        show: false
                    },
                };
                let yAxis = (type)=>{
                    const yAxisData = {
                        type: 'value',
                        min: 0,
                        max: 100,
                        splitNumber:5,//100/5=20
                        nameGap:0,
                        nameLocation:'end',
                        axisLine:{
                            show: true,
                            lineStyle: {
                                color: '#dedede'
                            },
                        },
                        axisLabel: {
                            formatter: function(value){
                                value == 0 && (value = '(%)');
                                return value;
                            },
                            textStyle: {
                                color: '#999'
                            },
                        },
                        axisTick:{
                            show: false
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                type:'solid',
                                opacity:.5
                            },
                        },
                    };
                    if(type == 'decimal') {
                        yAxisData.max = 10;
                        yAxisData.axisLabel.formatter = (value)=>{
                            value =  value +'.0';
                            value == 0 && (value = '');
                            return value;
                        }
                    };
                    console.log(yAxisData,'-----------------------------------------')
                    return yAxisData;
                };
                let series = (config)=>{
                    return [
                        {
                            name: config.labelName || '肌肤水分',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal:{
                                    show:false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: config.barColor || '#65c4fb',
                                    barBorderRadius: borderRadius
                                }
                            },
                            barWidth: 8,
                            barGap: 10,
                            barCategoryGap: '20%',
                            data: config.data || [12,12,1,2,2,3,10],
                            markLine: {
                                silent:true,
                                lineStyle: {
                                    normal: {
                                        type: 'dotted',
                                        color: config.markLineColor || '#9bd353',
                                        curveness: 18
                                    },
                                    emphasis:{
                                        width: 12
                                    }
                                },
                                symbol: 'none',
                                label: {
                                },
                                data:(()=>{
                                    //传入一个刻度值，传几个刻度值，渲染几条
                                    let arr = [];
                                    config.coord.map((value,index)=>{
                                        let item = [{coord:[0,value]},{coord:[8,value]}];
                                        arr.push(item);
                                        console.log(arr);
                                        return arr;
                                    });
                                    return arr;
                                })() || [  [{coord: [0,15]},{coord: [8,15]}],[{coord:[0,25]},{coord:[8,25]}] ]
                            },
                            markArea: {
                                label: {
                                    normal: {
                                        show: false,
                                        textStyle: {
                                            color: "#788a9a",
                                            fontSize: 12,
                                        },
                                        formatter: function(a,b,c){
                                            return c+'%';
                                        },
                                    }
                                },
                            },
                        }
                    ]
                };
                //水分曲线
                let echartsWaterVdom = ReactDOM.findDOMNode(this.refs.echartsWater),
                    echartsWaterOption = {
                        title: title,
                        grid: grid,
                        tooltip: tooltip,
                        toolbox: toolbox,
                        legend: legend,
                        xAxis:  xAxis,
                        yAxis: yAxis(),
                        series: series({
                            labelName:'肌肤',
                            barColor: '#65c4fb',
                            data: dataWater,
                            markLineColor: '#65c4fb',
                            coord: [40]//markLine's yAxis
                        })
                    },
                    echartsWater = echarts.init(echartsWaterVdom);
                    echartsWater.setOption(echartsWaterOption);
                //油性曲线
                let echartsOilVdom = ReactDOM.findDOMNode(this.refs.echartsOil),
                    echartsOilOption = {
                        title: title,
                        grid: grid,
                        tooltip: tooltip,
                        toolbox: toolbox,
                        legend: legend,
                        xAxis:  xAxis,
                        yAxis: yAxis(),
                        series: series({
                            labelName:'油性',
                            barColor: '#9bd353',
                            data: dataOil,
                            markLineColor: '#9bd353',
                            coord: [15,25]//markLine's yAxis
                        })
                    },
                    echartsOil = echarts.init(echartsOilVdom);
                echartsOil.setOption(echartsOilOption);
                //弹性曲线
                let echartsElastiVdom = ReactDOM.findDOMNode(this.refs.echartsElasti),
                    echartsElastiOption = {
                        title: title,
                        grid: grid,
                        tooltip: tooltip,
                        toolbox: toolbox,
                        legend: legend,
                        xAxis:  xAxis,
                        yAxis:  yAxis('decimal'),
                        series: series({
                            labelName:'油性',
                            barColor: '#ff9ddd',
                            data: dataElasti,
                            markLineColor: '#ff9ddd',
                            coord: [3.7]//markLine's yAxis
                        })
                    },
                    echartsElasti = echarts.init(echartsElastiVdom);
                echartsElasti.setOption(echartsElastiOption);
            }
        },100)
    },
    render: function() {
        return (
            <div className="echarts-wrapper">
                <figure>
                    <h3><img src="../static/img/i-history-water.png"/>水分</h3>
                    <h4>40%以上为正常范围</h4>
                    <div id="echartsWater" ref="echartsWater"></div>
                </figure>
                <figure>
                    <h3><img src="../static/img/i-history-oil.png"/>油性</h3>
                    <h4>15~25%之间为正常范围</h4>
                    <div id="echartsOil" ref="echartsOil"></div>
                </figure>
                <figure>
                    <h3><img src="../static/img/i-history-elasticity.png"/>弹性</h3>
                    <h4>3.7以上为正常范围</h4>
                    <div id="echartsElasti" ref="echartsElasti"></div>
                </figure>
            </div>
        );
    }
})