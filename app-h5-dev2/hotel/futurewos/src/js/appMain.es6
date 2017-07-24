import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

const EQUIPMENTLIST = [
    {name:'香薰机',decribe:'香薰机自动调节为舒缓模式'},
    {name:'睡眠带子',decribe:'睡眠带子实时监测心率、呼吸率、体动'},
    {name:'加湿器',decribe:'加湿器自动开启，清新自然'},
    {name:'空调',decribe:'室内环境监测，自动调节为最佳温度'},
    {name:'窗帘',decribe:'窗帘自动关闭，营造舒适美容睡眠氛围'},
    {name:'智能灯',decribe:'智能灯自动调节为助眠模式'},
];
   
//图表数据
const CHARTDATA = [
    {
        id: "heartChart",name: 'heart',decribe: "心率",behavior: '次/分',
        data: [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40],
        option: {
            animation: false,
            tooltip: {},
            legend: {data:['']},
            grid: {
                show: false,
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
            },
            xAxis: {
                show: false,
                boundaryGap: true,
                data: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
            },
            yAxis: {
                show: false,
                type: 'value',
                max: 180,
            },
            series: {
                smooth: true,
                symbol: "none",
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    normal: {
                        width: '2',
                        color: '#fff'
                    }
                }
            }
        }
    },
    {
        id: "breatChart",name: 'breat',decribe: "呼吸率",behavior: '次/分',
        data: [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
        option: {
            animation: false,
            grid: {
                show: false,
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
            },
            xAxis: {   
                show:false,
                data: [1,2,3,4,5,1,2,0,1,2,3,4,5,1,2,3,4,5,1,2,1]
            },
            yAxis: {
                show: false,
                max: 60
            },
            series: {
                symbol: "none",
                type: 'line',
                name: '',
                smooth: true,
                data: [],
                lineStyle: {
                    normal: {
                        width: '2',
                        color: '#fff'
                    }
                }
            }
        },
    },
    {
        id: "bodiesChart",name: 'bodies',decribe: "体动",behavior: '次',
        data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        option: {
            animation: false,
            tooltip: {},
            legend: {
                data: ['']
            },
            grid:{
                show: false,
                top:0,
                left: 0,
                bottom: "25%",
                right: 0,
            },
            xAxis: {
                type: 'category',   
                show: false,
                data: [1,2,3,4,5,1,2,3,4,5,1,2,1,2,3,4,5,1,2,3,4]     
            },
            yAxis: {
                show: false,
                type: "value",
                max: 15,
            },
            series: {
                symbol: "none",
                name: '',
                type: 'line',
                data: [],
                step: true,
                lineStyle: {
                    normal: {
                        width: '2',
                        color: '#fff'
                    }
                }
            }
        }
    },
];

let dataTimer = 0;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            oldpage:null,
            equipment: {name:'香薰机1',decribe:'香薰机自动调节为坑头疼香味'},
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let _this = this;
        Actions.getData(function(){
            if(!_this.state.pageBtn){
                _this.imgAnimation();
            }else{
                _this.scrollAnimation();
            }
            _this.setState({
                oldpage: _this.state.pageBtn
            });
        });
        
        this.reGetData();
    }
    componentDidUpdate(){
        let _this = this;
        if(!_this.state.pageBtn && _this.state.oldpage != _this.state.pageBtn){
            _this.setState({
                oldpage: _this.state.pageBtn
            });
            _this.imgAnimation();
        }else if(_this.state.pageBtn && _this.state.oldpage != _this.state.pageBtn){
            _this.setState({
                oldpage: _this.state.pageBtn
            });
            _this.scrollAnimation();
        }
    }  
    reGetData() {
        clearInterval(dataTimer);
        dataTimer = setInterval(Actions.getData, 6000);
    }
    scrollAnimation(){
        let _this = this;
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay : 5000,
            onSlideChangeStart: function(swiper){
                let name = EQUIPMENTLIST[parseInt(swiper.activeIndex)]["name"],
                    decribe = EQUIPMENTLIST[parseInt(swiper.activeIndex)]["decribe"];
                 _this.setState({
                    equipment: {name:name,decribe:decribe},
                })
            }
        });
    }
    imgAnimation(){
        var mySwiper = new Swiper('.scroll-img-container2', {
            autoplay: 5000,
        });
    }
    render() {
        return (
            <div>
                <div className="wrap"></div>
                <div className="content">
                    {
                        this.state.pageBtn ? (
                            <div>
                                <div className="life-box">
                                    <h1>睡眠状态中身体体征数据呈现：</h1>
                                    <ChartBox parameter={CHARTDATA[0]}  behaviorData={this.state.heartRate} data={ this.state.chartHeartData} /> 
                                    <ChartBox parameter={CHARTDATA[1]}  behaviorData={this.state.breathRate} data={ this.state.chartBreathData} />
                                    <ChartBox parameter={CHARTDATA[2]}  behaviorData={this.state.turnOverTimes}  data={ this.state.chartBodiesData}/>
                                </div>
                                <div className="scroll-img">
                                    <div className="swiper-container scroll-img-container">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide"><img src="../static/img/pic_5.png"  /></div>
                                            <div className="swiper-slide"><img src="../static/img/pic_2.png"  /></div>
                                            <div className="swiper-slide"><img src="../static/img/pic_3.png"  /></div>
                                            <div className="swiper-slide"><img src="../static/img/pic_4.png"  /></div>
                                            <div className="swiper-slide"><img src="../static/img/pic_1.png"  /></div>
                                            <div className="swiper-slide"><img src="../static/img/pic_6.png"  /></div>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                    <div className="scroll-img-txt">
                                        <ul>
                                            <li>
                                                <p>{this.state.equipment.name}</p>
                                                <span>{this.state.equipment.decribe}</span>
                                            </li> 
                                        </ul>
                                    </div>
                                </div>
                                <div className="equipment-box">
                                    <span className="equipment1"><em>星月灯</em></span>
                                    <span className="equipment2"><em>香薰机</em></span>
                                    <span className="equipment3"><em>睡眠带</em></span>
                                    <span className="equipment4"><em>智慧盒子</em></span>
                                    <span className="equipment5"><em>空调</em></span>
                                    <span className="equipment6"><em>窗帘</em></span>
                                    <span className="equipment7"><em>空气净化器</em></span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="life-box">
                                    <h1>睡眠场景联动数据呈现</h1>
                                    <div className="line-box">
                                        <div className="line-map line1-box">
                                            <span className="line line1"></span>
                                            <em className="line line1"></em>
                                        </div>
                                        <div className="line-map line2-box">
                                            <span className="line line2"></span>
                                            <em className="line line2"></em>
                                        </div>
                                        <div className="line-map line3-box">
                                            <span className="line line3"></span>
                                            <em className="line line3"></em>
                                        </div>
                                        <div className="line-map line4-box">
                                            <span className="line line4"></span>
                                            <em className="line line4"></em>
                                        </div>
                                    </div>
                                    <div className="text-box">
                                        <h5>睡眠改善</h5>
                                        <p>根据身体健康数据，为你自动调整灯光、温度、香薰…助你改善睡眠质量、享受智能科技生活的便利和舒适。</p>
                                    </div>
                                    <div className="scroll-img2">
                                        <div className="swiper-container2 scroll-img-container2">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide"><img src="../static/img/f1.png"  /></div>
                                                <div className="swiper-slide"><img src="../static/img/f2.png"  /></div>
                                                <div className="swiper-slide"><img src="../static/img/f3.png"  /></div>
                                                <div className="swiper-slide"><img src="../static/img/f4.png"  /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )  
                    }
                </div>
            </div>
        )
    }
}

