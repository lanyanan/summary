 import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
/*import {SimpleCalendar, utils} from 'react-easy-calendar';
*/
import {Echarts} from './Echarts.es6';
import {Clndr} from './Calendar.es6';


var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    // console.log('readyData',data);
    Actions.repaint(data);
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class History extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {timeArray:[],
                    tempArray:[],
                    changeDate:'',
                    appId:'',
                    deviceId:'',
                    userType:'',
                    memberId:'',
                    index:2,
                    headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    changeData(e){
        let value = e.target.getAttribute('data-index');
        if(value==this.state.index) return;
        this.setState({ index : value});
        // if(value==0){
        //     this.setState({
        //        tempArray : this.state.oneTempArray,
        //        timeArray : this.state.oneTimeArray,
        //        index : value
        //     });
        // }else if(value==1){
        //     this.setState({
        //        tempArray : this.state.sixTempArray,
        //        timeArray : this.state.sixTimeArray,
        //        index : value
        //     });
        // }else if(value==2){
        //     this.setState({
        //        tempArray : this.state.initTempArray,
        //        timeArray : this.state.initTimeArray,
        //        index : value
        //     });
        // }
        // if(this.state.initTimeArray instanceof Array && this.state.initTempArray instanceof Array){
        //     if(value==2){
        //         this.setState({
        //            tempArray : this.state.initTempArray,
        //            timeArray : this.state.initTimeArray,
        //            index : value
        //         });
        //         return;
        //     }
        //     let length = this.state.initTimeArray.length;
        //     let hour = new Date().getHours();
        //     let newTempArray = [];
        //     let newTimeArray = [];
        //     let step = value == 1 ? 6 : 1;
        //     this.state.initTimeArray.map((item,index)=>{
        //         let arr = item.split(':');
        //         //console.log('arr',arr[0]);
        //         if(arr[0]>=(hour-step)&&arr[0]<hour){
        //             newTimeArray.push(item);
        //             newTempArray.push(this.state.initTempArray[index]);
        //         }
        //     });
        //     this.setState({
        //        tempArray : newTempArray,
        //        timeArray : newTimeArray,
        //        index:value
        //     });
        // }
    }
    componentWillUpdate(nextProps, nextState) {
        // let tempArray = nextState.tempArray.length>0?nextState.tempArray: [0];
        // let maxtemp = Math.max.apply(null,tempArray);
        // if(maxtemp!=this.state.maxtemp){
        //     let index = tempArray.indexOf(maxtemp)>-1?tempArray.indexOf(maxtemp):tempArray.indexOf(''+maxtemp);
        //     let maxtime = nextState.timeArray[index];
        //     this.setState({
        //         maxtemp:maxtemp,
        //         maxtime:maxtime
        //     });
        // }
    }
    render() {
        let data={
                    "appId":this.state.appId,
                    "deviceId":this.state.deviceId,
                    "userType":this.state.userType,
                    "memberId":this.state.memberId,
                };
        let index = this.state.index || 2;
        let maxtemp = this.state.highestThermometer || 0;
        let maxtime = this.state.dateTime ? Funs.dateFormat(this.state.dateTime,'hh:mm:ss',true) : 0;
        let temphint = this.state.description || "--";
        // if(maxtemp>=37.5 && maxtemp<=38) temphint = "低热";
        // if(maxtemp>38 && maxtemp<=39) temphint = "中度热";
        // if(maxtemp>39 && maxtemp<=40.5) temphint = "高热";
        // if(maxtemp>40.5) temphint = "超高热";
        let timeArray = (this.state.timeArray instanceof Array && this.state.timeArray.length>0)? this.state.timeArray : ["00:00"];
        let tempArray = (this.state.tempArray instanceof Array && this.state.tempArray.length>0)? this.state.tempArray : ['34'];

        /*echart x轴 y轴参数处理*/
        let hh=0,mm=0,ii=0,dd='',new_tempArray=[],new_timeArray=[];
        for (let mm = 0; mm < 61 && hh < 24; mm++) {
            if (mm == 60) {
                hh++;
                mm = 0;
            }
            dd = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm);
            new_timeArray.push(dd);
        }
        for(let i=0 ;i<24*60;i++){
            new_tempArray.push('');
        }
        for(var s in new_timeArray){
            for(var x in timeArray){
                if(new_timeArray[s]==timeArray[x]){
                    new_tempArray[s] = tempArray[x];
                }
            }
        }

        return (
            <div className='history'>
            
           <section className='main'>
            {/*  <header className='header'><a className='goback' href='javascript:history.back(-1);'></a><span className='title'>历史数据</span><img src="../static/img/ic-share.png" className='leftIcon share' alt='分享'/></header>
             */}
            <header style={{'paddingTop':this.state.headerTop}}></header>
            <Clndr  getdata={data} />
            <p className="tempOneTime flex">今日最高体温<em>{maxtemp || '--'}<b>°C</b></em><label className={maxtemp>38?'lab his-red':'lab his-green'}>{temphint || '--'}</label><span className="temp-time"><i></i>{maxtime || '--'}</span></p>
            <div className="hisdata" onTouchEnd={this.changeData.bind(this)}>
                <span data-index={0} className={index==0?"span-right span-back span-lf-radius":"span-right span-lf-radius"}>1小时</span>
                <span data-index={1} className={index==1?"span-back":""}>6小时</span>
                <span data-index={2} className={index==2?"span-left span-back span-rf-radius":"span-left span-rf-radius"} >24小时</span>
            </div>
            </section>
            <Echarts timelist={new_timeArray} thermometerAlert={this.state.thermometerAlert} templist={new_tempArray} getdata={data}  tabIndex={this.state.index} timeArray={timeArray} />
        </div>
        );
    }
    componentDidMount(){
        let _this=this;
        setTimeout(function(){
            let data={
                    "appId":_this.state.appId,
                    "deviceId":_this.state.deviceId,
                    "userType":_this.state.userType,
                    "memberId":_this.state.memberId,
                },
            today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
            Actions.changeDate(today,data);
        },3000);
        // setTimeout(function(){
        //     alert(JSON.stringify(_this.state));
        //     let data={
        //             "appId":_this.state.appId,
        //             "deviceId":_this.state.deviceId,
        //             "userType":_this.state.userType,
        //             "memberId":_this.state.memberId,
        //         },
        //     today=Funs.dateFormatFull(new Date().getTime()/1000,'-');
        //     Actions.changeDate(today,data);
        // },4000);
    }
}
// 开始渲染
het.domReady(()=>{
    het.setTitle('历史数据');
    // 无路由方式
     ReactDOM.render(<History />, document.getElementById('ROOT'));

   /* // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});