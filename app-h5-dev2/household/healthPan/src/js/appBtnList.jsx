import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {};

het.domReady(()=>{
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
        filter : {}
    });
});
het.repaint((data)=>{
    Actions.repaint(data); 
});
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            online:1,
            networkavailable:1,
            fuck:2
        };
        Actions.local();
        this.listenStore(Store);
        //Store.listen((data)=>this.setState(data));
        this.changeMode = this.changeMode.bind(this);
        this.liveError = this.liveError.bind(this);
    }
    changeMode(e){
        //出来操作
        if(this.liveError()){het.toast(this.liveError());return false;}
        e.preventDefault();
        let selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
        let modeConfig = [
            {mode:7,name:'蒸饭',fire:1,heatinghour:0,heatingmin:35},
            {mode:5,name:'馒头',fire:1,heatinghour:0,heatingmin:22},
            {mode:6,name:'排骨',fire:1,heatinghour:0,heatingmin:24},
            {mode:4,name:'包子',fire:1,heatinghour:0,heatingmin:18},
        ];
        switch (selectMode){
            case 4: appData.selectMode = 4,appData.heatingmin = 18;break;
            case 5: appData.selectMode = 5,appData.heatingmin = 22;break;
            case 6: appData.selectMode = 6,appData.heatingmin = 24;break;
            case 7: appData.selectMode = 7,appData.heatingmin = 35;break;
        };
        appData.sendArray ={
            GongZuoMoShiSheZhi:appData.selectMode,
            YuYueShiJianSheZhiXiaoShi: 0,
            YuYueShiJianSheZhiFenZhong: 0,
            HuoLiSheZhi: 1,
            JiaReShiJianSheZhiXiaoShi: 0,
            JiaReShiJianSheZhiFenZhong: appData.heatingmin,
        };
        Actions.changeMode(appData.sendArray);
        this.setState({
            mode:appData.selectMode,
            runningMode:appData.selectMode,
        });
    }
    liveError(){
        if(this.state.online==2){
            return '设备与APP已断开连接！';
        }
        if(this.state.networkavailable==2){
            return '当前网络不可用！';
        }
        //出来操作不用故障提示
        //if(this.state.dryburning==1){
        //    return '{"title":"干烧故障", "content":"主人，请在锅内添加适量的水。养生锅会自动返回待机状态！", "button":"我知道了"}'
        //}
        //if(this.state.hightemperature==1){
        //    return '{"title":"高温保护", "content":"高温保护", "button":"我知道了"}';
        //}
        //if(this.state.opencircuit==1){
        //    return '{"title":"开路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
        //}
        //if(this.state.shortcircuit==1){
        //    return '{"title":"短路故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}';
        //}
        return false;
    }
    render() {
        //状态和模式
        let mode = this.state.mode!=undefined ? this.state.mode:0;
        let modeName = mode==0?'无':(this.state.modeName!=undefined ?this.state.modeName: '无');

        //运行数据相对较慢并未用于渲染
        let runningMode = this.state.runningMode!=undefined ?this.state.runningMode: '';
        let runningModeName = this.state.runningModeName!=undefined ?this.state.runningModeName: '无';

            //使用运行数据渲染
            mode = runningMode;
            modeName = mode==0 ?'无':runningModeName;

        //离线&故障
        let online = this.state.online!=undefined?this.state.online:1;
        let networkavailable =this.state.networkavailable!=undefined?this.state.networkavailable:1;
        let hightemperature = this.state.hightemperature!=undefined?this.state.hightemperature:0;
        let dryburning = this.state.dryburning!=undefined?this.state.dryburning:0;
        let opencircuit = this.state.opencircuit!=undefined?this.state.opencircuit:0;
        let shortcircuit = this.state.shortcircuit!=undefined?this.state.shortcircuit:0;
        let runningOk = (online==2 || networkavailable==2 || hightemperature==1 || dryburning==1 || opencircuit==1 || shortcircuit==1 ) ? false:true;

        //故障时样式
        let surplusreservehour = this.state.surplusreservehour!=undefined ?this.state.surplusreservehour:'';
        let surplusreservemin = this.state.surplusreservemin!=undefined ?this.state.surplusreservemin:'';
        let reserveEnd = (surplusreservehour==0 && surplusreservemin== 0)?true:false;
        let workingstatus = this.state.workingstatus?this.state.workingstatus:'';
            //运行状态字段未返回，本地维护计算
            if(!workingstatus) {
                switch (parseInt(mode)){
                    case 0:workingstatus = 0;break;
                    case 1:workingstatus = 2;break;
                    case 8:workingstatus = 3;break;
                    default:mode !=0 && mode !=1 && mode !=8 && (workingstatus = reserveEnd ? 2 : 1);break;
                }
            }
        let workingStatusTxt = ['待机中','预约中','加热中','保温中'][workingstatus] || '待机中';
            if(hightemperature==1) workingStatusTxt = '高温保护';
            if(dryburning==1) workingStatusTxt = '干烧保护';
            if(opencircuit==1) workingStatusTxt = '开路故障';
            if(shortcircuit==1) workingStatusTxt = '短路故障';

        let changMode =  mode == 0 ? this.changeMode:'';
            //设备故障时，置灰，点击不需要提示
            if(hightemperature==1 || dryburning==1 || opencircuit==1 || shortcircuit==1)  changMode='';
            //离线断网时，置灰，点击需要提示
            if(online==2 || networkavailable==2)  changMode = this.changeMode;

        let statusBar = workingStatusTxt+'  模式:'+modeName;
            if(online == 2)  statusBar='设备已离线';
            if(networkavailable == 2)  statusBar='当前网络不可用';

        return(<aside>
                    <h1 className="btn-title">{statusBar}</h1>
                    <section className={'flex btnlist'}>
                        <article data-mode="7" className={((mode!=0) && runningOk)?'flex-cell triggered':'flex-cell'} onClick={changMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                            <img  src='../static/img/btnlist/1.png'/>
                            <p>蒸饭</p>
                        </article>
                        <article data-mode="5" className={((mode!=0) && runningOk)?'flex-cell triggered':'flex-cell'} onClick={changMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                            <img  src='../static/img/btnlist/2.png'/>
                            <p>馒头</p>
                        </article>
                        <article data-mode="6" className={((mode!=0) && runningOk)?'flex-cell triggered':'flex-cell'} onClick={changMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                            <img  src='../static/img/btnlist/3.png'/>
                            <p>排骨</p>
                        </article>
                        <article data-mode="4" className={(mode!=0 && runningOk)?'flex-cell triggered':'flex-cell'} onClick={changMode} style={runningOk?{opacity:1}:{opacity:.5}}>
                            <img  src='../static/img/btnlist/4.png'/>
                            <p>包子</p>
                        </article>
                    </section>
              </aside>
        )
    }
}
het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});