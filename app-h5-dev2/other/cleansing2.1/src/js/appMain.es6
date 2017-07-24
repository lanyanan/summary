// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import SettingButton  from './SettingButton.jsx';
import {TimeSelect} from './TimeSelect.es6';

let Toast = require('../../../common/src/lib/Toast.jsx');
// 定义toast函数，以供多次调用
let mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
var {Router, Route, hashHistory} = ReactRouter;

// 开始渲染
document.addEventListener('DOMContentLoaded',function(){
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
},false);

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            smartModeSwitch: 0,
            defaulthour:1,
            defaultminute:5,
            defaultsecond:'单向',
            recDescription:'',

            valueH:0,
            timeshow: false,

            activeIndexArr: [],
            currenActiveIndex: -1,
        };
        this.items = [{'name':'额头','speed':1,'time':'','imageClass':'forehead-img','changed':false,'remark':''},
                    {'name':'鼻子','speed':1,'time':'','imageClass':'nose-img','changed':false,'remark':''},
                    {'name':'下巴','speed':1,'time':'','imageClass':'chin-img','changed':false,'remark':''},
                    {'name':'左脸','speed':1,'time':'','imageClass':'left-face-img','changed':false,'remark':''},
                    {'name':'右脸','speed':1,'time':'','imageClass':'right-face-img','changed':false,'remark':''}];
        this.listenStore(Store); // 监听Store
    }

    componentDidMount(){
        this.tclock = setInterval(function(){
            Actions.intervalData();
        },5000);
        Actions.intervalData();
        mytoast("使用完超声波洁面仪，建议进行肤质测试，以得到更好的效果...");
    }

    switchStateChange(){
        let value = this.state.smartModeSwitch;
        if(this.state.skinType == null && !value){
            mytoast('您还未测试肤质，请先测试肤质！');
            return;
        }else{
            Actions.switchStateChange(value);
        }
    }

    // 切换部位
    startTouch(e) {
        let startY = parseInt(e.touches[0].clientY);
        let oldValue = parseInt(this.state.valueH);
        this.setState({
            startY:startY,
            oldValue:oldValue
        });
    }
    moveTouch(e) {
        let newY = parseInt(e.touches[0].clientY);
        let oldY = parseInt(this.state.startY);
        let valueH = parseInt(this.state.oldValue)+newY-oldY;
        this.setState({
            newY:newY,
            valueH:valueH
        });
    }
    endTouch(e){
        let newY = this.state.newY || this.state.startY;
        let disY = newY-this.state.startY;
        let offsetValue = parseInt(this.state.oldValue);
        let oldValue = parseInt(this.state.valueH);
        let offset = oldValue<offsetValue? (offsetValue-oldValue) : (oldValue-offsetValue);
        let h,m,s;
        if(offset <= 20){
            if(this.state.smartModeSwitch == 1){
                return false;
            }
            let activeIndex = e.currentTarget.getAttribute('data-index');
            this.setState({currenActiveIndex:activeIndex});
            let activeIndexArr = this.state.activeIndexArr;
            if(activeIndexArr.indexOf(activeIndex) == -1) activeIndexArr.push(parseInt(activeIndex));
            this.setState({activeIndexArr:activeIndexArr});
            activeIndex == 0 ? this.maxminute = 40 : this.maxminute = 40;
            switch(parseInt(activeIndex)){
                case 0:
                    this.recDescription = this.items[0].remark;
                    h = this.items[0].speed;
                    m = this.items[0].time;
                    if(m < 5){
                        m = 5;
                    }else if(m > 40){
                        m = 40;
                    }
                    break;
                case 1:
                    this.recDescription = this.items[1].remark;
                    h = this.items[1].speed;
                    m = this.items[1].time;
                    break;
                case 2:
                    this.recDescription = this.items[2].remark;
                    h = this.items[2].speed;
                    m = this.items[2].time;
                    break;
                case 3:
                    this.recDescription = this.items[3].remark;
                    h = this.items[3].speed;
                    m = this.items[3].time;
                    break;
                case 4:
                    this.recDescription = this.items[4].remark;
                    h = this.items[4].speed;
                    m = this.items[4].time;
                    break;
                default:
                    this.recDescription = '';
            }

            this.setState({
                defaulthour:h,
                defaultminute:m,
                defaultsecond:s,
                timeshow: true,
                arrayInit:false
            });
        }else{
            return;
        }
    }

    cancelClock(){
        this.setState({
            timeshow: false,
            arrayInit:true
        });
    }

    submitClock(h,m){
        let index = this.state.currenActiveIndex;
        let items = this.items;
        if(items[index].speed != h || items[index].time != m){
            items[index].changed = true;
        }else{
            if(items[index].changed){
                items[index].changed = true;
            }else{
                items[index].changed = false;
            }
        }
        // console.log(items[index].changed);
        // 这个是改变后的数组
        items[index].speed = h;
        items[index].time = m;
        this.setState({
            timeshow: false,
            needSave: true,
            arrayInit:true
        });
        Actions.changeGears(items);
    }

    checkMinute(m){
        let tp = 0;
        if(m < 5){
            tp = 5;
        }else if(m > 20){
            tp = 20;
        }else{
            tp = parseInt(m);
        }
        return tp;
    }

    componentWillUpdate(nextProps,nextState){
        this.items[0].speed = this.state.foreheadGears!==nextState.foreheadGears?nextState.foreheadGears:this.items[0].speed;//额头速度
        this.items[0].time = this.state.foreheadRuntime!==nextState.foreheadRuntime?nextState.foreheadRuntime:this.items[0].time;//额头时间
        this.items[0].changed = this.state.foreheadChanged!==nextState.foreheadChanged?nextState.foreheadChanged:this.items[0].changed;
        this.items[0].remark = this.state.foreheadRemarks!==nextState.foreheadRemarks?nextState.foreheadRemarks:this.items[0].remark;
        this.items[1].speed = this.state.noseGears!==nextState.noseGears?nextState.noseGears:this.items[1].speed;//鼻子速度
        this.items[1].time = this.state.noseRuntime!==nextState.noseRuntime?nextState.noseRuntime:this.items[1].time;//鼻子时间
        this.items[1].changed = this.state.noseChanged!==nextState.noseChanged?nextState.noseChanged:this.items[1].changed;
        this.items[1].remark = this.state.noseRemarks!==nextState.noseRemarks?nextState.noseRemarks:this.items[1].remark;
        this.items[2].speed = this.state.chinGears!==nextState.chinGears?nextState.chinGears:this.items[2].speed;//下巴速度
        this.items[2].time = this.state.chinRuntime!==nextState.chinRuntime?nextState.chinRuntime:this.items[2].time;//下巴时间
        this.items[2].changed = this.state.chinChanged!==nextState.chinChanged?nextState.chinChanged:this.items[2].changed;
        this.items[2].remark = this.state.chinRemarks!==nextState.chinRemarks?nextState.chinRemarks:this.items[2].remark;
        this.items[3].speed = this.state.leftfaceGears!==nextState.leftfaceGears?nextState.leftfaceGears:this.items[3].speed;//左脸速度
        this.items[3].time = this.state.leftfaceRuntime!==nextState.leftfaceRuntime?nextState.leftfaceRuntime:this.items[3].time;//左脸时间
        this.items[3].changed = this.state.leftfaceChanged!==nextState.leftfaceChanged?nextState.leftfaceChanged:this.items[3].changed;
        this.items[3].remark = this.state.leftfaceRemarks!==nextState.leftfaceRemarks?nextState.leftfaceRemarks:this.items[3].remark;
        this.items[4].speed = this.state.rightfaceGears!==nextState.rightfaceGears?nextState.rightfaceGears:this.items[4].speed;//右脸速度
        this.items[4].time = this.state.rightfaceRuntime!==nextState.rightfaceRuntime?nextState.rightfaceRuntime:this.items[4].time;//右脸时间
        this.items[4].changed = this.state.rightfaceChanged!==nextState.rightfaceChanged?nextState.rightfaceChanged:this.items[4].changed;
        this.items[4].remark = this.state.rightfaceRemarks!==nextState.rightfaceRemarks?nextState.rightfaceRemarks:this.items[4].remark;
    }

    submit(){
        clearInterval(this.tclock);
        let _this = this;
        setTimeout(function(){
            _this.tclock = setInterval(function(){
                Actions.intervalData();
            },5000);
        },12000);
        for(let i=0,len=this.items.length;i<len;i++){
            this.items[i].changed = false;
        }
        Actions.submit(this.items);
    }
    callback(value){
    }
    render() {
        // console.log("..................",this.state);
        let items = this.items;
        let description = (<span></span>); //智能推荐描述
        let batteryOrLine = (<div></div>); //设备电量低或者离线在线
        if(this.state.skinType === null){
            description = (<div className="tips "><span>未测肤无法为您智能推荐，以下为设备默认值</span></div>);
        }else{
            if(this.state.smartModeSwitch == 0){
                description = (<div className="tips"><p>选择一个部位，设置洁面参数</p></div>);
            }else{
                description = (<div className="tips"><p>已根据您皮肤数据智能推荐最合适的方案</p></div>);
            }
        }
        if(this.state.electricity <= 3 && this.state.electricity > 0){
            batteryOrLine = (<div className="low-battery"></div>);
        }else{
            batteryOrLine = (<div></div>);
        }
        if(this.state.onlineStatus == 2){
            batteryOrLine = (<div className="out-line"></div>);
        }else{
            batteryOrLine = (<div></div>);
        }
        return <div>
            <header>
                <div className = "logo" ref="logo">
                    {batteryOrLine}
                </div>
                <div className = "switchArea">
                    <div className = {this.state.smartModeSwitch === 1? "switchOn":"switchOff"} onTouchEnd ={this.switchStateChange.bind(this)}></div>
                </div>
            </header>

            <div>
                {description}
                <div className = "line">
                    {
                        this.items.map((item,index)=>{
                            return <div className = "item" key={index} data-index={index} onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)}  onTouchEnd={this.endTouch.bind(this)}>
                                <p>{item.name}</p>
                                <div className = "">
                                <span>档位:<em className = { (item.changed && this.state.activeIndexArr.indexOf(index) != -1) ? 'active' : ''}>{item.speed +"档"}</em></span>
                                <span>时间:<em className = { (item.changed && this.state.activeIndexArr.indexOf(index) != -1) ? 'active' : ''}>{item.time+"S"}</em></span>
                                <div className={this.state.smartModeSwitch === 0 ? 'arrow-right' : ''}></div>
                                <div className={'part-img ' + item.imageClass}></div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div className = "footer"><SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={this.submit.bind(this)} /></div>
            <TimeSelect title={this.recDescription} hourshow={true} minuteshow={true} secondshow={true} 
                        cancelClock={this.cancelClock.bind(this)} submitClock={this.submitClock.bind(this)}
                        ArrayInit={this.state.arrayInit} defaulthour={this.state.defaulthour} defaultminute={this.state.defaultminute} defaultsecond={this.state.defaultsecond}
                        statusname=" " show={this.state.timeshow} maxminute={this.maxminute} minminute={5} hourarray={[1,2,3,4,5]}
                        secondarray={['单向','双向-切换1次','双向-切换2次','双向-切换3次']} titleshow={false} />
            <div id="mytoast"></div>
        </div>;
    }
}