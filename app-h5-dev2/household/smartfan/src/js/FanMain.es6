'use strict';
/**
 * 风扇主界面组件
 * @prop {integer} temp  温度value值
 * @prop {integer} humidity  湿度value值
 * @prop {string} modeName  运行模式
 * @prop {integer} windStall  运行速率
 * @prop {integer} remainTime 剩余时间
 * @prop {integer} devStatus 设备状态(1开2关)
 * @prop {integer} clockId 定时模式(1为开启-显示剩余多少时间关闭,2为关闭-显示剩余多少时间开启)
 */
import {Actions} from './Actions.es6';

export const FanMain = React.createClass({
    getInitialState: function(){
        return {
        };
    },
    setswitch:function(e){
        let type = e.currentTarget.getAttribute('data-type');
        let value;
        switch(type){
            case 'shake':
                if(this.props.devStatus==1) return;
                value = this.props.shookHeadStatus==1?2:1;
                Actions.shakeSwitch(value);
                break;
            case 'power':
                value = this.props.devStatus==1?2:1;
                Actions.switch(value);
                break;
            case 'clock':
                // value = this.props.clockId==1?2:1;
                if(this.props.clockId==1 || this.props.clockId==2){
                    value = 3;
                }else{
                    value = this.props.devStatus==1?2:1;
                }
                Actions.clockSwitch(value);
                break;
            default:
                break;
        }
    },
    baseData:['disable','off','on','disable'],
    render: function() {
        let tempValue = this.props.temp? this.props.temp+'℃' : '20℃';
        let humidityValue = this.props.humidity? this.props.humidity+'%' : '80%';
        let modeName = this.props.modeName || '';
        let rateValue = this.props.windStall || '0';
        let remainTime = this.props.remainTime || 0;
        let remainTimeH = parseInt(remainTime/60);
        let remainTimeM = parseInt(remainTime-remainTimeH*60);
        remainTimeH = remainTimeH<10?'0'+remainTimeH:remainTimeH;
        remainTimeM = remainTimeM<10?'0'+remainTimeM:remainTimeM;
        remainTime = remainTimeH + ':' + remainTimeM;
        // console.log('remainTime',remainTime);;
        let shookHeadStatus = this.props.shookHeadStatus || 1;
        let devStatus = this.props.devStatus || 1;
        let clockId = this.props.clockId || 3;
        if(devStatus!=2){
            shookHeadStatus=3
        }
        return (
        	<section className="fanmain">
        		<section className="weatherinfo">
                    <label className='temp'><img src='../static/img/smartFan/temp-icon.png' />{tempValue}</label>
                    <label className='humidity'><img src='../static/img/smartFan/humidity-icon.png' />{humidityValue}</label>
                </section>
                <section className='faninfo'>
                    <section className='faninfobg'>
                    </section>
                </section>
                <section className='fantext'>
                    {devStatus==2?
                        <span>
                        <span className='modeName'>{modeName} </span>
                        <span className='rateValue'>{rateValue}档 </span>
                        </span>
                        : <span className='offline'>关机 </span>
                    }
                    {(clockId==1||clockId==2)?
                        (devStatus==2?
                            <span><span className='rateValue'>{remainTime}</span><span className='remainTime'> 后关闭风扇</span></span>
                            :
                            <span><span className='remainTime'>剩余 </span><span className='rateValue'>{remainTime}</span><span className='remainTime'>后开启风扇</span></span>
                        )
                        : null
                    }
                </section>
                <section className="clock">
                        <div data-type='shake' onTouchEnd={this.setswitch} className={'shake-'+this.baseData[shookHeadStatus]}>
                            <span>摇头</span>
                        </div>
                        <div data-type='power' onTouchEnd={this.setswitch} className={'switch-'+this.baseData[devStatus]}>
                            <span>{devStatus==2?'关机':'开机'}</span>
                        </div>
                        <div data-type='clock' onTouchEnd={this.setswitch} className={'clock-'+(clockId==1||clockId==2?'on':'off')}>
                            <span>定时</span>
                        </div>
                </section>
            </section>
        );
    }
});