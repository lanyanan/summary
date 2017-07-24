import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

export class MyChart extends BaseComponent {
    constructor(props){
        super(props);
        props.data.reverse();
        this.option = {
            tooltip: {},
            textStyle: {
                color : '#919191'
            },
            xAxis: {
                data: this.getXAxis(props),
                axisLine: {
                    lineStyle: {
                        color : '#cccccc'
                    }
                }
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color : '#cccccc'
                    }
                }
            },
            series: [{
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#31c27c'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#c0edd7'
                        }, {
                            offset: 1,
                            color: '#ffffff'
                        }])
                    }
                },
                data: this.getSeriesData(props)
            }]
        };
    }
    getXAxis(props){
        let axis = [];
        props.data.map(it=>{
            axis.push(Funs.dateFormat(it.recordTime, 'M.d'));
        });
        return axis;
    }
    getSeriesData(props){
        let data = [];
        props.data.map(it=>{
            data.push(it.foodWeight);
        });
        return data;
    }
    componentDidMount(){
        let chartDOM = ReactDOM.findDOMNode(this.refs.chart);
        this.chart = echarts.init(chartDOM);
        this.chart.setOption(this.option);
    }
    componentWillReceiveProps(props){
        props.data.reverse();
        this.option.xAxis.data = this.getXAxis(props);
        this.option.series.data = this.getSeriesData(props);
        this.chart.setOption(this.option);
    }
    render(){
        return <div ref="chart" className="chart"></div>;
    }
};
