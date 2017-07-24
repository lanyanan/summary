import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
/*import {SimpleCalendar, utils} from 'react-easy-calendar';
*/
import {TempHint} from './TempHint.es6';
import {Echarts} from './Echarts.es6';
import {Clndr} from './Calendar.es6';


var {Router, Route, hashHistory} = ReactRouter;


// 创建React组件
export class History extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        this.state = {timeArray:["00:00"],
                    tempArray:['37'],
                    changeDate:'',
                    appId:'10121',
                    deviceId:'2424E174512F346383505636A727C812',
                    userType:'3',
                    memberId:'0',
                    headerTop:isAndroid?50:64};
        this.listenStore(Store); // 监听Store
    }
    render() {
        let temp = this.state.temp;
        let temptip,tempComfor;
        if(temp<37.5&&temp<=38){
            temptip = "低热";
            tempComfor = false;
        }else if(temp>=38.1&&temp<=39){
            temptip = "中度热";
            tempComfor = false;
        }else if(temp>=39.1&&temp<=40.4){
            temptip = "高热";
            tempComfor = false;
        }else if(temp>=40.5){
            temptip = "超高热";
            tempComfor = false;
        }else{
            temptip = "舒适";
            tempComfor = true;
        }

        let data={
                    "appId":this.state.appId,
                    "deviceId":this.state.deviceId,
                    "userType":this.state.userType,
                    "memberId":this.state.memberId,
                };
                // console.log('data',data);
        return (  
            <div className='history temp'>
                
                <section className='main'>
                    {/*  <header className='header'><a className='goback' href='javascript:history.back(-1);'></a><span className='title'>历史数据</span><img src="../static/img/ic-share.png" className='leftIcon share' alt='分享'/></header>
                     */}
                    {/* <header style={{'paddingTop':this.state.headerTop}}></header>*/}
                    <Clndr  getdata={data} />

                </section>
            <p className="tempOneTime">一小时内最高体温<em>{this.state.temp}</em><b>°C</b><label className={tempComfor?"lab his-green":'lab his-red'}>{temptip}</label><span className="temp-time">10:11:1</span><i></i></p>
            <div className="hisdata">
                <span className="span-right span-back span-lf-radius">1小时</span>
                <span>6小时</span>
                <span className="span-left span-rf-radius">24小时</span>
            </div>
            <Echarts timelist={this.state.timeArray} templist={this.state.tempArray} getdata={data}/>
        </div>
        );
    }
    componentDidMount(){
        let _this=this;
        let timelist = [],templist=[];
        let url="http://200.200.200.50/v1/app/chealth/thermometer/getThermometerByMiniute";
        let data = {
            accessToken:"15a6d8bd3e1541ccb26d9ebfa0358806",
            appId:"10121",
            date:"2016-11-29",
            deviceId:"2424E174512F346383505636A727C812",
            memberId:"0",
            timestamp:+new Date()+"",
            userType:"3"
        };
        het.get(url,data,(dt)=>{
            var data=JSON.parse(dt),
                date=data.data.data;
                console.log(date);
            for (var i in date){
                /*let time=Funs.dateFormatFull(data[i].key,"-",1);时间戳处理*/
                /*let time=date[i].key.substring(11,16), */
                //utc要改为本地时间
                let utcDay= date[i].key.split(' '),
                    utcDate=utcDay[0].split('-'),
                    utcTime=utcDay[1].split(':'),
                    timetamp=Math.round(Date.UTC(utcDate[0],utcDate[1]-1,utcDate[2],utcTime[0],utcTime[1],utcTime[2])/1000),
                    time=Funs.dateFormatFull(timetamp,"-",1),
                    temp=date[i].value<34?'34':(date[i].value>42?'42':date[i].value);
                timelist.push(time);
                templist.push(temp);
                // console.log(timetamp);
            }
            _this.setState({
               timeArray : timelist,
               tempArray : templist
            });
        },(b)=>{console.log('error',b)});
    }
}
