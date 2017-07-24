import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {

};
Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
export const EchartsDays =  React.createClass({
    componentDidMount(){
        //let configs = this.props.configs;
        //console.log('----------------------------',configs)
    },
    componentWillReceiveProps:function(nextProps){
        //console.log('------------nextProps----------------',nextProps)
        //console.log('------------this.props----------------',this.props)
    },
    componentWillUpdate: function (nextProps, nextState) {
        let configs = nextProps.configs;
        //console.log(configs,'-----------configs');
        //console.log('------------nextProps----------------',nextProps);
        //console.log('------------this.props----------------',this.props);
        //console.log('------------nextState----------------',nextState);
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
        let xAxisLength = configs.xAxisLength;
        let water = configs.water;
        let oil = configs.oil;
        let elasticity = configs.elasticity;
        let xAxisDataSpecial = ['周一','周二','周三','周四','周五','周六','周日'];
        //构造X轴类目值 type:0 按天的时刻，显示折线图，这个展示需求未定，按取到的数据展示,type:1 按周的天数，显示柱状图，最多展示7天的数据,type:2 按月的天数显示柱状图，最多31天的数据
        if(configs.type==0){
            //if(xAxisData.length!=0){
            //    xAxisData =  ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
            //    xAxisDataSpecial = xAxisData;
            //}else{
            //    xAxisData = ['0:00','4:00','8:00','12:00','16:00','20:00','24:00'];
            //    water = [0,0,0,0,0,0,0];
            //    oil = water;
            //    elasticity = water;
            //}
        }
        if(configs.type==1){
            if(xAxisData.length!=0){
                let arr = [];
                xAxisData.map(function(item){
                    let str = item.substr(5,5);
                        str = str.replace('-','.');
                    arr.push(str)
                });
                //console.log(arr,xAxisData,xAxisDataSpecial,xAxisData.length);
                xAxisData = arr;

            }else{
                xAxisData = ['周一','周二','周三','周四','周五','周六','周日'];
                water = [0,0,0,0,0,0,0];
                oil = water;
                elasticity = water;
            }
        }
        if(configs.type==2){
            if(xAxisData.length!=0){
                let thisMonthDays = new Date(configs.year,configs.month,0).getDate();
                let tempArr = createArray(thisMonthDays);
                tempArr.splice(0,1,configs.month+'月1日')
                console.log(tempArr);
                xAxisData = tempArr;
                xAxisDataSpecial = xAxisData;
            }else{
                xAxisData = createArray(30);
                water = [0,0,0,0,0,0,0,0,0,0,   0,0,0,0,0,0,0,0,0,0,   0,0,0,0,0,0,0,0,0,0];
                oil = water;
                elasticity = water;
            }
        }

        //曲线基础数据配置，转换
        let month = configs.month || (new Date().getMonth()+1);
        let firstDay = month + '月1日';
        let len = xAxisData.length; //刻度线长度用于，markLine需要用到该参数
        let Water = createArray(31,'random',100);
        let Oil = createArray(31,'random',100);
        let Elasti = createArray(31,'random',10);

        let dataWater = iWantArr(Water);
        let dataOil = iWantArr(Oil);
        let dataElasti = iWantArr(Elasti);
        //xAxis类目轴日期默认数组
        let xAxisDataDefault = createArray(30) ||  22
            xAxisDataDefault = createArray(30);
            xAxisDataDefault.splice(0, 1, firstDay);
            xAxisDataDefault = iWantArr(xAxisDataDefault);
        //console.log('xAxisDataDefault', xAxisDataDefault);
        setTimeout(()=> {
            //共用项参数
            let title = {
                show: false,
                text: '净水量(L)',
                textStyle: {
                    color: "#949494",
                    fontSize: 16
                },
                icon: "image:/../../static/img/linetitle.png",
                padding: [10, 0, 7, 55]
            };
            let legend = {show: false};
            let grid = {show: false, x: '10%', top: '27%', width: '86%', height: '58%'};
            let tooltip = {
                show: false,
                trigger: 'axis',
                textStyle: {
                    color: '#fff'
                },
                axisPointer: {
                    type: 'shadow',
                },
                formatter: (params)=> {

                    console.log('params------------------------------------', params);
                    let tar = params[0];
                    // console.log('------------------------------------first---', tar)
                    if (tar.data != 'first' && tar.data != 'last'){
                        let obj = ''
                        /*if((tar.name).indexOf('月')!=-1){
                         obj = month + tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                         }else{
                         obj = month + '月'+tar.name+'日' + '<br/>' + tar.seriesName + ' : ' + tar.value;
                         }*/
                        obj = month + '月'+tar.name+'日' + '<br/>' + tar.seriesName + ' : ' + tar.value;
                        return obj
                    }
                    else {
                        return ''
                    }
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
            let xAxis =[
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisData  || xAxisDataDefault,
                    nameLocation: 'end',
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        margin: 8,
                        rotate: 0,
                        textStyle: {
                            color: '#999'
                        },
                        interval: (9/*9*/),
                        formatter: function (value) {
                            //暂不添加本部分逻辑
                            //value === 'first' && (value = month+'月1日');
                            //value === 'last' && (value = 30);
                            return value;
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#dedede'
                        }
                    },
                    axisTick: {
                        show: false,
                        interval: 0,
                        alignWithLabel: true
                        //length: 20
                    },
                }
            ];
            let xAxisSpecial = [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisDataSpecial  || xAxisDataDefault,
                    nameLocation: 'end',
                    boundaryGap: false,
                    axisLabel: {
                        show: true,
                        margin: 8,
                        rotate: 0,
                        textStyle: {
                            color: '#999'
                        },
                        interval: (9/*9*/),
                        formatter: function (value) {
                            value === 'first' && (value = month+'月1日');
                            value === 'last' && (value = 30);
                            return value;
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#dedede'
                        }
                    },
                    axisTick: {
                        show: false,
                        interval: 0,
                        alignWithLabel: true
                        //length: 20
                    },
                }
            ];
            let yAxis = (type)=> {
                const yAxisData = {
                    type: 'value',
                    min: 0,
                    max: 100,
                    splitNumber: 5,//分成5份
                    nameGap: 0,
                    nameLocation: 'end',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#dedede'
                        },
                    },
                    axisLabel: {
                        formatter: function (value) {
                            value == 0 && (value = '(%)');
                            return value;
                        },
                        textStyle: {
                            color: '#999'
                        },
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            opacity: .5
                        },
                    },
                };
                if (type == 'decimal') {
                    yAxisData.max = 10;
                    yAxisData.axisLabel.formatter = (value)=> {
                        value = value + '.0';
                        value == 0 && (value = '');
                        return value;
                    }
                };
                //  console.log(yAxisData, '-----------------------------------------')
                return yAxisData;
            };
            let series = (config)=> {
                return [
                    {
                        name: config.labelName || '肌肤水分',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: config.barColor || '#65c4fb',
                                barBorderRadius: [4, 4, 4, 4]
                            }
                        },
                        barWidth: 8,
                        barGap: 10,
                        barCategoryGap: '20%',
                        data: config.data || [12, 12, 1, 2, 2, 3, 10],
                        markLine: {
                            silent: true,
                            lineStyle: {
                                normal: {
                                    type: 'solid',
                                    color: config.markLineColor || '#9bd353',
                                    curveness: 18
                                },
                                emphasis: {
                                    width: 12
                                }
                            },
                            symbol: 'none',
                            label: {},
                            data: (()=> {
                                //传入一个刻度值，传几个刻度值，渲染几条
                                let arr = [];
                                config.coord.map((value, index)=> {
                                    let item = [{coord: [0, value]}, {coord: [len - 1, value]}];
                                    arr.push(item);
                                    // console.log(arr);
                                    return arr;
                                });
                                return arr;
                            })() || [[{coord: [0, 15]}, {coord: [len - 1, 15]}], [{coord: [0, 25]}, {coord: [len - 1, 25]}]]
                        },
                        markArea: {
                            label: {
                                normal: {
                                    show: false,
                                    textStyle: {
                                        color: "#788a9a",
                                        fontSize: 12,
                                    },
                                    formatter: function (a, b, c) {
                                        return c + '%';
                                    },
                                }
                            },
                        },
                    }
                ]
            };
            if (nextProps) {}
            //水分曲线
            let echartsWaterVdom = document.querySelector('#echartsWater') || ReactDOM.findDOMNode(this.refs.echartsWater),
                echartsWaterOption = {
                    title: title,
                    grid: grid,
                    tooltip: tooltip,
                    toolbox: toolbox,
                    legend: legend,
                    xAxis: xAxisSpecial,
                    yAxis: yAxis(),
                    series: series({
                        labelName: '肌肤',
                        barColor: '#65c4fb',
                        data: water || dataWater,
                        markLineColor: '#65c4fb',
                        coord: [40]//markLine's yAxis
                    })
                },
                echartsWater = echarts.init(echartsWaterVdom);
            echartsWater.setOption(echartsWaterOption);
            //油性曲线
            let echartsOilVdom = document.querySelector('#echartsOil') || ReactDOM.findDOMNode(this.refs.echartsOil),
                echartsOilOption = {
                    title: title,
                    grid: grid,
                    tooltip: tooltip,
                    toolbox: toolbox,
                    legend: legend,
                    xAxis: xAxis,
                    yAxis: yAxis(),
                    series: series({
                        labelName: '油性',
                        barColor: '#9bd353',
                        data: oil || dataOil,
                        markLineColor: '#9bd353',
                        coord: [15, 25]//markLine's yAxis
                    })
                },
                echartsOil = echarts.init(echartsOilVdom);
            echartsOil.setOption(echartsOilOption);
            //弹性曲线
            let echartsElastiVdom =  document.querySelector('#echartsElasti') || ReactDOM.findDOMNode(this.refs.echartsElasti),
                echartsElastiOption = {
                    title: title,
                    grid: grid,
                    tooltip: tooltip,
                    toolbox: toolbox,
                    legend: legend,
                    xAxis: xAxis,
                    yAxis: yAxis('decimal'),
                    series: series({
                        labelName: '油性',
                        barColor: '#ff9ddd',
                        data: elasticity || dataElasti,
                        markLineColor: '#ff9ddd',
                        coord: [3.7]//markLine's yAxis
                    })
                },
                echartsElasti = echarts.init(echartsElastiVdom);
            echartsElasti.setOption(echartsElastiOption);
        }, 5)
    },
    render: function () {
        let configData = this.props.configs;
        //console.log('--------------&&&&&&&&--------------',configData);

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
});
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////                          