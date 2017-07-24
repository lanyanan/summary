'use strict';
/**
 * 预览面板
 * @author
 * @datetime
 */

import React from 'react';
import Reflux from 'reflux';
// import Router from 'react-router';
import {BaseClass} from '../../core/Base.class';
import {Actions} from './Actions';
import {Store} from './Store';
import {URI} from '../../config/app.config'; // 配置信息

import  * as Comm       from '../../modules/common';    // 公共函数模块
import HeaderPanel      from '../../modules/HeaderPanel/HeaderPanel'; // 头部面板


var QRCode=require('../2DCode/index');


// 生成各模块实例
let Header      = new HeaderPanel();


// 获取各模块React组件
let HeaderDom = Header.getComponent();

export default class PreviewClass extends BaseClass {
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
                  title: 'C-Life'
                };
            },
            componentWillMount:function(){
                Actions.refreshState(); // 刷新state
            },
            render: function() {
                if(this.state.previewUrl){
                    return (
                        <div className="preview-body">

                           <QRCode title={this.state.title} url={this.state.previewUrl} />

                        </div>
                    );
                }else{
                    return null;
                }
            }
        });
    }
}



