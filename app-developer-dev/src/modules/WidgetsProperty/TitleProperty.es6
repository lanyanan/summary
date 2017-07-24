'use strict';
/**
 * 控件头部title属性类
 * @author  pan
 * @datetime 2017-03-13
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let TitleProperty = {
getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
        changeTitle : function(e){//修改控件头部标题
            let nvalue = e.target.value;
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeStringProperty(pid,'title',nvalue);
        },
        delTitle : function(e){
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeStringProperty(pid,'title','');
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            // let pid = Number(e.target.getAttribute('data-pid'));
            // Actions.changeStringProperty(pid,'title',defaultvalue);
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.titletext).value=defaultvalue;
                React.findDOMNode(this.refs.titletext).focus();
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
            let I = this.props.item,
                i = this.props.index;
            let titletext = I.title || this.props.title || '';
            return (
                <section className='captionproperty'>
                    <span>标题</span>
                    <input className="captiontext" value={titletext} data-pid={I.propertyId} onChange={this.showFocus} onFocus={this.showFocus}/>
                    <input className="captiontexthidden" type="text"  data-pid={I.propertyId} onChange={this.changeTitle}
                           onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                           onKeyDown={this.keydown} defaultValue={titletext} ref='titletext' />
                    <span className="deletecaption" onClick={this.delTitle}></span>
                </section>
            );
        }
    })
};

