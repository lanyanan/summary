/**
 * Created by Administrator on 2016-09-13.
 */
import {Actions} from '../Actions.es6';
import {Funs} from '../../../../common/src/fun.es6';

export const MonthComp = React.createClass({
    componentDidMount(){
        if(this.props){
            let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
            setTimeout(function () {
                var myChart_month = echarts.init(chart);
                // 指定图表的配置项和数据
                var option_month = {
                    grid: {
                        right: 0,
                        top: 10,
                        left: 18,
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ["第一周", " 第二周", " 第三周", "第四周", "第五周"],
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
                myChart_month.setOption(option_month);
            }, 250);
        }
    },
    render(){
        if (this.props.mydata !== 'undefined') {
            let chart = ReactDOM.findDOMNode(this.refs.chart), chartDate = this.props.mydata ? this.props.mydata : '';
            setTimeout(function () {
                var myChart_month = echarts.init(chart);
                // 指定图表的配置项和数据
                var option_month = {
                    grid: {
                        right: 0,
                        top: 10,
                        left: 18,
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ["第一周", " 第二周", " 第三周", "第四周", "第五周"],
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
                myChart_month.setOption(option_month);
            }, 180);
        }
        //let monthChartstyle = this.setDisplayType(this.state.monthChart);style={monthChartstyle};
        return ( <div id="month" className="chart" ref="chart">

            </div>
        );
    }
});