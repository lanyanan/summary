const DrawChart = {};

/*工具函数*/
const tools = {
	label : (index)=>{
         switch(index){
              case 1: 
                  return 3
                  break;
              case 2: 
                  return 2
                  break;
              case 3: 
                  return 1.5
                  break;
              case 4: 
                  return 0.5
                  break;
              case 5: 
                  return 3
                  break;
              case 6: 
                  return 3
                  break;
              case 7: 
                  return 3
                  break;
              case 8: 
                  return 3
                  break;
              case 9: 
                  return 3
                  break; 
              case "-": 
                  return "-"
                  break; 
        }
    },
    pickerColor : (arr)=>{
	    let color = [{
	    	offset: 1,
	    	color: '#30d2ba' // 0% 处的颜色
	    }];
	    for (let i = 0;i<arr.length;i++){
		    if(arr[i]==2 || arr[i]==3){
		        color = [
		        	{
		        		offset: 0,
		       			color: '#30d2ba' // 0% 处的颜色
		            },
		            {
		            	offset: 1,
		            	color: '#6175fc' // 0% 处的颜色
		            }
		        ];
		    }
	    }
	    for (let i = 0;i<arr.length;i++){
	    	if(arr[i]==4){
	      		color = [
	      			{
	      				offset: 0,
	      				color: '#30d2ba' // 0% 处的颜色
	                },
	                {
	                	offset: 0.6,
	                	color: '#6175fc' // 0% 处的颜色
	                },
	                {
	                	offset: 1,
	                	color: '#cf3cfc' // 100% 处的颜色
	                }
	            ];
	    	}
	    };
	    return color;
	},
	toHours : (time)=>{
		let h = (new Date(time)).getHours();
		if(h>12) h=h-12;
		h = h < 10 ? "0" + h : h;
		let m = (new Date(time)).getMinutes();
		m = m < 10 ? "0" + m : m;
		return h+":"+m
	},
	sleepHours : (time)=>{
		let h = parseInt(time / 60);
		let m = parseInt(time % 60 );
		return h+"小时"+m+"分";
	},
	formatDateTime : (date)=>{
	    var y = date.getFullYear();
	    var m = date.getMonth() + 1;
	    m = m < 10 ? ('0' + m) : m;
	    var d = date.getDate();
	    d = d < 10 ? ('0' + d) : d;
	    let index = date.getDay();
		return y + '-' + m + '-' + d+' '+tools.getweek(index);
	},
	getweek : (index)=>{
		switch(index){
		    case 0: 
		        return "星期天"
		        break;
		    case 1: 
		        return "星期一"
		        break;
		    case 2: 
		        return "星期二"
		        break;
		    case 3: 
		        return "星期三"
		        break;
		    case 4: 
		        return "星期四"
		        break;
		    case 5: 
		        return "星期五"
		        break;
		    case 6: 
		        return "星期六"
		        break;  
		}
	},
	toHoursString : (time)=>{
		let h = parseInt(time/3600000);
		h = h < 10 ? "0" + h : h;
		let m = parseInt(time%3600000/60000);
		m = m < 10 ? "0" + m : m;
		return h+"小时"+m+"分"
	},
	changeData : (data)=>{
		var _this=this,tempData=[];
		for(var i in data){
			if(Number(data[i].value)>=0&&data[i].value!=null){
				tempData.push([Number(data[i].value)]);
			}else if(Number(data[i].key)&&data[i].key!=null){
				tempData.push(Number(data[i].key));
			}else{//睡眠状态（1-上床，2-入睡，3-浅睡，4-深睡，5-觉醒，6-懒床，7-起床，8-再次上床，9-中途起床)
				switch (Number(data[i].status)){
			    case 1:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
			      break;
			    case 2:
			      tempData.push({
			            y: 2,
			            time: data[i].startTime
			      });
			      break;
			    case 3:
			      tempData.push({
			            y: 1.5,
			            time: data[i].startTime
			      });
			      break;
			    case 4:
			      tempData.push({
			            y: 0.5,
			            time: data[i].startTime
			      });
			      break;
			    case 5:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
			      break;
			    case 6:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
			      break;
			    case 7:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
			      break;
			    case 8:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
			      break;
			    default:
			      tempData.push({
			            y: 3,
			            time: data[i].startTime
			      });
				};
			}
		}
		return tempData;
    }
}

