'use strict';
/**
 *智慧盒子图表
 *
 */

import {Actions} from './Actions.es6';

het.ready((data)=>{

});


het.repaint((data)=>{

});

export const EchartsData = React.createClass({
    getInitialState: function(){
        return {};
    },


      // componentWillReceiveProps(nextProps){
      //      // Actions.getOnlineData();
      //      console.log("componentWillReceiveProps",nextProps);

      //     //   setInterval(function(){
      //     //   Actions.getOnlineData()
      //     // },3000);
      // },


    render :function(){
      var ad = this.props.echatLevelWords?this.props.echatLevelWords:[" "," "," "," "," "," "," "];
        return (
          <div className="echarts-out">
              <ul className="echat" >
                  {
                    ad.map(function(kk,index)
                    {
                      return (<li className="echat-li" key={index} data-index={index}  >{kk} </li>)
                    }.bind(this))
                 }

              </ul>
              <div  id="main"  ></div>
          </div>

        );
    },

//     componentDidMount(){

//          //获取卧室数据
//          Actions.getbedroom();
//          // console.log("this.componentDidMount",th);

//       console.log("this.componentDidMount",this.props.echatTime);

//       let time  = this.state.echatTime?this.state.echatTime:[];
//       let level = this.state.echatLevel?this.state.echatLevel:[];

// console.log("this.time",time,level);
//         // 基于准备好的dom，初始化echarts实例
//       var myChart = echarts.init(document.getElementById('main'));

//        // 指定图表的配置项和数据
 
//      var   option = {

//     color:['#fcad3d'],
//     tooltip: {
//         trigger: 'axis',
//         show:false
//     },
//     grid: {
//         left: '1%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },

//     xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         data: time,

//     },
//     yAxis: {
//         type: 'value',
//         axisTick:{    // y轴一横一横的
//                  show:false
//                 },
//         axisLabel:{
//           show:false
//         }
//     },
//     series: [
//         {
//             name:'邮件营销',
//             type:'line',
//             stack: '总量',
//             data:level
//         }
//     ]
// };
//            myChart.setOption(option);
//            
    
//     shouldComponentUpdate( nextProps,  nextState){
//       console.log("shouldComponentUpdate",nextProps);
//       // let a;
    
      
//        return false
      
// },

    componentWillUpdate:function(nextProps,nextState){
      console.log(nextProps);
      // console.log(nextProps.rendenrIf,nextProps.rendenrIf2);
      // console.log("----",nextProps.echatTime);
      // console.log("----",this.props.echatTime);
      if(nextProps.renderIf==2) return false;
      if(nextProps.renderIf2 == 3) return false;


      let  aa = this.props.echatTime;
      let  echatTime= nextProps.echatTime?nextProps.echatTime:["09-26"];
      let  echatLevel= nextProps.echatLevel?nextProps.echatLevel:["09-26"];
        // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));


      // console.log("---next",nextProps.echatTime);
      // console.log("this.props.",this.props.echatTime);

      

        

       // 指定图表的配置项和数据
 
     var   option = {

    color:['#fcad3d'],
    tooltip: {
        trigger: 'axis',
        show:false
    },
    grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: echatTime,

    },
    yAxis: {
        type: 'value',
        axisTick:{    // y轴一横一横的
                 show:false
                },
        axisLabel:{
          show:false
        }
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:echatLevel
        }
    ]
};


      
          // 没有取到值得时候，会显示图表数据正在努力加载 
          // myChart.showLoading({
          //   text: "图表数据正在努力加载..."
          // });

       // 使用刚指定的配置项和数据显示图表。
       
       // var timeLength = echatTime.length ;
       // console.log(timeLength,nextProps.echatTime.length);
       // if(nextProps.echatTime.length != timeLength){
       //  console.log("a")
           myChart.setOption(option);
        // }
     

    }

  
});

