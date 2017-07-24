'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {ImageProperty} from './ImageProperty'; // 图像组件(有档位滑块状态设置与图像类似,固套用)

export let RangeStatusProperty = {
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
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            if(fieldIndex) options = fieldIndex;
            Actions.changeField(property,pid,type,options,byteLength);
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
            this.props.toggleDiv(this.props.statusSet.length,'status');
        },
        delStatus :function(e){//删除指定的状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delStatus(index);
        },
        toggleStatusDiv:function(e){//切换状态div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'status');
        },
        changeRangePercent(e){
            let percent = false;
            if(e.target.checked){
                percent = true;
            }
            Actions.changeExterior('rangePercent',percent);
        },
        render: function(){
                let statusSet = this.props.statusSet,
                    statusList = this.props.statusList,
                    activestatusfield = this.props.activefield,
                    propertySet = this.props.propertySet || {},
                    j = this.props.Jindex;
                let minValue = typeof propertySet.minValue !== 'undefined' ? propertySet.minValue : 0;
                let maxValue = typeof propertySet.maxValue !== 'undefined' ? propertySet.maxValue : 100;
                let rateValue = typeof propertySet.rateValue !== 'undefined' ? propertySet.rateValue : 1;
                let stallShow = typeof propertySet.stallShow !== 'undefined' ? propertySet.stallShow : false;
                let rangeNumber = this.props.scheme.indexOf('stall');
                if(rangeNumber!==-1) stallShow = false;
                let rangePercent = this.props.rangePercent?this.props.rangePercent:false;
                let rangeNowd = this.props.rangeNowd ? this.props.rangeNowd : 1
                //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
                //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
                if(!statusList.propertyConfigs[activestatusfield[rangeNowd-1]]) return false;
                let valueType = statusList.propertyConfigs[activestatusfield[rangeNowd-1]].valueType;
                if((rangeNowd-1)!==0&&!stallShow) return null;
            return (
                <div className ='rangeproperty'>
                    {
                        
                        <section className='status' key={rangeNowd-1}>
                            <span className='statustitle'>{stallShow?'变量数据显示':'状态数据显示'}</span>
                            <div>
                                <section>
                                    <span>关联数据</span>
                                    <select value={statusSet[rangeNowd-1].statusField}
                                            data-pid={rangeNowd-1} data-type = {j}
                                            onChange={this.changeField}>
                                        <option value=''>请选择数据</option>
                                        {statusList.propertyConfigs.map((O,k)=>{
                                            return (
                                                <option key={k} value={O.property}>
                                                    {O.propertyName}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </section>
                                <section style={{display:(stallShow?'block':'none')}}>
                                    <span>参数</span>
                                    {valueType == 'enum' ?
                                        <select value={statusSet.statusValue}
                                                data-pid={rangeNowd-1} data-type = {j}
                                                onChange={this.changeValue}>
                                                <option value=''>请选择值</option>
                                            {statusSet.statusField?statusList.propertyConfigs[activestatusfield[rangeNowd-1]].options.map(
                                                (O,k)=>{
                                                return (
                                                    <option key={k} value={O.value}>
                                                        {O.meaning}
                                                    </option>
                                                );
                                            }) : null}
                                        </select>
                                        : <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                                               data-pid={rangeNowd-1} data-type = {j}
                                               data-min={statusList.propertyConfigs[activestatusfield[rangeNowd-1]].minValue}
                                               data-max={statusList.propertyConfigs[activestatusfield[rangeNowd-1]].maxValue}
                                               value={statusSet.statusValue} onChange={this.changeValue}
                                               placeholder={statusSet.statusValue==''?'请输入值':''} />
                                    }
                                </section>
                            </div>
                        </section>
                }
                </div>
            );
        }
    })
};