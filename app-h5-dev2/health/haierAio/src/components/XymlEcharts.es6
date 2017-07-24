'use strict';
/**
 * 血氧脉率历史数据图表组件
 * 
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from '../js/Actions.es6';
import {Store} from '../js/Store.es6';
import {Funs} from '../../../common/src/fun.es6';

export class XymlEcharts extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            num:1,
            oxygenXValue:[],
            oxygenYValue:[],
            pulseXValue:[],
            pulseYValue:[]
        };
        this.listenStore(Store); // 监听Store
    }
    updateEchart(date){
        //console.log(date);
         let ajaxData={
            'userType': this.state.userType?this.state.userType:'3',
            'memberId':this.state.memberId?this.state.memberId:'0',
            'appId':this.state.appId?this.state.appId:'10121',
            'timestamp':new Date().getTime()
        },
        type = this.props.type;
        Actions.updateEchart(date,type,ajaxData);
    }
    render() {
        let {num} = this.state,{glucoseStatus} = this.state;
        //console.log('chart',this.state)
        return (
            <div>
            <nav className='nav' style={{background: "#E7E7E7",marginTop:'10px'}}>
                <ul className='flex'>
                    <li className={num===1?'flex-cell active ':'flex-cell'}  onTouchEnd={this.updateEchart.bind(this,1)}>1天</li>
                    <li className={num===7?'flex-cell active ':'flex-cell'}  onTouchEnd={this.updateEchart.bind(this,7)}>7天</li>
                    <li className={num===14?'flex-cell active ':'flex-cell'} onTouchEnd={this.updateEchart.bind(this,14)}>14天</li>
                    <li className={num===30?'flex-cell active ':'flex-cell'} onTouchEnd={this.updateEchart.bind(this,30)}>30天</li>
                </ul>
            </nav>
            <section className='flex chart-container oxygenChart' id='' ref="oxygenChart"></section>
            <section className='flex chart-container pulseChart' id='chart' ref="pulseChart"></section>
            <section className='chart-bottom'>
                <span className='unnormal'><b></b>异常</span>
                <span className='ml-symbol'>脉率<b></b></span>
                <span className='xy-symbol'>血氧<b></b></span>
            </section>
            </div>
           
        );
    }
    componentDidMount(){
        let _this = this;
        setTimeout(function(){
            let ajaxData={
                'userType': _this.state.userType?_this.state.userType:'',
                'memberId':_this.state.memberId?_this.state.memberId:'',
                'appId':_this.state.appId?_this.state.appId:'',
                'timestamp':new Date().getTime()
            },
            type = _this.props.type;
            Actions.updateEchart(1,type,ajaxData);
        },500);
    }
    componentWillUpdate(nextProps,nextState){
        let _this = this,
        text = this.props.text,
        color = this.props.color,
        oxygenYValue = nextState.oxygenYValue,
        oxygenXValue = nextState.oxygenXValue,
        pulseXValue = nextState.pulseXValue,
        pulseYValue = nextState.pulseYValue,
        oMarkPointData = [],
        pMarkPointData = [];
        let oChartDom = ReactDOM.findDOMNode(this.refs.oxygenChart); // 血氧dom节点
        let pChartDom = ReactDOM.findDOMNode(this.refs.pulseChart); // 脉率dom节点


        //异常数据 标注处理
        for(let i in oxygenYValue ){
            if(oxygenYValue[i]<90){
                let obj = {name:'非常危险',value:oxygenYValue[i],xAxis:oxygenXValue[i],yAxis:oxygenYValue[i]};
                oMarkPointData.push(obj);
            }else if( 90 <= oxygenYValue[i] && 95 > oxygenYValue[i]){
                let obj = {name:'危险',value:oxygenYValue[i],xAxis:oxygenXValue[i],yAxis:oxygenYValue[i]};
                oMarkPointData.push(obj);
            }
        }
        for(let i in pulseYValue ){
            if(pulseYValue[i]>140 || pulseYValue[i] < 40){
                let obj = {name:'非常危险',value:pulseYValue[i],xAxis:oxygenXValue[i],yAxis:pulseYValue[i]};
                pMarkPointData.push(obj);
            }else if( (40 <= pulseYValue[i] && 59 > pulseYValue[i]) || (101 <= pulseYValue[i] && 140 >= pulseYValue[i])){
                let obj = {name:'危险',value:pulseYValue[i],xAxis:oxygenXValue[i],yAxis:pulseYValue[i]};
                pMarkPointData.push(obj);
            }
        }

        // 基于准备好的dom，初始化echarts实例
            let oChart = echarts.init(oChartDom),
            pChart = echarts.init(pChartDom),
            oOptions = {
                color:color,
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '0%',
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
                    boundaryGap: true,
                    axisTick:{show:false},
                    axisLabel:{show:false},
                    axisLine:{lineStyle:{color:'#E1E1E1'}},
                    data:oxygenXValue
                },
                yAxis : {
                    type : 'value',
                    splitNumber:5,
                    min:75,
                    max:100,
                    axisLine:{
                        lineStyle:{color:'#E1E1E1'}
                    }
                },
                series:{
                    name:text[0],
                    type:'line',
                    symbol:oxygenXValue.length > 1 ? 'none' : 'circle',
                    markPoint: {
                        data:oMarkPointData,
                        symbolSize:10,
                        symbolOffset :[0,5],
                        label:{normal:{show:false}}
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color[0]
                            }, {
                                offset: 1,
                                color: 'white'
                            }])
                        }
                    },  
                    data:oxygenYValue
                }
            },
            pOptions = {
                color:['#8DEABD'],
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '9%',
                    top:"5%",
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
                    boundaryGap: true,
                    data:pulseXValue,
                    axisLine:{lineStyle:{color:'#E1E1E1'}}
                },
                yAxis : {
                    type : 'value',
                    splitNumber:25,
                    interval:25,
                    min:35,
                    max:160,
                    axisLine:{
                        lineStyle:{color:'#E1E1E1'}
                    }
                },
                series:[
                    {
                        name:text[1],
                        type:'line',
                        symbol:pulseXValue.length > 1 ? 'none' : 'circle',
                        markPoint: {
                            data:pMarkPointData
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color[1]
                                }, {
                                    offset: 1,
                                    color: 'white'
                                }])
                            }
                        },  
                        data:pulseYValue
                    }
                ]
            };
        // 绘制图表
        //console.log(oOptions);
        oChart.setOption(oOptions);
        pChart.setOption(pOptions);
        
    }    
};
