import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {};
export const EchartsDaily =  React.createClass({
    componentDidMount(){},
    componentWillUpdate:function(nextProps,nextState){
        setTimeout(()=>{
            let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
            if(nextProps) {
                //共用配置项
                let timelineArray = ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
                let fontColor = '#e95d5d';
                //水分曲线
                let echartsWaterVdom = ReactDOM.findDOMNode(this.refs.echartsWater),
                    echartsWaterOption = {
                        title: {
                            show: false,
                        },
                        grid:{
                            show:false
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle:{
                                    color: '#65c4fb'
                                }
                            }
                        },
                        toolbox: {
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
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: timelineArray,
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
                        },
                        yAxis: {
                            type: 'value',
                            min: 0,
                            max: 100,
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
                                formatter: function(value){
                                    value = value+'';
                                    value == 0 && (value = '(%)');
                                    return value;
                                },
                                textStyle: {
                                    color: '#999'
                                },
                            },
                            splitLine:{
                                //show:true,lineStyle:{type:'solid'},
                                data:[
                                    { show:false,lineStyle:{type:'dashed'}},
                                    { show:true,lineStyle:{type:'solid'}},
                                    { show:true,lineStyle:{type:'solid'}},
                                    { show:true,lineStyle:{type:'solid'}},
                                    { show:true,lineStyle:{type:'solid'}},
                                ]
                            },
                        },
                        series: [
                            {
                                name:'肌肤水分',
                                type:'line',
                                symbol:'circle',
                                symbolSize:6,
                                itemStyle : {
                                    normal : {
                                        color: '#2796ec',
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
                                            color:'#65c4fb'
                                        }
                                    }
                                },
                                data:[
                                    {value:50, symbol:'rect',symbolSize:0},
                                    {value:10, symbol:'rect',symbolSize:0},
                                    {value:20, symbol:'rect',symbolSize:0},
                                    {value:30, symbol:'rect',symbolSize:0},
                                    {value:60, symbol:'rect',symbolSize:0},
                                    {value:40, symbol:'rect',symbolSize:0},
                                    {value:0, symbol:'rect',symbolSize:0}
                                ],
                                markPoint: {
                                    data: [
                                        {
                                            type: 'max',
                                            name: '最大值',
                                            symbol:'circle',
                                            symbolSize:5,
                                            itemStyle : {
                                                normal: {
                                                    color: '#2796ec',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(max){
                                                            console.log(max.value);
                                                            return max.value+'%';
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
                                                    color: '#2796ec',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(max){
                                                            console.log(max.value);
                                                            return max.value+'%';
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
                                    data: [
                                        [
                                            {
                                                coord: [0, 40],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            },
                                            {
                                                coord: [6,40],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            }
                                        ]
                                    ]
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
                    },
                    echartsWater = echarts.init(echartsWaterVdom);
                    echartsWater.setOption(echartsWaterOption);
                //油性曲线
                let echartsOilVdom = ReactDOM.findDOMNode(this.refs.echartsOil),
                    echartsOilOption = {
                        title: {
                            show: false,
                        },
                        grid:{
                            show:false
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle:{
                                    color: '#9bd353'
                                }
                            }
                        },
                        toolbox: {
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
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: timelineArray,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            axisLine:{
                                show: true,
                                lineStyle: {
                                    color: '#dedede'
                                }
                            },
                        },
                        yAxis: {
                            type: 'value',
                            min: 0,
                            max: 100,
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
                                formatter: function(value){
                                    value == 0 && (value = '(%)');
                                    return value;
                                },
                                textStyle: {
                                    color: '#999'
                                },
                            },
                            splitLine:{
                                show:true,lineStyle:{type:'solid'},
                            },
                        },
                        series: [
                            {
                                name:'肌肤油性',
                                type:'line',
                                symbol:'circle',
                                symbolSize:6,
                                itemStyle : {
                                    normal : {
                                        color: '#7cba1a',
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
                                            color:'#7cba1a'
                                        }
                                    }
                                },
                                data:[
                                    {value:50, symbol:'rect',symbolSize:0},
                                    {value:10, symbol:'rect',symbolSize:0},
                                    {value:20, symbol:'rect',symbolSize:0},
                                    {value:30, symbol:'rect',symbolSize:0},
                                    {value:60, symbol:'rect',symbolSize:0},
                                    {value:40, symbol:'rect',symbolSize:0},
                                    {value:0, symbol:'rect',symbolSize:0}
                                ],
                                markPoint: {
                                    data: [
                                        {
                                            type: 'max',
                                            name: '最大值',
                                            symbol:'circle',
                                            symbolSize:5,
                                            itemStyle : {
                                                normal: {
                                                    color: '#74ba1a',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(max){
                                                            console.log(max.value);
                                                            return max.value+'%';
                                                        },
                                                    },
                                                    lineStyle: {
                                                        color: '#74ba1a'
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
                                                    color: '#74ba1a',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(max){
                                                            console.log(max.value);
                                                            return max.value+'%';
                                                        },
                                                    },
                                                    lineStyle: {
                                                        color: '#74ba1a',
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                markLine: {
                                    silent:true,
                                    data: [
                                        [
                                            {
                                                coord: [0, 25],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            },
                                            {
                                                coord: [6,25],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            }
                                        ],
                                        [
                                            {
                                                coord: [0, 15],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            },
                                            {
                                                coord: [6,15],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            }
                                        ]
                                    ]
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
                    },
                    echartsOil = echarts.init(echartsOilVdom);
                    echartsOil.setOption(echartsOilOption);
                //弹性曲线
                let echartsElastiVdom = ReactDOM.findDOMNode(this.refs.echartsElasti),
                    echartsElastiOption = {
                        title: {
                            show: false,
                        },
                        grid:{
                            show:false
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                lineStyle:{
                                    color: '#ff9ddd'
                                }
                            }
                        },
                        toolbox: {
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
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: timelineArray,
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#999'
                                }
                            },
                            axisLine:{
                                show: true,
                                lineStyle: {
                                    color: '#dedede'
                                }
                            },
                        },
                        yAxis: {
                            type:'value',
                            min:0,
                            max: 10,
                            splitNumber:5,//100/5=20
                            nameGap:0,
                            interval:0,
                            nameLocation:'end',
                            axisLine:{
                                show: true,
                                lineStyle: {
                                    color: '#dedede',
                                },
                            },
                            axisLabel: {
                                formatter: function(value){
                                    value = value+'.0';
                                    value == 0 && (value = '');
                                    return value;
                                },
                                textStyle: {
                                    color: '#999'
                                },
                            },
                            //data:[
                            //    {
                            //    value:'0',
                            //    splitLine: {show: true}
                            //    },
                            //    {
                            //        value:'2',
                            //        splitLine: {show: false},
                            //    },4,6,8,10]
                            //splitLine:{
                            //    //show:true,lineStyle:{type:'solid'},
                            //    data:[
                            //        { show:false,lineStyle:{type:'dashed'}},
                            //        { show:true,lineStyle:{type:'solid'}},
                            //        { show:true,lineStyle:{type:'solid'}},
                            //        { show:true,lineStyle:{type:'solid'}},
                            //        { show:true,lineStyle:{type:'solid'}},
                            //    ]
                            //},
                        },
                        series: [
                            {
                                name:'肌肤弹性',
                                type:'line',
                                symbol:'circle',
                                symbolSize:6,
                                itemStyle : {
                                    normal : {
                                        color: '#ffcced',
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
                                            color:'#ec61bc'
                                        }
                                    }
                                },
                                data:[
                                    {value:0, symbol:'rect',symbolSize:0},
                                    {value:2.0, symbol:'rect',symbolSize:0},
                                    {value:3.1, symbol:'rect',symbolSize:0},
                                    {value:5.4, symbol:'rect',symbolSize:0},
                                    {value:2, symbol:'rect',symbolSize:0},
                                    {value:9.5, symbol:'rect',symbolSize:0},
                                    {value:0, symbol:'rect',symbolSize:0}
                                ],
                                markPoint: {
                                    data: [
                                        {
                                            type: 'max',
                                            name: '最大值',
                                            symbol:'circle',
                                            symbolSize:5,
                                            itemStyle : {
                                                normal: {
                                                    color: '#ec61bc',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(obj){
                                                            return obj.value;
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
                                                    color: '#ec61bc',
                                                    label: {
                                                        show: true,
                                                        position: 'top',
                                                        textStyle: {
                                                            fontWeight: '700',
                                                            fontSize: '12',
                                                            color: fontColor
                                                        },
                                                        formatter: function(obj){
                                                            return obj.value;
                                                        },
                                                    },
                                                    lineStyle: {
                                                        color: '#ec61bc'
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                markLine: {
                                    silent:true,
                                    data: [
                                        [
                                            {
                                                coord: [0, 45],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            },
                                            {
                                                coord: [6,45],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            }
                                        ],
                                        [
                                            {
                                                coord: [0, 3.7],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            },
                                            {
                                                coord: [6,3.7],
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
                                                        type: 'dashed'
                                                    }
                                                },
                                            }
                                        ]
                                    ]
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