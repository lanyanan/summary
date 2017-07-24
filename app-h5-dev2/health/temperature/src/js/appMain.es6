import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TempHint} from './TempHint.es6';
import {Echarts} from './Echarts.es6';
import {DeviceConnect} from './DeviceConnect.es6';
import {Temperaturemodel} from './Temperaturemodel.es6';
import {MeasureDetails} from './MeasureDetails.es6';
import {NurseDetaiks} from './NurseDetaiks.es6';
import {Measure} from './Measure.es6';
import {Head} from './Head.es6';
import {Guide} from './Guide.es6';
var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {
            'nickname' : 'nickname',//昵称
            'temp' : 'temp', // 温度
            'img':'img',//头像
            'dataTime':'dataTime'//时间
        },
        renderConfigData : true
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    // console.log('0000',data);
    Actions.repaint(data);
});
// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            timeArr:["00:00"],
            tempArr:["34"],
            appId:'',
            deviceId:'',
            userType:'',
            memberId:'',
            headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    componentWillMount() {
        Actions.getOldData();
        het.toast('tempMode');
    }
    componentDidMount(){
        let isConnect = Funs.getUrlParam('isConnect');
        // let isBleConnect = Funs.getUrlParam('isBleConnect');
        // if(isBleConnect === 0 || isBleConnect==="0"){
        //     this.setState({
        //         isBleConnect:0 
        //     });
        // }
        let _this=this;
        setTimeout(function(){
            let data={
                    "appId":_this.state.appId,
                    "deviceId":_this.state.deviceId,
                    "userType":_this.state.userType,
                    "memberId":_this.state.memberId,
                },
            today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
            Actions.changeDate(today,data,isConnect);
        },1000);
    }
    componentWillUpdate(nextProps, nextState){
        if(this.state.dataTime){
            let dataTime=Funs.dateFormat(Number(this.state.dataTime),'hh:mm',false),
                timeArr=this.state.timeArr,
                tempArr=this.state.tempArr,
                lastTime=timeArr[timeArr.length-1];

            //console.log(timeArr,lastTime);
            if(lastTime!=dataTime){
                let temp = this.state.temp;
                if(temp < 34){
                    temp = '34';
                }else if(temp > 42){
                    temp = '42';
                }
                timeArr.push(dataTime);
                tempArr.push(temp);
            }

            if(timeArr.length>=8||(timeArr[0] === '00:00'&&tempArr[0]==='34')){
                timeArr.shift();
                tempArr.shift();
            }
            //console.log(timeArr,tempArr);
        }
        let maxtemp = this.state.maxtemp || 0;
        if(nextState.temp>maxtemp){
            let maxtime = Funs.dateFormat(Number(nextState.dataTime),'hh:mm:ss',false);
            this.setState({
                maxtemp: nextState.temp,
                maxtime:maxtime
            });
        }
        if(!this.state.haveHistory && nextState.haveHistory === false){
            het.toast('noHistory');
            ReactDOM.findDOMNode(this.refs["toGuide"]).click();
        }
    }
    measure(){
        this.setState({
            isBleConnect:0
        });
        het.toast('measure');
    }
    render() {
        let conMeasure,conHistory;
        if(!this.state.isBleConnect || this.state.isBleConnect==2){
            conMeasure=(<a onTouchStart={this.measure.bind(this)} href='health://skip_url/deviceConnect.html' id='measure-btn' className={this.state.isBleConnect?'btn flex show':'btn flex hide'} >测量</a>);
            conHistory=(<a href='health://skip_url/history.html' id='hsty-btn' className='btn flex' >历史数据</a>);
        }
        if(this.state.isBleConnect==1){
            conMeasure=( <Link className='flex' to={{ pathname: '/temperature', query: {bedTimes:this.state.bedTimes,bedAvgTemp:this.state.bedAvgTemp,bedTemp:this.state.bedTemp,img:this.state.img,nickname:this.state.nickname}}} id='measure-btn' className={this.state.isBleConnect?'btn flex show':'btn flex hide'} >踢被模式</Link>);
            conHistory=(<a href='health://skip_url/history.html' id='hsty-btn' className='btn flex' >历史数据</a>);
        }
        let data={
                    "appId":this.state.appId,
                    "deviceId":this.state.deviceId,
                    "userType":this.state.userType,
                    "memberId":this.state.memberId,
                };
         return (
            <div className='temp'>
            <section className='main'>
                {/*<header className='header'><span className='goback'></span><span className='title'>体温贴</span><img src="../static/img/ic-help.png" className='leftIcon help' alt='帮助'/></header>*/}                 
                 <header style={{'paddingTop':this.state.headerTop}}></header>
                 <Head nickname={this.state.nickname} img={this.state.img} memberId={this.state.memberId} />
                 <DeviceConnect dataTime={this.state.dataTime || (+new Date())} temp={this.state.temp} isBleConnect={this.state.isBleConnect} />
                {/*<DeviceConnect temp={this.state.temp} templist={this.state.tempArr}/>
                <Connectionfailed temp={this.state.temp} templist={this.state.tempArr}/>
                */}
                  <TempHint maxtemp={this.state.maxtemp || "--"} maxtime={this.state.maxtime || "--"} />
                {/*<Measure temp={this.state.temp} templist={this.state.tempArr}/>*/}
                
                {/*<Temperaturemodel temp={this.state.temp} templist={this.state.tempArr}/>*/}
            </section>
            <Echarts shield={true} timelist={this.state.timeArr} thermometerAlert={this.state.thermometerAlert} templist={this.state.tempArr} getdata={data} />
            {conMeasure}
            {conHistory}
            <Link className='flex' to='/guide' ref='toGuide' style={{opacity:0,width:0,height:0,display:'block'}}></Link>
        </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('小珂体温贴');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/measure" component={Measure} />
            <Route path="/details/:Id" component={MeasureDetails} />
            <Route path="/temperature" component={Temperaturemodel} />
            <Route path="/guide" component={Guide} />
        </Router>
    ), document.getElementById('ROOT'));
});