'use strict';

/**
 * 控件面板类
 * 提供各种小控件选择功能
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

import React from 'react';
import {PanelBase} from '../../core/PanelBase.class.es6';
import {Widgets} from './Widgets.class.es6'; // 控件库
import {BaseComponent} from '../../../libs/BaseComponent.class.es6';

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
        class Wi extends BaseComponent {
            render() {
                return (
                    <div className="widgetsArea">
                        <ul className='widgetBody'>
                            {widgets.map((W)=>{
                                return (<W.prev key={W.id} data-wid={W.id} data-dragtype="widget" />);
                            })}
                        </ul>
                    </div>
                );
            }
        }
        return Wi
    }
}