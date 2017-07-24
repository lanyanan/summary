'use strict';
/**
 * 按钮满屏，大按钮，中按钮，小按钮
 * @author   hey
 * @datetime 2017-06-05
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let WidthProperty = {
	getComponent : React.createClass({
        changeWidth(e){
            e.preventDefault();
            e.stopPropagation();
            let type = e.target.value;
             switch(type){
                case '0':
                    Actions.changeSize('x',0);
                    Actions.changeExterior('borderRadius','0');
                    Actions.changeSize('height','48');
                    Actions.changeSize('width','375');
                    break;
                case '1':
                    Actions.changeSize('x',(375-343)/2);
                    Actions.changeExterior('borderRadius','6');
                    Actions.changeSize('width','343');
                    Actions.changeSize('height','44');
                    break;
                case '2':
                    Actions.changeSize('x',(375-120)/2);
                    Actions.changeSize('width','120');
                    Actions.changeExterior('borderRadius','6');
                    Actions.changeSize('height','36');
                    break;
                case '3':
                    Actions.changeSize('x',(375-100)/2);
                    Actions.changeSize('width','96');
                    Actions.changeExterior('borderRadius','5');
                    Actions.changeSize('height','26');

                break;
                default:;
            }
        },
        render: function(){
        	let bgColor = this.props.bgColor,
                pid = this.props.pid;
            let widgetWidth = this.props.widgetWidth; 
            //宽度选择
            let buttonWidth = ['375','343','120','80'];
            let defaultSelectWidth = 0;
            let defaultWidth = buttonWidth.map((item,index)=>{
                                let widthInfo = ['满屏','大','中','小'];
                                if(widgetWidth == item){
                                    defaultSelectWidth = index;
                                }
                                return <option value={index} key={index}>{widthInfo[index]}</option>
                            });
            return (
                    <section className='property-width'>
                        <span>宽度</span>
                        <select ref="propertyWidth" value={defaultSelectWidth} onChange={this.changeWidth}>
                            {defaultWidth}
                        </select>
                    </section>
            );
        }
    })
};