'use strict';
/**
 * 状态可见性属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ShowProperty = {
	getComponent : React.createClass({
        changeCheck:function(e){//更改控件当前状态是否可见
            let pid = Number(e.target.getAttribute('data-pid'));
            Actions.changeBooleanProperty(pid,'statusVisibility');
        },
        render: function(){
        	let I = this.props.item;
            return (
                <section className='showproperty'>
                    <span className={"checkstatus "+(I.statusVisibility==2?'on':'off')} onClick={this.changeCheck} data-pid={I.propertyId}>
                        
                    </span>
                    {
                        // <input className={"checkstatus "+(I.statusVisibility==2?'on':'off')} type="checkbox"
                        //    onChange={this.changeCheck} data-pid={I.propertyId}
                        //    checked={I.statusVisibility==2?'true':''}  />
                    }
                    
                </section>
            );
        }
    })
};