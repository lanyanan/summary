// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store,isClose} from './Store.es6';
const {Router, Route, hashHistory, Link} = ReactRouter;
const AppData = {};

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData:true,// 控制数据是否用于页面渲染
        filter : {
            'workingmode' : 1,//工作模式取控制数据type:0
            'power': 1,//开关机取运行数据type:1
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
            workingmode: 0
        };
        AppData.networkavailable = this.state.networkavailable?this.state.networkavailable:'';
        AppData.online = this.state.online?this.state.online:'';
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleMode = this.handleMode.bind(this);
    };
    handleSwitch(e){
        //故障提示
        if( this.state.networkavailable==2 ) {het.toast('当前网络不可用');return false;}
        if( this.state.online==2 ) {het.toast('设备已离线');return false;}
        //冷水注入仅仅提示，仍可以操控设备
        if(this.state.coldwater==1)  het.toast('冷水注入');
        //设备干烧和壶坐分离仅仅给提示，只仅仅可以开关机
        if(this.state.dryalarm==1)  het.toast('设备干烧');
        if(this.state.separation==1)  het.toast('壶坐分离');
        //处理开关机事件
        let boots = this.state.boots==1?1:2;
        Actions.switch(boots);
    };
    handleMode(e){
        //故障提示
        if( this.state.networkavailable==2 ) {het.toast('当前网络不可用');return false;}
        if( this.state.online==2 ) {het.toast('设备已离线');return false;}
        if( this.state.dryalarm==1 ) {het.toast('设备干烧');return false;}
        if( this.state.separation==1 ) {het.toast('壶坐分离');return false;}
        if(this.state.coldwater==1) {het.toast('冷水注入');}//冷水注入仅仅提示，仍可以操控设备
        //出来操作
        if(e.currentTarget.className!='flex-cell item triggered') {
            //document.querySelectorAll('.item').className='flex-cell item';
            //$('.item').removeClass('triggered');
            //e.currentTarget.className ='flex-cell item triggered';
            if (this.state.boots == 2 || typeof this.state.boots == 'undefined') return false;
            let modeId = e.currentTarget.getAttribute('data-mode');
            console.log(modeId);
            let mode = modeId;
            let power = 800;
            let heating = 0;
            let reservation = 0;
            let hideModeSet = true;
            switch (modeId) {
                case 2:
                    mode = 2;
                    break;//烧水
                case 10:
                    mode = 10;
                    break;//煮蛋
                case 14:
                    mode = 14;
                    break;//花茶
            }
            if (mode == 10) power = 300;
            Actions.toggleModeChange(mode, power, heating, reservation, hideModeSet);
            //appData.current = e.currentTarget.getAttribute('data-mode');
        }
    }
    render() {
        console.log('-state-',JSON.stringify(this.state));
        let power = this.state.power? this.state.power:'2';
        //console.log('--------------开关机转态',power);
        let modeNameArray = {
            0:{name:'模式',pic:0,value:0,mode:0,powerTemperature:0,heating:0,reservation:0},
            1:{name:'保温',live:'on',pic:9,value:9,mode:1,powerTemperature:60,heating:90,reservation:0},
            2:{name:'烧水',pic:6,value:6,mode:2,powerTemperature:800,heating:5,reservation:0},
            3:{name:'纤体瘦身'},
            4:{name:'祛斑美白'},
            5:{name:'排毒养颜'},
            6:{name:'滋补安神'},
            7:{name:'调经四物汤'},
            8:{name:'清新果茶'},
            9:{name:'青春靓颜茶'},
            10:{name:'花茶',live:'on',pic:1,value:1,mode:10, powerTemperature:300,heating:5,reservation:0},
            11:{name:'水果茶',pic:9},
            12:{name:'药膳',live:'on',pic:5,value:5,mode:12,powerTemperature:200,heating:40,reservation:0},
            13:{name:'酸奶',pic:4,value:4,mode:13,powerTemperature:300,heating:18,reservation:0},
            14:{name:'煮蛋',pic:2,value:2,powerTemperature:800,heating:5,reservation:0},
            15:{name:'煮面',live:'on',pic:3,value:3,mode:15,powerTemperature:800,heating:10,reservation:0},
            16:{name:'滋补汤'},
            17:{name:'银耳羹',pic:10},
            18:{name:'火锅',live:'on',pic:8,value:8,mode:18,powerTemperature:300,heating:115,reservation:0},
            19:{name:'煲汤',live:'on',pic:7,value:7,mode:19,powerTemperature:300,heating:115,reservation:0},
            20:{name:'果茶'},
            21:{name:'营养粥'},
            22:{name:'婴儿用水'},
            23:{name:'调奶'},
            24:{name:'温奶'},
            25:{name:'花草茶'},
            26:{name:'百草茶'},
            27:{name:'养颜茶'},
            28:{name:'滋补茶'},
            29:{name:'红茶'},
            30:{name:'绿茶'},
            31:{name:'煮酒'},
            32:{name:'煮咖啡'},
            33:{name:'蒸水蛋'},
            34:{name:'养生汤'},
            35:{name:'雪梨汤'},
            36:{name:'隔水炖'},
            37:{name:'甜品'},
            38:{name:'炖燕窝'},
            39:{name:'炖虫草'},
            40:{name:'武火'},
            41:{name:'文火'},
            42:{name:'凉茶'},
            43:{name:'宝宝粥'},
            44:{name:'五谷粥'},
            45:{name:'泡奶粉'},
            46:{name:'热奶'},
            47:{name:'消毒'}
        };
        let powerIdName =  this.state.boots == 2 ? '关机':'开机';
        let modeId = this.state.workingmode ? this.state.workingmode:0;
        let modeOtherTxt = this.state.boots == 2 ? '未选择':modeNameArray[modeId].name;
        if(modeId==0) modeOtherTxt = '--';
        let modeName = modeId==2 || modeId==10 || modeId ==14 ? modeNameArray[modeId].name:modeOtherTxt;
        let handleMode = power ==2 ? '': this.handleMode;
        let powerCss = power==2 ? 'flex btnlist outer-close':'flex btnlist';
        let btnTitle = (this.state.online==2 ||this.state.networkavailable==2) ? <h1 className="btn-title">设备已离线</h1> : <h1 className="btn-title">&nbsp;&nbsp;{powerIdName}&nbsp;&nbsp;模式:{modeName}&nbsp;&nbsp;</h1>;
        return (
            <figure>
                {
                    btnTitle
                }
                <section className={powerCss}>
                    <article className="flex-cell" onTouchEnd={this.handleSwitch}>
                        <img src="../static/img/btnlist/1.png" alt=""/>
                        <p>{this.state.boots==1 && this.state.boots!='undefined'?'关机':'开机'}</p>
                    </article> 
                    <article className={modeId==2? 'flex-cell item triggered':'flex-cell item'} data-mode="2" onTouchEnd={handleMode}>
                        <img style={this.state.boots==1 ?{opacity:1}:{opacity:0.5}} src='../static/img/btnlist/2.png' alt=""/>
                        <p>烧水</p>
                    </article>
                    <article className={modeId==10? 'flex-cell item triggered':'flex-cell item'} data-mode="10" onTouchEnd={handleMode}>
                        <img style={this.state.boots==1?{opacity:1}:{opacity:0.5}} src='../static/img/btnlist/4.png' alt=""/>
                        <p>花茶</p>
                    </article>
                    <article className={modeId==14? 'flex-cell item triggered':'flex-cell item'} data-mode="14" onTouchEnd={handleMode}>
                        <img style={this.state.boots==1 ?{opacity:1}:{opacity:0.5}} src="../static/img/btnlist/3.png" alt=""/>
                        <p>煮蛋</p>
                    </article>
                </section>
            </figure>
        );
    }
}


// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});