'use strict';
/**
 * 指令属性面板类
 * @author   xinglin
 * @datetime 2016-01-25
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let commandProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    show:false
                };
        },
        selectType:function(e){//更改控件是否发送指令
            let type = e.target.value;
            let pid = this.props.index;
            Actions.changeCommandType(pid,type);
            this.setState({show:false});
        },
        ListCheck : function(e){//修改控件当前状态显示名
            let property = e.target.getAttribute('data-value');
            let pid = this.props.index;
            if(e.target.checked){
                let fieldIndex = e.target.getAttribute('data-findex');
                let byteLength = Number(e.target.getAttribute('data-blength'));
                Actions.addCheckedCommand(pid,property,fieldIndex,byteLength);
            }else{
                Actions.delCheckedCommand(pid,property);
            }
        },
        showCheckList : function(e){//显示列表
            this.setState({show:true});
        },
        hiddenCheckList : function(e){//隐藏列表
            this.setState({show:false});
        },
        render: function(){
            let dataList = this.props.dataList || [];
            let checkedList = this.props.checkedList || [];
            let commandType = this.props.commandType || '0';
            return (
                <div className='commandproperty'>
                    <div className='checkbox'>
                        <span>指令</span>
                        <select value={commandType} onChange={this.selectType}>
                            <option value='1'>自身指令</option>
                            <option value='2'>复合指令</option>
                        </select>
                        <button onClick={this.showCheckList} style={{display:(commandType ==2 ? '' : 'none')}}>修改</button>
                    </div>
                    <ul className='checklist' style={{display:((commandType ==2&&this.state.show)? '' : 'none')}}>
                        <span className='listclose' onClick={this.hiddenCheckList}>X</span>
                        {dataList.map((e,i)=>{
                            if(!e.property){
                                return (
                                    <li key={i}><span>配置项错误,请检查协议</span></li>
                                );
                            }
                            if(e.property !=='updateFlag'){
                                return (
                                    <li key={i}>
                                        <input type="checkbox" data-value={e.property} data-findex={e.index} data-blength={e.byteLength}
                                               onChange={this.ListCheck} checked={checkedList.indexOf(e.property)>-1?'true':''} />
                                        <span>{e.propertyName}</span>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            );
        }
    })
};