'use strict';

/**
 * 页面管理类
 * 提供页面管理设定
 * @author   xinglin
 * @datetime 2015-12-22
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';

const  _pagesArea_ = Symbol('_pagesArea_'); // 页面面板

export default class PagesManage extends PanelBase {
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
                        mousePage:-1,
                        activerename:-1,
                        showWidgetList:true,
                        showTab:null,
                        showTabChild:null,
                        pages: {
                            activePage:0,
                            activerename:-1,
                            activeWidget:-1,
                            activeWidgetChild:-1,
                            activeWidgetGrandchild: -1,
                            pageList:[
                                {pageName:"主页",pageId:0,widgetList:[{}]},
                            ]
                        }
                    };
            },
            mouseover: function(e) {//鼠标移出隐藏复制删除操作
                e.preventDefault();
                let pageId = e.currentTarget.getAttribute('data-pageid');
                this.setState({mousePage:pageId});
            },
            mouseleave: function(e){//鼠标移入显示复制删除操作
                e.preventDefault();
                this.setState({mousePage:-1});
            },
            createpage: function(e){//新建页面
                e.stopPropagation();
                let pagelength = this.state.pages.pageList.length;
                let pageId = Math.floor((this.state.pages.pageList.length+Math.random())*100);
                let newpage = {pageName:"新建页面"+(pagelength+1),pageId:pageId,widgetList:[]};
                let newpages = this.state.pages;
                    newpages.pageList.push(newpage);
                this.setState({pages:newpages});
                Actions.createPage(pagelength-1,newpage);
            },
            copypage: function(e){//复制页面
                e.stopPropagation();
                let pindex = Number(e.target.getAttribute('data-index'));
                let pageId = Math.floor((this.state.pages.pageList.length+Math.random())*100);
                let newpages = JSON.parse(JSON.stringify(this.state.pages));
                let newpage = JSON.parse(JSON.stringify(newpages.pageList[pindex]));
                    newpage.widgetList.map((widget)=>{
                        widget.unsaved = true;
                        widget.widgetId = null;
                        widget.userWidgetID = widget.userWidgetID+1;
                    });
                    newpage.pageName += ' Copy';
                    newpage.pageId = pageId;
                    let newIndex = newpages.pageList.push(newpage);
                    // newpages.pageList.splice(pindex+1,0,newpage);
                    this.setState({pages:newpages});
                    Actions.createPage(newIndex-2,newpage,'copy');
            },
            deletepage: function(e){//删除页面
                e.stopPropagation();
                let pageName = e.target.getAttribute('data-name');
                let pindex = Number(e.target.getAttribute('data-index'));
                if(pindex===0) {
                    alert('不能删除主页');
                    return;
                }
                if(confirm('确定要删除 '+pageName+' ?')){
                    Actions.deletePage(pindex);
                }else{
                    return;
                }
            },
            togglePage: function(e){//伸缩页面
                e.stopPropagation();
                let index = Number(e.target.getAttribute('data-index'));
                let pages = this.state.pages;

                Actions.changePage(index);
                pages.activeWidgetGrandchild = -1;
                pages.activeWidgetChild = -1;
                pages.activeWidget = -1;
                this.setState({
                    pages: pages,
                });
            },
            toggleWidget(e){
                e.stopPropagation();
                let index = e.target.getAttribute('data-index');
                let top = e.target.getAttribute('data-top');
                let left = e.target.getAttribute('data-left');
                let childIndex = e.target.getAttribute('data-child');
                let grandchild = e.target.getAttribute('data-grandchild');
                let pages = this.state.pages;

                if(grandchild) {//孙子索引存在时即表示选中当前子控件（孙子）
                    pages.activeWidgetGrandchild = Number(grandchild);
                    this.setState({
                        pages: pages,
                    });
                    Actions.selectUserWidget(index,{left:left,top:top},childIndex,grandchild);
                }else if(childIndex){//儿子索引存在时即表示选中指定选项（儿子）
                    pages.activeWidgetChild = Number(childIndex);
                    this.setState({
                        pages: pages,
                    });
                    Actions.selectUserWidget(index,null,childIndex);
                }else if(left&&top){
                    pages.activeWidget = Number(index);
                    this.setState({
                        pages: pages,
                    });
                    Actions.selectUserWidget(Number(index),{left:left,top:top});
                }
            },
            render: function(){
                //let pages = this.props.pages.pageList || this.pages;
                let pages = this.state.pages.pageList;
                let page = this.state.pages;
                let activeWidgetChild = page.activeWidgetChild > -1? page.activeWidgetChild:-1;
                let mousePage = (this.state.mousePage || this.state.mousePage==0) ? this.state.mousePage : -1;
                let activerename = (this.state.activerename || this.state.activerename==0) ? this.state.activerename : -1;
                let showTab = this.state.showTab;
                let showTabChild = this.state.showTabChild;
                return (
                    <div ref="pagesArea" className='pagesArea'>
                        <div className='pagesbody'>
                            <section className='mainpage'>页面<section className="addstatus" onClick={this.createpage}>添加页面</section></section>
                            <ul className="pages-menu">
                                {
                                    pages.map((pageItem,i)=>{
                                        return (
                                                <li key={i}>
                                                    <div className={page.activePage == i && page.activeWidget < 0 ? "widget-list-title active" : "widget-list-title"} onMouseOver={this.mouseover} onMouseLeave={this.mouseleave} data-pageid={pageItem.pageId} >
                                                        <label></label>
                                                        <span data-index={i} onClick={this.togglePage}>
                                                            {pageItem.pageName}
                                                        </span>
                                                        <em className="page-icon"></em>
                                                        <section className={(mousePage==pageItem.pageId)?"controls-on":"controls-off"}>
                                                            <img src="../static/img/newpage.png" data-index={i} onClick={this.copypage} className='aimg' />
                                                            <img src="../static/img/delpage.png" data-index={i} data-name={pageItem.pageName} onClick={this.deletepage} className='aimg' />
                                                        </section>
                                                    </div>
                                                    <ul style={{display:page.activePage == i ? "block" : "none"}}>
                                                        {
                                                            pageItem.widgetList&&pageItem.widgetList.map((widgetItem,j)=>{
                                                                return (
                                                                    <li key={j}>
                                                                        <div className={page.activeWidget==j&&page.activeWidgetChild < 0  ? "widget-list-title active":"widget-list-title"}>
                                                                            <label className={widgetItem.widgetListItem ? "haschild" : ""}></label>
                                                                            <span className={widgetItem.widgetListItem ? "haschild" : ""} data-index={j} data-top={widgetItem.top} data-left={widgetItem.left} onClick={this.toggleWidget}>
                                                                                {widgetItem.caption}
                                                                            </span>
                                                                            <img src={widgetItem.icon} alt="" className={widgetItem.widgetListItem ? "icon haschild" : "icon"} />
                                                                            <img src={widgetItem.iconActive} alt="" className={widgetItem.widgetListItem ? "icon-active haschild" : "icon-active"} />
                                                                        </div>
                                                                        <ul style={{display:page.activeWidget==j?"block":"none"}}>
                                                                            {
                                                                                widgetItem.widgetListItem&&widgetItem.widgetListItem.map((childWidgetItem,k)=>{
                                                                                    return (
                                                                                        <li key={k}>
                                                                                            <div className={page.activeWidgetChild == k && page.activeWidgetGrandchild < 0 ? "widget-list-title active" : "widget-list-title"}>
                                                                                                <span data-index={j} data-child={k} onClick={this.toggleWidget} >
                                                                                                    {widgetItem.widgetListItem[k][0]?widgetItem.widgetListItem[k][0].tabName:'选项'}
                                                                                                </span>
                                                                                                <label className={childWidgetItem ? "haschild" : ""}></label>
                                                                                            </div>
                                                                                            <ul style={{display:page.activeWidgetChild == k ? "block" : "none"}}>
                                                                                                {
                                                                                                    childWidgetItem.map((wgrandchild,g)=>{
                                                                                                        return (
                                                                                                            <li key={g}>
                                                                                                                <div className={page.activeWidgetGrandchild == g ? "widget-list-title active" : "widget-list-title"}>
                                                                                                                    <span  data-index={j} data-child={k} data-grandchild={g}  data-top={wgrandchild.top} data-left={wgrandchild.left} onClick={this.toggleWidget} >
                                                                                                                        {wgrandchild.caption}
                                                                                                                    </span>
                                                                                                                    <img src={widgetItem.icon} alt="" className="icon" />
                                                                                                                    <img src={widgetItem.iconActive} alt="" className= "icon-active" />
                                                                                                                </div>
                                                                                                                <ul>
                                                                                                                    <li></li>
                                                                                                                </ul>
                                                                                                            </li>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </ul>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                );
            }
        });
    }

}

