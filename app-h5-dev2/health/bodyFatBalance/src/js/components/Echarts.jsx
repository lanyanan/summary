/**
 * Created by Administrator on 2014-08-23.
 */
/**
 * Created by Administrator on 2014-08-12.
 */
import {Actions} from '../Actions.es6';
import {Funs} from '../../../../common/src/fun.es6';

export const Echarts = React.createClass({
    getInitialState: function () {
        return {};
    },
    //    "boneWeight": "16.3",  // 骨量
//    "metabolismRate": "3.4",  // 基础代谢率
//    "moistureRate": "5.6"//水分比例
    render: function () {
        let mydata = this.props.mydata;
        if (mydata) {
            let _data = this.props.mydata ? this.props.mydata : '',
                x_data = _data._dataTime ? _data._dataTime : '', weight = _data._weight ? _data._weight : '',
                fatRate = _data._fatRate ? _data._fatRate : '', bmiRate = _data._bmiRate ? _data._bmiRate : '',
                meatRate = _data._meatRate ? _data._meatRate : '', boneWeight = _data._boneWeight ? _data._boneWeight : '',
                metabolismRate = _data._metabolismRate ? _data._metabolismRate : '', moistureRate = _data._moistureRate ? _data._moistureRate : '',
                chart_weight = ReactDOM.findDOMNode(this.refs.chart_weight),
                chart_fat = ReactDOM.findDOMNode(this.refs.chart_fat),
                chart_bone = ReactDOM.findDOMNode(this.refs.chart_bone),
                chart_muscle = ReactDOM.findDOMNode(this.refs.chart_muscle),
                chart_boneWeight = ReactDOM.findDOMNode(this.refs.chart_boneWeight),
                chart_metabolismRate = ReactDOM.findDOMNode(this.refs.chart_metabolismRate),
                chart_moistureRate = ReactDOM.findDOMNode(this.refs.chart_moistureRate);

            //console.log('*************************************', weight, x_data)
            setTimeout(function () {
                var myChart_weight = echarts.init(chart_weight);
                var mychart_fat = echarts.init(chart_fat);
                var mychart_bone = echarts.init(chart_bone);
                var mychart_muscle = echarts.init(chart_muscle);
                var mychart_boneWeight = echarts.init(chart_boneWeight);
                var mychart_metabolismRate = echarts.init(chart_metabolismRate);
                var mychart_moistureRate = echarts.init(chart_moistureRate);
                // 指定图表的配置项和数据
                var option_weight = {
                    title: {
                        text: '体重(kg)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 150,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '体重(kg)',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: weight
                        }
                    ]
                };
                var option_fat = {
                    title: {
                        text: '脂肪率(%)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 50,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '脂肪率(%)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: fatRate
                        }
                    ]
                };
                var option_bone = {
                    title: {
                        text: 'bmi'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    //toolbox: {
                    //    feature: {
                    //        saveAsImage: {}
                    //    }
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 50,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: 'bmi',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: bmiRate
                        }
                    ]
                };
                var option_muscle = {
                    title: {
                        text: '肌肉比例(kcal)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '肌肉比例(kcal)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: meatRate
                        }
                    ]
                };
                var option_boneWeight = {
                    title: {
                        text: '骨量(kg)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 10,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '骨量(kg)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: boneWeight
                        }
                    ]
                };
                var option_metabolismRate = {
                    title: {
                        text: '基础代谢率(kcal)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    //toolbox: {
                    //    feature: {
                    //        saveAsImage: {}
                    //    }
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 4000,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '基础代谢率(kcal)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: metabolismRate
                        }
                    ]
                };
                var option_moistureRate = {
                    title: {
                        text: '水分比例(%)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '水分比例(%)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: moistureRate
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart_weight.setOption(option_weight);
                mychart_fat.setOption(option_fat);
                mychart_bone.setOption(option_bone);
                mychart_muscle.setOption(option_muscle);
                mychart_boneWeight.setOption(option_boneWeight);
                mychart_metabolismRate.setOption(option_metabolismRate);
                mychart_moistureRate.setOption(option_moistureRate);
            }, 600);
        }
        return (
            <ul className='date-chart '>
                <li ref='chart_weight'></li>
                <li ref='chart_bone'></li>
                <li ref='chart_fat'></li>
                <li ref='chart_moistureRate'></li>
                <li ref='chart_muscle'></li>
                <li ref='chart_metabolismRate'></li>
                <li ref='chart_boneWeight'></li>
            </ul>
        );
    },
    componentWillUpdate: function () {
        //console.log('*************');
        if (this.props.mydata) {
            let _data = this.props.mydata ? this.props.mydata : '',
                x_data = _data._dataTime ? _data._dataTime : '', weight = _data._weight ? _data._weight : '',
                fatRate = _data._fatRate ? _data._fatRate : '', bmiRate = _data._bmiRate ? _data._bmiRate : '',
                meatRate = _data._meatRate ? _data._meatRate : '', boneWeight = _data._boneWeight ? _data._boneWeight : '',
                metabolismRate = _data._metabolismRate ? _data._metabolismRate : '', moistureRate = _data._moistureRate ? _data._moistureRate : '',
                chart_weight = ReactDOM.findDOMNode(this.refs.chart_weight),
                chart_fat = ReactDOM.findDOMNode(this.refs.chart_fat),
                chart_bone = ReactDOM.findDOMNode(this.refs.chart_bone),
                chart_muscle = ReactDOM.findDOMNode(this.refs.chart_muscle),
                chart_boneWeight = ReactDOM.findDOMNode(this.refs.chart_boneWeight),
                chart_metabolismRate = ReactDOM.findDOMNode(this.refs.chart_metabolismRate),
                chart_moistureRate = ReactDOM.findDOMNode(this.refs.chart_moistureRate);

            //console.log('*************************************', weight, x_data)
            setTimeout(function () {
                var myChart_weight = echarts.init(chart_weight);
                var mychart_fat = echarts.init(chart_fat);
                var mychart_bone = echarts.init(chart_bone);
                var mychart_muscle = echarts.init(chart_muscle);
                var mychart_boneWeight = echarts.init(chart_boneWeight);
                var mychart_metabolismRate = echarts.init(chart_metabolismRate);
                var mychart_moistureRate = echarts.init(chart_moistureRate);
                // 指定图表的配置项和数据
                var option_weight = {
                    title: {
                        text: '体重(kg)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 150,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '体重(kg)',
                            type: 'line',
                            stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: weight
                        }
                    ]
                };
                var option_fat = {
                    title: {
                        text: '脂肪率(%)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 50,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '脂肪率(%)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: fatRate
                        }
                    ]
                };
                var option_bone = {
                    title: {
                        text: 'bmi'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    //toolbox: {
                    //    feature: {
                    //        saveAsImage: {}
                    //    }
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 50,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: 'bmi',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: bmiRate
                        }
                    ]
                };
                var option_muscle = {
                    title: {
                        text: '肌肉比例(kcal)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '肌肉比例(kcal)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: meatRate
                        }
                    ]
                };
                var option_boneWeight = {
                    title: {
                        text: '骨量(kg)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 10,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '骨量(kg)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: boneWeight
                        }
                    ]
                };
                var option_metabolismRate = {
                    title: {
                        text: '基础代谢率(kcal)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    //toolbox: {
                    //    feature: {
                    //        saveAsImage: {}
                    //    }
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 4000,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '基础代谢率(kcal)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: metabolismRate
                        }
                    ]
                };
                var option_moistureRate = {
                    title: {
                        text: '水分比例(%)'
                    },
                    //tooltip: {
                    //    trigger: 'axis'
                    //},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: x_data
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '水分比例(%)',
                            type: 'line',
                            //stack: '总量',
                            symbol: 'circle',
                            symbolSize: '14',
                            areaStyle: {
                                normal: {
                                    color: '#e9f8f5'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#54d8c3'
                                }
                            },
                            data: moistureRate
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart_weight.setOption(option_weight);
                mychart_fat.setOption(option_fat);
                mychart_bone.setOption(option_bone);
                mychart_muscle.setOption(option_muscle);
                mychart_boneWeight.setOption(option_boneWeight);
                mychart_metabolismRate.setOption(option_metabolismRate);
                mychart_moistureRate.setOption(option_moistureRate);
            }, 600);
        }
    }

    //componentWillUpdate:function(nextProps,nextState){
    //    //console.log(nextProps)
    //    if(nextProps.timelist!=''){
    //        let timelist=nextProps.timelist,
    //            templist=nextProps.templist,
    //            chartDom =ReactDOM.findDOMNode(this.refs.chart); // dom节点
    //        // 基于准备好的dom，初始化echarts实例
    //        setTimeout(function(){
    //            let myChart = echarts.init(chartDom),
    //                options = {
    //                    color:['#FFB9C4'],
    //                    grid: {
    //                        left: '3%',
    //                        right: '4%',
    //                        bottom: '30%',
    //                        top:"12%",
    //                        containLabel: true
    //                    },
    //                    tooltip : {
    //                        trigger: 'axis'
    //                    },
    //                    xAxis: {
    //                        type: 'category',
    //                        boundaryGap: false,
    //                        data:timelist
    //                    },
    //                    yAxis: {
    //                        type: 'value',
    //                        splitNumber:1,
    //                        interval:1,
    //                        min:35,
    //                        max:41
    //                    },
    //                    series: [
    //                        {
    //                            name:'温度',
    //                            type:'line',
    //                            data:templist
    //                        }
    //                    ]
    //                };
    //            // 绘制图表
    //            myChart.setOption(options);
    //        }, 500);
    //    }
    //
    //
    //}
});
