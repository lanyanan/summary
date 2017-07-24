'use strict';
/**
 * 退热治疗
 */
import {Actions} from './Actions.es6';

export const MeasureNurse = React.createClass({
    getInitialState: function(){
        let isAndroid=!!(navigator.userAgent.indexOf('Android')+1);
        return {
          headerTop: isAndroid?50:64
        };
    },
   changeActive:function(e){
    let value = e.currentTarget.getAttribute('data-index');
    if(typeof this.props.callback === 'function'){
        this.props.callback(value);
    }
   },
    render: function() {
    	let index = this.props.active || 0;
        return (
            <div>
                <header style={{'paddingTop':this.state.headerTop}}></header>
            	<ul className="MeaTab">
                    <li data-index={0} onTouchEnd={this.changeActive}><span className={index==0?"span-bk":''}>测量及护理</span></li>
                    <li data-index={1} onTouchEnd={this.changeActive}><span className={index==1?"span-bk":''}>退热治疗</span></li>
                </ul>
            </div>
        );
    }
});