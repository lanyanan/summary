'use strict';

/**
 * 组件位置尺寸面板类
 * 提供控件各种位置尺寸设定
 * @author   xinglin
 * @datetime 2015-12-11
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';

export default class WidgetsSizePanel extends PanelBase {
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
                    panelSwitch:{sizePanelSwitch:1},
                    pages:{
                        activePage:0,
                        activeWidget:-1,
                        pageList:[
                        {
                            widgetList:[{
                                top:0,
                                left:0,
                                width:0,
                                height:0
                            }]
                        }]
                    }
                };
            },
            close:function(e){
                e.preventDefault();
                Actions.showPanel('sizePanel');
            },
            getMaxZindex:function(type){
                let activePage = this.state.pages.activePage || 0;
                let widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                if(type==='max'){
                    widgetList.sort(function(x,y){return (y.zIndex||0)-(x.zIndex||0);});
                    return widgetList[0].zIndex || 0;
                }else if(type==='min'){
                    widgetList.sort(function(x,y){return (x.zIndex||0)-(y.zIndex||0);});
                    return widgetList[0].zIndex || 0;
                }
            },
            changeZIndex:function(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-type');
                let activePage = this.state.pages.activePage || 0;
                let widgetList = JSON.parse(JSON.stringify(this.state.pages.pageList[activePage].widgetList));
                // let activeWidget = this.state.pages.activeWidget || 0;
                // let activeIndex = widgetList[activeWidget].zIndex;
                switch(type){
                    case 'top':
                        let max = this.getMaxZindex('max');
                        Actions.changeSize('zIndex',max+1);
                        break;
                    case 'up':
                        Actions.upZIndexUserWidget();
                        break;
                    case 'down':
                        Actions.downZIndexUserWidget();
                        break;
                    case 'bottom':
                        let min = this.getMaxZindex('min');
                        Actions.changeSize('zIndex',min-1);
                        break;
                    default:;
                }
            },
            changeSize: function(e){
                e.preventDefault();
                let type = e.target.getAttribute('data-typename');
                let value = Number(e.target.value);
                if(type=='width'||type=='height') value = value || 1;
                Actions.changeSize(type,value);
            },
            toggleView(e){
                if(e.target.className == "close"){
                    e.target.parentNode.nextElementSibling.style.display = "none";
                    e.target.className = "open";
                }else if(e.target.className == "open"){
                    e.target.parentNode.nextElementSibling.style.display = "block";
                    e.target.className = "close";
                }
            },
            render: function(){
                let pages = this.state.pages,
                    pageProShow = pages.activePage != -1 && pages.activeWidget == -1 ? true : false;

                let panelstyle = {
                        display : this.state.panelSwitch.sizePanelSwitch == 1 && !pageProShow ? 'block' : 'none'
                    },
                    activePage = pages.activePage,
                    activeWidget = pages.activeWidget,
                    widget = pages.pageList[activePage].widgetList[activeWidget];

                if(widget && widget.id === 1019 && pages.activeWidgetGrandchild >-1){//选项卡 指定选项的控件集合
                    widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                }

                if(widget && widget.id === 1020 && pages.activeWidgetGridChild >-1){ //九宫格
                    widget = widget.gridChildList[pages.activeWidgetGridChild];
                }
                
                widget = typeof widget !== 'undefined' ? widget : {top: 0, left: 0, width: 1, height: 1, deg: 0, zIndex: 0};
                
                let grid = typeof widget.grid !=='undefined' ? widget.grid : [];
                
                let xValue = widget.left,
                    yValue = widget.top,
                    widgetWidth = widget.width,
                    widgetHeight = widget.height,
                    deg = widget.deg || 0,
                    zIndex = widget.zIndex || 0;

                let widgetInfo = widget.widgetInfo ? widget.widgetInfo : {},
                    dragStatus = widgetInfo.dragStatus ? widgetInfo.dragStatus : {
                        top: true,
                        bottom: true,
                        left: true,
                        right: true,
                        changeWidth: true,
                        changeHeight: true
                    };

                let sizeContent = ""; //位置内容
                if(grid.indexOf('size') != -1){
                    sizeContent =   <div style={panelstyle}  className='sizeArea' onClick={this.toggleView}>
                                        <header>位置+尺寸<span className="close"></span></header>
                                        <div className='sizebody'>
                                            <div className='position' style={{display: !dragStatus.left && !dragStatus.top ? "none" : "block"}}>
                                                <label>位置</label>
                                                <span className='row1' style={{display: dragStatus.left ? "inline-block" : "none"}}>X</span>
                                                <input className='row1'style={{display: dragStatus.left ? "inline-block" : "none"}} type="number" value={xValue} data-typename='x' onChange={this.changeSize}  />
                                                <span className='row2' style={{display: dragStatus.top ? "inline-block" : "none"}}>Y</span>
                                                <input className='row2' style={{display: dragStatus.top ? "inline-block" : "none"}}  type="number" value={yValue} data-typename='y' onChange={this.changeSize}  />
                                            </div>
                                            <div className='position' style={{display: !dragStatus.changeWidth && !dragStatus.changeHeight ? "none" : "block"}}>
                                                <label>尺寸</label>
                                                <span className='row1' style={{display: dragStatus.changeWidth ? "inline-block" : "none"}}>宽</span>
                                                <input className='row1' style={{display: dragStatus.changeWidth ? "inline-block" : "none"}} type="number" value={widgetWidth} data-typename='width' onChange={this.changeSize} min="1" />
                                                <span className='row2'style={{display: dragStatus.changeHeight ? "inline-block" : "none"}} >高</span>
                                                <input className='row2' style={{display: dragStatus.changeHeight ? "inline-block" : "none"}} type="number" value={widgetHeight} data-typename='height' onChange={this.changeSize} min="1" />
                                            </div>
                                            {
                                                // <div className='position'>
                                                //     <label>旋转</label>
                                                //     <input data-typename='deg' value={deg} onChange={this.changeSize} type="number" />
                                                // </div>
                                            }
                                            {
                                                // <section className='zIndex' onClick={this.changeZIndex}>
                                                //     <span>层级</span>
                                                //     <label data-type={'top'}>置顶</label>
                                                //     <label data-type={'up'}>置上</label>
                                                //     <label data-type={'down'}>置下</label>
                                                //     <label data-type={'bottom'}>置底</label>
                                                // </section>
                                            }
                                            
                                        </div>
                                    </div>
                }
                return (
                    <div>
                        {sizeContent}
                    </div>
                );
            }
        });
    }

}
