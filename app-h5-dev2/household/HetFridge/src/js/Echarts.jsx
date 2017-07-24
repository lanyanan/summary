'use strict';
/**
 * 图表组件
 * @prop {array} timelist  x轴时间值
 * @prop {array} templist  y轴温度值
 *
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

export const Echarts = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <section className='flex chart-container' id='chart' ref="chart"></section>
        );
    },
    componentDidMount: function () {
        //加载完后,调用一次
        var _this = this;
        let nextProps = this.props;
        this.drawChart(nextProps);


    },
    drawChart:function(nextProps){
        console.log('重新绘图');
        let powerArr = nextProps.powerArr,
            chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
        //console.log('2 powerlist/powerArr',powerArr);
        let powerTime = powerArr[0];
        let powerValue = powerArr[1];

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(chartDom),
            options = {
                title: {
                    text: '功率 (w)',
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (point, params, dom ,rect) {
                        let xbi =point[0];
                        if(point[0]>206){
                            xbi -= 100;
                        }
                        // 固定在顶部
                        //console.log('point 0 ',point[0]);
                        return [xbi, ''];
                    },
                    padding:10,
                    confine:'true'
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    //['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
                    data: powerTime||[]
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'用电量',
                        type:'line',
                        smooth: true,
                        //[30, 28, 25, 26, 27, 30, 55, 50, 40, 39, 38, 39, 40, 50, 60, 75, 80, 70, 60, 40]
                        data: powerValue||[]
                    }
                ]
            };

        // 绘制图表
        myChart.setOption(options);
    },
    componentWillUpdate: function (nextProps, nextState) {
        //console.log('nextProps.powerArr',this.props.powerArr,this.isEmpty(nextProps.powerArr));
        if(nextProps.powerArr!=this.props.powerArr&& !this.isEmpty(nextProps.powerArr)){
            console.log("重新进入了timearrInit");
            this.drawChart(nextProps);
        }
    },
    isEmpty:function(value) {
        return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}
});
