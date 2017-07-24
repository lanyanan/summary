'use strict';
/**
 * TDS图表
 */
import {EcharsLine} from './EcharsLine.jsx'
export const EcharTds = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    compareDate :function (checkStartDate, checkEndDate) {
        let arys1= [];
        let arys2= [];
        if(checkStartDate != null && checkEndDate != null) {
            arys1=checkStartDate.split('-');
            var sdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
            arys2=checkEndDate.split('-');
            var edate=new Date(arys2[0],parseInt(arys2[1]-1),arys2[2]);
            if(sdate > edate) {
                return true;
            }  else {
                return false;
            }
        }
    },
    componentDidMount(){
            let compareDate = this.compareDate;
            let TdsList = this.props.TdsList;
            let STds;
            let PTds;
            for (let index in TdsList){
                for (let i in TdsList[index]){
                    if(i == 'SourceWaterTds'){
                        STds = TdsList[index];
                    }else if(i == 'PureWaterTds'){
                        PTds = TdsList[index];
                    }
                }
            }
            let SourceWaterTds = STds != undefined  ? STds:'';
            let PureWaterTds = PTds != undefined ? PTds:'';

            let xAxisList = [];
            let SourcedataList = [];
            let PureWaterdataList = [];
            if(SourceWaterTds != ''){
                for (let index in SourceWaterTds){
                    for(let i in SourceWaterTds[index]){
                        SourcedataList.push({date:i,value:SourceWaterTds[index][i]});
                        SourcedataList.sort(function(a,b){
                            return compareDate(a.date,b.date)});
                    }
                }
            }
            SourcedataList.forEach((item)=>{
                let arys1 = item.date.split('-');
                xAxisList.push(arys1[1] + "-" + arys1[2]);
            });
            if(PureWaterTds != ''){
                for (let index in PureWaterTds){
                    for(let i in PureWaterTds[index]){
                        PureWaterdataList.push({date:i,value:PureWaterTds[index][i]});
                        PureWaterdataList.sort(function(a,b){
                            return compareDate(a.date,b.date)});
                    }

                }
            }
            let dataList = [];
            dataList.push(new EcharsLine('源水','line','circle',4,SourcedataList,'#B8CFE1'));
            dataList.push(new EcharsLine('纯水','line','circle',4,PureWaterdataList,'#2ACCFA'));
            let chart = ReactDOM.findDOMNode(this.refs.chart);
            let myChart = echarts.init(chart);
            let option = {
                title : {
                    text: '水质TDS值',
                    subtext: '(mg/L)',
                    padding: 20,
                    textStyle:{
                        fontSize:12,
                        fontWeight:'normal',
                        color:'#848484'
                    },
                    subtextStyle:{
                        fontSize:12,
                        fontWeight:'normal',
                        color:'#848484'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    showDelay:30,
                    axisPointer:{
                        type: 'none',
                    }
                },
                legend: {
                    data:['源水','纯水'],
                    x:'right',
                    padding: 20,
                    textStyle:{
                        color:'#848484'
                    }
                },
                grid:{
                    y:80
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{
                            interval: 0
                        },
                        boundaryGap : false,
                        axisLine :{
                            show : true,
                            lineStyle:{
                                type: 'dotted',
                                color: '#848484',
                            }
                        },
                        axisTick:{
                            show:false,
                            inside:true
                        }
                        ,
                        data : xAxisList
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        show : false,
                    }
                ],
                series : dataList
            };

        myChart.setOption(option);

    },
    render:function() {

        return  (
            <section className="StastiBody">
                <div id="Tdschart" className="chart" ref="chart">

                </div>
            </section>);
    }
});