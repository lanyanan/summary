'use strict';
/**
 * 选项卡属性类
 * @author   pan
 * @datetime 2017-04-18
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {CaptionProperty} from './CaptionProperty';

export let TabProperty = {
    getComponent : React.createClass({
         getInitialState: function(){
                return {
                    hidden:true,
                };
        },
        componentDidMount() {
            if(this.props.widgetListItem.length == 1){
                this.defaultEditTab(1)
                this.defaultEditTab(2)
            }
            if(this.props.activeTabIndex<1){
                Actions.selectUserWidget(Number(this.props.activeWidget), null, 0);
            }
        },
        addTab: function(e) { //添加一个选项
            let index = Number(e.target.getAttribute('data-index'));
            Actions.addTab(index);
            this.props.toggleDiv(index + 1, 'tabBar');
        },
        delTab: function(e) { //删除指定的选项
            let index = Number(e.target.getAttribute('data-index'));
            Actions.delTab(index - 1);
        },
        editTab: function(e) { //编辑指定的选项
            let index = Number(e.target.value - 1);
            Actions.selectUserWidget(Number(this.props.activeWidget), null, index);
        },
        defaultEditTab: function(value) {
            Actions.addTab(value);
        },
        toggleDiv: function(e) { //切换选项的显示隐藏
            let index = Number(e.target.getAttribute('data-index'));
            this.props.toggleDiv(index, 'tabBar');
        },
        serializeTab: function(e) { //tab选项优先显示，序列化
            let tid = Number(e.target.getAttribute('data-tid'));
            Actions.serializeTab(tid);
        },
        changeTabName: function(e) { //修改选项名
            let tid = Number(e.target.getAttribute('data-tid'));
            let snvalue = e.target.value;
            Actions.changeTabName(tid, snvalue);
        },
        delTabName: function(e) { //删除选项名
            let tid = Number(e.target.getAttribute('data-tid'));
            Actions.changeTabName(pid, '');
        },
        showFocus: function(e) {
            let defaultvalue = e.target.value;
            this.setState({
                hidden: false
            }, () => {
                React.findDOMNode(this.refs.tabname).value = defaultvalue;
                React.findDOMNode(this.refs.tabname).focus();
            });
        },
        hiddenBlur: function(e) {
            this.setState({
                hidden: true
            });
        },
        keydown : function(e){//回车快捷键 提交命名结束
            if(e.keyCode == 13){
                this.setState({hidden:true});
            }
            else{
                return;
            }
        },
        
        render: function(){
            let tabList = this.props.widgetListItem,
                activeWidget = this.props.activeWidget,
                activeTabIndex = this.props.activeTabIndex,//处于编辑状态的选项index
                i = this.props.index,//当前选项index
                priority = this.props.priority,//优先显示index
                tabName = tabList[i][0]?tabList[i][0].tabName :'',
                allNum = tabList.length;
                if(activeTabIndex>-1){
                    tabName = tabList[activeTabIndex][0]?tabList[activeTabIndex][0].tabName :'';
                    i = activeTabIndex;
                }
            return (
                <div className='property-tab'>
                    <section className='property-tab-num'>
                        <span>数量</span>
                        <input type='number' min={2} value={allNum}/>
                        <lable className="number-add" data-index={allNum} onClick={this.delTab}>-</lable>  
                        <lable className="number-reduce" data-index={allNum} onClick={this.addTab}>+</lable>  
                    </section>
                    <section className='propertyt-tab-active'>
                        <span>当前选项</span>
                        <select ref="propertytTabNum" value={parseInt(activeTabIndex)+1} onChange={this.editTab}>
                            {tabList.map((item, index)=>{
                                return <option value={index+1} key={index}>{index+1}</option>
                            })}
                        </select>
                    </section>
                    <section className='imageinfo' style={{display:tabList[i][0]?'':'none'}}>
                        <span>名称</span>
                        <input className="picname"  onChange={this.showFocus} 
                            onFocus={this.showFocus} value={tabName} placeholder="请填写选项名"/>
                        <input className="picnamehidden" onChange={this.changeTabName} ref='tabname'
                            onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                            data-tid={i} defaultValue={tabName} onKeyDown={this.keydown} />
                        <span className="deleteinfo" data-tid={i} onClick={this.delTabName}>
                        </span>
                    </section>
                </div>
                
            );
        }
    })
};
