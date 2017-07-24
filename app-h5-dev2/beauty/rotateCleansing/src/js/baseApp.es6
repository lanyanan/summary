// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Guider} from './Guider.es6';
import {SortPanel} from './SortPanel.es6';
import {TimeSelect} from './TimeSelect.es6';
import SettingButton  from './SettingButton.jsx';

var {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : false,
        filter : {
            
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
export class App extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            work:0,
            part:0,
            valueH:0,
            timeshow: false,
            model: 0,
            smartModeSwitch: 0,
            changed: false,
            activeIndexArr: [],
            currenActiveIndex: -1,
            showTestSkin:0,
            currentConfig:{},
            recommendConfig:{},
            needSave: false,
            arr: [],
            arrayInit: false,
            defaulthour:'低',
            defaultminute:5,
            defaultsecond:'单向',
            recDescription:''
        };
        this.items = [{'name':'额头','speed':1,'time':'','direction':1,'imageClass':'forehead-img','changed':false,'remark':''},
                    {'name':'鼻子','speed':1,'time':'','direction':1,'imageClass':'nose-img','changed':false,'remark':''},
                    {'name':'下巴','speed':1,'time':'','direction':1,'imageClass':'chin-img','changed':false,'remark':''},
                    {'name':'左脸','speed':1,'time':'','direction':1,'imageClass':'left-face-img','changed':false,'remark':''},
                    {'name':'右脸','speed':1,'time':'','direction':1,'imageClass':'right-face-img','changed':false,'remark':''}];
        this.minminute = 5;
        this.maxminute = 20;
        this.recDescription = '';
        this.listenStore(Store); // 监听Store
        //Actions.refreshData();
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
            activeIndex == 0 ? this.maxminute = 40 : this.maxminute = 20;
            switch(parseInt(activeIndex)){
                case 0:
                    this.recDescription = this.items[0].remark;
                    h = this.checkGears(this.items[0].speed);
                    m = this.items[0].time;
                    if(m < 5){
                        m = 5;
                    }else if(m > 40){
                        m = 40;
                    }
                    s = this.checkRotation(this.items[0].direction);
                    break;
                case 1:
                    this.recDescription = this.items[1].remark;
                    h = this.checkGears(this.items[1].speed);
                    m = this.items[1].time;
                    m = this.checkMinute(m);
                    s = this.checkRotation(this.items[1].direction);
                    break;
                case 2:
                    this.recDescription = this.items[2].remark;
                    h = this.checkGears(this.items[2].speed);
                    m = this.items[2].time;
                    m = this.checkMinute(m);
                    s = this.checkRotation(this.items[2].direction);
                    break;
                case 3:
                    this.recDescription = this.items[3].remark;
                    h = this.checkGears(this.items[3].speed);
                    m = this.items[3].time;
                    m = this.checkMinute(m);
                    s = this.checkRotation(this.items[3].direction);
                    break;
                case 4:
                    this.recDescription = this.items[4].remark;
                    h = this.checkGears(this.items[4].speed);
                    m = this.items[4].time;
                    m = this.checkMinute(m);
                    s = this.checkRotation(this.items[4].direction);
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
        this.items[0].direction = this.state.foreheadRotation!==nextState.foreheadRotation?nextState.foreheadRotation:this.items[0].direction;//额头旋转方向
        this.items[0].changed = this.state.foreheadChanged!==nextState.foreheadChanged?nextState.foreheadChanged:this.items[0].changed;
        this.items[0].remark = this.state.foreheadRemarks!==nextState.foreheadRemarks?nextState.foreheadRemarks:this.items[0].remark;
        this.items[1].speed = this.state.noseGears!==nextState.noseGears?nextState.noseGears:this.items[1].speed;//鼻子速度
        this.items[1].time = this.state.noseRuntime!==nextState.noseRuntime?nextState.noseRuntime:this.items[1].time;//鼻子时间
        this.items[1].direction = this.state.noseRotation!==nextState.noseRotation?nextState.noseRotation:this.items[1].direction;//鼻子旋转方向
        this.items[1].changed = this.state.noseChanged!==nextState.noseChanged?nextState.noseChanged:this.items[1].changed;
        this.items[1].remark = this.state.noseRemarks!==nextState.noseRemarks?nextState.noseRemarks:this.items[1].remark;
        this.items[2].speed = this.state.chinGears!==nextState.chinGears?nextState.chinGears:this.items[2].speed;//下巴速度
        this.items[2].time = this.state.chinRuntime!==nextState.chinRuntime?nextState.chinRuntime:this.items[2].time;//下巴时间
        this.items[2].direction = this.state.chinRotation!==nextState.chinRotation?nextState.chinRotation:this.items[2].direction;//下巴旋转方向
        this.items[2].changed = this.state.chinChanged!==nextState.chinChanged?nextState.chinChanged:this.items[2].changed;
        this.items[2].remark = this.state.chinRemarks!==nextState.chinRemarks?nextState.chinRemarks:this.items[2].remark;
        this.items[3].speed = this.state.leftfaceGears!==nextState.leftfaceGears?nextState.leftfaceGears:this.items[3].speed;//左脸速度
        this.items[3].time = this.state.leftfaceRuntime!==nextState.leftfaceRuntime?nextState.leftfaceRuntime:this.items[3].time;//左脸时间
        this.items[3].direction = this.state.leftfaceRotation!==nextState.leftfaceRotation?nextState.leftfaceRotation:this.items[3].direction;//左脸旋转方向
        this.items[3].changed = this.state.leftfaceChanged!==nextState.leftfaceChanged?nextState.leftfaceChanged:this.items[3].changed;
        this.items[3].remark = this.state.leftfaceRemarks!==nextState.leftfaceRemarks?nextState.leftfaceRemarks:this.items[3].remark;
        this.items[4].speed = this.state.rightfaceGears!==nextState.rightfaceGears?nextState.rightfaceGears:this.items[4].speed;//右脸速度
        this.items[4].time = this.state.rightfaceRuntime!==nextState.rightfaceRuntime?nextState.rightfaceRuntime:this.items[4].time;//右脸时间
        this.items[4].direction = this.state.rightfaceRotation!==nextState.rightfaceRotation?nextState.rightfaceRotation:this.items[4].direction;//右脸旋转方向
        this.items[4].changed = this.state.rightfaceChanged!==nextState.rightfaceChanged?nextState.rightfaceChanged:this.items[4].changed;
        this.items[4].remark = this.state.rightfaceRemarks!==nextState.rightfaceRemarks?nextState.rightfaceRemarks:this.items[4].remark;
    }
    cancelClock(){
        this.setState({
            timeshow: false,
            arrayInit:true
        });
    }
    submitClock(h,m,s){
        let index = this.state.currenActiveIndex;
        let items = this.items;
        if(items[index].speed != this.checkGearsString(h) || items[index].time != m || items[index].direction != this.checkRotationString(s)){
            items[index].changed = true;
        }else{
            if(items[index].changed){
                items[index].changed = true;
            }else{
                items[index].changed = false;
            }
        }
        items[index].speed = this.checkGearsString(h);
        items[index].time = m;
        items[index].direction = this.checkRotationString(s);
        this.setState({
            timeshow: false,
            needSave: true,
            arrayInit:true
        });
        Actions.changeGears(index,h,m,s,items);
    }
    submit(){
        for(let i=0,len=this.items.length;i<len;i++){
            this.items[i].changed = false;
        }
        Actions.submit(this.items);
    }
    changeModel(){
        let model = this.state.smartModeSwitch;
        if(this.state.skinType == null && !model){
            het.toast('您还未测试肤质，请先测试肤质！');
            return;
        }else{
            Actions.changeMode(model);
        }
    }
    checkGears(gears){
        switch(gears){
            case 1: return '低';break;
            case 2: return '中';break;
            case 3: return '高';break;
            default: return '低';
        }
    }
    checkRotation(rotation){
        switch(rotation){
            case 1: return '单向';break;
            case 2: return '双向-切换1次';break;
            case 3: return '双向-切换2次';break;
            case 4: return '双向-切换3次';break;
            default:return '单向';
        }
    }
    checkGearsString(gearstring){
        switch(gearstring){
            case '低': return 1;break;
            case '中': return 2;break;
            case '高': return 3;break;
            default: return 1;
        }
    }
    checkRotationString(rotationString){
        switch(rotationString){
            case '单向': return 1;break;
            case '双向-切换1次': return 2;break;
            case '双向-切换2次': return 3;break;
            case '双向-切换3次': return 4;break;
            default:return 1;
        }
    }
    testSkin(){
        het.toast('为了使智能洁面仪的使用效果更好，推荐您先使用测肤仪进行肤质测试.');
    }
    render() {
        console.log('最终数据',this.state);
        console.log('this.items',this.items);
        let items = this.items;
        let description = (<span></span>); //智能推荐描述
        let batteryOrLine = (<div></div>); //设备电量低或者离线在线
        if(this.state.skinType === null){
            description = (<span>为使智能洁面仪的效果更好,推荐您先使用测肤仪进行肤质测试,<a style={{color:'#007eff'}} href="cbeauty://cbeauty_single_skintest">去测试肤质>></a></span>);
        }else{
            if(this.state.smartModeSwitch == 0){
                description = (<span>选择一个部位，设置洁面参数</span>)
            }else{
                description = (<span>已根据您皮肤数据智能推荐最合适的方案</span>);
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
        return (<div>
            <header>
                <div className="logo">
                    {batteryOrLine}
                </div>
                <div className="gear">
                    <a className={this.state.smartModeSwitch === 0 ? 'gear-choose' : 'gear-choose-active'} onTouchEnd={this.changeModel.bind(this)}></a>
                </div>
            </header>
            <section>
                <p className="tips">
                    {description}
                </p>
                <div className="rc-div">
                    <div className="rc-right-div">
                        {items.map((item,index)=>{
                            return(
                                <div className="items" key={index} data-index={index} onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)}  onTouchEnd={this.endTouch.bind(this)}>
                                    <p>{item.name}</p>
                                    <div>
                                        <span>速度:<em className={ (item.changed && this.state.activeIndexArr.indexOf(index) != -1) ? 'active' : ''}>{this.checkGears(item.speed)}</em></span>
                                        <span>时间:<em className={ (item.changed && this.state.activeIndexArr.indexOf(index) != -1) ? 'active' : ''}>{item.time + 'S'}</em></span>
                                        <span>方向:<em className={ (item.changed && this.state.activeIndexArr.indexOf(index) != -1) ? 'active' : ''}>{this.checkRotation(item.direction)}</em></span>
                                    </div>
                                    <div className={'part-img ' + item.imageClass}></div>
                                    <i className={this.state.smartModeSwitch === 0 ? 'arrow-right' : ''}></i>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <div id="footer">
                <SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={this.submit.bind(this)} />
            </div>
            <TimeSelect title={this.recDescription} hourshow={true} minuteshow={true} secondshow={true} 
                        cancelClock={this.cancelClock.bind(this)} submitClock={this.submitClock.bind(this)}
                        ArrayInit={this.state.arrayInit} defaulthour={this.state.defaulthour} defaultminute={this.state.defaultminute} defaultsecond={this.state.defaultsecond}
                        statusname=" " show={this.state.timeshow} maxminute={this.maxminute} minminute={this.minminute} hourarray={['低','中','高']}
                        secondarray={['单向','双向-切换1次','双向-切换2次','双向-切换3次']} titleshow={false} />
        </div>);
    }
}