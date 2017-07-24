'use strict';
/**
 *智慧盒子图表
 *
 */

import {Actions} from './Actions.es6';

het.ready((data)=>{
    // var appData = Funs._extends({}, appData, data);
    // Actions.repaint(data);
});


het.repaint((data)=>{

    
});

export const NationalEchartsData = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){

        return (
            <section className="nationGan">
            <div className="echarts-nationl"  ref="chart" id="mainChart"  > </div>
                <p className="sleepTip">
                  睡眠环境对比图
                  <span className="sleepTip-span">
                      <span className="myColor"><b></b>  我的</span>
                      <span className="allColor"><b></b> 全国</span>
                  </span>
                </p>         
          </section>
        );
    },


// shouldComponentUpdate( nextProps,  nextState){
//       console.log("shouldComponentUpdate",nextProps);
//       return true
// },


    componentWillUpdate:function(nextProps,nextState){

    let  bedTimeNation= nextProps.bedTimeNation?nextProps.bedTimeNation:[];
    let  bedLevelPersonal= nextProps.bedLevelPersonal?nextProps.bedLevelPersonal:[];
    let  nationLevel= nextProps.nationLevel?nextProps.nationLevel:[]; 

    // console.log("--",nextProps);
    if(nextProps.renderIf2 == 3) return false


    // console.log('----------------',bedTimeNation,bedLevelPersonal, nationLevel);
       // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('mainChart'));  
       // 指定图表的配置项和数据
     var option = {

      color:['#fcad3d'],

          title: {
              text: '',
              link:"http://www.baidu.com"
          },
          tooltip: {
              trigger: 'axis',
              show:false
          },
   
              
          grid: {
              left: '1%',
              right: '4%',
              bottom: '6%',

              containLabel: true,
              backgroundColor:'#dedede',
              borderColor:'#458B00',
              borderWidth:22,

          },

          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: bedTimeNation
          },
          yAxis: {
              // type: 'category',
               boundaryGap: false,
              // data: [0,1,2,3,3],
               axisLabel:{
               formatter:function(value){
               // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',value);
                if(value == 0){
                    return '糟'
                }
                if(value == 2){
                  return  '差'
                }
                if(value == 4){
                  return  '中'
                }
                if(value == 6){
                  return  '良'
                }
               if(value == 8){
                  return  '优'
                 }
                }
               },
               splitLine:{
                show:false
               }

          },
          series: [

                 {
                  name:'全国睡眠指数',
                  type:'line',
                  stack: '5',
                  data:   nationLevel,
                  itemStyle:{
                    normal:{
                      color:'#ffc007'
                    }
                  }
              },

             
              {
                  name:'个人睡眠指数',
                  type:'line',
                  stack: '8',
                  data:   bedLevelPersonal,
                  itemStyle:{
                    normal:{
                      color:'#afd119'
                    }
                  }
              }

          ],



      };
          // 没有取到值得时候，会显示图表数据正在努力加载 
          // myChart.showLoading({
          //   text: "图表数据正在努力加载..."
          // });
       // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
},


});

