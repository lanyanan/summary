import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {OxygenEcharts} from './OxygenEcharts.es6';
import {Range} from './Range.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : true

    });
});

het.ready((data)=>{
    Actions.ready(data);
    Actions.getLastestData();
    //Actions.getAlert();
});

// 接收app推送数据
het.repaint((data, type)=>{
    Actions.repaint(data, type);
    if(data.uploadDone||data.disconnect){
        Actions.getLastestData();
    }
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?50:64,
            // oxygenAlert:95,
            // pulseAlert:'60,100',
        };
        this.listenStore(Store); // 监听Store
    }

/*    componentDidMount(){
        let oxygen = this.state.oxygen,
        pulse = this.state.pulse,
        dataTime = Funs.dateFormat(this.state.dataTime,"yyyy-MM-dd"),3
        pulseAlertArr = this.state.pulseAlert.split(','),
        pulseAlertMin = pulseAlertArr[0],
        pulseAlertMax = pulseAlertArr[1];


        if(oxygen < this.state.oxygenAlert ){
            alert('血氧超出预警值了');
        }
        if(pulse < pulseAlertMin || pulse > pulseAlertMax ){
            alert('血氧超出预警值了');
        }
    }*/

    render() {
        // console.log(this.state);
        let oxygen = this.state.oxygen!=null?parseInt(this.state.oxygen):'',
        pulse = this.state.pulse!=null?parseInt(this.state.pulse):'',
        // oxygenAlert = this.state.oxygenAlert?parseInt(this.state.oxygenAlert):'',
        dataTime = this.state.dataTime?Funs.dateFormat(this.state.dataTime,"hh:mm:ss"):'',
        lastTime = this.state.lastTime?Funs.dateFormat(this.state.lastTime,"yyyy-MM-dd hh:mm:ss",true):'';
        // pulseAlertArr = this.state.pulseAlert.split(','),
        // pulseAlertMin = pulseAlertArr[0],
        // pulseAlertMax = pulseAlertArr[1];


 
        // if(oxygen < oxygenAlert ){
        //     //alert('血氧超出预警值了');
        //     console.log('血氧超出预警值了');
        // }
        // if(pulse < pulseAlertMin || pulse > pulseAlertMax ){
        //     //alert('血氧超出预警值了');
        //     console.log('脉率超出预警值了');
        // }


        return (
            <article className='main'> 
                <section className='header'>
                    <header style={{'height':this.state.headerTop}}></header>
                    <a href='health://switch_user'>
                        <img className='photo' src={this.state.img?this.state.img:'../static/img/ic-default.png'} alt='头像'/>
                        <img className='switch' src='../static/img/ic-switch.png' alt='切换图标'/>
                        <span className='nikename'>{this.state.nickname}</span>
                    </a>

{/*                    <a href='health://switch_user'>
                        <img className='photo' src={this.state.img?this.state.img:'../static/img/ic-default.png'} alt='头像'/>
                        <p className='nikename'>{this.state.nickname}</p>
                    </a>*/}
{/*                    <section className='details flex'>
                        <ul className='flex-cell'>
                            <li className='flex-cell'>血氧（%）</li>
                            <li className='flex-cell'>{oxygen}</li>
                            <li className='flex-cell'>{oxygenLevel}</li>
                        </ul>
                        <ul className='flex-cell'>
                            <li className='flex-cell'>脉率（次/分）</li>
                            <li className='flex-cell'>{pulse}</li>
                            <li className='flex-cell'>{pulseLevel}</li>
                        </ul>
                    </section>
                    <p className='time'>上次测量时间：{time}</p>*/}

                </section>
                <Range  oxygen={oxygen} pulse={pulse} dataTime={dataTime} lastTime={lastTime} showLastTime={this.state.showLastTime}/>
                <section className='footer flex'>
                    <a href='health://connect' id='connect' className={this.state.disconnect?'btn flex-cell show':'btn flex-cell hide'} >连接设备</a>
                    <a href='health://history' id='history' className='btn flex-cell'>历史数据</a>
                </section>

            </article>
            )
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('血氧仪');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    /*ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));*/
});