/*睡眠报告报表曲线函数*/
let reportSleepCommon = (data,callBack)=>{
	let color = [{ color: '#30d2ba'}];
    let sleepState = [];
    data.sleepStatusList.map((items,index)=>{
        sleepState.push(items.status)
    });
    let arr = tools.changeData(data.sleepStatusList);
    let arrData = [];
    sleepState.map((item)=>{
      arrData.push(tools.label(item))
    });
    let arrTime = [];
    let arrTimeString = [];
    arr.map((items,index)=>{
      let timeStr = items.time.split(" ");
      let timeSt = items.time;
      let utcTime = (new Date(timeSt.replace(/-/g,"/"))).getTime()+8*60*60*1000
      arrTime.push(utcTime);
      arrTimeString.push(timeSt);
    });
    let n=1;
    sleepState.map((item,index)=>{
      if(sleepState[index]==7&&sleepState[index+1]==1){
        sleepState.splice(index+n,0,"-")
        arrTime.splice(index+n,0,"")
        n++;
      }
    });
    arrData = sleepState.map((item,index)=>{
        return tools.label(item)
    });
    //处理颜色的变化
    tools.pickerColor(sleepState);
    //处理时间数据
    let arrTimeStr = data.sleepScope.split("~");
    let startTime = (new Date(arrTimeStr[0].replace(/-/g,"/"))).getTime()+8*60*60*1000;
    let endTime = (new Date(arrTimeStr[1].replace(/-/g,"/"))).getTime()+8*60*60*1000;
    //时段
    let sleepScopeTime = tools.toHours(startTime)+" "+toString(startTime)+"-"+tools.toHours(endTime)+" "+toString(endTime);
     //深睡、浅睡、清醒
    let lightSleepDuration = tools.sleepHours(data.wakeDuration);
    let fallSleepDuration = tools.sleepHours(data.lightSleepDuration);
    let deepSleepDuration = tools.sleepHours(data.deepSleepDuration);
    //时长
    let timeCount = parseInt(data.deepSleepDuration)+parseInt(data.lightSleepDuration);
    let count = tools.toHoursString(timeCount*60*1000);
    //处理数据的时间
    let timeStr = tools.formatDateTime(new Date(data.dataTime));
    callBack(arrTime,arrData,sleepState,true,tools.pickerColor(sleepState));
}
let reportSleepDOM,
	reportSleepChart;
DrawChart.initReportChart = (data)=>{
	let Chart = function(x,y,state,data,color){
		let dataArr = [];
		x.map((item,index)=>{
		  if(item==""){
		    x[index]=(x[index-1]+x[index+1])/2;
		  }
		})
		let minDate = new Date(x[0]);
		let minString = minDate.getMinutes();
		let count =minString < 10 ? minString : (minString - parseInt((minString.toString())[0]+"0"));
		window.min = x[0] - count*60*1000;
		let maxDate = new Date(x[(x.length-1)]);
		let maxString = maxDate.getMinutes();
		let countMax =minString > 50 ? (60-maxString) : (maxString < 10 ? (10-maxString):(parseInt((maxString.toString())[0]+"0")+10-maxString));
		window.max = x[(x.length-1)]+countMax*60*1000;
		window.interval = ((max-min)/5);
		y.map((item,index)=>{
		  let list = [x[index],item];
		  dataArr.push(list);
		})
		reportSleepDOM = document.getElementById("reportSleepChart");
		reportSleepChart = echarts.init(reportSleepDOM);
		let option = null;
		option = {
		    animation:true,
		    xAxis:{
	            type: 'time',
	            min:window.min,
	            max:window.max,
	            splitNumber:5,
	            interval:window.interval,
	            splitLine: {
	                show: false
	            },
	            axisTick:{
	                show:true,
	                alignWithLabel:true,
	                inside:true,
	                lineStyle:{
	                    color:'#3f316c'
	                },
	                interval:1
	            },
	            axisLine:{
	                show:true,
	                onZero:true,
	                lineStyle:{
	                    color:'#3f316c'
	                }
	            },
	            axisLabel:{
	                formatter:function(value,index){
	                  let time = new Date(value);
	                  let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
	                  return timeStr
	                },
	                textStyle:{
	                    fontSize:'12px',
	                    color:'#716790'
	                }

	            }
	        },
		    yAxis:{
	            type:'value',
	            max:4,
	            splitNumber:'4',
	            name:"睡眠曲线",
	            nameTextStyle:{
	                color:"#fff",
	                fontSize:"16"
	            },
	            nameGap:30,
	            boundaryGap:[0,'20%'],
	            axisTick:{
	                show:false,
	                alignWithLabel:false,
	                inside:true,
	                interval:5
	            },
	            splitLine:{
	                show:true,
	                interval:true,
	                lineStyle:{
	                    color:'#3f316c'
	                }

	            },
	            axisLine:{
	                show:true,
	                lineStyle:{
	                    color:'#3f316c'
	                }
	            },
	            data:[0,20,30,40],
	            axisLabel:{
	                formatter:  function (value, index) {
	                    var texts = []
	                    if(index===0){
	                        texts=''
	                    }else if(index===1){
	                        texts='深睡'
	                    }else if(index===2){
	                        texts='浅睡'
	                    }else if(index===3){
	                        texts='清醒'
	                    }
	                    return texts
	                },
	                textStyle:{
	                    fontSize:'12',
	                    color: function (val) {
	                        var color = '#30d2b9';
	                        if(val==1) color = "#d03bfb";
	                        if(val==2) color = "#6275ff";
	                        return color;
	                    }
	                },
	            },
	        },
		    series:{
	            show:false,
	            name:['清醒'],
	            symbol:"none",
	            type:'line',
	            smooth:true,
	            data:dataArr,
	            lineStyle:{
	                normal:{
	                    width:'3',
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,color, false),
	                    smoothMonotone:'y'
	                }
	            },
	            lable:{
	                show:true
	            },
	        }
		};
		reportSleepChart.setOption(option);
	};
	reportSleepCommon(data,Chart);
}

