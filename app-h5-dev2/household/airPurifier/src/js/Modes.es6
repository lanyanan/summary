'use strict';
/**
 * 锁定/定时/灯光/喷射
 * @prop {integer} 'isLocked':1,//模式 锁定 1:是 0 ：否
 * @prop {integer}'isSettime':0,//模式：定时 1:是 0 ：否
  * @prop {integer}'isLight':1,//模式：灯光 1:是 0 ：否
   * @prop {integer}'isJet':1,//模式 喷射(可以同时选中多项) 1:是 0 ：否  
 * @act  Actions.selectAny([integer])  切换模式时触发该动作
 */
import {Actions} from './Actions.es6';

export const Modes = React.createClass({
    timer:0,
    getInitialState: function(){
        return {
            isLocked:this.props.isLocked,
            isSettime:this.props.isSettime,
            isLight:this.props.isLight,
            isJet:this.props.isJet
        };
    },    
    items : function () {
        let isSettime = this.props.isSettime,
        timeTip = isSettime >=1 ?isSettime+'h':'',
        items=[
            {id:1,isOn:this.props.isLocked,name:"锁定",tip:'长按3秒'},
            {id:2,isOn:isSettime, name:"定时",tip:timeTip},
            {id:3,isOn:this.props.isLight, name:"灯光"},
            {id:4,isOn:this.props.isJet, name:"喷射"}
        ];
        return items;
    },
    handlerClick : function(e){
        let index = e.currentTarget.getAttribute('data-value'),
        isOn = e.currentTarget.getAttribute('data-ison');
        if(index == 1){
            e.preventDefault();
            this.timer = setTimeout(()=>{
                Actions.selectModes(index,isOn === "1"?2:1);
            }, 3000);
        }else if(index ==2){
            Actions.selectModes(index,isOn);
        }else {
            Actions.selectModes(index,isOn === "1"?2:1);
        }
    },
    endTimer : function (e) {
        let index = e.currentTarget.getAttribute('data-value');
        if(index == 1){
            clearTimeout(this.timer);
        }
    },
    render : function() {
        let isStartup = this.props.isStartup,
        online = this.props.online;
        return (
            <section className="modes flex">
                {this.items().map(function(o){
                    let noDisable=false,onFlag=false;
                    if(online ==='1'){
                        if(isStartup ===1||(o.id==1)){
                            noDisable = true;
                            if(o.isOn === 1 ||(o.id==2&&o.isOn>0)){
                                onFlag = true;
                            }
                        }
                    }
                   
                    return (
                        <dl key={o.id}  className={((isStartup ===1 && online==='1' && o.isOn === 1 )||(o.id==1&&o.isOn===1)?"on":"") + " flex-cell"} data-value={o.id} data-ison={o.isOn} onTouchStart={this.handlerClick} onTouchEnd={this.endTimer}>
                            <dd><img src={noDisable?onFlag?"../static/img/modes/ic-"+o.id+"-on.png":"../static/img/modes/ic-"+o.id+"-off.png":"../static/img/modes/ic-"+o.id+"-disable.png"} /></dd>
                            <dt>{o.name}</dt>
                            <dd>{o.tip?o.tip:''}</dd>
                        </dl>
                    );
                }.bind(this))}
            </section>
        );
    }
});