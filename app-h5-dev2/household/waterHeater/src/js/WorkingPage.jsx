/**
 * Created by yuanyunlong on 2016/12/28.
 */


import React from 'react'
import {Actions} from './Actions.jsx';
import {Wave} from './Wave.jsx';
import {WorkingLoadingAnimation} from './WorkingLoadingAnimation.jsx';

let isIOS = false;
let controlPanel = [
    {id:0, name:'童锁'},
    {id:1, name:'暂停'},
    {id:2, name:'模式'},
    {id:3, name:'关机'},
];

export class Working extends React.Component {
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

    touchModeAction(e){
      let modeIndex =  parseInt(e.currentTarget.getAttribute("data-mode")) ;

        switch(modeIndex){
            case 0:
                break;
            case 1:
                break;
            case 2:
                this.handleToSeting();
                break;
            case 3:
                this.handleToMainPage();
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
       if(typeof this.props.handeleAction === 'function'){
           this.props.handeleAction();
       }
    }

    render(){

        let workClassName = this.props.show ? 'workingPage slide-up' : 'workingPage slide-down' ;

        let intemp = this.props.intemp !== undefined ?   this.props.intemp : 0;    //进水口温度
        let outtemp = this.props.outtemp !== undefined ?   this.props.outtemp : 0;  //出水口温度
        let showertm = this.props.showertm !== undefined ?   this.props.showertm : 0; //洗浴时长
        let waterspd = this.props.waterspd !== undefined ?   this.props.waterspd : 0; //水流速度
        let devicetm = this.props.devicetm !== undefined ?   this.props.devicetm : 0; //累计通电时长
        let waterall = this.props.waterall !== undefined ?   this.props.waterall : 0; //累计耗水量

        let width = window.screen.width * 0.285;
        waterall = this.props.waterall;
        console.log("this.props waterall = "+this.props.waterall+"waterall = "+waterall);
        waterspd = waterspd*0.1;
        waterspd = waterspd.toFixed(1);

        return <div className={workClassName} >
                <div onTouchStart={this.handleToMainPage.bind(this)}><img src="../static/image/heater/arrow_down.png" width='20' height='20'/></div>
                <div className="tableCell flex">
                    <dl className="flex-cell">
                        <dd><span>{intemp}</span>°C</dd>
                        <dt>进水口温度</dt>
                    </dl>
                    <dl className="flex-cell centerCell">
                        <dd><span>{outtemp}</span>°C</dd>
                        <dt>出水口温度</dt>
                    </dl>
                    <dl className="flex-cell">
                        <dd><span>{showertm}</span>分</dd>
                        <dt>洗浴时长</dt>
                    </dl>
                </div>
                <div className="line"></div>
                <div className=" tableCell flex">
                    <dl className="flex-cell">
                        <dd><span>{waterspd}</span>L/分</dd>
                        <dt>水流速度</dt>
                    </dl>
                    <dl className="flex-cell centerCell">
                        <dd><span>{devicetm}</span>小时</dd>
                        <dt>累计通电时长</dt>
                    </dl>
                    <dl className="flex-cell">
                        <dd><span>{waterall}</span>L</dd>
                        <dt>累计耗水量</dt>
                    </dl>
                </div>

        </div>;
    }
};