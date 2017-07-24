// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;
var appData = {};

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
          
            restart:false,//默认可以切换工作模式
            selectMode:0,//默认不选中工作模式
        };
        Store.listen((data)=>{
        // if(data.OperationWorkMode!==undefined) alert('enter'+JSON.stringify(data));
        this.setState(data);}); // 监听Store
        this.startWork=this.startWork.bind(this);
        this.handCancel = this.handCancel.bind(this);
        this.handStop=this.handStop.bind(this);
        this.setWet=this.setWet.bind(this);

    }; 
    handCancel(){
        if(this.state.online==2) het.toast('设备不在线');
       if(this.state.power==16||this.state.power==0||this.state.power===undefined){Actions.turn(1)};
        if(this.state.power==1){Actions.turn(16)};
        if((0<this.state.mode&&this.state.mode<13)||(0<this.state.Mode&&this.state.Mode<13))
        { this.setState({restart:false}); Actions.calWork(); }  
    }
    startWork(){
        if(this.state.online==2)het.toast('设备不在线');
        if(this.state.power==0||this.state.power==16||this.state.power===undefined)return;
        
        // if(this.state.restart==true)return;
        if(this.state.Mode!=0&&this.state.Mode!=undefined)return;
        if(this.state.reservationhour||this.state.reservationmin)return;

        clearTimeout(this.clock);
        let temArr=[100,180,180,180,180,180,180,180,40,60,60,100];
        let time=20;
        let chooseMode=this.state.selectMode==5 ? 1 :this.state.selectMode+1;
        
        this.setState({selectMode:chooseMode})
       
       this.clock=setTimeout(function(){
           let mode=this.state.selectMode;
            Actions.startWork(mode,temArr[mode-1]);
            this.setState({selectMode:0});
        }.bind(this), 5000)

    }
     handStop(){
        if(this.state.online==2)het.toast('设备不在线');
        if(this.state.reservationhour||this.state.reservationmin)return;
        if(this.state.Mode||this.state.mode){
        let newstart=this.state.start==16 ? 1 :16;
        this.setState({start:newstart});
        Actions.stop(newstart);
        
        }
    }
    setWet(){
        if(this.state.online==2)het.toast('设备不在线');
        if(this.state.power==0||this.state.power==undefined||this.state.power==16)return;
        if(this.state.reservationhour||this.state.reservationmin)return;
        if(this.state.Mode!=2&&this.state.Mode!=3)return;
        let setmode=this.state.humidityControl==undefined ? 0 :this.state.humidityControl;
        let newsetmode=parseInt(setmode)+1;
        let mode=newsetmode>3 ? 1 :newsetmode;
        Actions.sethumidity(mode);
        
    }
    render() {
      
        
        let is=this.state;
        let isTrue=(is.reservationhour||is.reservationmin) ? true:false;//为true时为预约状态
        
        let messageArr1=['已预约 蒸汽模式','已预约 顶部蒸烤组合','已预约 后部热风蒸组合','已预约 后部热风','已预约 顶部热风','已预约 顶部烧烤','已预约 顶部单管热风','已预约 顶部单管烤','已预约 发酵', '已预约 保温','已预约 解冻','已预约 杀菌'];
        let messageArr2=['烘焙中 蒸汽模式','烘焙中 顶部蒸烤组合','烘焙中 后部热风蒸组合','烘焙中 后部热风','烘焙中 顶部热风','烘焙中 顶部烧烤','烘焙中 顶部单管热风','烘焙中 顶部单管烤','烘焙中 发酵', '烘焙中 保温','烘焙中 解冻','烘焙中 杀菌'];
        let workText1=messageArr1[this.state.Mode ? this.state.Mode-1 : this.state.mode-1];
        let workText2=messageArr2[this.state.Mode ? this.state.Mode-1 : this.state.mode-1];
        let workText3= isTrue ? workText1: workText2 ;
        let workText4=(this.state.mode==0||this.state.Mode==0)&&this.state.power==1 ? '待机中' :'关机中';
        let workText=this.state.Mode||this.state.mode ? workText3 : workText4;
        let wetArr=['lowwet.png','lowwet.png','middlewet.png','highwet.png'];
        let wetSrc='../static/img/'+wetArr[this.state.humidityControl===undefined ? 0 : this.state.humidityControl];
        let wetTextArr=['低湿','中湿','高湿'];
        let wetText=wetTextArr[this.state.humidityControl===undefined||this.state.humidityControl==0 ? 0 : this.state.humidityControl-1];
        let stopImageArr=['aStart.png','aStop.png'];
        let stopSrc='../static/img/'+stopImageArr[this.state.Mode==0||this.state.mode==0||this.state.Mode==undefined ? 1 :this.state.start==16||this.state.start==0 ? 0 :this.state.start];//暂停按钮图标
        let workImageArr=['mode1.png','mode2.png','mode3.png','mode4.png','mode5.png','mode6.png','mode7.png','mode8.png','mode9.png','mode10.png','mode11.png','mode12.png'];
        let messageArr3=[' 蒸汽模式','顶部蒸烤组合','后部热风蒸组合','后部热风','顶部热风','顶部烧烤','顶部单管热风','顶部单管烤','发酵', ' 保温',' 解冻','杀菌'];
        let workSrc='../static/img/'+workImageArr[(this.state.Mode==undefined ||this.state.Mode==0)||(this.state.mode==0||this.state.mode===undefined) ? 0 : (this.state.Mode==0&&this.state.mode!=0) ? this.state.mode-1 : this.state.Mode-1];
        let workingText=messageArr3[(this.state.Mode==undefined ||this.state.Mode==0)||(this.state.mode==0||this.state.mode===undefined) ? 0 : (this.state.Mode==0&&this.state.mode!=0) ? this.state.mode-1 : this.state.Mode-1];
        let firstArr=['aCancel.png','turn-on.png'];
        let firstextArr=['开机','关机','取消'];
        let firstSrc='../static/img/'+firstArr[(this.state.mode==0||this.state.Mode==0||this.state.mode===undefined||this.state.Mode===undefined) ? 1 : 0];
        let firstText;
        if((this.state.power==16||this.state.power==undefined||this.state.power==0)&&((this.state.Mode==0||this.state.Mode===undefined)||(this.state.mode==0||this.state.mode===undefined))){firstText='开机';}
        if((this.state.power==1)&&((this.state.Mode==0||this.state.Mode===undefined)||(this.state.mode==0||this.state.mode===undefined))){firstText='关机';}
        if((this.state.Mode!=0||this.state.mode!=0)&&this.state.mode!=undefined&&this.state.Mode!=undefined){firstText='取消';}
        let noteText=this.state.online==2 ?'设备已离线' :'网络不可用';

        
        return (
            <div>
                 {this.state.online==2||this.state.networkavailable==2?<h1 className="btn-title">{noteText}</h1>:
                    <h1 className="btn-title">
                        {workText+''}
                    </h1>
                } 
                <section className="flex btnlist">
                   <article  className={this.state.online==1?'flex-cell':"flex-cell disabled"} onTouchEnd={this.handCancel}>
                        <img  src={firstSrc}/>
                        <p>{firstText}</p>
                    </article>
                    <article  className={'flex-cell'}  className={(this.state.Mode==0||this.state.Mode===undefined||this.state.mode==0)&&this.state.online==1&&this.state.power==1 ? 'flex-cell':"flex-cell disabled"}   onTouchStart={this.startWork}>
                        <img  src={workSrc}/>
                        <p>{workingText}</p>
                    </article>
                    <article className={(this.state.Mode==2||this.state.Mode==3)&&isTrue==false&&this.state.online==1 ?'flex-cell':"flex-cell disabled"} onTouchEnd={this.setWet}>
                        <img  src={wetSrc}/>
                        <p>{wetText}</p>
                    </article>
                    <article  className={(this.state.Mode||this.state.mode)&&isTrue==false&&this.state.online==1?'flex-cell':"flex-cell disabled"} onTouchStart={this.handStop}>
                        <img  src={stopSrc}/>
                        <p>{this.state.start==16?'启动' :'暂停'}</p>
                    </article>
                    
                </section>
            </div>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式     
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
}); 

