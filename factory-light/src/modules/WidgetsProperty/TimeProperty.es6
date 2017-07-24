'use strict';
/**
 * 定时控件属性类
 * @author   xinglin
 * @datetime 2016-07-07
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let TimeProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
        changeTimeTitle: function(e){
            let newsize = e.target.value;
            Actions.changeStringProperty(0,'timeTitle',newsize);
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.timeTitle).value=defaultvalue;
                React.findDOMNode(this.refs.timeTitle).focus();
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
        changeField: function(e){//更改选中的字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let datatype = e.currentTarget.getAttribute('data-timetype');
            let options = null;
            if(e.target.options[e.target.selectedIndex].getAttribute('data-type')==='enum'){
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            Actions.changeField(property,pid,type,options,0,datatype);
        },
        changeHourField: function(e){//更改选中的小时字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength,'hour');
        },
        changeMinuteField: function(e){//更改选中的分钟字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength,'minute');
        },
        toggleDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'event');
        },
        render: function(){
        	let propertySet = this.props.propertySet;
            let I = this.props.item,
                F = this.props.Pitem,
                i = this.props.Iindex,
                j = this.props.Jindex;
            let scheme = JSON.parse(JSON.stringify(this.props.scheme));
            if(scheme instanceof Array) scheme.push('statusshow');
            return (
                <div>
                <section className='sizeproperty'>
                    <span>内容</span>
                    <input value={propertySet.timeTitle || '设置时间'} onChange={this.showFocus} onFocus={this.showFocus} />
                    <input type="text" onChange={this.changeTimeTitle}
                           onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                           onKeyDown={this.keydown} defaultValue={propertySet.timeTitle || '设置时间'} ref='timeTitle' />
                </section>
                <section className='status'>
                    <span className='statustitle'>状态</span>
                    <section>
                        <span>小时字段</span>
                        <select value={propertySet.statusSet[0].hourField}
                                data-pid={0} data-type = {this.props.statusIndex}
                                data-timetype='hour' onChange={this.changeField}>
                            <option value=''>请选择字段</option>
                            {this.props.statusList.propertyConfigs.map((O,k)=>{
                                return (
                                    <option key={O.propertyName} value={O.property}>
                                        {O.propertyName}
                                    </option>
                                );
                            })}
                        </select>
                    </section>
                    <section>
                        <span>分钟字段</span>
                        <select value={propertySet.statusSet[0].minuteField}
                                data-pid={0} data-type = {this.props.statusIndex}
                                data-timetype='minute' onChange={this.changeField}>
                            <option value=''>请选择字段</option>
                            {this.props.statusList.propertyConfigs.map((O,k)=>{
                                return (
                                    <option key={O.propertyName} value={O.property}>
                                        {O.propertyName}
                                    </option>
                                );
                            })}
                        </select>
                    </section>
                </section>
                <section className='event'>
                    <span className='eventtitle'>点击事件</span>
                    <span className={'toggle '+(this.props.showEvent==i?'on':'off')} data-index={i} onClick={this.toggleDiv}></span>
                    <div style={{display:(this.props.showEvent==i?'':'none')}}>
                    <section>
                        <span>点击</span>
                        <select data-pid={i} value={I.eventType} data-type = {j} onChange={this.changeEvent}>
                            <option value='1'>点击触发</option>
                        </select>
                    </section>
                    {I.eventType == '1' ?
                        <div>
                            <section>
                                <span>小时字段</span>
                                <select value={I.hourSet?I.hourSet.field:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeHourField}>
                                    <option value=''>请选择字段</option>
                                    {F.propertyConfigs.map((O,k)=>{
                                        if(O.property!=='updateFlag'){
                                            return (
                                                <option data-findex={O.index} data-blength={O.byteLength} key={O.propertyName} value={O.property}>
                                                    {O.propertyName}
                                                </option>
                                            );
                                        }
                                    })}
                                </select>
                            </section>
                            <section>
                                <span>分钟字段</span>
                                <select value={I.minuteSet?I.minuteSet.field:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeMinuteField}>
                                    <option value=''>请选择字段</option>
                                    {F.propertyConfigs.map((O,k)=>{
                                        if(O.property!=='updateFlag'){
                                            return (
                                                <option data-findex={O.index} data-blength={O.byteLength} key={O.propertyName} value={O.property}>
                                                    {O.propertyName}
                                                </option>
                                            );
                                        }
                                    })}
                                </select>
                            </section>
                        </div>
                    :null
                    }
                    </div>
                </section>
                </div>
            );
        }
    })
};