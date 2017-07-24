// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.es6';
import {ModeSelect} from './ModeSelect.es6';
import {Swicth} from './Swicth.es6';
import {LightCh} from './LightCh.es6';
import SettingButton  from './SettingButton.jsx';

var {Router, Route, hashHistory} = ReactRouter;
// alert(document.documentElement.clientWidth);
het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: false,
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    Actions.repaint(data);
});

/**
* 将档位的字符串转化为对应的数字
**/
//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
function stringToGear(gearString){
    let value = "";
    switch(gearString){
        case '关闭':
            value = 0; break;
        case'关':
            value = 0; break;
        case'1档':
            value = 1; break;
        case'2档':
            value = 2; break;
        case'3档':
            value = 3; break;
        case'4档':
            value = 4; break;
        case'5档':
            value = 5; break;
        case'开':
            value = 6; break;
        case'红光':
            value = 7; break;
        case'蓝光':
            value = 8; break;
        case'绿光':
            value = 9; break;
        default:
            value = '';break;
    }
    return value;
}

/**
* 将档位的数字转化为对应的字符串
**/
//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
function gearToString(gear){
    let value = "";
    switch(gear){
        case 0:
            value = '关闭'; break;
        case 1:
            value = '1档'; break;
        case 2:
            value = '2档'; break;
        case 3:
            value = '3档'; break;
        case 4:
            value = '4档'; break;
        case 5:
            value = '5档'; break;
        case 6:
            value = '开'; break;
        case 7:
            value = '红光'; break;
        case 8:
            value = '蓝光'; break;
        case 9:
            value = '绿光'; break;
        default:
            value = '';break;
    }
    return value;
}
/**
* 将角标的数字转化为对应的字符串
**/
//0-没有角标 1-普通角标 2-红色角标
function transCorner(value){
    let res = '';
    switch(value){
        case 0:
            res = 'corners';break;
        case 1:
            res = 'corner';break;
        case 2:
            res = 'redCorner';break;
        default:
            res = 'corners';break;
    }
    return res;
}

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            modelIndex:4,//模式自定义默认
            soundGear:0,//超声波默认
            exportGear:0,//导入导出档位默认
            exportText:0,//导入导出默认默认-导入
            switchMode:0,//按摩模式默认关
            lightMode:0,//灯光默认红
            runTime:5,//运行时间默认10
            modeCorner:1,//模式角标
            soundCorner:1,//超声波角标
            exportCorner:1,//导入导出角标
            switchCorner:1,//按摩角标
            ligntCorner:1,//灯光角标
            timeCorner:1,//运行时间角标
            modeShow:false,
            gearShow:false,
            exportShow:false,
            modelSwitchShow:false,
            lightShow:false,
            runTimeShow:false,
            defaultSound:'1档',//超声波default档位
            defaultExportText:'导入',//导入导出default描述
            defaultExportGear:'1档',//导入导出default档位
            defaultRunTime:10//运行时间default值
        };
        this.listenStore(Store); // 监听Store
    }
    setMode(e){//模式选择
        let busiSwitch = this.state.busiSwitch;
        if(busiSwitch == 1){
            return false;
        }
        this.setState({
            modeShow:true
        });
    }
    closeMode(e){

    }
    modeChoice(){//超声波档位
        let busiSwitch = this.state.busiSwitch;
        let mode = this.state.modelIndex;
        if(busiSwitch == 1 || mode != 4){
            return false;
        }
        let soundGear = this.state.soundGear;
        let soundGearStr = gearToString(soundGear);
        this.setState({
            defaultSound:soundGearStr,
            gearShow:true,
            arrayInit:false
        });
    }
    submitSoundGear(h,m) {//超声波档位确认
        let mode = this.state.modelIndex;
        this.setState({
            gearShow: false,
            arrayInit:true
        });
        Actions.setGear(mode,m);
    }
    export(){//导入导出
        let busiSwitch = this.state.busiSwitch;
        let mode = this.state.modelIndex;
        if(busiSwitch == 1 || mode != 4){
            return false;
        }
        let exportText = this.state.exportText;
        let exportGear = this.state.exportGear;
        let exportTextStr = ['导入/导出','导出','导入'][exportText];
        let exportGearStr = gearToString(exportGear);
        this.setState({
            defaultExportText:exportTextStr,
            defaultExportGear:exportGearStr,
            exportShow:true,
            arrayInit:false
        });
    }
    submitClockExport(h,m) {//导入导出档位确认
        console.log('导入导出：',h,m);
        let mode = this.state.modelIndex;
        this.setState({
            exportShow: false,
            arrayInit:true
        });
        Actions.setExport(mode,h,m);
    }
    modeOpen(){//按摩模式设置
        let busiSwitch = this.state.busiSwitch;
        let mode = this.state.modelIndex;
        if(busiSwitch == 1 || mode != 4){
            return false;
        }
        this.setState({
            modelSwitchShow:true
        });
    }
    modeLight(){//灯光模式设置
        let busiSwitch = this.state.busiSwitch;
        let mode = this.state.modelIndex;
        if(busiSwitch == 1 || mode != 4){
            return false;
        }
        this.setState({
            lightShow:true
        });
    }
    openClick(){//运行时间设置
        let busiSwitch = this.state.busiSwitch;
        let mode = this.state.modelIndex;
        if(busiSwitch == 1 || mode != 4){
            return false;
        }
        let runTime = this.state.runTime;
        this.setState({
            defaultRunTime:runTime,
            runTimeShow:true,
            arrayInit:false
        })
    }
    submitRunTime(h,m) {
        let mode = this.state.modelIndex;
        Actions.submitRunTime(mode,m);
    }
    swiSmart(){//手动-智能模式切换
        if (this.state.skinDataCode==0) {
            het.toast('您还未测试肤质，请先测试肤质！');
            return;
        }
        let busiSwitch = this.state.busiSwitch;
        busiSwitch == 0 ? busiSwitch = 1 : busiSwitch = 0;
        Actions.busiSwitch(busiSwitch);
    }
    submit() {//保存
        Actions.submit();
    }
    cancelClock(){//时间空间取消操作
        this.setState({
            timeshow: false,
            gearShow: false,
            exportShow: false,
            runTimeShow: false,
            arrayInit:true
        });
    }
    render() {
        console.log("最终数据:",JSON.stringify(this.state));
        let busiSwitch = this.state.busiSwitch;//切换手动 智能
        let mode = parseInt(this.state.modelIndex);//1-清洁模式，2-回春模式,3-滋养模式,4-美白模式,5-手动模式
        let modeName = ['清洁模式','回春模式','滋养模式','美白模式','自定义'][mode];
        let soundGear = this.state.soundGear;//超声波档位
        let soundGearBg = this.state.soundGear ? 'photo1' : 'soundGearOff';
        let exportGear = this.state.exportGear;//导出档位
        let exportText = this.state.exportText;//导入/导出描述
        let exportName = ['导入/导出','导出','导入'][exportText];
        let switchMode = this.state.switchMode == 6 ? 0 : 1;//按摩模式设置
        let switchName = '按摩';
        let lightMode = 0;//灯光设置
        if(this.state.lightMode == 7){
            lightMode = 0;
        }else if(this.state.lightMode == 8){
            lightMode = 1;
        }else if(this.state.lightMode == 9){
            lightMode = 2;
        }else{
            lightMode = 3;
        }
        let lightName = ['红光','蓝光','绿光','彩光'][lightMode];
        let minute = this.state.runTime;
        let corner = (<em className="corner"></em>);//模式角标
        let otherCorner = (<div></div>);//其他块角标
        
        let upSection = [{name:modeName,photo:'photo0',corner:transCorner(this.state.modeCorner)},
                         {name:'超声波',photo:soundGearBg,corner:transCorner(this.state.soundCorner)},
                         {name:exportName,photo:'photo2',corner:transCorner(this.state.exportCorner)}];
        // console.log('upSection:',upSection);
        let downSection = [{name:switchName,photo:'photo3',corner:transCorner(this.state.switchCorner)},
                           {name:lightName,photo:'photo4',corner:transCorner(this.state.ligntCorner)},
                           {name:'时长',photo:'photo5',corner:transCorner(this.state.timeCorner)}];
        // console.log('downSection:',downSection);

        let description = (<span></span>); //智能推荐描述
        let batteryOrLine = (<div></div>); //设备电量低或者离线在线
        if(this.state.skinDataCode == 0){
            description = (<span>未测肤无法为您智能推荐,以下为设备默认值<a style={{color:'#007eff',display:'block'}} href="cbeauty://cbeauty_single_skintest">赶紧去测肤>></a></span>);
        }else{
            if(this.state.busiSwitch == 1){
                description = (<span>根据肤质为您智能推荐</span>);
            }else{
                description = (<span>选择一种模式,设置彩光档位、时长</span>);
            }
        }
        if(this.state.electricity <= 3 && this.state.electricity > 0){
            batteryOrLine = (<div className="low-battery"></div>);
        }
        if(this.state.onlineStatus == 2){
            batteryOrLine = (<div className="out-line"></div>);
        }
        return (
                <div>
                    <div className = 'indexTop'>
                        <div className='indexImg'>
                            {batteryOrLine}
                        </div>
                        <div className="smartSwitch">
                            <div className={busiSwitch?'busiSwitch1':'busiSwitch0'} onTouchTap={this.swiSmart.bind(this)}></div>
                        </div>
                    </div>
                    <div className = 'indexCon' >
                        <div className = 'conTitle'>
                            {description}
                        </div>
                        <div className = 'context flex'>
                            {upSection.map(
                                (item,index)=>{
                                return(
                                  <div data-index={index} key={index} className='flex-cell' onTouchTap = {index == 1 ? this.modeChoice.bind(this) : (index == 0 ? this.setMode.bind(this):this.export.bind(this))}>
                                    <i className={item.photo == 'photo0' ? item.photo+mode:(item.photo == 'photo2' ? item.photo+exportText:item.photo) } data-index={index}>
                                        {(index == 2 && exportGear != 0) ? <a className = 'minRight'>{exportGear}档</a>:''}
                                        {(index == 1 && soundGear != 0)? <span className = 'ultrasonic'>{soundGear}<em className="dang">档</em></span>:''}
                                    </i>
                                    <span  data-index={index} className = 'cornerSpan'>{item.name}<em className={item.corner}></em></span>
                                  </div>
                                );
                            })}       
                        </div>
                        <div className = 'context contexts flex'>
                            {downSection.map(
                                (item,index)=>{
                                return(
                                  <div data-index={index} key={index} className='flex-cell' onTouchTap={index == 2 ? this.openClick.bind(this) : (index == 0 ?this.modeOpen.bind(this):this.modeLight.bind(this))}>
                                    <i  className={item.photo == 'photo3' ? item.photo + switchMode : (item.photo == 'photo4' ? item.photo + lightMode : item.photo) } data-index={index}>{item.name == '时长' ? <a className = 'minRight'>{minute}min</a>:''}</i>
                                    
                                    <span  data-index={index} className = 'cornerSpan'>{item.name}<em className={item.corner}></em></span>
                                  </div>
                                );
                            })}       
                        </div>
                        <div className="border"></div>
                        <div id="footer">
                            <SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={this.submit.bind(this)} />
                        </div>
                    </div>       
                    <ModeSelect modeShow={this.state.modeShow} modelIndex={this.state.modelIndex}/>

                    <TimeSelect  hourshow={false} minuteshow={true} defaultminute={this.state.defaultSound} cancelClock={this.cancelClock.bind(this)} arrayInit={this.state.arrayInit}
                    submitClock={this.submitSoundGear.bind(this)} show={this.state.gearShow} minutearr={['关闭','1档','2档','3档','4档','5档']} />

                    <TimeSelect hourshow={true} minuteshow={true} arrayInit={this.state.arrayInit}
                    defaulthour={this.state.defaultExportText} defaultminute={this.state.defaultExportGear}  cancelClock={this.cancelClock.bind(this)}
                    submitClock={this.submitClockExport.bind(this)} show={this.state.exportShow} hourarray={['导入','导出']} minutearr={['关闭','1档','2档','3档','4档','5档']} />

                    <Swicth switchShow = {this.state.modelSwitchShow} swicthIndex={switchMode} mode={this.state.modelIndex}/>
                    
                    <LightCh lightShow = {this.state.lightShow} lightIndex={lightMode} mode={this.state.modelIndex}/>

                    <TimeSelect hourshow={false} minuteshow={true} defaultminute={this.state.defaultRunTime} arrayInit={this.state.arrayInit}
                    cancelClock={this.cancelClock.bind(this)} minuteText={'min'} submitClock={this.submitRunTime.bind(this)} show={this.state.runTimeShow} minutearr={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]} />

                </div>
            );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('彩光导入仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});