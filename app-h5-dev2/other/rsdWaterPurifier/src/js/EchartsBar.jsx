'use strict';
/**
 * 图表组件
 * @prop {lineOption}   图表参数
 * @prop {waterlines}   图表参数数组汇总对象
 *
 */
export const EchartsBar = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function() {
        return (
            <div id="bar" ref="bar"></div>
        );
    },
    componentWillUpdate:function(nextProps,nextState){
        //console.log('--------',nextProps.renderWaterline,nextState.renderWaterline);
        if (nextProps.renderWaterline==2) {
            return false;
        }
        setTimeout(()=>{
            if( nextProps!=='') {
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
                let chartDom = ReactDOM.findDOMNode(this.refs.bar);
                let barChart =  echarts.init(chartDom);
                //图表配置项
                let barOption = {
                    title: {
                        text: '净水量(L)',
                        textStyle: {
                            color: "#949494",
                            fontSize: 16
                        },
                        icon: "image:/../../static/img/linetitle.png",
                        padding: [10, 0, 7,55]
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['净水', '自来水'],
                        right: 10,
                        top: 45
                    },
                    grid: {
                        left: '0%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: timeDesc,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
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
                            name: '自来水',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal:{
                                    show:true,
                                    position: 'insideTop',
                                    formatter:(a,b,c)=>{  //格式化，为0时，不显示数字
                                        if(a.value==0  ){
                                            return ''
                                        }
                                        if(a.value>=10000){
                                            a.value = parseInt(a.value/10000)+'万';
                                            return a.value;
                                        }
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#788a9a',
                                    barBorderRadius: [0, 0, 3, 3]
                                }
                            },
                            data: sourceWaterTotal,
                        },
                        {
                            name: '净水',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal:{
                                    show:true,
                                    position: 'insideTop',
                                    formatter:(a,b,c)=>{
                                        if(a.value==0){   //格式化，为0时，不显示数字
                                            return ''
                                        }
                                        if(a.value>=10000){
                                            a.value = parseInt(a.value/10000)+'万';
                                            return a.value;
                                        }
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#5ed6ed',
                                    barBorderRadius: [3, 3, 0, 0]
                                }
                            },
                            data:    pureWaterTotal,
                        }

                    ]
                };
                barChart.setOption(barOption);
            }
        },3000)
    },
    componentWillReceiveProps:function(next){},
});
