/**
 * Created by yuanyunlong on 2016/12/28.
 */

import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import React from 'react';
import {Store} from './Store.jsx';
import {Actions} from './Actions.jsx';
import {Wave} from './Wave.jsx';
import {WorkingLoadingAnimation} from './WorkingLoadingAnimation.jsx';
import {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS} from  './washerConstData.js';

let isIOS = false;
let controlPanel = [
    {id:0, name:'童锁'},
    {id:1, name:'暂停'},
    {id:2, name:'模式'},
    {id:3, name:'关机'},
];

export class Working extends BaseComponent{
    constructor(props){
        super(props);
        this.state= {
            isToMain: false
        }
    }
    componentDidMount() {
        //导航栏:{ios:73,android:64}
        isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));

    }

    generatorPorcessArray() {

        let operate = this.props.operate;
        let set_orderTimeIndex  = operate.get_orderTimeValue || 0;
        let processData          = operate.get_processValue || '洗涤+漂洗+脱水';
        let workModeIndex =  operate.WorkStep || 0;   // 这个正在工作的模式 1- 7 为工作


        // let userSetWasherMode = operate.get_selectModeValue || 0;
        // let washConfigData =  washerModeS[userSetWasherMode];
         let workModeArray = ["参数设置阶段","预约","称重","浸泡","洗涤","漂洗","脱水","风干","洗涤结束"];
        let currentWorkName =  workModeArray[workModeIndex];

        let processWorkArray = []; // 工作数组，用来产生动画页面

        console.log("TimeIndex: " + set_orderTimeIndex + " processData" + processData + " workModeIndex: " + workModeIndex);
        let leftTime = 0;
        switch(workModeIndex){
            case 1: leftTime = operate.CurOrderSurplusTime   || 0;     break;
            case 3: leftTime = operate.CurSoakSurplusTime    || 0;     break;
            case 4: leftTime = operate.CurWashSurplusTime    || 0;     break;
            case 5: leftTime = operate.CurRinseSurplusTime   || 0;     break;
            case 6: leftTime = operate.CurDehydrationSurplusTime || 0; break;
            case 7: leftTime = operate.CurAirDrySurplusTime  || 0;     break;
            default:
                leftTime = 1;
                break;
        }

        let processArray = processData.split("+");
        if(set_orderTimeIndex != 0){
            processArray.splice(0,0,"预约");
        }
        for(let i = 0 ; i < processArray.length; i++){
            let modeData = {
                isLine:false,
                name:processArray[i],
                id: i,
                isWorkingProcess: (currentWorkName == processArray[i]),
                leftTime:leftTime,
            }
            let lineModeData = {
                isLine:true,
                name:'0',
                id: i,
                isWorkingProcess: '0',
            }
            if(i!=0){
                processWorkArray.push(lineModeData);
            }
            processWorkArray.push(modeData);
        }

        console.log("processWorkArray done");
        return  processWorkArray;
    }


    touchModeAction(e){


      let modeIndex =  parseInt(e.currentTarget.getAttribute("data-mode")) ;

        switch(modeIndex){
            case 0:
                if(typeof this.props.childLockAction === 'function'){
                    this.props.childLockAction();
                }
                break;
            case 1:
                if(typeof this.props.stopAction === 'function'){
                    this.props.stopAction();
                }
                break;
            case 2:
                if(typeof this.props.setingPageAction === 'function'){
                    this.props.setingPageAction();
                }

                break;
            case 3:
                if(typeof this.props.switchAction === 'function'){
                    this.props.switchAction();
                }
                break;
            default:
                break;
        }
    }

    handleToSeting(){
        console.log('touchTap事件测试');
        window.location.href = '#/seting';
    }

    handleToMainPage(){
       // let isWorking = ( this.props.show ) ? ! this.props.show  : false ;
      //  Actions.changeToWorkingPage(false);
    }

    render(){
//控制数据

         let operate = this.props.operate;

        console.log("operate: ");
        let processWorkArray = this.generatorPorcessArray();  //洗涤+漂洗+脱水
       // let processWorkArray = ["洗涤","漂洗","脱水"];
        console.log("processArray:  " + processWorkArray);

        let workClassName = this.props.show ? 'workingPage slide-up' : 'workingPage  slide-down' ;
        let zIndex = this.props.show ? {'zIndex':'3', 'display':'block'} : {'zIndex':'-1', 'display':'block'};
        let navigation = isIOS ?' ios':' android';


        let modeIndex =  operate.get_selectModeValue || 0;
        let workMode = washerModeS[modeIndex];
        let workModeSubMode = "("+operate.get_specialValue+")";

        let stopLock = operate.washerIsStop || false;        // true  为暂定工作
        let childLock = operate.washerChildLock || false;    // true 打开童锁
        let switchLock = operate.washerSwitchLock || false;  // true 打开的
        let workModeIndex =  operate.WorkStep || 0;   // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击

        let workStatus = '工作中';

        if(stopLock){
            workStatus = '暂停中';
        }

        if(workModeIndex == 8){
            workStatus = '洗衣完成';
        }



        console.log("mode: " + workMode.name + " subMode: " + workModeSubMode + " stopLock：" + stopLock + " childlock: " + childLock + " workModeIndex:" + workModeIndex);

        return <div className={workClassName} style={zIndex} >
            <nav className={navigation}></nav>
            <div className="controlView flex">
                {controlPanel.map(function (o,index) {
                    let path = '../static/image/work/m-' + o.id +'-off.png';
                    if(o.id == 3){
                        path = '../static/image/work/m-' + o.id +'-off.png';
                    }else if(o.id == 0){
                        //path = '../static/image/work/m-' + o.id + (childLock?'-on.png':'-off.png');
                        path = '../static/image/work/m-' + o.id + '-off.png';
                    }else if(o.id == 1){
                        path = '../static/image/work/m-' + o.id + (stopLock?'-on.png':'-off.png');
                        // 正在预约，不能点击
                        if(workModeIndex==1){
                            path = '../static/image/work/m-1-on.png';
                        }
                    }else if(o.id == 2){
                        path = '../static/image/work/m-' + o.id + (stopLock?'-off.png':'-on.png');
                        // 正在预约，不能点击
                        if(workModeIndex==1){
                            path = '../static/image/work/m-2-on.png';
                        }
                    }

                    if(childLock){
                        path = '../static/image/work/m-' + o.id + '-on.png';
                        if(o.id == 0){
                            path = '../static/image/work/m-' + o.id + '-off.png';
                        }
                    }

                    return <dl className="flex-cell" key={index} name={o.id} data-mode={o.id} onTouchStart={this.touchModeAction.bind(this)}>
                        <dd><img src={path}  width='36' height='36'/></dd>
                        <dt>{o.name}</dt>
                    </dl>
                }.bind(this))

                }
            </div>
            <div className="workWaveDiv">
                <Wave  waveID="workingWave"/>
            </div>
            <div className="workStatus"><span>{workStatus}</span></div>
            <div className="workDetailMode">
                <span className="workDetailModeSub1">{workMode.name}</span>
                <span className="workDetailModeSub2">{workModeSubMode}</span>
            </div>
            <div className="WorkingLoadingStatusView "  >
                {
                    processWorkArray.map(function (mode,index) {
                        //console.log("mode: "+mode.name + "  " + mode.id + " " +  + mode.isLine + " " + mode.isWorkingProcess);
                        if(mode.isLine){
                            return  <div key={index} className="veriticalLine1" height={15-mode.id*2} ></div>
                        }else {
                            if(mode.isWorkingProcess){
                                return   <WorkingLoadingAnimation key={index} name={mode.name} leftTime={mode.leftTime}/>
                            }else{
                                return  <div className="mode" key={index}  >{mode.name} </div>
                            }
                        }

                    }.bind(this))
                }

                {/*<WorkingLoadingAnimation />*/}
                {/*<div className="veriticalLine1"></div>*/}
                {/*<div className="mode">洗涤</div>*/}
                {/*<div className="veriticalLine2"></div>*/}
                {/*<div className="mode">漂洗</div>*/}
                {/*<div className="veriticalLine3"></div>*/}
                {/*<div className="mode">脱水</div>*/}
            </div>

        </div>;
    }
};





