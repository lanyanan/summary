/**
 * Created by ben on 2017/2/27.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Echarts} from './Echarts.jsx';
import {Clndr} from './Calendar.jsx';
import {Funs} from '../../../common/src/fun.es6';
import {TimeSelect} from './TimeSelect.jsx';
const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};

// 创建React组件
export default class CheckGraph extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            mode:0,
            selectshow:false,
            requestCount:0
        };
        het.setTitle(JSON.stringify({setNavTitle:1,title:'实时功率',setNavRightBtnHiden:1}));
        //Actions.local();
        //Store.listen((data)=>this.setState(data)); // 监听Store
        this.listenStore(Store);
        this.dataSelect = this.dataSelect.bind(this);
        this.submitClock = this.submitClock.bind(this);
        this.cancelClock = this.cancelClock.bind(this);
        this.getRequstPowerList = this.getRequstPowerList.bind(this);
    }
    getRequstPowerList(CurrentSelect){
        let selectDate='';
        //console.log('步骤2');
        if(CurrentSelect!=undefined){
            selectDate = CurrentSelect.replace('年','-');
            selectDate = selectDate.replace('月','-');
            selectDate = selectDate.replace('日','');
            //console.log('替换的选择日期',selectDate);
            let that = this;
            /*请求冰箱功率的列表
            返回结果:
             {"code": 0,"data": [{"avgPower":70,"createTime":"2017-02-23 08:35"}]}
             */
            het.get('/v1/app/customization/fridge/hetFridge/getPowerList', {'date':selectDate,'deviceId':this.state.deviceId}, function(e){
                //console.log("成功",e);
                let dataArr = JSON.parse(e).data;
                let powerArr=[];
                let _powerlist = [];
                let _maxPower = '0';
                let _maxPowerTime ='00:00';
                let _minPower= '0';
                let _minPowerTime = '00:00';
                if(dataArr.length>0){
                    for(let i = 0; i<dataArr.length;i++){

                        //chart  功率的数值数组
                        powerArr.push(dataArr[i].avgPower);

                        //chart 功率的时间数组
                        //let tiemArr = dataArr[i].createTime.split(" ");
                        //_powerlist.push(tiemArr[1]);


                        //let createdddTime = Funs.dateFormat(dataArr[i].createTime,' yyyy-MM-dd hh:mm ',true);
                        //
                        //_powerlist.push(createdddTime);
                        var ddddd = dataArr[i].createTime;
                        let createdddTime = Funs.dateFormat(ddddd,'yyyy-MM-dd hh:mm',true);
                        createdddTime = (createdddTime.split(" "))[1];
                        _powerlist.push(createdddTime);
                        //console.log('createdddTime',createdddTime,'原来的时间',ddddd);

                    }
                    //console.log('1. powerlist/powerArr',_powerlist,powerArr);

                    //最大功率   具体时间
                    _maxPower = Math.max.apply(null, powerArr);
                    let _maxPowerIndex = powerArr.indexOf(_maxPower);
                    _maxPowerTime = dataArr[_maxPowerIndex].createTime;
                    if(_maxPowerTime.length>5){
                        if(_maxPowerTime.split(" ").length ==2){
                            _maxPowerTime = Funs.dateFormat(_maxPowerTime,'yyyy-MM-dd hh:mm',true);
                            _maxPowerTime = (_maxPowerTime.split(" "))[1];
                        }
                    }

                    //最小功率   具体时间
                    _minPower = Math.min.apply(null, powerArr);
                    let _minPowerIndex = powerArr.indexOf(_minPower);
                    _minPowerTime = dataArr[_minPowerIndex].createTime;
                    //_minPowerTime =( _minPowerTime.split(" "))[1];
                    //console.log("_minPowerTime 之前",_minPowerTime);
                    if(_minPowerTime.length>5){
                        if(_minPowerTime.split(" ").length ==2){
                            _minPowerTime = Funs.dateFormat(_minPowerTime,'yyyy-MM-dd hh:mm',true);
                            _minPowerTime = (_minPowerTime.split(" "))[1];
                        }
                    }

                }


                //{value:['2016/12/18 6:38:08', 80]},dataArr "data": [{"avgPower":70,"createTime":"2017-02-23 08:35"}]

                //console.log("输出的值",_maxPower,_maxPowerTime,_minPower,_minPowerTime);
                that.setState({"maxPower":_maxPower,"maxPowerTime":_maxPowerTime,"minPower":_minPower,"minPowerTime":_minPowerTime,"powerArr":[_powerlist,powerArr]});

                //console.log("最大的值",Math.max.apply(null, powerArr),powerArr.indexOf(Math.max.apply(null, powerArr)));
            }, function(e){
                console.log("失败",e);
            });

        }
    }
    dataSelect(){
        //console.log('日期选择');
        this.setState({
            selectshow:true,
        });
    }
    cancelClock(){
        //未传任何参数，trigger返回一个假值，关闭控件
        Actions.cancelSelect();
        //console.log('关闭')
    }
    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组
        //let where = this.state.boot;
        let selectMode = this.state.function;
        //Actions.submitSelect(h,m,where,selectMode);
        //console.log('选中的值',h,m);
        this.setState({
            selectshow:false,
            selectData:m,

        });
        //var myDate = new Date();
        //var mytime=myDate.toLocaleTimeString(); //获取当前时间
        //console.log('当前事件',myDate.toLocaleString()); //获取日期与时间  当前事件 2017年3月1日 GMT+8 16:14:05
        this.getRequstPowerList(m);
    }

    render() {
        //console.log('步骤1');
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'nav ios':'nav android';
        if(this.state.deviceId!=null
            &&this.state.requestCount==0){
            this.state.requestCount=1;
            //console.log('进入加载流程  ',this.state.deviceId);
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            this.getRequstPowerList(year+'年'+month+'月'+day+'日');
        }

        let selectshow = this.state.selectshow?this.state.selectshow:false;
        let maxTime = 100;
        let minTime = 10;
        //alert(year+'年'+month+'月'+day+'日 '+hour':'+minute+':'+second)
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let today = this.state.selectData||year+'年'+month+'月'+day+'日' ;

        let maxPower = this.state.maxPower||0;
        let maxPowerTime = this.state.maxPowerTime||'05:00';
        let minPower = this.state.minPower||0;
        let minPowerTime = this.state.minPowerTime||'15:00';

        let powerArr = this.state.powerArr||[];
        //console.log("输产品出的值",powerlist.length);

        //console.log("输产品出的值",this.state.maxPower,this.state.maxPowerTime,this.state.minPower,this.state.minPowerTime);

        return <section className="checkGraph-page">
            <nav className={navigation}></nav>
            <div className ="downView">
                <div className = "textContent flex">
                    <span className="flex-cell" >
                        <div className = "flexCell-center">
                            <h5 style={{ fontSize:'1.5rem',color:'#969696',textAlign:'center'}}>最高</h5>
                            <div style = {{textAlign:'center',position:'relative',top:'0'}}>
                                <i style={{ fontSize:'6rem',color:'#717171'}}>{maxPower}</i>
                                <i style={{ fontSize:'2rem',color:'#717171'}}>W</i>
                            </div>
                            <div style = {{textAlign:'center',position:'relative'}}>
                                <i style={{ fontSize:'1.5rem',color:'#969696'}}>时间 :</i>
                                <i style={{ fontSize:'1.5rem',color:'#969696'}}>{maxPowerTime}</i>
                            </div>
                        </div>
                    </span>
                    <span className="flex-cell">
                        <div className = "flexCell-center" >
                            <h5 style={{ fontSize:'1.5rem',color:'#969696',textAlign:'center'}}>最低</h5>
                            <div style = {{textAlign:'center'}}>
                                <i style={{ fontSize:'6rem',color:'#717171'}}>{minPower}</i>
                                <i style={{ fontSize:'2rem',color:'#717171'}}>W</i>
                            </div>
                            <div style = {{textAlign:'center'}}>
                                <i style={{ fontSize:'1.5rem',color:'#969696'}}>时间 :</i>
                                <i style={{ fontSize:'1.5rem',color:'#969696'}}>{minPowerTime}</i>
                            </div>
                        </div>
                    </span>
                </div>
                <div className = "GraphChart">
                    <Echarts  powerArr={powerArr}/>
                </div>
                <div className = "dataSelect" onClick={this.dataSelect}><i className="dataText"/>{today}</div>
            </div>
            <TimeSelect
                show={selectshow}
                title={'日期选择'}
                statusshow={0}

                hourshow={false}
                hourstep ={1}
                hourunit={'小时'}
                minhour={1}
                maxhour={8}

                minuteshow={true}
                minutestep={15}
                minuteunit={'分钟'}
                //minminute ={minTime}//minminuteSelect
                //maxmin={maxTime}


                cancelClock={this.cancelClock}
                submitClock={this.submitClock}
                hourarray={[0]}
                ArrayInit={true}
                statusname={'开启'}
            />
            </section>
    }
}
//<Echarts timelist={this.state.timeArray} templist={this.state.tempArray}/>
//<div className = "GraphChart"></div>
//<div className = "dataSelect"></div>

