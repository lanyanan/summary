// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {BloodPressure} from './BloodPressure.es6';
import {BloodGlucose} from './BloodGlucose.es6';
import {Xyml} from './Xyml.es6';
import {Ecg} from './Ecg.es6';
import {Temp} from './Temp.es6';

var {Router, Route, hashHistory , Link,IndexLink} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
     het.config({
        debugMode : 'print', // 打印调试数据
        webDataMap : {
            'nickname' : 'nickname',//昵称
            'img':'img',//头像
            'xymlData':'xymlData',
        },
        renderConfigData : true
    });
});

//SDK准备就绪 回调函数
het.ready((data)=>{
    //console.log(data);
     Actions.repaint(data);
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            filter:['userType','memberId','appId','deviceId','bloodGlucoseData','xymlData','bloodPressureData','tempData']
        };
        this.listenStore(Store); // 监听Store
    }
    changeTab(type){
        switch(type){
            case 'xyml':
                this.setState({
                    filter:['userType','memberId','appId','deviceId','xymlData']
                });
            break;
            case 'bp':
                this.setState({
                    filter:['userType','memberId','appId','deviceId','bloodPressureData']
                });
            break;
            case 'bg':
                this.setState({
                    filter:['userType','memberId','appId','deviceId','bloodGlucoseData']
                });
            break;
            case 'temp':
                this.setState({
                    filter:['userType','memberId','appId','deviceId','tempData']
                });
            break;
        }
    }
    render() {
        let { active } = this.state;
        let data={
            'userType': this.state.userType?this.state.userType:'3',
            'memberId':this.state.memberId?this.state.memberId:'0',
            'appId':this.state.appId?this.state.appId:'10121',
            'deviceId':this.state.deviceId?this.state.deviceId:'',
            'tempData':this.state.tempData?this.state.tempData:'',
            'xymlData':this.state.xymlData?this.state.xymlData:'',
            'bloodPressureData':this.state.bloodPressureData?this.state.bloodPressureData:'',
            'bloodGlucoseData':this.state.bloodGlucoseData?this.state.bloodGlucoseData:'',
            'ecgData':this.state.ecgData?this.state.ecgData:''
        };
        let filter = this.state.filter;
        let total = {};
        filter.map((it)=>{
            total[it] = data[it];
        });

        return <div className=''>
            <section className='header'>
                <a href='health://switch_user'><img className='photo' src={this.state.img?this.state.img:'../static/img/ic-default.png'} alt='头像'/><span className='nikename'>{this.state.nickname}</span></a>
            </section>
            <nav className='nav'>
                <ul className='flex'>
                    <li className='flex-cell' >
                        <IndexLink  to='/' activeClassName="active" onClick={this.changeTab.bind(this,'xyml')} >血氧脉率</IndexLink>
                    </li>
                    <li className='flex-cell' >
                        <Link  to='/bloodPressure'  activeClassName="active" onClick={this.changeTab.bind(this,'bp')}>血压</Link>
                    </li>
                    <li className='flex-cell' >
                        <Link  to='/bloodGlucose' activeClassName="active" onClick={this.changeTab.bind(this,'bg')}>血糖</Link>
                    </li>
{/*                    <li className='flex-cell' >

                        <Link  to='/ecg' activeClassName="active" onClick={this.changeTab.bind(this,'bp')}>心电</Link>
                    </li>*/}
                    <li className='flex-cell' >
                        <Link  to='/temp' activeClassName="active" onClick={this.changeTab.bind(this,'temp')}>体温</Link>
                    </li>
                </ul>
            </nav>
{/*            {this.props.children}
*/}           
            {React.cloneElement(this.props.children, {total:total})}
        </div>;
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('海尔一体机健康监测仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    const routes = {
        path: '/',
        component: App,
        indexRoute: {component: require('./Xyml.es6').default },
        childRoutes: [
            { path: 'xyml', component: require('./Xyml.es6').default},
            { path: 'bloodPressure', component: BloodPressure },
            { path: 'bloodGlucose', component: BloodGlucose },
            { path: 'ecg', component: Ecg },
            { path: 'temp', component: Temp },
          ]
        }
            
    ReactDOM.render((
        <Router history={hashHistory} routes={routes} />
    ), document.getElementById('ROOT'));
});