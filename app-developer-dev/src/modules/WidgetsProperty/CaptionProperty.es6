'use strict';
/**
 * 标题属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let CaptionProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
        changeStatusName : function(e){//修改控件当前状态显示名
            let snvalue = e.target.value;
            Actions.changeWidgetCaption(snvalue);
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.captiontext).value=defaultvalue;
                React.findDOMNode(this.refs.captiontext).focus();
            });
        },
        hiddenBlur:function(e){
            this.setState({hidden:true});
        },
        keydown : function(e){//回车快捷键 提交命名结束
            e.stopPropagation();
            if(e.keyCode == 13){
                this.setState({hidden:true});
            }
            else{
                return;
            }
        },
        render: function(){
        	let widgetCaption = this.props.item;
            return (
                <section className='captionproperty'>
                    <span>名称</span>
                    <input className="captiontext" value={widgetCaption} onChange={this.showFocus}
                           onFocus={this.showFocus} />
                    <input className="captiontexthidden" type="text" onChange={this.changeStatusName}
                           onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                           onKeyDown={this.keydown} defaultValue={widgetCaption} ref='captiontext' />
                </section>
            );
        }
    })
};