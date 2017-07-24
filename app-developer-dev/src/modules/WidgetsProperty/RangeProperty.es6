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

export let RangeProperty = {
	getComponent : React.createClass({
        changeRangeSet:function(e){//更改滑块设置
            let value = e.target.value;
            let type = e.target.getAttribute('data-type');
            if(type==='rateValue'){
                if(value>(this.props.propertySet.maxValue-this.props.propertySet.minValue)){
                    alert('刻度过大,请不要大于最大最小值之差');
                    return;
                }
            }
            if(type==='stallShow'){
                value = e.target.checked;
            }
            Actions.changeStringProperty(0,type,value);
        },
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
            Actions.changeWidgetInfo('rangePercent',percent);
        },
        changeDigitalSubtraction(e){
            e.stopPropagation();
            var account = e.target.value;
            Actions.changeWidgetInfo('account',account);
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
                let rangePercent = this.props.rangePercent ? this.props.rangePercent : false;
                //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
                //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
                let id = this.props.id;
                let widget = this.props.widget;
                let account = widget.widgetInfo.account ? widget.widgetInfo.account : "";
            return (
                <div className ='rangeproperty'>
                    <section className='status'>
                        <section>
                            <span>最小值</span>
                            <input type='number' data-type='minValue' onChange={this.changeRangeSet} value={minValue} />
                        </section>
                        <section>
                            <span>最大值</span>
                            <input type='number' data-type='maxValue' onChange={this.changeRangeSet} value={maxValue} />
                        </section>
                        <section>
                            <span>刻度</span>
                            <input type='number' data-type='rateValue' onChange={this.changeRangeSet} value={rateValue} />
                        </section>
                        <section style={{display:id == 1007 ? "block" : "none"}}>
                            <span>显示百分比</span>
                            <input type='checkbox' data-type='stallShow' className={"checkstatus "+(rangePercent?'on':'off')} onChange={this.changeRangePercent} checked={rangePercent}  />
                        </section>
                        <section style={{display:id == 1013 ? "block" : "none"}}>
                            <span>单位</span>
                            <input type='text' defaultValue={account}  onChange={this.changeDigitalSubtraction}   />
                        </section>
                    </section>
                    {
                    //     statusSet.map((statusSet,i)=>{
                    // let valueType = statusList.propertyConfigs[activestatusfield[i]].valueType;
                    // if(i!==0&&!stallShow) return null;
                    // return(<section className='status' key={i}>
                    //     <span className='statustitle'>{stallShow?'档位':'状态'}</span>
                    //     <span className={'toggle '+(this.props.showStatus==i?'on':'off')}  data-index={i} onClick={this.toggleStatusDiv}></span>
                    //     <span className='del' data-index={i} onClick={this.delStatus}></span>
                    //     <div style={{display:(this.props.showStatus==i?'':'none')}}>
                    //         {stallShow?
                    //             <ImageProperty.getComponent item={statusSet} index={i} uploadHidden={true} showStall={stallShow} />
                    //             :null
                    //         }
                    //         <section>
                    //             <span>字段</span>
                    //             <select value={statusSet.statusField}
                    //                     data-pid={i} data-type = {j}
                    //                     onChange={this.changeField}>
                    //                 <option value=''>请选择字段</option>
                    //                 {statusList.propertyConfigs.map((O,k)=>{
                    //                     return (
                    //                         <option key={O.propertyName} value={O.property}>
                    //                             {O.propertyName}
                    //                         </option>
                    //                     );
                    //                 })}
                    //             </select>
                    //         </section>
                    //         <section style={{display:(stallShow?'block':'none')}}>
                    //             <span>值</span>
                    //             {valueType == 'enum' ?
                    //                 <select value={statusSet.statusValue}
                    //                         data-pid={i} data-type = {j}
                    //                         onChange={this.changeValue}>
                    //                         <option value=''>请选择值</option>
                    //                     {statusSet.statusField?statusList.propertyConfigs[activestatusfield[i]].options.map(
                    //                         (O,k)=>{
                    //                         return (
                    //                             <option key={O.value} value={O.value}>
                    //                                 {O.meaning}
                    //                             </option>
                    //                         );
                    //                     }) : null}
                    //                 </select>
                    //                 : <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                    //                        data-pid={i} data-type = {j}
                    //                        data-min={statusList.propertyConfigs[activestatusfield[i]].minValue}
                    //                        data-max={statusList.propertyConfigs[activestatusfield[i]].maxValue}
                    //                        value={statusSet.statusValue} onChange={this.changeValue}
                    //                        placeholder={statusSet.statusValue==''?'请输入值':''} />
                    //             }
                    //         </section>
                    //     </div>
                    //     {(this.props.statusSet.length-1==i&&stallShow)?
                    //     <section className="addstatus" data-index={i} onClick={this.addStatus}>添加档位</section>
                    //     : null}
                    // </section>
                    // )})
                    }
                </div>
            );
        }
    })
};