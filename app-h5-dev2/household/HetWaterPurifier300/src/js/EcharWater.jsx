'use strict';
/**
 * 用水图表
 */
import {EcharBar} from './EcharBar.jsx';
export const EcharWater = React.createClass({
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
        let TdsList = this.props.WaterTotal;
        let STotal;
        let PTotal;
        let CTotal;
        for (let index in TdsList){
            for (let i in TdsList[index]){
                if(i == 'SourceWaterTotal'){
                    STotal = TdsList[index];
                }else if(i == 'PureWaterTotal'){
                    PTotal = TdsList[index];
                }else if(i == 'CleanWaterTotal'){
                    CTotal = TdsList[index];
                }
            }
        }
        let SourceWaterTotal = STotal != undefined  ? STotal:'';
        let PureWaterTotal = PTotal != undefined ? PTotal:'';
        let CleanWaterTotal = CTotal != undefined ? CTotal:'';

        let xAxisList = [];
        let SourcedataList = [];
        let PureWaterdataList = [];
        let CleanWaterdataList = [];
        if(SourceWaterTotal != ''){
            for (let index in SourceWaterTotal){
                for(let i in SourceWaterTotal[index]){
                    SourcedataList.push({date:i,value:SourceWaterTotal[index][i]});
                    SourcedataList.sort(function(a,b){
                        return compareDate(a.date,b.date)});
                }
            }
        }
        SourcedataList.forEach((item)=>{
            let arys1 = item.date.split('-');
            xAxisList.push(arys1[1] + "-" + arys1[2]);
        });
        if(PureWaterTotal != ''){
            for (let index in PureWaterTotal){
                for (let i in PureWaterTotal[index]){
                    PureWaterdataList.push({date:i,value:PureWaterTotal[index][i]});
                    PureWaterdataList.sort(function(a,b){
                        return compareDate(a.date,b.date)});
                }
            }
        }
        if(CleanWaterTotal != ''){
            for (let index in CleanWaterTotal){
                for (let i in CleanWaterTotal[index]){
                    CleanWaterdataList.push({date:i,value:CleanWaterTotal[index][i]});
                    CleanWaterdataList.sort(function(a,b){
                        return compareDate(a.date,b.date)});
                }
            }
        }
        let dataList = [];
        let tempList = [];
        SourcedataList.forEach((item)=>{
            tempList.push(item.value);
        });
        let Sourcemax =  Math.max.apply(null,tempList);

        tempList = [];
        CleanWaterdataList.forEach((item)=>{
            tempList.push(item.value);
        });
        let CleanWatermax =  Math.max.apply(null,tempList);
        tempList = [];
        PureWaterdataList.forEach((item)=>{
            tempList.push(item.value);
        });
        let PureWatermax =  Math.max.apply(null,tempList);
        let maxs = Math.max.apply(null,[Sourcemax,CleanWatermax,PureWatermax]);
        let id = maxs == 0? 0 :maxs == Sourcemax?1:maxs == CleanWatermax?2:maxs == PureWatermax?3:1;


        dataList.push(new EcharBar('源水','bar','circle',4,SourcedataList,'#B8CFE1',8,id == 1?true : false));
        dataList.push(new EcharBar('净水','bar','circle',4,CleanWaterdataList,'#8696E4',8,id == 2?true : false));
        dataList.push(new EcharBar('纯水','bar','circle',4,PureWaterdataList,'#2ACCFA',8,id == 3?true : false));


        let chart = ReactDOM.findDOMNode(this.refs.chart);
        let myChart = echarts.init(chart);
        let option = {
            title : {
                text: '总量(L)',
                padding: 20,
                textStyle:{
                    fontSize:12,
                    fontWeight:'normal',
                    color:'#848484'
                },
            },
            tooltip : {
                trigger: 'axis',
                showDelay:30,
                axisPointer:{
                    type: 'none',
                }
            },
            legend: {
                data:['源水','净水','纯水'],
                x:'right',
                padding: 20,
                textStyle:{
                    color:'#848484'
                }
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
                    },
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
                <div id="Waterchart" className="charts" ref="chart">
                </div>
            </section>);
    }
});