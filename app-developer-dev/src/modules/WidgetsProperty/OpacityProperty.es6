'use strict';
/**
 * 透明度属性类
 * @author   pan
 * @datetime 2017-03-31
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let OpacityProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
            return {
                widgetOpacity:80
            };
        },
        changeOpacity : function(e){
                let pid = Number(e.target.getAttribute('data-pid'));
                let opacity = Number(e.target.value);
                this.setState({widgetOpacity:opacity});
                Actions.changeStringProperty(pid,'trans',opacity);
        },
        render: function(){
            let I = this.props.item,
                opacity = I.trans || this.state.widgetOpacity,
                i = this.props.index;

            return (
                <section className='transproperty'>
                    <span>透明度</span>
                    <input type="number" value={opacity} onChange={this.changeOpacity} min="0" max="100"  data-pid={I.propertyId} />
                </section>
            );
        }
    })
};
