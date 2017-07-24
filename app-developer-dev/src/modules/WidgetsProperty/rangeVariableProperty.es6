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

export let RangeVariableProperty = {
    getComponent : React.createClass({
        getInitialState: function(){
            return {

            };
        },
        addStatus :function(e){//添加一个状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.addStatus(index-1);
            Actions.changeWidgetInfo('rangeNowd',index+1);
        },
        delStatus :function(e){//删除指定的状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delStatus(index-1);
            Actions.changeWidgetInfo('rangeNowd',index-1);
        },
        statusChange(e){
            var num = e.target.value;
            Actions.changeWidgetInfo('rangeNowd',num);
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
                //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
                //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
                let rangeNowd = this.props.rangeNowd ? this.props.rangeNowd : 1;
            return (
                <div className ='rangeproperty rangeVariable'>
                    <section>
                        <span>数量</span>
                        <div className="rangeVariable-num">
                            <em className="rangeVariable-sub" data-index={statusSet.length} onClick={this.delStatus}>-</em>
                            <p>{statusSet.length}</p>
                            <em className="rangeVariable-add" data-index={statusSet.length} onClick={this.addStatus}>+</em>
                        </div>
                    </section>
                    <section>
                        <span>当前变量</span>
                        <select onChange={this.statusChange} value={rangeNowd}>
                            {
                                statusSet.map((item,index)=>{
                                    return <option value={index+1} key={index}>{index+1}</option>
                                })
                            }
                        </select>
                    </section>
                    <section className='status'>
                        <div>
                            <ImageProperty.getComponent item={statusSet[rangeNowd-1]&&statusSet[rangeNowd-1]} index={rangeNowd-1} uploadHidden={true} showStall={stallShow} />
                        </div>
                    </section>
                </div>
            );
        }
    })
};