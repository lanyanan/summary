'use strict';
/**
 * 滑块属性类
 * @author   xinglin
 * @datetime 2016-07-13
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ProcessVariableProperty = {
    getComponent : React.createClass({
        getInitialState: function(){
            return {
                
            };
        },
        statusChange(e){
            var num = e.target.value;
            Actions.changeWidgetInfo('processNowd',num);
        },
        changeStatusName : function(e){//修改过程名称
            let pid = Number(e.target.getAttribute('data-pid'));
            let snvalue = e.target.value;
            Actions.changeStatusName(pid,snvalue,'statusName');
        },
        addStatus :function(e){//添加一个过程
            e.stopPropagation();
            let index = Number(e.target.getAttribute('data-index'));
            if(index == 5) return false;
            Actions.addStatus(index-1);
            Actions.changeWidgetInfo('processNowd',index);
        },
        delStatus :function(e){//删除指定的过程
            e.stopPropagation();
            let index = Number(e.target.getAttribute('data-index'));
            if(index<=3){
                return false;
            }
            Actions.delStatus(index-1);
            Actions.changeWidgetInfo('processNowd',index-2);
            let processColorArr = this.props.processColorArr ? this.props.processColorArr : [];
            let processNowd = this.props.processNowd ? this.props.processNowd : 0;
            processColorArr.splice(index-1, 1);
            Actions.changeWidgetInfo('processColorArr',processColorArr);
        },
        render: function(){
                let propertySet = this.props.propertySet;
                let statusSet = this.props.statusSet;
                let processNowd = this.props.processNowd ? this.props.processNowd : 0;
                if(!statusSet[processNowd]){
                    return false;
                }
                let I = statusSet[processNowd],
                    i = processNowd;
                
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
                        <span>当前过程</span>
                        <select onChange={this.statusChange} value={processNowd}>
                            {
                                statusSet.map((item,index)=>{
                                    return <option value={index} key={index}>{index+1}</option>
                                })
                            }
                        </select>
                    </section>
                    <section className='status'>
                        <div>
                            <section className='imageinfo'>
                                <span>名称</span>
                                <input className="picname" data-pid={i} defaultValue={I.statusName} onChange={this.changeStatusName} />
                            </section>
                        </div>
                    </section>
                </div>
            );
        }
    })
};