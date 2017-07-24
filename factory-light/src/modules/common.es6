'use strict';
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