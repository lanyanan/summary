'use strict';
/**
 *全国智慧盒子图表
 *
 */

import {Actions} from './Actions.es6';



export const Route = React.createClass({
    getInitialState: function(){
        return {};
    },
    render :function(){


          var ad = this.props.echatDLlist?this.props.echatDLlist:[" "," "," "];
           var aa = ["a","b","c"];
          console.log('oooooooooooooooooooo',ad);

      // var a = this.props.ectData;
             // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);
      // var b = a.code;

       // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',b);

        return (
          <div>
             <ul className="echat" >
             
                  {
                    ad.map(function(kk)
                    {
                      return (<li className="echat-li">{kk} </li>)
                         

                    }.bind(this))
                 }

              </ul>
              <div className="echarts"  ref="chart" id="refs"  > </div>
              


          </div>
                 
            

           
                      
           
            
        );
    },

  
    componentWillUpdate:function(nextProps,nextState){
    console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',nextProps);
    let dpush = nextProps.echatDDlist;
    let lpush = nextProps.echatDLlist;
    let kk = [];
    console.log("dddddddd",dpush);
    console.log("LLLLLLLL",lpush);
      // for(var k=0;k<lpush.length;k++){
      //   if(lpush[k] == '优' ){
      //      lpush[k] = 1000;
      //       console.log('gggggggggggggggggggggggggg',lpush);
      //   }
      // }

           // let a = (this.props.ectData?this.props.ectData:' ');
           // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a);

        // 基于准备好的dom，初始化echarts实例
          
           var  chartDom =ReactDOM.findDOMNode(this.refs.chart); // dom节点
// var myChart = echarts.init(document.getElementById('main'));
           var myChart = echarts.init(chartDom);
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
          // legend:{
          //  data:['销量'],  
          // },
              
          grid: {
              left: '0%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              backgroundColor:'#dedede',
              borderColor:'#458B00',
              borderWidth:22
          },

          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: dpush
          },
          yAxis: {
                  type: '',
          },
          series: [
             
              {
                  name:'销量',
                  type:'line',
                  stack: '总量',
                  data:[820, 932, 901, 934, ,,]
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

