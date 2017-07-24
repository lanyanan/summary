/**
 * Created by ben on 2016/12/5.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});
// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode:0,
            isShowAlert:false,
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.changeMode = this.changeMode.bind(this);
        this.liveError = this.liveError.bind(this);
        this.isSelect = this.isSelect.bind(this);
    };
    changeMode(e){
        //出来操作
        if(this.liveError()){het.toast(this.liveError());return false;}
        e.preventDefault();
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log('-----selectMode---'+selectMode);
        //let modeConfig = [
        //    {mode:1,name:'大骨汤',fire:1,heatinghour:0,heatingmin:35},
        //    {mode:2,name:'婴儿粥',fire:1,heatinghour:0,heatingmin:22},
        //    {mode:3,name:'煲仔饭',fire:1,heatinghour:0,heatingmin:24},
        //    {mode:4,name:'营养饭',fire:1,heatinghour:0,heatingmin:18},
        //];
        switch (selectMode){
            case 1: appData.selectMode = 14,appData.functimeset = 90;break;
            case 2: appData.selectMode = 15,appData.functimeset = 60;break;
            case 3: appData.selectMode = 16,appData.functimeset = 45;break;
            case 4: appData.selectMode = 17,appData.functimeset = 35;break;
        };
        appData.sendArray ={
            function:appData.selectMode,
            //预约时间
            ordertimehour:0,
            ordertimemin:0,
            //工作时间
            runtime:appData.functimeset,
        };
        Actions.launchMode(appData.sendArray);
        this.setState({
            modeName:'adsa'/*modeConfig[selectMode].name*/
        })
        console.log('-----快捷模式--------------',appData.sendArray);
    };
    liveError(){
        if(this.state.online==2){
            return '设备与APP已断开连接！';
        }
        if(this.state.networkavailable==2){
            return '当前网络不可用！';
        }
        if(this.state.opencircuit==1){
            return '主人，请与售后联系，电话：400-777-2009';
        }
        if(this.state.shortcircuit==1){
            return '主人，请与售后联系，电话：400-777-2009';
        }
        return false;
    };
    isSelect(){
        //let workStatus = this.state.mode!=undefined ? this.state.mode:0;
        //let online = this.state.online!=undefined?this.state.online:1;//是否在线  1在线  2离线
        //let networkavailable =this.state.networkavailable!=undefined?this.state.networkavailable:1;
        //let sensorflag = this.state.sensorflag!=undefined?this.state.sensorflag:1;
        //let runningOk = (online!=2 && networkavailable!=2 && sensorflag!=1) ? true:false;
        //if(runningOk && workStatus == 0 ){
        //    return true;
        //}
        //return false;
    };
    render() {
        //离线&故障
        let online = this.state.online!=undefined?this.state.online:1;//是否在线  1在线  2离线
        let networkavailable =this.state.networkavailable!=undefined?this.state.networkavailable:1;
        let sensorflag = this.state.sensorflag!=undefined?this.state.sensorflag:1;
        //故障时样式
        let runningOk = (online!=2 && networkavailable!=2 && sensorflag==1) ? true:false;
        //状态和模式
        let mode = this.state.mode!=undefined ? this.state.mode:0;
        let modeName = this.state.modeName?(this.state.modeName=='待机'?'无':this.state.modeName):'无';
        let surplusreservehour = this.state.surplusreservehour!=undefined ?this.state.surplusreservehour:'';
        let surplusreservemin = this.state.surplusreservemin!=undefined ?this.state.surplusreservemin:'';
        let reserveEnd = (surplusreservehour==0 && surplusreservemin== 0)?false:true;
        let AppointmentOrHeat = this.state.AppointmentOrHeat!=undefined ? this.state.AppointmentOrHeat:0;
        //console.log(online,networkavailable,sensorflag,runningOk.toString())

        //模式判断
        let workingStatusTxt;
        let workingTotalText;

        if(runningOk){
            //if(mode ==1||mode==0){
            //    workingStatusTxt= '待机中';
            //    workingTotalText = workingStatusTxt;
            //}else if(mode ==18){
            //    workingStatusTxt = '保温中';
            //    workingTotalText = workingStatusTxt;
            //}else{
            //    if(reserveEnd){
            //        workingStatusTxt= '预约中';
            //    }else{
            //        workingStatusTxt = '加热中';
            //    }
            //    workingTotalText = workingStatusTxt+"  模式: "+modeName;
            //}

            if(AppointmentOrHeat == 1){
                workingStatusTxt= '预约中';
                workingTotalText = workingStatusTxt+"  模式: "+modeName;
            }else if(AppointmentOrHeat == 2){
                workingStatusTxt= '加热中';
                workingTotalText = workingStatusTxt+"  模式: "+modeName;
            }else{
                if(mode == 18){
                    workingTotalText = '保温中';
                }else{
                    workingTotalText = '待机中';
                }
            }
        }else{
            workingTotalText = '设备已离线';
        }
        var modeArray = [{id:14,select:true},{id:15,select:true},{id:16,select:true},{id:17,select:true},];
        if(mode!=0&&mode!=1){
            modeArray.map(function(o) {
                if(o.id == mode){
                    o.select = true;
                }else{
                    o.select = false;
                }
            });
        }

        //console.log('modeArray',modeArray,mode);

        return(<aside>
                <h1 className="btn-title">{workingTotalText}</h1>
                <section className={'flex btnlist'}>
                    <article data-mode="1" className={modeArray[0].select&& runningOk?'flex-cell':'flex-cell triggered'} onClick={(mode!=0&&mode!=1) && runningOk?'':this.changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/chopSoup.png'/>
                        <p>大骨汤</p>
                    </article>
                    <article data-mode="2" className={modeArray[1].select&& runningOk?'flex-cell':'flex-cell triggered'} onClick={(mode!=0&&mode!=1) && runningOk?'':this.changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/babyPorridge.png'/>
                        <p>婴儿粥</p>
                    </article>
                    <article data-mode="3" className={modeArray[2].select&& runningOk?'flex-cell':'flex-cell triggered'} onClick={(mode!=0&&mode!=1)&& runningOk?'':this.changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/soupRice.png'/>
                        <p>煲仔饭</p>
                    </article>
                    <article data-mode="4" className={modeArray[3].select&& runningOk?'flex-cell':'flex-cell triggered'} onClick={(mode!=0&&mode!=1) && runningOk?'':this.changeMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/nutritionRice.png'/>
                        <p>营养饭</p>
                    </article>
                </section>
            </aside>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});