// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
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
            selectModel:0
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.startTime = this.startTime.bind(this);
        this.ispoll = this.ispoll.bind(this);
        this.iscanCanel = this.iscanCanel.bind(this);
        this.iswait = this.iswait.bind(this);
        this.isopenDevice = this.isopenDevice.bind(this);
    };
    componentWillUnmount(){
        if(this.timer != undefined){
            //console.log("componentWillUnmount清楚计数器");
            clearTimeout(this.timer);
        }
    }

    startTime(selectModel){
        this.timer = setTimeout(()=>{
            //console.log("handleMode selectModel="+selectModel);
            if(selectModel != 0){
                Actions.swicthMode(selectModel);
            }
        },3000);
    };

    handleCoff(){//处理开机事件 (1-关机，2-开机)
        if(parseInt(this.state.online || 2)==2) {het.toast("设备已离线");return false;}
        let childoff = parseInt(this.state.cOnoff) || 1;
        childoff==1?childoff=2:childoff=1;
        Actions.cOnoff(childoff);
        if(this.timer != undefined){
            clearTimeout(this.timer);
            //console.log("清楚计数器");
        }
    };

    handleMode(){//出来模式选择
        if(parseInt(this.state.online || 2)==2) {het.toast("设备已离线");return false;}
        if(parseInt(this.state.cOnoff)==1  || parseInt(this.state.workStatus) != 0) return false;
        let selectModel  = this.state.selectModel || 0;
        if(++selectModel > 3) selectModel=0;

        this.setState({'selectModel':selectModel});
        if(this.timer != undefined){
            clearTimeout(this.timer);
            //console.log("清楚计数器");
        }
        this.startTime(selectModel);
    };
    handleHotwind(){//热风选择
        if(parseInt(this.state.online || 2)==2) {het.toast("设备已离线");return false;}
        if(parseInt(this.state.workStatus) == 0 || parseInt(this.state.cOnoff)==1  || this.ispoll()) return false;
        let cHotWindSw = parseInt(this.state.cHotWindSw) || 1;
        cHotWindSw==1?cHotWindSw=2:cHotWindSw=1;
        Actions.swicthHotWind(cHotWindSw);
    };

    handlecanle(){
        if(parseInt(this.state.online || 2)==2) {het.toast("设备已离线");return false;}
        if(!this.iscanCanel()) return false;
        Actions.cancelElm();
    }

    ispoll(){//是否是预约状态
        let workStatus = this.state.workStatus || 0;
        let setBookingTimeHour = this.state.setBookingTimeHour || 0;//预约的时间(小时)
        let setBookingtimeMin = this.state.setBookingtimeMin || 0;//预约时间(分钟)
        let ispoll = 0;
        if(setBookingTimeHour == 0 && setBookingtimeMin == 0){
            ispoll = 0;//没有预约时间
        }else {
            ispoll = 1;//有预约时间
        }
        if(parseInt(this.state.cOnoff)==2 && workStatus != 0 && ispoll == 1){
            return true;
        }
        return false;
    };

    iscanCanel(){
        let workStatus = parseInt(this.state.workStatus) || 0;
        if(parseInt(this.state.cOnoff)==2 && workStatus != 0 ){
            return true;
        }
        return false;
    };
    iswait(){//待机中
        let cOnoff = parseInt(this.state.cOnoff )|| 1;
        if(cOnoff == 1){
            return true;
        }
        return false;
    };

    isopenDevice(){//已开机
        let cOnoff = parseInt(this.state.cOnoff) || 1;
        let workStatus = parseInt(this.state.workStatus) || 0;
        if(cOnoff == 2 &&　workStatus == 0){
            return true;
        }
        return false;
    };
    
    render() {
        let workarry = ['无模式','上烤','下烤','上下烤','发酵',
            '解冻','消毒','饼干','蛋挞','面包','烤肉','披萨','烤薯'];
        let cOnoff = parseInt(this.state.cOnoff) || 1;
        let HotWindStatus = parseInt(this.state.HotWindStatus) || 1;//1 关 2开
        let selectModel = this.state.selectModel || 0;
        let workStatus = parseInt(this.state.workStatus) || 0;
        let workTextArry = ['待机中','已开机','烘焙中','预约中'];
        let workText = this.iswait()?workTextArry[0]:this.isopenDevice()?workTextArry[1]:this.ispoll()?workTextArry[3]:workTextArry[2];
        let mode = parseInt(this.state.workStatus) || 0,
            modeImgPath = '../static/img/btnlist/',
            modeName = '无模式',
            online = this.state.online || 2;//设备是否在线
        console.log("mode="+mode);
        let imgModel = selectModel;
        if(workStatus != 0){
            modeImgPath  = modeImgPath + workStatus + '_1.png';
            modeName=workarry[workStatus];
        }else{
            modeImgPath  = modeImgPath+ imgModel + '_1.png';modeName=workarry[imgModel];
        }
        //console.log("modeImgPath="+modeImgPath);
        let hotText = HotWindStatus == 1?"": " 热风";
        return (
            <div>
                {online==2?<h1 className="btn-title">设备已离线</h1>:
                    <h1 className="btn-title">
                        {workText+' '}{workStatus!=0?'模式：'+ workarry[workStatus] + hotText:'模式：无'}
                    </h1>
                }

                <section className="flex btnlist">
                    <article className="flex-cell art-1" onTouchEnd={this.handleCoff.bind(this)}>
                        <img style={online == 2?{opacity:0.3}:{opacity:1}} src={cOnoff == 2 ?"../static/img/btnlist/1.png":"../static/img/btnlist/1.png"} alt=""/>
                        <p>{cOnoff == 1?"开机":"关机"}</p>
                    </article>

                    <article className="flex-cell art-2" onTouchEnd={this.handleMode.bind(this)}>
                        <img style={cOnoff == 2 ? workStatus == 0 && online == 1?{opacity:1} :{opacity:0.3}:{opacity:0.3}} src={modeImgPath} alt=""/>
                        <p>{modeName}</p>
                    </article>

                    <article className="flex-cell art-3" onTouchEnd={this.handleHotwind.bind(this)}>
                        <img style={this.iscanCanel()?this.ispoll()?{opacity:0.3}:{opacity:1}:{opacity:0.3}} src={HotWindStatus==1?"../static/img/btnlist/hotoff.png":"../static/img/btnlist/hoton.png"} alt=""/>
                        <p>热风</p>
                    </article>

                    <article className="flex-cell art-4" onTouchEnd={this.handlecanle.bind(this)}>
                        <img style={this.iscanCanel()?{opacity:1}:{opacity:0.3}} src={"../static/img/btnlist/cancel.png"} alt=""/>
                        <p>取消</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('荣事达烤箱');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});