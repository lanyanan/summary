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
    getInitialState: function(){
        return {};
    },
    render: function() {
        return (
            <section className='flex chart-container' id='chart' ref="chart"></section>
        );
    },
    componentDidMount:function () {
        var _this=this;
        setTimeout(function () {
                var getdata=this.props?this.props.getdata:false;
                    if(getdata){
                        var data=this.props.getdata;
                        //console.log(data);
                        let today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
                        Actions.changeDate(today,data);
                    }        },1000)
    },
    componentWillUpdate:function(nextProps,nextState){
        if(nextProps.timelist!=''){
            let timelist=nextProps.timelist,
                templist=nextProps.templist,
                chartDom =ReactDOM.findDOMNode(this.refs.chart); // dom节点
                //console.log(nextProps,templist);
       
            for(var i=0;i<templist.length;i++){
                if(templist[i] > 42){
                    templist[i] = '42';
                }
            }
             
            
            // 基于准备好的dom，初始化echarts实例
           let myChart = echarts.init(chartDom),
                options = {
                    color:['#FFB9C4'],
                    grid: {
                        left: '3%',
                        right: '5%',
                        bottom: '5%',
                        top:"12%",
                        containLabel: true
                    },
                    textStyle:{
                        color:'#BDBDBD'
                    },
                     tooltip : {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:timelist,
                        axisLine:{lineStyle:{color:'#E1E1E1'}}
                    },
                    yAxis: {
                        type: 'value',
                        splitNumber:1,
                        interval:1,
                        min:34,
                        max:42,
                        axisLine:{lineStyle:{color:'transparent ',type:'dashed'}}
                    },
                    series: [
                        {
                            name:'温度',
                            type:'line',
                            data:templist
                        }
                    ]
                };
        // 绘制图表
        myChart.setOption(options);
    }
       
    
    }

});