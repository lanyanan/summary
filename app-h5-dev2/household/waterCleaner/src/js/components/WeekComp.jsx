/**
 * Created by Administrator on 2016-09-13.
 */
import {Actions} from '../Actions.es6';
import {Funs} from '../../../../common/src/fun.es6';

export const WeekComp = React.createClass({
    getInitialState: function () {
        return {};
    },
    render(){
        //console.log(this.props);

        if (this.props.mydata !== 'undefined') {
            let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
            setTimeout(function () {
                var myChart_week = echarts.init(chart);
                // 指定图表的配置项和数据
                var option_week = {
                    grid: {
                        right: 0,
                        top: 10,
                        left: 18,
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
                myChart_week.setOption(option_week);
            }, 180);
        }
        return ( <div id="week" className="chart" ref="chart">

            </div>
        );
    },
    componentDidMount(){
        if (this.props) {
            let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
            setTimeout(function () {
                var myChart_week = echarts.init(chart);
                // 指定图表的配置项和数据
                var option_week = {
                    grid: {
                        right: 0,
                        top: 10,
                        left: 18,
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
                myChart_week.setOption(option_week);
            }, 250);
        }
    },
});
