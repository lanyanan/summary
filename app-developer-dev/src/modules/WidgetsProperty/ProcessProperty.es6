'use strict';
/**
 * 过程控件属性类
 * @author   pan
 * @datetime 20170331
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ProcessProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    
                };
        },
        changeField: function(e){
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let datatype = e.currentTarget.getAttribute('data-timetype');
            let options = null;
            if(e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum'){
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            console.log(pid,type,datatype);
            Actions.changeField(property,pid,type,options,0,datatype);
        },
        toggleDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'status');
        },
        
        render: function(){
        	let propertySet = this.props.propertySet,
                i = this.props.processNowd ? this.props.processNowd : 0;
            let hourField = propertySet.statusSet[i].hourField ? propertySet.statusSet[i].hourField : " ",
                minuteField = propertySet.statusSet[i].minuteField ? propertySet.statusSet[i].minuteField : " ";
            return (
                <div>
                <section className='status'>
                    <span className='statustitle'>状态数据显示</span>
                    <div>
                        <section>
                            <span>小时字段</span>
                            <select value={hourField}
                                    data-pid={i} data-type={this.props.statusIndex}
                                    data-timetype='hour' onChange={this.changeField}>
                                <option value=''>请选择字段</option>
                                {
                                    this.props.statusList.propertyConfigs.map((O,k)=>{
                                        return (
                                            <option key={k} value={O.property}>
                                                {O.propertyName}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </section>
                        <section>
                            <span>分钟字段</span>
                            <select value={minuteField}
                                    data-pid={i} data-type = {this.props.statusIndex}
                                    data-timetype='minute' onChange={this.changeField}>
                                <option value=''>请选择字段</option>
                                {this.props.statusList.propertyConfigs.map((O,k)=>{
                                    return (
                                        <option key={k} value={O.property}>
                                            {O.propertyName}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>
                    </div>
                </section>
                </div>
            );
        }
    })
};