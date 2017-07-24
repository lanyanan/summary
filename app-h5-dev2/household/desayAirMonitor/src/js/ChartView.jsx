'use strict';
/**
 */
const AppData = {}

export class ChartView extends React.Component {
    constructor(props) {
        super(props);
        // console.log("View--> 绘制ChartView constructor");
        this.initChart = this.initChart.bind(this);
        this.setOption = this.setOption.bind(this);
        this.isMiddleValue = this.isMiddleValue.bind(this);
    }

    initChart() {
        // console.log("View--> 绘制ChartView initChart");
        let tabDataList = this.props.tabDataList;
        if (tabDataList === undefined || tabDataList.length === 0) {
            // console.log("View--> 绘制ChartView initChart, 没有数据,,,tabDataList : "+tabDataList);
            return;
        }

        let myChart = echarts.init(this.refs.chart); //初始化echarts
        myChart.setOption(this.setOption());
        // 显示 tooltip
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
        });
    }

    getDate(timeStr){
        timeStr = timeStr.toString().replace(" ", "T");
        timeStr = timeStr + ".000+08:00";
        let date = Date.parse(timeStr);
        return date;
    }

    getFormatTime(time){
        time = time+"";
        time = time.length==1?("0"+time):time;
        return time;
    }

    getAnchorData(tabDataList){
        var anchor = [];
        if (tabDataList != undefined && tabDataList.length > 0 && tabDataList.length < 3) {
            let date = new Date(tabDataList[0][0]);
            let dayStr = date.getFullYear() + '-'+this.getFormatTime(date.getMonth() + 1) + '-' +this.getFormatTime(date.getDate());

            anchor.push([this.getDate(dayStr + ' 00:00:00'), 0]);
            anchor.push([this.getDate(dayStr + ' 23:59:59'), 0]);
        }
        return anchor;
    }

    setOption() {
        let tabDataList = this.props.tabDataList;
        let criticalValue = this.props.criticalValue;
        let chartUnit = this.props.chartUnit;
        AppData.tabDataList = tabDataList;
        AppData.criticalValue = criticalValue;
        let isMiddleValue = false;
        let markAreaName = "";
        let markAreaTop = criticalValue;
        if (tabDataList != undefined) {
            let max = (tabDataList.reduce((a, b) => a[1] > b[1] ? a : b))[1];
            let min = (tabDataList.reduce((a, b) => a[1] > b[1] ? b : a))[1];

            isMiddleValue = tabDataList != undefined && tabDataList.length !== 0 && criticalValue <= max && criticalValue >= min;
            markAreaName = isMiddleValue ? criticalValue : "";
            markAreaTop = isMiddleValue ? (criticalValue + (max - min) * 0.005) : criticalValue;
        }
        // console.log("isMiddleValue : "+isMiddleValue+", markAreaName : "+markAreaName+", markAreaTop : "+markAreaTop);
        var anchor = this.getAnchorData(tabDataList);

        return {
            title: {},
            tooltip: {
                show: true,
                showContent: true,
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        width: 0
                    }
                },
                trigger: 'axis',
                position: ['32%', '-20%'],
                confine: false,
                alwaysShowContent: true,
                backgroundColor: '#ffffff',
                padding: 20,
                formatter: function (params, ticket, callback) {
                    params = params[0];
                    let value = params.value[1];
                    let time = new Date(params.value[0]).Format("hh:mm");
                    return '<span  style="font-family: mywebfont;font-size: 5rem;color: #646464;">' + value + '</span> ' +
                        '<span  style="font-size: 1.2rem;margin-left: 3px;color: #646464;">' + chartUnit + '</span>' +
                        '<br/>' +
                        '<span style="font-size: 1.0rem;margin-left: 3px;color: #969696;text-align: center;">时间: ' + time + '</span>';
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '15%'

            },
            xAxis: {
                // type: 'category',
                type: 'time',
                boundaryGap: false,
                // data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                splitNumber: 7,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                lineStyle: {
                    color: '#ffffff',
                    width: 1
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#969696'
                    },
                    // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                    formatter: function (value, index) {
                        // 格式化成月/日，只在第一个刻度显示年份
                        let date = new Date(value);
                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        return (hours.toString().length == 1 ? ("0" + hours) : hours) + ":" + (minutes.toString().length == 1 ? ("0" + minutes) : minutes);
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {//坐标轴线
                    show: false
                },
                lineStyle: {
                    color: '#ffffff',
                    width: 1
                },
                axisTick: {//坐标轴刻度线
                    show: false
                },
                axisLabel: {//坐标轴刻度线对应的文本
                    show: true,
                    textStyle: {
                        color: '#969696'
                    }
                }
            },
            series: [
                {
                    name: chartUnit,
                    type: 'line',
                    smooth: true,
                    data: tabDataList,
                    markArea: {
                        itemStyle: {
                            normal: {
                                color: '#EB6E4A',
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: '#EB6E4A',
                                }
                            }
                        },
                        data: [[{
                            name: markAreaName,
                            yAxis: criticalValue
                        }, {
                            yAxis: markAreaTop
                        }]]
                    },
                    lineStyle: {
                        normal: {
                            color: '#3fb57d'
                        }
                    },
                    symbol: 'emptyCircle',
                    itemStyle: {//折现拐点样式
                        normal: {
                            color: function (params) {
                                return (params.value)[1] < criticalValue ? '#3fb57d' : '#ff0000';
                            }
                        }
                    }
                },
                {
                    name: '.anchor',
                    type: 'line',
                    showSymbol: false,
                    data: anchor,
                    itemStyle: {normal: {opacity: 0}},
                    lineStyle: {normal: {opacity: 0}}
                }
            ],
        };
    }

    componentDidMount() {
        // console.log("View--> 绘制ChartView componentDidMount");
        this.initChart();
    }

    componentDidUpdate() {
        // console.log("View--> 绘制ChartView componentDidUpdate");
        let tabDataList = this.props.tabDataList;
        let criticalValue = this.props.criticalValue;
        if (AppData.criticalValue != undefined && AppData.criticalValue == criticalValue && AppData.tabDataList != undefined && AppData.tabDataList == tabDataList) {
            // console.log("View--> 绘制ChartView componentDidUpdate, data don't change, don't need to refresh UI");
            return;
        }
        this.initChart();
    }

    isMiddleValue(tabDataList, criticalValue) {
        if (tabDataList == undefined || tabDataList.length == 0) return false;
        let min = 0;
        let max = 0;
        for (let item in tabDataList) {
            if (tabDataList[item][1] < min) {
                min = tabDataList[item][1];
            }
            if (tabDataList[item][1] > max) {
                max = tabDataList[item][1];
            }
        }
        // console.log("criticalValue : "+criticalValue+", min : "+min+", max : "+max);
        return min < criticalValue && max > criticalValue;
    }



    render() {
        // console.log("View--> 绘制ChartView render");
        return (
            <section className="StastiBody">
                <div className="charts" ref="chart">
                </div>
            </section>);
    }
}