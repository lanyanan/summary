'use strict';

/**
 * 资产面板类
 * 主要负责页面列表导航
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

import React from 'react';
import {PanelBase} from '../../core/PanelBase.class';

export default class AssetsPanel extends PanelBase {
    constructor(){
        super();
        // if (new.target !== AssetsPanel) {
        //     throw new Error('必须使用new生成实例');
        // }
        // this.loadCssFile('playground/AssetsPanel.css');
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return React.createClass({
            render: function(){
                return (
                    <div>
                        assets
                    </div>
                );
            }
        });
    }
}