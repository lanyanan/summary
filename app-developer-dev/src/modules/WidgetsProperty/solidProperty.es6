'use strict';
/**
 * 状态可见性属性类
 * @author   hey
 * @datetime 2016-06-05
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let SolidProperty = {
	getComponent : React.createClass({
        changeBac(e){
            e.preventDefault();
            e.stopPropagation();
            
            let bgcolor = e.target.getAttribute('data-bgcolor');
            let borderColor = e.target.getAttribute('data-bordercolor');
            let pid = Number(e.target.getAttribute('data-pid'));
            let type = e.target.value;
             switch(type){
                case '0':
                    //实心 背景和边框,文字白色
                    Actions.changeStringProperty(pid,'textColor','#ffffff');
                    if(bgcolor == "transparent"){
                        Actions.changeBorderColor(borderColor);
                        Actions.changeExterior('bgColor',borderColor);
                    }else{
                        Actions.changeBorderColor(bgcolor);
                        Actions.changeExterior('bgColor',bgcolor);
                    }
                    break;
                case '1':
                    //空心，文字和边框，背景透明
                    Actions.changeStringProperty(pid,'textColor',bgcolor);
                    Actions.changeBorderColor(bgcolor);
                    Actions.changeExterior('bgColor','transparent');
                    break;
                default:;
            }
        },
        render: function(){
        	let bgColor = this.props.bgColor,
                borderColor = this.props.borderColor,
                pid = this.props.pid;
            return (
                    <section className='property-solid'>
                        <span>样式</span>
                        <select  value={bgColor == "transparent" ? 1 : 0 } data-bgcolor={bgColor ? bgColor : "#3b96ff"} data-bordercolor={borderColor ? borderColor : "#3b96ff"} data-pid={pid} onChange={this.changeBac}>
                            <option value="0">实心</option>
                            <option value="1">空心</option>
                        </select>
                    </section>
            );
        }
    })
};