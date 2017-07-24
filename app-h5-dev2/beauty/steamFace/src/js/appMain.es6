// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {TimeSelect} from '../../../common/src/TimeSelect.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {ClosePage} from './closePage.es6';
import {Editing} from './editing.es6';
import {DiffusionTwo} from './diffusionTwo.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData:true,  //开启控制数据渲染
        filter:{
            'deviceStatus':0,//仅取控制数据
            'hotSpray1':1,
            'hotSpray2':1,
            'hotSpray3':1,
            'coldSpray1':1,
            'coldSpray2':1,
            'coldSpray3':1,
            'hotSpray1Leave':1,
            'hotSpray2Leave':1,
            'hotSpray3Leave':1,
            'coldSpray1Leave':1,
            'coldSpray2Leave':1,
            'coldSpray3Leave':1,
            'workMinutes':1,
            'workSeconds':1,
            'smartModeSwitch':1,
            'modeName':1,
            'deviceMode':1,
            'power':function(type,data){
                if(type===0 && data.workMinutes===0 && data.workSeconds===0){
                    return false;
                }else{
                    return true;
                }
            }
        }       
    });
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
        //roundIndex 当前选择模式名称的index
        //Xvalue  value 是滑动的刻度值
        //smartModeSwitch  智能模式开关 0手动 1自动
        //deviceMode 智能推荐时传的数据 和手动模式时使用的数据
        //deviceModeIndex 手动模式时设备模式
        //modeName app传过来的模式名称
        //deviceType 用来区分是点击模式名称或者是设备模式
        //hotSpray1Leave ,coldSpary1Leave 热敷冷敷的时间值
        //onOff 1关机  2 开机 用户点击改变设备工作状态 只点击开关按钮时才能改变值1 or 2 其它情况下下发 0 给app
        //deviceStatus 工作状态 0: 上电 1: 睡眠 2: 关机 3: 待机 4: 工作 
        //cbeauty_steamFace_save 保存按钮
        //cbeauty_steamFace_set 设置按钮
        //handTimeArr 用于保存时间值传编辑页面
        //modArr 判断时间组件中选择时间是显示还是隐藏
        //hotAndCold 用于判断显示热喷或冷喷
        //hotTure 切换模式时用来显示热喷的值
        this.state = {roundIndex:-1,Xvalue:0,value:0,oldValue:0,valueM:0,valueH:0,disableEvent:false,smartModeSwitch:0,deviceMode:0,deviceModeIndex:1,modeName:10,deviceType:null,hotSpray1Leave:0,hotSpray2Leave:0,hotSpray3Leave:0,coldSpray1Leave:0,coldSpray2Leave:0,coldSpray3Leave:0,workMinutes:0,workSeconds:0,deviceModeIndexThree:7,cbeauty_steamFace_save:0,cbeauty_steamFace_set:"set",modArr:null,myAllTime:null,timeshow:false,deviceStatus:4,onlineStatus:1,skinTypeName:null,hotTure:false,smartModeSwitch_text:null,recomondConfig:{modeName:0,deviceMode:0,hotSpray1:0,hotSpray2:0,hotSpray3:0,coldSpray1:0,coldSpray2:0,coldSpray3:0},skinDataCode:0,skinTypeName:null,hotSpray1:0,hotSpray2:0,hotSpray3:0,coldSpray1:0,coldSpray2:0,coldSpray3:0};

        this.listenStore(Store); // 监听Store
        
        //模式名称 10我的模式可以编辑时间  当modeName为16时要显示App传我的设备模式
        this.modeNameItems=[
            {modeName:1, name:"弹力修护",explain:"富有活力的弹力肌肤，抵御干燥"},
            {modeName:2, name:"皮肤清洁",explain:"肌肤更加洁净透亮"},
            {modeName:3, name:"快速温热",explain:"快速温热护理，促进护肤品吸收"},//快速温热1 手动模式下才会显示 
            {modeName:4, name:"醒肤模式",explain:"肌肤光滑清爽"},
            {modeName:5, name:"控油护理",explain:"细致毛孔，调节水油平衡"},  
            {modeName:6, name:"快速温热",explain:" "},    //显示快速温热2  推荐数据给
            {modeName:10,name:"我的模式",explain:"根据用户自身需求，手动设置"},
            {modeName:16, name:" ",explain:" "}
            
        ];
      //设备模式
       this.deviceModeItems=[
            {deviceMode:1,name:"日常",explain:"设备同步中"},
            {deviceMode:2,name:"加强",explain:"设备同步中"},
            {deviceMode:3,name:"温热",explain:"快速温热护理，促进护肤品吸收"},
            {deviceMode:4,name:"热雾",explain:"热蒸打开毛孔，高效补水，促进循环"},
            {deviceMode:5,name:"冷雾",explain:"冷喷镇定肌肤，改善敏感肤质"}
       ];
       //this.componentDidMount = this.componentDidMount.bind(this);
       this.componentWillMount=this.componentWillMount.bind(this);
       this.haveDone = 0;

    }
    componentWillMount(){
        //this.state.deviceStatus=4;
        Actions.setEditing();
    }
    //页面一进来改变onOff的值
    // componentDidMount(){
    //      Actions.setEditing();
    // }
    //点击模式名称小圈时改变为选中样式
    maxSelect(e){       
        e.stopPropagation();
       let index = e.target.getAttribute('data-index');
       if(parseInt(index)+1 == this.state.modeName && index!=5) return;
       if(this.state.modeName == 10 && parseInt(index)+1==6) return;
       if(this.state.modeName == 6 && parseInt(index)+1==3) return;
       let type = e.target.getAttribute('data-type'); 
       //if(index!=0 && type==='deviceMode') return; //判断index和type用来阻止设备模式下除“我的模式”以外其它模式的点击事件
       Actions.selectTimeArr(index,type,this.state.deviceMode,parseInt(index)+1,this.state.smartModeSwitch,this.state.modeName);
      
    }
    //..........................................................模式选择区域滑动.................................................................................
   //开始触摸位置
    startrange(e){
        //开始滑动时间刻度 记录初始坐标值
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientX);
        let oldValue = parseInt(this.state.value);
        this.setState({
            oldX: Xvalue,
            oldValue:oldValue
        });
    }
    //滑动
    moverange(e){
        //滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientX);
        let oldX = parseInt(this.state.oldX);
        let value = parseInt(this.state.oldValue)+Xvalue-oldX;
        if(screen.availWidth<=320){
            value = value<-400?-400:value;
        }else{
            value = value<-500?-500:value;
        }
        
        value = value>0?0:value;
        this.setState({
            value:value,
            Xvalue:Xvalue
        });
    }
    //结束触摸
    endrange(e){
        //滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
        e.stopPropagation();
        e.preventDefault();
        let newX = parseInt(this.state.Xvalue);//滑动结束时的y值
        let oldX = parseInt(this.state.oldX);//滑动开始时的y值
        let offsetValue = parseInt(this.state.oldValue);
        let oldValue = parseInt(this.state.value);
        let offset = oldValue<offsetValue? (offsetValue-oldValue) : (oldValue-offsetValue);
        if(e.target.nodeName==='SECTION' && offset<=10){
            this.maxSelect(e);
        };
        let deviceModeIndexThree = e.target.getAttribute('data-index');
        let type = e.target.getAttribute('data-type');
        let deviceStatus=this.state.deviceStatus;
        this.setState({
            oldValue:oldValue,
            disableEvent:false
        });
    }
    //..............................................................智能的移动判断............................................................................
    switchModeStart(e){
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientY);
        let oldValue = parseInt(this.state.valueM);
        this.setState({
            oldX: Xvalue,
            oldValue:oldValue
        });
    }
    switchModeMove(e){
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientY);
        let oldX = parseInt(this.state.oldX);
        let valueM = parseInt(this.state.oldValue)+Xvalue-oldX;
        this.setState({
            valueM:valueM,
            Xvalue:Xvalue
        });
    }
    switchModeEnd(e){
        e.stopPropagation();
        e.preventDefault();
        let newX = parseInt(this.state.Xvalue);//滑动结束时的y值
        let oldX = parseInt(this.state.oldX);//滑动开始时的y值
        let offsetValue = parseInt(this.state.oldValue);
        let oldValue = parseInt(this.state.valueM);
        let offset = oldValue<offsetValue? (offsetValue-oldValue) : (oldValue-offsetValue);
        if(offset<=10){
            this.switchMode(e);
         };
    }
    //..............................................................手动的移动判断.....................................................................
      switchModeStartHand(e){
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientY);
        let oldValue = parseInt(this.state.valueH);
        this.setState({
            oldX: Xvalue,
            oldValue:oldValue
        });
    }
    switchModeMoveHand(e){
        e.stopPropagation();
        e.preventDefault();
        let Xvalue = parseInt(e.touches[0].clientY);
        let oldX = parseInt(this.state.oldX);
        let valueH = parseInt(this.state.oldValue)+Xvalue-oldX;
        //value = value<-600?-600:value;
        //value = value>0?0:value;
        this.setState({
            valueH:valueH,
            Xvalue:Xvalue
        });
    }
    switchModeEndHand(e){
       e.stopPropagation();
        e.preventDefault();
        let newX = parseInt(this.state.Xvalue);//滑动结束时的y值
        let oldX = parseInt(this.state.oldX);//滑动开始时的y值
        let offsetValue = parseInt(this.state.oldValue);
        let oldValue = parseInt(this.state.valueH);
        let offset = oldValue<offsetValue? (offsetValue-oldValue) : (oldValue-offsetValue);
        if(offset<=10){
            this.switchModeHand(e);
         };
    }

    //智能模式按钮切换它对应div的显示隐藏,方法在智能移动end时调用
    switchMode(e){
        if(this.state.smartModeSwitch==1){
            return;
        }else{  
            //参数值              设备模式             模式名称              app开关值          智能手动开关           设备状态
        Actions.switchMode(this.state.recomondConfig.deviceMode,this.state.recomondConfig.modeName,this.state.onOff,this.state.smartModeSwitch,this.state.deviceStatus);
        }
    }
    //手动模式按钮切换它对应div的显示隐藏,方法在手动移动end时调用
    switchModeHand(e){
        if(this.state.smartModeSwitch==0){
            return;
        }else{
            let type = e.target.getAttribute('data-type');
        //参数值                   设备模式              模式名称            app开关值          智能手动开关               设备状态           
        Actions.switchModeHand(this.state.deviceMode,this.state.modeName,this.state.onOff,this.state.smartModeSwitch,this.state.deviceStatus,type,this.state.deviceModeIndexThree);
        }
    }
    //手动模式  我的模式 设置按钮
    setEditing(){
        let deviceModeIndexThree = this.state.deviceModeIndexThree;
        Actions.setEditing(deviceModeIndexThree);
    }
    render() {        
        let roundIndex = this.state.roundIndex;
        //对应两个模式时间的初始变量
        let modeNameArrs = this.state.modeNameArrs || [{},{},{},{},{},{},{}];
        let deviceModeItems = this.state.deviceModeItems || [{},{},{},{},{}];
        let modArr = [0,0,0,0,0,0,0,0];
        let myAllTime=[0,0,0,0,0,0,0,0];
        //模式名称modeName值来取以对应的时间的数组下标 
        let modeNameIndex =0;//modeName对应的时间数组下标
        let deviceModeIndexTwo=0;//deviceMode对应的时间数组下标
        if(this.state.smartModeSwitch==1){
             switch(this.state.recomondConfig.modeName){//根据modeName调整对应的时间下标值
            case 1:
                modeNameIndex = 0;
                break;
            case 2:
                modeNameIndex = 1;
                break;
            case 3:
                modeNameIndex = 8;
                break;
            case 4:
                modeNameIndex = 3;
                break;
            case 5:
                modeNameIndex = 4;
                break;
            case 6:
                modeNameIndex=2;
                break;
            case 10:
                modeNameIndex = 6;
                break;
            case 16:
                modeNameIndex = 7;
                break;
        } 
        switch(this.state.recomondConfig.deviceMode){//根据deviceMode调整对应的时间下标值
            case 1:
                deviceModeIndexTwo = 0;
                break;
            case 2:
                deviceModeIndexTwo = 1;
                break;
            case 3:
                deviceModeIndexTwo = 2;
                break;
            case 4:
                deviceModeIndexTwo = 3;
                break;
            case 5:
                deviceModeIndexTwo = 4;
                break;
        }
        }else{ switch(this.state.modeName){//根据modeName调整对应的时间下标值
            case 1:
                modeNameIndex = 0;
                break;
            case 2:
                modeNameIndex = 1;
                break;
            case 3:
                modeNameIndex = 8;
                break;
            case 4:
                modeNameIndex = 3;
                break;
            case 5:
                modeNameIndex = 4;
                break;
            case 6:
                modeNameIndex=2;
                break;
            case 10:
                modeNameIndex = 6;
                break;
            case 16:
                modeNameIndex = 7;
                break;
        } 
        switch(this.state.deviceMode){//根据deviceMode调整对应的时间下标值
            case 1:
                deviceModeIndexTwo = 0;
                break;
            case 2:
                deviceModeIndexTwo = 1;
                break;
            case 3:
                deviceModeIndexTwo = 2;
                break;
            case 4:
                deviceModeIndexTwo = 3;
                break;
            case 5:
                deviceModeIndexTwo = 4;
                break;
        }}
       
        let deviceType = this.state.modeName==16?'deviceMode':null;
        // smartModeSwitch  智能模式开关 0手动 1自动
        let modeArrs = this.state.smartModeSwitch == 1 ? modeNameArrs :(this.state.modeName==16 ? deviceModeItems : modeNameArrs) ;
        //当有设备模式并且为手动显示设备模式的信息
        let items = (deviceType==null && this.state.smartModeSwitch==0)  ? this.modeNameItems : this.deviceModeItems ;
        //判断用哪个时间数组的 smartModeSwitch=1 自动
        let deviceModeIndexThree = this.state.smartModeSwitch == 1 ?modeNameIndex :(this.state.modeName==16 ? deviceModeIndexTwo :modeNameIndex );

          //deviceModeIndexThree = (deviceType=="deviceMode" && this.state.modeName==16 && this.state.smartModeSwitch==0) ? deviceModeIndexTwo : this.state.deviceModeIndexThree;
        items = modeNameIndex==6?this.modeNameItems:items;
        //判断是否是设备模式下的第一个模式“手动模式”
        if(this.state.returnModeSwitch) deviceModeIndexThree = 0;
        if(this.state.returnModeSwitch && this.state.smartModeSwitch==0) deviceModeIndexThree = 7;
        if(this.state.modeName==0 && this.state.deviceMode==0) deviceModeIndexThree=7;
        if(this.state.modeName>16 && this.state.deviceMode>5) deviceModeIndexThree=7;
        if(this.state.modeName==undefined && this.state.deviceMode==undefined) deviceModeIndexThree=7;
        let styleSetButton = deviceType == null && deviceModeIndexThree==6 ? {display: 'inline-block'} : {display: 'none'};
        let explain = deviceModeIndexThree==8? null : items[deviceModeIndexThree].explain;   
        if(modeArrs) {
            modArr= [
            modeArrs[deviceModeIndexThree].hotSpray1,
            modeArrs[deviceModeIndexThree].coldSpray1,
            modeArrs[deviceModeIndexThree].hotSpray2,
            modeArrs[deviceModeIndexThree].coldSpray2,
            modeArrs[deviceModeIndexThree].hotSpray3,
            modeArrs[deviceModeIndexThree].coldSpray3,
            modeArrs[deviceModeIndexThree].workMinutes,
            modeArrs[deviceModeIndexThree].workSeconds
        ];}
        if(this.state.smartModeSwitch==1){
            modArr=modArr;
        //我的模式 下用户冷热喷时间
        }else  if(this.state.modeName == 10 && this.state.smartModeSwitch==0){          
            modArr = this.state.myAllTime ? this.state.myAllTime : [12,0,0,0,0,0,1,0];
            if(this.state.hotSpray1+this.state.hotSpray2+this.state.hotSpray3+this.state.coldSpray1+this.state.coldSpray2+this.state.coldSpray3){
                modArr = this.state.myAllTime ? this.state.myAllTime:[
                    this.state.hotSpray1,
                    this.state.coldSpray1,
                    this.state.hotSpray2,
                    this.state.coldSpray2,
                    this.state.hotSpray3,
                    this.state.coldSpray3,
                    this.state.workMinutes,
                    this.state.workSeconds
                ];
            }
        }else{
            modArr=this.state.modArr? this.state.modArr : modArr;
        };             
        let smartModeSwitch_text=null;
        //判断显示模式名称和设备模式
        if(this.state.smartModeSwitch==0){
            if(this.state.modeName==1){
                smartModeSwitch_text="弹力修护";
            }else if(this.state.modeName==2){
                smartModeSwitch_text="皮肤清洁";
            }else if(this.state.modeName==3){
                smartModeSwitch_text="快速温热";
            }else if(this.state.modeName==4){
                smartModeSwitch_text="醒肤模式";
            }else if(this.state.modeName==5){
                smartModeSwitch_text="控油护理";
            }else if(this.state.modeName==6){
                smartModeSwitch_text="快速温热";
            }else if(this.state.modeName==10){
                smartModeSwitch_text="我的模式";
            }else if(this.state.modeName==16){
                smartModeSwitch_text="设备模式";
                switch(this.state.deviceMode){
                    case 1:
                        explain = "设备模式同步中";
                    break;
                    case 2:
                        explain = "设备模式同步中";
                    break;
                    case 3:
                        explain="快速温热护理，促进护肤品吸收";
                    break;
                    case 4:
                        explain="热蒸打开毛孔，高效补水，促进循环";
                    break;
                    case 5:
                        explain="冷喷镇定肌肤，改善敏感肤质";
                    break;
                }
            }
        }
        //判断是手动模式下 的 设备模式 显示运行数据传来的冷热喷时间
        if(this.state.smartModeSwitch==0 && this.state.modeName==16){
            modArr=[this.state.hotSpray1,this.state.coldSpray1,this.state.hotSpray2,this.state.coldSpray2,this.state.hotSpray3,this.state.coldSpray3,this.state.workMinutes,this.state.workSeconds];
        }
        
        //判断剩余时间  用来冷热喷切换
        let b=7;
        b = (this.state.hotSpray1Leave<= modArr[0] &&this.state.hotSpray1Leave>0) ? 1 : b;
        b = (this.state.hotSpray2Leave<= modArr[2] &&this.state.hotSpray2Leave>0 && this.state.coldSpray1Leave<=0 && this.state.hotSpray1Leave<=0) ? 3 : b;
        b = (this.state.hotSpray3Leave<= modArr[4] &&this.state.hotSpray3Leave>0 && this.state.coldSpray2Leave<=0 && this.state.hotSpray1Leave<=0 && this.state.coldSpary1Leave<=0 && this.state.hotSpray2Leave<=0) ? 5 : b;
        b = (this.state.coldSpray1Leave<=modArr[1] &&this.state.coldSpray1Leave>0 && this.state.hotSpray1Leave<=0) ? 2 : b;
        b = (this.state.coldSpray2Leave<=modArr[3] &&this.state.coldSpray2Leave>0 && this.state.hotSpray1Leave<=0 && this.state.coldSpary1Leave<=0 &&  this.state.hotSpray2Leave<=0) ? 4 : b;
        b = (this.state.coldSpray3Leave<=modArr[5] &&this.state.coldSpray3Leave>0  && this.state.hotSpray1Leave<=0 && this.state.coldSpary1Leave<=0 &&  this.state.hotSpray2Leave<=0 && this.state.coldSpray2Leave<=0 && this.state.hotSpray3Leave<=0) ? 6 : b;
        
        //用来切换冷热喷小图标背景图
         let hotOneF = this.state.hotSpray1Leave<=0?true:false;
         let coldOneF = (this.state.coldSpray1Leave+this.state.hotSpray1Leave)<=0?true:false;
         let hotTwoF =(this.state.coldSpray1Leave+this.state.hotSpray1Leave+this.state.hotSpray2Leave)<=0?true:false;
         let coldTwoF=(this.state.coldSpray1Leave+this.state.hotSpray1Leave+this.state.hotSpray2Leave+this.state.coldSpray2Leave)<=0?true:false;
         let hotThreeF=(this.state.coldSpray1Leave+this.state.hotSpray1Leave+this.state.hotSpray2Leave+this.state.coldSpray2Leave+this.state.hotSpray3Leave)<=0?true:false;
         let coldThreeF=(this.state.coldSpray1Leave+this.state.hotSpray1Leave+this.state.hotSpray2Leave+this.state.coldSpray2Leave+this.state.hotSpray3Leave+this.state.coldSpray3Leave)<=0?true:false;
        
        let tipsText=false;
        if(b===7 && this.haveDone == 6){
            tipsText = true;
        }
        if(b!=7){this.haveDone = b};
        if(this.state.hiddenText){
            b=7;
            tipsText = false;
            this.haveDone = 0;
        }
        return (
            <div>
            {this.state.deviceStatus!=4 || this.state.onlineStatus==2? <ClosePage stateItems={this.state} modArr={modArr} />:null}
            <div className="cold_div" style={{display:this.state.deviceStatus==4 && this.state.onlineStatus!=2 ? 'block':'none'}}>
                   <DiffusionTwo b={b}  smartModeSwitch={this.state.smartModeSwitch} modeName={this.state.modeName} deviceMode={this.state.deviceMode} hotSpray1={this.state.hotSpray1} hotSpray2={this.state.hotSpray2}  hotSpray3={this.state.hotSpray3} coldSpray1={this.state.coldSpray1} coldSpray2={this.state.coldSpray2}  coldSpray3={this.state.coldSpray3} workMinutes={this.state.workMinutes} workSeconds={this.state.workSeconds} modArr={modArr}/>
                   <div className="selectMode">
                        <span onTouchStart={this.switchModeStart.bind(this)}  onTouchMove={this.switchModeMove.bind(this)} onTouchEnd={this.switchModeEnd.bind(this)} className={"auto_div"+ (this.state.smartModeSwitch==1 ? "  c3" : "  e5")}>智能模式</span>
                        <span onTouchStart={this.switchModeStartHand.bind(this)}  onTouchMove={this.switchModeMoveHand.bind(this)} onTouchEnd={this.switchModeEndHand.bind(this)}  className={"operation_div" + (this.state.smartModeSwitch==0 ? "  c3" : "  e5")}>手动模式</span>
                   </div>
                   <div className="gap"></div>
                {/*...................................手动begin....................................................................................*/}

                   <div className={"selectMode_text"+ (this.state.smartModeSwitch==0 ? "" : " hide")}>
                            <p>模式选择:</p>
                    </div>
                    <div style={{marginBottom:smartModeSwitch_text==null?"2rem":"0px"}}  className={"selectMode_select" + (this.state.smartModeSwitch==0 ? "" : "  hide")} 
                        onTouchStart={this.startrange.bind(this)}  onTouchMove={this.moverange.bind(this)}  onTouchEnd={this.endrange.bind(this)}>
                        <div style={{marginLeft:this.state.value+'px'}}>
                                <div className={"selectMod_select_div "+((this.state.roundIndex>=0 || this.state.deviceModeIndex>=0)?"selectMod_select_div_max ":'')+(this.state.deviceMode==5?'fiveDeviceMode':' ')}> 
                                {/*..................模式名称map显示..............................................................................................................*/}                      
                                    {this.modeNameItems.map(function(e,index){
                                            return(
                                                <div className={"round-div translateY "+((deviceModeIndexThree==index|| (deviceModeIndexThree==6&&index==5)) && deviceType==null?"round-div-max"+deviceModeIndexThree:'')}>
                                                 <span data-index={index} refs="round_span"  className={"round_span "+(deviceModeIndexThree==index || (deviceModeIndexThree==6&&index==5)?"round_span-max":'')}></span>
                                                 <section data-index={index} style={{position:'absolute',width: '40px',height: '40px',top: '-15px',left:(index===0?'30px':'-10px'),zIndex:9999}}></section>
                                                </div>);
                                             }.bind(this))}
                                        {/*..........设备名称.................................*/}
                                    {this.deviceModeItems.map(function(e,deviceMode){
                                         return(<div className={"round-div translateY "+(this.state.deviceMode==deviceMode+1 &&  deviceType=='deviceMode' ?"round-divOne-max"+this.state.deviceMode :'')}>
                                                 <span data-index={deviceMode+1} data-type='deviceMode' refs="round_span" 
                                                 className={"round_span "+(roundIndex<=0  &&  this.state.deviceMode==deviceMode+1?"round_span-max":'')}></span></div>);
                                             }.bind(this))}

                                   <div className="crosswise translateY"></div>                                                                                
                                </div>
                                <div className="selectMode_Combine">
                                    <div className="selectMode_select_text modeNameItems">
                                    {this.modeNameItems.map(function(e,index){
                                       return(<div className="round-div_text">{e.name}</div>);
                                     }.bind(this))}
                                </div>
                                <div className="selectMode_select_text deviceModeItems">
                                    {this.deviceModeItems.map(function(e,deviceModeIndex){
                                       return(<div className="round-div_text">{e.name}</div>);
                                     }.bind(this))}
                                </div>
                                </div>
                        </div>
                    </div>
                  {/*...................................手动end....................................................................................*/}                  
                    <div className={"select_Ok" + (this.state.smartModeSwitch===1 || smartModeSwitch_text==null ?  "  hide":""  )} >
                            <span className="span_mode" style={{display:deviceModeIndexThree==7?'none':'block'}}>
                            {smartModeSwitch_text ? (
                                <label>
                                    <span className="span_modeName">{smartModeSwitch_text}</span>
                                    <span>{':'+explain}</span>
                                </label>
                                ):null}
                                <span className="span-set" style={styleSetButton}><Link className="set_span" to="editing" ><span>设置</span></Link></span>
                            </span>
                    </div>
                   
                     {/*...................................自动begin....................................................................................*/}
                    <div className={"cold_Mode_div"  + (this.state.smartModeSwitch===1 ? "" : " hide")}>
                            {this.state.skinDataCode==1?<p>您的肤质为{this.state.skinTypeName},为您专属推荐:</p> :
                            <p>无法获取您的肤质，建议您去<a href="cbeauty://cbeauty_single_skintest">测试肤质</a></p>}
                            
                            <div className="div_span">
                                <span className={this.state.recomondConfig.deviceMode==1?"show":"hide"}>日常</span>
                                <span className={this.state.recomondConfig.deviceMode==2?"show":"hide"}>加强</span>
                                <span className={this.state.recomondConfig.deviceMode==3?"show":"hide"}>温热</span>
                                <span className={this.state.recomondConfig.deviceMode==4?"show":"hide"}>热雾</span>
                                <span className={this.state.recomondConfig.deviceMode==5?"show":"hide"}>冷雾</span>
                                <span className={this.state.recomondConfig.modeName==1?"show":"hide"}>弹力修护</span>
                                <span className={this.state.recomondConfig.modeName==2?"show":"hide"}>皮肤清洁</span>
                                <span className={this.state.recomondConfig.modeName==3?"show":"hide"}>快速温热2</span>
                                <span className={this.state.recomondConfig.modeName==4?"show":"hide"}>醒肤模式</span>
                                <span className={this.state.recomondConfig.modeName==5?"show":"hide"}>控油护理</span>                                 
                            </div>
                    </div>
                    {/*..................................自动end....................................................................................*/}

                    <div className="div-info">
                         {/*....................................left图标位置begin..............................................*/}
                        <div className="div_box_lef">
                                    <div className={hotOneF?"div_hotF_img":"div_hot_img"}></div>
                                    <div className="vertical"></div>
                                    <div className={coldOneF?"div_coldF_img":"div_cold_img"}></div>
                                    <div className="vertical"></div>
                                    <div className={hotTwoF?"div_hotF_img":"div_hot_img"}></div>
                                    <div className="vertical"></div>
                                    <div className={coldTwoF?"div_coldF_img":"div_cold_img"}></div>
                                    <div className="vertical"></div>
                                    <div className={hotThreeF?"div_hotF_img":"div_hot_img"}></div>
                                    <div className="vertical"></div>
                                    <div className={coldThreeF?"div_coldF_img":"div_cold_img"}></div>
                        </div>
                         {/*....................................left图标位置end..............................................*/}
                        <div className="div_box_right">
                           {modArr.map(function(item,index){
                            let m =  parseInt(item/12);
                            let s = (item/12-parseInt(item/12))*60;
                                    return(
                                        <div style={{display:index==6 ||  index==7 ?'none':'inline-block'}} className={"div_operation "+(index==0?'div_operation0':"" || index==5?'div_operation5':"") }>
                                            <div className="div_time">
                                                <span className="span_text" >{index%2==0 ? '热喷' : '冷喷'}</span><br/>
                                                <span className="span_time">{m>0?m+" min ":null}{s>0?s+" s":null}</span></div>
                                                <div data-index={index} className="div_editing">
                                                    {b==7?(tipsText?'已完成':null):(
                                                        b==(index+1)?<span className="serviceIng">运行中</span>:(b>(index+1)?'已完成':'')
                                                    )}
                                            </div>
                                        </div>
                                    );
                             }.bind(this))}                     
                        </div>    
                    </div> 
            </div>
            {/*{this.state.cbeauty_steamFace_set==null?<Editing modArr={modArr} deviceModeIndexThree={deviceModeIndexThree} modeArrs={modeArrs} timeshow={this.state.timeshow} />:null}*/}
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/editing" component={Editing} />
        </Router>
    ), document.getElementById('ROOT'));
});