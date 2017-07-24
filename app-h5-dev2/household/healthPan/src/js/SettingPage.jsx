import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.jsx';
import {Loading} from './Loading.jsx';
const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {};
export class SettingPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectMode:1,
            selectHeatinghour:0,
            selectHeatingmin:0,
            selectFire:0,
            selectReservehour:0,
            selectReservemin:0
        };
        Actions.local();
        this.listenStore(Store);
        this.openClock = this.openClock.bind(this);
        this.cancelClock = this.cancelClock.bind(this);
        this.submitClock = this.submitClock.bind(this);
        this.selectMode = this.selectMode.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }
    componentWillMount(){
        het.setTitle(JSON.stringify({
            setNavTitle:1,
            title:'模式',
            setNavRightBtnHiden:1
        }));
    }
    openClock(e){
        let where = parseInt(e.currentTarget.getAttribute('data-seat'));
        this.setState({
            selectshow:true,
            boot: where,//设置位置，boot用作选择控件基础数据配置
        })
    }
    cancelClock(){
        Actions.cancelSelect();
    }
    submitClock(h,m){
        //传入选择控件选中的小时数组和分钟数组
        let where = this.state.boot;
        Actions.submitSelect(h,m,where);
        this.setState({
            selectshow:false,
        })
    }
    selectMode(e){
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        let modeArray = [
            {id:0,name:'模式',fire:'文火',},
            {id:1,name:'火锅',fire:'武火',heatinghour:0,heatingmin:0},
            {id:2,name:'蒸鱼',fire:'武火',heatinghour:0,heatingmin:15},
            {id:3,name:'蒸蛋',fire:'武火',heatinghour:0,heatingmin:16},
            {id:4,name:'包子',fire:'武火',heatinghour:0,heatingmin:18},
            {id:5,name:'馒头',fire:'武火',heatinghour:0,heatingmin:22},
            {id:6,name:'排骨',fire:'武火',heatinghour:0,heatingmin:24},
            {id:7,name:'蒸饭',fire:'武火',heatinghour:0,heatingmin:35},
            {id:8,name:'保温',fire:'文火',heatinghour:1,heatingmin:0},
            {id:9,name:'自定时',fire:'武火',heatinghour:0,heatingmin:20},
            //{id:10,name:'云菜单',fire:'文火'},
        ];
        let items = modeArray  /*|| this.state.modeArray?this.state.modeArray:[]*/;
        //火力有坑，单独维护，0x00 武火，0x01 文火，除待机和保温发文火其他都发武火，但不置位，只有火锅模式下才加入置位
        let selectFire = (selectMode != 0 &&  selectMode != 8) ? 0:1;
        appData.selectArray= {};
        appData.selectArray  = {
            selectMode: selectMode,
            selectReservehour :0,
            selectReservemin :0,
            selectFire: selectFire,
            selectHeatinghour:items[selectMode].heatinghour,
            selectHeatingmin:items[selectMode].heatingmin,
        };
        //选择模式的默认参数用于本地维护，若发送到APP，用对应协议字段维护，会导致控件被不停隐藏，无法选中时间
        Actions.selectMode(appData.selectArray);
    }
    changeMode(e){
        //方式1 获取存到全局变量state中的选中参数  VS  方式2 获取绑定到dom中的选中参数
        e.preventDefault();
        het.setTitle('{"hideNativeLoading":"true"}');
        appData.sendArray ={
            GongZuoMoShiSheZhi: this.state.selectMode,
            YuYueShiJianSheZhiXiaoShi: this.state.selectReservehour,
            YuYueShiJianSheZhiFenZhong: this.state.selectReservemin,
            HuoLiSheZhi: this.state.selectFire,
            JiaReShiJianSheZhiXiaoShi: this.state.selectHeatinghour,
            JiaReShiJianSheZhiFenZhong: this.state.selectHeatingmin,
        };
        Actions.changeMode(appData.sendArray);
        this.setState({
            loadingShow:true
        });
        setTimeout(()=>{
            this.setState({
                loadingShow:false
            });
        },4000)
        setTimeout(()=>{
           history.back();
        },5000);
    }
    render() {
        //导航栏:{ios:73,android:64}
        let isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
        let navigation = isIOS ?' ios':' android';
        //模式选择
        let modeArray = [
            {id:0,name:'模式',fire:false,},
            {id:1,name:'火锅',fire:'武火',},
            {id:2,name:'蒸鱼',fire:false,heatinghour:0,heatingmin:15},
            {id:3,name:'蒸蛋',fire:false,heatinghour:0,heatingmin:16},
            {id:4,name:'包子',fire:false,heatinghour:0,heatingmin:18},
            {id:5,name:'馒头',fire:false,heatinghour:0,heatingmin:22},
            {id:6,name:'排骨',fire:false,heatinghour:0,heatingmin:24},
            {id:7,name:'蒸饭',fire:false,heatinghour:0,heatingmin:35},
            {id:8,name:'保温',fire:false,heatinghour:1,heatingmin:0},
            {id:9,name:'自定时',fire:false,heatinghour:0,heatingmin:20},
            //{id:10,name:'云菜单',fire:'小火'},
        ];
        let items = this.state.modeArray?this.state.modeArray:[];//拉取刷新第一个icon需要点击才能加载,使用store里传过来的数组不可以
            items = modeArray;
        let slide =this.state.slide?' slide-up':' slide-down';
        let selectMode = this.state.selectMode? this.state.selectMode:1;
        //选择控件参数
        let boot = this.state.boot!==''?this.state.boot:false;
        let selectshow = this.state.selectshow?this.state.selectshow:false;
        let selecttitle = ['预约时间','火力','加热时长'][boot];
        let statusshow = [1,0,0][boot];
        let hourshow = [true,true,true][boot];
        let minuteshow= [true,false,false][boot];
        let maxhour = [14,false,60][boot];
        let maxmin = [45,false,0][boot];
        let minhour = [1,0,1][boot];
        let minminute = [0,false,false][boot];
        let hourstep = [15,false,1][boot];
        let minutestep = [15,false,false][boot];
        let hourunit = ['小时','火','分钟'][boot];
        let minuteunit = '分钟';
        let defaulthour = 0;
        let defaultminute = 0;
        let hourarray = [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],['武','文'],false][boot];
        let ArrayInit = this.state.selectshow == false ? true:false;

        //控件样式
        let selectReserveCss = selectMode != 1 && selectMode!=8 ? 'flex set':'flex set disabled';
        let selectFireCss    = selectMode != 1 ? 'flex set disabled':'flex set';
        let selectHeatingCss = selectMode != 1 && selectMode!=8 ? 'flex set':'flex set disabled';
        //选中的值和默认值
        let selectReservehour = this.state.selectReservehour!=undefined ? this.state.selectReservehour: 0;
        let selectReservemin =  this.state.selectReservemin!=undefined ? this.state.selectReservemin: 0;

        let selectHeatinghour = this.state.selectHeatinghour!=undefined ? parseInt(this.state.selectHeatinghour): 0;
        let selectHeatingmin =  this.state.selectHeatingmin!=undefined ? parseInt(this.state.selectHeatingmin): 15;

        let selectReserveTxt = selectReservehour==0 ? (selectReservemin==0?'0分钟':selectReservemin+'分钟'):selectReservehour+'小时'+selectReservemin+'分钟';
        let selectFireTxt = selectMode==1 ? (this.state.selectFire!=undefined ? (['武火','文火'][this.state.selectFire]): '武火'):<img src="../static/img/i-no-data.png"/>;
        let selectHeatingTxt = selectHeatinghour==0 ? (selectHeatingmin==0?0:selectHeatingmin+'分钟'):selectHeatinghour+'小时'+selectHeatingmin+'分钟';

            if(selectMode == 1) selectReserveTxt=<img src="../static/img/i-no-data.png"/>,selectHeatingTxt=<img src="../static/img/i-no-data.png"/>;
            if(selectMode == 8) selectReserveTxt=<img src="../static/img/i-no-data.png"/>;
        //选择控件事件
        let openClockReserve = selectMode!=1 && selectMode!=8 ? this.openClock:'';
        let openClockFire    = selectMode!=1 ? '':this.openClock;
        let openClockHeating = selectMode!=1 && selectMode!=8 ? this.openClock:'';
        //离线&故障
        let online = this.state.online ?this.state.online:1;
        let networkavailable = this.state.networkavailable ?this.state.networkavailable:1;
        let hightemperature = this.state.hightemperature?this.state.hightemperature:0;
        let dryburning = this.state.dryburning?this.state.dryburning:0;
        let opencircuit = this.state.opencircuit ?this.state.opencircuit:0;
        let shortcircuit = this.state.shortcircuit ?this.state.shortcircuit:0;
            if(online==2|| networkavailable ==2 || hightemperature==1 || dryburning == 1 || opencircuit == 1 || shortcircuit ==1 ) {
                if(selectshow==true) this.state.selectshow = false;
                setTimeout(()=>{history.back()},1000)
            }
        //菊花
        let loadingShow = this.state.loadingShow?this.state.loadingShow:false;
        //H5导航条
        //<nav className={navigation}><i className="back" onTouchStart={this.handleBack}></i><span>模式</span></nav>
        return(
            <section className={'setting-page' +navigation}>
                <dl className="flex mode-items">
                    {items.map(function(o) {
                        return(
                            <dd style={{'display':o.id==0?'none':'auto','backgroundImage': 'url(../static/img/mode/m-'+o.id+( o.id == selectMode ? '-on':'-off')+'.png)'}}
                                className={'mode'+ ( o.id == selectMode ? ' on':'')} key={o.id}
                                data-mode={o.id}
                                onClick={this.selectMode}>
                                {o.name}
                            </dd>
                        )
                    }.bind(this))}
                </dl>
                <dl className={selectReserveCss} data-seat="0" onTouchStart={openClockReserve}>
                    <dd className="flex-cell tal">预约时间</dd>
                    <dd className="flex-cell tar">
                        <span>{selectReserveTxt}</span>
                        <i></i>
                    </dd>
                </dl>
                <dl className={selectFireCss} data-seat="1" onTouchStart={openClockFire}>
                    <dd className="flex-cell tal">火力</dd>
                    <dd className="flex-cell tar">
                        <span>{selectFireTxt}</span>
                        <i></i>
                    </dd>
                </dl>
                <dl className={selectHeatingCss} data-seat="2" onTouchStart={openClockHeating}>
                    <dd className="flex-cell tal">加热时间</dd>
                    <dd className="flex-cell tar">
                        <span>{selectHeatingTxt}</span>
                        <i></i>
                    </dd>
                </dl>
                <Loading show={loadingShow}/>
                <TimeSelect
                    show={selectshow}
                    title={selecttitle}
                    statusshow={statusshow}

                    hourshow={hourshow}
                    hourstep ={hourstep}
                    hourunit={hourunit}
                    minhour={minhour}
                    maxhour={maxhour}

                    minuteshow={minuteshow}
                    minutestep={minutestep}
                    minuteunit={minuteunit}
                    minminute ={minminute}
                    maxmin={maxmin}

                    defaulthour={defaulthour}
                    defaultminute={defaultminute}
                    cancelClock={this.cancelClock}
                    submitClock={this.submitClock}
                    hourarray={hourarray}
                    ArrayInit={ArrayInit}
                />
                <h2 className="toggle-mode" onTouchStart={this.changeMode}>启动</h2>
            </section>
        )
    }
}