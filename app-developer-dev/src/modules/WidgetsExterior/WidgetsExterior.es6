'use strict';

/**
 * 组件外观面板类
 * 提供控件各种外观设定
 * @author   xinglin
 * @datetime 2015-12-18
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';

export default class WidgetsExterior extends PanelBase {
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
                        panelSwitch:{exteriorPanelSwitch:1},
                        pages:{
                            activePage:0,
                            activeWidget:-1,
                            pageList:[
                            {
                                widgetList:[{
                                    fgColor:'',
                                    borderColor:'',
                                    bgColor:'',
                                    widgetOpacity:100,
                                    boderWidth:0
                                }]
                            }]
                        }
                    };
            },
            close:function(e){
                e.preventDefault();
                Actions.showPanel('exteriorPanel');
            },
            colorPick: function(e) {
                let colorstyle = e.target.getAttribute('data-value') || e.target.getAttribute('data-symbol');
                let newcolor = e.target.value;
                switch(colorstyle){
                    case 'foreground':
                        // this.setState({foreground:newcolor});
                        Actions.changeFgColor(newcolor);
                        break;
                    case 'bordercolor':
                        // this.setState({bordercolor:newcolor});
                        Actions.changeBorderColor(newcolor);
                        break;
                    case 'bgcolor':
                        // this.setState({bgcolor:newcolor});
                        Actions.changeBgColor(newcolor);
                        break;
                }
            },
            changeOpacity : function(e){
                let opacity = Number(e.target.value);
                Actions.changeWidgetOpacity(opacity);
            },
            borderWidth : function(e){
                let borderwidth = Number(e.target.value);
                Actions.changeBorderWidth(borderwidth);
            },
            changeRadius:function(e){
                let borderRadius = Number(e.target.value);
                Actions.changeExterior('borderRadius',borderRadius);
            },
            changeAlign:function(e){
                let textAlign = e.target.getAttribute('data-value');
                Actions.changeExterior('textAlign',textAlign);
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
                    activePage = pages.activePage,
                    activeWidget = pages.activeWidget,
                    widget = pages.pageList[activePage].widgetList[activeWidget];
                    if(widget && widget.id === 1019 && pages.activeWidgetGrandchild >-1){//选项卡 指定选项的控件集合
                        widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                    }
                    
                    if(widget && widget.id === 1020 && pages.activeWidgetGridChild >-1){ //九宫格
                        widget = widget.gridChildList[pages.activeWidgetGridChild];
                    }


                    widget = typeof widget !== 'undefined' ? widget : {
                        fgColor:'',
                        borderColor:'',
                        bgColor:'',
                        borderRadius:0,
                        widgetOpacity:100,
                        borderWidth:0};
                let grid = typeof widget.grid !=='undefined' ? widget.grid : [];
                let pageProShow = pages.activePage!=-1&&pages.activeWidget==-1 ? true : false;
                let foreground = widget.fgColor,
                    bordercolor = widget.borderColor,
                    bgcolor = widget.bgColor,
                    opacity = widget.widgetOpacity,
                    radius = widget.borderRadius ? widget.borderRadius : 0,
                    borderWidth = widget.borderWidth ? widget.borderWidth : 0,
                    panelstyle = {
                        display : this.state.panelSwitch.exteriorPanelSwitch == 1 && !pageProShow ? 'block':'none'
                    };
                let exteriorContent = ""; //外观内容
                if(grid.indexOf('exterior') != -1){
                    exteriorContent =  <div ref="exteriorArea" style={panelstyle} className='exteriorArea'  onClick={this.toggleView}>
                                            <header>外观 <span className="close"></span></header>
                                            <div className='exteriorbody'>
                                                {/*<section>
                                                    <span className='threetext'>前景色</span>
                                                    <input data-symbol="foreground" value={foreground} onChange={this.colorPick} />
                                                    <input type="color" value="#efefef" style={{backgroundColor: foreground}} className="extendblock" onChange={this.colorPick} data-value="foreground" />
                                                </section>*/}
                                                <section>
                                                    <span>背景颜色</span>
                                                    <input data-symbol="bgcolor" value={bgcolor ? bgcolor : "#3a7ff5"} onChange={this.colorPick} />
                                                    <input type="color" value="#efefef" style={{backgroundColor: bgcolor}} className="extendblock" onChange={this.colorPick} data-value="bgcolor" />
                                                </section>
                                                <section>
                                                    <span>边框颜色</span>
                                                    <input data-symbol="bordercolor" value={bordercolor ? bordercolor : "#3a7ff5"} onChange={this.colorPick} />
                                                    <input type="color" value="#efefef" style={{backgroundColor: bordercolor}} className="extendblock" onChange={this.colorPick} data-value="bordercolor" />
                                                </section>
                                                {
                                                    // <section className='textalign' onClick={this.changeAlign}>
                                                    //     <span>对齐方式</span>
                                                    //     <label data-value={'left'} style={{marginLeft:35+'px'}} className={widget.textAlign=='left'?'active':''}>左对齐</label>
                                                    //     <label data-value={'center'} className={widget.textAlign=='center'?'active':''}>居中</label>
                                                    //     <label data-value={'right'} className={widget.textAlign=='right'?'active':''}>右对齐</label>
                                                    // </section>
                                                }
                                                <section>
                                                    <span>不透明度</span>
                                                    <input type="number" value={opacity} onChange={this.changeOpacity} min="0" max="100" />
                                                </section>
                                                <section>
                                                    <span>边框圆角</span>
                                                    <input type="number" data-symbol="brradus" value={radius} onChange={this.changeRadius} min="0" max="100" />
                                                    <button className="extendradius"></button>
                                                    <em className="pixel">px</em>
                                                </section>
                                                <section className="clear">
                                                    <span>边框宽度</span>
                                                    <input type="number" value={borderWidth} onChange={this.borderWidth} min="0" />
                                                    <em className="pixel">px</em>
                                                </section>
                                            </div>
                                        </div>
                }
                return (
                    <div>
                        {exteriorContent}
                    </div>
                );
            }
        });
    }
}
