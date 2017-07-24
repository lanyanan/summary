'use strict';
/**
 * 解析控件配置信息
 * @author   lan
 * @datetime 2017-03-21
 */

import {BaseClass} from '../../core/Base.class.es6';
import {transform} from 'react-tools'; // 导入transform方法用于转换js




var btn = {
     dom: `React.createClass({
        componentDidMount: function() {
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        handleClick: function(){
            var _state_ = typeof __props !== 'undefined' ? __props : '';
             if(touchMark ==-1){
                touchMark = 1;
                window.AppActions.changeLightOn(_state_.id, _state_.name, _state_.deviceId)
                setTimeout(function(){
                    touchMark = -1;
                }, 1000)
            }
        },
        render: function(){
            var _state_ = typeof __props !== 'undefined' ? __props : '';
            var styleAll = {
                     btnNameStyle:{
                        float:"left",
                        width:"140px",
                        height:"50px",
                        fontSize:"16px",
                        color:"#323232",
                        paddingLeft:"30px",
                        lineHeight:"50px"
                    },
                    timingAwakenRight:{
                        float:"left",
                        width:"180px",
                        height:"50px",
                        paddingRight:'20px'
                    },
                    trunOffBgColor:{
                        width:"45px",
                        height:"26px",
                        border:"1px solid #e2e2e2",
                        borderRadius:"26px",
                        position:" relative",
                        background:" #F3F3F3",
                        marginTop:"12px",
                        float:"right"
                    },
                    timingAwakenOff:{
                        position:" absolute",
                        left:" -1px",
                        top:"0px",
                        display:" block",
                        width:"24px",
                        height:"24px",
                        border:"1px solid #e2e2e2",
                        borderRadius:"24px",
                        background:" #fff"
                    },
                    trunOnBgColor:{
                        width:"45px",
                        height:"26px",
                        border:"1px solid #e2e2e2",
                        borderRadius:"26px",
                        position:" relative",
                        background:" #78b3fe",
                        marginTop:"12px",
                        float:"right"
                    },
                    timingAwakenOn:{
                        position:" absolute",
                        right:" -1px",
                        top:"0px",
                        display:" block",
                        width:"24px",
                        height:"24px",
                        border:"1px solid #e2e2e2",
                        borderRadius:"24px",
                        background:" #fff"
                    }
                }
            var openPClass = _state_.switchOn == true ? styleAll.trunOnBgColor:styleAll.trunOffBgColor;
            var openSClass = _state_.switchOn == true ? styleAll.timingAwakenOn:styleAll.timingAwakenOff;
            var hidden = _state_.switchShow == true ?'block':'none';
            return (
                <div style={{width:375,height:50,display:hidden,borderTop:'1px solid #c6c6c6'}}>
                    <div style={styleAll.btnNameStyle}>{_state_.name?_state_.name:''}</div>
                    <div style={styleAll.timingAwakenRight}>
                        <p style={openPClass}  onTouchEnd={this.handleClick}>
                            <span style={openSClass}></span>
                        </p>
                    </div>
                </div>
            );
        }
    })`
}

export class LightBtn extends BaseClass{
    constructor(widget){
        super();
    }

    // 获取控件ReactDom
    getReactDom(){
        return 'React.createElement(' + transform(btn.dom) + ',{})'
    }
};