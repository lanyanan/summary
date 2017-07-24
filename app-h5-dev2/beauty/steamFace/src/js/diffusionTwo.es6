'use strict';

import {Actions} from './Actions.es6';

export const DiffusionTwo = React.createClass({
    getInitialState: function(){
        return {
            timeIdTwo:null,
        };
    },
    componentDidMount(){
        //扩散样式
        let _this = this;
          this.state.timeIdTwo= setInterval(/*()=>{
                let border=_this.state.border || 15.76;
                let opacity= _this.state.opacity || 0.18;
               border+=0.5;
               opacity-=0.005; 
               //if(opacity<=0.06){opacity=0.18;}
                if(border>=24){border=15.76; opacity=0.18;}
                _this.setState({
                    border:border,
                    opacity:opacity
                });
            },*/100)
        
    },
    componentWillUnmount(){
            clearInterval(this.state.timeIdTwo);

    },

    //点击开关按钮改变待机状态
    changeDeviceStatus(e){
        let type = e.target.getAttribute('data-type');
        Actions.changeDeviceStatus(this.state.deviceStatus,this.props.deviceMode,this.props.modeName,this.state.onOff,this.props.smartModeSwitch,type,this.state.deviceModeIndexThree,this.props.hotSpray1,this.props.hotSpray2,this.props.hotSpray3,this.props.coldSpray1,this.props.coldSpray2,this.props.coldSpray3,this.props.workMinutes,this.props.workSeconds,this.props.modArr);
    },
    render() {
        let remainMinute = this.props.remainMinute;
        let remainSecond = this.props.remainSecond;
        //冷热喷交互
        let b = this.props.b;
        let hot_cold= b%2==0?"clod_header":"hot_header";
        let hot_cold_test = b%2==0?"冷喷":"热喷";
        let smartModeSwitch = this.props.smartModeSwitch;
        //
        let modeName = this.props.modeName;
         switch(modeName){}
        let smartModeSwitch_text;
        if(smartModeSwitch==0){
            switch(modeName){
                case 1:
                    smartModeSwitch_text ="弹力修护";
                break;
                case 2:
                    smartModeSwitch_text ="皮肤清洁";
                break;                
                case 4:
                    smartModeSwitch_text ="醒肤模式";
                break;
                case 5:
                    smartModeSwitch_text ="控油护理";
                break;
                case 6:
                    smartModeSwitch_text ="快速温热";
                break;
                case 10:
                    smartModeSwitch_text ="我的模式";
                break;
                case 16:
                    smartModeSwitch_text ="设备模式";
                break;
            }
        }else{
            smartModeSwitch_text="智能模式";
        }
        return (
                <div className={hot_cold}>
                        <div className="cilcle_one" >
                            <label className="text1">{hot_cold_test}</label>
                            <label className="text2">{smartModeSwitch_text}</label>
                        </div>
                        <div className="cllce_two"></div>
                        <div className="cllce_two1"></div>
                        <div className="cllce_two2"></div>
                        <div className="offOn" onTouchEnd={this.changeDeviceStatus}></div>
                   </div>
            );
    }
});

