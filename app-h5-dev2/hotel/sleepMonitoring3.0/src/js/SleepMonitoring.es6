import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import Path from './ApiPath.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;
export class SleepMonitoring extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            countTime:"",
            sleepState:"--",
            heartRateList:[],
            heartRate:0,
            breathRate:0,
            turnOverTimes:0,
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.login(1);
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl)
        let _this = this;
        //路由跳转时保证显示全屏
        let body = document.getElementsByTagName('body');
        body[0].style.height='100%';
        //计时器
        let timeStart = (new Date()).getTime();
        this.timer = setInterval(()=>{
            let timeEnd = (new Date()).getTime();
            let count =_this.countDown(timeEnd-timeStart);
            _this.setState({
                countTime:count
            })
        },500);
        //初始化数据
        window.k = 1;
        let heartMax = 70;
        let breathData = 0;
        let initHeartRateList = [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40];
        let initBreathRateList = [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
        let initTrunOverRateList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        let url1 = Path.wPath+"/wechat/hotel/getParam";

        let sceneUrl =  Path.wPath+'/wechat/hotel/authAccess';

        //let url1 ='../mock/time.json'
        setTimeout(function(){
            het.get(url1,{},(res)=>{
            let data = JSON.parse(res);
            if(data.code==0){
              _this.setState({
                accessToken:data.data.accessToken,
                appId:data.data.appId,
                deviceId:data.data.deviceId,
                deviceNames:data.data.deviceNames,
                deviceNamesShow:data.data.deviceNamesShow
              });
              //基本参数拿到 在去拿取实时数据
              clearInterval(_this.timer1);
              _this.timer1 = setInterval(function(){
                let url =Path.wPath +'/wechat/hotel/device/data/getRaw?deviceId='+_this.state.deviceId;
                //let url ='../mock/time.json';
                het.get(url,{},(res)=>{
                    let splineTrunOverRateList = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
                    let data = JSON.parse(res);
                    if(data.code==0 && data.data.dataTime!=null) {
                      //处理数据
                        let now = (new Date()).getTime();
                        let str = data.data.dataTime.replace(/-/g,"/");
                        let resTime = (new Date(str)).getTime()+8*60*60*1000;
                        let prevTime = localStorage.getItem("resTime");
                        localStorage.setItem("resTime",resTime)
                        _this.setState({
                            monitoringTime:data.data.dataTime,
                            heartRateList:splineHeartRateList,
                            heartRate:data.data.heartRate,
                            breathRate:data.data.breathRate,
                        })
                        breathData = 2*data.data.breathRate;
                        heartMax = data.data.heartRate;
                        let splineHeartRateList = [40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40,40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40,40,40,40,40+6*heartMax/7,40-6*heartMax/7,40-heartMax/7,40-heartMax/7,40+1*heartMax/7,40-6*heartMax/7,40,40,40];
                        let splineBreathRateList = [20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20,20+3*breathData/4,20+breathData,20+3*breathData/4,20,20-3*breathData/4,20-breathData,20-3*breathData/4,20];
                        if(data.data.turnOverTimes==0||data.data.turnOverTimes==null||prevTime==resTime){
                          turnOverInit(initTrunOverRateList) 
                        }else{
                          for(let i =0;i<data.data.turnOverTimes;i++) {
                            splineTrunOverRateList[i*4+2]=10;
                            splineTrunOverRateList[i*4+3]=10;
                          }
                          _this.setState({
                            turnOverTimes:_this.state.turnOverTimes+data.data.turnOverTimes
                          })
                          turnOverInit(splineTrunOverRateList) 
                        }
                        heartInit(splineHeartRateList)
                        breathingInit(splineBreathRateList)
                    }else {
                        _this.setState({
                            heartRate:0,
                            breathRate:0,
                            turnOverTimes:0,
                        })
                       
                        heartInit(initHeartRateList)
                        breathingInit(initBreathRateList)
                        turnOverInit(initTrunOverRateList)
                    }
                  },(err)=>{
                    _this.setState({
                        heartRate:0,
                        breathRate:0,
                        turnOverTimes:0,
                    })
                    heartInit(initHeartRateList)
                    breathingInit(initBreathRateList)
                    turnOverInit(initTrunOverRateList)
                  });
                let url2 = Path.wPath + '/wechat/hotel/mattress/getMattressRawLastData?deviceId='+ _this.state.deviceId;
                het.get(url2,{},(res)=>{
                    let data = JSON.parse(res);
                    if(data.code==0 && data.data.startTime!=null){
                        let time = data.data.startTime;
                        let nowTime = (new Date()).getTime();
                        let oldTime = (new Date(time.replace(/-/g,"/"))).getTime()+8*60*60*1000;    
                        _this.setState({
                            sleepStatus:data.data.status,
                        }) 
                    }else{
                        _this.setState({
                            sleepStatus:"--",
                        }) 
                    }
                  },(err)=>{
                    _this.setState({
                            sleepStatus:"--",
                    }) 
                  });                    
              },5000)

            }else{
                    if(data.code==103005001){

                    }else{
                       alert(data.msg) 
                    }
            }},(err)=>{
                alert("网络不好!请稍后重试")
            })
        },500)
              
        /*实时监测*/
        heartInit(initHeartRateList);
        breathingInit(initBreathRateList);
        turnOverInit(initTrunOverRateList);
        function heartInit(data) {
            let dom = document.getElementById("heartBeat");
            let myChart = echarts.init(dom);
            let app = {};
            let option = null; 
            option = {
                animation:false,
                tooltip: {},
                legend: {data:['']},
                grid:{
                    show:false,
                    left:20,
                    top:20,
                    bottom:20,
                    right:20,
                },
                xAxis: {
                    show:false,
                    boundaryGap: true,
                    data: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
                    } ,
                yAxis: {
                    show:false,
                    type:'value',
                    max:150,
                },
                series: {
                    symbol:"none",
                    name:'',
                    type:'line',
                    
                    data:data,
                    lineStyle:{
                        normal:{
                            width:'2',
                            color:'#fff'
                            }
                        }
                    }
            };
                myChart.setOption(option);
        };
         function breathingInit(data){
            let dom1 = document.getElementById("breathing");
            let myChart1 = echarts.init(dom1);
            let app = {};
            let option = null; 
            option = {
                animation:false,
                grid:{
                    show:false,
                    left:20,
                    top:40,
                    bottom:40,
                    right:20,
                },
                xAxis: 
                    {   show:false,
                        data: [0,1,2,3,4,5,1,2,0,1,2,3,4,5,1,2,3,4,5,1,2,1]
                    },
                yAxis: {
                    show:false,
                    max:120
                    },
                series: 
                    {
                        symbol:"none",
                        type:'line',
                        name:'',
                        smooth: true,
                        data:data,
                        lineStyle:{
                            normal:{
                                width:'2',
                                color:'#fff'
                            }
                        }
                    }
            };
            myChart1.setOption(option)
        };
         function turnOverInit(data){
            let dom2 = document.getElementById("trunOver");
            let myChart2 = echarts.init(dom2);
            let app2 = {};
            let option2 = null; 
            option2 = {
                animation:false,
                tooltip: {},
                legend: {
                    data:['']
                },
                grid:{
                    show:false,
                    left:20,
                    top:40,
                    bottom:40,
                    right:20,
                },
                xAxis: 
                    {   show:false,
                        data:[1,2,3,4,5,1,2,3,4,5,1,2,1,2,3,4,5,1,2,3,4,5,1,2]
                        
                    }
                    
                ,
                yAxis: 
                    {
                    show:false,
                    type:"value",
                    max:15,
                }
                ,
                series: 
                    {
                        symbol:"none",
                        name:'',
                        type:'line',
                        data:data,
                        step:true,
                        lineStyle:{
                            normal:{
                                width:'2',
                                color:'#fff'
                            }
                        }
                    }
            };
            myChart2.setOption(option2)
        }
    }
    componentWillUnmount(){
       clearInterval(this.timer)
       clearInterval(this.timer1)
    }
    countDown(time) {
        let data = time/1000
            let h = parseInt(data/3600)
                if (h < 10) {
                    h = "0" + h
                }
            let m = parseInt(data%3600/60)
                if (m < 10) {
                    m = "0" + m
                }
            let s = parseInt(data%3600%60)
                if (s < 10) {
                    s = "0" + s
                }
            return h+":"+m+":"+s
    }
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                   if (arr = document.cookie.match(reg)) {
                       return unescape(arr[2]);
                   } else {
                       return null;
                   }
    }
    getSleepState(data) {//睡眠状态（1-上床，2-入睡，3-浅睡，4-深睡，5-觉醒，6-懒床，7-起床，8-再次上床，9-中途起床)
        let _y=data, _yStr="";
            switch (_y){
                case 1:_yStr="在床";
                    break;
                case 2:_yStr="在床";
                    break;
                case 3:_yStr="在床";
                    break;
                case 4:_yStr="在床";
                    break;
                case 5:_yStr="在床";
                    break;
                case 6:_yStr="在床";
                    break;
                case 7:_yStr="离床";
                    break;
                case 8:_yStr="在床";
                    break;
                case 9:_yStr="离床";
                    break;
                case 11:_yStr="离床";
                    break;
                case 12:_yStr="在床";
                    break;
                case 13:_yStr="在床";
                    break;
                case 14:_yStr="在床";
                    break;
                case 15:_yStr="离床";
                    break;
                default:_yStr="--";
                }
        return _yStr;         
    }
    render() {
        let _this=this;
        return <div className='moniter'>
                    <div className="monitering">
                        <div className="moniter-chart moniter-heart-beat">
                             <div className="chart-left">
                                <div className="data-name">心率</div>
                                <div className="data-number">
                                    <h3>{this.state.heartRate}</h3>
                                    <i>次/分</i>
                                </div>
                             </div>
                             <div id="heartBeat" className="chart-right grid"></div>
                             <div id="line" className="line" style={{left:'32%'}}></div>
                        </div>
                        <div className="moniter-chart moniter-breathing">
                             <div className="chart-left">
                                <div className="data-name">呼吸率</div>
                                <div className="data-number">
                                    <h3>{this.state.breathRate}</h3>
                                    <i>次/分</i>
                                </div>
                             </div>
                             <div id="breathing" className="chart-right grid"></div>
                             <div id="line" className="line" style={{left:'32%'}}></div>
                        </div>
                        <div className="moniter-chart moniter-turn-over">
                             <div className="chart-left">
                                <div className="data-name">体动</div>
                                <div className="data-number">
                                    <h3>{this.state.turnOverTimes}</h3>
                                    <i>次</i>
                                </div>
                             </div>
                             <div id="trunOver" className="chart-right grid"></div>
                             <div id="line" className="line" style={{left:'32%'}}></div>
                        </div>
                        <div className="moniter-state">
                            <div className="moniter-state-style">
                                <i>监测时长</i>
                                <h3 id="countTime">{this.state.countTime}</h3>
                            </div>
                            <div className="moniter-state-style">
                                <i>睡眠状态</i>
                                <h3 id='sleepState'>{this.getSleepState(_this.state.sleepStatus)}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="moniter-report">
                        <div className="moniter-tips">
                            <p>小C会根据您的睡眠状况,联动智能设备改善环境,让您睡的更好,并根据您整晚的睡眠生成报告推送给你。也可以通过"我的睡眠"菜单查看。</p>
                        </div>
                        <Link className="link-moniter-report" to="/report">
                            睡眠报告模板
                        </Link>
                    </div>
               </div>;
    }
}
