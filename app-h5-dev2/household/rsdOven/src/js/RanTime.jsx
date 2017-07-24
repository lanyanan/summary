'use strict';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} value  	初始值
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @prop {integer} min
 * @prop {integer} max
 * @prop {integer} offe
 * @act  Actions.selectRate([integer])  切换档位时触发
 */
import {Actions} from './Actions.es6';

export const RanTime = React.createClass({
    getInitialState: function(){
        return {
            'Timeshowtip':false
        };
    },
    rangechange:function(e){
        //处理滑动更改档位
        if(this.props.rangedisable) return;
        let min = this.props.min;
        let value = (parseInt(e.target.value)-min);
        value = parseInt(value/this.props.rate) + 1;
        this.setState({
            Timeshowtip:false
        });
        Actions.selectRateTime(value);
    },
    rangeTouchEnd(e){
        this.setState({
            Timeshowtip:false
        });
        if(this.props.rangedisable) return;
        let min = this.props.min;
        let value = (parseInt(e.target.value)) + parseInt(this.props.rate);
        value = parseInt(value/this.props.rate);
        Actions.selectRateTime(value);
    },
    initTimeFm(time){
        return parseInt(time) > 10 ?parseInt(time) : "0" + parseInt(time);
    },
    render: function() {
        let Timeshowtip = this.state.Timeshowtip || false;
        let statusId = this.props.rangedisable;
        let rangevalue = (this.props.value-1)*this.props.rate || '0';
        let value = parseInt(this.props.value);
        let minnub = (parseInt(this.props.max - this.props.offe) - parseInt(this.props.min))/100;
        let fblock = parseInt((rangevalue)/minnub)+'%';
        let textNmb = parseInt(value -1)*parseInt(this.props.rate)+this.props.min + this.props.offe;
        let textTime = this.initTimeFm(parseInt(textNmb/60)) + ":" + this.initTimeFm(textNmb%60);
        let minText = this.initTimeFm(parseInt(parseInt(this.props.min ) + parseInt(this.props.offe)/60)) + ":" + this.initTimeFm(parseInt(this.props.min ) + parseInt(this.props.offe)%60);
        let maxText = this.initTimeFm(parseInt(this.props.max )/60) + ":" + this.initTimeFm(parseInt(this.props.max )%60);
        return (
            <section className="rangSect">
                <p className="selectTime">烘焙时长:{textTime}</p>
                <section className="range">
                    <i>{minText}</i>
                    <section className='rangeblock'>
                        <section className={statusId?'tips-off':'tips-on'} style={{visibility: Timeshowtip ?'visible':'hidden', left:fblock,marginLeft:'-'+1*0.018-0.48+'rem'}}>
                            <span className='ratetext'>{textTime}</span>
                        </section>
                        <span className={'slider-runnable-track '+(statusId?'slider-off':'slider-on')}></span>
                        <span className={'slider-runnable-bg-on'}></span>
                        <span className={'slider-runnable-bg'} style={{width:fblock}}></span>
                        <span className={statusId?'rangeblock-off':'rangeblock-on'} style={{left:fblock,marginLeft:'-'+1*0.018+'rem'}}></span>
                        <input type='range' value={rangevalue} step={this.props.rate} min={this.props.min} max={this.props.max - this.props.offe} className='rangevalue' onChange={this.rangechange} onTouchEnd={this.rangeTouchEnd}/>
                    </section>
                    <i>{maxText}</i>
                </section>
            </section>

        );
    }
});