DrawChart.updateReportChart = (data)=>{
	let update = (x,y,state,data,color)=>{
		let dataArr = [];
		x.map((item,index)=>{
		  if(item==""){
		    x[index]=(x[index-1]+x[index+1])/2;
		  }
		})
		let minDate = new Date(x[0]);
		let minString = minDate.getMinutes();
		let count =minString < 10 ? minString : (minString - parseInt((minString.toString())[0]+"0"));
		window.min = x[0] - count*60*1000;
		let maxDate = new Date(x[(x.length-1)]);
		let maxString = maxDate.getMinutes();
		let countMax =minString > 50 ? (60-maxString) : (maxString < 10 ? (10-maxString):(parseInt((maxString.toString())[0]+"0")+10-maxString));
		window.max = x[(x.length-1)]+countMax*60*1000;
		window.interval = ((max-min)/5);
		y.map((item,index)=>{
		  let list = [x[index],item];
		  dataArr.push(list);
		});
		let option = {
			xAxis:{
	            min:window.min,
	            max:window.max,
	            interval:window.interval,
	            axisLabel:{
	                formatter:function(value,index){
	                  let time = new Date(value);
	                  let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
	                  return timeStr
	                }
	            }
	        },
	        series:{
	            data:dataArr,
	            lineStyle:{
	                normal:{
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1,color, false)
	                }
	            },
	        }
		};
		reportSleepChart.setOption(option);
	};
	reportSleepCommon(data,update);
}


