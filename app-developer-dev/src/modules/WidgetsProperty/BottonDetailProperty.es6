'use strict';
/**
 * 弹窗按钮内容属性类
 * @author  pan
 * @datetime 2017-03-17
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let BottonDetailProperty = {
getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
        change : function(e){//修改按钮内容
            let defaultvalue = e.target.value;
            let pid = Number(e.target.getAttribute('data-pid'));

            Actions.changeStringProperty(pid,'bottonDetail',defaultvalue);
        },
        delete : function(e){
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeStringProperty(pid,'bottonDetail','');
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            let pid = Number(e.target.getAttribute('data-pid'));

            Actions.changeStringProperty(pid,'bottonDetail',defaultvalue);
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.bottonDetail).value=defaultvalue;
                React.findDOMNode(this.refs.bottonDetail).focus();
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
            let bottonDetail = I.bottonDetail || this.props.bottonDetail || '';
            return (
                <section className='captionproperty'>
                    <span>按钮内容</span>
                    <input className="captiontext" value={bottonDetail} data-pid={I.propertyId} onChange={this.showFocus}/>
                    <input className="captiontexthidden" type="text"  data-pid={I.propertyId} onChange={this.change}
                           onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                           onKeyDown={this.keydown} defaultValue={bottonDetail} ref='bottonDetail' />
                           <span className="deletecaption" onClick={this.delete}></span>
                </section>
            );
        }
    })
};