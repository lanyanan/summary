'use strict';
/**
 * 状态属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {ImageProperty} from './ImageProperty'; // 图像组件

export let StatusProperty = {
	getComponent : React.createClass({
		changeField: function(e){//更改选中的字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let options = null;
            if(e.target.options[e.target.selectedIndex].getAttribute('data-type')==='enum'){
                options = JSON.parse(e.target.options[e.target.selectedIndex].getAttribute('data-options'));
            };
            Actions.changeField(property,pid,type,options);
        },
        changeValue: function(e){//更改选中字段相应选中或输入值
            e.stopPropagation();
            let svalue = e.target.value;
            let min = Number(e.target.getAttribute('data-min'));
            let max = Number(e.target.getAttribute('data-max'));
            if(svalue!=='' && (min || max)){
                svalue = svalue>=max?max:svalue;
                svalue = svalue<=min?min:svalue;
                if(svalue>0) svalue = Number(svalue);
            }
            let pid = Number(e.currentTarget.getAttribute('data-pid')) || Number(e.target.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type')) || Number(e.target.getAttribute('data-type'));
            Actions.changeValue(pid,type,svalue);
        },
        addStatus :function(e){//添加一个状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.addStatus(index);
            this.props.toggleDiv(this.props.propertySet.statusSet.length,'status');
        },
        delStatus :function(e){//删除指定的状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delStatus(index);
        },
        toggleDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'status');
        },
        changeCheck:function(e){//更改控件当前状态是否可见
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeStringProperty(pid,'activeStatus',pid);
        },
        render: function(){
        	let I = this.props.item,
                F = this.props.Pitem,
                activestatusfield = this.props.activefield,
                i = this.props.Iindex,
                propertySet = this.props.propertySet || {},
                valueType = F.propertyConfigs[activestatusfield[i]].valueType,
        		j = this.props.Jindex;
                //I(item)为状态,F(Pitem)为协议内容,activestatusfield为选中类型
                //i(Iindex)为状态在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return (
                    <section className='status'>
                    {this.props.scheme.indexOf('statusshow')>-1?
                        <section key={j}>
                            <span>状态显示</span>
                            <select value={I.statusField} data-pid={i} data-type = {j}
                                onChange={this.changeField}>
                                <option value=''>请选择字段</option>
                                {F.propertyConfigs.map((O,k)=>{
                                    return (
                                        <option key={O.propertyName} data-type={O.valueType} data-options={JSON.stringify(O.options)} value={O.property}>
                                            {O.propertyName}
                                        </option>
                                    );
                                })}
                            </select>
                        </section> :
                        <div>
                        <span className='statustitle'>状态</span>
                        <span className={'toggle '+(this.props.showStatus==i?'on':'off')} data-index={i} onClick={this.toggleDiv}></span>
                        <span className='del' data-index={i} onClick={this.delStatus}></span>
                        <div style={{display:(this.props.showStatus==i?'':'none')}}>
                        <div className='showproperty'>
                            <span>状态优先显示</span>
                            <input className={"checkstatus "+(i==propertySet.activeStatus?'on':'off')} type="checkbox"
                                   onChange={this.changeCheck} data-pid={i}
                                   checked={i==propertySet.activeStatus?'true':''}  />
                        </div>
                        {this.props.scheme.indexOf('image')>-1?
                            <ImageProperty.getComponent item={I} index={i} />
                            :null
                        }
                        <section>
                            <span>字段</span>
                            <select value={I.statusField}
                                    data-pid={i} data-type = {j}
                                    onChange={this.changeField}>
                                <option value=''>请选择字段</option>
                                {F.propertyConfigs.map((O,k)=>{
                                    return (
                                        <option key={O.propertyName} value={O.property}>
                                            {O.propertyName}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>
                        <section>
                            <span>值</span>
                            {valueType == 'enum' ?
                                <select value={I.statusValue}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeValue}>
                                        <option value=''>请选择值</option>
                                    {I.statusField?F.propertyConfigs[activestatusfield[i]].options.map(
                                        (O,k)=>{
                                        return (
                                            <option key={O.value} value={O.value}>
                                                {O.meaning}
                                            </option>
                                        );
                                    }) : null}
                                </select>
                                : <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                                       data-pid={i} data-type = {j}
                                       data-min={F.propertyConfigs[activestatusfield[i]].minValue}
                                       data-max={F.propertyConfigs[activestatusfield[i]].maxValue}
                                       value={I.statusValue} onChange={this.changeValue}
                                       placeholder={I.statusValue==''?'请输入值':''} />
                            }
                        </section>
                        </div>
                        {this.props.propertySet.statusSet.length-1==i?
                            <section className="addstatus" data-index={i} onClick={this.addStatus}>添加状态</section>
                        : null}
                        </div>
                    }
                    </section>
            );
        }
    })
};