/*睡眠报告心率呼吸率体动报表曲线函数*/
let heartChartCommon = (data,callBack)=>{
	//心跳
    let heartData = data.heartRateList;
    let breathData = data.breathRateList;
    let turnOverData = data.turnOverList;
    //正常范围
    let heartReferRange = data.heartRateAnalysis?data.heartRateAnalysis.referRange:"--" ;
    let breathReferRange = data.breathRateAnalysis?data.breathRateAnalysis.referRange:"--" ;
    //平均值
    let heartAllAverage = data.heartRateAnalysis?data.heartRateAnalysis.statisticalData:"--" ;
    let breathAllAverage = data.breathRateAnalysis?data.breathRateAnalysis.statisticalData:"--" ;
    let trunOverAllAverage = data.turnOverAnalysis?data.turnOverAnalysis.statisticalData:"--" ;
    //截取x轴坐标
    let heartXTime = [];//用来比较时间
    let heartX = heartData.map((items,index)=>{
      let time = items.key;
      let timeString = (new Date(time.replace(/-/g,"/"))).getTime()+8*60*60*1000;
      heartXTime.push(timeString);
        return timeString;
    });
    //这是y轴坐标
    let heartY = heartData.map((items,index)=>{
        return items.value
    });
    let heartYMin = heartData.map((items,index)=>{
        return items.value
    });
    let breathY = breathData.map((items,index)=>{
        return items.value
    });
    let breathYMin = breathData.map((items,index)=>{
        return items.value
    });
    let trunOverY = turnOverData.map((items,index)=>{
        return items.value
    });
    //这是处理xy轴数据时差大于15min时断点显示
    let k = 1
    let m = 1
    for(let i = 0;i<heartXTime.length;i++){//处理大于15min断点蛋都碎了
      if(parseInt(heartXTime[i+1]-heartXTime[i])>15*60*1000){
        heartYMin.splice(i+m, 0, "-");
        breathYMin.splice(i+m, 0, "-");
        heartY.splice(i+k, 0, "0");
        heartY.splice(i+k+1, 0, "-");
        heartY.splice(i+k+2, 0, "0");
        breathY.splice(i+k, 0, "0");
        breathY.splice(i+k+1, 0, "-");
        breathY.splice(i+k+2, 0, "0");
        trunOverY.splice(i+k, 0, "0");
        trunOverY.splice(i+k+1, 0, "-");
        trunOverY.splice(i+k+2, 0, "0");
        heartX.splice(i+m, 0, "-");
        k = k+3;
        m = m+1;
      }
    }
    //这是取得x的index数组
    let heartXX =[];
    for(let i = 0;i<heartX.length;i++){
      heartXX[i]=heartX[i];
    }
    //这是为了获得x轴下标数组
    let j=0;
    for(let i = 0;i<heartX.length;i++){
      if(heartX[i]=="-"){
        heartXX.splice(i+j, 0, heartX[i-1]);
        heartXX.splice(i+j+2, 0, heartX[i+1]);
        j=j+2;
      }
    }
    //这是要获得心跳的数据二维数组
    let heartXY =[];
    for(let i = 0;i<heartY.length;i++){
          heartXY[i] = [heartXX[i],heartY[i]]
    }
    let breathXY =[];
    for(let i = 0;i<heartY.length;i++){
          breathXY[i] = [heartXX[i],breathY[i]]
    }
    let trunOverXY =[];
    for(let i = 0;i<heartY.length;i++){
          trunOverXY[i] = [heartXX[i],trunOverY[i]]
    }
    //找出二维数组的y最小 并获得心跳的最小值
    let heartMinString = ""+Math.min.apply(null,heartY);
    let heartMinIndex = heartX[heartYMin.indexOf(heartMinString)];
    let heartMin = [heartMinIndex,heartMinString];
    let isHeartMin = heartData.map((items,index)=>{
        return items.value
    });
    isHeartMin.map((item,index)=>{
        if(item==0){
          heartMin=[];
        }
    })
    let breathMinString = ""+Math.min.apply(null,breathY);
    let breathMinIndex = heartX[breathYMin.indexOf(breathMinString)];
    let breathMin = [breathMinIndex,breathMinString];
    let isBreathMin = breathData.map((items,index)=>{
        return items.value
    });
    isBreathMin.map((item,index)=>{
        if(item==0){
          breathMin=[];
        }
    });
    
    let mark = function(arr){
		return [  {type : 'max', name: '最大值'},
		          {coord: arr}
		       ];
	}
	if(data.heartRateList.length<=0){
		callBack(reportHeartChart,["22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"],[300,300,300,300,300,300,300,300,300,300,300,300,300,300],200,"心率",["50","100","150"],mark([100,100]));
		callBack(reportBreathingChart,["22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"],[300,300,300,300,300,300,300,300,300,300,300,300,300,300],40,"呼吸率",["10","20","30"],mark([100,100]));
		callBack(reportOverChart,["22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00"],[300,300,300,300,300,300,300,300,300,300,300,300,300,300],70,"体动",["20","40","60"],mark([100,100]));
	}else{
		callBack(reportHeartChart,heartX,heartXY,200,"心率",["50","100","150"],mark(heartMin));
		callBack(reportBreathingChart,heartX,breathXY,40,"呼吸率",["10","20","30"],mark(breathMin));
		callBack(reportOverChart,heartX,trunOverXY,40,"体动",["10","20","30"],[]);
	}
}
let reportHeartDOM,
	reportHeartChart,
	reportBreathingDOM,
	reportBreathingChart,
	reportOverDOM,
	reportOverChart;
