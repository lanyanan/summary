'use strict';
/**
 * 文本颜色属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ColorProperty = {
	getComponent : React.createClass({
        colorPick: function(e) {
            let pid = Number(e.target.getAttribute('data-pid'));
            let newcolor = e.target.value;
            // console.log(/^#[0-9a-fA-F]{3,6}$/.test(newcolor));
            // this.setState({foreground:newcolor});
            Actions.changeStringProperty(pid,'textColor',newcolor);
        },
        render: function(){
        	let I = this.props.item,
        		i = this.props.index;

            return (
                <section className='colorproperty'>
                    <span className='threetext'>{this.props.scheme.indexOf('process')>-1?'色调':'字体颜色'}</span>
                    <input data-pid={I.propertyId} value={I.textColor ? I.textColor : "#ffffff"} onChange={this.colorPick} />
                    <input type="color" data-pid={I.propertyId} value="#efefef" onChange={this.colorPick}
                           style={{backgroundColor: I.textColor}} className="extendblock" />
                </section>
            );
        }
    })
};
