import Highcharts from 'highcharts';
//var heartRateData=[40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
import Path from './ApiPath.es6';
var SleepCharts = React.createClass({
	  componentDidMount: function(){
        if(this.isMounted()){
           var _this=this;
           //计时器
           // var time = 0;
           // function addT(){
           //    clearTimeout(_this.addTime);
           //    time++;
           //    _this.setState({time: time});
           //    _this.addTime = setTimeout(addT,1000)
           // }
           // addT();
           let oTime = new Date();
           clearInterval(this.addTime);
           this.addTime = setInterval(function(){
              let now = new Date();
              let time = now.getTime() - oTime.getTime();
              _this.setState({time:time/1000});
           },1000)
           

           var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
           var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
           var initBreathRateList = [5,5,5,5,5,5,5,5,5];//[15,15,15,15,15,15,15,15,15]
           var splineBreathRateList = [5,30,5,30,5,30,5,30,5];//[10,15,10,15,10,15,10,15,10]
           var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
           var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
           this.chart1 = this.createChart('heartRateLive-chart' + this.props.idsuffix, initHeartRateList, {
               title: null,
               tickInterval:5,
               labels: {
                   enabled: false
               }
           }, {
               title: null,
               gridLineWidth:null, // 网格线的宽度
               tickInterval:20,
               tickAmount:2,
               labels: {
                   enabled: false
               }
           });
           this.chart2 = this.createChart('breathRateLive-chart' + this.props.idsuffix, initBreathRateList, {
               title: null,
               labels: {
                   enabled: false
               }
           }, {
               title:null,
               tickInterval:8,
               tickAmount:2,
               gridLineWidth:null, // 网格线的宽度
               labels: {
                   enabled: false
               }
           });
           this.chart3 = this.createChart('turnOverLive-chart' + this.props.idsuffix, initTurnOverList, {
               title: null,
               labels: {
                   enabled: false
               }
           }, {
               title:null,
               gridLineWidth: null, // 网格线的宽度
               tickInterval:5,
               tickAmount:5,
               labels: {
                   enabled: false
               }
           });
           clearInterval(this.timer);
           this.timer = setInterval(function(){
               _this.loadContentsFromServer();
               // var commonData=_this.loadContentsFromServer();
               // // 重绘心率曲线
               // _this.redrawChart(_this.chart1, 60, commonData.heartRate , splineHeartRateList, initHeartRateList);
               // // 重绘呼吸曲线
               // _this.redrawChart(_this.chart2, 30, commonData.breathRate , splineBreathRateList, initBreathRateList);
               // // 重绘体动曲线 
               // _this.redrawChart3(_this.chart3, 100, commonData._turnOverTimes, splineTurnOverList, initTurnOverList);
               // // console.log(commonData);
           }, 5000);

           

           // 动画处理
           var moveBar1 = ReactDOM.findDOMNode(this.refs.move1);
           var moveBar2 = ReactDOM.findDOMNode(this.refs.move2);
           var moveBar3 = ReactDOM.findDOMNode(this.refs.move3);
           var left = -1;
           function animate(){
               if (left > 100) {
                    left= -1;
                }
               var percent = left +'%';
               moveBar1.style.left = percent;
               moveBar2.style.left = percent;
               moveBar3.style.left = percent;
               left ++;
           };
           this.chartMove = setInterval(animate, 35); 
        }
        
    },
    componentWillUnmount: function(){
        clearInterval(this.timer);
        clearInterval(this.chartMove);
        clearTimeout(this.addTime);
    },
    createChart: function(id, data, xAxis, yAxis) {
        return Highcharts.chart(id, {
            chart: {
                backgroundColor: '',
                height: 82,
                margin:0,
                padding:0,
            },
            tooltip:{
                enabled:false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: ' '
            },
            xAxis: xAxis,
            yAxis: yAxis,
            legend:{
                enabled:false
            },
            plotOptions:{
                spline: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                }
            },
            series: [
            {
                type: 'spline',
                marker: {
                    enabled: false
                },
                data: data,
                lineWidth: 2,
                zones: [{
                    color: '#FFF', //设置折线的颜色
                }],
                enabled: true,
                animation: {
                    duration: 5000
                }
            }],
            credits: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            }
        });
    },
    redrawChart: function(chart, sign, data, splineList, initList){
        if (data==0) {
            for (var i in initList) {
                chart.series[0].addPoint(initList[i], true, true);
            }
        } else {
            for (var j = 0; j < splineList.length; j++) {
                if(splineList[j]==sign){
                    chart.series[0].addPoint(data, true, true);
                } else {
                    chart.series[0].addPoint(splineList[j], true, true);
                }
            }
        }
    },
    // 重绘体动曲线
    redrawChart3: function(chart, sign, data, splineList, initList){
        var drawCount = (parseInt(data) || 0) * 5; // 绘制次数
        if (isNaN(data) || data==0) {
            for (var i in initList) {
                chart.series[0].addPoint(initList[i], true, true);
            }
        } else {
            for (var j = 0; j < splineList.length; j++) {
                if(splineList[j]==sign && drawCount>0){
                    chart.series[0].addPoint(splineList[j], true, true);
                    drawCount --;
                } else {
                    chart.series[0].addPoint(0, true, true);
                }
            }
        }
    },
    loadContentsFromServer:function(){
            var _this=this;
            let sleepAjaxData={};
            let timestamp = new Date().getTime();
            //获取睡眠状态
            var url = Path.wPath + '/wechat/hotel/mattress/getMattressRawLastData?deviceId='+ this.props.deviceId;
            $.ajax({
              url: url,
              dataType: 'json',
              cache:true,
              async:true,
              success:function(s){
                  if(s.code==0){
                      // _this.setState({
                      //   sleepStatus: r.data.status
                      // });
                      let sleepStatus = s.data.status;
                      $.ajax({
                        url: _this.props.url+'&timestamp='+timestamp,
                        //url: '../static/js/data2.json',
                        dataType: 'json',
                        cache:true,
                        async:true,
                        success:function(r){
                          //alert(JSON.stringify(r));
                          if(r.code==0&&r.data.dataTime){
                              var dataT = new Date(r.data.dataTime.replace(/\-/g,"/")).getTime()+8*3600*1000;
                              var now = (new Date()).getTime();
                              var timeDif = dataT - now;
                              //console.log(timeDif)
                              if(timeDif>-2*60*1000&&timeDif<2*60*1000){
                              // if(dataT){
                                  var _dataT = _this.state.dataTime;
                                  let turnOverTimes; 
                                  if(dataT==_dataT){
                                      console.log('时刻点相同')
                                      turnOverTimes = _this.state.turnOverTimes;
                                  }else{
                                      turnOverTimes = _this.state.turnOverTimes+r.data.turnOverTimes;
                                  }
                                  // console.log(turnOverTimes)
                                  sleepAjaxData={
                                      heartRate:r.data.heartRate,
                                      breathRate:r.data.breathRate,
                                      _turnOverTimes: r.data.turnOverTimes,
                                      turnOverTimes: turnOverTimes,
                                      dataTime: dataT             
                                  };
                                  _this.setState({
                                      heartRate:r.data.heartRate,
                                      breathRate:r.data.breathRate,
                                      turnOverTimes:turnOverTimes,
                                      dataTime: dataT,
                                      sleepStatus: sleepStatus
                                  });
                                  var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
                                  var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
                                  var initBreathRateList = [5,5,5,5,5,5,5,5,5];//[15,15,15,15,15,15,15,15,15]
                                  var splineBreathRateList = [5,30,5,30,5,30,5,30,5];//[10,15,10,15,10,15,10,15,10]
                                  var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                                  var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
                                  // clearTimeout(_this.r1);
                                  // clearTimeout(_this.r2);
                                  // clearTimeout(_this.r3);
                                  // 重绘心率曲线
                                  // _this.r1=setTimeout(function(){
                                  //     _this.redrawChart(_this.chart1, 60, sleepAjaxData.heartRate , splineHeartRateList, initHeartRateList);
                                  // },0);
                                  _this.redrawChart(_this.chart1, 60, sleepAjaxData.heartRate , splineHeartRateList, initHeartRateList);
                                  // 重绘呼吸曲线
                                  // _this.r2=setTimeout(function(){
                                  //     _this.redrawChart(_this.chart2, 30, sleepAjaxData.breathRate , splineBreathRateList, initBreathRateList);
                                  // },300);
                                  _this.redrawChart(_this.chart2, 30, sleepAjaxData.breathRate , splineBreathRateList, initBreathRateList);
                                  // 重绘体动曲线 
                                  // _this.r3=setTimeout(function(){
                                  //     _this.redrawChart3(_this.chart3, 100, sleepAjaxData._turnOverTimes, splineTurnOverList, initTurnOverList);
                                  // },600);
                                  _this.redrawChart3(_this.chart3, 100, sleepAjaxData._turnOverTimes, splineTurnOverList, initTurnOverList);
                                  // console.log(sleepAjaxData);
                                  //alert(JSON.stringify(sleepAjaxData));
                              }else{

                                  sleepAjaxData={
                                      heartRate:0,
                                      breathRate:0,   
                                      turnOverTimes: 0,
                                      _turnOverTimes: 0,             
                                  };
                                  _this.setState({
                                      heartRate:0,
                                      breathRate:0,
                                      turnOverTimes: 0,
                                      sleepStatus: 7
                                  });
                                  var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
                                  var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
                                  var initBreathRateList = [5,5,5,5,5,5,5,5,5];//[15,15,15,15,15,15,15,15,15]
                                  var splineBreathRateList = [5,30,5,30,5,30,5,30,5];//[10,15,10,15,10,15,10,15,10]
                                  var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                                  var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
                                  // 重绘心率曲线
                                  _this.redrawChart(_this.chart1, 60, sleepAjaxData.heartRate , splineHeartRateList, initHeartRateList);
                                  // 重绘呼吸曲线
                                  _this.redrawChart(_this.chart2, 30, sleepAjaxData.breathRate , splineBreathRateList, initBreathRateList);
                                  // 重绘体动曲线 
                                  _this.redrawChart3(_this.chart3, 100, sleepAjaxData._turnOverTimes, splineTurnOverList, initTurnOverList);
                                  //alert(JSON.stringify(sleepAjaxData));
                                  // console.log(sleepAjaxData);
                              }
                              
                          }
                        }
                      });
                  }
              }
            });

            
            
            
            //return sleepAjaxData;
    },
    getInitialState: function(){
        return {
            time: 0,
            heartRate:0,
            breathRate:0,
            turnOverTimes:0,
            dataTime: null,
            sleepStatus: ''
        };
    },
    formatSecond: function(a){
        var hh = parseInt(a/3600);  
          if(hh<10){hh = "0" + hh;}   
          var mm = parseInt((a-hh*3600)/60);  
          if(mm<10) mm = "0" + mm;  
          var ss = parseInt((a-hh*3600)%60);  
          if(ss<10) ss = "0" + ss;  
          var result = hh + ":" + mm + ":" + ss;  
          if(a>=0){  
            return result;  
          }else{  
            return " ";  
          }  
    },
    render: function() {
        // let now = new Date();
        // let xTime = now.getTime() - this.state.time;
        var time = this.formatSecond(this.state.time);
        var sleepStatus = this.state.sleepStatus;
        var hidden = {display: 'none'};
        let status = '';
        if(sleepStatus&&sleepStatus!==7&&sleepStatus!==9&&sleepStatus!==11&&sleepStatus!==''){
            status = '在床';
        }else if(sleepStatus==''){
            status = '';
        }else{
            status = '离床';
        }
        if(status=='离床'){
            hidden = {}
        }
        return (
            <div>
                <div className="sleepLiveWrap">
                    <div className="sleepLiveChartWrap flex">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>心率</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.heartRate}</span>
                                    <span className="sleepUnit">(次/分)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div ref="move1" className="moveBlock"></div>
                                <div id={"heartRateLive-chart" + this.props.idsuffix} className="chart"></div>
                            </div>
                        </div>
                    </div>

                    <div className="sleepLiveChartWrap flex s-top">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>呼吸率</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.breathRate}</span>
                                    <span className="sleepUnit">(次/分)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div id={"breathRateLive-chart" + this.props.idsuffix} className="chart"></div>
                                <div ref="move2" className="moveBlock"></div>
                            </div>
                        </div>
                    </div>

                    <div className="sleepLiveChartWrap flex  s-top">
                        <div className="sleepLiveChartWrap-contain flex">
                            <div className="sleepLiveInfo">
                                <h3>体动</h3>
                                <div className="sleepLiveNumber flex">
                                    <span className="sleepRate">{this.state.turnOverTimes}</span>
                                    <span className="sleepUnit">(次)</span>
                                </div>
                            </div>
                            <div className="sleepLiveChart flex">
                                <div id={"turnOverLive-chart" + this.props.idsuffix} className="chart"></div>
                                <div ref="move3" className="moveBlock moveBlock3"></div>
                            </div>
                        </div>
                    </div>

                    <div className='stateinfo flex' style={hidden}>
                        你已离床
                    </div>
                </div>
                

                <div className='m-monitor flex'>
                    <div className='showtime'>
                       <h4>监测时长</h4>
                       <p id="timer">{time}</p>
                    </div>
                    <div className='sleepstate'>
                       <h4>睡眠状态</h4>
                       <p>{status}</p>
                    </div>
                </div>
            </div>
        );
    }
});
export default SleepCharts;