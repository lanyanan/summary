import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

export class HeartRateChart extends BaseComponent {
    constructor(props){
        super(props);
        this.option = {
                tooltip : {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                color:['#FFB379'],
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisTick:{show:false},
                        splitLine:{show:false},
                        axisLabel:{show:false},
                        axisLine:{lineStyle:{color:'#E1E1E1'}},
                        data : this.getSeriesData(props)
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{show:false},
                        splitLine:{show:false},
                        axisLine:{lineStyle:{color:'#E1E1E1'}},
                        axisTick:{show:false}
                    }
                ],
                series : [
                    {   
                    type:'line',
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FFB379'
                            }, {
                                offset: 1,
                                color: 'white'
                            }])
                        }
                    },
                    data : this.getSeriesData(props)   
                    }   
                ]
            };
    }
    // getXAxis(props){
    //     let axis = [];
    //     props.data.map(it=>{
    //         axis.push(Funs.dateFormat(it.dataTime, 'M.d'));
    //     });
    //     return axis;
    // }
    getSeriesData(props){
        let data = props.data.heartEcg?props.data.heartEcg.split(':'):['11','81','21','28'];
        return data;
    }
    componentDidMount(){
        let chartDOM = ReactDOM.findDOMNode(this.refs.chart);
        this.chart = echarts.init(chartDOM);
        this.chart.setOption(this.option);
    }
    componentWillReceiveProps(props){
        this.option.xAxis[0].data = this.getSeriesData(props);
        this.option.series[0].data = this.getSeriesData(props);
        this.chart.setOption(this.option);

    }
    render(){
        return <div ref="chart" className="chart"></div>;
    }
};
