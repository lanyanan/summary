import Highcharts from 'highcharts';
//var heartRateData=[40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
var SleepCharts = React.createClass({
	componentDidMount: function() {
        if(this.isMounted()){
           var _this=this;
           //计时器
           var time=0;
           function addT(){
              time++;
              _this.setState({time: time});
              _this.addTime = setTimeout(addT,1000)
           }
           addT();

           var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
           var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
           var initBreathRateList = [15,15,15,15,15,15,15,15,15];//[15,15,15,15,15,15,15,15,15]
           var splineBreathRateList = [10,15,10,15,10,15,10,15,10];//[10,15,10,15,10,15,10,15,10]
           var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
           var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
           this.chart1 = this.createChart('heartRateLive-chart' + this.props.idsuffix, initHeartRateList, {
               tickInterval:5
           }, {
               title:null,
               gridLineWidth:null, // 网格线的宽度
               tickInterval:50
           });
           this.chart2 = this.createChart('breathRateLive-chart' + this.props.idsuffix, initBreathRateList, {
               labels: {
                   enabled: false
               }
           }, {
               title:null,
               gridLineWidth:null, // 网格线的宽度
               labels: {
                   enabled: false
               }
           });
           this.chart3 = this.createChart('turnOverLive-chart' + this.props.idsuffix, initTurnOverList, {
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
           this.timer = setInterval(function(){
               _this.loadContentsFromServer();
               // // 重绘心率曲线
               // _this.redrawChart(_this.chart1, 60, commonData.heartRate , splineHeartRateList, initHeartRateList);
               // // 重绘呼吸曲线
               // _this.redrawChart(_this.chart2, 15, commonData.breathRate , splineBreathRateList, initBreathRateList);
               // // 重绘体动曲线 
               // _this.redrawChart3(_this.chart3, 100, commonData.turnOverTimes, splineTurnOverList, initTurnOverList);
               // // console.log(commonData);
           }, 5000);

           // 动画处理
           var moveBar1 = ReactDOM.findDOMNode(this.refs.move1);
           var moveBar2 = ReactDOM.findDOMNode(this.refs.move2);
           var moveBar3 = ReactDOM.findDOMNode(this.refs.move3);
           var left = -200;
           function animate(){
               if (left > 200) left=-50;
               var percent = (left / 2) +'%';
               moveBar1.style.left = percent;
               moveBar2.style.left = percent;
               moveBar3.style.left = percent;
               left ++;
           };
           this.chartMove = setInterval(animate, 30); 
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
                height:90,
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
            series: [
            {
                type: 'spline',
                states: {
                    hover: {
                        enabled: false
                    }
                },
                marker: {
                    enabled: false
                },
                data: data,
                lineWidth: 2,
                zones: [{
                    color: '#fff', //设置折线的颜色
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
        if (isNaN(data) || data==0) {
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
            var _this=this,
            sleepAjaxData={};
            var timestamp = new Date().getTime();
            $.ajax({
              url: _this.props.url+'&timestamp='+timestamp,
              //url: '../static/js/data2.json',
              dataType: 'json',
              cache:true,
              async:true,
              success:function(r){
                //alert(JSON.stringify(r));
                if(r.code==0&&r.data.dataTime!==null){

                    var _dataT = _this.state.dataTime;
                    var dataT = new Date(r.data.dataTime.replace(/\-/g,"/")).getTime()+8*3600*1000;
                    var now = (new Date()).getTime();
                    var timeDif = dataT - now;
                    if(dataT!= _dataT&&timeDif<120*1000&&timeDif>0){
                        sleepAjaxData={
                            heartRate:r.data.heartRate,
                            breathRate:r.data.breathRate,
                            turnOverTimes:_this.state.turnOverTimes+r.data.turnOverTimes, 
                            sleepStatus: r.data.sleepStatus,
                            dataTime: dataT                    
                        };
                        _this.setState({
                            heartRate:r.data.heartRate,
                            breathRate:r.data.breathRate,
                            turnOverTimes:_this.state.turnOverTimes+r.data.turnOverTimes,
                            sleepStatus: r.data.sleepStatus,
                            dataTime: dataT
                        });
                        var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
                        var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
                        var initBreathRateList = [15,15,15,15,15,15,15,15,15];//[15,15,15,15,15,15,15,15,15]
                        var splineBreathRateList = [10,15,10,15,10,15,10,15,10];//[10,15,10,15,10,15,10,15,10]
                        var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
                        // 重绘心率曲线
                        _this.redrawChart(_this.chart1, 60, sleepAjaxData.heartRate , splineHeartRateList, initHeartRateList);
                        // 重绘呼吸曲线
                        _this.redrawChart(_this.chart2, 15, sleepAjaxData.breathRate , splineBreathRateList, initBreathRateList);
                        // 重绘体动曲线 
                        _this.redrawChart3(_this.chart3, 100, sleepAjaxData.turnOverTimes, splineTurnOverList, initTurnOverList);
                        // console.log(sleepAjaxData);
                        //alert(JSON.stringify(sleepAjaxData));
                    }else{

                        sleepAjaxData={
                            heartRate:0,
                            breathRate:0,
                            turnOverTimes:0, 
                            sleepStatus: 7,                 
                        };
                        _this.setState({
                            heartRate:0,
                            breathRate:0,
                            turnOverTimes:0,
                            sleepStatus: 7,
                        });
                        var initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
                        var splineHeartRateList = [40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
                        var initBreathRateList = [15,15,15,15,15,15,15,15,15];//[15,15,15,15,15,15,15,15,15]
                        var splineBreathRateList = [10,15,10,15,10,15,10,15,10];//[10,15,10,15,10,15,10,15,10]
                        var initTurnOverList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        var splineTurnOverList = [0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0,0,0,0,100,100,100,100,100,0,0,0,0,0];
                        // 重绘心率曲线
                        _this.redrawChart(_this.chart1, 60, sleepAjaxData.heartRate , splineHeartRateList, initHeartRateList);
                        // 重绘呼吸曲线
                        _this.redrawChart(_this.chart2, 15, sleepAjaxData.breathRate , splineBreathRateList, initBreathRateList);
                        // 重绘体动曲线 
                        _this.redrawChart3(_this.chart3, 100, sleepAjaxData.turnOverTimes, splineTurnOverList, initTurnOverList);
                        //alert(JSON.stringify(sleepAjaxData));
                        // console.log(sleepAjaxData);
                    }
                    
                }
              },
            });
            //return sleepAjaxData;
    },
    getInitialState: function(){
        return {
            time: 0,
            heartRate:0,
            breathRate:0,
            turnOverTimes:0,
            dataTime: null
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
        var time = this.formatSecond(this.state.time);
        var sleepStatus = this.state.sleepStatus;
        var arr = ['上床','入睡','浅睡','深睡','觉醒','懒床','起床','再次上床','中途起床'];
        var hidden = {};
        if(sleepStatus==7||sleepStatus==9){

        }else{
            hidden = {display:'none'}
        }
        return (
            <div>
                <div className="sleepLiveWrap">
                    <div className="sleepLiveChartWrap">
                        <div className="sleepLiveInfo">
                            <h3>心率</h3>
                            <div className="sleepLiveNumber">
                                <span>{this.state.heartRate}</span>
                                <span> 次/分</span>
                            </div>
                        </div>
                        <div className="sleepLiveChart">
                            <div ref="move1" className="moveBlockBreath"></div>
                            <div id={"heartRateLive-chart" + this.props.idsuffix}></div>
                        </div>
                    </div>
                </div>

                <div className="sleepLiveWrap">
                    <div className="sleepLiveChartWrap">
                        <div className="sleepLiveInfo">
                            <h3>呼吸率</h3>
                            <div className="sleepLiveNumber">
                                <span>{this.state.breathRate}</span>
                                <span> 次/分</span>
                            </div>
                        </div>
                        <div className="sleepLiveChart">
                            <div id={"breathRateLive-chart" + this.props.idsuffix}></div>
                            <div ref="move2" className="moveBlockBreath"></div>
                        </div>
                    </div>
                </div>

                <div className="sleepLiveWrap">
                    <div className="sleepLiveChartWrap">
                        <div className="sleepLiveInfo">
                            <h3>体动</h3>
                            <div className="sleepLiveNumber">
                                <span>{this.state.turnOverTimes}</span>
                                <span> 次</span>
                            </div>
                        </div>
                        <div className="sleepLiveChart">
                            <div id={"turnOverLive-chart" + this.props.idsuffix}></div>
                            <div ref="move3" className="moveBlockBreath"></div>
                        </div>
                    </div>
                </div>

                <div className='m-monitor'>
                    <div className='container'>
                        <div className='m-monitor-bd'>
                            <div className='showtime flex'>
                               <em>监测时长</em><span id="timer">{time}</span>
                            </div>
                            <div className='sleepstate flex'>
                               <em>睡眠状态</em><span>{arr[sleepStatus-1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className='stateinfo flex' style={hidden}>
                        你已离床
                    </div>
                </div>
            </div>
        );
    }
});
export default SleepCharts;