'use strict';
/**
 * 事件属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {commandProperty} from './commandProperty'; // 发送指令组件

export let EventProperty = {
	getComponent : React.createClass({
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
        changeEvent: function(e){//更改事件类型
            let eventtype = e.target.getAttribute('data-value');
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            Actions.changeEventType(pid,eventtype);
        },
        changeCheckedPage: function(e){//更改点击跳转的页面
            e.stopPropagation();
            let pageId = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            Actions.changeCheckedPage(pid,pageId);
        },
        ListCheck : function(e){//修改控件当前状态显示名
            let widgetid = parseInt(e.target.getAttribute('data-value'));
            let type = e.target.getAttribute('data-type');
            let pid = Number(e.target.getAttribute('data-pid')) || 0;
            let wid = Number(e.target.getAttribute('data-wid'));
            if(e.target.checked){
                Actions.addCheckedWidget(widgetid,type,pid,wid);
            }else{
                Actions.delCheckedWidget(widgetid,type,pid,wid);
            }
        },
        addEvent :function(e){//添加一个点击事件
            let index = Number(e.target.getAttribute('data-index'));
            Actions.addEvent(index);
            this.props.toggleDiv(this.props.widget.propertySet[0].eventSet.length,'event');
        },
        delEvent :function(e){//删除指定的点击事件
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delEvent(index);
        },
        toggleDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'event');
        },
        checkStatus:function(e){//设置点击显示事件二级状态
            let index = Number(e.target.getAttribute('data-index'));
            let wid = Number(e.target.getAttribute('data-wid'));
            let statusField = e.target.getAttribute('data-field');
            let statusValue = e.target.getAttribute('data-value');
            Actions.changeStatusValue(this.props.Iindex,index,wid,statusField,statusValue);
        },
        render: function(){
        	let I = this.props.item,
                F = this.props.Pitem,
                activeeventfield = this.props.activefield,
                i = this.props.Iindex,
                valueType = F.propertyConfigs[activeeventfield[i]].valueType,
                pageList = this.props.pageList instanceof Array ? this.props.pageList : [],
                widgetList = this.props.widgetList instanceof Array ? this.props.widgetList : [],
        		j = this.props.Jindex;
            let commandType = I.commandType || 1;
            let checkedList = I.checkedCommandList || [];
                //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
                //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return (
                    <section className='event'>
                        <span className='eventtitle'>点击事件</span>
                        <span className={'toggle '+(this.props.showEvent==i?'on':'off')} data-index={i} onClick={this.toggleDiv}></span>
                        <span className='del' data-index={i} onClick={this.delEvent}></span>
                        <div style={{display:(this.props.showEvent==i?'':'none')}}>
                        <section data-pid={i} data-type={j} onClick={this.changeEvent}>
                            <span>点击</span>
                            <label data-value={'1'} className={I.eventType==1?'active':''}>指令</label>
                            <label data-value={'2'} className={I.eventType==2?'active':''}>跳转</label>
                            <label data-value={'3'} className={I.eventType==3?'active':''}>显示</label>
                            <label data-value={'4'} className={I.eventType==4?'active':''}>隐藏</label>
                            {/*<select data-pid={i} value={I.eventType} data-type = {j} onChange={this.changeEvent}>
                                <option value='1'>点击触发</option>
                                <option value='2'>点击跳转</option>
                                <option value='3'>点击显示</option>
                                <option value='4'>点击隐藏</option>
                            </select>*/}
                        </section>
                        {I.eventType == '1' ?
                            <div>
                                <commandProperty.getComponent dataList={this.props.dataList} index={i}
                                commandType={commandType} checkedList={checkedList} />
                                <section style={{display:commandType==2?'none':'block'}}>
                                    <span>字段</span>
                                    <select value={I.eventField}
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
                                <section style={{display:(commandType==2||this.props.scheme.indexOf('eValue')!==-1)?'none':'block'}}>
                                    <span>值</span>
                                    {valueType == 'enum' ?
                                        <select value={I.eventValue}
                                                data-pid={i} data-type = {j}
                                                onChange={this.changeValue}>
                                            <option value=''>请选择值</option>
                                            {I.eventField?F.propertyConfigs[activeeventfield[i]].options.map(
                                                (O,k)=>{
                                                if(O.property!=='updateFlag'){
                                                    return (
                                                        <option key={O.value} value={O.value}>
                                                            {O.meaning}
                                                        </option>
                                                    );
                                                }
                                            }):null}
                                        </select>
                                        :
                                        <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                                               data-pid={i} data-type = {j}
                                               data-min={F.propertyConfigs[activeeventfield[i]].minValue}
                                               data-max={F.propertyConfigs[activeeventfield[i]].maxValue}
                                               value={I.eventValue} onChange={this.changeValue}
                                               placeholder={I.eventValue==''?'请输入值':''} />
                                    }
                                </section>
                            </div>
                        :(I.eventType == '2'?
                            <section>
                                <span>页面</span>
                                <select value={I.checkedPageId} data-pid={i}
                                        data-type = {j} onChange={this.changeCheckedPage}>
                                    <option value=''>请选择页面</option>
                                    {pageList.map((O,k)=>{
                                        if(k!=this.props.activePage){
                                            return (
                                                <option  key={O.pageId} value={O.pageId}>
                                                    {O.pageName}
                                                </option>
                                            );
                                        }
                                    })}
                                </select>
                            </section>
                            :
                            <div className="checklistsection">
                                <span>控件</span>
                                <ul className="checklist">
                                    {widgetList.map((O,k)=>{
                                        let checkedList = I.eventType == '3'?I.showWidgetList:I.hiddenWidgetList;
                                        return (
                                            <li key={k}>
                                                <input type="checkbox" data-pid={i} data-type={I.eventType == '3'?'show':'hidden'} data-value={O.userWidgetID} onChange={this.ListCheck}
                                                       checked={checkedList.indexOf(O.userWidgetID)>-1?'true':''} data-wid={O.userWidgetID} />
                                                <span>{O.caption+'('+(O.propertySet[0].statusVisibility==2?'隐藏':'显示')+')'}</span>
                                                {I.eventType == '3'&&O.propertySet[0].statusSet.length>1?
                                                    <ul className='statusList'>
                                                        {O.propertySet[0].statusSet.map((item,index)=>{
                                                            let set = I['activeStatusField'][O.userWidgetID] || {};
                                                            return(
                                                                <li key={index}>
                                                                    <input type="checkbox" checked={set['index']==index?'true':''} onChange={this.checkStatus}
                                                                    data-index={index} data-wid={O.userWidgetID} data-field={item.statusField} data-value={item.statusValue} />
                                                                    <span>{item.statusName || '状态'+index}</span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    :null
                                                }
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                         )
                        }
                        </div>
                        {this.props.widget.propertySet[0].eventSet.length-1==i?
                            <section className="addevent" data-index={i} onClick={this.addEvent}>添加点击</section>
                        : null}
                    </section>
            );
        }
    })
};