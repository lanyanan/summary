'use strict';
/**
 * 图表组件
 * @prop {lineOption}   图表参数
 * @prop {waterlines}   图表参数数组汇总对象
 */
export const EchartsLiner = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function() {
        return (
            <div id="liner" ref="chart"></div>
        );
    },
    componentWillUpdate:function(nextProps,nextState){
        if (nextProps.renderWaterline==2) {
            return false;
        }
        setTimeout(()=>{
            let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
            if(nextProps) {
                let data = nextProps.waterlines;
                let timeDesc = [],pureWaterTotal = [],sourceWaterTotal = [],sourceWaterTdsValue = [],pureWaterTdsValue = [];
                data.map((item,i)=>{
                    return(
                        timeDesc[i]=(item.timeDesc).replace(/\./,"-"),
                            pureWaterTdsValue[i]=item.pureWaterTdsValue,
                            sourceWaterTdsValue[i]=item.sourceWaterTdsValue,
                            pureWaterTotal[i]=item.pureWaterTotal,
                            sourceWaterTotal[i]=item.sourceWaterTotal
                    )
                });
                //console.log('--------------------1-',timeDesc);
                //console.log('--------------------2-',pureWaterTdsValue);
                //console.log('--------------------3-',sourceWaterTdsValue);
                //console.log('--------------------4-',pureWaterTotal);
                //console.log('--------------------5-',sourceWaterTotal);
                let chartDom = ReactDOM.findDOMNode(this.refs.chart);
                let lineChart = echarts.init(chartDom);
                //图标配置项
                let lineOption = {
                    title: {
                        text: '水质TDS值(TDS)',
                        textStyle: {
                            color: "#949494",
                            fontSize: 16
                        },
                        //icon: 'image://../static/img/i-circle-blue-big.png',
                        padding: [10, 0, 7,55]
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:[
                            {
                                name : '净水',
                                textStyle:{
                                    fontSize:12,
                                },
                                icon : 'image://../static/img/i-circle-blue-big.png',
                            },
                            {
                                name : '自来水',
                                textStyle:{
                                    fontSize:12,
                                },
                                icon : 'image://../static/img/i-circle-gray-big.png',
                            },
                        ],
                        right: 5,
                        top: 8
                    },
                    grid: {
                        left: '0%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: timeDesc,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        type: 'category',
                        boundaryGap: false,
                    },
                    yAxis: {
                        max:2000,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                    series: [
                        {
                            name : '净水',
                            type:'line',
                            stack: '总量',
                            symbol:isIOS?'image://../static/img/i-circle-blue.png':'emptyCircle',//echarts3 'emptyCircle' 在ios下有bug，用图标展示
                            symbolSize: isIOS?10:10,
                            data:pureWaterTdsValue,
                            showAllSymbol: true,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function(a,b,c){
                                        return c;
                                    },
                                    textStyle: {
                                        color: "#788a9a",
                                        fontSize: 12,
                                    },
                                    zlevel:99999
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: "#788a9a",
                                    color: "#b2b2b2"
                                }
                            },
                            markLine: {
                                silent: true
                            },
                            markArea: {
                                label: {
                                    normal: {
                                        show: true,
                                        //formatter: 'tds',
                                        formatter: function(a,b,c){
                                            return c;
                                        },
                                        textStyle: {
                                            color: "#788a9a",
                                            fontSize: 12,
                                        }
                                    }
                                },
                            },
                            legendHoverLink: true,
                            smooth: true,
                            clipOverflow: false,
                            zlevel:400
                        },

                        {
                            name: '自来水',
                            type: 'line',
                            stack: '总量',
                            data: sourceWaterTdsValue,
                            symbol: isIOS? 'image://../static/img/i-circle-gray.png':'emptyCircle',//echarts3 'emptyCircle' 在ios下有bug，用图标展示
                            symbolSize: isIOS?10:10,
                            showAllSymbol: true,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function(a,b,c){
                                        return c;
                                    },
                                    textStyle: {
                                        color: "#67d9ee",
                                        fontSize: 12
                                    }
                                },
                            },
                            itemStyle: {
                                normal: {
                                    borderColor: "#5ed6ed",
                                    color: "#b2b2b2"
                                }
                            },
                            markLine: {
                                silent: true
                            },
                            legendHoverLink: true,
                            smooth: true,
                            clipOverflow: false,
                        }
                    ]
                };
                lineChart.setOption(lineOption);
            }
        },3000)
    },
    componentWillReceiveProps:function(next){
    }
});