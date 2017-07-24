'use strict';

/**
 * 控制面板类
 * 主全局控制
 * @author   tomhou
 */

import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
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
            mixins: [Reflux.connect(Store)],
            componentDidMount:function(){
                this._interval = setInterval(this.saveProject,60000);
            },
            componentWillUnmount: function() {
                clearInterval(this._interval);
            },
            showSnapline:function(e){
                let type = e.currentTarget.getAttribute('data-type');
                Actions.showPanel(type);
            },
            historyBack:function(){
                Actions.historyBack();
            },
            historyForward:function(){
                Actions.historyForward();
            },
            previewProject:function(){
                Actions.saveProject();
                Actions.makeHtml(true);
            },
            publishProject:function(){
                Actions.saveProject();
                this.props.publishFun();
                // location.hash = 'publish';
            },
            saveProject:function(){
                Actions.saveWidgets();
                Actions.saveProject();
            },
            render: function(){
                var icon=<i className="spriterImg"></i>;

                return (
                    <div className="operate-wrap">
                        <div className="operate-list">
                            <div className="operate-btn">
                                <h2>{this.state.title}</h2>
                                <ul>
                                    <li className="icon-save"  onClick={this.saveProject}>
                                        {icon}
                                    </li>
                                    <li className="icon-back"   onClick={this.historyBack}>
                                        {icon}
                                    </li>
                                    <li className="icon-go"   onClick={this.historyForward}>
                                        {icon}
                                    </li>
                                    <li className="icon-snapline" style={{display: "none"}}  data-type='snapLine' onClick={this.showSnapline}>
                                        {icon}
                                    </li>
                                </ul>
                                <ul>
                                    <li className="icon-publish"  onClick={this.publishProject}>
                                        <i></i>
                                    </li>
                                    <li className="icon-preview" onClick={this.previewProject}>
                                        <i></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }
}