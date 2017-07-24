/**
 * Created by Administrator on 2016-09-13.
 */
import {Actions} from '../Actions.es6';
import {Funs} from '../../../../common/src/fun.es6';

export const YearComp = React.createClass({
    componentDidMount(){
        let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
        setTimeout(function () {
            var myChart_year = echarts.init(chart);
            // 指定图表的配置项和数据
            var option_year = {
                grid: {
                    right: 0,
                    top: 10,
                    left: 18,
                    bottom: 40,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ["第一季度", "第二季度", "第三季度", "第四季度"],
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#999',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        //rotate: 45
                    }
                },
                yAxis: {
                    axisLine: false,
                    splitLine: {
                        lineStyle: {
                            color: ['#ccc'],
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#47d5bf',
                            fontSize: 15
                        },
                        formatter: function (value) {
                            return value + "L";
                        }
                    },
                    axisTick: {
                        alignWithLabel: true,
                        show: false
                    }
                },
                series: [
                    {
                        smooth: true,
                        name: '用水量(L)',
                        type: 'line',
                        stack: '季度总量',
                        //symbol: 'circle',
                        symbolSize: 8,
                        areaStyle: {
                            normal: {
                                color: '#b2f4fe'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#17dff2'
                            }
                        },
                        data: chartDate
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart_year.setOption(option_year);
        }, 250);
    },
    render(){
        if (this.props.mydata !== 'undefined') {
            let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
            setTimeout(function () {
                var myChart_year = echarts.init(chart);
                // 指定图表的配置项和数据
                var option_year = {
                    grid: {
                        right: 0,
                        top: 10,
                        left: 18,
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ["第一季度", "第二季度", "第三季度", "第四季度"],
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                                width: 1,
                                type: 'solid'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            //rotate: 45
                        }
                    },
                    yAxis: {
                        axisLine: false,
                        splitLine: {
                            lineStyle: {
                                color: ['#ccc'],
                                width: 1,
                                type: 'dashed'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#47d5bf',
                                fontSize: 15
                            },
                            formatter: function (value) {
                                return value + "L";
                            }
                        },
                        axisTick: {
                            alignWithLabel: true,
                            show: false
                        }
                    },
                    series: [
                        {
                            smooth: true,
                            name: '用水量(L)',
                            type: 'line',
                            stack: '季度总量',
                            //symbol: 'circle',
                            symbolSize: 8,
                            areaStyle: {
                                normal: {
                                    color: '#b2f4fe'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#17dff2'
                                }
                            },
                            data: chartDate
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图
                myChart_year.setOption(option_year);
            }, 100);
        }

        //let yearChartstyle=this.setDisplayType(this.state.yearChart);style={yearChartstyle}
        return ( <div id="year" className="chart" ref="chart">

            </div>
        );
    }
});