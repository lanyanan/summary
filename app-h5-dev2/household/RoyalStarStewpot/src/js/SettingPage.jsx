/**
 * Created by ben on 2016/12/6.
 */
/**
 * Created by ben on 2016/11/15.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {TimeSelect} from './TimeSelect.jsx';
const {Router, Route, hashHistory, Link} = ReactRouter;
import {Loading} from './Loading.jsx';
import Alert from './Alert.jsx';

var appData = {};

var modeArray = [
    //{id:0,name:'待机'},
    //{id:1,name:'待机'},
    {id:2,name:'营养汤',functimeset:70,minTime:45,maxTime:120},
    {id:3,name:'八宝粥',functimeset:90,minTime:45,maxTime:120},
    {id:4,name:'药膳',functimeset:60,minTime:45,maxTime:300},
    {id:5,name:'老火汤',functimeset:90,minTime:45,maxTime:120},
    {id:6,name:'五谷粥',functimeset:90,minTime:45,maxTime:120},
    {id:7,name:'甜品',functimeset:60,minTime:30,maxTime:120},
    {id:8,name:'乌鸡汤',functimeset:90,minTime:45,maxTime:120},
    {id:9,name:'砂锅粥',functimeset:60,minTime:45,maxTime:120},
    {id:10,name:'盐焗',functimeset:60,minTime:30,maxTime:120},
    {id:11,name:'老鸭汤',functimeset:90,minTime:45,maxTime:120},
    {id:12,name:'隔水炖',functimeset:60,minTime:45,maxTime:120},
    {id:13,name:'焖烧',functimeset:60,minTime:30,maxTime:120},
    {id:14,name:'大骨汤',functimeset:90,minTime:45,maxTime:120},
    {id:15,name:'婴儿粥',functimeset:60,minTime:60,maxTime:120},
    {id:16,name:'煲仔饭',functimeset:45,minTime:0,maxTime:300},
    {id:17,name:'营养饭',functimeset:35,minTime:0,maxTime:300},
    {id:18,name:'保温',functimeset:0,minTime:0,maxTime:300},
    //{id:19,name:'云菜单',heatinghour:0,heatingmin:20},

];

export class SettingPage extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            show:0,
            boot:0,
            function:2,
        };
        // 监听Store
        this.listenStore(Store);
        this.handleBack=this.handleBack.bind(this);
        this.selectMode=this.selectMode.bind(this);
        this.launchMode=this.launchMode.bind(this);
        this.submitClock = this.submitClock.bind(this);
        this.cancelClock = this.cancelClock.bind(this);
        this.openHeatingClock=this.openHeatingClock.bind(this);
        this.openSubscribeClock = this.openSubscribeClock.bind(this);
        this.childSetState = this.childSetState.bind(this);



    }
    handleBack(){
        history.back()
    }
    cancelClock(){
        //未传任何参数，trigger返回一个假值，关闭控件
        Actions.cancelSelect();
        //console.log('关闭')
    }
    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组
        let where = this.state.boot;
        let selectMode = this.state.function;
        Actions.submitSelect(h,m,where,selectMode);
        //console.log('选中的值',h,m);
        this.setState({
            selectshow:false,
            openSubscribeClock:false,
        })
    }
    //选择模式
    selectMode(e){
        console.log('进入模式选择方法');

        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        let items = modeArray  /*|| this.state.modeArray?this.state.modeArray:[]*/;
        //console.log('selectMode = '+selectMode);
        //console.log('items[selectMode-2]',items[selectMode-2]);
        //console.log('runtime',items[selectMode-2].functimeset);
        //TimeSelect.setFunciton(selectMode);

        appData.selectArray= {};
        appData.selectArray  = {
            function: selectMode,
            ordertimehour :0,
            ordertimemin :0,
            runtime:items[selectMode-2].functimeset,
        };
        //选择模式的默认参数用于本地维护，若发送到APP，用对应协议字段维护，会导致控件被不停隐藏，无法选中时间
        Actions.selectMode(appData.selectArray);

    }
    openSubscribeClock(e){
        console.log('选择预约时间');
        if(this.state.function !=18){
            //let where = parseInt(e.currentTarget.getAttribute('data-seat'));
            this.setState({
                openSubscribeClock:true,
                boot: 0,
            })
        }
    }
    openHeatingClock(e){
        console.log('选择加热时间方法');
        if(this.state.function !=18&&this.state.function !=16&&this.state.function !=17){
            //let where = parseInt(e.currentTarget.getAttribute('data-seat'));
            this.setState({
                selectshow:true,
                boot: 1,//设置位置，boot用作选择控件基础数据配置
            })
        }
    }
    launchMode(e){
        console.log('进入改变模式');
        //方式1 获取存到全局变量中的选中参数  VS  方式2 获取绑定到dom中的选中参数
        e.preventDefault();
        let _function = this.state.function!=undefined ? this.state.function: 2;
        let _ordertimehour = this.state.ordertimehour!=undefined ? this.state.ordertimehour: 0;
        let _ordertimemin = this.state.ordertimemin!=undefined ? this.state.ordertimemin: 0;
        let _runtime = this.state.runtime!=undefined? this.state.runtime: 70;

        let orderTime = _ordertimehour*60+_ordertimemin;
        console.log('_ordertimehour,_ordertimemin',_ordertimehour,_ordertimemin);
        //预约时间小于运行时间的时候,直接启动
        if (orderTime<=_runtime&&(_ordertimehour!=0||_ordertimemin!=0)){
            this.setState({isShowAlert: true});
        }else{
            appData.sendArray ={
                //工作模式
                function:_function,
                //预约时间
                ordertimehour:_ordertimehour,
                ordertimemin:_ordertimemin,
                runtime:_runtime,
            };
            //if(this.state.selectHeatinghour==undefined&&this.state.selectHeatingmin==undefined){
            //    appData.sendArray.selectHeatinghour = 1;
            //}
            //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%',appData.sendArray);
            Actions.launchMode(appData.sendArray)

            let me = this;
            this.setState({
                show:true
            });
            setTimeout(()=>{
                this.setState({
                    show:false
                });
            },2000);
            setTimeout(()=>{
                window.history.back();
                //history.back();
            },1500);

        }

    }
    childSetState(state,fn){
        //预约中直接取消
        let _function = this.state.function!=undefined ? this.state.function: 2;
        let _ordertimehour =  0;
        let _ordertimemin =  0;
        let _runtime = this.state.runtime!=undefined? this.state.runtime: 70;
        appData.sendArray ={
            //工作模式
            function:_function,
            //预约时间
            ordertimehour:_ordertimehour,
            ordertimemin:_ordertimemin,
            runtime:_runtime,
        };
        this.setState({isShowAlert:state.isShowAlert});
        if(state.sure){
            Actions.launchMode({
                function:_function,
                //预约时间
                ordertimehour:_ordertimehour,
                ordertimemin:_ordertimemin,
                runtime:_runtime,
            });
            let me = this;
            this.setState({
                show:true
            });
            setTimeout(()=>{
                this.setState({
                    show:false
                });
            },2000);
            setTimeout(()=>{
                window.history.back();
                //history.back();
            },1500);
        }
    }

    render() {
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?'nav ios':'nav android';

        let selectMode = this.state.function? this.state.function:2;

        //let items = this.state.modeArray?this.state.modeArray:[];//拉取刷新第一个icon需要点击才能加载
        let items = {}
        items = modeArray;


        //预约时间
        let selectReservehour = this.state.ordertimehour!=undefined ? this.state.ordertimehour: 0;
        let selectReservemin =  this.state.ordertimemin!=undefined ? this.state.ordertimemin: 0;
        let selectHeatingmin =  this.state.runtime!=undefined ? parseInt(this.state.runtime):(selectMode==18?0:70);
        let selectReserveTxt = selectReservehour==0 ? (selectReservemin==0?'':selectReservemin+'分钟'):(selectReservemin==0?selectReservehour+'小时':selectReservehour+'小时'+selectReservemin+'分钟');
        let selectHeatingText;
        //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%selectHeatingmin',selectHeatingmin);
        if(selectHeatingmin/60 >= 1){
            selectHeatingText = parseInt(selectHeatingmin/60)+'小时'+(selectHeatingmin%60==0?'': selectHeatingmin%60+'分钟');
        }else{

            selectHeatingText = selectHeatingmin==0?'':selectHeatingmin+'分钟';
        }


        //选择控件参数
        let boot = this.state.boot!==''?this.state.boot:false;
        let selectshow = this.state.selectshow?this.state.selectshow:false;
        let openSubscribeClock = this.state.openSubscribeClock?this.state.openSubscribeClock:false;
        let selecttitle = ['预约时间','加热时间'][boot];
        let statusshow = [1,0][boot];
        let hourshow = [true,true][boot];
        let minuteshow= [true,true][boot];
        //最大小时
        //最大最小时间
        let maxTime = items[selectMode-2].maxTime;
        let minTime = items[selectMode-2].minTime;
        //let HotTimeArr = [0,1,2,3,4,5,6,7,8,9,10,11];
        //let minArr;
        //let maxArr;
        //if(minTime<60){
        //    minArr = 0;
        //}else{
        //    minArr = 1;
        //}
        //maxArr = maxTime/60;
        //if(selectMode!=16&&selectMode!=17){
        //    HotTimeArr = HotTimeArr.slice(HotTimeArr.indexOf(minArr),HotTimeArr.indexOf(maxArr)+1);
        //}
        //console.log('maxTimemaxTime:',maxTime,minTime,HotTimeArr);

        //let minminuteSelect;
        //if(selectMode==7||selectMode==10||selectMode==13){
        //    minminuteSelect=30;
        //}else if(selectMode==16||selectMode==17||selectMode==15){
        //    minminuteSelect=0;
        //}else{
        //    minminuteSelect=45;
        //
        //}
        //console.log("minminuteSelect@@@@@@@@@@@@@@@@",selectMode,minminuteSelect);

        //let maxhour = [14,8][boot];
        //let maxmin = [30,60][boot];
        //let minhour = [1,1][boot];
        //let minminute = [0,minminuteSelect][boot==undefined?0:boot];
        //let hourstep = [1,1][boot];
        //let minutestep = [30,1][boot];
        //let hourunit = '小时';
        //let minuteunit = '分钟';
        //let defaulthour = 0;
        //let defaultminute = 0;
        //let hourarray = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],HotTimeArr][boot];
        //let ArrayInit = true;//是否重置控件，以下判断防止选择中被数据流跳变
        //if(this.state.selectShow==false){
        //    ArrayInit= [true, true][boot];
        //}else{
        //    ArrayInit= [false, false][boot];
        //}
        //let statusname = ["后结束","开启"][boot];
        //console.log("minminuteminminuteminminute",minminute);
        let HeatingClockShow = (this.state.function==16 ||this.state.function==17||this.state.function==18) ?{opacity:.5}:{opacity:1};

        //直接启动提醒
        let title = '取消提醒';
        let message = '预约完成时间小于加热时间,直接进入工作模式？';

        return(
            <section className="setting-page">
                <nav className={navigation}><i className="back" onTouchStart={this.handleBack} ></i><span>模式</span></nav>
                <dl className="flex mode-items">
                    {items.map(function(o) {
                        return(
                            <dd className={'mode'+ ( o.id == selectMode ? ' on':'') }
                                data-mode={o.id}
                                onClick={this.selectMode}
                                style={{'display':o.id==0?'none':'auto','backgroundImage': 'url(../static/img/m-'+o.id+( o.id == selectMode ? '-on':'-off')+'.png)'}} key={o.id}>
                                {o.name}
                            </dd>
                        )
                    }.bind(this))}
                </dl>
                <dl className="flex set" data-seat="0" onTouchStart={this.openSubscribeClock} style={this.state.function!=18?{opacity:1}:{opacity:.5}}>
                    <dd className="flex-cell tal">预约结束时间</dd>
                    <dd className="flex-cell tar">
                        <span>{selectReserveTxt}</span>
                        <i></i>
                    </dd>
                </dl>
                <dl className="flex set" data-seat="1" onTouchStart={this.openHeatingClock} style={HeatingClockShow}>
                    <dd className="flex-cell tal">加热时间</dd>
                    <dd className="flex-cell tar">
                        <span>{selectHeatingText}</span>
                        <i></i>
                    </dd>
                </dl>
                <h2 className="toggle-mode" onTouchStart={this.launchMode}>
                    <span>启动</span>
                </h2>
                <Loading show={this.state.show}/>
                <TimeSelect
                    show={openSubscribeClock}
                    title={'预约时间'}
                    statusshow={1}

                    hourshow={true}
                    hourstep ={1}
                    hourunit={'小时'}
                    minhour={1}
                    maxhour={23}

                    minuteshow={true}
                    minutestep={30}
                    minuteunit={'分钟'}
                    minminute ={0}
                    maxmin={30}

                    defaulthour={0}
                    defaultminute={0}
                    cancelClock={this.cancelClock}
                    submitClock={this.submitClock}
                    hourarray={[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}
                    ArrayInit={false}
                    statusname={"后结束"}
                />
                <TimeSelect
                    show={selectshow}
                    title={'加热时间'}
                    statusshow={0}

                    hourshow={false}
                    hourstep ={1}
                    hourunit={'小时'}
                    minhour={1}
                    maxhour={8}

                    minuteshow={true}
                    minutestep={15}
                    minuteunit={'分钟'}
                    minminute ={minTime}//minminuteSelect
                    maxmin={maxTime}

                    defaulthour={0}
                    defaultminute={0}
                    cancelClock={this.cancelClock}
                    submitClock={this.submitClock}
                    hourarray={[0]}
                    ArrayInit={true}
                    statusname={'开启'}
                />
                {this.state.isShowAlert ?<Alert  title={title} message={message} childSetState={this.childSetState} />:''}
            </section>
        )
    }
}



