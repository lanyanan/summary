'use strict';
/**
 * 文本属性类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let TextAlignProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    
                };
        },
        changeAlign(e){
            let textAlign = e.target.getAttribute('data-value');
            Actions.changeExterior('textAlign',textAlign);
        },
        render: function(){
            let textAlign = this.props.textAlign;
            return (
                <section className='textalign' onClick={this.changeAlign}>
                    <span>对齐方式</span>
                    <div>
                        <label data-value={'left'} className={textAlign=='left'?'left active':'left'} title="左对齐"></label>
                        <label data-value={'center'} className={textAlign=='center'?'center active':'center'}  title="居中"></label>
                        <label data-value={'right'} className={textAlign=='right'?'right active':'right'}  title="右对齐"></label>
                    </div>
                </section>
            );
        }
    })
};