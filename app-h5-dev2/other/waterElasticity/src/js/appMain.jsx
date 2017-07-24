'use strict';
/**
 * 圆弧滑动组件
 * 设备充电中不能使用，拉开关机，合拢待机，APP无法控制开关机，APP无法清零设备数据
 * APP控制数据只有一个更改测试部位part和updateFlag字段
 * @measureStatus 本地维护测试状态，请选择，初始化，测试中，测试完成，测试失败
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
import {BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import {Actions } from './Actions.jsx';
import {Store } from './Store.jsx';
import {History } from './History.jsx';
import {MeasureParts } from './MeasureParts.jsx'
import {MeasureStatus } from './MeasureStatus.jsx'
import {MeasureResult } from './MeasureResult.jsx'
const {Router, Route, hashHistory} = ReactRouter;
const appData =  {};
let Toast = require('../../../common/src/lib/Toast.jsx');
let iToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
class App extends BaseComponent {
    constructor(props) {
        super(props)
        //Actions.runningData();
        Actions.deviceInfo();
        Actions.getting();
        Actions.repaint();
        this.state = {
            onlineStatus: 2,
            water: 66,
            oil : 15,
            elasticity: 5.5,
            battery: 10,
            measureStatus: 0,
            measureResult: false,
            //测试结果
            skinGuide:'如果你忍不住不洗手，那就经常涂涂乳液或者护手霜吧！洗澡之后用橄榄油或者凡士林厚厚涂一层按摩，戴上厚手套，按摩几分钟能够让你的双手恢复娇嫩。',
            skinAreaRank: 0,
            skinTypeName: '重度干燥.皱纹',
            skinProblem: '这粗糙的手……你是小洁癖么？过度洗手会让皮肤油脂代谢失常，因而会变得干燥，起皮。',
        }
        this.listenStore(Store)
        this.selectPart = this.selectPart.bind(this) //选择测试部位
        this.reMeasure = this.reMeasure.bind(this)   //重新测试该部位
        this.childSetState = this.childSetState.bind(this) //动态计算设置一屏高度
        this.history = this.history.bind(this) //历史数据
        this.back = this.back.bind(this)
    }
    componentDidMount(){
        this.PollTimer = setInterval(function(){
            //Actions.intervalData();
            console.log('------------------')
            Actions.repaint();
        },5000);
        //Actions.intervalData();
        Actions.repaint();
        /*this.iScroll = new IScroll('#iScroll', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });*/
    }
    childSetState(childState,fn){
        //计算一屏展示，子组件调用父组件方法，并通过该方法的参数或回调函数的方式，把子组件设置的值回传给父组件使用
        let navHeight = childState.navHeight;
        this.setState({
            navHeight: navHeight+1,
            dataHeight: window.screen.height-navHeight
        })
    }
    selectPart(e) {
        //if(this.state.onlineStatus==2) {iToast('设备不在线');return}
        if(e.currentTarget.getAttribute('class') === 'part on') return;
        let part = e.currentTarget.getAttribute('data-part');
        //选中不可再选中
        let measureTime = new Date().Format('yyy-MM-dd hh:mm:ss')

        Actions.selectPart({"updateFlag":0,"part":part,"measureTime":measureTime})
        this.setState({ updateFlag: 0, part: part, measureStatus: 1 })
    }
    reMeasure(e){
        let part = this.state.part;
        Actions.selectPart({"updateFlag":0,"part":part})
        this.setState({updateFlag:0,part:part})
    }
    back(e){
        window.history.back()
    }
    history(e){
        window.location.href = '#/History'
    }
    render() {
        //设置一屏展示
        let screenHeight = window.screen.height;
        let navHeight = this.state.navHeight+'px';
        let dataHeight = this.state.dataHeight+'px';
        //console.log('--screenHeight--navHeight---dataHeight---------msg--',screenHeight,navHeight,dataHeight,this.state.msg);
        //选择部位
        let part = this.state.part!=undefined ? this.state.part:0;
        let partArr=['待机', '额头','左脸','右脸', '鼻子', '眼周', '手部'];

        //测量动画和电量状态
        let battery =this.state.battery ?this.state.battery:'';
        let testingCss = 'testing-animation';
        let testingAnima = /*mode==2*/ 1 ? <b></b>:'';
        let animationCss = 'initialize-animation';//注视掉
        let initAnimaCss = 'initialize-animation';
        let statusMain = part == 0 ? '请选择一个部位':('');
        //测试状态和动画以及电量提示
        let statusState = {
            measureResult: this.state.measureResult,
            part: part,
            battery: battery,
            statusMain:statusMain,
            testingCss: testingCss,
            testingAnima : testingAnima,
            initAnimaCss : initAnimaCss,
            measureStatus: this.state.measureStatus
        };
        //console.log('------statusState--------',statusState)
        //测量结果
        let resultState = {
            measureResult: this.state.measureResult,
            dataHeight: dataHeight,
            part: part!=''? partArr[part] +'的肤质为':('额头的肤质为'),
            water: this.state.water,
            oil : this.state.oil,
            elasticity: this.state.elasticity,

            skinTypeName: this.state.skinTypeName,
            skinAreaRank: this.state.skinAreaRank,
            skinProblem: this.state.skinProblem,
            skinGuide: this.state.skinGuide,

            reMeasure: this.reMeasure,
            measureStatus: this.state.measureStatus || 0,
        }
        //console.log('---------resultState--------------',resultState);
        {
            //<aside className='console'>{' 调试打印: '}{'onlineStatus:'+this.state.onlineStatus }</aside>
            //App自带导航栏
            //<aside className="navigation">
            //    <i className="back" onTouchStart={this.back}></i>
            //    <span className="title">智能肤质检测仪器</span>
            //    <i className="history" onTouchStart={this.history}></i>
            //</aside>
        }
        return (
            <div className="wrapper">
                <section className="first-page">
                    <MeasureParts  part={part} partArr={partArr} selectPart={this.selectPart} childSetState={this.childSetState} />
                    <MeasureStatus statusState={statusState}  />
                    <MeasureResult resultState={resultState}  />
                </section>
                <aside id="history" onTouchStart={this.history}></aside>
                <div id="mytoast"></div>
            </div>
        )
    }
}
document.addEventListener('DOMContentLoaded',function(){
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/History" component={History} />
        </Router>
    ), document.getElementById('ROOT'));
},false);

