'use strict';
/**
 * 开关按钮属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {commandProperty} from './commandProperty'; // 发送指令组件

export let SwitchProperty = {
	getComponent : React.createClass({
        componentDidMount: function() {
            console.log(this.props);
            //开关控件开关两种状态及事件初始化处理
            if(this.props.statusSet.length === 1) Actions.addStatus(0,'false');
            if(this.props.eventSet.length === 1) Actions.addEvent(0,'false');
            Actions.changeStatusName(0,'开状态','false');
            Actions.changeStatusName(1,'关状态','false');
        },
        changeSwitch:function(e){//更改选中的开/关状态
            let propertySet = this.props.propertySet || {},
                switchValue = propertySet.switchValue || 1,
                value = e.target.value;

            if(value == switchValue) return;

            Actions.changeBooleanProperty(0,'switchValue');

            let show = switchValue === 2 ? 0 : 1;
            this.props.toggleDiv(show,'status');
            this.props.toggleDiv(show,'event');

            let pid = Number(e.target.getAttribute('data-pid'));            
            pid = pid == 1 ? 0 : 1;
            Actions.changeStringProperty(pid, 'activeStatus', pid);

        },
        changeField: function(e){//更改选中的字段
            e.stopPropagation();
            let property = e.target.value;
            let pid = Number(e.currentTarget.getAttribute('data-pid'));
            let type = Number(e.currentTarget.getAttribute('data-type'));
            let options = null;
            if(e.target.options[e.target.selectedIndex].getAttribute('data-type') === 'enum'){
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
            if(svalue !== '' && (min || max)){
                svalue = svalue >= max ? max : svalue;
                svalue = svalue <= min ? min : svalue;
                if(svalue > 0) svalue = Number(svalue);
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
        changeCheck:function(e){//更改控件当前状态是否可见
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeStringProperty(pid,'activeStatus',pid);
        },
        toggleStatusDiv:function(e){//切换状态div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'status');
        },
        toggleEventDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'event');
        },
        checkStatus:function(e){//设置点击显示事件二级状态
            let index = Number(e.target.getAttribute('data-index'));
            let wid = Number(e.target.getAttribute('data-wid'));
            let statusField = e.target.getAttribute('data-field');
            let statusValue = e.target.getAttribute('data-value');
            let propertySet = this.props.propertySet || {};
            let switchValue = propertySet.switchValue || 1;
            Actions.changeStatusValue(switchValue-1,index,wid,statusField,statusValue);
        },
        render: function(){
            let statusSet = this.props.statusSet,
                statusList = this.props.statusList,
                activestatusfield = this.props.activefield,
                i = this.props.Iindex,
                propertySet = this.props.propertySet || {},
                j = this.props.Jindex;

            let switchValue = propertySet.switchValue || 1;

            statusSet = statusSet[switchValue - 1];
            i = switchValue - 1;

            let valueType = statusList.propertyConfigs[activestatusfield[i]].valueType;
            //statusSet为状态,F(statusList)为协议内容,activeeventfield为选中类型
            //i(Iindex)为状态在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            
            let eventSet = this.props.eventSet,
                eventList = this.props.eventList,
                activeeventfield = this.props.activeeventfield,
                eventvalueType = eventList.propertyConfigs[activeeventfield[i]].valueType,
                pageList = this.props.pageList instanceof Array ? this.props.pageList : [],
                widgetList = this.props.widgetList instanceof Array ? this.props.widgetList : [],
                q = this.props.eventIndex;

            eventSet = eventSet[switchValue - 1];
            let commandType = eventSet.commandType || 1;
            let checkedList = eventSet.checkedCommandList || [];

            //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
            //i(Iindex)为事件在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            return (
                <div>
                    <section className='status'>
                        <div className='switchproperty'>
                            <span>状态</span>
                            <select value={switchValue} data-pid={i} onChange={this.changeSwitch}>
                                <option value="1" key={1} data-pid={i}>开</option>
                                <option value="2" key={2} data-pid={i}>关</option>
                            </select>
                        </div>
                        <div>
                        <span className='statustitle'>状态数据显示</span>
                        <section>
                            <span>关联数据</span>
                            <select value={statusSet.statusField} data-pid={i} data-type = {j} onChange={this.changeField}>
                                <option value=''>请选择数据</option>
                                {
                                    statusList.propertyConfigs.map((O,k)=>{
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
                            <span>参数</span>
                            {
                                valueType == 'enum' ?
                                <select value={statusSet.statusValue} data-pid={i} data-type = {j} onChange={this.changeValue}>
                                        <option value=''>请选择参数</option>
                                        {
                                            statusSet.statusField ? statusList.propertyConfigs[activestatusfield[i]].options.map(
                                                (O, k) => {
                                                return (
                                                    <option key={k} value={O.value}>
                                                        {O.meaning}
                                                    </option>
                                                );
                                            }) : null
                                        }
                                </select>
                                : <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                                       data-pid={i} data-type = {j}
                                       data-min={statusList.propertyConfigs[activestatusfield[i]].minValue}
                                       data-max={statusList.propertyConfigs[activestatusfield[i]].maxValue}
                                       value={statusSet.statusValue} onChange={this.changeValue}
                                       placeholder={statusSet.statusValue == '' ? '请输入值' : ''} />
                            }
                        </section>
                        </div>
                    </section>
                    <section className='event'>
                        <span className='eventtitle'>点击事件</span>
                        <span className={'toggle ' + (this.props.showEvent == i ? 'on' : 'off')} data-index={i} onClick={this.toggleEventDiv}></span>
                        <span className='del' data-index={i} onClick={this.delEvent}></span>
                        <div style={{display: (this.props.showEvent == i ? '' : 'none')}}>
                        <section data-pid={i} data-type={q} onClick={this.changeEvent}>
                            <span>点击</span>
                            <div>
                                <label data-value={'1'} className={eventSet.eventType == 1 ? 'active' : ''}>指令</label>
                                <label data-value={'2'} className={eventSet.eventType == 2 ? 'active' : ''}>跳转</label>
                                <label data-value={'3'} className={eventSet.eventType == 3 ? 'active' : ''}>显示</label>
                                <label data-value={'4'} className={eventSet.eventType == 4 ? 'active' : ''}>隐藏</label>
                            </div>
                        </section>
                        {
                            eventSet.eventType == '1' ?
                            <div>
                                <commandProperty.getComponent dataList={this.props.dataList} index={i}
                                commandType={commandType} checkedList={checkedList} />
                                <section style={{display:commandType==2?'none':'block'}}>
                                    <span>关联数据</span>
                                    <select value={eventSet.eventField}
                                            data-pid={i} data-type = {q}
                                            onChange={this.changeField}>
                                        <option value=''>请选择数据</option>
                                        {
                                            eventList.propertyConfigs.map((O, k) => {
                                                if(O.property !== 'updateFlag'){
                                                    return (
                                                        <option data-findex={O.index} data-blength={O.byteLength} key={k} value={O.property}>
                                                            {O.propertyName}
                                                        </option>
                                                    );
                                                }
                                            })
                                        }
                                    </select>
                                </section>
                                <section style={{display: commandType == 2 ? 'none' : 'block'}}>
                                    <span>参数</span>
                                    {
                                        eventvalueType == 'enum' ?
                                        <select value={eventSet.eventValue}
                                                data-pid={i} data-type = {q}
                                                onChange={this.changeValue}>
                                            <option value=''>请选择参数</option>
                                            {
                                                eventSet.eventField ? 
                                                eventList.propertyConfigs[activeeventfield[i]].options.map(
                                                    (O, k) => {
                                                        if(O.property!=='updateFlag'){
                                                            return (
                                                                <option key={k} value={O.value}>
                                                                    {O.meaning}
                                                                </option>
                                                            );
                                                        }
                                                    }
                                                )
                                                :null
                                            }
                                        </select>
                                        :
                                        <input type={(eventvalueType == 'number' || eventvalueType == 'range')? 'number':'text'}
                                               data-pid={i} data-type = {q}
                                               data-min={eventList.propertyConfigs[activeeventfield[i]].minValue}
                                               data-max={eventList.propertyConfigs[activeeventfield[i]].maxValue}
                                               value={eventSet.eventValue} onChange={this.changeValue}
                                               placeholder={eventSet.eventValue==''?'请输入值':''} />
                                    }
                                </section>
                            </div>
                            :(
                                eventSet.eventType == '2'?
                                <section>
                                    <span>页面</span>
                                    <select value={eventSet.checkedPageId} data-pid={i} data-type = {q} onChange={this.changeCheckedPage}>
                                        <option value=''>请选择页面</option>
                                        {
                                            pageList.map((O,k)=>{
                                                if(k != this.props.activePage){
                                                    return (
                                                        <option key={k} value={O.pageId}>
                                                            {O.pageName}
                                                        </option>
                                                    );
                                                }
                                            })
                                        }
                                    </select>
                                </section>
                                :
                                <div className="checklistsection">
                                    <span>控件</span>
                                    <ul className="checklist">
                                        {
                                            widgetList.map((O,k)=>{
                                                let checkedList = eventSet.eventType == '3' ? eventSet.showWidgetList : eventSet.hiddenWidgetList;
                                                return (
                                                    <li key={k}>
                                                        <input type="checkbox" data-pid={i} data-type={eventSet.eventType == '3'?'show':'hidden'} data-value={O.userWidgetID} onChange={this.ListCheck}
                                                               checked={checkedList.indexOf(O.userWidgetID)>-1?'true':''} data-wid={O.userWidgetID} />
                                                        <span>
                                                            {O.caption + '(' + (O.propertySet[0].statusVisibility == 2 ? '隐藏' : '显示') + ')'}
                                                        </span>
                                                        {
                                                            eventSet.eventType == '3' && O.propertySet[0].statusSet.length > 1 ?
                                                            <ul className='statusList'>
                                                                {
                                                                    O.propertySet[0].statusSet.map((item,index)=>{
                                                                        let set = eventSet['activeStatusField'][O.userWidgetID] || {};
                                                                        return(
                                                                            <li key={index}>
                                                                                <input type="checkbox" checked={set['index']==index?'true':''} onChange={this.checkStatus}
                                                                                data-index={index} data-wid={O.userWidgetID} data-field={item.statusField} data-value={item.statusValue} />
                                                                                <span>{item.statusName || '状态'+index}</span>
                                                                            </li>
                                                                        );
                                                                    })
                                                                }
                                                            </ul>
                                                            :null
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        }
                        </div>
                    </section>
                </div>
            )
        }
    })
};