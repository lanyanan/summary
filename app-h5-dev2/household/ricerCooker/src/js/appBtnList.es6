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
        this.state = {};
        Store.listen((data)=>{
        // if(data.OperationWorkMode!==undefined) alert('enter'+JSON.stringify(data));
        this.setState(data);}); // 监听Store

        this.handleShakeSwitch = this.handleShakeSwitch.bind(this);

    }; 
     handleShakeSwitch(e){ 
        if(this.state.online==2){het.toast('设备已离线');return false;}
         e.preventDefault();
         let type = e.currentTarget.getAttribute('data-type');
         let FuntionSelect=parseInt(this.state.FuntionSelect);
         let OperationWorkMode=parseInt(this.state.OperationWorkMode);
         this.setState({OperationWorkMode:type});
        Actions.handleShakeSwitch(type,3);
    }; 
     
      
    render() {
        console.log(this.state.FuntionSelect+'gongzuomoshi')
       
        let PresetSet=parseInt(this.state.PresetSet);
        let OperationWorkMode=parseInt(this.state.OperationWorkMode);
        // let mode1=parseInt(this.state.FuntionSelect==undefined ? 0 :this.state.FuntionSelect);
        let mode2=OperationWorkMode? OperationWorkMode  : 0;
        let mode=mode2;
        let messageArr2=['待机中','保温中','清洗中',"蒸鱼","蒸肉","烹饪中 蒸饭","蒸土豆","热饭",'蒸包子',"蒸馒头","蒸玉米",'蒸红薯',"蒸糕点","蟹类","虾类","贝类","蒸蛋"];
        let workText1=messageArr2[mode];
        let workText2=(PresetSet==1 && mode==5)  ? '预约中 蒸饭' : workText1;
        let workText=this.state.OperationWorkMode==null ? '待机中' : workText2;
        let fastBtnEvent =  mode == 0 ? this.handleShakeSwitch : '';
      
       
         return (
            <div>
                 {this.state.online==2?<h1 className="btn-title">设备已离线</h1>:
                    <h1 className="btn-title">
                        {workText+' '}
                    </h1>
                } 
                <section className="flex btnlist">
                   <article data-type='3' className={(mode==0||mode==3)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/fisha.png"}/>
                        <p>蒸鱼</p>
                    </article>
                    <article data-type='5' className={(mode==0||mode==5)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/rice.png"}/>
                        <p>蒸饭</p>
                    </article>
                    <article data-type='4' className={(mode==0||mode==4)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/meating .png"}/>
                        <p>蒸肉</p>
                    </article>
                    <article data-type='2' className={(mode==0||mode==2)?'flex-cell':"flex-cell disabled"} onTouchStart={fastBtnEvent}>
                        <img  src={"../static/img/cleaning.png"}/>
                        <p>清洗</p>
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

