'use strict';
/**
 * 字体大小属性类
 * @author   xinglin
 * @datetime 2016-05-06
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let fontStyleProperty = {
	getComponent : React.createClass({
        changeFontWeight : function(e){//更改文本的字体粗细
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeBooleanProperty(pid,'fontWeight');
        },
        changeFontItalics : function(e){//更改文本的字体倾斜
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeBooleanProperty(pid,'fontItalics');
        },
        changeTextSize: function(e){
            let pid = Number(e.target.getAttribute('data-pid'));
            let newsize = e.target.value;
            Actions.changeStringProperty(pid,'fontSize',newsize);
        },
        render: function(){
        	let I = this.props.item,
        		i = this.props.index;
            return (
                <section className='fontstyleproperty'>
                    <span>字体大小</span>
                    <input data-pid={I.propertyId} value={I.fontSize} type='number' onChange={this.changeTextSize} />
                    <span style={{backgroundColor:(I.fontWeight==1?'#f1f3f6':'#fff'),color:(I.fontWeight==1?'#4887f5':'#999999')}} data-pid={I.propertyId} onClick={this.changeFontWeight}>B</span>
                    <span style={{backgroundColor:(I.fontItalics==1?'#f1f3f6':'#fff'),color:(I.fontItalics==1?'#4887f5':'#999999')}} data-pid={I.propertyId} onClick={this.changeFontItalics}>/</span>
                </section>
            );
        }
    })
};