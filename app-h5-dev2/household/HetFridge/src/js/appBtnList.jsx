/**
 * Created by ben on 2016/12/5.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};


/*
 5.1.1.	“常规”模式：冷藏室、冷冻室设定温度可调。
 5.1.2.	“速冷”模式：冷冻室设定温度可调，冷藏室设定温度不可调，固定按 Trs=2℃控制。
 5.1.3.	“速冻”模式：冷藏室设定温度可调，冷冻室设定温度不可调，固定按Tfs=-24℃控制，连续制冷 24小时达到最低温度。
 5.1.4.	 “节能”模式：冷藏室设定温度按Trs=8℃运行，冷冻室设定温度按Tfs=-18℃运行。
 5.1.5.	“智能”模式：冷藏室设定温度按Trs=5℃运行，冷冻室设定温度按Tfs=-18℃运行。
 */

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 开启控制数据渲染，以便filter能取到控制数据
        updateFlagMap: {
        }
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
        };
        //Actions.local();
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.changeMode = this.changeMode.bind(this);
        this.liveError = this.liveError.bind(this);
        this.changeMode = this.changeMode.bind(this);
    };
    changeMode(e){
        if(this.liveError()){het.toast(this.liveError());return false;}
        e.preventDefault();
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        console.log('-----selectMode---'+selectMode);
        //{id:1,name:'正常'},
        //{id:2,name:'速冷',setTempcolorromm:2},//冷冻
        //{id:3,name:'速冻',setTempStorage:-24},//冷藏
        //{id:4,name:'智能',setTempStorage:5,setTempcolorromm:-18},
        //{id:5,name:'节能',setTempStorage:8,setTempcolorromm:-18},
        //switch (selectMode){
        //    case 1: appData.selectMode = 1,appData;break;
        //    case 2: appData.selectMode = 2,appData.setTempcolorromm = 2;break;
        //    case 3: appData.selectMode = 3,appData.setTempStorage = -24;break;
        //    case 4: appData.selectMode = 4,appData.setTempStorage = 8,appData.setTempcolorromm = -18;break;
        //};
        //appData.sendArray ={
        //    workmode:appData.selectMode,
        //    //预约时间
        //    ordertimehour:0,
        //    ordertimemin:0,
        //    //工作时间
        //    runtime:appData.functimeset,
        //};
        //Actions.launchMode(appData.sendArray);
        //this.setState({
        //    modeName:'adsa'/*modeConfig[selectMode].name*/
        //})
        //console.log('-----快捷模式--------------',appData.sendArray);
        Actions.launchMode({workmode:selectMode});

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
        if(this.state.errorArr!=null){
            var errAr = this.state.errorArr;
            if(errAr!=null&&errAr.length>0){
                return '冰箱故障，请与售后联系，电话：400-777-2009';
            }
        }

        return false;
    };
    render() {
        let errAr =[];
        errAr = this.state.errorArr;
        if(errAr instanceof Array){
            console.log('有故障.....................................',errAr.length);
        }else{
            console.log('不是素组.........');
        }
        //离线&故障
        let online = this.state.online!=undefined?this.state.online:1;//是否在线  1在线  2离线
        let networkavailable =this.state.networkavailable!=undefined?parseInt(this.state.networkavailable):1;
        //故障时样式
        let runningOk = (online!=2 && networkavailable!=2) ? true:false;
        //状态和模式
        let mode = this.state.workmode!=undefined ? this.state.workmode:1;
        let modeName = this.state.modeName||'常规';
        //let surplusreservehour = this.state.surplusreservehour!=undefined ?this.state.surplusreservehour:'';
        //let surplusreservemin = this.state.surplusreservemin!=undefined ?this.state.surplusreservemin:'';
        //let reserveEnd = (surplusreservehour==0 && surplusreservemin== 0)?false:true;
        //let heatingTime = this.state.heatingTime;


        //模式判断
        let workingTotalText;

        if(runningOk){
            workingTotalText = '工作中 模式:'+modeName;

        }else{
            workingTotalText = '设备已离线';
        }
        //var modeArray = [{id:14,select:true},{id:15,select:true},{id:16,select:true},{id:17,select:true},];
        //if(mode!=0&&mode!=1){
        //    modeArray.map(function(o) {
        //        if(o.id == mode){
        //            o.select = true;
        //        }else{
        //            o.select = false;
        //        }
        //    });
        //}

        //console.log('modeArray',modeArray,mode);

        return(<aside>
                <h1 className="btn-title">{workingTotalText}</h1>
                <section className={'flex btnlist'}>
                    <article data-mode="1" className={mode==1&& runningOk?'flex-cell':'flex-cell triggered'} onClick={ runningOk?this.changeMode:''} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/jd_home_cg.png'/>
                        <p>常规</p>
                    </article>
                    <article data-mode="2" className={mode==2&& runningOk?'flex-cell':'flex-cell triggered'} onClick={runningOk?this.changeMode:''} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/jd_home_sl.png'/>
                        <p>速冷</p>
                    </article>
                    <article data-mode="3" className={mode==3&& runningOk?'flex-cell':'flex-cell triggered'} onClick={runningOk?this.changeMode:''} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/jd_home_sd.png'/>
                        <p>速冻</p>
                    </article>
                    <article data-mode="5" className={mode==5&& runningOk?'flex-cell':'flex-cell triggered'} onClick={runningOk?this.changeMode:''} style={runningOk?{opacity:1}:{opacity:.5}}>
                        <img  src='../static/img/btnlist/jd_home_jn.png'/>
                        <p>节能</p>
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