'use strict';
/**
 * 历史数据图表组件
 * 
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from '../js/Actions.es6';
import {Store} from '../js/Store.es6';
import {Funs} from '../../../common/src/fun.es6';

export class HistoryEcharts extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            num:1,
            glucoseStatus:"1",
            glucosedays:'1',
            xValue:[],
            yValue:[],
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
        if(type == 'temp'){
            ajaxData.deviceId = this.state.deviceId?this.state.deviceId:'';
        }
        if(type == 'bg'){
            ajaxData.personalStatus = '1';
        }
        Actions.updateEchart(date,type,ajaxData);
    }
    resetGlucoseStatus(glucoseStatus){
        let ajaxData={
            'userType': this.state.userType?this.state.userType:'3',
            'memberId':this.state.memberId?this.state.memberId:'0',
            'appId':this.state.appId?this.state.appId:1,
            'timestamp':new Date().getTime()
        }
        Actions.resetGlucoseStatus(ajaxData,glucoseStatus);
    }
    render() {
        let {num} = this.state,{glucoseStatus} = this.state;
        console.log('chart',this.state)
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
            <section className={this.props.type==='bg'?'chose-status show':'hide'} style={{margin:'-15px'}} >
                <div className='flex'>
                    <p className={glucoseStatus==="1"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"1")}>空腹</p>
                    <p className={glucoseStatus==="2"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"2")}>餐后1小时</p>
                    <p className={glucoseStatus==="3"?'glucoseBtn flex-cell':'glucoseBtn flex-cell off'} onTouchEnd={this.resetGlucoseStatus.bind(this,"3")}>餐后2小时</p>
                </div>
            </section>
            <section className='flex chart-container' id='chart' ref="chart"></section>
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
            if(type == 'temp'){
                ajaxData.deviceId = _this.state.deviceId?_this.state.deviceId:'';
            }
            Actions.updateEchart(1,type,ajaxData);
        },500);
    }
    componentWillUpdate(nextProps,nextState){
        let _this = this,
            text = this.props.text,
            color = this.props.color;
        let chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点

        let yAxis = [], series = [];
        //console.log(this.props);
        //alert(nextState);
        for (var i in text){
            let yAxisObj = {
                type : 'value',
                axisLine:{
                    lineStyle:{color:'#E1E1E1'}
                }
            },
            seriesObj = {
                name:text[i],
                type:'line',
                symbol:nextState.xValue.length > 1 ? 'none' : 'circle',
                yAxisIndex:_this.props.oneYAxis?0:i,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: color[i]
                        }, {
                            offset: 1,
                            color: 'white'
                        }])
                    }
                },  
                data:nextState.yValue[i]?(nextState.yValue[i].indexOf(',')>0?nextState.yValue[i].split(','):new Array(nextState.yValue[i])):''
            };
            yAxisObj.name = text[i];
            yAxis.push(yAxisObj);
            series.push(seriesObj);
        }
        if(this.props.oneYAxis){
            yAxis=[{ type : 'value'}];
         
        }
        if(this.props.type === 'temp'){
            yAxis=[{ type: 'value',splitNumber:1, interval:1, min:35, max:42}];
         
        }
        if(series.length < 2){
            text='';
        }
        // 基于准备好的dom，初始化echarts实例
           let myChart = echarts.init(chartDom),
            options = {
                legend: {
                    right:'4%',
                    bottom:'1%',
                    data:text
                },
                color:color,
                grid: {
                    left: '3%',
                    right: '2%',
                    bottom: '9%',
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
                    data:nextState.xValue,
                    axisLine:{lineStyle:{color:'#E1E1E1'}}
                },
                yAxis : yAxis,
                series:series
            };
        // 绘制图表
        console.log(options);
        myChart.setOption(options);
        
    }    
};
