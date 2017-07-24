'use strict';
/**
 * 颜色盘选择的种类
 * @author   lan
 * @datetime 2017-06-08
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let  ColorPickerTypeProperty = {
	getComponent : React.createClass({
        changeWidth(e){
            e.preventDefault();
            e.stopPropagation();
            let type = e.target.value;
            
            if(type==0){
            	Actions.changeSize('width','225');
            	Actions.changeSize('height','225');
            }else{
            	Actions.changeSize('width','375');
            	Actions.changeSize('height','30');
            }
            Actions.changeColorPickerType(type)
            Actions.changeSize('width','375');
            Actions.changeSize('height','30');
        },
        render: function(){
            let colorType = ['样式1','样式2','样式3'];

            let defaultSelectType = this.props.colorType ? parseInt(this.props.colorType) : 0;
            console.log(defaultSelectType)
            return (
                    <section className='property-width'>
                        <span>样式</span>
                        <select ref="propertyWidth" value={defaultSelectType} onChange={this.changeWidth}>
                            {colorType.map((item, index)=>{
								 return <option value={index} key={index}>{item}</option>
                            })}
                        </select>
                    </section>
            );
        }
    })
};