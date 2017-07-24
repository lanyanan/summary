'use strict';
import {Actions} from './Actions.es6';

/**
 * @param {[Integer]} [smartModeSwitch] [自动/手动模式 1表示智能模式，2表示手动模式]
 * @param {[Integer]} [mode] [选择模式索引]
 * @param {[Integer]} [gear] [选择档位索引]
 * @param {[Integer]} [type] [当前类型]
 * @return {[html]}
 */
export const DeviceConfig = React.createClass({
    // 基本数据
    baseData: {
        modes : ["C提拉紧致", "M粉刺导出", "N营养导入", "L轻松按摩"],
        gears : ["低", "高"]
    },
    startTouch : function(e){
        if(this.props.smartModeSwitch == 1){
            return false;
        }
        this.newY = 0;
        this.startY = parseInt(e.touches[0].clientY);
    },
    moveTouch : function(e){
        if(this.props.smartModeSwitch == 1){
            return false;
        }
        this.newY = parseInt(e.touches[0].clientY);
    },
    endTouch : function(e){
        if(this.props.smartModeSwitch == 1){
            return false;
        }
        let disY = this.newY || this.startY - this.startY;
        if(Math.abs(disY)<=20){
            let type = e.currentTarget.getAttribute('data-type');
            switch(type){
                case 'mode':
                    clearTimeout(this.timer1);
                    let mode = ReactDOM.findDOMNode(this.refs.mode);
                    mode.style.background = '#fde7ee';
                    this.timer1 = setTimeout(function(){
                        mode.style.background = '';
                        this.setState({
                            modeshow: true
                        })
                        Actions.repaint({modeshow: true});
                    }.bind(this),80);
                    break;
                case 'gear':
                    clearTimeout(this.timer2);
                    let gear = ReactDOM.findDOMNode(this.refs.gear);
                    gear.style.background = '#fde7ee';
                    this.timer2 = setTimeout(function(){
                        gear.style.background = '';
                        this.setState({
                            gearshow: true
                        })
                        Actions.repaint({gearshow: true});
                    }.bind(this),80)
                    break;
            }
        }else{
            return false;
        }
    },
    cancelMode : function(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            modeshow: false
        });
        Actions.repaint({modeshow: false});
    },
    confirmMode : function(e){
        let index = e.currentTarget.getAttribute('data-mode');
        let mode = parseInt(index)+1;
        this.setState({currentMode: mode, modeshow: false});
        Actions.selectMode({currentMode: mode, modeshow: false});
    },
    cancelGear : function(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            gearshow: false
        });
        Actions.repaint({gearshow: false});
    },
    confirmGear : function(e){
        let index = e.currentTarget.getAttribute('data-gear');
        let gear = parseInt(index)+1;
        this.setState({currentGear: gear, gearshow: false});
        Actions.selectGear({currentGear: gear, gearshow: false});
    },
    endDefault : function(e){
        e.preventDefault();
        e.stopPropagation();
    },
    render: function() {
        let smartModeSwitch = this.props.smartModeSwitch; //自动/手动
        let type = this.props.type; //取得类型
        let mode = this.props.mode; // 取得模式
        let gear = this.props.gear; //取得档位
        let modeshow = this.props.modeshow;
        let gearshow = this.props.gearshow;
        let description = (<span></span>); //智能推荐描述
        let modeClass = "noneDisplay";
        let gearClass = "noneDisplay";
        if(smartModeSwitch == 1){
            modeClass = "noneDisplay";
            gearClass = "noneDisplay";
        } else{
            if(this.props.modechange){
                modeClass = "red";
            } else{
                modeClass = "grey";
            }
            if(this.props.gearchange){
                gearClass = "red";
            } else{
                gearClass = "grey";
            }
        }
        if(type <= 1){
            description = (<div className="tips"><span>未测肤无法为您智能推荐，以下为设备默认值</span><a style={{color:'#007eff'}} href="cbeauty://cbeauty_single_skintest">赶紧去测肤>></a></div>);
        }else{
            if(smartModeSwitch == 1){
                description = (<div className="tips"><p>根据您的肤质智能推荐</p></div>);
            }else{
                description = (<div className="tips"><p>选择一种模式，设置嫩肤档位</p></div>);
            }
        }
        return (
            <div className="flex-cell flex-column" style={{height:'100%'}}>
                {description}
                <div className="flex-cell flex btnList">
                    <div data-type="mode" ref="mode" className="flex-column btnSwitch vertical-line" onTouchStart={this.startTouch} onTouchMove={this.moveTouch} onTouchEnd={this.endTouch}>
                        <h1><span className="value">{this.baseData.modes[mode]}</span></h1>
                        <p><span>模式<em className={modeClass}></em></span></p>
                    </div>
                    <div data-type="gear" ref="gear" className="flex-column btnSwitch" onTouchStart={this.startTouch} onTouchMove={this.moveTouch} onTouchEnd={this.endTouch}>
                        <h1><span className="value">{this.baseData.gears[gear]}</span></h1>
                        <p><span>档位<em className={gearClass}></em></span></p>
                    </div>
                </div>
                <section className="modeselect-bd" style={modeshow?{}:{display:'none'}} onTouchMove={this.endDefault}>
                    <div className="modeselect-shade" onTouchEnd={this.cancelMode} onTouchMove={this.endDefault}></div>
                    <ul className="modeselect-content" style={{bottom:modeshow? 0 :"-23rem"}}>
                        {this.baseData.modes.map((its,index)=>{
                            return (
                                <li className="flex" key={index} data-mode={index} onTouchStart={this.endDefault} onTouchMove={this.endDefault} onTouchEnd={this.confirmMode}><span>{its}</span><em style={mode==index?{}:{display:'none'}}></em></li>
                                )
                        })}
                    </ul>
                </section>

                <section className="modeselect-bd" style={gearshow?{}:{display:'none'}} onTouchMove={this.endDefault}>
                    <div className="modeselect-shade" onTouchEnd={this.cancelGear} onTouchMove={this.endDefault}></div>
                    <ul className="gearselect-content" style={{bottom:gearshow? 0 :"-10rem"}}>
                        {this.baseData.gears.map((its,idx)=>{
                            return (
                                <li className="flex" key={idx} data-gear={idx} onTouchStart={this.endDefault} onTouchMove={this.endDefault} onTouchEnd={this.confirmGear}><span>{its}</span><em style={gear==idx?{}:{display:'none'}}></em></li>
                                )
                        })}
                    </ul>
                </section>
            </div>
        );
    }
});