'use strict';
/**
 * 心电图组件
 * yValue y轴数值
 * 
 */
import {Actions} from '../js/Actions.es6';
import {Store} from '../js/Store.es6';
import {Funs} from '../../../common/src/fun.es6';

export class EcgEchart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { yValue:[]};
        //Store.listen((data)=>this.setState(data)); // 监听Store
    }
    render() {
        //console.log(this.state,this.props)
        return (
            <div>
            <section className='flex chart-container' id='chart' ref="chart"></section>
            </div>
           
        );
    }
    componentWillUpdate(nextProps){
    	//console.log('111111111111111',nextProps.yValue);
    	let yArr = this.state.yValue;
    	let yArrNew = nextProps.yValue ? (nextProps.yValue).split(":") : '';
        let _this = this;
        let chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(chartDom),
            options = {
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
			            data : ['周一','周二','周三','周四','周五','周六','周日']
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
  					data:yArr
  					}	
			    ]
			};

        // 绘制图表
        myChart.setOption(options);
    }
    componentDidMount(){

    }
  
     
};
