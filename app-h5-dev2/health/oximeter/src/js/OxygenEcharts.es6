'use strict';
/**
 * 血氧脉率图表组件
 * @prop {array} spo2  血氧值
 * @prop {array} pr  脉率值
 * @prop {array} seList  血氧事件
 * @prop {array} peList  脉率事件
 * @prop {array} oMarkPointData  血氧异常点
 * @prop {array} pMarkPointData  脉率异常点
 * @prop {array} time  x轴 时间
 * 
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from '../js/Actions.es6';
import {Store} from '../js/Store.es6';
import {Funs} from '../../../common/src/fun.es6';



export class OxygenEcharts extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {tabIndex:1,seArr:[],peArr:[],historyResult:''};
        this.listenStore(Store); // 监听Store
    }
    handleSwitch(index){
        // Actions.chartClick([],[],false);
        this.setState({tabIndex:index});

    } 
    timeFormat(str){
        let timeArr = str.indexOf('-')>0?str.split('-'):'',
        curr_date = this.state.historyResult.recordTime?this.state.historyResult.recordTime:'',
        contentTime = Funs.dateFormat(curr_date+' '+timeArr[0],'hh:mm:ss',true)+'-'+Funs.dateFormat(curr_date+' '+timeArr[1],'hh:mm:ss',true);
        return contentTime;
    }
    // chartClick(params,seList,peList){
    //     let peArr=[],seArr=[],
    //     xAxis = params.data.xAxis,
    //     seriesIndex = params.seriesIndex;
        
    //     if(seriesIndex ==0){// 0:血氧 1：脉率
    //         for(let i in seList){
    //             let seTime = Funs.dateFormat(seList[i].seTime,"hh:mm",true);
    //             if(seTime ==xAxis){
    //                 let seObj = {'id':i,"seContent":seList[i].seContent,'seContentTime':this.timeFormat(seList[i].seContentTime)};
    //                 seArr.push(seObj);
    //             }
    //         }
    //     }else{
    //         for(let i in peList){
    //             let peTime = Funs.dateFormat(peList[i].peTime,"hh:mm",true);
    //             if(peTime ==xAxis){
    //                 let peObj = {'id':i,"peContent":peList[i].peContent,'peContentTime':this.timeFormat(peList[i].peContentTime)};
    //                 peArr.push(peObj);
    //             }
    //         }
    //     }
    //     Actions.chartClick(seArr,peArr,true);
    // }
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(nextProps.nofresh,nextState.nofresh);
        return !nextProps.nofresh;
    }

    render() {
        //console.log(this.state);
        return (
            <article>
                <ul className='flex timeTab'>
                    <li className={this.state.tabIndex==1?'flex-cell checked':'flex-cell'} onTouchTap={this.handleSwitch.bind(this,1)}>1小时</li>
                    <li className={this.state.tabIndex==6?'flex-cell checked':'flex-cell'} onTouchTap={this.handleSwitch.bind(this,6)}>6小时</li>
                    <li className={this.state.tabIndex==24?'flex-cell checked':'flex-cell'} onTouchTap={this.handleSwitch.bind(this,24)}>24小时</li>
                </ul>
                <p className='yAxis-name'><span>SPO2</span><span>PR</span></p>
                <div className='flex chart' id='chart' ref="chart" ></div>
                <ul className='flex legend'>
                    <li className='flex-cell'><b className='circleIcon green'></b><b>血氧正常</b></li>
                    <li className='flex-cell'><b className='circleIcon blue'></b><b>脉率正常</b></li>
                    <li className='flex-cell'><b className='circleIcon orange'></b><b>异常</b></li>
{/*                    <li className='flex-cell'><b className='circleIcon orange'>!</b><b>异常</b></li>
*/}                </ul>
            </article>
        );
    }
    componentDidMount(){
        this.handleSwitch(1);
    }
    componentWillUpdate(nextProps,nextState){
        let time = nextProps.time,
        _this=this,
        startTime = nextProps.startTime,
        spo2 = nextProps.spo2,
        pr = nextProps.pr,
        peList = nextProps.peList,
        seList = nextProps.seList,
        pMarkPointData = nextProps.pMarkPointData,
        oMarkPointData = nextProps.oMarkPointData;

         //console.log('diyici',nextProps);
        let chartDom = ReactDOM.findDOMNode(this.refs.chart),// dom节点
        chart = echarts.init(chartDom),// 基于准备好的dom，初始化echarts实例
        end = 100/24,start=0;

        switch(nextState.tabIndex){ //1小时 6小时 24小时切换
            case 1:
            if(startTime!=null && startTime !='00'){
                start = parseInt(startTime)/24*100;
                end = (parseInt(startTime)+1)/24*100;
            }else{
                end = 1/24*100;
            }
            break;
            case 6:
                if(startTime!=null && startTime !='00'){
                    start = parseInt(startTime)/24*100;
                    end = (parseInt(startTime)+6)/24*100;
                }else{
                    end = 6/24*100;     
                }

            break;
            case 24:
            end = 100;
            break;
        }

        let options = {
            color:["#3FB57D",'#4DB8BE'],
            tooltip: {
                trigger: 'axis',
                triggerOn:'click',
                alwaysShowContent:false,
                position: function (point, params, dom) {
                    let position=["40%","50%"];;
                    if(params[0]){
                        if(params[0].data==''){
                            position=[-500,-500];
                        }
                    }
                    // console.log(point,position);
                    return position;
                },
                formatter: function (params, ticket, callback) {
                    let seriesName,data,name;
                    if(params[0]){
                        seriesName = params[0].seriesName;
                        data = params[0].data;
                        name = params[0].name;
                        if(seriesName == '血氧'){
                            if(data < 90){
                                seriesName = '血氧非常危险';
                            }else if(data >=90 && data < 95 ){
                                seriesName = '血氧危险';
                            }else{
                                seriesName = '血氧正常';
                            }
                        }else{
                            if(data < 40 || data > 140){
                                seriesName = '脉率非常危险';
                            }else if((data >=40 && data < 60 )||(data >=101 && data <= 140)){
                                seriesName = '脉率危险';
                            }else{
                                seriesName = '脉率正常';
                            }
                        }
                    }else{
                        seriesName = params.name;
                    }
                
                    return  (name?name+'<p></p>':'') + seriesName + (data?'：' + data:'');
                },
                axisPointer:{lineStyle:{color:'rgba(128, 128, 128, 0)'}},
            },
            grid: [
                {x: '10%', y: '7%',width:"85%",height:"38%"},
                {x: '10%', y: '55%',width:"85%",height:"38%"}
            ],
            xAxis: [
                {
                    gridIndex: 0,
                    type: 'category',
                    data: time,
                    axisTick:{show:false},
                    axisLabel:{show:false},
                    splitLine:{show:false},
                    axisLine:{lineStyle:{color:'#D2D4DF'}},
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    data: time,
                    axisLine:{lineStyle:{color:'#D2D4DF'}},
                    axisLabel:{textStyle:{color:'#969696'}},
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'SpO2',
                    nameLocation:"start",
                    nameGap:8,
                    min: 60,
                    max: 100,
                    interval: 10,
                    axisLabel:{textStyle:{color:"#969696"}},
                    axisLine:{lineStyle:{color:'transparent'}},
                    splitLine:{lineStyle:{color:'#E1E2EA'}}
                },
                {
                    gridIndex: 1,
                    type: 'value',
                    nameGap:20,
                    name: 'PR',
                    nameLocation:"start",
                    min: 30,
                    max: 170,
                    interval: 35, 
                    axisLabel:{textStyle:{color:"#969696"}},
                    axisLine:{lineStyle:{color:'transparent'}},
                    splitLine:{lineStyle:{color:'#E1E2EA'}}
                }
            ],
            dataZoom:[{type:'inside',xAxisIndex:[0,1],start:start,end:end,zoomLock:true}],
            visualMap: [
                {
                    seriesIndex:0,
                    show:false,
                    dimension:1,
                    pieces: [ 
                    {
                        gt: 0,
                        lte: 94,
                        color: '#EB6E4A'
                    },{
                        gt: 94,
                        lte: 100,
                        color: '#3FB57D'
                    }],
                    
                },
                {
                    seriesIndex:1,
                    show:false,
                    dimension:1,
                    pieces: [ 
                    {
                        gt: 60,
                        lte: 100,
                        color: '#4DB8BE'
                    }],
                    outOfRange: {
                        color: '#EB6E4A'
                    },
                }
            ],
            series: [
                {
                    name: '血氧',
                    type: 'line',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: spo2,
                    // markPoint: {
                    //     data:oMarkPointData,
                    //     symbolSize:30,
                    //     symbolOffset :[0,-3],
                    //     label:{normal:{formatter:'!'}},
                    //     itemStyle:{normal:{color:"#EB6E4A"}}
                    // },
                },
                {
                    name: '脉率',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: pr,
                //     markPoint: {
                //         data:pMarkPointData,
                //         symbolSize:30,
                //         symbolOffset :[0,-3],
                //         label:{normal:{formatter:'!'}},
                //         itemStyle:{normal:{color:"#EB6E4A"}}
                //     },
                }
            ]
        };

        // 绘制图表
        chart.setOption(options);
        // if(startTime){
        //     chart.setOption(options);
        // }
        // chart.on('click', function (params) {
        //     _this.chartClick(params,seList,peList);
        // }); 

        /*解决图表区域内上下滑时 页面无法滚动且图表左右滑的bug*/
        var startX = 0,startY = 0;
        this.canvasdom = document.querySelector('#chart').querySelector('canvas') || document.querySelector('#chart');
        this.canvasdom.addEventListener('touchstart',(e)=>{
            let touch = e.touches[0];
            this.initY = touch.clientY;
            this.obj = {
                oriPosi:document.body.scrollTop,
                num:2,     //预研次数
                hor:true,  //是否水平方向
                data:null  //保存num次移动情况
            };
            startX = Number(touch.pageX); //页面触点X坐标
            startY = Number(touch.pageY); //页面触点Y坐标
        })
        this.canvasdom.addEventListener('touchmove',(e)=>{
            var {oriPosi,num,hor,data} = this.obj,
            touch =  e.touches[0];
            let moveY = touch.clientY - this.initY;
            if(num > 0){
                this.obj.data = touch;
                e.stopPropagation();
                this.obj.num--;
                return;
            }else if(num === 0){
                var  x = Number(this.obj.data.pageX), //页面触点X坐标
                y = Number(this.obj.data.pageY), //页面触点Y坐标
                totalY = Math.abs(y - startY),//
                totalX = Math.abs(x - startX);//
                //判断滑动方向
                if ( totalY > totalX) {
                    this.obj.hor = false;
                }
            }
            // console.log('touchmove:',totalY,totalX,this.obj.hor);
            if(!this.obj.hor){
                e.stopPropagation();
                document.body.scrollTop = oriPosi - moveY;
            }
        },true);

        

    //      var startX = 0,
    //     startY = 0;
    // function touchStart(evt){
    //     try{
    //         var touch = evt.touches[0], //获取第一个触点
    //                 x = Number(touch.pageX), //页面触点X坐标
    //                 y = Number(touch.pageY); //页面触点Y坐标
    //         //记录触点初始位置
    //         startX = x;
    //         startY = y;
    //     }catch(e){
    //         console.log(e.message)
    //     }
    // }

    // function touchMove(evt){
    //     try{
    //         var touch = evt.touches[0], //获取第一个触点
    //                 x = Number(touch.pageX), //页面触点X坐标
    //                 y = Number(touch.pageY), //页面触点Y坐标
    //            totalY = Math.abs(y - startY),//
    //            totalX = Math.abs(x - startX);//

    //         //判断滑动方向
    //         if (totalX > totalY) {
    //             console.log('左右滑了！');
    //         }else{
    //             evt.preventDefault();
    //             document.body.scrollTop += totalY;
    //             console.log(document.body.scrollTop);
    //         }
    //     }catch(e){
    //         console.log(e.message)
    //     }
    // }

    //  this.canvasdom.addEventListener('touchstart',touchStart,false);
    //  this.canvasdom.addEventListener('touchmove',touchMove,false);
    }    
};
