import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {};
export const EchartsDay=  React.createClass({
    componentDidMount(){},
    componentWillUpdate:function(nextProps,nextState){
        //数据合并传入
        let configs = nextProps.configs;
        //构造首尾参数
        let iWantArr = (a)=> {
            a.splice(0, 0, 'first'), a.splice(a.length, 0, 'last');
            return a;
        };
        //构造数据数组
        let createArray = (length,type,range)=> {
            let arr = [];
            for (let i = 0; i < length; i++) {
                if( type !== undefined && typeof range == "number")
                    arr.push(Math.floor(Math.random()*range))
                else
                    arr.push(i+1)
            }
            return arr;
        };
        //动态接口数据
        let xAxisData = configs.xAxis;
        let xAxisSize = xAxisData.length;
        let water = configs.water;
        let oil = configs.oil;
        let elasticity = configs.elasticity;
        let data = [
            {value:0, symbol:'rect',symbolSize:0}, {value:0, symbol:'rect',symbolSize:0}, {value:0, symbol:'rect',symbolSize:0},
            {value:0, symbol:'rect',symbolSize:0}, {value:0, symbol:'rect',symbolSize:0}, {value:0, symbol:'rect',symbolSize:0},
            {value:0, symbol:'rect',symbolSize:0},
        ]
        //曲线数据重构
        if(xAxisSize!=0){
            let arr0 = [];
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];
            for(let i=0;i<xAxisSize;i++) {
                //曲线x轴参数数组
                let str = xAxisData[i].substr(11, 5);
                arr0.push(str);
                //肌肤水质
                let waterArr = {value: water[i],symbol:'rect',symbolSize:0};
                arr1.push(waterArr);
                //肌肤油性
                let oilArr = {value: oil[i],symbol:'rect',symbolSize:0};
                arr2.push(oilArr);
                //肌肤弹性
                let elasticityArr = {value: elasticity[i],symbol:'rect',symbolSize:0};
                arr3.push(elasticityArr);
            }
            xAxisData = arr0;
            water = arr1;
            oil = arr2;
            elasticity = arr3;
        }else{
            xAxisData = [];
            water = [];
            oil = [];
            elasticity = [];
        }

        console.log('-------x轴数据-----water-----oil----elasticity-',xAxisData,water,oil,elasticity);
        setTimeout(()=>{
            let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
            //共用配置项
            let xAxisDataDefault = ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
            let markLine = (size,yAxisValue)=>{
                return [
                    {
                        coord: [0, yAxisValue||40],
                        symbol: 'none',
                        label: {
                            normal: {
                                textStyle: {
                                    align: 'right'
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                type: 'solid'
                            }
                        },
                    },
                    {
                        coord: [size-1||7,yAxisValue||40],
                        symbol: 'none',
                        label: {
                            normal: {
                                textStyle: {
                                    align: 'right'
                                }
                            }
                        },
                        lineStyle: {
                            normal: {
                                type: 'solid'
                            }
                        },
                    }
                ]
            }
            //曲线参数
            let title = {show: false}
            let grid = {show: false}
            let tooltip = (tipColor)=>{
                return {
                    show: false,
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle:{
                            color: tipColor || '#65c4fb'
                        }
                    }
                }
            }
            let toolbox= {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            }
            let xAxis= (arr)=>{
                return {
                    type: 'category',
                    boundaryGap: false,
                    data:  arr || xAxisDataDefault,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#999'
                        },

                    },
                    axisLine:{
                        show: true,
                        lineStyle: {
                            color: '#dedede'
                        }
                    },
                    axisTick: {
                        show: false,
                        interval: 0,
                        alignWithLabel: true
                    },
                }
            }
            let yAxis = (max,reg)=>{
                return {
                    type: 'value',
                    min: 0,
                    max: max || 100,
                    splitNumber:5,//100/5=20
                    nameGap:0,
                    nameLocation:'end',
                    axisLine:{
                        show: true,
                        lineStyle: {
                            color: '#dedede',
                        },
                    },
                    axisLabel: {
                        //把Y轴的第一个0替换成%或者''
                        formatter: function(value){
                            value = value+'';
                            value == 0 && (value = reg);
                            return value;
                        },
                        textStyle: {
                            color: '#999'
                        },
                    },
                    axisTick: {
                        show: false
                    },
                }
            }
            let series = (config)=>{
                return [
                    {
                        name: config.name ||'肌肤水分',
                        type:'line',
                        symbol:'circle',
                        symbolSize:6,
                        itemStyle : {
                            normal : {
                                color: config.markLineColor || 'red' || '#2796ec',
                                label : {
                                    show : true,
                                    position : 'top',
                                    textStyle : {
                                        fontWeight : '700',
                                        fontSize : '12',
                                        color:'transparent'
                                    },

                                },
                                lineStyle:{
                                    color: config.lineColor || 'blue'||'#65c4fb'
                                }
                            }
                        },
                        data: config.data || data,
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值',
                                    symbol:'circle',
                                    symbolSize:5,
                                    itemStyle : {
                                        normal: {
                                            color: config.markPointColor ||  'red' || '#2796ec',
                                            label: {
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    fontWeight: '700',
                                                    fontSize: '12',
                                                    color: '#e95d5d' //标记点字体颜色
                                                },
                                                formatter: function(max){
                                                    //console.log(max.value);
                                                    return max.value+(config.unit||'');
                                                },
                                            },
                                            lineStyle: {
                                                color: '#65c4fb'
                                            }
                                        }
                                    }

                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                    symbol:'circle',
                                    symbolSize:5,
                                    itemStyle : {
                                        normal: {
                                            color: config.markPointColor || '#2796ec',
                                            label: {
                                                show: true,
                                                position: 'top',
                                                textStyle: {
                                                    fontWeight: '700',
                                                    fontSize: '12',
                                                    color: '#e95d5d' //标记点字体颜色
                                                },
                                                formatter: function(min){
                                                    //console.log(min.value);
                                                    return min.value+(config.unit||'');
                                                },
                                            },
                                            lineStyle: {
                                                color: '#65c4fb'
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        markLine: {
                            silent:true,
                            data: config.markLine
                        },
                        markArea: {
                            label: {
                                normal: {
                                    show: true,
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
            }
            //水分曲线
            let echartsWaterVdom = ReactDOM.findDOMNode(this.refs.echartsWater),
                echartsWaterOption = {
                    title: title,
                    grid:grid,
                    tooltip: tooltip('#65c4fb'),
                    toolbox: toolbox,
                    xAxis:  xAxis(xAxisData),
                    yAxis: yAxis(100,'%'),
                    series: series(
                        {
                            name:'肌肤水质',
                            markLine:　[markLine(xAxisSize,40)],
                            markLineColor: '#2796ec',
                            lineColor: 'yellow' || '#65c4fb',
                            markPointColor: 'green' || '#2796ec',
                            unit: '%',
                            data: water || data
                        }
                    ),
                },
                echartsWater = echarts.init(echartsWaterVdom);
            echartsWater.setOption(echartsWaterOption);
            //油性曲线
            let echartsOilVdom = ReactDOM.findDOMNode(this.refs.echartsOil),
                echartsOilOption = {
                    title: title,
                    grid:grid,
                    tooltip: tooltip('#9bd353'),
                    toolbox: toolbox,
                    xAxis:  xAxis(xAxisData),
                    yAxis:yAxis(100,'%'),
                    series:series(
                        {
                            name:'肌肤油性',
                            markLine:　[
                                markLine(xAxisSize,15),
                                markLine(xAxisSize,25)
                            ],
                            markLineColor: '#7cba1a',
                            lineColor: '#7cba1a' || '#65c4fb',
                            markPointColor: '#74ba1a',
                            unit: '%',
                            data: oil || data
                        }
                    ),
                },
                echartsOil = echarts.init(echartsOilVdom);
            echartsOil.setOption(echartsOilOption);
            //弹性曲线
            let echartsElastiVdom = ReactDOM.findDOMNode(this.refs.echartsElasti),
                echartsElastiOption = {
                    title: title,
                    grid: grid,
                    tooltip: tooltip('#ff9ddd'),
                    toolbox: toolbox,
                    xAxis:  xAxis(xAxisData),
                    yAxis: yAxis(10,''),
                    series:series(
                        {
                            name:'肌肤弹性',
                            markLine:　[markLine(xAxisSize,3.7)],
                            markLineColor: '#ffcced',
                            lineColor: '#ec61bc' || '#65c4fb',
                            markPointColor: '#ec61bc',
                            unit: '',
                            data: elasticity || data
                        }
                    ),
                },
                echartsElasti = echarts.init(echartsElastiVdom);
            echartsElasti.setOption(echartsElastiOption);
        },5000)
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