DrawChart.initHeartChart = (data)=>{
	reportHeartDOM = document.getElementById("reportHeartChart");
    reportHeartChart = echarts.init(reportHeartDOM);
    reportBreathingDOM = document.getElementById("reportBreathingChart");
    reportBreathingChart = echarts.init(reportBreathingDOM);
    reportOverDOM = document.getElementById("reportOverChart");
    reportOverChart = echarts.init(reportOverDOM);
	function Chart(id,X,Y,max,title,lable,mark){
      let option1 = null;
      Y.map((item,index)=>{
          if(item[0]=="-"){
            Y[index][0]=((Y[index-1])[0]+(Y[index+1])[0])/2;
          }
      });
      option1 = {
          animation:true,
          tooltip: {},
          legend: {
          },
          dataZoom: {
                  show: false,
                  start: 0,
                  end: 100
              },
          calculable : true,
          xAxis:{
                type:"time",
                min:window.min,
                max:window.max,
                splitNumber:5,
                interval:window.interval,
                splitLine: {
                    show: false
                },
                  axisTick:{
                      show:true,
                      alignWithLabel:true,
                      inside:true,
                      lineStyle:{
                          color:'#3f316c'
                      },
                      interval:0
                  },
                  axisLine:{
                      show:true,
                      onZero:false,
                      lineStyle:{
                          color:'#3f316c'
                      }
                  },
                  axisLabel:{
                      formatter:function(value,index){
                        let time = new Date(value);
                        let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
                        return timeStr
                      },
                      textStyle:{
                          fontSize:'12px',
                          color:'#716790'
                      },
                  }
          },
          yAxis:{
          		  type:'value',
                  name:title,
                  nameTextStyle:{
                      color:'#fff',
                      fontSize:'16',
                  },
                  nameGap:30,
                  max:max,
                  splitNumber:4,
                  boundaryGap:[0,'20%'],
                  axisTick:{
                      show:false,
                      alignWithLabel:false,
                      inside:true,
                      interval:0
                  },
                  splitLine:{
                      show:true,
                      interval:3,
                      lineStyle:{
                          color:'#3e316b'
                      }
                  },
                  axisLine:{
                      show:true,
                      lineStyle:{
                          color:'#3e316b',
                          fontSize:'12'
                      }
                  },
                  data:[0,50,100,150],
                  axisLabel:{
                      formatter:  function (value, index) {
                          var texts = []
                          if(index===0){
                              texts=''
                          }else if(index===1){
                              texts=lable[0]
                          }else if(index===2){
                              texts=lable[1]
                          }else if(index===3){
                              texts=lable[2]
                          }else {
                              texts=''
                          }
                          return texts
                      },
                      textStyle:{
                          fontSize:'12',
                          color:'#716790'
                      },
                  },         
          },
          series:{
          		name:['清醒'],
                symbol:"none",
                type:'line',
                data:Y,
                lineStyle:{
                    normal:{
                        width:'2',
                        color: '#41f0bc'
                    }
                },
                lable:{
                      show:true
                },
                markPoint : {
                    data : mark,
                    symbol : "circle",
                    symbolRotate:-30,
                    symbolSize:[7,7],
                    symbolOffset:[0,0],
                    label:{
                        normal:{
                            show:true,
                            offset:[0,-15],
                            formatter:(obj)=>{
                                if(obj.value){
                                    return obj.value;
                                }else{
                                    return obj.data.coord[1];
                                }
                            },
                            textStyle:{
                                color:"#e95d5d",
                                fontSize:"20px"
                            }
	                    },
	                    itemStyle:{
	                      normal:{
	                        color:"#e95d5d"
	                      }
	                    }
          			}
          		}
          	}
        };
      id.setOption(option1);
    }
    heartChartCommon(data,Chart);
}

DrawChart.updateHeartChart = (data)=>{
	let update = (id,X,Y,max,title,lable,mark)=>{
      let option1 = null;
      Y.map((item,index)=>{
          if(item[0]=="-"){
            Y[index][0]=((Y[index-1])[0]+(Y[index+1])[0])/2;
          }
      });
      option1 = {
            xAxis:{
                min:window.min,
                max:window.max,
                interval:window.interval,
				axisLabel:{
				  formatter:function(value,index){
				    let time = new Date(value);
				    let timeStr = (time.getHours()<10?("0"+time.getHours()):time.getHours())+":"+(time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes())
				    return timeStr
				  }
				}
            },
            yAxis:{
                name:title,
                max:max,
				axisLabel:{
				  formatter:  function (value, index) {
				      var texts = []
				      if(index===0){
				          texts=''
				      }else if(index===1){
				          texts=lable[0]
				      }else if(index===2){
				          texts=lable[1]
				      }else if(index===3){
				          texts=lable[2]
				      }else {
				          texts=''
				      }
				      return texts
				  }
				}
            },
            series:{
                data:Y,
                markPoint : {
                    data : mark,
                    label:{
                        normal:{
                            show:true,
                            formatter:(obj)=>{
                                if(obj.value){
                                    return obj.value;
                                }else{
                                    return obj.data.coord[1];
                                }
                            }
	                    },
          			}
          		}
          	}
        };
      id.setOption(option1);
    }
    heartChartCommon(data,update);
}
export {DrawChart};