'use strict';
/**
 * 发布面板
 * @author
 * @datetime
 */

import React from 'react';
import Reflux from 'reflux';
import {BaseClass} from '../../core/Base.class';
import {Actions} from './Actions';
import {Store} from './Store';
import {URI} from '../../config/app.config'; // 配置信息

var Release = require('../appName/index');

export default class PublishClass extends BaseClass {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return React.createClass({
            mixins: [Reflux.connect(Store)],
            getInitialState: function(){
                return {
                    title  :  '',
                    remark :  '',
                };
            },
            componentWillMount: function(){
                Actions.refreshState(); // 刷新state
            },
            render: function(){

                // <div>标题：{this.state.title}</div>
                // 提交方法： Actions.publishProject(title, remark);
                return (

                    <Release  title={this.state.title} remark={this.state.remark} />
                );
            }
        });
    }
}