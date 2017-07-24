'use strict';

/**
 * 主场景类
 * 整个app开发控制场景
 * @author   
 * @datetime 
 */

import React from 'react';
import Reflux from 'reflux';
import {BaseClass} from '../../core/Base.class';
import MagicViewClass from '../../modules/MagicView/MagicView';
import * as Comm from '../../modules/common'; // 公共函数库
import {Store} from './Store';

let MagicView = new MagicViewClass();

let MagicViewDom = MagicView.getComponent();

export default class Scene extends BaseClass {
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
            getInitialState: function(e){
                return {
                    selectCover:{
                        display:'none',
                        top:0,
                        left:0,
                        width:0,
                        height:0
                    }
                };
            },
            sceneRect: {},
            handleWheel: function(e){
                let scene = React.findDOMNode(this.refs.scene);
                scene.scrollTop += e.deltaY;
            },
            componentDidMount: function(){
                this.sceneRect = Comm.getElementRect(React.findDOMNode(this.refs.scene));
            },
            render: function(){
                let coverStyle = {
                    display: this.state.selectCover.display ? 'block' : 'none',
                    top: this.state.selectCover.top - this.sceneRect.top,
                    left: this.state.selectCover.left - this.sceneRect.left,
                    width: this.state.selectCover.width,
                    height: this.state.selectCover.height
                };
                return (
                    <div ref='scene' className="scene-screen" onWheel={this.handleWheel} data-dragtype="select">
                        <MagicViewDom width="375" height="667" />
                        <div className="select-cover" style={coverStyle}></div>
                    </div>
                );
            }
        });
    }
}