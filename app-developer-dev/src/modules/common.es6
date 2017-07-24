'use strict';

import React from 'react';

/**
 * 公共类
 * 各种公共函数可写在此文件
 */

/**
 * 页面加载完成回调函数
 * @param  {function} func 页面加载完成时将调用的回调函数
 */
export const domReady = (func) => {
    document.addEventListener('DOMContentLoaded', func);
};

/**
 * 获取计算后的样式
 * @param    {element}  element   目标元素
 * @param    {string}   propName  样式名称
 * @param    {string}   pseudoElt 伪类名称，获取伪类样式时可用该参数
 * @return   {string}             返回样式值
 */
export const getStyle = (element, propName, pseudoElt=null) => {
    return element && window.getComputedStyle(element, pseudoElt).getPropertyValue(propName);
};

/**
 * 获取元素矩阵
 * @author   vilien
 * @datetime 2015-12-28
 * @param    {element}   element 目标元素
 * @return   {object}            返回矩阵对象
 */
export const getElementRect = (element) => {
    let doc = element && element.ownerDocument,
        docElem = (element && element.ownerDocument).documentElement,
        box = element.getBoundingClientRect(),
        rect = {top:box.top, left:box.left, right:box.right, bottom:box.bottom, width:box.width, height:box.height};
    rect.top += docElem.scrollTop  - (docElem.clientTop || 0);
    rect.left += docElem.scrollLeft - (docElem.clientLeft || 0);
    return rect;
};


// 分页组件
function validateInput(val,totalPages,currentPage){
    var reg = /^[1-9]\d*$/;
    if(!(val && reg.test(val))){
        return false;
    }else{
        if(val <= totalPages && val != currentPage){
            return true;
        }else{
            return false;
        }
    }
};

var FirstPageAbled = React.createClass({  // 首页,可以点击
    render: function(){
        return (
            <input type="button" className="icon-first" value="首页"  onClick={this.props.getPager(1)} />
        );
    }
});
var FirstPageDisabled = React.createClass({  // 首页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-first" value="首页" disabled="disabled" />
        );
    }
});
var LastPageAbled = React.createClass({  // 尾页,可以点击
    render: function(){
        var totalPages = this.props.totalPages;
        return (
            <input type="button" className="icon-last" value="尾页" onClick={this.props.getPager(totalPages)} />
        );
    }
});
var LastPageDisabled = React.createClass({  // 尾页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-last" value="尾页" disabled="disabled" />
        );
    }
});
var BtnPrevAbled = React.createClass({  // 上一页,可以点击
    render: function(){
        var pageindex = this.props.pageIndex-1;
        return (
            <input type="button" className="icon-chevron-thin-left" value="&lt;" onClick={this.props.getPager(pageindex)} />
        );
    }
});
var BtnPrevDisabled = React.createClass({  // 上一页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-chevron-thin-left" value="&lt;" disabled="disabled" />
        );
    }
});
var BtnNextAbled = React.createClass({  // 下一页,可以点击
    render: function(){
        var pageindex = this.props.pageIndex + 1;
        return (
            <input type="button" className="icon-chevron-thin-right" value="&gt;" onClick={this.props.getPager(pageindex)} />
        );
    }
});
var BtnNextDisabled = React.createClass({  // 下一页,不可以点击
    render: function(){
        return (
            <input type="button" className="icon-chevron-thin-right" value="&gt;" disabled="disabled" />
        );
    }
});
var PageIndex = React.createClass({  // 页面索引
    getPager(i){
        this.props.getPager(i);
    },
    componentDidMount(){},
    render: function(){
        var totalPages = this.props.pager.totalPages;
        var pageIndex = this.props.pager.pageIndex;
        var paging = {
            showSize: 6,
            startIndex: 0,
            endIndex: totalPages
        };
        var index=[]; 
        if(totalPages>paging.showSize){
            paging.startIndex = pageIndex-1;
            paging.endIndex = pageIndex+paging.showSize-1;
            if(paging.endIndex>totalPages){
                paging.startIndex = totalPages - paging.showSize;
                paging.endIndex = totalPages;
            }
        }
        
        for(var i=paging.startIndex; i<paging.endIndex;i++){
           if(i==pageIndex-1){
               index.push(<span className="curPage" key={i} id="currentPage">{pageIndex}</span>); 
           }else{
               index.push(<a href="javascript:void(0)" key={i} onClick={this.getPager(i+1)}>{i+1}</a>); 
           }  
        }                    
        return (
            <span>{index}</span>
        );
    }
});
var PageJump = React.createClass({  // 页面跳转
    handleClick: function(){  
        var inputPageIndex = this.refs.inputPageIndex;    
        var val = inputPageIndex.value&&inputPageIndex.value.match(/[^\s]+/g).join("");
        if(validateInput(val,this.props.pager.totalPages,this.props.pager.pageIndex)){
            this.props.getPager(val);
        }else{
            inputPageIndex.style.borderColor = "red";
            inputPageIndex.focus();
        }        
    },
    handleChange: function(e){
        var target = e.target;
        var val = target.value&&target.value.match(/[^\s]+/g).join("");
        if(validateInput(val,this.props.pager.totalPages,this.props.pager.pageIndex)){
            target.style.borderColor = "#d8d8d8";
        }else{
            target.style.borderColor = "red";
        } 
    },
    handleBlur: function(e){
        var target = e.target;
        var val = target.value&&target.value.match(/[^\s]+/g).join("");
        if(!val){
            target.style.borderColor = '#d8d8d8';
        }
    },
    render: function(){
        return (
            <span className="jump">共<em id="totalPages">{this.props.pager.totalPages}</em>页，到第<input type="text" maxLength="5" ref="inputPageIndex" id="input-pageIndex" onChange={this.handleChange} onBlur={this.handleBlur} />页<input type="button" value="确定" className="btn-jump" onClick={this.handleClick} /></span>
        );
    }
});
export const Pager = React.createClass({
    render: function(){
        var isBtnPrev,isBtnNext,isFirstPage,isLastPage;
        if(this.props.pager.hasPrevPage) {
           isBtnPrev = <BtnPrevAbled pageIndex={this.props.pager.pageIndex} getPager={this.props.getPager} /> 
           isFirstPage = <FirstPageAbled getPager={this.props.getPager} />
        }else{
           isBtnPrev = <BtnPrevDisabled /> 
           isFirstPage = <FirstPageDisabled />
        }
        if(this.props.pager.hasNextPage) {
           isBtnNext = <BtnNextAbled pageIndex={this.props.pager.pageIndex} getPager={this.props.getPager} /> 
           isLastPage = <LastPageAbled totalPages={this.props.pager.totalPages} getPager={this.props.getPager} />
        }else{
           isBtnNext = <BtnNextDisabled /> 
           isLastPage = <LastPageDisabled />
        }
        return (
            <div className="manage-paging"> 
               {isFirstPage}
               {isBtnPrev}                  
               <PageIndex pager={this.props.pager} getPager={this.props.getPager} />
               {isBtnNext}
               {isLastPage}
               <PageJump pager={this.props.pager} getPager={this.props.getPager} />
            </div>
        );
    }
});