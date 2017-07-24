'use strict';

/**
 * 控件面板类
 * 提供各种小控件选择功能
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

import React from 'react';
import {PanelBase} from '../../core/PanelBase.class';
import {Widgets} from './Widgets.class'; // 控件库

export default class WidgetsPanel extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        let $Me = this;
        let widgets = Widgets.getArrayWidgets();
        return React.createClass({
            render: function(){
                return (
                    <div className="widgetsArea">
                        <ul className='widgetBody'>
                            {widgets.map((W)=>{
                                if(W.id == 1021) return false;
                                return (<W.prev key={W.id} data-wid={W.id} data-dragtype="widget" />);
                            })}
                        </ul>
                    </div>
                );
            }
        });
    }
}