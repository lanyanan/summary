'use strict';
/**
 * 文本属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let TextProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
        changeMultipleText : function(e){//更改多行文本值
            let pid = Number(e.target.getAttribute('data-pid'));
            let nvalue = e.target.value;
            Actions.changeStringProperty(pid,'multipleText',nvalue);
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.textareavalue).value=defaultvalue;
                React.findDOMNode(this.refs.textareavalue).select();
            });
        },
        hiddenBlur:function(e){
            this.setState({hidden:true});
        },
        keydown : function(e){//回车快捷键 提交命名结束
            if(e.keyCode == 13){
                this.setState({hidden:true});
            }
            else{
                return;
            }
        },
        render: function(){
        	let I = this.props.item,
        		i = this.props.index;
            //I为当前组件的propertySet数组,i为其索引值
            let multipleText = I.multipleText || this.props.editText || '';
            return (
                <section className='textproperty'>
                    <span>内容</span>
                    <textarea placeholder='控件说明' value={multipleText}
                              onChange={this.showFocus} onFocus={this.showFocus}>
                    </textarea>
                    <textarea className="texthidden" type="text" onChange={this.changeMultipleText}
                           onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                           onKeyDown={this.keydown}
                           data-pid={I.propertyId} defaultValue={multipleText} ref='textareavalue'>
                    </textarea>
                </section>
            );
        }
    })
};