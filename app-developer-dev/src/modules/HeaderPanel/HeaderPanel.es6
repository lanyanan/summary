'use strict';

/**
 * 头部面板
 * 提供页面顶部工具栏功能
 * @author   
 * @datetime 
 */

import React from 'react';
import {BaseClass} from '../../core/Base.class';

export default class Header extends BaseClass {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return React.createClass({
            getInitialState: function(){
                return {toolsUnfolded:true};
            },
            handleClick: function(e){
                let toolsUnfolded = this.state.toolsUnfolded,
                    toolsPanel = document.querySelector('.operate-wrap');
                e.preventDefault();
                if (toolsUnfolded) {
                    toolsPanel.className += ' unfold';
                } else {
                    toolsPanel.className = toolsPanel.className.replace(/ unfold/g, '');
                }
                this.setState({toolsUnfolded:!toolsUnfolded});
            },
            render: function(){
                return (
                    <header className="header">
                        <div className="h-pannel">
                            智能设备自助接入系统
                        </div>
                        <div className="h-btns">
                            <a href="#" className="tools-slide" title="收起工具栏" onClick={this.handleClick}>
                                {this.state.toolsUnfolded ? '-' : '+'}
                            </a>
                        </div>
                    </header>
                );
            }
        });
    }
}