class ChartBox extends BaseComponent{
     constructor(props) {
        super(props);
        this.state = {
            lastBehaviorData: 0,
            data: 0,
            first: true,
            behaviorData:0,
            turnOverTimesNum: 0,
        };
    }
    componentWillMount(){
        this.myChart = null;
    }
    componentDidMount(){
        // let parameter = this.props.parameter,
        //     data = this.props.data;
        //     console.log(data);
        // if(data){
        //     let id = parameter.id,
        //         option = parameter.option;
        //     //option.series.data = [1,1,10,10,1,1,1,1,10,10,1,10,10,1,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        //     //option.series.data = [20,20,30,20,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
        //     option.series.data = data; 
        //     this.handleChart(id,option);
        // }
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.data){
            return false;
        }

        let id = nextProps.parameter.id,
        option = nextProps.parameter.option;
        
        //option.series.data = [1,1,10,10,1,1,1,1,10,10,1,10,10,1,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        //option.series.data = [20,20,30,20,10,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20];
        
        if(nextProps.parameter.id === "bodiesChart"){
            this.bodyDataAnalysis(nextProps,id,option);
        }else{
            option.series.data = nextProps.data;
            this.handleChart(id,option);
        }
    }
    bodyDataAnalysis(nextProps,id,option){
        if(this.state.first){
            for(let i =0;i<nextProps.behaviorData;i++) {
                nextProps.parameter.data.splice(-4);
                nextProps.parameter.data.unshift(1,1,10,10);
            };
            this.setState({
                turnOverTimesNum: nextProps.behaviorData,
                lastBehaviorData: nextProps.behaviorData,
                data: nextProps.parameter.data,
                first: false
            },function(){
                option.series.data = this.state.data;
                this.handleChart(id,option);
            });
        }else{
            //console.log(this.state.lastBehaviorData +":"+ nextProps.behaviorData);
            let newData = this.state.data;
            let turnOverTimesNum = this.state.turnOverTimesNum;
            if(this.state.lastBehaviorData !== nextProps.behaviorData ){
                if(nextProps.behaviorData === 0){
                    newData.splice(-4);
                    newData.unshift(1,1,1,1);
                }else{
                    turnOverTimesNum += nextProps.behaviorData;
                    for(let i =0;i<nextProps.behaviorData;i++) {
                        newData.splice(-4);
                        newData.unshift(1,1,10,10);
                    };
                }
                
            }else{
                newData.splice(-4);
                newData.unshift(1,1,1,1);
            }
            

            this.setState({
                turnOverTimesNum: turnOverTimesNum,
                lastBehaviorData: nextProps.behaviorData,
                data: newData
            },function(){
                option.series.data = this.state.data;
                this.handleChart(id,option);
            });
        }
    }
    handleChart(id,option){
        this.myChart = null;
        this.myChart = echarts.init(document.getElementById(id));
        this.myChart.setOption(option);
    }
    render(){

        
        let parameter = this.props.parameter,
            behaviorData = this.props.behaviorData ? this.props.behaviorData : 0;
            
        return (
            <div className="box-list clear">
                <div className="box-list-left fl">
                    <span className={parameter.name}>[{parameter.decribe}]</span>
                    <p>
                        { parameter.id === "bodiesChart" ? this.state.turnOverTimesNum :behaviorData }<i>{parameter.behavior}</i>
                    </p>
                </div>
                <div className="box-list-temp" id={parameter.id} ></div>
                <div id="line" className="line" style={{left:'32%'}}></div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('ROOT'));

