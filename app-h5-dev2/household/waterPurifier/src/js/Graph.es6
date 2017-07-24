/**
 * 用户统计页面
 * @prop {} 
 * @prop {}
 */
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import {Router, Route, Link } from 'react-router'
export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekRenderChart:false,
            monthRenderChart:false,
            montRenderChart:false,
            yearRenderChart:false
        };
        Store.listen((data)=>{
            if(!this.isMounted(this)) return;
            this.setState(data)
        }); // 监听Store
    }
    componentDidMount(){
        Actions.refresh();
        Actions.change('week');
        Actions.getWeekLogData();
    }
    componentWillReceiveProps(next){
        if(next.chartData.xAxis.data.length>0){
            if(!this.state.weekRenderChart){
                var myChart = echarts.init(document.getElementById('week'));
                myChart.setOption(next.chartData);
                this.setState({
                    weekRenderChart:true
                });
            }
        }
    }

    renderChart(type){
       var _this=this;
       setTimeout(function(){
            var myChart = echarts.init(document.getElementById(type));
            myChart.setOption(_this.state.chartData);
       },500);
    }

    tabBar(e){
        var type= e.target.getAttribute("data-type");
        Actions.change(type);
        switch(type){
            case "week":
               Actions.getWeekLogData();
               if(!this.state.weekRenderChart){
                    this.renderChart(type,this.state.weekRenderChart);
               }
               this.state.weekRenderChart=true;
               break;
            case "month":
               Actions.getMonthLogData();
               if(!this.state.monthRenderChart){
                    this.renderChart(type,this.state.monthRenderChart);
               }
               this.state.monthRenderChart=true;
               break;
            case "year":
               Actions.getYearLogData();
               if(!this.state.yearRenderChart){
                    this.renderChart(type,this.state.yearRenderChart);
               }
               this.state.yearRenderChart=true;
               break;
            case "mont":
               Actions.getMoreMonthLogData();
               if(!this.state.montRenderChart){
                    this.renderChart(type,this.state.montRenderChart);
               }
               this.state.montRenderChart=true;
               break;
        }
    }
    isMounted(component){
      try {
        ReactDOM.findDOMNode(component);
        return true;
      } catch (e) {
        return false;
      } 
    }
    setDisplayType(type){
      return {display : type == 1 ? 'block':'none'}
    }
    render(){
        let weekChartstyle =this.setDisplayType(this.state.weekChart),
            monthChartstyle=this.setDisplayType(this.state.monthChart),
            montChartstyle=this.setDisplayType(this.state.montChart),
            yearChartstyle=this.setDisplayType(this.state.yearChart),
            myDate = new Date(),
            year = myDate.getFullYear(), 
            month = myDate.getMonth()+1,
            day = myDate.getDate();
        return <div className="graMain">
            <a className="canLeft" id="canLeft" data-type="year"   onTouchEnd={this.tabBar.bind(this)}></a>
            <a className="canRight" id="canRight" data-type="mont" onTouchEnd={this.tabBar.bind(this)}></a>
            <p>今天：{year}年{month}月{day}日</p>
            <div className="graUl">
                <a className="graRig"id = "rigOne" data-type="week"  onTouchEnd={this.tabBar.bind(this)}>周</a>
                <a className="graRig" id="rigTwo" data-type="month"   onTouchEnd={this.tabBar.bind(this)}>月</a>
                <a data-type="year" id="rigThree" onTouchEnd={this.tabBar.bind(this)}>年</a>
            </div>
            <div id="week" className="chart" style={weekChartstyle}></div>
            <div id="month" className="chart" style={monthChartstyle}></div>
            <div id="year" className="chart" style={yearChartstyle}></div>
            <div id="mont" className="chart" style={montChartstyle}></div>
            <div id="cover" className="cover">
                <div id="loading">
                    <img src="../static/img/loading.gif" />
                    <span>数据加载中...</span>
                </div>
                <div id="warning">
                    <img src="../static/img/warning.png" />
                    <span>网络错误，数据加载失败</span>
                </div>
            </div>
        </div>;
    }
};
