'use strict';

/**
 * 代码面板类
 * @author   vilien
 * @datetime 2016-1-16
 */

import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';
import {subscribe} from '../../core/pubsub'; // 发布/订阅模式库

export default class CodePanel extends PanelBase {
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
            selectionIndex:0,
            needsave:false,
            getInitialState: function() {
                return {
                    pages:{
                        activePage:0,
                        activeWidget:-1,
                        pageList:[{
                            widgetList:[{}]
                        }]
                    },
                    panelSwitch:{
                        codePanelSwitch:2
                    },
                    _height:160
                };
            },
            componentDidMount: function(){
                subscribe('codepanel_resize', offset=>{
                    let height = this.state._height - offset;
                    height = height < 100 ? 100 : height;
                    this.setState({_height:height});
                });
            },
            componentWillUpdate: function(nextProps, nextState) {
                //保证任何时候失去焦点都可保存已修改的代码
                if(this.state.pages.activeWidget !== -1 ){
                    let codeNode = React.findDOMNode(this.refs.code);
                    if(this.needsave && codeNode.value){
                        let codetype = React.findDOMNode(this.refs.tags)
                        .querySelector('li[data-codetype].active').getAttribute('data-codetype');
                        Actions.changeWidgetCode(codetype,codeNode.value,this.state.pages.activeWidget);
                        this.needsave = false;
                    }
                }
            },
            componentDidUpdate: function(){
                let codeNode = React.findDOMNode(this.refs.code);
                let activePage = this.state.pages.activePage;
                let activeWidget = this.state.pages.activeWidget;
                let widget = this.state.pages.pageList[activePage].widgetList[activeWidget] || {};
                    codeNode.value = widget.cssCode || '';
                // codeNode.selectionStart = this.selectionIndex;
                // codeNode.selectionEnd = this.selectionIndex;
            },
            closePanel: function(){
                Actions.showPanel('codePanel');
            },
            changeCode: function(e){
                if(this.state.pages.activeWidget===-1){
                    React.findDOMNode(this.refs.code).value='';
                    return;
                }
                this.needsave = true;
                this.selectionIndex = e.currentTarget.selectionStart;
                //React.findDOMNode(this.refs.submitBtn).style.display='';
            },
            pushHistory: function(e){
                let codetype = React.findDOMNode(this.refs.tags)
                    .querySelector('li[data-codetype].active').getAttribute('data-codetype');
                Actions.changeWidgetCode(codetype, e.currentTarget.value);
                Actions.historyPush();
                this.needsave = false;
                //React.findDOMNode(this.refs.submitBtn).style.display='none';
            },
            render: function(){
                let display = this.state.panelSwitch.codePanelSwitch === 1 ? 'block' : 'none';
                return (
                    <section className="codepanel-wrap">
                        <div className="resize" data-dragtype="codePanel"></div>
                        <ul ref="tags" className="tags">
                            <li data-codetype="js">Javascript</li>
                            <li data-codetype="css" className="active">CSS</li>
                            <li className={"close "+(this.state.panelSwitch.codePanelSwitch === 1?'code-on':'code-off')}
                             onClick={this.closePanel}></li>
                            {/*<li className='submit' style={{display:'none'}} ref='submitBtn' >提交</li>*/}
                        </ul>
                        <div style={{height:this.state._height,display:display}} className="code-wrap">
                            <textarea ref="code" onChange={this.changeCode} onBlur={this.pushHistory}></textarea>
                        </div>
                    </section>
                );
            }
        });
    }
}