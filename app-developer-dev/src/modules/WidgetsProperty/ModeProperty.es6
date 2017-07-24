'use strict';
/**
 * 模式选择控件 状态事件tab属性类
 * @author   pan
 * @datetime 2017-3-23
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {commandProperty} from './commandProperty'; // 发送指令组件
import {ImageProperty} from './ImageProperty'; // 图片上传组件


export let ModeProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    switchValue:true //1状态 0 事件
                };
        },
        toggleDiv:function(e){//切换事件div的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index,'mode');
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
        checkStatus:function(e){//设置点击显示事件二级状态
            let index = Number(e.target.getAttribute('data-index'));
            let wid = Number(e.target.getAttribute('data-wid'));
            let statusField = e.target.getAttribute('data-field');
            let statusValue = e.target.getAttribute('data-value');
            let propertySet = this.props.propertySet || {};
            let switchValue = propertySet.switchValue || 1;
            Actions.changeStatusValue(switchValue-1,index,wid,statusField,statusValue);
        },
        addMode :function(e){//添加模式  即添加一个点击事件跟一个状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.addEvent(index);
            Actions.addStatus(index);
            this.props.toggleDiv(this.props.propertySet.eventSet.length,'event');
            this.props.toggleDiv(this.props.propertySet.statusSet.length,'status');
        },
        delMode :function(e){//删除模式  即删除一个点击事件跟一个状态
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delStatus(index);
            Actions.delEvent(index);
        },
        handleSwitch: function(e,index){//状态事件tab切换
            let switchValue = this.state.switchValue;
            if(e==switchValue) return;
            this.setState({switchValue:e});
            // console.log('inde',index)
            // let show = switchValue===2?0:1;
            // this.props.toggleDiv(show,'status');
            // this.props.toggleDiv(show,'event');
        },
        render: function(){
            let propertySet = this.props.propertySet;
            let I = this.props.item,
                F = this.props.Pitem,
                i = this.props.Iindex,
                j = this.props.eventIndex,
                s = this.props.statusIndex,
                switchValue = this.state.switchValue;
            let scheme = JSON.parse(JSON.stringify(this.props.scheme));

            let statusSetArr = this.props.statusSet,
                statusSet = statusSetArr[i],
                statusList = this.props.statusList,
                activestatusfield = this.props.activefield;
            let valueType = statusList.propertyConfigs[activestatusfield[i]].valueType;
                //statusSet为状态,F(statusList)为协议内容,activeeventfield为选中类型
                //i(Iindex)为状态在数组中的索引值,valueType为协议规定数据类型,j(Jindex)为数据类型在协议中索引值
            let eventSetArr = this.props.eventSet,
                eventSet = eventSetArr[i],
                eventList = this.props.eventList,
                activeeventfield = this.props.activeeventfield;
            let eventvalueType = eventList.propertyConfigs[activeeventfield[i]].valueType;
            let pageList = this.props.pageList instanceof Array ? this.props.pageList : [],
                widgetList = this.props.widgetList instanceof Array ? this.props.widgetList : [];
            let commandType = eventSet.commandType || 1;
            let checkedList = eventSet.checkedCommandList || []
                //I(item)为事件,F(Pitem)为协议内容,activeeventfield为选中类型
              // console.log(statusSet,eventSet,i);

            return (
                <section className='modeMain'>
                    <span className='modetitle'>模式</span>
                    <span className={'toggle '+(this.props.showEvent==i?'on':'off')} data-index={i} onClick={this.toggleDiv}></span>
                    <span className='del' data-index={i} onClick={this.delMode}></span>
                    <div style={{display:(this.props.showMode==i?'':'none')}} >
                        <div className='switchproperty'>
                            <label  onClick={this.handleSwitch.bind(this,true,i)} className={switchValue?'active':''}>状态</label>
                            <label  onClick={this.handleSwitch.bind(this,false,i)} className={switchValue?'':'active'}>事件</label>
                        </div>
                       {
                            switchValue ?
                            <div className='status'>
                                {this.props.scheme.indexOf('image')>-1?
                                    <ImageProperty.getComponent item={statusSet} index={i} scheme={scheme}/>
                                    :null
                                }
                                <section>
                                    <span>字段</span>
                                    <select value={statusSet.statusField}
                                            data-pid={i} data-type = {s}
                                            onChange={this.changeField}>
                                        <option value=''>请选择字段</option>
                                        {statusList.propertyConfigs.map((O,k)=>{
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
                                        <select value={statusSet.statusValue}
                                                data-pid={i} data-type = {s}
                                                onChange={this.changeValue}>
                                                <option value=''>请选择值</option>
                                            {statusSet.statusField?statusList.propertyConfigs[activestatusfield[i]].options.map(
                                                (O,k)=>{
                                                return (
                                                    <option key={O.value} value={O.value}>
                                                        {O.meaning}
                                                    </option>
                                                );
                                            }) : null}
                                        </select>
                                        : <input type={(valueType == 'number' || valueType == 'range')? 'number':'text'}
                                               data-pid={i} data-type = {s}
                                               data-min={statusList.propertyConfigs[activestatusfield[i]].minValue}
                                               data-max={statusList.propertyConfigs[activestatusfield[i]].maxValue}
                                               value={statusSet.statusValue} onChange={this.changeValue}
                                               placeholder={statusSet.statusValue==''?'请输入值':''} />
                                    }
                                </section>
                            </div>
                            :
                            <div className='event'>
                                <section data-pid={i} data-type={j} onClick={this.changeEvent}>
                                    <span>点击</span>
                                    <label data-value={'1'} className={eventSet.eventType==1?'active':''}>指令</label>
                                    <label data-value={'2'} className={eventSet.eventType==2?'active':''}>跳转</label>
                                    <label data-value={'3'} className={eventSet.eventType==3?'active':''}>显示</label>
                                    <label data-value={'4'} className={eventSet.eventType==4?'active':''}>隐藏</label>
                                </section>
                                {eventSet.eventType == '1' ?
                                    <div>
                                        <commandProperty.getComponent dataList={this.props.dataList} index={i}
                                        commandType={commandType} checkedList={checkedList} />
                                        <section style={{display:commandType==2?'none':'block'}}>
                                            <span>字段</span>
                                            <select value={eventSet.eventField}
                                                    data-pid={i} data-type = {j}
                                                    onChange={this.changeField}>
                                                <option value=''>请选择字段</option>
                                                {eventList.propertyConfigs.map((O,k)=>{
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
                                        <section style={{display:commandType==2?'none':'block'}}>
                                            <span>值</span>
                                            {eventvalueType == 'enum' ?
                                                <select value={eventSet.eventValue}
                                                        data-pid={i} data-type = {j}
                                                        onChange={this.changeValue}>
                                                    <option value=''>请选择值</option>
                                                    {eventSet.eventField?eventList.propertyConfigs[activeeventfield[i]].options.map(
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
                                                <input type={(eventvalueType == 'number' || eventvalueType == 'range')? 'number':'text'}
                                                       data-pid={i} data-type = {j}
                                                       data-min={eventList.propertyConfigs[activeeventfield[i]].minValue}
                                                       data-max={eventList.propertyConfigs[activeeventfield[i]].maxValue}
                                                       value={eventSet.eventValue} onChange={this.changeValue}
                                                       placeholder={eventSet.eventValue==''?'请输入值':''} />
                                            }
                                        </section>
                                    </div>
                                :(eventSet.eventType == '2'?
                                    <section>
                                        <span>页面</span>
                                        <select value={eventSet.checkedPageId} data-pid={i}
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
                                                let checkedList = eventSet.eventType == '3'?eventSet.showWidgetList:eventSet.hiddenWidgetList;
                                                return (
                                                    <li key={k}>
                                                        <input type="checkbox" data-pid={i} data-type={eventSet.eventType == '3'?'show':'hidden'} data-value={O.userWidgetID} onChange={this.ListCheck}
                                                               checked={checkedList.indexOf(O.userWidgetID)>-1?'true':''} data-wid={O.userWidgetID} />
                                                        <span>{O.caption+'('+(O.propertySet[0].statusVisibility==2?'隐藏':'显示')+')'}</span>
                                                        {eventSet.eventType == '3'&&O.propertySet[0].statusSet.length>1?
                                                            <ul className='statusList'>
                                                                {O.propertySet[0].statusSet.map((item,index)=>{
                                                                    let set = eventSet['activeStatusField'][O.userWidgetID] || {};
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
                        }
                    </div>
                    {this.props.widget.propertySet[0].statusSet.length-1==i?
                            <section className="addmode" data-index={i} onClick={this.addMode}><em>+</em>添加模式</section>
                    : null}
                </section>
            );
        }
    })
};