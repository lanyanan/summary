'use strict';
/**
 *智慧盒子图表
 *
 */

import {Actions} from './Actions.es6';
het.ready((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});


het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.getOnlineData(data);
});

export const NationalEchartsData = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){
        return (
          <section className="nationGan">
            <div className="echarts"  ref="chart" id="mainChart"  > </div>
            <div className="sleepTip"><p>睡眠环境对比图</p></div>
          </section>
          
        );
    },


    componentDidMount:function(nextProps,nextState){
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('mainChart'));
      // console.log("nextProps++++++++++",nextProps);
      // console.log("nextState++++++++++",nextState);

      

       // 指定图表的配置项和数据
     var option = {

      color:['#fcad3d'],

          title: {
              text: '',
              link:"http://www.baidu.com"
          },
          tooltip: {
              trigger: 'axis'
          },
         
              
          grid: {
              left: '-7%',
              bottom: '3%',
              containLabel: true,
              backgroundColor:'#dedede',
              borderColor:'#458B00',
              borderWidth:22
          },

          xAxis: {
              type: 'category',

              data: ['08/15','08/16','08/17','08/18','08/19','08/20','08/21']

          },
          yAxis: {

             type: 'category',
             // boundaryGap: true,
             // axisLine:{   //y轴竖线
             //   show:false
             // },
            axisTick:{    // y轴一横一横的
                    show:true
                  },
              data:["a","b","c","d","e","f"]
          },
          series: [
             
              {
                  name:'销量',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, 1290, 1330, 1320]
              }
          ],



      };
              // 没有取到值得时候，会显示图表数据正在努力加载 
          // myChart.showLoading({
          //   text: "图表数据正在努力加载..."
          // });


       // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    }


  
});

