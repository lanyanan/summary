'use strict';
/**
 * 颜色盘控件属性类
 * @author   xinglin
 * @datetime 2016-10-27
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ColorPickerProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                };
        },
        changeField: function(e){//更改选中的字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength);
        },
        changeColorType: function(e){//更改选中的类型
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            Actions.changeField(property,pid,type,0,0,'colortype');
        },
        changeRField: function(e){//更改选中的R字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength,'r');
        },
        changeGField: function(e){//更改选中的G字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength,'g');
        },
        changeBField: function(e){//更改选中的B字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let fieldIndex = e.target.options[e.target.selectedIndex].getAttribute('data-findex');
            let byteLength = Number(e.target.options[e.target.selectedIndex].getAttribute('data-blength'));
            //if(pid !== 1) return;
            Actions.changeField(property,pid,type,fieldIndex,byteLength,'b');
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
            return (
                <div>
                <section className='event'>
                    <span className='eventtitle'>点击事件</span>
                    <section>
                        <span>传值类型</span>
                        <select value={I.colorType?I.colorType:'1'}
                                data-pid={i} data-type = {j}
                                onChange={this.changeColorType}>
                            <option value='1'>RGB类型</option>
                            <option value='2'>十六进制</option>
                        </select>
                    </section>
                    {I.colorType != '2' ?
                        <div>
                            <section>
                                <span>红色字段</span>
                                <select value={I.rSet?I.rSet.field:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeRField}>
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
                                <span>绿色字段</span>
                                <select value={I.gSet?I.gSet.field:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeGField}>
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
                                <span>蓝色字段</span>
                                <select value={I.bSet?I.bSet.field:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeBField}>
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
                    :
                        <div>
                            <section>
                                <span>颜色字段</span>
                                <select value={I.eventField?I.eventField:''}
                                        data-pid={i} data-type = {j}
                                        onChange={this.changeField}>
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
                    }
                </section>
                </div>
            );
        }
    })
};